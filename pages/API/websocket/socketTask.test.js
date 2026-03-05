const PAGE_PATH = '/pages/API/websocket/socketTask'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('ExtApi-WebSocket', () => {
  if(isMP) {
    it('skip', async () => {
      // 小程序平台开发工具只允许两个socket连接，uni-push、自动化测试个占据一个，此示例必然失败
      expect(1).toBe(1)
    })
    return
  }

  let page;
  let res;
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
    await page.callMethod('jest_connectSocket');
    await page.waitFor(1500);
    res = await page.data('data.jest_result');
  });

  it('Check ', async () => {
    expect(res).toBe(2);
  });
});
