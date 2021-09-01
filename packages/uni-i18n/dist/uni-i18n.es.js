const isArray = Array.isArray;
const isObject = (val) => val !== null && typeof val === 'object';
const defaultDelimiters = ['{', '}'];
class BaseFormatter {
    constructor() {
        this._caches = Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
        if (!values) {
            return [message];
        }
        let tokens = this._caches[message];
        if (!tokens) {
            tokens = parse(message, delimiters);
            this._caches[message] = tokens;
        }
        return compile(tokens, values);
    }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = '';
    while (position < format.length) {
        let char = format[position++];
        if (char === startDelimiter) {
            if (text) {
                tokens.push({ type: 'text', value: text });
            }
            text = '';
            let sub = '';
            char = format[position++];
            while (char !== undefined && char !== endDelimiter) {
                sub += char;
                char = format[position++];
            }
            const isClosed = char === endDelimiter;
            const type = RE_TOKEN_LIST_VALUE.test(sub)
                ? 'list'
                : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
                    ? 'named'
                    : 'unknown';
            tokens.push({ value: sub, type });
        }
        //  else if (char === '%') {
        //   // when found rails i18n syntax, skip text capture
        //   if (format[position] !== '{') {
        //     text += char
        //   }
        // }
        else {
            text += char;
        }
    }
    text && tokens.push({ type: 'text', value: text });
    return tokens;
}
function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = isArray(values)
        ? 'list'
        : isObject(values)
            ? 'named'
            : 'unknown';
    if (mode === 'unknown') {
        return compiled;
    }
    while (index < tokens.length) {
        const token = tokens[index];
        switch (token.type) {
            case 'text':
                compiled.push(token.value);
                break;
            case 'list':
                compiled.push(values[parseInt(token.value, 10)]);
                break;
            case 'named':
                if (mode === 'named') {
                    compiled.push(values[token.value]);
                }
                else {
                    if (process.env.NODE_ENV !== 'production') {
                        console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
                    }
                }
                break;
            case 'unknown':
                if (process.env.NODE_ENV !== 'production') {
                    console.warn(`Detect 'unknown' type of token!`);
                }
                break;
        }
        index++;
    }
    return compiled;
}

const LOCALE_ZH_HANS = 'zh-Hans';
const LOCALE_ZH_HANT = 'zh-Hant';
const LOCALE_EN = 'en';
const LOCALE_FR = 'fr';
const LOCALE_ES = 'es';
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
    if (!locale) {
        return;
    }
    locale = locale.trim().replace(/_/g, '-');
    if (messages[locale]) {
        return locale;
    }
    locale = locale.toLowerCase();
    if (locale.indexOf('zh') === 0) {
        if (locale.indexOf('-hans') !== -1) {
            return LOCALE_ZH_HANS;
        }
        if (locale.indexOf('-hant') !== -1) {
            return LOCALE_ZH_HANT;
        }
        if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
            return LOCALE_ZH_HANT;
        }
        return LOCALE_ZH_HANS;
    }
    const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
    if (lang) {
        return lang;
    }
}
class I18n {
    constructor({ locale, fallbackLocale, messages, watcher, formater, }) {
        this.locale = LOCALE_EN;
        this.fallbackLocale = LOCALE_EN;
        this.message = {};
        this.messages = {};
        this.watchers = [];
        if (fallbackLocale) {
            this.fallbackLocale = fallbackLocale;
        }
        this.formater = formater || defaultFormatter;
        this.messages = messages || {};
        this.setLocale(locale || LOCALE_EN);
        if (watcher) {
            this.watchLocale(watcher);
        }
    }
    setLocale(locale) {
        const oldLocale = this.locale;
        this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
        if (!this.messages[this.locale]) {
            // 可能初始化时不存在
            this.messages[this.locale] = {};
        }
        this.message = this.messages[this.locale];
        // 仅发生变化时，通知
        if (oldLocale !== this.locale) {
            this.watchers.forEach((watcher) => {
                watcher(this.locale, oldLocale);
            });
        }
    }
    getLocale() {
        return this.locale;
    }
    watchLocale(fn) {
        const index = this.watchers.push(fn) - 1;
        return () => {
            this.watchers.splice(index, 1);
        };
    }
    add(locale, message, override = true) {
        const curMessages = this.messages[locale];
        if (curMessages) {
            if (override) {
                Object.assign(curMessages, message);
            }
            else {
                Object.keys(message).forEach((key) => {
                    if (!hasOwn(curMessages, key)) {
                        curMessages[key] = message[key];
                    }
                });
            }
        }
        else {
            this.messages[locale] = message;
        }
    }
    f(message, values, delimiters) {
        return this.formater.interpolate(message, values, delimiters).join('');
    }
    t(key, locale, values) {
        let message = this.message;
        if (typeof locale === 'string') {
            locale = normalizeLocale(locale, this.messages);
            locale && (message = this.messages[locale]);
        }
        else {
            values = locale;
        }
        if (!hasOwn(message, key)) {
            console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
            return key;
        }
        return this.formater.interpolate(message[key], values).join('');
    }
}

