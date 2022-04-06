import React from 'react';
import styled from 'styled-components';

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
    //@TODO: replace x by close icon
  return (
    <TagWrapper color={color} onClick={onClose}>
      <Title>{title}</Title>x
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
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 500;
`;
