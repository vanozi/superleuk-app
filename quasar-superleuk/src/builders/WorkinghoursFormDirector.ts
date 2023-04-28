import VDateInput from 'components/form/VDateInput.vue';
import type FormBuilder from './FormBuilder';
import z from 'zod';

export default class WorkinghoursFormDirector {
  builder: FormBuilder;
  constructor(builder: FormBuilder) {
    this.builder = builder;
  }
  addWorkingHoursForm() {
    return this.builder
      .addField({
        component: VDateInput,
        name: 'date',
        props: {
          value: '2023-04-26',
          type: 'date',
          label: 'Datum',
          testId: 'workinghours-date',
        },
      })
      .build();
  }
}
