// uni-app自动化测试教程: https://uniapp.dcloud.net.cn/worktile/auto/hbuilderx-extension/

describe('css-font-family', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/text/font-family');
    await page.waitFor('view');
    await page.waitFor(3000);
  });

  it('screenshot', async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  });
});
