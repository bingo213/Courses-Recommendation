import React, { useRef, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { COLORS } from '../colors';
import { Eye, HiddenEye } from '../Icons';

export interface InputProps {
  variant?: 'box' | 'line';
  placeholder?: string;
  required?: boolean;
  label?: string;
  note?: string;
  type: 'text' | 'number' | 'password';
  value?: string | number;
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
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordIcon = useRef(type === 'password');
  return (
    <Wrapper {...rest}>
      {label && (
        <Label>
          {label}
          {required && (
            <span style={{ color: '#B50606', marginLeft: '3px' }}>*</span>
          )}
        </Label>
      )}
      <InputWrapper
        className={type === 'password' && showPassword ? 'show-pass' : ''}
      >
        <StyledInput
          type={showPasswordIcon && showPassword ? 'text' : type}
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          variant={variant}
          placeholder={placeholder}
        />
        {showPasswordIcon.current && (
          <Icon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <HiddenEye width={18} fill={COLORS.placeholder} />
            ) : (
              <Eye width={18} fill={COLORS.placeholder} />
            )}
          </Icon>
        )}
      </InputWrapper>
      {note && <Note>{note}</Note>}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const InputWrapper = styled.div`
  position: relative;
  &.show-pass input[type='password'] {
    -webkit-text-security: none;
  }
`;

const Icon = styled.div`
  position: absolute;
  right: 12px;
  bottom: 2px;
  cursor: pointer;
  padding: 6px;
`;

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
