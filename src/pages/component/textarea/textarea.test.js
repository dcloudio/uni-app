describe('component-native-textarea', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.startsWith('android')
  const isIOS = platformInfo.startsWith('ios')
  const isMP = platformInfo.startsWith('mp')
  const isHarmony = platformInfo.startsWith('harmony')
  const isWeb = platformInfo.startsWith('web')
  const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

  let page;
  let textarea;
  beforeAll(async () => {
    page = await program.reLaunch("/pages/component/textarea/textarea");
    await page.waitFor(3000);
    textarea = await page.$('.uni-textarea');
    await page.waitFor(1000);
  });

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  beforeEach(async () => {
    await setPageData({
      jest_result: false
    })
  });

  if (!isMP) {
    it("input event should triggered", async () => {
      const options = { text: '1' }
      if (isHarmony) {
        const textareaRect = await page.data('data.textareaRect');
        options.x = textareaRect.x + textareaRect.width / 2.0;
        options.y = textareaRect.y + textareaRect.height / 2.0;
      }
      await program.keyboardInput(options)
      await page.waitFor(2000)
      expect(await page.data('data.jest_result')).toBe(true)
      const image = await program.screenshot();
      expect(image).toSaveImageSnapshot();
    })

    // TODO 微信小程序自动化测试textarea focus属性取到的是数字
    it('focus', async () => {
      expect(await textarea.attribute("focus")).toBe("true")
      await setPageData({
        focus_boolean: false
      })
      await page.waitFor(500)
      expect(await textarea.attribute("focus")).toBe("false")
    });


    it('trigger change event', async () => {
      const changeValue = await page.data('data.changeValue');
      expect(changeValue).not.toBe("")

      if (isAndroid) {
        await program.adbCommand("input keyevent KEYCODE_DEL")
        await page.waitFor(2000)
      }
    })

    if (isAndroid) {
      it('focus-keyboard-height', async () => {
        await setPageData({
          focus_boolean: true
        })
        await page.waitFor(500)
        let res = await page.data('data.jest_result');
        expect(res).toBe(true)
        await setPageData({
          focus_boolean: false
        })
        await page.waitFor(500)
      })
    }


    // 微信小程序text-area不支持cursor-color属性
    it("cursor-color", async () => {
      await setPageData({
        cursor_color: "transparent"
      })
      await page.waitFor(500)
      expect(await textarea.attribute("cursor-color")).toBe("transparent")
    })

    // 微信小程序自动化测试无法获取inputmode属性
    if (isWeb) {
      it("inputmode", async () => {
        const inputmodeEnum = await page.data("data.inputmode_enum")
        for (var i = 0; i < inputmodeEnum.length; i++) {
          var x = inputmodeEnum[i]
          var selected = x['value'] - 1
          if (i == inputmodeEnum.length - 1) {
            selected = i
          }
          await page.callMethod("radio_change_inputmode_enum", selected);
          await page.waitFor(500)
          expect(await textarea.attribute("inputmode")).toEqual(x['name'])
          await page.waitFor(500)
        }
      })
    }
  }
  // TODO: dom2 harmony 暂时不支持 auto-height
  if (!isDom2) {
    it("auto-height", async () => {
      await setPageData({
        default_value: ""
      })
      await page.waitFor(500)
      await setPageData({
        auto_height_boolean: true
      })
      await page.waitFor(500)
      let textareaSize = await textarea.size()
      let textareaHeight = textareaSize.height
      expect(textareaHeight).toBeLessThanOrEqual(150)
      if (!isMP) {
        // TODO 微信小程序auto-height由true切换成false时不会影响text-area高度
        await setPageData({
          default_value: "1\n2\n3\n4\n5\n6",
          auto_height_boolean: false
        })
        await page.waitFor(500)
        textareaSize = await textarea.size()
        textareaHeight = textareaSize.height
        expect(textareaHeight).toEqual(200)
      }
    })
  }

  it("flex 1 height exception", async () => {
    const bottomTextarea = await page.$('#textarea-height-exception');
    var {
      height
    } = await bottomTextarea.size()
    expect(height).toEqual(150)
  })

  it("maxlength", async () => {
    const input = await page.$('#textarea-instance-maxlength');
    let str = "";
    for (let i = 0; i < 200; i++) {
      str += `${i}`
    }
    await setPageData({
      textareaMaxLengthValue: str
    })
    let length = (await input.value()).length
    expect(length).toBe(10)
    await setPageData({
      textareaMaxLengthValue: ""
    })
  })

  it('both set modelValue and value', async () => {
    const textarea2 = await page.$('#both-model-value');
    expect(await textarea2.value()).toEqual("123")
  })

  if (isIOS) {
    it('test-iOS-width', async () => {
      await setPageData({
        isAutoTest: true
      })
      await page.waitFor(500)
      const rect = await page.callMethod("getBoundingClientRectForTest")
      expect(rect.width).toBe(100)
    })
  }
});
