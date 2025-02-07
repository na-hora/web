import { useHooks } from '@/hooks'

export const useConfirmAppointment = (
  appointmentId: string,
  origin: string,
) => {
  const { useGetData } = useHooks()

  return useGetData({
    url: `${
      import.meta.env.VITE_API_URL
    }/appointments/confirm?appointmentId=${appointmentId}&origin=${origin}`,
    enabled: !!appointmentId && !!origin,
  })
}
