export function parseUri (path) {
  return path.substr(0, path.lastIndexOf('/'))
}
