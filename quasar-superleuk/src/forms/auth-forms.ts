import CInput from 'components/app/AppInput.vue';
import type FormBuilder from './form-builder';
import z from 'zod';
import AppInput from "components/app/AppInput.vue";

export default class AuthForms {
  builder: FormBuilder;

  constructor(builder: FormBuilder) {
    this.builder = builder;
  }

  makeLoginForm() {
    return this.builder
      .addField({
        name: 'email',
        component: AppInput,
        attrs: {
          'name': 'email',
          'type': 'email',
          'label': 'E-mailadres',
          'data-testid': 'login-email',
        }
      })
      .addField({
        name: 'password',
        component: CInput,
        attrs: {
          'name': 'password',
          'type': 'password',
          'label': 'Wachtwoord',
          'data-testid': 'login-password'
        }
      })
      .addValidator(
        z.object({
          email: z
            .string({required_error: 'Veld is verplicht'})
            .nonempty('Veld is verplicht')
            .email('Vul een geldig email adres in'),
          password: z.string({required_error: 'Veld is verplicht'}).nonempty('Veld is verplicht'),
        })
      )
      .build();
  }

  makeForgotPasswordForm() {
    return this.builder
      .addField({
        component: CInput,
        name: 'email',
        props: {
          name: 'email',
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
        component: CInput,
        name: 'password',
        props: {
          name: 'password',
          value: '',
          type: 'password',
          label: 'Nieuw wachtwoord',
        },
      })
      .addField({
        component: CInput,
        name: 'confirmPassword',
        props: {
          name: 'confirmPassword',
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

}
