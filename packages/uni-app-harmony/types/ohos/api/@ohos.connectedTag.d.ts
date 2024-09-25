/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
 * @file
 * @kit ConnectivityKit
 */
import type { AsyncCallback, Callback } from './@ohos.base';
/**
 * Provides methods to operate or manage Connected Tag.
 *
 * @namespace connectedTag
 * @syscap SystemCapability.Communication.ConnectedTag
 * @since 8
 */
declare namespace connectedTag {
    /**
     * Initializes Connected Tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { boolean } Returns true if init success, otherwise returns false.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.connectedTag/connectedTag#initialize
     */
    function init(): boolean;
    /**
     * Initializes the connected NFC tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3200101 - Connected NFC tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 9
     */
    function initialize(): void;
    /**
     * UnInitializes Connected Tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { boolean } Returns true if uninit success, otherwise returns false.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.connectedTag/connectedTag#uninitialize
     */
    function uninit(): boolean;
    /**
     * Uninitializes the connected NFC tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3200101 - Connected NFC tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 9
     */
    function uninitialize(): void;
    /**
     * Reads the NDEF Data.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { Promise<string> } Returns the NDEF Data.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.connectedTag/connectedTag#read
     */
    function readNdefTag(): Promise<string>;
    /**
     * Reads the NDEF Data.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { AsyncCallback<string> } callback
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.connectedTag/connectedTag#read
     */
    function readNdefTag(callback: AsyncCallback<string>): void;
    /**
     * Reads the NDEF data from the connected NFC tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { Promise<number[]> } The reponse NDEF data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3200101 - Connected NFC tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 9
     */
    function read(): Promise<number[]>;
    /**
     * Reads the NDEF data from the connected NFC tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { AsyncCallback<number[]> } callback The callback to receive the data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3200101 - Connected NFC tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 9
     */
    function read(callback: AsyncCallback<number[]>): void;
    /**
     * Writes the NDEF Data.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { string } data The Data to write.
     * @returns { Promise<void> } The void.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.connectedTag/connectedTag#write
     */
    function writeNdefTag(data: string): Promise<void>;
    /**
     * Writes the NDEF Data.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { string } data The Data to write.
     * @param { AsyncCallback<void> } callback
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.connectedTag/connectedTag#write
     */
    function writeNdefTag(data: string, callback: AsyncCallback<void>): void;
    /**
     * Writes the NDEF data to the connected NFC tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number[] } data Indicates the NDEF data to send, which is a byte array.
     * @returns { Promise<void> } The void.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3200101 - Connected NFC tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 9
     */
    function write(data: number[]): Promise<void>;
    /**
     * Writes the NDEF data to the connected NFC tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number[] } data Indicates the NDEF data to send, which is a byte array.
     * @param { AsyncCallback<void> } callback
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3200101 - Connected NFC tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 9
     */
    function write(data: number[], callback: AsyncCallback<void>): void;
    /**
     * Subscribes NFC RF status change events.
     *
     * @permission ohos.permission.NFC_TAG
     * @param {'notify'} type The callback type.
     * @param { Callback<number> } callback The callback function to be registered.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 8
     */
    function on(type: 'notify', callback: Callback<number>): void;
    /**
     * Unsubscribes NFC RF status change events.
     * <p>All callback functions will be unregistered If there is no specific callback parameter.</p>
     *
     * @permission ohos.permission.NFC_TAG
     * @param { 'notify' } type The callback type.
     * @param { Callback<number> } callback The callback function to be unregistered.
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 8
     */
    function off(type: 'notify', callback?: Callback<number>): void;
    /**
     * Describes the NFC RF type.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.ConnectedTag
     * @since 8
     */
    enum NfcRfType {
        /**
         * NFC RF LEAVE
         *
         * @syscap SystemCapability.Communication.ConnectedTag
         * @since 8
         */
        NFC_RF_LEAVE = 0,
        /**
         * NFC RF ENTER
         *
         * @syscap SystemCapability.Communication.ConnectedTag
         * @since 8
         */
        NFC_RF_ENTER = 1
    }
}
export default connectedTag;
