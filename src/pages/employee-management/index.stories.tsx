import EmployeeManagementPage from '.';
import { useEmployeesMockData } from '../../stories/mock-data/employee';
import { withSubiConnectProvider } from '../../stories/wrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'EmployeeManagementPage',
  component: withSubiConnectProvider(EmployeeManagementPage),
  parameters: {
    layout: 'fullscreen',
    mockData: [useEmployeesMockData],
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EmployeeManagementPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
