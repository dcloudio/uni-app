/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file The subscriber of common event
 * @kit BasicServicesKit
 */
import { AsyncCallback } from './../@ohos.base';
import { CommonEventSubscribeInfo } from './commonEventSubscribeInfo';
/**
 * the subscriber of common event
 *
 * @interface CommonEventSubscriber
 * @syscap SystemCapability.Notification.CommonEvent
 * @since 7
 */
/**
 * the subscriber of common event
 *
 * @interface CommonEventSubscriber
 * @syscap SystemCapability.Notification.CommonEvent
 * @atomicservice
 * @since 11
 */
export interface CommonEventSubscriber {
    /**
     * Obtains the result code of the current ordered common event.
     *
     * @param { AsyncCallback<number> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Obtains the result code of the current ordered common event.
     *
     * @param { AsyncCallback<number> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    getCode(callback: AsyncCallback<number>): void;
    /**
     * Obtains the result code of the current ordered common event.
     *
     * @returns { Promise<number> } Returns code of this common event
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Obtains the result code of the current ordered common event.
     *
     * @returns { Promise<number> } Returns code of this common event
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    getCode(): Promise<number>;
    /**
     * Obtains the result code of the current ordered common event.
     *
     * @returns { number } Returns code of this common event
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    /**
     * Obtains the result code of the current ordered common event.
     *
     * @returns { number } Returns code of this common event
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    getCodeSync(): number;
    /**
     * Sets the result code of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @param { AsyncCallback<void> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Sets the result code of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @param { AsyncCallback<void> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    setCode(code: number, callback: AsyncCallback<void>): void;
    /**
     * Sets the result code of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Sets the result code of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    setCode(code: number): Promise<void>;
    /**
     * Sets the result code of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    /**
     * Sets the result code of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    setCodeSync(code: number): void;
    /**
     * Obtains the result data of the current ordered common event.
     *
     * @param { AsyncCallback<string> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Obtains the result data of the current ordered common event.
     *
     * @param { AsyncCallback<string> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    getData(callback: AsyncCallback<string>): void;
    /**
     * Obtains the result data of the current ordered common event.
     *
     * @returns { Promise<string> } Returns data of this common event
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Obtains the result data of the current ordered common event.
     *
     * @returns { Promise<string> } Returns data of this common event
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    getData(): Promise<string>;
    /**
     * Obtains the result data of the current ordered common event.
     *
     * @returns { string } Returns data of this common event
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    /**
     * Obtains the result data of the current ordered common event.
     *
     * @returns { string } Returns data of this common event
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    getDataSync(): string;
    /**
     * Sets the result data of the current ordered common event.
     *
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @param { AsyncCallback<void> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Sets the result data of the current ordered common event.
     *
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @param { AsyncCallback<void> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    setData(data: string, callback: AsyncCallback<void>): void;
    /**
     * Sets the result data of the current ordered common event.
     *
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Sets the result data of the current ordered common event.
     *
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    setData(data: string): Promise<void>;
    /**
     * Sets the result data of the current ordered common event.
     *
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    /**
     * Sets the result data of the current ordered common event.
     *
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    setDataSync(data: string): void;
    /**
     * Sets the result of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @param { AsyncCallback<void> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Sets the result of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @param { AsyncCallback<void> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    setCodeAndData(code: number, data: string, callback: AsyncCallback<void>): void;
    /**
     * Sets the result of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Sets the result of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    setCodeAndData(code: number, data: string): Promise<void>;
    /**
     * Sets the result of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    /**
     * Sets the result of the current ordered common event.
     *
     * @param { number } code - Indicates the custom result code to set. You can set it to any value.
     * @param { string } data - Indicates the custom result data to set. You can set it to any character string.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    setCodeAndDataSync(code: number, data: string): void;
    /**
     * Checks whether the current common event is an ordered common event.
     *
     * @param { AsyncCallback<boolean> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    isOrderedCommonEvent(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the current common event is an ordered common event.
     *
     * @returns { Promise<boolean> } Returns true if this common event is ordered, false otherwise
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    isOrderedCommonEvent(): Promise<boolean>;
    /**
     * Checks whether the current common event is an ordered common event.
     *
     * @returns { boolean } Returns true if this common event is ordered, false otherwise
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    isOrderedCommonEventSync(): boolean;
    /**
     * Checks whether the current common event is a sticky common event.
     *
     * @param { AsyncCallback<boolean> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    isStickyCommonEvent(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the current common event is a sticky common event.
     *
     * @returns { Promise<boolean> } Returns true if this common event is sticky, false otherwise
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    isStickyCommonEvent(): Promise<boolean>;
    /**
     * Checks whether the current common event is a sticky common event.
     *
     * @returns { boolean } Returns true if this common event is sticky, false otherwise
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    isStickyCommonEventSync(): boolean;
    /**
     * Abort the current ordered common event.
     *
     * @param { AsyncCallback<void> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    abortCommonEvent(callback: AsyncCallback<void>): void;
    /**
     * Abort the current ordered common event.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    abortCommonEvent(): Promise<void>;
    /**
     * Abort the current ordered common event.
     *
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    abortCommonEventSync(): void;
    /**
     * Clears the abort state of the current ordered common event
     *
     * @param { AsyncCallback<void> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    clearAbortCommonEvent(callback: AsyncCallback<void>): void;
    /**
     * Clears the abort state of the current ordered common event
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    clearAbortCommonEvent(): Promise<void>;
    /**
     * Clears the abort state of the current ordered common event
     *
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    clearAbortCommonEventSync(): void;
    /**
     * Checks whether the current ordered common event should be aborted.
     *
     * @param { AsyncCallback<boolean> } callback - Indicate the callback function to receive the common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    getAbortCommonEvent(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the current ordered common event should be aborted.
     *
     * @returns { Promise<boolean> } Returns true if this common event is aborted, false otherwise
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    getAbortCommonEvent(): Promise<boolean>;
    /**
     * Checks whether the current ordered common event should be aborted.
     *
     * @returns { boolean } Returns true if this common event is aborted, false otherwise
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    getAbortCommonEventSync(): boolean;
    /**
     * get the CommonEventSubscribeInfo of this CommonEventSubscriber.
     *
     * @param { AsyncCallback<CommonEventSubscribeInfo> } callback - Indicate callback function to receive common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * get the CommonEventSubscribeInfo of this CommonEventSubscriber.
     *
     * @param { AsyncCallback<CommonEventSubscribeInfo> } callback - Indicate callback function to receive common event.
     * @syscap SystemCapability.Notification.CommonEvent
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getSubscribeInfo(callback: AsyncCallback<CommonEventSubscribeInfo>): void;
    /**
     * get the CommonEventSubscribeInfo of this CommonEventSubscriber.
     *
     * @returns { Promise<CommonEventSubscribeInfo> } Returns the commonEvent subscribe information
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * get the CommonEventSubscribeInfo of this CommonEventSubscriber.
     *
     * @returns { Promise<CommonEventSubscribeInfo> } Returns the commonEvent subscribe information
     * @syscap SystemCapability.Notification.CommonEvent
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getSubscribeInfo(): Promise<CommonEventSubscribeInfo>;
    /**
     * Get the CommonEventSubscribeInfo of this CommonEventSubscriber.
     *
     * @returns { CommonEventSubscribeInfo } Returns the commonEvent subscribe information
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 10
     */
    /**
     * Get the CommonEventSubscribeInfo of this CommonEventSubscriber.
     *
     * @returns { CommonEventSubscribeInfo } Returns the commonEvent subscribe information
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    getSubscribeInfoSync(): CommonEventSubscribeInfo;
    /**
     * finish the current ordered common event.
     *
     * @param { AsyncCallback<void> } callback - Indicate the callback function after ordered common event is finished.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 9
     */
    finishCommonEvent(callback: AsyncCallback<void>): void;
    /**
     * finish the current ordered common event.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 9
     */
    finishCommonEvent(): Promise<void>;
}
