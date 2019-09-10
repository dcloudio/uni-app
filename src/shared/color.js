export function hexToRgba (hex) {
  let r
  let g
  let b
  hex = hex.replace('#', '')
  if (hex.length === 6) {
    r = hex.substring(0, 2)
    g = hex.substring(2, 4)
    b = hex.substring(4, 6)
  } else if (hex.length === 3) {
    r = hex.substring(0, 1)
    g = hex.substring(1, 2)
    b = hex.substring(2, 3)
  } else {
    return false
  }
  if (r.length === 1) {
    r += r
  }
  if (g.length === 1) {
    g += g
  }
  if (b.length === 1) {
    b += b
  }
  r = parseInt(r, 16)
  g = parseInt(g, 16)
  b = parseInt(b, 16)
  return {
    r,
    g,
    b
  }
}
