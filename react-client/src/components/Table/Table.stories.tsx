import { ComponentMeta } from '@storybook/react';
import {Table} from './Table';
import { tableData1, tableData2 } from './__mocks__';

export default {
  title: 'components/Table',
  component: Table,
  argTypes: {
    indexing: {
      control: 'boolean'
    }
  }
} as ComponentMeta<typeof Table>;

export const Example1 = (args: any) => <Table {...tableData1} {...args} />;
export const Example2 = (args: any) => <Table {...tableData2} {...args} />