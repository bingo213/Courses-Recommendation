import { MyDatePicker as DatePicker } from './DatePicker';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components/DatePicker',
  component: DatePicker,
  argTypes: {
    label: {defaultValue: 'Choose date'}
  }
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = args => <DatePicker {...args} />;

export const Default = Template.bind({});
