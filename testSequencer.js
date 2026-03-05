const Sequencer = require("@jest/test-sequencer").default
const startTestFilePaths = [
  "pages/API/get-launch-options-sync/get-launch-options-sync.test.js",
  "pages/API/get-current-pages/get-current-pages.test.js",
  "pages/component/view/view.test.js",
  "pages/API/pull-down-refresh/pull-down-refresh.test.js",
  "pages/component/global-events/global-events.test.js",
  "pages/component/list-view/list-view-refresh.test.js",
  "pages/component/scroll-view/scroll-view-refresher.test.js",
  "pages/component/global-events/touch-events.test.js",
  "pages/component/global-events/touch-events-bubbles.test.js",
  "pages/component/global-events/touch-events-case.test.js",
  "pages/component/global-events/touch-events-preventDefault.test.js",
  "pages/component/swiper/swiper2.test.js",
  "pages/component/slider/slider-maxValue.test.js",
  "pages/CSS/overflow/overflow-visible-event.test.js",
  "pages/API/create-selector-query/create-selector-query-onScroll.test.js",
  "pages/component/scroll-view/scroll-view-custom-refresher-props.test.js",
  "pages/component/waterflow/waterflow.test.js",
  "pages/component/text/text-props.test.js",
  "pages/component/rich-text/rich-text-complex.test.js",
  "pages/component/web-view/web-view/web-view-local.test.js"
]
const endTestFilePaths = [
  "pages/API/navigator/new-page/onLoad.test.js",
  "pages/API/modal/modal.test.js",
  "pages/API/storage/storage.test.js",
  "pages/component/web-view/web-view.test.js"
]

class CustomSequencer extends Sequencer {
  sort(tests) {
    const startTests = startTestFilePaths
      .map((filePath) => {
        return tests.find((test) => test.path.endsWith(filePath))
      })
      .filter(Boolean)
    const endTests = endTestFilePaths
      .map((filePath) => {
        return tests.find((test) => test.path.endsWith(filePath))
      })
      .filter(Boolean)

    const middleTests = tests.filter((test) =>
      !startTests.includes(test) && !endTests.includes(test)
    );

    return [...startTests, ...middleTests, ...endTests]
  }
}

module.exports = CustomSequencer
