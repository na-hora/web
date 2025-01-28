export type Client = {
  name: string
  email: string
  phone: string
}

export type CreateAppointmentRequestBody = {
  companyId: string
  startTime: string
  companyPetServiceId: number
  companyPetHairId: number
  companyPetSizeId: number
  client: Client
  note?: string
}
