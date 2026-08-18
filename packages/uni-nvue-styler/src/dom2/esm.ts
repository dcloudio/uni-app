import { expand as baseExpand } from '../expand'
import type { NormalizeOptions } from '../utils'

export function expand(options: NormalizeOptions = {}) {
  return baseExpand(Object.assign({}, options, { dom2: true }))
}
