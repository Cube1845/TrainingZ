import { Component } from '@angular/core';
import { AppInputComponent } from '../../../../common/components/app-input/app-input.component';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { IntensityType } from '../../../models/enums/intensity-type';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-exercise-edit-dialog',
  imports: [
    AppInputComponent,
    AppButtonComponent,
    SelectButtonModule,
    SelectModule,
    ReactiveFormsModule,
    TextareaModule,
    DividerModule,
  ],
  templateUrl: './exercise-edit-dialog.component.html',
  styleUrl: './exercise-edit-dialog.component.scss',
})
export class ExerciseEditDialogComponent {
  formGroup = new FormGroup({
    intensityType: new FormControl<IntensityType | null>(
      IntensityType.RPE,
      Validators.required
    ),
  });

  intensityTypes = [
    { label: 'RIR', value: IntensityType.RIR },
    { label: 'RPE', value: IntensityType.RPE },
  ];

  rpeIntensity = [
    { label: '10', value: 10 },
    { label: '9.5', value: 9.5 },
    { label: '9', value: 9 },
    { label: '8.5', value: 8.5 },
    { label: '8', value: 8 },
    { label: '7.5', value: 7.5 },
    { label: '7', value: 7 },
    { label: '6', value: 6 },
    { label: '5', value: 5 },
    { label: '4', value: 4 },
    { label: '3', value: 3 },
  ];

  rirIntensity = [
    { label: '0', value: 0 },
    { label: '0/1', value: 0.5 },
    { label: '1', value: 1 },
    { label: '1/2', value: 1.5 },
    { label: '2', value: 2 },
    { label: '2/3', value: 2.5 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];
}
