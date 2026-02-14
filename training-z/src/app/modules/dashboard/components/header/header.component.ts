import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthDataService } from '../../../auth/services/auth-data.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Role } from '../../../auth/models/role';
import { NavBarItem } from '../../models/nav-bar-item';
import { catchError, filter, of } from 'rxjs';
import { ImageModule } from 'primeng/image';
import { ProfileImageService } from '../../services/profile-image.service';
import { UserData } from '../../models/user-data';
import { AppToastService } from '../../../common/services/app-toast.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [ImageModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authDataService = inject(AuthDataService);
  private readonly router = inject(Router);
  private readonly profileImageService = inject(ProfileImageService);
  private readonly toastService = inject(AppToastService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly userService = inject(UserService);

  userData = signal<UserData | undefined>(undefined);

  userRole?: Role;

  private readonly accountSettingsRoute = '/dashboard/account-settings';
  accountSettingsRouteActive = signal<boolean>(false);

  userMenuItems: MenuItem[] = [
    {
      label: 'Account',
      items: [
        {
          label: 'Log out',
          icon: 'pi pi-sign-out',
          command: () => this.signOut(),
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          command: () => this.router.navigateByUrl(this.accountSettingsRoute),
        },
      ],
    },
  ];

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
      alternativeRoutes: [
        '/dashboard/workout-selection',
        '/dashboard/workout-history',
        '/dashboard/workout-details',
      ],
      role: Role.User,
    },
    {
      text: 'Students',
      icon: 'pi pi-users',
      isSelected: signal<boolean>(false),
      route: '/dashboard/students',
      alternativeRoutes: [
        '/dashboard/student-invite',
        '/dashboard/student-manage',
        '/dashboard/workout-history',
        '/dashboard/workout-details',
      ],
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

  private getUrlWithoutParams(route: ActivatedRoute): string {
    var urlSegments = [route.firstChild];

    let i = 0;

    while (urlSegments[i]!.children.length > 0) {
      urlSegments.push(urlSegments[i]!.firstChild);
      i++;
    }

    const urlParts = urlSegments
      .filter((x) => !!x && !!x.snapshot.url[0])
      .map((x) => x?.snapshot.url[0]);

    return '/' + urlParts.join('/');
  }

  constructor() {
    this.userService
      .getUserData()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'There was an error',
          );
          return;
        }

        this.profileImageService
          .convertProfileImageId(result.value)
          .subscribe((userData) => {
            this.userData.set(userData);
          });
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.navBarItems().forEach((x) => x.isSelected.set(false));
        this.accountSettingsRouteActive.set(false);

        const route = this.getUrlWithoutParams(this.activatedRoute.root);

        if (route == this.accountSettingsRoute) {
          this.accountSettingsRouteActive.set(true);
        }

        this.navBarItems().forEach((item, index) => {
          if (route == item.route || item.alternativeRoutes.includes(route)) {
            this.navBarItems()[index].isSelected.set(true);
          }
        });
      });

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
