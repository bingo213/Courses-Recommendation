import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { orientationApi } from '../apis';
import { Button, Input, TAG_COLOR } from '../atoms';
import { OptionProps, Select, Table } from '../components';
import { tableData1 } from '../components/Table/__mocks__';
import { IOrientationResponse } from '../interfaces';

type FormValues = {
  numberOfCourses: number;
  orientations: string[];
};

export const Recommend: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  const orient = useRef<string[]>([]);

  const [orientations, setOrientations] =
    useState<IOrientationResponse['orientations']>();

  useEffect(() => {
    orientationApi.getAll().then(data => {
      let elements = data.orientations.filter(e => e.id !== 'NONE');
      setOrientations(elements);
    });
  }, []);

  const handleSelectOption = (opt: OptionProps) => {
    orient.current.push(opt.value);
    setValue('orientations', orient.current);
  };

  const handleRemoveOption = (opt: OptionProps) => {
    orient.current = orient.current.filter(e => e !== opt.value);
    setValue('orientations', orient.current);
  };

  const validateNumberOfCourses = () => {
    if (errors?.numberOfCourses?.type === 'required')
      return t('ThisIsRequiredField');
    if (
      errors?.numberOfCourses?.type === 'max' ||
      errors?.numberOfCourses?.type === 'min'
    )
      return t('InputNumberInRange{{min}}-{{max}}', { min: 1, max: 20 });
  };
  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Input
            type="number"
            label={t('NumberOfCourses')}
            note={t('InputNumberYouWantToSuggest{{min}}-{{max}}', {
              min: 1,
              max: 20,
            })}
            required
            style={{ flex: 1, marginRight: 48 }}
            {...register('numberOfCourses', {
              required: true,
              min: 1,
              max: 20,
            })}
            errorMessage={validateNumberOfCourses()}
          />
          <Select
            label={t('SelectOrientations')}
            options={orientations?.map((o, index) => {
              return {
                text: o.orientationName,
                value: o.id,
                color: TAG_COLOR[index],
              };
            }) || []}
            note={t('CanSelectMoreThanOne')}
            style={{ flex: 3 }}
            {...register('orientations')}
            onSelect={handleSelectOption}
            onRemoveOption={handleRemoveOption}
          />
        </Field>
        <Button type="submit" style={{ margin: 'auto' }}>
          {t('Recommend')}
        </Button>
      </StyledForm>
      <Table {...tableData1} />
    </>
  );
};

const StyledForm = styled.form`
  margin-bottom: 32px;
`;

const Field = styled.div`
  display: flex;
  margin-bottom: 12px;
`;
