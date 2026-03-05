const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
let page;
describe('movable-view.uvue', () => {
  if (!isWeb) {
    it('app', () => {
      expect(1).toBe(1)
    })
    return
  }
  it('移动至 (30px, 30px)', async () => {
    page = await program.reLaunch('/pages/component/movable-view/movable-view')
    await page.waitFor('view');
    expect((await page.data('x'))._value).toBe(0)
    expect((await page.data('y'))._value).toBe(0)
    await page.callMethod('tap')
    await page.waitFor(500);
    expect((await page.data('x'))._value).toBe(30)
    expect((await page.data('y'))._value).toBe(30)
  })
  it('放大3倍', async () => {
    expect((await page.data('scale'))._value).toBe(2)
    await page.callMethod('tap2')
    await page.waitFor(500);
    expect((await page.data('scale'))._value).toBe(3)
  })
})
