import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Breadcrumb } from './breadcrumb.type';

@Component({
  selector: 'iic-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  public breadcrumbs = input.required<Breadcrumb[]>();
}
