const PAGE_PATH = '/pages/component/text/text-props'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('text-props', () => {
  let page
  beforeAll(async () => {
    page = await program.navigateTo(PAGE_PATH)
    await page.waitFor(1000)
  })

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  it('screenshot', async () => {
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })

  it('empty text', async () => {
      await setPageData({ autoTest: true })
      const element = await page.$('#empty-text')
      if (element != null) {
        const { width, height } = await element.size()
        expect(width).toBe(0)
        expect(height).toBe(0)
      }
      await page.callMethod("setEmptyText")
      await page.waitFor(100)
      const element2 = await page.$('#empty-text2')
      if (element2 != null) {
        expect(await element2.text()).toBe('')
        const { width, height } = await element2.size()
        expect(width).toBe(0)
        expect(height).toBe(0)
      }
      const element3 = await page.$('#empty-text3')
      if (element3 != null) {
        expect(await element3.text()).toBe('')
      }
      await setPageData({ autoTest: false })
  })

  it('nested text', async () => {
      await setPageData({ autoTest: true })
      await page.callMethod("setNestedText")
      await page.waitFor(100)
      const element = await page.$('#nested-text')
      if (!isMP && element != null) {
        // TODO 微信小程序端疑似自动化测试框架Bug，此处text方法会返回`"修改三级节点文本修改三级节点文本"`,手动测试未发现问题
        expect(await element.text()).toBe("修改三级节点文本")
      }

      if(isMP || isWeb) {
        // 不支持 program.tap
        expect(1).toBe(1)
        return
      }

      const rect = await page.callMethod("getBoundingClientRectForTest")
      const windowInfo = await program.callUniMethod('getWindowInfo');
      await program.tap({
        x: Math.ceil(rect.left + rect.width / 2),
        y: Math.ceil(windowInfo.statusBarHeight + 44 + rect.top + rect.height / 2)
      })

      await page.waitFor(300)
      expect(await page.data('data.isNestedText1TapTriggered')).toBe(true)
      expect(await page.data('data.isNestedText2TapTriggered')).toBe(true)
      await setPageData({ autoTest: false })
  })

  it('height text', async () => {
      await setPageData({ autoTest: true })
      await page.callMethod("setHeightText")
      await page.waitFor(100)
      const element = await page.$('#height-text')
      if (element != null) {
        expect(await element.text()).toBe("修改设置高度文本")
      }
      await setPageData({ autoTest: false })
  })
})
