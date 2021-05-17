'use strict';

var uniI18n = require('@dcloudio/uni-i18n');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var core = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory();
	}
}(commonjsGlobal, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined$1) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {}
	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }());

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined$1) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));
});

var md5 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory(core);
	}
}(commonjsGlobal, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));
});

var hmac = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory(core);
	}
}(commonjsGlobal, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));
});

var hmacMd5 = createCommonjsModule(function (module, exports) {
(function (root, factory, undef) {
	{
		// CommonJS
		module.exports = exports = factory(core, md5, hmac);
	}
}(commonjsGlobal, function (CryptoJS) {

	return CryptoJS.HmacMD5;

}));
});

function callbackify (method) {
  return function (options) {
    options = options || {};
    if (options.success || options.fail || options.complete) {
      method
        .call(this, options)
        .then((res) => {
          options.success && options.success(res);
          options.complete && options.complete(res);
        }, (err) => {
          options.fail && options.fail(err);
          options.complete && options.complete(err);
        });
      return
    }
    return method.call(this, options)
  }
}

class UniCloudError extends Error {
  constructor (options) {
    super(options.message);
    this.errMsg = options.message || '';
    Object.defineProperties(this, {
      code: {
        get () {
          return options.code
        }
      },
      requestId: {
        get () {
          return options.requestId
        }
      },
      message: {
        get () {
          return this.errMsg
        },
        set (msg) {
          this.errMsg = msg;
        }
      }
    });
  }
}

var version = "1.0.1";

var zhHans = {
  // uni-app
  'uniCloud.init.paramRequired': '缺少参数：{param}',
  // h5
  'uniCloud.uploadFile.fileError': 'filePath应为File对象'
};

var zhHant = {
  // uni-app
  'uniCloud.init.paramRequired': '缺少参数：{param}',
  // h5
  'uniCloud.uploadFile.fileError': 'filePath应为File对象'
};

var en = {
  // uni-app
  'uniCloud.init.paramRequired': '{param} required',
  // h5
  'uniCloud.uploadFile.fileError': 'filePath should be instance of File'
};

var fr = {
  // uni-app
  'uniCloud.init.paramRequired': '{param} required',
  // h5
  'uniCloud.uploadFile.fileError': 'filePath should be instance of File'
};

var es = {
  // uni-app
  'uniCloud.init.paramRequired': '{param} required',
  // h5
  'uniCloud.uploadFile.fileError': 'filePath should be instance of File'
};

const {
  t,
  setLocale,
  getLocale
} = uniI18n.initVueI18n({
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
  en,
  fr,
  es
}, 'zh-Hans');

const UUID_KEY = '__DC_CLOUD_UUID';
const LAST_DCLOUD_APPID_KEY = '__LAST_DCLOUD_APPID';
const UNI_ID_TOKEN_KEY = 'uni_id_token';
const UNI_ID_TOKEN_EXPIRED_KEY = 'uni_id_token_expired';
const UNI_ID_TOKEN_KEY_DEP = 'uniIdToken';

let statConfig;
try {
  statConfig = require('uni-stat-config').default || require('uni-stat-config');
} catch (e) {
  statConfig = {
    appid: ''
  };
}

let uuid, clientOS;

function getRandomUuid (length = 8) {
  let str = '';
  while (str.length < length) {
    str += Math.random().toString(32).substring(2);
  }
  return str.substring(0, length)
}

// process.env.VUE_APP_PLATFORM
// 'app-plus'
// h5:
// 'mp-weixin'
// 'mp-alipay'
// 'mp-baidu'
// 'mp-toutiao'
// 'mp-qq'
// 'quickapp-native'

function initStat () {
  return new Promise(resolve => {
    if (process.env.VUE_APP_PLATFORM === 'quickapp-native') {
      clientOS = 'android';
      uni.getStorage({
        key: UUID_KEY,
        success (res) {
          if (res.data) {
            uuid = res.data;
          } else {
            uuid = getRandomUuid(32);
          }
          resolve();
        }
      });
    } else {
      setTimeout(() => {
        clientOS = uni.getSystemInfoSync().platform;
        uuid = uni.getStorageSync(UUID_KEY) || getRandomUuid(32);
        resolve();
      }, 0);
    }
  })
}

function getClientInfo () {
  const {
    deviceId
  } = uni.getSystemInfoSync();
  return {
    PLATFORM: process.env.VUE_APP_PLATFORM,
    OS: clientOS,
    APPID: statConfig.appid,
    LOCALE: getLocale(),
    DEVICEID: deviceId,
    // ID: uuid || (uuid = getRandomUuid(32)),
    CLIENT_SDK_VERSION: version
  }
}

function getUuid () {
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid
  }

  if (!uuid) {
    uuid = getRandomUuid(32);
    uni.setStorage({
      key: UUID_KEY,
      data: uuid
    });
  }
  return uuid
}

function getPlatformName () {
  const aliArr = ['y', 'a', 'p', 'mp-ali'];
  const platformList = {
    'app-plus': 'n',
    h5: 'h5',
    'mp-weixin': 'wx',
    [aliArr.reverse().join('')]: 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq',
    'quickapp-native': 'qn'
  };
  return platformList[process.env.VUE_APP_PLATFORM]
}

function clearDirtyUniIdToken () {
  // 仅在uni-app h5端运行到浏览器执行此逻辑
  if (process.env.VUE_APP_PLATFORM !== 'h5' || process.env.NODE_ENV !== 'development') {
    return
  }
  const lastDcloudAppId = uni.getStorageSync(LAST_DCLOUD_APPID_KEY);
  if (lastDcloudAppId === statConfig.appid) {
    return
  }
  uni.setStorageSync(LAST_DCLOUD_APPID_KEY, statConfig.appid);
  const uniIdToken = uni.removeStorageSync(UNI_ID_TOKEN_KEY);
  if (!uniIdToken) {
    return
  }
  console.warn('检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）');
  uni.removeStorageSync(UNI_ID_TOKEN_KEY);
  uni.removeStorageSync(UNI_ID_TOKEN_EXPIRED_KEY);
}

function getUniCloudClientInfo () {
  return {
    ak: statConfig.appid,
    p: clientOS === 'android' ? 'a' : 'i',
    ut: getPlatformName(), // 平台
    uuid: getUuid()
  }
}

function sign (data, clientSecret) {
  let signString = '';
  Object.keys(data).sort().forEach(function (key) {
    if (data[key]) {
      signString = signString + '&' + key + '=' + data[key];
    }
  });
  signString = signString.slice(1);
  return hmacMd5(signString, clientSecret).toString()
}

function wrappedRequest (args, request) {
  return new Promise((resolve, reject) => {
    request(Object.assign(args, {
      complete (res) {
        if (!res) {
          res = {};
        }
        if (process.env.VUE_APP_PLATFORM === 'h5' && process.env.NODE_ENV ===
        'development' && res.errMsg && res.errMsg.indexOf('request:fail') === 0) {
          console.warn('发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5');
        }
        const requestId = (res.data && res.data.header && res.data.header['x-serverless-request-id']) || (res.header && res.header['request-id']);
        if (!res.statusCode || res.statusCode >= 400) {
          return reject(new UniCloudError({
            code: 'SYS_ERR',
            message: res.errMsg || 'request:fail',
            requestId
          }))
        }
        const response = res.data;
        if (response.error) {
          return reject(new UniCloudError({
            code: response.error.code,
            message: response.error.message,
            requestId
          }))
        }
        // 拉齐云开发返回值
        response.result = response.data;
        response.requestId = requestId;
        delete response.data;
        resolve(response);
      }
    }));
  })
}

var codec = {
  sign,
  wrappedRequest
};

// 适配器需实现的功能
const defaultAdapter = {
  request (options) {
    // {
    //   url,
    //   method,
    //   data,
    //   dataType,
    //   header,
    //   success,
    //   fail,
    //   complete
    // }
    return uni.request(options)
  },
  uploadFile (options) {
    // {
    //   url,
    //   formData,
    //   name,
    //   filePath,
    //   fileType,
    //   header,
    //   success,
    //   fail
    // }
    return uni.uploadFile(options)
  },
  // quickapp-native 不支持同步接口setStorageSync和getStorageSync
  setStorageSync (key, data) {
    return uni.setStorageSync(key, data)
  },
  getStorageSync (key) {
    return uni.getStorageSync(key)
  },
  removeStorageSync (key) {
    return uni.removeStorageSync(key)
  },
  clearStorageSync () {
    return uni.clearStorageSync()
  }
};

class Client {
  constructor (args) {
    const argsRequired = ['spaceId', 'clientSecret'];
    argsRequired.forEach((item) => {
      if (!Object.prototype.hasOwnProperty.call(args, item)) {
        throw new Error(t('uniCloud.init.paramRequired', { param: item }))
      }
    });
    this.config = Object.assign({}, {
      endpoint: 'https://api.bspapp.com'
    }, args);
    this.config.provider = 'aliyun';
    this.config.requestUrl = this.config.endpoint + '/client';
    this.config.envType = this.config.envType || 'public';
    this.config.accessTokenKey = 'access_token_' + this.config.spaceId;
    this.adapter = defaultAdapter;
  }

  get hasAccessToken () {
    return !!this.accessToken
  }

  setAccessToken (accessToken) {
    // 阿里云token有效期只有十分钟，没必要持久化存储
    // uni.setStorage(this.config.accessTokenKey, accessToken)
    this.accessToken = accessToken;
  }

  requestWrapped (options) {
    return codec.wrappedRequest(options, this.adapter.request)
  }

  requestAuth (options) {
    return this.requestWrapped(options)
  }

  request (options, retried) {
    // 阻塞callFunction等的执行
    return Promise.resolve().then(() => {
      if (!this.hasAccessToken) {
        return this.getAccessToken().then(() => {
          const optionsCloned = this.rebuildRequest(options);
          return this.request(optionsCloned, true)
        })
      }
      if (retried) {
        return this.requestWrapped(options)
      } else {
        return this.requestWrapped(options).catch((err) => {
          return new Promise((resolve, reject) => {
            if (err && (err.code === 'GATEWAY_INVALID_TOKEN' || err.code === 'InvalidParameter.InvalidToken')) {
              resolve();
            } else {
              reject(err);
            }
          }).then(() => {
            return this.getAccessToken()
          }).then(() => {
            const optionsCloned = this.rebuildRequest(options);
            return this.request(optionsCloned, true)
          })
        })
      }
    })
  }

  rebuildRequest (options) {
    const optionsCloned = Object.assign({}, options);
    optionsCloned.data.token = this.accessToken;
    optionsCloned.header['x-basement-token'] = this.accessToken;
    optionsCloned.header['x-serverless-sign'] = codec.sign(optionsCloned.data, this.config.clientSecret);
    return optionsCloned
  }

  setupRequest (body, type) {
    const data = Object.assign({}, body, {
      spaceId: this.config.spaceId,
      timestamp: Date.now()
    });
    const header = {
      'Content-Type': 'application/json'
    };

    if (type !== 'auth') {
      data.token = this.accessToken;
      header['x-basement-token'] = this.accessToken;
    }

    header['x-serverless-sign'] = codec.sign(data, this.config.clientSecret);

    return {
      url: this.config.requestUrl,
      method: 'POST',
      data,
      dataType: 'json',
      header
    }
  }

  getAccessToken () {
    const body = {
      method: 'serverless.auth.user.anonymousAuthorize',
      params: '{}'
    };
    return this.requestAuth(this.setupRequest(body, 'auth')).then((res) => {
      return new Promise((resolve, reject) => {
        if (res.result && res.result.accessToken) {
          this.setAccessToken(res.result.accessToken);
          resolve(this.accessToken);
        } else {
          reject(new UniCloudError({
            code: 'AUTH_FAILED',
            message: '获取accessToken失败'
          }));
        }
      })
    })
  }

  authorize () {
    this.getAccessToken();
  }

  callFunction (options) {
    const body = {
      method: 'serverless.function.runtime.invoke',
      params: JSON.stringify({
        functionTarget: options.name,
        functionArgs: options.data || {}
      })
    };
    return this.request(this.setupRequest(body))
  }

  getOSSUploadOptionsFromPath (options) {
    const body = {
      method: 'serverless.file.resource.generateProximalSign',
      params: JSON.stringify(options)
    };
    return this.request(this.setupRequest(body))
  }

  uploadFileToOSS ({
    url,
    formData,
    name,
    filePath,
    fileType,
    onUploadProgress
  }) {
    return new Promise((resolve, reject) => {
      const uploadTask = this.adapter.uploadFile({
        url,
        formData,
        name,
        filePath,
        fileType,
        header: {
          'X-OSS-server-side-encrpytion': 'AES256'
        },
        success (res) {
          if (res && res.statusCode < 400) {
            resolve(res);
          } else {
            reject(new UniCloudError({
              code: 'UPLOAD_FAILED',
              message: '文件上传失败'
            }));
          }
        },
        fail (err) {
          reject(new UniCloudError({
            code: err.code || 'UPLOAD_FAILED',
            message: err.message || err.errMsg || '文件上传失败'
          }));
        }
      });
      if (typeof onUploadProgress === 'function' && uploadTask && typeof uploadTask.onProgressUpdate === 'function') {
        uploadTask.onProgressUpdate((res) => {
          onUploadProgress({
            loaded: res.totalBytesSent,
            total: res.totalBytesExpectedToSend
          });
        });
      }
    })
  }

  reportOSSUpload (params) {
    const body = {
      method: 'serverless.file.resource.report',
      params: JSON.stringify(params)
    };
    return this.request(this.setupRequest(body))
  }

