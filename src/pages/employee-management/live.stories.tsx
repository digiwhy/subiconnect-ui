import EmployeeManagementPage from '.';
import { _useEmployeesMockData } from '@/stories/mock-data/employee';
import { _useOrganisationsMockData } from '@/stories/mock-data/organisation';
import { withSubiConnectProvider } from '@/stories/wrapper';
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
