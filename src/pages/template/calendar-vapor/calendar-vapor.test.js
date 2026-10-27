const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'
const isWeb = platformInfo.startsWith('web')
const PAGE_PATH = '/pages/template/calendar-vapor/calendar-vapor'

describe('calendar-vapor', () => {
  if (isWeb || !isVapor) {
    it('only support mini program or vapor', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  async function openPage() {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(300)
  }

  async function switchToMonth(year, month) {
    const value = `${year}-${month.toString().padStart(2, '0')}`
    await page.callMethod('jest_pickMonth', value)
    await page.waitFor(100)
    return await page.callMethod('jest_getState')
  }

  function getNextMonth(year, month) {
    if (month == 12) {
      return {
        year: year + 1,
        month: 1,
      }
    }
    return {
      year,
      month: month + 1,
    }
  }

  function getPrevMonth(year, month) {
    if (month == 1) {
      return {
        year: year - 1,
        month: 12,
      }
    }
    return {
      year,
      month: month - 1,
    }
  }

  beforeAll(async () => {
    await openPage()
  })

  afterAll(async () => {
    await openPage()
  })

  it('renders calendar layout', async () => {
    await openPage()

    const headerYear = await page.$('.header-year')
    const headerDate = await page.$('.header-date')
    const monthText = await page.$('.month-text')
    const weekdayTexts = await page.$$('.weekday-text')
    const dayTexts = await page.$$('.day-text')
    const state = await page.callMethod('jest_getState')

    expect(headerYear).not.toBeNull()
    expect(headerDate).not.toBeNull()
    expect(monthText).not.toBeNull()
    expect((await headerYear.text()).length).toBeGreaterThan(0)
    expect((await headerDate.text()).length).toBeGreaterThan(0)
    expect((await monthText.text()).length).toBeGreaterThan(0)
    expect(weekdayTexts.length).toBe(7)
    expect(dayTexts.length).toBeGreaterThan(0)
    expect(state.swiperItemCount).toBe(3)
    expect(state.visibleDayCount).toBeGreaterThanOrEqual(28)
    expect(state.visibleDayCount).toBeLessThanOrEqual(31)
    expect(state.selectedDayCount).toBe(1)
  })

  it('updates selected date when choosing different days', async () => {
    await openPage()

    let changed = await page.callMethod('jest_selectDay', 15)
    await page.waitFor(100)

    let state = await page.callMethod('jest_getState')
    let headerDate = await page.$('.header-date')

    expect(changed).toBe(true)
    expect(state.selectedDate).not.toBeNull()
    expect(state.selectedDay).toBe(15)
    expect(state.selectedDayCount).toBe(1)
    expect(state.selectedMonth).toBe(state.currentMonth)
    expect(state.selectedDate.endsWith('-15')).toBe(true)
    expect(await headerDate.text()).toContain('15日')

    changed = await page.callMethod('jest_selectDay', 20)
    await page.waitFor(100)

    state = await page.callMethod('jest_getState')
    headerDate = await page.$('.header-date')

    expect(changed).toBe(true)
    expect(state.selectedDay).toBe(20)
    expect(state.selectedDayCount).toBe(1)
    expect(state.selectedDate.endsWith('-20')).toBe(true)
    expect(await headerDate.text()).toContain('20日')
  })

  it('switches month with arrow actions and updates header text', async () => {
    await openPage()

    const initialState = await page.callMethod('jest_getState')
    const expectedNext = getNextMonth(initialState.currentYear, initialState.currentMonth)

    await page.callMethod('nextMonth')
    await page.waitFor(100)

    let state = await page.callMethod('jest_getState')
    let monthText = await page.$('.month-text')

    expect(state.currentYear).toBe(expectedNext.year)
    expect(state.currentMonth).toBe(expectedNext.month)
    expect(await monthText.text()).toBe(`${expectedNext.year}年${expectedNext.month}月`)
    expect(state.visibleDayCount).toBeGreaterThanOrEqual(28)
    expect(state.visibleDayCount).toBeLessThanOrEqual(31)

    const expectedPrev = getPrevMonth(state.currentYear, state.currentMonth)
    await page.callMethod('prevMonth')
    await page.waitFor(100)

    state = await page.callMethod('jest_getState')
    monthText = await page.$('.month-text')

    expect(state.currentYear).toBe(expectedPrev.year)
    expect(state.currentMonth).toBe(expectedPrev.month)
    expect(state.currentYear).toBe(initialState.currentYear)
    expect(state.currentMonth).toBe(initialState.currentMonth)
    expect(await monthText.text()).toBe(`${initialState.currentYear}年${initialState.currentMonth}月`)
  })

  it('switches across year boundaries when month changes', async () => {
    await openPage()

    let state = await switchToMonth(2025, 12)
    let monthText = await page.$('.month-text')

    expect(state.currentYear).toBe(2025)
    expect(state.currentMonth).toBe(12)
    expect(await monthText.text()).toBe('2025年12月')

    await page.callMethod('nextMonth')
    await page.waitFor(100)

    state = await page.callMethod('jest_getState')
    monthText = await page.$('.month-text')

    expect(state.currentYear).toBe(2026)
    expect(state.currentMonth).toBe(1)
    expect(await monthText.text()).toBe('2026年1月')

    await page.callMethod('prevMonth')
    await page.waitFor(100)

    state = await page.callMethod('jest_getState')
    monthText = await page.$('.month-text')

    expect(state.currentYear).toBe(2025)
    expect(state.currentMonth).toBe(12)
    expect(await monthText.text()).toBe('2025年12月')
  })

  it('switches to target year and keeps date selection available', async () => {
    await openPage()

    const initialState = await page.callMethod('jest_getState')
    const targetYear = initialState.currentYear + 1
    const targetMonth = initialState.currentMonth == 12 ? 6 : initialState.currentMonth + 1
    const targetDay = initialState.selectedDay == 10 ? 11 : 10

    let state = await switchToMonth(targetYear, targetMonth)
    let monthText = await page.$('.month-text')
    let headerYear = await page.$('.header-year')
    let headerDate = await page.$('.header-date')

    expect(state.currentYear).toBe(targetYear)
    expect(state.currentMonth).toBe(targetMonth)
    expect(await monthText.text()).toBe(`${targetYear}年${targetMonth}月`)
    expect(state.visibleDayCount).toBeGreaterThanOrEqual(28)
    expect(await headerYear.text()).not.toContain(`${targetYear}年`)
    expect(await headerDate.text()).not.toContain(`${targetDay}日`)

    const changed = await page.callMethod('jest_selectDay', targetDay)
    await page.waitFor(100)

    state = await page.callMethod('jest_getState')
    headerYear = await page.$('.header-year')
    headerDate = await page.$('.header-date')

    expect(changed).toBe(true)
    expect(state.selectedYear).toBe(targetYear)
    expect(state.selectedMonth).toBe(targetMonth)
    expect(state.selectedDay).toBe(targetDay)
    expect(state.selectedDayCount).toBe(1)
    expect(state.selectedDate).toBe(`${targetYear}-${targetMonth.toString().padStart(2, '0')}-${targetDay.toString().padStart(2, '0')}`)
    expect(await headerYear.text()).toContain(`${targetYear}年`)
    expect(await headerDate.text()).toContain(`${targetDay}日`)

    state = await switchToMonth(initialState.currentYear - 1, targetMonth)
    monthText = await page.$('.month-text')

    expect(state.currentYear).toBe(initialState.currentYear - 1)
    expect(state.currentMonth).toBe(targetMonth)
    expect(await monthText.text()).toBe(`${initialState.currentYear - 1}年${targetMonth}月`)
  })
})
