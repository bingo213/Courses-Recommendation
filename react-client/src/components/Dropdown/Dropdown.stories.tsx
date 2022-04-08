import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../../atoms';
import { menu } from './__mocks__';

export default {
  title: 'components/Dropdown',
  component: Dropdown,
  argTypes: {
    placement: {
      control: {
        type: 'select',
        options: {
          top: 'top',
          bottom: 'bottom',
          left: 'left',
          right: 'right',
          auto: 'auto',
          'auto-start': 'auto-start',
          'auto-end': 'auto-end',
          'top-start': 'top-start',
          'top-end': 'top-end',
          'bottom-start': 'bottom-start',
          'bottom-end': 'bottom-end',
          'right-start': 'right-start',
          'right-end': 'right-end',
          'left-start': 'left-end',
        },
      },
    },
    trigger: {
      control: { type: 'select', options: { hover: 'hover', click: 'click' } },
    },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <div
    style={{
      padding: '20px',
      height: '500px',
      background: '#ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Dropdown {...args}>
      <Button>Dropdown</Button>
    </Dropdown>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  menu: <div style={{width: 200}}>{menu}</div>,
};
