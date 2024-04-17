import type { Plugin } from 'postcss'
import type { Options } from 'autoprefixer'
import uniPostcssScopedPlugin from './plugins/stylePluginScoped'
import uniPostcssPlugin, {
  type UniAppCssProcessorOptions,
} from './plugins/uniapp'
export { uniPostcssPlugin }
export { uniPostcssScopedPlugin }
export function initPostcssPlugin({
  uniApp,
  autoprefixer,
}: {
  uniApp?: UniAppCssProcessorOptions
  autoprefixer?: Options | false
} = {}): Plugin[] {
  const plugins: Plugin[] = [uniPostcssPlugin(uniApp)]
  // nvue 不需要 autoprefixer
  if (autoprefixer !== false) {
    plugins.push(require('autoprefixer')(autoprefixer))
  }
  return plugins
}
