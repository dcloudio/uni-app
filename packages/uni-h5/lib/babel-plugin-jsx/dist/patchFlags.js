"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchFlagNames = void 0;
// dev only flag -> name mapping
exports.PatchFlagNames = {
    [1 /* TEXT */]: 'TEXT',
    [2 /* CLASS */]: 'CLASS',
    [4 /* STYLE */]: 'STYLE',
    [8 /* PROPS */]: 'PROPS',
    [16 /* FULL_PROPS */]: 'FULL_PROPS',
    [32 /* HYDRATE_EVENTS */]: 'HYDRATE_EVENTS',
    [64 /* STABLE_FRAGMENT */]: 'STABLE_FRAGMENT',
    [128 /* KEYED_FRAGMENT */]: 'KEYED_FRAGMENT',
    [256 /* UNKEYED_FRAGMENT */]: 'UNKEYED_FRAGMENT',
    [1024 /* DYNAMIC_SLOTS */]: 'DYNAMIC_SLOTS',
    [512 /* NEED_PATCH */]: 'NEED_PATCH',
    [-1 /* HOISTED */]: 'HOISTED',
    [-2 /* BAIL */]: 'BAIL',
};
