const platformInfo = (process.env.uniTestPlatformInfo || '').toLowerCase()
const isMp = platformInfo.startsWith('mp-')
const PAGE_PATH = '/pages/CSS/style-isolation/style-isolation-media'

const INTERNAL_BACKGROUND = '#90caf9'
const EXTERNAL_BACKGROUND = '#ce93d8'

jest.setTimeout(30000)

function normalizeColor(value) {
  return String(value || '').replace(/\s/g, '').toLowerCase()
}

const backgroundColors = {
  '#90caf9': ['#90caf9', 'rgb(144,202,249)', 'rgba(144,202,249,1)'],
  '#ce93d8': ['#ce93d8', 'rgb(206,147,216)', 'rgba(206,147,216,1)']
}

async function readTargetBackground(page, componentId, targetId) {
  // 小程序通过组件节点查询内部元素，避免跨组件选择器边界。
  const scope = isMp ? await page.$('#' + componentId) : page
  if (scope == null) return ''
  const element = await scope.$('#' + targetId)
  return element == null ? '' : await element.style('background-color')
}

async function expectTargetBackground(page, componentId, targetId, expectedColor) {
  const accepted = backgroundColors[expectedColor]
  const deadline = Date.now() + 5000
  let actual = ''
  // 页面根节点出现时，子组件或媒体查询样式可能尚未就绪。
  do {
    actual = normalizeColor(await readTargetBackground(page, componentId, targetId))
    if (accepted.includes(actual)) return
    await page.waitFor(100)
  } while (Date.now() < deadline)
  expect(accepted).toContain(actual)
}

describe('style-isolation-media', () => {
  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('#media-page-ready', 5000)
  })

  it('组件内部媒体查询生效，内部元素显示蓝色背景', async () => {
    await expectTargetBackground(page, 'media-internal', 'media-internal-target', INTERNAL_BACKGROUND)
  })

  it('外部媒体查询通过 external class 覆盖内部元素，显示紫色背景', async () => {
    await expectTargetBackground(page, 'media-external-active', 'media-external-active-target', EXTERNAL_BACKGROUND)
  })

  it('外部媒体条件不满足，内部元素保持蓝色背景', async () => {
    await expectTargetBackground(page, 'media-external-inactive', 'media-external-inactive-target', INTERNAL_BACKGROUND)
  })
})
