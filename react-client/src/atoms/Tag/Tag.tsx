import React from 'react';
import styled from 'styled-components';
import { Multiply } from '../Icons';

export interface TagProps {
  title: string;
  color: string;
  onClose?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  title,
  color,
  onClose,
}: TagProps) => {
  return (
    <TagWrapper
      color={color}
      onClick={e => {
        e.stopPropagation();
        onClose && onClose();
      }}
    >
      <Title>{title}</Title>
      <Multiply width={12} fill={color} />
    </TagWrapper>
  );
};

const TagWrapper = styled.div<{ color: string }>`
  border-radius: 4px;
  height: 20px;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${p => p.color};
  border: 1px solid ${p => p.color};
  padding: 0 8px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-right: 4px;
`;