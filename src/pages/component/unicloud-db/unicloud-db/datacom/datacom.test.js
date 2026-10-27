const PAGE_PATH = '/pages/component/unicloud-db/unicloud-db/datacom/datacom'
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe('datacom', () => {
  if (!isVapor) {
    it('only supports dom2', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('.title')
  })

  it('mounts the data-city component', async () => {
    await page.waitFor(2500);
    const dataCity = await page.$('.data-city')
    expect(dataCity).not.toBeNull()
  })

  it('reaches a terminal state of the datacom data', async () => {
    await page.waitFor(async () => {
      const dataCity = await page.$('.data-city')
      if (dataCity == null) {
        return false
      }
      const data = await dataCity.$('.data-city-data')
      if (data != null) {
        return true
      }
      const error = await dataCity.$('.data-city-error')
      return error != null
    })

    const dataCity = await page.$('.data-city')
    expect(dataCity).not.toBeNull()
    const loading = await dataCity.$('.data-city-loading')
    expect(loading).toBeNull()

    const data = await dataCity.$('.data-city-data')
    const error = await dataCity.$('.data-city-error')
    expect(data != null || error != null).toBe(true)
  })
})
