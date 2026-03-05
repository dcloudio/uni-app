const PAGE_PATH = '/pages/examples/multiple-style-script/multiple-style-script'

describe(PAGE_PATH, () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
  const isAndroid = platformInfo.startsWith('android')
  const isWeb = platformInfo.startsWith('web')
  const isMP = platformInfo.startsWith('mp')
  const isSafari = platformInfo.includes('safari')
  let page
  
	beforeAll(async () => {
		page = await program.reLaunch(PAGE_PATH)
		await page.waitFor('view')
	})
  it('测试多 style 和 script', async () => {
    const msg = await page.$('#msg')
    expect(await msg.text()).toBe('Hello World')
    if (!isAndroid) {
      const num = await page.$('#num')
      expect(await num.text()).toBe('0')
    }
    const textRed = await page.$('.text-red')
    expect(await textRed.style('color')).toBe(isWeb || isMP ? 'rgb(255, 0, 0)': '#FF0000')
    const textGreen = await page.$('.text-green')
    expect(await textGreen.style('color')).toBe(isWeb || isMP ? 'rgb(0, 128, 0)': '#008000')
    const fontBold = await page.$('.font-bold')
    const fontWeight = await fontBold.style('fontWeight')
    if (isSafari) {
      expect(['700', 'bold'].includes(fontWeight)).toBe(true);
    } else {
      expect(fontWeight).toBe(isWeb || isMP ? '700' : 'bold')
    }
	})
})