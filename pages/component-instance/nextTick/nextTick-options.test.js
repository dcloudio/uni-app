const PAGE_PATH = '/pages/component-instance/nextTick/nextTick-options'

describe('$nextTick()', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isIOS = platformInfo.startsWith('ios')
  const isMP = platformInfo.startsWith('mp')
  if (isMP) {
    it("not support", async () => {
      expect(1).toBe(1);
    });
    return
  }
  
  let page
  it('$nextTick page', async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')

    let pageDataInfo = await page.data('dataInfo')
    expect(pageDataInfo.titleForCallback).toBe('default title for callback')
    expect(pageDataInfo.titleForPromise).toBe('default title for promise')

    const pageTestNextTickBtn = await page.$('#page-test-next-tick-btn')
    await pageTestNextTickBtn.tap()
    await page.waitFor(1000)

    pageDataInfo = await page.data('dataInfo')
    expect(pageDataInfo.beforeNextTickCallbackTitle).toBe('default title for callback')
    expect(pageDataInfo.afterNextTickCallbackTitle).toBe('new title for callback')
    expect(pageDataInfo.beforeNextTickPromiseTitle).toBe('default title for promise')
    expect(pageDataInfo.afterNextTickPromiseTitle).toBe('new title for promise')
  });

  it('$nextTick component', async () => {
    const childComponent = await page.$('#child-component')
    let childDataInfo = await childComponent.data('dataInfo')
    expect(childDataInfo.titleForCallback).toBe('default title for callback')
    expect(childDataInfo.titleForPromise).toBe('default title for promise')

    const childTestNextTickBtn = await page.$('#child-test-next-tick-btn')
    await childTestNextTickBtn.tap()
    await page.waitFor(1000)

    childDataInfo = await childComponent.data('dataInfo')
    expect(childDataInfo.beforeNextTickCallbackTitle).toBe('default title for callback')
    expect(childDataInfo.afterNextTickCallbackTitle).toBe('new title for callback')
    expect(childDataInfo.beforeNextTickPromiseTitle).toBe('default title for promise')
    expect(childDataInfo.afterNextTickPromiseTitle).toBe('new title for promise')
  });
})