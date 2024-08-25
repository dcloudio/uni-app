/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
/**
 * Provides an interface for SymbolSpan.
 *
 * @interface SymbolSpanInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Provides an interface for SymbolSpan.
 *
 * @interface SymbolSpanInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
interface SymbolSpanInterface {
    /**
     * Called when resource is entered in SymbolSpan.
     *
     * @param { Resource } value
     * @returns { SymbolSpanAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when resource is entered in SymbolSpan.
     *
     * @param { Resource } value
     * @returns { SymbolSpanAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    (value: Resource): SymbolSpanAttribute;
}
/**
 * Provides attribute for SymbolSpan.
 *
 * @extends CommonMethod<SymbolSpanAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Provides attribute for SymbolSpan.
 *
 * @extends CommonMethod<SymbolSpanAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare class SymbolSpanAttribute extends CommonMethod<SymbolSpanAttribute> {
    /**
     * Called when the SymbolSpan size is set.
     *
     * @param { number | string | Resource } value
     * @returns { SymbolSpanAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when the SymbolSpan size is set.
     *
     * @param { number | string | Resource } value
     * @returns { SymbolSpanAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fontSize(value: number | string | Resource): SymbolSpanAttribute;
    /**
     * Called when the SymbolSpan color is set.
     *
     * @param { Array<ResourceColor> } value
     * @returns { SymbolSpanAttribute } The attribute of the SymbolGlyph.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when the SymbolSpan color is set.
     *
     * @param { Array<ResourceColor> } value
     * @returns { SymbolSpanAttribute } The attribute of the SymbolGlyph.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fontColor(value: Array<ResourceColor>): SymbolSpanAttribute;
    /**
     * Called when the font SymbolSpan weight is set.
     *
     * @param { number | FontWeight | string } value
     * @returns { SymbolSpanAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when the font SymbolSpan weight is set.
     *
     * @param { number | FontWeight | string } value
     * @returns { SymbolSpanAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fontWeight(value: number | FontWeight | string): SymbolSpanAttribute;
    /**
     * Called when the SymbolSpan effect is set.
     *
     * @param { SymbolEffectStrategy } value
     * @returns { SymbolSpanAttribute } The attribute of the SymbolGlyph.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when the SymbolSpan effect is set.
     *
     * @param { SymbolEffectStrategy } value
     * @returns { SymbolSpanAttribute } The attribute of the SymbolGlyph.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    effectStrategy(value: SymbolEffectStrategy): SymbolSpanAttribute;
    /**
     * Called when the SymbolSpan rendering strategy is set.
     *
     * @param { SymbolRenderingStrategy } value
     * @returns { SymbolSpanAttribute } The attribute of the SymbolGlyph.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when the SymbolSpan rendering strategy is set.
     *
     * @param { SymbolRenderingStrategy } value
     * @returns { SymbolSpanAttribute } The attribute of the SymbolGlyph.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    renderingStrategy(value: SymbolRenderingStrategy): SymbolSpanAttribute;
}
/**
 * Defines SymbolSpan Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines SymbolSpan Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare const SymbolSpan: SymbolSpanInterface;
/**
 * Defines SymbolSpan Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines SymbolSpan Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare const SymbolSpanInstance: SymbolSpanAttribute;
