/*
 * Copyright (c) 2021-2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
/**
 * @namespace zlib
 * @syscap SystemCapability.BundleManager.Zlib
 * @since 7
 */
/**
 * @namespace zlib
 * @syscap SystemCapability.BundleManager.Zlib
 * @atomicservice
 * @since 11
 */
/**
 * @namespace zlib
 * @syscap SystemCapability.BundleManager.Zlib
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace zlib {
    /**
     * ErrorCode
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 7
     * @deprecated since 9
     */
    export enum ErrorCode {
        /**
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         * @deprecated since 9
         */
        ERROR_CODE_OK = 0,
        /**
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         * @deprecated since 9
         */
        ERROR_CODE_ERRNO = -1
    }
    /**
     * CompressLevel
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 7
     */
    /**
     * CompressLevel
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum CompressLevel {
        /**
         * Indicates the no compression mode.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the no compression mode.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COMPRESS_LEVEL_NO_COMPRESSION = 0,
        /**
         * Indicates the best speed mode.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the best speed mode.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COMPRESS_LEVEL_BEST_SPEED = 1,
        /**
         * Indicates the best compression mode.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the best compression mode.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COMPRESS_LEVEL_BEST_COMPRESSION = 9,
        /**
         * Indicates the default compression mode.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the default compression mode.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COMPRESS_LEVEL_DEFAULT_COMPRESSION = -1
    }
    /**
     * CompressStrategy
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 7
     */
    /**
     * CompressStrategy
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum CompressStrategy {
        /**
         * Indicates the default strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the default strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COMPRESS_STRATEGY_DEFAULT_STRATEGY = 0,
        /**
         * Indicates the filtered strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the filtered strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COMPRESS_STRATEGY_FILTERED = 1,
        /**
         * Indicates the huffman-only strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the huffman-only strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COMPRESS_STRATEGY_HUFFMAN_ONLY = 2,
        /**
         * Indicates the RLE strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the RLE strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COMPRESS_STRATEGY_RLE = 3,
        /**
         * Indicates the fixed strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the fixed strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COMPRESS_STRATEGY_FIXED = 4
    }
    /**
     * MemLevel
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 7
     */
    /**
     * MemLevel
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum MemLevel {
        /**
         * Uses the least amount of memory.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Uses the least amount of memory.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        MEM_LEVEL_MIN = 1,
        /**
         * Uses the maximum amount of memory.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Uses the maximum amount of memory.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        MEM_LEVEL_MAX = 9,
        /**
         * Uses the default amount of memory.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Uses the default amount of memory.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        MEM_LEVEL_DEFAULT = 8
    }
    /**
     * CompressFlushMode
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    export enum CompressFlushMode {
        /**
         * Default value, indicating normal operation.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        NO_FLUSH = 0,
        /**
         * Generate partial refresh points in compressed streams.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        PARTIAL_FLUSH = 1,
        /**
         * Force output of all compressed data while maintaining the compressed stream state.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        SYNC_FLUSH = 2,
        /**
         * the compression state is reset.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        FULL_FLUSH = 3,
        /**
         * The compression or decompression process ends.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        FINISH = 4,
        /**
         * Allow for finer grained control.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        BLOCK = 5,
        /**
         * There are special purposes in implementation.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        TREES = 6
    }
    /**
     * Return codes for the compression/decompression functions.
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    export enum ReturnStatus {
        /**
         * Indicates success.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        OK = 0,
        /**
         * Indicates that the entire data has been processed.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        STREAM_END = 1,
        /**
         * Indicates preset dictionary is required to continue decompression.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        NEED_DICT = 2
    }
    /**
     * The deflate compression method (the only one supported in this version).
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    export enum CompressMethod {
        /**
         * Compression method.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        DEFLATED = 8
    }
    /**
     * Define the reference point for offset.
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    export enum OffsetReferencePoint {
        /**
         * Seek from beginning of file.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        SEEK_SET = 0,
        /**
         * Seek from current position.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        SEEK_CUR = 1
    }
    /**
     * Defines compress or decompress options.
     *
     * @typedef Options
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 7
     */
    /**
     * Defines compress or decompress options.
     *
     * @typedef Options
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface Options {
        /**
         * Indicates the compress level.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the compress level.
         *
         * @type { ?CompressLevel }
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        level?: CompressLevel;
        /**
         * Indicates the memory level.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the memory level.
         *
         * @type { ?MemLevel }
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        memLevel?: MemLevel;
        /**
         * Indicates the compress strategy.
         *
         * @syscap SystemCapability.BundleManager.Zlib
         * @since 7
         */
        /**
         * Indicates the compress strategy.
         *
         * @type { ?CompressStrategy }
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        strategy?: CompressStrategy;
    }
    /**
     * Process all the information required for compression and decompression.
     *
     * @typedef ZStream
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    interface ZStream {
        /**
         * Next input byte.
         *
         * @type { ?ArrayBuffer }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        nextIn?: ArrayBuffer;
        /**
         * Number of bytes available at nextIn.
         *
         * @type { ?number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        availableIn?: number;
        /**
         * Total number of input bytes read so far.
         *
         * @type { ?number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        totalIn?: number;
        /**
         * Next output byte will go here.
         *
         * @type { ?ArrayBuffer }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        nextOut?: ArrayBuffer;
        /**
         * Remaining free space at nextOut.
         *
         * @type { ?number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        availableOut?: number;
        /**
         * Total number of bytes output so far.
         *
         * @type { ?number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        totalOut?: number;
        /**
         * Best guess about the data type.
         *
         * @type { ?number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        dataType?: number;
        /**
         * Adler-32 or CRC-32 value of the uncompressed data.
         *
         * @type { ?number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        adler?: number;
    }
    /**
     * Gzip header information passed to and from zlib routines.
     *
     * @typedef GzHeader
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    interface GzHeader {
        /**
         * True if compressed data believed to be text.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        isText?: boolean;
        /**
         * Operating system.
         *
         * @type { ?number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        os?: number;
        /**
         * Modification time.
         *
         * @type { ?number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        time?: number;
        /**
         * Extra flags.
         *
         * @type { ?number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        xflags?: number;
        /**
         * Extra field.
         *
         * @type { ?ArrayBuffer }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        extra?: ArrayBuffer;
        /**
         * Extra field length.
         *
         * @type { ?number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        extraLen?: number;
        /**
         * Zero-terminated file name.
         *
         * @type { ?ArrayBuffer }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        name?: ArrayBuffer;
        /**
         * Zero-terminated comment.
         *
         * @type { ?ArrayBuffer }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        comment?: ArrayBuffer;
        /**
         * True if there was or will be a header crc
         *
         * @type { ?boolean }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        hcrc?: boolean;
        /**
         * True when done reading gzip header.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        done?: boolean;
    }
    /**
     * Compression and decompression return value information.
     *
     * @typedef ZipOutputInfo
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    interface ZipOutputInfo {
        /**
         * ReturnStatus the specific meaning is defined as enum.
         *
         * @type { ReturnStatus }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        status: ReturnStatus;
        /**
         * Total sizeof the destination buffer.
         *
         * @type { number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        destLen: number;
    }
    /**
     * InflateGetDictionary and deflateGetDictionary return value information.
     *
     * @typedef DictionaryOutputInfo
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    interface DictionaryOutputInfo {
        /**
         * ReturnStatus the specific meaning is defined as enum.
         *
         * @type { ReturnStatus }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        status: ReturnStatus;
        /**
         * Return dictionary length.
         *
         * @type { number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        dictionaryLength: number;
    }
    /**
     * Uncompress2 return value information.
     *
     * @typedef DecompressionOutputInfo
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    interface DecompressionOutputInfo {
        /**
         * ReturnStatus the specific meaning is defined as enum.
         *
         * @type { ReturnStatus }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        status: ReturnStatus;
        /**
         * Total sizeof the destination buffer.
         *
         * @type { number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        destLength: number;
        /**
         * Total sizeof the sourceLen.
         *
         * @type { number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        sourceLength: number;
    }
    /**
     * DeflatePending return value information.
     *
     * @typedef DeflatePendingOutputInfo
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    interface DeflatePendingOutputInfo {
        /**
         * ReturnStatus the specific meaning is defined as enum.
         *
         * @type { ReturnStatus }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        status: ReturnStatus;
        /**
         * The number of bytes of output that have been generated.
         *
         * @type { number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        pending: number;
        /**
         * The number of bits of output that have been generated.
         *
         * @type { number }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        bits: number;
    }
    /**
     * GzError return value information.
     *
     * @typedef GzErrorOutputInfo
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    interface GzErrorOutputInfo {
        /**
         * Return Zlib status ReturnStatus the specific meaning is defined as enum.
         *
         * @type { ReturnStatus }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        status: ReturnStatus;
        /**
         * The status message for the last status which occurred on file.
         *
         * @type { string }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        statusMsg: string;
    }
    /**
     * A callback function for reading input data provided by a user. When the decompression process requires more input data,
     * zlib will call this function. This function should read data from the data source to the buffer.
     *
     * @typedef { function }
     * @param { object } inDesc - A universal user-defined data object.
     * The specific type and content depend on the actual application scenario, which can include configuration data, file handles, etc.
     * @returns { ArrayBuffer } Return the buffer successfully read by the data source through the input descriptor.
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    type InflateBackInputCallback = (inDesc: object) => ArrayBuffer;
    /**
     * The output data provided by the user is written into the callback function. Whenever decompressed data is ready for output,
     * zlib calls this function to write the data from the buffer to the target location.
     *
     * @typedef { function }
     * @param { object } outDesc - Object passed to output function. Object dependency requirement implementation.
     * @param { ArrayBuffer } buf - Used to store data to be written.
     * @param { number } length - Write the length of the output buffer.
     * @returns { number } Return the number of bytes output.
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    type InflateBackOutputCallback = (outDesc: object, buf: ArrayBuffer, length: number) => number;
    /**
     * Compress the specified file.
     *
     * @param { string } inFile Indicates the path of the file to be compressed.
     * @param { string } outFile Indicates the path of the output compressed file.
     * @param { Options } options
     * @returns { Promise<void> }
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.zlib#compressFile
     */
    function zipFile(inFile: string, outFile: string, options: Options): Promise<void>;
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile Indicates the path of the file to be decompressed.
     * @param { string } outFile Indicates the path of the decompressed file.
     * @param { Options } options
     * @returns { Promise<void> }
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.zlib#decompressFile
     */
    function unzipFile(inFile: string, outFile: string, options: Options): Promise<void>;
    /**
     * Compress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be compressed.
     * @param { string } outFile - Indicates the path of the output compressed file.
     * @param { Options } options - Indicates the options of compressing file.
     * @param { AsyncCallback<void> } callback - The callback of compressing file result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 9
     */
    /**
     * Compress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be compressed.
     * @param { string } outFile - Indicates the path of the output compressed file.
     * @param { Options } options - Indicates the options of compressing file.
     * @param { AsyncCallback<void> } callback - The callback of compressing file result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function compressFile(inFile: string, outFile: string, options: Options, callback: AsyncCallback<void>): void;
    /**
     * Compress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be compressed.
     * @param { string } outFile - Indicates the path of the output compressed file.
     * @param { Options } options - Indicates the options of compressing file.
     * @returns { Promise<void> } Returns the result of compressFile file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 9
     */
    /**
     * Compress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be compressed.
     * @param { string } outFile - Indicates the path of the output compressed file.
     * @param { Options } options - Indicates the options of compressing file.
     * @returns { Promise<void> } Returns the result of compressFile file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function compressFile(inFile: string, outFile: string, options: Options): Promise<void>;
    /**
     * Compress the specified multiple files.
     *
     * @param { Array<string> } inFiles - Indicates the files to be compressed.
     * @param { string } outFile - Indicates the path of the output compressed file.
     * @param { Options } options - Indicates the options of compressing file.
     * @returns { Promise<void> } Returns the result of compressFile file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    function compressFiles(inFiles: Array<string>, outFile: string, options: Options): Promise<void>;
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be decompressed.
     * @param { string } outFile - Indicates the path of the output decompressed file.
     * @param { Options } options - Indicates the options of decompressing file.
     * @param { AsyncCallback<void> } callback - The callback of decompressing file result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 9
     */
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be decompressed.
     * @param { string } outFile - Indicates the path of the output decompressed file.
     * @param { Options } options - Indicates the options of decompressing file.
     * @param { AsyncCallback<void> } callback - The callback of decompressing file result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not in ZIP format or is damaged.
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 10
     */
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be decompressed.
     * @param { string } outFile - Indicates the path of the output decompressed file.
     * @param { Options } options - Indicates the options of decompressing file.
     * @param { AsyncCallback<void> } callback - The callback of decompressing file result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not in ZIP format or is damaged.
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function decompressFile(inFile: string, outFile: string, options: Options, callback: AsyncCallback<void>): void;
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be decompressed.
     * @param { string } outFile - Indicates the path of the output decompressed file.
     * @param { AsyncCallback<void> } callback - The callback of decompressing file result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not in ZIP format or is damaged.
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 10
     */
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be decompressed.
     * @param { string } outFile - Indicates the path of the output decompressed file.
     * @param { AsyncCallback<void> } callback - The callback of decompressing file result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not in ZIP format or is damaged.
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function decompressFile(inFile: string, outFile: string, callback: AsyncCallback<void>): void;
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be decompressed.
     * @param { string } outFile - Indicates the path of the output decompressing file.
     * @param { Options } options - Indicates the options of decompressing file.
     * @returns { Promise<void> } Returns the result of decompressing file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 9
     */
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be decompressed.
     * @param { string } outFile - Indicates the path of the output decompressing file.
     * @param { Options } options - Indicates the options of decompressing file.
     * @returns { Promise<void> } Returns the result of decompressing file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not in ZIP format or is damaged.
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 10
     */
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be decompressed.
     * @param { string } outFile - Indicates the path of the output decompressing file.
     * @param { Options } options - Indicates the options of decompressing file.
     * @returns { Promise<void> } Returns the result of decompressing file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not in ZIP format or is damaged.
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function decompressFile(inFile: string, outFile: string, options?: Options): Promise<void>;
    /**
     * Get the original size of the compressed zip file, the size is the meta data stored in zip file.
     *
     * @param { string } compressedFile - Indicates the path of the compressed file.
     * @returns { Promise<number> } Returns the original size of the compressed file.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not in ZIP format or is damaged.
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function getOriginalSize(compressedFile: string): Promise<number>;
    /**
     * Asynchronous creation of verification objects.
     *
     * @returns { Promise<Checksum> } Returns verification objects.
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    function createChecksum(): Promise<Checksum>;
    /**
     * Synchronize creation of verification objects.
     *
     * @returns { Checksum } Returns verification objects.
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    function createChecksumSync(): Checksum;
    /**
     * Asynchronous creation of zip objects.
     *
     * @returns { Promise<Zip> } Returns zip objects.
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    function createZip(): Promise<Zip>;
    /**
     * Synchronize creation of zip objects.
     *
     * @returns { Zip } Returns zip objects.
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    function createZipSync(): Zip;
    /**
     * Synchronize creation of gzip objects.
     *
     * @returns { Promise<GZip> } Returns zip objects.
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    function createGZip(): Promise<GZip>;
    /**
     * Synchronize creation of gzip objects.
     *
     * @returns { GZip } Returns zip objects.
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    function createGZipSync(): GZip;
    /**
     * Calculate Adler-32 and CRC-32 checksum.
     *
     * @typedef Checksum
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    interface Checksum {
        /**
         * Update a running Adler-32 checksum with the bytes buf.
         *
         * @param { number } adler - Initial value of Adler32 checksum.
         * @param { ArrayBuffer } buf - Calculate checksum data buffer.
         * @returns { Promise<number> } Return the updated checksum.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        adler32(adler: number, buf: ArrayBuffer): Promise<number>;
        /**
         * Combine two Adler-32 checksum into one.
         *
         * @param { number } adler1 - The first Adler32 checksum.
         * @param { number } adler2 - The second Adler32 checksum.
         * @param { number } len2 - The length of the data block associated with the second Adler32 checksum.
         * @returns { Promise<number> } Returns the Adler-32 checksum.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        adler32Combine(adler1: number, adler2: number, len2: number): Promise<number>;
        /**
         * Update a running CRC-32 with the bytes buf.
         *
         * @param { number } crc - Initial value of CRC-32 checksum.
         * @param { ArrayBuffer } buf - Calculate checksum data buffer.
         * @returns { Promise<number> } Return the updated CRC-32.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        crc32(crc: number, buf: ArrayBuffer): Promise<number>;
        /**
         * Combine two CRC-32 check values into one.
         *
         * @param { number } crc1 - The first CRC-32 checksum.
         * @param { number } crc2 - The second CRC-32 checksum.
         * @param { number } len2 - The length of the data block associated with the second CRC-32 checksum.
         * @returns { Promise<number> } Returns the CRC-32 check value.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        crc32Combine(crc1: number, crc2: number, len2: number): Promise<number>;
        /**
         * Update a running CRC-64 with the bytes buf.
         *
         * @param { number } crc - Initial value of CRC-64 checksum.
         * @param { ArrayBuffer } buf - Calculate checksum data buffer.
         * @returns { Promise<number> } Return the updated CRC-64.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        crc64(crc: number, buf: ArrayBuffer): Promise<number>;
        /**
         * Get CRC-32 table.
         *
         * @returns { Promise<Array<number>> } Return a array to the CRC-32 table.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        getCrcTable(): Promise<Array<number>>;
        /**
         * Get CRC-64 table.
         *
         * @returns { Promise<Array<number>> } Return a array to the CRC-64 table.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        getCrc64Table(): Promise<Array<number>>;
    }
    /**
     * Deflate and inflate interface.
     *
     * @typedef Zip
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    interface Zip {
        /**
         * Get ZStream.
         *
         * @returns { Promise<ZStream> } Return the required ZStream for compression or decompression.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        getZStream(): Promise<ZStream>;
        /**
         * Get the version information of the current linked zlib library.
         *
         * @returns { Promise<string> } Returns a specific version number string constant containing the zlib library.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        zlibVersion(): Promise<string>;
        /**
         * Return flags indicating compile-time options.
         *
         * @returns { Promise<number> } Return flags indicating compile-time options.
         * Type sizes, two bits each, 00 = 16 bits, 01 = 32, 10 = 64, 11 = other:
         * 1.0: size of uInt.
         * 3.2: size of uLong.
         * 5.4: size of voidpf (pointer).
         * 7.6: size of z_off_t.
         * Compiler, assembler, and debug options:
         * 8: ZLIB_DEBUG.
         * 9: ASMV or ASMINF -- use ASM code.
         * 10: ZLIB_WINAPI -- exported functions use the WINAPI calling convention.
         * 11: 0 (reserved).
         * One-time table building (smaller code, but not thread-safe if true):
         * 12: BUILDFIXED -- build static block decoding tables when needed.
         * 13: DYNAMIC_CRC_TABLE -- build CRC calculation tables when needed.
         * 14,15: 0 (reserved).
         * Library content (indicates missing functionality):
         * 16: NO_GZCOMPRESS -- gz* functions cannot compress (to avoid linking deflate code when not needed).
         * 17: NO_GZIP -- deflate can't write gzip streams, and inflate can't detect and decode gzip streams (to avoid linking crc code).
         * 18-19: 0 (reserved).
         * Operation variations (changes in library functionality):
         * 20: PKZIP_BUG_WORKAROUND -- slightly more permissive inflate.
         * 21: FASTEST -- deflate algorithm with only one, lowest compression level.
         * 22,23: 0 (reserved).
         * The sprintf variant used by gzprintf (zero is best):
         * 24: 0 = vs*, 1 = s* -- 1 means limited to 20 arguments after the format.
         * 25: 0 = *nprintf, 1 = *printf -- 1 means gzprintf() not secure.
         * 26: 0 = returns value, 1 = void -- 1 means inferred string length returned.
         * Remainder:
         * 27-31: 0 (reserved).
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        zlibCompileFlags(): Promise<number>;
        /**
         * Compresses the source buffer into the destination buffer.
         *
         * @param { ArrayBuffer } dest - Destination buffer.
         * @param { ArrayBuffer } source - Source data buffer.
         * @param { number } sourceLen - Source data length.
         * @returns { Promise<ZipOutputInfo> } Return ReturnStatus and total sizeof the destination buffer.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800007 - Buffer error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        compress(dest: ArrayBuffer, source: ArrayBuffer, sourceLen?: number): Promise<ZipOutputInfo>;
        /**
         * Compresses the source buffer into the destination buffer.
         *
         * @param { ArrayBuffer } dest - Destination buffer.
         * @param { ArrayBuffer } source - Source data buffer.
         * @param { CompressLevel } level - Compression level.
         * @param { number } sourceLen - Source data length.
         * @returns { Promise<ZipOutputInfo> } Return ReturnStatus and total sizeof the destination buffer.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @throws { BusinessError } 17800007 - Buffer error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        compress2(dest: ArrayBuffer, source: ArrayBuffer, level: CompressLevel, sourceLen?: number): Promise<ZipOutputInfo>;
        /**
         * Calculate the upper limit of the return compression size.
         *
         * @param { number } sourceLen - The length of the source data.
         * @returns { Promise<number> } Returns an upper bound on the compressed size after.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        compressBound(sourceLen: number): Promise<number>;
        /**
         * Decompress the compressed data into its original uncompressed form.
         *
         * @param { ArrayBuffer } dest - Destination buffer.
         * @param { ArrayBuffer } source - Source data buffer.
         * @param { number } sourceLen - Source data length.
         * @returns { Promise<ZipOutputInfo> } Return ReturnStatus and total sizeof the destination buffer.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800005 - Data error.
         * @throws { BusinessError } 17800007 - Buffer error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        uncompress(dest: ArrayBuffer, source: ArrayBuffer, sourceLen?: number): Promise<ZipOutputInfo>;
        /**
         * Decompress the compressed data into its original uncompressed form.
         *
         * @param { ArrayBuffer } dest - Destination buffer.
         * @param { ArrayBuffer } source - Source data buffer.
         * @param { number } sourceLen - Source data length.
         * @returns { Promise<DecompressionOutputInfo> } Return ReturnStatus and total sizeof the destination buffer and total sizeof the sourceLen.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800005 - Data error.
         * @throws { BusinessError } 17800007 - Buffer error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        uncompress2(dest: ArrayBuffer, source: ArrayBuffer, sourceLen?: number): Promise<DecompressionOutputInfo>;
        /**
         * Verify the checksum inside the structure of compressed stream z_stream.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { number } check - Expected checksum.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateValidate(strm: ZStream, check: number): Promise<ReturnStatus>;
        /**
         * Find a synchronization point for the current decompressed stream.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateSyncPoint(strm: ZStream): Promise<ReturnStatus>;
        /**
         * Skips invalid compressed data until a possible full flush point can be found.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @throws { BusinessError } 17800005 - Data error.
         * @throws { BusinessError } 17800007 - Buffer error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateSync(strm: ZStream): Promise<ReturnStatus>;
        /**
         * Initializes the decompression dictionary from the given uncompressed byte sequence.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { ArrayBuffer } dictionary - Dictionary data.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @throws { BusinessError } 17800005 - Data error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateSetDictionary(strm: ZStream, dictionary: ArrayBuffer): Promise<ReturnStatus>;
        /**
         * Reset the state of the decompressed stream to retain the allocated Huffman decoding tree and preset dictionary.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateResetKeep(strm: ZStream): Promise<ReturnStatus>;
        /**
         * This function is equivalent to inflateEnd followed by inflateInit, but does not free and reallocate the internal decompression state.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { number } windowBits - Parameter is interpreted the same as it is for inflateInit2.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateReset2(strm: ZStream, windowBits: number): Promise<ReturnStatus>;
        /**
         * This function is equivalent to inflateEnd followed by inflateInit, but does not free and reallocate the internal decompression state.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateReset(strm: ZStream): Promise<ReturnStatus>;
        /**
         * This function inserts bits in the inflate input stream.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { number } bits - The provided bits.
         * @param { number } value - The provided value.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflatePrime(strm: ZStream, bits: number, value: number): Promise<ReturnStatus>;
        /**
         * Is used to mark locations in the input data for random access.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<number> } Return the internal marker position of the current decompressed stream.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateMark(strm: ZStream): Promise<number>;
        /**
         * Initializes the internal stream state for decompression.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { number } windowBits - Is the base two logarithm of the maximum window size.
         * It should be in the range 8..15 for this version of the library. The default value is 15 if inflateInit is used instead.
         * windowBits must be greater than or equal to the windowBits value provided to deflateInit2() while compressing,
         * or it must be equal to 15 if deflateInit2() was not used. If a compressed stream with a larger window size is given as input,
         * inflate() will return with the error code Z_DATA_ERROR instead of trying to allocate a larger window.
         * WindowBits can also be zero to request that inflate use the window size in the zlib header of the compressed stream.
         * WindowBits can also be -8..-15 for raw inflate. In this case, -windowBits determines the window size.
         * inflate() will then process raw deflate data, not looking for a zlib or gzip header,
         * not generating a check value, and not looking for any check values for comparison at the end of the stream.
         * This is for use with other formats that use the deflate compressed data format such as zip. Those formats provide their own check values.
         * If a custom format is developed using the raw deflate format for compressed data, it is recommended that a check value such as an Adler-32 or
         * a CRC-32 be applied to the uncompressed data as is done in the zlib, gzip, and zip formats. For most applications,
         * the zlib format should be used as is. Note that comments above on the use in deflateInit2() applies to the magnitude of windowBits.WindowBits
         * can also be greater than 15 for optional gzip decoding. Add 32 to windowBits to enable zlib and gzip decoding with automatic header detection,
         * or add 16 to decode only the gzip format. If a gzip stream is being decoded, strm->adler is a CRC-32 instead of an Adler-32.
         * Unlike the gunzip utility and gzread(), inflate() will *not* automatically decode concatenated gzip members. Inflate() will return
         * Z_STREAM_END at the end of the gzip member. The state would need to be reset to continue decoding a subsequent gzip member.
         * This *must* be done if there is more data after a gzip member, in order for the decompression to be compliant with the gzip standard.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateInit2(strm: ZStream, windowBits: number): Promise<ReturnStatus>;
        /**
         * Initializes the internal stream state for decompression.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateInit(strm: ZStream): Promise<ReturnStatus>;
        /**
         * Requests that gzip header information be stored in the provided gz_header structure.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { GzHeader } header - Receive gzip header information extracted from compressed data stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateGetHeader(strm: ZStream, header: GzHeader): Promise<ReturnStatus>;
        /**
         * Obtain the current dictionary content of the decompressed stream.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { ArrayBuffer } dictionary - The sliding dictionary being maintained by inflate.
         * @returns { Promise<DictionaryOutputInfo> } Return ReturnStatus and dictionary length.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateGetDictionary(strm: ZStream, dictionary: ArrayBuffer): Promise<DictionaryOutputInfo>;
        /**
         * All dynamically allocated data structures for this stream are freed.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateEnd(strm: ZStream): Promise<ReturnStatus>;
        /**
         * Sets the destination stream as a complete copy of the source stream.
         *
         * @param { Zip } source - The status information of the current decompression process.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateCopy(source: Zip): Promise<ReturnStatus>;
        /**
         * Obtain the number of Huffman encoding trees that have been used in the current decompression stream during the inflate process.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<number> } Return the number of used Huffman encoding trees.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateCodesUsed(strm: ZStream): Promise<number>;
        /**
         * Initialize the internal stream state for decompression using inflateBack() calls.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { number } windowBits - Parameter is interpreted the same as it is for inflateInit2. The value range is between 8~15.
         * @param { ArrayBuffer } window - The preset sliding window buffer.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateBackInit(strm: ZStream, windowBits: number, window: ArrayBuffer): Promise<ReturnStatus>;
        /**
         * All memory allocated by inflateBackInit() is freed.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateBackEnd(strm: ZStream): Promise<ReturnStatus>;
        /**
         * Does a raw inflate with a single call using a call-back interface for input and output.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { InflateBackInputCallback } backIn - A function that decompresses data from the end to read the raw compressed data from the input source.
         * @param { object } inDesc - Universal object.
         * @param { InflateBackOutputCallback } backOut - Write the decompressed data to the target output.
         * @param { object } outDesc - Universal object.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflateBack(strm: ZStream, backIn: InflateBackInputCallback, inDesc: object, backOut: InflateBackOutputCallback, outDesc: object): Promise<ReturnStatus>;
        /**
         * Decompresses as much data as possible, and stops when the input buffer becomes empty or the output buffer becomes full.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { CompressFlushMode } flush - The behavior pattern of compression operation.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @throws { BusinessError } 17800005 - Data error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        inflate(strm: ZStream, flush: CompressFlushMode): Promise<ReturnStatus>;
        /**
         * Initializes the internal stream state for compression.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { CompressLevel } level - Compression level.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateInit(strm: ZStream, level: CompressLevel): Promise<ReturnStatus>;
        /**
         * Initializes the internal stream state for compression.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { CompressLevel } level - Compression level.
         * @param { CompressMethod } method - The compression method.
         * @param { number } windowBits - Parameter is interpreted the same as it is for inflateInit2.
         * @param { MemLevel } memLevel - The memory usage level.
         * @param { CompressStrategy } strategy - The compression strategy.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateInit2(strm: ZStream, level: CompressLevel, method: CompressMethod, windowBits: number, memLevel: MemLevel, strategy: CompressStrategy): Promise<ReturnStatus>;
        /**
         * Compresses as much data as possible, and stops when the input buffer becomes empty or the output buffer becomes full.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { CompressFlushMode } flush - The behavior pattern of compression operation.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @throws { BusinessError } 17800007 - Buffer error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflate(strm: ZStream, flush: CompressFlushMode): Promise<ReturnStatus>;
        /**
         * All dynamically allocated data structures for this stream are freed.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateEnd(strm: ZStream): Promise<ReturnStatus>;
        /**
         * Calculate an upper bound on the compressed size.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { number } sourceLength - The length of uncompressed data.
         * @returns { Promise<number> } Return an upper bound on the compressed size.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateBound(strm: ZStream, sourceLength: number): Promise<number>;
        /**
         * Provides gzip header information for when a gzip stream is requested by deflateInit2().
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { GzHeader } head - Object a to gz_headerp that already has gzip header information.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateSetHeader(strm: ZStream, head: GzHeader): Promise<ReturnStatus>;
        /**
         * Sets the destination stream as a complete copy of the source stream.
         *
         * @param { Zip } source - Object to source z_stream structure.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateCopy(source: Zip): Promise<ReturnStatus>;
        /**
         * Initializes the compression dictionary from the given byte sequence without producing any compressed output.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { ArrayBuffer } dictionary - Object a to gz_headerp that already has gzip header information.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateSetDictionary(strm: ZStream, dictionary: ArrayBuffer): Promise<ReturnStatus>;
        /**
         * Returns the sliding dictionary being maintained by deflate.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { ArrayBuffer } dictionary - The sliding dictionary being maintained by deflate.
         * @returns { Promise<DictionaryOutputInfo> } Return ReturnStatus and dictionary length
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateGetDictionary(strm: ZStream, dictionary: ArrayBuffer): Promise<DictionaryOutputInfo>;
        /**
         * Fine tune deflate's internal compression parameters.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { number } goodLength - Good matching length threshold.
         * @param { number } maxLazy - Maximum lazy matching times.
         * @param { number } niceLength - Good Lazy Length Threshold.
         * @param { number } maxChain - Maximum chain length.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateTune(strm: ZStream, goodLength: number, maxLazy: number, niceLength: number, maxChain: number): Promise<ReturnStatus>;
        /**
         * This function is equivalent to deflateEnd followed by deflateInit, but does not free and reallocate the internal compression state.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateReset(strm: ZStream): Promise<ReturnStatus>;
        /**
         * Reset the initialized deflate compressed stream, but retain its set compression parameters and dictionary.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateResetKeep(strm: ZStream): Promise<ReturnStatus>;
        /**
         * Returns the number of bytes and bits of output that have been generated, but not yet provided in the available output.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @returns { Promise<DeflatePendingOutputInfo> } Return ReturnStatus along with the number of bytes and bits generated.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflatePending(strm: ZStream): Promise<DeflatePendingOutputInfo>;
        /**
         * Dynamically update the compression level and compression strategy.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { CompressLevel } level - New compression level.
         * @param { CompressStrategy } strategy - New compression strategy.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflateParams(strm: ZStream, level: CompressLevel, strategy: CompressStrategy): Promise<ReturnStatus>;
        /**
         * Inserts bits in the deflate output stream.
         *
         * @param { ZStream } strm - Object to structure z_stream.
         * @param { number } bits - The number of bits to be inserted. The value range is between 0~16.
         * @param { number } value - The bit value corresponding to the number of bits.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        deflatePrime(strm: ZStream, bits: number, value: number): Promise<ReturnStatus>;
    }
    /**
     * Gzip related interfaces.
     *
     * @typedef GZip
     * @syscap SystemCapability.BundleManager.Zlib
     * @atomicservice
     * @since 12
     */
    interface GZip {
        /**
         * Associate a gzFile with the file descriptor fd.
         *
         * @param { number } fd - The file descriptor. Usually this is obtained through system calls to 'open' or other methods.
         * @param { string } mode - Used to specify access mode.
         * @returns { Promise<void> }
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800002 - No such file or access mode error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzdopen(fd: number, mode: string): Promise<void>;
        /**
         * Set the internal buffer size used by this library's functions for file to size.
         *
         * @param { number } size - The internal buffer size to be set.
         * @returns { Promise<number> } Returns 0 on success.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzbuffer(size: number): Promise<number>;
        /**
         * Open the gzip (.gz) file at path for reading and decompressing, or compressing and writing.
         *
         * @param { string } path - The file path to be opened.
         * @param { string } mode - Specify the file opening method.
         * @returns { Promise<void> }
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800002 - No such file or access mode error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzopen(path: string, mode: string): Promise<void>;
        /**
         * Check if the reading position of the gzip compressed file has reached the end of the file.
         *
         * @returns { Promise<number> } Return 1 (true) if the end-of-file indicator for file has been set while reading.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzeof(): Promise<number>;
        /**
         * Check if the specified gzip file handle file directly accesses the original uncompressed data.
         *
         * @returns { Promise<number> } returns 1 (true) if transparent writing was requested.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzdirect(): Promise<number>;
        /**
         * Flush all pending output for file, if necessary, close file and deallocate the (de)compression state.
         *
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @throws { BusinessError } 17800006 - Memory allocation failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzclose(): Promise<ReturnStatus>;
        /**
         * Clear the error and end-of-file flags for file.
         *
         * @returns { Promise<void> }
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzclearerr(): Promise<void>;
        /**
         * The error message for the last error which occurred on file.
         *
         * @returns { Promise<GzErrorOutputInfo> } Return the status message for the last status which occurred on file and ReturnStatus.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzerror(): Promise<GzErrorOutputInfo>;
        /**
         * Read and decompress one byte from file.
         *
         * @returns { Promise<number> } Return the ASCII code of a character.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzgetc(): Promise<number>;
        /**
         * Flush all pending output to file.
         *
         * @param { CompressFlushMode } flush - Control the behavior of refresh operations.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzflush(flush: CompressFlushMode): Promise<ReturnStatus>;
        /**
         * Compress and write nitems items of size size from buf to file.
         *
         * @param { ArrayBuffer } buf - The buffer to write data to.
         * @param { number } size - The number of bytes in a single data block.
         * @param { number } nitems - Number of data blocks to be written.
         * @returns { Promise<number> } Return the number of full items written of size size.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzfwrite(buf: ArrayBuffer, size: number, nitems: number): Promise<number>;
        /**
         * Read and decompress data from gzip compressed files.
         *
         * @param { ArrayBuffer } buf - Target buffer for storing read results.
         * @param { number } size - The number of bytes in a single data block.
         * @param { number } nitems - Number of data blocks to be read.
         * @returns { Promise<number> } Return the number of full items read of size size.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzfread(buf: ArrayBuffer, size: number, nitems: number): Promise<number>;
        /**
         * Same as gzclose(), gzclosew() only for use when writing or appending.
         *
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @throws { BusinessError } 17800006 - Memory allocation failed.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzclosew(): Promise<ReturnStatus>;
        /**
         * Same as gzclose(), gzcloser() is only for use when reading.
         *
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzcloser(): Promise<ReturnStatus>;
        /**
         * Compress and write the len uncompressed bytes at buf to file.
         *
         * @param { ArrayBuffer } buf - Object to the data buffer to be written.
         * @param { number } len - The len uncompressed bytes.
         * @returns { Promise<number> } Return the number of uncompressed bytes written.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzwrite(buf: ArrayBuffer, len: number): Promise<number>;
        /**
         * Push c back onto the stream for file to be read as the first character on the next read.
         *
         * @param { number } c - To fall back to the character before the input stream.
         * @returns { Promise<number> } Return the character pushed.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzungetc(c: number): Promise<number>;
        /**
         * Return the starting position for the next gzread or gzwrite on file.
         *
         * @returns { Promise<number> } Return the starting position for the next gzread or gzwrite on file.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gztell(): Promise<number>;
        /**
         * Dynamically update the compression level and strategy for file.
         *
         * @param { CompressLevel } level - Compression level.
         * @param { CompressStrategy } strategy - Compression strategy.
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzsetparams(level: CompressLevel, strategy: CompressStrategy): Promise<ReturnStatus>;
        /**
         * Set the starting position to offset relative to whence for the next gzread or gzwrite on file.
         *
         * @param { number } offset - Specify the new offset to move to.
         * @param { OffsetReferencePoint } whence - Define the reference point for offset.
         * @returns { Promise<number> } Return the resulting offset location as measured in bytes from the beginning of the uncompressed stream.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzseek(offset: number, whence: OffsetReferencePoint): Promise<number>;
        /**
         * Rewind file. This function is supported only for reading.
         *
         * @returns { Promise<ReturnStatus> } Return ReturnStatus the specific meaning is defined as enum.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzrewind(): Promise<ReturnStatus>;
        /**
         * Read and decompress up to len uncompressed bytes from file into buf.
         *
         * @param { ArrayBuffer } buf - User provided buffer address.
         * @returns { Promise<number> } Return the number of uncompressed bytes actually read, less than len for end of file.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzread(buf: ArrayBuffer): Promise<number>;
        /**
         * Compress and write the given null-terminated string s to file, excluding the terminating null character.
         *
         * @param { string } str - Format descriptors and plain text.
         * @returns { Promise<number> } Return the number of characters written.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzputs(str: string): Promise<number>;
        /**
         * Compress and write c, converted to an unsigned char, into file.
         *
         * @param { number } char - Write ASCII values for characters.
         * @returns { Promise<number> } Return the value that was written.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzputc(char: number): Promise<number>;
        /**
         * Convert, format, compress, and write the arguments to file under control of the string format, as in fprintf.
         *
         * @param { string } format - Format descriptors and plain text.
         * @param { Array<string | number> } args - Variable argument lists.
         * @returns { Promise<number> } Return the number of uncompressed bytes actually written.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800004 - ZStream error.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzprintf(format: string, ...args: Array<string | number>): Promise<number>;
        /**
         * Return the current compressed (actual) read or write offset of file.
         *
         * @returns { Promise<number> } Return the current compressed (actual) read or write offset of file.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzoffset(): Promise<number>;
        /**
         * Read and decompress bytes from file into buf, until len-1 characters are read, or until a newline character is read and transferred to buf,
         * or an end-of-file condition is encountered.
         *
         * @param { ArrayBuffer } buf - Store the read row data.
         * @returns { Promise<string> } Return buf which is a null-terminated string.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 17800009 - Internal structure error.
         * @syscap SystemCapability.BundleManager.Zlib
         * @atomicservice
         * @since 12
         */
        gzgets(buf: ArrayBuffer): Promise<string>;
    }
}
export default zlib;
