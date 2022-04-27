import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button, TAG_COLOR } from '../atoms';
import { Select, Table } from '../components';
import { tableData2 } from '../components/Table/__mocks__';

const mockOptions = [
  { text: 'INT3111', value: 'MMT', color: TAG_COLOR[0] },
  {
    text: 'INT3135',
    value: 'TTNM',
    color: TAG_COLOR[1],
  },
  { text: 'INT3140', value: 'TMĐT', color: TAG_COLOR[2] },
  {
    text: 'INT3402',
    value: 'CHTTM',
    color: TAG_COLOR[3],
  },
  { text: 'INT3306', value: 'PTHT', color: TAG_COLOR[4] },
];

export const Predict: React.FC<{}> = () => {
  const { t } = useTranslation();
  return (
    <>
      <form>
        <Select options={mockOptions} label={t('SelectCourses')} required name="courses" />
        <StyledButton>{t('Predict')}</StyledButton>
      </form>
      <Table {...tableData2}/>
    </>
  );
};

const StyledButton = styled(Button)`
  margin: auto;
  margin-top: 12px;
  margin-bottom: 32px;
`;
