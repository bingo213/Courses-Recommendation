import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DropdownItem } from './DropdownItem';
import styled from 'styled-components';
import { Account } from '../../../atoms/Icons';
import { menu } from '../__mocks__';
export default {
  title: 'components/DropdownItem',
  component: DropdownItem,
  argTypes: {
    label: { defaultValue: 'Label' },
    onClick: { control: { disable: true } },
    icon: {
      control: 'select',
      options: ['icon', 'none'],
      mapping: { icon: <Account width={24} />, none: undefined },
      table: { type: { summary: 'React.ReactElement' } },
    },
  },
} as ComponentMeta<typeof DropdownItem>;

const Wrap = styled.div`
  width: 600px;
  height: 500px;
  background-color: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Phone = styled.div`
  width: 350px;
  height: 450px;
  background-color: #ddd;
`;

const Template: ComponentStory<typeof DropdownItem> = (args) => (
  <DropdownItem {...args} />
);

export const Default = Template.bind({});

export const Example = () => {
  return (
    <Wrap>
        <Phone>{menu}</Phone>
    </Wrap>
  );
};
