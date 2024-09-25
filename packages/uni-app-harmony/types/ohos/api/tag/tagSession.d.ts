/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
import tag from '../@ohos.nfc.tag';
import { AsyncCallback } from '../@ohos.base';
/**
 * Controls tag read and write.
 * <p>Classes for different types of tags inherit from this abstract class to control connections to
 * tags, read data from tags, and write data to tags.
 *
 * @typedef TagSession
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 7
 */
/**
 * Controls tag read and write.
 * <p>Classes for different types of tags inherit from this abstract class to control connections to
 * tags, read data from tags, and write data to tags.
 *
 * @typedef TagSession
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface TagSession {
    /**
     * Obtains the tag information.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { tag.TagInfo } Returns the tag information, which is a {@link TagInfo} object.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.nfc.tag/tag#getTagInfo
     */
    getTagInfo(): tag.TagInfo;
    /**
     * Connects to a tag.
     * <p>This method must be called before data is read from or written to the tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { boolean } Returns {@code true} if the connection is set up; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead tagSession.TagSession#connect
     */
    connectTag(): boolean;
    /**
     * Connects to a tag. Must be called before data is read from or written to the tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Connects to a tag. Must be called before data is read from or written to the tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    connect(): void;
    /**
     * Resets a connection with a tag and restores the default timeout duration for writing data to the tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead tagSession.TagSession#resetConnection
     */
    reset(): void;
    /**
     * Resets a connection with a tag and restores the default timeout duration for writing data to the tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Resets a connection with a tag and restores the default timeout duration for writing data to the tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    resetConnection(): void;
    /**
     * Checks whether a connection has been set up with a tag.
     *
     * @returns { boolean } Returns {@code true} if a connection has been set up with the tag;
     * returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead tagSession.TagSession#isConnected
     */
    isTagConnected(): boolean;
    /**
     * Checks whether a connection has been set up with a tag.
     *
     * @returns { boolean } Returns true if tag connected, otherwise false.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Checks whether a connection has been set up with a tag.
     *
     * @returns { boolean } Returns true if tag connected, otherwise false.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    isConnected(): boolean;
    /**
     * Sets the timeout duration (ms) for sending data to a tag.
     * <p>If data is not sent to the tag within the duration, data sending fails.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } timeout Indicates the timeout duration to be set.
     * @returns { boolean } Returns {@code true} if the setting is successful; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead tagSession.TagSession#setTimeout
     */
    setSendDataTimeout(timeout: number): boolean;
    /**
     * Sets the timeout duration (ms) for sending data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } timeout Indicates the timeout duration to be set.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Sets the timeout duration (ms) for sending data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } timeout Indicates the timeout duration to be set.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    setTimeout(timeout: number): void;
    /**
     * Queries the timeout duration (ms) for sending data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { number } Returns the timeout duration.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead tagSession.TagSession#getTimeout
     */
    getSendDataTimeout(): number;
    /**
     * Obtains the timeout duration (ms) for sending data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { number } Returns the timeout duration.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Obtains the timeout duration (ms) for sending data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { number } Returns the timeout duration.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getTimeout(): number;
    /**
     * Writes data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number[] } data Indicates the data to be written to the tag.
     * @returns { Promise<number[]> } Returns bytes received in response. Or bytes with a length of 0 if the
     * data fails to be written to the tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead tagSession.TagSession#transmit
     */
    sendData(data: number[]): Promise<number[]>;
    /**
     * Writes data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number[] } data Indicates the data to be written to the tag.
     * @param { AsyncCallback<number[]> } callback The callback.
     * data fails to be written to the tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead tagSession.TagSession#transmit
     */
    sendData(data: number[], callback: AsyncCallback<number[]>): void;
    /**
     * Writes data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number[] } data Indicates the data to be written to the tag.
     * @returns { Promise<number[]> } Returns bytes received in response. Or bytes with a length of 0 if the
     * data fails to be written to the tag.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Writes data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number[] } data Indicates the data to be written to the tag.
     * @returns { Promise<number[]> } Returns bytes received in response. Or bytes with a length of 0 if the
     * data fails to be written to the tag.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    transmit(data: number[]): Promise<number[]>;
    /**
     * Writes data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number[] } data Indicates the data to be written to the tag.
     * @param { AsyncCallback<number[]> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Writes data to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number[] } data Indicates the data to be written to the tag.
     * @param { AsyncCallback<number[]> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    transmit(data: number[], callback: AsyncCallback<number[]>): void;
    /**
     * Queries the maximum length of data that can be sent to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { number } Returns the maximum length of the data to be sent to the tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead tagSession.TagSession#getMaxTransmitSize
     */
    getMaxSendLength(): number;
    /**
     * Obtains the maximum length of data that can be sent to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { number } Returns the maximum length of the data to be sent to the tag.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Obtains the maximum length of data that can be sent to a tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { number } Returns the maximum length of the data to be sent to the tag.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getMaxTransmitSize(): number;
}
