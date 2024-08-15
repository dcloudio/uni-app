/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 */
import { AsyncCallback, Callback } from './@ohos.base';
import { WantAgent } from './@ohos.wantAgent';
import Context from './application/BaseContext';
/**
 * Manages background tasks.
 *
 * @namespace backgroundTaskManager
 * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.resourceschedule.backgroundTaskManager
 */
declare namespace backgroundTaskManager {
    /**
     * The info of delay suspend.
     *
     * @name DelaySuspendInfo
     * @interface DelaySuspendInfo
     * @since 7
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.DelaySuspendInfo
     */
    interface DelaySuspendInfo {
        /**
         * The unique identifier of the delay request.
         *
         * @since 7
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
         * @deprecated since 9
         * @useinstead ohos.resourceschedule.backgroundTaskManager.DelaySuspendInfo
         */
        requestId: number;
        /**
         * The actual delay duration (ms).
         *
         * @since 7
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
         * @deprecated since 9
         * @useinstead ohos.resourceschedule.backgroundTaskManager.DelaySuspendInfo
         */
        actualDelayTime: number;
    }
    /**
     * Cancels delayed transition to the suspended state.
     *
     * @since 7
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
     * @param { number } requestId Indicates the identifier of the delay request.
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.cancelSuspendDelay
     */
    function cancelSuspendDelay(requestId: number): void;
    /**
     * Obtains the remaining time before an application enters the suspended state.
     *
     * @param { number } requestId Indicates the identifier of the delay request.
     * @param { AsyncCallback<number> } callback - The callback of the remaining delay time.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.getRemainingDelayTime
     */
    function getRemainingDelayTime(requestId: number, callback: AsyncCallback<number>): void;
    /**
     * Obtains the remaining time before an application enters the suspended state.
     *
     * @param { number } requestId Indicates the identifier of the delay request.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.getRemainingDelayTime
     */
    function getRemainingDelayTime(requestId: number): Promise<number>;
    /**
     * Requests delayed transition to the suspended state.
     *
     * @since 7
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
     * @param { string } reason Indicates the reason for delayed transition to the suspended state.
     * @param { Callback<void> } callback The callback delay time expired.
     * @returns { DelaySuspendInfo } Info of delay request
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.requestSuspendDelay
     */
    function requestSuspendDelay(reason: string, callback: Callback<void>): DelaySuspendInfo;
    /**
     * Service ability uses this method to request start running in background.
     * system will publish a notification related to the this service.
     *
     * @permission ohos.permission.KEEP_BACKGROUND_RUNNING
     * @param { Context } context app running context.
     * @param { BackgroundMode } bgMode Indicates which background mode to request.
     * @param { WantAgent } wantAgent Indicates which ability to start when user click the notification bar.
     * @param { AsyncCallback<void> } callback - The callback of the function.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.startBackgroundRunning
     */
    function startBackgroundRunning(context: Context, bgMode: BackgroundMode, wantAgent: WantAgent, callback: AsyncCallback<void>): void;
    /**
     * Service ability uses this method to request start running in background.
     * system will publish a notification related to the this service.
     *
     * @permission ohos.permission.KEEP_BACKGROUND_RUNNING
     * @param { Context } context app running context.
     * @param { BackgroundMode } bgMode Indicates which background mode to request.
     * @param { WantAgent } wantAgent Indicates which ability to start when user click the notification bar.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.startBackgroundRunning
     */
    function startBackgroundRunning(context: Context, bgMode: BackgroundMode, wantAgent: WantAgent): Promise<void>;
    /**
     * Service ability uses this method to request stop running in background.
     *
     * @param { Context } context - App running context.
     * @param { AsyncCallback<void> } callback - The callback of the function.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.stopBackgroundRunning
     */
    function stopBackgroundRunning(context: Context, callback: AsyncCallback<void>): void;
    /**
     * Service ability uses this method to request stop running in background.
     *
     * @param { Context } context - App running context.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.stopBackgroundRunning
     */
    function stopBackgroundRunning(context: Context): Promise<void>;
    /**
     * Supported background mode.
     *
     * @enum { number }
     * @since 8
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.BackgroundMode
     */
    export enum BackgroundMode {
        /**
         * data transfer mode
         *
         * @since 8
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         */
        DATA_TRANSFER = 1,
        /**
         * audio playback mode
         *
         * @since 8
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         */
        AUDIO_PLAYBACK = 2,
        /**
         * audio recording mode
         *
         * @since 8
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         */
        AUDIO_RECORDING = 3,
        /**
         * location mode
         *
         * @since 8
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         */
        LOCATION = 4,
        /**
         * bluetooth interaction mode
         *
         * @since 8
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         */
        BLUETOOTH_INTERACTION = 5,
        /**
         * multi-device connection mode
         *
         * @since 8
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         */
        MULTI_DEVICE_CONNECTION = 6,
        /**
         * background continuous calculate mode, for example 3D render.
         * only supported in particular device
         *
         * @since 8
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         */
        TASK_KEEPING = 9
    }
}
export default backgroundTaskManager;
