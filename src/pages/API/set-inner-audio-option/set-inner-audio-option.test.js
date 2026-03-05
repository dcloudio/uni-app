const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const android = platformInfo.startsWith('android')

describe('/pages/API/set-inner-audio-option/set-inner-audio-option', () => {

  if (!android) {
    it('pass', async () => {
      expect(1).toBe(1);
    });
    return;
  }


  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/set-inner-audio-option/set-inner-audio-option')
    await page.waitFor(2000);
  });

  it("mix with other", async () => {
    // 播放背景音频
    await page.callMethod('playBackgroundMusic')
    await page.waitFor(1000)

    // 不与其他音乐同时播放
    await page.callMethod('testInnerAudioOption')
    await page.waitFor(1000)
    // 播放音频
    await page.callMethod('playInnerMusic')
    await page.waitFor(1000)

    const isBackgroundAudioPaused = await page.data('data.isBackgroundAudioPaused')
    expect(isBackgroundAudioPaused).toBe(true)
  })
});
