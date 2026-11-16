const { canAssertMedia, expectMediaMatches, hasMediaComponent, saveMediaScreenshots } = require('./test-utils.js')

jest.setTimeout(60000)

async function readViewport(page) {
  const viewport = await page.callMethod('getMediaViewport')
  expect(viewport.width).toBeGreaterThan(0)
  expect(viewport.height).toBeGreaterThan(0)
  return viewport
}

describe('css-media-query', () => {
  it('视口条件按实际尺寸匹配，并保存截图', async () => {
    const page = await program.reLaunch('/pages/CSS/media-query/media-query')
    await page.waitFor('#min-width')
    if (canAssertMedia) {
      const { width, height } = await readViewport(page)
      await expectMediaMatches(page, {
        portrait: height >= width,
        landscape: width > height,
        'orientation-boolean': true,
        'not-portrait': width > height,
        'landscape-width': width > height && width >= 600,
        'min-width': width >= 600,
        'max-width': width <= 600,
        'min-height': height >= 500,
        'max-height': height <= 500,
        boolean: true,
        'range-width': width >= 600 && width < 1000,
        'range-height': height >= 500 && height <= 800,
        and: width >= 600 && height >= 500,
        or: width >= 600 || height >= 500,
        nested: width >= 600 && (height >= 500 || height <= 400),
        not: width < 600,
      })
    }
    // 宽高比的浮点边界由运行时单元测试覆盖，页面保留截图，避免复刻求值器。
    await saveMediaScreenshots(page, 'media-query')
  })

  it('仅组件包含媒体查询：校验首次显示、移除与重新添加，并保存截图', async () => {
    const page = await program.reLaunch('/pages/CSS/media-query/component-only')
    await page.waitFor('button')
    const checkComponent = async () => {
      if (!canAssertMedia) return
      const { width } = await readViewport(page)
      await expectMediaMatches(page, { 'component-width': width >= 600 }, 'media-query-component')
    }
    await checkComponent()
    await saveMediaScreenshots(page, 'component-only-initial')
    await page.callMethod('setComponentVisible', false)
    if (canAssertMedia) await page.waitFor(async () => !await hasMediaComponent(page), 5000)
    await saveMediaScreenshots(page, 'component-only-removed')
    await page.callMethod('setComponentVisible', true)
    await checkComponent()
    await saveMediaScreenshots(page, 'component-only-remounted')
  })
})
