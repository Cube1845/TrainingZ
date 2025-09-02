import { Component, input, output } from '@angular/core';
import { Exercise } from '../../../models/exercise';
import { IntensityType } from '../../../models/enums/intensity-type';

@Component({
  selector: 'app-exercise-panel',
  imports: [],
  templateUrl: './exercise-panel.component.html',
  styleUrl: './exercise-panel.component.scss',
})
export class ExercisePanelComponent {
  exercise = input.required<Exercise>();

  panelClicked = output<void>();

  getIntensityType(intensityType: IntensityType) {
    return IntensityType[intensityType];
  }
}
