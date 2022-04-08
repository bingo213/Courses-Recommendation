import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { COLORS } from '../colors';

export interface InputProps {
  variant?: 'box' | 'line';
  placeholder?: string;
  required?: boolean;
  label?: string;
  note?: string;
  type: 'text' | 'number' | 'password';
  value: string | number;
  onChange?: (value?: string | number) => void;
  style?: CSSProperties;
}

export const Input: React.FC<InputProps> = ({
  variant = 'line',
  required,
  placeholder,
  label,
  note,
  type,
  value,
  onChange,
  style,
}: InputProps) => {
  return (
    <Wrapper style={style}>
      {label && (
        <Label>
          {label}
          {required && (
            <span style={{ color: '#B50606', marginLeft: '3px' }}>*</span>
          )}
        </Label>
      )}
      <StyledInput
        type={type}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        variant={variant}
        placeholder={placeholder}
      />
      {note && <Note>{note}</Note>}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${COLORS.textPrimary};
`;

const StyledInput = styled.input<{ variant: 'line' | 'box' }>(
  ({ variant }) => `
  outline: none;
  border: none;
  width: 100%;
  font-weight: 300;
  &::placeholder {
    color: ${COLORS.placeholder};
  }
  ${
    variant === 'box'
      ? `
    border: 1px solid ${COLORS.line100};
    border-radius: 4px;
    padding: 6px 8px;
    &:focus {
      border: 1px solid ${COLORS.primary500};
    }
  `
      : `border-bottom: 1px solid ${COLORS.line200};
         padding: 6px 0;`
  }
`
);

const Note = styled.div`
  font-size: 10px;
  font-weight: 200;
  margin-top: 4px;
  font-style: italic;
  color: ${COLORS.textSecondary};
`;
