const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const args = platformInfo.split(' ')
const version = parseFloat(args[args.length - 1])

describe('recorder', () => {
  if (!isAndroid || (isAndroid && version < 9)) {
    it('app', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/get-recorder-manager/get-recorder-manager')
    await page.waitFor(600);
  });
  it('onError', async () => {
    await page.waitFor(100)
    const btnError = await page.$('#btn-error')
    await btnError.tap()
    await page.waitFor(200)
    expect(await page.data('data.registerError')).toBeTruthy()
  });
  it('start and onStart', async () => {
    await page.waitFor(1000)
    const btnStart = await page.$('#btn-startRecord')
    await btnStart.tap()
    await page.waitFor(200)
    expect(await page.data('data.recording')).toBeTruthy()
  })

  it('onStop', async () => {
    await page.waitFor(1000)
    const btnStop = await page.$('#btn-stopRecord')
    await btnStop.tap()
    await page.waitFor(200)
    expect(await page.data('data.recording')).toBeFalsy()
  });
  it('startPlay', async () => {
    await page.waitFor(100)
    const startPlay = await page.$('#btn-startPlay')
    await startPlay.tap()
    await page.waitFor(200)
    expect(await page.data('data.playing')).toBeTruthy()
  });

  it('stopPlay', async () => {
    await page.waitFor(100)
    const stopPlay = await page.$('#btn-stopPlay')
    await stopPlay.tap()
    await page.waitFor(200)
    expect(await page.data('data.playing')).toBeFalsy()
  });
});
