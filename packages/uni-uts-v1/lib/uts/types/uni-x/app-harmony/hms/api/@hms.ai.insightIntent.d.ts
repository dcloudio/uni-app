/*
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module is used to share and delete InsightIntent.
 * @kit IntentsKit
 */
import { AsyncCallback } from '@ohos.base';
import common from '@ohos.app.ability.common';
/**
 * The module providers the capability to share and delete InsightIntent.
 * The ability that support InsightIntent will be predicted and suggested to the user in system portal.
 *
 * @namespace insightIntent
 * @syscap SystemCapability.AI.InsightIntent
 * @since 4.0.0(10)
 */
/**
 * The module providers the capability to share and delete InsightIntent.
 * The ability that support InsightIntent will be predicted and suggested to the user in system portal.
 *
 * @namespace insightIntent
 * @syscap SystemCapability.AI.InsightIntent
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace insightIntent {
    /**
     * Share the executed or expected InsightIntent.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { InsightIntent[] } intents - Indicates the intents to share.
     * @param { AsyncCallback<void> } callback - The callback of sharing intent result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101102 - HUAWEI Assistant has stopped providing services.
     * @throws { BusinessError } 1000101103 - The switch of the app in the Data source has been turned off.
     * @throws { BusinessError } 1000101104 - The number of sharing times exceeds the limit.
     * @throws { BusinessError } 1000101105 - The size of a single shared data exceeds the limit.
     * @throws { BusinessError } 1000101106 - Exceeded the maximum number of sharing times of all applications.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @since 4.0.0(10)
     */
    /**
     * Share the executed or expected InsightIntent.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { InsightIntent[] } intents - Indicates the intents to share.
     * @param { AsyncCallback<void> } callback - The callback of sharing intent result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101102 - HUAWEI Assistant has stopped providing services.
     * @throws { BusinessError } 1000101103 - The switch of the app in the Data source has been turned off.
     * @throws { BusinessError } 1000101104 - The number of sharing times exceeds the limit.
     * @throws { BusinessError } 1000101105 - The size of a single shared data exceeds the limit.
     * @throws { BusinessError } 1000101106 - Exceeded the maximum number of sharing times of all applications.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    function shareIntent(context: common.BaseContext, intents: InsightIntent[], callback: AsyncCallback<void>): void;
    /**
     * Share the executed or expected InsightIntent.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { InsightIntent[] } intents - Indicates the intents to share.
     * @returns { Promise<void> } share intent result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101102 - HUAWEI Assistant has stopped providing services.
     * @throws { BusinessError } 1000101103 - The switch of the app in the Data source has been turned off.
     * @throws { BusinessError } 1000101104 - The number of sharing times exceeds the limit.
     * @throws { BusinessError } 1000101105 - The size of a single shared data exceeds the limit.
     * @throws { BusinessError } 1000101106 - Exceeded the maximum number of sharing times of all applications.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @since 4.0.0(10)
     */
    /**
     * Share the executed or expected InsightIntent.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { InsightIntent[] } intents - Indicates the intents to share.
     * @returns { Promise<void> } share intent result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101102 - HUAWEI Assistant has stopped providing services.
     * @throws { BusinessError } 1000101103 - The switch of the app in the Data source has been turned off.
     * @throws { BusinessError } 1000101104 - The number of sharing times exceeds the limit.
     * @throws { BusinessError } 1000101105 - The size of a single shared data exceeds the limit.
     * @throws { BusinessError } 1000101106 - Exceeded the maximum number of sharing times of all applications.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    function shareIntent(context: common.BaseContext, intents: InsightIntent[]): Promise<void>;
    /**
     * Delete the InsightIntent.
     * If the identifiers parameter is specified, the records corresponding to the identifiers under the intent
     * name will be deleted. Otherwise, all the records under the intent name will be deleted.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { string } intentName - Indicates the name of the intent to be deleted.
     * @param { string[] } identifiers - Indicates the identifiers of the intent to be deleted.
     * @param { AsyncCallback<void> } callback - The callback of deleting intent result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @since 4.0.0(10)
     */
    /**
     * Delete the InsightIntent.
     * If the identifiers parameter is specified, the records corresponding to the identifiers under the intent
     * name will be deleted. Otherwise, all the records under the intent name will be deleted.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { string } intentName - Indicates the name of the intent to be deleted.
     * @param { string[] } identifiers - Indicates the identifiers of the intent to be deleted.
     * @param { AsyncCallback<void> } callback - The callback of deleting intent result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    function deleteIntent(context: common.BaseContext, intentName: string, identifiers: string[], callback: AsyncCallback<void>): void;
    /**
     * Delete the InsightIntent.
     * Delete all the records under the intent name.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { string } intentName - Indicates the name of the intent to be deleted.
     * @param { AsyncCallback<void> } callback - The callback of deleting intent result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @since 4.0.0(10)
     */
    /**
     * Delete the InsightIntent.
     * Delete all the records under the intent name.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { string } intentName - Indicates the name of the intent to be deleted.
     * @param { AsyncCallback<void> } callback - The callback of deleting intent result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    function deleteIntent(context: common.BaseContext, intentName: string, callback: AsyncCallback<void>): void;
    /**
     * Delete the InsightIntent.
     * If the identifiers parameter is specified, the records corresponding to the identifiers under the intent
     * name will be deleted. Otherwise, all the records under the intent name will be deleted.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { string } intentName - Indicates the name of the intent to be deleted.
     * @param { string[] } identifiers - Indicates the identifiers of the intent to be deleted.
     * @returns { Promise<void> } delete intent result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @since 4.0.0(10)
     */
    /**
     * Delete the InsightIntent.
     * If the identifiers parameter is specified, the records corresponding to the identifiers under the intent
     * name will be deleted. Otherwise, all the records under the intent name will be deleted.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { string } intentName - Indicates the name of the intent to be deleted.
     * @param { string[] } identifiers - Indicates the identifiers of the intent to be deleted.
     * @returns { Promise<void> } delete intent result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    function deleteIntent(context: common.BaseContext, intentName: string, identifiers?: string[]): Promise<void>;
    /**
     * Delete the InsightIntent entities by entity ids under the entity name.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { string } entityName - Indicates the name of the entities to be deleted.
     * @param { string[] } entityIds - Indicates the ids of the entities to be deleted.
     * @param { AsyncCallback<void> } callback - The callback of deleting entity result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @since 4.0.0(10)
     */
    /**
     * Delete the InsightIntent entities by entity ids under the entity name.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { string } entityName - Indicates the name of the entities to be deleted.
     * @param { string[] } entityIds - Indicates the ids of the entities to be deleted.
     * @param { AsyncCallback<void> } callback - The callback of deleting entity result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    function deleteEntity(context: common.BaseContext, entityName: string, entityIds: string[], callback: AsyncCallback<void>): void;
    /**
     * Delete the InsightIntent entities by entity ids under the entity name.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { string } entityName - Indicates the name of the entities to be deleted.
     * @param { string[] } entityIds - Indicates the ids of the entities to be deleted.
     * @returns { Promise<void> } delete entity result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @since 4.0.0(10)
     */
    /**
     * Delete the InsightIntent entities by entity ids under the entity name.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { string } entityName - Indicates the name of the entities to be deleted.
     * @param { string[] } entityIds - Indicates the ids of the entities to be deleted.
     * @returns { Promise<void> } delete entity result.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    function deleteEntity(context: common.BaseContext, entityName: string, entityIds: string[]): Promise<void>;
    /**
     * Obtains a service open ID.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { boolean } renew - Whether to forcibly obtain a new service open ID from the cloud. true: yes; false: no.
     * If false, obtain a service open ID that is stored locally. If there is no such a service open ID, obtain one from the cloud.
     * @returns { Promise<string> } Service Open Id.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1000101101 - The application has not been registered with the InsightIntent.
     * @throws { BusinessError } 1000101102 - HUAWEI Assistant has stopped providing services.
     * @throws { BusinessError } 1000101103 - The switch of the app in the Data source has been turned off.
     * @throws { BusinessError } 1000101107 - Too many Service Open ID renew requests.
     * @throws { BusinessError } 1000101201 - The service is abnormal.
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getSid(context: common.BaseContext, renew: boolean): Promise<string>;
    /**
     * Indicates the InsightIntent.
     *
     * @typedef InsightIntent
     * @syscap SystemCapability.AI.InsightIntent
     * @since 4.0.0(10)
     */
    /**
     * Indicates the InsightIntent.
     *
     * @typedef InsightIntent
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface InsightIntent {
        /**
         * Indicates the name of the intent.
         *
         * @type { string }
         * @syscap SystemCapability.AI.InsightIntent
         * @since 4.0.0(10)
         */
        /**
         * Indicates the name of the intent.
         *
         * @type { string }
         * @syscap SystemCapability.AI.InsightIntent
         * @atomicservice
         * @since 5.0.0(12)
         */
        intentName: string;
        /**
         * Indicates the version of the intent.
         *
         * @type { string }
         * @syscap SystemCapability.AI.InsightIntent
         * @since 4.0.0(10)
         */
        /**
         * Indicates the version of the intent.
         *
         * @type { string }
         * @syscap SystemCapability.AI.InsightIntent
         * @atomicservice
         * @since 5.0.0(12)
         */
        intentVersion: string;
        /**
         * Indicates the identifier of the intent.
         *
         * @type { string }
         * @syscap SystemCapability.AI.InsightIntent
         * @since 4.0.0(10)
         */
        /**
         * Indicates the identifier of the intent.
         *
         * @type { string }
         * @syscap SystemCapability.AI.InsightIntent
         * @atomicservice
         * @since 5.0.0(12)
         */
        identifier: string;
        /**
         * Indicates action info of the intent.
         *
         * @type { object }
         * @syscap SystemCapability.AI.InsightIntent
         * @since 4.0.0(10)
         */
        /**
         * Indicates action info of the intent.
         *
         * @type { IntentActionInfo }
         * @syscap SystemCapability.AI.InsightIntent
         * @atomicservice
         * @since 5.0.0(12)
         */
        intentActionInfo: IntentActionInfo;
        /**
         * Indicates entity info of the intent.
         *
         * @type { object }
         * @syscap SystemCapability.AI.InsightIntent
         * @since 4.0.0(10)
         */
        /**
         * Indicates entity info of the intent.
         *
         * @type { IntentEntityInfo }
         * @syscap SystemCapability.AI.InsightIntent
         * @atomicservice
         * @since 5.0.0(12)
         */
        intentEntityInfo: IntentEntityInfo;
    }
    /**
     * Indicates the IntentEntityInfo.
     *
     * @typedef IntentEntityInfo
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface IntentEntityInfo {
        /**
         * Indicates the unique identifier of the intent entity, which is customized by the developer.
         *
         * @type { string }
         * @syscap SystemCapability.AI.InsightIntent
         * @atomicservice
         * @since 5.0.0(12)
         */
        entityId: string;
        /**
         * Indicates the name of the intent entity.
         *
         * @type { string }
         * @syscap SystemCapability.AI.InsightIntent
         * @atomicservice
         * @since 5.0.0(12)
         */
        entityName: string;
        /**
         * Indicates other field values of the intent entity.
         *
         * @type { object }
         * @syscap SystemCapability.AI.InsightIntent
         * @atomicservice
         * @since 5.0.0(12)
         */
        [key: string]: Object;
    }
    /**
     * Indicates the IntentActionInfo.
     *
     * @typedef IntentActionInfo
     * @syscap SystemCapability.AI.InsightIntent
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface IntentActionInfo {
        /**
         * Indicates the field values of the intent action.
         *
         * @type { object }
         * @syscap SystemCapability.AI.InsightIntent
         * @atomicservice
         * @since 5.0.0(12)
         */
        [key: string]: Object;
    }
}
export default insightIntent;
