import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { useCreateCompanyHoursBlock } from '@/hooks/na-hora/company-hour-block/use-create-company-hours-block'
import { useAppointmentsContext } from '@/pages/dashboard/appointments/contexts/appointments-provider'
import { Button, Form, Input, Modal } from 'antd'
import { format, isValid, parse } from 'date-fns'
import { useEffect } from 'react'

export const HourModal = () => {
  const [form] = Form.useForm()
  const {
    isBlockCompanyHourModalOpen,
    setIsBlockCompanyHourModalOpen,
    selectedDateFromCalendar,
  } = useAppointmentsContext()
  const { triggerAlert } = useGlobalAlertContext()

  const {
    mutate: createCompanyHoursBlockMutation,
    isPending: createPending,
    isSuccess: createSuccess,
    isError: createError,
  } = useCreateCompanyHoursBlock()

  useEffect(() => {
    if (createSuccess) {
      setIsBlockCompanyHourModalOpen(false)
      triggerAlert({
        message: 'Operação realizada com sucesso',
        type: 'success',
      })
      form.resetFields()
    }
  }, [createSuccess])

  useEffect(() => {
    if (createError) {
      triggerAlert({
        message: 'Ocorreu um erro inesperado na operação',
        type: 'error',
      })
    }
  }, [createError])

  const formatDate = (date: string) => {
    const parsedDate = new Date(date)
    if (!isValid(parsedDate)) {
      throw new Error(`Invalid date: ${date}`)
    }
    return format(parsedDate, 'dd/MM/yyyy HH:mm')
  }

  const revertDate = (date: string) => {
    const parsedDate = parse(date, 'dd/MM/yyyy HH:mm', new Date())
    if (!isValid(parsedDate)) {
      throw new Error(`Invalid date: ${date}`)
    }
    const timezoneOffset = -parsedDate.getTimezoneOffset() / 60 // Offset in hours
    const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss")
    const offsetSign = timezoneOffset >= 0 ? '+' : '-'
    const absOffset = Math.abs(timezoneOffset)
    const offset = `${offsetSign}${String(absOffset).padStart(2, '0')}:00`

    return `${formattedDate}${offset}`
  }

  const submitForm = () => {
    form.validateFields().then((values) => {
      const treatedStart = revertDate(values.start)
      const treatedEnd = revertDate(values.end)

      createCompanyHoursBlockMutation({
        body: {
          registers: [
            {
              startDate: treatedStart,
              endDate: treatedEnd,
            },
          ],
        },
      })
    })
  }

  return (
    <Modal
      title='Bloquear horário'
      open={isBlockCompanyHourModalOpen}
      onCancel={() => setIsBlockCompanyHourModalOpen(false)}
      centered
      footer={[
        <Button
          key='back'
          onClick={() => setIsBlockCompanyHourModalOpen(false)}
        >
          Cancelar
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={submitForm}
          loading={createPending}
        >
          Bloquear horário
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={submitForm}
        initialValues={{
          start: formatDate(selectedDateFromCalendar.start),
          end: formatDate(selectedDateFromCalendar.end),
        }}
      >
        <Form.Item
          label='Início do bloqueio'
          name='start'
          rules={[{ required: true, message: 'Data obrigatória' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label='Fim do bloqueio'
          name='end'
          rules={[{ required: true, message: 'Data obrigatória' }]}
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  )
}
