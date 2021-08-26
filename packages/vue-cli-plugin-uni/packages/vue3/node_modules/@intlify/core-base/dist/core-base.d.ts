import { CompileError } from '@intlify/message-compiler';
import { CompileErrorCodes } from '@intlify/message-compiler';
import type { CompileOptions } from '@intlify/message-compiler';
import type { CoreMissingType } from '@intlify/runtime';
import { createCompileError } from '@intlify/message-compiler';
import type { FallbackLocale } from '@intlify/runtime';
import type { IntlifyDevToolsEmitter } from '@intlify/devtools-if';
import type { IntlifyDevToolsHookPayloads } from '@intlify/devtools-if';
import { IntlifyDevToolsHooks } from '@intlify/devtools-if';
import type { LinkedModifiers } from '@intlify/runtime';
import type { Locale } from '@intlify/runtime';
import type { MessageFunction } from '@intlify/runtime';
import type { MessageProcessor } from '@intlify/runtime';
import type { MessageType } from '@intlify/runtime';
import type { NamedValue } from '@intlify/runtime';
import type { Path } from '@intlify/message-resolver';
import type { PluralizationRules } from '@intlify/runtime';
import type { VueDevToolsEmitter } from '@intlify/vue-devtools';

export declare function clearCompileCache(): void;

/* Excluded from this release type: clearDateTimeFormat */

/* Excluded from this release type: clearNumberFormat */
export { CompileError }
export { CompileErrorCodes }

export declare function compileToFunction<T = string>(source: string, options?: CompileOptions): MessageFunction<T>;

export declare interface CoreCommonContext<Message = string> {
    cid: number;
    version: string;
    locale: Locale;
    fallbackLocale: FallbackLocale;
    missing: CoreMissingHandler<Message> | null;
    missingWarn: boolean | RegExp;
    fallbackWarn: boolean | RegExp;
    fallbackFormat: boolean;
    unresolving: boolean;
    onWarn(msg: string, err?: Error): void;
}

export declare interface CoreContext<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Message = string> extends CoreTranslationContext<Messages, Message>, CoreDateTimeContext<DateTimeFormats, Message>, CoreNumberContext<NumberFormats, Message> {
}

export declare interface CoreDateTimeContext<DateTimeFormats = {}, Message = string> extends CoreCommonContext<Message> {
    datetimeFormats: DateTimeFormats;
}

export declare interface CoreError extends CompileError {
    code: CoreErrorCodes;
}

export declare const enum CoreErrorCodes {
    INVALID_ARGUMENT = 14,
    INVALID_DATE_ARGUMENT = 15,
    INVALID_ISO_DATE_ARGUMENT = 16,
    __EXTEND_POINT__ = 17
}

export declare interface CoreInternalContext {
    __datetimeFormatters: Map<string, Intl.DateTimeFormat>;
    __numberFormatters: Map<string, Intl.NumberFormat>;
    __localeChainCache?: Map<Locale, Locale[]>;
    __v_emitter?: VueDevToolsEmitter;
    __meta: MetaInfo;
}

export declare interface CoreInternalOptions {
    __datetimeFormatters?: Map<string, Intl.DateTimeFormat>;
    __numberFormatters?: Map<string, Intl.NumberFormat>;
    __v_emitter?: VueDevToolsEmitter;
    __meta?: MetaInfo;
}

export declare type CoreMissingHandler<Message = string> = (context: CoreCommonContext<Message>, locale: Locale, key: Path, type: CoreMissingType, ...values: unknown[]) => string | void;

export declare interface CoreNumberContext<NumberFormats = {}, Message = string> extends CoreCommonContext<Message> {
    numberFormats: NumberFormats;
}

