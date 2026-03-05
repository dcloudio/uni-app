const OPTIONS_PAGE_PATH = '/pages/component-instance/root/root-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/root/root-composition'

describe('$root', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  if (isWeb) {
    // TODO: web 端 $root 指向和 app 端不同，具体待定
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(1000)
    
    const rootStrParent = await page.$('#root-str-parent')
    expect(await rootStrParent.text()).toBe('root component str')
    
    const rootStrChild = await page.$('#root-str-child')
    expect(await rootStrChild.text()).toBe('root component str')
  }

  it('$root 选项式 API', async () => {
    await test(OPTIONS_PAGE_PATH)
  });
  
  it('$root 组合式 API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
