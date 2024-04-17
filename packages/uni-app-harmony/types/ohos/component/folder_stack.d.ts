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
 * Provides ports for stacking containers.
 *
 * @interface FolderStackInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
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
     * Enable the animation of folderStack.
     *
     * @param { boolean } value - enable the animation of folderStatus changed
     * @returns { FolderStackAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
    autoHalfFold(value: boolean): FolderStackAttribute;
}
/**
 * Defines FolderStack Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare const FolderStack: FolderStackInterface;
/**
 * Defines FolderStack Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare const FolderStackInstance: FolderStackAttribute;
