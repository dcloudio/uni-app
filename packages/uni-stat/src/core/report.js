import {
	get_time,
	set_page_residence_time,
	get_first_visit_time,
	get_last_visit_time,
	get_total_visit_count,
	get_page_residence_time,
	get_first_time,
	get_last_time,
	get_residence_time
} from '../utils/pageTime.js'

import {
	stat_config,
	get_uuid,
	get_platform_name,
	get_pack_name,
	get_scene,
	get_version,
	get_channel,
	get_splicing,
	get_page_route,
	get_route,
	handle_data,
	calibration,
	get_page_name,
	is_report_data,
	get_sgin,
	get_encodeURIComponent_options
} from '../utils/pageInfo.js'

import {
	sys
} from '../utils/util.js'

import {
	STAT_VERSION,
	OPERATING_TIME,
	STAT_URL,
	STAT_H5_URL,
	DEBUG
} from '../config.ts';

import {
	dbSet,
	dbGet,
	dbRemove
} from '../utils/db.js'

// 统计数据默认值
let statData = {
	uuid: get_uuid(), // 设备标识
	ut: get_platform_name(), // 平台类型
	mpn: get_pack_name(), // 原生平台包名、小程序 appid
	ak: stat_config.appid, // uni-app 应用 Appid
	usv: STAT_VERSION, // 统计 sdk 版本
	v: get_version(), // 应用版本，仅app
	ch: get_channel(), // 渠道信息
	cn: '', // 国家
	pn: '', // 省份
	ct: '', // 城市
	t: get_time(), // 上报数据时的时间戳
	tt: '',
	p: sys.platform === 'android' ? 'a' : 'i', // 手机系统
	brand: sys.brand || '', // 手机品牌
	md: sys.model, // 手机型号
	sv: sys.system.replace(/(Android|iOS)\s/, ''), // 手机系统版本
	mpsdk: sys.SDKVersion || '', // x程序 sdk version
	mpv: sys.version || '', // 小程序平台版本 ，如微信、支付宝
	lang: sys.language, // 语言
	pr: sys.pixelRatio, // pixelRatio 设备像素比
	ww: sys.windowWidth, // windowWidth 可使用窗口宽度
	wh: sys.windowHeight, // windowHeight 可使用窗口高度
	sw: sys.screenWidth, // screenWidth 屏幕宽度
	sh: sys.screenHeight, // screenHeight 屏幕高度
}
export default class Report {
	constructor() {
		// 页面实例
		this.self = ''
		// 进入应用标识
		this.__licationShow = false
		// 离开应用标识
		this.__licationHide = false
		// 统计默认值
		this.statData = statData
		// 标题默认值
		this._navigationBarTitle = {
			config: '',
			page: '',
			report: '',
			lt: '',
		}

		// 页面参数
		this._query = {}
		// 页面最后停留页面的 url
		// this._lastPageRoute = ''

		// 注册拦截器
		let registerInterceptor = typeof uni.addInterceptor === 'function'
		if (registerInterceptor) {
			this.addInterceptorInit()
			this.interceptLogin()
			this.interceptShare(true)
			this.interceptRequestPayment()
		}
	}

	addInterceptorInit() {
		let self = this
		uni.addInterceptor('setNavigationBarTitle', {
			invoke(args) {
				self._navigationBarTitle.page = args.title
			},
		})
	}

	interceptLogin() {
		let self = this
		uni.addInterceptor('login', {
			complete() {
				self._login()
			},
		})
	}

	interceptShare(type) {
		let self = this
		if (!type) {
			self._share()
			return
		}
		uni.addInterceptor('share', {
			success() {
				self._share()
			},
			fail() {
				self._share()
			},
		})
	}

	interceptRequestPayment() {
		let self = this
		uni.addInterceptor('requestPayment', {
			success() {
				self._payment('pay_success')
			},
			fail() {
				self._payment('pay_fail')
			},
		})
	}

	_login() {
		this.sendEventRequest({
				key: 'login',
			},
			0
		)
	}

	_share() {
		this.sendEventRequest({
			key: 'share',
		}, 0)
	}
	_payment(key) {
		this.sendEventRequest({
			key,
		}, 0)
	}