  uploadFile ({
    filePath,
    cloudPath,
    fileType = 'image',
    onUploadProgress,
    config
  }) {
    if (!cloudPath) {
      throw new UniCloudError({
        code: 'CLOUDPATH_REQUIRED',
        message: 'cloudPath不可为空'
      })
    }
    const env = (config && config.envType) || this.config.envType;
    let uploadId, fileUrl;
    return this.getOSSUploadOptionsFromPath({
      env,
      filename: cloudPath
    }).then((res) => {
      const uploadOptionsResult = res.result;
      uploadId = uploadOptionsResult.id;
      fileUrl = 'https://' + uploadOptionsResult.cdnDomain + '/' + uploadOptionsResult.ossPath;
      const uploadFileToOSSOptions = {
        url: 'https://' + uploadOptionsResult.host,
        formData: {
          'Cache-Control': 'max-age=2592000',
          'Content-Disposition': 'attachment',
          OSSAccessKeyId: uploadOptionsResult.accessKeyId,
          Signature: uploadOptionsResult.signature,
          host: uploadOptionsResult.host,
          id: uploadId,
          key: uploadOptionsResult.ossPath,
          policy: uploadOptionsResult.policy,
          success_action_status: 200
        },
        fileName: 'file',
        name: 'file',
        filePath: filePath,
        fileType
      };
      return this.uploadFileToOSS(Object.assign({}, uploadFileToOSSOptions, {
        onUploadProgress
      }))
    }).then(() => {
      return this.reportOSSUpload({
        id: uploadId
      })
    }).then((res) => {
      return new Promise((resolve, reject) => {
        if (res.success) {
          resolve({
            success: true,
            filePath,
            fileID: fileUrl
          });
        } else {
          reject(new UniCloudError({
            code: 'UPLOAD_FAILED',
            message: '文件上传失败'
          }));
        }
      })
    })
  }

  deleteFile ({
    fileList
  }) {
    const body = {
      method: 'serverless.file.resource.delete',
      params: JSON.stringify({
        id: fileList[0]
      })
    };
    return this.request(this.setupRequest(body))
  }

  getTempFileURL ({
    fileList
  } = {}) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(fileList) || fileList.length === 0) {
        reject(new UniCloudError({
          code: 'INVALID_PARAM',
          message: 'fileList的元素必须是非空的字符串'
        }));
      }
      resolve({
        fileList: fileList.map(item => {
          return {
            fileID: item,
            tempFileURL: item
          }
        })
      });
    })
  }
}

const uniCloud = {
  init (config) {
    const uniClient = new Client(config);
    // callFunction、uploadFile 在 core 内 callbackify
    const callbackifyListClient = ['deleteFile', 'getTempFileURL'];
    callbackifyListClient.forEach((item) => {
      uniClient[item] = callbackify(uniClient[item]).bind(uniClient);
    });

    const authObj = {
      signInAnonymously: function () {
        return uniClient.authorize()
      },
      // 阿里云暂时这么实现
      getLoginState: function () {
        return Promise.resolve(false)
      }
    };

    uniClient.auth = function () {
      return authObj
    };
    uniClient.customAuth = uniClient.auth;

    return uniClient
  }
};

// import * as packageInfo from './package.json';
const SDK_VERISON = '1.3.5';
const ACCESS_TOKEN = 'access_token';
const ACCESS_TOKEN_Expire = 'access_token_expire';
const REFRESH_TOKEN = 'refresh_token';
const ANONYMOUS_UUID = 'anonymous_uuid';
const LOGIN_TYPE_KEY = 'login_type';
const USER_INFO_KEY = 'user_info';
const protocol = typeof location !== 'undefined' && location.protocol === 'http:' ? 'http:' : 'https:';
// debug
// export const protocol = 'http:'
// export const BASE_URL = '//118.126.68.63/web';
const BASE_URL = typeof process !== 'undefined' && process.env.NODE_ENV === 'e2e' && process.env.END_POINT === 'pre'
    ? '//tcb-pre.tencentcloudapi.com/web'
    : '//tcb-api.tencentcloudapi.com/web';
// debug
// export const BASE_URL = '//localhost:8002/web';
// export const BASE_URL = '//9.88.239.245/web';
// export const BASE_URL = '//tcb-api.tencentcloudapi.com:8002/web';
// export const BASE_URL = '//212.129.229.68/web';
// export const dataVersion = '2020-01-10';

var StorageType;
(function (StorageType) {
    StorageType["local"] = "local";
    StorageType["none"] = "none";
    StorageType["session"] = "session";
})(StorageType || (StorageType = {}));
var AbstractStorage = (function () {
    function AbstractStorage() {
    }
    return AbstractStorage;
}());

var sha256 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory(core);
	}
}(commonjsGlobal, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));
});

var hmacSha256 = createCommonjsModule(function (module, exports) {
(function (root, factory, undef) {
	{
		// CommonJS
		module.exports = exports = factory(core, sha256, hmac);
	}
}(commonjsGlobal, function (CryptoJS) {

	return CryptoJS.HmacSHA256;

}));
});

var encBase64 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory(core);
	}
}(commonjsGlobal, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));
});

var encUtf8 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory(core);
	}
}(commonjsGlobal, function (CryptoJS) {

	return CryptoJS.enc.Utf8;

}));
});

const createPromiseCallback = () => {
    let cb;
    if (!Promise) {
        cb = () => { };
        cb.promise = {};
        const throwPromiseNotDefined = () => {
            throw new Error('Your Node runtime does support ES6 Promises. ' +
                'Set "global.Promise" to your preferred implementation of promises.');
        };
        Object.defineProperty(cb.promise, 'then', { get: throwPromiseNotDefined });
        Object.defineProperty(cb.promise, 'catch', { get: throwPromiseNotDefined });
        return cb;
    }
    const promise = new Promise((resolve, reject) => {
        cb = (err, data) => {
            if (err)
                return reject(err);
            return resolve(data);
        };
    });
    cb.promise = promise;
    return cb;
};
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}
function isString(val) {
    return typeof val === 'string';
}
function isUndefined(val) {
    return typeof val === 'undefined';
}
function isNull(val) {
    return Object.prototype.toString.call(val) === '[object Null]';
}
function isInstanceOf(instance, construct) {
    return instance instanceof construct;
}
function isFormData(val) {
    return Object.prototype.toString.call(val) === '[object FormData]';
}
function genSeqId() {
    return Math.random().toString(16).slice(2);
}
function formatUrl(protocol, url, query = {}) {
    const urlHasQuery = /\?/.test(url);
    let queryString = '';
    for (let key in query) {
        if (queryString === '') {
            !urlHasQuery && (url += '?');
        }
        else {
            queryString += '&';
        }
        queryString += `${key}=${encodeURIComponent(query[key])}`;
    }
    url += queryString;
    if (/^http(s)?\:\/\//.test(url)) {
        return url;
    }
    return `${protocol}${url}`;
}

// import * as Web from './platforms/web';
var RUNTIME;
(function (RUNTIME) {
    RUNTIME["WEB"] = "web";
    RUNTIME["WX_MP"] = "wx_mp"; // 微信小程序
})(RUNTIME || (RUNTIME = {}));
function useAdapters(adapters) {
    const adapterList = isArray(adapters) ? adapters : [adapters];
    for (const adapter of adapterList) {
        const { isMatch, genAdapter, runtime } = adapter;
        if (isMatch()) {
            return {
                adapter: genAdapter(),
                runtime
            };
        }
    }
}
// export function useDefaultAdapter() {
//   return {
//     adapter: Web.genAdapter(),
//     runtime: RUNTIME.WEB
//   };
// }
const Adapter = {
    adapter: null,
    runtime: undefined
};

/**
 * @constant 始终存储在localstorage中的key集合
 */
const alwaysLocalKeys = ['anonymousUuidKey'];
class TcbObject extends AbstractStorage {
    constructor() {
        super();
        if (!Adapter.adapter.root['tcbObject']) {
            Adapter.adapter.root['tcbObject'] = {};
        }
    }
    // 保存数据到
    setItem(key, value) {
        Adapter.adapter.root['tcbObject'][key] = value;
    }
    // 获取数据
    getItem(key) {
        return Adapter.adapter.root['tcbObject'][key];
    }
    // 删除保存的数据
    removeItem(key) {
        delete Adapter.adapter.root['tcbObject'][key];
    }
    // 删除所有保存的数据
    clear() {
        delete Adapter.adapter.root['tcbObject'];
    }
}
function createStorage(persistence, adapter) {
    switch (persistence) {
        case 'local':
            return adapter.localStorage || new TcbObject();
        case 'none':
            return new TcbObject();
        default:
            return adapter.sessionStorage || new TcbObject();
    }
}
class ICache {
    constructor(config) {
        if (!this._storage) {
            this._persistence = Adapter.adapter.primaryStorage || config.persistence;
            this._storage = createStorage(this._persistence, Adapter.adapter);
            const accessTokenKey = `${ACCESS_TOKEN}_${config.env}`;
            const accessTokenExpireKey = `${ACCESS_TOKEN_Expire}_${config.env}`;
            const refreshTokenKey = `${REFRESH_TOKEN}_${config.env}`;
            const anonymousUuidKey = `${ANONYMOUS_UUID}_${config.env}`;
            const loginTypeKey = `${LOGIN_TYPE_KEY}_${config.env}`;
            const userInfoKey = `${USER_INFO_KEY}_${config.env}`;
            this.keys = {
                accessTokenKey,
                accessTokenExpireKey,
                refreshTokenKey,
                anonymousUuidKey,
                loginTypeKey,
                userInfoKey
            };
        }
    }
    updatePersistence(persistence) {
        if (persistence === this._persistence) {
            return;
        }
        const isCurrentLocal = this._persistence === 'local';
        this._persistence = persistence;
        const storage = createStorage(persistence, Adapter.adapter);
        // 切换persistence重新创建storage对象
        for (const key in this.keys) {
            const name = this.keys[key];
            // 如果当前为local并且key被设定为始终存储在localstorage中，则不迁移
            if (isCurrentLocal && alwaysLocalKeys.includes(key)) {
                continue;
            }
            const val = this._storage.getItem(name);
            if (!isUndefined(val) && !isNull(val)) {
                storage.setItem(name, val);
                this._storage.removeItem(name);
            }
        }
        this._storage = storage;
    }
    setStore(key, value, version) {
        if (!this._storage) {
            return;
        }
        const d = {
            version: version || 'localCachev1',
            content: value
        };
        const content = JSON.stringify(d);
        try {
            this._storage.setItem(key, content);
        }
        catch (e) {
            throw e;
        }
        return;
    }
    /*
     *获取缓存
     */
    getStore(key, version) {
        // forceLocal强制取localstory
        try {
            //测试用例使用
            // if (typeof process !== 'undefined' && process.env && process.env.tcb_token) {
            //   return process.env.tcb_token;
            // }
            if (!this._storage) {
                return;
            }
        }
        catch (e) {
            return '';
        }
        version = version || 'localCachev1';
        const content = this._storage.getItem(key);
        if (!content) {
            return '';
        }
        if (content.indexOf(version) >= 0) {
            const d = JSON.parse(content);
            return d.content;
        }
        else {
            return '';
        }
    }
    /*
     *删除缓存
     */
    removeStore(key) {
        this._storage.removeItem(key);
    }
}
const cacheMap = {};
// 本地存储
const localCacheMap = {};
function initCache(config) {
    const { env } = config;
    cacheMap[env] = new ICache(config);
    localCacheMap[env] = new ICache({
        ...config,
        persistence: 'local'
    });
}
function getCache(env) {
    return cacheMap[env];
}
function getLocalCache(env) {
    return localCacheMap[env];
}

/**
 * @private
 * @function _addEventListener - 添加监听
 * @param {string} name - event名称
 * @param {Function} listener - 响应函数
 * @param {Listeners} listeners - 已存响应函数集合
 */
function _addEventListener(name, listener, listeners) {
    listeners[name] = listeners[name] || [];
    listeners[name].push(listener);
}
/**
 * @private
 * @function _removeEventListener - 移除监听
 * @param {string} name - event名称
 * @param {Function} listener - 响应函数
 * @param {Listeners} listeners - 已存响应函数集合
 */
function _removeEventListener(name, listener, listeners) {
    if (listeners && listeners[name]) {
        const index = listeners[name].indexOf(listener);
        if (index !== -1) {
            listeners[name].splice(index, 1);
        }
    }
}
/**
 * 自定义事件
 * @class IEvent
 * @param {string} name - 类型
 * @param {any} data - 数据
 */
class IEvent {
    constructor(name, data) {
        this.data = data || null;
        this.name = name;
    }
}
/**
 * 自定义错误事件
 * @class IErrorEvent
 * @extends IEvent
 * @param {Error} error - 错误信息对象
 * @param {any} data  - 数据
 */
class IErrorEvent extends IEvent {
    constructor(error, data) {
        super('error', { error, data });
        this.error = error;
    }
}
/**
 * @class IEventEmitter
 */
class IEventEmitter {
    constructor() {
        /**
         * @private
         * @readonly
         * @property {Listeners} _listeners - 响应函数集合
         * @default `{}`
         */
        this._listeners = {};
    }
    /**
     * @public
     * @method on - 添加监听
     * @param {string} name - event名称
     * @param {Function} listener - 响应函数
     * @return `this`
     */
    on(name, listener) {
        _addEventListener(name, listener, this._listeners);
        return this;
    }
    /**
     * @public
     * @method off - 移除监听
     * @param {string} name - event名称
     * @param {Function} listener - 响应函数
     * @return `this`
     */
    off(name, listener) {
        _removeEventListener(name, listener, this._listeners);
        return this;
    }
    /**
     * @public
     * @method fire - 触发事件
     * @param {string|IEvent} event - event
     * @return `this`
     */
    fire(event, data) {
        // 打印错误信息
        if (isInstanceOf(event, IErrorEvent)) {
            console.error(event.error);
            return this;
        }
        const ev = isString(event) ? new IEvent(event, data || {}) : event;
        const name = ev.name;
        if (this._listens(name)) {
            ev.target = this;
            const handlers = this._listeners[name] ? [...this._listeners[name]] : [];
            for (const fn of handlers) {
                fn.call(this, ev);
            }
        }
        return this;
    }
    /**
     * @private
     * @method _listens - 判断是否监听了name事件
     * @param {string} name - event名称
     * @return `boolean`
     */
    _listens(name) {
        return this._listeners[name] && this._listeners[name].length > 0;
    }
}
const iEventEmitter = new IEventEmitter();
function addEventListener(event, callback) {
    iEventEmitter.on(event, callback);
}
function activateEvent(event, data = {}) {
    iEventEmitter.fire(event, data);
}
function removeEventListener(event, callback) {
    iEventEmitter.off(event, callback);
}
const EVENTS = {
    LOGIN_STATE_CHANGED: 'loginStateChanged',
    LOGIN_STATE_EXPIRED: 'loginStateExpire',
    LOGIN_TYPE_CHANGED: 'loginTypeChanged',
    ANONYMOUS_CONVERTED: 'anonymousConverted',
    ACCESS_TOKEN_REFRESHD: 'refreshAccessToken'
};

