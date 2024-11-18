import { CommonModule } from '@angular/common';
import {
  forwardRef,
  input,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { InputType } from './input-type.type';

@Component({
  selector: 'iic-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  public label = input<string | null>();
  public placeholder = input<string>('Enter value');
  public type = input<InputType>('text');

  @HostBinding('class')
  get classes(): string {
    return `
      input
      ${this.label() && 'input--labeled'}
      ${this.isDisabled && 'input--disabled'}
    `;
  }

  public value: number | string = '';
  public isDisabled!: boolean;
  public isVisible = false;

  // public onFocused(): void {
  //   console.log('focus');
  // }

  public reset(): void {
    this.value = '';
    this.onChanged(this.value);
  }

  public togglePassword(): void {
    this.isVisible = !this.isVisible;
  }

  /**
   * form control accessor
   */

  public onChanged = (_: any) => {};
  public onTouched!: () => {};

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: () => any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
