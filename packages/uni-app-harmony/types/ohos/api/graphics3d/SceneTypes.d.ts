/*
 * Copyright (c) 2024-2024 Huawei Device Co., Ltd.
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
 * @file Defines 3D basic types
 * @kit ArkGraphics3D
 */
/**
 * Defines Vec2.
 *
 * @typedef Vec2
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Vec2 {
    /**
     * X component of the vec2.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    x: number;
    /**
     * Y component of the vec2.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    y: number;
}
/**
 * Defines Vec3.
 *
 * @typedef Vec3
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Vec3 {
    /**
     * X component of the vec3.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    x: number;
    /**
     * Y component of the vec3.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    y: number;
    /**
     * Z component of the vec3.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    z: number;
}
/**
 * Defines Vec4.
 *
 * @typedef Vec4
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Vec4 {
    /**
     * X component of the vec4.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    x: number;
    /**
     * Y component of the vec4.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    y: number;
    /**
     * Z component of the vec4.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    z: number;
    /**
     * W component of the vec4.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    w: number;
}
/**
 * Quaternion representing a rotation.
 *
 * @typedef Quaternion
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Quaternion {
    /**
     * X component of the quaternion.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    x: number;
    /**
     * Y component of the quaternion.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    y: number;
    /**
     * Z component of the quaternion.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    z: number;
    /**
     * W component of the quaternion.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    w: number;
}
/**
 * Axis aligned bounding box.
 *
 * @typedef Aabb
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Aabb {
    /**
     * Coordinates of the AABB minimum corner.
     *
     * @type { Vec3 }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    aabbMin: Vec3;
    /**
     * Coordinates of the AABB maximum corner.
     *
     * @type { Vec3 }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    aabbMax: Vec3;
}
/**
 * Defines Color.
 *
 * @typedef Color
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Color {
    /**
     * R component of the color.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    r: number;
    /**
     * G component of the color.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    g: number;
    /**
     * B component of the color.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    b: number;
    /**
     * A component of the color.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    a: number;
}
/**
 * Defines rectangle.
 *
 * @typedef Rect
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Rect {
    /**
     * Left up x coordinate.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    x: number;
    /**
     * Left up y coordinate.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    y: number;
    /**
     * The width of the rectangle.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    width: number;
    /**
     * The height of the rectangle.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    height: number;
}
/**
 * 3D position information.
 *
 * @typedef { Vec3 }
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export type Position3 = Vec3;
/**
 * 3D rotation info as euler angles.
 *
 * @typedef { Vec3 }
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export type Rotation3 = Vec3;
/**
 * 3D scale information.
 *
 * @typedef { Vec3 }
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export type Scale3 = Vec3;
