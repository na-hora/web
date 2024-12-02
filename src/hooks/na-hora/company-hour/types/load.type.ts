export type CompanyHour = {
  id: number
  weekday: number
  startMinute: number
  endMinute: number
}

export type LoadCompanyHoursResponse = Array<CompanyHour>
