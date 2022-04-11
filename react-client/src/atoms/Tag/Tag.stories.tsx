import { Tag } from './Tag';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTranslation } from 'react-i18next';

export default {
  title: 'atoms/Tag',
  component: Tag,
  argTypes: {
    // title: { defaultValue: t('test') },
    color: { defaultValue: '#2E86C1' },
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = args => {
  const { t } = useTranslation();
  return <Tag {...args} title={t('test')} />;
};

export const Default = Template.bind({});
