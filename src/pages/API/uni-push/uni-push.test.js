jest.setTimeout(30000);
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')
describe('uni-push', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/uni-push/uni-push')
    await page.waitFor('view');
    await page.callMethod('updateAutoTest', true)
    await page.data('autoTest')
  });
  // 获取cid | getPushClientId：值
  it('getPushClientId', async () => {
    let jestResult = await page.data('jestResult')
    if (isHarmony && !jestResult.hasGetuiAppId){
      console.log('getPushClientId已跳过。鸿蒙端 Push 测试依赖配置：harmony-configs/entry/src/main/module.json5 → metadata → GETUI_APPID')
      return
    }
    await page.callMethod('handleGetClientId')
    await page.waitFor(2000);
    jestResult = await page.data('jestResult')
    expect(jestResult.clientId.length).toBe(32);
  });

  if(isWeb || isMP){
    // app端需要自定义基座
    // 发送通知消息 | sendPushMessage：成功提示
    it('sendPushMessage', async () => {
      await page.callMethod('handleSendPushMessage')
      await page.waitFor(1000);
      expect(await page.data('jestResult.sendPushMessageRes')).toBe(0);
    });
  }

  // 注册回调 | onPushMessage：成功
  it('onPushMessage', async () => {
    await page.callMethod('handleOnPushMessage')
    await page.waitFor(1000);
    expect(await page.data('isRegister.state')).toBe(true);
  });

  if(isWeb || isMP){
    // 发送通知消息 | sendPushMessage：回调信息
    it('sendPushMessage', async () => {
      await page.callMethod('handleSendPushMessage')
      await page.waitFor(1000);
      expect(await page.data('jestResult.onPushMessageType')).toBe("receive");
      const info = await page.data('jestResult.onPushMessageCallbackInfo')
      // 使用 JSON.parse 将字符串转换回对象
      const objCopy = JSON.parse(info);
      expect(objCopy).toEqual({
        "unipush_version": "2.0",
        "payload": {
          "data": "测试推送数据"
        },
        "title": "测试推送标题",
        "content": "测试推送内容"
      })
    });
  }

  // 注销回调 | offPushMessage：注销成功
  it('offPushMessage', async () => {
    await page.callMethod('handleOffPushMessage')
    await page.waitFor(1000);
    expect(await page.data('isRegister.state')).toBe(false);
  });

  if(isWeb || isMP){
    // 发送通知消息 | sendPushMessage：成功提示
    it('sendPushMessage', async () => {
      await page.callMethod('handleSendPushMessage')
      await page.waitFor(300);
      expect(await page.data('jestResult.sendPushMessageRes')).toBe(0);
    });
  }

});
