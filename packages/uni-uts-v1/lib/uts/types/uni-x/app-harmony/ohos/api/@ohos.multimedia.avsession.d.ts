/*
* Copyright (c) 2022-2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @file
 * @kit AVSessionKit
 */
import type { ErrorCallback, AsyncCallback, Callback } from './@ohos.base';
import { WantAgent } from './@ohos.wantAgent';
import { KeyEvent } from './@ohos.multimodalInput.keyEvent';
import image from './@ohos.multimedia.image';
import type media from './@ohos.multimedia.media';
import type Context from './application/BaseContext';
/**
 * @namespace avSession
 * @syscap SystemCapability.Multimedia.AVSession.Core
 * @since 9
 */
/**
 * @namespace avSession
 * @syscap SystemCapability.Multimedia.AVSession.Core
 * @atomicservice
 * @since 12
 */
declare namespace avSession {
    /**
     * Create an AVSession instance. An ability can only create one AVSession
     * @param { Context } context - The context of application
     * @param { string } tag - A user-defined name for this session
     * @param { AVSessionType } type - The type of session {@link AVSessionType}
     * @param { AsyncCallback<AVSession> } callback - async callback for AVSession.
     * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
     * 2.Parameter verification failed.
     * @throws { BusinessError } 6600101 - Session service exception.
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    function createAVSession(context: Context, tag: string, type: AVSessionType, callback: AsyncCallback<AVSession>): void;
    /**
     * Create an AVSession instance. An ability can only create one AVSession
     * @param { Context } context - The context of application
     * @param { string } tag - A user-defined name for this session
     * @param { AVSessionType } type - The type of session {@link AVSessionType}
     * @returns { Promise<AVSession> } Promise for AVSession
     * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
     * 2.Parameter verification failed.
     * @throws { BusinessError } 6600101 - Session service exception.
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Create an AVSession instance. An ability can only create one AVSession
     * @param { Context } context - The context of application
     * @param { string } tag - A user-defined name for this session
     * @param { AVSessionType } type - The type of session {@link AVSessionType}
     * @returns { Promise<AVSession> } Promise for AVSession
     * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
     * 2.Parameter verification failed.
     * @throws { BusinessError } 6600101 - Session service exception.
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    function createAVSession(context: Context, tag: string, type: AVSessionType): Promise<AVSession>;
    /**
     * Define different protocol capability
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @since 11
     */
    /**
     * Define different protocol capability
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @atomicservice
     * @since 12
     */
    enum ProtocolType {
        /**
         * The default cast type "local", media can be routed on the same device,
         * including internal speakers or audio jack on the device itself, A2DP devices.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        /**
         * The default cast type "local", media can be routed on the same device,
         * including internal speakers or audio jack on the device itself, A2DP devices.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        TYPE_LOCAL = 0,
        /**
         * The Cast+ Stream indicating the media is presenting on a different device
         * the application need get an AVCastController to control remote playback.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        /**
         * The Cast+ Stream indicating the media is presenting on a different device
         * the application need get an AVCastController to control remote playback.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        TYPE_CAST_PLUS_STREAM = 2,
        /**
         * The DLNA type indicates the device supports DLNA protocol,
         * the application needs to get an AVCastController to control remote playback.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        TYPE_DLNA = 4
    }
    /**
     * Session type, support audio & video
     * @typedef { 'audio' | 'video' } AVSessionType
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Session type, support audio & video, voice_call
     * @typedef { 'audio' | 'video' | 'voice_call' } AVSessionType
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 11
     */
    /**
     * Session type supports audio & video, voice_call, video_call
     * @typedef { 'audio' | 'video' | 'voice_call' | 'video_call' } AVSessionType
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    type AVSessionType = 'audio' | 'video' | 'voice_call' | 'video_call';
    /**
     * AVSession object.
     * @interface AVSession
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * AVSession object.
     * @interface AVSession
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface AVSession {
        /**
         * unique session Id
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * unique session Id
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        readonly sessionId: string;
        /**
         * Get current session type
         * @type { AVSessionType }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get current session type
         * @type { AVSessionType }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        readonly sessionType: AVSessionType;
        /**
         * Set the metadata of this session.
         * In addition to the required properties, users can fill in partially supported properties
         * @param { AVMetadata } data {@link AVMetadata}
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        setAVMetadata(data: AVMetadata, callback: AsyncCallback<void>): void;
        /**
         * Set the metadata of this session.
         * In addition to the required properties, users can fill in partially supported properties
         * @param { AVMetadata } data {@link AVMetadata}
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Set the metadata of this session.
         * In addition to the required properties, users can fill in partially supported properties
         * @param { AVMetadata } data {@link AVMetadata}
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        setAVMetadata(data: AVMetadata): Promise<void>;
        /**
         * Set the metadata related with current call.
         * @param { CallMetadata } data - {@link CallMetadata}
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        setCallMetadata(data: CallMetadata, callback: AsyncCallback<void>): void;
        /**
         * Set the metadata related with current call.
         * @param { CallMetadata } data - {@link CallMetadata}
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        setCallMetadata(data: CallMetadata): Promise<void>;
        /**
         * Set the playback state of this session.
         * @param { AVPlaybackState } state {@link AVPlaybackState}
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        setAVPlaybackState(state: AVPlaybackState, callback: AsyncCallback<void>): void;
        /**
         * Set the playback state of this session.
         * @param { AVPlaybackState } state {@link AVPlaybackState}
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Set the playback state of this session.
         * @param { AVPlaybackState } state {@link AVPlaybackState}
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        setAVPlaybackState(state: AVPlaybackState): Promise<void>;
        /**
         * Set the call state of this session.
         * @param { AVCallState } state - {@link AVCallState}
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        setAVCallState(state: AVCallState, callback: AsyncCallback<void>): void;
        /**
         * Set the call state of this session.
         * @param { AVCallState } state - {@link AVCallState}
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        setAVCallState(state: AVCallState): Promise<void>;
        /**
         * Set the ability to start the session corresponding to
         * @param { WantAgent } ability - The WantAgent for launch the ability
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        setLaunchAbility(ability: WantAgent, callback: AsyncCallback<void>): void;
        /**
         * Set the ability to start the session corresponding to
         * @param { WantAgent } ability - The WantAgent for launch the ability
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Set the ability to start the session corresponding to
         * @param { WantAgent } ability - The WantAgent for launch the ability
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        setLaunchAbility(ability: WantAgent): Promise<void>;
        /**
         * Dispatch the session event of this session.
         * @param { string } event - Session event name to dispatch
         * @param { object } args - The parameters of session event
         * @param { AsyncCallback<void>} callback - The asyncCallback triggered when the command is executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        dispatchSessionEvent(event: string, args: {
            [key: string]: Object;
        }, callback: AsyncCallback<void>): void;
        /**
         * Dispatch the session event of this session.
         * @param { string } event - Session event name to dispatch
         * @param { object } args - The parameters of session event
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Dispatch the session event of this session.
         * @param { string } event - Session event name to dispatch
         * @param { object } args - The parameters of session event
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        dispatchSessionEvent(event: string, args: {
            [key: string]: Object;
        }): Promise<void>;
        /**
         * Set the playlist of queueItem. Identifies the content of the playlist presented by this session.
         * @param { Array<AVQueueItem> } items - An array of the AVQueueItem
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        setAVQueueItems(items: Array<AVQueueItem>, callback: AsyncCallback<void>): void;
        /**
         * Set the playlist of queueItem. Identifies the content of the playlist presented by this session.
         * @param { Array<AVQueueItem> } items - An array of the AVQueueItem
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Set the playlist of queueItem. Identifies the content of the playlist presented by this session.
         * @param { Array<AVQueueItem> } items - An array of the AVQueueItem
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        setAVQueueItems(items: Array<AVQueueItem>): Promise<void>;
        /**
         * Set the name of the playlist presented by this session.
         * @param { string } title - The name of the playlist
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        setAVQueueTitle(title: string, callback: AsyncCallback<void>): void;
        /**
         * Set the name of the playlist presented by this session.
         * @param { string } title - The name of the playlist
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Set the name of the playlist presented by this session.
         * @param { string } title - The name of the playlist
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        setAVQueueTitle(title: string): Promise<void>;
        /**
         * Set the custom media packets for this session.
         * @param { object } extras - The custom media packets
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        setExtras(extras: {
            [key: string]: Object;
        }, callback: AsyncCallback<void>): void;
        /**
         * Set the custom media packets for this session.
         * @param { object } extras - The custom media packets
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Set the custom media packets for this session.
         * @param { object } extras - The custom media packets
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        setExtras(extras: {
            [key: string]: Object;
        }): Promise<void>;
        /**
         * Get the current session's own controller
         * @param { AsyncCallback<AVSessionController> } callback - async callback for the AVSessionController.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        getController(callback: AsyncCallback<AVSessionController>): void;
        /**
         * Get the current session's own controller
         * @returns { Promise<AVSessionController> } Promise for the AVSessionController
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the current session's own controller
         * @returns { Promise<AVSessionController> } Promise for the AVSessionController
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getController(): Promise<AVSessionController>;
        /**
         * Get the cast controller when the session is casted to remote device.
         * If the avsession is not under casting state, the controller will return null.
         * @param { AsyncCallback<AVCastController> } callback - async callback for the AVCastController.
         * @throws {BusinessError} 6600102 - {@link #ERR_CODE_SESSION_NOT_EXIST} - session does not exist
         * @throws {BusinessError} 6600110 - 6600109 - remote connection does not exist
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        getAVCastController(callback: AsyncCallback<AVCastController>): void;
        /**
         * Get the cast controller when the session is casted to remote device.
         * If the avsession is not under casting state, the controller will return null.
         * @returns { Promise<AVCastController> } Promise for the AVCastController
         * @throws {BusinessError} 6600102 - {@link #ERR_CODE_SESSION_NOT_EXIST} session does not exist
         * @throws {BusinessError} 6600110 - 6600109 - remote connection does not exist
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Get the cast controller when the session is casted to remote device.
         * If the avsession is not under casting state, the controller will return null.
         * @returns { Promise<AVCastController> } Promise for the AVCastController
         * @throws {BusinessError} 6600102 - {@link #ERR_CODE_SESSION_NOT_EXIST} session does not exist
         * @throws {BusinessError} 6600110 - 6600109 - remote connection does not exist
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        getAVCastController(): Promise<AVCastController>;
        /**
         * Get output device information
         * @param { AsyncCallback<OutputDeviceInfo> } callback - async callback for the OutputDeviceInfo.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        getOutputDevice(callback: AsyncCallback<OutputDeviceInfo>): void;
        /**
         * Get output device information
         * @returns { Promise<OutputDeviceInfo> } Promise for the OutputDeviceInfo
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get output device information
         * @returns { Promise<OutputDeviceInfo> } Promise for the OutputDeviceInfo
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getOutputDevice(): Promise<OutputDeviceInfo>;
        /**
         * Get output device information
         * @returns { OutputDeviceInfo } the OutputDeviceInfo
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get output device information
         * @returns { OutputDeviceInfo } the OutputDeviceInfo
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getOutputDeviceSync(): OutputDeviceInfo;
        /**
         * Get all the current virtual display information for extended display.
         * @returns { Promise<Array<CastDisplayInfo>> } Promise for the CastDisplayInfo
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
         * @atomicservice
         * @since 12
         */
        getAllCastDisplays(): Promise<Array<CastDisplayInfo>>;
        /**
         * Register play command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'play' } type - Command to register 'play'.
         * @param { function } callback - Used to handle ('play') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register play command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'play' } type - Command to register 'play'.
         * @param { function } callback - Used to handle ('play') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'play', callback: () => void): void;
        /**
         * Register pause command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'pause' } type - Command to register 'pause'.
         * @param { function } callback - Used to handle ('pause') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register pause command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'pause' } type - Command to register 'pause'.
         * @param { function } callback - Used to handle ('pause') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'pause', callback: () => void): void;
        /**
         * Register stop command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'stop' } type - Command to register 'stop'.
         * @param { function } callback - Used to handle ('stop') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register stop command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'stop' } type - Command to register 'stop'.
         * @param { function } callback - Used to handle ('stop') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'stop', callback: () => void): void;
        /**
         * Register playNext command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'playNext' } type - Command to register 'playNext'.
         * @param { function } callback - Used to handle ('playNext') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register playNext command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'playNext' } type - Command to register 'playNext'.
         * @param { function } callback - Used to handle ('playNext') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'playNext', callback: () => void): void;
        /**
         * Register playPrevious command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'playPrevious' } type - Command to register 'playPrevious'.
         * @param { function } callback - Used to handle ('playPrevious') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register playPrevious command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'playPrevious' } type - Command to register 'playPrevious'.
         * @param { function } callback - Used to handle ('playPrevious') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'playPrevious', callback: () => void): void;
        /**
         * Register fastForward command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'fastForward' } type - Command to register 'fastForward'.
         * @param { function } callback - Used to handle ('fastForward') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register fastForward command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'fastForward' } type - Command to register 'fastForward'.
         * @param { function } callback - Used to handle ('fastForward') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'fastForward', callback: (time?: number) => void): void;
        /**
         * Register rewind command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'rewind' } type - Command to register 'rewind'.
         * @param { function } callback - Used to handle ('rewind') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register rewind command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'rewind' } type - Command to register 'rewind'.
         * @param { function } callback - Used to handle ('rewind') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'rewind', callback: (time?: number) => void): void;
        /**
         * Unregister play command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'play' } type - Command to register 'play'.
         * @param { function } callback - Used to handle ('play') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister play command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'play' } type - Command to register 'play'.
         * @param { function } callback - Used to handle ('play') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'play', callback?: () => void): void;
        /**
         * Unregister pause command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'pause' } type - Command to register 'pause'.
         * @param { function } callback - Used to handle ('pause') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister pause command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'pause' } type - Command to register 'pause'.
         * @param { function } callback - Used to handle ('pause') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'pause', callback?: () => void): void;
        /**
         * Unregister stop command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'stop' } type - Command to register 'stop'.
         * @param { function } callback - Used to handle ('stop') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister stop command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'stop' } type - Command to register 'stop'.
         * @param { function } callback - Used to handle ('stop') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'stop', callback?: () => void): void;
        /**
         * Unregister playNext command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'playNext' } type - Command to register 'playNext'.
         * @param { function } callback - Used to handle ('playNext') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister playNext command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'playNext' } type - Command to register 'playNext'.
         * @param { function } callback - Used to handle ('playNext') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'playNext', callback?: () => void): void;
        /**
         * Unregister playPrevious command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'playPrevious' } type - Command to register 'playPrevious'.
         * @param { function } callback - Used to handle ('playPrevious') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister playPrevious command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'playPrevious' } type - Command to register 'playPrevious'.
         * @param { function } callback - Used to handle ('playPrevious') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'playPrevious', callback?: () => void): void;
        /**
         * Unregister fastForward command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'fastForward' } type - Command to register 'fastForward'.
         * @param { function } callback - Used to handle ('fastForward') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister fastForward command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'fastForward' } type - Command to register 'fastForward'.
         * @param { function } callback - Used to handle ('fastForward') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'fastForward', callback?: () => void): void;
        /**
         * Unregister rewind command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'rewind' } type - Command to register 'rewind'.
         * @param { function } callback - Used to handle ('rewind') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister rewind command callback.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'rewind' } type - Command to register 'rewind'.
         * @param { function } callback - Used to handle ('rewind') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'rewind', callback?: () => void): void;
        /**
         * Register playFromAssetId command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'playFromAssetId' } type - Command to register 'playFromAssetId'.
         * @param { function } callback - Used to handle ('playFromAssetId') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Register playFromAssetId command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * When canceling the callback, need to update the supported commands list.
         * Each playback command only supports registering one callback,
         * and the new callback will replace the previous one.
         * @param { 'playFromAssetId' } type - Command to register 'playFromAssetId'.
         * @param { function } callback - Used to handle ('playFromAssetId') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'playFromAssetId', callback: (assetId: number) => void): void;
        /**
         * Unregister playFromAssetId command callback.
         * @param { 'playFromAssetId' } type - Command to register 'playFromAssetId'.
         * @param { function } callback - Used to handle ('playFromAssetId') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Unregister playFromAssetId command callback.
         * @param { 'playFromAssetId' } type - Command to register 'playFromAssetId'.
         * @param { function } callback - Used to handle ('playFromAssetId') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'playFromAssetId', callback?: (assetId: number) => void): void;
        /**
         * Register seek command callback
         * @param { 'seek' } type - Registration Type 'seek'
         * @param { function } callback - Used to handle seek command.The callback provides the seek time(ms)
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register seek command callback
         * @param { 'seek' } type - Registration Type 'seek'
         * @param { function } callback - Used to handle seek command.The callback provides the seek time(ms)
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'seek', callback: (time: number) => void): void;
        /**
         * Unregister seek command callback
         * @param { 'seek' } type - Registration Type 'seek'
         * @param { function } callback - Used to handle seek command.The callback provides the seek time(ms)
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister seek command callback
         * @param { 'seek' } type - Registration Type 'seek'
         * @param { function } callback - Used to handle seek command.The callback provides the seek time(ms)
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'seek', callback?: (time: number) => void): void;
        /**
         * Register setSpeed command callback
         * @param { 'setSpeed' } type - Registration Type 'setSpeed'
         * @param { function } callback - Used to handle setSpeed command.The callback provides the speed value
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register setSpeed command callback
         * @param { 'setSpeed' } type - Registration Type 'setSpeed'
         * @param { function } callback - Used to handle setSpeed command.The callback provides the speed value
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'setSpeed', callback: (speed: number) => void): void;
        /**
         * Unregister setSpeed command callback
         * @param { 'setSpeed' } type - Registration Type 'setSpeed'
         * @param { function } callback - Used to handle setSpeed command.The callback provides the speed value
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister setSpeed command callback
         * @param { 'setSpeed' } type - Registration Type 'setSpeed'
         * @param { function } callback - Used to handle setSpeed command.The callback provides the speed value
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'setSpeed', callback?: (speed: number) => void): void;
        /**
         * Register setLoopMode command callback
         * @param { 'setLoopMode' } type - Registration Type 'setLoopMode'
         * @param { function } callback - Used to handle setLoopMode command.The callback provides the {@link LoopMode}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register setLoopMode command callback
         * @param { 'setLoopMode' } type - Registration Type 'setLoopMode'
         * @param { function } callback - Used to handle setLoopMode command.The callback provides the {@link LoopMode}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'setLoopMode', callback: (mode: LoopMode) => void): void;
        /**
         * Unregister setLoopMode command callback
         * @param { 'setLoopMode' } type - Registration Type 'setLoopMode'
         * @param { function } callback - Used to handle setLoopMode command.The callback provides the {@link LoopMode}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister setLoopMode command callback
         * @param { 'setLoopMode' } type - Registration Type 'setLoopMode'
         * @param { function } callback - Used to handle setLoopMode command.The callback provides the {@link LoopMode}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'setLoopMode', callback?: (mode: LoopMode) => void): void;
        /**
         * Register toggle favorite command callback
         * @param { 'toggleFavorite' } type - Registration Type 'toggleFavorite'
         * @param { function } callback - Used to handle toggleFavorite command.The callback provides
         * the assetId for which the favorite status needs to be switched.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register toggle favorite command callback
         * @param { 'toggleFavorite' } type - Registration Type 'toggleFavorite'
         * @param { function } callback - Used to handle toggleFavorite command.The callback provides
         * the assetId for which the favorite status needs to be switched.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'toggleFavorite', callback: (assetId: string) => void): void;
        /**
         * Unregister toggle favorite command callback
         * @param { 'toggleFavorite' } type - Registration Type 'toggleFavorite'
         * @param { function } callback - Used to handle toggleFavorite command.The callback provides
         * the assetId for which the favorite status needs to be switched.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister toggle favorite command callback
         * @param { 'toggleFavorite' } type - Registration Type 'toggleFavorite'
         * @param { function } callback - Used to handle toggleFavorite command.The callback provides
         * the assetId for which the favorite status needs to be switched.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'toggleFavorite', callback?: (assetId: string) => void): void;
        /**
         * Register media key handling callback
         * @param { 'handleKeyEvent' } type - Registration Type 'handleKeyEvent'
         * @param { function } callback - Used to handle key events.The callback provides the KeyEvent
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register media key handling callback
         * @param { 'handleKeyEvent' } type - Registration Type 'handleKeyEvent'
         * @param { function } callback - Used to handle key events.The callback provides the KeyEvent
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'handleKeyEvent', callback: (event: KeyEvent) => void): void;
        /**
         * Unregister media key handling callback
         * @param { 'handleKeyEvent' } type - Registration Type 'handleKeyEvent'
         * @param { function } callback - Used to handle key events.The callback provides the KeyEvent
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister media key handling callback
         * @param { 'handleKeyEvent' } type - Registration Type 'handleKeyEvent'
         * @param { function } callback - Used to handle key events.The callback provides the KeyEvent
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'handleKeyEvent', callback?: (event: KeyEvent) => void): void;
        /**
         * Register session output device change callback
         * @param { 'outputDeviceChange' } type - Registration Type 'outputDeviceChange'
         * @param { function } callback - Used to handle output device changed.
         * The callback provide the new device info {@link OutputDeviceInfo} and related connection state {@link ConnectionState}.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600102 - The session does not exist
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register session output device change callback
         * @param { 'outputDeviceChange' } type - Registration Type 'outputDeviceChange'
         * @param { function } callback - Used to handle output device changed.
         * The callback provide the new device info {@link OutputDeviceInfo} and related connection state {@link ConnectionState}.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600102 - The session does not exist
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'outputDeviceChange', callback: (state: ConnectionState, device: OutputDeviceInfo) => void): void;
        /**
         * Unregister session output device change callback
         * @param { 'outputDeviceChange' } type - Registration Type 'outputDeviceChange'
         * @param { function } callback - Used to handle output device changed.
         * The callback provide the new device info {@link OutputDeviceInfo} and related connection state {@link ConnectionState}.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600102 - The session does not exist
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister session output device change callback
         * @param { 'outputDeviceChange' } type - Registration Type 'outputDeviceChange'
         * @param { function } callback - Used to handle output device changed.
         * The callback provide the new device info {@link OutputDeviceInfo} and related connection state {@link ConnectionState}.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600102 - The session does not exist
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'outputDeviceChange', callback?: (state: ConnectionState, device: OutputDeviceInfo) => void): void;
        /**
         * Register session custom command change callback
         * @param { 'commonCommand' } type - Registration Type 'commonCommand'
         * @param { function } callback - Used to handle event when the common command is received
         * The callback provide the command name and command args
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register session custom command change callback
         * @param { 'commonCommand' } type - Registration Type 'commonCommand'
         * @param { function } callback - Used to handle event when the common command is received
         * The callback provide the command name and command args
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'commonCommand', callback: (command: string, args: {
            [key: string]: Object;
        }) => void): void;
        /**
         * Unregister session custom command change callback
         * @param { 'commonCommand' } type - Registration Type 'commonCommand'
         * @param { function } callback - Used to cancel a specific listener
         * The callback provide the command name and command args
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister session custom command change callback
         * @param { 'commonCommand' } type - Registration Type 'commonCommand'
         * @param { function } callback - Used to cancel a specific listener
         * The callback provide the command name and command args
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'commonCommand', callback?: (command: string, args: {
            [key: string]: Object;
        }) => void): void;
        /**
         * Register the item to play from the playlist change callback
         * @param { 'skipToQueueItem' } type - Registration Type 'skipToQueueItem'
         * @param { function } callback - Used to handle the item to be played.
         * The callback provide the new device info {@link OutputDeviceInfo}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register the item to play from the playlist change callback
         * @param { 'skipToQueueItem' } type - Registration Type 'skipToQueueItem'
         * @param { function } callback - Used to handle the item to be played.
         * The callback provide the new device info {@link OutputDeviceInfo}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'skipToQueueItem', callback: (itemId: number) => void): void;
        /**
         * Unregister the item to play from the playlist change callback
         * @param { 'skipToQueueItem' } type - Registration Type 'skipToQueueItem'
         * @param { function } callback - Used to handle the item to be played.
         * The callback provide the new device info {@link OutputDeviceInfo}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister the item to play from the playlist change callback
         * @param { 'skipToQueueItem' } type - Registration Type 'skipToQueueItem'
         * @param { function } callback - Used to handle the item to be played.
         * The callback provide the new device info {@link OutputDeviceInfo}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'skipToQueueItem', callback?: (itemId: number) => void): void;
        /**
         * Register answer command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * @param { 'answer' } type - Command to register 'answer'.
         * @param { Callback<void> } callback - Used to handle ('answer') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Register answer command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * @param { 'answer' } type - Command to register 'answer'.
         * @param { Callback<void> } callback - Used to handle ('answer') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'answer', callback: Callback<void>): void;
        /**
         * Unregister answer command callback.
         * @param { 'answer' } type - Command to register 'answer'.
         * @param { Callback<void> } callback - Used to handle ('answer') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Unregister answer command callback.
         * @param { 'answer' } type - Command to register 'answer'.
         * @param { Callback<void> } callback - Used to handle ('answer') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'answer', callback?: Callback<void>): void;
        /**
         * Register hangUp command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * @param { 'hangUp' } type - Command to register 'hangUp'.
         * @param { Callback<void> } callback - Used to handle ('hangUp') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Register hangUp command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * @param { 'hangUp' } type - Command to register 'hangUp'.
         * @param { Callback<void> } callback - Used to handle ('hangUp') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'hangUp', callback: Callback<void>): void;
        /**
         * Unregister hangUp command callback.
         * @param { 'hangUp' } type - Command to register 'hangUp'.
         * @param { Callback<void> } callback - Used to handle ('hangUp') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Unregister hangUp command callback.
         * @param { 'hangUp' } type - Command to register 'hangUp'.
         * @param { Callback<void> } callback - Used to handle ('hangUp') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'hangUp', callback?: Callback<void>): void;
        /**
         * Register toggleCallMute command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * @param { 'toggleCallMute' } type - Command to register 'toggleCallMute'.
         * @param { Callback<void> } callback - Used to handle ('toggleCallMute') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Register toggleCallMute command callback.
         * As long as it is registered, it means that the ability supports this command.
         * If you cancel the callback, you need to call off {@link off}
         * @param { 'toggleCallMute' } type - Command to register 'toggleCallMute'.
         * @param { Callback<void> } callback - Used to handle ('toggleCallMute') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'toggleCallMute', callback: Callback<void>): void;
        /**
         * Unregister toggleCallMute command callback.
         * @param { 'toggleCallMute' } type - Command to register 'toggleCallMute'.
         * @param { Callback<void> } callback - Used to handle ('toggleCallMute') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Unregister toggleCallMute command callback.
         * @param { 'toggleCallMute' } type - Command to register 'toggleCallMute'.
         * @param { Callback<void> } callback - Used to handle ('toggleCallMute') command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'toggleCallMute', callback?: Callback<void>): void;
        /**
         * Register listener for cast display information changed.
         * @param { 'castDisplayChange' } type - Type of the 'castDisplayChange' to listen for.
         * @param { Callback<CastDisplayInfo> } callback - Callback used to return cast display information.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600102 - The session does not exist
         * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
         * @atomicservice
         * @since 12
         */
        on(type: 'castDisplayChange', callback: Callback<CastDisplayInfo>): void;
        /**
         * Unregister listener for cast display information changed.
         * @param { 'castDisplayChange' } type - Type of the 'castDisplayChange' to listen for.
         * @param { Callback<CastDisplayInfo> } callback - Callback used to return cast display information.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600102 - The session does not exist
         * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
         * @atomicservice
         * @since 12
         */
        off(type: 'castDisplayChange', callback?: Callback<CastDisplayInfo>): void;
        /**
         * Stop current cast and disconnect device connection.
         * @param { AsyncCallback<void> } callback A callback instance used to return when cast stopped completed.
         * @throws { BusinessError } 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        stopCasting(callback: AsyncCallback<void>): void;
        /**
         * Stop current cast and disconnect device connection.
         * @returns { Promise<void> } void result promise when executed successfully
         * @throws { BusinessError } 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Stop current cast and disconnect device connection.
         * @returns { Promise<void> } void result promise when executed successfully
         * @throws { BusinessError } 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        stopCasting(): Promise<void>;
        /**
         * Activate the session, indicating that the session can accept control commands
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the session is activated.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        activate(callback: AsyncCallback<void>): void;
        /**
         * Activate the session, indicating that the session can accept control commands
         * @returns { Promise<void> } void result promise when executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Activate the session, indicating that the session can accept control commands
         * @returns { Promise<void> } void result promise when executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        activate(): Promise<void>;
        /**
         * Deactivate the session, indicating that the session not ready to accept control commands
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the session is deactivated.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        deactivate(callback: AsyncCallback<void>): void;
        /**
         * Deactivate the session, indicating that the session not ready to accept control commands
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Deactivate the session, indicating that the session not ready to accept control commands
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        deactivate(): Promise<void>;
        /**
         * Destroy this session, the server will clean up the session resources
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        destroy(callback: AsyncCallback<void>): void;
        /**
         * Destroy this session, the server will clean up the session resources
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Destroy this session, the server will clean up the session resources
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        destroy(): Promise<void>;
    }
    /**
     * The type of control command
     * @typedef { 'play' | 'pause' | 'stop' | 'playNext' | 'playPrevious' | 'fastForward' | 'rewind' | 'seek' |
     *     'setVolume' | 'setSpeed' | 'setLoopMode' | 'toggleFavorite' | 'toggleMute' } AVCastControlCommandType
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @since 10
     */
    /**
     * The type of control command
     * @typedef { 'play' | 'pause' | 'stop' | 'playNext' | 'playPrevious' | 'fastForward' | 'rewind' | 'seek' |
     *     'setVolume' | 'setSpeed' | 'setLoopMode' | 'toggleFavorite' | 'toggleMute' } AVCastControlCommandType
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @atomicservice
     * @since 12
     */
    type AVCastControlCommandType = 'play' | 'pause' | 'stop' | 'playNext' | 'playPrevious' | 'fastForward' | 'rewind' | 'seek' | 'setVolume' | 'setSpeed' | 'setLoopMode' | 'toggleFavorite' | 'toggleMute';
    /**
     * The definition of command to be sent to the session
     * @interface AVCastControlCommand
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @since 10
     */
    /**
     * The definition of command to be sent to the session
     * @interface AVCastControlCommand
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @atomicservice
     * @since 12
     */
    interface AVCastControlCommand {
        /**
         * The command value {@link AVCastControlCommandType}
         *
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * The command value {@link AVCastControlCommandType}
         * @type { AVCastControlCommandType }
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        command: AVCastControlCommandType;
        /**
         * Parameter carried in the command.
         * The seek command must carry the number parameter.
         * The setVolume command must carry the number parameter.
         * The toggleFavorite command must carry the {@link AVMediaDescription.assetId} parameter.
         * The setSpeed command must carry the {@link #media.PlaybackSpeed} parameter.
         * The setLoopMode command must carry the {@link LoopMode} parameter.
         * Other commands do not need to carry parameters.
         * @type { ?(media.PlaybackSpeed | number | string | LoopMode) }
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Parameter carried in the command.
         * The seek command must carry the number parameter.
         * The setVolume command must carry the number parameter.
         * The toggleFavorite command must carry the {@link AVMediaDescription.assetId} parameter.
         * The setSpeed command must carry the {@link #media.PlaybackSpeed} parameter.
         * The setLoopMode command must carry the {@link LoopMode} parameter.
         * Other commands do not need to carry parameters.
         * @type { ?(media.PlaybackSpeed | number | string | LoopMode) }
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        parameter?: media.PlaybackSpeed | number | string | LoopMode;
    }
    /**
     * AVCastController definition used to implement a remote control when a cast is connected
     * @interface AVCastController
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @since 10
     */
    /**
     * AVCastController definition used to implement a remote control when a cast is connected
     * @interface AVCastController
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @atomicservice
     * @since 12
     */
    interface AVCastController {
        /**
         * Get the playback status of the current player
         * @param { AsyncCallback<AVPlaybackState> } callback - The triggered asyncCallback when (getAVPlaybackState).
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        getAVPlaybackState(callback: AsyncCallback<AVPlaybackState>): void;
        /**
         * Get the playback status of the current player
         * @returns { Promise<AVPlaybackState> } (AVPlaybackState) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Get the playback status of the current player
         * @returns { Promise<AVPlaybackState> } (AVPlaybackState) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        getAVPlaybackState(): Promise<AVPlaybackState>;
        /**
         * Send control commands to remote player
         * @param { AVCastControlCommand } command The command to be send.
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600105 - Invalid session command
         * @throws { BusinessError } 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        sendControlCommand(command: AVCastControlCommand, callback: AsyncCallback<void>): void;
        /**
         * Send control commands to remote player
         * @param { AVCastControlCommand } command The command to be send.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600105 - Invalid session command
         * @throws { BusinessError } 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
        * Send control commands to remote player
        * @param { AVCastControlCommand } command The command to be send.
        * @returns { Promise<void> } Promise used to return the result.
        * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
        * 2.Parameter verification failed.
        * @throws { BusinessError } 6600101 - Session service exception
        * @throws { BusinessError } 6600105 - Invalid session command
        * @throws { BusinessError } 6600109 - The remote connection is not established
        * @syscap SystemCapability.Multimedia.AVSession.AVCast
        * @atomicservice
        * @since 12
        */
        sendControlCommand(command: AVCastControlCommand): Promise<void>;
        /**
         * Play the current item, should contain mediaUri otherwise the playback will fail.
         * @param { AVQueueItem } item media item info.
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully
         * @throws {BusinessError} 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws {BusinessError} 6600101 - Session service exception
         * @throws {BusinessError} 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        start(item: AVQueueItem, callback: AsyncCallback<void>): void;
        /**
         * Play the current item, should contain mediaUri otherwise the playback will fail.
         * @param { AVQueueItem } item media item info.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws {BusinessError} 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws {BusinessError} 6600101 - Session service exception
         * @throws {BusinessError} 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Play the current item, should contain mediaUri otherwise the playback will fail.
         * @param { AVQueueItem } item media item info.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws {BusinessError} 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws {BusinessError} 6600101 - Session service exception
         * @throws {BusinessError} 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        start(item: AVQueueItem): Promise<void>;
        /**
         * Load the current item and mediaUri can be null, this is needed for sink media information displaying
         * @param { AVQueueItem } item media item info.
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully
         * @throws {BusinessError} 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws {BusinessError} 6600101 - Session service exception
         * @throws {BusinessError} 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        prepare(item: AVQueueItem, callback: AsyncCallback<void>): void;
        /**
         * Load the current item and mediaUri can be null, this is needed for sink media information displaying
         * @param { AVQueueItem } item media item info.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws {BusinessError} 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws {BusinessError} 6600101 - Session service exception
         * @throws {BusinessError} 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Load the current item and mediaUri can be null, this is needed for sink media information displaying
         * @param { AVQueueItem } item media item info.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws {BusinessError} 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws {BusinessError} 6600101 - Session service exception
         * @throws {BusinessError} 6600109 - The remote connection is not established
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        prepare(item: AVQueueItem): Promise<void>;
        /**
         * Get the current playing item
         * @param { AsyncCallback<AVQueueItem> } callback - The triggered asyncCallback.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        getCurrentItem(callback: AsyncCallback<AVQueueItem>): void;
        /**
         * Get the current playing item
         * @returns { Promise<AVQueueItem> } (AVQueueItem) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Get the current playing item
         * @returns { Promise<AVQueueItem> } (AVQueueItem) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        getCurrentItem(): Promise<AVQueueItem>;
        /**
         * Get commands supported by the current cast controller
         * @param { AsyncCallback<Array<AVCastControlCommandType>> } callback - The triggered asyncCallback when (getValidCommands).
         * @throws { BusinessError } 6600101 - Session service exception.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        getValidCommands(callback: AsyncCallback<Array<AVCastControlCommandType>>): void;
        /**
         * Get commands supported by the current cast controller
         * @returns { Promise<Array<AVCastControlCommandType>> } array of AVCastControlCommandType promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        getValidCommands(): Promise<Array<AVCastControlCommandType>>;
        /**
         * Process the response corresponding to the media key request obtained by the application.
         * @param { string } assetId - The assetId of resource which provides the response.
         * @param { Uint8Array } response - Response corresponding to the request.
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        processMediaKeyResponse(assetId: string, response: Uint8Array): Promise<void>;
        /**
         * Destroy the controller
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Destroy the controller
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        /**
         * Destroy the controller
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        release(): Promise<void>;
        /**
         * Register playback state changed callback
         * @param { 'playbackStateChange' } type
         * @param { Array<keyof AVPlaybackState> | 'all' } filter - The properties of {@link AVPlaybackState} that you cared about
         * @param { function } callback - The callback used to handle playback state changed event.
         * The callback function provides the {@link AVPlaybackState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Register playback state changed callback
         * @param { 'playbackStateChange' } type
         * @param { Array<keyof AVPlaybackState> | 'all' } filter - The properties of {@link AVPlaybackState} that you cared about
         * @param { function } callback - The callback used to handle playback state changed event.
         * The callback function provides the {@link AVPlaybackState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        on(type: 'playbackStateChange', filter: Array<keyof AVPlaybackState> | 'all', callback: (state: AVPlaybackState) => void): void;
        /**
         * Unregister playback state changed callback
         * @param { 'playbackStateChange' } type
         * @param { function } callback - The callback used to handle playback state changed event.
         * The callback function provides the {@link AVPlaybackState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Unregister playback state changed callback
         * @param { 'playbackStateChange' } type
         * @param { function } callback - The callback used to handle playback state changed event.
         * The callback function provides the {@link AVPlaybackState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        off(type: 'playbackStateChange', callback?: (state: AVPlaybackState) => void): void;
        /**
         * Register listener for current media item playback events.
         * @param { 'mediaItemChange' } type Type of the playback event to listen for.
         * @param { Callback<AVQueueItem> } callback Callback used to listen for current item changed.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Register listener for current media item playback events.
         * @param { 'mediaItemChange' } type Type of the playback event to listen for.
         * @param { Callback<AVQueueItem> } callback Callback used to listen for current item changed.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        on(type: 'mediaItemChange', callback: Callback<AVQueueItem>): void;
        /**
         * Unregister listener for current media item playback events.
         * @param { 'mediaItemChange' } type Type of the playback event to listen for.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Unregister listener for current media item playback events.
         * @param { 'mediaItemChange' } type Type of the playback event to listen for.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        off(type: 'mediaItemChange'): void;
        /**
         * Register playback command callback sent by remote side or media center.
         * Application needs update the new media resource when receive these commands by using playItem.
         * @param { 'playNext' } type - Type of the 'playNext' event to listen for.
         * @param { Callback<void> } callback - Used to handle 'playNext' command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Register playback command callback sent by remote side or media center.
         * Application needs update the new media resource when receive these commands by using playItem.
         * @param { 'playNext' } type - Type of the 'playNext' event to listen for.
         * @param { Callback<void> } callback - Used to handle 'playNext' command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        on(type: 'playNext', callback: Callback<void>): void;
        /**
         * Unregister playback command callback sent by remote side or media center.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'playNext' } type - Type of the 'playNext' event to listen for.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Unregister playback command callback sent by remote side or media center.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'playNext' } type - Type of the 'playNext' event to listen for.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        off(type: 'playNext'): void;
        /**
         * Register playback command callback sent by remote side or media center.
         * Application needs update the new media resource when receive these commands by using playItem.
         * @param { 'playPrevious' } type - Type of the 'playPrevious' to listen for.
         * @param { Callback<void> } callback - Used to handle 'playPrevious' command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Register playback command callback sent by remote side or media center.
         * Application needs update the new media resource when receive these commands by using playItem.
         * @param { 'playPrevious' } type - Type of the 'playPrevious' to listen for.
         * @param { Callback<void> } callback - Used to handle 'playPrevious' command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        on(type: 'playPrevious', callback: Callback<void>): void;
        /**
         * Unregister playback command callback sent by remote side or media center.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'playPrevious' } type - Type of the 'playPrevious' to listen for.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Unregister playback command callback sent by remote side or media center.
         * When canceling the callback, need to update the supported commands list.
         * @param { 'playPrevious' } type - Type of the 'playPrevious' to listen for.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        off(type: 'playPrevious'): void;
        /**
         * Register requested playback command callback sent by remote side or media center.
         * The AVQueueItem may include the requested assetId, starting position and other configurations.
         * @param { 'requestPlay' } type - Type of the 'requestPlay' to listen for.
         * @param { Callback<AVQueueItem> } callback - Used to handle 'requestPlay' command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        on(type: 'requestPlay', callback: Callback<AVQueueItem>): void;
        /**
         * Unregister requested playback command callback sent by remote side or media center.
         * @param { 'requestPlay' } type - Type of the 'requestPlay' to listen for.
         * @param { Callback<AVQueueItem> } callback - Used to handle 'requestPlay' command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        off(type: 'requestPlay', callback?: Callback<AVQueueItem>): void;
        /**
         * Register endOfStream state callback.
         * Application needs update the new media resource when receive these commands by using playItem.
         * @param { 'endOfStream' } type - Type of the 'endOfStream' to listen for.
         * @param { Callback<void> } callback - Used to handle 'endOfStream' command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        on(type: 'endOfStream', callback: Callback<void>): void;
        /**
         * Unregister endOfStream state callback.
         * @param { 'endOfStream' } type - Type of the 'endOfStream' to listen for.
         * @param { Callback<void> } callback - Used to handle 'endOfStream' command
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        off(type: 'endOfStream', callback?: Callback<void>): void;
        /**
         * Register listens for playback events.
         * @param { 'seekDone' } type - Type of the 'seekDone' to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback seekDone event.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Register listens for playback events.
         * @param { 'seekDone' } type - Type of the 'seekDone' to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the playback seekDone event.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        on(type: 'seekDone', callback: Callback<number>): void;
        /**
         * Unregister listens for playback events.
         * @param { 'seekDone' } type - Type of the 'seekDone' to listen for.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Unregister listens for playback events.
         * @param { 'seekDone' } type - Type of the 'seekDone' to listen for.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        off(type: 'seekDone'): void;
        /**
         * Register the valid commands of the casted session changed callback
         * @param { 'validCommandChange' } type - 'validCommandChange'
         * @param { Callback<Array<AVCastControlCommandType>> } callback - The callback used to handle the changes.
         * The callback function provides an array of AVCastControlCommandType.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        on(type: 'validCommandChange', callback: Callback<Array<AVCastControlCommandType>>);
        /**
         * Unregister the valid commands of the casted session changed callback
         * @param { 'validCommandChange' } type - 'validCommandChange'
         * @param { Callback<Array<AVCastControlCommandType>> } callback - The callback used to handle the changes.
         * The callback function provides an array of AVCastControlCommandType.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        off(type: 'validCommandChange', callback?: Callback<Array<AVCastControlCommandType>>);
        /**
         * Register listeners for playback error events.
         * @param { 'error' } type Type of the 'error' to listen for.
         * @param { ErrorCallback } callback Callback used to listen for the playback error event.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 5400101 - No memory.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400104 - Time out.
         * @throws { BusinessError } 5400105 - Service died.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Register listeners for playback error events.
         * @param { 'error' } type Type of the 'error' to listen for.
         * @param { ErrorCallback } callback Callback used to listen for the playback error event.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 5400101 - No memory.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400104 - Time out.
         * @throws { BusinessError } 5400105 - Service died.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unregister listens for playback error events.
         * @param { 'error' } type Type of the 'error' to listen for.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 5400101 - No memory.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400104 - Time out.
         * @throws { BusinessError } 5400105 - Service died.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * Unregister listens for playback error events.
         * @param { 'error' } type Type of the 'error' to listen for.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 5400101 - No memory.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400104 - Time out.
         * @throws { BusinessError } 5400105 - Service died.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        off(type: 'error'): void;
        /**
         * Register listener for drm key request.
         * @param { 'keyRequest' } type - Type of the 'keyRequest' to listen for.
         * @param { KeyRequestCallback } callback - Callback used to request drm key.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        on(type: 'keyRequest', callback: KeyRequestCallback): void;
        /**
         * Unregister listener for drm key request.
         * @param { 'keyRequest' } type - Type of the 'keyRequest' to listen for.
         * @param { KeyRequestCallback } callback - Callback used to request drm key.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        off(type: 'keyRequest', callback?: KeyRequestCallback): void;
    }
    /**
     * The callback of key request.
     *
     * @typedef { function } KeyRequestCallback
     * @param { string } assetId - request key for current assetId
     * @param { Uint8Array } requestData - media key request data sent to media key server
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @atomicservice
     * @since 12
     */
    type KeyRequestCallback = (assetId: string, requestData: Uint8Array) => void;
    /**
     * Enumerates the cast display states.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
     * @atomicservice
     * @since 12
     */
    enum CastDisplayState {
        /**
         * Screen off.
         *
         * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
         * @atomicservice
         * @since 12
         */
        STATE_OFF = 1,
        /**
         * Screen on.
         *
         * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
         * @atomicservice
         * @since 12
         */
        STATE_ON = 2
    }
    /**
     * Define the information for extended display screen.
     * @typedef CastDisplayInfo
     * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
     * @atomicservice
     * @since 12
     */
    interface CastDisplayInfo {
        /**
         * Display ID.
         * The application can get more display information based on the same id from display interface.
         * @type { number }
         * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
         * @atomicservice
         * @since 12
         */
        id: number;
        /**
         * Display name.
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
         * @atomicservice
         * @since 12
         */
        name: string;
        /**
         * The state of display.
         * @type { CastDisplayState }
         * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
         * @atomicservice
         * @since 12
         */
        state: CastDisplayState;
        /**
         * Display width, in pixels.
         * @type { number }
         * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
         * @atomicservice
         * @since 12
         */
        width: number;
        /**
         * Display height, in pixels.
         * @type { number }
         * @syscap SystemCapability.Multimedia.AVSession.ExtendedDisplayCast
         * @atomicservice
         * @since 12
         */
        height: number;
    }
    /**
     * Define the device connection state.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Define the device connection state.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    enum ConnectionState {
        /**
         * A connection state indicating the device is in the process of connecting.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * A connection state indicating the device is in the process of connecting.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        STATE_CONNECTING = 0,
        /**
         * A connection state indicating the device is connected.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * A connection state indicating the device is connected.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        STATE_CONNECTED = 1,
        /**
         * The default connection state indicating the device is disconnected.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The default connection state indicating the device is disconnected.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        STATE_DISCONNECTED = 6
    }
    /**
     * The pre-defined display tag by system.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 11
     */
    enum DisplayTag {
        /**
         * Indicate the AUDIO VIVID property of current media resource.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        TAG_AUDIO_VIVID = 1
    }
    /**
     * The metadata of the current media.Used to set the properties of the current media file
     * @interface AVMetadata
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * The metadata of the current media.Used to set the properties of the current media file
     * @interface AVMetadata
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface AVMetadata {
        /**
         * Unique ID used to represent this media.
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unique ID used to represent this media.
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        assetId: string;
        /**
         * The title of this media, for display in media center.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The title of this media, for display in media center.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        title?: string;
        /**
         * The artist of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The artist of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        artist?: string;
        /**
         * The author of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The author of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        author?: string;
        /**
         * The name of play list which current media belongs to
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 12
         */
        avQueueName?: string;
        /**
         * The id of play list which current media belongs to, it should be an unique identifier in the application.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        avQueueId?: string;
        /**
         * The artwork of play list as a {@link PixelMap} or an uri formatted String,
         * @type { ?(image.PixelMap | string) }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        avQueueImage?: image.PixelMap | string;
        /**
         * The album of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The album of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        album?: string;
        /**
         * The writer of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The writer of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        writer?: string;
        /**
         * The composer of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        composer?: string;
        /**
         * The duration of this media, used to automatically calculate playback position
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The duration of this media, used to automatically calculate playback position
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        duration?: number;
        /**
         * The image of the media as a {@link PixelMap} or an uri formatted String,
         * used to display in media center.
         * @type { ?(image.PixelMap | string) }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The image of the media as a {@link PixelMap} or an uri formatted String,
         * used to display in media center.
         * @type { ?(image.PixelMap | string) }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        mediaImage?: image.PixelMap | string;
        /**
         * The publishDate of the media
         * @type { ?Date }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        publishDate?: Date;
        /**
         * The subtitle of the media, used for display
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The subtitle of the media, used for display
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        subtitle?: string;
        /**
         * The discription of the media, used for display
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The discription of the media, used for display
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        description?: string;
        /**
         * The lyric of the media, it should be in standard lyric format
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        lyric?: string;
        /**
         * The previous playable media id.
         * Used to tell the controller if there is a previous playable media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The previous playable media id.
         * Used to tell the controller if there is a previous playable media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        previousAssetId?: string;
        /**
         * The next playable media id.
         * Used to tell the controller if there is a next playable media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The next playable media id.
         * Used to tell the controller if there is a next playable media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        nextAssetId?: string;
        /**
         * The protocols supported by this session, if not set, the default is {@link TYPE_CAST_PLUS_STREAM}.
         * See {@link ProtocolType}
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * The protocols supported by this session, if not set, the default is {@link TYPE_CAST_PLUS_STREAM}.
         * See {@link ProtocolType}
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        filter?: number;
        /**
         * The drm schemes supported by this session which are represented by uuid.
         * @type { ?Array<string> }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 12
         */
        drmSchemes?: Array<string>;
        /**
         * The supported skipIntervals when doing fast forward and rewind operation, the default is {@link SECONDS_15}.
         * See {@link SkipIntervals}
         * @type { ?SkipIntervals }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        skipIntervals?: SkipIntervals;
        /**
         * The display tags supported by application to be displayed on media center
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        displayTags?: number;
    }
    /**
     * The description of the media for an item in the playlist of the session
     * @interface AVMediaDescription
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * The description of the media for an item in the playlist of the session
     * @interface AVMediaDescription
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface AVMediaDescription {
        /**
         * Unique ID used to represent this media.
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unique ID used to represent this media.
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        assetId: string;
        /**
         * The title of this media, for display in media center.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The title of this media, for display in media center.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        title?: string;
        /**
         * The subtitle of the media, used for display
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The subtitle of the media, used for display
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        subtitle?: string;
        /**
         * The description of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The description of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        description?: string;
        /**
         * The image of this media asset displayed in the media center.
         * It can be a {@link PixelMap} or a URI formatted string,
         * @type { ?(image.PixelMap | string) }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The image of this media asset displayed in the media center.
         * It can be a {@link PixelMap} or a URI formatted string,
         * @type { ?(image.PixelMap | string) }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        mediaImage?: image.PixelMap | string;
        /**
         * Any additional attributes that can be represented as key-value pairs
         * @type { ?object }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        extras?: {
            [key: string]: Object;
        };
        /**
         * The type of this media, such as video, audio and so on.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The type of this media, such as video, audio and so on.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        mediaType?: string;
        /**
         * The size of this media.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The size of this media.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        mediaSize?: number;
        /**
         * The album title of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The album title of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        albumTitle?: string;
        /**
         * The album cover uri of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The album cover uri of this media
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        albumCoverUri?: string;
        /**
         * The lyric content of the media, it should be in standard lyric format
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The lyric content of the media, it should be in standard lyric format
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        lyricContent?: string;
        /**
         * The lyric uri of the media.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The lyric uri of the media.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        lyricUri?: string;
        /**
         * The artist of this media.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The artist of this media.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        artist?: string;
        /**
         * The uri of the media, used to locate the media in some special cases
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The uri of the media, used to locate the media in some special cases
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        mediaUri?: string;
        /**
         * Media file descriptor.
         * @type { ?media.AVFileDescriptor }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Media file descriptor.
         * @type { ?media.AVFileDescriptor }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        fdSrc?: media.AVFileDescriptor;
        /**
         * DataSource descriptor. The caller ensures the fileSize and callback are valid.
         * @type { ?media.AVDataSrcDescriptor }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 12
         */
        dataSrc?: media.AVDataSrcDescriptor;
        /**
         * The drm scheme supported by this resource which is represented by uuid.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 12
         */
        drmScheme?: string;
        /**
         * The duration of this media
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The duration of this media
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        duration?: number;
        /**
         * Media start position, described by milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Media start position, described by milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        startPosition?: number;
        /**
         * Media credits position, described by milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Media credits position, described by milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        creditsPosition?: number;
        /**
         * Application name.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Application name.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        appName?: string;
        /**
         * The display tags supported by application to be displayed on media center
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * The display tags supported by application to be displayed on media center
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        displayTags?: number;
    }
    /**
     * The item in the playlist of the session
     * @interface AVQueueItem
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * The item in the playlist of the session
     * @interface AVQueueItem
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface AVQueueItem {
        /**
         * Sequence number of the item in the playlist.
         * @type { number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Sequence number of the item in the playlist.
         * @type { number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        itemId: number;
        /**
         * The media description of the item in the playlist.
         * @type { ?AVMediaDescription }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The media description of the item in the playlist.
         * @type { ?AVMediaDescription }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        description?: AVMediaDescription;
    }
    /**
     * Used to indicate the playback state of the current media.
     * If the playback state of the media changes, it needs to be updated synchronously
     * @interface AVPlaybackState
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Used to indicate the playback state of the current media.
     * If the playback state of the media changes, it needs to be updated synchronously
     * @interface AVPlaybackState
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface AVPlaybackState {
        /**
         * Current playback state. See {@link PlaybackState}
         * @type { ?PlaybackState }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Current playback state. See {@link PlaybackState}
         * @type { ?PlaybackState }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        state?: PlaybackState;
        /**
         * Current playback speed
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Current playback speed
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        speed?: number;
        /**
         * Current playback position of this media. See {@link PlaybackPosition}
         * @type { ?PlaybackPosition }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Current playback position of this media. See {@link PlaybackPosition}
         * @type { ?PlaybackPosition }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        position?: PlaybackPosition;
        /**
         * The current buffered time, the maximum playable position
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The current buffered time, the maximum playable position
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        bufferedTime?: number;
        /**
         * Current playback loop mode. See {@link LoopMode}
         * @type { ?LoopMode }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Current playback loop mode. See {@link LoopMode}
         * @type { ?LoopMode }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        loopMode?: LoopMode;
        /**
         * Current Favorite Status
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Current Favorite Status
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        isFavorite?: boolean;
        /**
         * Current active item id
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Current active item id
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        activeItemId?: number;
        /**
         * Current player volume
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Current player volume
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        volume?: number;
        /**
         * maximum  volume
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * maximum  volume
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        maxVolume?: number;
        /**
         * Current muted status
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Current muted status
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        muted?: boolean;
        /**
         * The duration of this media asset.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        duration?: number;
        /**
         * The video width of this media asset.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * The video width of this media asset.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        videoWidth?: number;
        /**
         * The video height of this media asset.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * The video height of this media asset.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        videoHeight?: number;
        /**
         * Current custom media packets
         * @type { ?object }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Current custom media packets
         * @type { ?object }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        extras?: {
            [key: string]: Object;
        };
    }
    /**
     * Playback position definition
     * @interface PlaybackPosition
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Playback position definition
     * @interface PlaybackPosition
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface PlaybackPosition {
        /**
         * Elapsed time(position) of this media set by the app.
         * @type { number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Elapsed time(position) of this media set by the app.
         * @type { number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        elapsedTime: number;
        /**
         * Record the system time when elapsedTime is set.
         * @type { number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Record the system time when elapsedTime is set.
         * @type { number }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        updateTime: number;
    }
    /**
     * The metadata of the current call.
     * @interface CallMetadata
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 11
     */
    /**
     * The metadata of the current call.
     * @typedef CallMetadata
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface CallMetadata {
        /**
         * The displayed user name of current call.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * The displayed user name of current call.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        name?: string;
        /**
         * The phone number of current call.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * The phone number of current call.
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        phoneNumber?: string;
        /**
         * The displayed picture that represents a particular user.
         * @type { ?image.PixelMap }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * The displayed picture that represents a particular user.
         * @type { ?image.PixelMap }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        avatar?: image.PixelMap;
    }
    /**
     * Used to indicate the call state of the current call.
     * @interface AVCallState
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 11
     */
    /**
     * Used to indicate the call state of the current call.
     * @typedef AVCallState
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface AVCallState {
        /**
         * Current call state. See {@link CallState}
         * @type { CallState }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Current call state. See {@link CallState}
         * @type { CallState }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        state: CallState;
        /**
         * Current muted status.
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Current muted status.
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        muted: boolean;
    }
    /**
     * Enumeration of current call state
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 11
     */
    /**
     * Enumeration of current call state
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    enum CallState {
        /**
         * Idle state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Idle state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        CALL_STATE_IDLE = 0,
        /**
         * Incoming state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Incoming state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        CALL_STATE_INCOMING = 1,
        /**
         * Active state in calling.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Active state in calling.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        CALL_STATE_ACTIVE = 2,
        /**
         * Dialing state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Dialing state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        CALL_STATE_DIALING = 3,
        /**
         * Waiting state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Waiting state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        CALL_STATE_WAITING = 4,
        /**
         * Holding state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Holding state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        CALL_STATE_HOLDING = 5,
        /**
         * Disconnecting state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Disconnecting state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        CALL_STATE_DISCONNECTING = 6
    }
    /**
     * cast category indicating different playback scenes
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @since 10
     */
    /**
     * cast category indicating different playback scenes
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @atomicservice
     * @since 12
     */
    enum AVCastCategory {
        /**
         * The default cast type "local", media can be routed on the same device,
         * including internal speakers or audio jack on the device itself, A2DP devices.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * The default cast type "local", media can be routed on the same device,
         * including internal speakers or audio jack on the device itself, A2DP devices.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        CATEGORY_LOCAL = 0,
        /**
         * The remote category indicating the media is presenting on a remote device,
         * the application needs to get an AVCastController to control remote playback.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * The remote category indicating the media is presenting on a remote device,
         * the application needs to get an AVCastController to control remote playback.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        CATEGORY_REMOTE = 1
    }
    /**
     * Device type definition
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Device type definition
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    enum DeviceType {
        /**
         * A device type indicating the route is on internal speakers or audio jack on the device itself.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * A device type indicating the route is on internal speakers or audio jack on the device itself.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        DEVICE_TYPE_LOCAL = 0,
        /**
         * A device type indicating the route is on a TV.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * A device type indicating the route is on a TV.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        DEVICE_TYPE_TV = 2,
        /**
         * A device type indicating the route is on a smart speaker.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 10
         */
        /**
         * A device type indicating the route is on a smart speaker.
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        DEVICE_TYPE_SMART_SPEAKER = 3,
        /**
         * A device type indicating the route is on a bluetooth device.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * A device type indicating the route is on a bluetooth device.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        DEVICE_TYPE_BLUETOOTH = 10
    }
    /**
     * Device Information Definition
     * @interface DeviceInfo
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Device Information Definition
     * @interface DeviceInfo
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface DeviceInfo {
        /**
         * The playback type supported by the device. See {@link AVCastCategory}
         * @type { AVCastCategory }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The playback type supported by the device. See {@link AVCastCategory}
         * @type { AVCastCategory }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        castCategory: AVCastCategory;
        /**
         * Audio device id.The length of the audioDeviceId array is greater than 1
         * if output to multiple devices at the same time.
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Audio device id.The length of the audioDeviceId array is greater than 1
         * if output to multiple devices at the same time.
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        deviceId: string;
        /**
         * Device name. The length of the deviceName array is greater than 1
         * if output to multiple devices at the same time.
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Device name. The length of the deviceName array is greater than 1
         * if output to multiple devices at the same time.
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        deviceName: string;
        /**
         * device type.
         * @type { DeviceType }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * device type.
         * @type { DeviceType }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        deviceType: DeviceType;
        /**
         * The protocols supported by current device, can be union of {@link ProtocolType}.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @since 11
         */
        /**
         * The protocols supported by current device, can be union of {@link ProtocolType}.
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        supportedProtocols?: number;
        /**
         * The drm capability supported by current device, each drm is represented by uuid.
         * @type { ?Array<string> }
         * @syscap SystemCapability.Multimedia.AVSession.AVCast
         * @atomicservice
         * @since 12
         */
        supportedDrmCapabilities?: Array<string>;
    }
    /**
     * Target Device Information Definition
     * @interface OutputDeviceInfo
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Target Device Information Definition
     * @interface OutputDeviceInfo
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface OutputDeviceInfo {
        /**
         * Arrays of device information
         * @type { Array<DeviceInfo> }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Arrays of device information
         * @type { Array<DeviceInfo> }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        devices: Array<DeviceInfo>;
    }
    /**
     * Loop Play Mode Definition
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Loop Play Mode Definition
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    enum LoopMode {
        /**
         * The default mode is sequential playback
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The default mode is sequential playback
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        LOOP_MODE_SEQUENCE = 0,
        /**
         * Single loop mode
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Single loop mode
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        LOOP_MODE_SINGLE = 1,
        /**
         * List loop mode
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * List loop mode
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        LOOP_MODE_LIST = 2,
        /**
         * Shuffle playback mode
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Shuffle playback mode
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        LOOP_MODE_SHUFFLE = 3,
        /**
         * Custom playback mode supported by application
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Custom playback mode supported by application
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        LOOP_MODE_CUSTOM = 4
    }
    /**
     * Supported skip intervals definition
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 11
     */
    enum SkipIntervals {
        /**
         * 10 seconds
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        SECONDS_10 = 10,
        /**
         * 15 seconds
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        SECONDS_15 = 15,
        /**
         * 30 seconds
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        SECONDS_30 = 30
    }
    /**
     * Definition of current playback state
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Definition of current playback state
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    enum PlaybackState {
        /**
         * Initial state. The initial state of media file
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Initial state. The initial state of media file
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_INITIAL = 0,
        /**
         * Preparing state. Indicates that the media file is not ready to play,
         * the media is loading or buffering
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Preparing state. Indicates that the media file is not ready to play,
         * the media is loading or buffering
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_PREPARE = 1,
        /**
         * Playing state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Playing state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_PLAY = 2,
        /**
         * Paused state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Paused state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_PAUSE = 3,
        /**
         * Fast forwarding state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Fast forwarding state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_FAST_FORWARD = 4,
        /**
         * Rewinding state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Rewinding state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_REWIND = 5,
        /**
         * Stopped state.The server will clear the media playback position and other information.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Stopped state.The server will clear the media playback position and other information.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_STOP = 6,
        /**
         * Completed state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Completed state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_COMPLETED = 7,
        /**
         * Released state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Released state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_RELEASED = 8,
        /**
         * error state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * error state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_ERROR = 9,
        /**
         * Idle state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Idle state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_IDLE = 10,
        /**
         * Buffering state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Buffering state.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        PLAYBACK_STATE_BUFFERING = 11
    }
    /**
     * Session controller,used to control media playback and get media information
     * @interface AVSessionController
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Session controller,used to control media playback and get media information
     * @typedef AVSessionController
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface AVSessionController {
        /**
         * Unique session Id
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unique session Id
         * @type { string }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        readonly sessionId: string;
        /**
         * Get the playback status of the current session
         * @param { AsyncCallback<AVPlaybackState> } callback - The triggered asyncCallback when (getAVPlaybackState).
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        getAVPlaybackState(callback: AsyncCallback<AVPlaybackState>): void;
        /**
         * Get the playback status of the current session
         * @returns { Promise<AVPlaybackState> } (AVPlaybackState) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the playback status of the current session
         * @returns { Promise<AVPlaybackState> } (AVPlaybackState) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getAVPlaybackState(): Promise<AVPlaybackState>;
        /**
         * Get the playback status of the current session
         * @returns { AVPlaybackState } (AVPlaybackState) returned
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the playback status of the current session
         * @returns { AVPlaybackState } (AVPlaybackState) returned
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getAVPlaybackStateSync(): AVPlaybackState;
        /**
         * Get the metadata of the current session
         * @param { AsyncCallback<AVMetadata> } callback - The triggered asyncCallback when (getAVMetadata).
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        getAVMetadata(callback: AsyncCallback<AVMetadata>): void;
        /**
         * Get the metadata of the current session
         * @returns { Promise<AVMetadata> } (AVMetadata) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the metadata of the current session
         * @returns { Promise<AVMetadata> } (AVMetadata) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getAVMetadata(): Promise<AVMetadata>;
        /**
         * Get the metadata of the current session
         * @returns { AVMetadata } (AVMetadata) returned
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the metadata of the current session
         * @returns { AVMetadata } (AVMetadata) returned
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getAVMetadataSync(): AVMetadata;
        /**
         * Get the call status of the current session
         * @param { AsyncCallback<AVCallState> } callback - The triggered asyncCallback when (getAVCallState).
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        getAVCallState(callback: AsyncCallback<AVCallState>): void;
        /**
         * Get the call status of the current session
         * @returns { Promise<AVCallState> } (AVCallState) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        getAVCallState(): Promise<AVCallState>;
        /**
         * Get the call metadata of the current session
         * @param { AsyncCallback<CallMetadata> } callback - The triggered asyncCallback when (getCallMetadata).
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        getCallMetadata(callback: AsyncCallback<CallMetadata>): void;
        /**
         * Get the call metadata of the current session
         * @returns { Promise<CallMetadata> } (CallMetadata) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        getCallMetadata(): Promise<CallMetadata>;
        /**
         * Get the name of the playlist of the current session
         * @param { AsyncCallback<string> } callback - The triggered asyncCallback when (getAVQueueTitle).
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        getAVQueueTitle(callback: AsyncCallback<string>): void;
        /**
         * Get the name of the playlist of the current session
         * @returns { Promise<string> } (string) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the name of the playlist of the current session
         * @returns { Promise<string> } (string) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getAVQueueTitle(): Promise<string>;
        /**
         * Get the name of the playlist of the current session
         * @returns { string } (string) returned
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the name of the playlist of the current session
         * @returns { string } (string) returned
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getAVQueueTitleSync(): string;
        /**
         * Get the playlist of the current session
         * @param { AsyncCallback<Array<AVQueueItem>> } callback - The triggered asyncCallback when (getAVQueueItems).
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        getAVQueueItems(callback: AsyncCallback<Array<AVQueueItem>>): void;
        /**
         * Get the playlist of the current session
         * @returns { Promise<Array<AVQueueItem>> } (Array<AVQueueItem>) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the playlist of the current session
         * @returns { Promise<Array<AVQueueItem>> } (Array<AVQueueItem>) returned through promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getAVQueueItems(): Promise<Array<AVQueueItem>>;
        /**
         * Get the playlist of the current session
         * @returns { Array<AVQueueItem> } (Array<AVQueueItem>) returned
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the playlist of the current session
         * @returns { Array<AVQueueItem> } (Array<AVQueueItem>) returned
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getAVQueueItemsSync(): Array<AVQueueItem>;
        /**
         * Set the item in the playlist to be played
         * @param { number } itemId - The serial number of the item to be played
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        skipToQueueItem(itemId: number, callback: AsyncCallback<void>): void;
        /**
         * Set the item in the playlist to be played
         * @param { number } itemId - The serial number of the item to be played
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Set the item in the playlist to be played
         * @param { number } itemId - The serial number of the item to be played
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        skipToQueueItem(itemId: number): Promise<void>;
        /**
         * Get output device information
         * @param { AsyncCallback<OutputDeviceInfo> } callback - The triggered asyncCallback when (getOutputDevice).
         * @throws { BusinessError } 600101 - Session service exception.
         * @throws { BusinessError } 600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        getOutputDevice(callback: AsyncCallback<OutputDeviceInfo>): void;
        /**
         * Get output device information
         * @returns { Promise<OutputDeviceInfo> } (OutputDeviceInfo) returned through promise
         * @throws { BusinessError } 600101 - Session service exception.
         * @throws { BusinessError } 600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get output device information
         * @returns { Promise<OutputDeviceInfo> } (OutputDeviceInfo) returned through promise
         * @throws { BusinessError } 600101 - Session service exception.
         * @throws { BusinessError } 600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getOutputDevice(): Promise<OutputDeviceInfo>;
        /**
         * Get output device information
         * @returns { OutputDeviceInfo } (OutputDeviceInfo) returned
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get output device information
         * @returns { OutputDeviceInfo } (OutputDeviceInfo) returned
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getOutputDeviceSync(): OutputDeviceInfo;
        /**
         * Send media key event to this session
         * @param { KeyEvent } event - The KeyEvent
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 600101 - Session service exception.
         * @throws { BusinessError } 600102 - The session does not exist.
         * @throws { BusinessError } 600103 - The session controller does not exist.
         * @throws { BusinessError } 600105 - Invalid session command.
         * @throws { BusinessError } 600106 - The session is not activated.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        sendAVKeyEvent(event: KeyEvent, callback: AsyncCallback<void>): void;
        /**
         * Send media key event to this session
         * @param { KeyEvent } event - The KeyEvent
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 600101 - Session service exception.
         * @throws { BusinessError } 600102 - The session does not exist.
         * @throws { BusinessError } 600103 - The session controller does not exist.
         * @throws { BusinessError } 600105 - Invalid session command.
         * @throws { BusinessError } 600106 - The session is not activated.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Send media key event to this session
         * @param { KeyEvent } event - The KeyEvent
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 600101 - Session service exception.
         * @throws { BusinessError } 600102 - The session does not exist.
         * @throws { BusinessError } 600103 - The session controller does not exist.
         * @throws { BusinessError } 600105 - Invalid session command.
         * @throws { BusinessError } 600106 - The session is not activated.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        sendAVKeyEvent(event: KeyEvent): Promise<void>;
        /**
         * Get the {@link WantAgent} of this session that can launch the session ability
         * @param { AsyncCallback<WantAgent> } callback - The asyncCallback triggered when getting the WantAgent.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        getLaunchAbility(callback: AsyncCallback<WantAgent>): void;
        /**
         * Get the {@link WantAgent} of this session that can launch the session ability
         * @returns { Promise<WantAgent> } WantAgent promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the {@link WantAgent} of this session that can launch the session ability
         * @returns { Promise<WantAgent> } WantAgent promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getLaunchAbility(): Promise<WantAgent>;
        /**
         * Get the adjusted playback position. The time automatically calculated by the system
         * taking into account factors such as playback status, playback speed, and application update time.
         * @returns { number } current playback position in ms.Note that the returns value of each call will be different.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get the adjusted playback position. The time automatically calculated by the system
         * taking into account factors such as playback status, playback speed, and application update time.
         * @returns { number } current playback position in ms.Note that the returns value of each call will be different.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getRealPlaybackPositionSync(): number;
        /**
         * Check if the current session is active
         * @param { AsyncCallback<boolean> } callback - The triggered asyncCallback when (isActive).
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        isActive(callback: AsyncCallback<boolean>): void;
        /**
         * Check if the current session is active
         * @returns { Promise<boolean> } boolean promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Check if the current session is active
         * @returns { Promise<boolean> } boolean promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        isActive(): Promise<boolean>;
        /**
         * Check if the current session is active
         * @returns { boolean } boolean
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Check if the current session is active
         * @returns { boolean } boolean
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        isActiveSync(): boolean;
        /**
         * Destroy the server controller
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        destroy(callback: AsyncCallback<void>): void;
        /**
         * Destroy the server controller
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Destroy the server controller
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        destroy(): Promise<void>;
        /**
         * Get commands supported by the current session
         * @param { AsyncCallback<Array<AVControlCommandType>> } callback - The triggered asyncCallback when (getValidCommands).
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        getValidCommands(callback: AsyncCallback<Array<AVControlCommandType>>): void;
        /**
         * Get commands supported by the current session
         * @returns { Promise<Array<AVControlCommandType>> } array of AVControlCommandType promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get commands supported by the current session
         * @returns { Promise<Array<AVControlCommandType>> } array of AVControlCommandType promise
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getValidCommands(): Promise<Array<AVControlCommandType>>;
        /**
         * Get commands supported by the current session
         * @returns {Array<AVControlCommandType> } array of AVControlCommandType
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get commands supported by the current session
         * @returns {Array<AVControlCommandType> } array of AVControlCommandType
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getValidCommandsSync(): Array<AVControlCommandType>;
        /**
         * Send control commands to this session
         * @param { AVControlCommand } command - The command to be sent. See {@link AVControlCommand}
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @throws { BusinessError } 6600105 - Invalid session command.
         * @throws { BusinessError } 6600106 - The session is not activated.
         * @throws { BusinessError } 6600107 - Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        sendControlCommand(command: AVControlCommand, callback: AsyncCallback<void>): void;
        /**
         * Send control commands to this session
         * @param { AVControlCommand } command - The command to be sent. See {@link AVControlCommand}
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @throws { BusinessError } 6600105 - Invalid session command.
         * @throws { BusinessError } 6600106 - The session is not activated.
         * @throws { BusinessError } 6600107 - Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Send control commands to this session
         * @param { AVControlCommand } command - The command to be sent. See {@link AVControlCommand}
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @throws { BusinessError } 6600105 - Invalid session command.
         * @throws { BusinessError } 6600106 - The session is not activated.
         * @throws { BusinessError } 6600107 - Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        sendControlCommand(command: AVControlCommand): Promise<void>;
        /**
         * Send common commands to this session
         * @param { string } command - The command name to be sent.
         * @param { object } args - The parameters of session event
         * @param { AsyncCallback<void> } callback - The asyncCallback triggered when the command is executed successfully.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @throws { BusinessError } 6600105 - Invalid session command.
         * @throws { BusinessError } 6600106 - The session is not activated.
         * @throws { BusinessError } 6600107 - Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        sendCommonCommand(command: string, args: {
            [key: string]: Object;
        }, callback: AsyncCallback<void>): void;
        /**
         * Send common commands to this session
         * @param { string } command - The command name to be sent.
         * @param { object } args - The parameters of session event
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @throws { BusinessError } 6600105 - Invalid session command.
         * @throws { BusinessError } 6600106 - The session is not activated.
         * @throws { BusinessError } 6600107 - Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Send common commands to this session
         * @param { string } command - The command name to be sent.
         * @param { object } args - The parameters of session event
         * @returns { Promise<void> } void promise when executed successfully
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @throws { BusinessError } 6600105 - Invalid session command.
         * @throws { BusinessError } 6600106 - The session is not activated.
         * @throws { BusinessError } 6600107 - Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        sendCommonCommand(command: string, args: {
            [key: string]: Object;
        }): Promise<void>;
        /**
         * Get custom media packets provided by the corresponding session
         * @param { AsyncCallback<{[key: string]: Object}> } callback - The triggered asyncCallback when (getExtras).
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @throws { BusinessError } 6600105 - Invalid session command.
         * @throws { BusinessError } 6600107 - Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        getExtras(callback: AsyncCallback<{
            [key: string]: Object;
        }>): void;
        /**
         * Get custom media packets provided by the corresponding session
         * @returns { Promise<{[key: string]: Object}> } the parameters of extras
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @throws { BusinessError } 6600105 - Invalid session command.
         * @throws { BusinessError } 6600107 - Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Get custom media packets provided by the corresponding session
         * @returns { Promise<{[key: string]: Object}> } the parameters of extras
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600102 - The session does not exist.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @throws { BusinessError } 6600105 - Invalid session command.
         * @throws { BusinessError } 6600107 - Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        getExtras(): Promise<{
            [key: string]: Object;
        }>;
        /**
         * Register metadata changed callback
         * @param { 'metadataChange' } type
         * @param { Array<keyof AVMetadata> | 'all' } filter - The properties of {@link AVMetadata} that you cared about
         * @param { function } callback - The callback used to handle metadata changed event.
         * The callback function provides the {@link AVMetadata} parameter.
         * It only contains the properties set in the filter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register metadata changed callback
         * @param { 'metadataChange' } type
         * @param { Array<keyof AVMetadata> | 'all' } filter - The properties of {@link AVMetadata} that you cared about
         * @param { function } callback - The callback used to handle metadata changed event.
         * The callback function provides the {@link AVMetadata} parameter.
         * It only contains the properties set in the filter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'metadataChange', filter: Array<keyof AVMetadata> | 'all', callback: (data: AVMetadata) => void);
        /**
         * Unregister metadata changed callback
         * @param { 'metadataChange' } type
         * @param { function } callback - The callback used to handle metadata changed event.
         * The callback function provides the {@link AVMetadata} parameter.
         * It only contains the properties set in the filter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister metadata changed callback
         * @param { 'metadataChange' } type
         * @param { function } callback - The callback used to handle metadata changed event.
         * The callback function provides the {@link AVMetadata} parameter.
         * It only contains the properties set in the filter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'metadataChange', callback?: (data: AVMetadata) => void);
        /**
         * Register playback state changed callback
         * @param { 'playbackStateChange' } type
         * @param { Array<keyof AVPlaybackState> | 'all' } filter - The properties of {@link AVPlaybackState} that you cared about
         * @param { function } callback - The callback used to handle playback state changed event.
         * The callback function provides the {@link AVPlaybackState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register playback state changed callback
         * @param { 'playbackStateChange' } type
         * @param { Array<keyof AVPlaybackState> | 'all' } filter - The properties of {@link AVPlaybackState} that you cared about
         * @param { function } callback - The callback used to handle playback state changed event.
         * The callback function provides the {@link AVPlaybackState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'playbackStateChange', filter: Array<keyof AVPlaybackState> | 'all', callback: (state: AVPlaybackState) => void);
        /**
         * Unregister playback state changed callback
         * @param { 'playbackStateChange' } type
         * @param { function } callback - The callback used to handle playback state changed event.
         * The callback function provides the {@link AVPlaybackState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister playback state changed callback
         * @param { 'playbackStateChange' } type
         * @param { function } callback - The callback used to handle playback state changed event.
         * The callback function provides the {@link AVPlaybackState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'playbackStateChange', callback?: (state: AVPlaybackState) => void);
        /**
         * Register call metadata changed callback
         * @param { 'callMetadataChange' } type - 'callMetadataChange'
         * @param { Array<keyof CallMetadata> | 'all' } filter - The properties of {@link CallMetadata} that you cared about
         * @param { Callback<CallMetadata> } callback - The callback used to handle call metadata changed event.
         * The callback function provides the {@link CallMetadata} parameter.
         * It only contains the properties set in the filter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Register call metadata changed callback
         * @param { 'callMetadataChange' } type - 'callMetadataChange'
         * @param { Array<keyof CallMetadata> | 'all' } filter - The properties of {@link CallMetadata} that you cared about
         * @param { Callback<CallMetadata> } callback - The callback used to handle call metadata changed event.
         * The callback function provides the {@link CallMetadata} parameter.
         * It only contains the properties set in the filter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'callMetadataChange', filter: Array<keyof CallMetadata> | 'all', callback: Callback<CallMetadata>): void;
        /**
         * Unregister call metadata changed callback
         * @param { 'callMetadataChange' } type - 'callMetadataChange'
         * @param { Callback<CallMetadata> } callback - The callback used to handle call metadata changed event.
         * The callback function provides the {@link CallMetadata} parameter.
         * It only contains the properties set in the filter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Unregister call metadata changed callback
         * @param { 'callMetadataChange' } type - 'callMetadataChange'
         * @param { Callback<CallMetadata> } callback - The callback used to handle call metadata changed event.
         * The callback function provides the {@link CallMetadata} parameter.
         * It only contains the properties set in the filter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'callMetadataChange', callback?: Callback<CallMetadata>): void;
        /**
         * Register call state changed callback
         * @param { 'callStateChange' } type - 'callStateChange'
         * @param { Array<keyof AVCallState> | 'all' } filter - The properties of {@link AVCallState} that you cared about
         * @param { Callback<AVCallState> } callback - The callback used to handle call state changed event.
         * The callback function provides the {@link AVCallState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Register call state changed callback
         * @param { 'callStateChange' } type - 'callStateChange'
         * @param { Array<keyof AVCallState> | 'all' } filter - The properties of {@link AVCallState} that you cared about
         * @param { Callback<AVCallState> } callback - The callback used to handle call state changed event.
         * The callback function provides the {@link AVCallState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'callStateChange', filter: Array<keyof AVCallState> | 'all', callback: Callback<AVCallState>): void;
        /**
         * Unregister playback state changed callback
         * @param { 'callStateChange' } type - 'callStateChange'
         * @param { Callback<AVCallState> } callback - The callback used to handle call state changed event.
         * The callback function provides the {@link AVCallState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 11
         */
        /**
         * Unregister playback state changed callback
         * @param { 'callStateChange' } type - 'callStateChange'
         * @param { Callback<AVCallState> } callback - The callback used to handle call state changed event.
         * The callback function provides the {@link AVCallState} parameter.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'callStateChange', callback?: Callback<AVCallState>): void;
        /**
         * Register current session destroyed callback
         * @param { 'sessionDestroy' } type
         * @param { function } callback - The callback used to handle current session destroyed event.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register current session destroyed callback
         * @param { 'sessionDestroy' } type
         * @param { function } callback - The callback used to handle current session destroyed event.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'sessionDestroy', callback: () => void);
        /**
         * Unregister current session destroyed callback
         * @param { 'sessionDestroy' } type - 'sessionDestroy'
         * @param { function } callback - The callback used to handle current session destroyed event.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister current session destroyed callback
         * @param { 'sessionDestroy' } type - 'sessionDestroy'
         * @param { function } callback - The callback used to handle current session destroyed event.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'sessionDestroy', callback?: () => void);
        /**
         * Register the active state of this session changed callback
         * @param { 'activeStateChange' } type - 'activeStateChange'
         * @param { function } callback - The callback used to handle the active state of this session changed event.
         * The callback function provides the changed session state.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register the active state of this session changed callback
         * @param { 'activeStateChange' } type - 'activeStateChange'
         * @param { function } callback - The callback used to handle the active state of this session changed event.
         * The callback function provides the changed session state.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'activeStateChange', callback: (isActive: boolean) => void);
        /**
         * Unregister the active state of this session changed callback
         * @param { 'activeStateChange' } type - 'activeStateChange'
         * @param { function } callback - The callback used to handle the active state of this session changed event.
         * The callback function provides the changed session state.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister the active state of this session changed callback
         * @param { 'activeStateChange' } type - 'activeStateChange'
         * @param { function } callback - The callback used to handle the active state of this session changed event.
         * The callback function provides the changed session state.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'activeStateChange', callback?: (isActive: boolean) => void);
        /**
         * Register the valid commands of the session changed callback
         * @param { 'validCommandChange' } type - 'validCommandChange'
         * @param { function } callback - The callback used to handle the changes.
         * The callback function provides an array of AVControlCommandType.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register the valid commands of the session changed callback
         * @param { 'validCommandChange' } type - 'validCommandChange'
         * @param { function } callback - The callback used to handle the changes.
         * The callback function provides an array of AVControlCommandType.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'validCommandChange', callback: (commands: Array<AVControlCommandType>) => void);
        /**
         * Unregister the valid commands of the session changed callback
         * @param { 'validCommandChange' } type - 'validCommandChange'
         * @param { function } callback - The callback used to handle the changes.
         * The callback function provides an array of AVControlCommandType.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister the valid commands of the session changed callback
         * @param { 'validCommandChange' } type - 'validCommandChange'
         * @param { function } callback - The callback used to handle the changes.
         * The callback function provides an array of AVControlCommandType.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'validCommandChange', callback?: (commands: Array<AVControlCommandType>) => void);
        /**
         * Register session output device change callback
         * @param { 'outputDeviceChange' } type - Registration Type 'outputDeviceChange'
         * @param { function } callback - Used to handle output device changed.
         * The callback provide the new device info {@link OutputDeviceInfo} and related connection state {@link ConnectionState}.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600103 - The session controller does not exist
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register session output device change callback
         * @param { 'outputDeviceChange' } type - Registration Type 'outputDeviceChange'
         * @param { function } callback - Used to handle output device changed.
         * The callback provide the new device info {@link OutputDeviceInfo} and related connection state {@link ConnectionState}.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600103 - The session controller does not exist
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'outputDeviceChange', callback: (state: ConnectionState, device: OutputDeviceInfo) => void): void;
        /**
         * Unregister session output device change callback
         * @param { 'outputDeviceChange' } type - Registration Type 'outputDeviceChange'
         * @param { function } callback - Used to handle output device changed.
         * The callback provide the new device info {@link OutputDeviceInfo} and related connection state {@link ConnectionState}.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600103 - The session controller does not exist
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister session output device change callback
         * @param { 'outputDeviceChange' } type - Registration Type 'outputDeviceChange'
         * @param { function } callback - Used to handle output device changed.
         * The callback provide the new device info {@link OutputDeviceInfo} and related connection state {@link ConnectionState}.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception
         * @throws { BusinessError } 6600103 - The session controller does not exist
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'outputDeviceChange', callback?: (state: ConnectionState, device: OutputDeviceInfo) => void): void;
        /**
         * Register session event callback
         * @param { 'sessionEvent' } type - 'sessionEvent'
         * @param { function } callback - The callback used to handle session event changed event.
         * The callback function provides the event string and key-value pair parameters.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register session event callback
         * @param { 'sessionEvent' } type - 'sessionEvent'
         * @param { function } callback - The callback used to handle session event changed event.
         * The callback function provides the event string and key-value pair parameters.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'sessionEvent', callback: (sessionEvent: string, args: {
            [key: string]: Object;
        }) => void): void;
        /**
         * Unregister session event callback
         * @param { 'sessionEvent' } type - 'sessionEvent'
         * @param { function } callback - Used to cancel a specific listener
         * The callback function provides the event string and key-value pair parameters.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister session event callback
         * @param { 'sessionEvent' } type - 'sessionEvent'
         * @param { function } callback - Used to cancel a specific listener
         * The callback function provides the event string and key-value pair parameters.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'sessionEvent', callback?: (sessionEvent: string, args: {
            [key: string]: Object;
        }) => void): void;
        /**
         * Register session playlist change callback
         * @param { 'queueItemsChange' } type - Registration Type 'queueItemsChange'
         * @param { function } callback - Used to handle playlist changed.
         * The callback provides the new array of AVQueueItem {@link AVQueueItem}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register session playlist change callback
         * @param { 'queueItemsChange' } type - Registration Type 'queueItemsChange'
         * @param { function } callback - Used to handle playlist changed.
         * The callback provides the new array of AVQueueItem {@link AVQueueItem}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'queueItemsChange', callback: (items: Array<AVQueueItem>) => void): void;
        /**
         * Unregister session playlist change callback
         * @param { 'queueItemsChange' } type - Registration Type 'queueItemsChange'
         * @param { function } callback - Used to handle playlist changed.
         * The callback provides the new array of AVQueueItem {@link AVQueueItem}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister session playlist change callback
         * @param { 'queueItemsChange' } type - Registration Type 'queueItemsChange'
         * @param { function } callback - Used to handle playlist changed.
         * The callback provides the new array of AVQueueItem {@link AVQueueItem}
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'queueItemsChange', callback?: (items: Array<AVQueueItem>) => void): void;
        /**
         * Register the name of session playlist change callback
         * @param { 'queueTitleChange' } type - Registration Type 'queueTitleChange'
         * @param { function } callback - Used to handle name of playlist changed.
         * The callback provides the new name.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register the name of session playlist change callback
         * @param { 'queueTitleChange' } type - Registration Type 'queueTitleChange'
         * @param { function } callback - Used to handle name of playlist changed.
         * The callback provides the new name.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'queueTitleChange', callback: (title: string) => void): void;
        /**
         * Unregister the name of session playlist change callback
         * @param { 'queueTitleChange' } type - Registration Type 'queueTitleChange'
         * @param { function } callback - Used to handle name of playlist changed.
         * The callback provides the new name.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister the name of session playlist change callback
         * @param { 'queueTitleChange' } type - Registration Type 'queueTitleChange'
         * @param { function } callback - Used to handle name of playlist changed.
         * The callback provides the new name.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'queueTitleChange', callback?: (title: string) => void): void;
        /**
         * Register the custom media packets change callback
         * @param { 'extrasChange' } type - Registration Type 'extrasChange'
         * @param { function } callback - Used to handle custom media packets changed.
         * The callback provides the new media packets.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Register the custom media packets change callback
         * @param { 'extrasChange' } type - Registration Type 'extrasChange'
         * @param { function } callback - Used to handle custom media packets changed.
         * The callback provides the new media packets.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'extrasChange', callback: (extras: {
            [key: string]: Object;
        }) => void): void;
        /**
         * Unregister the custom media packets change callback
         * @param { 'extrasChange' } type - Registration Type 'extrasChange'
         * @param { function } callback - Used to handle custom media packets changed.
         * The callback provides the new media packets.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Unregister the custom media packets change callback
         * @param { 'extrasChange' } type - Registration Type 'extrasChange'
         * @param { function } callback - Used to handle custom media packets changed.
         * The callback provides the new media packets.
         * @throws { BusinessError } 401 - parameter check failed. 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 6600101 - Session service exception.
         * @throws { BusinessError } 6600103 - The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'extrasChange', callback?: (extras: {
            [key: string]: Object;
        }) => void): void;
    }
    /**
     * The type of control command
     * @typedef { 'play' | 'pause' | 'stop' | 'playNext' | 'playPrevious' | 'fastForward' | 'rewind' | 'seek' |
     *     'setSpeed' | 'setLoopMode' | 'toggleFavorite' } AVControlCommandType
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * The type of control command, add new support 'playFromAssetId' | 'answer' | 'hangUp' | 'toggleCallMute'
     * @typedef { 'play' | 'pause' | 'stop' | 'playNext' | 'playPrevious' | 'fastForward' | 'rewind' | 'seek' |
     *     'setSpeed' | 'setLoopMode' | 'toggleFavorite' | 'playFromAssetId' | 'answer' | 'hangUp' |
     *     'toggleCallMute' } AVControlCommandType
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 11
     */
    /**
     * The type of control command, add new support 'playFromAssetId' | 'answer' | 'hangUp' | 'toggleCallMute'
     * @typedef { 'play' | 'pause' | 'stop' | 'playNext' | 'playPrevious' | 'fastForward' | 'rewind' | 'seek' |
     *     'setSpeed' | 'setLoopMode' | 'toggleFavorite' | 'playFromAssetId' | 'answer' | 'hangUp' |
     *     'toggleCallMute' } AVControlCommandType
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    type AVControlCommandType = 'play' | 'pause' | 'stop' | 'playNext' | 'playPrevious' | 'fastForward' | 'rewind' | 'seek' | 'setSpeed' | 'setLoopMode' | 'toggleFavorite' | 'playFromAssetId' | 'answer' | 'hangUp' | 'toggleCallMute';
    /**
     * The definition of command to be sent to the session
     * @interface AVControlCommand
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * The definition of command to be sent to the session
     * @typedef AVControlCommand
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    interface AVControlCommand {
        /**
         * The command value {@link AVControlCommandType}
         * @type { AVControlCommandType }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The command value {@link AVControlCommandType}
         * @type { AVControlCommandType }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        command: AVControlCommandType;
        /**
         * parameter of the command. Whether this command requires parameters, see {@link AVSessionCommand}
         * seek command requires a number parameter
         * setSpeed command requires a number parameter
         * setLoopMode command requires a {@link LoopMode} parameter.
         * toggleFavorite command requires assetId {@link AVMetadata.assetId} parameter
         * other commands need no parameter
         * @type { ?(LoopMode | string | number) }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * parameter of the command. Whether this command requires parameters, see {@link AVSessionCommand}
         * seek command requires a number parameter
         * setSpeed command requires a number parameter
         * setLoopMode command requires a {@link LoopMode} parameter.
         * toggleFavorite command requires assetId {@link AVMetadata.assetId} parameter
         * other commands need no parameter
         * @type { ?(LoopMode | string | number) }
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        parameter?: LoopMode | string | number;
    }
    /**
     * Enumerates ErrorCode types, returns in BusinessError.code.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @since 10
     */
    /**
     * Enumerates ErrorCode types, returns in BusinessError.code.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.AVSession.Core
     * @atomicservice
     * @since 12
     */
    enum AVSessionErrorCode {
        /**
         * Session service exception.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Session service exception.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        ERR_CODE_SERVICE_EXCEPTION = 6600101,
        /**
         * The session does not exist
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The session does not exist
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        ERR_CODE_SESSION_NOT_EXIST = 6600102,
        /**
         * The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The session controller does not exist.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        ERR_CODE_CONTROLLER_NOT_EXIST = 6600103,
        /**
         * The remote session connection failed.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The remote session connection failed.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        ERR_CODE_REMOTE_CONNECTION_ERR = 6600104,
        /**
         * Invalid session command.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Invalid session command.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        ERR_CODE_COMMAND_INVALID = 6600105,
        /**
         * The session is not activated.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The session is not activated.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        ERR_CODE_SESSION_INACTIVE = 6600106,
        /**
         * Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Too many commands or events.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        ERR_CODE_MESSAGE_OVERLOAD = 6600107,
        /**
         * Device connecting failed.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * Device connecting failed.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        ERR_CODE_DEVICE_CONNECTION_FAILED = 6600108,
        /**
         * The remote connection is not established.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @since 10
         */
        /**
         * The remote connection is not established.
         * @syscap SystemCapability.Multimedia.AVSession.Core
         * @atomicservice
         * @since 12
         */
        ERR_CODE_REMOTE_CONNECTION_NOT_EXIST = 6600109
    }
}
export default avSession;
