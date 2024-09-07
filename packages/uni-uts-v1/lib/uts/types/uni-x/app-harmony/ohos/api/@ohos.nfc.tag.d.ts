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
import type { NfcATag as _NfcATag, NfcBTag as _NfcBTag, NfcFTag as _NfcFTag, NfcVTag as _NfcVTag } from './tag/nfctech';
import { IsoDepTag as _IsoDepTag, NdefTag as _NdefTag, MifareClassicTag as _MifareClassicTag, MifareUltralightTag as _MifareUltralightTag, NdefFormatableTag as _NdefFormatableTag } from './tag/nfctech';
import { NdefMessage as _NdefMessage } from './tag/nfctech';
import { TagSession as _TagSession } from './tag/tagSession';
import type { AsyncCallback } from './@ohos.base';
import Want from './@ohos.app.ability.Want';
import type { ElementName } from './bundleManager/ElementName';
/**
 * Provides methods to operate or manage NFC tag.
 *
 * @namespace tag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @since 7
 */
/**
 * Provides methods to operate or manage NFC tag.
 *
 * @namespace tag
 * @syscap SystemCapability.Communication.NFC.Tag
 * @atomicservice
 * @since 12
 */
declare namespace tag {
    /**
     * Indicates an NFC-A tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Indicates an NFC-A tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const NFC_A = 1;
    /**
     * Indicates an NFC-B tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Indicates an NFC-B tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const NFC_B = 2;
    /**
     * Indicates an ISO_DEP tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Indicates an ISO_DEP tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const ISO_DEP = 3;
    /**
     * Indicates an NFC-F tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Indicates an NFC-F tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const NFC_F = 4;
    /**
     * Indicates an NFC-V tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Indicates an NFC-V tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const NFC_V = 5;
    /**
     * Indicates an NDEF tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Indicates an NDEF tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const NDEF = 6;
    /**
     * Indicates an NDEF Formatable tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Indicates an NDEF Formatable tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const NDEF_FORMATABLE = 7;
    /**
     * Indicates an MIFARE CLASSIC tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Indicates an MIFARE CLASSIC tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const MIFARE_CLASSIC = 8;
    /**
     * Indicates an MIFARE ULTRALIGHT tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Indicates an MIFARE ULTRALIGHT tag.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const MIFARE_ULTRALIGHT = 9;
    /**
     * TNF types definitions, see NFCForum-TS-NDEF_1.0.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * TNF types definitions, see NFCForum-TS-NDEF_1.0.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    enum TnfType {
        /**
         * Empty
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Empty
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TNF_EMPTY = 0x0,
        /**
         * NFC Forum well-known type [NFC RTD]
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * NFC Forum well-known type [NFC RTD]
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TNF_WELL_KNOWN = 0x1,
        /**
         * Media-type as defined in RFC 2046 [RFC 2046]
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Media-type as defined in RFC 2046 [RFC 2046]
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TNF_MEDIA = 0x2,
        /**
         * Absolute URI as defined in RFC 3986 [RFC 3986]
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Absolute URI as defined in RFC 3986 [RFC 3986]
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TNF_ABSOLUTE_URI = 0x3,
        /**
         * NFC Forum external type [NFC RTD]
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * NFC Forum external type [NFC RTD]
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TNF_EXT_APP = 0x4,
        /**
         * Unknown
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Unknown
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TNF_UNKNOWN = 0x5,
        /**
         *  Unchanged (see section 2.3.3)
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         *  Unchanged (see section 2.3.3)
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TNF_UNCHANGED = 0x6
    }
    /**
     * NfcForum Type definition. The NDEF tag may use one of them.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * NfcForum Type definition. The NDEF tag may use one of them.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    enum NfcForumType {
        /**
         * NFC FORUM TYPE 1
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * NFC FORUM TYPE 1
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        NFC_FORUM_TYPE_1 = 1,
        /**
         * NFC FORUM TYPE 2
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * NFC FORUM TYPE 2
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        NFC_FORUM_TYPE_2 = 2,
        /**
         * NFC FORUM TYPE 3
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * NFC FORUM TYPE 3
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        NFC_FORUM_TYPE_3 = 3,
        /**
         * NFC FORUM TYPE 4
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * NFC FORUM TYPE 4
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        NFC_FORUM_TYPE_4 = 4,
        /**
         * Mifare Classic
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Mifare Classic
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        MIFARE_CLASSIC = 101
    }
    /**
     * RTD type TEXT, see NFC Record Type Definition (RTD) Specification.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * RTD type TEXT, see NFC Record Type Definition (RTD) Specification.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const RTD_TEXT: number[];
    /**
     * RTD type URI, see NFC Record Type Definition (RTD) Specification.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * RTD type URI, see NFC Record Type Definition (RTD) Specification.
     *
     * @constant
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    const RTD_URI: number[];
    /**
     * MifareClassic Type definition
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * MifareClassic Type definition
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    enum MifareClassicType {
        /**
         * Mifare Type unknown
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Mifare Type unknown
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TYPE_UNKNOWN = 0,
        /**
         * Mifare Classic
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Mifare Classic
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TYPE_CLASSIC = 1,
        /**
         * Mifare Plus
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Mifare Plus
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TYPE_PLUS = 2,
        /**
         * Mifare Pro
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Mifare Pro
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TYPE_PRO = 3
    }
    /**
     * MifareClassic Tag size.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * MifareClassic Tag size.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    enum MifareClassicSize {
        /**
         * 5 sectors per tag, 4 blocks per sector
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * 5 sectors per tag, 4 blocks per sector
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        MC_SIZE_MINI = 320,
        /**
         * 16 sectors per tag, 4 blocks per sector
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * 16 sectors per tag, 4 blocks per sector
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        MC_SIZE_1K = 1024,
        /**
         * 32 sectors per tag, 4 blocks per sector
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * 32 sectors per tag, 4 blocks per sector
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        MC_SIZE_2K = 2048,
        /**
         * 40 sectors per tag, 4 blocks per sector
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * 40 sectors per tag, 4 blocks per sector
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        MC_SIZE_4K = 4096
    }
    /**
     * MifareUltralight Type definition
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * MifareUltralight Type definition
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    enum MifareUltralightType {
        /**
         * Mifare Type unknown
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Mifare Type unknown
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TYPE_UNKNOWN = 0,
        /**
         * Mifare Ultralight
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Mifare Ultralight
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TYPE_ULTRALIGHT = 1,
        /**
         * Mifare UltralightC
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Mifare UltralightC
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        TYPE_ULTRALIGHT_C = 2
    }
    /**
     * Obtains an {@link NfcATag} object based on the tag information.
     * <p>During tag reading, if the tag supports the NFC-A technology, an {@link NfcATag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo Indicates the tag information.
     * @returns { NfcATag } The {@link NfcATag} object.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.nfc.tag/tag#getNfcA
     */
    function getNfcATag(tagInfo: TagInfo): NfcATag;
    /**
     * Obtains an {@link NfcATag} object based on the tag information.
     * During tag reading, if the tag supports the NFC-A technology, an {@link NfcATag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NfcATag } {@link NfcATag} object.
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
     * Obtains an {@link NfcATag} object based on the tag information.
     * During tag reading, if the tag supports the NFC-A technology, an {@link NfcATag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NfcATag } {@link NfcATag} object.
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
    function getNfcA(tagInfo: TagInfo): NfcATag;
    /**
     * Obtains an {@link NfcBTag} object based on the tag information.
     * <p>During tag reading, if the tag supports the NFC-B technology, an {@link NfcBTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo Indicates the tag information.
     * @returns { NfcBTag } The {@link NfcBTag} object.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.nfc.tag/tag#getNfcB
     */
    function getNfcBTag(tagInfo: TagInfo): NfcBTag;
    /**
     * Obtains an {@link NfcBTag} object based on the tag information.
     * During tag reading, if the tag supports the NFC-B technology, an {@link NfcBTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NfcBTag } The {@link NfcBTag} object.
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
     * Obtains an {@link NfcBTag} object based on the tag information.
     * During tag reading, if the tag supports the NFC-B technology, an {@link NfcBTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NfcBTag } The {@link NfcBTag} object.
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
    function getNfcB(tagInfo: TagInfo): NfcBTag;
    /**
     * Obtains an {@link NfcFTag} object based on the tag information.
     * <p>During tag reading, if the tag supports the NFC-F technology, an {@link NfcFTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo Indicates the tag information.
     * @returns { NfcFTag } The {@link NfcFTag} object.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.nfc.tag/tag#getNfcF
     */
    function getNfcFTag(tagInfo: TagInfo): NfcFTag;
    /**
     * Obtains an {@link NfcFTag} object based on the tag information.
     * During tag reading, if the tag supports the NFC-F technology, an {@link NfcFTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NfcFTag } The {@link NfcFTag} object.
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
     * Obtains an {@link NfcFTag} object based on the tag information.
     * During tag reading, if the tag supports the NFC-F technology, an {@link NfcFTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NfcFTag } The {@link NfcFTag} object.
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
    function getNfcF(tagInfo: TagInfo): NfcFTag;
    /**
     * Obtains an {@link NfcVTag} object based on the tag information.
     * <p>During tag reading, if the tag supports the NFC-V technology, an {@link NfcVTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo Indicates the tag information.
     * @returns { NfcVTag } The {@link NfcVTag} object.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.nfc.tag/tag#getNfcV
     */
    function getNfcVTag(tagInfo: TagInfo): NfcVTag;
    /**
     * Obtains an {@link NfcVTag} object based on the tag information.
     * During tag reading, if the tag supports the NFC-V technology, an {@link NfcVTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NfcVTag } The {@link NfcVTag} object.
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
     * Obtains an {@link NfcVTag} object based on the tag information.
     * During tag reading, if the tag supports the NFC-V technology, an {@link NfcVTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NfcVTag } The {@link NfcVTag} object.
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
    function getNfcV(tagInfo: TagInfo): NfcVTag;
    /**
     * Obtains an {@link IsoDepTag} object based on the tag information.
     * During tag reading, if the tag supports the IsoDep technology, an {@link IsoDepTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { IsoDepTag } The {@link IsoDepTag} object.
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
     * Obtains an {@link IsoDepTag} object based on the tag information.
     * During tag reading, if the tag supports the IsoDep technology, an {@link IsoDepTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { IsoDepTag } The {@link IsoDepTag} object.
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
    function getIsoDep(tagInfo: TagInfo): IsoDepTag;
    /**
     * Obtains an {@link NdefTag} object based on the tag information.
     * During tag reading, if the tag supports the NDEF technology, an {@link NdefTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NdefTag } The {@link NdefTag} object.
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
     * Obtains an {@link NdefTag} object based on the tag information.
     * During tag reading, if the tag supports the NDEF technology, an {@link NdefTag} object
     * will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NdefTag } The {@link NdefTag} object.
     * @throws { BusinessError } 401 - The parameter check failed.  Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    function getNdef(tagInfo: TagInfo): NdefTag;
    /**
     * Obtains an {@link MifareClassicTag} object based on the tag information.
     * During tag reading, if the tag supports the MIFARE Classic technology,
     * an {@link MifareClassicTag} object will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { MifareClassicTag } The {@link MifareClassicTag} object.
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
     * Obtains an {@link MifareClassicTag} object based on the tag information.
     * During tag reading, if the tag supports the MIFARE Classic technology,
     * an {@link MifareClassicTag} object will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { MifareClassicTag } The {@link MifareClassicTag} object.
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
    function getMifareClassic(tagInfo: TagInfo): MifareClassicTag;
    /**
     * Obtains an {@link MifareUltralightTag} object based on the tag information.
     * During tag reading, if the tag supports the MIFARE Ultralight technology,
     * an {@link MifareUltralightTag} object will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { MifareUltralightTag } The {@link MifareUltralightTag} object.
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
     * Obtains an {@link MifareUltralightTag} object based on the tag information.
     * During tag reading, if the tag supports the MIFARE Ultralight technology,
     * an {@link MifareUltralightTag} object will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { MifareUltralightTag } The {@link MifareUltralightTag} object.
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
    function getMifareUltralight(tagInfo: TagInfo): MifareUltralightTag;
    /**
     * Obtains an {@link NdefFormatableTag} object based on the tag information.
     * During tag reading, if the tag supports the NDEF Formatable technology,
     * an {@link NdefFormatableTag} object will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NdefFormatableTag } The {@link NdefFormatableTag} object.
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
     * Obtains an {@link NdefFormatableTag} object based on the tag information.
     * During tag reading, if the tag supports the NDEF Formatable technology,
     * an {@link NdefFormatableTag} object will be created based on the tag information.
     *
     * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
     * @returns { NdefFormatableTag } The {@link NdefFormatableTag} object.
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
    function getNdefFormatable(tagInfo: TagInfo): NdefFormatableTag;
    /**
     * Parse a {@link TagInfo} object from Want.
     *
     * @param { Want } want - The want object that contains the values of TagInfo.
     * @returns { TagInfo } The {@link TagInfo} object.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Parse a {@link TagInfo} object from Want.
     *
     * @param { Want } want - The want object that contains the values of TagInfo.
     * @returns { TagInfo } The {@link TagInfo} object.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    function getTagInfo(want: Want): TagInfo;
    /**
     * Register tag foreground dispatch. Dispatches to this application only if a tag discovered.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { ElementName } elementName - The element name of application, must include the bundleName and abilityName.
     * @param { number[] } discTech - The technologies list to set for discovering. From {@link NFC_A} to {@link MIFARE_ULTRALIGHT}.
     * @param { AsyncCallback<TagInfo> } callback - The callback to dispatched the TagInfo object for application.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 10
     */
    /**
     * Register tag foreground dispatch. Dispatches to this application only if a tag discovered.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { ElementName } elementName - The element name of application, must include the bundleName and abilityName.
     * @param { number[] } discTech - The technologies list to set for discovering. From {@link NFC_A} to {@link MIFARE_ULTRALIGHT}.
     * @param { AsyncCallback<TagInfo> } callback - The callback to dispatched the TagInfo object for application.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100202 - The element state is invalid.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    function registerForegroundDispatch(elementName: ElementName, discTech: number[], callback: AsyncCallback<TagInfo>): void;
    /**
     * Unregister tag foreground dispatch.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { ElementName } elementName - The element name of application, must include the bundleName and abilityName.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 10
     */
    /**
     * Unregister tag foreground dispatch.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { ElementName } elementName - The element name of application, must include the bundleName and abilityName.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    function unregisterForegroundDispatch(elementName: ElementName): void;
    /**
     * Set reader mode enabled when the specific application is foreground. Dispatches to this application only if a tag discovered.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { 'readerMode' } type - The callback type to be registered.
     * @param { ElementName } elementName - The element name of application, must include the bundleName and abilityName.
     * @param { number[] } discTech - The technologies list to set for discovering. From {@link NFC_A} to {@link MIFARE_ULTRALIGHT}.
     * @param { AsyncCallback<TagInfo> } callback - The callback to dispatched the TagInfo object for application.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100202 - The element state is invalid.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 11
     */
    /**
     * Set reader mode enabled when the specific application is foreground. Dispatches to this application only if a tag discovered.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { 'readerMode' } type - The callback type to be registered.
     * @param { ElementName } elementName - The element name of application, must include the bundleName and abilityName.
     * @param { number[] } discTech - The technologies list to set for discovering. From {@link NFC_A} to {@link MIFARE_ULTRALIGHT}.
     * @param { AsyncCallback<TagInfo> } callback - The callback to dispatched the TagInfo object for application.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100202 - The element state is invalid.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    function on(type: 'readerMode', elementName: ElementName, discTech: number[], callback: AsyncCallback<TagInfo>): void;
    /**
     * Disable foreground reader mode settings explicitly.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { 'readerMode' } type - The callback type to be unregistered.
     * @param { ElementName } elementName - The element name of application, must include the bundleName and abilityName.
     * @param { AsyncCallback<TagInfo> } [callback] - The callback to dispatched the TagInfo object for application.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100203 - The off() can be called only when the on() has been called.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 11
     */
    /**
     * Disable foreground reader mode settings explicitly.
     *
     * @permission ohos.permission.NFC_TAG
     * @param { 'readerMode' } type - The callback type to be unregistered.
     * @param { ElementName } elementName - The element name of application, must include the bundleName and abilityName.
     * @param { AsyncCallback<TagInfo> } [callback] - The callback to dispatched the TagInfo object for application.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100203 - The off() can be called only when the on() has been called.
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    function off(type: 'readerMode', elementName: ElementName, callback?: AsyncCallback<TagInfo>): void;
    /**
     * Provides tag information.
     * <p>This class provides the technology a tag supports, for example, NFC-A. Applications can create
     * different tags based on the supported technology.
     *
     * @typedef TagInfo
     * @permission ohos.permission.NFC_TAG
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
   * Provides tag information.
   * <p>This class provides the technology a tag supports, for example, NFC-A. Applications can create
   * different tags based on the supported technology.
   *
   * @typedef TagInfo
   * @permission ohos.permission.NFC_TAG
   * @syscap SystemCapability.Communication.NFC.Tag
   * @atomicservice
   * @since 12
   */
    export interface TagInfo {
        /**
         * The uid of this tag, it.
         *
         * @permission ohos.permission.NFC_TAG
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * The uid of this tag, it.
         *
         * @permission ohos.permission.NFC_TAG
         * @type { number[] }
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        uid: number[];
        /**
         * The supported technology list of this tag.
         *
         * @permission ohos.permission.NFC_TAG
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * The supported technology list of this tag.
         *
         * @permission ohos.permission.NFC_TAG
         * @type { number[] }
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        technology: number[];
        /**
         * The supported technology list of this tag.
         *
         * @permission ohos.permission.NFC_TAG
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.nfc.tag/tag.TagInfo#technology
         */
        supportedProfiles: number[];
    }
    /**
     * NDEF records definition, see NFCForum-TS-NDEF_1.0.
     *
     * @typedef NdefRecord
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * NDEF records definition, see NFCForum-TS-NDEF_1.0.
     *
     * @typedef NdefRecord
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export interface NdefRecord {
        /**
         * tnf of NdefRecord
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * tnf of NdefRecord
         *
         * @type { number }
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        tnf: number;
        /**
         * RTD type of NdefRecord
         *
         * @type { number[] }
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * RTD type of NdefRecord
         *
         * @type { number[] }
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        rtdType: number[];
        /**
         * id of NdefRecord
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * id of NdefRecord
         *
         * @type { number[] }
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        id: number[];
        /**
         * payload of NdefRecord
         *
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * payload of NdefRecord
         *
         * @type { number[] }
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        payload: number[];
    }
    /**
     * Provides methods for accessing NDEF tag.
     *
     * @namespace ndef
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Provides methods for accessing NDEF tag.
     *
     * @namespace ndef
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    namespace ndef {
        /**
         * Creates an NDEF record with uri data.
         *
         * @param { string } uri - Uri data for new NDEF record.
         * @returns { NdefRecord } The instance of NdefRecord.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Creates an NDEF record with uri data.
         *
         * @param { string } uri - Uri data for new NDEF record.
         * @returns { NdefRecord } The instance of NdefRecord.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        function makeUriRecord(uri: string): NdefRecord;
        /**
         * Creates an NDEF record with text data.
         *
         * @param { string } text - Text data for new an NDEF record.
         * @param { string } locale - Language code for the NDEF record. if locale is null, use default locale.
         * @returns { NdefRecord } The instance of NdefRecord.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Creates an NDEF record with text data.
         *
         * @param { string } text - Text data for new an NDEF record.
         * @param { string } locale - Language code for the NDEF record. if locale is null, use default locale.
         * @returns { NdefRecord } The instance of NdefRecord.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        function makeTextRecord(text: string, locale: string): NdefRecord;
        /**
         * Creates an NDEF record with mime data.
         *
         * @param { string } mimeType type of mime data for new an NDEF record.
         * @param { number[] } mimeData mime data for new an NDEF record.
         * @returns { NdefRecord } The instance of NdefRecord.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Creates an NDEF record with mime data.
         *
         * @param { string } mimeType type of mime data for new an NDEF record.
         * @param { number[] } mimeData mime data for new an NDEF record.
         * @returns { NdefRecord } The instance of NdefRecord.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        function makeMimeRecord(mimeType: string, mimeData: number[]): NdefRecord;
        /**
         * Creates an NDEF record with external data.
         *
         * @param { string } domainName - Domain name of issuing organization for the external data.
         * @param { string } type - Domain specific type of data for the external data.
         * @param { number[] } externalData - Data payload of an NDEF record.
         * @returns { NdefRecord } The instance of NdefRecord.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Creates an NDEF record with external data.
         *
         * @param { string } domainName - Domain name of issuing organization for the external data.
         * @param { string } type - Domain specific type of data for the external data.
         * @param { number[] } externalData - Data payload of an NDEF record.
         * @returns { NdefRecord } The instance of NdefRecord.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        function makeExternalRecord(domainName: string, type: string, externalData: number[]): NdefRecord;
        /**
         * Creates an NDEF message with raw bytes.
         *
         * @param { number[] } data - The raw bytes to parse NDEF message.
         * @returns { NdefMessage } The instance of NdefMessage.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Creates an NDEF message with raw bytes.
         *
         * @param { number[] } data - The raw bytes to parse NDEF message.
         * @returns { NdefMessage } The instance of NdefMessage.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        function createNdefMessage(data: number[]): NdefMessage;
        /**
         * Creates an NDEF message with record list.
         *
         * @param { NdefRecord[] } ndefRecords - The NDEF records to parse NDEF message.
         * @returns { NdefMessage } The instance of NdefMessage.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Creates an NDEF message with record list.
         *
         * @param { NdefRecord[] } ndefRecords - The NDEF records to parse NDEF message.
         * @returns { NdefMessage } The instance of NdefMessage.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        function createNdefMessage(ndefRecords: NdefRecord[]): NdefMessage;
        /**
         * Parses an NDEF message into raw bytes.
         *
         * @param { NdefMessage } ndefMessage - An NDEF message to parse.
         * @returns { number[] } Returns the raw bytes of an NDEF message.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @since 9
         */
        /**
         * Parses an NDEF message into raw bytes.
         *
         * @param { NdefMessage } ndefMessage - An NDEF message to parse.
         * @returns { number[] } Returns the raw bytes of an NDEF message.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.Communication.NFC.Tag
         * @atomicservice
         * @since 12
         */
        function messageToBytes(ndefMessage: NdefMessage): number[];
    }
    /**
     * Exports type NfcATag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Exports type NfcATag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type NfcATag = _NfcATag;
    /**
     * Exports type NfcBTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Exports type NfcBTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type NfcBTag = _NfcBTag;
    /**
     * Exports type NfcFTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Exports type NfcFTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type NfcFTag = _NfcFTag;
    /**
     * Exports type NfcVTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Exports type NfcVTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type NfcVTag = _NfcVTag;
    /**
     * Exports type IsoDepTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Exports type IsoDepTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type IsoDepTag = _IsoDepTag;
    /**
     * Exports type NdefTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Exports type NdefTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type NdefTag = _NdefTag;
    /**
     * Exports type MifareClassicTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Exports type MifareClassicTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type MifareClassicTag = _MifareClassicTag;
    /**
     * Exports type MifareUltralightTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Exports type MifareUltralightTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type MifareUltralightTag = _MifareUltralightTag;
    /**
     * Exports type NdefFormatableTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Exports type NdefFormatableTag.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type NdefFormatableTag = _NdefFormatableTag;
    /**
     * Exports type NdefMessage.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 9
     */
    /**
     * Exports type NdefMessage.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type NdefMessage = _NdefMessage;
    /**
     * Exports type TagSession.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @since 7
     */
    /**
     * Exports type TagSession.
     *
     * @syscap SystemCapability.Communication.NFC.Tag
     * @atomicservice
     * @since 12
     */
    export type TagSession = _TagSession;
}
export default tag;
