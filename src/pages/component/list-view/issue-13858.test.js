const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')

describe('issue-13858', () => {
  if (!isWeb) {
    it('skip not web', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page

  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/list-view/issue-13858')
    await page.waitFor('view')
  })

  it('check mounted', async () => {
    await page.waitFor(500)
    const {
      childMountedTriggeredCount
    } = await page.data('data')
    expect(childMountedTriggeredCount).toBe(1)
  })

})
