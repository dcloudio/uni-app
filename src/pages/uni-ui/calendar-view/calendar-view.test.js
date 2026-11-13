const PAGE_PATH = '/pages/uni-ui/calendar-view/calendar-view'
const BASIC = '.test-basic-calendar-wrap'
const WEEK = '.test-weekStart-calendar-wrap'
const platform = (process.env.uniTestPlatformInfo || '').toLowerCase()
const isWeb = platform.startsWith('web') || platform.startsWith('h5')
const isMiniProgram = platform.startsWith('mp')

describe('calendar-view basic', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(BASIC, 10000)
  })

  async function elements(wrapperSelector, selector) {
    if (isWeb) return await page.$$(`${wrapperSelector} ${selector}`)
    const wrapper = await page.$(wrapperSelector)
    expect(wrapper).not.toBeNull()
    // 小程序需进入自定义组件边界；App 直接查询原生子节点。
    if (!isMiniProgram) return await wrapper.$$(selector)
    const calendar = await wrapper.$('uni-calendar-view')
    expect(calendar).not.toBeNull()
    return await calendar.$$(selector)
  }

  async function setData(values) {
    await page.setData({ data: { ...(await page.data('data')), ...values } })
    // 修改月份会重建日期节点，等 swiper 更新完成后再读取。
    await page.waitFor(500)
  }

  async function expectSelected(day) {
    await page.waitFor(async () => {
      const selected = await elements(BASIC, '.day-selected')
      return selected.length === 1 && await selected[0].text() === String(day)
    }, 10000)
  }

  async function waitForMonthEvent(month) {
    await page.waitFor(async () => await page.data('data.lastEvent') === `month-change：${month}`, 10000)
    await page.waitFor(500)
  }

  async function weekdays() {
    const nodes = await elements(WEEK, '.week-item')
    return await Promise.all(nodes.map(node => node.text()))
  }

  it('renders the initial selection and today', async () => {
    const date = await page.data('data.basicDate')
    const day = Number(date.slice(8))
    await expectSelected(day)
    const today = await elements(BASIC, '.day-today')
    expect(today.length).toBe(1)
    expect(await today[0].text()).toBe(String(day))
  })

  it('updates selection when the bound date changes', async () => {
    await setData({ basicDate: '2028-02-15' })
    await expectSelected(15)
    await setData({ basicDate: '2028-03-01' })
    await expectSelected(1)
    await waitForMonthEvent('2028-03')
    expect(await page.data('data.basicDate')).toBe('2028-03-01')
  })

  it('clears selection when the bound date is empty', async () => {
    await setData({ basicDate: '', lastEvent: '暂无事件' })
    await page.waitFor(async () => (await elements(BASIC, '.day-selected')).length === 0, 10000)
    expect(await page.data('data.basicDate')).toBe('')
    expect(await page.data('data.lastEvent')).toBe('暂无事件')
  })

  it('changes months with arrows and preserves the selected date', async () => {
    const year = Number((await page.data('data.basicDate')).slice(0, 4)) + 1
    const date = `${year}-12-15`
    await setData({ basicDate: date })
    await waitForMonthEvent(`${year}-12`)
    await program.callUniMethod('pageScrollTo', { selector: BASIC, duration: 0 })
    await page.waitFor(200)
    const arrows = await elements(BASIC, '.year-month-arrow')
    expect(arrows.length).toBe(2)
    await arrows[1].tap()
    await waitForMonthEvent(`${year + 1}-01`)
    expect(await page.data('data.basicDate')).toBe(date)
    await arrows[0].tap()
    await waitForMonthEvent(`${year}-12`)
    await expectSelected(15)
  })

  it('changes the weekday order when week-start changes', async () => {
    await setData({ weekStartMode: 0 })
    const sundayFirst = await weekdays()
    expect(sundayFirst.length).toBe(7)
    const mondayFirst = [...sundayFirst.slice(1), sundayFirst[0]]
    await setData({ weekStartMode: 1 })
    await page.waitFor(async () => JSON.stringify(await weekdays()) === JSON.stringify(mondayFirst), 10000)
    expect(await weekdays()).toEqual(mondayFirst)
  })

  // 保存初始页面截图，供各平台人工对照布局。
  it('saves the initial page snapshot', async () => {
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })
})
