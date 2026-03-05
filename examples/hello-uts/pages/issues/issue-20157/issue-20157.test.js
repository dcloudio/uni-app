const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isHarmony = platformInfo.startsWith('harmony')

let page 
if(isHarmony) {
  beforeAll(async () => {
    page = await program.reLaunch('/pages/issues/issue-20157/issue-20157')
  });
}

describe('issue-20157', () => {
  if(!isHarmony) {
    it('skip',() => {
      expect(1).toBe(1)
    })
    return
  }
  
  it('issue-20157', async () => {
    const {
      a,
      b
    } = await page.data()
    expect(a).toBe('ab')
    expect(b).toBe(12)
  })
});