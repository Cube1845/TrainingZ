import { Component, input } from '@angular/core';
import { TrainingSection } from '../../../models/training-section';
import { AccordionModule } from 'primeng/accordion';
import { ExercisePanelComponent } from '../exercise-panel/exercise-panel.component';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';

@Component({
  selector: 'app-training-section',
  imports: [AccordionModule, ExercisePanelComponent, AppButtonComponent],
  templateUrl: './training-section.component.html',
  styleUrl: './training-section.component.scss',
})
export class TrainingSectionComponent {
  trainingSection = input.required<TrainingSection>();
}
