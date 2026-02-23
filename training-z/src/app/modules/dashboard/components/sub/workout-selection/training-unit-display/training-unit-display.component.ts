import { Component, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TrainingUnit } from '../../../../../workout-planner/models/training-unit';
import { PopoverModule } from 'primeng/popover';
import { Combo } from '../../../../../workout-planner/models/combo';

@Component({
  selector: 'app-training-unit-display',
  imports: [AccordionModule, PopoverModule],
  templateUrl: './training-unit-display.component.html',
  styleUrl: './training-unit-display.component.scss',
})
export class TrainingUnitDisplayComponent {
  trainingUnit = input.required<TrainingUnit>();

  joinCombo(value: string | Combo): string {
    return (value as Combo).join(' > ');
  }
}
