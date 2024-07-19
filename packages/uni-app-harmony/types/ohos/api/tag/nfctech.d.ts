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
import { TagSession } from './tagSession';
import { AsyncCallback } from '../@ohos.base';
/**
 * Provides interfaces to control the read and write of tags that support the NFC-A technology.
 * <p>This class is inherited from the {@link TagSession} abstract class, and provides methods to create
 * {@code NfcATag} objects and obtain the ATQA and SAK.
 *
 * @typedef NfcATag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 7
 */
/**
 * Provides interfaces to control the read and write of tags that support the NFC-A technology.
 * <p>This class is inherited from the {@link TagSession} abstract class, and provides methods to create
 * {@code NfcATag} objects and obtain the ATQA and SAK.
 *
 * @typedef NfcATag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface NfcATag extends TagSession {
    /**
     * Obtains the SAK of an NFC-A tag.
     *
     * @returns { number } Returns the SAK of the NFC-A tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Obtains the SAK of an NFC-A tag.
     *
     * @returns { number } Returns the SAK of the NFC-A tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getSak(): number;
    /**
     * Obtains the ATQA of an NFC-A tag.
     *
     * @returns { number[] } Returns the ATQA of the NFC-A tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Obtains the ATQA of an NFC-A tag.
     *
     * @returns { number[] } Returns the ATQA of the NFC-A tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getAtqa(): number[];
}
/**
 * Provides interfaces to create an {@code NfcBTag} and perform I/O operations on the tag.
 * <p>This class inherits from the {@link TagSession} abstract class and provides interfaces to create an
 * {@code NfcBTag} and obtain the tag information.
 *
 * @typedef NfcBTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 7
 */
/**
 * Provides interfaces to create an {@code NfcBTag} and perform I/O operations on the tag.
 * <p>This class inherits from the {@link TagSession} abstract class and provides interfaces to create an
 * {@code NfcBTag} and obtain the tag information.
 *
 * @typedef NfcBTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface NfcBTag extends TagSession {
    /**
     * Obtains the application data of a tag.
     *
     * @returns { number[] } Returns the application data of the tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Obtains the application data of a tag.
     *
     * @returns { number[] } Returns the application data of the tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getRespAppData(): number[];
    /**
     * Obtains the protocol information of a tag.
     *
     * @returns { number[] } Returns the protocol information of the tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Obtains the protocol information of a tag.
     *
     * @returns { number[] } Returns the protocol information of the tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getRespProtocol(): number[];
}
/**
 * Provides methods for creating an NFC-F tag, obtaining tag information, and controlling tag read and write.
 * <p>This class inherits from the {@link TagSession} abstract class and provides interfaces to create an
 * {@code NfcFTag} and obtain the tag information.
 *
 * @typedef NfcFTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 7
 */
/**
 * Provides methods for creating an NFC-F tag, obtaining tag information, and controlling tag read and write.
 * <p>This class inherits from the {@link TagSession} abstract class and provides interfaces to create an
 * {@code NfcFTag} and obtain the tag information.
 *
 * @typedef NfcFTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface NfcFTag extends TagSession {
    /**
     * Obtains the system code from this {@code NfcFTag} instance.
     *
     * @returns { number[] } Returns the system code.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Obtains the system code from this {@code NfcFTag} instance.
     *
     * @returns { number[] } Returns the system code.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getSystemCode(): number[];
    /**
     * Obtains the PMm (consisting of the IC code and manufacturer parameters) from this {@code NfcFTag} instance.
     *
     * @returns { number[] } Returns the PMm.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Obtains the PMm (consisting of the IC code and manufacturer parameters) from this {@code NfcFTag} instance.
     *
     * @returns { number[] } Returns the PMm.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getPmm(): number[];
}
/**
 * Provides methods for creating an NFC-V tag, obtaining tag information, and controlling tag read and write.
 * <p>This class inherits from the {@link TagSession} abstract class and provides interfaces to create an
 * {@code NfcVTag} and obtain the tag information.
 *
 * @typedef NfcVTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 7
 */
