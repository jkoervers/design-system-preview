import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['default', 'blank', 'primary', 'secondary'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    variant: {
      options: ['solid', 'outlined', 'flat'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
  },
  render: ({ ...args }) => ({
    props: args,
    template: `
      <button iic-button ${argsToTemplate(args)}>
        Click me
      </button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: StoryObj<ButtonComponent> = {
  name: 'Primary Button',
  args: {
    color: 'primary',
    variant: 'solid',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    color: 'secondary',
  },
};
