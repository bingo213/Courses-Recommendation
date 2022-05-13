import React, { CSSProperties } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { COLORS } from '../../atoms';

export interface DatePickerProps {
  label: string;
  date: Date;
  onSelectDate: (date: Date) => void;
  style?: CSSProperties;
}

export const MyDatePicker = React.forwardRef<DatePickerProps, any>(
  ({ label, date, onSelectDate, style }: DatePickerProps, ref) => {
    console.log(date)
    return (
      <Wrapper ref={ref as any} style={style}>
        <Label>{label}</Label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={date => {
            onSelectDate(date as Date);
          }}
        />
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  .react-datepicker__triangle {
    display: none;
  }
  input {
    outline: none;
    border: none;
    width: 100%;
    border: 1px solid ${COLORS.line100};
    border-radius: 4px;
    padding: 6px 8px;
  }
  input:focus {
    border: 1px solid ${COLORS.primary500};
  }
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${COLORS.textPrimary};
`;
