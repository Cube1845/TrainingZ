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
    this.setCalendarData();
    this.loadUserName();

    if (this.userRole === Role.Coach) {
      this.loadStudentsCount();
      return;
    }

    this.loadCoachData();
    this.loadWorkoutsData();
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  private setCalendarData(): void {
    const today = new Date();

    this.todayDayName.set(
      today.toLocaleDateString(undefined, { weekday: 'long' }).toUpperCase(),
    );
    this.todayDateLabel.set(
      today.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    );

    const shortWeekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const todayIndex = (today.getDay() + 6) % 7;

    this.weekDays.set(
      shortWeekNames.map((label, index) => ({
        label,
        isToday: index === todayIndex,
      })),
    );
  }

  private loadUserName(): void {
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

        this.userName.set(result.value.name);
      });
  }

  private loadStudentsCount(): void {
    this.coachingService
      .getStudents()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'There was an error',
          );
          return;
        }

        this.studentsCount.set(result.value.students.length);
      });
  }

  private loadCoachData(): void {
    this.coachingService
      .getCoachData()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'There was an error',
          );
          return;
        }

        const coachData = result.value;

        if (!coachData) {
          this.hasCoach.set(false);
          return;
        }

        this.hasCoach.set(true);
        this.coachName.set(coachData.name + ' ' + coachData.surname);
      });
  }

  private loadWorkoutsData(): void {
    this.workoutsService
      .getWorkoutsData()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'There was an error',
          );
          return;
        }

        this.workoutsData.set(result.value);
      });
  }
}
