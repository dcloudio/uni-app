/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module provides the capabilities to generate barcodes.
 * @kit ScanKit
 */
import type image from '@ohos.multimedia.image';
import type { AsyncCallback } from '@ohos.base';
import type scanCore from '@hms.core.scan.scanCore';
/**
 * This module provides the capabilities to generate barcodes.
 * @namespace generateBarcode
 * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
 * @since 4.1.0(11)
 */
declare namespace generateBarcode {
    /**
     * Enum for the QR code error correction level.
     * @enum {number}
     * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
     * @since 4.1.0(11)
     */
    enum ErrorCorrectionLevel {
        /**
         * QR code correction error level 7%.
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        LEVEL_L = 0,
        /**
         * QR code correction error level 15%.
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        LEVEL_M = 1,
        /**
         * QR code correction error level 25%.
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        LEVEL_Q = 2,
        /**
         * QR code correction error level 30%.
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        LEVEL_H = 3
    }
    /**
     * Describes createBarcode options.
     * @typedef CreateOptions
     * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
     * @since 4.1.0(11)
     */
    interface CreateOptions {
        /**
         * The scan types.
         * @type { scanCore.ScanType }
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        scanType: scanCore.ScanType;
        /**
         * The barcode height.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        height: number;
        /**
         * The barcode width.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        width: number;
        /**
         * The background color of image.PixelMap.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        backgroundColor?: number;
        /**
         * The barcode color of image.PixelMap.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        pixelMapColor?: number;
        /**
         * The margin of the barcode pattern from the surrounding area.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        margin?: number;
        /**
         * The percentage of the symbol dedicated to error correction.
         * @type { ?ErrorCorrectionLevel }
         * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
         * @since 4.1.0(11)
         */
        level?: ErrorCorrectionLevel;
    }
    /**
     * Create a barcode.
     * @param { string } content - Content for create a barcode.
     * @param { CreateOptions } options - Option for create a barcode.
     * @returns { Promise<image.PixelMap> } Promise - The image.PixelMap of a barcode.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
     * @since 4.1.0(11)
     */
    function createBarcode(content: string, options: CreateOptions): Promise<image.PixelMap>;
    /**
     * Create a barcode.
     * @param { string } content - Content for create a barcode.
     * @param { CreateOptions } options - Option for create a barcode.
     * @param { AsyncCallback<image.PixelMap> } callback - The callback used to return image.PixelMap of a barcode.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
     * @since 4.1.0(11)
     */
    function createBarcode(content: string, options: CreateOptions, callback: AsyncCallback<image.PixelMap>): void;
    /**
     * Create a barcode.
     * @param { ArrayBuffer } content - Content for create a barcode.
     * @param { CreateOptions } options - Option for create a barcode.
     * @returns { Promise<image.PixelMap> } Promise - The image.PixelMap of a barcode.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.GenerateBarcode
     * @since 5.0.0(12)
     */
    function createBarcode(content: ArrayBuffer, options: CreateOptions): Promise<image.PixelMap>;
}
export default generateBarcode;
