import { Component, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TrainingUnit } from '../../../models/training-unit';
import { TrainingSectionComponent } from '../training-section/training-section.component';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';

@Component({
  selector: 'app-training-unit',
  imports: [AccordionModule, TrainingSectionComponent, AppButtonComponent],
  templateUrl: './training-unit.component.html',
  styleUrl: './training-unit.component.scss',
})
export class TrainingUnitComponent {
  trainingUnit = input.required<TrainingUnit>();
}
