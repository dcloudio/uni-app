jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const supportsEvents = platformInfo.startsWith('web') || platformInfo.startsWith('harmony') ||
  platformInfo.startsWith('mp-weixin') || platformInfo.startsWith('mp-alipay')
const itEvents = supportsEvents ? it : it.skip
const PAGE_PATH = '/pages/API/navigator/navigator'
const CHILD_ROUTE = 'pages/API/navigator/new-page/new-page-1'

describe('navigateTo events', () => {
  itEvents('子页面回传数据，再次打开时清空旧结果', async () => {
    let page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    const originalLifeCycleNum = await page.callMethod('getLifeCycleNum')
    try {
      for (let i = 0; i < 2; i++) {
        await page.callMethod('navigateTo')
        await page.waitFor(async () => (await program.currentPage()).path === CHILD_ROUTE)
        const child = await program.currentPage()
        await child.waitFor('view')
        expect(await page.callMethod('getEventReply')).toBe('')
        await child.callMethod('replyToOpener')
        page = await program.navigateBack()
        await page.waitFor(async () => (await page.callMethod('getEventReply')) === 'Hello from new-page-1')
        expect(await page.callMethod('getEventReply')).toBe('Hello from new-page-1')
      }
    } finally {
      const current = await program.currentPage()
      if (current.path === CHILD_ROUTE) page = await program.navigateBack()
      await page.callMethod('setLifeCycleNumWrapper', originalLifeCycleNum)
    }
  })
})
