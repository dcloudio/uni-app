/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
import * as _UIAbilityContext from './application/UIAbilityContext';
import type * as _UIExtensionContext from './application/UIExtensionContext';
import * as _AbilityStageContext from './application/AbilityStageContext';
import * as _ApplicationContext from './application/ApplicationContext';
import * as _BaseContext from './application/BaseContext';
import * as _Context from './application/Context';
import * as _ExtensionContext from './application/ExtensionContext';
import * as _FormExtensionContext from './application/FormExtensionContext';
import * as _EventHub from './application/EventHub';
import { PacMap as _PacMap } from './ability/dataAbilityHelper';
import { AbilityResult as _AbilityResult } from './ability/abilityResult';
import type _AbilityStartCallback from './application/AbilityStartCallback';
import { ConnectOptions as _ConnectOptions } from './ability/connectOptions';
import type * as _VpnExtensionContext from './application/VpnExtensionContext';
import type * as _EmbeddableUIAbilityContext from './application/EmbeddableUIAbilityContext';
import type * as _PhotoEditorExtensionContext from './application/PhotoEditorExtensionContext';
/**
 * This module provides application context classes and common data structures.
 *
 * @namespace common
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @since 9
 */
/**
 * This module provides application context classes and common data structures.
 *
 * @namespace common
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @crossplatform
 * @since 10
 */
/**
 * This module provides application context classes and common data structures.
 *
 * @namespace common
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace common {
    /**
     * The context of an ability. It allows access to ability-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * The context of an ability. It allows access to ability-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * The context of an ability. It allows access to ability-specific resources.
     *
     * @typedef { _UIAbilityContext.default }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export type UIAbilityContext = _UIAbilityContext.default;
    /**
     * The context of an abilityStage. It allows access to abilityStage-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * The context of an abilityStage. It allows access to abilityStage-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * The context of an abilityStage. It allows access to abilityStage-specific resources.
     *
     * @typedef { _AbilityStageContext.default }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export type AbilityStageContext = _AbilityStageContext.default;
    /**
     * The context of an application. It allows access to application-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * The context of an application. It allows access to application-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * The context of an application. It allows access to application-specific resources.
     *
     * @typedef { _ApplicationContext.default }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export type ApplicationContext = _ApplicationContext.default;
    /**
     * The base context of 'app.Context' for FA Mode or 'application.Context' for Stage Mode.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * The base context of 'app.Context' for FA Mode or 'application.Context' for Stage Mode.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * The base context of 'app.Context' for FA Mode or 'application.Context' for Stage Mode.
     *
     * @typedef { _BaseContext.default }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export type BaseContext = _BaseContext.default;
    /**
     * The base context of an ability or an application. It allows access to
     * application-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * The base context of an ability or an application. It allows access to
     * application-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * The base context of an ability or an application. It allows access to
     * application-specific resources.
     *
     * @typedef { _Context.default }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export type Context = _Context.default;
    /**
     * The context of an extension. It allows access to extension-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * The context of an extension. It allows access to extension-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    export type ExtensionContext = _ExtensionContext.default;
    /**
     * The context of form extension. It allows access to
     * formExtension-specific resources.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * The context of form extension. It allows access to
     * formExtension-specific resources.
     *
     * @typedef { _FormExtensionContext.default }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    export type FormExtensionContext = _FormExtensionContext.default;
    /**
     * The event center of a context, support the subscription and publication of events.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * The event center of a context, support the subscription and publication of events.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    /**
     * The event center of a context, support the subscription and publication of events.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export type EventHub = _EventHub.default;
    /**
     * Defines a PacMap object for storing a series of values.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * Defines a PacMap object for storing a series of values.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    export type PacMap = _PacMap;
    /**
     * Indicates the result of startAbility.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * Indicates the result of startAbility.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    export type AbilityResult = _AbilityResult;
    /**
     * Indicates the callback of connection
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    export type ConnectOptions = _ConnectOptions;
    /**
     * The context of UI extension. It allows access to
     * UIExtension-specific resources.
     *
     * @typedef { _UIExtensionContext.default }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 10
     */
    export type UIExtensionContext = _UIExtensionContext.default;
    /**
     * The function Called when some error occurred except disconnected from UIAbility or UIExtensionAbility
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    export type AbilityStartCallback = _AbilityStartCallback;
    /**
     * The context of vpn extension. It allows access to
     * vpnExtension-specific resources.
     * The class of auto startup info.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    export type VpnExtensionContext = _VpnExtensionContext.default;
    /**
     * The context of an embeddable UIAbility.
     *
     * @typedef { _EmbeddableUIAbilityContext.default }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @atomicservice
     * @since 12
     */
    export type EmbeddableUIAbilityContext = _EmbeddableUIAbilityContext.default;
    /**
     * The context of an photo editor extension ability.
     *
     * @typedef { _PhotoEditorExtensionContext.default }
     * @syscap SystemCapability.Ability.AppExtension.PhotoEditorExtension
     * @stagemodelonly
     * @since 12
     */
    export type PhotoEditorExtensionContext = _PhotoEditorExtensionContext.default;
}
export default common;
