const PAGE_PATH = '/pages/examples/set-custom-child-component-root-node-class/set-custom-child-component-root-node-class-options'
const PAGE_PATH_COMPOSITION = '/pages/examples/set-custom-child-component-root-node-class/set-custom-child-component-root-node-class-composition'

describe('自定义组件中使用 class 定制另一个自定义组件根节点样式', () => {
  let page

  it('set-custom-child-component-root-node-class-options Screenshot', async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    const image = await program.screenshot()
    expect(image).toSaveImageSnapshot()
  })

  it('set-custom-child-component-root-node-class-options Screenshot', async () => {
    page = await program.reLaunch(PAGE_PATH_COMPOSITION)
    await page.waitFor('view')
    const image = await program.screenshot()
    expect(image).toSaveImageSnapshot()
  })
})
