export function createBackgroundColorStyle(color: string | undefined) {
  return color ? { backgroundColor: color } : undefined
}

export function withBackgroundColor<T extends object>(
  style: T,
  color: string | undefined
) {
  return color ? Object.assign(style, { backgroundColor: color }) : style
}
