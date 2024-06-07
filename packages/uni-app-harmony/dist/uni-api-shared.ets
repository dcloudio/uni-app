import { defineAsyncApi as originalDefineAsyncApi, defineOffApi as originalDefineOffApi, defineOnApi as originalDefineOnApi, defineSyncApi as originalDefineSyncApi, defineTaskApi as originalDefineTaskApi } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
type Anything = Object | null | undefined;
type NullType = null | undefined;
type FormatArgsValueType = Function | string | number | boolean;
interface ErrRes {
    errMsg?: string | null;
    errCode?: number | null;
}
interface ApiExcutor<K> {
    resolve: (res?: K | void) => void;
    reject: (errMsg?: string, errRes?: ErrRes) => void;
}
interface ProtocolOptions {
    name?: string | null;
    type?: string | null;
    required?: boolean | null;
    validator?: (value: Object) => boolean | undefined | string;
}
interface ApiOptions<T> {
    beforeInvoke?: (args: Object) => boolean | void | string;
    beforeAll?: (res: Object) => void;
    beforeSuccess?: (res: Object, args: T) => void;
    formatArgs?: Map<string, FormatArgsValueType>;
}
interface AsyncMethodOptionLike {
    success?: Function | null;
}
const TYPE_MAP = new Map<string, Object>([
    [
        'string',
        String
    ],
    [
        'number',
        Number
    ],
    [
        'boolean',
        Boolean
    ],
    [
        'array',
        Array
    ],
    [
        'object',
        Object
    ]
]);
function getPropType(type: string | NullType): Anything {
    if (!type) {
        return;
    }
    return TYPE_MAP.get(type);
}
function buildProtocol(protocol: Map<string, ProtocolOptions> | null = null) {
    const originalProtocol = {} as Record<string, Object>;
    protocol?.forEach((value, key)=>{
        const protocol = originalProtocol[key] = {} as Record<string, Anything>;
        protocol.name = value.name;
        protocol.type = getPropType(value.type);
        protocol.required = value.required;
        protocol.validator = value.validator;
    });
    return originalProtocol;
}
function buildOptions(options: ApiOptions<AsyncMethodOptionLike> | null = null) {
    const originalFormatArgs = {} as Record<string, FormatArgsValueType>;
    const originalOptions = {} as Record<string, Anything>;
    if (options) {
        if (options.formatArgs) {
            options.formatArgs.forEach((value, key)=>{
                originalFormatArgs[key] = value;
            });
        }
        originalOptions.beforeInvoke = options.beforeInvoke;
        originalOptions.beforeAll = options.beforeAll;
        originalOptions.beforeSuccess = options.beforeSuccess;
        originalOptions.formatArgs = originalFormatArgs;
    }
    return originalOptions;
}
function defineAsyncApi<T extends AsyncMethodOptionLike, K>(name: string, fn: (options: T, res: ApiExcutor<K>) => void, protocol: Map<string, ProtocolOptions> | null = null, options: ApiOptions<T> | null = null): Function {
    const originalProtocol = buildProtocol(protocol);
    const originalOptions = buildOptions(options as ApiOptions<AsyncMethodOptionLike>);
    return originalDefineAsyncApi(name, fn, originalProtocol, originalOptions);
}
function defineTaskApi<T, K, TASK>(name: string, fn: (options: T, res: ApiExcutor<K>) => TASK, protocol: Map<string, ProtocolOptions>, options: ApiOptions<T>): Object {
    const originalProtocol = buildProtocol(protocol);
    const originalOptions = buildOptions(options as ApiOptions<AsyncMethodOptionLike>);
    return originalDefineTaskApi(name, fn, originalProtocol, originalOptions);
}
function defineSyncApi<K>(name: string, fn: Function, protocol: Map<string, ProtocolOptions> | null = null, options: ApiOptions<Object> | null = null): Object {
    const originalProtocol = buildProtocol(protocol);
    const originalOptions = buildOptions(options as ApiOptions<AsyncMethodOptionLike>);
    return originalDefineSyncApi(name, fn, originalProtocol, originalOptions);
}
function defineOnApi<T>(name: string, fn: () => void, options: ApiOptions<T>): Function {
    const originalOptions = buildOptions(options as ApiOptions<AsyncMethodOptionLike>);
    return originalDefineOnApi(name, fn, originalOptions);
}
function defineOffApi<T>(name: string, fn: () => void, options: ApiOptions<T>): Function {
    const originalOptions = buildOptions(options as ApiOptions<AsyncMethodOptionLike>);
    return originalDefineOffApi(name, fn, originalOptions);
}
export { ErrRes as ErrRes };
export { ApiExcutor as ApiExcutor };
export { ProtocolOptions as ProtocolOptions };
export { ApiOptions as ApiOptions };
export { defineAsyncApi as defineAsyncApi };
export { defineTaskApi as defineTaskApi };
export { defineSyncApi as defineSyncApi };
export { defineOnApi as defineOnApi };
export { defineOffApi as defineOffApi };
