import { CommonModule } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';

import { ButtonColor } from './button-color.type';
import { ButtonShape } from './button-shape.type';
import { ButtonSize } from './button-size.type';
import { ButtonVariant } from './button-variant.type';

@Component({
  selector: 'button[iic-button]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  public readonly color = input<ButtonColor>('default');
  public readonly shape = input<ButtonShape>('square');
  public readonly size = input<ButtonSize>('medium');
  public readonly variant = input<ButtonVariant>('solid');

  @HostBinding('class')
  get classes(): string {
    return `${this.color()} ${this.shape()} ${this.size()} ${this.variant()}`;
  }
}
