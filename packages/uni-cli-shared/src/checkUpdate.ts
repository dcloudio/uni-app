import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import debug from 'debug'
import crypto from 'crypto'
import { request } from 'https'
import compareVersions from 'compare-versions'
import { hasOwn, isString, isPlainObject } from '@vue/shared'

import { parseManifestJsonOnce } from './json'
import { isInHBuilderX } from './hbx'

const debugCheckUpdate = debug('vite:uni:check-update')

interface CheckUpdateOptions {
  inputDir: string
  compilerVersion: string
  versionType: 'a' | 'r' // alpha | release
}

interface CheckUpdatePlatform {
  appid?: string
  dev: number
  build: number
}

interface CheckUpdateCache {
  vid: string
  lastCheck: number
  newVersion?: string
  note?: string
  [name: string]: CheckUpdatePlatform | undefined | string | number
}

interface CheckVersionRequest {
  vv: 3
  device: string
  appid?: string
  vid?: string
  vtype: CheckUpdateOptions['versionType']
  vcode: string
  [name: string]: CheckUpdatePlatform | undefined | string | number
}

interface CheckVersionResponse {
  code: number
  msg: string
  isUpdate: boolean
  newVersion: string
  note: string
}

const INTERVAL = 1000 * 60 * 60 * 24

export async function checkUpdate(options: CheckUpdateOptions) {
  if (process.env.CI) {
    debugCheckUpdate('isInCI')
    return
  }
  if (isInHBuilderX()) {
    debugCheckUpdate('isInHBuilderX')
    return
  }
  const { inputDir, compilerVersion } = options
  const updateCache = readCheckUpdateCache(inputDir)
  debugCheckUpdate('read.cache', updateCache)
  const res = checkLocalCache(updateCache, compilerVersion)
  if (res) {
    if (isString(res)) {
      console.log()
      console.log(res)
    }
  } else {
    await checkVersion(
      options,
      normalizeUpdateCache(updateCache, parseManifestJsonOnce(inputDir))
    )
  }
  writeCheckUpdateCache(
    inputDir,
    statUpdateCache(normalizeUpdateCache(updateCache))
  )
}

function normalizeUpdateCache(
  updateCache: CheckUpdateCache,
  manifestJson?: Record<string, any>
) {
  const platform = process.env.UNI_PLATFORM
  if (!updateCache[platform]) {
    updateCache[platform] = {
      appid: '',
      dev: 0,
      build: 0,
    }
  }
  if (manifestJson) {
    const platformOptions =
      manifestJson[platform === 'app' ? 'app-plus' : platform]
    ;(updateCache[platform] as CheckUpdatePlatform).appid = platformOptions
      ? platformOptions.appid || platformOptions.package || ''
      : ''
  }
  return updateCache
}

function statUpdateCache(updateCache: CheckUpdateCache) {
  debugCheckUpdate('stat.before', updateCache)
  const platform = process.env.UNI_PLATFORM
  const type = process.env.NODE_ENV === 'production' ? 'build' : 'dev'
  const platformOptions = updateCache[platform] as CheckUpdatePlatform
  platformOptions[type] = (platformOptions[type] || 0) + 1
  debugCheckUpdate('stat.after', updateCache)
  return updateCache
}

function getFilepath(inputDir: string, filename: string) {
  return path.resolve(os.tmpdir(), 'uni-app-cli', md5(inputDir), filename)
}

function getCheckUpdateFilepath(inputDir: string) {
  return getFilepath(inputDir, 'check-update.json')
}

function generateVid() {
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += ((65536 * (1 + Math.random())) | 0).toString(16).substring(1)
  }
  return 'UNI_' + result.toUpperCase()
}

function createCheckUpdateCache(vid: string = generateVid()): CheckUpdateCache {
  return {
    vid: generateVid(),
    lastCheck: 0,
  }
}

function readCheckUpdateCache(inputDir: string) {
  const updateFilepath = getCheckUpdateFilepath(inputDir)
  debugCheckUpdate('read:', updateFilepath)
  if (fs.existsSync(updateFilepath)) {
    try {
      return require(updateFilepath) as CheckUpdateCache
    } catch (e) {
      debugCheckUpdate('read.error', e)
    }
  }
  return createCheckUpdateCache()
}

