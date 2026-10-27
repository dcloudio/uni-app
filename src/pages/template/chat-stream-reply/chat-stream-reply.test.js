// 多次截图 增加超时时间
jest.setTimeout(60000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isVapor = process.env.UNI_APP_X_DOM2 === "true"
const isMP = platformInfo.startsWith('mp')

describe('chat-stream-reply', () => {
  if (isMP) {
    it('not supported in mp', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;

  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/chat-stream-reply/chat-stream-reply');
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
  if(!isVapor){
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
