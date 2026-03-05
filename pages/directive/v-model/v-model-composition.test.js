const PAGE_PATH = '/pages/directive/v-model/v-model-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

describe('defineModel', () => {
  if(isMP) {
    // TODO 小程序暂不支持defineModel
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const modelValueText = await page.$('#model-value-text')
    expect(await modelValueText.text()).toBe('str')

    const modelValueInput = await page.$('#model-value-input')
    expect(await modelValueInput.value()).toBe('str')

    const modelMsgText = await page.$('#model-msg-text')
    expect(await modelMsgText.text()).toBe('msg')
    
    const modelMsgInput = await page.$('#model-msg-input')
    expect(await modelMsgInput.value()).toBe('msg')
    
    const modelNumText = await page.$('#model-num-text')
    expect(await modelNumText.text()).toBe('1')
    
    const modelStrArrText = await page.$('#model-str-arr-text')
    expect(await modelStrArrText.text()).toBe('["0"]')
    
    const modelNumArrText = await page.$('#model-num-arr-text')
    expect(await modelNumArrText.text()).toBe('[0]')
    
    const modelUtsObjValueText = await page.$('#model-uts-obj-value-text')
    expect(await modelUtsObjValueText.text()).toBe('utsObj.value')
    
    const modelUtsObjValueInput = await page.$('#model-uts-obj-value-input')
    expect(await modelUtsObjValueInput.value()).toBe('utsObj.value')
    
    const modelTypeObjValueText = await page.$('#model-type-obj-value-text')
    expect(await modelTypeObjValueText.text()).toBe('typeObj.value')
    
    const modelTypeObjValueInput = await page.$('#model-type-obj-value-input')
    expect(await modelTypeObjValueInput.value()).toBe('typeObj.value')
    
    const updateValueBtn = await page.$('#update-value-btn')
    await updateValueBtn.tap()
    await page.waitFor(100)
    
    expect(await modelNumText.text()).toBe('2')

    expect(await modelValueText.text()).toBe('str1')
    expect(await modelValueInput.value()).toBe('str1')

    expect(await modelMsgText.text()).toBe('msg2')
    expect(await modelMsgInput.value()).toBe('msg2')

    expect(await modelUtsObjValueText.text()).toBe('utsObj.value1')
    expect(await modelUtsObjValueInput.value()).toBe('utsObj.value1')
    
    expect(await modelTypeObjValueText.text()).toBe('typeObj.value1')
    expect(await modelTypeObjValueInput.value()).toBe('typeObj.value1')
        
    expect(await modelStrArrText.text()).toBe('["0","1"]')
    expect(await modelNumArrText.text()).toBe('[0,1]')
    
    const handleModelValueUpdateRes = await page.$('#handle-model-value-update-res')
    expect(await handleModelValueUpdateRes.text()).toBe('str1')
    
    const handleModelMsgUpdateRes = await page.$('#handle-model-msg-update-res')
    expect(await handleModelMsgUpdateRes.text()).toBe('msg2')
    
    const sonInput = await page.$('#son-input')
    expect(await sonInput.text()).toBe('nested')
  })
})
