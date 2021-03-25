export declare const enum PatchFlags {
    TEXT = 1,
    CLASS = 2,
    STYLE = 4,
    PROPS = 8,
    FULL_PROPS = 16,
    HYDRATE_EVENTS = 32,
    STABLE_FRAGMENT = 64,
    KEYED_FRAGMENT = 128,
    UNKEYED_FRAGMENT = 256,
    NEED_PATCH = 512,
    DYNAMIC_SLOTS = 1024,
    HOISTED = -1,
    BAIL = -2
}
export declare const PatchFlagNames: {
    [x: number]: string;
};
