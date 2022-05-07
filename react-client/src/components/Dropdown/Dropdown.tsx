import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import styled, { CSSProperties } from 'styled-components';
import { getArrowClassName } from './helper';

type Placement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export interface DropdownProps {
  children: ReactNode;
  menu: ReactNode;
  placement?: Placement;
  showArrow?: boolean;
  trigger?: 'click' | 'hover';
  style?: CSSProperties;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  menu,
  placement = 'auto',
  showArrow = false,
  trigger = 'hover',
  ...rest
}: DropdownProps) => {
  const [show, setShow] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    if (!show) {
      return;
    }
    function handleClickOutside(event: any): void {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementRef, show]);

  const { styles, attributes } = usePopper(
    elementRef.current,
    tooltipRef.current,
    {
      placement,
      modifiers: [
        {
          name: 'arrow',
          options: { element: arrowRef.current },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    }
  );

  return (
    <div
      onMouseEnter={() => trigger === 'hover' && setShow(true)}
      onClick={() => {
        trigger === 'click' && setShow(true);
      }}
      onMouseLeave={() => trigger === 'hover' && setShow(false)}
    >
      <div ref={elementRef}>{children}</div>
      <DropdownMenu
        show={show}
        ref={tooltipRef}
        style={{ ...styles.popper }}
        {...attributes.popper}
        {...rest}
        className='dropdown-menu'
      >
        {showArrow && (
          <StyledArrow
            ref={arrowRef}
            style={{ ...styles.arrow }}
            data-placement={placement}
            className={getArrowClassName(attributes) || ''}
          />
        )}
        {menu}
      </DropdownMenu>
    </div>
  );
};

interface DropdownMenuProps {
  show: boolean;
}

const DropdownMenu = styled.div<DropdownMenuProps>`
  background-color: white;
  padding: 4px;
  border-radius: 4px;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: visibility 0.3s;
  position: absolute;
  z-index: 9999;
`;

const StyledArrow = styled.div`
  &:after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: white;
    transform: rotate(45deg);
  }
  &.arrow-bottom {
    bottom: 3px;
  }
  &.arrow-top {
    top: -3px;
  }
  &.arrow-left {
    left: -3px;
  }
  &.arrow-right {
    right: 3px;
  }
`;
