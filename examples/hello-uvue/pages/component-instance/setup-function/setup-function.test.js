const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

const PAGE_PATH = '/pages/component-instance/setup-function/setup-function'
describe('options setup', () => {
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const str = await page.$('#str')
    expect(await str.text()).toBe('default str')
    const num = await page.$('#num')
    expect(await num.text()).toBe('0')
    const bool = await page.$('#bool')
    expect(await bool.text()).toBe('false')

    const count = await page.$('#count')
    expect(await count.text()).toBe('0')

    const objStr = await page.$('#obj-str')
    expect(await objStr.text()).toBe('obj default str')
    const objNum = await page.$('#obj-num')
    expect(await objNum.text()).toBe('0')
    const objBool = await page.$('#obj-bool')
    expect(await objBool.text()).toBe('false')

    if (!isMP && !isWeb) {
      const propsStr = await page.$('#props-str')
      expect(await propsStr.text()).toBe('props.str: default str')
      const propsCount = await page.$('#props-count')
      expect(await propsCount.text()).toBe('props.count: 0')
      const propsObjStr = await page.$('#props-obj-str')
      expect(await propsObjStr.text()).toBe(`props.obj['str']: obj default str`)
      const propsObjNum = await page.$('#props-obj-num')
      expect(await propsObjNum.text()).toBe(`props.obj['num']: 0`)
      const propsObjBool = await page.$('#props-obj-bool')
      expect(await propsObjBool.text()).toBe(`props.obj['bool']: false`)
    }
  })
  it('props', async () => {
    const incrementBtn = await page.$('#increment-btn')
    await incrementBtn.tap()

    const count = await page.$('#count')
    expect(await count.text()).toBe('1')
    if (!isWeb && !isMP) {
      const propsCount = await page.$('#props-count')
      expect(await propsCount.text()).toBe('props.count: 1')
    }

    const updateObjBtn = await page.$('#update-obj-btn')
    await updateObjBtn.tap()

    const objStr = await page.$('#obj-str')
    expect(await objStr.text()).toBe('obj new str')
    const objNum = await page.$('#obj-num')
    expect(await objNum.text()).toBe('100')
    const objBool = await page.$('#obj-bool')
    expect(await objBool.text()).toBe('true')

    if (!isMP && !isWeb) {
      const propsObjStr = await page.$('#props-obj-str')
      expect(await propsObjStr.text()).toBe(`props.obj['str']: obj new str`)
      const propsObjNum = await page.$('#props-obj-num')
      expect(await propsObjNum.text()).toBe(`props.obj['num']: 100`)
      const propsObjBool = await page.$('#props-obj-bool')
      expect(await propsObjBool.text()).toBe(`props.obj['bool']: true`)
    }
  })
  it('context', async () => {
    if (!isMP && !isWeb) {
      // attrs
      const contextAttrsIsShow = await page.$('#context-attrs-is-show')
      expect(await contextAttrsIsShow.text()).toBe('context.attrs.isShow: true')

      // emits
      const compUpdateObjBtn = await page.$('#comp-update-obj-btn')
      await compUpdateObjBtn.tap()
      const propsObjStr = await page.$('#props-obj-str')
      expect(await propsObjStr.text()).toBe(`props.obj['str']: obj new str by comp update`)
      const propsObjNum = await page.$('#props-obj-num')
      expect(await propsObjNum.text()).toBe(`props.obj['num']: 200`)
      const propsObjBool = await page.$('#props-obj-bool')
      expect(await propsObjBool.text()).toBe(`props.obj['bool']: true`)
    }
    // slots
    const defaultSlotInFoo = await page.$('#default-slot-in-foo')
    expect(await defaultSlotInFoo.text()).toBe('default slot in Foo')
    const hasDefaultSlot = await page.$('#has-default-slot')
    expect(await hasDefaultSlot.text()).toBe('true')
  })
})