jest.setTimeout(50000);

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
// 【勿动】此项目，某些设备，在自动化测试系统中，不需要运行pages.test.js。其值由自动化测试系统动态控制。
const skipPagesTestJs = process.env.UNI_ACTION_SKIP_PAGES_TEST_JS;
// 【勿动】pages 由 const 改为 let，因为在其它任务会修改 pages 的值
let pageIndex = 0

const component = [
  '/pages/component/swiper/swiper',
  '/pages/component/progress/progress',
  '/pages/component/radio/radio',
  '/pages/component/checkbox/checkbox',
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
  // 单独测试例截图
  // '/pages/component/text/text-props',
  // 单独测试例截图
  // '/pages/component/rich-text/rich-text-complex',
  // 单独测试例截图
  // '/pages/component/form/form',
  // 单独测试例截图
  // '/pages/component/button/buttonstatus',
  // 自动获取焦点，单独测试例截图
  // '/pages/component/input/input',
  //动态内容
  // '/pages/component/picker-view/picker-view',
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
  // 动态内容（视频封面）
  // '/pages/component/video/video',
  // 单独测试例截图
  // '/pages/component/video/video-format',
  // 动态内容
  // '/pages/component/web-view/web-view',
  // 依赖加载完成回调，单独测试例截图
  // '/pages/component/web-view/web-view/web-view-local',
  // 动态内容
  // '/pages/component/unicloud-db/unicloud-db',
  // 动态内容
  // '/pages/component/unicloud-db/unicloud-db/contacts/edit',
  // 动态内容
  // '/pages/component/unicloud-db/unicloud-db/contacts/detail',
  // 动态内容
  // '/pages/component/unicloud-db/unicloud-db/mixin-datacom/mixin-datacom',
  // 单独测试例截图
  // '/pages/component/global-properties/global-properties',
  // 单独测试例截图
  // '/pages/component/global-events/touch-events',
  // 单独测试例截图
  // '/pages/component/nested-scroll-header/nested-scroll-header',
  // 单独测试例截图
  // '/pages/component/nested-scroll-body/nested-scroll-body',
  // 单独测试例截图
  // '/pages/component/swiper/swiper-list-view',
  // 动态内容
  // '/pages/component/waterflow/waterflow-fit-height',
  // 动态内容
  // '/pages/component/canvas/canvas/ball',
]

const API = [
  '/pages/API/navigator/new-page/onLoad',
  '/pages/API/storage/storage',
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
  // 单独测试例截图
  // '/pages/API/pull-down-refresh/pull-down-refresh',
  // 单独测试例截图
  // '/pages/API/get-element-by-id/get-element-by-id',
  // 单独测试例截图
  // '/pages/API/get-element-by-id/get-element-by-id-multiple-root-node',
  // 单独测试例截图
  // '/pages/API/create-selector-query/create-selector-query',
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
  // 非 UI 相关不截图
  // '/pages/API/theme-change/theme-change',
  // 非 UI 相关不截图
  // '/pages/API/facial-recognition-meta-info/facial-recognition-meta-info',
  // 非 UI 相关不截图
  // '/pages/API/env/env',
  // 非 UI 相关不截图
  // '/pages/API/element-draw/element-draw',
  // 非 UI 相关不截图
  // '/pages/API/share-with-system/share-with-system',
  // 非 UI 相关不截图
  // '/pages/API/request-payment/request-payment/request-payment-uni-pay',
  // 非 UI 相关不截图
  // '/pages/API/get-location/get-location',
  // 非 UI 相关不截图
  // '/pages/API/exit/exit',
  // 非 UI 相关不截图
  // '/pages/API/install-apk/install-apk',
  // 动态内容，单独测试例截图
  // '/pages/API/get-image-info/get-image-info',
  // 动态内容，不需要截图
  // '/pages/API/create-rewarded-video-ad/create-rewarded-video-ad',
  // 非 UI 相关不截图
  // '/pages/API/create-request-permission-listener/create-request-permission-listener',
  // 非 UI 相关不截图
  // '/pages/API/compress-image/compress-image',
  // 单独测试例截图
  // '/pages/API/compress-video/compress-video',
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
]

const CSS = [
  '/pages/CSS/border/border-color',
  '/pages/CSS/border/border-top',
  '/pages/CSS/border/border-bottom',
  '/pages/CSS/border/border-left',
  '/pages/CSS/border/border-right',
  '/pages/CSS/border/border-radius',
  '/pages/CSS/border/border-style',
  '/pages/CSS/border/border-width',
  '/pages/CSS/border/complex-border/complex-border',
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
  // '/pages/CSS/background/background-image',
  // '/pages/CSS/border/border',
  // 单独测试例中截图
  // '/pages/CSS/border/dynamic-border',
  // 单独测试例中截图
  // '/pages/CSS/layout/z-index',
  // 单独测试例中截图
  // '/pages/CSS/overflow/overflow',
  // 网络资源加载，单独测试例截图
  // '/pages/CSS/text/font-family',
  // 单独测试例截图
  // '/pages/CSS/text/font-size',
  // 单独测试例截图
  // '/pages/CSS/transition/transition',
  // 单独测试例截图
  // '/pages/CSS/transform/translate',
  // 单独测试例截图
  // '/pages/CSS/transform/scale',
  // 单独测试例截图
  // '/pages/CSS/transform/rotate',
  // 单独测试例截图
  // '/pages/CSS/variable/variable',
]

