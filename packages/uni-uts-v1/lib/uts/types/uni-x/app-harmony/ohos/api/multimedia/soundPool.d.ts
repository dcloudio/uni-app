/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * @kit MediaKit
 */
import type { ErrorCallback, AsyncCallback, Callback } from '../@ohos.base';
import type audio from '../@ohos.multimedia.audio';
/**
 * Interface for play parameters.
 * @typedef PlayParameters
 * @syscap SystemCapability.Multimedia.Media.SoundPool
 * @since 10
 */
export interface PlayParameters {
    /**
     * loop mode (0 = no loop, -1 = loop forever)
     *
     * @type { ?number }
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    loop?: number;
    /**
     * playback rate
     *
     * @type { ?number }
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    rate?: number;
    /**
     * left volume value(range = 0.0 to 1.0),current leftVolume = rightVolume
     *
     * @type { ?number }
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    leftVolume?: number;
    /**
     * right volume value(range = 0.0 to 1.0),current leftVolume = rightVolume
     *
     * @type { ?number }
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    rightVolume?: number;
    /**
     * stream priority (0 = lowest priority)
     *
     * @type { ?number }
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    priority?: number;
}
/**
 * Interface for soundPool instance. Manages and plays sound. Before calling an SoundPool method, you must use createSoundPool()
 * to create an SoundPool instance.
 * @typedef SoundPool
 * @syscap SystemCapability.Multimedia.Media.SoundPool
 * @since 10
 */
export interface SoundPool {
    /**
     * Load the sound from the specified path.
     *
     * @param {string} uri The path to the audio file
     * @param {AsyncCallback<number>} callback Callback a sound ID. This value can be used to play or unload the sound.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
     * @throws { BusinessError } 5400103 - I/O error. Return by callback.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    load(uri: string, callback: AsyncCallback<number>): void;
    /**
     * Load the sound from the specified path.
     *
     * @param {string} uri The path to the audio file
     * @returns {Promise<number>} Promise a sound ID. This value can be used to play or unload the sound.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
     * @throws { BusinessError } 5400103 - I/O error. Return by promise.
     * @throws { BusinessError } 5400105 - Service died. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    load(uri: string): Promise<number>;
    /**
     * Load the sound from a FileDescriptor.
     *
     * @param {number} fd A FileDescriptor object
     * @param {number} offset Offset to the start of the sound
     * @param {number} length Length of the sound
     * @param {AsyncCallback<number>} callback Callback a sound ID. This value can be used to play or unload the sound.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
     * @throws { BusinessError } 5400103 - I/O error. Return by callback.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    load(fd: number, offset: number, length: number, callback: AsyncCallback<number>): void;
    /**
     * Load the sound from a FileDescriptor.
     *
     * @param {number} fd A FileDescriptor object
     * @param {number} offset Offset to the start of the sound
     * @param {number} length Length of the sound
     * @returns {Promise<number>} Promise a sound ID. This value can be used to play or unload the sound.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
     * @throws { BusinessError } 5400103 - I/O error. Return by promise.
     * @throws { BusinessError } 5400105 - Service died. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    load(fd: number, offset: number, length: number): Promise<number>;
    /**
     * Play a sound from a sound ID.
     *
     * @param {number} soundID Returned by the load()
     * @param {PlayParameters} params Player parameters
     * @param {AsyncCallback<number>} callback Callback used to return a non-zero streamID if successful, zero if it fails.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by callback.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    play(soundID: number, params: PlayParameters, callback: AsyncCallback<number>): void;
    /**
     * Play a sound from a sound ID.
     *
     * @param {number} soundID Returned by the load()
     * @param {AsyncCallback<number>} callback Callback used to return a non-zero streamID if successful, zero if it fails.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by callback.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    play(soundID: number, callback: AsyncCallback<number>): void;
    /**
     * Play a sound from a sound ID.
     *
     * @param {number} soundID Returned by the load()
     * @param {PlayParameters} [params] Player parameters
     * @returns {Promise<number>} Promise used to return a non-zero streamID if successful, zero if it fails.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by promise.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
     * @throws { BusinessError } 5400105 - Service died. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    play(soundID: number, params?: PlayParameters): Promise<number>;
    /**
     * Stop a stream which is playing.
     *
     * @param {number} streamID Returned by the play()
     * @param {AsyncCallback<void>} callback Callback used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by callback.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    stop(streamID: number, callback: AsyncCallback<void>): void;
    /**
     * Stop a stream which is playing.
     *
     * @param {number} streamID Returned by the play()
     * @returns {Promise<void>} Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by promise.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
     * @throws { BusinessError } 5400105 - Service died. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    stop(streamID: number): Promise<void>;
    /**
     * Set loop mode.
     *
     * @param {number} streamID Returned by the play()
     * @param {number} loop Loop mode (0 = no loop, -1 = loop forever)
     * @param {AsyncCallback<void>} callback Callback used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by callback.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    setLoop(streamID: number, loop: number, callback: AsyncCallback<void>): void;
    /**
     * Set loop mode.
     *
     * @param {number} streamID Returned by the play()
     * @param {number} loop Loop mode (0 = no loop, -1 = loop forever)
     * @returns {Promise<void>} Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by promise.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
     * @throws { BusinessError } 5400105 - Service died. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    setLoop(streamID: number, loop: number): Promise<void>;
    /**
     * Set stream priority.
     *
     * @param {number} streamID Returned by the play()
     * @param {number} priority Stream priority (0 = lowest priority)
     * @param {AsyncCallback<void>} callback Callback used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by callback.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    setPriority(streamID: number, priority: number, callback: AsyncCallback<void>): void;
    /**
     * Set stream priority.
     *
     * @param {number} streamID Returned by the play()
     * @param {number} priority Stream priority (0 = lowest priority)
     * @returns {Promise<void>} Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by promise.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
     * @throws { BusinessError } 5400105 - Service died. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    setPriority(streamID: number, priority: number): Promise<void>;
    /**
     * Set playback rate.
     *
     * @param {number} streamID Returned by the play()
     * @param {audio.AudioRendererRate} rate Playback rate
     * @param {AsyncCallback<void>} callback Callback used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by callback.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    setRate(streamID: number, rate: audio.AudioRendererRate, callback: AsyncCallback<void>): void;
    /**
     * Set playback rate.
     *
     * @param {number} streamID Returned by the play()
     * @param {audio.AudioRendererRate} rate Playback rate
     * @returns {Promise<void>} Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by promise.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
     * @throws { BusinessError } 5400105 - Service died. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    setRate(streamID: number, rate: audio.AudioRendererRate): Promise<void>;
    /**
     * Set stream volume.
     *
     * @param {number} streamID Returned by the play()
     * @param {number} leftVolume Volume value(range = 0.0 to 1.0),current leftVolume = rightVolume
     * @param {number} rightVolume Volume value(range = 0.0 to 1.0),current leftVolume = rightVolume
     * @param {AsyncCallback<void>} callback Callback used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by callback.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    setVolume(streamID: number, leftVolume: number, rightVolume: number, callback: AsyncCallback<void>): void;
    /**
     * Set stream volume.
     *
     * @param {number} streamID Returned by the play()
     * @param {number} leftVolume Volume value(range = 0.0 to 1.0),current leftVolume = rightVolume
     * @param {number} rightVolume Volume value(range = 0.0 to 1.0),current leftVolume = rightVolume
     * @returns {Promise<void>} Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2.Incorrect parameter types. 3.Parameter verification failed. Return by promise.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
     * @throws { BusinessError } 5400105 - Service died. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    setVolume(streamID: number, leftVolume: number, rightVolume: number): Promise<void>;
    /**
     * Unload a sound from a sound ID.
     *
     * @param {number} soundID Returned by the load()
     * @param {AsyncCallback<void>} callback Callback used to return the result.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by callback.
     * @throws { BusinessError } 5400103 - I/O error. Return by callback.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    unload(soundID: number, callback: AsyncCallback<void>): void;
    /**
     * Unload a sound from a sound ID.
     *
     * @param {number} soundID Returned by the load()
     * @returns {Promise<void>} Promise used to return the result.
     * @throws { BusinessError } 5400102 - Operation not allowed. Return by promise.
     * @throws { BusinessError } 5400103 - I/O error. Return by promise.
     * @throws { BusinessError } 5400105 - Service died. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    unload(soundID: number): Promise<void>;
    /**
     * Releases the soundPool. This method uses an asynchronous callback to return the result.
     *
     * @param {AsyncCallback<void>} callback Callback used to return the result.
     * @throws { BusinessError } 5400105 - Service died. Return by callback.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    release(callback: AsyncCallback<void>): void;
    /**
     * Releases the soundPool. This method uses a promise to return the result.
     *
     * @returns {Promise<void>} Promise used to return the result.
     * @throws { BusinessError } 5400105 - Service died. Return by promise.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    release(): Promise<void>;
    /**
     * Register listens for load result event.
     *
     * @param {'loadComplete'} type Type of the play finish event to listen for.
     * @param {Callback<number>} callback Callback used to listen for load result event
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    on(type: 'loadComplete', callback: Callback<number>): void;
    /**
     * Cancel Listens for load result event.
     *
     * @param {'loadComplete'} type Type of the play finish event to listen for.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    off(type: 'loadComplete'): void;
    /**
     * Register listens for play finish event.
     *
     * @param {'playFinished'} type Type of the play finish event to listen for.
     * @param {Callback<void>} callback Callback used to listen for the play finish
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    on(type: 'playFinished', callback: Callback<void>): void;
    /**
     * Cancel Listens for play finish event.
     *
     * @param {'playFinished'} type of the play finish event to listen for.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    off(type: 'playFinished'): void;
    /**
     * Register listens for sound play error events.
     *
     * @param {'error'} type Type of the sound play error event to listen for.
     * @param {ErrorCallback} callback Callback used to listen for sound play error events.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    on(type: 'error', callback: ErrorCallback): void;
    /**
     * Cancel Listens for sound play error events.
     *
     * @param {'error'} type Type of the sound play error event to listen for.
     * @syscap SystemCapability.Multimedia.Media.SoundPool
     * @since 10
     */
    off(type: 'error'): void;
}
