export const currencyMask = <T>(value: T): string => {
  const price = Number(value)
  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  return formattedPrice
}

export const phoneMask = (value: string): string => {
  if (!value) return ''

  let valor = String(value).replace(/\D/g, '')

  valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2')
  valor = valor.replace(/(\d)(\d{4})$/, '$1-$2')

  return valor
}

export const removePhoneMask = (value: string): string => {
  return value.replace(/\D/g, '')
}
