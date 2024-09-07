/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Defines module of service notification.
 * @kit PushKit
 */
import type { AsyncCallback } from '@ohos.base';
import type Context from '@ohos.inner.application.Context';
/**
 * This module of service notification.
 *
 * @namespace serviceNotification
 * @syscap SystemCapability.Push.PushService
 * @StageModelOnly
 * @since 4.1.0(11)
 */
/**
* This module of service notification.
*
* @namespace serviceNotification
* @syscap SystemCapability.Push.PushService
* @StageModelOnly
* @atomicservice
* @since 5.0.0(12)
*/
declare namespace serviceNotification {
    /**
     * Request subscribe notification.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Array<string> } entityIds - Indicates ids of the entities to be subscribed.
     * @param { AsyncCallback<RequestResult> } callback - The callback of requestSubscribeNotification.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900017 - Current operation does not support.
     * @throws { BusinessError } 1000900018 - Number of calls exceeded.
     * @throws { BusinessError } 1000900019 - Illegal entity id.
     * @throws { BusinessError } 1000900020 - App token is empty.
     * @throws { BusinessError } 1000900021 - App is not available or not registered.
     * @throws { BusinessError } 1000900022 - Notification switch off.
     * @throws { BusinessError } 1000900023 - Number of entity ids exceed the upper limit.
     * @throws { BusinessError } 1000900024 - Failed to display subscription UI.
     * @throws { BusinessError } 1000900025 - No rights to access entity id.
     * @throws { BusinessError } 1000900026 - Illegal entity type.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export function requestSubscribeNotification(context: Context, entityIds: Array<string>, callback: AsyncCallback<RequestResult>): void;
    /**
     * Request subscribe notification.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Array<string> } entityIds - Indicates ids of the entities to be subscribed.
     * @returns { Promise<SubscribeResult> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900017 - Current operation does not support.
     * @throws { BusinessError } 1000900018 - Number of calls exceeded.
     * @throws { BusinessError } 1000900019 - Illegal entity id.
     * @throws { BusinessError } 1000900020 - App token is empty.
     * @throws { BusinessError } 1000900021 - App is not available or not registered.
     * @throws { BusinessError } 1000900022 - Notification switch off.
     * @throws { BusinessError } 1000900023 - Number of entity ids exceed the upper limit.
     * @throws { BusinessError } 1000900024 - Failed to display subscription UI.
     * @throws { BusinessError } 1000900025 - No rights to access entity id.
     * @throws { BusinessError } 1000900026 - Illegal entity type.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    /**
     * Request subscribe notification.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Array<string> } entityIds - Indicates ids of the entities to be subscribed.
     * @param { SubscribeNotificationType } type - Indicates subscribe notification type to be subscribed.
     * @returns { Promise<RequestResult> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900017 - Current operation does not support.
     * @throws { BusinessError } 1000900018 - Number of calls exceeded.
     * @throws { BusinessError } 1000900019 - Illegal entity id.
     * @throws { BusinessError } 1000900020 - App token is empty.
     * @throws { BusinessError } 1000900021 - App is not available or not registered.
     * @throws { BusinessError } 1000900022 - Notification switch off.
     * @throws { BusinessError } 1000900023 - Number of entity ids exceed the upper limit.
     * @throws { BusinessError } 1000900024 - Failed to display subscription UI.
     * @throws { BusinessError } 1000900025 - No rights to access entity id.
     * @throws { BusinessError } 1000900026 - Illegal entity type.
     * @throws { BusinessError } 1000900030 - The user has not logged in with HUAWEI ID.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function requestSubscribeNotification(context: Context, entityIds: Array<string>, type?: SubscribeNotificationType): Promise<RequestResult>;
    /**
     * Request result of entity ids.
     *
     * @typedef RequestResult
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    /**
    * Request result of entity ids.
    *
    * @typedef RequestResult
    * @syscap SystemCapability.Push.PushService
    * @StageModelOnly
    * @atomicservice
    * @since 5.0.0(12)
    */
    export interface RequestResult {
        /**
         * Result of subscribed entities.
         *
         * @type { Array<EntityResult> }
         * @readonly
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * Result of subscribed entities.
         *
         * @type { Array<EntityResult> }
         * @readonly
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly entityResult: Array<EntityResult>;
    }
    /**
     * Entity result.
     *
     * @typedef EntityResult
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    /**
    * Entity result.
    *
    * @typedef EntityResult
    * @syscap SystemCapability.Push.PushService
    * @StageModelOnly
    * @atomicservice
    * @since 5.0.0(12)
    */
    export interface EntityResult {
        /**
         * Entity id.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * Entity id.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly entityId: string;
        /**
         * Result code.
         *
         * @type { ResultCode }
         * @readonly
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * Result code.
         *
         * @type { ResultCode }
         * @readonly
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly resultCode: ResultCode;
    }
    /**
     * The result code of entity.
     *
     * @enum { number }
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    /**
    * The result code of entity.
    *
    * @enum { number }
    * @syscap SystemCapability.Push.PushService
    * @StageModelOnly
    * @atomicservice
    * @since 5.0.0(12)
    */
    export enum ResultCode {
        /**
         * Entity is accepted.
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * Entity is accepted.
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ACCEPTED = 0,
        /**
         * Entity is rejected
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * Entity is rejected
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        REJECTED = 1,
        /**
         * Entity is filtered.
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * Entity is filtered.
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        FILTERED = 2,
        /**
         * Entity is banned.
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * Entity is banned.
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        BANNED = 3,
        /**
         * Unknown error.
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * Unknown error.
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNKNOWN = -1
    }
    /**
     * The type of the subscribe notification.
     *
     * @enum { number }
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export enum SubscribeNotificationType {
        /**
         * Subscribe with token.
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        SUBSCRIBE_WITH_TOKEN = 0,
        /**
         * Subscribe with HuaweiID.
         *
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        SUBSCRIBE_WITH_HUAWEI_ID = 1
    }
}
export default serviceNotification;
