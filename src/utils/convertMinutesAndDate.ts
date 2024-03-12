import { getHours, getMinutes, isDate } from 'date-fns';
import { isInvalidDate } from './isInvalidDate';
import { getDateInTimezone } from './getDateInTimeZone';

type Return<T> = T extends number ? Date : T extends Date ? number : never;

export function convertMinutesAndDate<T extends number | Date>(value: T): Return<T> {
  if (typeof value === 'number') {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const date = getDateInTimezone(new Date());
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date as Return<T>;
  } else if (isDate(value) && !isInvalidDate(value)) {
    const hours = getHours(value);
    const minutes = getMinutes(value);
    return (hours * 60 + minutes) as Return<T>;
  } else {
    throw new Error(`無効な値が渡されました: ${value}\n typeof ${typeof value}`);
  }
}
