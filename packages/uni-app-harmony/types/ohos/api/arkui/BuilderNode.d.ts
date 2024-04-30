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
import { UIContext } from '../@ohos.arkui.UIContext';
import { FrameNode } from './FrameNode';
import { Size } from './Graphics';
/**
 * Render type of the node using for indicating that
 * if the node will be shown on the display or rendered to a texture
 *
 * @enum { number } Render type
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare enum NodeRenderType {
    /**
     * Display type.The node will be shown on the display.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    RENDER_TYPE_DISPLAY = 0,
    /**
     * Exporting texture type.The node will be render to a  texture.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    RENDER_TYPE_TEXTURE = 1
}
/**
 * RenderOptions info.
 *
 * @interface RenderOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export interface RenderOptions {
    /**
     * The ideal size of the node.
     * @type { ?Size } selfIdealSize - The ideal size of the node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    selfIdealSize?: Size;
    /**
     * Render type of the node.
     * @type { ?NodeRenderType } type - Render type of the node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    type?: NodeRenderType;
    /**
     * The surfaceId of a texture consumer
     * @type { ?string } surfaceId - surfaceId of a consumer who can receive the texture of the Node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    surfaceId?: string;
}
/**
 * Defines BuilderNode.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export class BuilderNode<Args extends Object[]> {
    /**
     * Constructor.
     *
     * @param { UIContext } uiContext - uiContext used to create the BuilderNode
     * @param { RenderOptions } options - Render options of the Builder Node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    constructor(uiContext: UIContext, options?: RenderOptions);
    /**
     * Build the BuilderNode with the builder.
     *
     * @param { WrappedBuilder<Args> } builder - Defined the builder will be called to build the node.
     * @param { Object } arg - Defined the args will be used in the builder.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    build(builder: WrappedBuilder<Args>, arg?: Object): void;
    /**
     * Update the BuilderNode based on the provided parameters.
     *
     * @param { Object } arg - Parameters used to update the BuilderNode, which must match the types required by the builder bound to the BuilderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    update(arg: Object): void;
    /**
     * Get the FrameNode in BuilderNode.
     *
     * @returns { FrameNode | null } - Returns a FrameNode inside the BuilderNode, or null if not contained.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    getFrameNode(): FrameNode | null;
    /**
     * Dispatch touchEvent to targetNode.
     *
     * @param { TouchEvent } event - The touchEvent which will be sent to the targetNode.
     * @returns { boolean } - Returns true if the TouchEvent has been successfully posted to the targetNode, false otherwise.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    postTouchEvent(event: TouchEvent): boolean;
}
