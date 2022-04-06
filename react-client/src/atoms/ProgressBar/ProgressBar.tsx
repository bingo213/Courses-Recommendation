import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../colors';

export interface ProgressBarProps {
  /**Percentage of progress */
  progress: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  primaryColor = COLORS.primary500,
  secondaryColor = '#E9DDFF',
}: ProgressBarProps) => {
  return (
    <Wrapper background={secondaryColor}>
      <Progress background={primaryColor} progress={progress} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ background: string }>(
  ({ background }) =>
    `height: 12px;
    background: ${background};
    border-radius: 999px;
`
);

const Progress = styled.div<{ background: string; progress: number }>(
  ({ background, progress }) =>
    `height: 12px;
    width: ${progress}%;
    background: ${background};
    border-radius: 999px;
  `
);
