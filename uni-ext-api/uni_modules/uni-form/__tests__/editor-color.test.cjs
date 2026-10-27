const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { test } = require('node:test')
const ts = require(require.resolve('typescript', {
  paths: [path.dirname(require.resolve('@typescript-eslint/parser'))],
}))

const filename = path.join(__dirname, '../components/editor-color.ts')
const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText

function createEditorModule(info) {
  const unmount = []
  const listeners = new Map()
  const removed = []
  let nextId = 0
  const context = {
    exports: {},
    require(name) {
      assert.equal(name, 'vue')
      return {
        ref: value => ({ value }),
        computed: getter => ({ get value() { return getter() } }),
        onBeforeUnmount: callback => unmount.push(callback),
      }
    },
    uni: {
      getSystemInfoSync: () => info,
      onAppThemeChange(callback) {
        listeners.set(++nextId, callback)
        return nextId
      },
      offAppThemeChange(id) {
        removed.push(id)
        listeners.delete(id)
      },
    },
  }
  vm.runInNewContext(code, context, { filename })
  return { ...context.exports, listeners, removed, unmount }
}

test('native default follows app theme without an external class or style', () => {
  for (const [appTheme, osTheme, expected] of [
    ['dark', 'light', '#ffffff'],
    ['light', 'dark', '#000000'],
    ['auto', 'dark', '#ffffff'],
    ['auto', 'light', '#000000'],
    [null, 'dark', '#000000'],
  ]) {
    const editor = createEditorModule({ appTheme, osTheme })
    assert.equal(editor.useEditorColor(new Map()).value, expected)
    editor.unmount[0]()
    assert.equal(editor.listeners.size, 0)
  }
})

test('explicit color wins across theme changes; removing it restores the default', () => {
  const editor = createEditorModule({ appTheme: 'dark', osTheme: 'dark' })
  const style = new Map([['color', '#e91e63']])
  const color = editor.useEditorColor(style)
  editor.listeners.get(1)({ appTheme: 'light' })
  assert.equal(color.value, '#e91e63')
  style.set('color', null)
  assert.equal(color.value, '#000000')
  editor.listeners.get(1)({ appTheme: 'dark' })
  assert.equal(color.value, '#ffffff')
})

test('editors share a listener until the last unmount and re-register on remount', () => {
  const editor = createEditorModule({ appTheme: 'dark', osTheme: 'dark' })
  editor.useEditorColor(new Map())
  editor.useEditorColor(new Map())
  assert.equal(editor.listeners.size, 1)
  editor.unmount[0]()
  assert.equal(editor.removed.length, 0)
  editor.unmount[1]()
  assert.deepEqual(editor.removed, [1])
  editor.useEditorColor(new Map())
  assert.equal(editor.listeners.size, 1)
  assert.ok(editor.listeners.has(2))
  editor.unmount[2]()
  assert.deepEqual(editor.removed, [1, 2])
})
