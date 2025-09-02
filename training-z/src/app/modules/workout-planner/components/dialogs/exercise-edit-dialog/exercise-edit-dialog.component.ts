import { Component, computed, signal } from '@angular/core';
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
import { ComboDisplayComponent } from '../../utils/combo-display/combo-display.component';
import { exerciseValidator } from './exerciseValidator';

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
    ComboDisplayComponent,
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
    { label: '0', value: 10 },
    { label: '0/1', value: 9.5 },
    { label: '1', value: 9 },
    { label: '1/2', value: 8.5 },
    { label: '2', value: 8 },
    { label: '2/3', value: 7.5 },
    { label: '3', value: 7 },
    { label: '4', value: 6 },
    { label: '5', value: 5 },
  ];

  combo = signal<Combo>([]);

  formGroup = new FormGroup(
    {
      exerciseType: new FormControl<ExerciseType | null>(
        ExerciseType.Regular,
        Validators.required
      ),
      exercise: new FormControl<string | null>(''),
      sets: new FormControl<number | null>(null, Validators.required),
      reps: new FormControl<number | null>(null, Validators.required),
      intensityType: new FormControl<IntensityType | null>(
        IntensityType.RPE,
        Validators.required
      ),
      intensity: new FormControl<number | null>(null, Validators.required),
      rest: new FormControl<string | null>('', Validators.required),
      info: new FormControl<string | null>(''),
    },
    exerciseValidator(this.combo)
  );

  addComboItem(): void {
    this.combo.update(() => {
      const combo = [...this.combo()];
      combo.push(this.formGroup.value.exercise!);
      return combo;
    });

    this.formGroup.controls.exercise.reset();
  }

  removeComboItem(itemIndex: number): void {
    this.combo.update(() => {
      const combo = [...this.combo()];
      combo.splice(itemIndex, 1);
      return combo;
    });
  }

  moveComboItemUp(itemIndex: number): void {
    if (itemIndex <= 0) {
      return;
    }

    this.combo.update(() => {
      const combo = [...this.combo()];

      const higherItem = combo[itemIndex - 1];
      combo[itemIndex - 1] = combo[itemIndex];
      combo[itemIndex] = higherItem;

      return combo;
    });
  }

  moveComboItemDown(itemIndex: number): void {
    if (itemIndex >= this.combo().length) {
      return;
    }

    this.combo.update(() => {
      const combo = [...this.combo()];

      const lowerItem = combo[itemIndex + 1];
      combo[itemIndex + 1] = combo[itemIndex];
      combo[itemIndex] = lowerItem;

      return combo;
    });
  }
}
