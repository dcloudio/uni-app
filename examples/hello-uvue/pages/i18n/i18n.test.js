const PAGE_PATH = '/pages/i18n/i18n'

describe(PAGE_PATH, () => {
  it('switches locale with vue-i18n', async () => {
    const page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')

    await page.callMethod('changeLocale', 'zh-Hans')
    await page.waitFor(500)
    let snapshot = await page.callMethod('getContentSnapshot')
    expect(snapshot.locale).toBe('zh-Hans')
    expect(snapshot.title).toBe('国际化')
    expect(snapshot.description).toBe('使用 vue-i18n 切换页面语言')
    expect(snapshot.greeting).toBe('你好，uni-app x')
    expect(snapshot.named).toBe('欢迎使用 uni-app x')

    await page.callMethod('changeLocale', 'en')
    await page.waitFor(500)
    snapshot = await page.callMethod('getContentSnapshot')
    expect(snapshot.locale).toBe('en')
    expect(snapshot.title).toBe('Internationalization')
    expect(snapshot.description).toBe('Switch page language with vue-i18n')
    expect(snapshot.greeting).toBe('Hello, uni-app x')
    expect(snapshot.named).toBe('Welcome to uni-app x')

    await page.callMethod('changeLocale', 'zh-Hant')
    await page.waitFor(500)
    snapshot = await page.callMethod('getContentSnapshot')
    expect(snapshot.locale).toBe('zh-Hant')
    expect(snapshot.title).toBe('國際化')
    expect(snapshot.description).toBe('使用 vue-i18n 切換頁面語言')
    expect(snapshot.greeting).toBe('你好，uni-app x')
    expect(snapshot.named).toBe('歡迎使用 uni-app x')
  })
})
