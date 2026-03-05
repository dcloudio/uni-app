jest.setTimeout(50000);

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

let pageIndex = 0
const pages = [
  // tabBar  //改动频繁，不再测试
  // '/pages/tabBar/component',
  // '/pages/tabBar/API',
  // '/pages/tabBar/CSS',
  // '/pages/tabBar/template',

  // component
  '/pages/component/view/view',
  // 单独测试例截图
  // 'pages/component/scroll-view/scroll-view',
  // 单独测试例截图
  // '/pages/component/scroll-view/scroll-view-refresher',
  // 单独测试例截图
  // '/pages/component/scroll-view/scroll-view-props',
  // 单独测试例截图
  // '/pages/component/scroll-view/scroll-view-refresher-props',
  // 单独测试例截图
  // '/pages/component/scroll-view/scroll-view-custom-refresher-props',
  '/pages/component/swiper/swiper',
  // '/pages/component/list-view/list-view',
  // 单独测试例截图
  // '/pages/component/list-view/list-view-refresh',
  // 单独测试例截图
  // '/pages/component/list-view/list-view-multiplex',
  // '/pages/component/list-view/list-view-multiplex-input',
  // '/pages/component/list-view/list-view-multiplex-video',
  // '/pages/component/list-view/list-view-children-in-slot',
  // 单独测试例截图
  // '/pages/component/sticky-section/sticky-section',
  // 单独测试例截图
  // '/pages/component/sticky-header/sticky-header',
  '/pages/component/text/text',
  // 单独测试例截图
  // '/pages/component/text/text-props',
  '/pages/component/rich-text/rich-text',
  // 单独测试例截图
  // '/pages/component/rich-text/rich-text-complex',
  '/pages/component/progress/progress',
  // 单独测试例截图
  // '/pages/component/form/form',
  '/pages/component/button/button',
  // 单独测试例截图
  // '/pages/component/button/buttonstatus',
  '/pages/component/radio/radio',
  '/pages/component/checkbox/checkbox',
  // 自动获取焦点，单独测试例截图
  // '/pages/component/input/input',
  '/pages/component/textarea/textarea',
  '/pages/component/slider/slider',
  '/pages/component/slider/slider-in-swiper',
  //动态内容
  // '/pages/component/picker-view/picker-view',
  '/pages/component/switch/switch',
  // 单独测试例截图
  // '/pages/component/image/image',
  // 单独测试例截图
  // '/pages/component/image/image-format',
  // 判断CPU类型，单独测试例截图
  // '/pages/component/image/image-mode',
  // 网络资源加载，单独测试例截图
  // '/pages/component/image/image-path',
  // 截图过大
  // '/pages/component/image/image-large',
  '/pages/component/image/image-orientation',
  // 动态内容（视频封面）
  // '/pages/component/video/video',
  // 单独测试例截图
  // '/pages/component/video/video-format',
  '/pages/component/navigator/navigator',
  '/pages/component/navigator/navigate',
  '/pages/component/navigator/redirect',
  // 动态内容
  // '/pages/component/web-view/web-view',
  // 依赖加载完成回调，单独测试例截图
  // '/pages/component/web-view/web-view/web-view-local',
  // 动态内容
  // '/pages/component/unicloud-db/unicloud-db',
  '/pages/component/unicloud-db/unicloud-db/contacts/add',
  // 动态内容
  // '/pages/component/unicloud-db/unicloud-db/contacts/edit',
  // 动态内容
  // '/pages/component/unicloud-db/unicloud-db/contacts/detail',
  // 动态内容
  // '/pages/component/unicloud-db/unicloud-db/mixin-datacom/mixin-datacom',
  // 单独测试例截图
  // '/pages/component/global-properties/global-properties',
  '/pages/component/global-events/global-events',
  '/pages/component/global-events/transition-events',
  // 单独测试例截图
  // '/pages/component/global-events/touch-events',
  '/pages/component/global-events/global-events-transform',
  // 单独测试例截图
  // '/pages/component/nested-scroll-header/nested-scroll-header',
  // 单独测试例截图
  // '/pages/component/nested-scroll-body/nested-scroll-body',
  // 单独测试例截图
  // '/pages/component/swiper/swiper-list-view',
  // 单独测试例截图
  // '/pages/component/list-view/issue-2199',

  // API
  // 非 UI 相关不截图
  // '/pages/API/get-app/get-app',
  // 单独测试例截图
  // '/pages/API/get-current-pages/get-current-pages',
  // 单独测试例截图
  // '/pages/API/get-current-pages/set-page-style-disable-pull-down-refresh',
  // 非 UI 相关不截图
  // '/pages/API/get-launch-options-sync/get-launch-options-sync',
  // 动态时间戳
  // '/pages/API/navigator/navigator',
  // 单独测试例截图
  // '/pages/API/set-navigation-bar-color/set-navigation-bar-color',
  // 单独测试例截图
  // '/pages/API/set-navigation-bar-title/set-navigation-bar-title',
  // 单独测试例截图
  // '/pages/API/set-page-backgroundColorContent/set-page-backgroundColorContent',
  // 单独测试例截图
  // '/pages/API/navigator/new-page/new-page-1',
  // 非 UI 相关不截图
  // '/pages/API/navigator/new-page/new-page-3',
  '/pages/API/navigator/new-page/onLoad',
  // 单独测试例截图
  // '/pages/API/pull-down-refresh/pull-down-refresh',
  // 单独测试例截图
  // '/pages/API/get-element-by-id/get-element-by-id',
  // 单独测试例截图
  // '/pages/API/get-element-by-id/get-element-by-id-multiple-root-node',
  // 单独测试例截图
  // '/pages/API/create-selector-query/create-selector-query',
  '/pages/API/storage/storage',
  // 单独测试例截图
  // '/pages/API/action-sheet/action-sheet',
  // 单独测试例截图
  // '/pages/API/show-modal/show-modal',
  // 单独测试例截图
  // '/pages/API/show-loading/show-loading',
  // 单独测试例截图
  // '/pages/API/show-toast/show-toast',
  // 单独测试例截图
  // '/pages/API/load-font-face/load-font-face',
  // 单独测试例截图
  // '/pages/API/load-font-face/load-font-face-child',
  // 非 UI 相关不截图
  // '/pages/API/interceptor/interceptor',
  // 非 UI 相关不截图
  // '/pages/API/interceptor/page1',
  // 非 UI 相关不截图
  // '/pages/API/interceptor/page2',
  // 非 UI 相关不截图
  // '/pages/API/request/request',
  // 非 UI 相关不截图
  // '/pages/API/upload-file/upload-file',
  // 非 UI 相关不截图
  // '/pages/API/download-file/download-file',
  // 非 UI 相关不截图
  // '/pages/API/websocket/socketTask',
  // 页面销毁时会关闭socket连接，所以规避
  // '/pages/API/websocket/websocket',
  // 页面只是按钮，且平台间存在差异
  // '/pages/API/unicloud/unicloud/cloud-function',
  // 非 UI 相关不截图
  // '/pages/API/unicloud/unicloud/cloud-object',
  // 非 UI 相关不截图
  // '/pages/API/unicloud/unicloud/database',
  // 非 UI 相关不截图
  // '/pages/API/unicloud/unicloud/cloud-storage',
  // 非 UI 相关不截图
  // '/pages/API/get-system-info/get-system-info',
  // 非 UI 相关不截图
  // '/pages/API/get-device-info/get-device-info',
  // 非 UI 相关不截图
  // '/pages/API/get-app-base-info/get-app-base-info',
  // 单独测试例截图
  // '/pages/API/preview-image/preview-image',
  // 单独测试例截图
  // '/pages/API/choose-image/choose-image',
  // 单独测试例截图
  // '/pages/API/choose-video/choose-video',
  // 非 UI 相关不截图
  // '/pages/API/get-network-type/get-network-type',
  // 非 UI 相关不截图
  // '/pages/API/page-scroll-to/page-scroll-to',
  // 非 UI 相关不截图
  // '/pages/API/event-bus/event-bus',
  // '/pages/API/get-battery-info/get-battery-info',
  // 非 UI 相关不截图
  // '/pages/API/get-window-info/get-window-info',
  // 非 UI 相关不截图
  // '/pages/API/rpx2px/rpx2px',
  // 非 UI 相关不截图
  // '/pages/API/request-payment/request-payment/order-detail',
  // 单独测试例截图
  // '/pages/API/resize-observer/resize-observer',
  // 单独测试例截图
  // '/pages/API/map/map',

  // CSS
  '/pages/CSS/background/background-color',
  // 单独测试例中截图
  // '/pages/CSS/background/background-image',
  // '/pages/CSS/border/border',
  '/pages/CSS/border/border-color',
  '/pages/CSS/border/border-top',
  '/pages/CSS/border/border-bottom',
  '/pages/CSS/border/border-left',
  '/pages/CSS/border/border-right',
  '/pages/CSS/border/border-radius',
  '/pages/CSS/border/border-style',
  '/pages/CSS/border/border-width',
  '/pages/CSS/border/complex-border/complex-border',
  // 单独测试例中截图
  // '/pages/CSS/border/dynamic-border',
  '/pages/CSS/box-shadow/box-shadow',
  '/pages/CSS/box-sizing/box-sizing',
  '/pages/CSS/display/flex',
  '/pages/CSS/display/none',
  '/pages/CSS/flex/flex',
  '/pages/CSS/flex/align-content',
  '/pages/CSS/flex/align-items',
  '/pages/CSS/flex/align-self',
  '/pages/CSS/flex/flex-basis',
  '/pages/CSS/flex/flex-direction',
  '/pages/CSS/flex/flex-flow',
  '/pages/CSS/flex/flex-grow',
  '/pages/CSS/flex/flex-shrink',
  '/pages/CSS/flex/flex-wrap',
  '/pages/CSS/flex/justify-content',
  '/pages/CSS/layout/height',
  '/pages/CSS/layout/min-height',
  '/pages/CSS/layout/max-height',
  '/pages/CSS/layout/min-width',
  '/pages/CSS/layout/max-width',
  '/pages/CSS/layout/position',
  '/pages/CSS/layout/width',
  '/pages/CSS/layout/opacity',
  // 单独测试例中截图
  // '/pages/CSS/layout/z-index',
  '/pages/CSS/layout/visibility',
  '/pages/CSS/margin/margin',
  '/pages/CSS/margin/margin-top',
  '/pages/CSS/margin/margin-bottom',
  '/pages/CSS/margin/margin-left',
  '/pages/CSS/margin/margin-right',
  '/pages/CSS/padding/padding',
  '/pages/CSS/padding/padding-top',
  '/pages/CSS/padding/padding-bottom',
  '/pages/CSS/padding/padding-left',
  '/pages/CSS/padding/padding-right',
  // 单独测试例中截图
  // '/pages/CSS/overflow/overflow',
  '/pages/CSS/text/color',
  // 网络资源加载，单独测试例截图
  // '/pages/CSS/text/font-family',
  // 单独测试例截图
  // '/pages/CSS/text/font-size',
  '/pages/CSS/text/font-style',
  '/pages/CSS/text/font-weight',
  '/pages/CSS/text/letter-spacing',
  '/pages/CSS/text/line-height',
  '/pages/CSS/text/text-align',
  '/pages/CSS/text/text-overflow',
  '/pages/CSS/text/text-decoration-line',
  '/pages/CSS/text/text-shadow',
  '/pages/CSS/text/white-space',
  // 单独测试例截图
  // '/pages/CSS/transition/transition',
  '/pages/CSS/pointer-events/pointer-events',
  // 单独测试例截图
  // '/pages/CSS/transform/translate',
  // 单独测试例截图
  // '/pages/CSS/transform/scale',
  // 单独测试例截图
  // '/pages/CSS/transform/rotate',
  // 单独测试例截图
  // '/pages/CSS/variable/variable',
  '/pages/CSS/overflow/overflow-visible-event',
  '/pages/CSS/overflow/issue-21223',

  // template
  // 网络资源加载，单独测试例截图
  // '/pages/template/list-news/list-news',
  // 依赖网络资源加载
  // '/pages/template/list-news/detail/detail',
  // 动画页面
  // '/pages/template/drop-card/drop-card',
  '/pages/template/swiper-list/swiper-list',
  '/pages/template/swiper-list2/swiper-list2',
  // 单独测试例截图
  // '/pages/template/swiper-vertical-video/swiper-vertical-video',
  // 单独测试例截图
  // '/pages/template/scroll-fold-nav/scroll-fold-nav',
  // 单独测试例截图
  // '/pages/template/half-screen/half-screen',
  // 动态内容
  // '/pages/template/long-list/long-list',
  // 动态内容
  // '/pages/template/long-list2/long-list2',
  // harmony 整体测试时截图异常，单独测试例截图
  // '/pages/template/pull-zoom-image/pull-zoom-image',
  '/pages/template/navbar-lite/navbar-lite',
  '/pages/template/custom-tab-bar/custom-tab-bar',
  // 动态内容
  // '/pages/template/calendar/calendar',
  // 不同平台存在差异，且页面简单
  // '/pages/template/schema/schema',
  // '/uni_modules/uni-pay-x/pages/success/success',
  // 依赖 onload 参数获取 web-view src
  // '/uni_modules/uni-pay-x/pages/ad-interactive-webview/ad-interactive-webview',
  // '/uni_modules/uni-pay-x/pages/pay-desk/pay-desk',
  // 页面内容不稳定
  // '/pages/template/custom-long-list/custom-long-list',
  // 单独测试例截图
  // '/pages/template/slider-100/slider-100',
  // 动态内容
  // '/pages/template/long-list-nested/long-list-nested',
  '/pages/template/issue-25934/issue-25934'
]

