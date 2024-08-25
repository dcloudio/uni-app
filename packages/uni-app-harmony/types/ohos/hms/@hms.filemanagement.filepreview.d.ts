/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines the capabilities of preview module.
 * @kit PreviewKit
 */
import type { AsyncCallback } from '@ohos.base';
import type Context from '@ohos.inner.application.Context';
/**
 * This module provides the capability to preview the file.
 * @namespace filePreview
 * @syscap SystemCapability.FileManagement.FilePreview.Core
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace filePreview {
    /**
     * open file preview. display in dialog winodow. Repeated opening within 1 second is invalid.
     *
     * @param { Context } context - context.
     * @param { PreviewInfo } file - file information.
     * @param { DisplayInfo } [ info ] - window display rect.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    function openPreview(context: Context, file: PreviewInfo, info?: DisplayInfo): Promise<void>;
    /**
     * open file preview. display in dialog winodow. Repeated opening within 1 second is invalid.
     *
     * @param { Context } context - context.
     * @param { PreviewInfo } file - file information.
     * @param { DisplayInfo } info - window display rect.
     * @param { AsyncCallback<void> } callback - The callback of the openPreview.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    function openPreview(context: Context, file: PreviewInfo, info: DisplayInfo, callback: AsyncCallback<void>): void;
    /**
     * Multiple file open preview. Only valid on mobile. Repeated opening within 1 second is invalid.
     *
     * @param { Context } context - context.
     * @param { Array<PreviewInfo> } files - Preview file list.
     * @param { number } [ index ] - index of select file. Default is zero.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    function openPreview(context: Context, files: Array<PreviewInfo>, index?: number): Promise<void>;
    /**
     * Determine whether the file can be previewed
     *
     * @param { Context } context - context.
     * @param { string } uri - file uri.
     * @returns { Promise<boolean> } The promise returned by the function.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    function canPreview(context: Context, uri: string): Promise<boolean>;
    /**
     * Determine whether the file can be previewed
     *
     * @param { Context } context - context.
     * @param { string } file - file uri.
     * @param { AsyncCallback<boolean> } callback - The callback of the canPreview.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    function canPreview(context: Context, uri: string, callback: AsyncCallback<boolean>): void;
    /**
     * Is the preview window open
     *
     * @param { Context } context - context.
     * @returns { Promise<boolean> } The promise returned by the function.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    function hasDisplayed(context: Context): Promise<boolean>;
    /**
     * Is the preview window open
     *
     * @param { Context } context - context.
     * @param { AsyncCallback<boolean> } callback - The callback of the hasDisplayed.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    function hasDisplayed(context: Context, callback: AsyncCallback<boolean>): void;
    /**
     * close the preview window
     *
     * @param { Context } context - context.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    function closePreview(context: Context): Promise<void>;
    /**
     * close the preview window
     *
     * @param { Context } context - context.
     * @param { AsyncCallback<void> } callback - The callback of the close.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    function closePreview(context: Context, callback: AsyncCallback<void>): void;
    /**
     * load data when the preview window already existed. Repeated opening within 100 milliseconds is invalid.
     *
     * @param { Context } context - context.
     * @param { PreviewInfo } file - file information.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    function loadData(context: Context, file: PreviewInfo): Promise<void>;
    /**
     * load data when the preview window already existed. Repeated opening within 100 milliseconds is invalid.
     *
     * @param { Context } context - context.
     * @param { PreviewInfo } file - file information.
     * @param { AsyncCallback<boolean> } callback - The callback of the canPreview.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    function loadData(context: Context, file: PreviewInfo, callback: AsyncCallback<void>): void;
    /**
     * Load multiple files when the preview window already existed. Only valid on mobile. Repeated opening within 100 milliseconds is invalid.
     *
     * @param { Context } context - context.
     * @param { Array<PreviewInfo> } files - Preview file list.
     * @param { number } [ index ] - index of select file. Default is zero.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - invalid input parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    function loadData(context: Context, files: Array<PreviewInfo>, index?: number): Promise<void>;
    /**
     * File preview information
     *
     * @typedef PreviewInfo
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface PreviewInfo {
        /**
         * title name.
         * @type { ?string }
         * @syscap SystemCapability.FileManagement.FilePreview.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * file uri.
         * @type { string }
         * @syscap SystemCapability.FileManagement.FilePreview.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        uri: string;
        /**
         * file mimeType
         * @type { string }
         * @syscap SystemCapability.FileManagement.FilePreview.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        mimeType: string;
    }
    /**
     * Preview window position properties
     *
     * @typedef DisplayInfo
     * @syscap SystemCapability.FileManagement.FilePreview.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface DisplayInfo {
        /**
         * the display window level x.
         * @type { number }
         * @syscap SystemCapability.FileManagement.FilePreview.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        x: number;
        /**
         * the display window level y.
         * @type { number }
         * @syscap SystemCapability.FileManagement.FilePreview.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        y: number;
        /**
         * the display window width.
         * @type { ?number }
         * @syscap SystemCapability.FileManagement.FilePreview.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        width?: number;
        /**
         * the display window height.
         * @type { ?number }
         * @syscap SystemCapability.FileManagement.FilePreview.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        height?: number;
    }
}
export default filePreview;
