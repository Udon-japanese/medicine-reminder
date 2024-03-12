import { TIME_ZONE } from "@/app/constant/timezone"
import { utcToZonedTime } from "date-fns-tz"

export const getDateInTimezone = (date: Date) => {
  return utcToZonedTime(date, TIME_ZONE);
}