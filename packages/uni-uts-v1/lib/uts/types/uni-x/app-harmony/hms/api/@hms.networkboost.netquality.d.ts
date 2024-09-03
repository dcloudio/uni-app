/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024. All rights reserved.
 */
/**
* @file This module provides the capability of netQuality.
* @kit NetworkBoostKit
*/
import type { Callback } from '@ohos.base';
/**
 * Provides Network quality APIs.
 * @namespace netQuality
 * @syscap SystemCapability.Communication.NetworkBoost.Core
 * @since 5.0.0(12)
 */
declare namespace netQuality {
    /**
     * Subscribe to netQos state change event.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { 'netQosChange' } type - Type of the netQosChange change state to listen for.
     * @param { Callback<Array<NetworkQos>> } callback - Callback used to listen for the change of the netQos.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    function on(type: 'netQosChange', callback: Callback<Array<NetworkQos>>): void;
    /**
     * Unsubscribe to netQos state change event.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { 'netQosChange' } type - Type of the netQos change state to listen for.
     * @param { Callback<Array<NetworkQos>> } callback - Callback used to listen for the netQos change.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    function off(type: 'netQosChange', callback?: Callback<Array<NetworkQos>>): void;
    /**
     * Subscribing to netScene state change event.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { 'netSceneChange' } type - Type of the netScene change state to listen for.
     * @param { Callback<Array<NetworkScene>> } callback - Callback used to listen for the change of the netScene.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    function on(type: 'netSceneChange', callback: Callback<Array<NetworkScene>>): void;
    /**
     * Unsubscribing to netScene state change event.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { 'netSceneChange' } type - Type of the netScene change state to listen for.
     * @param { Callback<Array<NetworkScene>> } callback - Callback used to listen for the change of the netScene.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    function off(type: 'netSceneChange', callback?: Callback<Array<NetworkScene>>): void;
    /**
     * App report qoe info.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { AppQoe } appQoe - app report qoe info.
     * @throws { BusinessError } 201 - Permission verify error.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    function reportQoe(appQoe: AppQoe): void;
    /**
     * Network qos info.
     * @typedef NetworkQos
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    interface NetworkQos {
        /**
         * Specify networkQos reported on which pathType.
         * @type { PathType }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        pathType: PathType;
        /**
         * Uplink bandwidth, unit: bps.
         * @type { RateBps }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        linkUpBandwidth: RateBps;
        /**
         * Downlink bandwidth, unit: bps.
         * @type { RateBps }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        linkDownBandwidth: RateBps;
        /**
         * Uplink rate, unit: bps.
         * @type { RateBps }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        linkUpRate: RateBps;
        /**
         * Downlink rate, unit: bps.
         * @type { RateBps }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        linkDownRate: RateBps;
        /**
         * Rtt in ms.
         * @type { number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        rttMs: number;
        /**
         * Uplink buffer delay time in ms.
         * @type { number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        linkUpBufferDelayMs: number;
        /**
         * Uplink buffer congestion percentage, value range [0, 100].
         * @type { ?number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        linkUpBufferCongestionPercent?: number;
    }
    /**
     * Network scene info.
     * @typedef NetworkScene
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    interface NetworkScene {
        /**
         * Specify networkScene reported on which pathType.
         * @type { PathType }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        pathType: PathType;
        /**
         * Scene type.
         * @type { Scene }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        scene: Scene;
        /**
         * Recommended action.
         * @type { RecommendedAction }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        recommendedAction: RecommendedAction;
        /**
         * Weaksignal prediction.
         * @type { ?WeakSignalPrediction }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        weakSignalPrediction?: WeakSignalPrediction;
    }
    /**
     * WeakSignalPrediction info.
     * @typedef WeakSignalPrediction
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    interface WeakSignalPrediction {
        /**
         * If the last weak signal predicition is valid.
         * @type { boolean }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        isLastPredictionValid: boolean;
        /**
         * Enter the weak signal after startTime in seconds.
         * @type { number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        startTime: number;
        /**
         * Weak signal durations in seconds.
         * @type { number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        duration: number;
    }
    /**
     * App qoe info.
     * @typedef AppQoe
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    interface AppQoe {
        /**
       * Qoe service type.
       * @type { ServiceType }
       * @syscap SystemCapability.Communication.NetworkBoost.Core
       * @since 5.0.0(12)
       */
        serviceType: ServiceType;
        /**
       * Qoe type.
       * @type { QoeType }
       * @syscap SystemCapability.Communication.NetworkBoost.Core
       * @since 5.0.0(12)
       */
        qoeType: QoeType;
    }
    /**
     * Rate by bps.
     * @typedef { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    type RateBps = number;
    /**
     * 1bps.
     *
     * @constant
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    const BPS = 1;
    /**
     * 1kbps.
     *
     * @constant
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    const KBPS = 1000;
    /**
     * 1mbps.
     *
     * @constant
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    const MBPS = 1000000;
    /**
     * 1gbps.
     *
     * @constant
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    const GBPS = 1000000000;
    /**
     * 1tbps.
     *
     * @constant
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    const TBPS = 1000000000000;
    /**
     * Scene type.
     * @typedef { 'normal' | 'congestion' | 'frequentHandover' | 'weakSignal' }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    type Scene = 'normal' | 'congestion' | 'frequentHandover' | 'weakSignal';
    /**
     * Data speed simple action.
     * @typedef { 'suspendData' | 'decreaseData' | 'increaseData' | 'keepData' }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    export type DataSpeedSimpleAction = 'suspendData' | 'decreaseData' | 'increaseData' | 'keepData';
    /**
     * Recommended action.
     * @typedef { 'doCaching' | DataSpeedSimpleAction }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    type RecommendedAction = 'doCaching' | DataSpeedSimpleAction;
    /**
     * Qoe service type.
     * @typedef { 'default' | 'background' | 'realtimeVoice' | 'realtimeVideo' | 'callSignaling' | 'realtimeGame'
     * | 'normalGame' | 'shortVideo' | 'longVideo' | 'livestreamingAnchor' | 'livestreamingWatcher' | 'download'
     * | 'upload' | 'browser' }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    type ServiceType = 'default' | 'background' | 'realtimeVoice' | 'realtimeVideo' | 'callSignaling' | 'realtimeGame' | 'normalGame' | 'shortVideo' | 'longVideo' | 'livestreamingAnchor' | 'livestreamingWatcher' | 'download' | 'upload' | 'browser';
    /**
     * Qoe bad cause.
     * @typedef { 'unknown' | 'serverErr' | 'noData' | 'packetLost' | 'packetOutOfOrder' | 'highJitter' | 'highLatency' }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    type BadQoeCause = 'unknown' | 'serverErr' | 'noData' | 'packetLost' | 'packetOutOfOrder' | 'highJitter' | 'highLatency';
    /**
     * Qoe type.
     * @typedef { 'good' | BadQoeCause }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    type QoeType = 'good' | BadQoeCause;
    /**
     * path type.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    enum PathType {
        /**
         * primary cellular network path type.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        CELLULAR_PRIMARY = 0,
        /**
         * secondary cellular network path type.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        CELLULAR_SECONDARY = 1,
        /**
         * primary wifi network path type.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        WIFI_PRIMARY = 2,
        /**
         * secondary wifi network path type.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        WIFI_SECONDARY = 3
    }
}
export default netQuality;
