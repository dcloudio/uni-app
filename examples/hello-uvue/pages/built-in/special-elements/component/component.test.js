const PAGE_OPTIONS = '/pages/built-in/special-elements/component/component-options'
const PAGE_COMPOSITION = '/pages/built-in/special-elements/component/component-composition'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.includes('android')
const isIOS = platformInfo.includes('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('built-in/component', () => {
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    const isOptionsPage = pagePath.indexOf('component-options') !== -1
    let fooList = await page.$$('.component-foo')
    expect(fooList.length).toBe(isOptionsPage ? 2 : 1)
    expect(await fooList[0].text()).toBe('this is component Foo')
    if (isOptionsPage) {
      expect(await fooList[1].text()).toBe('this is component Foo')
    }

    let barList = await page.$$('.component-bar')
    expect(barList.length).toBe(0)

    await page.callMethod('changeCurrentComponent')

    fooList = await page.$$('.component-foo')
    expect(fooList.length).toBe(0)

    barList = await page.$$('.component-bar')
    expect(barList.length).toBe(isOptionsPage ? 2 : 1)
    expect(await barList[0].text()).toBe('this is component Bar')
    if (isOptionsPage) {
      expect(await barList[1].text()).toBe('this is component Bar')
    }
    // web 端自动化测试，无法获取非 uni 元素
    if (!isWeb) {
      const myInput = await page.$('#my-input')
      expect(await myInput.property('value')).toBe('default value')
    }
  }
  it('component Options API', async () => {
    await test(PAGE_OPTIONS)
  })
  it('component Composition API', async () => {
    await test(PAGE_COMPOSITION)
  })
});