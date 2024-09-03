/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
import { AsyncCallback, Callback } from './@ohos.base';
/**
 * @namespace audio
 * @since 7
 */
/**
 * @namespace audio
 * @syscap SystemCapability.Multimedia.Audio
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace audio {
    /**
     * Enumerates audio errors.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 9
     */
    enum AudioErrors {
        /**
         * Invalid parameter.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        ERROR_INVALID_PARAM = 6800101,
        /**
         * Allocate memory failed.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        ERROR_NO_MEMORY = 6800102,
        /**
         * Operation not permit at current state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        ERROR_ILLEGAL_STATE = 6800103,
        /**
         * Unsupported option.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        ERROR_UNSUPPORTED = 6800104,
        /**
         * Time out.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        ERROR_TIMEOUT = 6800105,
        /**
         * Audio specific errors.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        ERROR_STREAM_LIMIT = 6800201,
        /**
         * Default error.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        ERROR_SYSTEM = 6800301
    }
    /**
     * Define default volume group id for audio
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @since 9
     */
    /**
     * Define default volume group id for audio
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @crossplatform
     * @since 12
     */
    const DEFAULT_VOLUME_GROUP_ID: number;
    /**
     * Define default interrupt group id for audio
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     * @since 9
     */
    const DEFAULT_INTERRUPT_GROUP_ID: number;
    /**
     * Obtains an {@link AudioManager} instance.
     * @returns { AudioManager } this {@link AudioManager} object.
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 7
     */
    /**
     * Obtains an {@link AudioManager} instance.
     * @returns { AudioManager } this {@link AudioManager} object.
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    function getAudioManager(): AudioManager;
    /**
     * Obtains an {@link AudioCapturer} instance.
     * Success: This method uses an asynchronous callback to return the capturer instance.
     * Failure: This method uses an asynchronous callback to return the error instance. Possible causes:
     *          6800301: Parameter verification failed, Permission denied, System error;
     *          6800101: Mandatory parameters are left unspecified, Incorrect parameter types.
     * @param { AudioCapturerOptions } options - Capturer configurations.
     * @param { AsyncCallback<AudioCapturer> } callback - Callback used to return the audio capturer instance.
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @since 8
     */
    /**
     * Obtains an {@link AudioCapturer} instance. This method uses an asynchronous callback to return the capturer instance.
     * @param { AudioCapturerOptions } options - Capturer configurations.
     * @param { AsyncCallback<AudioCapturer> } callback - Callback used to return the audio capturer instance.
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @crossplatform
     * @since 12
     */
    function createAudioCapturer(options: AudioCapturerOptions, callback: AsyncCallback<AudioCapturer>): void;
    /**
     * Obtains an {@link AudioCapturer} instance.
     * Success: This method uses a promise to return the capturer instance.
     * Failure: This method uses a promise to return the error instance. Possible causes:
     *          6800301: Parameter verification failed, Permission denied, System error;
     *          6800101: Mandatory parameters are left unspecified, Incorrect parameter types.
     * @param { AudioCapturerOptions } options - Capturer configurations.
     * @returns { Promise<AudioCapturer> } Promise used to return the audio capturer instance.
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @since 8
     */
    /**
     * Obtains an {@link AudioCapturer} instance. This method uses a promise to return the capturer instance.
     * @param { AudioCapturerOptions } options - Capturer configurations.
     * @returns { Promise<AudioCapturer> } Promise used to return the audio capturer instance.
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @crossplatform
     * @since 12
     */
    function createAudioCapturer(options: AudioCapturerOptions): Promise<AudioCapturer>;
    /**
     * Obtains an {@link AudioRenderer} instance. This method uses an asynchronous callback to return the renderer instance.
     * @param { AudioRendererOptions } options - Renderer configurations.
     * @param { AsyncCallback<AudioRenderer> } callback - Callback used to return the audio renderer instance.
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 8
     */
    /**
     * Obtains an {@link AudioRenderer} instance. This method uses an asynchronous callback to return the renderer instance.
     * @param { AudioRendererOptions } options - Renderer configurations.
     * @param { AsyncCallback<AudioRenderer> } callback - Callback used to return the audio renderer instance.
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @crossplatform
     * @since 12
     */
    function createAudioRenderer(options: AudioRendererOptions, callback: AsyncCallback<AudioRenderer>): void;
    /**
     * Obtains an {@link AudioRenderer} instance. This method uses a promise to return the renderer instance.
     * @param { AudioRendererOptions } options - Renderer configurations.
     * @returns { Promise<AudioRenderer> } Promise used to return the audio renderer instance.
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 8
     */
    /**
     * Obtains an {@link AudioRenderer} instance. This method uses a promise to return the renderer instance.
     * @param { AudioRendererOptions } options - Renderer configurations.
     * @returns { Promise<AudioRenderer> } Promise used to return the audio renderer instance.
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @crossplatform
     * @since 12
     */
    function createAudioRenderer(options: AudioRendererOptions): Promise<AudioRenderer>;
    /**
     * Enumerates the audio states.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 8
     */
    /**
     * Enumerates the audio states.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    enum AudioState {
        /**
         * Invalid state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Invalid state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        STATE_INVALID = -1,
        /**
         * Create new instance state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Create new instance state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        STATE_NEW = 0,
        /**
         * Prepared state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Prepared state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        STATE_PREPARED = 1,
        /**
         * Running state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Running state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        STATE_RUNNING = 2,
        /**
         * Stopped state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Stopped state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        STATE_STOPPED = 3,
        /**
         * Released state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Released state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        STATE_RELEASED = 4,
        /**
         * Paused state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Paused state.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        STATE_PAUSED = 5
    }
    /**
     * Enumerates audio stream types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @since 7
     */
    /**
     * Enumerates audio stream types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @crossplatform
     * @since 12
     */
    enum AudioVolumeType {
        /**
         * Audio streams for voice calls.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 8
         */
        /**
         * Audio streams for voice calls.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        VOICE_CALL = 0,
        /**
         * Audio streams for ringtones.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         */
        /**
         * Audio streams for ringtones.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        RINGTONE = 2,
        /**
         * Audio streams for media purpose.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         */
        /**
         * Audio streams for media purpose.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        MEDIA = 3,
        /**
         * Audio volume for alarm purpose.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Audio volume for alarm purpose.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        ALARM = 4,
        /**
         * Audio volume for accessibility purpose.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Audio volume for accessibility purpose.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        ACCESSIBILITY = 5,
        /**
         * Audio stream for voice assistant.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 8
         */
        VOICE_ASSISTANT = 9
    }
    /**
     * Enumerates audio device flags.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 7
     */
    /**
     * Enumerates audio device flags.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @crossplatform
     * @since 12
     */
    enum DeviceFlag {
        /**
         * Output devices.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Output devices.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        OUTPUT_DEVICES_FLAG = 1,
        /**
         * Input devices.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Input devices.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        INPUT_DEVICES_FLAG = 2,
        /**
         * All devices.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * All devices.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        ALL_DEVICES_FLAG = 3
    }
    /**
     * Enumerates device roles.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 7
     */
    /**
     * Enumerates device roles.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum DeviceRole {
        /**
         * Input role.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Input role.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        INPUT_DEVICE = 1,
        /**
         * Output role.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Output role.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        OUTPUT_DEVICE = 2
    }
    /**
     * Enumerates device types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 7
     */
    /**
     * Enumerates device types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum DeviceType {
        /**
         * Invalid device.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Invalid device.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        INVALID = 0,
        /**
         * Built-in earpiece.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Built-in earpiece.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        EARPIECE = 1,
        /**
         * Built-in speaker.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Built-in speaker.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SPEAKER = 2,
        /**
         * Wired headset, which is a combination of a pair of earpieces and a microphone.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Wired headset, which is a combination of a pair of earpieces and a microphone.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        WIRED_HEADSET = 3,
        /**
         * A pair of wired headphones.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * A pair of wired headphones.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        WIRED_HEADPHONES = 4,
        /**
         * Bluetooth device using the synchronous connection oriented link (SCO).
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Bluetooth device using the synchronous connection oriented link (SCO).
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        BLUETOOTH_SCO = 7,
        /**
         * Bluetooth device using advanced audio distribution profile (A2DP).
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Bluetooth device using advanced audio distribution profile (A2DP).
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        BLUETOOTH_A2DP = 8,
        /**
         * Built-in microphone.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Built-in microphone.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        MIC = 15,
        /**
         * USB audio headset.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * USB audio headset.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        USB_HEADSET = 22,
        /**
         * Display port device.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @atomicservice
         * @since 12
         */
        DISPLAY_PORT = 23,
        /**
         * Device type for rerouting audio to other remote devices by system application
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @atomicservice
         * @since 12
         */
        REMOTE_CAST = 24,
        /**
         * Default device type.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Default device type.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @atomicservice
         * @since 12
         */
        DEFAULT = 1000
    }
    /**
     * Enumerates the active device types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.CommunicationDeviceType
     */
    enum ActiveDeviceType {
        /**
         * Speaker.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.CommunicationDeviceType.SPEAKER
         */
        SPEAKER = 2,
        /**
         * Bluetooth device using the SCO link.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         */
        BLUETOOTH_SCO = 7
    }
    /**
     * Enumerates the available device types for communication.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @since 9
     */
    /**
     * Enumerates the available device types for communication.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @crossplatform
     * @since 12
     */
    enum CommunicationDeviceType {
        /**
         * Speaker.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 9
         */
        /**
         * Speaker.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        SPEAKER = 2
    }
    /**
     * Enumerates ringer modes.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @since 7
     */
    /**
     * Enumerates ringer modes.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @crossplatform
     * @since 12
     */
    enum AudioRingMode {
        /**
         * Silent mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 7
         */
        /**
         * Silent mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        RINGER_MODE_SILENT = 0,
        /**
         * Vibration mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 7
         */
        /**
         * Vibration mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        RINGER_MODE_VIBRATE = 1,
        /**
         * Normal mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 7
         */
        /**
         * Normal mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        RINGER_MODE_NORMAL = 2
    }
    /**
     * Enumerates the audio sample formats.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 8
     */
    /**
     * Enumerates the audio sample formats.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    enum AudioSampleFormat {
        /**
         * Invalid format.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Invalid format.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_FORMAT_INVALID = -1,
        /**
         * Unsigned 8 format.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Unsigned 8 format.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_FORMAT_U8 = 0,
        /**
         * Signed 16 bit integer, little endian.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Signed 16 bit integer, little endian.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_FORMAT_S16LE = 1,
        /**
         * Signed 24 bit integer, little endian.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Signed 24 bit integer, little endian.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_FORMAT_S24LE = 2,
        /**
         * Signed 32 bit integer, little endian.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Signed 32 bit integer, little endian.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_FORMAT_S32LE = 3,
        /**
         * Signed 32 bit float, little endian.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        /**
         * Signed 32 bit float, little endian.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_FORMAT_F32LE = 4
    }
    /**
     * Enumerates the audio channel.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 8
     */
    /**
     * Enumerates the audio channel.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    enum AudioChannel {
        /**
         * Channel 1.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Channel 1.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_1 = 0x1 << 0,
        /**
         * Channel 2.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Channel 2.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_2 = 0x1 << 1,
        /**
         * Channel 3.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 3.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_3 = 3,
        /**
         * Channel 4.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 4.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_4 = 4,
        /**
         * Channel 5.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 5.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_5 = 5,
        /**
         * Channel 6.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 6.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_6 = 6,
        /**
         * Channel 7.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 7.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_7 = 7,
        /**
         * Channel 8.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 8.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_8 = 8,
        /**
         * Channel 9.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 9.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_9 = 9,
        /**
         * Channel 10.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 10.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_10 = 10,
        /**
         * Channel 12.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 12.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_12 = 12,
        /**
         * Channel 14.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 14.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_14 = 14,
        /**
         * Channel 16.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel 16.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CHANNEL_16 = 16
    }
    /**
     * Enumerates the audio sampling rate.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 8
     */
    /**
     * Enumerates the audio sampling rate.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    enum AudioSamplingRate {
        /**
         * 8kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 8kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_8000 = 8000,
        /**
         * 11.025kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 11.025kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_11025 = 11025,
        /**
         * 12kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 12kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_12000 = 12000,
        /**
         * 16kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 16kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_16000 = 16000,
        /**
         * 22.05kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 22.05kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_22050 = 22050,
        /**
         * 24kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 24kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_24000 = 24000,
        /**
         * 32kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 32kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_32000 = 32000,
        /**
         * 44.1kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 44.1kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_44100 = 44100,
        /**
         * 48kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 48kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_48000 = 48000,
        /**
         * 64kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 64kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_64000 = 64000,
        /**
         * 88.2kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 12
         */
        SAMPLE_RATE_88200 = 88200,
        /**
         * 96kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * 96kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SAMPLE_RATE_96000 = 96000,
        /**
         * 176.4kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 12
         */
        SAMPLE_RATE_176400 = 176400,
        /**
         * 192kHz sample rate.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 12
         */
        SAMPLE_RATE_192000 = 192000
    }
    /**
     * Enumerates the audio encoding type.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 8
     */
    /**
     * Enumerates the audio encoding type.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum AudioEncodingType {
        /**
         * Invalid type.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Invalid type.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ENCODING_TYPE_INVALID = -1,
        /**
         * PCM encoding.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * PCM encoding.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ENCODING_TYPE_RAW = 0
    }
    /**
     * Enumerates the audio content type.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 7
     * @deprecated since 10
     * @useinstead ohos.multimedia.audio.StreamUsage
     */
    enum ContentType {
        /**
         * Unknown content.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 10
         * @useinstead ohos.multimedia.audio.StreamUsage.STREAM_USAGE_UNKNOWN
         */
        CONTENT_TYPE_UNKNOWN = 0,
        /**
         * Speech content.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 10
         * @useinstead ohos.multimedia.audio.StreamUsage.STREAM_USAGE_VOICE_COMMUNICATION
         */
        CONTENT_TYPE_SPEECH = 1,
        /**
         * Music content.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 10
         * @useinstead ohos.multimedia.audio.StreamUsage.STREAM_USAGE_MUSIC
         */
        CONTENT_TYPE_MUSIC = 2,
        /**
         * Movie content.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 10
         * @useinstead ohos.multimedia.audio.StreamUsage.STREAM_USAGE_MOVIE
         */
        CONTENT_TYPE_MOVIE = 3,
        /**
         * Notification content.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 10
         * @useinstead ohos.multimedia.audio.StreamUsage.STREAM_USAGE_NOTIFICATION
         */
        CONTENT_TYPE_SONIFICATION = 4,
        /**
         * Ringtone content.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         * @deprecated since 10
         * @useinstead ohos.multimedia.audio.StreamUsage.STREAM_USAGE_RINGTONE
         */
        CONTENT_TYPE_RINGTONE = 5
    }
    /**
     * Enumerates the stream usage.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 7
     */
    /**
     * Enumerates the stream usage.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum StreamUsage {
        /**
         * Unknown usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         */
        /**
         * Unknown usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_UNKNOWN = 0,
        /**
         * Media usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 10
         * @useinstead ohos.multimedia.audio.StreamUsage.STREAM_USAGE_MUSIC or
         *             ohos.multimedia.audio.StreamUsage.STREAM_USAGE_MOVIE or
         *             ohos.multimedia.audio.StreamUsage.STREAM_USAGE_GAME or
         *             ohos.multimedia.audio.StreamUsage.STREAM_USAGE_AUDIOBOOK
         */
        STREAM_USAGE_MEDIA = 1,
        /**
         * Music usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        /**
         * Music usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_MUSIC = 1,
        /**
         * Voice communication usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         */
        /**
         * Voice communication usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_VOICE_COMMUNICATION = 2,
        /**
         * Voice assistant broadcast usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        /**
         * Voice assistant broadcast usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_VOICE_ASSISTANT = 3,
        /**
         * Alarm usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        /**
         * Alarm usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_ALARM = 4,
        /**
         * Voice message usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        /**
         * Voice message usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_VOICE_MESSAGE = 5,
        /**
         * Notification or ringtone usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 10
         * @useinstead ohos.multimedia.audio.StreamUsage.STREAM_USAGE_RINGTONE
         */
        STREAM_USAGE_NOTIFICATION_RINGTONE = 6,
        /**
         * Ringtone usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        /**
         * Ringtone usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_RINGTONE = 6,
        /**
         * Notification usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        /**
         * Notification usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_NOTIFICATION = 7,
        /**
         * Accessibility usage, such as screen reader.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        /**
         * Accessibility usage, such as screen reader.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_ACCESSIBILITY = 8,
        /**
         * Movie or video usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        /**
         * Movie or video usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_MOVIE = 10,
        /**
         * Game sound effect usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        /**
         * Game sound effect usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_GAME = 11,
        /**
         * Audiobook usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        /**
         * Audiobook usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_AUDIOBOOK = 12,
        /**
         * Navigation usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        /**
         * Navigation usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_NAVIGATION = 13,
        /**
         * Video call usage.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @atomicservice
         * @since 12
         */
        STREAM_USAGE_VIDEO_COMMUNICATION = 17
    }
    /**
     * Describes audio stream information.
     * @typedef AudioStreamInfo
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 8
     */
    /**
    * Describes audio stream information.
    * @typedef AudioStreamInfo
    * @syscap SystemCapability.Multimedia.Audio.Core
    * @crossplatform
    * @since 12
    */
    interface AudioStreamInfo {
        /**
         * Sampling rate.
         * @type { AudioSamplingRate }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Sampling rate.
         * @type { AudioSamplingRate }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        samplingRate: AudioSamplingRate;
        /**
         * Audio channels.
         * @type { AudioChannel }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
          * Audio channels.
         * @type { AudioChannel }
          * @syscap SystemCapability.Multimedia.Audio.Core
          * @crossplatform
          * @since 12
          */
        channels: AudioChannel;
        /**
         * Audio sample format.
         * @type { AudioSampleFormat }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Audio sample format.
         * @type { AudioSampleFormat }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        sampleFormat: AudioSampleFormat;
        /**
         * Audio encoding type.
         * @type { AudioEncodingType }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Audio encoding type.
         * @type { AudioEncodingType }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        encodingType: AudioEncodingType;
        /**
         * Audio channel layout.
         * @type { ?AudioChannelLayout }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Audio channel layout.
         * @type { ?AudioChannelLayout }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        channelLayout?: AudioChannelLayout;
    }
    /**
     * Describes audio renderer information.
     * @typedef AudioRendererInfo
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 8
     */
    /**
     * Describes audio renderer information.
     * @typedef AudioRendererInfo
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface AudioRendererInfo {
        /**
         * Content type.
         * @type { ContentType }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         * @deprecated since 10
         * @useinstead ohos.multimedia.audio.AudioRendererInfo#usage
         */
        /**
         * Content type.
         * @type { ?ContentType }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 10
         */
        content?: ContentType;
        /**
         * Stream usage.
         * @type { StreamUsage }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Stream usage.
         * @type { StreamUsage }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        usage: StreamUsage;
        /**
         * Audio renderer flags.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Audio renderer flags.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        rendererFlags: number;
    }
    /**
     * Describes audio renderer configuration options.
     * @typedef AudioRendererOptions
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 8
     */
    /**
    * Describes audio renderer configuration options.
    * @typedef AudioRendererOptions
    * @syscap SystemCapability.Multimedia.Audio.Renderer
    * @crossplatform
    * @since 12
    */
    interface AudioRendererOptions {
        /**
         * Stream information.
         * @type { AudioStreamInfo }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Stream information.
         * @type { AudioStreamInfo }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        streamInfo: AudioStreamInfo;
        /**
         * Renderer information.
         * @type { AudioRendererInfo }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Renderer information.
         * @type { AudioRendererInfo }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        rendererInfo: AudioRendererInfo;
        /**
         * Privacy configuration.
         * @type { ?AudioPrivacyType }
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @since 10
         */
        /**
         * Privacy configuration.
         * @type { ?AudioPrivacyType }
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @crossplatform
         * @since 12
         */
        privacyType?: AudioPrivacyType;
    }
    /**
     * Enumerates audio stream privacy type for playback capture.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
     * @since 10
     */
    /**
     * Enumerates audio stream privacy type for playback capture.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
     * @crossplatform
     * @since 12
     */
    enum AudioPrivacyType {
        /**
         * Privacy type that stream can be captured by third party applications.
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @since 10
         */
        /**
         * Privacy type that stream can be captured by third party applications.
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @crossplatform
         * @since 12
         */
        PRIVACY_TYPE_PUBLIC = 0,
        /**
         * Privacy type that stream can not be captured.
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @since 10
         */
        /**
         * Privacy type that stream can not be captured.
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @crossplatform
         * @since 12
         */
        PRIVACY_TYPE_PRIVATE = 1
    }
    /**
     * Enumerates the interrupt modes.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     * @since 9
     */
    /**
     * Enumerates the interrupt modes.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum InterruptMode {
        /**
         * Mode that different stream share one interrupt unit.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @since 9
         */
        /**
         * Mode that different stream share one interrupt unit.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SHARE_MODE = 0,
        /**
         * Mode that each stream has independent interrupt unit.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @since 9
         */
        /**
         * Mode that each stream has independent interrupt unit.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        INDEPENDENT_MODE = 1
    }
    /**
     * Enumerates the audio renderer rates.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 8
     */
    enum AudioRendererRate {
        /**
         * Normal rate.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        RENDER_RATE_NORMAL = 0,
        /**
         * Double rate.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        RENDER_RATE_DOUBLE = 1,
        /**
         * Half rate.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        RENDER_RATE_HALF = 2
    }
    /**
     * Enumerates the interrupt types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 7
     */
    /**
     * Enumerates the interrupt types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum InterruptType {
        /**
         * Audio playback interruption started.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         */
        /**
         * Audio playback interruption started.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        INTERRUPT_TYPE_BEGIN = 1,
        /**
         * Audio playback interruption ended.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         */
        /**
         * Audio playback interruption ended.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        INTERRUPT_TYPE_END = 2
    }
    /**
     * Enumerates the interrupt hints.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 7
     */
    /**
     * Enumerates the interrupt hints.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum InterruptHint {
        /**
         * None.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * None.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @atomicservice
         * @since 12
         */
        INTERRUPT_HINT_NONE = 0,
        /**
         * Resume the playback.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         */
        /**
         * Resume the playback.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        INTERRUPT_HINT_RESUME = 1,
        /**
         * Paused/Pause the playback.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         */
        /**
         * Paused/Pause the playback.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @atomicservice
         * @since 12
         */
        INTERRUPT_HINT_PAUSE = 2,
        /**
         * Stopped/Stop the playback.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         */
        /**
         * Stopped/Stop the playback.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @atomicservice
         * @since 12
         */
        INTERRUPT_HINT_STOP = 3,
        /**
         * Ducked the playback. (In ducking, the audio volume is reduced, but not silenced.)
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         */
        /**
         * Ducked the playback. (In ducking, the audio volume is reduced, but not silenced.)
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @atomicservice
         * @since 12
         */
        INTERRUPT_HINT_DUCK = 4,
        /**
         * Unducked the playback.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Unducked the playback.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @atomicservice
         * @since 12
         */
        INTERRUPT_HINT_UNDUCK = 5
    }
    /**
     * Enumerates the interrupt force types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 9
     */
    /**
     * Enumerates the interrupt force types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum InterruptForceType {
        /**
         * Forced action taken by system.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Forced action taken by system.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        INTERRUPT_FORCE = 0,
        /**
         * Share type, application can choose to take action or ignore.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Share type, application can choose to take action or ignore.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @atomicservice
         * @since 12
         */
        INTERRUPT_SHARE = 1
    }
    /**
     * Describes the interrupt event received by the app when playback is interrupted.
     * @typedef InterruptEvent
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 9
     */
    /**
     * Describes the interrupt event received by the app when playback is interrupted.
     * @typedef InterruptEvent
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface InterruptEvent {
        /**
         * Indicates whether the interruption has started or finished.
         * @type { InterruptType }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Indicates whether the interruption has started or finished.
         * @type { InterruptType }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        eventType: InterruptType;
        /**
         * Indicates whether the action is taken by system or to be taken by the app.
         * @type { InterruptForceType }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Indicates whether the action is taken by system or to be taken by the app.
         * @type { InterruptForceType }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        forceType: InterruptForceType;
        /**
         * Indicates the kind of action.
         * @type { InterruptHint }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Indicates the kind of action.
         * @type { InterruptHint }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        hintType: InterruptHint;
    }
    /**
     * Enumerates interrupt action types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 7
     * @deprecated since 9
     */
    enum InterruptActionType {
        /**
         * Focus gain event.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 9
         */
        TYPE_ACTIVATED = 0,
        /**
         * Audio interruption event.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 9
         */
        TYPE_INTERRUPT = 1
    }
    /**
     * Enumerates device change types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 7
     */
    /**
     * Enumerates device change types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @crossplatform
     * @since 12
     */
    enum DeviceChangeType {
        /**
         * Device connection.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Device connection.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        CONNECT = 0,
        /**
         * Device disconnection.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Device disconnection.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        DISCONNECT = 1
    }
    /**
     * Enumerates audio scenes.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @since 8
     */
    /**
     * Enumerates audio scenes.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @crossplatform
     * @since 12
     */
    enum AudioScene {
        /**
         * Default audio scene
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 8
         */
        /**
         * Default audio scene
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        AUDIO_SCENE_DEFAULT = 0,
        /**
         * Voice chat audio scene
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 8
         */
        /**
         * Voice chat audio scene
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        AUDIO_SCENE_VOICE_CHAT = 3
    }
    /**
     * Implements audio volume and audio device management.
     * @typedef AudioManager
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 7
     */
    /**
     * Implements audio volume and audio device management.
     * @typedef AudioManager
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    interface AudioManager {
        /**
         * Sets the volume for a stream. This method uses an asynchronous callback to return the result.
         * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { number } volume - Volume to set. The value range can be obtained by calling getMinVolume and getMaxVolume.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setVolume
         */
        setVolume(volumeType: AudioVolumeType, volume: number, callback: AsyncCallback<void>): void;
        /**
         * Sets the volume for a stream. This method uses a promise to return the result.
         * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { number } volume - Volume to set. The value range can be obtained by calling getMinVolume and getMaxVolume.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setVolume
         */
        setVolume(volumeType: AudioVolumeType, volume: number): Promise<void>;
        /**
         * Obtains the volume of a stream. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<number> } callback - Callback used to return the volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getVolume
         */
        getVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
        /**
         * Obtains the volume of a stream. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<number> } Promise used to return the volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getVolume
         */
        getVolume(volumeType: AudioVolumeType): Promise<number>;
        /**
         * Obtains the minimum volume allowed for a stream. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<number> } callback - Callback used to return the minimum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getMinVolume
         */
        getMinVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
        /**
         * Obtains the minimum volume allowed for a stream. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<number> } Promise used to return the minimum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getMinVolume
         */
        getMinVolume(volumeType: AudioVolumeType): Promise<number>;
        /**
         * Obtains the maximum volume allowed for a stream. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<number> } callback - Callback used to return the maximum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getMaxVolume
         */
        getMaxVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
        /**
         * Obtains the maximum volume allowed for a stream. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<number> } Promise used to return the maximum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getMaxVolume
         */
        getMaxVolume(volumeType: AudioVolumeType): Promise<number>;
        /**
         * Obtains the audio devices with a specific flag. This method uses an asynchronous callback to return the query result.
         * @param { DeviceFlag } deviceFlag - Audio device flag.
         * @param { AsyncCallback<AudioDeviceDescriptors> } callback - Callback used to return the device list.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioRoutingManager#getDevices
         */
        getDevices(deviceFlag: DeviceFlag, callback: AsyncCallback<AudioDeviceDescriptors>): void;
        /**
         * Obtains the audio devices with a specific flag. This method uses a promise to return the query result.
         * @param { DeviceFlag } deviceFlag - Audio device flag.
         * @returns { Promise<AudioDeviceDescriptors> } Promise used to return the device list.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioRoutingManager#getDevices
         */
        getDevices(deviceFlag: DeviceFlag): Promise<AudioDeviceDescriptors>;
        /**
         * Mutes a stream. This method uses an asynchronous callback to return the result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { boolean } mute - Mute status to set. The value true means to mute the stream, and false means the opposite.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#mute
         */
        mute(volumeType: AudioVolumeType, mute: boolean, callback: AsyncCallback<void>): void;
        /**
         * Mutes a stream. This method uses a promise to return the result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { boolean } mute -  Mute status to set. The value true means to mute the stream, and false means the opposite.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#mute
         */
        mute(volumeType: AudioVolumeType, mute: boolean): Promise<void>;
        /**
         * Checks whether a stream is muted. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<boolean> } callback - Callback used to return the mute status of the stream.
         *        The value true means that the stream is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#isMute
         */
        isMute(volumeType: AudioVolumeType, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether a stream is muted. This method uses a promise to return the result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<boolean> } Promise used to return the mute status of the stream. The value true means
         *          that the stream is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#isMute
         */
        isMute(volumeType: AudioVolumeType): Promise<boolean>;
        /**
         * Checks whether a stream is active. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<boolean> } callback - Callback used to return the active status of the stream.
         *        The value true means that the stream is active, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioStreamManager#isActive
         */
        isActive(volumeType: AudioVolumeType, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether a stream is active. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<boolean> } Promise used to return the active status of the stream. The value true means
         *          that the stream is active, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioStreamManager#isActive
         */
        isActive(volumeType: AudioVolumeType): Promise<boolean>;
        /**
         * Mutes or unmutes the microphone. This method uses an asynchronous callback to return the result.
         * @permission ohos.permission.MICROPHONE
         * @param { boolean } mute - Mute status to set. The value true means to mute the microphone, and false means the opposite.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setMicrophoneMute
         */
        setMicrophoneMute(mute: boolean, callback: AsyncCallback<void>): void;
        /**
         * Mutes or unmutes the microphone. This method uses a promise to return the result.
         * @permission ohos.permission.MICROPHONE
         * @param { boolean } mute - Mute status to set. The value true means to mute the microphone, and false means the opposite.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setMicrophoneMute
         */
        setMicrophoneMute(mute: boolean): Promise<void>;
        /**
         * Checks whether the microphone is muted. This method uses an asynchronous callback to return the query result.
         * @permission ohos.permission.MICROPHONE
         * @param { AsyncCallback<boolean> } callback - used to return the mute status of the microphone. The value
         *        true means that the microphone is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#isMicrophoneMute
         */
        isMicrophoneMute(callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether the microphone is muted. This method uses a promise to return the query result.
         * @permission ohos.permission.MICROPHONE
         * @returns { Promise<boolean> } Promise used to return the mute status of the microphone. The value
         *          true means that the microphone is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#isMicrophoneMute
         */
        isMicrophoneMute(): Promise<boolean>;
        /**
         * Sets the ringer mode. This method uses an asynchronous callback to return the result.
         * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
         * @param { AudioRingMode } mode - Ringer mode.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setRingerMode
         */
        setRingerMode(mode: AudioRingMode, callback: AsyncCallback<void>): void;
        /**
         * Sets the ringer mode. This method uses a promise to return the result.
         * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
         * @param { AudioRingMode } mode - Ringer mode.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setRingerMode
         */
        setRingerMode(mode: AudioRingMode): Promise<void>;
        /**
         * Obtains the ringer mode. This method uses an asynchronous callback to return the query result.
         * @param { AsyncCallback<AudioRingMode> } callback - Callback used to return the ringer mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getRingerMode
         */
        getRingerMode(callback: AsyncCallback<AudioRingMode>): void;
        /**
         * Obtains the ringer mode. This method uses a promise to return the query result.
         * @returns { Promise<AudioRingMode> } Promise used to return the ringer mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getRingerMode
         */
        getRingerMode(): Promise<AudioRingMode>;
        /**
         * Sets an audio parameter. This method uses an asynchronous callback to return the result.
         * @permission ohos.permission.MODIFY_AUDIO_SETTINGS
         * @param { string } key - Key of the audio parameter to set.
         * @param { string } value -  Value of the audio parameter to set.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioManager#setExtraParameters
         */
        setAudioParameter(key: string, value: string, callback: AsyncCallback<void>): void;
        /**
         * Sets an audio parameter. This method uses a promise to return the result.
         * @permission ohos.permission.MODIFY_AUDIO_SETTINGS
         * @param { string } key - Key of the audio parameter to set.
         * @param { string } value - Value of the audio parameter to set.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioManager#setExtraParameters
         */
        setAudioParameter(key: string, value: string): Promise<void>;
        /**
         * Obtains the value of an audio parameter. This method uses an asynchronous callback to return the query result.
         * @param { string } key - Key of the audio parameter whose value is to be obtained.
         * @param { AsyncCallback<string> } callback - Callback used to return the value of the audio parameter.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioManager#getExtraParameters
         */
        getAudioParameter(key: string, callback: AsyncCallback<string>): void;
        /**
         * Obtains the value of an audio parameter. This method uses a promise to return the query result.
         * @param { string } key - Key of the audio parameter whose value is to be obtained.
         * @returns { Promise<string> } Promise used to return the value of the audio parameter.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 7
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioManager#getExtraParameters
         */
        getAudioParameter(key: string): Promise<string>;
        /**
         * Sets a device to the active state. This method uses an asynchronous callback to return the result.
         * @param { ActiveDeviceType } deviceType - Audio device type.
         * @param { boolean } active - Active status to set. The value true means to set the device to the active
         *        status, and false means the opposite.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioRoutingManager#setCommunicationDevice
         */
        setDeviceActive(deviceType: ActiveDeviceType, active: boolean, callback: AsyncCallback<void>): void;
        /**
         * Sets a device to the active state. This method uses a promise to return the result.
         * @param { ActiveDeviceType } deviceType - Audio device type.
         * @param { boolean } active - Active status to set. The value true means to set the device to the active
         *        status, and false means the opposite.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioRoutingManager#setCommunicationDevice
         */
        setDeviceActive(deviceType: ActiveDeviceType, active: boolean): Promise<void>;
        /**
         * Checks whether a device is active. This method uses an asynchronous callback to return the query result.
         * @param { ActiveDeviceType } deviceType - Audio device type.
         * @param { AsyncCallback<boolean> } callback - Callback used to return the active status of the device.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioRoutingManager#isCommunicationDeviceActive
         */
        isDeviceActive(deviceType: ActiveDeviceType, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether a device is active. This method uses a promise to return the query result.
         * @param { ActiveDeviceType } deviceType - Audio device type.
         * @returns { Promise<boolean> } Promise used to return the active status of the device.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioRoutingManager#isCommunicationDeviceActive
         */
        isDeviceActive(deviceType: ActiveDeviceType): Promise<boolean>;
        /**
         * Obtains the audio scene mode. This method uses an asynchronous callback to return the query result.
         * @param { AsyncCallback<AudioScene> } callback - Callback used to return the audio scene mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 8
         */
        /**
         * Obtains the audio scene mode. This method uses an asynchronous callback to return the query result.
         * @param { AsyncCallback<AudioScene> } callback - Callback used to return the audio scene mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        getAudioScene(callback: AsyncCallback<AudioScene>): void;
        /**
         * Obtains the audio scene mode. This method uses a promise to return the query result.
         * @returns { Promise<AudioScene> } Promise used to return the audio scene mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 8
         */
        /**
         * Obtains the audio scene mode. This method uses a promise to return the query result.
         * @returns { Promise<AudioScene> } Promise used to return the audio scene mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        getAudioScene(): Promise<AudioScene>;
        /**
         * Obtains the audio scene mode.
         * @returns { AudioScene } Current audio scene mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 10
         */
        /**
         * Obtains the audio scene mode.
         * @returns { AudioScene } Current audio scene mode.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        getAudioSceneSync(): AudioScene;
        /**
         * Subscribes to device change events. When a device is connected/disconnected, registered clients will receive
         * the callback.
         * @param { 'deviceChange' } type - Type of the event to listen for. Only the deviceChange event is supported.
         * @param { Callback<DeviceChangeAction> } callback - Callback used to obtain the device update details.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioRoutingManager#event:deviceChange
         */
        on(type: 'deviceChange', callback: Callback<DeviceChangeAction>): void;
        /**
         * UnSubscribes to device change events.
         * @param { 'deviceChange' } type - Type of the event to listen for. Only the deviceChange event is supported.
         * @param { Callback<DeviceChangeAction> } callback - Callback used to obtain the device update details.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.multimedia.audio.AudioRoutingManager#event:deviceChange
         */
        off(type: 'deviceChange', callback?: Callback<DeviceChangeAction>): void;
        /**
         * Listens for audio interruption events. When the audio of an application is interrupted by another application,
         * the callback is invoked to notify the former application.
         * @param { 'interrupt' } type - Type of the event to listen for. Only the interrupt event is supported.
         * @param { AudioInterrupt } interrupt - Parameters of the audio interruption event type.
         * @param { Callback<InterruptAction> } callback - Callback invoked for the audio interruption event.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioRenderer#event:audioInterrupt
         */
        on(type: 'interrupt', interrupt: AudioInterrupt, callback: Callback<InterruptAction>): void;
        /**
         * Cancels the listening of audio interruption events.
         * @param { 'interrupt' } type - Type of the event to listen for. Only the interrupt event is supported.
         * @param { AudioInterrupt } interrupt - Input parameters of the audio interruption event.
         * @param { Callback<InterruptAction> } callback - Callback invoked for the audio interruption event.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioRenderer#event:audioInterrupt
         */
        off(type: 'interrupt', interrupt: AudioInterrupt, callback?: Callback<InterruptAction>): void;
        /**
         * Obtains an {@link AudioVolumeManager} instance.
         * @returns { AudioVolumeManager } AudioVolumeManager instance.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains an {@link AudioVolumeManager} instance.
         * @returns { AudioVolumeManager } AudioVolumeManager instance.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getVolumeManager(): AudioVolumeManager;
        /**
         * Obtains an {@link AudioStreamManager} instance.
         * @returns { AudioStreamManager } AudioStreamManager instance.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        /**
         * Obtains an {@link AudioStreamManager} instance.
         * @returns { AudioStreamManager } AudioStreamManager instance.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        getStreamManager(): AudioStreamManager;
        /**
         * Obtains an {@link AudioRoutingManager} instance.
         * @returns { AudioRoutingManager } AudioRoutingManager instance.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Obtains an {@link AudioRoutingManager} instance.
         * @returns { AudioRoutingManager } AudioRoutingManager instance.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getRoutingManager(): AudioRoutingManager;
    }
    /**
     * Implements audio router management.
     * @typedef AudioRoutingManager
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 9
     */
    /**
     * Implements audio router management.
     * @typedef AudioRoutingManager
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @crossplatform
     * @since 12
     */
    interface AudioRoutingManager {
        /**
         * Obtains the audio devices with a specific flag. This method uses an asynchronous callback to return the query result.
         * @param { DeviceFlag } deviceFlag - Audio device flag.
         * @param { AsyncCallback<AudioDeviceDescriptors> } callback - Callback used to return the device list.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Obtains the audio devices with a specific flag. This method uses an asynchronous callback to return the query result.
         * @param { DeviceFlag } deviceFlag - Audio device flag.
         * @param { AsyncCallback<AudioDeviceDescriptors> } callback - Callback used to return the device list.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getDevices(deviceFlag: DeviceFlag, callback: AsyncCallback<AudioDeviceDescriptors>): void;
        /**
         * Obtains the audio devices with a specific flag. This method uses a promise to return the query result.
         * @param { DeviceFlag } deviceFlag - Audio device flag.
         * @returns { Promise<AudioDeviceDescriptors> } Promise used to return the device list.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Obtains the audio devices with a specific flag. This method uses a promise to return the query result.
         * @param { DeviceFlag } deviceFlag - Audio device flag.
         * @returns { Promise<AudioDeviceDescriptors> } Promise used to return the device list.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getDevices(deviceFlag: DeviceFlag): Promise<AudioDeviceDescriptors>;
        /**
         * Obtains the audio devices with a specific flag.
         * @param { DeviceFlag } deviceFlag - Audio device flag.
         * @returns { AudioDeviceDescriptors } The device list.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Obtains the audio devices with a specific flag.
         * @param { DeviceFlag } deviceFlag - Audio device flag.
         * @returns { AudioDeviceDescriptors } The device list.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
    
         * @crossplatform
         * @since 12
         */
        getDevicesSync(deviceFlag: DeviceFlag): AudioDeviceDescriptors;
        /**
         * Subscribes to device change events. When a device is connected/disconnected, registered clients will receive
         * the callback.
         * @param { 'deviceChange' } type - Type of the event to listen for. Only the deviceChange event is supported.
         * @param { DeviceFlag } deviceFlag - Audio device flag.
         * @param { Callback<DeviceChangeAction> } callback - Callback used to obtain the device update details.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Subscribes to device change events. When a device is connected/disconnected, registered clients will receive
         * the callback.
         * @param { 'deviceChange' } type - Type of the event to listen for. Only the deviceChange event is supported.
         * @param { DeviceFlag } deviceFlag - Audio device flag.
         * @param { Callback<DeviceChangeAction> } callback - Callback used to obtain the device update details.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
    
         * @crossplatform
         * @since 12
         */
        on(type: 'deviceChange', deviceFlag: DeviceFlag, callback: Callback<DeviceChangeAction>): void;
        /**
         * UnSubscribes to device change events.
         * @param { 'deviceChange' } type - Type of the event to listen for. Only the deviceChange event is supported.
         * @param { Callback<DeviceChangeAction> } callback - Callback used to obtain the device update details.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * UnSubscribes to device change events.
         * @param { 'deviceChange' } type - Type of the event to listen for. Only the deviceChange event is supported.
         * @param { Callback<DeviceChangeAction> } callback - Callback used to obtain the device update details.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
    
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        off(type: 'deviceChange', callback?: Callback<DeviceChangeAction>): void;
        /**
         * Sets a device to the active state. This method uses an asynchronous callback to return the result.
         * @param { CommunicationDeviceType } deviceType - Audio device type.
         * @param { boolean } active - Active status to set. The value true means to set the device to
         *  the active status, and false means the opposite.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 9
         */
        /**
         * Sets a device to the active state. This method uses an asynchronous callback to return the result.
         * @param { CommunicationDeviceType } deviceType - Audio device type.
         * @param { boolean } active - Active status to set. The value true means to set the device to
         *  the active status, and false means the opposite.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        setCommunicationDevice(deviceType: CommunicationDeviceType, active: boolean, callback: AsyncCallback<void>): void;
        /**
         * Sets a device to the active state. This method uses a promise to return the result.
         * @param { CommunicationDeviceType } deviceType - Audio device type.
         * @param { boolean } active - Active status to set. The value true means to set the device to the active status,
         * and false means the opposite.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 9
         */
        /**
         * Sets a device to the active state. This method uses a promise to return the result.
         * @param { CommunicationDeviceType } deviceType - Audio device type.
         * @param { boolean } active - Active status to set. The value true means to set the device to the active status,
         * and false means the opposite.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        setCommunicationDevice(deviceType: CommunicationDeviceType, active: boolean): Promise<void>;
        /**
         * Checks whether a device is active. This method uses an asynchronous callback to return the query result.
         * @param { CommunicationDeviceType } deviceType - Audio device type.
         * @param { AsyncCallback<boolean> } callback - Callback used to return the active status of the device.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 9
         */
        /**
         * Checks whether a device is active. This method uses an asynchronous callback to return the query result.
         * @param { CommunicationDeviceType } deviceType - Audio device type.
         * @param { AsyncCallback<boolean> } callback - Callback used to return the active status of the device.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        isCommunicationDeviceActive(deviceType: CommunicationDeviceType, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether a device is active. This method uses a promise to return the query result.
         * @param { CommunicationDeviceType } deviceType - Audio device type.
         * @returns { Promise<boolean> } Promise used to return the active status of the device.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 9
         */
        /**
         * Checks whether a device is active. This method uses a promise to return the query result.
         * @param { CommunicationDeviceType } deviceType - Audio device type.
         * @returns { Promise<boolean> } Promise used to return the active status of the device.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @crossplatform
         * @since 12
         */
        isCommunicationDeviceActive(deviceType: CommunicationDeviceType): Promise<boolean>;
        /**
         * Checks whether a device is active.
         * @param { CommunicationDeviceType } deviceType - Audio device type.
         * @returns { boolean } The active status of the device.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Communication
         * @since 10
         */
        /**
         * Checks whether a device is active.
         * @param { CommunicationDeviceType } deviceType - Audio device type.
         * @returns { boolean } The active status of the device.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Communication
    
         * @crossplatform
         * @since 12
         */
        isCommunicationDeviceActiveSync(deviceType: CommunicationDeviceType): boolean;
        /**
         * Get output device for target audio renderer info.
         * @param { AudioRendererInfo } rendererInfo - Audio renderer information
         * @param { AsyncCallback<AudioDeviceDescriptors> } callback - Callback used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by callback.
         * @throws { BusinessError } 6800301 - System error. Return by callback.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Get output device for target audio renderer info.
         * @param { AudioRendererInfo } rendererInfo - Audio renderer information
         * @param { AsyncCallback<AudioDeviceDescriptors> } callback - Callback used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by callback.
         * @throws { BusinessError } 6800301 - System error. Return by callback.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getPreferOutputDeviceForRendererInfo(rendererInfo: AudioRendererInfo, callback: AsyncCallback<AudioDeviceDescriptors>): void;
        /**
         * Get output device for target audio renderer info.
         * @param { AudioRendererInfo } rendererInfo - Audio renderer information.
         * @returns { Promise<AudioDeviceDescriptors> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by promise.
         * @throws { BusinessError } 6800301 - System error. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Get output device for target audio renderer info.
         * @param { AudioRendererInfo } rendererInfo - Audio renderer information.
         * @returns { Promise<AudioDeviceDescriptors> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by promise.
         * @throws { BusinessError } 6800301 - System error. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getPreferOutputDeviceForRendererInfo(rendererInfo: AudioRendererInfo): Promise<AudioDeviceDescriptors>;
        /**
         * Gets preferred output device for target audio renderer info.
         * @param { AudioRendererInfo } rendererInfo - Audio renderer information.
         * @returns { AudioDeviceDescriptors } The preferred devices.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Gets preferred output device for target audio renderer info.
         * @param { AudioRendererInfo } rendererInfo - Audio renderer information.
         * @returns { AudioDeviceDescriptors } The preferred devices.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getPreferredOutputDeviceForRendererInfoSync(rendererInfo: AudioRendererInfo): AudioDeviceDescriptors;
        /**
         * Subscribes to prefer output device change events. When prefer device for target audio renderer info changes,
         * registered clients will receive the callback.
         * @param { 'preferOutputDeviceChangeForRendererInfo' } type - Type of the event to listen for. Only the
         * preferOutputDeviceChangeForRendererInfo event is supported.
         * @param { AudioRendererInfo } rendererInfo - Audio renderer information.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to obtain the changed prefer devices information.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Subscribes to prefer output device change events. When prefer device for target audio renderer info changes,
         * registered clients will receive the callback.
         * @param { 'preferOutputDeviceChangeForRendererInfo' } type - Type of the event to listen for. Only the
         * preferOutputDeviceChangeForRendererInfo event is supported.
         * @param { AudioRendererInfo } rendererInfo - Audio renderer information.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to obtain the changed prefer devices information.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        on(type: 'preferOutputDeviceChangeForRendererInfo', rendererInfo: AudioRendererInfo, callback: Callback<AudioDeviceDescriptors>): void;
        /**
         * UnSubscribes to prefer output device change events.
         * @param { 'preferOutputDeviceChangeForRendererInfo' } type - Type of the event to listen for. Only the
         * preferOutputDeviceChangeForRendererInfo event is supported.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to obtain the changed prefer devices in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * UnSubscribes to prefer output device change events.
         * @param { 'preferOutputDeviceChangeForRendererInfo' } type - Type of the event to listen for. Only the
         * preferOutputDeviceChangeForRendererInfo event is supported.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to obtain the changed prefer devices in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        off(type: 'preferOutputDeviceChangeForRendererInfo', callback?: Callback<AudioDeviceDescriptors>): void;
        /**
         * Get input device for target audio capturer info.
         * @param { AudioCapturerInfo } capturerInfo - Audio capturer information.
         * @param { AsyncCallback<AudioDeviceDescriptors> } callback - Callback used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by callback.
         * @throws { BusinessError } 6800301 - System error. Return by callback.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Get input device for target audio capturer info.
         * @param { AudioCapturerInfo } capturerInfo - Audio capturer information.
         * @param { AsyncCallback<AudioDeviceDescriptors> } callback - Callback used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by callback.
         * @throws { BusinessError } 6800301 - System error. Return by callback.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getPreferredInputDeviceForCapturerInfo(capturerInfo: AudioCapturerInfo, callback: AsyncCallback<AudioDeviceDescriptors>): void;
        /**
         * Get input device for target audio capturer info.
         * @param { AudioCapturerInfo } capturerInfo - Audio capturer information.
         * @returns { Promise<AudioDeviceDescriptors> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by promise.
         * @throws { BusinessError } 6800301 - System error. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Get input device for target audio capturer info.
         * @param { AudioCapturerInfo } capturerInfo - Audio capturer information.
         * @returns { Promise<AudioDeviceDescriptors> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by promise.
         * @throws { BusinessError } 6800301 - System error. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getPreferredInputDeviceForCapturerInfo(capturerInfo: AudioCapturerInfo): Promise<AudioDeviceDescriptors>;
        /**
         * Subscribes to preferred input device change events. When preferred device for target audio capturer info changes,
         * registered clients will receive the callback.
         * @param { 'preferredInputDeviceChangeForCapturerInfo' } type - Type of the event to listen for.
         * @param { AudioCapturerInfo } capturerInfo - Audio capturer information.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to obtain the changed preferred devices information.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Subscribes to preferred input device change events. When preferred device for target audio capturer info changes,
         * registered clients will receive the callback.
         * @param { 'preferredInputDeviceChangeForCapturerInfo' } type - Type of the event to listen for.
         * @param { AudioCapturerInfo } capturerInfo - Audio capturer information.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to obtain the changed preferred devices information.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        on(type: 'preferredInputDeviceChangeForCapturerInfo', capturerInfo: AudioCapturerInfo, callback: Callback<AudioDeviceDescriptors>): void;
        /**
         * Unsubscribes to preferred input device change events.
         * @param { 'preferredInputDeviceChangeForCapturerInfo' } type - Type of the event to listen for.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to obtain the changed preferred devices in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Unsubscribes to preferred input device change events.
         * @param { 'preferredInputDeviceChangeForCapturerInfo' } type - Type of the event to listen for.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to obtain the changed preferred devices in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        off(type: 'preferredInputDeviceChangeForCapturerInfo', callback?: Callback<AudioDeviceDescriptors>): void;
        /**
         * Gets preferred input device for target audio capturer info.
         * @param { AudioCapturerInfo } capturerInfo - Audio capturer information.
         * @returns { AudioDeviceDescriptors } The preferred devices.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Gets preferred input device for target audio capturer info.
         * @param { AudioCapturerInfo } capturerInfo - Audio capturer information.
         * @returns { AudioDeviceDescriptors } The preferred devices.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getPreferredInputDeviceForCapturerInfoSync(capturerInfo: AudioCapturerInfo): AudioDeviceDescriptors;
    }
    /**
     * Implements audio stream management.
     * @typedef AudioStreamManager
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 9
     */
    /**
     * Implements audio stream management.
     * @typedef AudioStreamManager
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    interface AudioStreamManager {
        /**
         * Get information of current existing audio renderers.
         * @param { AsyncCallback<AudioRendererChangeInfoArray> } callback - Callback used to return the information
         * of current existing audio renderers.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Get information of current existing audio renderers.
         * @param { AsyncCallback<AudioRendererChangeInfoArray> } callback - Callback used to return the information
         * of current existing audio renderers.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getCurrentAudioRendererInfoArray(callback: AsyncCallback<AudioRendererChangeInfoArray>): void;
        /**
         * Get information of current existing audio renderers.
         * @returns { Promise<AudioRendererChangeInfoArray> } Promise used to return the information of current
         * existing audio renderers.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Get information of current existing audio renderers.
         * @returns { Promise<AudioRendererChangeInfoArray> } Promise used to return the information of current
         * existing audio renderers.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getCurrentAudioRendererInfoArray(): Promise<AudioRendererChangeInfoArray>;
        /**
         * Get information of current existing audio renderers.
         * @returns { AudioRendererChangeInfoArray } The information of current existing audio renderers.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Get information of current existing audio renderers.
         * @returns { AudioRendererChangeInfoArray } The information of current existing audio renderers.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getCurrentAudioRendererInfoArraySync(): AudioRendererChangeInfoArray;
        /**
         * Get information of current existing audio capturers.
         * @param { AsyncCallback<AudioCapturerChangeInfoArray> } callback - Callback used to return the information
         * of current existing audio capturers.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Get information of current existing audio capturers.
         * @param { AsyncCallback<AudioCapturerChangeInfoArray> } callback - Callback used to return the information
         * of current existing audio capturers.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getCurrentAudioCapturerInfoArray(callback: AsyncCallback<AudioCapturerChangeInfoArray>): void;
        /**
         * Get information of current existing audio capturers.
         * @returns { Promise<AudioCapturerChangeInfoArray> } Promise used to return the information of current existing
         * audio capturers.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Get information of current existing audio capturers.
         * @returns { Promise<AudioCapturerChangeInfoArray> } Promise used to return the information of current existing
         * audio capturers.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getCurrentAudioCapturerInfoArray(): Promise<AudioCapturerChangeInfoArray>;
        /**
         * Get information of current existing audio capturers.
         * @returns { AudioCapturerChangeInfoArray } The information of current existing audio capturers.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 10
         */
        /**
         * Get information of current existing audio capturers.
         * @returns { AudioCapturerChangeInfoArray } The information of current existing audio capturers.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getCurrentAudioCapturerInfoArraySync(): AudioCapturerChangeInfoArray;
        /**
         * Gets information of audio effects.
         * @param { StreamUsage } usage - Stream usage.
         * @param { AsyncCallback<AudioEffectInfoArray> } callback - Callback used to return the information of audio effects.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by callback.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        getAudioEffectInfoArray(usage: StreamUsage, callback: AsyncCallback<AudioEffectInfoArray>): void;
        /**
         * Gets information of audio effects.
         * @param { StreamUsage } usage - Stream usage.
         * @returns { Promise<AudioEffectInfoArray> } Promise used to return the information of audio effects.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        getAudioEffectInfoArray(usage: StreamUsage): Promise<AudioEffectInfoArray>;
        /**
         * Gets information of audio effects.
         * @param { StreamUsage } usage - Stream usage.
         * @returns { AudioEffectInfoArray } The information of audio effects.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        getAudioEffectInfoArraySync(usage: StreamUsage): AudioEffectInfoArray;
        /**
         * Listens for audio renderer change events. When there is any audio renderer change,
         * registered clients will receive the callback.
         * @param { 'audioRendererChange' } type - Type of the event to listen for. Only the audioRendererChange event is supported.
         * @param { Callback<AudioRendererChangeInfoArray> } callback - Callback invoked for the audio renderer change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Listens for audio renderer change events. When there is any audio renderer change,
         * registered clients will receive the callback.
         * @param { 'audioRendererChange' } type - Type of the event to listen for. Only the audioRendererChange event is supported.
         * @param { Callback<AudioRendererChangeInfoArray> } callback - Callback invoked for the audio renderer change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        on(type: 'audioRendererChange', callback: Callback<AudioRendererChangeInfoArray>): void;
        /**
         * UnSubscribes to audio renderer change events.
         * @param { 'audioRendererChange' } type - Type of the event to listen for. Only the audioRendererChange event is supported.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * UnSubscribes to audio renderer change events.
         * @param { 'audioRendererChange' } type - Type of the event to listen for. Only the audioRendererChange event is supported.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        off(type: 'audioRendererChange'): void;
        /**
         * Listens for audio capturer change events. When there is any audio capturer change,
         * registered clients will receive the callback.
         * @param { 'audioCapturerChange' } type - Type of the event to listen for. Only the audioCapturerChange event is supported.
         * @param { Callback<AudioCapturerChangeInfoArray> } callback - Callback invoked for the audio capturer change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 9
         */
        /**
         * Listens for audio capturer change events. When there is any audio capturer change,
         * registered clients will receive the callback.
         * @param { 'audioCapturerChange' } type - Type of the event to listen for. Only the audioCapturerChange event is supported.
         * @param { Callback<AudioCapturerChangeInfoArray> } callback - Callback invoked for the audio capturer change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        on(type: 'audioCapturerChange', callback: Callback<AudioCapturerChangeInfoArray>): void;
        /**
         * UnSubscribes to audio capturer change events.
         * @param { 'audioCapturerChange' } type - Type of the event to listen for. Only the audioCapturerChange event is supported.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 9
         */
        /**
         * UnSubscribes to audio capturer change events.
         * @param { 'audioCapturerChange' } type - Type of the event to listen for. Only the audioCapturerChange event is supported.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        off(type: 'audioCapturerChange'): void;
        /**
         * Checks whether a stream is active. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<boolean> } callback - Callback used to return the active status of the stream.
         *  The value true means that the stream is active, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Checks whether a stream is active. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<boolean> } callback - Callback used to return the active status of the stream.
         *  The value true means that the stream is active, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        isActive(volumeType: AudioVolumeType, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether a stream is active. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<boolean> } Promise used to return the active status of the stream. The value
         * true means that the stream is active, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Checks whether a stream is active. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<boolean> } Promise used to return the active status of the stream. The value
         * true means that the stream is active, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        isActive(volumeType: AudioVolumeType): Promise<boolean>;
        /**
         * Checks whether a stream is active.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { boolean } The active status of the stream.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Checks whether a stream is active.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { boolean } The active status of the stream.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        isActiveSync(volumeType: AudioVolumeType): boolean;
    }
    /**
     * Implements audio volume management.
     * @typedef AudioVolumeManager
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @since 9
     */
    /**
     * Implements audio volume management.
     * @typedef AudioVolumeManager
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @crossplatform
     * @since 12
     */
    interface AudioVolumeManager {
        /**
         * Obtains an AudioVolumeGroupManager instance. This method uses an asynchronous callback to return the result.
         * @param { number } groupId - volume group id, use LOCAL_VOLUME_GROUP_ID in default
         * @param { AsyncCallback<AudioVolumeGroupManager> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains an AudioVolumeGroupManager instance. This method uses an asynchronous callback to return the result.
         * @param { number } groupId - volume group id, use LOCAL_VOLUME_GROUP_ID in default
         * @param { AsyncCallback<AudioVolumeGroupManager> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getVolumeGroupManager(groupId: number, callback: AsyncCallback<AudioVolumeGroupManager>): void;
        /**
         * Obtains an AudioVolumeGroupManager instance. This method uses a promise to return the result.
         * @param { number } groupId - volume group id, use LOCAL_VOLUME_GROUP_ID in default
         * @returns { Promise<AudioVolumeGroupManager> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains an AudioVolumeGroupManager instance. This method uses a promise to return the result.
         * @param { number } groupId - volume group id, use LOCAL_VOLUME_GROUP_ID in default
         * @returns { Promise<AudioVolumeGroupManager> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getVolumeGroupManager(groupId: number): Promise<AudioVolumeGroupManager>;
        /**
         * Obtains an AudioVolumeGroupManager instance.
         * @param { number } groupId - volume group id, use LOCAL_VOLUME_GROUP_ID in default
         * @returns { AudioVolumeGroupManager } The audio volume group manager instance.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Obtains an AudioVolumeGroupManager instance.
         * @param { number } groupId - volume group id, use LOCAL_VOLUME_GROUP_ID in default
         * @returns { AudioVolumeGroupManager } The audio volume group manager instance.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getVolumeGroupManagerSync(groupId: number): AudioVolumeGroupManager;
        /**
         * Listens for system volume change events. This method uses a callback to get volume change events.
         * @param { 'volumeChange' } type - Type of the event to listen for. Only the volumeChange event is supported.
         * @param { Callback<VolumeEvent> } callback - Callback used to get the system volume change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Listens for system volume change events. This method uses a callback to get volume change events.
         * @param { 'volumeChange' } type - Type of the event to listen for. Only the volumeChange event is supported.
         * @param { Callback<VolumeEvent> } callback - Callback used to get the system volume change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        on(type: 'volumeChange', callback: Callback<VolumeEvent>): void;
        /**
         * Unsubscribes to the volume change events..
         * @param { 'volumeChange' } type - Type of the event to be unsubscribed. Only the volumeChange event is supported.
         * @param { Callback<VolumeEvent> } callback - Callback used to obtain the invoking volume change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters missing;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 12
         */
        off(type: 'volumeChange', callback?: Callback<VolumeEvent>): void;
    }
    /**
     * Implements audio volume group management.
     * @typedef AudioVolumeGroupManager
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @since 9
     */
    /**
     * Implements audio volume group management.
     * @typedef AudioVolumeGroupManager
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @crossplatform
     * @since 12
     */
    interface AudioVolumeGroupManager {
        /**
         * Obtains the volume of a stream. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<number> } callback - Callback used to return the volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains the volume of a stream. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<number> } callback - Callback used to return the volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
        /**
         * Obtains the volume of a stream. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<number> } Promise used to return the volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains the volume of a stream. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<number> } Promise used to return the volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getVolume(volumeType: AudioVolumeType): Promise<number>;
        /**
         * Obtains the volume of a stream.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { number } Current system volume level.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Obtains the volume of a stream.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { number } Current system volume level.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getVolumeSync(volumeType: AudioVolumeType): number;
        /**
         * Obtains the minimum volume allowed for a stream. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<number> } callback - Callback used to return the minimum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains the minimum volume allowed for a stream. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<number> } callback - Callback used to return the minimum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getMinVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
        /**
         * Obtains the minimum volume allowed for a stream. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<number> } Promise used to return the minimum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains the minimum volume allowed for a stream. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<number> } Promise used to return the minimum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getMinVolume(volumeType: AudioVolumeType): Promise<number>;
        /**
         * Obtains the minimum volume allowed for a stream.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { number } Min volume level.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Obtains the minimum volume allowed for a stream.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { number } Min volume level.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getMinVolumeSync(volumeType: AudioVolumeType): number;
        /**
         * Obtains the maximum volume allowed for a stream. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<number> } callback - Callback used to return the maximum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains the maximum volume allowed for a stream. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<number> } callback - Callback used to return the maximum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getMaxVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
        /**
         * Obtains the maximum volume allowed for a stream. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<number> } Promise used to return the maximum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains the maximum volume allowed for a stream. This method uses a promise to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<number> } Promise used to return the maximum volume.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getMaxVolume(volumeType: AudioVolumeType): Promise<number>;
        /**
         * Obtains the maximum volume allowed for a stream.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { number } Max volume level.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Obtains the maximum volume allowed for a stream.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { number } Max volume level.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getMaxVolumeSync(volumeType: AudioVolumeType): number;
        /**
         * Checks whether a stream is muted. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<boolean> } callback - Callback used to return the mute status of the stream. The
         * value true means that the stream is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Checks whether a stream is muted. This method uses an asynchronous callback to return the query result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @param { AsyncCallback<boolean> } callback - Callback used to return the mute status of the stream. The
         * value true means that the stream is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        isMute(volumeType: AudioVolumeType, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether a stream is muted. This method uses a promise to return the result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<boolean> } Promise used to return the mute status of the stream. The value true
         * means that the stream is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Checks whether a stream is muted. This method uses a promise to return the result.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { Promise<boolean> } Promise used to return the mute status of the stream. The value true
         * means that the stream is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        isMute(volumeType: AudioVolumeType): Promise<boolean>;
        /**
         * Checks whether a stream is muted.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { boolean } The mute status of the stream. The value true
         * means that the stream is muted, and false means the opposite.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Checks whether a stream is muted.
         * @param { AudioVolumeType } volumeType - Audio stream type.
         * @returns { boolean } The mute status of the stream. The value true
         * means that the stream is muted, and false means the opposite.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        isMuteSync(volumeType: AudioVolumeType): boolean;
        /**
         * Obtains the ringer mode. This method uses an asynchronous callback to return the query result.
         * @param { AsyncCallback<AudioRingMode> } callback - Callback used to return the ringer mode.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains the ringer mode. This method uses an asynchronous callback to return the query result.
         * @param { AsyncCallback<AudioRingMode> } callback - Callback used to return the ringer mode.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getRingerMode(callback: AsyncCallback<AudioRingMode>): void;
        /**
         * Obtains the ringer mode. This method uses a promise to return the query result.
         * @returns { Promise<AudioRingMode> } Promise used to return the ringer mode.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Obtains the ringer mode. This method uses a promise to return the query result.
         * @returns { Promise<AudioRingMode> } Promise used to return the ringer mode.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getRingerMode(): Promise<AudioRingMode>;
        /**
         * Obtains the ringer mode.
         * @returns { AudioRingMode } Current ringer mode.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Obtains the ringer mode.
         * @returns { AudioRingMode } Current ringer mode.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getRingerModeSync(): AudioRingMode;
        /**
         * Listens for ringer mode change events. This method uses a callback to get ringer mode changes.
         * @param { 'ringerModeChange' } type - Type of the event to listen for. Only the ringerModeChange event is supported.
         * @param { Callback<AudioRingMode> } callback - Callback used to get the updated ringer mode.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        on(type: 'ringerModeChange', callback: Callback<AudioRingMode>): void;
        /**
         * Mutes or unmutes the microphone. This method uses an asynchronous callback to return the result.
         * @permission ohos.permission.MANAGE_AUDIO_CONFIG
         * @param { boolean } mute - Mute status to set. The value true means to mute the microphone, and false means the opposite.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setMicMute
         */
        setMicrophoneMute(mute: boolean, callback: AsyncCallback<void>): void;
        /**
         * Mutes or unmutes the microphone. This method uses a promise to return the result.
         * @permission ohos.permission.MANAGE_AUDIO_CONFIG
         * @param { boolean } mute - Mute status to set. The value true means to mute the microphone, and false means the opposite.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setMicMute
         */
        setMicrophoneMute(mute: boolean): Promise<void>;
        /**
         * Checks whether the microphone is muted. This method uses an asynchronous callback to return the query result.
         * @param { AsyncCallback<boolean> } callback - used to return the mute status of the microphone. The value
         * true means that the microphone is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Checks whether the microphone is muted. This method uses an asynchronous callback to return the query result.
         * @param { AsyncCallback<boolean> } callback - used to return the mute status of the microphone. The value
         * true means that the microphone is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        isMicrophoneMute(callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether the microphone is muted. This method uses a promise to return the query result.
         * @returns { Promise<boolean> } Promise used to return the mute status of the microphone. The value true
         * means that the microphone is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Checks whether the microphone is muted. This method uses a promise to return the query result.
         * @returns { Promise<boolean> } Promise used to return the mute status of the microphone. The value true
         * means that the microphone is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        isMicrophoneMute(): Promise<boolean>;
        /**
         * Checks whether the microphone is muted.
         * @returns { boolean } The mute status of the microphone. The value true
         * means that the microphone is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Checks whether the microphone is muted.
         * @returns { boolean } The mute status of the microphone. The value true
         * means that the microphone is muted, and false means the opposite.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        isMicrophoneMuteSync(): boolean;
        /**
         * Listens for system microphone state change events. This method uses a callback to get microphone change events.
         * @param { 'micStateChange' } type - Type of the event to listen for. Only the micStateChange event is supported.
         * @param { Callback<MicStateChangeEvent> } callback - Callback used to get the system microphone state change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        on(type: 'micStateChange', callback: Callback<MicStateChangeEvent>): void;
        /**
         * Unsubscribes to the microphone state change events.
         * @param { 'micStateChange' } type - Type of the event to listen for.
         * @param { Callback<MicStateChangeEvent> } callback - Callback used to get the system microphone state change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters missing;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 12
         */
        off(type: 'micStateChange', callback?: Callback<MicStateChangeEvent>): void;
        /**
         * Gets if this volume group is volume unadjustable.
         * @returns { boolean } Whether it is volume unadjustable.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Gets if this volume group is volume unadjustable.
         * @returns { boolean } Whether it is volume unadjustable.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        isVolumeUnadjustable(): boolean;
        /**
         * Gets the volume db value that system calculate by volume type, volume level and device type.
         * This method uses an asynchronous callback to return the result.
         * @param { AudioVolumeType } volumeType - Audio volume type.
         * @param { number } volumeLevel - Volume level to set.
         * @param { DeviceType } device - Output device type.
         * @param { AsyncCallback<number> } callback - Callback used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by callback.
         * @throws { BusinessError } 6800301 - System error. Return by callback.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Gets the volume db value that system calculate by volume type, volume level and device type.
         * This method uses an asynchronous callback to return the result.
         * @param { AudioVolumeType } volumeType - Audio volume type.
         * @param { number } volumeLevel - Volume level to set.
         * @param { DeviceType } device - Output device type.
         * @param { AsyncCallback<number> } callback - Callback used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by callback.
         * @throws { BusinessError } 6800301 - System error. Return by callback.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getSystemVolumeInDb(volumeType: AudioVolumeType, volumeLevel: number, device: DeviceType, callback: AsyncCallback<number>): void;
        /**
         * Gets the volume db value that system calculate by volume type, volume level and device type.
         * This method uses a promise to return the result.
         * @param { AudioVolumeType } volumeType - Audio volume type.
         * @param { number } volumeLevel - Volume level to set.
         * @param { DeviceType } device - Output device type.
         * @returns { Promise<number> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by promise.
         * @throws { BusinessError } 6800301 - System error. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Gets the volume db value that system calculate by volume type, volume level and device type.
         * This method uses a promise to return the result.
         * @param { AudioVolumeType } volumeType - Audio volume type.
         * @param { number } volumeLevel - Volume level to set.
         * @param { DeviceType } device - Output device type.
         * @returns { Promise<number> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by promise.
         * @throws { BusinessError } 6800301 - System error. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getSystemVolumeInDb(volumeType: AudioVolumeType, volumeLevel: number, device: DeviceType): Promise<number>;
        /**
         * Gets the volume db value that system calculate by volume type, volume level and device type.
         * @param { AudioVolumeType } volumeType - Audio volume type.
         * @param { number } volumeLevel - Volume level to set.
         * @param { DeviceType } device - Output device type.
         * @returns { number } The system volume in dB.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 10
         */
        /**
         * Gets the volume db value that system calculate by volume type, volume level and device type.
         * @param { AudioVolumeType } volumeType - Audio volume type.
         * @param { number } volumeLevel - Volume level to set.
         * @param { DeviceType } device - Output device type.
         * @returns { number } The system volume in dB.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        getSystemVolumeInDbSync(volumeType: AudioVolumeType, volumeLevel: number, device: DeviceType): number;
        /**
         * Gets the max amplitude value for a specific input device.
         * This method uses a promise to return the result.
         * @param { AudioDeviceDescriptor } inputDevice - the target device.
         * @returns { Promise<number> } Promise used to return the max amplitude value.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by promise.
         * @throws { BusinessError } 6800301 - System error. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 12
         */
        getMaxAmplitudeForInputDevice(inputDevice: AudioDeviceDescriptor): Promise<number>;
        /**
         * Gets the max amplitude value for a specific output device.
         * This method uses a promise to return the result.
         * @param { AudioDeviceDescriptor } outputDevice - the target device.
         * @returns { Promise<number> } Promise used to return the max amplitude value.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by promise.
         * @throws { BusinessError } 6800301 - System error. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 12
         */
        getMaxAmplitudeForOutputDevice(outputDevice: AudioDeviceDescriptor): Promise<number>;
    }
    /**
     * Array of AudioRendererChangeInfo, which is read-only.
     * @typedef { Array<Readonly<AudioRendererChangeInfo>> } AudioRendererChangeInfoArray
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 9
     */
    /**
     * Array of AudioRendererChangeInfo, which is read-only.
     * @typedef { Array<Readonly<AudioRendererChangeInfo>> } AudioRendererChangeInfoArray
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @crossplatform
     * @since 12
     */
    type AudioRendererChangeInfoArray = Array<Readonly<AudioRendererChangeInfo>>;
    /**
     * Describes audio renderer change information.
     * @typedef AudioRendererChangeInfo
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 9
     */
    /**
     * Describes audio renderer change information.
     * @typedef AudioRendererChangeInfo
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @crossplatform
     * @since 12
     */
    interface AudioRendererChangeInfo {
        /**
         * Audio stream unique id.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Audio stream unique id.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        readonly streamId: number;
        /**
         * Audio renderer information.
         * @type { AudioRendererInfo }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Audio renderer information.
         * @type { AudioRendererInfo }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        readonly rendererInfo: AudioRendererInfo;
        /**
         * Audio output devices.
         * @type { AudioDeviceDescriptors }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Audio output devices.
         * @type { AudioDeviceDescriptors }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        readonly deviceDescriptors: AudioDeviceDescriptors;
    }
    /**
     * Array of AudioCapturerChangeInfo, which is read-only.
     * @typedef { Array<Readonly<AudioCapturerChangeInfo>> } AudioCapturerChangeInfoArray
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @since 9
     */
    /**
     * Array of AudioCapturerChangeInfo, which is read-only.
     * @typedef { Array<Readonly<AudioCapturerChangeInfo>> } AudioCapturerChangeInfoArray
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @crossplatform
     * @since 12
     */
    type AudioCapturerChangeInfoArray = Array<Readonly<AudioCapturerChangeInfo>>;
    /**
     * Describes audio capturer change information.
     * @typedef AudioCapturerChangeInfo
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @since 9
     */
    /**
     * Describes audio capturer change information.
     * @typedef AudioCapturerChangeInfo
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @crossplatform
     * @since 12
     */
    interface AudioCapturerChangeInfo {
        /**
         * Audio stream unique id.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 9
         */
        /**
         * Audio stream unique id.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        readonly streamId: number;
        /**
         * Audio capturer information.
         * @type { AudioCapturerInfo }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 9
         */
        /**
         * Audio capturer information.
         * @type { AudioCapturerInfo }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        readonly capturerInfo: AudioCapturerInfo;
        /**
         * Audio input devices.
         * @type { AudioDeviceDescriptors }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 9
         */
        /**
         * Audio input devices.
         * @type { AudioDeviceDescriptors }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        readonly deviceDescriptors: AudioDeviceDescriptors;
        /**
         * Audio capturer muted status.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 11
         */
        /**
         * Audio capturer muted status.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        readonly muted?: boolean;
    }
    /**
     * Describes an audio device.
     * @typedef AudioDeviceDescriptor
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 7
     */
    /**
     * Describes an audio device.
     * @typedef AudioDeviceDescriptor
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface AudioDeviceDescriptor {
        /**
         * Audio device role.
         * @type { DeviceRole }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Audio device role.
         * @type { DeviceRole }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly deviceRole: DeviceRole;
        /**
         * Audio device type.
         * @type { DeviceType }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        /**
         * Audio device type.
         * @type { DeviceType }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly deviceType: DeviceType;
        /**
         * Audio device id.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Audio device id.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly id: number;
        /**
         * Audio device name.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Audio device name.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly name: string;
        /**
         * Audio device address.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Audio device address.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly address: string;
        /**
         * Supported sampling rates.
         * @type { Array<number> }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Supported sampling rates.
         * @type { Array<number> }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly sampleRates: Array<number>;
        /**
         * Supported channel counts.
         * @type { Array<number> }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Supported channel counts.
         * @type { Array<number> }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly channelCounts: Array<number>;
        /**
         * Supported channel masks.
         * @type { Array<number> }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        /**
         * Supported channel masks.
         * @type { Array<number> }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly channelMasks: Array<number>;
        /**
         * Name used to display, considering distributed device situation.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Name used to display, considering distributed device situation.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly displayName: string;
        /**
         * Supported encoding types.
         * @type { ?Array<AudioEncodingType> }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Supported encoding types.
         * @type { ?Array<AudioEncodingType> }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly encodingTypes?: Array<AudioEncodingType>;
    }
    /**
     * Array of AudioDeviceDescriptors, which is read-only.
     * @typedef { Array<Readonly<AudioDeviceDescriptor>> } AudioDeviceDescriptors
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 7
     */
    /**
     * Array of AudioDeviceDescriptors, which is read-only.
     * @typedef { Array<Readonly<AudioDeviceDescriptor>> } AudioDeviceDescriptors
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type AudioDeviceDescriptors = Array<Readonly<AudioDeviceDescriptor>>;
    /**
     * Describes the volume event received by the app when the volume is changed.
     * @typedef VolumeEvent
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @since 9
     */
    /**
     * Describes the volume event received by the app when the volume is changed.
     * @typedef VolumeEvent
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @crossplatform
     * @since 12
     */
    interface VolumeEvent {
        /**
         * Volume type of the current stream.
         * @type { AudioVolumeType }
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
        * Volume type of the current stream.
         * @type { AudioVolumeType }
        * @syscap SystemCapability.Multimedia.Audio.Volume
        * @crossplatform
        * @since 12
        */
        volumeType: AudioVolumeType;
        /**
         * Volume level.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        /**
         * Volume level.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @crossplatform
         * @since 12
         */
        volume: number;
        /**
         * Whether to show the volume change in UI.
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Audio.Volume
         * @since 9
         */
        updateUi: boolean;
    }
    /**
     * Describes the callback invoked for audio interruption or focus gain events.When the audio of an application
     * is interrupted by another application, the callback is invoked to notify the former application.
     * @typedef InterruptAction
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.InterruptEvent
     */
    interface InterruptAction {
        /**
         * Event type.
         * The value TYPE_ACTIVATED means the focus gain event, and TYPE_INTERRUPT means the audio interruption event.
         * @type { InterruptActionType }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 9
         */
        actionType: InterruptActionType;
        /**
         * Type of the audio interruption event.
         * @type { ?InterruptType }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 9
         */
        type?: InterruptType;
        /**
         * Hint for the audio interruption event.
         * @type { ?InterruptHint }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 9
         */
        hint?: InterruptHint;
        /**
         * Whether the focus is gained or released. The value true means that the focus is gained or released,
         * and false means that the focus fails to be gained or released.
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 9
         */
        activated?: boolean;
    }
    /**
     * Describes input parameters of audio listening events.
     * @typedef AudioInterrupt
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 7
     * @deprecated since 9
     */
    interface AudioInterrupt {
        /**
         * Audio stream usage type.
         * @type { StreamUsage }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 9
         */
        streamUsage: StreamUsage;
        /**
         * Type of the media interrupted.
         * @type { ContentType }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 9
         */
        contentType: ContentType;
        /**
         * Whether audio playback can be paused when it is interrupted.
         * The value true means that audio playback can be paused when it is interrupted, and false means the opposite.
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 7
         * @deprecated since 9
         */
        pauseWhenDucked: boolean;
    }
    /**
     * Describes the microphone state change event received by the app when the microphone state is changed.
     * @typedef MicStateChangeEvent
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 9
     */
    interface MicStateChangeEvent {
        /**
         * Mic mute state.
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 9
         */
        mute: boolean;
    }
    /**
     * Describes the device change type and device information.
     * @typedef DeviceChangeAction
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 7
     */
    interface DeviceChangeAction {
        /**
         * Device change type.
         * @type { DeviceChangeType }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        type: DeviceChangeType;
        /**
         * Device information.
         * @type { AudioDeviceDescriptors }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 7
         */
        deviceDescriptors: AudioDeviceDescriptors;
    }
    /**
     * Enumerates channel blend mode.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 11
     */
    /**
     * Enumerates channel blend mode.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    enum ChannelBlendMode {
        /**
         * No channel process.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * No channel process.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        MODE_DEFAULT = 0,
        /**
         * Blend left and right channel.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Blend left and right channel.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        MODE_BLEND_LR = 1,
        /**
         * Replicate left to right channel.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Replicate left to right channel.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        MODE_ALL_LEFT = 2,
        /**
         * Replicate right to left channel.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Replicate right to left channel.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        MODE_ALL_RIGHT = 3
    }
    /**
     * Enumerates audio stream device change reason.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 11
     */
    /**
     * Enumerates audio stream device change reason.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum AudioStreamDeviceChangeReason {
        /**
         * Unknown.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Unknown.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        REASON_UNKNOWN = 0,
        /**
         * New device available.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * New device available.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        REASON_NEW_DEVICE_AVAILABLE = 1,
        /**
         * Old device unavailable. Applications should consider to pause the audio playback when this reason is
         * reported.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Old device unavailable. Applications should consider to pause the audio playback when this reason is
         * reported.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        REASON_OLD_DEVICE_UNAVAILABLE = 2,
        /**
         * Overrode by user or system.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Overrode by user or system.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        REASON_OVERRODE = 3
    }
    /**
     * Audio stream device change info.
     * @typedef AudioStreamDeviceChangeInfo
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @since 11
     */
    /**
     * Audio stream device change info.
     * @typedef AudioStreamDeviceChangeInfo
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface AudioStreamDeviceChangeInfo {
        /**
         * Audio device descriptors after change.
         * @type { AudioDeviceDescriptors }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Audio device descriptors after change.
         * @type { AudioDeviceDescriptors }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        devices: AudioDeviceDescriptors;
        /**
         * Audio stream device change reason.
         * @type { AudioStreamDeviceChangeReason }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Audio stream device change reason.
         * @type { AudioStreamDeviceChangeReason }
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        changeReason: AudioStreamDeviceChangeReason;
    }
    /**
     * Enumerates callback result.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 12
     */
    enum AudioDataCallbackResult {
        /**
         * Indicates data of this callback is invalid.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 12
         */
        INVALID = -1,
        /**
         * Indicates data of this callback is valid.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 12
         */
        VALID = 0
    }
    /**
     * Type definition of callback function for audio renderer write data.
     *
     * @typedef { function } AudioRendererWriteDataCallback
     * @param { ArrayBuffer } data - audio data array buffer.
     * @returns { AudioDataCallbackResult | void } result of callback or void. If void or AudioDataCallbackResult.VALID is
     * returned, it indicates the data is valid and will be played. If AudioDataCallbackResult.INVALID is returned, it
     * indicates the data is will not be played.
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 12
     */
    type AudioRendererWriteDataCallback = (data: ArrayBuffer) => AudioDataCallbackResult | void;
    /**
     * Provides audio playback APIs.
     * @typedef AudioRenderer
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 8
     */
    /**
     * Provides audio playback APIs.
     * @typedef AudioRenderer
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @crossplatform
     * @since 12
     */
    interface AudioRenderer {
        /**
         * Defines the current render state.
         * @type { AudioState }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Defines the current render state.
         * @type { AudioState }
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        readonly state: AudioState;
        /**
         * Obtains the renderer information provided while creating a renderer instance. This method uses an asynchronous
         * callback to return the result.
         * @param { AsyncCallback<AudioRendererInfo> } callback - Callback used to return the renderer information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Obtains the renderer information provided while creating a renderer instance. This method uses an asynchronous
         * callback to return the result.
         * @param { AsyncCallback<AudioRendererInfo> } callback - Callback used to return the renderer information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getRendererInfo(callback: AsyncCallback<AudioRendererInfo>): void;
        /**
         * Obtains the renderer information provided while creating a renderer instance. This method uses a promise to
         * return the result.
         * @returns { Promise<AudioRendererInfo> } Promise used to return the renderer information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Obtains the renderer information provided while creating a renderer instance. This method uses a promise to
         * return the result.
         * @returns { Promise<AudioRendererInfo> } Promise used to return the renderer information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getRendererInfo(): Promise<AudioRendererInfo>;
        /**
         * Obtains the renderer information provided while creating a renderer instance.
         * @returns { AudioRendererInfo } The renderer information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Obtains the renderer information provided while creating a renderer instance.
         * @returns { AudioRendererInfo } The renderer information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getRendererInfoSync(): AudioRendererInfo;
        /**
         * Obtains the renderer stream information. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<AudioStreamInfo> } callback - Callback used to return the stream information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Obtains the renderer stream information. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<AudioStreamInfo> } callback - Callback used to return the stream information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getStreamInfo(callback: AsyncCallback<AudioStreamInfo>): void;
        /**
         * Obtains the renderer stream information. This method uses a promise to return the result.
         * @returns { Promise<AudioStreamInfo> } Promise used to return the stream information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Obtains the renderer stream information. This method uses a promise to return the result.
         * @returns { Promise<AudioStreamInfo> } Promise used to return the stream information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getStreamInfo(): Promise<AudioStreamInfo>;
        /**
         * Obtains the renderer stream information.
         * @returns { AudioStreamInfo } The stream information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Obtains the renderer stream information.
         * @returns { AudioStreamInfo } The stream information.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getStreamInfoSync(): AudioStreamInfo;
        /**
         * Obtains the renderer stream id. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the stream id.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Obtains the renderer stream id. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the stream id.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getAudioStreamId(callback: AsyncCallback<number>): void;
        /**
         * Obtains the renderer stream id. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the stream id.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Obtains the renderer stream id. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the stream id.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getAudioStreamId(): Promise<number>;
        /**
         * Obtains the renderer stream id.
         * @returns { number } The stream id.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Obtains the renderer stream id.
         * @returns { number } The stream id.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getAudioStreamIdSync(): number;
        /**
         * Obtains the current audio effect mode. This method uses an asynchronous callback to return the query result.
         * @param { AsyncCallback<AudioEffectMode> } callback - Callback used to return the current audio effect mode.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        getAudioEffectMode(callback: AsyncCallback<AudioEffectMode>): void;
        /**
         * Obtains the current audio effect mode. This method uses a promise to return the query result.
         * @returns { Promise<AudioEffectMode> } Promise used to return the current audio effect mode.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        getAudioEffectMode(): Promise<AudioEffectMode>;
        /**
         * Sets the current audio effect mode. This method uses an asynchronous callback to return the result.
         * @param { AudioEffectMode } mode - Audio effect mode.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by callback.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        setAudioEffectMode(mode: AudioEffectMode, callback: AsyncCallback<void>): void;
        /**
         * Sets the current audio effect mode. This method uses a promise to return the result.
         * @param { AudioEffectMode } mode - Audio effect mode.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        setAudioEffectMode(mode: AudioEffectMode): Promise<void>;
        /**
         * Starts the renderer.
         * Success: This method uses an asynchronous callback to return the result.
         * Failure: This method uses an asynchronous callback to return the error instance. Possible causes:
         *          6800301: Unsupported state, Audio focus request failed, System error.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Starts the renderer. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        start(callback: AsyncCallback<void>): void;
        /**
         * Starts the renderer.
         * Success: This method uses a promise to return the result.
         * Failure: This method uses a promise to return the error instance. Possible causes:
         *          6800301: Unsupported state, Audio focus request failed, System error.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Starts the renderer. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        start(): Promise<void>;
        /**
         * Writes the buffer. This method uses an asynchronous callback to return the result.
         * @param { ArrayBuffer } buffer - Buffer to be written.
         * @param { AsyncCallback<number> } callback - Returns the number of bytes written if the operation is successful.
         *        Returns an error code otherwise.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioRenderer#event:writeData
         */
        write(buffer: ArrayBuffer, callback: AsyncCallback<number>): void;
        /**
         * Writes the buffer. This method uses a promise to return the result.
         * @param { ArrayBuffer } buffer - Buffer to be written.
         * @returns { Promise<number> } Returns the number of bytes written if the operation is successful.
         *          Returns an error code otherwise.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioRenderer#event:writeData
         */
        write(buffer: ArrayBuffer): Promise<number>;
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses an
         * asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses an
         * asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getAudioTime(callback: AsyncCallback<number>): void;
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses a
         * promise to return the result.
         * @returns { Promise<number> } Promise used to return the timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses a
         * promise to return the result.
         * @returns { Promise<number> } Promise used to return the timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getAudioTime(): Promise<number>;
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds.
         * @returns { number } The audio timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds.
         * @returns { number } The audio timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getAudioTimeSync(): number;
        /**
         * Drains the playback buffer. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Drains the playback buffer. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        drain(callback: AsyncCallback<void>): void;
        /**
         * Drains the playback buffer. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Drains the playback buffer. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        drain(): Promise<void>;
        /**
         * Flushes the playback buffer. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 6800103 - Operation not permit at current state. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 11
         */
        /**
         * Flushes the playback buffer. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 6800103 - Operation not permit at current state. Return by promise.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        flush(): Promise<void>;
        /**
         * Pauses rendering. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Pauses rendering. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        pause(callback: AsyncCallback<void>): void;
        /**
         * Pauses rendering. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Pauses rendering. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        pause(): Promise<void>;
        /**
         * Stops rendering. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Stops rendering. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        stop(callback: AsyncCallback<void>): void;
        /**
         * Stops rendering. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Stops rendering. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        stop(): Promise<void>;
        /**
         * Releases the renderer. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Releases the renderer. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Releases the renderer. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Releases the renderer. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        release(): Promise<void>;
        /**
         * Obtains a reasonable minimum buffer size in bytes for rendering. This method uses an asynchronous callback to
         * return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Obtains a reasonable minimum buffer size in bytes for rendering. This method uses an asynchronous callback to
         * return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getBufferSize(callback: AsyncCallback<number>): void;
        /**
         * Obtains a reasonable minimum buffer size in bytes for rendering. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Obtains a reasonable minimum buffer size in bytes for rendering. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getBufferSize(): Promise<number>;
        /**
         * Obtains a reasonable minimum buffer size in bytes for rendering.
         * @returns { number } The audio buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Obtains a reasonable minimum buffer size in bytes for rendering.
         * @returns { number } The audio buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getBufferSizeSync(): number;
        /**
         * Sets the render rate. This method uses an asynchronous callback to return the result.
         * @param { AudioRendererRate } rate - Audio render rate.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioRenderer#setSpeed
         */
        setRenderRate(rate: AudioRendererRate, callback: AsyncCallback<void>): void;
        /**
         * Sets the render rate. This method uses a promise to return the result.
         * @param { AudioRendererRate } rate - Audio render rate.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioRenderer#setSpeed
         */
        setRenderRate(rate: AudioRendererRate): Promise<void>;
        /**
         * Sets the playback speed.
         * @param { number } speed -  Audio playback speed. The value type is float, form 0.25 to 4.0.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 11
         */
        /**
         * Sets the playback speed.
         * @param { number } speed -  Audio playback speed. The value type is float, form 0.25 to 4.0.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        setSpeed(speed: number): void;
        /**
         * Obtains the current render rate. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<AudioRendererRate> } callback - Callback used to return the audio render rate.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioRenderer#getSpeed
         */
        getRenderRate(callback: AsyncCallback<AudioRendererRate>): void;
        /**
         * Obtains the current render rate. This method uses a promise to return the result.
         * @returns { Promise<AudioRendererRate> } Promise used to return the audio render rate.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioRenderer#getSpeed
         */
        getRenderRate(): Promise<AudioRendererRate>;
        /**
         * Obtains the current render rate.
         * @returns { AudioRendererRate } The audio render rate.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioRenderer#getSpeed
         */
        getRenderRateSync(): AudioRendererRate;
        /**
         * Obtains the current playback speed.
         * @returns { number } The playback speed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 11
         */
        /**
         * Obtains the current playback speed.
         * @returns { number } The playback speed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getSpeed(): number;
        /**
         * Set interrupt mode.
         * @param { InterruptMode } mode - The interrupt mode.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @since 9
         */
        /**
         * Set interrupt mode.
         * @param { InterruptMode } mode - The interrupt mode.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @crossplatform
         * @since 12
         */
        setInterruptMode(mode: InterruptMode, callback: AsyncCallback<void>): void;
        /**
         * Set interrupt mode.
         * @param { InterruptMode } mode - The interrupt mode.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @since 9
         */
        /**
         * Set interrupt mode.
         * @param { InterruptMode } mode - The interrupt mode.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @crossplatform
         * @since 12
         */
        setInterruptMode(mode: InterruptMode): Promise<void>;
        /**
         * Set interrupt mode.
         * @param { InterruptMode } mode - The interrupt mode.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @since 10
         */
        /**
         * Set interrupt mode.
         * @param { InterruptMode } mode - The interrupt mode.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @crossplatform
         * @since 12
         */
        setInterruptModeSync(mode: InterruptMode): void;
        /**
         * Sets the volume for this stream. This method uses an asynchronous callback to return the result.
         * @param { number } volume - Volume to set. The value type is float, form 0.0 to 1.0.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Sets the volume for this stream. This method uses an asynchronous callback to return the result.
         * @param { number } volume - Volume to set. The value type is float, form 0.0 to 1.0.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        setVolume(volume: number, callback: AsyncCallback<void>): void;
        /**
         * Sets the volume for a stream. This method uses a promise to return the result.
         * @param { number } volume - Volume to set. The value type is float, form 0.0 to 1.0.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 9
         */
        /**
         * Sets the volume for a stream. This method uses a promise to return the result.
         * @param { number } volume - Volume to set. The value type is float, form 0.0 to 1.0.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        setVolume(volume: number): Promise<void>;
        /**
         * Gets volume of this stream.
         * @returns { number } Returns one float value.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 12
         */
        getVolume(): number;
        /**
         * Changes the volume with ramp for a duration.
         * @param { number } volume - Volume to set. The value type is float, form 0.0 to 1.0.
         * @param { number } duration -  Duration for volume ramp, in millisecond.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 11
         */
        /**
         * Changes the volume with ramp for a duration.
         * @param { number } volume - Volume to set. The value type is float, form 0.0 to 1.0.
         * @param { number } duration -  Duration for volume ramp, in millisecond.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        setVolumeWithRamp(volume: number, duration: number): void;
        /**
         * Gets the min volume this stream can set. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Gets the min volume this stream can set. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getMinStreamVolume(callback: AsyncCallback<number>): void;
        /**
         * Gets the min volume this stream can set. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Gets the min volume this stream can set. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getMinStreamVolume(): Promise<number>;
        /**
         * Gets the min volume this stream can set.
         * @returns { number } Min stream volume.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Gets the min volume this stream can set.
         * @returns { number } Min stream volume.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getMinStreamVolumeSync(): number;
        /**
         * Gets the max volume this stream can set. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Gets the max volume this stream can set. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getMaxStreamVolume(callback: AsyncCallback<number>): void;
        /**
         * Gets the max volume this stream can set. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Gets the max volume this stream can set. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getMaxStreamVolume(): Promise<number>;
        /**
         * Gets the max volume this stream can set.
         * @returns { number } Max stream volume.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Gets the max volume this stream can set.
         * @returns { number } Max stream volume.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getMaxStreamVolumeSync(): number;
        /**
         * Gets buffer underflow count. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Gets buffer underflow count. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getUnderflowCount(callback: AsyncCallback<number>): void;
        /**
         * Gets buffer underflow count. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Gets buffer underflow count. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getUnderflowCount(): Promise<number>;
        /**
         * Gets buffer underflow count.
         * @returns { number } Underflow count number.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Gets buffer underflow count.
         * @returns { number } Underflow count number.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        getUnderflowCountSync(): number;
        /**
         * Gets the output device or devices for this stream.
         * This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<AudioDeviceDescriptors> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Gets the output device or devices for this stream.
         * This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<AudioDeviceDescriptors> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getCurrentOutputDevices(callback: AsyncCallback<AudioDeviceDescriptors>): void;
        /**
         * Gets the output device or devices for this stream.
         * This method uses a promise to return the result.
         * @returns { Promise<AudioDeviceDescriptors> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Gets the output device or devices for this stream.
         * This method uses a promise to return the result.
         * @returns { Promise<AudioDeviceDescriptors> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getCurrentOutputDevices(): Promise<AudioDeviceDescriptors>;
        /**
         * Gets the output device or devices for this stream.
         * @returns { AudioDeviceDescriptors } Output device or devices.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Gets the output device or devices for this stream.
         * @returns { AudioDeviceDescriptors } Output device or devices.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getCurrentOutputDevicesSync(): AudioDeviceDescriptors;
        /**
         * Sets channel blend mode for this stream.
         * @param { ChannelBlendMode } mode - Target channel blend mode.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @throws { BusinessError } 6800103 - Operation not permit at current state.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 11
         */
        /**
         * Sets channel blend mode for this stream.
         * @param { ChannelBlendMode } mode - Target channel blend mode.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @throws { BusinessError } 6800103 - Operation not permit at current state.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        setChannelBlendMode(mode: ChannelBlendMode): void;
        /**
         * Sets silent and mix with other stream for this stream.
         * @param { boolean } on - Whether play silent and mix with other streams.
         *     true: set the silent mode and mix with other streams.
         *     false: unset the silent mode, current stream will trigger the audio focus internally.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 12
         */
        setSilentModeAndMixWithOthers(on: boolean): void;
        /**
         * Gets silent and mix with other stream status for this stream.
         * @returns { boolean } Returns silent and mix with other stream status.
         *     true: current stream is in the silent mode and mix with other streams.
         *     false: current stream in in the normal playback mode
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 12
         */
        getSilentModeAndMixWithOthers(): boolean;
        /**
         * Listens for audio interrupt events. This method uses a callback to get interrupt events. The interrupt event is
         * triggered when audio playback is interrupted.
         * @param { 'audioInterrupt' } type - Type of the event to listen for. Only the audioInterrupt event is supported.
         * @param { Callback<InterruptEvent> } callback - Callback used to listen for interrupt callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @since 9
         */
        /**
         * Listens for audio interrupt events. This method uses a callback to get interrupt events. The interrupt event is
         * triggered when audio playback is interrupted.
         * @param { 'audioInterrupt' } type - Type of the event to listen for. Only the audioInterrupt event is supported.
         * @param { Callback<InterruptEvent> } callback - Callback used to listen for interrupt callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @crossplatform
         * @since 12
         */
        on(type: 'audioInterrupt', callback: Callback<InterruptEvent>): void;
        /**
         * Subscribes to mark reached events. When the number of frames rendered reaches the value of the frame parameter,
         * the callback is invoked.
         * @param { 'markReach' } type - Type of the event to listen for. Only the markReach event is supported.
         * @param { number } frame - Number of frames to trigger the event. The value must be greater than 0.
         * @param { Callback<number> } callback - Callback invoked when the event is triggered.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Subscribes to mark reached events. When the number of frames rendered reaches the value of the frame parameter,
         * the callback is invoked.
         * @param { 'markReach' } type - Type of the event to listen for. Only the markReach event is supported.
         * @param { number } frame - Number of frames to trigger the event. The value must be greater than 0.
         * @param { Callback<number> } callback - Callback invoked when the event is triggered.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        on(type: 'markReach', frame: number, callback: Callback<number>): void;
        /**
         * Unsubscribes from mark reached events.
         * @param { 'markReach' } type - Type of the event to listen for. Only the markReach event is supported.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Unsubscribes from mark reached events.
         * @param { 'markReach' } type - Type of the event to listen for. Only the markReach event is supported.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        off(type: 'markReach'): void;
        /**
         * Subscribes to period reached events. When the period of frame rendering reaches the value of frame parameter,
         * the callback is invoked.
         * @param { 'periodReach' } type - Type of the event to listen for. Only the periodReach event is supported.
         * @param { number } frame - Period during which frame rendering is listened. The value must be greater than 0.
         * @param { Callback<number> } callback - Callback invoked when the event is triggered.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Subscribes to period reached events. When the period of frame rendering reaches the value of frame parameter,
         * the callback is invoked.
         * @param { 'periodReach' } type - Type of the event to listen for. Only the periodReach event is supported.
         * @param { number } frame - Period during which frame rendering is listened. The value must be greater than 0.
         * @param { Callback<number> } callback - Callback invoked when the event is triggered.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        on(type: 'periodReach', frame: number, callback: Callback<number>): void;
        /**
         * Unsubscribes from period reached events.
         * @param { 'periodReach' } type - Type of the event to listen for. Only the periodReach event is supported.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Unsubscribes from period reached events.
         * @param { 'periodReach' } type - Type of the event to listen for. Only the periodReach event is supported.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        off(type: 'periodReach'): void;
        /**
         * Subscribes audio state change event callback.
         * @param { 'stateChange' } type - Type of the event to listen for. Only the stateChange event is supported.
         * @param { Callback<AudioState> } callback - Callback invoked when state change.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 8
         */
        /**
         * Subscribes audio state change event callback.
         * @param { 'stateChange' } type - Type of the event to listen for. Only the stateChange event is supported.
         * @param { Callback<AudioState> } callback - Callback invoked when state change.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        on(type: 'stateChange', callback: Callback<AudioState>): void;
        /**
         * Subscribes output device change event callback.
         * The event is triggered when output device change for this stream.
         * @param { 'outputDeviceChange' } type - Type of the event to listen for.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Subscribes output device change event callback.
         * The event is triggered when output device change for this stream.
         * @param { 'outputDeviceChange' } type - Type of the event to listen for.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        on(type: 'outputDeviceChange', callback: Callback<AudioDeviceDescriptors>): void;
        /**
         * Subscribes output device change event callback.
         * The event is triggered when output device change for this stream.
         * @param { 'outputDeviceChangeWithInfo' } type - Type of the event to listen for.
         * @param { Callback<AudioStreamDeviceChangeInfo> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Subscribes output device change event callback.
         * The event is triggered when output device change for this stream.
         * @param { 'outputDeviceChangeWithInfo' } type - Type of the event to listen for.
         * @param { Callback<AudioStreamDeviceChangeInfo> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        on(type: 'outputDeviceChangeWithInfo', callback: Callback<AudioStreamDeviceChangeInfo>): void;
        /**
         * Unsubscribes output device change event callback.
         * @param { 'outputDeviceChange' } type - Type of the event to listen for.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 10
         */
        /**
         * Unsubscribes output device change event callback.
         * @param { 'outputDeviceChange' } type - Type of the event to listen for.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        off(type: 'outputDeviceChange', callback?: Callback<AudioDeviceDescriptors>): void;
        /**
         * Unsubscribes output device change event callback.
         * @param { 'outputDeviceChangeWithInfo' } type - Type of the event to listen for.
         * @param { Callback<AudioStreamDeviceChangeInfo> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Unsubscribes output device change event callback.
         * @param { 'outputDeviceChangeWithInfo' } type - Type of the event to listen for.
         * @param { Callback<AudioStreamDeviceChangeInfo> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        off(type: 'outputDeviceChangeWithInfo', callback?: Callback<AudioStreamDeviceChangeInfo>): void;
        /**
         * Subscribes audio data callback.
         * The event is triggered when audio buffer is available for writing more data.
         * @param { 'writeData' } type - Type of the event to listen for.
         * @param { Callback<ArrayBuffer> } callback - Callback with buffer to write.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 11
         */
        /**
         * Subscribes audio data callback.
         * The event is triggered when audio buffer is available for writing more data.
         * @param { 'writeData' } type - Type of the event to listen for.
         * @param { AudioRendererWriteDataCallback } callback - Audio renderer write data callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        on(type: 'writeData', callback: AudioRendererWriteDataCallback): void;
        /**
         * Unsubscribes audio data callback.
         * @param { 'writeData' } type - Type of the event to listen for.
         * @param { Callback<ArrayBuffer> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 11
         */
        /**
         * Unsubscribes audio data callback.
         * @param { 'writeData' } type - Type of the event to listen for.
         * @param { AudioRendererWriteDataCallback } callback - Audio renderer write data callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @crossplatform
         * @since 12
         */
        off(type: 'writeData', callback?: AudioRendererWriteDataCallback): void;
    }
    /**
     * Enumerates source types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 8
     */
    /**
     * Enumerates source types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    enum SourceType {
        /**
         * Invalid source type.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        SOURCE_TYPE_INVALID = -1,
        /**
         * Mic source type.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Mic source type.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SOURCE_TYPE_MIC = 0,
        /**
         * Voice recognition source type.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 9
         */
        /**
         * Voice recognition source type.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SOURCE_TYPE_VOICE_RECOGNITION = 1,
        /**
         * Playback capture source type.
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @since 10
         * @deprecated since 12
         * @useinstead OH_AVScreenCapture in native interface.
         */
        SOURCE_TYPE_PLAYBACK_CAPTURE = 2,
        /**
         * Voice communication source type.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Voice communication source type.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        SOURCE_TYPE_VOICE_COMMUNICATION = 7,
        /**
         * Voice message source type.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 12
         */
        SOURCE_TYPE_VOICE_MESSAGE = 10
    }
    /**
     * Describes audio capturer information.
     * @typedef AudioCapturerInfo
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 8
     */
    /**
     * Describes audio capturer information.
     * @typedef AudioCapturerInfo
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    interface AudioCapturerInfo {
        /**
         * Audio source type.
         * @type { SourceType }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Audio source type.
         * @type { SourceType }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        source: SourceType;
        /**
         * Audio capturer flags.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 8
         */
        /**
         * Audio capturer flags.
         * @type { number }
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        capturerFlags: number;
    }
    /**
     * Describes audio capturer configuration options.
     * @typedef AudioCapturerOptions
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @since 8
     */
    /**
     * Describes audio capturer configuration options.
     * @typedef AudioCapturerOptions
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @crossplatform
     * @since 12
     */
    interface AudioCapturerOptions {
        /**
         * Stream information.
         * @type { AudioStreamInfo }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Stream information.
         * @type { AudioStreamInfo }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        streamInfo: AudioStreamInfo;
        /**
         * Capturer information.
         * @type { AudioCapturerInfo }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Capturer information.
         * @type { AudioCapturerInfo }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        capturerInfo: AudioCapturerInfo;
        /**
         * Playback capture config.
         * @type { ?AudioPlaybackCaptureConfig }
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @since 10
         * @deprecated since 12
         * @useinstead OH_AVScreenCapture in native interface.
         */
        playbackCaptureConfig?: AudioPlaybackCaptureConfig;
    }
    /**
     * Describe playback capture filtering options
     * @typedef CaptureFilterOptions
     * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
     * @since 10
     * @deprecated since 12
     * @useinstead OH_AVScreenCapture in native interface.
     */
    interface CaptureFilterOptions {
        /**
         * Filter by stream usages. If you want to capture voice streams, additional permission is needed.
         * @type { Array<StreamUsage> }
         * @permission ohos.permission.CAPTURE_VOICE_DOWNLINK_AUDIO
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @since 10
         */
        /**
         * Filter by stream usages. But not allow to capture voice streams.
         * @type { Array<StreamUsage> }
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @since 11
         * @deprecated since 12
         * @useinstead OH_AVScreenCapture in native interface.
         */
        usages: Array<StreamUsage>;
    }
    /**
     * Describe playback capture config object.
     * @typedef AudioPlaybackCaptureConfig
     * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
     * @since 10
     * @deprecated since 12
     * @useinstead OH_AVScreenCapture in native interface.
     */
    interface AudioPlaybackCaptureConfig {
        /**
         * Add filter options to decide which streams to be captured.
         * @type { CaptureFilterOptions }
         * @syscap SystemCapability.Multimedia.Audio.PlaybackCapture
         * @since 10
         * @deprecated since 12
         * @useinstead OH_AVScreenCapture in native interface.
         */
        filterOptions: CaptureFilterOptions;
    }
    /**
     * Provides APIs for audio recording.
     * @typedef AudioCapturer
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @since 8
     */
    /**
     * Provides APIs for audio recording.
     * @typedef AudioCapturer
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @crossplatform
     * @since 12
     */
    interface AudioCapturer {
        /**
         * Defines the current capture state.
         * @type { AudioState }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Defines the current capture state.
         * @type { AudioState }
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        readonly state: AudioState;
        /**
         * Obtains the capturer information provided while creating a capturer instance. This method uses an asynchronous
         * callback to return the result.
         * @param { AsyncCallback<AudioCapturerInfo> } callback - Callback used to return the capturer information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Obtains the capturer information provided while creating a capturer instance. This method uses an asynchronous
         * callback to return the result.
         * @param { AsyncCallback<AudioCapturerInfo> } callback - Callback used to return the capturer information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getCapturerInfo(callback: AsyncCallback<AudioCapturerInfo>): void;
        /**
         * Obtains the capturer information provided while creating a capturer instance. This method uses a promise to
         * return the result.
         * @returns { Promise<AudioCapturerInfo> } Promise used to return the capturer information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Obtains the capturer information provided while creating a capturer instance. This method uses a promise to
         * return the result.
         * @returns { Promise<AudioCapturerInfo> } Promise used to return the capturer information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getCapturerInfo(): Promise<AudioCapturerInfo>;
        /**
         * Obtains the capturer information provided while creating a capturer instance.
         * @returns { AudioCapturerInfo } The capturer information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 10
         */
        /**
         * Obtains the capturer information provided while creating a capturer instance.
         * @returns { AudioCapturerInfo } The capturer information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getCapturerInfoSync(): AudioCapturerInfo;
        /**
         * Obtains the capturer stream information. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<AudioStreamInfo> } callback - Callback used to return the stream information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Obtains the capturer stream information. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<AudioStreamInfo> } callback - Callback used to return the stream information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getStreamInfo(callback: AsyncCallback<AudioStreamInfo>): void;
        /**
         * Obtains the capturer stream information. This method uses a promise to return the result.
         * @returns { Promise<AudioStreamInfo> } Promise used to return the stream information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Obtains the capturer stream information. This method uses a promise to return the result.
         * @returns { Promise<AudioStreamInfo> } Promise used to return the stream information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getStreamInfo(): Promise<AudioStreamInfo>;
        /**
         * Obtains the capturer stream information.
         * @returns { AudioStreamInfo } The stream information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 10
         */
        /**
         * Obtains the capturer stream information.
         * @returns { AudioStreamInfo } The stream information.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getStreamInfoSync(): AudioStreamInfo;
        /**
         * Obtains the capturer stream id. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the stream id.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 9
         */
        /**
         * Obtains the capturer stream id. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the stream id.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getAudioStreamId(callback: AsyncCallback<number>): void;
        /**
         * Obtains the capturer stream id. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the stream id.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 9
         */
        /**
         * Obtains the capturer stream id. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the stream id.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getAudioStreamId(): Promise<number>;
        /**
         * Obtains the capturer stream id.
         * @returns { number } The stream id.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 10
         */
        /**
         * Obtains the capturer stream id.
         * @returns { number } The stream id.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getAudioStreamIdSync(): number;
        /**
         * Starts capturing.
         * Success: This method uses an asynchronous callback to return the result.
         * Failure: This method uses an asynchronous callback to return the error instance. Possible causes:
         *          6800301: Unsupported state, Audio focus request failed, System error.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Starts capturing. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        start(callback: AsyncCallback<void>): void;
        /**
         * Starts capturing.
         * Success: This method uses a promise to return the result.
         * Failure: This method uses a promise to return the error instance. Possible causes:
         *          6800301: Unsupported state, Audio focus request failed, System error.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Starts capturing. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        start(): Promise<void>;
        /**
         * Reads the buffer from the audio capturer. This method uses an asynchronous callback to return the result.
         * @param { number } size - Number of bytes to read.
         * @param { boolean } isBlockingRead - Whether the read operation should be blocked.
         * @param { AsyncCallback<ArrayBuffer> } callback - Callback used to return the buffer.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioCapturer#event:readData
         */
        read(size: number, isBlockingRead: boolean, callback: AsyncCallback<ArrayBuffer>): void;
        /**
         * Reads the buffer from the audio capturer. This method uses a promise to return the result.
         * @param { number } size - Number of bytes to read.
         * @param { boolean } isBlockingRead - Whether the read operation should be blocked.
         * @returns { Promise<ArrayBuffer> } Returns the buffer data read if the operation is successful.
         *          Returns an error code otherwise.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         * @deprecated since 11
         * @useinstead ohos.multimedia.audio.AudioCapturer#event:readData
         */
        read(size: number, isBlockingRead: boolean): Promise<ArrayBuffer>;
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses an
         * asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses an
         * asynchronous callback to return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getAudioTime(callback: AsyncCallback<number>): void;
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses a
         * promise to return the result.
         * @returns { Promise<number> } Promise used to return the timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses a
         * promise to return the result.
         * @returns { Promise<number> } Promise used to return the timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getAudioTime(): Promise<number>;
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds.
         * @returns { number } The audio timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 10
         */
        /**
         * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds.
         * @returns { number } The audio timestamp.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getAudioTimeSync(): number;
        /**
         * Stops capturing. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Stops capturing. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        stop(callback: AsyncCallback<void>): void;
        /**
         * Stops capturing. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Stops capturing. This method uses a promise to return the result.
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        stop(): Promise<void>;
        /**
         * Releases the capturer. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Releases the capturer. This method uses an asynchronous callback to return the result.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Releases the capturer. This method uses a promise to return the result.
         * @returns { Promise<void> } - Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Releases the capturer. This method uses a promise to return the result.
         * @returns { Promise<void> } - Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        release(): Promise<void>;
        /**
         * Obtains a reasonable minimum buffer size in bytes for capturing. This method uses an asynchronous callback to
         * return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Obtains a reasonable minimum buffer size in bytes for capturing. This method uses an asynchronous callback to
         * return the result.
         * @param { AsyncCallback<number> } callback - Callback used to return the buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getBufferSize(callback: AsyncCallback<number>): void;
        /**
         * Obtains a reasonable minimum buffer size in bytes for capturing. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Obtains a reasonable minimum buffer size in bytes for capturing. This method uses a promise to return the result.
         * @returns { Promise<number> } Promise used to return the buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getBufferSize(): Promise<number>;
        /**
         * Obtains a reasonable minimum buffer size in bytes for capturing.
         * @returns { number } Promise used to return the buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 10
         */
        /**
         * Obtains a reasonable minimum buffer size in bytes for capturing.
         * @returns { number } Promise used to return the buffer size.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        getBufferSizeSync(): number;
        /**
         * Gets the input device or devices for this stream.
         * @returns { AudioDeviceDescriptors } Descriptors of input devices.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Gets the input device or devices for this stream.
         * @returns { AudioDeviceDescriptors } Descriptors of input devices.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getCurrentInputDevices(): AudioDeviceDescriptors;
        /**
         * Gets full capturer info for this stream.
         * @returns { AudioCapturerChangeInfo } Full capture info.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Gets full capturer info for this stream.
         * @returns { AudioCapturerChangeInfo } Full capture info.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        getCurrentAudioCapturerChangeInfo(): AudioCapturerChangeInfo;
        /**
         * Gets overflow count.
         * @returns { Promise<number> } - Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 12
         */
        getOverflowCount(): Promise<number>;
        /**
         * Gets overflow count.
         * @returns { number } Overflow count number.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 12
         */
        getOverflowCountSync(): number;
        /**
         * Subscribes to mark reached events. When the number of frames captured reaches the value of the frame parameter,
         * the callback is invoked.
         * @param { 'markReach' } type - Type of the event to listen for. Only the markReach event is supported.
         * @param { number } frame - Number of frames to trigger the event. The value must be greater than 0.
         * @param { Callback<number> } callback - Callback invoked when the event is triggered.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Subscribes to mark reached events. When the number of frames captured reaches the value of the frame parameter,
         * the callback is invoked.
         * @param { 'markReach' } type - Type of the event to listen for. Only the markReach event is supported.
         * @param { number } frame - Number of frames to trigger the event. The value must be greater than 0.
         * @param { Callback<number> } callback - Callback invoked when the event is triggered.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        on(type: 'markReach', frame: number, callback: Callback<number>): void;
        /**
         * Unsubscribes from the mark reached events.
         * @param { 'markReach' } type - Type of the event to listen for. Only the markReach event is supported.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Unsubscribes from the mark reached events.
         * @param { 'markReach' } type - Type of the event to listen for. Only the markReach event is supported.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        off(type: 'markReach'): void;
        /**
         * Subscribes to period reached events. When the period of frame capturing reaches the value of frame parameter,
         * the callback is invoked.
         * @param { 'periodReach' } type - Type of the event to listen for. Only the periodReach event is supported.
         * @param { number } frame - Period during which frame capturing is listened. The value must be greater than 0.
         * @param { Callback<number> } callback - Callback invoked when the event is triggered.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Subscribes to period reached events. When the period of frame capturing reaches the value of frame parameter,
         * the callback is invoked.
         * @param { 'periodReach' } type - Type of the event to listen for. Only the periodReach event is supported.
         * @param { number } frame - Period during which frame capturing is listened. The value must be greater than 0.
         * @param { Callback<number> } callback - Callback invoked when the event is triggered.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        on(type: 'periodReach', frame: number, callback: Callback<number>): void;
        /**
         * Unsubscribes from period reached events.
         * @param { 'periodReach' } type - Type of the event to listen for. Only the periodReach event is supported.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Unsubscribes from period reached events.
         * @param { 'periodReach' } type - Type of the event to listen for. Only the periodReach event is supported.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        off(type: 'periodReach'): void;
        /**
         * Subscribes audio state change event callback.
         * @param { 'stateChange' } type - Type of the event to listen for. Only the stateChange event is supported.
         * @param { Callback<AudioState> } callback - Callback used to listen for the audio state change event.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 8
         */
        /**
         * Subscribes audio state change event callback.
         * @param { 'stateChange' } type - Type of the event to listen for. Only the stateChange event is supported.
         * @param { Callback<AudioState> } callback - Callback used to listen for the audio state change event.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        on(type: 'stateChange', callback: Callback<AudioState>): void;
        /**
         * Listens for audio interrupt events. This method uses a callback to get interrupt events. The interrupt event is
         * triggered when audio recording is interrupted.
         * @param { 'audioInterrupt' } type - Type of the event to listen for. Only the audioInterrupt event is supported.
         * @param { Callback<InterruptEvent> } callback - Callback used to listen for interrupt callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @since 10
         */
        /**
         * Listens for audio interrupt events. This method uses a callback to get interrupt events. The interrupt event is
         * triggered when audio recording is interrupted.
         * @param { 'audioInterrupt' } type - Type of the event to listen for. Only the audioInterrupt event is supported.
         * @param { Callback<InterruptEvent> } callback - Callback used to listen for interrupt callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @crossplatform
         * @since 12
         */
        on(type: 'audioInterrupt', callback: Callback<InterruptEvent>): void;
        /**
         * UnSubscribes to audio interrupt events.
         * @param { 'audioInterrupt' } type - Type of the event to listen for. Only the audioInterrupt event is supported.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @since 10
         */
        /**
         * UnSubscribes to audio interrupt events.
         * @param { 'audioInterrupt' } type - Type of the event to listen for. Only the audioInterrupt event is supported.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Interrupt
         * @crossplatform
         * @since 12
         */
        off(type: 'audioInterrupt'): void;
        /**
         * Subscribes input device change event callback.
         * The event is triggered when input device change for this stream.
         * @param { 'inputDeviceChange' } type - Type of the event to listen for.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Subscribes input device change event callback.
         * The event is triggered when input device change for this stream.
         * @param { 'inputDeviceChange' } type - Type of the event to listen for.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        on(type: 'inputDeviceChange', callback: Callback<AudioDeviceDescriptors>): void;
        /**
         * Unsubscribes input device change event callback.
         * @param { 'inputDeviceChange' } type - Type of the event to listen for.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @since 11
         */
        /**
         * Unsubscribes input device change event callback.
         * @param { 'inputDeviceChange' } type - Type of the event to listen for.
         * @param { Callback<AudioDeviceDescriptors> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Device
         * @crossplatform
         * @since 12
         */
        off(type: 'inputDeviceChange', callback?: Callback<AudioDeviceDescriptors>): void;
        /**
         * Subscribes audio capturer info change event callback.
         * The event is triggered when input device change for this stream.
         * @param { 'audioCapturerChange' } type - Type of the event to listen for.
         * @param { Callback<AudioCapturerChangeInfo> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 11
         */
        /**
         * Subscribes audio capturer info change event callback.
         * The event is triggered when input device change for this stream.
         * @param { 'audioCapturerChange' } type - Type of the event to listen for.
         * @param { Callback<AudioCapturerChangeInfo> } callback - Callback used to listen device change event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        on(type: 'audioCapturerChange', callback: Callback<AudioCapturerChangeInfo>): void;
        /**
         * Unsubscribes audio capturer info change event callback.
         * @param { 'audioCapturerChange' } type - Type of the event to listen for.
         * @param { Callback<AudioCapturerChangeInfo> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 11
         */
        /**
         * Unsubscribes audio capturer info change event callback.
         * @param { 'audioCapturerChange' } type - Type of the event to listen for.
         * @param { Callback<AudioCapturerChangeInfo> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        off(type: 'audioCapturerChange', callback?: Callback<AudioCapturerChangeInfo>): void;
        /**
         * Subscribes audio data callback.
         * The event is triggered when audio buffer is available for reading more data.
         * @param { 'readData' } type - Type of the event to listen for.
         * @param { Callback<ArrayBuffer> } callback - Callback with the buffer to read.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 11
         */
        /**
         * Subscribes audio data callback.
         * The event is triggered when audio buffer is available for reading more data.
         * @param { 'readData' } type - Type of the event to listen for.
         * @param { Callback<ArrayBuffer> } callback - Callback with the buffer to read.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        on(type: 'readData', callback: Callback<ArrayBuffer>): void;
        /**
         * Unsubscribes audio data callback.
         * @param { 'readData' } type - Type of the event to listen for.
         * @param { Callback<ArrayBuffer> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @since 11
         */
        /**
         * Unsubscribes audio data callback.
         * @param { 'readData' } type - Type of the event to listen for.
         * @param { Callback<ArrayBuffer> } callback - Callback used in subscribe.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                 1.Mandatory parameters are left unspecified;
         *                                 2.Incorrect parameter types.
         * @throws { BusinessError } 6800101 - Parameter verification failed.
         * @syscap SystemCapability.Multimedia.Audio.Capturer
         * @crossplatform
         * @since 12
         */
        off(type: 'readData', callback?: Callback<ArrayBuffer>): void;
    }
    /**
     * Array of AudioEffectMode, which is read-only.
     * @typedef { Array<Readonly<AudioEffectMode>> } AudioEffectInfoArray
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 10
     */
    type AudioEffectInfoArray = Array<Readonly<AudioEffectMode>>;
    /**
     * Describes an audio effect mode group.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @since 10
     */
    /**
     * Describes an audio effect mode group.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @atomicservice
     * @since 12
     */
    enum AudioEffectMode {
        /**
         * Audio Effect Mode effect none.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Audio Effect Mode effect none.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @atomicservice
         * @since 12
         */
        EFFECT_NONE = 0,
        /**
         * Audio Effect Mode effect default.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @since 10
         */
        /**
         * Audio Effect Mode effect default.
         * @syscap SystemCapability.Multimedia.Audio.Renderer
         * @atomicservice
         * @since 12
         */
        EFFECT_DEFAULT = 1
    }
    /**
     * Audio AudioChannel Layout
     * A 64-bit integer indicates that the appearance and order of the speakers for recording or playback.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @since 11
     */
    /**
     * Audio AudioChannel Layout
     * A 64-bit integer indicates that the appearance and order of the speakers for recording or playback.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @crossplatform
     * @since 12
     */
    enum AudioChannelLayout {
        /**
         * Unknown Channel Layout
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Unknown Channel Layout
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_UNKNOWN = 0x0,
        /**
         * Channel Layout For Mono, 1 channel in total
         * Speaker layout: front center(FC)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For Mono, 1 channel in total
         * Speaker layout: front center(FC)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_MONO = 0x4,
        /**
         * Channel Layout For Stereo, 2 channels in total
         * Speaker layout: front left(FL), front right(FR)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For Stereo, 2 channels in total
         * Speaker layout: front left(FL), front right(FR)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_STEREO = 0x3,
        /**
         * Channel Layout For Stereo-Downmix, 2 channels in total
         * Speaker layout: Stereo left, stereo right
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_STEREO_DOWNMIX = 0x60000000,
        /**
         * Channel Layout For 2.1, 3 channels in total
         * Speaker layout: Stereo plus low-frequency effects(LFE)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 2.1, 3 channels in total
         * Speaker layout: Stereo plus low-frequency effects(LFE)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_2POINT1 = 0xB,
        /**
         * Channel Layout For 3.0, 3 channels in total
         * Speaker layout: Stereo plus back center(BC)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 3.0, 3 channels in total
         * Speaker layout: Stereo plus back center(BC)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_3POINT0 = 0x103,
        /**
         * Channel Layout For Surround, 3 channels in total
         * Speaker layout: Stereo plus FC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For Surround, 3 channels in total
         * Speaker layout: Stereo plus FC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_SURROUND = 0x7,
        /**
         * Channel Layout For 3.1, 4 channels in total
         * Speaker layout: Surround plus LFE
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 3.1, 4 channels in total
         * Speaker layout: Surround plus LFE
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_3POINT1 = 0xF,
        /**
         * Channel Layout For 4.0, 4 channels in total
         * Speaker layout: Surround plus BC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 4.0, 4 channels in total
         * Speaker layout: Surround plus BC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_4POINT0 = 0x107,
        /**
         * Channel Layout For Quad, 4 channels in total
         * Speaker layout: Stereo plus left and right back speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For Quad, 4 channels in total
         * Speaker layout: Stereo plus left and right back speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_QUAD = 0x33,
        /**
         * Channel Layout For Quad-Side, 4 channels in total
         * Speaker layout: Stereo plus left and right side speakers(SL, SR)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_QUAD_SIDE = 0x603,
        /**
         * Channel Layout For 2.0.2, 4 channels in total
         * Speaker layout: Stereo plus left and right top side speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 2.0.2, 4 channels in total
         * Speaker layout: Stereo plus left and right top side speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_2POINT0POINT2 = 0x3000000003,
        /**
         * Channel Layout For ORDER1-ACN-N3D First Order Ambisonic(FOA), 4 channels in total
         * First order, Ambisonic Channel Number(ACN) format, Normalization of three-D(N3D)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_AMB_ORDER1_ACN_N3D = 0x100000000001,
        /**
         * Channel Layout For ORDER1-ACN-SN3D FOA, 4 channels in total
         * First order, ACN format, Semi-Normalization of three-D(SN3D)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_AMB_ORDER1_ACN_SN3D = 0x100000001001,
        /**
         * Channel Layout For ORDER1-FUMA FOA, 4 channels in total
         * First order, Furse-Malham(FuMa) format
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_AMB_ORDER1_FUMA = 0x100000000101,
        /**
         * Channel Layout For 4.1, 5 channels in total
         * Speaker layout: 4.0 plus LFE
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 4.1, 5 channels in total
         * Speaker layout: 4.0 plus LFE
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_4POINT1 = 0x10F,
        /**
         * Channel Layout For 5.0, 5 channels in total
         * Speaker layout: Surround plus two side speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 5.0, 5 channels in total
         * Speaker layout: Surround plus two side speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_5POINT0 = 0x607,
        /**
         * Channel Layout For 5.0-Back, 5 channels in total
         * Speaker layout: Surround plus two back speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_5POINT0_BACK = 0x37,
        /**
         * Channel Layout For 2.1.2, 5 channels in total
         * Speaker layout: 2.0.2 plus LFE
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_2POINT1POINT2 = 0x300000000B,
        /**
         * Channel Layout For 3.0.2, 5 channels in total
         * Speaker layout: 2.0.2 plus FC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_3POINT0POINT2 = 0x3000000007,
        /**
         * Channel Layout For 5.1, 6 channels in total
         * Speaker layout: 5.0 plus LFE
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 5.1, 6 channels in total
         * Speaker layout: 5.0 plus LFE
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_5POINT1 = 0x60F,
        /**
         * Channel Layout For 5.1-Back, 6 channels in total
         * Speaker layout: 5.0-Back plus LFE
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_5POINT1_BACK = 0x3F,
        /**
         * Channel Layout For 6.0, 6 channels in total
         * Speaker layout: 5.0 plus BC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 6.0, 6 channels in total
         * Speaker layout: 5.0 plus BC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_6POINT0 = 0x707,
        /**
         * Channel Layout For Hexagonal, 6 channels in total
         * Speaker layout: 5.0-Back plus BC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For Hexagonal, 6 channels in total
         * Speaker layout: 5.0-Back plus BC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_HEXAGONAL = 0x137,
        /**
         * Channel Layout For 3.1.2, 6 channels in total
         * Speaker layout: 3.1 plus two top front speakers(TFL, TFR)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_3POINT1POINT2 = 0x500F,
        /**
         * Channel Layout For 6.0-Front, 6 channels in total
         * Speaker layout: Quad-Side plus left and right front center speakers(FLC, FRC)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_6POINT0_FRONT = 0x6C3,
        /**
         * Channel Layout For 6.1, 7 channels in total
         * Speaker layout: 5.1 plus BC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 6.1, 7 channels in total
         * Speaker layout: 5.1 plus BC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_6POINT1 = 0x70F,
        /**
         * Channel Layout For 6.1-Back, 7 channels in total
         * Speaker layout: 5.1-Back plus BC
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_6POINT1_BACK = 0x13F,
        /**
         * Channel Layout For 6.1-Front, 7 channels in total
         * Speaker layout: 6.0-Front plus LFE
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_6POINT1_FRONT = 0x6CB,
        /**
         * Channel Layout For 7.0, 7 channels in total
         * Speaker layout: 5.0 plus two back speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 7.0, 7 channels in total
         * Speaker layout: 5.0 plus two back speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_7POINT0 = 0x637,
        /**
         * Channel Layout For 7.0-Front, 7 channels in total
         * Speaker layout: 5.0 plus left and right front center speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 7.0-Front, 7 channels in total
         * Speaker layout: 5.0 plus left and right front center speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_7POINT0_FRONT = 0x6C7,
        /**
         * Channel Layout For 7.1, 8 channels in total
         * Speaker layout: 5.1 plus two back speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 7.1, 8 channels in total
         * Speaker layout: 5.1 plus two back speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_7POINT1 = 0x63F,
        /**
         * Channel Layout For Octagonal, 8 channels in total
         * Speaker layout: 5.0 plus BL, BR and BC.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For Octagonal, 8 channels in total
         * Speaker layout: 5.0 plus BL, BR and BC.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_OCTAGONAL = 0x737,
        /**
         * Channel Layout For 5.1.2, 8 channels in total
         * Speaker layout: 5.1 plus two top side speakers.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 5.1.2, 8 channels in total
         * Speaker layout: 5.1 plus two top side speakers.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_5POINT1POINT2 = 0x300000060F,
        /**
         * Channel Layout For 7.1-Wide, 8 channels in total
         * Speaker layout: 5.1 plus left and right front center speakers.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_7POINT1_WIDE = 0x6CF,
        /**
         * Channel Layout For 7.1-Wide, 8 channels in total
         * Speaker layout: 5.1-Back plus left and right front center speakers.
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_7POINT1_WIDE_BACK = 0xFF,
        /**
         * Channel Layout For ORDER2-ACN-N3D Higher Order Ambisonics(HOA), 9 channels in total
         * Second order, ACN format, N3D
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_AMB_ORDER2_ACN_N3D = 0x100000000002,
        /**
         * Channel Layout For ORDER2-ACN-SN3D HOA, 9 channels in total
         * Second order, ACN format, SN3D
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_AMB_ORDER2_ACN_SN3D = 0x100000001002,
        /**
         * Channel Layout For ORDER2-FUMA HOA, 9 channels in total
         * Second order, FuMa format
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_AMB_ORDER2_FUMA = 0x100000000102,
        /**
         * Channel Layout For 5.1.4, 10 channels in total
         * Speaker layout: 5.1 plus four top speakers(TFL, TFR, TBL, TBR)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 5.1.4, 10 channels in total
         * Speaker layout: 5.1 plus four top speakers(TFL, TFR, TBL, TBR)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_5POINT1POINT4 = 0x2D60F,
        /**
         * Channel Layout For 7.1.2, 10 channels in total
         * Speaker layout: 7.1 plus two top side speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 7.1.2, 10 channels in total
         * Speaker layout: 7.1 plus two top side speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_7POINT1POINT2 = 0x300000063F,
        /**
         * Channel Layout For 7.1.4, 12 channels in total
         * Speaker layout: 7.1 plus four top speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 7.1.4, 12 channels in total
         * Speaker layout: 7.1 plus four top speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_7POINT1POINT4 = 0x2D63F,
        /**
         * Channel Layout For 10.2, 12 channels in total
         * Speaker layout: FL, FR, FC, TFL, TFR, BL, BR, BC, SL, SR, wide left(WL), and wide right(WR)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 10.2, 12 channels in total
         * Speaker layout: FL, FR, FC, TFL, TFR, BL, BR, BC, SL, SR, wide left(WL), and wide right(WR)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_10POINT2 = 0x180005737,
        /**
         * Channel Layout For 9.1.4, 14 channels in total
         * Speaker layout: 7.1.4 plus two wide speakers(WL, WR)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_9POINT1POINT4 = 0x18002D63F,
        /**
         * Channel Layout For 9.1.6, 16 channels in total
         * Speaker layout: 9.1.4 plus two top side speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For 9.1.6, 16 channels in total
         * Speaker layout: 9.1.4 plus two top side speakers
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_9POINT1POINT6 = 0x318002D63F,
        /**
         * Channel Layout For Hexadecagonal, 16 channels in total
         * Speaker layout: Octagonal plus two wide speakers, six top speakers(TFL, TFR, TFC, TBL, TBR, TBC)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For Hexadecagonal, 16 channels in total
         * Speaker layout: Octagonal plus two wide speakers, six top speakers(TFL, TFR, TFC, TBL, TBR, TBC)
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_HEXADECAGONAL = 0x18003F737,
        /**
         * Channel Layout For ORDER3-ACN-N3D HOA, 16 channels in total
         * Third order, ACN format, N3D
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For ORDER3-ACN-N3D HOA, 16 channels in total
         * Third order, ACN format, N3D
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_AMB_ORDER3_ACN_N3D = 0x100000000003,
        /**
         * Channel Layout For ORDER3-ACN-SN3D HOA, 16 channels in total
         * Third order, ACN format, N3D
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        /**
         * Channel Layout For ORDER3-ACN-SN3D HOA, 16 channels in total
         * Third order, ACN format, N3D
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @crossplatform
         * @since 12
         */
        CH_LAYOUT_AMB_ORDER3_ACN_SN3D = 0x100000001003,
        /**
         * Channel Layout For ORDER3-FUMA HOA, 16 channels in total
         * Third order, FuMa format
         * @syscap SystemCapability.Multimedia.Audio.Core
         * @since 11
         */
        CH_LAYOUT_AMB_ORDER3_FUMA = 0x100000000103
    }
}
export default audio;
