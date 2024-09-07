/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import type { GesturePoint } from './@ohos.accessibility.GesturePoint';
/**
 * Indicates the path of the gesture.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
export declare class GesturePath {
    /**
     * A constructor used to create a GesturePath object.
     *
     * @param { number } durationTime - Indicates the duration of the gesture.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    constructor(durationTime: number);
    /**
     * Indicates the position of the points that make up the gesture.
     *
     * @type { Array<GesturePoint> }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    points: Array<GesturePoint>;
    /**
     * Indicates the duration of the gesture.
     *
     * @type { number }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    durationTime: number;
}
