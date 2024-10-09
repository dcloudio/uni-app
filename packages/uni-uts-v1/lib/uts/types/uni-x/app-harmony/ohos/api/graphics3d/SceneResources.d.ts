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
import { Vec2, Vec3, Vec4, Aabb } from './SceneTypes';
import { Callback } from '../@ohos.base';
/**
 * @file Defines 3D resource related interfaces
 * @kit ArkGraphics3D
 */
/**
 * The enum of SceneResource type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export enum SceneResourceType {
    /**
     * The resource is an Unknown.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    UNKNOWN = 0,
    /**
     * The resource is a Node.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    NODE = 1,
    /**
     * The resource is an Environment.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    ENVIRONMENT = 2,
    /**
     * The resource is a Material.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    MATERIAL = 3,
    /**
     * The resource is a Mesh.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    MESH = 4,
    /**
     * The resource is an Animation.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    ANIMATION = 5,
    /**
     * The resource is a Shader.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    SHADER = 6,
    /**
     * The resource is an Image.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    IMAGE = 7
}
/**
 * Define scene resource extended by other 3d resource.
 *
 * @interface SceneResource
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface SceneResource {
    /**
     * Scene resource name.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    name: string;
    /**
     * Scene resource type.
     *
     * @type { SceneResourceType }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly resourceType: SceneResourceType;
    /**
     * Scene resource uri.
     *
     * @type { ?Resource }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly uri?: Resource;
    /**
     * Release scene resource.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    destroy(): void;
}
/**
 * Shader resource.
 *
 * @interface Shader
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Shader extends SceneResource {
    /**
     * Shader inputs.
     *
     * @type { Record<string, number | Vec2 | Vec3 | Vec4 | Image> }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly inputs: Record<string, number | Vec2 | Vec3 | Vec4 | Image>;
}
/**
 * The enum of material type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export enum MaterialType {
    /**
     * The material type is a Shader.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    SHADER = 1
}
/**
 * Material resource.
 *
 * @interface Material
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Material extends SceneResource {
    /**
     * Material resource type.
     *
     * @type { MaterialType }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly materialType: MaterialType;
}
/**
 * Shader material resource.
 *
 * @interface ShaderMaterial
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface ShaderMaterial extends Material {
    /**
     * Color shader of material.
     *
     * @type { ?Shader }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    colorShader?: Shader;
}
/**
 * Sub mesh resource.
 *
 * @interface SubMesh
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface SubMesh {
    /**
     * The name of the sub mesh.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    name: string;
    /**
     * The material of the sub mesh.
     *
     * @type { Material }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    material: Material;
    /**
     * The axis aligned bounding box of the sub mesh.
     *
     * @type { Aabb }
     * readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly aabb: Aabb;
}
/**
 * Mesh resource.
 *
 * @interface Mesh
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Mesh extends SceneResource {
    /**
     * The sub meshes of the mesh.
     *
     * @type { SubMesh[] }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly subMeshes: SubMesh[];
    /**
     * The axis aligned bounding box of the mesh.
     *
     * @type { Aabb }
     * readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly aabb: Aabb;
    /**
     * The material override sub mesh's material.
     *
     * @type { ?Material }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    materialOverride?: Material;
}
/**
 * Animation resource.
 *
 * @interface Animation
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Animation extends SceneResource {
    /**
     * The animation is enabled.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    enabled: boolean;
    /**
     * The duration of the animation.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly duration: number;
    /**
     * Whether the animation is running.
     *
     * @type { boolean }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly running: boolean;
    /**
     * The progress of the animation between 0~1.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly progress: number;
    /**
     * Register a callback when animation finished.
     *
     * @param { Callback<void> } callback - the callback invoked when animation finished
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    onFinished(callback: Callback<void>): void;
    /**
     * Register a callback when animation started.
     *
     * @param { Callback<void> } callback - the callback invoked when animation started
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    onStarted(callback: Callback<void>): void;
    /**
     * Pause the animation.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    pause(): void;
    /**
     * Restart the animation.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    restart(): void;
    /**
     * Seek the animation to the position.
     *
     * @param { number } position - the position seek between 0~1
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    seek(position: number): void;
    /**
     * Start the animation.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    start(): void;
    /**
     * Stop the animation and seek the position to the beginning.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    stop(): void;
    /**
     * Finish the animation and seek the position to the end.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    finish(): void;
}
/**
 * The enum of environment background type.
 * @enum { number }
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export enum EnvironmentBackgroundType {
    /**
     * The background is none.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    BACKGROUND_NONE = 0,
    /**
     * The background is image.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    BACKGROUND_IMAGE = 1,
    /**
     * The background is cubemap.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    BACKGROUND_CUBEMAP = 2,
    /**
     * The background is equirectangular.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    BACKGROUND_EQUIRECTANGULAR = 3
}
/**
 * Environment resource.
 *
 * @interface Environment
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Environment extends SceneResource {
    /**
     * The background type of the environment.
     *
     * @type { EnvironmentBackgroundType }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    backgroundType: EnvironmentBackgroundType;
    /**
     * The indirect diffuse factor of the environment.
     *
     * @type { Vec4 }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    indirectDiffuseFactor: Vec4;
    /**
     * The indirect specular factor of the environment.
     *
     * @type { Vec4 }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    indirectSpecularFactor: Vec4;
    /**
     * The environment map factor of the environment.
     *
     * @type { Vec4 }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    environmentMapFactor: Vec4;
    /**
     * The environment image of the environment.
     *
     * @type { ?(Image | null) }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    environmentImage?: Image | null;
    /**
     * The radiance image of the environment.
     *
     * @type { ?(Image | null) }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    radianceImage?: Image | null;
    /**
     * The irradiance coefficients (array of nine Vec3).
     *
     * @type { ?Vec3[] }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    irradianceCoefficients?: Vec3[];
}
/**
 * Image resource.
 *
 * @interface Image
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface Image extends SceneResource {
    /**
     * The width of the image.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly width: number;
    /**
     * The height of the image.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly height: number;
}
