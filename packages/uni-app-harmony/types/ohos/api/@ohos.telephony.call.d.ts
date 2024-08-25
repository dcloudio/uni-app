/*
 * Copyright (C) 2021-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit TelephonyKit
 */
import type { AsyncCallback } from './@ohos.base';
/**
 * Provides methods related to call management.
 *
 * @namespace call
 * @syscap SystemCapability.Telephony.CallManager
 * @since 6
 */
/**
 * Provides methods related to call management.
 *
 * @namespace call
 * @syscap SystemCapability.Telephony.CallManager
 * @atomicservice
 * @since 11
 */
declare namespace call {
    /**
     * Makes a call.
     *
     * @permission ohos.permission.PLACE_CALL
     * @param { string } phoneNumber - Indicates the called number.
     * @param { DialOptions } options - Indicates additional information carried in the call.
     * @param { AsyncCallback<boolean> } callback - Indicates the callback for getting the result of the call.
     * Returns {@code true} if the call request is successful; returns {@code false} otherwise.
     * Note that the value {@code true} indicates only the successful processing of the request; it does not mean
     * that the call is or can be connected.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 6
     * @deprecated since 9
     * @useinstead telephony.call#dialCall
     */
    function dial(phoneNumber: string, options: DialOptions, callback: AsyncCallback<boolean>): void;
    /**
     * Makes a call.
     *
     * @permission ohos.permission.PLACE_CALL
     * @param { string } phoneNumber - Indicates the called number.
     * @param { DialOptions } options - Indicates additional information carried in the call.
     * @returns { Promise<boolean> } Returns the result of the call.
     * Returns {@code true} if the call request is successful; returns {@code false} otherwise.
     * Note that the value {@code true} indicates only the successful processing of the request; it does not mean
     * that the call is or can be connected.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 6
     * @deprecated since 9
     * @useinstead telephony.call#dialCall
     */
    function dial(phoneNumber: string, options?: DialOptions): Promise<boolean>;
    /**
     * Makes a call.
     *
     * @permission ohos.permission.PLACE_CALL
     * @param { string } phoneNumber - Indicates the called number.
     * @param { AsyncCallback<boolean> } callback - Indicates the callback for getting the result of the call.
     * Returns {@code true} if the call request is successful; returns {@code false} otherwise.
     * Note that the value {@code true} indicates only the successful processing of the request; it does not mean
     * that the call is or can be connected.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 6
     * @deprecated since 9
     * @useinstead telephony.call#dialCall
     */
    function dial(phoneNumber: string, callback: AsyncCallback<boolean>): void;
    /**
     * Go to the dial screen and the called number is displayed.
     *
     * @param { string } phoneNumber - Indicates the called number.
     * @param { AsyncCallback<void> } callback - The callback of makeCall.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Applications.Contacts
     * @since 7
     */
    /**
     * Go to the dial screen and the called number is displayed.
     *
     * @param { string } phoneNumber - Indicates the called number.
     * @param { AsyncCallback<void> } callback - The callback of makeCall.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Applications.Contacts
     * @atomicservice
     * @since 11
     */
    function makeCall(phoneNumber: string, callback: AsyncCallback<void>): void;
    /**
     * Go to the dial screen and the called number is displayed.
     *
     * @param { string } phoneNumber - Indicates the called number.
     * @returns { Promise<void> } The promise returned by the makeCall.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Applications.Contacts
     * @since 7
     */
    /**
     * Go to the dial screen and the called number is displayed.
     *
     * @param { string } phoneNumber - Indicates the called number.
     * @returns { Promise<void> } The promise returned by the makeCall.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Applications.Contacts
     * @atomicservice
     * @since 11
     */
    function makeCall(phoneNumber: string): Promise<void>;
    /**
     * Checks whether a call is ongoing.
     *
     * @param { AsyncCallback<boolean> } callback - The callback of hasCall. Returns {@code true} if at least one call is
     * not in the {@link CallState#CALL_STATE_IDLE} state; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 6
     */
    function hasCall(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether a call is ongoing.
     *
     * @returns { Promise<boolean> } Returns {@code true} if at least one call is not
     * in the {@link CallState#CALL_STATE_IDLE} state; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 6
     */
    function hasCall(): Promise<boolean>;
    /**
     * Checks whether a call is ongoing.
     *
     * @returns { boolean } Returns {@code true} if at least one call is not in the {@link CallState#CALL_STATE_IDLE}
     * state; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 10
     */
    function hasCallSync(): boolean;
    /**
     * Obtains the call state.
     *
     * If an incoming call is ringing or waiting, the system returns {@code CallState#CALL_STATE_RINGING}.
     * If at least one call is in the active, hold, or dialing state, the system returns
     * {@code CallState#CALL_STATE_OFFHOOK}.
     * In other cases, the system returns {@code CallState#CALL_STATE_IDLE}.
     *
     * @param { AsyncCallback<CallState> } callback - Indicates the callback for getting the call state.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 6
     */
    function getCallState(callback: AsyncCallback<CallState>): void;
    /**
     * Obtains the call state.
     *
     * If an incoming call is ringing or waiting, the system returns {@code CallState#CALL_STATE_RINGING}.
     * If at least one call is in the active, hold, or dialing state, the system returns
     * {@code CallState#CALL_STATE_OFFHOOK}.
     * In other cases, the system returns {@code CallState#CALL_STATE_IDLE}.
     *
     * @returns { Promise<CallState> } Returns the call state.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 6
     */
    function getCallState(): Promise<CallState>;
    /**
     * Obtains the call state.
     *
     * If an incoming call is ringing or waiting, the system returns {@code CallState#CALL_STATE_RINGING}.
     * If at least one call is in the active, hold, or dialing state, the system returns
     * {@code CallState#CALL_STATE_OFFHOOK}. In other cases, the system returns {@code CallState#CALL_STATE_IDLE}.
     *
     * @returns { CallState } Returns the call state.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 10
     */
    function getCallStateSync(): CallState;
    /**
     * Checks whether a device supports voice calls.
     *
     * The system checks whether the device has the capability to initiate a circuit switching (CS) or IP multimedia
     * subsystem domain (IMS) call on a telephone service network. If the device supports only packet switching
     * (even if the device supports OTT calls), {@code false} is returned.
     *
     * @returns { boolean } Returns {@code true} if the device supports voice calls; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    function hasVoiceCapability(): boolean;
    /**
     * Checks whether a phone number is on the emergency number list.
     *
     * @param { string } phoneNumber - Indicates the phone number to check.
     * @param { EmergencyNumberOptions } options - Indicates the additional information for emergency numbers.
     * @param { AsyncCallback<boolean> } callback - Indicates the callback for isEmergencyPhoneNumber.
     * Returns {@code true} if the phone number is on the emergency number list. Returns {@code false} otherwise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    function isEmergencyPhoneNumber(phoneNumber: string, options: EmergencyNumberOptions, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether a phone number is on the emergency number list.
     *
     * @param { string } phoneNumber - Indicates the phone number to check.
     * @param { EmergencyNumberOptions } options - Indicates the additional information for emergency numbers.
     * @returns { Promise<boolean> } Returns {@code true} if the phone number is on the emergency number list.
     * Returns {@code false} otherwise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    function isEmergencyPhoneNumber(phoneNumber: string, options?: EmergencyNumberOptions): Promise<boolean>;
    /**
     * Checks whether a phone number is on the emergency number list.
     *
     * @param { string } phoneNumber - Indicates the phone number to check.
     * @param { AsyncCallback<boolean> } callback - Indicates the callback for isEmergencyPhoneNumber.
     * Returns {@code true} if the phone number is on the emergency number list. Returns {@code false} otherwise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    function isEmergencyPhoneNumber(phoneNumber: string, callback: AsyncCallback<boolean>): void;
    /**
     * Formats a phone number according to the Chinese Telephone Code Plan. Before the formatting,
     * a phone number is in the format of country code (if any) + 3-digit service provider code
     * + 4-digit area code + 4-digit subscriber number. After the formatting,
     * each part is separated by a space.
     *
     * @param { string } phoneNumber - Indicates the phone number to format.
     * @param { NumberFormatOptions } options - Indicates the country code option.
     * @param { AsyncCallback<string> } callback - Indicates the callback to obtain a formatted phone number.
     * Returns an empty string if the input phone number is invalid.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    function formatPhoneNumber(phoneNumber: string, options: NumberFormatOptions, callback: AsyncCallback<string>): void;
    /**
     * Formats a phone number according to the Chinese Telephone Code Plan. Before the formatting,
     * a phone number is in the format of country code (if any) + 3-digit service provider code
     * + 4-digit area code + 4-digit subscriber number. After the formatting,
     * each part is separated by a space.
     *
     * @param { string } phoneNumber - Indicates the phone number to format.
     * @param { NumberFormatOptions } options - Indicates the country code option.
     * @returns { Promise<string> } Returns the phone number after being formatted.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    function formatPhoneNumber(phoneNumber: string, options?: NumberFormatOptions): Promise<string>;
    /**
     * Formats a phone number according to the Chinese Telephone Code Plan. Before the formatting,
     * a phone number is in the format of country code (if any) + 3-digit service provider code
     * + 4-digit area code + 4-digit subscriber number. After the formatting,
     * each part is separated by a space.
     *
     * @param { string } phoneNumber - Indicates the phone number to format.
     * @param { AsyncCallback<string> } callback - Indicates the callback to obtain a formatted phone number.
     * Returns an empty string if the input phone number is invalid.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    function formatPhoneNumber(phoneNumber: string, callback: AsyncCallback<string>): void;
    /**
     * Formats a phone number into an E.164 representation.
     *
     * @param { string } phoneNumber - Indicates the phone number to format.
     * @param { string } countryCode - Indicates a two-digit country code defined in ISO 3166-1.
     * @param { AsyncCallback<string> } callback - Returns an E.164 number.
     * Returns an empty string if the input phone number is invalid.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    function formatPhoneNumberToE164(phoneNumber: string, countryCode: string, callback: AsyncCallback<string>): void;
    /**
     * Formats a phone number into an E.164 representation.
     *
     * @param { string } phoneNumber - Indicates the phone number to format.
     * @param { string } countryCode - Indicates a two-digit country code defined in ISO 3166-1.
     * @returns { Promise<string> } Returns an E.164 number.
     * Returns an empty string if the input phone number is invalid.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    function formatPhoneNumberToE164(phoneNumber: string, countryCode: string): Promise<string>;
    /**
     * Indicates the states of call.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.CallManager
     * @since 6
     */
    export enum CallState {
        /**
         * Indicates an invalid state, which is used when the call state fails to be obtained.
         *
         * @syscap SystemCapability.Telephony.CallManager
         * @since 6
         */
        CALL_STATE_UNKNOWN = -1,
        /**
         * Indicates that there is no ongoing call.
         *
         * @syscap SystemCapability.Telephony.CallManager
         * @since 6
         */
        CALL_STATE_IDLE = 0,
        /**
         * Indicates that an incoming call is ringing or waiting.
         *
         * @syscap SystemCapability.Telephony.CallManager
         * @since 6
         */
        CALL_STATE_RINGING = 1,
        /**
         * Indicates that a least one call is in the dialing, active, or hold state, and there is no new
         * incoming call ringing or waiting.
         *
         * @syscap SystemCapability.Telephony.CallManager
         * @since 6
         */
        CALL_STATE_OFFHOOK = 2,
        /**
         * Indicates that call is answered
         *
         * @syscap SystemCapability.Telephony.CallManager
         * @since 11
         */
        CALL_STATE_ANSWERED = 3
    }
    /**
     * Indicates the options of placing a call.
     *
     * @interface DialOptions
     * @syscap SystemCapability.Telephony.CallManager
     * @since 6
     */
    export interface DialOptions {
        /**
         * Indicates whether the call to be made is a video call. The value {@code false} indicates
         * a voice call.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Telephony.CallManager
         * @since 6
         */
        extras?: boolean;
    }
    /**
     * Indicates the option for determining if a number is an emergency number for specified slot.
     *
     * @interface EmergencyNumberOptions
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    export interface EmergencyNumberOptions {
        /**
         * Indicates the card slot index number, ranging from 0 to the
         * maximum card slot index number supported by the device.
         *
         * @type { ?number }
         * @syscap SystemCapability.Telephony.CallManager
         * @since 7
         */
        slotId?: number;
    }
    /**
     * Indicates the option for number formatting.
     *
     * @interface NumberFormatOptions
     * @syscap SystemCapability.Telephony.CallManager
     * @since 7
     */
    export interface NumberFormatOptions {
        /**
         * Indicates the country code.
         *
         * @type { ?string }
         * @syscap SystemCapability.Telephony.CallManager
         * @since 7
         */
        countryCode?: string;
    }
}
export default call;
