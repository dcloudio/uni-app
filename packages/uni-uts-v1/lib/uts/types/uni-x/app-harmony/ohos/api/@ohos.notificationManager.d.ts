/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
 * @kit NotificationKit
 */
import { AsyncCallback } from './@ohos.base';
import { BundleOption as _BundleOption } from './notification/NotificationCommonDef';
import { NotificationActionButton as _NotificationActionButton } from './notification/notificationActionButton';
import { NotificationBasicContent as _NotificationBasicContent } from './notification/notificationContent';
import { NotificationContent as _NotificationContent } from './notification/notificationContent';
import { NotificationLongTextContent as _NotificationLongTextContent } from './notification/notificationContent';
import { NotificationMultiLineContent as _NotificationMultiLineContent } from './notification/notificationContent';
import { NotificationPictureContent as _NotificationPictureContent } from './notification/notificationContent';
import { NotificationSystemLiveViewContent as _NotificationSystemLiveViewContent } from './notification/notificationContent';
import { NotificationCapsule as _NotificationCapsule } from './notification/notificationContent';
import { NotificationButton as _NotificationButton } from './notification/notificationContent';
import { NotificationTime as _NotificationTime } from './notification/notificationContent';
import { NotificationProgress as _NotificationProgress } from './notification/notificationContent';
import { NotificationRequest as _NotificationRequest } from './notification/notificationRequest';
import { DistributedOptions as _DistributedOptions } from './notification/notificationRequest';
import { NotificationSlot as _NotificationSlot } from './notification/notificationSlot';
import { NotificationTemplate as _NotificationTemplate } from './notification/notificationTemplate';
import { NotificationUserInput as _NotificationUserInput } from './notification/notificationUserInput';
import type UIAbilityContext from './application/UIAbilityContext';
/**
 * Manages notifications.
 * <p>Generally, only system applications have permissions on notification subscription and unsubscribe.
 * You can specify the content of a notification to be published and the content is carried by
 * {@link NotificationRequest}. A notification ID is unique in an application and must be specified
 * when using {@link NotificationRequest} to carry the notification content. If a notification
 * with this ID has been published and you need to use this ID to publish another notification,
 * the original notification will be updated. In addition, the notification ID can be used to cancel
 * a notification by calling the {@link #cancel(int)} method.
 *
 * @namespace notificationManager
 * @syscap SystemCapability.Notification.Notification
 * @since 9
 */
