const PAGE_OPTIONS = '/pages/examples/nested-component-communication/nested-component-communication-options'
const PAGE_COMPOSITION = '/pages/examples/nested-component-communication/nested-component-communication-composition'

describe('built-in/component', () => {
  let page
  const test = async () => {
    await page.waitFor('view')
    expect.assertions(12)
    const parentMsgElement = await page.$('.parent-msg')
    const childMsgElement = await page.$('.child-msg')
    const grandChildElement = await page.$('.grandchild-msg')

    const parentBtn = await page.$('.parent-btn')
    const grandChildBtn = await page.$('.grandchild-btn')

    expect(await parentMsgElement.text()).toEqual('0')
    expect(await childMsgElement.text()).toEqual('0')
    expect(await grandChildElement.text()).toEqual('0')

    await parentBtn.tap()
    await page.waitFor(500)

    expect(await parentMsgElement.text()).toEqual('1')
    expect(await childMsgElement.text()).toEqual('1')
    expect(await grandChildElement.text()).toEqual('1')

    await parentBtn.tap()
    await page.waitFor(500)

    expect(await parentMsgElement.text()).toEqual('2')
    expect(await childMsgElement.text()).toEqual('2')
    expect(await grandChildElement.text()).toEqual('2')

    await grandChildBtn.tap()
    await page.waitFor(500)

    expect(await parentMsgElement.text()).toEqual('0')
    expect(await childMsgElement.text()).toEqual('0')
    expect(await grandChildElement.text()).toEqual('0')
  }
  it('nested-component-communication Options API', async () => {
    page = await program.reLaunch(PAGE_OPTIONS)
    await test()
  })
  it('nested-component-communication Composition API', async () => {
    page = await program.reLaunch(PAGE_COMPOSITION)
    await test()
  })
})
