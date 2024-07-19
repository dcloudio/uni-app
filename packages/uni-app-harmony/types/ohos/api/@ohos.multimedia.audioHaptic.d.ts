/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit AudioKit
 */
import type { Callback } from './@ohos.base';
import type audio from './@ohos.multimedia.audio';
/**
 * Provides audio haptic collaborative play interfaces.
 *
 * @namespace audioHaptic
 * @syscap SystemCapability.Multimedia.AudioHaptic.Core
 * @since 11
 */
declare namespace audioHaptic {
    /**
     * Obtains an {@link AudioHapticManager} instance. This object is singleton in one process.
     * @returns { AudioHapticManager } AudioHapticManager instance.
     * @syscap SystemCapability.Multimedia.AudioHaptic.Core
     * @since 11
     */
    function getAudioHapticManager(): AudioHapticManager;
    /**
     * Audio Latency mode.
     * @enum {number}
     * @syscap SystemCapability.Multimedia.AudioHaptic.Core
     * @since 11
     */
    enum AudioLatencyMode {
        /**
         * Normal audio mode.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        AUDIO_LATENCY_MODE_NORMAL = 0,
        /**
         * Low latency mode. This mode should be used when duration of the audio source is short. If duration of the audio
         * source is long, it may be truncated. This behavior is the same with sound pool.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        AUDIO_LATENCY_MODE_FAST = 1
    }
    /**
     * Audio haptic player options object.
     * @typedef AudioHapticPlayerOptions
     * @syscap SystemCapability.Multimedia.AudioHaptic.Core
     * @since 11
     */
    interface AudioHapticPlayerOptions {
        /**
         * Mute audio.
         * @type {?boolean}
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        muteAudio?: boolean;
        /**
         * Mute haptics.
         * @type {?boolean}
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        muteHaptics?: boolean;
    }
    /**
     * Audio haptic manager object.
     * @typedef AudioHapticManager
     * @syscap SystemCapability.Multimedia.AudioHaptic.Core
     * @since 11
     */
    interface AudioHapticManager {
        /**
         * Register audio and haptic file into manager. Audio and haptic works are paired while playing. After registering
         * source, it will returns the source id. This method uses a promise to return the source id.
         * @param { string } audioUri - Audio file uri.
         * @param { string } hapticUri - Haptic file uri.
         * @returns { Promise<number> } Promise used to return the source id.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        registerSource(audioUri: string, hapticUri: string): Promise<number>;
        /**
         * Unregister source. This method uses a promise to return the result.
         * @param { number } id source id.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        unregisterSource(id: number): Promise<void>;
        /**
         * Set the audio latency mode of one source.
         * @param { number } id - Source id.
         * @param { AudioLatencyMode } latencyMode - Audio latency mode.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        setAudioLatencyMode(id: number, latencyMode: AudioLatencyMode): void;
        /**
         * Set the stream usage of one source.
         * @param { number } id - Source id.
         * @param { audio.StreamUsage } usage - Stream usage.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types;
         *                                 3.Parameter verification failed.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        setStreamUsage(id: number, usage: audio.StreamUsage): void;
        /**
         * Create an audio haptic player. This method uses a promise to return the result. If haptics is needed, caller
         * should have the permission of ohos.permission.VIBRATE.
         * @permission ohos.permission.VIBRATE
         * @param { number } id - Source id.
         * @param { AudioHapticPlayerOptions } options - Options when creating audio haptic player.
         * @returns { Promise<AudioHapticPlayer> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 5400102 - Operation not allowed.
         * @throws { BusinessError } 5400103 - I/O error.
         * @throws { BusinessError } 5400106 - Unsupport format.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        createPlayer(id: number, options?: AudioHapticPlayerOptions): Promise<AudioHapticPlayer>;
    }
    /**
     * Type of audio haptic.
     * @enum {number}
     * @syscap SystemCapability.Multimedia.AudioHaptic.Core
     * @since 11
     */
    enum AudioHapticType {
        /**
         * Audio.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        AUDIO_HAPTIC_TYPE_AUDIO = 0,
        /**
         * Haptic.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        AUDIO_HAPTIC_TYPE_HAPTIC = 1
    }
    /**
     * Audio haptic player object.
     * @typedef AudioHapticPlayer
     * @syscap SystemCapability.Multimedia.AudioHaptic.Core
     * @since 11
     */
    interface AudioHapticPlayer {
        /**
         * Is muted for one AudioHapticType
         * @param { AudioHapticType } type - Indicates the type to query.
         * @returns { boolean } - Is muted.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Parameter verification failed.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        isMuted(type: AudioHapticType): boolean;
        /**
         * Start this player. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 5400102 - Operate not permit.
         * @throws { BusinessError } 5400103 - IO error.
         * @throws { BusinessError } 5400105 - Service died.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        start(): Promise<void>;
        /**
         * Stop this player. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 5400102 - Operate not permit.
         * @throws { BusinessError } 5400105 - Service died.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        stop(): Promise<void>;
        /**
         * Release this player. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 5400105 - Service died.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        release(): Promise<void>;
        /**
         * Subscribes end of stream event.
         * @param { 'endOfStream' } type - Type of the playback event to listen for.
         * @param { Callback<void> } callback - Callback used to listen for the playback end of stream.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        on(type: 'endOfStream', callback: Callback<void>): void;
        /**
         * Unsubscribes end of stream event.
         * @param { 'endOfStream' } type - Type of the playback event to listen for.
         * @param { Callback<void> } callback - Callback used to listen for the playback end of stream.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        off(type: 'endOfStream', callback?: Callback<void>): void;
        /**
         * Subscribes audio interrupt event.
         * @param { 'audioInterrupt' } type - Type of the playback event to listen for.
         * @param { Callback<audio.InterruptEvent> } callback - Callback used to listen for audio interrupt info.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        on(type: 'audioInterrupt', callback: Callback<audio.InterruptEvent>): void;
        /**
         * Unsubscribes audio interrupt event.
         * @param { 'audioInterrupt' } type - Type of the playback event to listen for.
         * @param { Callback<audio.InterruptEvent> } callback - Callback used to listen for audio interrupt info.
         * @syscap SystemCapability.Multimedia.AudioHaptic.Core
         * @since 11
         */
        off(type: 'audioInterrupt', callback?: Callback<audio.InterruptEvent>): void;
    }
}
export default audioHaptic;
