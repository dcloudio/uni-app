/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
 * @kit NetworkKit
 */

import type connection from './@ohos.net.connection';
import type _AbilityContext from './application/UIAbilityContext';
/**
 * Provides VPN related interfaces.
 * @namespace vpn
 * @syscap SystemCapability.Communication.NetManager.Vpn
 * @since 10
 */
declare namespace vpn {
    /**
     * Get network link information.
     * @typedef { connection.LinkAddress }
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    export type LinkAddress = connection.LinkAddress;
    /**
     * Get network route information.
     * @typedef { connection.RouteInfo }
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    export type RouteInfo = connection.RouteInfo;
    /**
     * The context of an ability. It allows access to ability-specific resources.
     * @typedef _AbilityContext
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 10
     */
    export type AbilityContext = _AbilityContext;
}
export default vpn;
