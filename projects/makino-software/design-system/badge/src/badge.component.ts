import { Component, Input } from '@angular/core';

@Component({
  selector: 'iic-badge',
  standalone: true,
  imports: [],
  template: `{{ value }}`,
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input()
  public value!: string | number;
}
