const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isApp = (isAndroid || isIOS || isHarmony) && !isAppWebView

const PAGE_PATH = '/pages/API/get-file-system-manager/rename-issue-26433'


describe('rename-issue-26433', () => {
  if (!isApp) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page;

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
  });


  it('testRenameDir', async () => {
    await setPageData({
      logAble: false,
      renamePath: ''
    })
    const renameDir = await page.$('#renameDir')
    await renameDir.tap()
    await page.waitFor(300);
    const data = await page.data("data.renamePath")
    expect(data).toEqual('unifile://usr/uni-store2')
  });

  it('testRenameFile', async () => {
    await setPageData({
      logAble: false,
      renamePath: ''
    })
    const renameFile = await page.$('#renameFile')
    await renameFile.tap()
    await page.waitFor(300);
    const data = await page.data("data.renamePath")
    expect(data).toEqual('unifile://usr/uni-store/2.txt')
  });

});


