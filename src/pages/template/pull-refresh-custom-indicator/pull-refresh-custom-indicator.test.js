const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isHarmony = platformInfo.includes('harmony')
const isMP = platformInfo.startsWith('mp')
const PAGE_PATH = '/pages/template/pull-refresh-custom-indicator/pull-refresh-custom-indicator'
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe('pull-refresh-custom-indicator', () => {
  if (isVapor || isMP) {
    it('not supported in vapor mode skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  async function waitForRefreshState(matcher, timeout = 5000) {
    const start = Date.now()
    let matchedState = null

    await page.waitFor(async () => {
      const value = await page.callMethod('jest_getRefreshState')

      if (matcher(value)) {
        matchedState = value
        return true
      }

      return Date.now() - start > timeout
    })

    if (matchedState != null) {
      return matchedState
    }

    return await page.callMethod('jest_getRefreshState')
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(800)
  })

  beforeEach(async () => {
    await page.callMethod('jest_applyPulling', 0)
    await page.callMethod('jest_restoreRefresh')
    await page.waitFor(100)
  })

  it('renders sticky header and content list', async () => {
    const listView = await page.$('list-view')
    const header = await page.$('.header')
    const tipText = await page.$('.tip-text')
    const items = await page.$$('.content-item-text')

    expect(listView).not.toBeNull()
    expect(tipText).not.toBeNull()

    // 鸿蒙平台 sticky-header 组件只能作为 sticky-section 的子元素使用
    if (!isHarmony) {
      expect(header).not.toBeNull()
      expect(await header.text()).toContain('sticky header')
    }

    expect(await tipText.text()).toBe('继续下拉执行刷新')
    expect(items.length).toBe(20)
    expect(await items[0].text()).toBe('item-1')
    expect(await items[19].text()).toBe('item-20')
  })

  it('keeps initial hint before reaching threshold', async () => {
    await page.callMethod('jest_applyPulling', 20)
    await page.waitFor(100)

    const state = await page.callMethod('jest_getRefreshState')
    const tipText = await page.$('.tip-text')

    expect(state.pullingDistance).toBe(20)
    expect(state.state).toBe(0)
    expect(await tipText.text()).toBe('继续下拉执行刷新')
  })

  it('switches to release hint after crossing threshold', async () => {
    await page.callMethod('jest_applyPulling', 60)
    await page.waitFor(100)

    const state = await page.callMethod('jest_getRefreshState')
    const tipText = await page.$('.tip-text')

    expect(state.pullingDistance).toBe(60)
    expect(state.state).toBe(1)
    expect(await tipText.text()).toBe('释放立即刷新')
  })

  it('transitions through refreshing and restore states', async () => {
    await page.callMethod('jest_applyPulling', 60)
    await page.callMethod('jest_triggerRefresh')

    let state = await waitForRefreshState((value) => value != null && value.state == 2 && value.refresherTriggered == true)
    let tipText = await page.$('.tip-text')
    let refreshIcons = await page.$$('.refresh-icon')

    expect(state.state).toBe(2)
    expect(state.refresherTriggered).toBe(true)
    expect(await tipText.text()).toBe('刷新中')
    expect(refreshIcons.length).toBe(1)

    state = await waitForRefreshState((value) => {
      if (value == null || value.refresherTriggered == true) {
        return false
      }

      if (value.state == 3 && value.resetting == true) {
        return true
      }

      return isHarmony && value.state == 0 && value.resetting == false
    }, 3000)

    expect(state.refresherTriggered).toBe(false)

    // 鸿蒙端 restore 结束更快，可能观察到恢复中(state=3)或已恢复(state=0)。
    if (isHarmony) {
      expect([true, false]).toContain(state.resetting)
      expect([3, 0]).toContain(state.state)
    } else {
      expect(state.resetting).toBe(true)
      expect(state.state).toBe(3)
    }

    await page.callMethod('jest_restoreRefresh')
    await page.waitFor(100)

    state = await page.callMethod('jest_getRefreshState')
    tipText = await page.$('.tip-text')
    refreshIcons = await page.$$('.refresh-icon')

    expect(state.pullingDistance).toBe(0)
    expect(state.refresherTriggered).toBe(false)
    expect(state.resetting).toBe(false)
    expect(state.state).toBe(0)
    expect(await tipText.text()).toBe('继续下拉执行刷新')
    expect(refreshIcons.length).toBe(0)
  })
})
