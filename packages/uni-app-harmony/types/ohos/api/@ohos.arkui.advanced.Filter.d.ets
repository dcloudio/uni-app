/*
* Copyright (C) 2023-2023 Huawei Device Co., Ltd.
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
 * @kit ArkUI
 */
/**
 * Declare FilterType
 * @enum { FilterType }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare FilterType
 * @enum { FilterType }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare enum FilterType {
    /**
     * The multi_line_filter type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The multi_line_filter type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    MULTI_LINE_FILTER = 0,
    /**
     * The list_filter type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The list_filter type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    LIST_FILTER = 1
}
/**
 * This parameter is used to define the input of each filtering dimension.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * This parameter is used to define the input of each filtering dimension.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare class FilterParams {
    /**
     * filter item name.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * filter item name.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    name: ResourceStr;
    /**
     * filter options.
     * @type { Array<ResourceStr> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * filter options.
     * @type { Array<ResourceStr> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    options: Array<ResourceStr>;
}
/**
 * This parameter specifies the selection result of a filtering dimension.
 * The index starts from 0.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * This parameter specifies the selection result of a filtering dimension.
 * The index starts from 0.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare class FilterResult {
    /**
     * result name.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * result name.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    name: ResourceStr;
    /**
     * result index.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * result index.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    index: number;
    /**
     * result value.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * result value.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    value: ResourceStr;
}
/**
 * Declare Filter.The Filter is used in scenarios where multi-dimensional filtering is required.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare Filter.The Filter is used in scenarios where multi-dimensional filtering is required.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
@Component
export declare struct Filter {
    /**
     * Container in the user-defined filtering result display area.
     * @type { () => void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Container in the user-defined filtering result display area.
     * @type { () => void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @BuilderParam
    container: () => void;
    /**
     * Multi-dimensional filtering parameters.
     * @type { Array<FilterParams> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Multi-dimensional filtering parameters.
     * @type { Array<FilterParams> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @Prop
    multiFilters: Array<FilterParams>;
    /**
     * FilterParams, Additional filter item parameter. The filter item name is displayed and can be deselected.
     * @type { ?FilterParams }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * FilterParams, Additional filter item parameter. The filter item name is displayed and can be deselected.
     * @type { ?FilterParams }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @Prop
    additionFilters?: FilterParams;
    /**
     * FilterParams, Callback method after a user clicks a filter item.
     * @param { (filterResults: Array<FilterResult>) => void } FilterType, Filter display style type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * FilterParams, Callback method after a user clicks a filter item.
     * @param { (filterResults: Array<FilterResult>) => void } FilterType, Filter display style type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    onFilterChanged: (filterResults: Array<FilterResult>) => void;
    /**
     * FilterType, Filter display style type.
     * @type { ?FilterType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * FilterType, Filter display style type.
     * @type { ?FilterType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @Prop
    filterType?: FilterType;
}
