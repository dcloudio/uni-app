const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
jest.setTimeout(30000);
describe('ai-chat', () => {
  let page;

  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/ai-chat/ai-chat');
    await page.waitFor('view');
  });

  async function takeScreenshot() {
    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot();
    await page.waitFor(500);
  }

  async function waitForData(dataPath) {
    await page.waitFor(async () => {
      return await page.data(dataPath) == true
    })
  }

  it('ai-chat-initial-screenshot', async () => {
    await takeScreenshot();
  });

  // dom2 暂不支持 textareaEl.input，临时跳过
  if(!isDom2){
    it('ai-chat-send-message', async () => {
      // 获取 textarea 元素
      const textareaEl = await page.$('.input-el');
      // 设置发送的文字
      await textareaEl.input('你好，这是一条测试消息');
      await page.waitFor(300);
      // 获取发送按钮并点击
      const sendBtn = await page.$('.send-msg');
      await sendBtn.tap();

      await waitForData('autoTest.waitNode1');
      await takeScreenshot();

      await waitForData('autoTest.waitNode2');
      await takeScreenshot();

      await waitForData('autoTest.waitNode3');
      await takeScreenshot();

      await waitForData('autoTest.waitNode4');
      await takeScreenshot();

      await waitForData('autoTest.waitNode5');
      await takeScreenshot();

      // 等待页面中消息流式返回完成
      await waitForData('autoTest.done');
      // 截图
      await takeScreenshot();
    });
  }

});
