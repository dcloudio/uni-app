const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

describe('$forceUpdate', () => {
  if (isDom2) {
    it("not support", async () => {
      expect(1).toBe(1);
    });
    return
  }
  
  const PAGE_PATH = '/pages/component-instance/force-update/force-update-options'
  const PAGE_COMPOSITION_PATH = '/pages/component-instance/force-update/force-update-composition'

  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    const timeEl = await page.$('.time')
    const timeText1 = (await timeEl.text()).replace('Date.now(): ', '')

    const triggerForceUpdateBtn = await page.$('.trigger-force-update-btn')
    await triggerForceUpdateBtn.tap()
    await page.waitFor(500)

    const timeText2 = (await timeEl.text()).replace('Date.now(): ', '')
    expect(parseInt(timeText2)).toBeGreaterThan(parseInt(timeText1))
  }

  it('force-update Options API', async () => {
    await test(PAGE_PATH)
  })

  it('force-update Composition API', async () => {
    await test(PAGE_COMPOSITION_PATH)
  })
})
