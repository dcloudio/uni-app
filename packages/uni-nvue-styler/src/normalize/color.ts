import {
  EXTENDED_COLOR_KEYWORDS,
  type Normalize,
  autofixedReason,
  validReason,
} from '../utils'

export const normalizeColor: Normalize = (v) => {
  v = (v || '').toString()

  if (v.match(/^#[0-9a-fA-F]{6}$/)) {
    return { value: v }
  }

  // rgba issues 13371
  if (v.match(/^#[0-9a-fA-F]{4}$/)) {
    return {
      value: '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3] + v[4] + v[4],
      reason: function reason(k, v, result) {
        return autofixedReason(v, result)
      },
    }
  }
  if (v.match(/^#[0-9a-fA-F]{8}$/)) {
    return {
      value: v,
    }
  }
  if (v.match(/^#[0-9a-fA-F]{3}$/)) {
    return {
      value: '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3],
      reason: function reason(k, v, result) {
        return autofixedReason(v, result)
      },
    }
  }
  if (EXTENDED_COLOR_KEYWORDS[v]) {
    return {
      value: EXTENDED_COLOR_KEYWORDS[v],
      reason: function reason(k, v, result) {
        return autofixedReason(v, result)
      },
    }
  }

  let arrColor, r, g, b, a
  const RGB_REGEXP = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/gi
  const RGBA_REGEXP =
    /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.?\d+)\s*\)$/gi
  if ((arrColor = RGB_REGEXP.exec(v))) {
    r = parseInt(arrColor[1])
    g = parseInt(arrColor[2])
    b = parseInt(arrColor[3])
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      return { value: 'rgb(' + [r, g, b].join(',') + ')' }
    }
  }
  if ((arrColor = RGBA_REGEXP.exec(v))) {
    r = parseInt(arrColor[1])
    g = parseInt(arrColor[2])
    b = parseInt(arrColor[3])
    a = parseFloat(arrColor[4])
    if (
      r >= 0 &&
      r <= 255 &&
      g >= 0 &&
      g <= 255 &&
      b >= 0 &&
      b <= 255 &&
      a >= 0 &&
      a <= 1
    ) {
      return { value: 'rgba(' + [r, g, b, a].join(',') + ')' }
    }
  }
  if (v === 'transparent') {
    return { value: 'rgba(0,0,0,0)' }
  }

  return {
    value: null,
    reason(k, v, result) {
      return validReason(k, v)
    },
  }
}
