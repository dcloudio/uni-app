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

export const defaultMiniProgramRpx2Unit = {
  unit: 'rpx',
  unitRatio: 1,
  unitPrecision: 1,
}

export const defaultNVueRpx2Unit = defaultMiniProgramRpx2Unit

export type Rpx2UnitOptions = typeof defaultRpx2Unit

export function createRpx2Unit(
  unit: string,
  unitRatio: number,
  unitPrecision: number
) {
  // ignore: rpxCalcIncludeWidth
  return (val: string) =>
    val.replace(unitRE, (m, $1) => {
      if (!$1) {
        return m
      }
      if (unitRatio === 1) {
        return `${$1}${unit}`
      }
      const value = toFixed(parseFloat($1) * unitRatio, unitPrecision)
      return value === 0 ? '0' : `${value}${unit}`
    })
}

export function getPartClass(partName: string) {
  return `-_part__${partName}_-`
}

export function batchGetPartClass(partNames: string) {
  return partNames
    .split(/\s+/)
    .filter(Boolean)
    .map((partName) => getPartClass(partName))
    .join(' ')
}
