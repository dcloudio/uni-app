const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const OPTIONS_PAGE_PATH = '/pages/reactivity/core/computed/computed-options'
const COMPOSITION_PAGE_PATH = '/pages/reactivity/core/computed/computed-composition'

describe('computed', () => {
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    const count = await page.$('#count')
    expect(await count.text()).toBe('0')
    const doubleCount = await page.$('#double-count')
    expect(await doubleCount.text()).toBe('0')
    const tripleCount = await page.$('#triple-count')
    expect(await tripleCount.text()).toBe('0')

    const objArr = await page.$('#obj-arr')
    expect(await objArr.text()).toBe('[1,2,3]')
    const objArrLen = await page.$('#obj-arr-len')
    expect(await objArrLen.text()).toBe('3')
    
    const computedWithArgument = await page.$('#computed-with-argument')
    expect(await computedWithArgument.text()).toBe('审核中')

    const updateBtn = await page.$('#update-btn')
    await updateBtn.tap()
    await page.waitFor(500)

    expect(await count.text()).toBe('1')
    expect(await doubleCount.text()).toBe('2')
    expect(await tripleCount.text()).toBe('3')
    expect(await objArr.text()).toBe('[1,2,3,4]')
    expect(await objArrLen.text()).toBe('4')
  }
  
  if (!isDom2) {
    it('computed options API', async () => {
      await test(OPTIONS_PAGE_PATH)
    })
  }
  
  it('computed composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})