import type { App } from 'vue';
import type { ComponentInternalInstance } from 'vue';
import type { ComputedRef } from '@vue/reactivity';
import { DateTimeOptions } from '@intlify/core-base';
import { FallbackLocale } from '@intlify/core-base';
import { DateTimeFormat as IntlDateTimeFormat } from '@intlify/core-base';
import { DateTimeFormats as IntlDateTimeFormats } from '@intlify/core-base';
import { FormatMatcher as IntlFormatMatcher } from '@intlify/core-base';
import { LocaleMatcher as IntlLocaleMatcher } from '@intlify/core-base';
import { NumberFormat as IntlNumberFormat } from '@intlify/core-base';
import { NumberFormats as IntlNumberFormats } from '@intlify/core-base';
import { LinkedModifiers } from '@intlify/core-base';
import { Locale } from '@intlify/core-base';
import { LocaleMessageArray } from '@intlify/core-base';
import { LocaleMessageDictionary } from '@intlify/core-base';
import { LocaleMessages } from '@intlify/core-base';
import { LocaleMessageValue } from '@intlify/core-base';
import { MessageFunction } from '@intlify/core-base';
import { MessageFunctions } from '@intlify/core-base';
import { NamedValue } from '@intlify/core-base';
import { NumberOptions } from '@intlify/core-base';
import type { ObjectDirective } from 'vue';
import { Path } from '@intlify/core-base';
import { PathValue } from '@intlify/core-base';
import { PluralizationRule } from '@intlify/core-base';
import type { PluralizationRules } from '@intlify/core-base';
import { PostTranslationHandler } from '@intlify/core-base';
import type { RenderFunction } from 'vue';
import type { SetupContext } from 'vue';
import { TranslateOptions } from '@intlify/core-base';
import type { VNode } from 'vue';
import type { WritableComputedRef } from '@vue/reactivity';

/**
 * BaseFormat Props for Components that is offered Vue I18n
 *
 * @remarks
 * The interface definitions of the underlying props of components such as Translation, DatetimeFormat, and NumberFormat.
 *
 * @VueI18nComponent
 */
export declare interface BaseFormatProps {
    /**
     * @remarks
     * Used to wrap the content that is distribute in the slot. If omitted, the slot content is treated as Fragments.
     *
     * You can specify a string-based tag name, such as `p`, or the object for which the component is defined.
     */
    tag?: string | object;
    /**
     * @remarks
     * Specifies the locale to be used for the component.
     *
     * If specified, the global scope or the locale of the parent scope of the target component will not be overridden and the specified locale will be used.
     */
    locale?: Locale;
    /**
     * @remarks
     * Specifies the scope to be used in the target component.
     *
     * You can specify either `global` or `parent`.
     *
     * If `global` is specified, global scope is used, else then `parent` is specified, the scope of the parent of the target component is used.
     *
     * If the parent is a global scope, the global scope is used, if it's a local scope, the local scope is used.
     */
    scope?: ComponetI18nScope;
    /**
     * @remarks
     * A composer instance with an existing scope.
     *
     * This option takes precedence over the `scope` option.
     */
    i18n?: Composer;
}

export declare type Choice = number;

declare type ComponentInstanceCreatedListener = <Messages>(target: VueI18n<Messages>, global: VueI18n<Messages>) => void;

export declare type ComponetI18nScope = Exclude<I18nScope, 'local'>;

/**
 * Composer interfaces
 *
 * @remarks
 * This is the interface for being used for Vue 3 Composition API.
 *
 * @VueI18nComposition
 */
