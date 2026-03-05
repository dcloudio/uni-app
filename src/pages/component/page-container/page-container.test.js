const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase();
const isMP = platformInfo.startsWith('mp');

const PAGE_PATH = '/pages/component/page-container/page-container';

describe('page-container.uvue', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH);
    await page.waitFor('scroll-view');
  });

  it('position', async () => {
    const button = await page.$('.mt-5');
    await button.tap();
    await page.waitFor(500);

    const containerContent = await page.$('.container-content');
    expect(await containerContent.text()).toBe('容器从 底部 弹出');

    if (isMP) {
      await page.callMethod('closeContainer');
    } else {
      await page.callMethod('navigateBack');
    }
    await page.waitFor(500);

    expect(await page.data('data.onAfterLeaveCallCount')).toBe(1);

    const currentPage = await program.currentPage();
    expect(currentPage.path).toBe(PAGE_PATH.substring(1));

    const rightButton = await page.$('#right-button');
    await rightButton.tap();
    await page.waitFor(500);

    const rightContainerContent = await page.$('.container-content');
    expect(await rightContainerContent.text()).toBe('容器从 右侧 弹出');

    if (isMP) {
      await page.callMethod('closeContainer');
    } else {
      await page.callMethod('navigateBack');
    }
    await page.waitFor(500);

    expect(await page.data('data.onAfterLeaveCallCount')).toBe(2);

    const rightCurrentPage = await program.currentPage();
    expect(rightCurrentPage.path).toBe(PAGE_PATH.substring(1));
  });
});
