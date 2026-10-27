import type { FileSystemManagerState } from './file-system-manager-state.ts'

export type ContentActions = {
  // #ifdef APP
  testReadFileEncoding : (encoding : string) => void
  testReadFileArrayBuffer : () => void
  testReadFileSyncEncoding : (encoding : string) => void
  testReadFileSyncArrayBuffer : () => void
  copyFileByContent : () => void
  copyFileSyncByContent : () => void
  // #endif
  // #ifndef MP-ALIPAY
  testOpenFlagWrite : () => void
  testWriteLongString : () => void
  // #endif
}

export const createContentActions = (data : FileSystemManagerState) : ContentActions => {
  // #ifdef APP
  const testReadFileEncoding = (encoding : string) => {
    console.log('testEncoding', encoding)
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        uni.getFileSystemManager().readFile({
          filePath: e.tempFilePaths[0],
          encoding: encoding,
          success: (res) => {
            console.log('success:', (res.data as string).length)
          }
        })
      }
    })
  }
  const testReadFileArrayBuffer = () => {
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        uni.getFileSystemManager().readFile({
          filePath: e.tempFilePaths[0],
          success: (res) => {
            console.log('success:', (res.data as ArrayBuffer).byteLength)
          }
        })
      }
    })
  }
  const testReadFileSyncEncoding = (encoding : string) => {
    console.log('testEncoding', encoding)
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        try {
          let res = uni.getFileSystemManager().readFileSync(e.tempFilePaths[0], encoding)
          console.log('success:', (res as string).length)
        } catch (e) {
          console.log(e)
        }
      }
    })
  }
  const testReadFileSyncArrayBuffer = () => {
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        try {
          let res = uni.getFileSystemManager().readFileSync(e.tempFilePaths[0], null)
          console.log('success:', (res as ArrayBuffer).byteLength)
        } catch (e) {
          console.log(e)
        }
      }
    })
  }
  const copyFileByContent = () => {
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        uni.getFileSystemManager().copyFile({
          srcPath: e.tempFilePaths[0],
          destPath: uni.env.CACHE_PATH + 'copyFileByContent.jpg',
          complete: (res) => {
            console.log('success:', res)
          }
        })
      }
    })
  }
  const copyFileSyncByContent = () => {
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        try {
          let res = uni.getFileSystemManager().copyFileSync(e.tempFilePaths[0], uni.env.CACHE_PATH + 'copyFileSyncByContent.jpg',)
          console.log('success:', res)
        } catch (e) {
          console.log(e)
        }
      }
    })
  }
  // #endif
  // #ifndef MP-ALIPAY
  const testOpenFlagWrite = () => {
    try {
      uni.getFileSystemManager().mkdirSync(`${data.basePath}b/`,true)
      uni.getFileSystemManager().writeFileSync(`${data.basePath}b/t.txt`, "aaa", "utf-8")
    } catch(e:Error){}
    uni.getFileSystemManager().open({
    	filePath : `${data.basePath}b/t.txt`,
    	flag : "a+",
    	success : (res: OpenFileSuccessResult) => {
    		uni.getFileSystemManager().write({
    			fd : res.fd,
    			data : "appended",
    			position : 10,
          success:(e)=> {
            data.testOpenFlataplusWrite = true
          },
          fail:(e)=> {
            data.testOpenFlataplusWrite = false
          }
    		})
    	},
      fail(e) {}
    })
  }

  const testWriteLongString = () =>{
    try {
      uni.getFileSystemManager().mkdirSync(`${data.basePath}b/`,true)
      uni.getFileSystemManager().writeFileSync(`${data.basePath}b/t.txt`, "aaa", "utf-8")
    } catch(e:Error){}
    uni.getFileSystemManager().open({
    	filePath : `${data.basePath}b/t.txt`,
    	flag : "a+",
    	success : (res: OpenFileSuccessResult) => {
    		uni.getFileSystemManager().write({
    			fd : res.fd,
    			data : "appended long strings.appended long strings.appended long strings.appended long strings.appended long strings.",
    			position : 10,
          success:(e)=> {
            data.testOpenFlataplusWrite = true
          },
          fail:(e)=> {
            data.testOpenFlataplusWrite = false
          }
    		})
    	},
      fail(e) {}
    })
  }
  // #endif

  return {
    // #ifdef APP
    testReadFileEncoding,
    testReadFileArrayBuffer,
    testReadFileSyncEncoding,
    testReadFileSyncArrayBuffer,
    copyFileByContent,
    copyFileSyncByContent,
    // #endif
    // #ifndef MP-ALIPAY
    testOpenFlagWrite,
    testWriteLongString,
    // #endif
  }
}
