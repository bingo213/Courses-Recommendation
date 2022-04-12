import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../atoms';
import { APP_NAME, LOGO } from '../../constants';

export interface NavElement {
  icon: ReactElement;
  title: string;
  link?: string;
}
export interface SideBarProps {
  navItems: NavElement[];
  activeNavIndex?: number;
  className?: string;
}

export const SideBar: React.FC<SideBarProps> = ({
  navItems,
  className,
  activeNavIndex = 0,
}: SideBarProps) => {
  const [activeNav, setActiveNav] = useState(activeNavIndex);
  const {t} = useTranslation()
  return (
    <Wrapper className={className}>
      <Logo>
        <Image src={LOGO} />
        <AppName>{APP_NAME}</AppName>
      </Logo>
      <NavWrapper>
        {navItems.map((nav, index) => (
          <NavItem
            to={nav?.link || ''}
            key={index}
            className={index === activeNav ? 'active' : ''}
            onClick={() => setActiveNav(index)}
          >
            {React.cloneElement(nav.icon, { className: 'nav-icon' })}
            <Title className="nav-title">{t(nav.title)}</Title>
          </NavItem>
        ))}
      </NavWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0;
`;

const Image = styled.img`
  width: 42px;
  height: 42px;
  margin-left: 12px;
`;

const AppName = styled.div`
  font-weight: 600;
  font-size: 24px;
  margin-left: 8px;
`;

const NavWrapper = styled.div``;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  margin-bottom: 6px;
  border-radius: 4px;
  cursor: pointer;
  &:hover,
  &.active {
    background: ${COLORS.primary100};
    .nav-icon {
      fill: ${COLORS.primary600};
    }
    .nav-title {
      color: ${COLORS.primary600};
    }
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 15px;
  margin-left: 12px;
  color: ${COLORS.textSecondary};
`;
