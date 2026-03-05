const OPTIONS_PAGE_PATH = '/pages/render-function/mergeProps/mergeProps-options'
const COMPOSITION_PAGE_PATH = '/pages/render-function/mergeProps/mergeProps-composition'

describe('mergeProps', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isMP = platformInfo.startsWith('mp')
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page = null
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    
    const mergedClass = await page.$('#merged-class')
    expect(await mergedClass.text()).toBe('foo bar')
    
    const triggerMergedClickBtn = await page.$('#trigger-merged-click')
    await triggerMergedClickBtn.tap()
    
    const clickResList = await page.$$('.click-res')
    expect(clickResList.length).toBe(2)
    expect(await clickResList[0].text()).toBe('propA click res')
    expect(await clickResList[1].text()).toBe('propB click res')
  }
  
  it('mergeProps options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })
  
  it('mergeProps composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})

