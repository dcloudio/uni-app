import { Configuration } from 'webpack'

import { createRules } from './rules'

export function createModule(
  options: NVueCompilerOptions
): Configuration['module'] {
  return {
    rules: createRules(options),
  }
}
