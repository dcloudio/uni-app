import { toNumber } from '@vue/shared'
import type { MPEvent } from './vOn'

interface VModelFn {
  (...args: unknown[]): unknown
  modifiers?: VModelModifiers
}
interface VModelModifiers {
  number?: boolean
  trim?: boolean
}
export function withModelModifiers(
  fn: VModelFn,
  { number, trim }: VModelModifiers,
  isComponent = false
) {
  if (isComponent) {
    return (...args: any[]) => {
      if (trim) {
        args = args.map((a) => a.trim())
      } else if (number) {
        args = args.map(toNumber)
      }
      return fn(...args)
    }
  }
  return (event: MPEvent) => {
    const value: string = event.detail.value
    if (trim) {
      event.detail.value = value.trim()
    } else if (number) {
      event.detail.value = toNumber(value)
    }
    return fn(event)
  }
}
