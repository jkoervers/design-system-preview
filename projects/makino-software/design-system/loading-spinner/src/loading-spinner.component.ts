import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'iic-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
})
export class LoadingSpinnerComponent {}
