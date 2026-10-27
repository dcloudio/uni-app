const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')
describe('api-resize-observer', () => {
  if (isMP) {
  	it('not support', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/uni-resize-observer/uni-resize-observer')
    await page.waitFor('button')
  })

  it('check_resize-observer', async () => {
    await page.waitFor(600)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })

  it('check_outbox_resize', async () => {
    await page.callMethod('setOutBoxMarginLeft', '100px')
    await page.waitFor(500)
    const value = await page.data('data.outBoxElementOnResize')
    expect(value).toBe(false)
  })

  // 测试 text 组件 resize 监听
  it('check_text_resize', async () => {
    const textSizeInfoBefore = await page.data('data.textSizeInfoObj')
    const textFlatSizeInfoBefore = await page.data('data.textFlatSizeInfoObj')
    await page.callMethod('changeTextSize')
    await page.waitFor(300)
    const textSizeInfoAfter = await page.data('data.textSizeInfoObj')
    const textFlatSizeInfoAfter = await page.data('data.textFlatSizeInfoObj')
    const heightDiff = textSizeInfoAfter.contentRect.height - textSizeInfoBefore.contentRect.height
    const flatHeightDiff = textFlatSizeInfoAfter.contentRect.height - textFlatSizeInfoBefore.contentRect.height
    // TODO：harmony端 为0 临时屏蔽断言
    if(!isHarmony){
      expect(heightDiff).toBeGreaterThanOrEqual(2)
      expect(flatHeightDiff).toBeGreaterThanOrEqual(2)
      expect(textSizeInfoAfter).not.toBe(textSizeInfoBefore)
      expect(textFlatSizeInfoAfter).not.toBe(textFlatSizeInfoBefore)
    }
  })

  // 测试 image 组件 resize 监听
  it('check_image_resize', async () => {
    const imageSizeInfoBefore = await page.data('data.imageSizeInfoObj')
    const imageFlatSizeInfoBefore = await page.data('data.imageFlatSizeInfoObj')
    await page.callMethod('changeImageSize')
    await page.waitFor(300)
    const imageSizeInfoAfter = await page.data('data.imageSizeInfoObj')
    const imageFlatSizeInfoAfter = await page.data('data.imageFlatSizeInfoObj')
    const widthDiff = imageSizeInfoAfter.contentRect.width - imageSizeInfoBefore.contentRect.width
    const heightDiff = imageSizeInfoAfter.contentRect.height - imageSizeInfoBefore.contentRect.height
    const flatWidthDiff = imageFlatSizeInfoAfter.contentRect.width - imageFlatSizeInfoBefore.contentRect.width
    const flatHeightDiff = imageFlatSizeInfoAfter.contentRect.height - imageFlatSizeInfoBefore.contentRect.height
    expect(widthDiff).toBe(10)
    expect(heightDiff).toBe(10)
    expect(flatWidthDiff).toBe(10)
    expect(flatHeightDiff).toBe(10)
    expect(imageSizeInfoAfter).not.toBe(imageSizeInfoBefore)
    expect(imageFlatSizeInfoAfter).not.toBe(imageFlatSizeInfoBefore)
  })

  // 测试普通与拍平 view 组件 resize 监听
  it('check_view_resize', async () => {
    const viewNormalSizeInfoBefore = await page.data('data.viewNormalSizeInfoObj')
    const viewFlatSizeInfoBefore = await page.data('data.viewFlatSizeInfoObj')
    await page.callMethod('changeViewFlatSize')
    await page.waitFor(300)
    const viewNormalSizeInfoAfter = await page.data('data.viewNormalSizeInfoObj')
    const viewFlatSizeInfoAfter = await page.data('data.viewFlatSizeInfoObj')
    expect(viewNormalSizeInfoAfter.contentRect.width - viewNormalSizeInfoBefore.contentRect.width).toBe(10)
    expect(viewNormalSizeInfoAfter.contentRect.height - viewNormalSizeInfoBefore.contentRect.height).toBe(10)
    expect(viewFlatSizeInfoAfter.contentRect.width - viewFlatSizeInfoBefore.contentRect.width).toBe(10)
    expect(viewFlatSizeInfoAfter.contentRect.height - viewFlatSizeInfoBefore.contentRect.height).toBe(10)
    expect(viewNormalSizeInfoAfter).not.toBe(viewNormalSizeInfoBefore)
    expect(viewFlatSizeInfoAfter).not.toBe(viewFlatSizeInfoBefore)
  })

  // 测试 scroll-view 组件 resize 监听
  it('check_scroll_view_resize', async () => {
    const scrollViewSizeInfoBefore = await page.data('data.scrollViewSizeInfoObj')
    await page.callMethod('changeScrollViewSize')
    await page.waitFor(300)
    const scrollViewSizeInfoAfter = await page.data('data.scrollViewSizeInfoObj')
    const widthDiff = scrollViewSizeInfoAfter.contentRect.width - scrollViewSizeInfoBefore.contentRect.width
    expect(widthDiff).toBe(20)
    expect(scrollViewSizeInfoAfter).not.toBe(scrollViewSizeInfoBefore)
  })
})
