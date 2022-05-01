import React, { useRef, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { COLORS } from '../colors';
import { Eye, HiddenEye } from '../Icons';

export interface InputProps {
  name: string;
  errorMessage?: string;
  variant?: 'box' | 'line';
  placeholder?: string;
  required?: boolean;
  label?: string;
  note?: string;
  type: 'text' | 'number' | 'password';
  value?: string | number;
  onChangeValue?: (value: string | number) => void;
  style?: CSSProperties;
}

export const Input: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      name,
      errorMessage,
      variant = 'line',
      required,
      placeholder,
      label,
      note,
      type,
      value,
      onChangeValue,
      ...rest
    }: InputProps,
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const showPasswordIcon = useRef(type === 'password');
    return (
      <Wrapper {...rest}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {label && (
            <Label>
              {label}
              {required && (
                <span style={{ color: '#B50606', marginLeft: '3px' }}>*</span>
              )}
            </Label>
          )}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
        <InputWrapper>
          <StyledInput
            name={name}
            type={showPasswordIcon && showPassword ? 'text' : type}
            value={value}
            variant={variant}
            placeholder={placeholder}
            ref={ref}
            errorMessage={errorMessage}
            onChange={e => onChangeValue && onChangeValue(e.target.value)}
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
  }
);

const Wrapper = styled.div``;

const InputWrapper = styled.div`
  position: relative;
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

const StyledInput = styled.input<{
  variant: 'line' | 'box';
  errorMessage?: string;
}>(
  ({ variant, errorMessage }) => `
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
    ${
      errorMessage
        ? `border: 1px solid ${COLORS.error}`
        : `&:focus {
      border: 1px solid ${COLORS.primary500};
    }`
    }
  `
      : `border-bottom: 1px solid ${
          errorMessage ? COLORS.error : COLORS.line200
        };
         padding: 6px 0;`
  }
`
);

const ErrorMessage = styled.div`
  color: ${COLORS.error};
  font-size: 11px;
  margin-bottom: 4px;
`;

const Note = styled.div`
  font-size: 10px;
  font-weight: 200;
  margin-top: 4px;
  font-style: italic;
  color: ${COLORS.textSecondary};
`;