/**
 * Provides methods for creating an NFC-V tag, obtaining tag information, and controlling tag read and write.
 * <p>This class inherits from the {@link TagSession} abstract class and provides interfaces to create an
 * {@code NfcVTag} and obtain the tag information.
 *
 * @typedef NfcVTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface NfcVTag extends TagSession {
    /**
     * Obtains the response flags from this {@code NfcVTag} instance.
     *
     * @returns { number } Returns the response flags.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Obtains the response flags from this {@code NfcVTag} instance.
     *
     * @returns { number } Returns the response flags.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getResponseFlags(): number;
    /**
     * Obtains the response flags from this {@code NfcVTag} instance.
     *
     * @returns { number } Returns the response flags.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Obtains the response flags from this {@code NfcVTag} instance.
     *
     * @returns { number } Returns the response flags.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getDsfId(): number;
}
/**
 * Provides methods for accessing IsoDep tag.
 *
 * @typedef IsoDepTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 9
 */
/**
 * Provides methods for accessing IsoDep tag.
 *
 * @typedef IsoDepTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface IsoDepTag extends TagSession {
    /**
     * Gets IsoDep Historical bytes of the tag, which is based on NfcA RF technology.
     * It could be null if not based on NfcA.
     *
     * @returns { number[] } Returns the Historical bytes, the length could be 0.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets IsoDep Historical bytes of the tag, which is based on NfcA RF technology.
     * It could be null if not based on NfcA.
     *
     * @returns { number[] } Returns the Historical bytes, the length could be 0.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getHistoricalBytes(): number[];
    /**
     * Gets IsoDep HiLayer Response bytes of the tag, which is based on NfcB RF technology.
     * It could be null if not based on NfcB.
     *
     * @returns { number[] } Returns HiLayer Response bytes, the length could be 0.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets IsoDep HiLayer Response bytes of the tag, which is based on NfcB RF technology.
     * It could be null if not based on NfcB.
     *
     * @returns { number[] } Returns HiLayer Response bytes, the length could be 0.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getHiLayerResponse(): number[];
    /**
     * Checks if extended apdu length supported or not.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { Promise<boolean> } Returns true if extended apdu length supported, otherwise false.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Checks if extended apdu length supported or not.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { Promise<boolean> } Returns true if extended apdu length supported, otherwise false.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    isExtendedApduSupported(): Promise<boolean>;
    /**
     * Checks if extended apdu length supported or not.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { AsyncCallback<boolean> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Checks if extended apdu length supported or not.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { AsyncCallback<boolean> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    isExtendedApduSupported(callback: AsyncCallback<boolean>): void;
}
/**
 * Provides methods for Message of NDEF.
 *
 * @typedef NdefMessage
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 9
 */
/**
 * Provides methods for Message of NDEF.
 *
 * @typedef NdefMessage
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface NdefMessage {
    /**
     * Obtains all records of an NDEF message.
     *
     * @returns { tag.NdefRecord[] } Records the list of NDEF records.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Obtains all records of an NDEF message.
     *
     * @returns { tag.NdefRecord[] } Records the list of NDEF records.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getNdefRecords(): tag.NdefRecord[];
}
/**
 * Provides methods for accessing NDEF tag.
 *
 * @typedef NdefTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 9
 */
