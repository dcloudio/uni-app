describe('test element-get-attribute', () => {
  let page;
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.startsWith('android')
  const isIos = platformInfo.startsWith('ios')
  const isApp = isAndroid || isIos
  const isWeb = platformInfo.startsWith('web')
  const isMP = platformInfo.startsWith('mp')
  const isMpAlipay = platformInfo === 'mp-alipay'
  const isHarmony = platformInfo.startsWith('harmony')
  const isVapor = process.env.UNI_APP_X_DOM2 === "true"

  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/element-get-attribute/element-get-attribute')
    await page.waitFor(3000);
  });
  it('check getAttributeId', async () => {
    await page.callMethod('getAttributeId')
    expect(await page.data('data.attrId')).toEqual('box');
  });
  it('check setStyle getAttributeStyle', async () => {
    await page.callMethod('setStyle')
    await page.waitFor(500)
    if(isWeb||isMP){
      await page.callMethod('getAttributeStyle')
      const attrStyle = isMP?'background-color:#FFF000;':'background-color: rgb(255, 240, 0);'
      expect(await page.data('data.attrStyle')).toEqual(attrStyle);
    }
  });
  it('check getPropertyValue', async () => {
    await page.callMethod('getPropertyValue')
    await page.waitFor(1000)
    const propertyValueData = await page.data('data.propertyValue')
    const value = isVapor || isWeb ? 'rgb(255, 240, 0)' : '#FFF000'
    expect(propertyValueData).toBe(value)
  });

  //暂时仅处理android平台和鸿蒙平台
  if(isAndroid || isHarmony) {
		it('check getScrollViewStyleMarginTop', async () => {
			await page.waitFor(1000)
		  const marginTop = await page.callMethod('getScrollViewStyleMarginTop')
		  expect(marginTop).toEqual(isVapor ? "15px" : "15");
		})
	}

  it('getBoundingClientRectSync', async () => {
    await page.callMethod("getBoundingClientRectAsyncChild");
    await page.waitFor(100)
    const rectInfo = await page.data("data.rectInfo")
    const systemInfo = await program.systemInfo();
    const width = systemInfo.screenWidth
    expect(Math.round(rectInfo.x)).toBe(15)
    expect(Math.round(rectInfo.y) >= 242).toBe(true)
    expect(width - 15 * 2 - Math.round(rectInfo.width) >= 0).toBe(true)
    expect(Math.round(rectInfo.height)).toBe(100)
    expect(Math.round(rectInfo.left)).toBe(15)
    expect(Math.round(rectInfo.top) >= 242).toBe(true)
    expect(width - 15 - Math.round(rectInfo.right) >= 0).toBe(true)
    expect(Math.round(rectInfo.bottom) >= 342).toBe(true)
  })
  if((isApp||isMP) && !isMpAlipay){
    it('check scrollTo', async () => {
      await page.callMethod('scrollTo')
      await page.waitFor(100);
      const scrollView =  await page.$('.scroll-view_H')
      expect(await scrollView.property('scrollLeft')).toBe(200);
    });
  }
  if (!isMP) {
    it('getBoundingClientRect-scaledView', async () => {
      await page.callMethod("handleGetScaledViewSize");
      const scaledViewWidth = await page.data("data.scaledViewWidth")
      const scaledViewHeight = await page.data("data.scaledViewHeight")
      // Android 差异尺寸：99.809525
      expect(scaledViewWidth).toBeGreaterThan(99.5);
      expect(scaledViewHeight).toBeGreaterThan(99.5);
    })
  }

  it('scroll offset', async () => {
    const scrollOffset = await page.data("scrollOffset")
    expect(scrollOffset.scrollTop).toBe(0)
    // expect(scrollOffset.scrollHeight).toBe(150)
    expect(scrollOffset.scrollWidth).toBe(scrollOffset.width)
    expect(scrollOffset.scrollLeft).toBe(0)
  })
});
