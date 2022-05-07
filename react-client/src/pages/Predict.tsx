import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { courseApi, serviceApi } from '../apis';
import { Button, Loading, TAG_COLOR } from '../atoms';
import { OptionProps, Select, Table, TableProps } from '../components';
import { cookPrediction } from '../helpers';
import { ICourse, IPrediction } from '../interfaces';

type FormValues = {
  courses: string[];
};

export const Predict: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [activeCourses, setActiveCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [courses, setCourses] = useState<ICourse[]>();
  const [predictions, setPredictions] = useState<IPrediction[]>([]);
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  useEffect(() => {
    courseApi
      .getAll()
      .then(data => setCourses(data.courses))
      .catch(error => console.log(error));
  }, []);

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (!data.courses || data.courses.length === 0)
      setErrorMessage('ThisIsRequiredField');
    setLoading(true);
    serviceApi
      .predict(data)
      .then(res => setPredictions(res.predictions))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setValue('courses', activeCourses);
  }, [activeCourses]);

  const handleSelectOption = (opt: OptionProps) => {
    if (!activeCourses.includes(opt.value)) {
      setActiveCourses(o => [...o, opt.value]);
    }
  };

  const handleRemoveOption = (opt: OptionProps) => {
    setActiveCourses(prev => [...prev.filter(p => p !== opt.value)]);
  };

  const predictionsTable: TableProps = {
    columns: [t('Course'), t('PredictedGrade'), t('ConversionGrade')],
    data: (predictions || []).map(p => cookPrediction(p, t)),
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          options={(courses || []).map((c, index) => {
            return {
              text: `${c.courseId} - ${t(c.courseName)}`,
              color: TAG_COLOR[index],
              value: c.courseId,
            };
          })}
          activeOptions={activeCourses}
          setActiveOptions={setActiveCourses}
          label={t('SelectCourses')}
          required
          {...register('courses')}
          errorMessage={errorMessage}
          maxPerView={8}
          onSelect={handleSelectOption}
          onRemoveOption={handleRemoveOption}
        />
        <StyledButton type="submit">{t('Predict')}</StyledButton>
      </form>
      <Loading isLoading={loading}>
        {!!predictions.length ? (
          <div style={{ minHeight: 400 }}>
            <StyledTable {...predictionsTable} />
          </div>
        ) : (
          <div style={{ height: 400 }} />
        )}
      </Loading>
    </>
  );
};

const StyledTable = styled(Table)`
  .th-0,
  .td-0 {
    width: 35%;
  }
  .td-2,
  .th-2 {
    width: 15%;
  }
  .th-1,
  .td-1 {
    width: 50%;
  }
`;

const StyledButton = styled(Button)`
  margin: auto;
  margin-top: 12px;
  margin-bottom: 32px;
`;