export declare interface CoreOptions<Message = string> {
    version?: string;
    locale?: Locale;
    fallbackLocale?: FallbackLocale;
    messages?: LocaleMessages<Message>;
    datetimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    modifiers?: LinkedModifiers<Message>;
    pluralRules?: PluralizationRules;
    missing?: CoreMissingHandler<Message>;
    missingWarn?: boolean | RegExp;
    fallbackWarn?: boolean | RegExp;
    fallbackFormat?: boolean;
    unresolving?: boolean;
    postTranslation?: PostTranslationHandler<Message>;
    processor?: MessageProcessor<Message>;
    warnHtmlMessage?: boolean;
    escapeParameter?: boolean;
    messageCompiler?: MessageCompiler<Message>;
    onWarn?: (msg: string, err?: Error) => void;
}

export declare interface CoreTranslationContext<Messages = {}, Message = string> extends CoreCommonContext<Message> {
    messages: Messages;
    modifiers: LinkedModifiers<Message>;
    pluralRules?: PluralizationRules;
    postTranslation: PostTranslationHandler<Message> | null;
    processor: MessageProcessor<Message> | null;
    warnHtmlMessage: boolean;
    escapeParameter: boolean;
    messageCompiler: MessageCompiler<Message> | null;
}

export declare const enum CoreWarnCodes {
    NOT_FOUND_KEY = 0,
    FALLBACK_TO_TRANSLATE = 1,
    CANNOT_FORMAT_NUMBER = 2,
    FALLBACK_TO_NUMBER_FORMAT = 3,
    CANNOT_FORMAT_DATE = 4,
    FALLBACK_TO_DATE_FORMAT = 5,
    __EXTEND_POINT__ = 6
}
export { createCompileError }

export declare function createCoreContext<Message = string, Options extends CoreOptions<Message> = object, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<Message>> = Record<keyof Options['messages'], LocaleMessageDictionary<Message>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat> = Record<keyof Options['numberFormats'], NumberFormat>>(options?: Options): CoreContext<Options['messages'], Options['datetimeFormats'], Options['numberFormats'], Message>;

export declare function createCoreError(code: CoreErrorCodes): CoreError;

/**
 *  number
 */
export declare type CurrencyDisplay = 'symbol' | 'code' | 'name';

export declare interface CurrencyNumberFormatOptions extends Intl.NumberFormatOptions {
    style: 'currency';
    currency: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: LocaleMatcher;
    formatMatcher?: FormatMatcher;
}

export declare function datetime<DateTimeFormats, Message = string>(context: CoreDateTimeContext<DateTimeFormats, Message>, value: number | Date): string | number | Intl.DateTimeFormatPart[];

export declare function datetime<DateTimeFormats, Message = string>(context: CoreDateTimeContext<DateTimeFormats, Message>, value: number | Date, key: string): string | number | Intl.DateTimeFormatPart[];

export declare function datetime<DateTimeFormats, Message = string>(context: CoreDateTimeContext<DateTimeFormats, Message>, value: number | Date, key: string, locale: Locale): string | number | Intl.DateTimeFormatPart[];

export declare function datetime<DateTimeFormats, Message = string>(context: CoreDateTimeContext<DateTimeFormats, Message>, value: number | Date, options: DateTimeOptions): string | number | Intl.DateTimeFormatPart[];

export declare function datetime<DateTimeFormats, Message = string>(context: CoreDateTimeContext<DateTimeFormats, Message>, ...args: unknown[]): string | number | Intl.DateTimeFormatPart[];

export declare type DateTimeDigital = 'numeric' | '2-digit';

export declare type DateTimeFormat = {
    [key: string]: DateTimeFormatOptions;
};

export declare type DateTimeFormatOptions = Intl.DateTimeFormatOptions | SpecificDateTimeFormatOptions;

export declare type DateTimeFormats = {
    [locale: string]: DateTimeFormat;
};

/**
 *  datetime
 */
export declare type DateTimeHumanReadable = 'long' | 'short' | 'narrow';

