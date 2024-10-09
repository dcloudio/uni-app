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
import { NodeRenderType, RenderOptions } from './BuilderNode';
import { FrameNode } from './FrameNode';
/**
 * Defines XComponent Node.
 *
 * @extends FrameNode
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 11
 * @deprecated since 12
 */
export declare class XComponentNode extends FrameNode {
    /**
     * constructor.
     *
     * @param { UIContext } uiContext - UIContext used to create the FrameNode
     * @param { RenderOptions } options - Render options of the Builder Node
     * @param { string } id - XComponent id defined by the application
     * @param { XComponentType } type - XComponent type
     * @param { string } libraryName - The name of the library to be loaded by XComponent
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     * @deprecated since 12
     */
    constructor(uiContext: UIContext, options: RenderOptions, id: string, type: XComponentType, libraryName?: string);
    /**
     * Called when the XComponent surface has been created.
     *
     * @param { Object } event - event from native when the library loaded
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     * @deprecated since 12
     */
    onCreate(event?: Object): void;
    /**
     * Called when the XComponent surface has been destroyed.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     * @deprecated since 12
     */
    onDestroy(): void;
    /**
     * Set the render type of the builderNode.
     *
     * @param { NodeRenderType } type - render type
     * @returns { boolean } - Returns if change the render type successfully.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     * @deprecated since 12
     */
    changeRenderType(type: NodeRenderType): boolean;
}
