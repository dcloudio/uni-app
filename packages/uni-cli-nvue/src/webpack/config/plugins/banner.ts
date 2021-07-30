import { BannerPlugin } from 'webpack'

export function createBannerPlugin() {
  return new BannerPlugin({
    banner: '"use weex:vue";',
    raw: true,
    exclude: 'Vue',
  })
}
