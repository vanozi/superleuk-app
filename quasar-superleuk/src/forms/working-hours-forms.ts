import VDateInput from 'components/custom-quasar/CDateInput.vue';
import WorkingTimeInput from 'components/custom-quasar/CWorkingTimeInput.vue';
import {IWorkingHours} from 'src/types/typescipt-models';
import CInput from 'components/custom-quasar/CInput.vue';
import type FormBuilder from './form-builder';
import {Ref} from 'vue';


export default class WorkingHoursForms {
  builder: FormBuilder;

  constructor(builder: FormBuilder) {
    this.builder = builder;
  }

addWorkingHoursForm(datesToSelect?: Ref<string[]>, selectedDate?: string) {
  const formBuilder = this.builder;
    // DatePicker is readonly als je een selectedDate meegeeft en vrij verkiesbaar als je een datesToSelect meegeeft
  if(datesToSelect!=undefined) {
    formBuilder.addField({
      component: VDateInput,
      name: 'date',
      props: {
        value: datesToSelect.value[0],
        name: 'date',
        type: 'date',
        label: 'Datum',
        testId: 'workinghours-date',
        options: datesToSelect,
      },
    })
  }
  else if(selectedDate) {
    formBuilder.addField({
            component: CInput,
      name: 'date',
        attrs: {
          'value': selectedDate,
          'name': 'date',
          'type': 'text',
          'label': 'Datum',
          'testId': 'workinghours-date',
          'readonly': true,
        }
      })
    }
  // overige velden in de form
  formBuilder
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
      component: CInput,
      name: 'description',
      props: {
        name: 'description',
        value: '',
        type: 'textarea',
        label: 'Omschrijving',
        testId: 'workinghours-description',
      },
    });
    return formBuilder.build();
}

  editWorkingHoursForm(workingHoursItem: IWorkingHours) {
    console.log(workingHoursItem)
    return this.builder
      .addField({
        component: CInput,
        name: 'date',
        attrs: {
          'value': workingHoursItem.date,
          'name': 'date',
          'type': 'text',
          'label': 'Datum',
          'testId': 'workinghours-date',
          'readonly': true,
        }
      })
      .addField({
        component: WorkingTimeInput,
        name: 'hours',
        props: {
          name: 'hours',
          value: workingHoursItem.hours,
          label: 'Uren',
          testId: 'workinghours-hours',
        },
      })
      .addField({
        component: CInput,
        name: 'description',
        attrs: {
          'value': workingHoursItem.description,
          'name': 'description',
          'type': 'textarea',
          'label': 'Omschrijving',
          'testId': 'workinghours-description'
        }
      })
      .addFullData(workingHoursItem)
      .makeFormItemDeletable()
      .build();
  }
}
