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
});
