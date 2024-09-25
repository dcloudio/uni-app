/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Defines AAID capability.
 * @kit PushKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * AAID(Anonymous Application Identifier), identifies an app instance running on device.
 * @namespace AAID
 * @syscap SystemCapability.Push.PushService
 * @StageModelOnly
 * @since 4.0.0(10)
 */
declare namespace AAID {
    /**
     * Get AAID(Anonymous Application Identifier).
     * @param { AsyncCallback<string> } callback - Indicates the callback to get AAID(Anonymous Application Identifier).
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Connect AAID(Anonymous Application Identifier) service failed.
     * @throws { BusinessError } 1000900007 - AAID(Anonymous Application Identifier) service internal error.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.0.0(10)
     */
    export function getAAID(callback: AsyncCallback<string>): void;
    /**
     * Get AAID(Anonymous Application Identifier).
     * @returns { Promise<string> } The result of get AAID(Anonymous Application Identifier).
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Connect AAID(Anonymous Application Identifier) service failed.
     * @throws { BusinessError } 1000900007 - AAID(Anonymous Application Identifier) service internal error.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.0.0(10)
     */
    export function getAAID(): Promise<string>;
    /**
     * delete AAID(Anonymous Application Identifier).
     * @param { AsyncCallback<void> } callback - Indicates the callback to delete AAID(Anonymous Application Identifier).
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Connect AAID(Anonymous Application Identifier) service failed.
     * @throws { BusinessError } 1000900007 - AAID(Anonymous Application Identifier) service internal error.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.0.0(10)
     */
    export function deleteAAID(callback: AsyncCallback<void>): void;
    /**
     * delete AAID(Anonymous Application Identifier).
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900006 - Connect AAID(Anonymous Application Identifier) service failed.
     * @throws { BusinessError } 1000900007 - AAID(Anonymous Application Identifier) service internal error.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.0.0(10)
     */
    export function deleteAAID(): Promise<void>;
}
export default AAID;
