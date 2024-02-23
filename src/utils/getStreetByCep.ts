export async function getStreetByCep(cep: number) {
  const street = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const streetJson =  street.json()

  return streetJson
}