import { toSharedDataStyleValueError } from '../utils'

export function createToSharedDataStyleCombinedValue(
  processors: Array<(value: string | number) => any>
) {
  return (value: string | number) => {
    for (const processor of processors) {
      const result = processor(value)
      if (result) {
        return result
      }
    }
    return toSharedDataStyleValueError(`Invalid value: ${value}`)
  }
}
