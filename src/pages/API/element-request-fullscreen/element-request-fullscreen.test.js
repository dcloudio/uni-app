const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('/pages/API/element-request-fullscreen/element-request-fullscreen', () => {

  if (isWeb || isMP) {
    it('pass', async () => {
      expect(1).toBe(1);
    });
    return;
  }


  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/element-request-fullscreen/element-request-fullscreen')
    await page.waitFor(2000);
  });

  it("test-fullscreen", async () => {
    // 进入全屏
    await page.callMethod('fullscreen')
    await page.waitFor(1000)

    var fullscreenchange = await page.data('data.fullscreenchangeCount')
    expect(fullscreenchange).toBe(1)

    // 验证进入全屏的回调状态
    var requestCallbackStatus = await page.data('data.requestFullscreenCallbackStatus')
    expect(requestCallbackStatus).toBe(true) // success 回调已执行

    // 退出全屏
    await page.callMethod('fullscreen')
    await page.waitFor(1000)

    fullscreenchange = await page.data('data.fullscreenchangeCount')
    expect(fullscreenchange).toBe(2)

    // 验证退出全屏的回调状态
    var exitCallbackStatus = await page.data('data.exitFullscreenCallbackStatus')
    expect(exitCallbackStatus).toBe(true) // success/fail 回调已执行

    const image2 = await program.screenshot({
      fullPage: true
    })
    expect(image2).toSaveImageSnapshot()
  })
});
