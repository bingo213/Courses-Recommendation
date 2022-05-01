import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { COLORS } from '../colors';

export interface ButtonProps {
  children: string;
  block?: boolean;
  disabled?: boolean;
  width?: number;
  height?: number;
  borderRadius?: number;
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  block,
  width = 200,
  height = 36,
  borderRadius = 4,
  disabled = false,
  onClick,
  type = 'button',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <Wrapper
      width={width}
      height={height}
      borderRadius={borderRadius}
      block={block}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...rest}
    >
      <Text>{children}</Text>
    </Wrapper>
  );
};

interface WrapperProps {
  width: number;
  height: number;
  borderRadius: number;
  block?: boolean;
  disabled?: boolean;
}

const Wrapper = styled.button<WrapperProps>(
  ({ width, height, borderRadius, block, disabled }: WrapperProps) => `
  background: ${COLORS.primary500};
  width: ${width}px;
  height: ${height}px;
  border-radius: ${borderRadius}px;
  ${block ? 'width: 100%;' : ''}
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #6b4fc0;
  }
  ${
    disabled
      ? `
      cursor: not-allowed;
      opacity: 0.5;`
      : 'cursor: pointer;'
  }
`
);

const Text = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;
