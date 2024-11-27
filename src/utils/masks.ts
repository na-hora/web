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
