import { Configuration } from 'webpack'
import { createDefinePlugin } from './define'
import { createBannerPlugin } from './banner'
import { createProvidePlugin } from './provide'
import { createVueLoaderPlugin } from './vueLoader'

export function createPlugins(): Configuration['plugins'] {
  return [
    createDefinePlugin(),
    createBannerPlugin(),
    createProvidePlugin(),
    createVueLoaderPlugin(),
  ]
}
