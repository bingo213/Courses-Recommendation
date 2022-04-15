import React from 'react';
import styled from 'styled-components';
import { AngleDown, Avatar, COLORS, Logout } from '../../atoms';
import { REGIONS } from '../../constants';
import { useLanguage } from '../../hooks';
import { Dropdown, DropdownItem } from '../Dropdown';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface PageHeaderProps {
  title: string;
  subTitle?: string;
  username: string;
  avatar?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subTitle,
  username,
  avatar,
}: PageHeaderProps) => {
  const { t } = useTranslation();
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
              style={{ width: 170 }}
            />
          )
      )}
    </>
  );
  const userMenu = (
    <>
      <Link to="/login">
        <DropdownItem
          label={t('Logout')}
          prefixIcon={<Logout width={24} fill={COLORS.textSecondary} />}
          style={{ width: 150 }}
        />
      </Link>
    </>
  );
  return (
    <Header>
      <Left>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Left>
      <Right>
        <Dropdown
          menu={localizationMenu}
          trigger="click"
          placement="bottom-end"
        >
          <DropdownItem
            label={currentRegion && currentRegion.name}
            prefixIcon={currentRegion && currentRegion.flag}
            suffixIcon={<AngleDown width={24} fill={COLORS.textSecondary} />}
            style={{ width: 170 }}
          />
        </Dropdown>
        <Dropdown menu={userMenu} trigger="click" placement="bottom-end">
          <DropdownItem
            label={username}
            prefixIcon={
              avatar ? (
                <Avatar image={avatar} size="small" />
              ) : (
                <Avatar
                  size="small"
                  image="https://chiase24.com/wp-content/uploads/2022/02/tang-hap-hanh-anh-avatar-hai-haeac-nhan-la-ba_t-caea_i-1.jpg"
                />
              )
            }
            suffixIcon={<AngleDown width={24} fill={COLORS.textSecondary} />}
            style={{ marginLeft: 24 }}
          />
        </Dropdown>
      </Right>
    </Header>
  );
};

const Header = styled.div`
  .dropdown-menu {
    border: 1px solid ${COLORS.line100};
    width: fit-content !important;
  }
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-size: 26px;
`;

const SubTitle = styled.p`
  color: ${COLORS.textSecondary};
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
`;