/**
 * Provides methods for accessing NDEF tag.
 *
 * @typedef NdefTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface NdefTag extends TagSession {
    /**
     * Gets the type of NDEF tag.
     *
     * @returns { tag.NfcForumType } The type of NDEF tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets the type of NDEF tag.
     *
     * @returns { tag.NfcForumType } The type of NDEF tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getNdefTagType(): tag.NfcForumType;
    /**
     * Gets the NDEF message that was read from NDEF tag when tag discovery.
     *
     * @returns { NdefMessage } The instance of NdefMessage.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets the NDEF message that was read from NDEF tag when tag discovery.
     *
     * @returns { NdefMessage } The instance of NdefMessage.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getNdefMessage(): NdefMessage;
    /**
     * Checks if NDEF tag is writable.
     *
     * @returns { boolean } Returns true if the tag is writable, otherwise returns false.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Checks if NDEF tag is writable.
     *
     * @returns { boolean } Returns true if the tag is writable, otherwise returns false.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    isNdefWritable(): boolean;
    /**
     * Reads NDEF message on this tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { Promise<NdefMessage> } The NDEF message in tag.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Reads NDEF message on this tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { Promise<NdefMessage> } The NDEF message in tag.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    readNdef(): Promise<NdefMessage>;
    /**
     * Reads NDEF message on this tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { AsyncCallback<NdefMessage> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Reads NDEF message on this tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { AsyncCallback<NdefMessage> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    readNdef(callback: AsyncCallback<NdefMessage>): void;
    /**
     * Writes NDEF message into this tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } msg - The NDEF message to be written.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Writes NDEF message into this tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } msg - The NDEF message to be written.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    writeNdef(msg: NdefMessage): Promise<void>;
    /**
     * Writes NDEF message into this tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } msg - The NDEF message to be written.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Writes NDEF message into this tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } msg - The NDEF message to be written.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    writeNdef(msg: NdefMessage, callback: AsyncCallback<void>): void;
    /**
     * Checks NDEF tag can be set read-only.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { boolean } Returns true if the tag can be set readonly, otherwise returns false.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Checks NDEF tag can be set read-only.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { boolean } Returns true if the tag can be set readonly, otherwise returns false.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    canSetReadOnly(): boolean;
    /**
     * Sets the NDEF tag read-only.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Sets the NDEF tag read-only.
     *
     * @permission ohos.permission.NFC_TAG
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    setReadOnly(): Promise<void>;
    /**
     * Sets the NDEF tag read-only.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Sets the NDEF tag read-only.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    setReadOnly(callback: AsyncCallback<void>): void;
    /**
     * Converts the NFC forum type into string defined in NFC forum.
     *
     * @param { tag.NfcForumType } type - NFC forum type of NDEF tag.
     * @returns { string } The NFC forum string type.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Converts the NFC forum type into string defined in NFC forum.
     *
     * @param { tag.NfcForumType } type - NFC forum type of NDEF tag.
     * @returns { string } The NFC forum string type.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getNdefTagTypeString(type: tag.NfcForumType): string;
}
/**
 * Provides methods for accessing MifareClassic tag.
 *
 * @typedef MifareClassicTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 9
 */
