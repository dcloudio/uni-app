/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Defines voip extension ability.
 * @kit PushKit
 */
import type VoIPExtensionContext from '@hms.core.push.VoIPExtensionContext';
import type pushCommon from '@hms.core.push.pushCommon';
import UIExtensionAbility from '@ohos.app.ability.UIExtensionAbility';
/**
 * Class of voip extension ability.
 *
 * @syscap SystemCapability.Push.PushService
 * @StageModelOnly
 * @since 4.1.0(11)
 */
export default class VoIPExtensionAbility extends UIExtensionAbility {
    /**
     * Indicates voip extension context.
     *
     * @type { VoIPExtensionContext }
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    context: VoIPExtensionContext;
    /**
     * Called back when message is received.
     *
     * @param { pushCommon.VoIPInfo } voipInfo - Indicates the data of voip.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    onReceiveMessage(voipInfo: pushCommon.VoIPInfo): void;
}
