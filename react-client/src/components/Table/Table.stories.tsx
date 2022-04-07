import { ComponentMeta } from '@storybook/react';
import {Table} from './Table';
import { tableData1, tableData2 } from './__mocks__';

export default {
  title: 'components/Table',
  component: Table
} as ComponentMeta<typeof Table>;

export const Example1 = () => <Table {...tableData1} />;
export const Example2 = () => <Table {...tableData2} />