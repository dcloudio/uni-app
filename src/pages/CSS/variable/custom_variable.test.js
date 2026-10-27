const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIOS || isHarmony

let page

describe("css-custom-variable", () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }
  it("screenshot", async () => {
    page = await program.reLaunch("/pages/CSS/variable/custom_variable")
    await page.waitFor("view")
    const image = await program.screenshot({
      fullPage: true,
    })
    expect(image).toSaveImageSnapshot()
  })
  // 点击 .test-v-if-button 按钮，查询 .test-v-if 元素高度
  it("test-v-if", async () => {
    await page.waitFor("view")
    const element = await page.$(".test-v-if")
    const {
      height: height1
    } = await element.size()
    expect(height1).toBe(0)
    const button = await page.$(".test-v-if-button")
    await button.tap()
    await page.waitFor(500)
    const {
      height: height2
    } = await element.size()
    expect(height2).toBe(30)
  })
  // 先查询 #chanageVarBox 的高度并记录
  // 点击 #changeVarButton，查询 #chanageVarBox 的高度，和之前高度应当不一样
  it("test-change-var", async () => {
    const element = await page.$("#chanageVarBox")
    const {
      height: height1
    } = await element.size()
    expect(height1 > 0).toBe(true)
    const button = await page.$("#changeVarButton")
    await button.tap()
    await page.waitFor(500)
    const {
      height: height2
    } = await element.size()
    expect(height2 == height1).toBe(false)
  })
  // 嵌套括号 fallback 测试 - 场景1：应用后是否生效
  // 场景1 区域 --main-color 已定义(#ff0000)，应显示红色
  // 场景3 区域 --main-color 未定义，应 fallback 到 rgba(64,158,255,0.8) 蓝色半透明
  it("test-nested-paren-apply", async () => {
    await page.waitFor("view")
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })
  // 嵌套括号 fallback 测试 - 场景2：修改后是否生效
  // 点击 #changeNestedParenButton 通过 setProperty 修改 --main-color 为 #00ff00
  it("test-nested-paren-change", async () => {
    const button = await page.$("#changeNestedParenButton")
    await button.tap()
    await page.waitFor(500)
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })
  // 嵌套括号 fallback 测试 - 场景3：fallback 是否生效
  // 点击 #toggleNestedParenFallbackButton 设置 --main-color 为 #ff0000，应显示红色
  // 再点击清空 --main-color，应恢复 fallback 到 rgba(64,158,255,0.8) 蓝色半透明
  it("test-nested-paren-fallback", async () => {
    const button = await page.$("#toggleNestedParenFallbackButton")
    await button.tap()
    await page.waitFor(500)
    const image1 = await program.screenshot({ fullPage: true })
    expect(image1).toSaveImageSnapshot()
    await button.tap()
    await page.waitFor(500)
    const image2 = await program.screenshot({ fullPage: true })
    expect(image2).toSaveImageSnapshot()
  })

  it("test-var-important", async () => {
    page = await program.reLaunch("/pages/CSS/variable/custom_variable")
    await page.waitFor("view")
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })

  if (isApp) {
    it("test-use-computed-style-background-color", async () => {
      page = await program.reLaunch("/pages/CSS/variable/custom_variable")
      await page.waitFor("view")
      await page.waitFor(async () => {
        return await page.data('data.useComputedStyleBackgroundColor') == '#ff0000'
      })
      expect(await page.data('data.useComputedStyleBackgroundColor')).toBe('#ff0000')
    })
  }
})
