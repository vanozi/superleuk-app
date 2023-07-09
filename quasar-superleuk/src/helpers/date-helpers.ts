export function getDatesBetweenTwoDatesAsString(startDate: Date, endDate: Date): string[] {
  const dates = [];
  const currentDate: Date = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + 1);
  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().substring(0, 10);
    dates.push(dateString);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
