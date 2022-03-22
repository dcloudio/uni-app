/**
 * 从 16 进制的色值解析成 rgba 格式的色值
 * @param { string } hex, #000、#000A、#000000、#000000AA，参数只能是这四种格式
 * @returns {
  r: number;
  g: number;
  b: number;
  a: number;
}
 */
export function hexToRgba (hex) {
  // 异常情况
  if (!hex) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0
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
      a: 0
    }
  }
  // 格式化 tmpHex，使其变成 rrggbb 或 rrggbbaa
  if (tmpHexLen === 3 || tmpHexLen === 4) {
    // rgb => rrggbb || rgba => rrggbbaa
    tmpHex = tmpHex.replace(/(\w{1})/g, 'r1r1')
  }
  // r1 ~ a2
  const [r1, r2, g1, g2, b1, b2, a1, a2] = tmpHex.match(/(\w{1})/g)
  // rgb
  const r = parseInt(r1) * 16 + parseInt(r2); const g = parseInt(g1) * 16 + parseInt(g2); const b = parseInt(b1) * 16 + parseInt(b2)

  if (!a1) {
    return { r, g, b, a: 1 }
  }

  return {
    r, g, b, a: (`0x100${a1}${a2}` - 0x10000) / 255
  }
}
