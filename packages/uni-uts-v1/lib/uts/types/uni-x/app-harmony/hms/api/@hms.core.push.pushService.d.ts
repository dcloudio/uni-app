/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Defines module of push service.
 * @kit PushKit
 */
import type { AsyncCallback, Callback } from '@ohos.base';
import type Ability from '@ohos.app.ability.Ability';
import type pushCommon from '@hms.core.push.pushCommon';
/**
 * This module of push service.
 * @namespace pushService
 * @syscap SystemCapability.Push.PushService
 * @stagemodelonly
 * @since 4.0.0(10)
 */
/**
 * This module of push service.
 * @namespace pushService
 * @syscap SystemCapability.Push.PushService
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace pushService {
    /**
     * Obtains a token from push service.
     * @param { AsyncCallback<string> } callback - Indicates the callback to get token.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900012 - Push rights are not activated.
     * @throws { BusinessError } 1000900013 - Cross-location application is not allowed to obtain the token.
     * @throws { BusinessError } 1000900014 - The device does not support getting token.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Obtains a token from push service.
     * @param { AsyncCallback<string> } callback - Indicates the callback to get token.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900012 - Push rights are not activated.
     * @throws { BusinessError } 1000900013 - Cross-location application is not allowed to obtain the token.
     * @throws { BusinessError } 1000900014 - The device does not support getting token.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function getToken(callback: AsyncCallback<string>): void;
    /**
     * Obtains a token from push service.
     * @returns { Promise<string> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900012 - Push rights are not activated.
     * @throws { BusinessError } 1000900013 - Cross-location application is not allowed to obtain the token.
     * @throws { BusinessError } 1000900014 - The device does not support getting token.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Obtains a token from push service.
     * @returns { Promise<string> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900012 - Push rights are not activated.
     * @throws { BusinessError } 1000900013 - Cross-location application is not allowed to obtain the token.
     * @throws { BusinessError } 1000900014 - The device does not support getting token.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function getToken(): Promise<string>;
    /**
     * Delete a token from push service.
     * @param { AsyncCallback<void> } callback - Indicates the callback to delete token.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Delete a token from push service.
     * @param { AsyncCallback<void> } callback - Indicates the callback to delete token.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function deleteToken(callback: AsyncCallback<void>): void;
    /**
     * Delete a token from push service.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Delete a token from push service.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function deleteToken(): Promise<void>;
    /**
     * Receive push message.
     * @param { 'IM' | 'VoIP' | 'BACKGROUND' } pushType - The push type of message to receive.
     * @param { Ability } ability - Application ability information.
     * @param { Callback<pushCommon.PushPayload>} onMessage - Callback after receiving the message.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900005 - Messages of the same push type cannot be received repeatedly.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Receive push message.
     * @param { 'IM' | 'VoIP' | 'BACKGROUND' | 'EMERGENCY' } pushType - The push type of message to receive.
     * @param { Ability } ability - Application ability information.
     * @param { Callback<pushCommon.PushPayload>} onMessage - Callback after receiving the message.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900005 - Messages of the same push type cannot be received repeatedly.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    export function receiveMessage(pushType: 'IM' | 'VoIP' | 'BACKGROUND' | 'EMERGENCY', ability: Ability, onMessage: Callback<pushCommon.PushPayload>): void;
    /**
     * Bind the relationship between the profile and application on the device.
     * @param { pushCommon.AppProfileType } appProfileType - The profile type of the application.
     * @param { string } appProfileId - The profile id of the application.
     * @param { AsyncCallback<void> } callback - Indicates the callback to bindAppProfileId.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900015 - The number of bound profile-app relationships exceeds the maximum.
     * @throws { BusinessError } 1000900016 - The os distributed account is not logged in.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    export function bindAppProfileId(appProfileType: pushCommon.AppProfileType, appProfileId: string, callback: AsyncCallback<void>): void;
    /**
     * Bind the relationship between the profile and application on the device.
     * @param { pushCommon.AppProfileType } appProfileType - The profile type of the application.
     * @param { string } appProfileId - The profile id of the application.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900015 - The number of bound profile-app relationships exceeds the maximum.
     * @throws { BusinessError } 1000900016 - The os distributed account is not logged in.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    export function bindAppProfileId(appProfileType: pushCommon.AppProfileType, appProfileId: string): Promise<void>;
    /**
     * Unbind the relationship between the profile and application on the device.
     * @param { string } appProfileId - The profile id of the application.
     * @param { AsyncCallback<void> } callback - Indicates the callback to bindAppProfileId.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    export function unbindAppProfileId(appProfileId: string, callback: AsyncCallback<void>): void;
    /**
     * Unbind the relationship between the profile and application on the device.
     * @param { string } appProfileId - The profile id of the application.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    export function unbindAppProfileId(appProfileId: string): Promise<void>;
}
export default pushService;
