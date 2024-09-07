/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module provides the capabilities to scan barcodes.
 * @kit ScanKit
 */
import type { AsyncCallback } from '@ohos.base';
import type scanBarcode from '@hms.core.scan.scanBarcode';
/**
 * This module provides the capabilities to scan barcodes.
 * @namespace customScan
 * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
 * @since 4.1.0(11)
 */
declare namespace customScan {
    /**
     * Describes viewControl info.
     * @typedef ViewControl
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    interface ViewControl {
        /**
         * The width of XComponent surface.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.1.0(11)
         */
        width: number;
        /**
         * The height of XComponent surface.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.1.0(11)
         */
        height: number;
        /**
         * The surfaceId held by XComponent.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 4.1.0(11)
         */
        surfaceId: string;
    }
    /**
     * Describes scan frame info.
     * @typedef ScanFrame
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    interface ScanFrame {
        /**
         * The camera byte buffer.
         * @type { ArrayBuffer }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        byteBuffer: ArrayBuffer;
        /**
         * The scan frame width.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        width: number;
        /**
         * The scan frame height.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        height: number;
        /**
         * Describes positions of codes.
         * @type { ?Array<scanBarcode.ScanCodeRect> }
         * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
         * @since 5.0.0(12)
         */
        scanCodeRects?: Array<scanBarcode.ScanCodeRect>;
    }
    /**
     * Init custom scan.
     * @permission ohos.permission.CAMERA
     * @param { scanBarcode.ScanOptions } options - Option for scan.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function init(options?: scanBarcode.ScanOptions): void;
    /**
     * Start custom scan.
     * @permission ohos.permission.CAMERA
     * @param { ViewControl } viewControl - ViewControl info.
     * @param { AsyncCallback<Array<scanBarcode.ScanResult>> } callback - The callback used to return result of custom scan.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    /**
     * Start custom scan.
     * @permission ohos.permission.CAMERA
     * @param { ViewControl } viewControl - ViewControl info.
     * @param { AsyncCallback<Array<scanBarcode.ScanResult>> } callback - The callback used to return result of custom scan.
     * @param { AsyncCallback<ScanFrame> } [frameCallback] - The callback used to return camera frame.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    function start(viewControl: ViewControl, callback: AsyncCallback<Array<scanBarcode.ScanResult>>, frameCallback?: AsyncCallback<ScanFrame>): void;
    /**
     * Start custom scan.
     * @permission ohos.permission.CAMERA
     * @param { ViewControl } viewControl - ViewControl info.
     * @returns { Promise<Array<scanBarcode.ScanResult>> } The result returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function start(viewControl: ViewControl): Promise<Array<scanBarcode.ScanResult>>;
    /**
     * Stop custom scan.
     * @param { AsyncCallback<void> } callback - Indicates the callback to stop custom scan.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function stop(callback: AsyncCallback<void>): void;
    /**
     * Stop custom scan.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function stop(): Promise<void>;
    /**
     * Release scan stream.
     * @param { AsyncCallback<void> } callback - Indicates the callback to release scan stream.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function release(callback: AsyncCallback<void>): void;
    /**
     * Release scan stream.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function release(): Promise<void>;
    /**
     * Open flash light.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function openFlashLight(): void;
    /**
     * Close flash light.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function closeFlashLight(): void;
    /**
     * Get flash status.
     * @return { boolean } true.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 4.1.0(11)
     */
    function getFlashLightStatus(): boolean;
    /**
     * Set camera zoom.
     * @param { number } zoomValue - Zoom value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    function setZoom(zoomValue: number): void;
    /**
     * Get camera zoom value.
     * @return { number } The camera zoom value
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    function getZoom(): number;
    /**
     * Subscribes lightingFlash event callback.
     * @param { 'lightingFlash' } type - Event type.
     * @param { AsyncCallback<boolean> } callback - Indicates the callback when receive the lightingFlash event.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    function on(type: 'lightingFlash', callback: AsyncCallback<boolean>): void;
    /**
     * Unsubscribes lightingFlash event callback.
     * @param { 'lightingFlash' } type - Event type.
     * @param { AsyncCallback<boolean> } callback - Indicates the callback when receive the lightingFlash event.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    function off(type: 'lightingFlash', callback?: AsyncCallback<boolean>): void;
    /**
     * Set focus point.
     * @param { scanBarcode.Point } point - target focus point.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Incorrect parameter types; 2. Parameter verification failed.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    function setFocusPoint(point: scanBarcode.Point): void;
    /**
     * Resets to the default focus mode.
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    function resetFocus(): void;
    /**
     * Triggers a rescan.
     * If the scan result is not your expected one, you can call this API to trigger another scan.
     * The scan result is returned through the following API:
     * start(viewControl: ViewControl, callback: AsyncCallback<Array<scanBarcode.ScanResult>>, frameCallback?: AsyncCallback<ScanFrame>)
     * @throws { BusinessError } 1000500001 - Internal error.
     * @syscap SystemCapability.Multimedia.Scan.ScanBarcode
     * @since 5.0.0(12)
     */
    function rescan(): void;
}
export default customScan;
