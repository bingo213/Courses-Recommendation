import React from 'react';
import styled from 'styled-components';
import notFoundImg from '../assets/not_found.png';

export const NotFound: React.FC = () => {
  return (
    <Wrapper>
      <img src={notFoundImg} alt="404 not found" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
