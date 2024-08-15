/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024. All rights reserved.
 */
/**
 * @file Defines extension context of liveview lock screen extension.
 * @kit LiveViewKit
 */
import type LiveViewLockScreenExtensionContext from '@hms.core.liveview.LiveViewLockScreenExtensionContext';
import UIExtensionAbility from '@ohos.app.ability.UIExtensionAbility';
/**
 * The extension context of liveview lock screen extension.
 *
 * @extends UIExtensionAbility
 * @syscap SystemCapability.LiveView.LiveViewService
 * @StageModelOnly
 * @since 5.0.0(12)
 */
export default class LiveViewLockScreenExtensionAbility extends UIExtensionAbility {
    /**
    * Indicates liveview lock screen extension context.
    *
    * @type { LiveViewLockScreenExtensionContext }
    * @syscap SystemCapability.LiveView.LiveViewService
    * @StageModelOnly
    * @since 5.0.0(12)
    */
    context: LiveViewLockScreenExtensionContext;
}
