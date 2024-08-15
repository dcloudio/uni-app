/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines UI components used to login with a HUAWEI ID.
 * @kit AccountKit
 */
import { DrawableDescriptor } from '@ohos.arkui.drawableDescriptor';
import { AsyncCallback } from '@ohos.base';
/**
 * Defines a UI component used to show the login panel.
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
@Component
declare struct LoginPanel {
    /**
     * Controls whether to display the login panel.
     * @type { boolean }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    @Link
    show: boolean;
    /**
     * Defines the data displayed on the login panel.
     * @type { loginComponentManager.LoginPanelParams }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    params: loginComponentManager.LoginPanelParams;
    /**
     * Defines the controller to interact with the login panel.
     * @type { loginComponentManager.LoginPanelController }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    controller: loginComponentManager.LoginPanelController;
    /**
     * Constructor used to create a <b>LoginPanel</b> object.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    build(): void;
}
/**
 * Defines a UI component used to show the button for login with a HUAWEI ID.
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
@Component
declare struct LoginWithHuaweiIDButton {
    /**
     * Defines the presentation style of the button for login with a HUAWEI ID.
     * @type { loginComponentManager.LoginWithHuaweiIDButtonParams }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    params: loginComponentManager.LoginWithHuaweiIDButtonParams;
    /**
     * Defines the controller to interact with the button for login with a HUAWEI ID.
     * @type { loginComponentManager.LoginWithHuaweiIDButtonController }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    controller: loginComponentManager.LoginWithHuaweiIDButtonController;
    /**
     * Constructor used to create a <b>LoginWithHuaweiIDButton</b> object.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    build(): void;
}
/**
 * Defines the business logic of the login component.
 * @namespace loginComponentManager
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace loginComponentManager {
    /**
     * Enumerates the HUAWEI ID login types.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export enum LoginType {
        /**
         * HUAWEI ID associated with <b>OpenID</b> and <b>UnionID</b>.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ID = 0,
        /**
         * HUAWEI ID associated with <b>PhoneNumber</b>.
         * The app needs to obtain the mobile phone number associated with the HUAWEI ID through an authorization code.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        PHONE_NUMBER = 1,
        /**
         * HUAWEI ID associated with the real-time <b>PhoneNumber</b>.
         * The authorization page will be displayed to authorize the real-time mobile phone number every time.
         * The app needs to obtain the mobile phone number associated with the HUAWEI ID through an authorization code.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        REAL_TIME_PHONE_NUMBER = 2,
        /**
         * Use the mobile number associated with the HUAWEI ID to easily sign in.
         * The app needs to obtain the mobile phone number associated with the HUAWEI ID through an authorization code.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        QUICK_LOGIN = 3
    }
    /**
     * Defines the app information to be displayed on the login panel.
     * @typedef AppInfo
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface AppInfo {
        /**
         * Icon of the app.
         * @type { PixelMap | ResourceStr | DrawableDescriptor }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        appIcon: PixelMap | ResourceStr | DrawableDescriptor;
        /**
         * Name of the app. The maximum length is 19 characters.
         * @type { ResourceStr } appName
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        appName: ResourceStr;
        /**
         * Description of the app. The maximum length is 44 characters.
         * @type { ResourceStr }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Description of the app. The maximum length is 44 characters.
         * @type { ?ResourceStr }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        appDescription?: ResourceStr;
    }
    /**
     * Enumerates the types of the privacy text displayed on the login panel.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export enum TextType {
        /**
         * Plain text that cannot be clicked by the user.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        PLAIN_TEXT = 0,
        /**
         * Rich text that can be clicked by the user.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        RICH_TEXT = 1
    }
    /**
     * Defines the privacy text to be displayed on the login panel.
     * @typedef PrivacyText
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface PrivacyText {
        /**
         * Privacy text type, which can be plain text or rich text.
         * @type { TextType }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        type: TextType;
        /**
         * Privacy content to be displayed on the login panel.
         * @type { ResourceStr }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        text: ResourceStr;
        /**
         * Tag identifying the privacy text that the user clicked.
         * The tag must be set when <b>TextType</b> is rich text.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        tag?: string;
    }
    /**
     * Defines attributes of the button for other login modes.
     * @typedef LoginPanelParams
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface OptionalLoginButtonAttr {
        /**
         * Text displayed on the button.
         * @type { ResourceStr }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        text: ResourceStr;
    }
    /**
     * Define the attributes of the area where other sign-in options are provided.
     * @typedef LoginIcon
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface LoginIcon {
        /**
         * Icon of the sign-in option.
         * @type { PixelMap | ResourceStr | DrawableDescriptor }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        icon: PixelMap | ResourceStr | DrawableDescriptor;
        /**
         * Tag identifying the icon that the user clicked.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        tag?: string;
    }
    /**
     * Define the attributes of the area where other sign-in options are provided.
     * @typedef OptionalLoginAreaAttr
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface OptionalLoginAreaAttr {
        /**
         * Sign-in icon list.
         * @type { LoginIcon[] }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        iconArray: LoginIcon[];
    }
    /**
     * Defines the information displayed on the login panel.
     * @typedef LoginPanelParams
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface LoginPanelParams {
        /**
         * App information.
         * @type { AppInfo }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        appInfo: AppInfo;
        /**
         * Privacy text.
         * @type { ?PrivacyText[] }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        privacyText?: PrivacyText[];
        /**
         * Button for other login modes.
         * @type { ?OptionalLoginButtonAttr }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        optionalLoginButtonAttr?: OptionalLoginButtonAttr;
        /**
         * HUAWEI ID login type.
         * @type { ?LoginType }
         * @default ID
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        loginType?: LoginType;
        /**
         * <b>AnonymousPhoneNumber</b> associated with the HUAWEI ID.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        anonymousPhoneNumber?: string;
        /**
         * Display the icon list for other sign-in options.
         * @type { ?OptionalLoginAreaAttr }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        optionalLoginAreaAttr?: OptionalLoginAreaAttr;
        /**
         * Display the SMS verification page if the mobile number associated
         * with a HUAWEI ID has not been verified by SMS in the past 90 days.
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        verifyPhoneNumber?: boolean;
    }
    /**
     * Defines the response returned for a successful login with the HUAWEI ID.
     * @typedef HuaweiIDCredential
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface HuaweiIDCredential {
        /**
         * <b>UnionID</b> associated with the HUAWEI ID. It is a unique user ID that remains the same
         * across the apps used by the user.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly unionID: string;
        /**
         * <b>OpenID</b> associated with the HUAWEI ID. It is a unique user ID that varies with the apps used by the user.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly openID: string;
        /**
         * Token used by the app to interact with the server.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly authorizationCode: string;
        /**
         * JSON Web Token (JWT) that ensures secure transfer of the user information to the app.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly idToken?: string;
    }
    /**
     * Defines the controller to interact with the login panel.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export class LoginPanelController {
        /**
         * Registers a callback to return the HUAWEI ID login response.
         * @param { AsyncCallback<HuaweiIDCredential> } callback - Callback invoked to return the HUAWEI ID login response.
         * AsyncCallback param err { BusinessError } Error code returned when the login fails.
         * { BusinessError } 401 - Parameter error.
         * Possible causes:
         *   1. Incorrect parameter types.
         *   2. Parameter verification failed.
         * { BusinessError } 1001500001 - Failed to check the fingerprint of the app bundle.
         * { BusinessError } 1001500002 - This error code is reported when a request is already being processed.
         * { BusinessError } 1001502001 - The user has not logged in with HUAWEI ID.
         * { BusinessError } 1001502002 - The application is not authorized.
         * { BusinessError } 1001502003 - Invalid input parameter value.
         * { BusinessError } 1001502005 - Network error.
         * { BusinessError } 1001502009 - Internal error.
         * { BusinessError } 1001502012 - The user canceled the authorization.
         * { BusinessError } 1001502014 - The app does not have the required scopes or permissions.
         * { BusinessError } 12300001 - System service works abnormally.
         * AsyncCallback param data { HuaweiIDCredential } Response returned when the login is successful.
         * @returns { LoginPanelController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Registers a callback to return the HUAWEI ID login response.
         * @param { AsyncCallback<HuaweiIDCredential> } callback - Callback invoked to return the HUAWEI ID login response.
         * AsyncCallback param err { BusinessError } Error code returned when the login fails.
         * { BusinessError } 401 - Parameter error.
         * Possible causes:
         *   1. Incorrect parameter types.
         *   2. Parameter verification failed.
         * { BusinessError } 1001500001 - Failed to check the fingerprint of the app bundle.
         * { BusinessError } 1001500002 - This error code is reported when a request is already being processed.
         * { BusinessError } 1001500003 - The scopes or permissions are not supported.
         * { BusinessError } 1001502001 - The user has not logged in with HUAWEI ID.
         * { BusinessError } 1001502002 - The application is not authorized.
         * { BusinessError } 1001502003 - Invalid input parameter value.
         * { BusinessError } 1001502005 - Network error.
         * { BusinessError } 1001502009 - Internal error.
         * { BusinessError } 1001502012 - The user canceled the authorization.
         * { BusinessError } 1001502014 - The app does not have the required scopes or permissions.
         * { BusinessError } 12300001 - System service works abnormally.
         * { BusinessError } 1005300001 - The user did not accept the agreement.
         * AsyncCallback param data { HuaweiIDCredential } Response returned when the login is successful.
         * @returns { LoginPanelController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onClickLoginWithHuaweiIDButton(callback: AsyncCallback<HuaweiIDCredential>): LoginPanelController;
        /**
         * Registers a callback to be invoked when the button for other login modes is clicked.
         * @param { AsyncCallback<void> } callback - Callback invoked when the button for other login modes is clicked.
         * @returns { LoginPanelController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        onClickOptionalLoginButton(callback: AsyncCallback<void>): LoginPanelController;
        /**
         * Registers a callback to be invoked when the privacy text is clicked.
         * @param { AsyncCallback<string> } callback - Callback invoked to return the tag of the privacy text clicked by the user.
         * @returns { LoginPanelController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        onClickPrivacyText(callback: AsyncCallback<string>): LoginPanelController;
        /**
         * Registers a callback to be invoked when the <b>Close</b> button is clicked.
         * @param { AsyncCallback<void> } callback - Callback invoked when the <b>Close</b> button is clicked.
         * @returns { LoginPanelController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        onClickCloseButton(callback: AsyncCallback<void>): LoginPanelController;
        /**
         * Register a callback to be triggered upon a click on one of the icons for other sign-in options.
         * @param { AsyncCallback<string> } callback - Callback triggered upon a click on one of the icons for other
         * sign-in options.
         * @returns { LoginPanelController } Return the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onClickOptionalLoginIcon(callback: AsyncCallback<string>): LoginPanelController;
        /**
         * Registers a callback to be triggered when a user accepts the agreement
         * or revokes their acceptance of the agreement.
         * @param { AsyncCallback<AgreementStatus> } callback - Callback to be triggered when a user accepts the agreement
         * or revokes their acceptance of the agreement.
         * @returns { LoginPanelController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onChangeAgreementStatus(callback: AsyncCallback<AgreementStatus>): LoginPanelController;
        /**
         * If you want to use a custom agreement page, you must first set the agreement status to NOT_ACCEPTED.
         * When a user taps the HUAWEI ID login button,
         * the error code indicating that the agreement is not accepted will be triggered.
         * Once the user accepts the agreement, set the agreement status to ACCEPTED.
         * @param { AgreementStatus } agreementStatus - The parameter indicates whether the user has accepted the agreement.
         * @returns { LoginPanelController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setAgreementStatus(agreementStatus: AgreementStatus): LoginPanelController;
        /**
         * Display the agreement page when a user clicks other sign-in options.
         * @returns { LoginPanelController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setShowAgreementForOptionalLogin(): LoginPanelController;
        /**
         * Register a callback to be triggered upon a tap on a button on the login panel.
         * @param { AsyncCallback<ClickEvent> } callback - Callback to be triggered
         * upon a tap on a button on the login panel.
         * @returns { LoginPanelController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onClickEvent(callback: AsyncCallback<ClickEvent>): LoginPanelController;
    }
    /**
     * Enumerates tap events.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export enum ClickEvent {
        /**
         * Taps the HUAWEI ID login button.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        HUAWEI_ID_LOGIN_BUTTON = 0
    }
    /**
     * Status enum values for whether a user accepts the agreement.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export enum AgreementStatus {
        /**
         * The user did not accept the agreement.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        NOT_ACCEPTED = 0,
        /**
         * The user has accepted the agreement.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ACCEPTED = 1
    }
    /**
     * Enumerates the styles of the HUAWEI ID login button.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export enum Style {
        /**
         * The button is red, and the border radius can be set.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BUTTON_RED = 0,
        /**
         * The button is white, and the border radius can be set.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BUTTON_WHITE = 1,
        /**
         * The button is white with a border, and the border radius can be set.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BUTTON_WHITE_OUTLINE = 2,
        /**
         * The button is black, and the border radius can be set.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BUTTON_BLACK = 3,
        /**
         * The button uses a red icon.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ICON_RED = 4,
        /**
         * The button uses a white icon.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ICON_WHITE = 5,
        /**
         * The button uses a white icon with a border.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ICON_WHITE_OUTLINE = 6,
        /**
         * The button uses a black icon.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ICON_BLACK = 7,
        /**
         * The button uses a red icon and gray background color.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ICON_GRAY = 8,
        /**
         * The button is gray and the border radius can be set.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        BUTTON_GRAY = 9,
        /**
         * The button with text can be customized.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        BUTTON_CUSTOM = 10
    }
    /**
     * Enumerates the color options available for BUTTON_CUSTOM.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export enum FontColor {
        /**
         * White.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        WHITE = 0,
        /**
         * Black.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        BLACK = 1
    }
    /**
     * Defines the params of BUTTON_CUSTOM.
     * @typedef CustomButtonParams
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface CustomButtonParams {
        /**
         * Font color.
         * @type { ?FontColor }
         * @default FontColor.WHITE
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        fontColor?: FontColor;
        /**
         * Background color.
         * @type { ?ResourceColor }
         * @default Red
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        backgroundColor?: ResourceColor;
    }
    /**
     * Defines the attributes of the HUAWEI ID login button.
     * @typedef LoginWithHuaweiIDButtonParams
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface LoginWithHuaweiIDButtonParams {
        /**
         * Style of the button.
         * @type { Style }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        style: Style;
        /**
         * Border radius of the button.
         * @type { ?number }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        borderRadius?: number;
        /**
         * Radius of the icon on the button.
         * @type { ?number }
         * @default 24
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        iconRadius?: number;
        /**
         * Whether to support the dark mode. If it is <b>true</b>, the button style changes with the system.
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        supportDarkMode?: boolean;
        /**
         * HUAWEI ID login type.
         * @type { ?LoginType }
         * @default ID
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        loginType?: LoginType;
        /**
         * The button can show a combination of text and icon.
         * This parameter can be used only when Style is set to button-related settings (BUTTON_RED, BUTTON_WHITE,
         * BUTTON_WHITE_OUTLINE, BUTTON_GRAY, or BUTTON_BLACK).
         * @type { ?boolean }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        textAndIconStyle?: boolean;
        /**
         * The params of BUTTON_CUSTOM.
         * @type { ?CustomButtonParams }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        customButtonParams?: CustomButtonParams;
        /**
         * Display the SMS verification page if the mobile number associated
         * with a HUAWEI ID has not been verified by SMS in the past 90 days.
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        verifyPhoneNumber?: boolean;
    }
    /**
     * Defines the controller to interact with the button for login with a HUAWEI ID.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export class LoginWithHuaweiIDButtonController {
        /**
         * Registers a callback to return the HUAWEI ID login response.
         * @param { AsyncCallback<HuaweiIDCredential> } callback - Callback invoked to return the HUAWEI ID login response.
         * AsyncCallback param err { BusinessError } Error code returned when the login fails.
         * { BusinessError } 401 - Parameter error.
         * Possible causes:
         *   1. Incorrect parameter types.
         *   2. Parameter verification failed.
         * { BusinessError } 1001500001 - Failed to check the fingerprint of the app bundle.
         * { BusinessError } 1001500002 - This error code is reported when a request is already being processed.
         * { BusinessError } 1001502001 - The user has not logged in with HUAWEI ID.
         * { BusinessError } 1001502002 - The application is not authorized.
         * { BusinessError } 1001502003 - Invalid input parameter value.
         * { BusinessError } 1001502005 - Network error.
         * { BusinessError } 1001502009 - Internal error.
         * { BusinessError } 1001502012 - The user canceled the authorization.
         * { BusinessError } 1001502014 - The app does not have the required scopes or permissions.
         * { BusinessError } 12300001 - System service works abnormally.
         * AsyncCallback param data { HuaweiIDCredential } Response returned when the login is successful.
         * @returns { LoginWithHuaweiIDButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Registers a callback to return the HUAWEI ID login response.
         * @param { AsyncCallback<HuaweiIDCredential> } callback - Callback invoked to return the HUAWEI ID login response.
         * AsyncCallback param err { BusinessError } Error code returned when the login fails.
         * { BusinessError } 401 - Parameter error.
         * Possible causes:
         *   1. Incorrect parameter types.
         *   2. Parameter verification failed.
         * { BusinessError } 1001500001 - Failed to check the fingerprint of the app bundle.
         * { BusinessError } 1001500002 - This error code is reported when a request is already being processed.
         * { BusinessError } 1001500003 - The scopes or permissions are not supported.
         * { BusinessError } 1001502001 - The user has not logged in with HUAWEI ID.
         * { BusinessError } 1001502002 - The application is not authorized.
         * { BusinessError } 1001502003 - Invalid input parameter value.
         * { BusinessError } 1001502005 - Network error.
         * { BusinessError } 1001502009 - Internal error.
         * { BusinessError } 1001502012 - The user canceled the authorization.
         * { BusinessError } 1001502014 - The app does not have the required scopes or permissions.
         * { BusinessError } 12300001 - System service works abnormally.
         * { BusinessError } 1005300001 - The user did not accept the agreement.
         * AsyncCallback param data { HuaweiIDCredential } Response returned when the login is successful.
         * @returns { LoginWithHuaweiIDButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onClickLoginWithHuaweiIDButton(callback: AsyncCallback<HuaweiIDCredential>): LoginWithHuaweiIDButtonController;
        /**
         * If a user is required to accept the agreement before logging in with HUAWEI ID,
         * set the agreement status to NOT_ACCEPTED first.
         * After the user accepts the agreement, set the status to ACCEPTED.
         * @param { AgreementStatus } agreementStatus - The parameter indicates whether the user has accepted the agreement.
         * @returns { LoginWithHuaweiIDButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setAgreementStatus(agreementStatus: AgreementStatus): LoginWithHuaweiIDButtonController;
        /**
         * Register a callback to be triggered upon a tap on the HUAWEI ID login button.
         * @param { AsyncCallback<ClickEvent> } callback - Callback to be triggered
         * upon a tap on the HUAWEI ID login button.
         * @returns { LoginWithHuaweiIDButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onClickEvent(callback: AsyncCallback<ClickEvent>): LoginWithHuaweiIDButtonController;
        /**
         * If the value is true, the component is available and can respond to operations such as clicking.
         * If it is set to false, click operations are not responded.
         * @param { boolean } enabled - The enabled attribute of the HUAWEI ID login button.
         * @returns { LoginWithHuaweiIDButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        setEnabled(enabled: boolean): LoginWithHuaweiIDButtonController;
        /**
         * When the user clicks the HUAWEI ID login button, a consent agreement pop-up box pops up.
         * In the scenario where the user clicks to agree to the agreement and logs in, this method can be called.
         * @param { AsyncCallback<void> } callback - Callback invoked
         * when the user clicks to agree to the agreement and logs in.
         * AsyncCallback param err { BusinessError } Error code returned
         * when the user did not click the HUAWEI ID login button.
         * @throws { BusinessError } 1005300002 - The user did not click the HUAWEI ID login button.
         * @returns { LoginWithHuaweiIDButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.UIComponent
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        continueLogin(callback: AsyncCallback<void>): LoginWithHuaweiIDButtonController;
    }
}
export { LoginPanel, LoginWithHuaweiIDButton, loginComponentManager };
