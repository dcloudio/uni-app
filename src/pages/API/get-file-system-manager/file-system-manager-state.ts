export type FileSystemManagerState = {
  log : string
  logAble : boolean
  fileListSuccess : string[]
  fileListComplete : string[]
  accessFileRet : string
  lastFailError : UniError
  lastCompleteError : UniError
  readDir : string
  readFileRet : string
  writeFileContent : string
  appendFileContent : string
  unlinkFile : string
  accessFile : string
  writeFile : string
  writeData : string
  brFile : string
  temFile : string
  copyFromFile : string
  copyToFile : string
  renameFromFile : string
  renameToFile : string
  statFile : string
  rmDirFile : string
  mkdirFile : string
  readFile : string
  recursiveVal : boolean
  done : boolean
  writeFileEncoding : string
  readFileEncoding : string
  statsRet : Array<FileStats>
  statsIsFileRet : boolean[]
  statsIsDirectoryRet : boolean[]
  statsMethodError : string
  unzipFile : string
  targetZip : string
  renameFileRet : string
  saveFileRet : string
  removeSavedFileRet : string
  fd : string
  closeFileRet : string
  bytesWritten : number
  fstat : Stats | null
  fstatSize : number
  ftruncateRet : string
  readZipFile : string
  compressedFileRet : string
  zipEntryNames : string[]
  getSavedFileListRet : string
  arrayBufferRes : number
  basePath : string
  copyToBasePath : string
  globalTempPath : string
  globalRootPath : string
  globalUserDataPath : string
  testOpenFlataplusWrite:boolean
}

export const createFileSystemManagerState = () : FileSystemManagerState => {
  const state : FileSystemManagerState = {
    log: "",
    /**
     * 自动化测试需要关闭log
     */
    logAble: true,
    fileListSuccess: [],
    fileListComplete: [],
    accessFileRet: '',
    lastFailError: new UniError("uni-file-manager", 1300000, "mock error"),
    lastCompleteError: new UniError("uni-file-manager", 1300000, "mock error"),
    readDir: 'a',
    readFileRet: "",
    writeFileContent: "中文 en.\r\n\t换行",
    appendFileContent: "append content",
    unlinkFile: 'a/1.txt',
    accessFile: 'a/1.txt',
    writeFile: 'a/1.txt',
    writeData: 'insert data哈哈哈',
    brFile: 'a/1.txt.br',
    temFile: 'a/1.txt',
    copyFromFile: 'a/1.txt',
    copyToFile: 'a/2.txt',
    renameFromFile: 'a/2.txt',
    renameToFile: 'a/3.txt',
    statFile: '',
    rmDirFile: 'a',
    mkdirFile: 'a',
    readFile: 'a/1.txt',
    recursiveVal: true,
    done: false,
    writeFileEncoding: "utf-8",
    readFileEncoding: "utf-8",
    statsRet: [],
    statsIsFileRet: [],
    statsIsDirectoryRet: [],
    statsMethodError: '',
    unzipFile: 'zip/1.zip',
    targetZip: "unzip",
    renameFileRet: '',
    saveFileRet: '',
    removeSavedFileRet: '',
    fd: '',
    closeFileRet: '',
    bytesWritten: 0,
    fstat: null,
    fstatSize: 0,
    ftruncateRet: '',
    readZipFile: 'to.zip',
    compressedFileRet: '',
    zipEntryNames: [],
    getSavedFileListRet: '',
    arrayBufferRes: 0,
    testOpenFlataplusWrite:false,
    /**
     * 待测试的全局环境变量
     */
    // #ifdef MP
    basePath: uni.env.USER_DATA_PATH + '/',
    copyToBasePath: uni.env.USER_DATA_PATH + '/',
    // TODO uni.env类型拉齐
    globalTempPath: uni.env.CACHE_PATH || '',
    globalRootPath: uni.env.SANDBOX_PATH || '',
    globalUserDataPath: uni.env.USER_DATA_PATH + '/',
    // #endif
    // #ifndef MP
    basePath: uni.env.USER_DATA_PATH,
    copyToBasePath: uni.env.USER_DATA_PATH,
    globalTempPath: uni.env.CACHE_PATH,
    globalRootPath: uni.env.SANDBOX_PATH,
    globalUserDataPath: uni.env.USER_DATA_PATH,
    // #endif
  }
  return state
}

