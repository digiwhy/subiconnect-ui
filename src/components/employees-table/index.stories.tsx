import EmployeesTable from '.';
import { _useEmployeesMockData } from '../../stories/mock-data/employee';
import { withSubiConnectProvider } from '../../stories/wrapper';
import { columns } from './columns/organisation-specific';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'EmployeesTable',
  component: withSubiConnectProvider(EmployeesTable),
  parameters: {
    layout: 'fullscreen',
    mockData: [_useEmployeesMockData],
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EmployeesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    columns: columns,
  },
};
