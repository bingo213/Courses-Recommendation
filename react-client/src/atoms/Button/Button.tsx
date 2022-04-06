import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../colors';

export interface ButtonProps {
  text: string;
  block?: boolean;
  width?: number;
  height?: number;
  borderRadius?: number;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  block,
  width = 200,
  height = 36,
  borderRadius = 4,
  onClick
}: ButtonProps) => {
  return (
    <Wrapper
      width={width}
      height={height}
      borderRadius={borderRadius}
      block={block}
      onClick={onClick}
    >
      <Text>{text}</Text>
    </Wrapper>
  );
};

interface WrapperProps {
  width: number;
  height: number;
  borderRadius: number;
  block?: boolean;
}

const Wrapper = styled.div<WrapperProps>(
  ({ width, height, borderRadius, block }: WrapperProps) => `
  background: ${COLORS.primary500};
  width: ${width}px;
  height: ${height}px;
  border-radius: ${borderRadius}px;
  ${block ? 'width: 100%;' : ''}
  display: flex;
  justify-content: center;
  align-items: center;
`
);

const Text = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;