export declare interface Composer<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Message = VueMessageType> {
    /**
     * @remarks
     * Instance ID.
     */
    id: number;
    /**
     * @remarks
     * The current locale this Composer instance is using.
     *
     * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     */
    locale: WritableComputedRef<Locale>;
    /**
     * @remarks
     * The current fallback locales this Composer instance is using.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    fallbackLocale: WritableComputedRef<FallbackLocale>;
    /**
     * @remarks
     * Whether inherit the root level locale to the component localization locale.
     *
     * @VueI18nSee [Local Scope](../guide/essentials/scope#local-scope-2)
     */
    inheritLocale: boolean;
    /**
     * @remarks
     * The list of available locales in `messages` in lexical order.
     */
    readonly availableLocales: Locale[];
    /**
     * @remarks
     * The locale messages of localization.
     *
     * @VueI18nSee [Getting Started](../guide/)
     */
    readonly messages: ComputedRef<Messages>;
    /**
     * @remarks
     * The datetime formats of localization.
     *
     * @VueI18nSee [Datetime Formatting](../guide/essentials/datetime)
     */
    readonly datetimeFormats: ComputedRef<DateTimeFormats>;
    /**
     * @remarks
     * The number formats of localization.
     *
     * @VueI18nSee [Number Formatting](../guide/essentials/number)
     */
    readonly numberFormats: ComputedRef<NumberFormats>;
    /**
     * @remarks
     * Custom Modifiers for linked messages.
     *
     * @VueI18nSee [Custom Modifiers](../guide/essentials/syntax#custom-modifiers)
     */
    readonly modifiers: LinkedModifiers<Message>;
    /**
     * @remarks
     * A set of rules for word pluralization
     *
     * @VueI18nSee [Custom Pluralization](../guide/essentials/pluralization#custom-pluralization)
     */
    readonly pluralRules: PluralizationRules;
    /**
     * @remarks
     * Whether this composer instance is global or not
     */
    readonly isGlobal: boolean;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    missingWarn: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress fall back warnings when localization fails.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    fallbackWarn: boolean | RegExp;
    /**
     * @remarks
     * Whether to fall back to root level (global scope) localization when localization fails.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    fallbackRoot: boolean;
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    fallbackFormat: boolean;
    /**
     * @remarks
     * Whether to allow the use locale messages of HTML formatting.
     *
     * If you set `false`, will check the locale messages on the Composer instance.
     *
     * If you are specified `true`, a warning will be output at console.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     * @VueI18nSee [Change `warnHtmlInMessage` option default value](../guide/migration/breaking#change-warnhtmlinmessage-option-default-value)
     */
    warnHtmlMessage: boolean;
    /**
     * @remarks
     * Whether interpolation parameters are escaped before the message is translated.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     */
    escapeParameter: boolean;
    /**
     * Locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope locale messages than global scope locale messages.
     *
     * If not, then it’s translated with global scope locale messages.
     *
     * @param key - A target locale message key
     *
     * @returns Translated message
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     */
    t(key: Path | number): string;
    /**
     * Locale message translation for plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, return a pluralized translation message.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../guide/essentials/pluralization)
     */
    t(key: Path | number, plural: number, options?: TranslateOptions): string;
    /**
     * Locale message translation for missing default message
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, if no translation was found, return a default message.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param defaultMsg - A default message to return if no translation was found
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     */
    t(key: Path | number, defaultMsg: string, options?: TranslateOptions): string;
    /**
     * Locale message translation for list interpolations
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, the locale messages should contain a `{0}`, `{1}`, … for each placeholder in the list.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    t(key: Path | number, list: unknown[], options?: TranslateOptions): string;
    /**
     * Locale message translation for list interpolations and plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, the locale messages should contain a `{0}`, `{1}`, … for each placeholder in the list, and return a pluralized translation message.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param plural - Which plural string to get. 1 returns the first one.
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../guide/essentials/pluralization)
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    t(key: Path | number, list: unknown[], plural: number): string;
    /**
     * Locale message translation for list interpolations and missing default message
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, the locale messages should contain a `{0}`, `{1}`, … for each placeholder in the list, and if no translation was found, return a default message.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param defaultMsg - A default message to return if no translation was found
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    t(key: Path | number, list: unknown[], defaultMsg: string): string;
    /**
     * Locale message translation for named interpolations
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, for each placeholder x, the locale messages should contain a `{x}` token.
     *
     * You can also suppress the warning, when the translation missing according to the options.
     *
     * About details of options, see the {@link TranslateOptions}.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    t(key: Path | number, named: NamedValue, options?: TranslateOptions): string;
    /**
     * Locale message translation for named interpolations and plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, for each placeholder x, the locale messages should contain a `{x}` token, and return a pluralized translation message.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param plural - Which plural string to get. 1 returns the first one.
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../guide/essentials/pluralization)
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    t(key: Path | number, named: NamedValue, plural: number): string;
    /**
     * Locale message translation for named interpolations and plurals
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](composition#t-key) details.
     *
     * In this overloaded `t`, for each placeholder x, the locale messages should contain a `{x}` token, and if no translation was found, return a default message.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param defaultMsg - A default message to return if no translation was found
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    t(key: Path | number, named: NamedValue, defaultMsg: string): string;
    /* Excluded from this release type: t */
    /**
     * Resolve locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope locale messages than global scope locale messages.
     *
     * If not, then it’s translated with global scope locale messages.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     *
     * @returns Translated message
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     */
    rt(message: MessageFunction<Message> | Message): string;
    /**
     * Resolve locale message translation for plurals
     *
     * @remarks
     * Overloaded `rt`. About details, see the [rt](composition#rt-message) details.
     *
     * In this overloaded `rt`, return a pluralized translation message.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../guide/essentials/pluralization)
     */
    rt(message: MessageFunction<Message> | Message, plural: number, options?: TranslateOptions): string;
    /**
     * Resolve locale message translation for list interpolations
     *
     * @remarks
     * Overloaded `rt`. About details, see the [rt](composition#rt-message) details.
     *
     * In this overloaded `rt`, return a pluralized translation message.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     * @param list - A values of list interpolation.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    rt(message: MessageFunction<Message> | Message, list: unknown[], options?: TranslateOptions): string;
    /**
     * Resolve locale message translation for named interpolations
     *
     * @remarks
     * Overloaded `rt`. About details, see the [rt](composition#rt-message) details.
     *
     * In this overloaded `rt`, for each placeholder x, the locale messages should contain a `{x}` token.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     * @param named - A values of named interpolation.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    rt(message: MessageFunction<Message> | Message, named: NamedValue, options?: TranslateOptions): string;
    /* Excluded from this release type: rt */
    /**
     * Datetime formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope datetime formats than global scope datetime formats.
     *
     * If not, then it’s formatted with global scope datetime formats.
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     *
     * @returns Formatted value
     *
     * @VueI18nSee [Datetime formatting](../guide/essentials/datetime)
     */
    d(value: number | Date | string): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](composition#d-value) details.
     *
     * In this overloaded `d`, format in datetime format for a key registered in datetime formats.
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     * @param key - A key of datetime formats
     *
     * @returns Formatted value
     */
    d(value: number | Date | string, key: string): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](composition#d-value) details.
     *
     * In this overloaded `d`, format in datetime format for a key registered in datetime formats at target locale
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     * @param key - A key of datetime formats
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Formatted value
     */
    d(value: number | Date | string, key: string, locale: Locale): string;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](composition#d-value) details.
     *
     * You can also suppress the warning, when the formatting missing according to the options.
     *
     * About details of options, see the {@link DateTimeOptions}.
     *
     * @param value - A value, timestamp number or `Date` instance or ISO 8601 string
     * @param options - Additional {@link DateTimeOptions | options} for datetime formatting
     *
     * @returns Formatted value
     */
    d(value: number | Date | string, options: DateTimeOptions): string;
    /* Excluded from this release type: d */
    /**
     * Number Formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope datetime formats than global scope datetime formats.
     *
     * If not, then it’s formatted with global scope number formats.
     *
     * @param value - A number value
     *
     * @returns Formatted value
     *
     * @VueI18nSee [Number formatting](../guide/essentials/number)
     */
    n(value: number): string;
    /**
     * Number Formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](composition#n-value) details.
     *
     * In this overloaded `n`, format in number format for a key registered in number formats.
     *
     * @param value - A number value
     * @param key - A key of number formats
     *
     * @returns Formatted value
     */
    n(value: number, key: string): string;
    /**
     * Number Formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](composition#n-value) details.
     *
     * In this overloaded `n`, format in number format for a key registered in number formats at target locale.
     *
     * @param value - A number value
     * @param key - A key of number formats
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Formatted value
     */
    n(value: number, key: string, locale: Locale): string;
    /**
     *
     * Number Formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](composition#n-value) details.
     *
     * You can also suppress the warning, when the formatting missing according to the options.
     *
     * About details of options, see the {@link NumberOptions}.
     *
     * @param value - A number value
     * @param options - Additional {@link NumberOptions | options} for number formatting
     *
     * @returns Formatted value
     */
    n(value: number, options: NumberOptions): string;
    /* Excluded from this release type: n */
    /**
     * Translation locale message exist
     *
     * @remarks
     * whether do exist locale message on Composer instance [messages](composition#messages).
     *
     * If you specified `locale`, check the locale messages of `locale`.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope
     *
     * @returns If found locale message, `true`, else `false`
     */
    te(key: Path, locale?: Locale): boolean;
    /**
     * Locale messages getter
     *
     * @remarks
     * If [UseI18nScope](general#usei18nscope) `'local'` or Some [UseI18nOptions](composition#usei18noptions) are specified at `useI18n`, it’s translated in preferentially local scope locale messages than global scope locale messages.
     *
     * Based on the current `locale`, locale messages will be returned from Composer instance messages.
     *
     * If you change the `locale`, the locale messages returned will also correspond to the locale.
     *
     * If there are no locale messages for the given `key` in the composer instance messages, they will be returned with [fallbacking](../guide/essentials/fallback).
     *
     * @VueI18nWarning
     * You need to use `rt` for the locale message returned by `tm`. see the [rt](composition#rt-message) details.
     *
     * @example
     * template block:
     * ```html
     * <div class="container">
     *   <template v-for="content in tm('contents')">
     *     <h2>{{ rt(content.title) }}</h2>
     *     <p v-for="paragraph in content.paragraphs">
     *      {{ rt(paragraph) }}
     *     </p>
     *   </template>
     * </div>
     * ```
     * script block:
     * ```js
     * import { defineComponent } from 'vue
     * import { useI18n } from 'vue-i18n'
     *
     * export default defineComponent({
     *   setup() {
     *     const { rt, tm } = useI18n({
     *       messages: {
     *         en: {
     *           contents: [
     *             {
     *               title: 'Title1',
     *               // ...
     *               paragraphs: [
     *                 // ...
     *               ]
     *             }
     *           ]
     *         }
     *       }
     *       // ...
     *     })
     *     // ...
     *     return { ... , rt, tm }
     *   }
     * })
     * ```
     *
     * @param key - A target locale message key
     *
     * @return Locale messages
     */
    tm(key: Path): LocaleMessageValue<Message> | {};
    /**
     * Get locale message
     *
     * @remarks
     * get locale message from Composer instance [messages](composition#messages).
     *
     * @param locale - A target locale
     *
     * @returns Locale messages
     */
    getLocaleMessage(locale: Locale): LocaleMessageDictionary<Message>;
    /**
     * Set locale message
     *
     * @remarks
     * Set locale message to Composer instance [messages](composition#messages).
     *
     * @param locale - A target locale
     * @param message - A message
     */
    setLocaleMessage(locale: Locale, message: LocaleMessageDictionary<Message>): void;
    /**
     * Merge locale message
     *
     * @remarks
     * Merge locale message to Composer instance [messages](composition#messages).
     *
     * @param locale - A target locale
     * @param message - A message
     */
    mergeLocaleMessage(locale: Locale, message: LocaleMessageDictionary<Message>): void;
    /**
     * Get datetime format
     *
     * @remarks
     * get datetime format from Composer instance [datetimeFormats](composition#datetimeformats).
     *
     * @param locale - A target locale
     *
     * @returns Datetime format
     */
    getDateTimeFormat(locale: Locale): IntlDateTimeFormat;
    /**
     * Set datetime format
     *
     * @remarks
     * Set datetime format to Composer instance [datetimeFormats](composition#datetimeformats).
     *
     * @param locale - A target locale
     * @param format - A target datetime format
     */
    setDateTimeFormat(locale: Locale, format: IntlDateTimeFormat): void;
    /**
     * Merge datetime format
     *
     * @remarks
     * Merge datetime format to Composer instance [datetimeFormats](composition#datetimeformats).
     *
     * @param locale - A target locale
     * @param format - A target datetime format
     */
    mergeDateTimeFormat(locale: Locale, format: IntlDateTimeFormat): void;
    /**
     * Get number format
     *
     * @remarks
     * get number format from Composer instance [numberFormats](composition#numberFormats).
     *
     * @param locale - A target locale
     *
     * @returns Number format
     */
    getNumberFormat(locale: Locale): IntlNumberFormat;
    /**
     * Set number format
     *
     * @remarks
     * Set number format to Composer instance [numberFormats](composition#numberFormats).
     *
     * @param locale - A target locale
     * @param format - A target number format
     */
    setNumberFormat(locale: Locale, format: IntlNumberFormat): void;
    /**
     * Merge number format
     *
     * @remarks
     * Merge number format to Composer instance [numberFormats](composition#numberFormats).
     *
     * @param locale - A target locale
     * @param format - A target number format
     */
    mergeNumberFormat(locale: Locale, format: IntlNumberFormat): void;
    /**
     * Get post translation handler
     *
     * @returns {@link PostTranslationHandler}
     *
     * @VueI18nSee [missing](composition#posttranslation)
     */
    getPostTranslationHandler(): PostTranslationHandler<Message> | null;
    /**
     * Set post translation handler
     *
     * @param handler - A {@link PostTranslationHandler}
     *
     * @VueI18nSee [missing](composition#posttranslation)
     */
    setPostTranslationHandler(handler: PostTranslationHandler<Message> | null): void;
    /**
     * Get missing handler
     *
     * @returns {@link MissingHandler}
     *
     * @VueI18nSee [missing](composition#missing)
     */
    getMissingHandler(): MissingHandler | null;
    /**
     * Set missing handler
     *
     * @param handler - A {@link MissingHandler}
     *
     * @VueI18nSee [missing](composition#missing)
     */
    setMissingHandler(handler: MissingHandler | null): void;
}

