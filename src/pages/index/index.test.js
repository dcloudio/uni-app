/**
 * 测试 manifest.json 配置的 defaultAppTheme 是否生效
 *
 * 测试系统通过环境变量 UNI_TEST_APP_THEME 携带期望的应用主题：
 *   深色 / 浅色 / 自动
 * 与 uni.getAppBaseInfo() 返回的 appTheme（dark / light / auto）进行匹配，
 * 不匹配则测试不通过
 */
const THEME_MAP = {
  '深色': 'dark',
  '浅色': 'light',
  '自动': 'auto'
}

describe('manifest.json defaultAppTheme 生效测试', () => {
  it('appTheme 应与 UNI_TEST_APP_THEME 指定的主题一致', async () => {
    const defaultAppTheme = process.env.UNI_TEST_APP_THEME
    // 只有自动化测试系统才会传，本地跑测试不会传
    if (defaultAppTheme == null) {
      return
    }
    const expectedTheme = THEME_MAP[defaultAppTheme]

    const appBaseInfo = await program.callUniMethod('getAppBaseInfo')
    expect(appBaseInfo.appTheme).toBe(expectedTheme)
  })
})
