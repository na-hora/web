export type Appointment = {
  id: string
  serviceName: string
  startTime: string
  totalTime: number
  totalPrice: number
  canceled: boolean
}

export type LoadAppointmentsResponse = {
  appointments: Appointment[]
}
