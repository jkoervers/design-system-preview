import { Component } from '@angular/core';

import { ButtonComponent } from '@makino-software/design-system/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'showcase';
}
