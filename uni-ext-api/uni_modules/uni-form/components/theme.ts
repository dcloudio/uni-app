/**
 * uni-form 暗黑主题（当前仅 Android 生效）
 *
 * 设计要点：
 * 1. 模块级单例：整个 App 只注册一次主题监听，组件只读共享的响应式状态；
 * 2. 同步初始化：组件 setup 时即可拿到正确的 isDark，避免首帧闪烁；
 * 3. 仅在 APP-ANDROID 下注册监听，其他平台恒为亮色，不改变现有行为。
 */


/**
 * 组件默认值令牌：开发者未显式设置时使用。
 * 注意：input 背景色由组件内 CSS `@media` 控制（见 input.uvue 的 .uni-input-wrapper），
 * 因为背景属于 CSS 渲染，开发者用 class 即可覆盖；文字色是原生绘制，必须由 JS 下发。
 */
export type FormThemeTokens = {
	inputText : string
}

export const FORM_THEME_LIGHT : FormThemeTokens = {
	inputText: '#000000'
}

export const FORM_THEME_DARK : FormThemeTokens = {
	inputText: '#ffffff'
}

export function resolveFormTokens(isDark : boolean) : FormThemeTokens {
	return isDark ? FORM_THEME_DARK : FORM_THEME_LIGHT
}

const isDarkTheme = ref(false)
let formThemeInitialized = false

function resolveIsDark() : boolean {
	// #ifdef APP-ANDROID
	const appTheme = uni.getAppBaseInfo().appTheme
	if (appTheme == 'light') {
		return false
	}
	if (appTheme == 'dark') {
		return true
	}
	// appTheme 为 auto 时，由系统主题决定
	return uni.getDeviceInfo().osTheme == 'dark'
	// #endif
	// #ifndef APP-ANDROID
	return false
	// #endif
}

export function initFormTheme() : void {
	if (formThemeInitialized) {
		return
	}
	formThemeInitialized = true
	// #ifdef APP-ANDROID
	isDarkTheme.value = resolveIsDark()
	uni.onAppThemeChange((res : AppThemeChangeResult) => {
		isDarkTheme.value = res.appTheme == 'dark'
	})
	uni.onOsThemeChange((res : OsThemeChangeResult) => {
		const appTheme = uni.getAppBaseInfo().appTheme
		if (appTheme == 'auto' || appTheme == null) {
			isDarkTheme.value = res.osTheme == 'dark'
		}
	})
	// #endif
}

/** 组件统一入口：幂等初始化，返回共享的主题状态 */
export function useFormThemeIsDark() : Ref<boolean> {
	initFormTheme()
	return isDarkTheme
}
