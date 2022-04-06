import React, { ReactElement } from 'react';
import styled from 'styled-components';

export interface AvatarProps {
  image: string;
  size: 'small' | 'large';
  icon?: ReactElement;
}

export const Avatar: React.FC<AvatarProps> = ({
  image,
  size = 'small',
  icon,
}: AvatarProps) => {
  return (
    <Wrapper size={size}>
      <Image src={image} />
      {icon && <Icon>{icon}</Icon>}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ size: string }>(
  ({ size }) => `
    width: ${size === 'small' ? 50 : 120}px;
    height: ${size === 'small' ? 50 : 120}px;
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
  position: absolute;
  bottom: 12px;
  right: 0;
`;
