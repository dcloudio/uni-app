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
  // 标记入口页，方便后边的 initTabBar 使用
  process.env.UNI_ENTRY_PAGE_PATH = entryPagePath

  manifestJson.plus.useragent.value = 'uni-app'
  extend(manifestJson.plus.launchwebview, {
    id: '1',
    kernel: 'WKWebview',
  })

  // 首页为nvue
  const entryPage = pagesJson.pages.find((p) => p.path === entryPagePath)
  if (entryPage?.style.isNVue) {
    manifestJson.plus.launchwebview.uniNView = { path: entryPagePath + '.js' }
    manifestJson.plus.launchwebview.id = '2'
  } else {
    manifestJson.launch_path = '__uniappview.html'
  }
}
