import { toSharedDataStyleValueError } from '../utils'

export function createToSharedDataStyleCombinedValue(
  processors: Array<(value: string | number, propertyName: string) => any>
) {
  return (value: string | number, propertyName: string) => {
    for (const processor of processors) {
      const result = processor(value, propertyName)
      if (result) {
        return result
      }
    }
    return toSharedDataStyleValueError(value, propertyName)
  }
}
