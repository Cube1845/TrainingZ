import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss',
})
export class AppButtonComponent {
  loading = input(false);
  label = input<string | null>(null);
  icon = input<string | null>(null);
  disabled = input(false);
  size = input<'small' | 'large'>();
  outlined = input<boolean>(false);
  color = input<'primary' | 'secondary'>('primary');
  class = input<string>('');
  styleClass = input<string>('');
}
