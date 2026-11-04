import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { effectScope, reactive, ref } from 'vue'
import { fieldSelectionProps } from '../src/helpers/useFieldSelection'

describe.each(['input', 'textarea'])('%s Web selection boundary', (name) => {
  test.each(['h5', 'app', 'app-plus', 'app-ios', 'app-android', 'app-harmony'])(
    'registers selection props and tracking only on Web (platform=%s)',
    (platform) => {
      const previousPlatform = global.__PLATFORM__
      Reflect.set(global, '__PLATFORM__', platform)
      const scope = effectScope()
      try {
        const useSelection = jest.fn(() => ref(null))
        const imports: Record<string, unknown> = {
          vue: { ...jest.requireActual('vue'), onMounted: jest.fn() },
          '@vue/shared': jest.requireActual('@vue/shared'),
          '@dcloudio/uni-shared': { LINEFEED: '\n' },
          '../../helpers/useField': {
            props: {},
            emit: [],
            INPUT_MODES: [],
            useField: () => ({
              fieldRef: ref(null),
              state: reactive({ value: '', maxlength: 140 }),
              scopedAttrsState: { attrs: {} },
              fixDisabledColor: false,
              trigger: jest.fn(),
            }),
          },
          '../../helpers/useFieldSelection': {
            fieldSelectionProps,
            useFieldSelection: useSelection,
          },
          './utils': { resolveDigitDecimalPoint: jest.fn() },
        }
        const file = path.resolve(
          __dirname,
          `../src/vue/${name}/use${name === 'input' ? 'Input' : 'Textarea'}.ts`
        )
        const { outputText } = ts.transpileModule(
          fs.readFileSync(file, 'utf8'),
          {
            compilerOptions: {
              module: ts.ModuleKind.CommonJS,
              target: ts.ScriptTarget.ES2020,
            },
          }
        )
        const module = { exports: {} as any }
        new Function('require', 'module', 'exports', outputText)(
          (id: string) => {
            if (!(id in imports)) throw new Error('Missing dependency: ' + id)
            return imports[id]
          },
          module,
          module.exports
        )
        const setup =
          name === 'input'
            ? module.exports.useInput
            : module.exports.useTextarea
        const result = scope.run(() =>
          setup(
            reactive({
              type: 'text',
              value: '',
              maxlength: 140,
              selectionClass: 'selected',
            }),
            { emit: jest.fn(), expose: jest.fn() }
          )
        )
        if (platform === 'h5') {
          expect(module.exports.props.selectionClass).toBe(
            fieldSelectionProps.selectionClass
          )
          expect(useSelection).toHaveBeenCalledTimes(1)
          expect(result.selectionRef).toBeDefined()
        } else {
          expect(module.exports.props).not.toHaveProperty('selectionClass')
          expect(useSelection).not.toHaveBeenCalled()
          expect(result.selectionRef).toBeUndefined()
        }
      } finally {
        scope.stop()
        if (previousPlatform === undefined) delete (global as any).__PLATFORM__
        else global.__PLATFORM__ = previousPlatform
      }
    }
  )
})
