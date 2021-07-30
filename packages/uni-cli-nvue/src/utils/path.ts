import path from 'path'
export function resolveLib(filepath: string) {
  return path.resolve(__dirname, '../../lib', filepath)
}
