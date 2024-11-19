import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  component: BadgeComponent,
  title: 'Components/Badge',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {
  name: 'Badge',
  args: {
    value: '8',
  },
};
