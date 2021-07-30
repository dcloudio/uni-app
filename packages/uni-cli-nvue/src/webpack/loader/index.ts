import path from 'path'
export function resolveLoader(loader: string) {
  return path.resolve(__dirname, loader)
}
