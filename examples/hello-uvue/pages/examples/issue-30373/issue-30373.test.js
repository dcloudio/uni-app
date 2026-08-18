const PAGE_PATH = '/pages/examples/issue-30373/issue-30373'

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isMP = platformInfo.startsWith('mp')

// #30373：静态 v-for 位于组件 slot 内时，v-for/slot 相关渲染数据必须被正确持有，避免内容丢失或 native crash。
describe(PAGE_PATH, () => {
  it('组件插槽内静态 v-for 内容稳定显示', async () => {
    const page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(1000)

    const gcText = await page.$('#issue-30373-gc')
    expect(gcText).not.toBe(null)
    expect(await gcText.text()).toBe('gc-40000')

    if (isMP) {
      // 微信小程序自动化测试无法获取动态插槽内的截图，用截图对比测试兜底
      const image = await program.screenshot();
      expect(image).toSaveImageSnapshot();
    } else {
      const cases = [
        ['default', 'default'],
        ['footer', 'footer'],
        ['scoped', 'scoped']
      ]

      for (const [prefix, textPrefix] of cases) {
        for (let i = 1; i <= 5; i++) {
          const element = await page.$(`#issue-30373-${prefix}-${i}`)
          expect(element).not.toBe(null)
          const text = await element.text()
          expect(text).toBe(`${textPrefix}-${i}`)
        }
      }
    }
  })
})
