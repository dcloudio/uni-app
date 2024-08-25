/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit ArkUI
 */
import { TextModifier } from './@ohos.arkui.modifier';
/**
 * Control style of operation element
 * @enum { OperationStyle }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Control style of operation element
 * @enum { OperationStyle }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare enum OperationType {
    /**
     * The TextArrow style.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The TextArrow style.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    TEXT_ARROW = 0,
    /**
     * The Button style.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The Button style.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    BUTTON = 1,
    /**
     * The IconGroup style.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The IconGroup style.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    ICON_GROUP = 2,
    /**
     * The LoadingProgress style.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The LoadingProgress style.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    LOADING = 3
}
/**
 * Declare type OperationOption
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare type OperationOption
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare class OperationOption {
    /**
     * The content of text or the address of icon.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The content of text or the address of icon.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    value: ResourceStr;
    /**
     * callback function when operate the text or icon.
     * @type { () => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * callback function when operate the text or icon.
     * @type { () => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    action?: () => void;
}
/**
 * Declare type SelectOption
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare type SelectOption
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare class SelectOptions {
    /**
     * SubOption array of the select.
     * @type { Array<SelectSubOption> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * SubOption array of the select.
     * @type { Array<SelectSubOption> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    options: Array<SelectOption>;
    /**
     * The default selected index.
     * @type { number }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The default selected index.
     * @type { number }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    selected?: number;
    /**
     * The default text value.
     * @type { string }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The default text value.
     * @type { string }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    value?: string;
    /**
     * Callback when the select is selected.
     * @type { (index: number, value?: string) => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Callback when the select is selected.
     * @type { (index: number, value?: string) => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    onSelect?: (index: number, value?: string) => void;
}
/**
 * Declare type SymbolOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export declare class SymbolOptions {
    /**
     * The size of symbol icon.
     * @type { ?(number | string | Resource) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    fontSize?: number | string | Resource;
    /**
     * The color of symbol icon.
     * @type { ?(Array<ResourceColor>) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    fontColor?: Array<ResourceColor>;
    /**
     * The fontWeight of symbol icon.
     * @type { ?(number | FontWeight | string) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    fontWeight?: number | FontWeight | string;
    /**
     * The effect strategy of symbol icon.
     * @type { ?(SymbolEffectStrategy) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    effectStrategy?: SymbolEffectStrategy;
    /**
     * The rendering strategy of symbol icon.
     * @type { ?(SymbolRenderingStrategy) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    renderingStrategy?: SymbolRenderingStrategy;
}
/**
 * Declare struct SubHeader
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare struct SubHeader
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
@Component
export declare struct SubHeader {
    /**
     * Icon resource of content area.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Icon resource of content area.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @Prop
    icon?: ResourceStr;
    /**
     * Attributes of Symbol icon.
     * @type { SymbolOptions}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    iconSymbolOptions?: SymbolOptions;
    /**
     * The first line text of content area.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The first line text of content area.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @Prop
    primaryTitle?: ResourceStr;
    /**
     * The secondary line text of content area.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The secondary line text of content area.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @Prop
    secondaryTitle?: ResourceStr;
    /**
     * Select option of content area.
     * @type { SelectOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Select option of content area.
     * @type { SelectOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    select?: SelectOptions;
    /**
     * Operation style of SubHeader.
     * @type { OperationStyle }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Operation style of SubHeader.
     * @type { OperationStyle }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @Prop
    operationType?: OperationType;
    /**
     * operation item.
     * @type { Array<OperationOption> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * operation item.
     * @type { Array<OperationOption> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    operationItem?: Array<OperationOption>;
    /**
     * Attributes of Symbol icons in operation area.
     * @type { Array<SymbolOptions> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    operationSymbolOptions?: Array<SymbolOptions>;
    /**
     * Text modifier for primary title.
     * @type { TextModifier }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    primaryTitleModifier?: TextModifier;
    /**
     * Text modifier for secondary title.
     * @type { TextModifier }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    secondaryTitleModifier?: TextModifier;
    /**
     * Set the title content.
     * @type { () => void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    @BuilderParam
    titleBuilder?: () => void;
    /**
     * Set the content margin.
     * @type { ?LocalizedMargin }
     * @default {start: LengthMetrics.resource($r('sys.float.margin_left')),
     * <br> end: LengthMetrics.resource($r('sys.float.margin_right'))}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    @Prop
    contentMargin?: LocalizedMargin;
    /**
     * Set the content padding.
     * @type { ?LocalizedPadding }
     * @default set different default values according to the width of the subHeader:
     * <br> When the left area is secondaryTitle or the group of secondaryTitle and icon,
     * <br> the default value is {start: LengthMetrics.vp(12), end: LengthMetrics.vp(12)};
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    @Prop
    contentPadding?: LocalizedPadding;
}