/**
 * Composer additional options for `useI18n`
 *
 * @remarks
 * `ComposerAdditionalOptions` is extend for {@link ComposerOptions}, so you can specify these options.
 *
 * @VueI18nSee [useI18n](composition#usei18n)
 *
 * @VueI18nComposition
 */
export declare interface ComposerAdditionalOptions {
    useScope?: I18nScope;
}

/**
 * Composer Options
 *
 * @remarks
 * This is options to create composer.
 *
 * @VueI18nComposition
 */
export declare interface ComposerOptions<Message = VueMessageType> {
    /**
     * @remarks
     * The locale of localization.
     *
     * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     *
     * @defaultValue `'en-US'`
     */
    locale?: Locale;
    /**
     * @remarks
     * The locale of fallback localization.
     *
     * For more complex fallback definitions see fallback.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue The default `'en-US'` for the `locale` if it's not specified, or it's `locale` value
     */
    fallbackLocale?: FallbackLocale;
    /**
     * @remarks
     * Whether inheritance the root level locale to the component localization locale.
     *
     * If `false`, regardless of the root level locale, localize for each component locale.
     *
     * @VueI18nSee [Local Scope](../guide/essentials/scope#local-scope-2)
     *
     * @defaultValue `true`
     */
    inheritLocale?: boolean;
    /**
     * @remarks
     * The locale messages of localization.
     *
     * @VueI18nSee [Getting Started](../guide/)
     *
     * @defaultValue `{}`
     */
    messages?: LocaleMessages<Message>;
    /**
     * @remarks
     * Allow use flat json messages or not
     *
     * @defaultValue `false`
     */
    flatJson?: boolean;
    /**
     * @remarks
     * The datetime formats of localization.
     *
     * @VueI18nSee [Datetime Formatting](../guide/essentials/datetime)
     *
     * @defaultValue `{}`
     */
    datetimeFormats?: IntlDateTimeFormats;
    /**
     * @remarks
     * The number formats of localization.
     *
     * @VueI18nSee [Number Formatting](../guide/essentials/number)
     *
     * @defaultValue `{}`
     */
    numberFormats?: IntlNumberFormats;
    /**
     * @remarks
     * Custom Modifiers for linked messages.
     *
     * @VueI18nSee [Custom Modifiers](../guide/essentials/syntax#custom-modifiers)
     */
    modifiers?: LinkedModifiers<Message>;
    /**
     * @remarks
     * A set of rules for word pluralization
     *
     * @VueI18nSee [Custom Pluralization](../guide/essentials/pluralization#custom-pluralization)
     *
     * @defaultValue `{}`
     */
    pluralRules?: PluralizationRules;
    /**
     * @remarks
     * A handler for localization missing.
     *
     * The handler gets called with the localization target locale, localization path key, the Vue instance and values.
     *
     * If missing handler is assigned, and occurred localization missing, it's not warned.
     *
     * @defaultValue `null`
     */
    missing?: MissingHandler;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails.
     *
     * If `false`, suppress localization fail warnings.
     *
     * If you use regular expression, you can suppress localization fail warnings that it match with translation key (e.g. `t`).
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `true`
     */
    missingWarn?: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * If `false`, suppress fall back warnings.
     *
     * If you use regular expression, you can suppress fallback warnings that it match with translation key (e.g. `t`).
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `true`
     */
    fallbackWarn?: boolean | RegExp;
    /**
     * @remarks
     * In the component localization, whether to fallback to root level (global scope) localization when localization fails.
     *
     * If `false`, it's not fallback to root.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `true`
     */
    fallbackRoot?: boolean;
    /**
     * @remarks
     * Whether do template interpolation on translation keys when your language lacks a translation for a key.
     *
     * If `true`, skip writing templates for your "base" language; the keys are your templates.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `false`
     */
    fallbackFormat?: boolean;
    /**
     * @remarks
     * A handler for post processing of translation.
     *
     * The handler gets after being called with the `t`.
     *
     * This handler is useful if you want to filter on translated text such as space trimming.
     *
     * @defaultValue `null`
     */
    postTranslation?: PostTranslationHandler<Message>;
    /**
     * @remarks
     * Whether to allow the use locale messages of HTML formatting.
     *
     * See the warnHtmlMessage property.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     * @VueI18nSee [Change `warnHtmlInMessage` option default value](../guide/migration/breaking#change-warnhtmlinmessage-option-default-value)
     *
     * @defaultValue `'off'`
     */
    warnHtmlMessage?: boolean;
    /**
     * @remarks
     * If `escapeParameter` is configured as true then interpolation parameters are escaped before the message is translated.
     *
     * This is useful when translation output is used in `v-html` and the translation resource contains html markup (e.g. <b> around a user provided value).
     *
     * This usage pattern mostly occurs when passing precomputed text strings into UI components.
     *
     * The escape process involves replacing the following symbols with their respective HTML character entities: `<`, `>`, `"`, `'`.
     *
     * Setting `escapeParameter` as true should not break existing functionality but provides a safeguard against a subtle type of XSS attack vectors.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     *
     * @defaultValue `false`
     */
    escapeParameter?: boolean;
}

/**
 * Vue I18n factory
 *
 * @param options - An options, see the {@link I18nOptions}
 *
 * @returns {@link I18n} instance
 *
 * @remarks
 * If you use Legacy API mode, you need toto specify {@link VueI18nOptions} and `legacy: true` option.
 *
 * If you use composition API mode, you need to specify {@link ComposerOptions}.
 *
 * @VueI18nSee [Getting Started](../guide/)
 * @VueI18nSee [Composition API](../guide/advanced/composition)
 *
 * @example
 * case: for Legacy API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   // ...
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @example
 * case: for composition API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n, useI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   legacy: false, // you must specify 'legacy: false' option
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   setup() {
 *     // ...
 *     const { t } = useI18n({ ... })
 *     return { ... , t }
 *   }
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @VueI18nGeneral
 */
export declare function createI18n<Options extends I18nOptions = {}, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>> = Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], IntlDateTimeFormat> = Record<keyof Options['datetimeFormats'], IntlDateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], IntlNumberFormat> = Record<keyof Options['numberFormats'], IntlNumberFormat>>(options?: Options): I18n<Options['messages'], Options['datetimeFormats'], Options['numberFormats'], Options['legacy'] extends boolean ? Options['legacy'] : true>;

export declare interface CustomBlock<Message = VueMessageType> {
    locale: Locale;
    resource: LocaleMessages<Message> | LocaleMessageDictionary<Message>;
}

export declare type CustomBlocks<Message = VueMessageType> = Array<CustomBlock<Message>>;

/**
 * Datetime Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../guide/essentials/datetime#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.DateTimeFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
 *
 * @VueI18nComponent
 */
export declare const DatetimeFormat: {
    name: string;
    props: {
        value: {
            type: (NumberConstructor | DateConstructor)[];
            required: boolean;
        };
        format: {
            type: (ObjectConstructor | StringConstructor)[];
        };
    } & {
        tag: {
            type: (ObjectConstructor | StringConstructor)[];
        };
        locale: {
            type: StringConstructor;
        };
        scope: {
            type: StringConstructor;
            validator: (val: "parent" | "global") => boolean;
            default: "parent" | "global";
        };
        i18n: {
            type: ObjectConstructor;
        };
    };
    setup(props: DatetimeFormatProps, context: SetupContext): RenderFunction;
};

/**
 * DatetimeFormat Component Props
 *
 * @VueI18nComponent
 */
export declare type DatetimeFormatProps = FormattableProps<number | Date, Intl.DateTimeFormatOptions>;

/** @VueI18nLegacy */
export declare type DateTimeFormatResult = string;
export { DateTimeOptions }

/**
 * Exported global composer instance
 *
 * @remarks
 * This interface is the [global composer](general#global) that is provided interface that is injected into each component with `app.config.globalProperties`.
 *
 * @VueI18nGeneral
 */
export declare interface ExportedGlobalComposer {
    /**
     * Locale
     *
     * @remarks
     * This property is proxy-like property for `Composer#locale`. About details, see the [Composer#locale](composition#locale)
     */
    locale: Locale;
    /**
     * Fallback locale
     *
     * @remarks
     * This property is proxy-like property for `Composer#fallbackLocale`. About details, see the [Composer#fallbackLocale](composition#fallbacklocale)
     */
    fallbackLocale: FallbackLocale;
    /**
     * Available locales
     *
     * @remarks
     * This property is proxy-like property for `Composer#availableLocales`. About details, see the [Composer#availableLocales](composition#availablelocales)
     */
    readonly availableLocales: Locale[];
}
export { FallbackLocale }

/**
 * Formattable Props
 *
 * @remarks
 * The props used in DatetimeFormat, or NumberFormat component
 *
 * @VueI18nComponent
 */
