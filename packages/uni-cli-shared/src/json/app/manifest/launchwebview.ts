import { extend } from '@vue/shared'
export function initLaunchwebview(
  manifestJson: Record<string, any>,
  pagesJson: UniApp.PagesJson
) {
  let entryPagePath = pagesJson.pages[0].path
  // 依赖前置执行initArguments
  if (manifestJson.plus.arguments) {
    try {
      const args = JSON.parse(manifestJson.plus.arguments)
      if (args.path) {
        entryPagePath = args.path
      }
    } catch (e) {}
  }

  if (manifestJson.plus.useragent.concatenate) {
    if (manifestJson.plus.useragent.value) {
      manifestJson.plus.useragent.value = [
        'uni-app',
        manifestJson.plus.useragent.value,
      ].join(' ')
    } else {
      manifestJson.plus.useragent.value = 'uni-app'
    }
  }

  if (manifestJson['app-harmony'].useragent.concatenate) {
    if (manifestJson['app-harmony'].useragent.value) {
      manifestJson['app-harmony'].useragent.value = [
        'uni-app',
        manifestJson['app-harmony'].useragent.value,
      ].join(' ')
    } else {
      manifestJson['app-harmony'].useragent.value = 'uni-app'
    }
  }

  extend(manifestJson.plus.launchwebview, {
    id: '1',
    kernel: 'WKWebview',
  })

  // 首页为nvue
  const entryPage = pagesJson.pages.find((p) => p.path === entryPagePath)
  if (entryPage?.style.isNVue) {
    manifestJson.plus.launchwebview.uniNView = { path: entryPagePath + '.js' }
  } else {
    manifestJson.launch_path = '__uniappview.html'
  }
  return entryPagePath
}
