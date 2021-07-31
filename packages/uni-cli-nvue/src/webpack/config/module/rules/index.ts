import { RuleSetRule } from 'webpack'
import { createBabelLoader } from './babelLoader'
import { createCssLoaders } from './cssLoader'
import { createVueLoader } from './vueLoader'
export function createRules(options: NVueCompilerOptions): RuleSetRule[] {
  return [createVueLoader(options), createBabelLoader(), ...createCssLoaders()]
}
