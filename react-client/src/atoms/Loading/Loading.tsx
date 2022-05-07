import React, { ReactElement } from 'react';
import styled from 'styled-components';
import loadingSvg from '../../assets/loading.svg';

export interface LoadingProps {
  isLoading: boolean;
  children: ReactElement;
}

export const Loading: React.FC<LoadingProps> = ({
  children,
  isLoading,
}: LoadingProps) => {
  return (
    <Wrapper isLoading={isLoading}>
      {isLoading && <Img src={loadingSvg} />}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isLoading: boolean }>`
  position: relative;
  z-index: 999;
  opacity: ${p => (p.isLoading ? 0.6 : 1)};
`;

const Img = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: 999;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
  opacity: 1;
`;
