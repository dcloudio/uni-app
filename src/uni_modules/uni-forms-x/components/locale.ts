export type UniFormLocaleType = 'zh-Hans' | 'zh-Hant' | 'en' | 'fr' | 'la'

export type UniFormLocaleMessages = {
	modalTitle: string,
	validationErrorMessage: string
}

/**
 * 解析应用语言的地区/语言标识。
 * @param language appLanguage 原始值
 * @returns 支持的语言类型，无法识别时返回英文
 */
function resolveLocaleType(language : string) : UniFormLocaleType {
	const value = (language ?? '').toLowerCase()
	if (
		value.indexOf('zh-hant') == 0 ||
		value.indexOf('zh-tw') == 0 ||
		value.indexOf('zh-hk') == 0 ||
		value.indexOf('zh-mo') == 0
	) {
		return 'zh-Hant'
	}
	if (value.indexOf('zh') == 0) {
		return 'zh-Hans'
	}
	if (value.indexOf('fr') == 0) {
		return 'fr'
	}
	if (value.indexOf('la') == 0 || value.indexOf('lat') == 0) {
		return 'la'
	}
	return 'en'
}

/**
 * 取当前应用语言对应的内置文案。
 * @returns 组件内部使用的国际化文案
 */
export function getUniFormLocaleMessages() : UniFormLocaleMessages {
	const localeType = resolveLocaleType(uni.getAppBaseInfo().appLanguage)

	if (localeType == 'zh-Hans') {
		return {
			modalTitle: '提示',
			validationErrorMessage: '验证错误'
		}
	}

	if (localeType == 'zh-Hant') {
		return {
			modalTitle: '提示',
			validationErrorMessage: '驗證錯誤'
		}
	}

	if (localeType == 'fr') {
		return {
			modalTitle: 'Avertissement',
			validationErrorMessage: 'Erreur de validation'
		}
	}

	if (localeType == 'la') {
		return {
			modalTitle: 'Monitum',
			validationErrorMessage: 'Error validationis'
		}
	}

	return {
		modalTitle: 'Notice',
		validationErrorMessage: 'Validation error'
	}
}
