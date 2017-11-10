import dateFormat from 'dateformat'

const DATE_FORMAT = 'mmm d, yyyy'

export function formatDate(dateString) {
  return dateFormat(new Date(dateString), DATE_FORMAT)
}
