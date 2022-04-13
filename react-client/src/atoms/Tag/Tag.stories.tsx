import { Tag } from './Tag';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'atoms/Tag',
  component: Tag,
  argTypes: {
    title: { defaultValue: 'Mạng máy tính' },
    color: { defaultValue: '#2E86C1' },
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = args => <Tag {...args} />;

export const Default = Template.bind({});
