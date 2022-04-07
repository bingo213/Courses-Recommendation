import { ComponentMeta } from '@storybook/react';
import { SideBar } from './SideBar';
import { navData } from './__mocks__';

export default {
  title: 'components/SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

export const Default = () => (
  <div style={{ width: '250px', padding: '0 18px' }}>
    <SideBar {...navData} />
  </div>
);
