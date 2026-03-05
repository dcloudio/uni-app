const PAGE_PATH_OPTIONS = '/pages/built-in/special-elements/template/template-options'
const PAGE_PATH_COMPOSITION = '/pages/built-in/special-elements/template/template-composition'

describe('built-in/special-elements/component', () => {
  let page
  const test = async () => {
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
  it('template Options API', async () => {
    page = await program.reLaunch(PAGE_PATH_OPTIONS)
    await test()
  })
  it('template Composition API', async () => {
    page = await program.reLaunch(PAGE_PATH_COMPOSITION)
    await test()
  })
});