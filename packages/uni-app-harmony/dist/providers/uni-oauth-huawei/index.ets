import { BusinessError } from '@kit.BasicServicesKit';
import { UniOAuthProvider, LoginOptions, LoginFail, LoginSuccess, GetUserInfoOptions, GetUserInfoFail, UserInfo, GetUserInfoSuccess } from "@dcloudio/uni-app-runtime";
import { authentication } from '@kit.AccountKit';
import { getAbilityContext } from "@dcloudio/uni-mp-sdk";
import { util } from '@kit.ArkTS';
interface UniOAuthHuaweiProvider extends UniOAuthProvider {
}
class UniOAuthHuaweiProviderImpl implements UniOAuthHuaweiProvider {
    id: string = "huawei";
    description: string = "华为登录";
    constructor(){}
    login(options: LoginOptions): void {
        let huaweiIdProvider = new authentication.HuaweiIDProvider();
        let loginRequest = huaweiIdProvider.createLoginWithHuaweiIDRequest();
        loginRequest.state = util.generateRandomUUID();
        try {
            let controller = new authentication.AuthenticationController(getAbilityContext()!);
            controller.executeRequest(loginRequest, (error: BusinessError<Object>, data)=>{
                if (error) {
                    options?.fail?.({
                        errCode: error.code,
                        errMsg: error.message
                    } as LoginFail);
                    return;
                }
                let loginWithHuaweiIDResponse = data as authentication.LoginWithHuaweiIDResponse;
                let state = loginWithHuaweiIDResponse.state;
                if (state == undefined || loginRequest.state != state) {
                    options?.fail?.({
                        errCode: 1001502040,
                        errMsg: '登录请求可能被跨站攻击'
                    } as LoginFail);
                    return;
                }
                let loginWithHuaweiIDCredential = loginWithHuaweiIDResponse.data!;
                let code = loginWithHuaweiIDCredential.authorizationCode;
                let idToken = loginWithHuaweiIDCredential.idToken;
                let openID = loginWithHuaweiIDCredential.openID;
                let unionID = loginWithHuaweiIDCredential.unionID;
                options?.success?.({
                    errMsg: 'login: ok',
                    code,
                    authResult: {
                        openid: openID,
                        idToken,
                        unionID
                    } as ESObject
                } as LoginSuccess);
            });
        } catch (error) {
            options?.fail?.({
                errCode: (error as BusinessError).code,
                errMsg: (error as BusinessError).message
            } as LoginFail);
        }
    }
    getUserInfo(options: GetUserInfoOptions): void {
        let authRequest = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest();
        authRequest.scopes = [
            'profile',
            'openid'
        ];
        authRequest.permissions = [
            'idtoken'
        ];
        authRequest.state = util.generateRandomUUID();
        try {
            let controller = new authentication.AuthenticationController(getAbilityContext()!);
            controller.executeRequest(authRequest, (error: BusinessError<Object>, data)=>{
                if (error) {
                    options?.fail?.({
                        errCode: error.code,
                        errMsg: error.message
                    } as GetUserInfoFail);
                    return;
                }
                let authorizationWithHuaweiIDResponse = data as authentication.AuthorizationWithHuaweiIDResponse;
                let state = authorizationWithHuaweiIDResponse.state;
                if (state != undefined && authRequest.state != state) {
                    return;
                }
                let authorizationWithHuaweiIDCredential = authorizationWithHuaweiIDResponse.data!;
                let avatarUri = authorizationWithHuaweiIDCredential.avatarUri;
                let nickName = authorizationWithHuaweiIDCredential.nickName;
                let openId = authorizationWithHuaweiIDCredential.openID;
                options?.success?.({
                    errMsg: 'getUserInfo: ok',
                    userInfo: {
                        nickName,
                        avatarUrl: avatarUri,
                        openId
                    } as UserInfo
                } as GetUserInfoSuccess);
            });
        } catch (error) {
            options?.fail?.({
                errCode: (error as BusinessError).code,
                errMsg: (error as BusinessError).message
            } as GetUserInfoFail);
        }
    }
}
export { UniOAuthHuaweiProviderImpl as UniOAuthHuaweiProviderImpl };