/**
 *  # datetime
 *
 *  ## usages:
 *    // for example `context.datetimeFormats` below
 *    'en-US': {
 *      short: {
 *        year: 'numeric', month: '2-digit', day: '2-digit',
 *        hour: '2-digit', minute: '2-digit'
 *      }
 *    },
 *    'ja-JP': { ... }
 *
 *    // datetimeable value only
 *    datetime(context, value)
 *
 *    // key argument
 *    datetime(context, value, 'short')
 *
 *    // key & locale argument
 *    datetime(context, value, 'short', 'ja-JP')
 *
 *    // object sytle argument
 *    datetime(context, value, { key: 'short', locale: 'ja-JP' })
 *
 *    // suppress localize miss warning option, override context.missingWarn
 *    datetime(context, value, { key: 'short', locale: 'ja-JP', missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    datetime(context, value, { key: 'short', locale: 'ja-JP', fallbackWarn: false })
 *
 *    // if you specify `part` options, you can get an array of objects containing the formatted datetime in parts
 *    datetime(context, value, { key: 'short', part: true })
 *
 *    // orverride context.datetimeFormats[locale] options with functino options
 *    datetime(cnotext, value, 'short', { currency: 'EUR' })
 *    datetime(cnotext, value, 'short', 'ja-JP', { currency: 'EUR' })
 *    datetime(context, value, { key: 'short', part: true }, { currency: 'EUR'})
 */
/**
 * DateTime options
 *
 * @remarks
 * Options for Datetime formatting API
 *
 * @VueI18nGeneral
 */
export declare interface DateTimeOptions {
    /**
     * @remarks
     * The target format key
     */
    key?: string;
    /**
     * @remarks
     * The locale of localization
     */
    locale?: Locale;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails
     */
    missingWarn?: boolean;
    /**
     * @remarks
     * Whether do resolve on format keys when your language lacks a formatting for a key
     */
    fallbackWarn?: boolean;
    /**
     * @remarks
     * Whether to use [Intel.DateTimeFormat#formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
     */
    part?: boolean;
}

export declare type FormatMatcher = 'basic' | 'best fit';

export declare type FormattedNumberPart = {
    type: FormattedNumberPartType;
    value: string;
};

export declare type FormattedNumberPartType = 'currency' | 'decimal' | 'fraction' | 'group' | 'infinity' | 'integer' | 'literal' | 'minusSign' | 'nan' | 'plusSign' | 'percentSign';

export declare const getAdditionalMeta: () => MetaInfo | null;

export declare function getDevToolsHook(): IntlifyDevToolsEmitter | null;

/* Excluded from this release type: getLocaleChain */

export declare function getWarnMessage(code: CoreWarnCodes, ...args: unknown[]): string;

/* Excluded from this release type: handleMissing */

export declare function initI18nDevTools(i18n: unknown, version: string, meta?: Record<string, unknown>): void;

export declare const isMessageFunction: <T>(val: unknown) => val is MessageFunction<T>;

/* Excluded from this release type: isTranslateFallbackWarn */

/* Excluded from this release type: isTranslateMissingWarn */

export declare type LocaleMatcher = 'lookup' | 'best fit';

/** @VueI18nGeneral */
export declare interface LocaleMessageArray<Message = string> extends Array<LocaleMessageValue<Message>> {
}

/** @VueI18nGeneral */
export declare type LocaleMessageDictionary<Message = string> = {
    [property: string]: LocaleMessageValue<Message>;
};

/** @VueI18nGeneral */
export declare type LocaleMessages<Message = string> = Record<Locale, LocaleMessageDictionary<Message>>;

/** @VueI18nGeneral */
export declare type LocaleMessageValue<Message = string> = string | MessageFunction<Message> | LocaleMessageDictionary<Message> | LocaleMessageArray<Message>;

export declare type MessageCompiler<Message = string> = (source: string, options?: CompileOptions) => MessageFunction<Message>;

export declare interface MetaInfo {
    [field: string]: unknown;
}

export declare const MISSING_RESOLVE_VALUE = "";

