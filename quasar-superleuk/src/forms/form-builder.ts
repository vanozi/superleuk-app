import {defineComponent, h, VNode} from 'vue';
import FormFactory from './FormFactory.vue';

export interface ObjectGeneric {
  [keys: string]: any;
}

export interface Field {
  component: any;
  name: string;
  props?: ObjectGeneric;
  attrs?: ObjectGeneric;
}

export interface Button {
  component: any;
  name: string;
  props?: ObjectGeneric;
  attrs?: ObjectGeneric;
}

export default class FormBuilder {
  fields: Field[];
  buttons: Button[];
  validator: any;
  nameSubmitButton: string;
  testIdForm: string;
  deletable: boolean;
  fullData: object;

  constructor(nameSubmitButton = 'Verstuur', testIdForm = 'form') {
    this.nameSubmitButton = nameSubmitButton;
    this.testIdForm = testIdForm;
    this.fields = [];
    this.buttons = [];
    this.deletable = false;
    this.fullData = {};
  }

  addField(field: Field) {
    this.fields.push(field);
    return this;
  }

  addButton(button: Button) {
    this.buttons.push(button);
    return this;
  }

  addValidator(validator: any) {
    this.validator = validator;
    return this;
  }

  addFullData(fullData: object) {
    this.fullData = fullData;
    return this;
  }

  makeFormItemDeletable() {
    this.deletable = true;
    return this;
  }

  build() {
    return defineComponent({
      render: (): VNode =>
        h(FormFactory, {
          fields: this.fields,
          buttons: this.buttons,
          validator: this.validator,
          nameSubmitButton: this.nameSubmitButton,
          testIdForm: this.testIdForm,
          deletable: this.deletable,
          fullData: this.fullData,
        }),
    });
  }
}
