const OPTIONS_PAGE_PATH = '/pages/directive/v-once/v-once-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-once/v-once-composition'

describe('v-once', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isMP = platformInfo.startsWith('mp')
  if (isWeb || isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
	let page
	
	const test = async (pagePath) => {
		page = await program.reLaunch(pagePath)
		await page.waitFor('view')
		
		const vOnceMsg = await page.$('#v-once-msg')
		expect(await vOnceMsg.text()).toBe('hello world')
		
		const msg = await page.$('#msg')
		expect(await msg.text()).toBe('hello world')

		const btn = await page.$('#btn')
		await btn.tap()

		expect(await vOnceMsg.text()).toBe('hello world')
		expect(await msg.text()).toBe('msg changed')
	}
	
	it('v-once options API', async () => {
		await test(OPTIONS_PAGE_PATH)
	})
	
	it('v-once composition API', async () => {
		await test(COMPOSITION_PAGE_PATH)
	})
})