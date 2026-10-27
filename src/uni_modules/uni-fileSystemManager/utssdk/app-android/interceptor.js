function restoreStatsMethods(stats) {
    stats.isFile = function () {
        return this.mIsFile
    }
    stats.isDirectory = function () {
        return !this.mIsFile
    }
}

function wrapStatsCallback(callback) {
    return function (result) {
        if (result != null && result.stats != null) {
            if (Array.isArray(result.stats)) {
                result.stats.forEach(fileStats => {
                    restoreStatsMethods(fileStats.stats)
                })
            } else {
                restoreStatsMethods(result.stats)
            }
        }
        return callback.call(this, result)
    }
}

function wrapStatMethod(originalMethod) {
    return function (options) {
        if (options == null) {
            return originalMethod.call(this, options)
        }

        const wrappedOptions = Object.assign({}, options)
        for (const name of ['success', 'complete']) {
            if (typeof options[name] === 'function') {
                wrappedOptions[name] = wrapStatsCallback(options[name])
            }
        }
        return originalMethod.call(this, wrappedOptions)
    }
}

export function initGetFileSystemManager(originalGetFileSystemManager) {
    return function (...args) {
        const fileSystemManager = originalGetFileSystemManager.apply(this, args)
        fileSystemManager.stat = wrapStatMethod(fileSystemManager.stat)
        fileSystemManager.fstat = wrapStatMethod(fileSystemManager.fstat)
        return fileSystemManager
    }
}
