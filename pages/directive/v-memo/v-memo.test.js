const OPTIONS_PAGE_PATH = '/pages/directive/v-memo/v-memo-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-memo/v-memo-composition'

describe('v-memo', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.includes('android')
  const isIOS = platformInfo.includes('ios')
  const isMP = platformInfo.startsWith('mp')
  const isWeb = platformInfo.startsWith('web')
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
    
    const neverChangeMsg = await page.$('#v-memo-never-change-msg')
    expect(await neverChangeMsg.text()).toBe('hello world')

    const msg = await page.$('#msg')
    expect(await msg.text()).toBe('hello world')
    
    const numChangeMsg = await page.$('#v-memo-num-change-msg')
    expect(await numChangeMsg.text()).toBe('hello world')

    const changeMessageBtn = await page.$('#change-message-btn')
    await changeMessageBtn.tap()

    expect(await neverChangeMsg.text()).toBe('hello world')
    expect(await msg.text()).toBe('msg changed')
    expect(await numChangeMsg.text()).toBe('hello world')

    const incrementNumBtn = await page.$('#increment-num-btn')
    await incrementNumBtn.tap()

    expect(await neverChangeMsg.text()).toBe('hello world')
    expect(await msg.text()).toBe('msg changed')
    expect(await numChangeMsg.text()).toBe('msg changed')
  }
  
  it('v-memo options API', async () => {
		await test(OPTIONS_PAGE_PATH)
	})
	
	it('v-memo composition API', async () => {
		await test(COMPOSITION_PAGE_PATH)
	})
})
