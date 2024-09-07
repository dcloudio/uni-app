/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
* @file ProductView Manager Interface Description file
* @kit StoreKit
*/
import type common from '@ohos.app.ability.common';
import type Want from '@ohos.app.ability.Want';
import type { Callback, ErrorCallback } from '@ohos.base';
/**
 * Class that is used to declare methods of open view provide by AppGallery.
 *
 * @namespace productViewManager
 * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
 * @StageModelOnly
 * @since 4.1.0(11)
 */
declare namespace productViewManager {
    /**
     * The result from received data.
     *
     * @enum { number }
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum ReceiveDataResult {
        /**
         * Indicates that operation is success.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        SUCCESS = 1000,
        /**
         * Indicates that operation is fail.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        FAILURE = 1001,
        /**
         * Exception occurrence.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXCEPTION = 1002
    }
    /**
     * Result of opening the harmony service detail page.
     *
     * @typedef ServiceViewReceiveData
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ServiceViewReceiveData {
        /**
         * Indicates result of opening the harmony service detail page.
         *
         * @type { ReceiveDataResult }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly result: ReceiveDataResult;
        /**
         * Indicates description of opening harmony service detail page result.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly msg: string;
        /**
         * Indicates information of the harmony service detail page.
         *
         * @type { object }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly formInfo: {
            [key: string]: Object;
        };
    }
    /**
     * Callback of opening the harmony service detail page which is for adding card to desktop.
     *
     * @typedef ServiceViewCallback
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ServiceViewCallback {
        /**
         * Indicates callback function when receive the page information.
         *
         * @type { ?Callback<ServiceViewReceiveData> }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        onReceive?: Callback<ServiceViewReceiveData>;
        /**
         * Indicates callback function when receive an error.
         *
         * @type { ?ErrorCallback }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        onError?: ErrorCallback;
    }
    /**
     * Callback of opening the detail page.
     *
     * @typedef ProductViewCallback
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ProductViewCallback {
        /**
         * Indicates callback function when receive an error.
         *
         * @type { ?ErrorCallback }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        onError?: ErrorCallback;
    }
    /**
     * Request to open the harmony service detail page which is for adding card to desktop.
     *
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @param { Want } want - Indicates the ability to start.
     * @param { ServiceViewCallback } [callback] - callback for opening the harmony service detail page.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function loadService(context: common.UIAbilityContext, want: Want, callback?: ServiceViewCallback): void;
    /**
     * Request to open the application detail page.
     *
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @param { Want } want - Indicates the ability to start.
     * @param { ProductViewCallback } [callback] - callback for opening the application detail page.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function loadProduct(context: common.UIAbilityContext, want: Want, callback?: ProductViewCallback): void;
}
export default productViewManager;
