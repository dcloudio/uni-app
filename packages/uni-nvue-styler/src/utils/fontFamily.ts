function decodeCssEscapes(value: string): string {
  if (!value.includes('\\')) return value
  return value.replace(
    /\\(?:([\da-f]{1,6})(?:\r\n|[\t\n\f\r ])?|(\r\n|[\n\r\f])|([\s\S]))/gi,
    (_, hex: string | undefined, newline: string | undefined, char: string) => {
      if (hex) {
        const code = parseInt(hex, 16)
        return String.fromCodePoint(
          !code || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)
            ? 0xfffd
            : code
        )
      }
      return newline ? '' : char
    }
  )
}

export function decodeFontFamily(value: string): string {
  const whitespace = ' \t\n\r\f'
  let start = 0
  let end = value.length
  while (start < end && whitespace.includes(value[start])) start++
  while (end > start && whitespace.includes(value[end - 1])) end--
  value = value.slice(start, end)
  if (value.includes('var(') || value.includes('env(')) return value
  const quote = value[0]
  const quoted =
    value.length >= 2 &&
    (quote === '"' || quote === "'") &&
    value[value.length - 1] === quote
  return decodeCssEscapes(quoted ? value.slice(1, -1) : value)
}
