const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH_OPTIONS = '/pages/built-in/special-elements/template/template-options'
const PAGE_PATH_COMPOSITION = '/pages/built-in/special-elements/template/template-composition'

describe('built-in/special-elements/component', () => {
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    const showBtn = await page.$('#show-botton')
    expect(await showBtn.text()).toBe("点击显示")
    await showBtn.tap()
    await page.waitFor(500)
    
    const dataInfo = await page.data('dataInfo')
    expect(dataInfo.isShow).toBeTruthy()
    const getTitle = await page.$('#title')
    expect(await getTitle.text()).toBe("hello")
    expect(await showBtn.text()).toBe("点击隐藏")
    expect((await page.$$('.item')).length).toBe(2)
  }
  if (!isDom2) {
    it('template Options API', async () => {
      await test(PAGE_PATH_OPTIONS)
    })
  }
  it('template Composition API', async () => {
    await test(PAGE_PATH_COMPOSITION)
  })
});