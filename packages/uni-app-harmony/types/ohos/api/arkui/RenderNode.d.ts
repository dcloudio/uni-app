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
import { DrawContext, Size, Offset, Position, Pivot, Scale, Translation, Matrix4, Rotation, Frame } from './Graphics';
/**
 * Defines RenderNode. Contains node tree operations and render property operations on node.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export class RenderNode {
    /**
     * Constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    constructor();
    /**
     * Add child to the end of the RenderNode's children.
     *
     * @param { RenderNode } node - The node will be added.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    appendChild(node: RenderNode): void;
    /**
     * Add child to the current RenderNode.
     *
     * @param { RenderNode } child - The node will be added.
     * @param { RenderNode | null } sibling - The new node is added after this node. When sibling is null, insert node as the first children of the node.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    insertChildAfter(child: RenderNode, sibling: RenderNode | null): void;
    /**
     * Remove child from the current RenderNode.
     *
     * @param { RenderNode } node - The node will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    removeChild(node: RenderNode): void;
    /**
     * Clear children of the current RenderNode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    clearChildren(): void;
    /**
     * Get a child of the current RenderNode by index.
     *
     * @param { number } index - The index of the desired node in the children of RenderNode.
     * @returns { RenderNode | null } - Returns a RenderNode. When the required node does not exist, returns null.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    getChild(index: number): RenderNode | null;
    /**
     * Get the first child of the current RenderNode.
     *
     * @returns {  RenderNode | null } - Returns a RenderNode, which is first child of the current RenderNode.
     * If current RenderNode does not have child node, returns null.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    getFirstChild(): RenderNode | null;
    /**
     * Get the next sibling node of the current RenderNode.
     *
     * @returns { RenderNode | null } - Returns a RenderNode. If current RenderNode does not have next sibling node, returns null.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    getNextSibling(): RenderNode | null;
    /**
     * Get the previous sibling node of the current RenderNode.
     *
     * @returns { RenderNode | null } - Returns a RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    getPreviousSibling(): RenderNode | null;
    /**
     * Set the background color of the RenderNode.
     *
     * @param { number } color - The background color. Colors are defined as ARGB format represented by number.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set backgroundColor(color: number);
    /**
     * Get the background color of the RenderNode.
     *
     * @returns { number } - Returns a background color. Colors are defined as ARGB format represented by number.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get backgroundColor(): number;
    /**
     * Set whether the RenderNode clip to frame.
     *
     * @param { boolean } useClip - Whether the RenderNode clip to frame.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set clipToFrame(useClip: boolean);
    /**
     * Get whether the RenderNode clip to frame.
     *
     * @returns { boolean } - Returns whether the RenderNode clip to frame.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get clipToFrame(): boolean;
    /**
     * Set opacity of the RenderNode.
     *
     * @param { number } value - The opacity of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set opacity(value: number);
    /**
     * Get opacity of the RenderNode.
     *
     * @returns { number } Returns the opacity of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get opacity(): number;
    /**
     * Set frame size of the RenderNode.
     *
     * @param { Size } size - The size of the RenderNode frame.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set size(size: Size);
    /**
     * Get frame size of the RenderNode.
     *
     * @returns { Size } The size of the RenderNode frame.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get size(): Size;
    /**
     * Set frame position of the RenderNode.
     *
     * @param { Position } position - The position of the RenderNode frame.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set position(position: Position);
    /**
     * Get frame position of the RenderNode.
     *
     * @returns { Position } - The position of the RenderNode frame.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get position(): Position;
    /**
     * Set frame info of the RenderNode.
     *
     * @param { Frame } frame - The frame info of the RenderNode frame.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set frame(frame: Frame);
    /**
     * Get frame info of the RenderNode.
     *
     * @returns { Frame } - Returns frame info of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get frame(): Frame;
    /**
     * Set pivot of the RenderNode.
     *
     * @param { Pivot } pivot - The pivot of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set pivot(pivot: Pivot);
    /**
     * Get pivot vector of the RenderNode.
     *
     * @returns { Pivot } - Returns pivot vector of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get pivot(): Pivot;
    /**
     * Set scale of the RenderNode.
     *
     * @param { Scale } scale - The scale of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set scale(scale: Scale);
    /**
     * Get scale vector of the RenderNode.
     *
     * @returns { Scale } - Returns scale vector of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get scale(): Scale;
    /**
     * Set translation of the RenderNode.
     *
     * @param { Translation } translation - the translate vector of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set translation(translation: Translation);
    /**
     * Get translation vector of the RenderNode.
     *
     * @returns { Translation } - Returns translation vector of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get translation(): Translation;
    /**
     * Set rotation vector of the RenderNode.
     *
     * @param { Rotation } rotation - The rotation vector of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set rotation(rotation: Rotation);
    /**
     * Get rotation vector of the RenderNode.
     *
     * @returns { Rotation } - Returns rotation vector of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get rotation(): Rotation;
    /**
     * Set transform info of the RenderNode.
     *
     * @param { Matrix4 } transform - the transform info of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set transform(transform: Matrix4);
    /**
     * Get transform info of the RenderNode.
     *
     * @returns {Matrix4 } - Returns transform info of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get transform(): Matrix4;
    /**
     * Set shadow color of the RenderNode.
     *
     * @param { number } color - the shadow color of the RenderNode. Colors are defined as ARGB format represented by number.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set shadowColor(color: number);
    /**
     * Get shadow color of the RenderNode.
     *
     * @returns { number } - Returns the shadow color of the RenderNode. Colors are defined as ARGB format represented by number.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get shadowColor(): number;
    /**
     * Set shadow offset of the RenderNode.
     *
     * @param { Offset } offset - the shadow offset of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set shadowOffset(offset: Offset);
    /**
     * Get shadow offset of the RenderNode.
     *
     * @returns { Offset } - Returns the shadow offset of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get shadowOffset(): Offset;
    /**
     * Set shadow alpha of the RenderNode.
     *
     * @param { number } alpha - the shadow alpha of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set shadowAlpha(alpha: number);
    /**
     * Get shadow alpha of the RenderNode.
     *
     * @returns { number } - Returns the shadow alpha of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get shadowAlpha(): number;
    /**
     * Set shadow elevation of the RenderNode.
     *
     * @param { number } elevation - the shadow elevation of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set shadowElevation(elevation: number);
    /**
     * Get shadow elevation of the RenderNode.
     *
     * @returns { number } - Returns the shadow elevation of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get shadowElevation(): number;
    /**
     * Set shadow radius of the RenderNode.
     *
     * @param { number } radius - the shadow radius of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    set shadowRadius(radius: number);
    /**
     * Get shadow radius of the RenderNode.
     *
     * @returns { number } - Returns the shadow radius of the RenderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get shadowRadius(): number;
    /**
     * Draw Method. Executed when the associated RenderNode is onDraw.
     *
     * @param { DrawContext } context - The DrawContext will be used when executed draw method.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    draw(context: DrawContext): void;
    /**
     * Invalidate the RenderNode, which will cause a re-render of the RenderNode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    invalidate(): void;
}
