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
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.DelaySuspendInfo
     */
    interface DelaySuspendInfo {
        /**
         * The unique identifier of the delay request.
         *
         * @type { number }
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.resourceschedule.backgroundTaskManager.DelaySuspendInfo
         */
        requestId: number;
        /**
         * The actual delay duration (ms).
         *
         * @type { number }
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.resourceschedule.backgroundTaskManager.DelaySuspendInfo
         */
        actualDelayTime: number;
    }
    /**
     * Cancels delayed transition to the suspended state.
     *
     * @param { number } requestId Indicates the identifier of the delay request.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
     * @since 7
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
     * @param { string } reason Indicates the reason for delayed transition to the suspended state.
     * @param { Callback<void> } callback The callback delay time expired.
     * @returns { DelaySuspendInfo } Info of delay request
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask
     * @since 7
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
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager.BackgroundMode
     */
    export enum BackgroundMode {
        /**
         * data transfer mode
         *
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         * @since 8
         * @deprecated since 9
         */
        DATA_TRANSFER = 1,
        /**
         * audio playback mode
         *
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         * @since 8
         * @deprecated since 9
         */
        AUDIO_PLAYBACK = 2,
        /**
         * audio recording mode
         *
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         * @since 8
         * @deprecated since 9
         */
        AUDIO_RECORDING = 3,
        /**
         * location mode
         *
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         * @since 8
         * @deprecated since 9
         */
        LOCATION = 4,
        /**
         * bluetooth interaction mode
         *
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         * @since 8
         * @deprecated since 9
         */
        BLUETOOTH_INTERACTION = 5,
        /**
         * multi-device connection mode
         *
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         * @since 8
         * @deprecated since 9
         */
        MULTI_DEVICE_CONNECTION = 6,
        /**
         * background continuous calculate mode, for example 3D render.
         * only supported in particular device
         *
         * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
         * @since 8
         * @deprecated since 9
         */
        TASK_KEEPING = 9
    }
}
export default backgroundTaskManager;
