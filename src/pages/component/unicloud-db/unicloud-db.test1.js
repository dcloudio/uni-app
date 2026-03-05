const PAGE_PATH = '/pages/unicloud-db/unicloud-db'

describe('unicloud-db', () => {
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
  })
  it('add/get/update/remove', async () => {
    await page.callMethod('add')
    await page.waitFor(3000)
    const {
      $addResult
    } = await page.data()
    expect($addResult['id'].length > 0).toBe(true)

    await page.callMethod('update', $addResult['id'])
    await page.waitFor(3000)
    const {
      $updateResult
    } = await page.data()
    expect($updateResult['updated']).toBe(1)

    await page.callMethod('remove', $addResult['id'])
    await page.waitFor(3000)
    const {
      $removeResult
    } = await page.data()
    expect($removeResult['deleted']).toBe(1)
  })
})