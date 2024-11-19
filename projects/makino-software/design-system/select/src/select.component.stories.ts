import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { SelectComponent } from './select.component';
import { SelectOptionComponent } from './select-option.component';

const meta: Meta<SelectComponent> = {
  component: SelectComponent,
  title: 'Components/Select',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        PortalModule,
        SelectComponent,
        SelectOptionComponent,
      ],
    }),
  ],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
  render: ({ ...args }) => ({
    props: args,
    template: `
      <iic-select ${argsToTemplate(args)}>
        <iic-select-option value="option1">Option 1</iic-select-option>
        <iic-select-option value="option2">Option 2</iic-select-option>
        <iic-select-option value="option3">Option 3</iic-select-option>
      </iic-select>`,
  }),
};
export default meta;

type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  name: 'Select',
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};
