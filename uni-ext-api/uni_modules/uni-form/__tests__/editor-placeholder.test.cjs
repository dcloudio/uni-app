const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { test } = require('node:test')
const ts = require(require.resolve('typescript', {
  paths: [path.dirname(require.resolve('@typescript-eslint/parser'))],
}))

const components = path.join(__dirname, '../components')

function script(source) {
  return source.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)[1]
}

function declarations(css) {
  return Object.fromEntries(css.split(';').flatMap(declaration => {
    const separator = declaration.indexOf(':')
    return separator < 0 ? [] : [[declaration.slice(0, separator).trim(), declaration.slice(separator + 1).trim()]]
  }))
}

function evaluate(code, context, result) {
  const output = ts.transpileModule(code, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
  }).outputText
  return vm.runInNewContext(`${output}\n${result}`, {
    computed: getter => ({ get value() { return getter() } }),
    ...context,
  })
}

function editor(component, platform, fontSize = '15px') {
  const style = new Map([['font-size', fontSize]])
  const props = { placeholderClass: 'placeholder-class', placeholderStyle: '' }
  const source = fs.readFileSync(path.join(components, component, `${component}.uvue`), 'utf8')
  const enabled = [true]
  const code = script(source).split('\n').filter(line => {
    const directive = line.match(/\/\/ #(ifdef|ifndef) (.+)/)
    if (directive) {
      const matches = directive[2].split('||').some(name => name.trim() === platform)
      enabled.push(enabled.at(-1) && (directive[1] === 'ifdef' ? matches : !matches))
      return false
    }
    if (line.includes('// #endif')) {
      enabled.pop()
      return false
    }
    return enabled.at(-1)
  }).join('\n')
  const parsed = ts.createSourceFile('editor.ts', code, ts.ScriptTarget.Latest, true)
  assert.equal(parsed.parseDiagnostics.length, 0)
  const statements = parsed.statements.filter(statement => ts.isVariableStatement(statement)
    && statement.declarationList.declarations.some(d => ['rpx2px', 'placeholderStyle'].includes(d.name.getText(parsed))))
  const inlineStyle = evaluate(statements.map(d => d.getText(parsed)).join('\n'), {
    props,
    style,
    uni: { rpx2px: value => value / 2 },
    textareaPaddingStyle: { value: '' },
    getStyleValue: property => style.get(property) ?? '',
  }, 'placeholderStyle')
  const baseStyle = declarations(source.match(new RegExp(`\\.uni-${component}-placeholder\\s*\\{([^}]+)\\}`))[1])
  const classStyle = { color: '#808080' }
  return {
    props,
    style,
    classStyle,
    fallbackVariable: baseStyle['font-size'].match(/^var\((--[\w-]+)/)[1],
    inlineDeclarations() {
      return declarations(inlineStyle.value)
    },
    classFontSize(value) {
      if (value == null) delete classStyle['font-size']
      else classStyle['font-size'] = value
    },
    fontSize() {
      // Exercise the component output against normal class/inline precedence.
      // Native variable resolution and rendering still require App validation.
      const merged = {
        ...baseStyle,
        ...(props.placeholderClass ? classStyle : {}),
        ...declarations(inlineStyle.value),
      }
      const value = merged['font-size'] ?? '16px'
      const variable = value.match(/^var\((--[\w-]+)(?:,\s*([^)]*))?\)$/)
      return variable ? merged[variable[1]] ?? variable[2] ?? '16px' : value
    },
  }
}

for (const component of ['input', 'textarea']) {
  for (const platform of ['APP-ANDROID', 'APP-IOS', 'APP-HARMONY']) {
    test(`${component}/${platform}: external font overrides the editor; other classes retain the fallback`, () => {
      const view = editor(component, platform)
      assert.equal(view.fontSize(), '15px')
      view.classFontSize('30px')
      assert.equal(view.fontSize(), '30px')
      view.style.set('font-size', '34rpx')
      assert.equal(view.fontSize(), '30px')
      view.classFontSize('22.5px')
      assert.equal(view.fontSize(), '22.5px')
      view.props.placeholderStyle = 'font-size:40px;color:red;'
      assert.equal(view.fontSize(), '40px')
      view.props.placeholderStyle = ''
      view.classFontSize(null)
      assert.equal(view.fontSize(), '17px')
      view.style.delete('font-size')
      assert.equal(view.fontSize(), '16px')
    })
    test(`${component}/${platform}: changing and removing class names preserves the correct font`, () => {
      const view = editor(component, platform)
      view.classFontSize('30px')
      view.props.placeholderClass = 'another-class'
      view.classFontSize('30px')
      assert.equal(view.fontSize(), '30px')
      view.props.placeholderClass = ''
      assert.equal(view.fontSize(), '15px')
      view.props.placeholderClass = 'color-only-class'
      view.classFontSize(null)
      assert.equal(view.fontSize(), '15px')
    })
    test(`${component}/${platform}: class variable updates use the existing placeholder styles`, () => {
      const view = editor(component, platform)
      view.classFontSize('var(--custom-placeholder-font-size, 30px)')
      assert.equal(view.fontSize(), '30px')
      view.classStyle['--custom-placeholder-font-size'] = '24.5px'
      assert.equal(view.fontSize(), '24.5px')
      view.props.placeholderStyle = 'font-size:40px;'
      assert.equal(view.fontSize(), '40px')
      view.props.placeholderStyle = ''
      view.classFontSize(null)
      assert.equal(view.fontSize(), '15px')
    })
    test(`${component}/${platform}: clearing the editor font resets the retained native variable`, () => {
      const view = editor(component, platform, '30px')
      view.props.placeholderStyle = '--accent:red;'
      const nativeVariables = {}
      const applyVariableUpdate = () => {
        // Native Variable updates merge the supplied keys into existing state.
        for (const [name, value] of Object.entries(view.inlineDeclarations())) {
          if (name.startsWith('--')) nativeVariables[name] = value
        }
      }
      for (const missingFont of [undefined, null, '']) {
        view.style.set('font-size', '30px')
        applyVariableUpdate()
        assert.equal(nativeVariables[view.fallbackVariable], '30px')
        view.style.set('font-size', missingFont)
        applyVariableUpdate()
        assert.equal(nativeVariables[view.fallbackVariable], '16px')
        assert.equal(nativeVariables['--accent'], 'red')
      }
    })
  }
}

test('the modal color-only placeholder class retains its 17px editor font', () => {
  const source = fs.readFileSync(path.join(__dirname, '../../uni-modal/pages/uniModal/uniModal.uvue'), 'utf8')
  const editorRule = source.match(/\.uni-modal-dialog__textarea\s*\{([^}]+)\}/)[1]
  const placeholderRule = source.match(/\.uni-modal-dialog__textarea-placeholder\s*\{([^}]+)\}/)[1]
  const fontSize = editorRule.match(/font-size:\s*([^;]+)/)[1]
  assert.ok(!placeholderRule.includes('font-size'))
  for (const platform of ['APP-ANDROID', 'APP-IOS', 'APP-HARMONY']) {
    assert.equal(editor('textarea', platform, fontSize).fontSize(), '17px')
  }
})
