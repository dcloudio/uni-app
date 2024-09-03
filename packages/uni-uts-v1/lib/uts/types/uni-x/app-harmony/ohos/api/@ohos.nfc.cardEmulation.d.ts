/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
 * @kit ConnectivityKit
 */
import { AsyncCallback } from './@ohos.base';
import { ElementName } from './bundleManager/ElementName';
/**
 * Provides methods to operate or manage NFC card emulation.
 *
 * @namespace cardEmulation
 * @syscap SystemCapability.Communication.NFC.CardEmulation
 * @since 6
 */
/**
 * Provides methods to operate or manage NFC card emulation.
 *
 * @namespace cardEmulation
 * @syscap SystemCapability.Communication.NFC.CardEmulation
 * @atomicservice
 * @since 12
 */
declare namespace cardEmulation {
    /**
     * Defines the capability type.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NFC.CardEmulation
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.nfc.cardEmulation/cardEmulation#hasHceCapability
     */
    enum FeatureType {
        /**
         * This constant is used to check whether HCE card emulation is supported.
         *
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 6
         * @deprecated since 9
         */
        HCE = 0,
        /**
         * This constant is used to check whether SIM card emulation is supported.
         *
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 6
         * @deprecated since 9
         */
        UICC = 1,
        /**
         * This constant is used to check whether eSE card emulation is supported.
         *
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 6
         * @deprecated since 9
         */
        ESE = 2
    }
    /**
     * Define the card emulation type, payment or other.
     *
     * @enum { string }
     * @syscap SystemCapability.Communication.NFC.CardEmulation
     * @since 9
     */
    /**
     * Define the card emulation type, payment or other.
     *
     * @enum { string }
     * @syscap SystemCapability.Communication.NFC.CardEmulation
     * @atomicservice
     * @since 12
     */
    enum CardType {
        /**
         * Payment type of card emulation
         *
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 9
         */
        /**
         * Payment type of card emulation
         *
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @atomicservice
         * @since 12
         */
        PAYMENT = 'payment',
        /**
         * Other type of card emulation
         *
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 9
         */
        /**
         * Other type of card emulation
         *
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @atomicservice
         * @since 12
         */
        OTHER = 'other'
    }
    /**
     * Checks whether a specified type of card emulation is supported.
     * <p>This method is used to check Whether the host or secure element supports card emulation.
     *
     * @param { number } feature Indicates the card emulation type, {@code HCE}, {@code UICC}, or {@code ESE}.
     * @returns { boolean } Returns true if the specified type of card emulation is supported; returns false otherwise.
     * @syscap SystemCapability.Communication.NFC.CardEmulation
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.nfc.cardEmulation/cardEmulation#hasHceCapability
     */
    function isSupported(feature: number): boolean;
    /**
     * Checks whether Host Card Emulation(HCE) capability is supported.
     *
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @returns { boolean } Returns true if HCE is supported, otherwise false.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.CardEmulation
     * @since 9
     */
    /**
     * Checks whether Host Card Emulation(HCE) capability is supported.
     *
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @returns { boolean } Returns true if HCE is supported, otherwise false.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.CardEmulation
     * @atomicservice
     * @since 12
     */
    function hasHceCapability(): boolean;
    /**
     * Checks whether a service is default for given type.
     *
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @param { ElementName } elementName - The element name of the service ability
     * @param { CardType } type - The type to query, payment or other.
     * @returns { boolean } Returns true if the service is default, otherwise false.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.CardEmulation
     * @since 9
     */
    /**
     * Checks whether a service is default for given type.
     *
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @param { ElementName } elementName - The element name of the service ability
     * @param { CardType } type - The type to query, payment or other.
     * @returns { boolean } Returns true if the service is default, otherwise false.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NFC.CardEmulation
     * @atomicservice
     * @since 12
     */
    function isDefaultService(elementName: ElementName, type: CardType): boolean;
    /**
     * A class for NFC host application.
     * <p>The NFC host application use this class, then Nfc service can access the application
     * installation information and connect to services of the application.
     *
     * @syscap SystemCapability.Communication.NFC.CardEmulation
     * @since 8
     */
    /**
     * A class for NFC host application.
     * <p>The NFC host application use this class, then Nfc service can access the application
     * installation information and connect to services of the application.
     *
     * @syscap SystemCapability.Communication.NFC.CardEmulation
     * @atomicservice
     * @since 12
     */
    export class HceService {
        /**
         * start HCE
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { string[] } aidList - The aid list to be registered by this service
         * @returns { boolean } Returns true if HCE is enabled or has been enabled; returns false otherwise.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.nfc.cardEmulation/cardEmulation.HceService#start
         */
        startHCE(aidList: string[]): boolean;
        /**
         * Starts the HCE, register more aids and allows this application to be preferred while in foreground.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { ElementName } elementName - The element name of the service ability
         * @param { string[] } aidList - The aid list to be registered by this service, allowed to be empty.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
       * <br> 1. Mandatory parameters are left unspecified.
       * <br> 2. Incorrect parameters types.
       * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 9
         */
        /**
         * Starts the HCE, register more aids and allows this application to be preferred while in foreground.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { ElementName } elementName - The element name of the service ability
         * @param { string[] } aidList - The aid list to be registered by this service, allowed to be empty.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @atomicservice
         * @since 12
         */
        start(elementName: ElementName, aidList: string[]): void;
        /**
         * stop HCE
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @returns { boolean } Returns true if HCE is disabled or has been disabled; returns false otherwise.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.nfc.cardEmulation/cardEmulation.HceService#stop
         */
        stopHCE(): boolean;
        /**
         * Stops the HCE, and unset the preferred service while in foreground.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { ElementName } elementName - The element name of the service ability
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 9
         */
        /**
         * Stops the HCE, and unset the preferred service while in foreground.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { ElementName } elementName - The element name of the service ability
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @atomicservice
         * @since 12
         */
        stop(elementName: ElementName): void;
        /**
         * register HCE event to receive the APDU data.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { 'hceCmd' } type The type to register.
         * @param { AsyncCallback<number[]> } callback Callback used to listen to HCE data that local device received.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 8
         */
        /**
         * register HCE event to receive the APDU data.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { 'hceCmd' } type The type to register.
         * @param { AsyncCallback<number[]> } callback Callback used to listen to HCE data that local device received.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @atomicservice
         * @since 12
         */
        on(type: 'hceCmd', callback: AsyncCallback<number[]>): void;
        /**
         * Sends a response APDU to the remote device.
         * <p>This method is used by a host application when swiping card.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { number[] } responseApdu Indicates the response, which is a byte array.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.nfc.cardEmulation/cardEmulation.HceService#transmit
         */
        sendResponse(responseApdu: number[]): void;
        /**
         * Sends a response APDU to the remote device.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { number[] } response Indicates the response to send, which is a byte array.
         * @returns { Promise<void> } The void
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 9
         */
        /**
         * Sends a response APDU to the remote device.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { number[] } response Indicates the response to send, which is a byte array.
         * @returns { Promise<void> } The void
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @atomicservice
         * @since 12
         */
        transmit(response: number[]): Promise<void>;
        /**
         * Sends a response APDU to the remote device.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { number[] } response Indicates the response to send, which is a byte array.
         * @param { AsyncCallback<void> } callback The callback
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @since 9
         */
        /**
         * Sends a response APDU to the remote device.
         *
         * @permission ohos.permission.NFC_CARD_EMULATION
         * @param { number[] } response Indicates the response to send, which is a byte array.
         * @param { AsyncCallback<void> } callback The callback
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
         * @syscap SystemCapability.Communication.NFC.CardEmulation
         * @atomicservice
         * @since 12
         */
        transmit(response: number[], callback: AsyncCallback<void>): void;
    }
}
export default cardEmulation;
