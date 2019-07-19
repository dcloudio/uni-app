export function parsePullToRefresh (routeOptions, {
  plus
}) {
  const windowOptions = routeOptions.window

  if (windowOptions.enablePullDownRefresh) {
    const pullToRefreshStyles = Object.create(null)
    // 初始化默认值
    if (plus.os.name === 'Android') {
      Object.assign(pullToRefreshStyles, {
        support: true,
        style: 'circle'
      })
    } else {
      Object.assign(pullToRefreshStyles, {
        support: true,
        style: 'default',
        height: '50px',
        range: '200px',
        contentdown: {
          caption: ''
        },
        contentover: {
          caption: ''
        },
        contentrefresh: {
          caption: ''
        }
      })
    }

    if (windowOptions.backgroundTextStyle) {
      pullToRefreshStyles.color = windowOptions.backgroundTextStyle
      pullToRefreshStyles.snowColor = windowOptions.backgroundTextStyle
    }

    Object.assign(pullToRefreshStyles, windowOptions.pullToRefresh || {})

    return pullToRefreshStyles
  }
}
