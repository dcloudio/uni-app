const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isHarmony = platformInfo.startsWith('harmony')

const PAGE_PATH = '/pages/API/request-system-permission/request-system-permission'
const UNCONFIGURED_PERMISSION = 'ohos.permission.ACCESS_BLUETOOTH'
const ACCELEROMETER_PERMISSION = 'ohos.permission.ACCELEROMETER'

describe('ExtApi-RequestSystemPermission', () => {
  if (!isHarmony) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600)
  })

  async function request(method) {
    await page.callMethod(method)
    await page.waitFor(async () => await page.data('data.complete') === true)
    return await page.data('data')
  }

  it('request granted permission', async () => {
    const data = await request('jestRequestPermissions')
    expect(data.status).toBe('申请成功')
    expect(data.errCode).toBe(0)
    expect(data.grantedList).toEqual([ACCELEROMETER_PERMISSION])
    expect(data.deniedList).toEqual([])
    expect(data.doNotAskAgainList).toEqual([])
  })

  it('empty permissions', async () => {
    const data = await request('jestRequestEmptyPermissions')
    expect(data.status).toBe('申请失败')
    expect(data.errCode).toBe(1560601)
    expect(data.grantedList).toEqual([])
    expect(data.deniedList).toEqual([])
    expect(data.doNotAskAgainList).toEqual([])
  })

  it('request unconfigured permission', async () => {
    const data = await request('jestRequestUnconfiguredPermission')
    expect(data.status).toBe('申请成功')
    expect(data.errCode).toBe(0)
    expect(data.grantedList).toEqual([])
    expect(data.deniedList).toEqual([UNCONFIGURED_PERMISSION])
    expect(data.doNotAskAgainList).toEqual([])
  })
})
