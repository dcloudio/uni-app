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
        page = await program.reLaunch('/pages/component/scroll-view/issue-18773');
        await page.waitFor(300);
    });

    //首次不触发scrollend事件
    it('check_scroll_end_test1', async () => {
      await page.callMethod('scrollTo')
      await page.waitFor(1000)
      const scrollEndTriggeredTimes = await page.data('data.scrollEndTriggeredTimes')
      expect(scrollEndTriggeredTimes).toBe(0)
    })

    //触发scrollend事件
    it('check_scroll_end_test2', async () => {
      await page.callMethod('scrollTo')
      await page.waitFor(1000)
      const scrollEndTriggeredTimes = await page.data('data.scrollEndTriggeredTimes')
      expect(scrollEndTriggeredTimes).toBe(1)
    })
});
