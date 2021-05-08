const unitRE = new RegExp(
  `"[^"]+"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px`,
  'g'
)

function toFixed(number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}

export const defaultRpx2Unit = {
  unit: 'rem',
  unitRatio: 10 / 320,
  unitPrecision: 5,
}

export type Rpx2UnitOptions = typeof defaultRpx2Unit

export function createRpx2Unit(
  unit: string,
  unitRatio: number,
  unitPrecision: number
) {
  return (val: string) =>
    val.replace(unitRE, (m, $1) => {
      if (!$1) {
        return m
      }
      const value = toFixed(parseFloat($1) * unitRatio, unitPrecision)
      return value === 0 ? '0' : `${value}${unit}`
    })
}
