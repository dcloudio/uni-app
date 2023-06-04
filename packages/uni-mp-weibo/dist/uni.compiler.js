'use strict';

var uniMpWeiboVite = require('@dcloudio/uni-mp-weibo-vite');
var require$$1$1 = require('path');
var require$$1 = require('fs');
var require$$0 = require('constants');
var require$$0$1 = require('stream');
var require$$4 = require('util');
var require$$5 = require('assert');
var require$$0$2 = require('buffer');
var require$$2 = require('os');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n.default = e;
	return Object.freeze(n);
}

var uniMpWeiboVite__namespace = /*#__PURE__*/_interopNamespace(uniMpWeiboVite);
var require$$1__default$1 = /*#__PURE__*/_interopDefault(require$$1$1);
var require$$1__default = /*#__PURE__*/_interopDefault(require$$1);
var require$$0__default = /*#__PURE__*/_interopDefault(require$$0);
var require$$0__default$1 = /*#__PURE__*/_interopDefault(require$$0$1);
var require$$4__default = /*#__PURE__*/_interopDefault(require$$4);
var require$$5__default = /*#__PURE__*/_interopDefault(require$$5);
var require$$0__default$2 = /*#__PURE__*/_interopDefault(require$$0$2);
var require$$2__default = /*#__PURE__*/_interopDefault(require$$2);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var fs$j = {};

var universalify$1 = {};

universalify$1.fromCallback = function (fn) {
  return Object.defineProperty(function (...args) {
    if (typeof args[args.length - 1] === 'function') fn.apply(this, args);
    else {
      return new Promise((resolve, reject) => {
        fn.call(
          this,
          ...args,
          (err, res) => (err != null) ? reject(err) : resolve(res)
        );
      })
    }
  }, 'name', { value: fn.name })
};

universalify$1.fromPromise = function (fn) {
  return Object.defineProperty(function (...args) {
    const cb = args[args.length - 1];
    if (typeof cb !== 'function') return fn.apply(this, args)
    else fn.apply(this, args.slice(0, -1)).then(r => cb(null, r), cb);
  }, 'name', { value: fn.name })
};

var constants = require$$0__default.default;

var origCwd = process.cwd;
var cwd = null;

var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;

process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process);
  return cwd
};
try {
  process.cwd();
} catch (er) {}

// This check is needed until node.js 12 is required
if (typeof process.chdir === 'function') {
  var chdir = process.chdir;
  process.chdir = function (d) {
    cwd = null;
    chdir.call(process, d);
  };
  if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
}

var polyfills$1 = patch$1;

function patch$1 (fs) {
  // (re-)implement some things that are known busted or missing.

  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs);
  }

  // lutimes implementation, or no-op
  if (!fs.lutimes) {
    patchLutimes(fs);
  }

  // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.

  fs.chown = chownFix(fs.chown);
  fs.fchown = chownFix(fs.fchown);
  fs.lchown = chownFix(fs.lchown);

  fs.chmod = chmodFix(fs.chmod);
  fs.fchmod = chmodFix(fs.fchmod);
  fs.lchmod = chmodFix(fs.lchmod);

  fs.chownSync = chownFixSync(fs.chownSync);
  fs.fchownSync = chownFixSync(fs.fchownSync);
  fs.lchownSync = chownFixSync(fs.lchownSync);

  fs.chmodSync = chmodFixSync(fs.chmodSync);
  fs.fchmodSync = chmodFixSync(fs.fchmodSync);
  fs.lchmodSync = chmodFixSync(fs.lchmodSync);

  fs.stat = statFix(fs.stat);
  fs.fstat = statFix(fs.fstat);
  fs.lstat = statFix(fs.lstat);

  fs.statSync = statFixSync(fs.statSync);
  fs.fstatSync = statFixSync(fs.fstatSync);
  fs.lstatSync = statFixSync(fs.lstatSync);

  // if lchmod/lchown do not exist, then make them no-ops
  if (fs.chmod && !fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb);
    };
    fs.lchmodSync = function () {};
  }
  if (fs.chown && !fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb);
    };
    fs.lchownSync = function () {};
  }

  // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.

  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.
  if (platform === "win32") {
    fs.rename = typeof fs.rename !== 'function' ? fs.rename
    : (function (fs$rename) {
      function rename (from, to, cb) {
        var start = Date.now();
        var backoff = 0;
        fs$rename(from, to, function CB (er) {
          if (er
              && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY")
              && Date.now() - start < 60000) {
            setTimeout(function() {
              fs.stat(to, function (stater, st) {
                if (stater && stater.code === "ENOENT")
                  fs$rename(from, to, CB);
                else
                  cb(er);
              });
            }, backoff);
            if (backoff < 100)
              backoff += 10;
            return;
          }
          if (cb) cb(er);
        });
      }
      if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
      return rename
    })(fs.rename);
  }

  // if read() returns EAGAIN, then just try it again.
  fs.read = typeof fs.read !== 'function' ? fs.read
  : (function (fs$read) {
    function read (fd, buffer, offset, length, position, callback_) {
      var callback;
      if (callback_ && typeof callback_ === 'function') {
        var eagCounter = 0;
        callback = function (er, _, __) {
          if (er && er.code === 'EAGAIN' && eagCounter < 10) {
            eagCounter ++;
            return fs$read.call(fs, fd, buffer, offset, length, position, callback)
          }
          callback_.apply(this, arguments);
        };
      }
      return fs$read.call(fs, fd, buffer, offset, length, position, callback)
    }

    // This ensures `util.promisify` works as it does for native `fs.read`.
    if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
    return read
  })(fs.read);

  fs.readSync = typeof fs.readSync !== 'function' ? fs.readSync
  : (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
    var eagCounter = 0;
    while (true) {
      try {
        return fs$readSync.call(fs, fd, buffer, offset, length, position)
      } catch (er) {
        if (er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++;
          continue
        }
        throw er
      }
    }
  }})(fs.readSync);

  function patchLchmod (fs) {
    fs.lchmod = function (path, mode, callback) {
      fs.open( path
             , constants.O_WRONLY | constants.O_SYMLINK
             , mode
             , function (err, fd) {
        if (err) {
          if (callback) callback(err);
          return
        }
        // prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.
        fs.fchmod(fd, mode, function (err) {
          fs.close(fd, function(err2) {
            if (callback) callback(err || err2);
          });
        });
      });
    };

    fs.lchmodSync = function (path, mode) {
      var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);

      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      var threw = true;
      var ret;
      try {
        ret = fs.fchmodSync(fd, mode);
        threw = false;
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd);
          } catch (er) {}
        } else {
          fs.closeSync(fd);
        }
      }
      return ret
    };
  }

  function patchLutimes (fs) {
    if (constants.hasOwnProperty("O_SYMLINK") && fs.futimes) {
      fs.lutimes = function (path, at, mt, cb) {
        fs.open(path, constants.O_SYMLINK, function (er, fd) {
          if (er) {
            if (cb) cb(er);
            return
          }
          fs.futimes(fd, at, mt, function (er) {
            fs.close(fd, function (er2) {
              if (cb) cb(er || er2);
            });
          });
        });
      };

      fs.lutimesSync = function (path, at, mt) {
        var fd = fs.openSync(path, constants.O_SYMLINK);
        var ret;
        var threw = true;
        try {
          ret = fs.futimesSync(fd, at, mt);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs.closeSync(fd);
            } catch (er) {}
          } else {
            fs.closeSync(fd);
          }
        }
        return ret
      };

    } else if (fs.futimes) {
      fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb); };
      fs.lutimesSync = function () {};
    }
  }

  function chmodFix (orig) {
    if (!orig) return orig
    return function (target, mode, cb) {
      return orig.call(fs, target, mode, function (er) {
        if (chownErOk(er)) er = null;
        if (cb) cb.apply(this, arguments);
      })
    }
  }

  function chmodFixSync (orig) {
    if (!orig) return orig
    return function (target, mode) {
      try {
        return orig.call(fs, target, mode)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }


  function chownFix (orig) {
    if (!orig) return orig
    return function (target, uid, gid, cb) {
      return orig.call(fs, target, uid, gid, function (er) {
        if (chownErOk(er)) er = null;
        if (cb) cb.apply(this, arguments);
      })
    }
  }

  function chownFixSync (orig) {
    if (!orig) return orig
    return function (target, uid, gid) {
      try {
        return orig.call(fs, target, uid, gid)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }

  function statFix (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = null;
      }
      function callback (er, stats) {
        if (stats) {
          if (stats.uid < 0) stats.uid += 0x100000000;
          if (stats.gid < 0) stats.gid += 0x100000000;
        }
        if (cb) cb.apply(this, arguments);
      }
      return options ? orig.call(fs, target, options, callback)
        : orig.call(fs, target, callback)
    }
  }

  function statFixSync (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options) {
      var stats = options ? orig.call(fs, target, options)
        : orig.call(fs, target);
      if (stats) {
        if (stats.uid < 0) stats.uid += 0x100000000;
        if (stats.gid < 0) stats.gid += 0x100000000;
      }
      return stats;
    }
  }

  // ENOSYS means that the fs doesn't support the op. Just ignore
  // that, because it doesn't matter.
  //
  // if there's no getuid, or if getuid() is something other
  // than 0, and the error is EINVAL or EPERM, then just ignore
  // it.
  //
  // This specific case is a silent failure in cp, install, tar,
  // and most other unix tools that manage permissions.
  //
  // When running as root, or if other types of errors are
  // encountered, then it's strict.
  function chownErOk (er) {
    if (!er)
      return true

    if (er.code === "ENOSYS")
      return true

    var nonroot = !process.getuid || process.getuid() !== 0;
    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM")
        return true
    }

    return false
  }
}

var Stream = require$$0__default$1.default.Stream;

var legacyStreams = legacy$1;

function legacy$1 (fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  }

  function ReadStream (path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

    Stream.call(this);

    var self = this;

    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;

    this.flags = 'r';
    this.mode = 438; /*=0666*/
    this.bufferSize = 64 * 1024;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function() {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);
      self._read();
    });
  }

  function WriteStream (path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

    Stream.call(this);

    this.path = path;
    this.fd = null;
    this.writable = true;

    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438; /*=0666*/
    this.bytesWritten = 0;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }
}

var clone_1 = clone$1;

var getPrototypeOf = Object.getPrototypeOf || function (obj) {
  return obj.__proto__
};

function clone$1 (obj) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: getPrototypeOf(obj) };
  else
    var copy = Object.create(null);

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
  });

  return copy
}

var fs$i = require$$1__default.default;
var polyfills = polyfills$1;
var legacy = legacyStreams;
var clone = clone_1;

var util$2 = require$$4__default.default;

/* istanbul ignore next - node 0.x polyfill */
var gracefulQueue;
var previousSymbol;

/* istanbul ignore else - node 0.x polyfill */
if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
  gracefulQueue = Symbol.for('graceful-fs.queue');
  // This is used in testing by future versions
  previousSymbol = Symbol.for('graceful-fs.previous');
} else {
  gracefulQueue = '___graceful-fs.queue';
  previousSymbol = '___graceful-fs.previous';
}

function noop () {}

function publishQueue(context, queue) {
  Object.defineProperty(context, gracefulQueue, {
    get: function() {
      return queue
    }
  });
}

var debug = noop;
if (util$2.debuglog)
  debug = util$2.debuglog('gfs4');
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util$2.format.apply(util$2, arguments);
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ');
    console.error(m);
  };

// Once time initialization
if (!fs$i[gracefulQueue]) {
  // This queue can be shared by multiple loaded instances
  var queue = commonjsGlobal[gracefulQueue] || [];
  publishQueue(fs$i, queue);

  // Patch fs.close/closeSync to shared queue version, because we need
  // to retry() whenever a close happens *anywhere* in the program.
  // This is essential when multiple graceful-fs instances are
  // in play at the same time.
  fs$i.close = (function (fs$close) {
    function close (fd, cb) {
      return fs$close.call(fs$i, fd, function (err) {
        // This function uses the graceful-fs shared queue
        if (!err) {
          resetQueue();
        }

        if (typeof cb === 'function')
          cb.apply(this, arguments);
      })
    }

    Object.defineProperty(close, previousSymbol, {
      value: fs$close
    });
    return close
  })(fs$i.close);

  fs$i.closeSync = (function (fs$closeSync) {
    function closeSync (fd) {
      // This function uses the graceful-fs shared queue
      fs$closeSync.apply(fs$i, arguments);
      resetQueue();
    }

    Object.defineProperty(closeSync, previousSymbol, {
      value: fs$closeSync
    });
    return closeSync
  })(fs$i.closeSync);

  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
    process.on('exit', function() {
      debug(fs$i[gracefulQueue]);
      require$$5__default.default.equal(fs$i[gracefulQueue].length, 0);
    });
  }
}

if (!commonjsGlobal[gracefulQueue]) {
  publishQueue(commonjsGlobal, fs$i[gracefulQueue]);
}

var gracefulFs = patch(clone(fs$i));
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$i.__patched) {
    gracefulFs = patch(fs$i);
    fs$i.__patched = true;
}

function patch (fs) {
  // Everything that references the open() function needs to be in here
  polyfills(fs);
  fs.gracefulify = patch;

  fs.createReadStream = createReadStream;
  fs.createWriteStream = createWriteStream;
  var fs$readFile = fs.readFile;
  fs.readFile = readFile;
  function readFile (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null;

    return go$readFile(path, options, cb)

    function go$readFile (path, options, cb, startTime) {
      return fs$readFile(path, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments);
        }
      })
    }
  }

  var fs$writeFile = fs.writeFile;
  fs.writeFile = writeFile;
  function writeFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null;

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path, data, options, cb, startTime) {
      return fs$writeFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments);
        }
      })
    }
  }

  var fs$appendFile = fs.appendFile;
  if (fs$appendFile)
    fs.appendFile = appendFile;
  function appendFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null;

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path, data, options, cb, startTime) {
      return fs$appendFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments);
        }
      })
    }
  }

  var fs$copyFile = fs.copyFile;
  if (fs$copyFile)
    fs.copyFile = copyFile;
  function copyFile (src, dest, flags, cb) {
    if (typeof flags === 'function') {
      cb = flags;
      flags = 0;
    }
    return go$copyFile(src, dest, flags, cb)

    function go$copyFile (src, dest, flags, cb, startTime) {
      return fs$copyFile(src, dest, flags, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$copyFile, [src, dest, flags, cb], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments);
        }
      })
    }
  }

  var fs$readdir = fs.readdir;
  fs.readdir = readdir;
  var noReaddirOptionVersions = /^v[0-5]\./;
  function readdir (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null;

    var go$readdir = noReaddirOptionVersions.test(process.version)
      ? function go$readdir (path, options, cb, startTime) {
        return fs$readdir(path, fs$readdirCallback(
          path, options, cb, startTime
        ))
      }
      : function go$readdir (path, options, cb, startTime) {
        return fs$readdir(path, options, fs$readdirCallback(
          path, options, cb, startTime
        ))
      };

    return go$readdir(path, options, cb)

    function fs$readdirCallback (path, options, cb, startTime) {
      return function (err, files) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([
            go$readdir,
            [path, options, cb],
            err,
            startTime || Date.now(),
            Date.now()
          ]);
        else {
          if (files && files.sort)
            files.sort();

          if (typeof cb === 'function')
            cb.call(this, err, files);
        }
      }
    }
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams = legacy(fs);
    ReadStream = legStreams.ReadStream;
    WriteStream = legStreams.WriteStream;
  }

  var fs$ReadStream = fs.ReadStream;
  if (fs$ReadStream) {
    ReadStream.prototype = Object.create(fs$ReadStream.prototype);
    ReadStream.prototype.open = ReadStream$open;
  }

  var fs$WriteStream = fs.WriteStream;
  if (fs$WriteStream) {
    WriteStream.prototype = Object.create(fs$WriteStream.prototype);
    WriteStream.prototype.open = WriteStream$open;
  }

  Object.defineProperty(fs, 'ReadStream', {
    get: function () {
      return ReadStream
    },
    set: function (val) {
      ReadStream = val;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(fs, 'WriteStream', {
    get: function () {
      return WriteStream
    },
    set: function (val) {
      WriteStream = val;
    },
    enumerable: true,
    configurable: true
  });

  // legacy names
  var FileReadStream = ReadStream;
  Object.defineProperty(fs, 'FileReadStream', {
    get: function () {
      return FileReadStream
    },
    set: function (val) {
      FileReadStream = val;
    },
    enumerable: true,
    configurable: true
  });
  var FileWriteStream = WriteStream;
  Object.defineProperty(fs, 'FileWriteStream', {
    get: function () {
      return FileWriteStream
    },
    set: function (val) {
      FileWriteStream = val;
    },
    enumerable: true,
    configurable: true
  });

  function ReadStream (path, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open () {
    var that = this;
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy();

        that.emit('error', err);
      } else {
        that.fd = fd;
        that.emit('open', fd);
        that.read();
      }
    });
  }

  function WriteStream (path, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open () {
    var that = this;
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        that.destroy();
        that.emit('error', err);
      } else {
        that.fd = fd;
        that.emit('open', fd);
      }
    });
  }

  function createReadStream (path, options) {
    return new fs.ReadStream(path, options)
  }

  function createWriteStream (path, options) {
    return new fs.WriteStream(path, options)
  }

  var fs$open = fs.open;
  fs.open = open;
  function open (path, flags, mode, cb) {
    if (typeof mode === 'function')
      cb = mode, mode = null;

    return go$open(path, flags, mode, cb)

    function go$open (path, flags, mode, cb, startTime) {
      return fs$open(path, flags, mode, function (err, fd) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments);
        }
      })
    }
  }

  return fs
}

function enqueue (elem) {
  debug('ENQUEUE', elem[0].name, elem[1]);
  fs$i[gracefulQueue].push(elem);
  retry();
}

// keep track of the timeout between retry() calls
var retryTimer;

// reset the startTime and lastTime to now
// this resets the start of the 60 second overall timeout as well as the
// delay between attempts so that we'll retry these jobs sooner
function resetQueue () {
  var now = Date.now();
  for (var i = 0; i < fs$i[gracefulQueue].length; ++i) {
    // entries that are only a length of 2 are from an older version, don't
    // bother modifying those since they'll be retried anyway.
    if (fs$i[gracefulQueue][i].length > 2) {
      fs$i[gracefulQueue][i][3] = now; // startTime
      fs$i[gracefulQueue][i][4] = now; // lastTime
    }
  }
  // call retry to make sure we're actively processing the queue
  retry();
}

function retry () {
  // clear the timer and remove it to help prevent unintended concurrency
  clearTimeout(retryTimer);
  retryTimer = undefined;

  if (fs$i[gracefulQueue].length === 0)
    return

  var elem = fs$i[gracefulQueue].shift();
  var fn = elem[0];
  var args = elem[1];
  // these items may be unset if they were added by an older graceful-fs
  var err = elem[2];
  var startTime = elem[3];
  var lastTime = elem[4];

  // if we don't have a startTime we have no way of knowing if we've waited
  // long enough, so go ahead and retry this item now
  if (startTime === undefined) {
    debug('RETRY', fn.name, args);
    fn.apply(null, args);
  } else if (Date.now() - startTime >= 60000) {
    // it's been more than 60 seconds total, bail now
    debug('TIMEOUT', fn.name, args);
    var cb = args.pop();
    if (typeof cb === 'function')
      cb.call(null, err);
  } else {
    // the amount of time between the last attempt and right now
    var sinceAttempt = Date.now() - lastTime;
    // the amount of time between when we first tried, and when we last tried
    // rounded up to at least 1
    var sinceStart = Math.max(lastTime - startTime, 1);
    // backoff. wait longer than the total time we've been retrying, but only
    // up to a maximum of 100ms
    var desiredDelay = Math.min(sinceStart * 1.2, 100);
    // it's been long enough since the last retry, do it again
    if (sinceAttempt >= desiredDelay) {
      debug('RETRY', fn.name, args);
      fn.apply(null, args.concat([startTime]));
    } else {
      // if we can't do this job yet, push it to the end of the queue
      // and let the next iteration check again
      fs$i[gracefulQueue].push(elem);
    }
  }

  // schedule our next run if one isn't already scheduled
  if (retryTimer === undefined) {
    retryTimer = setTimeout(retry, 0);
  }
}

(function (exports) {
	// This is adapted from https://github.com/normalize/mz
	// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
	const u = universalify$1.fromCallback;
	const fs = gracefulFs;

	const api = [
	  'access',
	  'appendFile',
	  'chmod',
	  'chown',
	  'close',
	  'copyFile',
	  'fchmod',
	  'fchown',
	  'fdatasync',
	  'fstat',
	  'fsync',
	  'ftruncate',
	  'futimes',
	  'lchmod',
	  'lchown',
	  'link',
	  'lstat',
	  'mkdir',
	  'mkdtemp',
	  'open',
	  'opendir',
	  'readdir',
	  'readFile',
	  'readlink',
	  'realpath',
	  'rename',
	  'rm',
	  'rmdir',
	  'stat',
	  'symlink',
	  'truncate',
	  'unlink',
	  'utimes',
	  'writeFile'
	].filter(key => {
	  // Some commands are not available on some systems. Ex:
	  // fs.opendir was added in Node.js v12.12.0
	  // fs.rm was added in Node.js v14.14.0
	  // fs.lchown is not available on at least some Linux
	  return typeof fs[key] === 'function'
	});

	// Export cloned fs:
	Object.assign(exports, fs);

	// Universalify async methods:
	api.forEach(method => {
	  exports[method] = u(fs[method]);
	});
	exports.realpath.native = u(fs.realpath.native);

	// We differ from mz/fs in that we still ship the old, broken, fs.exists()
	// since we are a drop-in replacement for the native module
	exports.exists = function (filename, callback) {
	  if (typeof callback === 'function') {
	    return fs.exists(filename, callback)
	  }
	  return new Promise(resolve => {
	    return fs.exists(filename, resolve)
	  })
	};

	// fs.read(), fs.write(), & fs.writev() need special treatment due to multiple callback args

	exports.read = function (fd, buffer, offset, length, position, callback) {
	  if (typeof callback === 'function') {
	    return fs.read(fd, buffer, offset, length, position, callback)
	  }
	  return new Promise((resolve, reject) => {
	    fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
	      if (err) return reject(err)
	      resolve({ bytesRead, buffer });
	    });
	  })
	};

	// Function signature can be
	// fs.write(fd, buffer[, offset[, length[, position]]], callback)
	// OR
	// fs.write(fd, string[, position[, encoding]], callback)
	// We need to handle both cases, so we use ...args
	exports.write = function (fd, buffer, ...args) {
	  if (typeof args[args.length - 1] === 'function') {
	    return fs.write(fd, buffer, ...args)
	  }

	  return new Promise((resolve, reject) => {
	    fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
	      if (err) return reject(err)
	      resolve({ bytesWritten, buffer });
	    });
	  })
	};

	// fs.writev only available in Node v12.9.0+
	if (typeof fs.writev === 'function') {
	  // Function signature is
	  // s.writev(fd, buffers[, position], callback)
	  // We need to handle the optional arg, so we use ...args
	  exports.writev = function (fd, buffers, ...args) {
	    if (typeof args[args.length - 1] === 'function') {
	      return fs.writev(fd, buffers, ...args)
	    }

	    return new Promise((resolve, reject) => {
	      fs.writev(fd, buffers, ...args, (err, bytesWritten, buffers) => {
	        if (err) return reject(err)
	        resolve({ bytesWritten, buffers });
	      });
	    })
	  };
	}
} (fs$j));

var makeDir$1 = {};

var utils$1 = {};

const path$d = require$$1__default$1.default;

// https://github.com/nodejs/node/issues/8987
// https://github.com/libuv/libuv/pull/1088
utils$1.checkPath = function checkPath (pth) {
  if (process.platform === 'win32') {
    const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path$d.parse(pth).root, ''));

    if (pathHasInvalidWinCharacters) {
      const error = new Error(`Path contains invalid characters: ${pth}`);
      error.code = 'EINVAL';
      throw error
    }
  }
};

const fs$h = fs$j;
const { checkPath } = utils$1;

const getMode = options => {
  const defaults = { mode: 0o777 };
  if (typeof options === 'number') return options
  return ({ ...defaults, ...options }).mode
};

makeDir$1.makeDir = async (dir, options) => {
  checkPath(dir);

  return fs$h.mkdir(dir, {
    mode: getMode(options),
    recursive: true
  })
};

makeDir$1.makeDirSync = (dir, options) => {
  checkPath(dir);

  return fs$h.mkdirSync(dir, {
    mode: getMode(options),
    recursive: true
  })
};

const u$a = universalify$1.fromPromise;
const { makeDir: _makeDir, makeDirSync } = makeDir$1;
const makeDir = u$a(_makeDir);

var mkdirs$2 = {
  mkdirs: makeDir,
  mkdirsSync: makeDirSync,
  // alias
  mkdirp: makeDir,
  mkdirpSync: makeDirSync,
  ensureDir: makeDir,
  ensureDirSync: makeDirSync
};

const fs$g = gracefulFs;

function utimesMillis$1 (path, atime, mtime, callback) {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs$g.open(path, 'r+', (err, fd) => {
    if (err) return callback(err)
    fs$g.futimes(fd, atime, mtime, futimesErr => {
      fs$g.close(fd, closeErr => {
        if (callback) callback(futimesErr || closeErr);
      });
    });
  });
}

function utimesMillisSync$1 (path, atime, mtime) {
  const fd = fs$g.openSync(path, 'r+');
  fs$g.futimesSync(fd, atime, mtime);
  return fs$g.closeSync(fd)
}

var utimes = {
  utimesMillis: utimesMillis$1,
  utimesMillisSync: utimesMillisSync$1
};

const fs$f = fs$j;
const path$c = require$$1__default$1.default;
const util$1 = require$$4__default.default;

function getStats$2 (src, dest, opts) {
  const statFunc = opts.dereference
    ? (file) => fs$f.stat(file, { bigint: true })
    : (file) => fs$f.lstat(file, { bigint: true });
  return Promise.all([
    statFunc(src),
    statFunc(dest).catch(err => {
      if (err.code === 'ENOENT') return null
      throw err
    })
  ]).then(([srcStat, destStat]) => ({ srcStat, destStat }))
}

function getStatsSync (src, dest, opts) {
  let destStat;
  const statFunc = opts.dereference
    ? (file) => fs$f.statSync(file, { bigint: true })
    : (file) => fs$f.lstatSync(file, { bigint: true });
  const srcStat = statFunc(src);
  try {
    destStat = statFunc(dest);
  } catch (err) {
    if (err.code === 'ENOENT') return { srcStat, destStat: null }
    throw err
  }
  return { srcStat, destStat }
}

function checkPaths (src, dest, funcName, opts, cb) {
  util$1.callbackify(getStats$2)(src, dest, opts, (err, stats) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats;

    if (destStat) {
      if (areIdentical$2(srcStat, destStat)) {
        const srcBaseName = path$c.basename(src);
        const destBaseName = path$c.basename(dest);
        if (funcName === 'move' &&
          srcBaseName !== destBaseName &&
          srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
          return cb(null, { srcStat, destStat, isChangingCase: true })
        }
        return cb(new Error('Source and destination must not be the same.'))
      }
      if (srcStat.isDirectory() && !destStat.isDirectory()) {
        return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`))
      }
      if (!srcStat.isDirectory() && destStat.isDirectory()) {
        return cb(new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`))
      }
    }

    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      return cb(new Error(errMsg(src, dest, funcName)))
    }
    return cb(null, { srcStat, destStat })
  });
}

function checkPathsSync (src, dest, funcName, opts) {
  const { srcStat, destStat } = getStatsSync(src, dest, opts);

  if (destStat) {
    if (areIdentical$2(srcStat, destStat)) {
      const srcBaseName = path$c.basename(src);
      const destBaseName = path$c.basename(dest);
      if (funcName === 'move' &&
        srcBaseName !== destBaseName &&
        srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
        return { srcStat, destStat, isChangingCase: true }
      }
      throw new Error('Source and destination must not be the same.')
    }
    if (srcStat.isDirectory() && !destStat.isDirectory()) {
      throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
    }
    if (!srcStat.isDirectory() && destStat.isDirectory()) {
      throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`)
    }
  }

  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return { srcStat, destStat }
}

// recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.
function checkParentPaths (src, srcStat, dest, funcName, cb) {
  const srcParent = path$c.resolve(path$c.dirname(src));
  const destParent = path$c.resolve(path$c.dirname(dest));
  if (destParent === srcParent || destParent === path$c.parse(destParent).root) return cb()
  fs$f.stat(destParent, { bigint: true }, (err, destStat) => {
    if (err) {
      if (err.code === 'ENOENT') return cb()
      return cb(err)
    }
    if (areIdentical$2(srcStat, destStat)) {
      return cb(new Error(errMsg(src, dest, funcName)))
    }
    return checkParentPaths(src, srcStat, destParent, funcName, cb)
  });
}

function checkParentPathsSync (src, srcStat, dest, funcName) {
  const srcParent = path$c.resolve(path$c.dirname(src));
  const destParent = path$c.resolve(path$c.dirname(dest));
  if (destParent === srcParent || destParent === path$c.parse(destParent).root) return
  let destStat;
  try {
    destStat = fs$f.statSync(destParent, { bigint: true });
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
  if (areIdentical$2(srcStat, destStat)) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return checkParentPathsSync(src, srcStat, destParent, funcName)
}

function areIdentical$2 (srcStat, destStat) {
  return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev
}

// return true if dest is a subdir of src, otherwise false.
// It only checks the path strings.
function isSrcSubdir (src, dest) {
  const srcArr = path$c.resolve(src).split(path$c.sep).filter(i => i);
  const destArr = path$c.resolve(dest).split(path$c.sep).filter(i => i);
  return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true)
}

function errMsg (src, dest, funcName) {
  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
}

var stat$4 = {
  checkPaths,
  checkPathsSync,
  checkParentPaths,
  checkParentPathsSync,
  isSrcSubdir,
  areIdentical: areIdentical$2
};

const fs$e = gracefulFs;
const path$b = require$$1__default$1.default;
const mkdirsSync$1 = mkdirs$2.mkdirsSync;
const utimesMillisSync = utimes.utimesMillisSync;
const stat$3 = stat$4;

function copySync$2 (src, dest, opts) {
  if (typeof opts === 'function') {
    opts = { filter: opts };
  }

  opts = opts || {};
  opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`);
  }

  const { srcStat, destStat } = stat$3.checkPathsSync(src, dest, 'copy', opts);
  stat$3.checkParentPathsSync(src, srcStat, dest, 'copy');
  return handleFilterAndCopy(destStat, src, dest, opts)
}

function handleFilterAndCopy (destStat, src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return
  const destParent = path$b.dirname(dest);
  if (!fs$e.existsSync(destParent)) mkdirsSync$1(destParent);
  return getStats$1(destStat, src, dest, opts)
}

function startCopy$1 (destStat, src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return
  return getStats$1(destStat, src, dest, opts)
}

function getStats$1 (destStat, src, dest, opts) {
  const statSync = opts.dereference ? fs$e.statSync : fs$e.lstatSync;
  const srcStat = statSync(src);

  if (srcStat.isDirectory()) return onDir$1(srcStat, destStat, src, dest, opts)
  else if (srcStat.isFile() ||
           srcStat.isCharacterDevice() ||
           srcStat.isBlockDevice()) return onFile$1(srcStat, destStat, src, dest, opts)
  else if (srcStat.isSymbolicLink()) return onLink$1(destStat, src, dest, opts)
  else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`)
  else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`)
  throw new Error(`Unknown file: ${src}`)
}

function onFile$1 (srcStat, destStat, src, dest, opts) {
  if (!destStat) return copyFile$1(srcStat, src, dest, opts)
  return mayCopyFile$1(srcStat, src, dest, opts)
}

function mayCopyFile$1 (srcStat, src, dest, opts) {
  if (opts.overwrite) {
    fs$e.unlinkSync(dest);
    return copyFile$1(srcStat, src, dest, opts)
  } else if (opts.errorOnExist) {
    throw new Error(`'${dest}' already exists`)
  }
}

function copyFile$1 (srcStat, src, dest, opts) {
  fs$e.copyFileSync(src, dest);
  if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
  return setDestMode$1(dest, srcStat.mode)
}

function handleTimestamps (srcMode, src, dest) {
  // Make sure the file is writable before setting the timestamp
  // otherwise open fails with EPERM when invoked with 'r+'
  // (through utimes call)
  if (fileIsNotWritable$1(srcMode)) makeFileWritable$1(dest, srcMode);
  return setDestTimestamps$1(src, dest)
}

function fileIsNotWritable$1 (srcMode) {
  return (srcMode & 0o200) === 0
}

function makeFileWritable$1 (dest, srcMode) {
  return setDestMode$1(dest, srcMode | 0o200)
}

function setDestMode$1 (dest, srcMode) {
  return fs$e.chmodSync(dest, srcMode)
}

function setDestTimestamps$1 (src, dest) {
  // The initial srcStat.atime cannot be trusted
  // because it is modified by the read(2) system call
  // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
  const updatedSrcStat = fs$e.statSync(src);
  return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime)
}

function onDir$1 (srcStat, destStat, src, dest, opts) {
  if (!destStat) return mkDirAndCopy$1(srcStat.mode, src, dest, opts)
  return copyDir$1(src, dest, opts)
}

function mkDirAndCopy$1 (srcMode, src, dest, opts) {
  fs$e.mkdirSync(dest);
  copyDir$1(src, dest, opts);
  return setDestMode$1(dest, srcMode)
}

function copyDir$1 (src, dest, opts) {
  fs$e.readdirSync(src).forEach(item => copyDirItem$1(item, src, dest, opts));
}

function copyDirItem$1 (item, src, dest, opts) {
  const srcItem = path$b.join(src, item);
  const destItem = path$b.join(dest, item);
  const { destStat } = stat$3.checkPathsSync(srcItem, destItem, 'copy', opts);
  return startCopy$1(destStat, srcItem, destItem, opts)
}

function onLink$1 (destStat, src, dest, opts) {
  let resolvedSrc = fs$e.readlinkSync(src);
  if (opts.dereference) {
    resolvedSrc = path$b.resolve(process.cwd(), resolvedSrc);
  }

  if (!destStat) {
    return fs$e.symlinkSync(resolvedSrc, dest)
  } else {
    let resolvedDest;
    try {
      resolvedDest = fs$e.readlinkSync(dest);
    } catch (err) {
      // dest exists and is a regular file or directory,
      // Windows may throw UNKNOWN error. If dest already exists,
      // fs throws error anyway, so no need to guard against it here.
      if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs$e.symlinkSync(resolvedSrc, dest)
      throw err
    }
    if (opts.dereference) {
      resolvedDest = path$b.resolve(process.cwd(), resolvedDest);
    }
    if (stat$3.isSrcSubdir(resolvedSrc, resolvedDest)) {
      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
    }

    // prevent copy if src is a subdir of dest since unlinking
    // dest in this case would result in removing src contents
    // and therefore a broken symlink would be created.
    if (fs$e.statSync(dest).isDirectory() && stat$3.isSrcSubdir(resolvedDest, resolvedSrc)) {
      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
    }
    return copyLink$1(resolvedSrc, dest)
  }
}

function copyLink$1 (resolvedSrc, dest) {
  fs$e.unlinkSync(dest);
  return fs$e.symlinkSync(resolvedSrc, dest)
}

var copySync_1 = copySync$2;

var copySync$1 = {
  copySync: copySync_1
};

const u$9 = universalify$1.fromPromise;
const fs$d = fs$j;

function pathExists$6 (path) {
  return fs$d.access(path).then(() => true).catch(() => false)
}

var pathExists_1 = {
  pathExists: u$9(pathExists$6),
  pathExistsSync: fs$d.existsSync
};

const fs$c = gracefulFs;
const path$a = require$$1__default$1.default;
const mkdirs$1 = mkdirs$2.mkdirs;
const pathExists$5 = pathExists_1.pathExists;
const utimesMillis = utimes.utimesMillis;
const stat$2 = stat$4;

function copy$3 (src, dest, opts, cb) {
  if (typeof opts === 'function' && !cb) {
    cb = opts;
    opts = {};
  } else if (typeof opts === 'function') {
    opts = { filter: opts };
  }

  cb = cb || function () {};
  opts = opts || {};

  opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`);
  }

  stat$2.checkPaths(src, dest, 'copy', opts, (err, stats) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats;
    stat$2.checkParentPaths(src, srcStat, dest, 'copy', err => {
      if (err) return cb(err)
      if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)
      return checkParentDir(destStat, src, dest, opts, cb)
    });
  });
}

function checkParentDir (destStat, src, dest, opts, cb) {
  const destParent = path$a.dirname(dest);
  pathExists$5(destParent, (err, dirExists) => {
    if (err) return cb(err)
    if (dirExists) return getStats(destStat, src, dest, opts, cb)
    mkdirs$1(destParent, err => {
      if (err) return cb(err)
      return getStats(destStat, src, dest, opts, cb)
    });
  });
}

function handleFilter (onInclude, destStat, src, dest, opts, cb) {
  Promise.resolve(opts.filter(src, dest)).then(include => {
    if (include) return onInclude(destStat, src, dest, opts, cb)
    return cb()
  }, error => cb(error));
}

function startCopy (destStat, src, dest, opts, cb) {
  if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb)
  return getStats(destStat, src, dest, opts, cb)
}

function getStats (destStat, src, dest, opts, cb) {
  const stat = opts.dereference ? fs$c.stat : fs$c.lstat;
  stat(src, (err, srcStat) => {
    if (err) return cb(err)

    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb)
    else if (srcStat.isFile() ||
             srcStat.isCharacterDevice() ||
             srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb)
    else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb)
    else if (srcStat.isSocket()) return cb(new Error(`Cannot copy a socket file: ${src}`))
    else if (srcStat.isFIFO()) return cb(new Error(`Cannot copy a FIFO pipe: ${src}`))
    return cb(new Error(`Unknown file: ${src}`))
  });
}

function onFile (srcStat, destStat, src, dest, opts, cb) {
  if (!destStat) return copyFile(srcStat, src, dest, opts, cb)
  return mayCopyFile(srcStat, src, dest, opts, cb)
}

function mayCopyFile (srcStat, src, dest, opts, cb) {
  if (opts.overwrite) {
    fs$c.unlink(dest, err => {
      if (err) return cb(err)
      return copyFile(srcStat, src, dest, opts, cb)
    });
  } else if (opts.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`))
  } else return cb()
}

function copyFile (srcStat, src, dest, opts, cb) {
  fs$c.copyFile(src, dest, err => {
    if (err) return cb(err)
    if (opts.preserveTimestamps) return handleTimestampsAndMode(srcStat.mode, src, dest, cb)
    return setDestMode(dest, srcStat.mode, cb)
  });
}

function handleTimestampsAndMode (srcMode, src, dest, cb) {
  // Make sure the file is writable before setting the timestamp
  // otherwise open fails with EPERM when invoked with 'r+'
  // (through utimes call)
  if (fileIsNotWritable(srcMode)) {
    return makeFileWritable(dest, srcMode, err => {
      if (err) return cb(err)
      return setDestTimestampsAndMode(srcMode, src, dest, cb)
    })
  }
  return setDestTimestampsAndMode(srcMode, src, dest, cb)
}

function fileIsNotWritable (srcMode) {
  return (srcMode & 0o200) === 0
}

function makeFileWritable (dest, srcMode, cb) {
  return setDestMode(dest, srcMode | 0o200, cb)
}

function setDestTimestampsAndMode (srcMode, src, dest, cb) {
  setDestTimestamps(src, dest, err => {
    if (err) return cb(err)
    return setDestMode(dest, srcMode, cb)
  });
}

function setDestMode (dest, srcMode, cb) {
  return fs$c.chmod(dest, srcMode, cb)
}

function setDestTimestamps (src, dest, cb) {
  // The initial srcStat.atime cannot be trusted
  // because it is modified by the read(2) system call
  // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
  fs$c.stat(src, (err, updatedSrcStat) => {
    if (err) return cb(err)
    return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb)
  });
}

function onDir (srcStat, destStat, src, dest, opts, cb) {
  if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts, cb)
  return copyDir(src, dest, opts, cb)
}

function mkDirAndCopy (srcMode, src, dest, opts, cb) {
  fs$c.mkdir(dest, err => {
    if (err) return cb(err)
    copyDir(src, dest, opts, err => {
      if (err) return cb(err)
      return setDestMode(dest, srcMode, cb)
    });
  });
}

function copyDir (src, dest, opts, cb) {
  fs$c.readdir(src, (err, items) => {
    if (err) return cb(err)
    return copyDirItems(items, src, dest, opts, cb)
  });
}

function copyDirItems (items, src, dest, opts, cb) {
  const item = items.pop();
  if (!item) return cb()
  return copyDirItem(items, item, src, dest, opts, cb)
}

function copyDirItem (items, item, src, dest, opts, cb) {
  const srcItem = path$a.join(src, item);
  const destItem = path$a.join(dest, item);
  stat$2.checkPaths(srcItem, destItem, 'copy', opts, (err, stats) => {
    if (err) return cb(err)
    const { destStat } = stats;
    startCopy(destStat, srcItem, destItem, opts, err => {
      if (err) return cb(err)
      return copyDirItems(items, src, dest, opts, cb)
    });
  });
}

function onLink (destStat, src, dest, opts, cb) {
  fs$c.readlink(src, (err, resolvedSrc) => {
    if (err) return cb(err)
    if (opts.dereference) {
      resolvedSrc = path$a.resolve(process.cwd(), resolvedSrc);
    }

    if (!destStat) {
      return fs$c.symlink(resolvedSrc, dest, cb)
    } else {
      fs$c.readlink(dest, (err, resolvedDest) => {
        if (err) {
          // dest exists and is a regular file or directory,
          // Windows may throw UNKNOWN error. If dest already exists,
          // fs throws error anyway, so no need to guard against it here.
          if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs$c.symlink(resolvedSrc, dest, cb)
          return cb(err)
        }
        if (opts.dereference) {
          resolvedDest = path$a.resolve(process.cwd(), resolvedDest);
        }
        if (stat$2.isSrcSubdir(resolvedSrc, resolvedDest)) {
          return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`))
        }

        // do not copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.
        if (destStat.isDirectory() && stat$2.isSrcSubdir(resolvedDest, resolvedSrc)) {
          return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`))
        }
        return copyLink(resolvedSrc, dest, cb)
      });
    }
  });
}

function copyLink (resolvedSrc, dest, cb) {
  fs$c.unlink(dest, err => {
    if (err) return cb(err)
    return fs$c.symlink(resolvedSrc, dest, cb)
  });
}

var copy_1 = copy$3;

const u$8 = universalify$1.fromCallback;
var copy$2 = {
  copy: u$8(copy_1)
};

const fs$b = gracefulFs;
const path$9 = require$$1__default$1.default;
const assert = require$$5__default.default;

const isWindows = (process.platform === 'win32');

function defaults (options) {
  const methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ];
  methods.forEach(m => {
    options[m] = options[m] || fs$b[m];
    m = m + 'Sync';
    options[m] = options[m] || fs$b[m];
  });

  options.maxBusyTries = options.maxBusyTries || 3;
}

function rimraf$1 (p, options, cb) {
  let busyTries = 0;

  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  assert(p, 'rimraf: missing path');
  assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string');
  assert.strictEqual(typeof cb, 'function', 'rimraf: callback function required');
  assert(options, 'rimraf: invalid options argument provided');
  assert.strictEqual(typeof options, 'object', 'rimraf: options should be object');

  defaults(options);

  rimraf_(p, options, function CB (er) {
    if (er) {
      if ((er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') &&
          busyTries < options.maxBusyTries) {
        busyTries++;
        const time = busyTries * 100;
        // try again, with the same exact callback as this one.
        return setTimeout(() => rimraf_(p, options, CB), time)
      }

      // already gone
      if (er.code === 'ENOENT') er = null;
    }

    cb(er);
  });
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === 'function');

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, (er, st) => {
    if (er && er.code === 'ENOENT') {
      return cb(null)
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === 'EPERM' && isWindows) {
      return fixWinEPERM(p, options, er, cb)
    }

    if (st && st.isDirectory()) {
      return rmdir(p, options, er, cb)
    }

    options.unlink(p, er => {
      if (er) {
        if (er.code === 'ENOENT') {
          return cb(null)
        }
        if (er.code === 'EPERM') {
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        }
        if (er.code === 'EISDIR') {
          return rmdir(p, options, er, cb)
        }
      }
      return cb(er)
    });
  });
}

function fixWinEPERM (p, options, er, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === 'function');

  options.chmod(p, 0o666, er2 => {
    if (er2) {
      cb(er2.code === 'ENOENT' ? null : er);
    } else {
      options.stat(p, (er3, stats) => {
        if (er3) {
          cb(er3.code === 'ENOENT' ? null : er);
        } else if (stats.isDirectory()) {
          rmdir(p, options, er, cb);
        } else {
          options.unlink(p, cb);
        }
      });
    }
  });
}

function fixWinEPERMSync (p, options, er) {
  let stats;

  assert(p);
  assert(options);

  try {
    options.chmodSync(p, 0o666);
  } catch (er2) {
    if (er2.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  try {
    stats = options.statSync(p);
  } catch (er3) {
    if (er3.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  if (stats.isDirectory()) {
    rmdirSync(p, options, er);
  } else {
    options.unlinkSync(p);
  }
}

function rmdir (p, options, originalEr, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === 'function');

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, er => {
    if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
      rmkids(p, options, cb);
    } else if (er && er.code === 'ENOTDIR') {
      cb(originalEr);
    } else {
      cb(er);
    }
  });
}

function rmkids (p, options, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === 'function');

  options.readdir(p, (er, files) => {
    if (er) return cb(er)

    let n = files.length;
    let errState;

    if (n === 0) return options.rmdir(p, cb)

    files.forEach(f => {
      rimraf$1(path$9.join(p, f), options, er => {
        if (errState) {
          return
        }
        if (er) return cb(errState = er)
        if (--n === 0) {
          options.rmdir(p, cb);
        }
      });
    });
  });
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  let st;

  options = options || {};
  defaults(options);

  assert(p, 'rimraf: missing path');
  assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string');
  assert(options, 'rimraf: missing options');
  assert.strictEqual(typeof options, 'object', 'rimraf: options should be object');

  try {
    st = options.lstatSync(p);
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er.code === 'EPERM' && isWindows) {
      fixWinEPERMSync(p, options, er);
    }
  }

  try {
    // sunos lets the root user unlink directories, which is... weird.
    if (st && st.isDirectory()) {
      rmdirSync(p, options, null);
    } else {
      options.unlinkSync(p);
    }
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    } else if (er.code === 'EPERM') {
      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
    } else if (er.code !== 'EISDIR') {
      throw er
    }
    rmdirSync(p, options, er);
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p);
  assert(options);

  try {
    options.rmdirSync(p);
  } catch (er) {
    if (er.code === 'ENOTDIR') {
      throw originalEr
    } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
      rmkidsSync(p, options);
    } else if (er.code !== 'ENOENT') {
      throw er
    }
  }
}

function rmkidsSync (p, options) {
  assert(p);
  assert(options);
  options.readdirSync(p).forEach(f => rimrafSync(path$9.join(p, f), options));

  if (isWindows) {
    // We only end up here once we got ENOTEMPTY at least once, and
    // at this point, we are guaranteed to have removed all the kids.
    // So, we know that it won't be ENOENT or ENOTDIR or anything else.
    // try really hard to delete stuff on windows, because it has a
    // PROFOUNDLY annoying habit of not closing handles promptly when
    // files are deleted, resulting in spurious ENOTEMPTY errors.
    const startTime = Date.now();
    do {
      try {
        const ret = options.rmdirSync(p, options);
        return ret
      } catch {}
    } while (Date.now() - startTime < 500) // give up after 500ms
  } else {
    const ret = options.rmdirSync(p, options);
    return ret
  }
}

var rimraf_1 = rimraf$1;
rimraf$1.sync = rimrafSync;

const fs$a = gracefulFs;
const u$7 = universalify$1.fromCallback;
const rimraf = rimraf_1;

function remove$2 (path, callback) {
  // Node 14.14.0+
  if (fs$a.rm) return fs$a.rm(path, { recursive: true, force: true }, callback)
  rimraf(path, callback);
}

function removeSync$1 (path) {
  // Node 14.14.0+
  if (fs$a.rmSync) return fs$a.rmSync(path, { recursive: true, force: true })
  rimraf.sync(path);
}

var remove_1 = {
  remove: u$7(remove$2),
  removeSync: removeSync$1
};

const u$6 = universalify$1.fromPromise;
const fs$9 = fs$j;
const path$8 = require$$1__default$1.default;
const mkdir$3 = mkdirs$2;
const remove$1 = remove_1;

const emptyDir = u$6(async function emptyDir (dir) {
  let items;
  try {
    items = await fs$9.readdir(dir);
  } catch {
    return mkdir$3.mkdirs(dir)
  }

  return Promise.all(items.map(item => remove$1.remove(path$8.join(dir, item))))
});

function emptyDirSync (dir) {
  let items;
  try {
    items = fs$9.readdirSync(dir);
  } catch {
    return mkdir$3.mkdirsSync(dir)
  }

  items.forEach(item => {
    item = path$8.join(dir, item);
    remove$1.removeSync(item);
  });
}

var empty = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
};

const u$5 = universalify$1.fromCallback;
const path$7 = require$$1__default$1.default;
const fs$8 = gracefulFs;
const mkdir$2 = mkdirs$2;

function createFile (file, callback) {
  function makeFile () {
    fs$8.writeFile(file, '', err => {
      if (err) return callback(err)
      callback();
    });
  }

  fs$8.stat(file, (err, stats) => { // eslint-disable-line handle-callback-err
    if (!err && stats.isFile()) return callback()
    const dir = path$7.dirname(file);
    fs$8.stat(dir, (err, stats) => {
      if (err) {
        // if the directory doesn't exist, make it
        if (err.code === 'ENOENT') {
          return mkdir$2.mkdirs(dir, err => {
            if (err) return callback(err)
            makeFile();
          })
        }
        return callback(err)
      }

      if (stats.isDirectory()) makeFile();
      else {
        // parent is not a directory
        // This is just to cause an internal ENOTDIR error to be thrown
        fs$8.readdir(dir, err => {
          if (err) return callback(err)
        });
      }
    });
  });
}

function createFileSync (file) {
  let stats;
  try {
    stats = fs$8.statSync(file);
  } catch {}
  if (stats && stats.isFile()) return

  const dir = path$7.dirname(file);
  try {
    if (!fs$8.statSync(dir).isDirectory()) {
      // parent is not a directory
      // This is just to cause an internal ENOTDIR error to be thrown
      fs$8.readdirSync(dir);
    }
  } catch (err) {
    // If the stat call above failed because the directory doesn't exist, create it
    if (err && err.code === 'ENOENT') mkdir$2.mkdirsSync(dir);
    else throw err
  }

  fs$8.writeFileSync(file, '');
}

var file$1 = {
  createFile: u$5(createFile),
  createFileSync
};

const u$4 = universalify$1.fromCallback;
const path$6 = require$$1__default$1.default;
const fs$7 = gracefulFs;
const mkdir$1 = mkdirs$2;
const pathExists$4 = pathExists_1.pathExists;
const { areIdentical: areIdentical$1 } = stat$4;

function createLink (srcpath, dstpath, callback) {
  function makeLink (srcpath, dstpath) {
    fs$7.link(srcpath, dstpath, err => {
      if (err) return callback(err)
      callback(null);
    });
  }

  fs$7.lstat(dstpath, (_, dstStat) => {
    fs$7.lstat(srcpath, (err, srcStat) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink');
        return callback(err)
      }
      if (dstStat && areIdentical$1(srcStat, dstStat)) return callback(null)

      const dir = path$6.dirname(dstpath);
      pathExists$4(dir, (err, dirExists) => {
        if (err) return callback(err)
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir$1.mkdirs(dir, err => {
          if (err) return callback(err)
          makeLink(srcpath, dstpath);
        });
      });
    });
  });
}

function createLinkSync (srcpath, dstpath) {
  let dstStat;
  try {
    dstStat = fs$7.lstatSync(dstpath);
  } catch {}

  try {
    const srcStat = fs$7.lstatSync(srcpath);
    if (dstStat && areIdentical$1(srcStat, dstStat)) return
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink');
    throw err
  }

  const dir = path$6.dirname(dstpath);
  const dirExists = fs$7.existsSync(dir);
  if (dirExists) return fs$7.linkSync(srcpath, dstpath)
  mkdir$1.mkdirsSync(dir);

  return fs$7.linkSync(srcpath, dstpath)
}

var link$1 = {
  createLink: u$4(createLink),
  createLinkSync
};

const path$5 = require$$1__default$1.default;
const fs$6 = gracefulFs;
const pathExists$3 = pathExists_1.pathExists;

/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */

function symlinkPaths$1 (srcpath, dstpath, callback) {
  if (path$5.isAbsolute(srcpath)) {
    return fs$6.lstat(srcpath, (err) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink');
        return callback(err)
      }
      return callback(null, {
        toCwd: srcpath,
        toDst: srcpath
      })
    })
  } else {
    const dstdir = path$5.dirname(dstpath);
    const relativeToDst = path$5.join(dstdir, srcpath);
    return pathExists$3(relativeToDst, (err, exists) => {
      if (err) return callback(err)
      if (exists) {
        return callback(null, {
          toCwd: relativeToDst,
          toDst: srcpath
        })
      } else {
        return fs$6.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink');
            return callback(err)
          }
          return callback(null, {
            toCwd: srcpath,
            toDst: path$5.relative(dstdir, srcpath)
          })
        })
      }
    })
  }
}

function symlinkPathsSync$1 (srcpath, dstpath) {
  let exists;
  if (path$5.isAbsolute(srcpath)) {
    exists = fs$6.existsSync(srcpath);
    if (!exists) throw new Error('absolute srcpath does not exist')
    return {
      toCwd: srcpath,
      toDst: srcpath
    }
  } else {
    const dstdir = path$5.dirname(dstpath);
    const relativeToDst = path$5.join(dstdir, srcpath);
    exists = fs$6.existsSync(relativeToDst);
    if (exists) {
      return {
        toCwd: relativeToDst,
        toDst: srcpath
      }
    } else {
      exists = fs$6.existsSync(srcpath);
      if (!exists) throw new Error('relative srcpath does not exist')
      return {
        toCwd: srcpath,
        toDst: path$5.relative(dstdir, srcpath)
      }
    }
  }
}

var symlinkPaths_1 = {
  symlinkPaths: symlinkPaths$1,
  symlinkPathsSync: symlinkPathsSync$1
};

const fs$5 = gracefulFs;

function symlinkType$1 (srcpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback;
  type = (typeof type === 'function') ? false : type;
  if (type) return callback(null, type)
  fs$5.lstat(srcpath, (err, stats) => {
    if (err) return callback(null, 'file')
    type = (stats && stats.isDirectory()) ? 'dir' : 'file';
    callback(null, type);
  });
}

function symlinkTypeSync$1 (srcpath, type) {
  let stats;

  if (type) return type
  try {
    stats = fs$5.lstatSync(srcpath);
  } catch {
    return 'file'
  }
  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

var symlinkType_1 = {
  symlinkType: symlinkType$1,
  symlinkTypeSync: symlinkTypeSync$1
};

const u$3 = universalify$1.fromCallback;
const path$4 = require$$1__default$1.default;
const fs$4 = fs$j;
const _mkdirs = mkdirs$2;
const mkdirs = _mkdirs.mkdirs;
const mkdirsSync = _mkdirs.mkdirsSync;

const _symlinkPaths = symlinkPaths_1;
const symlinkPaths = _symlinkPaths.symlinkPaths;
const symlinkPathsSync = _symlinkPaths.symlinkPathsSync;

const _symlinkType = symlinkType_1;
const symlinkType = _symlinkType.symlinkType;
const symlinkTypeSync = _symlinkType.symlinkTypeSync;

const pathExists$2 = pathExists_1.pathExists;

const { areIdentical } = stat$4;

function createSymlink (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback;
  type = (typeof type === 'function') ? false : type;

  fs$4.lstat(dstpath, (err, stats) => {
    if (!err && stats.isSymbolicLink()) {
      Promise.all([
        fs$4.stat(srcpath),
        fs$4.stat(dstpath)
      ]).then(([srcStat, dstStat]) => {
        if (areIdentical(srcStat, dstStat)) return callback(null)
        _createSymlink(srcpath, dstpath, type, callback);
      });
    } else _createSymlink(srcpath, dstpath, type, callback);
  });
}

function _createSymlink (srcpath, dstpath, type, callback) {
  symlinkPaths(srcpath, dstpath, (err, relative) => {
    if (err) return callback(err)
    srcpath = relative.toDst;
    symlinkType(relative.toCwd, type, (err, type) => {
      if (err) return callback(err)
      const dir = path$4.dirname(dstpath);
      pathExists$2(dir, (err, dirExists) => {
        if (err) return callback(err)
        if (dirExists) return fs$4.symlink(srcpath, dstpath, type, callback)
        mkdirs(dir, err => {
          if (err) return callback(err)
          fs$4.symlink(srcpath, dstpath, type, callback);
        });
      });
    });
  });
}

function createSymlinkSync (srcpath, dstpath, type) {
  let stats;
  try {
    stats = fs$4.lstatSync(dstpath);
  } catch {}
  if (stats && stats.isSymbolicLink()) {
    const srcStat = fs$4.statSync(srcpath);
    const dstStat = fs$4.statSync(dstpath);
    if (areIdentical(srcStat, dstStat)) return
  }

  const relative = symlinkPathsSync(srcpath, dstpath);
  srcpath = relative.toDst;
  type = symlinkTypeSync(relative.toCwd, type);
  const dir = path$4.dirname(dstpath);
  const exists = fs$4.existsSync(dir);
  if (exists) return fs$4.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir);
  return fs$4.symlinkSync(srcpath, dstpath, type)
}

var symlink$1 = {
  createSymlink: u$3(createSymlink),
  createSymlinkSync
};

const file = file$1;
const link = link$1;
const symlink = symlink$1;

var ensure = {
  // file
  createFile: file.createFile,
  createFileSync: file.createFileSync,
  ensureFile: file.createFile,
  ensureFileSync: file.createFileSync,
  // link
  createLink: link.createLink,
  createLinkSync: link.createLinkSync,
  ensureLink: link.createLink,
  ensureLinkSync: link.createLinkSync,
  // symlink
  createSymlink: symlink.createSymlink,
  createSymlinkSync: symlink.createSymlinkSync,
  ensureSymlink: symlink.createSymlink,
  ensureSymlinkSync: symlink.createSymlinkSync
};

function stringify$5 (obj, { EOL = '\n', finalEOL = true, replacer = null, spaces } = {}) {
  const EOF = finalEOL ? EOL : '';
  const str = JSON.stringify(obj, replacer, spaces);

  return str.replace(/\n/g, EOL) + EOF
}

function stripBom$1 (content) {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8');
  return content.replace(/^\uFEFF/, '')
}

var utils = { stringify: stringify$5, stripBom: stripBom$1 };

let _fs;
try {
  _fs = gracefulFs;
} catch (_) {
  _fs = require$$1__default.default;
}
const universalify = universalify$1;
const { stringify: stringify$4, stripBom } = utils;

async function _readFile (file, options = {}) {
  if (typeof options === 'string') {
    options = { encoding: options };
  }

  const fs = options.fs || _fs;

  const shouldThrow = 'throws' in options ? options.throws : true;

  let data = await universalify.fromCallback(fs.readFile)(file, options);

  data = stripBom(data);

  let obj;
  try {
    obj = JSON.parse(data, options ? options.reviver : null);
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`;
      throw err
    } else {
      return null
    }
  }

  return obj
}

const readFile = universalify.fromPromise(_readFile);

function readFileSync (file, options = {}) {
  if (typeof options === 'string') {
    options = { encoding: options };
  }

  const fs = options.fs || _fs;

  const shouldThrow = 'throws' in options ? options.throws : true;

  try {
    let content = fs.readFileSync(file, options);
    content = stripBom(content);
    return JSON.parse(content, options.reviver)
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`;
      throw err
    } else {
      return null
    }
  }
}

async function _writeFile (file, obj, options = {}) {
  const fs = options.fs || _fs;

  const str = stringify$4(obj, options);

  await universalify.fromCallback(fs.writeFile)(file, str, options);
}

const writeFile = universalify.fromPromise(_writeFile);

function writeFileSync (file, obj, options = {}) {
  const fs = options.fs || _fs;

  const str = stringify$4(obj, options);
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

const jsonfile$1 = {
  readFile,
  readFileSync,
  writeFile,
  writeFileSync
};

var jsonfile_1 = jsonfile$1;

const jsonFile$1 = jsonfile_1;

var jsonfile = {
  // jsonfile exports
  readJson: jsonFile$1.readFile,
  readJsonSync: jsonFile$1.readFileSync,
  writeJson: jsonFile$1.writeFile,
  writeJsonSync: jsonFile$1.writeFileSync
};

const u$2 = universalify$1.fromCallback;
const fs$3 = gracefulFs;
const path$3 = require$$1__default$1.default;
const mkdir = mkdirs$2;
const pathExists$1 = pathExists_1.pathExists;

function outputFile$1 (file, data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding;
    encoding = 'utf8';
  }

  const dir = path$3.dirname(file);
  pathExists$1(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return fs$3.writeFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)

      fs$3.writeFile(file, data, encoding, callback);
    });
  });
}

function outputFileSync$1 (file, ...args) {
  const dir = path$3.dirname(file);
  if (fs$3.existsSync(dir)) {
    return fs$3.writeFileSync(file, ...args)
  }
  mkdir.mkdirsSync(dir);
  fs$3.writeFileSync(file, ...args);
}

var output = {
  outputFile: u$2(outputFile$1),
  outputFileSync: outputFileSync$1
};

const { stringify: stringify$3 } = utils;
const { outputFile } = output;

async function outputJson (file, data, options = {}) {
  const str = stringify$3(data, options);

  await outputFile(file, str, options);
}

var outputJson_1 = outputJson;

const { stringify: stringify$2 } = utils;
const { outputFileSync } = output;

function outputJsonSync (file, data, options) {
  const str = stringify$2(data, options);

  outputFileSync(file, str, options);
}

var outputJsonSync_1 = outputJsonSync;

const u$1 = universalify$1.fromPromise;
const jsonFile = jsonfile;

jsonFile.outputJson = u$1(outputJson_1);
jsonFile.outputJsonSync = outputJsonSync_1;
// aliases
jsonFile.outputJSON = jsonFile.outputJson;
jsonFile.outputJSONSync = jsonFile.outputJsonSync;
jsonFile.writeJSON = jsonFile.writeJson;
jsonFile.writeJSONSync = jsonFile.writeJsonSync;
jsonFile.readJSON = jsonFile.readJson;
jsonFile.readJSONSync = jsonFile.readJsonSync;

var json = jsonFile;

const fs$2 = gracefulFs;
const path$2 = require$$1__default$1.default;
const copySync = copySync$1.copySync;
const removeSync = remove_1.removeSync;
const mkdirpSync = mkdirs$2.mkdirpSync;
const stat$1 = stat$4;

function moveSync$1 (src, dest, opts) {
  opts = opts || {};
  const overwrite = opts.overwrite || opts.clobber || false;

  const { srcStat, isChangingCase = false } = stat$1.checkPathsSync(src, dest, 'move', opts);
  stat$1.checkParentPathsSync(src, srcStat, dest, 'move');
  if (!isParentRoot$1(dest)) mkdirpSync(path$2.dirname(dest));
  return doRename$1(src, dest, overwrite, isChangingCase)
}

function isParentRoot$1 (dest) {
  const parent = path$2.dirname(dest);
  const parsedPath = path$2.parse(parent);
  return parsedPath.root === parent
}

function doRename$1 (src, dest, overwrite, isChangingCase) {
  if (isChangingCase) return rename$1(src, dest, overwrite)
  if (overwrite) {
    removeSync(dest);
    return rename$1(src, dest, overwrite)
  }
  if (fs$2.existsSync(dest)) throw new Error('dest already exists.')
  return rename$1(src, dest, overwrite)
}

function rename$1 (src, dest, overwrite) {
  try {
    fs$2.renameSync(src, dest);
  } catch (err) {
    if (err.code !== 'EXDEV') throw err
    return moveAcrossDevice$1(src, dest, overwrite)
  }
}

function moveAcrossDevice$1 (src, dest, overwrite) {
  const opts = {
    overwrite,
    errorOnExist: true
  };
  copySync(src, dest, opts);
  return removeSync(src)
}

var moveSync_1 = moveSync$1;

var moveSync = {
  moveSync: moveSync_1
};

const fs$1 = gracefulFs;
const path$1 = require$$1__default$1.default;
const copy$1 = copy$2.copy;
const remove = remove_1.remove;
const mkdirp = mkdirs$2.mkdirp;
const pathExists = pathExists_1.pathExists;
const stat = stat$4;

function move$1 (src, dest, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  const overwrite = opts.overwrite || opts.clobber || false;

  stat.checkPaths(src, dest, 'move', opts, (err, stats) => {
    if (err) return cb(err)
    const { srcStat, isChangingCase = false } = stats;
    stat.checkParentPaths(src, srcStat, dest, 'move', err => {
      if (err) return cb(err)
      if (isParentRoot(dest)) return doRename(src, dest, overwrite, isChangingCase, cb)
      mkdirp(path$1.dirname(dest), err => {
        if (err) return cb(err)
        return doRename(src, dest, overwrite, isChangingCase, cb)
      });
    });
  });
}

function isParentRoot (dest) {
  const parent = path$1.dirname(dest);
  const parsedPath = path$1.parse(parent);
  return parsedPath.root === parent
}

function doRename (src, dest, overwrite, isChangingCase, cb) {
  if (isChangingCase) return rename(src, dest, overwrite, cb)
  if (overwrite) {
    return remove(dest, err => {
      if (err) return cb(err)
      return rename(src, dest, overwrite, cb)
    })
  }
  pathExists(dest, (err, destExists) => {
    if (err) return cb(err)
    if (destExists) return cb(new Error('dest already exists.'))
    return rename(src, dest, overwrite, cb)
  });
}

function rename (src, dest, overwrite, cb) {
  fs$1.rename(src, dest, err => {
    if (!err) return cb()
    if (err.code !== 'EXDEV') return cb(err)
    return moveAcrossDevice(src, dest, overwrite, cb)
  });
}

function moveAcrossDevice (src, dest, overwrite, cb) {
  const opts = {
    overwrite,
    errorOnExist: true
  };
  copy$1(src, dest, opts, err => {
    if (err) return cb(err)
    return remove(src, cb)
  });
}

var move_1 = move$1;

const u = universalify$1.fromCallback;
var move = {
  move: u(move_1)
};

var lib = {
  // Export promiseified graceful-fs:
  ...fs$j,
  // Export extra methods:
  ...copySync$1,
  ...copy$2,
  ...empty,
  ...ensure,
  ...json,
  ...mkdirs$2,
  ...moveSync,
  ...move,
  ...output,
  ...pathExists_1,
  ...remove_1
};

var esprimaExports = {};
var esprima$1 = {
  get exports(){ return esprimaExports; },
  set exports(v){ esprimaExports = v; },
};

(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
	/* istanbul ignore next */
		module.exports = factory();
	})(commonjsGlobal, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/* istanbul ignore if */
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
		/*
		  Copyright JS Foundation and other contributors, https://js.foundation/

		  Redistribution and use in source and binary forms, with or without
		  modification, are permitted provided that the following conditions are met:

		    * Redistributions of source code must retain the above copyright
		      notice, this list of conditions and the following disclaimer.
		    * Redistributions in binary form must reproduce the above copyright
		      notice, this list of conditions and the following disclaimer in the
		      documentation and/or other materials provided with the distribution.

		  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
		  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
		  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
		  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
		  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
		  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
		  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
		  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/
		Object.defineProperty(exports, "__esModule", { value: true });
		var comment_handler_1 = __webpack_require__(1);
		var jsx_parser_1 = __webpack_require__(3);
		var parser_1 = __webpack_require__(8);
		var tokenizer_1 = __webpack_require__(15);
		function parse(code, options, delegate) {
		    var commentHandler = null;
		    var proxyDelegate = function (node, metadata) {
		        if (delegate) {
		            delegate(node, metadata);
		        }
		        if (commentHandler) {
		            commentHandler.visit(node, metadata);
		        }
		    };
		    var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
		    var collectComment = false;
		    if (options) {
		        collectComment = (typeof options.comment === 'boolean' && options.comment);
		        var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
		        if (collectComment || attachComment) {
		            commentHandler = new comment_handler_1.CommentHandler();
		            commentHandler.attach = attachComment;
		            options.comment = true;
		            parserDelegate = proxyDelegate;
		        }
		    }
		    var isModule = false;
		    if (options && typeof options.sourceType === 'string') {
		        isModule = (options.sourceType === 'module');
		    }
		    var parser;
		    if (options && typeof options.jsx === 'boolean' && options.jsx) {
		        parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
		    }
		    else {
		        parser = new parser_1.Parser(code, options, parserDelegate);
		    }
		    var program = isModule ? parser.parseModule() : parser.parseScript();
		    var ast = program;
		    if (collectComment && commentHandler) {
		        ast.comments = commentHandler.comments;
		    }
		    if (parser.config.tokens) {
		        ast.tokens = parser.tokens;
		    }
		    if (parser.config.tolerant) {
		        ast.errors = parser.errorHandler.errors;
		    }
		    return ast;
		}
		exports.parse = parse;
		function parseModule(code, options, delegate) {
		    var parsingOptions = options || {};
		    parsingOptions.sourceType = 'module';
		    return parse(code, parsingOptions, delegate);
		}
		exports.parseModule = parseModule;
		function parseScript(code, options, delegate) {
		    var parsingOptions = options || {};
		    parsingOptions.sourceType = 'script';
		    return parse(code, parsingOptions, delegate);
		}
		exports.parseScript = parseScript;
		function tokenize(code, options, delegate) {
		    var tokenizer = new tokenizer_1.Tokenizer(code, options);
		    var tokens;
		    tokens = [];
		    try {
		        while (true) {
		            var token = tokenizer.getNextToken();
		            if (!token) {
		                break;
		            }
		            if (delegate) {
		                token = delegate(token);
		            }
		            tokens.push(token);
		        }
		    }
		    catch (e) {
		        tokenizer.errorHandler.tolerate(e);
		    }
		    if (tokenizer.errorHandler.tolerant) {
		        tokens.errors = tokenizer.errors();
		    }
		    return tokens;
		}
		exports.tokenize = tokenize;
		var syntax_1 = __webpack_require__(2);
		exports.Syntax = syntax_1.Syntax;
		// Sync with *.json manifests.
		exports.version = '4.0.1';


	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
		Object.defineProperty(exports, "__esModule", { value: true });
		var syntax_1 = __webpack_require__(2);
		var CommentHandler = (function () {
		    function CommentHandler() {
		        this.attach = false;
		        this.comments = [];
		        this.stack = [];
		        this.leading = [];
		        this.trailing = [];
		    }
		    CommentHandler.prototype.insertInnerComments = function (node, metadata) {
		        //  innnerComments for properties empty block
		        //  `function a() {/** comments **\/}`
		        if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
		            var innerComments = [];
		            for (var i = this.leading.length - 1; i >= 0; --i) {
		                var entry = this.leading[i];
		                if (metadata.end.offset >= entry.start) {
		                    innerComments.unshift(entry.comment);
		                    this.leading.splice(i, 1);
		                    this.trailing.splice(i, 1);
		                }
		            }
		            if (innerComments.length) {
		                node.innerComments = innerComments;
		            }
		        }
		    };
		    CommentHandler.prototype.findTrailingComments = function (metadata) {
		        var trailingComments = [];
		        if (this.trailing.length > 0) {
		            for (var i = this.trailing.length - 1; i >= 0; --i) {
		                var entry_1 = this.trailing[i];
		                if (entry_1.start >= metadata.end.offset) {
		                    trailingComments.unshift(entry_1.comment);
		                }
		            }
		            this.trailing.length = 0;
		            return trailingComments;
		        }
		        var entry = this.stack[this.stack.length - 1];
		        if (entry && entry.node.trailingComments) {
		            var firstComment = entry.node.trailingComments[0];
		            if (firstComment && firstComment.range[0] >= metadata.end.offset) {
		                trailingComments = entry.node.trailingComments;
		                delete entry.node.trailingComments;
		            }
		        }
		        return trailingComments;
		    };
		    CommentHandler.prototype.findLeadingComments = function (metadata) {
		        var leadingComments = [];
		        var target;
		        while (this.stack.length > 0) {
		            var entry = this.stack[this.stack.length - 1];
		            if (entry && entry.start >= metadata.start.offset) {
		                target = entry.node;
		                this.stack.pop();
		            }
		            else {
		                break;
		            }
		        }
		        if (target) {
		            var count = target.leadingComments ? target.leadingComments.length : 0;
		            for (var i = count - 1; i >= 0; --i) {
		                var comment = target.leadingComments[i];
		                if (comment.range[1] <= metadata.start.offset) {
		                    leadingComments.unshift(comment);
		                    target.leadingComments.splice(i, 1);
		                }
		            }
		            if (target.leadingComments && target.leadingComments.length === 0) {
		                delete target.leadingComments;
		            }
		            return leadingComments;
		        }
		        for (var i = this.leading.length - 1; i >= 0; --i) {
		            var entry = this.leading[i];
		            if (entry.start <= metadata.start.offset) {
		                leadingComments.unshift(entry.comment);
		                this.leading.splice(i, 1);
		            }
		        }
		        return leadingComments;
		    };
		    CommentHandler.prototype.visitNode = function (node, metadata) {
		        if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
		            return;
		        }
		        this.insertInnerComments(node, metadata);
		        var trailingComments = this.findTrailingComments(metadata);
		        var leadingComments = this.findLeadingComments(metadata);
		        if (leadingComments.length > 0) {
		            node.leadingComments = leadingComments;
		        }
		        if (trailingComments.length > 0) {
		            node.trailingComments = trailingComments;
		        }
		        this.stack.push({
		            node: node,
		            start: metadata.start.offset
		        });
		    };
		    CommentHandler.prototype.visitComment = function (node, metadata) {
		        var type = (node.type[0] === 'L') ? 'Line' : 'Block';
		        var comment = {
		            type: type,
		            value: node.value
		        };
		        if (node.range) {
		            comment.range = node.range;
		        }
		        if (node.loc) {
		            comment.loc = node.loc;
		        }
		        this.comments.push(comment);
		        if (this.attach) {
		            var entry = {
		                comment: {
		                    type: type,
		                    value: node.value,
		                    range: [metadata.start.offset, metadata.end.offset]
		                },
		                start: metadata.start.offset
		            };
		            if (node.loc) {
		                entry.comment.loc = node.loc;
		            }
		            node.type = type;
		            this.leading.push(entry);
		            this.trailing.push(entry);
		        }
		    };
		    CommentHandler.prototype.visit = function (node, metadata) {
		        if (node.type === 'LineComment') {
		            this.visitComment(node, metadata);
		        }
		        else if (node.type === 'BlockComment') {
		            this.visitComment(node, metadata);
		        }
		        else if (this.attach) {
		            this.visitNode(node, metadata);
		        }
		    };
		    return CommentHandler;
		}());
		exports.CommentHandler = CommentHandler;


	/***/ },
	/* 2 */
	/***/ function(module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Syntax = {
		    AssignmentExpression: 'AssignmentExpression',
		    AssignmentPattern: 'AssignmentPattern',
		    ArrayExpression: 'ArrayExpression',
		    ArrayPattern: 'ArrayPattern',
		    ArrowFunctionExpression: 'ArrowFunctionExpression',
		    AwaitExpression: 'AwaitExpression',
		    BlockStatement: 'BlockStatement',
		    BinaryExpression: 'BinaryExpression',
		    BreakStatement: 'BreakStatement',
		    CallExpression: 'CallExpression',
		    CatchClause: 'CatchClause',
		    ClassBody: 'ClassBody',
		    ClassDeclaration: 'ClassDeclaration',
		    ClassExpression: 'ClassExpression',
		    ConditionalExpression: 'ConditionalExpression',
		    ContinueStatement: 'ContinueStatement',
		    DoWhileStatement: 'DoWhileStatement',
		    DebuggerStatement: 'DebuggerStatement',
		    EmptyStatement: 'EmptyStatement',
		    ExportAllDeclaration: 'ExportAllDeclaration',
		    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
		    ExportNamedDeclaration: 'ExportNamedDeclaration',
		    ExportSpecifier: 'ExportSpecifier',
		    ExpressionStatement: 'ExpressionStatement',
		    ForStatement: 'ForStatement',
		    ForOfStatement: 'ForOfStatement',
		    ForInStatement: 'ForInStatement',
		    FunctionDeclaration: 'FunctionDeclaration',
		    FunctionExpression: 'FunctionExpression',
		    Identifier: 'Identifier',
		    IfStatement: 'IfStatement',
		    ImportDeclaration: 'ImportDeclaration',
		    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
		    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
		    ImportSpecifier: 'ImportSpecifier',
		    Literal: 'Literal',
		    LabeledStatement: 'LabeledStatement',
		    LogicalExpression: 'LogicalExpression',
		    MemberExpression: 'MemberExpression',
		    MetaProperty: 'MetaProperty',
		    MethodDefinition: 'MethodDefinition',
		    NewExpression: 'NewExpression',
		    ObjectExpression: 'ObjectExpression',
		    ObjectPattern: 'ObjectPattern',
		    Program: 'Program',
		    Property: 'Property',
		    RestElement: 'RestElement',
		    ReturnStatement: 'ReturnStatement',
		    SequenceExpression: 'SequenceExpression',
		    SpreadElement: 'SpreadElement',
		    Super: 'Super',
		    SwitchCase: 'SwitchCase',
		    SwitchStatement: 'SwitchStatement',
		    TaggedTemplateExpression: 'TaggedTemplateExpression',
		    TemplateElement: 'TemplateElement',
		    TemplateLiteral: 'TemplateLiteral',
		    ThisExpression: 'ThisExpression',
		    ThrowStatement: 'ThrowStatement',
		    TryStatement: 'TryStatement',
		    UnaryExpression: 'UnaryExpression',
		    UpdateExpression: 'UpdateExpression',
		    VariableDeclaration: 'VariableDeclaration',
		    VariableDeclarator: 'VariableDeclarator',
		    WhileStatement: 'WhileStatement',
		    WithStatement: 'WithStatement',
		    YieldExpression: 'YieldExpression'
		};


	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	/* istanbul ignore next */
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var character_1 = __webpack_require__(4);
		var JSXNode = __webpack_require__(5);
		var jsx_syntax_1 = __webpack_require__(6);
		var Node = __webpack_require__(7);
		var parser_1 = __webpack_require__(8);
		var token_1 = __webpack_require__(13);
		var xhtml_entities_1 = __webpack_require__(14);
		token_1.TokenName[100 /* Identifier */] = 'JSXIdentifier';
		token_1.TokenName[101 /* Text */] = 'JSXText';
		// Fully qualified element name, e.g. <svg:path> returns "svg:path"
		function getQualifiedElementName(elementName) {
		    var qualifiedName;
		    switch (elementName.type) {
		        case jsx_syntax_1.JSXSyntax.JSXIdentifier:
		            var id = elementName;
		            qualifiedName = id.name;
		            break;
		        case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
		            var ns = elementName;
		            qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
		                getQualifiedElementName(ns.name);
		            break;
		        case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
		            var expr = elementName;
		            qualifiedName = getQualifiedElementName(expr.object) + '.' +
		                getQualifiedElementName(expr.property);
		            break;
		    }
		    return qualifiedName;
		}
		var JSXParser = (function (_super) {
		    __extends(JSXParser, _super);
		    function JSXParser(code, options, delegate) {
		        return _super.call(this, code, options, delegate) || this;
		    }
		    JSXParser.prototype.parsePrimaryExpression = function () {
		        return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
		    };
		    JSXParser.prototype.startJSX = function () {
		        // Unwind the scanner before the lookahead token.
		        this.scanner.index = this.startMarker.index;
		        this.scanner.lineNumber = this.startMarker.line;
		        this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
		    };
		    JSXParser.prototype.finishJSX = function () {
		        // Prime the next lookahead.
		        this.nextToken();
		    };
		    JSXParser.prototype.reenterJSX = function () {
		        this.startJSX();
		        this.expectJSX('}');
		        // Pop the closing '}' added from the lookahead.
		        if (this.config.tokens) {
		            this.tokens.pop();
		        }
		    };
		    JSXParser.prototype.createJSXNode = function () {
		        this.collectComments();
		        return {
		            index: this.scanner.index,
		            line: this.scanner.lineNumber,
		            column: this.scanner.index - this.scanner.lineStart
		        };
		    };
		    JSXParser.prototype.createJSXChildNode = function () {
		        return {
		            index: this.scanner.index,
		            line: this.scanner.lineNumber,
		            column: this.scanner.index - this.scanner.lineStart
		        };
		    };
		    JSXParser.prototype.scanXHTMLEntity = function (quote) {
		        var result = '&';
		        var valid = true;
		        var terminated = false;
		        var numeric = false;
		        var hex = false;
		        while (!this.scanner.eof() && valid && !terminated) {
		            var ch = this.scanner.source[this.scanner.index];
		            if (ch === quote) {
		                break;
		            }
		            terminated = (ch === ';');
		            result += ch;
		            ++this.scanner.index;
		            if (!terminated) {
		                switch (result.length) {
		                    case 2:
		                        // e.g. '&#123;'
		                        numeric = (ch === '#');
		                        break;
		                    case 3:
		                        if (numeric) {
		                            // e.g. '&#x41;'
		                            hex = (ch === 'x');
		                            valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
		                            numeric = numeric && !hex;
		                        }
		                        break;
		                    default:
		                        valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
		                        valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
		                        break;
		                }
		            }
		        }
		        if (valid && terminated && result.length > 2) {
		            // e.g. '&#x41;' becomes just '#x41'
		            var str = result.substr(1, result.length - 2);
		            if (numeric && str.length > 1) {
		                result = String.fromCharCode(parseInt(str.substr(1), 10));
		            }
		            else if (hex && str.length > 2) {
		                result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
		            }
		            else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
		                result = xhtml_entities_1.XHTMLEntities[str];
		            }
		        }
		        return result;
		    };
		    // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
		    JSXParser.prototype.lexJSX = function () {
		        var cp = this.scanner.source.charCodeAt(this.scanner.index);
		        // < > / : = { }
		        if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
		            var value = this.scanner.source[this.scanner.index++];
		            return {
		                type: 7 /* Punctuator */,
		                value: value,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: this.scanner.index - 1,
		                end: this.scanner.index
		            };
		        }
		        // " '
		        if (cp === 34 || cp === 39) {
		            var start = this.scanner.index;
		            var quote = this.scanner.source[this.scanner.index++];
		            var str = '';
		            while (!this.scanner.eof()) {
		                var ch = this.scanner.source[this.scanner.index++];
		                if (ch === quote) {
		                    break;
		                }
		                else if (ch === '&') {
		                    str += this.scanXHTMLEntity(quote);
		                }
		                else {
		                    str += ch;
		                }
		            }
		            return {
		                type: 8 /* StringLiteral */,
		                value: str,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: start,
		                end: this.scanner.index
		            };
		        }
		        // ... or .
		        if (cp === 46) {
		            var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
		            var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
		            var value = (n1 === 46 && n2 === 46) ? '...' : '.';
		            var start = this.scanner.index;
		            this.scanner.index += value.length;
		            return {
		                type: 7 /* Punctuator */,
		                value: value,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: start,
		                end: this.scanner.index
		            };
		        }
		        // `
		        if (cp === 96) {
		            // Only placeholder, since it will be rescanned as a real assignment expression.
		            return {
		                type: 10 /* Template */,
		                value: '',
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: this.scanner.index,
		                end: this.scanner.index
		            };
		        }
		        // Identifer can not contain backslash (char code 92).
		        if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
		            var start = this.scanner.index;
		            ++this.scanner.index;
		            while (!this.scanner.eof()) {
		                var ch = this.scanner.source.charCodeAt(this.scanner.index);
		                if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
		                    ++this.scanner.index;
		                }
		                else if (ch === 45) {
		                    // Hyphen (char code 45) can be part of an identifier.
		                    ++this.scanner.index;
		                }
		                else {
		                    break;
		                }
		            }
		            var id = this.scanner.source.slice(start, this.scanner.index);
		            return {
		                type: 100 /* Identifier */,
		                value: id,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: start,
		                end: this.scanner.index
		            };
		        }
		        return this.scanner.lex();
		    };
		    JSXParser.prototype.nextJSXToken = function () {
		        this.collectComments();
		        this.startMarker.index = this.scanner.index;
		        this.startMarker.line = this.scanner.lineNumber;
		        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
		        var token = this.lexJSX();
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.line = this.scanner.lineNumber;
		        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
		        if (this.config.tokens) {
		            this.tokens.push(this.convertToken(token));
		        }
		        return token;
		    };
		    JSXParser.prototype.nextJSXText = function () {
		        this.startMarker.index = this.scanner.index;
		        this.startMarker.line = this.scanner.lineNumber;
		        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
		        var start = this.scanner.index;
		        var text = '';
		        while (!this.scanner.eof()) {
		            var ch = this.scanner.source[this.scanner.index];
		            if (ch === '{' || ch === '<') {
		                break;
		            }
		            ++this.scanner.index;
		            text += ch;
		            if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                ++this.scanner.lineNumber;
		                if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
		                    ++this.scanner.index;
		                }
		                this.scanner.lineStart = this.scanner.index;
		            }
		        }
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.line = this.scanner.lineNumber;
		        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
		        var token = {
		            type: 101 /* Text */,
		            value: text,
		            lineNumber: this.scanner.lineNumber,
		            lineStart: this.scanner.lineStart,
		            start: start,
		            end: this.scanner.index
		        };
		        if ((text.length > 0) && this.config.tokens) {
		            this.tokens.push(this.convertToken(token));
		        }
		        return token;
		    };
		    JSXParser.prototype.peekJSXToken = function () {
		        var state = this.scanner.saveState();
		        this.scanner.scanComments();
		        var next = this.lexJSX();
		        this.scanner.restoreState(state);
		        return next;
		    };
		    // Expect the next JSX token to match the specified punctuator.
		    // If not, an exception will be thrown.
		    JSXParser.prototype.expectJSX = function (value) {
		        var token = this.nextJSXToken();
		        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
		            this.throwUnexpectedToken(token);
		        }
		    };
		    // Return true if the next JSX token matches the specified punctuator.
		    JSXParser.prototype.matchJSX = function (value) {
		        var next = this.peekJSXToken();
		        return next.type === 7 /* Punctuator */ && next.value === value;
		    };
		    JSXParser.prototype.parseJSXIdentifier = function () {
		        var node = this.createJSXNode();
		        var token = this.nextJSXToken();
		        if (token.type !== 100 /* Identifier */) {
		            this.throwUnexpectedToken(token);
		        }
		        return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
		    };
		    JSXParser.prototype.parseJSXElementName = function () {
		        var node = this.createJSXNode();
		        var elementName = this.parseJSXIdentifier();
		        if (this.matchJSX(':')) {
		            var namespace = elementName;
		            this.expectJSX(':');
		            var name_1 = this.parseJSXIdentifier();
		            elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
		        }
		        else if (this.matchJSX('.')) {
		            while (this.matchJSX('.')) {
		                var object = elementName;
		                this.expectJSX('.');
		                var property = this.parseJSXIdentifier();
		                elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
		            }
		        }
		        return elementName;
		    };
		    JSXParser.prototype.parseJSXAttributeName = function () {
		        var node = this.createJSXNode();
		        var attributeName;
		        var identifier = this.parseJSXIdentifier();
		        if (this.matchJSX(':')) {
		            var namespace = identifier;
		            this.expectJSX(':');
		            var name_2 = this.parseJSXIdentifier();
		            attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
		        }
		        else {
		            attributeName = identifier;
		        }
		        return attributeName;
		    };
		    JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
		        var node = this.createJSXNode();
		        var token = this.nextJSXToken();
		        if (token.type !== 8 /* StringLiteral */) {
		            this.throwUnexpectedToken(token);
		        }
		        var raw = this.getTokenRaw(token);
		        return this.finalize(node, new Node.Literal(token.value, raw));
		    };
		    JSXParser.prototype.parseJSXExpressionAttribute = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('{');
		        this.finishJSX();
		        if (this.match('}')) {
		            this.tolerateError('JSX attributes must only be assigned a non-empty expression');
		        }
		        var expression = this.parseAssignmentExpression();
		        this.reenterJSX();
		        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
		    };
		    JSXParser.prototype.parseJSXAttributeValue = function () {
		        return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
		            this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
		    };
		    JSXParser.prototype.parseJSXNameValueAttribute = function () {
		        var node = this.createJSXNode();
		        var name = this.parseJSXAttributeName();
		        var value = null;
		        if (this.matchJSX('=')) {
		            this.expectJSX('=');
		            value = this.parseJSXAttributeValue();
		        }
		        return this.finalize(node, new JSXNode.JSXAttribute(name, value));
		    };
		    JSXParser.prototype.parseJSXSpreadAttribute = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('{');
		        this.expectJSX('...');
		        this.finishJSX();
		        var argument = this.parseAssignmentExpression();
		        this.reenterJSX();
		        return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
		    };
		    JSXParser.prototype.parseJSXAttributes = function () {
		        var attributes = [];
		        while (!this.matchJSX('/') && !this.matchJSX('>')) {
		            var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
		                this.parseJSXNameValueAttribute();
		            attributes.push(attribute);
		        }
		        return attributes;
		    };
		    JSXParser.prototype.parseJSXOpeningElement = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('<');
		        var name = this.parseJSXElementName();
		        var attributes = this.parseJSXAttributes();
		        var selfClosing = this.matchJSX('/');
		        if (selfClosing) {
		            this.expectJSX('/');
		        }
		        this.expectJSX('>');
		        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
		    };
		    JSXParser.prototype.parseJSXBoundaryElement = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('<');
		        if (this.matchJSX('/')) {
		            this.expectJSX('/');
		            var name_3 = this.parseJSXElementName();
		            this.expectJSX('>');
		            return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
		        }
		        var name = this.parseJSXElementName();
		        var attributes = this.parseJSXAttributes();
		        var selfClosing = this.matchJSX('/');
		        if (selfClosing) {
		            this.expectJSX('/');
		        }
		        this.expectJSX('>');
		        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
		    };
		    JSXParser.prototype.parseJSXEmptyExpression = function () {
		        var node = this.createJSXChildNode();
		        this.collectComments();
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.line = this.scanner.lineNumber;
		        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
		        return this.finalize(node, new JSXNode.JSXEmptyExpression());
		    };
		    JSXParser.prototype.parseJSXExpressionContainer = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('{');
		        var expression;
		        if (this.matchJSX('}')) {
		            expression = this.parseJSXEmptyExpression();
		            this.expectJSX('}');
		        }
		        else {
		            this.finishJSX();
		            expression = this.parseAssignmentExpression();
		            this.reenterJSX();
		        }
		        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
		    };
		    JSXParser.prototype.parseJSXChildren = function () {
		        var children = [];
		        while (!this.scanner.eof()) {
		            var node = this.createJSXChildNode();
		            var token = this.nextJSXText();
		            if (token.start < token.end) {
		                var raw = this.getTokenRaw(token);
		                var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
		                children.push(child);
		            }
		            if (this.scanner.source[this.scanner.index] === '{') {
		                var container = this.parseJSXExpressionContainer();
		                children.push(container);
		            }
		            else {
		                break;
		            }
		        }
		        return children;
		    };
		    JSXParser.prototype.parseComplexJSXElement = function (el) {
		        var stack = [];
		        while (!this.scanner.eof()) {
		            el.children = el.children.concat(this.parseJSXChildren());
		            var node = this.createJSXChildNode();
		            var element = this.parseJSXBoundaryElement();
		            if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
		                var opening = element;
		                if (opening.selfClosing) {
		                    var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
		                    el.children.push(child);
		                }
		                else {
		                    stack.push(el);
		                    el = { node: node, opening: opening, closing: null, children: [] };
		                }
		            }
		            if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
		                el.closing = element;
		                var open_1 = getQualifiedElementName(el.opening.name);
		                var close_1 = getQualifiedElementName(el.closing.name);
		                if (open_1 !== close_1) {
		                    this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
		                }
		                if (stack.length > 0) {
		                    var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
		                    el = stack[stack.length - 1];
		                    el.children.push(child);
		                    stack.pop();
		                }
		                else {
		                    break;
		                }
		            }
		        }
		        return el;
		    };
		    JSXParser.prototype.parseJSXElement = function () {
		        var node = this.createJSXNode();
		        var opening = this.parseJSXOpeningElement();
		        var children = [];
		        var closing = null;
		        if (!opening.selfClosing) {
		            var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
		            children = el.children;
		            closing = el.closing;
		        }
		        return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
		    };
		    JSXParser.prototype.parseJSXRoot = function () {
		        // Pop the opening '<' added from the lookahead.
		        if (this.config.tokens) {
		            this.tokens.pop();
		        }
		        this.startJSX();
		        var element = this.parseJSXElement();
		        this.finishJSX();
		        return element;
		    };
		    JSXParser.prototype.isStartOfExpression = function () {
		        return _super.prototype.isStartOfExpression.call(this) || this.match('<');
		    };
		    return JSXParser;
		}(parser_1.Parser));
		exports.JSXParser = JSXParser;


	/***/ },
	/* 4 */
	/***/ function(module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		// See also tools/generate-unicode-regex.js.
		var Regex = {
		    // Unicode v8.0.0 NonAsciiIdentifierStart:
		    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
		    // Unicode v8.0.0 NonAsciiIdentifierPart:
		    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
		};
		exports.Character = {
		    /* tslint:disable:no-bitwise */
		    fromCodePoint: function (cp) {
		        return (cp < 0x10000) ? String.fromCharCode(cp) :
		            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
		                String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
		    },
		    // https://tc39.github.io/ecma262/#sec-white-space
		    isWhiteSpace: function (cp) {
		        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
		            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
		    },
		    // https://tc39.github.io/ecma262/#sec-line-terminators
		    isLineTerminator: function (cp) {
		        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
		    },
		    // https://tc39.github.io/ecma262/#sec-names-and-keywords
		    isIdentifierStart: function (cp) {
		        return (cp === 0x24) || (cp === 0x5F) ||
		            (cp >= 0x41 && cp <= 0x5A) ||
		            (cp >= 0x61 && cp <= 0x7A) ||
		            (cp === 0x5C) ||
		            ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
		    },
		    isIdentifierPart: function (cp) {
		        return (cp === 0x24) || (cp === 0x5F) ||
		            (cp >= 0x41 && cp <= 0x5A) ||
		            (cp >= 0x61 && cp <= 0x7A) ||
		            (cp >= 0x30 && cp <= 0x39) ||
		            (cp === 0x5C) ||
		            ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
		    },
		    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
		    isDecimalDigit: function (cp) {
		        return (cp >= 0x30 && cp <= 0x39); // 0..9
		    },
		    isHexDigit: function (cp) {
		        return (cp >= 0x30 && cp <= 0x39) ||
		            (cp >= 0x41 && cp <= 0x46) ||
		            (cp >= 0x61 && cp <= 0x66); // a..f
		    },
		    isOctalDigit: function (cp) {
		        return (cp >= 0x30 && cp <= 0x37); // 0..7
		    }
		};


	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
		Object.defineProperty(exports, "__esModule", { value: true });
		var jsx_syntax_1 = __webpack_require__(6);
		/* tslint:disable:max-classes-per-file */
		var JSXClosingElement = (function () {
		    function JSXClosingElement(name) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
		        this.name = name;
		    }
		    return JSXClosingElement;
		}());
		exports.JSXClosingElement = JSXClosingElement;
		var JSXElement = (function () {
		    function JSXElement(openingElement, children, closingElement) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXElement;
		        this.openingElement = openingElement;
		        this.children = children;
		        this.closingElement = closingElement;
		    }
		    return JSXElement;
		}());
		exports.JSXElement = JSXElement;
		var JSXEmptyExpression = (function () {
		    function JSXEmptyExpression() {
		        this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
		    }
		    return JSXEmptyExpression;
		}());
		exports.JSXEmptyExpression = JSXEmptyExpression;
		var JSXExpressionContainer = (function () {
		    function JSXExpressionContainer(expression) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
		        this.expression = expression;
		    }
		    return JSXExpressionContainer;
		}());
		exports.JSXExpressionContainer = JSXExpressionContainer;
		var JSXIdentifier = (function () {
		    function JSXIdentifier(name) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
		        this.name = name;
		    }
		    return JSXIdentifier;
		}());
		exports.JSXIdentifier = JSXIdentifier;
		var JSXMemberExpression = (function () {
		    function JSXMemberExpression(object, property) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
		        this.object = object;
		        this.property = property;
		    }
		    return JSXMemberExpression;
		}());
		exports.JSXMemberExpression = JSXMemberExpression;
		var JSXAttribute = (function () {
		    function JSXAttribute(name, value) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
		        this.name = name;
		        this.value = value;
		    }
		    return JSXAttribute;
		}());
		exports.JSXAttribute = JSXAttribute;
		var JSXNamespacedName = (function () {
		    function JSXNamespacedName(namespace, name) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
		        this.namespace = namespace;
		        this.name = name;
		    }
		    return JSXNamespacedName;
		}());
		exports.JSXNamespacedName = JSXNamespacedName;
		var JSXOpeningElement = (function () {
		    function JSXOpeningElement(name, selfClosing, attributes) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
		        this.name = name;
		        this.selfClosing = selfClosing;
		        this.attributes = attributes;
		    }
		    return JSXOpeningElement;
		}());
		exports.JSXOpeningElement = JSXOpeningElement;
		var JSXSpreadAttribute = (function () {
		    function JSXSpreadAttribute(argument) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
		        this.argument = argument;
		    }
		    return JSXSpreadAttribute;
		}());
		exports.JSXSpreadAttribute = JSXSpreadAttribute;
		var JSXText = (function () {
		    function JSXText(value, raw) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXText;
		        this.value = value;
		        this.raw = raw;
		    }
		    return JSXText;
		}());
		exports.JSXText = JSXText;


	/***/ },
	/* 6 */
	/***/ function(module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.JSXSyntax = {
		    JSXAttribute: 'JSXAttribute',
		    JSXClosingElement: 'JSXClosingElement',
		    JSXElement: 'JSXElement',
		    JSXEmptyExpression: 'JSXEmptyExpression',
		    JSXExpressionContainer: 'JSXExpressionContainer',
		    JSXIdentifier: 'JSXIdentifier',
		    JSXMemberExpression: 'JSXMemberExpression',
		    JSXNamespacedName: 'JSXNamespacedName',
		    JSXOpeningElement: 'JSXOpeningElement',
		    JSXSpreadAttribute: 'JSXSpreadAttribute',
		    JSXText: 'JSXText'
		};


	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
		Object.defineProperty(exports, "__esModule", { value: true });
		var syntax_1 = __webpack_require__(2);
		/* tslint:disable:max-classes-per-file */
		var ArrayExpression = (function () {
		    function ArrayExpression(elements) {
		        this.type = syntax_1.Syntax.ArrayExpression;
		        this.elements = elements;
		    }
		    return ArrayExpression;
		}());
		exports.ArrayExpression = ArrayExpression;
		var ArrayPattern = (function () {
		    function ArrayPattern(elements) {
		        this.type = syntax_1.Syntax.ArrayPattern;
		        this.elements = elements;
		    }
		    return ArrayPattern;
		}());
		exports.ArrayPattern = ArrayPattern;
		var ArrowFunctionExpression = (function () {
		    function ArrowFunctionExpression(params, body, expression) {
		        this.type = syntax_1.Syntax.ArrowFunctionExpression;
		        this.id = null;
		        this.params = params;
		        this.body = body;
		        this.generator = false;
		        this.expression = expression;
		        this.async = false;
		    }
		    return ArrowFunctionExpression;
		}());
		exports.ArrowFunctionExpression = ArrowFunctionExpression;
		var AssignmentExpression = (function () {
		    function AssignmentExpression(operator, left, right) {
		        this.type = syntax_1.Syntax.AssignmentExpression;
		        this.operator = operator;
		        this.left = left;
		        this.right = right;
		    }
		    return AssignmentExpression;
		}());
		exports.AssignmentExpression = AssignmentExpression;
		var AssignmentPattern = (function () {
		    function AssignmentPattern(left, right) {
		        this.type = syntax_1.Syntax.AssignmentPattern;
		        this.left = left;
		        this.right = right;
		    }
		    return AssignmentPattern;
		}());
		exports.AssignmentPattern = AssignmentPattern;
		var AsyncArrowFunctionExpression = (function () {
		    function AsyncArrowFunctionExpression(params, body, expression) {
		        this.type = syntax_1.Syntax.ArrowFunctionExpression;
		        this.id = null;
		        this.params = params;
		        this.body = body;
		        this.generator = false;
		        this.expression = expression;
		        this.async = true;
		    }
		    return AsyncArrowFunctionExpression;
		}());
		exports.AsyncArrowFunctionExpression = AsyncArrowFunctionExpression;
		var AsyncFunctionDeclaration = (function () {
		    function AsyncFunctionDeclaration(id, params, body) {
		        this.type = syntax_1.Syntax.FunctionDeclaration;
		        this.id = id;
		        this.params = params;
		        this.body = body;
		        this.generator = false;
		        this.expression = false;
		        this.async = true;
		    }
		    return AsyncFunctionDeclaration;
		}());
		exports.AsyncFunctionDeclaration = AsyncFunctionDeclaration;
		var AsyncFunctionExpression = (function () {
		    function AsyncFunctionExpression(id, params, body) {
		        this.type = syntax_1.Syntax.FunctionExpression;
		        this.id = id;
		        this.params = params;
		        this.body = body;
		        this.generator = false;
		        this.expression = false;
		        this.async = true;
		    }
		    return AsyncFunctionExpression;
		}());
		exports.AsyncFunctionExpression = AsyncFunctionExpression;
		var AwaitExpression = (function () {
		    function AwaitExpression(argument) {
		        this.type = syntax_1.Syntax.AwaitExpression;
		        this.argument = argument;
		    }
		    return AwaitExpression;
		}());
		exports.AwaitExpression = AwaitExpression;
		var BinaryExpression = (function () {
		    function BinaryExpression(operator, left, right) {
		        var logical = (operator === '||' || operator === '&&');
		        this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
		        this.operator = operator;
		        this.left = left;
		        this.right = right;
		    }
		    return BinaryExpression;
		}());
		exports.BinaryExpression = BinaryExpression;
		var BlockStatement = (function () {
		    function BlockStatement(body) {
		        this.type = syntax_1.Syntax.BlockStatement;
		        this.body = body;
		    }
		    return BlockStatement;
		}());
		exports.BlockStatement = BlockStatement;
		var BreakStatement = (function () {
		    function BreakStatement(label) {
		        this.type = syntax_1.Syntax.BreakStatement;
		        this.label = label;
		    }
		    return BreakStatement;
		}());
		exports.BreakStatement = BreakStatement;
		var CallExpression = (function () {
		    function CallExpression(callee, args) {
		        this.type = syntax_1.Syntax.CallExpression;
		        this.callee = callee;
		        this.arguments = args;
		    }
		    return CallExpression;
		}());
		exports.CallExpression = CallExpression;
		var CatchClause = (function () {
		    function CatchClause(param, body) {
		        this.type = syntax_1.Syntax.CatchClause;
		        this.param = param;
		        this.body = body;
		    }
		    return CatchClause;
		}());
		exports.CatchClause = CatchClause;
		var ClassBody = (function () {
		    function ClassBody(body) {
		        this.type = syntax_1.Syntax.ClassBody;
		        this.body = body;
		    }
		    return ClassBody;
		}());
		exports.ClassBody = ClassBody;
		var ClassDeclaration = (function () {
		    function ClassDeclaration(id, superClass, body) {
		        this.type = syntax_1.Syntax.ClassDeclaration;
		        this.id = id;
		        this.superClass = superClass;
		        this.body = body;
		    }
		    return ClassDeclaration;
		}());
		exports.ClassDeclaration = ClassDeclaration;
		var ClassExpression = (function () {
		    function ClassExpression(id, superClass, body) {
		        this.type = syntax_1.Syntax.ClassExpression;
		        this.id = id;
		        this.superClass = superClass;
		        this.body = body;
		    }
		    return ClassExpression;
		}());
		exports.ClassExpression = ClassExpression;
		var ComputedMemberExpression = (function () {
		    function ComputedMemberExpression(object, property) {
		        this.type = syntax_1.Syntax.MemberExpression;
		        this.computed = true;
		        this.object = object;
		        this.property = property;
		    }
		    return ComputedMemberExpression;
		}());
		exports.ComputedMemberExpression = ComputedMemberExpression;
		var ConditionalExpression = (function () {
		    function ConditionalExpression(test, consequent, alternate) {
		        this.type = syntax_1.Syntax.ConditionalExpression;
		        this.test = test;
		        this.consequent = consequent;
		        this.alternate = alternate;
		    }
		    return ConditionalExpression;
		}());
		exports.ConditionalExpression = ConditionalExpression;
		var ContinueStatement = (function () {
		    function ContinueStatement(label) {
		        this.type = syntax_1.Syntax.ContinueStatement;
		        this.label = label;
		    }
		    return ContinueStatement;
		}());
		exports.ContinueStatement = ContinueStatement;
		var DebuggerStatement = (function () {
		    function DebuggerStatement() {
		        this.type = syntax_1.Syntax.DebuggerStatement;
		    }
		    return DebuggerStatement;
		}());
		exports.DebuggerStatement = DebuggerStatement;
		var Directive = (function () {
		    function Directive(expression, directive) {
		        this.type = syntax_1.Syntax.ExpressionStatement;
		        this.expression = expression;
		        this.directive = directive;
		    }
		    return Directive;
		}());
		exports.Directive = Directive;
		var DoWhileStatement = (function () {
		    function DoWhileStatement(body, test) {
		        this.type = syntax_1.Syntax.DoWhileStatement;
		        this.body = body;
		        this.test = test;
		    }
		    return DoWhileStatement;
		}());
		exports.DoWhileStatement = DoWhileStatement;
		var EmptyStatement = (function () {
		    function EmptyStatement() {
		        this.type = syntax_1.Syntax.EmptyStatement;
		    }
		    return EmptyStatement;
		}());
		exports.EmptyStatement = EmptyStatement;
		var ExportAllDeclaration = (function () {
		    function ExportAllDeclaration(source) {
		        this.type = syntax_1.Syntax.ExportAllDeclaration;
		        this.source = source;
		    }
		    return ExportAllDeclaration;
		}());
		exports.ExportAllDeclaration = ExportAllDeclaration;
		var ExportDefaultDeclaration = (function () {
		    function ExportDefaultDeclaration(declaration) {
		        this.type = syntax_1.Syntax.ExportDefaultDeclaration;
		        this.declaration = declaration;
		    }
		    return ExportDefaultDeclaration;
		}());
		exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
		var ExportNamedDeclaration = (function () {
		    function ExportNamedDeclaration(declaration, specifiers, source) {
		        this.type = syntax_1.Syntax.ExportNamedDeclaration;
		        this.declaration = declaration;
		        this.specifiers = specifiers;
		        this.source = source;
		    }
		    return ExportNamedDeclaration;
		}());
		exports.ExportNamedDeclaration = ExportNamedDeclaration;
		var ExportSpecifier = (function () {
		    function ExportSpecifier(local, exported) {
		        this.type = syntax_1.Syntax.ExportSpecifier;
		        this.exported = exported;
		        this.local = local;
		    }
		    return ExportSpecifier;
		}());
		exports.ExportSpecifier = ExportSpecifier;
		var ExpressionStatement = (function () {
		    function ExpressionStatement(expression) {
		        this.type = syntax_1.Syntax.ExpressionStatement;
		        this.expression = expression;
		    }
		    return ExpressionStatement;
		}());
		exports.ExpressionStatement = ExpressionStatement;
		var ForInStatement = (function () {
		    function ForInStatement(left, right, body) {
		        this.type = syntax_1.Syntax.ForInStatement;
		        this.left = left;
		        this.right = right;
		        this.body = body;
		        this.each = false;
		    }
		    return ForInStatement;
		}());
		exports.ForInStatement = ForInStatement;
		var ForOfStatement = (function () {
		    function ForOfStatement(left, right, body) {
		        this.type = syntax_1.Syntax.ForOfStatement;
		        this.left = left;
		        this.right = right;
		        this.body = body;
		    }
		    return ForOfStatement;
		}());
		exports.ForOfStatement = ForOfStatement;
		var ForStatement = (function () {
		    function ForStatement(init, test, update, body) {
		        this.type = syntax_1.Syntax.ForStatement;
		        this.init = init;
		        this.test = test;
		        this.update = update;
		        this.body = body;
		    }
		    return ForStatement;
		}());
		exports.ForStatement = ForStatement;
		var FunctionDeclaration = (function () {
		    function FunctionDeclaration(id, params, body, generator) {
		        this.type = syntax_1.Syntax.FunctionDeclaration;
		        this.id = id;
		        this.params = params;
		        this.body = body;
		        this.generator = generator;
		        this.expression = false;
		        this.async = false;
		    }
		    return FunctionDeclaration;
		}());
		exports.FunctionDeclaration = FunctionDeclaration;
		var FunctionExpression = (function () {
		    function FunctionExpression(id, params, body, generator) {
		        this.type = syntax_1.Syntax.FunctionExpression;
		        this.id = id;
		        this.params = params;
		        this.body = body;
		        this.generator = generator;
		        this.expression = false;
		        this.async = false;
		    }
		    return FunctionExpression;
		}());
		exports.FunctionExpression = FunctionExpression;
		var Identifier = (function () {
		    function Identifier(name) {
		        this.type = syntax_1.Syntax.Identifier;
		        this.name = name;
		    }
		    return Identifier;
		}());
		exports.Identifier = Identifier;
		var IfStatement = (function () {
		    function IfStatement(test, consequent, alternate) {
		        this.type = syntax_1.Syntax.IfStatement;
		        this.test = test;
		        this.consequent = consequent;
		        this.alternate = alternate;
		    }
		    return IfStatement;
		}());
		exports.IfStatement = IfStatement;
		var ImportDeclaration = (function () {
		    function ImportDeclaration(specifiers, source) {
		        this.type = syntax_1.Syntax.ImportDeclaration;
		        this.specifiers = specifiers;
		        this.source = source;
		    }
		    return ImportDeclaration;
		}());
		exports.ImportDeclaration = ImportDeclaration;
		var ImportDefaultSpecifier = (function () {
		    function ImportDefaultSpecifier(local) {
		        this.type = syntax_1.Syntax.ImportDefaultSpecifier;
		        this.local = local;
		    }
		    return ImportDefaultSpecifier;
		}());
		exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
		var ImportNamespaceSpecifier = (function () {
		    function ImportNamespaceSpecifier(local) {
		        this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
		        this.local = local;
		    }
		    return ImportNamespaceSpecifier;
		}());
		exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
		var ImportSpecifier = (function () {
		    function ImportSpecifier(local, imported) {
		        this.type = syntax_1.Syntax.ImportSpecifier;
		        this.local = local;
		        this.imported = imported;
		    }
		    return ImportSpecifier;
		}());
		exports.ImportSpecifier = ImportSpecifier;
		var LabeledStatement = (function () {
		    function LabeledStatement(label, body) {
		        this.type = syntax_1.Syntax.LabeledStatement;
		        this.label = label;
		        this.body = body;
		    }
		    return LabeledStatement;
		}());
		exports.LabeledStatement = LabeledStatement;
		var Literal = (function () {
		    function Literal(value, raw) {
		        this.type = syntax_1.Syntax.Literal;
		        this.value = value;
		        this.raw = raw;
		    }
		    return Literal;
		}());
		exports.Literal = Literal;
		var MetaProperty = (function () {
		    function MetaProperty(meta, property) {
		        this.type = syntax_1.Syntax.MetaProperty;
		        this.meta = meta;
		        this.property = property;
		    }
		    return MetaProperty;
		}());
		exports.MetaProperty = MetaProperty;
		var MethodDefinition = (function () {
		    function MethodDefinition(key, computed, value, kind, isStatic) {
		        this.type = syntax_1.Syntax.MethodDefinition;
		        this.key = key;
		        this.computed = computed;
		        this.value = value;
		        this.kind = kind;
		        this.static = isStatic;
		    }
		    return MethodDefinition;
		}());
		exports.MethodDefinition = MethodDefinition;
		var Module = (function () {
		    function Module(body) {
		        this.type = syntax_1.Syntax.Program;
		        this.body = body;
		        this.sourceType = 'module';
		    }
		    return Module;
		}());
		exports.Module = Module;
		var NewExpression = (function () {
		    function NewExpression(callee, args) {
		        this.type = syntax_1.Syntax.NewExpression;
		        this.callee = callee;
		        this.arguments = args;
		    }
		    return NewExpression;
		}());
		exports.NewExpression = NewExpression;
		var ObjectExpression = (function () {
		    function ObjectExpression(properties) {
		        this.type = syntax_1.Syntax.ObjectExpression;
		        this.properties = properties;
		    }
		    return ObjectExpression;
		}());
		exports.ObjectExpression = ObjectExpression;
		var ObjectPattern = (function () {
		    function ObjectPattern(properties) {
		        this.type = syntax_1.Syntax.ObjectPattern;
		        this.properties = properties;
		    }
		    return ObjectPattern;
		}());
		exports.ObjectPattern = ObjectPattern;
		var Property = (function () {
		    function Property(kind, key, computed, value, method, shorthand) {
		        this.type = syntax_1.Syntax.Property;
		        this.key = key;
		        this.computed = computed;
		        this.value = value;
		        this.kind = kind;
		        this.method = method;
		        this.shorthand = shorthand;
		    }
		    return Property;
		}());
		exports.Property = Property;
		var RegexLiteral = (function () {
		    function RegexLiteral(value, raw, pattern, flags) {
		        this.type = syntax_1.Syntax.Literal;
		        this.value = value;
		        this.raw = raw;
		        this.regex = { pattern: pattern, flags: flags };
		    }
		    return RegexLiteral;
		}());
		exports.RegexLiteral = RegexLiteral;
		var RestElement = (function () {
		    function RestElement(argument) {
		        this.type = syntax_1.Syntax.RestElement;
		        this.argument = argument;
		    }
		    return RestElement;
		}());
		exports.RestElement = RestElement;
		var ReturnStatement = (function () {
		    function ReturnStatement(argument) {
		        this.type = syntax_1.Syntax.ReturnStatement;
		        this.argument = argument;
		    }
		    return ReturnStatement;
		}());
		exports.ReturnStatement = ReturnStatement;
		var Script = (function () {
		    function Script(body) {
		        this.type = syntax_1.Syntax.Program;
		        this.body = body;
		        this.sourceType = 'script';
		    }
		    return Script;
		}());
		exports.Script = Script;
		var SequenceExpression = (function () {
		    function SequenceExpression(expressions) {
		        this.type = syntax_1.Syntax.SequenceExpression;
		        this.expressions = expressions;
		    }
		    return SequenceExpression;
		}());
		exports.SequenceExpression = SequenceExpression;
		var SpreadElement = (function () {
		    function SpreadElement(argument) {
		        this.type = syntax_1.Syntax.SpreadElement;
		        this.argument = argument;
		    }
		    return SpreadElement;
		}());
		exports.SpreadElement = SpreadElement;
		var StaticMemberExpression = (function () {
		    function StaticMemberExpression(object, property) {
		        this.type = syntax_1.Syntax.MemberExpression;
		        this.computed = false;
		        this.object = object;
		        this.property = property;
		    }
		    return StaticMemberExpression;
		}());
		exports.StaticMemberExpression = StaticMemberExpression;
		var Super = (function () {
		    function Super() {
		        this.type = syntax_1.Syntax.Super;
		    }
		    return Super;
		}());
		exports.Super = Super;
		var SwitchCase = (function () {
		    function SwitchCase(test, consequent) {
		        this.type = syntax_1.Syntax.SwitchCase;
		        this.test = test;
		        this.consequent = consequent;
		    }
		    return SwitchCase;
		}());
		exports.SwitchCase = SwitchCase;
		var SwitchStatement = (function () {
		    function SwitchStatement(discriminant, cases) {
		        this.type = syntax_1.Syntax.SwitchStatement;
		        this.discriminant = discriminant;
		        this.cases = cases;
		    }
		    return SwitchStatement;
		}());
		exports.SwitchStatement = SwitchStatement;
		var TaggedTemplateExpression = (function () {
		    function TaggedTemplateExpression(tag, quasi) {
		        this.type = syntax_1.Syntax.TaggedTemplateExpression;
		        this.tag = tag;
		        this.quasi = quasi;
		    }
		    return TaggedTemplateExpression;
		}());
		exports.TaggedTemplateExpression = TaggedTemplateExpression;
		var TemplateElement = (function () {
		    function TemplateElement(value, tail) {
		        this.type = syntax_1.Syntax.TemplateElement;
		        this.value = value;
		        this.tail = tail;
		    }
		    return TemplateElement;
		}());
		exports.TemplateElement = TemplateElement;
		var TemplateLiteral = (function () {
		    function TemplateLiteral(quasis, expressions) {
		        this.type = syntax_1.Syntax.TemplateLiteral;
		        this.quasis = quasis;
		        this.expressions = expressions;
		    }
		    return TemplateLiteral;
		}());
		exports.TemplateLiteral = TemplateLiteral;
		var ThisExpression = (function () {
		    function ThisExpression() {
		        this.type = syntax_1.Syntax.ThisExpression;
		    }
		    return ThisExpression;
		}());
		exports.ThisExpression = ThisExpression;
		var ThrowStatement = (function () {
		    function ThrowStatement(argument) {
		        this.type = syntax_1.Syntax.ThrowStatement;
		        this.argument = argument;
		    }
		    return ThrowStatement;
		}());
		exports.ThrowStatement = ThrowStatement;
		var TryStatement = (function () {
		    function TryStatement(block, handler, finalizer) {
		        this.type = syntax_1.Syntax.TryStatement;
		        this.block = block;
		        this.handler = handler;
		        this.finalizer = finalizer;
		    }
		    return TryStatement;
		}());
		exports.TryStatement = TryStatement;
		var UnaryExpression = (function () {
		    function UnaryExpression(operator, argument) {
		        this.type = syntax_1.Syntax.UnaryExpression;
		        this.operator = operator;
		        this.argument = argument;
		        this.prefix = true;
		    }
		    return UnaryExpression;
		}());
		exports.UnaryExpression = UnaryExpression;
		var UpdateExpression = (function () {
		    function UpdateExpression(operator, argument, prefix) {
		        this.type = syntax_1.Syntax.UpdateExpression;
		        this.operator = operator;
		        this.argument = argument;
		        this.prefix = prefix;
		    }
		    return UpdateExpression;
		}());
		exports.UpdateExpression = UpdateExpression;
		var VariableDeclaration = (function () {
		    function VariableDeclaration(declarations, kind) {
		        this.type = syntax_1.Syntax.VariableDeclaration;
		        this.declarations = declarations;
		        this.kind = kind;
		    }
		    return VariableDeclaration;
		}());
		exports.VariableDeclaration = VariableDeclaration;
		var VariableDeclarator = (function () {
		    function VariableDeclarator(id, init) {
		        this.type = syntax_1.Syntax.VariableDeclarator;
		        this.id = id;
		        this.init = init;
		    }
		    return VariableDeclarator;
		}());
		exports.VariableDeclarator = VariableDeclarator;
		var WhileStatement = (function () {
		    function WhileStatement(test, body) {
		        this.type = syntax_1.Syntax.WhileStatement;
		        this.test = test;
		        this.body = body;
		    }
		    return WhileStatement;
		}());
		exports.WhileStatement = WhileStatement;
		var WithStatement = (function () {
		    function WithStatement(object, body) {
		        this.type = syntax_1.Syntax.WithStatement;
		        this.object = object;
		        this.body = body;
		    }
		    return WithStatement;
		}());
		exports.WithStatement = WithStatement;
		var YieldExpression = (function () {
		    function YieldExpression(argument, delegate) {
		        this.type = syntax_1.Syntax.YieldExpression;
		        this.argument = argument;
		        this.delegate = delegate;
		    }
		    return YieldExpression;
		}());
		exports.YieldExpression = YieldExpression;


	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
		Object.defineProperty(exports, "__esModule", { value: true });
		var assert_1 = __webpack_require__(9);
		var error_handler_1 = __webpack_require__(10);
		var messages_1 = __webpack_require__(11);
		var Node = __webpack_require__(7);
		var scanner_1 = __webpack_require__(12);
		var syntax_1 = __webpack_require__(2);
		var token_1 = __webpack_require__(13);
		var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
		var Parser = (function () {
		    function Parser(code, options, delegate) {
		        if (options === void 0) { options = {}; }
		        this.config = {
		            range: (typeof options.range === 'boolean') && options.range,
		            loc: (typeof options.loc === 'boolean') && options.loc,
		            source: null,
		            tokens: (typeof options.tokens === 'boolean') && options.tokens,
		            comment: (typeof options.comment === 'boolean') && options.comment,
		            tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
		        };
		        if (this.config.loc && options.source && options.source !== null) {
		            this.config.source = String(options.source);
		        }
		        this.delegate = delegate;
		        this.errorHandler = new error_handler_1.ErrorHandler();
		        this.errorHandler.tolerant = this.config.tolerant;
		        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
		        this.scanner.trackComment = this.config.comment;
		        this.operatorPrecedence = {
		            ')': 0,
		            ';': 0,
		            ',': 0,
		            '=': 0,
		            ']': 0,
		            '||': 1,
		            '&&': 2,
		            '|': 3,
		            '^': 4,
		            '&': 5,
		            '==': 6,
		            '!=': 6,
		            '===': 6,
		            '!==': 6,
		            '<': 7,
		            '>': 7,
		            '<=': 7,
		            '>=': 7,
		            '<<': 8,
		            '>>': 8,
		            '>>>': 8,
		            '+': 9,
		            '-': 9,
		            '*': 11,
		            '/': 11,
		            '%': 11
		        };
		        this.lookahead = {
		            type: 2 /* EOF */,
		            value: '',
		            lineNumber: this.scanner.lineNumber,
		            lineStart: 0,
		            start: 0,
		            end: 0
		        };
		        this.hasLineTerminator = false;
		        this.context = {
		            isModule: false,
		            await: false,
		            allowIn: true,
		            allowStrictDirective: true,
		            allowYield: true,
		            firstCoverInitializedNameError: null,
		            isAssignmentTarget: false,
		            isBindingElement: false,
		            inFunctionBody: false,
		            inIteration: false,
		            inSwitch: false,
		            labelSet: {},
		            strict: false
		        };
		        this.tokens = [];
		        this.startMarker = {
		            index: 0,
		            line: this.scanner.lineNumber,
		            column: 0
		        };
		        this.lastMarker = {
		            index: 0,
		            line: this.scanner.lineNumber,
		            column: 0
		        };
		        this.nextToken();
		        this.lastMarker = {
		            index: this.scanner.index,
		            line: this.scanner.lineNumber,
		            column: this.scanner.index - this.scanner.lineStart
		        };
		    }
		    Parser.prototype.throwError = function (messageFormat) {
		        var args = Array.prototype.slice.call(arguments, 1);
		        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
		            assert_1.assert(idx < args.length, 'Message reference must be in range');
		            return args[idx];
		        });
		        var index = this.lastMarker.index;
		        var line = this.lastMarker.line;
		        var column = this.lastMarker.column + 1;
		        throw this.errorHandler.createError(index, line, column, msg);
		    };
		    Parser.prototype.tolerateError = function (messageFormat) {
		        var args = Array.prototype.slice.call(arguments, 1);
		        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
		            assert_1.assert(idx < args.length, 'Message reference must be in range');
		            return args[idx];
		        });
		        var index = this.lastMarker.index;
		        var line = this.scanner.lineNumber;
		        var column = this.lastMarker.column + 1;
		        this.errorHandler.tolerateError(index, line, column, msg);
		    };
		    // Throw an exception because of the token.
		    Parser.prototype.unexpectedTokenError = function (token, message) {
		        var msg = message || messages_1.Messages.UnexpectedToken;
		        var value;
		        if (token) {
		            if (!message) {
		                msg = (token.type === 2 /* EOF */) ? messages_1.Messages.UnexpectedEOS :
		                    (token.type === 3 /* Identifier */) ? messages_1.Messages.UnexpectedIdentifier :
		                        (token.type === 6 /* NumericLiteral */) ? messages_1.Messages.UnexpectedNumber :
		                            (token.type === 8 /* StringLiteral */) ? messages_1.Messages.UnexpectedString :
		                                (token.type === 10 /* Template */) ? messages_1.Messages.UnexpectedTemplate :
		                                    messages_1.Messages.UnexpectedToken;
		                if (token.type === 4 /* Keyword */) {
		                    if (this.scanner.isFutureReservedWord(token.value)) {
		                        msg = messages_1.Messages.UnexpectedReserved;
		                    }
		                    else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
		                        msg = messages_1.Messages.StrictReservedWord;
		                    }
		                }
		            }
		            value = token.value;
		        }
		        else {
		            value = 'ILLEGAL';
		        }
		        msg = msg.replace('%0', value);
		        if (token && typeof token.lineNumber === 'number') {
		            var index = token.start;
		            var line = token.lineNumber;
		            var lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
		            var column = token.start - lastMarkerLineStart + 1;
		            return this.errorHandler.createError(index, line, column, msg);
		        }
		        else {
		            var index = this.lastMarker.index;
		            var line = this.lastMarker.line;
		            var column = this.lastMarker.column + 1;
		            return this.errorHandler.createError(index, line, column, msg);
		        }
		    };
		    Parser.prototype.throwUnexpectedToken = function (token, message) {
		        throw this.unexpectedTokenError(token, message);
		    };
		    Parser.prototype.tolerateUnexpectedToken = function (token, message) {
		        this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
		    };
		    Parser.prototype.collectComments = function () {
		        if (!this.config.comment) {
		            this.scanner.scanComments();
		        }
		        else {
		            var comments = this.scanner.scanComments();
		            if (comments.length > 0 && this.delegate) {
		                for (var i = 0; i < comments.length; ++i) {
		                    var e = comments[i];
		                    var node = void 0;
		                    node = {
		                        type: e.multiLine ? 'BlockComment' : 'LineComment',
		                        value: this.scanner.source.slice(e.slice[0], e.slice[1])
		                    };
		                    if (this.config.range) {
		                        node.range = e.range;
		                    }
		                    if (this.config.loc) {
		                        node.loc = e.loc;
		                    }
		                    var metadata = {
		                        start: {
		                            line: e.loc.start.line,
		                            column: e.loc.start.column,
		                            offset: e.range[0]
		                        },
		                        end: {
		                            line: e.loc.end.line,
		                            column: e.loc.end.column,
		                            offset: e.range[1]
		                        }
		                    };
		                    this.delegate(node, metadata);
		                }
		            }
		        }
		    };
		    // From internal representation to an external structure
		    Parser.prototype.getTokenRaw = function (token) {
		        return this.scanner.source.slice(token.start, token.end);
		    };
		    Parser.prototype.convertToken = function (token) {
		        var t = {
		            type: token_1.TokenName[token.type],
		            value: this.getTokenRaw(token)
		        };
		        if (this.config.range) {
		            t.range = [token.start, token.end];
		        }
		        if (this.config.loc) {
		            t.loc = {
		                start: {
		                    line: this.startMarker.line,
		                    column: this.startMarker.column
		                },
		                end: {
		                    line: this.scanner.lineNumber,
		                    column: this.scanner.index - this.scanner.lineStart
		                }
		            };
		        }
		        if (token.type === 9 /* RegularExpression */) {
		            var pattern = token.pattern;
		            var flags = token.flags;
		            t.regex = { pattern: pattern, flags: flags };
		        }
		        return t;
		    };
		    Parser.prototype.nextToken = function () {
		        var token = this.lookahead;
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.line = this.scanner.lineNumber;
		        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
		        this.collectComments();
		        if (this.scanner.index !== this.startMarker.index) {
		            this.startMarker.index = this.scanner.index;
		            this.startMarker.line = this.scanner.lineNumber;
		            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
		        }
		        var next = this.scanner.lex();
		        this.hasLineTerminator = (token.lineNumber !== next.lineNumber);
		        if (next && this.context.strict && next.type === 3 /* Identifier */) {
		            if (this.scanner.isStrictModeReservedWord(next.value)) {
		                next.type = 4 /* Keyword */;
		            }
		        }
		        this.lookahead = next;
		        if (this.config.tokens && next.type !== 2 /* EOF */) {
		            this.tokens.push(this.convertToken(next));
		        }
		        return token;
		    };
		    Parser.prototype.nextRegexToken = function () {
		        this.collectComments();
		        var token = this.scanner.scanRegExp();
		        if (this.config.tokens) {
		            // Pop the previous token, '/' or '/='
		            // This is added from the lookahead token.
		            this.tokens.pop();
		            this.tokens.push(this.convertToken(token));
		        }
		        // Prime the next lookahead.
		        this.lookahead = token;
		        this.nextToken();
		        return token;
		    };
		    Parser.prototype.createNode = function () {
		        return {
		            index: this.startMarker.index,
		            line: this.startMarker.line,
		            column: this.startMarker.column
		        };
		    };
		    Parser.prototype.startNode = function (token, lastLineStart) {
		        if (lastLineStart === void 0) { lastLineStart = 0; }
		        var column = token.start - token.lineStart;
		        var line = token.lineNumber;
		        if (column < 0) {
		            column += lastLineStart;
		            line--;
		        }
		        return {
		            index: token.start,
		            line: line,
		            column: column
		        };
		    };
		    Parser.prototype.finalize = function (marker, node) {
		        if (this.config.range) {
		            node.range = [marker.index, this.lastMarker.index];
		        }
		        if (this.config.loc) {
		            node.loc = {
		                start: {
		                    line: marker.line,
		                    column: marker.column,
		                },
		                end: {
		                    line: this.lastMarker.line,
		                    column: this.lastMarker.column
		                }
		            };
		            if (this.config.source) {
		                node.loc.source = this.config.source;
		            }
		        }
		        if (this.delegate) {
		            var metadata = {
		                start: {
		                    line: marker.line,
		                    column: marker.column,
		                    offset: marker.index
		                },
		                end: {
		                    line: this.lastMarker.line,
		                    column: this.lastMarker.column,
		                    offset: this.lastMarker.index
		                }
		            };
		            this.delegate(node, metadata);
		        }
		        return node;
		    };
		    // Expect the next token to match the specified punctuator.
		    // If not, an exception will be thrown.
		    Parser.prototype.expect = function (value) {
		        var token = this.nextToken();
		        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
		            this.throwUnexpectedToken(token);
		        }
		    };
		    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
		    Parser.prototype.expectCommaSeparator = function () {
		        if (this.config.tolerant) {
		            var token = this.lookahead;
		            if (token.type === 7 /* Punctuator */ && token.value === ',') {
		                this.nextToken();
		            }
		            else if (token.type === 7 /* Punctuator */ && token.value === ';') {
		                this.nextToken();
		                this.tolerateUnexpectedToken(token);
		            }
		            else {
		                this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
		            }
		        }
		        else {
		            this.expect(',');
		        }
		    };
		    // Expect the next token to match the specified keyword.
		    // If not, an exception will be thrown.
		    Parser.prototype.expectKeyword = function (keyword) {
		        var token = this.nextToken();
		        if (token.type !== 4 /* Keyword */ || token.value !== keyword) {
		            this.throwUnexpectedToken(token);
		        }
		    };
		    // Return true if the next token matches the specified punctuator.
		    Parser.prototype.match = function (value) {
		        return this.lookahead.type === 7 /* Punctuator */ && this.lookahead.value === value;
		    };
		    // Return true if the next token matches the specified keyword
		    Parser.prototype.matchKeyword = function (keyword) {
		        return this.lookahead.type === 4 /* Keyword */ && this.lookahead.value === keyword;
		    };
		    // Return true if the next token matches the specified contextual keyword
		    // (where an identifier is sometimes a keyword depending on the context)
		    Parser.prototype.matchContextualKeyword = function (keyword) {
		        return this.lookahead.type === 3 /* Identifier */ && this.lookahead.value === keyword;
		    };
		    // Return true if the next token is an assignment operator
		    Parser.prototype.matchAssign = function () {
		        if (this.lookahead.type !== 7 /* Punctuator */) {
		            return false;
		        }
		        var op = this.lookahead.value;
		        return op === '=' ||
		            op === '*=' ||
		            op === '**=' ||
		            op === '/=' ||
		            op === '%=' ||
		            op === '+=' ||
		            op === '-=' ||
		            op === '<<=' ||
		            op === '>>=' ||
		            op === '>>>=' ||
		            op === '&=' ||
		            op === '^=' ||
		            op === '|=';
		    };
		    // Cover grammar support.
		    //
		    // When an assignment expression position starts with an left parenthesis, the determination of the type
		    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
		    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
		    //
		    // There are three productions that can be parsed in a parentheses pair that needs to be determined
		    // after the outermost pair is closed. They are:
		    //
		    //   1. AssignmentExpression
		    //   2. BindingElements
		    //   3. AssignmentTargets
		    //
		    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
		    // binding element or assignment target.
		    //
		    // The three productions have the relationship:
		    //
		    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
		    //
		    // with a single exception that CoverInitializedName when used directly in an Expression, generates
		    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
		    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
		    //
		    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
		    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
		    // the CoverInitializedName check is conducted.
		    //
		    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
		    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
		    // pattern. The CoverInitializedName check is deferred.
		    Parser.prototype.isolateCoverGrammar = function (parseFunction) {
		        var previousIsBindingElement = this.context.isBindingElement;
		        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
		        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
		        this.context.isBindingElement = true;
		        this.context.isAssignmentTarget = true;
		        this.context.firstCoverInitializedNameError = null;
		        var result = parseFunction.call(this);
		        if (this.context.firstCoverInitializedNameError !== null) {
		            this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
		        }
		        this.context.isBindingElement = previousIsBindingElement;
		        this.context.isAssignmentTarget = previousIsAssignmentTarget;
		        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
		        return result;
		    };
		    Parser.prototype.inheritCoverGrammar = function (parseFunction) {
		        var previousIsBindingElement = this.context.isBindingElement;
		        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
		        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
		        this.context.isBindingElement = true;
		        this.context.isAssignmentTarget = true;
		        this.context.firstCoverInitializedNameError = null;
		        var result = parseFunction.call(this);
		        this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
		        this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
		        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
		        return result;
		    };
		    Parser.prototype.consumeSemicolon = function () {
		        if (this.match(';')) {
		            this.nextToken();
		        }
		        else if (!this.hasLineTerminator) {
		            if (this.lookahead.type !== 2 /* EOF */ && !this.match('}')) {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		            this.lastMarker.index = this.startMarker.index;
		            this.lastMarker.line = this.startMarker.line;
		            this.lastMarker.column = this.startMarker.column;
		        }
		    };
		    // https://tc39.github.io/ecma262/#sec-primary-expression
		    Parser.prototype.parsePrimaryExpression = function () {
		        var node = this.createNode();
		        var expr;
		        var token, raw;
		        switch (this.lookahead.type) {
		            case 3 /* Identifier */:
		                if ((this.context.isModule || this.context.await) && this.lookahead.value === 'await') {
		                    this.tolerateUnexpectedToken(this.lookahead);
		                }
		                expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Node.Identifier(this.nextToken().value));
		                break;
		            case 6 /* NumericLiteral */:
		            case 8 /* StringLiteral */:
		                if (this.context.strict && this.lookahead.octal) {
		                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
		                }
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                token = this.nextToken();
		                raw = this.getTokenRaw(token);
		                expr = this.finalize(node, new Node.Literal(token.value, raw));
		                break;
		            case 1 /* BooleanLiteral */:
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                token = this.nextToken();
		                raw = this.getTokenRaw(token);
		                expr = this.finalize(node, new Node.Literal(token.value === 'true', raw));
		                break;
		            case 5 /* NullLiteral */:
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                token = this.nextToken();
		                raw = this.getTokenRaw(token);
		                expr = this.finalize(node, new Node.Literal(null, raw));
		                break;
		            case 10 /* Template */:
		                expr = this.parseTemplateLiteral();
		                break;
		            case 7 /* Punctuator */:
		                switch (this.lookahead.value) {
		                    case '(':
		                        this.context.isBindingElement = false;
		                        expr = this.inheritCoverGrammar(this.parseGroupExpression);
		                        break;
		                    case '[':
		                        expr = this.inheritCoverGrammar(this.parseArrayInitializer);
		                        break;
		                    case '{':
		                        expr = this.inheritCoverGrammar(this.parseObjectInitializer);
		                        break;
		                    case '/':
		                    case '/=':
		                        this.context.isAssignmentTarget = false;
		                        this.context.isBindingElement = false;
		                        this.scanner.index = this.startMarker.index;
		                        token = this.nextRegexToken();
		                        raw = this.getTokenRaw(token);
		                        expr = this.finalize(node, new Node.RegexLiteral(token.regex, raw, token.pattern, token.flags));
		                        break;
		                    default:
		                        expr = this.throwUnexpectedToken(this.nextToken());
		                }
		                break;
		            case 4 /* Keyword */:
		                if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
		                    expr = this.parseIdentifierName();
		                }
		                else if (!this.context.strict && this.matchKeyword('let')) {
		                    expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
		                }
		                else {
		                    this.context.isAssignmentTarget = false;
		                    this.context.isBindingElement = false;
		                    if (this.matchKeyword('function')) {
		                        expr = this.parseFunctionExpression();
		                    }
		                    else if (this.matchKeyword('this')) {
		                        this.nextToken();
		                        expr = this.finalize(node, new Node.ThisExpression());
		                    }
		                    else if (this.matchKeyword('class')) {
		                        expr = this.parseClassExpression();
		                    }
		                    else {
		                        expr = this.throwUnexpectedToken(this.nextToken());
		                    }
		                }
		                break;
		            default:
		                expr = this.throwUnexpectedToken(this.nextToken());
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-array-initializer
		    Parser.prototype.parseSpreadElement = function () {
		        var node = this.createNode();
		        this.expect('...');
		        var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
		        return this.finalize(node, new Node.SpreadElement(arg));
		    };
		    Parser.prototype.parseArrayInitializer = function () {
		        var node = this.createNode();
		        var elements = [];
		        this.expect('[');
		        while (!this.match(']')) {
		            if (this.match(',')) {
		                this.nextToken();
		                elements.push(null);
		            }
		            else if (this.match('...')) {
		                var element = this.parseSpreadElement();
		                if (!this.match(']')) {
		                    this.context.isAssignmentTarget = false;
		                    this.context.isBindingElement = false;
		                    this.expect(',');
		                }
		                elements.push(element);
		            }
		            else {
		                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
		                if (!this.match(']')) {
		                    this.expect(',');
		                }
		            }
		        }
		        this.expect(']');
		        return this.finalize(node, new Node.ArrayExpression(elements));
		    };
		    // https://tc39.github.io/ecma262/#sec-object-initializer
		    Parser.prototype.parsePropertyMethod = function (params) {
		        this.context.isAssignmentTarget = false;
		        this.context.isBindingElement = false;
		        var previousStrict = this.context.strict;
		        var previousAllowStrictDirective = this.context.allowStrictDirective;
		        this.context.allowStrictDirective = params.simple;
		        var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
		        if (this.context.strict && params.firstRestricted) {
		            this.tolerateUnexpectedToken(params.firstRestricted, params.message);
		        }
		        if (this.context.strict && params.stricted) {
		            this.tolerateUnexpectedToken(params.stricted, params.message);
		        }
		        this.context.strict = previousStrict;
		        this.context.allowStrictDirective = previousAllowStrictDirective;
		        return body;
		    };
		    Parser.prototype.parsePropertyMethodFunction = function () {
		        var isGenerator = false;
		        var node = this.createNode();
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = true;
		        var params = this.parseFormalParameters();
		        var method = this.parsePropertyMethod(params);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
		    };
		    Parser.prototype.parsePropertyMethodAsyncFunction = function () {
		        var node = this.createNode();
		        var previousAllowYield = this.context.allowYield;
		        var previousAwait = this.context.await;
		        this.context.allowYield = false;
		        this.context.await = true;
		        var params = this.parseFormalParameters();
		        var method = this.parsePropertyMethod(params);
		        this.context.allowYield = previousAllowYield;
		        this.context.await = previousAwait;
		        return this.finalize(node, new Node.AsyncFunctionExpression(null, params.params, method));
		    };
		    Parser.prototype.parseObjectPropertyKey = function () {
		        var node = this.createNode();
		        var token = this.nextToken();
		        var key;
		        switch (token.type) {
		            case 8 /* StringLiteral */:
		            case 6 /* NumericLiteral */:
		                if (this.context.strict && token.octal) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
		                }
		                var raw = this.getTokenRaw(token);
		                key = this.finalize(node, new Node.Literal(token.value, raw));
		                break;
		            case 3 /* Identifier */:
		            case 1 /* BooleanLiteral */:
		            case 5 /* NullLiteral */:
		            case 4 /* Keyword */:
		                key = this.finalize(node, new Node.Identifier(token.value));
		                break;
		            case 7 /* Punctuator */:
		                if (token.value === '[') {
		                    key = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    this.expect(']');
		                }
		                else {
		                    key = this.throwUnexpectedToken(token);
		                }
		                break;
		            default:
		                key = this.throwUnexpectedToken(token);
		        }
		        return key;
		    };
		    Parser.prototype.isPropertyKey = function (key, value) {
		        return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
		            (key.type === syntax_1.Syntax.Literal && key.value === value);
		    };
		    Parser.prototype.parseObjectProperty = function (hasProto) {
		        var node = this.createNode();
		        var token = this.lookahead;
		        var kind;
		        var key = null;
		        var value = null;
		        var computed = false;
		        var method = false;
		        var shorthand = false;
		        var isAsync = false;
		        if (token.type === 3 /* Identifier */) {
		            var id = token.value;
		            this.nextToken();
		            computed = this.match('[');
		            isAsync = !this.hasLineTerminator && (id === 'async') &&
		                !this.match(':') && !this.match('(') && !this.match('*') && !this.match(',');
		            key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Node.Identifier(id));
		        }
		        else if (this.match('*')) {
		            this.nextToken();
		        }
		        else {
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		        }
		        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
		        if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'get' && lookaheadPropertyKey) {
		            kind = 'get';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            this.context.allowYield = false;
		            value = this.parseGetterMethod();
		        }
		        else if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'set' && lookaheadPropertyKey) {
		            kind = 'set';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            value = this.parseSetterMethod();
		        }
		        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
		            kind = 'init';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            value = this.parseGeneratorMethod();
		            method = true;
		        }
		        else {
		            if (!key) {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		            kind = 'init';
		            if (this.match(':') && !isAsync) {
		                if (!computed && this.isPropertyKey(key, '__proto__')) {
		                    if (hasProto.value) {
		                        this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
		                    }
		                    hasProto.value = true;
		                }
		                this.nextToken();
		                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
		            }
		            else if (this.match('(')) {
		                value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
		                method = true;
		            }
		            else if (token.type === 3 /* Identifier */) {
		                var id = this.finalize(node, new Node.Identifier(token.value));
		                if (this.match('=')) {
		                    this.context.firstCoverInitializedNameError = this.lookahead;
		                    this.nextToken();
		                    shorthand = true;
		                    var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    value = this.finalize(node, new Node.AssignmentPattern(id, init));
		                }
		                else {
		                    shorthand = true;
		                    value = id;
		                }
		            }
		            else {
		                this.throwUnexpectedToken(this.nextToken());
		            }
		        }
		        return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
		    };
		    Parser.prototype.parseObjectInitializer = function () {
		        var node = this.createNode();
		        this.expect('{');
		        var properties = [];
		        var hasProto = { value: false };
		        while (!this.match('}')) {
		            properties.push(this.parseObjectProperty(hasProto));
		            if (!this.match('}')) {
		                this.expectCommaSeparator();
		            }
		        }
		        this.expect('}');
		        return this.finalize(node, new Node.ObjectExpression(properties));
		    };
		    // https://tc39.github.io/ecma262/#sec-template-literals
		    Parser.prototype.parseTemplateHead = function () {
		        assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
		        var node = this.createNode();
		        var token = this.nextToken();
		        var raw = token.value;
		        var cooked = token.cooked;
		        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
		    };
		    Parser.prototype.parseTemplateElement = function () {
		        if (this.lookahead.type !== 10 /* Template */) {
		            this.throwUnexpectedToken();
		        }
		        var node = this.createNode();
		        var token = this.nextToken();
		        var raw = token.value;
		        var cooked = token.cooked;
		        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
		    };
		    Parser.prototype.parseTemplateLiteral = function () {
		        var node = this.createNode();
		        var expressions = [];
		        var quasis = [];
		        var quasi = this.parseTemplateHead();
		        quasis.push(quasi);
		        while (!quasi.tail) {
		            expressions.push(this.parseExpression());
		            quasi = this.parseTemplateElement();
		            quasis.push(quasi);
		        }
		        return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
		    };
		    // https://tc39.github.io/ecma262/#sec-grouping-operator
		    Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
		        switch (expr.type) {
		            case syntax_1.Syntax.Identifier:
		            case syntax_1.Syntax.MemberExpression:
		            case syntax_1.Syntax.RestElement:
		            case syntax_1.Syntax.AssignmentPattern:
		                break;
		            case syntax_1.Syntax.SpreadElement:
		                expr.type = syntax_1.Syntax.RestElement;
		                this.reinterpretExpressionAsPattern(expr.argument);
		                break;
		            case syntax_1.Syntax.ArrayExpression:
		                expr.type = syntax_1.Syntax.ArrayPattern;
		                for (var i = 0; i < expr.elements.length; i++) {
		                    if (expr.elements[i] !== null) {
		                        this.reinterpretExpressionAsPattern(expr.elements[i]);
		                    }
		                }
		                break;
		            case syntax_1.Syntax.ObjectExpression:
		                expr.type = syntax_1.Syntax.ObjectPattern;
		                for (var i = 0; i < expr.properties.length; i++) {
		                    this.reinterpretExpressionAsPattern(expr.properties[i].value);
		                }
		                break;
		            case syntax_1.Syntax.AssignmentExpression:
		                expr.type = syntax_1.Syntax.AssignmentPattern;
		                delete expr.operator;
		                this.reinterpretExpressionAsPattern(expr.left);
		                break;
		        }
		    };
		    Parser.prototype.parseGroupExpression = function () {
		        var expr;
		        this.expect('(');
		        if (this.match(')')) {
		            this.nextToken();
		            if (!this.match('=>')) {
		                this.expect('=>');
		            }
		            expr = {
		                type: ArrowParameterPlaceHolder,
		                params: [],
		                async: false
		            };
		        }
		        else {
		            var startToken = this.lookahead;
		            var params = [];
		            if (this.match('...')) {
		                expr = this.parseRestElement(params);
		                this.expect(')');
		                if (!this.match('=>')) {
		                    this.expect('=>');
		                }
		                expr = {
		                    type: ArrowParameterPlaceHolder,
		                    params: [expr],
		                    async: false
		                };
		            }
		            else {
		                var arrow = false;
		                this.context.isBindingElement = true;
		                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
		                if (this.match(',')) {
		                    var expressions = [];
		                    this.context.isAssignmentTarget = false;
		                    expressions.push(expr);
		                    while (this.lookahead.type !== 2 /* EOF */) {
		                        if (!this.match(',')) {
		                            break;
		                        }
		                        this.nextToken();
		                        if (this.match(')')) {
		                            this.nextToken();
		                            for (var i = 0; i < expressions.length; i++) {
		                                this.reinterpretExpressionAsPattern(expressions[i]);
		                            }
		                            arrow = true;
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: expressions,
		                                async: false
		                            };
		                        }
		                        else if (this.match('...')) {
		                            if (!this.context.isBindingElement) {
		                                this.throwUnexpectedToken(this.lookahead);
		                            }
		                            expressions.push(this.parseRestElement(params));
		                            this.expect(')');
		                            if (!this.match('=>')) {
		                                this.expect('=>');
		                            }
		                            this.context.isBindingElement = false;
		                            for (var i = 0; i < expressions.length; i++) {
		                                this.reinterpretExpressionAsPattern(expressions[i]);
		                            }
		                            arrow = true;
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: expressions,
		                                async: false
		                            };
		                        }
		                        else {
		                            expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
		                        }
		                        if (arrow) {
		                            break;
		                        }
		                    }
		                    if (!arrow) {
		                        expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
		                    }
		                }
		                if (!arrow) {
		                    this.expect(')');
		                    if (this.match('=>')) {
		                        if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
		                            arrow = true;
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: [expr],
		                                async: false
		                            };
		                        }
		                        if (!arrow) {
		                            if (!this.context.isBindingElement) {
		                                this.throwUnexpectedToken(this.lookahead);
		                            }
		                            if (expr.type === syntax_1.Syntax.SequenceExpression) {
		                                for (var i = 0; i < expr.expressions.length; i++) {
		                                    this.reinterpretExpressionAsPattern(expr.expressions[i]);
		                                }
		                            }
		                            else {
		                                this.reinterpretExpressionAsPattern(expr);
		                            }
		                            var parameters = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: parameters,
		                                async: false
		                            };
		                        }
		                    }
		                    this.context.isBindingElement = false;
		                }
		            }
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
		    Parser.prototype.parseArguments = function () {
		        this.expect('(');
		        var args = [];
		        if (!this.match(')')) {
		            while (true) {
		                var expr = this.match('...') ? this.parseSpreadElement() :
		                    this.isolateCoverGrammar(this.parseAssignmentExpression);
		                args.push(expr);
		                if (this.match(')')) {
		                    break;
		                }
		                this.expectCommaSeparator();
		                if (this.match(')')) {
		                    break;
		                }
		            }
		        }
		        this.expect(')');
		        return args;
		    };
		    Parser.prototype.isIdentifierName = function (token) {
		        return token.type === 3 /* Identifier */ ||
		            token.type === 4 /* Keyword */ ||
		            token.type === 1 /* BooleanLiteral */ ||
		            token.type === 5 /* NullLiteral */;
		    };
		    Parser.prototype.parseIdentifierName = function () {
		        var node = this.createNode();
		        var token = this.nextToken();
		        if (!this.isIdentifierName(token)) {
		            this.throwUnexpectedToken(token);
		        }
		        return this.finalize(node, new Node.Identifier(token.value));
		    };
		    Parser.prototype.parseNewExpression = function () {
		        var node = this.createNode();
		        var id = this.parseIdentifierName();
		        assert_1.assert(id.name === 'new', 'New expression must start with `new`');
		        var expr;
		        if (this.match('.')) {
		            this.nextToken();
		            if (this.lookahead.type === 3 /* Identifier */ && this.context.inFunctionBody && this.lookahead.value === 'target') {
		                var property = this.parseIdentifierName();
		                expr = new Node.MetaProperty(id, property);
		            }
		            else {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		        }
		        else {
		            var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
		            var args = this.match('(') ? this.parseArguments() : [];
		            expr = new Node.NewExpression(callee, args);
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        return this.finalize(node, expr);
		    };
		    Parser.prototype.parseAsyncArgument = function () {
		        var arg = this.parseAssignmentExpression();
		        this.context.firstCoverInitializedNameError = null;
		        return arg;
		    };
		    Parser.prototype.parseAsyncArguments = function () {
		        this.expect('(');
		        var args = [];
		        if (!this.match(')')) {
		            while (true) {
		                var expr = this.match('...') ? this.parseSpreadElement() :
		                    this.isolateCoverGrammar(this.parseAsyncArgument);
		                args.push(expr);
		                if (this.match(')')) {
		                    break;
		                }
		                this.expectCommaSeparator();
		                if (this.match(')')) {
		                    break;
		                }
		            }
		        }
		        this.expect(')');
		        return args;
		    };
		    Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
		        var startToken = this.lookahead;
		        var maybeAsync = this.matchContextualKeyword('async');
		        var previousAllowIn = this.context.allowIn;
		        this.context.allowIn = true;
		        var expr;
		        if (this.matchKeyword('super') && this.context.inFunctionBody) {
		            expr = this.createNode();
		            this.nextToken();
		            expr = this.finalize(expr, new Node.Super());
		            if (!this.match('(') && !this.match('.') && !this.match('[')) {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		        }
		        else {
		            expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
		        }
		        while (true) {
		            if (this.match('.')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('.');
		                var property = this.parseIdentifierName();
		                expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
		            }
		            else if (this.match('(')) {
		                var asyncArrow = maybeAsync && (startToken.lineNumber === this.lookahead.lineNumber);
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = false;
		                var args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
		                expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
		                if (asyncArrow && this.match('=>')) {
		                    for (var i = 0; i < args.length; ++i) {
		                        this.reinterpretExpressionAsPattern(args[i]);
		                    }
		                    expr = {
		                        type: ArrowParameterPlaceHolder,
		                        params: args,
		                        async: true
		                    };
		                }
		            }
		            else if (this.match('[')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('[');
		                var property = this.isolateCoverGrammar(this.parseExpression);
		                this.expect(']');
		                expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
		            }
		            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
		                var quasi = this.parseTemplateLiteral();
		                expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
		            }
		            else {
		                break;
		            }
		        }
		        this.context.allowIn = previousAllowIn;
		        return expr;
		    };
		    Parser.prototype.parseSuper = function () {
		        var node = this.createNode();
		        this.expectKeyword('super');
		        if (!this.match('[') && !this.match('.')) {
		            this.throwUnexpectedToken(this.lookahead);
		        }
		        return this.finalize(node, new Node.Super());
		    };
		    Parser.prototype.parseLeftHandSideExpression = function () {
		        assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
		        var node = this.startNode(this.lookahead);
		        var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
		            this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
		        while (true) {
		            if (this.match('[')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('[');
		                var property = this.isolateCoverGrammar(this.parseExpression);
		                this.expect(']');
		                expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
		            }
		            else if (this.match('.')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('.');
		                var property = this.parseIdentifierName();
		                expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
		            }
		            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
		                var quasi = this.parseTemplateLiteral();
		                expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
		            }
		            else {
		                break;
		            }
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-update-expressions
		    Parser.prototype.parseUpdateExpression = function () {
		        var expr;
		        var startToken = this.lookahead;
		        if (this.match('++') || this.match('--')) {
		            var node = this.startNode(startToken);
		            var token = this.nextToken();
		            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
		            if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
		                this.tolerateError(messages_1.Messages.StrictLHSPrefix);
		            }
		            if (!this.context.isAssignmentTarget) {
		                this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
		            }
		            var prefix = true;
		            expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        else {
		            expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		            if (!this.hasLineTerminator && this.lookahead.type === 7 /* Punctuator */) {
		                if (this.match('++') || this.match('--')) {
		                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
		                        this.tolerateError(messages_1.Messages.StrictLHSPostfix);
		                    }
		                    if (!this.context.isAssignmentTarget) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
		                    }
		                    this.context.isAssignmentTarget = false;
		                    this.context.isBindingElement = false;
		                    var operator = this.nextToken().value;
		                    var prefix = false;
		                    expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
		                }
		            }
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-unary-operators
		    Parser.prototype.parseAwaitExpression = function () {
		        var node = this.createNode();
		        this.nextToken();
		        var argument = this.parseUnaryExpression();
		        return this.finalize(node, new Node.AwaitExpression(argument));
		    };
		    Parser.prototype.parseUnaryExpression = function () {
		        var expr;
		        if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
		            this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
		            var node = this.startNode(this.lookahead);
		            var token = this.nextToken();
		            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
		            expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
		            if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
		                this.tolerateError(messages_1.Messages.StrictDelete);
		            }
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        else if (this.context.await && this.matchContextualKeyword('await')) {
		            expr = this.parseAwaitExpression();
		        }
		        else {
		            expr = this.parseUpdateExpression();
		        }
		        return expr;
		    };
		    Parser.prototype.parseExponentiationExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
		        if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
		            this.nextToken();
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		            var left = expr;
		            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
		            expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-exp-operator
		    // https://tc39.github.io/ecma262/#sec-multiplicative-operators
		    // https://tc39.github.io/ecma262/#sec-additive-operators
		    // https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
		    // https://tc39.github.io/ecma262/#sec-relational-operators
		    // https://tc39.github.io/ecma262/#sec-equality-operators
		    // https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
		    // https://tc39.github.io/ecma262/#sec-binary-logical-operators
		    Parser.prototype.binaryPrecedence = function (token) {
		        var op = token.value;
		        var precedence;
		        if (token.type === 7 /* Punctuator */) {
		            precedence = this.operatorPrecedence[op] || 0;
		        }
		        else if (token.type === 4 /* Keyword */) {
		            precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
		        }
		        else {
		            precedence = 0;
		        }
		        return precedence;
		    };
		    Parser.prototype.parseBinaryExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
		        var token = this.lookahead;
		        var prec = this.binaryPrecedence(token);
		        if (prec > 0) {
		            this.nextToken();
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		            var markers = [startToken, this.lookahead];
		            var left = expr;
		            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
		            var stack = [left, token.value, right];
		            var precedences = [prec];
		            while (true) {
		                prec = this.binaryPrecedence(this.lookahead);
		                if (prec <= 0) {
		                    break;
		                }
		                // Reduce: make a binary expression from the three topmost entries.
		                while ((stack.length > 2) && (prec <= precedences[precedences.length - 1])) {
		                    right = stack.pop();
		                    var operator = stack.pop();
		                    precedences.pop();
		                    left = stack.pop();
		                    markers.pop();
		                    var node = this.startNode(markers[markers.length - 1]);
		                    stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
		                }
		                // Shift.
		                stack.push(this.nextToken().value);
		                precedences.push(prec);
		                markers.push(this.lookahead);
		                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
		            }
		            // Final reduce to clean-up the stack.
		            var i = stack.length - 1;
		            expr = stack[i];
		            var lastMarker = markers.pop();
		            while (i > 1) {
		                var marker = markers.pop();
		                var lastLineStart = lastMarker && lastMarker.lineStart;
		                var node = this.startNode(marker, lastLineStart);
		                var operator = stack[i - 1];
		                expr = this.finalize(node, new Node.BinaryExpression(operator, stack[i - 2], expr));
		                i -= 2;
		                lastMarker = marker;
		            }
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-conditional-operator
		    Parser.prototype.parseConditionalExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
		        if (this.match('?')) {
		            this.nextToken();
		            var previousAllowIn = this.context.allowIn;
		            this.context.allowIn = true;
		            var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
		            this.context.allowIn = previousAllowIn;
		            this.expect(':');
		            var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
		            expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-assignment-operators
		    Parser.prototype.checkPatternParam = function (options, param) {
		        switch (param.type) {
		            case syntax_1.Syntax.Identifier:
		                this.validateParam(options, param, param.name);
		                break;
		            case syntax_1.Syntax.RestElement:
		                this.checkPatternParam(options, param.argument);
		                break;
		            case syntax_1.Syntax.AssignmentPattern:
		                this.checkPatternParam(options, param.left);
		                break;
		            case syntax_1.Syntax.ArrayPattern:
		                for (var i = 0; i < param.elements.length; i++) {
		                    if (param.elements[i] !== null) {
		                        this.checkPatternParam(options, param.elements[i]);
		                    }
		                }
		                break;
		            case syntax_1.Syntax.ObjectPattern:
		                for (var i = 0; i < param.properties.length; i++) {
		                    this.checkPatternParam(options, param.properties[i].value);
		                }
		                break;
		        }
		        options.simple = options.simple && (param instanceof Node.Identifier);
		    };
		    Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
		        var params = [expr];
		        var options;
		        var asyncArrow = false;
		        switch (expr.type) {
		            case syntax_1.Syntax.Identifier:
		                break;
		            case ArrowParameterPlaceHolder:
		                params = expr.params;
		                asyncArrow = expr.async;
		                break;
		            default:
		                return null;
		        }
		        options = {
		            simple: true,
		            paramSet: {}
		        };
		        for (var i = 0; i < params.length; ++i) {
		            var param = params[i];
		            if (param.type === syntax_1.Syntax.AssignmentPattern) {
		                if (param.right.type === syntax_1.Syntax.YieldExpression) {
		                    if (param.right.argument) {
		                        this.throwUnexpectedToken(this.lookahead);
		                    }
		                    param.right.type = syntax_1.Syntax.Identifier;
		                    param.right.name = 'yield';
		                    delete param.right.argument;
		                    delete param.right.delegate;
		                }
		            }
		            else if (asyncArrow && param.type === syntax_1.Syntax.Identifier && param.name === 'await') {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		            this.checkPatternParam(options, param);
		            params[i] = param;
		        }
		        if (this.context.strict || !this.context.allowYield) {
		            for (var i = 0; i < params.length; ++i) {
		                var param = params[i];
		                if (param.type === syntax_1.Syntax.YieldExpression) {
		                    this.throwUnexpectedToken(this.lookahead);
		                }
		            }
		        }
		        if (options.message === messages_1.Messages.StrictParamDupe) {
		            var token = this.context.strict ? options.stricted : options.firstRestricted;
		            this.throwUnexpectedToken(token, options.message);
		        }
		        return {
		            simple: options.simple,
		            params: params,
		            stricted: options.stricted,
		            firstRestricted: options.firstRestricted,
		            message: options.message
		        };
		    };
		    Parser.prototype.parseAssignmentExpression = function () {
		        var expr;
		        if (!this.context.allowYield && this.matchKeyword('yield')) {
		            expr = this.parseYieldExpression();
		        }
		        else {
		            var startToken = this.lookahead;
		            var token = startToken;
		            expr = this.parseConditionalExpression();
		            if (token.type === 3 /* Identifier */ && (token.lineNumber === this.lookahead.lineNumber) && token.value === 'async') {
		                if (this.lookahead.type === 3 /* Identifier */ || this.matchKeyword('yield')) {
		                    var arg = this.parsePrimaryExpression();
		                    this.reinterpretExpressionAsPattern(arg);
		                    expr = {
		                        type: ArrowParameterPlaceHolder,
		                        params: [arg],
		                        async: true
		                    };
		                }
		            }
		            if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
		                // https://tc39.github.io/ecma262/#sec-arrow-function-definitions
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                var isAsync = expr.async;
		                var list = this.reinterpretAsCoverFormalsList(expr);
		                if (list) {
		                    if (this.hasLineTerminator) {
		                        this.tolerateUnexpectedToken(this.lookahead);
		                    }
		                    this.context.firstCoverInitializedNameError = null;
		                    var previousStrict = this.context.strict;
		                    var previousAllowStrictDirective = this.context.allowStrictDirective;
		                    this.context.allowStrictDirective = list.simple;
		                    var previousAllowYield = this.context.allowYield;
		                    var previousAwait = this.context.await;
		                    this.context.allowYield = true;
		                    this.context.await = isAsync;
		                    var node = this.startNode(startToken);
		                    this.expect('=>');
		                    var body = void 0;
		                    if (this.match('{')) {
		                        var previousAllowIn = this.context.allowIn;
		                        this.context.allowIn = true;
		                        body = this.parseFunctionSourceElements();
		                        this.context.allowIn = previousAllowIn;
		                    }
		                    else {
		                        body = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    }
		                    var expression = body.type !== syntax_1.Syntax.BlockStatement;
		                    if (this.context.strict && list.firstRestricted) {
		                        this.throwUnexpectedToken(list.firstRestricted, list.message);
		                    }
		                    if (this.context.strict && list.stricted) {
		                        this.tolerateUnexpectedToken(list.stricted, list.message);
		                    }
		                    expr = isAsync ? this.finalize(node, new Node.AsyncArrowFunctionExpression(list.params, body, expression)) :
		                        this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
		                    this.context.strict = previousStrict;
		                    this.context.allowStrictDirective = previousAllowStrictDirective;
		                    this.context.allowYield = previousAllowYield;
		                    this.context.await = previousAwait;
		                }
		            }
		            else {
		                if (this.matchAssign()) {
		                    if (!this.context.isAssignmentTarget) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
		                    }
		                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
		                        var id = expr;
		                        if (this.scanner.isRestrictedWord(id.name)) {
		                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
		                        }
		                        if (this.scanner.isStrictModeReservedWord(id.name)) {
		                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
		                        }
		                    }
		                    if (!this.match('=')) {
		                        this.context.isAssignmentTarget = false;
		                        this.context.isBindingElement = false;
		                    }
		                    else {
		                        this.reinterpretExpressionAsPattern(expr);
		                    }
		                    token = this.nextToken();
		                    var operator = token.value;
		                    var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(operator, expr, right));
		                    this.context.firstCoverInitializedNameError = null;
		                }
		            }
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-comma-operator
		    Parser.prototype.parseExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
		        if (this.match(',')) {
		            var expressions = [];
		            expressions.push(expr);
		            while (this.lookahead.type !== 2 /* EOF */) {
		                if (!this.match(',')) {
		                    break;
		                }
		                this.nextToken();
		                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
		            }
		            expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-block
		    Parser.prototype.parseStatementListItem = function () {
		        var statement;
		        this.context.isAssignmentTarget = true;
		        this.context.isBindingElement = true;
		        if (this.lookahead.type === 4 /* Keyword */) {
		            switch (this.lookahead.value) {
		                case 'export':
		                    if (!this.context.isModule) {
		                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
		                    }
		                    statement = this.parseExportDeclaration();
		                    break;
		                case 'import':
		                    if (!this.context.isModule) {
		                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
		                    }
		                    statement = this.parseImportDeclaration();
		                    break;
		                case 'const':
		                    statement = this.parseLexicalDeclaration({ inFor: false });
		                    break;
		                case 'function':
		                    statement = this.parseFunctionDeclaration();
		                    break;
		                case 'class':
		                    statement = this.parseClassDeclaration();
		                    break;
		                case 'let':
		                    statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
		                    break;
		                default:
		                    statement = this.parseStatement();
		                    break;
		            }
		        }
		        else {
		            statement = this.parseStatement();
		        }
		        return statement;
		    };
		    Parser.prototype.parseBlock = function () {
		        var node = this.createNode();
		        this.expect('{');
		        var block = [];
		        while (true) {
		            if (this.match('}')) {
		                break;
		            }
		            block.push(this.parseStatementListItem());
		        }
		        this.expect('}');
		        return this.finalize(node, new Node.BlockStatement(block));
		    };
		    // https://tc39.github.io/ecma262/#sec-let-and-const-declarations
		    Parser.prototype.parseLexicalBinding = function (kind, options) {
		        var node = this.createNode();
		        var params = [];
		        var id = this.parsePattern(params, kind);
		        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
		            if (this.scanner.isRestrictedWord(id.name)) {
		                this.tolerateError(messages_1.Messages.StrictVarName);
		            }
		        }
		        var init = null;
		        if (kind === 'const') {
		            if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
		                if (this.match('=')) {
		                    this.nextToken();
		                    init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                }
		                else {
		                    this.throwError(messages_1.Messages.DeclarationMissingInitializer, 'const');
		                }
		            }
		        }
		        else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
		            this.expect('=');
		            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		        }
		        return this.finalize(node, new Node.VariableDeclarator(id, init));
		    };
		    Parser.prototype.parseBindingList = function (kind, options) {
		        var list = [this.parseLexicalBinding(kind, options)];
		        while (this.match(',')) {
		            this.nextToken();
		            list.push(this.parseLexicalBinding(kind, options));
		        }
		        return list;
		    };
		    Parser.prototype.isLexicalDeclaration = function () {
		        var state = this.scanner.saveState();
		        this.scanner.scanComments();
		        var next = this.scanner.lex();
		        this.scanner.restoreState(state);
		        return (next.type === 3 /* Identifier */) ||
		            (next.type === 7 /* Punctuator */ && next.value === '[') ||
		            (next.type === 7 /* Punctuator */ && next.value === '{') ||
		            (next.type === 4 /* Keyword */ && next.value === 'let') ||
		            (next.type === 4 /* Keyword */ && next.value === 'yield');
		    };
		    Parser.prototype.parseLexicalDeclaration = function (options) {
		        var node = this.createNode();
		        var kind = this.nextToken().value;
		        assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
		        var declarations = this.parseBindingList(kind, options);
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
		    };
		    // https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns
		    Parser.prototype.parseBindingRestElement = function (params, kind) {
		        var node = this.createNode();
		        this.expect('...');
		        var arg = this.parsePattern(params, kind);
		        return this.finalize(node, new Node.RestElement(arg));
		    };
		    Parser.prototype.parseArrayPattern = function (params, kind) {
		        var node = this.createNode();
		        this.expect('[');
		        var elements = [];
		        while (!this.match(']')) {
		            if (this.match(',')) {
		                this.nextToken();
		                elements.push(null);
		            }
		            else {
		                if (this.match('...')) {
		                    elements.push(this.parseBindingRestElement(params, kind));
		                    break;
		                }
		                else {
		                    elements.push(this.parsePatternWithDefault(params, kind));
		                }
		                if (!this.match(']')) {
		                    this.expect(',');
		                }
		            }
		        }
		        this.expect(']');
		        return this.finalize(node, new Node.ArrayPattern(elements));
		    };
		    Parser.prototype.parsePropertyPattern = function (params, kind) {
		        var node = this.createNode();
		        var computed = false;
		        var shorthand = false;
		        var method = false;
		        var key;
		        var value;
		        if (this.lookahead.type === 3 /* Identifier */) {
		            var keyToken = this.lookahead;
		            key = this.parseVariableIdentifier();
		            var init = this.finalize(node, new Node.Identifier(keyToken.value));
		            if (this.match('=')) {
		                params.push(keyToken);
		                shorthand = true;
		                this.nextToken();
		                var expr = this.parseAssignmentExpression();
		                value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
		            }
		            else if (!this.match(':')) {
		                params.push(keyToken);
		                shorthand = true;
		                value = init;
		            }
		            else {
		                this.expect(':');
		                value = this.parsePatternWithDefault(params, kind);
		            }
		        }
		        else {
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            this.expect(':');
		            value = this.parsePatternWithDefault(params, kind);
		        }
		        return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
		    };
		    Parser.prototype.parseObjectPattern = function (params, kind) {
		        var node = this.createNode();
		        var properties = [];
		        this.expect('{');
		        while (!this.match('}')) {
		            properties.push(this.parsePropertyPattern(params, kind));
		            if (!this.match('}')) {
		                this.expect(',');
		            }
		        }
		        this.expect('}');
		        return this.finalize(node, new Node.ObjectPattern(properties));
		    };
		    Parser.prototype.parsePattern = function (params, kind) {
		        var pattern;
		        if (this.match('[')) {
		            pattern = this.parseArrayPattern(params, kind);
		        }
		        else if (this.match('{')) {
		            pattern = this.parseObjectPattern(params, kind);
		        }
		        else {
		            if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
		                this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.LetInLexicalBinding);
		            }
		            params.push(this.lookahead);
		            pattern = this.parseVariableIdentifier(kind);
		        }
		        return pattern;
		    };
		    Parser.prototype.parsePatternWithDefault = function (params, kind) {
		        var startToken = this.lookahead;
		        var pattern = this.parsePattern(params, kind);
		        if (this.match('=')) {
		            this.nextToken();
		            var previousAllowYield = this.context.allowYield;
		            this.context.allowYield = true;
		            var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
		            this.context.allowYield = previousAllowYield;
		            pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
		        }
		        return pattern;
		    };
		    // https://tc39.github.io/ecma262/#sec-variable-statement
		    Parser.prototype.parseVariableIdentifier = function (kind) {
		        var node = this.createNode();
		        var token = this.nextToken();
		        if (token.type === 4 /* Keyword */ && token.value === 'yield') {
		            if (this.context.strict) {
		                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
		            }
		            else if (!this.context.allowYield) {
		                this.throwUnexpectedToken(token);
		            }
		        }
		        else if (token.type !== 3 /* Identifier */) {
		            if (this.context.strict && token.type === 4 /* Keyword */ && this.scanner.isStrictModeReservedWord(token.value)) {
		                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
		            }
		            else {
		                if (this.context.strict || token.value !== 'let' || kind !== 'var') {
		                    this.throwUnexpectedToken(token);
		                }
		            }
		        }
		        else if ((this.context.isModule || this.context.await) && token.type === 3 /* Identifier */ && token.value === 'await') {
		            this.tolerateUnexpectedToken(token);
		        }
		        return this.finalize(node, new Node.Identifier(token.value));
		    };
		    Parser.prototype.parseVariableDeclaration = function (options) {
		        var node = this.createNode();
		        var params = [];
		        var id = this.parsePattern(params, 'var');
		        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
		            if (this.scanner.isRestrictedWord(id.name)) {
		                this.tolerateError(messages_1.Messages.StrictVarName);
		            }
		        }
		        var init = null;
		        if (this.match('=')) {
		            this.nextToken();
		            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		        }
		        else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
		            this.expect('=');
		        }
		        return this.finalize(node, new Node.VariableDeclarator(id, init));
		    };
		    Parser.prototype.parseVariableDeclarationList = function (options) {
		        var opt = { inFor: options.inFor };
		        var list = [];
		        list.push(this.parseVariableDeclaration(opt));
		        while (this.match(',')) {
		            this.nextToken();
		            list.push(this.parseVariableDeclaration(opt));
		        }
		        return list;
		    };
		    Parser.prototype.parseVariableStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('var');
		        var declarations = this.parseVariableDeclarationList({ inFor: false });
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
		    };
		    // https://tc39.github.io/ecma262/#sec-empty-statement
		    Parser.prototype.parseEmptyStatement = function () {
		        var node = this.createNode();
		        this.expect(';');
		        return this.finalize(node, new Node.EmptyStatement());
		    };
		    // https://tc39.github.io/ecma262/#sec-expression-statement
		    Parser.prototype.parseExpressionStatement = function () {
		        var node = this.createNode();
		        var expr = this.parseExpression();
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ExpressionStatement(expr));
		    };
		    // https://tc39.github.io/ecma262/#sec-if-statement
		    Parser.prototype.parseIfClause = function () {
		        if (this.context.strict && this.matchKeyword('function')) {
		            this.tolerateError(messages_1.Messages.StrictFunction);
		        }
		        return this.parseStatement();
		    };
		    Parser.prototype.parseIfStatement = function () {
		        var node = this.createNode();
		        var consequent;
		        var alternate = null;
		        this.expectKeyword('if');
		        this.expect('(');
		        var test = this.parseExpression();
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            consequent = this.parseIfClause();
		            if (this.matchKeyword('else')) {
		                this.nextToken();
		                alternate = this.parseIfClause();
		            }
		        }
		        return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
		    };
		    // https://tc39.github.io/ecma262/#sec-do-while-statement
		    Parser.prototype.parseDoWhileStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('do');
		        var previousInIteration = this.context.inIteration;
		        this.context.inIteration = true;
		        var body = this.parseStatement();
		        this.context.inIteration = previousInIteration;
		        this.expectKeyword('while');
		        this.expect('(');
		        var test = this.parseExpression();
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		        }
		        else {
		            this.expect(')');
		            if (this.match(';')) {
		                this.nextToken();
		            }
		        }
		        return this.finalize(node, new Node.DoWhileStatement(body, test));
		    };
		    // https://tc39.github.io/ecma262/#sec-while-statement
		    Parser.prototype.parseWhileStatement = function () {
		        var node = this.createNode();
		        var body;
		        this.expectKeyword('while');
		        this.expect('(');
		        var test = this.parseExpression();
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            body = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            var previousInIteration = this.context.inIteration;
		            this.context.inIteration = true;
		            body = this.parseStatement();
		            this.context.inIteration = previousInIteration;
		        }
		        return this.finalize(node, new Node.WhileStatement(test, body));
		    };
		    // https://tc39.github.io/ecma262/#sec-for-statement
		    // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
		    Parser.prototype.parseForStatement = function () {
		        var init = null;
		        var test = null;
		        var update = null;
		        var forIn = true;
		        var left, right;
		        var node = this.createNode();
		        this.expectKeyword('for');
		        this.expect('(');
		        if (this.match(';')) {
		            this.nextToken();
		        }
		        else {
		            if (this.matchKeyword('var')) {
		                init = this.createNode();
		                this.nextToken();
		                var previousAllowIn = this.context.allowIn;
		                this.context.allowIn = false;
		                var declarations = this.parseVariableDeclarationList({ inFor: true });
		                this.context.allowIn = previousAllowIn;
		                if (declarations.length === 1 && this.matchKeyword('in')) {
		                    var decl = declarations[0];
		                    if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
		                        this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
		                    }
		                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
		                    this.nextToken();
		                    left = init;
		                    right = this.parseExpression();
		                    init = null;
		                }
		                else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
		                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
		                    this.nextToken();
		                    left = init;
		                    right = this.parseAssignmentExpression();
		                    init = null;
		                    forIn = false;
		                }
		                else {
		                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
		                    this.expect(';');
		                }
		            }
		            else if (this.matchKeyword('const') || this.matchKeyword('let')) {
		                init = this.createNode();
		                var kind = this.nextToken().value;
		                if (!this.context.strict && this.lookahead.value === 'in') {
		                    init = this.finalize(init, new Node.Identifier(kind));
		                    this.nextToken();
		                    left = init;
		                    right = this.parseExpression();
		                    init = null;
		                }
		                else {
		                    var previousAllowIn = this.context.allowIn;
		                    this.context.allowIn = false;
		                    var declarations = this.parseBindingList(kind, { inFor: true });
		                    this.context.allowIn = previousAllowIn;
		                    if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
		                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
		                        this.nextToken();
		                        left = init;
		                        right = this.parseExpression();
		                        init = null;
		                    }
		                    else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
		                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
		                        this.nextToken();
		                        left = init;
		                        right = this.parseAssignmentExpression();
		                        init = null;
		                        forIn = false;
		                    }
		                    else {
		                        this.consumeSemicolon();
		                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
		                    }
		                }
		            }
		            else {
		                var initStartToken = this.lookahead;
		                var previousAllowIn = this.context.allowIn;
		                this.context.allowIn = false;
		                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
		                this.context.allowIn = previousAllowIn;
		                if (this.matchKeyword('in')) {
		                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
		                    }
		                    this.nextToken();
		                    this.reinterpretExpressionAsPattern(init);
		                    left = init;
		                    right = this.parseExpression();
		                    init = null;
		                }
		                else if (this.matchContextualKeyword('of')) {
		                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
		                    }
		                    this.nextToken();
		                    this.reinterpretExpressionAsPattern(init);
		                    left = init;
		                    right = this.parseAssignmentExpression();
		                    init = null;
		                    forIn = false;
		                }
		                else {
		                    if (this.match(',')) {
		                        var initSeq = [init];
		                        while (this.match(',')) {
		                            this.nextToken();
		                            initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
		                        }
		                        init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
		                    }
		                    this.expect(';');
		                }
		            }
		        }
		        if (typeof left === 'undefined') {
		            if (!this.match(';')) {
		                test = this.parseExpression();
		            }
		            this.expect(';');
		            if (!this.match(')')) {
		                update = this.parseExpression();
		            }
		        }
		        var body;
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            body = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            var previousInIteration = this.context.inIteration;
		            this.context.inIteration = true;
		            body = this.isolateCoverGrammar(this.parseStatement);
		            this.context.inIteration = previousInIteration;
		        }
		        return (typeof left === 'undefined') ?
		            this.finalize(node, new Node.ForStatement(init, test, update, body)) :
		            forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
		                this.finalize(node, new Node.ForOfStatement(left, right, body));
		    };
		    // https://tc39.github.io/ecma262/#sec-continue-statement
		    Parser.prototype.parseContinueStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('continue');
		        var label = null;
		        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
		            var id = this.parseVariableIdentifier();
		            label = id;
		            var key = '$' + id.name;
		            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
		                this.throwError(messages_1.Messages.UnknownLabel, id.name);
		            }
		        }
		        this.consumeSemicolon();
		        if (label === null && !this.context.inIteration) {
		            this.throwError(messages_1.Messages.IllegalContinue);
		        }
		        return this.finalize(node, new Node.ContinueStatement(label));
		    };
		    // https://tc39.github.io/ecma262/#sec-break-statement
		    Parser.prototype.parseBreakStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('break');
		        var label = null;
		        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
		            var id = this.parseVariableIdentifier();
		            var key = '$' + id.name;
		            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
		                this.throwError(messages_1.Messages.UnknownLabel, id.name);
		            }
		            label = id;
		        }
		        this.consumeSemicolon();
		        if (label === null && !this.context.inIteration && !this.context.inSwitch) {
		            this.throwError(messages_1.Messages.IllegalBreak);
		        }
		        return this.finalize(node, new Node.BreakStatement(label));
		    };
		    // https://tc39.github.io/ecma262/#sec-return-statement
		    Parser.prototype.parseReturnStatement = function () {
		        if (!this.context.inFunctionBody) {
		            this.tolerateError(messages_1.Messages.IllegalReturn);
		        }
		        var node = this.createNode();
		        this.expectKeyword('return');
		        var hasArgument = (!this.match(';') && !this.match('}') &&
		            !this.hasLineTerminator && this.lookahead.type !== 2 /* EOF */) ||
		            this.lookahead.type === 8 /* StringLiteral */ ||
		            this.lookahead.type === 10 /* Template */;
		        var argument = hasArgument ? this.parseExpression() : null;
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ReturnStatement(argument));
		    };
		    // https://tc39.github.io/ecma262/#sec-with-statement
		    Parser.prototype.parseWithStatement = function () {
		        if (this.context.strict) {
		            this.tolerateError(messages_1.Messages.StrictModeWith);
		        }
		        var node = this.createNode();
		        var body;
		        this.expectKeyword('with');
		        this.expect('(');
		        var object = this.parseExpression();
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            body = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            body = this.parseStatement();
		        }
		        return this.finalize(node, new Node.WithStatement(object, body));
		    };
		    // https://tc39.github.io/ecma262/#sec-switch-statement
		    Parser.prototype.parseSwitchCase = function () {
		        var node = this.createNode();
		        var test;
		        if (this.matchKeyword('default')) {
		            this.nextToken();
		            test = null;
		        }
		        else {
		            this.expectKeyword('case');
		            test = this.parseExpression();
		        }
		        this.expect(':');
		        var consequent = [];
		        while (true) {
		            if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
		                break;
		            }
		            consequent.push(this.parseStatementListItem());
		        }
		        return this.finalize(node, new Node.SwitchCase(test, consequent));
		    };
		    Parser.prototype.parseSwitchStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('switch');
		        this.expect('(');
		        var discriminant = this.parseExpression();
		        this.expect(')');
		        var previousInSwitch = this.context.inSwitch;
		        this.context.inSwitch = true;
		        var cases = [];
		        var defaultFound = false;
		        this.expect('{');
		        while (true) {
		            if (this.match('}')) {
		                break;
		            }
		            var clause = this.parseSwitchCase();
		            if (clause.test === null) {
		                if (defaultFound) {
		                    this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
		                }
		                defaultFound = true;
		            }
		            cases.push(clause);
		        }
		        this.expect('}');
		        this.context.inSwitch = previousInSwitch;
		        return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
		    };
		    // https://tc39.github.io/ecma262/#sec-labelled-statements
		    Parser.prototype.parseLabelledStatement = function () {
		        var node = this.createNode();
		        var expr = this.parseExpression();
		        var statement;
		        if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
		            this.nextToken();
		            var id = expr;
		            var key = '$' + id.name;
		            if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
		                this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
		            }
		            this.context.labelSet[key] = true;
		            var body = void 0;
		            if (this.matchKeyword('class')) {
		                this.tolerateUnexpectedToken(this.lookahead);
		                body = this.parseClassDeclaration();
		            }
		            else if (this.matchKeyword('function')) {
		                var token = this.lookahead;
		                var declaration = this.parseFunctionDeclaration();
		                if (this.context.strict) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunction);
		                }
		                else if (declaration.generator) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.GeneratorInLegacyContext);
		                }
		                body = declaration;
		            }
		            else {
		                body = this.parseStatement();
		            }
		            delete this.context.labelSet[key];
		            statement = new Node.LabeledStatement(id, body);
		        }
		        else {
		            this.consumeSemicolon();
		            statement = new Node.ExpressionStatement(expr);
		        }
		        return this.finalize(node, statement);
		    };
		    // https://tc39.github.io/ecma262/#sec-throw-statement
		    Parser.prototype.parseThrowStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('throw');
		        if (this.hasLineTerminator) {
		            this.throwError(messages_1.Messages.NewlineAfterThrow);
		        }
		        var argument = this.parseExpression();
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ThrowStatement(argument));
		    };
		    // https://tc39.github.io/ecma262/#sec-try-statement
		    Parser.prototype.parseCatchClause = function () {
		        var node = this.createNode();
		        this.expectKeyword('catch');
		        this.expect('(');
		        if (this.match(')')) {
		            this.throwUnexpectedToken(this.lookahead);
		        }
		        var params = [];
		        var param = this.parsePattern(params);
		        var paramMap = {};
		        for (var i = 0; i < params.length; i++) {
		            var key = '$' + params[i].value;
		            if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
		                this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
		            }
		            paramMap[key] = true;
		        }
		        if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
		            if (this.scanner.isRestrictedWord(param.name)) {
		                this.tolerateError(messages_1.Messages.StrictCatchVariable);
		            }
		        }
		        this.expect(')');
		        var body = this.parseBlock();
		        return this.finalize(node, new Node.CatchClause(param, body));
		    };
		    Parser.prototype.parseFinallyClause = function () {
		        this.expectKeyword('finally');
		        return this.parseBlock();
		    };
		    Parser.prototype.parseTryStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('try');
		        var block = this.parseBlock();
		        var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
		        var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
		        if (!handler && !finalizer) {
		            this.throwError(messages_1.Messages.NoCatchOrFinally);
		        }
		        return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
		    };
		    // https://tc39.github.io/ecma262/#sec-debugger-statement
		    Parser.prototype.parseDebuggerStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('debugger');
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.DebuggerStatement());
		    };
		    // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
		    Parser.prototype.parseStatement = function () {
		        var statement;
		        switch (this.lookahead.type) {
		            case 1 /* BooleanLiteral */:
		            case 5 /* NullLiteral */:
		            case 6 /* NumericLiteral */:
		            case 8 /* StringLiteral */:
		            case 10 /* Template */:
		            case 9 /* RegularExpression */:
		                statement = this.parseExpressionStatement();
		                break;
		            case 7 /* Punctuator */:
		                var value = this.lookahead.value;
		                if (value === '{') {
		                    statement = this.parseBlock();
		                }
		                else if (value === '(') {
		                    statement = this.parseExpressionStatement();
		                }
		                else if (value === ';') {
		                    statement = this.parseEmptyStatement();
		                }
		                else {
		                    statement = this.parseExpressionStatement();
		                }
		                break;
		            case 3 /* Identifier */:
		                statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
		                break;
		            case 4 /* Keyword */:
		                switch (this.lookahead.value) {
		                    case 'break':
		                        statement = this.parseBreakStatement();
		                        break;
		                    case 'continue':
		                        statement = this.parseContinueStatement();
		                        break;
		                    case 'debugger':
		                        statement = this.parseDebuggerStatement();
		                        break;
		                    case 'do':
		                        statement = this.parseDoWhileStatement();
		                        break;
		                    case 'for':
		                        statement = this.parseForStatement();
		                        break;
		                    case 'function':
		                        statement = this.parseFunctionDeclaration();
		                        break;
		                    case 'if':
		                        statement = this.parseIfStatement();
		                        break;
		                    case 'return':
		                        statement = this.parseReturnStatement();
		                        break;
		                    case 'switch':
		                        statement = this.parseSwitchStatement();
		                        break;
		                    case 'throw':
		                        statement = this.parseThrowStatement();
		                        break;
		                    case 'try':
		                        statement = this.parseTryStatement();
		                        break;
		                    case 'var':
		                        statement = this.parseVariableStatement();
		                        break;
		                    case 'while':
		                        statement = this.parseWhileStatement();
		                        break;
		                    case 'with':
		                        statement = this.parseWithStatement();
		                        break;
		                    default:
		                        statement = this.parseExpressionStatement();
		                        break;
		                }
		                break;
		            default:
		                statement = this.throwUnexpectedToken(this.lookahead);
		        }
		        return statement;
		    };
		    // https://tc39.github.io/ecma262/#sec-function-definitions
		    Parser.prototype.parseFunctionSourceElements = function () {
		        var node = this.createNode();
		        this.expect('{');
		        var body = this.parseDirectivePrologues();
		        var previousLabelSet = this.context.labelSet;
		        var previousInIteration = this.context.inIteration;
		        var previousInSwitch = this.context.inSwitch;
		        var previousInFunctionBody = this.context.inFunctionBody;
		        this.context.labelSet = {};
		        this.context.inIteration = false;
		        this.context.inSwitch = false;
		        this.context.inFunctionBody = true;
		        while (this.lookahead.type !== 2 /* EOF */) {
		            if (this.match('}')) {
		                break;
		            }
		            body.push(this.parseStatementListItem());
		        }
		        this.expect('}');
		        this.context.labelSet = previousLabelSet;
		        this.context.inIteration = previousInIteration;
		        this.context.inSwitch = previousInSwitch;
		        this.context.inFunctionBody = previousInFunctionBody;
		        return this.finalize(node, new Node.BlockStatement(body));
		    };
		    Parser.prototype.validateParam = function (options, param, name) {
		        var key = '$' + name;
		        if (this.context.strict) {
		            if (this.scanner.isRestrictedWord(name)) {
		                options.stricted = param;
		                options.message = messages_1.Messages.StrictParamName;
		            }
		            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
		                options.stricted = param;
		                options.message = messages_1.Messages.StrictParamDupe;
		            }
		        }
		        else if (!options.firstRestricted) {
		            if (this.scanner.isRestrictedWord(name)) {
		                options.firstRestricted = param;
		                options.message = messages_1.Messages.StrictParamName;
		            }
		            else if (this.scanner.isStrictModeReservedWord(name)) {
		                options.firstRestricted = param;
		                options.message = messages_1.Messages.StrictReservedWord;
		            }
		            else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
		                options.stricted = param;
		                options.message = messages_1.Messages.StrictParamDupe;
		            }
		        }
		        /* istanbul ignore next */
		        if (typeof Object.defineProperty === 'function') {
		            Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
		        }
		        else {
		            options.paramSet[key] = true;
		        }
		    };
		    Parser.prototype.parseRestElement = function (params) {
		        var node = this.createNode();
		        this.expect('...');
		        var arg = this.parsePattern(params);
		        if (this.match('=')) {
		            this.throwError(messages_1.Messages.DefaultRestParameter);
		        }
		        if (!this.match(')')) {
		            this.throwError(messages_1.Messages.ParameterAfterRestParameter);
		        }
		        return this.finalize(node, new Node.RestElement(arg));
		    };
		    Parser.prototype.parseFormalParameter = function (options) {
		        var params = [];
		        var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
		        for (var i = 0; i < params.length; i++) {
		            this.validateParam(options, params[i], params[i].value);
		        }
		        options.simple = options.simple && (param instanceof Node.Identifier);
		        options.params.push(param);
		    };
		    Parser.prototype.parseFormalParameters = function (firstRestricted) {
		        var options;
		        options = {
		            simple: true,
		            params: [],
		            firstRestricted: firstRestricted
		        };
		        this.expect('(');
		        if (!this.match(')')) {
		            options.paramSet = {};
		            while (this.lookahead.type !== 2 /* EOF */) {
		                this.parseFormalParameter(options);
		                if (this.match(')')) {
		                    break;
		                }
		                this.expect(',');
		                if (this.match(')')) {
		                    break;
		                }
		            }
		        }
		        this.expect(')');
		        return {
		            simple: options.simple,
		            params: options.params,
		            stricted: options.stricted,
		            firstRestricted: options.firstRestricted,
		            message: options.message
		        };
		    };
		    Parser.prototype.matchAsyncFunction = function () {
		        var match = this.matchContextualKeyword('async');
		        if (match) {
		            var state = this.scanner.saveState();
		            this.scanner.scanComments();
		            var next = this.scanner.lex();
		            this.scanner.restoreState(state);
		            match = (state.lineNumber === next.lineNumber) && (next.type === 4 /* Keyword */) && (next.value === 'function');
		        }
		        return match;
		    };
		    Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
		        var node = this.createNode();
		        var isAsync = this.matchContextualKeyword('async');
		        if (isAsync) {
		            this.nextToken();
		        }
		        this.expectKeyword('function');
		        var isGenerator = isAsync ? false : this.match('*');
		        if (isGenerator) {
		            this.nextToken();
		        }
		        var message;
		        var id = null;
		        var firstRestricted = null;
		        if (!identifierIsOptional || !this.match('(')) {
		            var token = this.lookahead;
		            id = this.parseVariableIdentifier();
		            if (this.context.strict) {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
		                }
		            }
		            else {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictFunctionName;
		                }
		                else if (this.scanner.isStrictModeReservedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictReservedWord;
		                }
		            }
		        }
		        var previousAllowAwait = this.context.await;
		        var previousAllowYield = this.context.allowYield;
		        this.context.await = isAsync;
		        this.context.allowYield = !isGenerator;
		        var formalParameters = this.parseFormalParameters(firstRestricted);
		        var params = formalParameters.params;
		        var stricted = formalParameters.stricted;
		        firstRestricted = formalParameters.firstRestricted;
		        if (formalParameters.message) {
		            message = formalParameters.message;
		        }
		        var previousStrict = this.context.strict;
		        var previousAllowStrictDirective = this.context.allowStrictDirective;
		        this.context.allowStrictDirective = formalParameters.simple;
		        var body = this.parseFunctionSourceElements();
		        if (this.context.strict && firstRestricted) {
		            this.throwUnexpectedToken(firstRestricted, message);
		        }
		        if (this.context.strict && stricted) {
		            this.tolerateUnexpectedToken(stricted, message);
		        }
		        this.context.strict = previousStrict;
		        this.context.allowStrictDirective = previousAllowStrictDirective;
		        this.context.await = previousAllowAwait;
		        this.context.allowYield = previousAllowYield;
		        return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) :
		            this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
		    };
		    Parser.prototype.parseFunctionExpression = function () {
		        var node = this.createNode();
		        var isAsync = this.matchContextualKeyword('async');
		        if (isAsync) {
		            this.nextToken();
		        }
		        this.expectKeyword('function');
		        var isGenerator = isAsync ? false : this.match('*');
		        if (isGenerator) {
		            this.nextToken();
		        }
		        var message;
		        var id = null;
		        var firstRestricted;
		        var previousAllowAwait = this.context.await;
		        var previousAllowYield = this.context.allowYield;
		        this.context.await = isAsync;
		        this.context.allowYield = !isGenerator;
		        if (!this.match('(')) {
		            var token = this.lookahead;
		            id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
		            if (this.context.strict) {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
		                }
		            }
		            else {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictFunctionName;
		                }
		                else if (this.scanner.isStrictModeReservedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictReservedWord;
		                }
		            }
		        }
		        var formalParameters = this.parseFormalParameters(firstRestricted);
		        var params = formalParameters.params;
		        var stricted = formalParameters.stricted;
		        firstRestricted = formalParameters.firstRestricted;
		        if (formalParameters.message) {
		            message = formalParameters.message;
		        }
		        var previousStrict = this.context.strict;
		        var previousAllowStrictDirective = this.context.allowStrictDirective;
		        this.context.allowStrictDirective = formalParameters.simple;
		        var body = this.parseFunctionSourceElements();
		        if (this.context.strict && firstRestricted) {
		            this.throwUnexpectedToken(firstRestricted, message);
		        }
		        if (this.context.strict && stricted) {
		            this.tolerateUnexpectedToken(stricted, message);
		        }
		        this.context.strict = previousStrict;
		        this.context.allowStrictDirective = previousAllowStrictDirective;
		        this.context.await = previousAllowAwait;
		        this.context.allowYield = previousAllowYield;
		        return isAsync ? this.finalize(node, new Node.AsyncFunctionExpression(id, params, body)) :
		            this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
		    };
		    // https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
		    Parser.prototype.parseDirective = function () {
		        var token = this.lookahead;
		        var node = this.createNode();
		        var expr = this.parseExpression();
		        var directive = (expr.type === syntax_1.Syntax.Literal) ? this.getTokenRaw(token).slice(1, -1) : null;
		        this.consumeSemicolon();
		        return this.finalize(node, directive ? new Node.Directive(expr, directive) : new Node.ExpressionStatement(expr));
		    };
		    Parser.prototype.parseDirectivePrologues = function () {
		        var firstRestricted = null;
		        var body = [];
		        while (true) {
		            var token = this.lookahead;
		            if (token.type !== 8 /* StringLiteral */) {
		                break;
		            }
		            var statement = this.parseDirective();
		            body.push(statement);
		            var directive = statement.directive;
		            if (typeof directive !== 'string') {
		                break;
		            }
		            if (directive === 'use strict') {
		                this.context.strict = true;
		                if (firstRestricted) {
		                    this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
		                }
		                if (!this.context.allowStrictDirective) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.IllegalLanguageModeDirective);
		                }
		            }
		            else {
		                if (!firstRestricted && token.octal) {
		                    firstRestricted = token;
		                }
		            }
		        }
		        return body;
		    };
		    // https://tc39.github.io/ecma262/#sec-method-definitions
		    Parser.prototype.qualifiedPropertyName = function (token) {
		        switch (token.type) {
		            case 3 /* Identifier */:
		            case 8 /* StringLiteral */:
		            case 1 /* BooleanLiteral */:
		            case 5 /* NullLiteral */:
		            case 6 /* NumericLiteral */:
		            case 4 /* Keyword */:
		                return true;
		            case 7 /* Punctuator */:
		                return token.value === '[';
		        }
		        return false;
		    };
		    Parser.prototype.parseGetterMethod = function () {
		        var node = this.createNode();
		        var isGenerator = false;
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = !isGenerator;
		        var formalParameters = this.parseFormalParameters();
		        if (formalParameters.params.length > 0) {
		            this.tolerateError(messages_1.Messages.BadGetterArity);
		        }
		        var method = this.parsePropertyMethod(formalParameters);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
		    };
		    Parser.prototype.parseSetterMethod = function () {
		        var node = this.createNode();
		        var isGenerator = false;
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = !isGenerator;
		        var formalParameters = this.parseFormalParameters();
		        if (formalParameters.params.length !== 1) {
		            this.tolerateError(messages_1.Messages.BadSetterArity);
		        }
		        else if (formalParameters.params[0] instanceof Node.RestElement) {
		            this.tolerateError(messages_1.Messages.BadSetterRestParameter);
		        }
		        var method = this.parsePropertyMethod(formalParameters);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
		    };
		    Parser.prototype.parseGeneratorMethod = function () {
		        var node = this.createNode();
		        var isGenerator = true;
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = true;
		        var params = this.parseFormalParameters();
		        this.context.allowYield = false;
		        var method = this.parsePropertyMethod(params);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
		    };
		    // https://tc39.github.io/ecma262/#sec-generator-function-definitions
		    Parser.prototype.isStartOfExpression = function () {
		        var start = true;
		        var value = this.lookahead.value;
		        switch (this.lookahead.type) {
		            case 7 /* Punctuator */:
		                start = (value === '[') || (value === '(') || (value === '{') ||
		                    (value === '+') || (value === '-') ||
		                    (value === '!') || (value === '~') ||
		                    (value === '++') || (value === '--') ||
		                    (value === '/') || (value === '/='); // regular expression literal
		                break;
		            case 4 /* Keyword */:
		                start = (value === 'class') || (value === 'delete') ||
		                    (value === 'function') || (value === 'let') || (value === 'new') ||
		                    (value === 'super') || (value === 'this') || (value === 'typeof') ||
		                    (value === 'void') || (value === 'yield');
		                break;
		        }
		        return start;
		    };
		    Parser.prototype.parseYieldExpression = function () {
		        var node = this.createNode();
		        this.expectKeyword('yield');
		        var argument = null;
		        var delegate = false;
		        if (!this.hasLineTerminator) {
		            var previousAllowYield = this.context.allowYield;
		            this.context.allowYield = false;
		            delegate = this.match('*');
		            if (delegate) {
		                this.nextToken();
		                argument = this.parseAssignmentExpression();
		            }
		            else if (this.isStartOfExpression()) {
		                argument = this.parseAssignmentExpression();
		            }
		            this.context.allowYield = previousAllowYield;
		        }
		        return this.finalize(node, new Node.YieldExpression(argument, delegate));
		    };
		    // https://tc39.github.io/ecma262/#sec-class-definitions
		    Parser.prototype.parseClassElement = function (hasConstructor) {
		        var token = this.lookahead;
		        var node = this.createNode();
		        var kind = '';
		        var key = null;
		        var value = null;
		        var computed = false;
		        var method = false;
		        var isStatic = false;
		        var isAsync = false;
		        if (this.match('*')) {
		            this.nextToken();
		        }
		        else {
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            var id = key;
		            if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
		                token = this.lookahead;
		                isStatic = true;
		                computed = this.match('[');
		                if (this.match('*')) {
		                    this.nextToken();
		                }
		                else {
		                    key = this.parseObjectPropertyKey();
		                }
		            }
		            if ((token.type === 3 /* Identifier */) && !this.hasLineTerminator && (token.value === 'async')) {
		                var punctuator = this.lookahead.value;
		                if (punctuator !== ':' && punctuator !== '(' && punctuator !== '*') {
		                    isAsync = true;
		                    token = this.lookahead;
		                    key = this.parseObjectPropertyKey();
		                    if (token.type === 3 /* Identifier */ && token.value === 'constructor') {
		                        this.tolerateUnexpectedToken(token, messages_1.Messages.ConstructorIsAsync);
		                    }
		                }
		            }
		        }
		        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
		        if (token.type === 3 /* Identifier */) {
		            if (token.value === 'get' && lookaheadPropertyKey) {
		                kind = 'get';
		                computed = this.match('[');
		                key = this.parseObjectPropertyKey();
		                this.context.allowYield = false;
		                value = this.parseGetterMethod();
		            }
		            else if (token.value === 'set' && lookaheadPropertyKey) {
		                kind = 'set';
		                computed = this.match('[');
		                key = this.parseObjectPropertyKey();
		                value = this.parseSetterMethod();
		            }
		        }
		        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
		            kind = 'init';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            value = this.parseGeneratorMethod();
		            method = true;
		        }
		        if (!kind && key && this.match('(')) {
		            kind = 'init';
		            value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
		            method = true;
		        }
		        if (!kind) {
		            this.throwUnexpectedToken(this.lookahead);
		        }
		        if (kind === 'init') {
		            kind = 'method';
		        }
		        if (!computed) {
		            if (isStatic && this.isPropertyKey(key, 'prototype')) {
		                this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
		            }
		            if (!isStatic && this.isPropertyKey(key, 'constructor')) {
		                if (kind !== 'method' || !method || (value && value.generator)) {
		                    this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
		                }
		                if (hasConstructor.value) {
		                    this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
		                }
		                else {
		                    hasConstructor.value = true;
		                }
		                kind = 'constructor';
		            }
		        }
		        return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
		    };
		    Parser.prototype.parseClassElementList = function () {
		        var body = [];
		        var hasConstructor = { value: false };
		        this.expect('{');
		        while (!this.match('}')) {
		            if (this.match(';')) {
		                this.nextToken();
		            }
		            else {
		                body.push(this.parseClassElement(hasConstructor));
		            }
		        }
		        this.expect('}');
		        return body;
		    };
		    Parser.prototype.parseClassBody = function () {
		        var node = this.createNode();
		        var elementList = this.parseClassElementList();
		        return this.finalize(node, new Node.ClassBody(elementList));
		    };
		    Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
		        var node = this.createNode();
		        var previousStrict = this.context.strict;
		        this.context.strict = true;
		        this.expectKeyword('class');
		        var id = (identifierIsOptional && (this.lookahead.type !== 3 /* Identifier */)) ? null : this.parseVariableIdentifier();
		        var superClass = null;
		        if (this.matchKeyword('extends')) {
		            this.nextToken();
		            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		        }
		        var classBody = this.parseClassBody();
		        this.context.strict = previousStrict;
		        return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
		    };
		    Parser.prototype.parseClassExpression = function () {
		        var node = this.createNode();
		        var previousStrict = this.context.strict;
		        this.context.strict = true;
		        this.expectKeyword('class');
		        var id = (this.lookahead.type === 3 /* Identifier */) ? this.parseVariableIdentifier() : null;
		        var superClass = null;
		        if (this.matchKeyword('extends')) {
		            this.nextToken();
		            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		        }
		        var classBody = this.parseClassBody();
		        this.context.strict = previousStrict;
		        return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
		    };
		    // https://tc39.github.io/ecma262/#sec-scripts
		    // https://tc39.github.io/ecma262/#sec-modules
		    Parser.prototype.parseModule = function () {
		        this.context.strict = true;
		        this.context.isModule = true;
		        this.scanner.isModule = true;
		        var node = this.createNode();
		        var body = this.parseDirectivePrologues();
		        while (this.lookahead.type !== 2 /* EOF */) {
		            body.push(this.parseStatementListItem());
		        }
		        return this.finalize(node, new Node.Module(body));
		    };
		    Parser.prototype.parseScript = function () {
		        var node = this.createNode();
		        var body = this.parseDirectivePrologues();
		        while (this.lookahead.type !== 2 /* EOF */) {
		            body.push(this.parseStatementListItem());
		        }
		        return this.finalize(node, new Node.Script(body));
		    };
		    // https://tc39.github.io/ecma262/#sec-imports
		    Parser.prototype.parseModuleSpecifier = function () {
		        var node = this.createNode();
		        if (this.lookahead.type !== 8 /* StringLiteral */) {
		            this.throwError(messages_1.Messages.InvalidModuleSpecifier);
		        }
		        var token = this.nextToken();
		        var raw = this.getTokenRaw(token);
		        return this.finalize(node, new Node.Literal(token.value, raw));
		    };
		    // import {<foo as bar>} ...;
		    Parser.prototype.parseImportSpecifier = function () {
		        var node = this.createNode();
		        var imported;
		        var local;
		        if (this.lookahead.type === 3 /* Identifier */) {
		            imported = this.parseVariableIdentifier();
		            local = imported;
		            if (this.matchContextualKeyword('as')) {
		                this.nextToken();
		                local = this.parseVariableIdentifier();
		            }
		        }
		        else {
		            imported = this.parseIdentifierName();
		            local = imported;
		            if (this.matchContextualKeyword('as')) {
		                this.nextToken();
		                local = this.parseVariableIdentifier();
		            }
		            else {
		                this.throwUnexpectedToken(this.nextToken());
		            }
		        }
		        return this.finalize(node, new Node.ImportSpecifier(local, imported));
		    };
		    // {foo, bar as bas}
		    Parser.prototype.parseNamedImports = function () {
		        this.expect('{');
		        var specifiers = [];
		        while (!this.match('}')) {
		            specifiers.push(this.parseImportSpecifier());
		            if (!this.match('}')) {
		                this.expect(',');
		            }
		        }
		        this.expect('}');
		        return specifiers;
		    };
		    // import <foo> ...;
		    Parser.prototype.parseImportDefaultSpecifier = function () {
		        var node = this.createNode();
		        var local = this.parseIdentifierName();
		        return this.finalize(node, new Node.ImportDefaultSpecifier(local));
		    };
		    // import <* as foo> ...;
		    Parser.prototype.parseImportNamespaceSpecifier = function () {
		        var node = this.createNode();
		        this.expect('*');
		        if (!this.matchContextualKeyword('as')) {
		            this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
		        }
		        this.nextToken();
		        var local = this.parseIdentifierName();
		        return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
		    };
		    Parser.prototype.parseImportDeclaration = function () {
		        if (this.context.inFunctionBody) {
		            this.throwError(messages_1.Messages.IllegalImportDeclaration);
		        }
		        var node = this.createNode();
		        this.expectKeyword('import');
		        var src;
		        var specifiers = [];
		        if (this.lookahead.type === 8 /* StringLiteral */) {
		            // import 'foo';
		            src = this.parseModuleSpecifier();
		        }
		        else {
		            if (this.match('{')) {
		                // import {bar}
		                specifiers = specifiers.concat(this.parseNamedImports());
		            }
		            else if (this.match('*')) {
		                // import * as foo
		                specifiers.push(this.parseImportNamespaceSpecifier());
		            }
		            else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
		                // import foo
		                specifiers.push(this.parseImportDefaultSpecifier());
		                if (this.match(',')) {
		                    this.nextToken();
		                    if (this.match('*')) {
		                        // import foo, * as foo
		                        specifiers.push(this.parseImportNamespaceSpecifier());
		                    }
		                    else if (this.match('{')) {
		                        // import foo, {bar}
		                        specifiers = specifiers.concat(this.parseNamedImports());
		                    }
		                    else {
		                        this.throwUnexpectedToken(this.lookahead);
		                    }
		                }
		            }
		            else {
		                this.throwUnexpectedToken(this.nextToken());
		            }
		            if (!this.matchContextualKeyword('from')) {
		                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
		                this.throwError(message, this.lookahead.value);
		            }
		            this.nextToken();
		            src = this.parseModuleSpecifier();
		        }
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
		    };
		    // https://tc39.github.io/ecma262/#sec-exports
		    Parser.prototype.parseExportSpecifier = function () {
		        var node = this.createNode();
		        var local = this.parseIdentifierName();
		        var exported = local;
		        if (this.matchContextualKeyword('as')) {
		            this.nextToken();
		            exported = this.parseIdentifierName();
		        }
		        return this.finalize(node, new Node.ExportSpecifier(local, exported));
		    };
		    Parser.prototype.parseExportDeclaration = function () {
		        if (this.context.inFunctionBody) {
		            this.throwError(messages_1.Messages.IllegalExportDeclaration);
		        }
		        var node = this.createNode();
		        this.expectKeyword('export');
		        var exportDeclaration;
		        if (this.matchKeyword('default')) {
		            // export default ...
		            this.nextToken();
		            if (this.matchKeyword('function')) {
		                // export default function foo () {}
		                // export default function () {}
		                var declaration = this.parseFunctionDeclaration(true);
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		            else if (this.matchKeyword('class')) {
		                // export default class foo {}
		                var declaration = this.parseClassDeclaration(true);
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		            else if (this.matchContextualKeyword('async')) {
		                // export default async function f () {}
		                // export default async function () {}
		                // export default async x => x
		                var declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		            else {
		                if (this.matchContextualKeyword('from')) {
		                    this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
		                }
		                // export default {};
		                // export default [];
		                // export default (1 + 2);
		                var declaration = this.match('{') ? this.parseObjectInitializer() :
		                    this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
		                this.consumeSemicolon();
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		        }
		        else if (this.match('*')) {
		            // export * from 'foo';
		            this.nextToken();
		            if (!this.matchContextualKeyword('from')) {
		                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
		                this.throwError(message, this.lookahead.value);
		            }
		            this.nextToken();
		            var src = this.parseModuleSpecifier();
		            this.consumeSemicolon();
		            exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
		        }
		        else if (this.lookahead.type === 4 /* Keyword */) {
		            // export var f = 1;
		            var declaration = void 0;
		            switch (this.lookahead.value) {
		                case 'let':
		                case 'const':
		                    declaration = this.parseLexicalDeclaration({ inFor: false });
		                    break;
		                case 'var':
		                case 'class':
		                case 'function':
		                    declaration = this.parseStatementListItem();
		                    break;
		                default:
		                    this.throwUnexpectedToken(this.lookahead);
		            }
		            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
		        }
		        else if (this.matchAsyncFunction()) {
		            var declaration = this.parseFunctionDeclaration();
		            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
		        }
		        else {
		            var specifiers = [];
		            var source = null;
		            var isExportFromIdentifier = false;
		            this.expect('{');
		            while (!this.match('}')) {
		                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
		                specifiers.push(this.parseExportSpecifier());
		                if (!this.match('}')) {
		                    this.expect(',');
		                }
		            }
		            this.expect('}');
		            if (this.matchContextualKeyword('from')) {
		                // export {default} from 'foo';
		                // export {foo} from 'foo';
		                this.nextToken();
		                source = this.parseModuleSpecifier();
		                this.consumeSemicolon();
		            }
		            else if (isExportFromIdentifier) {
		                // export {default}; // missing fromClause
		                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
		                this.throwError(message, this.lookahead.value);
		            }
		            else {
		                // export {foo};
		                this.consumeSemicolon();
		            }
		            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
		        }
		        return exportDeclaration;
		    };
		    return Parser;
		}());
		exports.Parser = Parser;


	/***/ },
	/* 9 */
	/***/ function(module, exports) {
		// Ensure the condition is true, otherwise throw an error.
		// This is only to have a better contract semantic, i.e. another safety net
		// to catch a logic error. The condition shall be fulfilled in normal case.
		// Do NOT use this to enforce a certain condition on any user input.
		Object.defineProperty(exports, "__esModule", { value: true });
		function assert(condition, message) {
		    /* istanbul ignore if */
		    if (!condition) {
		        throw new Error('ASSERT: ' + message);
		    }
		}
		exports.assert = assert;


	/***/ },
	/* 10 */
	/***/ function(module, exports) {
		/* tslint:disable:max-classes-per-file */
		Object.defineProperty(exports, "__esModule", { value: true });
		var ErrorHandler = (function () {
		    function ErrorHandler() {
		        this.errors = [];
		        this.tolerant = false;
		    }
		    ErrorHandler.prototype.recordError = function (error) {
		        this.errors.push(error);
		    };
		    ErrorHandler.prototype.tolerate = function (error) {
		        if (this.tolerant) {
		            this.recordError(error);
		        }
		        else {
		            throw error;
		        }
		    };
		    ErrorHandler.prototype.constructError = function (msg, column) {
		        var error = new Error(msg);
		        try {
		            throw error;
		        }
		        catch (base) {
		            /* istanbul ignore else */
		            if (Object.create && Object.defineProperty) {
		                error = Object.create(base);
		                Object.defineProperty(error, 'column', { value: column });
		            }
		        }
		        /* istanbul ignore next */
		        return error;
		    };
		    ErrorHandler.prototype.createError = function (index, line, col, description) {
		        var msg = 'Line ' + line + ': ' + description;
		        var error = this.constructError(msg, col);
		        error.index = index;
		        error.lineNumber = line;
		        error.description = description;
		        return error;
		    };
		    ErrorHandler.prototype.throwError = function (index, line, col, description) {
		        throw this.createError(index, line, col, description);
		    };
		    ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
		        var error = this.createError(index, line, col, description);
		        if (this.tolerant) {
		            this.recordError(error);
		        }
		        else {
		            throw error;
		        }
		    };
		    return ErrorHandler;
		}());
		exports.ErrorHandler = ErrorHandler;


	/***/ },
	/* 11 */
	/***/ function(module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		// Error messages should be identical to V8.
		exports.Messages = {
		    BadGetterArity: 'Getter must not have any formal parameters',
		    BadSetterArity: 'Setter must have exactly one formal parameter',
		    BadSetterRestParameter: 'Setter function argument must not be a rest parameter',
		    ConstructorIsAsync: 'Class constructor may not be an async method',
		    ConstructorSpecialMethod: 'Class constructor may not be an accessor',
		    DeclarationMissingInitializer: 'Missing initializer in %0 declaration',
		    DefaultRestParameter: 'Unexpected token =',
		    DuplicateBinding: 'Duplicate binding %0',
		    DuplicateConstructor: 'A class may only have one constructor',
		    DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
		    ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer',
		    GeneratorInLegacyContext: 'Generator declarations are not allowed in legacy contexts',
		    IllegalBreak: 'Illegal break statement',
		    IllegalContinue: 'Illegal continue statement',
		    IllegalExportDeclaration: 'Unexpected token',
		    IllegalImportDeclaration: 'Unexpected token',
		    IllegalLanguageModeDirective: 'Illegal \'use strict\' directive in function with non-simple parameter list',
		    IllegalReturn: 'Illegal return statement',
		    InvalidEscapedReservedWord: 'Keyword must not contain escaped characters',
		    InvalidHexEscapeSequence: 'Invalid hexadecimal escape sequence',
		    InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
		    InvalidLHSInForIn: 'Invalid left-hand side in for-in',
		    InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
		    InvalidModuleSpecifier: 'Unexpected token',
		    InvalidRegExp: 'Invalid regular expression',
		    LetInLexicalBinding: 'let is disallowed as a lexically bound name',
		    MissingFromClause: 'Unexpected token',
		    MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
		    NewlineAfterThrow: 'Illegal newline after throw',
		    NoAsAfterImportNamespace: 'Unexpected token',
		    NoCatchOrFinally: 'Missing catch or finally after try',
		    ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
		    Redeclaration: '%0 \'%1\' has already been declared',
		    StaticPrototype: 'Classes may not have static property named prototype',
		    StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
		    StrictDelete: 'Delete of an unqualified identifier in strict mode.',
		    StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block',
		    StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
		    StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
		    StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
		    StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
		    StrictModeWith: 'Strict mode code may not include a with statement',
		    StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
		    StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
		    StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
		    StrictReservedWord: 'Use of future reserved word in strict mode',
		    StrictVarName: 'Variable name may not be eval or arguments in strict mode',
		    TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
		    UnexpectedEOS: 'Unexpected end of input',
		    UnexpectedIdentifier: 'Unexpected identifier',
		    UnexpectedNumber: 'Unexpected number',
		    UnexpectedReserved: 'Unexpected reserved word',
		    UnexpectedString: 'Unexpected string',
		    UnexpectedTemplate: 'Unexpected quasi %0',
		    UnexpectedToken: 'Unexpected token %0',
		    UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
		    UnknownLabel: 'Undefined label \'%0\'',
		    UnterminatedRegExp: 'Invalid regular expression: missing /'
		};


	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
		Object.defineProperty(exports, "__esModule", { value: true });
		var assert_1 = __webpack_require__(9);
		var character_1 = __webpack_require__(4);
		var messages_1 = __webpack_require__(11);
		function hexValue(ch) {
		    return '0123456789abcdef'.indexOf(ch.toLowerCase());
		}
		function octalValue(ch) {
		    return '01234567'.indexOf(ch);
		}
		var Scanner = (function () {
		    function Scanner(code, handler) {
		        this.source = code;
		        this.errorHandler = handler;
		        this.trackComment = false;
		        this.isModule = false;
		        this.length = code.length;
		        this.index = 0;
		        this.lineNumber = (code.length > 0) ? 1 : 0;
		        this.lineStart = 0;
		        this.curlyStack = [];
		    }
		    Scanner.prototype.saveState = function () {
		        return {
		            index: this.index,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart
		        };
		    };
		    Scanner.prototype.restoreState = function (state) {
		        this.index = state.index;
		        this.lineNumber = state.lineNumber;
		        this.lineStart = state.lineStart;
		    };
		    Scanner.prototype.eof = function () {
		        return this.index >= this.length;
		    };
		    Scanner.prototype.throwUnexpectedToken = function (message) {
		        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
		        return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
		    };
		    Scanner.prototype.tolerateUnexpectedToken = function (message) {
		        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
		        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
		    };
		    // https://tc39.github.io/ecma262/#sec-comments
		    Scanner.prototype.skipSingleLineComment = function (offset) {
		        var comments = [];
		        var start, loc;
		        if (this.trackComment) {
		            comments = [];
		            start = this.index - offset;
		            loc = {
		                start: {
		                    line: this.lineNumber,
		                    column: this.index - this.lineStart - offset
		                },
		                end: {}
		            };
		        }
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            ++this.index;
		            if (character_1.Character.isLineTerminator(ch)) {
		                if (this.trackComment) {
		                    loc.end = {
		                        line: this.lineNumber,
		                        column: this.index - this.lineStart - 1
		                    };
		                    var entry = {
		                        multiLine: false,
		                        slice: [start + offset, this.index - 1],
		                        range: [start, this.index - 1],
		                        loc: loc
		                    };
		                    comments.push(entry);
		                }
		                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
		                    ++this.index;
		                }
		                ++this.lineNumber;
		                this.lineStart = this.index;
		                return comments;
		            }
		        }
		        if (this.trackComment) {
		            loc.end = {
		                line: this.lineNumber,
		                column: this.index - this.lineStart
		            };
		            var entry = {
		                multiLine: false,
		                slice: [start + offset, this.index],
		                range: [start, this.index],
		                loc: loc
		            };
		            comments.push(entry);
		        }
		        return comments;
		    };
		    Scanner.prototype.skipMultiLineComment = function () {
		        var comments = [];
		        var start, loc;
		        if (this.trackComment) {
		            comments = [];
		            start = this.index - 2;
		            loc = {
		                start: {
		                    line: this.lineNumber,
		                    column: this.index - this.lineStart - 2
		                },
		                end: {}
		            };
		        }
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            if (character_1.Character.isLineTerminator(ch)) {
		                if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
		                    ++this.index;
		                }
		                ++this.lineNumber;
		                ++this.index;
		                this.lineStart = this.index;
		            }
		            else if (ch === 0x2A) {
		                // Block comment ends with '*/'.
		                if (this.source.charCodeAt(this.index + 1) === 0x2F) {
		                    this.index += 2;
		                    if (this.trackComment) {
		                        loc.end = {
		                            line: this.lineNumber,
		                            column: this.index - this.lineStart
		                        };
		                        var entry = {
		                            multiLine: true,
		                            slice: [start + 2, this.index - 2],
		                            range: [start, this.index],
		                            loc: loc
		                        };
		                        comments.push(entry);
		                    }
		                    return comments;
		                }
		                ++this.index;
		            }
		            else {
		                ++this.index;
		            }
		        }
		        // Ran off the end of the file - the whole thing is a comment
		        if (this.trackComment) {
		            loc.end = {
		                line: this.lineNumber,
		                column: this.index - this.lineStart
		            };
		            var entry = {
		                multiLine: true,
		                slice: [start + 2, this.index],
		                range: [start, this.index],
		                loc: loc
		            };
		            comments.push(entry);
		        }
		        this.tolerateUnexpectedToken();
		        return comments;
		    };
		    Scanner.prototype.scanComments = function () {
		        var comments;
		        if (this.trackComment) {
		            comments = [];
		        }
		        var start = (this.index === 0);
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            if (character_1.Character.isWhiteSpace(ch)) {
		                ++this.index;
		            }
		            else if (character_1.Character.isLineTerminator(ch)) {
		                ++this.index;
		                if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
		                    ++this.index;
		                }
		                ++this.lineNumber;
		                this.lineStart = this.index;
		                start = true;
		            }
		            else if (ch === 0x2F) {
		                ch = this.source.charCodeAt(this.index + 1);
		                if (ch === 0x2F) {
		                    this.index += 2;
		                    var comment = this.skipSingleLineComment(2);
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                    start = true;
		                }
		                else if (ch === 0x2A) {
		                    this.index += 2;
		                    var comment = this.skipMultiLineComment();
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                }
		                else {
		                    break;
		                }
		            }
		            else if (start && ch === 0x2D) {
		                // U+003E is '>'
		                if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
		                    // '-->' is a single-line comment
		                    this.index += 3;
		                    var comment = this.skipSingleLineComment(3);
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                }
		                else {
		                    break;
		                }
		            }
		            else if (ch === 0x3C && !this.isModule) {
		                if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
		                    this.index += 4; // `<!--`
		                    var comment = this.skipSingleLineComment(4);
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                }
		                else {
		                    break;
		                }
		            }
		            else {
		                break;
		            }
		        }
		        return comments;
		    };
		    // https://tc39.github.io/ecma262/#sec-future-reserved-words
		    Scanner.prototype.isFutureReservedWord = function (id) {
		        switch (id) {
		            case 'enum':
		            case 'export':
		            case 'import':
		            case 'super':
		                return true;
		            default:
		                return false;
		        }
		    };
		    Scanner.prototype.isStrictModeReservedWord = function (id) {
		        switch (id) {
		            case 'implements':
		            case 'interface':
		            case 'package':
		            case 'private':
		            case 'protected':
		            case 'public':
		            case 'static':
		            case 'yield':
		            case 'let':
		                return true;
		            default:
		                return false;
		        }
		    };
		    Scanner.prototype.isRestrictedWord = function (id) {
		        return id === 'eval' || id === 'arguments';
		    };
		    // https://tc39.github.io/ecma262/#sec-keywords
		    Scanner.prototype.isKeyword = function (id) {
		        switch (id.length) {
		            case 2:
		                return (id === 'if') || (id === 'in') || (id === 'do');
		            case 3:
		                return (id === 'var') || (id === 'for') || (id === 'new') ||
		                    (id === 'try') || (id === 'let');
		            case 4:
		                return (id === 'this') || (id === 'else') || (id === 'case') ||
		                    (id === 'void') || (id === 'with') || (id === 'enum');
		            case 5:
		                return (id === 'while') || (id === 'break') || (id === 'catch') ||
		                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
		                    (id === 'class') || (id === 'super');
		            case 6:
		                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
		                    (id === 'switch') || (id === 'export') || (id === 'import');
		            case 7:
		                return (id === 'default') || (id === 'finally') || (id === 'extends');
		            case 8:
		                return (id === 'function') || (id === 'continue') || (id === 'debugger');
		            case 10:
		                return (id === 'instanceof');
		            default:
		                return false;
		        }
		    };
		    Scanner.prototype.codePointAt = function (i) {
		        var cp = this.source.charCodeAt(i);
		        if (cp >= 0xD800 && cp <= 0xDBFF) {
		            var second = this.source.charCodeAt(i + 1);
		            if (second >= 0xDC00 && second <= 0xDFFF) {
		                var first = cp;
		                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
		            }
		        }
		        return cp;
		    };
		    Scanner.prototype.scanHexEscape = function (prefix) {
		        var len = (prefix === 'u') ? 4 : 2;
		        var code = 0;
		        for (var i = 0; i < len; ++i) {
		            if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
		                code = code * 16 + hexValue(this.source[this.index++]);
		            }
		            else {
		                return null;
		            }
		        }
		        return String.fromCharCode(code);
		    };
		    Scanner.prototype.scanUnicodeCodePointEscape = function () {
		        var ch = this.source[this.index];
		        var code = 0;
		        // At least, one hex digit is required.
		        if (ch === '}') {
		            this.throwUnexpectedToken();
		        }
		        while (!this.eof()) {
		            ch = this.source[this.index++];
		            if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
		                break;
		            }
		            code = code * 16 + hexValue(ch);
		        }
		        if (code > 0x10FFFF || ch !== '}') {
		            this.throwUnexpectedToken();
		        }
		        return character_1.Character.fromCodePoint(code);
		    };
		    Scanner.prototype.getIdentifier = function () {
		        var start = this.index++;
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            if (ch === 0x5C) {
		                // Blackslash (U+005C) marks Unicode escape sequence.
		                this.index = start;
		                return this.getComplexIdentifier();
		            }
		            else if (ch >= 0xD800 && ch < 0xDFFF) {
		                // Need to handle surrogate pairs.
		                this.index = start;
		                return this.getComplexIdentifier();
		            }
		            if (character_1.Character.isIdentifierPart(ch)) {
		                ++this.index;
		            }
		            else {
		                break;
		            }
		        }
		        return this.source.slice(start, this.index);
		    };
		    Scanner.prototype.getComplexIdentifier = function () {
		        var cp = this.codePointAt(this.index);
		        var id = character_1.Character.fromCodePoint(cp);
		        this.index += id.length;
		        // '\u' (U+005C, U+0075) denotes an escaped character.
		        var ch;
		        if (cp === 0x5C) {
		            if (this.source.charCodeAt(this.index) !== 0x75) {
		                this.throwUnexpectedToken();
		            }
		            ++this.index;
		            if (this.source[this.index] === '{') {
		                ++this.index;
		                ch = this.scanUnicodeCodePointEscape();
		            }
		            else {
		                ch = this.scanHexEscape('u');
		                if (ch === null || ch === '\\' || !character_1.Character.isIdentifierStart(ch.charCodeAt(0))) {
		                    this.throwUnexpectedToken();
		                }
		            }
		            id = ch;
		        }
		        while (!this.eof()) {
		            cp = this.codePointAt(this.index);
		            if (!character_1.Character.isIdentifierPart(cp)) {
		                break;
		            }
		            ch = character_1.Character.fromCodePoint(cp);
		            id += ch;
		            this.index += ch.length;
		            // '\u' (U+005C, U+0075) denotes an escaped character.
		            if (cp === 0x5C) {
		                id = id.substr(0, id.length - 1);
		                if (this.source.charCodeAt(this.index) !== 0x75) {
		                    this.throwUnexpectedToken();
		                }
		                ++this.index;
		                if (this.source[this.index] === '{') {
		                    ++this.index;
		                    ch = this.scanUnicodeCodePointEscape();
		                }
		                else {
		                    ch = this.scanHexEscape('u');
		                    if (ch === null || ch === '\\' || !character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
		                        this.throwUnexpectedToken();
		                    }
		                }
		                id += ch;
		            }
		        }
		        return id;
		    };
		    Scanner.prototype.octalToDecimal = function (ch) {
		        // \0 is not octal escape sequence
		        var octal = (ch !== '0');
		        var code = octalValue(ch);
		        if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
		            octal = true;
		            code = code * 8 + octalValue(this.source[this.index++]);
		            // 3 digits are only allowed when string starts
		            // with 0, 1, 2, 3
		            if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
		                code = code * 8 + octalValue(this.source[this.index++]);
		            }
		        }
		        return {
		            code: code,
		            octal: octal
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-names-and-keywords
		    Scanner.prototype.scanIdentifier = function () {
		        var type;
		        var start = this.index;
		        // Backslash (U+005C) starts an escaped character.
		        var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
		        // There is no keyword or literal with only one character.
		        // Thus, it must be an identifier.
		        if (id.length === 1) {
		            type = 3 /* Identifier */;
		        }
		        else if (this.isKeyword(id)) {
		            type = 4 /* Keyword */;
		        }
		        else if (id === 'null') {
		            type = 5 /* NullLiteral */;
		        }
		        else if (id === 'true' || id === 'false') {
		            type = 1 /* BooleanLiteral */;
		        }
		        else {
		            type = 3 /* Identifier */;
		        }
		        if (type !== 3 /* Identifier */ && (start + id.length !== this.index)) {
		            var restore = this.index;
		            this.index = start;
		            this.tolerateUnexpectedToken(messages_1.Messages.InvalidEscapedReservedWord);
		            this.index = restore;
		        }
		        return {
		            type: type,
		            value: id,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-punctuators
		    Scanner.prototype.scanPunctuator = function () {
		        var start = this.index;
		        // Check for most common single-character punctuators.
		        var str = this.source[this.index];
		        switch (str) {
		            case '(':
		            case '{':
		                if (str === '{') {
		                    this.curlyStack.push('{');
		                }
		                ++this.index;
		                break;
		            case '.':
		                ++this.index;
		                if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
		                    // Spread operator: ...
		                    this.index += 2;
		                    str = '...';
		                }
		                break;
		            case '}':
		                ++this.index;
		                this.curlyStack.pop();
		                break;
		            case ')':
		            case ';':
		            case ',':
		            case '[':
		            case ']':
		            case ':':
		            case '?':
		            case '~':
		                ++this.index;
		                break;
		            default:
		                // 4-character punctuator.
		                str = this.source.substr(this.index, 4);
		                if (str === '>>>=') {
		                    this.index += 4;
		                }
		                else {
		                    // 3-character punctuators.
		                    str = str.substr(0, 3);
		                    if (str === '===' || str === '!==' || str === '>>>' ||
		                        str === '<<=' || str === '>>=' || str === '**=') {
		                        this.index += 3;
		                    }
		                    else {
		                        // 2-character punctuators.
		                        str = str.substr(0, 2);
		                        if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
		                            str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
		                            str === '++' || str === '--' || str === '<<' || str === '>>' ||
		                            str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
		                            str === '<=' || str === '>=' || str === '=>' || str === '**') {
		                            this.index += 2;
		                        }
		                        else {
		                            // 1-character punctuators.
		                            str = this.source[this.index];
		                            if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
		                                ++this.index;
		                            }
		                        }
		                    }
		                }
		        }
		        if (this.index === start) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: 7 /* Punctuator */,
		            value: str,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
		    Scanner.prototype.scanHexLiteral = function (start) {
		        var num = '';
		        while (!this.eof()) {
		            if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
		                break;
		            }
		            num += this.source[this.index++];
		        }
		        if (num.length === 0) {
		            this.throwUnexpectedToken();
		        }
		        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: 6 /* NumericLiteral */,
		            value: parseInt('0x' + num, 16),
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    Scanner.prototype.scanBinaryLiteral = function (start) {
		        var num = '';
		        var ch;
		        while (!this.eof()) {
		            ch = this.source[this.index];
		            if (ch !== '0' && ch !== '1') {
		                break;
		            }
		            num += this.source[this.index++];
		        }
		        if (num.length === 0) {
		            // only 0b or 0B
		            this.throwUnexpectedToken();
		        }
		        if (!this.eof()) {
		            ch = this.source.charCodeAt(this.index);
		            /* istanbul ignore else */
		            if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
		                this.throwUnexpectedToken();
		            }
		        }
		        return {
		            type: 6 /* NumericLiteral */,
		            value: parseInt(num, 2),
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    Scanner.prototype.scanOctalLiteral = function (prefix, start) {
		        var num = '';
		        var octal = false;
		        if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
		            octal = true;
		            num = '0' + this.source[this.index++];
		        }
		        else {
		            ++this.index;
		        }
		        while (!this.eof()) {
		            if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
		                break;
		            }
		            num += this.source[this.index++];
		        }
		        if (!octal && num.length === 0) {
		            // only 0o or 0O
		            this.throwUnexpectedToken();
		        }
		        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: 6 /* NumericLiteral */,
		            value: parseInt(num, 8),
		            octal: octal,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    Scanner.prototype.isImplicitOctalLiteral = function () {
		        // Implicit octal, unless there is a non-octal digit.
		        // (Annex B.1.1 on Numeric Literals)
		        for (var i = this.index + 1; i < this.length; ++i) {
		            var ch = this.source[i];
		            if (ch === '8' || ch === '9') {
		                return false;
		            }
		            if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                return true;
		            }
		        }
		        return true;
		    };
		    Scanner.prototype.scanNumericLiteral = function () {
		        var start = this.index;
		        var ch = this.source[start];
		        assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
		        var num = '';
		        if (ch !== '.') {
		            num = this.source[this.index++];
		            ch = this.source[this.index];
		            // Hex number starts with '0x'.
		            // Octal number starts with '0'.
		            // Octal number in ES6 starts with '0o'.
		            // Binary number in ES6 starts with '0b'.
		            if (num === '0') {
		                if (ch === 'x' || ch === 'X') {
		                    ++this.index;
		                    return this.scanHexLiteral(start);
		                }
		                if (ch === 'b' || ch === 'B') {
		                    ++this.index;
		                    return this.scanBinaryLiteral(start);
		                }
		                if (ch === 'o' || ch === 'O') {
		                    return this.scanOctalLiteral(ch, start);
		                }
		                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                    if (this.isImplicitOctalLiteral()) {
		                        return this.scanOctalLiteral(ch, start);
		                    }
		                }
		            }
		            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                num += this.source[this.index++];
		            }
		            ch = this.source[this.index];
		        }
		        if (ch === '.') {
		            num += this.source[this.index++];
		            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                num += this.source[this.index++];
		            }
		            ch = this.source[this.index];
		        }
		        if (ch === 'e' || ch === 'E') {
		            num += this.source[this.index++];
		            ch = this.source[this.index];
		            if (ch === '+' || ch === '-') {
		                num += this.source[this.index++];
		            }
		            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                    num += this.source[this.index++];
		                }
		            }
		            else {
		                this.throwUnexpectedToken();
		            }
		        }
		        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: 6 /* NumericLiteral */,
		            value: parseFloat(num),
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-literals-string-literals
		    Scanner.prototype.scanStringLiteral = function () {
		        var start = this.index;
		        var quote = this.source[start];
		        assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
		        ++this.index;
		        var octal = false;
		        var str = '';
		        while (!this.eof()) {
		            var ch = this.source[this.index++];
		            if (ch === quote) {
		                quote = '';
		                break;
		            }
		            else if (ch === '\\') {
		                ch = this.source[this.index++];
		                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                    switch (ch) {
		                        case 'u':
		                            if (this.source[this.index] === '{') {
		                                ++this.index;
		                                str += this.scanUnicodeCodePointEscape();
		                            }
		                            else {
		                                var unescaped_1 = this.scanHexEscape(ch);
		                                if (unescaped_1 === null) {
		                                    this.throwUnexpectedToken();
		                                }
		                                str += unescaped_1;
		                            }
		                            break;
		                        case 'x':
		                            var unescaped = this.scanHexEscape(ch);
		                            if (unescaped === null) {
		                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
		                            }
		                            str += unescaped;
		                            break;
		                        case 'n':
		                            str += '\n';
		                            break;
		                        case 'r':
		                            str += '\r';
		                            break;
		                        case 't':
		                            str += '\t';
		                            break;
		                        case 'b':
		                            str += '\b';
		                            break;
		                        case 'f':
		                            str += '\f';
		                            break;
		                        case 'v':
		                            str += '\x0B';
		                            break;
		                        case '8':
		                        case '9':
		                            str += ch;
		                            this.tolerateUnexpectedToken();
		                            break;
		                        default:
		                            if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                                var octToDec = this.octalToDecimal(ch);
		                                octal = octToDec.octal || octal;
		                                str += String.fromCharCode(octToDec.code);
		                            }
		                            else {
		                                str += ch;
		                            }
		                            break;
		                    }
		                }
		                else {
		                    ++this.lineNumber;
		                    if (ch === '\r' && this.source[this.index] === '\n') {
		                        ++this.index;
		                    }
		                    this.lineStart = this.index;
		                }
		            }
		            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                break;
		            }
		            else {
		                str += ch;
		            }
		        }
		        if (quote !== '') {
		            this.index = start;
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: 8 /* StringLiteral */,
		            value: str,
		            octal: octal,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-template-literal-lexical-components
		    Scanner.prototype.scanTemplate = function () {
		        var cooked = '';
		        var terminated = false;
		        var start = this.index;
		        var head = (this.source[start] === '`');
		        var tail = false;
		        var rawOffset = 2;
		        ++this.index;
		        while (!this.eof()) {
		            var ch = this.source[this.index++];
		            if (ch === '`') {
		                rawOffset = 1;
		                tail = true;
		                terminated = true;
		                break;
		            }
		            else if (ch === '$') {
		                if (this.source[this.index] === '{') {
		                    this.curlyStack.push('${');
		                    ++this.index;
		                    terminated = true;
		                    break;
		                }
		                cooked += ch;
		            }
		            else if (ch === '\\') {
		                ch = this.source[this.index++];
		                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                    switch (ch) {
		                        case 'n':
		                            cooked += '\n';
		                            break;
		                        case 'r':
		                            cooked += '\r';
		                            break;
		                        case 't':
		                            cooked += '\t';
		                            break;
		                        case 'u':
		                            if (this.source[this.index] === '{') {
		                                ++this.index;
		                                cooked += this.scanUnicodeCodePointEscape();
		                            }
		                            else {
		                                var restore = this.index;
		                                var unescaped_2 = this.scanHexEscape(ch);
		                                if (unescaped_2 !== null) {
		                                    cooked += unescaped_2;
		                                }
		                                else {
		                                    this.index = restore;
		                                    cooked += ch;
		                                }
		                            }
		                            break;
		                        case 'x':
		                            var unescaped = this.scanHexEscape(ch);
		                            if (unescaped === null) {
		                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
		                            }
		                            cooked += unescaped;
		                            break;
		                        case 'b':
		                            cooked += '\b';
		                            break;
		                        case 'f':
		                            cooked += '\f';
		                            break;
		                        case 'v':
		                            cooked += '\v';
		                            break;
		                        default:
		                            if (ch === '0') {
		                                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                                    // Illegal: \01 \02 and so on
		                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
		                                }
		                                cooked += '\0';
		                            }
		                            else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                                // Illegal: \1 \2
		                                this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
		                            }
		                            else {
		                                cooked += ch;
		                            }
		                            break;
		                    }
		                }
		                else {
		                    ++this.lineNumber;
		                    if (ch === '\r' && this.source[this.index] === '\n') {
		                        ++this.index;
		                    }
		                    this.lineStart = this.index;
		                }
		            }
		            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                ++this.lineNumber;
		                if (ch === '\r' && this.source[this.index] === '\n') {
		                    ++this.index;
		                }
		                this.lineStart = this.index;
		                cooked += '\n';
		            }
		            else {
		                cooked += ch;
		            }
		        }
		        if (!terminated) {
		            this.throwUnexpectedToken();
		        }
		        if (!head) {
		            this.curlyStack.pop();
		        }
		        return {
		            type: 10 /* Template */,
		            value: this.source.slice(start + 1, this.index - rawOffset),
		            cooked: cooked,
		            head: head,
		            tail: tail,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
		    Scanner.prototype.testRegExp = function (pattern, flags) {
		        // The BMP character to use as a replacement for astral symbols when
		        // translating an ES6 "u"-flagged pattern to an ES5-compatible
		        // approximation.
		        // Note: replacing with '\uFFFF' enables false positives in unlikely
		        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
		        // pattern that would not be detected by this substitution.
		        var astralSubstitute = '\uFFFF';
		        var tmp = pattern;
		        var self = this;
		        if (flags.indexOf('u') >= 0) {
		            tmp = tmp
		                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
		                var codePoint = parseInt($1 || $2, 16);
		                if (codePoint > 0x10FFFF) {
		                    self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
		                }
		                if (codePoint <= 0xFFFF) {
		                    return String.fromCharCode(codePoint);
		                }
		                return astralSubstitute;
		            })
		                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
		        }
		        // First, detect invalid regular expressions.
		        try {
		            RegExp(tmp);
		        }
		        catch (e) {
		            this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
		        }
		        // Return a regular expression object for this pattern-flag pair, or
		        // `null` in case the current environment doesn't support the flags it
		        // uses.
		        try {
		            return new RegExp(pattern, flags);
		        }
		        catch (exception) {
		            /* istanbul ignore next */
		            return null;
		        }
		    };
		    Scanner.prototype.scanRegExpBody = function () {
		        var ch = this.source[this.index];
		        assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
		        var str = this.source[this.index++];
		        var classMarker = false;
		        var terminated = false;
		        while (!this.eof()) {
		            ch = this.source[this.index++];
		            str += ch;
		            if (ch === '\\') {
		                ch = this.source[this.index++];
		                // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
		                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
		                }
		                str += ch;
		            }
		            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
		            }
		            else if (classMarker) {
		                if (ch === ']') {
		                    classMarker = false;
		                }
		            }
		            else {
		                if (ch === '/') {
		                    terminated = true;
		                    break;
		                }
		                else if (ch === '[') {
		                    classMarker = true;
		                }
		            }
		        }
		        if (!terminated) {
		            this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
		        }
		        // Exclude leading and trailing slash.
		        return str.substr(1, str.length - 2);
		    };
		    Scanner.prototype.scanRegExpFlags = function () {
		        var str = '';
		        var flags = '';
		        while (!this.eof()) {
		            var ch = this.source[this.index];
		            if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
		                break;
		            }
		            ++this.index;
		            if (ch === '\\' && !this.eof()) {
		                ch = this.source[this.index];
		                if (ch === 'u') {
		                    ++this.index;
		                    var restore = this.index;
		                    var char = this.scanHexEscape('u');
		                    if (char !== null) {
		                        flags += char;
		                        for (str += '\\u'; restore < this.index; ++restore) {
		                            str += this.source[restore];
		                        }
		                    }
		                    else {
		                        this.index = restore;
		                        flags += 'u';
		                        str += '\\u';
		                    }
		                    this.tolerateUnexpectedToken();
		                }
		                else {
		                    str += '\\';
		                    this.tolerateUnexpectedToken();
		                }
		            }
		            else {
		                flags += ch;
		                str += ch;
		            }
		        }
		        return flags;
		    };
		    Scanner.prototype.scanRegExp = function () {
		        var start = this.index;
		        var pattern = this.scanRegExpBody();
		        var flags = this.scanRegExpFlags();
		        var value = this.testRegExp(pattern, flags);
		        return {
		            type: 9 /* RegularExpression */,
		            value: '',
		            pattern: pattern,
		            flags: flags,
		            regex: value,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    Scanner.prototype.lex = function () {
		        if (this.eof()) {
		            return {
		                type: 2 /* EOF */,
		                value: '',
		                lineNumber: this.lineNumber,
		                lineStart: this.lineStart,
		                start: this.index,
		                end: this.index
		            };
		        }
		        var cp = this.source.charCodeAt(this.index);
		        if (character_1.Character.isIdentifierStart(cp)) {
		            return this.scanIdentifier();
		        }
		        // Very common: ( and ) and ;
		        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
		            return this.scanPunctuator();
		        }
		        // String literal starts with single quote (U+0027) or double quote (U+0022).
		        if (cp === 0x27 || cp === 0x22) {
		            return this.scanStringLiteral();
		        }
		        // Dot (.) U+002E can also start a floating-point number, hence the need
		        // to check the next character.
		        if (cp === 0x2E) {
		            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
		                return this.scanNumericLiteral();
		            }
		            return this.scanPunctuator();
		        }
		        if (character_1.Character.isDecimalDigit(cp)) {
		            return this.scanNumericLiteral();
		        }
		        // Template literals start with ` (U+0060) for template head
		        // or } (U+007D) for template middle or template tail.
		        if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
		            return this.scanTemplate();
		        }
		        // Possible identifier start in a surrogate pair.
		        if (cp >= 0xD800 && cp < 0xDFFF) {
		            if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
		                return this.scanIdentifier();
		            }
		        }
		        return this.scanPunctuator();
		    };
		    return Scanner;
		}());
		exports.Scanner = Scanner;


	/***/ },
	/* 13 */
	/***/ function(module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.TokenName = {};
		exports.TokenName[1 /* BooleanLiteral */] = 'Boolean';
		exports.TokenName[2 /* EOF */] = '<end>';
		exports.TokenName[3 /* Identifier */] = 'Identifier';
		exports.TokenName[4 /* Keyword */] = 'Keyword';
		exports.TokenName[5 /* NullLiteral */] = 'Null';
		exports.TokenName[6 /* NumericLiteral */] = 'Numeric';
		exports.TokenName[7 /* Punctuator */] = 'Punctuator';
		exports.TokenName[8 /* StringLiteral */] = 'String';
		exports.TokenName[9 /* RegularExpression */] = 'RegularExpression';
		exports.TokenName[10 /* Template */] = 'Template';


	/***/ },
	/* 14 */
	/***/ function(module, exports) {
		// Generated by generate-xhtml-entities.js. DO NOT MODIFY!
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.XHTMLEntities = {
		    quot: '\u0022',
		    amp: '\u0026',
		    apos: '\u0027',
		    gt: '\u003E',
		    nbsp: '\u00A0',
		    iexcl: '\u00A1',
		    cent: '\u00A2',
		    pound: '\u00A3',
		    curren: '\u00A4',
		    yen: '\u00A5',
		    brvbar: '\u00A6',
		    sect: '\u00A7',
		    uml: '\u00A8',
		    copy: '\u00A9',
		    ordf: '\u00AA',
		    laquo: '\u00AB',
		    not: '\u00AC',
		    shy: '\u00AD',
		    reg: '\u00AE',
		    macr: '\u00AF',
		    deg: '\u00B0',
		    plusmn: '\u00B1',
		    sup2: '\u00B2',
		    sup3: '\u00B3',
		    acute: '\u00B4',
		    micro: '\u00B5',
		    para: '\u00B6',
		    middot: '\u00B7',
		    cedil: '\u00B8',
		    sup1: '\u00B9',
		    ordm: '\u00BA',
		    raquo: '\u00BB',
		    frac14: '\u00BC',
		    frac12: '\u00BD',
		    frac34: '\u00BE',
		    iquest: '\u00BF',
		    Agrave: '\u00C0',
		    Aacute: '\u00C1',
		    Acirc: '\u00C2',
		    Atilde: '\u00C3',
		    Auml: '\u00C4',
		    Aring: '\u00C5',
		    AElig: '\u00C6',
		    Ccedil: '\u00C7',
		    Egrave: '\u00C8',
		    Eacute: '\u00C9',
		    Ecirc: '\u00CA',
		    Euml: '\u00CB',
		    Igrave: '\u00CC',
		    Iacute: '\u00CD',
		    Icirc: '\u00CE',
		    Iuml: '\u00CF',
		    ETH: '\u00D0',
		    Ntilde: '\u00D1',
		    Ograve: '\u00D2',
		    Oacute: '\u00D3',
		    Ocirc: '\u00D4',
		    Otilde: '\u00D5',
		    Ouml: '\u00D6',
		    times: '\u00D7',
		    Oslash: '\u00D8',
		    Ugrave: '\u00D9',
		    Uacute: '\u00DA',
		    Ucirc: '\u00DB',
		    Uuml: '\u00DC',
		    Yacute: '\u00DD',
		    THORN: '\u00DE',
		    szlig: '\u00DF',
		    agrave: '\u00E0',
		    aacute: '\u00E1',
		    acirc: '\u00E2',
		    atilde: '\u00E3',
		    auml: '\u00E4',
		    aring: '\u00E5',
		    aelig: '\u00E6',
		    ccedil: '\u00E7',
		    egrave: '\u00E8',
		    eacute: '\u00E9',
		    ecirc: '\u00EA',
		    euml: '\u00EB',
		    igrave: '\u00EC',
		    iacute: '\u00ED',
		    icirc: '\u00EE',
		    iuml: '\u00EF',
		    eth: '\u00F0',
		    ntilde: '\u00F1',
		    ograve: '\u00F2',
		    oacute: '\u00F3',
		    ocirc: '\u00F4',
		    otilde: '\u00F5',
		    ouml: '\u00F6',
		    divide: '\u00F7',
		    oslash: '\u00F8',
		    ugrave: '\u00F9',
		    uacute: '\u00FA',
		    ucirc: '\u00FB',
		    uuml: '\u00FC',
		    yacute: '\u00FD',
		    thorn: '\u00FE',
		    yuml: '\u00FF',
		    OElig: '\u0152',
		    oelig: '\u0153',
		    Scaron: '\u0160',
		    scaron: '\u0161',
		    Yuml: '\u0178',
		    fnof: '\u0192',
		    circ: '\u02C6',
		    tilde: '\u02DC',
		    Alpha: '\u0391',
		    Beta: '\u0392',
		    Gamma: '\u0393',
		    Delta: '\u0394',
		    Epsilon: '\u0395',
		    Zeta: '\u0396',
		    Eta: '\u0397',
		    Theta: '\u0398',
		    Iota: '\u0399',
		    Kappa: '\u039A',
		    Lambda: '\u039B',
		    Mu: '\u039C',
		    Nu: '\u039D',
		    Xi: '\u039E',
		    Omicron: '\u039F',
		    Pi: '\u03A0',
		    Rho: '\u03A1',
		    Sigma: '\u03A3',
		    Tau: '\u03A4',
		    Upsilon: '\u03A5',
		    Phi: '\u03A6',
		    Chi: '\u03A7',
		    Psi: '\u03A8',
		    Omega: '\u03A9',
		    alpha: '\u03B1',
		    beta: '\u03B2',
		    gamma: '\u03B3',
		    delta: '\u03B4',
		    epsilon: '\u03B5',
		    zeta: '\u03B6',
		    eta: '\u03B7',
		    theta: '\u03B8',
		    iota: '\u03B9',
		    kappa: '\u03BA',
		    lambda: '\u03BB',
		    mu: '\u03BC',
		    nu: '\u03BD',
		    xi: '\u03BE',
		    omicron: '\u03BF',
		    pi: '\u03C0',
		    rho: '\u03C1',
		    sigmaf: '\u03C2',
		    sigma: '\u03C3',
		    tau: '\u03C4',
		    upsilon: '\u03C5',
		    phi: '\u03C6',
		    chi: '\u03C7',
		    psi: '\u03C8',
		    omega: '\u03C9',
		    thetasym: '\u03D1',
		    upsih: '\u03D2',
		    piv: '\u03D6',
		    ensp: '\u2002',
		    emsp: '\u2003',
		    thinsp: '\u2009',
		    zwnj: '\u200C',
		    zwj: '\u200D',
		    lrm: '\u200E',
		    rlm: '\u200F',
		    ndash: '\u2013',
		    mdash: '\u2014',
		    lsquo: '\u2018',
		    rsquo: '\u2019',
		    sbquo: '\u201A',
		    ldquo: '\u201C',
		    rdquo: '\u201D',
		    bdquo: '\u201E',
		    dagger: '\u2020',
		    Dagger: '\u2021',
		    bull: '\u2022',
		    hellip: '\u2026',
		    permil: '\u2030',
		    prime: '\u2032',
		    Prime: '\u2033',
		    lsaquo: '\u2039',
		    rsaquo: '\u203A',
		    oline: '\u203E',
		    frasl: '\u2044',
		    euro: '\u20AC',
		    image: '\u2111',
		    weierp: '\u2118',
		    real: '\u211C',
		    trade: '\u2122',
		    alefsym: '\u2135',
		    larr: '\u2190',
		    uarr: '\u2191',
		    rarr: '\u2192',
		    darr: '\u2193',
		    harr: '\u2194',
		    crarr: '\u21B5',
		    lArr: '\u21D0',
		    uArr: '\u21D1',
		    rArr: '\u21D2',
		    dArr: '\u21D3',
		    hArr: '\u21D4',
		    forall: '\u2200',
		    part: '\u2202',
		    exist: '\u2203',
		    empty: '\u2205',
		    nabla: '\u2207',
		    isin: '\u2208',
		    notin: '\u2209',
		    ni: '\u220B',
		    prod: '\u220F',
		    sum: '\u2211',
		    minus: '\u2212',
		    lowast: '\u2217',
		    radic: '\u221A',
		    prop: '\u221D',
		    infin: '\u221E',
		    ang: '\u2220',
		    and: '\u2227',
		    or: '\u2228',
		    cap: '\u2229',
		    cup: '\u222A',
		    int: '\u222B',
		    there4: '\u2234',
		    sim: '\u223C',
		    cong: '\u2245',
		    asymp: '\u2248',
		    ne: '\u2260',
		    equiv: '\u2261',
		    le: '\u2264',
		    ge: '\u2265',
		    sub: '\u2282',
		    sup: '\u2283',
		    nsub: '\u2284',
		    sube: '\u2286',
		    supe: '\u2287',
		    oplus: '\u2295',
		    otimes: '\u2297',
		    perp: '\u22A5',
		    sdot: '\u22C5',
		    lceil: '\u2308',
		    rceil: '\u2309',
		    lfloor: '\u230A',
		    rfloor: '\u230B',
		    loz: '\u25CA',
		    spades: '\u2660',
		    clubs: '\u2663',
		    hearts: '\u2665',
		    diams: '\u2666',
		    lang: '\u27E8',
		    rang: '\u27E9'
		};


	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
		Object.defineProperty(exports, "__esModule", { value: true });
		var error_handler_1 = __webpack_require__(10);
		var scanner_1 = __webpack_require__(12);
		var token_1 = __webpack_require__(13);
		var Reader = (function () {
		    function Reader() {
		        this.values = [];
		        this.curly = this.paren = -1;
		    }
		    // A function following one of those tokens is an expression.
		    Reader.prototype.beforeFunctionExpression = function (t) {
		        return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
		            'return', 'case', 'delete', 'throw', 'void',
		            // assignment operators
		            '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
		            '&=', '|=', '^=', ',',
		            // binary/unary operators
		            '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
		            '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
		            '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
		    };
		    // Determine if forward slash (/) is an operator or part of a regular expression
		    // https://github.com/mozilla/sweet.js/wiki/design
		    Reader.prototype.isRegexStart = function () {
		        var previous = this.values[this.values.length - 1];
		        var regex = (previous !== null);
		        switch (previous) {
		            case 'this':
		            case ']':
		                regex = false;
		                break;
		            case ')':
		                var keyword = this.values[this.paren - 1];
		                regex = (keyword === 'if' || keyword === 'while' || keyword === 'for' || keyword === 'with');
		                break;
		            case '}':
		                // Dividing a function by anything makes little sense,
		                // but we have to check for that.
		                regex = false;
		                if (this.values[this.curly - 3] === 'function') {
		                    // Anonymous function, e.g. function(){} /42
		                    var check = this.values[this.curly - 4];
		                    regex = check ? !this.beforeFunctionExpression(check) : false;
		                }
		                else if (this.values[this.curly - 4] === 'function') {
		                    // Named function, e.g. function f(){} /42/
		                    var check = this.values[this.curly - 5];
		                    regex = check ? !this.beforeFunctionExpression(check) : true;
		                }
		                break;
		        }
		        return regex;
		    };
		    Reader.prototype.push = function (token) {
		        if (token.type === 7 /* Punctuator */ || token.type === 4 /* Keyword */) {
		            if (token.value === '{') {
		                this.curly = this.values.length;
		            }
		            else if (token.value === '(') {
		                this.paren = this.values.length;
		            }
		            this.values.push(token.value);
		        }
		        else {
		            this.values.push(null);
		        }
		    };
		    return Reader;
		}());
		var Tokenizer = (function () {
		    function Tokenizer(code, config) {
		        this.errorHandler = new error_handler_1.ErrorHandler();
		        this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
		        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
		        this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
		        this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
		        this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
		        this.buffer = [];
		        this.reader = new Reader();
		    }
		    Tokenizer.prototype.errors = function () {
		        return this.errorHandler.errors;
		    };
		    Tokenizer.prototype.getNextToken = function () {
		        if (this.buffer.length === 0) {
		            var comments = this.scanner.scanComments();
		            if (this.scanner.trackComment) {
		                for (var i = 0; i < comments.length; ++i) {
		                    var e = comments[i];
		                    var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
		                    var comment = {
		                        type: e.multiLine ? 'BlockComment' : 'LineComment',
		                        value: value
		                    };
		                    if (this.trackRange) {
		                        comment.range = e.range;
		                    }
		                    if (this.trackLoc) {
		                        comment.loc = e.loc;
		                    }
		                    this.buffer.push(comment);
		                }
		            }
		            if (!this.scanner.eof()) {
		                var loc = void 0;
		                if (this.trackLoc) {
		                    loc = {
		                        start: {
		                            line: this.scanner.lineNumber,
		                            column: this.scanner.index - this.scanner.lineStart
		                        },
		                        end: {}
		                    };
		                }
		                var startRegex = (this.scanner.source[this.scanner.index] === '/') && this.reader.isRegexStart();
		                var token = startRegex ? this.scanner.scanRegExp() : this.scanner.lex();
		                this.reader.push(token);
		                var entry = {
		                    type: token_1.TokenName[token.type],
		                    value: this.scanner.source.slice(token.start, token.end)
		                };
		                if (this.trackRange) {
		                    entry.range = [token.start, token.end];
		                }
		                if (this.trackLoc) {
		                    loc.end = {
		                        line: this.scanner.lineNumber,
		                        column: this.scanner.index - this.scanner.lineStart
		                    };
		                    entry.loc = loc;
		                }
		                if (token.type === 9 /* RegularExpression */) {
		                    var pattern = token.pattern;
		                    var flags = token.flags;
		                    entry.regex = { pattern: pattern, flags: flags };
		                }
		                this.buffer.push(entry);
		            }
		        }
		        return this.buffer.shift();
		    };
		    return Tokenizer;
		}());
		exports.Tokenizer = Tokenizer;


	/***/ }
	/******/ ])
	});
} (esprima$1));

var util = {};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray$3(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
util.isArray = isArray$3;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
util.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
util.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
util.isNullOrUndefined = isNullOrUndefined;

function isNumber$2(arg) {
  return typeof arg === 'number';
}
util.isNumber = isNumber$2;

function isString$2(arg) {
  return typeof arg === 'string';
}
util.isString = isString$2;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
util.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
util.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
util.isRegExp = isRegExp;

function isObject$3(arg) {
  return typeof arg === 'object' && arg !== null;
}
util.isObject = isObject$3;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
util.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
util.isError = isError;

function isFunction$1(arg) {
  return typeof arg === 'function';
}
util.isFunction = isFunction$1;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
util.isPrimitive = isPrimitive;

util.isBuffer = require$$0__default$2.default.Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/**
 * Default minimum size of a run.
 */

const DEFAULT_MIN_MERGE = 32;

/**
 * Minimum ordered subsequece required to do galloping.
 */
const DEFAULT_MIN_GALLOPING = 7;

/**
 * Default tmp storage length. Can increase depending on the size of the
 * smallest run to merge.
 */
const DEFAULT_TMP_STORAGE_LENGTH = 256;

/**
 * Pre-computed powers of 10 for efficient lexicographic comparison of
 * small integers.
 */
const POWERS_OF_TEN = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];

let results;

/**
 * Estimate the logarithm base 10 of a small integer.
 *
 * @param {number} x - The integer to estimate the logarithm of.
 * @return {number} - The estimated logarithm of the integer.
 */
const log10 = x => x < 1e5
  ? x < 1e2
    ? x < 1e1
      ? 0
      : 1
    : x < 1e4
      ? x < 1e3
        ? 2
        : 3
      : 4
  : x < 1e7
    ? x < 1e6
      ? 5
      : 6
    : x < 1e9
      ? x < 1e8
        ? 7
        : 8
      : 9;

/**
 * Default alphabetical comparison of items.
 *
 * @param {string|object|number} a - First element to compare.
 * @param {string|object|number} b - Second element to compare.
 * @return {number} - A positive number if a.toString() > b.toString(), a
 * negative number if .toString() < b.toString(), 0 otherwise.
 */
function alphabeticalCompare (a, b) {
  if (a === b) {
    return 0
  }

  if (~ ~ a === a && ~ ~ b === b) {
    if (a === 0 || b === 0) {
      return a < b ? - 1 : 1
    }

    if (a < 0 || b < 0) {
      if (b >= 0) {
        return - 1
      }

      if (a >= 0) {
        return 1
      }

      a = - a;
      b = - b;
    }

    const al = log10(a);
    const bl = log10(b);

    let t = 0;

    if (al < bl) {
      a *= POWERS_OF_TEN[bl - al - 1];
      b /= 10;
      t = - 1;
    } else if (al > bl) {
      b *= POWERS_OF_TEN[al - bl - 1];
      a /= 10;
      t = 1;
    }

    if (a === b) {
      return t
    }

    return a < b ? - 1 : 1
  }

  const aStr = String(a);
  const bStr = String(b);

  if (aStr === bStr) {
    return 0
  }

  return aStr < bStr ? - 1 : 1
}

/**
 * Compute minimum run length for TimSort
 *
 * @param {number} n - The size of the array to sort.
 */
function minRunLength (n) {
  let r = 0;

  while (n >= DEFAULT_MIN_MERGE) {
    r |= (n & 1);
    n >>= 1;
  }

  return n + r
}

/**
 * Counts the length of a monotonically ascending or strictly monotonically
 * descending sequence (run) starting at array[lo] in the range [lo, hi). If
 * the run is descending it is made ascending.
 *
 * @param {array} array - The array to reverse.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 * @param {function} compare - Item comparison function.
 * @return {number} - The length of the run.
 */
function makeAscendingRun (array, lo, hi, compare) {
  let runHi = lo + 1;

  if (runHi === hi) {
    return 1
  }

  // Descending
  if (compare(array[runHi ++], array[lo]) < 0) {
    while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
      runHi ++;
    }

    reverseRun(array, lo, runHi);
    reverseRun(results, lo, runHi);
    // Ascending
  } else {
    while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
      runHi ++;
    }
  }

  return runHi - lo
}

/**
 * Reverse an array in the range [lo, hi).
 *
 * @param {array} array - The array to reverse.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 */
function reverseRun (array, lo, hi) {
  hi --;

  while (lo < hi) {
    const t = array[lo];
    array[lo ++] = array[hi];
    array[hi --] = t;
  }
}

/**
 * Perform the binary sort of the array in the range [lo, hi) where start is
 * the first element possibly out of order.
 *
 * @param {array} array - The array to sort.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 * @param {number} start - First element possibly out of order.
 * @param {function} compare - Item comparison function.
 */
function binaryInsertionSort (array, lo, hi, start, compare) {
  if (start === lo) {
    start ++;
  }

  for (; start < hi; start ++) {
    const pivot = array[start];
    const pivotIndex = results[start];

    // Ranges of the array where pivot belongs
    let left = lo;
    let right = start;

    /*
     *   pivot >= array[i] for i in [lo, left)
     *   pivot <  array[i] for i in  in [right, start)
     */
    while (left < right) {
      const mid = (left + right) >>> 1;

      if (compare(pivot, array[mid]) < 0) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    /*
     * Move elements right to make room for the pivot. If there are elements
     * equal to pivot, left points to the first slot after them: this is also
     * a reason for which TimSort is stable
     */
    let n = start - left;
    // Switch is just an optimization for small arrays
    switch (n) {
    case 3:
      array[left + 3] = array[left + 2];
      results[left + 3] = results[left + 2];
      /* falls through */
    case 2:
      array[left + 2] = array[left + 1];
      results[left + 2] = results[left + 1];
      /* falls through */
    case 1:
      array[left + 1] = array[left];
      results[left + 1] = results[left];
      break
    default:
      while (n > 0) {
        array[left + n] = array[left + n - 1];
        results[left + n] = results[left + n - 1];
        n --;
      }
    }

    array[left] = pivot;
    results[left] = pivotIndex;
  }
}

/**
 * Find the position at which to insert a value in a sorted range. If the range
 * contains elements equal to the value the leftmost element index is returned
 * (for stability).
 *
 * @param {number} value - Value to insert.
 * @param {array} array - The array in which to insert value.
 * @param {number} start - First element in the range.
 * @param {number} length - Length of the range.
 * @param {number} hint - The index at which to begin the search.
 * @param {function} compare - Item comparison function.
 * @return {number} - The index where to insert value.
 */
function gallopLeft (value, array, start, length, hint, compare) {
  let lastOffset = 0;
  let maxOffset = 0;
  let offset = 1;

  if (compare(value, array[start + hint]) > 0) {
    maxOffset = length - hint;

    while (
      offset < maxOffset
      && compare(value, array[start + hint + offset]) > 0
    ) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    }

    // Make offsets relative to start
    lastOffset += hint;
    offset += hint;

    // value <= array[start + hint]
  } else {
    maxOffset = hint + 1;
    while (
      offset < maxOffset
      && compare(value, array[start + hint - offset]) <= 0
    ) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }

    // Make offsets relative to start
    const tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp;
  }

  /*
   * Now array[start+lastOffset] < value <= array[start+offset], so value
   * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
   * binary search, with invariant array[start + lastOffset - 1] < value <=
   * array[start + offset].
   */
  lastOffset ++;
  while (lastOffset < offset) {
    const m = lastOffset + ((offset - lastOffset) >>> 1);

    if (compare(value, array[start + m]) > 0) {
      lastOffset = m + 1;
    } else {
      offset = m;
    }
  }
  return offset
}

/**
 * Find the position at which to insert a value in a sorted range. If the range
 * contains elements equal to the value the rightmost element index is returned
 * (for stability).
 *
 * @param {number} value - Value to insert.
 * @param {array} array - The array in which to insert value.
 * @param {number} start - First element in the range.
 * @param {number} length - Length of the range.
 * @param {number} hint - The index at which to begin the search.
 * @param {function} compare - Item comparison function.
 * @return {number} - The index where to insert value.
 */
function gallopRight (value, array, start, length, hint, compare) {
  let lastOffset = 0;
  let maxOffset = 0;
  let offset = 1;

  if (compare(value, array[start + hint]) < 0) {
    maxOffset = hint + 1;

    while (
      offset < maxOffset
      && compare(value, array[start + hint - offset]) < 0
    ) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    }

    // Make offsets relative to start
    const tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp;

    // value >= array[start + hint]
  } else {
    maxOffset = length - hint;

    while (
      offset < maxOffset
      && compare(value, array[start + hint + offset]) >= 0
    ) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    }

    // Make offsets relative to start
    lastOffset += hint;
    offset += hint;
  }

  /*
   * Now array[start+lastOffset] < value <= array[start+offset], so value
   * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
   * binary search, with invariant array[start + lastOffset - 1] < value <=
   * array[start + offset].
   */
  lastOffset ++;

  while (lastOffset < offset) {
    const m = lastOffset + ((offset - lastOffset) >>> 1);

    if (compare(value, array[start + m]) < 0) {
      offset = m;
    } else {
      lastOffset = m + 1;
    }
  }

  return offset
}

class TimSort {
  constructor (array, compare) {
    this.array = array;
    this.compare = compare;

    const {length} = array;

    this.length = length;
    this.minGallop = DEFAULT_MIN_GALLOPING;

    this.tmpStorageLength = length < 2 * DEFAULT_TMP_STORAGE_LENGTH
      ? length >>> 1
      : DEFAULT_TMP_STORAGE_LENGTH;

    this.tmp = new Array(this.tmpStorageLength);
    this.tmpIndex = new Array(this.tmpStorageLength);

    this.stackLength = length < 120
      ? 5
      : length < 1542
        ? 10
        : length < 119151
          ? 19
          : 40;

    this.runStart = new Array(this.stackLength);
    this.runLength = new Array(this.stackLength);

    this.stackSize = 0;
  }

  /**
   * Push a new run on TimSort's stack.
   *
   * @param {number} runStart - Start index of the run in the original array.
   * @param {number} runLength - Length of the run;
   */
  pushRun (runStart, runLength) {
    this.runStart[this.stackSize] = runStart;
    this.runLength[this.stackSize] = runLength;
    this.stackSize += 1;
  }

  /**
   * Merge runs on TimSort's stack so that the following holds for all i:
   * 1) runLength[i - 3] > runLength[i - 2] + runLength[i - 1]
   * 2) runLength[i - 2] > runLength[i - 1]
   */
  mergeRuns () {
    while (this.stackSize > 1) {
      let n = this.stackSize - 2;

      if (
        (
          n >= 1
          && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1]
        )
        || (
          n >= 2
          && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1]
        )
      ) {
        if (this.runLength[n - 1] < this.runLength[n + 1]) {
          n --;
        }
      } else if (this.runLength[n] > this.runLength[n + 1]) {
        break
      }
      this.mergeAt(n);
    }
  }

  /**
   * Merge all runs on TimSort's stack until only one remains.
   */
  forceMergeRuns () {
    while (this.stackSize > 1) {
      let n = this.stackSize - 2;

      if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
        n --;
      }

      this.mergeAt(n);
    }
  }

  /**
   * Merge the runs on the stack at positions i and i+1. Must be always be called
   * with i=stackSize-2 or i=stackSize-3 (that is, we merge on top of the stack).
   *
   * @param {number} i - Index of the run to merge in TimSort's stack.
   */
  mergeAt (i) {
    const {compare} = this;
    const {array} = this;

    let start1 = this.runStart[i];
    let length1 = this.runLength[i];
    const start2 = this.runStart[i + 1];
    let length2 = this.runLength[i + 1];

    this.runLength[i] = length1 + length2;

    if (i === this.stackSize - 3) {
      this.runStart[i + 1] = this.runStart[i + 2];
      this.runLength[i + 1] = this.runLength[i + 2];
    }

    this.stackSize --;

    /*
     * Find where the first element in the second run goes in run1. Previous
     * elements in run1 are already in place
     */
    const k = gallopRight(array[start2], array, start1, length1, 0, compare);
    start1 += k;
    length1 -= k;

    if (length1 === 0) {
      return
    }

    /*
     * Find where the last element in the first run goes in run2. Next elements
     * in run2 are already in place
     */
    length2 = gallopLeft(
      array[start1 + length1 - 1],
      array,
      start2,
      length2,
      length2 - 1,
      compare
    );

    if (length2 === 0) {
      return
    }

    /*
     * Merge remaining runs. A tmp array with length = min(length1, length2) is
     * used
     */
    if (length1 <= length2) {
      this.mergeLow(start1, length1, start2, length2);
    } else {
      this.mergeHigh(start1, length1, start2, length2);
    }
  }

  /**
   * Merge two adjacent runs in a stable way. The runs must be such that the
   * first element of run1 is bigger than the first element in run2 and the
   * last element of run1 is greater than all the elements in run2.
   * The method should be called when run1.length <= run2.length as it uses
   * TimSort temporary array to store run1. Use mergeHigh if run1.length >
   * run2.length.
   *
   * @param {number} start1 - First element in run1.
   * @param {number} length1 - Length of run1.
   * @param {number} start2 - First element in run2.
   * @param {number} length2 - Length of run2.
   */
  mergeLow (start1, length1, start2, length2) {
    const {compare} = this;
    const {array} = this;
    const {tmp} = this;
    const {tmpIndex} = this;
    let i = 0;

    for (i = 0; i < length1; i ++) {
      tmp[i] = array[start1 + i];
      tmpIndex[i] = results[start1 + i];
    }

    let cursor1 = 0;
    let cursor2 = start2;
    let dest = start1;

    array[dest] = array[cursor2];
    results[dest] = results[cursor2];

    dest ++;
    cursor2 ++;

    if (-- length2 === 0) {
      for (i = 0; i < length1; i ++) {
        array[dest + i] = tmp[cursor1 + i];
        results[dest + i] = tmpIndex[cursor1 + i];
      }
      return
    }

    if (length1 === 1) {
      for (i = 0; i < length2; i ++) {
        array[dest + i] = array[cursor2 + i];
        results[dest + i] = results[cursor2 + i];
      }
      array[dest + length2] = tmp[cursor1];
      results[dest + length2] = tmpIndex[cursor1];
      return
    }

    let {minGallop} = this;

    while (true) {
      let count1 = 0;
      let count2 = 0;
      let exit = false;

      do {
        if (compare(array[cursor2], tmp[cursor1]) < 0) {
          array[dest] = array[cursor2];
          results[dest] = results[cursor2];
          dest ++;
          cursor2 ++;
          count2 ++;
          count1 = 0;

          if (-- length2 === 0) {
            exit = true;
            break
          }
        } else {
          array[dest] = tmp[cursor1];
          results[dest] = tmpIndex[cursor1];
          dest ++;
          cursor1 ++;
          count1 ++;
          count2 = 0;
          if (-- length1 === 1) {
            exit = true;
            break
          }
        }
      } while ((count1 | count2) < minGallop)

      if (exit) {
        break
      }

      do {
        count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);

        if (count1 !== 0) {
          for (i = 0; i < count1; i ++) {
            array[dest + i] = tmp[cursor1 + i];
            results[dest + i] = tmpIndex[cursor1 + i];
          }

          dest += count1;
          cursor1 += count1;
          length1 -= count1;
          if (length1 <= 1) {
            exit = true;
            break
          }
        }

        array[dest] = array[cursor2];
        results[dest] = results[cursor2];

        dest ++;
        cursor2 ++;

        if (-- length2 === 0) {
          exit = true;
          break
        }

        count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);

        if (count2 !== 0) {
          for (i = 0; i < count2; i ++) {
            array[dest + i] = array[cursor2 + i];
            results[dest + i] = results[cursor2 + i];
          }

          dest += count2;
          cursor2 += count2;
          length2 -= count2;

          if (length2 === 0) {
            exit = true;
            break
          }
        }
        array[dest] = tmp[cursor1];
        results[dest] = tmpIndex[cursor1];
        dest ++;
        cursor1 ++;

        if (-- length1 === 1) {
          exit = true;
          break
        }

        minGallop --;
      } while (
        count1 >= DEFAULT_MIN_GALLOPING
        || count2 >= DEFAULT_MIN_GALLOPING
      )

      if (exit) {
        break
      }

      if (minGallop < 0) {
        minGallop = 0;
      }

      minGallop += 2;
    }

    this.minGallop = minGallop;

    if (minGallop < 1) {
      this.minGallop = 1;
    }

    if (length1 === 1) {
      for (i = 0; i < length2; i ++) {
        array[dest + i] = array[cursor2 + i];
        results[dest + i] = results[cursor2 + i];
      }
      array[dest + length2] = tmp[cursor1];
      results[dest + length2] = tmpIndex[cursor1];
    } else if (length1 === 0) {
      throw new Error('mergeLow preconditions were not respected')
    } else {
      for (i = 0; i < length1; i ++) {
        array[dest + i] = tmp[cursor1 + i];
        results[dest + i] = tmpIndex[cursor1 + i];
      }
    }
  }

  /**
   * Merge two adjacent runs in a stable way. The runs must be such that the
   * first element of run1 is bigger than the first element in run2 and the
   * last element of run1 is greater than all the elements in run2.
   * The method should be called when run1.length > run2.length as it uses
   * TimSort temporary array to store run2. Use mergeLow if run1.length <=
   * run2.length.
   *
   * @param {number} start1 - First element in run1.
   * @param {number} length1 - Length of run1.
   * @param {number} start2 - First element in run2.
   * @param {number} length2 - Length of run2.
   */
  mergeHigh (start1, length1, start2, length2) {
    const {compare} = this;
    const {array} = this;
    const {tmp} = this;
    const {tmpIndex} = this;
    let i = 0;

    for (i = 0; i < length2; i ++) {
      tmp[i] = array[start2 + i];
      tmpIndex[i] = results[start2 + i];
    }

    let cursor1 = start1 + length1 - 1;
    let cursor2 = length2 - 1;
    let dest = start2 + length2 - 1;
    let customCursor = 0;
    let customDest = 0;

    array[dest] = array[cursor1];
    results[dest] = results[cursor1];

    dest --;
    cursor1 --;

    if (-- length1 === 0) {
      customCursor = dest - (length2 - 1);

      for (i = 0; i < length2; i ++) {
        array[customCursor + i] = tmp[i];
        results[customCursor + i] = tmpIndex[i];
      }

      return
    }

    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;

      for (i = length1 - 1; i >= 0; i --) {
        array[customDest + i] = array[customCursor + i];
        results[customDest + i] = results[customCursor + i];
      }

      array[dest] = tmp[cursor2];
      results[dest] = tmpIndex[cursor2];
      return
    }

    let {minGallop} = this;

    while (true) {
      let count1 = 0;
      let count2 = 0;
      let exit = false;

      do {
        if (compare(tmp[cursor2], array[cursor1]) < 0) {
          array[dest] = array[cursor1];
          results[dest] = results[cursor1];
          dest --;
          cursor1 --;
          count1 ++;
          count2 = 0;
          if (-- length1 === 0) {
            exit = true;
            break
          }
        } else {
          array[dest] = tmp[cursor2];
          results[dest] = tmpIndex[cursor2];
          dest --;
          cursor2 --;
          count2 ++;
          count1 = 0;
          if (-- length2 === 1) {
            exit = true;
            break
          }
        }
      } while ((count1 | count2) < minGallop)

      if (exit) {
        break
      }

      do {
        count1 = length1 - gallopRight(
          tmp[cursor2],
          array,
          start1,
          length1,
          length1 - 1,
          compare
        );

        if (count1 !== 0) {
          dest -= count1;
          cursor1 -= count1;
          length1 -= count1;
          customDest = dest + 1;
          customCursor = cursor1 + 1;

          for (i = count1 - 1; i >= 0; i --) {
            array[customDest + i] = array[customCursor + i];
            results[customDest + i] = results[customCursor + i];
          }

          if (length1 === 0) {
            exit = true;
            break
          }
        }

        array[dest] = tmp[cursor2];
        results[dest] = tmpIndex[cursor2];
        dest --;
        cursor2 --;

        if (-- length2 === 1) {
          exit = true;
          break
        }

        count2 = length2 - gallopLeft(
          array[cursor1],
          tmp,
          0,
          length2,
          length2 - 1,
          compare
        );

        if (count2 !== 0) {
          dest -= count2;
          cursor2 -= count2;
          length2 -= count2;
          customDest = dest + 1;
          customCursor = cursor2 + 1;

          for (i = 0; i < count2; i ++) {
            array[customDest + i] = tmp[customCursor + i];
            results[customDest + i] = tmpIndex[customCursor + i];
          }

          if (length2 <= 1) {
            exit = true;
            break
          }
        }

        array[dest] = array[cursor1];
        results[dest] = results[cursor1];
        dest --;
        cursor1 --;

        if (-- length1 === 0) {
          exit = true;
          break
        }

        minGallop --;
      } while (
        count1 >= DEFAULT_MIN_GALLOPING
        || count2 >= DEFAULT_MIN_GALLOPING
      )

      if (exit) {
        break
      }

      if (minGallop < 0) {
        minGallop = 0;
      }

      minGallop += 2;
    }

    this.minGallop = minGallop;

    if (minGallop < 1) {
      this.minGallop = 1;
    }

    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;

      for (i = length1 - 1; i >= 0; i --) {
        array[customDest + i] = array[customCursor + i];
        results[customDest + i] = results[customCursor + i];
      }

      array[dest] = tmp[cursor2];
      results[dest] = tmpIndex[cursor2];
    } else if (length2 === 0) {
      throw new Error('mergeHigh preconditions were not respected')
    } else {
      customCursor = dest - (length2 - 1);
      for (i = 0; i < length2; i ++) {
        array[customCursor + i] = tmp[i];
        results[customCursor + i] = tmpIndex[i];
      }
    }
  }
}

/**
 * Sort an array in the range [lo, hi) using TimSort.
 *
 * @param {array} array - The array to sort.
 * @param {function=} compare - Item comparison function. Default is
 *     alphabetical
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 *     comparator.
 */
function sort$1 (array, compare, lo, hi) {
  if (!Array.isArray(array)) {
    throw new TypeError(
      `The "array" argument must be an array. Received ${array}`
    )
  }

  results = [];

  const {length} = array;

  let i = 0;

  while (i < length) {
    results[i] = i ++;
  }

  /*
   * Handle the case where a comparison function is not provided. We do
   * lexicographic sorting
   */
  if (!compare) {
    compare = alphabeticalCompare;
  } else if (typeof compare !== 'function') {
    hi = lo;
    lo = compare;
    compare = alphabeticalCompare;
  }

  if (!lo) {
    lo = 0;
  }
  if (!hi) {
    hi = length;
  }

  let remaining = hi - lo;

  // The array is already sorted
  if (remaining < 2) {
    return results
  }

  let runLength = 0;
  // On small arrays binary sort can be used directly
  if (remaining < DEFAULT_MIN_MERGE) {
    runLength = makeAscendingRun(array, lo, hi, compare);
    binaryInsertionSort(array, lo, hi, lo + runLength, compare);
    return results
  }

  const ts = new TimSort(array, compare);

  const minRun = minRunLength(remaining);

  do {
    runLength = makeAscendingRun(array, lo, hi, compare);
    if (runLength < minRun) {
      let force = remaining;
      if (force > minRun) {
        force = minRun;
      }

      binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);
      runLength = force;
    }
    // Push new run and merge if necessary
    ts.pushRun(lo, runLength);
    ts.mergeRuns();

    // Go find next run
    remaining -= runLength;
    lo += runLength;
  } while (remaining !== 0)

  // Force merging of remaining runs
  ts.forceMergeRuns();

  return results
}

var src$2 = {
  sort: sort$1
};

const hasOwnProp = Object.prototype.hasOwnProperty;

var hasOwnProp_1 = (object, property) => hasOwnProp.call(object, property);

const hasOwnProperty = hasOwnProp_1;
const {
  isObject: isObject$2,
  isArray: isArray$2,
  isString: isString$1,
  isNumber: isNumber$1
} = util;

const PREFIX_BEFORE$2 = 'before';
const PREFIX_AFTER_PROP$2 = 'after-prop';
const PREFIX_AFTER_COLON$2 = 'after-colon';
const PREFIX_AFTER_VALUE$2 = 'after-value';
const PREFIX_AFTER$2 = 'after';

const PREFIX_BEFORE_ALL$2 = 'before-all';
const PREFIX_AFTER_ALL$2 = 'after-all';

const BRACKET_OPEN$2 = '[';
const BRACKET_CLOSE$2 = ']';
const CURLY_BRACKET_OPEN$2 = '{';
const CURLY_BRACKET_CLOSE$2 = '}';
const COMMA$2 = ',';
const EMPTY$2 = '';
const MINUS$1 = '-';

const SYMBOL_PREFIXES$1 = [
  PREFIX_BEFORE$2,
  PREFIX_AFTER_PROP$2,
  PREFIX_AFTER_COLON$2,
  PREFIX_AFTER_VALUE$2,
  PREFIX_AFTER$2
];

const NON_PROP_SYMBOL_KEYS = [
  PREFIX_BEFORE$2,
  PREFIX_BEFORE_ALL$2,
  PREFIX_AFTER_ALL$2
].map(Symbol.for);

const COLON$2 = ':';
const UNDEFINED$3 = undefined;

const symbol$1 = (prefix, key) => Symbol.for(prefix + COLON$2 + key);

const define$1 = (target, key, value) => Object.defineProperty(target, key, {
  value,
  writable: true,
  configurable: true
});

const copy_comments_by_kind = (
  target, source, target_key, source_key, prefix, remove_source
) => {
  const source_prop = symbol$1(prefix, source_key);
  if (!hasOwnProperty(source, source_prop)) {
    return
  }

  const target_prop = target_key === source_key
    ? source_prop
    : symbol$1(prefix, target_key);

  define$1(target, target_prop, source[source_prop]);

  if (remove_source) {
    delete source[source_prop];
  }
};

const copy_comments$1 = (
  target, source, target_key, source_key, remove_source
) => {
  SYMBOL_PREFIXES$1.forEach(prefix => {
    copy_comments_by_kind(
      target, source, target_key, source_key, prefix, remove_source
    );
  });
};

const swap_comments$1 = (array, from, to) => {
  if (from === to) {
    return
  }

  SYMBOL_PREFIXES$1.forEach(prefix => {
    const target_prop = symbol$1(prefix, to);
    if (!hasOwnProperty(array, target_prop)) {
      copy_comments_by_kind(array, array, to, from, prefix, true);
      return
    }

    const comments = array[target_prop];
    delete array[target_prop];

    copy_comments_by_kind(array, array, to, from, prefix, true);
    define$1(array, symbol$1(prefix, from), comments);
  });
};

const assign_non_prop_comments$1 = (target, source) => {
  NON_PROP_SYMBOL_KEYS.forEach(key => {
    const comments = source[key];

    if (comments) {
      define$1(target, key, comments);
    }
  });
};

// Assign keys and comments
const assign$1 = (target, source, keys) => {
  keys.forEach(key => {
    if (!isString$1(key) && !isNumber$1(key)) {
      return
    }

    if (!hasOwnProperty(source, key)) {
      return
    }

    target[key] = source[key];
    copy_comments$1(target, source, key, key);
  });

  return target
};

var common = {
  SYMBOL_PREFIXES: SYMBOL_PREFIXES$1,

  PREFIX_BEFORE: PREFIX_BEFORE$2,
  PREFIX_AFTER_PROP: PREFIX_AFTER_PROP$2,
  PREFIX_AFTER_COLON: PREFIX_AFTER_COLON$2,
  PREFIX_AFTER_VALUE: PREFIX_AFTER_VALUE$2,
  PREFIX_AFTER: PREFIX_AFTER$2,

  PREFIX_BEFORE_ALL: PREFIX_BEFORE_ALL$2,
  PREFIX_AFTER_ALL: PREFIX_AFTER_ALL$2,

  BRACKET_OPEN: BRACKET_OPEN$2,
  BRACKET_CLOSE: BRACKET_CLOSE$2,
  CURLY_BRACKET_OPEN: CURLY_BRACKET_OPEN$2,
  CURLY_BRACKET_CLOSE: CURLY_BRACKET_CLOSE$2,

  COLON: COLON$2,
  COMMA: COMMA$2,
  MINUS: MINUS$1,
  EMPTY: EMPTY$2,

  UNDEFINED: UNDEFINED$3,

  symbol: symbol$1,
  define: define$1,
  copy_comments: copy_comments$1,
  swap_comments: swap_comments$1,
  assign_non_prop_comments: assign_non_prop_comments$1,

  assign (target, source, keys) {
    if (!isObject$2(target)) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    if (!isObject$2(source)) {
      return target
    }

    if (keys === UNDEFINED$3) {
      keys = Object.keys(source);
      // We assign non-property comments
      // if argument `keys` is not specified
      assign_non_prop_comments$1(target, source);
    } else if (!isArray$2(keys)) {
      throw new TypeError('keys must be array or undefined')
    } else if (keys.length === 0) {
      // Or argument `keys` is an empty array
      assign_non_prop_comments$1(target, source);
    }

    return assign$1(target, source, keys)
  }
};

const {isArray: isArray$1} = util;
const {sort} = src$2;

const {
  SYMBOL_PREFIXES,

  UNDEFINED: UNDEFINED$2,

  symbol,
  copy_comments,
  swap_comments
} = common;

const reverse_comments = array => {
  const {length} = array;
  let i = 0;
  const max = length / 2;

  for (; i < max; i ++) {
    swap_comments(array, i, length - i - 1);
  }
};

const move_comment = (target, source, i, offset, remove) => {
  copy_comments(target, source, i + offset, i, remove);
};

const move_comments = (
  // `Array` target array
  target,
  // `Array` source array
  source,
  // `number` start index
  start,
  // `number` number of indexes to move
  count,
  // `number` offset to move
  offset,
  // `boolean` whether should remove the comments from source
  remove
) => {
  if (offset > 0) {
    let i = count;
    //         |   count   | offset |
    // source: -------------
    // target:          -------------
    //         | remove |
    // => remove === offset

    // From [count - 1, 0]
    while (i -- > 0) {
      move_comment(target, source, start + i, offset, remove);
    }
    return
  }

  let i = 0;
  // | remove  |  count    |
  //           -------------
  // -------------
  //             | offset  |

  // From [0, count - 1]
  while (i < count) {
    const ii = i ++;
    move_comment(target, source, start + ii, offset, remove);
  }
};

const remove_comments$1 = (array, key) => {
  SYMBOL_PREFIXES.forEach(prefix => {
    const prop = symbol(prefix, key);
    delete array[prop];
  });
};

const get_mapped = (map, key) => {
  let mapped = key;

  while (mapped in map) {
    mapped = map[mapped];
  }

  return mapped
};

let CommentArray$2 = class CommentArray extends Array {
  // - deleteCount + items.length

  // We should avoid `splice(begin, deleteCount, ...items)`,
  // because `splice(0, undefined)` is not equivalent to `splice(0)`,
  // as well as:
  // - slice
  splice (...args) {
    const {length} = this;
    const ret = super.splice(...args);

    // #16
    // If no element removed, we might still need to move comments,
    //   because splice could add new items

    // if (!ret.length) {
    //   return ret
    // }

    // JavaScript syntax is silly
    // eslint-disable-next-line prefer-const
    let [begin, deleteCount, ...items] = args;

    if (begin < 0) {
      begin += length;
    }

    if (arguments.length === 1) {
      deleteCount = length - begin;
    } else {
      deleteCount = Math.min(length - begin, deleteCount);
    }

    const {
      length: item_length
    } = items;

    // itemsToDelete: -
    // itemsToAdd: +
    //        |    dc      |  count   |
    // =======-------------============
    // =======++++++============
    //        | il |
    const offset = item_length - deleteCount;
    const start = begin + deleteCount;
    const count = length - start;

    move_comments(this, this, start, count, offset, true);

    return ret
  }

  slice (...args) {
    const {length} = this;
    const array = super.slice(...args);
    if (!array.length) {
      return new CommentArray()
    }

    let [begin, before] = args;

    // Ref:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    if (before === UNDEFINED$2) {
      before = length;
    } else if (before < 0) {
      before += length;
    }

    if (begin < 0) {
      begin += length;
    } else if (begin === UNDEFINED$2) {
      begin = 0;
    }

    move_comments(array, this, begin, before - begin, - begin);

    return array
  }

  unshift (...items) {
    const {length} = this;
    const ret = super.unshift(...items);
    const {
      length: items_length
    } = items;

    if (items_length > 0) {
      move_comments(this, this, 0, length, items_length, true);
    }

    return ret
  }

  shift () {
    const ret = super.shift();
    const {length} = this;

    remove_comments$1(this, 0);
    move_comments(this, this, 1, length, - 1, true);

    return ret
  }

  reverse () {
    super.reverse();

    reverse_comments(this);

    return this
  }

  pop () {
    const ret = super.pop();

    // Removes comments
    remove_comments$1(this, this.length);

    return ret
  }

  concat (...items) {
    let {length} = this;
    const ret = super.concat(...items);

    if (!items.length) {
      return ret
    }

    move_comments(ret, this, 0, this.length, 0);

    items.forEach(item => {
      const prev = length;
      length += isArray$1(item)
        ? item.length
        : 1;

      if (!(item instanceof CommentArray)) {
        return
      }

      move_comments(ret, item, 0, item.length, prev);
    });

    return ret
  }

  sort (...args) {
    const result = sort(
      this,
      // Make sure there is no more than one argument
      ...args.slice(0, 1)
    );

    // For example,
    // if we sort ['b', 'd', 'c', 'a'],
    // then `result` will be [3, 0, 2, 1], and the array is ['a', 'b', 'c', 'd']

    // First, we swap index 0 (b) and index 3 (a), then the array comments are
    // ['a.comments', 'd.comments', 'c.comments', 'b.comments']
    // index 0 is finalized
    // index 3 is actually mapped to original index 0, we present as 0 -> 3

    // Then swap index 1 (d) and index 0 (-> 3, b)
    // 1 (index) -> 0 (new index) -> 3 (real_index)
    // ['d.comments', 'b.comments', 'c.comments', 'd.comments']
    // index 1 is finalized
    // index 3 is contains the item of original index 1
    // - we present as 1 -> 3
    // - it is ok that we don't remove mapping 0 -> 3

    // Then index 2 should be skipped

    // Then swap index 3 (d) and index 1 (-> 3, b), skipped

    const map = Object.create(null);

    result.forEach((source_index, index) => {
      if (source_index === index) {
        return
      }

      const real_source_index = get_mapped(map, source_index);

      if (real_source_index === index) {
        return
      }

      // The item of index `index` gets the final value
      // delete map[index]
      map[index] = real_source_index;

      swap_comments(this, index, real_source_index);
    });

    return this
  }
};

var array = {
  CommentArray: CommentArray$2
};

// JSON formatting

const esprima = esprimaExports;

const {
  CommentArray: CommentArray$1,
} = array;

const {
  PREFIX_BEFORE: PREFIX_BEFORE$1,
  PREFIX_AFTER_PROP: PREFIX_AFTER_PROP$1,
  PREFIX_AFTER_COLON: PREFIX_AFTER_COLON$1,
  PREFIX_AFTER_VALUE: PREFIX_AFTER_VALUE$1,
  PREFIX_AFTER: PREFIX_AFTER$1,

  PREFIX_BEFORE_ALL: PREFIX_BEFORE_ALL$1,
  PREFIX_AFTER_ALL: PREFIX_AFTER_ALL$1,

  BRACKET_OPEN: BRACKET_OPEN$1,
  BRACKET_CLOSE: BRACKET_CLOSE$1,
  CURLY_BRACKET_OPEN: CURLY_BRACKET_OPEN$1,
  CURLY_BRACKET_CLOSE: CURLY_BRACKET_CLOSE$1,

  COLON: COLON$1,
  COMMA: COMMA$1,
  MINUS,
  EMPTY: EMPTY$1,

  UNDEFINED: UNDEFINED$1,

  define,
  assign_non_prop_comments
} = common;

const tokenize$1 = code => esprima.tokenize(code, {
  comment: true,
  loc: true
});

const previous_hosts = [];
let comments_host = null;
let unassigned_comments = null;

const previous_props = [];
let last_prop;

let remove_comments = false;
let inline = false;
let tokens$1 = null;
let last = null;
let current = null;
let index;
let reviver = null;

const clean$1 = () => {
  previous_props.length =
  previous_hosts.length = 0;

  last = null;
  last_prop = UNDEFINED$1;
};

const free = () => {
  clean$1();

  tokens$1.length = 0;

  unassigned_comments =
  comments_host =
  tokens$1 =
  last =
  current =
  reviver = null;
};

const symbolFor = prefix => Symbol.for(
  last_prop !== UNDEFINED$1
    ? prefix + COLON$1 + last_prop
    : prefix
);

const transform = (k, v) => reviver
  ? reviver(k, v)
  : v;

const unexpected = () => {
  const error = new SyntaxError(`Unexpected token ${current.value.slice(0, 1)}`);
  Object.assign(error, current.loc.start);

  throw error
};

const unexpected_end = () => {
  const error = new SyntaxError('Unexpected end of JSON input');
  Object.assign(error, last
    ? last.loc.end
    // Empty string
    : {
      line: 1,
      column: 0
    });

  throw error
};

// Move the reader to the next
const next = () => {
  const new_token = tokens$1[++ index];
  inline = current
    && new_token
    && current.loc.end.line === new_token.loc.start.line
    || false;

  last = current;
  current = new_token;
};

const type = () => {
  if (!current) {
    unexpected_end();
  }

  return current.type === 'Punctuator'
    ? current.value
    : current.type
};

const is = t => type() === t;

const expect = a => {
  if (!is(a)) {
    unexpected();
  }
};

const set_comments_host = new_host => {
  previous_hosts.push(comments_host);
  comments_host = new_host;
};

const restore_comments_host = () => {
  comments_host = previous_hosts.pop();
};

const assign_after_comments = () => {
  if (!unassigned_comments) {
    return
  }

  const after_comments = [];

  for (const comment of unassigned_comments) {
    // If the comment is inline, then it is an after-comma comment
    if (comment.inline) {
      after_comments.push(comment);
    // Otherwise, all comments are before:<next-prop> comment
    } else {
      break
    }
  }

  const {length} = after_comments;
  if (!length) {
    return
  }

  if (length === unassigned_comments.length) {
    // If unassigned_comments are all consumed
    unassigned_comments = null;
  } else {
    unassigned_comments.splice(0, length);
  }

  define(comments_host, symbolFor(PREFIX_AFTER$1), after_comments);
};

const assign_comments = prefix => {
  if (!unassigned_comments) {
    return
  }

  define(comments_host, symbolFor(prefix), unassigned_comments);

  unassigned_comments = null;
};

const parse_comments = prefix => {
  const comments = [];

  while (
    current
    && (
      is('LineComment')
      || is('BlockComment')
    )
  ) {
    const comment = {
      ...current,
      inline
    };

    // delete comment.loc
    comments.push(comment);

    next();
  }

  if (remove_comments) {
    return
  }

  if (!comments.length) {
    return
  }

  if (prefix) {
    define(comments_host, symbolFor(prefix), comments);
    return
  }

  unassigned_comments = comments;
};

const set_prop = (prop, push) => {
  if (push) {
    previous_props.push(last_prop);
  }

  last_prop = prop;
};

const restore_prop = () => {
  last_prop = previous_props.pop();
};

const parse_object = () => {
  const obj = {};
  set_comments_host(obj);
  set_prop(UNDEFINED$1, true);

  let started = false;
  let name;

  parse_comments();

  while (!is(CURLY_BRACKET_CLOSE$1)) {
    if (started) {
      assign_comments(PREFIX_AFTER_VALUE$1);

      // key-value pair delimiter
      expect(COMMA$1);
      next();
      parse_comments();

      assign_after_comments();

      // If there is a trailing comma, we might reach the end
      // ```
      // {
      //   "a": 1,
      // }
      // ```
      if (is(CURLY_BRACKET_CLOSE$1)) {
        break
      }
    }

    started = true;
    expect('String');
    name = JSON.parse(current.value);

    set_prop(name);
    assign_comments(PREFIX_BEFORE$1);

    next();
    parse_comments(PREFIX_AFTER_PROP$1);

    expect(COLON$1);

    next();
    parse_comments(PREFIX_AFTER_COLON$1);

    obj[name] = transform(name, walk());
    parse_comments();
  }

  if (started) {
    // If there are properties,
    // then the unassigned comments are after comments
    assign_comments(PREFIX_AFTER$1);
  }

  // bypass }
  next();
  last_prop = undefined;

  if (!started) {
    // Otherwise, they are before comments
    assign_comments(PREFIX_BEFORE$1);
  }

  restore_comments_host();
  restore_prop();

  return obj
};

const parse_array = () => {
  const array = new CommentArray$1();
  set_comments_host(array);
  set_prop(UNDEFINED$1, true);

  let started = false;
  let i = 0;

  parse_comments();

  while (!is(BRACKET_CLOSE$1)) {
    if (started) {
      assign_comments(PREFIX_AFTER_VALUE$1);
      expect(COMMA$1);
      next();
      parse_comments();

      assign_after_comments();

      if (is(BRACKET_CLOSE$1)) {
        break
      }
    }

    started = true;

    set_prop(i);
    assign_comments(PREFIX_BEFORE$1);

    array[i] = transform(i, walk());
    i ++;

    parse_comments();
  }

  if (started) {
    assign_comments(PREFIX_AFTER$1);
  }

  next();
  last_prop = undefined;

  if (!started) {
    assign_comments(PREFIX_BEFORE$1);
  }

  restore_comments_host();
  restore_prop();

  return array
};

function walk () {
  let tt = type();

  if (tt === CURLY_BRACKET_OPEN$1) {
    next();
    return parse_object()
  }

  if (tt === BRACKET_OPEN$1) {
    next();
    return parse_array()
  }

  let negative = EMPTY$1;

  // -1
  if (tt === MINUS) {
    next();
    tt = type();
    negative = MINUS;
  }

  let v;

  switch (tt) {
  case 'String':
  case 'Boolean':
  case 'Null':
  case 'Numeric':
    v = current.value;
    next();
    return JSON.parse(negative + v)
  }
}

const isObject$1 = subject => Object(subject) === subject;

const parse$1 = (code, rev, no_comments) => {
  // Clean variables in closure
  clean$1();

  tokens$1 = tokenize$1(code);
  reviver = rev;
  remove_comments = no_comments;

  if (!tokens$1.length) {
    unexpected_end();
  }

  index = - 1;
  next();

  set_comments_host({});

  parse_comments(PREFIX_BEFORE_ALL$1);

  let result = walk();

  parse_comments(PREFIX_AFTER_ALL$1);

  if (current) {
    unexpected();
  }

  if (!no_comments && result !== null) {
    if (!isObject$1(result)) {
      // 1 -> new Number(1)
      // true -> new Boolean(1)
      // "foo" -> new String("foo")

      // eslint-disable-next-line no-new-object
      result = new Object(result);
    }

    assign_non_prop_comments(result, comments_host);
  }

  restore_comments_host();

  // reviver
  result = transform('', result);

  free();

  return result
};

var parse_1 = {
  parse: parse$1,
  tokenize: tokenize$1
};

/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

var repeatString = repeat$1;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat$1(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}

const {
  isArray, isObject, isFunction, isNumber, isString
} = util;
const repeat = repeatString;

const {
  PREFIX_BEFORE_ALL,
  PREFIX_BEFORE,
  PREFIX_AFTER_PROP,
  PREFIX_AFTER_COLON,
  PREFIX_AFTER_VALUE,
  PREFIX_AFTER,
  PREFIX_AFTER_ALL,

  BRACKET_OPEN,
  BRACKET_CLOSE,
  CURLY_BRACKET_OPEN,
  CURLY_BRACKET_CLOSE,
  COLON,
  COMMA,
  EMPTY,

  UNDEFINED
} = common;

// eslint-disable-next-line no-control-regex, no-misleading-character-class
const ESCAPABLE = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

// String constants
const SPACE = ' ';
const LF = '\n';
const STR_NULL = 'null';

// Symbol tags
const BEFORE = prop => `${PREFIX_BEFORE}:${prop}`;
const AFTER_PROP = prop => `${PREFIX_AFTER_PROP}:${prop}`;
const AFTER_COLON = prop => `${PREFIX_AFTER_COLON}:${prop}`;
const AFTER_VALUE = prop => `${PREFIX_AFTER_VALUE}:${prop}`;
const AFTER = prop => `${PREFIX_AFTER}:${prop}`;

// table of character substitutions
const meta = {
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\f': '\\f',
  '\r': '\\r',
  '"': '\\"',
  '\\': '\\\\'
};

const escape = string => {
  ESCAPABLE.lastIndex = 0;

  if (!ESCAPABLE.test(string)) {
    return string
  }

  return string.replace(ESCAPABLE, a => {
    const c = meta[a];
    return typeof c === 'string'
      ? c
      : a
  })
};

// Escape no control characters, no quote characters,
// and no backslash characters,
// then we can safely slap some quotes around it.
const quote = string => `"${escape(string)}"`;
const comment_stringify = (value, line) => line
  ? `//${value}`
  : `/*${value}*/`;

// display_block `boolean` whether the
//   WHOLE block of comments is always a block group
const process_comments = (host, symbol_tag, deeper_gap, display_block) => {
  const comments = host[Symbol.for(symbol_tag)];
  if (!comments || !comments.length) {
    return EMPTY
  }

  let is_line_comment = false;

  const str = comments.reduce((prev, {
    inline,
    type,
    value
  }) => {
    const delimiter = inline
      ? SPACE
      : LF + deeper_gap;

    is_line_comment = type === 'LineComment';

    return prev + delimiter + comment_stringify(value, is_line_comment)
  }, EMPTY);

  return display_block
  // line comment should always end with a LF
  || is_line_comment
    ? str + LF + deeper_gap
    : str
};

let replacer = null;
let indent = EMPTY;

const clean = () => {
  replacer = null;
  indent = EMPTY;
};

const join = (one, two, gap) =>
  one
    ? two
      // Symbol.for('before') and Symbol.for('before:prop')
      // might both exist if user mannually add comments to the object
      // and make a mistake.
      // SO, we are not to only trimRight but trim for both sides
      ? one + two.trim() + LF + gap
      : one.trimRight() + LF + gap
    : two
      ? two.trimRight() + LF + gap
      : EMPTY;

const join_content = (inside, value, gap) => {
  const comment = process_comments(value, PREFIX_BEFORE, gap + indent, true);

  return join(comment, inside, gap)
};

// | deeper_gap   |
// | gap | indent |
//       [
//                "foo",
//                "bar"
//       ]
const array_stringify = (value, gap) => {
  const deeper_gap = gap + indent;

  const {length} = value;

  // From the item to before close
  let inside = EMPTY;
  let after_comma = EMPTY;

  // Never use Array.prototype.forEach,
  // that we should iterate all items
  for (let i = 0; i < length; i ++) {
    if (i !== 0) {
      inside += COMMA;
    }

    const before = join(
      after_comma,
      process_comments(value, BEFORE(i), deeper_gap),
      deeper_gap
    );

    inside += before || (LF + deeper_gap);

    // JSON.stringify([undefined])  => [null]
    inside += stringify$1(i, value, deeper_gap) || STR_NULL;

    inside += process_comments(value, AFTER_VALUE(i), deeper_gap);

    after_comma = process_comments(value, AFTER(i), deeper_gap);
  }

  inside += join(
    after_comma,
    process_comments(value, PREFIX_AFTER, deeper_gap),
    deeper_gap
  );

  return BRACKET_OPEN
   + join_content(inside, value, gap)
   + BRACKET_CLOSE
};

// | deeper_gap   |
// | gap | indent |
//       {
//                "foo": 1,
//                "bar": 2
//       }
const object_stringify = (value, gap) => {
  // Due to a specification blunder in ECMAScript, typeof null is 'object',
  // so watch out for that case.
  if (!value) {
    return 'null'
  }

  const deeper_gap = gap + indent;

  // From the first element to before close
  let inside = EMPTY;
  let after_comma = EMPTY;
  let first = true;

  const keys = isArray(replacer)
    ? replacer
    : Object.keys(value);

  const iteratee = key => {
    // Stringified value
    const sv = stringify$1(key, value, deeper_gap);

    // If a value is undefined, then the key-value pair should be ignored
    if (sv === UNDEFINED) {
      return
    }

    // The treat ment
    if (!first) {
      inside += COMMA;
    }

    first = false;

    const before = join(
      after_comma,
      process_comments(value, BEFORE(key), deeper_gap),
      deeper_gap
    );

    inside += before || (LF + deeper_gap);

    inside += quote(key)
    + process_comments(value, AFTER_PROP(key), deeper_gap)
    + COLON
    + process_comments(value, AFTER_COLON(key), deeper_gap)
    + SPACE
    + sv
    + process_comments(value, AFTER_VALUE(key), deeper_gap);

    after_comma = process_comments(value, AFTER(key), deeper_gap);
  };

  keys.forEach(iteratee);

  // if (after_comma) {
  //   inside += COMMA
  // }

  inside += join(
    after_comma,
    process_comments(value, PREFIX_AFTER, deeper_gap),
    deeper_gap
  );

  return CURLY_BRACKET_OPEN
  + join_content(inside, value, gap)
  + CURLY_BRACKET_CLOSE
};

// @param {string} key
// @param {Object} holder
// @param {function()|Array} replacer
// @param {string} indent
// @param {string} gap
function stringify$1 (key, holder, gap) {
  let value = holder[key];

  // If the value has a toJSON method, call it to obtain a replacement value.
  if (isObject(value) && isFunction(value.toJSON)) {
    value = value.toJSON(key);
  }

  // If we were called with a replacer function, then call the replacer to
  // obtain a replacement value.
  if (isFunction(replacer)) {
    value = replacer.call(holder, key, value);
  }

  switch (typeof value) {
  case 'string':
    return quote(value)

  case 'number':
    // JSON numbers must be finite. Encode non-finite numbers as null.
    return Number.isFinite(value) ? String(value) : STR_NULL

  case 'boolean':
  case 'null':

    // If the value is a boolean or null, convert it to a string. Note:
    // typeof null does not produce 'null'. The case is included here in
    // the remote chance that this gets fixed someday.
    return String(value)

  // If the type is 'object', we might be dealing with an object or an array or
  // null.
  case 'object':
    return isArray(value)
      ? array_stringify(value, gap)
      : object_stringify(value, gap)
    // JSON.stringify(undefined) === undefined
    // JSON.stringify('foo', () => undefined) === undefined
  }
}

const get_indent = space => isString(space)
  // If the space parameter is a string, it will be used as the indent string.
  ? space
  : isNumber(space)
    ? repeat(SPACE, space)
    : EMPTY;

const {toString: toString$1} = Object.prototype;
const PRIMITIVE_OBJECT_TYPES = [
  '[object Number]',
  '[object String]',
  '[object Boolean]'
];

const is_primitive_object = subject => {
  if (typeof subject !== 'object') {
    return false
  }

  const str = toString$1.call(subject);
  return PRIMITIVE_OBJECT_TYPES.includes(str)
};

// @param {function()|Array} replacer
// @param {string|number} space
var stringify_1 = (value, replacer_, space) => {
  // The stringify method takes a value and an optional replacer, and an optional
  // space parameter, and returns a JSON text. The replacer can be a function
  // that can replace values, or an array of strings that will select the keys.
  // A default replacer method can be provided. Use of the space parameter can
  // produce text that is more easily readable.

  // If the space parameter is a number, make an indent string containing that
  // many spaces.
  const indent_ = get_indent(space);

  if (!indent_) {
    return JSON.stringify(value, replacer_)
  }

  // vanilla `JSON.parse` allow invalid replacer
  if (!isFunction(replacer_) && !isArray(replacer_)) {
    replacer_ = null;
  }

  replacer = replacer_;
  indent = indent_;

  const str = is_primitive_object(value)
    ? JSON.stringify(value)
    : stringify$1('', {'': value}, EMPTY);

  clean();

  return isObject(value)
    ? process_comments(value, PREFIX_BEFORE_ALL, EMPTY).trimLeft()
      + str
      + process_comments(value, PREFIX_AFTER_ALL, EMPTY).trimRight()
    : str
};

const {parse, tokenize} = parse_1;
const stringify = stringify_1;
const {CommentArray} = array;
const {assign} = common;

var src$1 = {
  parse,
  stringify,
  tokenize,

  CommentArray,
  assign
};

var CJSON = src$1;

const preVueContext = Object.create(null);
function getPreVueContext() {
    return preVueContext;
}

var regexrulesExports = {};
var regexrules = {
  get exports(){ return regexrulesExports; },
  set exports(v){ regexrulesExports = v; },
};

(function (module) {
	module.exports = {
	  simple : {
	    echo : "^#echo[ \t]+(.*?)[ \t]*$",
	    exec : "^#exec[ \t]+(\\S+)[ \t]*\\((.*)\\)[ \t]*$",
	    include          : "^(.*)#include(?!-)[ \t]+(.*?)[ \t]*$", // allow prefix characters to specify the indent level of included file
	    'include-static' : "^(.*)#include-static[ \t]+(.*?)[ \t]*$"
	  },
	  html : {
	    echo : "<!--[ \t]*#echo[ \t]+(.*?)[ \t]*(?:-->|!>)",
	    exec : "<!--[ \t]*#exec[ \t]+(\\S+)[ \t]*\\((.*)\\)[ \t]*(?:-->|!>)",
	    include          : "(.*)<!--[ \t]*#include(?!-)[ \t]+(.*?)[ \t]*(?:-->|!>)",
	    'include-static' : "(.*)<!--[ \t]*#include-static[ \t]+(.*?)[ \t]*(?:-->|!>)",
	    exclude : {
	      start : "[ \t]*<!--[ \t]*#exclude(?:[ \t]+(.*?))?[ \t]*(?:-->|!>)(?:[ \t]*\n+)?",
	      end   : "[ \t]*<!--[ \t]*#endexclude[ \t]*(?:-->|!>)(?:[ \t]*\n)?"
	    },
	    extend : {
	      start : "[ \t]*<!--[ \t]*#extend(?!able)[ \t]+(.*?)[ \t]*(?:-->|!>)(?:[ \t]*\n+)?",
	      end   : "[ \t]*<!--[ \t]*#endextend[ \t]*(?:-->|!>)(?:[ \t]*\n)?"
	    },
	    extendable : "<!--[ \t]*#extendable[ \t]*(?:-->|!>)",
	    if : {
	      start : "[ \t]*<!--[ \t]*#(ifndef|ifdef|if)[ \t]+(.*?)[ \t]*(?:-->|!>)(?:[ \t]*\n+)?",
	      end   : "[ \t]*<!(?:--)?[ \t]*#endif[ \t]*(?:-->|!>)(?:[ \t]*\n)?"
	    },
	    else : "[ \t]*<!(?:--)?[ \t]*#else[ \t]*(?:-->|!>)(?:[ \t]*\n)?",
	    foreach : {
	      start : "[ \t]*<!--[ \t]*#foreach[ \t]+(.*?)[ \t]*(?:-->|!>)(?:[ \t]*\n+)?",
	      end   : "[ \t]*<!(?:--)?[ \t]*#endfor[ \t]*(?:-->|!>)(?:[ \t]*\n)?"
	    }
	  },
	  js : {
	    echo : [
	      "/\\*[ \t]*#echo[ \t]+(.*?)[ \t]*\\*(?:\\*|/)",
	      "//[ \t]*#echo[ \t]+(.*?)[ \t]*$"
	    ],
	    exec : "(?://|/\\*)[ \t]*#exec[ \t]+(\\S+?)[ \t]*\\((.*)\\)[ \t]*(?:\\*(?:\\*|/))?",
	    include : [
	      "^(.*)/\\*[ \t]*#include(?!-)[ \t]+(.*?)[ \t]*\\*(?:\\*|/)",
	      "^(.*)//[ \t]*#include(?!-)[ \t]+(.*?)[ \t]*$"
	    ],
	    'include-static': [
	      "^(.*)/\\*[ \t]*#include-static[ \t]+(.*?)[ \t]*\\*(?:\\*|/)",
	      "^(.*)//[ \t]*#include-static[ \t]+(.*?)[ \t]*$"
	    ],
	    exclude : {
	      start : "[ \t]*(?://|/\\*)[ \t]*#exclude(?:[ \t]+([^\n*]*))?[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n+)?",
	      end   : "[ \t]*(?://|/\\*)[ \t]*#endexclude[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?"
	    },
	    extend : {
	      start : "[ \t]*(?://|/\\*)[ \t]*#extend(?!able)[ \t]+([^\n*]*)(?:\\*(?:\\*|/))?(?:[ \t]*\n+)?",
	      end   : "[ \t]*(?://|/\\*)[ \t]*#endextend[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?"
	    },
	    extendable : "[ \t]*(?://|/\\*)[ \t]*#extendable[ \t]*(?:\\*/)?",
	    if : {
	      start : "[ \t]*(?://|/\\*)[ \t]*#(ifndef|ifdef|if)[ \t]+([^\n*]*)(?:\\*(?:\\*|/))?(?:[ \t]*\n+)?",
	      end   : "[ \t]*(?://|/\\*)[ \t]*#endif[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?"
	    },
	    else : "[ \t]*(?://|/\\*)[ \t]*#else[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?",
	    foreach : {
	      start : "[ \t]*(?://|/\\*)[ \t]*#foreach[ \t]+([^\n*]*)(?:\\*(?:\\*|/))?(?:[ \t]*\n+)?",
	      end   : "[ \t]*(?://|/\\*)[ \t]*#endfor[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?"
	    }
	  },
	  coffee : {
	    echo : [
	      "###+[ \t]*#echo[ \t]+(.*?)[ \t]###",
	      "#+[ \t]*#echo[ \t]+(.*?)[ \t]*$"
	    ],
	    exec : "#+[ \t]*#exec[ \t]+(\\S+)[ \t]*\\((.*)\\)[ \t]*$",
	    include          : "^(.*?)#+[ \t]*#include(?!-)[ \t]+(.*?)[ \t]*$",
	    'include-static' : "^(.*?)#+[ \t]*#include-static[ \t]+(.*?)[ \t]*$",
	    exclude : {
	      start : "^[ \t]*#+[ \t]*#exclude(?:[ \t]+(.*?))?[ \t]*\n+",
	      end   : "^[ \t]*#+[ \t]*#endexclude[ \t]*\n?"
	    },
	    extend : {
	      start : "^[ \t]*#+[ \t]*#extend(?!able)[ \t]+(.*?)\n+",
	      end   : "^[ \t]*#+[ \t]*#endextend[ \t]*\n?"
	    },
	    extendable : "^[ \t]*#+[ \t]*#extendable[ \t]*$",
	    if : {
	      start : "^[ \t]*#+[ \t]*#(ifndef|ifdef|if)[ \t]+(.*?)[ \t]*\n+",
	      end   : "^[ \t]*#+[ \t]*#endif[ \t]*\n?"
	    },
	    else : "^[ \t]*#+[ \t]*#else[ \t]*\n?",
	    foreach : {
	      start : "^[ \t]*#+[ \t]*#foreach[ \t]+(.*?)[ \t]*\n+",
	      end   : "^[ \t]*#+[ \t]*#endfor[ \t]*\n?"
	    }
	  }
	};

	module.exports.xml        = module.exports.html;

	module.exports.javascript = module.exports.js;
	module.exports.jsx        = module.exports.js;
	module.exports.json       = module.exports.js;
	module.exports.c          = module.exports.js;
	module.exports.cc         = module.exports.js;
	module.exports.cpp        = module.exports.js;
	module.exports.cs         = module.exports.js;
	module.exports.csharp     = module.exports.js;
	module.exports.java       = module.exports.js;
	module.exports.less       = module.exports.js;
	module.exports.sass       = module.exports.js;
	module.exports.scss       = module.exports.js;
	module.exports.css        = module.exports.js;
	module.exports.php        = module.exports.js;
	module.exports.ts         = module.exports.js;
	module.exports.tsx        = module.exports.js;
	module.exports.peg        = module.exports.js;
	module.exports.pegjs      = module.exports.js;
	module.exports.jade       = module.exports.js;
	module.exports.styl       = module.exports.js;
	module.exports.go         = module.exports.js;

	module.exports.bash       = module.exports.coffee;
	module.exports.shell      = module.exports.coffee;
	module.exports.sh         = module.exports.coffee;
} (regexrules));

/*!
 * XRegExp 3.1.0
 * <xregexp.com>
 * Steven Levithan (c) 2007-2016 MIT License
 */

/* ==============================
 * Private stuff
 * ============================== */

    // Property name used for extended regex instance data
    var REGEX_DATA = 'xregexp';
    // Optional features that can be installed and uninstalled
    var features = {
        astral: false,
        natives: false
    };
    // Native methods to use and restore ('native' is an ES3 reserved keyword)
    var nativ = {
        exec: RegExp.prototype.exec,
        test: RegExp.prototype.test,
        match: String.prototype.match,
        replace: String.prototype.replace,
        split: String.prototype.split
    };
    // Storage for fixed/extended native methods
    var fixed = {};
    // Storage for regexes cached by `XRegExp.cache`
    var regexCache = {};
    // Storage for pattern details cached by the `XRegExp` constructor
    var patternCache = {};
    // Storage for regex syntax tokens added internally or by `XRegExp.addToken`
    var tokens = [];
    // Token scopes
    var defaultScope = 'default';
    var classScope = 'class';
    // Regexes that match native regex syntax, including octals
    var nativeTokens = {
        // Any native multicharacter token in default scope, or any single character
        'default': /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
        // Any native multicharacter token in character class scope, or any single character
        'class': /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|[\s\S]/
    };
    // Any backreference or dollar-prefixed character in replacement strings
    var replacementToken = /\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g;
    // Check for correct `exec` handling of nonparticipating capturing groups
    var correctExecNpcg = nativ.exec.call(/()??/, '')[1] === undefined;
    // Check for ES6 `flags` prop support
    var hasFlagsProp = /x/.flags !== undefined;
    // Shortcut to `Object.prototype.toString`
    var toString = {}.toString;

    function hasNativeFlag(flag) {
        // Can't check based on the presense of properties/getters since
        // browsers might support such properties even when don't support the
        // corresponding flag in regex construction (tested in Chrome 48, where
        // `'unicode' in /x/` is true but trying to construct a regex with flag
        // `u` throws an error).
        var isSupported = true;
        try {
            new RegExp('', flag);
        } catch (exception) {
            isSupported = false;
        }
        return isSupported;
    }
    // Check for ES6 `u` flag support
    var hasNativeU = hasNativeFlag('u');
    // Check for ES6 `y` flag support
    var hasNativeY = hasNativeFlag('y');
    // Tracker for known flags, including addon flags
    var registeredFlags = {
        g: true,
        i: true,
        m: true,
        u: hasNativeU,
        y: hasNativeY
    };

/**
 * Attaches extended data and `XRegExp.prototype` properties to a regex object.
 *
 * @private
 * @param {RegExp} regex Regex to augment.
 * @param {Array} captureNames Array with capture names, or `null`.
 * @param {String} xSource XRegExp pattern used to generate `regex`, or `null` if N/A.
 * @param {String} xFlags XRegExp flags used to generate `regex`, or `null` if N/A.
 * @param {Boolean} [isInternalOnly=false] Whether the regex will be used only for internal
 *   operations, and never exposed to users. For internal-only regexes, we can improve perf by
 *   skipping some operations like attaching `XRegExp.prototype` properties.
 * @returns {RegExp} Augmented regex.
 */
    function augment(regex, captureNames, xSource, xFlags, isInternalOnly) {
        var p;

        regex[REGEX_DATA] = {
            captureNames: captureNames
        };

        if (isInternalOnly) {
            return regex;
        }

        // Can't auto-inherit these since the XRegExp constructor returns a nonprimitive value
        if (regex.__proto__) {
            regex.__proto__ = XRegExp$2.prototype;
        } else {
            for (p in XRegExp$2.prototype) {
                // An `XRegExp.prototype.hasOwnProperty(p)` check wouldn't be worth it here, since
                // this is performance sensitive, and enumerable `Object.prototype` or
                // `RegExp.prototype` extensions exist on `regex.prototype` anyway
                regex[p] = XRegExp$2.prototype[p];
            }
        }

        regex[REGEX_DATA].source = xSource;
        // Emulate the ES6 `flags` prop by ensuring flags are in alphabetical order
        regex[REGEX_DATA].flags = xFlags ? xFlags.split('').sort().join('') : xFlags;

        return regex;
    }

/**
 * Removes any duplicate characters from the provided string.
 *
 * @private
 * @param {String} str String to remove duplicate characters from.
 * @returns {String} String with any duplicate characters removed.
 */
    function clipDuplicates(str) {
        return nativ.replace.call(str, /([\s\S])(?=[\s\S]*\1)/g, '');
    }

/**
 * Copies a regex object while preserving extended data and augmenting with `XRegExp.prototype`
 * properties. The copy has a fresh `lastIndex` property (set to zero). Allows adding and removing
 * flags g and y while copying the regex.
 *
 * @private
 * @param {RegExp} regex Regex to copy.
 * @param {Object} [options] Options object with optional properties:
 *   <li>`addG` {Boolean} Add flag g while copying the regex.
 *   <li>`addY` {Boolean} Add flag y while copying the regex.
 *   <li>`removeG` {Boolean} Remove flag g while copying the regex.
 *   <li>`removeY` {Boolean} Remove flag y while copying the regex.
 *   <li>`isInternalOnly` {Boolean} Whether the copied regex will be used only for internal
 *     operations, and never exposed to users. For internal-only regexes, we can improve perf by
 *     skipping some operations like attaching `XRegExp.prototype` properties.
 * @returns {RegExp} Copy of the provided regex, possibly with modified flags.
 */
    function copyRegex(regex, options) {
        if (!XRegExp$2.isRegExp(regex)) {
            throw new TypeError('Type RegExp expected');
        }

        var xData = regex[REGEX_DATA] || {},
            flags = getNativeFlags(regex),
            flagsToAdd = '',
            flagsToRemove = '',
            xregexpSource = null,
            xregexpFlags = null;

        options = options || {};

        if (options.removeG) {flagsToRemove += 'g';}
        if (options.removeY) {flagsToRemove += 'y';}
        if (flagsToRemove) {
            flags = nativ.replace.call(flags, new RegExp('[' + flagsToRemove + ']+', 'g'), '');
        }

        if (options.addG) {flagsToAdd += 'g';}
        if (options.addY) {flagsToAdd += 'y';}
        if (flagsToAdd) {
            flags = clipDuplicates(flags + flagsToAdd);
        }

        if (!options.isInternalOnly) {
            if (xData.source !== undefined) {
                xregexpSource = xData.source;
            }
            // null or undefined; don't want to add to `flags` if the previous value was null, since
            // that indicates we're not tracking original precompilation flags
            if (xData.flags != null) {
                // Flags are only added for non-internal regexes by `XRegExp.globalize`. Flags are
                // never removed for non-internal regexes, so don't need to handle it
                xregexpFlags = flagsToAdd ? clipDuplicates(xData.flags + flagsToAdd) : xData.flags;
            }
        }

        // Augment with `XRegExp.prototype` properties, but use the native `RegExp` constructor to
        // avoid searching for special tokens. That would be wrong for regexes constructed by
        // `RegExp`, and unnecessary for regexes constructed by `XRegExp` because the regex has
        // already undergone the translation to native regex syntax
        regex = augment(
            new RegExp(regex.source, flags),
            hasNamedCapture(regex) ? xData.captureNames.slice(0) : null,
            xregexpSource,
            xregexpFlags,
            options.isInternalOnly
        );

        return regex;
    }

/**
 * Converts hexadecimal to decimal.
 *
 * @private
 * @param {String} hex
 * @returns {Number}
 */
    function dec(hex) {
        return parseInt(hex, 16);
    }

/**
 * Returns native `RegExp` flags used by a regex object.
 *
 * @private
 * @param {RegExp} regex Regex to check.
 * @returns {String} Native flags in use.
 */
    function getNativeFlags(regex) {
        return hasFlagsProp ?
            regex.flags :
            // Explicitly using `RegExp.prototype.toString` (rather than e.g. `String` or
            // concatenation with an empty string) allows this to continue working predictably when
            // `XRegExp.proptotype.toString` is overriden
            nativ.exec.call(/\/([a-z]*)$/i, RegExp.prototype.toString.call(regex))[1];
    }

/**
 * Determines whether a regex has extended instance data used to track capture names.
 *
 * @private
 * @param {RegExp} regex Regex to check.
 * @returns {Boolean} Whether the regex uses named capture.
 */
    function hasNamedCapture(regex) {
        return !!(regex[REGEX_DATA] && regex[REGEX_DATA].captureNames);
    }

/**
 * Converts decimal to hexadecimal.
 *
 * @private
 * @param {Number|String} dec
 * @returns {String}
 */
    function hex(dec) {
        return parseInt(dec, 10).toString(16);
    }

/**
 * Returns the first index at which a given value can be found in an array.
 *
 * @private
 * @param {Array} array Array to search.
 * @param {*} value Value to locate in the array.
 * @returns {Number} Zero-based index at which the item is found, or -1.
 */
    function indexOf(array, value) {
        var len = array.length, i;

        for (i = 0; i < len; ++i) {
            if (array[i] === value) {
                return i;
            }
        }

        return -1;
    }

/**
 * Determines whether a value is of the specified type, by resolving its internal [[Class]].
 *
 * @private
 * @param {*} value Object to check.
 * @param {String} type Type to check for, in TitleCase.
 * @returns {Boolean} Whether the object matches the type.
 */
    function isType(value, type) {
        return toString.call(value) === '[object ' + type + ']';
    }

/**
 * Checks whether the next nonignorable token after the specified position is a quantifier.
 *
 * @private
 * @param {String} pattern Pattern to search within.
 * @param {Number} pos Index in `pattern` to search at.
 * @param {String} flags Flags used by the pattern.
 * @returns {Boolean} Whether the next token is a quantifier.
 */
    function isQuantifierNext(pattern, pos, flags) {
        return nativ.test.call(
            flags.indexOf('x') > -1 ?
                // Ignore any leading whitespace, line comments, and inline comments
                /^(?:\s+|#.*|\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/ :
                // Ignore any leading inline comments
                /^(?:\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/,
            pattern.slice(pos)
        );
    }

/**
 * Pads the provided string with as many leading zeros as needed to get to length 4. Used to produce
 * fixed-length hexadecimal values.
 *
 * @private
 * @param {String} str
 * @returns {String}
 */
    function pad4(str) {
        while (str.length < 4) {
            str = '0' + str;
        }
        return str;
    }

/**
 * Checks for flag-related errors, and strips/applies flags in a leading mode modifier. Offloads
 * the flag preparation logic from the `XRegExp` constructor.
 *
 * @private
 * @param {String} pattern Regex pattern, possibly with a leading mode modifier.
 * @param {String} flags Any combination of flags.
 * @returns {Object} Object with properties `pattern` and `flags`.
 */
    function prepareFlags(pattern, flags) {
        var i;

        // Recent browsers throw on duplicate flags, so copy this behavior for nonnative flags
        if (clipDuplicates(flags) !== flags) {
            throw new SyntaxError('Invalid duplicate regex flag ' + flags);
        }

        // Strip and apply a leading mode modifier with any combination of flags except g or y
        pattern = nativ.replace.call(pattern, /^\(\?([\w$]+)\)/, function($0, $1) {
            if (nativ.test.call(/[gy]/, $1)) {
                throw new SyntaxError('Cannot use flag g or y in mode modifier ' + $0);
            }
            // Allow duplicate flags within the mode modifier
            flags = clipDuplicates(flags + $1);
            return '';
        });

        // Throw on unknown native or nonnative flags
        for (i = 0; i < flags.length; ++i) {
            if (!registeredFlags[flags.charAt(i)]) {
                throw new SyntaxError('Unknown regex flag ' + flags.charAt(i));
            }
        }

        return {
            pattern: pattern,
            flags: flags
        };
    }

/**
 * Prepares an options object from the given value.
 *
 * @private
 * @param {String|Object} value Value to convert to an options object.
 * @returns {Object} Options object.
 */
    function prepareOptions(value) {
        var options = {};

        if (isType(value, 'String')) {
            XRegExp$2.forEach(value, /[^\s,]+/, function(match) {
                options[match] = true;
            });

            return options;
        }

        return value;
    }

/**
 * Registers a flag so it doesn't throw an 'unknown flag' error.
 *
 * @private
 * @param {String} flag Single-character flag to register.
 */
    function registerFlag(flag) {
        if (!/^[\w$]$/.test(flag)) {
            throw new Error('Flag must be a single character A-Za-z0-9_$');
        }

        registeredFlags[flag] = true;
    }

/**
 * Runs built-in and custom regex syntax tokens in reverse insertion order at the specified
 * position, until a match is found.
 *
 * @private
 * @param {String} pattern Original pattern from which an XRegExp object is being built.
 * @param {String} flags Flags being used to construct the regex.
 * @param {Number} pos Position to search for tokens within `pattern`.
 * @param {Number} scope Regex scope to apply: 'default' or 'class'.
 * @param {Object} context Context object to use for token handler functions.
 * @returns {Object} Object with properties `matchLength`, `output`, and `reparse`; or `null`.
 */
    function runTokens(pattern, flags, pos, scope, context) {
        var i = tokens.length,
            leadChar = pattern.charAt(pos),
            result = null,
            match,
            t;

        // Run in reverse insertion order
        while (i--) {
            t = tokens[i];
            if (
                (t.leadChar && t.leadChar !== leadChar) ||
                (t.scope !== scope && t.scope !== 'all') ||
                (t.flag && flags.indexOf(t.flag) === -1)
            ) {
                continue;
            }

            match = XRegExp$2.exec(pattern, t.regex, pos, 'sticky');
            if (match) {
                result = {
                    matchLength: match[0].length,
                    output: t.handler.call(context, match, scope, flags),
                    reparse: t.reparse
                };
                // Finished with token tests
                break;
            }
        }

        return result;
    }

/**
 * Enables or disables implicit astral mode opt-in. When enabled, flag A is automatically added to
 * all new regexes created by XRegExp. This causes an error to be thrown when creating regexes if
 * the Unicode Base addon is not available, since flag A is registered by that addon.
 *
 * @private
 * @param {Boolean} on `true` to enable; `false` to disable.
 */
    function setAstral(on) {
        features.astral = on;
    }

/**
 * Enables or disables native method overrides.
 *
 * @private
 * @param {Boolean} on `true` to enable; `false` to disable.
 */
    function setNatives(on) {
        RegExp.prototype.exec = (on ? fixed : nativ).exec;
        RegExp.prototype.test = (on ? fixed : nativ).test;
        String.prototype.match = (on ? fixed : nativ).match;
        String.prototype.replace = (on ? fixed : nativ).replace;
        String.prototype.split = (on ? fixed : nativ).split;

        features.natives = on;
    }

/**
 * Returns the object, or throws an error if it is `null` or `undefined`. This is used to follow
 * the ES5 abstract operation `ToObject`.
 *
 * @private
 * @param {*} value Object to check and return.
 * @returns {*} The provided object.
 */
    function toObject(value) {
        // null or undefined
        if (value == null) {
            throw new TypeError('Cannot convert null or undefined to object');
        }

        return value;
    }

/* ==============================
 * Constructor
 * ============================== */

/**
 * Creates an extended regular expression object for matching text with a pattern. Differs from a
 * native regular expression in that additional syntax and flags are supported. The returned object
 * is in fact a native `RegExp` and works with all native methods.
 *
 * @class XRegExp
 * @constructor
 * @param {String|RegExp} pattern Regex pattern string, or an existing regex object to copy.
 * @param {String} [flags] Any combination of flags.
 *   Native flags:
 *     <li>`g` - global
 *     <li>`i` - ignore case
 *     <li>`m` - multiline anchors
 *     <li>`u` - unicode (ES6)
 *     <li>`y` - sticky (Firefox 3+, ES6)
 *   Additional XRegExp flags:
 *     <li>`n` - explicit capture
 *     <li>`s` - dot matches all (aka singleline)
 *     <li>`x` - free-spacing and line comments (aka extended)
 *     <li>`A` - astral (requires the Unicode Base addon)
 *   Flags cannot be provided when constructing one `RegExp` from another.
 * @returns {RegExp} Extended regular expression object.
 * @example
 *
 * // With named capture and flag x
 * XRegExp('(?<year>  [0-9]{4} ) -?  # year  \n\
 *          (?<month> [0-9]{2} ) -?  # month \n\
 *          (?<day>   [0-9]{2} )     # day   ', 'x');
 *
 * // Providing a regex object copies it. Native regexes are recompiled using native (not XRegExp)
 * // syntax. Copies maintain extended data, are augmented with `XRegExp.prototype` properties, and
 * // have fresh `lastIndex` properties (set to zero).
 * XRegExp(/regex/);
 */
    function XRegExp$2(pattern, flags) {
        var context = {
                hasNamedCapture: false,
                captureNames: []
            },
            scope = defaultScope,
            output = '',
            pos = 0,
            result,
            token,
            generated,
            appliedPattern,
            appliedFlags;

        if (XRegExp$2.isRegExp(pattern)) {
            if (flags !== undefined) {
                throw new TypeError('Cannot supply flags when copying a RegExp');
            }
            return copyRegex(pattern);
        }

        // Copy the argument behavior of `RegExp`
        pattern = pattern === undefined ? '' : String(pattern);
        flags = flags === undefined ? '' : String(flags);

        if (XRegExp$2.isInstalled('astral') && flags.indexOf('A') === -1) {
            // This causes an error to be thrown if the Unicode Base addon is not available
            flags += 'A';
        }

        if (!patternCache[pattern]) {
            patternCache[pattern] = {};
        }

        if (!patternCache[pattern][flags]) {
            // Check for flag-related errors, and strip/apply flags in a leading mode modifier
            result = prepareFlags(pattern, flags);
            appliedPattern = result.pattern;
            appliedFlags = result.flags;

            // Use XRegExp's tokens to translate the pattern to a native regex pattern.
            // `appliedPattern.length` may change on each iteration if tokens use `reparse`
            while (pos < appliedPattern.length) {
                do {
                    // Check for custom tokens at the current position
                    result = runTokens(appliedPattern, appliedFlags, pos, scope, context);
                    // If the matched token used the `reparse` option, splice its output into the
                    // pattern before running tokens again at the same position
                    if (result && result.reparse) {
                        appliedPattern = appliedPattern.slice(0, pos) +
                            result.output +
                            appliedPattern.slice(pos + result.matchLength);
                    }
                } while (result && result.reparse);

                if (result) {
                    output += result.output;
                    pos += (result.matchLength || 1);
                } else {
                    // Get the native token at the current position
                    token = XRegExp$2.exec(appliedPattern, nativeTokens[scope], pos, 'sticky')[0];
                    output += token;
                    pos += token.length;
                    if (token === '[' && scope === defaultScope) {
                        scope = classScope;
                    } else if (token === ']' && scope === classScope) {
                        scope = defaultScope;
                    }
                }
            }

            patternCache[pattern][flags] = {
                pattern: output,
                // Strip all but native flags
                flags: nativ.replace.call(appliedFlags, /[^gimuy]+/g, ''),
                // `context.captureNames` has an item for each capturing group, even if unnamed
                captures: context.hasNamedCapture ? context.captureNames : null
            };
        }

        generated = patternCache[pattern][flags];
        return augment(
            new RegExp(generated.pattern, generated.flags),
            generated.captures,
            pattern,
            flags
        );
    }
// Add `RegExp.prototype` to the prototype chain
    XRegExp$2.prototype = new RegExp();

/* ==============================
 * Public properties
 * ============================== */

/**
 * The XRegExp version number as a string containing three dot-separated parts. For example,
 * '2.0.0-beta-3'.
 *
 * @static
 * @memberOf XRegExp
 * @type String
 */
    XRegExp$2.version = '3.1.0';

/* ==============================
 * Public methods
 * ============================== */

// Intentionally undocumented
    XRegExp$2._hasNativeFlag = hasNativeFlag;

/**
 * Extends XRegExp syntax and allows custom flags. This is used internally and can be used to
 * create XRegExp addons. If more than one token can match the same string, the last added wins.
 *
 * @memberOf XRegExp
 * @param {RegExp} regex Regex object that matches the new token.
 * @param {Function} handler Function that returns a new pattern string (using native regex syntax)
 *   to replace the matched token within all future XRegExp regexes. Has access to persistent
 *   properties of the regex being built, through `this`. Invoked with three arguments:
 *   <li>The match array, with named backreference properties.
 *   <li>The regex scope where the match was found: 'default' or 'class'.
 *   <li>The flags used by the regex, including any flags in a leading mode modifier.
 *   The handler function becomes part of the XRegExp construction process, so be careful not to
 *   construct XRegExps within the function or you will trigger infinite recursion.
 * @param {Object} [options] Options object with optional properties:
 *   <li>`scope` {String} Scope where the token applies: 'default', 'class', or 'all'.
 *   <li>`flag` {String} Single-character flag that triggers the token. This also registers the
 *     flag, which prevents XRegExp from throwing an 'unknown flag' error when the flag is used.
 *   <li>`optionalFlags` {String} Any custom flags checked for within the token `handler` that are
 *     not required to trigger the token. This registers the flags, to prevent XRegExp from
 *     throwing an 'unknown flag' error when any of the flags are used.
 *   <li>`reparse` {Boolean} Whether the `handler` function's output should not be treated as
 *     final, and instead be reparseable by other tokens (including the current token). Allows
 *     token chaining or deferring.
 *   <li>`leadChar` {String} Single character that occurs at the beginning of any successful match
 *     of the token (not always applicable). This doesn't change the behavior of the token unless
 *     you provide an erroneous value. However, providing it can increase the token's performance
 *     since the token can be skipped at any positions where this character doesn't appear.
 * @example
 *
 * // Basic usage: Add \a for the ALERT control code
 * XRegExp.addToken(
 *   /\\a/,
 *   function() {return '\\x07';},
 *   {scope: 'all'}
 * );
 * XRegExp('\\a[\\a-\\n]+').test('\x07\n\x07'); // -> true
 *
 * // Add the U (ungreedy) flag from PCRE and RE2, which reverses greedy and lazy quantifiers.
 * // Since `scope` is not specified, it uses 'default' (i.e., transformations apply outside of
 * // character classes only)
 * XRegExp.addToken(
 *   /([?*+]|{\d+(?:,\d*)?})(\??)/,
 *   function(match) {return match[1] + (match[2] ? '' : '?');},
 *   {flag: 'U'}
 * );
 * XRegExp('a+', 'U').exec('aaa')[0]; // -> 'a'
 * XRegExp('a+?', 'U').exec('aaa')[0]; // -> 'aaa'
 */
    XRegExp$2.addToken = function(regex, handler, options) {
        options = options || {};
        var optionalFlags = options.optionalFlags, i;

        if (options.flag) {
            registerFlag(options.flag);
        }

        if (optionalFlags) {
            optionalFlags = nativ.split.call(optionalFlags, '');
            for (i = 0; i < optionalFlags.length; ++i) {
                registerFlag(optionalFlags[i]);
            }
        }

        // Add to the private list of syntax tokens
        tokens.push({
            regex: copyRegex(regex, {
                addG: true,
                addY: hasNativeY,
                isInternalOnly: true
            }),
            handler: handler,
            scope: options.scope || defaultScope,
            flag: options.flag,
            reparse: options.reparse,
            leadChar: options.leadChar
        });

        // Reset the pattern cache used by the `XRegExp` constructor, since the same pattern and
        // flags might now produce different results
        XRegExp$2.cache.flush('patterns');
    };

/**
 * Caches and returns the result of calling `XRegExp(pattern, flags)`. On any subsequent call with
 * the same pattern and flag combination, the cached copy of the regex is returned.
 *
 * @memberOf XRegExp
 * @param {String} pattern Regex pattern string.
 * @param {String} [flags] Any combination of XRegExp flags.
 * @returns {RegExp} Cached XRegExp object.
 * @example
 *
 * while (match = XRegExp.cache('.', 'gs').exec(str)) {
 *   // The regex is compiled once only
 * }
 */
    XRegExp$2.cache = function(pattern, flags) {
        if (!regexCache[pattern]) {
            regexCache[pattern] = {};
        }
        return regexCache[pattern][flags] || (
            regexCache[pattern][flags] = XRegExp$2(pattern, flags)
        );
    };

// Intentionally undocumented
    XRegExp$2.cache.flush = function(cacheName) {
        if (cacheName === 'patterns') {
            // Flush the pattern cache used by the `XRegExp` constructor
            patternCache = {};
        } else {
            // Flush the regex cache populated by `XRegExp.cache`
            regexCache = {};
        }
    };

/**
 * Escapes any regular expression metacharacters, for use when matching literal strings. The result
 * can safely be used at any point within a regex that uses any flags.
 *
 * @memberOf XRegExp
 * @param {String} str String to escape.
 * @returns {String} String with regex metacharacters escaped.
 * @example
 *
 * XRegExp.escape('Escaped? <.>');
 * // -> 'Escaped\?\ <\.>'
 */
    XRegExp$2.escape = function(str) {
        return nativ.replace.call(toObject(str), /[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };

/**
 * Executes a regex search in a specified string. Returns a match array or `null`. If the provided
 * regex uses named capture, named backreference properties are included on the match array.
 * Optional `pos` and `sticky` arguments specify the search start position, and whether the match
 * must start at the specified position only. The `lastIndex` property of the provided regex is not
 * used, but is updated for compatibility. Also fixes browser bugs compared to the native
 * `RegExp.prototype.exec` and can be used reliably cross-browser.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Number} [pos=0] Zero-based index at which to start the search.
 * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
 *   only. The string `'sticky'` is accepted as an alternative to `true`.
 * @returns {Array} Match array with named backreference properties, or `null`.
 * @example
 *
 * // Basic use, with named backreference
 * var match = XRegExp.exec('U+2620', XRegExp('U\\+(?<hex>[0-9A-F]{4})'));
 * match.hex; // -> '2620'
 *
 * // With pos and sticky, in a loop
 * var pos = 2, result = [], match;
 * while (match = XRegExp.exec('<1><2><3><4>5<6>', /<(\d)>/, pos, 'sticky')) {
 *   result.push(match[1]);
 *   pos = match.index + match[0].length;
 * }
 * // result -> ['2', '3', '4']
 */
    XRegExp$2.exec = function(str, regex, pos, sticky) {
        var cacheKey = 'g',
            addY = false,
            match,
            r2;

        addY = hasNativeY && !!(sticky || (regex.sticky && sticky !== false));
        if (addY) {
            cacheKey += 'y';
        }

        regex[REGEX_DATA] = regex[REGEX_DATA] || {};

        // Shares cached copies with `XRegExp.match`/`replace`
        r2 = regex[REGEX_DATA][cacheKey] || (
            regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
                addG: true,
                addY: addY,
                removeY: sticky === false,
                isInternalOnly: true
            })
        );

        r2.lastIndex = pos = pos || 0;

        // Fixed `exec` required for `lastIndex` fix, named backreferences, etc.
        match = fixed.exec.call(r2, str);

        if (sticky && match && match.index !== pos) {
            match = null;
        }

        if (regex.global) {
            regex.lastIndex = match ? r2.lastIndex : 0;
        }

        return match;
    };

/**
 * Executes a provided function once per regex match. Searches always start at the beginning of the
 * string and continue until the end, regardless of the state of the regex's `global` property and
 * initial `lastIndex`.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Function} callback Function to execute for each match. Invoked with four arguments:
 *   <li>The match array, with named backreference properties.
 *   <li>The zero-based match index.
 *   <li>The string being traversed.
 *   <li>The regex object being used to traverse the string.
 * @example
 *
 * // Extracts every other digit from a string
 * var evens = [];
 * XRegExp.forEach('1a2345', /\d/, function(match, i) {
 *   if (i % 2) evens.push(+match[0]);
 * });
 * // evens -> [2, 4]
 */
    XRegExp$2.forEach = function(str, regex, callback) {
        var pos = 0,
            i = -1,
            match;

        while ((match = XRegExp$2.exec(str, regex, pos))) {
            // Because `regex` is provided to `callback`, the function could use the deprecated/
            // nonstandard `RegExp.prototype.compile` to mutate the regex. However, since
            // `XRegExp.exec` doesn't use `lastIndex` to set the search position, this can't lead
            // to an infinite loop, at least. Actually, because of the way `XRegExp.exec` caches
            // globalized versions of regexes, mutating the regex will not have any effect on the
            // iteration or matched strings, which is a nice side effect that brings extra safety
            callback(match, ++i, str, regex);

            pos = match.index + (match[0].length || 1);
        }
    };

/**
 * Copies a regex object and adds flag `g`. The copy maintains extended data, is augmented with
 * `XRegExp.prototype` properties, and has a fresh `lastIndex` property (set to zero). Native
 * regexes are not recompiled using XRegExp syntax.
 *
 * @memberOf XRegExp
 * @param {RegExp} regex Regex to globalize.
 * @returns {RegExp} Copy of the provided regex with flag `g` added.
 * @example
 *
 * var globalCopy = XRegExp.globalize(/regex/);
 * globalCopy.global; // -> true
 */
    XRegExp$2.globalize = function(regex) {
        return copyRegex(regex, {addG: true});
    };

/**
 * Installs optional features according to the specified options. Can be undone using
 * `XRegExp.uninstall`.
 *
 * @memberOf XRegExp
 * @param {Object|String} options Options object or string.
 * @example
 *
 * // With an options object
 * XRegExp.install({
 *   // Enables support for astral code points in Unicode addons (implicitly sets flag A)
 *   astral: true,
 *
 *   // DEPRECATED: Overrides native regex methods with fixed/extended versions
 *   natives: true
 * });
 *
 * // With an options string
 * XRegExp.install('astral natives');
 */
    XRegExp$2.install = function(options) {
        options = prepareOptions(options);

        if (!features.astral && options.astral) {
            setAstral(true);
        }

        if (!features.natives && options.natives) {
            setNatives(true);
        }
    };

/**
 * Checks whether an individual optional feature is installed.
 *
 * @memberOf XRegExp
 * @param {String} feature Name of the feature to check. One of:
 *   <li>`astral`
 *   <li>`natives`
 * @returns {Boolean} Whether the feature is installed.
 * @example
 *
 * XRegExp.isInstalled('astral');
 */
    XRegExp$2.isInstalled = function(feature) {
        return !!(features[feature]);
    };

/**
 * Returns `true` if an object is a regex; `false` if it isn't. This works correctly for regexes
 * created in another frame, when `instanceof` and `constructor` checks would fail.
 *
 * @memberOf XRegExp
 * @param {*} value Object to check.
 * @returns {Boolean} Whether the object is a `RegExp` object.
 * @example
 *
 * XRegExp.isRegExp('string'); // -> false
 * XRegExp.isRegExp(/regex/i); // -> true
 * XRegExp.isRegExp(RegExp('^', 'm')); // -> true
 * XRegExp.isRegExp(XRegExp('(?s).')); // -> true
 */
    XRegExp$2.isRegExp = function(value) {
        return toString.call(value) === '[object RegExp]';
        //return isType(value, 'RegExp');
    };

/**
 * Returns the first matched string, or in global mode, an array containing all matched strings.
 * This is essentially a more convenient re-implementation of `String.prototype.match` that gives
 * the result types you actually want (string instead of `exec`-style array in match-first mode,
 * and an empty array instead of `null` when no matches are found in match-all mode). It also lets
 * you override flag g and ignore `lastIndex`, and fixes browser bugs.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {String} [scope='one'] Use 'one' to return the first match as a string. Use 'all' to
 *   return an array of all matched strings. If not explicitly specified and `regex` uses flag g,
 *   `scope` is 'all'.
 * @returns {String|Array} In match-first mode: First match as a string, or `null`. In match-all
 *   mode: Array of all matched strings, or an empty array.
 * @example
 *
 * // Match first
 * XRegExp.match('abc', /\w/); // -> 'a'
 * XRegExp.match('abc', /\w/g, 'one'); // -> 'a'
 * XRegExp.match('abc', /x/g, 'one'); // -> null
 *
 * // Match all
 * XRegExp.match('abc', /\w/g); // -> ['a', 'b', 'c']
 * XRegExp.match('abc', /\w/, 'all'); // -> ['a', 'b', 'c']
 * XRegExp.match('abc', /x/, 'all'); // -> []
 */
    XRegExp$2.match = function(str, regex, scope) {
        var global = (regex.global && scope !== 'one') || scope === 'all',
            cacheKey = ((global ? 'g' : '') + (regex.sticky ? 'y' : '')) || 'noGY',
            result,
            r2;

        regex[REGEX_DATA] = regex[REGEX_DATA] || {};

        // Shares cached copies with `XRegExp.exec`/`replace`
        r2 = regex[REGEX_DATA][cacheKey] || (
            regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
                addG: !!global,
                removeG: scope === 'one',
                isInternalOnly: true
            })
        );

        result = nativ.match.call(toObject(str), r2);

        if (regex.global) {
            regex.lastIndex = (
                (scope === 'one' && result) ?
                    // Can't use `r2.lastIndex` since `r2` is nonglobal in this case
                    (result.index + result[0].length) : 0
            );
        }

        return global ? (result || []) : (result && result[0]);
    };

/**
 * Retrieves the matches from searching a string using a chain of regexes that successively search
 * within previous matches. The provided `chain` array can contain regexes and or objects with
 * `regex` and `backref` properties. When a backreference is specified, the named or numbered
 * backreference is passed forward to the next regex or returned.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {Array} chain Regexes that each search for matches within preceding results.
 * @returns {Array} Matches by the last regex in the chain, or an empty array.
 * @example
 *
 * // Basic usage; matches numbers within <b> tags
 * XRegExp.matchChain('1 <b>2</b> 3 <b>4 a 56</b>', [
 *   XRegExp('(?is)<b>.*?</b>'),
 *   /\d+/
 * ]);
 * // -> ['2', '4', '56']
 *
 * // Passing forward and returning specific backreferences
 * html = '<a href="http://xregexp.com/api/">XRegExp</a>\
 *         <a href="http://www.google.com/">Google</a>';
 * XRegExp.matchChain(html, [
 *   {regex: /<a href="([^"]+)">/i, backref: 1},
 *   {regex: XRegExp('(?i)^https?://(?<domain>[^/?#]+)'), backref: 'domain'}
 * ]);
 * // -> ['xregexp.com', 'www.google.com']
 */
    XRegExp$2.matchChain = function(str, chain) {
        return (function recurseChain(values, level) {
            var item = chain[level].regex ? chain[level] : {regex: chain[level]},
                matches = [],
                addMatch = function(match) {
                    if (item.backref) {
                        /* Safari 4.0.5 (but not 5.0.5+) inappropriately uses sparse arrays to hold
                         * the `undefined`s for backreferences to nonparticipating capturing
                         * groups. In such cases, a `hasOwnProperty` or `in` check on its own would
                         * inappropriately throw the exception, so also check if the backreference
                         * is a number that is within the bounds of the array.
                         */
                        if (!(match.hasOwnProperty(item.backref) || +item.backref < match.length)) {
                            throw new ReferenceError('Backreference to undefined group: ' + item.backref);
                        }

                        matches.push(match[item.backref] || '');
                    } else {
                        matches.push(match[0]);
                    }
                },
                i;

            for (i = 0; i < values.length; ++i) {
                XRegExp$2.forEach(values[i], item.regex, addMatch);
            }

            return ((level === chain.length - 1) || !matches.length) ?
                matches :
                recurseChain(matches, level + 1);
        }([str], 0));
    };

/**
 * Returns a new string with one or all matches of a pattern replaced. The pattern can be a string
 * or regex, and the replacement can be a string or a function to be called for each match. To
 * perform a global search and replace, use the optional `scope` argument or include flag g if using
 * a regex. Replacement strings can use `${n}` for named and numbered backreferences. Replacement
 * functions can use named backreferences via `arguments[0].name`. Also fixes browser bugs compared
 * to the native `String.prototype.replace` and can be used reliably cross-browser.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp|String} search Search pattern to be replaced.
 * @param {String|Function} replacement Replacement string or a function invoked to create it.
 *   Replacement strings can include special replacement syntax:
 *     <li>$$ - Inserts a literal $ character.
 *     <li>$&, $0 - Inserts the matched substring.
 *     <li>$` - Inserts the string that precedes the matched substring (left context).
 *     <li>$' - Inserts the string that follows the matched substring (right context).
 *     <li>$n, $nn - Where n/nn are digits referencing an existent capturing group, inserts
 *       backreference n/nn.
 *     <li>${n} - Where n is a name or any number of digits that reference an existent capturing
 *       group, inserts backreference n.
 *   Replacement functions are invoked with three or more arguments:
 *     <li>The matched substring (corresponds to $& above). Named backreferences are accessible as
 *       properties of this first argument.
 *     <li>0..n arguments, one for each backreference (corresponding to $1, $2, etc. above).
 *     <li>The zero-based index of the match within the total search string.
 *     <li>The total string being searched.
 * @param {String} [scope='one'] Use 'one' to replace the first match only, or 'all'. If not
 *   explicitly specified and using a regex with flag g, `scope` is 'all'.
 * @returns {String} New string with one or all matches replaced.
 * @example
 *
 * // Regex search, using named backreferences in replacement string
 * var name = XRegExp('(?<first>\\w+) (?<last>\\w+)');
 * XRegExp.replace('John Smith', name, '${last}, ${first}');
 * // -> 'Smith, John'
 *
 * // Regex search, using named backreferences in replacement function
 * XRegExp.replace('John Smith', name, function(match) {
 *   return match.last + ', ' + match.first;
 * });
 * // -> 'Smith, John'
 *
 * // String search, with replace-all
 * XRegExp.replace('RegExp builds RegExps', 'RegExp', 'XRegExp', 'all');
 * // -> 'XRegExp builds XRegExps'
 */
    XRegExp$2.replace = function(str, search, replacement, scope) {
        var isRegex = XRegExp$2.isRegExp(search),
            global = (search.global && scope !== 'one') || scope === 'all',
            cacheKey = ((global ? 'g' : '') + (search.sticky ? 'y' : '')) || 'noGY',
            s2 = search,
            result;

        if (isRegex) {
            search[REGEX_DATA] = search[REGEX_DATA] || {};

            // Shares cached copies with `XRegExp.exec`/`match`. Since a copy is used, `search`'s
            // `lastIndex` isn't updated *during* replacement iterations
            s2 = search[REGEX_DATA][cacheKey] || (
                search[REGEX_DATA][cacheKey] = copyRegex(search, {
                    addG: !!global,
                    removeG: scope === 'one',
                    isInternalOnly: true
                })
            );
        } else if (global) {
            s2 = new RegExp(XRegExp$2.escape(String(search)), 'g');
        }

        // Fixed `replace` required for named backreferences, etc.
        result = fixed.replace.call(toObject(str), s2, replacement);

        if (isRegex && search.global) {
            // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
            search.lastIndex = 0;
        }

        return result;
    };

/**
 * Performs batch processing of string replacements. Used like `XRegExp.replace`, but accepts an
 * array of replacement details. Later replacements operate on the output of earlier replacements.
 * Replacement details are accepted as an array with a regex or string to search for, the
 * replacement string or function, and an optional scope of 'one' or 'all'. Uses the XRegExp
 * replacement text syntax, which supports named backreference properties via `${name}`.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {Array} replacements Array of replacement detail arrays.
 * @returns {String} New string with all replacements.
 * @example
 *
 * str = XRegExp.replaceEach(str, [
 *   [XRegExp('(?<name>a)'), 'z${name}'],
 *   [/b/gi, 'y'],
 *   [/c/g, 'x', 'one'], // scope 'one' overrides /g
 *   [/d/, 'w', 'all'],  // scope 'all' overrides lack of /g
 *   ['e', 'v', 'all'],  // scope 'all' allows replace-all for strings
 *   [/f/g, function($0) {
 *     return $0.toUpperCase();
 *   }]
 * ]);
 */
    XRegExp$2.replaceEach = function(str, replacements) {
        var i, r;

        for (i = 0; i < replacements.length; ++i) {
            r = replacements[i];
            str = XRegExp$2.replace(str, r[0], r[1], r[2]);
        }

        return str;
    };

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 *
 * @memberOf XRegExp
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * XRegExp.split('a b c', ' ');
 * // -> ['a', 'b', 'c']
 *
 * // With limit
 * XRegExp.split('a b c', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * XRegExp.split('..word1..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', '..']
 */
    XRegExp$2.split = function(str, separator, limit) {
        return fixed.split.call(toObject(str), separator, limit);
    };

/**
 * Executes a regex search in a specified string. Returns `true` or `false`. Optional `pos` and
 * `sticky` arguments specify the search start position, and whether the match must start at the
 * specified position only. The `lastIndex` property of the provided regex is not used, but is
 * updated for compatibility. Also fixes browser bugs compared to the native
 * `RegExp.prototype.test` and can be used reliably cross-browser.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Number} [pos=0] Zero-based index at which to start the search.
 * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
 *   only. The string `'sticky'` is accepted as an alternative to `true`.
 * @returns {Boolean} Whether the regex matched the provided value.
 * @example
 *
 * // Basic use
 * XRegExp.test('abc', /c/); // -> true
 *
 * // With pos and sticky
 * XRegExp.test('abc', /c/, 0, 'sticky'); // -> false
 * XRegExp.test('abc', /c/, 2, 'sticky'); // -> true
 */
    XRegExp$2.test = function(str, regex, pos, sticky) {
        // Do this the easy way :-)
        return !!XRegExp$2.exec(str, regex, pos, sticky);
    };

/**
 * Uninstalls optional features according to the specified options. All optional features start out
 * uninstalled, so this is used to undo the actions of `XRegExp.install`.
 *
 * @memberOf XRegExp
 * @param {Object|String} options Options object or string.
 * @example
 *
 * // With an options object
 * XRegExp.uninstall({
 *   // Disables support for astral code points in Unicode addons
 *   astral: true,
 *
 *   // DEPRECATED: Restores native regex methods
 *   natives: true
 * });
 *
 * // With an options string
 * XRegExp.uninstall('astral natives');
 */
    XRegExp$2.uninstall = function(options) {
        options = prepareOptions(options);

        if (features.astral && options.astral) {
            setAstral(false);
        }

        if (features.natives && options.natives) {
            setNatives(false);
        }
    };

/**
 * Returns an XRegExp object that is the union of the given patterns. Patterns can be provided as
 * regex objects or strings. Metacharacters are escaped in patterns provided as strings.
 * Backreferences in provided regex objects are automatically renumbered to work correctly within
 * the larger combined pattern. Native flags used by provided regexes are ignored in favor of the
 * `flags` argument.
 *
 * @memberOf XRegExp
 * @param {Array} patterns Regexes and strings to combine.
 * @param {String} [flags] Any combination of XRegExp flags.
 * @returns {RegExp} Union of the provided regexes and strings.
 * @example
 *
 * XRegExp.union(['a+b*c', /(dogs)\1/, /(cats)\1/], 'i');
 * // -> /a\+b\*c|(dogs)\1|(cats)\2/i
 */
    XRegExp$2.union = function(patterns, flags) {
        var parts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,
            output = [],
            numCaptures = 0,
            numPriorCaptures,
            captureNames,
            pattern,
            rewrite = function(match, paren, backref) {
                var name = captureNames[numCaptures - numPriorCaptures];

                // Capturing group
                if (paren) {
                    ++numCaptures;
                    // If the current capture has a name, preserve the name
                    if (name) {
                        return '(?<' + name + '>';
                    }
                // Backreference
                } else if (backref) {
                    // Rewrite the backreference
                    return '\\' + (+backref + numPriorCaptures);
                }

                return match;
            },
            i;

        if (!(isType(patterns, 'Array') && patterns.length)) {
            throw new TypeError('Must provide a nonempty array of patterns to merge');
        }

        for (i = 0; i < patterns.length; ++i) {
            pattern = patterns[i];

            if (XRegExp$2.isRegExp(pattern)) {
                numPriorCaptures = numCaptures;
                captureNames = (pattern[REGEX_DATA] && pattern[REGEX_DATA].captureNames) || [];

                // Rewrite backreferences. Passing to XRegExp dies on octals and ensures patterns
                // are independently valid; helps keep this simple. Named captures are put back
                output.push(nativ.replace.call(XRegExp$2(pattern.source).source, parts, rewrite));
            } else {
                output.push(XRegExp$2.escape(pattern));
            }
        }

        return XRegExp$2(output.join('|'), flags);
    };

/* ==============================
 * Fixed/extended native methods
 * ============================== */

/**
 * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
 * bugs in the native `RegExp.prototype.exec`. Calling `XRegExp.install('natives')` uses this to
 * override the native method. Use via `XRegExp.exec` without overriding natives.
 *
 * @private
 * @param {String} str String to search.
 * @returns {Array} Match array with named backreference properties, or `null`.
 */
    fixed.exec = function(str) {
        var origLastIndex = this.lastIndex,
            match = nativ.exec.apply(this, arguments),
            name,
            r2,
            i;

        if (match) {
            // Fix browsers whose `exec` methods don't return `undefined` for nonparticipating
            // capturing groups. This fixes IE 5.5-8, but not IE 9's quirks mode or emulation of
            // older IEs. IE 9 in standards mode follows the spec
            if (!correctExecNpcg && match.length > 1 && indexOf(match, '') > -1) {
                r2 = copyRegex(this, {
                    removeG: true,
                    isInternalOnly: true
                });
                // Using `str.slice(match.index)` rather than `match[0]` in case lookahead allowed
                // matching due to characters outside the match
                nativ.replace.call(String(str).slice(match.index), r2, function() {
                    var len = arguments.length, i;
                    // Skip index 0 and the last 2
                    for (i = 1; i < len - 2; ++i) {
                        if (arguments[i] === undefined) {
                            match[i] = undefined;
                        }
                    }
                });
            }

            // Attach named capture properties
            if (this[REGEX_DATA] && this[REGEX_DATA].captureNames) {
                // Skip index 0
                for (i = 1; i < match.length; ++i) {
                    name = this[REGEX_DATA].captureNames[i - 1];
                    if (name) {
                        match[name] = match[i];
                    }
                }
            }

            // Fix browsers that increment `lastIndex` after zero-length matches
            if (this.global && !match[0].length && (this.lastIndex > match.index)) {
                this.lastIndex = match.index;
            }
        }

        if (!this.global) {
            // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
            this.lastIndex = origLastIndex;
        }

        return match;
    };

/**
 * Fixes browser bugs in the native `RegExp.prototype.test`. Calling `XRegExp.install('natives')`
 * uses this to override the native method.
 *
 * @private
 * @param {String} str String to search.
 * @returns {Boolean} Whether the regex matched the provided value.
 */
    fixed.test = function(str) {
        // Do this the easy way :-)
        return !!fixed.exec.call(this, str);
    };

/**
 * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
 * bugs in the native `String.prototype.match`. Calling `XRegExp.install('natives')` uses this to
 * override the native method.
 *
 * @private
 * @param {RegExp|*} regex Regex to search with. If not a regex object, it is passed to `RegExp`.
 * @returns {Array} If `regex` uses flag g, an array of match strings or `null`. Without flag g,
 *   the result of calling `regex.exec(this)`.
 */
    fixed.match = function(regex) {
        var result;

        if (!XRegExp$2.isRegExp(regex)) {
            // Use the native `RegExp` rather than `XRegExp`
            regex = new RegExp(regex);
        } else if (regex.global) {
            result = nativ.match.apply(this, arguments);
            // Fixes IE bug
            regex.lastIndex = 0;

            return result;
        }

        return fixed.exec.call(regex, toObject(this));
    };

/**
 * Adds support for `${n}` tokens for named and numbered backreferences in replacement text, and
 * provides named backreferences to replacement functions as `arguments[0].name`. Also fixes browser
 * bugs in replacement text syntax when performing a replacement using a nonregex search value, and
 * the value of a replacement regex's `lastIndex` property during replacement iterations and upon
 * completion. Calling `XRegExp.install('natives')` uses this to override the native method. Note
 * that this doesn't support SpiderMonkey's proprietary third (`flags`) argument. Use via
 * `XRegExp.replace` without overriding natives.
 *
 * @private
 * @param {RegExp|String} search Search pattern to be replaced.
 * @param {String|Function} replacement Replacement string or a function invoked to create it.
 * @returns {String} New string with one or all matches replaced.
 */
    fixed.replace = function(search, replacement) {
        var isRegex = XRegExp$2.isRegExp(search),
            origLastIndex,
            captureNames,
            result;

        if (isRegex) {
            if (search[REGEX_DATA]) {
                captureNames = search[REGEX_DATA].captureNames;
            }
            // Only needed if `search` is nonglobal
            origLastIndex = search.lastIndex;
        } else {
            search += ''; // Type-convert
        }

        // Don't use `typeof`; some older browsers return 'function' for regex objects
        if (isType(replacement, 'Function')) {
            // Stringifying `this` fixes a bug in IE < 9 where the last argument in replacement
            // functions isn't type-converted to a string
            result = nativ.replace.call(String(this), search, function() {
                var args = arguments, i;
                if (captureNames) {
                    // Change the `arguments[0]` string primitive to a `String` object that can
                    // store properties. This really does need to use `String` as a constructor
                    args[0] = new String(args[0]);
                    // Store named backreferences on the first argument
                    for (i = 0; i < captureNames.length; ++i) {
                        if (captureNames[i]) {
                            args[0][captureNames[i]] = args[i + 1];
                        }
                    }
                }
                // Update `lastIndex` before calling `replacement`. Fixes IE, Chrome, Firefox,
                // Safari bug (last tested IE 9, Chrome 17, Firefox 11, Safari 5.1)
                if (isRegex && search.global) {
                    search.lastIndex = args[args.length - 2] + args[0].length;
                }
                // ES6 specs the context for replacement functions as `undefined`
                return replacement.apply(undefined, args);
            });
        } else {
            // Ensure that the last value of `args` will be a string when given nonstring `this`,
            // while still throwing on null or undefined context
            result = nativ.replace.call(this == null ? this : String(this), search, function() {
                // Keep this function's `arguments` available through closure
                var args = arguments;
                return nativ.replace.call(String(replacement), replacementToken, function($0, $1, $2) {
                    var n;
                    // Named or numbered backreference with curly braces
                    if ($1) {
                        // XRegExp behavior for `${n}`:
                        // 1. Backreference to numbered capture, if `n` is an integer. Use `0` for
                        //    for the entire match. Any number of leading zeros may be used.
                        // 2. Backreference to named capture `n`, if it exists and is not an
                        //    integer overridden by numbered capture. In practice, this does not
                        //    overlap with numbered capture since XRegExp does not allow named
                        //    capture to use a bare integer as the name.
                        // 3. If the name or number does not refer to an existing capturing group,
                        //    it's an error.
                        n = +$1; // Type-convert; drop leading zeros
                        if (n <= args.length - 3) {
                            return args[n] || '';
                        }
                        // Groups with the same name is an error, else would need `lastIndexOf`
                        n = captureNames ? indexOf(captureNames, $1) : -1;
                        if (n < 0) {
                            throw new SyntaxError('Backreference to undefined group ' + $0);
                        }
                        return args[n + 1] || '';
                    }
                    // Else, special variable or numbered backreference without curly braces
                    if ($2 === '$') { // $$
                        return '$';
                    }
                    if ($2 === '&' || +$2 === 0) { // $&, $0 (not followed by 1-9), $00
                        return args[0];
                    }
                    if ($2 === '`') { // $` (left context)
                        return args[args.length - 1].slice(0, args[args.length - 2]);
                    }
                    if ($2 === "'") { // $' (right context)
                        return args[args.length - 1].slice(args[args.length - 2] + args[0].length);
                    }
                    // Else, numbered backreference without curly braces
                    $2 = +$2; // Type-convert; drop leading zero
                    // XRegExp behavior for `$n` and `$nn`:
                    // - Backrefs end after 1 or 2 digits. Use `${..}` for more digits.
                    // - `$1` is an error if no capturing groups.
                    // - `$10` is an error if less than 10 capturing groups. Use `${1}0` instead.
                    // - `$01` is `$1` if at least one capturing group, else it's an error.
                    // - `$0` (not followed by 1-9) and `$00` are the entire match.
                    // Native behavior, for comparison:
                    // - Backrefs end after 1 or 2 digits. Cannot reference capturing group 100+.
                    // - `$1` is a literal `$1` if no capturing groups.
                    // - `$10` is `$1` followed by a literal `0` if less than 10 capturing groups.
                    // - `$01` is `$1` if at least one capturing group, else it's a literal `$01`.
                    // - `$0` is a literal `$0`.
                    if (!isNaN($2)) {
                        if ($2 > args.length - 3) {
                            throw new SyntaxError('Backreference to undefined group ' + $0);
                        }
                        return args[$2] || '';
                    }
                    // `$` followed by an unsupported char is an error, unlike native JS
                    throw new SyntaxError('Invalid token ' + $0);
                });
            });
        }

        if (isRegex) {
            if (search.global) {
                // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
                search.lastIndex = 0;
            } else {
                // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
                search.lastIndex = origLastIndex;
            }
        }

        return result;
    };

/**
 * Fixes browser bugs in the native `String.prototype.split`. Calling `XRegExp.install('natives')`
 * uses this to override the native method. Use via `XRegExp.split` without overriding natives.
 *
 * @private
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 */
    fixed.split = function(separator, limit) {
        if (!XRegExp$2.isRegExp(separator)) {
            // Browsers handle nonregex split correctly, so use the faster native method
            return nativ.split.apply(this, arguments);
        }

        var str = String(this),
            output = [],
            origLastIndex = separator.lastIndex,
            lastLastIndex = 0,
            lastLength;

        // Values for `limit`, per the spec:
        // If undefined: pow(2,32) - 1
        // If 0, Infinity, or NaN: 0
        // If positive number: limit = floor(limit); if (limit >= pow(2,32)) limit -= pow(2,32);
        // If negative number: pow(2,32) - floor(abs(limit))
        // If other: Type-convert, then use the above rules
        // This line fails in very strange ways for some values of `limit` in Opera 10.5-10.63,
        // unless Opera Dragonfly is open (go figure). It works in at least Opera 9.5-10.1 and 11+
        limit = (limit === undefined ? -1 : limit) >>> 0;

        XRegExp$2.forEach(str, separator, function(match) {
            // This condition is not the same as `if (match[0].length)`
            if ((match.index + match[0].length) > lastLastIndex) {
                output.push(str.slice(lastLastIndex, match.index));
                if (match.length > 1 && match.index < str.length) {
                    Array.prototype.push.apply(output, match.slice(1));
                }
                lastLength = match[0].length;
                lastLastIndex = match.index + lastLength;
            }
        });

        if (lastLastIndex === str.length) {
            if (!nativ.test.call(separator, '') || lastLength) {
                output.push('');
            }
        } else {
            output.push(str.slice(lastLastIndex));
        }

        separator.lastIndex = origLastIndex;
        return output.length > limit ? output.slice(0, limit) : output;
    };

/* ==============================
 * Built-in syntax/flag tokens
 * ============================== */

/*
 * Letter escapes that natively match literal characters: `\a`, `\A`, etc. These should be
 * SyntaxErrors but are allowed in web reality. XRegExp makes them errors for cross-browser
 * consistency and to reserve their syntax, but lets them be superseded by addons.
 */
    XRegExp$2.addToken(
        /\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4}|{[\dA-Fa-f]+})|x(?![\dA-Fa-f]{2}))/,
        function(match, scope) {
            // \B is allowed in default scope only
            if (match[1] === 'B' && scope === defaultScope) {
                return match[0];
            }
            throw new SyntaxError('Invalid escape ' + match[0]);
        },
        {
            scope: 'all',
            leadChar: '\\'
        }
    );

/*
 * Unicode code point escape with curly braces: `\u{N..}`. `N..` is any one or more digit
 * hexadecimal number from 0-10FFFF, and can include leading zeros. Requires the native ES6 `u` flag
 * to support code points greater than U+FFFF. Avoids converting code points above U+FFFF to
 * surrogate pairs (which could be done without flag `u`), since that could lead to broken behavior
 * if you follow a `\u{N..}` token that references a code point above U+FFFF with a quantifier, or
 * if you use the same in a character class.
 */
    XRegExp$2.addToken(
        /\\u{([\dA-Fa-f]+)}/,
        function(match, scope, flags) {
            var code = dec(match[1]);
            if (code > 0x10FFFF) {
                throw new SyntaxError('Invalid Unicode code point ' + match[0]);
            }
            if (code <= 0xFFFF) {
                // Converting to \uNNNN avoids needing to escape the literal character and keep it
                // separate from preceding tokens
                return '\\u' + pad4(hex(code));
            }
            // If `code` is between 0xFFFF and 0x10FFFF, require and defer to native handling
            if (hasNativeU && flags.indexOf('u') > -1) {
                return match[0];
            }
            throw new SyntaxError('Cannot use Unicode code point above \\u{FFFF} without flag u');
        },
        {
            scope: 'all',
            leadChar: '\\'
        }
    );

/*
 * Empty character class: `[]` or `[^]`. This fixes a critical cross-browser syntax inconsistency.
 * Unless this is standardized (per the ES spec), regex syntax can't be accurately parsed because
 * character class endings can't be determined.
 */
    XRegExp$2.addToken(
        /\[(\^?)]/,
        function(match) {
            // For cross-browser compatibility with ES3, convert [] to \b\B and [^] to [\s\S].
            // (?!) should work like \b\B, but is unreliable in some versions of Firefox
            return match[1] ? '[\\s\\S]' : '\\b\\B';
        },
        {leadChar: '['}
    );

/*
 * Comment pattern: `(?# )`. Inline comments are an alternative to the line comments allowed in
 * free-spacing mode (flag x).
 */
    XRegExp$2.addToken(
        /\(\?#[^)]*\)/,
        function(match, scope, flags) {
            // Keep tokens separated unless the following token is a quantifier
            return isQuantifierNext(match.input, match.index + match[0].length, flags) ?
                '' : '(?:)';
        },
        {leadChar: '('}
    );

/*
 * Whitespace and line comments, in free-spacing mode (aka extended mode, flag x) only.
 */
    XRegExp$2.addToken(
        /\s+|#.*/,
        function(match, scope, flags) {
            // Keep tokens separated unless the following token is a quantifier
            return isQuantifierNext(match.input, match.index + match[0].length, flags) ?
                '' : '(?:)';
        },
        {flag: 'x'}
    );

/*
 * Dot, in dotall mode (aka singleline mode, flag s) only.
 */
    XRegExp$2.addToken(
        /\./,
        function() {
            return '[\\s\\S]';
        },
        {
            flag: 's',
            leadChar: '.'
        }
    );

/*
 * Named backreference: `\k<name>`. Backreference names can use the characters A-Z, a-z, 0-9, _,
 * and $ only. Also allows numbered backreferences as `\k<n>`.
 */
    XRegExp$2.addToken(
        /\\k<([\w$]+)>/,
        function(match) {
            // Groups with the same name is an error, else would need `lastIndexOf`
            var index = isNaN(match[1]) ? (indexOf(this.captureNames, match[1]) + 1) : +match[1],
                endIndex = match.index + match[0].length;
            if (!index || index > this.captureNames.length) {
                throw new SyntaxError('Backreference to undefined group ' + match[0]);
            }
            // Keep backreferences separate from subsequent literal numbers
            return '\\' + index + (
                endIndex === match.input.length || isNaN(match.input.charAt(endIndex)) ?
                    '' : '(?:)'
            );
        },
        {leadChar: '\\'}
    );

/*
 * Numbered backreference or octal, plus any following digits: `\0`, `\11`, etc. Octals except `\0`
 * not followed by 0-9 and backreferences to unopened capture groups throw an error. Other matches
 * are returned unaltered. IE < 9 doesn't support backreferences above `\99` in regex syntax.
 */
    XRegExp$2.addToken(
        /\\(\d+)/,
        function(match, scope) {
            if (
                !(
                    scope === defaultScope &&
                    /^[1-9]/.test(match[1]) &&
                    +match[1] <= this.captureNames.length
                ) &&
                match[1] !== '0'
            ) {
                throw new SyntaxError('Cannot use octal escape or backreference to undefined group ' +
                    match[0]);
            }
            return match[0];
        },
        {
            scope: 'all',
            leadChar: '\\'
        }
    );

/*
 * Named capturing group; match the opening delimiter only: `(?<name>`. Capture names can use the
 * characters A-Z, a-z, 0-9, _, and $ only. Names can't be integers. Supports Python-style
 * `(?P<name>` as an alternate syntax to avoid issues in some older versions of Opera which natively
 * supported the Python-style syntax. Otherwise, XRegExp might treat numbered backreferences to
 * Python-style named capture as octals.
 */
    XRegExp$2.addToken(
        /\(\?P?<([\w$]+)>/,
        function(match) {
            // Disallow bare integers as names because named backreferences are added to match
            // arrays and therefore numeric properties may lead to incorrect lookups
            if (!isNaN(match[1])) {
                throw new SyntaxError('Cannot use integer as capture name ' + match[0]);
            }
            if (match[1] === 'length' || match[1] === '__proto__') {
                throw new SyntaxError('Cannot use reserved word as capture name ' + match[0]);
            }
            if (indexOf(this.captureNames, match[1]) > -1) {
                throw new SyntaxError('Cannot use same name for multiple groups ' + match[0]);
            }
            this.captureNames.push(match[1]);
            this.hasNamedCapture = true;
            return '(';
        },
        {leadChar: '('}
    );

/*
 * Capturing group; match the opening parenthesis only. Required for support of named capturing
 * groups. Also adds explicit capture mode (flag n).
 */
    XRegExp$2.addToken(
        /\((?!\?)/,
        function(match, scope, flags) {
            if (flags.indexOf('n') > -1) {
                return '(?:';
            }
            this.captureNames.push(null);
            return '(';
        },
        {
            optionalFlags: 'n',
            leadChar: '('
        }
    );

/* ==============================
 * Expose XRegExp
 * ============================== */

    var xregexp = XRegExp$2;

/*!
 * XRegExp.build 3.1.0
 * <xregexp.com>
 * Steven Levithan (c) 2012-2016 MIT License
 * Inspired by Lea Verou's RegExp.create <lea.verou.me>
 */

var build = function(XRegExp) {

    var REGEX_DATA = 'xregexp',
        subParts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,
        parts = XRegExp.union([/\({{([\w$]+)}}\)|{{([\w$]+)}}/, subParts], 'g');

/**
 * Strips a leading `^` and trailing unescaped `$`, if both are present.
 *
 * @private
 * @param {String} pattern Pattern to process.
 * @returns {String} Pattern with edge anchors removed.
 */
    function deanchor(pattern) {
        // Allow any number of empty noncapturing groups before/after anchors, because regexes
        // built/generated by XRegExp sometimes include them
        var leadingAnchor = /^(?:\(\?:\))*\^/,
            trailingAnchor = /\$(?:\(\?:\))*$/;

        if (
            leadingAnchor.test(pattern) &&
            trailingAnchor.test(pattern) &&
            // Ensure that the trailing `$` isn't escaped
            trailingAnchor.test(pattern.replace(/\\[\s\S]/g, ''))
        ) {
            return pattern.replace(leadingAnchor, '').replace(trailingAnchor, '');
        }

        return pattern;
    }

/**
 * Converts the provided value to an XRegExp. Native RegExp flags are not preserved.
 *
 * @private
 * @param {String|RegExp} value Value to convert.
 * @returns {RegExp} XRegExp object with XRegExp syntax applied.
 */
    function asXRegExp(value) {
        return XRegExp.isRegExp(value) ?
            (value[REGEX_DATA] && value[REGEX_DATA].captureNames ?
                // Don't recompile, to preserve capture names
                value :
                // Recompile as XRegExp
                XRegExp(value.source)
            ) :
            // Compile string as XRegExp
            XRegExp(value);
    }

/**
 * Builds regexes using named subpatterns, for readability and pattern reuse. Backreferences in the
 * outer pattern and provided subpatterns are automatically renumbered to work correctly. Native
 * flags used by provided subpatterns are ignored in favor of the `flags` argument.
 *
 * @memberOf XRegExp
 * @param {String} pattern XRegExp pattern using `{{name}}` for embedded subpatterns. Allows
 *   `({{name}})` as shorthand for `(?<name>{{name}})`. Patterns cannot be embedded within
 *   character classes.
 * @param {Object} subs Lookup object for named subpatterns. Values can be strings or regexes. A
 *   leading `^` and trailing unescaped `$` are stripped from subpatterns, if both are present.
 * @param {String} [flags] Any combination of XRegExp flags.
 * @returns {RegExp} Regex with interpolated subpatterns.
 * @example
 *
 * var time = XRegExp.build('(?x)^ {{hours}} ({{minutes}}) $', {
 *   hours: XRegExp.build('{{h12}} : | {{h24}}', {
 *     h12: /1[0-2]|0?[1-9]/,
 *     h24: /2[0-3]|[01][0-9]/
 *   }, 'x'),
 *   minutes: /^[0-5][0-9]$/
 * });
 * time.test('10:59'); // -> true
 * XRegExp.exec('10:59', time).minutes; // -> '59'
 */
    XRegExp.build = function(pattern, subs, flags) {
        var inlineFlags = /^\(\?([\w$]+)\)/.exec(pattern),
            data = {},
            numCaps = 0, // 'Caps' is short for captures
            numPriorCaps,
            numOuterCaps = 0,
            outerCapsMap = [0],
            outerCapNames,
            sub,
            p;

        // Add flags within a leading mode modifier to the overall pattern's flags
        if (inlineFlags) {
            flags = flags || '';
            inlineFlags[1].replace(/./g, function(flag) {
                // Don't add duplicates
                flags += (flags.indexOf(flag) > -1 ? '' : flag);
            });
        }

        for (p in subs) {
            if (subs.hasOwnProperty(p)) {
                // Passing to XRegExp enables extended syntax and ensures independent validity,
                // lest an unescaped `(`, `)`, `[`, or trailing `\` breaks the `(?:)` wrapper. For
                // subpatterns provided as native regexes, it dies on octals and adds the property
                // used to hold extended regex instance data, for simplicity
                sub = asXRegExp(subs[p]);
                data[p] = {
                    // Deanchoring allows embedding independently useful anchored regexes. If you
                    // really need to keep your anchors, double them (i.e., `^^...$$`)
                    pattern: deanchor(sub.source),
                    names: sub[REGEX_DATA].captureNames || []
                };
            }
        }

        // Passing to XRegExp dies on octals and ensures the outer pattern is independently valid;
        // helps keep this simple. Named captures will be put back
        pattern = asXRegExp(pattern);
        outerCapNames = pattern[REGEX_DATA].captureNames || [];
        pattern = pattern.source.replace(parts, function($0, $1, $2, $3, $4) {
            var subName = $1 || $2,
                capName,
                intro,
                localCapIndex;
            // Named subpattern
            if (subName) {
                if (!data.hasOwnProperty(subName)) {
                    throw new ReferenceError('Undefined property ' + $0);
                }
                // Named subpattern was wrapped in a capturing group
                if ($1) {
                    capName = outerCapNames[numOuterCaps];
                    outerCapsMap[++numOuterCaps] = ++numCaps;
                    // If it's a named group, preserve the name. Otherwise, use the subpattern name
                    // as the capture name
                    intro = '(?<' + (capName || subName) + '>';
                } else {
                    intro = '(?:';
                }
                numPriorCaps = numCaps;
                return intro + data[subName].pattern.replace(subParts, function(match, paren, backref) {
                    // Capturing group
                    if (paren) {
                        capName = data[subName].names[numCaps - numPriorCaps];
                        ++numCaps;
                        // If the current capture has a name, preserve the name
                        if (capName) {
                            return '(?<' + capName + '>';
                        }
                    // Backreference
                    } else if (backref) {
                        localCapIndex = +backref - 1;
                        // Rewrite the backreference
                        return data[subName].names[localCapIndex] ?
                            // Need to preserve the backreference name in case using flag `n`
                            '\\k<' + data[subName].names[localCapIndex] + '>' :
                            '\\' + (+backref + numPriorCaps);
                    }
                    return match;
                }) + ')';
            }
            // Capturing group
            if ($3) {
                capName = outerCapNames[numOuterCaps];
                outerCapsMap[++numOuterCaps] = ++numCaps;
                // If the current capture has a name, preserve the name
                if (capName) {
                    return '(?<' + capName + '>';
                }
            // Backreference
            } else if ($4) {
                localCapIndex = +$4 - 1;
                // Rewrite the backreference
                return outerCapNames[localCapIndex] ?
                    // Need to preserve the backreference name in case using flag `n`
                    '\\k<' + outerCapNames[localCapIndex] + '>' :
                    '\\' + outerCapsMap[+$4];
            }
            return $0;
        });

        return XRegExp(pattern, flags);
    };

};

/*!
 * XRegExp.matchRecursive 3.1.0
 * <xregexp.com>
 * Steven Levithan (c) 2009-2016 MIT License
 */

var matchrecursive = function(XRegExp) {

/**
 * Returns a match detail object composed of the provided values.
 *
 * @private
 */
    function row(name, value, start, end) {
        return {
            name: name,
            value: value,
            start: start,
            end: end
        };
    }

/**
 * Returns an array of match strings between outermost left and right delimiters, or an array of
 * objects with detailed match parts and position data. An error is thrown if delimiters are
 * unbalanced within the data.
 *
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {String} left Left delimiter as an XRegExp pattern.
 * @param {String} right Right delimiter as an XRegExp pattern.
 * @param {String} [flags] Any native or XRegExp flags, used for the left and right delimiters.
 * @param {Object} [options] Lets you specify `valueNames` and `escapeChar` options.
 * @returns {Array} Array of matches, or an empty array.
 * @example
 *
 * // Basic usage
 * var str = '(t((e))s)t()(ing)';
 * XRegExp.matchRecursive(str, '\\(', '\\)', 'g');
 * // -> ['t((e))s', '', 'ing']
 *
 * // Extended information mode with valueNames
 * str = 'Here is <div> <div>an</div></div> example';
 * XRegExp.matchRecursive(str, '<div\\s*>', '</div>', 'gi', {
 *   valueNames: ['between', 'left', 'match', 'right']
 * });
 * // -> [
 * // {name: 'between', value: 'Here is ',       start: 0,  end: 8},
 * // {name: 'left',    value: '<div>',          start: 8,  end: 13},
 * // {name: 'match',   value: ' <div>an</div>', start: 13, end: 27},
 * // {name: 'right',   value: '</div>',         start: 27, end: 33},
 * // {name: 'between', value: ' example',       start: 33, end: 41}
 * // ]
 *
 * // Omitting unneeded parts with null valueNames, and using escapeChar
 * str = '...{1}.\\{{function(x,y){return {y:x}}}';
 * XRegExp.matchRecursive(str, '{', '}', 'g', {
 *   valueNames: ['literal', null, 'value', null],
 *   escapeChar: '\\'
 * });
 * // -> [
 * // {name: 'literal', value: '...',  start: 0, end: 3},
 * // {name: 'value',   value: '1',    start: 4, end: 5},
 * // {name: 'literal', value: '.\\{', start: 6, end: 9},
 * // {name: 'value',   value: 'function(x,y){return {y:x}}', start: 10, end: 37}
 * // ]
 *
 * // Sticky mode via flag y
 * str = '<1><<<2>>><3>4<5>';
 * XRegExp.matchRecursive(str, '<', '>', 'gy');
 * // -> ['1', '<<2>>', '3']
 */
    XRegExp.matchRecursive = function(str, left, right, flags, options) {
        flags = flags || '';
        options = options || {};
        var global = flags.indexOf('g') > -1,
            sticky = flags.indexOf('y') > -1,
            // Flag `y` is controlled internally
            basicFlags = flags.replace(/y/g, ''),
            escapeChar = options.escapeChar,
            vN = options.valueNames,
            output = [],
            openTokens = 0,
            delimStart = 0,
            delimEnd = 0,
            lastOuterEnd = 0,
            outerStart,
            innerStart,
            leftMatch,
            rightMatch,
            esc;
        left = XRegExp(left, basicFlags);
        right = XRegExp(right, basicFlags);

        if (escapeChar) {
            if (escapeChar.length > 1) {
                throw new Error('Cannot use more than one escape character');
            }
            escapeChar = XRegExp.escape(escapeChar);
            // Using `XRegExp.union` safely rewrites backreferences in `left` and `right`
            esc = new RegExp(
                '(?:' + escapeChar + '[\\S\\s]|(?:(?!' +
                    XRegExp.union([left, right]).source +
                    ')[^' + escapeChar + '])+)+',
                // Flags `gy` not needed here
                flags.replace(/[^imu]+/g, '')
            );
        }

        while (true) {
            // If using an escape character, advance to the delimiter's next starting position,
            // skipping any escaped characters in between
            if (escapeChar) {
                delimEnd += (XRegExp.exec(str, esc, delimEnd, 'sticky') || [''])[0].length;
            }
            leftMatch = XRegExp.exec(str, left, delimEnd);
            rightMatch = XRegExp.exec(str, right, delimEnd);
            // Keep the leftmost match only
            if (leftMatch && rightMatch) {
                if (leftMatch.index <= rightMatch.index) {
                    rightMatch = null;
                } else {
                    leftMatch = null;
                }
            }
            // Paths (LM: leftMatch, RM: rightMatch, OT: openTokens):
            // LM | RM | OT | Result
            // 1  | 0  | 1  | loop
            // 1  | 0  | 0  | loop
            // 0  | 1  | 1  | loop
            // 0  | 1  | 0  | throw
            // 0  | 0  | 1  | throw
            // 0  | 0  | 0  | break
            // The paths above don't include the sticky mode special case. The loop ends after the
            // first completed match if not `global`.
            if (leftMatch || rightMatch) {
                delimStart = (leftMatch || rightMatch).index;
                delimEnd = delimStart + (leftMatch || rightMatch)[0].length;
            } else if (!openTokens) {
                break;
            }
            if (sticky && !openTokens && delimStart > lastOuterEnd) {
                break;
            }
            if (leftMatch) {
                if (!openTokens) {
                    outerStart = delimStart;
                    innerStart = delimEnd;
                }
                ++openTokens;
            } else if (rightMatch && openTokens) {
                if (!--openTokens) {
                    if (vN) {
                        if (vN[0] && outerStart > lastOuterEnd) {
                            output.push(row(vN[0], str.slice(lastOuterEnd, outerStart), lastOuterEnd, outerStart));
                        }
                        if (vN[1]) {
                            output.push(row(vN[1], str.slice(outerStart, innerStart), outerStart, innerStart));
                        }
                        if (vN[2]) {
                            output.push(row(vN[2], str.slice(innerStart, delimStart), innerStart, delimStart));
                        }
                        if (vN[3]) {
                            output.push(row(vN[3], str.slice(delimStart, delimEnd), delimStart, delimEnd));
                        }
                    } else {
                        output.push(str.slice(innerStart, delimStart));
                    }
                    lastOuterEnd = delimEnd;
                    if (!global) {
                        break;
                    }
                }
            } else {
                throw new Error('Unbalanced delimiter found in string');
            }
            // If the delimiter matched an empty string, avoid an infinite loop
            if (delimStart === delimEnd) {
                ++delimEnd;
            }
        }

        if (global && !sticky && vN && vN[0] && str.length > lastOuterEnd) {
            output.push(row(vN[0], str.slice(lastOuterEnd), lastOuterEnd, str.length));
        }

        return output;
    };

};

/*!
 * XRegExp Unicode Base 3.1.0
 * <xregexp.com>
 * Steven Levithan (c) 2008-2016 MIT License
 */

/**
 * Adds base support for Unicode matching:
 * - Adds syntax `\p{..}` for matching Unicode tokens. Tokens can be inverted using `\P{..}` or
 *   `\p{^..}`. Token names ignore case, spaces, hyphens, and underscores. You can omit the braces
 *   for token names that are a single letter (e.g. `\pL` or `PL`).
 * - Adds flag A (astral), which enables 21-bit Unicode support.
 * - Adds the `XRegExp.addUnicodeData` method used by other addons to provide character data.
 *
 * Unicode Base relies on externally provided Unicode character data. Official addons are available
 * to provide data for Unicode categories, scripts, blocks, and properties.
 *
 * @requires XRegExp
 */
var unicodeBase = function(XRegExp) {

// Storage for Unicode data
    var unicode = {};

/* ==============================
 * Private functions
 * ============================== */

// Generates a token lookup name: lowercase, with hyphens, spaces, and underscores removed
    function normalize(name) {
        return name.replace(/[- _]+/g, '').toLowerCase();
    }

// Adds leading zeros if shorter than four characters
    function pad4(str) {
        while (str.length < 4) {
            str = '0' + str;
        }
        return str;
    }

// Converts a hexadecimal number to decimal
    function dec(hex) {
        return parseInt(hex, 16);
    }

// Converts a decimal number to hexadecimal
    function hex(dec) {
        return parseInt(dec, 10).toString(16);
    }

// Gets the decimal code of a literal code unit, \xHH, \uHHHH, or a backslash-escaped literal
    function charCode(chr) {
        var esc = /^\\[xu](.+)/.exec(chr);
        return esc ?
            dec(esc[1]) :
            chr.charCodeAt(chr.charAt(0) === '\\' ? 1 : 0);
    }

// Inverts a list of ordered BMP characters and ranges
    function invertBmp(range) {
        var output = '',
            lastEnd = -1,
            start;
        XRegExp.forEach(range, /(\\x..|\\u....|\\?[\s\S])(?:-(\\x..|\\u....|\\?[\s\S]))?/, function(m) {
            start = charCode(m[1]);
            if (start > (lastEnd + 1)) {
                output += '\\u' + pad4(hex(lastEnd + 1));
                if (start > (lastEnd + 2)) {
                    output += '-\\u' + pad4(hex(start - 1));
                }
            }
            lastEnd = charCode(m[2] || m[1]);
        });
        if (lastEnd < 0xFFFF) {
            output += '\\u' + pad4(hex(lastEnd + 1));
            if (lastEnd < 0xFFFE) {
                output += '-\\uFFFF';
            }
        }
        return output;
    }

// Generates an inverted BMP range on first use
    function cacheInvertedBmp(slug) {
        var prop = 'b!';
        return unicode[slug][prop] || (
            unicode[slug][prop] = invertBmp(unicode[slug].bmp)
        );
    }

// Combines and optionally negates BMP and astral data
    function buildAstral(slug, isNegated) {
        var item = unicode[slug],
            combined = '';
        if (item.bmp && !item.isBmpLast) {
            combined = '[' + item.bmp + ']' + (item.astral ? '|' : '');
        }
        if (item.astral) {
            combined += item.astral;
        }
        if (item.isBmpLast && item.bmp) {
            combined += (item.astral ? '|' : '') + '[' + item.bmp + ']';
        }
        // Astral Unicode tokens always match a code point, never a code unit
        return isNegated ?
            '(?:(?!' + combined + ')(?:[\uD800-\uDBFF][\uDC00-\uDFFF]|[\0-\uFFFF]))' :
            '(?:' + combined + ')';
    }

// Builds a complete astral pattern on first use
    function cacheAstral(slug, isNegated) {
        var prop = isNegated ? 'a!' : 'a=';
        return unicode[slug][prop] || (
            unicode[slug][prop] = buildAstral(slug, isNegated)
        );
    }

/* ==============================
 * Core functionality
 * ============================== */

/*
 * Add Unicode token syntax: \p{..}, \P{..}, \p{^..}. Also add astral mode (flag A).
 */
    XRegExp.addToken(
        // Use `*` instead of `+` to avoid capturing `^` as the token name in `\p{^}`
        /\\([pP])(?:{(\^?)([^}]*)}|([A-Za-z]))/,
        function(match, scope, flags) {
            var ERR_DOUBLE_NEG = 'Invalid double negation ',
                ERR_UNKNOWN_NAME = 'Unknown Unicode token ',
                ERR_UNKNOWN_REF = 'Unicode token missing data ',
                ERR_ASTRAL_ONLY = 'Astral mode required for Unicode token ',
                ERR_ASTRAL_IN_CLASS = 'Astral mode does not support Unicode tokens within character classes',
                // Negated via \P{..} or \p{^..}
                isNegated = match[1] === 'P' || !!match[2],
                // Switch from BMP (0-FFFF) to astral (0-10FFFF) mode via flag A
                isAstralMode = flags.indexOf('A') > -1,
                // Token lookup name. Check `[4]` first to avoid passing `undefined` via `\p{}`
                slug = normalize(match[4] || match[3]),
                // Token data object
                item = unicode[slug];

            if (match[1] === 'P' && match[2]) {
                throw new SyntaxError(ERR_DOUBLE_NEG + match[0]);
            }
            if (!unicode.hasOwnProperty(slug)) {
                throw new SyntaxError(ERR_UNKNOWN_NAME + match[0]);
            }

            // Switch to the negated form of the referenced Unicode token
            if (item.inverseOf) {
                slug = normalize(item.inverseOf);
                if (!unicode.hasOwnProperty(slug)) {
                    throw new ReferenceError(ERR_UNKNOWN_REF + match[0] + ' -> ' + item.inverseOf);
                }
                item = unicode[slug];
                isNegated = !isNegated;
            }

            if (!(item.bmp || isAstralMode)) {
                throw new SyntaxError(ERR_ASTRAL_ONLY + match[0]);
            }
            if (isAstralMode) {
                if (scope === 'class') {
                    throw new SyntaxError(ERR_ASTRAL_IN_CLASS);
                }

                return cacheAstral(slug, isNegated);
            }

            return scope === 'class' ?
                (isNegated ? cacheInvertedBmp(slug) : item.bmp) :
                (isNegated ? '[^' : '[') + item.bmp + ']';
        },
        {
            scope: 'all',
            optionalFlags: 'A',
            leadChar: '\\'
        }
    );

/**
 * Adds to the list of Unicode tokens that XRegExp regexes can match via `\p` or `\P`.
 *
 * @memberOf XRegExp
 * @param {Array} data Objects with named character ranges. Each object may have properties `name`,
 *   `alias`, `isBmpLast`, `inverseOf`, `bmp`, and `astral`. All but `name` are optional, although
 *   one of `bmp` or `astral` is required (unless `inverseOf` is set). If `astral` is absent, the
 *   `bmp` data is used for BMP and astral modes. If `bmp` is absent, the name errors in BMP mode
 *   but works in astral mode. If both `bmp` and `astral` are provided, the `bmp` data only is used
 *   in BMP mode, and the combination of `bmp` and `astral` data is used in astral mode.
 *   `isBmpLast` is needed when a token matches orphan high surrogates *and* uses surrogate pairs
 *   to match astral code points. The `bmp` and `astral` data should be a combination of literal
 *   characters and `\xHH` or `\uHHHH` escape sequences, with hyphens to create ranges. Any regex
 *   metacharacters in the data should be escaped, apart from range-creating hyphens. The `astral`
 *   data can additionally use character classes and alternation, and should use surrogate pairs to
 *   represent astral code points. `inverseOf` can be used to avoid duplicating character data if a
 *   Unicode token is defined as the exact inverse of another token.
 * @example
 *
 * // Basic use
 * XRegExp.addUnicodeData([{
 *   name: 'XDigit',
 *   alias: 'Hexadecimal',
 *   bmp: '0-9A-Fa-f'
 * }]);
 * XRegExp('\\p{XDigit}:\\p{Hexadecimal}+').test('0:3D'); // -> true
 */
    XRegExp.addUnicodeData = function(data) {
        var ERR_NO_NAME = 'Unicode token requires name',
            ERR_NO_DATA = 'Unicode token has no character data ',
            item,
            i;

        for (i = 0; i < data.length; ++i) {
            item = data[i];
            if (!item.name) {
                throw new Error(ERR_NO_NAME);
            }
            if (!(item.inverseOf || item.bmp || item.astral)) {
                throw new Error(ERR_NO_DATA + item.name);
            }
            unicode[normalize(item.name)] = item;
            if (item.alias) {
                unicode[normalize(item.alias)] = item;
            }
        }

        // Reset the pattern cache used by the `XRegExp` constructor, since the same pattern and
        // flags might now produce different results
        XRegExp.cache.flush('patterns');
    };

};

/*!
 * XRegExp Unicode Blocks 3.1.0
 * <xregexp.com>
 * Steven Levithan (c) 2010-2016 MIT License
 * Unicode data by Mathias Bynens <mathiasbynens.be>
 */

/**
 * Adds support for all Unicode blocks. Block names use the prefix 'In'. E.g., `\p{InBasicLatin}`.
 * Token names are case insensitive, and any spaces, hyphens, and underscores are ignored.
 *
 * Uses Unicode 8.0.0.
 *
 * @requires XRegExp, Unicode Base
 */
var unicodeBlocks = function(XRegExp) {

    if (!XRegExp.addUnicodeData) {
        throw new ReferenceError('Unicode Base must be loaded before Unicode Blocks');
    }

    XRegExp.addUnicodeData([
        {
            name: 'InAegean_Numbers',
            astral: '\uD800[\uDD00-\uDD3F]'
        },
        {
            name: 'InAhom',
            astral: '\uD805[\uDF00-\uDF3F]'
        },
        {
            name: 'InAlchemical_Symbols',
            astral: '\uD83D[\uDF00-\uDF7F]'
        },
        {
            name: 'InAlphabetic_Presentation_Forms',
            bmp: '\uFB00-\uFB4F'
        },
        {
            name: 'InAnatolian_Hieroglyphs',
            astral: '\uD811[\uDC00-\uDE7F]'
        },
        {
            name: 'InAncient_Greek_Musical_Notation',
            astral: '\uD834[\uDE00-\uDE4F]'
        },
        {
            name: 'InAncient_Greek_Numbers',
            astral: '\uD800[\uDD40-\uDD8F]'
        },
        {
            name: 'InAncient_Symbols',
            astral: '\uD800[\uDD90-\uDDCF]'
        },
        {
            name: 'InArabic',
            bmp: '\u0600-\u06FF'
        },
        {
            name: 'InArabic_Extended_A',
            bmp: '\u08A0-\u08FF'
        },
        {
            name: 'InArabic_Mathematical_Alphabetic_Symbols',
            astral: '\uD83B[\uDE00-\uDEFF]'
        },
        {
            name: 'InArabic_Presentation_Forms_A',
            bmp: '\uFB50-\uFDFF'
        },
        {
            name: 'InArabic_Presentation_Forms_B',
            bmp: '\uFE70-\uFEFF'
        },
        {
            name: 'InArabic_Supplement',
            bmp: '\u0750-\u077F'
        },
        {
            name: 'InArmenian',
            bmp: '\u0530-\u058F'
        },
        {
            name: 'InArrows',
            bmp: '\u2190-\u21FF'
        },
        {
            name: 'InAvestan',
            astral: '\uD802[\uDF00-\uDF3F]'
        },
        {
            name: 'InBalinese',
            bmp: '\u1B00-\u1B7F'
        },
        {
            name: 'InBamum',
            bmp: '\uA6A0-\uA6FF'
        },
        {
            name: 'InBamum_Supplement',
            astral: '\uD81A[\uDC00-\uDE3F]'
        },
        {
            name: 'InBasic_Latin',
            bmp: '\0-\x7F'
        },
        {
            name: 'InBassa_Vah',
            astral: '\uD81A[\uDED0-\uDEFF]'
        },
        {
            name: 'InBatak',
            bmp: '\u1BC0-\u1BFF'
        },
        {
            name: 'InBengali',
            bmp: '\u0980-\u09FF'
        },
        {
            name: 'InBlock_Elements',
            bmp: '\u2580-\u259F'
        },
        {
            name: 'InBopomofo',
            bmp: '\u3100-\u312F'
        },
        {
            name: 'InBopomofo_Extended',
            bmp: '\u31A0-\u31BF'
        },
        {
            name: 'InBox_Drawing',
            bmp: '\u2500-\u257F'
        },
        {
            name: 'InBrahmi',
            astral: '\uD804[\uDC00-\uDC7F]'
        },
        {
            name: 'InBraille_Patterns',
            bmp: '\u2800-\u28FF'
        },
        {
            name: 'InBuginese',
            bmp: '\u1A00-\u1A1F'
        },
        {
            name: 'InBuhid',
            bmp: '\u1740-\u175F'
        },
        {
            name: 'InByzantine_Musical_Symbols',
            astral: '\uD834[\uDC00-\uDCFF]'
        },
        {
            name: 'InCJK_Compatibility',
            bmp: '\u3300-\u33FF'
        },
        {
            name: 'InCJK_Compatibility_Forms',
            bmp: '\uFE30-\uFE4F'
        },
        {
            name: 'InCJK_Compatibility_Ideographs',
            bmp: '\uF900-\uFAFF'
        },
        {
            name: 'InCJK_Compatibility_Ideographs_Supplement',
            astral: '\uD87E[\uDC00-\uDE1F]'
        },
        {
            name: 'InCJK_Radicals_Supplement',
            bmp: '\u2E80-\u2EFF'
        },
        {
            name: 'InCJK_Strokes',
            bmp: '\u31C0-\u31EF'
        },
        {
            name: 'InCJK_Symbols_and_Punctuation',
            bmp: '\u3000-\u303F'
        },
        {
            name: 'InCJK_Unified_Ideographs',
            bmp: '\u4E00-\u9FFF'
        },
        {
            name: 'InCJK_Unified_Ideographs_Extension_A',
            bmp: '\u3400-\u4DBF'
        },
        {
            name: 'InCJK_Unified_Ideographs_Extension_B',
            astral: '[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF]'
        },
        {
            name: 'InCJK_Unified_Ideographs_Extension_C',
            astral: '\uD86D[\uDC00-\uDF3F]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD869[\uDF00-\uDFFF]'
        },
        {
            name: 'InCJK_Unified_Ideographs_Extension_D',
            astral: '\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F]'
        },
        {
            name: 'InCJK_Unified_Ideographs_Extension_E',
            astral: '[\uD86F-\uD872][\uDC00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD86E[\uDC20-\uDFFF]'
        },
        {
            name: 'InCarian',
            astral: '\uD800[\uDEA0-\uDEDF]'
        },
        {
            name: 'InCaucasian_Albanian',
            astral: '\uD801[\uDD30-\uDD6F]'
        },
        {
            name: 'InChakma',
            astral: '\uD804[\uDD00-\uDD4F]'
        },
        {
            name: 'InCham',
            bmp: '\uAA00-\uAA5F'
        },
        {
            name: 'InCherokee',
            bmp: '\u13A0-\u13FF'
        },
        {
            name: 'InCherokee_Supplement',
            bmp: '\uAB70-\uABBF'
        },
        {
            name: 'InCombining_Diacritical_Marks',
            bmp: '\u0300-\u036F'
        },
        {
            name: 'InCombining_Diacritical_Marks_Extended',
            bmp: '\u1AB0-\u1AFF'
        },
        {
            name: 'InCombining_Diacritical_Marks_Supplement',
            bmp: '\u1DC0-\u1DFF'
        },
        {
            name: 'InCombining_Diacritical_Marks_for_Symbols',
            bmp: '\u20D0-\u20FF'
        },
        {
            name: 'InCombining_Half_Marks',
            bmp: '\uFE20-\uFE2F'
        },
        {
            name: 'InCommon_Indic_Number_Forms',
            bmp: '\uA830-\uA83F'
        },
        {
            name: 'InControl_Pictures',
            bmp: '\u2400-\u243F'
        },
        {
            name: 'InCoptic',
            bmp: '\u2C80-\u2CFF'
        },
        {
            name: 'InCoptic_Epact_Numbers',
            astral: '\uD800[\uDEE0-\uDEFF]'
        },
        {
            name: 'InCounting_Rod_Numerals',
            astral: '\uD834[\uDF60-\uDF7F]'
        },
        {
            name: 'InCuneiform',
            astral: '\uD808[\uDC00-\uDFFF]'
        },
        {
            name: 'InCuneiform_Numbers_and_Punctuation',
            astral: '\uD809[\uDC00-\uDC7F]'
        },
        {
            name: 'InCurrency_Symbols',
            bmp: '\u20A0-\u20CF'
        },
        {
            name: 'InCypriot_Syllabary',
            astral: '\uD802[\uDC00-\uDC3F]'
        },
        {
            name: 'InCyrillic',
            bmp: '\u0400-\u04FF'
        },
        {
            name: 'InCyrillic_Extended_A',
            bmp: '\u2DE0-\u2DFF'
        },
        {
            name: 'InCyrillic_Extended_B',
            bmp: '\uA640-\uA69F'
        },
        {
            name: 'InCyrillic_Supplement',
            bmp: '\u0500-\u052F'
        },
        {
            name: 'InDeseret',
            astral: '\uD801[\uDC00-\uDC4F]'
        },
        {
            name: 'InDevanagari',
            bmp: '\u0900-\u097F'
        },
        {
            name: 'InDevanagari_Extended',
            bmp: '\uA8E0-\uA8FF'
        },
        {
            name: 'InDingbats',
            bmp: '\u2700-\u27BF'
        },
        {
            name: 'InDomino_Tiles',
            astral: '\uD83C[\uDC30-\uDC9F]'
        },
        {
            name: 'InDuployan',
            astral: '\uD82F[\uDC00-\uDC9F]'
        },
        {
            name: 'InEarly_Dynastic_Cuneiform',
            astral: '\uD809[\uDC80-\uDD4F]'
        },
        {
            name: 'InEgyptian_Hieroglyphs',
            astral: '\uD80C[\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F]'
        },
        {
            name: 'InElbasan',
            astral: '\uD801[\uDD00-\uDD2F]'
        },
        {
            name: 'InEmoticons',
            astral: '\uD83D[\uDE00-\uDE4F]'
        },
        {
            name: 'InEnclosed_Alphanumeric_Supplement',
            astral: '\uD83C[\uDD00-\uDDFF]'
        },
        {
            name: 'InEnclosed_Alphanumerics',
            bmp: '\u2460-\u24FF'
        },
        {
            name: 'InEnclosed_CJK_Letters_and_Months',
            bmp: '\u3200-\u32FF'
        },
        {
            name: 'InEnclosed_Ideographic_Supplement',
            astral: '\uD83C[\uDE00-\uDEFF]'
        },
        {
            name: 'InEthiopic',
            bmp: '\u1200-\u137F'
        },
        {
            name: 'InEthiopic_Extended',
            bmp: '\u2D80-\u2DDF'
        },
        {
            name: 'InEthiopic_Extended_A',
            bmp: '\uAB00-\uAB2F'
        },
        {
            name: 'InEthiopic_Supplement',
            bmp: '\u1380-\u139F'
        },
        {
            name: 'InGeneral_Punctuation',
            bmp: '\u2000-\u206F'
        },
        {
            name: 'InGeometric_Shapes',
            bmp: '\u25A0-\u25FF'
        },
        {
            name: 'InGeometric_Shapes_Extended',
            astral: '\uD83D[\uDF80-\uDFFF]'
        },
        {
            name: 'InGeorgian',
            bmp: '\u10A0-\u10FF'
        },
        {
            name: 'InGeorgian_Supplement',
            bmp: '\u2D00-\u2D2F'
        },
        {
            name: 'InGlagolitic',
            bmp: '\u2C00-\u2C5F'
        },
        {
            name: 'InGothic',
            astral: '\uD800[\uDF30-\uDF4F]'
        },
        {
            name: 'InGrantha',
            astral: '\uD804[\uDF00-\uDF7F]'
        },
        {
            name: 'InGreek_Extended',
            bmp: '\u1F00-\u1FFF'
        },
        {
            name: 'InGreek_and_Coptic',
            bmp: '\u0370-\u03FF'
        },
        {
            name: 'InGujarati',
            bmp: '\u0A80-\u0AFF'
        },
        {
            name: 'InGurmukhi',
            bmp: '\u0A00-\u0A7F'
        },
        {
            name: 'InHalfwidth_and_Fullwidth_Forms',
            bmp: '\uFF00-\uFFEF'
        },
        {
            name: 'InHangul_Compatibility_Jamo',
            bmp: '\u3130-\u318F'
        },
        {
            name: 'InHangul_Jamo',
            bmp: '\u1100-\u11FF'
        },
        {
            name: 'InHangul_Jamo_Extended_A',
            bmp: '\uA960-\uA97F'
        },
        {
            name: 'InHangul_Jamo_Extended_B',
            bmp: '\uD7B0-\uD7FF'
        },
        {
            name: 'InHangul_Syllables',
            bmp: '\uAC00-\uD7AF'
        },
        {
            name: 'InHanunoo',
            bmp: '\u1720-\u173F'
        },
        {
            name: 'InHatran',
            astral: '\uD802[\uDCE0-\uDCFF]'
        },
        {
            name: 'InHebrew',
            bmp: '\u0590-\u05FF'
        },
        {
            name: 'InHigh_Private_Use_Surrogates',
            bmp: '\uDB80-\uDBFF'
        },
        {
            name: 'InHigh_Surrogates',
            bmp: '\uD800-\uDB7F'
        },
        {
            name: 'InHiragana',
            bmp: '\u3040-\u309F'
        },
        {
            name: 'InIPA_Extensions',
            bmp: '\u0250-\u02AF'
        },
        {
            name: 'InIdeographic_Description_Characters',
            bmp: '\u2FF0-\u2FFF'
        },
        {
            name: 'InImperial_Aramaic',
            astral: '\uD802[\uDC40-\uDC5F]'
        },
        {
            name: 'InInscriptional_Pahlavi',
            astral: '\uD802[\uDF60-\uDF7F]'
        },
        {
            name: 'InInscriptional_Parthian',
            astral: '\uD802[\uDF40-\uDF5F]'
        },
        {
            name: 'InJavanese',
            bmp: '\uA980-\uA9DF'
        },
        {
            name: 'InKaithi',
            astral: '\uD804[\uDC80-\uDCCF]'
        },
        {
            name: 'InKana_Supplement',
            astral: '\uD82C[\uDC00-\uDCFF]'
        },
        {
            name: 'InKanbun',
            bmp: '\u3190-\u319F'
        },
        {
            name: 'InKangxi_Radicals',
            bmp: '\u2F00-\u2FDF'
        },
        {
            name: 'InKannada',
            bmp: '\u0C80-\u0CFF'
        },
        {
            name: 'InKatakana',
            bmp: '\u30A0-\u30FF'
        },
        {
            name: 'InKatakana_Phonetic_Extensions',
            bmp: '\u31F0-\u31FF'
        },
        {
            name: 'InKayah_Li',
            bmp: '\uA900-\uA92F'
        },
        {
            name: 'InKharoshthi',
            astral: '\uD802[\uDE00-\uDE5F]'
        },
        {
            name: 'InKhmer',
            bmp: '\u1780-\u17FF'
        },
        {
            name: 'InKhmer_Symbols',
            bmp: '\u19E0-\u19FF'
        },
        {
            name: 'InKhojki',
            astral: '\uD804[\uDE00-\uDE4F]'
        },
        {
            name: 'InKhudawadi',
            astral: '\uD804[\uDEB0-\uDEFF]'
        },
        {
            name: 'InLao',
            bmp: '\u0E80-\u0EFF'
        },
        {
            name: 'InLatin_Extended_Additional',
            bmp: '\u1E00-\u1EFF'
        },
        {
            name: 'InLatin_Extended_A',
            bmp: '\u0100-\u017F'
        },
        {
            name: 'InLatin_Extended_B',
            bmp: '\u0180-\u024F'
        },
        {
            name: 'InLatin_Extended_C',
            bmp: '\u2C60-\u2C7F'
        },
        {
            name: 'InLatin_Extended_D',
            bmp: '\uA720-\uA7FF'
        },
        {
            name: 'InLatin_Extended_E',
            bmp: '\uAB30-\uAB6F'
        },
        {
            name: 'InLatin_1_Supplement',
            bmp: '\x80-\xFF'
        },
        {
            name: 'InLepcha',
            bmp: '\u1C00-\u1C4F'
        },
        {
            name: 'InLetterlike_Symbols',
            bmp: '\u2100-\u214F'
        },
        {
            name: 'InLimbu',
            bmp: '\u1900-\u194F'
        },
        {
            name: 'InLinear_A',
            astral: '\uD801[\uDE00-\uDF7F]'
        },
        {
            name: 'InLinear_B_Ideograms',
            astral: '\uD800[\uDC80-\uDCFF]'
        },
        {
            name: 'InLinear_B_Syllabary',
            astral: '\uD800[\uDC00-\uDC7F]'
        },
        {
            name: 'InLisu',
            bmp: '\uA4D0-\uA4FF'
        },
        {
            name: 'InLow_Surrogates',
            bmp: '\uDC00-\uDFFF'
        },
        {
            name: 'InLycian',
            astral: '\uD800[\uDE80-\uDE9F]'
        },
        {
            name: 'InLydian',
            astral: '\uD802[\uDD20-\uDD3F]'
        },
        {
            name: 'InMahajani',
            astral: '\uD804[\uDD50-\uDD7F]'
        },
        {
            name: 'InMahjong_Tiles',
            astral: '\uD83C[\uDC00-\uDC2F]'
        },
        {
            name: 'InMalayalam',
            bmp: '\u0D00-\u0D7F'
        },
        {
            name: 'InMandaic',
            bmp: '\u0840-\u085F'
        },
        {
            name: 'InManichaean',
            astral: '\uD802[\uDEC0-\uDEFF]'
        },
        {
            name: 'InMathematical_Alphanumeric_Symbols',
            astral: '\uD835[\uDC00-\uDFFF]'
        },
        {
            name: 'InMathematical_Operators',
            bmp: '\u2200-\u22FF'
        },
        {
            name: 'InMeetei_Mayek',
            bmp: '\uABC0-\uABFF'
        },
        {
            name: 'InMeetei_Mayek_Extensions',
            bmp: '\uAAE0-\uAAFF'
        },
        {
            name: 'InMende_Kikakui',
            astral: '\uD83A[\uDC00-\uDCDF]'
        },
        {
            name: 'InMeroitic_Cursive',
            astral: '\uD802[\uDDA0-\uDDFF]'
        },
        {
            name: 'InMeroitic_Hieroglyphs',
            astral: '\uD802[\uDD80-\uDD9F]'
        },
        {
            name: 'InMiao',
            astral: '\uD81B[\uDF00-\uDF9F]'
        },
        {
            name: 'InMiscellaneous_Mathematical_Symbols_A',
            bmp: '\u27C0-\u27EF'
        },
        {
            name: 'InMiscellaneous_Mathematical_Symbols_B',
            bmp: '\u2980-\u29FF'
        },
        {
            name: 'InMiscellaneous_Symbols',
            bmp: '\u2600-\u26FF'
        },
        {
            name: 'InMiscellaneous_Symbols_and_Arrows',
            bmp: '\u2B00-\u2BFF'
        },
        {
            name: 'InMiscellaneous_Symbols_and_Pictographs',
            astral: '\uD83D[\uDC00-\uDDFF]|\uD83C[\uDF00-\uDFFF]'
        },
        {
            name: 'InMiscellaneous_Technical',
            bmp: '\u2300-\u23FF'
        },
        {
            name: 'InModi',
            astral: '\uD805[\uDE00-\uDE5F]'
        },
        {
            name: 'InModifier_Tone_Letters',
            bmp: '\uA700-\uA71F'
        },
        {
            name: 'InMongolian',
            bmp: '\u1800-\u18AF'
        },
        {
            name: 'InMro',
            astral: '\uD81A[\uDE40-\uDE6F]'
        },
        {
            name: 'InMultani',
            astral: '\uD804[\uDE80-\uDEAF]'
        },
        {
            name: 'InMusical_Symbols',
            astral: '\uD834[\uDD00-\uDDFF]'
        },
        {
            name: 'InMyanmar',
            bmp: '\u1000-\u109F'
        },
        {
            name: 'InMyanmar_Extended_A',
            bmp: '\uAA60-\uAA7F'
        },
        {
            name: 'InMyanmar_Extended_B',
            bmp: '\uA9E0-\uA9FF'
        },
        {
            name: 'InNKo',
            bmp: '\u07C0-\u07FF'
        },
        {
            name: 'InNabataean',
            astral: '\uD802[\uDC80-\uDCAF]'
        },
        {
            name: 'InNew_Tai_Lue',
            bmp: '\u1980-\u19DF'
        },
        {
            name: 'InNumber_Forms',
            bmp: '\u2150-\u218F'
        },
        {
            name: 'InOgham',
            bmp: '\u1680-\u169F'
        },
        {
            name: 'InOl_Chiki',
            bmp: '\u1C50-\u1C7F'
        },
        {
            name: 'InOld_Hungarian',
            astral: '\uD803[\uDC80-\uDCFF]'
        },
        {
            name: 'InOld_Italic',
            astral: '\uD800[\uDF00-\uDF2F]'
        },
        {
            name: 'InOld_North_Arabian',
            astral: '\uD802[\uDE80-\uDE9F]'
        },
        {
            name: 'InOld_Permic',
            astral: '\uD800[\uDF50-\uDF7F]'
        },
        {
            name: 'InOld_Persian',
            astral: '\uD800[\uDFA0-\uDFDF]'
        },
        {
            name: 'InOld_South_Arabian',
            astral: '\uD802[\uDE60-\uDE7F]'
        },
        {
            name: 'InOld_Turkic',
            astral: '\uD803[\uDC00-\uDC4F]'
        },
        {
            name: 'InOptical_Character_Recognition',
            bmp: '\u2440-\u245F'
        },
        {
            name: 'InOriya',
            bmp: '\u0B00-\u0B7F'
        },
        {
            name: 'InOrnamental_Dingbats',
            astral: '\uD83D[\uDE50-\uDE7F]'
        },
        {
            name: 'InOsmanya',
            astral: '\uD801[\uDC80-\uDCAF]'
        },
        {
            name: 'InPahawh_Hmong',
            astral: '\uD81A[\uDF00-\uDF8F]'
        },
        {
            name: 'InPalmyrene',
            astral: '\uD802[\uDC60-\uDC7F]'
        },
        {
            name: 'InPau_Cin_Hau',
            astral: '\uD806[\uDEC0-\uDEFF]'
        },
        {
            name: 'InPhags_pa',
            bmp: '\uA840-\uA87F'
        },
        {
            name: 'InPhaistos_Disc',
            astral: '\uD800[\uDDD0-\uDDFF]'
        },
        {
            name: 'InPhoenician',
            astral: '\uD802[\uDD00-\uDD1F]'
        },
        {
            name: 'InPhonetic_Extensions',
            bmp: '\u1D00-\u1D7F'
        },
        {
            name: 'InPhonetic_Extensions_Supplement',
            bmp: '\u1D80-\u1DBF'
        },
        {
            name: 'InPlaying_Cards',
            astral: '\uD83C[\uDCA0-\uDCFF]'
        },
        {
            name: 'InPrivate_Use_Area',
            bmp: '\uE000-\uF8FF'
        },
        {
            name: 'InPsalter_Pahlavi',
            astral: '\uD802[\uDF80-\uDFAF]'
        },
        {
            name: 'InRejang',
            bmp: '\uA930-\uA95F'
        },
        {
            name: 'InRumi_Numeral_Symbols',
            astral: '\uD803[\uDE60-\uDE7F]'
        },
        {
            name: 'InRunic',
            bmp: '\u16A0-\u16FF'
        },
        {
            name: 'InSamaritan',
            bmp: '\u0800-\u083F'
        },
        {
            name: 'InSaurashtra',
            bmp: '\uA880-\uA8DF'
        },
        {
            name: 'InSharada',
            astral: '\uD804[\uDD80-\uDDDF]'
        },
        {
            name: 'InShavian',
            astral: '\uD801[\uDC50-\uDC7F]'
        },
        {
            name: 'InShorthand_Format_Controls',
            astral: '\uD82F[\uDCA0-\uDCAF]'
        },
        {
            name: 'InSiddham',
            astral: '\uD805[\uDD80-\uDDFF]'
        },
        {
            name: 'InSinhala',
            bmp: '\u0D80-\u0DFF'
        },
        {
            name: 'InSinhala_Archaic_Numbers',
            astral: '\uD804[\uDDE0-\uDDFF]'
        },
        {
            name: 'InSmall_Form_Variants',
            bmp: '\uFE50-\uFE6F'
        },
        {
            name: 'InSora_Sompeng',
            astral: '\uD804[\uDCD0-\uDCFF]'
        },
        {
            name: 'InSpacing_Modifier_Letters',
            bmp: '\u02B0-\u02FF'
        },
        {
            name: 'InSpecials',
            bmp: '\uFFF0-\uFFFF'
        },
        {
            name: 'InSundanese',
            bmp: '\u1B80-\u1BBF'
        },
        {
            name: 'InSundanese_Supplement',
            bmp: '\u1CC0-\u1CCF'
        },
        {
            name: 'InSuperscripts_and_Subscripts',
            bmp: '\u2070-\u209F'
        },
        {
            name: 'InSupplemental_Arrows_A',
            bmp: '\u27F0-\u27FF'
        },
        {
            name: 'InSupplemental_Arrows_B',
            bmp: '\u2900-\u297F'
        },
        {
            name: 'InSupplemental_Arrows_C',
            astral: '\uD83E[\uDC00-\uDCFF]'
        },
        {
            name: 'InSupplemental_Mathematical_Operators',
            bmp: '\u2A00-\u2AFF'
        },
        {
            name: 'InSupplemental_Punctuation',
            bmp: '\u2E00-\u2E7F'
        },
        {
            name: 'InSupplemental_Symbols_and_Pictographs',
            astral: '\uD83E[\uDD00-\uDDFF]'
        },
        {
            name: 'InSupplementary_Private_Use_Area_A',
            astral: '[\uDB80-\uDBBF][\uDC00-\uDFFF]'
        },
        {
            name: 'InSupplementary_Private_Use_Area_B',
            astral: '[\uDBC0-\uDBFF][\uDC00-\uDFFF]'
        },
        {
            name: 'InSutton_SignWriting',
            astral: '\uD836[\uDC00-\uDEAF]'
        },
        {
            name: 'InSyloti_Nagri',
            bmp: '\uA800-\uA82F'
        },
        {
            name: 'InSyriac',
            bmp: '\u0700-\u074F'
        },
        {
            name: 'InTagalog',
            bmp: '\u1700-\u171F'
        },
        {
            name: 'InTagbanwa',
            bmp: '\u1760-\u177F'
        },
        {
            name: 'InTags',
            astral: '\uDB40[\uDC00-\uDC7F]'
        },
        {
            name: 'InTai_Le',
            bmp: '\u1950-\u197F'
        },
        {
            name: 'InTai_Tham',
            bmp: '\u1A20-\u1AAF'
        },
        {
            name: 'InTai_Viet',
            bmp: '\uAA80-\uAADF'
        },
        {
            name: 'InTai_Xuan_Jing_Symbols',
            astral: '\uD834[\uDF00-\uDF5F]'
        },
        {
            name: 'InTakri',
            astral: '\uD805[\uDE80-\uDECF]'
        },
        {
            name: 'InTamil',
            bmp: '\u0B80-\u0BFF'
        },
        {
            name: 'InTelugu',
            bmp: '\u0C00-\u0C7F'
        },
        {
            name: 'InThaana',
            bmp: '\u0780-\u07BF'
        },
        {
            name: 'InThai',
            bmp: '\u0E00-\u0E7F'
        },
        {
            name: 'InTibetan',
            bmp: '\u0F00-\u0FFF'
        },
        {
            name: 'InTifinagh',
            bmp: '\u2D30-\u2D7F'
        },
        {
            name: 'InTirhuta',
            astral: '\uD805[\uDC80-\uDCDF]'
        },
        {
            name: 'InTransport_and_Map_Symbols',
            astral: '\uD83D[\uDE80-\uDEFF]'
        },
        {
            name: 'InUgaritic',
            astral: '\uD800[\uDF80-\uDF9F]'
        },
        {
            name: 'InUnified_Canadian_Aboriginal_Syllabics',
            bmp: '\u1400-\u167F'
        },
        {
            name: 'InUnified_Canadian_Aboriginal_Syllabics_Extended',
            bmp: '\u18B0-\u18FF'
        },
        {
            name: 'InVai',
            bmp: '\uA500-\uA63F'
        },
        {
            name: 'InVariation_Selectors',
            bmp: '\uFE00-\uFE0F'
        },
        {
            name: 'InVariation_Selectors_Supplement',
            astral: '\uDB40[\uDD00-\uDDEF]'
        },
        {
            name: 'InVedic_Extensions',
            bmp: '\u1CD0-\u1CFF'
        },
        {
            name: 'InVertical_Forms',
            bmp: '\uFE10-\uFE1F'
        },
        {
            name: 'InWarang_Citi',
            astral: '\uD806[\uDCA0-\uDCFF]'
        },
        {
            name: 'InYi_Radicals',
            bmp: '\uA490-\uA4CF'
        },
        {
            name: 'InYi_Syllables',
            bmp: '\uA000-\uA48F'
        },
        {
            name: 'InYijing_Hexagram_Symbols',
            bmp: '\u4DC0-\u4DFF'
        }
    ]);

};

/*!
 * XRegExp Unicode Categories 3.1.0
 * <xregexp.com>
 * Steven Levithan (c) 2010-2016 MIT License
 * Unicode data by Mathias Bynens <mathiasbynens.be>
 */

/**
 * Adds support for Unicode's general categories. E.g., `\p{Lu}` or `\p{Uppercase Letter}`. See
 * category descriptions in UAX #44 <http://unicode.org/reports/tr44/#GC_Values_Table>. Token names
 * are case insensitive, and any spaces, hyphens, and underscores are ignored.
 *
 * Uses Unicode 8.0.0.
 *
 * @requires XRegExp, Unicode Base
 */
var unicodeCategories = function(XRegExp) {

    if (!XRegExp.addUnicodeData) {
        throw new ReferenceError('Unicode Base must be loaded before Unicode Categories');
    }

    XRegExp.addUnicodeData([
        {
            name: 'C',
            alias: 'Other',
            isBmpLast: true,
            bmp: '\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u0560\u0588\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08B5-\u08E2\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0AF8\u0AFA-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D00\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5E\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F6\u13F7\u13FE\u13FF\u169D-\u169F\u16F9-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180E\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ABF-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7\u1CFA-\u1CFF\u1DF6-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BF-\u20CF\u20F1-\u20FF\u218C-\u218F\u23FB-\u23FF\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2B97\u2BBA-\u2BBC\u2BC9\u2BD2-\u2BEB\u2BF0-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E43-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FD6-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA6F8-\uA6FF\uA7AE\uA7AF\uA7B8-\uA7F6\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FE\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB66-\uAB6F\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF',
            astral: '\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDD73-\uDD7A\uDDE9-\uDDFF\uDE46-\uDEFF\uDF57-\uDF5F\uDF72-\uDFFF]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD6F\uDD9B-\uDDE5\uDE03-\uDE0F\uDE3B-\uDE3F\uDE49-\uDE4F\uDE52-\uDEFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDE70-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|\uD81B[\uDC00-\uDEFF\uDF45-\uDF4F\uDF7F-\uDF8E\uDFA0-\uDFFF]|\uD86E[\uDC1E\uDC1F]|\uD83D[\uDD7A\uDDA4\uDED1-\uDEDF\uDEED-\uDEEF\uDEF4-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD70-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8D-\uDD8F\uDD9C-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2F\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC70-\uDC7E\uDCBD\uDCC2-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD44-\uDD4F\uDD77-\uDD7F\uDDCE\uDDCF\uDDE0\uDDF5-\uDDFF\uDE12\uDE3E-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF3B\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD86D[\uDF35-\uDF3F]|[\uD807\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD81C-\uD82B\uD82D\uD82E\uD830-\uD833\uD837-\uD839\uD83F\uD874-\uD87D\uD87F-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD806[\uDC00-\uDC9F\uDCF3-\uDCFE\uDD00-\uDEBF\uDEF9-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD00-\uDE5F\uDE7F-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD805[\uDC00-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB8-\uDEBF\uDECA-\uDEFF\uDF1A-\uDF1C\uDF2C-\uDF2F\uDF40-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE34-\uDE37\uDE3B-\uDE3E\uDE48-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA0-\uDFFF]|\uD82C[\uDC02-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDD0F\uDD19-\uDD7F\uDD85-\uDDBF\uDDC1-\uDFFF]|\uD873[\uDEA2-\uDFFF]'
        },
        {
            name: 'Cc',
            alias: 'Control',
            bmp: '\0-\x1F\x7F-\x9F'
        },
        {
            name: 'Cf',
            alias: 'Format',
            bmp: '\xAD\u0600-\u0605\u061C\u06DD\u070F\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB',
            astral: '\uDB40[\uDC01\uDC20-\uDC7F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uD804\uDCBD'
        },
        {
            name: 'Cn',
            alias: 'Unassigned',
            bmp: '\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u0560\u0588\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u05FF\u061D\u070E\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08B5-\u08E2\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0AF8\u0AFA-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D00\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5E\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F6\u13F7\u13FE\u13FF\u169D-\u169F\u16F9-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ABF-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7\u1CFA-\u1CFF\u1DF6-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u2065\u2072\u2073\u208F\u209D-\u209F\u20BF-\u20CF\u20F1-\u20FF\u218C-\u218F\u23FB-\u23FF\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2B97\u2BBA-\u2BBC\u2BC9\u2BD2-\u2BEB\u2BF0-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E43-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FD6-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA6F8-\uA6FF\uA7AE\uA7AF\uA7B8-\uA7F6\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FE\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB66-\uAB6F\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD\uFEFE\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFF8\uFFFE\uFFFF',
            astral: '\uDB40[\uDC00\uDC02-\uDC1F\uDC80-\uDCFF\uDDF0-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDDE9-\uDDFF\uDE46-\uDEFF\uDF57-\uDF5F\uDF72-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD6F\uDD9B-\uDDE5\uDE03-\uDE0F\uDE3B-\uDE3F\uDE49-\uDE4F\uDE52-\uDEFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDE70-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|\uD81B[\uDC00-\uDEFF\uDF45-\uDF4F\uDF7F-\uDF8E\uDFA0-\uDFFF]|\uD86E[\uDC1E\uDC1F]|\uD83D[\uDD7A\uDDA4\uDED1-\uDEDF\uDEED-\uDEEF\uDEF4-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD70-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8D-\uDD8F\uDD9C-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2F\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|[\uDBBF\uDBFF][\uDFFE\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA4-\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD86D[\uDF35-\uDF3F]|[\uD807\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD81C-\uD82B\uD82D\uD82E\uD830-\uD833\uD837-\uD839\uD83F\uD874-\uD87D\uD87F-\uDB3F\uDB41-\uDB7F][\uDC00-\uDFFF]|\uD806[\uDC00-\uDC9F\uDCF3-\uDCFE\uDD00-\uDEBF\uDEF9-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD00-\uDE5F\uDE7F-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD805[\uDC00-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB8-\uDEBF\uDECA-\uDEFF\uDF1A-\uDF1C\uDF2C-\uDF2F\uDF40-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE34-\uDE37\uDE3B-\uDE3E\uDE48-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC70-\uDC7E\uDCC2-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD44-\uDD4F\uDD77-\uDD7F\uDDCE\uDDCF\uDDE0\uDDF5-\uDDFF\uDE12\uDE3E-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF3B\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD82C[\uDC02-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDD0F\uDD19-\uDD7F\uDD85-\uDDBF\uDDC1-\uDFFF]|\uD873[\uDEA2-\uDFFF]'
        },
        {
            name: 'Co',
            alias: 'Private_Use',
            bmp: '\uE000-\uF8FF',
            astral: '[\uDB80-\uDBBE\uDBC0-\uDBFE][\uDC00-\uDFFF]|[\uDBBF\uDBFF][\uDC00-\uDFFD]'
        },
        {
            name: 'Cs',
            alias: 'Surrogate',
            bmp: '\uD800-\uDFFF'
        },
        {
            name: 'L',
            alias: 'Letter',
            bmp: 'A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC',
            astral: '\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD83A[\uDC00-\uDCC4]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD80D[\uDC00-\uDC2E]|\uD87E[\uDC00-\uDE1D]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD809[\uDC80-\uDD43]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD808[\uDC00-\uDF99]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD811[\uDC00-\uDE46]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD82C[\uDC00\uDC01]|\uD873[\uDC00-\uDEA1]'
        },
        {
            name: 'Ll',
            alias: 'Lowercase_Letter',
            bmp: 'a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A',
            astral: '\uD803[\uDCC0-\uDCF2]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD801[\uDC28-\uDC4F]|\uD806[\uDCC0-\uDCDF]'
        },
        {
            name: 'Lm',
            alias: 'Modifier_Letter',
            bmp: '\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F',
            astral: '\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F]'
        },
        {
            name: 'Lo',
            alias: 'Other_Letter',
            bmp: '\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC',
            astral: '\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD83A[\uDC00-\uDCC4]|\uD803[\uDC00-\uDC48]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD80D[\uDC00-\uDC2E]|\uD87E[\uDC00-\uDE1D]|\uD81B[\uDF00-\uDF44\uDF50]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD809[\uDC80-\uDD43]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD808[\uDC00-\uDF99]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD811[\uDC00-\uDE46]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD82C[\uDC00\uDC01]|\uD873[\uDC00-\uDEA1]'
        },
        {
            name: 'Lt',
            alias: 'Titlecase_Letter',
            bmp: '\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC'
        },
        {
            name: 'Lu',
            alias: 'Uppercase_Letter',
            bmp: 'A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A',
            astral: '\uD806[\uDCA0-\uDCBF]|\uD803[\uDC80-\uDCB2]|\uD801[\uDC00-\uDC27]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]'
        },
        {
            name: 'M',
            alias: 'Mark',
            bmp: '\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F',
            astral: '\uD805[\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDDDC\uDDDD\uDE30-\uDE40\uDEAB-\uDEB7\uDF1D-\uDF2B]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDDCA-\uDDCC\uDE2C-\uDE37\uDEDF-\uDEEA\uDF00-\uDF03\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD82F[\uDC9D\uDC9E]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD83A[\uDCD0-\uDCD6]|\uDB40[\uDD00-\uDDEF]'
        },
        {
            name: 'Mc',
            alias: 'Spacing_Mark',
            bmp: '\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E\u094F\u0982\u0983\u09BE-\u09C0\u09C7\u09C8\u09CB\u09CC\u09D7\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB\u0ACC\u0B02\u0B03\u0B3E\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0B57\u0BBE\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD7\u0C01-\u0C03\u0C41-\u0C44\u0C82\u0C83\u0CBE\u0CC0-\u0CC4\u0CC7\u0CC8\u0CCA\u0CCB\u0CD5\u0CD6\u0D02\u0D03\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D57\u0D82\u0D83\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DF2\u0DF3\u0F3E\u0F3F\u0F7F\u102B\u102C\u1031\u1038\u103B\u103C\u1056\u1057\u1062-\u1064\u1067-\u106D\u1083\u1084\u1087-\u108C\u108F\u109A-\u109C\u17B6\u17BE-\u17C5\u17C7\u17C8\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1A19\u1A1A\u1A55\u1A57\u1A61\u1A63\u1A64\u1A6D-\u1A72\u1B04\u1B35\u1B3B\u1B3D-\u1B41\u1B43\u1B44\u1B82\u1BA1\u1BA6\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1C24-\u1C2B\u1C34\u1C35\u1CE1\u1CF2\u1CF3\u302E\u302F\uA823\uA824\uA827\uA880\uA881\uA8B4-\uA8C3\uA952\uA953\uA983\uA9B4\uA9B5\uA9BA\uA9BB\uA9BD-\uA9C0\uAA2F\uAA30\uAA33\uAA34\uAA4D\uAA7B\uAA7D\uAAEB\uAAEE\uAAEF\uAAF5\uABE3\uABE4\uABE6\uABE7\uABE9\uABEA\uABEC',
            astral: '\uD834[\uDD65\uDD66\uDD6D-\uDD72]|\uD804[\uDC00\uDC02\uDC82\uDCB0-\uDCB2\uDCB7\uDCB8\uDD2C\uDD82\uDDB3-\uDDB5\uDDBF\uDDC0\uDE2C-\uDE2E\uDE32\uDE33\uDE35\uDEE0-\uDEE2\uDF02\uDF03\uDF3E\uDF3F\uDF41-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63]|\uD805[\uDCB0-\uDCB2\uDCB9\uDCBB-\uDCBE\uDCC1\uDDAF-\uDDB1\uDDB8-\uDDBB\uDDBE\uDE30-\uDE32\uDE3B\uDE3C\uDE3E\uDEAC\uDEAE\uDEAF\uDEB6\uDF20\uDF21\uDF26]|\uD81B[\uDF51-\uDF7E]'
        },
        {
            name: 'Me',
            alias: 'Enclosing_Mark',
            bmp: '\u0488\u0489\u1ABE\u20DD-\u20E0\u20E2-\u20E4\uA670-\uA672'
        },
        {
            name: 'Mn',
            alias: 'Nonspacing_Mark',
            bmp: '\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F',
            astral: '\uD805[\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD83A[\uDCD0-\uDCD6]|\uDB40[\uDD00-\uDDEF]'
        },
        {
            name: 'N',
            alias: 'Number',
            bmp: '0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19',
            astral: '\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD806[\uDCE0-\uDCF2]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD834[\uDF60-\uDF71]|\uD83C[\uDD00-\uDD0C]|\uD809[\uDC00-\uDC6E]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD805[\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]'
        },
        {
            name: 'Nd',
            alias: 'Decimal_Number',
            bmp: '0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19',
            astral: '\uD801[\uDCA0-\uDCA9]|\uD835[\uDFCE-\uDFFF]|\uD805[\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]'
        },
        {
            name: 'Nl',
            alias: 'Letter_Number',
            bmp: '\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF',
            astral: '\uD809[\uDC00-\uDC6E]|\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]'
        },
        {
            name: 'No',
            alias: 'Other_Number',
            bmp: '\xB2\xB3\xB9\xBC-\xBE\u09F4-\u09F9\u0B72-\u0B77\u0BF0-\u0BF2\u0C78-\u0C7E\u0D70-\u0D75\u0F2A-\u0F33\u1369-\u137C\u17F0-\u17F9\u19DA\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215F\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA830-\uA835',
            astral: '\uD804[\uDC52-\uDC65\uDDE1-\uDDF4]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD83C[\uDD00-\uDD0C]|\uD806[\uDCEA-\uDCF2]|\uD83A[\uDCC7-\uDCCF]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD805[\uDF3A\uDF3B]|\uD81A[\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD800[\uDD07-\uDD33\uDD75-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23]'
        },
        {
            name: 'P',
            alias: 'Punctuation',
            bmp: '\x21-\x23\x25-\\x2A\x2C-\x2F\x3A\x3B\\x3F\x40\\x5B-\\x5D\x5F\\x7B\x7D\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65',
            astral: '\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD809[\uDC70-\uDC74]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD836[\uDE87-\uDE8B]|\uD801\uDD6F|\uD82F\uDC9F|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]'
        },
        {
            name: 'Pc',
            alias: 'Connector_Punctuation',
            bmp: '\x5F\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F'
        },
        {
            name: 'Pd',
            alias: 'Dash_Punctuation',
            bmp: '\\x2D\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u2E3A\u2E3B\u2E40\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D'
        },
        {
            name: 'Pe',
            alias: 'Close_Punctuation',
            bmp: '\\x29\\x5D\x7D\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3E\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63'
        },
        {
            name: 'Pf',
            alias: 'Final_Punctuation',
            bmp: '\xBB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21'
        },
        {
            name: 'Pi',
            alias: 'Initial_Punctuation',
            bmp: '\xAB\u2018\u201B\u201C\u201F\u2039\u2E02\u2E04\u2E09\u2E0C\u2E1C\u2E20'
        },
        {
            name: 'Po',
            alias: 'Other_Punctuation',
            bmp: '\x21-\x23\x25-\x27\\x2A\x2C\\x2E\x2F\x3A\x3B\\x3F\x40\\x5C\xA1\xA7\xB6\xB7\xBF\u037E\u0387\u055A-\u055F\u0589\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u166D\u166E\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u1805\u1807-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203B-\u203E\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205E\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00\u2E01\u2E06-\u2E08\u2E0B\u2E0E-\u2E16\u2E18\u2E19\u2E1B\u2E1E\u2E1F\u2E2A-\u2E2E\u2E30-\u2E39\u2E3C-\u2E3F\u2E41\u3001-\u3003\u303D\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFE10-\uFE16\uFE19\uFE30\uFE45\uFE46\uFE49-\uFE4C\uFE50-\uFE52\uFE54-\uFE57\uFE5F-\uFE61\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF07\uFF0A\uFF0C\uFF0E\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3C\uFF61\uFF64\uFF65',
            astral: '\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD809[\uDC70-\uDC74]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD836[\uDE87-\uDE8B]|\uD801\uDD6F|\uD82F\uDC9F|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]'
        },
        {
            name: 'Ps',
            alias: 'Open_Punctuation',
            bmp: '\\x28\\x5B\\x7B\u0F3A\u0F3C\u169B\u201A\u201E\u2045\u207D\u208D\u2308\u230A\u2329\u2768\u276A\u276C\u276E\u2770\u2772\u2774\u27C5\u27E6\u27E8\u27EA\u27EC\u27EE\u2983\u2985\u2987\u2989\u298B\u298D\u298F\u2991\u2993\u2995\u2997\u29D8\u29DA\u29FC\u2E22\u2E24\u2E26\u2E28\u2E42\u3008\u300A\u300C\u300E\u3010\u3014\u3016\u3018\u301A\u301D\uFD3F\uFE17\uFE35\uFE37\uFE39\uFE3B\uFE3D\uFE3F\uFE41\uFE43\uFE47\uFE59\uFE5B\uFE5D\uFF08\uFF3B\uFF5B\uFF5F\uFF62'
        },
        {
            name: 'S',
            alias: 'Symbol',
            bmp: '\\x24\\x2B\x3C-\x3E\\x5E\x60\\x7C\x7E\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BE\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u23FA\u2400-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u32FE\u3300-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD',
            astral: '\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDD9A\uDDE6-\uDE02\uDE10-\uDE3A\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDD79\uDD7B-\uDDA3\uDDA5-\uDED0\uDEE0-\uDEEC\uDEF0-\uDEF3\uDF00-\uDF73\uDF80-\uDFD4]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD82F\uDC9C|\uD805\uDF3F|\uD802[\uDC77\uDC78\uDEC8]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD83B[\uDEF0\uDEF1]'
        },
        {
            name: 'Sc',
            alias: 'Currency_Symbol',
            bmp: '\\x24\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BE\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6'
        },
        {
            name: 'Sk',
            alias: 'Modifier_Symbol',
            bmp: '\\x5E\x60\xA8\xAF\xB4\xB8\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u309B\u309C\uA700-\uA716\uA720\uA721\uA789\uA78A\uAB5B\uFBB2-\uFBC1\uFF3E\uFF40\uFFE3',
            astral: '\uD83C[\uDFFB-\uDFFF]'
        },
        {
            name: 'Sm',
            alias: 'Math_Symbol',
            bmp: '\\x2B\x3C-\x3E\\x7C\x7E\xAC\xB1\xD7\xF7\u03F6\u0606-\u0608\u2044\u2052\u207A-\u207C\u208A-\u208C\u2118\u2140-\u2144\u214B\u2190-\u2194\u219A\u219B\u21A0\u21A3\u21A6\u21AE\u21CE\u21CF\u21D2\u21D4\u21F4-\u22FF\u2320\u2321\u237C\u239B-\u23B3\u23DC-\u23E1\u25B7\u25C1\u25F8-\u25FF\u266F\u27C0-\u27C4\u27C7-\u27E5\u27F0-\u27FF\u2900-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2AFF\u2B30-\u2B44\u2B47-\u2B4C\uFB29\uFE62\uFE64-\uFE66\uFF0B\uFF1C-\uFF1E\uFF5C\uFF5E\uFFE2\uFFE9-\uFFEC',
            astral: '\uD83B[\uDEF0\uDEF1]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]'
        },
        {
            name: 'So',
            alias: 'Other_Symbol',
            bmp: '\xA6\xA9\xAE\xB0\u0482\u058D\u058E\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u09FA\u0B70\u0BF3-\u0BF8\u0BFA\u0C7F\u0D79\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116\u2117\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u214A\u214C\u214D\u214F\u218A\u218B\u2195-\u2199\u219C-\u219F\u21A1\u21A2\u21A4\u21A5\u21A7-\u21AD\u21AF-\u21CD\u21D0\u21D1\u21D3\u21D5-\u21F3\u2300-\u2307\u230C-\u231F\u2322-\u2328\u232B-\u237B\u237D-\u239A\u23B4-\u23DB\u23E2-\u23FA\u2400-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u25B6\u25B8-\u25C0\u25C2-\u25F7\u2600-\u266E\u2670-\u2767\u2794-\u27BF\u2800-\u28FF\u2B00-\u2B2F\u2B45\u2B46\u2B4D-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u32FE\u3300-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA828-\uA82B\uA836\uA837\uA839\uAA77-\uAA79\uFDFD\uFFE4\uFFE8\uFFED\uFFEE\uFFFC\uFFFD',
            astral: '\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|\uD83D[\uDC00-\uDD79\uDD7B-\uDDA3\uDDA5-\uDED0\uDEE0-\uDEEC\uDEF0-\uDEF3\uDF00-\uDF73\uDF80-\uDFD4]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDD9A\uDDE6-\uDE02\uDE10-\uDE3A\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFA]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD82F\uDC9C|\uD805\uDF3F|\uD802[\uDC77\uDC78\uDEC8]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]'
        },
        {
            name: 'Z',
            alias: 'Separator',
            bmp: '\x20\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000'
        },
        {
            name: 'Zl',
            alias: 'Line_Separator',
            bmp: '\u2028'
        },
        {
            name: 'Zp',
            alias: 'Paragraph_Separator',
            bmp: '\u2029'
        },
        {
            name: 'Zs',
            alias: 'Space_Separator',
            bmp: '\x20\xA0\u1680\u2000-\u200A\u202F\u205F\u3000'
        }
    ]);

};

/*!
 * XRegExp Unicode Properties 3.1.0
 * <xregexp.com>
 * Steven Levithan (c) 2012-2016 MIT License
 * Unicode data by Mathias Bynens <mathiasbynens.be>
 */

/**
 * Adds properties to meet the UTS #18 Level 1 RL1.2 requirements for Unicode regex support. See
 * <http://unicode.org/reports/tr18/#RL1.2>. Following are definitions of these properties from UAX
 * #44 <http://unicode.org/reports/tr44/>:
 *
 * - Alphabetic
 *   Characters with the Alphabetic property. Generated from: Lowercase + Uppercase + Lt + Lm + Lo +
 *   Nl + Other_Alphabetic.
 *
 * - Default_Ignorable_Code_Point
 *   For programmatic determination of default ignorable code points. New characters that should be
 *   ignored in rendering (unless explicitly supported) will be assigned in these ranges, permitting
 *   programs to correctly handle the default rendering of such characters when not otherwise
 *   supported.
 *
 * - Lowercase
 *   Characters with the Lowercase property. Generated from: Ll + Other_Lowercase.
 *
 * - Noncharacter_Code_Point
 *   Code points permanently reserved for internal use.
 *
 * - Uppercase
 *   Characters with the Uppercase property. Generated from: Lu + Other_Uppercase.
 *
 * - White_Space
 *   Spaces, separator characters and other control characters which should be treated by
 *   programming languages as "white space" for the purpose of parsing elements.
 *
 * The properties ASCII, Any, and Assigned are also included but are not defined in UAX #44. UTS #18
 * RL1.2 additionally requires support for Unicode scripts and general categories. These are
 * included in XRegExp's Unicode Categories and Unicode Scripts addons.
 *
 * Token names are case insensitive, and any spaces, hyphens, and underscores are ignored.
 *
 * Uses Unicode 8.0.0.
 *
 * @requires XRegExp, Unicode Base
 */
var unicodeProperties = function(XRegExp) {

    if (!XRegExp.addUnicodeData) {
        throw new ReferenceError('Unicode Base must be loaded before Unicode Properties');
    }

    var unicodeData = [
        {
            name: 'ASCII',
            bmp: '\0-\x7F'
        },
        {
            name: 'Alphabetic',
            bmp: 'A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0345\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0657\u0659-\u065F\u066E-\u06D3\u06D5-\u06DC\u06E1-\u06E8\u06ED-\u06EF\u06FA-\u06FC\u06FF\u0710-\u073F\u074D-\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0817\u081A-\u082C\u0840-\u0858\u08A0-\u08B4\u08E3-\u08E9\u08F0-\u093B\u093D-\u094C\u094E-\u0950\u0955-\u0963\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C4\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09F0\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A51\u0A59-\u0A5C\u0A5E\u0A70-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC5\u0AC7-\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0-\u0AE3\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D-\u0B44\u0B47\u0B48\u0B4B\u0B4C\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4C\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCC\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D57\u0D5F-\u0D63\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E46\u0E4D\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0ECD\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F71-\u0F81\u0F88-\u0F97\u0F99-\u0FBC\u1000-\u1036\u1038\u103B-\u103F\u1050-\u1062\u1065-\u1068\u106E-\u1086\u108E\u109C\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1713\u1720-\u1733\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17B3\u17B6-\u17C8\u17D7\u17DC\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u1938\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A1B\u1A20-\u1A5E\u1A61-\u1A74\u1AA7\u1B00-\u1B33\u1B35-\u1B43\u1B45-\u1B4B\u1B80-\u1BA9\u1BAC-\u1BAF\u1BBA-\u1BE5\u1BE7-\u1BF1\u1C00-\u1C35\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1D00-\u1DBF\u1DE7-\u1DF4\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u24B6-\u24E9\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA674-\uA67B\uA67F-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA827\uA840-\uA873\uA880-\uA8C3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA92A\uA930-\uA952\uA960-\uA97C\uA980-\uA9B2\uA9B4-\uA9BF\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA60-\uAA76\uAA7A\uAA7E-\uAABE\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC',
            astral: '\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD804[\uDC00-\uDC45\uDC82-\uDCB8\uDCD0-\uDCE8\uDD00-\uDD32\uDD50-\uDD72\uDD76\uDD80-\uDDBF\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE34\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEE8\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D-\uDF44\uDF47\uDF48\uDF4B\uDF4C\uDF50\uDF57\uDF5D-\uDF63]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD83A[\uDC00-\uDCC4]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF36\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]|\uD80D[\uDC00-\uDC2E]|\uD87E[\uDC00-\uDE1D]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9E]|\uD808[\uDC00-\uDF99]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD805[\uDC80-\uDCC1\uDCC4\uDCC5\uDCC7\uDD80-\uDDB5\uDDB8-\uDDBE\uDDD8-\uDDDD\uDE00-\uDE3E\uDE40\uDE44\uDE80-\uDEB5\uDF00-\uDF19\uDF1D-\uDF2A]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD811[\uDC00-\uDE46]|\uD82C[\uDC00\uDC01]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF93-\uDF9F]|\uD873[\uDC00-\uDEA1]'
        },
        {
            name: 'Any',
            isBmpLast: true,
            bmp: '\0-\uFFFF',
            astral: '[\uD800-\uDBFF][\uDC00-\uDFFF]'
        },
        {
            name: 'Default_Ignorable_Code_Point',
            bmp: '\xAD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8',
            astral: '[\uDB40-\uDB43][\uDC00-\uDFFF]|\uD834[\uDD73-\uDD7A]|\uD82F[\uDCA0-\uDCA3]'
        },
        {
            name: 'Lowercase',
            bmp: 'a-z\xAA\xB5\xBA\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02B8\u02C0\u02C1\u02E0-\u02E4\u0345\u0371\u0373\u0377\u037A-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1DBF\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u2071\u207F\u2090-\u209C\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2170-\u217F\u2184\u24D0-\u24E9\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7D\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B-\uA69D\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7F8-\uA7FA\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A',
            astral: '\uD803[\uDCC0-\uDCF2]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD801[\uDC28-\uDC4F]|\uD806[\uDCC0-\uDCDF]'
        },
        {
            name: 'Noncharacter_Code_Point',
            bmp: '\uFDD0-\uFDEF\uFFFE\uFFFF',
            astral: '[\uDB3F\uDB7F\uDBBF\uDBFF\uD83F\uD87F\uD8BF\uDAFF\uD97F\uD9BF\uD9FF\uDA3F\uD8FF\uDABF\uDA7F\uD93F][\uDFFE\uDFFF]'
        },
        {
            name: 'Uppercase',
            bmp: 'A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2160-\u216F\u2183\u24B6-\u24CF\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A',
            astral: '\uD806[\uDCA0-\uDCBF]|\uD803[\uDC80-\uDCB2]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD801[\uDC00-\uDC27]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]'
        },
        {
            name: 'White_Space',
            bmp: '\x09-\x0D\x20\x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000'
        }
    ];

    // Add non-generated data
    unicodeData.push({
        name: 'Assigned',
        // Since this is defined as the inverse of Unicode category Cn (Unassigned), the Unicode
        // Categories addon is required to use this property
        inverseOf: 'Cn'
    });

    XRegExp.addUnicodeData(unicodeData);

};

/*!
 * XRegExp Unicode Scripts 3.1.0
 * <xregexp.com>
 * Steven Levithan (c) 2010-2016 MIT License
 * Unicode data by Mathias Bynens <mathiasbynens.be>
 */

/**
 * Adds support for all Unicode scripts. E.g., `\p{Latin}`. Token names are case insensitive, and
 * any spaces, hyphens, and underscores are ignored.
 *
 * Uses Unicode 8.0.0.
 *
 * @requires XRegExp, Unicode Base
 */
var unicodeScripts = function(XRegExp) {

    if (!XRegExp.addUnicodeData) {
        throw new ReferenceError('Unicode Base must be loaded before Unicode Scripts');
    }

    XRegExp.addUnicodeData([
        {
            name: 'Ahom',
            astral: '\uD805[\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF3F]'
        },
        {
            name: 'Anatolian_Hieroglyphs',
            astral: '\uD811[\uDC00-\uDE46]'
        },
        {
            name: 'Arabic',
            bmp: '\u0600-\u0604\u0606-\u060B\u060D-\u061A\u061E\u0620-\u063F\u0641-\u064A\u0656-\u066F\u0671-\u06DC\u06DE-\u06FF\u0750-\u077F\u08A0-\u08B4\u08E3-\u08FF\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFD\uFE70-\uFE74\uFE76-\uFEFC',
            astral: '\uD803[\uDE60-\uDE7E]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB\uDEF0\uDEF1]'
        },
        {
            name: 'Armenian',
            bmp: '\u0531-\u0556\u0559-\u055F\u0561-\u0587\u058A\u058D-\u058F\uFB13-\uFB17'
        },
        {
            name: 'Avestan',
            astral: '\uD802[\uDF00-\uDF35\uDF39-\uDF3F]'
        },
        {
            name: 'Balinese',
            bmp: '\u1B00-\u1B4B\u1B50-\u1B7C'
        },
        {
            name: 'Bamum',
            bmp: '\uA6A0-\uA6F7',
            astral: '\uD81A[\uDC00-\uDE38]'
        },
        {
            name: 'Bassa_Vah',
            astral: '\uD81A[\uDED0-\uDEED\uDEF0-\uDEF5]'
        },
        {
            name: 'Batak',
            bmp: '\u1BC0-\u1BF3\u1BFC-\u1BFF'
        },
        {
            name: 'Bengali',
            bmp: '\u0980-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FB'
        },
        {
            name: 'Bopomofo',
            bmp: '\u02EA\u02EB\u3105-\u312D\u31A0-\u31BA'
        },
        {
            name: 'Brahmi',
            astral: '\uD804[\uDC00-\uDC4D\uDC52-\uDC6F\uDC7F]'
        },
        {
            name: 'Braille',
            bmp: '\u2800-\u28FF'
        },
        {
            name: 'Buginese',
            bmp: '\u1A00-\u1A1B\u1A1E\u1A1F'
        },
        {
            name: 'Buhid',
            bmp: '\u1740-\u1753'
        },
        {
            name: 'Canadian_Aboriginal',
            bmp: '\u1400-\u167F\u18B0-\u18F5'
        },
        {
            name: 'Carian',
            astral: '\uD800[\uDEA0-\uDED0]'
        },
        {
            name: 'Caucasian_Albanian',
            astral: '\uD801[\uDD30-\uDD63\uDD6F]'
        },
        {
            name: 'Chakma',
            astral: '\uD804[\uDD00-\uDD34\uDD36-\uDD43]'
        },
        {
            name: 'Cham',
            bmp: '\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA5C-\uAA5F'
        },
        {
            name: 'Cherokee',
            bmp: '\u13A0-\u13F5\u13F8-\u13FD\uAB70-\uABBF'
        },
        {
            name: 'Common',
            bmp: '\0-\x40\\x5B-\x60\\x7B-\xA9\xAB-\xB9\xBB-\xBF\xD7\xF7\u02B9-\u02DF\u02E5-\u02E9\u02EC-\u02FF\u0374\u037E\u0385\u0387\u0589\u0605\u060C\u061B\u061C\u061F\u0640\u06DD\u0964\u0965\u0E3F\u0FD5-\u0FD8\u10FB\u16EB-\u16ED\u1735\u1736\u1802\u1803\u1805\u1CD3\u1CE1\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u2000-\u200B\u200E-\u2064\u2066-\u2070\u2074-\u207E\u2080-\u208E\u20A0-\u20BE\u2100-\u2125\u2127-\u2129\u212C-\u2131\u2133-\u214D\u214F-\u215F\u2189-\u218B\u2190-\u23FA\u2400-\u2426\u2440-\u244A\u2460-\u27FF\u2900-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2E00-\u2E42\u2FF0-\u2FFB\u3000-\u3004\u3006\u3008-\u3020\u3030-\u3037\u303C-\u303F\u309B\u309C\u30A0\u30FB\u30FC\u3190-\u319F\u31C0-\u31E3\u3220-\u325F\u327F-\u32CF\u3358-\u33FF\u4DC0-\u4DFF\uA700-\uA721\uA788-\uA78A\uA830-\uA839\uA92E\uA9CF\uAB5B\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFF70\uFF9E\uFF9F\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD',
            astral: '\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|\uD82F[\uDCA0-\uDCA3]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDFCB\uDFCE-\uDFFF]|\uDB40[\uDC01\uDC20-\uDC7F]|\uD83D[\uDC00-\uDD79\uDD7B-\uDDA3\uDDA5-\uDED0\uDEE0-\uDEEC\uDEF0-\uDEF3\uDF00-\uDF73\uDF80-\uDFD4]|\uD800[\uDD00-\uDD02\uDD07-\uDD33\uDD37-\uDD3F\uDD90-\uDD9B\uDDD0-\uDDFC\uDEE1-\uDEFB]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD66\uDD6A-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDF00-\uDF56\uDF60-\uDF71]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD00-\uDD0C\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE10-\uDE3A\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFF]'
        },
        {
            name: 'Coptic',
            bmp: '\u03E2-\u03EF\u2C80-\u2CF3\u2CF9-\u2CFF'
        },
        {
            name: 'Cuneiform',
            astral: '\uD809[\uDC00-\uDC6E\uDC70-\uDC74\uDC80-\uDD43]|\uD808[\uDC00-\uDF99]'
        },
        {
            name: 'Cypriot',
            astral: '\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F]'
        },
        {
            name: 'Cyrillic',
            bmp: '\u0400-\u0484\u0487-\u052F\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F'
        },
        {
            name: 'Deseret',
            astral: '\uD801[\uDC00-\uDC4F]'
        },
        {
            name: 'Devanagari',
            bmp: '\u0900-\u0950\u0953-\u0963\u0966-\u097F\uA8E0-\uA8FD'
        },
        {
            name: 'Duployan',
            astral: '\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9C-\uDC9F]'
        },
        {
            name: 'Egyptian_Hieroglyphs',
            astral: '\uD80C[\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]'
        },
        {
            name: 'Elbasan',
            astral: '\uD801[\uDD00-\uDD27]'
        },
        {
            name: 'Ethiopic',
            bmp: '\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E'
        },
        {
            name: 'Georgian',
            bmp: '\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u10FF\u2D00-\u2D25\u2D27\u2D2D'
        },
        {
            name: 'Glagolitic',
            bmp: '\u2C00-\u2C2E\u2C30-\u2C5E'
        },
        {
            name: 'Gothic',
            astral: '\uD800[\uDF30-\uDF4A]'
        },
        {
            name: 'Grantha',
            astral: '\uD804[\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]'
        },
        {
            name: 'Greek',
            bmp: '\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65',
            astral: '\uD800[\uDD40-\uDD8C\uDDA0]|\uD834[\uDE00-\uDE45]'
        },
        {
            name: 'Gujarati',
            bmp: '\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1\u0AF9'
        },
        {
            name: 'Gurmukhi',
            bmp: '\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75'
        },
        {
            name: 'Han',
            bmp: '\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FD5\uF900-\uFA6D\uFA70-\uFAD9',
            astral: '\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD87E[\uDC00-\uDE1D]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD873[\uDC00-\uDEA1]'
        },
        {
            name: 'Hangul',
            bmp: '\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC'
        },
        {
            name: 'Hanunoo',
            bmp: '\u1720-\u1734'
        },
        {
            name: 'Hatran',
            astral: '\uD802[\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDCFF]'
        },
        {
            name: 'Hebrew',
            bmp: '\u0591-\u05C7\u05D0-\u05EA\u05F0-\u05F4\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4F'
        },
        {
            name: 'Hiragana',
            bmp: '\u3041-\u3096\u309D-\u309F',
            astral: '\uD82C\uDC01|\uD83C\uDE00'
        },
        {
            name: 'Imperial_Aramaic',
            astral: '\uD802[\uDC40-\uDC55\uDC57-\uDC5F]'
        },
        {
            name: 'Inherited',
            bmp: '\u0300-\u036F\u0485\u0486\u064B-\u0655\u0670\u0951\u0952\u1AB0-\u1ABE\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u200C\u200D\u20D0-\u20F0\u302A-\u302D\u3099\u309A\uFE00-\uFE0F\uFE20-\uFE2D',
            astral: '\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD]|\uD800[\uDDFD\uDEE0]|\uDB40[\uDD00-\uDDEF]'
        },
        {
            name: 'Inscriptional_Pahlavi',
            astral: '\uD802[\uDF60-\uDF72\uDF78-\uDF7F]'
        },
        {
            name: 'Inscriptional_Parthian',
            astral: '\uD802[\uDF40-\uDF55\uDF58-\uDF5F]'
        },
        {
            name: 'Javanese',
            bmp: '\uA980-\uA9CD\uA9D0-\uA9D9\uA9DE\uA9DF'
        },
        {
            name: 'Kaithi',
            astral: '\uD804[\uDC80-\uDCC1]'
        },
        {
            name: 'Kannada',
            bmp: '\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2'
        },
        {
            name: 'Katakana',
            bmp: '\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D',
            astral: '\uD82C\uDC00'
        },
        {
            name: 'Kayah_Li',
            bmp: '\uA900-\uA92D\uA92F'
        },
        {
            name: 'Kharoshthi',
            astral: '\uD802[\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F-\uDE47\uDE50-\uDE58]'
        },
        {
            name: 'Khmer',
            bmp: '\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u19E0-\u19FF'
        },
        {
            name: 'Khojki',
            astral: '\uD804[\uDE00-\uDE11\uDE13-\uDE3D]'
        },
        {
            name: 'Khudawadi',
            astral: '\uD804[\uDEB0-\uDEEA\uDEF0-\uDEF9]'
        },
        {
            name: 'Lao',
            bmp: '\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF'
        },
        {
            name: 'Latin',
            bmp: 'A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A'
        },
        {
            name: 'Lepcha',
            bmp: '\u1C00-\u1C37\u1C3B-\u1C49\u1C4D-\u1C4F'
        },
        {
            name: 'Limbu',
            bmp: '\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1940\u1944-\u194F'
        },
        {
            name: 'Linear_A',
            astral: '\uD801[\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]'
        },
        {
            name: 'Linear_B',
            astral: '\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA]'
        },
        {
            name: 'Lisu',
            bmp: '\uA4D0-\uA4FF'
        },
        {
            name: 'Lycian',
            astral: '\uD800[\uDE80-\uDE9C]'
        },
        {
            name: 'Lydian',
            astral: '\uD802[\uDD20-\uDD39\uDD3F]'
        },
        {
            name: 'Mahajani',
            astral: '\uD804[\uDD50-\uDD76]'
        },
        {
            name: 'Malayalam',
            bmp: '\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D75\u0D79-\u0D7F'
        },
        {
            name: 'Mandaic',
            bmp: '\u0840-\u085B\u085E'
        },
        {
            name: 'Manichaean',
            astral: '\uD802[\uDEC0-\uDEE6\uDEEB-\uDEF6]'
        },
        {
            name: 'Meetei_Mayek',
            bmp: '\uAAE0-\uAAF6\uABC0-\uABED\uABF0-\uABF9'
        },
        {
            name: 'Mende_Kikakui',
            astral: '\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6]'
        },
        {
            name: 'Meroitic_Cursive',
            astral: '\uD802[\uDDA0-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDDFF]'
        },
        {
            name: 'Meroitic_Hieroglyphs',
            astral: '\uD802[\uDD80-\uDD9F]'
        },
        {
            name: 'Miao',
            astral: '\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]'
        },
        {
            name: 'Modi',
            astral: '\uD805[\uDE00-\uDE44\uDE50-\uDE59]'
        },
        {
            name: 'Mongolian',
            bmp: '\u1800\u1801\u1804\u1806-\u180E\u1810-\u1819\u1820-\u1877\u1880-\u18AA'
        },
        {
            name: 'Mro',
            astral: '\uD81A[\uDE40-\uDE5E\uDE60-\uDE69\uDE6E\uDE6F]'
        },
        {
            name: 'Multani',
            astral: '\uD804[\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA9]'
        },
        {
            name: 'Myanmar',
            bmp: '\u1000-\u109F\uA9E0-\uA9FE\uAA60-\uAA7F'
        },
        {
            name: 'Nabataean',
            astral: '\uD802[\uDC80-\uDC9E\uDCA7-\uDCAF]'
        },
        {
            name: 'New_Tai_Lue',
            bmp: '\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u19DE\u19DF'
        },
        {
            name: 'Nko',
            bmp: '\u07C0-\u07FA'
        },
        {
            name: 'Ogham',
            bmp: '\u1680-\u169C'
        },
        {
            name: 'Ol_Chiki',
            bmp: '\u1C50-\u1C7F'
        },
        {
            name: 'Old_Hungarian',
            astral: '\uD803[\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDCFF]'
        },
        {
            name: 'Old_Italic',
            astral: '\uD800[\uDF00-\uDF23]'
        },
        {
            name: 'Old_North_Arabian',
            astral: '\uD802[\uDE80-\uDE9F]'
        },
        {
            name: 'Old_Permic',
            astral: '\uD800[\uDF50-\uDF7A]'
        },
        {
            name: 'Old_Persian',
            astral: '\uD800[\uDFA0-\uDFC3\uDFC8-\uDFD5]'
        },
        {
            name: 'Old_South_Arabian',
            astral: '\uD802[\uDE60-\uDE7F]'
        },
        {
            name: 'Old_Turkic',
            astral: '\uD803[\uDC00-\uDC48]'
        },
        {
            name: 'Oriya',
            bmp: '\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77'
        },
        {
            name: 'Osmanya',
            astral: '\uD801[\uDC80-\uDC9D\uDCA0-\uDCA9]'
        },
        {
            name: 'Pahawh_Hmong',
            astral: '\uD81A[\uDF00-\uDF45\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]'
        },
        {
            name: 'Palmyrene',
            astral: '\uD802[\uDC60-\uDC7F]'
        },
        {
            name: 'Pau_Cin_Hau',
            astral: '\uD806[\uDEC0-\uDEF8]'
        },
        {
            name: 'Phags_Pa',
            bmp: '\uA840-\uA877'
        },
        {
            name: 'Phoenician',
            astral: '\uD802[\uDD00-\uDD1B\uDD1F]'
        },
        {
            name: 'Psalter_Pahlavi',
            astral: '\uD802[\uDF80-\uDF91\uDF99-\uDF9C\uDFA9-\uDFAF]'
        },
        {
            name: 'Rejang',
            bmp: '\uA930-\uA953\uA95F'
        },
        {
            name: 'Runic',
            bmp: '\u16A0-\u16EA\u16EE-\u16F8'
        },
        {
            name: 'Samaritan',
            bmp: '\u0800-\u082D\u0830-\u083E'
        },
        {
            name: 'Saurashtra',
            bmp: '\uA880-\uA8C4\uA8CE-\uA8D9'
        },
        {
            name: 'Sharada',
            astral: '\uD804[\uDD80-\uDDCD\uDDD0-\uDDDF]'
        },
        {
            name: 'Shavian',
            astral: '\uD801[\uDC50-\uDC7F]'
        },
        {
            name: 'Siddham',
            astral: '\uD805[\uDD80-\uDDB5\uDDB8-\uDDDD]'
        },
        {
            name: 'SignWriting',
            astral: '\uD836[\uDC00-\uDE8B\uDE9B-\uDE9F\uDEA1-\uDEAF]'
        },
        {
            name: 'Sinhala',
            bmp: '\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4',
            astral: '\uD804[\uDDE1-\uDDF4]'
        },
        {
            name: 'Sora_Sompeng',
            astral: '\uD804[\uDCD0-\uDCE8\uDCF0-\uDCF9]'
        },
        {
            name: 'Sundanese',
            bmp: '\u1B80-\u1BBF\u1CC0-\u1CC7'
        },
        {
            name: 'Syloti_Nagri',
            bmp: '\uA800-\uA82B'
        },
        {
            name: 'Syriac',
            bmp: '\u0700-\u070D\u070F-\u074A\u074D-\u074F'
        },
        {
            name: 'Tagalog',
            bmp: '\u1700-\u170C\u170E-\u1714'
        },
        {
            name: 'Tagbanwa',
            bmp: '\u1760-\u176C\u176E-\u1770\u1772\u1773'
        },
        {
            name: 'Tai_Le',
            bmp: '\u1950-\u196D\u1970-\u1974'
        },
        {
            name: 'Tai_Tham',
            bmp: '\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD'
        },
        {
            name: 'Tai_Viet',
            bmp: '\uAA80-\uAAC2\uAADB-\uAADF'
        },
        {
            name: 'Takri',
            astral: '\uD805[\uDE80-\uDEB7\uDEC0-\uDEC9]'
        },
        {
            name: 'Tamil',
            bmp: '\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA'
        },
        {
            name: 'Telugu',
            bmp: '\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7F'
        },
        {
            name: 'Thaana',
            bmp: '\u0780-\u07B1'
        },
        {
            name: 'Thai',
            bmp: '\u0E01-\u0E3A\u0E40-\u0E5B'
        },
        {
            name: 'Tibetan',
            bmp: '\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FD4\u0FD9\u0FDA'
        },
        {
            name: 'Tifinagh',
            bmp: '\u2D30-\u2D67\u2D6F\u2D70\u2D7F'
        },
        {
            name: 'Tirhuta',
            astral: '\uD805[\uDC80-\uDCC7\uDCD0-\uDCD9]'
        },
        {
            name: 'Ugaritic',
            astral: '\uD800[\uDF80-\uDF9D\uDF9F]'
        },
        {
            name: 'Vai',
            bmp: '\uA500-\uA62B'
        },
        {
            name: 'Warang_Citi',
            astral: '\uD806[\uDCA0-\uDCF2\uDCFF]'
        },
        {
            name: 'Yi',
            bmp: '\uA000-\uA48C\uA490-\uA4C6'
        }
    ]);

};

var XRegExp$1 = xregexp;

build(XRegExp$1);
matchrecursive(XRegExp$1);
unicodeBase(XRegExp$1);
unicodeBlocks(XRegExp$1);
unicodeCategories(XRegExp$1);
unicodeProperties(XRegExp$1);
unicodeScripts(XRegExp$1);

var src = XRegExp$1;

/*
 * preprocess
 * https://github.com/onehealth/preprocess
 *
 * Copyright (c) 2012 OneHealth Solutions, Inc.
 * Written by Jarrod Overson - http://jarrodoverson.com/
 * Licensed under the Apache 2.0 license.
 */

var preprocess_2 = preprocess;

var path  = require$$1__default$1.default,
    fs    = require$$1__default.default,
    os    = require$$2__default.default,
    delim = regexrulesExports,
    XRegExp = src;

function preprocess(src, context, typeOrOptions) {
  src = src.toString();
  context = context || process.env;

  // default values
  var options = {
    fileNotFoundSilentFail: false,
    srcDir: process.cwd(),
    srcEol: getEolType(src),
    type: delim['html']
  };

  // needed for backward compatibility with 2.x.x series
  if (typeof typeOrOptions === 'string') {
    typeOrOptions = {
      type: typeOrOptions
    };
  }

  // needed for backward compatibility with 2.x.x series
  if (typeof context.srcDir === "string") {
    typeOrOptions = typeOrOptions || {};
    typeOrOptions.srcDir = context.srcDir;
  }

  if (typeOrOptions && typeof typeOrOptions === 'object') {
    options.srcDir = typeOrOptions.srcDir || options.srcDir;
    options.fileNotFoundSilentFail = typeOrOptions.fileNotFoundSilentFail || options.fileNotFoundSilentFail;
    options.srcEol = typeOrOptions.srcEol || options.srcEol;
    options.type = delim[typeOrOptions.type] || options.type;
  }

  context = copy(context);

  return preprocessor(src, context, options);
}

function preprocessor(src, context, opts, noRestoreEol) {
  src = normalizeEol(src);

  var rv = src;

  rv = replace(rv, opts.type.include, processIncludeDirective.bind(null, false, context, opts));

  if (opts.type.extend) {
    rv = replaceRecursive(rv, opts.type.extend, function(startMatches, endMatches, include, recurse) {
      var file = (startMatches[1] || '').trim();
      var extendedContext = copy(context);
      var extendedOpts = copy(opts);
      extendedContext.src = path.join(opts.srcDir, file);
      extendedOpts.srcDir = path.dirname(extendedContext.src);

      var fileContents = getFileContents(extendedContext.src, opts.fileNotFoundSilentFail, context.src);
      if (fileContents.error) {
        return fileContents.contents;
      }

      var extendedSource = preprocessor(fileContents.contents, extendedContext, extendedOpts, true).trim();

      if (extendedSource) {
        include = include.replace(/^\n?|\n?$/g, '');
        return replace(extendedSource, opts.type.extendable, recurse(include));
      } else {
        return '';
      }
    });
  }

  if (opts.type.foreach) {
    rv = replaceRecursive(rv, opts.type.foreach, function(startMatches, endMatches, include, recurse) {
      var variable = (startMatches[1] || '').trim();
      var forParams = variable.split(' ');
      if (forParams.length === 3) {
        var contextVar = forParams[2];
        var arrString = getDeepPropFromObj(context, contextVar);
        var eachArr;
        if (arrString.match(/\{(.*)\}/)) {
          eachArr = JSON.parse(arrString);
        } else if (arrString.match(/\[(.*)\]/)) {
          eachArr = arrString.slice(1, -1);
          eachArr = eachArr.split(',');
          eachArr = eachArr.map(function(arrEntry){
            return arrEntry.replace(/\s*(['"])(.*)\1\s*/, '$2');
          });
        } else {
          eachArr = arrString.split(',');
        }

        var replaceToken = new RegExp(XRegExp.escape(forParams[0]), 'g');
        var recursedInclude = recurse(include);

        return Object.keys(eachArr).reduce(function(stringBuilder, arrKey){
          var arrEntry = eachArr[arrKey];
          return stringBuilder + recursedInclude.replace(replaceToken, arrEntry);
        }, '');
      } else {
        return '';
      }
    });
  }

  if (opts.type.exclude) {
    rv = replaceRecursive(rv, opts.type.exclude, function(startMatches, endMatches, include, recurse){
      var test = (startMatches[1] || '').trim();
      return testPasses(test,context) ? '' : recurse(include);
    });
  }

  if (opts.type.if) {
    rv = replaceRecursive(rv, opts.type.if, function (startMatches, endMatches, include, recurse) {
	  // I need to recurse first, so I don't catch "inner" else-directives
      var recursed = recurse(include);
      
	  // look for the first else-directive
	  var matches = opts.type.else && recursed.match(new RegExp(opts.type.else));
      var match = (matches || [""])[0];
      var index = match ? recursed.indexOf(match) : recursed.length;
	  
      var ifBlock = recursed.substring(0, index);
      var elseBlock = recursed.substring(index + match.length); // empty string if no else-directive
	  
      var variant = startMatches[1];
      var test = (startMatches[2] || '').trim();
      // fixed by xxxxxx
      var startLine = padContent(startMatches.input);
      var endLine = padContent(endMatches.input);
      switch(variant) {
        case 'if':
        case 'ifdef': // fixed by xxxxxx
          return testPasses(test, context) ? (startLine + ifBlock + endLine) : (startLine + padContent(ifBlock) + padContent(match || '') + elseBlock + endLine);
        case 'ifndef':
          return !testPasses(test, context) ? (startLine + ifBlock + endLine) : (startLine + padContent(ifBlock) + padContent(match || '') + elseBlock + endLine);
        // case 'ifdef':
        //   return typeof getDeepPropFromObj(context, test) !== 'undefined' ? ifBlock : elseBlock;
        // case 'ifndef':
        //   return typeof getDeepPropFromObj(context, test) === 'undefined' ? ifBlock : elseBlock;
        default:
          throw new Error('Unknown if variant ' + variant + '.');
      }
    });
  }

  rv = replace(rv, opts.type.echo, function (match, variable) {
    variable = (variable || '').trim();
    // if we are surrounded by quotes, echo as a string
    var stringMatch = variable.match(/^(['"])(.*)\1$/);
    if (stringMatch) return stringMatch[2];

    var arrString = getDeepPropFromObj(context, variable);
    return typeof arrString !== 'undefined' ? arrString : '';
  });

  rv = replace(rv, opts.type.exec, function (match, name, value) {
    name = (name || '').trim();
    value = value || '';

    var params = value.split(',');
    var stringRegex = /^['"](.*)['"]$/;

    params = params.map(function(param){
      param = param.trim();
      if (stringRegex.test(param)) { // handle string parameter
        return param.replace(stringRegex, '$1');
      } else { // handle variable parameter
        return getDeepPropFromObj(context, param);
      }
    });

    var fn = getDeepPropFromObj(context, name);
    if (!fn || typeof fn !== 'function') return '';

    return fn.apply(context, params);
  });

  rv = replace(rv, opts.type['include-static'], processIncludeDirective.bind(null, true, context, opts));

  if (!noRestoreEol) {
    rv = restoreEol(rv, opts.srcEol);
  }

  return rv;
}

function getEolType(source) {
  var eol;
  var foundEolTypeCnt = 0;

  if (source.indexOf('\r\n') >= 0) {
    eol = '\r\n';
    foundEolTypeCnt++;
  }
  if (/\r[^\n]/.test(source)) {
    eol = '\r';
    foundEolTypeCnt++;
  }
  if (/[^\r]\n/.test(source)) {
    eol = '\n';
    foundEolTypeCnt++;
  }

  if (eol == null || foundEolTypeCnt > 1) {
    eol = os.EOL;
  }

  return eol;
}

function normalizeEol(source, indent) {
  // only process any kind of EOL if indentation has to be added, otherwise replace only non \n EOLs
  if (indent) {
    source = source.replace(/(?:\r?\n)|\r/g, '\n' + indent);
  } else {
    source = source.replace(/(?:\r\n)|\r/g, '\n');
  }

  return source;
}

function restoreEol(normalizedSource, originalEol) {
  if (originalEol !== '\n') {
    normalizedSource = normalizedSource.replace(/\n/g, originalEol);
  }

  return normalizedSource;
}

function replace(rv, rule, processor) {
  var isRegex = typeof rule === 'string' || rule instanceof RegExp;
  var isArray = Array.isArray(rule);

  if (isRegex) {
    rule = [new RegExp(rule,'gmi')];
  } else if (isArray) {
    rule = rule.map(function(subRule){
      return new RegExp(subRule,'gmi');
    });
  } else {
    throw new Error('Rule must be a String, a RegExp, or an Array.');
  }

  return rule.reduce(function(rv, rule){
    return rv.replace(rule, processor);
  }, rv);
}

function replaceRecursive(rv, rule, processor) {
  if(!rule.start || !rule.end) {
    throw new Error('Recursive rule must have start and end.');
  }

  var startRegex = new RegExp(rule.start, 'mi');
  var endRegex = new RegExp(rule.end, 'mi');

  function matchReplacePass(content) {
    var matches = XRegExp.matchRecursive(content, rule.start, rule.end, 'gmi', {
      valueNames: ['between', 'left', 'match', 'right']
    });

    var matchGroup = {
      left: null,
      match: null,
      right: null
    };

    return matches.reduce(function (builder, match) {
      switch(match.name) {
        case 'between':
          builder += match.value;
          break;
        case 'left':
          matchGroup.left = startRegex.exec(match.value);
          break;
        case 'match':
          matchGroup.match = match.value;
          break;
        case 'right':
          matchGroup.right = endRegex.exec(match.value);
          builder += processor(matchGroup.left, matchGroup.right, matchGroup.match, matchReplacePass);
          break;
      }
      return builder;
    }, '');
  }

  return matchReplacePass(rv);
}


function processIncludeDirective(isStatic, context, opts, match, linePrefix, file) {
  file = (file || '').trim();
  var indent = linePrefix.replace(/\S/g, ' ');
  var includedContext = copy(context);
  var includedOpts = copy(opts);
  includedContext.src = path.join(opts.srcDir,file);
  includedOpts.srcDir = path.dirname(includedContext.src);

  var fileContents = getFileContents(includedContext.src, opts.fileNotFoundSilentFail, context.src);
  if (fileContents.error) {
    return linePrefix + fileContents.contents;
  }

  var includedSource = fileContents.contents;
  if (isStatic) {
    includedSource = fileContents.contents;
  } else {
    includedSource = preprocessor(fileContents.contents, includedContext, includedOpts, true);
  }

  includedSource = normalizeEol(includedSource, indent);

  if (includedSource) {
    return linePrefix + includedSource;
  } else {
    return linePrefix;
  }
}

function getTestTemplate(test) {
  /*jshint evil:true*/
  test = test || 'true';
  test = test.trim();

  // force single equals replacement
  test = test.replace(/([^=!])=([^=])/g, '$1==$2');
  // fixed by xxxxxx
  test = test.replace(/-/g, '_');
  return new Function("context", "with (context||{}){ return ( " + test + " ); }");
}

// fixed by xxxxxx
function testPasses(test, context) {
  var testFn = getTestTemplate(test);
  try {
    return testFn(context, getDeepPropFromObj)
  } catch (e) {}
  return false
}

function getFileContents(path, failSilent, requesterPath) {
  try {
    fs.statSync(path);
  } catch (e) {
    if (failSilent) {
      return {error: true, contents: path + ' not found!'};
    } else {
      var errMsg = path;
      errMsg = requesterPath ? errMsg + ' requested from ' + requesterPath : errMsg;
      errMsg += ' not found!';
      throw new Error(errMsg);
    }
  }
  return {error: false, contents: fs.readFileSync(path).toString()};
}

function copy(obj) {
  return Object.keys(obj).reduce(function (copyObj, objKey) {
    copyObj[objKey] = obj[objKey];
    return copyObj;
  }, {});
}

function getDeepPropFromObj(obj, propPath) {
  propPath.replace(/\[([^\]+?])\]/g, '.$1');
  propPath = propPath.split('.');

  // fast path, no need to loop if structurePath contains only a single segment
  if (propPath.length === 1) {
    return obj[propPath[0]];
  }

  // loop only as long as possible (no exceptions for null/undefined property access)
  propPath.some(function (pathSegment) {
    obj = obj[pathSegment];
    return (obj == null);
  });

  return obj;
}
// fixed by xxxxxx
const splitRE = /\r?\n/g;
function padContent(content) {
  return Array(content.split(splitRE).length).join('\n')
}

function preJs(jsCode) {
    return preprocess_2(jsCode, getPreVueContext(), { type: 'js' });
}
const preJson = preJs;

function uniWeiboSpecialPlugin() {
    return {
        name: 'uni:weibo',
        enforce: 'pre',
        buildEnd() {
            const fileDIR = require$$1__default$1.default.join(process.env.UNI_OUTPUT_DIR, '../', '../', '../');
            lib.emptyDirSync(fileDIR);
            // 复制文件夹
            lib.copySync(require$$1__default$1.default.resolve('node_modules/@dcloudio/uni-mp-weibo/template'), fileDIR);
            // STAER: 读取用户在 manifest.json 中配置的 appid 并修改微博 wbox.config.json 中配置的 appid。
            const manifestJsonPath = require$$1__default$1.default.join(process.env.UNI_INPUT_DIR, 'manifest.json');
            const manifestJson = CJSON.parse(lib.readFileSync(manifestJsonPath, 'utf8'));
            if (manifestJson['mp-weibo'] && manifestJson['mp-weibo'].appid) {
                const mpWeiboAppid = manifestJson['mp-weibo'].appid;
                const wboxConfigJsonPath = require$$1__default$1.default.join(fileDIR, 'wbox.config.json');
                const wboxConfigJson = CJSON.parse(lib.readFileSync(wboxConfigJsonPath, 'utf8'));
                wboxConfigJson.appId = mpWeiboAppid;
                lib.writeFileSync(wboxConfigJsonPath, CJSON.stringify(wboxConfigJson, null, 2));
            }
            // END: 读取用户在 manifest.json 中配置的 appid 并修改微博 wbox.config.json 中配置的 appid。
            // STAER: 解析 pages.json 中的内容，生成 page 页面及 app.json 文件。
            const pagesJsonPath = require$$1__default$1.default.join(process.env.UNI_INPUT_DIR, 'pages.json');
            const pagesJsonStr = lib.readFileSync(pagesJsonPath, 'utf8');
            // preJson 处理 page.json 中的条件编译
            const pagesJson = CJSON.parse(preJson(pagesJsonStr));
            let pageOptions = pagesJson.pages;
            if (pagesJson.subPackages && pagesJson.subPackages.length) {
                pagesJson.subPackages.forEach((subPackage) => {
                    pageOptions = pageOptions.concat(subPackage.pages.map((item) => (Object.assign(Object.assign({}, item), { path: `${subPackage.root}/${item.path}` }))));
                });
            }
            // ==> STAER: 根据 pages.json 生成 app.json
            const appPages = pageOptions.map((item) => item.path);
            const appJsonPath = require$$1__default$1.default.join(fileDIR, 'src', 'app.json');
            const appJson = CJSON.parse(lib.readFileSync(appJsonPath, 'utf8'));
            appJson.pages = appPages;
            if (pagesJson.globalStyle) {
                appJson.window = Object.assign(appJson.window, pagesJson.globalStyle);
            }
            lib.writeFileSync(appJsonPath, CJSON.stringify(appJson, null, 2));
            // ==> END: 根据 pages.json 生成 app.json
            // ==> STAER: 根据 pages.json 生成 pages 目录
            const templatePagePath = require$$1__default$1.default.resolve('node_modules/@dcloudio/uni-mp-weibo/template/src/pages/index/index');
            const pageFileSuffixs = ['.vue', '.css', '.json'];
            pageOptions.forEach((pageInfo) => {
                const targetPagePath = require$$1__default$1.default.resolve(fileDIR, 'src', pageInfo.path);
                pageFileSuffixs.forEach((suffix) => {
                    lib.copySync(`${templatePagePath}${suffix}`, `${targetPagePath}${suffix}`);
                    // 覆写 page.json 配置文件
                    if (suffix === '.json' &&
                        pageInfo.style &&
                        Object.keys(pageInfo.style).length > 0) {
                        let pageJson = CJSON.parse(lib.readFileSync(`${targetPagePath}${suffix}`, 'utf8'));
                        pageJson = Object.assign(pageJson, pageInfo.style);
                        lib.writeFileSync(`${targetPagePath}${suffix}`, CJSON.stringify(pageJson, null, 2));
                    }
                });
            });
            // ==> END: 根据 pages.json 生成 pages 目录
            // END: 解析 pages.json 中的内容，生成 page 页面及 app.json 文件。
        },
    };
}

uniMpWeiboVite__namespace.default.push(uniWeiboSpecialPlugin());

module.exports = uniMpWeiboVite__namespace;
