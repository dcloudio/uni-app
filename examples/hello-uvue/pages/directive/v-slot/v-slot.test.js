const OPTIONS_PAGE_PATH = '/pages/directive/v-slot/v-slot-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-slot/v-slot-composition'

describe('v-slot', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
  const isIOS = platformInfo.startsWith('ios')
  const isMP = platformInfo.startsWith('mp')
  let page
  
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    
    const slotHeader = await page.$('#slot-header')
    expect(await slotHeader.text()).toBe('foo msg')

    const slotDefault = await page.$('#slot-default')
    expect(await slotDefault.text()).toBe('0')
    
    if(!isMP) {
      const slotNum1 = await page.$('#slot-num1')
      expect(await slotNum1.text()).toBe('0')
      const slotNum2 = await page.$('#slot-num2')
      expect(await slotNum2.text()).toBe('0')
      
      const slotMsgTrue = await page.$('#slot-msg-true')
      expect(await slotMsgTrue.text()).toBe('foo msg')
      const slotMsgFalse = await page.$('#slot-msg-false')
      expect(slotMsgFalse).toBe(null)
    }

    const slotFooter = await page.$('#slot-footer')
    expect(await slotFooter.text()).toBe('["a","b","c"]')
  }
  
  it('v-slot', async () => {
    await test(OPTIONS_PAGE_PATH)
  })
  
  it('defineSlots', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
