import React from 'react';
import styled from 'styled-components';
import { AngleDown, COLORS } from '../../atoms';
import { REGIONS } from '../../constants';
import { useLanguage } from '../../hooks';
import { Dropdown, DropdownItem } from '../Dropdown';

export interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
}: PageHeaderProps) => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const currentRegion = REGIONS[currentLanguage];
  const localizationMenu = (
    <>
      {Object.values(REGIONS).map(
        el =>
          el !== currentRegion && (
            <DropdownItem
              key={el.key}
              label={el.name}
              prefixIcon={el.flag}
              onClick={() => changeLanguage(el.key)}
              style={{ width: 200 }}
            />
          )
      )}
    </>
  );
  return (
    <Header>
      <Title>{title}</Title>
      <Dropdown menu={localizationMenu} trigger="click" style={{ width: 200 }}>
        <DropdownItem
          label={currentRegion && currentRegion.name}
          prefixIcon={currentRegion && currentRegion.flag}
          suffixIcon={<AngleDown width={24} fill={COLORS.textSecondary} />}
          style={{ width: 200 }}
        />
      </Dropdown>
    </Header>
  );
};

const Header = styled.div`
  .dropdown-menu {
    border: 1px solid ${COLORS.line100};
    width: fit-content;
  }
`;

const Title = styled.h2``;

