/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * Enum for DownloadIconStyle
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export declare enum DownloadIconStyle {
    /**
     * FULL_FILLED type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    FULL_FILLED = 1,
    /**
     * LINES type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    LINES = 2
}
/**
 * Enum for DownloadDescription
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export declare enum DownloadDescription {
    /**
     * Description is DOWNLOAD.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    DOWNLOAD = 1,
    /**
     * Description is DOWNLOAD_FILE.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    DOWNLOAD_FILE = 2,
    /**
     * Description is SAVE.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    SAVE = 3,
    /**
     * Description is SAVE_IMAGE.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    SAVE_IMAGE = 4,
    /**
     * Description is SAVE_FILE.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    SAVE_FILE = 5,
    /**
     * Description is DOWNLOAD_AND_SHARE.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    DOWNLOAD_AND_SHARE = 6,
    /**
     * Description is RECEIVE.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    RECEIVE = 7,
    /**
     * Description is CONTINUE_TO_RECEIVE.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    CONTINUE_TO_RECEIVE = 8
}
/**
 * Enum for DownloadDescription
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export declare enum DownloadLayoutDirection {
    /**
     * Layout direction is HORIZONTAL.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    HORIZONTAL = 0,
    /**
     * Layout direction is VERTICAL.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    VERTICAL = 1
}
/**
 * Defines the download content options.
 *
 * @interface DownloadContentOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export interface DownloadContentOptions {
    /**
     * DownloadFileButton icon Style.
     *
     * @type { ?DownloadIconStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    icon?: DownloadIconStyle;
    /**
     * DownloadFileButton description.
     *
     * @type { ?DownloadDescription }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    text?: DownloadDescription;
}
/**
 * Defines the DownloadFileButton style option.
 *
 * @interface DownloadStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export interface DownloadStyleOptions {
    /**
     * Icon size.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    iconSize?: Dimension;
    /**
     * Layout direction.
     *
     * @type { ?DownloadLayoutDirection }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    layoutDirection?: DownloadLayoutDirection;
    /**
     * Font size.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fontSize?: Dimension;
    /**
     * Font Style.
     *
     * @type { ?FontStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fontStyle?: FontStyle;
    /**
     * Font weight.
     *
     * @type { ?(number | FontWeight | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fontWeight?: number | FontWeight | string;
    /**
     * Font family.
     *
     * @type { ?(string | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fontFamily?: string | Resource;
    /**
     * Font color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fontColor?: ResourceColor;
    /**
     * Icon color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    iconColor?: ResourceColor;
    /**
     * Text and Icon space.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    textIconSpace?: Dimension;
}
/**
 * Declare Component DownloadFileButton
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
@Component
export declare struct DownloadFileButton {
    /**
     * Set DownloadFileButton Content.
     *
     * @type { DownloadContentOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    @State
    contentOptions: DownloadContentOptions;
    /**
     * Set DownloadFileButton Style.
     *
     * @type { DownloadStyleOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    @State
    styleOptions: DownloadStyleOptions;
}
