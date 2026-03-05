const ERR_RE = /expected:<(.*)> but was:<(.*)>/
let result;
const resultEmptyError = '获取到 result 是空的, 请运行项目进行排查'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')

beforeAll(async () => {
  if(isWeb) {
    const homePage = await program.reLaunch('/pages/index/index')
    await homePage.waitFor('view')
    await homePage.waitFor(10000)
  }
  await program.reLaunch('/pages/index/basicTest')
  page = await program.currentPage()
  await page.waitFor(3000);
  const data = await page.data();
  result = data['result']
})

function getApiFailed(describe, api) {
  if(Object.keys(result).length === 0){
    return resultEmptyError
  }
  const failed = result[describe]?.failed?.find(item => {
    return item.split(':')[0] === api
  })
  return failed
}

describes.forEach(d => {
  d?.describe && describe(d.describe, () => {
    d?.tests && d.tests.forEach(api => {
      it(api, () => {
        const failed = getApiFailed(d.describe, api)
        if(failed == resultEmptyError){
          expect('').toBe(resultEmptyError)
        }else if (failed) {
          const parts = failed.split('\n')
          const matches = parts[1].match(ERR_RE)
          if (matches?.length) {
            expect(matches[2]).toEqual(matches[1])
          } else {
            expect(parts[1]).toEqual('')
          }
        }
      })
    })
  })
})

if (process.env.UNI_PROJECT_TYPE === '2.0' && process.env.uniTestPlatformInfo.toLocaleLowerCase().startsWith('ios')) {
  describe('testTypeFromAppJs',  () => {
    it("jest_testTypeFromAppJs", async () => {
      const res = await page.callMethod('jest_testTypeFromAppJs')
      expect(res).toEqual(true)
    })
  })
}