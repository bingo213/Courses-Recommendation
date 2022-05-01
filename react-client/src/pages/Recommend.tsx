import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router';
import styled from 'styled-components';
import { orientationApi } from '../apis';
import { serviceApi } from '../apis';
import { Button, Input } from '../atoms';
import { OptionProps, Select, Table, TableProps } from '../components';
import {
  CookedOrientationProps,
  cookOrientations,
  cookRecommendation,
} from '../helpers/recommend';
import { IRecommendation } from '../interfaces';

type FormValues = {
  numberOfCourses: number;
  orientations: string[];
};

export const Recommend: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const orient = useRef<string[]>([]);

  const [orientations, setOrientations] = useState<CookedOrientationProps[]>();
  const [recommendations, setRecommendations] = useState<IRecommendation[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const recommendationsTable: TableProps = {
    columns: [t('Course'), t('PredictedGrade'), t('Orientation')],
    data:
      orientations &&
      recommendations &&
      (recommendations || []).map(r =>
        cookRecommendation(
          r,
          orientations.find(o => o.id === r.orientationId)?.color || '',
          t
        )
      ),
  };

  const onSubmit: SubmitHandler<FormValues> = data => {
    serviceApi
      .recommend(data)
      .then(res => setRecommendations(res.recommendations))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    orientationApi.getAll().then(data => {
      let elements = data.orientations.filter(e => e.id !== 'NONE');
      setOrientations(cookOrientations(elements));
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
      return t('InputNumberInRange{{min}}-{{max}}', { min: 1, max: 32 });
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
              max: 32,
            })}
            required
            style={{ flex: 1, marginRight: 48 }}
            {...register('numberOfCourses', {
              required: true,
              min: 1,
              max: 32,
            })}
            errorMessage={validateNumberOfCourses()}
          />
          <Select
            label={t('SelectOrientations')}
            maxPerView={5}
            options={(orientations || []).map(o => {
              return {
                text: o.orientationName,
                value: o.id,
                color: o.color,
              };
            })}
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
      {!!recommendations.length ? (
        <Table {...recommendationsTable} />
      ) : (
        <div style={{ height: 300 }} />
      )}
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
