const PAGE_PATH = '/pages/API/event-bus/uts-event-bus'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIos = platformInfo.startsWith('ios')

describe('event-bus', () => {
  if (isIos) {
  	it('skip ios', () => {
  		expect(1).toBe(1)
  	})
  	return
  }
  const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
  if (!platformInfo.startsWith('ios')) {
    it('pass', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  if (
    platformInfo.indexOf('14.5') != -1 ||
    platformInfo.indexOf('13.7') != -1 ||
    platformInfo.indexOf('12.4') != -1
  ) {
    it('iOS 14.5 13.7 12.4 不支持依赖uts插件测试', () => {
      expect(1).toBe(1)
    })
    return
  }


  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('on', async () => {
    await page.callMethod('clear')
    await page.callMethod('JsOnUts')
    await page.callMethod('emitFromUts')
    const l1 = (await page.data('data')).log.length
    expect(l1).toBeGreaterThan(0)

    await page.callMethod('clear')
    await page.callMethod('emitUtsMessageUTSObject')
    const data = await page.data('data')
    console.log(data)
    expect(data.log.length).toBe(1)
    expect(data.log[0].name).toMatch('金运大厦')

    await page.callMethod('clear')
    await page.callMethod('emitUtsMessages')
    const l12 = (await page.data('data')).log.length
    expect(l12).toBe(2)

    await page.callMethod('clear')
    await page.callMethod('emitUtsMessageNoArgument')
    const l13 = (await page.data('data')).log.length
    expect(l13).toBe(0)

    await page.callMethod('clear')
    await page.callMethod('offUts')
    await page.callMethod('emitFromUts')
    const l2 = (await page.data('data')).log.length
    expect(l2).toBe(0)


    await page.callMethod('clear')
    await page.callMethod('UtsOnJS')
    await page.callMethod('emitFormJS')
    const l3 = (await page.data('data')).log.length
    expect(l3).toBeGreaterThan(0)

    await page.callMethod('clear')
    await page.callMethod('offJs')
    await page.callMethod('emitFormJS')
    const l4 = (await page.data('data')).log.length
    console.log(l4)
    expect(l4).toBe(0)
    await page.callMethod('clear')
  })

  it('once', async () => {
    await page.callMethod('clear')
    await page.callMethod('JsOnUtsOnce')
    await page.callMethod('emitFromUts')
    const l1 = (await page.data('data')).log.length
    expect(l1).toBeGreaterThan(0)
    await page.callMethod('clear')
    await page.callMethod('emitFromUts')
    const l2 = (await page.data('data')).log.length
    expect(l2).toBe(0)

    await page.callMethod('clear')
    await page.callMethod('UtsOnJSOnce')
    await page.callMethod('emitFormJS')
    const l3 = (await page.data('data')).log.length
    expect(l3).toBeGreaterThan(0)
    await page.callMethod('clear')
    await page.callMethod('emitFormJS')
    const l4 = (await page.data('data')).log.length
    expect(l4).toBe(0)

    await page.callMethod('clear')
  })

})
