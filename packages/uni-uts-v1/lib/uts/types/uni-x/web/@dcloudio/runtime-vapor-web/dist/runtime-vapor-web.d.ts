import { VaporSlot } from "@vue/runtime-vapor";
import { normalizeUniText } from "@vue/shared";
import { withAsyncContext } from "@vue/runtime-core";
export * from "@vue/runtime-dom";
export * from "@vue/runtime-vapor";
//#region temp/packages/runtime-vapor-web/src/hover.d.ts
export declare function setHover(el: HTMLElement, hoverClass: unknown, stopPropagation?: unknown, startTime?: unknown, stayTime?: unknown, baseClass?: string): void;
//#endregion
//#region temp/packages/runtime-vapor-web/src/view.d.ts
export declare function setViewDynamicProps(el: HTMLElement, args: any[], isSVG?: boolean): void;
//#endregion
//#region temp/packages/runtime-vapor-web/src/image.d.ts
type ImageElement = HTMLImageElement & {
  $imageMode?: string;
  $imageModeDynamic?: boolean;
  $imageSrcValue?: unknown;
};
type ImageEventName = "load" | "error";
export declare function setRealPathResolver(resolver?: (src: string) => string): void;
export declare function setImageSrc(el: HTMLImageElement, value: unknown): void;
/**
 * 为 image 的用户事件补充旧组件的 detail，保持原生 Event 对象和方法不变。
 */
export declare function withImageEventDetail(handler: any, name: ImageEventName): any;
export declare function setImageMode(el: ImageElement, value: unknown): void;
export declare function setImageDynamicProps(el: HTMLImageElement, args: any[], isSVG?: boolean): void;
export declare function setImageDynamicEvents(el: HTMLElement, events: Record<string, any>): void;
//#endregion
export { type VaporSlot, normalizeUniText, withAsyncContext };