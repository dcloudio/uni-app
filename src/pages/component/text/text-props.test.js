jest.setTimeout(30000)

const PAGE_PATH = '/pages/component/text/text-props'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('text-props', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

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

  it('max-lines v-if dynamic text', async () => {
    await setPageData({ autoTest: true, maxLinesText: '' })
    expect(await page.$('#max-lines-v-if-text')).toBeNull()
    // 首次渲染后再赋值，覆盖 v-if 动态创建单行截断文本的场景。
    await page.waitFor(2000)
    await setPageData({ maxLinesText: '终极跨平台方案123' })
    await page.waitFor('#max-lines-v-if-text')
    await page.waitFor(300)
    const maxLinesElement = await page.$('#max-lines-v-if-text')
    if (maxLinesElement != null) {
      const { width, height } = await maxLinesElement.size()
      expect(width).toBeLessThanOrEqual(100)
      expect(height).toBeGreaterThan(0)
    }
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
    await setPageData({ autoTest: false, maxLinesText: '' })
    await page.waitFor(100)
  })

  it('max-lines normal and flatten text cross test', async () => {
    const normalText = await page.$('#max-lines-text')
    const flattenText = await page.$('#max-lines-flat-text')
    expect(normalText).not.toBeNull()
    expect(flattenText).not.toBeNull()

    if (normalText != null && flattenText != null) {
      const normalSize = await normalText.size()
      const flattenSize = await flattenText.size()
      expect(normalSize.width).toBe(100)
      expect(flattenSize.width).toBe(100)
      expect(normalSize.height).toBeGreaterThan(0)
      expect(flattenSize.height).toBeGreaterThan(0)
      expect(normalSize.height).toBeLessThanOrEqual(54)
      expect(flattenSize.height).toBeLessThanOrEqual(54)
      expect(flattenSize.width).toBe(normalSize.width)
      expect(flattenSize.height).toBe(normalSize.height)
    }
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
        if(isVapor){
          //Dom2为多线程等render之后再获取值
          await page.waitFor('view');
        }
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

  it('test attr decode', async () => {
      await setPageData({ decode: false });
      await page.waitFor(100);
      const image = await program.screenshot({ fullPage: true });
      expect(image).toSaveImageSnapshot();
      await setPageData({ decode: true });
  });

  it('Vapor text user-select, max-lines and flatten cross test', async () => {
    if (!isVapor) {
      expect(1).toBe(1)
      return
    }

    const element = await page.$('#text-cross-user-select')
    expect(element).not.toBeNull()
    if (element != null) {
      expect(await element.text()).toContain('可选择的长文本内容')
      const { width, height } = await element.size()
      expect(width).toBeGreaterThan(0)
      expect(height).toBeGreaterThan(0)
      expect(height).toBeLessThanOrEqual(54)
    }
  })

  it('Vapor text max-lines, flatten and hover cross test', async () => {
    if (!isVapor) {
      expect(1).toBe(1)
      return
    }

    const element = await page.$('#text-cross-hover')
    expect(element).not.toBeNull()
    if (element != null) {
      expect(await element.text()).toContain('可按压的长文本内容')
      const { width, height } = await element.size()
      expect(width).toBeGreaterThan(0)
      expect(height).toBeGreaterThan(0)
      expect(height).toBeLessThanOrEqual(54)
    }
  })
})
