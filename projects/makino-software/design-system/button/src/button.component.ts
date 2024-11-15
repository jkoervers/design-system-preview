import { CommonModule } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';

import { ButtonColor } from './button-color.type';
import { ButtonVariant } from './button-variant.type';

/**
 * This is the button component. It can be used to build clicky things!
 *
 * [Figma reference](https://www.figma.com/file/X1JRLUCEp6JnoeKAxRPNeF/Angular-Architects-Design-Systems?node-id=1%3A3)
 *  |
 * [Implementation](https://github.com/andreaswissel/design-systems-workshop-latest/blob/lab-6/src/app/button/button.component.ts)
 *  |
 * [Specification](https://github.com/andreaswissel/design-systems-workshop/wiki/Lab-06:-Documentation)
 */

@Component({
  selector: 'button[iic-button]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  public readonly color = input<ButtonColor>('default');
  public readonly variant = input<ButtonVariant>('solid');

  @HostBinding('class')
  get classes(): string {
    return `${this.color()} ${this.variant()}`;
  }
}
