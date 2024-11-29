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
 * @file Defines a modifier which can update attributes to native side.
 * @kit ArkUI
 */
/**
 * function that returns a default param of AttributeUpdater.
 *
 * @typedef { function } Initializer<T>
 * @returns { T }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare type Initializer<T> = () => T;
/**
 * Defines a modifier which can update attributes to native side.
 *
 * @implements AttributeModifier
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export declare class AttributeUpdater<T, C = Initializer<T>> implements AttributeModifier<T> {
    /**
     * Defines the normal update attribute function.
     *
     * @param { T } instance
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    applyNormalAttribute?(instance: T): void;
    /**
     * Defines a function for initialization.
     *
     * @param { T } instance
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    initializeModifier(instance: T): void;
    /**
     * Get attribute of the modifier.
     *
     * @returns { T | undefined } The attribute of the modifier.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    get attribute(): T | undefined;
    /**
     * Used to update constructor params.
     *
     * @type { C }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    updateConstructorParams: C;
    /**
     * Defines a function executed when component changed.
     *
     * @param { T } component
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onComponentChanged(component: T): void;
}
