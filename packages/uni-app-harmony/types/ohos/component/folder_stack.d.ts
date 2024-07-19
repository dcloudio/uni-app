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
 * Import the WindowMode type object for onHoverStatusChange.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 12
 */
declare type WindowMode = import('../api/@ohos.window').WindowMode;
/**
 * Provides ports for stacking containers.
 *
 * @interface FolderStackInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Provides ports for stacking containers.
 *
 * @interface FolderStackInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
interface FolderStackInterface {
    /**
     * Defines the constructor of folderStack.
     *
     * @param { object } value - id of children need to be show in upperItem
     * @returns { FolderStackAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Defines the constructor of folderStack.
     *
     * @param { object } value - id of children need to be show in upperItem
     * @returns { FolderStackAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    (value?: {
        upperItems?: Array<string>;
    }): FolderStackAttribute;
}
/**
/**
 * @extends CommonMethod<FolderStackAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * @extends CommonMethod<FolderStackAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare class FolderStackAttribute extends CommonMethod<FolderStackAttribute> {
    /**
     * Set the alignment of folderStack.
     *
     * @param { Alignment } value - align of children
     * @returns { FolderStackAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Set the alignment of folderStack.
     *
     * @param { Alignment } value - align of children
     * @returns { FolderStackAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    alignContent(value: Alignment): FolderStackAttribute;
    /**
  * Callback folderState when the folderState changes
  *
  * @param { function } callback - executed when folderStatus changed
  * @returns { FolderStackAttribute }
  * @syscap SystemCapability.ArkUI.ArkUI.Full
  * @crossplatform
  * @since 11
  */
    /**
    * Callback folderState when the folderState changes
    *
    * @param { function } callback - executed when folderStatus changed
    * @returns { FolderStackAttribute }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    onFolderStateChange(callback: (event: {
        /**
         * folder state.
         *
         * @type { FoldStatus }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        foldStatus: FoldStatus;
    }) => void): FolderStackAttribute;
    /**
    * Callback hoverStatus|folderStatus|rotation|windowMode when the hoverStatus changes
    *
    * @param { function } handler - executed when hoverStatus changed
    * @returns { FolderStackAttribute }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @since 12
    */
    onHoverStatusChange(handler: (param: HoverEventParam) => void): FolderStackAttribute;
    /**
     * Enable the animation of folderStack.
     *
     * @param { boolean } value - enable the animation of folderStatus changed
     * @returns { FolderStackAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Enable the animation of folderStack.
     *
     * @param { boolean } value - enable the animation of folderStatus changed
     * @returns { FolderStackAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enableAnimation(value: boolean): FolderStackAttribute;
    /**
     * Enable auto halfFolder when orientation.
     *
     * @param { boolean } value - enable auto halfFold
     * @returns { FolderStackAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Enable auto halfFolder when orientation.
     *
     * @param { boolean } value - enable auto halfFold
     * @returns { FolderStackAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    autoHalfFold(value: boolean): FolderStackAttribute;
}
/**
 * Defines the Embed Data info.
 *
 * @interface HoverEventParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 12
 */
declare interface HoverEventParam {
    /**
     * Folder state.
     *
     * @type { FoldStatus }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    foldStatus: FoldStatus;
    /**
     * Is hover mode
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    isHoverMode: boolean;
    /**
     * App rotation
     *
     * @type { AppRotation }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    appRotation: AppRotation;
    /**
     * Window mode
     *
     * @type { WindowMode }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    windowMode: WindowMode;
}
/**
 * Defines FolderStack Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines FolderStack Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare const FolderStack: FolderStackInterface;
/**
 * Defines FolderStack Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines FolderStack Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare const FolderStackInstance: FolderStackAttribute;
