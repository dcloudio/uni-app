import { Configuration } from 'webpack'

import { rules } from './rules'

export const module: Configuration['module'] = {
  rules,
}
