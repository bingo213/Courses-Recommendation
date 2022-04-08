import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../atoms';

export interface DropdownItemProps {
  label: string;
  icon?: React.ReactElement;
  active?: boolean;
  hasDivider?: boolean;
  onClick?: () => void;
}

interface WrapperProps {
  hasDivider: boolean;
  active: boolean;
  hover: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  icon,
  hasDivider = false,
  active = false,
  onClick,
  ...rest
}: DropdownItemProps) => {
  const [hover, setHover] = useState(false);

  return (
    <Wrapper
      onClick={() => {
        if (onClick) onClick();
      }}
      hasDivider={hasDivider}
      active={active}
      hover={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {icon && (
        <span style={{display: 'inline-block', marginRight: 12}}>
          {React.cloneElement(icon, {
            width: 24,
            ...(active && !hover ? { fill: 'white' } : {fill: COLORS.textSecondary}),
          })}
        </span>
      )}
      <Label>
        {label}
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.div<WrapperProps>(
  (props: WrapperProps) => 
    `
  background-color: white;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  position: relative;
  ${
    props.hover
      ? `
    background-color: ${COLORS.primary100};
  `
      : ''
  }
  ${
    props.active && !props.hover
      ? `
      background-color: ${COLORS.primary500};
      color: white;
      `
      : ''
  }
 ${
   props.hasDivider
     ? ` &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 16px;
      bottom: 0;
      left: 16px;
      border-bottom: 1px solid ${COLORS.line100};
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }`
     : ``
 }
`
);

const Label = styled.div``
