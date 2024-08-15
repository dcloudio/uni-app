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
 * Provides applications with APIs for obtaining SIM card status, card file information, and card specifications.
 * SIM cards include SIM, USIM, and CSIM cards.
 *
 * @namespace sim
 * @syscap SystemCapability.Telephony.CoreService
 * @since 6
 */
declare namespace sim {
    /**
     * Checks whether the SIM card in a specified slot is activated.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking
     * whether the SIM card in a specified slot is activated.
     * Returns {@code true} if the SIM card is activated; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function isSimActive(slotId: number, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the SIM card in a specified slot is activated.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @returns { Promise<boolean> } Returns {@code true} if the SIM card is activated; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function isSimActive(slotId: number): Promise<boolean>;
    /**
     * Checks whether the SIM card in a specified slot is activated.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slots supported by the device.
     * @returns { boolean } Returns {@code true} if the SIM card is activated; returns {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function isSimActiveSync(slotId: number): boolean;
    /**
     * Obtains the default card slot for the voice service.
     *
     * @param { AsyncCallback<number> } callback - Indicates the callback for getting
     * the default card slot for the voice service.
     * Returns {@code 0} if card 1 is used as the default card slot for the voice service;
     * returns {@code 1} if card 2 is used as the default card slot for the voice service;
     * returns {@code -1} if no card is available for the voice service.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getDefaultVoiceSlotId(callback: AsyncCallback<number>): void;
    /**
     * Obtains the default card slot for the voice service.
     *
     * @returns { Promise<number> } Returns {@code 0} if card 1 is used as the default card slot for the voice service;
     * returns {@code 1} if card 2 is used as the default card slot for the voice service;
     * returns {@code -1} if no card is available for the voice service.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getDefaultVoiceSlotId(): Promise<number>;
    /**
     * Checks whether your application (the caller) has been granted the operator permissions.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<boolean> } callback - Indicates the callback of hasOperatorPrivileges.
     * Returns {@code true} if your application has been granted the operator permissions; returns {@code false} otherwise.
     * If no SIM card is inserted or the SIM card is deactivated will be return {@code false}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function hasOperatorPrivileges(slotId: number, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether your application (the caller) has been granted the operator permissions.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @returns { Promise<boolean> } Returns {@code true} if your application has been granted the operator permissions;
     * returns {@code false} otherwise. If no SIM card is inserted or the SIM card is deactivated will be
     * return {@code false}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function hasOperatorPrivileges(slotId: number): Promise<boolean>;
    /**
     * Obtains the ISO country code of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<string> } callback - Indicates the callback for getting the country code defined
     * in ISO 3166-2; returns an empty string if no SIM card is inserted.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getISOCountryCodeForSim(slotId: number, callback: AsyncCallback<string>): void;
    /**
     * Obtains the ISO country code of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<string> } Returns the country code defined in ISO 3166-2;
     * returns an empty string if no SIM card is inserted.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getISOCountryCodeForSim(slotId: number): Promise<string>;
    /**
     * Obtains the ISO country code of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slots supported by the device.
     * @returns { string } Returns the country code defined in ISO 3166-2; returns an empty string if no SIM card
     * is inserted.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getISOCountryCodeForSimSync(slotId: number): string;
    /**
     * Obtains the home PLMN number of the SIM card in a specified slot.
     *
     * <p>The value is recorded in the SIM card and is irrelevant to the network
     * with which the SIM card is currently registered.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<string> } callback - Indicates the callback for getting the PLMN number;
     * returns an empty string if no SIM card is inserted.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getSimOperatorNumeric(slotId: number, callback: AsyncCallback<string>): void;
    /**
     * Obtains the home PLMN number of the SIM card in a specified slot.
     *
     * <p>The value is recorded in the SIM card and is irrelevant to the network
     * with which the SIM card is currently registered.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<string> } Returns the PLMN number; returns an empty string if no SIM card is inserted.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getSimOperatorNumeric(slotId: number): Promise<string>;
    /**
     * Obtains the home PLMN number of the SIM card in a specified slot.
     *
     * <p>The value is recorded in the SIM card and is irrelevant to the network
     * with which the SIM card is currently registered.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slots supported by the device.
     * @returns { string } Returns the PLMN number; returns an empty string if no SIM card is inserted.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getSimOperatorNumericSync(slotId: number): string;
    /**
     * Obtains the service provider name (SPN) of the SIM card in a specified slot.
     *
     * <p>The value is recorded in the EFSPN file of the SIM card and is irrelevant to the network
     * with which the SIM card is currently registered.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<string> } callback - Indicates the callback for getting the SPN;
     * returns an empty string if no SIM card is inserted or no EFSPN file in the SIM card.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getSimSpn(slotId: number, callback: AsyncCallback<string>): void;
    /**
     * Obtains the service provider name (SPN) of the SIM card in a specified slot.
     *
     * <p>The value is recorded in the EFSPN file of the SIM card and is irrelevant to the network
     * with which the SIM card is currently registered.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<string> } Returns the SPN; returns an empty string if no SIM card is inserted or
     * no EFSPN file in the SIM card.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getSimSpn(slotId: number): Promise<string>;
    /**
     * Obtains the service provider name (SPN) of the SIM card in a specified slot.
     *
     * <p>The value is recorded in the EFSPN file of the SIM card and is irrelevant to the network
     * with which the SIM card is currently registered.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slots supported by the device.
     * @returns { string } Returns the SPN; returns an empty string if no EFSPN file is configured for the SIM card.
     * in the SIM card.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getSimSpnSync(slotId: number): string;
    /**
     * Obtains the state of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<SimState> } callback - Indicates the callback for getting one of the following SIM card states:
     * <ul>
     * <li>{@code SimState#SIM_STATE_UNKNOWN}
     * <li>{@code SimState#SIM_STATE_NOT_PRESENT}
     * <li>{@code SimState#SIM_STATE_LOCKED}
     * <li>{@code SimState#SIM_STATE_NOT_READY}
     * <li>{@code SimState#SIM_STATE_READY}
     * <li>{@code SimState#SIM_STATE_LOADED}
     * </ul>
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getSimState(slotId: number, callback: AsyncCallback<SimState>): void;
    /**
     * Obtains the state of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @returns { Promise<SimState> } Returns one of the following SIM card states:
     * <ul>
     * <li>{@code SimState#SIM_STATE_UNKNOWN}
     * <li>{@code SimState#SIM_STATE_NOT_PRESENT}
     * <li>{@code SimState#SIM_STATE_LOCKED}
     * <li>{@code SimState#SIM_STATE_NOT_READY}
     * <li>{@code SimState#SIM_STATE_READY}
     * <li>{@code SimState#SIM_STATE_LOADED}
     * </ul>
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    function getSimState(slotId: number): Promise<SimState>;
    /**
     * Obtains the state of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slots supported by the device.
     * @returns { SimState } Returns one of the following SIM card states:
     * <ul>
     * <li>{@code SimState#SIM_STATE_UNKNOWN}
     * <li>{@code SimState#SIM_STATE_NOT_PRESENT}
     * <li>{@code SimState#SIM_STATE_LOCKED}
     * <li>{@code SimState#SIM_STATE_NOT_READY}
     * <li>{@code SimState#SIM_STATE_READY}
     * <li>{@code SimState#SIM_STATE_LOADED}
     * </ul>
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getSimStateSync(slotId: number): SimState;
    /**
     * Obtains the type of the SIM card installed in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<CardType> } callback - Indicates the callback for getting the SIM card type.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getCardType(slotId: number, callback: AsyncCallback<CardType>): void;
    /**
     * Obtains the type of the SIM card installed in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @returns { Promise<CardType> } Returns the SIM card type.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getCardType(slotId: number): Promise<CardType>;
    /**
     * Obtains the type of the SIM card inserted in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slots supported by the device.
     * @returns { CardType } Returns the SIM card type.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getCardTypeSync(slotId: number): CardType;
    /**
     * Obtains the maximum number of SIM cards that can be used simultaneously on the device,
     * that is, the maximum number of SIM card slots.
     *
     * @returns { number } Returns the maximum number of SIM card slots.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function getMaxSimCount(): number;
    /**
     * Checks whether a SIM card is inserted in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<boolean> } callback - Indicates the callback for hasSimCard.
     * Returns {@code true} if a SIM card is inserted; return {@code false} otherwise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function hasSimCard(slotId: number, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether a SIM card is inserted in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<boolean> } Returns {@code true} if a SIM card is inserted; return {@code false} otherwise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    function hasSimCard(slotId: number): Promise<boolean>;
    /**
     * Checks whether a SIM card is inserted in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slots supported by the device.
     * @returns { boolean } Returns {@code true} if a SIM card is inserted; return {@code false} otherwise.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function hasSimCardSync(slotId: number): boolean;
    /**
     * Get account information of SIM card.
     *
     * @permission ohos.permission.GET_TELEPHONY_STATE
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<IccAccountInfo> } callback - Indicates the callback for
     * getting a {@code IccAccountInfo} object. The ICCID and phone number will be null
     * if has no ohos.permission.GET_TELEPHONY_STATE.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @throws { BusinessError } 8301002 - The SIM card failed to read or update data.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getSimAccountInfo(slotId: number, callback: AsyncCallback<IccAccountInfo>): void;
    /**
     * Get account information of SIM card.
     *
     * @permission ohos.permission.GET_TELEPHONY_STATE
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<IccAccountInfo> } Returns a {@code IccAccountInfo} object. The ICCID and phone number
     * will be null if has no ohos.permission.GET_TELEPHONY_STATE.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @throws { BusinessError } 8301002 - The SIM card failed to read or update data.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getSimAccountInfo(slotId: number): Promise<IccAccountInfo>;
    /**
     * Get the list of active SIM card account information.
     *
     * @permission ohos.permission.GET_TELEPHONY_STATE
     * @param { AsyncCallback<Array<IccAccountInfo>> } callback - The callback is used to
     * return the array of {@link IccAccountInfo}. The ICCID and phone number will be null
     * if has no ohos.permission.GET_TELEPHONY_STATE.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getActiveSimAccountInfoList(callback: AsyncCallback<Array<IccAccountInfo>>): void;
    /**
     * Get the list of active SIM card account information.
     *
     * @permission ohos.permission.GET_TELEPHONY_STATE
     * @returns { Promise<Array<IccAccountInfo>> } Returns the array of {@link IccAccountInfo}. The ICCID
     * and phone number will be null if has no ohos.permission.GET_TELEPHONY_STATE.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getActiveSimAccountInfoList(): Promise<Array<IccAccountInfo>>;
    /**
     * Obtains the operator key of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<string> } callback - Indicates the callback for getting the operator key;
     * Returns an empty string if no SIM card is inserted or no operator key matched.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 9
     */
    function getOpKey(slotId: number, callback: AsyncCallback<string>): void;
    /**
     * Obtains the operator key of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<string> } Returns the operator key;
     * Returns an empty string if no SIM card is inserted or no operator key matched.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 9
     */
    function getOpKey(slotId: number): Promise<string>;
    /**
     * Obtains the operator key of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slots supported by the device.
     * @returns { string } Returns the operator key; returns an empty string if no SIM card is inserted or
     * no operator key is matched.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getOpKeySync(slotId: number): string;
    /**
     * Obtains the operator name of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @param { AsyncCallback<string> } callback - Indicates the callback for getting the operator name;
     * Returns an empty string if no SIM card is inserted or no operator name matched.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 9
     */
    function getOpName(slotId: number, callback: AsyncCallback<string>): void;
    /**
     * Obtains the operator name of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slot index number supported by the device.
     * @returns { Promise<string> } Returns the operator name; returns an empty string if no SIM card is inserted or
     * no operator name matched.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 9
     */
    function getOpName(slotId: number): Promise<string>;
    /**
     * Obtains the operator name of the SIM card in a specified slot.
     *
     * @param { number } slotId - Indicates the card slot index number,
     * ranging from 0 to the maximum card slots supported by the device.
     * @returns { string } Returns the operator name; returns an empty string if no SIM card is inserted or
     * no operator name is matched.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getOpNameSync(slotId: number): string;
    /**
     * Obtains the default SIM ID for the voice service.
     *
     * @param { AsyncCallback<number> } callback - Returns the SIM ID of the default voice sim
     * and SIM ID will increase from 1.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @throws { BusinessError } 8301001 - SIM card is not activated.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getDefaultVoiceSimId(callback: AsyncCallback<number>): void;
    /**
     * Obtains the default SIM ID for the voice service.
     *
     * @returns { Promise<number> } Returns the SIM ID of the default voice sim
     * and SIM ID will increase from 1.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300004 - No SIM card found.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @throws { BusinessError } 8301001 - SIM card is not activated.
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    function getDefaultVoiceSimId(): Promise<number>;
    /**
     * Defines the ICC account information.
     *
     * @interface IccAccountInfo
     * @syscap SystemCapability.Telephony.CoreService
     * @since 10
     */
    export interface IccAccountInfo {
        /**
         * Indicates the sim Id for card.
         *
         * @type { number }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 10
         */
        simId: number;
        /**
         * Indicates the card slot index number,
         * ranging from 0 to the maximum card slot index number supported by the device.
         *
         * @type { number }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 10
         */
        slotIndex: number;
        /**
         * Indicates the mark card is eSim or not.
         *
         * @type { boolean }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 10
         */
        isEsim: boolean;
        /**
         * Indicates the active status for card.
         *
         * @type { boolean }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 10
         */
        isActive: boolean;
        /**
         * Indicates the iccId for card.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 10
         */
        iccId: string;
        /**
         * Indicates the display name for card.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 10
         */
        showName: string;
        /**
         * Indicates the display number for card.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.CoreService
         * @since 10
         */
        showNumber: string;
    }
    /**
     * Indicates the SIM card types.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.CoreService
     * @since 7
     */
    export enum CardType {
        /**
         * Icc card type: unknown type Card.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 7
         */
        UNKNOWN_CARD = -1,
        /**
         * Icc card type: Single sim card type.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 7
         */
        SINGLE_MODE_SIM_CARD = 10,
        /**
         * Icc card type: Single usim card type.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 7
         */
        SINGLE_MODE_USIM_CARD = 20,
        /**
         * Icc card type: Single ruim card type.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 7
         */
        SINGLE_MODE_RUIM_CARD = 30,
        /**
         * Icc card type: Double card C+G.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 7
         */
        DUAL_MODE_CG_CARD = 40,
        /**
         * Icc card type: China Telecom Internal Roaming Card (Dual Mode).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 7
         */
        CT_NATIONAL_ROAMING_CARD = 41,
        /**
         * Icc card type: China Unicom Dual Mode Card.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 7
         */
        CU_DUAL_MODE_CARD = 42,
        /**
         * Icc card type: China Telecom LTE Card (Dual Mode).
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 7
         */
        DUAL_MODE_TELECOM_LTE_CARD = 43,
        /**
         * Icc card type: Double card U+G.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 7
         */
        DUAL_MODE_UG_CARD = 50,
        /**
         * Icc card type: Single isim card type.
         * @syscap SystemCapability.Telephony.CoreService
         * @since 8
         */
        SINGLE_MODE_ISIM_CARD = 60
    }
    /**
     * Indicates the SIM card states.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.CoreService
     * @since 6
     */
    export enum SimState {
        /**
         * Indicates unknown SIM card state, that is, the accurate status cannot be
         * obtained.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        SIM_STATE_UNKNOWN,
        /**
         * Indicates that the SIM card is in the <b>not present</b> state, that is,
         * no SIM card is inserted into the card slot.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        SIM_STATE_NOT_PRESENT,
        /**
         * Indicates that the SIM card is in the <b>locked</b> state, that is, the
         * SIM card is locked by the personal identification number (PIN)/PIN
         * unblocking key (PUK) or network.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        SIM_STATE_LOCKED,
        /**
         * Indicates that the SIM card is in the <b>not ready</b> state, that is,
         * the SIM card is in position but cannot work properly.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        SIM_STATE_NOT_READY,
        /**
         * Indicates that the SIM card is in the <b>ready</b> state, that is, the
         * SIM card is in position and is working properly.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        SIM_STATE_READY,
        /**
         * Indicates that the SIM card is in the <b>loaded</b> state, that is, the
         * SIM card is in position and is working properly.
         *
         * @syscap SystemCapability.Telephony.CoreService
         * @since 6
         */
        SIM_STATE_LOADED
    }
}
export default sim;
