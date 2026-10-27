let lang = {
	'zh-Hans': require('./zh-hans'),
	en: require('./en')
}

function mergeLanguage(lang1, lang2) {
	const localeList = Object.keys(lang1)
	localeList.push(...Object.keys(lang2))
	const result = {}
	for (let i = 0; i < localeList.length; i++) {
		const locale = localeList[i]
		result[locale] = Object.assign({}, lang1[locale], lang2[locale])
	}
	return result
}

try {
	const langPath = require.resolve('uni-config-center/uni-id/lang/index.js')
	lang = mergeLanguage(lang, require(langPath))
} catch (error) {}

module.exports = lang
