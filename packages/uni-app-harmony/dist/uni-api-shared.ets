import { defineAsyncApi as originalDefineAsyncApi, defineOffApi as originalDefineOffApi, defineOnApi as originalDefineOnApi, defineSyncApi as originalDefineSyncApi, defineTaskApi as originalDefineTaskApi } from "@dcloudio/uni-app-harmony-framework";
interface UniProvider {
    id: string;
    description: string;
}
const providers: Map<String, Map<String, UniProvider>> = new Map();
function getUniProvider<T extends UniProvider>(service: string, providerName: String): T | null {
    return providers.get(service)?.get(providerName) as T | null;
}
function getUniProviders(service: string): UniProvider[] {
    const result: UniProvider[] = [];
    providers.get(service)?.forEach((provider)=>{
        result.push(provider);
    });
    return result;
}
function registerUniProvider<T extends UniProvider>(service: string, providerName: string, provider: T) {
    if (!providers.has(service)) {
        providers.set(service, new Map());
    }
    providers.get(service)?.set(providerName, provider);
}
type Anything = Object | null | undefined;
type NullType = null | undefined;
type FormatArgsValueType = Function | string | number | boolean;
interface AsyncApiSuccessResult {
}
interface AsyncApiResult {
}
interface ApiError {
    errMsg?: string | null;
    errCode?: number | null;
}
interface ApiExecutor<K> {
    resolve: (res?: K | void) => void;
    reject: (errMsg?: string, errRes?: ApiError) => void;
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
function defineAsyncApi<T extends AsyncMethodOptionLike, K>(name: string, fn: (options: T, res: ApiExecutor<K>) => void, protocol: Map<string, ProtocolOptions> | null = null, options: ApiOptions<T> | null = null): Function {
    const originalProtocol = buildProtocol(protocol);
    const originalOptions = buildOptions(options as ApiOptions<AsyncMethodOptionLike>);
    return originalDefineAsyncApi(name, fn, originalProtocol, originalOptions);
}
function defineTaskApi<T, K, TASK>(name: string, fn: (options: T, res: ApiExecutor<K>) => TASK, protocol: Map<string, ProtocolOptions>, options: ApiOptions<T>): Object {
    const originalProtocol = buildProtocol(protocol);
    const originalOptions = buildOptions(options as ApiOptions<AsyncMethodOptionLike>);
    return originalDefineTaskApi(name, fn, originalProtocol, originalOptions);
}
function defineSyncApi<K>(name: string, fn: Function, protocol: Map<string, ProtocolOptions> | null = null, options: ApiOptions<Object> | null = null): (...args: Object[]) => K {
    const originalProtocol = buildProtocol(protocol);
    const originalOptions = buildOptions(options as ApiOptions<AsyncMethodOptionLike>);
    return originalDefineSyncApi(name, fn, originalProtocol, originalOptions);
}
function defineOnApi<T>(name: string, fn: () => void, options: ApiOptions<T> | null = null): Function {
    const originalOptions = buildOptions(options as ApiOptions<AsyncMethodOptionLike>);
    return originalDefineOnApi(name, fn, originalOptions);
}
function defineOffApi<T>(name: string, fn: () => void, options: ApiOptions<T> | null = null): Function {
    const originalOptions = buildOptions(options as ApiOptions<AsyncMethodOptionLike>);
    return originalDefineOffApi(name, fn, originalOptions);
}
export { UniProvider as UniProvider, getUniProvider as getUniProvider, getUniProviders as getUniProviders, registerUniProvider as registerUniProvider };
export { AsyncApiSuccessResult as AsyncApiSuccessResult };
export { AsyncApiResult as AsyncApiResult };
export { ApiError as ApiError };
export { ApiExecutor as ApiExecutor };
export { ProtocolOptions as ProtocolOptions };
export { ApiOptions as ApiOptions };
export { defineAsyncApi as defineAsyncApi };
export { defineTaskApi as defineTaskApi };
export { defineSyncApi as defineSyncApi };
export { defineOnApi as defineOnApi };
export { defineOffApi as defineOffApi };
