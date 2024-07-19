/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
import type accessibility from './@ohos.accessibility';
import type { KeyEvent } from './@ohos.multimodalInput.keyEvent';
import type { AccessibilityElement as _AccessibilityElement, ElementAttributeValues as _ElementAttributeValues, FocusDirection as _FocusDirection, FocusType as _FocusType, WindowType as _WindowType, Rect as _Rect, } from './application/AccessibilityExtensionContext';
import type * as _AccessibilityExtensionContext from './application/AccessibilityExtensionContext';
/**
 * Indicates an accessibility element.
 * Supports querying element attributes, requesting execution actions, and finding child elements by condition.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 10
 */
export type AccessibilityElement = _AccessibilityElement;
/**
 * Indicates the possible attributes of the element and the type of the attribute value.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 10
 */
export type ElementAttributeValues = _ElementAttributeValues;
/**
 * Indicates the direction of the search focus.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 10
 */
export type FocusDirection = _FocusDirection;
/**
 * Indicates the key of the attribute value.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 10
 */
export type ElementAttributeKeys = keyof ElementAttributeValues;
/**
 * Indicates the type of the focus.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 10
 */
export type FocusType = _FocusType;
/**
 * Indicates the type of the window.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 10
 */
export type WindowType = _WindowType;
/**
 * Indicates rectangle.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 10
 */
export type Rect = _Rect;
/**
 * The accessibility extension context. Used to configure, query information, and inject gestures.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 10
 */
export type AccessibilityExtensionContext = _AccessibilityExtensionContext.default;
/**
 * class of accessibility extension ability.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
export default class AccessibilityExtensionAbility {
    /**
     * Indicates accessibility extension ability context.
     *
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    context: AccessibilityExtensionContext;
    /**
     * Called when extension ability is connected.
     *
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    onConnect(): void;
    /**
     * Called when extension ability is disconnected.
     *
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    onDisconnect(): void;
    /**
     * Called when an accessibility event occurs, such as when the user touches the application interface.
     *
     * @param { AccessibilityEvent } event Indicates an accessibility event.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    onAccessibilityEvent(event: AccessibilityEvent): void;
    /**
     * Called when a physical key is pressed, such as when the user presses the volume button .
     *
     * @param { KeyEvent } keyEvent Indicates the physical key event.
     * @returns { boolean }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    onKeyEvent(keyEvent: KeyEvent): boolean;
}
/**
 * Indicates the accessibility event.
 * It provides the event type and the target element of the event if any.
 *
 * @typedef AccessibilityEvent
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
declare interface AccessibilityEvent {
    /**
     * EventType
     *
     * @type { accessibility.EventType | accessibility.WindowUpdateType | TouchGuideType | GestureType | PageUpdateType }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    eventType: accessibility.EventType | accessibility.WindowUpdateType | TouchGuideType | GestureType | PageUpdateType;
    /**
     * Target
     *
     * @type { ?AccessibilityElement }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    target?: AccessibilityElement;
    /**
     * TimeStamp
     *
     * @type { ?number }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    timeStamp?: number;
    /**
     * ElementId
     *
     * @type { ?number }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 12
     */
    elementId?: number;
    /**
     * The content of announce accessibility text.
     *
     * @type { ?string }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 12
     */
    textAnnouncedForAccessibility?: string;
}
/**
 * Indicates the gesture type.
 * value range: { 'left' | 'leftThenRight' | 'leftThenUp' | 'leftThenDown' |
 * 'right' | 'rightThenLeft' | 'rightThenUp' | 'rightThenDown' |
 * 'up' | 'upThenLeft' | 'upThenRight' | 'upThenDown' |
 * 'down' | 'downThenLeft' | 'downThenRight' | 'downThenUp' }
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
/**
 * Indicates the gesture type.
 * value range: { 'left' | 'leftThenRight' | 'leftThenUp' | 'leftThenDown' |
 * 'right' | 'rightThenLeft' | 'rightThenUp' | 'rightThenDown' |
 * 'up' | 'upThenLeft' | 'upThenRight' | 'upThenDown' |
 * 'down' | 'downThenLeft' | 'downThenRight' | 'downThenUp' |
 * 'twoFingerSingleTap' | 'twoFingerDoubleTap' | 'twoFingerDoubleTapAndHold' | 'twoFingerTripleTap' |
 * 'twoFingerTripleTapAndHold' | 'threeFingerSingleTap' | 'threeFingerDoubleTap' | 'threeFingerDoubleTapAndHold' |
 * 'threeFingerTripleTap' | 'threeFingerTripleTapAndHold' | 'fourFingerSingleTap' | 'fourFingerDoubleTap' |
 * 'fourFingerDoubleTapAndHold' | 'fourFingerTripleTap' | 'fourFingerTripleTapAndHold' |
 * 'threeFingerSwipeUp' | 'threeFingerSwipeDown' | 'threeFingerSwipeLeft' | 'threeFingerSwipeRight' |
 * 'fourFingerSwipeUp' | 'fourFingerSwipeDown' | 'fourFingerSwipeLeft' | 'fourFingerSwipeRight' }
* @syscap SystemCapability.BarrierFree.Accessibility.Core
* @since 11
*/
type GestureType = 'left' | 'leftThenRight' | 'leftThenUp' | 'leftThenDown' | 'right' | 'rightThenLeft' | 'rightThenUp' | 'rightThenDown' | 'up' | 'upThenLeft' | 'upThenRight' | 'upThenDown' | 'down' | 'downThenLeft' | 'downThenRight' | 'downThenUp' | 'twoFingerSingleTap' | 'twoFingerDoubleTap' | 'twoFingerDoubleTapAndHold' | 'twoFingerTripleTap' | 'twoFingerTripleTapAndHold' | 'threeFingerSingleTap' | 'threeFingerDoubleTap' | 'threeFingerDoubleTapAndHold' | 'threeFingerTripleTap' | 'threeFingerTripleTapAndHold' | 'fourFingerSingleTap' | 'fourFingerDoubleTap' | 'fourFingerDoubleTapAndHold' | 'fourFingerTripleTap' | 'fourFingerTripleTapAndHold' | 'threeFingerSwipeUp' | 'threeFingerSwipeDown' | 'threeFingerSwipeLeft' | 'threeFingerSwipeRight' | 'fourFingerSwipeUp' | 'fourFingerSwipeDown' | 'fourFingerSwipeLeft' | 'fourFingerSwipeRight';
/**
 * Indicates the page update type.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
type PageUpdateType = 'pageContentUpdate' | 'pageStateUpdate';
/**
 * Indicates the type of touch event during touch browsing.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
type TouchGuideType = 'touchBegin' | 'touchEnd';
