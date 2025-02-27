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
import { useState } from 'react'

export const AppointmentManagerModal = () => {
  const [copyEmailStatus, setCopyEmailStatus] = useState(false)
  const [copyPhoneStatus, setCopyPhoneStatus] = useState(false)

  const {
    isAppointmentManagerModalOpen,
    setIsAppointmentManagerModalOpen,
    selectedAppointment,
  } = useAppointmentsContext()

  console.log(selectedAppointment)

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
          // onConfirm={companyDashboardLogout}
        >
          <Button key='submit' type='primary' danger>
            Excluir agendamento
          </Button>
        </Popconfirm>,
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
          <strong>E-mail:</strong>
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
      </Col>
    </Modal>
  )
}
