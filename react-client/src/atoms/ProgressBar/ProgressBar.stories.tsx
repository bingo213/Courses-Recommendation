import { ProgressBar } from './ProgressBar';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'atoms/ProgressBar',
  component: ProgressBar,
  argTypes: {
    progress: { defaultValue: 70 },
  },
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = args => (
  <ProgressBar {...args} />
);

export const Default = Template.bind({});
