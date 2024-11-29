/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module provides capabilities to scan barcodes, including 1D and 2D barcodes.
 * @kit ScanKit
 */
import type { AsyncCallback } from '@ohos.base';
import type scanCore from '@hms.core.scan.scanCore';
import type common from '@ohos.app.ability.common';
/**
 * This module provides capabilities to scan barcodes.
 * @namespace scanBarcode
 * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
 * @since 4.0.0(10)
 */
/**
 * This module provides capabilities to scan barcodes.
 * @namespace scanBarcode
 * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace scanBarcode {
    /**
     * Describes start scan options.
     * @typedef ScanOptions
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.0.0(10)
     */
    /**
     * Describes start scan options.
     * @typedef ScanOptions
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface ScanOptions {
        /**
         * The scan types.
         * @type { ?Array<scanCore.ScanType> }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.0.0(10)
         */
        /**
         * The scan types.
         * @type { ?Array<scanCore.ScanType> }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @atomicservice
         * @since 4.1.0(11)
         */
        scanTypes?: Array<scanCore.ScanType>;
        /**
         * Enable multiMode.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.0.0(10)
         */
        /**
         * Enable multiMode.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @atomicservice
         * @since 4.1.0(11)
         */
        enableMultiMode?: boolean;
        /**
         * Enable album.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.0.0(10)
         */
        /**
         * Enable album.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @atomicservice
         * @since 4.1.0(11)
         */
        enableAlbum?: boolean;
    }
    /**
     * Describes the code position.
     * @typedef ScanCodeRect
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    interface ScanCodeRect {
        /**
         * The x-coordinate of the upper left corner of the external rectangle of the code.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.1.0(11)
         */
        left: number;
        /**
         * The y-coordinate of the upper left corner of the external rectangle of the code.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.1.0(11)
         */
        top: number;
        /**
         * The x-coordinates of the lower right corner of the external rectangle of the code.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.1.0(11)
         */
        right: number;
        /**
         * The y-coordinate of the lower right corner of the external rectangle of the code.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.1.0(11)
         */
        bottom: number;
    }
    /**
     * Point parameter.
     * @typedef Point
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    interface Point {
        /**
         * Indicates the X coordinate of point.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        x: number;
        /**
         * Indicates the Y coordinate of point.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        y: number;
    }
    /**
     * Describes scan result info.
     * @typedef ScanResult
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.0.0(10)
     */
    /**
     * Describes scan result info.
     * @typedef ScanResult
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface ScanResult {
        /**
         * The scan result type.
         * @type { scanCore.ScanType }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.0.0(10)
         */
        /**
         * The scan result type.
         * @type { scanCore.ScanType }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @atomicservice
         * @since 4.1.0(11)
         */
        scanType: scanCore.ScanType;
        /**
         * The scan result value.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.0.0(10)
         */
        /**
         * The scan result value.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @atomicservice
         * @since 4.1.0(11)
         */
        originalValue: string;
        /**
         * The scan result rect.
         * @type { ?ScanCodeRect }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.1.0(11)
         */
        scanCodeRect?: ScanCodeRect;
        /**
         * The scan result corner points.
         * @type { ?Array<Point> }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        cornerPoints?: Array<Point>;
    }
    /**
     * Bring up the scanning UI to scan barcodes.
     * @param { ScanOptions } options - option for start scan.
     * @param { AsyncCallback<ScanResult> } callback - the callback scan result of startScan.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead scanBarcode.startScanForResult
     */
    function startScan(options: ScanOptions, callback: AsyncCallback<ScanResult>): void;
    /**
     * Bring up the scanning UI to scan a barcode.
     * @param { AsyncCallback<ScanResult> } callback - the callback scan result of startScan.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead scanBarcode.startScanForResult
     */
    function startScan(callback: AsyncCallback<ScanResult>): void;
    /**
     * Bring up the scanning UI to scan barcodes.
     * @param { ScanOptions } options - Option for start scan.
     * @returns { Promise<ScanResult> } the scan result returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.0.0(10)
     * @deprecated since 4.1.0(11)
     * @useinstead scanBarcode.startScanForResult
     */
    function startScan(options?: ScanOptions): Promise<ScanResult>;
    /**
     * Bring up the scanning UI to scan barcodes.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @param { AsyncCallback<ScanResult> } callback - The callback used to return scan result of startScanForResult.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    /**
     * Bring up the scanning UI to scan barcodes.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @param { AsyncCallback<ScanResult> } callback - The callback used to return scan result of startScanForResult.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @throws { BusinessError } 1000500002 - The user canceled the barcode scanning.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function startScanForResult(context: common.Context, callback: AsyncCallback<ScanResult>): void;
    /**
     * Bring up the scanning UI to scan barcodes.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @param { ScanOptions } options - Option for start scan.
     * @param { AsyncCallback<ScanResult> } callback - The callback used to return scan result of startScanForResult.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    /**
     * Bring up the scanning UI to scan barcodes.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @param { ScanOptions } options - Option for start scan.
     * @param { AsyncCallback<ScanResult> } callback - The callback used to return scan result of startScanForResult.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @throws { BusinessError } 1000500002 - The user canceled the barcode scanning.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function startScanForResult(context: common.Context, options: ScanOptions, callback: AsyncCallback<ScanResult>): void;
    /**
     * Bring up the scanning UI to scan barcodes.
     * Note: The function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @param { ScanOptions } options - Option for start scan.
     * @returns { Promise<ScanResult> } The scan result returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    /**
     * Bring up the scanning UI to scan barcodes.
     * Note: The function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @param { ScanOptions } options - Option for start scan.
     * @returns { Promise<ScanResult> } The scan result returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @throws { BusinessError } 1000500002 - The user canceled the barcode scanning.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function startScanForResult(context: common.Context, options?: ScanOptions): Promise<ScanResult>;
}
export default scanBarcode;
