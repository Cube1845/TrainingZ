import { Component, signal } from '@angular/core';
import { Notification } from '../../../models/notification';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-notifications',
  imports: [ImageModule, DividerModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  notifications = signal<Notification[]>([
    {
      header: 'From Jakub Jerzy',
      message:
        'Do your workout! stop ahauiwf abegubae uibisbfisbe fibseifb seibf osemf opseo esipf ebnawda wdawgesg srg drgh tjtyj rth rthgfggherg rthg jku ergf rw',
      id: 'awdawdaw-awdawdaw-awdawdaw',
    },
    {
      header: 'TrainingZ',
      message: "Don't forget o work out!",
      id: 'awdawdaw-awdawdaw-awdawdaw',
    },
  ]);
}