const template = [
  '/pages/template/swipe-tabs-underline/swipe-tabs-underline',
  '/pages/template/swipe-tabs-scale-highlight/swipe-tabs-scale-highlight',
  // 单独测试例截图
  // '/pages/template/keyboard-adjust/keyboard-adjust',
  // 网络资源加载，单独测试例截图
  // '/pages/template/news-feed-list/news-feed-list',
  // 依赖网络资源加载
  // '/pages/template/news-feed-list/detail/detail',
  // 动画页面
  // '/pages/template/swipe-card-stack/swipe-card-stack',
  // 单独测试例截图
  // '/pages/template/vertical-video-feed/vertical-video-feed',
  // 单独测试例截图
  // '/pages/template/scroll-collapse-navbar/scroll-collapse-navbar',
  // 单独测试例截图
  // '/pages/template/draggable-half-modal/draggable-half-modal',
  // 动态内容
  // '/pages/template/search-header-long-list/search-header-long-list',
  // 动态内容
  // '/pages/template/banner-tabs-feed-nested-scroll/banner-tabs-feed-nested-scroll',
  // harmony 整体测试时截图异常，单独测试例截图
  // '/pages/template/pull-zoom-profile-page/pull-zoom-profile-page',
  // 动态内容
  // '/pages/template/calendar/calendar',
  // 不同平台存在差异，且页面简单
  // '/pages/template/external-link-launch/external-link-launch',
  // '/uni_modules/uni-pay-x/pages/success/success',
  // 依赖 onload 参数获取 web-view src
  // '/uni_modules/uni-pay-x/pages/ad-interactive-webview/ad-interactive-webview',
  // '/uni_modules/uni-pay-x/pages/pay-desk/pay-desk',
  // 页面内容不稳定
  // '/pages/template/recycle-long-list/recycle-long-list',
  // 单独测试例截图
  // '/pages/template/slider-100/slider-100',
  // 动态内容
  // '/pages/template/banner-tabs-long-list-nested-scroll/banner-tabs-long-list-nested-scroll',
  // 非 UI 相关不截图
  // '/pages/template/native-button-bridge/native-button-bridge'
]

if (!isMP) {
  component.push(
    '/pages/component/view/view',
    '/pages/component/text/text',
    '/pages/component/rich-text/rich-text',
    '/pages/component/button/button',
    '/pages/component/textarea/textarea',
    '/pages/component/slider/slider',
    '/pages/component/slider/slider-in-swiper',
    '/pages/component/switch/switch',
    '/pages/component/image/image-orientation',
    '/pages/component/image/image-mode-svg',
    '/pages/component/navigator/navigator',
    '/pages/component/navigator/navigate',
    '/pages/component/navigator/redirect',
    '/pages/component/unicloud-db/unicloud-db/contacts/add',
    '/pages/component/global-events/global-events',
    '/pages/component/global-events/transition-events',
    '/pages/component/global-events/global-events-transform',
  )

  CSS.push(
    '/pages/CSS/text/color',
    '/pages/CSS/text/font-style',
    '/pages/CSS/text/font-weight',
    '/pages/CSS/text/letter-spacing',
    '/pages/CSS/text/line-height',
    '/pages/CSS/text/text-align',
    '/pages/CSS/text/text-overflow',
    '/pages/CSS/text/text-decoration-line',
    '/pages/CSS/text/text-shadow',
    '/pages/CSS/text/white-space',
    '/pages/CSS/pointer-events/pointer-events',
    '/pages/CSS/background/background-color',
    '/pages/CSS/box-shadow/box-shadow',
    '/pages/CSS/overflow/overflow-visible-event',
  )
}

const pages = [
  // tabBar  //改动频繁，不再测试
  // '/pages/tabBar/component',
  // '/pages/tabBar/API',
  // '/pages/tabBar/CSS',
  // '/pages/tabBar/template',

  ...component,
  ...API,
  ...CSS,
  ...template,
]

if(!isMP && !isAppWebView) {
  pages.push(
    '/pages/component/list-view/list-view',
  )
}

if (!isAppWebView) {
  if (isApp) {
    pages.push(
      '/pages/template/scroll-view-sticky-section/scroll-view-sticky-section',
    )
  }
}


if (isWeb) {
  pages.push(
    '/pages/component/movable-view/movable-view',
    '/pages/component/label/label',
    '/pages/component/picker/picker',
    '/pages/component/canvas/canvas',
    '/pages/template/browser-built-in-elements/browser-built-in-elements',
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
  return 'view'
}

async function preparePageForScreenshot(pagePath, page) {
  if (pagePath === '/pages/component/picker/picker') {
    await page.setData({
      data: {
        dayDate: '2026-08-05',
        monthDate: '2026-08',
        yearDate: '2026',
        startDate: '1936-08-05',
        endDate: '2036-08-05',
      }
    })
    await page.waitFor(100)
  }
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
    if (skipPagesTestJs == "Y") {
      it('skip-current-device', async () => {
        expect(1).toBe(1);
      });
      return;
    };
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
      await page.waitFor(500)
      await preparePageForScreenshot(currentPagePath, page)
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
