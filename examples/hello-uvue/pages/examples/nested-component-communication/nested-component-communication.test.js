const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_OPTIONS = '/pages/examples/nested-component-communication/nested-component-communication-options'
const PAGE_COMPOSITION = '/pages/examples/nested-component-communication/nested-component-communication-composition'

describe('built-in/component', () => {
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    expect.assertions(12)
    const child = await page.$('.nested-child')
    const grandChild = await child.$('.nested-grand-child')
    const parentMsgElement = await page.$('.parent-msg')
    const childMsgElement = await child.$('.child-msg')
    const grandChildElement = await grandChild.$('.grandchild-msg')

    const parentBtn = await page.$('.parent-btn')
    const grandChildBtn = await grandChild.$('.grandchild-btn')

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
  if (!isDom2) {
    it('nested-component-communication Options API', async () => {
      await test(PAGE_OPTIONS)
    })
  }
  it('nested-component-communication Composition API', async () => {
    await test(PAGE_COMPOSITION)
  })
})
