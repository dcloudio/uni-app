import type { ComponentInternalInstance, ComponentPublicInstance } from '@vue/runtime-core';
export declare function isComponentInternalInstance(vm: unknown): vm is ComponentInternalInstance;
export declare function resolveComponentInstance(instance?: ComponentInternalInstance | ComponentPublicInstance): ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("@vue/runtime-core").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined;
export declare function resolveOwnerVm(vm: ComponentInternalInstance): ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("@vue/runtime-core").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined;
export declare function resolveOwnerEl(instance: ComponentInternalInstance): import("@vue/runtime-core").RendererNode | null;
export declare function dynamicSlotName(name: string): string;
export declare function customizeEvent(str: string): string;
