import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { userApi } from '../../apis';
import { Button, COLORS, Input, Loading, NotificationProps } from '../../atoms';

type FormValues = { password: string; repass: string };

interface PasswordFormProps {
  setShowNoti: (show: boolean) => void;
  setMsg: (msg: string) => void;
  setTypeNoti: (type: NotificationProps['type']) => void;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  setShowNoti,
  setMsg,
  setTypeNoti,
}: PasswordFormProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty },
    getValues,
    reset,
  } = useForm<FormValues>();

  //Reset form when submit successfully
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ password: '', repass: '' });
    }
  }, [isSubmitSuccessful, reset]);

  const getRepassErrorMessage = () => {
    if (errors.repass?.type === 'required') return t('ThisIsRequiredField');
    if (errors.repass?.type === 'validate')
      return t('ReEnteredPasswordDoesNotMatch');
  };

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    userApi
      .changePassword(data)
      .then(() => {
        setShowNoti(true);
        setMsg(t('ChangePasswordSuccessfully'));
        setTypeNoti('success');
      })
      .catch(err => {
        console.log(err);
        setShowNoti(true);
        setMsg(t('AnErrorOccuredPleaseTryAgain'));
        setTypeNoti('error');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Loading isLoading={loading}>
      <>
        <Title>{t('ChangePassword')}</Title>
        <Form className="form-right" onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            label={t('EnterNewPassword')}
            type="password"
            variant="box"
            {...register('password', {
              required: { value: true, message: t('ThisIsRequiredField') },
              maxLength: {
                value: 127,
                message: t('MaxLengthIs{{max}}', { max: 127 }),
              },
              minLength: {
                value: 8,
                message: t('MinLengthIs{{min}}', { min: 8 }),
              },
            })}
            errorMessage={errors.password?.message}
          />
          <StyledInput
            label={t('Re-enterPassword')}
            type="password"
            variant="box"
            {...register('repass', {
              required: true,
              validate: () => getValues('password') === getValues('repass'),
            })}
            errorMessage={getRepassErrorMessage()}
          />
          <div style={{ padding: '12px 0 32px 0' }}>
            <Button block type="submit" disabled={!isDirty}>
              {t('ChangePassword')}
            </Button>
          </div>
        </Form>
      </>
    </Loading>
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
