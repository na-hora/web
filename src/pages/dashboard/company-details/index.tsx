import { useLoadCompanyDetails } from '@/hooks/na-hora/company/use-load-company-details'
import { Col, Flex, Skeleton, Typography } from 'antd'

export const CompanyDetails = () => {
  const { data: companyDetails, isLoading: companyDetailsLoading } =
    useLoadCompanyDetails()

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
            <Typography.Text>{companyDetails?.phone}</Typography.Text>
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
              Endereço:
            </Typography.Text>
            <Typography.Text>
              {companyDetails?.companyAddresses[0]?.street},{' '}
              {companyDetails?.companyAddresses[0]?.number}, bairro{' '}
              {companyDetails?.companyAddresses[0]?.neighborhood},{' '}
              {companyDetails?.companyAddresses[0]?.city.name}
            </Typography.Text>
          </div>
        </Col>
      )}
    </Flex>
  )
}
