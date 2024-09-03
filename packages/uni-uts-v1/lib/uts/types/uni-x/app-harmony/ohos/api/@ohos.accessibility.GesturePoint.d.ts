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
/**
 * Indicates the point of the gesture.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
export declare class GesturePoint {
    /**
     * A constructor used to create a GesturePoint object.
     *
     * @param { number } positionX - Indicates the X coordinate of point.
     * @param { number } positionY - Indicates the Y coordinate of point.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    constructor(positionX: number, positionY: number);
    /**
     * Indicates the X coordinate of point.
     *
     * @type { number }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    positionX: number;
    /**
     * Indicates the Y coordinate of point.
     *
     * @type { number }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    positionY: number;
}
