import { Configuration } from 'webpack'
import { createDefinePlugin } from './define'
import { createBannerPlugin } from './banner'
import { createProvidePlugin } from './provide'
import { createVueLoaderPlugin } from './vueLoader'
import WatchPlugin from '../../plugin/WatchPlugin'

export function createPlugins(): Configuration['plugins'] {
  return [
    createDefinePlugin(),
    createBannerPlugin(),
    createProvidePlugin(),
    createVueLoaderPlugin(),
    new WatchPlugin(),
  ]
}
