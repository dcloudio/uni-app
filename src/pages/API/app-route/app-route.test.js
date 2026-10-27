jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMpWeixin = platformInfo.startsWith('mp-weixin')
const isMpAlipay = platformInfo === 'mp-alipay'
const isMpWeixinRemote = process.env.UNI_TEST_WEIXIN_REMOTE === 'true'
const isMpWeixinSimulator =
  isMpWeixin && !isMpWeixinRemote
// 支付宝 Lyra Web 模拟器未提供 createRouteObserver，待支持路由观察能力后恢复相关用例。
const itAppRoute = isMpAlipay ? it.skip : it
const itRewriteRoute =
  isMpWeixinSimulator || isMpAlipay ? it.skip : it
// “不支持重写路由”的结果同样依赖路由观察回调，当前 Lyra Web 模拟器无法完成验证。
const itRewriteRouteNotSupported = it.skip

const PAGE_PATH = '/pages/API/app-route/app-route'
const PAGE_ROUTE = 'pages/API/app-route/app-route'
const TARGET_PATH = '/pages/API/app-route/app-route-target'
const TARGET_ROUTE = 'pages/API/app-route/app-route-target'

describe('应用路由事件', () => {
  let page

  const waitForPageReady = async () => {
    if (isMpWeixin) {
      await page.waitFor(300)
    } else {
      await page.waitFor('view')
    }
  }

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await waitForPageReady()
    await page.callMethod('clearRecords')
  })

  itAppRoute('监听并注销应用路由事件', async () => {
    page = await program.navigateTo(`${TARGET_PATH}?from=normal`)
    await waitForPageReady()
    expect((await page.data('data')).from).toBe('normal')

    page = await program.navigateBack()
    await waitForPageReady()
    let data = await page.data('data')
    expect(data.beforeAppRouteCount).toBe(2)
    expect(data.appRouteCount).toBe(2)
    expect(data.beforeAppRouteEvents.length).toBe(2)
    expect(data.appRouteEvents.length).toBe(2)
    expect(data.lastNavigateToBeforePath).toBe(TARGET_ROUTE)
    expect(data.lastNavigateToAppRoutePath).toBe(TARGET_ROUTE)

    await page.callMethod('clearRecords')
    await page.callMethod('stopListen')
    page = await program.navigateTo(`${TARGET_PATH}?from=normal`)
    await waitForPageReady()
    page = await program.navigateBack()
    await waitForPageReady()
    data = await page.data('data')
    expect(data.beforeAppRouteCount).toBe(0)
    expect(data.appRouteCount).toBe(0)
    expect(data.beforeAppRouteEvents.length).toBe(0)
    expect(data.appRouteEvents.length).toBe(0)
    expect(data.isListening).toBe(false)
  })

  itRewriteRoute('重写下一次路由', async () => {
    await page.callMethod('enableRewriteNextRoute')
    page = await program.navigateTo(`${TARGET_PATH}?from=source`)
    await waitForPageReady()
    expect((await page.data('data')).from).toBe('rewrite')

    page = await program.navigateBack()
    await waitForPageReady()
    const data = await page.data('data')
    expect(data.rewriteRouteResult.replace(/\s/g, '')).toBe('rewriteRoute:ok')
    expect(data.lastNavigateToBeforePath).toBe(TARGET_ROUTE)
    expect(data.lastNavigateToAppRoutePath).toBe(TARGET_ROUTE)
    expect(data.beforeAppRouteCount).toBe(3)
    expect(data.appRouteCount).toBe(2)
    expect(data.beforeAppRouteEvents.length).toBe(3)
    expect(data.appRouteEvents.length).toBe(2)
  })

  itRewriteRouteNotSupported('支付宝不支持重写路由', async () => {
    await page.callMethod('enableRewriteNextRoute')
    page = await program.navigateTo(`${TARGET_PATH}?from=source`)
    await waitForPageReady()
    expect((await page.data('data')).from).toBe('source')

    page = await program.navigateBack()
    await waitForPageReady()
    const data = await page.data('data')
    expect(data.rewriteRouteResult).toContain('not supported')
    expect(data.lastNavigateToBeforePath).toBe(TARGET_ROUTE)
    expect(data.lastNavigateToAppRoutePath).toBe(TARGET_ROUTE)
    expect(data.beforeAppRouteCount).toBe(2)
    expect(data.appRouteCount).toBe(2)
    expect(data.beforeAppRouteEvents.length).toBe(2)
    expect(data.appRouteEvents.length).toBe(2)
  })

  afterEach(async () => {
    const currentPage = await program.currentPage()
    if (currentPage.path === PAGE_ROUTE) {
      await currentPage.callMethod('stopListen')
    }
  })
})
