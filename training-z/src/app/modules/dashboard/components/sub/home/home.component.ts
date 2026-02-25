import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Role } from '../../../../auth/models/role';
import { AuthDataService } from '../../../../auth/services/auth-data.service';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { UserService } from '../../../services/user.service';
import { CoachingService } from '../../../services/coaching.service';
import { WorkoutsData } from '../../../models/workouts-data';
import { WorkoutsService } from '../../../../workout-dashboard/services/workouts.service';
import { TagModule } from 'primeng/tag';

type WeekDayInfo = {
  label: string;
  isToday: boolean;
};

@Component({
  selector: 'app-home',
  imports: [TagModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly authDataService = inject(AuthDataService);
  private readonly userService = inject(UserService);
  private readonly coachingService = inject(CoachingService);
  private readonly workoutsService = inject(WorkoutsService);
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);

  readonly role = Role;

  userRole?: Role;
  userName = signal<string>('');
  studentsCount = signal<number>(0);
  hasCoach = signal<boolean>(false);
  coachName = signal<string>('');
  workoutsData = signal<WorkoutsData | undefined>(undefined);

  todayDayName = signal<string>('');
  todayDateLabel = signal<string>('');
  weekDays = signal<WeekDayInfo[]>([]);

  ngOnInit(): void {
    this.userRole = this.authDataService.getUserRole();
  }
}
