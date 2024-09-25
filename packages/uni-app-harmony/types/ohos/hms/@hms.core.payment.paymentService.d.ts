/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module provides the capabilities to use payment service.
 * @kit PaymentKit
 */
import type { AsyncCallback } from '@ohos.base';
import type common from '@ohos.app.ability.common';
/**
 * This module provides the capabilities to use payment service.
 *
 * @namespace paymentService
 * @syscap SystemCapability.Payment.PaymentService
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace paymentService {
    /**
     * Pull up PaymentService checkout
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } orderStr - order information
     * @returns { Promise<void> } - void.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930001 - Pay failed.
     * @throws { BusinessError } 1001930002 - The transaction has been processed.
     * @throws { BusinessError } 1001930010 - Duplicate request.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 4.1.0(11)
     */
    function requestPayment(context: common.UIAbilityContext, orderStr: string): Promise<void>;
    /**
     * Pull up PaymentService checkout
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } orderStr - order information
     * @param { AsyncCallback<void> } callback - void.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930001 - Pay failed.
     * @throws { BusinessError } 1001930002 - The transaction has been processed.
     * @throws { BusinessError } 1001930010 - Duplicate request.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 4.1.0(11)
     */
    function requestPayment(context: common.UIAbilityContext, orderStr: string, callback: AsyncCallback<void>): void;
    /**
     * Pull up PaymentService withhold checkout
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } contractStr - contract information
     * @returns { Promise<void> } - void.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930002 - The transaction has been processed.
     * @throws { BusinessError } 1001930003 - Withhold failed.
     * @throws { BusinessError } 1001930010 - Duplicate request.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 5.0.0(12)
     */
    function requestContract(context: common.UIAbilityContext, contractStr: string): Promise<void>;
    /**
     * Pull up PaymentService withhold checkout
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } contractStr - contract information
     * @param { AsyncCallback<void> } callback - void.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930002 - The transaction has been processed.
     * @throws { BusinessError } 1001930003 - Withhold failed.
     * @throws { BusinessError } 1001930010 - Duplicate request.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 5.0.0(12)
     */
    function requestContract(context: common.UIAbilityContext, contractStr: string, callback: AsyncCallback<void>): void;
}
export default paymentService;
