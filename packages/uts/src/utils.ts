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
  let failed: UtsResult[] = []
  let transformed: UtsResult[] = []
  results.forEach((result) => {
    if (result.error) {
      failed.push(result)
    } else {
      transformed.push(result)
    }
  })
  if (failed.length) {
    console.log(colors.dim(`${colors.red(`✗`)} ${failed.length} files failed.`))
    failed.forEach((result) => {
      console.error(result.error!.message.split(`Caused by:`)[0])
    })
  }
  if (transformed.length) {
    for (const result of transformed) {
      const l = result.filename!.length
      if (l > longest) longest = l
    }
    console.log(
      colors.dim(
        `${colors.green(`✓`)} ${transformed.length} files transformed.`
      )
    )
    transformed.forEach((result) => {
      if (result.filename) {
        printUtsResult(result, longest)
      }
    })
  }
}

export function printUtsResult(result: UtsResult, maxLength = 0) {
  console.log(
    colors.green(result.filename!.padEnd(maxLength + 2)) +
      ' ' +
      colors.dim(result.time + 'ms')
  )
}
