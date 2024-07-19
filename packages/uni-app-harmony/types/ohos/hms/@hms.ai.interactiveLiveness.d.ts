/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module is used for face liveness detection.
 * @kit VisionKit
 * @bundle com.huawei.hmsapp.hiai.hsp/interactivelivenessHsp/Index 5.0.0(12)
 * */
import type image from '@ohos.multimedia.image';
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
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    enum DetectionMode {
        /**
         * indicates that the action is alive.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        INTERACTIVE_MODE = 'INTERACTIVE_MODE',
        /**
         * denotes silent living body.
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
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    enum RouteRedirectionMode {
        /**
         * back Jump mode.
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
     * External Configuration Interfaces.
     * It's all optional.
     *
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    class InteractiveLivenessConfig {
        /**
         * Silent Living Default Action Living.
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
         * @type { ActionsNumber }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        actionsNum?: ActionsNumber;
        /**
         * Failure page routing provides failure page by default.
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        failedRouteUrl?: string;
        /**
         * Success page routing provides a success page by default.
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        successfulRouteUrl?: string;
        /**
         * Route redirection mode.
         *
         * @type { RouteRedirectionMode }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         */
        routeMode?: RouteRedirectionMode;
    }
    /**
     * The router.push redirection mode is used to access the HSP.
     *
     * @permission ohos.permission.ohos.permission.CAMERA
     * @param { config } external configuration.
     * @returns { Promise<boolean> } Result of entering the liveness detection control.
     * @throws { BusinessError } 1008301002 Route switching failed.
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    function startLivenessDetection(config: InteractiveLivenessConfig): Promise<boolean>;
    /**
     * Type of returned liveness detection.
     *
     * @syscap SystemCapability.AI.Component.LivenessDetect
     * @atomicservice
     * @since 5.0.0(12)
     * */
    enum LivenessType {
        /**
         * Interactive liveness successfu1 result.
         *
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        INTERACTIVE_LIVENESS = 0,
        /**
         * Silent liveness successfu1 result.
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
         * Result image returned when the test result is successful.
         *
         * @type { image.PixelMap }
         * @syscap SystemCapability.AI.Component.LivenessDetect
         * @atomicservice
         * @since 5.0.0(12)
         * */
        mPixelMap?: image.PixelMap;
    }
    /**
     * The result code and PixelMap image are obtained after the detection is successful.
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
