"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function isMusl() {
    // For Node 10
    if (!process.report || typeof process.report.getReport !== 'function') {
        try {
            return fs_1.default.readFileSync('/usr/bin/ldd', 'utf8').includes('musl');
        }
        catch (e) {
            return true;
        }
    }
    else {
        const { glibcVersionRuntime } = process.report.getReport().header;
        return !glibcVersionRuntime;
    }
}
function resolveNativeBinding() {
    const { platform, arch } = process;
    let nativeBinding = '';
    switch (platform) {
        case 'android':
            switch (arch) {
                case 'arm64':
                    nativeBinding = 'uts-android-arm64';
                    break;
                case 'arm':
                    nativeBinding = 'uts-android-arm-eabi';
                    break;
                default:
                    throw new Error(`Unsupported architecture on Android ${arch}`);
            }
            break;
        case 'win32':
            switch (arch) {
                case 'x64':
                    nativeBinding = 'uts-win32-x64-msvc';
                    break;
                case 'ia32':
                    nativeBinding = 'uts-win32-ia32-msvc';
                    break;
                case 'arm64':
                    nativeBinding = 'uts-win32-arm64-msvc';
                    break;
                default:
                    throw new Error(`Unsupported architecture on Windows: ${arch}`);
            }
            break;
        case 'darwin':
            switch (arch) {
                case 'x64':
                    nativeBinding = 'uts-darwin-x64';
                    break;
                case 'arm64':
                    nativeBinding = 'uts-darwin-arm64';
                    break;
                default:
                    throw new Error(`Unsupported architecture on macOS: ${arch}`);
            }
            break;
        case 'freebsd':
            if (arch !== 'x64') {
                throw new Error(`Unsupported architecture on FreeBSD: ${arch}`);
            }
            nativeBinding = 'uts-freebsd-x64';
            break;
        case 'linux':
            switch (arch) {
                case 'x64':
                    if (isMusl()) {
                        nativeBinding = 'uts-linux-x64-musl';
                    }
                    else {
                        nativeBinding = 'uts-linux-x64-gnu';
                    }
                    break;
                case 'arm64':
                    if (isMusl()) {
                        nativeBinding = 'uts-linux-arm64-musl';
                    }
                    else {
                        nativeBinding = 'uts-linux-arm64-gnu';
                    }
                    break;
                case 'arm':
                    nativeBinding = 'uts-linux-arm-gnueabihf';
                    break;
                default:
                    throw new Error(`Unsupported architecture on Linux: ${arch}`);
            }
            break;
        default:
            throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`);
    }
    return require('@dcloudio/' + nativeBinding);
}
exports.default = resolveNativeBinding();
