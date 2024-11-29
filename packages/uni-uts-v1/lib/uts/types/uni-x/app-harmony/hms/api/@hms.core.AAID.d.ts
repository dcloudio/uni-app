/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Defines AAID capability.
 * @kit PushKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * Anonymous Application Identifier(AAID), identifies an app instance running on device.
 * @namespace AAID
 * @syscap SystemCapability.Push.PushService
 * @stagemodelonly
 * @since 4.0.0(10)
 */
/**
 * Anonymous Application Identifier(AAID), identifies an app instance running on device.
 * @namespace AAID
 * @syscap SystemCapability.Push.PushService
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace AAID {
    /**
     * Get AAID.
     * @param { AsyncCallback<string> } callback - Indicates the callback to get AAID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Failed to connect to the AAID service.
     * @throws { BusinessError } 1000900007 - Internal error of the AAID service.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Get AAID.
     * @param { AsyncCallback<string> } callback - Indicates the callback to get AAID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Failed to connect to the AAID service.
     * @throws { BusinessError } 1000900007 - Internal error of the AAID service.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function getAAID(callback: AsyncCallback<string>): void;
    /**
     * Get AAID.
     * @returns { Promise<string> } The result of get AAID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Failed to connect to the AAID service.
     * @throws { BusinessError } 1000900007 - Internal error of the AAID service.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Get AAID.
     * @returns { Promise<string> } The result of get AAID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Failed to connect to the AAID service.
     * @throws { BusinessError } 1000900007 - Internal error of the AAID service.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function getAAID(): Promise<string>;
    /**
     * Delete AAID.
     * @param { AsyncCallback<void> } callback - Indicates the callback to delete AAID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Failed to connect to the AAID service.
     * @throws { BusinessError } 1000900007 - Internal error of the AAID service.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Delete AAID.
     * @param { AsyncCallback<void> } callback - Indicates the callback to delete AAID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Failed to connect to the AAID service.
     * @throws { BusinessError } 1000900007 - Internal error of the AAID service.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function deleteAAID(callback: AsyncCallback<void>): void;
    /**
     * Delete AAID.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Failed to connect to the AAID service.
     * @throws { BusinessError } 1000900007 - Internal error of the AAID service.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Delete AAID.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Failed to connect to the AAID service.
     * @throws { BusinessError } 1000900007 - Internal error of the AAID service.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function deleteAAID(): Promise<void>;
}
export default AAID;
