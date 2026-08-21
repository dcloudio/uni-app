const PUBLIC_STAT_RUNTIME = '@dcloudio/uni-stat-public'
const MP_WEIXIN_PUBLIC_STAT_RUNTIME = '@dcloudio/uni-stat-public-mp-weixin'

export function resolvePublicStatImportPath(platform: string): string {
  return platform === 'mp-weixin'
    ? MP_WEIXIN_PUBLIC_STAT_RUNTIME
    : PUBLIC_STAT_RUNTIME
}
