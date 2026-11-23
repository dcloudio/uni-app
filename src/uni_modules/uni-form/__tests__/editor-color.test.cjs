const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { test } = require('node:test')
const ts = require(require.resolve('typescript', {
  paths: [path.dirname(require.resolve('@typescript-eslint/parser'))],
}))

const components = path.join(__dirname, '../components')
const platforms = ['APP-ANDROID', 'APP-IOS', 'APP-HARMONY']
const compiled = new Map()

function transpile(source) {
  return ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
}

function preprocess(source, platform) {
  const enabled = [true]
  const result = source.split('\n').map(line => {
    const directive = line.match(/\/\/ #(ifdef|ifndef) (.+)/)
    if (directive) {
      const matches = directive[2].split('||').some(name => name.trim() === platform)
      enabled.push(enabled.at(-1) && (directive[1] === 'ifdef' ? matches : !matches))
      return ''
    }
    if (line.includes('// #endif')) {
      enabled.pop()
      return ''
    }
    return enabled.at(-1) ? line : ''
  }).join('\n')
  assert.equal(enabled.length, 1)
  return result
}

function compile(filename, platform) {
  const key = `${filename}:${platform}`
  if (!compiled.has(key)) {
    compiled.set(key, transpile(preprocess(fs.readFileSync(filename, 'utf8'), platform)))
  }
  return compiled.get(key)
}

function createEditorModule(info, platform = platforms[0]) {
  const unmount = []
  const listeners = { app: new Map(), os: new Map() }
  const removed = { app: [], os: [] }
  const nextIds = { app: 0, os: 0 }
  const state = { ...info }
  const vue = {
    ref: value => ({ value }),
    computed: getter => ({ get value() { return getter() } }),
    onBeforeUnmount: callback => unmount.push(callback),
  }
  const uni = {
    getAppBaseInfo() {
      assert.ok(platforms.includes(platform), 'App API called on a non-App platform')
      return { appTheme: state.appTheme }
    },
    getDeviceInfo() {
      assert.ok(platforms.includes(platform), 'App API called on a non-App platform')
      return { osTheme: state.osTheme }
    },
  }
  for (const [kind, name] of [['app', 'App'], ['os', 'Os']]) {
    uni[`on${name}ThemeChange`] = callback => {
      assert.ok(platforms.includes(platform), 'App listener registered on a non-App platform')
      const id = nextIds[kind]++
      listeners[kind].set(id, callback)
      return id
    }
    uni[`off${name}ThemeChange`] = id => {
      removed[kind].push(id)
      listeners[kind].delete(id)
    }
  }
  const modules = new Map()
  function load(filename) {
    if (!modules.has(filename)) {
      const context = {
        exports: {},
        uni,
        require(name) {
          if (name === 'vue') return vue
          assert.equal(name, './theme.uts')
          return load(path.resolve(path.dirname(filename), name))
        },
      }
      modules.set(filename, context.exports)
      vm.runInNewContext(compile(filename, platform), context, { filename })
    }
    return modules.get(filename)
  }
  return {
    ...load(path.join(components, 'editor-color.uts')),
    theme: load(path.join(components, 'theme.uts')),
    state,
    listeners,
    removed,
    unmount,
    setAppTheme(appTheme, emittedTheme = appTheme) {
      state.appTheme = appTheme
      for (const callback of listeners.app.values()) callback({ appTheme: emittedTheme })
    },
    setOsTheme(osTheme) {
      state.osTheme = osTheme
      for (const callback of listeners.os.values()) callback({ osTheme })
    },
  }
}

for (const platform of platforms) {
  test(`${platform}: native default follows app theme without an external class or style`, () => {
    for (const [appTheme, osTheme, expected] of [
      ['dark', 'light', '#d1d1d1'],
      ['light', 'dark', ''],
      ['auto', 'dark', '#d1d1d1'],
      ['auto', 'light', ''],
      [null, 'dark', '#d1d1d1'],
      [undefined, 'light', ''],
    ]) {
      const editor = createEditorModule({ appTheme, osTheme }, platform)
      assert.equal(editor.useEditorColor(new Map()).value, expected)
      editor.unmount[0]()
      assert.equal(editor.listeners.app.size, 0)
      assert.equal(editor.listeners.os.size, 0)
    }
  })

  test(`${platform}: explicit color wins across app and OS changes; clearing it restores the default`, () => {
    const editor = createEditorModule({ appTheme: 'dark', osTheme: 'dark' }, platform)
    const style = new Map([['color', '#e91e63']])
    const color = editor.useEditorColor(style)
    editor.setAppTheme('light')
    assert.equal(color.value, '#e91e63')
    editor.setAppTheme('auto', 'dark')
    editor.setOsTheme('light')
    assert.equal(color.value, '#e91e63')
    style.set('color', null)
    assert.equal(color.value, '')
    editor.setOsTheme('dark')
    assert.equal(color.value, '#d1d1d1')
    style.set('color', '#007aff')
    assert.equal(color.value, '#007aff')
    style.set('color', '')
    assert.equal(color.value, '#d1d1d1')
    style.delete('color')
    editor.setAppTheme('light')
    assert.equal(color.value, '')
    editor.unmount[0]()
  })

  test(`${platform}: OS changes follow auto or unset app themes and respect fixed themes`, () => {
    for (const appTheme of ['auto', null]) {
      const editor = createEditorModule({ appTheme, osTheme: 'light' }, platform)
      const color = editor.useEditorColor(new Map())
      editor.setOsTheme('dark')
      assert.equal(color.value, '#d1d1d1')
      editor.setOsTheme('light')
      assert.equal(color.value, '')
      editor.setAppTheme('dark')
      editor.setOsTheme('light')
      assert.equal(color.value, '#d1d1d1')
      editor.setAppTheme('light')
      editor.setOsTheme('dark')
      assert.equal(color.value, '')
      // Native App events normally contain light/dark; auto also resolves via the OS.
      editor.setAppTheme('auto')
      assert.equal(color.value, '#d1d1d1')
      editor.setOsTheme('light')
      assert.equal(color.value, '')
      editor.unmount[0]()
    }
  })

  test(`${platform}: editors and theme consumers share listeners and resync after the last unmount`, () => {
    const editor = createEditorModule({ appTheme: 'auto', osTheme: 'light' }, platform)
    const first = editor.useEditorColor(new Map())
    const second = editor.useEditorColor(new Map())
    const dark = editor.theme.useFormThemeIsDark()
    assert.equal(editor.listeners.app.size, 1)
    assert.equal(editor.listeners.os.size, 1)
    editor.setOsTheme('dark')
    assert.equal(first.value, '#d1d1d1')
    assert.equal(second.value, '#d1d1d1')
    assert.equal(dark.value, true)
    editor.unmount[0]()
    editor.unmount[1]()
    assert.deepEqual(editor.removed, { app: [], os: [] })
    editor.setOsTheme('light')
    assert.equal(dark.value, false)
    editor.unmount[2]()
    // Zero is a valid listener ID on native platforms.
    assert.deepEqual(editor.removed, { app: [0], os: [0] })
    assert.equal(editor.listeners.app.size, 0)
    assert.equal(editor.listeners.os.size, 0)
    editor.setOsTheme('dark')
    const remounted = editor.useEditorColor(new Map())
    assert.equal(remounted.value, '#d1d1d1')
    assert.equal(editor.listeners.app.size, 1)
    assert.equal(editor.listeners.os.size, 1)
    editor.unmount[3]()
    assert.deepEqual(editor.removed, { app: [0, 1], os: [0, 1] })
  })
}

test('non-App editors leave the text color unset without calling native theme APIs', () => {
  const editor = createEditorModule({ appTheme: 'dark', osTheme: 'dark' }, 'WEB')
  const style = new Map()
  const color = editor.useEditorColor(style)
  assert.equal(color.value, '')
  style.set('color', '#e91e63')
  assert.equal(color.value, '#e91e63')
  editor.unmount[0]()
  assert.equal(editor.listeners.app.size, 0)
  assert.equal(editor.listeners.os.size, 0)
})

test('caret-color supports CSS updates, legacy prop precedence and removal', () => {
  const { resolveEditorCaretColor } = createEditorModule({ appTheme: 'dark' })
  assert.equal(resolveEditorCaretColor('#ffffff', ''), '#ffffff')
  assert.equal(resolveEditorCaretColor('#ff0000', '#007aff'), '#007aff')
  assert.equal(resolveEditorCaretColor('#ff0000', ''), '#ff0000')
  assert.equal(resolveEditorCaretColor(null, ''), '')
  assert.equal(resolveEditorCaretColor('', ''), '')
})

function createNativeEditor(platform, viewName) {
  const filename = path.join(__dirname, '../utssdk', platform, 'index.uts')
  const source = fs.readFileSync(filename, 'utf8')
  const classStart = source.indexOf(`export class ${viewName} `)
  assert.ok(classStart >= 0, `${viewName} was not found in ${filename}`)
  const classSource = source.slice(classStart).match(/^export class [^\r\n]*\{[\s\S]*?^\}/m)?.[0]
  assert.ok(classSource, `${viewName} class body was not found in ${filename}`)
  const method = classSource.match(/^\tupdateColor\([^\r\n]*\)\s*\{[\s\S]*?^\t\}/m)?.[0]
  assert.ok(method, `${viewName}.updateColor was not found in ${filename}`)
  const defaultColor = 'native:black'
  const parsed = []
  const parseColor = value => {
    parsed.push(value)
    return `native:${value}`
  }
  const NativeEditor = vm.runInNewContext(transpile(`class NativeEditor {\n${method}\n}\nNativeEditor`), {
    Color: { BLACK: defaultColor },
    UIColor: { black: defaultColor },
    parseAndroidColorValue: parseColor,
    UTSiOS: { colorWithString: parseColor },
  }, { filename })
  const view = new NativeEditor()
  const native = {
    textColor: defaultColor,
    setTextColor(color) { this.textColor = color },
  }
  const applied = []
  if (platform === 'app-android') {
    view.editText = native
  } else if (viewName === 'NativeInputView') {
    view.textField = native
  } else {
    view.textColor = defaultColor
    view.applyTextStyles = function () { applied.push(this.textColor) }
  }
  return {
    view,
    parsed,
    defaultColor,
    color() {
      // iOS textarea stores the color and must apply its updated text styles.
      return platform === 'app-ios' && viewName === 'NativeTextareaView'
        ? applied.at(-1)
        : native.textColor
    },
  }
}

for (const platform of ['app-android', 'app-ios']) {
  for (const viewName of ['NativeInputView', 'NativeTextareaView']) {
    test(`${platform}/${viewName}: clearing the native color restores the light default`, () => {
      for (const color of ['#d1d1d1', '#e91e63']) {
        for (const cleared of ['', null]) {
          const editor = createNativeEditor(platform, viewName)
          editor.view.updateColor(color)
          assert.equal(editor.color(), `native:${color}`)
          editor.view.updateColor(cleared)
          assert.equal(editor.color(), editor.defaultColor)
          assert.deepEqual(editor.parsed, [color])
          if (platform === 'app-ios' && viewName === 'NativeTextareaView') {
            assert.equal(editor.view.textColor, editor.defaultColor)
          }
        }
      }
    })
  }
}

function androidComponentFunctions(component, names, context) {
  const filename = path.join(components, component, `${component}.uvue`)
  const script = fs.readFileSync(filename, 'utf8').match(/<script setup[^>]*>([\s\S]*?)<\/script>/)[1]
  const source = ts.createSourceFile(filename, preprocess(script, 'APP-ANDROID'), ts.ScriptTarget.Latest, true)
  assert.equal(source.parseDiagnostics.length, 0)
  const functions = source.statements.filter(statement => ts.isFunctionDeclaration(statement)
    && names.includes(statement.name?.text))
  const rpx2px = source.statements.find(statement => ts.isVariableStatement(statement)
    && statement.declarationList.declarations.some(declaration => declaration.name.getText(source) === 'rpx2px'))
  assert.equal(functions.length, names.length)
  assert.ok(rpx2px)
  return vm.runInNewContext(transpile([
    rpx2px.getText(source),
    ...functions.map(statement => statement.getText(source)),
    `({ ${names.join(', ')} })`,
  ].join('\n')), {
    ...context,
    uni: { rpx2px: value => value / 2 },
  }, { filename })
}

function mockAndroidTextStyleMethods(view) {
  for (const name of [
    'updateFontSize', 'updateLetterSpacing', 'updateFontWeight', 'updateFontStyle',
    'updateFontFamily', 'updateTextAlign', 'updateDirection',
  ]) {
    view[name] = () => {}
  }
}

function initializeAndroidTextarea(editor, native, style) {
  mockAndroidTextStyleMethods(native.view)
  for (const name of [
    'beginUpdateBatch', 'endUpdateBatch', 'updateAutoHeight', 'updateCursorColor', 'updateLineHeight',
  ]) {
    native.view[name] = () => {}
  }
  const { onNativeViewReady } = androidComponentFunctions('textarea', [
    'onNativeViewReady', 'syncAndroidTextareaStyleProps',
  ], {
    textareaView: native.view,
    style,
    valueColor: editor.useEditorColor(style),
    props: { autoHeight: false },
    instance: { rawProps: {} },
    resolvedCursorColor: { value: '' },
  })
  onNativeViewReady()
}

function syncAndroidInput(editor, native, style) {
  mockAndroidTextStyleMethods(native.view)
  const { syncAndroidInputStyleProps } = androidComponentFunctions('input', ['syncAndroidInputStyleProps'], {
    inputView: native.view,
    style,
    valueColor: editor.useEditorColor(style),
  })
  syncAndroidInputStyleProps()
}

for (const appTheme of ['dark', 'light']) {
  for (const color of [null, '', '#e91e63']) {
    test(`APP-ANDROID textarea ready: ${appTheme} theme with ${JSON.stringify(color)} CSS color`, () => {
      const editor = createEditorModule({ appTheme, osTheme: appTheme })
      const native = createNativeEditor('app-android', 'NativeTextareaView')
      initializeAndroidTextarea(editor, native, new Map([['color', color]]))
      const expected = color ? `native:${color}` : appTheme === 'dark' ? 'native:#d1d1d1' : native.defaultColor
      assert.equal(native.color(), expected)
      editor.unmount[0]()
    })
    test(`APP-ANDROID input style sync: ${appTheme} theme with ${JSON.stringify(color)} CSS color`, () => {
      const editor = createEditorModule({ appTheme, osTheme: appTheme })
      const native = createNativeEditor('app-android', 'NativeInputView')
      syncAndroidInput(editor, native, new Map([['color', color]]))
      const expected = color ? `native:${color}` : appTheme === 'dark' ? 'native:#d1d1d1' : native.defaultColor
      assert.equal(native.color(), expected)
      editor.unmount[0]()
    })
  }
}
