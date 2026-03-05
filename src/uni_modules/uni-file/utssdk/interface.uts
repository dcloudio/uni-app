export type LegacySaveFileSuccess = {
    savedFilePath: string;
};
export type LegacySaveFileSuccessCallback = (res: LegacySaveFileSuccess) => void;
export type LegacySaveFileFail = {};
export type LegacySaveFileFailCallback = (res: LegacySaveFileFail) => void;
export type LegacySaveFileCompleteCallback = (res: any) => void;
export type LegacySaveFileOptions = {
    tempFilePath: string;
    success?: LegacySaveFileSuccessCallback | null;
    fail?: LegacySaveFileFailCallback | null;
    complete?: LegacySaveFileCompleteCallback | null;
};

export type LegacyGetFileInfoSuccess = {
    digest: string;
    size: number;
};
export type LegacyGetFileInfoSuccessCallback = (res: LegacyGetFileInfoSuccess) => void;
export type LegacyGetFileInfoFail = {};
export type LegacyGetFileInfoFailCallback = (res: LegacyGetFileInfoFail) => void;
export type LegacyGetFileInfoCompleteCallback = (res: any) => void;
export type LegacyGetFileInfoOptions = {
    filePath: string;
    digestAlgorithm?: string | null;
    success?: LegacyGetFileInfoSuccessCallback | null;
    fail?: LegacyGetFileInfoFailCallback | null;
    complete?: LegacyGetFileInfoCompleteCallback | null;
};

export type LegacyGetSavedFileInfoSuccess = {
    size: number;
    createTime: number;
};
export type LegacyGetSavedFileInfoSuccessCallback = (res: LegacyGetSavedFileInfoSuccess) => void;
export type LegacyGetSavedFileInfoFail = {};
export type LegacyGetSavedFileInfoFailCallback = (res: LegacyGetSavedFileInfoFail) => void;
export type LegacyGetSavedFileInfoCompleteCallback = (res: any) => void;
export type LegacyGetSavedFileInfoOptions = {
    filePath: string;
    success?: LegacyGetSavedFileInfoSuccessCallback | null;
    fail?: LegacyGetSavedFileInfoFailCallback | null;
    complete?: LegacyGetSavedFileInfoCompleteCallback | null;
};

export type LegacyRemoveSavedFileSuccess = {};
export type LegacyRemoveSavedFileSuccessCallback = (res: LegacyRemoveSavedFileSuccess) => void;
export type LegacyRemoveSavedFileFail = {};
export type LegacyRemoveSavedFileFailCallback = (res: LegacyRemoveSavedFileFail) => void;
export type LegacyRemoveSavedFileCompleteCallback = (res: any) => void;
export type LegacyRemoveSavedFileOptions = {
    filePath: string;
    success?: LegacyRemoveSavedFileSuccessCallback | null;
    fail?: LegacyRemoveSavedFileFailCallback | null;
    complete?: LegacyRemoveSavedFileCompleteCallback | null;
};

export type LegacySavedFileListItem = {
	/**
	 * 文件路径。自 `4.65` 起，返回 `unifile://` 协议的路径
	 */
    filePath: string;
    size: number;
    createTime: number;
};
export type LegacyGetSavedFileListSuccess = {
    fileList: LegacySavedFileListItem[];
};
export type LegacyGetSavedFileListSuccessCallback = (res: LegacyGetSavedFileListSuccess) => void;
export type LegacyGetSavedFileListFail = {};
export type LegacyGetSavedFileListFailCallback = (res: LegacyGetSavedFileListFail) => void;
export type LegacyGetSavedFileListCompleteCallback = (res: any) => void;
export type LegacyGetSavedFileListOptions = {
    success?: LegacyGetSavedFileListSuccessCallback | null;
    fail?: LegacyGetSavedFileListFailCallback | null;
    complete?: LegacyGetSavedFileListCompleteCallback | null;
};

export type SaveFile = (options?: LegacySaveFileOptions | null) => void;
export type GetFileInfo = (options?: LegacyGetFileInfoOptions | null) => void;
export type GetSavedFileInfo = (options?: LegacyGetSavedFileInfoOptions | null) => void;
export type RemoveSavedFile = (options?: LegacyRemoveSavedFileOptions | null) => void;
export type GetSavedFileList = (options?: LegacyGetSavedFileListOptions | null) => void;


export interface Uni {
    /**
     * 保存文件
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/file/file.html#savefile
     * @uniPlatform {
     *    "app": {
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.25",
     *        "unixVer": "4.61",
     *        "unixvVer": "5.0"
     *      }
     *  },
     *  "mp": {
     *    "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "4.41"
     *    },
     *    "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "lark": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "qq": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "jd": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    }
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     * @uniVueVersion 2,3  //支持的vue版本
     */
    saveFile(options?: LegacySaveFileOptions | null): void;
    /**
     * 获取本地已保存的文件列表
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/file/file.html#getsavedfilelist
     * @uniPlatform {
     *    "app": {
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.25",
     *        "unixVer": "4.61",
     *        "unixvVer": "5.0"
     *      }
     *  },
     *  "mp": {
     *    "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "4.41"
     *    },
     *    "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "lark": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "qq": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "jd": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    }
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     * @uniVueVersion 2,3  //支持的vue版本
     */
    getSavedFileList(options?: LegacyGetSavedFileListOptions | null): void;
    /**
     * 获取已保存到本地的文件信息
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/file/file.html#getsavedfileinfo
     * @uniPlatform {
     *    "app": {
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.25",
     *        "unixVer": "4.61",
     *        "unixvVer": "5.0"
     *      }
     *  },
     *  "mp": {
     *    "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "4.41"
     *    },
     *    "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "lark": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "qq": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "jd": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    }
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     * @uniVueVersion 2,3  //支持的vue版本
     */
    getSavedFileInfo(options?: LegacyGetSavedFileInfoOptions | null): void;
    /**
     * 删除已保存的文件
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/file/file.html#removesavedfile
     * @uniPlatform {
     *    "app": {
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.25",
     *        "unixVer": "4.61",
     *        "unixvVer": "5.0"
     *      }
     *  },
     *  "mp": {
     *    "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "4.41"
     *    },
     *    "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "lark": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "qq": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "jd": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    }
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     * @uniVueVersion 2,3  //支持的vue版本
     */
    removeSavedFile(options?: LegacyRemoveSavedFileOptions | null): void;
    /**
     * 获取文件信息
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/file/file.html#getfileinfo
     * @uniPlatform {
     *    "app": {
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.25",
     *        "unixVer": "4.61",
     *        "unixvVer": "5.0"
     *      }
     *  },
     *  "mp": {
     *    "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "4.41"
     *    },
     *    "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "lark": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "qq": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "jd": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    }
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     * @uniVueVersion 2,3  //支持的vue版本
     */
    getFileInfo(options?: LegacyGetFileInfoOptions | null): void;
}
