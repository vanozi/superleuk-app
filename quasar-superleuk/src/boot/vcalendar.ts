import { boot } from 'quasar/wrappers';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // Use plugin defaults (optional)
  app.use(setupCalendar, {});

  // Use the components
  app.component('VCalendar', Calendar);
  app.component('VDatePicker', DatePicker);
});
