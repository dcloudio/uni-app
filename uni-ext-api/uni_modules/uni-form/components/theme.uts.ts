import { onBeforeUnmount, ref } from 'vue'

/**
 * Android、iOS、Harmony 共用的表单主题状态。
 * 首次使用时同步初始化；组件共享主题监听，最后一个组件卸载时释放监听。
 */

/**
 * 组件默认值令牌：开发者未显式设置时使用。
 * input、textarea 默认背景透明；文字色由原生绘制，主题默认色需下发到原生控件。
 * 明亮主题不覆盖文字色，空字符串表示恢复原生默认值。
 */
export type FormThemeTokens = {
	inputText : string
}

export const FORM_THEME_LIGHT : FormThemeTokens = {
	inputText: ''
}

export const FORM_THEME_DARK : FormThemeTokens = {
	inputText: '#d1d1d1'
}

export function resolveFormTokens(isDark : boolean) : FormThemeTokens {
	return isDark ? FORM_THEME_DARK : FORM_THEME_LIGHT
}

const isDarkTheme = ref(false)
let formThemeInitialized = false
let formThemeUsers = 0
let appThemeListener: number | null = null
let osThemeListener: number | null = null

function resolveIsDark(appTheme: string | null): boolean {
	// #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
	if (appTheme == 'light') {
		return false
	}
	if (appTheme == 'dark') {
		return true
	}
	// appTheme 为 auto 或未设置时，由系统主题决定
	return uni.getDeviceInfo().osTheme == 'dark'
	// #endif
	// #ifndef APP-ANDROID || APP-IOS || APP-HARMONY
	return false
	// #endif
}

export function initFormTheme() : void {
	if (formThemeInitialized) {
		return
	}
	formThemeInitialized = true
	// #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
	isDarkTheme.value = resolveIsDark(uni.getAppBaseInfo().appTheme ?? null)
	appThemeListener = uni.onAppThemeChange((res: AppThemeChangeResult) => {
		isDarkTheme.value = resolveIsDark(res.appTheme)
	})
	osThemeListener = uni.onOsThemeChange((res: OsThemeChangeResult) => {
		const appTheme = uni.getAppBaseInfo().appTheme
		if (appTheme == 'auto' || appTheme == null) {
			isDarkTheme.value = res.osTheme == 'dark'
		}
	})
	// #endif
}

/** 组件统一入口：返回共享主题状态，并管理监听的生命周期。 */
export function useFormThemeIsDark() : Ref<boolean> {
	initFormTheme()
	formThemeUsers++
	onBeforeUnmount(() => {
		if (--formThemeUsers != 0) {
			return
		}
		// #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
		if (appThemeListener != null) {
			uni.offAppThemeChange(appThemeListener)
			appThemeListener = null
		}
		if (osThemeListener != null) {
			uni.offOsThemeChange(osThemeListener)
			osThemeListener = null
		}
		// #endif
		formThemeInitialized = false
	})
	return isDarkTheme
}
