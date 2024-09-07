/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
 * Interface for shape size properties.
 *
 * @interface ShapeSize
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
interface ShapeSize {
    /**
     * Defines the width of Shape.
     * @type { ? (number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 12
     */
    width?: number | string;
    /**
     * Defines the height of Shape.
     * @type { ? (number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 12
     */
    height?: number | string;
}
/**
 * Interface for RectShape constructor parameters.
 *
 * @interface RectShapeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
interface RectShapeOptions extends ShapeSize {
    /**
     * Defines the corner radius of the RectShape.
     * @type { ? (number | string | Array<number | string>) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 12
     */
    radius?: number | string | Array<number | string>;
}
/**
 * Interface for RectShape constructor parameters with separate radius values.
 *
 * @interface RoundRectShapeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
interface RoundRectShapeOptions extends ShapeSize {
    /**
     * Defines the width of the corner radius for RectShape.
     * @type { ? (number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 12
     */
    radiusWidth?: number | string;
    /**
     * Defines the height of the corner radius for RectShape.
     * @type { ? (number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 12
     */
    radiusHeight?: number | string;
}
/**
 * Interface for PathShape constructor parameters.
 *
 * @interface PathShapeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
interface PathShapeOptions {
    /**
     * Defines the commands for drawing the PathShape.
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 12
     */
    commands?: string;
}
/**
 * Common shape method class
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
declare class CommonShapeMethod<T> {
    /**
     * Sets coordinate offset relative to the layout completion position.
     *
     * @param { Position } offset
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    offset(offset: Position): T;
    /**
     * Sets the fill color of the shape.
     *
     * @param { ResourceColor } color
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    fill(color: ResourceColor): T;
    /**
     * Sets the position of the shape.
     *
     * @param { Position } position
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    position(position: Position): T;
}
/**
 * Base shape class
 *
 * @extends CommonShapeMethod<T>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
declare class BaseShape<T> extends CommonShapeMethod<T> {
    /**
     * Sets the width of the shape.
     *
     * @param { Length } width
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    width(width: Length): T;
    /**
     * Sets the height of the shape.
     *
     * @param { Length } height
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    height(height: Length): T;
    /**
     * Sets the size of the shape.
     *
     * @param { SizeOptions } size
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    size(size: SizeOptions): T;
}
/**
 * Defines a rect drawing class.
 *
 * @extends BaseShape<RectShape>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
export declare class RectShape extends BaseShape<RectShape> {
    /**
     * Constructor.
     *
     * @param { RectShapeOptions | RoundRectShapeOptions } options
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    constructor(options?: RectShapeOptions | RoundRectShapeOptions);
    /**
     * Sets the width of the corner radius for RectShape.
     *
     * @param { number | string } rWidth
     * @returns { RectShape }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    radiusWidth(rWidth: number | string): RectShape;
    /**
     * Sets the height of the corner radius for RectShape.
     *
     * @param { number | string } rHeight
     * @returns { RectShape }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    radiusHeight(rHeight: number | string): RectShape;
    /**
     * Sets the corner radius for RectShape.
     *
     * @param { number | string | Array<number | string> } radius
     * @returns { RectShape }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    radius(radius: number | string | Array<number | string>): RectShape;
}
/**
 * Defines a circle drawing class.
 *
 * @extends BaseShape<CircleShape>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
export declare class CircleShape extends BaseShape<CircleShape> {
    /**
     * Constructor.
     *
     * @param { ShapeSize } options
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    constructor(options?: ShapeSize);
}
/**
 * Defines an ellipse drawing class.
 *
 * @extends BaseShape<EllipseShape>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
export declare class EllipseShape extends BaseShape<EllipseShape> {
    /**
     * Constructor.
     *
     * @param { ShapeSize } options
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    constructor(options?: ShapeSize);
}
/**
 * Defines a path drawing class.
 *
 * @extends CommonShapeMethod<PathShape>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
export declare class PathShape extends CommonShapeMethod<PathShape> {
    /**
     * Constructor.
     *
     * @param { PathShapeOptions } options
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    constructor(options?: PathShapeOptions);
    /**
     * Sets the commands for drawing the PathShape.
     *
     * @param { string } commands
     * @returns { PathShape }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    commands(commands: string): PathShape;
}
