import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-workout-planner',
  imports: [AccordionModule],
  templateUrl: './workout-planner.component.html',
  styleUrl: './workout-planner.component.scss',
})
export class WorkoutPlannerComponent {}
