import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button, Input, TAG_COLOR } from '../atoms';
import { Select, Table } from '../components';
import { tableData1 } from '../components/Table/__mocks__';

const mockOptions = [
  { text: 'Mạng máy tính', value: 'MMT', color: TAG_COLOR[0] },
  {
    text: 'Tương tác người - máy',
    value: 'TTNM',
    color: TAG_COLOR[1],
  },
  { text: 'Thương mại điện tử', value: 'TMĐT', color: TAG_COLOR[2] },
  {
    text: 'Các hệ thống thông minh',
    value: 'CHTTM',
    color: TAG_COLOR[3],
  },
  { text: 'Phát triển hệ thống', value: 'PTHT', color: TAG_COLOR[4] },
];

export const Recommend: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <StyledForm>
        <Field>
          <Input
            type="number"
            label={t('NumberOfCourses')}
            note={t('InputNumberYouWantToSuggest{{min}}-{{max}}', {
              min: 1,
              max: 20,
            })}
            required
            style={{ flex: 1, marginRight: 48, whiteSpace: 'pre-wrap' }}
          />
          <Select
            label={t('SelectOrientations')}
            options={mockOptions}
            note={t('CanSelectMoreThanOne')}
            style={{ flex: 4 }}
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