export declare const NOT_REOSLVED = -1;

export declare function number<NumberFormats, Message = string>(context: CoreNumberContext<NumberFormats, Message>, value: number): string | number | Intl.NumberFormatPart[];

export declare function number<NumberFormats, Message = string>(context: CoreNumberContext<NumberFormats, Message>, value: number, key: string): string | number | Intl.NumberFormatPart[];

export declare function number<NumberFormats, Message = string>(context: CoreNumberContext<NumberFormats, Message>, value: number, key: string, locale: Locale): string | number | Intl.NumberFormatPart[];

export declare function number<NumberFormats, Message = string>(context: CoreNumberContext<NumberFormats, Message>, value: number, options: NumberOptions): string | number | Intl.NumberFormatPart[];

export declare function number<NumberFormats, Message = string>(context: CoreNumberContext<NumberFormats, Message>, ...args: unknown[]): string | number | Intl.NumberFormatPart[];

export declare type NumberFormat = {
    [key: string]: NumberFormatOptions;
};

export declare type NumberFormatOptions = Intl.NumberFormatOptions | SpecificNumberFormatOptions | CurrencyNumberFormatOptions;

export declare type NumberFormats = {
    [locale: string]: NumberFormat;
};

export declare type NumberFormatToPartsResult = {
    [index: number]: FormattedNumberPart;
};

/**
 *  # number
 *
 *  ## usages
 *    // for example `context.numberFormats` below
 *    'en-US': {
 *      'currency': {
 *        style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
 *      }
 *    },
 *    'ja-JP: { ... }
 *
 *    // value only
 *    number(context, value)
 *
 *    // key argument
 *    number(context, value, 'currency')
 *
 *    // key & locale argument
 *    number(context, value, 'currency', 'ja-JP')
 *
 *    // object sytle argument
 *    number(context, value, { key: 'currency', locale: 'ja-JP' })
 *
 *    // suppress localize miss warning option, override context.missingWarn
 *    number(context, value, { key: 'currency', locale: 'ja-JP', missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    number(context, value, { key: 'currency', locale: 'ja-JP', fallbackWarn: false })
 *
 *    // if you specify `part` options, you can get an array of objects containing the formatted number in parts
 *    number(context, value, { key: 'currenty', part: true })
 *
 *    // orverride context.numberFormats[locale] options with functino options
 *    number(cnotext, value, 'currency', { year: '2-digit' })
 *    number(cnotext, value, 'currency', 'ja-JP', { year: '2-digit' })
 *    number(context, value, { key: 'currenty', part: true }, { year: '2-digit'})
 */
/**
 * Number Options
 *
 * @remarks
 * Options for Number formatting API
 *
 * @VueI18nGeneral
 */
export declare interface NumberOptions {
    /**
     * @remarks
     * The target format key
     */
    key?: string;
    /**
     * @remarks
     * The locale of localization
     */
    locale?: Locale;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails
     */
    missingWarn?: boolean;
    /**
     * @remarks
     * Whether do resolve on format keys when your language lacks a formatting for a key
     */
    fallbackWarn?: boolean;
    /**
     * @remarks
     * Whether to use [Intel.NumberFormat#formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
     */
    part?: boolean;
}

/* Excluded from this release type: parseDateTimeArgs */

/* Excluded from this release type: parseNumberArgs */

/* Excluded from this release type: parseTranslateArgs */

/** @VueI18nGeneral */
export declare type PostTranslationHandler<Message = string> = (translated: MessageType<Message>) => MessageType<Message>;

export declare function registerMessageCompiler<Message>(compiler: MessageCompiler<Message>): void;

export declare const setAdditionalMeta: (meta: MetaInfo | null) => void;

export declare function setDevToolsHook(hook: IntlifyDevToolsEmitter | null): void;

