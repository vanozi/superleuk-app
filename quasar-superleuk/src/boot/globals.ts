import { boot } from 'quasar/wrappers';
import { setupCalendar } from 'v-calendar';

export default boot(async ({ app }) => {
  app.use(setupCalendar, {});
});
