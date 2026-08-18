const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.includes('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony

const PAGE_PATH = '/pages/component-instance/inherit-attrs/inherit-attrs-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/inherit-attrs/inherit-attrs-composition'

describe('inheritAttrs', () => {
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }

  const test = async (pagePath, pageType) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    const pageCountEl = await page.$(`#inherit-attrs-${pageType}-count`)
    expect(await pageCountEl.text()).toBe('0')
    const trueCompCountEl = await page.$(`#comp-inherit-attrs-true-${pageType}-count`)
    expect(await trueCompCountEl.text()).toBe('0')

    const trueCompRootEl = await page.$(`#comp-inherit-attrs-true-${pageType}`)
    await trueCompRootEl.tap()
    await page.waitFor(500)

    expect(await pageCountEl.text()).toBe('1')
    expect(await trueCompCountEl.text()).toBe('1')

    const falseCompRootEl = await page.$(`.comp-inherit-attrs-false-${pageType}`)
    await falseCompRootEl.tap()
    await page.waitFor(500)

    expect(await pageCountEl.text()).toBe('1')

    const trueIdEl = await page.$(`#comp-inherit-attrs-true-${pageType}-id`)
    expect(await trueIdEl.text()).toBe(`comp-inherit-attrs-true-${pageType}`)
    const trueClassEl = await page.$(`#comp-inherit-attrs-true-${pageType}-class`)
    // TODO: 待 dom2 调整 class 后移除 ^ @fxy
    expect(await trueClassEl.text()).toBe(isApp ? 'p-10,bg-red' : 'p-10 bg-red')
    if (!isDom2) {
      // dom2 不支持 data-set
      const trueDataTestEl = await page.$(`#comp-inherit-attrs-true-${pageType}-data-test`)
      expect(await trueDataTestEl.text()).toBe(`comp-inherit-attrs-true-${pageType}`)
    }

    const falseIdEl = await page.$(`#comp-inherit-attrs-false-${pageType}-id`)
    expect(await falseIdEl.text()).toBe('container')
    const falseClassEl = await page.$(`#comp-inherit-attrs-false-${pageType}-class`)
    expect(await falseClassEl.text()).toBe(isApp ? `p-10,comp-inherit-attrs-false-${pageType}` : `p-10 comp-inherit-attrs-false-${pageType}`)
    if (!isDom2) {
      // dom2 不支持 data-set
      const falseDataTestEl = await page.$(`#comp-inherit-attrs-false-${pageType}-data-test`)
      expect(await falseDataTestEl.text()).toBe('')
    }
  }

  if (!isDom2) {
    it('inheritAttrs Options API', async () => {
      await test(PAGE_PATH, 'options')
    })
  }

  it('inheritAttrs Composition API', async () => {
    await test(PAGE_COMPOSITION_PATH, 'composition')
  })
})