const ignoreVueI18n = true;
function initLocaleWatcher(appVm, i18n) {
    if (appVm.$i18n) {
        const vm = appVm.$i18n.vm ? appVm.$i18n.vm : appVm;
        vm.$watch(appVm.$i18n.vm ? 'locale' : () => appVm.$i18n.locale, (newLocale) => {
            i18n.setLocale(newLocale);
        }, {
            immediate: true,
        });
    }
}
// function getDefaultLocale() {
//   if (typeof navigator !== 'undefined') {
//     return (navigator as any).userLanguage || navigator.language
//   }
//   if (typeof plus !== 'undefined') {
//     // TODO 待调整为最新的获取语言代码
//     return plus.os.language
//   }
//   return uni.getSystemInfoSync().language
// }
const i18nInstances = [];
function initVueI18n(locale = LOCALE_EN, messages = {}, fallbackLocale = LOCALE_EN, watcher) {
    // 兼容旧版本入参
    if (typeof locale !== 'string') {
        [locale, messages] = [messages, locale];
    }
    if (typeof locale !== 'string') {
        locale = fallbackLocale;
    }
    const i18n = new I18n({
        locale: locale || fallbackLocale,
        fallbackLocale,
        messages,
        watcher,
    });
    i18nInstances.push(i18n);
    let t = (key, values) => {
        if (typeof getApp !== 'function') {
            // app view
            /* eslint-disable no-func-assign */
            t = function (key, values) {
                return i18n.t(key, values);
            };
        }
        else {
            const appVm = getApp().$vm;
            if (!appVm.$t || !appVm.$i18n || ignoreVueI18n) {
                // if (!locale) {
                //   i18n.setLocale(getDefaultLocale())
                // }
                /* eslint-disable no-func-assign */
                t = function (key, values) {
                    return i18n.t(key, values);
                };
            }
            else {
                initLocaleWatcher(appVm, i18n);
                /* eslint-disable no-func-assign */
                t = function (key, values) {
                    const $i18n = appVm.$i18n;
                    const silentTranslationWarn = $i18n.silentTranslationWarn;
                    $i18n.silentTranslationWarn = true;
                    const msg = appVm.$t(key, values);
                    $i18n.silentTranslationWarn = silentTranslationWarn;
                    if (msg !== key) {
                        return msg;
                    }
                    return i18n.t(key, $i18n.locale, values);
                };
            }
        }
        return t(key, values);
    };
    return {
        i18n,
        f(message, values, delimiters) {
            return i18n.f(message, values, delimiters);
        },
        t(key, values) {
            return t(key, values);
        },
        add(locale, message, override = true) {
            return i18n.add(locale, message, override);
        },
        watch(fn) {
            return i18n.watchLocale(fn);
        },
        getLocale() {
            return i18n.getLocale();
        },
        setLocale(newLocale) {
            // 更新所有实例 locale
            i18nInstances.forEach((ins) => {
                ins.setLocale(newLocale);
            });
        },
    };
}

const isString = (val) => typeof val === 'string';
let formater;
function hasI18nJson(jsonObj, delimiters) {
    if (!formater) {
        formater = new BaseFormatter();
    }
    return walkJsonObj(jsonObj, (jsonObj, key) => {
        const value = jsonObj[key];
        if (isString(value)) {
            if (isI18nStr(value, delimiters)) {
                return true;
            }
        }
        else {
            return hasI18nJson(value, delimiters);
        }
    });
}
function parseI18nJson(jsonObj, values, delimiters) {
    if (!formater) {
        formater = new BaseFormatter();
    }
    walkJsonObj(jsonObj, (jsonObj, key) => {
        const value = jsonObj[key];
        if (isString(value)) {
            if (isI18nStr(value, delimiters)) {
                jsonObj[key] = compileStr(value, values, delimiters);
            }
        }
        else {
            parseI18nJson(value, values, delimiters);
        }
    });
    return jsonObj;
}
function compileI18nJsonStr(jsonStr, { locale, locales, delimiters, }) {
    if (!isI18nStr(jsonStr, delimiters)) {
        return jsonStr;
    }
    if (!formater) {
        formater = new BaseFormatter();
    }
    const localeValues = [];
    Object.keys(locales).forEach((name) => {
        if (name !== locale) {
            localeValues.push({
                locale: name,
                values: locales[name],
            });
        }
    });
    localeValues.unshift({ locale, values: locales[locale] });
    try {
        return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
    }
    catch (e) { }
    return jsonStr;
}
function isI18nStr(value, delimiters) {
    return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
    return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
    const value = jsonObj[key];
    if (isString(value)) {
        // 存在国际化
        if (isI18nStr(value, delimiters)) {
            jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
            // 格式化国际化语言
            const valueLocales = (jsonObj[key + 'Locales'] = {});
            localeValues.forEach((localValue) => {
                valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
            });
        }
    }
    else {
        compileJsonObj(value, localeValues, delimiters);
    }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
    walkJsonObj(jsonObj, (jsonObj, key) => {
        compileValue(jsonObj, key, localeValues, delimiters);
    });
    return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
    if (isArray(jsonObj)) {
        for (let i = 0; i < jsonObj.length; i++) {
            if (walk(jsonObj, i)) {
                return true;
            }
        }
    }
    else if (isObject(jsonObj)) {
        for (const key in jsonObj) {
            if (walk(jsonObj, key)) {
                return true;
            }
        }
    }
    return false;
}

export { BaseFormatter as Formatter, I18n, LOCALE_EN, LOCALE_ES, LOCALE_FR, LOCALE_ZH_HANS, LOCALE_ZH_HANT, compileI18nJsonStr, hasI18nJson, initVueI18n, isI18nStr, isString, parseI18nJson };
