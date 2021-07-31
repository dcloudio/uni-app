import BannerPlugin from '../../plugin/BannerPlugin'

export function createBannerPlugin() {
  return new BannerPlugin({
    banner: '"use weex:vue";',
  })
}
