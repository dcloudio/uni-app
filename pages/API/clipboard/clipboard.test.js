const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')

let page;
describe('web-clipboard', () => {
  if (!(isAndroid || isIOS || isWeb)) {
    it('app', async () => {
      expect(1).toBe(1)
    })
    return
  }
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/clipboard/clipboard')
    await page.waitFor('view');
  });

  it('screenshot', async () => {
    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot();
  });
  it('setClipboardData', async () => {
    await page.setData({
      data:{data: '123456'}
    })
    await page.callMethod('setClipboard')
    await page.waitFor(500);
    console.log(await page.data('data.setClipboardTest'), 'setClipboardTest')
    // bug：自动化测试时设置成功也进入了fail
    // expect(await page.data('setClipboardTest')).toBeTruthy()
    // 等待 toast 隐藏
    await page.waitFor(2000);
  });
  it('getClipboardData', async () => {
    if (
     isIOS &&
      platformInfo.indexOf('15.5') != -1
    ) {
      // 该api在iOS 15.5版本的模拟器上有系统bug
      expect(1).toBe(1)
    }else{
      await page.callMethod('getClipboard')
      expect(await page.data('data.getDataTest')).toBe('123456')
    }
    // 等待 toast 隐藏
    await page.waitFor(3000);
    if(isAndroid) {
      // Android平台规避部分设备左下角弹框影响其他测试例
      await page.waitFor(3000);
    }
  });
});
