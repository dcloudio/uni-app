/*
 * Copyright (C) 2021-2024 Huawei Device Co., Ltd.
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
 * Provides interfaces for applications to obtain the network state, cell information, signal information,
 * and device ID of the wireless cellular network (WCN), and provides a callback registration mechanism to
 * listen for changes of the network, cell, and signal status of the WCN.
 *
 * @namespace radio
 * @syscap SystemCapability.Telephony.CoreService
 * @since 6
 */
declare namespace radio {
    /**
     * Obtains radio access technology (RAT) of the registered network. The system
     * returns RAT of the packet service (PS) and circuit service (CS) domain.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<{psRadioTech: RadioTechnology, csRadioTech: RadioTechnology}> } callback - Returns
     * an integer indicating the RAT in use. The values are as follows:
     * <ul>
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_UNKNOWN}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_GSM}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_1XRTT}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_WCDMA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_HSPA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_HSPAP}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_TD_SCDMA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_EVDO}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_EHRPD}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_LTE}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_LTE_CA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_IWLAN}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_NR}
     * </ul>
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    /**
     * Obtains radio access technology (RAT) of the registered network. The system
     * returns RAT of the packet service (PS) and circuit service (CS) domain.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<NetworkRadioTech> } callback - Returns
     * the RAT of PS domain and CS domain of registered network.
     * The values of RAT are as follows:
     * <ul>
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_UNKNOWN}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_GSM}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_1XRTT}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_WCDMA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_HSPA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_HSPAP}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_TD_SCDMA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_EVDO}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_EHRPD}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_LTE}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_LTE_CA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_IWLAN}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_NR}
     * </ul>
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 11
     */
    function getRadioTech(slotId: number, callback: AsyncCallback<NetworkRadioTech>): void;
    /**
     * Obtains radio access technology (RAT) of the registered network. The system
     * returns RAT of the packet service (PS) and circuit service (CS) domain.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<{psRadioTech: RadioTechnology, csRadioTech: RadioTechnology}> } Returns
     * the enumeration of RadioTechnology. The values are as follows:
     * <ul>
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_UNKNOWN}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_GSM}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_1XRTT}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_WCDMA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_HSPA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_HSPAP}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_TD_SCDMA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_EVDO}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_EHRPD}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_LTE}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_LTE_CA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_IWLAN}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_NR}
     * </ul>
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    /**
     * Obtains radio access technology (RAT) of the registered network. The system
     * returns RAT of the packet service (PS) and circuit service (CS) domain.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<NetworkRadioTech> } Returns the RAT of PS domain and CS domain of registered network.
     * The values of RAT are as follows:
     * <ul>
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_UNKNOWN}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_GSM}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_1XRTT}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_WCDMA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_HSPA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_HSPAP}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_TD_SCDMA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_EVDO}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_EHRPD}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_LTE}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_LTE_CA}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_IWLAN}
     * <li>{@code RadioTechnology#RADIO_TECHNOLOGY_NR}
     * </ul>
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 11
     */
    function getRadioTech(slotId: number): Promise<NetworkRadioTech>;
    /**
     * Obtains the network state of the registered network.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<NetworkState> } callback - Indicates the callback for getting network registration state.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getNetworkState(slotId: number, callback: AsyncCallback<NetworkState>): void;
    /**
     * Obtains the network state of the registered network.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<NetworkState> } Returns the NetworkState object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getNetworkState(slotId?: number): Promise<NetworkState>;
    /**
     * Obtains the network state of the registered network.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { AsyncCallback<NetworkState> } callback - Indicates the callback for getting network registration state.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getNetworkState(callback: AsyncCallback<NetworkState>): void;
    /**
     * Obtains the network search mode of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number, ranging from 0 to the maximum card slot
     * index number supported by the device.
     * @param { AsyncCallback<NetworkSelectionMode> } callback - Indicates the callback for getting
     * the network search mode of the SIM card. Available values are as follows:
     * <ul>
     * <li>{@link NetworkSelectionMode#NETWORK_SELECTION_UNKNOWN}
     * <li>{@link NetworkSelectionMode#NETWORK_SELECTION_AUTOMATIC}
     * <li>{@link NetworkSelectionMode#NETWORK_SELECTION_MANUAL}
     * <ul>
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getNetworkSelectionMode(slotId: number, callback: AsyncCallback<NetworkSelectionMode>): void;
    /**
     * Obtains the network search mode of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number, ranging from 0 to the maximum card slot
     * index number supported by the device.
     * @returns { Promise<NetworkSelectionMode> } Returns the network search mode of the SIM card.
     * Available values are as follows:
     * <ul>
     * <li>{@link NetworkSelectionMode#NETWORK_SELECTION_UNKNOWN}
     * <li>{@link NetworkSelectionMode#NETWORK_SELECTION_AUTOMATIC}
     * <li>{@link NetworkSelectionMode#NETWORK_SELECTION_MANUAL}
     * <ul>
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getNetworkSelectionMode(slotId: number): Promise<NetworkSelectionMode>;
    /**
     * Obtains the ISO-defined country code of the country where the registered network is deployed.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<string> } callback - Indicates the callback for getting the country code
     * defined in ISO 3166-2; returns an empty string if the device is not registered with any network.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getISOCountryCodeForNetwork(slotId: number, callback: AsyncCallback<string>): void;
    /**
     * Obtains the ISO-defined country code of the country where the registered network is deployed.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<string> } Returns the country code defined in ISO 3166-2.
     * Returns an empty string if the device is not registered with any network.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getISOCountryCodeForNetwork(slotId: number): Promise<string>;
    /**
     * Obtains the ISO-defined country code of the country where the registered network is deployed.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slots supported by the device.
     * @returns { string } Returns the country code defined in ISO 3166-2.
     * Returns an empty string if the device is not registered with any network.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getISOCountryCodeForNetworkSync(slotId: number): string;
    /**
     * Obtains the index number of the card slot where the primary card is located if multiple SIM cards are inserted.
     *
     * The primary card is the SIM card inserted in the card slot that uses data services by default.
     *
     * @param { AsyncCallback<number> } callback - Indicates the callback for getting the index number of
     * the primary card slot.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getPrimarySlotId(callback: AsyncCallback<number>): void;
    /**
     * Obtains the index number of the card slot where the primary card is located if multiple SIM cards are inserted.
     *
     * The primary card is the SIM card inserted in the card slot that uses data services by default.
     *
     * @returns { Promise<number> } Returns the index number of the primary card slot.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getPrimarySlotId(): Promise<number>;
    /**
     * Obtains the list of signal strength information of the registered network corresponding to a specified SIM card.
     *
     * @param { number } slotId - Indicates the card slot index number, ranging from 0 to the maximum card slot
     * index number supported by the device.
     * @param { AsyncCallback<Array<SignalInformation>> } callback - Indicates the callback for getting
     * the instance list of the child classes derived from {@link SignalInformation}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getSignalInformation(slotId: number, callback: AsyncCallback<Array<SignalInformation>>): void;
    /**
     * Obtains the list of signal strength information of the registered network corresponding to a specified SIM card.
     *
     * @param { number } slotId - Indicates the card slot index number, ranging from 0 to the maximum card slot
     * index number supported by the device.
     * @returns { Promise<Array<SignalInformation>> } Returns the callback for getting the instance list of
     * the child classes derived from {@link SignalInformation}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getSignalInformation(slotId: number): Promise<Array<SignalInformation>>;
    /**
     * Obtains the list of signal strength information of the registered network corresponding to a specified SIM card.
     *
     * @param { number } slotId - Indicates the card slot index number, ranging from 0 to the maximum
     * card slots supported by the device.
     * @returns { Array<SignalInformation> } Returns the callback for getting the instance list of
     * the child classes derived from {@link SignalInformation}.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getSignalInformationSync(slotId: number): Array<SignalInformation>;
    /**
     * Checks whether the device supports 5G New Radio (NR).
     *
     * @returns { boolean } Returns {@code true} if the device supports 5G NR; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     * @deprecated since 9
     * @useinstead telephony.radio#isNRSupported
     */
    function isNrSupported(): boolean;
    /**
     * Checks whether the device supports 5G New Radio (NR) by according card slot.
     *
     * @param { number } slotId - Indicates the card slot index number, ranging from 0 to the maximum card slot
     * index number supported by the device.
     * @returns { boolean } Returns {@code true} if the device supports 5G NR; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 8
     * @deprecated since 9
     * @useinstead telephony.radio#isNRSupported
     */
    function isNrSupported(slotId: number): boolean;
    /**
     * Checks whether the device supports 5G New Radio (NR).
     *
     * @returns { boolean } Returns {@code true} if the device supports 5G NR; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 9
     */
    function isNRSupported(): boolean;
    /**
     * Checks whether the device supports 5G New Radio (NR) by according card slot.
     *
     * @param { number } slotId - Indicates the card slot index number, ranging from 0 to the maximum card slot
     * index number supported by the device.
     * @returns { boolean } Returns {@code true} if the device supports 5G NR; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 9
     */
    function isNRSupported(slotId: number): boolean;
    /**
     * Checks whether the radio service is enabled.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<boolean> } callback - Returns {@code true} If the radio service is enabled.
     * Returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function isRadioOn(slotId: number, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the radio service is enabled.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<boolean> } Returns {@code true} If the radio service is enabled; returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function isRadioOn(slotId?: number): Promise<boolean>;
    /**
     * Checks whether the radio service is enabled.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { AsyncCallback<boolean> } callback - Returns {@code true} If the radio service is enabled.
     * Returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function isRadioOn(callback: AsyncCallback<boolean>): void;
    /**
     * Get the operator name of the specified SIM card slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<string> } callback - Indicates the callback for getting the operator name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getOperatorName(slotId: number, callback: AsyncCallback<string>): void;
    /**
     * Get the operator name of the specified SIM card slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<string> } Returns the operator name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getOperatorName(slotId: number): Promise<string>;
    /**
     * Get the operator name of the specified SIM card slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { string } Returns the operator name.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getOperatorNameSync(slotId: number): string;
    /**
     * Describes the radio access technology (RAT) of registered network.
     *
     * @interface NetworkRadioTech
     * @syscap SystemCapability.Telephony.CoreService
     * @since 11
     */
    export interface NetworkRadioTech {
        /**
         * Indicates radio access technology (RAT) of packet service (PS) domain.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 11
         */
        psRadioTech: RadioTechnology;
        /**
         * Indicates radio access technology (RAT) of circuit service (CS) domain.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 11
         */
        csRadioTech: RadioTechnology;
    }
    /**
     * Describes the radio access technology.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    export enum RadioTechnology {
        /**
         * Indicates unknown radio access technology (RAT).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_UNKNOWN = 0,
        /**
         * Indicates that RAT is global system for mobile communications (GSM), including GSM, general packet
         * radio system (GPRS), and enhanced data rates for GSM evolution (EDGE).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_GSM = 1,
        /**
         * Indicates that RAT is code division multiple access (CDMA), including Interim Standard 95 (IS95) and
         * Single-Carrier Radio Transmission Technology (1xRTT).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_1XRTT = 2,
        /**
         * Indicates that RAT is wideband code division multiple address (WCDMA).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_WCDMA = 3,
        /**
         * Indicates that RAT is high-speed packet access (HSPA), including HSPA, high-speed downlink packet
         * access (HSDPA), and high-speed uplink packet access (HSUPA).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_HSPA = 4,
        /**
         * Indicates that RAT is evolved high-speed packet access (HSPA+), including HSPA+ and dual-carrier
         * HSPA+ (DC-HSPA+).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_HSPAP = 5,
        /**
         * Indicates that RAT is time division-synchronous code division multiple access (TD-SCDMA).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_TD_SCDMA = 6,
        /**
         * Indicates that RAT is evolution data only (EVDO), including EVDO Rev.0, EVDO Rev.A, and EVDO Rev.B.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_EVDO = 7,
        /**
         * Indicates that RAT is evolved high rate packet data (EHRPD).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_EHRPD = 8,
        /**
         * Indicates that RAT is long term evolution (LTE).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_LTE = 9,
        /**
         * Indicates that RAT is LTE carrier aggregation (LTE-CA).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_LTE_CA = 10,
        /**
         * Indicates that RAT is interworking WLAN (I-WLAN).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_IWLAN = 11,
        /**
         * Indicates that RAT is 5G new radio (NR).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        RADIO_TECHNOLOGY_NR = 12
    }
    /**
     * Returns child class objects specific to the network type.
     *
     * @interface SignalInformation
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    export interface SignalInformation {
        /**
         * Obtains the network type corresponding to the signal.
         *
         * @type { NetworkType }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        signalType: NetworkType;
        /**
         * Obtains the signal level of the current network.
         *
         * @type { number }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        signalLevel: number;
        /**
         * rsrp for LTE and NR; dbm for CDMA and EVDO; rscp for WCDMA; rssi for GSM.
         *
         * @type { number }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 9
         */
        dBm: number;
    }
    /**
     * Describes the network type.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    export enum NetworkType {
        /**
         * Indicates unknown network type.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NETWORK_TYPE_UNKNOWN,
        /**
         * Indicates that the network type is GSM.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NETWORK_TYPE_GSM,
        /**
         * Indicates that the network type is CDMA.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NETWORK_TYPE_CDMA,
        /**
         * Indicates that the network type is WCDMA.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NETWORK_TYPE_WCDMA,
        /**
         * Indicates that the network type is TD-SCDMA.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NETWORK_TYPE_TDSCDMA,
        /**
         * Indicates that the network type is LTE.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NETWORK_TYPE_LTE,
        /**
         * Indicates that the network type is 5G NR.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NETWORK_TYPE_NR
    }
    /**
     * Describes the network registration state.
     *
     * @interface NetworkState
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    export interface NetworkState {
        /**
         * Obtains the operator name in the long alphanumeric format of the registered network.
         *
         * Returns the operator name in the long alphanumeric format as a string;
         * returns an empty string if no operator name is obtained.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        longOperatorName: string;
        /**
         * Obtains the operator name in the short alphanumeric format of the registered network.
         *
         * Returns the operator name in the short alphanumeric format as a string;
         * returns an empty string if no operator name is obtained.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        shortOperatorName: string;
        /**
         * Obtains the PLMN code of the registered network.
         *
         * Returns the PLMN code as a string; returns an empty string if no operator name is obtained.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        plmnNumeric: string;
        /**
         * Checks whether the device is roaming.
         *
         * @type { boolean }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        isRoaming: boolean;
        /**
         * Obtains the network registration status of the device.
         *
         * @type { RegState }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        regState: RegState;
        /**
         * Obtains the radio Access technology after config conversion.
         *
         * @type { RadioTechnology }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 8
         */
        cfgTech: RadioTechnology;
        /**
         * Obtains the NSA network registration status of the device.
         *
         * Returns the NSA network registration status {@code NsaState}.
         *
         * @type { NsaState }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        nsaState: NsaState;
        /**
         * Obtains the status of CA.
         *
         * Returns {@code true} if CA is actived; returns {@code false} otherwise.
         *
         * @type { boolean }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        isCaActive: boolean;
        /**
         * Checks whether this device is allowed to make emergency calls only.
         *
         * Returns {@code true} if this device is allowed to make emergency calls only;
         * returns {@code false} otherwise.
         *
         * @type { boolean }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        isEmergency: boolean;
    }
    /**
     * Describes the network registration state.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    export enum RegState {
        /**
         * Indicates a state in which a device cannot use any service.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        REG_STATE_NO_SERVICE = 0,
        /**
         * Indicates a state in which a device can use services properly.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        REG_STATE_IN_SERVICE = 1,
        /**
         * Indicates a state in which a device can use only the emergency call service.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        REG_STATE_EMERGENCY_CALL_ONLY = 2,
        /**
         * Indicates that the cellular radio is powered off.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        REG_STATE_POWER_OFF = 3
    }
    /**
     * Describes the nsa state.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    export enum NsaState {
        /**
         * Indicates that a device is idle under or is connected to an LTE cell that does not support NSA.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NSA_STATE_NOT_SUPPORT = 1,
        /**
         * Indicates that a device is idle under an LTE cell supporting NSA but not NR coverage detection.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NSA_STATE_NO_DETECT = 2,
        /**
         * Indicates that a device is connected to an LTE network under an LTE cell
         * that supports NSA and NR coverage detection.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NSA_STATE_CONNECTED_DETECT = 3,
        /**
         * Indicates that a device is idle under an LTE cell supporting NSA and NR coverage detection.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NSA_STATE_IDLE_DETECT = 4,
        /**
         * Indicates that a device is connected to an LTE + NR network under an LTE cell that supports NSA.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NSA_STATE_DUAL_CONNECTED = 5,
        /**
         * Indicates that a device is idle under or is connected to an NG-RAN cell while being attached to 5GC.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NSA_STATE_SA_ATTACHED = 6
    }
    /**
     * Obtains current cell information.
     *
     * @interface CellInformation
     * @syscap SystemCapability.Telephony.CoreService
     * @since 8
     */
    export interface CellInformation {
        /**
         * Obtains the network type of the serving cell.
         *
         * An application can call this method to determine the network type that the child class uses.
         *
         * @type { NetworkType }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 8
         */
        networkType: NetworkType;
        /**
         * An abstract method of the parent class whose implementation depends on the child classes.
         * Returned child class objects vary according to the network type.
         * Returns child class objects specific to the network type.
         *
         * @type { SignalInformation }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 8
         */
        signalInformation: SignalInformation;
    }
    /**
     * Obtains the network selection mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    export enum NetworkSelectionMode {
        /**
         * Indicates that the network is unavailable for registration.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NETWORK_SELECTION_UNKNOWN,
        /**
         * Indicates that the network is unavailable for registration.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NETWORK_SELECTION_AUTOMATIC,
        /**
         * Manual network selection modes.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        NETWORK_SELECTION_MANUAL
    }
}
export default radio;
