import React from 'react';

export interface InputProps {
  variant?: 'box' | 'line';
  label?: string;
  note?: string;
  type: 'text' | 'number' | 'password';
  value: string | number;
  onChange?: (value: string | number) => void;
}

export const Input: React.FC<InputProps> = ({
  variant = 'line',
  label,
  note,
  type,
  value,
  onChange,
}: InputProps) => {
  return <></>;
};
