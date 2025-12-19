export function stringCodePointAt(str: string, pos: number): number | null {
  if (pos < 0 || pos >= str.length) {
    return null
  }
  return str.codePointAt(pos) as number
}

export function stringAt(str: string, pos: number): string | null {
  if (pos < -str.length || pos >= str.length) {
    return null
  }
  return str.at(pos) as string
}
