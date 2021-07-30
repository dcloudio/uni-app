import { RuleSetRule } from 'webpack'
import { createBabelLoader } from './babelLoader'
import { createVueLoader } from './vueLoader'
export function createRules(): RuleSetRule[] {
  return [createVueLoader(), createBabelLoader()]
}
