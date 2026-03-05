const OPTIONS_PAGE_PATH = '/pages/component-instance/data/data-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/data/data-composition'

describe('$data', () => {
  let page
  const test = async (page) => {
    const str = await page.$('#str')
    expect(await str.text()).toBe('default str')

    const num = await page.$('#num')
    expect(await num.text()).toBe('0')

    const arr = await page.$('#arr')
    expect(await arr.text()).toBe('1,2,3')

    const objStr = await page.$('#obj-str')
    expect(await objStr.text()).toBe('default obj.str')

    const objNum = await page.$('#obj-num')
    expect(await objNum.text()).toBe('10')

    const objArr = await page.$('#obj-arr')
    expect(await objArr.text()).toBe('4,5,6')

    const elementIsSame = await page.$('#isSameRefText')
    expect(await elementIsSame.text()).toBe('false')
    await page.callMethod('updateData')

    expect(await str.text()).toBe('new str')
    expect(await num.text()).toBe('1')
    expect(await arr.text()).toBe('4,5,6')
    expect(await objStr.text()).toBe('new obj.str')
    expect(await objNum.text()).toBe('100')
    expect(await objArr.text()).toBe('7,8,9')
    expect(await elementIsSame.text()).toBe('true')
  }

  it('$data 选项式 API', async () => {
    page = await program.reLaunch(OPTIONS_PAGE_PATH)
    await page.waitFor('view')

    await test(page)
  });

  it('data 组合式 API', async () => {
    page = await program.reLaunch(COMPOSITION_PAGE_PATH)
    await page.waitFor('view')

    await test(page)
  })
})