export declare interface FormattableProps<Value, Format> extends BaseFormatProps {
    /**
     * @remarks
     * The value specified for the target component
     */
    value: Value;
    /**
     * @remarks
     * The format to use in the target component.
     *
     * Specify the format key string or the format as defined by the Intl API in ECMA 402.
     */
    format?: string | Format;
}

export declare interface Formatter {
    interpolate(message: string, values: any, path: string): Array<any> | null;
}

/**
 * I18n instance
 *
 * @remarks
 * The instance required for installation as the Vue plugin
 *
 * @VueI18nGeneral
 */
export declare interface I18n<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Legacy extends boolean = true> {
    /**
     * Vue I18n API mode
     *
     * @remarks
     * If you specified `legacy: true` option in `createI18n`, return `legacy`, else `composition`
     *
     * @defaultValue `'composition'`
     */
    readonly mode: I18nMode;
    /**
     * The property accessible to the global Composer instance or VueI18n instance
     *
     * @remarks
     * If the [I18n#mode](general#mode) is `'legacy'`, then you can access to a global {@link VueI18n} instance, else then [I18n#mode](general#mode) is `'composition' `, you can access to the global {@link Composer} instance.
     *
     * An instance of this property is **global scope***.
     */
    readonly global: Legacy extends true ? VueI18n<Messages, DateTimeFormats, NumberFormats> : Composer<Messages, DateTimeFormats, NumberFormats>;
    /**
     * Install entry point
     *
     * @param app - A target Vue app instance
     * @param options - An install options
     */
    install(app: App, ...options: unknown[]): void;
}

/**
 * I18n Additional Options
 *
 * @remarks
 * Specific options for {@link createI18n}
 *
 * @VueI18nGeneral
 */
export declare interface I18nAdditionalOptions {
    /**
     * Whether vue-i18n Legacy API mode use on your Vue App
     *
     * @remarks
     * The default is to use the Legacy API mode. If you want to use the Composition API mode, you need to set it to `false`.
     *
     * @VueI18nSee [Composition API](../guide/advanced/composition)
     *
     * @defaultValue `true`
     */
    legacy?: boolean;
    /**
     * Whether Whether to inject global properties & functions into for each component.
     *
     * @remarks
     * If set to `true`, then properties and methods prefixed with `$` are injected into Vue Component.
     *
     * @VueI18nSee [Implicit with injected properties and functions](../guide/advanced/composition#implicit-with-injected-properties-and-functions)
     * @VueI18nSee [ComponentCustomProperties](injection#componentcustomproperties)
     *
     * @defaultValue `false`
     */
    globalInjection?: boolean;
}

/**
 * Vue I18n API mode
 *
 * @VueI18nSee [I18n#mode](general#mode)
 *
 * @VueI18nGeneral
 */
export declare type I18nMode = 'legacy' | 'composition';

/**
 * I18n Options for `createI18n`
 *
 * @remarks
 * `I18nOptions` is inherited {@link I18nAdditionalOptions}, {@link ComposerOptions} and {@link VueI18nOptions},
 * so you can specify these options.
 *
 * @VueI18nGeneral
 */
export declare type I18nOptions = I18nAdditionalOptions & (ComposerOptions | VueI18nOptions);

/**
 * Vue I18n plugin options
 *
 * @remarks
 * An options specified when installing Vue I18n as Vue plugin with using `app.use`.
 *
 * @VueI18nGeneral
 */
export declare interface I18nPluginOptions {
    /**
     * Whether to use the tag name `i18n` for Translation Component
     *
     * @remarks
     * This option is used for compatibility with Vue I18n v8.x.
     *
     * If you can't migrate right away, you can temporarily enable this option, and you can work Translation Component.
     *
     * @defaultValue `false`
     */
    useI18nComponentName?: boolean;
    /**
     * Whether to globally install the components that is offered by Vue I18n
     *
     * @remarks
     * If this option is enabled, the components will be installed globally at `app.use` time.
     *
     * If you want to install manually in the `import` syntax, you can set it to `false` to install when needed.
     *
     * @defaultValue `true`
     */
    globalInstall?: boolean;
}

/**
 * I18n Scope
 *
 * @VueI18nSee [ComposerAdditionalOptions#useScope](composition#usescope)
 * @VueI18nSee [useI18n](composition#usei18n)
 *
 * @VueI18nGeneral
 */
export declare type I18nScope = 'local' | 'parent' | 'global';
export { IntlDateTimeFormat }
export { IntlDateTimeFormats }
export { IntlFormatMatcher }
export { IntlLocaleMatcher }
export { IntlNumberFormat }
export { IntlNumberFormats }
export { LinkedModifiers }
export { Locale }
export { LocaleMessageArray }
export { LocaleMessageDictionary }

/** @VueI18nLegacy */
export declare type LocaleMessageObject<Message = string> = LocaleMessageDictionary<Message>;
export { LocaleMessages }
export { LocaleMessageValue }
export { MessageFunction }
export { MessageFunctions }

/** @VueI18nComposition */
export declare type MissingHandler = (locale: Locale, key: Path, insttance?: ComponentInternalInstance, type?: string) => string | void;
export { NamedValue }

/**
 * Number Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../guide/essentials/number#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.NumberFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
 *
 * @VueI18nComponent
 */
export declare const NumberFormat: {
    name: string;
    props: {
        value: {
            type: NumberConstructor;
            required: boolean;
        };
        format: {
            type: (ObjectConstructor | StringConstructor)[];
        };
    } & {
        tag: {
            type: (ObjectConstructor | StringConstructor)[];
        };
        locale: {
            type: StringConstructor;
        };
        scope: {
            type: StringConstructor;
            validator: (val: "parent" | "global") => boolean;
            default: "parent" | "global";
        };
        i18n: {
            type: ObjectConstructor;
        };
    };
    setup(props: NumberFormatProps, context: SetupContext): RenderFunction;
};

/**
 * NumberFormat Component Props
 *
 * @VueI18nComponent
 */
export declare type NumberFormatProps = FormattableProps<number, Intl.NumberFormatOptions>;

/** @VueI18nLegacy */
export declare type NumberFormatResult = string;
export { NumberOptions }
export { Path }
export { PathValue }
export { PluralizationRule }

export declare type PluralizationRulesMap = {
    [locale: string]: PluralizationRule;
};
export { PostTranslationHandler }
export { TranslateOptions }

/** @VueI18nLegacy */
export declare type TranslateResult = string;

/**
 * Translation Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [TranslationProps](component#translationprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Component Interpolation](../guide/advanced/component)
 *
 * @example
 * ```html
 * <div id="app">
 *   <!-- ... -->
 *   <i18n path="term" tag="label" for="tos">
 *     <a :href="url" target="_blank">{{ $t('tos') }}</a>
 *   </i18n>
 *   <!-- ... -->
 * </div>
 * ```
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * const messages = {
 *   en: {
 *     tos: 'Term of Service',
 *     term: 'I accept xxx {0}.'
 *   },
 *   ja: {
 *     tos: '利用規約',
 *     term: '私は xxx の{0}に同意します。'
 *   }
 * }
 *
 * const i18n = createI18n({
 *   locale: 'en',
 *   messages
 * })
 *
 * const app = createApp({
 *   data: {
 *     url: '/term'
 *   }
 * }).use(i18n).mount('#app')
 * ```
 *
 * @VueI18nComponent
 */
export declare const Translation: {
    name: string;
    props: {
        keypath: {
            type: StringConstructor;
            required: boolean;
        };
        plural: {
            type: (StringConstructor | NumberConstructor)[];
            validator: (val: any) => boolean;
        };
    } & {
        tag: {
            type: (ObjectConstructor | StringConstructor)[];
        };
        locale: {
            type: StringConstructor;
        };
        scope: {
            type: StringConstructor;
            validator: (val: "parent" | "global") => boolean;
            default: "parent" | "global";
        };
        i18n: {
            type: ObjectConstructor;
        };
    };
    setup(props: TranslationProps, context: SetupContext): RenderFunction;
};

/**
 * Translation Directive (`v-t`)
 *
 * @remarks
 * Update the element `textContent` that localized with locale messages.
 *
 * You can use string syntax or object syntax.
 *
 * String syntax can be specified as a keypath of locale messages.
 *
 * If you can be used object syntax, you need to specify as the object key the following params
 *
 * ```
 * - path: required, key of locale messages
 * - locale: optional, locale
 * - args: optional, for list or named formatting
 * ```
 *
 * @example
 * ```html
 * <!-- string syntax: literal -->
 * <p v-t="'foo.bar'"></p>
 *
 * <!-- string syntax: binding via data or computed props -->
 * <p v-t="msg"></p>
 *
 * <!-- object syntax: literal -->
 * <p v-t="{ path: 'hi', locale: 'ja', args: { name: 'kazupon' } }"></p>
 *
 * <!-- object syntax: binding via data or computed props -->
 * <p v-t="{ path: greeting, args: { name: fullName } }"></p>
 * ```
 *
 * @VueI18nDirective
 */
