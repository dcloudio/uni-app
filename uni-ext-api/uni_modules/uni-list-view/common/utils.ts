let idCounter = 0;
export function generateUniqueId() {
    idCounter += 1;
    return idCounter;
}

const camelizeRE = /-(\w)/g
export function camelize(str: string): string {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

// enum?
export const NATIVE_CHANNEL_ACTIONS = {
    DESTROY_LIST: 0,
    DESTROY_SECTION: 1,
    LIST_UPDATE_LIST: 2,
    SECTION_UPDATE_LIST: 3,
    ITEM_UPDATE_KEY: 4
}

export function useNativeChannelFn() {
    let nativeChannelFn: Function | null = null;
    let nativeChannelFnInitTask: Function[] = [];
    function ensureNativeChannelFn(fn: Function) {
        if (!nativeChannelFn) {
            nativeChannelFnInitTask.push(fn);
        } else {
            fn(nativeChannelFn);
        }
    }
    function setNativeChannelFn(fn: Function) {
        nativeChannelFn = fn;
        nativeChannelFnInitTask.forEach((fn) => {
            fn(nativeChannelFn);
        });
    }
    return {
        ensureNativeChannelFn,
        setNativeChannelFn
    }
}
