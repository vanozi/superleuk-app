export function formatWeekDate(dateString: string) {
  const options = {
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', options);
}

export function getDayName(dateString: string) {
  const options = {
    weekday: 'long',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', options);
}
