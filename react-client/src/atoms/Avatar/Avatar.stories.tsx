import { Avatar } from './Avatar';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Photo } from '../Icons';
import { COLORS } from '../colors';

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
      mapping: { icon: <Photo width={25} fill={COLORS.textSecondary} />, none: undefined },
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />;

export const Default = Template.bind({});