var LOGINTYPE;
(function (LOGINTYPE) {
    LOGINTYPE["ANONYMOUS"] = "ANONYMOUS";
    LOGINTYPE["WECHAT"] = "WECHAT";
    LOGINTYPE["WECHAT_PUBLIC"] = "WECHAT-PUBLIC";
    LOGINTYPE["WECHAT_OPEN"] = "WECHAT-OPEN";
    LOGINTYPE["CUSTOM"] = "CUSTOM";
    LOGINTYPE["EMAIL"] = "EMAIL";
    LOGINTYPE["USERNAME"] = "USERNAME";
    LOGINTYPE["NULL"] = "NULL"; // 保留字，代表未登录
})(LOGINTYPE || (LOGINTYPE = {}));

const actionsWithoutAccessToken = [
    'auth.getJwt',
    'auth.logout',
    'auth.signInWithTicket',
    'auth.signInAnonymously',
    'auth.signIn',
    'auth.fetchAccessTokenWithRefreshToken',
    'auth.signUpWithEmailAndPassword',
    'auth.activateEndUserMail',
    'auth.sendPasswordResetEmail',
    'auth.resetPasswordWithToken',
    'auth.isUsernameRegistered'
];
const commonHeader = {
    // 'X-SDK-Version': `tcb-js-sdk/${SDK_VERISON}`
    'X-SDK-Version': SDK_VERISON
};
function bindHooks(instance, name, hooks) {
    const originMethod = instance[name];
    instance[name] = function (options) {
        const data = {};
        const headers = {};
        hooks.forEach(hook => {
            const { data: appendedData, headers: appendedHeaders } = hook.call(instance, options);
            Object.assign(data, appendedData);
            Object.assign(headers, appendedHeaders);
        });
        const originData = options.data;
        originData && (() => {
            if (isFormData(originData)) {
                for (const key in data) {
                    originData.append(key, data[key]);
                }
                return;
            }
            options.data = {
                ...originData,
                ...data
            };
        })();
        options.headers = {
            ...(options.headers || {}),
            ...headers
        };
        return originMethod.call(instance, options);
    };
}
function beforeEach() {
    const seqId = genSeqId();
    return {
        data: {
            seqId
        },
        headers: {
            ...commonHeader,
            'x-seqid': seqId
        }
    };
}
/**
 * @class IRequest
 */
class IRequest {
    /**
     * 初始化
     * @param config
     */
    constructor(config = {}) {
        this.config = config;
        // eslint-disable-next-line
        this._reqClass = new Adapter.adapter.reqClass({
            timeout: this.config.timeout,
            timeoutMsg: `请求在${this.config.timeout / 1000}s内未完成，已中断`,
            restrictedMethods: ['post']
        });
        this._cache = getCache(this.config.env);
        this._localCache = getLocalCache(this.config.env);
        bindHooks(this._reqClass, 'post', [beforeEach]);
        bindHooks(this._reqClass, 'upload', [beforeEach]);
        bindHooks(this._reqClass, 'download', [beforeEach]);
    }
    async post(options) {
        const res = await this._reqClass.post(options);
        return res;
    }
    async upload(options) {
        const res = await this._reqClass.upload(options);
        return res;
    }
    async download(options) {
        const res = await this._reqClass.download(options);
        return res;
    }
    async refreshAccessToken() {
        // 可能会同时调用多次刷新access token，这里把它们合并成一个
        if (!this._refreshAccessTokenPromise) {
            // 没有正在刷新，那么正常执行刷新逻辑
            this._refreshAccessTokenPromise = this._refreshAccessToken();
        }
        let result;
        let err;
        try {
            result = await this._refreshAccessTokenPromise;
        }
        catch (e) {
            err = e;
        }
        this._refreshAccessTokenPromise = null;
        this._shouldRefreshAccessTokenHook = null;
        if (err) {
            throw err;
        }
        return result;
    }
    // 调用接口刷新access token，并且返回
    async _refreshAccessToken() {
        const { accessTokenKey, accessTokenExpireKey, refreshTokenKey, loginTypeKey, anonymousUuidKey } = this._cache.keys;
        this._cache.removeStore(accessTokenKey);
        this._cache.removeStore(accessTokenExpireKey);
        let refreshToken = this._cache.getStore(refreshTokenKey);
        if (!refreshToken) {
            throw new Error('未登录CloudBase');
        }
        const params = {
            refresh_token: refreshToken,
        };
        const response = await this.request('auth.fetchAccessTokenWithRefreshToken', params);
        if (response.data.code) {
            const { code } = response.data;
            if (code === 'SIGN_PARAM_INVALID' || code === 'REFRESH_TOKEN_EXPIRED' || code === 'INVALID_REFRESH_TOKEN') {
                // 这里处理以下逻辑：
                // 匿名登录时，如果刷新access token报错refresh token过期，此时应该：
                // 1. 再用 uuid 拿一次新的refresh token
                // 2. 拿新的refresh token换access token
                const isAnonymous = this._cache.getStore(loginTypeKey) === LOGINTYPE.ANONYMOUS;
                if (isAnonymous && code === 'INVALID_REFRESH_TOKEN') {
                    // 获取新的 refresh token
                    const anonymous_uuid = this._cache.getStore(anonymousUuidKey);
                    // 此处cache为基类property
                    const refresh_token = this._cache.getStore(refreshTokenKey);
                    const res = await this.send('auth.signInAnonymously', {
                        anonymous_uuid,
                        refresh_token
                    });
                    this.setRefreshToken(res.refresh_token);
                    return this._refreshAccessToken();
                }
                activateEvent(EVENTS.LOGIN_STATE_EXPIRED);
                this._cache.removeStore(refreshTokenKey);
            }
            throw new Error(`刷新access token失败：${response.data.code}`);
        }
        if (response.data.access_token) {
            activateEvent(EVENTS.ACCESS_TOKEN_REFRESHD);
            this._cache.setStore(accessTokenKey, response.data.access_token);
            // 本地时间可能没有同步
            this._cache.setStore(accessTokenExpireKey, response.data.access_token_expire + Date.now());
            return {
                accessToken: response.data.access_token,
                accessTokenExpire: response.data.access_token_expire
            };
        }
        // 匿名登录refresh_token过期情况下返回refresh_token
        // 此场景下使用新的refresh_token获取access_token
        if (response.data.refresh_token) {
            this._cache.removeStore(refreshTokenKey);
            this._cache.setStore(refreshTokenKey, response.data.refresh_token);
            this._refreshAccessToken();
        }
    }
    // 获取access token
    async getAccessToken() {
        const { accessTokenKey, accessTokenExpireKey, refreshTokenKey } = this._cache.keys;
        const refreshToken = this._cache.getStore(refreshTokenKey);
        if (!refreshToken) {
            // 不该出现的状态：有 access token 却没有 refresh token
            throw new Error('refresh token不存在，登录状态异常');
        }
        // 如果没有access token或者过期，那么刷新
        let accessToken = this._cache.getStore(accessTokenKey);
        let accessTokenExpire = this._cache.getStore(accessTokenExpireKey);
        // 调用钩子函数
        let shouldRefreshAccessToken = true;
        if (this._shouldRefreshAccessTokenHook && !(await this._shouldRefreshAccessTokenHook(accessToken, accessTokenExpire))) {
            shouldRefreshAccessToken = false;
        }
        if ((!accessToken || !accessTokenExpire || accessTokenExpire < Date.now()) && shouldRefreshAccessToken) {
            // 返回新的access tolen
            return this.refreshAccessToken();
        }
        else {
            // 返回本地的access token
            return {
                accessToken,
                accessTokenExpire
            };
        }
    }
    /* eslint-disable complexity */
    async request(action, params, options) {
        const tcbTraceKey = `x-tcb-trace_${this.config.env}`;
        let contentType = 'application/x-www-form-urlencoded';
        // const webDeviceId = await getTcbFingerprintId();
        const tmpObj = {
            action,
            // webDeviceId,
            env: this.config.env,
            dataVersion: '2019-08-16',
            ...params
        };
        // 下面几种 action 不需要 access token
        if (actionsWithoutAccessToken.indexOf(action) === -1) {
            const { refreshTokenKey } = this._cache.keys;
            // 若有 refreshToken 则任务有登录态 刷 accessToken
            let refreshToken = this._cache.getStore(refreshTokenKey);
            if (refreshToken) {
                tmpObj.access_token = (await this.getAccessToken()).accessToken;
            }
        }
        // 拼body和content-type
        let payload;
        if (action === 'storage.uploadFile') {
            payload = new FormData();
            for (let key in payload) {
                if (payload.hasOwnProperty(key) && payload[key] !== undefined) {
                    payload.append(key, tmpObj[key]);
                }
            }
            contentType = 'multipart/form-data';
        }
        else {
            contentType = 'application/json;charset=UTF-8';
            payload = {};
            for (let key in tmpObj) {
                if (tmpObj[key] !== undefined) {
                    payload[key] = tmpObj[key];
                }
            }
        }
        let opts = {
            headers: {
                'content-type': contentType
            }
        };
        if (options && options['onUploadProgress']) {
            opts.onUploadProgress = options['onUploadProgress'];
        }
        const traceHeader = this._localCache.getStore(tcbTraceKey);
        if (traceHeader) {
            opts.headers['X-TCB-Trace'] = traceHeader;
        }
        // 非web平台使用凭证检验有效性
        // if (Adapter.runtime !== RUNTIME.WEB) {
        //   const { appSign, appSecret } = this.config;
        //   const timestamp = Date.now();
        //   const { appAccessKey, appAccessKeyId } = appSecret;
        //   const sign = createSign({
        //     data: payload,
        //     timestamp,
        //     appAccessKeyId,
        //     appSign
        //   }, appAccessKey);
        //   opts.headers['X-TCB-App-Source'] = `timestamp=${timestamp};appAccessKeyId=${appAccessKeyId};appSign=${appSign};sign=${sign}`;
        // }
        // 发出请求
        // 新的 url 需要携带 env 参数进行 CORS 校验
        // 请求链接支持添加动态 query 参数，方便用户调试定位请求
        const { parse, inQuery, search } = params;
        let formatQuery = {
            env: this.config.env
        };
        // 尝试解析响应数据为 JSON
        parse && (formatQuery.parse = true);
        inQuery && (formatQuery = {
            ...inQuery,
            ...formatQuery
        });
        // 生成请求 url
        let newUrl = formatUrl(protocol, BASE_URL, formatQuery);
        if (search) {
            newUrl += search;
        }
        const res = await this.post({
            url: newUrl,
            data: payload,
            ...opts
        });
        // 保存 trace header
        const resTraceHeader = res.header && res.header['x-tcb-trace'];
        if (resTraceHeader) {
            this._localCache.setStore(tcbTraceKey, resTraceHeader);
        }
        if ((Number(res.status) !== 200 && Number(res.statusCode) !== 200) || !res.data) {
            throw new Error('network request error');
        }
        return res;
    }
    async send(action, data = {}) {
        const response = await this.request(action, data, { onUploadProgress: data.onUploadProgress });
        if (response.data.code === 'ACCESS_TOKEN_EXPIRED' && actionsWithoutAccessToken.indexOf(action) === -1) {
            // access_token过期，重新获取
            await this.refreshAccessToken();
            const response = await this.request(action, data, { onUploadProgress: data.onUploadProgress });
            if (response.data.code) {
                throw new Error(`[${response.data.code}] ${response.data.message}`);
            }
            return response.data;
        }
        if (response.data.code) {
            throw new Error(`[${response.data.code}] ${response.data.message}`);
        }
        return response.data;
    }
    setRefreshToken(refreshToken) {
        const { accessTokenKey, accessTokenExpireKey, refreshTokenKey } = this._cache.keys;
        // refresh token设置前，先清掉 access token
        this._cache.removeStore(accessTokenKey);
        this._cache.removeStore(accessTokenExpireKey);
        this._cache.setStore(refreshTokenKey, refreshToken);
    }
}
const requestMap = {};
function initRequest(config) {
    requestMap[config.env] = new IRequest(config);
}
function getRequestByEnvId(env) {
    return requestMap[env];
}

