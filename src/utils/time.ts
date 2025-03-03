//@ts-ignore
import { TZDate } from '@toast-ui/calendar'

export function clone(date: TZDate): TZDate {
  return new TZDate(date)
}

export function addHours(d: TZDate, step: number) {
  const date = clone(d)
  date.setHours(d.getHours() + step)

  return date
}

export function addDate(d: TZDate, step: number) {
  const date = clone(d)
  date.setDate(d.getDate() + step)

  return date
}

export function subtractDate(d: TZDate, steps: number) {
  const date = clone(d)
  date.setDate(d.getDate() - steps)

  return date
}

export function convertDateToISOString(dateStr: string) {
  const [day, month, year] = dateStr.split('/')

  const date = new Date(`${year}-${month}-${day}T00:00:00`)

  const timeZoneOffset = date.getTimezoneOffset()
  const offsetHours = String(
    Math.abs(Math.floor(timeZoneOffset / 60)),
  ).padStart(2, '0')
  const offsetMinutes = String(Math.abs(timeZoneOffset % 60)).padStart(2, '0')
  const sign = timeZoneOffset > 0 ? '-' : '+'

  const isoStringWithTimezone =
    date.toISOString().slice(0, -5) + `${sign}${offsetHours}:${offsetMinutes}`

  return isoStringWithTimezone
}

export const formatDateTime = (date: Date) => {
  return date
    .toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(',', ' -')
}

export function fullMonthAndYearDate<T>(month: T, year: T): string {
  const date = new Date(`${year}-${month}-01`)
  const monthName = date.toLocaleString('pt-BR', { month: 'long' })
  return `${monthName} de ${year}`
}

export function convertDateTOISO8601WithTimezone(
  date: string,
  time: string,
): string {
  const currentDate = new Date(`${date}T${time}`)
  const offset = currentDate.getTimezoneOffset()

  // Converte o offset para o formato +HH:mm ou -HH:mm
  const offsetHours = Math.abs(Math.floor(offset / 60))
    .toString()
    .padStart(2, '0')
  const offsetMinutes = Math.abs(offset % 60)
    .toString()
    .padStart(2, '0')
  const offsetSign = offset > 0 ? '-' : '+'
  const timezoneOffset = `${offsetSign}${offsetHours}:${offsetMinutes}`

  return `${date}T${time}:00${timezoneOffset}`
}