// if (!isIos) {
//   // 非 UI 相关不截图
//   pages.push(
//     '/pages/API/get-battery-info/get-battery-info',
//   )
// }

if(!isMP) {
//   pages.push(
//     // 单独测试例截图
//     // '/pages/component/list-view/list-view-children-in-slot',
//     // 非 UI 相关不截图
//     // '/uni_modules/uni-pay-x/pages/success/success',
//     // 非 UI 相关不截图
//     // '/uni_modules/uni-pay-x/pages/pay-desk/pay-desk'
//   )
  if (!isAppWebView) {
    pages.push(
      '/pages/component/list-view/list-view',
    )
  }
}

if (!isAppWebView) {
  if (isApp) {
    pages.push(
      // 非 UI 相关不截图
      // '/pages/API/get-file-system-manager/get-file-system-manager',
      // 非 UI 相关不截图
      // '/pages/API/get-system-setting/get-system-setting',
      // 非 UI 相关不截图
      // '/pages/API/element-takesnapshot/element-takesnapshot',
      // 非 UI 相关不截图
      // '/pages/API/get-app-authorize-setting/get-app-authorize-setting',
      // 非 UI 相关不截图
      // '/pages/API/get-uni-verify-manager/get-uni-verify-manager',
      // 非 UI 相关不截图
      // '/pages/API/request-payment/request-payment',
      '/pages/template/scroll-sticky/scroll-sticky',
    )
  }
  if(isIos || isAndroid){
    pages.push(
      // 非 UI 相关不截图
      // '/pages/API/theme-change/theme-change',
      // 非 UI 相关不截图
      // '/pages/API/facial-recognition-meta-info/facial-recognition-meta-info',
      // 非 UI 相关不截图
      // '/pages/API/env/env',
      // 非 UI 相关不截图
      // '/pages/API/element-draw/element-draw',
      // 动态内容
      // '/pages/component/waterflow/waterflow-fit-height',
      // 非 UI 相关不截图
      // '/pages/API/share-with-system/share-with-system',
      '/pages/template/test-uts-button/test-uts-button',
      '/pages/component/loading/loading',
    )
  }
  // pages.push(
  //     // 非 UI 相关不截图
  //   // '/pages/API/request-payment/request-payment/request-payment-uni-pay',
  //     // 非 UI 相关不截图
  //   // '/pages/API/get-location/get-location',
  // )
}

