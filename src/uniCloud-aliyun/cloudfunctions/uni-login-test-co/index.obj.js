const configCenter = require("uni-config-center");
const config = configCenter({ pluginId: 'uni-login-test-co' }).requireFile('config.js');

module.exports = {
  _before: function() {

  },
  /**
   * App微信登录并返回openid
   * @param {string} code
   * @param {string} appid
   */

  async loginByWeixin(data = {}) {
    let {
      code,
      appid
    } = data;
    if (!code) {
      return { errCode: -1, errMsg: 'code参数不能为空' }
    }
    if (!appid) {
      return { errCode: -1, errMsg: 'appid参数不能为空' }
    }
    const secret = config.weixin[appid];
    if (!secret) {
      return { errCode: -1, errMsg: `appid：${appid} 未找到对应的 secret 配置` }
    }

    const url = `https://api.weixin.qq.com/sns/oauth2/access_token`;
    const res = await uniCloud.httpclient.request(url, {
      method: 'GET',
      data: {
        appid,
        secret,
        code,
        grant_type: "authorization_code"
      },
      contentType: 'json',
      dataType: 'json'
    });

    /* const res = {
       "data": {
         "access_token": "101_tmi6EalA41uRzkP8DScXi7BxXjRuuL_aHB8VGrMb7Ng6s1rmzWVV8dKCUXYTjpZMumRLChp_sJ-vGlH5GNwyapOWG3aXvRnPvDxW9lc0A5w",
         "expires_in": 7200,
         "refresh_token": "101_IxOQj08nKiwA86hqVJ7fIlwXabLyNwmUyOWw_ycfKt4bbfo46rjsul7CNEH5_SWS-SRt54Cj-MTZJ3pe7Dh3pgi7pR7SzaJkRPw47H8y666",
         "openid": "opjMn6YlpHJa1ZzVyAvMB5O7SabI",
         "scope": "snsapi_userinfo",
         "unionid": "oU5YytxRnXXHJlXKLQtIuJMcv9sc"
       },
       "status": 200,
       "headers": { "connection": "keep-alive", "content-type": "text/plain", "date": "Tue, 10 Mar 2026 08:42:51 GMT", "content-length": "385" }
     } */

    const wxRes = res.data;
    if (wxRes.errcode) {
      return { errCode: wxRes.errcode, errMsg: wxRes.errmsg }
    }

    const {
      access_token,
      openid,
      unionid
    } = res.data;

    const userInfoRes = await uniCloud.httpclient.request(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}$lang=zh-CN`, {
      method: 'GET',
      contentType: 'json',
      dataType: 'json'
    });

    const {
      nickname,
      headimgurl, // 头像不一定可以拿到
    } = userInfoRes.data;

    return {
      errCode: 0,
      openid,
      unionid,
      nickname,
      headimgurl
    }
  }

}
