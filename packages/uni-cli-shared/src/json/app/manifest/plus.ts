const wxPageOrientationMapping = {
  auto: [
    'portrait-primary',
    'portrait-secondary',
    'landscape-primary',
    'landscape-secondary',
  ],
  portrait: ['portrait-primary', 'portrait-secondary'],
  landscape: ['landscape-primary', 'landscape-secondary'],
}

export function initPlus(
  manifestJson: Record<string, any>,
  pagesJson: Record<string, any>
) {
  // 转换为老版本配置
  if (manifestJson.plus.modules) {
    manifestJson.permissions = manifestJson.plus.modules
    delete manifestJson.plus.modules
  }
  const distribute = manifestJson.plus.distribute
  if (distribute) {
    if (distribute.android) {
      manifestJson.plus.distribute.google = distribute.android
      delete manifestJson.plus.distribute.android
    }
    if (distribute.ios) {
      manifestJson.plus.distribute.apple = distribute.ios
      delete manifestJson.plus.distribute.ios
    }
    if (distribute.sdkConfigs) {
      manifestJson.plus.distribute.plugins = distribute.sdkConfigs
      delete manifestJson.plus.distribute.sdkConfigs
    }
  }

  // 屏幕启动方向
  if (manifestJson.plus.screenOrientation) {
    // app平台优先使用 manifest 配置
    manifestJson.screenOrientation = manifestJson.plus.screenOrientation
    delete manifestJson.plus.screenOrientation
  } else if (pagesJson.globalStyle && pagesJson.globalStyle.pageOrientation) {
    // 兼容微信小程序
    const pageOrientationValue =
      wxPageOrientationMapping[
        pagesJson.globalStyle
          .pageOrientation as keyof typeof wxPageOrientationMapping
      ]
    if (pageOrientationValue) {
      manifestJson.screenOrientation = pageOrientationValue
    }
  }

  // 全屏配置
  manifestJson.fullscreen = manifestJson.plus.fullscreen

  // 地图坐标系
  if (manifestJson.permissions && manifestJson.permissions.Maps) {
    manifestJson.permissions.Maps.coordType = 'gcj02'
  }

  if (!manifestJson.permissions) {
    manifestJson.permissions = {}
  }

  manifestJson.permissions.UniNView = {
    description: 'UniNView原生渲染',
  }

  // 允许内联播放视频
  manifestJson.plus.allowsInlineMediaPlayback = true
}
