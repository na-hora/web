export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED'

export type Appointment = {
  id: string
  serviceName: string
  startTime: string
  totalTime: number
  totalPrice: number
  canceled: boolean
  status: AppointmentStatus
  client: Client
}

export type Client = {
  name: string
  email: string
  phone: string
}

export type LoadAppointmentsResponse = {
  appointments: Appointment[]
}
