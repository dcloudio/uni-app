/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
 * @kit BasicServicesKit
 */
import { AsyncCallback } from './@ohos.base';
import Want from './@ohos.app.ability.Want';
import image from './@ohos.multimedia.image';
import unifiedDataChannel from './@ohos.data.unifiedDataChannel';
/**
 * systemPasteboard
 * @namespace pasteboard
 * @syscap SystemCapability.MiscServices.Pasteboard
 * @since 6
 */
/**
 * systemPasteboard
 * @namespace pasteboard
 * @syscap SystemCapability.MiscServices.Pasteboard
 * @atomicservice
 * @since 11
 */
declare namespace pasteboard {
    /**
     * Indicates the maximum number of records allowed in a PasteData object.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     */
    /**
     * Indicates the maximum number of records allowed in a PasteData object.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    const MAX_RECORD_NUM: number;
    /**
     * Indicates MIME types of HTML text.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     */
    /**
     * Indicates MIME types of HTML text.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    const MIMETYPE_TEXT_HTML: string;
    /**
     * Indicates MIME types of wants.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     */
    /**
     * Indicates MIME types of wants.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    const MIMETYPE_TEXT_WANT: string;
    /**
     * Indicates MIME types of plain text.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     */
    /**
     * Indicates MIME types of plain text.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    const MIMETYPE_TEXT_PLAIN: string;
    /**
     * Indicates MIME types of URIs.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     */
    /**
     * Indicates MIME types of URIs.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    const MIMETYPE_TEXT_URI: string;
    /**
     * Indicates MIME type of PixelMap.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    /**
     * Indicates MIME type of PixelMap.
     * @constant
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    const MIMETYPE_PIXELMAP: string;
    /**
     * Indicates type of value.
     * @type { string | image.PixelMap | Want | ArrayBuffer }
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    /**
     * Indicates type of value.
     * @typedef { string | image.PixelMap | Want | ArrayBuffer }
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    type ValueType = string | image.PixelMap | Want | ArrayBuffer;
    /**
     * Creates a PasteData object for PasteData#MIMETYPE_TEXT_HTML.
     * @param { string } htmlText - To save the Html text content.
     * @returns { PasteData } Containing the contents of the clipboard content object.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#createData
     */
    function createHtmlData(htmlText: string): PasteData;
    /**
     * Creates a PasteData object for PasteData#MIMETYPE_TEXT_WANT.
     * @param { Want } want - To save the want of content.
     * @returns { PasteData } Containing the contents of the clipboard content object.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#createData
     */
    function createWantData(want: Want): PasteData;
    /**
     * Creates a PasteData object for PasteData#MIMETYPE_TEXT_PLAIN.
     * @param { string } text - To save the text of content.
     * @returns { PasteData } Containing the contents of the clipboard content object.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#createData
     */
    function createPlainTextData(text: string): PasteData;
    /**
     * Creates a PasteData object for PasteData#MIMETYPE_TEXT_URI.
     * @param { string } uri - To save the uri of content.
     * @returns { PasteData } Containing the contents of the clipboard content object.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#createData
     */
    function createUriData(uri: string): PasteData;
    /**
     * Creates a PasteData object with MIME type and value.
     * @param { string } mimeType - indicates MIME type of value, its size cannot be greater than 1024 bytes.
     * @param { ValueType } value - indicates the content that is set to PasteData.
     * @returns { PasteData } a new PasteData object which contains mimeType and value.
     * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
     *    2. Incorrect parameters types;
     *    3. Parameter verification failed.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    /**
     * Creates a PasteData object with MIME type and value.
     * @param { string } mimeType - indicates MIME type of value, its size cannot be greater than 1024 bytes.
     * @param { ValueType } value - indicates the content that is set to PasteData.
     * @returns { PasteData } a new PasteData object which contains mimeType and value.
     * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
     *    2. Incorrect parameters types;
     *    3. Parameter verification failed.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    function createData(mimeType: string, value: ValueType): PasteData;
    /**
     * Creates a Record object for PasteData#MIMETYPE_TEXT_HTML.
     * @param { string } htmlText - To save the Html text content.
     * @returns { PasteDataRecord } The content of a new record
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#createRecord
     */
    function createHtmlTextRecord(htmlText: string): PasteDataRecord;
    /**
     * Creates a Record object for PasteData#MIMETYPE_TEXT_WANT.
     * @param { Want } want - To save the want of content.
     * @returns { PasteDataRecord } The content of a new record
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#createRecord
     */
    function createWantRecord(want: Want): PasteDataRecord;
    /**
     * Creates a Record object for PasteData#MIMETYPE_TEXT_PLAIN.
     * @param { string } text - To save the text of content.
     * @returns { PasteDataRecord } The content of a new record
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#createRecord
     */
    function createPlainTextRecord(text: string): PasteDataRecord;
    /**
     * Creates a Record object for PasteData#MIMETYPE_TEXT_URI.
     * @param { string } uri - To save the uri of content.
     * @returns { PasteDataRecord } The content of a new record
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#createRecord
     */
    function createUriRecord(uri: string): PasteDataRecord;
    /**
     * Creates a record object with MIME type and value.
     * @param { string } mimeType - indicates MIME type of value, its size cannot be greater than 1024 bytes.
     * @param { ValueType } value - content to be saved.
     * @returns { PasteDataRecord } a new PasteDataRecord object which contains mimeType and value.
     * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
     *    2. Incorrect parameters types;
     *    3. Parameter verification failed.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    /**
     * Creates a record object with MIME type and value.
     * @param { string } mimeType - indicates MIME type of value, its size cannot be greater than 1024 bytes.
     * @param { ValueType } value - content to be saved.
     * @returns { PasteDataRecord } a new PasteDataRecord object which contains mimeType and value.
     * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
     *    2. Incorrect parameters types;
     *    3. Parameter verification failed.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    function createRecord(mimeType: string, value: ValueType): PasteDataRecord;
    /**
     * get SystemPasteboard
     * @returns { SystemPasteboard } The system clipboard object
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 6
     */
    /**
     * get SystemPasteboard
     * @returns { SystemPasteboard } The system clipboard object
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    function getSystemPasteboard(): SystemPasteboard;
    /**
     * Types of scope that PasteData can be pasted.
     * @enum { number }
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    /**
     * Types of scope that PasteData can be pasted.
     * @enum { number }
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    enum ShareOption {
        /**
         * INAPP indicates that only paste in the same app is allowed.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * INAPP indicates that only paste in the same app is allowed.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        INAPP,
        /**
         * LOCALDEVICE indicates that paste in any app in this device is allowed.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * LOCALDEVICE indicates that paste in any app in this device is allowed.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        LOCALDEVICE,
        /**
         * CROSSDEVICE indicates that paste in any app across devices is allowed.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * CROSSDEVICE indicates that paste in any app across devices is allowed.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         * @deprecated since 12
         */
        CROSSDEVICE
    }
    /**
     * Paste data property.
     * @interface PasteDataProperty
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     */
    /**
     * Paste data property.
     * @interface PasteDataProperty
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    interface PasteDataProperty {
        /**
         * additional property data. key-value pairs.
         * @type { object }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * additional property data. key-value pairs.
         * @type { object }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        additions: {
            [key: string]: object;
        };
        /**
         * non-repeating MIME types of all records in PasteData.
         * @type { Array<string> }
         * @readonly
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * non-repeating MIME types of all records in PasteData.
         * @type { Array<string> }
         * @readonly
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        readonly mimeTypes: Array<string>;
        /**
         * the user-defined tag of a PasteData object.
         * @type { string }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * the user-defined tag of a PasteData object.
         * @type { string }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        tag: string;
        /**
         * a timestamp, which indicates when data is written to the system pasteboard.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * a timestamp, which indicates when data is written to the system pasteboard.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        readonly timestamp: number;
        /**
         * Checks whether PasteData is set for local access only.
         * @type { boolean }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * Checks whether PasteData is set for local access only.
         * @type { boolean }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        localOnly: boolean;
        /**
         * Indicates the scope of clipboard data which can be pasted.
         * If it is not set or is incorrectly set, The default value is CrossDevice.
         * @type { ShareOption }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Indicates the scope of clipboard data which can be pasted.
         * If it is not set or is incorrectly set, The default value is CrossDevice.
         * @type { ShareOption }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        shareOption: ShareOption;
    }
    /**
     * Paste data record.
     * @interface PasteDataRecord
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 7
     */
    /**
     * Paste data record.
     * @interface PasteDataRecord
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    interface PasteDataRecord {
        /**
         * HTML text in a record.
         * @type { string }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * HTML text in a record.
         * @type { string }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        htmlText: string;
        /**
         * an want in a record.
         * @type { Want }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * an want in a record.
         * @type { Want }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        want: Want;
        /**
         * MIME types of a record.
         * @type { string }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * MIME types of a record.
         * @type { string }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        mimeType: string;
        /**
         * plain text in a record.
         * @type { string }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * plain text in a record.
         * @type { string }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        plainText: string;
        /**
         * an URI in a record.
         * @type { string }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * an URI in a record.
         * @type { string }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        uri: string;
        /**
         * PixelMap in a record.
         * @type { image.PixelMap }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * PixelMap in a record.
         * @type { image.PixelMap }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        pixelMap: image.PixelMap;
        /**
         * Custom data in a record, mimeType indicates the MIME type of custom data, ArrayBuffer indicates the value of custom data.
         * @type { object }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Custom data in a record, mimeType indicates the MIME type of custom data, ArrayBuffer indicates the value of custom data.
         * @type { object }
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        data: {
            [mimeType: string]: ArrayBuffer;
        };
        /**
         * Converts data in PasteData to text format.
         * @param { AsyncCallback<string> } callback - the callback of convertToText.
         * @throws { BusinessError } 401 - Possible causes: Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#convertToTextV9
         */
        convertToText(callback: AsyncCallback<string>): void;
        /**
         * Converts data in PasteData to text format.
         * @returns { Promise<string> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#convertToTextV9
         */
        convertToText(): Promise<string>;
        /**
         * Converts data in PasteData to text format.
         * @returns { string } the string returned by the function.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Converts data in PasteData to text format.
         * @returns { string } the string returned by the function.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        toPlainText(): string;
    }
    /**
     * Classes for paste data.
     * @interface PasteData
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 6
     */
    /**
     * Classes for paste data.
     * @interface PasteData
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    interface PasteData {
        /**
         * Adds a Record for HTML text to a PasteData object, and updates the MIME type to PasteData#MIMETYPE_TEXT_HTML in DataProperty.
         * @param { string } htmlText - To save the Html text content.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#addRecord
         */
        addHtmlRecord(htmlText: string): void;
        /**
         * Adds an want Record to a PasteData object, and updates the MIME type to PasteData#MIMETYPE_TEXT_WANT in DataProperty.
         * @param { Want } want - To save the want content.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#addRecord
         */
        addWantRecord(want: Want): void;
        /**
         * Adds a PasteRecord to a PasteData object and updates MIME types in DataProperty.
         * @param { PasteDataRecord } record - The content of a new record.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * Adds a PasteRecord to a PasteData object and updates MIME types in DataProperty.
         * @param { PasteDataRecord } record - The content of a new record.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        addRecord(record: PasteDataRecord): void;
        /**
         * Adds a Record for plain text to a PasteData object, and updates the MIME type to PasteData#MIMETYPE_TEXT_PLAIN in DataProperty.
         * @param { string } text - To save the text of content.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#addRecord
         */
        addTextRecord(text: string): void;
        /**
         * Adds a URI Record to a PasteData object, and updates the MIME type to PasteData#MIMETYPE_TEXT_URI in DataProperty.
         * @param { string } uri - To save the uri of content.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#addRecord
         */
        addUriRecord(uri: string): void;
        /**
         * Adds a record with mimeType and value to a PasteData object.
         * @param { string } mimeType - indicates the MIME type of value, its size cannot be greater than 1024 bytes.
         * @param { ValueType } value - content to be saved.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types;
         *    3. Parameter verification failed.
         * @throws { BusinessError } 12900002 - The number of records exceeds the upper limit.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Adds a record with mimeType and value to a PasteData object.
         * @param { string } mimeType - indicates the MIME type of value, its size cannot be greater than 1024 bytes.
         * @param { ValueType } value - content to be saved.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types;
         *    3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 10
         */
        /**
         * Adds a record with mimeType and value to a PasteData object.
         * @param { string } mimeType - indicates the MIME type of value, its size cannot be greater than 1024 bytes.
         * @param { ValueType } value - content to be saved.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types;
         *    3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        addRecord(mimeType: string, value: ValueType): void;
        /**
         * MIME types of all content on the pasteboard.
         * @returns { Array<string> } type of array
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * MIME types of all content on the pasteboard.
         * @returns { Array<string> } type of array
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getMimeTypes(): Array<string>;
        /**
         * HTML text of the primary record in a PasteData object.
         * @returns { string } type of htmltext
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * HTML text of the primary record in a PasteData object.
         * @returns { string } type of htmltext
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getPrimaryHtml(): string;
        /**
         * the want of the primary record in a PasteData object.
         * @returns { Want } type of want
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * the want of the primary record in a PasteData object.
         * @returns { Want } type of want
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getPrimaryWant(): Want;
        /**
         * the MIME type of the primary record in a PasteData object.
         * @returns { string } type of mimetype
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * the MIME type of the primary record in a PasteData object.
         * @returns { string } type of mimetype
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getPrimaryMimeType(): string;
        /**
         * the plain text of the primary record in a PasteData object.
         * @returns { string } type of text
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 6
         */
        /**
         * the plain text of the primary record in a PasteData object.
         * @returns { string } type of text
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getPrimaryText(): string;
        /**
         * the URI of the primary record in a PasteData object.
         * @returns { string } type of uri
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * the URI of the primary record in a PasteData object.
         * @returns { string } type of uri
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getPrimaryUri(): string;
        /**
         * Gets the primary PixelMap record in a PasteData object.
         * @returns { image.PixelMap } pixelMap
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Gets the primary PixelMap record in a PasteData object.
         * @returns { image.PixelMap } pixelMap
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getPrimaryPixelMap(): image.PixelMap;
        /**
         * DataProperty of a PasteData object.
         * @returns { PasteDataProperty } PasteDataProperty type of PasteDataProperty
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * DataProperty of a PasteData object.
         * @returns { PasteDataProperty } PasteDataProperty type of PasteDataProperty
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getProperty(): PasteDataProperty;
        /**
         * Sets PasteDataProperty to a PasteData object, Modifying shareOption is supported only.
         * @param { PasteDataProperty } property - save property to PasteData object.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Sets PasteDataProperty to a PasteData object, Modifying shareOption is supported only.
         * @param { PasteDataProperty } property - save property to PasteData object.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        setProperty(property: PasteDataProperty): void;
        /**
         * Gets record by index in PasteData.
         * @param { number } index - indicates the record index in PasteData.
         * @returns { PasteDataRecord } the record in PasteData with index.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#getRecord
         */
        getRecordAt(index: number): PasteDataRecord;
        /**
         * Gets record by index in PasteData.
         * @param { number } index - indicates the record index in PasteData.
         * @returns { PasteDataRecord } the record in PasteData with index.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @throws { BusinessError } 12900001 - The index is out of the record.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Gets record by index in PasteData.
         * @param { number } index - indicates the record index in PasteData.
         * @returns { PasteDataRecord } the record in PasteData with index.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @throws { BusinessError } 12900001 - The index is out of the record.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getRecord(index: number): PasteDataRecord;
        /**
         * the number of records in a PasteData object.
         * @returns { number } The number of the clipboard contents
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * the number of records in a PasteData object.
         * @returns { number } The number of the clipboard contents
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getRecordCount(): number;
        /**
         * the user-defined tag of a PasteData object.
         * @returns { string } type of tag
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        /**
         * the user-defined tag of a PasteData object.
         * @returns { string } type of tag
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getTag(): string;
        /**
         * Checks whether there is a specified MIME type of data in DataProperty.
         * @param { string } mimeType - indicates to query data type.
         * @returns { boolean } if having mimeType in PasteData returns true, else returns false.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#hasType
         */
        hasMimeType(mimeType: string): boolean;
        /**
         * Checks whether there is a specified MIME type of data in DataProperty.
         * @param { string } mimeType - indicates to query data type.
         * @returns { boolean } if having mimeType in PasteData returns true, else returns false.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Checks whether there is a specified MIME type of data in DataProperty.
         * @param { string } mimeType - indicates to query data type.
         * @returns { boolean } if having mimeType in PasteData returns true, else returns false.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        hasType(mimeType: string): boolean;
        /**
         * Removes a Record based on a specified index.
         * @param { number } index - indicates the record index in PasteData.
         * @returns { boolean } The query returns True on success, or False on failure.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#removeRecord
         */
        removeRecordAt(index: number): boolean;
        /**
         * Removes a Record based on a specified index.
         * @param { number } index - indicates the record index in PasteData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @throws { BusinessError } 12900001 - The index is out of the record.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Removes a Record based on a specified index.
         * @param { number } index - indicates the record index in PasteData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @throws { BusinessError } 12900001 - The index is out of the record.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        removeRecord(index: number): void;
        /**
         * Replaces a specified record with a new one.
         * @param { number } index - indicates the record index in PasteData.
         * @param { PasteDataRecord } record - the content of a new record.
         * @returns { boolean } The query returns True on success, or False on failure.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#replaceRecord
         */
        replaceRecordAt(index: number, record: PasteDataRecord): boolean;
        /**
         * Replaces a specified record with a new one.
         * @param { number } index - indicates the record index in PasteData.
         * @param { PasteDataRecord } record - the content of a new record.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @throws { BusinessError } 12900001 - The index is out of the record.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Replaces a specified record with a new one.
         * @param { number } index - indicates the record index in PasteData.
         * @param { PasteDataRecord } record - the content of a new record.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @throws { BusinessError } 12900001 - The index is out of the record.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        replaceRecord(index: number, record: PasteDataRecord): void;
    }
    /**
     * Classes for system pasteboard.
     * @interface SystemPasteboard
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 6
     */
    /**
     * Classes for system pasteboard.
     * @interface SystemPasteboard
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @atomicservice
     * @since 11
     */
    interface SystemPasteboard {
        /**
         * Callback invoked when pasteboard content changes.
         * @param { 'update' } type - indicates pasteboard content changed.
         * @param { function } callback - the callback to add.
         * @throws { BusinessError }  401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        on(type: 'update', callback: () => void): void;
        /**
         * Remove a callback invoked when pasteboard content changes.
         * @param { 'update' } type - indicates pasteboard content changed.
         * @param { function } [callback] - the callback to remove. If this parameter is not filled in, it indicates that all
         * callbacks for this application will be cleared. Otherwise, it indicates that the specified callback will be cleared.
         * @throws { BusinessError }  401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         */
        off(type: 'update', callback?: () => void): void;
        /**
         * Checks whether the data is remote.
         * @returns { boolean } True is remote data, else false.
         * @throws { BusinessError } 12900005 - Request timed out.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        isRemoteData(): boolean;
        /**
         * Gets source of data.
         * @returns { string } data source.
         * @throws { BusinessError } 12900005 - Request timed out.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        getDataSource(): string;
        /**
         * Checks whether there is a specified MIME type of data in Data.
         * @param { string } mimeType - indicates to query data type.
         * @returns { boolean } if having mimeType in PasteData returns true, else returns false.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @throws { BusinessError } 12900005 - Request timed out.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        hasDataType(mimeType: string): boolean;
        /**
         * Clears the pasteboard.
         * @param { AsyncCallback<void> } callback - the callback of clearData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#clearData
         */
        clear(callback: AsyncCallback<void>): void;
        /**
         * Clears the pasteboard.
         * @returns { Promise<void> } the promise returned by the clearData.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#clearData
         */
        clear(): Promise<void>;
        /**
         * Clears the pasteboard.
         * @param { AsyncCallback<void> } callback - the callback of clearData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Clears the pasteboard.
         * @param { AsyncCallback<void> } callback - the callback of clearData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        clearData(callback: AsyncCallback<void>): void;
        /**
         * Clears the pasteboard.
         * @returns { Promise<void> } the promise returned by the clearData.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Clears the pasteboard.
         * @returns { Promise<void> } the promise returned by the clearData.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        clearData(): Promise<void>;
        /**
         * Clears the pasteboard.
         * @throws { BusinessError } 12900005 - Request timed out.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        clearDataSync(): void;
        /**
         * Gets pastedata from the system pasteboard.
         * @param { AsyncCallback<PasteData> } callback - the callback of getData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#getData
         */
        getPasteData(callback: AsyncCallback<PasteData>): void;
        /**
         * Gets pastedata from the system pasteboard.
         * @returns { Promise<PasteData> } the promise returned by the getData.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#getData
         */
        getPasteData(): Promise<PasteData>;
        /**
         * Gets pastedata from the system pasteboard.
         * @param { AsyncCallback<PasteData> } callback - the callback of getData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Gets pastedata from the system pasteboard.
         * @param { AsyncCallback<PasteData> } callback - the callback of getData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        /**
         * Gets pastedata from the system pasteboard.
         * @permission ohos.permission.READ_PASTEBOARD
         * @param { AsyncCallback<PasteData> } callback - the callback of getData.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the
         *    permission required to call the API.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 12
         */
        getData(callback: AsyncCallback<PasteData>): void;
        /**
         * Gets pastedata from the system pasteboard.
         * @returns { Promise<PasteData> } the promise returned by the getData.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Gets pastedata from the system pasteboard.
         * @returns { Promise<PasteData> } the promise returned by the getData.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        /**
         * Gets pastedata from the system pasteboard.
         * @permission ohos.permission.READ_PASTEBOARD
         * @returns { Promise<PasteData> } the promise returned by the getData.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the
         *    permission required to call the API.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 12
         */
        getData(): Promise<PasteData>;
        /**
         * Gets pasteData from the system pasteboard.
         * @returns { PasteData }  a new PasteData.
         * @throws { BusinessError } 12900005 - Request timed out.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        /**
         * Gets pasteData from the system pasteboard.
         * @permission ohos.permission.READ_PASTEBOARD
         * @returns { PasteData }  a new PasteData.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the
         *    permission required to call the API.
         * @throws { BusinessError } 12900005 - Request timed out.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 12
         */
        getDataSync(): PasteData;
        /**
         * Checks whether there is content in the pasteboard.
         * @param { AsyncCallback<boolean> } callback - the callback of setPasteData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#hasData
         */
        hasPasteData(callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether there is content in the pasteboard.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#hasData
         */
        hasPasteData(): Promise<boolean>;
        /**
         * Checks whether there is content in the system pasteboard.
         * @param { AsyncCallback<boolean> } callback - the callback of hasData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Checks whether there is content in the system pasteboard.
         * @param { AsyncCallback<boolean> } callback - the callback of hasData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        hasData(callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether there is content in the system pasteboard.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Checks whether there is content in the system pasteboard.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        hasData(): Promise<boolean>;
        /**
         * Checks whether there is content in the system pasteboard.
         * @returns { boolean } True exists, false does not exist.
         * @throws { BusinessError } 12900005 - Request timed out.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        hasDataSync(): boolean;
        /**
         * Writes PasteData to the pasteboard.
         * @param { PasteData } data - PasteData will be written to the clipboard
         * @param { AsyncCallback<void> } callback - the callback of setPasteData.
         * @throws { BusinessError } 401 - Possible causes: 1.  Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#setData
         */
        setPasteData(data: PasteData, callback: AsyncCallback<void>): void;
        /**
         * Writes PasteData to the pasteboard.
         * @param { PasteData } data - Containing the contents of the clipboard content object.
         * @returns { Promise<void> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.pasteboard.pasteboard#setData
         */
        setPasteData(data: PasteData): Promise<void>;
        /**
         * Writes PasteData to the system pasteboard.
         * @param { PasteData } data - PasteData will be written to the clipboard
         * @param { AsyncCallback<void> } callback - the callback of setData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameters types.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @throws { BusinessError } 12900004 - Replication is prohibited.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Writes PasteData to the system pasteboard.
         * @param { PasteData } data - PasteData will be written to the clipboard
         * @param { AsyncCallback<void> } callback - the callback of setData.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @throws { BusinessError } 12900004 - Replication is prohibited.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        setData(data: PasteData, callback: AsyncCallback<void>): void;
        /**
         * Writes PasteData to the system pasteboard.
         * @param { PasteData } data - PasteData will be written to the clipboard.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @throws { BusinessError } 12900004 - Replication is prohibited.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @since 9
         */
        /**
         * Writes PasteData to the system pasteboard.
         * @param { PasteData } data - PasteData will be written to the clipboard.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @throws { BusinessError } 12900004 - Replication is prohibited.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        setData(data: PasteData): Promise<void>;
        /**
         * Writes PasteData to the system pasteboard.
         * @param { PasteData } data - PasteData will be written to the clipboard.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect parameters types.
         * @throws { BusinessError } 12900005 - Request timed out.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 11
         */
        setDataSync(data: PasteData): void;
        /**
         * Gets unified data from the system pasteboard.
         * @permission ohos.permission.READ_PASTEBOARD
         * @returns { Promise<unifiedDataChannel.UnifiedData> } the promise returned by the getData.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the
         *    permission required to call the API.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 12
         */
        getUnifiedData(): Promise<unifiedDataChannel.UnifiedData>;
        /**
         * Gets unified data from the system pasteboard.
         * @permission ohos.permission.READ_PASTEBOARD
         * @returns { unifiedDataChannel.UnifiedData }  a new UnifiedData.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the
         *    permission required to call the API.
         * @throws { BusinessError } 12900005 - Request timed out.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 12
         */
        getUnifiedDataSync(): unifiedDataChannel.UnifiedData;
        /**
         * Writes unified data to the system pasteboard.
         * @param { unifiedDataChannel.UnifiedData } data - Unified data will be written to the pasteboard.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @throws { BusinessError } 12900003 - Another copy or paste operation is in progress.
         * @throws { BusinessError } 12900004 - Replication is prohibited.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 12
         */
        setUnifiedData(data: unifiedDataChannel.UnifiedData): Promise<void>;
        /**
         * Writes unified data to the system pasteboard.
         * @param { unifiedDataChannel.UnifiedData } data - Unified data will be written to the pasteboard.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @throws { BusinessError } 12900005 - Request timed out.
         * @syscap SystemCapability.MiscServices.Pasteboard
         * @atomicservice
         * @since 12
         */
        setUnifiedDataSync(data: unifiedDataChannel.UnifiedData): void;
    }
}
export default pasteboard;
