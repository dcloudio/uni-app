jest.setTimeout(50000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')
const isAndroid = platformInfo.startsWith('android')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

describe('component-native-input', () => {
  if (isAppWebView) {
  	it('app 与 web 存在差异, webview 不进行截图', () => {
      expect(1).toBe(1)
    })
  	return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/input/input')
    await page.waitFor('view');
  });

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  // 测试焦点及键盘弹起
  if(!isMP) {
    it('focus', async () => {
      const input = await page.$('#uni-input-focus');
      expect(await input.attribute('focus')).toBe("true")
      // expect(await page.data("inputFocusKeyBoardChangeValue")).toBe(true)
      await setPageData({focus: false})
      expect(await input.attribute('focus')).toBe("false")
      // await page.waitFor(1000)
      // expect(await page.data("inputFocusKeyBoardChangeValue")).toBe(false)
      // await page.setData({
      //   focus: true,
      // })
      // expect(await input.attribute('focus')).toBe(true)
      // await page.waitFor(1000)
      // expect(await page.data("inputFocusKeyBoardChangeValue")).toBe(true)
      // await page.setData({
      //   focus: false,
      // })
      // expect(await input.attribute('focus')).toBe(false)
      // await page.waitFor(1000)
      // expect(await page.data("inputFocusKeyBoardChangeValue")).toBe(false)
      // await page.waitFor(1000)
    });
  }
  // web ios 自动化测试时无法触发事件，手动测试可以
  // TODO: dom2 harmony 暂时不支持 holdKeyboard
  if ((isHarmony && !isDom2) || isAndroid) {
    it("focus and blur event", async () => {
      if (isHarmony) {
        await program.tap({ x: 100, y: 50 })
        await page.waitFor(1000);
      }
      page.setData({
        triggerFocus: false,
        triggerBlur: false,
      })
      let pageData = await page.data('data')
      expect(pageData.triggerFocus).toBe(false)
      expect(pageData.triggerBlur).toBe(false)
      await page.callMethod('triggerFocusOrBlur')
      await page.waitFor(500)
      pageData = await page.data('data')
      expect(pageData.triggerFocus).toBe(true)
      expect(pageData.triggerBlur).toBe(false)
      const focusEventDetail = JSON.parse(pageData.focusAndBlurEventDetail)
      expect(focusEventDetail.height).not.toBe(undefined)
      await page.callMethod('triggerFocusOrBlur')
      await page.waitFor(500)
      pageData = await page.data('data')
      expect(pageData.triggerFocus).toBe(false)
      expect(pageData.triggerBlur).toBe(true)
      const blurEventDetail = JSON.parse(pageData.focusAndBlurEventDetail)
      expect(blurEventDetail.cursor).not.toBe(undefined)
      if (isHarmony) {
        await program.tap({ x: 100, y: 50 })
        await page.waitFor(1000);
      }
    });
  }

  // 测试修改value属性
  it("value", async () => {
    const input = await page.$('#uni-input-default');
    expect(await input.property('value')).toEqual("hello uni-app x")
  })

  //测试input的类型
  it("type", async () => {
    const text = await page.$('#uni-input-type-text');
    const number = await page.$('#uni-input-type-number');
    const digit = await page.$('#uni-input-type-digit');
    const tel = await page.$('#uni-input-type-tel');
    expect(await text.attribute('type')).toEqual("text")
    expect(await number.attribute('type')).toEqual("number")
    expect(await digit.attribute('type')).toEqual("digit")
    expect(await tel.attribute('type')).toEqual("tel")
  })

  //  测试密码属性
  // it("password", async () => {
  //   const input = await page.$('.uni-input-password');
  //   expect(await input.attribute('password')).toBe(true)
  //   await page.setData({
  //     inputPassword: false,
  //     inputPasswordValue: "inputPasswordValue"
  //   })
  //   expect(await input.attribute('password')).toBe(false)
  //   await page.waitFor(500)
  //   await page.setData({
  //     inputPassword: true
  //   })
  // })
  // 测试placeholder
  // it("placeholder", async () => {
  //   const placeholder1 = await page.$('.uni-input-placeholder1');
  //   expect(await placeholder1.attribute("placeholder-style")).toMatchObject({
  //     "color": "red"
  //   })
  //   expect(await placeholder1.attribute("placeholder")).toEqual("占位符文字颜色为红色")
  //   await page.setData({
  //     inputPlaceHolderStyle: "color:#CC00CC",
  //   })
  //   expect(await placeholder1.attribute("placeholder-style")).toMatchObject({
  //     "color": "#CC00CC"
  //   })

  //   await page.setData({
  //     inputPlaceHolderStyle: "color:#CC19CC;background-color:#00b1c0",
  //   })
  //   expect(await placeholder1.attribute("placeholder-style")).toMatchObject({
  //     "color": "#CC19CC",
  //     "backgroundColor": "#00b1c0"
  //   })

  //   await page.setData({
  //     inputPlaceHolderStyle: "color:#CC19CC;background-color:#00b1c0;text-align:center;font-size:44px;font-weight:900",
  //   })
  //   expect(await placeholder1.attribute("placeholder-style")).toEqual({
  //     "backgroundColor": "#00b1c0",
  //     "color": "#CC19CC",
  //     "fontSize": "44px",
  //     "fontWeight": "900",
  //     "textAlign": "center"
  //   })

  //   const placeholder2 = await page.$('.uni-input-placeholder2');
  //   expect(await placeholder2.attribute("placeholder-class")).toMatchObject({
  //     "backgroundColor": "#008000"
  //   })
  //   await page.setData({
  //     inputPlaceHolderClass: "uni-input-placeholder-class-ts",
  //   })
  //   expect(await placeholder2.attribute("placeholder-class")).toMatchObject({
  //     "backgroundColor": "#FFA500"
  //   })
  //   expect(await placeholder2.attribute("placeholder")).toEqual("占位符背景色为绿色")
  // })

  if(isMP) {
    it("disable", async () => {
      const input = await page.$('#uni-input-disable');
      expect(await input.property("disabled")).toBe(true)
    })
    // 如下属性在自动化测试通过property、attribute + confirmType、confirm-type均无法获取
    // it("confirm-type", async () => {
    //   expect(await (await page.$('#uni-input-confirm-send')).attribute("confirm-type")).toEqual("send")
    //   expect(await (await page.$('#uni-input-confirm-search')).property("confirmType")).toEqual("search")
    //   expect(await (await page.$('#uni-input-confirm-next')).property("confirmType")).toEqual("next")
    //   expect(await (await page.$('#uni-input-confirm-go')).property("confirmType")).toEqual("go")
    //   expect(await (await page.$('#uni-input-confirm-done')).property("confirmType")).toEqual("done")
    // })
    // it("cursor-color", async () => {
    //   await page.setData({
    //     cursor_color: "red",
    //   })
    //   await page.waitFor(500)
    //   expect(await (await page.$('#uni-input-cursor-color')).property("cursor-color")).toBe("red")
    // })
  } else {
    it("disable", async () => {
      const input = await page.$('#uni-input-disable');
      expect(await input.attribute("disabled")).toBe("true")
    })
    it("confirm-type", async () => {
      expect(await (await page.$('#uni-input-confirm-send')).attribute("confirmType")).toEqual("send")
      expect(await (await page.$('#uni-input-confirm-search')).attribute("confirmType")).toEqual("search")
      expect(await (await page.$('#uni-input-confirm-next')).attribute("confirmType")).toEqual("next")
      expect(await (await page.$('#uni-input-confirm-go')).attribute("confirmType")).toEqual("go")
      expect(await (await page.$('#uni-input-confirm-done')).attribute("confirmType")).toEqual("done")
    })
    it("cursor-color", async () => {
      await setPageData({cursor_color: "red"})
      await page.waitFor(500)
      expect(await (await page.$('#uni-input-cursor-color')).attribute("cursor-color")).toBe("red")
    })
  }


  // it("maxlength", async () => {
  //   const input = await page.$('.uni-input-maxlength');
  //   await page.setData({
  //     inputMaxLengthValue: "uni-input-maxlength"
  //   })
  //   await page.waitFor(500)
  // })


  it("maxlength", async () => {
    const input = await page.$('#uni-input-maxlength');
    let str = "";
    for (let i = 0; i < 200; i++) {
      str += `${i}`
    }
    await setPageData({inputMaxLengthValue: str})
    let length = (await input.value()).length
    expect(length).toBe(10)
    await setPageData({inputMaxLengthValue: ""})
  })

  it("password and value order", async () => {
    const input = await page.$('#uni-input-password');
    let length = (await input.value()).length
    expect(length).toBe(6)
    await setPageData({inputPasswordValue: ""})
  })

  it("keyboard height changed after page back", async () => {
    // TODO: dom2 harmony 暂时不支持 holdKeyboard
    if (isWeb || isMP || isIOS || isDom2) {
      expect(1).toBe(1)
      return
    }
    // TODO: harmony 页面隐藏时需要隐藏键盘
    if (isHarmony) {
      await program.tap({ x: 100, y: 50 })
      await page.waitFor(1000);
    }
    await program.navigateTo("/pages/API/navigator/new-page/new-page-3")
    await page.waitFor(2000);
    await program.navigateBack()
    await page.waitFor(1000);
    await setPageData({focusedForKeyboardHeightChangeTest: true})
    await page.waitFor(2000);

    const keyboardHeight = await page.data('data.keyboardHeight');
    expect(keyboardHeight).toBeGreaterThan(25)
    //reset
    await setPageData({
      focusedForKeyboardHeightChangeTest: false,
      keyboardHeight: 0
    })
    if (isHarmony) {
      await program.tap({ x: 100, y: 50 })
      await page.waitFor(1000);
    }
  })

  it('focus with value', async () => {
    await setPageData({
      focus: false,
      cursorInputFocus: false,
      cursorColorInputFocus: false,
      selectionInputFocus: false,
      inputMaxLengthFocus: false,
    })
    await page.waitFor(1000)

    await setPageData({
      firstInputFocus: true
    })
    await page.waitFor(1000)

    await program.pageScrollTo(0)
    await page.waitFor(1000)

    const windowInfo = await program.callUniMethod('getWindowInfo');
    const image1 = await program.screenshot({
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44,
      },
    })
    expect(image1).toSaveImageSnapshot()
    // 两张截图，避免光标闪烁截不到
    const image2 = await program.screenshot({
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44,
      },
    })
    expect(image2).toSaveImageSnapshot()
    await setPageData({
      firstInputFocus: false,
    })
    if (isHarmony) {
      await program.tap({ x: 100, y: 50 })
      await page.waitFor(1000);
    }
  })

  it('both set modelValue and value', async () => {
    const input2 = await page.$('#both-model-value');
    expect(await input2.value()).toEqual("123")
  })

  it("afterAllTestScreenshot", async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
});
