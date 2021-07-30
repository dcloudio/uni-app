import { Configuration } from 'webpack'

import { createRules } from './rules'

export function createModule(): Configuration['module'] {
  return {
    rules: createRules(),
  }
}
