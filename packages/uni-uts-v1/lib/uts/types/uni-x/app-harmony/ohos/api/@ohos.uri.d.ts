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
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @throws { BusinessError } 10200002 - Invalid uri string.
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * URI constructor, which is used to instantiate a URI object.
         * uri: Constructs a URI by parsing a given string.
         *
         * @param { string } uri - uri uri
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @since 9
         */
        /**
         * Check whether this URI is equivalent to other URI objects.
         *
         * @param { URI } other - other other URI object to be compared
         * @returns { boolean } boolean Tests whether this URI is equivalent to other URI objects.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Check whether this URI is equivalent to other URI objects.
         *
         * @param { URI } other - other other URI object to be compared
         * @returns { boolean } boolean Tests whether this URI is equivalent to other URI objects.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
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
         * Searches the query string for the first value with the given key.
         *
         * @param { string } key - Given the first value of the key.
         * @returns { string } Return decoded value.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getQueryValue(key: string): string;
        /**
         * Encodes the key and value and then appends the result to the query string.
         *
         * @param { string } [key] - The key it will be encoded with.
         * @param { string } [value] - The value it will be encoded with.
         * @returns { URI } Return URI object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        addQueryValue(key: string, value: string): URI;
        /**
         * Returns a set of the unique names of all query parameters.
         *
         * @returns { string[] } Return a set of decoded names.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getQueryNames(): string[];
        /**
         * Searches the query string for parameter values with the given key.
         *
         * @param { string } key - The key it will be encoded with.
         * @returns { string[] } Return a set of decoded values.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getQueryValues(key: string): string[];
        /**
         * Searches the query string for the first value with the given key and interprets it as a boolean value.
         *
         * @param { string } key - Indicates the key value to be queried.
         * @param { boolean } defaultValue - The default value returned when the key has no query parameters.
         * @returns { boolean } Query with key value returns true, otherwise returns false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getBooleanQueryValue(key: string, defaultValue: boolean): boolean;
        /**
         * Clears the the previously set query.
         *
         * @returns { URI } After clearing, return the URI object.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        clearQuery(): URI;
        /**
         * Gets the decoded last path segment.
         *
         * @returns { string } Returns the last decoded segment, or null if the path is empty.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getLastSegment(): string;
        /**
         * Gets the decoded path segments.
         *
         * @returns { string[] } Return decoded path segments, each without a leading or trailing "/".
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSegment(): string[];
        /**
         * Encodes the given path segment and appends it to the path.
         *
         * @param { string } [pathSegment] - path segment to be added.
         * @returns { URI } After adding, return the URI object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        addSegment(pathSegment: string): URI;
        /**
         * Creates a new Uri by appending an already-encoded path segment to a base Uri.
         *
         * @param { string } pathSegment - Encoding path segment to be added.
         * @returns { URI } After adding, return the URI object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        addEncodedSegment(pathSegment: string): URI;
        /**
         * Determine whether URI is hierarchical.
         *
         * @returns { boolean } Return true as Hierarchical, otherwise return false.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        checkHierarchical(): boolean;
        /**
         * Determine whether URI is Opaque.
         *
         * @returns { boolean } Return true as Opaque, otherwise return false.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        checkOpaque(): boolean;
        /**
         * Determine whether URI is Relative.
         *
         * @returns { boolean } Return true as Relative, otherwise return false.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        checkRelative(): boolean;
        /**
         * Creates an opaque Uri from the given components.
         *
         * @param { string } scheme -  of the URI.
         * @param { string } ssp -scheme-specific-part, everything between the scheme separator (':') and the fragment
         * separator ('#'), which will get encoded.
         * @param { string } fragment - fragment, everything after the '#', null if undefined, will get encoded.
         * @returns { URI } Return Uri consisting of a given scheme, SSP, and fragment.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static createFromParts(scheme: string, ssp: string, fragment: string): URI;
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
        /**
         * Gets/Sets the protocol part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
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
        /**
         * Gets/Sets Obtains the user information part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
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
        /**
         * Gets/Sets the path portion of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
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
        /**
         * Gets/Sets the query portion of the URI
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
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
        /**
         * Gets/Sets the fragment part of the URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
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
        /**
         * Gets/Sets the decoding permission component part of this URI.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
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
        /**
         * Gets/Sets the decoding scheme-specific part of the URI.
         *
         * @type { string }
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ssp: string;
        /**
         * Gets/Sets Obtains the encoded user information part of the URI.
         *
         * @type { string }
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        encodedUserInfo: string;
        /**
         * Gets/Sets the encoded path portion of the URI.
         *
         * @type { string }
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        encodedPath: string;
        /**
         * Gets/Sets the encoded query component from this URI.
         *
         * @type { string }
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        encodedQuery: string;
        /**
         * Gets/Sets the encoded fragment part of this URI, everything after the '#'.
         *
         * @type { string }
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        encodedFragment: string;
        /**
         * Gets/Sets the encoded authority part of this URI.
         *
         * @type { string }
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        encodedAuthority: string;
        /**
         * Gets/Sets the scheme-specific part of this URI, i.e. everything between the scheme separator ':' and
         * the fragment separator '#'.
         *
         * @type { string }
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        encodedSSP: string;
    }
}
export default uri;
