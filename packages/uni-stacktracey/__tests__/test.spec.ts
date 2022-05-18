const {
  stacktracey,
  uniStracktraceyPreset,
  utsStracktraceyPreset,
} = require('../dist/uni-stacktracey.cjs.js')

const utsErrorMsg = `Appid: __UNI__E070870
e: DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestComponent.kt: (68, 9): Unresolved reference: hello
e: DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (30, 9): Unresolved reference: hello

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':nativeplugins:DCloud-UTSPlugin:compileReleaseKotlin'.
> Compilation error. See log for more details

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 3s`

const uniErrorMsg = `ReferenceError: Sentry is not defined
at Proxy.throwError(/vue3/assets/pages-index-index.4077a069.js:1:295)
at e(/vue3/assets/index.2be9343a.js:1:52317)
at Ue(/vue3/assets/index.2be9343a.js:1:16271)
at He(/vue3/assets/index.2be9343a.js:1:16349)
at HTMLElement.n(/vue3/assets/index.2be9343a.js:1:51834)
at HTMLElement.o(/vue3/assets/index.2be9343a.js:21:60087)`

describe('uni-stacktracey', () => {
  test('uniStracktraceyPreset', () => {
    stacktracey(uniErrorMsg, {
      preset: uniStracktraceyPreset({
        base: 'https://7463-tcb-uzyfn59tqxjxtnbab2e2c-5ba40b-1303909289.tcb.qcloud.la',
        platform: 'h5',
        version: '1.0.0',
      }),
    }).then((res: string) => {
      expect(res).toEqual(`ReferenceError: Sentry is not defined
at   Proxy.throwError(/vue3/assets/pages-index-index.4077a069.js:1  
at   e(/vue3/assets/index.2be9343a.js:1                             
at   Ue(/vue3/assets/index.2be9343a.js:1                            
at   He(/vue3/assets/index.2be9343a.js:1                            
at   HTMLElement.n(/vue3/assets/index.2be9343a.js:1                 
at   HTMLElement.o(/vue3/assets/index.2be9343a.js:21                `)
    })
  })

  test('uniStracktraceyPreset', () => {
    stacktracey(utsErrorMsg, {
      preset: utsStracktraceyPreset({
        base: '/usr/fxy/poroject/test/.sourcemap/src/',
        sourceRoot:
          '/wgtRoot/__UNI__E070870/nativeplugins/DCloud-UTSPlugin/android/src/',
      }),
    }).then((res: string) => {
      expect(res).toEqual(`Appid: __UNI__E070870
e: DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestComponent.kt: (68, 9): Unresolved reference: hello
e: DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (30, 9): Unresolved reference: hello

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':nativeplugins:DCloud-UTSPlugin:compileReleaseKotlin'.
> Compilation error. See log for more details

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 3s`)
    })
  })
})
