const COMPOSITION_PAGE_PATH = '/pages/reactivity/core/watch/watch-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.includes('android')
const isWeb = platformInfo.includes('web')
const isMP = platformInfo.startsWith('mp')

describe('watch', () => {
  
  if(isMP) {
    // 微信小程序支持此特性，但是示例内部使用了较多的dom api无法兼容微信小程序
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  
  let page = null

  beforeAll(async () => {
    page = await program.reLaunch(COMPOSITION_PAGE_PATH)
    await page.waitFor(1000)
  })

  it('count', async () => {
    const count = await page.$('#count')
    expect(await count.text()).toBe('0')

    // watch
    const watchCountRes = await page.$('#watch-count-res')
    expect(((await watchCountRes.text()) || '').trim()).toBe('')

    // track
    const watchCountTrackNum = await page.$('#watch-count-track-num')
    expect(await watchCountTrackNum.text()).toBe('2')

    const watchCountCleanupRes = await page.$('#watch-count-cleanup-res')
    expect(((await watchCountCleanupRes.text()) || '').trim()).toBe('')

    // watch count and obj.num
    const watchCountAndObjNumRes = await page.$('#watch-count-obj-num-res')
    expect(((await watchCountAndObjNumRes.text()) || '').trim()).toBe('')

    const incrementBtn = await page.$('.increment-btn')
    await incrementBtn.tap()

    expect(await count.text()).toBe('1')

    expect(await watchCountRes.text()).toBe(
      'count: 1, prevCount: 0, count ref text (flush sync): 0')

    if (isAndroid) {
      expect(await watchCountTrackNum.text()).toBe('2')
    } else {
      expect(await watchCountTrackNum.text()).toBe('4')
    }
    expect(((await watchCountCleanupRes.text()) || '').trim()).toBe('')

    expect(await watchCountAndObjNumRes.text()).toBe('state: [1,0], preState: [0,0]')

    await incrementBtn.tap()

    expect(await count.text()).toBe('2')
    expect(await watchCountRes.text()).toBe('count: 2, prevCount: 1, count ref text (flush sync): 1')

    if (isAndroid) {
      expect(await watchCountTrackNum.text()).toBe('2')
    } else {
      expect(await watchCountTrackNum.text()).toBe('6')
    }
    expect(await watchCountCleanupRes.text()).toBe('watch count cleanup: 1')

    expect(await watchCountAndObjNumRes.text()).toBe('state: [2,0], preState: [1,0]')

    // stop watch
    const stopWatchCountBtn = await page.$('.stop-watch-count-btn')
    await stopWatchCountBtn.tap()

    expect(await watchCountCleanupRes.text()).toBe('watch count cleanup: 2')

    await incrementBtn.tap()

    expect(await count.text()).toBe('3')
    expect(await watchCountRes.text()).toBe('count: 2, prevCount: 1, count ref text (flush sync): 1')

    if (isAndroid) {
      expect(await watchCountTrackNum.text()).toBe('2')
    } else {
      expect(await watchCountTrackNum.text()).toBe('6')
    }
    expect(await watchCountCleanupRes.text()).toBe('watch count cleanup: 2')

    expect(await watchCountAndObjNumRes.text()).toBe('state: [3,0], preState: [2,0]')
  })

  it('obj', async () => {
    const objStr = await page.$('#obj-str')
    expect(await objStr.text()).toBe('num: 0')
    const objNum = await page.$('#obj-num')
    expect(await objNum.text()).toBe('0')
    const objBool = await page.$('#obj-bool')
    expect(await objBool.text()).toBe('false')
    const objArr = await page.$('#obj-arr')
    expect(await objArr.text()).toBe('[0]')

    const watchObjRes = await page.$('#watch-obj-res')
    if (isAndroid) {
      expect(await watchObjRes.text()).toBe(
        'obj: {"arr":[0],"bool":false,"num":0,"str":"num: 0"}, prevObj: {"arr":[0],"bool":false,"num":0,"str":"num: 0"}'
      )
    }
    if (isWeb) {
      expect(await watchObjRes.text()).toBe(
        'obj: {"num":0,"str":"num: 0","bool":false,"arr":[0]}, prevObj: null'
      )
    }
    const watchObjStrRes = await page.$('#watch-obj-str-res')
    expect(((await watchObjStrRes.text()) || '').trim()).toBe('')

    // trigger
    const watchObjStrTriggerNum = await page.$('#watch-obj-str-trigger-num')
    expect(await watchObjStrTriggerNum.text()).toBe('0')

    const watchObjBoolRes = await page.$('#watch-obj-bool-res')
    expect(((await watchObjBoolRes.text()) || '').trim()).toBe('')
    const watchObjArrRes = await page.$('#watch-obj-arr-res')
    expect(((await watchObjArrRes.text()) || '').trim()).toBe('')

    const updateObjBtn = await page.$('.update-obj-btn')
    await updateObjBtn.tap()

    expect(await objStr.text()).toBe('num: 1')
    expect(await objNum.text()).toBe('1')
    expect(await objBool.text()).toBe('true')
    expect(await objArr.text()).toBe('[0,1]')

    if (isAndroid) {
      expect(await watchObjRes.text()).toBe(
        'obj: {"arr":[0,1],"bool":true,"num":1,"str":"num: 1"}, prevObj: {"arr":[0,1],"bool":true,"num":1,"str":"num: 1"}'
      )
    }
    if (isWeb) {
      expect(await watchObjRes.text()).toBe(
        'obj: {"num":1,"str":"num: 1","bool":true,"arr":[0,1]}, prevObj: {"num":1,"str":"num: 1","bool":true,"arr":[0,1]}'
      )
    }
    expect(await watchObjStrRes.text()).toBe(
      'str: num: 1, prevStr: num: 0, obj.str ref text (flush pre): num: 0')

    expect(await watchObjStrTriggerNum.text()).toBe('1')

    expect(await watchObjBoolRes.text()).toBe(
      'bool: true, prevBool: false, obj.bool ref text (flush post): true'
    )
    expect(await watchObjArrRes.text()).toBe('arr: [0,1], prevArr: [0,1]')

    const watchCountAndObjNumRes = await page.$('#watch-count-obj-num-res')
    if (watchCountAndObjNumRes) {
      expect(await watchCountAndObjNumRes.text()).toBe('state: [3,1], preState: [3,0]')
    }
  })
})