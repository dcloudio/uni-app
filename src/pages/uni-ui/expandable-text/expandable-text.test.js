const PAGE_PATH = '/pages/uni-ui/expandable-text/expandable-text'
const CUSTOM_TRIGGER = '.custom-trigger-bold'
const DEFAULT_TRIGGER = '.test-default-trigger'
const SHORT_TEXT = 'uni-app x 蒸汽模式。'
const LONG_TEXT = SHORT_TEXT + SHORT_TEXT

describe('expandable-text', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('.expandable-text-node')
    await page.waitFor(1000)
  })

  async function screenshot(name) {
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return `expandable-text-${name}`
      }
    })
  }

  async function tapTrigger(selector) {
    const trigger = await page.$(selector)
    expect(trigger).not.toBeNull()
    await trigger.tap()
    await page.waitFor(500)
  }

  async function tapButton(index) {
    // 示例按钮依次为：缩短文字、缩小默认组件、加宽自定义组件、重置。
    const buttons = await page.$$('button')
    expect(buttons.length).toBe(4)
    await buttons[index].tap()
    await page.waitFor(500)
  }

  async function expectCustomTrigger(expanded) {
    const trigger = await page.$(CUSTOM_TRIGGER)
    expect(trigger).not.toBeNull()
    expect(await trigger.text()).toBe(expanded ? '自定义收起文字' : '展开')
  }

  async function prepareCustomState(state) {
    await expectCustomTrigger(false)
    if (state === 'expanded') {
      await tapTrigger(CUSTOM_TRIGGER)
    }
    await expectCustomTrigger(state === 'expanded')
  }

  async function getDefaultTextSize() {
    const text = await page.$('.test-default-text')
    expect(text).not.toBeNull()
    return await text.size()
  }

  it('initial collapsed snapshot', async () => {
    await expectCustomTrigger(false)
    await screenshot('initial-collapsed')
  })

  it('single line expands and collapses', async () => {
    const selector = '.test-single-line-trigger'
    const collapsedLabel = await (await page.$(selector)).text()

    await tapTrigger(selector)
    expect(await (await page.$(selector)).text()).not.toBe(collapsedLabel)

    await tapTrigger(selector)
    expect(await (await page.$(selector)).text()).toBe(collapsedLabel)
  })

  it('custom text expands and collapses', async () => {
    await expectCustomTrigger(false)

    await tapTrigger(CUSTOM_TRIGGER)
    await expectCustomTrigger(true)
    await screenshot('custom-expanded')

    await tapTrigger(CUSTOM_TRIGGER)
    await expectCustomTrigger(false)
    await screenshot('custom-collapsed-again')
  })

  it('hides the collapse trigger when show-collapse is false', async () => {
    const selector = '.test-no-collapse-trigger'
    expect(await page.$(selector)).not.toBeNull()

    await tapTrigger(selector)
    expect(await page.$(selector)).toBeNull()
  })

  it.each(['collapsed', 'expanded'])('changes text from %s state', async (state) => {
    await prepareCustomState(state)

    await tapButton(0)
    expect(await page.data('data.articleText')).toBe(SHORT_TEXT)
    expect(await page.$(CUSTOM_TRIGGER)).toBeNull()
    await screenshot(`text-${state}-shortened`)

    await tapButton(3)
    expect(await page.data('data.articleText')).toBe(LONG_TEXT)
    await expectCustomTrigger(false)
  })

  it.each(['collapsed', 'expanded'])('widens the container from %s state', async (state) => {
    await prepareCustomState(state)
    const before = await (await page.$('.custom-text')).size()

    await tapButton(2)
    const widened = await (await page.$('.custom-text')).size()
    expect(widened.width).toBeGreaterThan(before.width)
    expect(await page.$(CUSTOM_TRIGGER)).toBeNull()
    await screenshot(`widen-${state}-after`)

    await tapButton(3)
    expect((await (await page.$('.custom-text')).size()).width).toBeCloseTo(before.width, 0)
    await expectCustomTrigger(false)
  })

  it.each(['collapsed', 'expanded'])('narrows the container from %s state', async (state) => {
    // 固定初始宽度，确保桌面大窗口也能先展开默认组件，再点击示例的缩小按钮。
    await page.setData({
      data: {
        ...(await page.data('data')),
        dynamicStyle: 'width: 180px'
      }
    })
    await page.waitFor(500)
    const collapsedLabel = await (await page.$(DEFAULT_TRIGGER)).text()
    const before = await getDefaultTextSize()
    if (state === 'expanded') {
      await tapTrigger(DEFAULT_TRIGGER)
      expect(await (await page.$(DEFAULT_TRIGGER)).text()).not.toBe(collapsedLabel)
      expect((await getDefaultTextSize()).height).toBeGreaterThan(before.height)
    }

    await tapButton(1)
    const narrowed = await getDefaultTextSize()
    expect(narrowed.width).toBeLessThan(before.width)
    expect(await (await page.$(DEFAULT_TRIGGER)).text()).toBe(collapsedLabel)
    await screenshot(`narrow-${state}-after`)

    await tapTrigger(DEFAULT_TRIGGER)
    expect((await getDefaultTextSize()).height).toBeGreaterThan(narrowed.height)

    await tapTrigger(DEFAULT_TRIGGER)
    expect(await (await page.$(DEFAULT_TRIGGER)).text()).toBe(collapsedLabel)
  })
})
