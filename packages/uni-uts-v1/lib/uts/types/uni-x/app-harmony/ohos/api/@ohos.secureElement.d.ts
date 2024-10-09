/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import type { AsyncCallback, Callback } from './@ohos.base';
/**
 * Provides APIs for mobile applications to access different SEs in mobile devices, such as SIMs or embedded SEs.
 * See "Open Mobile API Specification".
 *
 * @namespace omapi
 * @syscap SystemCapability.Communication.SecureElement
 * @since 10
 */
declare namespace omapi {
    /**
     * Establish a new connection that can be used to connect to all the SEs available in the system.
     * The connection process can be quite long, so it happens in an asynchronous way. It is usable only
     * if the specified callback is called or if isConnected() returns true.
     *
     * @param { 'serviceState' } type nfc serviceState
     * @param { Callback<ServiceState> } callback - The callback to return the service.
     * @returns { SEService } The new SEService instance.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.SecureElement
     * @since 10
     * @deprecated since 12
     * @useinstead omapi#createService
     */
    function newSEService(type: 'serviceState', callback: Callback<ServiceState>): SEService;
    /**
     * Establish a new connection that can be used to connect to all the SEs available in the system.
     * The connection process can be quite long, so it happens in an asynchronous way. It is usable only
     * if isConnected() returns true.
     *
     * @returns { Promise<SEService> } Returns the created SEService instance.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.SecureElement
     * @since 12
     */
    function createService(): Promise<SEService>;
    /**
     * SEService realizes the communication to available SEs on the device.
     *
     * @typedef SEService
     * @syscap SystemCapability.Communication.SecureElement
     * @since 10
     */
    export interface SEService {
        /**
         * Returns the list of available SE readers. There must be no duplicated objects in the returned list.
         * All available readers SHALL be listed even if no card is inserted.
         *
         * @returns { Reader[] } The list of available SE readers.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        getReaders(): Reader[];
        /**
         * Checks whether or not the service is connected.
         *
         * @returns { boolean } True if the service is connected.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        isConnected(): boolean;
        /**
         * Releases all SE resources allocated by this SEService. As a result isConnected() will return false.
         *
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        shutdown(): void;
        /**
         * Returns the version of the Open Mobile API Specification this implementation is based on.
         *
         * @returns { string } The Open Mobile API version (e.g. “3.3” for Open Mobile API Specification version 3.3).
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        getVersion(): string;
    }
    /**
     * Reader represents the SE readers supported by this device.
     *
     * @typedef Reader
     * @syscap SystemCapability.Communication.SecureElement
     * @since 10
     */
    export interface Reader {
        /**
         * Returns the name of this reader.
         * If this reader is a SIM reader, then its name must be "SIM[slot]".
         * If the reader is an embedded SE reader, then its name must be "eSE[slot]".
         *
         * @returns { string } The reader name, as a String.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        getName(): string;
        /**
         * Checks if a SE is present in this reader.
         *
         * @returns { boolean } True if the SE is present, false otherwise.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, service state exception.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        isSecureElementPresent(): boolean;
        /**
         * Connects to a SE in this reader.
         * This method prepares (initializes) the SE for communication before the session object is returned.
         * There might be multiple sessions opened at the same time on the same reader.
         *
         * @returns { Session } A Session object to be used to create channels.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, service state exception.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        openSession(): Session;
        /**
         * Close all the sessions opened on this reader. All the channels opened by all these sessions will be closed.
         *
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, service state exception.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        closeSessions(): void;
    }
    /**
     * Session represent a connection session to one of the SEs available on the device. These objects
     * can be used to get a communication channel with an applet in the SE. This channel can be the basic channel
     * or a logical channel.
     *
     * @typedef Session
     * @syscap SystemCapability.Communication.SecureElement
     * @since 10
     */
    export interface Session {
        /**
         * Get the reader that provides this session.
         *
         * @returns { Reader } The Reader object.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        getReader(): Reader;
        /**
         * Get the ATR of this SE.
         * A empty array SHALL be returned if the ATR for this SE is not available.
         *
         * @returns { number[] } The ATR as a number array or empty array.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, service state exception.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        getATR(): number[];
        /**
         * Close the connection with the SE. This will close any channels opened by this application with this SE.
         *
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, service state exception.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        close(): void;
        /**
         * Check if this session is closed.
         *
         * @returns { boolean } True if the session is closed, false otherwise.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        isClosed(): boolean;
        /**
         * Close any channels opened on this session.
         *
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, service state exception.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        closeChannels(): void;
        /**
         * This method is provided to ease the development of mobile applications and for backward compatibility with
         * existing applications. This method is equivalent to openBasicChannel(aid, P2=0x00).
         *
         * @param { number[] } aid - The AID of the applet to be selected on this channel, as a byte array,
         * or Null if no applet is to be selected.
         * @returns { Promise<Channel> } An instance of channel if available. Null if the SE is unable to provide.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, an attempt is made to use an SE session that has been closed.
         * @throws { BusinessError } 3300102 - NoSuchElementError, the AID on the SE is not available or cannot be selected.
         * @throws { BusinessError } 3300103 - SecurityError, the calling application cannot be granted access to this AID or the default applet on this session.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        openBasicChannel(aid: number[]): Promise<Channel>;
        /**
         * This method is provided to ease the development of mobile applications and for backward compatibility with
         * existing applications. This method is equivalent to openBasicChannel(aid, P2=0x00).
         *
         * @param { number[] } aid - The AID of the applet to be selected on this channel, as a byte array,
         * or Null if no applet is to be selected.
         * @param { AsyncCallback<Channel> } callback - The callback to return the Channel object. Null if the SE is unable to provide.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, an attempt is made to use an SE session that has been closed.
         * @throws { BusinessError } 3300102 - NoSuchElementError, the AID on the SE is not available or cannot be selected.
         * @throws { BusinessError } 3300103 - SecurityError, the calling application cannot be granted access to this AID or the default applet on this session.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        openBasicChannel(aid: number[], callback: AsyncCallback<Channel>): void;
        /**
         * Get access to the basic channel, as defined in [ISO 7816-4] (the one that has number 0). The obtained object
         * is an instance of the channel class.
         * Once this channel has been opened by a device application, it is considered as ‘locked’ by this device
         * application, and other calls to this method SHALL return Null, until the channel is closed.
         * Some SE plug-ins, such as those handling UICC, may prevent the use of the Basic Channel. In these cases,
         * a Null value SHALL be returned.
         * P2 is normally 0x00. The device SHOULD allow any value for P2 and SHALL allow the following values:
         * 0x00, 0x04, 0x08, 0x0C (as defined in [ISO 7816-4]).
         *
         * @param { number[] } aid - The AID of the applet to be selected on this channel, as a byte array,
         * or Null if no applet is to be selected.
         * @param { number } p2 - The P2 parameter of the SELECT APDU executed on this channel.
         * @returns { Promise<Channel> } An instance of channel if available. Null if the SE is unable to provide.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, an attempt is made to use an SE session that has been closed.
         * @throws { BusinessError } 3300102 - NoSuchElementError, the AID on the SE is not available or cannot be selected.
         * @throws { BusinessError } 3300103 - SecurityError, the calling application cannot be granted access to this AID or the default applet on this session.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        openBasicChannel(aid: number[], p2: number): Promise<Channel>;
        /**
         * Get access to the basic channel, as defined in [ISO 7816-4] (the one that has number 0). The obtained object
         * is an instance of the channel class.
         * Once this channel has been opened by a device application, it is considered as ‘locked’ by this device
         * application, and other calls to this method SHALL return Null, until the channel is closed.
         * Some SE plug-ins, such as those handling UICC, may prevent the use of the Basic Channel. In these cases,
         * a Null value SHALL be returned.
         * P2 is normally 0x00. The device SHOULD allow any value for P2 and SHALL allow the following values:
         * 0x00, 0x04, 0x08, 0x0C (as defined in [ISO 7816-4]).
         *
         * @param { number[] } aid - The AID of the applet to be selected on this channel, as a byte array,
         * or Null if no applet is to be selected.
         * @param { number } p2 - The P2 parameter of the SELECT APDU executed on this channel.
         * @param { AsyncCallback<Channel> } callback - The callback to return the Channel object. Null if the SE is unable to provide.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, an attempt is made to use an SE session that has been closed.
         * @throws { BusinessError } 3300102 - NoSuchElementError, the AID on the SE is not available or cannot be selected.
         * @throws { BusinessError } 3300103 - SecurityError, the calling application cannot be granted access to this AID or the default applet on this session.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        openBasicChannel(aid: number[], p2: number, callback: AsyncCallback<Channel>): void;
        /**
         * This method is provided to ease the development of mobile applications and for backward compatibility with
         * existing applications. This method is equivalent to openLogicalChannel(aid, P2=0x00).
         *
         * @param { number[] } aid - The AID of the applet to be selected on this channel, as a byte array.
         * @returns {  Promise<Channel> } An instance of channel if available. Null if the SE is unable to provide.
         * A new logical channel or is unable to retrieve Access Control rules due to the lack of an available logical channel.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, an attempt is made to use an SE session that has been closed.
         * @throws { BusinessError } 3300102 - NoSuchElementError, the AID on the SE is not available or cannot be selected or
         *                                     a logical channel is already open to a non-multi-selectable applet.
         * @throws { BusinessError } 3300103 - SecurityError, the calling application cannot be granted access to this AID or the default applet on this session.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        openLogicalChannel(aid: number[]): Promise<Channel>;
        /**
         * This method is provided to ease the development of mobile applications and for backward compatibility with
         * existing applications. This method is equivalent to openLogicalChannel(aid, P2=0x00).
         *
         * @param { number[] } aid - The AID of the applet to be selected on this channel, as a byte array.
         * @param { AsyncCallback<Channel> } callback - The callback to return the Channel object. Null if the SE is unable to provide.
         * A new logical channel or is unable to retrieve Access Control rules due to the lack of an available logical channel.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, an attempt is made to use an SE session that has been closed.
         * @throws { BusinessError } 3300102 - NoSuchElementError, the AID on the SE is not available or cannot be selected or
         *                                     a logical channel is already open to a non-multi-selectable applet.
         * @throws { BusinessError } 3300103 - SecurityError, the calling application cannot be granted access to this AID or the default applet on this session.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        openLogicalChannel(aid: number[], callback: AsyncCallback<Channel>): void;
        /**
         * Open a logical channel with the SE, selecting the applet represented by the given AID (when the AID is not
         * Null and the length of the AID is not 0).
         * If the length of the AID is 0, the method will select the Issuer Security Domain of the SE by sending a SELECT
         * command with 0 length AID as defined in [GPCS].
         * If the AID is Null, the method SHALL only send a MANAGE CHANNEL Open and SHALL NOT send a
         * SELECT command. In this case, the default applet associated to the logical channel will be selected by default.
         * P2 is normally 0x00. The device SHOULD allow any value for P2 and SHALL allow the following values:
         * 0x00, 0x04, 0x08, 0x0C (as defined in [ISO 7816-4]).
         *
         * @param { number[] } aid - The AID of the applet to be selected on this channel, as a byte array.
         * @param { number } p2 - The P2 parameter of the SELECT APDU executed on this channel.
         * @returns { Promise<Channel> } An instance of channel if available. Null if the SE is unable to provide.
         * A new logical channel or is unable to retrieve Access Control rules due to the lack of an available logical channel.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, an attempt is made to use an SE session that has been closed.
         * @throws { BusinessError } 3300102 - NoSuchElementError, the AID on the SE is not available or cannot be selected or
         *                                     a logical channel is already open to a non-multi-selectable applet.
         * @throws { BusinessError } 3300103 - SecurityError, the calling application cannot be granted access to this AID or the default applet on this session.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        openLogicalChannel(aid: number[], p2: number): Promise<Channel>;
        /**
         * Open a logical channel with the SE, selecting the applet represented by the given AID (when the AID is not
         * Null and the length of the AID is not 0).
         * If the length of the AID is 0, the method will select the Issuer Security Domain of the SE by sending a SELECT
         * command with 0 length AID as defined in [GPCS].
         * If the AID is Null, the method SHALL only send a MANAGE CHANNEL Open and SHALL NOT send a
         * SELECT command. In this case, the default applet associated to the logical channel will be selected by default.
         * P2 is normally 0x00. The device SHOULD allow any value for P2 and SHALL allow the following values:
         * 0x00, 0x04, 0x08, 0x0C (as defined in [ISO 7816-4]).
         *
         * @param { number[] } aid - The AID of the applet to be selected on this channel, as a byte array.
         * @param { number } p2 - The P2 parameter of the SELECT APDU executed on this channel.
         * @param { AsyncCallback<Channel> } callback - The callback to return the instance of channel. Null if the SE is unable to provide.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, an attempt is made to use an SE session that has been closed.
         * @throws { BusinessError } 3300102 - NoSuchElementError, the AID on the SE is not available or cannot be selected or
         *                                     a logical channel is already open to a non-multi-selectable applet.
         * @throws { BusinessError } 3300103 - SecurityError, the calling application cannot be granted access to this AID or the default applet on this session.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        openLogicalChannel(aid: number[], p2: number, callback: AsyncCallback<Channel>): void;
    }
    /**
     * Channel represents an [ISO 7816-4] channel opened to a SE. It can be either a logical channel or the basic channel.
     *
     * @typedef Channel
     * @syscap SystemCapability.Communication.SecureElement
     * @since 10
     */
    export interface Channel {
        /**
         * Get the session that has opened this channel.
         *
         * @returns { Session } The Session object this channel is bound to.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        getSession(): Session;
        /**
         * Closes this channel to the SE.
         * If the method is called when the channel is already closed, this method SHALL be ignored.
         *
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        close(): void;
        /**
         * Checks whether this channel is the basic channel.
         *
         * @returns { boolean } True if this channel is a basic channel, false otherwise.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        isBasicChannel(): boolean;
        /**
         * Checks if this channel is closed.
         *
         * @returns { boolean } True if the channel is closed, false otherwise.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        isClosed(): boolean;
        /**
         * Returns the data as received from the application select command, including the status word received
         * at applet selection.
         *
         * @returns { number[] } The data as returned by the application select command inclusive of the status word.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        getSelectResponse(): number[];
        /**
         * Transmit an APDU command (as per ISO/IEC 7816) to the SE.
         *
         * @param { number[] } command - The APDU command to be transmitted, as a byte array.
         * @returns { Promise<number[]> } The response received, as a byte array.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, an attempt is made to use an SE session or channel that has been closed.
         * @throws { BusinessError } 3300103 - SecurityError, the command is filtered by the security policy.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        transmit(command: number[]): Promise<number[]>;
        /**
         * Transmit an APDU command (as per ISO/IEC 7816) to the SE.
         *
         * @param { number[] } command - The APDU command to be transmitted, as a byte array.
         * @param { AsyncCallback<number[]> } callback - The callback to return the response received, as a byte array.
         * @throws { BusinessError } 401 - The parameter check failed. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 3300101 - IllegalStateError, an attempt is made to use an SE session or channel that has been closed.
         * @throws { BusinessError } 3300103 - SecurityError, the command is filtered by the security policy.
         * @throws { BusinessError } 3300104 - IOError, there is a communication problem to the reader or the SE.
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        transmit(command: number[], callback: AsyncCallback<number[]>): void;
    }
    /**
     * Secure Element service state definition.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.SecureElement
     * @since 10
     */
    enum ServiceState {
        /**
         * Service is disconnected.
         *
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        DISCONNECTED = 0,
        /**
         * Service is connected.
         *
         * @syscap SystemCapability.Communication.SecureElement
         * @since 10
         */
        CONNECTED = 1
    }
}
export default omapi;
