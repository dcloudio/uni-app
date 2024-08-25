/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Core data object of ScanKit.
 * @kit ScanKit
 */
/**
 * Core data object of ScanKit.
 * @namespace scanCore
 * @syscap SystemCapability.Multimedia.Scan.Core
 * @since 4.0.0(10)
 */
/**
 * Core data object of ScanKit.
 * @namespace scanCore
 * @syscap SystemCapability.Multimedia.Scan.Core
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace scanCore {
    /**
     * Enum for barcode type.
     * @enum {number}
     * @syscap SystemCapability.Multimedia.Scan.Core
     * @since 4.0.0(10)
     */
    /**
     * Enum for barcode type.
     * @enum {number}
     * @syscap SystemCapability.Multimedia.Scan.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum ScanType {
        /**
         * Unknown code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * Unknown code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        FORMAT_UNKNOWN = 0,
        /**
         * Aztec code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * Aztec code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        AZTEC_CODE = 1,
        /**
         * Codabar code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * Codabar code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        CODABAR_CODE = 2,
        /**
         * Code 39 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * Code 39 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        CODE39_CODE = 3,
        /**
         * Code 93 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * Code 93 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        CODE93_CODE = 4,
        /**
         * Code 128 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * Code 128 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        CODE128_CODE = 5,
        /**
         * Data Matrix code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * Data Matrix code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        DATAMATRIX_CODE = 6,
        /**
         * EAN-8 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * EAN-8 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        EAN8_CODE = 7,
        /**
         * EAN-13 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * EAN-13 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        EAN13_CODE = 8,
        /**
         * ITF-14 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * ITF-14 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        ITF14_CODE = 9,
        /**
         * PDF417 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * PDF417 code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        PDF417_CODE = 10,
        /**
         * QR code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * QR code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        QR_CODE = 11,
        /**
         * UPC-A code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * UPC-A code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        UPC_A_CODE = 12,
        /**
         * UPC-E code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * UPC-E code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        UPC_E_CODE = 13,
        /**
         * MULTIFUNCTIONAL code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * MULTIFUNCTIONAL code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        MULTIFUNCTIONAL_CODE = 14,
        /**
         * One dimension code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * One dimension code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        ONE_D_CODE = 100,
        /**
         * Two dimension code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * Two dimension code
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        TWO_D_CODE = 101,
        /**
         * All codes
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @since 4.0.0(10)
         */
        /**
         * All codes
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        ALL = 1001
    }
    /**
     * Enumerates the scan error codes.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Scan.Core
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum ScanErrorCode {
        /**
         * Scan service internal error.
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 4.1.0(11)
         */
        INTERNAL_ERROR = 1000500001,
        /**
         * The user canceled the barcode scanning.
         * @syscap SystemCapability.Multimedia.Scan.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SCAN_SERVICE_CANCELED = 1000500002
    }
}
export default scanCore;
