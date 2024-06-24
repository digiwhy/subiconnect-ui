import EmployeeManagementPage from '.';
import { withSubiConnectProvider } from '../../stories/wrapper';
import { SelectableEmployeeColumns } from '../../types/employee';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Live EmployeeManagementPage',
  component: withSubiConnectProvider(EmployeeManagementPage),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EmployeeManagementPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Salary: Story = {
  args: {
    enabledColumns: [SelectableEmployeeColumns.SALARY],
  },
};

export const HourlyRate: Story = {
  args: {
    enabledColumns: [SelectableEmployeeColumns.HOURLY_RATE],
  },
};

export const ALL: Story = {
  args: {
    enabledColumns: [
      SelectableEmployeeColumns.SALARY,
      SelectableEmployeeColumns.HOURLY_RATE,
    ],
  },
};
