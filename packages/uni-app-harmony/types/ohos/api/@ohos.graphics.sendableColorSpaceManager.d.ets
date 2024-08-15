/*
* Copyright (C) 2024 Huawei Device Co., Ltd.
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
 * @kit ArkGraphics2D
 */
import lang from '../arkts/@arkts.lang';
import collections from '../arkts/@arkts.collections';
import colorSpaceManager from '@ohos.graphics.colorSpaceManager';
/**
 * Color space manager.
 *
 * @namespace sendableColorSpaceManager
 * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
 * @crossplatform
 * @since 12
 */
declare namespace sendableColorSpaceManager {
    /**
     * Redefines ISendable for convenience.
     *
     * @typedef { lang.ISendable } ISendable
     * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
     * @crossplatform
     * @since 12
     */
    type ISendable = lang.ISendable;
    /**
     * Defines a color space object and manages its key information
     * @interface ColorSpaceManager
     * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
     * @crossplatform
     * @since 12
     */
    interface ColorSpaceManager extends ISendable {
        /**
         * Get the name of color space type.
         * @returns { colorSpaceManager.ColorSpace } Returns the name of color space type.
         * @throws { BusinessError } 18600001 - Parameter value is abnormal.
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @crossplatform
         * @since 12
         */
        getColorSpaceName(): colorSpaceManager.ColorSpace;
        /**
         * Get white point(x, y) of color space.
         * @returns { collections.Array<number> } Returns the white point value of color space.
         * @throws { BusinessError } 18600001 - Parameter value is abnormal.
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @crossplatform
         * @since 12
         */
        getWhitePoint(): collections.Array<number>;
        /**
         * Get gamma value of color space.
         * @returns { number } Returns the gamma value of color space.
         * @throws { BusinessError } 18600001 - Parameter value is abnormal.
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @crossplatform
         * @since 12
         */
        getGamma(): number;
    }
    /**
     * Create a color space manager by provided color space type.
     * @param { colorSpaceManager.ColorSpace } colorSpaceName - Indicates the type of color space
     * @returns { ColorSpaceManager } Returns a color space manager object created by provided type.
     * @throws { BusinessError } 401 - Parameter error. Possible cause: 1.Incorrect parameter type.
     *                                 2.Parameter verification failed.
     * @throws { BusinessError } 18600001 - Parameter value is abnormal.
     * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
     * @crossplatform
     * @since 12
     */
    function create(colorSpaceName: colorSpaceManager.ColorSpace): ColorSpaceManager;
    /**
     * Create a customized color space manager by its color primaries and gamma value
     * @param { colorSpaceManager.ColorSpacePrimaries } primaries - Indicates the customized color primaries
     * @param { number } gamma - Indicates display gamma value
     * @returns { ColorSpaceManager } Returns a color space manager object created by customized parameters.
     * @throws { BusinessError } 401 - Parameter error. Possible cause: 1.Incorrect parameter type.
     *                                 2.Parameter verification failed.
     * @throws { BusinessError } 18600001 - Parameter value is abnormal.
     * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
     * @crossplatform
     * @since 12
     */
    function create(primaries: colorSpaceManager.ColorSpacePrimaries, gamma: number): ColorSpaceManager;
}
export default sendableColorSpaceManager;
