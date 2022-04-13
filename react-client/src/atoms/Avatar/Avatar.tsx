import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { COLORS } from '../colors';

export interface AvatarProps {
  image: string;
  size: 'small' | 'large';
  icon?: ReactElement;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  image,
  size = 'small',
  icon,
  ...rest
}: AvatarProps) => {
  return (
    <Wrapper size={size} {...rest}>
      <Image src={image} />
      {icon && <Icon>{icon}</Icon>}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ size: string }>(
  ({ size }) => `
    width: ${size === 'small' ? 36 : 120}px;
    height: ${size === 'small' ? 36 : 120}px;
    position: relative;
`
);

const Image = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  padding: 4px;
  box-sizing: content-box;
  border-radius: 50%;
  background-color: ${COLORS.primary100};
  position: absolute;
  bottom: 12px;
  right: 0;
`;
