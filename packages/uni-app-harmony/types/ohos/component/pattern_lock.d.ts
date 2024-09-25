/*
  * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * @kit ArkUI
 */
/**
 * The challenge result based on input pattern for control pattern lock component.
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare enum PatternLockChallengeResult {
    /**
     * The challenge result is correct.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    CORRECT = 1,
    /**
     * The challenge result is wrong.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    WRONG = 2
}
/**
 * Provides methods for control pattern lock component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Provides methods for control pattern lock component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
declare class PatternLockController {
    /**
     * constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    constructor();
    /**
     * Reset pattern lock.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Reset pattern lock.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    reset();
    /**
     * Set challenge result.
     * @param { PatternLockChallengeResult } result - The challenge result based on input pattern.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    setChallengeResult(result: PatternLockChallengeResult): void;
}
/**
 * Provides an interface for generating PatternLock.
 *
 * @interface PatternLockInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Provides an interface for generating PatternLock.
 *
 * @interface PatternLockInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
interface PatternLockInterface {
    /**
     * Constructor.
     *
     * @param { PatternLockController } [controller] - controller
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Constructor.
     *
     * @param { PatternLockController } [controller]  controller
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    (controller?: PatternLockController): PatternLockAttribute;
}
/**
 * Provides methods for attribute pattern lock component.
 *
 * @extends CommonMethod<PatternLockAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Provides methods for attribute pattern lock component.
 *
 * @extends CommonMethod<PatternLockAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
declare class PatternLockAttribute extends CommonMethod<PatternLockAttribute> {
    /**
     * The square side length of pattern lock component.
     *
     * @param { Length } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * The square side length of pattern lock component.
     *
     * @param { Length } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    sideLength(value: Length): PatternLockAttribute;
    /**
     * Circle radius.
     *
     * @param { Length } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Circle radius.
     *
     * @param { Length } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    circleRadius(value: Length): PatternLockAttribute;
    /**
     * The background color.
     *
     * @param { ResourceColor } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * The background color.
     *
     * @param { ResourceColor } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    backgroundColor(value: ResourceColor): PatternLockAttribute;
    /**
     * Regular color.
     *
     * @param { ResourceColor } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Regular color.
     *
     * @param { ResourceColor } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    regularColor(value: ResourceColor): PatternLockAttribute;
    /**
     * The color when cell is selected.
     *
     * @param { ResourceColor } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * The color when cell is selected.
     *
     * @param { ResourceColor } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    selectedColor(value: ResourceColor): PatternLockAttribute;
    /**
     * The color when cell is active state.
     *
     * @param { ResourceColor } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * The color when cell is active state.
     *
     * @param { ResourceColor } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    activeColor(value: ResourceColor): PatternLockAttribute;
    /**
     * The path line color.
     *
     * @param { ResourceColor } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * The path line color.
     *
     * @param { ResourceColor } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    pathColor(value: ResourceColor): PatternLockAttribute;
    /**
     * The path line stroke width.
     *
     * @param { number | string } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * The path line stroke width.
     *
     * @param { number | string } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    pathStrokeWidth(value: number | string): PatternLockAttribute;
    /**
     * Called when the pattern input completed.
     *
     * @param { function } callback
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the pattern input completed.
     *
     * @param { function } callback
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    onPatternComplete(callback: (input: Array<number>) => void): PatternLockAttribute;
    /**
     * Called when judging whether the input state can be reset by touch pattern lock.
     *
     * @param { boolean } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when judging whether the input state can be reset by touch pattern lock.
     *
     * @param { boolean } value
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    autoReset(value: boolean): PatternLockAttribute;
    /**
     * Called when connecting to a grid dot.
     * @param { import('../api/@ohos.base').Callback<number> } callback - A callback instance used when connection to a grid dot.
     * @returns { PatternLockAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onDotConnect(callback: import('../api/@ohos.base').Callback<number>): PatternLockAttribute;
}
/**
 * Defines PatternLock Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines PatternLock Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
declare const PatternLock: PatternLockInterface;
/**
 * Defines PatternLock Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines PatternLock Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
declare const PatternLockInstance: PatternLockAttribute;
