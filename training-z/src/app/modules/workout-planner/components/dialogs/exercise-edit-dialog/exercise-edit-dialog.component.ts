import { Component, computed } from '@angular/core';
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
import { KeyFilterModule } from 'primeng/keyfilter';
import { ExerciseType } from '../../../models/enums/exercise-type';
import { ListboxModule } from 'primeng/listbox';
import { Combo } from '../../../models/combo';

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
    KeyFilterModule,
    ListboxModule,
  ],
  templateUrl: './exercise-edit-dialog.component.html',
  styleUrl: './exercise-edit-dialog.component.scss',
})
export class ExerciseEditDialogComponent {
  readonly intensityTypes = [
    { label: 'RIR', value: IntensityType.RIR },
    { label: 'RPE', value: IntensityType.RPE },
  ];

  readonly exerciseTypes = [
    { label: 'Regular', value: ExerciseType.Regular },
    { label: 'Combo', value: ExerciseType.Combo },
  ];

  readonly rpeIntensity = [
    { label: '10', value: 10 },
    { label: '9.5', value: 9.5 },
    { label: '9', value: 9 },
    { label: '8.5', value: 8.5 },
    { label: '8', value: 8 },
    { label: '7.5', value: 7.5 },
    { label: '7', value: 7 },
    { label: '6', value: 6 },
    { label: '5', value: 5 },
  ];

  readonly rirIntensity = [
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

  formGroup = new FormGroup({
    exerciseType: new FormControl<ExerciseType | null>(
      ExerciseType.Combo,
      Validators.required
    ),
    exercise: new FormControl<string | null>('', Validators.required),
    combo: new FormControl<Combo | null>(['Planche Hold', 'Planche press']),
    intensityType: new FormControl<IntensityType | null>(
      IntensityType.RPE,
      Validators.required
    ),
  });

  getCombo = computed(() => {
    return this.formGroup.value.combo!.map((value) => {
      return { label: value, value: value };
    });
  });
}
