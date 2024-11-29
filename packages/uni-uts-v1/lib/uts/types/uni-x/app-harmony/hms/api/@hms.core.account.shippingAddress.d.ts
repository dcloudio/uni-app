/*
* Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file Defines the feature of providing the HUAWEI ID-associated shipping address management service.
 * @kit AccountKit
 */
import type common from '@ohos.app.ability.common';
/**
 * This module provides the shipping address management service APIs.
 * @namespace shippingAddress
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace shippingAddress {
    /**
     * Enumerates the error codes of the shipping address management service.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum ShippingAddressErrorCode {
        /**
         * Internal error.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        INTERNAL_ERROR = 1008100001,
        /**
         * The network is unavailable.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        NETWORK_ERROR = 1008100002,
        /**
         * The user has not signed in with HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ACCOUNT_NOT_LOGGED_IN = 1008100003,
        /**
         * Failed to check the fingerprint of the app bundle.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PACKAGE_FINGERPRINT_CHECK_ERROR = 1008100004,
        /**
         * The app does not have the required permissions.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PERMISSION_CHECK_ERROR = 1008100005,
        /**
         * The user quits the shipping address management service without finishing.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        USER_CANCELED = 1008100006,
        /**
         * The shipping address management service does not support the HUAWEI ID that is already signed in.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNSUPPORTED = 1008100007
    }
    /**
     * Shipping address.
     * @typedef AddressInfo
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AddressInfo {
        /**
         * User name.
         * @type {string}
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly userName: string;
        /**
         * Mobile phone number.
         * @type {string}
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly mobileNumber: string;
        /**
         * Landline phone number.
         * @type {?string}
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly telNumber?: string;
        /**
         * Zip code.
         * @type {?string}
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly zipCode?: string;
        /**
         * Country/Region code.
         * @type {string}
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly countryCode: string;
        /**
         * Province name.
         * @type {string}
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly provinceName: string;
        /**
         * City name.
         * @type {string}
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly cityName: string;
        /**
         * District name.
         * @type {string}
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly districtName: string;
        /**
         * Street name.
         * @type {string}
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly streetName: string;
        /**
         * Detailed address.
         * @type {string}
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly detailedAddress: string;
    }
    /**
     * Bring up the address information page, and return the information about the selected address.
     * @param { common.Context } context - Context of an ability.
     * @returns { Promise<AddressInfo> } Promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1008100001 - Internal error.
     * @throws { BusinessError } 1008100002 - The network is unavailable.
     * @throws { BusinessError } 1008100003 - The user has not signed in with HUAWEI ID.
     * @throws { BusinessError } 1008100004 - Failed to check the fingerprint of the app bundle.
     * @throws { BusinessError } 1008100005 - The app does not have the required permissions.
     * @throws { BusinessError } 1008100006 - The user quits the shipping address management service without finishing.
     * @throws { BusinessError } 1008100007 - The shipping address management service does not support the HUAWEI ID that is already signed in.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ShippingAddress
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function chooseAddress(context: common.Context): Promise<AddressInfo>;
}
export default shippingAddress;
