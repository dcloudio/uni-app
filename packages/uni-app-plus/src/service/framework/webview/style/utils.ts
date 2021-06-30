const colorRE = /^#[a-z0-9]{6}$/i
export function isColor(color?: string) {
  return color && (colorRE.test(color) || color === 'transparent')
}
