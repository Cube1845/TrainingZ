import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { Router } from '@angular/router';
import { GetCodeService } from '../../../services/requests/get-code/get-code.service';
import { catchError, of } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { ResponsiveService } from '../../../../common/services/responsive.service';

@Component({
  selector: 'app-invitation-code',
  imports: [TextareaModule, DividerModule],
  templateUrl: './invitation-code.component.html',
  styleUrl: './invitation-code.component.scss',
})
export class InvitationCodeComponent {
  public readonly responsive = inject(ResponsiveService);

  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly getCodeRequest = inject(GetCodeService);

  code?: WritableSignal<string>;

  constructor() {
    this.getCodeRequest
      .request()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
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
