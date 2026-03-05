const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIOS || isHarmony
const isSafari = platformInfo.indexOf('safari') > -1

describe('API-intersection-observer', () => {
	if (isApp || isSafari) {
	  it('not support', () => {
	    expect(1).toBe(1)
	  })
	  return
	}
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/create-intersection-observer/create-intersection-observer')
    await page.waitFor('view');
  });

  it('scroll-to-show-ball', async () => {
    await page.setData({data:{scrollTop: 180}})
    await page.waitFor(500)
    // 微信小程序端，仅在基础库3.5.8及以下版本支持scrollTo方法
    // const scrollView = await page.$('.scroll-view')
    // await scrollView.scrollTo(0, 200)
    const appear = await page.data('data.appear')
    expect(appear).toBe(true)
    const testRes = await page.data('data.testRes')
    expect(testRes.intersectionRatio).toBeGreaterThan(0)
    expect(testRes.intersectionRect).toBeDefined()
    expect(testRes.boundingClientRect).toBeDefined()
    expect(testRes.relativeRect).toBeDefined()
    expect(testRes.boundingClientRect.bottom).toBeDefined()
    expect(testRes.boundingClientRect.left).toBeDefined()
    expect(testRes.boundingClientRect.right).toBeDefined()
    expect(testRes.boundingClientRect.top).toBeDefined()
  })

});
