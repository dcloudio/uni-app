const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/directive/v-model/v-model-options'

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.includes('harmony')
const isMP = platformInfo.startsWith('mp')

describe('v-model', () => {
  if (isDom2) {
    it('not support options API in vapor mode', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(1000)
  })

  it('input', async () => {
    const modelStrInput = await page.$('#model-str')
    await modelStrInput.input('new str')
    const str = await page.$('#str')
    expect(await str.text()).toBe('new str')

    if (!isIos && !isHarmony) {
      // TODO: ios & harmony 不支持 number & trim 修饰符
      const modelNumInput = await page.$('#model-num')
      await modelNumInput.input('123')
      const typeofNum = await page.$('#typeof-num')
      expect(await typeofNum.text()).toBe('number')

      const modelStrTrimInput = await page.$('#model-str-trim')
      await modelStrTrimInput.input('  trim  ')
      const strLength = await page.$('#str-length')
      expect(await strLength.text()).toBe('4')
      
      if (isMP) {
        const parentComponent = await page.$('#parent-component')
        expect(await parentComponent.text()).toBe('nested')
      } else {
        const sonInput = await page.$('.son-component')
        expect(await sonInput.text()).toBe('nested')
      }
    }
    // TODO: lazy 修饰符仅 android 支持，补充测试
  })
})