const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith("android")
const isIos = platformInfo.startsWith("ios")
const isWeb = platformInfo.startsWith("web")
const isMP = platformInfo.startsWith('mp')
const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

let page

describe("css-custom-variable", () => {
  if (isMP) {
  	it('skip mp or dom2', () => {
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
})
