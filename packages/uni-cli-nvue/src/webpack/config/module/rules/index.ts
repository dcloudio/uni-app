import { RuleSetRule } from 'webpack'
import { babelLoader } from './babelLoader'
import { vueLoader } from './vueLoader'
export const rules: RuleSetRule[] = [vueLoader, babelLoader]
