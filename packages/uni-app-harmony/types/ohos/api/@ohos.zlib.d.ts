/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
         * @syscap SystemCapability.BundleManager.Zlib
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        strategy?: CompressStrategy;
    }
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
     * @throws { BusinessError } 401 - The parameter check failed.
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
     * @throws { BusinessError } 401 - The parameter check failed.
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
     * @throws { BusinessError } 401 - The parameter check failed.
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
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function compressFile(inFile: string, outFile: string, options: Options): Promise<void>;
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be decompressed.
     * @param { string } outFile - Indicates the path of the output decompressed file.
     * @param { Options } options - Indicates the options of decompressing file.
     * @param { AsyncCallback<void> } callback - The callback of decompressing file result.
     * @throws { BusinessError } 401 - The parameter check failed.
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
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not ZIP format or damaged.
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
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not ZIP format or damaged.
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
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not ZIP format or damaged.
     * @syscap SystemCapability.BundleManager.Zlib
     * @since 10
     */
    /**
     * Decompress the specified file.
     *
     * @param { string } inFile - Indicates the path of the file to be decompressed.
     * @param { string } outFile - Indicates the path of the output decompressed file.
     * @param { AsyncCallback<void> } callback - The callback of decompressing file result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not ZIP format or damaged.
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
     * @throws { BusinessError } 401 - The parameter check failed.
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
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not ZIP format or damaged.
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
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 900001 - The input source file is invalid.
     * @throws { BusinessError } 900002 - The input destination file is invalid.
     * @throws { BusinessError } 900003 - The input source file is not ZIP format or damaged.
     * @syscap SystemCapability.BundleManager.Zlib
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function decompressFile(inFile: string, outFile: string, options?: Options): Promise<void>;
}
export default zlib;
