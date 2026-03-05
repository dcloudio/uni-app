const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')

describe('set-page-backgroundColorContent', () => {
  if (isMP) {
  	it('not support', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/set-page-backgroundColorContent/set-page-backgroundColorContent')
    await page.waitFor(600);
  })

  it('check_backgroundColorContent_red', async () => {
    await page.callMethod('changeColor', "")
    page.waitFor(200)

    const color = (await page.data('data')).currentBackgroundColorContent
    expect(color).toBe("red")


    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })
})
