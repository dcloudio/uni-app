const platformInfo = (process.env.uniTestPlatformInfo || '').toLowerCase()
const isMpWeixin = platformInfo.startsWith('mp-weixin')
const isApp = ['android', 'ios', 'harmony'].some(name => platformInfo.startsWith(name))
// App WebView 用于截图对照；其他未验证样式读取的平台也只采集截图。
const canAssertMedia = process.env.UNI_AUTOMATOR_APP_WEBVIEW !== 'true' &&
  (platformInfo.startsWith('web') || isMpWeixin ||
    (isApp && process.env.UNI_APP_X_DOM2 === 'true'))

async function readMediaState(page, ids, componentId) {
  // 小程序从组件节点查询内部元素，其他平台可直接在页面中查询。
  const scope = isMpWeixin && componentId ? await page.$('#' + componentId) : page
  if (scope == null) return null
  const displays = []
  for (const id of ids) {
    const matched = await scope.$('#' + id)
    const unmatched = await scope.$('#' + id + '-unmatched')
    if (matched == null || unmatched == null) return null
    displays.push(await matched.style('display'), await unmatched.style('display'))
  }
  const state = {}
  for (let i = 0; i < ids.length; i++) {
    const yes = displays[i * 2], no = displays[i * 2 + 1]
    if (yes === 'flex' && no === 'none') state[ids[i]] = true
    else if (yes === 'none' && no === 'flex') state[ids[i]] = false
    else return null
  }
  return state
}

async function expectMediaMatches(page, expected, componentId) {
  let actual
  await page.waitFor(async () => {
    actual = await readMediaState(page, Object.keys(expected), componentId)
    return actual != null && Object.keys(expected).every(id => actual[id] === expected[id])
  }, 5000)
  expect(actual).toEqual(expected)
}

async function hasMediaComponent(page) {
  return await page.$(isMpWeixin ? '#media-query-component' : '#component-width') !== null
}

// scroll-view 内的长内容不能靠 fullPage 完整截取，分段滚动采集，比较由外部系统负责。
async function saveMediaScreenshots(page, name) {
  await page.waitFor(600)
  const scrollView = await page.$('scroll-view')
  const content = await page.$('.content')
  const viewport = await scrollView.size()
  const size = await content.size()
  expect(Number.isFinite(viewport.height) && viewport.height > 0).toBe(true)
  expect(Number.isFinite(size.height) && size.height > 0).toBe(true)
  const step = Math.max(1, Math.floor(viewport.height * 0.8))
  const maxScroll = Math.max(0, size.height - viewport.height)
  let index = 0
  for (let top = 0; ; top = Math.min(top + step, maxScroll)) {
    await page.callMethod('setScrollTop', top)
    await page.waitFor(300)
    const image = await program.screenshot({ fullPage: true })
    const id = `${name}-${++index}`
    expect(image).toSaveImageSnapshot({ customSnapshotIdentifier: () => id })
    if (top === maxScroll) break
  }
}


module.exports = {
  canAssertMedia, readMediaState, expectMediaMatches, hasMediaComponent, saveMediaScreenshots
}
