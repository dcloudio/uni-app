jest.setTimeout(50000)
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isWeb = platformInfo.startsWith('web')
const isMp = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/API/request/requestTask'

describe('ExtApi-RequestTask', () => {
  let page;
  let res;

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
  });


  it('Check RequestTask related api', async () => {
    const onHeadersReceived_observe_1_btn = await page.$('#onHeadersReceived_observe_1')
    await onHeadersReceived_observe_1_btn.tap()

    const onHeadersReceived_observe_2_btn = await page.$('#onHeadersReceived_observe_2')
    await onHeadersReceived_observe_2_btn.tap()


    const onChunkReceived_observe_1_btn = await page.$('#onChunkReceived_observe_1')
    await onChunkReceived_observe_1_btn.tap()

    const onChunkReceived_observe_2_btn = await page.$('#onChunkReceived_observe_2')
    await onChunkReceived_observe_2_btn.tap()


    const checkRequestTask_btn = await page.$('#checkRequestTask')
    await checkRequestTask_btn.tap()


    await page.waitFor(8000);
    let jest_requestTask_result = await page.data('jest_requestTask_result')
    if (jest_requestTask_result) {
      let res = await page.data('res')
      let checkSuccess = res.includes('onHeadersReceived监听1') && res.includes('onHeadersReceived监听2') && res
        .includes('onChunkReceived监听1') && res.includes('onChunkReceived监听2')
      expect(checkSuccess).toBe(true)

      const offHeadersReceived_id_btn = await page.$('#offHeadersReceived_id')
      await offHeadersReceived_id_btn.tap()

      await checkRequestTask_btn.tap()

      await page.waitFor(8000);
      jest_requestTask_result = await page.data('jest_requestTask_result')
      if (jest_requestTask_result) {
        res = await page.data('res')
        checkSuccess = res.includes('onHeadersReceived监听2') == false && res.includes('onHeadersReceived监听1')
        expect(checkSuccess).toBe(true)
      }

      const offChunkReceived_observe_btn = await page.$('#offChunkReceived_observe')
      await offChunkReceived_observe_btn.tap()
      const offHeadersReceived_observe_btn = await page.$('#offHeadersReceived_observe')
      await offHeadersReceived_observe_btn.tap()

      await checkRequestTask_btn.tap()

      await page.waitFor(8000);
      jest_requestTask_result = await page.data('jest_requestTask_result')
      if (jest_requestTask_result) {
        res = await page.data('res')
        checkSuccess = res.includes('点击了 offHeadersReceived') && res.includes('点击了 offChunkReceived')
        expect(checkSuccess).toBe(true)
      }
    }
  })

});
