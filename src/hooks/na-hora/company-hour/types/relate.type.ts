export type CompanyHours = {
  id?: number
  weekday: number
  startMinute: number
  endMinute: number
}

export type RelateCompanyHoursBody = {
  registers: Array<CompanyHours>
}
