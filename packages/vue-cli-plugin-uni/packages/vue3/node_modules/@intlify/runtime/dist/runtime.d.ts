import { Path } from '@intlify/message-resolver';

export declare type CoreMissingType = 'translate' | 'datetime format' | 'number format';

export declare function createMessageContext<T = string, N = {}>(options?: MessageContextOptions<T, N>): MessageContext<T>;

export declare const DEFAULT_MESSAGE_DATA_TYPE = "text";

declare type ExtractToStringFunction<T> = T[ExtractToStringKey<T>];

declare type ExtractToStringKey<T> = Extract<keyof T, 'toString'>;

/** @VueI18nGeneral */
export declare type FallbackLocale = Locale | Locale[] | {
    [locale in string]: Locale[];
} | false;

/** @VueI18nGeneral */
export declare type LinkedModifiers<T = string> = {
    [key: string]: LinkedModify<T>;
};

export declare type LinkedModify<T = string> = (value: T) => MessageType<T>;

/** @VueI18nGeneral */
export declare type Locale = string;

export declare interface MessageContext<T = string> {
    list(index: number): unknown;
    named(key: string): unknown;
    plural(messages: T[]): T;
    linked(key: Path, modifier?: string): MessageType<T>;
    message(key: Path): MessageFunction<T>;
    type: string;
    interpolate: MessageInterpolate<T>;
    normalize: MessageNormalize<T>;
}

export declare interface MessageContextOptions<T = string, N = {}> {
    parent?: MessageContext<T>;
    locale?: string;
    list?: unknown[];
    named?: NamedValue<N>;
    modifiers?: LinkedModifiers<T>;
    pluralIndex?: number;
    pluralRules?: PluralizationRules;
    messages?: MessageFunctions<T> | MessageResolveFunction<T>;
    processor?: MessageProcessor<T>;
}

export declare type MessageFunction<T = string> = MessageFunctionCallable | MessageFunctionInternal<T>;

export declare type MessageFunctionCallable = <T = string>(ctx: MessageContext<T>) => MessageType<T>;

export declare type MessageFunctionInternal<T = string> = {
    (ctx: MessageContext<T>): MessageType<T>;
    key?: string;
    locale?: string;
    source?: string;
};

export declare type MessageFunctions<T = string> = Record<string, MessageFunction<T>>;

export declare type MessageInterpolate<T = string> = (val: unknown) => MessageType<T>;

export declare type MessageNormalize<T = string> = (values: MessageType<string | T>[]) => MessageType<T | T[]>;

export declare interface MessageProcessor<T = string> {
    type?: string;
    interpolate?: MessageInterpolate<T>;
    normalize?: MessageNormalize<T>;
}

export declare type MessageResolveFunction<T = string> = (key: string) => MessageFunction<T>;

export declare type MessageType<T = string> = T extends string ? string : StringConvertable<T>;

/** @VueI18nGeneral */
export declare type NamedValue<T = {}> = T & Record<string, unknown>;

export declare type PluralizationProps = {
    n?: number;
    count?: number;
};

export declare type PluralizationRule = (choice: number, choicesLength: number, orgRule?: PluralizationRule) => number;

/** @VueI18nGeneral */
export declare type PluralizationRules = {
    [locale: string]: PluralizationRule;
};

declare type StringConvertable<T> = ExtractToStringKey<T> extends never ? unknown : ExtractToStringFunction<T> extends (...args: any) => string ? T : unknown;

export { }
