const BUTTON_PAGE_PATH = '/pages/component/button/button';
const PAGE_CONTAINER_PAGE_PATH = '/pages/component/page-container/page-container';
const isMpAlipay = process.env.uniTestPlatformInfo.toLocaleLowerCase() === 'mp-alipay';

describe('page-container.uvue', () => {
  if (isMpAlipay) {
    it('not support', () => {
      expect(1).toBe(1);
    });
    return;
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch(BUTTON_PAGE_PATH);
    await page.waitFor('scroll-view');

    await page.waitFor(500);

    page = await program.navigateTo(PAGE_CONTAINER_PAGE_PATH);
    await page.waitFor('scroll-view');
  });

  it('position', async () => {
    const button = await page.$('.mt-5');
    await button.tap();
    await page.waitFor(500);

    const containerContent = await page.$('.container-content');
    expect(await containerContent.text()).toBe('容器从 底部 弹出');

    await page.callMethod('navigateBack');
    await page.waitFor(500);

    expect(await page.data('data.onAfterLeaveCallCount')).toBe(1);

    const currentPage = await program.currentPage();
    expect(currentPage.path).toBe(PAGE_CONTAINER_PAGE_PATH.substring(1));

    const rightButton = await page.$('#right-button');
    await rightButton.tap();
    await page.waitFor(500);

    const rightContainerContent = await page.$('.container-content');
    expect(await rightContainerContent.text()).toBe('容器从 右侧 弹出');

    await page.callMethod('navigateBack');
    await page.waitFor(500);

    expect(await page.data('data.onAfterLeaveCallCount')).toBe(2);

    const rightCurrentPage = await program.currentPage();
    expect(rightCurrentPage.path).toBe(PAGE_CONTAINER_PAGE_PATH.substring(1));
  });

  it('round', async () => {
    const roundButton = await page.$('#round-button');
    await roundButton.tap();
    await page.waitFor(500);

    const roundContainerContent = await page.$('.container-content');
    expect(await roundContainerContent.text()).toBe('弹窗圆角: true');

    const closeRoundButton = await page.$('#close-round-button');
    await closeRoundButton.tap();
    await page.waitFor(500);

    const closeRoundContainerContent = await page.$('.container-content');
    expect(await closeRoundContainerContent.text()).toBe('弹窗圆角: false');
  });

  describe('zIndex、duration属性与事件', () => {
    beforeEach(async () => {
      // 隔离原用例尚未关闭的弹层及上一条用例的事件记录。
      page = await program.reLaunch(PAGE_CONTAINER_PAGE_PATH);
      await page.waitFor('#duration-slider');
    });

    it.each([100, 300])('z-index：A=200、B=%i 重叠截图', async (initialValue) => {
      await page.callMethod('openZIndexExample', initialValue);
      // A 进入后自动打开 B，等待 B 的真实 afterenter，避免截到动画中间帧。
      await page.waitFor(async () => (await page.data('exampleData.zIndexBReady')) === true);
      await page.waitFor(200);
      try {
        const image = await program.screenshot({ fullPage: false });
        expect(image).toSaveImageSnapshot();
      } finally {
        await page.callMethod('closeZIndexExample');
      }
    });

    it('生命周期：进入、退出顺序与次数，重新打开清空记录', async () => {
      const enterEvents = ['beforeenter', 'enter', 'afterenter'];
      const fullEvents = [...enterEvents, 'beforeleave', 'leave', 'afterleave'];
      for (let round = 0; round < 2; round++) {
        await page.callMethod('openEventContainer');
        await page.waitFor(async () => {
          return (await page.data('exampleData.eventContainerLog')).includes('afterenter');
        });
        expect(await page.data('exampleData.eventContainerLog')).toEqual(enterEvents);
        await page.callMethod('closeEventContainer');
        await page.waitFor(async () => {
          return (await page.data('exampleData.eventContainerLog')).includes('afterleave');
        });
        expect(await page.data('exampleData.eventContainerLog')).toEqual(fullEvents);
        expect(await page.data('exampleData.eventContainerShow')).toBe(false);
        const log = await page.$('#container-event-log');
        expect(await log.text()).toBe(fullEvents.join(' → '));
      }
    });
  });

});
