import type { DagInvoerFormState, UrenVoorDag } from '~/my-types/uren'

export function floatToHoursAndMinutes(hoursFloat: number): { wholeHours: number; minutes: number } {
  const wholeHours = Math.floor(hoursFloat)
  const minutes = Math.round((hoursFloat - wholeHours) * 60)
  return { wholeHours, minutes }
}

export function convertToUrenVoorDag(submission: DagInvoerFormState): UrenVoorDag {
  const wholeHours = parseInt(String(submission.wholeHours), 10)  // Convert string to integer
  const minutes = parseInt(String(submission.minutes), 10)        // Convert string to integer
  const milkings = parseInt(String(submission.milkings), 10)      // Convert string to integer

  // Calculate hours as a float
  const hours = wholeHours + (minutes / 60)

  // Return object conforming to UrenVoorDag
  return {
    id: submission.id ?? undefined,
    date: submission.date,
    hours: hours,  // Floating point number
    milkings: milkings,
    description: submission.description,
    submitted: submission.submitted
  }
}
