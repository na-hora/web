export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED'

export type Appointment = {
  id: string
  serviceName: string
  startTime: string
  totalTime: number
  totalPrice: number
  canceled: boolean
  status: AppointmentStatus
}

export type LoadAppointmentsResponse = {
  appointments: Appointment[]
}
