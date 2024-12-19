export type CompanyHourBlock = {
  startDate: string
  endDate: string
}

export type CreateCompanyHoursBlockBody = {
  registers: Array<CompanyHourBlock>
}
