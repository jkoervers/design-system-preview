import { Component, inject } from '@angular/core';
import { provideRouter, Router, RouterModule, Routes } from '@angular/router';
import {
  applicationConfig,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { BreadcrumbComponent } from './breadcrumb.component';
import { Breadcrumb } from './breadcrumb.type';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  standalone: true,
  selector: 'tab1',
  template: `
    <h1>First Tab</h1>
    <p>This is the content of the first tab</p>
  `,
})
class FirstStoryContentComponent {}

@Component({
  standalone: true,
  selector: 'tab2',
  template: `
    <h1>Second Tab</h1>
    <p>This is the content of the second tab</p>
  `,
})
class SecondStoryContentComponent {}

const routes: Routes = [
  {
    path: '**',
    redirectTo: 'tab2',
    pathMatch: 'full',
  },
  {
    path: 'tab1',
    loadComponent: () => FirstStoryContentComponent,
  },
  {
    path: 'tab2',
    loadComponent: () => SecondStoryContentComponent,
  },
];

const breadcrumbs: Breadcrumb[] = [
  { label: 'Level 1', route: '/tab1' },
  { label: 'Level 2', route: '/tab2' },
];

const meta: Meta<BreadcrumbComponent> = {
  component: BreadcrumbComponent,
  title: 'Components/Breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    breadcrumbs: {
      control: { type: 'object' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        RouterModule,
        FirstStoryContentComponent,
        SecondStoryContentComponent,
      ],
    }),
    applicationConfig({
      providers: [
        provideRouter(routes),
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  render: ({ ...args }) => ({
    props: {
      ...args,
      navigate: (url: string) => {
        inject(Router).navigateByUrl(url);
      },
    },
    // template:
    //   `
    //     <iic-breadcrumb [breadcrumbs]="breadcrumbs"></iic-breadcrumb>
    //     <router-outlet></router-outlet>
    //   `,
    template: `
        <iic-breadcrumb [breadcrumbs]="breadcrumbs"></iic-breadcrumb>
      `,
  }),
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const Default: Story = {
  name: 'Breadcrumb',
  args: {
    breadcrumbs: breadcrumbs,
  },
};
