import Report from './report.js'

import { set_page_residence_time } from '../utils/pageTime.js'
import {
  get_page_types,
  get_platform_name,
  get_space,
  is_debug,
  is_push_clientid,
  is_page_report,
} from '../utils/pageInfo.js'
import { dbSet } from '../utils/db.js'
class Stat extends Report {
  static getInstance() {
    if (!uni.__stat_instance) {
      uni.__stat_instance = new Stat()
    }

    // 2.0 init 服务空间
    if (__STAT_VERSION__ === '2') {
      let space = get_space(uniCloud.config)
      if (!uni.__stat_uniCloud_space) {
        //   判断不为空对象
        if (space && Object.keys(space).length !== 0) {
          let spaceData = {
            provider: space.provider,
            spaceId: space.spaceId,
            clientSecret: space.clientSecret,
          }
          
          if (space.endpoint) {
            spaceData.endpoint = space.endpoint
          }

          if(space.provider === 'alipay'){
            spaceData.secretKey = space.secretKey
            spaceData.accessKey = space.accessKey || space.secretId
            spaceData.spaceAppId = space.spaceAppId || space.appId
          }

          uni.__stat_uniCloud_space = uniCloud.init(spaceData)
          // console.log(
          //   '=== 当前绑定的统计服务空间spaceId：' +
          //     uni.__stat_uniCloud_space.config.spaceId
          // )
        } else {
          console.error('应用未关联服务空间，请在uniCloud目录右键关联服务空间')
        }
      }
    }

    return uni.__stat_instance
  }
  constructor() {
    super()
  }

  /**
   * 获取推送id
   */
  pushEvent(options) {
    const ClientID = is_push_clientid()
    if (uni.getPushClientId && ClientID) {
      uni.getPushClientId({
        success: (res) => {
          const cid = res.cid || false
          //  只有获取到才会上传
          if (cid) {
            this.sendPushRequest(options, cid)
          }
        },
      })
    }
  }

  /**
   * 进入应用
   * @param {Object} options 页面参数
   * @param {Object} self	当前页面实例
   */
  launch(options, self) {
    // 初始化页面停留时间  start
    let residence_time = set_page_residence_time()
    this.__licationShow = true
    dbSet('__launch_options', options)
    // 应用初始上报参数为1
    options.cst = 1
    this.sendReportRequest(options, true)
  }
  load(options, self) {
    this.self = self
    this._query = options
  }

  appHide(self) {
    this.applicationHide(self, true)
  }

  appShow(self) {
    this.applicationShow(self)
  }

  show(self) {
    this.self = self
    if (get_page_types(self) === 'page') {
      const isPageReport = is_page_report()
      if (isPageReport) {
        this.pageShow(self)
      }
    }

    // #ifdef VUE3
    if (get_platform_name() === 'h5' || get_platform_name() === 'n') {
      if (get_page_types(self) === 'app') {
        this.appShow()
      }
    }
    // #endif

    // #ifndef VUE3
    if (get_page_types(self) === 'app') {
      this.appShow()
    }
    // #endif
  }

  hide(self) {
    this.self = self
    if (get_page_types(self) === 'page') {
      const isPageReport = is_page_report()
      if (isPageReport) {
        this.pageHide(self)
      }
    }

    // #ifdef VUE3
    if (get_platform_name() === 'h5' || get_platform_name() === 'n') {
      if (get_page_types(self) === 'app') {
        this.appHide()
      }
    }
    // #endif

    // #ifndef VUE3
    if (get_page_types(self) === 'app') {
      this.appHide()
    }
    // #endif
  }

  error(em) {
    // 开发工具内不上报错误
    // if (this._platform === 'devtools') {
    //   if (process.env.NODE_ENV === 'development') {
    //     console.info('当前运行环境为开发者工具，不上报数据。')
    //     return
    //   }
    // }
    let emVal = ''
    if (!em.message) {
      emVal = JSON.stringify(em)
    } else {
      emVal = em.stack
    }

    let route = ''
    try {
      route = get_route()
    } catch (e) {
      // 未获取到页面路径
      route = ''
    }

    let options = {
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: '31',
      url: route,
      ut: this.statData.ut,
      ch: this.statData.ch,
      mpsdk: this.statData.mpsdk,
      mpv: this.statData.mpv,
      v: this.statData.v,
      em: emVal,
      usv: this.statData.usv,
      t: parseInt(new Date().getTime() / 1000),
    }
    this.request(options)
  }
}
export default Stat
