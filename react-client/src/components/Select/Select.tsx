import React, { useEffect, useRef, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { COLORS, Tag, TAG_COLOR } from '../../atoms';
import { AngleDown, Tick } from '../../atoms/Icons';

export interface OptionProps {
  value: string;
  text: string;
  color: string;
}

export interface SelectProps {
  options: OptionProps[];
  label?: string;
  note?: string;
  required?: boolean;
  maxPerView?: number;
  onSelect?: (option: OptionProps) => void;
  style?: CSSProperties;
}

export const Select: React.FC<SelectProps> = ({
  options = [],
  label,
  note,
  required,
  onSelect,
  maxPerView,
  ...rest
}: SelectProps) => {
  const [activeOptions, setActiveOptions] = useState<OptionProps[]>([]);
  const [show, setShow] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const onSelectOption = (option: OptionProps): void => {
    onSelect && onSelect(option);
    if (!activeOptions.includes(option)) {
      setActiveOptions(opt => [...opt, option]);
    }
  };
  return (
    <Wrapper {...rest}>
      {label && (
        <Label>
          {label}
          {required && (
            <span style={{ color: '#B50606', marginLeft: '3px' }}>*</span>
          )}
        </Label>
      )}
      <StyledSelect ref={menuRef}>
        <Field onClick={() => setShow(!show)}>
          <ActiveOptions>
            {!!activeOptions.length &&
              activeOptions.map((option, index) => (
                <Tag
                  key={index}
                  title={option.text}
                  color={option.color}
                  onClose={() => {
                    setActiveOptions(prevOpts =>
                      prevOpts.filter(opt => opt.value !== option.value)
                    );
                  }}
                />
              ))}
          </ActiveOptions>
          <AngleDown width={24} fill={COLORS.textPrimary} />
        </Field>
        {note && <Note>{note}</Note>}
        <OptionMenu maxPerView={maxPerView} show={show}>
          {options.map((opt, index) => (
            <Option key={index} onClick={() => onSelectOption(opt)}>
              {opt.text}
              {activeOptions.includes(opt) && (
                <Tick width={24} fill={COLORS.primary500} />
              )}
            </Option>
          ))}
        </OptionMenu>
      </StyledSelect>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${COLORS.textPrimary};
`;

const StyledSelect = styled.div`
  position: relative;
`;

const Field = styled.div`
  display: flex;
  border-bottom: 1px solid ${COLORS.line200};
  cursor: pointer;
`;

const ActiveOptions = styled.div`
  width: 100%;
  min-height: 33px;
  padding: 6px 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Note = styled.div`
  font-size: 10px;
  font-weight: 200;
  margin-top: 4px;
  font-style: italic;
  color: ${COLORS.textSecondary};
`;

const OptionMenu = styled.div<{ maxPerView?: number; show: boolean }>`
  position: absolute;
  border-radius: 4px;
  width: 100%;
  padding: 4px;
  ${p =>
    p?.maxPerView
      ? `height: ${p.maxPerView * 40 + 8}px; 
          overflow-y: hidden;
          scrollbar-gutter: stable;
          &:hover{
            overflow-y: scroll;
          }
          ::-webkit-scrollbar {
            width: 4px;
          }
          ::-webkit-scrollbar-thumb {
            background: #888; 
            border-radius: 999px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #555; 
          };`
      : ''}
  box-shadow: rgb(0 0 0 / 5%) 0px 0.25rem 0.5rem;
  background: white;
  ${p => (p.show ? '' : 'display: none;')}
`;

const Option = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
  &:hover {
    background: ${COLORS.primary100};
  }
`;
