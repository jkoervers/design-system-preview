import type { Meta, StoryObj } from '@storybook/angular';

import { LoadingSpinnerComponent } from './loading-spinner.component';

const meta: Meta<LoadingSpinnerComponent> = {
  component: LoadingSpinnerComponent,
  title: 'Components/Loading Spinner',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<LoadingSpinnerComponent>;

export const Primary: Story = {
  args: {},
};
