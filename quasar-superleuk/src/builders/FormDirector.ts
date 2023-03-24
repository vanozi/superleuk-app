import VInput from 'components/form/VInput.vue';
import type FormBuilder from './FormBuilder';
import z from 'zod';

export default class FormDirector {
  builder: FormBuilder;
  constructor(builder: FormBuilder) {
    this.builder = builder;
  }
  makeLoginForm() {
    return this.builder
      .addField({
        component: VInput,
        name: 'email',
        props: {
          value: '',
          type: 'email',
          label: 'email',
        },
        validation: z
          .string()
          .nonempty('Veld is verplicht')
          .email('Vul een geldig email adres in'),
      })
      .addField({
        component: VInput,
        name: 'password',

        props: {
          value: '',
          type: 'password',
          label: 'wachtwoord',
        },
        validation: z.string().nonempty('Veld is verplicht'),
      })
      .build();
  }

  makeHoursEditForm(event: any) {
    console.log(event.value);
    return this.builder

      .addField({
        component: VInput,
        name: 'hours',
        props: {
          value: event.value.hours,
          type: 'number',
          label: 'Uren',
        },
        validation: z.string().nonempty('Veld is verplicht'),
      })
      .addField({
        component: VInput,
        name: 'milkings',
        props: {
          value: event.value.milkings,
          type: 'number',
          label: 'Melkbeurten',
        },
        validation: z.string().nonempty('Veld is verplicht'),
      })
      .addField({
        component: VInput,
        name: 'description',
        props: {
          value: event.value.description,
          type: 'textarea',
          label: 'Omschrijving',
        },
        validation: z.string().nonempty('Veld is verplicht'),
      })
      .build();
  }
}
