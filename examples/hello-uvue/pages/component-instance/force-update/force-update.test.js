const PAGE_PATH = '/pages/component-instance/force-update/force-update-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/force-update/force-update-composition'

describe('$forceUpdate', () => {
  let page

  it('force-update Options API', async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    const timeEl = await page.$('.time')
    const timeText1 = (await timeEl.text()).replace('Date.now(): ', '')

    const triggerForceUpdateBtn = await page.$('.trigger-force-update-btn')
    await triggerForceUpdateBtn.tap()
    await page.waitFor(500)

    const timeText2 = (await timeEl.text()).replace('Date.now(): ', '')
    expect(parseInt(timeText2)).toBeGreaterThan(parseInt(timeText1))
  })

  it('force-update Composition API', async () => {
    page = await program.reLaunch(PAGE_COMPOSITION_PATH)
    await page.waitFor('view')
    const timeEl = await page.$('.time')
    const timeText1 = (await timeEl.text()).replace('Date.now(): ', '')

    const triggerForceUpdateBtn = await page.$('.trigger-force-update-btn')
    await triggerForceUpdateBtn.tap()
    await page.waitFor(500)

    const timeText2 = (await timeEl.text()).replace('Date.now(): ', '')
    expect(parseInt(timeText2)).toBeGreaterThan(parseInt(timeText1))
  })
})
