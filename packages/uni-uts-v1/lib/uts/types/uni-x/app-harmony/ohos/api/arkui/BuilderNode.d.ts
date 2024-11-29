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
/**
 * Render type of the node using for indicating that
 * if the node will be shown on the display or rendered to a texture
 *
 * @enum { number } Render type
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare enum NodeRenderType {
    /**
     * Display type.The node will be shown on the display.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Display type.The node will be shown on the display.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    RENDER_TYPE_DISPLAY = 0,
    /**
     * Exporting texture type.The node will be render to a  texture.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Exporting texture type.The node will be render to a  texture.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
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
/**
 * RenderOptions info.
 *
 * @interface RenderOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export interface RenderOptions {
    /**
     * The ideal size of the node.
     * @type { ?Size } selfIdealSize - The ideal size of the node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * The ideal size of the node.
     * @type { ?Size } selfIdealSize - The ideal size of the node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    selfIdealSize?: Size;
    /**
     * Render type of the node.
     * @type { ?NodeRenderType } type - Render type of the node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Render type of the node.
     * @type { ?NodeRenderType } type - Render type of the node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    type?: NodeRenderType;
    /**
     * The surfaceId of a texture consumer
     * @type { ?string } surfaceId - surfaceId of a consumer who can receive the texture of the Node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * The surfaceId of a texture consumer
     * @type { ?string } surfaceId - surfaceId of a consumer who can receive the texture of the Node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    surfaceId?: string;
}
/**
 * BuildOptions info.
 *
 * @interface BuildOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export interface BuildOptions {
    /**
     * Build type of the Builder.
     * @type { ?boolean } nestingBuilderSupported - Build type of the Builder.
     * Indicates whether support the type that WrappedBuilder contains builder used different params.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    nestingBuilderSupported?: boolean;
}
/**
 * Defines BuilderNode.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines BuilderNode.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
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
    /**
     * Constructor.
     *
     * @param { UIContext } uiContext - uiContext used to create the BuilderNode
     * @param { RenderOptions } options - Render options of the Builder Node
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
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
    /**
     * Build the BuilderNode with the builder.
     *
     * @param { WrappedBuilder<Args> } builder - Defined the builder will be called to build the node.
     * @param { Object } arg - Defined the args will be used in the builder.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    build(builder: WrappedBuilder<Args>, arg?: Object): void;
    /**
     * Build the BuilderNode with the builder.Support the type that WrappedBuilder contains builder used different params.
     *
     * @param { WrappedBuilder<Args> } builder - Defined the builder will be called to build the node.
     * @param { Object } arg - Defined the args will be used in the builder.
     * @param { BuildOptions } options - Defined the options will be used when build.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    build(builder: WrappedBuilder<Args>, arg: Object, options: BuildOptions): void;
    /**
     * Update the BuilderNode based on the provided parameters.
     *
     * @param { Object } arg - Parameters used to update the BuilderNode, which must match the types required by the builder bound to the BuilderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Update the BuilderNode based on the provided parameters.
     *
     * @param { Object } arg - Parameters used to update the BuilderNode, which must match the types required by the builder bound to the BuilderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
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
    /**
     * Get the FrameNode in BuilderNode.
     *
     * @returns { FrameNode | null } - Returns a FrameNode inside the BuilderNode, or null if not contained.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
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
    /**
     * Dispatch touchEvent to targetNode.
     *
     * @param { TouchEvent } event - The touchEvent which will be sent to the targetNode.
     * @returns { boolean } - Returns true if the TouchEvent has been successfully posted to the targetNode, false otherwise.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    postTouchEvent(event: TouchEvent): boolean;
    /**
     * Dispose the BuilderNode immediately.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    dispose(): void;
    /**
     * Reuse the BuilderNode based on the provided parameters.
     *
     * @param { Object } [param] - Parameters for reusing BuilderNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reuse(param?: Object): void;
    /**
     * Recycle the BuilderNode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    recycle(): void;
    /**
     * Notify BuilderNode to update the configuration to trigger a reload of the BuilderNode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    updateConfiguration(): void;
}
