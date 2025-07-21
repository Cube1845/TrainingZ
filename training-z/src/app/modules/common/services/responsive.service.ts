import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private width = signal(window.innerWidth);

  public readonly lg = computed(() => this.width() > 992);

  constructor() {
    window.addEventListener('resize', () => this.width.set(window.innerWidth));
  }
}
