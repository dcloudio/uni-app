/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Defines push extension ability.
 * @kit PushKit
 */
import type PushExtensionContext from '@hms.core.push.PushExtensionContext';
import type pushCommon from '@hms.core.push.pushCommon';
/**
 * Class of push extension ability.
 * @syscap SystemCapability.Push.PushService
 * @StageModelOnly
 * @since 4.0.0(10)
 */
export default class PushExtensionAbility {
    /**
     * Indicates push extension context.
     * @type { PushExtensionContext }
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.0.0(10)
     */
    context: PushExtensionContext;
    /**
     * Called back when message is received.
     * @param { pushCommon.PushPayload } payload - Indicates the data of push payload.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.0.0(10)
     */
    onReceiveMessage(payload: pushCommon.PushPayload): void;
    /**
     * Called back before a push extension is destroyed.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.0.0(10)
     */
    onDestroy(): void;
}
