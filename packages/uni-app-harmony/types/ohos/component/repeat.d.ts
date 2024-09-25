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
 * Construct a new type for each item.
 *
 * @interface RepeatItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 * @form
 */
interface RepeatItem<T> {
    /**
     * The origin data.
     *
     * @type { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     * @form
     */
    item: T;
    /**
     * index of each item.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     * @form
     */
    index?: number;
}
/**
 * Defines the Repeat component attribute functions.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 * @form
 */
declare class RepeatAttribute<T> {
    /**
     * Executes itemGenerator of each item.
     *
     * @param { function } itemGenerator
     * @returns { RepeatAttribute<T> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     * @form
     */
    each(itemGenerator: (repeatItem: RepeatItem<T>) => void): RepeatAttribute<T>;
    /**
     * Obtains key of each item.
     *
     * @param { function } keyGenerator
     * @returns { RepeatAttribute<T> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     * @form
     */
    key(keyGenerator: (item: T, index: number) => string): RepeatAttribute<T>;
}
/**
 * Defines Repeat Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 * @form
 */
declare const Repeat: <T>(arr: Array<T>) => RepeatAttribute<T>;
