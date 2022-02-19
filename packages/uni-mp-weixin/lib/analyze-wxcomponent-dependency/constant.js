const WxMpFileExtension = {
    js: 'js',
    json: 'json',
    wxml: 'wxml',
    wxss: 'wxss',
};

module.exports = {
    MpComponentFileExtension: Object.values(WxMpFileExtension),
    WxMpFileExtension: Object.assign({}, WxMpFileExtension, { 'wxs': 'wxs' }),
};