/**
 * Provides methods for accessing MifareClassic tag.
 *
 * @typedef MifareClassicTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface MifareClassicTag extends TagSession {
    /**
     * Authenticates a sector with the key.Only successful authentication sector can be operated.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } sectorIndex - Index of sector to authenticate.
     * @param { number[] } key - The key(6-bytes) to authenticate.
     * @param { boolean } isKeyA - KeyA flag. true means KeyA, otherwise KeyB.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Authenticates a sector with the key. Only successful authentication sector can be operated.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } sectorIndex - Index of sector to authenticate.
     * @param { number[] } key - The key(6-bytes) to authenticate.
     * @param { boolean } isKeyA - KeyA flag. true means KeyA, otherwise KeyB.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    authenticateSector(sectorIndex: number, key: number[], isKeyA: boolean): Promise<void>;
    /**
     * Authenticates a sector with the key.Only successful authentication sector can be operated.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } sectorIndex - Index of sector to authenticate.
     * @param { number[] } key - The key(6-bytes) to authenticate.
     * @param { boolean } isKeyA - KeyA flag. true means KeyA, otherwise KeyB.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Authenticates a sector with the key. Only successful authentication sector can be operated.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } sectorIndex - Index of sector to authenticate.
     * @param { number[] } key - The key(6-bytes) to authenticate.
     * @param { boolean } isKeyA - KeyA flag. true means KeyA, otherwise KeyB.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    authenticateSector(sectorIndex: number, key: number[], isKeyA: boolean, callback: AsyncCallback<void>): void;
    /**
     * Reads a block, one block size is 16 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to read.
     * @returns { Promise<number[]> } Returns the block data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Reads a block, one block size is 16 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to read.
     * @returns { Promise<number[]> } Returns the block data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    readSingleBlock(blockIndex: number): Promise<number[]>;
    /**
     * Reads a block, one block size is 16 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to read.
     * @param { AsyncCallback<number[]> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Reads a block, one block size is 16 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to read.
     * @param { AsyncCallback<number[]> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    readSingleBlock(blockIndex: number, callback: AsyncCallback<number[]>): void;
    /**
     * Writes a block, one block size is 16 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to write.
     * @param { number[] } data - The block data to write.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Writes a block, one block size is 16 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to write.
     * @param { number[] } data - The block data to write.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    writeSingleBlock(blockIndex: number, data: number[]): Promise<void>;
    /**
     * Writes a block, one block size is 16 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to write.
     * @param { number[] } data - The block data to write.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Writes a block, one block size is 16 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to write.
     * @param { number[] } data - The block data to write.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    writeSingleBlock(blockIndex: number, data: number[], callback: AsyncCallback<void>): void;
    /**
     * Increments the contents of a block, and stores the result in the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to increment.
     * @param { number } value - The value to increment, none-negative.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Increments the contents of a block, and stores the result in the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to increment.
     * @param { number } value - The value to increment, none-negative.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    incrementBlock(blockIndex: number, value: number): Promise<void>;
    /**
     * Increments the contents of a block, and stores the result in the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to increment.
     * @param { number } value - The value to increment, none-negative.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Increments the contents of a block, and stores the result in the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to increment.
     * @param { number } value - The value to increment, none-negative.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    incrementBlock(blockIndex: number, value: number, callback: AsyncCallback<void>): void;
    /**
     * Decreases the contents of a block, and stores the result in the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to decrease.
     * @param { number } value - The value to decrease, none-negative.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Decreases the contents of a block, and stores the result in the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to decrease.
     * @param { number } value - The value to decrease, none-negative.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    decrementBlock(blockIndex: number, value: number): Promise<void>;
    /**
     * Decreases the contents of a block, and stores the result in the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to decrease.
     * @param { number } value - The value to decrease, none-negative.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Decreases the contents of a block, and stores the result in the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of block to decrease.
     * @param { number } value - The value to decrease, none-negative.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    decrementBlock(blockIndex: number, value: number, callback: AsyncCallback<void>): void;
    /**
     * Writes the contents of the internal transfer buffer to a value block.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of value block to be written.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Writes the contents of the internal transfer buffer to a value block.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of value block to be written.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    transferToBlock(blockIndex: number): Promise<void>;
    /**
     * Writes the contents of the internal transfer buffer to a value block.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of value block to be written.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Writes the contents of the internal transfer buffer to a value block.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of value block to be written.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    transferToBlock(blockIndex: number, callback: AsyncCallback<void>): void;
    /**
     * Moves the contents of a block into the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of value block to be moved from.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Moves the contents of a block into the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of value block to be moved from.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    restoreFromBlock(blockIndex: number): Promise<void>;
    /**
     * Moves the contents of a block into the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of value block to be moved from.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Moves the contents of a block into the internal transfer buffer.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } blockIndex - The index of value block to be moved from.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    restoreFromBlock(blockIndex: number, callback: AsyncCallback<void>): void;
    /**
     * Gets the number of sectors in MifareClassic tag.
     *
     * @returns { number } Returns the number of sectors.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets the number of sectors in MifareClassic tag.
     *
     * @returns { number } Returns the number of sectors.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getSectorCount(): number;
    /**
     * Gets the number of blocks in the sector.
     *
     * @param { number } sectorIndex - The index of sector.
     * @returns { number } Returns the number of blocks.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets the number of blocks in the sector.
     *
     * @param { number } sectorIndex - The index of sector.
     * @returns { number } Returns the number of blocks.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getBlockCountInSector(sectorIndex: number): number;
    /**
     * Gets the type of the MifareClassic tag.
     *
     * @returns { tag.MifareClassicType } Returns type of MifareClassic tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets the type of the MifareClassic tag.
     *
     * @returns { tag.MifareClassicType } Returns type of MifareClassic tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getType(): tag.MifareClassicType;
    /**
     * Gets size of the tag in bytes.
     *
     * @returns { number } Returns the size of the tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets size of the tag in bytes.
     *
     * @returns { number } Returns the size of the tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getTagSize(): number;
    /**
     * Checks if the tag is emulated or not.
     *
     * @returns { boolean } Returns true if tag is emulated, otherwise false.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Checks if the tag is emulated or not.
     *
     * @returns { boolean } Returns true if tag is emulated, otherwise false.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    isEmulatedTag(): boolean;
    /**
     * Gets the first block of the specific sector.
     *
     * @param { number } sectorIndex - The index of sector.
     * @returns { number } Returns index of first block in the sector.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets the first block of the specific sector.
     *
     * @param { number } sectorIndex - The index of sector.
     * @returns { number } Returns index of first block in the sector.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getBlockIndex(sectorIndex: number): number;
    /**
     * Gets the sector index, that the sector contains the specific block.
     *
     * @param { number } blockIndex - The index of block.
     * @returns { number } Returns the sector index.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets the sector index, that the sector contains the specific block.
     *
     * @param { number } blockIndex - The index of block.
     * @returns { number } Returns the sector index.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getSectorIndex(blockIndex: number): number;
}
/**
 * Provides methods for accessing MifareUltralight tag.
 *
 * @typedef MifareUltralightTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 9
 */
