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
 * @file Defines 3D node related interfaces
 * @kit ArkGraphics3D
 */
import { SceneResource, Mesh } from './SceneResources';
import { Position3, Quaternion, Scale3, Color } from './SceneTypes';
import { PostProcessSettings } from './ScenePostProcessSettings';
/**
 * Defines the layer mask of the node.
 *
 * @interface LayerMask
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface LayerMask {
    /**
     * Get whether layer mask is enabled.
     *
     * @param { number } index - the layer mask
     * @returns { boolean } whether layer mask is enabled
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    getEnabled(index: number): boolean;
    /**
     * Set whether the layer mask is enabled.
     *
     * @param { number } index - the layer mask
     * @param { boolean } enabled - whether layer mask is enabled
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    setEnabled(index: number, enabled: boolean): void;
}
/**
 * The enum of node type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export enum NodeType {
    /**
     * The node is an empty node.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    NODE = 1,
    /**
     * The node is a geometry node.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    GEOMETRY = 2,
    /**
     * The node is a camera node.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    CAMERA = 3,
    /**
     * The node is a light node.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    LIGHT = 4
}
/**
 * Defines a scene object container.
 *
 * @interface Container
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Container<T> {
    /**
     * Append a item to the container.
     *
     * @param { T } item - the item append to the end of container
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    append(item: T): void;
    /**
     * Insert a item.
     *
     * @param { T } item - the item insert to the container
     * @param { T | null } sibling - insert after this item, insert to the head if sibling is null
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    insertAfter(item: T, sibling: T | null): void;
    /**
     * Remove a item from Container's children.
     *
     * @param { T } item - the item to be removed
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    remove(item: T): void;
    /**
     * Returns a child at given index from this Container's child list.
     *
     * @param { number } index - the index of the child to return
     * @returns { T | null } return the item specified by the index
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    get(index: number): T | null;
    /**
     * Clear all children.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    clear(): void;
    /**
     * Returns the number of items in the container.
     *
     * @returns { number } the number of the container
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    count(): number;
}
/**
 * Defines Node interface.
 *
 * @interface Node
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Node extends SceneResource {
    /**
     * position of the node.
     *
     * @type { Position3 }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    position: Position3;
    /**
     * Rotation of the node.
     *
     * @type { Quaternion }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    rotation: Quaternion;
    /**
     * Scale of the node.
     *
     * @type { Scale3 }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    scale: Scale3;
    /**
     * Visibility flag for the node.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    visible: boolean;
    /**
     * Type of the node.
     *
     * @type { NodeType }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly nodeType: NodeType;
    /**
     * Layer mask of the node.
     *
     * @type { LayerMask }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly layerMask: LayerMask;
    /**
     * Path of the node.
     *
     * @type { string }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly path: string;
    /**
     * Parent of the node.
     *
     * @type { Node | null }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly parent: Node | null;
    /**
     * Get node by path.
     *
     * @param { string } path - the path of the node queried
     * @returns { Node | null }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    getNodeByPath(path: string): Node | null;
    /**
     * Children of the node.
     *
     * @type { Container<Node> }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly children: Container<Node>;
}
/**
 * Defines Geometry interface.
 *
 * @interface Geometry
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Geometry extends Node {
    /**
     * Mesh of the node.
     *
     * @type { Mesh }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly mesh: Mesh;
}
/**
 * The enum of light type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export enum LightType {
    /**
     * Directional light.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    DIRECTIONAL = 1,
    /**
     * Spot light.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    SPOT = 2
}
/**
 * Defines light interface.
 *
 * @interface Light
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Light extends Node {
    /**
     * The type of the light.
     *
     * @type { LightType }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly lightType: LightType;
    /**
     * The color of the light.
     *
     * @type { Color }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    color: Color;
    /**
     * The intensity of the light.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    intensity: number;
    /**
     * Whether casting shadows.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    shadowEnabled: boolean;
    /**
     * Whether enable the light.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    enabled: boolean;
}
/**
 * Defines spot light.
 *
 * @interface SpotLight
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface SpotLight extends Light {
}
/**
 * Defines directional light.
 *
 * @interface DirectionalLight
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface DirectionalLight extends Light {
}
/**
 * Defines camera.
 *
 * @interface Camera
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Camera extends Node {
    /**
     * Field of view of the camera.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    fov: number;
    /**
     * Near plane of the directional light.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    nearPlane: number;
    /**
     * Far plane of the directional light.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    farPlane: number;
    /**
     * Whether enabled the camera.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    enabled: boolean;
    /**
     * The post processing settings of the camera.
     *
     * @type { PostProcessSettings | null }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    postProcess: PostProcessSettings | null;
    /**
     * Background clear color (environment background overrides this color,
     * BACKGROUND_NONE is needed for this to actually take effect).
     *
     * @type { Color | null }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    clearColor: Color | null;
}
