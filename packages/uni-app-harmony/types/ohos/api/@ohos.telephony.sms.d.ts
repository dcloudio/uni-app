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
 * Provides the capabilities and methods for obtaining Short Message Service (SMS) management objects.
 *
 * @namespace sms
 * @syscap SystemCapability.Telephony.SmsMms
 * @since 6
 */
declare namespace sms {
    /**
     * Creates an SMS message instance based on the protocol data unit (PDU) and the specified SMS protocol.
     *
     * <p>After receiving the original PDU data, the system creates an SMS message instance according to the specified
     * SMS protocol.
     *
     * @param { Array<number> } pdu - Indicates the original data, which is obtained from the received SMS.
     * @param { string } specification - Indicates the SMS protocol type. The value {@code 3gpp} indicates GSM/UMTS/LTE
     * SMS, and the value {@code 3gpp2} indicates CDMA/LTE SMS.
     * @param { AsyncCallback<ShortMessage> } callback - Indicates the callback for getting an SMS message instance;
     * returns {@code null} if {@code pdu} is empty or {@code specification} is not supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified. 2.
     * Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 6
     */
    function createMessage(pdu: Array<number>, specification: string, callback: AsyncCallback<ShortMessage>): void;
    /**
     * Creates an SMS message instance based on the protocol data unit (PDU) and the specified SMS protocol.
     *
     * <p>After receiving the original PDU data, the system creates an SMS message instance according to the specified
     * SMS protocol.
     *
     * @param { Array<number> } pdu - Indicates the original data, which is obtained from the received SMS.
     * @param { string } specification - Indicates the SMS protocol type. The value {@code 3gpp} indicates GSM/UMTS/LTE
     * SMS, and the value {@code 3gpp2} indicates CDMA/LTE SMS.
     * @returns { Promise<ShortMessage> } Returns an SMS message instance;
     * returns {@code null} if {@code pdu} is empty or {@code specification} is not supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified. 2.
     * Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 6
     */
    function createMessage(pdu: Array<number>, specification: string): Promise<ShortMessage>;
    /**
     * Sends a text or data SMS message.
     *
     * <p>This method checks whether the length of an SMS message exceeds the maximum length. If the
     * maximum length is exceeded, the SMS message is split into multiple parts and sent separately.
     *
     * @permission ohos.permission.SEND_MESSAGES
     * @param { SendMessageOptions } options - Indicates the parameters and callback for sending the SMS message.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified. 2.
     * Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 6
     * @deprecated since 10
     * @useinstead telephony.sms#sendShortMessage
     */
    function sendMessage(options: SendMessageOptions): void;
    /**
     * Sends a text or data SMS message.
     *
     * <p>This method checks whether the length of an SMS message exceeds the maximum length. If the
     * maximum length is exceeded, the SMS message is split into multiple parts and sent separately.
     *
     * @permission ohos.permission.SEND_MESSAGES
     * @param { SendMessageOptions } options - Indicates the parameters and callback for sending the SMS message.
     * @param { AsyncCallback<void> } callback - The callback of sendShortMessage.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified. 2.
     * Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 10
     */
    function sendShortMessage(options: SendMessageOptions, callback: AsyncCallback<void>): void;
    /**
     * Sends a text or data SMS message.
     *
     * <p>This method checks whether the length of an SMS message exceeds the maximum length. If the
     * maximum length is exceeded, the SMS message is split into multiple parts and sent separately.
     *
     * @permission ohos.permission.SEND_MESSAGES
     * @param { SendMessageOptions } options - Indicates the parameters and callback for sending the SMS message.
     * @returns { Promise<void> } The promise returned by the sendShortMessage.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified. 2.
     * Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 10
     */
    function sendShortMessage(options: SendMessageOptions): Promise<void>;
    /**
     * Obtains the default SIM card for sending SMS messages.
     *
     * @param { AsyncCallback<number> } callback - Indicates the callback for getting the default SIM card for sending SMS
     * messages.
     * Returns {@code 0} if the default SIM card for sending SMS messages is in card slot 1;
     * Returns {@code 1} if the default SIM card for sending SMS messages is in card slot 2.
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 7
     */
    function getDefaultSmsSlotId(callback: AsyncCallback<number>): void;
    /**
     * Obtains the default SIM card for sending SMS messages.
     *
     * @returns { Promise<number> } Returns {@code 0} if the default SIM card for sending SMS messages is in card slot 1;
     * Returns {@code 1} if the default SIM card for sending SMS messages is in card slot 2.
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 7
     */
    function getDefaultSmsSlotId(): Promise<number>;
    /**
     * Returns whether a device is capable of sending and receiving SMS messages.
     *
     * @returns { boolean } Returns {@code true} if the device is capable of sending and receiving SMS messages;
     * Returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 7
     */
    function hasSmsCapability(): boolean;
    /**
     * Obtains the default SIM ID for sending SMS messages.
     *
     * @param { AsyncCallback<number> } callback - Returns the SIM ID of the default sms sim and
     * SIM ID will increase from 1.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified. 2.
     * Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - Do not have sim card.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @throws { BusinessError } 8301001 - SIM card is not activated.
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 10
     */
    function getDefaultSmsSimId(callback: AsyncCallback<number>): void;
    /**
     * Obtains the default SIM ID for sending SMS messages.
     *
     * @returns { Promise<number> } Returns the SIM ID of the default sms sim and
     * SIM ID will increase from 1.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - Do not have sim card.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @throws { BusinessError } 8301001 - SIM card is not activated.
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 10
     */
    function getDefaultSmsSimId(): Promise<number>;
    /**
     * Defines an SMS message instance.
     *
     * @interface ShortMessage
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 6
     */
    export interface ShortMessage {
        /**
         * Indicates the SMS message body.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        visibleMessageBody: string;
        /**
         * Indicates the address of the sender, which is to be displayed on the UI.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        visibleRawAddress: string;
        /**
         * Indicates the SMS type.
         *
         * @type { ShortMessageClass }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        messageClass: ShortMessageClass;
        /**
         * Indicates the protocol identifier.
         *
         * @type { number }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        protocolId: number;
        /**
         * Indicates the short message service center (SMSC) address.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        scAddress: string;
        /**
         * Indicates the SMSC timestamp.
         *
         * @type { number }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        scTimestamp: number;
        /**
         * Indicates whether the received SMS is a "replace short message".
         *
         * @type { boolean }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        isReplaceMessage: boolean;
        /**
         * Indicates whether the received SMS contains "TP-Reply-Path".
         *
         * @type { boolean }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        hasReplyPath: boolean;
        /**
         * Indicates Protocol Data Units (PDUs) from an SMS message.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        pdu: Array<number>;
        /**
         * Indicates the SMS message status from the SMS-STATUS-REPORT message sent by the
         * Short Message Service Center (SMSC).
         *
         * @type { number }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        status: number;
        /**
         * Indicates whether the current message is SMS-STATUS-REPORT.
         *
         * @type { boolean }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        isSmsStatusReportMessage: boolean;
    }
    /**
     * Enumerates SMS message types.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 6
     */
    export enum ShortMessageClass {
        /**
         * Indicates an unknown type.
         *
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        UNKNOWN,
        /**
         * Indicates an instant message, which is displayed immediately after being received.
         *
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        INSTANT_MESSAGE,
        /**
         * Indicates an SMS message that can be stored on the device or SIM card based on the storage status.
         *
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        OPTIONAL_MESSAGE,
        /**
         * Indicates an SMS message containing SIM card information, which is to be stored in a SIM card.
         *
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        SIM_MESSAGE,
        /**
         * Indicates an SMS message to be forwarded to another device.
         *
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        FORWARD_MESSAGE
    }
    /**
     * Provides the options (including callbacks) for sending an SMS message.
     *
     * @interface SendMessageOptions
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 6
     */
    export interface SendMessageOptions {
        /**
         * Indicates the ID of the SIM card slot used for sending the SMS message.
         *
         * @type { number }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        slotId: number;
        /**
         * Indicates the address to which the SMS message is sent.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        destinationHost: string;
        /**
         * Indicates the SMSC address. If the value is {@code null}, the default SMSC address of the SIM card.
         *
         * @type { ?string }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        serviceCenter?: string;
        /**
         * If the content is a string, this is a short message. If the content is a byte array, this is a data message.
         *
         * @type { string | Array<number> }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        content: string | Array<number>;
        /**
         * If send data message, destinationPort is mandatory. Otherwise is optional.
         *
         * @type { ?number }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        destinationPort?: number;
        /**
         * Indicates the callback invoked after the SMS message is sent.
         *
         * @type { ?AsyncCallback<ISendShortMessageCallback> }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        sendCallback?: AsyncCallback<ISendShortMessageCallback>;
        /**
         * Indicates the callback invoked after the SMS message is delivered.
         *
         * @type { ?AsyncCallback<IDeliveryShortMessageCallback> }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        deliveryCallback?: AsyncCallback<IDeliveryShortMessageCallback>;
    }
    /**
     * Provides the callback for the SMS message sending result.
     *
     * @interface ISendShortMessageCallback
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 6
     */
    export interface ISendShortMessageCallback {
        /**
         * Indicates the SMS message sending result.
         *
         * @type { SendSmsResult }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        result: SendSmsResult;
        /**
         * Indicates the URI to store the sent SMS message.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        url: string;
        /**
         * Specifies whether this is the last part of a multi-part SMS message.
         *
         * @type { boolean }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        isLastPart: boolean;
    }
    /**
     * Provides the callback for the SMS message delivery report.
     *
     * @interface IDeliveryShortMessageCallback
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 6
     */
    export interface IDeliveryShortMessageCallback {
        /**
         * Indicates the SMS delivery report.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        pdu: Array<number>;
    }
    /**
     * Enumerates SMS message sending results.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.SmsMms
     * @since 6
     */
    export enum SendSmsResult {
        /**
         * Indicates that the SMS message is successfully sent.
         *
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        SEND_SMS_SUCCESS = 0,
        /**
         * Indicates that sending the SMS message fails due to an unknown reason.
         *
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        SEND_SMS_FAILURE_UNKNOWN = 1,
        /**
         * Indicates that sending the SMS fails because the modem is powered off.
         *
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        SEND_SMS_FAILURE_RADIO_OFF = 2,
        /**
         * Indicates that sending the SMS message fails because the network is unavailable
         * or does not support sending or reception of SMS messages.
         *
         * @syscap SystemCapability.Telephony.SmsMms
         * @since 6
         */
        SEND_SMS_FAILURE_SERVICE_UNAVAILABLE = 3
    }
}
export default sms;
