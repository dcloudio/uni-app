/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Attribution Manager Interface Description file
 * @kit StoreKit
 */
/**
 * Class that is used to declare methods of attribution.
 *
 * @namespace attributionManager
 * @syscap SystemCapability.AppGalleryService.AttributionManager
 * @StageModelOnly
 * @since 5.0.0(12)
 */
declare namespace attributionManager {
    /**
     * Enum for attribution source type.
     *
     * @enum { number }
     * @syscap SystemCapability.AppGalleryService.AttributionManager
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    export enum SourceType {
        /**
         * Indicates that attribution sourceType is impression.
         *
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        IMPRESSION = 0,
        /**
         * Indicates that attribution sourceType is click.
         *
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        CLICK = 1
    }
    /**
     * AdSourceInfo for register attribution source.
     *
     * @typedef AdSourceInfo
     * @syscap SystemCapability.AppGalleryService.AttributionManager
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    export interface AdSourceInfo {
        /**
         * Identifier of the advertisement platform to which the advertisement task belongs.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        adTechId: string;
        /**
         * Identifier of the advertisement task.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        campaignId: string;
        /**
         * Identifier of the advertiser app published on AppGallery.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        destinationId: string;
        /**
         * Type of attribution source.
         *
         * @type { SourceType }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        sourceType: SourceType;
        /**
         * Identifier of the monitoring platform used for the advertising.
         *
         * @type { ?string[] }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        mmpIds?: string[];
        /**
         * Business information concerned by the ad platform, such as creative ideas or materials.
         *
         * @type { ?string }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        serviceTag?: string;
        /**
         * UUID used for computing signature.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        nonce: string;
        /**
         * Timestamp of requesting advertisement.
         *
         * @type { number }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        timestamp: number;
        /**
         * Signature of advertisement info.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        signature: string;
    }
    /**
     * AdTrigger info.
     *
     * @typedef AdTriggerInfo
     * @syscap SystemCapability.AppGalleryService.AttributionManager
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    export interface AdTriggerInfo {
        /**
         * Business scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        businessScene?: number;
        /**
         * Trigger code.
         *
         * @type { number }
         * @syscap SystemCapability.AppGalleryService.AttributionManager
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        triggerData: number;
    }
    /**
     * Used to register attribution source.
     *
     * @param { AdSourceInfo } adSourceInfo - AdSourceInfo for register attribution source.
     * @returns { Promise<void> } return value.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1009300001 - The specified service extension connect failed.
     * @throws { BusinessError } 1009300002 - System internal error.
     * @throws { BusinessError } 1009300003 - The identity check error.
     * @throws { BusinessError } 1009300004 - The sign check error.
     * @syscap SystemCapability.AppGalleryService.AttributionManager
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    function registerSource(adSourceInfo: AdSourceInfo): Promise<void>;
    /**
     * Used to register trigger.
     *
     * @param { AdTriggerInfo } adTriggerInfo - AdTrigger info.
     * @returns { Promise<void> } return value.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1009300001 - The specified service extension connect failed.
     * @throws { BusinessError } 1009300002 - System internal error.
     * @throws { BusinessError } 1009300003 - The identity check error.
     * @syscap SystemCapability.AppGalleryService.AttributionManager
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    function registerTrigger(adTriggerInfo: AdTriggerInfo): Promise<void>;
}
export default attributionManager;
