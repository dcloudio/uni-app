/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module is used to convert speech to text.
 * @kit CoreSpeechKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * This module is used to convert speech to text.
 *
 * @namespace speechRecognizer
 * @syscap SystemCapability.AI.SpeechRecognizer
 * @since 4.1.0(11)
 */
declare namespace speechRecognizer {
    /**
     * Initialize SpeechRecognition engine with createEngineParams.
     * If the engine is initialized, an engine instance will be returned by callback. Otherwise, an error code and description will be returned by callback.
     *
     * @param { CreateEngineParams } createEngineParams - The parameters of initializing engine.
     * @param { AsyncCallback<SpeechRecognitionEngine> } callback - The callback of created instance.
     * @throws { BusinessError } 1002200001 - Create engine failed.
     * @throws { BusinessError } 1002200006 - The engine of speechRecognition is busy.
     * @throws { BusinessError } 1002200008 - The engine of speechRecognition is being destroyed.
     * @syscap SystemCapability.AI.SpeechRecognizer
     * @since 4.1.0(11)
     */
    function createEngine(createEngineParams: CreateEngineParams, callback: AsyncCallback<SpeechRecognitionEngine>): void;
    /**
     * Initialize SpeechRecognition engine with createEngineParams.
     * If the engine is initialized, an engine instance will be returned by promise. Otherwise, an error code and description will be returned by promise.
     *
     * @param { CreateEngineParams } createEngineParams - The parameters of initializing engine.
     * @returns { Promise<SpeechRecognitionEngine> } The result of instance.
     * @throws { BusinessError } 1002200001 - Create engine failed.
     * @throws { BusinessError } 1002200006 - The engine of SpeechRecognition is busy.
     * @throws { BusinessError } 1002200008 - The engine of SpeechRecognition is being destroyed.
     * @syscap SystemCapability.AI.SpeechRecognizer
     * @since 4.1.0(11)
     */
    function createEngine(createEngineParams: CreateEngineParams): Promise<SpeechRecognitionEngine>;
    /**
     * The definition of SpeechRecognition Engine.
     *
     * @interface SpeechRecognitionEngine
     * @syscap SystemCapability.AI.SpeechRecognizer
     * @since 4.1.0(11)
     */
    export interface SpeechRecognitionEngine {
        /**
         * Set the callback of SpeechRecognition that will receive all information about the speech recognition.
         *
         * @param { RecognitionListener } listener - The callback function of recognition.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        setListener(listener: RecognitionListener): void;
        /**
         * Get the language types supported by the SpeechRecognition engine.
         *
         * @param { LanguageQuery } params - The Parameters of querying.
         * @param { AsyncCallback<Array<string>> } callback - The callback of querying.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1002200007 - The engine is not initialized.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        listLanguages(params: LanguageQuery, callback: AsyncCallback<Array<string>>): void;
        /**
         * Get the language types supported by the SpeechRecognition engine.
         *
         * @param { LanguageQuery } params - The Parameters of querying.
         * @returns { Promise<Array<string>> } The result of querying.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1002200007 - The engine is not initialized.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        listLanguages(params: LanguageQuery): Promise<Array<string>>;
        /**
         * Start the recognition process.
         * Note that the setListener method must be invoked first. Otherwise, the callbacks of the recognition cannot be received.
         *
         * @param { StartParams } params - The Parameters of starting listening.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1002200002 - Start listening failed.
         * @throws { BusinessError } 1002200007 - The engine is not initialized.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        startListening(params: StartParams): void;
        /**
         * Convert audio to text, and the length of audio data must be 640 or 1280.
         * Note that the setListener method must be invoked first. Otherwise, the callbacks of the recognition cannot be received.
         * Note that the startListening method must be invoked then. Otherwise, the writeAudio method will be failed.
         *
         * @param { string } sessionId - The session ID of recognition.
         * @param { Uint8Array } audio - The data of recognition.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1002200003 - Exceeded the maximum audio length supported.
         * @throws { BusinessError } 1002200007 - The engine is not initialized.
         * @throws { BusinessError } 1002200010 - Write audio failed because the start listening is failed.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        writeAudio(sessionId: string, audio: Uint8Array): void;
        /**
         * Finish the recognition, and final recognition results will be received via Onresult method in RecognitionListener Object.
         * Note that the setListener method must be invoked first. Otherwise, the callbacks of the recognition cannot be received.
         *
         * @param { string } sessionId - The session ID of recognition.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1002200004 - Finish recognition failed.
         * @throws { BusinessError } 1002200007 - The engine is not initialized.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        finish(sessionId: string): void;
        /**
         * Cancel the recognition, and final recognition results will not be received.
         * Note that the setListener method must be invoked first. Otherwise, the callbacks of the recognition cannot be received.
         *
         * @param { string } sessionId - The session ID of recognition.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1002200005 - Cancel recognition failed.
         * @throws { BusinessError } 1002200007 - The engine is not initialized.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        cancel(sessionId: string): void;
        /**
         * Check whether the Speech Recognition engine is busy.
         * Note that the setListener method must be invoked first. Otherwise, the callbacks of error cannot be received.
         *
         * @returns { boolean } True is returned if the SpeechRecognition engine is busy. Otherwise, false is returned.
         * @throws { BusinessError } 1002200007 - The engine is not initialized.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        isBusy(): boolean;
        /**
         * Release the resources of SpeechRecognition engine.
         *
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        shutdown(): void;
    }
    /**
     * The callback function of recognition.
     *
     * @interface RecognitionListener
     * @syscap SystemCapability.AI.SpeechRecognizer
     * @since 4.1.0(11)
     */
    export interface RecognitionListener {
        /**
         * Indicates the callback for startListening success.
         *
         * @param { string } sessionId - The session ID of recognition.
         * @param { string } eventMessage - The message of starting recognition.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        onStart(sessionId: string, eventMessage: string): void;
        /**
         * Indicates the callback for recognition event.
         *
         * @param { string } sessionId - The session ID of recognition.
         * @param { number } eventCode - The event code of recognition. The value 1 indicates that the audio starts, and the value 3 indicates that the audio ends.
         * @param { string } eventMessage - The event message of recognition.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        onEvent(sessionId: string, eventCode: number, eventMessage: string): void;
        /**
         * Indicates the callback for recognition result.
         *
         * @param { string } sessionId - The session ID of recognition.
         * @param { SpeechRecognitionResult } result - The result of recognition.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        onResult(sessionId: string, result: SpeechRecognitionResult): void;
        /**
         * Indicates the callback for completing recognition.
         *
         * @param { string } sessionId - The session ID of recognition.
         * @param { string } eventMessage - The message of completing recognition.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        onComplete(sessionId: string, eventMessage: string): void;
        /**
         * Indicates the callback of error.
         *
         * @param { string } sessionId - The session ID of recognition.
         * @param { number } errorCode - The error code of recognition.
         * @param { string } errorMessage - The detailed description of the error.
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        onError(sessionId: string, errorCode: number, errorMessage: string): void;
    }
    /**
     * The parameters of initializing engine.
     *
     * @interface CreateEngineParams
     * @syscap SystemCapability.AI.SpeechRecognizer
     * @since 4.1.0(11)
     */
    export interface CreateEngineParams {
        /**
         * Indicates language info of the recognition.
         * @type { string }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        language: string;
        /**
         * Indicates module type of the recognition.
         * The value 0 indicates online, value 1 indicates offline.
         * @type { number }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        online: number;
        /**
         * Indicates entity info of the speech.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        extraParams?: Record<string, Object>;
    }
    /**
     * The Parameters of querying language types supported by SpeechRecognition engine.
     *
     * @interface LanguageQuery
     * @syscap SystemCapability.AI.SpeechRecognizer
     * @since 4.1.0(11)
     */
    export interface LanguageQuery {
        /**
         * Indicates session ID of the recognition.
         * @type { string }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        sessionId: string;
        /**
         * Indicates entity info of the recognition.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        extraParams?: Record<string, Object>;
    }
    /**
     * The parameters of starting recognition.
     *
     * @interface StartParams
     * @syscap SystemCapability.AI.SpeechRecognizer
     * @since 4.1.0(11)
     */
    export interface StartParams {
        /**
         * Indicates session ID of the recognition.
         * @type { string }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        sessionId: string;
        /**
         * Indicates audio information of the recognition.
         * @type { AudioInfo }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        audioInfo: AudioInfo;
        /**
         * Indicates entity info of the recognition.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        extraParams?: Record<string, Object>;
    }
    /**
     * The parameters of audio information.
     *
     * @interface AudioInfo
     * @syscap SystemCapability.AI.SpeechRecognizer
     * @since 4.1.0(11)
     */
    export interface AudioInfo {
        /**
         * Indicates audio type of the recognition.
         * @type { string }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        audioType: string;
        /**
         * Indicates sample rate of the recognition.
         * @type { number }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        sampleRate: number;
        /**
         * Indicates sound channel of the recognition.
         * @type { number }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        soundChannel: number;
        /**
         * Indicates sample bit of the recognition.
         * @type { number }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        sampleBit: number;
        /**
         * Indicates entity info of the recognition.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        extraParams?: Record<string, Object>;
    }
    /**
     * The result of recognition.
     *
     * @interface SpeechRecognitionResult
     * @syscap SystemCapability.AI.SpeechRecognizer
     * @since 4.1.0(11)
     */
    export interface SpeechRecognitionResult {
        /**
         * Indicates whether it is the final result of this sentence.
         * The value true indicates the result is the final result of this sentence.
         * @type { boolean }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        isFinal: boolean;
        /**
         * Indicates whether it is the result of the last sentence.
         * The value true indicates the result is the final result of this sentence.
         * @type { boolean }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        isLast: boolean;
        /**
         * Indicates the optimal result of recognition.
         * @type { string }
         * @syscap SystemCapability.AI.SpeechRecognizer
         * @since 4.1.0(11)
         */
        result: string;
    }
}
export default speechRecognizer;
