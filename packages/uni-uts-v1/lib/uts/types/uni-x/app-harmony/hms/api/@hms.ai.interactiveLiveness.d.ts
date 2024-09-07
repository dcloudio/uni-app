/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module is used for face liveness detection.
 * @kit VisionKit
 * @bundle com.huawei.hmsapp.hiai.hsp/interactivelivenessHsp/Index 5.0.0(12)
 * */
import type image from '@ohos.multimedia.image';
import type { AsyncCallback } from '@ohos.base';
/**
 * This module provides motion liveness detection and silent liveness detection applications.
 * The application module is developed through the system-level hsp.
 *
 * @namespace interactiveLiveness
 * @syscap SystemCapability.AI.Component.LivenessDetect
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace interactiveLiveness {
    /**
     * Action Type Enumeration.
     *
     * @enum {string}
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    enum DetectionMode {
        /**
         * Indicates that the action is alive.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        INTERACTIVE_MODE = 'INTERACTIVE_MODE',
        /**
         * Denotes silent living body.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        SILENT_MODE = 'SILENT_MODE'
    }
    /**
     * Action Count Enumeration.
     *
     * @enum {number}
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    enum ActionsNumber {
        /**
         * One action.
         * Pick one action at random.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        ONE_ACTION = 1,
        /**
         * Two actions.
         * Pick two actions at random.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        TWO_ACTION = 2,
        /**
         * Three actions.
         * Pick three actions at random.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        THREE_ACTION = 3,
        /**
         * Four actions.
         * Pick four actions at random.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        FOUR_ACTION = 4
    }
    /**
     * Route jump mode.
     *
     * @enum {string}
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    enum RouteRedirectionMode {
        /**
         * Back Jump mode.
         * Use router.back to jump back after the collection is complete.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        BACK_MODE = 'back',
        /**
         * Replace Jump mode.
         * After the collection is complete, use router.replaceUrl to jump to the corresponding page.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        REPLACE_MODE = 'replace'
    }
    /**
     * Liveness detection configuration item.
     *
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    class InteractiveLivenessConfig {
        /**
         * Action Type Enumeration.
         *
         * @type { DetectionMode }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        isSilentMode: DetectionMode;
        /**
         * The number of customized actions ranges from 1 to 4, and three actions are randomly selected by default.
         *
         * @type { ?ActionsNumber }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        actionsNum?: ActionsNumber;
        /**
         * Failure page routing provides failure page by default.
         *
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        failedRouteUrl?: string;
        /**
         * Success page routing provides a success page by default.
         *
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        successfulRouteUrl?: string;
        /**
         * Route redirection mode.
         *
         * @type { ?RouteRedirectionMode }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        routeMode?: RouteRedirectionMode;
        /**
         * Challenge used for signature.
         *
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        challenge?: string;
        /**
         * Voice broadcast switch.
         * The value true indicates that voice broadcast is enabled,
         * and the value false indicates that voice broadcast is disabled. By default, voice broadcast is enabled.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        speechSwitch?: boolean;
        /**
         * Set the privacy mode.
         * The value true indicates that the privacy mode is set,
         * and the value false indicates that the privacy mode is not set. By default, the privacy mode is not set.
         *
         * @permission ohos.permission.PRIVACY_WINDOW
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        isPrivacyMode?: boolean;
    }
    /**
     * Entry to the face liveness detection page.
     *
     * @permission ohos.permission.CAMERA
     * @param { InteractiveLivenessConfig } config detection configuration item.
     * @returns { Promise<boolean> } Result of entering the liveness detection control.
     * @throws { BusinessError } 1008301002 Route switching failed.
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    function startLivenessDetection(config: InteractiveLivenessConfig): Promise<boolean>;
    /**
     * Entry to the face liveness detection page.
     *
     * @permission ohos.permission.CAMERA
     * @param { InteractiveLivenessConfig } config detection configuration item.
     * @param { AsyncCallback<InteractiveLivenessResult | undefined> } Callback of the detection result.
     * @returns { Promise<boolean> } Result of entering the liveness detection control.
     * @throws { BusinessError } 201 Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1008301002 Route switching failed.
     * @throws { BusinessError } 1008302000 Detection algorithm initialization.
     * @throws { BusinessError } 1008302001 Detection timeout.
     * @throws { BusinessError } 1008302002 Action mutual exclusion error.
     * @throws { BusinessError } 1008302003 Continuity Check Failure.
     * @throws { BusinessError } 1008302004 The test is not complete.
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    function startLivenessDetection(config: InteractiveLivenessConfig, callback: AsyncCallback<InteractiveLivenessResult | undefined>): Promise<boolean>;
    /**
     * Type of returned liveness detection.
     *
     * @enum {number}
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    enum LivenessType {
        /**
         * Interactive liveness successfull result.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        INTERACTIVE_LIVENESS = 0,
        /**
         * Silent liveness successfull result.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        SILENT_LIVENESS = 1,
        /**
         * Not liveness failed result.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        NOT_LIVENESS = 2
    }
    /**
     * Return the detection result.
     *
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    class InteractiveLivenessResult {
        /**
         * Type of returned liveness detection.
         *
         * @type { LivenessType }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        livenessType: LivenessType;
        /**
         * Result image returned when the test result is successfull.
         *
         * @type { ?image.PixelMap }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        mPixelMap?: image.PixelMap;
        /**
         * Secure image buffer.
         *
         * @type { ?ArrayBuffer }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        securedImageBuffer?: ArrayBuffer;
        /**
         * certificate chain.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        certificate?: Array<string>;
    }
    /**
     * Obtains the face and liveness detection result.
     *
     * @returns { Promise<InteractiveLivenessResult> } The results of the liveness test.
     * @throws { BusinessError } 1008302000 Detection algorithm initialization.
     * @throws { BusinessError } 1008302001 Detection timeout.
     * @throws { BusinessError } 1008302002 Action mutual exclusion error.
     * @throws { BusinessError } 1008302003 Continuity Check Failure.
     * @throws { BusinessError } 1008302004 The test is not complete.
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    function getInteractiveLivenessResult(): Promise<InteractiveLivenessResult>;
}
export default interactiveLiveness;
