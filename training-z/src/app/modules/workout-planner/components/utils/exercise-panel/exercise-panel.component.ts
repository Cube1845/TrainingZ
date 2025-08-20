import { Component, input } from '@angular/core';
import { Exercise } from '../../../models/exercise';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-exercise-panel',
  imports: [CardModule],
  templateUrl: './exercise-panel.component.html',
  styleUrl: './exercise-panel.component.scss',
})
export class ExercisePanelComponent {
  exercise = input.required<Exercise>();
}
