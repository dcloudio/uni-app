export declare type BuiltInLocale = typeof LOCALE_ZH_HANS | typeof LOCALE_ZH_HANT | typeof LOCALE_EN | typeof LOCALE_FR | typeof LOCALE_ES;

export declare function compileI18nJsonStr(jsonStr: string, { locale, locales, delimiters, }: {
    locale: string;
    locales: Record<string, Record<string, string>>;
    delimiters: [string, string];
}): string;

export declare class Formatter {
    _caches: {
        [key: string]: Array<Token>;
    };
    constructor();
    interpolate(message: string, values?: Record<string, unknown> | Array<unknown>, delimiters?: [string, string]): Array<unknown>;
}

declare interface Formatter_2 {
    interpolate: (message: string, values?: Record<string, unknown> | Array<unknown>, delimiters?: [string, string]) => Array<unknown>;
}

export declare function hasI18nJson(jsonObj: unknown, delimiters: [string, string]): boolean;

export declare class I18n {
    private locale;
    private fallbackLocale;
    private message;
    private messages;
    private watchers;
    private formater;
    constructor({ locale, fallbackLocale, messages, watcher, formater, }: I18nOptions);
    setLocale(locale: string): void;
    getLocale(): string;
    watchLocale(fn: LocaleWatcher): () => void;
    add(locale: BuiltInLocale, message: Record<string, string>, override?: boolean): void;
    f(message: string, values?: Record<string, unknown> | Array<unknown>, delimiters?: [string, string]): string;
    t(key: string, values?: Record<string, unknown> | Array<unknown> | BuiltInLocale): string;
    t(key: string, locale?: BuiltInLocale, values?: Record<string, unknown> | Array<unknown>): string;
}

export declare interface I18nOptions {
    locale: string;
    fallbackLocale?: string;
    messages?: LocaleMessages;
    formater?: Formatter_2;
    watcher?: LocaleWatcher;
}

export declare function initVueI18n(locale?: string, messages?: LocaleMessages, fallbackLocale?: string, watcher?: (locale: string) => void): {
    i18n: I18n;
    f(message: string, values?: Record<string, unknown> | unknown[] | undefined, delimiters?: [string, string] | undefined): string;
    t(key: string, values?: Record<string, unknown> | unknown[] | undefined): string;
    add(locale: BuiltInLocale, message: Record<string, string>, override?: boolean): void;
    watch(fn: LocaleWatcher): () => void;
    getLocale(): string;
    setLocale(newLocale: string): void;
};

export declare function isI18nStr(value: string, delimiters: [string, string]): boolean;

export declare const isString: (val: unknown) => val is string;

declare type Locale = string;

export declare const LOCALE_EN = "en";

export declare const LOCALE_ES = "es";

export declare const LOCALE_FR = "fr";

export declare const LOCALE_ZH_HANS = "zh-Hans";

export declare const LOCALE_ZH_HANT = "zh-Hant";

export declare type LocaleMessages = Record<string, Record<string, string>>;

export declare type LocaleWatcher = (newLocale: string, oldLocale: string) => void;

export declare function normalizeLocale(locale: string, messages?: LocaleMessages): BuiltInLocale | undefined;

export declare function parseI18nJson(jsonObj: unknown, values: Record<string, string>, delimiters: [string, string]): unknown;

export declare function resolveLocale(locales: Locale[]): (locale: Locale) => string | undefined;

declare type Token = {
    type: 'text' | 'named' | 'list' | 'unknown';
    value: string;
};

export { }
