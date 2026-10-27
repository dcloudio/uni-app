const PAGE_PATH = '/pages/CSS/text/word-break'

describe('css-word-break', () => {
  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
  })

  it('normal screenshot', async () => {
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return 'css-word-break-normal'
      }
    })
  })

  it('break-all screenshot', async () => {
    await page.callMethod('radioChangeWordBreak', 2)
    await page.waitFor(100)
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return 'css-word-break-break-all'
      }
    })
  })
})
