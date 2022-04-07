import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../colors';

export interface ProgressBarProps{
  /**Percentage of progress */
  progress: number;
  primaryColor?: string;
  secondaryColor?: string;
  style?: React.CSSProperties;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  primaryColor = COLORS.primary500,
  secondaryColor = '#E9DDFF',
  style
}: ProgressBarProps) => {
  return (
    <Wrapper background={secondaryColor} style={style}>
      <Progress background={primaryColor} progress={progress} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ background: string }>(
  ({ background }) =>
    `height: 10px;
    background: ${background};
    border-radius: 999px;
`
);

const Progress = styled.div<{ background: string; progress: number }>(
  ({ background, progress }) =>
    `height: 10px;
    width: ${progress}%;
    background: ${background};
    border-radius: 999px;
  `
);
