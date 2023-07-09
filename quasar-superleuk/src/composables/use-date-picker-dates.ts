import { getDatesBetweenTwoDatesAsString } from 'src/helpers/date-helpers';
import {ref, Ref, computed, ComputedRef} from 'vue';

// by convention, composable function names start with "use"
export function useDatePickerDates() {
  // state encapsulated and managed by the composable
  const start: Ref<any> = ref();
  const end: Ref<any> = ref();
  const datesToExclude: Ref<string[]> = ref([])
  // computed properties
  const datePickerOptions: ComputedRef<string[]> = computed(() => {
    const filteredDates = getDatesBetweenTwoDatesAsString(start.value, end.value).filter(
        (date: string) => !datesToExclude.value.includes(date)
    );
    return filteredDates;
  });

  return {start, end, datesToExclude, datePickerOptions};
}



