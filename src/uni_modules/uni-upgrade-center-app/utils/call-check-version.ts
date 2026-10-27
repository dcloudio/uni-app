export type StoreListItem = {
  enable : boolean
  id : string
  name : string
  scheme : string
  priority : number // 优先级
}

export type UniUpgradeCenterResult = {
  _id : string
  appid : string
  name : string
  title : string
  contents : string
  url : string // 安装包下载地址
  platform : Array<string> // Array<'Android' | 'iOS' | 'Harmony'>
  version : string // 版本号 1.0.0
  uni_platform : string // "android" | "ios" | 'harmony'
  stable_publish : boolean // 是否是稳定版
  is_mandatory : boolean // 是否强制更新
  effective_is_mandatory ?: boolean | null // 根据当前 appVersion 与最低强制版本计算后的结果
  is_silently : boolean | null	// 是否静默更新
  is_update_prompt ?: boolean | null // 是否启用安装完成后的更新提醒
  update_prompt ?: 'modal' | 'toast' | null // 安装完成后的提示方式
  update_prompt_content ?: string | null // 弹窗提醒内容
  min_required_version ?: string | null // 当前应用低于此版本时强制整包更新
  create_env : string // "upgrade-center"
  create_date : number
  message : string
  code : number

  type : string // "native_app" | "wgt"
  store_list : StoreListItem[] | null
  min_uni_version : string | null  // 升级 wgt 的最低 uni-app 版本
  is_vapor ?: boolean | null // 是否为 Vapor 应用资源包（仅 type 为 wgt 时有意义；历史记录可能无该字段）
  isVapor ?: boolean | null // 已废弃：旧版记录字段，仅用于读取历史数据兼容（云函数返回的历史记录可能带该字段）
  sha256 : string | null // Vapor wgt 资源包的 SHA256（安装前完整性校验用）
}

/**
 * 是否为 wgt 资源包更新（wgt 支持热更新/静默更新，apk 为整包更新）
 */
export function isWgtPackage(packageInfo : UniUpgradeCenterResult | null) : boolean {
  if (packageInfo == null) return false
  return packageInfo.type === 'wgt'
}

// #ifdef UNI-APP-X
// vapor 模式无运行时判断 API，使用编译期条件编译区分
// vapor-harmony 暂不支持 wgt 热更新（uni.installWgt 不支持鸿蒙），条件编译中排除，避免误上报
function isVaporRuntime() : boolean {
  let isVapor = false
  // #ifdef VUE3-VAPOR && APP && !APP-HARMONY
  isVapor = true
  // #endif
  return isVapor
}
// #endif

/**
 * checkVersion 可选调用参数：用于测试/调试注入（正式使用不传，读取真实应用信息）
 */
export type CheckUpdateOptions = {
	/** 应用 AppID（默认取 systemInfo.appId） */
	appid ?: string,
	/** 应用版本号（默认取 systemInfo.appVersion） */
	appVersion ?: string,
	/** 已安装 wgt 资源版本（默认取 appWgtVersion，未安装过 wgt 时为应用版本） */
	appWgtVersion ?: string,
}

export default function (checkUpdateOptions ?: CheckUpdateOptions) : Promise<UniUpgradeCenterResult> {
  // #ifdef APP
  return new Promise<UniUpgradeCenterResult>((resolve, reject) => {
    const systemInfo = uni.getSystemInfoSync()
    // 测试/调试可通过参数注入；正式使用不传，读取真实应用信息
		const appId = checkUpdateOptions?.appid ?? systemInfo.appId
		const appVersion = checkUpdateOptions?.appVersion ?? systemInfo.appVersion
    // #ifndef UNI-APP-X
    if (typeof appId === 'string' && typeof appVersion === 'string' && appId.length > 0 && appVersion.length > 0) {
      plus.runtime.getProperty(appId, function (widgetInfo) {
        if (widgetInfo.version) {
          let data = {
            action: 'checkVersion',
            appid: appId,
            appVersion: appVersion,
						wgtVersion: checkUpdateOptions?.appWgtVersion ?? widgetInfo.version
          }
          uniCloud.callFunction({
            name: 'uni-upgrade-center',
            data,
            success: (e) => {
              resolve(e.result as UniUpgradeCenterResult)
            },
            fail: (error) => {
              reject(error)
            }
          })
        } else {
          reject('widgetInfo.version is EMPTY')
        }
      })
    } else {
      reject('plus.runtime.appid is EMPTY')
    }
    // #endif
    // #ifdef UNI-APP-X
    if (typeof appId === 'string' && typeof appVersion === 'string' && appId.length > 0 && appVersion.length > 0) {
      // appWgtVersion 为当前已安装资源（wgt）版本，未安装过 wgt 时等于 manifest 中配置的应用版本名称
				const appWgtVersion = checkUpdateOptions?.appWgtVersion ?? (uni.getAppBaseInfo().appWgtVersion ?? appVersion)
      let data = {
        action: 'checkVersion',
        appid: appId,
        appVersion: appVersion,
        is_uniapp_x: true,
        is_vapor: isVaporRuntime(),
        wgtVersion: appWgtVersion
      }
      try {
        uniCloud.callFunction({
          name: 'uni-upgrade-center',
          data: data
        }).then(res => {
          const code = res.result['code']
          const codeIsNumber = ['Int', 'Long', 'number'].includes(typeof code)
          if (codeIsNumber) {
            if ((code as number) == 0) {
              const result = JSON.parse<UniUpgradeCenterResult>(JSON.stringify(res.result)) as UniUpgradeCenterResult
              resolve(result)
            } else if ((code as number) < 0) {
              reject({
                code: res.result['code'],
                message: res.result['message']
              })
            } else {
              const result = JSON.parse<UniUpgradeCenterResult>(JSON.stringify(res.result)) as UniUpgradeCenterResult
              resolve(result)
            }
          } else {
            reject('升级中心返回了无效的 code')
          }
        }).catch<void>((err : any | null) => {
          const error = err as UniCloudError
          if (error.errMsg == '未匹配到云函数[uni-upgrade-center]')
            error.errMsg = '【uni-upgrade-center-app】未配置uni-upgrade-center，无法升级。参考: https://uniapp.dcloud.net.cn/uniCloud/upgrade-center.html'
          reject(error.errMsg)
        })
      } catch (e) {
        reject(e.message)
      }
    } else {
      reject('invalid appid or appVersion')
    }
    // #endif
  })
  // #endif
  // #ifndef APP
  return new Promise((resolve, reject) => {
    reject({
      message: '请在App中使用'
    })
  })
  // #endif
}
