import { Component, inject, signal } from '@angular/core';
import { AuthDataService } from '../../../auth/services/auth-data.service';
import { NavigationEnd, Router } from '@angular/router';
import { Role } from '../../../auth/models/role';
import { NavBarItem } from '../../models/nav-bar-item';
import { filter } from 'rxjs';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-header',
  imports: [ImageModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authDataService = inject(AuthDataService);
  private readonly router = inject(Router);

  userRole?: Role;

  private readonly accountSettingsRoute = '/dashboard/account-settings';
  accountSettingsRouteActive = signal<boolean>(false);

  readonly navBarItems = signal<NavBarItem[]>([
    {
      text: 'Home',
      icon: 'pi pi-home',
      isSelected: signal<boolean>(false),
      route: '/dashboard',
      alternativeRoutes: [],
      role: undefined,
    },
    {
      text: 'Coach',
      icon: 'pi pi-user',
      isSelected: signal<boolean>(false),
      route: '/dashboard/coach',
      alternativeRoutes: ['/dashboard/invitation-code'],
      role: Role.User,
    },
    {
      text: 'Workouts',
      icon: 'pi pi-book',
      isSelected: signal<boolean>(false),
      route: '/dashboard/workouts',
      alternativeRoutes: [],
      role: Role.User,
    },
    {
      text: 'Students',
      icon: 'pi pi-users',
      isSelected: signal<boolean>(false),
      route: '/dashboard/students',
      alternativeRoutes: ['/dashboard/student-invite'],
      role: Role.Coach,
    },
    {
      text: 'Notifications',
      icon: 'pi pi-bell',
      isSelected: signal<boolean>(false),
      route: '/dashboard/notifications',
      alternativeRoutes: [],
      role: undefined,
    },
  ]);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const route = event.urlAfterRedirects;

        this.navBarItems().forEach((x) => x.isSelected.set(false));
        this.accountSettingsRouteActive.set(false);

        if (route == this.accountSettingsRoute) {
          this.accountSettingsRouteActive.set(true);
        }

        this.navBarItems().forEach((item, index) => {
          if (route == item.route || item.alternativeRoutes.includes(route)) {
            this.navBarItems()[index].isSelected.set(true);
          }
        });
      });
  }

  ngOnInit(): void {
    this.userRole = this.authDataService.getUserRole();
  }

  signOut(): void {
    this.authDataService.clearAuthData();
    this.router.navigateByUrl('');
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
