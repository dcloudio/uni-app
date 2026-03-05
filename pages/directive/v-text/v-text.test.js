const OPTIONS_PAGE_PATH = '/pages/directive/v-text/v-text-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-text/v-text-composition'

describe('v-text', () => {
  if (!process.env.uniTestPlatformInfo.startsWith('web')) {
    // TODO: 仅 web 支持
    it('not web', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    
    const vTextText = await page.$('#v-text-text')
    expect(await vTextText.text()).toBe('v-text for text')

    const vTextView = await page.$('#v-text-view')
    expect(await vTextView.text()).toBe('v-text for view')
  }
  
  it('v-text options API', async () => {
		await test(OPTIONS_PAGE_PATH)
	})
	
	it('v-text composition API', async () => {
		await test(COMPOSITION_PAGE_PATH)
	})
})
