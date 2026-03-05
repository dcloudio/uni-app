const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const PAGE_PATH_OPTIONS = '/pages/built-in/component/keep-alive/keep-alive-options'
const PAGE_PATH_COMPOSITION = '/pages/built-in/component/keep-alive/keep-alive-composition'

describe('keep-alive', () => {
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  const testKeepAlive = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    
    let shouldExcludeBtnList = await page.$$('.should-exclude-btn')
    for (let i = 0; i < shouldExcludeBtnList.length; i++) {
      await shouldExcludeBtnList[i].tap()
    }
    let shouldExcludeTexts = await page.$$('.should-exclude-text')
    for (let i = 0; i < shouldExcludeTexts.length; i++) {
      expect(await shouldExcludeTexts[i].text()).toBe('count: 1')
    }

    const showCounterBtn = await page.$('.show-counter')
    await showCounterBtn.tap()

    const activatedNum = await page.$('#activated-num')
    expect(await activatedNum.text()).toBe('activated num: 1')
    const deactivatedNum = await page.$('#deactivated-num')
    expect(await deactivatedNum.text()).toBe('deactivated num: 0')
    shouldExcludeBtnList = await page.$$('.should-exclude-btn')
    expect(shouldExcludeBtnList.length).toBe(0)

    const counterBtnList = await page.$$('.counter-btn')
    for (let i = 0; i < counterBtnList.length; i++) {
      await counterBtnList[i].tap()
    }

    const showShouldExcludeBtn = await page.$('.show-should-exclude')
    await showShouldExcludeBtn.tap()

    shouldExcludeTexts = await page.$$('.should-exclude-text')
    for (let i = 0;i < shouldExcludeTexts.length;i++) {
      const text = await shouldExcludeTexts[i].text()
      if (i < shouldExcludeTexts.length - 1) {
        expect(text).toBe('count: 0')
      } else {
        expect(text).toBe('count: 1')
      }
    }

    await showCounterBtn.tap()


    expect(await activatedNum.text()).toBe('activated num: 2')
    expect(await deactivatedNum.text()).toBe('deactivated num: 1')

    let counterTexts = await page.$$('.counter-text')
    for (let i = 0; i < counterTexts.length; i++) {
      expect(await counterTexts[i].text()).toBe('count: 1')
    }

    const showMessageBtn = await page.$('.show-message')
    await showMessageBtn.tap()

    const changeMessageBtnList = await page.$$('.change-message')
    for (let i = 0; i < changeMessageBtnList.length; i++) {
      await changeMessageBtnList[i].tap()
    }

    let messageTexts = await page.$$('.message-text')
    for (let i = 0; i < messageTexts.length; i++) {
      expect(await messageTexts[i].text()).toBe('msg: message changed')
    }

    await showCounterBtn.tap()

    expect(await activatedNum.text()).toBe('activated num: 3')
    expect(await deactivatedNum.text()).toBe('deactivated num: 2')

    counterTexts = await page.$$('.counter-text')
    for (let i = 0; i < counterTexts.length; i++) {
      expect(await counterTexts[i].text()).toBe('count: 1')
    }

    await showMessageBtn.tap()

    messageTexts = await page.$$('.message-text')
    for (let i = 0; i < messageTexts.length; i++) {
      expect(await messageTexts[i].text()).toBe('msg: message changed')
    }

    await showShouldExcludeBtn.tap()
    
    shouldExcludeTexts = await page.$$('.should-exclude-text')
    for (let i = 0; i < shouldExcludeTexts.length; i++) {
      expect(await shouldExcludeTexts[i].text()).toBe('count: 0')
    }
  }
  it('keep-alive Options API', async () => {
    await testKeepAlive(PAGE_PATH_OPTIONS)
  })
  it('keep-alive Composition API', async () => {
    await testKeepAlive(PAGE_PATH_COMPOSITION)
  })
})