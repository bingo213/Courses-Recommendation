import { Input } from './Input';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'atoms/Input',
  component: Input,
  argTypes: {
    value: { control: 'text' },
    label: {
      defaultValue: 'Họ và tên',
    },
    placeholder: {defaultValue: 'Placeholder'},
    type: { control: 'radio', options: ['number', 'text', 'password'] },
    note: { defaultValue: 'Nhập vào họ và tên' },
    variant: { control: 'radio', options: ['line', 'box'] },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const Default = Template.bind({});
