const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isIOS = platformInfo.startsWith('ios')

const PAGE_PATH = '/pages/API/load-font-face/load-font-face'
const CHILD_PAGE_PATH = "/pages/API/load-font-face/load-font-face-child";

describe("loadFontFace", () => {
  let page
  beforeAll(async () => {
    page = await program.navigateTo(PAGE_PATH);
    await page.waitFor('view');
    await page.waitFor(4000);
  });
  if (!(
      // 小程序部分 url 不支持
      isMP ||
      // android 不同版本针对 woff2 字体回调触发不一致
      platformInfo.startsWith('android 5') ||
      platformInfo.startsWith('android 6') ||
      platformInfo.startsWith('android 7') ||
      platformInfo.startsWith('android 8')
    )
  ) {
    it("check callback triggered", async () => {
      const successTriggeredNum = await page.data('data.successTriggeredNum');
      if (isIOS) {
       expect(successTriggeredNum).toBe(6);
      } else {
        expect(successTriggeredNum).toBe(4);
      }
    });

    it("check callback status arrays", async () => {
      // 读取 data 的 loadFontStatus 数组
      const loadFontStatus = await page.data('data.loadFontStatus');
      // 验证每个字体的 success 回调是否被触发
      expect(loadFontStatus.every(status => status)).toBe(true);
    });
  }

  it("parent screenshot", async () => {
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  });
  it("child screenshot", async () => {
    const page = await program.navigateTo(CHILD_PAGE_PATH);
    await page.waitFor(3000);
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  });
});
