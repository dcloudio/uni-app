const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
let page

describe("flex-issue-26331", () => {

  it("test-flex-issue-26331", async () => {
    var page = await program.reLaunch("/pages/CSS/display/flex_issue_26331")
    await page.waitFor("view")
    const openContainer = await page.$("#openContainer")
    openContainer.tap()
    await page.waitFor(500)

    const closeContainer = await page.$("#closeContainer")
    closeContainer.tap()
    await page.waitFor(500)

    const openContainerSmall = await page.$("#openContainerSmall")
    openContainerSmall.tap()
    await page.waitFor(500)

    const image = await program.screenshot({
      fullPage: true,
    })
    expect(image).toSaveImageSnapshot()
  })

})
