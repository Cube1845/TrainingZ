import { Component, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TrainingUnit } from '../../../../../workout-planner/models/training-unit';

@Component({
  selector: 'app-training-unit-display',
  imports: [AccordionModule],
  templateUrl: './training-unit-display.component.html',
  styleUrl: './training-unit-display.component.scss',
})
export class TrainingUnitDisplayComponent {
  trainingUnit = input.required<TrainingUnit>();
}
