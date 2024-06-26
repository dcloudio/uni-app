declare global {
  type UniPageMeta = import('./runtime-types').UniPageMeta
  type UniPageRoute = import('./runtime-types').UniPageRoute
  const __uniConfig: import('./runtime-types').UniConfig
  const __uniRoutes: UniPageRoute[]

  const padStyleMapOf: import('./runtime-types').PadStyleMapOf
  function utsMapOf(obj: Record<string, any>): Map<string, any | null>
  function utsMapOf<K, V>(obj: Array<Array<any>>): Map<string, any | null>

  namespace io {
    namespace dcloud {
      namespace uniapp {
        namespace appframe {
          class AppConfig {
            name: string
            appid: string
            versionName: string
            versionCode: string
            uniCompilerVersion: string
            singleThread: boolean
            flexDirection: string
            splashScreen: Map<string, any> | null
            isShowSplashAd: boolean
            darkmode: boolean
            defaultAppTheme: string
          }
        }
      }
    }
  }
}

export {}
