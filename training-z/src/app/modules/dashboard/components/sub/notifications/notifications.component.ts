import { Component, inject, signal } from '@angular/core';
import { Notification } from '../../../models/notification';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { CoachingService } from '../../../services/coaching.service';
import { catchError, of } from 'rxjs';
import { AppToastService } from '../../../../common/services/app-toast.service';

@Component({
  selector: 'app-notifications',
  imports: [ImageModule, DividerModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  private readonly coachingService = inject(CoachingService);
  private readonly toastService = inject(AppToastService);

  notifications = signal<Notification[]>([]);

  constructor() {
    this.coachingService
      .getNotifications()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'There was an error'
          );
          return;
        }

        this.notifications.set(result.value.notifications);
      });
  }
}
