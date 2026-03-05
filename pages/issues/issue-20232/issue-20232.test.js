const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')

let page 
if(isAndroid) {
  beforeAll(async () => {
    page = await program.reLaunch('/pages/issues/issue-20232/issue-20232')
  });
}

describe('issue-20232', () => {
  if(!isAndroid || process.env.UNI_APP_X!=='true') {
    it('skip',() => {
      expect(1).toBe(1)
    })
    return
  }
  
  it('issue-20232', async () => {
    const {
      testStatus20232,
    } = await page.data()
    expect(testStatus20232).toBe('测试通过')
  })
});