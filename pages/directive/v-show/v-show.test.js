const OPTIONS_PAGE_PATH = '/pages/directive/v-show/v-show-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-show/v-show-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

async function isElementShow(ele) {
  if(isMP) {
    const hidden = await ele.property('hidden')
    return hidden !== true
  } else {
    const display = await ele.style('display')
    return display !== 'none'
  }
}

describe('v-show', () => {
  let page
  
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    let dataInfo = await page.data('dataInfo')
    expect(dataInfo.showDefaultTrue).toBe(true)
    expect(dataInfo.showDefaultFalse).toBe(false)
    await page.waitFor(1000)
    
    const vShowElementDefaultTrue = await page.$('#v-show-element-default-true')
    expect(await isElementShow(vShowElementDefaultTrue)).toBe(true)
    const vShowElementDefaultFalse = await page.$('#v-show-element-default-false')
    expect(await isElementShow(vShowElementDefaultFalse)).toBe(false)
    const foo = await page.$('#foo')
    if(!isMP) {
      // 组件无法获取hidden属性
      expect(await isElementShow(foo)).toBe(false)
    }

    const toggle = await page.$('#toggle-btn')
    await toggle.tap()
    await page.waitFor(100)
    
    dataInfo = await page.data('dataInfo')
    expect(dataInfo.showDefaultTrue).toBe(false)
    expect(dataInfo.showDefaultFalse).toBe(true)
    expect(await isElementShow(vShowElementDefaultTrue)).toBe(false)
    expect(await isElementShow(vShowElementDefaultFalse)).toBe(true)
    if(!isMP) {
      expect(await isElementShow(foo)).toBe(true)
    }
    
    await toggle.tap()
    await page.waitFor(100)
    dataInfo = await page.data('dataInfo')
    expect(dataInfo.showDefaultTrue).toBe(true)
    expect(dataInfo.showDefaultFalse).toBe(false)
    expect(await isElementShow(vShowElementDefaultTrue)).toBe(true)
    expect(await isElementShow(vShowElementDefaultFalse)).toBe(false)
    if(!isMP) {
      expect(await isElementShow(foo)).toBe(false)
    }
  }
  
  it('v-show options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })
  
  it('v-show composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})