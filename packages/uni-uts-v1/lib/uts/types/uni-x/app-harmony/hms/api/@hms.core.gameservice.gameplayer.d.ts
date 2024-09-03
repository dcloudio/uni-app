/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines the capabilities of GameServiceKit.
 * @kit GameServiceKit
 */
import type { AsyncCallback, Callback } from '@ohos.base';
import type common from '@ohos.app.ability.common';
/**
 * This module provides compliance and interactive capabilities for game player.
 *
 * @namespace gamePlayer
 * @syscap SystemCapability.Game.GameService.GamePlayer
 * @since 4.0.0(10)
 */
declare namespace gamePlayer {
    /**
     * GSKLocalPlayer object represents local player information.
     * The prefix GSK used in the variables is the acronym of GameServiceKit.
     *
     * @typedef GSKLocalPlayer
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    interface GSKLocalPlayer {
        /**
         * Unique identifier of the game player.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        gamePlayerId: string;
        /**
         * Unique identifier of all game players distributed by the developer account.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        teamPlayerId: string;
        /**
         * Id compatible type.
         * Notes: 0 - incompatible; 1 - compatible playerId; 2 - compatible openId;
         *
         * @type { number }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        idCompatibleType: number;
        /**
         * Player consumption privilege level in GameCenter.
         *
         * @type { number }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        level: number;
        /**
         * Player's playable duration (minutes) this time.
         *
         * @type { number }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        playableTime: number;
        /**
         * The type of the playerId used for game login.
         * Notes: 1: gamePlayerId; 2: teamPlayerId
         *
         * @type { number }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        loginIdType: number;
    }
    /**
     * GSKPlayerRole object represents player role information.
     *
     * @typedef GSKPlayerRole
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    interface GSKPlayerRole {
        /**
         * Player role id.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        roleId: string;
        /**
         * Player role name.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        roleName: string;
        /**
         * Player zone server id.
         *
         * @type { ?string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        serverId?: string;
        /**
         * Player zone server name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        serverName?: string;
        /**
         * Unique identifier of the game player.
         *
         * @type { ?string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        gamePlayerId?: string;
        /**
         * Unique identifier of all game players distributed by the developer account.
         *
         * @type { ?string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        teamPlayerId?: string;
        /**
         * The thirdOpenId of third game.
         *
         * @type { ?string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        thirdOpenId?: string;
    }
    /**
     * Request parameter of the purchase API.
     *
     * @typedef PurchaseParameter
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    interface PurchaseParameter {
        /**
         * ID of product to be queried.
         * Each product ID must exist and be unique in the current app.
         * The product ID is the same as that you set when configuring product information in AppGallery Connect.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        productId: string;
        /**
         * Type of a product to be queried.
         *
         * @type { ProductType }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        productType: ProductType;
        /**
         * Information stored on the merchant side.
         *
         * @type { ?string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        developerPayload?: string;
        /**
         * This parameter is used to pass the extra fields set by a merchant in a JSON string in the key:value format.
         *
         * @type { ?string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        reservedInfo?: string;
    }
    /**
     * PurchaseResult object represents purchase result.
     *
     * @typedef PurchaseResult
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    interface PurchaseResult {
        /**
         * Information about products that have been purchased.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        inAppPurchaseData: string;
        /**
         * Signature string generated after consumption data is signed using a private payment key.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        signature: string;
        /**
         * Signature algorithm.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        signatureAlgorithm: string;
    }
    /**
     * Represents create purchase result.
     *
     * @typedef CreatePurchaseResult
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.1.0(11)
     */
    interface CreatePurchaseResult {
        /**
         * Purchase data, including purchase order and subscription status.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.1.0(11)
         */
        purchaseData: string;
    }
    /**
     * ThirdUserInfo object represents user info of third game.
     *
     * @typedef ThirdUserInfo
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    interface ThirdUserInfo {
        /**
         * The thirdOpenId of third game.
         *
         * @type { string}
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        thirdOpenId: string;
        /**
         * Whether the user is real name.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        isRealName?: boolean;
        /**
         * Whether the user is an adult.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        isAdult?: boolean;
        /**
         * Age range of user.
         *
         * @type { ?ThirdUserAgeRange }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        ageRange?: ThirdUserAgeRange;
    }
    /**
     * Union login parameters passed in by developer.
     *
     * @typedef UnionLoginParam
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    interface UnionLoginParam {
        /**
         * Used to indicate whether to force a union login dialog pops up, allowing users to choose to login again.
         * Note：
         * true: When calling the unionLogin interface, a union login dialog will always pop up.
         * false: When calling the unionLogin interface, the internal logic will determine
         * whether to pop up the union login dialog.
         * Usually, you don't need to assign a value to this parameter. When you need to switch accounts or perform
         * other operations, assign this value to true
         *
         * @type { boolean }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        showLoginDialog: boolean;
        /**
         * The type of login panel.
         * Note:
         * If this field value is not set, the default value is LoginPanelType ICON
         *
         * @type { ?LoginPanelType }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        loginPanelType?: LoginPanelType;
        /**
         * Account information provided by game developers, used to display the game developer's login button
         * in the login dialog.
         * Note：
         * The account name cannot be the same for different accounts.
         *
         * @type { Array<ThirdAccountInfo>}
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        thirdAccountInfos: Array<ThirdAccountInfo>;
    }
    /**
     * Account information provided by game developers.
     *
     * @typedef ThirdAccountInfo
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    interface ThirdAccountInfo {
        /**
         * Resource information of account icon.
         * resource of icon ($r or $rawfile)
         *
         * @type { Resource }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        accountIcon: Resource;
        /**
         * account name.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        accountName: string;
    }
    /**
     * Union login results returned to developer.
     *
     * @typedef UnionLoginResult
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    interface UnionLoginResult {
        /**
         * The account name provided by the developer.
         * Notes：
         * If the user selects Huawei ID, return "hw_account".
         * If you choose the account provided by the developer, return the account name passed in by the developer.
         * If there is an exception during the login process, return "official_account".
         * "official_account" indicates that the specific account name cannot be returned at present, and the developer
         * can only be informed to log in through the official account. If there are multiple official accounts,
         * the developer can select one to log in
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        accountName: string;
        /**
         * Notify developers whether the current player ID needs to be bound to their account.
         * Notes: true：need be bound; false：no need be bound
         *
         * @type { boolean }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        needBinding: boolean;
        /**
         * Current third-party player information bound to Huawei playerId.
         *
         * @typedef BoundPlayerInfo
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        boundPlayerInfo: BoundPlayerInfo;
        /**
         * Local player information.
         *
         * @type { GSKLocalPlayer }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        localPlayer: GSKLocalPlayer;
    }
    /**
     * The change result of the Player returned to the developer.
     *
     * @typedef PlayerChangedResult
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    interface PlayerChangedResult {
        /**
         * The event of player changed.
         *
         * @type { PlayerChangedEvent }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        event: PlayerChangedEvent;
        /**
         * This is a json string used to return relevant information about the current event.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        resultInfo: string;
    }
    /**
     * Current third-party player information bound to Huawei playerId.
     *
     * @typedef BoundPlayerInfo
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    interface BoundPlayerInfo {
        /**
         * Third-party playerId bound to Huawei playerId.
         *
         * @type { string }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        thirdOpenId: string;
        /**
         * The binding type between Huawei playerId and third-party playerId.
         *
         * @type { BindType }
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        bindType: BindType;
    }
    /**
     * Indicates the changed event of player.
     *
     * @enum { number }
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    enum PlayerChangedEvent {
        /**
         * The user switched game account
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        SWITCH_GAME_ACCOUNT = 0
    }
    /**
     * Enumerates the age range of ThirdUserInfo.
     *
     * @enum { number }
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    enum ThirdUserAgeRange {
        /**
         * User age less than 8 years old.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        AGE_RANGE_8 = 1,
        /**
         * User age less than 16 years old and greater than 8 years old.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        AGE_RANGE_16 = 2,
        /**
         * User age less than 18 years old and greater than 16 years old.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        AGE_RANGE_18 = 3,
        /**
         * User age greater than 18 years old.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        AGE_RANGE_ADULT = 4
    }
    /**
     * The type of login panel.
     *
     * @enum { number }
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    enum LoginPanelType {
        /**
         * The third-party account entrance is displayed as the account icon.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        ICON = 0,
        /**
         * The third-party account entrance is displayed as a button
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        BUTTON = 1
    }
    /**
     * The binding type between Huawei playerId and third-party playerId.
     *
     * @enum { number }
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    enum BindType {
        /**
         * Indicates that the third-party playerId bound to the Huawei playerId is an official account level ID.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        CP_ACCOUNT_LEVEL = 0,
        /**
         * Indicates that the third-party playerId bound to the Huawei playerId is an application level ID.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        APP_LEVEL = 1
    }
    /**
     * Enumerates the game error codes returned in callback invoked after executeRequest() is called.
     *
     * @enum { number }
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    enum GameErrorCode {
        /**
         * System internal error.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INTERNAL_ERROR = 1002000001,
        /**
         * Network connection error.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        NETWORK_ERROR = 1002000002,
        /**
         * Get the HUAWEI ID information failed.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        GET_HWID_INFO_FAILED = 1002000003,
        /**
         * User cancels real name authentication or not real name.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        REALNAME_CANCELED_OR_NOT_REALNAME = 1002000004,
        /**
         * The country or region of the signed-in Huawei ID does not support.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        COUNTRY_OR_REGION_NOT_SUPPORTED = 1002000005,
        /**
         * User is underage and has no playable time.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        ANTI_ADDICTION_ERROR = 1002000006,
        /**
         * The application to which the product belongs is not listed in the specified country.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        PRODUCT_BELONG_REGION_ERROR = 1002000007,
        /**
         * The HUAWEI ID is in the blocklist.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        HWID_IN_BLOCKLIST = 1002000008,
        /**
         * The game account is unavailable for the game.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        GAME_ACCOUNT_UNAVAILABLE = 1002000009,
        /**
         * The playerId is not current player.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        PLAYER_ID_INVALID = 1002000010,
        /**
         * Agreement not agreed.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        AGREEMENT_NOT_AGREED = 1002000011,
        /**
         * The thirdOpenId or teamPlayerId has been bound.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        OPEN_ID_OR_PLAYER_ID_BOUND = 1002000012,
        /**
         * The thirdOpenId and teamPlayerId are not bound.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        OPEN_ID_AND_PLAYER_ID_NOT_BOUND = 1002000013,
        /**
         * This interface is not available for this game.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        CURRENT_API_NOT_AVAILABLE_FOR_GAME = 1002000014,
        /**
         * The current player information is invalid. Execute the login process again to obtain the player information.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        CURRENT_PLAYER_INFO_INVALID = 1002000015,
        /**
         * User cancels union login.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        UNION_LOGIN_CANCELED = 1002000016,
        /**
         * Illegal application identity.
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        ILLEGAL_APPLICATION = 1002000017
    }
    /**
     * Indicates the product Type.
     *
     * @enum { number }
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    enum ProductType {
        /**
         * Consumable product
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        CONSUMABLE = 0,
        /**
         * Non-Consumable product for one time purchase
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 4.0.0(10)
         */
        NONCONSUMABLE = 1,
        /**
         * Auto-renewable subscription product
         *
         * @syscap SystemCapability.Game.GameService.GamePlayer
         * @since 5.0.0(12)
         */
        AUTORENEWABLE = 2
    }
    /**
     * Init cache game config parameters, sign privacy agreement.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @returns { Promise<void> } Returns void.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    function init(context: common.UIAbilityContext): Promise<void>;
    /**
     * Init cache game config parameters, sign privacy agreement.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { AsyncCallback<void> } callback - callback.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    function init(context: common.UIAbilityContext, callback: AsyncCallback<void>): void;
    /**
     * Obtains local player information.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @returns { Promise<GSKLocalPlayer> } Returns GSKLocalPlayer.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002000001 - System internal error.
     * @throws { BusinessError } 1002000002 - Network connection error.
     * @throws { BusinessError } 1002000003 - The HUAWEI ID is not signed in or not authorized.
     * @throws { BusinessError } 1002000004 - User cancels real name authentication or not real name.
     * @throws { BusinessError } 1002000005 - The country or region of the signed-in Huawei ID does not support.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    /**
     * Obtains local player information.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @returns { Promise<GSKLocalPlayer> } Returns GSKLocalPlayer.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002000001 - System internal error.
     * @throws { BusinessError } 1002000002 - Network connection error.
     * @throws { BusinessError } 1002000003 - The HUAWEI ID is not signed in or not authorized.
     * @throws { BusinessError } 1002000004 - User cancels real name authentication or not real name.
     * @throws { BusinessError } 1002000005 - The country or region of the signed-in Huawei ID does not support.
     * @throws { BusinessError } 1002000006 - User is underage and has no playable time.
     * @throws { BusinessError } 1002000011 - Agreement not agreed.
     * @throws { BusinessError } 1002000014 - This interface is not available for this game.
     * @throws { BusinessError } 1002000017 - Illegal application identity.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    function getLocalPlayer(context: common.UIAbilityContext): Promise<GSKLocalPlayer>;
    /**
     * Obtains local player information.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { AsyncCallback<GSKLocalPlayer> } callback - callback.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002000001 - System internal error.
     * @throws { BusinessError } 1002000002 - Network connection error.
     * @throws { BusinessError } 1002000003 - The HUAWEI ID is not signed in or not authorized.
     * @throws { BusinessError } 1002000004 - User cancels real name authentication or not real name.
     * @throws { BusinessError } 1002000005 - The country or region of the signed-in Huawei ID does not support.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    /**
     * Obtains local player information.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { AsyncCallback<GSKLocalPlayer> } callback - callback.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002000001 - System internal error.
     * @throws { BusinessError } 1002000002 - Network connection error.
     * @throws { BusinessError } 1002000003 - The HUAWEI ID is not signed in or not authorized.
     * @throws { BusinessError } 1002000004 - User cancels real name authentication or not real name.
     * @throws { BusinessError } 1002000005 - The country or region of the signed-in Huawei ID does not support.
     * @throws { BusinessError } 1002000006 - User is underage and has no playable time.
     * @throws { BusinessError } 1002000011 - Agreement not agreed.
     * @throws { BusinessError } 1002000014 - This interface is not available for this game.
     * @throws { BusinessError } 1002000017 - Illegal application identity.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    function getLocalPlayer(context: common.UIAbilityContext, callback: AsyncCallback<GSKLocalPlayer>): void;
    /**
     * Save player role information.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { GSKPlayerRole } request - GSKPlayerRole.
     * @returns { Promise<void> } Returns void.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    function savePlayerRole(context: common.UIAbilityContext, request: GSKPlayerRole): Promise<void>;
    /**
     * Save player role information.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { GSKPlayerRole } request - GSKPlayerRole.
     * @param { AsyncCallback<void> } callback - callback.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 4.0.0(10)
     */
    function savePlayerRole(context: common.UIAbilityContext, request: GSKPlayerRole, callback: AsyncCallback<void>): void;
    /**
     * Bind a game account to a Huawei player.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } thirdOpenId - The thirdOpenId of third game.
     * @param { string } teamPlayerId - The teamPlayerId of Huawei player to bind.
     * @returns { Promise<void> } Returns void.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002000001 - System internal error.
     * @throws { BusinessError } 1002000002 - Network connection error.
     * @throws { BusinessError } 1002000003 - The HUAWEI ID is not signed in or not authorized.
     * @throws { BusinessError } 1002000005 - The country or region of the signed-in Huawei ID does not support.
     * @throws { BusinessError } 1002000010 - The playerId is not current player.
     * @throws { BusinessError } 1002000011 - Agreement not agreed.
     * @throws { BusinessError } 1002000012 - The thirdOpenId or teamPlayerId has been bound.
     * @throws { BusinessError } 1002000017 - Illegal application identity.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    function bindPlayer(context: common.UIAbilityContext, thirdOpenId: string, teamPlayerId: string): Promise<void>;
    /**
     * UnbindPlayer a game account to a Huawei player.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } thirdOpenId - The thirdOpenId of third game.
     * @param { string } teamPlayerId - The teamPlayerId of Huawei player to unbind.
     * @returns { Promise<void> } Returns void.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002000001 - System internal error.
     * @throws { BusinessError } 1002000002 - Network connection error.
     * @throws { BusinessError } 1002000003 - The HUAWEI ID is not signed in or not authorized.
     * @throws { BusinessError } 1002000005 - The country or region of the signed-in Huawei ID does not support.
     * @throws { BusinessError } 1002000010 - The playerId is not current player.
     * @throws { BusinessError } 1002000011 - Agreement not agreed.
     * @throws { BusinessError } 1002000013 - The thirdOpenId and teamPlayerId is not bound.
     * @throws { BusinessError } 1002000017 - Illegal application identity.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    function unbindPlayer(context: common.UIAbilityContext, thirdOpenId: string, teamPlayerId: string): Promise<void>;
    /**
     * Verify whether the local player can enter the game.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { ThirdUserInfo } thirdUserInfo - user info of third game to verify.
     * @returns { Promise<void> } Returns void.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002000001 - System internal error.
     * @throws { BusinessError } 1002000002 - Network connection error.
     * @throws { BusinessError } 1002000003 - The HUAWEI ID is not signed in or not authorized.
     * @throws { BusinessError } 1002000004 - User cancels real name authentication or not real name.
     * @throws { BusinessError } 1002000005 - The country or region of the signed-in Huawei ID does not support.
     * @throws { BusinessError } 1002000006 - User is underage and has no playable time.
     * @throws { BusinessError } 1002000008 - The HUAWEI ID is in the blocklist.
     * @throws { BusinessError } 1002000011 - Agreement not agreed.
     * @throws { BusinessError } 1002000015 - The current player information is invalid. Execute the login process again to obtain the player information.
     * @throws { BusinessError } 1002000017 - Illegal application identity.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    function verifyLocalPlayer(context: common.UIAbilityContext, thirdUserInfo: ThirdUserInfo): Promise<void>;
    /**
     * Provide the ability to union login with Huawei ID and developer accounts.
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { UnionLoginParam} loginParam - The params of unionLogin.
     * @returns { Promise<UnionLoginResult> } Returns UnionLoginResult.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002000001 - System internal error.
     * @throws { BusinessError } 1002000002 - Network connection error.
     * @throws { BusinessError } 1002000003 - The HUAWEI ID is not signed in or not authorized.
     * @throws { BusinessError } 1002000004 - User cancels real name authentication or not real name.
     * @throws { BusinessError } 1002000005 - The country or region of the signed-in Huawei ID does not support.
     * @throws { BusinessError } 1002000008 - The HUAWEI ID is in the blocklist.
     * @throws { BusinessError } 1002000011 - Agreement not agreed.
     * @throws { BusinessError } 1002000014 - This interface is not available for this game.
     * @throws { BusinessError } 1002000016 - Union login canceled by user.
     * @throws { BusinessError } 1002000017 - Illegal application identity.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    function unionLogin(context: common.UIAbilityContext, loginParam: UnionLoginParam): Promise<UnionLoginResult>;
    /**
     * Registering a listening event for player changed.
     *
     * @param { 'playerChanged' } type - Type of the event to listen for.
     * @param { Callback<PlayerChangedResult> } callback - The callback object need to be registered.
     * @returns { void } Returns void.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    function on(type: 'playerChanged', callback: Callback<PlayerChangedResult>): void;
    /**
     * Unregistering a listening event for player changed.
     * Note：
     * Callback is an optional parameter. If a callback object is passed in, it means that only the current callback
     * is unregistered. If this parameter is not passed in, it means that all registered callbacks are unregistered
     *
     * @param { 'playerChanged' } type - Type of the event to listen for.
     * @param { Callback<PlayerChangedResult> } callback - The callback object need to be unregistered.
     * @returns { void } Returns void.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Game.GameService.GamePlayer
     * @since 5.0.0(12)
     */
    function off(type: 'playerChanged', callback?: Callback<PlayerChangedResult>): void;
}
export default gamePlayer;
