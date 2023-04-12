import { defineComponent, h, type VNode } from 'vue';
import FormFactory from './FormFactory.vue';

export interface ObjectGeneric {
  [keys: string]: any;
}

export interface Field {
  component: any;
  label?: string;
  name: string;
  props?: ObjectGeneric;
  attrs?: ObjectGeneric;
  validation?: any;
}

export default class FormBuilder {
  fields: Field[];
  provider: any;
  validator: any;
  nameSubmitButton: string;
  testIdForm: string;

  constructor(nameSubmitButton = 'Verstuur', testIdForm = 'form') {
    this.nameSubmitButton = nameSubmitButton;
    this.testIdForm = testIdForm;
    this.fields = [];
  }

  addField(field: Field) {
    this.fields.push(field);
    return this;
  }

  addValidator(validator: any) {
    this.validator = validator;
    return this;
  }

  build() {
    const Fields = this.fields;
    const Validator = this.validator;
    const NameSubmitButton = this.nameSubmitButton;
    const TestIdForm = this.testIdForm;

    return defineComponent({
      props: {
        id: {
          default: null,
          type: String || Number,
        },
      },
      render(): VNode {
        return h(FormFactory, {
          fields: Fields,
          validator: Validator,
          id: this.id,
          nameSubmitButton: NameSubmitButton,
          testIdForm: TestIdForm,
        });
      },
    });
  }
}
