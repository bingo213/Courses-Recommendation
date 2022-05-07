import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { gradeApi } from '../apis';
import { Table, TableProps } from '../components';
import { mappingGrade } from '../helpers';
import { IGrade, IGradeResponse } from '../interfaces';
import { Bar, Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { COLORS, Loading } from '../atoms';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

enum OrderEnum {
  ASC = 'asc',
  DESC = 'desc',
  SORTCOURSE = 'sortCorse',
}

enum ChartType {
  LINE = 'line',
  BAR = 'bar',
}

const sortGrade = (grades: IGrade[], order: OrderEnum) => {
  const gradeCopy = [...grades];
  switch (order) {
    case OrderEnum.ASC:
      return gradeCopy.sort((a, b) => a.grade - b.grade);
    case OrderEnum.DESC:
      return gradeCopy.sort((a, b) => b.grade - a.grade);
    case OrderEnum.SORTCOURSE:
    default:
      return gradeCopy;
  }
};

export const MyGrade: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [grades, setGrades] = useState<IGradeResponse>();
  const [order, setOrder] = useState<OrderEnum>(OrderEnum.SORTCOURSE);
  const [chartType, setChartType] = useState<ChartType>(ChartType.BAR);
  const [show, setShow] = useState(false);

  const sortedGrades = grades && sortGrade(grades.grades, order);
  const ChartComp = chartType === ChartType.BAR ? Bar : Line;

  useEffect(() => {
    gradeApi.getAll().then(data => setGrades(data));
  }, []);
  const gradeTable: TableProps = {
    columns: [t('Course'), t('Grade'), t('ConversionGrade')],
    data: (sortedGrades || []).map(g => {
      return {
        courseId: g.courseId,
        courseName: t(g.courseName),
        grade: g.grade,
        gradeConversion: mappingGrade(+g.grade.toFixed(2)),
      };
    }),
  };

  return (
    <>
      <Setting>
        <h6 style={{ fontSize: '16px' }}>{t('Setting')}</h6>
        <Label>{t('SortOrder')}</Label>
        <Select
          onChange={opt => setOrder(opt.target.value as OrderEnum)}
          defaultValue={OrderEnum.SORTCOURSE}
        >
          <option value={OrderEnum.ASC}>{t('AscendingGrade')}</option>
          <option value={OrderEnum.DESC}>{t('DescendingGrade')}</option>
          <option value={OrderEnum.SORTCOURSE}>{t('SortedByCourse')}</option>
        </Select>
      </Setting>
      <Loading isLoading={!gradeTable}>
        <StyledTable show={show}>
          <Table {...gradeTable} />
          {!!gradeTable && (
            <Decorator show={show} onClick={() => setShow(!show)}>
              {show ? t('Collapse') : t('ShowMore')}
            </Decorator>
          )}
        </StyledTable>
      </Loading>
      <ScoreAverage>
        {t('GradeAverage')}:{' '}
        <span>
          {grades?.gradeAverage && grades.gradeAverage.toFixed(2)} / 10
        </span>
      </ScoreAverage>
      <Title>{t('GradeDistribution')}</Title>
      <Setting>
        <h6 style={{ fontSize: '16px' }}>{t('Setting')}</h6>
        <Label>{t('SelectChartType')}</Label>
        <Select
          onChange={opt => setChartType(opt.target.value as ChartType)}
          defaultValue={ChartType.BAR}
        >
          <option value={ChartType.BAR}>{t('BarChart')}</option>
          <option value={ChartType.LINE}>{t('LineChart')}</option>
        </Select>
      </Setting>
      {grades && (
        <ChartComp
          height={400}
          width={800}
          data={{
            labels: (grades.grades || []).map(g => g.courseId),
            datasets: [
              {
                label: t('Grade'),
                data: (grades.grades || []).map(g => g.grade),
                backgroundColor: '#7e56da94',
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </>
  );
};

const StyledTable = styled.div<{ show: boolean }>`
  .th-0,
  .td-0 {
    width: 30%;
  }
  .td-2,
  .th-2 {
    width: 20%;
  }
  .th-1,
  .td-1 {
    width: 50%;
  }
  ${p =>
    !p.show
      ? `height: 500px;
        overflow: hidden;`
      : ''}
  position: relative;
`;

const Decorator = styled.div<{ show: boolean }>`
  ${p =>
    p.show
      ? `height: 50px;`
      : `height: 125px;background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.95) 43%,
    rgba(255, 255, 255, 0.65) 100%
  );
    position: absolute;`}
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ScoreAverage = styled.div`
  font-weight: 500;
  margin: 12px 0 32px 0;
  span {
    font-weight: 400;
  }
`;

const Title = styled.h3`
  font-size: 22px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${COLORS.line200};
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const Setting = styled.div`
  margin: 24px 0;
`;

const Label = styled.label`
  margin-right: 24px;
`;
