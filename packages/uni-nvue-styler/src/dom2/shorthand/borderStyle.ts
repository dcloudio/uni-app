import type { Declaration } from 'postcss'
import { mergeShorthand } from './borderColor'

export function borderStyle(decls: Declaration[]): boolean {
  return mergeShorthand(decls, 'style', 'none')
}
