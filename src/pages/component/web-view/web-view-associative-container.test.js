const PAGE_PATH = '/pages/component/web-view/web-view-associative-container'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isHarmony = platformInfo.startsWith('harmony')
const isAndroid = platformInfo.startsWith('android')

describe('web-view-associative-container', () => {
  if (!isHarmony && !isAndroid) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  async function waitForData(path, matcher, timeout = 3000) {
    const start = Date.now()
    await page.waitFor(async () => {
      const value = await page.data(path)
      return matcher(value) || (Date.now() - start > timeout)
    })
  }

  async function getWebViewPoint() {
    const x = await page.data('data.webviewX')
    const y = await page.data('data.webviewY')
    const height = await page.data('data.webviewHeight')
    return {
      x: x + 20,
      y: y + height / 2
    }
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('web-view')
    await waitForData('data.webviewWidth', value => value > 0, 5000)
  })

  it('associative-container="nested-scroll-view"', async () => {
    await page.callMethod('onTypeChange', true)
    await waitForData('data.type', value => value === 'nested-scroll-view', 3000)
    await page.waitFor(500)

    const point = await getWebViewPoint()
    await program.swipe({
      startPoint: { x: point.x, y: point.y },
      endPoint: { x: point.x, y: point.y - 100 },
      duration: 300
    })
    await page.waitFor(500)

    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return 'web-view-associative-container-nested-scroll-view'
      }
    })
  })

  it('associative-container=""', async () => {
    await page.callMethod('onTypeChange', false)
    await waitForData('data.type', value => value === '', 3000)
    await page.waitFor(500)

    const point = await getWebViewPoint()
    await program.swipe({
      startPoint: { x: point.x, y: point.y },
      endPoint: { x: point.x, y: point.y - 100 },
      duration: 300
    })
    await page.waitFor(500)

    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return 'web-view-associative-container-empty'
      }
    })
  })
})
