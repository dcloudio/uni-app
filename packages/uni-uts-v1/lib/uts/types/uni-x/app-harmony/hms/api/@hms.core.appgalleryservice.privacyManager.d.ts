/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file privacy Manager Interface Description file
 * @kit StoreKit
 */
/**
 * Class that is used to manage the privacy information of app.
 *
 * @namespace privacyManager
 * @syscap SystemCapability.AppGalleryService.PrivacyManager
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace privacyManager {
    /**
     * Enum for app privacy manage type.
     *
     * @enum {number}
     * @syscap SystemCapability.AppGalleryService.PrivacyManager
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    export enum AppPrivacyMgmtType {
        /**
         * Unsupported code
         *
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        UNSUPPORTED = 0,
        /**
         * full mode code
         *
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        FULL_MODE = 1
    }
    /**
     * Enum for app privacy result type.
     *
     * @enum {number}
     * @syscap SystemCapability.AppGalleryService.PrivacyManager
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export enum AppPrivacyResultType {
        /**
         * Disagreed code
         *
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        DISAGREED = 0,
        /**
         * Full mode agreed code
         *
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        FULL_MODE_AGREED = 1,
        /**
         * The agreement is changed and needs to be signed again code
         *
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        REQUIRE_RESIGNING_VERSION_UPDATE = 2
    }
    /**
     * Enum for app privacy link type.
     *
     * @enum {number}
     * @syscap SystemCapability.AppGalleryService.PrivacyManager
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    export enum AppPrivacyLinkType {
        /**
         * Privacy statement link code
         *
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        PRIVACY_STATEMENT_LINK = 1,
        /**
         * User agreement code
         *
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        USER_AGREEMENT_LINK = 2
    }
    /**
     * Enum for app privacy type.
     *
     * @enum {number}
     * @syscap SystemCapability.AppGalleryService.PrivacyManager
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export enum AppPrivacyType {
        /**
         * Privacy agreement code
         *
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PRIVACY_AGREEMENT = 1,
        /**
         * User agreement code
         *
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        USER_AGREEMENT = 2
    }
    /**
     * Privacy management information for application.
     *
     * @typedef AppPrivacyMgmtInfo
     * @syscap SystemCapability.AppGalleryService.PrivacyManager
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    export interface AppPrivacyMgmtInfo {
        /**
         * Indicates type of this privacy manage information.
         *
         * @type { AppPrivacyMgmtType }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        readonly type: AppPrivacyMgmtType;
        /**
         * Indicates privacy information array of this manage information.
         *
         * @type { AppPrivacyLink[] }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        readonly privacyInfo: AppPrivacyLink[];
    }
    /**
     * Privacy link information for application.
     *
     * @typedef AppPrivacyLink
     * @syscap SystemCapability.AppGalleryService.PrivacyManager
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    export interface AppPrivacyLink {
        /**
         * Indicates type of this privacy manage information.
         *
         * @type { AppPrivacyLinkType }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        readonly type: AppPrivacyLinkType;
        /**
         * Indicates version code of agreement.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        readonly versionCode: number;
        /**
         * Indicates privacy link url of this privacy manage information.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        readonly url: string;
        /**
         * Indicates privacy identifier of this privacy manage information.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        readonly id: string;
    }
    /**
     * Privacy result for application.
     *
     * @typedef AppPrivacyResult
     * @syscap SystemCapability.AppGalleryService.PrivacyManager
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface AppPrivacyResult {
        /**
         * Indicates type of this privacy manage information.
         *
         * @type { AppPrivacyType }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly type: AppPrivacyType;
        /**
         * Indicates version code of agreement.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly versionCode: number;
        /**
         * Indicates result of this privacy manage.
         *
         * @type { AppPrivacyResultType }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly result: AppPrivacyResultType;
        /**
         * Indicates privacy identifier of this privacy manage information.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.PrivacyManager
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly id: string;
    }
    /**
     * Request to get the information of privacy management.
     *
     * @returns { AppPrivacyMgmtInfo } Returns the information of the app privacy.
     * @throws { BusinessError } 1006700001 - System internal error.
     * @throws { BusinessError } 1006700003 - The application does not use privacy manager service.
     * @syscap SystemCapability.AppGalleryService.PrivacyManager
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function getAppPrivacyMgmtInfo(): AppPrivacyMgmtInfo;
    /**
     * Request to get result of the privacy.
     *
     * @returns { AppPrivacyResult[] } Returns the results of the app privacy.
     * @throws { BusinessError } 1006700001 - System internal error.
     * @throws { BusinessError } 1006700003 - The application does not use privacy manager service.
     * @syscap SystemCapability.AppGalleryService.PrivacyManager
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getAppPrivacyResult(): AppPrivacyResult[];
    /**
     * Disable the app service, need to show privacy dialog again.
     *
     * @throws { BusinessError } 1006700001 - System internal error.
     * @throws { BusinessError } 1006700002 - The specified service extension connect failed.
     * @throws { BusinessError } 1006700003 - The application does not use privacy manager service.
     * @syscap SystemCapability.AppGalleryService.PrivacyManager
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function disableService(): void;
}
export default privacyManager;
