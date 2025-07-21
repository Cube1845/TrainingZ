import { signal, WritableSignal } from '@angular/core';
import { Role } from '../../auth/models/role';

export class NavBarItem {
  text: string = '';
  icon: string = '';
  route: string = '';
  isSelected: WritableSignal<boolean> = signal<boolean>(false);
  alternativeRoutes: string[] = [];
  role: Role | undefined;
}