// if (isAndroid && !isAppWebView) {
//   pages.push(
//     // 非 UI 相关不截图
//     // '/pages/API/exit/exit',
//     // 非 UI 相关不截图
//     // '/pages/API/install-apk/install-apk',
//     // 动态内容，单独测试例截图
//     // '/pages/API/get-image-info/get-image-info',
//     // 动态内容，不需要截图
//     // '/pages/API/create-rewarded-video-ad/create-rewarded-video-ad',
//     // 非 UI 相关不截图
//     // '/pages/API/create-request-permission-listener/create-request-permission-listener',
//     // 非 UI 相关不截图
//     // '/pages/API/compress-image/compress-image',
//     // 单独测试例截图
//     // '/pages/API/compress-video/compress-video',
//   )
// }


if (isWeb) {
  pages.push(
    '/pages/component/movable-view/movable-view',
    '/pages/component/label/label',
    '/pages/component/picker/picker',
    // 单独测试例截图
    // '/pages/API/get-image-info/get-image-info',
    // 非 UI 相关不截图
    // '/pages/API/make-phone-call/make-phone-call',
    // 单独测试例截图
    // '/pages/API/create-inner-audio-context/create-inner-audio-context',
    // 单独测试例截图
    // '/pages/API/create-inner-audio-context/inner-audio-format',
    // 单独测试例截图
    // '/pages/API/create-inner-audio-context/inner-audio-path',
    // 单独测试例截图
    // '/pages/API/clipboard/clipboard',
    // 单独测试例截图
    // '/pages/API/compass/compass',
    '/pages/component/canvas/canvas',
    // 动态内容
    // '/pages/component/canvas/canvas/ball',
    '/pages/template/browser-element/browser-element',
  )
}

