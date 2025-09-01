import { Component, computed, input } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { Combo } from '../../../models/combo';

@Component({
  selector: 'app-combo-display',
  imports: [ListboxModule],
  templateUrl: './combo-display.component.html',
  styleUrl: './combo-display.component.scss',
})
export class ComboDisplayComponent {
  exercises = input.required<Combo>();

  getExercises = computed(() => {
    return this.exercises().map((x) => {
      return { label: x, value: x };
    });
  });
}
