export function dateFormat(date: string) {
  var dateConvert = new Date(date)

  return new Intl.DateTimeFormat("pt-BR").format(dateConvert)
}