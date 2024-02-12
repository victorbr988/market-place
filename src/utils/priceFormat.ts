export function priceFormat(price: number) {
  const priceBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    price,
  )
  return priceBRL
}