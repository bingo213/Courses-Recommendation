import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Table } from '../components';
import { tableData2 } from '../components/Table/__mocks__';

export const MyGrade: React.FC<{}> = () => {
  const { t } = useTranslation();
  return (
    <>
      <Table {...tableData2} />
      <ScoreAverage>
        {t('GradeAverage')}: <span>8.4/10</span>
      </ScoreAverage>
      <Title>{t('GradeDistribution')}</Title>
      {/* TODO: Replace by Chart.js */}
      <Chart src="https://www.researchgate.net/profile/Mojisola-Usikalu/publication/323634510/figure/fig4/AS:637457104109568@1528993025404/The-bar-chart-showing-the-monthly-water-vapor-density-for-Ebonyi-state.png" />
    </>
  );
};

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

const Chart = styled.img``;