export declare type TranslationDirective<T = HTMLElement> = ObjectDirective<T>;

/**
 * Translation Component Props
 *
 * @VueI18nComponent
 */
export declare interface TranslationProps extends BaseFormatProps {
    /**
     * @remarks
     * The locale message key can be specified prop
     */
    keypath: string;
    /**
     * @remarks
     * The Plural Choosing the message number prop
     */
    plural?: number | string;
}

/**
 * Use Composition API for Vue I18n
 *
 * @param options - An options, see {@link UseI18nOptions}
 *
 * @returns {@link Composer} instance
 *
 * @remarks
 * This function is mainly used by `setup`.
 *
 * If options are specified, Composer instance is created for each component and you can be localized on the component.
 *
 * If options are not specified, you can be localized using the global Composer.
 *
 * @example
 * case: Component resource base localization
 * ```html
 * <template>
 *   <form>
 *     <label>{{ t('language') }}</label>
 *     <select v-model="locale">
 *       <option value="en">en</option>
 *       <option value="ja">ja</option>
 *     </select>
 *   </form>
 *   <p>message: {{ t('hello') }}</p>
 * </template>
 *
 * <script>
 * import { useI18n } from 'vue-i18n'
 *
 * export default {
 *  setup() {
 *    const { t, locale } = useI18n({
 *      locale: 'ja',
 *      messages: {
 *        en: { ... },
 *        ja: { ... }
 *      }
 *    })
 *    // Something to do ...
 *
 *    return { ..., t, locale }
 *  }
 * }
 * </script>
 * ```
 *
 * @VueI18nComposition
 */
export declare function useI18n<Options extends UseI18nOptions = object, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>> = Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], IntlDateTimeFormat> = Record<keyof Options['datetimeFormats'], IntlDateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], IntlNumberFormat> = Record<keyof Options['numberFormats'], IntlNumberFormat>>(options?: Options): Composer<Options['messages'], Options['datetimeFormats'], Options['numberFormats']>;

/**
 * I18n Options for `useI18n`
 *
 * @remarks
 * `UseI18nOptions` is inherited {@link ComposerAdditionalOptions} and {@link ComposerOptions}, so you can specify these options.
 *
 * @VueI18nSee [useI18n](composition#usei18n)
 *
 * @VueI18nComposition
 */
export declare type UseI18nOptions = ComposerAdditionalOptions & ComposerOptions;

/**
 * Vue I18n Version
 *
 * @remarks
 * Semver format. Same format as the package.json `version` field.
 *
 * @VueI18nGeneral
 */
export declare const VERSION: string;

export declare function vTDirective<Messages, DateTimeFormats, NumberFormats, Legacy extends boolean>(i18n: I18n<Messages, DateTimeFormats, NumberFormats, Legacy>): TranslationDirective<HTMLElement>;

/**
 *  VueI18n legacy interfaces
 *
 *  @remarks
 *  This interface is compatible with interface of `VueI18n` class (offered with Vue I18n v8.x).
 *
 *  @VueI18nLegacy
 */
