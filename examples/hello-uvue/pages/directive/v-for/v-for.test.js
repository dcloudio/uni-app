const OPTIONS_PAGE_PATH = '/pages/directive/v-for/v-for-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-for/v-for-composition'

describe('v-for', () => {
  let page
  
  const test = async (page) => {
    // v-for number
    const num1 = await page.$('#number-1')
    expect(await num1.text()).toBe('1')
    const num2 = await page.$('#number-2')
    expect(await num2.text()).toBe('2')
    const num3 = await page.$('#number-3')
    expect(await num3.text()).toBe('3')
    
    // v-for uts-number
    const utsNum1 = await page.$('#uts-number-1')
    expect(await utsNum1.text()).toBe('1')
    const utsNum2 = await page.$('#uts-number-2')
    expect(await utsNum2.text()).toBe('2')
    const utsNum3 = await page.$('#uts-number-3')
    expect(await utsNum3.text()).toBe('3')

    // v-for object
    const value1 = await page.$('#value1')
    expect(await value1.text()).toBe('value1')
    const value2 = await page.$('#value2')
    expect(await value2.text()).toBe('value2')
    const value3 = await page.$('#value3')
    expect(await value3.text()).toBe('value3')
    
    const vIf1Count = await page.$('#v-if-1-count')
    expect(await vIf1Count.text()).toBe('0')
    
    await vIf1Count.tap()
    await page.waitFor(100)
    expect(await vIf1Count.text()).toBe('1')
    
    const vShow1Count = await page.$('#v-show-1-count')
    expect(await vShow1Count.text()).toBe('1')
    
    await vShow1Count.tap()
    await page.waitFor(100)
    expect(await vShow1Count.text()).toBe('2')
    
    const mapValue1 = await page.$('#map-key-1')
    expect(await mapValue1.text()).toBe('map value 1')
    const mapValue2 = await page.$('#map-key-2')
    expect(await mapValue2.text()).toBe('map value 2')
    const mapValue3 = await page.$('#map-key-3')
    expect(await mapValue3.text()).toBe('map value 3')
    
    const setValue1 = await page.$('#set-value-1')
    expect(await setValue1.text()).toBe('set value 1')
    const setValue2 = await page.$('#set-value-2')
    expect(await setValue2.text()).toBe('set value 2')
    const setValue3 = await page.$('#set-value-3')
    expect(await setValue3.text()).toBe('set value 3')

    // v-for UTSJSONObject
    for (let i = 1; i <= 3; i++) {
      /// key
      let utsKey = await page.$('#utsKey' + i)
      expect(await utsKey.text()).toBe('utsKey' + i)
      /// value
      let utsValue = await page.$('#UTSJSONObject-value' + i)
      expect(await utsValue.text()).toBe('UTSJSONObject-value' + i)
    }

    await page.waitFor(500)

    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  }
  it('v-for options API', async () => {
    page = await program.reLaunch(OPTIONS_PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(500)
    
    await test(page)
  })
  
  it('v-for composition API', async () => {
    page = await program.reLaunch(COMPOSITION_PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(500)
    
    await test(page)
  })
})