export declare interface SpecificDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
    year?: DateTimeDigital;
    month?: DateTimeDigital | DateTimeHumanReadable;
    day?: DateTimeDigital;
    hour?: DateTimeDigital;
    minute?: DateTimeDigital;
    second?: DateTimeDigital;
    weekday?: DateTimeHumanReadable;
    era?: DateTimeHumanReadable;
    timeZoneName?: 'long' | 'short';
    localeMatcher?: LocaleMatcher;
    formatMatcher?: FormatMatcher;
}

export declare interface SpecificNumberFormatOptions extends Intl.NumberFormatOptions {
    style?: 'decimal' | 'percent';
    currency?: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: LocaleMatcher;
    formatMatcher?: FormatMatcher;
}

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, plural: number): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, plural: number, options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, message: MessageFunction<Message> | string, plural: number, options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, defaultMsg: string): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, defaultMsg: string, options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, list: unknown[]): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, list: unknown[], plural: number): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, list: unknown[], defaultMsg: string): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, list: unknown[], options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, message: MessageFunction<Message> | string, list: unknown[], options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, named: NamedValue): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, named: NamedValue, plural: number): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, named: NamedValue, defaultMsg: string): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, key: Path | number, named: NamedValue, options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, message: MessageFunction<Message> | string, named: NamedValue, options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: CoreTranslationContext<Messages, Message>, ...args: unknown[]): MessageType<Message> | number;

export declare const translateDevTools: (payloads: IntlifyDevToolsHookPayloads[IntlifyDevToolsHooks]) => void | null;

/**
 *  # translate
 *
 *  ## usages:
 *    // for example, locale messages key
 *    { 'foo.bar': 'hi {0} !' or 'hi {name} !' }
 *
 *    // no argument, context & path only
 *    translate(context, 'foo.bar')
 *
 *    // list argument
 *    translate(context, 'foo.bar', ['kazupon'])
 *
 *    // named argument
 *    translate(context, 'foo.bar', { name: 'kazupon' })
 *
 *    // plural choice number
 *    translate(context, 'foo.bar', 2)
 *
 *    // plural choice number with name argument
 *    translate(context, 'foo.bar', { name: 'kazupon' }, 2)
 *
 *    // default message argument
 *    translate(context, 'foo.bar', 'this is default message')
 *
 *    // default message with named argument
 *    translate(context, 'foo.bar', { name: 'kazupon' }, 'Hello {name} !')
 *
 *    // use key as default message
 *    translate(context, 'hi {0} !', ['kazupon'], { default: true })
 *
 *    // locale option, override context.locale
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { locale: 'ja' })
 *
 *    // suppress localize miss warning option, override context.missingWarn
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { fallbackWarn: false })
 *
 *    // escape parameter option, override context.escapeParameter
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { escapeParameter: true })
 */
/**
 * Translate Options
 *
 * @remarks
 * Options for Translation API
 *
 * @VueI18nGeneral
 */
export declare interface TranslateOptions {
    /**
     * @remarks
     * List interpolation
     */
    list?: unknown[];
    /**
     * @remarks
     * Named interpolation
     */
    named?: NamedValue;
    /**
     * @remarks
     * Plulralzation choice number
     */
    plural?: number;
    /**
     * @remarks
     * Default message when is occurred translation missing
     */
    default?: string | boolean;
    /**
     * @remarks
     * The locale of localization
     */
    locale?: Locale;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails
     */
    missingWarn?: boolean;
    /**
     * @remarks
     * Whether do template interpolation on translation keys when your language lacks a translation for a key
     */
    fallbackWarn?: boolean;
    /**
     * @remarks
     * Whether do escape parameter for list or named interpolation values
     */
    escapeParameter?: boolean;
    /**
     * @remarks
     * Whether the message has been resolved
     */
    resolvedMessage?: boolean;
}

/* Excluded from this release type: updateFallbackLocale */

/* Excluded from this release type: VERSION */

export * from "@intlify/message-resolver";
export * from "@intlify/runtime";

export { }
