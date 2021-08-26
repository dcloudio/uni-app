import type { Emittable } from '@intlify/shared';

export declare type AdditionalPayloads = {
    meta?: Record<string, unknown>;
};

export declare type IntlifyDevToolsEmitter = Emittable<IntlifyDevToolsEmitterHooks>;

export declare type IntlifyDevToolsEmitterHooks = {
    [IntlifyDevToolsHooks.I18nInit]: IntlifyDevToolsHookPayloads[typeof IntlifyDevToolsHooks.I18nInit];
    [IntlifyDevToolsHooks.FunctionTranslate]: IntlifyDevToolsHookPayloads[typeof IntlifyDevToolsHooks.FunctionTranslate];
};

export declare type IntlifyDevToolsHookPayloads = {
    [IntlifyDevToolsHooks.I18nInit]: {
        timestamp: number;
        i18n: unknown;
        version: string;
    } & AdditionalPayloads;
    [IntlifyDevToolsHooks.FunctionTranslate]: {
        timestamp: number;
        message: string | number;
        key: string;
        locale: string;
        format?: string;
    } & AdditionalPayloads;
};

export declare const IntlifyDevToolsHooks: {
    readonly I18nInit: "i18n:init";
    readonly FunctionTranslate: "function:translate";
};

export declare type IntlifyDevToolsHooks = typeof IntlifyDevToolsHooks[keyof typeof IntlifyDevToolsHooks];

export declare interface IntlifyRecord {
    id: number;
    i18n: unknown;
    version: string;
    types: Record<string, string | Symbol>;
}

export { }
