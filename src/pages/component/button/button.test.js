jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony

const PAGE_PATH = '/pages/component/button/button'

describe('Button.uvue', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  let screenShotOptions = { fullPage: true }
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    const windowInfo = await program.callUniMethod('getWindowInfo')
    screenShotOptions = {
      fullPage: true,
      area: {
        x: windowInfo.safeArea.left,
        width: windowInfo.safeArea.right - windowInfo.safeArea.left - 10
      }
    }
  })

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  it('click', async () => {
    // TODO 待测试框架支持text的dispatchEvent
    const btn = await page.$('.btn')
    expect(await page.data('data.count')).toEqual(0)
    await btn.tap()
    expect(await page.data('data.count')).toEqual(1)
    if (isAndroid) { // android 平台 element.tap 不受 disabled 影响
      return;
    }
    await setPageData({
      disabled_boolean: true
    })
    await btn.tap()
    expect(await page.data('data.count')).toEqual(1)
    await setPageData({
      disabled_boolean: false
    })
    await btn.tap()
    expect(await page.data('data.count')).toEqual(2)
  })
  it('length', async () => {
    const elements = await page.$$('.btn')
    expect(elements.length).toBe(1)
  })

  it('text', async () => {
    const textBtn = await page.$('.btn')
    expect(await textBtn.text()).toEqual('uni-app-x')
    await setPageData({text: 'uni-app-x button'})
    await page.waitFor(100)
    expect(await textBtn.text()).toEqual('uni-app-x button')
  })

  it('type', async () => {
    const btn = await page.$('.btn')
    expect(await btn.property('type')).toBe('default')
    await setPageData({type_enum_current: 1})
    expect(await btn.property('type')).toBe('primary')
    await setPageData({type_enum_current: 2})
    expect(await btn.property('type')).toBe('warn')
  })
  it('size', async () => {
    const btn = await page.$('.btn')
    expect(await btn.property('size')).toBe('default')
    await setPageData({size_enum_current: 1})
    expect(await btn.property('size')).toBe('mini')
  })
  it('plain', async () => {
    const btn = await page.$('.btn')
    expect(await btn.property('plain')).toBe(false)
    await setPageData({plain_boolean: true})
    expect(await btn.property('plain')).toBe(true)
  })
  it('disabled', async () => {
    const btn = await page.$('.btn')
    await setPageData({disabled_boolean: false})
    expect(await btn.property('disabled')).toBe(false)
    await setPageData({disabled_boolean: true})
    expect(await btn.property('disabled')).toBe(true)
  })

  it("checkUniButtonElement", async () => {
    if (isMP) {
      expect(1).toBe(1)
      return
    }
    const value = await page.callMethod('checkUniButtonElement')
    expect(value).toBe(true)
  })
  it("setbuttonEmpty", async () => {
    const textBtn = await page.$('.btn')
    await setPageData({text: ''})
    await page.waitFor(100)
    expect(await textBtn.text()).toEqual('')
  })

  // 自定义button和默认button来回切换截图对比
  it("button-screenshot-plain+primary+default", async () => {
    if (isWeb || isMP) {
      expect(1).toBe(1)
      return
    }

    const btn = await page.$('.btn')

    await setPageData({
      text: 'uni-app-x',
      plain_boolean: true,
      type_enum_current: 1,
      size_enum_current: 0,
      disabled_boolean: false,
      default_style: false
    })
    await page.waitFor(100);
    expect(await btn.property('size')).toBe('default')
    expect(await btn.property('plain')).toBe(true)
    expect(await btn.property('type')).toBe('primary')
    const image1 = await program.screenshot(screenShotOptions);
    expect(image1).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'button-screenshot-plain+primary+default'
    }});

    await setPageData({
      text: 'uni-app-x',
      plain_boolean: true,
      type_enum_current: 1,
      size_enum_current: 0,
      disabled_boolean: false,
      default_style: true
    })
    await page.waitFor(100);
    const image2 = await program.screenshot(screenShotOptions);
    expect(image2).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'custom-button-screenshot-plain+primary+default'
    }});

    await setPageData({
      text: 'uni-app-x',
      plain_boolean: true,
      type_enum_current: 1,
      size_enum_current: 0,
      disabled_boolean: false,
      default_style: false
    })
    await page.waitFor(100);
    const image3 = await program.screenshot(screenShotOptions);
    expect(image3).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'custom-button-screenshot-plain+primary+default-changeToDefault'
    }});

  })
})


describe('Buttonstatus.uvue', () => {
  let page
  let screenShotOptions = { fullPage: true }
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/button/buttonstatus')
    await page.waitFor('button')
    const windowInfo = await program.callUniMethod('getWindowInfo')
    screenShotOptions = {
      fullPage: true,
      area: {
        x: windowInfo.safeArea.left,
        width: windowInfo.safeArea.right - windowInfo.safeArea.left - 10
      }
    }
  })

  test('newline', async () => {
    const image = await program.screenshot(screenShotOptions);
    expect(image).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'buttonstatus-newline'
    }});
  })

  test('loading-class', async () => {
    if (!isVapor || isMP) {
      expect(1).toBe(1)
      return
    }

    const btn = await page.$('.loading-class')
    expect(await btn.attribute('loading-class')).toContain('custom-loading')
  })

  test('change-disabled-screenshot', async () => {
    const changeDisabledButton = await page.$('#changeDisabledButton')
    await changeDisabledButton.tap()

    await page.waitFor(100);

    const image = await program.screenshot(screenShotOptions);
    expect(image).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'buttonstatus-disabled'
    }});
  })

  test('button-hover', async () => {
    await page.callMethod('set_disabled_false')
    await page.waitFor(100)
    const btn = await page.$('#test-button-hover-class')
    if (isApp) {
      const rect = await page.callMethod('getHoverButtonRect')
      const tapPoint = {
        x: Math.round(rect.left + rect.width / 2.0),
        y: Math.round(rect.y + rect.height - (isVapor ? 20 : 10))
      }
      console.log('button rect', rect)
      console.log('button tap point', tapPoint)
      await program.tap({
        x: tapPoint.x,
        y: tapPoint.y,
        duration: 300
      })
    } else {
      await btn.longpress()
    }
    await page.waitFor(400)
    const image = await program.screenshot(screenShotOptions);
    expect(image).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'buttonstatus-button-hover-class-default-value'
    }});
  })
})
