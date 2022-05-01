import { Select } from './Select';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TAG_COLOR } from '../../atoms';
import { useState } from 'react';

export default {
  title: 'components/Select',
  component: Select,
  args: {
    label: 'Lựa chọn định hướng',
    note: 'Có thể lựa chọn nhiều hơn 1',
    options: [
      { text: 'Mạng máy tính', value: 'MMT', color: TAG_COLOR[0] },
      { text: 'Tương tác người - máy', value: 'TTNM', color: TAG_COLOR[1] },
      { text: 'Thương mại điện tử', value: 'TMĐT', color: TAG_COLOR[2] },
      { text: 'Các hệ thống thông minh', value: 'CHTTM', color: TAG_COLOR[3] },
      { text: 'Phát triển hệ thống', value: 'PTHT', color: TAG_COLOR[4] },
    ],
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => {
  const [activeOptions, setActiveOptions] = useState<string[]>([
    'MMT',
    'CHTTM',
  ]);
  return (
    <Select
      {...args}
      activeOptions={activeOptions}
      setActiveOptions={setActiveOptions}
    />
  );
};

export const Default = Template.bind({});
