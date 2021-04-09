export function getLen(str = '') {
  return ('' + str).replace(/[^\x00-\xff]/g, '**').length
}

export function removeLeadingSlash(str: string) {
  return str.indexOf('/') === 0 ? str.substr(1) : str
}
