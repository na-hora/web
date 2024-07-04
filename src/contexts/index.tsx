import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GlobalAlertProvider } from './global-alert-context'

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalAlertProvider>{children}</GlobalAlertProvider>
    </QueryClientProvider>
  )
}
