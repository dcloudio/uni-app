/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module provides the capabilities to detect barcodes in an image.
 * @kit ScanKit
 */
import type { AsyncCallback } from '@ohos.base';
import type scanBarcode from '@hms.core.scan.scanBarcode';
/**
 * This module provides the capabilities to detect barcodes in an image.
 * @namespace detectBarcode
 * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
 * @since 4.1.0(11)
 */
declare namespace detectBarcode {
    /**
     * Represents an input image object.
     * @typedef InputImage
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    interface InputImage {
        /**
         * The URI of a local image file.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.1.0(11)
         */
        uri: string;
    }
    /**
     * Detects barcodes from the specified image.
     * @param { InputImage } inputImage - Indicates the input image.
     * @param { scanBarcode.ScanOptions } options - Option for detecting barcode.
     * @param { AsyncCallback<Array<scanBarcode.ScanResult>> } callback - The callback used to return result detected in the image.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function decode(inputImage: InputImage, options: scanBarcode.ScanOptions, callback: AsyncCallback<Array<scanBarcode.ScanResult>>): void;
    /**
     * Detects barcodes from the specified image.
     * @param { InputImage } inputImage - Indicates the input image.
     * @param { AsyncCallback<Array<scanBarcode.ScanResult>> } callback - The callback used to return result detected in the image.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function decode(inputImage: InputImage, callback: AsyncCallback<Array<scanBarcode.ScanResult>>): void;
    /**
     * Detects barcodes from the supplied image.
     * @param { InputImage } inputImage - Indicates the input image.
     * @param { scanBarcode.ScanOptions } options - Option for detecting barcode.
     * @returns { Promise<Array<scanBarcode.ScanResult>> } The result detected in the image.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function decode(inputImage: InputImage, options?: scanBarcode.ScanOptions): Promise<Array<scanBarcode.ScanResult>>;
    /**
     * Describes an image represented by a byte array.
     * @typedef ByteImage
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    interface ByteImage {
        /**
         * The buffer of the image.
         * @type { ArrayBuffer }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        byteBuffer: ArrayBuffer;
        /**
         * The width of the image.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        width: number;
        /**
         * The height of the image.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        height: number;
        /**
         * The format of the image.
         * @type { ImageFormat }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        format: ImageFormat;
    }
    /**
     * Enumerates image formats.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    enum ImageFormat {
        /**
         * NV21 format.
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        NV21 = 0
    }
    /**
     * Describes detect result info.
     * @typedef DetectResult
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    interface DetectResult {
        /**
         * The results detect a byteBuffer image.
         * @type { Array<scanBarcode.ScanResult> }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        scanResults: Array<scanBarcode.ScanResult>;
        /**
         * Zoom value.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        zoomValue: number;
    }
    /**
     * Detects barcodes from the bytebuffer image.
     * @param { ByteImage } image - Indicates an image represented by a byte array.
     * @param { scanBarcode.ScanOptions } options - Option for detecting barcode.
     * @returns { Promise<DetectResult> } The result detected in the image.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    function decodeImage(image: ByteImage, options?: scanBarcode.ScanOptions): Promise<DetectResult>;
}
export default detectBarcode;
