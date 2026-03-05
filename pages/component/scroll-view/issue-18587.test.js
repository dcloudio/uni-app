const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('issue-18587', () => {
    if(isMP || isWeb) {
      // 不支持scrollend事件
      it('not support', async() => {
        expect(1).toBe(1)
      })
      return
    }

    let page;
    beforeAll(async () => {
        page = await program.reLaunch('/pages/component/scroll-view/issue-18587');
        await page.waitFor(300);
    });

    //检测竖向scrolltop属性赋值
    it('check_scroll_end', async () => {
      await page.callMethod('scrollTo', 100)
      await page.waitFor(300)
      await page.callMethod('scrollTo', 200)
      await page.waitFor(300)
      await page.callMethod('scrollTo', 300)
      await page.waitFor(300)
      const scrollEndTriggeredTimes = await page.data('data.scrollEndTriggeredTimes')
      expect(scrollEndTriggeredTimes).toBe(3)
    })
});
