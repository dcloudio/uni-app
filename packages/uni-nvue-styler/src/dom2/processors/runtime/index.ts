import { UniCSSPropertyVariable, processors } from './processors'

export function toSharedDataStyle(
  style: Map<string, unknown>,
  result: Record<number, unknown> = {}
) {
  style.forEach((value, key) => {
    if (key.startsWith('--')) {
      if (!result[UniCSSPropertyVariable]) {
        result[UniCSSPropertyVariable] = {}
      }
      ;(result[UniCSSPropertyVariable] as Record<string, string>)[key] =
        value as string
    } else {
      const processor = processors.get(key)
      if (processor) {
        const newValue = processor[1](value as string)
        if (typeof newValue !== 'undefined') {
          result[processor[0]] = newValue
        }
      }
    }
  })
  return result
}
