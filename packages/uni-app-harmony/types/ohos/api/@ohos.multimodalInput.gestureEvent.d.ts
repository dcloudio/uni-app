/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
/**
 * Pinch event on touchPad
 *
 * @interface Pinch
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 10
 */
export declare interface Pinch {
    /**
     * Action type
     * @type { ActionType }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    type: ActionType;
    /**
     * scale
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    scale: number;
}
/**
 * Rotate event on touchPad
 *
 * @interface Rotate
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 11
 */
export declare interface Rotate {
    /**
     * Action type
     *
     * @type { ActionType }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 11
     */
    type: ActionType;
    /**
     * Rotate angle
     *
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 11
     */
    angle: number;
}
/**
 * Three fingers swipe event on touchPad
 *
 * @interface ThreeFingersSwipe
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 10
 */
export declare interface ThreeFingersSwipe {
    /**
     * Action type
     * @type { ActionType }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    type: ActionType;
    /**
     * Coordinate x
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    x: number;
    /**
     * Coordinate y
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    y: number;
}
/**
 * Four fingers swipe event on touchPad
 *
 * @interface FourFingersSwipe
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 10
 */
export declare interface FourFingersSwipe {
    /**
     * Action type
     * @type { ActionType }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    type: ActionType;
    /**
     * Coordinate x
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    x: number;
    /**
     * Coordinate y
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    y: number;
}
/**
 * Three fingers tap event on touchPad
 *
 * @interface ThreeFingersTap
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 11
 */
export declare interface ThreeFingersTap {
    /**
     * Action type
     *
     * @type { ActionType }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 11
     */
    type: ActionType;
}
/**
 * Gesture action type
 *
 * @enum { number }
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 10
 */
export declare enum ActionType {
    /**
     * Cancel of the gesture
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    CANCEL = 0,
    /**
     * Begin of the gesture
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    BEGIN = 1,
    /**
     * Update of the gesture
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    UPDATE = 2,
    /**
     * End of the gesture
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 10
     */
    END = 3
}
