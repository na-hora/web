export type CompanyHoursBlocked = {
  id: number
  startDate: string
  endDate: string
}

export type LoadCompanyHourBlocksResponse = Array<CompanyHoursBlocked>
