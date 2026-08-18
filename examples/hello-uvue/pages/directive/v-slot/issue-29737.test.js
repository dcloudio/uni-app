const PAGE_PATH = '/pages/directive/v-slot/issue-29737'

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isMP = platformInfo.startsWith('mp')

// #29737：最小 easycom 组件懒渲染首次挂载时，item 作用域插槽必须使用父级插槽上下文。
describe(PAGE_PATH, () => {
  it('打开弹层后显示父级 item 插槽内容', async () => {
    const page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('scroll-view')

    let text = await page.$('#slot-pass-text')
    expect(text).toBe(null)

    await page.callMethod('openPanel')
    await page.waitFor(1000)

    if (isMP) {
      // 微信小程序自动化测试无法获取动态插槽内的截图，用截图对比测试兜底
      const image = await program.screenshot();
      expect(image).toSaveImageSnapshot();
    } else {
      text = await page.$('#slot-pass-text')
      expect(text).not.toBe(null)
      const content = await text.text()
      expect(content).toContain('正常：')
      expect(content).toContain('深圳市创明展览设计有限公司')
      expect(content).toContain('29737')
    }
  })
})

