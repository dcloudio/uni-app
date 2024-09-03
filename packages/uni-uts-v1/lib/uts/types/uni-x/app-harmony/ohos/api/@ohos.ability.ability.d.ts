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
 * @kit AbilityKit
 */
import { DataAbilityHelper as _DataAbilityHelper } from './ability/dataAbilityHelper';
import { PacMap as _PacMap } from './ability/dataAbilityHelper';
import { DataAbilityOperation as _DataAbilityOperation } from './ability/dataAbilityOperation';
import { DataAbilityResult as _DataAbilityResult } from './ability/dataAbilityResult';
import { AbilityResult as _AbilityResult } from './ability/abilityResult';
import { ConnectOptions as _ConnectOptions } from './ability/connectOptions';
import { StartAbilityParameter as _StartAbilityParameter } from './ability/startAbilityParameter';
/**
 * The class of an ability.
 *
 * @namespace ability
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @FAModelOnly
 * @since 9
 */
/**
 * The class of an ability.
 *
 * @namespace ability
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @since 11
 */
declare namespace ability {
    /**
     * DataAbilityHelper
     *
     * @typedef { _DataAbilityHelper }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 9
     */
    export type DataAbilityHelper = _DataAbilityHelper;
    /**
     * Defines a PacMap object for storing a series of values.
     *
     * @typedef { _PacMap }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 9
     */
    /**
     * Defines a PacMap object for storing a series of values.
     *
     * @typedef { _PacMap }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @since 11
     */
    export type PacMap = _PacMap;
    /**
     * DataAbilityOperation secondary module.Define the DataAbility data operation method,
     * which can be used as an input parameter for [executeBatch] to manipulate database information.
     *
     * @typedef { _DataAbilityOperation }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 9
     */
    export type DataAbilityOperation = _DataAbilityOperation;
    /**
     * DataAbilityResult secondary module.Define the DataAbility data operation result.
     * When operating the database through [executeBatch], the operation result is returned
     * using the DataAbility Result object.
     *
     * @typedef { _DataAbilityResult }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 9
     */
    export type DataAbilityResult = _DataAbilityResult;
    /**
     * AbilityResult secondary module.The result code and data returned after the ability is pulled
     * up and exited can be defined. The ability result object returned after the ability is pulled
     * up and exited can be obtained through [startAbilityForResult], and the ability object pulled up
     * by startAbilityForResult can be returned through [terminateSelfWithResult].
     *
     * @typedef { _AbilityResult }
     * @syscap SystemCapability.Ability.AbilityBase
     * @FAModelOnly
     * @since 9
     */
    export type AbilityResult = _AbilityResult;
    /**
     * ConnectOptions secondary module.As an input parameter when connecting to a specified backend service,
     * used to receive state changes during the connection process
     *
     * @typedef { _ConnectOptions }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 9
     */
    export type ConnectOptions = _ConnectOptions;
    /**
     * StartAbilityParameter secondary module.Define the Start Ability parameter, which can be used as
     * an input parameter to call [startAbility] to start the specified Ability.
     *
     * @typedef { _StartAbilityParameter }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 9
     */
    export type StartAbilityParameter = _StartAbilityParameter;
}
export default ability;
