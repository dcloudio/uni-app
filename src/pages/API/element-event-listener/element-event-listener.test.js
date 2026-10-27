const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isHarmony = platformInfo.startsWith('harmony')
const isIOS = platformInfo.startsWith('ios')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('element-event-listener', () => {
  if (!(isVapor && (isHarmony || isIOS))) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  let target

  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/element-event-listener/element-event-listener')
    await page.waitFor(500)
    target = await page.$('.listener-target')
  })

  beforeEach(async () => {
    await page.callMethod('reset')
    await page.waitFor(100)
  })

  it('shows initial state', async () => {
    expect(await page.data('data.listenerAdded')).toBe(false)
    expect(await page.data('data.listenerStatusText')).toBe('未注册')
    expect(await page.data('data.triggerCount')).toBe(0)
    expect(await page.data('data.lastEventType')).toBe('尚未触发')
  })

  it('triggers after addEventListener', async () => {
    await page.callMethod('add')
    expect(await page.data('data.listenerAdded')).toBe(true)
    expect(await page.data('data.listenerStatusText')).toBe('已注册')

    await target.tap()
    await page.waitFor(100)

    expect(await page.data('data.triggerCount')).toBe(1)
    expect(await page.data('data.lastEventType')).toBe('click')
    expect(await page.data('data.lastAction')).toBe('监听回调已执行')
  })

  it('does not register duplicate listener', async () => {
    await page.callMethod('add')
    await page.callMethod('add')

    expect(await page.data('data.lastAction')).toBe('监听已存在，无需重复注册')

    await target.tap()
    await page.waitFor(100)

    expect(await page.data('data.triggerCount')).toBe(1)
  })

  it('stops triggering after removeEventListener', async () => {
    await page.callMethod('add')
    await target.tap()
    await page.waitFor(100)
    expect(await page.data('data.triggerCount')).toBe(1)

    await page.callMethod('remove')
    expect(await page.data('data.listenerAdded')).toBe(false)
    expect(await page.data('data.listenerStatusText')).toBe('未注册')

    await target.tap()
    await page.waitFor(100)
    expect(await page.data('data.triggerCount')).toBe(1)
    expect(await page.data('data.lastAction')).toBe('已移除 click 监听')
  })
})
