const PAGE_PATH = '/pages/component/unicloud-db/unicloud-db'
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

// 仅测试dom2
describe('unicloud-db', () => {
  if (!isVapor) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
  })
  it('check udb ref methods', async () => {
    const res = await page.callMethod('checkUdbRefMethods')
    expect(res).toBe(true)
  })
  // it('add/get/update/remove', async () => {
  //   await page.callMethod('add')
  //   await page.waitFor(3000)
  //   const {
  //     $addResult
  //   } = await page.data()
  //   expect($addResult['id'].length > 0).toBe(true)

  //   await page.callMethod('update', $addResult['id'])
  //   await page.waitFor(3000)
  //   const {
  //     $updateResult
  //   } = await page.data()
  //   expect($updateResult['updated']).toBe(1)

  //   await page.callMethod('remove', $addResult['id'])
  //   await page.waitFor(3000)
  //   const {
  //     $removeResult
  //   } = await page.data()
  //   expect($removeResult['deleted']).toBe(1)
  // })
})
