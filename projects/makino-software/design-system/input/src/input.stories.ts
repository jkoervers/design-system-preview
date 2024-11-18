import { type Meta, type StoryObj } from '@storybook/angular';

import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'Enter value' },
      },
    },
  },
  // render: ({ ...args }) => ({
  //   props: args,
  //   template: `
  //     <iic-input label='Label' placeholder='Placeholder'}></iic-input>`,
  // }),
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Primary: Story = {
  name: 'Primary Input',
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};
