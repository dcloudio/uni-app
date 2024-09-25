/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * @kit BasicServicesKit
 */
/**
 * Defines the basic callback.
 * @typedef Callback
 * @syscap SystemCapability.Base
 * @since 6
 */
/**
 * Defines the basic callback.
 * @typedef Callback
 * @syscap SystemCapability.Base
 * @crossplatform
 * @since 10
 */
/**
 * Defines the basic callback.
 * @typedef Callback
 * @syscap SystemCapability.Base
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 * Defines the basic callback.
 * @typedef Callback
 * @syscap SystemCapability.Base
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
export interface Callback<T> {
    /**
     * Defines the callback info.
     * @param { T } data
     * @syscap SystemCapability.Base
     * @since 6
     */
    /**
     * Defines the callback info.
     * @param { T } data
     * @syscap SystemCapability.Base
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the callback info.
     * @param { T } data
     * @syscap SystemCapability.Base
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Defines the callback info.
     * @param { T } data
     * @syscap SystemCapability.Base
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    (data: T): void;
}
/**
 * Defines the basic error callback.
 * @typedef ErrorCallback
 * @syscap SystemCapability.Base
 * @since 6
 */
/**
 * Defines the basic error callback.
 * @typedef ErrorCallback
 * @syscap SystemCapability.Base
 * @crossplatform
 * @since 10
 */
/**
 * Defines the basic error callback.
 * @typedef ErrorCallback
 * @syscap SystemCapability.Base
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface ErrorCallback<T extends Error = BusinessError> {
    /**
     * Defines the basic error callback.
     * @param { T } err
     * @syscap SystemCapability.Base
     * @since 6
     */
    /**
     * Defines the basic error callback.
     * @param { T } err
     * @syscap SystemCapability.Base
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the basic error callback.
     * @param { T } err
     * @syscap SystemCapability.Base
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (err: T): void;
}
/**
 * Defines the basic async callback.
 * @typedef AsyncCallback
 * @syscap SystemCapability.Base
 * @since 6
 */
/**
 * Defines the basic async callback.
 * @typedef AsyncCallback
 * @syscap SystemCapability.Base
 * @crossplatform
 * @since 10
 */
/**
 * Defines the basic async callback.
 * @typedef AsyncCallback
 * @syscap SystemCapability.Base
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 * Defines the basic async callback.
 * @typedef AsyncCallback
 * @syscap SystemCapability.Base
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
export interface AsyncCallback<T, E = void> {
    /**
     * Defines the callback data.
     * @param { BusinessError<E> } err
     * @param { T } data
     * @syscap SystemCapability.Base
     * @since 6
     */
    /**
     * Defines the callback data.
     * @param { BusinessError<E> } err
     * @param { T } data
     * @syscap SystemCapability.Base
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the callback data.
     * @param { BusinessError<E> } err
     * @param { T } data
     * @syscap SystemCapability.Base
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Defines the callback data.
     * @param { BusinessError<E> } err
     * @param { T } data
     * @syscap SystemCapability.Base
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    (err: BusinessError<E>, data: T): void;
}
/**
 * Defines the error interface.
 * @typedef BusinessError
 * @syscap SystemCapability.Base
 * @since 6
 */
/**
 * Defines the error interface.
 * @typedef BusinessError
 * @syscap SystemCapability.Base
 * @crossplatform
 * @since 10
 */
/**
 * Defines the error interface.
 * @typedef BusinessError
 * @syscap SystemCapability.Base
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 * Defines the error interface.
 * @typedef BusinessError
 * @syscap SystemCapability.Base
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
export interface BusinessError<T = void> extends Error {
    /**
     * Defines the basic error code.
     * @type { number } code
     * @syscap SystemCapability.Base
     * @since 6
     */
    /**
     * Defines the basic error code.
     * @type { number } code
     * @syscap SystemCapability.Base
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the basic error code.
     * @type { number } code
     * @syscap SystemCapability.Base
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Defines the basic error code.
     * @type { number } code
     * @syscap SystemCapability.Base
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    code: number;
    /**
     * Defines the additional information for business
     * @type { ?T } data
     * @syscap SystemCapability.Base
     * @since 9
     */
    /**
     * Defines the additional information for business
     * @type { ?T } data
     * @syscap SystemCapability.Base
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the additional information for business
     * @type { ?T } data
     * @syscap SystemCapability.Base
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Defines the additional information for business
     * @type { ?T } data
     * @syscap SystemCapability.Base
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    data?: T;
}
