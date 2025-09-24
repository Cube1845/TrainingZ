import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ExerciseType } from '../../../models/enums/exercise-type';
import { WritableSignal } from '@angular/core';

export function exerciseValidator(combo: WritableSignal<any[]>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const exerciseType = control.get('exerciseType')?.value;
    const exercise = control.get('exercise')?.value;

    if (exerciseType === ExerciseType.Regular) {
      if (!exercise || exercise.trim() === '') {
        return { exerciseRequired: true };
      }
    }

    if (exerciseType === ExerciseType.Combo) {
      if (!combo() || combo().length < 2) {
        return { comboTooShort: true };
      }
    }

    return null;
  };
}
