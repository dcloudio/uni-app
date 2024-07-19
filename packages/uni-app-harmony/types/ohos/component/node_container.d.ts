/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * Defines the Interface of NodeContainer. To display the node build by an associated NodeController.
 *
 * @interface NodeContainerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines the Interface of NodeContainer. To display the node build by an associated NodeController.
 *
 * @interface NodeContainerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
interface NodeContainerInterface {
    /**
    * Constructor parameters
    *
    * @param { import('../api/@ohos.arkui.node').NodeController } controller - Indicates the controller of the NodeContainer.
    * @returns { NodeContainerAttribute }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @since 11
    */
    /**
     * Constructor parameters
     *
     * @param { import('../api/@ohos.arkui.node').NodeController } controller - Indicates the controller of the NodeContainer.
     * @returns { NodeContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    (controller: import('../api/@ohos.arkui.node').NodeController): NodeContainerAttribute;
}
/**
 * Defines the attribute of NodeContainer, extends from CommonMethod.
 * @extends CommonMethod<NodeContainerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines the attribute of NodeContainer, extends from CommonMethod.
 * @extends CommonMethod<NodeContainerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare class NodeContainerAttribute extends CommonMethod<NodeContainerAttribute> {
}
/**
 * Defines NodeContainer Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines NodeContainer Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare const NodeContainer: NodeContainerInterface;
/**
 * Defines NodeContainer Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines NodeContainer Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare const NodeContainerInstance: NodeContainerAttribute;
