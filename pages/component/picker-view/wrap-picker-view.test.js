const PAGE_PATH = '/pages/component/picker-view/wrap-picker-view'
let page;

describe('wrap-picker-view', () => {
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  // 此测试用例单独项目进行测试
  it.skip('not crash', async () => {
    // 测试应用正常渲染，可以正常查询元素不会崩溃丢失
    const element = await page.$('.btn_toggle')
    await element.tap()
    await page.waitFor(1000)
    const childExits = await page.$('.btn_toggle')
    expect(!!childExits).toBe(true)
  })
})
