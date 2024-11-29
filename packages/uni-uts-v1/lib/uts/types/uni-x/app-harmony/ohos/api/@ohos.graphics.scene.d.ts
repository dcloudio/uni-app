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
 * @file Export 3D interfaces
 * @kit ArkGraphics3D
 */
/**
 * Export post processing settings
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export { ToneMappingType, ToneMappingSettings, PostProcessSettings } from './graphics3d/ScenePostProcessSettings';
/**
 * Export scene types
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export { Vec2, Vec3, Vec4, Color, Rect, Quaternion, Aabb, Position3, Rotation3, Scale3 } from './graphics3d/SceneTypes';
/**
 * Export scene resources
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export { SceneResourceType, SceneResource, Shader, MaterialType, Material, ShaderMaterial, SubMesh, Mesh, Animation, EnvironmentBackgroundType, Environment, Image } from './graphics3d/SceneResources';
/**
 * Export scene nodes
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export { LayerMask, NodeType, Container, Node, Geometry, LightType, Light, SpotLight, DirectionalLight, Camera } from './graphics3d/SceneNodes';
/**
 * Export scene
 * @syscap SystemCapability.ArkUi.Graphics3D
 * @since 12
 */
export { SceneResourceParameters, SceneNodeParameters, SceneResourceFactory, Scene } from './graphics3d/Scene';
