const PAGE_PATH = '/pages/component/rich-text/rich-text'

describe('rich-text-test', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isMP = platformInfo.startsWith('mp')
  const isWeb = platformInfo.startsWith('web')
  const isiOS = platformInfo.startsWith('ios')
  const isAndroid = platformInfo.startsWith('android')
  const isHarmony = platformInfo.startsWith('harmony')

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(1500);
  })

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  it('richt-text-height', async () => {
    let beforeValue = await page.data('data.richTextHeight')
    if (beforeValue < 10) {
      await page.waitFor(2000)
      beforeValue = await page.data('data.richTextHeight')

      if (beforeValue < 10) {
        await page.waitFor(2000)
        beforeValue = await page.data('data.richTextHeight')
      }
    }
    await page.callMethod('changeText')
    await page.waitFor(2000)
    await page.callMethod('changeText')
    await page.waitFor(2000)
    let afterValue = await page.data('data.richTextHeight')
    console.log('beforeValue:', beforeValue)
    console.log('afterValue:', afterValue)
    expect(beforeValue).toBe(afterValue)
  })

  if (isAndroid || isiOS || isHarmony) {
    it('test selectable itemclick', async () => {
      await setPageData({
        autoTest: true,
        isItemClickTrigger: false
      })
      await page.waitFor(1000);
      const windowInfo = await program.callUniMethod('getWindowInfo');
      const rect = await page.callMethod('getBoundingClientRectForTest');
      await program.tap({
        x: (rect.right - rect.left) / 2,
        y: windowInfo.statusBarHeight + 44 + (rect.bottom - rect.top) / 2
      });
      await page.waitFor(1000);
      expect(await page.data('data.isItemClickTrigger')).toBe(true);
      await setPageData({
        isItemClickTrigger: false
      })
      await program.navigateTo("/pages/component/rich-text/rich-text-tags");
      await page.waitFor(500);
      await program.navigateBack();
      await program.tap({
        x: (rect.right - rect.left) / 2,
        y: windowInfo.statusBarHeight + 44 + (rect.bottom - rect.top) / 2
      });
      await page.waitFor(1000);
      expect(await page.data('data.isItemClickTrigger')).toBe(true);
      await setPageData({
        autoTest: false
      })
    });
  }

  it('rich-text parent click', async () => {
    const element = await page.$('#rich-text-parent')
    await element.tap()
    await page.waitFor(500)
    const element2 = await page.$('#rich-text-str')
    expect(await element2.text()).toBe("true")
  })

  it('test style font-size-12px', async () => {
    await page.callMethod('changeFontSize')
    await page.waitFor(500)
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })

  it('test style font-size-16px', async () => {
    await page.callMethod('changeFontSize')
    await page.waitFor(500)
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
    // 重置为默认
    await setPageData({
      fontSizeIndex: 0,
      currentFontSize: '默认',
      richTextStyle: 'border: 1px; border-style: solid; border-color: red;'
    })
    await page.waitFor(300)
  })

  it('test style line-height-1', async () => {
    await page.callMethod('changeLineHeight')
    await page.waitFor(500)
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })

  it('test style line-height-1.5', async () => {
    await page.callMethod('changeLineHeight')
    await page.waitFor(500)
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
    // 重置为默认
    await setPageData({
      lineHeightIndex: 0,
      currentLineHeight: '默认',
      richTextStyle: 'border: 1px; border-style: solid; border-color: red;'
    })
    await page.waitFor(300)
  })

  it('test style font-family-serif', async () => {
    await page.callMethod('changeFontFamily')
    await page.waitFor(500)
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })

  it('test style font-family-sans-serif', async () => {
    await page.callMethod('changeFontFamily')
    await page.waitFor(500)
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
    // 重置为默认
    await setPageData({
      fontFamilyIndex: 0,
      currentFontFamily: '默认',
      richTextStyle: 'border: 1px; border-style: solid; border-color: red;'
    })
    await page.waitFor(300)
  })
})
