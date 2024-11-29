export function initSafearea(
  manifestJson: Record<string, any>,
  pagesJson: UniApp.PagesJson
) {
  if (pagesJson.tabBar?.list?.length) {
    // 安全区配置 仅包含 tabBar 的时候才配置
    if (!manifestJson.plus.safearea) {
      manifestJson.plus.safearea = {
        background: pagesJson.tabBar.backgroundColor || '#FFFFFF',
        bottom: {
          offset: 'auto',
        },
      }
    }
    if (!manifestJson['app-harmony'].safearea) {
      manifestJson['app-harmony'].safearea = {
        background: pagesJson.tabBar.backgroundColor || '#FFFFFF',
        bottom: {
          offset: 'auto',
        },
      }
    }
  } else {
    if (!manifestJson.plus.launchwebview) {
      manifestJson.plus.launchwebview = {
        render: 'always',
      }
    } else if (!manifestJson.plus.launchwebview.render) {
      manifestJson.plus.launchwebview.render = 'always'
    }
  }
}
