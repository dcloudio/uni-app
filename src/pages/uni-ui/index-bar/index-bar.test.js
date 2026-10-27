const PAGE_PATH = '/pages/uni-ui/index-bar/index-bar'

describe('index-bar', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(500)
  })

  async function tapControlButton(index) {
    const buttons = await page.$$('.control-btn')
    expect(buttons.length).toBeGreaterThan(index)
    await buttons[index].tap()
    await page.waitFor(500)
  }

  async function scrollListToIndex(index) {
    const currentData = await page.data('data')
    await page.setData({
      data: {
        ...currentData,
        scrollWithAnimation: true,
        indexViewID: `idx-${index}`
      }
    })
    await page.waitFor(800)
    await page.setData({
      data: {
        ...(await page.data('data')),
        scrollWithAnimation: false,
        indexViewID: ''
      }
    })
  }

  async function selectIndex(index) {
    await page.callMethod('onSelect', index)
    await page.waitFor(800)
  }

  async function savePageSnapshot() {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  }

  it('index-bar custom style and indexs snapshot', async () => {
    await tapControlButton(0)
    await tapControlButton(1)

    expect(await page.data('data.useCustomStyle')).toBe(true)
    expect(await page.data('data.useCustomIndexs')).toBe(true)

    await savePageSnapshot()
  })

  it('index-bar should scroll to section top after scrolling to B and tapping A', async () => {
    await scrollListToIndex('B')

    await selectIndex('A')
    expect(await page.data('data.indexViewID')).toBe('idx-A')

    await savePageSnapshot()
  })
})
