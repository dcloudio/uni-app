import { Configuration } from 'webpack'
import { define } from './define'
import { banner } from './banner'
import { provide } from './provide'
import { vueLoaderPlugin } from './vueLoader'

export const plugins: Configuration['plugins'] = [
  define,
  banner,
  provide,
  vueLoaderPlugin,
]
