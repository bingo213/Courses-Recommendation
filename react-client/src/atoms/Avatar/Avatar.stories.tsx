import { Avatar } from './Avatar';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'atoms/Avatar',
  component: Avatar,
  argTypes: {
    image: {
      defaultValue:
        'https://chiase24.com/wp-content/uploads/2022/02/tang-hap-hanh-anh-avatar-hai-haeac-nhan-la-ba_t-caea_i-1.jpg',
    },
    icon: {
      control: 'radio',
      options: ['icon', 'none'],
      mapping: { icon: <p>T</p>, none: undefined },
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />;

export const Default = Template.bind({});
