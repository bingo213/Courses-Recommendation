import { Button } from './Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'atoms/Button',
  component: Button,
  argTypes: {
    children: { defaultValue: 'Button', control: 'text' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});
