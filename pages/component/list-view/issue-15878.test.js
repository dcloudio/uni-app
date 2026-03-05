const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('issue-15878', () => {
  let page

  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/list-view/issue-15878')
    await page.waitFor(600)
  })

  it('issue-15878', async () => {
    await page.setData({
      data: {
        refresherTriggered: true
      }
    })
    await page.waitFor(600)
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
