const PAGE_PATH = '/pages/API/element-get-bounding-client-rect-async/element-get-bounding-client-rect-async'

const RECT_X = 15;
const RECT_HEIGHT = 100;
const RECT_LEFT = 15;

describe('element-get-bounding-client-rect-async', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
  })
  it('getBoundingClientRectSync', async () => {
    await invokeGetBoundingClientRect(page, 'getBoundingClientRectAsync', 'data.rectInfo');
  })
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
