export function getFileName(path: string) {
  const array = path.split('/')
  return array[array.length - 1]
}

export function getExtName(path: string) {
  const array = path.split('.')
  return array.length > 1 ? '.' + array[array.length - 1] : ''
}
