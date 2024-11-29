/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the RingtoneKit api
 * @kit RingtoneKit
 */
import { AsyncCallback } from '@ohos.base';
import uniformTypeDescriptor from '@ohos.data.uniformTypeDescriptor';
import common from '@ohos.app.ability.common';
/**
 * Provides ringtone kit interfaces.
 *
 * @namespace ringtone
 * @syscap SystemCapability.Ringtone.Core
 * @since 5.0.0(12)
 */
declare namespace ringtone {
    /**
     * Enumerates for ringtone type.
     * @enum { number }
     * @syscap SystemCapability.Ringtone.Core
     * @since 5.0.0(12)
     */
    enum RingtoneType {
        /**
         * Call.
         * @syscap SystemCapability.Ringtone.Core
         * @since 5.0.0(12)
         */
        CALL = 0,
        /**
         * Message.
         * @syscap SystemCapability.Ringtone.Core
         * @since 5.0.0(12)
         */
        MESSAGE = 1,
        /**
         * Notifacation.
         * @syscap SystemCapability.Ringtone.Core
         * @since 5.0.0(12)
         */
        NOTIFICATION = 2,
        /**
         * Alarm.
         * @syscap SystemCapability.Ringtone.Core
         * @since 5.0.0(12)
         */
        ALARM = 3
    }
    /**
     * Query the ringtone types supported by the current system
     * @returns { Array<RingtoneType> } ringtone types supported by the current system.
     * @syscap SystemCapability.Ringtone.Core
     * @since 5.0.0(12)
     */
    function getSupportedRingtoneTypes(): Array<RingtoneType>;
    /**
     * Query the data types supported by the ringtoneType
     * @param { RingtoneType } ringtoneType - The ringtone type to be queried.
     * @returns { Array<uniformTypeDescriptor.UniformDataType> } data types supported by the ringtone type.
     * @throws { BusinessError } 401 - Parameter invalid.
     * @syscap SystemCapability.Ringtone.Core
     * @since 5.0.0(12)
     */
    function getSupportedDataTypes(ringtoneType: RingtoneType): Array<uniformTypeDescriptor.UniformDataType>;
    /**
     * Query the max duration supported by the ringtoneType and data type.
     * @param { RingtoneType } ringtoneType - The ringtone type to be queried.
     * @param { uniformTypeDescriptor.UniformDataType } dataType - The data type to be queried.
     * @returns { number } max duration supported by the ringtoneType and data type.
     * @throws { BusinessError } 401 - Parameter invalid.
     * @syscap SystemCapability.Ringtone.Core
     * @since 5.0.0(12)
     */
    function getSupportedMaxDuration(ringtoneType: RingtoneType, dataType: uniformTypeDescriptor.UniformDataType): number;
    /**
     * Start the ringtone setting operation.
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } path - path indicates the file path to be seted.
     * @param { string } name - name indicates the ringtone name to be seted.
     * @param { AsyncCallback<RingtoneType> } callback - the callback of operation result.
     * @throws { BusinessError } 401 - Parameter invalid.
     * @throws { BusinessError } 1011600001 – User canceled.
     * @throws { BusinessError } 1011600002 – The media file is not found.
     * @throws { BusinessError } 1011600003 – Failed to show the dialog box.
     * @throws { BusinessError } 1011600004 – Failed to call the system API.
     * @throws { BusinessError } 1011600005 - System exception.
     * @syscap SystemCapability.Ringtone.Core
     * @since 5.0.0(12)
     */
    function startRingtoneSetting(context: common.UIAbilityContext, path: string, name: string, callback: AsyncCallback<RingtoneType>): void;
    /**
     * Start the ringtone setting operation.
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } path - path indicates the file path to be seted.
     * @param { string } name - name indicates the ringtone name to be seted.
     * @returns { Promise<RingtoneType> } the promise returned by the operation result.
     * @throws { BusinessError } 401 - Parameter invalid.
     * @throws { BusinessError } 1011600001 – User canceled.
     * @throws { BusinessError } 1011600002 – The media file is not found.
     * @throws { BusinessError } 1011600003 – Failed to show the dialog box.
     * @throws { BusinessError } 1011600004 – Failed to call the system API.
     * @throws { BusinessError } 1011600005 - System exception.
     * @syscap SystemCapability.Ringtone.Core
     * @since 5.0.0(12)
     */
    function startRingtoneSetting(context: common.UIAbilityContext, path: string, name: string): Promise<RingtoneType>;
    /**
     * Enumerates ringtonekit errors.
     * @enum {number}
     * @syscap SystemCapability.Ringtone.Core
     * @since 5.0.0(12)
     */
    enum RingtoneErrors {
        /**
         * Invalid parameter.
         * @syscap SystemCapability.Ringtone.Core
         * @since 5.0.0(12)
         */
        ERROR_INVALID_PARAM = 401,
        /**
         * User canceled.
         * @syscap SystemCapability.Ringtone.Core
         * @since 5.0.0(12)
         */
        ERROR_USER_CANCELED = 1011600001,
        /**
         * Media file not found.
         * @syscap SystemCapability.Ringtone.Core
         * @since 5.0.0(12)
         */
        ERROR_FILE_NOT_FOUND = 1011600002,
        /**
         * Show dialog failed
         * @syscap SystemCapability.Ringtone.Core
         * @since 5.0.0(12)
         */
        ERROR_SHOW_FAILED = 1011600003,
        /**
         * Call system api to set failed.
         * @syscap SystemCapability.Ringtone.Core
         * @since 5.0.0(12)
         */
        ERROR_CALL_SYSTEM_API_FAILED = 1011600004,
        /**
         * Default error.
         * @syscap SystemCapability.Ringtone.Core
         * @since 5.0.0(12)
         */
        ERROR_SYSTEM = 1011699999
    }
}
export default ringtone;
