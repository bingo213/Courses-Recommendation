import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../atoms';
import { APP_NAME, LOGO } from '../../constants';

export interface NavElement {
  icon: ReactElement;
  title: string;
}
export interface SideBarProps {
  navItems: NavElement[];
  onClick?: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({
  navItems,
  onClick,
}: SideBarProps) => {
  const [activeNav, setActiveNav] = useState(0);
  return (
    <Wrapper>
      <Logo>
        <Image src={LOGO} />
        <AppName>{APP_NAME}</AppName>
      </Logo>
      <NavWrapper>
        {navItems.map((nav, index) => (
          <NavItem
            key={index}
            onClick={() => {
              setActiveNav(index);
              onClick && onClick();
            }}
            className={index === activeNav ? 'active' : ''}
          >
            {React.cloneElement(nav.icon, { className: 'nav-icon' })}
            <Title className="nav-title">{nav.title}</Title>
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

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  margin-bottom: 6px;
  border-radius: 4px;
  cursor: pointer;
  &:hover, &.active {
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
