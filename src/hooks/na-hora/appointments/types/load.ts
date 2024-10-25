export type Appointment = {
  id: string
  petName: string
  serviceName: string
  startTime: string
  totalTime: number
  totalPrice: number
  paymentMode: string
  canceled: boolean
  cancelationReason: string
}

export type LoadAppointmentsResponse = {
  appointments: Appointment[]
}
