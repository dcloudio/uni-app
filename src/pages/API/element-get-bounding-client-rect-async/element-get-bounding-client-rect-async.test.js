const PAGE_PATH = '/pages/API/element-get-bounding-client-rect-async/element-get-bounding-client-rect-async'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isApp = platformInfo.startsWith('android') || platformInfo.startsWith('ios') || platformInfo.startsWith('harmony')

const RECT_X = 15;
const RECT_HEIGHT = 100;
const RECT_LEFT = 15;

describe('element-get-bounding-client-rect-async', () => {
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
  })
  it('getBoundingClientRectSync', async () => {
    await invokeGetBoundingClientRect(page, 'getBoundingClientRectAsync', 'data.rectInfo');
  })

  if (isApp) {
    it('getBoundingClientRect - normal, flattened and hidden flattened text agree', async () => {
      const originalData = await page.data('data')
      try {
        await page.setData({ data: { ...originalData, showTextRectRegression: true } })
        await page.waitFor('#rect-regression-flat')
        await page.waitFor(100)
        const rects = await page.callMethod('getTextRectRegressionInfo')

        for (const rect of [rects.normal, rects.flat, rects.hiddenFlat]) {
          for (const key of ['x', 'y', 'left', 'top', 'right', 'bottom', 'width', 'height']) {
            expect(Number.isFinite(rect[key])).toBe(true)
          }
          expect(rect.width).toBeGreaterThan(0)
          expect(rect.height).toBeGreaterThan(0)
          expect(rect.left).toBeGreaterThan(0)
          expect(rect.top).toBeGreaterThan(0)
          expect(rect.x).toBeCloseTo(rect.left, 2)
          expect(rect.y).toBeCloseTo(rect.top, 2)
          expect(rect.right).toBeCloseTo(rect.left + rect.width, 2)
          expect(rect.bottom).toBeCloseTo(rect.top + rect.height, 2)
        }

        for (const rect of [rects.flat, rects.hiddenFlat]) {
          for (const key of ['x', 'y', 'left', 'top', 'right', 'bottom', 'width', 'height']) {
            // 普通与拍平路径的像素取整可存在不超过 1px 的差异。
            expect(Math.abs(rect[key] - rects.normal[key])).toBeLessThanOrEqual(1)
          }
        }
      } finally {
        await page.setData({ data: originalData })
      }
    })

  }

  if (!platformInfo.startsWith('mp')) {
    it('getBoundingClientRect - flattened text', async () => {
      await page.callMethod('getTextRectFlat')
      await page.waitFor(50)

      const rectInfo = await page.data('syncData.textRectInfoFlat')
      expect(rectInfo.width).toBeGreaterThan(0)
      expect(rectInfo.height).toBeGreaterThan(0)
      expect(rectInfo.x).toBe(rectInfo.left)
      expect(rectInfo.y).toBe(rectInfo.top)
      expect(rectInfo.right).toBeCloseTo(rectInfo.left + rectInfo.width, 2)
      expect(rectInfo.bottom).toBeCloseTo(rectInfo.top + rectInfo.height, 2)
    })
  }
})

async function invokeGetBoundingClientRect(page, methodName, dataName) {
  await page.callMethod(methodName);
  await page.waitFor(50)

  const systemInfo = await program.systemInfo();
  const width = systemInfo.screenWidth

  const rectInfo = await page.data(dataName)

  expect(Math.round(rectInfo.x)).toBe(RECT_X)
  expect(Math.round(rectInfo.y) > 90).toBe(true)
  expect(width - 15 * 2 - Math.round(rectInfo.width) >= 0).toBe(true)
  expect(Math.round(rectInfo.height)).toBe(RECT_HEIGHT)
  expect(Math.round(rectInfo.left)).toBe(RECT_LEFT)
  expect(Math.round(rectInfo.top) > 90).toBe(true)
  expect(width - 15 - Math.round(rectInfo.right) >= 0).toBe(true)
  expect(Math.round(rectInfo.bottom) > 200).toBe(true)
}
