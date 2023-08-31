import {test, expect} from 'vitest';
import FormBuilder from 'src/forms/form-builder';
import VInput from 'components/app/AppInput.vue';

test('FormBuilder can add fields', () => {
  const formBuilder: FormBuilder = new FormBuilder();
  formBuilder.addField({component: VInput, name: 'test', props: {label: 'test'}, attrs: {class: 'large'}})
  expect(formBuilder.fields).toHaveLength(1);
  expect(formBuilder.fields[0].name).toBe('test');
  expect(formBuilder.fields[0].component).toBe(VInput);
  expect(formBuilder.fields[0].props).toEqual({label: 'test'});
  expect(formBuilder.fields[0].attrs).toEqual({class: 'large'});
})

// test('FormBuilder can add buttons', () => {
//   const formBuilder: FormBuilder = new FormBuilder();
//   formBuilder.addButton({component: VInput, name: 'test', props: {label: 'test'}, attrs: {class: 'large'}})
//   expect(formBuilder.buttons).toHaveLength(1);
//   expect(formBuilder.buttons[0].name).toBe('test');
//   expect(formBuilder.buttons[0].component).toBe(VInput);
//   expect(formBuilder.buttons[0].props).toEqual({label: 'test'});
//   expect(formBuilder.buttons[0].attrs).toEqual({class: 'large'});
// }
