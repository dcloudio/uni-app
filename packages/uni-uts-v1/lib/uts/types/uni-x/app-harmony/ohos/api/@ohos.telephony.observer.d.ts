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
import type { Callback } from './@ohos.base';
import type radio from './@ohos.telephony.radio';
import type data from './@ohos.telephony.data';
import type call from './@ohos.telephony.call';
import type sim from './@ohos.telephony.sim';
/**
 * Monitors telephony state updates of a device, including updates of the network state,
 * signal strength, call state, the data link connection state and others.
 *
 * @namespace observer
 * @syscap SystemCapability.Telephony.StateRegistry
 * @since 6
 */
declare namespace observer {
    /**
     * Describes the network registration state.
     *
     * @typedef { radio.NetworkState }
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    type NetworkState = radio.NetworkState;
    /**
     * Describes the signal strength information.
     *
     * @typedef { radio.SignalInformation }
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    type SignalInformation = radio.SignalInformation;
    /**
     * Describes the cellular data link connection state.
     *
     * @typedef { data.DataConnectState }
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    type DataConnectState = data.DataConnectState;
    /**
     * Describes the radio access technology.
     *
     * @typedef { radio.RadioTechnology }
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    type RatType = radio.RadioTechnology;
    /**
     * Describes the cellular data flow type.
     *
     * @typedef { data.DataFlowType }
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    type DataFlowType = data.DataFlowType;
    /**
     * Indicates the states of call.
     *
     * @typedef { call.CallState }
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    type CallState = call.CallState;
    /**
     * Indicates the SIM card types.
     *
     * @typedef { sim.CardType }
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    type CardType = sim.CardType;
    /**
     * Indicates the SIM card states.
     *
     * @typedef { sim.SimState }
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    type SimState = sim.SimState;
    /**
     * Callback when the network state corresponding to the default sim card is updated.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { 'networkStateChange' } type - Event type. Indicates the networkStateChange event to be subscribed to.
     * @param { Callback<NetworkState> } callback - Indicates the callback for
     * getting an instance of the {@code NetworkState} class.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    function on(type: 'networkStateChange', callback: Callback<NetworkState>): void;
    /**
     * Callback when the network state corresponding to the monitored {@code slotId} is updated.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { 'networkStateChange' } type - Event type. Indicates the networkStateChange event to be subscribed to.
     * @param { object } options - Indicates the ID of the target card slot.
     * The value {@code 0} indicates card 1, and the value {@code 1} indicates card 2.
     * @param { Callback<NetworkState> } callback - Indicates the callback for getting
     * an instance of the {@code NetworkState} class.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    /**
     * Callback when the network state corresponding to the monitored {@code slotId} is updated.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { 'networkStateChange' } type - Event type. Indicates the networkStateChange event to be subscribed to.
     * @param { ObserverOptions } options - Indicates the options for observer.
     * @param { Callback<NetworkState> } callback - Indicates the callback for getting
     * an instance of the {@code NetworkState} class.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    function on(type: 'networkStateChange', options: ObserverOptions, callback: Callback<NetworkState>): void;
    /**
     * Cancel callback when the network state is updated.
     *
     * @param { 'networkStateChange' } type - Event type. Indicates the networkStateChange event to unsubscribe from.
     * @param { Callback<NetworkState> } callback - Indicates the callback for getting
     * an instance of the {@code NetworkState} class.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    function off(type: 'networkStateChange', callback?: Callback<NetworkState>): void;
    /**
     * Callback when the signal strength corresponding to the default sim card is updated.
     *
     * @param { 'signalInfoChange' } type - Event type. Indicates the signalInfoChange event to be subscribed to.
     * @param { Callback<Array<SignalInformation>> } callback - Indicates the callback for getting
     * an array of instances of the classes derived from {@link SignalInformation}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    function on(type: 'signalInfoChange', callback: Callback<Array<SignalInformation>>): void;
    /**
     * Callback when the signal strength corresponding to a monitored {@code slotId} is updated.
     *
     * @param { 'signalInfoChange' } type - Event type. Indicates the signalInfoChange event to be subscribed to.
     * @param { object } options - Indicates the ID of the target card slot.
     * The value {@code 0} indicates card 1, and the value {@code 1} indicates card 2.
     * @param { Callback<Array<SignalInformation>> } callback - Indicates the callback for getting
     * an array of instances of the classes derived from {@link SignalInformation}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    /**
     * Callback when the signal strength corresponding to a monitored {@code slotId} is updated.
     *
     * @param { 'signalInfoChange' } type - Event type. Indicates the signalInfoChange event to be subscribed to.
     * @param { ObserverOptions } options - Indicates the options for observer.
     * @param { Callback<Array<SignalInformation>> } callback - Indicates the callback for getting
     * an array of instances of the classes derived from {@link SignalInformation}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    function on(type: 'signalInfoChange', options: ObserverOptions, callback: Callback<Array<SignalInformation>>): void;
    /**
     * Cancel callback when the signal strength is updated.
     *
     * @param { 'signalInfoChange' } type - Event type. Indicates the signalInfoChange event to unsubscribe from.
     * @param { Callback<Array<SignalInformation>> } callback - Indicates the callback to unsubscribe from
     * the signalInfoChange event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    function off(type: 'signalInfoChange', callback?: Callback<Array<SignalInformation>>): void;
    /**
     * Callback when the cellular data link connection state corresponding to the default sim card is updated.
     *
     * @param { 'cellularDataConnectionStateChange' } type - Event type. Indicates the cellularDataConnectionStateChange
     * event to be subscribed to.
     * @param { Callback<{ state: DataConnectState, network: RatType }> } callback - Indicates the callback for
     * getting the cellular data link connection state, and networkType Indicates the radio access technology
     * for cellular data services.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 7
     */
    /**
     * Callback when the cellular data link connection state corresponding to the default sim card is updated.
     *
     * @param { 'cellularDataConnectionStateChange' } type - Event type. Indicates the cellularDataConnectionStateChange
     * event to be subscribed to.
     * @param { Callback<DataConnectionStateInfo> } callback - Indicates the callback for
     * getting the cellular data link connection state, and networkType Indicates the radio access technology
     * for cellular data services.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    function on(type: 'cellularDataConnectionStateChange', callback: Callback<DataConnectionStateInfo>): void;
    /**
     * Callback when the cellular data link connection state corresponding to the monitored {@code slotId} is updated.
     *
     * @param { 'cellularDataConnectionStateChange' } type - Event type. Indicates the cellularDataConnectionStateChange
     * event to be subscribed to.
     * @param { object } options - Indicates the ID of the target card slot.
     * The value {@code 0} indicates card 1, and the value {@code 1} indicates card 2.
     * @param { Callback<{ state: DataConnectState, network: RatType }> } callback - Indicates the callback for
     * getting the cellular data link connection state, and networkType Indicates the radio access technology for
     * cellular data services.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 7
     */
    /**
     * Callback when the cellular data link connection state corresponding to the monitored {@code slotId} is updated.
     *
     * @param { 'cellularDataConnectionStateChange' } type - Event type. Indicates the cellularDataConnectionStateChange
     * event to be subscribed to.
     * @param { ObserverOptions } options - Indicates the options for observer.
     * @param { Callback<DataConnectionStateInfo> } callback - Indicates the callback for
     * getting the cellular data link connection state, and networkType Indicates the radio access technology for
     * cellular data services.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    function on(type: 'cellularDataConnectionStateChange', options: ObserverOptions, callback: Callback<DataConnectionStateInfo>): void;
    /**
     * Cancel callback when the cellular data link connection state is updated.
     *
     * @param { 'cellularDataConnectionStateChange' } type - Event type. Indicates the cellularDataConnectionStateChange
     * event to unsubscribe from.
     * @param { Callback<{ state: DataConnectState, network: RatType }> } callback - Indicates the callback to unsubscribe
     * from the cellularDataConnectionStateChange event.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 7
     */
    /**
     * Cancel callback when the cellular data link connection state is updated.
     *
     * @param { 'cellularDataConnectionStateChange' } type - Event type. Indicates the cellularDataConnectionStateChange
     * event to unsubscribe from.
     * @param { Callback<DataConnectionStateInfo> } callback - Indicates the callback to unsubscribe
     * from the cellularDataConnectionStateChange event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    function off(type: 'cellularDataConnectionStateChange', callback?: Callback<DataConnectionStateInfo>): void;
    /**
     * Callback when the uplink and downlink data flow state of cellular data services
     * corresponding to the default sim card is updated.
     *
     * @param { 'cellularDataFlowChange' } type - Event type. Indicates the cellularDataFlowChange event to be subscribed to.
     * @param { Callback<DataFlowType> } callback - Indicates the callback for getting the cellular data flow state.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 7
     */
    function on(type: 'cellularDataFlowChange', callback: Callback<DataFlowType>): void;
    /**
     * Callback when the uplink and downlink data flow state of cellular data services
     * corresponding to the monitored {@code slotId} is updated.
     *
     * @param { 'cellularDataFlowChange' } type - Event type. Indicates the cellularDataFlowChange event to be subscribed to.
     * @param { object } options - Indicates the ID of the target card slot.
     * The value {@code 0} indicates card 1, and the value {@code 1} indicates card 2.
     * @param { Callback<DataFlowType> } callback - Indicates the callback for getting the cellular data flow state.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 7
     */
    /**
     * Callback when the uplink and downlink data flow state of cellular data services
     * corresponding to the monitored {@code slotId} is updated.
     *
     * @param { 'cellularDataFlowChange' } type - Event type. Indicates the cellularDataFlowChange event to be subscribed to.
     * @param { ObserverOptions } options - Indicates the options for observer.
     * @param { Callback<DataFlowType> } callback - Indicates the callback for getting the cellular data flow state.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    function on(type: 'cellularDataFlowChange', options: ObserverOptions, callback: Callback<DataFlowType>): void;
    /**
     * Cancel callback when the uplink and downlink data flow state of cellular data services is updated.
     *
     * @param { 'cellularDataFlowChange' } type - Event type. Indicates the cellularDataFlowChange event to unsubscribe from.
     * @param { Callback<DataFlowType> } callback - Indicates the callback to unsubscribe from
     * the cellularDataFlowChange event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 7
     */
    function off(type: 'cellularDataFlowChange', callback?: Callback<DataFlowType>): void;
    /**
     * Callback when the call state corresponding to the default sim card is updated.
     *
     * @param { 'callStateChange' } type - Event type. Indicates the callStateChange event to be subscribed to.
     * @param { Callback<{ state: CallState, number: string }> } callback - Indicates the callback for
     * getting the call state and the called number.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    /**
     * Callback when the call state corresponding to the default sim card is updated.
     *
     * @param { 'callStateChange' } type - Event type. Indicates the callStateChange event to be subscribed to.
     * @param { Callback<CallStateInfo> } callback - Indicates the callback for
     * getting the call state and the called number.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    function on(type: 'callStateChange', callback: Callback<CallStateInfo>): void;
    /**
     * Callback when the call state corresponding to the monitored {@code slotId} is updated.
     *
     * @param { 'callStateChange' } type - Event type. Indicates the callStateChange event to be subscribed to.
     * @param { object } options - Indicates the ID of the target card slot.
     * The value {@code 0} indicates card 1, and the value {@code 1} indicates card 2.
     * @param { Callback<{ state: CallState, number: string }> } callback - Indicates the callback for
     * getting the call state and the called number.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    /**
     * Callback when the call state corresponding to the monitored {@code slotId} is updated.
     *
     * @param { 'callStateChange' } type - Event type. Indicates the callStateChange event to be subscribed to.
     * @param { ObserverOptions } options - Indicates the options for observer.
     * @param { Callback<CallStateInfo> } callback - Indicates the callback for
     * getting the call state and the called number.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    function on(type: 'callStateChange', options: ObserverOptions, callback: Callback<CallStateInfo>): void;
    /**
     * Cancel callback when the call state is updated.
     *
     * @param { 'callStateChange' } type - Event type. Indicates the callStateChange event to unsubscribe from.
     * @param { Callback<{ state: CallState, number: string }> } callback - Indicates the callback to
     * unsubscribe from the callStateChange event.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 6
     */
    /**
     * Cancel callback when the call state is updated.
     *
     * @param { 'callStateChange' } type - Event type. Indicates the callStateChange event to unsubscribe from.
     * @param { Callback<CallStateInfo> } callback - Indicates the callback to
     * unsubscribe from the callStateChange event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    function off(type: 'callStateChange', callback?: Callback<CallStateInfo>): void;
    /**
     * Callback when the sim state corresponding to the default sim card is updated.
     *
     * @param { 'simStateChange' } type - Event type. Indicates the simStateChange event to be subscribed to.
     * @param { Callback<SimStateData> } callback - Indicates the callback for getting the SimStateData object.
     * including state Indicates the sim state, and reason Indicates the cause of the change.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 7
     */
    function on(type: 'simStateChange', callback: Callback<SimStateData>): void;
    /**
     * Callback when the sim state corresponding to the monitored {@code slotId} is updated.
     *
     * @param { 'simStateChange' } type - Event type. Indicates the simStateChange event to be subscribed to.
     * @param { object } options - Indicates the ID of the target card slot.
     * The value {@code 0} indicates card 1, and the value {@code 1} indicates card 2.
     * @param { Callback<SimStateData> } callback - Indicates the callback for getting the SimStateData object.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 7
     */
    /**
     * Callback when the sim state corresponding to the monitored {@code slotId} is updated.
     *
     * @param { 'simStateChange' } type - Event type. Indicates the simStateChange event to be subscribed to.
     * @param { ObserverOptions } options - Indicates the options for observer.
     * @param { Callback<SimStateData> } callback - Indicates the callback for getting the SimStateData object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    function on(type: 'simStateChange', options: ObserverOptions, callback: Callback<SimStateData>): void;
    /**
     * Cancel callback when the sim state is updated.
     *
     * @param { 'simStateChange' } type - Event type. Indicates the simStateChange event to unsubscribe from.
     * @param { Callback<SimStateData> } callback - Indicates the callback to unsubscribe from the simStateChange event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 7
     */
    function off(type: 'simStateChange', callback?: Callback<SimStateData>): void;
    /**
     * Receives an ICC account change. This callback is invoked when the ICC account updates
     * and the observer is added to monitor the updates.
     *
     * @param { 'iccAccountInfoChange' } type - iccAccountInfoChange
     * @param { Callback<void> } callback - including state Indicates the ICC account information,
     * and reason Indicates the cause of the change.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 10
     */
    function on(type: 'iccAccountInfoChange', callback: Callback<void>): void;
    /**
     * Cancel to receive an ICC account change.
     *
     * @param { 'iccAccountInfoChange' } type - iccAccountInfoChange
     * @param { Callback<void> } callback - including state Indicates the ICC account information,
     * and reason Indicates the cause of the change.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws { BusinessError } 8300001 - Invalid parameter value.
     * @throws { BusinessError } 8300002 - Service connection failed.
     * @throws { BusinessError } 8300003 - System internal error.
     * @throws { BusinessError } 8300999 - Unknown error.
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 10
     */
    function off(type: 'iccAccountInfoChange', callback?: Callback<void>): void;
    /**
     * Indicates SIM card type and status.
     *
     * @interface SimStateData
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 7
     */
    export interface SimStateData {
        /**
         * Indicates the SIM card type.
         *
         * @type { CardType }
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 7
         */
        type: CardType;
        /**
         * Indicates the SIM card states.
         *
         * @type { SimState }
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 7
         */
        state: SimState;
        /**
         * Indicates the SIM card lock type.
         *
         * @type { LockReason }
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        reason: LockReason;
    }
    /**
     * Indicates call state and number.
     *
     * @interface CallStateInfo
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    export interface CallStateInfo {
        /**
         * Indicates call state.
         *
         * @type { CallState }
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 11
         */
        state: CallState;
        /**
         * Indicates call number.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 11
         */
        number: string;
    }
    /**
     * Indicates cellular data connect state and technology type.
     *
     * @interface DataConnectionStateInfo
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    export interface DataConnectionStateInfo {
        /**
         * Indicates cellular data connect state.
         *
         * @type { DataConnectState }
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 11
         */
        state: DataConnectState;
        /**
         * Indicates technology type.
         *
         * @type { RatType }
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 11
         */
        network: RatType;
    }
    /**
     * Indicates observer options.
     *
     * @interface ObserverOptions
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 11
     */
    export interface ObserverOptions {
        /**
         * Indicates the ID of the target card slot.
         *
         * @type { number }
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 11
         */
        slotId: number;
    }
    /**
     * Enum for SIM card lock type.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.StateRegistry
     * @since 8
     */
    export enum LockReason {
        /**
         * Indicates no SIM lock.
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_NONE,
        /**
         * Indicates the PIN lock.
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_PIN,
        /**
         * Indicates the PUK lock.
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_PUK,
        /**
         * Indicates network personalization of PIN lock(refer 3GPP TS 22.022 [33]).
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_PN_PIN,
        /**
         * Indicates network personalization of PUK lock(refer 3GPP TS 22.022 [33]).
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_PN_PUK,
        /**
         * Indicates network subset personalization of PIN lock(refer 3GPP TS 22.022 [33]).
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_PU_PIN,
        /**
         * Indicates network subset personalization of PUK lock(refer 3GPP TS 22.022 [33]).
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_PU_PUK,
        /**
         * Indicates service provider personalization of PIN lock(refer 3GPP TS 22.022 [33]).
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_PP_PIN,
        /**
         * Indicates service provider personalization of PUK lock(refer 3GPP TS 22.022 [33]).
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_PP_PUK,
        /**
         * Indicates corporate personalization of PIN lock(refer 3GPP TS 22.022 [33]).
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_PC_PIN,
        /**
         * Indicates corporate personalization of PUK lock(refer 3GPP TS 22.022 [33]).
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_PC_PUK,
        /**
         * Indicates SIM/USIM personalization of PIN lock(refer 3GPP TS 22.022 [33]).
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_SIM_PIN,
        /**
         * Indicates SIM/USIM personalization of PUK lock(refer 3GPP TS 22.022 [33]).
         *
         * @syscap SystemCapability.Telephony.StateRegistry
         * @since 8
         */
        SIM_SIM_PUK
    }
}
export default observer;
