const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

const PAGE_PATH = '/pages/reactivity/advanced/shallow-readonly/shallow-readonly'

describe('shallowReadonly', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    let stateCount = await page.$('#state-count')
    expect(await stateCount.text()).toBe('0')

    let stateNestedCount = await page.$('#state-nested-count')
    expect(await stateNestedCount.text()).toBe('0')

    if (isMP || isWeb) {
      // web端操作readonly对象会直接失败，以下测试无法执行
      return
    }

    const incrementStateCountBtn = await page.$('#increment-state-count-btn')
    await incrementStateCountBtn.tap()

    const incrementStateNestedCountBtn = await page.$('#increment-state-nested-count-btn')
    await incrementStateNestedCountBtn.tap()

    expect(await stateCount.text()).toBe('0')
    expect(await stateNestedCount.text()).toBe('0')

    const updatePageRenderBtn = await page.$('#update-page-render-btn')
    await updatePageRenderBtn.tap()

    stateCount = await page.$('#state-count')
    expect(await stateCount.text()).toBe('0')
    stateNestedCount = await page.$('#state-nested-count')
    expect(await stateNestedCount.text()).toBe('1')
  })
})