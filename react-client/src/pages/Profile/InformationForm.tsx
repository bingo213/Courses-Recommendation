import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { userApi } from '../../apis';
import { Button, COLORS, Input, NotificationProps } from '../../atoms';
import { DatePicker } from '../../components';
import { IUpdateRequest } from '../../interfaces';

interface InformationFormProps {
  setShowNoti: (show: boolean) => void;
  setMsg: (msg: string) => void;
  setTypeNoti: (type: NotificationProps['type']) => void;
}

type FormValues = IUpdateRequest;

export const InformationForm: React.FC<InformationFormProps> = ({
  setMsg,
  setShowNoti,
  setTypeNoti,
}: InformationFormProps) => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<FormValues>();

  useEffect(() => {
    userApi.getProfile().then(data => {
      const student = data?.student;
      setValue('fullName', student.fullName);
      setValue('phoneNumber', student.phoneNumber);
      setValue('email', student.email);
      setValue('dateOfBirth', student.dateOfBirth);
      setValue('className', student.className);
    });
  }, []);

  useEffect(() => {
    if (date)
      setValue('dateOfBirth', date.toDateString(), { shouldDirty: true });
  }, [date]);

  const onSubmit = (data: FormValues) => {
    userApi
      .updateProfile(data)
      .then(() => {
        setShowNoti(true);
        setMsg(t('ChangeProfileSuccessfully'));
        setTypeNoti('success');
      })
      .catch(err => {
        console.log(err);
        setShowNoti(true);
        setMsg(t('AnErrorOccuredPleaseTryAgain'));
        setTypeNoti('error');
      });
  };

  return (
    <>
      <Title>{t('PersonalInfomation')}</Title>
      <Form className="form-left" onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          label={t('FullName')}
          type="text"
          variant="box"
          {...register('fullName', {
            minLength: {
              value: 8,
              message: t('MinLengthIs{{min}}', { min: 8 }),
            },
            maxLength: {
              value: 100,
              message: t('MaxLengthIs{{max}}', { max: 100 }),
            },
          })}
          errorMessage={errors.fullName?.message}
        />
        <DatePicker
          label={t('DateOfBirth')}
          {...register('dateOfBirth')}
          date={date}
          onSelectDate={setDate}
          style={{ marginBottom: 32 }}
        />
        <StyledInput
          label={t('ClassName')}
          type="text"
          variant="box"
          {...register('className')}
        />
        <StyledInput
          label={t('PhoneNumber')}
          type="text"
          variant="box"
          {...register('phoneNumber')}
        />
        <StyledInput
          label={t('PrivateEmail')}
          type="text"
          variant="box"
          {...register('email')}
        />
        <div style={{ padding: '12px 0 32px 0' }}>
          <Button block type="submit" disabled={!isDirty}>
            {t('SaveInfo')}
          </Button>
        </div>
      </Form>
    </>
  );
};

const Title = styled.p`
  font-size: 16px;
  color: ${COLORS.primary600};
  width: fit-content;
  margin: auto;
  padding: 0 18px;
  background: white;
  position: relative;
  z-index: 2;
`;

const Form = styled.form`
  margin-top: 42px;
  &.form-left {
    padding-right: 24px;
    border-right: 1px solid ${COLORS.line100};
  }
  &.form-right {
    padding-left: 24px;
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 32px;
`;
