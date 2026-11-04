// Web 样式转换沿用 createRpx2Unit 默认的 rem 比例和五位精度。
// 跳过字符串、URL、自定义属性名及 var() 引用（含非 ASCII 和 CSS 转义），
// 直接替换以保留 cssText 的重复声明与回退值，不解析或重建样式对象。
const rpxRE =
  /"[^"]+"|'[^']+'|url\([^)]+\)|--(?:[\w-]|[^\x00-\x7f]|\\(?:[\da-fA-F]{1,6}(?:\r\n|[ \t\r\n\f])?|[^\r\n\f]))+|(\d*\.?\d+)[ru]px/g
const hasRpxRE = /[ru]px/

export function normalizeRpx(value: string): string {
  if (!hasRpxRE.test(value)) return value
  return value.replace(rpxRE, (match, number: string | undefined) => {
    if (!number) return match
    const whole = Math.floor(parseFloat(number) * (10 / 320) * 1000000)
    const result = (Math.round(whole / 10) * 10) / 1000000
    return result === 0 ? '0' : `${result}rem`
  })
}
