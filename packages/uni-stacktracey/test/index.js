const {
  stacktracey,
  uniStracktraceyPreset,
  utsStracktraceyPreset,
} = require('../dist/uni-stacktracey.cjs.js')

const utsErrorMsg = `Appid: __UNI__E070870
e: [PackagePath]/wgtRoot/__UNI__E070870/nativeplugins/DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (8, 1): Expecting a top level declaration
e: [PackagePath]/wgtRoot/__UNI__E070870/nativeplugins/DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (8, 9): Expecting a top level declaration
e: [PackagePath]/wgtRoot/__UNI__E070870/nativeplugins/DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (8, 10): Expecting a top level declaration
e: [PackagePath]/wgtRoot/__UNI__E070870/nativeplugins/DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (8, 11): Expecting a top level declaration
e: [PackagePath]/wgtRoot/__UNI__E070870/nativeplugins/DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (8, 16): Expecting a top level declaration

FAILURE: Build failed with an exception.`

stacktracey(
  `ReferenceError: Sentry is not defined
  at Proxy.throwError(/vue3/assets/pages-index-index.4077a069.js:1:295)
  at e(/vue3/assets/index.2be9343a.js:1:52317)
  at Ue(/vue3/assets/index.2be9343a.js:1:16271)
  at He(/vue3/assets/index.2be9343a.js:1:16349)
  at HTMLElement.n(/vue3/assets/index.2be9343a.js:1:51834)
  at HTMLElement.o(/vue3/assets/index.2be9343a.js:21:60087)`,
  {
    preset: uniStracktraceyPreset({
      base: 'https://7463-tcb-uzyfn59tqxjxtnbab2e2c-5ba40b-1303909289.tcb.qcloud.la',
      platform: 'h5',
      version: '1.0.0',
    }),
  }
).then((res) => console.log(res))

/* stacktracey(utsErrorMsg, {
  preset: utsStracktraceyPreset({
    base: '/wgtRoot/__UNI__E070870/nativeplugins/DCloud-UTSPlugin/android/src/io/dcloud/uniplugin',
    sourceRoot: '',
  }),
}).then((res) => console.log(res)) */
