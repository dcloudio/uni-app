export function getLen(str = '') {
  return ('' + str).replace(/[^\x00-\xff]/g, '**').length
}
