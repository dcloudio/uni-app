const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const OPTIONS_PAGE_PATH = '/pages/component-instance/props/props-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/props/props-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.includes('android')
const isHarmony = platformInfo.startsWith('harmony')

describe('props', () => {
  if (isDom2 && isHarmony) {
    // TODO: harmony vapor 运行正常，自动化测试崩溃，暂时跳过 @fxy
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(1000)
    const arrayLiteral = await page.$('.array-literal-component')
    const objectType = await page.$('.object-type-component')
    const sameNamePropDefaultValue = await page.$('.same-name-prop-default-value-component')
    const propsWithDefaults = await page.$('.props-with-defaults-component')
    const referenceTypes = await page.$('.reference-types-component')

    const arrayLiteralStr = await arrayLiteral.$('#array-literal-str')
    expect(await arrayLiteralStr.text()).toBe('str')

    const arrayLiteralNum = await arrayLiteral.$('#array-literal-num')
    expect(await arrayLiteralNum.text()).toBe('10')

    const arrayLiteralBool = await arrayLiteral.$('#array-literal-bool')
    expect(await arrayLiteralBool.text()).toBe('true')

    const arrayLiteralObj = await arrayLiteral.$('#array-literal-obj')
    expect(await arrayLiteralObj.text()).toBe('{"age":18}')

    const arrayLiteralArr = await arrayLiteral.$('#array-literal-arr')
    expect(await arrayLiteralArr.text()).toBe('["a","b","c"]')

    const objectTypeStr = await objectType.$('#object-type-str')
    expect(await objectTypeStr.text()).toBe('str')

    const objectTypeNum = await objectType.$('#object-type-num')
    expect(await objectTypeNum.text()).toBe('10')

    const objectTypeBool = await objectType.$('#object-type-bool')
    expect(await objectTypeBool.text()).toBe('true')

    const objectTypeObj = await objectType.$('#object-type-obj')
    expect(await objectTypeObj.text()).toBe('{"age":18}')

    const objectTypeObjAge = await objectType.$('#object-type-obj-age')
    expect(await objectTypeObjAge.text()).toBe('18')

    const objectTypeArr = await objectType.$('#object-type-arr')
    expect(await objectTypeArr.text()).toBe('["a","b","c"]')

    const sameNamePropDefaultValueArr = await sameNamePropDefaultValue.$('#same-name-prop-default-value-arr')
    expect(await sameNamePropDefaultValueArr.text()).toBe('[1,2,3]')

    const propMsg = await propsWithDefaults.$('#prop-msg')
    expect(await propMsg.text()).toBe('hello')
    const propLabels = await propsWithDefaults.$('#prop-labels')
    expect(await propLabels.text()).toBe('["a","b"]')

    const referenceTypeList = await referenceTypes.$('#reference-type-list')
    if (!isDom2) {
      // TODO: 节点有，但内容为空, 自动化测试存在问题，运行正常 @fxy
      expect(await referenceTypeList.text()).toBe(isAndroid ? '[1,2,3]' : '["a","b","c"]')
    }
  }

  if (!isDom2) {
    it('props 选项式 API', async () => {
      await test(OPTIONS_PAGE_PATH)
    });
  }

  it('props 组合式 API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
