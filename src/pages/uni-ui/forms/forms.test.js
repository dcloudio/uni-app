const PAGE_PATH = '/pages/uni-ui/forms/forms'

describe('forms', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('reports the first error when required fields are empty', async () => {
    expect(await page.data('statusText')).toBe('等待校验')
    expect((await page.data('formData')).name).toBe('')

    await page.callMethod('validateForm')
    await page.waitFor(100)

    expect(await page.data('statusText')).toBe('请输入姓名')
  })

  it('passes after demo values are filled', async () => {
    await page.callMethod('setDemoValues')
    await page.waitFor(100)
    expect((await page.data('formData')).name).toBe('张三')
    expect((await page.data('formData')).email).toBe('name@example.com')
    expect((await page.data('formData')).profile.nickname).toBe('小张')

    await page.callMethod('validateForm')
    await page.waitFor(100)

    expect(await page.data('statusText')).toBe('校验通过')
  })

  it('restores the initial values', async () => {
    await page.callMethod('setDemoValues')
    await page.callMethod('resetForm')
    await page.waitFor(100)

    const formData = await page.data('formData')
    expect(formData.name).toBe('')
    expect(formData.city).toBe('')
    expect(formData.email).toBe('')
    expect(formData.profile.nickname).toBe('')
    expect(await page.data('statusText')).toBe('已重置为初始值')
  })

  it('forms snapshot', async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
