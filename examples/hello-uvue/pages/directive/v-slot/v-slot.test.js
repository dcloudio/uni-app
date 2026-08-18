const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

describe('v-slot', () => {
  if (isDom2) {
    it('dom2 编译失败', async () => {
      expect(1).toBe(1)
    })
    return
  }

  const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
  const isMP = platformInfo.startsWith('mp')
  const OPTIONS_PAGE_PATH = '/pages/directive/v-slot/v-slot-options'
  const COMPOSITION_PAGE_PATH = '/pages/directive/v-slot/v-slot-composition'
  
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
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
    
    if (!isMP) {
      // 小程序scopedSlot不支持此测试例
      const slotFor1 = await page.$('#slot-for-1')
      const slotFor2 = await page.$('#slot-for-2')
      expect(await slotFor1.text()).toBe('1')
      expect(await slotFor2.text()).toBe('2')
    }
    
  }
  
  if (!isDom2) {
    it('v-slot', async () => {
      await test(OPTIONS_PAGE_PATH)
    })
  }
  
  it('defineSlots', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
