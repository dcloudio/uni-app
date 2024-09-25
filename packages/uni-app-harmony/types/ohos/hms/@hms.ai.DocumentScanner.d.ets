/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file This module provides card recognition component.
 * @kit VisionKit
 */
/**
 * This is a ui component used for generating document scans.
 * @syscap SystemCapability.AI.Component.DocScan
 * @atomicservice
 * @since 5.0.0(12)
 */
@Component
declare struct DocumentScanner {
    /**
     * config for document scanner.
     *
     * @type { DocumentScannerConfig }
     * @default []
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    scannerConfig: DocumentScannerConfig;
    /**
     * @param { (code: number, saveType: SaveOption, uris: string[]) => void }
     * callback of the listened event, called when the Component is terminated.
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    onResult: (code: number, saveType: SaveOption, uris: string[]) => void;
    /**
     * Constructor used to create a <b>DocumentScanner</b> object.
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    build(): void;
}
/**
 * The class of configuration of document scanner
 *
 * @typedef Configuration
 * @syscap SystemCapability.AI.Component.DocScan
 * @atomicservice
 * @since 5.0.0(12)
 */
declare class DocumentScannerConfig {
    /**
     * Max number of shots supported.
     *
     * @type { number }
     * @default 1
     * @max 12
     * @min 1
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    maxShotCount?: number;
    /**
     * Document type to be scanned.
     *
     * @type { DocType[] }
     * @default [DocType.DOC]
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    supportType: DocType[];
    /**
     * Whether to support image selection from the gallery.
     *
     * @type { boolean }
     * @default true
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    isGallerySupported?: boolean;
    /**
     * Default filter id.
     *
     * @type { FilterId }
     * @default FilterId.STRENGTHEN
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    defaultFilterId?: FilterId;
    /**
     * WTabs needed to show to edit the image.
     *
     * @type { EditTab[] }
     * @default [All EditTab]
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    editTabs?: EditTab[];
    /**
     * Default shooting mode, whether automatically or manually.
     *
     * @type { ShootingMode }
     * @default ShootingMode.MANUAL
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    defaultShootingMode?: ShootingMode;
    /**
     * Whether to show share button in edit page.
     *
     * @type { boolean }
     * @default true
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    isShareable?: boolean;
    /**
     * Whether to show share button in edit page.
     *
     * @type { SaveOption[] }
     * @default [All SaveOption]
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    saveOptions?: SaveOption[];
    /**
     * Jump directly to the editing page based on the initial image provided.
     *
     * @type { string[] }
     * @default []
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    originalUris?: string[];
}
/**
 * Enum for type of document to be scanned
 *
 * @enum { number }
 * @syscap SystemCapability.AI.Component.DocScan
 * @atomicservice
 * @since 5.0.0(12)
 */
declare enum DocType {
    /**
     * Doc file
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    DOC = 0,
    /**
     * Sheet file
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    SHEET = 1
}
/**
 * Enum for id of filter on image
 *
 * @enum { number }
 * @syscap SystemCapability.AI.Component.DocScan
 * @atomicservice
 * @since 5.0.0(12)
 */
declare enum FilterId {
    /**
     * Original filter
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    ORIGINAL = 0,
    /**
     * Monochrome filter
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    MONOCHROME = 1,
    /**
     * Strengthen filter
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    STRENGTHEN = 2
}
/**
 * Enum for shooting mode, whether shoot automatically or manually
 *
 * @enum { number }
 * @syscap SystemCapability.AI.Component.DocScan
 * @atomicservice
 * @since 5.0.0(12)
 */
declare enum ShootingMode {
    /**
     * Auto shoot
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    AUTO = 0,
    /**
     * Manual shoot
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    MANUAL = 1
}
/**
 * Enum for tool bar for editing image
 *
 * @enum { number }
 * @syscap SystemCapability.AI.Component.DocScan
 * @atomicservice
 * @since 5.0.0(12)
 */
declare enum EditTab {
    /**
     * Rotate tab
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    ROTATE_TAB = 0,
    /**
     * Delete tab
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    DELETE_TAB = 1,
    /**
     * Reshoot tab
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    RESHOOT_TAB = 2
}
/**
 * Enum for the saving format of image
 *
 * @enum { number }
 * @syscap SystemCapability.AI.Component.DocScan
 * @atomicservice
 * @since 5.0.0(12)
 */
declare enum SaveOption {
    /**
     * Save JPG mode
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    JPG = 0,
    /**
     * Save PDF mode
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    PDF = 1,
    /**
     * Save EXCEL mode
     *
     * @syscap SystemCapability.AI.Component.DocScan
     * @atomicservice
     * @since 5.0.0(12)
     */
    EXCEL = 2
}
export { DocumentScanner, DocumentScannerConfig, DocType, FilterId, ShootingMode, EditTab, SaveOption };
