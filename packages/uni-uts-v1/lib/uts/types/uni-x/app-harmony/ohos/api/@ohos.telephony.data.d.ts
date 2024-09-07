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
 * Provides methods related to cellular data services.
 *
 * @namespace data
 * @syscap SystemCapability.Telephony.CellularData
 * @since 7
 */
declare namespace data {
    /**
     * Get the default cellular data card.
     *
     * @param { AsyncCallback<number> } callback - Indicates the default cellular data slot id.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    function getDefaultCellularDataSlotId(callback: AsyncCallback<number>): void;
    /**
     * Get the default cellular data card.
     *
     * @returns { Promise<number> } Returns the default cellular data slot id.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    function getDefaultCellularDataSlotId(): Promise<number>;
    /**
     * Get the default cellular data card.
     *
     * @returns { number } Returns default cellular data slot id.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 9
     */
    function getDefaultCellularDataSlotIdSync(): number;
    /**
     * Indicates that there is no uplink or downlink data.
     *
     * <p>It is a return value of service state query of cellular data services.
     * @param { AsyncCallback<DataFlowType> } callback - Indicates the data flow type.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    function getCellularDataFlowType(callback: AsyncCallback<DataFlowType>): void;
    /**
     * Indicates that there is no uplink or downlink data.
     *
     * <p>It is a return value of service state query of cellular data services.
     * @returns { Promise<DataFlowType> } Returns the data flow type.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    function getCellularDataFlowType(): Promise<DataFlowType>;
    /**
     * Obtain the connection state of the PS domain.
     *
     * @param { AsyncCallback<DataConnectState> } callback - Indicates the callback for getting the connection state,
     * which can be any of the following:
     * <ul>
     * <li>{@code DataConnectState#DATA_STATE_UNKNOWN}
     * <li>{@code DataConnectState#DATA_STATE_DISCONNECTED}
     * <li>{@code DataConnectState#DATA_STATE_CONNECTING}
     * <li>{@code DataConnectState#DATA_STATE_CONNECTED}
     * <li>{@code DataConnectState#DATA_STATE_SUSPENDED}
     * </ul>
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    function getCellularDataState(callback: AsyncCallback<DataConnectState>): void;
    /**
     * Obtain the connection state of the PS domain.
     *
     * @returns { Promise<DataConnectState> } Returns the connection state, which can be any of the following:
     * <ul>
     * <li>{@code DataConnectState#DATA_STATE_UNKNOWN}
     * <li>{@code DataConnectState#DATA_STATE_DISCONNECTED}
     * <li>{@code DataConnectState#DATA_STATE_CONNECTING}
     * <li>{@code DataConnectState#DATA_STATE_CONNECTED}
     * <li>{@code DataConnectState#DATA_STATE_SUSPENDED}
     * </ul>
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    function getCellularDataState(): Promise<DataConnectState>;
    /**
     * Check whether cellular data services are enabled.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether cellular data services
     * are enabled. Returns {@code true} if cellular data services are enabled; returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    function isCellularDataEnabled(callback: AsyncCallback<boolean>): void;
    /**
     * Check whether cellular data services are enabled.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { Promise<boolean> } Returns {@code true} if cellular data services are enabled.
     * Returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    function isCellularDataEnabled(): Promise<boolean>;
    /**
     * Check whether cellular data services are enabled.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { boolean } Returns {@code true} if cellular data services are enabled.
     * Returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 12
     */
    function isCellularDataEnabledSync(): boolean;
    /**
     * Check whether roaming is enabled for cellular data services.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the ID of a card slot.
     * The value {@code 0} indicates card 1, and the value {@code 1} indicates card 2.
     * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether roaming is enabled
     * for cellular data services. Returns {@code true} if roaming is enabled for cellular data services;
     * returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    function isCellularDataRoamingEnabled(slotId: number, callback: AsyncCallback<boolean>): void;
    /**
     * Check whether roaming is enabled for cellular data services.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the ID of a card slot.
     * The value {@code 0} indicates card 1, and the value {@code 1} indicates card 2.
     * @returns { Promise<boolean> } Returns {@code true} if roaming is enabled for cellular data services.
     * Returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    function isCellularDataRoamingEnabled(slotId: number): Promise<boolean>;
    /**
     * Check whether roaming is enabled for cellular data services.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { number } slotId - Indicates the ID of a card slot.
     * The value {@code 0} indicates card 1, and the value {@code 1} indicates card 2.
     * @returns { boolean } Returns {@code true} if roaming is enabled for cellular data services.
     * Returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified;
     * 2. Incorrect parameters types;
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error code.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 12
     */
    function isCellularDataRoamingEnabledSync(slotId: number): boolean;
    /**
     * Obtains the default cellular data SIM ID.
     *
     * @returns { number } Returns the SIM ID of the default cellular data sim and SIM ID will increase from 1.
     * @syscap SystemCapability.Telephony.CellularData
     * @since 10
     */
    function getDefaultCellularDataSimId(): number;
    /**
     * Describes the cellular data flow type.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    export enum DataFlowType {
        /**
         * Indicates that there is no uplink or downlink data.
         *
         * @syscap SystemCapability.Telephony.CellularData
         * @since 7
         */
        DATA_FLOW_TYPE_NONE = 0,
        /**
         * Indicates that there is only downlink data.
         *
         * @syscap SystemCapability.Telephony.CellularData
         * @since 7
         */
        DATA_FLOW_TYPE_DOWN = 1,
        /**
         * Indicates that there is only uplink data.
         *
         * @syscap SystemCapability.Telephony.CellularData
         * @since 7
         */
        DATA_FLOW_TYPE_UP = 2,
        /**
         * Indicates that there is uplink and downlink data.
         *
         * @syscap SystemCapability.Telephony.CellularData
         * @since 7
         */
        DATA_FLOW_TYPE_UP_DOWN = 3,
        /**
         * Indicates that there is no uplink or downlink data, and the bottom-layer link is in the dormant state.
         *
         * @syscap SystemCapability.Telephony.CellularData
         * @since 7
         */
        DATA_FLOW_TYPE_DORMANT = 4
    }
    /**
     * Describes the cellular data link connection state.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.CellularData
     * @since 7
     */
    export enum DataConnectState {
        /**
         * Indicates that a cellular data link is unknown.
         *
         * @syscap SystemCapability.Telephony.CellularData
         * @since 7
         */
        DATA_STATE_UNKNOWN = -1,
        /**
         * Indicates that a cellular data link is disconnected.
         *
         * @syscap SystemCapability.Telephony.CellularData
         * @since 7
         */
        DATA_STATE_DISCONNECTED = 0,
        /**
         * Indicates that a cellular data link is being connected.
         *
         * @syscap SystemCapability.Telephony.CellularData
         * @since 7
         */
        DATA_STATE_CONNECTING = 1,
        /**
         * Indicates that a cellular data link is connected.
         *
         * @syscap SystemCapability.Telephony.CellularData
         * @since 7
         */
        DATA_STATE_CONNECTED = 2,
        /**
         * Indicates that a cellular data link is suspended.
         *
         * @syscap SystemCapability.Telephony.CellularData
         * @since 7
         */
        DATA_STATE_SUSPENDED = 3
    }
}
export default data;
