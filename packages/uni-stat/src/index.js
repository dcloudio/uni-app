import {
	get_platform_name,
	get_page_vm
} from './utils/pageInfo.js'
import Stat from './core/stat.js'
const stat = Stat.getInstance()

// 用于判断是隐藏页面还是卸载页面
let isHide = false

const lifecycle = {
	onLaunch(options) {
		// 进入应用上报数据
		stat.launch(options, this);
	},
	onLoad(options) {
		stat.load(options, this);
		// 重写分享，获取分享上报事件
		if (this.$scope && this.$scope.onShareAppMessage) {
			let oldShareAppMessage = this.$scope.onShareAppMessage;
			this.$scope.onShareAppMessage = function(options) {
				stat.interceptShare(false);
				return oldShareAppMessage.call(this, options)
			}
		}
	},
	onShow() {
		isHide = false
		stat.show(this);
	},
	onHide() {
		isHide = true
		stat.hide(this);
	},
	onUnload() {
		if (isHide) {
			isHide = false
			return
		}
		stat.hide(this);
	},
	onError(e) {
		stat.error(e)
	}
}


function main() {
	// console.log('--- 统计开启')
	if (process.env.NODE_ENV === 'development') {
		uni.report = function(type, options) {}
	} else {
		// #ifdef VUE3
		uni.onCreateVueApp((app) => {
			app.mixin(lifecycle)
			uni.report = function(type, options) {
				stat.sendEvent(type, options)
			}
		})
		uni.onAppLaunch((options) => {
		  stat.launch(options)
		  // 小程序平台此时也无法获取getApp，统一在options中传递一个app mixin对象
		  options.app.mixin(lifecycle)
		  uni.report = function (type, options) {
			stat.sendEvent(type, options)
		  }
		})
		
		if (get_platform_name() !== 'h5' && get_platform_name() !== 'n') {
			uni.onAppHide(() => {
				stat.appHide(get_page_vm());
			})
			uni.onAppShow(() => {
				stat.appShow(get_page_vm());
			})
		}
		// #endif
		
		// #ifndef VUE3
		const Vue = require('vue');
		(Vue.default || Vue).mixin(lifecycle);
		uni.report = function(type, options) {
		  stat.sendEvent(type, options);
		};
		// #endif
	}
}

main()
