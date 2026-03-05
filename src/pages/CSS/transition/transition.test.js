// uni-app自动化测试教程: https://uniapp.dcloud.net.cn/worktile/auto/hbuilderx-extension/

describe('/pages/CSS/transition/transition.uvue', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/transition/transition')
    await page.waitFor(2000);
  });

  it("snap transition finish", async () => {
    await page.callMethod('changeWidthOrHeight')
    await page.callMethod('changeWidthProgress')
    await page.callMethod('changeMargin')
    await page.callMethod('changePadding')
    await page.callMethod('changeBackground')
    await page.callMethod('changeBackground2')
    await page.callMethod('changeStyleOpacity')
    await page.callMethod('propertyChangeBackground')
    await page.callMethod('changeTransform')
    await page.callMethod('changeTransformTranslate')
    await page.callMethod('changeTransformWithWidth')
    await page.callMethod('changeTransformWithOrigin')
    await page.callMethod('changeBorder')
    await page.callMethod('changestylePosition')
    // changeTransitionAll
    await page.callMethod('changeTransitionAll')
    await page.callMethod('changeWidthInEndFun')
    await page.callMethod("changeBorderAndBackgroundColor")
    // 等待动画完成
    await page.waitFor(2000)
		var changeWidthInEndCount = await page.callMethod('getChangeWidthInEndCount')
    expect(changeWidthInEndCount).toEqual(1)
    await page.waitFor(3000)
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
});
