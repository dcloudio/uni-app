const PAGE_PATH = '/pages/reactivity/core/ref/ref'

describe('ref', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const count = await page.$('#count')
    expect(await count.text()).toBe('0')
    const str = await page.$('#str')
    expect(await str.text()).toBe('default str')
    const bool = await page.$('#bool')
    expect(await bool.text()).toBe('false')
    const arr = await page.$('#arr')
    expect(await arr.text()).toBe('[1,2,3]')
    const counterCount = await page.$('#counter-count')
    expect(await counterCount.text()).toBe('0')
    const countersCount = await page.$('#counters-count')
    expect(await countersCount.text()).toBe('0')

    const changeCountBtn = await page.$('#change-count-btn')
    await changeCountBtn.tap()
    await page.waitFor(500)
    expect(await count.text()).toBe('1')

    const changeStrBtn = await page.$('#change-str-btn')
    await changeStrBtn.tap()
    await page.waitFor(500)
    expect(await str.text()).toBe('new str')

    const changeBoolBtn = await page.$('#change-bool-btn')
    await changeBoolBtn.tap()
    await page.waitFor(500)
    expect(await bool.text()).toBe('true')

    const changeArrBtn = await page.$('#change-arr-btn')
    await changeArrBtn.tap()
    await page.waitFor(500)
    expect(await arr.text()).toBe('[1,2,3,4]')

    const changeCounterBtn = await page.$('#change-counter-btn')
    await changeCounterBtn.tap()
    await page.waitFor(500)
    expect(await counterCount.text()).toBe('1')
    
    const changeCountersBtn = await page.$('#change-counters-btn')
    await changeCountersBtn.tap()
    await page.waitFor(500)
    expect(await countersCount.text()).toBe('1')
    
    const issue15557Text = await page.$('#issue-15557')
    expect(await issue15557Text.text()).toBe('2')
    
    const issue20323Text1 = await page.$('#issue-20323-1')
    expect(await issue20323Text1.text()).toBe('abc')
    const issue20323Text2 = await page.$('#issue-20323-2')
    expect(await issue20323Text2.text()).toBe('abc')
	
    const refStrId = await page.$('#ref-str-id')
    expect(await refStrId.text()).toBe('1')
    
    const refStrBoolean = await page.$('#ref-str-boolean')
    expect(await refStrBoolean.text()).toBe('false')
    
    const refStrAny = await page.$('#ref-str-any')
    expect(await refStrAny.text()).toBe('1')
    
    const refStrArr = await page.$('#ref-str-arr')
    expect(await refStrArr.text()).toBe('1')
    
    const refStrJson = await page.$('#ref-str-json')
    expect(await refStrJson.text()).toBe('car1')
    
    const refSt = await page.$('#ref-str')
    expect(await refStrId.text()).toBe('1')
  })
})