export function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
export function getTarget() {
    // @ts-ignore
    return typeof navigator !== 'undefined'
        ? window
        : typeof global !== 'undefined'
            ? global
            : {};
}