export declare interface VueI18n<Messages = {}, DateTimeFormats = {}, NumberFormats = {}> {
    /**
     * @remarks
     * Instance ID.
     */
    id: number;
    /**
     * @remarks
     * The current locale this VueI18n instance is using.
     *
     * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     */
    locale: Locale;
    /**
     * @remarks
     * The current fallback locales this VueI18n instance is using.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    fallbackLocale: FallbackLocale;
    /**
     * @remarks
     * The list of available locales in `messages` in lexical order.
     */
    readonly availableLocales: Locale[];
    /**
     * @remarks
     * The locale messages of localization.
     *
     * @VueI18nSee [Getting Started](../guide/)
     */
    readonly messages: Messages;
    /**
     * @remarks
     * The datetime formats of localization.
     *
     * @VueI18nSee [Datetime Formatting](../guide/essentials/datetime)
     */
    readonly datetimeFormats: DateTimeFormats;
    /**
     * @remarks
     * The number formats of localization.
     *
     * @VueI18nSee [Number Formatting](../guide/essentials/number)
     */
    readonly numberFormats: NumberFormats;
    /**
     * @remarks
     * Custom Modifiers for linked messages.
     *
     * @VueI18nSee [Custom Modifiers](../guide/essentials/syntax#custom-modifiers)
     */
    readonly modifiers: LinkedModifiers<VueMessageType>;
    /**
     * @remarks
     * The formatter that implemented with Formatter interface.
     *
     * @deprecated See the [here](../guide/migration/breaking#remove-custom-formatter)
     */
    formatter: Formatter;
    /**
     * @remarks
     * A handler for localization missing.
     */
    missing: MissingHandler | null;
    /**
     * @remarks
     * A handler for post processing of translation.
     */
    postTranslation: PostTranslationHandler<VueMessageType> | null;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    silentTranslationWarn: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress fallback warnings when localization fails.
     */
    silentFallbackWarn: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     */
    formatFallbackMessages: boolean;
    /**
     * @remarks
     * Whether synchronize the root level locale to the component localization locale.
     *
     * @VueI18nSee [Local Scope](../guide/essentials/scope#local-scope-2)
     */
    sync: boolean;
    /**
     * @remarks
     * Whether to allow the use locale messages of HTML formatting.
     *
     * If you set `warn` or` error`, will check the locale messages on the VueI18n instance.
     *
     * If you are specified `warn`, a warning will be output at console.
     *
     * If you are specified `error` will occurred an Error.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     * @VueI18nSee [Change `warnHtmlInMessage` option default value](../guide/migration/breaking#change-warnhtmlinmessage-option-default-value)
     */
    warnHtmlInMessage: WarnHtmlInMessageLevel;
    /**
     * @remarks
     * Whether interpolation parameters are escaped before the message is translated.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     */
    escapeParameterHtml: boolean;
    /**
     * @remarks
     * Whether `v-t` directive's element should preserve `textContent` after directive is unbinded.
     *
     * @VueI18nSee [Custom Directive](../guide/advanced/directive)
     * @VueI18nSee [Remove preserveDirectiveContent option](../guide/migration/breaking#remove-preservedirectivecontent-option)
     *
     * @deprecated The `v-t` directive for Vue 3 now preserves the default content. Therefore, this option and its properties have been removed from the VueI18n instance.
     */
    preserveDirectiveContent: boolean;
    /**
     * A set of rules for word pluralization
     *
     * @VueI18nSee [Custom Pluralization](../guide/essentials/pluralization#custom-pluralization)
     */
    pluralizationRules: PluralizationRules;
    /**
     * Locale message translation.
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [i18n component options](injection#i18n) is specified, it’s translated in preferentially local scope locale messages than global scope locale messages.
     *
     * If [i18n component options](injection#i18n) isn't specified, it’s translated with global scope locale messages.
     *
     * @param key - A target locale message key
     *
     * @returns Translated message
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     */
    t(key: Path): TranslateResult;
    /**
     * Locale message translation.
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](legacy#t-key) details.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Translated message
     */
    t(key: Path, locale: Locale): TranslateResult;
    /**
     * Locale message translation.
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](legacy#t-key) details.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope.
     * @param list - A values of list interpolation
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    t(key: Path, locale: Locale, list: unknown[]): TranslateResult;
    /**
     * Locale message translation.
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](legacy#t-key) details.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope.
     * @param named - A values of named interpolation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    t(key: Path, locale: Locale, named: object): TranslateResult;
    /**
     * Locale message translation.
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](legacy#t-key) details.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    t(key: Path, list: unknown[]): TranslateResult;
    /**
     * Locale message translation.
     *
     * @remarks
     * Overloaded `t`. About details, see the [t](legacy#t-key) details.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    t(key: Path, named: Record<string, unknown>): TranslateResult;
    /* Excluded from this release type: t */
    /**
     * Resolve locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     *
     * @returns Translated message
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     */
    rt(message: MessageFunction<VueMessageType> | VueMessageType): string;
    /**
     * Resolve locale message translation for plurals
     *
     * @remarks
     * Overloaded `rt`. About details, see the [rt](legacy#rt-message) details.
     *
     * In this overloaded `rt`, return a pluralized translation message.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Pluralization](../guide/essentials/pluralization)
     */
    rt(message: MessageFunction<VueMessageType> | VueMessageType, plural: number, options?: TranslateOptions): string;
    /**
     * Resolve locale message translation for list interpolations
     *
     * @remarks
     * Overloaded `rt`. About details, see the [rt](legacy#rt-message) details.
     *
     * In this overloaded `rt`, return a pluralized translation message.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     * @param list - A values of list interpolation.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [List interpolation](../guide/essentials/syntax#list-interpolation)
     */
    rt(message: MessageFunction<VueMessageType> | VueMessageType, list: unknown[], options?: TranslateOptions): string;
    /**
     * Resolve locale message translation for named interpolations
     *
     * @remarks
     * Overloaded `rt`. About details, see the [rt](legacy#rt-message) details.
     *
     * In this overloaded `rt`, for each placeholder x, the locale messages should contain a `{x}` token.
     *
     * @VueI18nTip
     * The use-case for `rt` is for programmatic locale messages translation with using `tm`, `v-for`, javascript `for` statement.
     *
     * @VueI18nWarning
     * `rt` differs from `t` in that it processes the locale message directly, not the key of the locale message. There is no internal fallback with `rt`. You need to understand and use the structure of the locale messge returned by `tm`.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `tm`.
     * @param named - A values of named interpolation.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     *
     * @VueI18nSee [Named interpolation](../guide/essentials/syntax#named-interpolation)
     */
    rt(message: MessageFunction<VueMessageType> | VueMessageType, named: NamedValue, options?: TranslateOptions): string;
    /* Excluded from this release type: rt */
    /**
     * Locale message pluralization
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [i18n component options](injection#i18n) is specified, it’s pluraled in preferentially local scope locale messages than global scope locale messages.
     *
     * If [i18n component options](injection#i18n) isn't specified, it’s pluraled with global scope locale messages.
     *
     * The plural choice number is handled with default `1`.
     *
     * @param key - A target locale message key
     *
     * @returns Pluraled message
     *
     * @VueI18nSee [Pluralization](../guide/essentials/pluralization)
     */
    tc(key: Path): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Pluraled message
     */
    tc(key: Path, locale: Locale): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns Pluraled message
     */
    tc(key: Path, list: unknown[]): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns Pluraled message
     */
    tc(key: Path, named: Record<string, unknown>): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     *
     * @returns Pluraled message
     */
    tc(key: Path, choice: number): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Pluraled message
     */
    tc(key: Path, choice: number, locale: Locale): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param list - A values of list interpolation
     *
     * @returns Pluraled message
     */
    tc(key: Path, choice: number, list: unknown[]): TranslateResult;
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `tc`. About details, see the [tc](legacy#tc-key) details.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param named - A values of named interpolation
     *
     * @returns Pluraled message
     */
    tc(key: Path, choice: number, named: Record<string, unknown>): TranslateResult;
    /* Excluded from this release type: tc */
    /**
     * Translation locale message exist
     *
     * @remarks
     * whether do exist locale message on VueI18n instance [messages](legacy#messages).
     *
     * If you specified `locale`, check the locale messages of `locale`.
     *
     * @param key - A target locale message key
     * @param locale - A target locale
     *
     * @returns If found locale message, `true`, else `false`
     */
    te(key: Path, locale?: Locale): boolean;
    /**
     * Locale messages getter
     *
     * @remarks
     * If [i18n component options](injection#i18n) is specified, it’s get in preferentially local scope locale messages than global scope locale messages.
     *
     * If [i18n component options](injection#i18n) isn't specified, it’s get with global scope locale messages.
     *
     * Based on the current `locale`, locale messages will be returned from Composer instance messages.
     *
     * If you change the `locale`, the locale messages returned will also correspond to the locale.
     *
     * If there are no locale messages for the given `key` in the composer instance messages, they will be returned with [fallbacking](../guide/essentials/fallback).
     *
     * @VueI18nWarning
     * You need to use `rt` for the locale message returned by `tm`. see the [rt](legacy#rt-message) details.
     *
     * @example
     * template:
     * ```html
     * <div class="container">
     *   <template v-for="content in $tm('contents')">
     *     <h2>{{ $rt(content.title) }}</h2>
     *     <p v-for="paragraph in content.paragraphs">
     *      {{ $rt(paragraph) }}
     *     </p>
     *   </template>
     * </div>
     * ```
     *
     * ```js
     * import { createI18n } from 'vue-i18n'
     *
     * const i18n = createI18n({
     *   messages: {
     *     en: {
     *       contents: [
     *         {
     *           title: 'Title1',
     *           // ...
     *           paragraphs: [
     *             // ...
     *           ]
     *         }
     *       ]
     *     }
     *   }
     *   // ...
     * })
     * ```
     * @param key - A target locale message key
     *
     * @return Locale messages
     */
    tm(key: Path): LocaleMessageValue<VueMessageType> | {};
    /**
     * Get locale message
     *
     * @remarks
     * get locale message from VueI18n instance [messages](legacy#messages).
     *
     * @param locale - A target locale
     *
     * @returns Locale messages
     */
    getLocaleMessage(locale: Locale): LocaleMessageDictionary<VueMessageType>;
    /**
     * Set locale message
     *
     * @remarks
     * Set locale message to VueI18n instance [messages](legacy#messages).
     *
     * @param locale - A target locale
     * @param message - A message
     */
    setLocaleMessage(locale: Locale, message: LocaleMessageDictionary<VueMessageType>): void;
    /**
     * Merge locale message
     *
     * @remarks
     * Merge locale message to VueI18n instance [messages](legacy#messages).
     *
     * @param locale - A target locale
     * @param message - A message
     */
    mergeLocaleMessage(locale: Locale, message: LocaleMessageDictionary<VueMessageType>): void;
    /**
     * Datetime formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [i18n component options](injection#i18n) is specified, it’s formatted in preferentially local scope datetime formats than global scope locale messages.
     *
     * If [i18n component options](injection#i18n) isn't specified, it’s formatted with global scope datetime formats.
     *
     * @param value - A value, timestamp number or `Date` instance
     *
     * @returns Formatted value
     *
     * @VueI18nSee [Datetime formatting](../guide/essentials/datetime)
     */
    d(value: number | Date): DateTimeFormatResult;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](legacy#d-value) details.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     *
     * @returns Formatted value
     */
    d(value: number | Date, key: string): DateTimeFormatResult;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](legacy#d-value) details.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Formatted value
     */
    d(value: number | Date, key: string, locale: Locale): DateTimeFormatResult;
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `d`. About details, see the [d](legacy#d-value) details.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param args - An argument values
     *
     * @returns Formatted value
     */
    d(value: number | Date, args: {
        [key: string]: string;
    }): DateTimeFormatResult;
    /* Excluded from this release type: d */
    /**
     * Get datetime format
     *
     * @remarks
     * get datetime format from VueI18n instance [datetimeFormats](legacy#datetimeformats).
     *
     * @param locale - A target locale
     *
     * @returns Datetime format
     */
    getDateTimeFormat(locale: Locale): IntlDateTimeFormat;
    /**
     * Set datetime format
     *
     * @remarks
     * Set datetime format to VueI18n instance [datetimeFormats](legacy#datetimeformats).
     *
     * @param locale - A target locale
     * @param format - A target datetime format
     */
    setDateTimeFormat(locale: Locale, format: IntlDateTimeFormat): void;
    /**
     * Merge datetime format
     *
     * @remarks
     * Merge datetime format to VueI18n instance [datetimeFormats](legacy#datetimeformats).
     *
     * @param locale - A target locale
     * @param format - A target datetime format
     */
    mergeDateTimeFormat(locale: Locale, format: IntlDateTimeFormat): void;
    /**
     * Number formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * If [i18n component options](injection#i18n) is specified, it’s formatted in preferentially local scope number formats than global scope locale messages.
     *
     * If [i18n component options](injection#i18n) isn't specified, it’s formatted with global scope number formats.
     *
     * @param value - A number value
     *
     * @returns Formatted value
     *
     * @VueI18nSee [Number formatting](../guide/essentials/number)
     */
    n(value: number): NumberFormatResult;
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](legacy#n-value) details.
     *
     * @param value - A number value
       @param key - A key of number formats
     *
     * @returns Formatted value
     */
    n(value: number, key: string): NumberFormatResult;
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](legacy#n-value) details.
     *
     * @param value - A number value
     * @param key - A key of number formats
     * @param locale - A locale, it will be used over than global scope or local scope.
     *
     * @returns Formatted value
     */
    n(value: number, key: string, locale: Locale): NumberFormatResult;
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `n`. About details, see the [n](legacy#n-value) details.
     *
     * @param value - A number value
     * @param args - An argument values
     *
     * @returns Formatted value
     */
    n(value: number, args: {
        [key: string]: string;
    }): NumberFormatResult;
    /* Excluded from this release type: n */
    /**
     * Get number format
     *
     * @remarks
     * get number format from VueI18n instance [numberFormats](legacy#numberFormats).
     *
     * @param locale - A target locale
     *
     * @returns Number format
     */
    getNumberFormat(locale: Locale): IntlNumberFormat;
    /**
     * Set number format
     *
     * @remarks
     * Set number format to VueI18n instance [numberFormats](legacy#numberFormats).
     *
     * @param locale - A target locale
     * @param format - A target number format
     */
    setNumberFormat(locale: Locale, format: IntlNumberFormat): void;
    /**
     * Merge number format
     *
     * @remarks
     * Merge number format to VueI18n instance [numberFormats](legacy#numberFormats).
     *
     * @param locale - A target locale
     * @param format - A target number format
     */
    mergeNumberFormat(locale: Locale, format: IntlNumberFormat): void;
    /**
     * Get choice index
     *
     * @remarks
     * Get pluralization index for current pluralizing number and a given amount of choices.
     *
     * @deprecated Use `pluralizationRules` option instead of `getChoiceIndex`.
     */
    getChoiceIndex: (choice: Choice, choicesLength: number) => number;
}

/**
 *  VueI18n Options
 *
 *  @remarks
 *  This option is compatible with `VueI18n` class constructor options (offered with Vue I18n v8.x)
 *
 *  @VueI18nLegacy
 */
export declare interface VueI18nOptions {
    /**
     * @remarks
     * The locale of localization.
     *
     * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
     *
     * @VueI18nSee [Scope and Locale Changing](../guide/essentials/scope)
     *
     * @defaultValue `'en-US'`
     */
    locale?: Locale;
    /**
     * @remarks
     * The locale of fallback localization.
     *
     * For more complex fallback definitions see fallback.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue The default `'en-US'` for the `locale` if it's not specified, or it's `locale` value
     */
    fallbackLocale?: FallbackLocale;
    /**
     * @remarks
     * The locale messages of localization.
     *
     * @VueI18nSee [Getting Started](../guide/)
     *
     * @defaultValue `{}`
     */
    messages?: LocaleMessages<VueMessageType>;
    /**
     * @remarks
     * Allow use flat json messages or not
     *
     * @defaultValue `false`
     */
    flatJson?: boolean;
    /**
     * @remarks
     * The datetime formats of localization.
     *
     * @VueI18nSee [Datetime Formatting](../guide/essentials/datetime)
     *
     * @defaultValue `{}`
     */
    datetimeFormats?: IntlDateTimeFormats;
    /**
     * @remarks
     * The number formats of localization.
     *
     * @VueI18nSee [Number Formatting](../guide/essentials/number)
     *
     * @defaultValue `{}`
     */
    numberFormats?: IntlNumberFormats;
    /**
     * @remarks
     * The list of available locales in messages in lexical order.
     *
     * @defaultValue `[]`
     */
    availableLocales?: Locale[];
    /**
     * @remarks
     * Custom Modifiers for linked messages.
     *
     * @VueI18nSee [Custom Modifiers](../guide/essentials/syntax#custom-modifiers)
     */
    modifiers?: LinkedModifiers<VueMessageType>;
    /**
     * @remarks
     * The formatter that implemented with Formatter interface.
     *
     * @deprecated See the [here](../guide/migration/breaking#remove-custom-formatter)
     */
    formatter?: Formatter;
    /**
     * @remarks
     * A handler for localization missing.
     *
     * The handler gets called with the localization target locale, localization path key, the Vue instance and values.
     *
     * If missing handler is assigned, and occurred localization missing, it's not warned.
     *
     * @defaultValue `null`
     */
    missing?: MissingHandler;
    /**
     * @remarks
     * In the component localization, whether to fall back to root level (global scope) localization when localization fails.
     *
     * If `false`, it's not fallback to root.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `true`
     */
    fallbackRoot?: boolean;
    /**
     * @remarks
     * Whether suppress warnings outputted when localization fails.
     *
     * If `true`, suppress localization fail warnings.
     *
     * If you use regular expression, you can suppress localization fail warnings that it match with translation key (e.g. `t`).
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `false`
     */
    silentTranslationWarn?: boolean | RegExp;
    /**
     * @remarks
     * Whether do template interpolation on translation keys when your language lacks a translation for a key.
     *
     * If `true`, skip writing templates for your "base" language; the keys are your templates.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `false`
     */
    silentFallbackWarn?: boolean | RegExp;
    /**
     * @remarks
     * Whether suppress warnings when falling back to either `fallbackLocale` or root.
     *
     * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
     *
     * @defaultValue `false`
     */
    formatFallbackMessages?: boolean;
    /**
     * @remarks
     * Whether `v-t` directive's element should preserve `textContent` after directive is unbinded.
     *
     * @VueI18nSee [Custom Directive](../guide/advanced/directive)
     * @VueI18nSee [Remove `preserveDirectiveContent` option](../guide/migration/breaking#remove-preservedirectivecontent-option)
     *
     * @defaultValue `false`
     *
     * @deprecated The `v-t` directive for Vue 3 now preserves the default content. Therefore, this option and its properties have been removed from the VueI18n instance.
     */
    preserveDirectiveContent?: boolean;
    /**
     * @remarks
     * Whether to allow the use locale messages of HTML formatting.
     *
     * See the warnHtmlInMessage property.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     * @VueI18nSee [Change `warnHtmlInMessage` option default value](../guide/migration/breaking#change-warnhtmlinmessage-option-default-value)
     *
     * @defaultValue `'off'`
     */
    warnHtmlInMessage?: WarnHtmlInMessageLevel;
    /**
     * @remarks
     * If `escapeParameterHtml` is configured as true then interpolation parameters are escaped before the message is translated.
     *
     * This is useful when translation output is used in `v-html` and the translation resource contains html markup (e.g. <b> around a user provided value).
     *
     * This usage pattern mostly occurs when passing precomputed text strings into UI components.
     *
     * The escape process involves replacing the following symbols with their respective HTML character entities: `<`, `>`, `"`, `'`.
     *
     * Setting `escapeParameterHtml` as true should not break existing functionality but provides a safeguard against a subtle type of XSS attack vectors.
     *
     * @VueI18nSee [HTML Message](../guide/essentials/syntax#html-message)
     *
     * @defaultValue `false`
     */
    escapeParameterHtml?: boolean;
    /**
     * @remarks
     * The shared locale messages of localization for components. More detail see Component based localization.
     *
     * @VueI18nSee [Shared locale messages for components](../guide/essentials/local#shared-locale-messages-for-components)
     *
     * @defaultValue `undefined`
     */
    sharedMessages?: LocaleMessages<VueMessageType>;
    /**
     * @remarks
     * A set of rules for word pluralization
     *
     * @VueI18nSee [Custom Pluralization](../guide/essentials/pluralization#custom-pluralization)
     *
     * @defaultValue `{}`
     */
    pluralizationRules?: PluralizationRules;
    /**
     * @remarks
     * A handler for post processing of translation. The handler gets after being called with the `$t`, `t`, `$tc`, and `tc`.
     *
     * This handler is useful if you want to filter on translated text such as space trimming.
     *
     * @defaultValue `null`
     */
    postTranslation?: PostTranslationHandler<VueMessageType>;
    /**
     * @remarks
     * Whether synchronize the root level locale to the component localization locale.
     *
     * If `false`, regardless of the root level locale, localize for each component locale.
     *
     * @VueI18nSee [Local Scope](../guide/essentials/scope#local-scope-2)
     *
     * @defaultValue `true`
     */
    sync?: boolean;
    /**
     * @remarks
     * A handler for getting notified when component-local instance was created.
     *
     * The handler gets called with new and old (root) VueI18n instances.
     *
     * This handler is useful when extending the root VueI18n instance and wanting to also apply those extensions to component-local instance.
     *
     * @defaultValue `null`
     */
    componentInstanceCreatedListener?: ComponentInstanceCreatedListener;
}

/** @VueI18nComposition */
export declare type VueMessageType = string | VNode;

export declare type WarnHtmlInMessageLevel = 'off' | 'warn' | 'error';

export { }

declare module '@vue/runtime-core' {
  /**
   * Component Custom Options for Vue I18n
   *
   * @VueI18nInjection
   */
  export interface ComponentCustomOptions {
    /**
     * VueI18n options
     *
     * @remarks
     * See the {@link VueI18nOptions}
     */
    i18n?: VueI18nOptions
    /**
     * For custom blocks options
     * @internal
     */
    __i18n?: CustomBlocks
    /**
     * For devtools
     * @internal
     */
    __INTLIFY_META__?: string
  }

  /**
   * Component Custom Properties for Vue I18n
   *
   * @VueI18nInjection
   */
  export interface ComponentCustomProperties {
    /**
     * Exported Global Composer instance, or global VueI18n instance.
     *
     * @remarks
     * You can get the {@link ExportedGlobalComposer | exported composer instance} which are exported from global {@link Composer | composer instance} created with {@link createI18n}, or global {@link VueI18n | VueI18n instance}.
     * You can get the exported composer instance in {@link I18nMode | Composition API mode}, or the Vuei18n instance in {@link I18nMode | Legacy API mode}, which is the instance you can refer to with this property.
     * The locales, locale messages, and other resources managed by the instance referenced by this property are valid as global scope.
     * If the `i18n` component custom option is not specified, it's the same as the VueI18n instance that can be referenced by the i18n instance {@link I18n.global | global} property.
     */
    $i18n: VueI18n | ExportedGlobalComposer
    /**
     * Locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#t | `VueI18n#t`}.
     *
     * In {@link I18nMode | Composition API mode}, the `$t` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer, and it work on **global scope**. About that details, see {@link Composer#t | `Composer#t` }.
     *
     * @param key - A target locale message key
     *
     * @returns translation message
     */
    $t(key: Path): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key -  A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     *
     * @returns translation message
     */
    $t(key: Path, locale: Locale): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     * @param list - A values of list interpolation
     *
     * @returns translation message
     */
    $t(key: Path, locale: Locale, list: unknown[]): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     * @param named - A values of named interpolation
     *
     * @returns translation message
     */
    $t(key: Path, locale: Locale, named: object): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns translation message
     */
    $t(key: Path, list: unknown[]): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns translation message
     */
    $t(key: Path, named: Record<string, unknown>): TranslateResult
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     *
     * @returns translation message
     */
    $t(key: Path): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param plural - A choice number of plural
     *
     * @returns translation message
     */
    $t(key: Path, plural: number): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - An options, see the {@link TranslateOptions}
     *
     * @returns translation message
     */
    $t(key: Path, plural: number, options: TranslateOptions): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param defaultMsg - A default message to return if no translation was found
     *
     * @returns translation message
     */
    $t(key: Path, defaultMsg: string): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param defaultMsg - A default message to return if no translation was found
     * @param options - An options, see the {@link TranslateOptions}
     *
     * @returns translation message
     */
    $t(key: Path, defaultMsg: string, options: TranslateOptions): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns translation message
     */
    $t(key: Path, list: unknown[]): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param plural - A choice number of plural
     *
     * @returns translation message
     */
    $t(key: Path, list: unknown[], plural: number): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param defaultMsg - A default message to return if no translation was found
     *
     * @returns translation message
     */
    $t(key: Path, list: unknown[], defaultMsg: string): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     * @param options - An options, see the {@link TranslateOptions}
     *
     * @returns translation message
     */
    $t(key: Path, list: unknown[], options: TranslateOptions): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns translation message
     */
    $t(key: Path, named: NamedValue): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param plural - A choice number of plural
     *
     * @returns translation message
     */
    $t(key: Path, named: NamedValue, plural: number): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param defaultMsg - A default message to return if no translation was found
     *
     * @returns translation message
     */
    $t(key: Path, named: NamedValue, defaultMsg: string): string
    /**
     * Locale message translation
     *
     * @remarks
     * Overloaded `$t`. About details, see the {@link $t} remarks.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     * @param options - An options, see the {@link TranslateOptions}
     *
     * @returns translation message
     */
    $t(key: Path, named: NamedValue, options: TranslateOptions): string
    /**
     * Resolve locale message translation
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#rt | `VueI18n#rt`}.
     *
     * In {@link I18nMode | Composition API mode}, the `$rt` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer, and it work on **global scope**. About that details, see {@link Composer#rt | `Composer#rt` }.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `$tm`.
     *
     * @returns translated message
     */
    $rt(message: MessageFunction<VueMessageType> | VueMessageType): string
    /**
     * Resolve locale message translation for plurals
     *
     * @remarks
     * Overloaded `$rt`. About details, see the {@link $rt} remarks.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `$tm`.
     * @param plural - Which plural string to get. 1 returns the first one.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     */
    $rt(
      message: MessageFunction<VueMessageType> | VueMessageType,
      plural: number,
      options?: TranslateOptions
    ): string
    /**
     * Resolve locale message translation for list interpolations
     *
     * @remarks
     * Overloaded `$rt`. About details, see the {@link $rt} remarks.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `$tm`.
     * @param list - A values of list interpolation.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     */
    $rt(
      message: MessageFunction<VueMessageType> | VueMessageType,
      list: unknown[],
      options?: TranslateOptions
    ): string
    /**
     * Resolve locale message translation for named interpolations
     *
     * @remarks
     * Overloaded `$rt`. About details, see the {@link $rt} remarks.
     *
     * @param message - A target locale message to be resolved. You will need to specify the locale message returned by `$tm`.
     * @param named - A values of named interpolation.
     * @param options - Additional {@link TranslateOptions | options} for translation
     *
     * @returns Translated message
     */
    $rt(
      message: MessageFunction<VueMessageType> | VueMessageType,
      named: NamedValue,
      options?: TranslateOptions
    ): string
    /**
     * Locale message pluralization
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * The input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#tc | `VueI18n#tc` }.
     * The value of plural is handled with default `1`.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path): TranslateResult
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param locale - A locale, override locale that global scope or local scope
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, locale: Locale): TranslateResult
    /**
     * Locale message pluralization
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param list - A values of list interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, list: unknown[]): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param named - A values of named interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, named: Record<string, unknown>): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, choice: number): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param locale - A locale, override locale that global scope or local scope
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, choice: number, locale: Locale): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param list - A values of list interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(key: Path, choice: number, list: unknown[]): TranslateResult
    /**
     * Locale message pluralization
     * Supported for Legacy API mode only.
     *
     * @remarks
     * Overloaded `$tc`. About details, see the {@link $tc} remarks.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param choice - Which plural string to get. 1 returns the first one.
     * @param named - A values of named interpolation
     *
     * @returns translation message that is pluraled
     */
    $tc(
      key: Path,
      choice: number,
      named: Record<string, unknown>
    ): TranslateResult
    /**
     * Translation message exist
     *
     * @remarks
     * The input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#te | `VueI18n.#te` }.
     * Supported for Legacy API mode only.
     *
     * @param key - A target locale message key
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns if found locale message, `true`, else `false`
     */
    $te(key: Path, locale?: Locale): boolean
    /**
     * Datetime formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#d | `VueI18n#d` }.
     *
     * In {@link I18nMode | Composition API mode}, the `$d` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance, and it work on **global scope**. About that details, see {@link Composer#d | `Composer#d` }.
     *
     * @param value - A value, timestamp number or `Date` instance
     *
     * @returns formatted value
     */
    $d(value: number | Date): DateTimeFormatResult
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     *
     * @returns formatted value
     */
    $d(value: number | Date, key: string): DateTimeFormatResult
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $d(value: number | Date, key: string, locale: Locale): DateTimeFormatResult
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param args - An argument values
     *
     * @returns formatted value
     */
    $d(
      value: number | Date,
      args: { [key: string]: string }
    ): DateTimeFormatResult
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     *
     * @returns formatted value
     */
    $d(value: number | Date): string
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     *
     * @returns formatted value
     */
    $d(value: number | Date, key: string): string
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param key - A key of datetime formats
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $d(value: number | Date, key: string, locale: Locale): string
    /**
     * Datetime formatting
     *
     * @remarks
     * Overloaded `$d`. About details, see the {@link $d} remarks.
     *
     * @param value - A value, timestamp number or `Date` instance
     * @param options - An options, see the {@link DateTimeOptions}
     *
     * @returns formatted value
     */
    $d(value: number | Date, options: DateTimeOptions): string
    /**
     * Number formatting
     *
     * @remarks
     * If this is used in a reactive context, it will re-evaluate once the locale changes.
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#n | `VueI18n.n` }.
     *
     * In {@link I18nMode | Composition API mode}, the `$n` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance,  and it work on **global scope**. About that details, see {@link Composer#n | `Composer.n` }.
     *
     * @param value - A number value
     *
     * @returns formatted value
     */
    $n(value: number): NumberFormatResult
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param key - A key of number formats
     *
     * @returns formatted value
     */
    $n(value: number, key: string): NumberFormatResult
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param key - A key of number formats
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $n(value: number, key: string, locale: Locale): NumberFormatResult
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param args - An argument values
     *
     * @returns formatted value
     */
    $n(value: number, args: { [key: string]: string }): NumberFormatResult
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     *
     * @returns formatted value
     */
    $n(value: number): string
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param key - A key of number formats
     *
     * @returns formatted value
     */
    $n(value: number, key: string): string
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param key - A key of number formats
     * @param locale - A locale, optional, override locale that global scope or local scope
     *
     * @returns formatted value
     */
    $n(value: number, key: string, locale: Locale): string
    /**
     * Number formatting
     *
     * @remarks
     * Overloaded `$n`. About details, see the {@link $n} remarks.
     *
     * @param value - A number value
     * @param options - An options, see the {@link NumberOptions}
     *
     * @returns formatted value
     */
    $n(value: number, options: NumberOptions): string
    /**
     * Locale messages getter
     *
     * In {@link I18nMode | Legacy API mode}, the input / output is the same as for VueI18n instance. About that details, see {@link VueI18n#tm | `VueI18n#tm` }.
     *
     * @remarks
     * In {@link I18nMode | Composition API mode}, the `$tm` is injected by `app.config.globalProperties`.
     * the input / output is the same as for Composer instance, and it work on **global scope**. About that details, see {@link Composer#tm | `Composer.tm` }.
     * Based on the current `locale`, locale messages will be returned from Composer instance messages.
     * If you change the `locale`, the locale messages returned will also correspond to the locale.
     * If there are no locale messages for the given `key` in the composer instance messages, they will be returned with fallbacking.
     *
     * @param key - A target locale message key
     *
     * @returns locale messages
     */
    $tm(key: Path): LocaleMessageValue<VueMessageType> | {}
  }
}
