const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

const PAGE_PATHS = [
  '/pages/uni-ui/tab-bar/tab-bar',
  '/pages/uni-ui/tab-bar/tab-bar-dark',
  '/pages/uni-ui/tab-bar/tab-bar-custom',
  '/pages/uni-ui/tab-bar/tab-bar-midbutton',
  '/pages/uni-ui/tab-bar/tab-bar-midbutton-notch'
]

// app 非蒸汽模式不支持
if (!(isApp && !isDom2)) {
  PAGE_PATHS.push('/pages/uni-ui/tab-bar/tab-bar-blur')
}

describe('tab-bar', () => {
  let page

  async function launchPage(pagePath) {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(1000)
  }

  it.each(PAGE_PATHS)('%s snapshot', async (pagePath) => {
    await launchPage(pagePath)

    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
