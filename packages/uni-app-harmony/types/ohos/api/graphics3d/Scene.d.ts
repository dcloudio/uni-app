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
 * @file Defines 3D scene related interfaces
 * @kit ArkGraphics3D
 */
import { Shader, MaterialType, Material, Animation, Environment, Image } from './SceneResources';
import { Camera, LightType, Light, Node, NodeType } from './SceneNodes';
/**
 * The scene resource parameters type.
 *
 * @typedef SceneResourceParameters
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface SceneResourceParameters {
    /**
     * The name of the scene resource parameters.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    name: string;
    /**
     * The resource uri of the scene resource parameters.
     *
     * @type { ?Resource }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    uri?: Resource;
}
/**
 * The scene node parameters type.
 *
 * @typedef SceneNodeParameters
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface SceneNodeParameters {
    /**
     * The name of the scene node parameters.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    name: string;
    /**
     * The path of the scene node parameters.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    path?: string;
}
/**
 * The scene resource factory.
 *
 * @interface SceneResourceFactory
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export interface SceneResourceFactory {
    /**
     * Create a camera.
     *
     * @param { SceneNodeParameters } params - the param of creating a camera
     * @returns { Promise<Camera> } promise a camera
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    createCamera(params: SceneNodeParameters): Promise<Camera>;
    /**
     * Create a light.
     *
     * @param { SceneNodeParameters } params - the param of creating a light
     * @param { LightType } lightType - the type of the light
     * @returns { Promise<Light> } promise a light
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    createLight(params: SceneNodeParameters, lightType: LightType): Promise<Light>;
    /**
     * Create a node.
     *
     * @param { SceneNodeParameters } params - the param of creating a node
     * @returns { Promise<Node> } promise a node
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    createNode(params: SceneNodeParameters): Promise<Node>;
    /**
     * Create a material.
     *
     * @param { SceneResourceParameters } params - the param of creating a material
     * @param { MaterialType } materialType - the type of the material
     * @returns { Promise<Material> } promise a material
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    createMaterial(params: SceneResourceParameters, materialType: MaterialType): Promise<Material>;
    /**
     * Create a shader.
     *
     * @param { SceneResourceParameters } params - the param of creating a shader
     * @returns { Promise<Shader> } promise a shader
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    createShader(params: SceneResourceParameters): Promise<Shader>;
    /**
     * Create a image.
     *
     * @param { SceneResourceParameters } params - the param of creating a image
     * @returns { Promise<Image> } promise a image
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    createImage(params: SceneResourceParameters): Promise<Image>;
    /**
     * Create a environment.
     *
     * @param { SceneResourceParameters } params - the param of creating a Environment object
     * @returns { Promise<Environment> } promise a Environment
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    createEnvironment(params: SceneResourceParameters): Promise<Environment>;
}
/**
 * Defines the 3d scene.
 *
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export class Scene {
    /**
     * Create a new scene from a Resource.
     *
     * @param { Resource } uri - the resource of creating a scene
     * @returns { Promise<Scene> } promise a scene
     * @static
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    static load(uri?: Resource): Promise<Scene>;
    /**
     * The environment of the scene.
     *
     * @type { Environment }
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    environment: Environment;
    /**
     * The animations of the scene.
     *
     * @type { Animation[] }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly animations: Animation[];
    /**
     * The root node of the scene.
     *
     * @type { Node | null }
     * @readonly
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    readonly root: Node | null;
    /**
     * Get a node by path.
     *
     * @param { string } path - the path of the node
     * @param { NodeType } type - verify the type of node, if it does not match, return null
     * @returns { Node | null } if the node is found by it's path
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    getNodeByPath(path: string, type?: NodeType): Node | null;
    /**
     * Get resource factory.
     *
     * @returns { SceneResourceFactory } if the node is found by it's path
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    getResourceFactory(): SceneResourceFactory;
    /**
     * Release all native scene resources. All TS references will be undefined.
     *
     * @syscap SystemCapability.ArkUi.Graphics3D
     * @since 12
     */
    destroy(): void;
}
