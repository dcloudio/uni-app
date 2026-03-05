const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

describe('issue-16162', () => {
  if (isMP || isWeb) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
  }
  let page

  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/list-view/issue-16126')
    await page.waitFor(600)
  })

  if(!isDom2) {
    it('issue16934', async () => {
      await page.callMethod('setScrollTop', 2000)
      await page.waitFor(2000)
      await page.setData({
        data: {
          intoview: 'item1'
        }
      })
      await page.waitFor(600)
      const scrollTop = await page.callMethod('getScrollTop')
      expect(scrollTop).toBe(0)
    })
  }

  it('issue16162', async () => {
    await page.waitFor(1000);
    // 模拟滑动
    await program.swipe({
      startPoint: {x: 50,y: 300},
      endPoint: {x: 50,y: 0},
      duration: 100
    })
    await page.waitFor(500)

    // 模拟滑动
    await program.swipe({
      startPoint: {x: 50,y: 300},
      endPoint: {x: 50,y: 0},
      duration: 100
    })
    await page.waitFor(500)

    await page.callMethod('changeSize')
    await page.waitFor(500)

    // 模拟滑动
    await program.swipe({
      startPoint: {x: 50,y: 300},
      endPoint: {x: 50,y: 0},
      duration: 100
    })
    await page.waitFor(500)

    // 模拟滑动
    await program.swipe({
      startPoint: {x: 50,y: 150},
      endPoint: {x: 50,y: 400},
      duration: 100
    })
    await page.waitFor(2000)

    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
