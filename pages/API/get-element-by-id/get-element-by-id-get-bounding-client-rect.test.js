const PAGE_PATH = '/pages/API/get-element-by-id/get-element-by-id-get-bounding-client-rect'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
describe('transform-DOMRect', () => {
  if (isMP) {
  	it('skip mp', () => {
  		expect(1).toBe(1)
  	})
  	return
  }
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500);
  })

  it('x, y, width, height', async () => {
    const node1Info = await page.callMethod('getNode1Info')
    const node2Info = await page.callMethod('getNode2Info')

    expect(node1Info.x).toBeLessThan(node2Info.x)
    expect(node1Info.y).toBeGreaterThan(node2Info.y)
    expect(node1Info.width).toBeGreaterThan(node2Info.width)
    expect(node1Info.height).toBeGreaterThan(node2Info.height)
  })
})
