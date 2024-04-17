/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit InputKit
 */
import type { InputEvent } from './@ohos.multimodalInput.inputEvent';
import type { KeyCode } from './@ohos.multimodalInput.keyCode';
/**
 * Action
 *
 * @enum { number }
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 9
 */
export declare enum Action {
    /**
     * Cancel key
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    CANCEL = 0,
    /**
     * Down key
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    DOWN = 1,
    /**
     * Up key
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    UP = 2
}
/**
 * Key
 *
 * @interface Key
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 9
 */
export declare interface Key {
    /**
     * Key code
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    code: KeyCode;
    /**
     * Time when the key is pressed
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    pressedTime: number;
    /**
     * Device to which the key belongs
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    deviceId: number;
}
/**
 * KeyEvent
 *
 * @interface KeyEvent
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 9
 */
export declare interface KeyEvent extends InputEvent {
    /**
     * Key action
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    action: Action;
    /**
     * Key that has changed
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    key: Key;
    /**
     * Unicode character corresponding to the key
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    unicodeChar: number;
    /**
     * List of pressed keys
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    keys: Key[];
    /**
     * Whether ctrlKey is being pressed
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    ctrlKey: boolean;
    /**
     * Whether altKey is being pressed
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    altKey: boolean;
    /**
     * Whether shiftKey is being pressed
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    shiftKey: boolean;
    /**
     * Whether logoKey is being pressed
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    logoKey: boolean;
    /**
     * Whether fnKey is being pressed
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    fnKey: boolean;
    /**
     * Whether capsLock is active
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    capsLock: boolean;
    /**
     * Whether numLock is active
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    numLock: boolean;
    /**
     * Whether scrollLock is active
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    scrollLock: boolean;
}
