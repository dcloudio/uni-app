const OPTIONS_PAGE_PATH = '/pages/render-function/isVNode/isVNode-options'
const COMPOSITION_PAGE_PATH = '/pages/render-function/isVNode/isVNode-composition'

describe('isVNode', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isMP = platformInfo.startsWith('mp')
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page = null
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    
    const isVNodeVNode = await page.$('#is-vnode-vnode')
    expect(await isVNodeVNode.text()).toBe('true')
    
    const isVNodeString = await page.$('#is-vnode-string')
    expect(await isVNodeString.text()).toBe('false')
  }

  it('isVNode options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })

  it('isVNode composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})