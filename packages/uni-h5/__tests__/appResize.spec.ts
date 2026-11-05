import path from 'path'
import ts from 'typescript'
import jscc from 'rollup-plugin-jscc'

describe('框架 resize 窗口信息', () => {
  test.each([
    { isX: false, vapor: false },
    { isX: true, vapor: false },
    { isX: true, vapor: true },
  ])('各模式仅获取窗口信息，事件内容不变：%j', async ({ isX, vapor }) => {
    const plugin = jscc({
      values: { _X_: +isX, _X_VAPOR_: +vapor, _NODE_JS_: 0 },
    })
    const { code } = await (plugin.load as Function).call(
      {},
      path.resolve(__dirname, '../src/framework/setup/index.ts')
    )
    const source = ts.createSourceFile(
      'setup.ts',
      code,
      ts.ScriptTarget.Latest,
      true
    )
    // 直接执行条件编译后的真实回调，避免为测试改变框架导出或初始化整个应用。
    const callback = source.statements.find(
      (node): node is ts.FunctionDeclaration =>
        ts.isFunctionDeclaration(node) && node.name?.text === 'onResize'
    )!
    const windowInfo = {
      windowWidth: 375,
      windowHeight: 600,
      screenWidth: 390,
      screenHeight: 844,
      windowTop: 44,
      windowBottom: 50,
      safeArea: {},
    }
    const uni = {
      getWindowInfo: jest.fn(() => windowInfo),
      getSystemInfoSync: jest.fn(),
    }
    const emit = jest.fn()
    const window = { orientation: 0 as number | undefined }
    const onResize = new Function(
      'uni',
      'window',
      'UniServiceJSBridge',
      'ON_RESIZE',
      callback.getText(source) + '; return onResize'
    )(uni, window, { emit }, 'onResize')
    for (const orientation of [0, 90, -90, 180, undefined]) {
      window.orientation = orientation
      onResize()
      expect(emit).toHaveBeenLastCalledWith('onResize', {
        deviceOrientation:
          Math.abs(Number(orientation)) === 90 ? 'landscape' : 'portrait',
        size: {
          windowWidth: 375,
          windowHeight: 600,
          screenWidth: 390,
          screenHeight: 844,
        },
      })
    }
    expect(uni.getWindowInfo).toHaveBeenCalledTimes(5)
    expect(uni.getSystemInfoSync).not.toHaveBeenCalled()
  })
})
