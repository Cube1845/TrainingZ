import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  Confirmation,
  ConfirmationService,
  MessageService,
  ToastMessageOptions,
} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppToastService } from './modules/common/services/app-toast.service';
import { AppDialogService } from './modules/common/services/app-dialog.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class AppComponent {
  private readonly messageService = inject(MessageService);
  private readonly toastService = inject(AppToastService);
  private readonly dialogService = inject(AppDialogService);
  private readonly confirmationService = inject(ConfirmationService);

  constructor() {
    this.toastService.onToast$.subscribe((opts) => this.displayToast(opts));

    this.dialogService.displayConfirmation$.subscribe((config) =>
      this.displayConfirmation(config)
    );
  }

  displayToast(options: ToastMessageOptions): void {
    this.messageService.add(options);
  }

  displayConfirmation(config: Confirmation) {
    this.confirmationService.confirm(config);
  }
}
