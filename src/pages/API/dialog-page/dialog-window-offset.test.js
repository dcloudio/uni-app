jest.setTimeout(30000)

const isWeb = (process.env.uniTestPlatformInfo || '').toLowerCase().startsWith('web')
const PAGE_PATH = '/pages/API/dialog-page/dialog-window-offset'

describe('dialogPage 不修改父页面窗口变量', () => {
  if (!isWeb) {
    it.skip('仅 Web 端验证 CSS 窗口变量和页面滚动', () => {})
    return
  }

  let page
  let initial

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(async () => (await page.callMethod('getWindowState')).rootTop > 0)
    initial = await page.callMethod('getWindowState')
    expect(initial.windowTop).not.toBe('')
    expect(initial.windowBottom).not.toBe('')
    expect(initial.rootHeight).toBeGreaterThan(0)
    expect(initial.footerBottom).toBeLessThanOrEqual(initial.viewportHeight + 1)
    expect(initial.scrollHeight).toBeLessThanOrEqual(initial.clientHeight + 1)
    expect(initial.scrollTop).toBe(0)
  })

  afterEach(async () => {
    if (page != null) {
      await page.callMethod('closePopups')
      await page.waitFor(async () => {
        const current = await page.callMethod('getWindowState')
        return !current.modalVisible && !current.dialogVisible
      })
    }
  })

  function expectUnchanged(current) {
    expect(current.windowTop).toBe(initial.windowTop)
    expect(current.windowBottom).toBe(initial.windowBottom)
    for (const key of ['rootTop', 'rootHeight', 'footerTop', 'footerBottom', 'scrollHeight']) {
      expect(Math.abs(current[key] - initial[key])).toBeLessThanOrEqual(1)
    }
    expect(current.scrollTop).toBe(0)
  }

  for (const popup of [
    { name: 'uni.showModal', method: 'openModal', visible: 'modalVisible' },
    { name: 'uni.openDialogPage（自定义导航栏）', method: 'openDialog', visible: 'dialogVisible' }
  ]) {
    it(`${popup.name} 打开和关闭后，窗口变量及布局不变，整页仍不可滚动`, async () => {
      await page.callMethod(popup.method)
      await page.waitFor(async () => (await page.callMethod('getWindowState'))[popup.visible])
      expectUnchanged(await page.callMethod('getWindowState'))

      await page.callMethod('closePopups')
      await page.waitFor(async () => !(await page.callMethod('getWindowState'))[popup.visible])
      expectUnchanged(await page.callMethod('getWindowState'))

      // 弹窗关闭后尝试滚动整页，防止只因弹窗遮罩锁住滚动而误判通过。
      await page.callMethod('scrollPage')
      await page.waitFor(100)
      expectUnchanged(await page.callMethod('getWindowState'))
    })
  }
})
