/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
 * The convertxml module provides utilities for converting XML text to Javascript object.
 *
 * @namespace xml
 * @syscap SystemCapability.Utils.Lang
 * @since 8
 */
/**
 * The convertxml module provides utilities for converting XML text to Javascript object.
 *
 * @namespace xml
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @since 10
 */
/**
 * The convertxml module provides utilities for converting XML text to Javascript object.
 *
 * @namespace xml
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace xml {
    /**
     * The options for conversion.
     *
     * @interface ConvertOptions
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * The options for conversion.
     *
     * @interface ConvertOptions
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * The options for conversion.
     *
     * @interface ConvertOptions
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface ConvertOptions {
        /**
         * Whether to trim whitespace characters that may exist before and after the text, default false.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Whether to trim whitespace characters that may exist before and after the text, default false.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Whether to trim whitespace characters that may exist before and after the text, default false.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        trim: boolean;
        /**
         * Whether to ignore writing declaration directives of xml.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Whether to ignore writing declaration directives of xml.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Whether to ignore writing declaration directives of xml.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ignoreDeclaration?: boolean;
        /**
         * Whether to ignore writing processing instruction of xml.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Whether to ignore writing processing instruction of xml.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Whether to ignore writing processing instruction of xml.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ignoreInstruction?: boolean;
        /**
         * Whether to print attributes across multiple lines and indent them.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Whether to print attributes across multiple lines and indent them.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Whether to print attributes across multiple lines and indent them.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ignoreAttributes?: boolean;
        /**
         * Whether to ignore writing comments of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Whether to ignore writing comments of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Whether to ignore writing comments of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ignoreComment?: boolean;
        /**
         * Whether to ignore writing CDATA of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Whether to ignore writing CDATA of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Whether to ignore writing CDATA of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ignoreCDATA?: boolean;
        /**
         * Whether to ignore writing Doctype of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Whether to ignore writing Doctype of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Whether to ignore writing Doctype of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ignoreDoctype?: boolean;
        /**
         * Whether to ignore writing texts of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Whether to ignore writing texts of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Whether to ignore writing texts of the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ignoreText?: boolean;
        /**
         * Name of the property key which will be used for the declaration.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the declaration.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the declaration.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        declarationKey: string;
        /**
         * Name of the property key which will be used for the processing instruction.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the processing instruction.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the processing instruction.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        instructionKey: string;
        /**
         * Name of the property key which will be used for the attributes.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the attributes.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the attributes.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        attributesKey: string;
        /**
         * Name of the property key which will be used for the text.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the text.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the text.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        textKey: string;
        /**
         * Name of the property key which will be used for the cdata.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the cdata.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the cdata.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        cdataKey: string;
        /**
         * Name of the property key which will be used for the doctype.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the doctype.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the doctype.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        doctypeKey: string;
        /**
         * Name of the property key which will be used for the comment.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the comment.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the comment.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        commentKey: string;
        /**
         * Name of the property key which will be used for the parent.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the parent.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the parent.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        parentKey: string;
        /**
         * Name of the property key which will be used for the type.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the type.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the type.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        typeKey: string;
        /**
         * Name of the property key which will be used for the name.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the name.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the name.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        nameKey: string;
        /**
         * Name of the property key which will be used for the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         */
        /**
         * Name of the property key which will be used for the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the property key which will be used for the elements.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        elementsKey: string;
    }
    /**
     * ConvertXML representation refers to extensible markup language.
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @name ConvertXML
     */
    /**
     * ConvertXML representation refers to extensible markup language.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     * @name ConvertXML
     */
    /**
     * ConvertXML representation refers to extensible markup language.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    class ConvertXML {
        /**
         * To convert XML text to JavaScript object.
         *
         * @param { string } xml - xml xml The xml text to be converted.
         * @param { ConvertOptions } options - options option Option Inputted by user to set.
         * @returns { Object } Returns a JavaScript object converting from XML text.
         * @syscap SystemCapability.Utils.Lang
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.convertxml.ConvertXML.convertToJSObject
         */
        convert(xml: string, options?: ConvertOptions): Object;
        /**
         * To convert XML text to JavaScript object.
         *
         * @param { string } xml - xml xml The xml text to be converted.
         * @param { ConvertOptions } [options] - options option Option Inputted by user to set.
         * @returns { Object } Returns a JavaScript object converting from XML text.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 10200002 - Invalid xml string.
         * @syscap SystemCapability.Utils.Lang
         * @since 9
         */
        /**
         * To convert XML text to JavaScript object.
         *
         * @param { string } xml - xml xml The xml text to be converted.
         * @param { ConvertOptions } [options] - options option Option Inputted by user to set.
         * @returns { Object } Returns a JavaScript object converting from XML text.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 10200002 - Invalid xml string.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * To convert XML text to JavaScript object.
         *
         * @param { string } xml - xml xml The xml text to be converted.
         * @param { ConvertOptions } [options] - options option Option Inputted by user to set.
         * @returns { Object } Returns a JavaScript object converting from XML text.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @throws { BusinessError } 10200002 - Invalid xml string.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        convertToJSObject(xml: string, options?: ConvertOptions): Object;
    }
}
export default xml;
