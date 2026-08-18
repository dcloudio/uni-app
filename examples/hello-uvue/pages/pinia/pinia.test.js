const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/pinia/pinia'

describe('pinia', () => {
  if (!isMP || !isWeb || !isDom2) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  it('basic store usage', async () => {
    const page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')

    const name = await page.$('#store-name')
    const count = await page.$('#store-count')
    const doubleCount = await page.$('#store-double-count')
    const countText = await page.$('#store-count-text')

    expect(await name.text()).toBe('Pinia')
    expect(await count.text()).toBe('0')
    expect(await doubleCount.text()).toBe('0')
    expect(await countText.text()).toBe('Pinia: 0')

    const incrementBtn = await page.$('#increment-btn')
    await incrementBtn.tap()
    await page.waitFor(500)

    expect(await count.text()).toBe('1')
    expect(await doubleCount.text()).toBe('2')
    expect(await countText.text()).toBe('Pinia: 1')

    const decrementBtn = await page.$('#decrement-btn')
    await decrementBtn.tap()
    await page.waitFor(500)

    expect(await count.text()).toBe('0')
    expect(await doubleCount.text()).toBe('0')
    expect(await countText.text()).toBe('Pinia: 0')

    const renameBtn = await page.$('#rename-btn')
    await renameBtn.tap()
    await page.waitFor(500)

    expect(await name.text()).toBe('Pinia Store')
    expect(await countText.text()).toBe('Pinia Store: 0')

    await incrementBtn.tap()
    await page.waitFor(500)

    expect(await count.text()).toBe('1')
    expect(await doubleCount.text()).toBe('2')
    expect(await countText.text()).toBe('Pinia Store: 1')

    const resetBtn = await page.$('#reset-btn')
    await resetBtn.tap()
    await page.waitFor(500)

    expect(await name.text()).toBe('Pinia')
    expect(await count.text()).toBe('0')
    expect(await doubleCount.text()).toBe('0')
    expect(await countText.text()).toBe('Pinia: 0')
  })
})
