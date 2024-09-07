/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit ArkData
 */
import { ValueType } from './@ohos.data.ValuesBucket';
/**
 * This module provides data share services based on the ExtensionAbility.
 *
 * @namespace dataSharePredicates
 * @syscap SystemCapability.DistributedDataManager.DataShare.Core
 * @StageModelOnly
 * @since 10
 */
/**
 * This module provides data share services based on the ExtensionAbility.
 *
 * @namespace dataSharePredicates
 * @syscap SystemCapability.DistributedDataManager.DataShare.Core
 * @StageModelOnly
 * @crossplatform
 * @since 12
 */
declare namespace dataSharePredicates {
    /**
     * Manages relational database configurations.
     *
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @StageModelOnly
     * @since 10
     */
    /**
     * Manages relational database configurations.
     *
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @StageModelOnly
     * @crossplatform
     * @since 12
     */
    class DataSharePredicates {
        /**
         * Configure the DataSharePredicates to match the field whose data type is ValueType and value is equal
         * to a specified value.
         * This method is similar to = of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the DataSharePredicates.
         * @returns { DataSharePredicates } Returns the DataSharePredicates that match the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @since 10
         */
        /**
         * Configure the DataSharePredicates to match the field whose data type is ValueType and value is equal
         * to a specified value.
         * This method is similar to = of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the DataSharePredicates.
         * @returns { DataSharePredicates } Returns the DataSharePredicates that match the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @crossplatform
         * @since 12
         */
        equalTo(field: string, value: ValueType): DataSharePredicates;
        /**
         * Adds an and condition to the DataSharePredicates.
         * This method is similar to and of the SQL statement.
         *
         * @returns { DataSharePredicates } Returns the DataSharePredicates with the and condition.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @since 10
         */
        /**
         * Adds an and condition to the DataSharePredicates.
         * This method is similar to and of the SQL statement.
         *
         * @returns { DataSharePredicates } Returns the DataSharePredicates with the and condition.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @crossplatform
         * @since 12
         */
        and(): DataSharePredicates;
        /**
         * Restricts the ascending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { DataSharePredicates } Returns the SQL query statement with the specified DataSharePredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @since 10
         */
        /**
         * Restricts the ascending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { DataSharePredicates } Returns the SQL query statement with the specified DataSharePredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @crossplatform
         * @since 12
         */
        orderByAsc(field: string): DataSharePredicates;
        /**
         * Restricts the descending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { DataSharePredicates } Returns the SQL query statement with the specified DataSharePredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @since 10
         */
        /**
         * Restricts the descending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { DataSharePredicates } Returns the SQL query statement with the specified DataSharePredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @crossplatform
         * @since 12
         */
        orderByDesc(field: string): DataSharePredicates;
        /**
         * Construct a query object to specify the number of results and the starting position.
         *
         * @param { number } total - Represents the specified number of results.
         * @param { number } offset - Indicates the starting position.
         * @returns { DataSharePredicates } Returns the query object.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @since 10
         */
        /**
         * Construct a query object to specify the number of results and the starting position.
         *
         * @param { number } total - Represents the specified number of results.
         * @param { number } offset - Indicates the starting position.
         * @returns { DataSharePredicates } Returns the query object.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @crossplatform
         * @since 12
         */
        limit(total: number, offset: number): DataSharePredicates;
        /**
         * Configure {@code DataSharePredicates} to match the specified field whose data type is ValueType array and values
         * are within a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { Array<ValueType> } value - Indicates the values to match with DataSharePredicates.
         * @returns { DataSharePredicates } Returns DataSharePredicates that matches the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @since 10
         */
        /**
         * Configure {@code DataSharePredicates} to match the specified field whose data type is ValueType array and values
         * are within a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { Array<ValueType> } value - Indicates the values to match with DataSharePredicates.
         * @returns { DataSharePredicates } Returns DataSharePredicates that matches the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @StageModelOnly
         * @crossplatform
         * @since 12
         */
        in(field: string, value: Array<ValueType>): DataSharePredicates;
    }
}
export default dataSharePredicates;
