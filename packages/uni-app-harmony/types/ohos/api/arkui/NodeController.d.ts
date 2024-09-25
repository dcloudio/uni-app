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
 * Defined the controller of node container.Provides lifecycle callbacks for the associated NodeContainer
 * and methods to control the child node of the NodeContainer.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defined the controller of node container.Provides lifecycle callbacks for the associated NodeContainer
 * and methods to control the child node of the NodeContainer.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export abstract class NodeController {
    /**
     * MakeNode Method. Used to build a node tree and return the a FrameNode or null, and
     * attach the return result to the associated NodeContainer.
     * Executed when the associated NodeContainer is created or the rebuild function is called.
     *
     * @param { UIContext } uiContext - uiContext used to makeNode
     * @returns { FrameNode | null } - Returns a FrameNode or null.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * MakeNode Method. Used to build a node tree and return the a FrameNode or null, and
     * attach the return result to the associated NodeContainer.
     * Executed when the associated NodeContainer is created or the rebuild function is called.
     *
     * @param { UIContext } uiContext - uiContext used to makeNode
     * @returns { FrameNode | null } - Returns a FrameNode or null.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    abstract makeNode(uiContext: UIContext): FrameNode | null;
    /**
     * AboutToResize Method. Executed when the associated NodeContainer performs the measure method.
     *
     * @param { Size } size - size used to resize
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * AboutToResize Method. Executed when the associated NodeContainer performs the measure method.
     *
     * @param { Size } size - size used to resize
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    aboutToResize?(size: Size): void;
    /**
     * AboutToAppear Method. Executed when the associated NodeContainer is aboutToAppear.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * AboutToAppear Method. Executed when the associated NodeContainer is aboutToAppear.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    aboutToAppear?(): void;
    /**
     * AboutToDisappear Method. Executed when the associated NodeContainer is aboutToDisappear.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * AboutToDisappear Method. Executed when the associated NodeContainer is aboutToDisappear.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    aboutToDisappear?(): void;
    /**
     * Rebuild Method. Used to invoke the makeNode method.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Rebuild Method. Used to re invoke the makeNode method.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    rebuild(): void;
    /**
     * OnTouchEvent Method. Executed when associated NodeContainer is touched.
     *
     * @param { TouchEvent } event - The TouchEvent when associated NodeContainer is touched.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * OnTouchEvent Method. Executed when associated NodeContainer is touched.
     *
     * @param { TouchEvent } event - The TouchEvent when associated NodeContainer is touched.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onTouchEvent?(event: TouchEvent): void;
}
