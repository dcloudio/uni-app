import type { Declaration } from 'postcss'
import { borderColor } from './borderColor'
import { borderStyle } from './borderStyle'
import {
  DOM2_APP_PLATFORM,
  DOM2_APP_TARGET,
  type ParseDom2StaticStyleOptions,
} from '../types'

export function shorthand(
  decls: Declaration[],
  options: ParseDom2StaticStyleOptions
) {
  if (
    options.platform === DOM2_APP_PLATFORM.APP_HARMONY &&
    options.target === DOM2_APP_TARGET.NV_C
  ) {
    borderColor(decls)
    borderStyle(decls)
  }
}
