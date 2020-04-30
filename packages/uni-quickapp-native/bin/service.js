"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.getProjectName = getProjectName, exports.getServerAddress = getServerAddress, exports.getClientFromRequest =
  getClientFromRequest, exports.getDistFilePath = getDistFilePath, exports.serverConf = serverConf, exports.LINK_MODE =
  void 0;
var _path = _interopRequireDefault(require("path")),
  _fs = _interopRequireDefault(require("fs")),
  _sharedUtils = require("@hap-toolkit/shared-utils");

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
const LINK_MODE = {
  NULL: 0,
  WIFI: 1,
  ADB: 2
};

function getProjectName(e, t) {
  try {
    const stripJsonComments = require('strip-json-comments');
    const r = _path.default.join(e, t, "manifest.json");
    const s = JSON.parse(stripJsonComments(_fs.default.readFileSync(r).toString()))
    return s && s['quickapp-native'] && s['quickapp-native']['package'] || s.name || "Bundle"
  } catch (e) {
    _sharedUtils.colorconsole.error(`### App Server ### 获取项目名称出错：${e.message}`)
  }
}

function getServerAddress(e) {
  return `http://${(0,_sharedUtils.getIPv4IPAddress)()}${80===e?"":":"+e}`
}

function getClientFromRequest(e) {
  const t = (0, _sharedUtils.getClientIPAddress)(e),
    r = (0, _sharedUtils.getIPv4IPAddress)(),
    s = e.header["device-serial-number"];
  let i = LINK_MODE.NULL;
  return "127.0.0.1" === t && s ? i = LINK_MODE.ADB : "127.0.0.1" !== t && t !== r && (i = LINK_MODE.WIFI), {
    clientIp: t,
    sn: s,
    linkMode: i
  }
}

function getDistFilePath(e, t, r) {
  let s;
  if (!process.env.UNI_OUTPUT_DIR) {
    const mode = process.env.NODE_ENV === 'production' ? 'build' : 'dev'
    process.env.UNI_OUTPUT_DIR = _path.default.join(process.cwd(), 'dist/' + mode + '/quickapp-native')
  }
  return s = _path.default.join(process.env.UNI_OUTPUT_DIR, `${t}.debug.${r}`), _fs.default.existsSync(s) ? s : (s =
    _path.default.join(e,
      `${t}.release.${r}`), _fs.default.existsSync(s) ? s : void 0)
}

function serverConf(e) {
  return e.conf
}
exports.LINK_MODE = LINK_MODE;
