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
 * Provides an interface for SymbolGlyph.
 *
 * @interface SymbolGlyphInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
interface SymbolGlyphInterface {
    /**
     * Called when resource is entered in SymbolGlyph.
     *
     * @param { Resource } value
     * @returns { SymbolGlyphAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    (value: Resource): SymbolGlyphAttribute;
}
/**
 * The symbol rendering strategy.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare enum SymbolRenderingStrategy {
    /**
     * The single rendering strategy.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    SINGLE = 0,
    /**
     * The multiple color rendering strategy.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    MULTIPLE_COLOR = 1,
    /**
     * The multiple opacity rendering strategy.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    MULTIPLE_OPACITY = 2
}
/**
 * The symbol effect strategy.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare enum SymbolEffectStrategy {
    /**
     * There is no effect strategy.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    NONE = 0,
    /**
     * The scale effect strategy.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    SCALE = 1,
    /**
     * The hierarchical effect strategy.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    HIERARCHICAL = 2
}
/**
 * Provides attribute for SymbolGlyph.
 *
 * @extends CommonMethod<SymbolGlyphAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare class SymbolGlyphAttribute extends CommonMethod<SymbolGlyphAttribute> {
    /**
     * Called when the SymbolGlyph size is set.
     *
     * @param { number | string | Resource } value
     * @returns { SymbolGlyphAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fontSize(value: number | string | Resource): SymbolGlyphAttribute;
    /**
     * Called when the SymbolGlyph color is set.
     *
     * @param { Array<ResourceColor> } value
     * @returns { SymbolGlyphAttribute } The attribute of the SymbolGlyph.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fontColor(value: Array<ResourceColor>): SymbolGlyphAttribute;
    /**
     * Called when the font symbolGlyph weight is set.
     *
     * @param { number | FontWeight | string } value
     * @returns { SymbolGlyphAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fontWeight(value: number | FontWeight | string): SymbolGlyphAttribute;
    /**
     * Called when the symbolGlyph effect is set.
     *
     * @param { SymbolEffectStrategy } value
     * @returns { SymbolGlyphAttribute } The attribute of the SymbolGlyph.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    effectStrategy(value: SymbolEffectStrategy): SymbolGlyphAttribute;
    /**
     * Called when the symbolGlyph rendering strategy is set.
     *
     * @param { SymbolRenderingStrategy } value
     * @returns { SymbolGlyphAttribute } The attribute of the SymbolGlyph.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    renderingStrategy(value: SymbolRenderingStrategy): SymbolGlyphAttribute;
}
/**
 * Defines SymbolGlyph Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare const SymbolGlyph: SymbolGlyphInterface;
/**
 * Defines SymbolGlyph Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare const SymbolGlyphInstance: SymbolGlyphAttribute;
