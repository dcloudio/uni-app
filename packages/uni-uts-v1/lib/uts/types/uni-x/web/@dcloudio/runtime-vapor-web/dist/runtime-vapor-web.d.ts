import { Block, ForFragment, VaporComponentInstance, VaporSlot, isTransitionEnabled } from "@vue/runtime-vapor";
import { withAsyncContext } from "@vue/runtime-core";
import { normalizeUniText } from "@vue/shared";
import { Ref, ShallowRef } from "@vue/reactivity";
export * from "@vue/runtime-dom";
export * from "@vue/runtime-vapor";
//#region temp/packages/runtime-vapor-web/src/componentId.d.ts
export declare function withComponentId<T extends Block>(rawCid: string, create: () => T, recycleItem?: boolean): T;
//#endregion
//#region temp/packages/runtime-vapor-web/src/page.d.ts
export declare function setUniPageHooksInitializer(initialize?: (instance: VaporComponentInstance) => void): void;
export declare function initUniPageHooks(): void;
//#endregion
//#region temp/packages/runtime-vapor-web/src/selectorQuery.d.ts
export declare function querySelectorInComponent(instance: VaporComponentInstance, selector: string): Element | null;
export declare function querySelectorAllInComponent(instance: VaporComponentInstance, selector: string): Element[];
//#endregion
//#region temp/packages/runtime-vapor-web/src/hover.d.ts
export declare function setHover(el: HTMLElement, hoverClass: unknown, stopPropagation?: unknown, startTime?: unknown, stayTime?: unknown, baseClass?: string): void;
//#endregion
//#region temp/packages/runtime-vapor-web/src/view.d.ts
export declare function setViewDynamicProps(el: HTMLElement, args: any[], staticKeys?: string[], isSVG?: boolean): void;
//#endregion
//#region temp/packages/runtime-vapor-web/src/dataset.d.ts
export declare function initUniDataset(el: HTMLElement, data: Readonly<Record<string, string>>): void;
//#endregion
//#region temp/packages/runtime-vapor-web/src/element.d.ts
export declare function initUniElementType<T extends Function>(Type: T, name: string): T;
export declare function initUniElement(root: Element, tagName: PropertyDescriptor): void;
//#endregion
//#region temp/packages/runtime-vapor-web/src/apiCreateRecycleFor.d.ts
type Source = any[] | Record<any, any> | number | string | Set<any> | Map<any, any>;
type ItemGetter = (value: any, key: any, index?: number) => any;
export interface RecycleListExposed {
  updateList(keys: string[]): void;
  updateListIds?(ids: string[]): void;
  renderRange: Ref<[number, number]>;
}
export declare function preCreateRecycleFor(src: () => Source, getKey?: ItemGetter, getId?: ItemGetter): () => Map<any, any>;
export declare class RecycleContext {}
export declare function createRecycleContext(): RecycleContext;
export declare const createRecycleFor: (recycleContext: RecycleContext, src: () => Source, renderItem: (item: ShallowRef<any>, key: ShallowRef<any>, index: ShallowRef<number | undefined>) => Block, getKey?: (item: any, key: any, index?: number) => any, getType?: ItemGetter, flags?: number) => ForFragment;
export declare function onBeforeReuse(callback: () => void): void;
export declare function onReused(callback: () => void): void;
export declare function onBeforeRecycle(callback: () => void): void;
export declare function onRecycled(callback: () => void): void;
export declare const onRecycle: typeof onBeforeRecycle;
export declare const onReuse: typeof onReused;
export declare function useRecycleState<T>(getState: () => T): Ref<T>;
//#endregion
//#region temp/packages/runtime-vapor-web/src/image.d.ts
type ImageElement = HTMLImageElement & {
  $imageMode?: string;
  $imageModeDynamic?: boolean;
  $imageSrcValue?: unknown;
};
type ImageEventName = "load" | "error";
export declare function setRealPathResolver(resolver?: (src: string) => string): void;
export declare function setImageSrc(el: HTMLImageElement, value: unknown, forceHydrate?: boolean): void;
/**
 * 为 image 的用户事件补充旧组件的 detail，保持原生 Event 对象和方法不变。
 */
export declare function withImageEventDetail(handler: any, name: ImageEventName): any;
export declare function setImageMode(el: ImageElement, value: unknown): void;
export declare function setImageDynamicProps(el: HTMLImageElement, args: any[], staticKeys?: string[], isSVG?: boolean): void;
export declare function setImageDynamicEvents(el: HTMLElement, events: Record<string, any>): void;
//#endregion
export { type VaporSlot, isTransitionEnabled, normalizeUniText, withAsyncContext };