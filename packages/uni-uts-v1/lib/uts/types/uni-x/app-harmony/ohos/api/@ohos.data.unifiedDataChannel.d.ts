/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit ArkData
 */
import { AsyncCallback } from './@ohos.base';
import image from "./@ohos.multimedia.image";
import Want from "./@ohos.app.ability.Want";
/**
 * Provide methods for sharing data between different applications across unified data channels.
 *
 * @namespace unifiedDataChannel
 * @syscap SystemCapability.DistributedDataManager.UDMF.Core
 * @since 10
 */
/**
 * Provide methods for sharing data between different applications across unified data channels.
 *
 * @namespace unifiedDataChannel
 * @syscap SystemCapability.DistributedDataManager.UDMF.Core
 * @atomicservice
 * @since 11
 */
declare namespace unifiedDataChannel {
    /**
     * Types of scope that UnifiedData can be used.
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 12
     */
    enum ShareOptions {
        /**
         * IN_APP indicates that only use in the same app is allowed.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        IN_APP,
        /**
         * CROSS_APP indicates that use in any app in this device is allowed.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        CROSS_APP
    }
    /**
     * Indicated delay get UnifiedData
     *
     * @typedef {function} GetDelayData
     * @param { string } type - the type of UnifiedData required.
     * @returns { UnifiedData } Return the UnifiedData required.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 12
     */
    type GetDelayData = (type: string) => UnifiedData;
    /**
     * Indicates type of value.
     * @typedef {number | string | boolean | image.PixelMap | Want | ArrayBuffer | object | null | undefined}
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 12
     */
    type ValueType = number | string | boolean | image.PixelMap | Want | ArrayBuffer | object | null | undefined;
    /**
     * Describe the unified data properties.
     *
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 12
     */
    class UnifiedDataProperties {
        /**
         * extra property data. key-value pairs.
         * @type { ?Record<string, object> }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        extras?: Record<string, object>;
        /**
         * the user-defined tag of a UnifiedData object.
         * @type { ?string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        tag?: string;
        /**
         * a timestamp, which indicates when data is written.
         * @type { ?Date }
         * @readonly
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        readonly timestamp?: Date;
        /**
         * Indicates the scope of clipboard data which can be used.
         * If it is not set or is incorrectly set, The default value is CrossDevice.
         * @type { ?ShareOptions }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        shareOptions?: ShareOptions;
        /**
         * Indicated delay get UnifiedData.
         * @type { ?GetDelayData }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        getDelayData?: GetDelayData;
    }
    /**
     * Describe the unified data.
     *
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified data.
     *
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class UnifiedData {
        /**
         * Create unified data with a record
         *
         * @param { UnifiedRecord } record - Record will add into unified data.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect Parameters types.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Create unified data with a record
         *
         * @param { UnifiedRecord } record - Record will add into unified data.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect Parameters types.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        constructor(record: UnifiedRecord);
        /**
         * Create a empty unified data.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        constructor();
        /**
         * Add a record into unified data
         *
         * @param { UnifiedRecord } record - Record will add into unified data.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect Parameters types.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Add a record into unified data
         *
         * @param { UnifiedRecord } record - Record will add into unified data.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect Parameters types.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        addRecord(record: UnifiedRecord): void;
        /**
         * Get all records of unified data
         *
         * @returns { Array<UnifiedRecord> } Return the records of unified data
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Get all records of unified data
         *
         * @returns { Array<UnifiedRecord> } Return the records of unified data
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        getRecords(): Array<UnifiedRecord>;
        /**
         * Checks whether there is a specified type of data in DataProperties.
         * @param { string } type - indicates to query data type.
         * @returns { boolean } if having mimeType in UnifiedData returns true, else returns false.
         * @throws { BusinessError } 401 - Possible causes: 1. Mandatory parameters are left unspecified;
         *    2. Incorrect  parameters types.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        hasType(type: string): boolean;
        /**
         * UTD types of all content in the UnifiedData.
         * @returns { Array<string> } type of array
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        getTypes(): Array<string>;
        /**
         * UnifiedData properties.
         * @type { UnifiedDataProperties }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        properties: UnifiedDataProperties;
    }
    /**
     * The data abstract supported by unified data
     *
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * The data abstract supported by unified data
     *
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class Summary {
        /**
         * A map for each type and data size, key is data type, value is the corresponding data size
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * A map for each type and data size, key is data type, value is the corresponding data size
         *
         * @type { Record<string, number> }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        summary: Record<string, number>;
        /**
         * Total data size of data in Bytes
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Total data size of data in Bytes
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        totalSize: number;
    }
    /**
     * Describe the unified record
     *
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified record
     *
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class UnifiedRecord {
        /**
         * Get type of unified record
         *
         * @returns { string } Return the type of unified data
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Get type of unified record
         *
         * @returns { string } Return the type of unified data
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        getType(): string;
        /**
         * Create unified record.
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        constructor();
        /**
         * Create unified record by type and value.
         *
         * @param { string } type - indicates to data type of unified record. It can not be empty.
         * When type of value is object, parameter type must be pixel-map or want UTD type.
         * @param { ValueType } value - indicates to value of unified record.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect Parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        constructor(type: string, value: ValueType);
        /**
         * Get the value of unified record.
         *
         * @returns { ValueType } Return the value of unified record.
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 12
         */
        getValue(): ValueType;
    }
    /**
     * Describe the unified text data
     *
     * @extends UnifiedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified text data
     *
     * @extends UnifiedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class Text extends UnifiedRecord {
        /**
         * Indicates the details of unified text
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the details of unified text
         *
         * @type { ?Record<string, string> }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        details?: Record<string, string>;
    }
    /**
     * Describe the unified plain text data
     *
     * @extends Text
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified plain text data
     *
     * @extends Text
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class PlainText extends Text {
        /**
         * Indicates the content of text
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the content of text
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        textContent: string;
        /**
         * Indicates the abstract of text
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the abstract of text
         *
         * @type { ?string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        abstract?: string;
    }
    /**
     * Describe the unified link data
     *
     * @extends Text
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified link data
     *
     * @extends Text
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class Hyperlink extends Text {
        /**
         * Indicates the url of a link
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the url of a link
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        url: string;
        /**
         * Indicates the description of a link
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the description of a link
         *
         * @type { ?string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        description?: string;
    }
    /**
     * Describe the unified html data
     *
     * @extends Text
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified html data
     *
     * @extends Text
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class HTML extends Text {
        /**
         * Indicates the content of html, with html tags
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the content of html, with html tags
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        htmlContent: string;
        /**
         * Indicates the plain content of html
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the plain content of html
         *
         * @type { ?string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        plainContent?: string;
    }
    /**
     * Describe the unified file data
     *
     * @extends UnifiedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified file data
     *
     * @extends UnifiedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class File extends UnifiedRecord {
        /**
         * Indicates the details of unified File
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the details of unified File
         *
         * @type { ?Record<string, string> }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        details?: Record<string, string>;
        /**
         * Indicates the uri of file
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the uri of file
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        uri: string;
    }
    /**
     * Describe the unified image data
     *
     * @extends File
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified image data
     *
     * @extends File
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class Image extends File {
        /**
         * Indicates the uri of image
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the uri of image
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        imageUri: string;
    }
    /**
     * Describe the unified video data
     *
     * @extends File
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified video data
     *
     * @extends File
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class Video extends File {
        /**
         * Indicates the uri of video
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the uri of video
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        videoUri: string;
    }
    /**
     * Describe the unified audio data
     *
     * @extends File
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified audio data
     *
     * @extends File
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class Audio extends File {
        /**
         * Indicates the uri of audio
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the uri of audio
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        audioUri: string;
    }
    /**
     * Describe the unified folder data
     *
     * @extends File
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the unified folder data
     *
     * @extends File
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class Folder extends File {
        /**
         * Indicates the uri of folder
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the uri of folder
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        folderUri: string;
    }
    /**
     * Describe system defined type data(this kind of data is provided and bound to OpenHarmony,
     * also can be parsed by system provided API)
     *
     * @extends UnifiedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe system defined type data(this kind of data is provided and bound to OpenHarmony,
     * also can be parsed by system provided API)
     *
     * @extends UnifiedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class SystemDefinedRecord extends UnifiedRecord {
        /**
         * Indicates the details of system defined data
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the details of system defined data
         *
         * @type { ?Record<string, number | string | Uint8Array> }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        details?: Record<string, number | string | Uint8Array>;
    }
    /**
     * Describe system defined form data(this kind of data is provided and bound to OpenHarmony,
     * also can be parsed by system provided API)
     *
     * @extends SystemDefinedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe system defined form data(this kind of data is provided and bound to OpenHarmony,
     * also can be parsed by system provided API)
     *
     * @extends SystemDefinedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class SystemDefinedForm extends SystemDefinedRecord {
        /**
         * Indicates the id of form
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the id of form
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        formId: number;
        /**
         * Indicates the name of form
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the name of form
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        formName: string;
        /**
         * Indicates the bundle name of form
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the bundle name of form
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        bundleName: string;
        /**
         * Indicates the ability name of form
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the ability name of form
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        abilityName: string;
        /**
         * Indicates the module of form
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the module of form
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        module: string;
    }
    /**
     * Describe system defined app item data(this kind of data is provided and bound to OpenHarmony,
     * also can be parsed by system provided API)
     *
     * @extends SystemDefinedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe system defined app item data(this kind of data is provided and bound to OpenHarmony,
     * also can be parsed by system provided API)
     *
     * @extends SystemDefinedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class SystemDefinedAppItem extends SystemDefinedRecord {
        /**
         * Indicates the app id
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the app id
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        appId: string;
        /**
         * Indicates the app name
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the app name
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        appName: string;
        /**
         * Indicates the id of app icon
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the id of app icon
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        appIconId: string;
        /**
         * Indicates the id of app label
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the id of app label
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        appLabelId: string;
        /**
         * Indicates the bundle name of app
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the bundle name of app
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        bundleName: string;
        /**
         * Indicates the ability name of app
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the ability name of app
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        abilityName: string;
    }
    /**
     * Describe system defined pixel map data(this kind of data is provided and bound to OpenHarmony,
     * also can be parsed by system provided API)
     *
     * @extends SystemDefinedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe system defined pixel map data(this kind of data is provided and bound to OpenHarmony,
     * also can be parsed by system provided API)
     *
     * @extends SystemDefinedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class SystemDefinedPixelMap extends SystemDefinedRecord {
        /**
         * Indicates the raw data of pixel map
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the raw data of pixel map
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        rawData: Uint8Array;
    }
    /**
     * Describe application defined data(this kind of data is provided and bound to OpenHarmony,
     * also can be parsed by system provided API)
     *
     * @extends UnifiedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe application defined data(this kind of data is provided and bound to OpenHarmony,
     * also can be parsed by system provided API)
     *
     * @extends UnifiedRecord
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    class ApplicationDefinedRecord extends UnifiedRecord {
        /**
         * Indicates the type of data, should always be started with 'ApplicationDefined.', will
         * return error otherwise
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the type of data, should always be started with 'ApplicationDefined.', will
         * return error otherwise
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        applicationDefinedType: string;
        /**
         * Indicates the raw data of application defined data
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the raw data of application defined data
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        rawData: Uint8Array;
    }
    /**
     * Describe the sharing channel that UDMF support
     *
     * @enum { string }
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the sharing channel that UDMF support
     *
     * @enum { string }
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    enum Intention {
        /**
         * Indicates the intention of data hub
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the intention of data hub
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        DATA_HUB = 'DataHub'
    }
    /**
     * Describe the optional arguments of data operation
     *
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Describe the optional arguments of data operation
     *
     * @typedef { object }
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    type Options = {
        /**
         * Indicates the target Intention
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the target Intention
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        intention?: Intention;
        /**
         * Indicates the unique identifier of target UnifiedData
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @since 10
         */
        /**
         * Indicates the unique identifier of target UnifiedData
         *
         * @syscap SystemCapability.DistributedDataManager.UDMF.Core
         * @atomicservice
         * @since 11
         */
        key?: string;
    };
    /**
     * Insert data into unified data channel by Intention
     *
     * @param { Options } options - fill the intention field to indicate the target {@link Intention}.
     * @param { UnifiedData } data - {@link UnifiedData} data object to insert into target intention.
     * @param { AsyncCallback<string> } callback - {string}: the unique identifier.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Insert data into unified data channel by Intention
     *
     * @param { Options } options - fill the intention field to indicate the target {@link Intention}.
     * @param { UnifiedData } data - {@link UnifiedData} data object to insert into target intention.
     * @param { AsyncCallback<string> } callback - {string}: the unique identifier.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    function insertData(options: Options, data: UnifiedData, callback: AsyncCallback<string>): void;
    /**
     * Insert data into unified data channel by Intention
     *
     * @param { Options } options - fill the intention field to indicate the target {@link Intention}.
     * @param { UnifiedData } data - {@link UnifiedData} data object to insert into target intention.
     * @returns { Promise<string> } {string}: the unique identifier.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Insert data into unified data channel by Intention
     *
     * @param { Options } options - fill the intention field to indicate the target {@link Intention}.
     * @param { UnifiedData } data - {@link UnifiedData} data object to insert into target intention.
     * @returns { Promise<string> } {string}: the unique identifier.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    function insertData(options: Options, data: UnifiedData): Promise<string>;
    /**
     * Update data to unified data channel by Unique Identifier
     *
     * @param { Options } options - fill the unique identifier field to indicate the target {@link UnifiedData}.
     * @param { UnifiedData } data - {@link UnifiedData} data object to update the target data.
     * @param { AsyncCallback<void> } callback - the callback of updateData.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Update data to unified data channel by Unique Identifier
     *
     * @param { Options } options - fill the unique identifier field to indicate the target {@link UnifiedData}.
     * @param { UnifiedData } data - {@link UnifiedData} data object to update the target data.
     * @param { AsyncCallback<void> } callback - the callback of updateData.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    function updateData(options: Options, data: UnifiedData, callback: AsyncCallback<void>): void;
    /**
     * Update data to unified data channel by Unique Identifier
     *
     * @param { Options } options - fill the unique identifier field to indicate the target {@link UnifiedData}.
     * @param { UnifiedData } data - {@link UnifiedData} data object to update the target data.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Update data to unified data channel by Unique Identifier
     *
     * @param { Options } options - fill the unique identifier field to indicate the target {@link UnifiedData}.
     * @param { UnifiedData } data - {@link UnifiedData} data object to update the target data.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    function updateData(options: Options, data: UnifiedData): Promise<void>;
    /**
     * Query data of unified data channel by Intention or Unique Identifier
     *
     * @param { Options } options - fill the intention or unique identifier field to indicate the target {@link Intention} or {@link UnifiedData}.
     * @param { AsyncCallback<Array<UnifiedData>> } callback - {Array<UnifiedData>}: the target {@link UnifiedData} object array.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Query data of unified data channel by Intention or Unique Identifier
     *
     * @param { Options } options - fill the intention or unique identifier field to indicate the target {@link Intention} or {@link UnifiedData}.
     * @param { AsyncCallback<Array<UnifiedData>> } callback - {Array<UnifiedData>}: the target {@link UnifiedData} object array.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    function queryData(options: Options, callback: AsyncCallback<Array<UnifiedData>>): void;
    /**
     * Query data of unified data channel by Intention or Unique Identifier
     *
     * @param { Options } options - fill the intention or unique identifier field to indicate the target {@link Intention} or {@link UnifiedData}.
     * @returns { Promise<Array<UnifiedData>> } {Array<UnifiedData>}: the target {@link UnifiedData} object array.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Query data of unified data channel by Intention or Unique Identifier
     *
     * @param { Options } options - fill the intention or unique identifier field to indicate the target {@link Intention} or {@link UnifiedData}.
     * @returns { Promise<Array<UnifiedData>> } {Array<UnifiedData>}: the target {@link UnifiedData} object array.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    function queryData(options: Options): Promise<Array<UnifiedData>>;
    /**
     * Delete data of unified data channel by Intention or Unique Identifier
     *
     * @param { Options } options - fill the intention or unique identifier field to indicate the target {@link Intention} or {@link UnifiedData}.
     * @param { AsyncCallback<Array<UnifiedData>> } callback - {Array<UnifiedData>}: the deleted {@link UnifiedData} object array.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Delete data of unified data channel by Intention or Unique Identifier
     *
     * @param { Options } options - fill the intention or unique identifier field to indicate the target {@link Intention} or {@link UnifiedData}.
     * @param { AsyncCallback<Array<UnifiedData>> } callback - {Array<UnifiedData>}: the deleted {@link UnifiedData} object array.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    function deleteData(options: Options, callback: AsyncCallback<Array<UnifiedData>>): void;
    /**
     * Delete data of unified data channel by Intention or Unique Identifier
     *
     * @param { Options } options - fill the intention or unique identifier field to indicate the target {@link Intention} or {@link UnifiedData}.
     * @returns { Promise<Array<UnifiedData>> } {Array<UnifiedData>}: the deleted {@link UnifiedData} object array.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @since 10
     */
    /**
     * Delete data of unified data channel by Intention or Unique Identifier
     *
     * @param { Options } options - fill the intention or unique identifier field to indicate the target {@link Intention} or {@link UnifiedData}.
     * @returns { Promise<Array<UnifiedData>> } {Array<UnifiedData>}: the deleted {@link UnifiedData} object array.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect Parameters types.
     * @syscap SystemCapability.DistributedDataManager.UDMF.Core
     * @atomicservice
     * @since 11
     */
    function deleteData(options: Options): Promise<Array<UnifiedData>>;
}
export default unifiedDataChannel;
