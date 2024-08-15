/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of invoiceAssistant module.
 * @kit AccountKit
 */
import type { AsyncCallback } from '@ohos.base';
import type common from '@ohos.app.ability.common';
/**
 * This module provides the capabilities to use invoiceAssistant.
 *
 * @namespace invoiceAssistant
 * @syscap SystemCapability.HuaweiID.InvoiceAssistant
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace invoiceAssistant {
    /**
     * Show invoice title select page.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<InvoiceTitle> } Returns InvoiceTitle.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1010060001 - The operation was canceled by the user.
     * @throws { BusinessError } 1010060002 - System internal error.
     * @throws { BusinessError } 1010060003 - The application is not authorized.
     * @throws { BusinessError } 1010060004 - Too frequent API calls.
     * @throws { BusinessError } 1010060005 - Network connection error.
     * @throws { BusinessError } 1010060006 - The HUAWEI ID is not signed in.
     * @throws { BusinessError } 1010060007 - Failed to create a invoice title because the title already exists.
     * @throws { BusinessError } 1010060008 - The invoice service does not support the logged HUAWEI ID.
     * @syscap SystemCapability.HuaweiID.InvoiceAssistant
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function selectInvoiceTitle(context: common.Context): Promise<InvoiceTitle>;
    /**
     * InvoiceTitle object.
     *
     * @typedef InvoiceTitle
     * @syscap SystemCapability.HuaweiID.InvoiceAssistant
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface InvoiceTitle {
        /**
         * InvoiceTitle type.
         *
         * @type { string }
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        type: string;
        /**
         * Invoice title.
         *
         * @type { string }
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        title: string;
        /**
         * InvoiceTitle taxNumber.
         *
         * @type { string }
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        taxNumber: string;
        /**
         * InvoiceTitle companyAddress.
         *
         * @type { string }
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        companyAddress: string;
        /**
         * InvoiceTitle telephone.
         *
         * @type { string }
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        telephone: string;
        /**
         * InvoiceTitle bankName.
         *
         * @type { string }
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        bankName: string;
        /**
         * InvoiceTitle bankAccount.
         *
         * @type { string }
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        bankAccount: string;
    }
    /**
     * Indicates the invoiceAssistant error code.
     *
     * @enum { number }
     * @syscap SystemCapability.HuaweiID.InvoiceAssistant
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum InvoiceAssistantErrorCode {
        /**
         * The operation was canceled by the user.
         *
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        USER_CANCELED = 1010060001,
        /**
         * System internal error.
         *
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        SYSTEM_ERROR = 1010060002,
        /**
         * The application is not authorized.
         *
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        APP_NOT_AUTHORIZED = 1010060003,
        /**
         * Too frequent API calls.
         *
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        FREQUENT_CALLS = 1010060004,
        /**
         * Network connection error.
         *
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        NETWORK_ERROR = 1010060005,
        /**
         * The HUAWEI ID is not signed in.
         *
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ACCOUNT_NOT_LOGGED_IN = 1010060006,
        /**
         * Failed to create a invoice title because the title already exists.
         *
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        INVOICE_TITLE_EXISTS = 1010060007,
        /**
         * The invoice service does not support the logged HUAWEI ID.
         *
         * @syscap SystemCapability.HuaweiID.InvoiceAssistant
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNSUPPORTED = 1010060008
    }
}
export default invoiceAssistant;
