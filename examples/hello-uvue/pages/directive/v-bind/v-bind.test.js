const OPTIONS_PAGE_PATH = '/pages/directive/v-bind/v-bind-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-bind/v-bind-composition'

describe('v-bind', () => {
  let page
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isMP = platformInfo.startsWith('mp')
  const isWebOrMP = isWeb || isMP
  const isIOS = platformInfo.includes('ios')
  const isAndroid = platformInfo.includes('android')
  const isApp = isIOS || isAndroid
  const isFirefox = platformInfo.indexOf('firefox') > -1
  const isFirefoxOrApp = isFirefox || isApp

  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(1000)

    const disabledBtn = await page.$('#disabled-btn')
    expect((await disabledBtn.property('disabled')).toString()).toBe('true')

    const vBindDisabledBtn = await page.$('#v-bind-disabled-btn')
    expect((await vBindDisabledBtn.property('disabled')).toString()).toBe('false')

    const dataInfo = await page.data('dataInfo')

    const bindObjectStyle = await page.$('#bind-object-style')
    expect(await bindObjectStyle.style('fontSize')).toBe(dataInfo.fontSize)

    const bindArrayStyle = await page.$('#bind-array-style')
    if (isWeb || isMP) {
      expect(await bindArrayStyle.style('backgroundColor')).toBe('rgb(0, 128, 0)')
    } else {
      expect(await bindArrayStyle.style('backgroundColor')).toBe(dataInfo.backgroundColor.replace(
        'background-color:', '').trim())
    }
    const borderStyles = dataInfo.border.replace('border:', '').trim().split(' ')

    expect(await bindArrayStyle.style(isFirefoxOrApp ? 'borderTopWidth' : 'borderWidth')).toBe(borderStyles[0])
    expect(await bindArrayStyle.style(isFirefoxOrApp ? 'borderTopStyle' : 'borderStyle')).toBe(borderStyles[1])
    expect(await bindArrayStyle.style(isFirefoxOrApp ? 'borderTopColor' : 'borderColor')).toBe(isWebOrMP ? 'rgb(255, 0, 0)' : borderStyles[2])

    const fooPropsTitle = await page.$('#foo-props-title')
    expect(await fooPropsTitle.text()).toBe(dataInfo.fooProps.title)
    const fooPropsNum = await page.$('#foo-props-num')
    expect(await fooPropsNum.text()).toBe(dataInfo.fooProps.num.toString())
    const fooPropsObjName = await page.$('#foo-props-obj-name')
    expect(await fooPropsObjName.text()).toBe(dataInfo.fooProps.obj.name)

    if(!isMP) {
      const bindObj1 = await page.$('#bindObj1')
      expect(await (await bindObj1.$('#foo-props-title')).text()).toBe(dataInfo.fooProps.title)
      const bindObj2 = await page.$('#bindObj2')
      expect(await (await bindObj2.$('#foo-props-title')).text()).toBe(dataInfo.fooProps.title+' override')
      const bindObj3 = await page.$('#bindObj3')
      expect(await (await bindObj3.$('#foo-props-title')).text()).toBe(dataInfo.fooProps.title)
      const bindObj4 = await page.$('#bindObj4')
      expect(await (await bindObj4.$('#foo-props-title')).text()).toBe(`foo title(json) override`)
      const bindObj5 = await page.$('#bindObj5')
      expect(await (await bindObj5.$('#foo-props-title')).text()).toBe(`foo title(json)`)
    }

    if (isWeb) {
      const vBindCss = await page.$('.v-bind-css')
      expect(await vBindCss.style('backgroundColor')).toBe('rgb(255, 0, 0)')
      expect(await vBindCss.style('height')).toBe('150px')
    }
    const bindRawObjectStyle = await page.$('#bind-raw-object-style')
    expect(await bindRawObjectStyle.text()).toBe("rawObjectStyle")
    const bindRawArrayStyle = await page.$('#bind-raw-array-style')
    expect(await bindRawArrayStyle.text()).toBe("rawArrayStyle")
  }

  it('v-bind options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })

  it('v-bind composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
