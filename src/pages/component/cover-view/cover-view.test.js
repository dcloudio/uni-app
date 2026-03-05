const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

describe('web-cover-view', () => {
  if (isAppWebView) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  it('screenshot', async () => {
    const page = await program.reLaunch('/pages/component/cover-view/cover-view')
    await page.waitFor('view');

    const startTime = Date.now();
    let checkElementResult = false;

    await page.waitFor(async () => {
      if (Date.now() - startTime > 5000) {
        return true;
      }
      let isCoverImageExist, isMapExist = true;
      // harmony ios cover-view 会被转换为 view
      const isCoverViewExist = isHarmony || isIos || await page.$('cover-view');
      if(isApp){
      // app 端 cover-image 会被转换为 image
        isCoverImageExist = !!(await page.$('image'));
      }else{
        isCoverImageExist = !!(await page.$('cover-image'));
        isMapExist = !!(await page.$('map'));
      }
      checkElementResult = isCoverViewExist && isCoverImageExist && isMapExist;
      return checkElementResult;
    })

    expect(checkElementResult).toBe(true);

    // 等待地图加载完成
    const waitTime = process.env.uniTestPlatformInfo.includes('firefox') ? 5000:4000
    await page.waitFor(waitTime)

    const image = await program.screenshot({
      deviceShot: true,
      area: {
        x: 0,
        y: 200,
      }
    });
    expect(image).toSaveImageSnapshot();
  });
});
