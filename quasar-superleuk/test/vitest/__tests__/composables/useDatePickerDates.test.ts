import {describe, expect, test} from 'vitest';
import {useDatePickerDates} from 'src/composables/use-date-picker-dates';

describe('useDatePickerDates', () => {
  test('Start date 7 days ago, end date today, no exclusions results in 7 datepicker options', () => {
    const {start, end, datesToExclude, datePickerOptions} = useDatePickerDates();
    start.value = new Date();
    end.value = new Date();
    start.value.setDate(start.value.getDate() - 7);
    const dates = datePickerOptions.value;
    expect(dates).toHaveLength(7);
  })
  test('Start date 7 days ago, end date today, last 3 days excluded results in 4 datepicker options', () => {
    const {start, end, datesToExclude, datePickerOptions} = useDatePickerDates();
    start.value = new Date();
    end.value = new Date();
    start.value.setDate(start.value.getDate() - 7);
    datesToExclude.value = getLastThreeDays();
    const dates : string[] = datePickerOptions.value;
    expect(dates).toHaveLength(4);
  })
})

function getLastThreeDays(): string[] {
  const currentDate:Date = new Date();
  const dates: string[] = [];

  for (let i = 0; i < 3; i++) {
    const previousDate = new Date();
    previousDate.setDate(currentDate.getDate() - i);
    const dateString = previousDate.toISOString().substring(0, 10);
    dates.push(dateString);
  }

  return dates;
}
