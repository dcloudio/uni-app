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
          assert.equal(name, './theme.ts')
          return load(path.resolve(path.dirname(filename), name))
        },
      }
      modules.set(filename, context.exports)
      vm.runInNewContext(compile(filename, platform), context, { filename })
    }
    return modules.get(filename)
  }
  return {
    ...load(path.join(components, 'editor-color.ts')),
    theme: load(path.join(components, 'theme.ts')),
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

function nativeMethod(source, viewName, methodName) {
  const classStart = source.indexOf(`class ${viewName} `)
  assert.ok(classStart >= 0, `${viewName} was not found`)
  const classSource = source.slice(classStart).match(/^class [^\r\n]*\{[\s\S]*?^\}/m)?.[0]
  assert.ok(classSource, `${viewName} class body was not found`)
  const method = classSource.match(new RegExp(`^\\t${methodName}\\([^\\r\\n]*\\)\\s*\\{[\\s\\S]*?^\\t\\}`, 'm'))?.[0]
  assert.ok(method, `${viewName}.${methodName} was not found`)
  return method
}

function createNativeEditor(platform, viewName) {
  const filename = path.join(__dirname, '../utssdk', platform, 'index.uts')
  const source = fs.readFileSync(filename, 'utf8')
  const method = nativeMethod(source, viewName, 'updateColor')
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

function createHarmonyCaretEditor(viewName) {
  const filename = path.join(__dirname, '../utssdk/app-harmony/index.uts')
  const source = fs.readFileSync(filename, 'utf8')
  const methods = [
    nativeMethod(source, 'NativeInputFileView', 'updateCursorColor'),
    nativeMethod(source, viewName, 'updateParams'),
  ]
  const parsed = []
  const NativeEditor = vm.runInNewContext(transpile(`class NativeEditor {\n${methods.join('\n')}\n}\nNativeEditor`), {
    UTSHarmony: {
      colorWithString(value) {
        parsed.push(value)
        return `native:${value}`
      },
    },
  }, { filename })
  const view = new NativeEditor()
  view.params = { key: 'editor' }
  view._params = { key: 'editor' }
  const updates = []
  view.harmonyBuilderNode = { update(params) { updates.push({ ...params }) } }
  return { view, parsed, updates }
}

for (const viewName of ['NativeInputView', 'NativeTextareaView']) {
  test(`APP-HARMONY/${viewName}: an unset caret color forwards the native default`, () => {
    const editor = createHarmonyCaretEditor(viewName)
    editor.view.updateCursorColor('')
    assert.equal(editor.updates.length, 1)
    assert.ok(Object.hasOwn(editor.updates[0], 'caretColor'))
    assert.equal(editor.updates[0].caretColor, undefined)
    assert.deepEqual(editor.parsed, [])
  })

  test(`APP-HARMONY/${viewName}: CSS and legacy caret changes clear the retained native color`, () => {
    const editor = createHarmonyCaretEditor(viewName)
    const { resolveEditorCaretColor } = createEditorModule({ appTheme: 'dark' }, 'APP-HARMONY')
    for (const [css, legacy, expected] of [
      ['#ff0000', '', 'native:#ff0000'],
      ['auto', '', undefined],
      ['#00ff00', '', 'native:#00ff00'],
      ['', '', undefined],
      ['#ff0000', '#007aff', 'native:#007aff'],
      ['#00ff00', '#007aff', 'native:#007aff'],
      ['#00ff00', 'auto', undefined],
      ['#00ff00', '', 'native:#00ff00'],
      ['', '', undefined],
    ]) {
      editor.view.updateCursorColor(resolveEditorCaretColor(css, legacy))
      const update = editor.updates.at(-1)
      assert.ok(Object.hasOwn(update, 'caretColor'))
      assert.equal(update.caretColor, expected)
      assert.equal(editor.view.params.caretColor, expected)
      assert.equal(editor.view._params.caretColor, expected)
    }
    assert.deepEqual(editor.parsed, ['#ff0000', '#00ff00', '#007aff', '#007aff', '#00ff00'])
  })
}

for (const [component, builderName, viewName] of [
  ['input', 'InputBuilder', 'NativeInputView'],
  ['textarea', 'TextareaBuilder', 'NativeTextareaView'],
]) {
  test(`APP-HARMONY ${component} builder forwards an explicit caret style reset to ArkUI`, () => {
    const filename = path.join(__dirname, '../utssdk/app-harmony', `${component}.ets`)
    const source = fs.readFileSync(filename, 'utf8')
    const builder = source.match(new RegExp(`^export function ${builderName}\\([^\\r\\n]*\\)\\s*\\{[\\s\\S]*?^\\}`, 'm'))?.[0]
    assert.ok(builder, `${builderName} was not found`)
    const styles = []
    const directColors = []
    const modifiers = new Proxy({}, {
      get(_, name) {
        return value => {
          if (name === 'caretStyle') styles.push(value)
          if (name === 'caretColor') directColors.push(value)
          return modifiers
        }
      },
    })
    const render = vm.runInNewContext(transpile(`${builder.replace(/^export /, '')}\n${builderName}`), {
      TextArea: () => modifiers,
      TextInput: () => modifiers,
      Color: { Transparent: 'transparent' },
      BarState: { Off: 'off', Auto: 'auto' },
      TextareaDirectionModifier: class {},
      TextInputDirectionModifier: class {},
    }, { filename })
    const editor = createHarmonyCaretEditor(viewName)
    const update = editor.view.harmonyBuilderNode.update
    editor.view.harmonyBuilderNode.update = params => {
      update(params)
      render(params)
    }
    editor.view.updateCursorColor('#e91e63')
    editor.view.updateCursorColor('')
    assert.deepEqual(directColors, [])
    assert.equal(styles.length, 2)
    assert.ok(Object.hasOwn(styles[0], 'color'))
    assert.equal(styles[0].color, 'native:#e91e63')
    assert.ok(Object.hasOwn(styles[1], 'color'))
    assert.equal(styles[1].color, undefined)
  })
}

function initializeAndroidTextarea(editor, native, style) {
  const filename = path.join(components, 'textarea/textarea.uvue')
  const script = fs.readFileSync(filename, 'utf8').match(/<script setup[^>]*>([\s\S]*?)<\/script>/)[1]
  const source = ts.createSourceFile(filename, preprocess(script, 'APP-ANDROID'), ts.ScriptTarget.Latest, true)
  assert.equal(source.parseDiagnostics.length, 0)
  const functions = source.statements.filter(statement => ts.isFunctionDeclaration(statement)
    && ['onNativeViewReady', 'syncAndroidTextareaStyleProps'].includes(statement.name?.text))
  const rpx2px = source.statements.find(statement => ts.isVariableStatement(statement)
    && statement.declarationList.declarations.some(declaration => declaration.name.getText(source) === 'rpx2px'))
  assert.equal(functions.length, 2)
  assert.ok(rpx2px)
  for (const name of [
    'beginUpdateBatch', 'endUpdateBatch', 'updateAutoHeight', 'updateFontSize',
    'updateCursorColor', 'updateSelectionColor', 'updateSelectionHandleColor', 'updateLineHeight', 'updateLetterSpacing',
    'updateFontWeight', 'updateFontStyle', 'updateFontFamily', 'updateTextAlign', 'updateDirection',
  ]) {
    native.view[name] = () => {}
  }
  const ready = vm.runInNewContext(transpile([
    rpx2px.getText(source),
    ...functions.map(statement => statement.getText(source)),
    'onNativeViewReady',
  ].join('\n')), {
    textareaView: native.view,
    style,
    valueColor: editor.useEditorColor(style),
    props: { autoHeight: false },
    instance: { rawProps: {} },
    resolvedCursorColor: { value: '' },
    resolvedSelectionColor: { value: '' },
    selectionHandleColor: { value: '' },
    uni: { rpx2px: value => value / 2 },
  }, { filename })
  ready()
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
  }
}
