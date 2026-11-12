const PAGE_PATH = '/pages/uni-ui/data-vertical-marquee/data-vertical-marquee'
const LONG_NOTICE = '超长公告内容。忽略换行符。\n超长公告内容。超长公告内容。超长公告内容。超长公告内容。'
const TEXT_SELECTOR = '.uni-data-vertical-marquee__text'
const platformInfo = (process.env.uniTestPlatformInfo || '').toLowerCase()
const isWeb = platformInfo.startsWith('web') || platformInfo.startsWith('h5')

describe('data-vertical-marquee', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('.test-notice-marquee')
  })

  async function getTexts(selector) {
    const marquee = await page.$(selector)
    expect(marquee).not.toBeNull()
    // Web 的 element.$$ 未限定到当前组件，使用完整选择器避免取到整页文字。
    // 小程序不能跨组件查询，App 和小程序继续在组件内部查找。
    const texts = isWeb
      ? await page.$$(`${selector} ${TEXT_SELECTOR}`)
      : await marquee.$$(TEXT_SELECTOR)
    expect(texts.length).toBe(2)
    return texts
  }

  async function scrollToMarquee(selector) {
    await program.callUniMethod('pageScrollTo', { selector, duration: 0 })
    await page.waitFor(200)
  }

  async function currentText(selector) {
    return await (await getTexts(selector))[0].text()
  }

  // 通过 defineExpose 导出的 reactive data 更新数据后，应同步更新组件展示。
  it('updates rendered content through exposed reactive data', async () => {
    const data = await page.data('data')
    expect(data.intervalValue).toBe(3000)
    expect(data.latestClick).toBe('未点击')
    expect(data.dynamicList).toEqual([{ text: '初始公告 1', value: 'd1' }])

    await page.setData({
      data: {
        ...data,
        singleList: [{ text: '更新后的单条公告', value: 'updated' }]
      }
    })
    await page.waitFor(async () => (await currentText('.test-single-marquee')) === '更新后的单条公告')
    expect(await page.data('data.singleList')).toEqual([{ text: '更新后的单条公告', value: 'updated' }])
  })

  // 长公告和下一条短公告应保持相同行高，避免微信端换行后重叠。
  it('keeps long notices on one line', async () => {
    const texts = await getTexts('.test-notice-marquee')
    const displayedText = (await texts[0].text()).replace(/\uFEFF/g, '').replace(/[\r\n]+/g, ' ')
    const expectedText = LONG_NOTICE.replace(/\n/g, ' ')
    // Android 的 text() 可能返回省略后的文字及 FEFF 填充，校验可见前缀。
    if (platformInfo.startsWith('android') && displayedText.endsWith('…')) {
      const prefix = displayedText.slice(0, -1)
      expect(prefix.length).toBeGreaterThan(0)
      expect(prefix.length).toBeLessThan(expectedText.length)
      expect(expectedText.startsWith(prefix)).toBe(true)
    } else {
      expect(displayedText).toBe(expectedText)
    }
    expect(await texts[1].text()).toBe('数据驱动的上下滚动文字组件')

    const currentSize = await texts[0].size()
    const nextSize = await texts[1].size()
    expect(currentSize.height).toBeGreaterThan(0)
    expect(currentSize.height).toBeCloseTo(nextSize.height, 0)
    expect(currentSize.width).toBeCloseTo(nextSize.width, 0)
  })

  // 点击对象数组公告时，应回传索引和含原始换行符的文字。
  it('returns the original object text on click', async () => {
    const texts = await getTexts('.test-notice-marquee')
    await texts[0].tap()
    await page.waitFor(async () => (await page.data('data.latestClick')) !== '未点击')
    expect(await page.data('data.latestClick')).toBe(`index=0, text=${LONG_NOTICE}`)
  })

  // 字符串数组应直接展示文字，点击时回传原始字符串。
  it('renders and clicks string data', async () => {
    await scrollToMarquee('.test-string-marquee')
    const texts = await getTexts('.test-string-marquee')
    expect(await texts[0].text()).toBe('公告：系统将于今晚 23:00 维护')
    expect(await texts[1].text()).toBe('公告：新增暗黑模式支持')
    await texts[0].tap()
    await page.waitFor(async () => (await page.data('data.latestClick')) !== '未点击')
    expect(await page.data('data.latestClick')).toBe('index=0, text=公告：系统将于今晚 23:00 维护')
  })

  // 自动轮播结束后，change 事件应更新搜索框当前推荐词。
  it('updates the search word after scrolling', async () => {
    await scrollToMarquee('.test-search-marquee')
    expect(await page.data('data.currentSearchWord')).toBe('搜索热词1')
    await page.waitFor(async () => (await page.data('data.currentSearchWord')) === '搜索热词2')
    expect(await currentText('.test-search-marquee')).toBe('搜索热词2')
  })

  // 修改间隔后应加快轮播，再切至较长间隔时不再沿用原来的定时器。
  it('applies interval changes immediately', async () => {
    await scrollToMarquee('.test-interval-marquee')
    await page.callMethod('setInterval1000')
    expect(await page.data('data.intervalValue')).toBe(1000)
    await page.waitFor(async () => (await currentText('.test-interval-marquee')) === '数据驱动的上下滚动文字组件')

    await page.callMethod('setInterval5000')
    expect(await page.data('data.intervalValue')).toBe(5000)
    await page.waitFor(2200)
    expect(await currentText('.test-interval-marquee')).toBe('数据驱动的上下滚动文字组件')

    await page.callMethod('setInterval2000')
    expect(await page.data('data.intervalValue')).toBe(2000)
    await page.waitFor(async () => (await currentText('.test-interval-marquee')) === '支持对象数组与字符串数组')
  })

  // 单条和空数据经过一个完整轮播周期后，展示内容应保持不变。
  it('does not scroll single or empty data', async () => {
    const single = await getTexts('.test-single-marquee')
    const empty = await getTexts('.test-empty-marquee')
    expect(await single[0].text()).toBe('只有一条数据，不会上下滚动')
    expect(await single[1].text()).toBe('')
    expect(await empty[0].text()).toBe('')
    expect(await empty[1].text()).toBe('')

    await page.waitFor(3800)
    expect(await currentText('.test-single-marquee')).toBe('只有一条数据，不会上下滚动')
    expect(await currentText('.test-empty-marquee')).toBe('')
  })

  // 从单条增至多条应开始轮播，删回单条后复位并停止，删空后清空文字。
  it('starts and stops scrolling when data changes', async () => {
    await scrollToMarquee('.test-dynamic-marquee')
    expect(await currentText('.test-dynamic-marquee')).toBe('初始公告 1')
    await page.callMethod('addDynamicItem')
    await page.waitFor(async () => (await currentText('.test-dynamic-marquee')) === '新增公告 2')
    expect((await page.data('data.dynamicList')).length).toBe(2)

    await page.callMethod('removeDynamicItem')
    await page.waitFor(async () => (await currentText('.test-dynamic-marquee')) === '初始公告 1')
    expect((await page.data('data.dynamicList')).length).toBe(1)
    await page.waitFor(3800)
    expect(await currentText('.test-dynamic-marquee')).toBe('初始公告 1')
    expect(await (await getTexts('.test-dynamic-marquee'))[1].text()).toBe('')

    await page.callMethod('removeDynamicItem')
    await page.waitFor(async () => (await currentText('.test-dynamic-marquee')) === '')
    expect(await page.data('data.dynamicList')).toEqual([])
    expect(await (await getTexts('.test-dynamic-marquee'))[1].text()).toBe('')

    await page.callMethod('addDynamicItem')
    await page.waitFor(async () => (await currentText('.test-dynamic-marquee')) === '新增公告 3')
  })

  // 保存公告、搜索框及各属性示例的整页截图，供各平台对照布局。
  it('saves the initial page snapshot', async () => {
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })
})
