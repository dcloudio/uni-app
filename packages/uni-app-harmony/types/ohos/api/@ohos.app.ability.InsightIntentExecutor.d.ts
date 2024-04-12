/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
import type window from './@ohos.window';
import type insightIntent from './@ohos.app.ability.insightIntent';
import type InsightIntentContext from './@ohos.app.ability.InsightIntentContext';
import type UIExtensionContentSession from './@ohos.app.ability.UIExtensionContentSession';
/**
 * The class of insight intent executor.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @atomicservice
 * @since 11
 */
export default class InsightIntentExecutor {
    /**
     * Indicates context of insight intent.
     *
     * @type { InsightIntentContext }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    context: InsightIntentContext;
    /**
     * Called when a UIAbility executes the insight intent in the foreground.
     *
     * @param { string } name - Indicates the insight intent name.
     * @param { Record<string, Object> } param - Indicates the insight intent parameters.
     * @param { window.WindowStage } pageLoader - Indicates the page loader.
     * @returns { insightIntent.ExecuteResult | Promise<insightIntent.ExecuteResult> } The result of insight intent execution, support promise.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onExecuteInUIAbilityForegroundMode(name: string, param: Record<string, Object>, pageLoader: window.WindowStage): insightIntent.ExecuteResult | Promise<insightIntent.ExecuteResult>;
    /**
     * Called when a UIAbility executes the insight intent in the background.
     *
     * @param { string } name - Indicates the insight intent name.
     * @param { Record<string, Object> } param - Indicates the insight intent parameters.
     * @returns { insightIntent.ExecuteResult | Promise<insightIntent.ExecuteResult> } The result of insight intent execution, support promise.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onExecuteInUIAbilityBackgroundMode(name: string, param: Record<string, Object>): insightIntent.ExecuteResult | Promise<insightIntent.ExecuteResult>;
    /**
     * Called when a UIExtensionAbility executes the insight intent.
     *
     * @param { string } name - Indicates the insight intent name.
     * @param { Record<string, Object> } param - Indicates the insight intent parameters.
     * @param { UIExtensionContentSession } pageLoader - Indicates the page loader.
     * @returns { insightIntent.ExecuteResult | Promise<insightIntent.ExecuteResult> } The result of insight intent execution, support promise.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 11
     */
    onExecuteInUIExtensionAbility(name: string, param: Record<string, Object>, pageLoader: UIExtensionContentSession): insightIntent.ExecuteResult | Promise<insightIntent.ExecuteResult>;
    /**
     * Called when a ServiceExtensionAbility executes the insight intent.
     *
     * @param { string } name - Indicates the insight intent name.
     * @param { Record<string, Object> } param - Indicates the insight intent parameters.
     * @returns { insightIntent.ExecuteResult | Promise<insightIntent.ExecuteResult> } The result of insight intent execution, support promise.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 11
     */
    onExecuteInServiceExtensionAbility(name: string, param: Record<string, Object>): insightIntent.ExecuteResult | Promise<insightIntent.ExecuteResult>;
}
