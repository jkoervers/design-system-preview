import { Component } from '@angular/core';

import { ButtonComponent } from '@makino-software/design-system/button';
import { InputComponent } from '@makino-software/design-system/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'showcase';
}
