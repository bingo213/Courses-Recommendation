import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from './atoms';
import { SideBar } from './components';
import { PageHeader } from './components/PageHeader';
import { routes } from './config';
import { SIDE_BAR } from './constants';
import { useCurrentUser } from './hooks';
import { Login, NotFound } from './pages';

const AppMainLayout: React.FC<{ username: string }> = ({ username }) => {
  const location = useLocation();
  const path = location.pathname;
  const { t } = useTranslation();
  return (
    <>
      <StyledSideBar
        navItems={SIDE_BAR}
        activeNavIndex={SIDE_BAR.findIndex(
          e => e?.link && path.includes(e.link)
        )}
      />
      <Main>
        <PageHeader
          title={t(
            SIDE_BAR.find(e => e?.link && path.includes(e.link))?.title || ''
          )}
          username={username || 'user'}
          subTitle={t('LearnMoreEffectively')}
        />
        <Outlet />
      </Main>
    </>
  );
};

const ProtectedRoute = () => {
  const { user } = useCurrentUser();
  const location = useLocation();
  return user.username ? (
    <AppMainLayout username={user.username} />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export const App: React.FC<{}> = () => {
  const accountRoutes = routes.filter(
    route => route.path === 'sign_up' || route.path === 'login'
  );
  const mainRoutes = routes.filter(
    route => route.path !== 'sign_up' && route.path !== 'login'
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          {accountRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>
        <Route path="user" element={<ProtectedRoute />}>
          {mainRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const StyledSideBar = styled(SideBar)`
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  padding: 0 12px;
  border-right: 2px solid ${COLORS.line50};
`;

const Main = styled.div`
  margin-left: 250px;
  padding: 12px 32px;
  overflow-x: hidden;
`;
