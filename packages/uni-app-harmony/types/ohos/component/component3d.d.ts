/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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
 * @file Defines 3D component
 * @kit ArkUI
 */
/**
 * Provides methods for controlling the 3d scene
 *
 * @typedef { import('../api/@ohos.graphics.scene').Scene }
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
declare type Scene = import('../api/@ohos.graphics.scene').Scene;
/**
 * The enum of model type
 * @enum { number }
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
declare enum ModelType {
    /**
     * Render to texture, gpu would compose this texture to screen.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    TEXTURE = 0,
    /**
     * Render to surface, special hardware would compose this surface to screen.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    SURFACE = 1
}
/**
 * Scene options used by 3D scene control
 *
 * @interface SceneOptions
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
declare interface SceneOptions {
    /**
     * Resource type for 3D rendering, Scene type for 3d scene controlling
     *
     * @type { ?(Resource | Scene) }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    scene?: Resource | Scene;
    /**
     * Scene type when 3D rendering
     *
     * @type { ?ModelType }
     * @default ModelType.SURFACE
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    modelType?: ModelType;
}
/**
 * Defines Component3D.
 *
 * @interface Component3DInterface
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
interface Component3DInterface {
    /**
     * SceneOptions used by constructor
     *
     * @param { SceneOptions } sceneOptions - The 3D scene controller
     * @returns { Component3DAttribute }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    (sceneOptions?: SceneOptions): Component3DAttribute;
}
/**
 * @extends CommonMethod<Component3DAttribute>
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
declare class Component3DAttribute extends CommonMethod<Component3DAttribute> {
    /**
     * Load 3D model environment resource.
     *
     * @param { Resource } uri - The path of 3D environment resource
     * @returns { Component3DAttribute } The attribute of the component3D
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    environment(uri: Resource): Component3DAttribute;
    /**
     * Set render pipeline of 3D scene render.
     *
     * @param { Resource } uri - The path of Render pipeline config file
     * @param { boolean } selfRenderUpdate - Trigger rendering every frame
     * @returns { Component3DAttribute } The attribute of the component3D
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    customRender(uri: Resource, selfRenderUpdate: boolean): Component3DAttribute;
    /**
     * Load shader uri.
     *
     * @param { Resource } uri - The path of custom shader
     * @returns { Component3DAttribute } The attribute of the component3D
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    shader(uri: Resource): Component3DAttribute;
    /**
     * Load shader texture uri.
     *
     * @param { Resource } uri - The path of texture used by shader
     * @returns { Component3DAttribute } The attribute of the component3D
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    shaderImageTexture(uri: Resource): Component3DAttribute;
    /**
     * Buffer input for shader animation
     *
     * @param { Array<number> } buffer - The uniform buffer of shader input
     * @returns { Component3DAttribute } The attribute of the component3D
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    shaderInputBuffer(buffer: Array<number>): Component3DAttribute;
    /**
     * Set render width resolution.
     *
     * @param { Dimension } value - Width of gpu render target, target would upscale or downscale to view's width.
     * @returns { Component3DAttribute } The attribute of the component3D
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    renderWidth(value: Dimension): Component3DAttribute;
    /**
     * Set render height resolution.
     *
     * @param { Dimension } value - Height of gpu render target, target would upscale or downscale to view's height.
     * @returns { Component3DAttribute } The attribute of the component3D
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    renderHeight(value: Dimension): Component3DAttribute;
}
/**
 * Defines Component3D component.
 *
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
declare const Component3D: Component3DInterface;
/**
 * Defines Component3D instance.
 *
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
declare const Component3DInstance: Component3DAttribute;
