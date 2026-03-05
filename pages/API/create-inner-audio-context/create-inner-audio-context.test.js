const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.toLocaleLowerCase().startsWith('harmony')
const isSafari = platformInfo.indexOf('safari') > -1
const isAndroid = platformInfo.startsWith('android')
const isWeb = platformInfo.startsWith('web')

describe('inner-audio', () => {
  // safari 浏览器运行正常，playwright 环境下给 Audio 实例 src 属性赋值会崩溃
  if (isMP || isIos || isSafari) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
  page = await program.reLaunch('/pages/API/create-inner-audio-context/create-inner-audio-context')
    await page.waitFor('view');
    await page.waitFor(1000);
  });
  if (isWeb) {
    it('screenshot', async () => {
      const image = await program.screenshot({fullPage: true})
      expect(image).toSaveImageSnapshot();
    });
  }

  it('onCanplay',async()=>{
    await page.waitFor(1000)
    await page.waitFor(async()=>{
      return await page.data('data.isCanplay')
    })
    const isCanplay = await page.data('data.isCanplay')
    if (!isHarmony) {
      expect(await page.data('data.buffered')).toBeGreaterThan(0)
    } else {
      expect(isCanplay).toBe(true)
    }
  })

  it('seek-onSeeking-onSeeked', async () => {
    if (isAndroid) {
    	expect(1).toBe(1)
    	return false
    }

    await page.callMethod('onchangeValue',20)
    const waitTime = isWeb ? 5000:500
    await page.waitFor(waitTime)
    expect(await page.data('data.onSeekingTest')).toBeTruthy();
    expect(await page.data('data.currentTime')).toBe(20);
    // expect(await page.data('onWaitingTest')).toBeTruthy();
    // expect(await page.data('onSeekedTest')).toBeTruthy();
    const image = await program.screenshot({fullPage: true})
    expect(image).toSaveImageSnapshot();
  });

  it('play-onPlay-onTimeUpdate', async () => {
    await page.callMethod('play')
    const waitTime = isWeb ? 5000:3000
    await page.waitFor(waitTime)
    expect(await page.data('data.isPlaying')).toBeTruthy()
    expect(await page.data('data.duration')).toBeCloseTo(175.109, 0);
    // expect(await page.data('currentTime')).toBeGreaterThan(0);
    // expect(await page.data('isPaused')).toBeFalsy();
  });

  it('pause-onPause', async () => {
    await page.callMethod('pause')
    await page.waitFor(500);
    expect(await page.data('data.isPlaying')).toBeFalsy()
    // expect(await page.data('isPaused')).toBeTruthy();
  });

  it('stop-onStop', async () => {
    await page.callMethod('play')
    await page.waitFor(2000);
    // 第一次点停止时，不触发onStop事件
    await page.callMethod('stop')
    await page.callMethod('stop')
    await page.waitFor(1000);
    expect(await page.data('data.isPlaying')).toBeFalsy()
    // expect(await page.data('isPaused')).toBeTruthy();
  });

  it('onEnded', async () => {
    await page.callMethod('onchangeValue',173)
    await page.waitFor(500);
    await page.callMethod('play')
    await page.waitFor(3000);
    // expect(await page.data('isPlayEnd')).toBeTruthy();
  });
  it('onEnded-android', async () => {
    if (!isAndroid) {
      expect(1).toBe(1)
      return
    }
    await page.setData({
    	data:{isPlayEnd: false}
    })
    await page.callMethod('setSrc','file:///android_asset/uni-autoTest/alert2s.mp3')
    await page.callMethod('play')
    await page.waitFor(3000);
    expect(await page.data('data.isPlayEnd')).toBeTruthy();
  });
});
