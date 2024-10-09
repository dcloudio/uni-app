/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module provides the capabilities to image text recognition.
 * @kit CoreVisionKit
 */
import type { AsyncCallback } from '@ohos.base';
import type image from '@ohos.multimedia.image';
/**
 * This module is used for intelligent image text recognition. Specifically, it identifies text paragraphs, lines, and
 * words in the image, and returns the corresponding coordinate information. The returned result can be used for UI interaction.
 * @namespace textRecognition
 * @syscap SystemCapability.AI.OCR.TextRecognition
 * @since 4.0.0(10)
 */
declare namespace textRecognition {
    /**
    * This is the text recognition configuration. If the configuration can be specified during identification,
    * the entire identification process will be accelerated. If not specified, general image text recognition will be
    * performed by default.
    * @interface TextRecognitionConfiguration
    * @syscap SystemCapability.AI.OCR.TextRecognition
    * @since 4.0.0(10)
    */
    export interface TextRecognitionConfiguration {
        /**
         * The direction default value is true, that is, the default image is upright, and the direction
         * does not need to be considered.
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        isDirectionDetectionSupported?: boolean;
    }
    /**
     * Visual configuration information, including related content such as pictures or video frame to be recognized.
     * @interface VisionInfo
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    export interface VisionInfo {
        /**
         * Image information to be identified.
         * @type { image.PixelMap }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly pixelMap: image.PixelMap;
    }
    /**
     * Indicates the position of the pixel point
     * @interface PixelPoint
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    export interface PixelPoint {
        /**
         * Horizontal coordinates of pixel point.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly x: number;
        /**
         * The vertical coordinate of the pixel point
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly y: number;
    }
    /**
     * Describe the information of a word, including the content, and the coordinates of the outer frame.
     * @interface TextWord
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    export interface TextWord {
        /**
         * The content of the word
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly value: string;
        /**
         * Indicates the outline corner point of a word of text
         * @type { Array<PixelPoint> }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly cornerPoints: Array<PixelPoint>;
    }
    /**
     * Describes a line of text within an image.
     * @interface TextLine
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    export interface TextLine {
        /**
         * Indicates the line content
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly value: string;
        /**
         * Indicates the outline corner point of a line of text
         * @type { Array<PixelPoint> }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly cornerPoints: Array<PixelPoint>;
        /**
         * Word information within a line of text.
         * @type { Array<TextWord> }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly words: Array<TextWord>;
    }
    /**
     * Describe the block of text within the image.
     * @interface TextBlock
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    export interface TextBlock {
        /**
         * Indicates the block content
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly value: string;
        /**
         * Indicates the line contents
         * @type { Array<TextLine> }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly lines: Array<TextLine>;
    }
    /**
     * The result information of text recognition, including text content and coordinate information.
     * @interface TextRecognitionResult
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    export interface TextRecognitionResult {
        /**
         * Indicates the blocks content.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly value: string;
        /**
         * A lit of details for a block.
         * @type { Array<TextBlock> }
         * @readonly
         * @syscap SystemCapability.AI.OCR.TextRecognition
         * @since 4.0.0(10)
         */
        readonly blocks: Array<TextBlock>;
    }
    /**
     * Recognize text information contained in pictures.
     * @param { VisionInfo } visionInfo - The image information.
     * @param { AsyncCallback<TextRecognitionResult> } callback - The callback of getting text recognition result.
     * @throws { BusinessError } 200 - Run timed out, please try again later.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1001400001 - Failed to run, please try again.
     * @throws { BusinessError } 1001400002 - The service is abnormal.
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    function recognizeText(visionInfo: VisionInfo, callback: AsyncCallback<TextRecognitionResult>): void;
    /**
     * Recognize text information contained in pictures.
     * @param { VisionInfo } visionInfo - The image information.
     * @param { TextRecognitionConfiguration } configuration - the configuration information for text recognition.
     * @returns { Promise<TextRecognitionResult> } The result of text recognition.
     * @throws { BusinessError } 200 - Run timed out, please try again later.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1001400001 - Failed to run, please try again.
     * @throws { BusinessError } 1001400002 - The service is abnormal.
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    function recognizeText(visionInfo: VisionInfo, configuration?: TextRecognitionConfiguration): Promise<TextRecognitionResult>;
    /**
     * Recognize text information contained in pictures.
     * @param { VisionInfo } visionInfo - The image information to be recognized.
     * @param { TextRecognitionConfiguration } configuration - the configuration information for text recognition.
     * @param { AsyncCallback<TextRecognitionResult> } callback - The callback of getting text recognition result.
     * @throws { BusinessError } 200 - Run timed out, please try again later.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1001400001 - Failed to run, please try again.
     * @throws { BusinessError } 1001400002 - The service is abnormal.
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    function recognizeText(visionInfo: VisionInfo, configuration: TextRecognitionConfiguration, callback: AsyncCallback<TextRecognitionResult>): void;
    /**
     * Get the language types supported by the text recognition capability.
     * @returns { Promise<Array<string>> } Returns a list of supported language types.
     * @throws { BusinessError } 1001400001 - Failed to run, please try again.
     * @throws { BusinessError } 1001400002 - The service is abnormal.
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    function getSupportedLanguages(): Promise<Array<string>>;
    /**
     * Get the language types supported by the text recognition capability.
     * @param { AsyncCallback<Array<string>> } callback - The callback of supported language types.
     * @throws { BusinessError } 1001400001 - Failed to run, please try again.
     * @throws { BusinessError } 1001400002 - The service is abnormal.
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 4.0.0(10)
     */
    function getSupportedLanguages(callback: AsyncCallback<Array<string>>): void;
    /**
     * Init the ocr service.
     * @returns { Promise<boolean> }
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 5.0.0(12)
     */
    function init(): Promise<boolean>;
    /**
     * Release the ocr service.
     * @returns { Promise<void> }
     * @syscap SystemCapability.AI.OCR.TextRecognition
     * @since 5.0.0(12)
     */
    function release(): Promise<void>;
}
export default textRecognition;
