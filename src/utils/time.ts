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

export function fullMonthAndYearDate<T>(month: T, year: T): string {
  const date = new Date(`${year}-${month}-01`)
  const monthName = date.toLocaleString('pt-BR', { month: 'long' })
  return `${monthName} de ${year}`
}

export function getFirstAndLastDayOfMonth() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  // Primeiro dia do mês
  const firstDay = new Date(year, month, 1)

  // Último dia do mês
  const lastDay = new Date(year, month + 1, 0)

  // Formatando para ISO string com timezone -03:00
  const firstDayFormatted = new Date(firstDay.setHours(0, 0, 0, 0))
    .toISOString()
    .replace('Z', '-03:00')
  const lastDayFormatted = new Date(lastDay.setHours(0, 0, 0, 0))
    .toISOString()
    .replace('Z', '-03:00')

  return {
    firstDay: firstDayFormatted,
    lastDay: lastDayFormatted,
  }
}