/**
 * Manages notifications.
 * <p>Generally, only system applications have permissions on notification subscription and unsubscribe.
 * You can specify the content of a notification to be published and the content is carried by
 * {@link NotificationRequest}. A notification ID is unique in an application and must be specified
 * when using {@link NotificationRequest} to carry the notification content. If a notification
 * with this ID has been published and you need to use this ID to publish another notification,
 * the original notification will be updated. In addition, the notification ID can be used to cancel
 * a notification by calling the {@link #cancel(int)} method.
 *
 * @namespace notificationManager
 * @syscap SystemCapability.Notification.Notification
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace notificationManager {
    /**
     * Publishes a notification.
     * <p>If a notification with the same ID has been published by the current application and has not been deleted,
     * this method will update the notification.
     *
     * @param { NotificationRequest } request - notification request
     * @param { AsyncCallback<void> } callback - The callback of publish.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600005 - Notification slot disabled.
     * @throws { BusinessError } 1600009 - The notification sending frequency reaches the upper limit.
     * @throws { BusinessError } 1600012 - No memory space.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Publishes a notification.
     * <p>If a notification with the same ID has been published by the current application and has not been deleted,
     * this method will update the notification.
     *
     * @param { NotificationRequest } request - notification request
     * @param { AsyncCallback<void> } callback - The callback of publish.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600005 - Notification slot disabled.
     * @throws { BusinessError } 1600007 - The notification does not exist.
     * @throws { BusinessError } 1600009 - The notification sending frequency reaches the upper limit.
     * @throws { BusinessError } 1600012 - No memory space.
     * @throws { BusinessError } 1600014 - No permission.
     * @throws { BusinessError } 1600015 - The current notification status does not support duplicate configurations.
     * @throws { BusinessError } 1600016 - The notification version for this update is too low.
     * @throws { BusinessError } 2300007 - Network unreachable.
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    /**
     * Publishes a notification.
     * <p>If a notification with the same ID has been published by the current application and has not been deleted,
     * this method will update the notification.
     *
     * @param { NotificationRequest } request - notification request
     * @param { AsyncCallback<void> } callback - The callback of publish.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600005 - Notification slot disabled.
     * @throws { BusinessError } 1600007 - The notification does not exist.
     * @throws { BusinessError } 1600009 - The notification sending frequency reaches the upper limit.
     * @throws { BusinessError } 1600012 - No memory space.
     * @throws { BusinessError } 1600014 - No permission.
     * @throws { BusinessError } 1600015 - The current notification status does not support duplicate configurations.
     * @throws { BusinessError } 1600016 - The notification version for this update is too low.
     * @throws { BusinessError } 2300007 - Network unreachable.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    function publish(request: NotificationRequest, callback: AsyncCallback<void>): void;
    /**
     * Publishes a notification.
     * <p>If a notification with the same ID has been published by the current application and has not been deleted,
     * this method will update the notification.
     *
     * @param { NotificationRequest } request - notification request
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600005 - Notification slot disabled.
     * @throws { BusinessError } 1600009 - The notification sending frequency reaches the upper limit.
     * @throws { BusinessError } 1600012 - No memory space.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Publishes a notification.
     * <p>If a notification with the same ID has been published by the current application and has not been deleted,
     * this method will update the notification.
     *
     * @param { NotificationRequest } request - notification request
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600005 - Notification slot disabled.
     * @throws { BusinessError } 1600007 - The notification does not exist.
     * @throws { BusinessError } 1600009 - The notification sending frequency reaches the upper limit.
     * @throws { BusinessError } 1600012 - No memory space.
     * @throws { BusinessError } 1600014 - No permission.
     * @throws { BusinessError } 1600015 - The current notification status does not support duplicate configurations.
     * @throws { BusinessError } 1600016 - The notification version for this update is too low.
     * @throws { BusinessError } 2300007 - Network unreachable.
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    /**
     * Publishes a notification.
     * <p>If a notification with the same ID has been published by the current application and has not been deleted,
     * this method will update the notification.
     *
     * @param { NotificationRequest } request - notification request
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600005 - Notification slot disabled.
     * @throws { BusinessError } 1600007 - The notification does not exist.
     * @throws { BusinessError } 1600009 - The notification sending frequency reaches the upper limit.
     * @throws { BusinessError } 1600012 - No memory space.
     * @throws { BusinessError } 1600014 - No permission.
     * @throws { BusinessError } 1600015 - The current notification status does not support duplicate configurations.
     * @throws { BusinessError } 1600016 - The notification version for this update is too low.
     * @throws { BusinessError } 2300007 - Network unreachable.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    function publish(request: NotificationRequest): Promise<void>;
    /**
     * Cancel a notification with the specified ID.
     *
     * @param { number } id - ID of the notification to cancel, which must be unique in the application.
     * @param { AsyncCallback<void> } callback - The callback of cancel.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600007 - The notification does not exist.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Cancel a notification with the specified ID.
     *
     * @param { number } id - ID of the notification to cancel, which must be unique in the application.
     * @param { AsyncCallback<void> } callback - The callback of cancel.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600007 - The notification does not exist.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    function cancel(id: number, callback: AsyncCallback<void>): void;
    /**
     * Cancel a notification with the specified label and ID.
     *
     * @param { number } id - ID of the notification to cancel, which must be unique in the application.
     * @param { string } label - Label of the notification to cancel.
     * @param { AsyncCallback<void> } callback - The callback of cancel.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600007 - The notification does not exist.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function cancel(id: number, label: string, callback: AsyncCallback<void>): void;
    /**
     * Cancel a notification with the specified label and ID.
     *
     * @param { number } id - ID of the notification to cancel, which must be unique in the application.
     * @param { string } [label] - Label of the notification to cancel.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600007 - The notification does not exist.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function cancel(id: number, label?: string): Promise<void>;
    /**
     * Cancel all notifications of the current application.
     *
     * @param { AsyncCallback<void> } callback - The callback of cancelAll.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Cancel all notifications of the current application.
     *
     * @param { AsyncCallback<void> } callback - The callback of cancelAll.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    function cancelAll(callback: AsyncCallback<void>): void;
    /**
     * Cancel all notifications of the current application.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Cancel all notifications of the current application.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    function cancelAll(): Promise<void>;
    /**
     * Adds a slot type.
     *
     * @param { SlotType } type - Slot type to add.
     * @param { AsyncCallback<void> } callback - The callback of addSlot.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600012 - No memory space.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function addSlot(type: SlotType, callback: AsyncCallback<void>): void;
    /**
     * Adds a slot type.
     *
     * @param { SlotType } type - Slot type to add.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600012 - No memory space.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function addSlot(type: SlotType): Promise<void>;
    /**
     * Obtains a notification slot of the specified slot type.
     *
     * @param { SlotType } slotType - Type of the notification slot to obtain.
     * @param { AsyncCallback<NotificationSlot> } callback - The callback is used to return the NotificationSlot.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function getSlot(slotType: SlotType, callback: AsyncCallback<NotificationSlot>): void;
    /**
     * Obtains a notification slot of the specified slot type.
     *
     * @param { SlotType } slotType - Type of the notification slot to obtain.
     * @returns { Promise<NotificationSlot> } Returns the NotificationSlot.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function getSlot(slotType: SlotType): Promise<NotificationSlot>;
    /**
     * Obtains all NotificationSlot objects created by the current application.
     *
     * @param { AsyncCallback<Array<NotificationSlot>> } callback - The callback is used to return all notification slots
     *                                                              of this application.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function getSlots(callback: AsyncCallback<Array<NotificationSlot>>): void;
    /**
     * Obtains all NotificationSlot objects created by the current application.
     *
     * @returns { Promise<Array<NotificationSlot>> } Returns all notification slots of this application.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function getSlots(): Promise<Array<NotificationSlot>>;
    /**
     * Removes a NotificationSlot of the specified SlotType created by the current application.
     *
     * @param { SlotType } slotType - Type of the NotificationSlot to remove.
     * @param { AsyncCallback<void> } callback - The callback of removeSlot.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function removeSlot(slotType: SlotType, callback: AsyncCallback<void>): void;
    /**
     * Removes a NotificationSlot of the specified SlotType created by the current application.
     *
     * @param { SlotType } slotType - Type of the NotificationSlot to remove.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function removeSlot(slotType: SlotType): Promise<void>;
    /**
     * Removes all NotificationSlot objects created by the current application.
     *
     * @param { AsyncCallback<void> } callback - The callback of removeAllSlots.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function removeAllSlots(callback: AsyncCallback<void>): void;
    /**
     * Removes all NotificationSlot objects created by the current application.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function removeAllSlots(): Promise<void>;
    /**
     * Checks whether this application allows to publish notifications.
     *
     * @permission ohos.permission.NOTIFICATION_CONTROLLER
     * @param { AsyncCallback<boolean> } callback - The callback of isNotificationEnabled.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 202 - Not system application to call the interface.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @systemapi
     * @since 9
     */
    /**
     * Checks whether this application allows to publish notifications.
     *
     * @param { AsyncCallback<boolean> } callback - The callback of isNotificationEnabled.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600008 - The user does not exist.
     * @throws { BusinessError } 17700001 - The specified bundle name was not found.
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    /**
     * Checks whether this application allows to publish notifications.
     *
     * @param { AsyncCallback<boolean> } callback - The callback of isNotificationEnabled.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600008 - The user does not exist.
     * @throws { BusinessError } 17700001 - The specified bundle name was not found.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    function isNotificationEnabled(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether this application allows to publish notifications.
     *
     * @permission ohos.permission.NOTIFICATION_CONTROLLER
     * @returns { Promise<boolean> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 202 - Not system application to call the interface.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @systemapi
     * @since 9
     */
    /**
     * Checks whether this application allows to publish notifications.
     *
     * @returns { Promise<boolean> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600008 - The user does not exist.
     * @throws { BusinessError } 17700001 - The specified bundle name was not found.
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    /**
     * Checks whether this application allows to publish notifications.
     *
     * @returns { Promise<boolean> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600008 - The user does not exist.
     * @throws { BusinessError } 17700001 - The specified bundle name was not found.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    function isNotificationEnabled(): Promise<boolean>;
    /**
     * Checks whether this application allows to publish notifications.
     *
     * @returns { boolean } Returned by the function.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 12
     */
    function isNotificationEnabledSync(): boolean;
    /**
     * Obtains the number of all active notifications.
     *
     * @param { AsyncCallback<number> } callback - The callback of getActiveNotificationCount.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function getActiveNotificationCount(callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of all active notifications.
     *
     * @returns { Promise<number> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function getActiveNotificationCount(): Promise<number>;
    /**
     * Obtains an array of active notifications.
     *
     * @param { AsyncCallback<Array<NotificationRequest>> } callback - The callback of getActiveNotifications.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function getActiveNotifications(callback: AsyncCallback<Array<NotificationRequest>>): void;
    /**
     * Obtains an array of active notifications.
     *
     * @returns { Promise<Array<NotificationRequest>> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function getActiveNotifications(): Promise<Array<NotificationRequest>>;
    /**
     * Cancel the notification of a specified group for this application.
     *
     * @param { string } groupName - The name of the group.
     * @param { AsyncCallback<void> } callback - The callback of cancelGroup.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function cancelGroup(groupName: string, callback: AsyncCallback<void>): void;
    /**
     * Cancel the notification of a specified group for this application.
     *
     * @param { string } groupName - The name of the group.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function cancelGroup(groupName: string): Promise<void>;
    /**
     * Obtains whether the template is supported by the system.
     *
     * @param { string } templateName - Name of template to be Obtained.
     * @param { AsyncCallback<boolean> } callback - The callback is used to return whether the template is supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function isSupportTemplate(templateName: string, callback: AsyncCallback<boolean>): void;
    /**
     * Obtains whether the template is supported by the system.
     *
     * @param { string } templateName - Name of template to be Obtained.
     * @returns { Promise<boolean> } Returns whether the template is supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function isSupportTemplate(templateName: string): Promise<boolean>;
    /**
     * Request permission to send notification.
     *
     * @param { AsyncCallback<void> } callback - The callback of requestEnableNotification.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Request permission to send notification.
     *
     * @param { AsyncCallback<void> } callback - The callback of requestEnableNotification.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600013 - A notification dialog box is already displayed.
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    /**
     * Request permission to send notification.
     *
     * @param { AsyncCallback<void> } callback - The callback of requestEnableNotification.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600013 - A notification dialog box is already displayed.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     * @deprecated since 12
     * @useinstead requestEnableNotification
     */
    function requestEnableNotification(callback: AsyncCallback<void>): void;
    /**
     * Request permission to send notification.
     *
     * @param { UIAbilityContext } context - The context indicates the ability context you want to bind;
     * @param { AsyncCallback<void> } callback - The callback of requestEnableNotification.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @StageModelOnly
     * @since 10
     */
    /**
     * Request permission to send notification.
     *
     * @param { UIAbilityContext } context - The context indicates the ability context you want to bind;
     * @param { AsyncCallback<void> } callback - The callback of requestEnableNotification.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600013 - A notification dialog box is already displayed.
     * @syscap SystemCapability.Notification.Notification
     * @StageModelOnly
     * @since 11
     */
    /**
     * Request permission to send notification.
     *
     * @param { UIAbilityContext } context - The context indicates the ability context you want to bind;
     * @param { AsyncCallback<void> } callback - The callback of requestEnableNotification.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600013 - A notification dialog box is already displayed.
     * @syscap SystemCapability.Notification.Notification
     * @StageModelOnly
     * @crossplatform
     * @since 12
     */
    function requestEnableNotification(context: UIAbilityContext, callback: AsyncCallback<void>): void;
    /**
     * Request permission to send notification.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Request permission to send notification.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600013 - A notification dialog box is already displayed.
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    /**
     * Request permission to send notification.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600013 - A notification dialog box is already displayed.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     * @deprecated since 12
     * @useinstead requestEnableNotification
     */
    function requestEnableNotification(): Promise<void>;
    /**
     * Request permission to send notification.
     *
     * @param { UIAbilityContext } context - The context indicates the ability context you want to bind;
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @syscap SystemCapability.Notification.Notification
     * @StageModelOnly
     * @since 10
     */
    /**
     * Request permission to send notification.
     *
     * @param { UIAbilityContext } context - The context indicates the ability context you want to bind;
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600013 - A notification dialog box is already displayed.
     * @syscap SystemCapability.Notification.Notification
     * @StageModelOnly
     * @since 11
     */
    /**
     * Request permission to send notification.
     *
     * @param { UIAbilityContext } context - The context indicates the ability context you want to bind;
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600004 - Notification disabled.
     * @throws { BusinessError } 1600013 - A notification dialog box is already displayed.
     * @syscap SystemCapability.Notification.Notification
     * @StageModelOnly
     * @crossplatform
     * @since 12
     */
    function requestEnableNotification(context: UIAbilityContext): Promise<void>;
    /**
     * Obtains whether the device supports distributed notification.
     *
     * @param { AsyncCallback<boolean> } callback - The callback is used to return whether the distributed
     *                                              notification is supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600010 - Distributed operation failed.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function isDistributedEnabled(callback: AsyncCallback<boolean>): void;
    /**
     * Obtains whether the device supports distributed notification.
     *
     * @returns { Promise<boolean> } Returns whether the distributed notification is supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600010 - Distributed operation failed.
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    function isDistributedEnabled(): Promise<boolean>;
    /**
     * Set badge number.
     *
     * @param { number } badgeNumber - Badge number.
     * @param { AsyncCallback<void> } callback - callback - The callback of setBadgeNumber..
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600012 - No memory space.
     * @syscap SystemCapability.Notification.Notification
     * @since 10
     */
    /**
     * Set badge number.
     *
     * @param { number } badgeNumber - Badge number.
     * @param { AsyncCallback<void> } callback - callback - The callback of setBadgeNumber..
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600012 - No memory space.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    function setBadgeNumber(badgeNumber: number, callback: AsyncCallback<void>): void;
    /**
     * Set badge number.
     *
     * @param { number } badgeNumber - Badge number.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600012 - No memory space.
     * @syscap SystemCapability.Notification.Notification
     * @since 10
     */
    /**
     * Set badge number.
     *
     * @param { number } badgeNumber - Badge number.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 1600001 - Internal error.
     * @throws { BusinessError } 1600002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1600003 - Failed to connect to the service.
     * @throws { BusinessError } 1600012 - No memory space.
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    function setBadgeNumber(badgeNumber: number): Promise<void>;
    /**
     * Describes NotificationSlot types.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Describes NotificationSlot types.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Notification
     * @atomicservice
     * @since 12
     */
    export enum SlotType {
        /**
         * NotificationSlot of an unknown type.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        /**
         * NotificationSlot of an unknown type.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        UNKNOWN_TYPE = 0,
        /**
         * NotificationSlot for social communication.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        /**
         * NotificationSlot for social communication.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        SOCIAL_COMMUNICATION = 1,
        /**
         * NotificationSlot for service information.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        /**
         * NotificationSlot for service information.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        SERVICE_INFORMATION = 2,
        /**
         * NotificationSlot for content information.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        /**
         * NotificationSlot for content information.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        CONTENT_INFORMATION = 3,
        /**
         * NotificationSlot for live view.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 11
         */
        /**
         * NotificationSlot for live view.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        LIVE_VIEW = 4,
        /**
         * NotificationSlot for customer service.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 11
         */
        /**
         * NotificationSlot for customer service.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        CUSTOMER_SERVICE = 5,
        /**
         * NotificationSlot for other purposes.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        /**
         * NotificationSlot for other purposes.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        OTHER_TYPES = 0xFFFF
    }
    /**
     * Describes notification content types.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Describes notification content types.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export enum ContentType {
        /**
         * Normal text notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        /**
         * Normal text notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        NOTIFICATION_CONTENT_BASIC_TEXT,
        /**
         * Long text notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        /**
         * Long text notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        NOTIFICATION_CONTENT_LONG_TEXT,
        /**
         * Picture-attached notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        /**
         * Picture-attached notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        NOTIFICATION_CONTENT_PICTURE,
        /**
         * Conversation notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        /**
         * Conversation notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        NOTIFICATION_CONTENT_CONVERSATION,
        /**
         * Multi-line text notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        /**
         * Multi-line text notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        NOTIFICATION_CONTENT_MULTILINE,
        /**
         * System local live view notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 11
         */
        /**
         * System local live view notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        NOTIFICATION_CONTENT_SYSTEM_LIVE_VIEW,
        /**
         * Common live view notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 11
         */
        /**
         * Common live view notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @atomicservice
         * @since 12
         */
        NOTIFICATION_CONTENT_LIVE_VIEW
    }
    /**
     * Indicates the level of the slot
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    export enum SlotLevel {
        /**
         * Indicates that the notification function is disabled.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        LEVEL_NONE = 0,
        /**
         * Indicates that the notification function is enabled but notification
         * icons are not displayed in the status bar, with no banner or prompt tone.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        LEVEL_MIN = 1,
        /**
         * Indicates that the notification function is enabled and notification
         * icons are displayed in the status bar, with no banner or prompt tone.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        LEVEL_LOW = 2,
        /**
         * Indicates that the notification function is enabled and notification
         * icons are displayed in the status bar, with no banner but with a prompt tone.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        LEVEL_DEFAULT = 3,
        /**
         * Indicates that the notification function is enabled and notification
         * icons are displayed in the status bar, with a banner and a prompt tone.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 9
         */
        LEVEL_HIGH = 4
    }
    /**
     * Describes a bundleOption in a notification.
     *
     * @typedef { _BundleOption } BundleOption
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    export type BundleOption = _BundleOption;
    /**
     * Describes an action button displayed in a notification.
     *
     * @typedef { _NotificationActionButton } NotificationActionButton
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    export type NotificationActionButton = _NotificationActionButton;
    /**
     * Describes a normal text notification.
     *
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Describes a normal text notification.
     *
     * @typedef { _NotificationBasicContent } NotificationBasicContent
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    export type NotificationBasicContent = _NotificationBasicContent;
    /**
     * Describes notification types.
     *
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Describes notification types.
     *
     * @typedef { _NotificationContent } NotificationContent
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    export type NotificationContent = _NotificationContent;
    /**
     * Describes a long text notification.
     *
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Describes a long text notification.
     *
     * @typedef { _NotificationLongTextContent } NotificationLongTextContent
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    export type NotificationLongTextContent = _NotificationLongTextContent;
    /**
     * Describes a multi-line text notification.
     *
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Describes a multi-line text notification.
     *
     * @typedef { _NotificationMultiLineContent } NotificationMultiLineContent
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    export type NotificationMultiLineContent = _NotificationMultiLineContent;
    /**
     * Describes a picture-attached notification.
     *
     * @typedef { _NotificationPictureContent } NotificationPictureContent
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    export type NotificationPictureContent = _NotificationPictureContent;
    /**
     * Describes a system live view notification.
     *
     * @typedef { _NotificationSystemLiveViewContent } NotificationSystemLiveViewContent
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    export type NotificationSystemLiveViewContent = _NotificationSystemLiveViewContent;
    /**
     * Defines a NotificationRequest instance.
     *
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Defines a NotificationRequest instance.
     *
     * @typedef { _NotificationRequest } NotificationRequest
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    export type NotificationRequest = _NotificationRequest;
    /**
     * Describes distributed options.
     *
     * @typedef { _DistributedOptions } DistributedOptions
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    export type DistributedOptions = _DistributedOptions;
    /**
     * Describes a NotificationSlot instance.
     *
     * @typedef { _NotificationSlot } NotificationSlot
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    export type NotificationSlot = _NotificationSlot;
    /**
     * Describes a NotificationTemplate instance.
     *
     * @typedef { _NotificationTemplate } NotificationTemplate
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    export type NotificationTemplate = _NotificationTemplate;
    /**
     * Describes a NotificationUserInput instance.
     *
     * @typedef { _NotificationUserInput } NotificationUserInput
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    export type NotificationUserInput = _NotificationUserInput;
    /**
     * Describes a system live view capsule type.
     *
     * @typedef { _NotificationCapsule } NotificationCapsule
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    export type NotificationCapsule = _NotificationCapsule;
    /**
     * Describes a system live view button type.
     *
     * @typedef { _NotificationButton } NotificationButton
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    export type NotificationButton = _NotificationButton;
    /**
     * Describes a system live view time type.
     *
     * @typedef { _NotificationTime } NotificationTime
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    export type NotificationTime = _NotificationTime;
    /**
     * Describes a system live view progress type.
     *
     * @typedef { _NotificationProgress } NotificationProgress
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    export type NotificationProgress = _NotificationProgress;
}
export default notificationManager;
