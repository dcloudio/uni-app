const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')

describe('/pages/template/long-list-deleteable/long-list-deleteable.uvue', () => {
  if (isWeb || isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/long-list-deleteable/long-list-deleteable')
    await page.waitFor(600);
  })

  it('delete item', async () => {
    await page.callMethod('jest_getListRect')
    // 状态栏+标题栏高度 此处不额外计算，直接加100
    const listTop = await page.data('data.listTop') + 100;
    const listWidth = await page.data('data.listWidth');
    console.log(listTop, listWidth)
    await program.swipe({
      startPoint: {
        x: 300,
        y: listTop + 20
      },
      endPoint: {
        x: 100,
        y: listTop + 20
      },
      duration: 300
    })
    await page.waitFor(500);

    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot();

    await program.tap({x: listWidth - 30, y: listTop + 20})
    await page.waitFor(500);

    const image2 = await program.screenshot({ fullPage: true });
    expect(image2).toSaveImageSnapshot();
  });

});
