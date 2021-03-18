
export declare type BuiltInLocale = 'zh-Hans' | 'zh-Hant' | 'en' | 'fr' | 'es';

export declare interface Formatter {
    interpolate: (message: string, values?: Record<string, unknown> | Array<unknown>) => Array<unknown>;
}

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
    t(key: string, values?: Record<string, unknown> | Array<unknown> | BuiltInLocale): string;
    t(key: string, locale?: BuiltInLocale, values?: Record<string, unknown> | Array<unknown>): string;
}

export declare interface I18nOptions {
    locale: BuiltInLocale;
    fallbackLocale?: BuiltInLocale;
    messages: LocaleMessages;
    formater?: Formatter;
    watcher?: LocaleWatcher;
}

export declare function initVueI18n(messages: LocaleMessages, fallbackLocale?: BuiltInLocale, locale?: BuiltInLocale): {
    t(key: string, values?: Record<string, unknown> | unknown[] | undefined): string;
    getLocale(): BuiltInLocale;
    setLocale(newLocale: BuiltInLocale): void;
    mixin: {
        beforeCreate(): void;
        methods: {
            $$t(key: string, values?: any): string;
        };
    };
};

export declare type LocaleMessages = {
    [name in BuiltInLocale]?: Record<string, string>;
};

export declare type LocaleWatcher = (newLocale: BuiltInLocale, oldLocale: BuiltInLocale) => void;

export { }
