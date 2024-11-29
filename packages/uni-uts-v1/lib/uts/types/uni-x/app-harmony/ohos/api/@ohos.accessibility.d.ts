/*
 * Copyright (C) 2021-2022 Huawei Device Co., Ltd.
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
 * @kit AccessibilityKit
 */
import type { AsyncCallback } from './@ohos.base';
import type { Callback } from './@ohos.base';
/**
 * Accessibility
 *
 * @namespace accessibility
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 7
 */
/**
 * Accessibility
 *
 * @namespace accessibility
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @atomicservice
 * @since 11
 */
declare namespace accessibility {
    /**
     * The type of the Ability app.
     *
     *{ 'audible' | 'generic' | 'haptic' | 'spoken' | 'visual' }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    /**
     * The type of the Ability app.
     *
     * { 'audible' | 'generic' | 'haptic' | 'spoken' | 'visual' | 'all' }
     * @typedef {'audible' | 'generic' | 'haptic' | 'spoken' | 'visual' | 'all'}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    type AbilityType = 'audible' | 'generic' | 'haptic' | 'spoken' | 'visual' | 'all';
    /**
     * The action that the ability can execute.
     * value range: { 'accessibilityFocus' | 'clearAccessibilityFocus' | 'focus' | 'clearFocus' | 'clearSelection' |
     * 'click' | 'longClick' | 'cut' | 'copy' | 'paste' | 'select' | 'setText' | 'delete' |
     * 'scrollForward' | 'scrollBackward' | 'setSelection' }
     *
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    /**
     * The action that the ability can execute.
     * value range: { 'accessibilityFocus' | 'clearAccessibilityFocus' | 'focus' | 'clearFocus' | 'clearSelection' |
     * 'click' | 'longClick' | 'cut' | 'copy' | 'paste' | 'select' | 'setText' | 'delete' |
     * 'scrollForward' | 'scrollBackward' | 'setSelection' | 'setCursorPosition' | 'home' |
     * 'back' | 'recentTask' | 'notificationCenter' | 'controlCenter' | 'common' }
     *
     * @typedef {'accessibilityFocus' | 'clearAccessibilityFocus' | 'focus' | 'clearFocus' | 'clearSelection' | 'click' | 'longClick' | 'cut' | 'copy' | 'paste' | 'select' | 'setText' | 'delete' | 'scrollForward' | 'scrollBackward' | 'setSelection' | 'setCursorPosition' | 'home' | 'back' | 'recentTask' | 'notificationCenter' | 'controlCenter' | 'common'}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 12
     */
    type Action = 'accessibilityFocus' | 'clearAccessibilityFocus' | 'focus' | 'clearFocus' | 'clearSelection' | 'click' | 'longClick' | 'cut' | 'copy' | 'paste' | 'select' | 'setText' | 'delete' | 'scrollForward' | 'scrollBackward' | 'setSelection' | 'setCursorPosition' | 'home' | 'back' | 'recentTask' | 'notificationCenter' | 'controlCenter' | 'common';
    /**
     * The type of the accessibility event.
     * windowsChange/windowContentChange/windowStateChange/announcement/notificationChange/textTraversedAtMove
     * value range: { 'accessibilityFocus' | 'accessibilityFocusClear' |
     * 'click' | 'longClick' | 'focus' | 'select' | 'hoverEnter' | 'hoverExit' |
     * 'textUpdate' | 'textSelectionUpdate' | 'scroll' }
     *
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    /**
     * The type of the accessibility event.
     * windowsChange/windowContentChange/windowStateChange/announcement/notificationChange/textTraversedAtMove
     * value range: { 'accessibilityFocus' | 'accessibilityFocusClear' |
     * 'click' | 'longClick' | 'focus' | 'select' | 'hoverEnter' | 'hoverExit' |
     * 'textUpdate' | 'textSelectionUpdate' | 'scroll' | 'requestFocusForAccessibility' |
     * 'announceForAccessibility' }
     *
     * @typedef {'accessibilityFocus' | 'accessibilityFocusClear' | 'click' | 'longClick' | 'focus' | 'select' | 'hoverEnter' | 'hoverExit' | 'textUpdate' | 'textSelectionUpdate' | 'scroll' | 'requestFocusForAccessibility' | 'announceForAccessibility'}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 12
     */
    type EventType = 'accessibilityFocus' | 'accessibilityFocusClear' | 'click' | 'longClick' | 'focus' | 'select' | 'hoverEnter' | 'hoverExit' | 'textUpdate' | 'textSelectionUpdate' | 'scroll' | 'requestFocusForAccessibility' | 'announceForAccessibility';
    /**
     * The change type of the windowsChange event.
     * It's used when received the {@code windowsChange} event.
     *
     * @typedef {'add' | 'remove' | 'bounds' | 'active' | 'focus'}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    type WindowUpdateType = 'add' | 'remove' | 'bounds' | 'active' | 'focus';
    /**
     * The type of the ability state.
     *
     * @typedef {'enable' | 'disable' | 'install'}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    type AbilityState = 'enable' | 'disable' | 'install';
    /**
     * The ability that accessibility subsystem support.
     * touchExplorer: Describes the capability to talkback.
     * magnification: Describes the capability to request to control the display magnification.
     * gesturesSimulation: Describes the capability to request to simulate the gesture.
     * windowContent: Describes the capability to search for the content of the active window.
     * filterKeyEvents: Describes the capability to request to filter key events.
     * fingerprintGesture: Describes the capability to request to fingerprint gesture.
     *
     * @typedef {'retrieve' | 'touchGuide' | 'keyEventObserver' | 'zoom' | 'gesture'}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    type Capability = 'retrieve' | 'touchGuide' | 'keyEventObserver' | 'zoom' | 'gesture';
    /**
     * The granularity of text move.
     *
     * @typedef {'char' | 'word' | 'line' | 'page' | 'paragraph'}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    type TextMoveUnit = 'char' | 'word' | 'line' | 'page' | 'paragraph';
    /**
     * Checks whether accessibility ability is enabled.
     *
     * @param { AsyncCallback<boolean> } callback Asynchronous callback interface.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     * @deprecated since 10
     * @useinstead ohos.accessibility#isOpenAccessibilitySync
     */
    function isOpenAccessibility(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether accessibility ability is enabled.
     *
     * @returns { Promise<boolean> } Returns {@code true} if the accessibility is enabled; returns {@code false} otherwise.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     * @deprecated since 10
     * @useinstead ohos.accessibility#isOpenAccessibilitySync
     */
    function isOpenAccessibility(): Promise<boolean>;
    /**
     * Checks whether accessibility ability is enabled.
     *
     * @returns { boolean } Returns true if the accessibility is enabled; returns false otherwise.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 10
     */
    /**
     * Checks whether accessibility ability is enabled.
     *
     * @returns { boolean } Returns true if the accessibility is enabled; returns false otherwise.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @atomicservice
     * @since 11
     */
    function isOpenAccessibilitySync(): boolean;
    /**
     * Checks touch browser ability (which is used by talkback) is enabled.
     *
     * @param { AsyncCallback<boolean> } callback Asynchronous callback interface.
     * @syscap SystemCapability.BarrierFree.Accessibility.Vision
     * @since 7
     * @deprecated since 10
     * @useinstead ohos.accessibility#isOpenTouchGuideSync
     */
    function isOpenTouchGuide(callback: AsyncCallback<boolean>): void;
    /**
     * Checks touch browser ability (which is used by talkback) is enabled.
     *
     * @returns { Promise<boolean> } Returns {@code true} if the touch browser is enabled; returns {@code false} otherwise.
     * @syscap SystemCapability.BarrierFree.Accessibility.Vision
     * @since 7
     * @deprecated since 10
     * @useinstead ohos.accessibility#isOpenTouchGuideSync
     */
    function isOpenTouchGuide(): Promise<boolean>;
    /**
     * Checks touch browser ability (which is used by talkback) is enabled.
     *
     * @returns { boolean } Returns true if the touch browser is enabled; returns false otherwise.
     * @syscap SystemCapability.BarrierFree.Accessibility.Vision
     * @since 10
     */
    /**
     * Checks touch browser ability (which is used by talkback) is enabled.
     *
     * @returns { boolean } Returns true if the touch browser is enabled; returns false otherwise.
     * @syscap SystemCapability.BarrierFree.Accessibility.Vision
     * @atomicservice
     * @since 11
     */
    function isOpenTouchGuideSync(): boolean;
    /**
     * Queries the list of accessibility abilities.
     *
     * @param { AbilityType } abilityType The type of the accessibility ability. {@code AbilityType} eg.spoken
     * @param { AbilityState } stateType The state of the accessibility ability.  {@code AbilityState} eg.installed
     * @param { AsyncCallback<Array<AccessibilityAbilityInfo>> } callback
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.accessibility#getAccessibilityExtensionList
     */
    function getAbilityLists(abilityType: AbilityType, stateType: AbilityState, callback: AsyncCallback<Array<AccessibilityAbilityInfo>>): void;
    /**
     * Queries the list of accessibility abilities.
     *
     * @param { AbilityType } abilityType The type of the accessibility ability. {@code AbilityType} eg.spoken
     * @param { AbilityState } stateType The state of the accessibility ability.  {@code AbilityState} eg.installed
     * @returns { Promise<Array<AccessibilityAbilityInfo>> } Returns the list of abilityInfos.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.accessibility#getAccessibilityExtensionList
     */
    function getAbilityLists(abilityType: AbilityType, stateType: AbilityState): Promise<Array<AccessibilityAbilityInfo>>;
    /**
     * Queries the list of accessibility abilities.
     *
     * @param { AbilityType } abilityType The type of the accessibility ability. {@code AbilityType} eg.spoken
     * @param { AbilityState } stateType The state of the accessibility ability.  {@code AbilityState} eg.installed
     * @returns { Promise<Array<AccessibilityAbilityInfo>> } Returns the list of abilityInfos.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    function getAccessibilityExtensionList(abilityType: AbilityType, stateType: AbilityState): Promise<Array<AccessibilityAbilityInfo>>;
    /**
     * Queries the list of accessibility abilities.
     *
     * @param { AbilityType } abilityType The type of the accessibility ability. {@code AbilityType} eg.spoken
     * @param { AbilityState } stateType The state of the accessibility ability.  {@code AbilityState} eg.installed
     * @param { AsyncCallback<Array<AccessibilityAbilityInfo>> } callback
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    function getAccessibilityExtensionList(abilityType: AbilityType, stateType: AbilityState, callback: AsyncCallback<Array<AccessibilityAbilityInfo>>): void;
    /**
     * Queries the list of accessibility abilities.
     *
     * @param { AbilityType } abilityType The type of the accessibility ability. {@code AbilityType} eg.spoken
     * @param { AbilityState } stateType The state of the accessibility ability.  {@code AbilityState} eg.installed
     * @returns { Array<AccessibilityAbilityInfo> } Returns the list of abilityInfos.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 12
     */
    function getAccessibilityExtensionListSync(abilityType: AbilityType, stateType: AbilityState): Array<AccessibilityAbilityInfo>;
    /**
     * Send accessibility Event.
     *
     * @param { EventInfo } event The object of the accessibility {@code EventInfo} .
     * @param { AsyncCallback<void> } callback Asynchronous callback interface.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.accessibility#sendAccessibilityEvent
     */
    function sendEvent(event: EventInfo, callback: AsyncCallback<void>): void;
    /**
     * Send accessibility Event.
     *
     * @param { EventInfo } event The object of the accessibility {@code EventInfo} .
     * @returns { Promise<void> } Returns {@code true} if success ; returns {@code false} otherwise.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.accessibility#sendAccessibilityEvent
     */
    function sendEvent(event: EventInfo): Promise<void>;
    /**
     * Send accessibility event.
     *
     * @param { EventInfo } event The object of the accessibility {@code EventInfo} .
     * @param { AsyncCallback<void> } callback Asynchronous callback interface.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    function sendAccessibilityEvent(event: EventInfo, callback: AsyncCallback<void>): void;
    /**
     * Send accessibility event.
     *
     * @param { EventInfo } event The object of the accessibility {@code EventInfo} .
     * @returns { Promise<void> } Returns {@code true} if success ; returns {@code false} otherwise.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    function sendAccessibilityEvent(event: EventInfo): Promise<void>;
    /**
     * Register the observe of the accessibility state changed.
     *
     * @param { 'accessibilityStateChange' } type state event type.
     * @param { Callback<boolean> } callback Asynchronous callback interface.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    function on(type: 'accessibilityStateChange', callback: Callback<boolean>): void;
    /**
     * Register the observe of the touchGuide state changed.
     *
     * @param { 'touchGuideStateChange' } type state event type.
     * @param { Callback<boolean> } callback Asynchronous callback interface.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Vision
     * @since 7
     */
    function on(type: 'touchGuideStateChange', callback: Callback<boolean>): void;
    /**
     * Unregister the observe of the accessibility state changed.
     *
     * @param { 'accessibilityStateChange' } type state event type
     * @param { Callback<boolean> } callback Asynchronous callback interface.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    function off(type: 'accessibilityStateChange', callback?: Callback<boolean>): void;
    /**
     * Unregister the observe of the touchGuide state changed.
     *
     * @param { 'touchGuideStateChange' } type state event type
     * @param { Callback<boolean> } callback Asynchronous callback interface.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    function off(type: 'touchGuideStateChange', callback?: Callback<boolean>): void;
    /**
     * Get the captions manager.
     *
     * @returns { CaptionsManager } Returns the captions manager.
     * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
     * @since 8
     * @deprecated since 12
     */
    function getCaptionsManager(): CaptionsManager;
    /**
     * Indicates the captions manager.
     *
     * @typedef CaptionsManager
     * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
     * @since 8
     */
    interface CaptionsManager {
        /**
         * Indicates whether captions are enabled.
         *
         * @type {boolean}
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         */
        enabled: boolean;
        /**
         * Indicates the style of captions.
         *
         * @type {CaptionsStyle}
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         */
        style: CaptionsStyle;
        /**
         * Register the observe of the enable state.
         *
         * @param { 'enableChange' } type
         * @param { Callback<boolean> } callback
         * @throws { BusinessError } 401 - Input parameter error. Possible causes:
         *     1. Mandatory parameters are left unspecified;
         *     2. Incorrect parameter types;
         *     3. Parameter verification failed.
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         * @deprecated since 12
         */
        on(type: 'enableChange', callback: Callback<boolean>): void;
        /**
         * Register the observer of the style.
         *
         * @param { 'styleChange' } type
         * @param { Callback<CaptionsStyle> } callback
         * @throws { BusinessError } 401 - Input parameter error. Possible causes:
         *     1. Mandatory parameters are left unspecified;
         *     2. Incorrect parameter types;
         *     3. Parameter verification failed.
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         * @deprecated since 12
         */
        on(type: 'styleChange', callback: Callback<CaptionsStyle>): void;
        /**
         * Unregister the observe of the enable state.
         *
         * @param { 'enableChange' } type
         * @param { Callback<boolean> } callback
         * @throws { BusinessError } 401 - Input parameter error. Possible causes:
         *     1. Mandatory parameters are left unspecified;
         *     2. Incorrect parameter types;
         *     3. Parameter verification failed.
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         * @deprecated since 12
         */
        off(type: 'enableChange', callback?: Callback<boolean>): void;
        /**
         * Unregister the observer of the style.
         *
         * @param { 'styleChange' } type
         * @param { Callback<CaptionsStyle> } callback
         * @throws { BusinessError } 401 - Input parameter error. Possible causes:
         *     1. Mandatory parameters are left unspecified;
         *     2. Incorrect parameter types;
         *     3. Parameter verification failed.
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         * @deprecated since 12
         */
        off(type: 'styleChange', callback?: Callback<CaptionsStyle>): void;
    }
    /**
     * Indicates the edge type of the captions font.
     *
     * @typedef {'none' | 'raised' | 'depressed' | 'uniform' | 'dropShadow'}
     * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
     * @since 8
     */
    type CaptionsFontEdgeType = 'none' | 'raised' | 'depressed' | 'uniform' | 'dropShadow';
    /**
     * Indicates the font family of captions.
     *
     * @typedef {'default' | 'monospacedSerif' | 'serif' | 'monospacedSansSerif' | 'sansSerif' | 'casual' | 'cursive' | 'smallCapitals'}
     * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
     * @since 8
     */
    type CaptionsFontFamily = 'default' | 'monospacedSerif' | 'serif' | 'monospacedSansSerif' | 'sansSerif' | 'casual' | 'cursive' | 'smallCapitals';
    /**
     * Indicates the style of captions.
     *
     * @typedef CaptionsStyle
     * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
     * @since 8
     */
    interface CaptionsStyle {
        /**
         * Indicates the font family of captions.
         *
         * @type {CaptionsFontFamily}
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         */
        fontFamily: CaptionsFontFamily;
        /**
         * Indicates the font scaling of captions.
         * @type { number }
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         */
        fontScale: number;
        /**
         * Indicates the font color of captions.
         * @type { number | string }
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         */
        fontColor: number | string;
        /**
         * Indicates the edge type of the captions font.
         * @type { CaptionsFontEdgeType }
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         */
        fontEdgeType: CaptionsFontEdgeType;
        /**
         * Indicates the background color of captions.
         * @type { number | string }
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         */
        backgroundColor: number | string;
        /**
         * Indicates the window color of captions.
         * @type { number | string }
         * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
         * @since 8
         */
        windowColor: number | string;
    }
    /**
     * Indicates the info of accessibility.
     *
     * @typedef AccessibilityAbilityInfo
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    interface AccessibilityAbilityInfo {
        /**
         * The ability id.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        readonly id: string;
        /**
         * The ability name.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        readonly name: string;
        /**
         * The bundle name of the ability.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        readonly bundleName: string;
        /**
         * The target bundle name for the observation.
         * @type { Array<string> }
         * @readonly
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 9
         */
        readonly targetBundleNames: Array<string>;
        /**
         * The type of the ability.
         * @type { Array<AbilityType> }
         * @readonly
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        readonly abilityTypes: Array<AbilityType>;
        /**
         * The capabilities of the ability.
         * @type { Array<Capability> }
         * @readonly
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        readonly capabilities: Array<Capability>;
        /**
         * The description of the ability.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        readonly description: string;
        /**
         * The events which the accessibility ability wants to observe.
         * @type { Array<EventType> }
         * @readonly
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        readonly eventTypes: Array<EventType>;
        /**
         * Indicates whether the extended service needs to be hidden.
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 12
         */
        readonly needHide: boolean;
        /**
         * The label of the ability.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 12
         */
        readonly label: string;
    }
    /**
     * Indicates the info of events.
     *
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 7
     */
    class EventInfo {
        /**
         * A constructor used to create a EventInfo object.
         *
         * @param jsonObject - Character string in JSON format required for creating an object.
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        constructor(jsonObject);
        /**
         * A constructor used to create a EventInfo object.
         *
         * @param { EventType } type - The type of the accessibility event.
         * @param { string } bundleName - The name of the bundle.
         * @param { Action } triggerAction - The action that the ability can execute.
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 11
         */
        constructor(type: EventType, bundleName: string, triggerAction: Action);
        /**
         * The type of an accessibility event.
         * @type { EventType }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        type: EventType;
        /**
         * The type of the window change event.
         * @type { ?WindowUpdateType }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        windowUpdateType?: WindowUpdateType;
        /**
         * The bundle name of the target application.
         * @type { string }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        bundleName: string;
        /**
         * The type of the event source component,such as button, chart.
         * @type { ?string }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        componentType?: string;
        /**
         * The page id of the event source.
         * @type { ?number }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        pageId?: number;
        /**
         * The accessibility event description.
         * @type { ?string }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        description?: string;
        /**
         * The action that triggers the accessibility event, for example, clicking or focusing a view.
         * @type { Action }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        triggerAction: Action;
        /**
         * The movement step used for reading texts.
         * @type { ?TextMoveUnit }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        textMoveUnit?: TextMoveUnit;
        /**
         * The content list.
         * @type { ?Array<string> }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        contents?: Array<string>;
        /**
         * The content changed before.
         * @type { ?string }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        lastContent?: string;
        /**
         * The start index of listed items on the screen.
         * @type { ?number }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        beginIndex?: number;
        /**
         * The index of the current item on the screen.
         * @type { ?number }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        currentIndex?: number;
        /**
         * The end index of listed items on the screen.
         * @type { ?number }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        endIndex?: number;
        /**
         * The total of the items, talkback used it when scroll.
         * @type { ?number }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 7
         */
        itemCount?: number;
        /**
         * The id of element.
         * @type { ?number }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 12
         */
        elementId?: number;
        /**
         * The content of announce accessibility text.
         * @type { ?string }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 12
         */
        textAnnouncedForAccessibility?: string;
        /**
         * The customized element id.
         * @type { ?string }
         * @syscap SystemCapability.BarrierFree.Accessibility.Core
         * @since 12
         */
        customId?: string;
    }
}
export default accessibility;
