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
    getLocale(): BuiltInLocale;
    watchLocale(fn: LocaleWatcher): () => void;
    add(locale: BuiltInLocale, message: Record<string, string>): void;
    t(key: string, values?: Record<string, unknown> | Array<unknown> | BuiltInLocale): string;
    t(key: string, locale?: BuiltInLocale, values?: Record<string, unknown> | Array<unknown>): string;
}

export declare interface I18nOptions {
    locale: BuiltInLocale;
    fallbackLocale?: BuiltInLocale;
    messages?: LocaleMessages;
    formater?: Formatter_2;
    watcher?: LocaleWatcher;
}

export declare function initVueI18n(locale?: BuiltInLocale, messages?: LocaleMessages, fallbackLocale?: BuiltInLocale, watcher?: (locale: BuiltInLocale) => void): {
    i18n: I18n;
    t(key: string, values?: Record<string, unknown> | unknown[] | undefined): string;
    add(locale: BuiltInLocale, message: Record<string, string>): void;
    watch(fn: LocaleWatcher): () => void;
    getLocale(): BuiltInLocale;
    setLocale(newLocale: BuiltInLocale): void;
};

export declare const isString: (val: unknown) => val is string;

export declare const LOCALE_EN = "en";

export declare const LOCALE_ES = "es";

export declare const LOCALE_FR = "fr";

export declare const LOCALE_ZH_HANS = "zh-Hans";

export declare const LOCALE_ZH_HANT = "zh-Hant";

export declare type LocaleMessages = {
    [name in BuiltInLocale]?: Record<string, string>;
};

export declare type LocaleWatcher = (newLocale: BuiltInLocale, oldLocale: BuiltInLocale) => void;

export declare function parseI18nJson(jsonObj: unknown, values: Record<string, string>, delimiters: [string, string]): unknown;

declare type Token = {
    type: 'text' | 'named' | 'list' | 'unknown';
    value: string;
};

export { }
