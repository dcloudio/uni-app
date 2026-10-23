import { App, Component, ComponentInternalInstance, ComponentPublicInstance, Directive, Slots, VNode } from "@vue/runtime-dom";
import { Readable, Writable } from "node:stream";
import { includeBooleanAttr as ssrIncludeBooleanAttr } from "@vue/shared";
//#region temp/packages/server-renderer/src/render.d.ts
type SSRBuffer = SSRBufferItem[] & {
  hasAsync?: boolean;
};
type SSRBufferItem = string | SSRBuffer | Promise<SSRBuffer>;
type PushFn = (item: SSRBufferItem) => void;
type Props = Record<string, unknown>;
export type SSRContext = {
  [key: string]: any;
  teleports?: Record<string, string>;
};
export declare function renderVNode(push: PushFn, vnode: VNode, parentComponent: ComponentInternalInstance, slotScopeId?: string): void;
//#endregion
//#region temp/packages/server-renderer/src/renderToString.d.ts
export declare function renderToString(input: App | VNode, context?: SSRContext): Promise<string>;
//#endregion
//#region temp/packages/server-renderer/src/renderToStream.d.ts
export interface SimpleReadable {
  push(chunk: string | null): void;
  destroy(err: any): void;
}
export declare function renderToSimpleStream<T extends SimpleReadable>(input: App | VNode, context: SSRContext, stream: T): T;
/**
 * @deprecated
 */
export declare function renderToStream(input: App | VNode, context?: SSRContext): Readable;
export declare function renderToNodeStream(input: App | VNode, context?: SSRContext): Readable;
export declare function pipeToNodeWritable(input: App | VNode, context: SSRContext | undefined, writable: Writable): void;
export declare function renderToWebStream(input: App | VNode, context?: SSRContext): ReadableStream;
export declare function pipeToWebWritable(input: App | VNode, context: SSRContext | undefined, writable: WritableStream): void;
//#endregion
//#region temp/packages/server-renderer/src/helpers/ssrRenderSlot.d.ts
type SSRSlots = Record<string, SSRSlot>;
type SSRSlot = (props: Props, push: PushFn, parentComponent: ComponentInternalInstance | null, scopeId: string | null) => void;
export declare function ssrRenderSlot(slots: Slots | SSRSlots, slotName: string, slotProps: Props | null | undefined, fallbackRenderFn: (() => void) | null, push: PushFn, parentComponent: ComponentInternalInstance, slotScopeId?: string, textMode?: boolean): void;
export declare function ssrRenderSlotInner(slots: Slots | SSRSlots, slotName: string, slotProps: Props | null | undefined, fallbackRenderFn: (() => void) | null, push: PushFn, parentComponent: ComponentInternalInstance, slotScopeId?: string, transition?: boolean, textMode?: boolean): void;
//#endregion
//#region temp/packages/server-renderer/src/helpers/ssrRenderComponent.d.ts
export declare function ssrRenderComponent(comp: Component | string, props?: Props | null, children?: Slots | SSRSlots | null, parentComponent?: ComponentInternalInstance | null, slotScopeId?: string): SSRBuffer | Promise<SSRBuffer>;
//#endregion
//#region temp/packages/server-renderer/src/helpers/ssrRenderTeleport.d.ts
export declare function ssrRenderTeleport(parentPush: PushFn, contentRenderFn: (push: PushFn) => void, target: string, disabled: boolean, parentComponent: ComponentInternalInstance): void;
//#endregion
//#region temp/packages/server-renderer/src/helpers/ssrRenderAttrs.d.ts
export declare function ssrRenderAttrs(props: Record<string, unknown>, tag?: string): string;
export declare function ssrRenderDynamicAttr(key: string, value: unknown, tag?: string): string;
export declare function ssrRenderAttr(key: string, value: unknown): string;
export declare function ssrRenderClass(raw: unknown): string;
export declare function ssrRenderStyle(raw: unknown): string;
//#endregion
//#region temp/packages/server-renderer/src/helpers/ssrInterpolate.d.ts
export declare function ssrInterpolate(value: unknown, uniText?: boolean): string;
//#endregion
//#region temp/packages/server-renderer/src/helpers/ssrRenderList.d.ts
export declare function ssrRenderList(source: unknown, renderItem: (value: unknown, key: string | number, index?: number) => void): void;
//#endregion
//#region temp/packages/server-renderer/src/helpers/ssrRenderSuspense.d.ts
export declare function ssrRenderSuspense(push: PushFn, { default: renderContent }: Record<string, (() => void) | undefined>): void;
//#endregion
//#region temp/packages/server-renderer/src/helpers/ssrGetDirectiveProps.d.ts
export declare function ssrGetDirectiveProps(instance: ComponentPublicInstance, dir: Directive, value?: any, arg?: string, modifiers?: Record<string, boolean>): Record<string, any>;
//#endregion
//#region temp/packages/server-renderer/src/helpers/ssrVModelHelpers.d.ts
export declare const ssrLooseEqual: (a: unknown, b: unknown) => boolean;
export declare function ssrLooseContain(arr: unknown[], value: unknown): boolean;
export declare function ssrRenderDynamicModel(type: unknown, model: unknown, value: unknown): string;
export declare function ssrGetDynamicModelProps(existingProps: any | undefined, model: unknown): {
  checked: true;
} | {
  value: any;
} | null;
//#endregion
export { ssrIncludeBooleanAttr, renderVNode as ssrRenderVNode };