// uni-app自动化测试教程: uni-app自动化测试教程: https://uniapp.dcloud.net.cn/worktile/auto/hbuilderx-extension/

describe('transition event', () => {
    let page;
    beforeAll(async () => {
        page = await program.reLaunch('/pages/component/global-events/transition-events')
        await page.waitFor(3000);
    });

    it('transitionend', async () => {
        await page.callMethod('switchBtn')
        await page.waitFor(3000)
        expect(await page.data("data.onTransitionEndTriggr")).toBe(true)
        await page.callMethod('switchBtn')
        await page.waitFor(200)
        expect(await page.data("data.onTransitionEndTriggr")).toBe(false)
        await page.callMethod('switchBtn')
        await page.waitFor(3000)
        expect(await page.data("data.onTransitionEndTriggr")).toBe(true)
    });
});
