/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit ArkTS
 */
/**
 * The uri module provides utilities for URI resolution and parsing.
 *
 * @namespace uri
 * @syscap SystemCapability.Utils.Lang
 * @since 8
 */
/**
 * The uri module provides utilities for URI resolution and parsing.
 *
 * @namespace uri
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @since 10
 */
/**
 * The uri module provides utilities for URI resolution and parsing.
 *
 * @namespace uri
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace uri {
    /**
     * URI Represents a Uniform Resource Identifier (URI) reference.
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @name URI
     */
    /**
     * URI Represents a Uniform Resource Identifier (URI) reference.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     * @name URI
     */
    /**
     * URI Represents a Uniform Resource Identifier (URI) reference.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     * @name URI
     */
    class URI {
        /**
         * URI constructor, which is used to instantiate a URI object.
         * uri: Constructs a URI by parsing a given string.
         *
         * @param { string } uri - uri uri
         * @throws { BusinessError } 401 - if the input parameters are invalid.
         * @throws { BusinessError } 10200002 - Invalid uri string.
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * URI constructor, which is used to instantiate a URI object.
         * uri: Constructs a URI by parsing a given string.
         *
         * @param { string } uri - uri uri
         * @throws { BusinessError } 401 - if the input parameters are invalid.
         * @throws { BusinessError } 10200002 - Invalid uri string.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * URI constructor, which is used to instantiate a URI object.
         * uri: Constructs a URI by parsing a given string.
         *
         * @param { string } uri - uri uri
         * @throws { BusinessError } 401 - if the input parameters are invalid.
         * @throws { BusinessError } 10200002 - Invalid uri string.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        constructor(uri: string);
        /**
         * Returns the serialized URI as a string.
         *
         * @returns { string } Returns the serialized URI as a string.
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Returns the serialized URI as a string.
         *
         * @returns { string } Returns the serialized URI as a string.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Returns the serialized URI as a string.
         *
         * @returns { string } Returns the serialized URI as a string.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        toString(): string;
        /**
         * Check whether this URI is equivalent to other URI objects.
         *
         * @param { URI } other - other other URI object to be compared
         * @returns { boolean } boolean Tests whether this URI is equivalent to other URI objects.
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.uri.URI.equalsTo
         */
        equals(other: URI): boolean;
        /**
         * Check whether this URI is equivalent to other URI objects.
         *
         * @param { URI } other - other other URI object to be compared
         * @returns { boolean } boolean Tests whether this URI is equivalent to other URI objects.
         * @throws { BusinessError } 401 - The type of other must be URI.
         * @syscap SystemCapability.Utils.Lang
         * @since 9
         */
        /**
         * Check whether this URI is equivalent to other URI objects.
         *
         * @param { URI } other - other other URI object to be compared
         * @returns { boolean } boolean Tests whether this URI is equivalent to other URI objects.
         * @throws { BusinessError } 401 - The type of other must be URI.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Check whether this URI is equivalent to other URI objects.
         *
         * @param { URI } other - other other URI object to be compared
         * @returns { boolean } boolean Tests whether this URI is equivalent to other URI objects.
         * @throws { BusinessError } 401 - The type of other must be URI.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        equalsTo(other: URI): boolean;
        /**
         * Indicates whether this URI is an absolute URI.
         *
         * @returns { boolean } boolean Indicates whether the URI is an absolute URI (whether the scheme component is defined).
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Indicates whether this URI is an absolute URI.
         *
         * @returns { boolean } boolean Indicates whether the URI is an absolute URI (whether the scheme component is defined).
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates whether this URI is an absolute URI.
         *
         * @returns { boolean } boolean Indicates whether the URI is an absolute URI (whether the scheme component is defined).
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        checkIsAbsolute(): boolean;
        /**
         * Normalize the path of this URI, It is not safe to call the normalize interface with URI.
         *
         * @returns { URI } URI Used to normalize the path of this URI and return a URI object whose path has been normalized.
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Normalize the path of this URI, It is not safe to call the normalize interface with URI.
         *
         * @returns { URI } URI Used to normalize the path of this URI and return a URI object whose path has been normalized.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Normalize the path of this URI, It is not safe to call the normalize interface with URI.
         *
         * @returns { URI } URI Used to normalize the path of this URI and return a URI object whose path has been normalized.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        normalize(): URI;
        /**
         * Gets the protocol part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Gets the protocol part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Gets the protocol part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        scheme: string;
        /**
         * Obtains the user information part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Obtains the user information part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the user information part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        userInfo: string;
        /**
         * Gets the hostname portion of the URI without a port.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Gets the hostname portion of the URI without a port.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Gets the hostname portion of the URI without a port.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        host: string;
        /**
         * Gets the port portion of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Gets the port portion of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Gets the port portion of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        port: string;
        /**
         * Gets the path portion of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Gets the path portion of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Gets the path portion of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        path: string;
        /**
         * Gets the query portion of the URI
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Gets the query portion of the URI
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Gets the query portion of the URI
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        query: string;
        /**
         * Gets the fragment part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Gets the fragment part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Gets the fragment part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        fragment: string;
        /**
         * Gets the decoding permission component part of this URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Gets the decoding permission component part of this URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Gets the decoding permission component part of this URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        authority: string;
        /**
         * Gets the decoding scheme-specific part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Gets the decoding scheme-specific part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Gets the decoding scheme-specific part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ssp: string;
    }
}
export default uri;
