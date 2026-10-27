jest.setTimeout(50000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAndroid = platformInfo.startsWith('android')
const isAPP = isIOS || isAndroid || isHarmony
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('component-native-input', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  if (isAppWebView) {
  	it('app 与 web 存在差异, webview 不进行截图', () => {
      expect(1).toBe(1)
    })
  	return
  }

  if ((isHarmony && platformInfo.includes('MatePad')) || (isAndroid && platformInfo.startsWith('android 8'))) {
    it('暂时跳过差异屏幕尺寸设备', () => {
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

  it('default focus', async () => {
    // 等待input获取焦点 & 键盘上推
    await page.waitFor(1000);
    const windowInfo = await program.callUniMethod('getWindowInfo');
    const screenShotOptions = {
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44,
      },
    }
    const image = await program.screenshot(screenShotOptions)
    expect(image).toSaveImageSnapshot()
  });

  // 测试焦点及键盘弹起
  if(!isMP) {
    it('focus', async () => {
      const input = await page.$('#uni-input-focus');
      expect(await input.attribute('focus')).toBe("true")
      await setPageData({focus: false})
      expect(await input.attribute('focus')).toBe("false")
    });
  }
  // web、iOS 自动化无法触发事件；Harmony Vapor 暂不支持通过 UniElement.focus() 触发 input focus
  if ((isHarmony && !isVapor) || isAndroid) {
    it("focus and blur event", async () => {
      if (isHarmony) {
        await program.tap({ x: 100, y: 50 })
        await page.waitFor(1000);
      }
      await setPageData({
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
    const numberPasswordFalse = await page.$('#uni-input-type-number-password-false');
    const digit = await page.$('#uni-input-type-digit');
    const tel = await page.$('#uni-input-type-tel');
    expect(await text.attribute('type')).toEqual("text")
    expect(await number.attribute('type')).toEqual("number")
    expect(await numberPasswordFalse.attribute('type')).toEqual("number")
    expect(await digit.attribute('type')).toEqual("digit")
    expect(await tel.attribute('type')).toEqual("tel")
  })

  it("screenshot full page for password", async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })

  it("password updates dynamically", async () => {
    const input = await page.$('#uni-input-password')
    try {
      expect(String(await input.attribute('password'))).toBe('true')
      await setPageData({ inputPassword: false })
      expect(String(await input.attribute('password'))).toBe('false')
      await setPageData({ inputPassword: true })
      expect(String(await input.attribute('password'))).toBe('true')
    } finally {
      await setPageData({ inputPassword: true })
    }
  })

  if(isMP) {
    it("disable", async () => {
      const input = await page.$('#uni-input-disable');
      expect(await input.property("disabled")).toBe(true)
    })
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
      const input = await page.$('#uni-input-cursor-color')
      await setPageData({cursor_color: "red"})
      await page.waitFor(500)
      expect(await input.attribute("cursor-color")).toBe("red")
    })
  }

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

  async function waitForKeyboardHeightValue(predicate, timeout = 4000) {
    const interval = 100
    const attempts = Math.ceil(timeout / interval)
    let keyboardHeight = 0
    for (let i = 0; i < attempts; i++) {
      keyboardHeight = await page.data('data.keyboardHeight')
      if (predicate(keyboardHeight)) break
      await page.waitFor(interval)
    }
    return keyboardHeight
  }

  async function waitForKeyboardHiddenAfter(previousChangeCount, keyboardWasVisible, timeout = 4000) {
    const interval = 100
    const attempts = Math.ceil(timeout / interval)
    let keyboardHeight = 0
    let changeCount = previousChangeCount
    for (let i = 0; i < attempts; i++) {
      keyboardHeight = await page.data('data.keyboardHeight')
      changeCount = await page.data('data.keyboardHeightChangeCount')
      if (keyboardHeight === 0 && (!keyboardWasVisible || changeCount > previousChangeCount)) break
      await page.waitFor(interval)
    }
    return { keyboardHeight, changeCount }
  }

  async function waitForKeyboardAdjustInputsBlurred(timeout = 4000) {
    const interval = 100
    const attempts = Math.ceil(timeout / interval)
    for (let i = 0; i < attempts; i++) {
      const pageData = await page.data('data')
      const targetBlurred = !pageData.showKeyboardAdjustTargetInput || !pageData.keyboardAdjustTargetFocused
      if (!pageData.keyboardAdjustDefaultFocused && targetBlurred) return true
      await page.waitFor(interval)
    }
    return false
  }

  async function closeKeyboardAdjustInputsForTest() {
    const pageData = await page.data('data')
    await setPageData({
      focus: false,
      focusedForKeyboardHeightChangeTest: false,
      keyboardAdjustTargetFocus: false,
    })
    await page.callMethod('blurKeyboardAdjustInputsForTest')
    const inputsBlurred = await waitForKeyboardAdjustInputsBlurred()
    await page.callMethod('hideKeyboardForTest')
    const keyboardState = await waitForKeyboardHiddenAfter(
      pageData.keyboardHeightChangeCount,
      pageData.keyboardHeight > 0
    )
    return { inputsBlurred, keyboardState }
  }

  it("keyboard height changed after page back", async () => {
    if (isWeb || isMP || isIOS) {
      expect(1).toBe(1)
      return
    }
    if (isHarmony) {
      const initialResetState = await closeKeyboardAdjustInputsForTest()
      expect(initialResetState.inputsBlurred).toBe(true)
      expect(initialResetState.keyboardState.keyboardHeight).toBe(0)
    }
    await program.navigateTo("/pages/API/navigator/new-page/new-page-3")
    await page.waitFor(2000);
    await program.navigateBack()
    await page.waitFor(1000);
    await setPageData({focusedForKeyboardHeightChangeTest: true})
    await page.waitFor(2000);

    const keyboardHeight = await page.data('data.keyboardHeight');
    expect(keyboardHeight).toBeGreaterThan(25)
    const resetState = await closeKeyboardAdjustInputsForTest()
    expect(resetState.inputsBlurred).toBe(true)
    expect(resetState.keyboardState.keyboardHeight).toBe(0)
  })

  if (isHarmony) {
    async function resetKeyboardAdjustTestState() {
      const keyboardState = await closeKeyboardAdjustInputsForTest()
      await setPageData({ showKeyboardAdjustTargetInput: false })
      const targetRect = await waitForMethodResult(
        'getKeyboardAdjustTargetInputRect',
        rect => rect == null
      )
      await program.pageScrollTo(0)
      const defaultRect = await waitForStableRect(
        'getKeyboardAdjustInputRect',
        rect => rect != null
      )
      return { ...keyboardState, targetRect, defaultRect }
    }

    function expectKeyboardAdjustReset(resetState) {
      expect(resetState.inputsBlurred).toBe(true)
      expect(resetState.keyboardState.keyboardHeight).toBe(0)
      expect(resetState.targetRect).toBeNull()
      expect(resetState.defaultRect).not.toBeNull()
    }

    async function runKeyboardAdjustTest(testBody) {
      const initialResetState = await resetKeyboardAdjustTestState()
      expectKeyboardAdjustReset(initialResetState)
      let testCompleted = false
      try {
        await testBody()
        testCompleted = true
      } finally {
        if (testCompleted) {
          const finalResetState = await resetKeyboardAdjustTestState()
          expectKeyboardAdjustReset(finalResetState)
        } else {
          try {
            await resetKeyboardAdjustTestState()
          } catch (error) {
            console.warn('keyboard adjust cleanup failed after test failure', error)
          }
        }
      }
    }

    async function waitForKeyboardShowAfter(previousChangeCount, timeout = 4000) {
      const interval = 100
      const attempts = Math.ceil(timeout / interval)
      let keyboardHeight = 0
      let changeCount = previousChangeCount
      for (let i = 0; i < attempts; i++) {
        keyboardHeight = await page.data('data.keyboardHeight')
        changeCount = await page.data('data.keyboardHeightChangeCount')
        if (changeCount > previousChangeCount && keyboardHeight > 25) break
        await page.waitFor(interval)
      }
      return { keyboardHeight, changeCount }
    }

    async function waitForFocusCount(dataPath, previousCount, timeout = 4000) {
      const interval = 100
      const attempts = Math.ceil(timeout / interval)
      let focusCount = previousCount
      for (let i = 0; i < attempts; i++) {
        focusCount = await page.data(dataPath)
        if (focusCount > previousCount) break
        await page.waitFor(interval)
      }
      return focusCount
    }

    async function waitForMethodResult(methodName, predicate, timeout = 4000) {
      const interval = 100
      const attempts = Math.ceil(timeout / interval)
      let result = null
      for (let i = 0; i < attempts; i++) {
        result = await page.callMethod(methodName)
        if (predicate(result)) break
        await page.waitFor(interval)
      }
      return result
    }

    async function waitForStableRect(methodName, predicate, timeout = 4000) {
      const interval = 100
      const attempts = Math.ceil(timeout / interval)
      const requiredStableSamples = 3
      let result = null
      let previousBottom = null
      let stableSamples = 0
      for (let i = 0; i < attempts; i++) {
        result = await page.callMethod(methodName)
        if (result != null && predicate(result)) {
          stableSamples = previousBottom != null && Math.abs(result.bottom - previousBottom) <= 1
            ? stableSamples + 1
            : 1
        } else {
          stableSamples = 0
        }
        previousBottom = result == null ? null : result.bottom
        if (stableSamples >= requiredStableSamples) break
        await page.waitFor(interval)
      }
      return result
    }

    async function focusDefaultKeyboardAdjustInput(showTargetInput = false) {
      if (showTargetInput) {
        await setPageData({ showKeyboardAdjustTargetInput: true })
        const targetRect = await waitForMethodResult(
          'getKeyboardAdjustTargetInputRect',
          rect => rect != null
        )
        expect(targetRect).not.toBeNull()
      }

      const windowInfo = await program.callUniMethod('getWindowInfo')
      const viewportHeight = windowInfo.safeArea.height
      let beforeRect = await page.callMethod('getKeyboardAdjustInputRect')
      expect(beforeRect).not.toBeNull()

      const scrollTop = Math.max(0, beforeRect.bottom - viewportHeight + 20)
      const expectedBottom = viewportHeight - 20
      await program.pageScrollTo(scrollTop)
      beforeRect = await waitForStableRect(
        'getKeyboardAdjustInputRect',
        rect => scrollTop === 0 || Math.abs(rect.bottom - expectedBottom) <= 3
      )
      expect(beforeRect).not.toBeNull()
      if (scrollTop > 0) {
        expect(Math.abs(beforeRect.bottom - expectedBottom)).toBeLessThanOrEqual(3)
      }

      const defaultFocusCount = await page.data('data.keyboardAdjustDefaultFocusCount')
      const keyboardHeightChangeCount = await page.data('data.keyboardHeightChangeCount')
      await setPageData({ focusedForKeyboardHeightChangeTest: true })
      const updatedDefaultFocusCount = await waitForFocusCount(
        'data.keyboardAdjustDefaultFocusCount',
        defaultFocusCount
      )
      expect(updatedDefaultFocusCount).toBeGreaterThan(defaultFocusCount)

      const keyboardState = await waitForKeyboardShowAfter(keyboardHeightChangeCount)
      expect(keyboardState.changeCount).toBeGreaterThan(keyboardHeightChangeCount)
      expect(keyboardState.keyboardHeight).toBeGreaterThan(25)

      const keyboardTop = viewportHeight - keyboardState.keyboardHeight
      const afterRect = await waitForStableRect(
        'getKeyboardAdjustInputRect',
        rect => rect.bottom <= keyboardTop + 3
      )
      expect(afterRect).not.toBeNull()
      expect(beforeRect.bottom).toBeGreaterThan(keyboardTop)
      expect(afterRect.bottom).toBeLessThanOrEqual(keyboardTop + 3)
      expect(afterRect.bottom).toBeLessThan(beforeRect.bottom)

      return { viewportHeight, keyboardTop }
    }

    it('default adjust-position keeps input above keyboard', async () => {
      await runKeyboardAdjustTest(async () => {
        await focusDefaultKeyboardAdjustInput()
      })
    })

    it('default adjust-position recovers after input removal during rapid refocus', async () => {
      await runKeyboardAdjustTest(async () => {
        const { viewportHeight, keyboardTop } = await focusDefaultKeyboardAdjustInput(true)

        const targetFocusCount = await page.data('data.keyboardAdjustTargetFocusCount')
        await setPageData({
          focusedForKeyboardHeightChangeTest: false,
          keyboardAdjustTargetFocus: true,
        })
        const updatedTargetFocusCount = await waitForFocusCount(
          'data.keyboardAdjustTargetFocusCount',
          targetFocusCount
        )
        expect(updatedTargetFocusCount).toBeGreaterThan(targetFocusCount)
        const targetRect = await waitForStableRect(
          'getKeyboardAdjustTargetInputRect',
          rect => rect.bottom <= keyboardTop + 3
        )
        expect(targetRect).not.toBeNull()
        expect(targetRect.bottom).toBeLessThanOrEqual(keyboardTop + 3)

        await setPageData({ keyboardAdjustTargetFocus: false })
        const targetBlurred = await waitForKeyboardAdjustInputsBlurred()
        expect(targetBlurred).toBe(true)

        await setPageData({ keyboardAdjustTargetFocus: true })
        // Remove the node while the native refocus request may still be pending.
        await setPageData({ showKeyboardAdjustTargetInput: false })
        const removedTargetRect = await waitForMethodResult(
          'getKeyboardAdjustTargetInputRect',
          rect => rect == null
        )
        expect(removedTargetRect).toBeNull()

        await setPageData({ keyboardAdjustTargetFocus: false })

        const remainingFocusCount = await page.data('data.keyboardAdjustDefaultFocusCount')
        await setPageData({ focusedForKeyboardHeightChangeTest: true })
        const updatedRemainingFocusCount = await waitForFocusCount(
          'data.keyboardAdjustDefaultFocusCount',
          remainingFocusCount
        )
        expect(updatedRemainingFocusCount).toBeGreaterThan(remainingFocusCount)
        const remainingKeyboardHeight = await waitForKeyboardHeightValue(height => height > 25)
        expect(remainingKeyboardHeight).toBeGreaterThan(25)
        const remainingKeyboardTop = viewportHeight - remainingKeyboardHeight
        const remainingInputRect = await waitForStableRect(
          'getKeyboardAdjustInputRect',
          rect => rect.bottom <= remainingKeyboardTop + 3
        )
        expect(remainingInputRect).not.toBeNull()
        expect(remainingInputRect.bottom).toBeLessThanOrEqual(remainingKeyboardTop + 3)
      })
    })
  }

  it('focus with value', async () => {
    const value = 'hello uni-app x'
    const input = await page.$('#uni-input-default')
    await setPageData({
      focus: false,
      cursorInputFocus: false,
      cursorColorInputFocus: false,
      selectionInputFocus: false,
      inputMaxLengthFocus: false,
      firstInputFocus: false,
    })
    await page.waitFor(1000)
    expect(await input.attribute('focus')).toBe('false')

    await setPageData({
      firstInputFocus: true
    })
    await page.waitFor(1000)

    expect(await input.value()).toBe(value)
    expect(await input.attribute('focus')).toBe('true')

    await setPageData({
      firstInputFocus: false,
    })
    await page.waitFor(500)
    expect(await input.attribute('focus')).toBe('false')
  })

  it('both set modelValue and value', async () => {
    const input2 = await page.$('#both-model-value');
    expect(await input2.value()).toEqual("123")
  })

  it("screenshot full page", async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
  it("placeholder-class should clear style after update empty string", async () => {
    await setPageData({
      inputPlaceHolderClass: ""
    })
    await page.waitFor(1000)
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
  if (isAPP) {
    it("type number password false focus with soft keyboard screenshot", async () => {
      await setPageData({
        focus: false,
        cursorInputFocus: false,
        cursorColorInputFocus: false,
        selectionInputFocus: false,
        inputMaxLengthFocus: false,
        firstInputFocus: false,
        typeNoneFocus: false,
        focusedForKeyboardHeightChangeTest: false,
        numberPasswordFalseFocus: false,
      })
      await program.tap({ x: 100, y: 50 })
      await page.waitFor(1000)
      await program.pageScrollTo(0)
      await page.waitFor(1000)
      await setPageData({
        numberPasswordFalseFocus: true,
      })
      await page.waitFor(1500)
      const windowInfo = await program.callUniMethod('getWindowInfo');
      const image = await program.screenshot({
        deviceShot: true,
        area: {
          x: 0,
          y: windowInfo.safeAreaInsets.top + 44,
        }
      })
      expect(image).toSaveImageSnapshot()
      await setPageData({
        numberPasswordFalseFocus: false,
      })
      if (isHarmony) {
        await program.tap({ x: 100, y: 50 })
        await page.waitFor(1000);
      }
    })

    it("type none focus should not show keyboard", async () => {
      // 确保其他 input 失焦
      await setPageData({
        focus: false,
        cursorInputFocus: false,
        cursorColorInputFocus: false,
        selectionInputFocus: false,
        inputMaxLengthFocus: false,
        firstInputFocus: false,
        numberPasswordFalseFocus: false,
      })
      await program.tap({ x: 100, y: 50 })
      // type none input 获取焦点后不应该弹出键盘，等待一段时间截图确认
      await setPageData({
        typeNoneFocus: true,
      })
      await page.waitFor(1000
      )
      const windowInfo = await program.callUniMethod('getWindowInfo');
      const image = await program.screenshot({
        deviceShot: true,
        area: {
          x: 0,
          y: windowInfo.safeAreaInsets.top + 44,
        }
      })
      expect(image).toSaveImageSnapshot()
    })
  }
});
