import CButton from 'components/custom-quasar/CButton.vue';
import {mount} from '@vue/test-utils';
import {expect, test, vi} from 'vitest';
import {installQuasar} from '@quasar/quasar-app-extension-testing-unit-vitest';

installQuasar();
test('CButton can be clicked', async () => {
  const wrapper = mount(CButton, {
    props: {
      clickEvent: 'clickButton',
    },
    attrs: {
      'name': 'test-button',
      'label': 'Test Button',
      'data-testid': 'test-button',
    }
  });

  const onClickHandlerSpy = vi.spyOn(wrapper.vm, 'onClickHandler')
  await wrapper.find('[data-testid="test-button"]').trigger('click');
  expect(onClickHandlerSpy).toHaveBeenCalled();
});
