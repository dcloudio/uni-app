jest.setTimeout(50000);

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isApp = isAndroid || isIOS || isHarmony && !isAppWebView

const PAGE_PATH = '/pages/API/get-file-system-manager/testStatic'


describe('ExtApi-FileManagerTest-aboutStatic', () => {
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
    await page.waitFor('text');
    await page.waitFor(600);
  });

  it('testAccessFile', async () => {
    await setPageData({
      logAble: false,
      isSuccess: false,
    })
    const testAccessFile = await page.$('#testAccessFile')
    await testAccessFile.tap()
    await page.waitFor(300);
    const isSuccess = await page.data('data.isSuccess')
    expect(isSuccess).toEqual(true)
  });

  it('testAccessDir', async () => {
    await setPageData({
      logAble: false,
      isSuccess: false,
    })
    const testAccessDir = await page.$('#testAccessDir')
    await testAccessDir.tap()
    await page.waitFor(300);
    const isSuccess = await page.data('data.isSuccess')
    expect(isSuccess).toEqual(true)
  });


  it('testCopyFile', async () => {
    await setPageData({
      logAble: false,
      isSuccess: false,
    })
    const testCopyFile = await page.$('#testCopyFile')
    await testCopyFile.tap()
    await page.waitFor(300);
    const isSuccess = await page.data('data.isSuccess')
    expect(isSuccess).toEqual(true)
  });


  it('testReadDir', async () => {
    await setPageData({
      logAble: false,
      isSuccess: false,
    })
    const testReadDir = await page.$('#testReadDir')
    await testReadDir.tap()
    await page.waitFor(300);
    const isSuccess = await page.data('data.isSuccess')
    expect(isSuccess).toEqual(true)
  });

  it('testFstatFile', async () => {
    await setPageData({
      logAble: false,
      isSuccess: false,
    })
    const testFstatFile = await page.$('#testFstatFile')
    await testFstatFile.tap()
    await page.waitFor(300);
    const isSuccess = await page.data('data.isSuccess')
    expect(isSuccess).toEqual(true)
  });

  it('testReadZipEntry', async () => {
    await setPageData({
      logAble: false,
      isSuccess: false,
    })
    const testReadZipEntry = await page.$('#testReadZipEntry')
    await testReadZipEntry.tap()
    await page.waitFor(300);
    const isSuccess = await page.data('data.isSuccess')
    expect(isSuccess).toEqual(true)
  });

});


