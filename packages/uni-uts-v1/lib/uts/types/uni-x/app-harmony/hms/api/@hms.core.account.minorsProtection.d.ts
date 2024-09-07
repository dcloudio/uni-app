/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file Define the feature of minors protection for HUAWEI ID.
 * @kit AccountKit
 */
import type common from '@ohos.app.ability.common';
/**
 * minorsProtection module.
 * @namespace minorsProtection
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace minorsProtection {
    /**
     * Gets the information about minors protection, such as minors protection mode and age group.
     * @returns { MinorsProtectionInfo } minors protection information.
     * @throws { BusinessError } 1001502009 - Internal error.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
    */
    function getMinorsProtectionInfoSync(): MinorsProtectionInfo;
    /**
     * Gets the information about minors protection, such as minors protection mode and age group.
     * @returns { Promise<MinorsProtectionInfo> } promise of minors protection information.
     * @throws { BusinessError } 1001502009 - Internal error.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
    */
    function getMinorsProtectionInfo(): Promise<MinorsProtectionInfo>;
    /**
     * Start the password-verification page to verify minors protection credential.
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<boolean> } promise of verification result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1001502009 - Internal error.
     * @throws { BusinessError } 1009900002 - The minors mode is not enabled.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
    */
    function verifyMinorsProtectionCredential(context: common.Context): Promise<boolean>;
    /**
     * Lead user to start the page to turn on minors mode.
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<void> } promise of void.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1001502009 - Internal error.
     * @throws { BusinessError } 1009900003 - The user canceled the operation.
     * @throws { BusinessError } 1009900005 - The minors mode is already on.
     * @throws { BusinessError } 1009900007 - Unsupported HUAWEI ID.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
    */
    function leadToTurnOnMinorsMode(context: common.Context): Promise<void>;
    /**
     * Lead user to start the page to turn off minors mode.
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<void> } promise of void.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1001502009 - Internal error.
     * @throws { BusinessError } 1009900003 - The user canceled the operation.
     * @throws { BusinessError } 1009900006 - The minors mode is already off.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
    */
    function leadToTurnOffMinorsMode(context: common.Context): Promise<void>;
    /**
     * Defines the information about minors protection.
     * @typedef MinorsProtectionInfo
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface MinorsProtectionInfo {
        /**
         * Minors protection mode.
         * @type { boolean }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        minorsProtectionMode: boolean;
        /**
         * Age group type.
         * @type { ?AgeGroup }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ageGroup?: AgeGroup;
    }
    /**
     * Defines the information about age group.
     * @typedef AgeGroup
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AgeGroup {
        /**
         * The lower limit of age group.
         * @type { number }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        lowerAge: number;
        /**
         * The upper limit of age group.
         * @type { number }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        upperAge: number;
    }
    /**
     * Enumerates the error codes of the extendService.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum MinorsModeErrorCode {
        /**
         * The minors mode is not enabled.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        MINORS_MODE_NOT_ENABLED = 1009900002,
        /**
         * The user canceled the operation.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        USER_CANCELED = 1009900003,
        /**
         * The minors mode is already on.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        MINORS_MODE_ALREADY_ON = 1009900005,
        /**
         * The minors mode is already off.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        MINORS_MODE_ALREADY_OFF = 1009900006,
        /**
         * Unsupported HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNSUPPORTED_ACCOUNT = 1009900007
    }
}
export default minorsProtection;
