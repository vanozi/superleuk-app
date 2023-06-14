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
          label: 'E-mailadres',
          testId: 'login-email',
        },
      })
      .addField({
        component: VInput,
        name: 'password',

        props: {
          value: '',
          type: 'password',
          label: 'Wachtwoord',
          testId: 'login-password',
        },
      })
      .addValidator(
        z.object({
          email: z
            .string()
            .nonempty('Veld is verplicht')
            .email('Vul een geldig email adres in'),
          password: z.string().nonempty('Veld is verplicht'),
        })
      )
      .build();
  }
  makeForgotPasswordForm() {
    return this.builder
      .addField({
        component: VInput,
        name: 'email',
        props: {
          value: '',
          type: 'email',
          label: 'E-mailadres',
        },
      })
      .addValidator(
        z.object({
          email: z
            .string()
            .nonempty('Veld is verplicht')
            .email('Vul een geldig email adres in'),
        })
      )
      .build();
  }
  makeResetPasswordForm() {
    return this.builder
      .addField({
        component: VInput,
        name: 'password',

        props: {
          value: '',
          type: 'password',
          label: 'Nieuw wachtwoord',
        },
      })
      .addField({
        component: VInput,
        name: 'confirmPassword',

        props: {
          value: '',
          type: 'password',
          label: 'Herhaal wachtwoord',
        },
      })
      .addValidator(
        z
          .object({
            password: z.string().nonempty('Veld is verplicht'),
            confirmPassword: z.string().nonempty('Veld is verplicht'),
          })
          .refine((data) => data.password === data.confirmPassword, {
            message: 'Wachtwoorden komen niet overeen',
            path: ['confirmPassword'],
          })
      )
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
