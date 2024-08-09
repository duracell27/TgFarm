export function getDeclension(number: number, one: string, few: string, many: string): string {
  if (number % 10 === 1 && number % 100 !== 11) {
    return one;
  } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return few;
  } else {
    return many;
  }
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (seconds < 60) {
    return `${seconds} ${getDeclension(seconds, 'секунда', 'секунди', 'секунд')}`;
  } else if (minutes < 60) {
    return `${minutes} ${getDeclension(minutes, 'хвилина', 'хвилини', 'хвилин')}${remainingSeconds > 0 ? ` і ${remainingSeconds} ${getDeclension(remainingSeconds, 'секунда', 'секунди', 'секунд')}` : ''}`;
  } else if (hours < 24) {
    return `${hours} ${getDeclension(hours, 'година', 'години', 'годин')}${remainingMinutes > 0 ? ` і ${remainingMinutes} ${getDeclension(remainingMinutes, 'хвилина', 'хвилини', 'хвилин')}` : ''}`;
  } else {
    return `${days} ${getDeclension(days, 'день', 'дні', 'днів')}${remainingHours > 0 ? ` і ${remainingHours} ${getDeclension(remainingHours, 'година', 'години', 'годин')}` : ''}`;
  }
}

export function remainingTime(date: Date): string {
  const convertedDate = new Date(date)
  if(convertedDate){
    
    const providedDate = convertedDate.getTime();
    const currentDate = new Date().getTime();
    const differenceInSeconds = Math.floor(( providedDate - currentDate) / 1000);
    
    return formatTime(differenceInSeconds);
  }
  return '';
}
