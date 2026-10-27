const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')

const PAGE_PATH = '/pages/template/chat-textarea/chat-textarea'

async function getEmojiPanelHeight(page) {
  const panel = await page.$('.emoji-panel')
  return await panel.style('height')
}

function isPanelClosed(height) {
  return height === '0px' || height === '0' || height === ''
}

async function getEmojiToggleIconSrc(page) {
  const toggle = await page.$('.emoji-toggle')
  const icon = await toggle.$('image')
  return await icon.attribute('src')
}

describe('chat-textarea', () => {
  if (!isWeb) {
    it('skip', () => { expect(1).toBe(1) })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(800)
  })

  it('基础渲染 - 页面核心节点存在', async () => {
    const title = await page.$('.chat-title')
    expect(await title.text()).toBe('@ 提及演示')

    const editor = await page.$('.preview-editor')
    expect(editor).toBeTruthy()

    const emojiToggle = await page.$('.emoji-toggle')
    expect(emojiToggle).toBeTruthy()
  })

  it('基础渲染 - 联系人列表默认不显示', async () => {
    const panels = await page.$$('.user-list-panel-show')
    expect(panels.length).toBe(0)
  })

  it('基础渲染 - 表情面板默认不显示', async () => {
    const panelHeight = await getEmojiPanelHeight(page)
    expect(isPanelClosed(panelHeight)).toBe(true)
  })

  it('核心交互 - 点击表情按钮展开表情面板', async () => {
    const toggle = await page.$('.emoji-toggle')
    const beforeIconSrc = await getEmojiToggleIconSrc(page)
    await toggle.tap()
    await page.waitFor(async () => {
      return !isPanelClosed(await getEmojiPanelHeight(page))
    })

    const afterIconSrc = await getEmojiToggleIconSrc(page)
    expect(afterIconSrc).not.toBe(beforeIconSrc)
    expect(isPanelClosed(await getEmojiPanelHeight(page))).toBe(false)
  })

  it('核心交互 - 再次点击表情按钮收起面板', async () => {
    const toggle = await page.$('.emoji-toggle')
    const openIconSrc = await getEmojiToggleIconSrc(page)
    await toggle.tap()
    await page.waitFor(async () => {
      return isPanelClosed(await getEmojiPanelHeight(page))
    })

    const closedIconSrc = await getEmojiToggleIconSrc(page)
    expect(closedIconSrc).not.toBe(openIconSrc)
    expect(isPanelClosed(await getEmojiPanelHeight(page))).toBe(true)
  })

  it('核心交互 - 表情列表渲染数量正确', async () => {
    const toggle = await page.$('.emoji-toggle')
    await toggle.tap()
    await page.waitFor(400)

    const items = await page.$$('.emoji-item')
    expect(items.length).toBe(64)

    // 收起
    const toggle2 = await page.$('.emoji-toggle')
    await toggle2.tap()
    await page.waitFor(300)
  })

  it('核心交互 - 切换动画开关', async () => {
    const switchEl = await page.$('switch')
    await switchEl.tap()
    await page.waitFor(300)
    const animateEls = await page.$$('.emoji-panel-animate')
    expect(animateEls.length).toBe(1)
    // 还原
    await switchEl.tap()
    await page.waitFor(300)
  })

  it('核心交互 - 输入@唤起联系人面板', async () => {
    await page.callMethod('jest_simulateAtInput', '@')
    await page.waitFor(400)

    const panelShow = await page.$$('.user-list-panel-show')
    expect(panelShow.length).toBe(1)

    const items = await page.$$('.user-list-item')
    expect(items.length).toBe(8)
  })

  it('核心交互 - 点击联系人插入提及并关闭面板', async () => {
    const firstItem = await page.$('.user-list-item')
    await firstItem.tap()
    await page.waitFor(400)

    const panelShow = await page.$$('.user-list-panel-show')
    expect(panelShow.length).toBe(0)
  })

  it('核心交互 - 删除@后联系人面板收起', async () => {
    await page.callMethod('jest_simulateAtInput', '@')
    await page.waitFor(300)
    await page.callMethod('jest_simulateAtInput', '')
    await page.waitFor(300)

    const panelShow = await page.$$('.user-list-panel-show')
    expect(panelShow.length).toBe(0)
  })

  it('核心交互 - 点击遮罩关闭联系人面板', async () => {
    await page.callMethod('jest_simulateAtInput', '@')
    await page.waitFor(300)

    const mask = await page.$('.user-list-mask')
    await mask.tap()
    await page.waitFor(400)

    const panelShow = await page.$$('.user-list-panel-show')
    expect(panelShow.length).toBe(0)
  })
})
