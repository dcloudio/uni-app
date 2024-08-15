/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Defines remote notification extension ability.
 * @kit PushKit
 */
import type RemoteNotificationExtensionContext from '@hms.core.push.RemoteNotificationExtensionContext';
import type pushCommon from '@hms.core.push.pushCommon';
/**
 * Class of remote notification extension ability.
 *
 * @syscap SystemCapability.Push.PushService
 * @StageModelOnly
 * @since 4.1.0(11)
 */
export default class RemoteNotificationExtensionAbility {
    /**
     * Indicates remote notification extension context.
     *
     * @type { RemoteNotificationExtensionContext }
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    context: RemoteNotificationExtensionContext;
    /**
     * Called back when message is received.
     *
     * @param { pushCommon.RemoteNotificationInfo } remoteNotificationInfo - Indicates the remote notification information.
     * @returns { Promise<pushCommon.RemoteNotificationContent> } Returns the remote notification content.
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    onReceiveMessage(remoteNotificationInfo: pushCommon.RemoteNotificationInfo): Promise<pushCommon.RemoteNotificationContent>;
    /**
     * Called back before a remote notification extension is destroyed.
     *
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    onDestroy(): void;
}
