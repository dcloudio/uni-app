import os from 'os'
import colors from 'picocolors'
import type { UtsTarget } from '.'
import { UtsResult } from './types'
export const isWindows = os.platform() === 'win32'
export function normalizePath(id: string): string {
  return isWindows ? id.replace(/\\/g, '/') : id
}

const round = (number: number) => Number(number.toFixed(2))

const hrTimeToMilliseconds = (hrtime: [number, number]) =>
  hrtime[0] * 1e3 + hrtime[1] / 1e6

export function timeEnd(start: [number, number]) {
  return round(
    hrTimeToMilliseconds(process.hrtime()) - hrTimeToMilliseconds(start)
  )
}

export function printStartup(target: UtsTarget, mode: string) {
  console.log(
    colors.cyan(
      `uts v${require('../package.json').version} ${colors.green(
        `building ${target} for ${mode}...`
      )}`
    )
  )
}

export function printUtsResults(results: UtsResult[]) {
  let longest = 0
  for (const result of results) {
    const l = result.filename!.length
    if (l > longest) longest = l
  }
  console.log(
    colors.dim(`${colors.green(`✓`)} ${results.length} files transformed.`)
  )
  results.forEach((result) => {
    printUtsResult(result, longest)
  })
}

export function printUtsResult(result: UtsResult, maxLength = 0) {
  console.log(
    colors.green(result.filename!.padEnd(maxLength + 2)) +
      ' ' +
      colors.dim(result.time + 'ms')
  )
}
