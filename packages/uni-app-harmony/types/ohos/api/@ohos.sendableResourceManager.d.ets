/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * @kit LocalizationKit
 */
import { Resource as _Resource } from './global/resource';
import { SendableResource as _SendableResource } from './global/sendableResource';
/**
 * Provides sendable resource related APIs.
 *
 * @namespace sendableResourceManager
 * @syscap SystemCapability.Global.ResourceManager
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace sendableResourceManager {
    /**
     * Convert the resource object to a sendable resource object.
     *
     * @param { Resource } resource - The resource object.
     * @returns { SendableResource } The sendable resource object is returned.
     * @throws { BusinessError } 401 - If the input parameter invalid. Possible causes: 1.Incorrect parameter types;
     *                         2.Parameter verification failed.
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function resourceToSendableResource(resource: Resource): SendableResource;
    /**
     * Convert the sendable resource object to a resource object.
     *
     * @param { SendableResource } resource - The sendable resource object.
     * @returns { Resource } The resource object is returned.
     * @throws { BusinessError } 401 - If the input parameter invalid. Possible causes: 1.Incorrect parameter types;
     *                         2.Parameter verification failed.
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function sendableResourceToResource(resource: SendableResource): Resource;
    /**
     * Contains resource descriptor information.
     *
     * @typedef {_Resource}
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export type Resource = _Resource;
    /**
     * Contains sendable resource descriptor information.
     *
     * @typedef {_SendableResource}
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export type SendableResource = _SendableResource;
}
export default sendableResourceManager;
