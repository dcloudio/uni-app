/**
 * 从 16 进制的色值解析成 rgba 格式的色值
 * @param { string } hex, #000、#000A、#000000、#000000AA，参数只能是这四种格式
 */
export function hexToRgba(hex: string): RGBA {
  // 异常情况
  if (!hex) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    }
  }
  // 去掉 #
  let tmpHex = hex.slice(1)
  const tmpHexLen = tmpHex.length
  // 处理 16 进制色值位数异常的情况
  if (![3, 4, 6, 8].includes(tmpHexLen)) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    }
  }
  // 格式化 tmpHex，使其变成 rrggbb 或 rrggbbaa
  if (tmpHexLen === 3 || tmpHexLen === 4) {
    // rgb => rrggbb || rgba => rrggbbaa
    tmpHex = tmpHex.replace(/(\w{1})/g, '$1$1')
  }
  // rgba
  let [sr, sg, sb, sa] = tmpHex.match(/(\w{2})/g) as string[]
  // rgb
  const r = parseInt(sr, 16),
    g = parseInt(sg, 16),
    b = parseInt(sb, 16)

  if (!sa) {
    return { r, g, b, a: 1 }
  }

  return {
    r,
    g,
    b,
    a: ((`0x100${sa}` as unknown as number) - 0x10000) / 255,
  }
}

export interface RGBA {
  r: number
  g: number
  b: number
  a: number
}
