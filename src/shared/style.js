export const unitRE = new RegExp('"[^"]+"|\'[^\']+\'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px', 'g')

function toFixed (number, precision) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}

const defaultRpx2Unit = {
  unit: 'rem',
  unitRatio: 10 / 320,
  unitPrecision: 5
}

const Rpx2Unit = Object.assign({}, defaultRpx2Unit)

export function setRpx2Unit (config) {
  return Object.assign(config, defaultRpx2Unit)
}

export function getRpx2Unit () {
  return Rpx2Unit
}

function _rpx2Unit (rpx, unit, unitRatio, unitPrecision) {
  if (unitRatio === 1) {
    return `${rpx}${unit}`
  }
  const value = toFixed(rpx * unitRatio, unitPrecision)
  return value === 0 ? '0' : `${value}${unit}`
}

export function createRpx2Unit (unit, unitRatio, unitPrecision) {
  // ignore: rpxCalcIncludeWidth
  /**
   * @param {string} val
   * @returns {string}
   */
  return (val) => {
    if (typeof val === 'string') {
      return val.replace(unitRE, (m, $1) => {
        if (!$1) {
          return m
        }

        return _rpx2Unit(parseFloat($1), unit, unitRatio, unitPrecision)
      })
    } else if (typeof val === 'number') {
      return _rpx2Unit(val, unit, unitRatio, unitPrecision)
    }
  }
}
