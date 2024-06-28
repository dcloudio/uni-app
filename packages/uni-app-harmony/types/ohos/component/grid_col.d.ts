/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * Defines the option in number unit of grid-container child component.
 *
 * @interface GridColColumnOption
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the option in number unit of grid-container child component.
 *
 * @interface GridColColumnOption
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the option in number unit of grid-container child component.
 *
 * @interface GridColColumnOption
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface GridColColumnOption {
    /**
     * Grid Col Column Option xs
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Grid Col Column Option xs
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Grid Col Column Option xs
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    xs?: number;
    /**
     * Grid Col Column Option sm
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Grid Col Column Option sm
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Grid Col Column Option sm
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    sm?: number;
    /**
     * Grid Col Column Option md
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Grid Col Column Option md
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Grid Col Column Option md
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    md?: number;
    /**
     * Grid Col Column Option lg
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Grid Col Column Option lg
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Grid Col Column Option lg
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    lg?: number;
    /**
     * Grid Col Column Option xl
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Grid Col Column Option xl
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Grid Col Column Option xl
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    xl?: number;
    /**
     * Grid Col Column Option xxl
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Grid Col Column Option xxl
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Grid Col Column Option xxl
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    xxl?: number;
}
/**
 * Defines the options of grid-container child component.
 *
 * @interface GridColOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the options of grid-container child component.
 *
 * @interface GridColOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the options of grid-container child component.
 *
 * @interface GridColOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface GridColOptions {
    /**
     * Sets the span of current gird-container item.
     *
     * @type { ?(number | GridColColumnOption) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the span of current gird-container item.
     *
     * @type { ?(number | GridColColumnOption) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the span of current gird-container item.
     *
     * @type { ?(number | GridColColumnOption) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    span?: number | GridColColumnOption;
    /**
     * Sets the offset of current gird-container item.
     *
     * @type { ?(number | GridColColumnOption) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the offset of current gird-container item.
     *
     * @type { ?(number | GridColColumnOption) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the offset of current gird-container item.
     *
     * @type { ?(number | GridColColumnOption) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    offset?: number | GridColColumnOption;
    /**
     * Sets the order of current gird-container item.
     *
     * @type { ?(number | GridColColumnOption) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the order of current gird-container item.
     *
     * @type { ?(number | GridColColumnOption) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the order of current gird-container item.
     *
     * @type { ?(number | GridColColumnOption) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    order?: number | GridColColumnOption;
}
/**
 * Defines the the new version of grid-container child component.
 *
 * @interface GridColInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the the new version of grid-container child component.
 *
 * @interface GridColInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the the new version of grid-container child component.
 *
 * @interface GridColInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface GridColInterface {
    /**
     * Defines the constructor of GridContainer.
     *
     * @param { GridColOptions } option
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Defines the constructor of GridContainer.
     *
     * @param { GridColOptions } option
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Defines the constructor of GridContainer.
     *
     * @param { GridColOptions } option
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (option?: GridColOptions): GridColAttribute;
}
/**
 * Defines the GridContainer attribute functions.
 *
 * @extends CommonMethod<GridColAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the GridContainer attribute functions.
 *
 * @extends CommonMethod<GridColAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the GridContainer attribute functions.
 *
 * @extends CommonMethod<GridColAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class GridColAttribute extends CommonMethod<GridColAttribute> {
    /**
     * Sets the span of current gird-container item.
     *
     * @param { number | GridColColumnOption } value
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the span of current gird-container item.
     *
     * @param { number | GridColColumnOption } value
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the span of current gird-container item.
     *
     * @param { number | GridColColumnOption } value
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    span(value: number | GridColColumnOption): GridColAttribute;
    /**
     * Sets the offset of current gird-container item.
     *
     * @param { number | GridColColumnOption } value
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the offset of current gird-container item.
     *
     * @param { number | GridColColumnOption } value
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the offset of current gird-container item.
     *
     * @param { number | GridColColumnOption } value
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    gridColOffset(value: number | GridColColumnOption): GridColAttribute;
    /**
     * Sets the order of current gird-container item.
     *
     * @param { number | GridColColumnOption } value
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the order of current gird-container item.
     *
     * @param { number | GridColColumnOption } value
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the order of current gird-container item.
     *
     * @param { number | GridColColumnOption } value
     * @returns { GridColAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    order(value: number | GridColColumnOption): GridColAttribute;
}
/**
 * Defines GridCol Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines GridCol Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines GridCol Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const GridCol: GridColInterface;
/**
 * Defines GridCol Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines GridCol Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines GridCol Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const GridColInstance: GridColAttribute;
