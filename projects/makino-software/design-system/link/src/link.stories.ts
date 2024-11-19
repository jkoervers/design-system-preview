import { Component } from '@angular/core';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { LinkComponent } from './link.component';

@Component({
  standalone: true,
  template: `
    <h1>Linked To</h1>
    <p>This is the content of the page.</p>
  `,
})
class LinkedToComponent {}

const routes: Routes = [
  {
    path: 'linked-to',
    loadComponent: () => LinkedToComponent,
  },
];

const meta: Meta<LinkComponent> = {
  component: LinkComponent,
  title: 'Components/Link',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [LinkedToComponent],
    }),
    applicationConfig({
      providers: [provideRouter([...routes], withHashLocation())],
    }),
  ],
};
export default meta;
type Story = StoryObj<LinkComponent>;

export const Default: Story = {
  name: 'Link',
  args: {
    label: 'This is a link',
    route: '/linked-to',
  },
};
