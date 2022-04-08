import React from 'react';

export interface SelectProps {
  options: string[];
  onSelect?: (option: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
}: SelectProps) => {
  return <></>;
};
