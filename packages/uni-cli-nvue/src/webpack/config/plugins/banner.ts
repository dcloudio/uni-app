import { BannerPlugin } from 'webpack'

export const banner = new BannerPlugin({
  banner: '"use weex:vue";',
  raw: true,
  exclude: 'Vue',
})
