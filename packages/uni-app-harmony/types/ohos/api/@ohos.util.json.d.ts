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
 * @kit ArkTS
 */

/**
 * JSON is a syntax for serializing objects, arrays, numbers, strings, booleans, and null.
 *
 * @namespace json
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @since 12
 */
declare namespace json {
  /**
   * The type of conversion result function.
   *
   * @typedef { function } Transformer
   * @param { Object } this - The object to which the parsed key value pair belongs.
   * @param { string } key - Attribute name.
   * @param { Object } value - The value of the parsed key value pair.
   * @returns { Object | undefined | null } Return the modified object or undefined or null.
   * @syscap SystemCapability.Utils.Lang
   * @since 12
   */
  type Transformer = (this: Object, key: string, value: Object) => Object | undefined | null

  /**
   * Converts a JavaScript Object Notation (JSON) string into an Object or null.
   *
   * @param { string } text - A valid JSON string.
   * @param { Transformer } [reviver] - A function that transforms the results.
   * @returns { Object | null } Return an Object, array, string, number, boolean, or null value corresponding to JSON text.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @since 12
   */
  function parse(text: string, reviver?: Transformer): Object | null;

  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   *
   * @param { Object } value - A JavaScript value, usually an Object or array.
   * @param { (number | string)[] | null } [replacer] - An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringify.
   * @param { string | number } [space] - Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   * @returns { string } Return a JSON text.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @since 12
   */
  function stringify(value: Object, replacer?: (number | string)[] | null, space?: string | number): string

  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   *
   * @param { Object } value - A JavaScript value, usually an Object or array.
   * @param { Transformer } [replacer] - A function that transforms the results.
   * @param { string | number } [space] - Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   * @returns { string } Return a JSON text.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @since 12
   */
  function stringify(value: Object, replacer?: Transformer, space?: string | number): string;

  /**
   * Checks whether the object parsed from a JSON string contains the property.
   *
   * @param { object } obj - The object parsed from a JSON string.
   * @param { string } property - Determine whether the object contains the property.
   * @returns { boolean } Return true if the key is in the object, otherwise return false.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @since 12
   */
  function has(obj: object, property: string): boolean;

  /**
   * Removes a property from the object parsed from a JSON string.
   *
   * @param { object } obj - The object parsed from a JSON string.
   * @param { string } property - The property to be removed.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @since 12
   */
  function remove(obj: object, property: string): void;
}
export default json;