const PAGE_PATH = '/pages/API/event-bus/event-bus'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIos = platformInfo.startsWith('ios')

describe('event-bus', () => {
  if (isIos) {
  	it('skip ios', () => {
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
    await page.callMethod('on')
    await page.callMethod('emit')
    const l1 = (await page.data('data')).log.length
    expect(l1).toBe(1)
    await page.callMethod('clear')
    await page.callMethod('emit')
    const l2 = (await page.data('data')).log.length
    expect(l2).toBe(1)
    await page.callMethod('clear')
    await page.callMethod('on')
    await page.callMethod('emit')
    const l3 = (await page.data('data')).log.length
    expect(l3).toBe(2)
    await page.callMethod('clear')
    await page.callMethod('off')
    await page.callMethod('emit')
    const l4 = (await page.data('data')).log.length
    expect(l4).toBe(1)
    await page.callMethod('clear')
    await page.callMethod('off')
    await page.callMethod('emit')
    const l5 = (await page.data('data')).log.length
    expect(l5).toBe(0)
  })

  it('once', async () => {
    await page.callMethod('clear')
    await page.callMethod('once')
    await page.callMethod('emit')
    const l1 = (await page.data('data')).log.length
    expect(l1).toBe(1)
    await page.callMethod('clear')
    await page.callMethod('emit')
    const l2 = (await page.data('data')).log.length
    expect(l2).toBe(0)
    await page.callMethod('clear')
    await page.callMethod('once')
    await page.callMethod('off')
    await page.callMethod('emit')
    const l3 = (await page.data('data')).log.length
    expect(l3).toBe(0)
  })

  it('emit object params', async () => {
    await page.callMethod('onObj')
    await page.callMethod('emitWithObj')
    const objArg = await page.data('data.objArg')
    expect(objArg.a).toBe(1)
    expect(objArg.b).toBe(2)
  })

  it('off-all', async () => {
    await page.callMethod('clear')
    await page.callMethod('on')
    await page.callMethod('on2')
    await page.callMethod('emit')
    const l1 = (await page.data('data')).log.length
    expect(l1).toBe(2)

    await page.callMethod('clear')
    const l2 = (await page.data('data')).log.length
    expect(l2).toBe(0)

    await page.callMethod('offAll')
    await page.callMethod('emit')
    const l3 = (await page.data('data')).log.length
    expect(l3).toBe(0)
  })
  it('test return id', async () => {
    await page.callMethod('clear')
    expect((await page.data('data')).log.length).toBe(0)
    await page.callMethod('testReturnId')
    const logs = await page.data('data.log')
    expect(logs.length).toBe(2)
    expect(logs[0]).toBe('触发 test-return-id $on fn')
    expect(logs[1]).toBe('触发 test-return-id $once fn')
  })
  it('test $emit no args', async () => {
    await page.callMethod('clear')
    expect((await page.data('data')).log.length).toBe(0)
    await page.callMethod('testEmitNoArgs')
    const logs = await page.data('data.log')
    expect(logs.length).toBe(1)
    expect(logs[0]).toBe('test-emit-no-args')
  })
  it('test $emit multiple args', async () => {
    await page.callMethod('clear')
    expect((await page.data('data')).log.length).toBe(0)
    await page.callMethod('testEmitMultipleArgs')
    const logs = await page.data('data.log')
    expect(logs.length).toBe(1)
    expect(logs[0]).toBe('arg1_2')
  })

})
