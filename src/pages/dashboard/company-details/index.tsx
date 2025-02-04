import { useLoadCompanyDetailsPrivate } from '@/hooks/na-hora/company/use-load-company-details-private.ts'
import { Col, Flex, Skeleton, Typography } from 'antd'
import { phoneMask } from '@/utils/masks.ts'

export const CompanyDetails = () => {
  const { data: companyDetails, isLoading: companyDetailsLoading } =
    useLoadCompanyDetailsPrivate()

  return (
    <Flex vertical>
      <h1>Detalhes da empresa</h1>

      {companyDetailsLoading ? (
        <Skeleton active />
      ) : (
        <Col>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Typography.Text
              strong
              style={{ marginRight: '8px', minWidth: '80px' }}
            >
              Nome:
            </Typography.Text>
            <Typography.Text>{companyDetails?.name}</Typography.Text>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Typography.Text
              strong
              style={{ marginRight: '8px', minWidth: '80px' }}
            >
              Telefone:
            </Typography.Text>
            <Typography.Text>{phoneMask(companyDetails?.phone as string)}</Typography.Text>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Typography.Text
              strong
              style={{ marginRight: '8px', minWidth: '80px' }}
            >
              Email:
            </Typography.Text>
            <Typography.Text>{companyDetails?.email}</Typography.Text>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Typography.Text
              strong
              style={{ marginRight: '8px', minWidth: '80px' }}
            >
              Rua:
            </Typography.Text>
            <Typography.Text>
              {companyDetails?.companyAddresses[0]?.street}
            </Typography.Text>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Typography.Text
              strong
              style={{ marginRight: '8px', minWidth: '80px' }}
            >
              Número:
            </Typography.Text>
            <Typography.Text>
              {companyDetails?.companyAddresses[0]?.number}
            </Typography.Text>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Typography.Text
              strong
              style={{ marginRight: '8px', minWidth: '80px' }}
            >
              Bairro:
            </Typography.Text>
            <Typography.Text>
              {companyDetails?.companyAddresses[0]?.neighborhood}
            </Typography.Text>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Typography.Text
              strong
              style={{ marginRight: '8px', minWidth: '80px' }}
            >
              Cidade:
            </Typography.Text>
            <Typography.Text>
              {companyDetails?.companyAddresses[0]?.city.name}
            </Typography.Text>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Typography.Text
              strong
              style={{ marginRight: '8px', minWidth: '80px' }}
            >
              Estado:
            </Typography.Text>
            <Typography.Text>
              {companyDetails?.companyAddresses[0]?.city.state.name}
            </Typography.Text>
          </div>
        </Col>
      )}
    </Flex>
  )
}