class AuthProvider {
    constructor(config) {
        this.config = config;
        this._cache = getCache(config.env);
        this._request = getRequestByEnvId(config.env);
    }
    setRefreshToken(refreshToken) {
        const { accessTokenKey, accessTokenExpireKey, refreshTokenKey } = this._cache.keys;
        // refresh token设置前，先清掉 access token
        this._cache.removeStore(accessTokenKey);
        this._cache.removeStore(accessTokenExpireKey);
        this._cache.setStore(refreshTokenKey, refreshToken);
    }
    setAccessToken(accessToken, accessTokenExpire) {
        const { accessTokenKey, accessTokenExpireKey } = this._cache.keys;
        this._cache.setStore(accessTokenKey, accessToken);
        this._cache.setStore(accessTokenExpireKey, accessTokenExpire);
    }
    async refreshUserInfo() {
        const action = 'auth.getUserInfo';
        const { data: userInfo } = await this._request.send(action, {});
        this.setLocalUserInfo(userInfo);
        return userInfo;
    }
    setLocalUserInfo(userInfo) {
        const { userInfoKey } = this._cache.keys;
        this._cache.setStore(userInfoKey, userInfo);
    }
}
class User {
    constructor(envId) {
        if (!envId) {
            throw new Error('envId is not defined');
        }
        this._envId = envId;
        this._cache = getCache(this._envId);
        this._request = getRequestByEnvId(this._envId);
        this.setUserInfo();
    }
    linkWithTicket(ticket) {
        if (typeof ticket !== 'string') {
            throw new Error('ticket must be string');
        }
        return this._request.send('auth.linkWithTicket', { ticket });
    }
    linkWithRedirect(provider) {
        provider.signInWithRedirect();
    }
    updatePassword(newPassword, oldPassword) {
        return this._request.send('auth.updatePassword', {
            oldPassword,
            newPassword
        });
    }
    updateEmail(newEmail) {
        return this._request.send('auth.updateEmail', {
            newEmail
        });
    }
    updateUsername(username) {
        if (typeof username !== 'string') {
            throw new Error('username must be a string');
        }
        return this._request.send('auth.updateUsername', {
            username
        });
    }
    async getLinkedUidList() {
        const { data } = await this._request.send('auth.getLinkedUidList', {});
        let hasPrimaryUid = false;
        const { users } = data;
        users.forEach(user => {
            if (user.wxOpenId && user.wxPublicId) {
                hasPrimaryUid = true;
            }
        });
        return {
            users,
            hasPrimaryUid
        };
    }
    setPrimaryUid(uid) {
        return this._request.send('auth.setPrimaryUid', { uid });
    }
    unlink(platform) {
        return this._request.send('auth.unlink', { platform });
    }
    async update(userInfo) {
        const { nickName, gender, avatarUrl, province, country, city } = userInfo;
        const { data: newUserInfo } = await this._request.send('auth.updateUserInfo', { nickName, gender, avatarUrl, province, country, city });
        this.setLocalUserInfo(newUserInfo);
    }
    async refresh() {
        const action = 'auth.getUserInfo';
        const { data: userInfo } = await this._request.send(action, {});
        this.setLocalUserInfo(userInfo);
        return userInfo;
    }
    setUserInfo() {
        const { userInfoKey } = this._cache.keys;
        const userInfo = this._cache.getStore(userInfoKey);
        [
            'uid',
            'loginType',
            'openid',
            'wxOpenId',
            'wxPublicId',
            'unionId',
            'qqMiniOpenId',
            'email',
            'hasPassword',
            'customUserId',
            'nickName',
            'gender',
            'avatarUrl',
        ].forEach(infoKey => {
            this[infoKey] = userInfo[infoKey];
        });
        this.location = {
            country: userInfo['country'],
            province: userInfo['province'],
            city: userInfo['city']
        };
    }
    setLocalUserInfo(userInfo) {
        const { userInfoKey } = this._cache.keys;
        this._cache.setStore(userInfoKey, userInfo);
        this.setUserInfo();
    }
}
class LoginState {
    // private _request: IRequest;
    constructor(envId) {
        if (!envId) {
            throw new Error('envId is not defined');
        }
        this._cache = getCache(envId);
        // this._request = getRequestByEnvId(envId);
        const { refreshTokenKey, accessTokenKey, accessTokenExpireKey } = this._cache.keys;
        const refreshToken = this._cache.getStore(refreshTokenKey);
        const accessToken = this._cache.getStore(accessTokenKey);
        const accessTokenExpire = this._cache.getStore(accessTokenExpireKey);
        this.credential = {
            refreshToken,
            accessToken,
            accessTokenExpire
        };
        this.user = new User(envId);
    }
    get isAnonymousAuth() {
        return this.loginType === LOGINTYPE.ANONYMOUS;
    }
    get isCustomAuth() {
        return this.loginType === LOGINTYPE.CUSTOM;
    }
    get isWeixinAuth() {
        return this.loginType === LOGINTYPE.WECHAT || this.loginType === LOGINTYPE.WECHAT_OPEN || this.loginType === LOGINTYPE.WECHAT_PUBLIC;
    }
    get loginType() {
        return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
}

class AnonymousAuthProvider extends AuthProvider {
    async signIn() {
        // 匿名登录前迁移cache到localstorage
        this._cache.updatePersistence('local');
        const { anonymousUuidKey, refreshTokenKey } = this._cache.keys;
        // 如果本地存有uuid则匿名登录时传给server
        const anonymous_uuid = this._cache.getStore(anonymousUuidKey) || undefined;
        // 此处cache为基类property
        const refresh_token = this._cache.getStore(refreshTokenKey) || undefined;
        const res = await this._request.send('auth.signInAnonymously', {
            anonymous_uuid,
            refresh_token
        });
        if (res.uuid && res.refresh_token) {
            this._setAnonymousUUID(res.uuid);
            this.setRefreshToken(res.refresh_token);
            await this._request.refreshAccessToken();
            activateEvent(EVENTS.LOGIN_STATE_CHANGED);
            activateEvent(EVENTS.LOGIN_TYPE_CHANGED, {
                env: this.config.env,
                loginType: LOGINTYPE.ANONYMOUS,
                persistence: 'local'
            });
            const loginState = new LoginState(this.config.env);
            await loginState.user.refresh();
            return loginState;
        }
        else {
            throw new Error('匿名登录失败');
        }
    }
    async linkAndRetrieveDataWithTicket(ticket) {
        const { anonymousUuidKey, refreshTokenKey } = this._cache.keys;
        const uuid = this._cache.getStore(anonymousUuidKey);
        const refresh_token = this._cache.getStore(refreshTokenKey);
        const res = await this._request.send('auth.linkAndRetrieveDataWithTicket', {
            anonymous_uuid: uuid,
            refresh_token,
            ticket
        });
        if (res.refresh_token) {
            // 转正后清除本地保存的匿名uuid
            this._clearAnonymousUUID();
            this.setRefreshToken(res.refresh_token);
            await this._request.refreshAccessToken();
            activateEvent(EVENTS.ANONYMOUS_CONVERTED, { env: this.config.env });
            activateEvent(EVENTS.LOGIN_TYPE_CHANGED, { loginType: LOGINTYPE.CUSTOM, persistence: 'local' });
            return {
                credential: {
                    refreshToken: res.refresh_token
                }
            };
        }
        else {
            throw new Error('匿名转化失败');
        }
    }
    _setAnonymousUUID(id) {
        const { anonymousUuidKey, loginTypeKey } = this._cache.keys;
        this._cache.removeStore(anonymousUuidKey);
        this._cache.setStore(anonymousUuidKey, id);
        this._cache.setStore(loginTypeKey, LOGINTYPE.ANONYMOUS);
    }
    _clearAnonymousUUID() {
        this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
}

class CustomAuthProvider extends AuthProvider {
    async signIn(ticket) {
        if (typeof ticket !== 'string') {
            throw new Error('ticket must be a string');
        }
        const { refreshTokenKey } = this._cache.keys;
        const res = await this._request.send('auth.signInWithTicket', {
            ticket,
            refresh_token: this._cache.getStore(refreshTokenKey) || ''
        });
        if (res.refresh_token) {
            this.setRefreshToken(res.refresh_token);
            await this._request.refreshAccessToken();
            activateEvent(EVENTS.LOGIN_STATE_CHANGED);
            activateEvent(EVENTS.LOGIN_TYPE_CHANGED, {
                env: this.config.env,
                loginType: LOGINTYPE.CUSTOM,
                persistence: this.config.persistence
            });
            // set user info
            await this.refreshUserInfo();
            return new LoginState(this.config.env);
        }
        else {
            throw new Error('自定义登录失败');
        }
    }
}

class EmailAuthProvider extends AuthProvider {
    async signIn(email, password) {
        if (typeof email !== 'string') {
            throw new Error('email must be a string');
        }
        const { refreshTokenKey } = this._cache.keys;
        const res = await this._request.send('auth.signIn', {
            loginType: 'EMAIL',
            email,
            password,
            refresh_token: this._cache.getStore(refreshTokenKey) || ''
        });
        const { refresh_token, access_token, access_token_expire } = res;
        if (refresh_token) {
            this.setRefreshToken(refresh_token);
            if (access_token && access_token_expire) {
                this.setAccessToken(access_token, access_token_expire);
            }
            else {
                await this._request.refreshAccessToken();
            }
            // set user info
            await this.refreshUserInfo();
            activateEvent(EVENTS.LOGIN_STATE_CHANGED);
            activateEvent(EVENTS.LOGIN_TYPE_CHANGED, {
                env: this.config.env,
                loginType: LOGINTYPE.EMAIL,
                persistence: this.config.persistence
            });
            return new LoginState(this.config.env);
        }
        else if (res.code) {
            throw new Error(`邮箱登录失败: [${res.code}] ${res.message}`);
        }
        else {
            throw new Error('邮箱登录失败');
        }
    }
    async activate(token) {
        return this._request.send('auth.activateEndUserMail', {
            token
        });
    }
    async resetPasswordWithToken(token, newPassword) {
        return this._request.send('auth.resetPasswordWithToken', {
            token,
            newPassword
        });
    }
}

class UsernameAuthProvider extends AuthProvider {
    async signIn(username, password) {
        if (typeof username !== 'string') {
            throw new Error('username must be a string');
        }
        // 用户不设置密码
        if (typeof password !== 'string') {
            password = '';
            console.warn('password is empty');
        }
        const { refreshTokenKey } = this._cache.keys;
        const res = await this._request.send('auth.signIn', {
            loginType: LOGINTYPE.USERNAME,
            username,
            password,
            refresh_token: this._cache.getStore(refreshTokenKey) || ''
        });
        const { refresh_token, access_token_expire, access_token } = res;
        if (refresh_token) {
            this.setRefreshToken(refresh_token);
            if (access_token && access_token_expire) {
                this.setAccessToken(access_token, access_token_expire);
            }
            else {
                await this._request.refreshAccessToken();
            }
            // set user info
            await this.refreshUserInfo();
            activateEvent(EVENTS.LOGIN_STATE_CHANGED);
            activateEvent(EVENTS.LOGIN_TYPE_CHANGED, {
                env: this.config.env,
                loginType: LOGINTYPE.USERNAME,
                persistence: this.config.persistence
            });
            return new LoginState(this.config.env);
        }
        else if (res.code) {
            throw new Error(`用户名密码登录失败: [${res.code}] ${res.message}`);
        }
        else {
            throw new Error(`用户名密码登录失败`);
        }
    }
}

// import { WeixinAuthProvider } from './weixinAuthProvider';
// export interface UserInfo {
//   openid: string;
//   nickname?: string;
//   sex?: number;
//   province?: string;
//   city?: string;
//   country?: string;
//   headimgurl?: string;
//   privilege?: [string];
//   unionid?: string;
// }
class Auth {
    constructor(config) {
        this.config = config;
        this._cache = getCache(config.env);
        this._request = getRequestByEnvId(config.env);
        this._onAnonymousConverted = this._onAnonymousConverted.bind(this);
        this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this);
        addEventListener(EVENTS.LOGIN_TYPE_CHANGED, this._onLoginTypeChanged);
    }
    get currentUser() {
        const loginState = this.hasLoginState();
        if (loginState) {
            return loginState.user || null;
        }
        else {
            return null;
        }
    }
    get loginType() {
        return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    // weixinAuthProvider({ appid, scope, state }) {
    //   return new WeixinAuthProvider(this.config, appid, scope, state);
    // }
    anonymousAuthProvider() {
        return new AnonymousAuthProvider(this.config);
    }
    customAuthProvider() {
        return new CustomAuthProvider(this.config);
    }
    emailAuthProvider() {
        return new EmailAuthProvider(this.config);
    }
    usernameAuthProvider() {
        return new UsernameAuthProvider(this.config);
    }
    async signInAnonymously() {
        return new AnonymousAuthProvider(this.config).signIn();
    }
    async signInWithEmailAndPassword(email, password) {
        return new EmailAuthProvider(this.config).signIn(email, password);
    }
    signInWithUsernameAndPassword(username, password) {
        return new UsernameAuthProvider(this.config).signIn(username, password);
    }
    async linkAndRetrieveDataWithTicket(ticket) {
        if (!this._anonymousAuthProvider) {
            this._anonymousAuthProvider = new AnonymousAuthProvider(this.config);
        }
        addEventListener(EVENTS.ANONYMOUS_CONVERTED, this._onAnonymousConverted);
        const result = await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(ticket);
        return result;
    }
    async signOut() {
        if (this.loginType === LOGINTYPE.ANONYMOUS) {
            throw new Error('匿名用户不支持登出操作');
        }
        const { refreshTokenKey, accessTokenKey, accessTokenExpireKey } = this._cache.keys;
        const action = 'auth.logout';
        const refresh_token = this._cache.getStore(refreshTokenKey);
        if (!refresh_token) {
            return;
        }
        const res = await this._request.send(action, { refresh_token });
        this._cache.removeStore(refreshTokenKey);
        this._cache.removeStore(accessTokenKey);
        this._cache.removeStore(accessTokenExpireKey);
        activateEvent(EVENTS.LOGIN_STATE_CHANGED);
        activateEvent(EVENTS.LOGIN_TYPE_CHANGED, {
            env: this.config.env,
            loginType: LOGINTYPE.NULL,
            persistence: this.config.persistence
        });
        return res;
    }
    async signUpWithEmailAndPassword(email, password) {
        return this._request.send('auth.signUpWithEmailAndPassword', {
            email, password
        });
    }
    async sendPasswordResetEmail(email) {
        return this._request.send('auth.sendPasswordResetEmail', {
            email
        });
    }
    onLoginStateChanged(callback) {
        addEventListener(EVENTS.LOGIN_STATE_CHANGED, () => {
            const loginState = this.hasLoginState();
            callback.call(this, loginState);
        });
        // 立刻执行一次回调
        const loginState = this.hasLoginState();
        callback.call(this, loginState);
    }
    onLoginStateExpired(callback) {
        addEventListener(EVENTS.LOGIN_STATE_EXPIRED, callback.bind(this));
    }
    onAccessTokenRefreshed(callback) {
        addEventListener(EVENTS.ACCESS_TOKEN_REFRESHD, callback.bind(this));
    }
    onAnonymousConverted(callback) {
        addEventListener(EVENTS.ANONYMOUS_CONVERTED, callback.bind(this));
    }
    onLoginTypeChanged(callback) {
        addEventListener(EVENTS.LOGIN_TYPE_CHANGED, () => {
            const loginState = this.hasLoginState();
            callback.call(this, loginState);
        });
    }
    async getAccessToken() {
        return {
            accessToken: (await this._request.getAccessToken()).accessToken,
            env: this.config.env
        };
    }
    hasLoginState() {
        const { refreshTokenKey } = this._cache.keys;
        const refreshToken = this._cache.getStore(refreshTokenKey);
        if (refreshToken) {
            return new LoginState(this.config.env);
        }
        else {
            return null;
        }
    }
    async isUsernameRegistered(username) {
        if (typeof username !== 'string') {
            throw new Error('username must be a string');
        }
        const { data } = await this._request.send('auth.isUsernameRegistered', {
            username
        });
        return data && data.isRegistered;
    }
    getLoginState() {
        return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(ticket) {
        return new CustomAuthProvider(this.config).signIn(ticket);
    }
    shouldRefreshAccessToken(hook) {
        this._request._shouldRefreshAccessTokenHook = hook.bind(this);
    }
    getUserInfo() {
        const action = 'auth.getUserInfo';
        // console.warn('Auth.getUserInfo() 将会在下个主版本下线，请使用 Auth.currentUser 来获取用户信息');
        return this._request.send(action, {}).then(res => {
            if (res.code) {
                return res;
            }
            else {
                return {
                    ...res.data,
                    requestId: res.seqId
                };
            }
        });
    }
    getAuthHeader() {
        const { refreshTokenKey, accessTokenKey } = this._cache.keys;
        const refreshToken = this._cache.getStore(refreshTokenKey);
        const accessToken = this._cache.getStore(accessTokenKey);
        return {
            'x-cloudbase-credentials': accessToken + '/@@/' + refreshToken
        };
    }
    _onAnonymousConverted(ev) {
        const { env } = ev.data;
        if (env !== this.config.env) {
            return;
        }
        // 匿名转正后迁移cache
        this._cache.updatePersistence(this.config.persistence);
        // removeEventListener(EVENTS.ANONYMOUS_CONVERTED, this._onAnonymousConverted);
    }
    _onLoginTypeChanged(ev) {
        const { loginType, persistence, env } = ev.data;
        if (env !== this.config.env) {
            return;
        }
        // 登录态转变后迁移cache，防止在匿名登录状态下cache混用
        this._cache.updatePersistence(persistence);
        this._cache.setStore(this._cache.keys.loginTypeKey, loginType);
    }
}

/*
 * 上传文件
 * @param {string} cloudPath 上传后的文件路径
 * @param {fs.ReadStream} filePath  上传文件的临时路径
 */
const uploadFile = function (params, callback) {
    callback = callback || createPromiseCallback();
    const request = getRequestByEnvId(this.config.env);
    const metaData = 'storage.getUploadMetadata';
    const { cloudPath, filePath, onUploadProgress, fileType = 'image' } = params;
    request
        .send(metaData, {
        path: cloudPath
    })
        .then(metaData => {
        const { data: { url, authorization, token, fileId, cosFileId }, requestId } = metaData;
        // 使用临时密匙上传文件
        // https://cloud.tencent.com/document/product/436/14048
        const data = {
            key: cloudPath,
            signature: authorization,
            'x-cos-meta-fileid': cosFileId,
            'success_action_status': '201',
            'x-cos-security-token': token
        };
        // @ts-ignore
        request.upload({
            url,
            data,
            file: filePath,
            name: cloudPath,
            fileType,
            onUploadProgress
        }).then((res) => {
            if (res.statusCode === 201) {
                callback(null, {
                    fileID: fileId,
                    requestId
                });
            }
            else {
                callback(new Error(`STORAGE_REQUEST_FAIL: ${res.data}`));
            }
        })
            .catch(err => {
            callback(err);
        });
    })
        .catch(err => {
        callback(err);
    });
    return callback.promise;
};
const getUploadMetadata = function (params, callback) {
    callback = callback || createPromiseCallback();
    const request = getRequestByEnvId(this.config.env);
    const metaData = 'storage.getUploadMetadata';
    const { cloudPath } = params;
    request
        .send(metaData, {
        path: cloudPath
    })
        .then(metaData => {
        callback(null, metaData);
    })
        .catch(err => {
        callback(err);
    });
    return callback.promise;
};
/**
 * 删除文件
 * @param {Array.<string>} fileList 文件id数组
 */
const deleteFile = function ({ fileList }, callback) {
    callback = callback || createPromiseCallback();
    if (!fileList || !Array.isArray(fileList)) {
        return {
            code: 'INVALID_PARAM',
            message: 'fileList必须是非空的数组'
        };
    }
    for (let file of fileList) {
        if (!file || typeof file !== 'string') {
            return {
                code: 'INVALID_PARAM',
                message: 'fileList的元素必须是非空的字符串'
            };
        }
    }
    const action = 'storage.batchDeleteFile';
    const params = {
        fileid_list: fileList
    };
    const request = getRequestByEnvId(this.config.env);
    request
        .send(action, params)
        .then(res => {
        if (res.code) {
            callback(null, res);
        }
        else {
            callback(null, {
                fileList: res.data.delete_list,
                requestId: res.requestId
            });
        }
    })
        .catch(err => {
        callback(err);
    });
    return callback.promise;
};
/**
 * 获取文件下载链接
 * @param {Array.<Object>} fileList
 */
const getTempFileURL = function ({ fileList }, callback) {
    callback = callback || createPromiseCallback();
    if (!fileList || !Array.isArray(fileList)) {
        callback(null, {
            code: 'INVALID_PARAM',
            message: 'fileList必须是非空的数组'
        });
    }
    let file_list = [];
    for (let file of fileList) {
        if (typeof file === 'object') {
            if (!file.hasOwnProperty('fileID') || !file.hasOwnProperty('maxAge')) {
                callback(null, {
                    code: 'INVALID_PARAM',
                    message: 'fileList的元素必须是包含fileID和maxAge的对象'
                });
            }
            file_list.push({
                fileid: file.fileID,
                max_age: file.maxAge
            });
        }
        else if (typeof file === 'string') {
            file_list.push({
                fileid: file
            });
        }
        else {
            callback(null, {
                code: 'INVALID_PARAM',
                message: 'fileList的元素必须是字符串'
            });
        }
    }
    const action = 'storage.batchGetDownloadUrl';
    const params = {
        file_list
    };
    // console.log(params);
    const request = getRequestByEnvId(this.config.env);
    request
        .send(action, params)
        .then(res => {
        // console.log(res);
        if (res.code) {
            callback(null, res);
        }
        else {
            callback(null, {
                fileList: res.data.download_list,
                requestId: res.requestId
            });
        }
    })
        .catch(err => {
        callback(err);
    });
    return callback.promise;
};
const downloadFile = async function ({ fileID }, callback) {
    const tmpUrlRes = await getTempFileURL.call(this, {
        fileList: [
            {
                fileID,
                maxAge: 600
            }
        ]
    });
    const res = tmpUrlRes.fileList[0];
    if (res.code !== 'SUCCESS') {
        return callback ? callback(res) : new Promise(resolve => { resolve(res); });
    }
    const request = getRequestByEnvId(this.config.env);
    let tmpUrl = res.download_url;
    tmpUrl = encodeURI(tmpUrl);
    if (callback) {
        const result = await request.download({ url: tmpUrl });
        callback(result);
    }
    else {
        return request.download({ url: tmpUrl });
    }
};

const callFunction = function ({ name, data, query, parse, search }, callback) {
    const promisedCallback = callback || createPromiseCallback();
    let jsonData;
    try {
        jsonData = data ? JSON.stringify(data) : '';
    }
    catch (e) {
        return Promise.reject(e);
    }
    if (!name) {
        return Promise.reject(new Error('函数名不能为空'));
    }
    const action = 'functions.invokeFunction';
    const params = {
        inQuery: query,
        parse,
        search,
        function_name: name,
        request_data: jsonData
    };
    const request = getRequestByEnvId(this.config.env);
    request
        .send(action, params)
        .then((res) => {
        if (res.code) {
            promisedCallback(null, res);
        }
        else {
            let result = res.data.response_data;
            // parse 为 true 时服务端解析 JSON，SDK 不再次解析
            if (parse) {
                promisedCallback(null, {
                    result,
                    requestId: res.requestId
                });
            }
            else {
                try {
                    result = JSON.parse(res.data.response_data);
                    promisedCallback(null, {
                        result,
                        requestId: res.requestId
                    });
                }
                catch (e) {
                    promisedCallback(new Error('response data must be json'));
                }
            }
        }
        return promisedCallback.promise;
    })
        .catch((err) => {
        promisedCallback(err);
    });
    return promisedCallback.promise;
};

// import { Db } from '@cloudbase/database';
/**
 * @constant 默认配置
 */
const DEFAULT_INIT_CONFIG = {
    timeout: 15000,
    persistence: 'session'
};
// timeout上限10分钟
const MAX_TIMEOUT = 1000 * 60 * 10;
// timeout下限100ms
const MIN_TIMEOUT = 100;
const extensionMap = {};
class TCB {
    constructor(config) {
        this.config = config ? config : this.config;
        this.authObj = undefined;
        // if (Adapter.adapter) {
        //   // eslint-disable-next-line
        //   this.requestClient = new Adapter.adapter.reqClass(<IRequestConfig>{
        //     timeout: this.config.timeout,
        //     timeoutMsg: `请求在${this.config.timeout / 1000}s内未完成，已中断`
        //   });
        // }
    }
    init(config) {
        // 调用初始化时若未兼容平台，则使用默认adapter
        if (!Adapter.adapter) {
            // this._useDefaultAdapter();
            // eslint-disable-next-line
            this.requestClient = new Adapter.adapter.reqClass({
                timeout: config.timeout || 5000,
                timeoutMsg: `请求在${(config.timeout || 5000) / 1000}s内未完成，已中断`
            });
        }
        // if (Adapter.runtime !== RUNTIME.WEB) {
        //   if (!config.appSecret) {
        //     throw new Error('参数错误：请正确配置appSecret');
        //   }
        //   // adapter提供获取应用标识的接口
        //   const appSign = Adapter.adapter.getAppSign ? Adapter.adapter.getAppSign() : '';
        //   if (config.appSign && appSign && config.appSign !== appSign) {
        //     // 传入的appSign与sdk获取的不一致
        //     throw new Error('参数错误：非法的应用标识');
        //   }
        //   appSign && (config.appSign = appSign);
        //   if (!config.appSign) {
        //     throw new Error('参数错误：请正确配置应用标识');
        //   }
        // }
        this.config = {
            ...DEFAULT_INIT_CONFIG,
            ...config
        };
        switch (true) {
            case this.config.timeout > MAX_TIMEOUT:
                console.warn('timeout大于可配置上限[10分钟]，已重置为上限数值');
                this.config.timeout = MAX_TIMEOUT;
                break;
            case this.config.timeout < MIN_TIMEOUT:
                console.warn('timeout小于可配置下限[100ms]，已重置为下限数值');
                this.config.timeout = MIN_TIMEOUT;
                break;
        }
        return new TCB(this.config);
    }
    // database(dbConfig?: object) {
    //   Db.reqClass = IRequest;
    //   // @ts-ignore
    //   Db.wsClass = Adapter.adapter.wsClass;
    //   if (!this.authObj) {
    //     console.warn('需要app.auth()授权');
    //     return;
    //   }
    //   Db.getAccessToken = this.authObj.getAccessToken.bind(this.authObj);
    //   Db.runtime = Adapter.runtime;
    //   if (!Db.ws) {
    //     Db.ws = null;
    //   }
    //   return new Db({ ...this.config, ...dbConfig });
    // }
    auth({ persistence } = {}) {
        if (this.authObj) {
            // console.warn('tcb实例只存在一个auth对象');
            return this.authObj;
        }
        // 如不明确指定persistence则优先取各平台adapter首选，其次session
        const _persistence = persistence || Adapter.adapter.primaryStorage || DEFAULT_INIT_CONFIG.persistence;
        if (_persistence !== this.config.persistence) {
            this.config.persistence = _persistence;
        }
        // 初始化cache
        initCache(this.config);
        // 初始化request
        initRequest(this.config);
        this.authObj = new Auth(this.config);
        return this.authObj;
    }
    on(eventName, callback) {
        return addEventListener.apply(this, [eventName, callback]);
    }
    off(eventName, callback) {
        return removeEventListener.apply(this, [eventName, callback]);
    }
    callFunction(params, callback) {
        return callFunction.apply(this, [params, callback]);
    }
    deleteFile(params, callback) {
        return deleteFile.apply(this, [params, callback]);
    }
    getTempFileURL(params, callback) {
        return getTempFileURL.apply(this, [params, callback]);
    }
    downloadFile(params, callback) {
        return downloadFile.apply(this, [params, callback]);
    }
    uploadFile(params, callback) {
        return uploadFile.apply(this, [params, callback]);
    }
    getUploadMetadata(params, callback) {
        return getUploadMetadata.apply(this, [params, callback]);
    }
    registerExtension(ext) {
        extensionMap[ext.name] = ext;
    }
    async invokeExtension(name, opts) {
        const ext = extensionMap[name];
        if (!ext) {
            throw Error(`扩展${name} 必须先注册`);
        }
        let res = await ext.invoke(opts, this);
        return res;
    }
    useAdapters(adapters) {
        const { adapter, runtime } = useAdapters(adapters) || {};
        adapter && (Adapter.adapter = adapter);
        runtime && (Adapter.runtime = runtime);
    }
}
const tcb = new TCB();

function isMatch () {
  return true
}

function formatUrl$1 (protocol, url, query) {
  if (query === undefined) { query = {}; }
  var urlHasQuery = /\?/.test(url);
  var queryString = '';
  for (var key in query) {
    if (queryString === '') {
      !urlHasQuery && (url += '?');
    } else {
      queryString += '&';
    }
    queryString += key + '=' + encodeURIComponent(query[key]);
  }
  url += queryString;
  if (/^http(s)?:\/\//.test(url)) {
    return url
  }
  return '' + protocol + url
}

class UniRequest {
  post (options) {
    const { url, data, headers } = options;
    return new Promise((resolve, reject) => {
      defaultAdapter.request({
        url: formatUrl$1('https:', url),
        data,
        method: 'POST',
        header: headers,
        success (res) {
          resolve(res);
        },
        fail (err) {
          reject(err);
        }
      });
    })
  }

  upload (options) {
    return new Promise((resolve, reject) => {
      const { url, file, data, headers, fileType } = options;
      const uploadTask = defaultAdapter.uploadFile({
        url: formatUrl$1('https:', url),
        name: 'file',
        formData: Object.assign({}, data),
        filePath: file,
        fileType,
        header: headers,
        success (res) {
          const result = {
            statusCode: res.statusCode,
            data: res.data || {}
          };
          // 200转化为201（如果指定）
          if (res.statusCode === 200 && data.success_action_status) {
            result.statusCode = parseInt(data.success_action_status, 10);
          }
          resolve(result);
        },
        fail (err) {
          if (process.env.VUE_APP_PLATFORM === 'mp-alipay' && process.env.NODE_ENV === 'development') {
            // 支付宝小程序开发工具上传腾讯云时会进入fail回调，但是可能已经上传成功
            console.warn('支付宝小程序开发工具上传腾讯云时无法准确判断是否上传成功，请使用真机测试');
          }
          reject(new Error(err.errMsg || 'uploadFile:fail'));
        }
      });
      // 钉钉小程序不支持uploadTask
      if (typeof options.onUploadProgress === 'function' && uploadTask && typeof uploadTask.onProgressUpdate === 'function') {
        uploadTask.onProgressUpdate((res) => {
          options.onUploadProgress({
            loaded: res.totalBytesSent,
            total: res.totalBytesExpectedToSend
          });
        });
      }
    })
  }
}

const uniMpStorage = {
  setItem (key, value) {
    defaultAdapter.setStorageSync(key, value);
  },
  getItem (key) {
    return defaultAdapter.getStorageSync(key)
  },
  removeItem (key) {
    defaultAdapter.removeStorageSync(key);
  },
  clear () {
    defaultAdapter.clearStorageSync();
  }
};

function genAdapter () {
  const adapter = {
    root: {},
    reqClass: UniRequest,
    localStorage: uniMpStorage,
    primaryStorage: 'local'
  };
  return adapter
}

const adapter = {
  genAdapter,
  isMatch,
  runtime: 'uni_app'
};

tcb.useAdapters(adapter);

const uniCloud$1 = tcb;
const oldInit = uniCloud$1.init;
uniCloud$1.init = function (options) {
  options.env = options.spaceId;
  const uniClient = oldInit.call(this, options);
  uniClient.config.provider = 'tencent';
  uniClient.config.spaceId = options.spaceId;
  const oldAuth = uniClient.auth;
  uniClient.auth = function (options) {
    const uniAuth = oldAuth.call(this, options);
    const callbackifyListAuth = ['linkAndRetrieveDataWithTicket', 'signInAnonymously', 'signOut', 'getAccessToken', 'getLoginState', 'signInWithTicket', 'getUserInfo'];
    callbackifyListAuth.forEach((item) => {
      uniAuth[item] = callbackify(uniAuth[item]).bind(uniAuth);
    });
    return uniAuth
  };
  uniClient.customAuth = uniClient.auth;

  // callFunction、uploadFile 在 core 内 callbackify
  const callbackifyListClient = ['deleteFile', 'getTempFileURL', 'downloadFile'];
  callbackifyListClient.forEach((item) => {
    uniClient[item] = callbackify(uniClient[item]).bind(uniClient);
  });

  return uniClient
};

class Client$1 extends Client {
  getAccessToken () {
    return new Promise((resolve, reject) => {
      const accessToken = 'Anonymous_Access_token';
      this.setAccessToken(accessToken);
      resolve(accessToken);
    })
  }

  setupRequest (body, type) {
    const data = Object.assign({}, body, {
      spaceId: this.config.spaceId,
      timestamp: Date.now()
    });
    const header = {
      'Content-Type': 'application/json'
    };

    if (type !== 'auth') {
      data.token = this.accessToken;
      header['x-basement-token'] = this.accessToken;
    }

    header['x-serverless-sign'] = codec.sign(data, this.config.clientSecret);

    const clientInfo =  getClientInfo() ;
    const {
      APPID,
      PLATFORM,
      DEVICEID,
      CLIENT_SDK_VERSION
    } = clientInfo;

    // 私有化专属头信息
    header['x-client-platform'] = PLATFORM;
    header['x-client-appid'] = APPID;
    header['x-client-device-id'] = DEVICEID;
    header['x-client-version'] = CLIENT_SDK_VERSION;
    header['x-client-token'] = defaultAdapter.getStorageSync('uni_id_token');

    return {
      url: this.config.requestUrl,
      method: 'POST',
      data,
      dataType: 'json',
      header: JSON.parse(JSON.stringify(header)) // 过滤undefined值
    }
  }

  uploadFileToOSS ({
    url,
    formData,
    name,
    filePath,
    fileType,
    onUploadProgress
  }) {
    return new Promise((resolve, reject) => {
      const uploadTask = this.adapter.uploadFile({
        url,
        formData,
        name,
        filePath,
        fileType,
        success (res) {
          if (res && res.statusCode < 400) {
            resolve(res);
          } else {
            reject(new UniCloudError({
              code: 'UPLOAD_FAILED',
              message: '文件上传失败'
            }));
          }
        },
        fail (err) {
          reject(new UniCloudError({
            code: err.code || 'UPLOAD_FAILED',
            message: err.message || err.errMsg || '文件上传失败'
          }));
        }
      });
      if (typeof onUploadProgress === 'function' && uploadTask && typeof uploadTask.onProgressUpdate === 'function') {
        uploadTask.onProgressUpdate((res) => {
          onUploadProgress({
            loaded: res.totalBytesSent,
            total: res.totalBytesExpectedToSend
          });
        });
      }
    })
  }

  uploadFile ({
    filePath,
    cloudPath,
    fileType = 'image',
    onUploadProgress
  }) {
    if (!cloudPath) {
      throw new UniCloudError({
        code: 'CLOUDPATH_REQUIRED',
        message: 'cloudPath不可为空'
      })
    }
    let fileUrl;
    return this.getOSSUploadOptionsFromPath({
      cloudPath: cloudPath
    }).then((res) => {
      const {
        url,
        formData,
        name,
        fileUrl: cloudUrl
      } = res.result;
      fileUrl = cloudUrl;
      const uploadFileToOSSOptions = {
        url,
        formData,
        name,
        filePath: filePath,
        fileType
      };
      return this.uploadFileToOSS(Object.assign({}, uploadFileToOSSOptions, {
        onUploadProgress
      }))
    }).then(() => {
      return this.reportOSSUpload({
        cloudPath: cloudPath
      })
    }).then((res) => {
      return new Promise((resolve, reject) => {
        if (res.success) {
          resolve({
            success: true,
            filePath,
            fileID: fileUrl
          });
        } else {
          reject(new UniCloudError({
            code: 'UPLOAD_FAILED',
            message: '文件上传失败'
          }));
        }
      })
    })
  }
}

const uniCloud$2 = {
  init (config) {
    const uniClient = new Client$1(config);
    // callFunction、uploadFile 在 core 内 callbackify
    const callbackifyListClient = ['deleteFile', 'getTempFileURL'];
    callbackifyListClient.forEach((item) => {
      uniClient[item] = callbackify(uniClient[item]).bind(uniClient);
    });

    const authObj = {
      signInAnonymously: function () {
        return uniClient.authorize()
      },
      // 阿里云暂时这么实现
      getLoginState: function () {
        return Promise.resolve(false)
      }
    };

    uniClient.auth = function () {
      return authObj
    };
    uniClient.customAuth = uniClient.auth;

    return uniClient
  }
};

let clientInfo, uniCloudClientInfo;

function getRealFunctionData ({
  name,
  data,
  spaceId,
  provider
}) {
  if (!clientInfo && true) {
    clientInfo = getClientInfo();
    uniCloudClientInfo = getUniCloudClientInfo();
  }
  const optionsDataCopy = JSON.parse(JSON.stringify(data || {}));
  const fn = name;
  const sid = spaceId;
  const providerList = {
    tencent: 't',
    aliyun: 'a'
  };
  const pvd = providerList[provider];
  {
    const uniCloudClientInfoCopy = Object.assign({}, uniCloudClientInfo, {
      fn,
      sid,
      pvd
    });
    Object.assign(optionsDataCopy, {
      clientInfo,
      uniCloudClientInfo: encodeURIComponent(JSON.stringify(uniCloudClientInfoCopy))
    });

    // 遗留问题
    const {
      deviceId
    } = uni.getSystemInfoSync();
    optionsDataCopy.uniCloudDeviceId = deviceId;
  }
  if (!optionsDataCopy.uniIdToken) {
    const uniIdToken = defaultAdapter.getStorageSync(UNI_ID_TOKEN_KEY) || defaultAdapter.getStorageSync(UNI_ID_TOKEN_KEY_DEP);
    if (uniIdToken) {
      optionsDataCopy.uniIdToken = uniIdToken;
    }
  }
  return optionsDataCopy
}

function callFunction$1 ({
  name,
  data
}) {
  const {
    localAddress: address,
    localPort: port
  } = this;
  const pvdList = {
    aliyun: 'aliyun',
    tencent: 'tcb'
  };
  const provider = pvdList[this.config.provider];
  const spaceId = this.config.spaceId;
  const checkUrl = `http://${address}:${port}/system/check-function`;
  const requestUrl = `http://${address}:${port}/cloudfunctions/${name}`;
  return new Promise((resolve, reject) => {
    defaultAdapter.request({
      method: 'POST',
      url: checkUrl,
      data: {
        name,
        platform: process.env.VUE_APP_PLATFORM,
        provider,
        spaceId
      },
      timeout: 3000,
      success (res) {
        resolve(res);
      },
      fail () {
        resolve({
          data: {
            code: 'NETWORK_ERROR',
            message: '连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。'
          }
        });
      }
    });
  }).then(({
    data
  } = {}) => {
    const {
      code,
      message
    } = data || {};
    return {
      code: code === 0 ? 0 : code || 'SYS_ERR',
      message: message || 'SYS_ERR'
    }
  }).then(({
    code,
    message
  }) => {
    if (code !== 0) {
      switch (code) {
        case 'MODULE_ENCRYPTED':
          console.error(`此云函数（${name}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
          break
        case 'FUNCTION_ENCRYPTED':
          console.error(`此云函数（${name}）已加密不可本地调试，自动切换为云端已部署的云函数`);
          break
        case 'ACTION_ENCRYPTED':
          console.error(message || '需要访问加密的uni-clientDB-action，自动切换为云端环境');
          break
        case 'NETWORK_ERROR': {
          const msg = '连接本地调试服务失败，请检查客户端是否和主机在同一局域网下';
          console.error(msg);
          throw new Error(msg)
        }
        case 'SWITCH_TO_CLOUD':
          break
        default: {
          const msg = `检测本地调试服务出现错误：${message}，请检查网络环境或重启客户端再试`;
          console.error(msg);
          throw new Error(msg)
        }
      }
      return this.originCallFunction({ name, data })
    }
    return new Promise((resolve, reject) => {
      const param = getRealFunctionData({
        name,
        data,
        provider: this.config.provider,
        spaceId: spaceId
      });
      defaultAdapter.request({
        method: 'POST',
        url: requestUrl,
        data: {
          provider,
          platform: process.env.VUE_APP_PLATFORM,
          param
        },
        success ({
          statusCode,
          data
        } = {}) {
          if (!statusCode || statusCode >= 400) {
            return reject(new UniCloudError({
              code: data.code || 'SYS_ERR',
              message: data.message || 'request:fail'
            }))
          }
          return resolve({
            result: data
          })
        },
        fail (err) {
          reject(new UniCloudError({
            code: err.code || err.errCode || 'SYS_ERR',
            message: err.message || err.errMsg || 'request:fail'
          }));
        }
      });
    })
  })
}

const ErrorFormatter = [{
  rule: /fc_function_not_found|FUNCTION_NOT_FOUND/,
  content: '，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间',
  mode: 'append'
}];

// copy from lodash
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reHasRegExpChar = RegExp(reRegExpChar.source);

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp (string) {
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string
}

function replaceAll (str, substr, newSubstr) {
  return str.replace(new RegExp(escapeRegExp(substr), 'g'), newSubstr)
}

function formatMessage ({
  message = '',
  extraInfo = {},
  formatter = []
} = {}) {
  for (let i = 0; i < formatter.length; i++) {
    const {
      rule,
      content,
      mode
    } = formatter[i];
    const matched = message.match(rule);
    if (!matched) {
      continue
    }
    let contentParsed = content;
    for (let i = 1; i < matched.length; i++) {
      contentParsed = replaceAll(contentParsed, `{$${i}}`, matched[i]);
    }
    for (const key in extraInfo) {
      contentParsed = replaceAll(contentParsed, `{${key}}`, extraInfo[key]);
    }
    switch (mode) {
      case 'replace':
        return contentParsed
      case 'append':
      default:
        return message + contentParsed
    }
  }
  return message
}

function initCallFunction (uniClient) {
  const oldCallFunction = uniClient.callFunction;

  uniClient.callFunction = function (options) {
    let preRequest;
    if (this.isReady) {
      preRequest = Promise.resolve();
    } else {
      preRequest = this.initUniCloud;
    }
    const functionName = options.name;
    return preRequest.then(() => {
      options.data = getRealFunctionData({
        name: functionName,
        data: options.data,
        provider: this.config.provider,
        spaceId: this.config.spaceId
      });
      const pvdList = {
        aliyun: 'aliyun',
        tencent: 'tcb'
      };
      const logPvd = pvdList[this.config.provider];
      return new Promise((resolve, reject) => {
        oldCallFunction.call(this, options).then((res) => {
          if (this.config.useDebugFunction && res && res.requestId) {
            const log = JSON.stringify({
              spaceId: this.config.spaceId,
              functionName,
              requestId: res.requestId
            });
            console.log(`[${logPvd}-request]${log}[/${logPvd}-request]`);
          }
          resolve(res);
        }).catch((err) => {
          if (this.config.useDebugFunction && err && err.requestId) {
            const log = JSON.stringify({
              spaceId: this.config.spaceId,
              functionName,
              requestId: err.requestId
            });
            console.log(`[${logPvd}-request]${log}[/${logPvd}-request]`);
          }
          if (err && err.message) {
            err.message = formatMessage({
              message: `[${options.name}]: ${err.message}`,
              formatter: ErrorFormatter,
              extraInfo: {
                functionName
              }
            });
          }
          reject(err);
        });
      })
    })
  };

  const callFunction = uniClient.callFunction;
  // uniClient.callFunction = function (options) {
  //   return callbackify(callFunction).call(this, options)
  // }
  uniClient.originCallFunction = uniClient.callFunction;

  uniClient.callFunction = function (options) {
    const newCallFunction = function (options) {
      let preRequest;
      if (uniClient.isReady) {
        preRequest = Promise.resolve();
      } else {
        preRequest = uniClient.initUniCloud;
      }
      const callFunctionPromise = preRequest.then(() => {
        if (process.env.NODE_ENV === 'development' && uniClient.debugInfo && !uniClient.debugInfo.forceRemote && process.env.UNI_CLOUD_PROVIDER) {
          return callFunction$1.call(this, options)
        } else {
          return callFunction.call(this, options)
        }
      });
      Object.defineProperty(callFunctionPromise, 'result', {
        get () {
          console.warn('当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise');
          return {}
        }
      });
      return callFunctionPromise
    };
    return callbackify(newCallFunction).call(this, options)
  };
}

function initUploadFile (uniClient) {
  const oldUploadFile = uniClient.uploadFile;

  uniClient.uploadFile = function (options) {
    let preRequest;
    if (this.isReady) {
      preRequest = Promise.resolve();
    } else {
      preRequest = this.initUniCloud;
    }
    return preRequest.then(() => {
      return oldUploadFile.call(this, options)
    })
  };

  const uploadFile = uniClient.uploadFile;
  uniClient.uploadFile = function (options) {
    return callbackify(uploadFile).call(this, options)
  };
}

const SYMBOL_CLIENT_DB_INTERNAL = Symbol('CLIENT_DB_INTERNAL');

function getType (val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

// handler内先只实现get
function getSafeProxy (target, handler) {
  target.then = 'DoNotReturnProxyWithAFunctionNamedThen';
  target._internalType = SYMBOL_CLIENT_DB_INTERNAL;
  return new Proxy(target, {
    get (obj, key, rec) {
      if (hasOwn(obj, key) || obj[key] || typeof key !== 'string') {
        return obj[key]
      }
      return handler.get(obj, key, rec)
    }
  })
}

function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

class ErrorWithCode extends Error {
  constructor (message, code) {
    super(message);
    this.code = code;
  }
}

function parse (param) {
  switch (getType(param)) {
    case 'array':
      return param.map(item => parse(item))
    case 'object':
      if (param._internalType === SYMBOL_CLIENT_DB_INTERNAL) {
        return param
      }
      Object.keys(param).forEach(key => {
        param[key] = parse(param[key]);
      });
      return param
    case 'regexp':
      return {
        $regexp: {
          source: param.source,
          flags: param.flags
        }
      }
    case 'date':
      return {
        $date: param.toISOString()
      }
    default:
      return param
  }
}

function initDatabase (uniClient) {
  uniClient.database = function () {
    if (this._database) {
      return this._database
    }
    const authCallBacks = {};
    const dbCallBacks = {};

    class Stage {
      constructor (content, prevStage, actionName) {
        this.content = content;
        this.prevStage = prevStage;
        this.actionName = actionName;
      }

      toJSON () {
        let tempStage = this;
        const stages = [tempStage.content];
        while (tempStage.prevStage) {
          tempStage = tempStage.prevStage;
          stages.push(tempStage.content);
        }
        return {
          $db: stages.reverse().map((item) => {
            return {
              $method: item.$method,
              $param: item.$param
            }
          })
        }
      }

      get useAggregate () {
        let tempStage = this;
        let useAggregate = false;
        while (tempStage.prevStage) {
          tempStage = tempStage.prevStage;
          const methodName = tempStage.content.$method;
          if (methodName === 'aggregate' || methodName === 'pipeline') {
            useAggregate = true;
            break
          }
        }
        return useAggregate
      }

      // 聚合count特殊处理
      get count () {
        if (!this.useAggregate) {
          return function () {
            return this._send('count', Array.from(arguments))
          }
        }
        const that = this;
        return function () {
          return getDbIns({
            $method: 'count',
            $param: parse(Array.from(arguments))
          }, that, that.actionName)
        }
      }

      get () {
        return this._send('get', Array.from(arguments))
      }

      add () {
        return this._send('add', Array.from(arguments))
      }

      remove () {
        return this._send('remove', Array.from(arguments))
      }

      update () {
        return this._send('update', Array.from(arguments))
      }

      end () {
        return this._send('end', Array.from(arguments))
      }

      set () {
        throw new Error('clientDB禁止使用set方法')
      }

      _send (method, param) {
        const command = this.toJSON();
        command.$db.push({
          $method: method,
          $param: parse(param)
        });
        return uniClient.callFunction({
          name:  'DCloud-clientDB',
          data: {
            action: this.actionName,
            command
          }
        }).then(res => {
          const {
            code,
            message,
            token,
            tokenExpired,
            systemInfo = []
          } = res.result;
          if (systemInfo) {
            for (let i = 0; i < systemInfo.length; i++) {
              const {
                level,
                message,
                detail
              } = systemInfo[i];
              const realLevel = process.env.VUE_APP_PLATFORM === 'app-plus' && level === 'warn' ? 'error' : level;
              const log = console[realLevel] || console.log;
              let logMsg = '[System Info]' + message;
              if (detail) {
                logMsg = `${logMsg}\n详细信息：${detail}`;
              }
              log(logMsg);
            }
          }
          if (code) {
            return Promise.reject(new ErrorWithCode(message, code))
          }
          // 保持旧版兼容authCallBacks
          if (token && tokenExpired && authCallBacks.refreshToken) {
            authCallBacks.refreshToken.forEach(func => {
              func({
                token,
                tokenExpired
              });
            });
          }
          // 新版支持dbCallBacks
          if (token && tokenExpired && dbCallBacks.refreshToken) {
            dbCallBacks.refreshToken.forEach(func => {
              func({
                token,
                tokenExpired
              });
            });
          }
          return Promise.resolve(res)
        }).catch(err => {
          const error = new ErrorWithCode(err.message, err.code || 'SYSTEM_ERROR');
          if (dbCallBacks.error) {
            dbCallBacks.error.forEach(func => {
              func(error);
            });
          }
          if (/fc_function_not_found|FUNCTION_NOT_FOUND/g.test(err.message)) {
            console.warn('clientDB未初始化，请在web控制台保存一次schema以开启clientDB');
          }
          return Promise.reject(err)
        })
      }
    }

    const propList = ['db.Geo', 'db.command', 'command.aggregate'];

    function isProp (prev, key) {
      return propList.indexOf(`${prev}.${key}`) > -1
    }

    function getDbIns (content, prevStage, actionName) {
      const stage = new Stage(content, prevStage, actionName);
      return getSafeProxy(stage, {
        get (stage, key) {
          let prevMethod = 'db';
          if (stage && stage.content) {
            prevMethod = stage.content.$method;
          }
          if (isProp(prevMethod, key)) {
            return getDbIns({
              $method: key
            }, stage, actionName)
          }
          return function () {
            return getDbIns({
              $method: key,
              $param: parse(Array.from(arguments))
            }, stage, actionName)
          }
        }
      })
    }

    function getDbClass ({
      path,
      method
    }) {
      return class {
        constructor () {
          this.param = Array.from(arguments);
        }

        toJSON () {
          return {
            $newDb: [
              ...path.map(prop => { return { $method: prop } }),
              {
                $method: method,
                $param: this.param
              }]
          }
        }
      }
    }

    const db = {
      auth: {
        on: (event, func) => {
          authCallBacks[event] = authCallBacks[event] || [];
          if (authCallBacks[event].indexOf(func) > -1) {
            return
          }
          authCallBacks[event].push(func);
        },
        off: (event, func) => {
          authCallBacks[event] = authCallBacks[event] || [];
          const index = authCallBacks[event].indexOf(func);
          if (index === -1) {
            return
          }
          authCallBacks[event].splice(index, 1);
        }
      },
      on: (event, func) => {
        dbCallBacks[event] = dbCallBacks[event] || [];
        if (dbCallBacks[event].indexOf(func) > -1) {
          return
        }
        dbCallBacks[event].push(func);
      },
      off: (event, func) => {
        dbCallBacks[event] = dbCallBacks[event] || [];
        const index = dbCallBacks[event].indexOf(func);
        if (index === -1) {
          return
        }
        dbCallBacks[event].splice(index, 1);
      },
      env: getSafeProxy({}, {
        get (env, prop) {
          return {
            $env: prop
          }
        }
      }),
      action (actionName) {
        return getSafeProxy({}, {
          get (db, key) {
            if (isProp('db', key)) {
              return getDbIns({
                $method: key
              }, null, actionName)
            }
            return function () {
              return getDbIns({
                $method: key,
                $param: parse(Array.from(arguments))
              }, null, actionName)
            }
          }
        })
      },
      Geo: getSafeProxy({}, {
        get (Geo, key) {
          return getDbClass({
            path: ['Geo'],
            method: key
          })
        }
      }),
      getCloudEnv: function (envStr) {
        if (typeof envStr !== 'string' || !envStr.trim()) {
          throw new Error('getCloudEnv参数错误')
        }
        return {
          $env: envStr.replace('$cloudEnv_', '')
        }
      },
      get serverDate () {
        return getDbClass({
          path: [],
          method: 'serverDate'
        })
      },
      get RegExp () {
        return getDbClass({
          path: [],
          method: 'RegExp'
        })
      }
    };

    const database = getSafeProxy(db, {
      get (db, key) {
        if (isProp('db', key)) {
          return getDbIns({
            $method: key
          })
        }
        return function () {
          return getDbIns({
            $method: key,
            $param: parse(Array.from(arguments))
          })
        }
      }
    });

    this._database = database;

    return database
  };
}

function b64DecodeUnicode (str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

function getCurrentUserInfo () {
  const token = defaultAdapter.getStorageSync('uni_id_token') || '';
  const tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    }
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message)
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo
}

var chooseAndUploadFile = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

const ERR_MSG_OK = 'chooseAndUploadFile:ok';
const ERR_MSG_FAIL = 'chooseAndUploadFile:fail';
function chooseImage (opts) {
  const { count, sizeType, sourceType = ['album', 'camera'], extension } = opts;
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count,
      sizeType,
      sourceType,
      extension,
      success (res) {
        resolve(normalizeChooseAndUploadFileRes(res, 'image'));
      },
      fail (res) {
        reject({
          errMsg: res.errMsg.replace('chooseImage:fail', ERR_MSG_FAIL)
        });
      }
    });
  })
}
function chooseVideo (opts) {
  const { camera, compressed, maxDuration, sourceType, extension } = opts;
  return new Promise((resolve, reject) => {
    uni.chooseVideo({
      camera,
      compressed,
      maxDuration,
      sourceType,
      extension,
      success (res) {
        const { tempFilePath, duration, size, height, width } = res;
        resolve(normalizeChooseAndUploadFileRes({
          errMsg: 'chooseVideo:ok',
          tempFilePaths: [tempFilePath],
          tempFiles: [
            {
              name: (res.tempFile && res.tempFile.name) || '',
              path: tempFilePath,
              size,
              type: (res.tempFile && res.tempFile.type) || '',
              width,
              height,
              duration,
              fileType: 'video',
              cloudPath: ''
            }
          ]
        }, 'video'));
      },
      fail (res) {
        reject({
          errMsg: res.errMsg.replace('chooseVideo:fail', ERR_MSG_FAIL)
        });
      }
    });
  })
}
function chooseAll (opts) {
  const { count, extension } = opts;
  return new Promise((resolve, reject) => {
    let chooseFile = uni.chooseFile;
    if (typeof wx !== 'undefined' &&
            typeof wx.chooseMessageFile === 'function') {
      chooseFile = wx.chooseMessageFile;
    }
    if (typeof chooseFile !== 'function') {
      return reject({
        errMsg: ERR_MSG_FAIL + ' 请指定 type 类型，该平台仅支持选择 image 或 video。'
      })
    }
    chooseFile({
      type: 'all',
      count,
      extension,
      success (res) {
        resolve(normalizeChooseAndUploadFileRes(res));
      },
      fail (res) {
        reject({
          errMsg: res.errMsg.replace('chooseFile:fail', ERR_MSG_FAIL)
        });
      }
    });
  })
}
function normalizeChooseAndUploadFileRes (res, fileType) {
  res.tempFiles.forEach((item, index) => {
    if (!item.name) {
      item.name = item.path.substring(item.path.lastIndexOf('/') + 1);
    }
    if (fileType) {
      item.fileType = fileType;
    }
    item.cloudPath =
            Date.now() + '_' + index + item.name.substring(item.name.lastIndexOf('.'));
  });
  // wx.chooseMessageFile
  if (!res.tempFilePaths) {
    res.tempFilePaths = res.tempFiles.map((file) => file.path);
  }
  return res
}
function uploadCloudFiles (uniClient, res, max = 5, onUploadProgress) {
  res = Object.assign({}, res);
  res.errMsg = ERR_MSG_OK;
  const files = res.tempFiles;
  const len = files.length;
  let count = 0;
  return new Promise((resolve) => {
    while (count < max) {
      next();
    }
    function next () {
      const cur = count++;
      if (cur >= len) {
        !files.find((item) => !item.url && !item.errMsg) && resolve(res);
        return
      }
      const fileItem = files[cur];
      uniClient
        .uploadFile({
          filePath: fileItem.path,
          cloudPath: fileItem.cloudPath,
          fileType: fileItem.fileType,
          onUploadProgress (res) {
            res.index = cur;
            res.tempFile = fileItem;
            res.tempFilePath = fileItem.path;
            onUploadProgress &&
                        onUploadProgress(res);
          }
        })
        .then((res) => {
          fileItem.url = res.fileID;
          if (cur < len) {
            next();
          }
        })
        .catch((res) => {
          fileItem.errMsg = res.errMsg || res.message;
          if (cur < len) {
            next();
          }
        });
    }
  })
}
function uploadFiles (uniClient, choosePromise, { onChooseFile, onUploadProgress }) {
  return choosePromise
    .then((res) => {
      if (onChooseFile) {
        const customChooseRes = onChooseFile(res);
        if (typeof customChooseRes !== 'undefined') {
          return Promise.resolve(customChooseRes).then((chooseRes) => typeof chooseRes === 'undefined' ? res : chooseRes)
        }
      }
      return res
    })
    .then((res) => {
      if (res === false) {
        return {
          errMsg: ERR_MSG_OK,
          tempFilePaths: [],
          tempFiles: []
        }
      }
      return uploadCloudFiles(uniClient, res, 5, onUploadProgress)
    })
}
function initChooseAndUploadFile (uniClient) {
  return function chooseAndUploadFile (opts = { type: 'all' }) {
    if (opts.type === 'image') {
      return uploadFiles(uniClient, chooseImage(opts), opts)
    } else if (opts.type === 'video') {
      return uploadFiles(uniClient, chooseVideo(opts), opts)
    }
    return uploadFiles(uniClient, chooseAll(opts), opts)
  }
}

exports.initChooseAndUploadFile = initChooseAndUploadFile;
});

var chooseAndUploadFile$1 = /*@__PURE__*/unwrapExports(chooseAndUploadFile);

function initCommonMethod (uniClient) {
  uniClient.getCurrentUserInfo = getCurrentUserInfo;
  {
    uniClient.chooseAndUploadFile = callbackify(chooseAndUploadFile$1.initChooseAndUploadFile(uniClient));
  }
}

const loadMode = {
  auto: 'auto',
  onready: 'onready',
  manual: 'manual'
};

function getMixinDatacom (uniClient) {
  return {
    props: {
      localdata: {
        type: Array,
        default () {
          return []
        }
      },
      options: {
        type: [Object, Array],
        default () {
          return {}
        }
      },
      collection: {
        type: String,
        default: ''
      },
      action: {
        type: String,
        default: ''
      },
      field: {
        type: String,
        default: ''
      },
      orderby: {
        type: String,
        default: ''
      },
      where: {
        type: [String, Object],
        default: ''
      },
      pageData: {
        type: String,
        default: 'add'
      },
      pageCurrent: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 20
      },
      getcount: {
        type: [Boolean, String],
        default: false
      },
      gettree: {
        type: [Boolean, String],
        default: false
      },
      gettreepath: {
        type: [Boolean, String],
        default: false
      },
      startwith: {
        type: String,
        default: ''
      },
      limitlevel: {
        type: Number,
        default: 10
      },
      groupby: {
        type: String,
        default: ''
      },
      groupField: {
        type: String,
        default: ''
      },
      distinct: {
        type: [Boolean, String],
        default: false
      },
      foreignKey: {
        type: String,
        default: ''
      },
      loadtime: {
        type: String,
        default: 'auto'
      },
      manual: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        mixinDatacomLoading: false,
        mixinDatacomHasMore: false,
        mixinDatacomResData: [],
        mixinDatacomErrorMessage: '',
        mixinDatacomPage: {}
      }
    },
    created () {
      this.mixinDatacomPage = {
        current: this.pageCurrent,
        size: this.pageSize,
        count: 0
      };
      this.$watch(() => {
        var al = [];
        ['pageCurrent',
          'pageSize',
          'localdata',
          'collection',
          'action',
          'field',
          'orderby',
          'where',
          'getont',
          'getcount',
          'gettree',
          'groupby',
          'groupField',
          'distinct'
        ].forEach(key => {
          al.push(this[key]);
        });
        return al
      }, (newValue, oldValue) => {
        if (this.loadtime === loadMode.manual) {
          return
        }

        let needReset = false;
        const changed = [];
        for (let i = 2; i < newValue.length; i++) {
          if (newValue[i] !== oldValue[i]) {
            changed.push(newValue[i]);
            needReset = true;
          }
        }
        if (newValue[0] !== oldValue[0]) {
          this.mixinDatacomPage.current = this.pageCurrent;
        }
        this.mixinDatacomPage.size = this.pageSize;

        this.onMixinDatacomPropsChange(needReset, changed);
      });
    },
    methods: {
      onMixinDatacomPropsChange (needReset, changed) {},
      mixinDatacomEasyGet ({
        getone = false,
        success,
        fail
      } = {}) {
        if (this.mixinDatacomLoading) {
          return
        }
        this.mixinDatacomLoading = true;

        this.mixinDatacomErrorMessage = '';

        this.mixinDatacomGet().then((res) => {
          this.mixinDatacomLoading = false;
          const {
            data,
            count
          } = res.result;
          if (this.getcount) {
            this.mixinDatacomPage.count = count;
          }
          this.mixinDatacomHasMore = data.length < this.pageSize;
          const responseData = getone ? (data.length ? data[0] : undefined) : data;
          this.mixinDatacomResData = responseData;

          if (success) {
            success(responseData);
          }
        }).catch((err) => {
          this.mixinDatacomLoading = false;
          this.mixinDatacomErrorMessage = err;
          fail && fail(err);
        });
      },
      mixinDatacomGet (options = {}) {
        let db = uniClient.database();

        const action = options.action || this.action;
        if (action) {
          db = db.action(action);
        }

        const collection = options.collection || this.collection;
        db = db.collection(collection);

        const where = options.where || this.where;
        if (!(!where || !Object.keys(where).length)) {
          db = db.where(where);
        }

        const field = options.field || this.field;
        if (field) {
          db = db.field(field);
        }

        const foreignKey = options.foreignKey || this.foreignKey;
        if (foreignKey) {
          db = db.foreignKey(foreignKey);
        }

        const groupby = options.groupby || this.groupby;
        if (groupby) {
          db = db.groupBy(groupby);
        }

        const groupField = options.groupField || this.groupField;
        if (groupField) {
          db = db.groupField(groupField);
        }

        const distinct = options.distinct !== undefined ? options.distinct : this.distinct;
        if (distinct === true) {
          db = db.distinct();
        }

        const orderby = options.orderby || this.orderby;
        if (orderby) {
          db = db.orderBy(orderby);
        }

        const current = options.pageCurrent !== undefined ? options.pageCurrent : this.mixinDatacomPage.current;
        const size = options.pageSize !== undefined ? options.pageSize : this.mixinDatacomPage.size;
        const getCount = options.getcount !== undefined ? options.getcount : this.getcount;
        const gettree = options.gettree !== undefined ? options.gettree : this.gettree;
        const gettreepath = options.gettreepath !== undefined ? options.gettreepath : this.gettreepath;
        const limitLevel = options.limitlevel !== undefined ? options.limitlevel : this.limitlevel;
        const startWith = options.startwith !== undefined ? options.startwith : this.startwith;

        const getOptions = {
          getCount
        };
        const treeOptions = {
          limitLevel,
          startWith
        };

        if (gettree) {
          getOptions.getTree = treeOptions;
        }
        if (gettreepath) {
          getOptions.getTreePath = treeOptions;
        }

        db = db.skip(size * (current - 1)).limit(size).get(getOptions);

        return db
      }
    }
  }
}

function request (options) {
  return new Promise((resolve, reject) => {
    defaultAdapter.request({
      ...options,
      success (res) {
        resolve(res);
      },
      fail (err) {
        reject(err);
      }
    });
  })
}

async function ping (address, port) {
  const pingUrl = `http://${address}:${port}/system/ping`;
  try {
    const pingRes = await request({
      url: pingUrl,
      timeout: 500
    });
    if (pingRes.data && pingRes.data.code === 0) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

async function getServerAddr (addressList, port) {
  let addressRes;
  for (let i = 0; i < addressList.length; i++) {
    const address = addressList[i];
    if (await ping(address, port)) {
      addressRes = address;
      break
    }
  }
  return {
    address: addressRes,
    port
  }
}

// 需要的环境变量
// process.env.UNICLOUD_DEBUG = JSON.stringify({
//   address: [
//     '192.168.12.121',
//     '127.0.0.1',
//     '172.17.144.129',
//     '192.168.74.97'
//   ],
//   servePort: 5001,
//   provider: 'tcb',
//   initialLaunchType: 'remote',
// })

class UniCloud {
  init (config) {
    let uniClient = {};

    const useDebugFunction =
      config.debugFunction !== false &&
      process.env.NODE_ENV === 'development' &&
      ((process.env.VUE_APP_PLATFORM === 'h5' &&
        navigator.userAgent.indexOf('HBuilderX') > 0) ||
        process.env.VUE_APP_PLATFORM === 'app-plus');

    switch (config.provider) {
      case 'tencent':
        uniClient = uniCloud$1.init(
          Object.assign(config, {
            useDebugFunction
          })
        );
        break
      case 'aliyun':
        uniClient = uniCloud.init(
          Object.assign(config, {
            useDebugFunction
          })
        );
        break
      case 'private':
        uniClient = uniCloud$2.init(
          Object.assign(config, {
            useDebugFunction
          })
        );
        break
      default:
        throw new Error('未提供正确的provider参数')
    }

    // 附加调试信息
    const debugInfo = process.env.UNICLOUD_DEBUG;
    if (process.env.NODE_ENV === 'development' && debugInfo && !debugInfo.code) {
      uniClient.debugInfo = debugInfo;
    }

    // uniClient.isReady = true

    // 判断登录状态无效,自动使用匿名登录
    // if (true) {
    uniClient.isReady = false;
    const authObj = uniClient.auth();
    uniClient.initUniCloud = authObj.getLoginState().then((loginState) => {
      if (!loginState) {
        return authObj.signInAnonymously()
      } else {
        return Promise.resolve()
      }
    }).then(() => {
      // 测试云函数本地运行地址
      if (process.env.NODE_ENV === 'development' && uniClient.debugInfo) {
        const {
          address: addressList,
          servePort: port
        } = uniClient.debugInfo;
        return getServerAddr(addressList, port)
      }
      return Promise.resolve()
    }).then(({ address, port } = {}) => {
      // 设置服务地址
      if (address) {
        uniClient.localAddress = address;
        uniClient.localPort = port;
      } else if (uniClient.debugInfo) {
        const warnMethod = process.env.VUE_APP_PLATFORM === 'app-plus' ? 'error' : 'warn';
        const warn = console[warnMethod];
        // 启动时不在同一局域网且初始值为访问remote云函数，则直接切换云端。否则提示连接不到本地调试服务。
        if (uniClient.debugInfo.initialLaunchType === 'remote') {
          uniClient.debugInfo.forceRemote = true;
          warn('当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试');
        } else {
          warn('无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试');
        }
      }
    }).then(() => {
      {
        clearDirtyUniIdToken();
        return initStat()
      }
    }).then(() => {
      uniClient.isReady = true;
    });
    // }

    initCallFunction(uniClient);
    initUploadFile(uniClient);
    initDatabase(uniClient);
    initCommonMethod(uniClient);

    uniClient.init = this.init;

    return uniClient
  }
}

let uniCloud$3 = new UniCloud();

// uni-app内{let e = {}}处理有点问题，暂时包裹一层
(() => {
  {
    let defaultSpace = {};
    const cloudProvider = process.env.UNI_CLOUD_PROVIDER
    const providers = cloudProvider && JSON.parse(cloudProvider)||[]
    if (providers.length === 1) {
      defaultSpace = providers[0];
      uniCloud$3 = uniCloud$3.init(defaultSpace);
    } else {
      const defaultMethodList = [
        'auth',
        'callFunction',
        'uploadFile',
        'deleteFile',
        'getTempFileURL',
        'downloadFile',
        'database',
        'getCurrentUSerInfo'
      ];

      let spaceErrMessage;

      if (providers.length > 0) {
        spaceErrMessage = '应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间';
      } else if (process.env.RUN_BY_HBUILDERX) {
        spaceErrMessage = '应用未关联服务空间，请在uniCloud目录右键关联服务空间';
      } else {
        spaceErrMessage = 'uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间';
      }
      defaultMethodList.forEach((item) => {
        uniCloud$3[item] = function () {
          console.error(spaceErrMessage);
          return Promise.reject(
            new UniCloudError({
              code: 'SYS_ERR',
              message: spaceErrMessage
            })
          )
        };
      });
    }
    Object.assign(uniCloud$3, {
      get mixinDatacom () {
        return getMixinDatacom(uniCloud$3)
      }
    });
  }
})();

var uniCloud$4 = uniCloud$3;

module.exports = uniCloud$4;
