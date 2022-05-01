import React from 'react';
import styled from 'styled-components';
import { AngleDown, Avatar, COLORS, Logout } from '../../atoms';
import { DEFAULT_AVATAR, REGIONS } from '../../constants';
import { Dropdown, DropdownItem } from '../Dropdown';
import { useTranslation } from 'react-i18next';
import { userApi } from '../../apis';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../hooks';

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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const currentRegion = REGIONS[currentLanguage];
  console.log(currentLanguage);
  const localizationMenu = (
    <>
      {Object.values(REGIONS).map(
        el =>
          el !== currentRegion && (
            <DropdownItem
              key={el.key}
              label={el.name}
              prefixIcon={el.flag}
              onClick={() => changeLanguage && changeLanguage(el.key)}
              style={{ width: 170 }}
            />
          )
      )}
    </>
  );
  const userMenu = (
    <>
      <DropdownItem
        label={t('Logout')}
        prefixIcon={<Logout width={24} fill={COLORS.textSecondary} />}
        style={{ width: 150 }}
        onClick={() => {
          userApi.logout().then(() => {
            navigate('/login');
          });
        }}
      />
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
                <Avatar size="small" image={DEFAULT_AVATAR} />
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
