import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  contentChildren,
  forwardRef,
  inject,
  input,
  output,
  viewChild,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SelectService } from './select.service';
import { SelectOptionComponent } from './select-option.component';

@Component({
  selector: 'iic-select',
  standalone: true,
  imports: [CommonModule, PortalModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    SelectService,
  ],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly hostElement = inject(ElementRef);
  private readonly selectService = inject(SelectService);
  private readonly overlay = inject(Overlay);

  public label = input<string>();
  public placeholder = input<string>();

  public change = output<{ value: string; viewValue: string }>();

  public contentTemplate = viewChild(CdkPortal);
  public options = contentChildren(SelectOptionComponent);

  public isDisabled!: boolean;
  public value!: string;
  public viewValue!: string;

  private overlayRef!: OverlayRef;

  @HostBinding('attr.tabindex') tabindex = 0;

  @HostBinding('class')
  get classes(): string {
    return `
      select 
      ${this.label() && 'select--labeled'}
      ${this.isDisabled && 'select--disabled'}
    `;
  }

  @HostListener('click', ['$event'])
  onClick(event: UIEvent): void {
    this.showOptions(event);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  public ngOnInit(): void {
    this.selectService.register(this);
  }

  // check if this can be removed when using ngOnChanges
  public ngAfterViewInit(): void {
    const option = this.options().find(
      (option) => option.value() === this.value
    );
    if (!option || !option.getOptionViewValue()) return;

    this.viewValue = option.getOptionViewValue()!;
    this.cdRef.detectChanges();
  }

  public ngOnChanges(): void {
    // console.log('onchanges');
    const option = this.options().find(
      (option) => option.value() === this.value
    );
    if (!option || !option.getOptionViewValue()) return;

    this.viewValue = option.getOptionViewValue()!;
  }

  public showOptions(event: UIEvent): void {
    if (this.isDisabled === true) return;

    event.stopPropagation();
    this.hostElement.nativeElement.focus();

    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate());
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
  }

  public onOptionSelected(option: SelectOptionComponent): void {
    this.hide();

    if (!option.value() || !option.getOptionViewValue()) return;

    this.onChange(option.value());
    this.value = option.value()!;
    this.viewValue = option.getOptionViewValue()!;
    this.change.emit({ value: this.value, viewValue: this.viewValue });
  }

  /**
   * form control accessor
   */

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public writeValue(value: any): void {
    // console.log('writeValue', value);
    this.value = value;

    // test if prefill works
    // check if this can be removed when using ngOnChanges
    const option = this.options().find(
      (option) => option.value() === this.value
    );
    if (!option || !option.getOptionViewValue()) return;

    this.viewValue = option.getOptionViewValue()!;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**
   * portal overlay
   */

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.hostElement.nativeElement)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4,
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private syncWidth(): void {
    if (!this.overlayRef) {
      return;
    }

    const width = this.hostElement.nativeElement.getBoundingClientRect().width;
    this.overlayRef.updateSize({ width });
  }

  private hide(): void {
    this.overlayRef.detach();
  }
}
