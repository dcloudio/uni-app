/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module is used to convert text to speech.
 * @kit CoreSpeechKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * This module is used to convert text to speech.
 *
 * @namespace textToSpeech
 * @syscap SystemCapability.AI.TextToSpeech
 * @since 4.1.0(11)
 */
declare namespace textToSpeech {
    /**
     * Initialize TextToSpeech engine and returns an instance.
     * If the engine is initialized, an engine instance will be returned by callback. Otherwise, an error code and description will be returned by callback.
     *
     * @param { CreateEngineParams } createEngineParams - The parameters of initializing engine.
     * @param { AsyncCallback<TextToSpeechEngine> } callback - The callback of creating instance.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1002300002 - The language is not supported.
     * @throws { BusinessError } 1002300003 - The person is not supported.
     * @throws { BusinessError } 1002300005 - Create engine failed.
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    function createEngine(createEngineParams: CreateEngineParams, callback: AsyncCallback<TextToSpeechEngine>): void;
    /**
     * Initialize TextToSpeech engine and returns an instance.
     * If the engine is initialized, an engine instance will be returned by callback. Otherwise, an error code and description will be returned by callback.
     *
     * @param { CreateEngineParams } createEngineParams - The parameters of initializing engine.
     * @returns { Promise<TextToSpeechEngine> } The result of instance.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1002300002 - The language is not supported.
     * @throws { BusinessError } 1002300003 - The person is not supported.
     * @throws { BusinessError } 1002300005 - Create engine failed.
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    function createEngine(createEngineParams: CreateEngineParams): Promise<TextToSpeechEngine>;
    /**
     * The definition of Text-to-Speech Engine.
     *
     * @interface TextToSpeechEngine
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface TextToSpeechEngine {
        /**
         * Set the callback of Text-To-Speech that will receive all information about the Text-To-Speech.
         *
         * @param { SpeakListener } listener - The callback function of recognition.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        setListener(listener: SpeakListener): void;
        /**
         * Convert text to speech.
         * Note that the setListener method must be invoked first. Otherwise, the callbacks of the speech cannot be received.
         *
         * @param { string } text - Text to be synthesized.
         * @param { SpeakParams } speakParams - The parameters of speech.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1002300001 - The length of text is out of range or empty.
         * @throws { BusinessError } 1002300006 - The service of TextToSpeech is busy.
         * @throws { BusinessError } 1002300007 - Synthesis failed because the Text-to-Speech engine is not initialized.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        speak(text: string, speakParams: SpeakParams): void;
        /**
         * Get the language and person types supported by the Text-to-Speech engine.
         *
         * @param { VoiceQuery } params - The Parameters of querying.
         * @param { AsyncCallback<Array<VoiceInfo>> } callback - The callback of querying.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1002300007 - The Text-to-Speech engine is not initialized.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        listVoices(params: VoiceQuery, callback: AsyncCallback<Array<VoiceInfo>>): void;
        /**
         * Get the language and person types supported by the Text-to-Speech engine.
         *
         * @param { VoiceQuery } params - The Parameters of querying.
         * @returns { Promise<Array<VoiceInfo>> } The result of querying.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1002300007 - The Text-to-Speech engine is not initialized.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        listVoices(params: VoiceQuery): Promise<Array<VoiceInfo>>;
        /**
         * Stop speaking.
         * Note that the setListener method must be invoked first. Otherwise, the callbacks of stop cannot be received.
         *
         * @throws { BusinessError } 1002300007 - The Text-to-Speech engine is not initialized.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        stop(): void;
        /**
         * Check whether the Text-to-Speech engine is busy.
         * Note that the setListener method must be invoked first. Otherwise, the callbacks of error cannot be received.
         *
         * @returns { boolean } True is returned if the Text-To-Speech engine is busy. Otherwise, false is returned.
         * @throws { BusinessError } 1002300007 - The Text-to-Speech engine is not initialized.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        isBusy(): boolean;
        /**
         * Release the resources of Text-to-Speech engine.
         *
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        shutdown(): void;
    }
    /**
     * The callback function of speech.
     *
     * @interface SpeakListener
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface SpeakListener {
        /**
         * Indicates the callback for starting speech.
         *
         * @param { string } requestId - The request ID of speech.
         * @param { StartResponse } response - The parameters of speech.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        onStart(requestId: string, response: StartResponse): void;
        /**
         * Indicates the callback for completing speech or completing synthesis.
         *
         * @param { string } requestId - The request ID of speech.
         * @param { CompleteResponse } response - The related parameters of completing speech.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        onComplete(requestId: string, response: CompleteResponse): void;
        /**
         * Indicates the callback for success of stopping speech.
         *
         * @param { string } requestId - The request ID of speech.
         * @param { StopResponse } response - The related parameters of stopping speech.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        onStop(requestId: string, response: StopResponse): void;
        /**
         * Indicates the callback for Synthesis, and the audio data is returned through parameter of audio.
         * Note that when you need to receive a synthesized audio stream, the onData method needs to be called.
         *
         * @type { ?function }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        onData?: (requestId: string, audio: ArrayBuffer, response: SynthesisResponse) => void;
        /**
         * Indicates the callback of error.
         *
         * @param { string } requestId - The request ID of speech.
         * @param { number } errorCode - The error code of speech.
         * @param { string } errorMessage - The detailed description of the error.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        onError(requestId: string, errorCode: number, errorMessage: string): void;
    }
    /**
     * The parameters of initializing engine.
     *
     * @interface CreateEngineParams
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface CreateEngineParams {
        /**
         * Indicates language info of the speech.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        language: string;
        /**
         * Indicates person info of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        person: number;
        /**
         * Indicates module type of the speech.
         * The value 0 indicates online, value 1 indicates offline.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        online: number;
        /**
         * Indicates entity info of the speech.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        extraParams?: Record<string, Object>;
    }
    /**
     * The parameters of speech.
     *
     * @interface SpeakParams
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface SpeakParams {
        /**
         * Indicates request ID of the speech.
         * Note that the request ID must be unique.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        requestId: string;
        /**
         * Indicates entity info of the speech.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        extraParams?: Record<string, Object>;
    }
    /**
     * The Parameters of querying language and person supported by Text-to-Speech.
     *
     * @interface VoiceQuery
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface VoiceQuery {
        /**
         * Indicates request ID of the speech.
         * Note that the request ID must be unique.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        requestId: string;
        /**
         * Indicates module type of the speech.
         * The value 0 indicates online, value 1 indicates offline.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        online: number;
        /**
         * Indicates entity info of the speech.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        extraParams?: Record<string, Object>;
    }
    /**
     * The information of language and person supported by Text-to-Speech.
     *
     * @interface VoiceInfo
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface VoiceInfo {
        /**
         * Indicates language info of the speech.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        language: string;
        /**
         * Indicates person info of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        person: number;
        /**
         * Indicates style info of the voice.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        style: string;
        /**
         * Indicates gender info of the voice.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        gender: string;
        /**
         * Indicates description of the voice.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        description: string;
    }
    /**
     * The parameters of speech.
     *
     * @interface StartResponse
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface StartResponse {
        /**
         * Indicates audio type of the speech.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        audioType: string;
        /**
         * Indicates sample rate of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        sampleRate: number;
        /**
         * Indicates sample bit of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        sampleBit: number;
        /**
         * Indicates audio channel of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        audioChannel: number;
        /**
         * Indicates compress rate of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        compressRate: number;
    }
    /**
     * The related parameters of stopping speech.
     *
     * @interface StopResponse
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface StopResponse {
        /**
         * The type of stopping speech.
         * The value 0 indicates that synthesis and speech are stopped at the same time.
         * The value 1 indicates that only the speech is stopped.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        type: number;
        /**
         * Indicates message of stopping.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        message: string;
    }
    /**
     * The related parameters of completing speech.
     *
     * @interface CompleteResponse
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface CompleteResponse {
        /**
         * Indicates the end of synthesis or speech.
         * The value 0 indicates the completion of synthesis, the value 1 indicates the completion of speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        type: number;
        /**
         * Indicates message of completing.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        message: string;
    }
    /**
     * The related parameters of Synthesis.
     *
     * @interface SynthesisResponse
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface SynthesisResponse {
        /**
         * Indicates the sequence of the audio data.
         * The value starts from 1 and increases by 1 each time.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        sequence: number;
        /**
         * Indicates type of the audio data.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        audioType: string;
    }
}
export default textToSpeech;