let page;
let windowInfo

function getWaitForTagName(pagePath) {
  if (pagePath === '/pages/component/list-view/list-view-multiplex-input') {
    return 'input'
  }
  if (pagePath === '/pages/component/list-view/list-view-multiplex-video') {
    return 'video'
  }
  if (
    pagePath === '/pages/component/global-events/transition-events' ||
    pagePath === '/pages/API/env/env'
  ) {
    return 'text'
  }
  if (
    pagePath === '/pages/component/unicloud-db/unicloud-db/contacts/edit' ||
    pagePath === '/pages/component/unicloud-db/unicloud-db/contacts/detail'
  ) {
    return 'scroll-view'
  }
  if (pagePath === '/pages/API/get-file-system-manager/get-file-system-manager') {
    return 'button'
  }
  return 'view'
}

// 将页面数组分组
const BATCH_SIZE = 20;
const pageBatches = [];
for (let i = 0; i < pages.length; i += BATCH_SIZE) {
  pageBatches.push(pages.slice(i, i + BATCH_SIZE));
}

// 为每个批次创建独立的测试套件
pageBatches.forEach((batch, batchIndex) => {
  describe(`Page Screenshot Batch ${batchIndex + 1}`, () => {
    let localPageIndex = 0;

    beforeAll(async () => {
      console.log(`Starting batch ${batchIndex + 1} with ${batch.length} pages`);
      windowInfo = await program.callUniMethod('getWindowInfo');
    });

    afterAll(async () => {
      console.log(`Finished batch ${batchIndex + 1}`);
    });

    test.each(batch)("%s", async () => {
      const currentPagePath = batch[localPageIndex];
      page = await program.reLaunch(currentPagePath);
      await page.waitFor(getWaitForTagName(currentPagePath));
      console.log("Taking screenshot: ", pageIndex, currentPagePath);
      let fullPage = true;

      const screenshotParams = {
        fullPage
      }
      if (!fullPage && !isAppWebView) {
        screenshotParams.offsetY = isApp ? `${windowInfo.safeAreaInsets.top + 44}` : '0'
      }

      const image = await program.screenshot(screenshotParams);
      expect(image).toSaveImageSnapshot({
        customSnapshotIdentifier() {
          return `__pages_test__/${currentPagePath.replace(/\//g, "-").substring(1)}`
        }
      })
      await page.waitFor(800);
      localPageIndex++;
    });
  });
});
