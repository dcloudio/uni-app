/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file This module provides the capabilities to voip call.
 * @kit CallKit
 */
import type { Callback } from '@ohos.base';
import type image from '@ohos.multimedia.image';
/**
 * Provides methods related to VoIP Call Manager.
 *
 * @namespace voipCall
 * @syscap SystemCapability.Telephony.VoipCallManager
 * @since 4.1.0(11)
 */
declare namespace voipCall {
    /**
     * Subscribe to the voipCallUiEvent event.
     *
     * @param { 'voipCallUiEvent' } type - Event type. Indicates the voipCallUiEvent event to be subscribed to.
     * @param { Callback<VoipCallUiEventInfo> } callback - Indicates the callback for getting the result
     * of VoIP call event information.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1007200001 - Invalid parameter value.
     * @throws { BusinessError } 1007200002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 1007200003 - System internal error.
     * @throws { BusinessError } 1007200999 - Unknown error code.
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    function on(type: 'voipCallUiEvent', callback: Callback<VoipCallUiEventInfo>): void;
    /**
     * Unsubscribe to the voipCallUiEvent event.
     *
     * @param { 'voipCallUiEvent' } type - Event type. Indicates the voipCallUiEvent event to be unsubscribed to.
     * @param { Callback<VoipCallUiEventInfo> } callback - Indicates the callback to unsubscribe from
     * the voipCallUiEvent event.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1007200001 - Invalid parameter value.
     * @throws { BusinessError } 1007200002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 1007200003 - System internal error.
     * @throws { BusinessError } 1007200999 - Unknown error code.
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    function off(type: 'voipCallUiEvent', callback?: Callback<VoipCallUiEventInfo>): void;
    /**
     * Third-party applications report call status changes
     *
     * @param { string } callId - Indicates the identifier of the call.
     * @param { VoipCallState } callState - Indicates the call state.
     * @returns { Promise<void> } The promise returned by the reportCallStateChange.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1007200001 - Invalid parameter value.
     * @throws { BusinessError } 1007200002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 1007200003 - System internal error.
     * @throws { BusinessError } 1007200999 - Unknown error code.
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    function reportCallStateChange(callId: string, callState: VoipCallState): Promise<void>;
    /**
     * Third-party applications report incoming call
     *
     * @param { VoipCallAttribute } voipCallAttribute - Indicates the call detail information of the incoming call.
     * @returns { Promise<ErrorReason> } Returns the error reason when reportIncomingCall fail.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1007200001 - Invalid parameter value.
     * @throws { BusinessError } 1007200002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 1007200003 - System internal error.
     * @throws { BusinessError } 1007200999 - Unknown error code.
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    function reportIncomingCall(voipCallAttribute: VoipCallAttribute): Promise<ErrorReason>;
    /**
     * Third-party applications report outgoing call
     *
     * @param { VoipCallAttribute } voipCallAttribute - Indicates the call detail information of the outgoing call.
     * @returns { Promise<ErrorReason> } Returns the error reason when reportOutgoingCall fail.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1007200001 - Invalid parameter value.
     * @throws { BusinessError } 1007200002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 1007200003 - System internal error.
     * @throws { BusinessError } 1007200999 - Unknown error code.
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 5.0.0(12)
     */
    function reportOutgoingCall(voipCallAttribute: VoipCallAttribute): Promise<ErrorReason>;
    /**
     * Third-party applications report call audio event change
     *
     * @param { string } callId - Indicates the identifier of the call.
     * @param { CallAudioEvent } callAudioEvent - Indicates the audio event of the call.
     * @returns { Promise<void> } The promise returned by the reportCallAudioEventChange.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1007200001 - Invalid parameter value.
     * @throws { BusinessError } 1007200002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 1007200003 - System internal error.
     * @throws { BusinessError } 1007200999 - Unknown error code.
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 5.0.0(12)
     */
    function reportCallAudioEventChange(callId: string, callAudioEvent: CallAudioEvent): Promise<void>;
    /**
     * Third-party applications report the failed cause incoming call
     *
     * @param { string } callId - Indicates the identifier of the call.
     * @param { VoipCallFailureCause } voipCallFailureCause - Indicates the failed cause of the incoming call.
     * @returns { Promise<void> } The promise returned by the reportIncomingCallError.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1007200001 - Invalid parameter value.
     * @throws { BusinessError } 1007200002 - Operation failed. Cannot connect to service.
     * @throws { BusinessError } 1007200003 - System internal error.
     * @throws { BusinessError } 1007200999 - Unknown error code.
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    function reportIncomingCallError(callId: string, voipCallFailureCause: VoipCallFailureCause): Promise<void>;
    /**
     * Indicates the voip call dedail information.
     *
     * @interface VoipCallAttribute
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    export interface VoipCallAttribute {
        /**
         * Indicates the identifier of the call.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        callId: string;
        /**
         * Indicates the VoIP call type, includes voice and video.
         *
         * @type { VoipCallType }
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        voipCallType: VoipCallType;
        /**
         * Indicates the user name of the VoIP call.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        userName: string;
        /**
         * Indicates the user profile photo of the incoming call.
         *
         * @type { image.PixelMap }
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        userProfile: image.PixelMap;
        /**
         * Indicates the application UI extension ability name.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        abilityName: string;
        /**
         * Indicates the call state of VoIP call.
         *
         * @type { VoipCallState }
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        voipCallState: VoipCallState;
        /**
         * Indicates whether the VoIP incoming call default show live call banner. Default value is true.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 5.0.0(12)
         */
        showBannerForIncomingCall?: boolean;
    }
    /**
     * Indicates the VoIP call type.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    export enum VoipCallType {
        /**
         * Indicates the type of voip call is voice.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_VOICE = 0,
        /**
         * Indicates the type of voip call is video.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_VIDEO = 1
    }
    /**
     * Indicates the VoIP call state.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    export enum VoipCallState {
        /**
         * Indicates the call state is idle.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_STATE_IDLE = 0,
        /**
         * Indicates the call state is ringing.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_STATE_RINGING = 1,
        /**
         * Indicates the call state is active.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_STATE_ACTIVE = 2,
        /**
         * Indicates the call state is holding.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_STATE_HOLDING = 3,
        /**
         * Indicates the call state is disconnected.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_STATE_DISCONNECTED = 4,
        /**
         * Indicates the call state is dialing
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 5.0.0(12)
         */
        VOIP_CALL_STATE_DIALING = 5
    }
    /**
     * Indicates the event of the VoIP call from UI.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    export enum VoipCallUiEvent {
        /**
         * Indicates there is no event.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_EVENT_NONE = 0,
        /**
         * Indicates the user clicked the voice answer button.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_EVENT_VOICE_ANSWER = 1,
        /**
         * Indicates the user clicked the video answer button.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_EVENT_VIDEO_ANSWER = 2,
        /**
         * Indicates the user clicked the reject button.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_EVENT_REJECT = 3,
        /**
         * Indicates the voip call was hung up by other cause.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_EVENT_HANGUP = 4,
        /**
         * Indicates the user clicked muted.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 5.0.0(12)
         */
        VOIP_CALL_EVENT_MUTED = 5,
        /** Indicates the user clicked unmuted.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 5.0.0(12)
         */
        VOIP_CALL_EVENT_UNMUTED = 6,
        /**
         * Indicates the user clicked speaker on.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 5.0.0(12)
         */
        VOIP_CALL_EVENT_SPEAKER_ON = 7,
        /**
         * Indicates the user clicked speaker off.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 5.0.0(12)
         */
        VOIP_CALL_EVENT_SPEAKER_OFF = 8
    }
    /**
     * Indicates the error reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    export enum ErrorReason {
        /**
         * Indicates there is no error.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        ERROR_NONE = 0,
        /**
         * Indicates there is already a cellular call.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        CELLULAR_CALL_EXISTS = 1,
        /**
         * Indicates there is already a voip call.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        VOIP_CALL_EXISTS = 2,
        /**
         * Indicates this is a invalid call.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        INVALID_CALL = 3,
        /**
         * Indicates the user answered the cellular call first.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        USER_ANSWER_CELLULAR_FIRST = 4
    }
    /**
     * Indicates the VoIP call event detail information.
     *
     * @interface VoipCallUiEventInfo
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    export interface VoipCallUiEventInfo {
        /**
         * Indicates the identifier of the call.
         *
         * @type { string }
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        callId: string;
        /**
         * Indicates the event of the voip call.
         *
         * @type { VoipCallUiEvent }
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        voipCallUiEvent: VoipCallUiEvent;
        /**
         * Indicates the error reason.
         *
         * @type { ErrorReason }
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        errorReason: ErrorReason;
    }
    /**
     * Indicates the failed cause of the incoming call.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 4.1.0(11)
     */
    export enum VoipCallFailureCause {
        /**
         * Indicates the fail caused is other.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        OTHER = 0,
        /**
         * Indicates application line is busy.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        ROUTE_BUSY = 1,
        /**
         * Indicates application failed to establish connection.
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 4.1.0(11)
         */
        CONNECTION_FAILED = 2
    }
    /**
     * Indicates the event of the voip call audio mode change.
     *
     * @enum { number }
     * @syscap SystemCapability.Telephony.VoipCallManager
     * @since 5.0.0(12)
     */
    export enum CallAudioEvent {
        /**
         * Indicates the event of muted
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 5.0.0(12)
         */
        AUDIO_EVENT_MUTED = 0,
        /**
         * Indicates the event of unmuted
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 5.0.0(12)
         */
        AUDIO_EVENT_UNMUTED = 1,
        /**
         * Indicates the event of speaker on
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 5.0.0(12)
         */
        AUDIO_EVENT_SPEAKER_ON = 2,
        /**
         * Indicates the event of speaker off
         *
         * @syscap SystemCapability.Telephony.VoipCallManager
         * @since 5.0.0(12)
         */
        AUDIO_EVENT_SPEAKER_OFF = 3
    }
}
export default voipCall;