	/**
	 * 进入应用触发
	 */
	applicationShow() {
		// 通过 __licationHide 判断保证是进入后台后在次进入应用，避免重复上报数据
		if (this.__licationHide) {
			get_last_time()
			const time = get_residence_time('app')
			// 需要判断进入后台是否超过时限 ，默认是 30min ，是的话需要执行进入应用的上报
			if (time.overtime) {
				let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE')
				let options = {
					path: lastPageRoute,
					scene: this.statData.sc,
				}
				this.sendReportRequest(options)
			}
			// 状态重置
			this.__licationHide = false
		}
	}

	/**
	 * 离开应用触发
	 * @param {Object} self
	 * @param {Object} type
	 */
	applicationHide(self, type) {
		// 进入应用后台保存状态，方便进入前台后判断是否上报应用数据
		this.__licationHide = true
		get_last_time()
		const time = get_residence_time()
		const route = get_page_route(self)
		// this._lastPageRoute = route
		uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route)
		this.sendHideRequest({
				urlref: route,
				urlref_ts: time.residenceTime,
			},
			type
		)
		// 重置时间
		get_first_time()
	}

	/**
	 * 进入页面触发
	 */
	pageShow(self) {
		// 清空值 ，初始化 ，避免污染后面的上报数据
		this._navigationBarTitle = {
			config: '',
			page: '',
			report: '',
			lt: '',
		}

		const route = get_page_route(self)
		const routepath = get_route(self)

		this._navigationBarTitle.config = get_page_name(routepath)
		// 表示应用触发 ，页面切换不触发之后的逻辑
		if (this.__licationShow) {
			get_first_time()
			// this._lastPageRoute = route
			uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route)
			this.__licationShow = false
			return
		}

		get_last_time()

		const time = get_residence_time('page')
		// 停留时间
		if (time.overtime) {
			let options = {
				path: route,
				scene: this.statData.sc,
			}
			this.sendReportRequest(options)
		}
		// 重置时间
		get_first_time()
	}

	/**
	 * 离开页面触发
	 */
	pageHide(self) {
		if (!this.__licationHide) {
			get_last_time()
			const time = get_residence_time('page')
			let route = get_page_route(self)
			let lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE')
			if (!lastPageRoute) {
				lastPageRoute = route
			}
			uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route)
			this.sendPageRequest({
				url: route,
				urlref: lastPageRoute,
				urlref_ts: time.residenceTime,
			})
			// this._lastPageRoute = route
			return
		}
	}


	/**
	 * 发送请求,应用维度上报
	 * @param {Object} options 页面信息
	 */
	sendReportRequest(options) {
		this._navigationBarTitle.lt = '1'
		this._navigationBarTitle.config = get_page_name(options.path)
		let is_opt = options.query && JSON.stringify(options.query) !== '{}'
		let query = is_opt ? '?' + JSON.stringify(options.query) : ''
		Object.assign(this.statData, {
			lt: '1',
			url: (options.path + query) || '',
			t: get_time(),
			sc: get_scene(options.scene),
			fvts: get_first_visit_time(),
			lvts: get_last_visit_time(),
			tvc: get_total_visit_count()
		})
		if (get_platform_name() === 'n') {
			this.getProperty()
		} else {
			this.getNetworkInfo()
		}
	}

	/**
	 * 发送请求,页面维度上报
	 * @param {Object} opt
	 */
	sendPageRequest(opt) {
		let {
			url,
			urlref,
			urlref_ts
		} = opt
		this._navigationBarTitle.lt = '11'
		let options = {
			ak: this.statData.ak,
			uuid: this.statData.uuid,
			lt: '11',
			ut: this.statData.ut,
			url,
			tt: this.statData.tt,
			urlref,
			urlref_ts,
			ch: this.statData.ch,
			usv: this.statData.usv,
			t: get_time(),
			p: this.statData.p,
		}
		this.request(options)
	}

	/**
	 * 进入后台上报数据
	 * @param {Object} opt
	 * @param {Object} type
	 */
	sendHideRequest(opt, type) {
		let {
			urlref,
			urlref_ts
		} = opt
		let options = {
			ak: this.statData.ak,
			uuid: this.statData.uuid,
			lt: '3',
			ut: this.statData.ut,
			urlref,
			urlref_ts,
			ch: this.statData.ch,
			usv: this.statData.usv,
			t: get_time(),
			p: this.statData.p,
		}
		this.request(options, type)
	}

	/**
	 * 自定义事件上报
	 */
	sendEventRequest({
		key = '',
		value = ''
	} = {}) {
		// const route = this._lastPageRoute
		const routepath = get_route()
		this._navigationBarTitle.config = get_page_name(routepath)
		this._navigationBarTitle.lt = '21'
		let options = {
			ak: this.statData.ak,
			uuid: this.statData.uuid,
			lt: '21',
			ut: this.statData.ut,
			url: routepath,
			ch: this.statData.ch,
			e_n: key,
			e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
			usv: this.statData.usv,
			t: get_time(),
			p: this.statData.p,
		}
		this.request(options)
	}

	/**
	 * 获取wgt资源版本
	 */
	getProperty() {
		plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
			this.statData.v = wgtinfo.version || ''
			this.getNetworkInfo()
		})
	}

	/**
	 * 获取网络信息
	 */
	getNetworkInfo() {
		uni.getNetworkType({
			success: (result) => {
				this.statData.net = result.networkType
				this.getLocation()
			},
		})
	}

	/**
	 * 获取位置信息
	 */
	getLocation() {
		if (stat_config.getLocation) {
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (result) => {
					if (result.address) {
						this.statData.cn = result.address.country
						this.statData.pn = result.address.province
						this.statData.ct = result.address.city
					}

					this.statData.lat = result.latitude
					this.statData.lng = result.longitude
					this.request(this.statData)
				},
			})
		} else {
			this.statData.lat = 0
			this.statData.lng = 0
			this.request(this.statData)
		}
	}

	/**
	 * 发送请求
	 * @param {Object} data 上报数据
	 * @param {Object} type 类型
	 */
	request(data, type) {
		let time = get_time()
		const title = this._navigationBarTitle
		Object.assign(data, {
			ttn: title.page,
			ttpj: title.config,
			ttc: title.report
		})

		let uniStatData = dbGet('__UNI__STAT__DATA') || {}
		if (!uniStatData[data.lt]) {
			uniStatData[data.lt] = []
		}
		// 加入队列
		uniStatData[data.lt].push(data)
		dbSet('__UNI__STAT__DATA', uniStatData)

		let page_residence_time = get_page_residence_time()
		// 判断时候到达上报时间 ，默认 10 秒上报
		if (page_residence_time < OPERATING_TIME && !type) return

		// 时间超过，重新获取时间戳
		set_page_residence_time()
		const stat_data = handle_data(uniStatData)
		let optionsData = {
			usv: STAT_VERSION, //统计 SDK 版本号
			t: time, //发送请求时的时间戮
			requests: stat_data,
		}

		// 重置队列
		dbRemove('__UNI__STAT__DATA')
		
		
		if(__STAT_VERSION__ === '1') {
			if (data.ut === 'h5') {
			  this.imageRequest(optionsData)
			  return
			}
		}

		// XXX 安卓需要延迟上报 ，否则会有未知错误，需要验证处理
		if (get_platform_name() === 'n' && this.statData.p === 'a') {
			setTimeout(() => {
				this.sendRequest(optionsData)
			}, 200)
			return
		}

		this.sendRequest(optionsData)
	}

	getIsReportData(){
		return is_report_data()
	}
	
	/**
	 * 数据上报
	 * @param {Object} optionsData 需要上报的数据
	 */
	sendRequest(optionsData) {
		if(__STAT_VERSION__ === '2') {
			if (!uniCloud.config) {
				console.error('当前尚未绑定服务空间.')
				return
			}
			uniCloud.callFunction({
				name: 'uni-stat-report',
				data: optionsData,
				success: (res) => {},
				fail: (err) => {}
			})
		}
		
		
		if(__STAT_VERSION__ === '1') {
			this.getIsReportData().then(() => {
				uni.request({
					url: STAT_URL,
					method: 'POST',
					data: optionsData,
					success: () => {},
					fail: (e) => {
						if (++this._retry < 3) {
							setTimeout(() => {
								this.sendRequest(optionsData)
							}, 1000)
						}
					},
				})
			})
		}
	}
	
	/**
	 * h5 请求
	 */
	imageRequest(data) {
	  this.getIsReportData().then(() => {
	    let image = new Image()
	    let options = get_sgin(get_encodeURIComponent_options(data)).options
	    image.src = STAT_H5_URL + '?' + options
	  })
	}
	
	sendEvent(key, value) {
		// 校验 type 参数
		if (calibration(key, value)) return

		if (key === 'title') {
			this._navigationBarTitle.report = value
			return
		}
		this.sendEventRequest({
				key,
				value: typeof value === 'object' ? JSON.stringify(value) : value,
			},
			1
		)
	}
}
