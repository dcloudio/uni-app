/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Defines remote location extension ability.
 * @kit PushKit
 */
import type RemoteLocationExtensionContext from '@hms.core.push.RemoteLocationExtensionContext';
import type pushCommon from '@hms.core.push.pushCommon';
/**
 * Class of remote location extension ability.
 *
 * @syscap SystemCapability.Push.PushService
 * @StageModelOnly
 * @since 4.1.0(11)
 */
export default class RemoteLocationExtensionAbility {
    /**
     * Indicates remote location extension context.
     *
     * @type { RemoteLocationExtensionContext }
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    context: RemoteLocationExtensionContext;
    /**
     * Called back when message is received.
     *
     * @param { pushCommon.PushPayload } payload - Indicates the data of push payload.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    onReceiveMessage(payload: pushCommon.PushPayload): Promise<void>;
    /**
     * Called back before a remote location extension is destroyed.
     *
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    onDestroy(): void;
}
