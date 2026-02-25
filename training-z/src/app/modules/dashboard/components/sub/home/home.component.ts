import { Component, inject, OnInit } from '@angular/core';
import { AuthDataService } from '../../../../auth/services/auth-data.service';
import { Role } from '../../../../auth/models/role';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly authDataService = inject(AuthDataService);

  userRole?: Role;

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
