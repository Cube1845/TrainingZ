import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { Router } from '@angular/router';
import { GetCodeService } from '../../../services/requests/get-code/get-code.service';

@Component({
  selector: 'app-invitation-code',
  imports: [],
  templateUrl: './invitation-code.component.html',
  styleUrl: './invitation-code.component.scss',
})
export class InvitationCodeComponent {
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly getCodeRequest = inject(GetCodeService);

  code?: WritableSignal<string>;

  constructor() {
    this.getCodeRequest.request().subscribe((result) => {
      if (!result.isSuccess) {
        this.router.navigateByUrl('dashboard/coach');
        return;
      }

      this.code = signal<string>(result.value.code);
    });
  }

  copyCode() {
    navigator.clipboard
      .writeText(this.code!())
      .then(() => {
        this.toastService.success('Copied!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }
}
