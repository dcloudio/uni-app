import { processors } from './processors'

export function toSharedDataStyle(
  style: Map<string, unknown>,
  result: Record<number, unknown> = {}
) {
  style.forEach((value, key) => {
    const processor = processors.get(key)
    if (processor) {
      const newValue = processor[1](value as string)
      if (typeof newValue !== 'undefined') {
        result[processor[0]] = newValue
      }
    }
  })
  return result
}
