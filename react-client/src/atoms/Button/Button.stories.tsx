import { Button } from './Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'atoms/Button',
  component: Button,
  argTypes: {
    text: { defaultValue: 'Button' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});
