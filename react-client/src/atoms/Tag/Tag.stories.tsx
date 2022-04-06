import { Tag } from './Tag';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'atoms/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = args => (
  <Tag {...args} />
);

export const Default = Template.bind({});