/**
 * 检查本地缓存，返回 false 表示需要执行云端检查，返回 true 表示，无需云端检查，返回 string 表示，无需云端检测，且有更新
 * @param inputDir
 * @param compilerVersion
 * @param interval
 * @returns
 */
export function checkLocalCache(
  updateCache: CheckUpdateCache,
  compilerVersion: string,
  interval: number = INTERVAL
) {
  if (!updateCache.lastCheck) {
    debugCheckUpdate('cache: lastCheck not found')
    return false
  }
  if (Date.now() - updateCache.lastCheck > interval) {
    debugCheckUpdate('cache: lastCheck > interval')
    return false
  }
  if (
    updateCache.newVersion &&
    compareVersions(updateCache.newVersion, compilerVersion) > 0
  ) {
    debugCheckUpdate('cache: find new version')
    return updateCache.note!
  }
  return true
}

function writeCheckUpdateCache(
  inputDir: string,
  updateCache: CheckUpdateCache
) {
  const filepath = getCheckUpdateFilepath(inputDir)
  debugCheckUpdate('write:', filepath, updateCache)
  try {
    fs.outputFileSync(filepath, JSON.stringify(updateCache))
  } catch (e) {
    debugCheckUpdate('write.error', e)
  }
}

export function md5(str: string) {
  return crypto.createHash('md5').update(str).digest('hex')
}

export function getMac() {
  let mac = ''
  const network = os.networkInterfaces()
  for (const key in network) {
    const array = network[key]!
    for (let i = 0; i < array.length; i++) {
      const item = array[i]
      if (!item.family || (item.mac && item.mac === '00:00:00:00:00:00')) {
        continue
      }
      if (item.family === 'IPv4' || item.family === 'IPv6') {
        mac = item.mac
        break
      }
    }
  }
  return mac
}

export function createPostData(
  { versionType, compilerVersion }: CheckUpdateOptions,
  manifestJson: Record<string, any>,
  updateCache: CheckUpdateCache
) {
  const data: CheckVersionRequest = {
    vv: 3,
    device: md5(getMac()),
    vtype: versionType,
    vcode: compilerVersion,
  }
  if (manifestJson.appid) {
    data.appid = manifestJson.appid
  } else {
    data.vid = updateCache.vid
  }
  Object.keys(updateCache).forEach((name) => {
    const value = updateCache[name]
    if (
      isPlainObject(value) &&
      (hasOwn(value, 'dev') || hasOwn(value, 'build'))
    ) {
      data[name] = value
    }
  })
  return JSON.stringify(data)
}

function handleCheckVersion(
  { code, isUpdate, newVersion, note }: CheckVersionResponse,
  updateCache: CheckUpdateCache
) {
  if (code !== 0) {
    return
  }
  // clear
  Object.keys(updateCache).forEach((key) => {
    if (key !== 'vid') delete updateCache[key]
  })
  updateCache.lastCheck = Date.now()
  if (isUpdate) {
    updateCache.note = note
    updateCache.newVersion = newVersion
  } else {
    delete updateCache.note
    delete updateCache.newVersion
  }
}

const HOSTNAME = 'uniapp.dcloud.net.cn'
const PATH = '/update/cli'

function checkVersion(
  options: CheckUpdateOptions,
  updateCache: CheckUpdateCache
) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      id: createPostData(
        options,
        parseManifestJsonOnce(options.inputDir),
        updateCache
      ),
    })
    let responseData = ''
    const req = request(
      {
        hostname: HOSTNAME,
        path: PATH,
        port: 443,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length,
        },
      },
      (res) => {
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          responseData += chunk
        })
        res.on('end', () => {
          debugCheckUpdate('response: ', responseData)
          try {
            handleCheckVersion(JSON.parse(responseData), updateCache)
          } catch (e) {}
          resolve(true)
        })
        res.on('error', (e) => {
          debugCheckUpdate('response.error:', e)
          resolve(false)
        })
      }
    ).on('error', (e) => {
      debugCheckUpdate('request.error:', e)
      resolve(false)
    })
    debugCheckUpdate('request: ', postData)
    req.write(postData)
    req.end()
  })
}
