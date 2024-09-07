/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file This module is used for text nlu processing.
 * @kit NaturalLanguageKit
 */
/**
 * This module is used for text analysis, including text entity recognition and word segmentation.
 * The returned result is object array Entity and WordSegmentResult object.
 * @namespace textProcessing
 * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
 * @since 5.0.0(12)
 */
declare namespace textProcessing {
    /**
     * Configuration item obtained by the entity.
     * @interface EntityConfig
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    export interface EntityConfig {
        /**
         * Entity type configuration item. The structure is of the enumeration type.
         * @type { ?EntityType[] }
         * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
         * @since 5.0.0(12)
         */
        entityTypes?: EntityType[];
    }
    /**
     * Get entity method result.
     * @interface Entity
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    export interface Entity {
        /**
         * Original text of the entity.
         * @type { string }
         * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
         * @since 5.0.0(12)
         */
        text: string;
        /**
         * Position of the entity in the original text.
         * @type { number }
         * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
         * @since 5.0.0(12)
         */
        charOffset: number;
        /**
         * The type of the entity.
         * @type { EntityType }
         * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
         * @since 5.0.0(12)
         */
        type: EntityType;
        /**
         * Structured Information of the entity.
         * @type { string }
         * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
         * @since 5.0.0(12)
         */
        jsonObject: string;
    }
    /**
     * Result of word segmentation.
     * @interface WordSegment
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    export interface WordSegment {
        /**
         * the word in the getWordSegment method result.
         * @type { string }
         * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
         * @since 5.0.0(12)
         */
        word: string;
        /**
         * The tag of word in the getWordSegment method result.
         * @type { string }
         * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
         * @since 5.0.0(12)
         */
        wordTag: string;
    }
    /**
     * Obtains the word segmentation result from the specified text, including basic words and part-of-speech.
     * @param { string } text - The input text from js.
     * @returns { Promise<Array<WordSegment>> } promise - The promise of getting getWordSegment result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1011200001 - Failed to run, please try again.
     * @throws { BusinessError } 1011200002 - The service is abnormal.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    function getWordSegment(text: string): Promise<Array<WordSegment>>;
    /**
     * Get the entity from the given text.
     * @param { string } text - The input text from js.
     * @param { EntityConfig } entityConfig - Optional configuration item, which is the entity type.
     * @returns { Promise<Array<Entity>> } promise - The promise of getting getEntity result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1011200001 - Failed to run, please try again.
     * @throws { BusinessError } 1011200002 - The service is abnormal.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    function getEntity(text: string, entityConfig?: EntityConfig): Promise<Array<Entity>>;
    /**
     * init nlp text processing.
     * @returns { Promise<boolean> } promise - Whether initialization is successful.
     * @throws { BusinessError } 1011200001 - Failed to run, please try again.
     * @throws { BusinessError } 1011200002 - The service is abnormal.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    function init(): Promise<boolean>;
    /**
     * release nlp text processing.
     * @returns { Promise<boolean> } promise - Whether release is successful.
     * @throws { BusinessError } 1011200001 - Failed to run, please try again.
     * @throws { BusinessError } 1011200002 - The service is abnormal.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    function release(): Promise<boolean>;
}
export default textProcessing;
/**
 * Enumeration class of entity class
 * @enum { string }
 * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
 * @since 5.0.0(12)
 */
export enum EntityType {
    /**
     * Time entity.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    DATETIME = 'datetime',
    /**
     * email entity.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    EMAIL = 'email',
    /**
     * Express number entity.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    EXPRESS_NO = 'expressNo',
    /**
     * Flight number Entity.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    FLIGHT_NO = 'flightNo',
    /**
     * Location entity.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    LOCATION = 'location',
    /**
     * name entity.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    NAME = 'name',
    /**
     * phone number entity.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    PHONE_NO = 'phoneNo',
    /**
     * url entity.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    URL = 'url',
    /**
     * Verification code entity.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    VERIFICATION_CODE = 'verificationCode',
    /**
     * ID number Entity.
     * @syscap SystemCapability.AI.NaturalLanguage.TextProcessing
     * @since 5.0.0(12)
     */
    ID_NO = 'idNo'
}
