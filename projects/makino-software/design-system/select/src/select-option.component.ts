import { CommonModule } from '@angular/common';
import {
  inject,
  input,
  viewChild,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';

import { SelectComponent } from './select.component';
import { SelectService } from './select.service';

@Component({
  selector: 'iic-select-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss',
})
export class SelectOptionComponent implements OnInit {
  private readonly selectService = inject(SelectService);

  public value = input<string>();
  public disabled = input<boolean>(false);

  private option = viewChild<ElementRef>('option');

  public select!: SelectComponent;

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent): void {
    event.preventDefault();
    if (!this.disabled()) {
      this.select.onOptionSelected(this);
    }
  }

  public ngOnInit(): void {
    this.select = this.selectService.getSelect();
  }

  public getOptionViewValue(): string | undefined {
    if (!this.option()) return;

    return this.option()!.nativeElement.innerHTML;
  }
}
