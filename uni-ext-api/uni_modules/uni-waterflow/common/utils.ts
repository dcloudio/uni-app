let idCounter = 0;
export function generateWaterflowId() {
    idCounter += 1;
    return idCounter;
}

const camelizeRE = /-(\w)/g
export function camelize(str: string): string {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

// enum?
export const NATIVE_CHANNEL_ACTIONS = {
    DESTROY: 0,
    UPDATE_LIST: 1
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
