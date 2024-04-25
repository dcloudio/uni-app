export function getSameOriginUrl(url: string): Promise<string> {
  const a = document.createElement('a')
  a.href = url
  if (a.origin === location.origin) {
    return Promise.resolve(url)
  }
  // TODO transform url
  return Promise.resolve(url)
}
