const isIOS = process.env.uniTestPlatformInfo.toLowerCase().startsWith('ios')

describe('uni.exit', () => {
  const testIOS = isIOS ? it : it.skip

  testIOS('ExitFail', async () => {
    const page = await program.reLaunch('/pages/API/exit/exit')
    await page.callMethod('exitAppClick')
    await page.waitFor(async () => (await page.data('exitCallback')) !== '')
    expect(await page.data('exitCallback')).toBe('fail')
  })
})
