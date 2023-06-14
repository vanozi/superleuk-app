import VDateInput from 'components/form/VDateInput.vue';
import WorkingTimeInput  from 'components/form/WorkingTimeInput.vue';
import VInput from 'components/form/VInput.vue';
import type FormBuilder from './FormBuilder';
import z from 'zod';


export default class WorkinghoursFormDirector {
  builder: FormBuilder;
  constructor(builder: FormBuilder) {
    this.builder = builder;
  }
  addWorkingHoursForm(options, startDateView:string) {
    return this.builder
      .addField({
        component: VDateInput,
        name: 'date',
        props: {
          value: startDateView.split('T')[0],
          name: 'date',
          type: 'date',
          label: 'Datum',
          testId: 'workinghours-date',
          options: options,
        },
      })
      .addField({
        component: WorkingTimeInput,
        name: 'hours',
        props: {
          name: 'hours',
          value: '',
          label: 'Uren',
          testId: 'workinghours-hours',
        },
      })
      .addField({
        component : VInput,
        name: 'description',
        props : {
          name: 'description',
          value:'',
          type : 'textarea',
          label : 'Omschrijving',
          testId: 'workinghours-description'
        }
      })
      .build();
  }
}
