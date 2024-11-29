/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Update Manager Interface Description file
 * @kit StoreKit
 */
import type common from '@ohos.app.ability.common';
/**
 * The functions of app update manager.
 *
 * @namespace updateManager
 * @syscap SystemCapability.AppGalleryService.Distribution.Update
 * @since 5.0.0(12)
 */
declare namespace updateManager {
    /**
     * Enum for Detect New Version
     *
     * @enum {number}
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @since 5.0.0(12)
     */
    export enum UpdateAvailableCode {
        /**
         * A new version is available.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        LATER_VERSION_EXIST = 1,
        /**
         * No new version
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        LATER_VERSION_NOT_EXIST = 0
    }
    /**
     * Enum for show update dialog result
     *
     * @enum {number}
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @since 5.0.0(12)
     */
    export enum ShowUpdateResultCode {
        /**
         * Show update dialog success
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        SHOW_DIALOG_SUCCESS = 0,
        /**
         * Show update dialog fail
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        SHOW_DIALOG_FAILURE = 1
    }
    /**
    * Return check update reuslt
    *
    * @typedef CheckUpdateResult
    * @syscap SystemCapability.AppGalleryService.Distribution.Update
    * @since 5.0.0(12)
    */
    export interface CheckUpdateResult {
        /**
         * Whether can update or not.
         * 0：do not update; 1:has new version to update
         * @type { UpdateAvailableCode }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @since 5.0.0(12)
         */
        readonly updateAvailable: UpdateAvailableCode;
    }
    /**
     * Check for Update.
     *
     * @param { common.UIAbilityContext } context - the context of an ability
     * @returns { Promise<CheckUpdateResult> } The promise of CheckUpdateResult returned by the function.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1009400001 - SA connect error
     * @throws { BusinessError } 1009400002 - Request to service error.
     * @throws { BusinessError } 1009400003 - Network error.
     * @throws { BusinessError } 1009400004 - The application is not in the foreground.
     * @throws { BusinessError } 1009400005 - Not agreeing to the privacy agreement.
     * @throws { BusinessError } 1009400006 - Time limited.
     * @throws { BusinessError } 1009400007 - Other error.
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    function checkAppUpdate(context: common.UIAbilityContext): Promise<CheckUpdateResult>;
    /**
     * Displaying the update dialog.
     *
     * @param { common.UIAbilityContext} context - the context of an ability
     * @returns { Promise<ShowUpdateResultCode> } The promise of ShowUpdateResultCode returned by the function.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1009400001 - SA connection error.
     * @throws { BusinessError } 1009400002 - Request to service error.
     * @throws { BusinessError } 1009400004 - The application is not in the foreground.
     * @throws { BusinessError } 1009400005 - Not agreeing to the privacy agreement.
     * @throws { BusinessError } 1009400007 - Other error.
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    function showUpdateDialog(context: common.UIAbilityContext): Promise<ShowUpdateResultCode>;
}
export default updateManager;
