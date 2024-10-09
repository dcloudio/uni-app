/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module is used for AI caption component.
 * @kit SpeechKit
 * @bundle com.huawei.hmsapp.hiai.hsp/aiCaptionHsp/Index 5.0.0(12)
 * */
import audio from '@ohos.multimedia.audio';
import type { Callback, ErrorCallback } from '@ohos.base';
/**
 * The parameters of audio information.
 *
 * @interface AudioInfo
 * @syscap SystemCapability.AI.AICaption
 * @since 5.0.0(12)
 */
export declare interface AudioInfo {
    /**
     * Indicates audio type of the audio info. The value range is ['pcm'].
     *
     * @type { string }
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    audioType: string;
    /**
     * Indicates sample rate of the audio info.
     *
     * @type { audio.AudioSamplingRate }
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    sampleRate: audio.AudioSamplingRate;
    /**
     * Indicates sound channel of the audio info.
     *
     * @type { audio.AudioChannel }
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    soundChannel: audio.AudioChannel;
    /**
     * Indicates sample bit of the audio info. The value range is [ 16 ].
     *
     * @type { number }
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    sampleBit: number;
}
/**
 * The audio data for ai caption.
 *
 * @interface AudioData
 * @syscap SystemCapability.AI.AICaption
 * @since 5.0.0(12)
 */
export declare interface AudioData {
    /**
     * Audio data
     *
     * @type { Uint8Array }
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    data: Uint8Array;
}
/**
 * The definition of AI caption controller.
 *
 * @syscap SystemCapability.AI.AICaption
 * @since 5.0.0(12)
 */
export declare class AICaptionController {
    /**
     * Get the audio info;
     *
     * @returns { AudioInfo } audioInfo - The audio info for recognition and translation.
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    getAudioInfo(): AudioInfo;
    /**
     * Write audio data
     *
     * @param { AudioData } audioData - The audio data for recognition and translation.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1012900012 - Audio recognition failed.
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    writeAudio(audioData: AudioData): void;
}
/**
 * The definition of AI caption controller.
 *
 * @typedef AICaptionOptions
 * @syscap SystemCapability.AI.AICaption
 * @since 5.0.0(12)
 */
export declare interface AICaptionOptions {
    /**
     * Indicates the component is loaded, prepared for writing audio.
     *
     * @type { Callback<void> }
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    onPrepared: Callback<void>;
    /**
     * Error callback for caption component .
     *
     * @type { ErrorCallback }
     * @throws { BusinessError } 1012900010 - AI caption service is busy.
     * @throws { BusinessError } 1012900011 - AI caption controller initialized failed.
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    onError: ErrorCallback;
    /**
     * Indicates the initial opacity of caption panel background. The value range is [0, 100].
     *
     * @type { ?number }
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    initialOpacity?: number;
}
/**
 * Component of ai caption panel.
 *
 * @Component AICaptionComponent
 * @syscap SystemCapability.AI.AICaption
 * @since 5.0.0(12)
 */
@Component
export declare struct AICaptionComponent {
    /**
     * Indicates if show or hide the component of ai caption component.
     *
     * @type { boolean }
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    @Link
    isShown: boolean;
    /**
     * Indicates callback of AICaption controller .
     *
     * @type { AICaptionController }
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    controller: AICaptionController;
    /**
     * Indicates the options of ai caption component.
     *
     * @type { AICaptionOptions }
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    options: AICaptionOptions;
    /**
     * The default builder function for struct, You should not need to invoke this method directly.
     *
     * @syscap SystemCapability.AI.AICaption
     * @since 5.0.0(12)
     */
    build(): void;
}