/**
 * Provides methods for accessing MifareUltralight tag.
 *
 * @typedef MifareUltralightTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface MifareUltralightTag extends TagSession {
    /**
     * Reads 4 pages, total is 16 bytes. Page size is 4 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } pageIndex - The index of page to read.
     * @returns { Promise<number[]> } Returns 4 pages data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Reads 4 pages, total is 16 bytes. Page size is 4 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } pageIndex - The index of page to read.
     * @returns { Promise<number[]> } Returns 4 pages data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    readMultiplePages(pageIndex: number): Promise<number[]>;
    /**
     * Reads 4 pages, total is 16 bytes. Page size is 4 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } pageIndex - The index of page to read.
     * @param { AsyncCallback<number[]> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Reads 4 pages, total is 16 bytes. Page size is 4 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } pageIndex - The index of page to read.
     * @param { AsyncCallback<number[]> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    readMultiplePages(pageIndex: number, callback: AsyncCallback<number[]>): void;
    /**
     * Writes a page, total 4 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } pageIndex - The index of page to write.
     * @param { number[] } data - The page data to write.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Writes a page, total 4 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } pageIndex - The index of page to write.
     * @param { number[] } data - The page data to write.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    writeSinglePage(pageIndex: number, data: number[]): Promise<void>;
    /**
     * Writes a page, total 4 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } pageIndex - The index of page to write.
     * @param { number[] } data - The page data to write.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Writes a page, total 4 bytes.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { number } pageIndex - The index of page to write.
     * @param { number[] } data - The page data to write.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    writeSinglePage(pageIndex: number, data: number[], callback: AsyncCallback<void>): void;
    /**
     * Gets the type of the MifareUltralight tag.
     *
     * @returns { tag.MifareUltralightType } Returns the type of MifareUltralight tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Gets the type of the MifareUltralight tag.
     *
     * @returns { tag.MifareUltralightType } Returns the type of MifareUltralight tag.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    getType(): tag.MifareUltralightType;
}
/**
 * Provides methods for accessing NdefFormatable tag.
 *
 * @typedef NdefFormatableTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 9
 */
/**
 * Provides methods for accessing NdefFormatable tag.
 *
 * @typedef NdefFormatableTag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
export interface NdefFormatableTag extends TagSession {
    /**
     * Formats a tag as NDEF tag, writes NDEF message into the NDEF Tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } message - NDEF message to write while format. It can be null, then only format the tag.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Formats a tag as NDEF tag, writes NDEF message into the NDEF Tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } message - NDEF message to write while format. It can be null, then only format the tag.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    format(message: NdefMessage): Promise<void>;
    /**
     * Formats a tag as NDEF tag, writes NDEF message into the NDEF Tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } message - NDEF message to write while format. It can be null, then only format the tag.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Formats a tag as NDEF tag, writes NDEF message into the NDEF Tag.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } message - NDEF message to write while format. It can be null, then only format the tag.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    format(message: NdefMessage, callback: AsyncCallback<void>): void;
    /**
     * Formats a tag as NDEF tag, writes NDEF message into the NDEF Tag, then sets the tag readonly.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } message - NDEF message to write while format. It can be null, then only format the tag.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Formats a tag as NDEF tag, writes NDEF message into the NDEF Tag, then sets the tag readonly.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } message - NDEF message to write while format. It can be null, then only format the tag.
     * @returns { Promise<void> } The void
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    formatReadOnly(message: NdefMessage): Promise<void>;
    /**
     * Formats a tag as NDEF tag, writes NDEF message into the NDEF Tag, then sets the tag readonly.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } message - NDEF message to write while format. It can be null, then only format the tag.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Formats a tag as NDEF tag, writes NDEF message into the NDEF Tag, then sets the tag readonly.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { NdefMessage } message - NDEF message to write while format. It can be null, then only format the tag.
     * @param { AsyncCallback<void> } callback The callback.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @throws { BusinessError } 3100204 - Tag I/O operation failed.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    formatReadOnly(message: NdefMessage, callback: AsyncCallback<void>): void;
}
