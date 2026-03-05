describe('css-dynamic-border', () => {
  let page
  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/border/dynamic-border')
    await page.waitFor(600);
  })

  // 左上、右上设置圆角
  it('check_topleft_topright', async () => {
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  })

  // 取消圆角
  it('check_none', async () => {
    await page.callMethod('changeIndex', 2)
    await page.waitFor(100)
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  })

  // 左下，右下设置圆角
  it('check_bottomleft_bottomright', async () => {
    await page.callMethod('changeIndex', 10)
    await page.waitFor(100)
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  })

  it('动态切换为空值', async () => {
    await page.callMethod('setBorderBlank')
    await page.waitFor(100)
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  })
  it('动态切换空值为有值', async () => {
    await page.callMethod('setBorderBlank')
    await page.waitFor(100)
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  })

})
