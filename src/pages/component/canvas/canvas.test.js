let page

beforeAll(async () => {
  // if (!process.env.uniTestPlatformInfo.toLowerCase().startsWith('web')) {
  //   return
  // }
  page = await program.reLaunch('/pages/component/canvas/canvas')
  await page.waitFor(500)
})

describe('Canvas.uvue', () => {
  it('toBlob', async () => {
    if (process.env.uniTestPlatformInfo.toLowerCase().startsWith('web')) {
      const testToBlobResult = await page.data('data.testToBlobResult')
      const testToDataURLResult = await page.data('data.testToDataURLResult')

      expect(testToBlobResult).toBe(true)
      expect(testToDataURLResult).toBe(true)
    } else {
      // app skip
      expect(true).toBe(true)
    }
  })
  it("测试异步创建canvas上下文", async () => {
    // await page.callMethod('useAsync');
    await page.waitFor(500)
    const element = await page.$('#testCanvasContext')
    expect(await element.text()).toBe('true')
  })
  it('测试异步创建 canvas 上下文有无 in 参数', async()=>{
    await page.waitFor(500)
    const element = await page.$('#createCanvasContextAsync')
    await element.tap()
    await page.waitFor(50)
    expect(await element.text()).toBe('true')
  })
  // it("测试同步创建canvas上下文", async () => {
  //   await page.callMethod('useAsync');
  //   const element = await page.$('#testCanvasContext')
  //   expect(await element.text()).toBe('true')
  // })
  it('测试 canvasToDataURL', async () => {
    await page.callMethod('canvasToDataURL');
    const element = await page.$('#testToDataURLResult')
    expect(await element.text()).toBe('true')
  })
  // 配合安卓注释
  it('测试 createImage', async () => {
    if (process.env.uniTestPlatformInfo.toLowerCase().startsWith('web')) {
      // web skip
      expect(true).toBe(true)
    } else {
      await page.callMethod('onCreateImage');
      await page.waitFor(500) // 加载图片
      const element = await page.$('#testCreateImage')
      expect(await element.text()).toBe('true')
    }
  })
  it('测试 testCreatePath2D', async () => {
    // onCreatePath2D
    await page.callMethod('onCreatePath2D');
    await page.waitFor(50)
    const element = await page.$('#testCreatePath2D')
    expect(await element.text()).toBe('true')
  })
  it('child multi root node', async () => {
    await page.waitFor(50)
    const testCounter = await page.data('data.testCounter')
    expect(testCounter).toBe(2)
  })
})
