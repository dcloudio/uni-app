import { AllNode, AttributeNode, BaseCodegenResult, BindingMetadata, CodegenOptions as CodegenOptions$1, CodegenSourceMapGenerator, CommentNode, CompilerCompatOptions, CompilerError, CompilerOptions as CompilerOptions$1, CompoundExpressionNode, DirectiveNode, ElementNode, Node as Node$1, NodeTypes, RootNode, SimpleExpressionNode, SourceLocation, TemplateChildNode, TemplateNode, TransformOptions, parse } from "@vue/compiler-dom";
import { App, BaseTransitionProps, Component, ComponentCustomElementInterface, ComponentInjectOptions, ComponentObjectPropsOptions, ComponentOptions, ComponentOptionsBase, ComponentOptionsMixin, ComponentProvideOptions, ComponentPublicInstance, ComputedOptions, ConcreteComponent, CreateAppFunction, CreateComponentPublicInstanceWithMixins, DefineComponent, Directive, EmitsOptions, EmitsToProps, ExtractPropTypes, FunctionalComponent, GenericComponentInstance, HydrationRenderer, MethodOptions, ObjectDirective, RenderFunction, Renderer, RendererOptions, RootHydrateFunction, RootRenderFunction, SetupContext, SlotsType, VNodeRef } from "@vue/runtime-core";
import { AllowedComponentProps, AsyncComponentInternalOptions, AsyncComponentLoader, AsyncComponentOptions, ComponentCustomProps, ComponentInternalOptions, ComponentObjectPropsOptions as ComponentObjectPropsOptions$1, ComponentPropsOptions, ComponentTypeEmits, CreateAppFunction as CreateAppFunction$1, CustomElementOptions, DirectiveModifiers, EffectScope, EmitFn, EmitsOptions as EmitsOptions$1, EmitsToProps as EmitsToProps$1, ExtractDefaultPropTypes, ExtractPropTypes as ExtractPropTypes$1, GenericAppContext, GenericComponentInstance as GenericComponentInstance$1, KeepAliveProps, LifecycleHook, NULL_DYNAMIC_COMPONENT, NormalizedPropsOptions, ObjectEmitsOptions, Plugin, ReservedProps, SchedulerJob, ShallowUnwrapRef, SuspenseBoundary, TeleportProps, TransitionGroupProps, TransitionHooks, TransitionProps, TransitionState, TypeEmitsToOptions, VNode, VueElementBase } from "@vue/runtime-dom";
import { EffectScope as EffectScope$1, ReactiveEffect, Ref, ShallowRef } from "@vue/reactivity";
import { IsKeyValues, Namespace, NormalizedStyle, Prettify } from "@vue/shared";
import { ImportItem } from "@vue/compiler-core";

//#region \0rolldown/runtime.js
//#endregion
//#region packages/runtime-dom/src/directives/vShow.d.ts
declare const vShowOriginalDisplay: unique symbol;
declare const vShowHidden: unique symbol;
interface VShowElement extends HTMLElement {
  [vShowOriginalDisplay]?: string;
  [vShowHidden]?: boolean;
}
declare const vShow: ObjectDirective<VShowElement> & {
  name: "show";
};
//#endregion
//#region node_modules/.pnpm/@types+trusted-types@2.0.7/node_modules/@types/trusted-types/lib/index.d.ts
declare class TrustedHTML {
  private constructor(); // To prevent instantiting with 'new'.
  private brand: true; // To prevent structural typing.
}
//#endregion
//#region packages/runtime-dom/src/nodeOps.d.ts
declare const unsafeToTrustedHTML: (value: string) => TrustedHTML | string;
declare const svgNS = "http://www.w3.org/2000/svg";
declare const nodeOps: Omit<RendererOptions<Node, Element>, "patchProp">;
//#endregion
//#region packages/runtime-dom/src/patchProp.d.ts
type DOMRendererOptions = RendererOptions<Node, Element>;
declare const patchProp: DOMRendererOptions["patchProp"];
declare function shouldSetAsProp(el: Element, key: string, value: unknown, isSVG: boolean): boolean;
//#endregion
//#region packages/runtime-dom/src/components/Transition.d.ts
declare const TRANSITION = "transition";
declare const ANIMATION = "animation";
type AnimationTypes = typeof TRANSITION | typeof ANIMATION;
interface TransitionProps$1 extends BaseTransitionProps<Element> {
  name?: string;
  type?: AnimationTypes;
  css?: boolean;
  duration?: number | {
    enter: number;
    leave: number;
  };
  enterFromClass?: string;
  enterActiveClass?: string;
  enterToClass?: string;
  appearFromClass?: string;
  appearActiveClass?: string;
  appearToClass?: string;
  leaveFromClass?: string;
  leaveActiveClass?: string;
  leaveToClass?: string;
}
declare const vtcKey: unique symbol;
interface ElementWithTransition extends HTMLElement {
  [vtcKey]?: Set<string>;
}
declare const TransitionPropsValidators: any;
/**
* DOM Transition is a higher-order-component based on the platform-agnostic
* base Transition component, with DOM-specific logic.
*/
declare const Transition: FunctionalComponent<TransitionProps$1>;
declare function resolveTransitionProps(rawProps: TransitionProps$1): BaseTransitionProps<Element>;
declare function forceReflow(el?: Node): number;
//#endregion
//#region packages/runtime-dom/src/components/TransitionGroup.d.ts
interface Position$1 {
  top: number;
  left: number;
}
type TransitionGroupProps$1 = Omit<TransitionProps$1, "mode"> & {
  tag?: string;
  moveClass?: string;
};
declare const TransitionGroup: {
  new (): {
    $props: TransitionGroupProps$1;
  };
};
declare function callPendingCbs(el: any): void;
declare function baseApplyTranslation(oldPos: Position$1, newPos: Position$1, el: ElementWithTransition): boolean;
declare function hasCSSTransform(el: ElementWithTransition, root: Node, moveClass: string): boolean;
declare const handleMovedChildren: (el: ElementWithTransition, moveClass: string) => void;
//#endregion
//#region packages/runtime-dom/src/directives/vOn.d.ts
declare const systemModifiers: readonly ["ctrl", "shift", "alt", "meta"];
type SystemModifiers = (typeof systemModifiers)[number];
type CompatModifiers = keyof typeof keyNames;
type VOnModifiers = SystemModifiers | ModifierGuards | CompatModifiers;
type ModifierGuards = "shift" | "ctrl" | "alt" | "meta" | "left" | "right" | "stop" | "prevent" | "self" | "middle" | "exact";
/**
* @private
*/
declare const withModifiers: <T extends (event: Event, ...args: unknown[]) => any>(fn: T & {
  _withMods?: {
    [key: string]: T;
  };
}, modifiers: VOnModifiers[]) => T;
declare const keyNames: Record<"esc" | "space" | "up" | "left" | "right" | "down" | "delete", string>;
/**
* @private
*/
declare const withKeys: <T extends (event: KeyboardEvent) => any>(fn: T & {
  _withKeys?: {
    [k: string]: T;
  };
}, modifiers: string[]) => T;
type VOnDirective = Directive<any, any, VOnModifiers>;
//#endregion
//#region packages/runtime-dom/src/directives/vModel.d.ts
type AssignerFn = (value: any) => void;
declare const assignKey: unique symbol;
type ModelDirective<T, Modifiers extends string = string> = ObjectDirective<T & {
  [assignKey]: AssignerFn;
  _assigning?: boolean;
}, any, Modifiers>;
declare const vModelText: ModelDirective<HTMLInputElement | HTMLTextAreaElement, "trim" | "number" | "lazy">;
/**
* @internal
*/
declare const vModelTextInit: (el: HTMLInputElement | HTMLTextAreaElement, trim: boolean | undefined, number: boolean | undefined, lazy: boolean | undefined, set?: (v: any) => void) => void;
/**
* @internal
*/
declare const vModelTextUpdate: (el: HTMLInputElement | HTMLTextAreaElement, oldValue: any, value: any, trim: boolean | undefined, number: boolean | undefined, lazy: boolean | undefined) => void;
declare const vModelCheckbox: ModelDirective<HTMLInputElement>;
/**
* @internal
*/
declare const vModelCheckboxInit: (el: HTMLInputElement, set?: (v: any) => void) => void;
/**
* @internal
*/
declare const vModelCheckboxUpdate: (el: HTMLInputElement, oldValue: any, value: any, rawValue?: any) => void;
declare const vModelRadio: ModelDirective<HTMLInputElement>;
declare const vModelSelect: ModelDirective<HTMLSelectElement, "number">;
/**
* @internal
*/
declare const vModelSelectInit: (el: HTMLSelectElement & {
  [assignKey]?: AssignerFn;
  _assigning?: boolean;
}, value: any, number: boolean | undefined, set?: (v: any) => void) => void;
/**
* @internal
*/
declare const vModelSetSelected: (el: HTMLSelectElement, value: any) => void;
/**
* @internal retrieve raw value set via :value bindings
*/
declare function getValue(el: HTMLOptionElement | HTMLInputElement): any;
declare const vModelDynamic: ObjectDirective<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
type VModelDirective = typeof vModelText | typeof vModelCheckbox | typeof vModelSelect | typeof vModelRadio | typeof vModelDynamic;
//#endregion
//#region packages/runtime-dom/src/apiCustomElement.d.ts
type VueElementConstructor<P = {}> = {
  new (initialProps?: Record<string, any>): VueElement & P;
};
interface CustomElementOptions$1 {
  styles?: string[];
  shadowRoot?: boolean;
  shadowRootOptions?: Omit<ShadowRootInit, "mode">;
  nonce?: string;
  configureApp?: (app: App) => void;
}
declare function defineCustomElement<Props, RawBindings = object>(setup: (props: Props, ctx: SetupContext) => RawBindings | RenderFunction, options?: Pick<ComponentOptions, "name" | "inheritAttrs" | "emits"> & CustomElementOptions$1 & {
  props?: (keyof Props)[];
}): VueElementConstructor<Props>;
declare function defineCustomElement<Props, RawBindings = object>(setup: (props: Props, ctx: SetupContext) => RawBindings | RenderFunction, options?: Pick<ComponentOptions, "name" | "inheritAttrs" | "emits"> & CustomElementOptions$1 & {
  props?: ComponentObjectPropsOptions<Props>;
}): VueElementConstructor<Props>;
declare function defineCustomElement<RuntimePropsOptions extends ComponentObjectPropsOptions = ComponentObjectPropsOptions, PropsKeys extends string = string, RuntimeEmitsOptions extends EmitsOptions = {}, EmitsKeys extends string = string, Data = {}, SetupBindings = {}, Computed extends ComputedOptions = {}, Methods extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, InjectOptions extends ComponentInjectOptions = {}, InjectKeys extends string = string, Slots extends SlotsType = {}, LocalComponents extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions, InferredProps = (string extends PropsKeys ? ComponentObjectPropsOptions extends RuntimePropsOptions ? {} : ExtractPropTypes<RuntimePropsOptions> : { [key in PropsKeys]?: any }), ResolvedProps = InferredProps & EmitsToProps<RuntimeEmitsOptions>>(options: CustomElementOptions$1 & {
  props?: (RuntimePropsOptions & ThisType<void>) | PropsKeys[];
} & ComponentOptionsBase<ResolvedProps, SetupBindings, Data, Computed, Methods, Mixin, Extends, RuntimeEmitsOptions, EmitsKeys, {}, InjectOptions, InjectKeys, Slots, LocalComponents, Directives, Exposed, Provide> & ThisType<CreateComponentPublicInstanceWithMixins<Readonly<ResolvedProps>, SetupBindings, Data, Computed, Methods, Mixin, Extends, RuntimeEmitsOptions, EmitsKeys, {}, false, InjectOptions, Slots, LocalComponents, Directives, Exposed>>, extraOptions?: CustomElementOptions$1): VueElementConstructor<ResolvedProps>;
declare function defineCustomElement<T extends {
  new (...args: any[]): ComponentPublicInstance<any>;
}>(options: T, extraOptions?: CustomElementOptions$1): VueElementConstructor<T extends DefineComponent<infer P, any, any, any> ? P : unknown>;
declare const defineSSRCustomElement: typeof defineCustomElement;
declare const BaseClass: typeof HTMLElement;
type InnerComponentDef = ConcreteComponent & CustomElementOptions$1;
declare abstract class VueElementBase$1<E = Element, C = Component, Def extends CustomElementOptions$1 & {
  props?: any;
} = InnerComponentDef> extends BaseClass implements ComponentCustomElementInterface {
  _isVueCE: boolean;
  /**
  * @internal
  */
  _instance: GenericComponentInstance | null;
  /**
  * @internal
  */
  _app: App | null;
  /**
  * @internal
  */
  _root: Element | ShadowRoot;
  /**
  * @internal
  */
  _nonce: string | undefined;
  /**
  * @internal
  */
  _teleportTargets?: Set<Element>;
  protected _connected: boolean;
  protected _resolved: boolean;
  protected _numberProps: Record<string, true> | null;
  protected _styleChildren: WeakSet<object>;
  protected _pendingResolve: Promise<void> | undefined;
  protected _parent: VueElementBase$1 | undefined;
  protected _patching: boolean;
  protected _dirty: boolean;
  protected _def: Def;
  protected _props: Record<string, any>;
  protected _createApp: CreateAppFunction<E, C>;
  /**
  * dev only
  */
  protected _styles?: HTMLStyleElement[];
  /**
  * dev only
  */
  protected _childStyles?: Map<string, HTMLStyleElement[]>;
  protected _ob?: MutationObserver | null;
  protected _slots?: Record<string, Node[]>;
  /**
  * Check if this custom element needs hydration.
  * Returns true if it has a pre-rendered declarative shadow root that
  * needs to be hydrated.
  */
  protected abstract _needsHydration(): boolean;
  protected abstract _mount(def: Def): void;
  protected abstract _update(): void;
  protected abstract _unmount(): void;
  protected abstract _updateSlotNodes(slot: Map<Node, Node[]>): void;
  constructor(def: Def, props: Record<string, any> | undefined, createAppFn: CreateAppFunction<E, C>);
  connectedCallback(): void;
  disconnectedCallback(): void;
  protected _setParent(parent?: VueElementBase$1 | undefined): void;
  protected _inheritParentContext(parent?: VueElementBase$1 | undefined): void;
  private _processMutations;
  /**
  * resolve inner component definition (handle possible async component)
  */
  private _resolveDef;
  private _mountComponent;
  protected _processExposed(): void;
  protected _processInstance(): void;
  private _resolveProps;
  private _setAttr;
  /**
  * @internal
  */
  protected _getProp(key: string): any;
  /**
  * @internal
  */
  _setProp(key: string, val: any, shouldReflect?: boolean, shouldUpdate?: boolean): void;
  protected _applyStyles(styles: string[] | undefined, owner?: ConcreteComponent): void;
  /**
  * Only called when shadowRoot is false
  */
  private _parseSlots;
  /**
  * Only called when shadowRoot is false
  */
  protected _renderSlots(): void;
  /**
  * @internal
  */
  private _getSlots;
  /**
  * @internal
  */
  _injectChildStyle(comp: ConcreteComponent & CustomElementOptions$1): void;
  /**
  * @internal
  */
  _beginPatch(): void;
  /**
  * @internal
  */
  _endPatch(): void;
  /**
  * @internal
  */
  _hasShadowRoot(): boolean;
  /**
  * @internal
  */
  _removeChildStyle(comp: ConcreteComponent): void;
}
declare class VueElement extends VueElementBase$1<Element, Component, InnerComponentDef> {
  constructor(def: InnerComponentDef, props?: Record<string, any> | undefined, createAppFn?: CreateAppFunction<Element, Component>);
  protected _needsHydration(): boolean;
  protected _mount(def: InnerComponentDef): void;
  protected _update(): void;
  protected _unmount(): void;
  /**
  * Only called when shadowRoot is false
  */
  protected _updateSlotNodes(replacements: Map<Node, Node[]>): void;
  private _createVNode;
}
declare function useHost(caller?: string): VueElementBase$1 | null;
/**
* Retrieve the shadowRoot of the current custom element. Only usable in setup()
* of a `defineCustomElement` component.
*/
declare function useShadowRoot(): ShadowRoot | null;
//#endregion
//#region packages/runtime-dom/src/helpers/useCssModule.d.ts
declare function useCssModule(name?: string): Record<string, string>;
//#endregion
//#region packages/runtime-dom/src/helpers/useCssVars.d.ts
/**
* Runtime helper for SFC's CSS variable injection feature.
* @private
*/
declare function useCssVars(getter: (ctx: any) => Record<string, unknown>): void;
/**
* @internal
* shared between vdom and vapor
*/
declare function baseUseCssVars(instance: GenericComponentInstance | null, getParentNode: () => Node, getVars: () => Record<string, any>, setVars: (vars: Record<string, any>) => void): void;
/**
* @internal
* shared between vdom and vapor
*/
declare function setVarsOnNode(el: Node, vars: Record<string, string>): void;
//#endregion
//#region node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index.d.ts
interface StandardLonghandProperties<TLength = (string & {}) | 0, TTime = string & {}> {
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **93** | **92**  | **15.4** | **93** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   */
  accentColor?: Property.AccentColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **28**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  alignContent?: Property.AlignContent | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ] | anchor-center`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  alignItems?: Property.AlignItems | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position> | anchor-center`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **10** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  alignSelf?: Property.AlignSelf | undefined;
  /**
   * **Syntax**: `[ normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position> ]#`
   *
   * **Initial value**: `normal`
   */
  alignTracks?: Property.AlignTracks | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `baseline | alphabetic | ideographic | middle | central | mathematical | text-before-edge | text-after-edge`
   *
   * **Initial value**: `baseline`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **1**  |   No    | **5.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  alignmentBaseline?: Property.AlignmentBaseline | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <dashed-ident>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-name
   */
  anchorName?: Property.AnchorName | undefined;
  /**
   * **Syntax**: `none | all | <dashed-ident>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **131** | **preview** | **26** | **131** | No  |
   */
  anchorScope?: Property.AnchorScope | undefined;
  /**
   * Since July 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<single-animation-composition>#`
   *
   * **Initial value**: `replace`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **112** | **115** | **16** | **112** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   */
  animationComposition?: Property.AnimationComposition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-delay
   */
  animationDelay?: Property.AnimationDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  animationDirection?: Property.AnimationDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ auto | <time [0s,∞]> ]#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-duration
   */
  animationDuration?: Property.AnimationDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 5 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-fill-mode
   */
  animationFillMode?: Property.AnimationFillMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-iteration-count
   */
  animationIterationCount?: Property.AnimationIterationCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-name
   */
  animationName?: Property.AnimationName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
   */
  animationPlayState?: Property.AnimationPlayState | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ normal | <length-percentage> | <timeline-range-name> <length-percentage>? ]#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  animationRangeEnd?: Property.AnimationRangeEnd<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ normal | <length-percentage> | <timeline-range-name> <length-percentage>? ]#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  animationRangeStart?: Property.AnimationRangeStart<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<single-animation-timeline>#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
   */
  animationTimeline?: Property.AnimationTimeline | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  animationTimingFunction?: Property.AnimationTimingFunction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | auto | <compat-auto> | <compat-special>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |   Edge   | IE  |
   * | :-----: | :-----: | :------: | :------: | :-: |
   * | **84**  | **80**  | **15.4** |  **84**  | No  |
   * | 1 _-x-_ | 1 _-x-_ | 3 _-x-_  | 12 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  appearance?: Property.Appearance | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto || <ratio>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **88** | **89**  | **15** | **88** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/aspect-ratio
   */
  aspectRatio?: Property.AspectRatio | undefined;
  /**
   * Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | <filter-value-list>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **76** | **103** | **18**  | **79** | No  |
   * |        |         | 9 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backdrop-filter
   */
  backdropFilter?: Property.BackdropFilter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `visible | hidden`
   *
   * **Initial value**: `visible`
   *
   * |  Chrome  | Firefox  |  Safari   |  Edge  |   IE   |
   * | :------: | :------: | :-------: | :----: | :----: |
   * |  **36**  |  **16**  | **15.4**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 5.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backface-visibility
   */
  backfaceVisibility?: Property.BackfaceVisibility | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<attachment>#`
   *
   * **Initial value**: `scroll`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  backgroundAttachment?: Property.BackgroundAttachment | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<blend-mode>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **35** | **30**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  backgroundBlendMode?: Property.BackgroundBlendMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-clip>#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **4**  |  **5**  | **12** | **9** |
   * |        |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  backgroundClip?: Property.BackgroundClip | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `transparent`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   */
  backgroundColor?: Property.BackgroundColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-image>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-image
   */
  backgroundImage?: Property.BackgroundImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<visual-box>#`
   *
   * **Initial value**: `padding-box`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **4**  | **3**  | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  backgroundOrigin?: Property.BackgroundOrigin | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `[ center | [ [ left | right | x-start | x-end ]? <length-percentage>? ]! ]#`
   *
   * **Initial value**: `0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **49**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  backgroundPositionX?: Property.BackgroundPositionX<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `[ center | [ [ top | bottom | y-start | y-end ]? <length-percentage>? ]! ]#`
   *
   * **Initial value**: `0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **49**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  backgroundPositionY?: Property.BackgroundPositionY<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  backgroundRepeat?: Property.BackgroundRepeat | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **3**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-size
   */
  backgroundSize?: Property.BackgroundSize<TLength> | undefined;
  /**
   * **Syntax**: `<length-percentage> | sub | super | baseline`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |   No    | **4**  | **79** | No  |
   */
  baselineShift?: Property.BaselineShift<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   *
   * |            Chrome            | Firefox |             Safari             |  Edge  | IE  |
   * | :--------------------------: | :-----: | :----------------------------: | :----: | :-: |
   * |            **57**            | **41**  |            **12.1**            | **79** | No  |
   * | 8 _(-webkit-logical-height)_ |         | 5.1 _(-webkit-logical-height)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  blockSize?: Property.BlockSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color
   */
  borderBlockEndColor?: Property.BorderBlockEndColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  borderBlockEndStyle?: Property.BorderBlockEndStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   */
  borderBlockEndWidth?: Property.BorderBlockEndWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-color
   */
  borderBlockStartColor?: Property.BorderBlockStartColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  borderBlockStartStyle?: Property.BorderBlockStartStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   */
  borderBlockStartWidth?: Property.BorderBlockStartWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-color
   */
  borderBottomColor?: Property.BorderBottomColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-left-radius
   */
  borderBottomLeftRadius?: Property.BorderBottomLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-right-radius
   */
  borderBottomRightRadius?: Property.BorderBottomRightRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  borderBottomStyle?: Property.BorderBottomStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   */
  borderBottomWidth?: Property.BorderBottomWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `separate | collapse`
   *
   * **Initial value**: `separate`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.1** | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-collapse
   */
  borderCollapse?: Property.BorderCollapse | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-end-radius
   */
  borderEndEndRadius?: Property.BorderEndEndRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-start-radius
   */
  borderEndStartRadius?: Property.BorderEndStartRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <length [0,∞]> | <number [0,∞]> ]{1,4}  `
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-outset
   */
  borderImageOutset?: Property.BorderImageOutset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2016.
   *
   * **Syntax**: `[ stretch | repeat | round | space ]{1,2}`
   *
   * **Initial value**: `stretch`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  borderImageRepeat?: Property.BorderImageRepeat | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <number [0,∞]> | <percentage [0,∞]> ]{1,4}  && fill?`
   *
   * **Initial value**: `100%`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-slice
   */
  borderImageSlice?: Property.BorderImageSlice | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <image>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-source
   */
  borderImageSource?: Property.BorderImageSource | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <length-percentage [0,∞]> | <number [0,∞]> | auto ]{1,4}`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **16** | **13**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-width
   */
  borderImageWidth?: Property.BorderImageWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-color)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   */
  borderInlineEndColor?: Property.BorderInlineEndColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-style)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  borderInlineEndStyle?: Property.BorderInlineEndStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-width)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  borderInlineEndWidth?: Property.BorderInlineEndWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome |            Firefox            |  Safari  |  Edge  | IE  |
   * | :----: | :---------------------------: | :------: | :----: | :-: |
   * | **69** |            **41**             | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-start-color)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   */
  borderInlineStartColor?: Property.BorderInlineStartColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome |            Firefox            |  Safari  |  Edge  | IE  |
   * | :----: | :---------------------------: | :------: | :----: | :-: |
   * | **69** |            **41**             | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-start-style)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  borderInlineStartStyle?: Property.BorderInlineStartStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  borderInlineStartWidth?: Property.BorderInlineStartWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-color
   */
  borderLeftColor?: Property.BorderLeftColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  borderLeftStyle?: Property.BorderLeftStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   */
  borderLeftWidth?: Property.BorderLeftWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-color
   */
  borderRightColor?: Property.BorderRightColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  borderRightStyle?: Property.BorderRightStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   */
  borderRightWidth?: Property.BorderRightWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-spacing
   */
  borderSpacing?: Property.BorderSpacing<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-end-radius
   */
  borderStartEndRadius?: Property.BorderStartEndRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-start-radius
   */
  borderStartStartRadius?: Property.BorderStartStartRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-color
   */
  borderTopColor?: Property.BorderTopColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-left-radius
   */
  borderTopLeftRadius?: Property.BorderTopLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-right-radius
   */
  borderTopRightRadius?: Property.BorderTopRightRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  borderTopStyle?: Property.BorderTopStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   */
  borderTopWidth?: Property.BorderTopWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/bottom
   */
  bottom?: Property.Bottom<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `slice | clone`
   *
   * **Initial value**: `slice`
   *
   * |  Chrome  | Firefox |   Safari    |   Edge   | IE  |
   * | :------: | :-----: | :---------: | :------: | :-: |
   * | **130**  | **32**  | **7** _-x-_ | **130**  | No  |
   * | 22 _-x-_ |         |             | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break
   */
  boxDecorationBreak?: Property.BoxDecorationBreak | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * | **10**  |  **4**  | **5.1** | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-shadow
   */
  boxShadow?: Property.BoxShadow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `content-box | border-box`
   *
   * **Initial value**: `content-box`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * | **10**  | **29**  | **5.1** | **12** | **8** |
   * | 1 _-x-_ | 1 _-x-_ | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-sizing
   */
  boxSizing?: Property.BoxSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019.
   *
   * **Syntax**: `auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  breakAfter?: Property.BreakAfter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019.
   *
   * **Syntax**: `auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  breakBefore?: Property.BreakBefore | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019.
   *
   * **Syntax**: `auto | avoid | avoid-page | avoid-column | avoid-region`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  breakInside?: Property.BreakInside | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `top | bottom`
   *
   * **Initial value**: `top`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
   */
  captionSide?: Property.CaptionSide | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **53**  | **11.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   */
  caretColor?: Property.CaretColor | undefined;
  /**
   * **Syntax**: `auto | bar | block | underscore`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  caretShape?: Property.CaretShape | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | left | right | both | inline-start | inline-end`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  clear?: Property.Clear | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<clip-source> | [ <basic-shape> || <geometry-box> ] | none`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **55**  | **3.5** | **9.1** | **79** | **10** |
   * | 23 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  clipPath?: Property.ClipPath | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `nonzero | evenodd`
   *
   * **Initial value**: `nonzero`
   *
   * | Chrome  | Firefox | Safari |  Edge  | IE  |
   * | :-----: | :-----: | :----: | :----: | :-: |
   * | **≤15** | **3.5** | **≤5** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   */
  clipRule?: Property.ClipRule | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `canvastext`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color
   */
  color?: Property.Color | undefined;
  /**
   * Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `economy | exact`
   *
   * **Initial value**: `economy`
   *
   * |  Chrome  |       Firefox       |  Safari  |   Edge   | IE  |
   * | :------: | :-----------------: | :------: | :------: | :-: |
   * | **136**  |       **97**        | **15.4** | **136**  | No  |
   * | 17 _-x-_ | 48 _(color-adjust)_ | 6 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  colorAdjust?: Property.PrintColorAdjust | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | sRGB | linearRGB`
   *
   * **Initial value**: `linearRGB`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **3**  | **3**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   */
  colorInterpolationFilters?: Property.ColorInterpolationFilters | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2022.
   *
   * **Syntax**: `normal | [ light | dark | <custom-ident> ]+ && only?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **81** | **96**  | **13** | **81** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   */
  colorScheme?: Property.ColorScheme | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<integer> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-count
   */
  columnCount?: Property.ColumnCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `auto | balance`
   *
   * **Initial value**: `balance`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **50** | **52**  |  **9**  | **12** | **10** |
   * |        |         | 8 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
   */
  columnFill?: Property.ColumnFill | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **1**  | **1.5** | **3**  | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-gap
   */
  columnGap?: Property.ColumnGap<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
   */
  columnRuleColor?: Property.ColumnRuleColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  columnRuleStyle?: Property.ColumnRuleStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   */
  columnRuleWidth?: Property.ColumnRuleWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `none | all`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **50**  | **71**  |   **9**   | **12** | **10** |
   * | 6 _-x-_ |         | 5.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
   */
  columnSpan?: Property.ColumnSpan | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016.
   *
   * **Syntax**: `<length> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **50**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-width
   */
  columnWidth?: Property.ColumnWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | strict | content | [ [ size || inline-size ] || layout || style || paint ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **52** | **69**  | **15.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  contain?: Property.Contain | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size
   */
  containIntrinsicBlockSize?: Property.ContainIntrinsicBlockSize<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-height
   */
  containIntrinsicHeight?: Property.ContainIntrinsicHeight<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size
   */
  containIntrinsicInlineSize?: Property.ContainIntrinsicInlineSize<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-width
   */
  containIntrinsicWidth?: Property.ContainIntrinsicWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `none | <custom-ident>+`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **105** | **110** | **16** | **105** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-name
   */
  containerName?: Property.ContainerName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `normal | [ [ size | inline-size ] || scroll-state ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **105** | **110** | **16** | **105** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type
   */
  containerType?: Property.ContainerType | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | none | [ <content-replacement> | <content-list> ] [ / [ <string> | <counter> | <attr()> ]+ ]?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  content?: Property.Content | undefined;
  /**
   * Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `visible | auto | hidden`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **85** | **125** | **18** | **85** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content-visibility
   */
  contentVisibility?: Property.ContentVisibility | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <counter-name> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **3**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-increment
   */
  counterIncrement?: Property.CounterIncrement | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <counter-name> <integer>? | <reversed-counter-name> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **3**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-reset
   */
  counterReset?: Property.CounterReset | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <counter-name> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **85** | **68**  | **17.2** | **85** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set
   */
  counterSet?: Property.CounterSet | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since December 2021.
   *
   * **Syntax**: `[ [ <url> [ <x> <y> ]? , ]* <cursor-predefined> ]`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  cursor?: Property.Cursor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **43** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cx
   */
  cx?: Property.Cx<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **43** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cy
   */
  cy?: Property.Cy<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | path(<string>)`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **52** | **97**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/d
   */
  d?: Property.D | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `ltr | rtl`
   *
   * **Initial value**: `ltr`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **2**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
   */
  direction?: Property.Direction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>`
   *
   * **Initial value**: `inline`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  display?: Property.Display | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | text-bottom | alphabetic | ideographic | middle | central | mathematical | hanging | text-top`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **1**  | **4**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  dominantBaseline?: Property.DominantBaseline | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `show | hide`
   *
   * **Initial value**: `show`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
   */
  emptyCells?: Property.EmptyCells | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `content | fixed`
   *
   * **Initial value**: `fixed`
   *
   * | Chrome  | Firefox |   Safari    |  Edge   | IE  |
   * | :-----: | :-----: | :---------: | :-----: | :-: |
   * | **123** |   No    | **preview** | **123** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
   */
  fieldSizing?: Property.FieldSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<paint>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  fill?: Property.Fill | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **1**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-opacity
   */
  fillOpacity?: Property.FillOpacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `nonzero | evenodd`
   *
   * **Initial value**: `nonzero`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   */
  fillRule?: Property.FillRule | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `none | <filter-value-list>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  | IE  |
   * | :------: | :-----: | :-----: | :----: | :-: |
   * |  **53**  | **35**  | **9.1** | **12** | No  |
   * | 18 _-x-_ |         | 6 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter
   */
  filter?: Property.Filter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `content | <'width'>`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **22**  |  **9**  | **12** | **11** |
   * | 22 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  flexBasis?: Property.FlexBasis<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **22**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
   */
  flexDirection?: Property.FlexDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |            IE            |
   * | :------: | :-----: | :-----: | :----: | :----------------------: |
   * |  **29**  | **20**  |  **9**  | **12** |          **11**          |
   * | 22 _-x-_ |         | 7 _-x-_ |        | 10 _(-ms-flex-positive)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-grow
   */
  flexGrow?: Property.FlexGrow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `1`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **10** |
   * | 22 _-x-_ |         | 8 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-shrink
   */
  flexShrink?: Property.FlexShrink | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `nowrap | wrap | wrap-reverse`
   *
   * **Initial value**: `nowrap`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **28**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-wrap
   */
  flexWrap?: Property.FlexWrap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `left | right | none | inline-start | inline-end`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  float?: Property.Float | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **5**  |  **3**  | **6**  | **12** | **≤11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   */
  floodColor?: Property.FloodColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **5**  |  **3**  | **6**  | **12** | **≤11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-opacity
   */
  floodOpacity?: Property.FloodOpacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <family-name> | <generic-family> ]#`
   *
   * **Initial value**: depends on user agent
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  fontFamily?: Property.FontFamily | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `normal | <feature-tag-value>#`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **48**  |  **34**  | **9.1** | **15** | **10** |
   * | 16 _-x-_ | 15 _-x-_ |         |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-feature-settings
   */
  fontFeatureSettings?: Property.FontFeatureSettings | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | normal | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **33** | **32**  |  **9**  | **79** | No  |
   * |        |         | 6 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   */
  fontKerning?: Property.FontKerning | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | <string>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **143** | **34**  |   No   | **143** | No  |
   * |         | 4 _-x-_ |        |         |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override
   */
  fontLanguageOverride?: Property.FontLanguageOverride | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2020.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **79** | **62**  | **13.1** | **17** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
   */
  fontOpticalSizing?: Property.FontOpticalSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2022.
   *
   * **Syntax**: `normal | light | dark | <palette-identifier> | <palette-mix()>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **101** | **107** | **15.4** | **101** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   */
  fontPalette?: Property.FontPalette | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<absolute-size> | <relative-size> | <length-percentage [0,∞]> | math`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  fontSize?: Property.FontSize<TLength> | undefined;
  /**
   * Since July 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | [ ex-height | cap-height | ch-width | ic-width | ic-height ]? [ from-font | <number> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **127** |  **3**  | **16.4** | **127** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
   */
  fontSizeAdjust?: Property.FontSizeAdjust | undefined;
  /**
   * The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered.
   *
   * **Syntax**: `auto | never | always | <absolute-size> | <length>`
   *
   * **Initial value**: `auto`
   *
   * |              Chrome              |              Firefox               |              Safari              |               Edge                | IE  |
   * | :------------------------------: | :--------------------------------: | :------------------------------: | :-------------------------------: | :-: |
   * | **5** _(-webkit-font-smoothing)_ | **25** _(-moz-osx-font-smoothing)_ | **4** _(-webkit-font-smoothing)_ | **79** _(-webkit-font-smoothing)_ | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  fontSmooth?: Property.FontSmooth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | italic | oblique <angle>?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   */
  fontStyle?: Property.FontStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2022.
   *
   * **Syntax**: `none | [ weight || style || small-caps || position]`
   *
   * **Initial value**: `weight style small-caps position `
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **97** | **34**  | **9**  | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  fontSynthesis?: Property.FontSynthesis | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **118** |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
   */
  fontSynthesisPosition?: Property.FontSynthesisPosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **97** | **111** | **16.4** | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
   */
  fontSynthesisSmallCaps?: Property.FontSynthesisSmallCaps | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **97** | **111** | **16.4** | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
   */
  fontSynthesisStyle?: Property.FontSynthesisStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **97** | **111** | **16.4** | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
   */
  fontSynthesisWeight?: Property.FontSynthesisWeight | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  fontVariant?: Property.FontVariant | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :-----: | :-----: | :-: |
   * | **111** | **34**  | **9.1** | **111** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
   */
  fontVariantAlternates?: Property.FontVariantAlternates | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **52** | **34**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  fontVariantCaps?: Property.FontVariantCaps | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **63** | **34**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  fontVariantEastAsian?: Property.FontVariantEastAsian | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | text | emoji | unicode`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **131** | **141** |   No   | **131** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  fontVariantEmoji?: Property.FontVariantEmoji | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  | IE  |
   * | :------: | :-----: | :-----: | :----: | :-: |
   * |  **34**  | **34**  | **9.1** | **79** | No  |
   * | 31 _-x-_ |         | 7 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  fontVariantLigatures?: Property.FontVariantLigatures | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **52** | **34**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  fontVariantNumeric?: Property.FontVariantNumeric | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | sub | super`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  | Edge | IE  |
   * | :----: | :-----: | :-----: | :--: | :-: |
   * |   No   | **34**  | **9.1** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   */
  fontVariantPosition?: Property.FontVariantPosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2018.
   *
   * **Syntax**: `normal | [ <string> <number> ]#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **62** | **62**  | **11** | **17** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variation-settings
   */
  fontVariationSettings?: Property.FontVariationSettings | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<font-weight-absolute> | bolder | lighter`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-weight
   */
  fontWeight?: Property.FontWeight | undefined;
  /**
   * **Syntax**: `normal | <percentage [0,∞]> | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **18.4** |  No  | No  |
   */
  fontWidth?: Property.FontWidth | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | none | preserve-parent-color`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |              Edge               |                 IE                  |
   * | :----: | :-----: | :----: | :-----------------------------: | :---------------------------------: |
   * | **89** | **113** |   No   |             **79**              | **10** _(-ms-high-contrast-adjust)_ |
   * |        |         |        | 12 _(-ms-high-contrast-adjust)_ |                                     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   */
  forcedColorAdjust?: Property.ForcedColorAdjust | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<track-size>+`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |             IE              |
   * | :----: | :-----: | :------: | :----: | :-------------------------: |
   * | **57** | **70**  | **10.1** | **16** | **10** _(-ms-grid-columns)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   */
  gridAutoColumns?: Property.GridAutoColumns<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `[ row | column ] || dense`
   *
   * **Initial value**: `row`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-flow
   */
  gridAutoFlow?: Property.GridAutoFlow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<track-size>+`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |            IE            |
   * | :----: | :-----: | :------: | :----: | :----------------------: |
   * | **57** | **70**  | **10.1** | **16** | **10** _(-ms-grid-rows)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   */
  gridAutoRows?: Property.GridAutoRows<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-end
   */
  gridColumnEnd?: Property.GridColumnEnd | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-start
   */
  gridColumnStart?: Property.GridColumnStart | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-end
   */
  gridRowEnd?: Property.GridRowEnd | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-start
   */
  gridRowStart?: Property.GridRowStart | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | <string>+`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-areas
   */
  gridTemplateAreas?: Property.GridTemplateAreas | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | <track-list> | <auto-track-list> | subgrid <line-name-list>?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |             IE              |
   * | :----: | :-----: | :------: | :----: | :-------------------------: |
   * | **57** | **52**  | **10.1** | **16** | **10** _(-ms-grid-columns)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   */
  gridTemplateColumns?: Property.GridTemplateColumns<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | <track-list> | <auto-track-list> | subgrid <line-name-list>?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |            IE            |
   * | :----: | :-----: | :------: | :----: | :----------------------: |
   * | **57** | **52**  | **10.1** | **16** | **10** _(-ms-grid-rows)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   */
  gridTemplateRows?: Property.GridTemplateRows<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ first || [ force-end | allow-end ] || last ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    | **10** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  hangingPunctuation?: Property.HangingPunctuation | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  height?: Property.Height<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | <string>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari   |   Edge   | IE  |
   * | :-----: | :-----: | :-------: | :------: | :-: |
   * | **106** | **98**  |  **17**   | **106**  | No  |
   * | 6 _-x-_ |         | 5.1 _-x-_ | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-character
   */
  hyphenateCharacter?: Property.HyphenateCharacter | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ auto | <integer> ]{1,3}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **109** | **137** |   No   | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-limit-chars
   */
  hyphenateLimitChars?: Property.HyphenateLimitChars | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |      IE      |
   * | :------: | :-----: | :-------: | :----: | :----------: |
   * |  **55**  | **43**  |  **17**   | **79** | **10** _-x-_ |
   * | 13 _-x-_ | 6 _-x-_ | 5.1 _-x-_ |        |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   */
  hyphens?: Property.Hyphens | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2020.
   *
   * **Syntax**: `from-image | <angle> | [ <angle>? flip ]`
   *
   * **Initial value**: `from-image`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **81** | **26**  | **13.1** | **81** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-orientation
   */
  imageOrientation?: Property.ImageOrientation | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | crisp-edges | pixelated | smooth`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **13** | **3.6** | **6**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  imageRendering?: Property.ImageRendering | undefined;
  /**
   * The **`image-resolution`** CSS property specifies the intrinsic resolution of all raster images used in or on the element. It affects content images such as replaced elements and generated content, and decorative images such as `background-image` images.
   *
   * **Syntax**: `[ from-image || <resolution> ] && snap?`
   *
   * **Initial value**: `1dppx`
   */
  imageResolution?: Property.ImageResolution | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | [ <number> <integer>? ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |   Safari    |  Edge   | IE  |
   * | :-----: | :-----: | :---------: | :-----: | :-: |
   * | **110** |   No    | **9** _-x-_ | **110** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter
   */
  initialLetter?: Property.InitialLetter | undefined;
  /**
   * **Syntax**: `[ auto | alphabetic | hanging | ideographic ]`
   *
   * **Initial value**: `auto`
   */
  initialLetterAlign?: Property.InitialLetterAlign | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   *
   * |           Chrome            | Firefox |            Safari             |  Edge  | IE  |
   * | :-------------------------: | :-----: | :---------------------------: | :----: | :-: |
   * |           **57**            | **41**  |           **12.1**            | **79** | No  |
   * | 8 _(-webkit-logical-width)_ |         | 5.1 _(-webkit-logical-width)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  inlineSize?: Property.InlineSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-end
   */
  insetBlockEnd?: Property.InsetBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-start
   */
  insetBlockStart?: Property.InsetBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   */
  insetInlineEnd?: Property.InsetInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   */
  insetInlineStart?: Property.InsetInlineStart<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `numeric-only | allow-keywords`
   *
   * **Initial value**: `numeric-only`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **129** |   No    |   No   | **129** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size
   */
  interpolateSize?: Property.InterpolateSize | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | isolate`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **41** | **36**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/isolation
   */
  isolation?: Property.Isolation | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  justifyContent?: Property.JustifyContent | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2016.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ] | anchor-center`
   *
   * **Initial value**: `legacy`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **52** | **20**  | **9**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  justifyItems?: Property.JustifyItems | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | anchor-center`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :------: | :----: | :----: |
   * | **57** | **45**  | **10.1** | **16** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  justifySelf?: Property.JustifySelf | undefined;
  /**
   * **Syntax**: `[ normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ] ]#`
   *
   * **Initial value**: `normal`
   */
  justifyTracks?: Property.JustifyTracks | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/left
   */
  left?: Property.Left<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <length>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/letter-spacing
   */
  letterSpacing?: Property.LetterSpacing<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `white`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **5**  |  **3**  | **6**  | **12** | **≤11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/lighting-color
   */
  lightingColor?: Property.LightingColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE    |
   * | :-----: | :-----: | :-----: | :----: | :-----: |
   * | **58**  | **69**  | **11**  | **14** | **5.5** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |         |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  lineBreak?: Property.LineBreak | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <number> | <length> | <percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height
   */
  lineHeight?: Property.LineHeight<TLength> | undefined;
  /**
   * The **`line-height-step`** CSS property sets the step unit for line box heights. When the property is set, line box heights are rounded up to the closest multiple of the unit.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  lineHeightStep?: Property.LineHeightStep<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<image> | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-image
   */
  listStyleImage?: Property.ListStyleImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `inside | outside`
   *
   * **Initial value**: `outside`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-position
   */
  listStylePosition?: Property.ListStylePosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<counter-style> | <string> | none`
   *
   * **Initial value**: `disc`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-type
   */
  listStyleType?: Property.ListStyleType | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-end
   */
  marginBlockEnd?: Property.MarginBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-start
   */
  marginBlockStart?: Property.MarginBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-bottom
   */
  marginBottom?: Property.MarginBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome          |        Firefox        |          Safari          |  Edge  | IE  |
   * | :----------------------: | :-------------------: | :----------------------: | :----: | :-: |
   * |          **69**          |        **41**         |         **12.1**         | **79** | No  |
   * | 2 _(-webkit-margin-end)_ | 3 _(-moz-margin-end)_ | 3 _(-webkit-margin-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   */
  marginInlineEnd?: Property.MarginInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome           |         Firefox         |           Safari           |  Edge  | IE  |
   * | :------------------------: | :---------------------: | :------------------------: | :----: | :-: |
   * |           **69**           |         **41**          |          **12.1**          | **79** | No  |
   * | 2 _(-webkit-margin-start)_ | 3 _(-moz-margin-start)_ | 3 _(-webkit-margin-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   */
  marginInlineStart?: Property.MarginInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-left
   */
  marginLeft?: Property.MarginLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-right
   */
  marginRight?: Property.MarginRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-top
   */
  marginTop?: Property.MarginTop<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | in-flow | all`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **16.4** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   */
  marginTrim?: Property.MarginTrim | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker
   */
  marker?: Property.Marker | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-end
   */
  markerEnd?: Property.MarkerEnd | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-mid
   */
  markerMid?: Property.MarkerMid | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-start
   */
  markerStart?: Property.MarkerStart | undefined;
  /**
   * The **`mask-border-mode`** CSS property specifies the blending mode used in a mask border.
   *
   * **Syntax**: `luminance | alpha`
   *
   * **Initial value**: `alpha`
   */
  maskBorderMode?: Property.MaskBorderMode | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <length> | <number> ]{1,4}`
   *
   * **Initial value**: `0`
   *
   * |                 Chrome                  | Firefox |                Safari                 |                   Edge                   | IE  |
   * | :-------------------------------------: | :-----: | :-----------------------------------: | :--------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-outset)_ |   No    |               **17.2**                | **79** _(-webkit-mask-box-image-outset)_ | No  |
   * |                                         |         | 3.1 _(-webkit-mask-box-image-outset)_ |                                          |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-outset
   */
  maskBorderOutset?: Property.MaskBorderOutset<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ stretch | repeat | round | space ]{1,2}`
   *
   * **Initial value**: `stretch`
   *
   * |                 Chrome                  | Firefox |                Safari                 |                   Edge                   | IE  |
   * | :-------------------------------------: | :-----: | :-----------------------------------: | :--------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-repeat)_ |   No    |               **17.2**                | **79** _(-webkit-mask-box-image-repeat)_ | No  |
   * |                                         |         | 3.1 _(-webkit-mask-box-image-repeat)_ |                                          |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  maskBorderRepeat?: Property.MaskBorderRepeat | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<number-percentage>{1,4} fill?`
   *
   * **Initial value**: `0`
   *
   * |                 Chrome                 | Firefox |                Safari                |                  Edge                   | IE  |
   * | :------------------------------------: | :-----: | :----------------------------------: | :-------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-slice)_ |   No    |               **17.2**               | **79** _(-webkit-mask-box-image-slice)_ | No  |
   * |                                        |         | 3.1 _(-webkit-mask-box-image-slice)_ |                                         |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-slice
   */
  maskBorderSlice?: Property.MaskBorderSlice | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <image>`
   *
   * **Initial value**: `none`
   *
   * |                 Chrome                  | Firefox |                Safari                 |                   Edge                   | IE  |
   * | :-------------------------------------: | :-----: | :-----------------------------------: | :--------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-source)_ |   No    |               **17.2**                | **79** _(-webkit-mask-box-image-source)_ | No  |
   * |                                         |         | 3.1 _(-webkit-mask-box-image-source)_ |                                          |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-source
   */
  maskBorderSource?: Property.MaskBorderSource | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <length-percentage> | <number> | auto ]{1,4}`
   *
   * **Initial value**: `auto`
   *
   * |                 Chrome                 | Firefox |                Safari                |                  Edge                   | IE  |
   * | :------------------------------------: | :-----: | :----------------------------------: | :-------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-width)_ |   No    |               **17.2**               | **79** _(-webkit-mask-box-image-width)_ | No  |
   * |                                        |         | 3.1 _(-webkit-mask-box-image-width)_ |                                         |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-width
   */
  maskBorderWidth?: Property.MaskBorderWidth<TLength> | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <coord-box> | no-clip ]#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome  | Firefox |  Safari  |   Edge   | IE  |
   * | :-----: | :-----: | :------: | :------: | :-: |
   * | **120** | **53**  | **15.4** | **120**  | No  |
   * | 1 _-x-_ |         | 4 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  maskClip?: Property.MaskClip | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<compositing-operator>#`
   *
   * **Initial value**: `add`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **120** | **53**  | **15.4** | 18-79 | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  maskComposite?: Property.MaskComposite | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<mask-reference>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **120** | **53**  | **15.4** | 16-79 | No  |
   * | 1 _-x-_ |         | 4 _-x-_  |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-image
   */
  maskImage?: Property.MaskImage | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<masking-mode>#`
   *
   * **Initial value**: `match-source`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **120** | **53**  | **15.4** | **120** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   */
  maskMode?: Property.MaskMode | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<coord-box>#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome  | Firefox |  Safari  |   Edge   | IE  |
   * | :-----: | :-----: | :------: | :------: | :-: |
   * | **120** | **53**  | **15.4** | **120**  | No  |
   * | 1 _-x-_ |         | 4 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  maskOrigin?: Property.MaskOrigin | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<position>#`
   *
   * **Initial value**: `0% 0%`
   *
   * | Chrome  | Firefox |  Safari   | Edge  | IE  |
   * | :-----: | :-----: | :-------: | :---: | :-: |
   * | **120** | **53**  | **15.4**  | 18-79 | No  |
   * | 1 _-x-_ |         | 3.1 _-x-_ |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  maskPosition?: Property.MaskPosition<TLength> | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   *
   * | Chrome  | Firefox |  Safari   | Edge  | IE  |
   * | :-----: | :-----: | :-------: | :---: | :-: |
   * | **120** | **53**  | **15.4**  | 18-79 | No  |
   * | 1 _-x-_ |         | 3.1 _-x-_ |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  maskRepeat?: Property.MaskRepeat | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **120** | **53**  | **15.4** | 18-79 | No  |
   * | 4 _-x-_ |         | 4 _-x-_  |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   */
  maskSize?: Property.MaskSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `luminance | alpha`
   *
   * **Initial value**: `luminance`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **24** | **35**  | **7**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-type
   */
  maskType?: Property.MaskType | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `[ pack | next ] || [ definite-first | ordered ]`
   *
   * **Initial value**: `pack`
   */
  masonryAutoFlow?: Property.MasonryAutoFlow | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto-add | add(<integer>) | <integer>`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **109** | **117** |   No   | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-depth
   */
  mathDepth?: Property.MathDepth | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | compact`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **109** |   No    |   No   | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-shift
   */
  mathShift?: Property.MathShift | undefined;
  /**
   * Since August 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | compact`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **109** | **117** | **14.1** | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-style
   */
  mathStyle?: Property.MathStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  maxBlockSize?: Property.MaxBlockSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  maxHeight?: Property.MaxHeight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |   Safari   |  Edge  | IE  |
   * | :----: | :-----: | :--------: | :----: | :-: |
   * | **57** | **41**  |  **12.1**  | **79** | No  |
   * |        |         | 10.1 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  maxInlineSize?: Property.MaxInlineSize<TLength> | undefined;
  /**
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   */
  maxLines?: Property.MaxLines | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  maxWidth?: Property.MaxWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  minBlockSize?: Property.MinBlockSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **3**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  minHeight?: Property.MinHeight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  minInlineSize?: Property.MinInlineSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  minWidth?: Property.MinWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<blend-mode> | plus-darker | plus-lighter`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **41** | **32**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  mixBlendMode?: Property.MixBlendMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **55**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-distance)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  motionDistance?: Property.OffsetDistance<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | <offset-path> || <coord-box>`
   *
   * **Initial value**: `none`
   *
   * |       Chrome       | Firefox |  Safari  |  Edge  | IE  |
   * | :----------------: | :-----: | :------: | :----: | :-: |
   * |       **55**       | **72**  | **15.4** | **79** | No  |
   * | 46 _(motion-path)_ |         |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  motionPath?: Property.OffsetPath | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ auto | reverse ] || <angle>`
   *
   * **Initial value**: `auto`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **56**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-rotation)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  motionRotation?: Property.OffsetRotate | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `fill | contain | cover | none | scale-down`
   *
   * **Initial value**: `fill`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **32** | **36**  | **10** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
   */
  objectFit?: Property.ObjectFit | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **32** | **36**  | **10** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  objectPosition?: Property.ObjectPosition<TLength> | undefined;
  /**
   * **Syntax**: `none | <basic-shape-rect>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **104** |   No    |   No   | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-view-box
   */
  objectViewBox?: Property.ObjectViewBox | undefined;
  /**
   * Since August 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | <position>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **116** | **72**  | **16** | **116** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  offsetAnchor?: Property.OffsetAnchor<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **55**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-distance)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  offsetDistance?: Property.OffsetDistance<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | <offset-path> || <coord-box>`
   *
   * **Initial value**: `none`
   *
   * |       Chrome       | Firefox |  Safari  |  Edge  | IE  |
   * | :----------------: | :-----: | :------: | :----: | :-: |
   * |       **55**       | **72**  | **15.4** | **79** | No  |
   * | 46 _(motion-path)_ |         |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  offsetPath?: Property.OffsetPath | undefined;
  /**
   * Since January 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | auto | <position>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **116** | **122** | **16** | **116** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  offsetPosition?: Property.OffsetPosition<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ auto | reverse ] || <angle>`
   *
   * **Initial value**: `auto`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **56**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-rotation)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  offsetRotate?: Property.OffsetRotate | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ auto | reverse ] || <angle>`
   *
   * **Initial value**: `auto`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **56**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-rotation)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  offsetRotation?: Property.OffsetRotate | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<opacity-value>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **2**  | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/opacity
   */
  opacity?: Property.Opacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **20**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/order
   */
  order?: Property.Order | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `2`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **25** |   No    | **1.3** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/orphans
   */
  orphans?: Property.Orphans | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  outlineColor?: Property.OutlineColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **1**  | **1.5** | **1.2** | **15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-offset
   */
  outlineOffset?: Property.OutlineOffset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <outline-line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  outlineStyle?: Property.OutlineStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  outlineWidth?: Property.OutlineWidth<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |   Safari    |  Edge  | IE  |
   * | :----: | :-----: | :---------: | :----: | :-: |
   * | **56** | **66**  | **preview** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor
   */
  overflowAnchor?: Property.OverflowAnchor | undefined;
  /**
   * Since September 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **135** | **69**  | **26** | **135** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  overflowBlock?: Property.OverflowBlock | undefined;
  /**
   * **Syntax**: `padding-box | content-box`
   *
   * **Initial value**: `padding-box`
   */
  overflowClipBox?: Property.OverflowClipBox | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<visual-box> || <length [0,∞]>`
   *
   * **Initial value**: `0px`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **90** | **102** |   No   | **90** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   */
  overflowClipMargin?: Property.OverflowClipMargin<TLength> | undefined;
  /**
   * Since September 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **135** | **69**  | **26** | **135** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  overflowInline?: Property.OverflowInline | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2018.
   *
   * **Syntax**: `normal | break-word | anywhere`
   *
   * **Initial value**: `normal`
   *
   * |     Chrome      |      Firefox      |     Safari      |       Edge       |          IE           |
   * | :-------------: | :---------------: | :-------------: | :--------------: | :-------------------: |
   * |     **23**      |      **49**       |      **7**      |      **18**      | **5.5** _(word-wrap)_ |
   * | 1 _(word-wrap)_ | 3.5 _(word-wrap)_ | 1 _(word-wrap)_ | 12 _(word-wrap)_ |                       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-wrap
   */
  overflowWrap?: Property.OverflowWrap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **3.5** | **3**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  overflowX?: Property.OverflowX | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **3.5** | **3**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  overflowY?: Property.OverflowY | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | auto`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **117** |   No    |   No   | **117** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overlay
   */
  overlay?: Property.Overlay | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **77** | **73**  | **16** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   */
  overscrollBehaviorBlock?: Property.OverscrollBehaviorBlock | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **77** | **73**  | **16** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   */
  overscrollBehaviorInline?: Property.OverscrollBehaviorInline | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  | **16** | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   */
  overscrollBehaviorX?: Property.OverscrollBehaviorX | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  | **16** | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   */
  overscrollBehaviorY?: Property.OverscrollBehaviorY | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-end
   */
  paddingBlockEnd?: Property.PaddingBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-start
   */
  paddingBlockStart?: Property.PaddingBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-bottom
   */
  paddingBottom?: Property.PaddingBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome           |        Firefox         |          Safari           |  Edge  | IE  |
   * | :-----------------------: | :--------------------: | :-----------------------: | :----: | :-: |
   * |          **69**           |         **41**         |         **12.1**          | **79** | No  |
   * | 2 _(-webkit-padding-end)_ | 3 _(-moz-padding-end)_ | 3 _(-webkit-padding-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
   */
  paddingInlineEnd?: Property.PaddingInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome            |         Firefox          |           Safari            |  Edge  | IE  |
   * | :-------------------------: | :----------------------: | :-------------------------: | :----: | :-: |
   * |           **69**            |          **41**          |          **12.1**           | **79** | No  |
   * | 2 _(-webkit-padding-start)_ | 3 _(-moz-padding-start)_ | 3 _(-webkit-padding-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
   */
  paddingInlineStart?: Property.PaddingInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-left
   */
  paddingLeft?: Property.PaddingLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-right
   */
  paddingRight?: Property.PaddingRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-top
   */
  paddingTop?: Property.PaddingTop<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `auto | <custom-ident>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **85** | **110** | **1**  | **85** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/page
   */
  page?: Property.Page | undefined;
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | [ fill || stroke || markers ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **123** | **60**  | **11** | **123** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  paintOrder?: Property.PaintOrder | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <length>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **36**  |  **16**  |  **9**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective
   */
  perspective?: Property.Perspective<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **36**  |  **16**  |  **9**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  perspectiveOrigin?: Property.PerspectiveOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **1**  | **1.5** | **4**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  pointerEvents?: Property.PointerEvents | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `static | relative | absolute | sticky | fixed`
   *
   * **Initial value**: `static`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  position?: Property.Position | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | <anchor-name>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-anchor
   */
  positionAnchor?: Property.PositionAnchor | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <position-area>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **129** | **preview** | **26** | **129** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  positionArea?: Property.PositionArea | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ [<dashed-ident> || <try-tactic>] | <'position-area'> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **128** | **preview** | **26** | **128** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  positionTryFallbacks?: Property.PositionTryFallbacks | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | <try-size>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **125** |   No    | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  positionTryOrder?: Property.PositionTryOrder | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `always | [ anchors-valid || anchors-visible || no-overflow ]`
   *
   * **Initial value**: `anchors-visible`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** |   No   | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  positionVisibility?: Property.PositionVisibility | undefined;
  /**
   * Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `economy | exact`
   *
   * **Initial value**: `economy`
   *
   * |  Chrome  |       Firefox       |  Safari  |   Edge   | IE  |
   * | :------: | :-----------------: | :------: | :------: | :-: |
   * | **136**  |       **97**        | **15.4** | **136**  | No  |
   * | 17 _-x-_ | 48 _(color-adjust)_ | 6 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  printColorAdjust?: Property.PrintColorAdjust | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | auto | [ <string> <string> ]+`
   *
   * **Initial value**: depends on user agent
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **11** | **1.5** | **9**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
   */
  quotes?: Property.Quotes | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **43** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/r
   */
  r?: Property.R<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | both | horizontal | vertical | block | inline`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **4**  | **3**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  resize?: Property.Resize | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/right
   */
  right?: Property.Right<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022.
   *
   * **Syntax**: `none | <angle> | [ x | y | z | <number>{3} ] && <angle>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **104** | **72**  | **14.1** | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rotate
   */
  rotate?: Property.Rotate | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **47** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/row-gap
   */
  rowGap?: Property.RowGap<TLength> | undefined;
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `start | center | space-between | space-around`
   *
   * **Initial value**: `space-around`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **128** | **38**  | **18.2** | **128** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  rubyAlign?: Property.RubyAlign | undefined;
  /**
   * **Syntax**: `separate | collapse | auto`
   *
   * **Initial value**: `separate`
   */
  rubyMerge?: Property.RubyMerge | undefined;
  /**
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **18.2** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang
   */
  rubyOverhang?: Property.RubyOverhang | undefined;
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ alternate || [ over | under ] ] | inter-character`
   *
   * **Initial value**: `alternate`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **84**  | **38**  | **18.2** | 12-79 | No  |
   * | 1 _-x-_ |         | 7 _-x-_  |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  rubyPosition?: Property.RubyPosition | undefined;
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **43** | **69**  | **17.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rx
   */
  rx?: Property.Rx<TLength> | undefined;
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **43** | **69**  | **17.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ry
   */
  ry?: Property.Ry<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022.
   *
   * **Syntax**: `none | [ <number> | <percentage> ]{1,3}`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **104** | **72**  | **14.1** | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale
   */
  scale?: Property.Scale | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | smooth`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **61** | **36**  | **15.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-behavior
   */
  scrollBehavior?: Property.ScrollBehavior | undefined;
  /**
   * **Syntax**: `none | nearest`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **133** |   No    |   No   | **133** | No  |
   */
  scrollInitialTarget?: Property.ScrollInitialTarget | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-end
   */
  scrollMarginBlockEnd?: Property.ScrollMarginBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-start
   */
  scrollMarginBlockStart?: Property.ScrollMarginBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |              Safari              |  Edge  | IE  |
   * | :----: | :-----: | :------------------------------: | :----: | :-: |
   * | **69** | **68**  |             **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-bottom)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  scrollMarginBottom?: Property.ScrollMarginBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-end
   */
  scrollMarginInlineEnd?: Property.ScrollMarginInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-start
   */
  scrollMarginInlineStart?: Property.ScrollMarginInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari             |  Edge  | IE  |
   * | :----: | :-----: | :----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-left)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  scrollMarginLeft?: Property.ScrollMarginLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari              |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-right)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  scrollMarginRight?: Property.ScrollMarginRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |            Safari             |  Edge  | IE  |
   * | :----: | :-----: | :---------------------------: | :----: | :-: |
   * | **69** | **68**  |           **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-top)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  scrollMarginTop?: Property.ScrollMarginTop<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-end
   */
  scrollPaddingBlockEnd?: Property.ScrollPaddingBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-start
   */
  scrollPaddingBlockStart?: Property.ScrollPaddingBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-bottom
   */
  scrollPaddingBottom?: Property.ScrollPaddingBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end
   */
  scrollPaddingInlineEnd?: Property.ScrollPaddingInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start
   */
  scrollPaddingInlineStart?: Property.ScrollPaddingInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-left
   */
  scrollPaddingLeft?: Property.ScrollPaddingLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-right
   */
  scrollPaddingRight?: Property.ScrollPaddingRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-top
   */
  scrollPaddingTop?: Property.ScrollPaddingTop<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `[ none | start | end | center ]{1,2}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  scrollSnapAlign?: Property.ScrollSnapAlign | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |              Safari              |  Edge  | IE  |
   * | :----: | :-----: | :------------------------------: | :----: | :-: |
   * | **69** | **68**  |             **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-bottom)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  scrollSnapMarginBottom?: Property.ScrollMarginBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari             |  Edge  | IE  |
   * | :----: | :-----: | :----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-left)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  scrollSnapMarginLeft?: Property.ScrollMarginLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari              |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-right)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  scrollSnapMarginRight?: Property.ScrollMarginRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |            Safari             |  Edge  | IE  |
   * | :----: | :-----: | :---------------------------: | :----: | :-: |
   * | **69** | **68**  |           **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-top)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  scrollSnapMarginTop?: Property.ScrollMarginTop<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2022.
   *
   * **Syntax**: `normal | always`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **75** | **103** | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
   */
  scrollSnapStop?: Property.ScrollSnapStop | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2022.
   *
   * **Syntax**: `none | [ x | y | block | inline | both ] [ mandatory | proximity ]?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |      IE      |
   * | :----: | :-----: | :-----: | :----: | :----------: |
   * | **69** |  39-68  | **11**  | **79** | **10** _-x-_ |
   * |        |         | 9 _-x-_ |        |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  scrollSnapType?: Property.ScrollSnapType | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ block | inline | x | y ]#`
   *
   * **Initial value**: `block`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  scrollTimelineAxis?: Property.ScrollTimelineAxis | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ none | <dashed-ident> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-name
   */
  scrollTimelineName?: Property.ScrollTimelineName | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | <color>{2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **121** | **64**  |   No   | **121** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color
   */
  scrollbarColor?: Property.ScrollbarColor | undefined;
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | stable && both-edges?`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **94** | **97**  | **18.2** | **94** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
   */
  scrollbarGutter?: Property.ScrollbarGutter | undefined;
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | thin | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **121** | **64**  | **18.2** | **121** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   */
  scrollbarWidth?: Property.ScrollbarWidth | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<opacity-value>`
   *
   * **Initial value**: `0.0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-image-threshold
   */
  shapeImageThreshold?: Property.ShapeImageThreshold | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-margin
   */
  shapeMargin?: Property.ShapeMargin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | [ <shape-box> || <basic-shape> ] | <image>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  shapeOutside?: Property.ShapeOutside | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | optimizeSpeed | crispEdges | geometricPrecision`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **3**  | **4**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  shapeRendering?: Property.ShapeRendering | undefined;
  /**
   * **Syntax**: `normal | spell-out || digits || [ literal-punctuation | no-punctuation ]`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **11.1** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  speakAs?: Property.SpeakAs | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'color'>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   */
  stopColor?: Property.StopColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-opacity
   */
  stopOpacity?: Property.StopOpacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<paint>`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  stroke?: Property.Stroke | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `transparent`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **11.1** |  No  | No  |
   */
  strokeColor?: Property.StrokeColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <dasharray>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
   */
  strokeDasharray?: Property.StrokeDasharray<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length-percentage> | <number>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dashoffset
   */
  strokeDashoffset?: Property.StrokeDashoffset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `butt | round | square`
   *
   * **Initial value**: `butt`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  strokeLinecap?: Property.StrokeLinecap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `miter | miter-clip | round | bevel | arcs`
   *
   * **Initial value**: `miter`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  strokeLinejoin?: Property.StrokeLinejoin | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `4`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-miterlimit
   */
  strokeMiterlimit?: Property.StrokeMiterlimit | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-opacity
   */
  strokeOpacity?: Property.StrokeOpacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length-percentage> | <number>`
   *
   * **Initial value**: `1px`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-width
   */
  strokeWidth?: Property.StrokeWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021.
   *
   * **Syntax**: `<integer> | <length>`
   *
   * **Initial value**: `8`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **21** | **91**  | **7**  | **79** | No  |
   * |        | 4 _-x-_ |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/tab-size
   */
  tabSize?: Property.TabSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | fixed`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **14** |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
   */
  tableLayout?: Property.TableLayout | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `start | end | left | right | center | justify | match-parent`
   *
   * **Initial value**: `start`, or a nameless value that acts as `left` if _direction_ is `ltr`, `right` if _direction_ is `rtl` if `start` is not supported by the browser.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  textAlign?: Property.TextAlign | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `auto | start | end | left | right | center | justify`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **47** | **49**  | **16** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  textAlignLast?: Property.TextAlignLast | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2016.
   *
   * **Syntax**: `start | middle | end`
   *
   * **Initial value**: `start`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤14** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   */
  textAnchor?: Property.TextAnchor | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | <autospace> | auto`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **140** | **145** | **18.4** | **140** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  textAutospace?: Property.TextAutospace | undefined;
  /**
   * **Syntax**: `normal | <'text-box-trim'> || <'text-box-edge'>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **133** |   No    | **18.2** | **133** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  textBox?: Property.TextBox | undefined;
  /**
   * **Syntax**: `auto | <text-edge>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **133** |   No    | **18.2** | **133** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  textBoxEdge?: Property.TextBoxEdge | undefined;
  /**
   * **Syntax**: `none | trim-start | trim-end | trim-both`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **133** |   No    | **18.2** | **133** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  textBoxTrim?: Property.TextBoxTrim | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   *
   * |           Chrome           | Firefox |            Safari            |  Edge  |                   IE                   |
   * | :------------------------: | :-----: | :--------------------------: | :----: | :------------------------------------: |
   * |           **48**           | **48**  |           **15.4**           | **79** | **11** _(-ms-text-combine-horizontal)_ |
   * | 9 _(-webkit-text-combine)_ |         | 5.1 _(-webkit-text-combine)_ |        |                                        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   */
  textCombineUpright?: Property.TextCombineUpright | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
   */
  textDecorationColor?: Property.TextDecorationColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  textDecorationLine?: Property.TextDecorationLine | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]`
   *
   * **Initial value**: `objects`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * | 57-64  |   No    | **12.1** |  No  | No  |
   * |        |         | 7 _-x-_  |      |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  textDecorationSkip?: Property.TextDecorationSkip | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | all | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **64** | **70**  | **15.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   */
  textDecorationSkipInk?: Property.TextDecorationSkipInk | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `solid | double | dotted | dashed | wavy`
   *
   * **Initial value**: `solid`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  textDecorationStyle?: Property.TextDecorationStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2021.
   *
   * **Syntax**: `auto | from-font | <length> | <percentage> `
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **89** | **70**  | **12.1** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
   */
  textDecorationThickness?: Property.TextDecorationThickness<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
   */
  textEmphasisColor?: Property.TextEmphasisColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | [ over | under ] && [ right | left ]?`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   */
  textEmphasisPosition?: Property.TextEmphasisPosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  textEmphasisStyle?: Property.TextEmphasisStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> && hanging? && each-line?`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-indent
   */
  textIndent?: Property.TextIndent<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | inter-character | inter-word | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge  |   IE   |
   * | :----: | :-----: | :----: | :---: | :----: |
   * |   No   | **55**  |   No   | 12-79 | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  textJustify?: Property.TextJustify | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2020.
   *
   * **Syntax**: `mixed | upright | sideways`
   *
   * **Initial value**: `mixed`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  | IE  |
   * | :------: | :-----: | :-------: | :----: | :-: |
   * |  **48**  | **41**  |  **14**   | **79** | No  |
   * | 12 _-x-_ |         | 5.1 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  textOrientation?: Property.TextOrientation | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ clip | ellipsis | <string> ]{1,2}`
   *
   * **Initial value**: `clip`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **7**  | **1.3** | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-overflow
   */
  textOverflow?: Property.TextOverflow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | optimizeSpeed | optimizeLegibility | geometricPrecision`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **4**  |  **1**  | **5**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  textRendering?: Property.TextRendering | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow-t>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **2**  | **3.5** | **1.1** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-shadow
   */
  textShadow?: Property.TextShadow | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | auto | <percentage>`
   *
   * **Initial value**: `auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **54** |   No    |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
   */
  textSizeAdjust?: Property.TextSizeAdjust | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `space-all | normal | space-first | trim-start`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **123** |   No    |   No   | **123** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  textSpacingTrim?: Property.TextSpacingTrim | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | [ capitalize | uppercase | lowercase ] || full-width || full-size-kana | math-auto`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  textTransform?: Property.TextTransform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2020.
   *
   * **Syntax**: `auto | <length> | <percentage> `
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **70**  | **12.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-offset
   */
  textUnderlineOffset?: Property.TextUnderlineOffset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | from-font | [ under || [ left | right ] ]`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :------: | :----: | :---: |
   * | **33** | **74**  | **12.1** | **12** | **6** |
   * |        |         | 9 _-x-_  |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  textUnderlinePosition?: Property.TextUnderlinePosition | undefined;
  /**
   * Since October 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `wrap | nowrap`
   *
   * **Initial value**: `wrap`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **130** | **124** | **17.4** | **130** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
   */
  textWrapMode?: Property.TextWrapMode | undefined;
  /**
   * Since October 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | balance | stable | pretty`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **130** | **124** | **17.5** | **130** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  textWrapStyle?: Property.TextWrapStyle | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <dashed-ident>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **116** |   No    | **26** | **116** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/timeline-scope
   */
  timelineScope?: Property.TimelineScope | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/top
   */
  top?: Property.Top<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2019.
   *
   * **Syntax**: `auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |    IE    |
   * | :----: | :-----: | :----: | :----: | :------: |
   * | **36** | **52**  | **13** | **12** |  **11**  |
   * |        |         |        |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  touchAction?: Property.TouchAction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |  Firefox  |  Safari   |  Edge  |   IE    |
   * | :-----: | :-------: | :-------: | :----: | :-----: |
   * | **36**  |  **16**   |   **9**   | **12** | **10**  |
   * | 1 _-x-_ | 3.5 _-x-_ | 3.1 _-x-_ |        | 9 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform
   */
  transform?: Property.Transform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `content-box | border-box | fill-box | stroke-box | view-box`
   *
   * **Initial value**: `view-box`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **64** | **55**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  transformBox?: Property.TransformBox | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   *
   * | Chrome  |  Firefox  | Safari  |  Edge  |   IE    |
   * | :-----: | :-------: | :-----: | :----: | :-----: |
   * | **36**  |  **16**   |  **9**  | **12** | **10**  |
   * | 1 _-x-_ | 3.5 _-x-_ | 2 _-x-_ |        | 9 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  transformOrigin?: Property.TransformOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `flat | preserve-3d`
   *
   * **Initial value**: `flat`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  | IE  |
   * | :------: | :------: | :-----: | :----: | :-: |
   * |  **36**  |  **16**  |  **9**  | **12** | No  |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
   */
  transformStyle?: Property.TransformStyle | undefined;
  /**
   * Since August 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<transition-behavior-value>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **117** | **129** | **17.4** | **117** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
   */
  transitionBehavior?: Property.TransitionBehavior | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **26**  | **16**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-delay
   */
  transitionDelay?: Property.TransitionDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-duration
   */
  transitionDuration?: Property.TransitionDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
   */
  transitionProperty?: Property.TransitionProperty | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  transitionTimingFunction?: Property.TransitionTimingFunction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022.
   *
   * **Syntax**: `none | <length-percentage> [ <length-percentage> <length>? ]?`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **104** | **72**  | **14.1** | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/translate
   */
  translate?: Property.Translate<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | embed | isolate | bidi-override | isolate-override | plaintext`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE    |
   * | :----: | :-----: | :-----: | :----: | :-----: |
   * | **2**  |  **1**  | **1.3** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  unicodeBidi?: Property.UnicodeBidi | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | text | none | all`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |   Safari    |   Edge   |      IE      |
   * | :-----: | :-----: | :---------: | :------: | :----------: |
   * | **54**  | **69**  | **3** _-x-_ |  **79**  | **10** _-x-_ |
   * | 1 _-x-_ | 1 _-x-_ |             | 12 _-x-_ |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  userSelect?: Property.UserSelect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | non-scaling-stroke | non-scaling-size | non-rotation | fixed-position`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **6**  | **15**  | **5.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  vectorEffect?: Property.VectorEffect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>`
   *
   * **Initial value**: `baseline`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  verticalAlign?: Property.VerticalAlign<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ block | inline | x | y ]#`
   *
   * **Initial value**: `block`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  viewTimelineAxis?: Property.ViewTimelineAxis | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ [ auto | <length-percentage> ]{1,2} ]#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-inset
   */
  viewTimelineInset?: Property.ViewTimelineInset<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ none | <dashed-ident> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-name
   */
  viewTimelineName?: Property.ViewTimelineName | undefined;
  /**
   * **Syntax**: `none | <custom-ident>+`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **125** | **144** | **18.2** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-class
   */
  viewTransitionClass?: Property.ViewTransitionClass | undefined;
  /**
   * Since October 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | <custom-ident> | match-element`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **111** | **144** | **18** | **111** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
   */
  viewTransitionName?: Property.ViewTransitionName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | collapse`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/visibility
   */
  visibility?: Property.Visibility | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | pre | pre-wrap | pre-line | <'white-space-collapse'> || <'text-wrap-mode'>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  whiteSpace?: Property.WhiteSpace | undefined;
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `collapse | preserve | preserve-breaks | preserve-spaces | break-spaces`
   *
   * **Initial value**: `collapse`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **114** | **124** | **17.4** | **114** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  whiteSpaceCollapse?: Property.WhiteSpaceCollapse | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `2`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **25** |   No    | **1.3** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/widows
   */
  widows?: Property.Widows | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  width?: Property.Width<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | <animateable-feature>#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **36** | **36**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   */
  willChange?: Property.WillChange | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | break-all | keep-all | break-word | auto-phrase`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  | **15**  | **3**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  wordBreak?: Property.WordBreak | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <length>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-spacing
   */
  wordSpacing?: Property.WordSpacing<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2018.
   *
   * **Syntax**: `normal | break-word`
   *
   * **Initial value**: `normal`
   */
  wordWrap?: Property.WordWrap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   *
   * **Initial value**: `horizontal-tb`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |  IE   |
   * | :-----: | :-----: | :-------: | :----: | :---: |
   * | **48**  | **41**  | **10.1**  | **12** | **9** |
   * | 8 _-x-_ |         | 5.1 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  writingMode?: Property.WritingMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **42** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/x
   */
  x?: Property.X<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **42** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/y
   */
  y?: Property.Y<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <integer>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/z-index
   */
  zIndex?: Property.ZIndex | undefined;
  /**
   * Since May 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | reset | <number [0,∞]> || <percentage [0,∞]>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE    |
   * | :----: | :-----: | :-----: | :----: | :-----: |
   * | **1**  | **126** | **3.1** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
   */
  zoom?: Property.Zoom | undefined;
}
interface StandardShorthandProperties<TLength = (string & {}) | 0, TTime = string & {}> {
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `initial | inherit | unset | revert | revert-layer`
   *
   * **Initial value**: There is no practical initial value for it.
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **37** | **27**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/all
   */
  all?: Property.All | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation>#`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  animation?: Property.Animation<TTime> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <'animation-range-start'> <'animation-range-end'>? ]#`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  animationRange?: Property.AnimationRange<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-layer>#? , <final-bg-layer>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  background?: Property.Background<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-position>#`
   *
   * **Initial value**: `0% 0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  backgroundPosition?: Property.BackgroundPosition<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  border?: Property.Border<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-block-start'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  borderBlock?: Property.BorderBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-color'>{1,2}`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   */
  borderBlockColor?: Property.BorderBlockColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  borderBlockEnd?: Property.BorderBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  borderBlockStart?: Property.BorderBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-style'>{1,2}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  borderBlockStyle?: Property.BorderBlockStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-width'>{1,2}`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  borderBlockWidth?: Property.BorderBlockWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  borderBottom?: Property.BorderBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-color
   */
  borderColor?: Property.BorderColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   *
   * | Chrome  |  Firefox  | Safari  |  Edge  |   IE   |
   * | :-----: | :-------: | :-----: | :----: | :----: |
   * | **16**  |  **15**   |  **6**  | **12** | **11** |
   * | 7 _-x-_ | 3.5 _-x-_ | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  borderImage?: Property.BorderImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-block-start'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  borderInline?: Property.BorderInline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-color'>{1,2}`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   */
  borderInlineColor?: Property.BorderInlineColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  borderInlineEnd?: Property.BorderInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  borderInlineStart?: Property.BorderInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-style'>{1,2}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  borderInlineStyle?: Property.BorderInlineStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-width'>{1,2}`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  borderInlineWidth?: Property.BorderInlineWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  borderLeft?: Property.BorderLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-radius
   */
  borderRadius?: Property.BorderRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  borderRight?: Property.BorderRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  borderStyle?: Property.BorderStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  borderTop?: Property.BorderTop<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   */
  borderWidth?: Property.BorderWidth<TLength> | undefined;
  /** **Syntax**: `<'caret-color'> || <'caret-shape'>` */
  caret?: Property.Caret | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  columnRule?: Property.ColumnRule<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-width'> || <'column-count'>`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **50** | **52**  |  **9**  | **12** | **10** |
   * |        |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/columns
   */
  columns?: Property.Columns<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ auto? [ none | <length> ] ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **83** | **107** | **17** | **83** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-size
   */
  containIntrinsicSize?: Property.ContainIntrinsicSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `<'container-name'> [ / <'container-type'> ]?`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **105** | **110** | **16** | **105** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container
   */
  container?: Property.Container | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **22**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  flex?: Property.Flex<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<'flex-direction'> || <'flex-wrap'>`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **28**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  flexFlow?: Property.FlexFlow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ [ <'font-style'> || <font-variant-css2> || <'font-weight'> || <font-width-css3> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'># ] | <system-family-name>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  font?: Property.Font | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<'row-gap'> <'column-gap'>?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/gap
   */
  gap?: Property.Gap<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid
   */
  grid?: Property.Grid | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]{0,3}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-area
   */
  gridArea?: Property.GridArea | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column
   */
  gridColumn?: Property.GridColumn | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row
   */
  gridRow?: Property.GridRow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template
   */
  gridTemplate?: Property.GridTemplate | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,4}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset
   */
  inset?: Property.Inset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block
   */
  insetBlock?: Property.InsetBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline
   */
  insetInline?: Property.InsetInline<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   *
   * |   Chrome    |   Firefox    |  Safari   |     Edge     | IE  |
   * | :---------: | :----------: | :-------: | :----------: | :-: |
   * | **6** _-x-_ | **68** _-x-_ | 18.2-18.4 | **17** _-x-_ | No  |
   * |             |              |  5 _-x-_  |              |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-clamp
   */
  lineClamp?: Property.LineClamp | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'list-style-type'> || <'list-style-position'> || <'list-style-image'>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   */
  listStyle?: Property.ListStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'margin-top'>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin
   */
  margin?: Property.Margin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'margin-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   */
  marginBlock?: Property.MarginBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'margin-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   */
  marginInline?: Property.MarginInline<TLength> | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<mask-layer>#`
   *
   * | Chrome  | Firefox |  Safari   | Edge  | IE  |
   * | :-----: | :-----: | :-------: | :---: | :-: |
   * | **120** | **53**  | **15.4**  | 12-79 | No  |
   * | 1 _-x-_ |         | 3.1 _-x-_ |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  mask?: Property.Mask<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>`
   *
   * |              Chrome              | Firefox |             Safari             |               Edge                | IE  |
   * | :------------------------------: | :-----: | :----------------------------: | :-------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image)_ |   No    |            **17.2**            | **79** _(-webkit-mask-box-image)_ | No  |
   * |                                  |         | 3.1 _(-webkit-mask-box-image)_ |                                   |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  maskBorder?: Property.MaskBorder | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?`
   *
   * |    Chrome     | Firefox | Safari |  Edge  | IE  |
   * | :-----------: | :-----: | :----: | :----: | :-: |
   * |    **55**     | **72**  | **16** | **79** | No  |
   * | 46 _(motion)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  motion?: Property.Offset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?`
   *
   * |    Chrome     | Firefox | Safari |  Edge  | IE  |
   * | :-----------: | :-----: | :----: | :----: | :-: |
   * |    **55**     | **72**  | **16** | **79** | No  |
   * | 46 _(motion)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  offset?: Property.Offset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `<'outline-width'> || <'outline-style'> || <'outline-color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :------: | :----: | :---: |
   * | **94** | **88**  | **16.4** | **94** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  outline?: Property.Outline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ visible | hidden | clip | scroll | auto ]{1,2}`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  overflow?: Property.Overflow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ contain | none | auto ]{1,2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  | **16** | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior
   */
  overscrollBehavior?: Property.OverscrollBehavior | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'padding-top'>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding
   */
  padding?: Property.Padding<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'padding-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
   */
  paddingBlock?: Property.PaddingBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'padding-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
   */
  paddingInline?: Property.PaddingInline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'align-content'> <'justify-content'>?`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  placeContent?: Property.PlaceContent | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'align-items'> <'justify-items'>?`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  placeItems?: Property.PlaceItems | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'align-self'> <'justify-self'>?`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  placeSelf?: Property.PlaceSelf | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<'position-try-order'>? <'position-try-fallbacks'>`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  positionTry?: Property.PositionTry | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2021.
   *
   * **Syntax**: `<length>{1,4}`
   *
   * | Chrome | Firefox |          Safari           |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------: | :----: | :-: |
   * | **69** | **90**  |         **14.1**          | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  scrollMargin?: Property.ScrollMargin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block
   */
  scrollMarginBlock?: Property.ScrollMarginBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline
   */
  scrollMarginInline?: Property.ScrollMarginInline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,4}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding
   */
  scrollPadding?: Property.ScrollPadding<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
   */
  scrollPaddingBlock?: Property.ScrollPaddingBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
   */
  scrollPaddingInline?: Property.ScrollPaddingInline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2021.
   *
   * **Syntax**: `<length>{1,4}`
   *
   * | Chrome | Firefox |          Safari           |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------: | :----: | :-: |
   * | **69** |  68-90  |         **14.1**          | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  scrollSnapMargin?: Property.ScrollMargin<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <'scroll-timeline-name'> <'scroll-timeline-axis'>? ]#`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline
   */
  scrollTimeline?: Property.ScrollTimeline | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  textDecoration?: Property.TextDecoration<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `<'text-emphasis-style'> || <'text-emphasis-color'>`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  textEmphasis?: Property.TextEmphasis | undefined;
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<'text-wrap-mode'> || <'text-wrap-style'>`
   *
   * **Initial value**: `wrap`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **114** | **121** | **17.4** | **114** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  textWrap?: Property.TextWrap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  transition?: Property.Transition<TTime> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <'view-timeline-name'> [ <'view-timeline-axis'> || <'view-timeline-inset'> ]? ]#`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline
   */
  viewTimeline?: Property.ViewTimeline | undefined;
}
interface StandardProperties<TLength = (string & {}) | 0, TTime = string & {}> extends StandardLonghandProperties<TLength, TTime>, StandardShorthandProperties<TLength, TTime> {}
interface VendorLonghandProperties<TLength = (string & {}) | 0, TTime = string & {}> {
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  MozAnimationDelay?: Property.AnimationDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   */
  MozAnimationDirection?: Property.AnimationDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ auto | <time [0s,∞]> ]#`
   *
   * **Initial value**: `0s`
   */
  MozAnimationDuration?: Property.AnimationDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   */
  MozAnimationFillMode?: Property.AnimationFillMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   */
  MozAnimationIterationCount?: Property.AnimationIterationCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   */
  MozAnimationName?: Property.AnimationName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   */
  MozAnimationPlayState?: Property.AnimationPlayState | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   */
  MozAnimationTimingFunction?: Property.AnimationTimingFunction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized`
   *
   * **Initial value**: `none` (but this value is overridden in the user agent CSS)
   */
  MozAppearance?: Property.MozAppearance | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `visible | hidden`
   *
   * **Initial value**: `visible`
   */
  MozBackfaceVisibility?: Property.BackfaceVisibility | undefined;
  /**
   * **Syntax**: `<url> | none`
   *
   * **Initial value**: `none`
   */
  MozBinding?: Property.MozBinding | undefined;
  /**
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   */
  MozBorderBottomColors?: Property.MozBorderBottomColors | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   */
  MozBorderEndColor?: Property.BorderInlineEndColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   */
  MozBorderEndStyle?: Property.BorderInlineEndStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   */
  MozBorderEndWidth?: Property.BorderInlineEndWidth<TLength> | undefined;
  /**
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   */
  MozBorderLeftColors?: Property.MozBorderLeftColors | undefined;
  /**
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   */
  MozBorderRightColors?: Property.MozBorderRightColors | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   */
  MozBorderStartColor?: Property.BorderInlineStartColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   */
  MozBorderStartStyle?: Property.BorderInlineStartStyle | undefined;
  /**
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   */
  MozBorderTopColors?: Property.MozBorderTopColors | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `content-box | border-box`
   *
   * **Initial value**: `content-box`
   */
  MozBoxSizing?: Property.BoxSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  MozColumnRuleColor?: Property.ColumnRuleColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   */
  MozColumnRuleStyle?: Property.ColumnRuleStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   */
  MozColumnRuleWidth?: Property.ColumnRuleWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016.
   *
   * **Syntax**: `<length> | auto`
   *
   * **Initial value**: `auto`
   */
  MozColumnWidth?: Property.ColumnWidth<TLength> | undefined;
  /**
   * **Syntax**: `none | [ fill | fill-opacity | stroke | stroke-opacity ]#`
   *
   * **Initial value**: `none`
   */
  MozContextProperties?: Property.MozContextProperties | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `normal | <feature-tag-value>#`
   *
   * **Initial value**: `normal`
   */
  MozFontFeatureSettings?: Property.FontFeatureSettings | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | <string>`
   *
   * **Initial value**: `normal`
   */
  MozFontLanguageOverride?: Property.FontLanguageOverride | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   */
  MozHyphens?: Property.Hyphens | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   */
  MozMarginEnd?: Property.MarginInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   */
  MozMarginStart?: Property.MarginInlineStart<TLength> | undefined;
  /**
   * The **`-moz-orient`** CSS property specifies the orientation of the element to which it's applied.
   *
   * **Syntax**: `inline | block | horizontal | vertical`
   *
   * **Initial value**: `inline`
   */
  MozOrient?: Property.MozOrient | undefined;
  /**
   * The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered.
   *
   * **Syntax**: `auto | never | always | <absolute-size> | <length>`
   *
   * **Initial value**: `auto`
   */
  MozOsxFontSmoothing?: Property.FontSmooth<TLength> | undefined;
  /**
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  MozOutlineRadiusBottomleft?: Property.MozOutlineRadiusBottomleft<TLength> | undefined;
  /**
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  MozOutlineRadiusBottomright?: Property.MozOutlineRadiusBottomright<TLength> | undefined;
  /**
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  MozOutlineRadiusTopleft?: Property.MozOutlineRadiusTopleft<TLength> | undefined;
  /**
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  MozOutlineRadiusTopright?: Property.MozOutlineRadiusTopright<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   */
  MozPaddingEnd?: Property.PaddingInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   */
  MozPaddingStart?: Property.PaddingInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <length>`
   *
   * **Initial value**: `none`
   */
  MozPerspective?: Property.Perspective<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   */
  MozPerspectiveOrigin?: Property.PerspectiveOrigin<TLength> | undefined;
  /**
   * **Syntax**: `ignore | stretch-to-fit`
   *
   * **Initial value**: `stretch-to-fit`
   */
  MozStackSizing?: Property.MozStackSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021.
   *
   * **Syntax**: `<integer> | <length>`
   *
   * **Initial value**: `8`
   */
  MozTabSize?: Property.TabSize<TLength> | undefined;
  /**
   * **Syntax**: `none | blink`
   *
   * **Initial value**: `none`
   */
  MozTextBlink?: Property.MozTextBlink | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | auto | <percentage>`
   *
   * **Initial value**: `auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   */
  MozTextSizeAdjust?: Property.TextSizeAdjust | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   */
  MozTransform?: Property.Transform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   */
  MozTransformOrigin?: Property.TransformOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `flat | preserve-3d`
   *
   * **Initial value**: `flat`
   */
  MozTransformStyle?: Property.TransformStyle | undefined;
  /**
   * The **`user-modify`** property has no effect in Firefox. It was originally planned to determine whether or not the content of an element can be edited by a user.
   *
   * **Syntax**: `read-only | read-write | write-only`
   *
   * **Initial value**: `read-only`
   */
  MozUserModify?: Property.MozUserModify | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | text | none | all`
   *
   * **Initial value**: `auto`
   */
  MozUserSelect?: Property.UserSelect | undefined;
  /**
   * **Syntax**: `drag | no-drag`
   *
   * **Initial value**: `drag`
   */
  MozWindowDragging?: Property.MozWindowDragging | undefined;
  /**
   * **Syntax**: `default | menu | tooltip | sheet | none`
   *
   * **Initial value**: `default`
   */
  MozWindowShadow?: Property.MozWindowShadow | undefined;
  /**
   * **Syntax**: `false | true`
   *
   * **Initial value**: `false`
   */
  msAccelerator?: Property.MsAccelerator | undefined;
  /**
   * **Syntax**: `tb | rl | bt | lr`
   *
   * **Initial value**: `tb`
   */
  msBlockProgression?: Property.MsBlockProgression | undefined;
  /**
   * **Syntax**: `none | chained`
   *
   * **Initial value**: `none`
   */
  msContentZoomChaining?: Property.MsContentZoomChaining | undefined;
  /**
   * **Syntax**: `<percentage>`
   *
   * **Initial value**: `400%`
   */
  msContentZoomLimitMax?: Property.MsContentZoomLimitMax | undefined;
  /**
   * **Syntax**: `<percentage>`
   *
   * **Initial value**: `100%`
   */
  msContentZoomLimitMin?: Property.MsContentZoomLimitMin | undefined;
  /**
   * **Syntax**: `snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )`
   *
   * **Initial value**: `snapInterval(0%, 100%)`
   */
  msContentZoomSnapPoints?: Property.MsContentZoomSnapPoints | undefined;
  /**
   * **Syntax**: `none | proximity | mandatory`
   *
   * **Initial value**: `none`
   */
  msContentZoomSnapType?: Property.MsContentZoomSnapType | undefined;
  /**
   * **Syntax**: `none | zoom`
   *
   * **Initial value**: zoom for the top level element, none for all other elements
   */
  msContentZooming?: Property.MsContentZooming | undefined;
  /**
   * **Syntax**: `<string>`
   *
   * **Initial value**: "" (the empty string)
   */
  msFilter?: Property.MsFilter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   */
  msFlexDirection?: Property.FlexDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   */
  msFlexPositive?: Property.FlexGrow | undefined;
  /**
   * **Syntax**: `[ none | <custom-ident> ]#`
   *
   * **Initial value**: `none`
   */
  msFlowFrom?: Property.MsFlowFrom | undefined;
  /**
   * **Syntax**: `[ none | <custom-ident> ]#`
   *
   * **Initial value**: `none`
   */
  msFlowInto?: Property.MsFlowInto | undefined;
  /**
   * **Syntax**: `none | <track-list> | <auto-track-list>`
   *
   * **Initial value**: `none`
   */
  msGridColumns?: Property.MsGridColumns<TLength> | undefined;
  /**
   * **Syntax**: `none | <track-list> | <auto-track-list>`
   *
   * **Initial value**: `none`
   */
  msGridRows?: Property.MsGridRows<TLength> | undefined;
  /**
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   */
  msHighContrastAdjust?: Property.MsHighContrastAdjust | undefined;
  /**
   * **Syntax**: `auto | <integer>{1,3}`
   *
   * **Initial value**: `auto`
   */
  msHyphenateLimitChars?: Property.MsHyphenateLimitChars | undefined;
  /**
   * **Syntax**: `no-limit | <integer>`
   *
   * **Initial value**: `no-limit`
   */
  msHyphenateLimitLines?: Property.MsHyphenateLimitLines | undefined;
  /**
   * **Syntax**: `<percentage> | <length>`
   *
   * **Initial value**: `0`
   */
  msHyphenateLimitZone?: Property.MsHyphenateLimitZone<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   */
  msHyphens?: Property.Hyphens | undefined;
  /**
   * **Syntax**: `auto | after`
   *
   * **Initial value**: `auto`
   */
  msImeAlign?: Property.MsImeAlign | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   */
  msLineBreak?: Property.LineBreak | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   */
  msOrder?: Property.Order | undefined;
  /**
   * **Syntax**: `auto | none | scrollbar | -ms-autohiding-scrollbar`
   *
   * **Initial value**: `auto`
   */
  msOverflowStyle?: Property.MsOverflowStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   */
  msOverflowX?: Property.OverflowX | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   */
  msOverflowY?: Property.OverflowY | undefined;
  /**
   * **Syntax**: `chained | none`
   *
   * **Initial value**: `chained`
   */
  msScrollChaining?: Property.MsScrollChaining | undefined;
  /**
   * **Syntax**: `auto | <length>`
   *
   * **Initial value**: `auto`
   */
  msScrollLimitXMax?: Property.MsScrollLimitXMax<TLength> | undefined;
  /**
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  msScrollLimitXMin?: Property.MsScrollLimitXMin<TLength> | undefined;
  /**
   * **Syntax**: `auto | <length>`
   *
   * **Initial value**: `auto`
   */
  msScrollLimitYMax?: Property.MsScrollLimitYMax<TLength> | undefined;
  /**
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  msScrollLimitYMin?: Property.MsScrollLimitYMin<TLength> | undefined;
  /**
   * **Syntax**: `none | railed`
   *
   * **Initial value**: `railed`
   */
  msScrollRails?: Property.MsScrollRails | undefined;
  /**
   * **Syntax**: `snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )`
   *
   * **Initial value**: `snapInterval(0px, 100%)`
   */
  msScrollSnapPointsX?: Property.MsScrollSnapPointsX | undefined;
  /**
   * **Syntax**: `snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )`
   *
   * **Initial value**: `snapInterval(0px, 100%)`
   */
  msScrollSnapPointsY?: Property.MsScrollSnapPointsY | undefined;
  /**
   * **Syntax**: `none | proximity | mandatory`
   *
   * **Initial value**: `none`
   */
  msScrollSnapType?: Property.MsScrollSnapType | undefined;
  /**
   * **Syntax**: `none | vertical-to-horizontal`
   *
   * **Initial value**: `none`
   */
  msScrollTranslation?: Property.MsScrollTranslation | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: depends on user agent
   */
  msScrollbar3dlightColor?: Property.MsScrollbar3dlightColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ButtonText`
   */
  msScrollbarArrowColor?: Property.MsScrollbarArrowColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: depends on user agent
   */
  msScrollbarBaseColor?: Property.MsScrollbarBaseColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDDarkShadow`
   */
  msScrollbarDarkshadowColor?: Property.MsScrollbarDarkshadowColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDFace`
   */
  msScrollbarFaceColor?: Property.MsScrollbarFaceColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDHighlight`
   */
  msScrollbarHighlightColor?: Property.MsScrollbarHighlightColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDDarkShadow`
   */
  msScrollbarShadowColor?: Property.MsScrollbarShadowColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `Scrollbar`
   */
  msScrollbarTrackColor?: Property.MsScrollbarTrackColor | undefined;
  /**
   * **Syntax**: `none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space`
   *
   * **Initial value**: `none`
   */
  msTextAutospace?: Property.MsTextAutospace | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   */
  msTextCombineHorizontal?: Property.TextCombineUpright | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ clip | ellipsis | <string> ]{1,2}`
   *
   * **Initial value**: `clip`
   */
  msTextOverflow?: Property.TextOverflow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2019.
   *
   * **Syntax**: `auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation`
   *
   * **Initial value**: `auto`
   */
  msTouchAction?: Property.TouchAction | undefined;
  /**
   * **Syntax**: `grippers | none`
   *
   * **Initial value**: `grippers`
   */
  msTouchSelect?: Property.MsTouchSelect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   */
  msTransform?: Property.Transform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   */
  msTransformOrigin?: Property.TransformOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  msTransitionDelay?: Property.TransitionDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  msTransitionDuration?: Property.TransitionDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   */
  msTransitionProperty?: Property.TransitionProperty | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   */
  msTransitionTimingFunction?: Property.TransitionTimingFunction | undefined;
  /**
   * **Syntax**: `none | element | text`
   *
   * **Initial value**: `text`
   */
  msUserSelect?: Property.MsUserSelect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | break-all | keep-all | break-word | auto-phrase`
   *
   * **Initial value**: `normal`
   */
  msWordBreak?: Property.WordBreak | undefined;
  /**
   * **Syntax**: `auto | both | start | end | maximum | clear`
   *
   * **Initial value**: `auto`
   */
  msWrapFlow?: Property.MsWrapFlow | undefined;
  /**
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  msWrapMargin?: Property.MsWrapMargin<TLength> | undefined;
  /**
   * **Syntax**: `wrap | none`
   *
   * **Initial value**: `wrap`
   */
  msWrapThrough?: Property.MsWrapThrough | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   *
   * **Initial value**: `horizontal-tb`
   */
  msWritingMode?: Property.WritingMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>`
   *
   * **Initial value**: `normal`
   */
  WebkitAlignContent?: Property.AlignContent | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ] | anchor-center`
   *
   * **Initial value**: `normal`
   */
  WebkitAlignItems?: Property.AlignItems | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position> | anchor-center`
   *
   * **Initial value**: `auto`
   */
  WebkitAlignSelf?: Property.AlignSelf | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  WebkitAnimationDelay?: Property.AnimationDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   */
  WebkitAnimationDirection?: Property.AnimationDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ auto | <time [0s,∞]> ]#`
   *
   * **Initial value**: `0s`
   */
  WebkitAnimationDuration?: Property.AnimationDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   */
  WebkitAnimationFillMode?: Property.AnimationFillMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   */
  WebkitAnimationIterationCount?: Property.AnimationIterationCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   */
  WebkitAnimationName?: Property.AnimationName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   */
  WebkitAnimationPlayState?: Property.AnimationPlayState | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   */
  WebkitAnimationTimingFunction?: Property.AnimationTimingFunction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | -apple-pay-button`
   *
   * **Initial value**: `none` (but this value is overridden in the user agent CSS)
   */
  WebkitAppearance?: Property.WebkitAppearance | undefined;
  /**
   * Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | <filter-value-list>`
   *
   * **Initial value**: `none`
   */
  WebkitBackdropFilter?: Property.BackdropFilter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `visible | hidden`
   *
   * **Initial value**: `visible`
   */
  WebkitBackfaceVisibility?: Property.BackfaceVisibility | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-clip>#`
   *
   * **Initial value**: `border-box`
   */
  WebkitBackgroundClip?: Property.BackgroundClip | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<visual-box>#`
   *
   * **Initial value**: `padding-box`
   */
  WebkitBackgroundOrigin?: Property.BackgroundOrigin | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   */
  WebkitBackgroundSize?: Property.BackgroundSize<TLength> | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitBorderBeforeColor?: Property.WebkitBorderBeforeColor | undefined;
  /**
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   */
  WebkitBorderBeforeStyle?: Property.WebkitBorderBeforeStyle | undefined;
  /**
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   */
  WebkitBorderBeforeWidth?: Property.WebkitBorderBeforeWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   */
  WebkitBorderBottomLeftRadius?: Property.BorderBottomLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   */
  WebkitBorderBottomRightRadius?: Property.BorderBottomRightRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <number [0,∞]> | <percentage [0,∞]> ]{1,4}  && fill?`
   *
   * **Initial value**: `100%`
   */
  WebkitBorderImageSlice?: Property.BorderImageSlice | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   */
  WebkitBorderTopLeftRadius?: Property.BorderTopLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   */
  WebkitBorderTopRightRadius?: Property.BorderTopRightRadius<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `slice | clone`
   *
   * **Initial value**: `slice`
   */
  WebkitBoxDecorationBreak?: Property.BoxDecorationBreak | undefined;
  /**
   * The **`-webkit-box-reflect`** CSS property lets you reflect the content of an element in one specific direction.
   *
   * **Syntax**: `[ above | below | right | left ]? <length>? <image>?`
   *
   * **Initial value**: `none`
   */
  WebkitBoxReflect?: Property.WebkitBoxReflect<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   */
  WebkitBoxShadow?: Property.BoxShadow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `content-box | border-box`
   *
   * **Initial value**: `content-box`
   */
  WebkitBoxSizing?: Property.BoxSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<clip-source> | [ <basic-shape> || <geometry-box> ] | none`
   *
   * **Initial value**: `none`
   */
  WebkitClipPath?: Property.ClipPath | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<integer> | auto`
   *
   * **Initial value**: `auto`
   */
  WebkitColumnCount?: Property.ColumnCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `auto | balance`
   *
   * **Initial value**: `balance`
   */
  WebkitColumnFill?: Property.ColumnFill | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitColumnRuleColor?: Property.ColumnRuleColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   */
  WebkitColumnRuleStyle?: Property.ColumnRuleStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   */
  WebkitColumnRuleWidth?: Property.ColumnRuleWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `none | all`
   *
   * **Initial value**: `none`
   */
  WebkitColumnSpan?: Property.ColumnSpan | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016.
   *
   * **Syntax**: `<length> | auto`
   *
   * **Initial value**: `auto`
   */
  WebkitColumnWidth?: Property.ColumnWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `none | <filter-value-list>`
   *
   * **Initial value**: `none`
   */
  WebkitFilter?: Property.Filter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `content | <'width'>`
   *
   * **Initial value**: `auto`
   */
  WebkitFlexBasis?: Property.FlexBasis<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   */
  WebkitFlexDirection?: Property.FlexDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   */
  WebkitFlexGrow?: Property.FlexGrow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `1`
   */
  WebkitFlexShrink?: Property.FlexShrink | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `nowrap | wrap | wrap-reverse`
   *
   * **Initial value**: `nowrap`
   */
  WebkitFlexWrap?: Property.FlexWrap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `normal | <feature-tag-value>#`
   *
   * **Initial value**: `normal`
   */
  WebkitFontFeatureSettings?: Property.FontFeatureSettings | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | normal | none`
   *
   * **Initial value**: `auto`
   */
  WebkitFontKerning?: Property.FontKerning | undefined;
  /**
   * The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered.
   *
   * **Syntax**: `auto | never | always | <absolute-size> | <length>`
   *
   * **Initial value**: `auto`
   */
  WebkitFontSmoothing?: Property.FontSmooth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]`
   *
   * **Initial value**: `normal`
   */
  WebkitFontVariantLigatures?: Property.FontVariantLigatures | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | <string>`
   *
   * **Initial value**: `auto`
   */
  WebkitHyphenateCharacter?: Property.HyphenateCharacter | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   */
  WebkitHyphens?: Property.Hyphens | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | [ <number> <integer>? ]`
   *
   * **Initial value**: `normal`
   */
  WebkitInitialLetter?: Property.InitialLetter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]`
   *
   * **Initial value**: `normal`
   */
  WebkitJustifyContent?: Property.JustifyContent | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   */
  WebkitLineBreak?: Property.LineBreak | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   */
  WebkitLineClamp?: Property.WebkitLineClamp | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   */
  WebkitLogicalHeight?: Property.BlockSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   */
  WebkitLogicalWidth?: Property.InlineSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   */
  WebkitMarginEnd?: Property.MarginInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   */
  WebkitMarginStart?: Property.MarginInlineStart<TLength> | undefined;
  /**
   * **Syntax**: `<attachment>#`
   *
   * **Initial value**: `scroll`
   */
  WebkitMaskAttachment?: Property.WebkitMaskAttachment | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <length> | <number> ]{1,4}`
   *
   * **Initial value**: `0`
   */
  WebkitMaskBoxImageOutset?: Property.MaskBorderOutset<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ stretch | repeat | round | space ]{1,2}`
   *
   * **Initial value**: `stretch`
   */
  WebkitMaskBoxImageRepeat?: Property.MaskBorderRepeat | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<number-percentage>{1,4} fill?`
   *
   * **Initial value**: `0`
   */
  WebkitMaskBoxImageSlice?: Property.MaskBorderSlice | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <image>`
   *
   * **Initial value**: `none`
   */
  WebkitMaskBoxImageSource?: Property.MaskBorderSource | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <length-percentage> | <number> | auto ]{1,4}`
   *
   * **Initial value**: `auto`
   */
  WebkitMaskBoxImageWidth?: Property.MaskBorderWidth<TLength> | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <coord-box> | no-clip | border | padding | content | text ]#`
   *
   * **Initial value**: `border`
   */
  WebkitMaskClip?: Property.WebkitMaskClip | undefined;
  /**
   * The **`-webkit-mask-composite`** property specifies the manner in which multiple mask images applied to the same element are composited with one another. Mask images are composited in the opposite order that they are declared with the `-webkit-mask-image` property.
   *
   * **Syntax**: `<composite-style>#`
   *
   * **Initial value**: `source-over`
   */
  WebkitMaskComposite?: Property.WebkitMaskComposite | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<mask-reference>#`
   *
   * **Initial value**: `none`
   */
  WebkitMaskImage?: Property.WebkitMaskImage | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <coord-box> | border | padding | content ]#`
   *
   * **Initial value**: `padding`
   */
  WebkitMaskOrigin?: Property.WebkitMaskOrigin | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<position>#`
   *
   * **Initial value**: `0% 0%`
   */
  WebkitMaskPosition?: Property.WebkitMaskPosition<TLength> | undefined;
  /**
   * The `-webkit-mask-position-x` CSS property sets the initial horizontal position of a mask image.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right ]#`
   *
   * **Initial value**: `0%`
   */
  WebkitMaskPositionX?: Property.WebkitMaskPositionX<TLength> | undefined;
  /**
   * The `-webkit-mask-position-y` CSS property sets the initial vertical position of a mask image.
   *
   * **Syntax**: `[ <length-percentage> | top | center | bottom ]#`
   *
   * **Initial value**: `0%`
   */
  WebkitMaskPositionY?: Property.WebkitMaskPositionY<TLength> | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   */
  WebkitMaskRepeat?: Property.WebkitMaskRepeat | undefined;
  /**
   * The `-webkit-mask-repeat-x` property specifies whether and how a mask image is repeated (tiled) horizontally.
   *
   * **Syntax**: `repeat | no-repeat | space | round`
   *
   * **Initial value**: `repeat`
   */
  WebkitMaskRepeatX?: Property.WebkitMaskRepeatX | undefined;
  /**
   * The `-webkit-mask-repeat-y` property sets whether and how a mask image is repeated (tiled) vertically.
   *
   * **Syntax**: `repeat | no-repeat | space | round`
   *
   * **Initial value**: `repeat`
   */
  WebkitMaskRepeatY?: Property.WebkitMaskRepeatY | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   */
  WebkitMaskSize?: Property.WebkitMaskSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `none`
   */
  WebkitMaxInlineSize?: Property.MaxInlineSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   */
  WebkitOrder?: Property.Order | undefined;
  /**
   * **Syntax**: `auto | touch`
   *
   * **Initial value**: `auto`
   */
  WebkitOverflowScrolling?: Property.WebkitOverflowScrolling | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   */
  WebkitPaddingEnd?: Property.PaddingInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   */
  WebkitPaddingStart?: Property.PaddingInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <length>`
   *
   * **Initial value**: `none`
   */
  WebkitPerspective?: Property.Perspective<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   */
  WebkitPerspectiveOrigin?: Property.PerspectiveOrigin<TLength> | undefined;
  /**
   * Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `economy | exact`
   *
   * **Initial value**: `economy`
   */
  WebkitPrintColorAdjust?: Property.PrintColorAdjust | undefined;
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ alternate || [ over | under ] ] | inter-character`
   *
   * **Initial value**: `alternate`
   */
  WebkitRubyPosition?: Property.RubyPosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2022.
   *
   * **Syntax**: `none | [ x | y | block | inline | both ] [ mandatory | proximity ]?`
   *
   * **Initial value**: `none`
   */
  WebkitScrollSnapType?: Property.ScrollSnapType | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   */
  WebkitShapeMargin?: Property.ShapeMargin<TLength> | undefined;
  /**
   * **`-webkit-tap-highlight-color`** is a non-standard CSS property that sets the color of the highlight that appears over a link while it's being tapped. The highlighting indicates to the user that their tap is being successfully recognized, and indicates which element they're tapping on.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `black`
   */
  WebkitTapHighlightColor?: Property.WebkitTapHighlightColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   */
  WebkitTextCombine?: Property.TextCombineUpright | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitTextDecorationColor?: Property.TextDecorationColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   *
   * **Initial value**: `none`
   */
  WebkitTextDecorationLine?: Property.TextDecorationLine | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]`
   *
   * **Initial value**: `objects`
   */
  WebkitTextDecorationSkip?: Property.TextDecorationSkip | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `solid | double | dotted | dashed | wavy`
   *
   * **Initial value**: `solid`
   */
  WebkitTextDecorationStyle?: Property.TextDecorationStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitTextEmphasisColor?: Property.TextEmphasisColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | [ over | under ] && [ right | left ]?`
   *
   * **Initial value**: `auto`
   */
  WebkitTextEmphasisPosition?: Property.TextEmphasisPosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>`
   *
   * **Initial value**: `none`
   */
  WebkitTextEmphasisStyle?: Property.TextEmphasisStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitTextFillColor?: Property.WebkitTextFillColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2020.
   *
   * **Syntax**: `mixed | upright | sideways`
   *
   * **Initial value**: `mixed`
   */
  WebkitTextOrientation?: Property.TextOrientation | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | auto | <percentage>`
   *
   * **Initial value**: `auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   */
  WebkitTextSizeAdjust?: Property.TextSizeAdjust | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitTextStrokeColor?: Property.WebkitTextStrokeColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  WebkitTextStrokeWidth?: Property.WebkitTextStrokeWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | from-font | [ under || [ left | right ] ]`
   *
   * **Initial value**: `auto`
   */
  WebkitTextUnderlinePosition?: Property.TextUnderlinePosition | undefined;
  /**
   * The `-webkit-touch-callout` CSS property controls the display of the default callout shown when you touch and hold a touch target.
   *
   * **Syntax**: `default | none`
   *
   * **Initial value**: `default`
   */
  WebkitTouchCallout?: Property.WebkitTouchCallout | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   */
  WebkitTransform?: Property.Transform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   */
  WebkitTransformOrigin?: Property.TransformOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `flat | preserve-3d`
   *
   * **Initial value**: `flat`
   */
  WebkitTransformStyle?: Property.TransformStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  WebkitTransitionDelay?: Property.TransitionDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  WebkitTransitionDuration?: Property.TransitionDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   */
  WebkitTransitionProperty?: Property.TransitionProperty | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   */
  WebkitTransitionTimingFunction?: Property.TransitionTimingFunction | undefined;
  /**
   * **Syntax**: `read-only | read-write | read-write-plaintext-only`
   *
   * **Initial value**: `read-only`
   */
  WebkitUserModify?: Property.WebkitUserModify | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | text | none | all`
   *
   * **Initial value**: `auto`
   */
  WebkitUserSelect?: Property.WebkitUserSelect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   *
   * **Initial value**: `horizontal-tb`
   */
  WebkitWritingMode?: Property.WritingMode | undefined;
}
interface VendorShorthandProperties<TLength = (string & {}) | 0, TTime = string & {}> {
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation>#`
   */
  MozAnimation?: Property.Animation<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   */
  MozBorderImage?: Property.BorderImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   */
  MozColumnRule?: Property.ColumnRule<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-width'> || <'column-count'>`
   */
  MozColumns?: Property.Columns<TLength> | undefined;
  /** **Syntax**: `<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?` */
  MozOutlineRadius?: Property.MozOutlineRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   */
  MozTransition?: Property.Transition<TTime> | undefined;
  /** **Syntax**: `<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>` */
  msContentZoomLimit?: Property.MsContentZoomLimit | undefined;
  /** **Syntax**: `<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>` */
  msContentZoomSnap?: Property.MsContentZoomSnap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   */
  msFlex?: Property.Flex<TLength> | undefined;
  /** **Syntax**: `<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>` */
  msScrollLimit?: Property.MsScrollLimit | undefined;
  /** **Syntax**: `<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>` */
  msScrollSnapX?: Property.MsScrollSnapX | undefined;
  /** **Syntax**: `<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>` */
  msScrollSnapY?: Property.MsScrollSnapY | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   */
  msTransition?: Property.Transition<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation>#`
   */
  WebkitAnimation?: Property.Animation<TTime> | undefined;
  /**
   * The **`-webkit-border-before`** CSS property is a shorthand property for setting the individual logical block start border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-width'> || <'border-style'> || <color>`
   */
  WebkitBorderBefore?: Property.WebkitBorderBefore<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   */
  WebkitBorderImage?: Property.BorderImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   */
  WebkitBorderRadius?: Property.BorderRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   */
  WebkitColumnRule?: Property.ColumnRule<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-width'> || <'column-count'>`
   */
  WebkitColumns?: Property.Columns<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   */
  WebkitFlex?: Property.Flex<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<'flex-direction'> || <'flex-wrap'>`
   */
  WebkitFlexFlow?: Property.FlexFlow | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || [ <visual-box> | border | padding | content | text ] || [ <visual-box> | border | padding | content ] ]#`
   */
  WebkitMask?: Property.WebkitMask<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>`
   */
  WebkitMaskBoxImage?: Property.MaskBorder | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `<'text-emphasis-style'> || <'text-emphasis-color'>`
   */
  WebkitTextEmphasis?: Property.TextEmphasis | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length> || <color>`
   */
  WebkitTextStroke?: Property.WebkitTextStroke<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   */
  WebkitTransition?: Property.Transition<TTime> | undefined;
}
interface VendorProperties<TLength = (string & {}) | 0, TTime = string & {}> extends VendorLonghandProperties<TLength, TTime>, VendorShorthandProperties<TLength, TTime> {}
interface ObsoleteProperties<TLength = (string & {}) | 0, TTime = string & {}> {
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  boxAlign?: Property.BoxAlign | undefined;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  boxDirection?: Property.BoxDirection | undefined;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  boxFlex?: Property.BoxFlex | undefined;
  /**
   * The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  boxFlexGroup?: Property.BoxFlexGroup | undefined;
  /**
   * The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).
   *
   * **Syntax**: `single | multiple`
   *
   * **Initial value**: `single`
   *
   * @deprecated
   */
  boxLines?: Property.BoxLines | undefined;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  boxOrdinalGroup?: Property.BoxOrdinalGroup | undefined;
  /**
   * The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis`
   *
   * @deprecated
   */
  boxOrient?: Property.BoxOrient | undefined;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  boxPack?: Property.BoxPack | undefined;
  /**
   * The **`clip`** CSS property defines a visible portion of an element. The `clip` property applies only to absolutely positioned elements — that is, elements with `position:absolute` or `position:fixed`.
   *
   * **Syntax**: `<shape> | auto`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  clip?: Property.Clip | undefined;
  /**
   * The **`font-stretch`** CSS property selects a normal, condensed, or expanded face from a font.
   *
   * **Syntax**: `<font-stretch-absolute>`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  fontStretch?: Property.FontStretch | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  gridColumnGap?: Property.GridColumnGap<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<'grid-row-gap'> <'grid-column-gap'>?`
   *
   * @deprecated
   */
  gridGap?: Property.GridGap<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  gridRowGap?: Property.GridRowGap<TLength> | undefined;
  /**
   * **Syntax**: `auto | normal | active | inactive | disabled`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  imeMode?: Property.ImeMode | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <position-area>`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  insetArea?: Property.PositionArea | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * @deprecated
   */
  offsetBlock?: Property.InsetBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  offsetBlockEnd?: Property.InsetBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  offsetBlockStart?: Property.InsetBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * @deprecated
   */
  offsetInline?: Property.InsetInline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  offsetInlineEnd?: Property.InsetInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  offsetInlineStart?: Property.InsetInlineStart<TLength> | undefined;
  /**
   * The **`page-break-after`** CSS property adjusts page breaks _after_ the current element.
   *
   * **Syntax**: `auto | always | avoid | left | right | recto | verso`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  pageBreakAfter?: Property.PageBreakAfter | undefined;
  /**
   * The **`page-break-before`** CSS property adjusts page breaks _before_ the current element.
   *
   * **Syntax**: `auto | always | avoid | left | right | recto | verso`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  pageBreakBefore?: Property.PageBreakBefore | undefined;
  /**
   * The **`page-break-inside`** CSS property adjusts page breaks _inside_ the current element.
   *
   * **Syntax**: `auto | avoid`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  pageBreakInside?: Property.PageBreakInside | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ [<dashed-ident> || <try-tactic>] | <'position-area'> ]#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  positionTryOptions?: Property.PositionTryFallbacks | undefined;
  /**
   * **Syntax**: `none | <position>#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  scrollSnapCoordinate?: Property.ScrollSnapCoordinate<TLength> | undefined;
  /**
   * **Syntax**: `<position>`
   *
   * **Initial value**: `0px 0px`
   *
   * @deprecated
   */
  scrollSnapDestination?: Property.ScrollSnapDestination<TLength> | undefined;
  /**
   * **Syntax**: `none | repeat( <length-percentage> )`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  scrollSnapPointsX?: Property.ScrollSnapPointsX | undefined;
  /**
   * **Syntax**: `none | repeat( <length-percentage> )`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  scrollSnapPointsY?: Property.ScrollSnapPointsY | undefined;
  /**
   * **Syntax**: `none | mandatory | proximity`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  scrollSnapTypeX?: Property.ScrollSnapTypeX | undefined;
  /**
   * **Syntax**: `none | mandatory | proximity`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  scrollSnapTypeY?: Property.ScrollSnapTypeY | undefined;
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  KhtmlBoxAlign?: Property.BoxAlign | undefined;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  KhtmlBoxDirection?: Property.BoxDirection | undefined;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  KhtmlBoxFlex?: Property.BoxFlex | undefined;
  /**
   * The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  KhtmlBoxFlexGroup?: Property.BoxFlexGroup | undefined;
  /**
   * The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).
   *
   * **Syntax**: `single | multiple`
   *
   * **Initial value**: `single`
   *
   * @deprecated
   */
  KhtmlBoxLines?: Property.BoxLines | undefined;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  KhtmlBoxOrdinalGroup?: Property.BoxOrdinalGroup | undefined;
  /**
   * The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis`
   *
   * @deprecated
   */
  KhtmlBoxOrient?: Property.BoxOrient | undefined;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  KhtmlBoxPack?: Property.BoxPack | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  KhtmlLineBreak?: Property.LineBreak | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<opacity-value>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  KhtmlOpacity?: Property.Opacity | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | text | none | all`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  KhtmlUserSelect?: Property.UserSelect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-clip>#`
   *
   * **Initial value**: `border-box`
   *
   * @deprecated
   */
  MozBackgroundClip?: Property.BackgroundClip | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<visual-box>#`
   *
   * **Initial value**: `padding-box`
   *
   * @deprecated
   */
  MozBackgroundOrigin?: Property.BackgroundOrigin | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * @deprecated
   */
  MozBackgroundSize?: Property.BackgroundSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   *
   * @deprecated
   */
  MozBorderRadius?: Property.BorderRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozBorderRadiusBottomleft?: Property.BorderBottomLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozBorderRadiusBottomright?: Property.BorderBottomRightRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozBorderRadiusTopleft?: Property.BorderTopLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozBorderRadiusTopright?: Property.BorderTopRightRadius<TLength> | undefined;
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  MozBoxAlign?: Property.BoxAlign | undefined;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  MozBoxDirection?: Property.BoxDirection | undefined;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozBoxFlex?: Property.BoxFlex | undefined;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  MozBoxOrdinalGroup?: Property.BoxOrdinalGroup | undefined;
  /**
   * The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis`
   *
   * @deprecated
   */
  MozBoxOrient?: Property.BoxOrient | undefined;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  MozBoxPack?: Property.BoxPack | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozBoxShadow?: Property.BoxShadow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<integer> | auto`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  MozColumnCount?: Property.ColumnCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `auto | balance`
   *
   * **Initial value**: `balance`
   *
   * @deprecated
   */
  MozColumnFill?: Property.ColumnFill | undefined;
  /**
   * The non-standard **`-moz-float-edge`** CSS property specifies whether the height and width properties of the element include the margin, border, or padding thickness.
   *
   * **Syntax**: `border-box | content-box | margin-box | padding-box`
   *
   * **Initial value**: `content-box`
   *
   * @deprecated
   */
  MozFloatEdge?: Property.MozFloatEdge | undefined;
  /**
   * The **`-moz-force-broken-image-icon`** extended CSS property can be used to force the broken image icon to be shown even when a broken image has an `alt` attribute.
   *
   * **Syntax**: `0 | 1`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  MozForceBrokenImageIcon?: Property.MozForceBrokenImageIcon | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<opacity-value>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  MozOpacity?: Property.Opacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `<'outline-width'> || <'outline-style'> || <'outline-color'>`
   *
   * @deprecated
   */
  MozOutline?: Property.Outline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  MozOutlineColor?: Property.OutlineColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <outline-line-style>`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozOutlineStyle?: Property.OutlineStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * @deprecated
   */
  MozOutlineWidth?: Property.OutlineWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `auto | start | end | left | right | center | justify`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  MozTextAlignLast?: Property.TextAlignLast | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * @deprecated
   */
  MozTextDecorationColor?: Property.TextDecorationColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozTextDecorationLine?: Property.TextDecorationLine | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `solid | double | dotted | dashed | wavy`
   *
   * **Initial value**: `solid`
   *
   * @deprecated
   */
  MozTextDecorationStyle?: Property.TextDecorationStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  MozTransitionDelay?: Property.TransitionDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  MozTransitionDuration?: Property.TransitionDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   *
   * @deprecated
   */
  MozTransitionProperty?: Property.TransitionProperty | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * @deprecated
   */
  MozTransitionTimingFunction?: Property.TransitionTimingFunction | undefined;
  /**
   * The **`-moz-user-focus`** CSS property is used to indicate whether an element can have the focus.
   *
   * **Syntax**: `ignore | normal | select-after | select-before | select-menu | select-same | select-all | none`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  MozUserFocus?: Property.MozUserFocus | undefined;
  /**
   * In Mozilla applications, **`-moz-user-input`** determines if an element will accept user input.
   *
   * **Syntax**: `auto | none | enabled | disabled`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  MozUserInput?: Property.MozUserInput | undefined;
  /**
   * **Syntax**: `auto | normal | active | inactive | disabled`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  msImeMode?: Property.ImeMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation>#`
   *
   * @deprecated
   */
  OAnimation?: Property.Animation<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  OAnimationDelay?: Property.AnimationDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  OAnimationDirection?: Property.AnimationDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ auto | <time [0s,∞]> ]#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  OAnimationDuration?: Property.AnimationDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  OAnimationFillMode?: Property.AnimationFillMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  OAnimationIterationCount?: Property.AnimationIterationCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  OAnimationName?: Property.AnimationName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   *
   * @deprecated
   */
  OAnimationPlayState?: Property.AnimationPlayState | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * @deprecated
   */
  OAnimationTimingFunction?: Property.AnimationTimingFunction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * @deprecated
   */
  OBackgroundSize?: Property.BackgroundSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   *
   * @deprecated
   */
  OBorderImage?: Property.BorderImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `fill | contain | cover | none | scale-down`
   *
   * **Initial value**: `fill`
   *
   * @deprecated
   */
  OObjectFit?: Property.ObjectFit | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   *
   * @deprecated
   */
  OObjectPosition?: Property.ObjectPosition<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021.
   *
   * **Syntax**: `<integer> | <length>`
   *
   * **Initial value**: `8`
   *
   * @deprecated
   */
  OTabSize?: Property.TabSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ clip | ellipsis | <string> ]{1,2}`
   *
   * **Initial value**: `clip`
   *
   * @deprecated
   */
  OTextOverflow?: Property.TextOverflow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  OTransform?: Property.Transform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   *
   * @deprecated
   */
  OTransformOrigin?: Property.TransformOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   *
   * @deprecated
   */
  OTransition?: Property.Transition<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  OTransitionDelay?: Property.TransitionDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  OTransitionDuration?: Property.TransitionDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   *
   * @deprecated
   */
  OTransitionProperty?: Property.TransitionProperty | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * @deprecated
   */
  OTransitionTimingFunction?: Property.TransitionTimingFunction | undefined;
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  WebkitBoxAlign?: Property.BoxAlign | undefined;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  WebkitBoxDirection?: Property.BoxDirection | undefined;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  WebkitBoxFlex?: Property.BoxFlex | undefined;
  /**
   * The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  WebkitBoxFlexGroup?: Property.BoxFlexGroup | undefined;
  /**
   * The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).
   *
   * **Syntax**: `single | multiple`
   *
   * **Initial value**: `single`
   *
   * @deprecated
   */
  WebkitBoxLines?: Property.BoxLines | undefined;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  WebkitBoxOrdinalGroup?: Property.BoxOrdinalGroup | undefined;
  /**
   * The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis`
   *
   * @deprecated
   */
  WebkitBoxOrient?: Property.BoxOrient | undefined;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  WebkitBoxPack?: Property.BoxPack | undefined;
}
interface SvgProperties<TLength = (string & {}) | 0, TTime = string & {}> {
  alignmentBaseline?: Property.AlignmentBaseline | undefined;
  baselineShift?: Property.BaselineShift<TLength> | undefined;
  clip?: Property.Clip | undefined;
  clipPath?: Property.ClipPath | undefined;
  clipRule?: Property.ClipRule | undefined;
  color?: Property.Color | undefined;
  colorInterpolation?: Property.ColorInterpolation | undefined;
  colorRendering?: Property.ColorRendering | undefined;
  cursor?: Property.Cursor | undefined;
  direction?: Property.Direction | undefined;
  display?: Property.Display | undefined;
  dominantBaseline?: Property.DominantBaseline | undefined;
  fill?: Property.Fill | undefined;
  fillOpacity?: Property.FillOpacity | undefined;
  fillRule?: Property.FillRule | undefined;
  filter?: Property.Filter | undefined;
  floodColor?: Property.FloodColor | undefined;
  floodOpacity?: Property.FloodOpacity | undefined;
  font?: Property.Font | undefined;
  fontFamily?: Property.FontFamily | undefined;
  fontSize?: Property.FontSize<TLength> | undefined;
  fontSizeAdjust?: Property.FontSizeAdjust | undefined;
  fontStretch?: Property.FontStretch | undefined;
  fontStyle?: Property.FontStyle | undefined;
  fontVariant?: Property.FontVariant | undefined;
  fontWeight?: Property.FontWeight | undefined;
  glyphOrientationVertical?: Property.GlyphOrientationVertical | undefined;
  imageRendering?: Property.ImageRendering | undefined;
  letterSpacing?: Property.LetterSpacing<TLength> | undefined;
  lightingColor?: Property.LightingColor | undefined;
  lineHeight?: Property.LineHeight<TLength> | undefined;
  marker?: Property.Marker | undefined;
  markerEnd?: Property.MarkerEnd | undefined;
  markerMid?: Property.MarkerMid | undefined;
  markerStart?: Property.MarkerStart | undefined;
  mask?: Property.Mask<TLength> | undefined;
  opacity?: Property.Opacity | undefined;
  overflow?: Property.Overflow | undefined;
  paintOrder?: Property.PaintOrder | undefined;
  pointerEvents?: Property.PointerEvents | undefined;
  shapeRendering?: Property.ShapeRendering | undefined;
  stopColor?: Property.StopColor | undefined;
  stopOpacity?: Property.StopOpacity | undefined;
  stroke?: Property.Stroke | undefined;
  strokeDasharray?: Property.StrokeDasharray<TLength> | undefined;
  strokeDashoffset?: Property.StrokeDashoffset<TLength> | undefined;
  strokeLinecap?: Property.StrokeLinecap | undefined;
  strokeLinejoin?: Property.StrokeLinejoin | undefined;
  strokeMiterlimit?: Property.StrokeMiterlimit | undefined;
  strokeOpacity?: Property.StrokeOpacity | undefined;
  strokeWidth?: Property.StrokeWidth<TLength> | undefined;
  textAnchor?: Property.TextAnchor | undefined;
  textDecoration?: Property.TextDecoration<TLength> | undefined;
  textRendering?: Property.TextRendering | undefined;
  unicodeBidi?: Property.UnicodeBidi | undefined;
  vectorEffect?: Property.VectorEffect | undefined;
  visibility?: Property.Visibility | undefined;
  whiteSpace?: Property.WhiteSpace | undefined;
  wordSpacing?: Property.WordSpacing<TLength> | undefined;
  writingMode?: Property.WritingMode | undefined;
}
interface Properties<TLength = (string & {}) | 0, TTime = string & {}> extends StandardProperties<TLength, TTime>, VendorProperties<TLength, TTime>, ObsoleteProperties<TLength, TTime>, SvgProperties<TLength, TTime> {}
interface StandardLonghandPropertiesHyphen<TLength = (string & {}) | 0, TTime = string & {}> {
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **93** | **92**  | **15.4** | **93** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   */
  "accent-color"?: Property.AccentColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **28**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  "align-content"?: Property.AlignContent | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ] | anchor-center`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  "align-items"?: Property.AlignItems | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position> | anchor-center`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **10** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  "align-self"?: Property.AlignSelf | undefined;
  /**
   * **Syntax**: `[ normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position> ]#`
   *
   * **Initial value**: `normal`
   */
  "align-tracks"?: Property.AlignTracks | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `baseline | alphabetic | ideographic | middle | central | mathematical | text-before-edge | text-after-edge`
   *
   * **Initial value**: `baseline`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **1**  |   No    | **5.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  "alignment-baseline"?: Property.AlignmentBaseline | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <dashed-ident>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-name
   */
  "anchor-name"?: Property.AnchorName | undefined;
  /**
   * **Syntax**: `none | all | <dashed-ident>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **131** | **preview** | **26** | **131** | No  |
   */
  "anchor-scope"?: Property.AnchorScope | undefined;
  /**
   * Since July 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<single-animation-composition>#`
   *
   * **Initial value**: `replace`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **112** | **115** | **16** | **112** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   */
  "animation-composition"?: Property.AnimationComposition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-delay
   */
  "animation-delay"?: Property.AnimationDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  "animation-direction"?: Property.AnimationDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ auto | <time [0s,∞]> ]#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-duration
   */
  "animation-duration"?: Property.AnimationDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 5 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-fill-mode
   */
  "animation-fill-mode"?: Property.AnimationFillMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-iteration-count
   */
  "animation-iteration-count"?: Property.AnimationIterationCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-name
   */
  "animation-name"?: Property.AnimationName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
   */
  "animation-play-state"?: Property.AnimationPlayState | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ normal | <length-percentage> | <timeline-range-name> <length-percentage>? ]#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  "animation-range-end"?: Property.AnimationRangeEnd<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ normal | <length-percentage> | <timeline-range-name> <length-percentage>? ]#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  "animation-range-start"?: Property.AnimationRangeStart<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<single-animation-timeline>#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
   */
  "animation-timeline"?: Property.AnimationTimeline | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  "animation-timing-function"?: Property.AnimationTimingFunction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | auto | <compat-auto> | <compat-special>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |   Edge   | IE  |
   * | :-----: | :-----: | :------: | :------: | :-: |
   * | **84**  | **80**  | **15.4** |  **84**  | No  |
   * | 1 _-x-_ | 1 _-x-_ | 3 _-x-_  | 12 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  appearance?: Property.Appearance | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto || <ratio>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **88** | **89**  | **15** | **88** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/aspect-ratio
   */
  "aspect-ratio"?: Property.AspectRatio | undefined;
  /**
   * Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | <filter-value-list>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **76** | **103** | **18**  | **79** | No  |
   * |        |         | 9 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backdrop-filter
   */
  "backdrop-filter"?: Property.BackdropFilter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `visible | hidden`
   *
   * **Initial value**: `visible`
   *
   * |  Chrome  | Firefox  |  Safari   |  Edge  |   IE   |
   * | :------: | :------: | :-------: | :----: | :----: |
   * |  **36**  |  **16**  | **15.4**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 5.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backface-visibility
   */
  "backface-visibility"?: Property.BackfaceVisibility | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<attachment>#`
   *
   * **Initial value**: `scroll`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  "background-attachment"?: Property.BackgroundAttachment | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<blend-mode>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **35** | **30**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  "background-blend-mode"?: Property.BackgroundBlendMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-clip>#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **4**  |  **5**  | **12** | **9** |
   * |        |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  "background-clip"?: Property.BackgroundClip | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `transparent`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   */
  "background-color"?: Property.BackgroundColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-image>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-image
   */
  "background-image"?: Property.BackgroundImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<visual-box>#`
   *
   * **Initial value**: `padding-box`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **4**  | **3**  | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  "background-origin"?: Property.BackgroundOrigin | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `[ center | [ [ left | right | x-start | x-end ]? <length-percentage>? ]! ]#`
   *
   * **Initial value**: `0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **49**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  "background-position-x"?: Property.BackgroundPositionX<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `[ center | [ [ top | bottom | y-start | y-end ]? <length-percentage>? ]! ]#`
   *
   * **Initial value**: `0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **49**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  "background-position-y"?: Property.BackgroundPositionY<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  "background-repeat"?: Property.BackgroundRepeat | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **3**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-size
   */
  "background-size"?: Property.BackgroundSize<TLength> | undefined;
  /**
   * **Syntax**: `<length-percentage> | sub | super | baseline`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |   No    | **4**  | **79** | No  |
   */
  "baseline-shift"?: Property.BaselineShift<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   *
   * |            Chrome            | Firefox |             Safari             |  Edge  | IE  |
   * | :--------------------------: | :-----: | :----------------------------: | :----: | :-: |
   * |            **57**            | **41**  |            **12.1**            | **79** | No  |
   * | 8 _(-webkit-logical-height)_ |         | 5.1 _(-webkit-logical-height)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  "block-size"?: Property.BlockSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color
   */
  "border-block-end-color"?: Property.BorderBlockEndColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  "border-block-end-style"?: Property.BorderBlockEndStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   */
  "border-block-end-width"?: Property.BorderBlockEndWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-color
   */
  "border-block-start-color"?: Property.BorderBlockStartColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  "border-block-start-style"?: Property.BorderBlockStartStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   */
  "border-block-start-width"?: Property.BorderBlockStartWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-color
   */
  "border-bottom-color"?: Property.BorderBottomColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-left-radius
   */
  "border-bottom-left-radius"?: Property.BorderBottomLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-right-radius
   */
  "border-bottom-right-radius"?: Property.BorderBottomRightRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  "border-bottom-style"?: Property.BorderBottomStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   */
  "border-bottom-width"?: Property.BorderBottomWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `separate | collapse`
   *
   * **Initial value**: `separate`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.1** | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-collapse
   */
  "border-collapse"?: Property.BorderCollapse | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-end-radius
   */
  "border-end-end-radius"?: Property.BorderEndEndRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-start-radius
   */
  "border-end-start-radius"?: Property.BorderEndStartRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <length [0,∞]> | <number [0,∞]> ]{1,4}  `
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-outset
   */
  "border-image-outset"?: Property.BorderImageOutset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2016.
   *
   * **Syntax**: `[ stretch | repeat | round | space ]{1,2}`
   *
   * **Initial value**: `stretch`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  "border-image-repeat"?: Property.BorderImageRepeat | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <number [0,∞]> | <percentage [0,∞]> ]{1,4}  && fill?`
   *
   * **Initial value**: `100%`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-slice
   */
  "border-image-slice"?: Property.BorderImageSlice | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <image>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-source
   */
  "border-image-source"?: Property.BorderImageSource | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <length-percentage [0,∞]> | <number [0,∞]> | auto ]{1,4}`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **16** | **13**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-width
   */
  "border-image-width"?: Property.BorderImageWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-color)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   */
  "border-inline-end-color"?: Property.BorderInlineEndColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-style)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  "border-inline-end-style"?: Property.BorderInlineEndStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-width)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  "border-inline-end-width"?: Property.BorderInlineEndWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome |            Firefox            |  Safari  |  Edge  | IE  |
   * | :----: | :---------------------------: | :------: | :----: | :-: |
   * | **69** |            **41**             | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-start-color)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   */
  "border-inline-start-color"?: Property.BorderInlineStartColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome |            Firefox            |  Safari  |  Edge  | IE  |
   * | :----: | :---------------------------: | :------: | :----: | :-: |
   * | **69** |            **41**             | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-start-style)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  "border-inline-start-style"?: Property.BorderInlineStartStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  "border-inline-start-width"?: Property.BorderInlineStartWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-color
   */
  "border-left-color"?: Property.BorderLeftColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  "border-left-style"?: Property.BorderLeftStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   */
  "border-left-width"?: Property.BorderLeftWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-color
   */
  "border-right-color"?: Property.BorderRightColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  "border-right-style"?: Property.BorderRightStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   */
  "border-right-width"?: Property.BorderRightWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-spacing
   */
  "border-spacing"?: Property.BorderSpacing<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-end-radius
   */
  "border-start-end-radius"?: Property.BorderStartEndRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-start-radius
   */
  "border-start-start-radius"?: Property.BorderStartStartRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-color
   */
  "border-top-color"?: Property.BorderTopColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-left-radius
   */
  "border-top-left-radius"?: Property.BorderTopLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-right-radius
   */
  "border-top-right-radius"?: Property.BorderTopRightRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  "border-top-style"?: Property.BorderTopStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   */
  "border-top-width"?: Property.BorderTopWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/bottom
   */
  bottom?: Property.Bottom<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `slice | clone`
   *
   * **Initial value**: `slice`
   *
   * |  Chrome  | Firefox |   Safari    |   Edge   | IE  |
   * | :------: | :-----: | :---------: | :------: | :-: |
   * | **130**  | **32**  | **7** _-x-_ | **130**  | No  |
   * | 22 _-x-_ |         |             | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break
   */
  "box-decoration-break"?: Property.BoxDecorationBreak | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * | **10**  |  **4**  | **5.1** | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-shadow
   */
  "box-shadow"?: Property.BoxShadow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `content-box | border-box`
   *
   * **Initial value**: `content-box`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * | **10**  | **29**  | **5.1** | **12** | **8** |
   * | 1 _-x-_ | 1 _-x-_ | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-sizing
   */
  "box-sizing"?: Property.BoxSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019.
   *
   * **Syntax**: `auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  "break-after"?: Property.BreakAfter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019.
   *
   * **Syntax**: `auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  "break-before"?: Property.BreakBefore | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019.
   *
   * **Syntax**: `auto | avoid | avoid-page | avoid-column | avoid-region`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  "break-inside"?: Property.BreakInside | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `top | bottom`
   *
   * **Initial value**: `top`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
   */
  "caption-side"?: Property.CaptionSide | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **53**  | **11.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   */
  "caret-color"?: Property.CaretColor | undefined;
  /**
   * **Syntax**: `auto | bar | block | underscore`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  "caret-shape"?: Property.CaretShape | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | left | right | both | inline-start | inline-end`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  clear?: Property.Clear | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<clip-source> | [ <basic-shape> || <geometry-box> ] | none`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **55**  | **3.5** | **9.1** | **79** | **10** |
   * | 23 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  "clip-path"?: Property.ClipPath | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `nonzero | evenodd`
   *
   * **Initial value**: `nonzero`
   *
   * | Chrome  | Firefox | Safari |  Edge  | IE  |
   * | :-----: | :-----: | :----: | :----: | :-: |
   * | **≤15** | **3.5** | **≤5** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   */
  "clip-rule"?: Property.ClipRule | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `canvastext`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color
   */
  color?: Property.Color | undefined;
  /**
   * Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `economy | exact`
   *
   * **Initial value**: `economy`
   *
   * |  Chrome  |       Firefox       |  Safari  |   Edge   | IE  |
   * | :------: | :-----------------: | :------: | :------: | :-: |
   * | **136**  |       **97**        | **15.4** | **136**  | No  |
   * | 17 _-x-_ | 48 _(color-adjust)_ | 6 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  "color-adjust"?: Property.PrintColorAdjust | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | sRGB | linearRGB`
   *
   * **Initial value**: `linearRGB`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **3**  | **3**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   */
  "color-interpolation-filters"?: Property.ColorInterpolationFilters | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2022.
   *
   * **Syntax**: `normal | [ light | dark | <custom-ident> ]+ && only?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **81** | **96**  | **13** | **81** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   */
  "color-scheme"?: Property.ColorScheme | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<integer> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-count
   */
  "column-count"?: Property.ColumnCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `auto | balance`
   *
   * **Initial value**: `balance`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **50** | **52**  |  **9**  | **12** | **10** |
   * |        |         | 8 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
   */
  "column-fill"?: Property.ColumnFill | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **1**  | **1.5** | **3**  | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-gap
   */
  "column-gap"?: Property.ColumnGap<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
   */
  "column-rule-color"?: Property.ColumnRuleColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  "column-rule-style"?: Property.ColumnRuleStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   */
  "column-rule-width"?: Property.ColumnRuleWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `none | all`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **50**  | **71**  |   **9**   | **12** | **10** |
   * | 6 _-x-_ |         | 5.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
   */
  "column-span"?: Property.ColumnSpan | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016.
   *
   * **Syntax**: `<length> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **50**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-width
   */
  "column-width"?: Property.ColumnWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | strict | content | [ [ size || inline-size ] || layout || style || paint ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **52** | **69**  | **15.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  contain?: Property.Contain | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size
   */
  "contain-intrinsic-block-size"?: Property.ContainIntrinsicBlockSize<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-height
   */
  "contain-intrinsic-height"?: Property.ContainIntrinsicHeight<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size
   */
  "contain-intrinsic-inline-size"?: Property.ContainIntrinsicInlineSize<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-width
   */
  "contain-intrinsic-width"?: Property.ContainIntrinsicWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `none | <custom-ident>+`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **105** | **110** | **16** | **105** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-name
   */
  "container-name"?: Property.ContainerName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `normal | [ [ size | inline-size ] || scroll-state ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **105** | **110** | **16** | **105** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type
   */
  "container-type"?: Property.ContainerType | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | none | [ <content-replacement> | <content-list> ] [ / [ <string> | <counter> | <attr()> ]+ ]?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  content?: Property.Content | undefined;
  /**
   * Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `visible | auto | hidden`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **85** | **125** | **18** | **85** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content-visibility
   */
  "content-visibility"?: Property.ContentVisibility | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <counter-name> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **3**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-increment
   */
  "counter-increment"?: Property.CounterIncrement | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <counter-name> <integer>? | <reversed-counter-name> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **3**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-reset
   */
  "counter-reset"?: Property.CounterReset | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <counter-name> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **85** | **68**  | **17.2** | **85** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set
   */
  "counter-set"?: Property.CounterSet | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since December 2021.
   *
   * **Syntax**: `[ [ <url> [ <x> <y> ]? , ]* <cursor-predefined> ]`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  cursor?: Property.Cursor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **43** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cx
   */
  cx?: Property.Cx<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **43** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cy
   */
  cy?: Property.Cy<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | path(<string>)`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **52** | **97**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/d
   */
  d?: Property.D | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `ltr | rtl`
   *
   * **Initial value**: `ltr`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **2**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
   */
  direction?: Property.Direction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>`
   *
   * **Initial value**: `inline`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  display?: Property.Display | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | text-bottom | alphabetic | ideographic | middle | central | mathematical | hanging | text-top`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **1**  | **4**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  "dominant-baseline"?: Property.DominantBaseline | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `show | hide`
   *
   * **Initial value**: `show`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
   */
  "empty-cells"?: Property.EmptyCells | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `content | fixed`
   *
   * **Initial value**: `fixed`
   *
   * | Chrome  | Firefox |   Safari    |  Edge   | IE  |
   * | :-----: | :-----: | :---------: | :-----: | :-: |
   * | **123** |   No    | **preview** | **123** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
   */
  "field-sizing"?: Property.FieldSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<paint>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  fill?: Property.Fill | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **1**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-opacity
   */
  "fill-opacity"?: Property.FillOpacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `nonzero | evenodd`
   *
   * **Initial value**: `nonzero`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   */
  "fill-rule"?: Property.FillRule | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `none | <filter-value-list>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  | IE  |
   * | :------: | :-----: | :-----: | :----: | :-: |
   * |  **53**  | **35**  | **9.1** | **12** | No  |
   * | 18 _-x-_ |         | 6 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter
   */
  filter?: Property.Filter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `content | <'width'>`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **22**  |  **9**  | **12** | **11** |
   * | 22 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  "flex-basis"?: Property.FlexBasis<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **22**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
   */
  "flex-direction"?: Property.FlexDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |            IE            |
   * | :------: | :-----: | :-----: | :----: | :----------------------: |
   * |  **29**  | **20**  |  **9**  | **12** |          **11**          |
   * | 22 _-x-_ |         | 7 _-x-_ |        | 10 _(-ms-flex-positive)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-grow
   */
  "flex-grow"?: Property.FlexGrow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `1`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **10** |
   * | 22 _-x-_ |         | 8 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-shrink
   */
  "flex-shrink"?: Property.FlexShrink | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `nowrap | wrap | wrap-reverse`
   *
   * **Initial value**: `nowrap`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **28**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-wrap
   */
  "flex-wrap"?: Property.FlexWrap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `left | right | none | inline-start | inline-end`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  float?: Property.Float | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **5**  |  **3**  | **6**  | **12** | **≤11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   */
  "flood-color"?: Property.FloodColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **5**  |  **3**  | **6**  | **12** | **≤11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-opacity
   */
  "flood-opacity"?: Property.FloodOpacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <family-name> | <generic-family> ]#`
   *
   * **Initial value**: depends on user agent
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  "font-family"?: Property.FontFamily | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `normal | <feature-tag-value>#`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **48**  |  **34**  | **9.1** | **15** | **10** |
   * | 16 _-x-_ | 15 _-x-_ |         |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-feature-settings
   */
  "font-feature-settings"?: Property.FontFeatureSettings | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | normal | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **33** | **32**  |  **9**  | **79** | No  |
   * |        |         | 6 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   */
  "font-kerning"?: Property.FontKerning | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | <string>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **143** | **34**  |   No   | **143** | No  |
   * |         | 4 _-x-_ |        |         |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override
   */
  "font-language-override"?: Property.FontLanguageOverride | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2020.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **79** | **62**  | **13.1** | **17** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
   */
  "font-optical-sizing"?: Property.FontOpticalSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2022.
   *
   * **Syntax**: `normal | light | dark | <palette-identifier> | <palette-mix()>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **101** | **107** | **15.4** | **101** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   */
  "font-palette"?: Property.FontPalette | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<absolute-size> | <relative-size> | <length-percentage [0,∞]> | math`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  "font-size"?: Property.FontSize<TLength> | undefined;
  /**
   * Since July 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | [ ex-height | cap-height | ch-width | ic-width | ic-height ]? [ from-font | <number> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **127** |  **3**  | **16.4** | **127** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
   */
  "font-size-adjust"?: Property.FontSizeAdjust | undefined;
  /**
   * The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered.
   *
   * **Syntax**: `auto | never | always | <absolute-size> | <length>`
   *
   * **Initial value**: `auto`
   *
   * |              Chrome              |              Firefox               |              Safari              |               Edge                | IE  |
   * | :------------------------------: | :--------------------------------: | :------------------------------: | :-------------------------------: | :-: |
   * | **5** _(-webkit-font-smoothing)_ | **25** _(-moz-osx-font-smoothing)_ | **4** _(-webkit-font-smoothing)_ | **79** _(-webkit-font-smoothing)_ | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  "font-smooth"?: Property.FontSmooth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | italic | oblique <angle>?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   */
  "font-style"?: Property.FontStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2022.
   *
   * **Syntax**: `none | [ weight || style || small-caps || position]`
   *
   * **Initial value**: `weight style small-caps position `
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **97** | **34**  | **9**  | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  "font-synthesis"?: Property.FontSynthesis | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **118** |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
   */
  "font-synthesis-position"?: Property.FontSynthesisPosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **97** | **111** | **16.4** | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
   */
  "font-synthesis-small-caps"?: Property.FontSynthesisSmallCaps | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **97** | **111** | **16.4** | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
   */
  "font-synthesis-style"?: Property.FontSynthesisStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **97** | **111** | **16.4** | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
   */
  "font-synthesis-weight"?: Property.FontSynthesisWeight | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  "font-variant"?: Property.FontVariant | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :-----: | :-----: | :-: |
   * | **111** | **34**  | **9.1** | **111** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
   */
  "font-variant-alternates"?: Property.FontVariantAlternates | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **52** | **34**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  "font-variant-caps"?: Property.FontVariantCaps | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **63** | **34**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  "font-variant-east-asian"?: Property.FontVariantEastAsian | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | text | emoji | unicode`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **131** | **141** |   No   | **131** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  "font-variant-emoji"?: Property.FontVariantEmoji | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  | IE  |
   * | :------: | :-----: | :-----: | :----: | :-: |
   * |  **34**  | **34**  | **9.1** | **79** | No  |
   * | 31 _-x-_ |         | 7 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  "font-variant-ligatures"?: Property.FontVariantLigatures | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **52** | **34**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  "font-variant-numeric"?: Property.FontVariantNumeric | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | sub | super`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  | Edge | IE  |
   * | :----: | :-----: | :-----: | :--: | :-: |
   * |   No   | **34**  | **9.1** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   */
  "font-variant-position"?: Property.FontVariantPosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2018.
   *
   * **Syntax**: `normal | [ <string> <number> ]#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **62** | **62**  | **11** | **17** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variation-settings
   */
  "font-variation-settings"?: Property.FontVariationSettings | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<font-weight-absolute> | bolder | lighter`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-weight
   */
  "font-weight"?: Property.FontWeight | undefined;
  /**
   * **Syntax**: `normal | <percentage [0,∞]> | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **18.4** |  No  | No  |
   */
  "font-width"?: Property.FontWidth | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | none | preserve-parent-color`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |              Edge               |                 IE                  |
   * | :----: | :-----: | :----: | :-----------------------------: | :---------------------------------: |
   * | **89** | **113** |   No   |             **79**              | **10** _(-ms-high-contrast-adjust)_ |
   * |        |         |        | 12 _(-ms-high-contrast-adjust)_ |                                     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   */
  "forced-color-adjust"?: Property.ForcedColorAdjust | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<track-size>+`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |             IE              |
   * | :----: | :-----: | :------: | :----: | :-------------------------: |
   * | **57** | **70**  | **10.1** | **16** | **10** _(-ms-grid-columns)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   */
  "grid-auto-columns"?: Property.GridAutoColumns<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `[ row | column ] || dense`
   *
   * **Initial value**: `row`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-flow
   */
  "grid-auto-flow"?: Property.GridAutoFlow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<track-size>+`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |            IE            |
   * | :----: | :-----: | :------: | :----: | :----------------------: |
   * | **57** | **70**  | **10.1** | **16** | **10** _(-ms-grid-rows)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   */
  "grid-auto-rows"?: Property.GridAutoRows<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-end
   */
  "grid-column-end"?: Property.GridColumnEnd | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-start
   */
  "grid-column-start"?: Property.GridColumnStart | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-end
   */
  "grid-row-end"?: Property.GridRowEnd | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-start
   */
  "grid-row-start"?: Property.GridRowStart | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | <string>+`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-areas
   */
  "grid-template-areas"?: Property.GridTemplateAreas | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | <track-list> | <auto-track-list> | subgrid <line-name-list>?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |             IE              |
   * | :----: | :-----: | :------: | :----: | :-------------------------: |
   * | **57** | **52**  | **10.1** | **16** | **10** _(-ms-grid-columns)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   */
  "grid-template-columns"?: Property.GridTemplateColumns<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | <track-list> | <auto-track-list> | subgrid <line-name-list>?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |            IE            |
   * | :----: | :-----: | :------: | :----: | :----------------------: |
   * | **57** | **52**  | **10.1** | **16** | **10** _(-ms-grid-rows)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   */
  "grid-template-rows"?: Property.GridTemplateRows<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ first || [ force-end | allow-end ] || last ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    | **10** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  "hanging-punctuation"?: Property.HangingPunctuation | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  height?: Property.Height<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | <string>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari   |   Edge   | IE  |
   * | :-----: | :-----: | :-------: | :------: | :-: |
   * | **106** | **98**  |  **17**   | **106**  | No  |
   * | 6 _-x-_ |         | 5.1 _-x-_ | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-character
   */
  "hyphenate-character"?: Property.HyphenateCharacter | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ auto | <integer> ]{1,3}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **109** | **137** |   No   | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-limit-chars
   */
  "hyphenate-limit-chars"?: Property.HyphenateLimitChars | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |      IE      |
   * | :------: | :-----: | :-------: | :----: | :----------: |
   * |  **55**  | **43**  |  **17**   | **79** | **10** _-x-_ |
   * | 13 _-x-_ | 6 _-x-_ | 5.1 _-x-_ |        |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   */
  hyphens?: Property.Hyphens | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2020.
   *
   * **Syntax**: `from-image | <angle> | [ <angle>? flip ]`
   *
   * **Initial value**: `from-image`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **81** | **26**  | **13.1** | **81** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-orientation
   */
  "image-orientation"?: Property.ImageOrientation | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | crisp-edges | pixelated | smooth`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **13** | **3.6** | **6**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  "image-rendering"?: Property.ImageRendering | undefined;
  /**
   * The **`image-resolution`** CSS property specifies the intrinsic resolution of all raster images used in or on the element. It affects content images such as replaced elements and generated content, and decorative images such as `background-image` images.
   *
   * **Syntax**: `[ from-image || <resolution> ] && snap?`
   *
   * **Initial value**: `1dppx`
   */
  "image-resolution"?: Property.ImageResolution | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | [ <number> <integer>? ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |   Safari    |  Edge   | IE  |
   * | :-----: | :-----: | :---------: | :-----: | :-: |
   * | **110** |   No    | **9** _-x-_ | **110** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter
   */
  "initial-letter"?: Property.InitialLetter | undefined;
  /**
   * **Syntax**: `[ auto | alphabetic | hanging | ideographic ]`
   *
   * **Initial value**: `auto`
   */
  "initial-letter-align"?: Property.InitialLetterAlign | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   *
   * |           Chrome            | Firefox |            Safari             |  Edge  | IE  |
   * | :-------------------------: | :-----: | :---------------------------: | :----: | :-: |
   * |           **57**            | **41**  |           **12.1**            | **79** | No  |
   * | 8 _(-webkit-logical-width)_ |         | 5.1 _(-webkit-logical-width)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  "inline-size"?: Property.InlineSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-end
   */
  "inset-block-end"?: Property.InsetBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-start
   */
  "inset-block-start"?: Property.InsetBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   */
  "inset-inline-end"?: Property.InsetInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   */
  "inset-inline-start"?: Property.InsetInlineStart<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `numeric-only | allow-keywords`
   *
   * **Initial value**: `numeric-only`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **129** |   No    |   No   | **129** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size
   */
  "interpolate-size"?: Property.InterpolateSize | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | isolate`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **41** | **36**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/isolation
   */
  isolation?: Property.Isolation | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  "justify-content"?: Property.JustifyContent | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2016.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ] | anchor-center`
   *
   * **Initial value**: `legacy`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **52** | **20**  | **9**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  "justify-items"?: Property.JustifyItems | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | anchor-center`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :------: | :----: | :----: |
   * | **57** | **45**  | **10.1** | **16** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  "justify-self"?: Property.JustifySelf | undefined;
  /**
   * **Syntax**: `[ normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ] ]#`
   *
   * **Initial value**: `normal`
   */
  "justify-tracks"?: Property.JustifyTracks | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/left
   */
  left?: Property.Left<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <length>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/letter-spacing
   */
  "letter-spacing"?: Property.LetterSpacing<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `white`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **5**  |  **3**  | **6**  | **12** | **≤11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/lighting-color
   */
  "lighting-color"?: Property.LightingColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE    |
   * | :-----: | :-----: | :-----: | :----: | :-----: |
   * | **58**  | **69**  | **11**  | **14** | **5.5** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |         |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  "line-break"?: Property.LineBreak | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <number> | <length> | <percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height
   */
  "line-height"?: Property.LineHeight<TLength> | undefined;
  /**
   * The **`line-height-step`** CSS property sets the step unit for line box heights. When the property is set, line box heights are rounded up to the closest multiple of the unit.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  "line-height-step"?: Property.LineHeightStep<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<image> | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-image
   */
  "list-style-image"?: Property.ListStyleImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `inside | outside`
   *
   * **Initial value**: `outside`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-position
   */
  "list-style-position"?: Property.ListStylePosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<counter-style> | <string> | none`
   *
   * **Initial value**: `disc`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-type
   */
  "list-style-type"?: Property.ListStyleType | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-end
   */
  "margin-block-end"?: Property.MarginBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-start
   */
  "margin-block-start"?: Property.MarginBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-bottom
   */
  "margin-bottom"?: Property.MarginBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome          |        Firefox        |          Safari          |  Edge  | IE  |
   * | :----------------------: | :-------------------: | :----------------------: | :----: | :-: |
   * |          **69**          |        **41**         |         **12.1**         | **79** | No  |
   * | 2 _(-webkit-margin-end)_ | 3 _(-moz-margin-end)_ | 3 _(-webkit-margin-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   */
  "margin-inline-end"?: Property.MarginInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome           |         Firefox         |           Safari           |  Edge  | IE  |
   * | :------------------------: | :---------------------: | :------------------------: | :----: | :-: |
   * |           **69**           |         **41**          |          **12.1**          | **79** | No  |
   * | 2 _(-webkit-margin-start)_ | 3 _(-moz-margin-start)_ | 3 _(-webkit-margin-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   */
  "margin-inline-start"?: Property.MarginInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-left
   */
  "margin-left"?: Property.MarginLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-right
   */
  "margin-right"?: Property.MarginRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-top
   */
  "margin-top"?: Property.MarginTop<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | in-flow | all`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **16.4** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   */
  "margin-trim"?: Property.MarginTrim | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker
   */
  marker?: Property.Marker | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-end
   */
  "marker-end"?: Property.MarkerEnd | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-mid
   */
  "marker-mid"?: Property.MarkerMid | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-start
   */
  "marker-start"?: Property.MarkerStart | undefined;
  /**
   * The **`mask-border-mode`** CSS property specifies the blending mode used in a mask border.
   *
   * **Syntax**: `luminance | alpha`
   *
   * **Initial value**: `alpha`
   */
  "mask-border-mode"?: Property.MaskBorderMode | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <length> | <number> ]{1,4}`
   *
   * **Initial value**: `0`
   *
   * |                 Chrome                  | Firefox |                Safari                 |                   Edge                   | IE  |
   * | :-------------------------------------: | :-----: | :-----------------------------------: | :--------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-outset)_ |   No    |               **17.2**                | **79** _(-webkit-mask-box-image-outset)_ | No  |
   * |                                         |         | 3.1 _(-webkit-mask-box-image-outset)_ |                                          |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-outset
   */
  "mask-border-outset"?: Property.MaskBorderOutset<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ stretch | repeat | round | space ]{1,2}`
   *
   * **Initial value**: `stretch`
   *
   * |                 Chrome                  | Firefox |                Safari                 |                   Edge                   | IE  |
   * | :-------------------------------------: | :-----: | :-----------------------------------: | :--------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-repeat)_ |   No    |               **17.2**                | **79** _(-webkit-mask-box-image-repeat)_ | No  |
   * |                                         |         | 3.1 _(-webkit-mask-box-image-repeat)_ |                                          |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  "mask-border-repeat"?: Property.MaskBorderRepeat | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<number-percentage>{1,4} fill?`
   *
   * **Initial value**: `0`
   *
   * |                 Chrome                 | Firefox |                Safari                |                  Edge                   | IE  |
   * | :------------------------------------: | :-----: | :----------------------------------: | :-------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-slice)_ |   No    |               **17.2**               | **79** _(-webkit-mask-box-image-slice)_ | No  |
   * |                                        |         | 3.1 _(-webkit-mask-box-image-slice)_ |                                         |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-slice
   */
  "mask-border-slice"?: Property.MaskBorderSlice | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <image>`
   *
   * **Initial value**: `none`
   *
   * |                 Chrome                  | Firefox |                Safari                 |                   Edge                   | IE  |
   * | :-------------------------------------: | :-----: | :-----------------------------------: | :--------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-source)_ |   No    |               **17.2**                | **79** _(-webkit-mask-box-image-source)_ | No  |
   * |                                         |         | 3.1 _(-webkit-mask-box-image-source)_ |                                          |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-source
   */
  "mask-border-source"?: Property.MaskBorderSource | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <length-percentage> | <number> | auto ]{1,4}`
   *
   * **Initial value**: `auto`
   *
   * |                 Chrome                 | Firefox |                Safari                |                  Edge                   | IE  |
   * | :------------------------------------: | :-----: | :----------------------------------: | :-------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-width)_ |   No    |               **17.2**               | **79** _(-webkit-mask-box-image-width)_ | No  |
   * |                                        |         | 3.1 _(-webkit-mask-box-image-width)_ |                                         |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-width
   */
  "mask-border-width"?: Property.MaskBorderWidth<TLength> | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <coord-box> | no-clip ]#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome  | Firefox |  Safari  |   Edge   | IE  |
   * | :-----: | :-----: | :------: | :------: | :-: |
   * | **120** | **53**  | **15.4** | **120**  | No  |
   * | 1 _-x-_ |         | 4 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  "mask-clip"?: Property.MaskClip | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<compositing-operator>#`
   *
   * **Initial value**: `add`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **120** | **53**  | **15.4** | 18-79 | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  "mask-composite"?: Property.MaskComposite | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<mask-reference>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **120** | **53**  | **15.4** | 16-79 | No  |
   * | 1 _-x-_ |         | 4 _-x-_  |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-image
   */
  "mask-image"?: Property.MaskImage | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<masking-mode>#`
   *
   * **Initial value**: `match-source`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **120** | **53**  | **15.4** | **120** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   */
  "mask-mode"?: Property.MaskMode | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<coord-box>#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome  | Firefox |  Safari  |   Edge   | IE  |
   * | :-----: | :-----: | :------: | :------: | :-: |
   * | **120** | **53**  | **15.4** | **120**  | No  |
   * | 1 _-x-_ |         | 4 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  "mask-origin"?: Property.MaskOrigin | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<position>#`
   *
   * **Initial value**: `0% 0%`
   *
   * | Chrome  | Firefox |  Safari   | Edge  | IE  |
   * | :-----: | :-----: | :-------: | :---: | :-: |
   * | **120** | **53**  | **15.4**  | 18-79 | No  |
   * | 1 _-x-_ |         | 3.1 _-x-_ |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  "mask-position"?: Property.MaskPosition<TLength> | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   *
   * | Chrome  | Firefox |  Safari   | Edge  | IE  |
   * | :-----: | :-----: | :-------: | :---: | :-: |
   * | **120** | **53**  | **15.4**  | 18-79 | No  |
   * | 1 _-x-_ |         | 3.1 _-x-_ |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  "mask-repeat"?: Property.MaskRepeat | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **120** | **53**  | **15.4** | 18-79 | No  |
   * | 4 _-x-_ |         | 4 _-x-_  |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   */
  "mask-size"?: Property.MaskSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `luminance | alpha`
   *
   * **Initial value**: `luminance`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **24** | **35**  | **7**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-type
   */
  "mask-type"?: Property.MaskType | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `[ pack | next ] || [ definite-first | ordered ]`
   *
   * **Initial value**: `pack`
   */
  "masonry-auto-flow"?: Property.MasonryAutoFlow | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto-add | add(<integer>) | <integer>`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **109** | **117** |   No   | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-depth
   */
  "math-depth"?: Property.MathDepth | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | compact`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **109** |   No    |   No   | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-shift
   */
  "math-shift"?: Property.MathShift | undefined;
  /**
   * Since August 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | compact`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **109** | **117** | **14.1** | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-style
   */
  "math-style"?: Property.MathStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  "max-block-size"?: Property.MaxBlockSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  "max-height"?: Property.MaxHeight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |   Safari   |  Edge  | IE  |
   * | :----: | :-----: | :--------: | :----: | :-: |
   * | **57** | **41**  |  **12.1**  | **79** | No  |
   * |        |         | 10.1 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  "max-inline-size"?: Property.MaxInlineSize<TLength> | undefined;
  /**
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   */
  "max-lines"?: Property.MaxLines | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  "max-width"?: Property.MaxWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  "min-block-size"?: Property.MinBlockSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **3**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  "min-height"?: Property.MinHeight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  "min-inline-size"?: Property.MinInlineSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  "min-width"?: Property.MinWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<blend-mode> | plus-darker | plus-lighter`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **41** | **32**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  "mix-blend-mode"?: Property.MixBlendMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **55**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-distance)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  "motion-distance"?: Property.OffsetDistance<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | <offset-path> || <coord-box>`
   *
   * **Initial value**: `none`
   *
   * |       Chrome       | Firefox |  Safari  |  Edge  | IE  |
   * | :----------------: | :-----: | :------: | :----: | :-: |
   * |       **55**       | **72**  | **15.4** | **79** | No  |
   * | 46 _(motion-path)_ |         |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  "motion-path"?: Property.OffsetPath | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ auto | reverse ] || <angle>`
   *
   * **Initial value**: `auto`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **56**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-rotation)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  "motion-rotation"?: Property.OffsetRotate | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `fill | contain | cover | none | scale-down`
   *
   * **Initial value**: `fill`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **32** | **36**  | **10** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
   */
  "object-fit"?: Property.ObjectFit | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **32** | **36**  | **10** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  "object-position"?: Property.ObjectPosition<TLength> | undefined;
  /**
   * **Syntax**: `none | <basic-shape-rect>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **104** |   No    |   No   | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-view-box
   */
  "object-view-box"?: Property.ObjectViewBox | undefined;
  /**
   * Since August 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | <position>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **116** | **72**  | **16** | **116** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  "offset-anchor"?: Property.OffsetAnchor<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **55**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-distance)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  "offset-distance"?: Property.OffsetDistance<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | <offset-path> || <coord-box>`
   *
   * **Initial value**: `none`
   *
   * |       Chrome       | Firefox |  Safari  |  Edge  | IE  |
   * | :----------------: | :-----: | :------: | :----: | :-: |
   * |       **55**       | **72**  | **15.4** | **79** | No  |
   * | 46 _(motion-path)_ |         |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  "offset-path"?: Property.OffsetPath | undefined;
  /**
   * Since January 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | auto | <position>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **116** | **122** | **16** | **116** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  "offset-position"?: Property.OffsetPosition<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ auto | reverse ] || <angle>`
   *
   * **Initial value**: `auto`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **56**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-rotation)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  "offset-rotate"?: Property.OffsetRotate | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ auto | reverse ] || <angle>`
   *
   * **Initial value**: `auto`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **56**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-rotation)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  "offset-rotation"?: Property.OffsetRotate | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<opacity-value>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **2**  | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/opacity
   */
  opacity?: Property.Opacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **20**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/order
   */
  order?: Property.Order | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `2`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **25** |   No    | **1.3** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/orphans
   */
  orphans?: Property.Orphans | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  "outline-color"?: Property.OutlineColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **1**  | **1.5** | **1.2** | **15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-offset
   */
  "outline-offset"?: Property.OutlineOffset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <outline-line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  "outline-style"?: Property.OutlineStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  "outline-width"?: Property.OutlineWidth<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |   Safari    |  Edge  | IE  |
   * | :----: | :-----: | :---------: | :----: | :-: |
   * | **56** | **66**  | **preview** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor
   */
  "overflow-anchor"?: Property.OverflowAnchor | undefined;
  /**
   * Since September 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **135** | **69**  | **26** | **135** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  "overflow-block"?: Property.OverflowBlock | undefined;
  /**
   * **Syntax**: `padding-box | content-box`
   *
   * **Initial value**: `padding-box`
   */
  "overflow-clip-box"?: Property.OverflowClipBox | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<visual-box> || <length [0,∞]>`
   *
   * **Initial value**: `0px`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **90** | **102** |   No   | **90** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   */
  "overflow-clip-margin"?: Property.OverflowClipMargin<TLength> | undefined;
  /**
   * Since September 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **135** | **69**  | **26** | **135** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  "overflow-inline"?: Property.OverflowInline | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2018.
   *
   * **Syntax**: `normal | break-word | anywhere`
   *
   * **Initial value**: `normal`
   *
   * |     Chrome      |      Firefox      |     Safari      |       Edge       |          IE           |
   * | :-------------: | :---------------: | :-------------: | :--------------: | :-------------------: |
   * |     **23**      |      **49**       |      **7**      |      **18**      | **5.5** _(word-wrap)_ |
   * | 1 _(word-wrap)_ | 3.5 _(word-wrap)_ | 1 _(word-wrap)_ | 12 _(word-wrap)_ |                       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-wrap
   */
  "overflow-wrap"?: Property.OverflowWrap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **3.5** | **3**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  "overflow-x"?: Property.OverflowX | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **3.5** | **3**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  "overflow-y"?: Property.OverflowY | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | auto`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **117** |   No    |   No   | **117** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overlay
   */
  overlay?: Property.Overlay | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **77** | **73**  | **16** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   */
  "overscroll-behavior-block"?: Property.OverscrollBehaviorBlock | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **77** | **73**  | **16** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   */
  "overscroll-behavior-inline"?: Property.OverscrollBehaviorInline | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  | **16** | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   */
  "overscroll-behavior-x"?: Property.OverscrollBehaviorX | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  | **16** | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   */
  "overscroll-behavior-y"?: Property.OverscrollBehaviorY | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-end
   */
  "padding-block-end"?: Property.PaddingBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-start
   */
  "padding-block-start"?: Property.PaddingBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-bottom
   */
  "padding-bottom"?: Property.PaddingBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome           |        Firefox         |          Safari           |  Edge  | IE  |
   * | :-----------------------: | :--------------------: | :-----------------------: | :----: | :-: |
   * |          **69**           |         **41**         |         **12.1**          | **79** | No  |
   * | 2 _(-webkit-padding-end)_ | 3 _(-moz-padding-end)_ | 3 _(-webkit-padding-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
   */
  "padding-inline-end"?: Property.PaddingInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome            |         Firefox          |           Safari            |  Edge  | IE  |
   * | :-------------------------: | :----------------------: | :-------------------------: | :----: | :-: |
   * |           **69**            |          **41**          |          **12.1**           | **79** | No  |
   * | 2 _(-webkit-padding-start)_ | 3 _(-moz-padding-start)_ | 3 _(-webkit-padding-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
   */
  "padding-inline-start"?: Property.PaddingInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-left
   */
  "padding-left"?: Property.PaddingLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-right
   */
  "padding-right"?: Property.PaddingRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-top
   */
  "padding-top"?: Property.PaddingTop<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `auto | <custom-ident>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **85** | **110** | **1**  | **85** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/page
   */
  page?: Property.Page | undefined;
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | [ fill || stroke || markers ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **123** | **60**  | **11** | **123** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  "paint-order"?: Property.PaintOrder | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <length>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **36**  |  **16**  |  **9**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective
   */
  perspective?: Property.Perspective<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **36**  |  **16**  |  **9**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  "perspective-origin"?: Property.PerspectiveOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **1**  | **1.5** | **4**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  "pointer-events"?: Property.PointerEvents | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `static | relative | absolute | sticky | fixed`
   *
   * **Initial value**: `static`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  position?: Property.Position | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | <anchor-name>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-anchor
   */
  "position-anchor"?: Property.PositionAnchor | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <position-area>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **129** | **preview** | **26** | **129** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  "position-area"?: Property.PositionArea | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ [<dashed-ident> || <try-tactic>] | <'position-area'> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **128** | **preview** | **26** | **128** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  "position-try-fallbacks"?: Property.PositionTryFallbacks | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | <try-size>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **125** |   No    | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  "position-try-order"?: Property.PositionTryOrder | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `always | [ anchors-valid || anchors-visible || no-overflow ]`
   *
   * **Initial value**: `anchors-visible`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** |   No   | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  "position-visibility"?: Property.PositionVisibility | undefined;
  /**
   * Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `economy | exact`
   *
   * **Initial value**: `economy`
   *
   * |  Chrome  |       Firefox       |  Safari  |   Edge   | IE  |
   * | :------: | :-----------------: | :------: | :------: | :-: |
   * | **136**  |       **97**        | **15.4** | **136**  | No  |
   * | 17 _-x-_ | 48 _(color-adjust)_ | 6 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  "print-color-adjust"?: Property.PrintColorAdjust | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | auto | [ <string> <string> ]+`
   *
   * **Initial value**: depends on user agent
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **11** | **1.5** | **9**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
   */
  quotes?: Property.Quotes | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **43** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/r
   */
  r?: Property.R<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | both | horizontal | vertical | block | inline`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **4**  | **3**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  resize?: Property.Resize | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/right
   */
  right?: Property.Right<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022.
   *
   * **Syntax**: `none | <angle> | [ x | y | z | <number>{3} ] && <angle>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **104** | **72**  | **14.1** | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rotate
   */
  rotate?: Property.Rotate | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **47** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/row-gap
   */
  "row-gap"?: Property.RowGap<TLength> | undefined;
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `start | center | space-between | space-around`
   *
   * **Initial value**: `space-around`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **128** | **38**  | **18.2** | **128** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  "ruby-align"?: Property.RubyAlign | undefined;
  /**
   * **Syntax**: `separate | collapse | auto`
   *
   * **Initial value**: `separate`
   */
  "ruby-merge"?: Property.RubyMerge | undefined;
  /**
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **18.2** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang
   */
  "ruby-overhang"?: Property.RubyOverhang | undefined;
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ alternate || [ over | under ] ] | inter-character`
   *
   * **Initial value**: `alternate`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **84**  | **38**  | **18.2** | 12-79 | No  |
   * | 1 _-x-_ |         | 7 _-x-_  |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  "ruby-position"?: Property.RubyPosition | undefined;
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **43** | **69**  | **17.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rx
   */
  rx?: Property.Rx<TLength> | undefined;
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **43** | **69**  | **17.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ry
   */
  ry?: Property.Ry<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022.
   *
   * **Syntax**: `none | [ <number> | <percentage> ]{1,3}`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **104** | **72**  | **14.1** | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale
   */
  scale?: Property.Scale | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | smooth`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **61** | **36**  | **15.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-behavior
   */
  "scroll-behavior"?: Property.ScrollBehavior | undefined;
  /**
   * **Syntax**: `none | nearest`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **133** |   No    |   No   | **133** | No  |
   */
  "scroll-initial-target"?: Property.ScrollInitialTarget | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-end
   */
  "scroll-margin-block-end"?: Property.ScrollMarginBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-start
   */
  "scroll-margin-block-start"?: Property.ScrollMarginBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |              Safari              |  Edge  | IE  |
   * | :----: | :-----: | :------------------------------: | :----: | :-: |
   * | **69** | **68**  |             **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-bottom)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  "scroll-margin-bottom"?: Property.ScrollMarginBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-end
   */
  "scroll-margin-inline-end"?: Property.ScrollMarginInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-start
   */
  "scroll-margin-inline-start"?: Property.ScrollMarginInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari             |  Edge  | IE  |
   * | :----: | :-----: | :----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-left)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  "scroll-margin-left"?: Property.ScrollMarginLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari              |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-right)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  "scroll-margin-right"?: Property.ScrollMarginRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |            Safari             |  Edge  | IE  |
   * | :----: | :-----: | :---------------------------: | :----: | :-: |
   * | **69** | **68**  |           **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-top)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  "scroll-margin-top"?: Property.ScrollMarginTop<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-end
   */
  "scroll-padding-block-end"?: Property.ScrollPaddingBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-start
   */
  "scroll-padding-block-start"?: Property.ScrollPaddingBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-bottom
   */
  "scroll-padding-bottom"?: Property.ScrollPaddingBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end
   */
  "scroll-padding-inline-end"?: Property.ScrollPaddingInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start
   */
  "scroll-padding-inline-start"?: Property.ScrollPaddingInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-left
   */
  "scroll-padding-left"?: Property.ScrollPaddingLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-right
   */
  "scroll-padding-right"?: Property.ScrollPaddingRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-top
   */
  "scroll-padding-top"?: Property.ScrollPaddingTop<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `[ none | start | end | center ]{1,2}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  "scroll-snap-align"?: Property.ScrollSnapAlign | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |              Safari              |  Edge  | IE  |
   * | :----: | :-----: | :------------------------------: | :----: | :-: |
   * | **69** | **68**  |             **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-bottom)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  "scroll-snap-margin-bottom"?: Property.ScrollMarginBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari             |  Edge  | IE  |
   * | :----: | :-----: | :----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-left)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  "scroll-snap-margin-left"?: Property.ScrollMarginLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari              |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-right)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  "scroll-snap-margin-right"?: Property.ScrollMarginRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |            Safari             |  Edge  | IE  |
   * | :----: | :-----: | :---------------------------: | :----: | :-: |
   * | **69** | **68**  |           **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-top)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  "scroll-snap-margin-top"?: Property.ScrollMarginTop<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2022.
   *
   * **Syntax**: `normal | always`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **75** | **103** | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
   */
  "scroll-snap-stop"?: Property.ScrollSnapStop | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2022.
   *
   * **Syntax**: `none | [ x | y | block | inline | both ] [ mandatory | proximity ]?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |      IE      |
   * | :----: | :-----: | :-----: | :----: | :----------: |
   * | **69** |  39-68  | **11**  | **79** | **10** _-x-_ |
   * |        |         | 9 _-x-_ |        |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  "scroll-snap-type"?: Property.ScrollSnapType | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ block | inline | x | y ]#`
   *
   * **Initial value**: `block`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  "scroll-timeline-axis"?: Property.ScrollTimelineAxis | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ none | <dashed-ident> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-name
   */
  "scroll-timeline-name"?: Property.ScrollTimelineName | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | <color>{2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **121** | **64**  |   No   | **121** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color
   */
  "scrollbar-color"?: Property.ScrollbarColor | undefined;
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | stable && both-edges?`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **94** | **97**  | **18.2** | **94** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
   */
  "scrollbar-gutter"?: Property.ScrollbarGutter | undefined;
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | thin | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **121** | **64**  | **18.2** | **121** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   */
  "scrollbar-width"?: Property.ScrollbarWidth | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<opacity-value>`
   *
   * **Initial value**: `0.0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-image-threshold
   */
  "shape-image-threshold"?: Property.ShapeImageThreshold | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-margin
   */
  "shape-margin"?: Property.ShapeMargin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | [ <shape-box> || <basic-shape> ] | <image>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  "shape-outside"?: Property.ShapeOutside | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | optimizeSpeed | crispEdges | geometricPrecision`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **3**  | **4**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  "shape-rendering"?: Property.ShapeRendering | undefined;
  /**
   * **Syntax**: `normal | spell-out || digits || [ literal-punctuation | no-punctuation ]`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **11.1** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
   */
  "speak-as"?: Property.SpeakAs | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'color'>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   */
  "stop-color"?: Property.StopColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-opacity
   */
  "stop-opacity"?: Property.StopOpacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<paint>`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  stroke?: Property.Stroke | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `transparent`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **11.1** |  No  | No  |
   */
  "stroke-color"?: Property.StrokeColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <dasharray>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
   */
  "stroke-dasharray"?: Property.StrokeDasharray<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length-percentage> | <number>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dashoffset
   */
  "stroke-dashoffset"?: Property.StrokeDashoffset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `butt | round | square`
   *
   * **Initial value**: `butt`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  "stroke-linecap"?: Property.StrokeLinecap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `miter | miter-clip | round | bevel | arcs`
   *
   * **Initial value**: `miter`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  "stroke-linejoin"?: Property.StrokeLinejoin | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `4`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-miterlimit
   */
  "stroke-miterlimit"?: Property.StrokeMiterlimit | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-opacity
   */
  "stroke-opacity"?: Property.StrokeOpacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length-percentage> | <number>`
   *
   * **Initial value**: `1px`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-width
   */
  "stroke-width"?: Property.StrokeWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021.
   *
   * **Syntax**: `<integer> | <length>`
   *
   * **Initial value**: `8`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **21** | **91**  | **7**  | **79** | No  |
   * |        | 4 _-x-_ |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/tab-size
   */
  "tab-size"?: Property.TabSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | fixed`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **14** |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
   */
  "table-layout"?: Property.TableLayout | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `start | end | left | right | center | justify | match-parent`
   *
   * **Initial value**: `start`, or a nameless value that acts as `left` if _direction_ is `ltr`, `right` if _direction_ is `rtl` if `start` is not supported by the browser.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  "text-align"?: Property.TextAlign | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `auto | start | end | left | right | center | justify`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **47** | **49**  | **16** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  "text-align-last"?: Property.TextAlignLast | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2016.
   *
   * **Syntax**: `start | middle | end`
   *
   * **Initial value**: `start`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤14** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   */
  "text-anchor"?: Property.TextAnchor | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | <autospace> | auto`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **140** | **145** | **18.4** | **140** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
   */
  "text-autospace"?: Property.TextAutospace | undefined;
  /**
   * **Syntax**: `normal | <'text-box-trim'> || <'text-box-edge'>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **133** |   No    | **18.2** | **133** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  "text-box"?: Property.TextBox | undefined;
  /**
   * **Syntax**: `auto | <text-edge>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **133** |   No    | **18.2** | **133** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  "text-box-edge"?: Property.TextBoxEdge | undefined;
  /**
   * **Syntax**: `none | trim-start | trim-end | trim-both`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **133** |   No    | **18.2** | **133** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  "text-box-trim"?: Property.TextBoxTrim | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   *
   * |           Chrome           | Firefox |            Safari            |  Edge  |                   IE                   |
   * | :------------------------: | :-----: | :--------------------------: | :----: | :------------------------------------: |
   * |           **48**           | **48**  |           **15.4**           | **79** | **11** _(-ms-text-combine-horizontal)_ |
   * | 9 _(-webkit-text-combine)_ |         | 5.1 _(-webkit-text-combine)_ |        |                                        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   */
  "text-combine-upright"?: Property.TextCombineUpright | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
   */
  "text-decoration-color"?: Property.TextDecorationColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  "text-decoration-line"?: Property.TextDecorationLine | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]`
   *
   * **Initial value**: `objects`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * | 57-64  |   No    | **12.1** |  No  | No  |
   * |        |         | 7 _-x-_  |      |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  "text-decoration-skip"?: Property.TextDecorationSkip | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | all | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **64** | **70**  | **15.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   */
  "text-decoration-skip-ink"?: Property.TextDecorationSkipInk | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `solid | double | dotted | dashed | wavy`
   *
   * **Initial value**: `solid`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  "text-decoration-style"?: Property.TextDecorationStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2021.
   *
   * **Syntax**: `auto | from-font | <length> | <percentage> `
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **89** | **70**  | **12.1** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
   */
  "text-decoration-thickness"?: Property.TextDecorationThickness<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
   */
  "text-emphasis-color"?: Property.TextEmphasisColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | [ over | under ] && [ right | left ]?`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   */
  "text-emphasis-position"?: Property.TextEmphasisPosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  "text-emphasis-style"?: Property.TextEmphasisStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> && hanging? && each-line?`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-indent
   */
  "text-indent"?: Property.TextIndent<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | inter-character | inter-word | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge  |   IE   |
   * | :----: | :-----: | :----: | :---: | :----: |
   * |   No   | **55**  |   No   | 12-79 | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  "text-justify"?: Property.TextJustify | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2020.
   *
   * **Syntax**: `mixed | upright | sideways`
   *
   * **Initial value**: `mixed`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  | IE  |
   * | :------: | :-----: | :-------: | :----: | :-: |
   * |  **48**  | **41**  |  **14**   | **79** | No  |
   * | 12 _-x-_ |         | 5.1 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  "text-orientation"?: Property.TextOrientation | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ clip | ellipsis | <string> ]{1,2}`
   *
   * **Initial value**: `clip`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **7**  | **1.3** | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-overflow
   */
  "text-overflow"?: Property.TextOverflow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | optimizeSpeed | optimizeLegibility | geometricPrecision`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **4**  |  **1**  | **5**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  "text-rendering"?: Property.TextRendering | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow-t>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **2**  | **3.5** | **1.1** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-shadow
   */
  "text-shadow"?: Property.TextShadow | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | auto | <percentage>`
   *
   * **Initial value**: `auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **54** |   No    |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
   */
  "text-size-adjust"?: Property.TextSizeAdjust | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `space-all | normal | space-first | trim-start`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **123** |   No    |   No   | **123** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  "text-spacing-trim"?: Property.TextSpacingTrim | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | [ capitalize | uppercase | lowercase ] || full-width || full-size-kana | math-auto`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  "text-transform"?: Property.TextTransform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2020.
   *
   * **Syntax**: `auto | <length> | <percentage> `
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **70**  | **12.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-offset
   */
  "text-underline-offset"?: Property.TextUnderlineOffset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | from-font | [ under || [ left | right ] ]`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :------: | :----: | :---: |
   * | **33** | **74**  | **12.1** | **12** | **6** |
   * |        |         | 9 _-x-_  |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  "text-underline-position"?: Property.TextUnderlinePosition | undefined;
  /**
   * Since October 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `wrap | nowrap`
   *
   * **Initial value**: `wrap`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **130** | **124** | **17.4** | **130** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
   */
  "text-wrap-mode"?: Property.TextWrapMode | undefined;
  /**
   * Since October 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | balance | stable | pretty`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **130** | **124** | **17.5** | **130** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  "text-wrap-style"?: Property.TextWrapStyle | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <dashed-ident>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **116** |   No    | **26** | **116** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/timeline-scope
   */
  "timeline-scope"?: Property.TimelineScope | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/top
   */
  top?: Property.Top<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2019.
   *
   * **Syntax**: `auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |    IE    |
   * | :----: | :-----: | :----: | :----: | :------: |
   * | **36** | **52**  | **13** | **12** |  **11**  |
   * |        |         |        |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  "touch-action"?: Property.TouchAction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |  Firefox  |  Safari   |  Edge  |   IE    |
   * | :-----: | :-------: | :-------: | :----: | :-----: |
   * | **36**  |  **16**   |   **9**   | **12** | **10**  |
   * | 1 _-x-_ | 3.5 _-x-_ | 3.1 _-x-_ |        | 9 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform
   */
  transform?: Property.Transform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `content-box | border-box | fill-box | stroke-box | view-box`
   *
   * **Initial value**: `view-box`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **64** | **55**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  "transform-box"?: Property.TransformBox | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   *
   * | Chrome  |  Firefox  | Safari  |  Edge  |   IE    |
   * | :-----: | :-------: | :-----: | :----: | :-----: |
   * | **36**  |  **16**   |  **9**  | **12** | **10**  |
   * | 1 _-x-_ | 3.5 _-x-_ | 2 _-x-_ |        | 9 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  "transform-origin"?: Property.TransformOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `flat | preserve-3d`
   *
   * **Initial value**: `flat`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  | IE  |
   * | :------: | :------: | :-----: | :----: | :-: |
   * |  **36**  |  **16**  |  **9**  | **12** | No  |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
   */
  "transform-style"?: Property.TransformStyle | undefined;
  /**
   * Since August 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<transition-behavior-value>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **117** | **129** | **17.4** | **117** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
   */
  "transition-behavior"?: Property.TransitionBehavior | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **26**  | **16**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-delay
   */
  "transition-delay"?: Property.TransitionDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-duration
   */
  "transition-duration"?: Property.TransitionDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
   */
  "transition-property"?: Property.TransitionProperty | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  "transition-timing-function"?: Property.TransitionTimingFunction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022.
   *
   * **Syntax**: `none | <length-percentage> [ <length-percentage> <length>? ]?`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **104** | **72**  | **14.1** | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/translate
   */
  translate?: Property.Translate<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | embed | isolate | bidi-override | isolate-override | plaintext`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE    |
   * | :----: | :-----: | :-----: | :----: | :-----: |
   * | **2**  |  **1**  | **1.3** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  "unicode-bidi"?: Property.UnicodeBidi | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | text | none | all`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |   Safari    |   Edge   |      IE      |
   * | :-----: | :-----: | :---------: | :------: | :----------: |
   * | **54**  | **69**  | **3** _-x-_ |  **79**  | **10** _-x-_ |
   * | 1 _-x-_ | 1 _-x-_ |             | 12 _-x-_ |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  "user-select"?: Property.UserSelect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | non-scaling-stroke | non-scaling-size | non-rotation | fixed-position`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **6**  | **15**  | **5.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  "vector-effect"?: Property.VectorEffect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>`
   *
   * **Initial value**: `baseline`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  "vertical-align"?: Property.VerticalAlign<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ block | inline | x | y ]#`
   *
   * **Initial value**: `block`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  "view-timeline-axis"?: Property.ViewTimelineAxis | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ [ auto | <length-percentage> ]{1,2} ]#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-inset
   */
  "view-timeline-inset"?: Property.ViewTimelineInset<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ none | <dashed-ident> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-name
   */
  "view-timeline-name"?: Property.ViewTimelineName | undefined;
  /**
   * **Syntax**: `none | <custom-ident>+`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **125** | **144** | **18.2** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-class
   */
  "view-transition-class"?: Property.ViewTransitionClass | undefined;
  /**
   * Since October 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | <custom-ident> | match-element`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **111** | **144** | **18** | **111** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
   */
  "view-transition-name"?: Property.ViewTransitionName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | collapse`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/visibility
   */
  visibility?: Property.Visibility | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | pre | pre-wrap | pre-line | <'white-space-collapse'> || <'text-wrap-mode'>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  "white-space"?: Property.WhiteSpace | undefined;
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `collapse | preserve | preserve-breaks | preserve-spaces | break-spaces`
   *
   * **Initial value**: `collapse`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **114** | **124** | **17.4** | **114** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  "white-space-collapse"?: Property.WhiteSpaceCollapse | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `2`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **25** |   No    | **1.3** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/widows
   */
  widows?: Property.Widows | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  width?: Property.Width<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | <animateable-feature>#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **36** | **36**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   */
  "will-change"?: Property.WillChange | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | break-all | keep-all | break-word | auto-phrase`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  | **15**  | **3**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  "word-break"?: Property.WordBreak | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <length>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-spacing
   */
  "word-spacing"?: Property.WordSpacing<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2018.
   *
   * **Syntax**: `normal | break-word`
   *
   * **Initial value**: `normal`
   */
  "word-wrap"?: Property.WordWrap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   *
   * **Initial value**: `horizontal-tb`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |  IE   |
   * | :-----: | :-----: | :-------: | :----: | :---: |
   * | **48**  | **41**  | **10.1**  | **12** | **9** |
   * | 8 _-x-_ |         | 5.1 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  "writing-mode"?: Property.WritingMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **42** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/x
   */
  x?: Property.X<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **42** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/y
   */
  y?: Property.Y<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <integer>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/z-index
   */
  "z-index"?: Property.ZIndex | undefined;
  /**
   * Since May 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | reset | <number [0,∞]> || <percentage [0,∞]>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE    |
   * | :----: | :-----: | :-----: | :----: | :-----: |
   * | **1**  | **126** | **3.1** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
   */
  zoom?: Property.Zoom | undefined;
}
interface StandardShorthandPropertiesHyphen<TLength = (string & {}) | 0, TTime = string & {}> {
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `initial | inherit | unset | revert | revert-layer`
   *
   * **Initial value**: There is no practical initial value for it.
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **37** | **27**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/all
   */
  all?: Property.All | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation>#`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  animation?: Property.Animation<TTime> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <'animation-range-start'> <'animation-range-end'>? ]#`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  "animation-range"?: Property.AnimationRange<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-layer>#? , <final-bg-layer>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  background?: Property.Background<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-position>#`
   *
   * **Initial value**: `0% 0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  "background-position"?: Property.BackgroundPosition<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  border?: Property.Border<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-block-start'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  "border-block"?: Property.BorderBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-color'>{1,2}`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   */
  "border-block-color"?: Property.BorderBlockColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  "border-block-end"?: Property.BorderBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  "border-block-start"?: Property.BorderBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-style'>{1,2}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  "border-block-style"?: Property.BorderBlockStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-width'>{1,2}`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  "border-block-width"?: Property.BorderBlockWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  "border-bottom"?: Property.BorderBottom<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-color
   */
  "border-color"?: Property.BorderColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   *
   * | Chrome  |  Firefox  | Safari  |  Edge  |   IE   |
   * | :-----: | :-------: | :-----: | :----: | :----: |
   * | **16**  |  **15**   |  **6**  | **12** | **11** |
   * | 7 _-x-_ | 3.5 _-x-_ | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  "border-image"?: Property.BorderImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-block-start'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  "border-inline"?: Property.BorderInline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-color'>{1,2}`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   */
  "border-inline-color"?: Property.BorderInlineColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  "border-inline-end"?: Property.BorderInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  "border-inline-start"?: Property.BorderInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-style'>{1,2}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  "border-inline-style"?: Property.BorderInlineStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-width'>{1,2}`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  "border-inline-width"?: Property.BorderInlineWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  "border-left"?: Property.BorderLeft<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-radius
   */
  "border-radius"?: Property.BorderRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  "border-right"?: Property.BorderRight<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  "border-style"?: Property.BorderStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  "border-top"?: Property.BorderTop<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   */
  "border-width"?: Property.BorderWidth<TLength> | undefined;
  /** **Syntax**: `<'caret-color'> || <'caret-shape'>` */
  caret?: Property.Caret | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  "column-rule"?: Property.ColumnRule<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-width'> || <'column-count'>`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **50** | **52**  |  **9**  | **12** | **10** |
   * |        |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/columns
   */
  columns?: Property.Columns<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ auto? [ none | <length> ] ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **83** | **107** | **17** | **83** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-size
   */
  "contain-intrinsic-size"?: Property.ContainIntrinsicSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `<'container-name'> [ / <'container-type'> ]?`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **105** | **110** | **16** | **105** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container
   */
  container?: Property.Container | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **22**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  flex?: Property.Flex<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<'flex-direction'> || <'flex-wrap'>`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **28**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  "flex-flow"?: Property.FlexFlow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ [ <'font-style'> || <font-variant-css2> || <'font-weight'> || <font-width-css3> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'># ] | <system-family-name>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  font?: Property.Font | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<'row-gap'> <'column-gap'>?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/gap
   */
  gap?: Property.Gap<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid
   */
  grid?: Property.Grid | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]{0,3}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-area
   */
  "grid-area"?: Property.GridArea | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column
   */
  "grid-column"?: Property.GridColumn | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row
   */
  "grid-row"?: Property.GridRow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template
   */
  "grid-template"?: Property.GridTemplate | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,4}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset
   */
  inset?: Property.Inset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block
   */
  "inset-block"?: Property.InsetBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline
   */
  "inset-inline"?: Property.InsetInline<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   *
   * |   Chrome    |   Firefox    |  Safari   |     Edge     | IE  |
   * | :---------: | :----------: | :-------: | :----------: | :-: |
   * | **6** _-x-_ | **68** _-x-_ | 18.2-18.4 | **17** _-x-_ | No  |
   * |             |              |  5 _-x-_  |              |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-clamp
   */
  "line-clamp"?: Property.LineClamp | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'list-style-type'> || <'list-style-position'> || <'list-style-image'>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   */
  "list-style"?: Property.ListStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'margin-top'>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin
   */
  margin?: Property.Margin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'margin-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   */
  "margin-block"?: Property.MarginBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'margin-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   */
  "margin-inline"?: Property.MarginInline<TLength> | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<mask-layer>#`
   *
   * | Chrome  | Firefox |  Safari   | Edge  | IE  |
   * | :-----: | :-----: | :-------: | :---: | :-: |
   * | **120** | **53**  | **15.4**  | 12-79 | No  |
   * | 1 _-x-_ |         | 3.1 _-x-_ |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  mask?: Property.Mask<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>`
   *
   * |              Chrome              | Firefox |             Safari             |               Edge                | IE  |
   * | :------------------------------: | :-----: | :----------------------------: | :-------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image)_ |   No    |            **17.2**            | **79** _(-webkit-mask-box-image)_ | No  |
   * |                                  |         | 3.1 _(-webkit-mask-box-image)_ |                                   |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  "mask-border"?: Property.MaskBorder | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?`
   *
   * |    Chrome     | Firefox | Safari |  Edge  | IE  |
   * | :-----------: | :-----: | :----: | :----: | :-: |
   * |    **55**     | **72**  | **16** | **79** | No  |
   * | 46 _(motion)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  motion?: Property.Offset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?`
   *
   * |    Chrome     | Firefox | Safari |  Edge  | IE  |
   * | :-----------: | :-----: | :----: | :----: | :-: |
   * |    **55**     | **72**  | **16** | **79** | No  |
   * | 46 _(motion)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  offset?: Property.Offset<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `<'outline-width'> || <'outline-style'> || <'outline-color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :------: | :----: | :---: |
   * | **94** | **88**  | **16.4** | **94** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  outline?: Property.Outline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ visible | hidden | clip | scroll | auto ]{1,2}`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  overflow?: Property.Overflow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ contain | none | auto ]{1,2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  | **16** | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior
   */
  "overscroll-behavior"?: Property.OverscrollBehavior | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'padding-top'>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding
   */
  padding?: Property.Padding<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'padding-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
   */
  "padding-block"?: Property.PaddingBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'padding-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
   */
  "padding-inline"?: Property.PaddingInline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'align-content'> <'justify-content'>?`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  "place-content"?: Property.PlaceContent | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'align-items'> <'justify-items'>?`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  "place-items"?: Property.PlaceItems | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'align-self'> <'justify-self'>?`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  "place-self"?: Property.PlaceSelf | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<'position-try-order'>? <'position-try-fallbacks'>`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  "position-try"?: Property.PositionTry | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2021.
   *
   * **Syntax**: `<length>{1,4}`
   *
   * | Chrome | Firefox |          Safari           |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------: | :----: | :-: |
   * | **69** | **90**  |         **14.1**          | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  "scroll-margin"?: Property.ScrollMargin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block
   */
  "scroll-margin-block"?: Property.ScrollMarginBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline
   */
  "scroll-margin-inline"?: Property.ScrollMarginInline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,4}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding
   */
  "scroll-padding"?: Property.ScrollPadding<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
   */
  "scroll-padding-block"?: Property.ScrollPaddingBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
   */
  "scroll-padding-inline"?: Property.ScrollPaddingInline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2021.
   *
   * **Syntax**: `<length>{1,4}`
   *
   * | Chrome | Firefox |          Safari           |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------: | :----: | :-: |
   * | **69** |  68-90  |         **14.1**          | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  "scroll-snap-margin"?: Property.ScrollMargin<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <'scroll-timeline-name'> <'scroll-timeline-axis'>? ]#`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline
   */
  "scroll-timeline"?: Property.ScrollTimeline | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  "text-decoration"?: Property.TextDecoration<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `<'text-emphasis-style'> || <'text-emphasis-color'>`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  "text-emphasis"?: Property.TextEmphasis | undefined;
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<'text-wrap-mode'> || <'text-wrap-style'>`
   *
   * **Initial value**: `wrap`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **114** | **121** | **17.4** | **114** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  "text-wrap"?: Property.TextWrap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  transition?: Property.Transition<TTime> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <'view-timeline-name'> [ <'view-timeline-axis'> || <'view-timeline-inset'> ]? ]#`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline
   */
  "view-timeline"?: Property.ViewTimeline | undefined;
}
interface StandardPropertiesHyphen<TLength = (string & {}) | 0, TTime = string & {}> extends StandardLonghandPropertiesHyphen<TLength, TTime>, StandardShorthandPropertiesHyphen<TLength, TTime> {}
interface VendorLonghandPropertiesHyphen<TLength = (string & {}) | 0, TTime = string & {}> {
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  "-moz-animation-delay"?: Property.AnimationDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   */
  "-moz-animation-direction"?: Property.AnimationDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ auto | <time [0s,∞]> ]#`
   *
   * **Initial value**: `0s`
   */
  "-moz-animation-duration"?: Property.AnimationDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   */
  "-moz-animation-fill-mode"?: Property.AnimationFillMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   */
  "-moz-animation-iteration-count"?: Property.AnimationIterationCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   */
  "-moz-animation-name"?: Property.AnimationName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   */
  "-moz-animation-play-state"?: Property.AnimationPlayState | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   */
  "-moz-animation-timing-function"?: Property.AnimationTimingFunction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized`
   *
   * **Initial value**: `none` (but this value is overridden in the user agent CSS)
   */
  "-moz-appearance"?: Property.MozAppearance | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `visible | hidden`
   *
   * **Initial value**: `visible`
   */
  "-moz-backface-visibility"?: Property.BackfaceVisibility | undefined;
  /**
   * **Syntax**: `<url> | none`
   *
   * **Initial value**: `none`
   */
  "-moz-binding"?: Property.MozBinding | undefined;
  /**
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   */
  "-moz-border-bottom-colors"?: Property.MozBorderBottomColors | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   */
  "-moz-border-end-color"?: Property.BorderInlineEndColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   */
  "-moz-border-end-style"?: Property.BorderInlineEndStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   */
  "-moz-border-end-width"?: Property.BorderInlineEndWidth<TLength> | undefined;
  /**
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   */
  "-moz-border-left-colors"?: Property.MozBorderLeftColors | undefined;
  /**
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   */
  "-moz-border-right-colors"?: Property.MozBorderRightColors | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   */
  "-moz-border-start-color"?: Property.BorderInlineStartColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   */
  "-moz-border-start-style"?: Property.BorderInlineStartStyle | undefined;
  /**
   * **Syntax**: `<color>+ | none`
   *
   * **Initial value**: `none`
   */
  "-moz-border-top-colors"?: Property.MozBorderTopColors | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `content-box | border-box`
   *
   * **Initial value**: `content-box`
   */
  "-moz-box-sizing"?: Property.BoxSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  "-moz-column-rule-color"?: Property.ColumnRuleColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   */
  "-moz-column-rule-style"?: Property.ColumnRuleStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   */
  "-moz-column-rule-width"?: Property.ColumnRuleWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016.
   *
   * **Syntax**: `<length> | auto`
   *
   * **Initial value**: `auto`
   */
  "-moz-column-width"?: Property.ColumnWidth<TLength> | undefined;
  /**
   * **Syntax**: `none | [ fill | fill-opacity | stroke | stroke-opacity ]#`
   *
   * **Initial value**: `none`
   */
  "-moz-context-properties"?: Property.MozContextProperties | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `normal | <feature-tag-value>#`
   *
   * **Initial value**: `normal`
   */
  "-moz-font-feature-settings"?: Property.FontFeatureSettings | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | <string>`
   *
   * **Initial value**: `normal`
   */
  "-moz-font-language-override"?: Property.FontLanguageOverride | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   */
  "-moz-hyphens"?: Property.Hyphens | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   */
  "-moz-margin-end"?: Property.MarginInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   */
  "-moz-margin-start"?: Property.MarginInlineStart<TLength> | undefined;
  /**
   * The **`-moz-orient`** CSS property specifies the orientation of the element to which it's applied.
   *
   * **Syntax**: `inline | block | horizontal | vertical`
   *
   * **Initial value**: `inline`
   */
  "-moz-orient"?: Property.MozOrient | undefined;
  /**
   * The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered.
   *
   * **Syntax**: `auto | never | always | <absolute-size> | <length>`
   *
   * **Initial value**: `auto`
   */
  "-moz-osx-font-smoothing"?: Property.FontSmooth<TLength> | undefined;
  /**
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  "-moz-outline-radius-bottomleft"?: Property.MozOutlineRadiusBottomleft<TLength> | undefined;
  /**
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  "-moz-outline-radius-bottomright"?: Property.MozOutlineRadiusBottomright<TLength> | undefined;
  /**
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  "-moz-outline-radius-topleft"?: Property.MozOutlineRadiusTopleft<TLength> | undefined;
  /**
   * **Syntax**: `<outline-radius>`
   *
   * **Initial value**: `0`
   */
  "-moz-outline-radius-topright"?: Property.MozOutlineRadiusTopright<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   */
  "-moz-padding-end"?: Property.PaddingInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   */
  "-moz-padding-start"?: Property.PaddingInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <length>`
   *
   * **Initial value**: `none`
   */
  "-moz-perspective"?: Property.Perspective<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   */
  "-moz-perspective-origin"?: Property.PerspectiveOrigin<TLength> | undefined;
  /**
   * **Syntax**: `ignore | stretch-to-fit`
   *
   * **Initial value**: `stretch-to-fit`
   */
  "-moz-stack-sizing"?: Property.MozStackSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021.
   *
   * **Syntax**: `<integer> | <length>`
   *
   * **Initial value**: `8`
   */
  "-moz-tab-size"?: Property.TabSize<TLength> | undefined;
  /**
   * **Syntax**: `none | blink`
   *
   * **Initial value**: `none`
   */
  "-moz-text-blink"?: Property.MozTextBlink | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | auto | <percentage>`
   *
   * **Initial value**: `auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   */
  "-moz-text-size-adjust"?: Property.TextSizeAdjust | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   */
  "-moz-transform"?: Property.Transform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   */
  "-moz-transform-origin"?: Property.TransformOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `flat | preserve-3d`
   *
   * **Initial value**: `flat`
   */
  "-moz-transform-style"?: Property.TransformStyle | undefined;
  /**
   * The **`user-modify`** property has no effect in Firefox. It was originally planned to determine whether or not the content of an element can be edited by a user.
   *
   * **Syntax**: `read-only | read-write | write-only`
   *
   * **Initial value**: `read-only`
   */
  "-moz-user-modify"?: Property.MozUserModify | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | text | none | all`
   *
   * **Initial value**: `auto`
   */
  "-moz-user-select"?: Property.UserSelect | undefined;
  /**
   * **Syntax**: `drag | no-drag`
   *
   * **Initial value**: `drag`
   */
  "-moz-window-dragging"?: Property.MozWindowDragging | undefined;
  /**
   * **Syntax**: `default | menu | tooltip | sheet | none`
   *
   * **Initial value**: `default`
   */
  "-moz-window-shadow"?: Property.MozWindowShadow | undefined;
  /**
   * **Syntax**: `false | true`
   *
   * **Initial value**: `false`
   */
  "-ms-accelerator"?: Property.MsAccelerator | undefined;
  /**
   * **Syntax**: `tb | rl | bt | lr`
   *
   * **Initial value**: `tb`
   */
  "-ms-block-progression"?: Property.MsBlockProgression | undefined;
  /**
   * **Syntax**: `none | chained`
   *
   * **Initial value**: `none`
   */
  "-ms-content-zoom-chaining"?: Property.MsContentZoomChaining | undefined;
  /**
   * **Syntax**: `<percentage>`
   *
   * **Initial value**: `400%`
   */
  "-ms-content-zoom-limit-max"?: Property.MsContentZoomLimitMax | undefined;
  /**
   * **Syntax**: `<percentage>`
   *
   * **Initial value**: `100%`
   */
  "-ms-content-zoom-limit-min"?: Property.MsContentZoomLimitMin | undefined;
  /**
   * **Syntax**: `snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )`
   *
   * **Initial value**: `snapInterval(0%, 100%)`
   */
  "-ms-content-zoom-snap-points"?: Property.MsContentZoomSnapPoints | undefined;
  /**
   * **Syntax**: `none | proximity | mandatory`
   *
   * **Initial value**: `none`
   */
  "-ms-content-zoom-snap-type"?: Property.MsContentZoomSnapType | undefined;
  /**
   * **Syntax**: `none | zoom`
   *
   * **Initial value**: zoom for the top level element, none for all other elements
   */
  "-ms-content-zooming"?: Property.MsContentZooming | undefined;
  /**
   * **Syntax**: `<string>`
   *
   * **Initial value**: "" (the empty string)
   */
  "-ms-filter"?: Property.MsFilter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   */
  "-ms-flex-direction"?: Property.FlexDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   */
  "-ms-flex-positive"?: Property.FlexGrow | undefined;
  /**
   * **Syntax**: `[ none | <custom-ident> ]#`
   *
   * **Initial value**: `none`
   */
  "-ms-flow-from"?: Property.MsFlowFrom | undefined;
  /**
   * **Syntax**: `[ none | <custom-ident> ]#`
   *
   * **Initial value**: `none`
   */
  "-ms-flow-into"?: Property.MsFlowInto | undefined;
  /**
   * **Syntax**: `none | <track-list> | <auto-track-list>`
   *
   * **Initial value**: `none`
   */
  "-ms-grid-columns"?: Property.MsGridColumns<TLength> | undefined;
  /**
   * **Syntax**: `none | <track-list> | <auto-track-list>`
   *
   * **Initial value**: `none`
   */
  "-ms-grid-rows"?: Property.MsGridRows<TLength> | undefined;
  /**
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   */
  "-ms-high-contrast-adjust"?: Property.MsHighContrastAdjust | undefined;
  /**
   * **Syntax**: `auto | <integer>{1,3}`
   *
   * **Initial value**: `auto`
   */
  "-ms-hyphenate-limit-chars"?: Property.MsHyphenateLimitChars | undefined;
  /**
   * **Syntax**: `no-limit | <integer>`
   *
   * **Initial value**: `no-limit`
   */
  "-ms-hyphenate-limit-lines"?: Property.MsHyphenateLimitLines | undefined;
  /**
   * **Syntax**: `<percentage> | <length>`
   *
   * **Initial value**: `0`
   */
  "-ms-hyphenate-limit-zone"?: Property.MsHyphenateLimitZone<TLength> | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   */
  "-ms-hyphens"?: Property.Hyphens | undefined;
  /**
   * **Syntax**: `auto | after`
   *
   * **Initial value**: `auto`
   */
  "-ms-ime-align"?: Property.MsImeAlign | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   */
  "-ms-line-break"?: Property.LineBreak | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   */
  "-ms-order"?: Property.Order | undefined;
  /**
   * **Syntax**: `auto | none | scrollbar | -ms-autohiding-scrollbar`
   *
   * **Initial value**: `auto`
   */
  "-ms-overflow-style"?: Property.MsOverflowStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   */
  "-ms-overflow-x"?: Property.OverflowX | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   */
  "-ms-overflow-y"?: Property.OverflowY | undefined;
  /**
   * **Syntax**: `chained | none`
   *
   * **Initial value**: `chained`
   */
  "-ms-scroll-chaining"?: Property.MsScrollChaining | undefined;
  /**
   * **Syntax**: `auto | <length>`
   *
   * **Initial value**: `auto`
   */
  "-ms-scroll-limit-x-max"?: Property.MsScrollLimitXMax<TLength> | undefined;
  /**
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  "-ms-scroll-limit-x-min"?: Property.MsScrollLimitXMin<TLength> | undefined;
  /**
   * **Syntax**: `auto | <length>`
   *
   * **Initial value**: `auto`
   */
  "-ms-scroll-limit-y-max"?: Property.MsScrollLimitYMax<TLength> | undefined;
  /**
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  "-ms-scroll-limit-y-min"?: Property.MsScrollLimitYMin<TLength> | undefined;
  /**
   * **Syntax**: `none | railed`
   *
   * **Initial value**: `railed`
   */
  "-ms-scroll-rails"?: Property.MsScrollRails | undefined;
  /**
   * **Syntax**: `snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )`
   *
   * **Initial value**: `snapInterval(0px, 100%)`
   */
  "-ms-scroll-snap-points-x"?: Property.MsScrollSnapPointsX | undefined;
  /**
   * **Syntax**: `snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )`
   *
   * **Initial value**: `snapInterval(0px, 100%)`
   */
  "-ms-scroll-snap-points-y"?: Property.MsScrollSnapPointsY | undefined;
  /**
   * **Syntax**: `none | proximity | mandatory`
   *
   * **Initial value**: `none`
   */
  "-ms-scroll-snap-type"?: Property.MsScrollSnapType | undefined;
  /**
   * **Syntax**: `none | vertical-to-horizontal`
   *
   * **Initial value**: `none`
   */
  "-ms-scroll-translation"?: Property.MsScrollTranslation | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: depends on user agent
   */
  "-ms-scrollbar-3dlight-color"?: Property.MsScrollbar3dlightColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ButtonText`
   */
  "-ms-scrollbar-arrow-color"?: Property.MsScrollbarArrowColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: depends on user agent
   */
  "-ms-scrollbar-base-color"?: Property.MsScrollbarBaseColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDDarkShadow`
   */
  "-ms-scrollbar-darkshadow-color"?: Property.MsScrollbarDarkshadowColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDFace`
   */
  "-ms-scrollbar-face-color"?: Property.MsScrollbarFaceColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDHighlight`
   */
  "-ms-scrollbar-highlight-color"?: Property.MsScrollbarHighlightColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `ThreeDDarkShadow`
   */
  "-ms-scrollbar-shadow-color"?: Property.MsScrollbarShadowColor | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `Scrollbar`
   */
  "-ms-scrollbar-track-color"?: Property.MsScrollbarTrackColor | undefined;
  /**
   * **Syntax**: `none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space`
   *
   * **Initial value**: `none`
   */
  "-ms-text-autospace"?: Property.MsTextAutospace | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   */
  "-ms-text-combine-horizontal"?: Property.TextCombineUpright | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ clip | ellipsis | <string> ]{1,2}`
   *
   * **Initial value**: `clip`
   */
  "-ms-text-overflow"?: Property.TextOverflow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2019.
   *
   * **Syntax**: `auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation`
   *
   * **Initial value**: `auto`
   */
  "-ms-touch-action"?: Property.TouchAction | undefined;
  /**
   * **Syntax**: `grippers | none`
   *
   * **Initial value**: `grippers`
   */
  "-ms-touch-select"?: Property.MsTouchSelect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   */
  "-ms-transform"?: Property.Transform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   */
  "-ms-transform-origin"?: Property.TransformOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  "-ms-transition-delay"?: Property.TransitionDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  "-ms-transition-duration"?: Property.TransitionDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   */
  "-ms-transition-property"?: Property.TransitionProperty | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   */
  "-ms-transition-timing-function"?: Property.TransitionTimingFunction | undefined;
  /**
   * **Syntax**: `none | element | text`
   *
   * **Initial value**: `text`
   */
  "-ms-user-select"?: Property.MsUserSelect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | break-all | keep-all | break-word | auto-phrase`
   *
   * **Initial value**: `normal`
   */
  "-ms-word-break"?: Property.WordBreak | undefined;
  /**
   * **Syntax**: `auto | both | start | end | maximum | clear`
   *
   * **Initial value**: `auto`
   */
  "-ms-wrap-flow"?: Property.MsWrapFlow | undefined;
  /**
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  "-ms-wrap-margin"?: Property.MsWrapMargin<TLength> | undefined;
  /**
   * **Syntax**: `wrap | none`
   *
   * **Initial value**: `wrap`
   */
  "-ms-wrap-through"?: Property.MsWrapThrough | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   *
   * **Initial value**: `horizontal-tb`
   */
  "-ms-writing-mode"?: Property.WritingMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>`
   *
   * **Initial value**: `normal`
   */
  "-webkit-align-content"?: Property.AlignContent | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ] | anchor-center`
   *
   * **Initial value**: `normal`
   */
  "-webkit-align-items"?: Property.AlignItems | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position> | anchor-center`
   *
   * **Initial value**: `auto`
   */
  "-webkit-align-self"?: Property.AlignSelf | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  "-webkit-animation-delay"?: Property.AnimationDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   */
  "-webkit-animation-direction"?: Property.AnimationDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ auto | <time [0s,∞]> ]#`
   *
   * **Initial value**: `0s`
   */
  "-webkit-animation-duration"?: Property.AnimationDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   */
  "-webkit-animation-fill-mode"?: Property.AnimationFillMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   */
  "-webkit-animation-iteration-count"?: Property.AnimationIterationCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   */
  "-webkit-animation-name"?: Property.AnimationName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   */
  "-webkit-animation-play-state"?: Property.AnimationPlayState | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   */
  "-webkit-animation-timing-function"?: Property.AnimationTimingFunction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | -apple-pay-button`
   *
   * **Initial value**: `none` (but this value is overridden in the user agent CSS)
   */
  "-webkit-appearance"?: Property.WebkitAppearance | undefined;
  /**
   * Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | <filter-value-list>`
   *
   * **Initial value**: `none`
   */
  "-webkit-backdrop-filter"?: Property.BackdropFilter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `visible | hidden`
   *
   * **Initial value**: `visible`
   */
  "-webkit-backface-visibility"?: Property.BackfaceVisibility | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-clip>#`
   *
   * **Initial value**: `border-box`
   */
  "-webkit-background-clip"?: Property.BackgroundClip | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<visual-box>#`
   *
   * **Initial value**: `padding-box`
   */
  "-webkit-background-origin"?: Property.BackgroundOrigin | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   */
  "-webkit-background-size"?: Property.BackgroundSize<TLength> | undefined;
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  "-webkit-border-before-color"?: Property.WebkitBorderBeforeColor | undefined;
  /**
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   */
  "-webkit-border-before-style"?: Property.WebkitBorderBeforeStyle | undefined;
  /**
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   */
  "-webkit-border-before-width"?: Property.WebkitBorderBeforeWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   */
  "-webkit-border-bottom-left-radius"?: Property.BorderBottomLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   */
  "-webkit-border-bottom-right-radius"?: Property.BorderBottomRightRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <number [0,∞]> | <percentage [0,∞]> ]{1,4}  && fill?`
   *
   * **Initial value**: `100%`
   */
  "-webkit-border-image-slice"?: Property.BorderImageSlice | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   */
  "-webkit-border-top-left-radius"?: Property.BorderTopLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   */
  "-webkit-border-top-right-radius"?: Property.BorderTopRightRadius<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `slice | clone`
   *
   * **Initial value**: `slice`
   */
  "-webkit-box-decoration-break"?: Property.BoxDecorationBreak | undefined;
  /**
   * The **`-webkit-box-reflect`** CSS property lets you reflect the content of an element in one specific direction.
   *
   * **Syntax**: `[ above | below | right | left ]? <length>? <image>?`
   *
   * **Initial value**: `none`
   */
  "-webkit-box-reflect"?: Property.WebkitBoxReflect<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   */
  "-webkit-box-shadow"?: Property.BoxShadow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `content-box | border-box`
   *
   * **Initial value**: `content-box`
   */
  "-webkit-box-sizing"?: Property.BoxSizing | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<clip-source> | [ <basic-shape> || <geometry-box> ] | none`
   *
   * **Initial value**: `none`
   */
  "-webkit-clip-path"?: Property.ClipPath | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<integer> | auto`
   *
   * **Initial value**: `auto`
   */
  "-webkit-column-count"?: Property.ColumnCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `auto | balance`
   *
   * **Initial value**: `balance`
   */
  "-webkit-column-fill"?: Property.ColumnFill | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  "-webkit-column-rule-color"?: Property.ColumnRuleColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   */
  "-webkit-column-rule-style"?: Property.ColumnRuleStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   */
  "-webkit-column-rule-width"?: Property.ColumnRuleWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `none | all`
   *
   * **Initial value**: `none`
   */
  "-webkit-column-span"?: Property.ColumnSpan | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016.
   *
   * **Syntax**: `<length> | auto`
   *
   * **Initial value**: `auto`
   */
  "-webkit-column-width"?: Property.ColumnWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `none | <filter-value-list>`
   *
   * **Initial value**: `none`
   */
  "-webkit-filter"?: Property.Filter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `content | <'width'>`
   *
   * **Initial value**: `auto`
   */
  "-webkit-flex-basis"?: Property.FlexBasis<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   */
  "-webkit-flex-direction"?: Property.FlexDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   */
  "-webkit-flex-grow"?: Property.FlexGrow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `1`
   */
  "-webkit-flex-shrink"?: Property.FlexShrink | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `nowrap | wrap | wrap-reverse`
   *
   * **Initial value**: `nowrap`
   */
  "-webkit-flex-wrap"?: Property.FlexWrap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `normal | <feature-tag-value>#`
   *
   * **Initial value**: `normal`
   */
  "-webkit-font-feature-settings"?: Property.FontFeatureSettings | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | normal | none`
   *
   * **Initial value**: `auto`
   */
  "-webkit-font-kerning"?: Property.FontKerning | undefined;
  /**
   * The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered.
   *
   * **Syntax**: `auto | never | always | <absolute-size> | <length>`
   *
   * **Initial value**: `auto`
   */
  "-webkit-font-smoothing"?: Property.FontSmooth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]`
   *
   * **Initial value**: `normal`
   */
  "-webkit-font-variant-ligatures"?: Property.FontVariantLigatures | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | <string>`
   *
   * **Initial value**: `auto`
   */
  "-webkit-hyphenate-character"?: Property.HyphenateCharacter | undefined;
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   */
  "-webkit-hyphens"?: Property.Hyphens | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | [ <number> <integer>? ]`
   *
   * **Initial value**: `normal`
   */
  "-webkit-initial-letter"?: Property.InitialLetter | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]`
   *
   * **Initial value**: `normal`
   */
  "-webkit-justify-content"?: Property.JustifyContent | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   */
  "-webkit-line-break"?: Property.LineBreak | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   */
  "-webkit-line-clamp"?: Property.WebkitLineClamp | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   */
  "-webkit-logical-height"?: Property.BlockSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   */
  "-webkit-logical-width"?: Property.InlineSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   */
  "-webkit-margin-end"?: Property.MarginInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   */
  "-webkit-margin-start"?: Property.MarginInlineStart<TLength> | undefined;
  /**
   * **Syntax**: `<attachment>#`
   *
   * **Initial value**: `scroll`
   */
  "-webkit-mask-attachment"?: Property.WebkitMaskAttachment | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <length> | <number> ]{1,4}`
   *
   * **Initial value**: `0`
   */
  "-webkit-mask-box-image-outset"?: Property.MaskBorderOutset<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ stretch | repeat | round | space ]{1,2}`
   *
   * **Initial value**: `stretch`
   */
  "-webkit-mask-box-image-repeat"?: Property.MaskBorderRepeat | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<number-percentage>{1,4} fill?`
   *
   * **Initial value**: `0`
   */
  "-webkit-mask-box-image-slice"?: Property.MaskBorderSlice | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <image>`
   *
   * **Initial value**: `none`
   */
  "-webkit-mask-box-image-source"?: Property.MaskBorderSource | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <length-percentage> | <number> | auto ]{1,4}`
   *
   * **Initial value**: `auto`
   */
  "-webkit-mask-box-image-width"?: Property.MaskBorderWidth<TLength> | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <coord-box> | no-clip | border | padding | content | text ]#`
   *
   * **Initial value**: `border`
   */
  "-webkit-mask-clip"?: Property.WebkitMaskClip | undefined;
  /**
   * The **`-webkit-mask-composite`** property specifies the manner in which multiple mask images applied to the same element are composited with one another. Mask images are composited in the opposite order that they are declared with the `-webkit-mask-image` property.
   *
   * **Syntax**: `<composite-style>#`
   *
   * **Initial value**: `source-over`
   */
  "-webkit-mask-composite"?: Property.WebkitMaskComposite | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<mask-reference>#`
   *
   * **Initial value**: `none`
   */
  "-webkit-mask-image"?: Property.WebkitMaskImage | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <coord-box> | border | padding | content ]#`
   *
   * **Initial value**: `padding`
   */
  "-webkit-mask-origin"?: Property.WebkitMaskOrigin | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<position>#`
   *
   * **Initial value**: `0% 0%`
   */
  "-webkit-mask-position"?: Property.WebkitMaskPosition<TLength> | undefined;
  /**
   * The `-webkit-mask-position-x` CSS property sets the initial horizontal position of a mask image.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right ]#`
   *
   * **Initial value**: `0%`
   */
  "-webkit-mask-position-x"?: Property.WebkitMaskPositionX<TLength> | undefined;
  /**
   * The `-webkit-mask-position-y` CSS property sets the initial vertical position of a mask image.
   *
   * **Syntax**: `[ <length-percentage> | top | center | bottom ]#`
   *
   * **Initial value**: `0%`
   */
  "-webkit-mask-position-y"?: Property.WebkitMaskPositionY<TLength> | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   */
  "-webkit-mask-repeat"?: Property.WebkitMaskRepeat | undefined;
  /**
   * The `-webkit-mask-repeat-x` property specifies whether and how a mask image is repeated (tiled) horizontally.
   *
   * **Syntax**: `repeat | no-repeat | space | round`
   *
   * **Initial value**: `repeat`
   */
  "-webkit-mask-repeat-x"?: Property.WebkitMaskRepeatX | undefined;
  /**
   * The `-webkit-mask-repeat-y` property sets whether and how a mask image is repeated (tiled) vertically.
   *
   * **Syntax**: `repeat | no-repeat | space | round`
   *
   * **Initial value**: `repeat`
   */
  "-webkit-mask-repeat-y"?: Property.WebkitMaskRepeatY | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   */
  "-webkit-mask-size"?: Property.WebkitMaskSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `none`
   */
  "-webkit-max-inline-size"?: Property.MaxInlineSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   */
  "-webkit-order"?: Property.Order | undefined;
  /**
   * **Syntax**: `auto | touch`
   *
   * **Initial value**: `auto`
   */
  "-webkit-overflow-scrolling"?: Property.WebkitOverflowScrolling | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   */
  "-webkit-padding-end"?: Property.PaddingInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   */
  "-webkit-padding-start"?: Property.PaddingInlineStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <length>`
   *
   * **Initial value**: `none`
   */
  "-webkit-perspective"?: Property.Perspective<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   */
  "-webkit-perspective-origin"?: Property.PerspectiveOrigin<TLength> | undefined;
  /**
   * Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `economy | exact`
   *
   * **Initial value**: `economy`
   */
  "-webkit-print-color-adjust"?: Property.PrintColorAdjust | undefined;
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ alternate || [ over | under ] ] | inter-character`
   *
   * **Initial value**: `alternate`
   */
  "-webkit-ruby-position"?: Property.RubyPosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2022.
   *
   * **Syntax**: `none | [ x | y | block | inline | both ] [ mandatory | proximity ]?`
   *
   * **Initial value**: `none`
   */
  "-webkit-scroll-snap-type"?: Property.ScrollSnapType | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   */
  "-webkit-shape-margin"?: Property.ShapeMargin<TLength> | undefined;
  /**
   * **`-webkit-tap-highlight-color`** is a non-standard CSS property that sets the color of the highlight that appears over a link while it's being tapped. The highlighting indicates to the user that their tap is being successfully recognized, and indicates which element they're tapping on.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `black`
   */
  "-webkit-tap-highlight-color"?: Property.WebkitTapHighlightColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   */
  "-webkit-text-combine"?: Property.TextCombineUpright | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  "-webkit-text-decoration-color"?: Property.TextDecorationColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   *
   * **Initial value**: `none`
   */
  "-webkit-text-decoration-line"?: Property.TextDecorationLine | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]`
   *
   * **Initial value**: `objects`
   */
  "-webkit-text-decoration-skip"?: Property.TextDecorationSkip | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `solid | double | dotted | dashed | wavy`
   *
   * **Initial value**: `solid`
   */
  "-webkit-text-decoration-style"?: Property.TextDecorationStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  "-webkit-text-emphasis-color"?: Property.TextEmphasisColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | [ over | under ] && [ right | left ]?`
   *
   * **Initial value**: `auto`
   */
  "-webkit-text-emphasis-position"?: Property.TextEmphasisPosition | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>`
   *
   * **Initial value**: `none`
   */
  "-webkit-text-emphasis-style"?: Property.TextEmphasisStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  "-webkit-text-fill-color"?: Property.WebkitTextFillColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2020.
   *
   * **Syntax**: `mixed | upright | sideways`
   *
   * **Initial value**: `mixed`
   */
  "-webkit-text-orientation"?: Property.TextOrientation | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | auto | <percentage>`
   *
   * **Initial value**: `auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   */
  "-webkit-text-size-adjust"?: Property.TextSizeAdjust | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  "-webkit-text-stroke-color"?: Property.WebkitTextStrokeColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  "-webkit-text-stroke-width"?: Property.WebkitTextStrokeWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | from-font | [ under || [ left | right ] ]`
   *
   * **Initial value**: `auto`
   */
  "-webkit-text-underline-position"?: Property.TextUnderlinePosition | undefined;
  /**
   * The `-webkit-touch-callout` CSS property controls the display of the default callout shown when you touch and hold a touch target.
   *
   * **Syntax**: `default | none`
   *
   * **Initial value**: `default`
   */
  "-webkit-touch-callout"?: Property.WebkitTouchCallout | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   */
  "-webkit-transform"?: Property.Transform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   */
  "-webkit-transform-origin"?: Property.TransformOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `flat | preserve-3d`
   *
   * **Initial value**: `flat`
   */
  "-webkit-transform-style"?: Property.TransformStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  "-webkit-transition-delay"?: Property.TransitionDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   */
  "-webkit-transition-duration"?: Property.TransitionDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   */
  "-webkit-transition-property"?: Property.TransitionProperty | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   */
  "-webkit-transition-timing-function"?: Property.TransitionTimingFunction | undefined;
  /**
   * **Syntax**: `read-only | read-write | read-write-plaintext-only`
   *
   * **Initial value**: `read-only`
   */
  "-webkit-user-modify"?: Property.WebkitUserModify | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | text | none | all`
   *
   * **Initial value**: `auto`
   */
  "-webkit-user-select"?: Property.WebkitUserSelect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   *
   * **Initial value**: `horizontal-tb`
   */
  "-webkit-writing-mode"?: Property.WritingMode | undefined;
}
interface VendorShorthandPropertiesHyphen<TLength = (string & {}) | 0, TTime = string & {}> {
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation>#`
   */
  "-moz-animation"?: Property.Animation<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   */
  "-moz-border-image"?: Property.BorderImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   */
  "-moz-column-rule"?: Property.ColumnRule<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-width'> || <'column-count'>`
   */
  "-moz-columns"?: Property.Columns<TLength> | undefined;
  /** **Syntax**: `<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?` */
  "-moz-outline-radius"?: Property.MozOutlineRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   */
  "-moz-transition"?: Property.Transition<TTime> | undefined;
  /** **Syntax**: `<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>` */
  "-ms-content-zoom-limit"?: Property.MsContentZoomLimit | undefined;
  /** **Syntax**: `<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>` */
  "-ms-content-zoom-snap"?: Property.MsContentZoomSnap | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   */
  "-ms-flex"?: Property.Flex<TLength> | undefined;
  /** **Syntax**: `<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>` */
  "-ms-scroll-limit"?: Property.MsScrollLimit | undefined;
  /** **Syntax**: `<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>` */
  "-ms-scroll-snap-x"?: Property.MsScrollSnapX | undefined;
  /** **Syntax**: `<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>` */
  "-ms-scroll-snap-y"?: Property.MsScrollSnapY | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   */
  "-ms-transition"?: Property.Transition<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation>#`
   */
  "-webkit-animation"?: Property.Animation<TTime> | undefined;
  /**
   * The **`-webkit-border-before`** CSS property is a shorthand property for setting the individual logical block start border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-width'> || <'border-style'> || <color>`
   */
  "-webkit-border-before"?: Property.WebkitBorderBefore<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   */
  "-webkit-border-image"?: Property.BorderImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   */
  "-webkit-border-radius"?: Property.BorderRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   */
  "-webkit-column-rule"?: Property.ColumnRule<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-width'> || <'column-count'>`
   */
  "-webkit-columns"?: Property.Columns<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   */
  "-webkit-flex"?: Property.Flex<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<'flex-direction'> || <'flex-wrap'>`
   */
  "-webkit-flex-flow"?: Property.FlexFlow | undefined;
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || [ <visual-box> | border | padding | content | text ] || [ <visual-box> | border | padding | content ] ]#`
   */
  "-webkit-mask"?: Property.WebkitMask<TLength> | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>`
   */
  "-webkit-mask-box-image"?: Property.MaskBorder | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `<'text-emphasis-style'> || <'text-emphasis-color'>`
   */
  "-webkit-text-emphasis"?: Property.TextEmphasis | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length> || <color>`
   */
  "-webkit-text-stroke"?: Property.WebkitTextStroke<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   */
  "-webkit-transition"?: Property.Transition<TTime> | undefined;
}
interface VendorPropertiesHyphen<TLength = (string & {}) | 0, TTime = string & {}> extends VendorLonghandPropertiesHyphen<TLength, TTime>, VendorShorthandPropertiesHyphen<TLength, TTime> {}
interface ObsoletePropertiesHyphen<TLength = (string & {}) | 0, TTime = string & {}> {
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  "box-align"?: Property.BoxAlign | undefined;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  "box-direction"?: Property.BoxDirection | undefined;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "box-flex"?: Property.BoxFlex | undefined;
  /**
   * The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  "box-flex-group"?: Property.BoxFlexGroup | undefined;
  /**
   * The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).
   *
   * **Syntax**: `single | multiple`
   *
   * **Initial value**: `single`
   *
   * @deprecated
   */
  "box-lines"?: Property.BoxLines | undefined;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  "box-ordinal-group"?: Property.BoxOrdinalGroup | undefined;
  /**
   * The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis`
   *
   * @deprecated
   */
  "box-orient"?: Property.BoxOrient | undefined;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  "box-pack"?: Property.BoxPack | undefined;
  /**
   * The **`clip`** CSS property defines a visible portion of an element. The `clip` property applies only to absolutely positioned elements — that is, elements with `position:absolute` or `position:fixed`.
   *
   * **Syntax**: `<shape> | auto`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  clip?: Property.Clip | undefined;
  /**
   * The **`font-stretch`** CSS property selects a normal, condensed, or expanded face from a font.
   *
   * **Syntax**: `<font-stretch-absolute>`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  "font-stretch"?: Property.FontStretch | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "grid-column-gap"?: Property.GridColumnGap<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<'grid-row-gap'> <'grid-column-gap'>?`
   *
   * @deprecated
   */
  "grid-gap"?: Property.GridGap<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "grid-row-gap"?: Property.GridRowGap<TLength> | undefined;
  /**
   * **Syntax**: `auto | normal | active | inactive | disabled`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "ime-mode"?: Property.ImeMode | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <position-area>`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "inset-area"?: Property.PositionArea | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * @deprecated
   */
  "offset-block"?: Property.InsetBlock<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "offset-block-end"?: Property.InsetBlockEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "offset-block-start"?: Property.InsetBlockStart<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * @deprecated
   */
  "offset-inline"?: Property.InsetInline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "offset-inline-end"?: Property.InsetInlineEnd<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "offset-inline-start"?: Property.InsetInlineStart<TLength> | undefined;
  /**
   * The **`page-break-after`** CSS property adjusts page breaks _after_ the current element.
   *
   * **Syntax**: `auto | always | avoid | left | right | recto | verso`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "page-break-after"?: Property.PageBreakAfter | undefined;
  /**
   * The **`page-break-before`** CSS property adjusts page breaks _before_ the current element.
   *
   * **Syntax**: `auto | always | avoid | left | right | recto | verso`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "page-break-before"?: Property.PageBreakBefore | undefined;
  /**
   * The **`page-break-inside`** CSS property adjusts page breaks _inside_ the current element.
   *
   * **Syntax**: `auto | avoid`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "page-break-inside"?: Property.PageBreakInside | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ [<dashed-ident> || <try-tactic>] | <'position-area'> ]#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "position-try-options"?: Property.PositionTryFallbacks | undefined;
  /**
   * **Syntax**: `none | <position>#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "scroll-snap-coordinate"?: Property.ScrollSnapCoordinate<TLength> | undefined;
  /**
   * **Syntax**: `<position>`
   *
   * **Initial value**: `0px 0px`
   *
   * @deprecated
   */
  "scroll-snap-destination"?: Property.ScrollSnapDestination<TLength> | undefined;
  /**
   * **Syntax**: `none | repeat( <length-percentage> )`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "scroll-snap-points-x"?: Property.ScrollSnapPointsX | undefined;
  /**
   * **Syntax**: `none | repeat( <length-percentage> )`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "scroll-snap-points-y"?: Property.ScrollSnapPointsY | undefined;
  /**
   * **Syntax**: `none | mandatory | proximity`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "scroll-snap-type-x"?: Property.ScrollSnapTypeX | undefined;
  /**
   * **Syntax**: `none | mandatory | proximity`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "scroll-snap-type-y"?: Property.ScrollSnapTypeY | undefined;
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  "-khtml-box-align"?: Property.BoxAlign | undefined;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  "-khtml-box-direction"?: Property.BoxDirection | undefined;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "-khtml-box-flex"?: Property.BoxFlex | undefined;
  /**
   * The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  "-khtml-box-flex-group"?: Property.BoxFlexGroup | undefined;
  /**
   * The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).
   *
   * **Syntax**: `single | multiple`
   *
   * **Initial value**: `single`
   *
   * @deprecated
   */
  "-khtml-box-lines"?: Property.BoxLines | undefined;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  "-khtml-box-ordinal-group"?: Property.BoxOrdinalGroup | undefined;
  /**
   * The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis`
   *
   * @deprecated
   */
  "-khtml-box-orient"?: Property.BoxOrient | undefined;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  "-khtml-box-pack"?: Property.BoxPack | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "-khtml-line-break"?: Property.LineBreak | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<opacity-value>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  "-khtml-opacity"?: Property.Opacity | undefined;
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | text | none | all`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "-khtml-user-select"?: Property.UserSelect | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-clip>#`
   *
   * **Initial value**: `border-box`
   *
   * @deprecated
   */
  "-moz-background-clip"?: Property.BackgroundClip | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<visual-box>#`
   *
   * **Initial value**: `padding-box`
   *
   * @deprecated
   */
  "-moz-background-origin"?: Property.BackgroundOrigin | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * @deprecated
   */
  "-moz-background-size"?: Property.BackgroundSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   *
   * @deprecated
   */
  "-moz-border-radius"?: Property.BorderRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "-moz-border-radius-bottomleft"?: Property.BorderBottomLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "-moz-border-radius-bottomright"?: Property.BorderBottomRightRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "-moz-border-radius-topleft"?: Property.BorderTopLeftRadius<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "-moz-border-radius-topright"?: Property.BorderTopRightRadius<TLength> | undefined;
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  "-moz-box-align"?: Property.BoxAlign | undefined;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  "-moz-box-direction"?: Property.BoxDirection | undefined;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "-moz-box-flex"?: Property.BoxFlex | undefined;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  "-moz-box-ordinal-group"?: Property.BoxOrdinalGroup | undefined;
  /**
   * The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis`
   *
   * @deprecated
   */
  "-moz-box-orient"?: Property.BoxOrient | undefined;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  "-moz-box-pack"?: Property.BoxPack | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "-moz-box-shadow"?: Property.BoxShadow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<integer> | auto`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "-moz-column-count"?: Property.ColumnCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `auto | balance`
   *
   * **Initial value**: `balance`
   *
   * @deprecated
   */
  "-moz-column-fill"?: Property.ColumnFill | undefined;
  /**
   * The non-standard **`-moz-float-edge`** CSS property specifies whether the height and width properties of the element include the margin, border, or padding thickness.
   *
   * **Syntax**: `border-box | content-box | margin-box | padding-box`
   *
   * **Initial value**: `content-box`
   *
   * @deprecated
   */
  "-moz-float-edge"?: Property.MozFloatEdge | undefined;
  /**
   * The **`-moz-force-broken-image-icon`** extended CSS property can be used to force the broken image icon to be shown even when a broken image has an `alt` attribute.
   *
   * **Syntax**: `0 | 1`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "-moz-force-broken-image-icon"?: Property.MozForceBrokenImageIcon | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<opacity-value>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  "-moz-opacity"?: Property.Opacity | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `<'outline-width'> || <'outline-style'> || <'outline-color'>`
   *
   * @deprecated
   */
  "-moz-outline"?: Property.Outline<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "-moz-outline-color"?: Property.OutlineColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <outline-line-style>`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "-moz-outline-style"?: Property.OutlineStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * @deprecated
   */
  "-moz-outline-width"?: Property.OutlineWidth<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `auto | start | end | left | right | center | justify`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "-moz-text-align-last"?: Property.TextAlignLast | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * @deprecated
   */
  "-moz-text-decoration-color"?: Property.TextDecorationColor | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "-moz-text-decoration-line"?: Property.TextDecorationLine | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `solid | double | dotted | dashed | wavy`
   *
   * **Initial value**: `solid`
   *
   * @deprecated
   */
  "-moz-text-decoration-style"?: Property.TextDecorationStyle | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  "-moz-transition-delay"?: Property.TransitionDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  "-moz-transition-duration"?: Property.TransitionDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   *
   * @deprecated
   */
  "-moz-transition-property"?: Property.TransitionProperty | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * @deprecated
   */
  "-moz-transition-timing-function"?: Property.TransitionTimingFunction | undefined;
  /**
   * The **`-moz-user-focus`** CSS property is used to indicate whether an element can have the focus.
   *
   * **Syntax**: `ignore | normal | select-after | select-before | select-menu | select-same | select-all | none`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "-moz-user-focus"?: Property.MozUserFocus | undefined;
  /**
   * In Mozilla applications, **`-moz-user-input`** determines if an element will accept user input.
   *
   * **Syntax**: `auto | none | enabled | disabled`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "-moz-user-input"?: Property.MozUserInput | undefined;
  /**
   * **Syntax**: `auto | normal | active | inactive | disabled`
   *
   * **Initial value**: `auto`
   *
   * @deprecated
   */
  "-ms-ime-mode"?: Property.ImeMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation>#`
   *
   * @deprecated
   */
  "-o-animation"?: Property.Animation<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  "-o-animation-delay"?: Property.AnimationDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  "-o-animation-direction"?: Property.AnimationDirection | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ auto | <time [0s,∞]> ]#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  "-o-animation-duration"?: Property.AnimationDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "-o-animation-fill-mode"?: Property.AnimationFillMode | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  "-o-animation-iteration-count"?: Property.AnimationIterationCount | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "-o-animation-name"?: Property.AnimationName | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   *
   * @deprecated
   */
  "-o-animation-play-state"?: Property.AnimationPlayState | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * @deprecated
   */
  "-o-animation-timing-function"?: Property.AnimationTimingFunction | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * @deprecated
   */
  "-o-background-size"?: Property.BackgroundSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   *
   * @deprecated
   */
  "-o-border-image"?: Property.BorderImage | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `fill | contain | cover | none | scale-down`
   *
   * **Initial value**: `fill`
   *
   * @deprecated
   */
  "-o-object-fit"?: Property.ObjectFit | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   *
   * @deprecated
   */
  "-o-object-position"?: Property.ObjectPosition<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021.
   *
   * **Syntax**: `<integer> | <length>`
   *
   * **Initial value**: `8`
   *
   * @deprecated
   */
  "-o-tab-size"?: Property.TabSize<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ clip | ellipsis | <string> ]{1,2}`
   *
   * **Initial value**: `clip`
   *
   * @deprecated
   */
  "-o-text-overflow"?: Property.TextOverflow | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   *
   * @deprecated
   */
  "-o-transform"?: Property.Transform | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   *
   * @deprecated
   */
  "-o-transform-origin"?: Property.TransformOrigin<TLength> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   *
   * @deprecated
   */
  "-o-transition"?: Property.Transition<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  "-o-transition-delay"?: Property.TransitionDelay<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * @deprecated
   */
  "-o-transition-duration"?: Property.TransitionDuration<TTime> | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   *
   * @deprecated
   */
  "-o-transition-property"?: Property.TransitionProperty | undefined;
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * @deprecated
   */
  "-o-transition-timing-function"?: Property.TransitionTimingFunction | undefined;
  /**
   * The **`box-align`** CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | baseline | stretch`
   *
   * **Initial value**: `stretch`
   *
   * @deprecated
   */
  "-webkit-box-align"?: Property.BoxAlign | undefined;
  /**
   * The **`box-direction`** CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
   *
   * **Syntax**: `normal | reverse | inherit`
   *
   * **Initial value**: `normal`
   *
   * @deprecated
   */
  "-webkit-box-direction"?: Property.BoxDirection | undefined;
  /**
   * The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  "-webkit-box-flex"?: Property.BoxFlex | undefined;
  /**
   * The **`box-flex-group`** CSS property assigns the flexbox's child elements to a flex group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  "-webkit-box-flex-group"?: Property.BoxFlexGroup | undefined;
  /**
   * The **`box-lines`** CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).
   *
   * **Syntax**: `single | multiple`
   *
   * **Initial value**: `single`
   *
   * @deprecated
   */
  "-webkit-box-lines"?: Property.BoxLines | undefined;
  /**
   * The **`box-ordinal-group`** CSS property assigns the flexbox's child elements to an ordinal group.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `1`
   *
   * @deprecated
   */
  "-webkit-box-ordinal-group"?: Property.BoxOrdinalGroup | undefined;
  /**
   * The **`box-orient`** CSS property sets whether an element lays out its contents horizontally or vertically.
   *
   * **Syntax**: `horizontal | vertical | inline-axis | block-axis | inherit`
   *
   * **Initial value**: `inline-axis`
   *
   * @deprecated
   */
  "-webkit-box-orient"?: Property.BoxOrient | undefined;
  /**
   * The **`-moz-box-pack`** and **`-webkit-box-pack`** CSS properties specify how a `-moz-box` or `-webkit-box` packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
   *
   * **Syntax**: `start | center | end | justify`
   *
   * **Initial value**: `start`
   *
   * @deprecated
   */
  "-webkit-box-pack"?: Property.BoxPack | undefined;
}
interface SvgPropertiesHyphen<TLength = (string & {}) | 0, TTime = string & {}> {
  "alignment-baseline"?: Property.AlignmentBaseline | undefined;
  "baseline-shift"?: Property.BaselineShift<TLength> | undefined;
  clip?: Property.Clip | undefined;
  "clip-path"?: Property.ClipPath | undefined;
  "clip-rule"?: Property.ClipRule | undefined;
  color?: Property.Color | undefined;
  "color-interpolation"?: Property.ColorInterpolation | undefined;
  "color-rendering"?: Property.ColorRendering | undefined;
  cursor?: Property.Cursor | undefined;
  direction?: Property.Direction | undefined;
  display?: Property.Display | undefined;
  "dominant-baseline"?: Property.DominantBaseline | undefined;
  fill?: Property.Fill | undefined;
  "fill-opacity"?: Property.FillOpacity | undefined;
  "fill-rule"?: Property.FillRule | undefined;
  filter?: Property.Filter | undefined;
  "flood-color"?: Property.FloodColor | undefined;
  "flood-opacity"?: Property.FloodOpacity | undefined;
  font?: Property.Font | undefined;
  "font-family"?: Property.FontFamily | undefined;
  "font-size"?: Property.FontSize<TLength> | undefined;
  "font-size-adjust"?: Property.FontSizeAdjust | undefined;
  "font-stretch"?: Property.FontStretch | undefined;
  "font-style"?: Property.FontStyle | undefined;
  "font-variant"?: Property.FontVariant | undefined;
  "font-weight"?: Property.FontWeight | undefined;
  "glyph-orientation-vertical"?: Property.GlyphOrientationVertical | undefined;
  "image-rendering"?: Property.ImageRendering | undefined;
  "letter-spacing"?: Property.LetterSpacing<TLength> | undefined;
  "lighting-color"?: Property.LightingColor | undefined;
  "line-height"?: Property.LineHeight<TLength> | undefined;
  marker?: Property.Marker | undefined;
  "marker-end"?: Property.MarkerEnd | undefined;
  "marker-mid"?: Property.MarkerMid | undefined;
  "marker-start"?: Property.MarkerStart | undefined;
  mask?: Property.Mask<TLength> | undefined;
  opacity?: Property.Opacity | undefined;
  overflow?: Property.Overflow | undefined;
  "paint-order"?: Property.PaintOrder | undefined;
  "pointer-events"?: Property.PointerEvents | undefined;
  "shape-rendering"?: Property.ShapeRendering | undefined;
  "stop-color"?: Property.StopColor | undefined;
  "stop-opacity"?: Property.StopOpacity | undefined;
  stroke?: Property.Stroke | undefined;
  "stroke-dasharray"?: Property.StrokeDasharray<TLength> | undefined;
  "stroke-dashoffset"?: Property.StrokeDashoffset<TLength> | undefined;
  "stroke-linecap"?: Property.StrokeLinecap | undefined;
  "stroke-linejoin"?: Property.StrokeLinejoin | undefined;
  "stroke-miterlimit"?: Property.StrokeMiterlimit | undefined;
  "stroke-opacity"?: Property.StrokeOpacity | undefined;
  "stroke-width"?: Property.StrokeWidth<TLength> | undefined;
  "text-anchor"?: Property.TextAnchor | undefined;
  "text-decoration"?: Property.TextDecoration<TLength> | undefined;
  "text-rendering"?: Property.TextRendering | undefined;
  "unicode-bidi"?: Property.UnicodeBidi | undefined;
  "vector-effect"?: Property.VectorEffect | undefined;
  visibility?: Property.Visibility | undefined;
  "white-space"?: Property.WhiteSpace | undefined;
  "word-spacing"?: Property.WordSpacing<TLength> | undefined;
  "writing-mode"?: Property.WritingMode | undefined;
}
interface PropertiesHyphen<TLength = (string & {}) | 0, TTime = string & {}> extends StandardPropertiesHyphen<TLength, TTime>, VendorPropertiesHyphen<TLength, TTime>, ObsoletePropertiesHyphen<TLength, TTime>, SvgPropertiesHyphen<TLength, TTime> {}
type Globals = "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset";
declare namespace Property {
  export type AccentColor = Globals | DataType.Color | "auto";
  export type AlignContent = Globals | DataType.ContentDistribution | DataType.ContentPosition | "baseline" | "normal" | (string & {});
  export type AlignItems = Globals | DataType.SelfPosition | "anchor-center" | "baseline" | "normal" | "stretch" | (string & {});
  export type AlignSelf = Globals | DataType.SelfPosition | "anchor-center" | "auto" | "baseline" | "normal" | "stretch" | (string & {});
  export type AlignTracks = Globals | DataType.ContentDistribution | DataType.ContentPosition | "baseline" | "normal" | (string & {});
  export type AlignmentBaseline = Globals | "alphabetic" | "baseline" | "central" | "ideographic" | "mathematical" | "middle" | "text-after-edge" | "text-before-edge";
  export type All = Globals;
  export type AnchorName = Globals | "none" | (string & {});
  export type AnchorScope = Globals | "all" | "none" | (string & {});
  export type Animation<TTime = string & {}> = Globals | DataType.SingleAnimation<TTime> | (string & {});
  export type AnimationComposition = Globals | DataType.SingleAnimationComposition | (string & {});
  export type AnimationDelay<TTime = string & {}> = Globals | TTime | (string & {});
  export type AnimationDirection = Globals | DataType.SingleAnimationDirection | (string & {});
  export type AnimationDuration<TTime = string & {}> = Globals | TTime | "auto" | (string & {});
  export type AnimationFillMode = Globals | DataType.SingleAnimationFillMode | (string & {});
  export type AnimationIterationCount = Globals | "infinite" | (string & {}) | (number & {});
  export type AnimationName = Globals | "none" | (string & {});
  export type AnimationPlayState = Globals | "paused" | "running" | (string & {});
  export type AnimationRange<TLength = (string & {}) | 0> = Globals | DataType.TimelineRangeName | TLength | "normal" | (string & {});
  export type AnimationRangeEnd<TLength = (string & {}) | 0> = Globals | DataType.TimelineRangeName | TLength | "normal" | (string & {});
  export type AnimationRangeStart<TLength = (string & {}) | 0> = Globals | DataType.TimelineRangeName | TLength | "normal" | (string & {});
  export type AnimationTimeline = Globals | DataType.SingleAnimationTimeline | (string & {});
  export type AnimationTimingFunction = Globals | DataType.EasingFunction | (string & {});
  export type Appearance = Globals | DataType.CompatAuto | "auto" | "menulist-button" | "none" | "textfield";
  export type AspectRatio = Globals | "auto" | (string & {}) | (number & {});
  export type BackdropFilter = Globals | "none" | (string & {});
  export type BackfaceVisibility = Globals | "hidden" | "visible";
  export type Background<TLength = (string & {}) | 0> = Globals | DataType.BgLayer<TLength> | DataType.FinalBgLayer<TLength> | (string & {});
  export type BackgroundAttachment = Globals | DataType.Attachment | (string & {});
  export type BackgroundBlendMode = Globals | DataType.BlendMode | (string & {});
  export type BackgroundClip = Globals | DataType.BgClip | (string & {});
  export type BackgroundColor = Globals | DataType.Color;
  export type BackgroundImage = Globals | "none" | (string & {});
  export type BackgroundOrigin = Globals | DataType.VisualBox | (string & {});
  export type BackgroundPosition<TLength = (string & {}) | 0> = Globals | DataType.BgPosition<TLength> | (string & {});
  export type BackgroundPositionX<TLength = (string & {}) | 0> = Globals | TLength | "center" | "left" | "right" | "x-end" | "x-start" | (string & {});
  export type BackgroundPositionY<TLength = (string & {}) | 0> = Globals | TLength | "bottom" | "center" | "top" | "y-end" | "y-start" | (string & {});
  export type BackgroundRepeat = Globals | DataType.RepeatStyle | (string & {});
  export type BackgroundSize<TLength = (string & {}) | 0> = Globals | DataType.BgSize<TLength> | (string & {});
  export type BaselineShift<TLength = (string & {}) | 0> = Globals | TLength | "baseline" | "sub" | "super" | (string & {});
  export type BlockSize<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "auto" | "fit-content" | "max-content" | "min-content" | (string & {});
  export type Border<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderBlock<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderBlockColor = Globals | DataType.Color | (string & {});
  export type BorderBlockEnd<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderBlockEndColor = Globals | DataType.Color;
  export type BorderBlockEndStyle = Globals | DataType.LineStyle;
  export type BorderBlockEndWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength>;
  export type BorderBlockStart<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderBlockStartColor = Globals | DataType.Color;
  export type BorderBlockStartStyle = Globals | DataType.LineStyle;
  export type BorderBlockStartWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength>;
  export type BorderBlockStyle = Globals | DataType.LineStyle | (string & {});
  export type BorderBlockWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | (string & {});
  export type BorderBottom<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderBottomColor = Globals | DataType.Color;
  export type BorderBottomLeftRadius<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type BorderBottomRightRadius<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type BorderBottomStyle = Globals | DataType.LineStyle;
  export type BorderBottomWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength>;
  export type BorderCollapse = Globals | "collapse" | "separate";
  export type BorderColor = Globals | DataType.Color | (string & {});
  export type BorderEndEndRadius<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type BorderEndStartRadius<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type BorderImage = Globals | "none" | "repeat" | "round" | "space" | "stretch" | (string & {}) | (number & {});
  export type BorderImageOutset<TLength = (string & {}) | 0> = Globals | TLength | (string & {}) | (number & {});
  export type BorderImageRepeat = Globals | "repeat" | "round" | "space" | "stretch" | (string & {});
  export type BorderImageSlice = Globals | (string & {}) | (number & {});
  export type BorderImageSource = Globals | "none" | (string & {});
  export type BorderImageWidth<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {}) | (number & {});
  export type BorderInline<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderInlineColor = Globals | DataType.Color | (string & {});
  export type BorderInlineEnd<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderInlineEndColor = Globals | DataType.Color;
  export type BorderInlineEndStyle = Globals | DataType.LineStyle;
  export type BorderInlineEndWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength>;
  export type BorderInlineStart<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderInlineStartColor = Globals | DataType.Color;
  export type BorderInlineStartStyle = Globals | DataType.LineStyle;
  export type BorderInlineStartWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength>;
  export type BorderInlineStyle = Globals | DataType.LineStyle | (string & {});
  export type BorderInlineWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | (string & {});
  export type BorderLeft<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderLeftColor = Globals | DataType.Color;
  export type BorderLeftStyle = Globals | DataType.LineStyle;
  export type BorderLeftWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength>;
  export type BorderRadius<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type BorderRight<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderRightColor = Globals | DataType.Color;
  export type BorderRightStyle = Globals | DataType.LineStyle;
  export type BorderRightWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength>;
  export type BorderSpacing<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type BorderStartEndRadius<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type BorderStartStartRadius<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type BorderStyle = Globals | DataType.LineStyle | (string & {});
  export type BorderTop<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type BorderTopColor = Globals | DataType.Color;
  export type BorderTopLeftRadius<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type BorderTopRightRadius<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type BorderTopStyle = Globals | DataType.LineStyle;
  export type BorderTopWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength>;
  export type BorderWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | (string & {});
  export type Bottom<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type BoxAlign = Globals | "baseline" | "center" | "end" | "start" | "stretch";
  export type BoxDecorationBreak = Globals | "clone" | "slice";
  export type BoxDirection = Globals | "inherit" | "normal" | "reverse";
  export type BoxFlex = Globals | (number & {}) | (string & {});
  export type BoxFlexGroup = Globals | (number & {}) | (string & {});
  export type BoxLines = Globals | "multiple" | "single";
  export type BoxOrdinalGroup = Globals | (number & {}) | (string & {});
  export type BoxOrient = Globals | "block-axis" | "horizontal" | "inherit" | "inline-axis" | "vertical";
  export type BoxPack = Globals | "center" | "end" | "justify" | "start";
  export type BoxShadow = Globals | "none" | (string & {});
  export type BoxSizing = Globals | "border-box" | "content-box";
  export type BreakAfter = Globals | "all" | "always" | "auto" | "avoid" | "avoid-column" | "avoid-page" | "avoid-region" | "column" | "left" | "page" | "recto" | "region" | "right" | "verso";
  export type BreakBefore = Globals | "all" | "always" | "auto" | "avoid" | "avoid-column" | "avoid-page" | "avoid-region" | "column" | "left" | "page" | "recto" | "region" | "right" | "verso";
  export type BreakInside = Globals | "auto" | "avoid" | "avoid-column" | "avoid-page" | "avoid-region";
  export type CaptionSide = Globals | "bottom" | "top";
  export type Caret = Globals | DataType.Color | "auto" | "bar" | "block" | "underscore" | (string & {});
  export type CaretColor = Globals | DataType.Color | "auto";
  export type CaretShape = Globals | "auto" | "bar" | "block" | "underscore";
  export type Clear = Globals | "both" | "inline-end" | "inline-start" | "left" | "none" | "right";
  export type Clip = Globals | "auto" | (string & {});
  export type ClipPath = Globals | DataType.GeometryBox | "none" | (string & {});
  export type ClipRule = Globals | "evenodd" | "nonzero";
  export type Color = Globals | DataType.Color;
  export type PrintColorAdjust = Globals | "economy" | "exact";
  export type ColorInterpolationFilters = Globals | "auto" | "linearRGB" | "sRGB";
  export type ColorScheme = Globals | "dark" | "light" | "normal" | (string & {});
  export type ColumnCount = Globals | "auto" | (number & {}) | (string & {});
  export type ColumnFill = Globals | "auto" | "balance";
  export type ColumnGap<TLength = (string & {}) | 0> = Globals | TLength | "normal" | (string & {});
  export type ColumnRule<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type ColumnRuleColor = Globals | DataType.Color;
  export type ColumnRuleStyle = Globals | DataType.LineStyle | (string & {});
  export type ColumnRuleWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | (string & {});
  export type ColumnSpan = Globals | "all" | "none";
  export type ColumnWidth<TLength = (string & {}) | 0> = Globals | TLength | "auto";
  export type Columns<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {}) | (number & {});
  export type Contain = Globals | "content" | "inline-size" | "layout" | "none" | "paint" | "size" | "strict" | "style" | (string & {});
  export type ContainIntrinsicBlockSize<TLength = (string & {}) | 0> = Globals | TLength | "none" | (string & {});
  export type ContainIntrinsicHeight<TLength = (string & {}) | 0> = Globals | TLength | "none" | (string & {});
  export type ContainIntrinsicInlineSize<TLength = (string & {}) | 0> = Globals | TLength | "none" | (string & {});
  export type ContainIntrinsicSize<TLength = (string & {}) | 0> = Globals | TLength | "none" | (string & {});
  export type ContainIntrinsicWidth<TLength = (string & {}) | 0> = Globals | TLength | "none" | (string & {});
  export type Container = Globals | "none" | (string & {});
  export type ContainerName = Globals | "none" | (string & {});
  export type ContainerType = Globals | "inline-size" | "normal" | "scroll-state" | "size" | (string & {});
  export type Content = Globals | DataType.Quote | "none" | "normal" | (string & {});
  export type ContentVisibility = Globals | "auto" | "hidden" | "visible";
  export type CounterIncrement = Globals | "none" | (string & {});
  export type CounterReset = Globals | "none" | (string & {});
  export type CounterSet = Globals | "none" | (string & {});
  export type Cursor = Globals | DataType.CursorPredefined | (string & {});
  export type Cx<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type Cy<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type D = Globals | "none" | (string & {});
  export type Direction = Globals | "ltr" | "rtl";
  export type Display = Globals | DataType.DisplayOutside | DataType.DisplayInside | DataType.DisplayInternal | DataType.DisplayLegacy | "contents" | "list-item" | "none" | (string & {});
  export type DominantBaseline = Globals | "alphabetic" | "auto" | "central" | "hanging" | "ideographic" | "mathematical" | "middle" | "text-bottom" | "text-top";
  export type EmptyCells = Globals | "hide" | "show";
  export type FieldSizing = Globals | "content" | "fixed";
  export type Fill = Globals | DataType.Paint;
  export type FillOpacity = Globals | (string & {}) | (number & {});
  export type FillRule = Globals | "evenodd" | "nonzero";
  export type Filter = Globals | "none" | (string & {});
  export type Flex<TLength = (string & {}) | 0> = Globals | TLength | "auto" | "content" | "fit-content" | "max-content" | "min-content" | "none" | (string & {}) | (number & {});
  export type FlexBasis<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-auto" | "auto" | "content" | "fit-content" | "max-content" | "min-content" | (string & {});
  export type FlexDirection = Globals | "column" | "column-reverse" | "row" | "row-reverse";
  export type FlexFlow = Globals | "column" | "column-reverse" | "nowrap" | "row" | "row-reverse" | "wrap" | "wrap-reverse" | (string & {});
  export type FlexGrow = Globals | (number & {}) | (string & {});
  export type FlexShrink = Globals | (number & {}) | (string & {});
  export type FlexWrap = Globals | "nowrap" | "wrap" | "wrap-reverse";
  export type Float = Globals | "inline-end" | "inline-start" | "left" | "none" | "right";
  export type FloodColor = Globals | DataType.Color;
  export type FloodOpacity = Globals | (string & {}) | (number & {});
  export type Font = Globals | DataType.SystemFamilyName | (string & {});
  export type FontFamily = Globals | DataType.GenericFamily | (string & {});
  export type FontFeatureSettings = Globals | "normal" | (string & {});
  export type FontKerning = Globals | "auto" | "none" | "normal";
  export type FontLanguageOverride = Globals | "normal" | (string & {});
  export type FontOpticalSizing = Globals | "auto" | "none";
  export type FontPalette = Globals | "dark" | "light" | "normal" | (string & {});
  export type FontSize<TLength = (string & {}) | 0> = Globals | DataType.AbsoluteSize | TLength | "larger" | "math" | "smaller" | (string & {});
  export type FontSizeAdjust = Globals | "from-font" | "none" | (string & {}) | (number & {});
  export type FontSmooth<TLength = (string & {}) | 0> = Globals | DataType.AbsoluteSize | TLength | "always" | "auto" | "never";
  export type FontStretch = Globals | DataType.FontStretchAbsolute;
  export type FontStyle = Globals | "italic" | "normal" | "oblique" | (string & {});
  export type FontSynthesis = Globals | "none" | "position" | "small-caps" | "style" | "weight" | (string & {});
  export type FontSynthesisPosition = Globals | "auto" | "none";
  export type FontSynthesisSmallCaps = Globals | "auto" | "none";
  export type FontSynthesisStyle = Globals | "auto" | "none";
  export type FontSynthesisWeight = Globals | "auto" | "none";
  export type FontVariant = Globals | DataType.EastAsianVariantValues | "all-petite-caps" | "all-small-caps" | "common-ligatures" | "contextual" | "diagonal-fractions" | "discretionary-ligatures" | "full-width" | "historical-forms" | "historical-ligatures" | "lining-nums" | "no-common-ligatures" | "no-contextual" | "no-discretionary-ligatures" | "no-historical-ligatures" | "none" | "normal" | "oldstyle-nums" | "ordinal" | "petite-caps" | "proportional-nums" | "proportional-width" | "ruby" | "slashed-zero" | "small-caps" | "stacked-fractions" | "tabular-nums" | "titling-caps" | "unicase" | (string & {});
  export type FontVariantAlternates = Globals | "historical-forms" | "normal" | (string & {});
  export type FontVariantCaps = Globals | "all-petite-caps" | "all-small-caps" | "normal" | "petite-caps" | "small-caps" | "titling-caps" | "unicase";
  export type FontVariantEastAsian = Globals | DataType.EastAsianVariantValues | "full-width" | "normal" | "proportional-width" | "ruby" | (string & {});
  export type FontVariantEmoji = Globals | "emoji" | "normal" | "text" | "unicode";
  export type FontVariantLigatures = Globals | "common-ligatures" | "contextual" | "discretionary-ligatures" | "historical-ligatures" | "no-common-ligatures" | "no-contextual" | "no-discretionary-ligatures" | "no-historical-ligatures" | "none" | "normal" | (string & {});
  export type FontVariantNumeric = Globals | "diagonal-fractions" | "lining-nums" | "normal" | "oldstyle-nums" | "ordinal" | "proportional-nums" | "slashed-zero" | "stacked-fractions" | "tabular-nums" | (string & {});
  export type FontVariantPosition = Globals | "normal" | "sub" | "super";
  export type FontVariationSettings = Globals | "normal" | (string & {});
  export type FontWeight = Globals | DataType.FontWeightAbsolute | "bolder" | "lighter";
  export type FontWidth = Globals | "condensed" | "expanded" | "extra-condensed" | "extra-expanded" | "normal" | "semi-condensed" | "semi-expanded" | "ultra-condensed" | "ultra-expanded" | (string & {});
  export type ForcedColorAdjust = Globals | "auto" | "none" | "preserve-parent-color";
  export type Gap<TLength = (string & {}) | 0> = Globals | TLength | "normal" | (string & {});
  export type Grid = Globals | "none" | (string & {});
  export type GridArea = Globals | DataType.GridLine | (string & {});
  export type GridAutoColumns<TLength = (string & {}) | 0> = Globals | DataType.TrackBreadth<TLength> | (string & {});
  export type GridAutoFlow = Globals | "column" | "dense" | "row" | (string & {});
  export type GridAutoRows<TLength = (string & {}) | 0> = Globals | DataType.TrackBreadth<TLength> | (string & {});
  export type GridColumn = Globals | DataType.GridLine | (string & {});
  export type GridColumnEnd = Globals | DataType.GridLine;
  export type GridColumnGap<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type GridColumnStart = Globals | DataType.GridLine;
  export type GridGap<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type GridRow = Globals | DataType.GridLine | (string & {});
  export type GridRowEnd = Globals | DataType.GridLine;
  export type GridRowGap<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type GridRowStart = Globals | DataType.GridLine;
  export type GridTemplate = Globals | "none" | (string & {});
  export type GridTemplateAreas = Globals | "none" | (string & {});
  export type GridTemplateColumns<TLength = (string & {}) | 0> = Globals | DataType.TrackBreadth<TLength> | "none" | "subgrid" | (string & {});
  export type GridTemplateRows<TLength = (string & {}) | 0> = Globals | DataType.TrackBreadth<TLength> | "none" | "subgrid" | (string & {});
  export type HangingPunctuation = Globals | "allow-end" | "first" | "force-end" | "last" | "none" | (string & {});
  export type Height<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-fit-content" | "auto" | "fit-content" | "max-content" | "min-content" | (string & {});
  export type HyphenateCharacter = Globals | "auto" | (string & {});
  export type HyphenateLimitChars = Globals | "auto" | (string & {}) | (number & {});
  export type Hyphens = Globals | "auto" | "manual" | "none";
  export type ImageOrientation = Globals | "flip" | "from-image" | (string & {});
  export type ImageRendering = Globals | "-moz-crisp-edges" | "-webkit-optimize-contrast" | "auto" | "crisp-edges" | "pixelated" | "smooth";
  export type ImageResolution = Globals | "from-image" | (string & {});
  export type ImeMode = Globals | "active" | "auto" | "disabled" | "inactive" | "normal";
  export type InitialLetter = Globals | "normal" | (string & {}) | (number & {});
  export type InitialLetterAlign = Globals | "alphabetic" | "auto" | "hanging" | "ideographic";
  export type InlineSize<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-fill-available" | "auto" | "fit-content" | "max-content" | "min-content" | (string & {});
  export type Inset<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type PositionArea = Globals | DataType.PositionArea | "none";
  export type InsetBlock<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type InsetBlockEnd<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type InsetBlockStart<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type InsetInline<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type InsetInlineEnd<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type InsetInlineStart<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type InterpolateSize = Globals | "allow-keywords" | "numeric-only";
  export type Isolation = Globals | "auto" | "isolate";
  export type JustifyContent = Globals | DataType.ContentDistribution | DataType.ContentPosition | "left" | "normal" | "right" | (string & {});
  export type JustifyItems = Globals | DataType.SelfPosition | "anchor-center" | "baseline" | "left" | "legacy" | "normal" | "right" | "stretch" | (string & {});
  export type JustifySelf = Globals | DataType.SelfPosition | "anchor-center" | "auto" | "baseline" | "left" | "normal" | "right" | "stretch" | (string & {});
  export type JustifyTracks = Globals | DataType.ContentDistribution | DataType.ContentPosition | "left" | "normal" | "right" | (string & {});
  export type Left<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type LetterSpacing<TLength = (string & {}) | 0> = Globals | TLength | "normal";
  export type LightingColor = Globals | DataType.Color;
  export type LineBreak = Globals | "anywhere" | "auto" | "loose" | "normal" | "strict";
  export type LineClamp = Globals | "none" | (number & {}) | (string & {});
  export type LineHeight<TLength = (string & {}) | 0> = Globals | TLength | "normal" | (string & {}) | (number & {});
  export type LineHeightStep<TLength = (string & {}) | 0> = Globals | TLength;
  export type ListStyle = Globals | "inside" | "none" | "outside" | (string & {});
  export type ListStyleImage = Globals | "none" | (string & {});
  export type ListStylePosition = Globals | "inside" | "outside";
  export type ListStyleType = Globals | "none" | (string & {});
  export type Margin<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginBlock<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginBlockEnd<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginBlockStart<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginBottom<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginInline<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginInlineEnd<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginInlineStart<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginLeft<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginRight<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginTop<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type MarginTrim = Globals | "all" | "in-flow" | "none";
  export type Marker = Globals | "none" | (string & {});
  export type MarkerEnd = Globals | "none" | (string & {});
  export type MarkerMid = Globals | "none" | (string & {});
  export type MarkerStart = Globals | "none" | (string & {});
  export type Mask<TLength = (string & {}) | 0> = Globals | DataType.MaskLayer<TLength> | (string & {});
  export type MaskBorder = Globals | "alpha" | "luminance" | "none" | "repeat" | "round" | "space" | "stretch" | (string & {}) | (number & {});
  export type MaskBorderMode = Globals | "alpha" | "luminance";
  export type MaskBorderOutset<TLength = (string & {}) | 0> = Globals | TLength | (string & {}) | (number & {});
  export type MaskBorderRepeat = Globals | "repeat" | "round" | "space" | "stretch" | (string & {});
  export type MaskBorderSlice = Globals | (string & {}) | (number & {});
  export type MaskBorderSource = Globals | "none" | (string & {});
  export type MaskBorderWidth<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {}) | (number & {});
  export type MaskClip = Globals | DataType.PaintBox | "no-clip" | "view-box" | (string & {});
  export type MaskComposite = Globals | DataType.CompositingOperator | (string & {});
  export type MaskImage = Globals | "none" | (string & {});
  export type MaskMode = Globals | DataType.MaskingMode | (string & {});
  export type MaskOrigin = Globals | DataType.PaintBox | "view-box" | (string & {});
  export type MaskPosition<TLength = (string & {}) | 0> = Globals | DataType.Position<TLength> | (string & {});
  export type MaskRepeat = Globals | DataType.RepeatStyle | (string & {});
  export type MaskSize<TLength = (string & {}) | 0> = Globals | DataType.BgSize<TLength> | (string & {});
  export type MaskType = Globals | "alpha" | "luminance";
  export type MasonryAutoFlow = Globals | "definite-first" | "next" | "ordered" | "pack" | (string & {});
  export type MathDepth = Globals | "auto-add" | (string & {}) | (number & {});
  export type MathShift = Globals | "compact" | "normal";
  export type MathStyle = Globals | "compact" | "normal";
  export type MaxBlockSize<TLength = (string & {}) | 0> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "-webkit-fill-available" | "fit-content" | "max-content" | "min-content" | "none" | (string & {});
  export type MaxHeight<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-fit-content" | "-webkit-max-content" | "-webkit-min-content" | "fit-content" | "intrinsic" | "max-content" | "min-content" | "none" | (string & {});
  export type MaxInlineSize<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-fill-available" | "fit-content" | "max-content" | "min-content" | "none" | (string & {});
  export type MaxLines = Globals | "none" | (number & {}) | (string & {});
  export type MaxWidth<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-fit-content" | "-webkit-max-content" | "-webkit-min-content" | "fit-content" | "intrinsic" | "max-content" | "min-content" | "none" | (string & {});
  export type MinBlockSize<TLength = (string & {}) | 0> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "-webkit-fill-available" | "auto" | "fit-content" | "max-content" | "min-content" | (string & {});
  export type MinHeight<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-fit-content" | "-webkit-max-content" | "-webkit-min-content" | "auto" | "fit-content" | "intrinsic" | "max-content" | "min-content" | (string & {});
  export type MinInlineSize<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-fill-available" | "auto" | "fit-content" | "max-content" | "min-content" | (string & {});
  export type MinWidth<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-fit-content" | "-webkit-max-content" | "-webkit-min-content" | "auto" | "fit-content" | "intrinsic" | "max-content" | "min-content" | "min-intrinsic" | (string & {});
  export type MixBlendMode = Globals | DataType.BlendMode | "plus-darker" | "plus-lighter";
  export type Offset<TLength = (string & {}) | 0> = Globals | DataType.Position<TLength> | DataType.PaintBox | "auto" | "none" | "normal" | "view-box" | (string & {});
  export type OffsetDistance<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type OffsetPath = Globals | DataType.PaintBox | "none" | "view-box" | (string & {});
  export type OffsetRotate = Globals | "auto" | "reverse" | (string & {});
  export type ObjectFit = Globals | "contain" | "cover" | "fill" | "none" | "scale-down";
  export type ObjectPosition<TLength = (string & {}) | 0> = Globals | DataType.Position<TLength>;
  export type ObjectViewBox = Globals | "none" | (string & {});
  export type OffsetAnchor<TLength = (string & {}) | 0> = Globals | DataType.Position<TLength> | "auto";
  export type OffsetPosition<TLength = (string & {}) | 0> = Globals | DataType.Position<TLength> | "auto" | "normal";
  export type Opacity = Globals | (string & {}) | (number & {});
  export type Order = Globals | (number & {}) | (string & {});
  export type Orphans = Globals | (number & {}) | (string & {});
  export type Outline<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.OutlineLineStyle | DataType.Color | "auto" | (string & {});
  export type OutlineColor = Globals | DataType.Color | "auto";
  export type OutlineOffset<TLength = (string & {}) | 0> = Globals | TLength;
  export type OutlineStyle = Globals | DataType.OutlineLineStyle | "auto";
  export type OutlineWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength>;
  export type Overflow = Globals | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "overlay" | "scroll" | "visible" | (string & {});
  export type OverflowAnchor = Globals | "auto" | "none";
  export type OverflowBlock = Globals | "auto" | "clip" | "hidden" | "scroll" | "visible";
  export type OverflowClipBox = Globals | "content-box" | "padding-box";
  export type OverflowClipMargin<TLength = (string & {}) | 0> = Globals | DataType.VisualBox | TLength | (string & {});
  export type OverflowInline = Globals | "auto" | "clip" | "hidden" | "scroll" | "visible";
  export type OverflowWrap = Globals | "anywhere" | "break-word" | "normal";
  export type OverflowX = Globals | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "overlay" | "scroll" | "visible";
  export type OverflowY = Globals | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "overlay" | "scroll" | "visible";
  export type Overlay = Globals | "auto" | "none";
  export type OverscrollBehavior = Globals | "auto" | "contain" | "none" | (string & {});
  export type OverscrollBehaviorBlock = Globals | "auto" | "contain" | "none";
  export type OverscrollBehaviorInline = Globals | "auto" | "contain" | "none";
  export type OverscrollBehaviorX = Globals | "auto" | "contain" | "none";
  export type OverscrollBehaviorY = Globals | "auto" | "contain" | "none";
  export type Padding<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type PaddingBlock<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type PaddingBlockEnd<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type PaddingBlockStart<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type PaddingBottom<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type PaddingInline<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type PaddingInlineEnd<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type PaddingInlineStart<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type PaddingLeft<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type PaddingRight<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type PaddingTop<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type Page = Globals | "auto" | (string & {});
  export type PageBreakAfter = Globals | "always" | "auto" | "avoid" | "left" | "recto" | "right" | "verso";
  export type PageBreakBefore = Globals | "always" | "auto" | "avoid" | "left" | "recto" | "right" | "verso";
  export type PageBreakInside = Globals | "auto" | "avoid";
  export type PaintOrder = Globals | "fill" | "markers" | "normal" | "stroke" | (string & {});
  export type Perspective<TLength = (string & {}) | 0> = Globals | TLength | "none";
  export type PerspectiveOrigin<TLength = (string & {}) | 0> = Globals | DataType.Position<TLength>;
  export type PlaceContent = Globals | DataType.ContentDistribution | DataType.ContentPosition | "baseline" | "normal" | (string & {});
  export type PlaceItems = Globals | DataType.SelfPosition | "anchor-center" | "baseline" | "normal" | "stretch" | (string & {});
  export type PlaceSelf = Globals | DataType.SelfPosition | "anchor-center" | "auto" | "baseline" | "normal" | "stretch" | (string & {});
  export type PointerEvents = Globals | "all" | "auto" | "fill" | "inherit" | "none" | "painted" | "stroke" | "visible" | "visibleFill" | "visiblePainted" | "visibleStroke";
  export type Position = Globals | "-webkit-sticky" | "absolute" | "fixed" | "relative" | "static" | "sticky";
  export type PositionAnchor = Globals | "auto" | (string & {});
  export type PositionTry = Globals | DataType.TryTactic | DataType.PositionArea | "none" | (string & {});
  export type PositionTryFallbacks = Globals | DataType.TryTactic | DataType.PositionArea | "none" | (string & {});
  export type PositionTryOrder = Globals | DataType.TrySize | "normal";
  export type PositionVisibility = Globals | "always" | "anchors-valid" | "anchors-visible" | "no-overflow" | (string & {});
  export type Quotes = Globals | "auto" | "none" | (string & {});
  export type R<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type Resize = Globals | "block" | "both" | "horizontal" | "inline" | "none" | "vertical";
  export type Right<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type Rotate = Globals | "none" | (string & {});
  export type RowGap<TLength = (string & {}) | 0> = Globals | TLength | "normal" | (string & {});
  export type RubyAlign = Globals | "center" | "space-around" | "space-between" | "start";
  export type RubyMerge = Globals | "auto" | "collapse" | "separate";
  export type RubyOverhang = Globals | "auto" | "none";
  export type RubyPosition = Globals | "alternate" | "inter-character" | "over" | "under" | (string & {});
  export type Rx<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type Ry<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type Scale = Globals | "none" | (string & {}) | (number & {});
  export type ScrollBehavior = Globals | "auto" | "smooth";
  export type ScrollInitialTarget = Globals | "nearest" | "none";
  export type ScrollMargin<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type ScrollMarginBlock<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type ScrollMarginBlockEnd<TLength = (string & {}) | 0> = Globals | TLength;
  export type ScrollMarginBlockStart<TLength = (string & {}) | 0> = Globals | TLength;
  export type ScrollMarginBottom<TLength = (string & {}) | 0> = Globals | TLength;
  export type ScrollMarginInline<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type ScrollMarginInlineEnd<TLength = (string & {}) | 0> = Globals | TLength;
  export type ScrollMarginInlineStart<TLength = (string & {}) | 0> = Globals | TLength;
  export type ScrollMarginLeft<TLength = (string & {}) | 0> = Globals | TLength;
  export type ScrollMarginRight<TLength = (string & {}) | 0> = Globals | TLength;
  export type ScrollMarginTop<TLength = (string & {}) | 0> = Globals | TLength;
  export type ScrollPadding<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollPaddingBlock<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollPaddingBlockEnd<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollPaddingBlockStart<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollPaddingBottom<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollPaddingInline<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollPaddingInlineEnd<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollPaddingInlineStart<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollPaddingLeft<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollPaddingRight<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollPaddingTop<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ScrollSnapAlign = Globals | "center" | "end" | "none" | "start" | (string & {});
  export type ScrollSnapCoordinate<TLength = (string & {}) | 0> = Globals | DataType.Position<TLength> | "none" | (string & {});
  export type ScrollSnapDestination<TLength = (string & {}) | 0> = Globals | DataType.Position<TLength>;
  export type ScrollSnapPointsX = Globals | "none" | (string & {});
  export type ScrollSnapPointsY = Globals | "none" | (string & {});
  export type ScrollSnapStop = Globals | "always" | "normal";
  export type ScrollSnapType = Globals | "block" | "both" | "inline" | "none" | "x" | "y" | (string & {});
  export type ScrollSnapTypeX = Globals | "mandatory" | "none" | "proximity";
  export type ScrollSnapTypeY = Globals | "mandatory" | "none" | "proximity";
  export type ScrollTimeline = Globals | "none" | (string & {});
  export type ScrollTimelineAxis = Globals | "block" | "inline" | "x" | "y" | (string & {});
  export type ScrollTimelineName = Globals | "none" | (string & {});
  export type ScrollbarColor = Globals | "auto" | (string & {});
  export type ScrollbarGutter = Globals | "auto" | "stable" | (string & {});
  export type ScrollbarWidth = Globals | "auto" | "none" | "thin";
  export type ShapeImageThreshold = Globals | (string & {}) | (number & {});
  export type ShapeMargin<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type ShapeOutside = Globals | DataType.VisualBox | "margin-box" | "none" | (string & {});
  export type ShapeRendering = Globals | "auto" | "crispEdges" | "geometricPrecision" | "optimizeSpeed";
  export type SpeakAs = Globals | "digits" | "literal-punctuation" | "no-punctuation" | "normal" | "spell-out" | (string & {});
  export type StopColor = Globals | DataType.Color;
  export type StopOpacity = Globals | (string & {}) | (number & {});
  export type Stroke = Globals | DataType.Paint;
  export type StrokeColor = Globals | DataType.Color;
  export type StrokeDasharray<TLength = (string & {}) | 0> = Globals | DataType.Dasharray<TLength> | "none";
  export type StrokeDashoffset<TLength = (string & {}) | 0> = Globals | TLength | (string & {}) | (number & {});
  export type StrokeLinecap = Globals | "butt" | "round" | "square";
  export type StrokeLinejoin = Globals | "arcs" | "bevel" | "miter" | "miter-clip" | "round";
  export type StrokeMiterlimit = Globals | (number & {}) | (string & {});
  export type StrokeOpacity = Globals | (string & {}) | (number & {});
  export type StrokeWidth<TLength = (string & {}) | 0> = Globals | TLength | (string & {}) | (number & {});
  export type TabSize<TLength = (string & {}) | 0> = Globals | TLength | (number & {}) | (string & {});
  export type TableLayout = Globals | "auto" | "fixed";
  export type TextAlign = Globals | "-khtml-center" | "-khtml-left" | "-khtml-right" | "-moz-center" | "-moz-left" | "-moz-right" | "-webkit-center" | "-webkit-left" | "-webkit-match-parent" | "-webkit-right" | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start";
  export type TextAlignLast = Globals | "auto" | "center" | "end" | "justify" | "left" | "right" | "start";
  export type TextAnchor = Globals | "end" | "middle" | "start";
  export type TextAutospace = Globals | DataType.Autospace | "auto" | "normal";
  export type TextBox = Globals | DataType.TextEdge | "auto" | "none" | "normal" | "trim-both" | "trim-end" | "trim-start" | (string & {});
  export type TextBoxEdge = Globals | DataType.TextEdge | "auto";
  export type TextBoxTrim = Globals | "none" | "trim-both" | "trim-end" | "trim-start";
  export type TextCombineUpright = Globals | "all" | "digits" | "none" | (string & {});
  export type TextDecoration<TLength = (string & {}) | 0> = Globals | DataType.Color | TLength | "auto" | "blink" | "dashed" | "dotted" | "double" | "from-font" | "grammar-error" | "line-through" | "none" | "overline" | "solid" | "spelling-error" | "underline" | "wavy" | (string & {});
  export type TextDecorationColor = Globals | DataType.Color;
  export type TextDecorationLine = Globals | "blink" | "grammar-error" | "line-through" | "none" | "overline" | "spelling-error" | "underline" | (string & {});
  export type TextDecorationSkip = Globals | "box-decoration" | "edges" | "leading-spaces" | "none" | "objects" | "spaces" | "trailing-spaces" | (string & {});
  export type TextDecorationSkipInk = Globals | "all" | "auto" | "none";
  export type TextDecorationStyle = Globals | "dashed" | "dotted" | "double" | "solid" | "wavy";
  export type TextDecorationThickness<TLength = (string & {}) | 0> = Globals | TLength | "auto" | "from-font" | (string & {});
  export type TextEmphasis = Globals | DataType.Color | "circle" | "dot" | "double-circle" | "filled" | "none" | "open" | "sesame" | "triangle" | (string & {});
  export type TextEmphasisColor = Globals | DataType.Color;
  export type TextEmphasisPosition = Globals | "auto" | "over" | "under" | (string & {});
  export type TextEmphasisStyle = Globals | "circle" | "dot" | "double-circle" | "filled" | "none" | "open" | "sesame" | "triangle" | (string & {});
  export type TextIndent<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type TextJustify = Globals | "auto" | "distribute" | "inter-character" | "inter-word" | "none";
  export type TextOrientation = Globals | "mixed" | "sideways" | "sideways-right" | "upright";
  export type TextOverflow = Globals | "clip" | "ellipsis" | (string & {});
  export type TextRendering = Globals | "auto" | "geometricPrecision" | "optimizeLegibility" | "optimizeSpeed";
  export type TextShadow = Globals | "none" | (string & {});
  export type TextSizeAdjust = Globals | "auto" | "none" | (string & {});
  export type TextSpacingTrim = Globals | "normal" | "space-all" | "space-first" | "trim-start";
  export type TextTransform = Globals | "capitalize" | "full-size-kana" | "full-width" | "lowercase" | "math-auto" | "none" | "uppercase" | (string & {});
  export type TextUnderlineOffset<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type TextUnderlinePosition = Globals | "auto" | "from-font" | "left" | "right" | "under" | (string & {});
  export type TextWrap = Globals | "auto" | "balance" | "nowrap" | "pretty" | "stable" | "wrap" | (string & {});
  export type TextWrapMode = Globals | "nowrap" | "wrap";
  export type TextWrapStyle = Globals | "auto" | "balance" | "pretty" | "stable";
  export type TimelineScope = Globals | "none" | (string & {});
  export type Top<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type TouchAction = Globals | "-ms-manipulation" | "-ms-none" | "-ms-pan-x" | "-ms-pan-y" | "-ms-pinch-zoom" | "auto" | "manipulation" | "none" | "pan-down" | "pan-left" | "pan-right" | "pan-up" | "pan-x" | "pan-y" | "pinch-zoom" | (string & {});
  export type Transform = Globals | "none" | (string & {});
  export type TransformBox = Globals | "border-box" | "content-box" | "fill-box" | "stroke-box" | "view-box";
  export type TransformOrigin<TLength = (string & {}) | 0> = Globals | TLength | "bottom" | "center" | "left" | "right" | "top" | (string & {});
  export type TransformStyle = Globals | "flat" | "preserve-3d";
  export type Transition<TTime = string & {}> = Globals | DataType.SingleTransition<TTime> | (string & {});
  export type TransitionBehavior = Globals | "allow-discrete" | "normal" | (string & {});
  export type TransitionDelay<TTime = string & {}> = Globals | TTime | (string & {});
  export type TransitionDuration<TTime = string & {}> = Globals | TTime | (string & {});
  export type TransitionProperty = Globals | "all" | "none" | (string & {});
  export type TransitionTimingFunction = Globals | DataType.EasingFunction | (string & {});
  export type Translate<TLength = (string & {}) | 0> = Globals | TLength | "none" | (string & {});
  export type UnicodeBidi = Globals | "-moz-isolate" | "-moz-isolate-override" | "-moz-plaintext" | "-webkit-isolate" | "-webkit-isolate-override" | "-webkit-plaintext" | "bidi-override" | "embed" | "isolate" | "isolate-override" | "normal" | "plaintext";
  export type UserSelect = Globals | "-moz-none" | "all" | "auto" | "none" | "text";
  export type VectorEffect = Globals | "fixed-position" | "non-rotation" | "non-scaling-size" | "non-scaling-stroke" | "none";
  export type VerticalAlign<TLength = (string & {}) | 0> = Globals | TLength | "baseline" | "bottom" | "middle" | "sub" | "super" | "text-bottom" | "text-top" | "top" | (string & {});
  export type ViewTimeline = Globals | "none" | (string & {});
  export type ViewTimelineAxis = Globals | "block" | "inline" | "x" | "y" | (string & {});
  export type ViewTimelineInset<TLength = (string & {}) | 0> = Globals | TLength | "auto" | (string & {});
  export type ViewTimelineName = Globals | "none" | (string & {});
  export type ViewTransitionClass = Globals | "none" | (string & {});
  export type ViewTransitionName = Globals | "match-element" | "none" | (string & {});
  export type Visibility = Globals | "collapse" | "hidden" | "visible";
  export type WhiteSpace = Globals | "-moz-pre-wrap" | "break-spaces" | "collapse" | "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap" | "preserve" | "preserve-breaks" | "preserve-spaces" | "wrap" | (string & {});
  export type WhiteSpaceCollapse = Globals | "break-spaces" | "collapse" | "preserve" | "preserve-breaks" | "preserve-spaces";
  export type Widows = Globals | (number & {}) | (string & {});
  export type Width<TLength = (string & {}) | 0> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-fit-content" | "-webkit-max-content" | "auto" | "fit-content" | "intrinsic" | "max-content" | "min-content" | "min-intrinsic" | (string & {});
  export type WillChange = Globals | DataType.AnimateableFeature | "auto" | (string & {});
  export type WordBreak = Globals | "auto-phrase" | "break-all" | "break-word" | "keep-all" | "normal";
  export type WordSpacing<TLength = (string & {}) | 0> = Globals | TLength | "normal";
  export type WordWrap = Globals | "break-word" | "normal";
  export type WritingMode = Globals | "horizontal-tb" | "sideways-lr" | "sideways-rl" | "vertical-lr" | "vertical-rl";
  export type X<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type Y<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type ZIndex = Globals | "auto" | (number & {}) | (string & {});
  export type Zoom = Globals | "normal" | "reset" | (string & {}) | (number & {});
  export type MozAppearance = Globals | "-moz-mac-unified-toolbar" | "-moz-win-borderless-glass" | "-moz-win-browsertabbar-toolbox" | "-moz-win-communications-toolbox" | "-moz-win-communicationstext" | "-moz-win-exclude-glass" | "-moz-win-glass" | "-moz-win-media-toolbox" | "-moz-win-mediatext" | "-moz-window-button-box" | "-moz-window-button-box-maximized" | "-moz-window-button-close" | "-moz-window-button-maximize" | "-moz-window-button-minimize" | "-moz-window-button-restore" | "-moz-window-frame-bottom" | "-moz-window-frame-left" | "-moz-window-frame-right" | "-moz-window-titlebar" | "-moz-window-titlebar-maximized" | "button" | "button-arrow-down" | "button-arrow-next" | "button-arrow-previous" | "button-arrow-up" | "button-bevel" | "button-focus" | "caret" | "checkbox" | "checkbox-container" | "checkbox-label" | "checkmenuitem" | "dualbutton" | "groupbox" | "listbox" | "listitem" | "menuarrow" | "menubar" | "menucheckbox" | "menuimage" | "menuitem" | "menuitemtext" | "menulist" | "menulist-button" | "menulist-text" | "menulist-textfield" | "menupopup" | "menuradio" | "menuseparator" | "meterbar" | "meterchunk" | "none" | "progressbar" | "progressbar-vertical" | "progresschunk" | "progresschunk-vertical" | "radio" | "radio-container" | "radio-label" | "radiomenuitem" | "range" | "range-thumb" | "resizer" | "resizerpanel" | "scale-horizontal" | "scale-vertical" | "scalethumb-horizontal" | "scalethumb-vertical" | "scalethumbend" | "scalethumbstart" | "scalethumbtick" | "scrollbarbutton-down" | "scrollbarbutton-left" | "scrollbarbutton-right" | "scrollbarbutton-up" | "scrollbarthumb-horizontal" | "scrollbarthumb-vertical" | "scrollbartrack-horizontal" | "scrollbartrack-vertical" | "searchfield" | "separator" | "sheet" | "spinner" | "spinner-downbutton" | "spinner-textfield" | "spinner-upbutton" | "splitter" | "statusbar" | "statusbarpanel" | "tab" | "tab-scroll-arrow-back" | "tab-scroll-arrow-forward" | "tabpanel" | "tabpanels" | "textfield" | "textfield-multiline" | "toolbar" | "toolbarbutton" | "toolbarbutton-dropdown" | "toolbargripper" | "toolbox" | "tooltip" | "treeheader" | "treeheadercell" | "treeheadersortarrow" | "treeitem" | "treeline" | "treetwisty" | "treetwistyopen" | "treeview";
  export type MozBinding = Globals | "none" | (string & {});
  export type MozBorderBottomColors = Globals | DataType.Color | "none" | (string & {});
  export type MozBorderLeftColors = Globals | DataType.Color | "none" | (string & {});
  export type MozBorderRightColors = Globals | DataType.Color | "none" | (string & {});
  export type MozBorderTopColors = Globals | DataType.Color | "none" | (string & {});
  export type MozContextProperties = Globals | "fill" | "fill-opacity" | "none" | "stroke" | "stroke-opacity" | (string & {});
  export type MozFloatEdge = Globals | "border-box" | "content-box" | "margin-box" | "padding-box";
  export type MozForceBrokenImageIcon = Globals | 0 | (string & {}) | 1;
  export type MozOrient = Globals | "block" | "horizontal" | "inline" | "vertical";
  export type MozOutlineRadius<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type MozOutlineRadiusBottomleft<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type MozOutlineRadiusBottomright<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type MozOutlineRadiusTopleft<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type MozOutlineRadiusTopright<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type MozStackSizing = Globals | "ignore" | "stretch-to-fit";
  export type MozTextBlink = Globals | "blink" | "none";
  export type MozUserFocus = Globals | "ignore" | "none" | "normal" | "select-after" | "select-all" | "select-before" | "select-menu" | "select-same";
  export type MozUserInput = Globals | "auto" | "disabled" | "enabled" | "none";
  export type MozUserModify = Globals | "read-only" | "read-write" | "write-only";
  export type MozWindowDragging = Globals | "drag" | "no-drag";
  export type MozWindowShadow = Globals | "default" | "menu" | "none" | "sheet" | "tooltip";
  export type MsAccelerator = Globals | "false" | "true";
  export type MsBlockProgression = Globals | "bt" | "lr" | "rl" | "tb";
  export type MsContentZoomChaining = Globals | "chained" | "none";
  export type MsContentZoomLimit = Globals | (string & {});
  export type MsContentZoomLimitMax = Globals | (string & {});
  export type MsContentZoomLimitMin = Globals | (string & {});
  export type MsContentZoomSnap = Globals | "mandatory" | "none" | "proximity" | (string & {});
  export type MsContentZoomSnapPoints = Globals | (string & {});
  export type MsContentZoomSnapType = Globals | "mandatory" | "none" | "proximity";
  export type MsContentZooming = Globals | "none" | "zoom";
  export type MsFilter = Globals | (string & {});
  export type MsFlowFrom = Globals | "none" | (string & {});
  export type MsFlowInto = Globals | "none" | (string & {});
  export type MsGridColumns<TLength = (string & {}) | 0> = Globals | DataType.TrackBreadth<TLength> | "none" | (string & {});
  export type MsGridRows<TLength = (string & {}) | 0> = Globals | DataType.TrackBreadth<TLength> | "none" | (string & {});
  export type MsHighContrastAdjust = Globals | "auto" | "none";
  export type MsHyphenateLimitChars = Globals | "auto" | (string & {}) | (number & {});
  export type MsHyphenateLimitLines = Globals | "no-limit" | (number & {}) | (string & {});
  export type MsHyphenateLimitZone<TLength = (string & {}) | 0> = Globals | TLength | (string & {});
  export type MsImeAlign = Globals | "after" | "auto";
  export type MsOverflowStyle = Globals | "-ms-autohiding-scrollbar" | "auto" | "none" | "scrollbar";
  export type MsScrollChaining = Globals | "chained" | "none";
  export type MsScrollLimit = Globals | (string & {});
  export type MsScrollLimitXMax<TLength = (string & {}) | 0> = Globals | TLength | "auto";
  export type MsScrollLimitXMin<TLength = (string & {}) | 0> = Globals | TLength;
  export type MsScrollLimitYMax<TLength = (string & {}) | 0> = Globals | TLength | "auto";
  export type MsScrollLimitYMin<TLength = (string & {}) | 0> = Globals | TLength;
  export type MsScrollRails = Globals | "none" | "railed";
  export type MsScrollSnapPointsX = Globals | (string & {});
  export type MsScrollSnapPointsY = Globals | (string & {});
  export type MsScrollSnapType = Globals | "mandatory" | "none" | "proximity";
  export type MsScrollSnapX = Globals | (string & {});
  export type MsScrollSnapY = Globals | (string & {});
  export type MsScrollTranslation = Globals | "none" | "vertical-to-horizontal";
  export type MsScrollbar3dlightColor = Globals | DataType.Color;
  export type MsScrollbarArrowColor = Globals | DataType.Color;
  export type MsScrollbarBaseColor = Globals | DataType.Color;
  export type MsScrollbarDarkshadowColor = Globals | DataType.Color;
  export type MsScrollbarFaceColor = Globals | DataType.Color;
  export type MsScrollbarHighlightColor = Globals | DataType.Color;
  export type MsScrollbarShadowColor = Globals | DataType.Color;
  export type MsScrollbarTrackColor = Globals | DataType.Color;
  export type MsTextAutospace = Globals | "ideograph-alpha" | "ideograph-numeric" | "ideograph-parenthesis" | "ideograph-space" | "none";
  export type MsTouchSelect = Globals | "grippers" | "none";
  export type MsUserSelect = Globals | "element" | "none" | "text";
  export type MsWrapFlow = Globals | "auto" | "both" | "clear" | "end" | "maximum" | "start";
  export type MsWrapMargin<TLength = (string & {}) | 0> = Globals | TLength;
  export type MsWrapThrough = Globals | "none" | "wrap";
  export type WebkitAppearance = Globals | "-apple-pay-button" | "button" | "button-bevel" | "caret" | "checkbox" | "default-button" | "inner-spin-button" | "listbox" | "listitem" | "media-controls-background" | "media-controls-fullscreen-background" | "media-current-time-display" | "media-enter-fullscreen-button" | "media-exit-fullscreen-button" | "media-fullscreen-button" | "media-mute-button" | "media-overlay-play-button" | "media-play-button" | "media-seek-back-button" | "media-seek-forward-button" | "media-slider" | "media-sliderthumb" | "media-time-remaining-display" | "media-toggle-closed-captions-button" | "media-volume-slider" | "media-volume-slider-container" | "media-volume-sliderthumb" | "menulist" | "menulist-button" | "menulist-text" | "menulist-textfield" | "meter" | "none" | "progress-bar" | "progress-bar-value" | "push-button" | "radio" | "searchfield" | "searchfield-cancel-button" | "searchfield-decoration" | "searchfield-results-button" | "searchfield-results-decoration" | "slider-horizontal" | "slider-vertical" | "sliderthumb-horizontal" | "sliderthumb-vertical" | "square-button" | "textarea" | "textfield";
  export type WebkitBorderBefore<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | DataType.LineStyle | DataType.Color | (string & {});
  export type WebkitBorderBeforeColor = Globals | DataType.Color;
  export type WebkitBorderBeforeStyle = Globals | DataType.LineStyle | (string & {});
  export type WebkitBorderBeforeWidth<TLength = (string & {}) | 0> = Globals | DataType.LineWidth<TLength> | (string & {});
  export type WebkitBoxReflect<TLength = (string & {}) | 0> = Globals | TLength | "above" | "below" | "left" | "right" | (string & {});
  export type WebkitLineClamp = Globals | "none" | (number & {}) | (string & {});
  export type WebkitMask<TLength = (string & {}) | 0> = Globals | DataType.Position<TLength> | DataType.RepeatStyle | DataType.VisualBox | "border" | "content" | "none" | "padding" | "text" | (string & {});
  export type WebkitMaskAttachment = Globals | DataType.Attachment | (string & {});
  export type WebkitMaskClip = Globals | DataType.PaintBox | "border" | "content" | "no-clip" | "padding" | "text" | "view-box" | (string & {});
  export type WebkitMaskComposite = Globals | DataType.CompositeStyle | (string & {});
  export type WebkitMaskImage = Globals | "none" | (string & {});
  export type WebkitMaskOrigin = Globals | DataType.PaintBox | "border" | "content" | "padding" | "view-box" | (string & {});
  export type WebkitMaskPosition<TLength = (string & {}) | 0> = Globals | DataType.Position<TLength> | (string & {});
  export type WebkitMaskPositionX<TLength = (string & {}) | 0> = Globals | TLength | "center" | "left" | "right" | (string & {});
  export type WebkitMaskPositionY<TLength = (string & {}) | 0> = Globals | TLength | "bottom" | "center" | "top" | (string & {});
  export type WebkitMaskRepeat = Globals | DataType.RepeatStyle | (string & {});
  export type WebkitMaskRepeatX = Globals | "no-repeat" | "repeat" | "round" | "space";
  export type WebkitMaskRepeatY = Globals | "no-repeat" | "repeat" | "round" | "space";
  export type WebkitMaskSize<TLength = (string & {}) | 0> = Globals | DataType.BgSize<TLength> | (string & {});
  export type WebkitOverflowScrolling = Globals | "auto" | "touch";
  export type WebkitTapHighlightColor = Globals | DataType.Color;
  export type WebkitTextFillColor = Globals | DataType.Color;
  export type WebkitTextStroke<TLength = (string & {}) | 0> = Globals | DataType.Color | TLength | (string & {});
  export type WebkitTextStrokeColor = Globals | DataType.Color;
  export type WebkitTextStrokeWidth<TLength = (string & {}) | 0> = Globals | TLength;
  export type WebkitTouchCallout = Globals | "default" | "none";
  export type WebkitUserModify = Globals | "read-only" | "read-write" | "read-write-plaintext-only";
  export type WebkitUserSelect = Globals | "all" | "auto" | "none" | "text";
  export type ColorInterpolation = Globals | "auto" | "linearRGB" | "sRGB";
  export type ColorRendering = Globals | "auto" | "optimizeQuality" | "optimizeSpeed";
  export type GlyphOrientationVertical = Globals | "auto" | (string & {}) | (number & {});
}
/**
 * **Attention!** Data types receives its name from the spec. E.g. `<color>` becomes `DataType.Color` and
 * `<content-distribution>` becomes `DataType.ContentDistribution`. It happens quite frequent that these data types
 * are split into several data types or/and name changes as the spec develops. So there's a risk that a minor/patch
 * update from `csstype` can break your typing if you're using the `DataType` namespace.
 */
declare namespace DataType {
  type AbsoluteSize = "large" | "medium" | "small" | "x-large" | "x-small" | "xx-large" | "xx-small" | "xxx-large";
  type AnimateableFeature = "contents" | "scroll-position" | (string & {});
  type Attachment = "fixed" | "local" | "scroll";
  type Autospace = "ideograph-alpha" | "ideograph-numeric" | "insert" | "no-autospace" | "punctuation" | "replace" | (string & {});
  type BgClip = VisualBox | "border-area" | "text";
  type BgLayer<TLength> = BgPosition<TLength> | RepeatStyle | Attachment | VisualBox | "none" | (string & {});
  type BgPosition<TLength> = TLength | "bottom" | "center" | "left" | "right" | "top" | (string & {});
  type BgSize<TLength> = TLength | "auto" | "contain" | "cover" | (string & {});
  type BlendMode = "color" | "color-burn" | "color-dodge" | "darken" | "difference" | "exclusion" | "hard-light" | "hue" | "lighten" | "luminosity" | "multiply" | "normal" | "overlay" | "saturation" | "screen" | "soft-light";
  type Color = ColorBase | SystemColor | DeprecatedSystemColor | "currentColor" | (string & {});
  type ColorBase = NamedColor | "transparent" | (string & {});
  type CompatAuto = "button" | "checkbox" | "listbox" | "menulist" | "meter" | "progress-bar" | "radio" | "searchfield" | "textarea";
  type CompositeStyle = "clear" | "copy" | "destination-atop" | "destination-in" | "destination-out" | "destination-over" | "source-atop" | "source-in" | "source-out" | "source-over" | "xor";
  type CompositingOperator = "add" | "exclude" | "intersect" | "subtract";
  type ContentDistribution = "space-around" | "space-between" | "space-evenly" | "stretch";
  type ContentPosition = "center" | "end" | "flex-end" | "flex-start" | "start";
  type CubicBezierEasingFunction = "ease" | "ease-in" | "ease-in-out" | "ease-out" | (string & {});
  type CursorPredefined = "-moz-grab" | "-moz-zoom-in" | "-moz-zoom-out" | "-webkit-grab" | "-webkit-grabbing" | "-webkit-zoom-in" | "-webkit-zoom-out" | "alias" | "all-scroll" | "auto" | "cell" | "col-resize" | "context-menu" | "copy" | "crosshair" | "default" | "e-resize" | "ew-resize" | "grab" | "grabbing" | "help" | "move" | "n-resize" | "ne-resize" | "nesw-resize" | "no-drop" | "none" | "not-allowed" | "ns-resize" | "nw-resize" | "nwse-resize" | "pointer" | "progress" | "row-resize" | "s-resize" | "se-resize" | "sw-resize" | "text" | "vertical-text" | "w-resize" | "wait" | "zoom-in" | "zoom-out";
  type Dasharray<TLength> = TLength | (string & {}) | (number & {});
  type DeprecatedSystemColor = "ActiveBorder" | "ActiveCaption" | "AppWorkspace" | "Background" | "ButtonHighlight" | "ButtonShadow" | "CaptionText" | "InactiveBorder" | "InactiveCaption" | "InactiveCaptionText" | "InfoBackground" | "InfoText" | "Menu" | "MenuText" | "Scrollbar" | "ThreeDDarkShadow" | "ThreeDFace" | "ThreeDHighlight" | "ThreeDLightShadow" | "ThreeDShadow" | "Window" | "WindowFrame" | "WindowText";
  type DisplayInside = "-ms-flexbox" | "-ms-grid" | "-webkit-flex" | "flex" | "flow" | "flow-root" | "grid" | "ruby" | "table";
  type DisplayInternal = "ruby-base" | "ruby-base-container" | "ruby-text" | "ruby-text-container" | "table-caption" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" | "table-row" | "table-row-group";
  type DisplayLegacy = "-ms-inline-flexbox" | "-ms-inline-grid" | "-webkit-inline-flex" | "inline-block" | "inline-flex" | "inline-grid" | "inline-list-item" | "inline-table";
  type DisplayOutside = "block" | "inline" | "run-in";
  type EasingFunction = CubicBezierEasingFunction | StepEasingFunction | "linear" | (string & {});
  type EastAsianVariantValues = "jis04" | "jis78" | "jis83" | "jis90" | "simplified" | "traditional";
  type FinalBgLayer<TLength> = BgPosition<TLength> | RepeatStyle | Attachment | VisualBox | Color | "none" | (string & {});
  type FontStretchAbsolute = "condensed" | "expanded" | "extra-condensed" | "extra-expanded" | "normal" | "semi-condensed" | "semi-expanded" | "ultra-condensed" | "ultra-expanded" | (string & {});
  type FontWeightAbsolute = "bold" | "normal" | (number & {}) | (string & {});
  type GenericComplete = "-apple-system" | "cursive" | "fantasy" | "math" | "monospace" | "sans-serif" | "serif" | "system-ui";
  type GenericFamily = GenericComplete | GenericIncomplete | "emoji" | "fangsong";
  type GenericIncomplete = "ui-monospace" | "ui-rounded" | "ui-sans-serif" | "ui-serif";
  type GeometryBox = VisualBox | "fill-box" | "margin-box" | "stroke-box" | "view-box";
  type GridLine = "auto" | (string & {}) | (number & {});
  type LineStyle = "dashed" | "dotted" | "double" | "groove" | "hidden" | "inset" | "none" | "outset" | "ridge" | "solid";
  type LineWidth<TLength> = TLength | "medium" | "thick" | "thin";
  type MaskLayer<TLength> = Position<TLength> | RepeatStyle | GeometryBox | CompositingOperator | MaskingMode | "no-clip" | "none" | (string & {});
  type MaskingMode = "alpha" | "luminance" | "match-source";
  type NamedColor = "aliceblue" | "antiquewhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedalmond" | "blue" | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse" | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson" | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray" | "darkgreen" | "darkgrey" | "darkkhaki" | "darkmagenta" | "darkolivegreen" | "darkorange" | "darkorchid" | "darkred" | "darksalmon" | "darkseagreen" | "darkslateblue" | "darkslategray" | "darkslategrey" | "darkturquoise" | "darkviolet" | "deeppink" | "deepskyblue" | "dimgray" | "dimgrey" | "dodgerblue" | "firebrick" | "floralwhite" | "forestgreen" | "fuchsia" | "gainsboro" | "ghostwhite" | "gold" | "goldenrod" | "gray" | "green" | "greenyellow" | "grey" | "honeydew" | "hotpink" | "indianred" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderblush" | "lawngreen" | "lemonchiffon" | "lightblue" | "lightcoral" | "lightcyan" | "lightgoldenrodyellow" | "lightgray" | "lightgreen" | "lightgrey" | "lightpink" | "lightsalmon" | "lightseagreen" | "lightskyblue" | "lightslategray" | "lightslategrey" | "lightsteelblue" | "lightyellow" | "lime" | "limegreen" | "linen" | "magenta" | "maroon" | "mediumaquamarine" | "mediumblue" | "mediumorchid" | "mediumpurple" | "mediumseagreen" | "mediumslateblue" | "mediumspringgreen" | "mediumturquoise" | "mediumvioletred" | "midnightblue" | "mintcream" | "mistyrose" | "moccasin" | "navajowhite" | "navy" | "oldlace" | "olive" | "olivedrab" | "orange" | "orangered" | "orchid" | "palegoldenrod" | "palegreen" | "paleturquoise" | "palevioletred" | "papayawhip" | "peachpuff" | "peru" | "pink" | "plum" | "powderblue" | "purple" | "rebeccapurple" | "red" | "rosybrown" | "royalblue" | "saddlebrown" | "salmon" | "sandybrown" | "seagreen" | "seashell" | "sienna" | "silver" | "skyblue" | "slateblue" | "slategray" | "slategrey" | "snow" | "springgreen" | "steelblue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whitesmoke" | "yellow" | "yellowgreen";
  type OutlineLineStyle = "dashed" | "dotted" | "double" | "groove" | "inset" | "none" | "outset" | "ridge" | "solid";
  type PageSize = "A3" | "A4" | "A5" | "B4" | "B5" | "JIS-B4" | "JIS-B5" | "ledger" | "legal" | "letter";
  type Paint = Color | "context-fill" | "context-stroke" | "none" | (string & {});
  type PaintBox = VisualBox | "fill-box" | "stroke-box";
  type Position<TLength> = TLength | "bottom" | "center" | "left" | "right" | "top" | (string & {});
  type PositionArea = "block-end" | "block-start" | "bottom" | "center" | "end" | "inline-end" | "inline-start" | "left" | "right" | "self-block-end" | "self-block-start" | "self-end" | "self-inline-end" | "self-inline-start" | "self-start" | "span-all" | "span-block-end" | "span-block-start" | "span-bottom" | "span-end" | "span-inline-end" | "span-inline-start" | "span-left" | "span-right" | "span-self-block-end" | "span-self-block-start" | "span-self-end" | "span-self-inline-end" | "span-self-inline-start" | "span-self-start" | "span-start" | "span-top" | "span-x-end" | "span-x-self-end" | "span-x-self-start" | "span-x-start" | "span-y-end" | "span-y-self-end" | "span-y-self-start" | "span-y-start" | "start" | "top" | "x-end" | "x-self-end" | "x-self-start" | "x-start" | "y-end" | "y-self-end" | "y-self-start" | "y-start" | (string & {});
  type Quote = "close-quote" | "no-close-quote" | "no-open-quote" | "open-quote";
  type RepeatStyle = "no-repeat" | "repeat" | "repeat-x" | "repeat-y" | "round" | "space" | (string & {});
  type SelfPosition = "center" | "end" | "flex-end" | "flex-start" | "self-end" | "self-start" | "start";
  type SingleAnimation<TTime> = EasingFunction | SingleAnimationDirection | SingleAnimationFillMode | SingleAnimationTimeline | TTime | "auto" | "infinite" | "none" | "paused" | "running" | (string & {}) | (number & {});
  type SingleAnimationComposition = "accumulate" | "add" | "replace";
  type SingleAnimationDirection = "alternate" | "alternate-reverse" | "normal" | "reverse";
  type SingleAnimationFillMode = "backwards" | "both" | "forwards" | "none";
  type SingleAnimationTimeline = "auto" | "none" | (string & {});
  type SingleTransition<TTime> = EasingFunction | TTime | "all" | "allow-discrete" | "none" | "normal" | (string & {});
  type StepEasingFunction = "step-end" | "step-start" | (string & {});
  type SystemColor = "AccentColor" | "AccentColorText" | "ActiveText" | "ButtonBorder" | "ButtonFace" | "ButtonText" | "Canvas" | "CanvasText" | "Field" | "FieldText" | "GrayText" | "Highlight" | "HighlightText" | "LinkText" | "Mark" | "MarkText" | "SelectedItem" | "SelectedItemText" | "VisitedText";
  type SystemFamilyName = "caption" | "icon" | "menu" | "message-box" | "small-caption" | "status-bar";
  type TextEdge = "cap" | "ex" | "ideographic" | "ideographic-ink" | "text" | (string & {});
  type TimelineRangeName = "contain" | "cover" | "entry" | "entry-crossing" | "exit" | "exit-crossing";
  type TrackBreadth<TLength> = TLength | "auto" | "max-content" | "min-content" | (string & {});
  type TrySize = "most-block-size" | "most-height" | "most-inline-size" | "most-width";
  type TryTactic = "flip-block" | "flip-inline" | "flip-start" | (string & {});
  type VisualBox = "border-box" | "content-box" | "padding-box";
}
//#endregion
//#region packages/runtime-dom/src/jsx.d.ts
interface CSSProperties extends Properties<string | number>, PropertiesHyphen<string | number> {
  /**
  * The index signature was removed to enable closed typing for style
  * using CSSType. You're able to use type assertion or module augmentation
  * to add properties or an index signature of your own.
  *
  * For examples and more information, visit:
  * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
  */
  [v: `--${string}`]: string | number | undefined;
}
type Booleanish = boolean | "true" | "false";
type Numberish = number | string;
interface AriaAttributes {
  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  "aria-activedescendant"?: string | undefined;
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  "aria-atomic"?: Booleanish | undefined;
  /**
  * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
  * presented if they are made.
  */
  "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined;
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  "aria-busy"?: Booleanish | undefined;
  /**
  * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
  * @see aria-pressed @see aria-selected.
  */
  "aria-checked"?: Booleanish | "mixed" | undefined;
  /**
  * Defines the total number of columns in a table, grid, or treegrid.
  * @see aria-colindex.
  */
  "aria-colcount"?: Numberish | undefined;
  /**
  * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
  * @see aria-colcount @see aria-colspan.
  */
  "aria-colindex"?: Numberish | undefined;
  /**
  * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
  * @see aria-colindex @see aria-rowspan.
  */
  "aria-colspan"?: Numberish | undefined;
  /**
  * Identifies the element (or elements) whose contents or presence are controlled by the current element.
  * @see aria-owns.
  */
  "aria-controls"?: string | undefined;
  /** Indicates the element that represents the current item within a container or set of related elements. */
  "aria-current"?: Booleanish | "page" | "step" | "location" | "date" | "time" | undefined;
  /**
  * Identifies the element (or elements) that describes the object.
  * @see aria-labelledby
  */
  "aria-describedby"?: string | undefined;
  /**
  * Identifies the element that provides a detailed, extended description for the object.
  * @see aria-describedby.
  */
  "aria-details"?: string | undefined;
  /**
  * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
  * @see aria-hidden @see aria-readonly.
  */
  "aria-disabled"?: Booleanish | undefined;
  /**
  * Indicates what functions can be performed when a dragged object is released on the drop target.
  * @deprecated in ARIA 1.1
  */
  "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined;
  /**
  * Identifies the element that provides an error message for the object.
  * @see aria-invalid @see aria-describedby.
  */
  "aria-errormessage"?: string | undefined;
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  "aria-expanded"?: Booleanish | undefined;
  /**
  * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
  * allows assistive technology to override the general default of reading in document source order.
  */
  "aria-flowto"?: string | undefined;
  /**
  * Indicates an element's "grabbed" state in a drag-and-drop operation.
  * @deprecated in ARIA 1.1
  */
  "aria-grabbed"?: Booleanish | undefined;
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  "aria-haspopup"?: Booleanish | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined;
  /**
  * Indicates whether the element is exposed to an accessibility API.
  * @see aria-disabled.
  */
  "aria-hidden"?: Booleanish | undefined;
  /**
  * Indicates the entered value does not conform to the format expected by the application.
  * @see aria-errormessage.
  */
  "aria-invalid"?: Booleanish | "grammar" | "spelling" | undefined;
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  "aria-keyshortcuts"?: string | undefined;
  /**
  * Defines a string value that labels the current element.
  * @see aria-labelledby.
  */
  "aria-label"?: string | undefined;
  /**
  * Identifies the element (or elements) that labels the current element.
  * @see aria-describedby.
  */
  "aria-labelledby"?: string | undefined;
  /** Defines the hierarchical level of an element within a structure. */
  "aria-level"?: Numberish | undefined;
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  "aria-live"?: "off" | "assertive" | "polite" | undefined;
  /** Indicates whether an element is modal when displayed. */
  "aria-modal"?: Booleanish | undefined;
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  "aria-multiline"?: Booleanish | undefined;
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  "aria-multiselectable"?: Booleanish | undefined;
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  "aria-orientation"?: "horizontal" | "vertical" | undefined;
  /**
  * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
  * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
  * @see aria-controls.
  */
  "aria-owns"?: string | undefined;
  /**
  * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
  * A hint could be a sample value or a brief description of the expected format.
  */
  "aria-placeholder"?: string | undefined;
  /**
  * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
  * @see aria-setsize.
  */
  "aria-posinset"?: Numberish | undefined;
  /**
  * Indicates the current "pressed" state of toggle buttons.
  * @see aria-checked @see aria-selected.
  */
  "aria-pressed"?: Booleanish | "mixed" | undefined;
  /**
  * Indicates that the element is not editable, but is otherwise operable.
  * @see aria-disabled.
  */
  "aria-readonly"?: Booleanish | undefined;
  /**
  * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
  * @see aria-atomic.
  */
  "aria-relevant"?: "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals" | undefined;
  /** Indicates that user input is required on the element before a form may be submitted. */
  "aria-required"?: Booleanish | undefined;
  /** Defines a human-readable, author-localized description for the role of an element. */
  "aria-roledescription"?: string | undefined;
  /**
  * Defines the total number of rows in a table, grid, or treegrid.
  * @see aria-rowindex.
  */
  "aria-rowcount"?: Numberish | undefined;
  /**
  * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
  * @see aria-rowcount @see aria-rowspan.
  */
  "aria-rowindex"?: Numberish | undefined;
  /**
  * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
  * @see aria-rowindex @see aria-colspan.
  */
  "aria-rowspan"?: Numberish | undefined;
  /**
  * Indicates the current "selected" state of various widgets.
  * @see aria-checked @see aria-pressed.
  */
  "aria-selected"?: Booleanish | undefined;
  /**
  * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
  * @see aria-posinset.
  */
  "aria-setsize"?: Numberish | undefined;
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
  /** Defines the maximum allowed value for a range widget. */
  "aria-valuemax"?: Numberish | undefined;
  /** Defines the minimum allowed value for a range widget. */
  "aria-valuemin"?: Numberish | undefined;
  /**
  * Defines the current value for a range widget.
  * @see aria-valuetext.
  */
  "aria-valuenow"?: Numberish | undefined;
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  "aria-valuetext"?: string | undefined;
}
type StyleValue = false | null | undefined | string | CSSProperties | Array<StyleValue>;
type ClassValue = false | null | undefined | string | Record<string, any> | Array<ClassValue>;
interface HTMLAttributes extends AriaAttributes, EventHandlers<Events> {
  innerHTML?: string | undefined;
  class?: ClassValue | undefined;
  style?: StyleValue | undefined;
  accesskey?: string | undefined;
  contenteditable?: Booleanish | "inherit" | "plaintext-only" | undefined;
  contextmenu?: string | undefined;
  dir?: string | undefined;
  draggable?: Booleanish | undefined;
  enterkeyhint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined;
  /**
  * @deprecated Use `enterkeyhint` instead.
  */
  enterKeyHint?: HTMLAttributes["enterkeyhint"];
  hidden?: Booleanish | "" | "hidden" | "until-found" | undefined;
  id?: string | undefined;
  inert?: Booleanish | undefined;
  lang?: string | undefined;
  placeholder?: string | undefined;
  spellcheck?: Booleanish | undefined;
  tabindex?: Numberish | undefined;
  title?: string | undefined;
  translate?: "yes" | "no" | undefined;
  radiogroup?: string | undefined;
  role?: string | undefined;
  about?: string | undefined;
  datatype?: string | undefined;
  inlist?: any;
  prefix?: string | undefined;
  property?: string | undefined;
  resource?: string | undefined;
  typeof?: string | undefined;
  vocab?: string | undefined;
  autocapitalize?: string | undefined;
  autocorrect?: string | undefined;
  autosave?: string | undefined;
  color?: string | undefined;
  itemprop?: string | undefined;
  itemscope?: Booleanish | undefined;
  itemtype?: string | undefined;
  itemid?: string | undefined;
  itemref?: string | undefined;
  results?: Numberish | undefined;
  security?: string | undefined;
  unselectable?: "on" | "off" | undefined;
  /**
  * Hints at the type of data that might be entered by the user while editing the element or its contents
  * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
  */
  inputmode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
  /**
  * Specify that a standard HTML element should behave like a defined custom built-in element
  * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
  */
  is?: string | undefined;
  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts
  */
  exportparts?: string;
  /**
  * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part
  */
  part?: string;
}
type HTMLAttributeReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
interface AnchorHTMLAttributes extends HTMLAttributes {
  download?: any;
  href?: string | undefined;
  hreflang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  rel?: string | undefined;
  target?: string | undefined;
  type?: string | undefined;
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
}
interface AreaHTMLAttributes extends HTMLAttributes {
  alt?: string | undefined;
  coords?: string | undefined;
  download?: any;
  href?: string | undefined;
  hreflang?: string | undefined;
  media?: string | undefined;
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
  rel?: string | undefined;
  shape?: string | undefined;
  target?: string | undefined;
}
interface AudioHTMLAttributes extends MediaHTMLAttributes {}
interface BaseHTMLAttributes extends HTMLAttributes {
  href?: string | undefined;
  target?: string | undefined;
}
interface BlockquoteHTMLAttributes extends HTMLAttributes {
  cite?: string | undefined;
}
interface ButtonHTMLAttributes extends HTMLAttributes {
  autofocus?: Booleanish | undefined;
  disabled?: Booleanish | undefined;
  form?: string | undefined;
  formaction?: string | undefined;
  formenctype?: string | undefined;
  formmethod?: string | undefined;
  formnovalidate?: Booleanish | undefined;
  formtarget?: string | undefined;
  name?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
}
interface CanvasHTMLAttributes extends HTMLAttributes {
  height?: Numberish | undefined;
  width?: Numberish | undefined;
}
interface ColHTMLAttributes extends HTMLAttributes {
  span?: Numberish | undefined;
  width?: Numberish | undefined;
}
interface ColgroupHTMLAttributes extends HTMLAttributes {
  span?: Numberish | undefined;
}
interface DataHTMLAttributes extends HTMLAttributes {
  value?: string | ReadonlyArray<string> | number | undefined;
}
interface DetailsHTMLAttributes extends HTMLAttributes {
  name?: string | undefined;
  open?: Booleanish | undefined;
}
interface DelHTMLAttributes extends HTMLAttributes {
  cite?: string | undefined;
  datetime?: string | undefined;
}
interface DialogHTMLAttributes extends HTMLAttributes {
  open?: Booleanish | undefined;
  onClose?: ((payload: Event) => void) | undefined;
  onCancel?: ((payload: Event) => void) | undefined;
}
interface EmbedHTMLAttributes extends HTMLAttributes {
  height?: Numberish | undefined;
  src?: string | undefined;
  type?: string | undefined;
  width?: Numberish | undefined;
}
interface FieldsetHTMLAttributes extends HTMLAttributes {
  disabled?: Booleanish | undefined;
  form?: string | undefined;
  name?: string | undefined;
}
interface FormHTMLAttributes extends HTMLAttributes {
  acceptcharset?: string | undefined;
  action?: string | undefined;
  autocomplete?: string | undefined;
  enctype?: string | undefined;
  method?: string | undefined;
  name?: string | undefined;
  novalidate?: Booleanish | undefined;
  target?: string | undefined;
}
interface HtmlHTMLAttributes extends HTMLAttributes {
  manifest?: string | undefined;
}
interface IframeHTMLAttributes extends HTMLAttributes {
  allow?: string | undefined;
  allowfullscreen?: Booleanish | undefined;
  allowtransparency?: Booleanish | undefined;
  /** @deprecated */
  frameborder?: Numberish | undefined;
  height?: Numberish | undefined;
  loading?: "eager" | "lazy" | undefined;
  /** @deprecated */
  marginheight?: Numberish | undefined;
  /** @deprecated */
  marginwidth?: Numberish | undefined;
  name?: string | undefined;
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
  sandbox?: string | undefined;
  /** @deprecated */
  scrolling?: string | undefined;
  seamless?: Booleanish | undefined;
  src?: string | undefined;
  srcdoc?: string | undefined;
  width?: Numberish | undefined;
}
interface ImgHTMLAttributes extends HTMLAttributes {
  alt?: string | undefined;
  crossorigin?: "anonymous" | "use-credentials" | "" | undefined;
  decoding?: "async" | "auto" | "sync" | undefined;
  fetchpriority?: "high" | "low" | "auto" | undefined;
  height?: Numberish | undefined;
  loading?: "eager" | "lazy" | undefined;
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcset?: string | undefined;
  usemap?: string | undefined;
  width?: Numberish | undefined;
}
interface InsHTMLAttributes extends HTMLAttributes {
  cite?: string | undefined;
  datetime?: string | undefined;
}
type InputTypeHTMLAttribute = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week" | (string & {});
type AutoFillAddressKind = "billing" | "shipping";
type AutoFillBase = "" | "off" | "on";
type AutoFillContactField = "email" | "tel" | "tel-area-code" | "tel-country-code" | "tel-extension" | "tel-local" | "tel-local-prefix" | "tel-local-suffix" | "tel-national";
type AutoFillContactKind = "home" | "mobile" | "work";
type AutoFillCredentialField = "webauthn";
type AutoFillNormalField = "additional-name" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "address-line1" | "address-line2" | "address-line3" | "bday-day" | "bday-month" | "bday-year" | "cc-csc" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-family-name" | "cc-given-name" | "cc-name" | "cc-number" | "cc-type" | "country" | "country-name" | "current-password" | "family-name" | "given-name" | "honorific-prefix" | "honorific-suffix" | "name" | "new-password" | "one-time-code" | "organization" | "postal-code" | "street-address" | "transaction-amount" | "transaction-currency" | "username";
type OptionalPrefixToken<T extends string> = `${T} ` | "";
type OptionalPostfixToken<T extends string> = ` ${T}` | "";
type AutoFillField = AutoFillNormalField | `${OptionalPrefixToken<AutoFillContactKind>}${AutoFillContactField}`;
type AutoFillSection = `section-${string}`;
type AutoFill = AutoFillBase | `${OptionalPrefixToken<AutoFillSection>}${OptionalPrefixToken<AutoFillAddressKind>}${AutoFillField}${OptionalPostfixToken<AutoFillCredentialField>}`;
type InputAutoCompleteAttribute = AutoFill | (string & {});
interface InputHTMLAttributes extends HTMLAttributes {
  accept?: string | undefined;
  alt?: string | undefined;
  autocomplete?: InputAutoCompleteAttribute | undefined;
  autofocus?: Booleanish | undefined;
  capture?: boolean | "user" | "environment" | undefined;
  checked?: Booleanish | any[] | Set<any> | undefined;
  crossorigin?: string | undefined;
  disabled?: Booleanish | undefined;
  form?: string | undefined;
  formaction?: string | undefined;
  formenctype?: string | undefined;
  formmethod?: string | undefined;
  formnovalidate?: Booleanish | undefined;
  formtarget?: string | undefined;
  height?: Numberish | undefined;
  indeterminate?: boolean | undefined;
  list?: string | undefined;
  max?: Numberish | undefined;
  maxlength?: Numberish | undefined;
  min?: Numberish | undefined;
  minlength?: Numberish | undefined;
  multiple?: Booleanish | undefined;
  name?: string | undefined;
  pattern?: string | undefined;
  placeholder?: string | undefined;
  readonly?: Booleanish | undefined;
  required?: Booleanish | undefined;
  size?: Numberish | undefined;
  src?: string | undefined;
  step?: Numberish | undefined;
  type?: InputTypeHTMLAttribute | undefined;
  value?: any;
  width?: Numberish | undefined;
  onCancel?: ((payload: Event) => void) | undefined;
}
interface KeygenHTMLAttributes extends HTMLAttributes {
  autofocus?: Booleanish | undefined;
  challenge?: string | undefined;
  disabled?: Booleanish | undefined;
  form?: string | undefined;
  keytype?: string | undefined;
  keyparams?: string | undefined;
  name?: string | undefined;
}
interface LabelHTMLAttributes extends HTMLAttributes {
  for?: string | undefined;
  form?: string | undefined;
}
interface LiHTMLAttributes extends HTMLAttributes {
  value?: string | ReadonlyArray<string> | number | undefined;
}
interface LinkHTMLAttributes extends HTMLAttributes {
  as?: string | undefined;
  crossorigin?: string | undefined;
  href?: string | undefined;
  hreflang?: string | undefined;
  integrity?: string | undefined;
  media?: string | undefined;
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
  rel?: string | undefined;
  sizes?: string | undefined;
  type?: string | undefined;
  charset?: string | undefined;
}
interface MapHTMLAttributes extends HTMLAttributes {
  name?: string | undefined;
}
interface MenuHTMLAttributes extends HTMLAttributes {
  type?: string | undefined;
}
interface MediaHTMLAttributes extends HTMLAttributes {
  autoplay?: Booleanish | undefined;
  controls?: Booleanish | undefined;
  controlslist?: string | undefined;
  crossorigin?: string | undefined;
  loop?: Booleanish | undefined;
  mediagroup?: string | undefined;
  muted?: Booleanish | undefined;
  playsinline?: Booleanish | undefined;
  preload?: string | undefined;
  src?: string | undefined;
}
interface MetaHTMLAttributes extends HTMLAttributes {
  charset?: string | undefined;
  content?: string | undefined;
  httpequiv?: string | undefined;
  name?: string | undefined;
}
interface MeterHTMLAttributes extends HTMLAttributes {
  form?: string | undefined;
  high?: Numberish | undefined;
  low?: Numberish | undefined;
  max?: Numberish | undefined;
  min?: Numberish | undefined;
  optimum?: Numberish | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
}
interface QuoteHTMLAttributes extends HTMLAttributes {
  cite?: string | undefined;
}
interface ObjectHTMLAttributes extends HTMLAttributes {
  classid?: string | undefined;
  data?: string | undefined;
  form?: string | undefined;
  height?: Numberish | undefined;
  name?: string | undefined;
  type?: string | undefined;
  usemap?: string | undefined;
  width?: Numberish | undefined;
  wmode?: string | undefined;
}
interface OlHTMLAttributes extends HTMLAttributes {
  reversed?: Booleanish | undefined;
  start?: Numberish | undefined;
  type?: "1" | "a" | "A" | "i" | "I" | undefined;
}
interface OptgroupHTMLAttributes extends HTMLAttributes {
  disabled?: Booleanish | undefined;
  label?: string | undefined;
}
interface OptionHTMLAttributes extends HTMLAttributes {
  disabled?: Booleanish | undefined;
  label?: string | undefined;
  selected?: Booleanish | undefined;
  value?: any;
}
interface OutputHTMLAttributes extends HTMLAttributes {
  for?: string | undefined;
  form?: string | undefined;
  name?: string | undefined;
}
interface ParamHTMLAttributes extends HTMLAttributes {
  name?: string | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
}
interface ProgressHTMLAttributes extends HTMLAttributes {
  max?: Numberish | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
}
interface ScriptHTMLAttributes extends HTMLAttributes {
  async?: Booleanish | undefined;
  /** @deprecated */
  charset?: string | undefined;
  crossorigin?: string | undefined;
  defer?: Booleanish | undefined;
  integrity?: string | undefined;
  nomodule?: Booleanish | undefined;
  referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
  nonce?: string | undefined;
  src?: string | undefined;
  type?: string | undefined;
}
interface SelectHTMLAttributes extends HTMLAttributes {
  autocomplete?: string | undefined;
  autofocus?: Booleanish | undefined;
  disabled?: Booleanish | undefined;
  form?: string | undefined;
  multiple?: Booleanish | undefined;
  name?: string | undefined;
  required?: Booleanish | undefined;
  size?: Numberish | undefined;
  value?: any;
}
interface SourceHTMLAttributes extends HTMLAttributes {
  media?: string | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcset?: string | undefined;
  type?: string | undefined;
}
interface StyleHTMLAttributes extends HTMLAttributes {
  media?: string | undefined;
  nonce?: string | undefined;
  scoped?: Booleanish | undefined;
  type?: string | undefined;
}
interface TableHTMLAttributes extends HTMLAttributes {
  cellpadding?: Numberish | undefined;
  cellspacing?: Numberish | undefined;
  summary?: string | undefined;
  width?: Numberish | undefined;
}
interface TextareaHTMLAttributes extends HTMLAttributes {
  autocomplete?: string | undefined;
  autofocus?: Booleanish | undefined;
  cols?: Numberish | undefined;
  dirname?: string | undefined;
  disabled?: Booleanish | undefined;
  form?: string | undefined;
  maxlength?: Numberish | undefined;
  minlength?: Numberish | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  readonly?: Booleanish | undefined;
  required?: Booleanish | undefined;
  rows?: Numberish | undefined;
  value?: string | ReadonlyArray<string> | number | null | undefined;
  wrap?: string | undefined;
}
interface TdHTMLAttributes extends HTMLAttributes {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined;
  colspan?: Numberish | undefined;
  headers?: string | undefined;
  rowspan?: Numberish | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
  height?: Numberish | undefined;
  width?: Numberish | undefined;
  valign?: "top" | "middle" | "bottom" | "baseline" | undefined;
}
interface ThHTMLAttributes extends HTMLAttributes {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined;
  colspan?: Numberish | undefined;
  headers?: string | undefined;
  rowspan?: Numberish | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
}
interface TimeHTMLAttributes extends HTMLAttributes {
  datetime?: string | undefined;
}
interface TrackHTMLAttributes extends HTMLAttributes {
  default?: Booleanish | undefined;
  kind?: string | undefined;
  label?: string | undefined;
  src?: string | undefined;
  srclang?: string | undefined;
}
interface VideoHTMLAttributes extends MediaHTMLAttributes {
  height?: Numberish | undefined;
  playsinline?: Booleanish | undefined;
  poster?: string | undefined;
  width?: Numberish | undefined;
  disablePictureInPicture?: Booleanish | undefined;
  disableRemotePlayback?: Booleanish | undefined;
}
interface WebViewHTMLAttributes extends HTMLAttributes {
  allowfullscreen?: Booleanish | undefined;
  allowpopups?: Booleanish | undefined;
  autoFocus?: Booleanish | undefined;
  autosize?: Booleanish | undefined;
  blinkfeatures?: string | undefined;
  disableblinkfeatures?: string | undefined;
  disableguestresize?: Booleanish | undefined;
  disablewebsecurity?: Booleanish | undefined;
  guestinstance?: string | undefined;
  httpreferrer?: string | undefined;
  nodeintegration?: Booleanish | undefined;
  partition?: string | undefined;
  plugins?: Booleanish | undefined;
  preload?: string | undefined;
  src?: string | undefined;
  useragent?: string | undefined;
  webpreferences?: string | undefined;
}
interface SVGAttributes extends AriaAttributes, EventHandlers<Events> {
  innerHTML?: string | undefined;
  /**
  * SVG Styling Attributes
  * @see https://www.w3.org/TR/SVG/styling.html#ElementSpecificStyling
  */
  class?: ClassValue | undefined;
  style?: StyleValue | undefined;
  color?: string | undefined;
  height?: Numberish | undefined;
  id?: string | undefined;
  lang?: string | undefined;
  max?: Numberish | undefined;
  media?: string | undefined;
  method?: string | undefined;
  min?: Numberish | undefined;
  name?: string | undefined;
  target?: string | undefined;
  type?: string | undefined;
  width?: Numberish | undefined;
  role?: string | undefined;
  tabindex?: Numberish | undefined;
  crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
  "accent-height"?: Numberish | undefined;
  accumulate?: "none" | "sum" | undefined;
  additive?: "replace" | "sum" | undefined;
  "alignment-baseline"?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit" | undefined;
  allowReorder?: "no" | "yes" | undefined;
  alphabetic?: Numberish | undefined;
  amplitude?: Numberish | undefined;
  "arabic-form"?: "initial" | "medial" | "terminal" | "isolated" | undefined;
  ascent?: Numberish | undefined;
  attributeName?: string | undefined;
  attributeType?: string | undefined;
  autoReverse?: Numberish | undefined;
  azimuth?: Numberish | undefined;
  baseFrequency?: Numberish | undefined;
  "baseline-shift"?: Numberish | undefined;
  baseProfile?: Numberish | undefined;
  bbox?: Numberish | undefined;
  begin?: Numberish | undefined;
  bias?: Numberish | undefined;
  by?: Numberish | undefined;
  calcMode?: Numberish | undefined;
  "cap-height"?: Numberish | undefined;
  clip?: Numberish | undefined;
  "clip-path"?: string | undefined;
  clipPathUnits?: Numberish | undefined;
  "clip-rule"?: Numberish | undefined;
  "color-interpolation"?: Numberish | undefined;
  "color-interpolation-filters"?: "auto" | "sRGB" | "linearRGB" | "inherit" | undefined;
  "color-profile"?: Numberish | undefined;
  "color-rendering"?: Numberish | undefined;
  contentScriptType?: Numberish | undefined;
  contentStyleType?: Numberish | undefined;
  cursor?: Numberish | undefined;
  cx?: Numberish | undefined;
  cy?: Numberish | undefined;
  d?: string | undefined;
  decelerate?: Numberish | undefined;
  descent?: Numberish | undefined;
  diffuseConstant?: Numberish | undefined;
  direction?: Numberish | undefined;
  display?: Numberish | undefined;
  divisor?: Numberish | undefined;
  "dominant-baseline"?: Numberish | undefined;
  dur?: Numberish | undefined;
  dx?: Numberish | undefined;
  dy?: Numberish | undefined;
  edgeMode?: Numberish | undefined;
  elevation?: Numberish | undefined;
  "enable-background"?: Numberish | undefined;
  end?: Numberish | undefined;
  exponent?: Numberish | undefined;
  externalResourcesRequired?: Numberish | undefined;
  fill?: string | undefined;
  "fill-opacity"?: Numberish | undefined;
  "fill-rule"?: "nonzero" | "evenodd" | "inherit" | undefined;
  filter?: string | undefined;
  filterRes?: Numberish | undefined;
  filterUnits?: Numberish | undefined;
  "flood-color"?: Numberish | undefined;
  "flood-opacity"?: Numberish | undefined;
  focusable?: Numberish | undefined;
  "font-family"?: string | undefined;
  "font-size"?: Numberish | undefined;
  "font-size-adjust"?: Numberish | undefined;
  "font-stretch"?: Numberish | undefined;
  "font-style"?: Numberish | undefined;
  "font-variant"?: Numberish | undefined;
  "font-weight"?: Numberish | undefined;
  format?: Numberish | undefined;
  from?: Numberish | undefined;
  fx?: Numberish | undefined;
  fy?: Numberish | undefined;
  g1?: Numberish | undefined;
  g2?: Numberish | undefined;
  "glyph-name"?: Numberish | undefined;
  "glyph-orientation-horizontal"?: Numberish | undefined;
  "glyph-orientation-vertical"?: Numberish | undefined;
  glyphRef?: Numberish | undefined;
  gradientTransform?: string | undefined;
  gradientUnits?: string | undefined;
  hanging?: Numberish | undefined;
  "horiz-adv-x"?: Numberish | undefined;
  "horiz-origin-x"?: Numberish | undefined;
  href?: string | undefined;
  ideographic?: Numberish | undefined;
  "image-rendering"?: Numberish | undefined;
  in2?: Numberish | undefined;
  in?: string | undefined;
  intercept?: Numberish | undefined;
  k1?: Numberish | undefined;
  k2?: Numberish | undefined;
  k3?: Numberish | undefined;
  k4?: Numberish | undefined;
  k?: Numberish | undefined;
  kernelMatrix?: Numberish | undefined;
  kernelUnitLength?: Numberish | undefined;
  kerning?: Numberish | undefined;
  keyPoints?: Numberish | undefined;
  keySplines?: Numberish | undefined;
  keyTimes?: Numberish | undefined;
  lengthAdjust?: Numberish | undefined;
  "letter-spacing"?: Numberish | undefined;
  "lighting-color"?: Numberish | undefined;
  limitingConeAngle?: Numberish | undefined;
  local?: Numberish | undefined;
  "marker-end"?: string | undefined;
  markerHeight?: Numberish | undefined;
  "marker-mid"?: string | undefined;
  "marker-start"?: string | undefined;
  markerUnits?: Numberish | undefined;
  markerWidth?: Numberish | undefined;
  mask?: string | undefined;
  maskContentUnits?: Numberish | undefined;
  maskUnits?: Numberish | undefined;
  mathematical?: Numberish | undefined;
  mode?: Numberish | undefined;
  numOctaves?: Numberish | undefined;
  offset?: Numberish | undefined;
  opacity?: Numberish | undefined;
  operator?: Numberish | undefined;
  order?: Numberish | undefined;
  orient?: Numberish | undefined;
  orientation?: Numberish | undefined;
  origin?: Numberish | undefined;
  overflow?: Numberish | undefined;
  "overline-position"?: Numberish | undefined;
  "overline-thickness"?: Numberish | undefined;
  "paint-order"?: Numberish | undefined;
  "panose-1"?: Numberish | undefined;
  pathLength?: Numberish | undefined;
  patternContentUnits?: string | undefined;
  patternTransform?: Numberish | undefined;
  patternUnits?: string | undefined;
  "pointer-events"?: Numberish | undefined;
  points?: string | undefined;
  pointsAtX?: Numberish | undefined;
  pointsAtY?: Numberish | undefined;
  pointsAtZ?: Numberish | undefined;
  preserveAlpha?: Numberish | undefined;
  preserveAspectRatio?: string | undefined;
  primitiveUnits?: Numberish | undefined;
  r?: Numberish | undefined;
  radius?: Numberish | undefined;
  refX?: Numberish | undefined;
  refY?: Numberish | undefined;
  renderingIntent?: Numberish | undefined;
  repeatCount?: Numberish | undefined;
  repeatDur?: Numberish | undefined;
  requiredExtensions?: Numberish | undefined;
  requiredFeatures?: Numberish | undefined;
  restart?: Numberish | undefined;
  result?: string | undefined;
  rotate?: Numberish | undefined;
  rx?: Numberish | undefined;
  ry?: Numberish | undefined;
  scale?: Numberish | undefined;
  seed?: Numberish | undefined;
  "shape-rendering"?: Numberish | undefined;
  slope?: Numberish | undefined;
  spacing?: Numberish | undefined;
  specularConstant?: Numberish | undefined;
  specularExponent?: Numberish | undefined;
  speed?: Numberish | undefined;
  spreadMethod?: string | undefined;
  startOffset?: Numberish | undefined;
  stdDeviation?: Numberish | undefined;
  stemh?: Numberish | undefined;
  stemv?: Numberish | undefined;
  stitchTiles?: Numberish | undefined;
  "stop-color"?: string | undefined;
  "stop-opacity"?: Numberish | undefined;
  "strikethrough-position"?: Numberish | undefined;
  "strikethrough-thickness"?: Numberish | undefined;
  string?: Numberish | undefined;
  stroke?: string | undefined;
  "stroke-dasharray"?: Numberish | undefined;
  "stroke-dashoffset"?: Numberish | undefined;
  "stroke-linecap"?: "butt" | "round" | "square" | "inherit" | undefined;
  "stroke-linejoin"?: "miter" | "round" | "bevel" | "inherit" | undefined;
  "stroke-miterlimit"?: Numberish | undefined;
  "stroke-opacity"?: Numberish | undefined;
  "stroke-width"?: Numberish | undefined;
  surfaceScale?: Numberish | undefined;
  systemLanguage?: Numberish | undefined;
  tableValues?: Numberish | undefined;
  targetX?: Numberish | undefined;
  targetY?: Numberish | undefined;
  "text-anchor"?: string | undefined;
  "text-decoration"?: Numberish | undefined;
  textLength?: Numberish | undefined;
  "text-rendering"?: Numberish | undefined;
  to?: Numberish | undefined;
  transform?: string | undefined;
  u1?: Numberish | undefined;
  u2?: Numberish | undefined;
  "underline-position"?: Numberish | undefined;
  "underline-thickness"?: Numberish | undefined;
  unicode?: Numberish | undefined;
  "unicode-bidi"?: Numberish | undefined;
  "unicode-range"?: Numberish | undefined;
  "unitsPer-em"?: Numberish | undefined;
  "v-alphabetic"?: Numberish | undefined;
  values?: string | undefined;
  "vector-effect"?: Numberish | undefined;
  version?: string | undefined;
  "vert-adv-y"?: Numberish | undefined;
  "vert-origin-x"?: Numberish | undefined;
  "vert-origin-y"?: Numberish | undefined;
  "v-hanging"?: Numberish | undefined;
  "v-ideographic"?: Numberish | undefined;
  viewBox?: string | undefined;
  viewTarget?: Numberish | undefined;
  visibility?: Numberish | undefined;
  "v-mathematical"?: Numberish | undefined;
  widths?: Numberish | undefined;
  "word-spacing"?: Numberish | undefined;
  "writing-mode"?: Numberish | undefined;
  x1?: Numberish | undefined;
  x2?: Numberish | undefined;
  x?: Numberish | undefined;
  xChannelSelector?: string | undefined;
  "x-height"?: Numberish | undefined;
  xlinkActuate?: string | undefined;
  xlinkArcrole?: string | undefined;
  xlinkHref?: string | undefined;
  xlinkRole?: string | undefined;
  xlinkShow?: string | undefined;
  xlinkTitle?: string | undefined;
  xlinkType?: string | undefined;
  xmlns?: string | undefined;
  xmlnsXlink?: string | undefined;
  y1?: Numberish | undefined;
  y2?: Numberish | undefined;
  y?: Numberish | undefined;
  yChannelSelector?: string | undefined;
  z?: Numberish | undefined;
  zoomAndPan?: string | undefined;
}
interface IntrinsicElementAttributes {
  a: AnchorHTMLAttributes;
  abbr: HTMLAttributes;
  address: HTMLAttributes;
  area: AreaHTMLAttributes;
  article: HTMLAttributes;
  aside: HTMLAttributes;
  audio: AudioHTMLAttributes;
  b: HTMLAttributes;
  base: BaseHTMLAttributes;
  bdi: HTMLAttributes;
  bdo: HTMLAttributes;
  blockquote: BlockquoteHTMLAttributes;
  body: HTMLAttributes;
  br: HTMLAttributes;
  button: ButtonHTMLAttributes;
  canvas: CanvasHTMLAttributes;
  caption: HTMLAttributes;
  cite: HTMLAttributes;
  code: HTMLAttributes;
  col: ColHTMLAttributes;
  colgroup: ColgroupHTMLAttributes;
  data: DataHTMLAttributes;
  datalist: HTMLAttributes;
  dd: HTMLAttributes;
  del: DelHTMLAttributes;
  details: DetailsHTMLAttributes;
  dfn: HTMLAttributes;
  dialog: DialogHTMLAttributes;
  div: HTMLAttributes;
  dl: HTMLAttributes;
  dt: HTMLAttributes;
  em: HTMLAttributes;
  embed: EmbedHTMLAttributes;
  fieldset: FieldsetHTMLAttributes;
  figcaption: HTMLAttributes;
  figure: HTMLAttributes;
  footer: HTMLAttributes;
  form: FormHTMLAttributes;
  h1: HTMLAttributes;
  h2: HTMLAttributes;
  h3: HTMLAttributes;
  h4: HTMLAttributes;
  h5: HTMLAttributes;
  h6: HTMLAttributes;
  head: HTMLAttributes;
  header: HTMLAttributes;
  hgroup: HTMLAttributes;
  hr: HTMLAttributes;
  html: HtmlHTMLAttributes;
  i: HTMLAttributes;
  iframe: IframeHTMLAttributes;
  img: ImgHTMLAttributes;
  input: InputHTMLAttributes;
  ins: InsHTMLAttributes;
  kbd: HTMLAttributes;
  keygen: KeygenHTMLAttributes;
  label: LabelHTMLAttributes;
  legend: HTMLAttributes;
  li: LiHTMLAttributes;
  link: LinkHTMLAttributes;
  main: HTMLAttributes;
  map: MapHTMLAttributes;
  mark: HTMLAttributes;
  menu: MenuHTMLAttributes;
  meta: MetaHTMLAttributes;
  meter: MeterHTMLAttributes;
  nav: HTMLAttributes;
  noindex: HTMLAttributes;
  noscript: HTMLAttributes;
  object: ObjectHTMLAttributes;
  ol: OlHTMLAttributes;
  optgroup: OptgroupHTMLAttributes;
  option: OptionHTMLAttributes;
  output: OutputHTMLAttributes;
  p: HTMLAttributes;
  param: ParamHTMLAttributes;
  picture: HTMLAttributes;
  pre: HTMLAttributes;
  progress: ProgressHTMLAttributes;
  q: QuoteHTMLAttributes;
  rp: HTMLAttributes;
  rt: HTMLAttributes;
  ruby: HTMLAttributes;
  s: HTMLAttributes;
  samp: HTMLAttributes;
  script: ScriptHTMLAttributes;
  section: HTMLAttributes;
  select: SelectHTMLAttributes;
  small: HTMLAttributes;
  source: SourceHTMLAttributes;
  span: HTMLAttributes;
  strong: HTMLAttributes;
  style: StyleHTMLAttributes;
  sub: HTMLAttributes;
  summary: HTMLAttributes;
  sup: HTMLAttributes;
  table: TableHTMLAttributes;
  template: HTMLAttributes;
  tbody: HTMLAttributes;
  td: TdHTMLAttributes;
  textarea: TextareaHTMLAttributes;
  tfoot: HTMLAttributes;
  th: ThHTMLAttributes;
  thead: HTMLAttributes;
  time: TimeHTMLAttributes;
  title: HTMLAttributes;
  tr: HTMLAttributes;
  track: TrackHTMLAttributes;
  u: HTMLAttributes;
  ul: HTMLAttributes;
  var: HTMLAttributes;
  video: VideoHTMLAttributes;
  wbr: HTMLAttributes;
  webview: WebViewHTMLAttributes;
  svg: SVGAttributes;
  animate: SVGAttributes;
  animateMotion: SVGAttributes;
  animateTransform: SVGAttributes;
  circle: SVGAttributes;
  clipPath: SVGAttributes;
  defs: SVGAttributes;
  desc: SVGAttributes;
  ellipse: SVGAttributes;
  feBlend: SVGAttributes;
  feColorMatrix: SVGAttributes;
  feComponentTransfer: SVGAttributes;
  feComposite: SVGAttributes;
  feConvolveMatrix: SVGAttributes;
  feDiffuseLighting: SVGAttributes;
  feDisplacementMap: SVGAttributes;
  feDistantLight: SVGAttributes;
  feDropShadow: SVGAttributes;
  feFlood: SVGAttributes;
  feFuncA: SVGAttributes;
  feFuncB: SVGAttributes;
  feFuncG: SVGAttributes;
  feFuncR: SVGAttributes;
  feGaussianBlur: SVGAttributes;
  feImage: SVGAttributes;
  feMerge: SVGAttributes;
  feMergeNode: SVGAttributes;
  feMorphology: SVGAttributes;
  feOffset: SVGAttributes;
  fePointLight: SVGAttributes;
  feSpecularLighting: SVGAttributes;
  feSpotLight: SVGAttributes;
  feTile: SVGAttributes;
  feTurbulence: SVGAttributes;
  filter: SVGAttributes;
  foreignObject: SVGAttributes;
  g: SVGAttributes;
  image: SVGAttributes;
  line: SVGAttributes;
  linearGradient: SVGAttributes;
  marker: SVGAttributes;
  mask: SVGAttributes;
  metadata: SVGAttributes;
  mpath: SVGAttributes;
  path: SVGAttributes;
  pattern: SVGAttributes;
  polygon: SVGAttributes;
  polyline: SVGAttributes;
  radialGradient: SVGAttributes;
  rect: SVGAttributes;
  set: SVGAttributes;
  stop: SVGAttributes;
  switch: SVGAttributes;
  symbol: SVGAttributes;
  text: SVGAttributes;
  textPath: SVGAttributes;
  tspan: SVGAttributes;
  use: SVGAttributes;
  view: SVGAttributes;
}
interface Events {
  onCopy: ClipboardEvent;
  onCut: ClipboardEvent;
  onPaste: ClipboardEvent;
  onCompositionend: CompositionEvent;
  onCompositionstart: CompositionEvent;
  onCompositionupdate: CompositionEvent;
  onDrag: DragEvent;
  onDragend: DragEvent;
  onDragenter: DragEvent;
  onDragexit: DragEvent;
  onDragleave: DragEvent;
  onDragover: DragEvent;
  onDragstart: DragEvent;
  onDrop: DragEvent;
  onFocus: FocusEvent;
  onFocusin: FocusEvent;
  onFocusout: FocusEvent;
  onBlur: FocusEvent;
  onChange: Event;
  onBeforeinput: InputEvent;
  onFormdata: FormDataEvent;
  onInput: InputEvent;
  onReset: Event;
  onSubmit: SubmitEvent;
  onInvalid: Event;
  onFullscreenchange: Event;
  onFullscreenerror: Event;
  onLoad: Event;
  onError: Event;
  onKeydown: KeyboardEvent;
  onKeypress: KeyboardEvent;
  onKeyup: KeyboardEvent;
  onDblclick: MouseEvent;
  onMousedown: MouseEvent;
  onMouseenter: MouseEvent;
  onMouseleave: MouseEvent;
  onMousemove: MouseEvent;
  onMouseout: MouseEvent;
  onMouseover: MouseEvent;
  onMouseup: MouseEvent;
  onAbort: UIEvent;
  onCanplay: Event;
  onCanplaythrough: Event;
  onDurationchange: Event;
  onEmptied: Event;
  onEncrypted: MediaEncryptedEvent;
  onEnded: Event;
  onLoadeddata: Event;
  onLoadedmetadata: Event;
  onLoadstart: Event;
  onPause: Event;
  onPlay: Event;
  onPlaying: Event;
  onProgress: ProgressEvent;
  onRatechange: Event;
  onSeeked: Event;
  onSeeking: Event;
  onStalled: Event;
  onSuspend: Event;
  onTimeupdate: Event;
  onVolumechange: Event;
  onWaiting: Event;
  onSelect: Event;
  onScroll: Event;
  onScrollend: Event;
  onTouchcancel: TouchEvent;
  onTouchend: TouchEvent;
  onTouchmove: TouchEvent;
  onTouchstart: TouchEvent;
  onAuxclick: PointerEvent;
  onClick: PointerEvent;
  onContextmenu: PointerEvent;
  onGotpointercapture: PointerEvent;
  onLostpointercapture: PointerEvent;
  onPointerdown: PointerEvent;
  onPointermove: PointerEvent;
  onPointerup: PointerEvent;
  onPointercancel: PointerEvent;
  onPointerenter: PointerEvent;
  onPointerleave: PointerEvent;
  onPointerover: PointerEvent;
  onPointerout: PointerEvent;
  onBeforetoggle: ToggleEvent;
  onToggle: ToggleEvent;
  onWheel: WheelEvent;
  onAnimationcancel: AnimationEvent;
  onAnimationstart: AnimationEvent;
  onAnimationend: AnimationEvent;
  onAnimationiteration: AnimationEvent;
  onSecuritypolicyviolation: SecurityPolicyViolationEvent;
  onTransitioncancel: TransitionEvent;
  onTransitionend: TransitionEvent;
  onTransitionrun: TransitionEvent;
  onTransitionstart: TransitionEvent;
}
type EventHandlers<E> = { [K in keyof E]?: E[K] extends ((...args: any) => any) ? E[K] : (payload: E[K]) => void };
interface ReservedProps$1 {
  key?: PropertyKey | undefined;
  ref?: VNodeRef | undefined;
  ref_for?: boolean | undefined;
  ref_key?: string | undefined;
}
type NativeElements = { [K in keyof IntrinsicElementAttributes]: IntrinsicElementAttributes[K] & ReservedProps$1 };
//#endregion
//#region packages/runtime-dom/src/modules/style.d.ts
type Style = string | null | undefined | Record<string, unknown>;
declare function patchStyle(el: Element, prev: Style, next: Style): void;
//#endregion
//#region packages/runtime-dom/src/modules/attrs.d.ts
declare const xlinkNS = "http://www.w3.org/1999/xlink";
declare namespace index_d_exports$1 {
  export { AnchorHTMLAttributes, AreaHTMLAttributes, AriaAttributes, AudioHTMLAttributes, BaseHTMLAttributes, BlockquoteHTMLAttributes, ButtonHTMLAttributes, CSSProperties, CanvasHTMLAttributes, ClassValue, ColHTMLAttributes, ColgroupHTMLAttributes, CustomElementOptions$1 as CustomElementOptions, DataHTMLAttributes, DelHTMLAttributes, DetailsHTMLAttributes, DialogHTMLAttributes, ElementWithTransition, EmbedHTMLAttributes, Events, FieldsetHTMLAttributes, FormHTMLAttributes, HTMLAttributes, HtmlHTMLAttributes, IframeHTMLAttributes, ImgHTMLAttributes, InputAutoCompleteAttribute, InputHTMLAttributes, InputTypeHTMLAttribute, InsHTMLAttributes, IntrinsicElementAttributes, KeygenHTMLAttributes, LabelHTMLAttributes, LiHTMLAttributes, LinkHTMLAttributes, MapHTMLAttributes, MediaHTMLAttributes, MenuHTMLAttributes, MetaHTMLAttributes, MeterHTMLAttributes, NativeElements, ObjectHTMLAttributes, OlHTMLAttributes, OptgroupHTMLAttributes, OptionHTMLAttributes, OutputHTMLAttributes, ParamHTMLAttributes, ProgressHTMLAttributes, QuoteHTMLAttributes, ReservedProps$1 as ReservedProps, SVGAttributes, ScriptHTMLAttributes, SelectHTMLAttributes, SourceHTMLAttributes, StyleHTMLAttributes, StyleValue, TableHTMLAttributes, TdHTMLAttributes, TextareaHTMLAttributes, ThHTMLAttributes, TimeHTMLAttributes, TrackHTMLAttributes, Transition, TransitionGroup, TransitionGroupProps$1 as TransitionGroupProps, TransitionProps$1 as TransitionProps, TransitionPropsValidators, VShowElement, VideoHTMLAttributes, VueElement, VueElementBase$1 as VueElementBase, VueElementConstructor, WebViewHTMLAttributes, baseApplyTranslation, baseUseCssVars, callPendingCbs, createApp, createSSRApp, defineCustomElement, defineSSRCustomElement, ensureHydrationRenderer, ensureRenderer, forceReflow, handleMovedChildren, hasCSSTransform, hydrate, initDirectivesForSSR, nodeOps, normalizeContainer, patchProp, patchStyle, render, resolveTransitionProps, setVarsOnNode, shouldSetAsProp, svgNS, unsafeToTrustedHTML, useCssModule, useCssVars, useHost, useShadowRoot, vModelCheckbox, vModelCheckboxInit, vModelCheckboxUpdate, vModelDynamic, getValue as vModelGetValue, vModelRadio, vModelSelect, vModelSelectInit, vModelSetSelected, vModelText, vModelTextInit, vModelTextUpdate, vShow, vShowHidden, vShowOriginalDisplay, withKeys, withModifiers, xlinkNS };
}
import * as import__vue_runtime_core from "@vue/runtime-core";
/**
* This is a stub implementation to prevent the need to use dom types.
*
* To enable proper types, add `"dom"` to `"lib"` in your `tsconfig.json`.
*/
type DomType<T> = typeof globalThis extends {
  window: unknown;
} ? T : never;
declare module "@vue/reactivity" {
  interface RefUnwrapBailTypes {
    runtimeDOMBailTypes: DomType<Node | Window>;
  }
}
declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Transition: DefineComponent<TransitionProps$1>;
    TransitionGroup: DefineComponent<TransitionGroupProps$1>;
  }
  interface GlobalDirectives {
    vShow: typeof vShow;
    vOn: VOnDirective;
    vBind: VModelDirective;
    vIf: Directive<any, boolean>;
    vOnce: Directive;
    vSlot: Directive;
  }
}
declare function ensureRenderer(): Renderer<Element | ShadowRoot>;
declare function ensureHydrationRenderer(): HydrationRenderer;
declare const render: RootRenderFunction<Element | ShadowRoot>;
declare const hydrate: RootHydrateFunction;
declare const createApp: CreateAppFunction<Element, Component>;
declare const createSSRApp: CreateAppFunction<Element>;
/**
* @internal
*/
declare function normalizeContainer<T extends ParentNode>(container: T | string): T | null;
/**
* @internal
*/
declare const initDirectivesForSSR: () => void;
//#endregion
//#region packages/runtime-vapor/src/apiTemplateRef.d.ts
type NodeRef = string | Ref | ((ref: Element | VaporComponentInstance, refs: Record<string, any>) => void);
type RefEl = Element | VaporComponentInstance | DynamicFragment | VaporFragment;
type setRefFn = (el: RefEl, ref: NodeRef, refFor?: boolean, refKey?: string) => NodeRef | undefined;
declare function createTemplateRefSetter(): setRefFn;
//#endregion
//#region packages/runtime-vapor/src/componentSlots.d.ts
type RawSlots = Record<string, VaporSlot> & {
  $?: DynamicSlotSource[];
};
type StaticSlots = Record<string, VaporSlot>;
type VaporSlot = BlockFn;
type DynamicSlot = {
  name: string;
  fn: VaporSlot;
};
type DynamicSlotFn = () => DynamicSlot | DynamicSlot[];
type DynamicSlotSource = StaticSlots | DynamicSlotFn;
/**
* Wrap a slot function to track the slot owner.
*
* This ensures:
* 1. createSlot gets rawSlots from the correct instance (slot owner)
* 2. elements inherit the slot owner's scopeId
*/
declare function withVaporCtx(fn: Function): BlockFn;
declare function createSlot(name: string | (() => string), rawProps?: LooseRawProps | null, fallback?: VaporSlot, noSlotted?: boolean, once?: boolean): Block;
//#endregion
//#region packages/runtime-vapor/src/apiDefineComponent.d.ts
type VaporPublicProps = ReservedProps & AllowedComponentProps & ComponentCustomProps;
type VaporRenderResult<T = Block> = VNode | T | VaporRenderResult<T>[];
type VaporComponentInstanceConstructor<T extends VaporComponentInstance> = {
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  new (...args: any[]): T;
};
type DefineVaporComponent<RuntimePropsOptions = {}, RuntimePropsKeys extends string = string, InferredProps = (string extends RuntimePropsKeys ? ComponentObjectPropsOptions$1 extends RuntimePropsOptions ? {} : ExtractPropTypes$1<RuntimePropsOptions> : { [key in RuntimePropsKeys]?: any }), Emits extends EmitsOptions$1 = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block, TypeRefs extends Record<string, unknown> = {}, MakeDefaultsOptional extends boolean = true, PublicProps = VaporPublicProps, ResolvedProps = InferredProps & EmitsToProps$1<Emits>, Defaults = ExtractDefaultPropTypes<RuntimePropsOptions>> = VaporComponentInstanceConstructor<VaporComponentInstance<MakeDefaultsOptional extends true ? keyof Defaults extends never ? Prettify<ResolvedProps> & PublicProps : Partial<Defaults> & Omit<Prettify<ResolvedProps> & PublicProps, keyof Defaults> : Prettify<ResolvedProps> & PublicProps, Emits, Slots, Exposed, TypeBlock, TypeRefs>> & VaporComponentOptions<RuntimePropsOptions | RuntimePropsKeys[], Emits, RuntimeEmitsKeys, Slots, Exposed>;
type DefineVaporSetupFnComponent<Props extends Record<string, any> = {}, Emits extends EmitsOptions$1 = {}, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block, ResolvedProps extends Record<string, any> = Props & EmitsToProps$1<Emits> & VaporPublicProps> = new () => VaporComponentInstance<ResolvedProps, Emits, Slots, Exposed, TypeBlock>;
declare function defineVaporComponent<Props extends Record<string, any>, Emits extends EmitsOptions$1 = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block>(setup: (props: Props, ctx: {
  emit: EmitFn<Emits>;
  slots: Slots;
  attrs: Record<string, any>;
  expose: (exposed: Exposed) => void;
}) => VaporRenderResult<TypeBlock> | void, extraOptions?: VaporComponentOptions<(keyof Props)[], Emits, RuntimeEmitsKeys, Slots, Exposed> & ThisType<void>): DefineVaporSetupFnComponent<Props, Emits, Slots, Exposed, TypeBlock>;
declare function defineVaporComponent<Props extends Record<string, any>, Emits extends EmitsOptions$1 = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block>(setup: (props: Props, ctx: {
  emit: EmitFn<Emits>;
  slots: Slots;
  attrs: Record<string, any>;
  expose: (exposed: Exposed) => void;
}) => VaporRenderResult<TypeBlock> | void, extraOptions?: VaporComponentOptions<ComponentObjectPropsOptions$1<Props>, Emits, RuntimeEmitsKeys, Slots, Exposed> & ThisType<void>): DefineVaporSetupFnComponent<Props, Emits, Slots, Exposed, TypeBlock>;
declare function defineVaporComponent<TypeProps, RuntimePropsOptions extends ComponentObjectPropsOptions$1 = ComponentObjectPropsOptions$1, RuntimePropsKeys extends string = string, TypeEmits extends ComponentTypeEmits = {}, RuntimeEmitsOptions extends EmitsOptions$1 = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, ResolvedEmits extends EmitsOptions$1 = ({} extends RuntimeEmitsOptions ? TypeEmitsToOptions<TypeEmits> : RuntimeEmitsOptions), InferredProps = (IsKeyValues<TypeProps> extends true ? TypeProps : string extends RuntimePropsKeys ? ComponentObjectPropsOptions$1 extends RuntimePropsOptions ? {} : ExtractPropTypes$1<RuntimePropsOptions> : { [key in RuntimePropsKeys]?: any }), TypeRefs extends Record<string, unknown> = {}, TypeBlock extends Block = Block>(options: VaporComponentOptions<RuntimePropsOptions | RuntimePropsKeys[], ResolvedEmits, RuntimeEmitsKeys, Slots, Exposed, TypeBlock, InferredProps> & {
  [key: string]: any;
  /**
  * @private for language-tools use only
  */
  __typeProps?: TypeProps;
  /**
  * @private for language-tools use only
  */
  __typeEmits?: TypeEmits;
  /**
  * @private for language-tools use only
  */
  __typeRefs?: TypeRefs;
  /**
  * @private for language-tools use only
  */
  __typeEl?: TypeBlock;
} & ThisType<void>): DefineVaporComponent<RuntimePropsOptions, RuntimePropsKeys, InferredProps, ResolvedEmits, RuntimeEmitsKeys, Slots, Exposed extends Block ? Record<string, any> : Exposed, TypeBlock, TypeRefs, unknown extends TypeProps ? true : false>;
//#endregion
//#region packages/runtime-vapor/src/components/KeepAlive.d.ts
interface VaporKeepAliveContext {
  processShapeFlag(block: Block): boolean;
  cacheBlock(): void;
  cacheScope(key: any, scope: EffectScope$1): void;
  getScope(key: any): EffectScope$1 | undefined;
  setCurrentBranchKey(key: any): any;
}
declare const VaporKeepAlive: DefineVaporComponent<{}, string, KeepAliveProps>;
//#endregion
//#region packages/runtime-vapor/src/fragment.d.ts
declare class VaporFragment<T extends Block = Block> implements TransitionOptions {
  $key?: any;
  $transition?: VaporTransitionHooks | undefined;
  nodes: T;
  vnode?: VNode | null;
  anchor?: Node;
  parentComponent?: GenericComponentInstance$1 | null;
  fallback?: BlockFn;
  insert?: (parent: ParentNode, anchor: Node | null, transitionHooks?: TransitionHooks) => void;
  remove?: (parent?: ParentNode, transitionHooks?: TransitionHooks) => void;
  hydrate?: (...args: any[]) => void;
  setRef?: (instance: VaporComponentInstance, ref: NodeRef, refFor: boolean, refKey: string | undefined) => void;
  onUpdated?: ((nodes?: Block) => void)[];
  constructor(nodes: T);
}
declare class ForFragment extends VaporFragment<Block[]> {
  constructor(nodes: Block[]);
}
declare class DynamicFragment extends VaporFragment {
  anchor: Node;
  scope: EffectScope$1 | undefined;
  current?: BlockFn;
  pending?: {
    render?: BlockFn;
    key: any;
  };
  anchorLabel?: string;
  keyed?: boolean;
  attrs?: Record<string, any>;
  keepAliveCtx: VaporKeepAliveContext | null;
  slotOwner: VaporComponentInstance | null;
  constructor(anchorLabel?: string, keyed?: boolean);
  update(render?: BlockFn, key?: any): void;
  renderBranch(render: BlockFn | undefined, transition: VaporTransitionHooks | undefined, parent: ParentNode | null, instance: GenericComponentInstance$1 | null): void;
  hydrate: (isEmpty?: boolean) => void;
}
declare function isFragment(val: NonNullable<unknown>): val is VaporFragment;
//#endregion
//#region packages/runtime-vapor/src/block.d.ts
interface VaporTransitionHooks extends TransitionHooks {
  state: TransitionState;
  props: TransitionProps;
  instance: VaporComponentInstance;
  disabled?: boolean;
}
interface TransitionOptions {
  $key?: any;
  $transition?: VaporTransitionHooks;
}
type Block = Node | VaporFragment | DynamicFragment | VaporComponentInstance | Block[];
type BlockFn = (...args: any[]) => Block;
declare function insert(block: Block, parent: ParentNode & {
  $fc?: Node | null;
}, anchor?: Node | null | 0, parentSuspense?: any): void;
declare function prepend(parent: ParentNode, ...blocks: Block[]): void;
declare function remove(block: Block, parent?: ParentNode): void;
//#endregion
//#region packages/runtime-vapor/src/vdomInterop.d.ts
declare const interopKey: unique symbol;
declare const vaporInteropPlugin: Plugin;
//#endregion
//#region packages/runtime-vapor/src/componentProps.d.ts
type RawProps = Record<string, () => unknown> & {
  $?: DynamicPropsSource[] & {
    [interopKey]?: boolean;
  };
};
type DynamicPropsSource = (() => Record<string, unknown>) | Record<string, () => unknown>;
//#endregion
//#region packages/runtime-vapor/src/renderEffect.d.ts
declare class RenderEffect extends ReactiveEffect {
  render: () => void;
  i: VaporComponentInstance | null;
  job: SchedulerJob;
  updateJob: SchedulerJob;
  constructor(render: () => void);
  fn(): void;
  notify(): void;
}
declare function renderEffect(fn: () => void, noLifecycle?: boolean): void;
//#endregion
//#region packages/runtime-vapor/src/components/Teleport.d.ts
declare class TeleportFragment extends VaporFragment {
  /**
  * @internal marker for duck typing to avoid direct instanceof check
  * which prevents tree-shaking of TeleportFragment
  */
  readonly __isTeleportFragment: true;
  anchor?: Node;
  private rawProps?;
  private resolvedProps?;
  private rawSlots?;
  isDisabled?: boolean;
  private isMounted;
  target?: ParentNode | null;
  targetAnchor?: Node | null;
  targetStart?: Node | null;
  placeholder?: Node;
  mountContainer?: ParentNode | null;
  mountAnchor?: Node | null;
  constructor(props: LooseRawProps, slots: LooseRawSlots);
  get parent(): ParentNode | null;
  private initChildren;
  private registerUpdateCssVars;
  private handleChildrenUpdate;
  private mount;
  private mountToTarget;
  private handlePropsUpdate;
  insert: (container: ParentNode, anchor: Node | null) => void;
  remove: (parent?: ParentNode | undefined) => void;
  private hydrateDisabledTeleport;
  private mountChildren;
  hydrate: () => void;
}
declare const VaporTeleport: DefineVaporSetupFnComponent<TeleportProps>;
//#endregion
//#region packages/runtime-vapor/src/component.d.ts
type VaporComponent = FunctionalVaporComponent<any> | VaporComponentOptions | DefineVaporComponent;
type FunctionalVaporComponent<Props = {}, Emits extends EmitsOptions$1 = {}, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>> = ((props: Props & EmitsToProps$1<Emits>, ctx: {
  emit: EmitFn<Emits>;
  slots: Slots;
  attrs: Record<string, any>;
  expose: <T extends Record<string, any> = Exposed>(exposed: T) => void;
}) => VaporRenderResult) & Omit<VaporComponentOptions<ComponentPropsOptions<Props>, Emits, string, Slots>, "setup"> & {
  displayName?: string;
} & SharedInternalOptions;
interface VaporComponentOptions<Props = {}, Emits extends EmitsOptions$1 = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block, InferredProps = (ComponentObjectPropsOptions$1 extends Props ? {} : ExtractPropTypes$1<Props>)> extends ComponentInternalOptions, AsyncComponentInternalOptions<VaporComponentOptions, VaporComponentInstance>, SharedInternalOptions {
  inheritAttrs?: boolean;
  props?: Props;
  emits?: Emits | RuntimeEmitsKeys[];
  slots?: Slots;
  setup?: (props: Readonly<InferredProps>, ctx: {
    emit: EmitFn<Emits>;
    slots: Slots;
    attrs: Record<string, any>;
    expose: <T extends Record<string, any> = Exposed>(exposed: T) => void;
  }) => TypeBlock | Exposed | Promise<Exposed> | void;
  render?(ctx: Exposed extends Block ? undefined : ShallowUnwrapRef<Exposed>, props: Readonly<InferredProps>, emit: EmitFn<Emits>, attrs: any, slots: Slots): VaporRenderResult<TypeBlock> | void;
  name?: string;
  vapor?: boolean;
  components?: Record<string, VaporComponent>;
  /**
  * @internal custom element interception hook
  */
  ce?: (instance: VaporComponentInstance) => void;
}
interface SharedInternalOptions {
  /**
  * Cached normalized props options.
  * In vapor mode there are no mixins so normalized options can be cached
  * directly on the component
  */
  __propsOptions?: NormalizedPropsOptions;
  /**
  * Cached normalized props proxy handlers.
  */
  __propsHandlers?: [ProxyHandler<any> | null, ProxyHandler<any>];
  /**
  * Cached normalized emits options.
  */
  __emitsOptions?: ObjectEmitsOptions;
}
type LooseRawProps = Record<string, (() => unknown) | DynamicPropsSource[]> & {
  $?: DynamicPropsSource[];
};
type LooseRawSlots = Record<string, VaporSlot | DynamicSlotSource[]> & {
  $?: DynamicSlotSource[];
};
declare function createComponent(component: VaporComponent, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean, appContext?: GenericAppContext): VaporComponentInstance;
declare class VaporComponentInstance<Props extends Record<string, any> = {}, Emits extends EmitsOptions$1 = {}, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block, TypeRefs extends Record<string, any> = Record<string, any>> implements GenericComponentInstance$1 {
  vapor: true;
  uid: number;
  type: VaporComponent;
  root: GenericComponentInstance$1 | null;
  parent: GenericComponentInstance$1 | null;
  appContext: GenericAppContext;
  block: TypeBlock;
  scope: EffectScope;
  rawProps: RawProps;
  rawSlots: RawSlots;
  props: Readonly<Props>;
  attrs: Record<string, any>;
  propsDefaults: Record<string, any> | null;
  slots: Slots;
  scopeId?: string | null;
  rawPropsRef?: ShallowRef<any>;
  rawSlotsRef?: ShallowRef<any>;
  emit: EmitFn<Emits>;
  emitted: Record<string, boolean> | null;
  expose: (<T extends Record<string, any> = Exposed>(exposed: T) => void) & string[];
  exposed: Exposed | null;
  exposeProxy: Prettify<ShallowUnwrapRef<Exposed>> | null;
  refs: TypeRefs;
  provides: Record<string, any>;
  ids: [string, number, number];
  suspense: SuspenseBoundary | null;
  suspenseId: number;
  asyncDep: Promise<any> | null;
  asyncResolved: boolean;
  renderEffects?: RenderEffect[];
  hasFallthrough: boolean;
  shapeFlag?: number;
  key?: any;
  oncePropsCache?: Record<string | symbol, any>;
  isMounted: boolean;
  isUnmounted: boolean;
  isDeactivated: boolean;
  isUpdating: boolean;
  bc?: LifecycleHook;
  c?: LifecycleHook;
  bm?: LifecycleHook;
  m?: LifecycleHook;
  bu?: LifecycleHook;
  u?: LifecycleHook;
  um?: LifecycleHook;
  bum?: LifecycleHook;
  da?: LifecycleHook;
  a?: LifecycleHook;
  rtg?: LifecycleHook;
  rtc?: LifecycleHook;
  ec?: LifecycleHook;
  sp?: LifecycleHook<() => Promise<unknown>>;
  setupState?: Exposed extends Block ? undefined : ShallowUnwrapRef<Exposed>;
  devtoolsRawSetupState?: any;
  hmrRerender?: () => void;
  hmrReload?: (newComp: VaporComponent) => void;
  parentTeleport?: TeleportFragment | null;
  propsOptions?: NormalizedPropsOptions;
  emitsOptions?: ObjectEmitsOptions | null;
  isSingleRoot?: boolean;
  /**
  * dev only flag to track whether $attrs was used during render.
  * If $attrs was used during render then the warning for failed attrs
  * fallthrough can be suppressed.
  */
  accessedAttrs: boolean;
  /**
  * @deprecated only used for JSX to detect props types.
  */
  $props: Props;
  constructor(comp: VaporComponent, rawProps?: RawProps | null, rawSlots?: RawSlots | null, appContext?: GenericAppContext, once?: boolean);
  /**
  * Expose `getKeysFromRawProps` on the instance so it can be used in code
  * paths where it's needed, e.g. `useModel`
  */
  rawKeys(): string[];
  $waitNativeRender(fn: () => void): void;
}
declare function isVaporComponent(value: unknown): value is VaporComponentInstance;
/**
* Used when a component cannot be resolved at compile time
* and needs rely on runtime resolution - where it might fallback to a plain
* element if the resolution fails.
*/
declare function createComponentWithFallback(comp: VaporComponent | typeof NULL_DYNAMIC_COMPONENT | string, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean, appContext?: GenericAppContext): HTMLElement | VaporComponentInstance;
declare function createPlainElement(comp: string, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean): HTMLElement;
declare function unmountComponent(instance: VaporComponentInstance, parentNode?: ParentNode): void;
//#endregion
//#region packages/runtime-vapor/src/apiCreateApp.d.ts
declare const createVaporApp: CreateAppFunction$1<ParentNode, VaporComponent>;
declare const createVaporSSRApp: CreateAppFunction$1<ParentNode, VaporComponent>;
//#endregion
//#region packages/runtime-vapor/src/apiDefineAsyncComponent.d.ts
declare function defineVaporAsyncComponent<T extends VaporComponent>(source: AsyncComponentLoader<T> | AsyncComponentOptions<T>): T;
//#endregion
//#region packages/runtime-vapor/src/directives/custom.d.ts
type VaporDirective = (node: Element | VaporComponentInstance, value?: () => any, argument?: string, modifiers?: DirectiveModifiers) => (() => void) | void;
type VaporDirectiveArguments = Array<[VaporDirective | undefined] | [VaporDirective | undefined, () => any] | [VaporDirective | undefined, (() => any) | undefined, argument: string] | [VaporDirective | undefined, value: (() => any) | undefined, argument: string | undefined, modifiers: DirectiveModifiers]>;
declare function withVaporDirectives(node: Element | VaporComponentInstance, dirs: VaporDirectiveArguments): void;
//#endregion
//#region packages/runtime-vapor/src/apiDefineCustomElement.d.ts
type VaporElementConstructor<P = {}> = {
  new (initialProps?: Record<string, any>): VaporElement & P;
};
declare function defineVaporCustomElement<Props, RawBindings = object>(setup: (props: Props, ctx: {
  attrs: Record<string, any>;
  slots: StaticSlots;
  emit: EmitFn;
  expose: (exposed: Record<string, any>) => void;
}) => RawBindings | VaporRenderResult, options?: Pick<VaporComponentOptions, "name" | "inheritAttrs" | "emits"> & CustomElementOptions & {
  props?: (keyof Props)[];
}): VaporElementConstructor<Props>;
declare function defineVaporCustomElement<Props, RawBindings = object>(setup: (props: Props, ctx: {
  attrs: Record<string, any>;
  slots: StaticSlots;
  emit: EmitFn;
  expose: (exposed: Record<string, any>) => void;
}) => RawBindings | VaporRenderResult, options?: Pick<VaporComponentOptions, "name" | "inheritAttrs" | "emits"> & CustomElementOptions & {
  props?: ComponentObjectPropsOptions$1<Props>;
}): VaporElementConstructor<Props>;
declare function defineVaporCustomElement<RuntimePropsOptions extends ComponentObjectPropsOptions$1 = ComponentObjectPropsOptions$1, RuntimePropsKeys extends string = string, RuntimeEmitsOptions extends EmitsOptions$1 = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, InferredProps = (string extends RuntimePropsKeys ? ComponentObjectPropsOptions$1 extends RuntimePropsOptions ? {} : ExtractPropTypes$1<RuntimePropsOptions> : { [key in RuntimePropsKeys]?: any }), ResolvedProps = InferredProps & EmitsToProps$1<RuntimeEmitsOptions>>(options: CustomElementOptions & {
  props?: (RuntimePropsOptions & ThisType<void>) | RuntimePropsKeys[];
  emits?: RuntimeEmitsOptions | RuntimeEmitsKeys[];
  slots?: Slots;
  setup?: (props: Readonly<InferredProps>, ctx: {
    attrs: Record<string, any>;
    slots: Slots;
    emit: EmitFn<RuntimeEmitsOptions>;
    expose: (exposed: Record<string, any>) => void;
  }) => any;
} & ThisType<void>, extraOptions?: CustomElementOptions): VaporElementConstructor<ResolvedProps>;
declare function defineVaporCustomElement<T extends DefineVaporComponent<any, any, any, any, any, any, any, any, any, any> | DefineVaporSetupFnComponent<any, any, any, any, any>>(options: T, extraOptions?: CustomElementOptions): VaporElementConstructor<T extends DefineVaporComponent<infer RuntimePropsOptions, any, any, any, any, any, any, any, any, any> ? ComponentObjectPropsOptions$1 extends RuntimePropsOptions ? {} : ExtractPropTypes$1<RuntimePropsOptions> : T extends DefineVaporSetupFnComponent<infer P extends Record<string, any>, any, any, any, any> ? P : unknown>;
declare const defineVaporSSRCustomElement: typeof defineVaporCustomElement;
type VaporInnerComponentDef = VaporComponent & CustomElementOptions;
declare class VaporElement extends VueElementBase<ParentNode, VaporComponent, VaporInnerComponentDef> {
  constructor(def: VaporInnerComponentDef, props?: Record<string, any> | undefined, createAppFn?: CreateAppFunction$1<ParentNode, VaporComponent>);
  protected _needsHydration(): boolean;
  protected _mount(def: VaporInnerComponentDef): void;
  protected _update(): void;
  protected _unmount(): void;
  /**
  * Only called when shadowRoot is false
  */
  protected _updateSlotNodes(replacements: Map<Node, Node[]>): void;
  /**
  * Replace slot nodes with their replace content
  * @internal
  */
  private _updateFragmentNodes;
  private _createComponent;
}
//#endregion
//#region packages/runtime-vapor/src/insertionState.d.ts
type InsertionParent = ParentNode & {
  $fc?: Node | null;
  $llc?: Node | null;
};
/**
* This function is called before a block type that requires insertion
* (component, slot outlet, if, for) is created. The state is used for actual
* insertion on client-side render, and used for node adoption during hydration.
*/
declare function setInsertionState(parent: ParentNode & {
  $fc?: Node | null;
}, anchor?: Node | 0 | null, logicalIndex?: number, last?: boolean): void;
//#endregion
//#region packages/runtime-vapor/src/dom/template.d.ts
declare function template(html: string, root?: boolean, ns?: Namespace): () => Node & {
  $root?: true;
};
//#endregion
//#region packages/runtime-vapor/src/dom/node.d.ts
declare function createTextNode(value?: string): Text;
declare const _txt: typeof _child;
declare function _child(node: InsertionParent): Node;
declare function _nthChild(node: InsertionParent, i: number): Node;
declare function _next(node: Node): Node;
type DelegatedFunction<T extends (...args: any[]) => any> = T & {
  impl: T;
};
declare const txt: DelegatedFunction<typeof _txt>;
declare const child: DelegatedFunction<typeof _child>;
declare const next: DelegatedFunction<typeof _next>;
declare const nthChild: DelegatedFunction<typeof _nthChild>;
//#endregion
//#region packages/runtime-vapor/src/dom/prop.d.ts
type TargetElement = Element & {
  $root?: true;
  $html?: string;
  $cls?: string;
  $sty?: NormalizedStyle | string | undefined;
  value?: string;
  _value?: any;
};
declare function setProp(el: any, key: string, value: any): void;
declare function setAttr(el: any, key: string, value: any, isSVG?: boolean): void;
declare function setDOMProp(el: any, key: string, value: any, forceHydrate?: boolean, attrName?: string): void;
declare function setClass(el: TargetElement, value: any, isSVG?: boolean): void;
declare function setStyle(el: TargetElement, value: any): void;
declare function setValue(el: TargetElement, value: any, forceHydrate?: boolean): void;
/**
* Only called on text nodes!
* Compiler should also ensure value passed here is already converted by
* `toDisplayString`
*/
declare function setText(el: Text & {
  $txt?: string;
}, value: string): void;
/**
* Used by setDynamicProps only, so need to guard with `toDisplayString`
*/
declare function setElementText(el: Node & {
  $txt?: string;
}, value: unknown): void;
declare function setBlockText(block: Block & {
  $txt?: string;
}, value: unknown): void;
declare function setHtml(el: TargetElement, value: any): void;
declare function setBlockHtml(block: Block & {
  $html?: string;
}, value: any): void;
declare function setDynamicProps(el: any, args: any[], isSVG?: boolean): void;
//#endregion
//#region packages/runtime-vapor/src/dom/event.d.ts
declare function on(el: Element, event: string, handler: (e: Event) => any | ((e: Event) => any)[], options?: AddEventListenerOptions & {
  effect?: boolean;
}): void;
declare function delegate(el: any, event: string, handler: (e: Event) => any): void;
declare const delegateEvents: (...names: string[]) => void;
declare function setDynamicEvents(el: HTMLElement, events: Record<string, (...args: any[]) => any>): void;
declare function createInvoker(handler: (...args: any[]) => any): (...args: any[]) => any;
//#endregion
//#region packages/runtime-vapor/src/apiCreateIf.d.ts
declare function createIf(condition: () => any, b1: BlockFn, b2?: BlockFn, once?: boolean, index?: number): Block;
//#endregion
//#region packages/runtime-vapor/src/apiCreateFragment.d.ts
/**
* Create a dynamic fragment keyed by a reactive value for Vapor transitions.
* The fragment is re-rendered when the key changes to trigger enter/leave
* animations.
*
* Example:
* <VaporTransition>
*   <h1 :key="count">{{ count }}</h1>
* </VaporTransition>
*/
declare function createKeyedFragment(key: () => any, render: BlockFn): Block;
//#endregion
//#region packages/runtime-vapor/src/apiCreateFor.d.ts
type Source = any[] | Record<any, any> | number | Set<any> | Map<any, any>;
declare const createFor: (src: () => Source, renderItem: (item: ShallowRef<any>, key: ShallowRef<any>, index: ShallowRef<number | undefined>) => Block, getKey?: (item: any, key: any, index?: number) => any, flags?: number, setup?: (_: {
  createSelector: (source: () => any) => (cb: () => void) => void;
}) => void) => ForFragment;
declare function createForSlots(rawSource: Source, getSlot: (item: any, key: any, index?: number) => DynamicSlot): DynamicSlot[];
declare function getRestElement(val: any, keys: string[]): any;
declare function getDefaultValue(val: any, defaultVal: any): any;
//#endregion
//#region packages/runtime-vapor/src/helpers/useCssVars.d.ts
declare function useVaporCssVars(getter: () => Record<string, string>): void;
//#endregion
//#region packages/runtime-vapor/src/apiCreateDynamicComponent.d.ts
declare function createDynamicComponent(getter: () => any, rawProps?: RawProps | null, rawSlots?: RawSlots | null, isSingleRoot?: boolean, once?: boolean): VaporFragment;
//#endregion
//#region packages/runtime-vapor/src/directives/vShow.d.ts
declare function applyVShow(target: Block, source: () => any): void;
//#endregion
//#region packages/runtime-vapor/src/directives/vModel.d.ts
type VaporModelDirective<T extends HTMLElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, Modifiers extends string = string> = (el: T, get: () => any, set: (v: any) => void, modifiers?: { [key in Modifiers]?: true }) => void;
declare const applyTextModel: VaporModelDirective<HTMLInputElement | HTMLTextAreaElement, "trim" | "number" | "lazy">;
declare const applyCheckboxModel: VaporModelDirective<HTMLInputElement>;
declare const applyRadioModel: VaporModelDirective<HTMLInputElement>;
declare const applySelectModel: VaporModelDirective<HTMLSelectElement, "number">;
declare const applyDynamicModel: VaporModelDirective;
//#endregion
//#region packages/runtime-vapor/src/components/Transition.d.ts
declare const VaporTransition: FunctionalVaporComponent<TransitionProps>;
//#endregion
//#region packages/runtime-vapor/src/components/TransitionGroup.d.ts
declare const VaporTransitionGroup: DefineVaporComponent<{}, string, TransitionGroupProps>;
declare namespace index_d_exports {
  export { Block, DefineVaporComponent, DynamicFragment, FunctionalVaporComponent, VaporComponent, VaporComponentInstance, VaporComponentOptions, VaporDirective, VaporElement, VaporElementConstructor, VaporFragment, VaporKeepAlive, VaporKeepAliveContext, VaporPublicProps, VaporRenderResult, VaporSlot, VaporTeleport, VaporTransition, VaporTransitionGroup, VaporTransitionHooks, applyCheckboxModel, applyDynamicModel, applyRadioModel, applySelectModel, applyTextModel, applyVShow, child, createComponent, createComponentWithFallback, createDynamicComponent, createFor, createForSlots, createIf, createInvoker, createKeyedFragment, createPlainElement, createSlot, createTemplateRefSetter, createTextNode, createVaporApp, createVaporSSRApp, defineVaporAsyncComponent, defineVaporComponent, defineVaporCustomElement, defineVaporSSRCustomElement, delegate, delegateEvents, getDefaultValue, getRestElement, insert, isFragment, isVaporComponent, next, nthChild, on, prepend, remove, renderEffect, setAttr, setBlockHtml, setBlockText, setClass, setDOMProp, setDynamicEvents, setDynamicProps, setElementText, setHtml, setInsertionState, setProp, setStyle, setText, setValue, template, txt, unmountComponent, useVaporCssVars, vaporInteropPlugin, withVaporCtx, withVaporDirectives };
}
//#endregion
//#region temp/packages/compiler-vapor/src/ir/component.d.ts
export interface IRProp extends Omit<DirectiveTransformResult, "value"> {
  values: SimpleExpressionNode[];
  /**
  * fixed by uts 当前整个IRProp表达式对应的标识符，目前用于合并class+:class、style+:style的表达式
  */
  sharedData?: {
    ident?: string;
    classRef?: string;
  };
}
export declare enum IRDynamicPropsKind {
  EXPRESSION = 0,
  ATTRIBUTE = 1
}
export type IRPropsStatic = IRProp[];
export interface IRPropsDynamicExpression {
  kind: IRDynamicPropsKind.EXPRESSION;
  value: SimpleExpressionNode;
  handler?: boolean;
}
export interface IRPropsDynamicAttribute extends IRProp {
  kind: IRDynamicPropsKind.ATTRIBUTE;
}
export type IRProps = IRPropsStatic | IRPropsDynamicAttribute | IRPropsDynamicExpression;
export interface SlotBlockIRNode extends BlockIRNode {
  props?: SimpleExpressionNode;
}
export declare enum IRSlotType {
  STATIC = 0,
  DYNAMIC = 1,
  LOOP = 2,
  CONDITIONAL = 3,
  EXPRESSION = 4
}
export type IRSlotsStatic = {
  slotType: IRSlotType.STATIC;
  slots: Record<string, SlotBlockIRNode>;
};
export interface IRSlotDynamicBasic {
  slotType: IRSlotType.DYNAMIC;
  name: SimpleExpressionNode;
  fn: SlotBlockIRNode;
}
export interface IRSlotDynamicLoop {
  slotType: IRSlotType.LOOP;
  name: SimpleExpressionNode;
  fn: SlotBlockIRNode;
  loop: IRFor;
}
export interface IRSlotDynamicConditional {
  slotType: IRSlotType.CONDITIONAL;
  condition: SimpleExpressionNode;
  positive: IRSlotDynamicBasic;
  negative?: IRSlotDynamicBasic | IRSlotDynamicConditional;
}
export interface IRSlotsExpression {
  slotType: IRSlotType.EXPRESSION;
  slots: SimpleExpressionNode;
}
export type IRSlotDynamic = IRSlotDynamicBasic | IRSlotDynamicLoop | IRSlotDynamicConditional;
export type IRSlots = IRSlotsStatic | IRSlotDynamic | IRSlotsExpression;
//#endregion
//#region temp/packages/compiler-vapor/src/ir/index.d.ts
export declare enum IRNodeTypes {
  ROOT = 0,
  BLOCK = 1,
  SET_PROP = 2,
  SET_DYNAMIC_PROPS = 3,
  SET_TEXT = 4,
  SET_EVENT = 5,
  SET_DYNAMIC_EVENTS = 6,
  SET_HTML = 7,
  SET_TEMPLATE_REF = 8,
  INSERT_NODE = 9,
  PREPEND_NODE = 10,
  CREATE_COMPONENT_NODE = 11,
  SLOT_OUTLET_NODE = 12,
  DIRECTIVE = 13,
  IF = 14,
  FOR = 15,
  KEY = 16,
  GET_TEXT_CHILD = 17,
  GET_INSERTION_PARENT = 18,
  SET_CHANGE_PROP = 19
}
export interface BaseIRNode {
  type: IRNodeTypes;
  node: Node$1;
  key?: SimpleExpressionNode | undefined;
}
export type CoreHelper = keyof typeof index_d_exports$1;
export type VaporHelper = keyof typeof index_d_exports;
export interface BlockIRNode extends BaseIRNode {
  type: IRNodeTypes.BLOCK;
  node: RootNode | TemplateChildNode;
  dynamic: IRDynamicInfo;
  tempId: number;
  effect: IREffect[];
  operation: OperationNode[];
  returns: number[];
}
export interface RootIRNode {
  type: IRNodeTypes.ROOT;
  node: RootNode;
  source: string;
  template: Map<string, Namespace>;
  templateIndexMap: Map<string, number>;
  rootTemplateIndexes: Set<number>;
  component: Set<string>;
  directive: Set<string>;
  block: BlockIRNode;
  hasTemplateRef: boolean;
  hasDeferredVShow: boolean;
}
export interface IfIRNode extends BaseIRNode {
  type: IRNodeTypes.IF;
  id: number;
  condition: SimpleExpressionNode;
  positive: BlockIRNode;
  negative?: BlockIRNode | IfIRNode;
  once?: boolean;
  index?: number;
  parent?: number;
  anchor?: number;
  logicalIndex?: number;
  append?: boolean;
  last?: boolean;
}
export interface IRFor {
  source: SimpleExpressionNode;
  value?: SimpleExpressionNode;
  key?: SimpleExpressionNode;
  index?: SimpleExpressionNode;
}
export interface ForIRNode extends BaseIRNode, IRFor {
  type: IRNodeTypes.FOR;
  id: number;
  keyProp?: SimpleExpressionNode;
  typeProp?: SimpleExpressionNode;
  render: BlockIRNode;
  once: boolean;
  component: boolean;
  onlyChild: boolean;
  parent?: number;
  anchor?: number;
  logicalIndex?: number;
  append?: boolean;
  last?: boolean;
}
export interface KeyIRNode extends BaseIRNode {
  type: IRNodeTypes.KEY;
  id: number;
  value: SimpleExpressionNode;
  block: BlockIRNode;
  parent?: number;
  anchor?: number;
  logicalIndex?: number;
  append?: boolean;
  last?: boolean;
}
export interface SetPropIRNode extends BaseIRNode {
  type: IRNodeTypes.SET_PROP;
  element: number;
  prop: IRProp;
  tag: string;
  isChangeProp?: boolean;
}
export interface SetDynamicPropsIRNode extends BaseIRNode {
  type: IRNodeTypes.SET_DYNAMIC_PROPS;
  element: number;
  props: IRProps[];
  tag: string;
  /**
  * fixed by uts 当前整个动态绑定表达式对应的标识符，因为动态绑定需要在sharedData层对数据做格式化，不能单个生成标识符，不然需要在c层再格式化一次
  */
  sharedData?: SimpleExpressionNode["sharedData"];
}
export interface SetDynamicEventsIRNode extends BaseIRNode {
  type: IRNodeTypes.SET_DYNAMIC_EVENTS;
  element: number;
  event: SimpleExpressionNode;
}
export interface SetTextIRNode extends BaseIRNode {
  type: IRNodeTypes.SET_TEXT;
  element: number;
  values: SimpleExpressionNode[];
  generated?: boolean;
  isComponent?: boolean;
}
export type KeyOverride = [find: string, replacement: string];
export interface SetEventIRNode extends BaseIRNode {
  type: IRNodeTypes.SET_EVENT;
  element: number;
  key: SimpleExpressionNode;
  value?: SimpleExpressionNode;
  modifiers: {
    options: string[];
    keys: string[];
    nonKeys: string[];
  };
  keyOverride?: KeyOverride;
  delegate: boolean;
  /** Whether it's in effect */
  effect: boolean;
  /**
  * fixed by uts 因为 value 可能不存在，所以挂在 SetEventIRNode 上
  */
  sharedData?: SimpleExpressionNode["sharedData"];
}
export interface SetHtmlIRNode extends BaseIRNode {
  type: IRNodeTypes.SET_HTML;
  element: number;
  value: SimpleExpressionNode;
  isComponent?: boolean;
}
export interface SetTemplateRefIRNode extends BaseIRNode {
  type: IRNodeTypes.SET_TEMPLATE_REF;
  element: number;
  value: SimpleExpressionNode;
  refFor: boolean;
  effect: boolean;
}
export interface InsertNodeIRNode extends BaseIRNode {
  type: IRNodeTypes.INSERT_NODE;
  elements: number[];
  parent: number;
  anchor?: number;
}
export interface PrependNodeIRNode extends BaseIRNode {
  type: IRNodeTypes.PREPEND_NODE;
  elements: number[];
  parent: number;
}
export interface DirectiveIRNode extends BaseIRNode {
  type: IRNodeTypes.DIRECTIVE;
  element: number;
  dir: VaporDirectiveNode;
  name: string;
  builtin?: boolean;
  asset?: boolean;
  modelType?: "text" | "dynamic" | "radio" | "checkbox" | "select";
  deferred?: boolean;
}
export interface CreateComponentIRNode extends BaseIRNode {
  type: IRNodeTypes.CREATE_COMPONENT_NODE;
  id: number;
  tag: string;
  props: IRProps[];
  slots: IRSlots[];
  asset: boolean;
  root: boolean;
  once: boolean;
  dynamic?: SimpleExpressionNode;
  isCustomElement: boolean;
  parent?: number;
  anchor?: number;
  logicalIndex?: number;
  append?: boolean;
  last?: boolean;
  /**
  * fixed by uts 当前表达式对应的标识符
  */
  sharedData?: SimpleExpressionNode["sharedData"];
}
export interface SlotOutletIRNode extends BaseIRNode {
  type: IRNodeTypes.SLOT_OUTLET_NODE;
  id: number;
  name: SimpleExpressionNode;
  props: IRProps[];
  fallback?: BlockIRNode;
  noSlotted?: boolean;
  once?: boolean;
  parent?: number;
  anchor?: number;
  logicalIndex?: number;
  append?: boolean;
  last?: boolean;
  sharedData?: SimpleExpressionNode["sharedData"];
}
export interface GetTextChildIRNode extends BaseIRNode {
  type: IRNodeTypes.GET_TEXT_CHILD;
  parent: number;
}
export interface GetInsertionParentIRNode extends BaseIRNode {
  type: IRNodeTypes.GET_INSERTION_PARENT;
  id: number;
}
export interface SetChangePropIRNode extends BaseIRNode {
  type: IRNodeTypes.SET_CHANGE_PROP;
  prop: IRProp;
}
export type IRNode = OperationNode | RootIRNode;
export type OperationNode = SetPropIRNode | SetDynamicPropsIRNode | SetTextIRNode | SetEventIRNode | SetDynamicEventsIRNode | SetHtmlIRNode | SetTemplateRefIRNode | InsertNodeIRNode | PrependNodeIRNode | DirectiveIRNode | IfIRNode | ForIRNode | KeyIRNode | CreateComponentIRNode | SlotOutletIRNode | GetTextChildIRNode | GetInsertionParentIRNode | SetChangePropIRNode;
export declare enum DynamicFlag {
  NONE = 0,
  /**
  * This node is referenced and needs to be saved as a variable.
  */
  REFERENCED = 1,
  /**
  * This node is not generated from template, but is generated dynamically.
  */
  NON_TEMPLATE = 2,
  /**
  * This node needs to be inserted back into the template.
  */
  INSERT = 4
}
export interface IRDynamicInfo {
  id?: number;
  flags: DynamicFlag;
  anchor?: number;
  logicalIndex?: number;
  children: IRDynamicInfo[];
  template?: number;
  hasDynamicChild?: boolean;
  operation?: OperationNode;
  type?: NodeTypes;
  tag?: string;
}
export interface IREffect {
  expressions: SimpleExpressionNode[];
  operations: OperationNode[];
  /**
  * fixed by uts 标记当前 effect 是否已生成代码
  */
  generated?: boolean;
}
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & Pick<U, Extract<keyof U, keyof T>>;
export type HackOptions<T> = Prettify<Overwrite<T, {
  nodeTransforms?: NodeTransform[];
  directiveTransforms?: Record<string, DirectiveTransform | undefined>;
}>>;
export type VaporDirectiveNode = Overwrite<DirectiveNode, {
  exp: Exclude<DirectiveNode["exp"], CompoundExpressionNode>;
  arg: Exclude<DirectiveNode["arg"], CompoundExpressionNode>;
}>;
export type InsertionStateTypes = IfIRNode | ForIRNode | KeyIRNode | SlotOutletIRNode | CreateComponentIRNode;
export declare function isBlockOperation(op: OperationNode): op is InsertionStateTypes;
//#endregion
//#region temp/packages/compiler-vapor/src/transform.d.ts
export type NodeTransform = (node: RootNode | TemplateChildNode, context: TransformContext<RootNode | TemplateChildNode>) => void | (() => void) | (() => void)[];
export type DirectiveTransform = (dir: VaporDirectiveNode, node: ElementNode, context: TransformContext<ElementNode>) => DirectiveTransformResult | void;
interface DirectiveTransformResult {
  key: SimpleExpressionNode;
  value: SimpleExpressionNode;
  modifier?: "." | "^";
  runtimeCamelize?: boolean;
  handler?: boolean;
  handlerModifiers?: SetEventIRNode["modifiers"];
  model?: boolean;
  modelModifiers?: string[];
}
export type StructuralDirectiveTransform = (node: ElementNode, dir: VaporDirectiveNode, context: TransformContext<ElementNode>) => void | (() => void);
type TransformOptions$1 = HackOptions<TransformOptions>;
export declare class TransformContext<T extends AllNode = AllNode> {
  ir: RootIRNode;
  node: T;
  selfName: string | null;
  parent: TransformContext<RootNode | ElementNode> | null;
  effectiveParent: TransformContext<RootNode | ElementNode> | null;
  root: TransformContext<RootNode>;
  index: number;
  block: BlockIRNode;
  options: Required<Omit<TransformOptions$1, "filename" | keyof CompilerCompatOptions>>;
  template: string;
  childrenTemplate: (string | null)[];
  dynamic: IRDynamicInfo;
  imports: ImportItem[];
  inVOnce: boolean;
  inVFor: number;
  comment: CommentNode[];
  component: Set<string>;
  directive: Set<string>;
  slots: IRSlots[];
  isLastEffectiveChild: boolean;
  isOnRightmostPath: boolean;
  hasInlineAncestorNeedingClose: boolean;
  private globalId;
  private nextIdMap;
  private ifIndex;
  constructor(ir: RootIRNode, node: T, options?: TransformOptions$1);
  enterBlock(ir: BlockIRNode, isVFor?: boolean): () => void;
  increaseId: () => number;
  private initNextIdMap;
  reference(): number;
  nextIfIndex(): number;
  pushTemplate(content: string): number;
  registerTemplate(): number;
  registerEffect(expressions: SimpleExpressionNode[], operation: OperationNode | OperationNode[], getIndex?: () => number, getOperationIndex?: () => number): void;
  registerOperation(...node: OperationNode[]): void;
  create<T extends TemplateChildNode>(node: T, index: number): TransformContext<T>;
  private isEffectivelyLastChild;
}
export declare function transform(node: RootNode, options?: TransformOptions$1): RootIRNode;
export declare function createStructuralDirectiveTransform(name: string | string[], fn: StructuralDirectiveTransform): NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/generate.d.ts
export type CodegenOptions = Omit<CodegenOptions$1, "optimizeImports">;
export declare class CodegenContext {
  ir: RootIRNode;
  options: Required<CodegenOptions>;
  bindingNames: Set<string>;
  helpers: Map<string, string>;
  helper: (name: CoreHelper | VaporHelper) => string;
  delegates: Set<string>;
  identifiers: Record<string, (string | SimpleExpressionNode)[]>;
  seenInlineHandlerNames: Record<string, number>;
  block: BlockIRNode;
  withId<T>(fn: () => T, map: Record<string, string | SimpleExpressionNode | null>): T;
  enterBlock(block: BlockIRNode): () => BlockIRNode;
  scopeLevel: number;
  enterScope(): [level: number, exit: () => number];
  private templateVars;
  private nextIdMap;
  private lastIdMap;
  private lastTIndex;
  private initNextIdMap;
  tName(i: number): string;
  pName(i: number): string;
  constructor(ir: RootIRNode, options: CodegenOptions);
}
export interface VaporCodegenResult extends BaseCodegenResult {
  ast: RootIRNode;
  helpers: Set<string>;
}
export declare function generate(ir: RootIRNode, options?: CodegenOptions): VaporCodegenResult;
//#endregion
//#region temp/packages/compiler-vapor/src/generators/utils.d.ts
export declare const IMPORT_EXP_START = "__IMPORT_EXP_START__";
export declare const IMPORT_EXP_END = "__IMPORT_EXP_END__";
export declare const IMPORT_EXPR_RE: RegExp;
export declare const NEWLINE: unique symbol;
/** increase offset but don't push actual code */
export declare const LF: unique symbol;
export declare const INDENT_START: unique symbol;
export declare const INDENT_END: unique symbol;
type FalsyValue = false | null | undefined;
export type CodeFragment = typeof NEWLINE | typeof LF | typeof INDENT_START | typeof INDENT_END | string | [code: string, newlineIndex?: number, loc?: SourceLocation, name?: string] | FalsyValue;
export type CodeFragments = Exclude<CodeFragment, any[]> | CodeFragment[];
export declare function buildCodeFragment(...frag: CodeFragment[]): [CodeFragment[], (...items: CodeFragment[]) => number, (...items: CodeFragment[]) => number];
export type CodeFragmentDelimiters = [left: CodeFragments, right: CodeFragments, delimiter: CodeFragments, placeholder?: CodeFragments];
export declare function genMulti([left, right, seg, placeholder]: CodeFragmentDelimiters, ...frags: CodeFragments[]): CodeFragment[];
export declare const DELIMITERS_ARRAY: CodeFragmentDelimiters;
export declare const DELIMITERS_ARRAY_NEWLINE: CodeFragmentDelimiters;
export declare const DELIMITERS_OBJECT: CodeFragmentDelimiters;
export declare const DELIMITERS_OBJECT_NEWLINE: CodeFragmentDelimiters;
export declare function genCall(name: string | [name: string, placeholder?: CodeFragments], ...frags: CodeFragments[]): CodeFragment[];
export declare function codeFragmentToString(code: CodeFragment[], context: CodegenContext): [code: string, map: CodegenSourceMapGenerator | undefined];
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/utils.d.ts
export declare function wrapTemplate(node: ElementNode, dirs: string[]): TemplateNode;
export declare const TEXT_PLACEHOLDER = "__vapor_dom2_text_placeholder__";
export declare const TEXT_NODE_PLACEHOLDER = "__vapor_dom2_text_node_placeholder__";
//#endregion
//#region temp/packages/compiler-vapor/src/compile.d.ts
export declare function compile(source: string | RootNode, options?: CompilerOptions): VaporCodegenResult;
export type CompilerOptions = HackOptions<CompilerOptions$1>;
export type TransformPreset = [NodeTransform[], Record<string, DirectiveTransform>];
export declare function getBaseTransformPreset(): TransformPreset;
//#endregion
//#region temp/packages/compiler-vapor/src/errors.d.ts
export interface VaporCompilerError extends CompilerError {
  code: VaporErrorCodes;
}
export declare function createVaporCompilerError(code: VaporErrorCodes, loc?: SourceLocation): VaporCompilerError;
export declare enum VaporErrorCodes {
  X_V_PLACEHOLDER = 100,
  __EXTEND_POINT__ = 101
}
export declare const VaporErrorMessages: Record<VaporErrorCodes, string>;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/transformElement.d.ts
export declare const transformElement: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/transformChildren.d.ts
export declare const transformChildren: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/transformTemplateRef.d.ts
export declare const transformTemplateRef: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/transformText.d.ts
export declare const transformText: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/vBind.d.ts
export declare const transformVBind: DirectiveTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/vHtml.d.ts
export declare const transformVHtml: DirectiveTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/vOn.d.ts
export declare const transformVOn: DirectiveTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/vOnce.d.ts
export declare const transformVOnce: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/vShow.d.ts
export declare const transformVShow: DirectiveTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/vText.d.ts
export declare const transformVText: DirectiveTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/vIf.d.ts
export declare const transformVIf: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/vFor.d.ts
export declare const transformVFor: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/transformKey.d.ts
export declare const transformKey: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/vModel.d.ts
export declare const transformVModel: DirectiveTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/transformComment.d.ts
export declare const transformComment: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/transformSlotOutlet.d.ts
export declare const transformSlotOutlet: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/transforms/vSlot.d.ts
export declare const transformVSlot: NodeTransform;
//#endregion
//#region temp/packages/compiler-vapor/src/utils.d.ts
export declare function propToExpression(prop: AttributeNode | VaporDirectiveNode): SimpleExpressionNode | undefined;
export declare function isConstantExpression(exp: SimpleExpressionNode): boolean;
export declare function isStaticExpression(node: SimpleExpressionNode, bindings: BindingMetadata): boolean;
export declare function getLiteralExpressionValue(exp: SimpleExpressionNode, excludeNumber?: boolean): string | null;
export declare function isTransitionTag(tag: string): boolean;
export declare function isTransitionGroupTag(tag: string): boolean;
export declare function isKeepAliveTag(tag: string): boolean;
export declare function isTeleportTag(tag: string): boolean;
export declare function isBuiltInComponent(tag: string): string | undefined;
//#endregion
//#region temp/packages/compiler-vapor/src/generators/expression.d.ts
export declare function analyzeExpressions(expressions: SimpleExpressionNode[]): {
  seenVariable: Record<string, number>;
  variableToExpMap: Map<string, Set<SimpleExpressionNode>>;
  expToVariableMap: Map<SimpleExpressionNode, Array<{
    name: string;
    loc?: {
      start: number;
      end: number;
    };
  }>>;
  seenIdentifier: Set<string>;
  updatedVariable: Set<string>;
};
//#endregion
//#region temp/packages/compiler-vapor/src/generators/for.d.ts
export type DestructureMapValue = {
  path: string;
  dynamic: boolean;
  helper?: string;
  helperArgs?: string;
};
export type DestructureMap = Map<string, DestructureMapValue | null>;
export declare function parseValueDestructure(value: SimpleExpressionNode | undefined, context: CodegenContext): DestructureMap;
export declare function buildDestructureIdMap(idToPathMap: DestructureMap, baseAccessor: string, plugins: CodegenContext["options"]["expressionPlugins"]): Record<string, string | SimpleExpressionNode | null>;
//#endregion
//#region temp/packages/compiler-vapor/src/generators/component.d.ts
/**
* Check if a slot block needs withVaporCtx wrapper.
* Returns true if the block contains:
* - Component creation (needs scopeId inheritance)
* - Slot outlet (needs rawSlots from slot owner)
*/
export declare function needsVaporCtx(block: BlockIRNode): boolean;
//#endregion
export { parse,  };