const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('list-view-children-in-slot', () => {
  if (isMP) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/list-view/list-view-children-in-slot')
    await page.waitFor('list-view')
    await page.waitFor(1000)
  })

  it('screenshot', async () => {
    const image = await program.screenshot({fullPage: true})
    expect(image).toSaveImageSnapshot();
  });

  // 蒸汽模式下非可回收模式下list-view下的list-item不会作为list-item渲染，而是作为view渲染，此页面list-item计数测试暂不支持在蒸汽模式下进行
  if (isVapor) {
    return
  }

  it('basic', async () => {
    let listItems = await page.$$('list-item')
    expect(listItems.length).toBe(9)

    let texts = await page.$$('.text-in-list-item')
    for (let i = 0; i < texts.length; i++) {
      expect(await texts[i].text()).toBe(`${i > (texts.length / 2 - 1)? i - texts.length / 2 : i}`)
    }

    const addBtn = await page.$('#add-btn')
    await addBtn.tap()
    await page.waitFor(500)

    listItems = await page.$$('list-item')
    expect(listItems.length).toBe(11)

    texts = await page.$$('.text-in-list-item')
    for (let i = 0; i < texts.length; i++) {
      expect(await texts[i].text()).toBe(`${i > (texts.length / 2 - 1)? i - texts.length / 2 : i}`)
    }

    const emptyBtn = await page.$('#empty-btn')
    await emptyBtn.tap()
    await page.waitFor(500)
    listItems = await page.$$('list-item')
    expect(listItems.length).toBe(3)

    await addBtn.tap()
    await page.waitFor(500)
    listItems = await page.$$('list-item')
    expect(listItems.length).toBe(5)

    texts = await page.$$('.text-in-list-item')
    for (let i = 0; i < texts.length; i++) {
      expect(await texts[i].text()).toBe(`0`)
    }
  })
})
