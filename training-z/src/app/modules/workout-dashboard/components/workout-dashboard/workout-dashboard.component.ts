import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { AppInputComponent } from '../../../common/components/app-input/app-input.component';
import { AccordionModule } from 'primeng/accordion';
import { AppButtonComponent } from '../../../common/components/app-button/app-button.component';

@Component({
  selector: 'app-workout-dashboard',
  imports: [
    DividerModule,
    CheckboxModule,
    AppInputComponent,
    AccordionModule,
    AppButtonComponent,
  ],
  templateUrl: './workout-dashboard.component.html',
  styleUrl: './workout-dashboard.component.scss',
})
export class WorkoutDashboardComponent {}
