import { RuleSetRule } from 'webpack'
import { createBabelLoader } from './babelLoader'
import { createCssLoaders } from './cssLoader'
import { createRecyclableLoader } from './recyclableLoader'
import { createTemplateLoader } from './templateLoader'
import { createVueLoader } from './vueLoader'
export function createRules(options: NVueCompilerOptions): RuleSetRule[] {
  const rules = [
    createVueLoader(options),
    createBabelLoader(),
    createRecyclableLoader(),
    ...createCssLoaders(),
  ]
  if (process.env.UNI_NVUE_COMPILER === 'uni-app') {
    rules.push(createTemplateLoader())
  }
  return rules
}
