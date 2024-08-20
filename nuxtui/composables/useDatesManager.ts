import { ref, computed, type Ref } from 'vue'
import {
  getISOWeek,
  getYear,
  getMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfYear,
  endOfYear,
  eachWeekOfInterval,
  format
} from 'date-fns'
import { nl } from 'date-fns/locale' // Import Dutch locale

interface WeekInterval {
  weekStart: string
  weekEnd: string
}

export function useDateManager() {
  const currentDate: Ref<Date> = ref(new Date())

  const weekNumber = computed(() => getISOWeek(currentDate.value))
  const month = computed(() => getMonth(currentDate.value) + 1) // date-fns months are 0-indexed
  const year = computed(() => getYear(currentDate.value))
  const firstDayYear = computed(() => format(startOfYear(currentDate.value), 'yyyy-MM-dd'))
  const lastDayYear = computed(() => format(endOfYear(currentDate.value), 'yyyy-MM-dd'))

  const weekDates = computed(() => {
    const start: Date = startOfWeek(currentDate.value, { weekStartsOn: 1 })
    const end: Date = endOfWeek(currentDate.value, { weekStartsOn: 1 })
    const dates: string[] = []
    for (let d = start; d <= end; d = addDays(d, 1)) {
      dates.push(format(d, 'yyyy-MM-dd'))
    }
    return dates
  })

  const weekDisplay = computed(() => {
    const start = weekDates.value[0] // First date in the array
    const end = weekDates.value[weekDates.value.length - 1] // Last date in the array

    // Formatting the start and end dates using the Dutch locale
    const formattedStart = format(new Date(start), 'MMM d', { locale: nl }) // e.g., 'apr. 22'
    const formattedEnd = format(new Date(end), 'd, yyyy', { locale: nl }) // e.g., '28, 2024'

    // Concatenating the full display string
    return `${formattedStart} - ${formattedEnd}`
  })

  function addWeek(): void {
    currentDate.value = addWeeks(currentDate.value, 1)
  }

  function subtractWeek(): void {
    currentDate.value = subWeeks(currentDate.value, 1)
  }

  function addMonth(): void {
    currentDate.value = addMonths(currentDate.value, 1)
  }

  function subtractMonth(): void {
    currentDate.value = subMonths(currentDate.value, 1)
  }

  function addYear(): void {
    currentDate.value = addYears(currentDate.value, 1)
  }

  function subtractYear(): void {
    currentDate.value = subYears(currentDate.value, 1)
  }

  function getWeeksInYear(targetYear: number): WeekInterval[] {
    const start: Date = startOfYear(new Date(targetYear, 0, 1))
    const end: Date = endOfYear(new Date(targetYear, 0, 1))
    const weeks: Date[] = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 })
    return weeks.map(week => {
      const startDate: string = format(week, 'yyyy-MM-dd')
      const endDate: string = format(endOfWeek(week, { weekStartsOn: 1 }), 'yyyy-MM-dd')
      return { weekStart: startDate, weekEnd: endDate }
    })
  }

  const canAddWeek = computed(() => {
    const nextWeek = addWeeks(currentDate.value, 1)
    return getISOWeek(nextWeek) <= getISOWeek(currentDate.value)
  })

  function canAddMonth(): boolean {
    const nextMonth = addMonths(currentDate.value, 1)
    return getMonth(nextMonth) >= getMonth(currentDate.value)
  }

  return {
    currentDate: computed(() => format(currentDate.value, 'yyyy-MM-dd')),
    weekNumber,
    month,
    year,
    weekDates,
    addWeek,
    canAddWeek,
    subtractWeek,
    addMonth,
    canAddMonth,
    subtractMonth,
    addYear,
    subtractYear,
    getWeeksInYear,
    weekDisplay,
    firstDayYear,
    lastDayYear
  }
}
