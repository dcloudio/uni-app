const PAGE_PATH = '/pages/uni-ui/icons/icons'

describe('icons', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(3000)
  })

  it('uses the name display mode by default', async () => {
    expect(await page.data('checked')).toBe(false)
    expect(await page.data('activeIndex')).toBe(-1)
  })

  it('icons snapshot', async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
