import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { useDeleteAppointment } from '@/hooks/na-hora/appointments/use-delete-appointment'
import { useAppointmentsContext } from '@/pages/dashboard/appointments/contexts/appointments-provider'
import { phoneMask } from '@/utils/masks.ts'
import { formatDateTime } from '@/utils/time.ts'
import {
  CopyOutlined,
  MailOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons'
import { Button, Col, Divider, Modal, Popconfirm, Tooltip } from 'antd'
import { useEffect, useState } from 'react'

export const AppointmentManagerModal = () => {
  const [copyEmailStatus, setCopyEmailStatus] = useState(false)
  const [copyPhoneStatus, setCopyPhoneStatus] = useState(false)
  const { triggerAlert } = useGlobalAlertContext()

  const {
    isAppointmentManagerModalOpen,
    setIsAppointmentManagerModalOpen,
    selectedAppointment,
  } = useAppointmentsContext()

  const {
    mutate: deleteAppointment,
    isPending: deletePending,
    isSuccess: deleteSuccess,
    isError: deleteError,
  } = useDeleteAppointment()

  const handleDeleteAppointment = () => {
    if (selectedAppointment) {
      deleteAppointment({
        dynamicRoute: selectedAppointment.id.toString(),
      })
    }
  }
  useEffect(() => {
    if (deleteSuccess) {
      triggerAlert({
        message: 'Agendamento cancelado com sucesso!',
        type: 'success',
      })
      setIsAppointmentManagerModalOpen(false)
    }
  }, [deleteSuccess])

  useEffect(() => {
    if (deleteError) {
      triggerAlert({
        message: 'Ocorreu um erro inesperado na operação. Tente novamente.',
        type: 'error',
      })
    }
  }, [deleteError])

  return (
    <Modal
      title='Detalhes do agendamento'
      open={isAppointmentManagerModalOpen}
      onCancel={() => setIsAppointmentManagerModalOpen(false)}
      centered
      footer={[
        <Popconfirm
          title='Tem certeza que deseja excluir esse agendamento?'
          okText='Sim'
          cancelText='Não'
          placement='bottom'
          onConfirm={handleDeleteAppointment}
        >
          <Button key='submit' type='primary' danger disabled={deletePending}>
            Excluir agendamento
          </Button>
        </Popconfirm>,
        <a
          href={`https://wa.me/${selectedAppointment?.client?.phone?.replace(
            /\D/g,
            '',
          )}`}
          target='_blank'
          style={{ marginLeft: 10, position: 'relative', top: '1px' }}
        >
          <Button
            key='submit'
            type='primary'
            style={{ background: '#51CF66' }}
            disabled={deletePending}
          >
            <WhatsAppOutlined />
            Entrar em contato
          </Button>
        </a>,
      ]}
    >
      <Col style={{ margin: '40px 0' }}>
        <p>
          <UserOutlined style={{ marginRight: '4px' }} />
          <strong>Cliente:</strong> {selectedAppointment?.client?.name}
        </p>

        <p>
          <WhatsAppOutlined style={{ marginRight: '4px' }} />
          <strong>Telefone:</strong>{' '}
          <Tooltip title='Conversar no WhatsApp'>
            <a
              href={`https://wa.me/${selectedAppointment?.client?.phone?.replace(
                /\D/g,
                '',
              )}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {phoneMask(selectedAppointment?.client?.phone)}
            </a>
          </Tooltip>
          <Tooltip title={copyPhoneStatus ? 'Copiado!' : 'Copiar'}>
            <CopyOutlined
              style={{ marginLeft: '8px', cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(
                  selectedAppointment?.client?.phone,
                )
                setCopyPhoneStatus(true)
                setTimeout(() => setCopyPhoneStatus(false), 2000)
              }}
            />
          </Tooltip>
        </p>

        <p>
          <MailOutlined style={{ marginRight: '4px' }} />
          <strong>E-mail: </strong>
          {selectedAppointment?.client?.email}
          <Tooltip title={copyEmailStatus ? 'Copiado!' : 'Copiar'}>
            <CopyOutlined
              style={{ marginLeft: '8px', cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(
                  selectedAppointment?.client?.email,
                )
                setCopyEmailStatus(true)
                setTimeout(() => setCopyEmailStatus(false), 2000)
              }}
            />
          </Tooltip>
        </p>

        <Divider />

        <p>
          <strong>Serviço:</strong> {selectedAppointment?.serviceName}
        </p>
        <p>
          <strong>Horário Inicial:</strong>{' '}
          {formatDateTime(selectedAppointment?.start)}
        </p>
        <p>
          <strong>Horário Final:</strong>{' '}
          {formatDateTime(selectedAppointment?.end)}
        </p>
        <p>
          <strong>Nome do pet:</strong>{' '}
          {selectedAppointment?.petName || 'Não informado'}
        </p>
        <p>
          <strong>Nota:</strong> {selectedAppointment?.note || 'Nenhuma'}
        </p>
      </Col>
    </Modal>
  )
}
