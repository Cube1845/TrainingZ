import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Notification } from '../../../models/notification';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { CoachingService } from '../../../services/coaching.service';
import { catchError, of } from 'rxjs';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { AppDialogService } from '../../../../common/services/app-dialog.service';

@Component({
  selector: 'app-notifications',
  imports: [ImageModule, DividerModule, DatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  private readonly coachingService = inject(CoachingService);
  private readonly toastService = inject(AppToastService);
  private readonly dialogService = inject(AppDialogService);

  notifications = signal<Notification[]>([]);

  constructor() {
    this.loadNotifications();
  }

  loadNotifications(): void {
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

  clearNotifications(): void {
    if (this.notifications().length == 0) {
      return;
    }

    this.dialogService
      .displayConfirmation('Are you sure?', 'Do you want to clear notifications?')
      .subscribe(() => {
        this.coachingService
          .clearNotifications()
          .pipe(catchError((err) => of(err)))
          .subscribe((result) => {
            if (!result.isSuccess) {
              this.toastService.error(
                result.error.message || result.message || 'There was an error'
              );
              return;
            }

            this.notifications.set([]);
            this.toastService.success('Notifications cleared');
          });
      });
  }

  deleteNotification(notificationId: string): void {
    this.coachingService
      .deleteNotification(notificationId)
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'There was an error'
          );
          return;
        }

        this.notifications.update((notifications) =>
          notifications.filter((x) => x.id != notificationId)
        );
      });
  }
}
