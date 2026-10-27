import type { FileSystemManagerState } from './file-system-manager-state.ts'

export type BufferActions = {
  testReadFileBuffer : () => void
  testWriteReadFileBuffer : () => void
  testReadFileSyncBuffer : () => void
  testWriteReadFileSyncBuffer : () => void
  // #ifndef MP-ALIPAY
  testWriteReadBuffer : () => void
  testWriteReadSyncBuffer : () => void
  testAppendFileBufferSync : () => void
  testAppendFileBuffer : () => void
  // #endif
}

export const createBufferActions = (
  data : FileSystemManagerState
  // #ifndef MP-ALIPAY
  , openFileSyncTest : (param : string, isTest : boolean) => string
  // #endif
) : BufferActions => {
  const testReadFileBuffer = () => {
    const fs = uni.getFileSystemManager()
    const options : ReadFileOptions = {
      filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,

      success: (res) => {

        console.log(res)
        // let uint8Array = new Uint8Array(res.data as ArrayBuffer)
        // for (let i = 0; i < uint8Array.length; i++) {
        // 	console.log(`Byte ${i}: ${uint8Array[i]}`);
        // }
        let float64 = new Float64Array(res.data as ArrayBuffer)
        if (data.logAble) {
          for (let i = 0; i < float64.length; i++) {
            if (data.logAble) {
              data.log += 'testReadFileBuffer success ：' + `Byte ${i}: ${float64[i]}` + '\n\n'
            }
          }
        }
        data.arrayBufferRes = float64[1] //1.2222222
        console.log(data.arrayBufferRes)
      },
      fail: (res) => {
        if (data.logAble) {
          data.log += 'testReadFileBuffer fail:' + JSON.stringify(res) + '\n\n'
        }
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
        console.error(res)
      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    }
    fs.readFile(options)
  }

  const testWriteReadFileBuffer = () => {
    const fs = uni.getFileSystemManager()
    let buffer = new ArrayBuffer(16)
    let float64 = new Float64Array(buffer)
    float64[1] = 1.2222222
    const options : WriteFileOptions = {
      filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
      // data: 'test some',
      data: buffer,
      // encoding: 'ascii',
      success: (res) => {
        if (data.logAble) {
          data.log += 'testWriteReadFileBuffer ：' + res.errMsg + '\n\n'
        }
        console.log(res)
        testReadFileBuffer()
      },
      fail: (res) => {
        if (data.logAble) {
          data.log += 'testWriteReadFileBuffer fail:' + JSON.stringify(res) + '\n\n'
        }
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

        console.error(res)
        data.done = true
      },
      complete: (_ : any) => {

      }
    }
    fs.writeFile(options)
  }

  const testReadFileSyncBuffer = () => {
    try {
      const fs = uni.getFileSystemManager()
      let res = fs.readFileSync(`${uni.env.USER_DATA_PATH}/hello.txt`, null)
      console.log(res)
      let float64 = new Float64Array(res as ArrayBuffer)
      for (let i = 0; i < float64.length; i++) {
        if (data.logAble) {
          data.log += 'testReadFileSyncBuffer success:' + `Byte ${i}: ${float64[i]}` + '\n\n'
        }
        console.log(`Byte ${i}: ${float64[i]}`);
      }
      data.arrayBufferRes = float64[1] // 1.333
      console.log(data.arrayBufferRes)
    } catch (e) {
      if (data.logAble) {
        data.log += 'testReadFileSyncBuffer fail:' + JSON.stringify(e) + '\n\n'
      }
      data.done = true
    }
  }

  const testWriteReadFileSyncBuffer = () => {
    try {
      const fs = uni.getFileSystemManager()
      let buffer = new ArrayBuffer(16)
      // let int8 = new Int8Array(buffer)
      // int8[1] = 20
      let float64 = new Float64Array(buffer)
      float64[1] = 1.333
      fs.writeFileSync(`${uni.env.USER_DATA_PATH}/hello.txt`, buffer, 'utf-8')
      if (data.logAble) {
        data.log += 'testWriteReadFileSyncBuffer success' + '\n\n'
      }
      testReadFileSyncBuffer()
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'testWriteReadFileSyncBuffer fail:' + JSON.stringify(e) + '\n\n'
      }
      data.done = true
    }
  }

  // #ifndef MP-ALIPAY
  const testWriteReadBuffer = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.mkdirSync(`${data.basePath}${data.mkdirFile}`, true)
    } catch (e) {
      console.log(`mkdirSync fail:${e}`)
    }

    let buffer = new ArrayBuffer(24)
    let float64 = new Float64Array(buffer)
    float64[1] = 1.24
    float64[2] = 1.33

    const options : WriteOptions = {
      fd: openFileSyncTest('w+', false),
      length: 16,
      offset: 8,
      data: buffer,
      position: 10,
      success: (res : WriteResult) => {
        console.log("success", res)

        const ab = new ArrayBuffer(24)
        const readOptions : ReadOption = {
          arrayBuffer: ab,
          fd: openFileSyncTest('a+', false),
          length: 8,
          position: 10,
          success: (res : ReadSuccessCallbackResult) => {
            console.log(res)
            let value = new Float64Array(res.arrayBuffer)
            for (let i = 0; i < value.length; i++) {
              console.log(`Byte ${i}: ${value[i]}`);
              if (data.logAble) {
                data.log += 'testWriteReadBuffer success:' + `Byte ${i}: ${value[i]}` + '\n\n'
              }
            }
            data.arrayBufferRes = value[0] //1.24
            console.log(data.arrayBufferRes)
          },
          fail: (res) => {
            console.log(res)
            data.done = true
            if (res instanceof UniError) {
              data.lastCompleteError = res
            }
          },
          complete: (res : any) => {
            console.log("complete", res)
            data.done = true
            if (res instanceof UniError) {
              data.lastCompleteError = res
            }
          }
        }
        fileManager.read(readOptions)
      },
      fail: (res : IUniError) => {
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      },
      complete: (_) => {

      }

    }
    fileManager.write(options)
  }
  const testWriteReadSyncBuffer = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.mkdirSync(`${data.basePath}${data.mkdirFile}`, true)
    } catch (e) {
    }
    try {

      let buffer = new ArrayBuffer(24)
      let float64 = new Float64Array(buffer)
      float64[1] = 1.11
      float64[2] = 1.33
      const writeOptions : WriteSyncOptions = {
        fd: openFileSyncTest('w+', false),
        // data: data.writeData,
        data: buffer,
        length: 16,
        offset: 8,
        position: 10,
        encoding: "utf-8"
      }
      let ret = fileManager.writeSync(writeOptions)
      console.log("success", ret)

      const ab = new ArrayBuffer(24)
      const readOptions : ReadSyncOption = {
        arrayBuffer: ab,
        fd: openFileSyncTest('a+', false),
        length: 8,
        offset: 8,
        position: 10
      }
      let res = fileManager.readSync(readOptions)
      console.log(res)
      let value = new Float64Array(res.arrayBuffer)
      for (let i = 0; i < value.length; i++) {
        if (data.logAble) {
          data.log += 'testWriteReadSyncBuffer success ：' + `Byte ${i}: ${value[i]}` + '\n\n'
        }
      }
      data.done = true
      data.arrayBufferRes = float64[1] //1.11
      console.log(data.arrayBufferRes)
    } catch (e) {
      data.done = true
      console.error(e)
    }
  }


  const testAppendFileBufferSync = () => {
    // 同步接口
    const fs = uni.getFileSystemManager()
    try {
      let buffer = new ArrayBuffer(24)
      let float64 = new Float64Array(buffer)
      float64[1] = 1.2222222
      float64[2] = 1.33
      const openWriteOptions : OpenFileSyncOptions = {
        filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
        flag: 'w+'
      }
      const writeOptions : WriteSyncOptions = {
        fd: fs.openSync(openWriteOptions),
        data: buffer,
        length: 16,
        offset: 8,
        position: 10
      }
      let ret = fs.writeSync(writeOptions)
      console.log(ret)


      buffer = new ArrayBuffer(16)
      float64 = new Float64Array(buffer)
      float64[0] = 20
      fs.appendFileSync(`${uni.env.USER_DATA_PATH}/hello.txt`, buffer, null)
      const ab = new ArrayBuffer(32)
      // 打开文件
      // 读取文件到 ArrayBuffer 中
      const openReadOptions : OpenFileSyncOptions = {
        filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
        flag: 'a+',
      }
      const readOptions : ReadSyncOption = {
        fd: fs.openSync(openReadOptions),
        arrayBuffer: ab,
        length: 24,
        position: 10,
        offset: 8
      }
      let readResult = fs.readSync(readOptions)
      console.log(readResult)
      float64 = new Float64Array(readResult.arrayBuffer)

      for (let i = 0; i < float64.length; i++) {
        if (data.logAble) {
          data.log += 'testAppendFileBufferSync success ：' + `Byte ${i}: ${float64[i]}` + '\n\n'
        }
        console.log(`Byte ${i}: ${float64[i]}`);
      }
      data.arrayBufferRes = float64[3] //20
      console.log(data.arrayBufferRes)
      data.done = true
    } catch (e) {
      data.done = true
      if (data.logAble) {
        data.log += 'testAppendFileBufferSync fail:' + JSON.stringify(e) + '\n\n'
      }
      console.error(e)
    }
  }

  const testAppendFileBuffer = () => {
    // 同步接口
    const fs = uni.getFileSystemManager()
    try {
      let buffer = new ArrayBuffer(24)
      let float64 = new Float64Array(buffer)
      float64[1] = 1.2222222
      float64[2] = 1.33
      const openWriteOptions : OpenFileSyncOptions = {
        filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
        flag: 'w+'
      }
      const writeOptions : WriteSyncOptions = {
        fd: fs.openSync(openWriteOptions),
        data: buffer,
        length: 16,
        offset: 8,
        position: 10
      }
      let ret = fs.writeSync(writeOptions)
      console.log(ret)

      buffer = new ArrayBuffer(16)
      float64 = new Float64Array(buffer)
      float64[0] = 21
      const appendOptions : AppendFileOptions = {
        filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
        data: buffer,
        success: (res) => {
          console.log(res)
          const ab = new ArrayBuffer(32)
          // 打开文件
          // 读取文件到 ArrayBuffer 中
          const openReadOptions : OpenFileSyncOptions = {
            filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
            flag: 'a+',
          }
          const readOptions : ReadSyncOption = {
            fd: fs.openSync(openReadOptions),
            arrayBuffer: ab,
            length: 24,
            position: 10,
            offset: 8
          }
          let readResult = fs.readSync(readOptions)
          console.log(readResult)
          float64 = new Float64Array(readResult.arrayBuffer)

          for (let i = 0; i < float64.length; i++) {
            console.log(`Byte ${i}: ${float64[i]}`);
            if (data.logAble) {
              data.log += 'testAppendFileBuffer success ：' + `Byte ${i}: ${float64[i]}` + '\n\n'
            }
          }
          data.arrayBufferRes = float64[3] //21
          console.log(data.arrayBufferRes)
        },
        fail: (res) => {
          console.log(res)
        },
        complete: (_) => {
          data.done = true
        }
      }
      fs.appendFile(appendOptions)

    } catch (e) {
      data.done = true
      if (data.logAble) {
        data.log += 'testAppendFileBufferSync fail:' + JSON.stringify(e) + '\n\n'
      }
      console.error(e)
    }
  }
  // #endif
  return {
    testReadFileBuffer,
    testWriteReadFileBuffer,
    testReadFileSyncBuffer,
    testWriteReadFileSyncBuffer,
    // #ifndef MP-ALIPAY
    testWriteReadBuffer,
    testWriteReadSyncBuffer,
    testAppendFileBufferSync,
    testAppendFileBuffer,
    // #endif
  }
}
