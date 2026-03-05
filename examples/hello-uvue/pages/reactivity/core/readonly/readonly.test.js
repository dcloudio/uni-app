const PAGE_PATH = '/pages/reactivity/core/readonly/readonly'

describe('ref', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const dataStr = await page.$('#data-str')
    expect(await dataStr.text()).toBe('default str')
    const dataNum = await page.$('#data-num')
    expect(await dataNum.text()).toBe('0')
    const dataArr = await page.$('#data-arr')
    expect(await dataArr.text()).toBe('["a","b","c"]')

    const readonlyDataStr = await page.$('#readonly-data-str')
    expect(await readonlyDataStr.text()).toBe('default str')
    const readonlyDataNum = await page.$('#readonly-data-num')
    expect(await readonlyDataNum.text()).toBe('0')
    const readonlyDataArr = await page.$('#readonly-data-arr')
    expect(await readonlyDataArr.text()).toBe('["a","b","c"]')

    const updateDataBtn = await page.$('#update-data-btn')
    await updateDataBtn.tap()
    await page.waitFor(500)

    expect(await dataStr.text()).toBe('new str')
    expect(await dataNum.text()).toBe('1')
    expect(await dataArr.text()).toBe('["a","b","c","d"]')
    expect(await readonlyDataStr.text()).toBe('new str')
    expect(await readonlyDataNum.text()).toBe('1')
    expect(await readonlyDataArr.text()).toBe('["a","b","c","d"]')

    const updateReadonlyDataBtn = await page.$('#update-readonly-data-btn')
    await updateReadonlyDataBtn.tap()

    expect(await dataStr.text()).toBe('new str')
    expect(await dataNum.text()).toBe('1')
    expect(await dataArr.text()).toBe('["a","b","c","d"]')
    expect(await readonlyDataStr.text()).toBe('new str')
    expect(await readonlyDataNum.text()).toBe('1')
    expect(await readonlyDataArr.text()).toBe('["a","b","c","d"]')
  })
})