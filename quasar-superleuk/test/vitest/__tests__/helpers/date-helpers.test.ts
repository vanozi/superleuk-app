import {getDatesBetweenTwoDatesAsString} from 'src/helpers/date-helpers';
import {test, expect} from 'vitest';

// write a test for the getDatesBetweenTwoDatesAsString function for the following scenarios:
// 1. start date 7 days ago, end date today, expected results is a list of 7 dates
// 2. start date today end date today, end date today, expected results is a list of 1 date

test('Start date 7 days ago, end date today, expected results is a list of 7 dates', () => {
  const start: Date = new Date();
  const end:Date = new Date();
  start.setDate(start.getDate() - 7);
  const dates:string[] = getDatesBetweenTwoDatesAsString(start, end);
  expect(dates).toHaveLength(7);
})

test('Start date today end date today, end date today, expected results is a list of 0 dates', () => {
  const start:Date = new Date();
  const end:Date = new Date();
  const dates:string[] = getDatesBetweenTwoDatesAsString(start, end);
  expect(dates).toHaveLength(0);
})
