<<<<<<< HEAD
'use strict';

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
		module.exports = factory();
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
	    C_lib.Hasher = BufferedBlockAlgorithm.extend({
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

var require$$0 = core;

var md5 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = factory(require$$0);
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
		module.exports = factory(require$$0);
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
	    C_algo.HMAC = Base.extend({
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

var require$$1 = md5;

var require$$2 = hmac;

var hmacMd5 = createCommonjsModule(function (module, exports) {
(function (root, factory, undef) {
	{
		// CommonJS
		module.exports = factory(require$$0, require$$1, require$$2);
	}
}(commonjsGlobal, function (CryptoJS) {

	return CryptoJS.HmacMD5;

}));
});

var createHmac = hmacMd5;

var encUtf8 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = factory(require$$0);
	}
}(commonjsGlobal, function (CryptoJS) {

	return CryptoJS.enc.Utf8;

}));
});

var utf8 = encUtf8;

var encBase64 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = factory(require$$0);
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
	    C_enc.Base64 = {
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

var base64 = encBase64;

const UNI_ID_TOKEN_KEY = 'uni_id_token';
const UNI_ID_TOKEN_EXPIRED_KEY = 'uni_id_token_expired';
const UNI_ID_TOKEN_KEY_DEP = 'uniIdToken';
const CLIENT_DB_FUNCTION_NAME = 'DCloud-clientDB';
const GLOBAL_DB_CALLBACK_KEY = '_globalUniCloudDatabaseCallback';

const SYSTEM_ERROR = 'SYSTEM_ERROR';
const UNKNOWN_SYSTEM_ERROR_MESSAGE = 'unknown system error';

const CALLFUNCTION_TYPE = {
  DEFAULT: 'FUNCTION',
  FUNCTION: 'FUNCTION',
  OBJECT: 'OBJECT',
  CLIENT_DB: 'CLIENT_DB'
};

const PROMISE_STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};

function getType (val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

function isPlainObject (val) {
  return getType(val) === 'object'
}

function isFn (fn) {
  return typeof fn === 'function'
}

function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

function tryCatch (fn) {
  return function () {
    try {
      return fn.apply(fn, arguments)
    } catch (e) {
      console.error(e);
    }
  }
}

const PROMISE_RETRY_RULE = {
  REJECTED: 'REJECTED',
  NOT_PENDING: 'NOT_PENDING'
};

class PromiseHub {
  constructor ({
    createPromise,
    retryRule = PROMISE_RETRY_RULE.REJECTED
  } = {}) {
    this.createPromise = createPromise;
    this.status = null;
    this.promise = null;
    this.retryRule = retryRule;
  }

  get needRetry () {
    if (!this.status) {
      return true
    }
    switch (this.retryRule) {
      case PROMISE_RETRY_RULE.REJECTED:
        return this.status === PROMISE_STATUS.REJECTED
      case PROMISE_RETRY_RULE.NOT_PENDING:
        return this.status !== PROMISE_STATUS.PENDING
    }
  }

  exec () {
    if (!this.needRetry) {
      return this.promise
    }
    this.status = PROMISE_STATUS.PENDING;
    this.promise = this.createPromise().then((res) => {
      this.status = PROMISE_STATUS.FULFILLED;
      return Promise.resolve(res)
    }, err => {
      this.status = PROMISE_STATUS.REJECTED;
      return Promise.reject(err)
    });
    return this.promise
  }
}

function findLastIndex (arr, value) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === value) {
      return i
    }
  }
  return -1
}

/**
 * EventEmitter特性
 * 1. off时listener必传
 * 2. off时如果有多个listener仅移除一项listener
 * 3. off时优先移除后添加的一个listener
 */
class EventEmitter {
  constructor () {
    this._callback = {};
  }

  addListener (eventName, listener) {
    if (!this._callback[eventName]) {
      this._callback[eventName] = [];
    }
    this._callback[eventName].push(listener);
  }

  on (eventName, listener) {
    return this.addListener(eventName, listener)
  }

  removeListener (eventName, listener) {
    if (!listener) {
      throw new Error('The "listener" argument must be of type function. Received undefined')
    }
    const callbackFns = this._callback[eventName];
    if (!callbackFns) {
      return
    }
    const listenerIndex = findLastIndex(callbackFns, listener);
    callbackFns.splice(listenerIndex, 1);
  }

  off (eventName, listener) {
    return this.removeListener(eventName, listener)
  }

  removeAllListener (eventName) {
    delete this._callback[eventName];
  }

  emit (eventName, ...args) {
    const callbackFns = this._callback[eventName];
    if (!callbackFns) {
      return
    }
    for (let i = 0; i < callbackFns.length; i++) {
      callbackFns[i](...args);
    }
  }
}

function parseObjectEnv (val) {
  return val && typeof val === 'string' ? JSON.parse(val) : val
}

const IS_UNI_APP = "uni-vue3-cjs" === 'uni-vue3-cjs'  ;
const IS_UNI_APP_SSR = "uni-vue3-cjs" === 'uni-vue3-cjs';
const IS_VUE3 = "uni-vue3-cjs" === 'uni-vue3-cjs' ;
const IS_VUE2 = "uni-vue3-cjs" === 'uni';

const IS_DEV = process.env.NODE_ENV === 'development';
const UNI_PLATFORM = process.env.UNI_PLATFORM ;
const UNI_SECURE_NETWORK_ENABLE = process.env.UNI_SECURE_NETWORK_ENABLE === 'true' || process.env.UNI_SECURE_NETWORK_ENABLE === true;
const UNI_SECURE_NETWORK_CONFIG = parseObjectEnv(process.env.UNI_SECURE_NETWORK_CONFIG);

// 务必使用const不可修改为let，影响terser代码压缩
const UNI_PLATFORM_FIXED = UNI_PLATFORM === 'h5' ? 'web' : (UNI_PLATFORM === 'app-plus' ? 'app' : UNI_PLATFORM);

// 可能为字符串也可能为对象
const UNICLOUD_DEBUG = parseObjectEnv(process.env.UNICLOUD_DEBUG);
const UNI_CLOUD_PROVIDER = parseObjectEnv(process.env.UNI_CLOUD_PROVIDER) || [];

const RUN_BY_HBUILDERX = process.env.RUN_BY_HBUILDERX;

let UNI_APP_ID = '';
try {
  if (IS_VUE3) {
    UNI_APP_ID = process.env.UNI_APP_ID || '';
  }
} catch (e) { }

let globalUniCloudObj = {};

// nvue 和 vue 共享对象
function getGlobalObj (name, defaultValue = {}) {
  if (!hasOwn(globalUniCloudObj, name)) {
    globalUniCloudObj[name] = defaultValue;
  }
  return globalUniCloudObj[name]
}

const HOOKS = [
  'invoke',
  'success',
  'fail',
  'complete'
];

const globalInterceptor = getGlobalObj('_globalUniCloudInterceptor');

function mergeHookHandler (method, hook, handler) {
  let hookHandler = globalInterceptor[method][hook];
  if (!hookHandler) {
    hookHandler = globalInterceptor[method][hook] = [];
  }
  if (hookHandler.indexOf(handler) === -1 && isFn(handler)) {
    hookHandler.push(handler);
  }
}

function addInterceptor (method, option) {
  if (!globalInterceptor[method]) {
    globalInterceptor[method] = {};
  }
  if (!isPlainObject(option)) {
    return
  }
  Object.keys(option).forEach(hook => {
    if (HOOKS.indexOf(hook) > -1) {
      mergeHookHandler(method, hook, option[hook]);
    }
  });
}

function removeHookHandler (method, hook, handler) {
  const hookHandler = globalInterceptor[method][hook];
  if (!hookHandler) {
    return
  }
  const indexOfHandler = hookHandler.indexOf(handler);
  if (indexOfHandler > -1) {
    hookHandler.splice(indexOfHandler, 1);
  }
}

function removeInterceptor (method, option) {
  if (!globalInterceptor[method]) {
    globalInterceptor[method] = {};
  }
  if (isPlainObject(option)) {
    Object.keys(option).forEach(hook => {
      if (HOOKS.indexOf(hook) > -1) {
        removeHookHandler(method, hook, option[hook]);
      }
    });
  } else {
    delete globalInterceptor[method];
  }
}

function queueHooks (hooks, data) {
  if (!hooks || hooks.length === 0) {
    return Promise.resolve()
  }
  return hooks.reduce((promise, hook) => {
    return promise.then(() => {
      return hook(data)
    })
  }, Promise.resolve())
}

function getInterceptor (method, hook) {
  return (globalInterceptor[method] && globalInterceptor[method][hook]) || []
}

function interceptObject (option) {
  addInterceptor('callObject', option);
}

function wrapWithInterceptor ({
  fn,
  interceptorName,
  getCallbackArgs
} = {}) {
  return async function (...params) {
    const baseInterceptorArgs = getCallbackArgs ? getCallbackArgs({ params }) : {};
    let result, error;
    try {
      await queueHooks(
        getInterceptor(interceptorName, 'invoke'),
        {
          ...baseInterceptorArgs
        }
      );
      result = await fn(...params);
      await queueHooks(
        getInterceptor(interceptorName, 'success'),
        {
          ...baseInterceptorArgs,
          result
        }
      );
      return result
    } catch (err) {
      error = err;
      await queueHooks(
        getInterceptor(interceptorName, 'fail'),
        {
          ...baseInterceptorArgs,
          error
        }
      );
      throw error
    } finally {
      await queueHooks(
        getInterceptor(interceptorName, 'complete'),
        error ? { // 'error' in param
          ...baseInterceptorArgs,
          error
        } : {
          ...baseInterceptorArgs,
          result
        }
      );
    }
  }
}

const globalListener = getGlobalObj('_globalUniCloudListener');

const EVENT_NAME = {
  RESPONSE: 'response',
  NEED_LOGIN: 'needLogin',
  REFRESH_TOKEN: 'refreshToken'
};

const EVENT_TYPE = {
  CLIENT_DB: 'clientdb',
  CLOUD_FUNCTION: 'cloudfunction',
  CLOUD_OBJECT: 'cloudobject'
};

function getListenerList (eventName) {
  if (globalListener[eventName]) {
    return globalListener[eventName]
  }
  globalListener[eventName] = [];
  return globalListener[eventName]
}

function addListener (eventName, listener) {
  const listenerList = getListenerList(eventName);
  if (listenerList.includes(listener)) {
    return
  }
  listenerList.push(listener);
}

function removeListener (eventName, listener) {
  const listenerList = getListenerList(eventName);
  const listenerIndex = listenerList.indexOf(listener);
  if (listenerIndex === -1) {
    return
  }
  listenerList.splice(listenerIndex, 1);
}

function triggerEvent (eventName, evt) {
  const listenerList = getListenerList(eventName);
  for (let i = 0; i < listenerList.length; i++) {
    const listener = listenerList[i];
    listener(evt);
  }
}

let firstPageLoaded = false;
let firstPageLoadPromise;
function waitFirstPage () {
  if (firstPageLoadPromise) {
    return firstPageLoadPromise
  }
  firstPageLoadPromise = new Promise((resolve) => {
    if (firstPageLoaded) {
      resolve();
    }
    function initFirstPageRecursive () {
      if (typeof getCurrentPages === 'function') {
        const currentPages = getCurrentPages();
        if (currentPages && currentPages[0]) {
          // first page loaded
          firstPageLoaded = true;
          resolve();
        }
      }
      if (!firstPageLoaded) {
        setTimeout(() => {
          initFirstPageRecursive();
        }, 30);
      }
    }
    initFirstPageRecursive();
  });
  return firstPageLoadPromise
}

function getApiCallbacks (options) {
  const apiCallbacks = {};
  for (const name in options) {
    const fn = options[name];
    if (isFn(fn)) {
      apiCallbacks[name] = tryCatch(fn);
    }
  }
  return apiCallbacks
}

function callbackify (method) {
  return function (options) {
    options = options || {};
    const { success, fail, complete } = getApiCallbacks(options);
    if (success || fail || complete) {
      method
        .call(this, options)
        .then((res) => {
          success && success(res);
          complete && complete(res);
        }, (err) => {
          fail && fail(err);
          complete && complete(err);
        });
      return
    }
    return method.call(this, options)
  }
}

// TODO 优化此处逻辑
/*
目前为保证onResponse在interceptor后触发，将云函数onResponse移至此处，云对象及clientDB均在内部实现
 */

function callbackifyWithInterceptor (method, methodName) {
  // 不进行拦截器相关处理
  return function (options) {
    // database拦截器在其内部实现

    let ignoreInterceptor = false;

    if (methodName === 'callFunction') {
      const type = (options && options.type) || CALLFUNCTION_TYPE.DEFAULT;
      ignoreInterceptor = type !== CALLFUNCTION_TYPE.DEFAULT;
    }
    const isNormalCallFunction = methodName === 'callFunction' && !ignoreInterceptor;

    const preRequest = this._initPromiseHub.exec();

    options = options || {};
    const { success, fail, complete } = getApiCallbacks(options);
    const promise = preRequest.then(() => {
      if (ignoreInterceptor) {
        return Promise.resolve()
      }
      return queueHooks(getInterceptor(methodName, 'invoke'), options)
    }).then(() => {
      return method.call(this, options)
    }).then((res) => {
      if (ignoreInterceptor) {
        return Promise.resolve(res)
      }
      return queueHooks(getInterceptor(methodName, 'success'), res).then(() => {
        return queueHooks(getInterceptor(methodName, 'complete'), res)
      }).then(() => {
        if (isNormalCallFunction) {
          triggerEvent(EVENT_NAME.RESPONSE, {
            type: EVENT_TYPE.CLOUD_FUNCTION,
            content: res
          });
        }
        return Promise.resolve(res)
      })
    }, (err) => {
      if (ignoreInterceptor) {
        return Promise.reject(err)
      }

      return queueHooks(getInterceptor(methodName, 'fail'), err).then(() => {
        return queueHooks(getInterceptor(methodName, 'complete'), err)
      }).then(() => {
        triggerEvent(EVENT_NAME.RESPONSE, {
          type: EVENT_TYPE.CLOUD_FUNCTION,
          content: err
        });
        return Promise.reject(err)
      })
    });

    if (success || fail || complete) {
      promise.then((res) => {
        success && success(res);
        complete && complete(res);
        if (isNormalCallFunction) {
          triggerEvent(EVENT_NAME.RESPONSE, {
            type: EVENT_TYPE.CLOUD_FUNCTION,
            content: res
          });
        }
      }, err => {
        fail && fail(err);
        complete && complete(err);
        if (isNormalCallFunction) {
          triggerEvent(EVENT_NAME.RESPONSE, {
            type: EVENT_TYPE.CLOUD_FUNCTION,
            content: err
          });
        }
      });
      return
    }
    return promise
  }
}

class UniCloudError extends Error {
    constructor(options) {
        super(options.message);
        this.errMsg = options.message || options.errMsg || UNKNOWN_SYSTEM_ERROR_MESSAGE;
        this.code = this.errCode = options.code || options.errCode || SYSTEM_ERROR;
        this.errSubject = this.subject = options.subject || options.errSubject;
        this.cause = options.cause;
        this.requestId = options.requestId;
    }
    toJson(layer = 0) {
        if (layer >= 10) {
            return;
        }
        layer++;
        return {
            errCode: this.errCode,
            errMsg: this.errMsg,
            errSubject: this.errSubject,
            cause: this.cause && this.cause.toJson ? this.cause.toJson(layer) : this.cause
        };
    }
}

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

var uniAdapter = defaultAdapter;

// toRaw from vue3
function toRaw (observed) {
  return ((observed && toRaw(observed.__v_raw)) || observed)
}

function getUniIdToken () {
  return {
    token: uniAdapter.getStorageSync(UNI_ID_TOKEN_KEY) || uniAdapter.getStorageSync(UNI_ID_TOKEN_KEY_DEP),
    tokenExpired: uniAdapter.getStorageSync(UNI_ID_TOKEN_EXPIRED_KEY)
  }
}

function setUniIdToken ({
  token,
  tokenExpired
} = {}) {
  token && uniAdapter.setStorageSync(UNI_ID_TOKEN_KEY, token);
  tokenExpired && uniAdapter.setStorageSync(UNI_ID_TOKEN_EXPIRED_KEY, tokenExpired);
}

let systemInfo$1;
function getSystemInfo () {
  if (!systemInfo$1) {
    systemInfo$1 = uni.getSystemInfoSync();
  }
  return systemInfo$1
}

function getInternalProvider (provider) {
  if (provider === 'tencent') {
    return 'tcb'
  }
  return provider
}

// process.env.UNI_PLATFORM
// 'app' | 'app-plus'
// 'web' | 'h5'
// 'mp-weixin'
// 'mp-alipay'
// 'mp-baidu'
// 'mp-toutiao'
// 'mp-qq'
// 'mp-kuaishou'
// 'mp-lark'
// 'quickapp-native'
// 'quickapp-webview'

function getLaunchOptions () {
  let channel,
    scene;
  try {
    if (uni.getLaunchOptionsSync) {
      if (uni.getLaunchOptionsSync.toString().indexOf('not yet implemented') > -1) {
        return
      }
      const {
        scene: sceneOption,
        channel: channelOption
      } = uni.getLaunchOptionsSync();
      channel = channelOption;
      scene = sceneOption;
    }
  } catch (error) {}
  return {
    channel,
    scene
  }
}

let BaseClientInfo;

function getClientInfo () {
  const LOCALE = (uni.getLocale && uni.getLocale()) || 'en';
  if (BaseClientInfo) {
    return {
      ...BaseClientInfo,
      locale: LOCALE,
      LOCALE
    }
  }
  const systemInfo = getSystemInfo();
  const {
    deviceId,
    osName,
    uniPlatform,
    appId
  } = systemInfo;
  const deprecatedPropList = [
    'pixelRatio',
    'brand',
    'model',
    'system',
    'language',
    'version',
    'platform',
    'host',
    'SDKVersion',
    'swanNativeVersion',
    'app',
    'AppPlatform',
    'fontSizeSetting'
  ];
  for (let i = 0; i < deprecatedPropList.length; i++) {
    const deprecatedProp = deprecatedPropList[i];
    delete systemInfo[deprecatedProp];
  }
  BaseClientInfo = {
    PLATFORM: uniPlatform,
    OS: osName,
    APPID: appId,
    DEVICEID: deviceId,
    ...getLaunchOptions(),
    ...systemInfo
  };
  return {
    ...BaseClientInfo,
    locale: LOCALE,
    LOCALE
  }
}

function sign$1 (data, clientSecret) {
  let signString = '';
  Object.keys(data).sort().forEach(function (key) {
    if (data[key]) {
      signString = signString + '&' + key + '=' + data[key];
    }
  });
  signString = signString.slice(1);
  return createHmac(signString, clientSecret).toString()
}

function toBase64 (str) {
  return base64.stringify(utf8.parse(str))
}

function wrappedRequest (args, request) {
  return new Promise((resolve, reject) => {
    request(Object.assign(args, {
      complete (res) {
        if (!res) {
          res = {};
        }
        if (IS_DEV && UNI_PLATFORM_FIXED === 'web' && res.errMsg && res.errMsg.indexOf('request:fail') === 0) {
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
  sign: sign$1,
  wrappedRequest,
  toBase64
};

class Client$2 {
  constructor (args) {
    const argsRequired = ['spaceId', 'clientSecret'];
    argsRequired.forEach((item) => {
      if (!Object.prototype.hasOwnProperty.call(args, item)) {
        throw new Error(`${item} required`)
      }
    });
    this.config = Object.assign({}, {
      endpoint: args.spaceId.indexOf('mp-') === 0 ? 'https://api.next.bspapp.com' : 'https://api.bspapp.com'
    }, args);
    this.config.provider = 'aliyun';
    this.config.requestUrl = this.config.endpoint + '/client';
    this.config.envType = this.config.envType || 'public';
    this.config.accessTokenKey = 'access_token_' + this.config.spaceId;
    this.adapter = uniAdapter;

    this._getAccessTokenPromiseHub = new PromiseHub({
      createPromise: () => {
        const body = {
          method: 'serverless.auth.user.anonymousAuthorize',
          params: '{}'
        };
        return this.requestAuth(this.setupRequest(body, 'auth')).then((res) => {
          if (res.result && res.result.accessToken) {
            this.setAccessToken(res.result.accessToken);
          } else {
            throw new UniCloudError({
              code: 'AUTH_FAILED',
              message: '获取accessToken失败'
            })
          }
        })
      },
      retryRule: PROMISE_RETRY_RULE.NOT_PENDING
    });
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
    return this._getAccessTokenPromiseHub.exec()
  }

  async authorize () {
    await this.getAccessToken();
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

  async uploadFile ({
    filePath,
    cloudPath,
    fileType = 'image',
    cloudPathAsRealPath = false,
    onUploadProgress,
    config
  }) {
    if (getType(cloudPath) !== 'string') {
      throw new UniCloudError({
        code: 'INVALID_PARAM',
        message: 'cloudPath必须为字符串类型'
      })
    }
    cloudPath = cloudPath.trim();
    if (!cloudPath) {
      throw new UniCloudError({
        code: 'INVALID_PARAM',
        message: 'cloudPath不可为空'
      })
    }
    if (/:\/\//.test(cloudPath)) {
      throw new UniCloudError({
        code: 'INVALID_PARAM',
        message: 'cloudPath不合法'
      })
    }
    const env = (config && config.envType) || this.config.envType;
    if (cloudPathAsRealPath) {
      if (cloudPath[0] !== '/') {
        cloudPath = '/' + cloudPath;
      }
      if (cloudPath.indexOf('\\') > -1) {
        throw new UniCloudError({
          code: 'INVALID_PARAM',
          message: '使用cloudPath作为路径时，cloudPath不可包含“\\”'
        })
      }
    }
    const getOSSUploadOptionsRes = await this.getOSSUploadOptionsFromPath({
      env,
      filename: cloudPathAsRealPath ? cloudPath.split('/').pop() : cloudPath,
      fileId: cloudPathAsRealPath ? cloudPath : undefined
    });

    const uploadOptionsResult = getOSSUploadOptionsRes.result;
    const fileUrl = 'https://' + uploadOptionsResult.cdnDomain + '/' + uploadOptionsResult.ossPath;

    const {
      securityToken,
      accessKeyId,
      signature,
      host,
      ossPath,
      id,
      policy,
      ossCallbackUrl
    } = uploadOptionsResult;
    const formData = {
      'Cache-Control': 'max-age=2592000',
      'Content-Disposition': 'attachment',
      OSSAccessKeyId: accessKeyId,
      Signature: signature,
      host,
      id,
      key: ossPath,
      policy: policy,
      success_action_status: 200
    };

    if (securityToken) {
      formData['x-oss-security-token'] = securityToken;
    }

    if (ossCallbackUrl) {
      const callbackStr = JSON.stringify({
        callbackUrl: ossCallbackUrl,
        callbackBody: JSON.stringify({
          fileId: id,
          spaceId: this.config.spaceId
        }),
        callbackBodyType: 'application/json'
      });
      formData.callback = codec.toBase64(callbackStr);
    }

    const uploadFileToOSSOptions = {
      url: 'https://' + uploadOptionsResult.host,
      formData,
      fileName: 'file',
      name: 'file',
      filePath: filePath,
      fileType
    };
    await this.uploadFileToOSS(Object.assign({}, uploadFileToOSSOptions, {
      onUploadProgress
    }));

    if (ossCallbackUrl) {
      return {
        success: true,
        filePath,
        fileID: fileUrl
      }
    }

    const reportRes = await this.reportOSSUpload({
      id
    });

    if (reportRes.success) {
      return {
        success: true,
        filePath,
        fileID: fileUrl
      }
    }

    throw new UniCloudError({
      code: 'UPLOAD_FAILED',
      message: '文件上传失败'
    })
  }

  // deleteFile ({
  //   fileList
  // }) {
  //   const body = {
  //     method: 'serverless.file.resource.delete',
  //     params: JSON.stringify({
  //       id: fileList[0]
  //     })
  //   }
  //   return this.request(this.setupRequest(body))
  // }

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

  async getFileInfo ({
    fileList
  } = {}) {
    if (!Array.isArray(fileList) || fileList.length === 0) {
      throw new UniCloudError({
        code: 'INVALID_PARAM',
        message: 'fileList的元素必须是非空的字符串'
      })
    }
    const body = {
      method: 'serverless.file.resource.info',
      params: JSON.stringify({
        id: fileList.map(item => item.split('?')[0]).join(',')
      })
    };
    const res = await this.request(this.setupRequest(body));
    return {
      fileList: res.result
    }
  }
}

var AliClient = Client$2;

const uniCloud$5 = {
  init (config) {
    const uniClient = new AliClient(config);
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

var uniCloudAli = uniCloud$5;

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
const BASE_URL = '//tcb-api.tencentcloudapi.com/web';
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
		module.exports = factory(require$$0);
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

var sha256$1 = sha256;

var hmacSha256 = createCommonjsModule(function (module, exports) {
(function (root, factory, undef) {
	{
		// CommonJS
		module.exports = factory(require$$0, sha256, require$$2);
	}
}(commonjsGlobal, function (CryptoJS) {

	return CryptoJS.HmacSHA256;

}));
});

var hmacSha256$1 = hmacSha256;

const createPromiseCallback = () => {
    let cb;
    if (!Promise) {
        cb = () => { };
        cb.promise = {};
        const throwPromiseNotDefined = () => {
            throw new UniCloudError({
                message: 'Your Node runtime does support ES6 Promises. ' +
                    'Set "global.Promise" to your preferred implementation of promises.'
            });
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
function formatUrl$1(protocol, url, query = {}) {
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
const Adapter$1 = {
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
        if (!Adapter$1.adapter.root['tcbObject']) {
            Adapter$1.adapter.root['tcbObject'] = {};
        }
    }
    // 保存数据到
    setItem(key, value) {
        Adapter$1.adapter.root['tcbObject'][key] = value;
    }
    // 获取数据
    getItem(key) {
        return Adapter$1.adapter.root['tcbObject'][key];
    }
    // 删除保存的数据
    removeItem(key) {
        delete Adapter$1.adapter.root['tcbObject'][key];
    }
    // 删除所有保存的数据
    clear() {
        delete Adapter$1.adapter.root['tcbObject'];
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
            this._persistence = Adapter$1.adapter.primaryStorage || config.persistence;
            this._storage = createStorage(this._persistence, Adapter$1.adapter);
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
        const storage = createStorage(persistence, Adapter$1.adapter);
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
 * @param {UniCloudError} error - 错误信息对象
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
        this._reqClass = new Adapter$1.adapter.reqClass({
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
            throw new UniCloudError({
                message: '未登录CloudBase'
            });
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
            throw new UniCloudError({
                code: response.data.code,
                message: `刷新access token失败：${response.data.code}`
            });
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
            throw new UniCloudError({
                message: 'refresh token不存在，登录状态异常'
            });
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
            contentType = 'application/json';
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
        let newUrl = formatUrl$1(protocol, BASE_URL, formatQuery);
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
            throw new UniCloudError({
                code: 'NETWORK_ERROR',
                message: 'network request error'
            });
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
                throw new UniCloudError({
                    code: response.data.code,
                    message: response.data.message
                });
            }
            return response.data;
        }
        if (response.data.code) {
            throw new UniCloudError({
                code: response.data.code,
                message: response.data.message
            });
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
            throw new UniCloudError({
                code: 'PARAM_ERROR',
                message: 'envId is not defined'
            });
        }
        this._envId = envId;
        this._cache = getCache(this._envId);
        this._request = getRequestByEnvId(this._envId);
        this.setUserInfo();
    }
    linkWithTicket(ticket) {
        if (typeof ticket !== 'string') {
            throw new UniCloudError({
                code: 'PARAM_ERROR',
                message: 'ticket must be string'
            });
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
            throw new UniCloudError({
                code: 'PARAM_ERROR',
                message: 'username must be a string'
            });
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
            throw new UniCloudError({
                code: 'PARAM_ERROR',
                message: 'envId is not defined'
            });
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
            throw new UniCloudError({
                message: '匿名登录失败'
            });
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
            throw new UniCloudError({
                message: '匿名转化失败'
            });
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
            throw new UniCloudError({
                code: 'PARAM_ERROR',
                message: 'ticket must be a string'
            });
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
            throw new UniCloudError({
                message: '自定义登录失败'
            });
        }
    }
}

class EmailAuthProvider extends AuthProvider {
    async signIn(email, password) {
        if (typeof email !== 'string') {
            throw new UniCloudError({
                code: 'PARAM_ERROR',
                message: 'email must be a string'
            });
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
            throw new UniCloudError({
                code: res.code,
                message: `邮箱登录失败: ${res.message}`
            });
        }
        else {
            throw new UniCloudError({
                message: `邮箱登录失败`
            });
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
            throw new UniCloudError({
                code: 'PARAM_ERROR',
                message: 'username must be a string'
            });
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
            throw new UniCloudError({
                code: res.code,
                message: `用户名密码登录失败: ${res.message}`
            });
        }
        else {
            throw new UniCloudError({
                message: '用户名密码登录失败'
            });
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
            throw new UniCloudError({
                message: '匿名用户不支持登出操作'
            });
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
            throw new UniCloudError({
                code: 'PARAM_ERROR',
                message: 'username must be a string'
            });
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
                callback(new UniCloudError({
                    code: 'STORAGE_REQUEST_FAIL',
                    message: `STORAGE_REQUEST_FAIL: ${res.data}`
                }));
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

const callFunction$1 = function ({ name, data, query, parse, search }, callback) {
    const promisedCallback = callback || createPromiseCallback();
    let jsonData;
    try {
        jsonData = data ? JSON.stringify(data) : '';
    }
    catch (e) {
        return Promise.reject(e);
    }
    if (!name) {
        return Promise.reject(new UniCloudError({
            code: 'PARAM_ERROR',
            message: '函数名不能为空'
        }));
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
                    promisedCallback(new UniCloudError({
                        message: 'response data must be json'
                    }));
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
        if (!Adapter$1.adapter) {
            // this._useDefaultAdapter();
            // eslint-disable-next-line
            this.requestClient = new Adapter$1.adapter.reqClass({
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
        const _persistence = persistence || Adapter$1.adapter.primaryStorage || DEFAULT_INIT_CONFIG.persistence;
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
        return callFunction$1.apply(this, [params, callback]);
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
            throw new UniCloudError({
                message: `扩展${name} 必须先注册`
            });
        }
        let res = await ext.invoke(opts, this);
        return res;
    }
    useAdapters(adapters) {
        const { adapter, runtime } = useAdapters(adapters) || {};
        adapter && (Adapter$1.adapter = adapter);
        runtime && (Adapter$1.runtime = runtime);
    }
}
const tcb = new TCB();
// tcb.useAdapters(adapterForWxMp);
// window 可能不存在
// try {
//   window['tcb'] = tcb;
// } catch (e) {
//   // 忽略错误
// }
var tcb$1 = tcb;

function isMatch () {
  return true
}

function formatUrl (protocol, url, query) {
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
      uniAdapter.request({
        url: formatUrl('https:', url),
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
      const uploadTask = uniAdapter.uploadFile({
        url: formatUrl('https:', url),
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
    uniAdapter.setStorageSync(key, value);
  },
  getItem (key) {
    return uniAdapter.getStorageSync(key)
  },
  removeItem (key) {
    uniAdapter.removeStorageSync(key);
  },
  clear () {
    uniAdapter.clearStorageSync();
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

var adapter$1 = adapter;

tcb$1.useAdapters(adapter$1);

const uniCloud$4 = tcb$1;
const oldInit = uniCloud$4.init;
uniCloud$4.init = function (options) {
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

  return uniClient
};

var uniCloudTcb = uniCloud$4;

class Client extends AliClient {
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

    const clientInfo = getClientInfo() ;

    // 私有化专属头信息
    header['x-client-info'] = encodeURIComponent(JSON.stringify(clientInfo));
    const {
      token
    } = getUniIdToken();
    header['x-client-token'] = token;

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
        name
      } = res.result;
      fileUrl = res.result.fileUrl;
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

  deleteFile ({
    fileList
  }) {
    const body = {
      method: 'serverless.file.resource.delete',
      params: JSON.stringify({
        fileList
      })
    };
    return this.request(this.setupRequest(body)).then(res => {
      if (res.success) {
        return res.result
      } else {
        throw new UniCloudError({
          code: 'DELETE_FILE_FAILED',
          message: '删除文件失败'
        })
      }
    })
  }

  getTempFileURL ({
    fileList,
    maxAge
  } = {}) {
    if (!Array.isArray(fileList) || fileList.length === 0) {
      throw new UniCloudError({
        code: 'INVALID_PARAM',
        message: 'fileList的元素必须是非空的字符串'
      })
    }
    const body = {
      method: 'serverless.file.resource.getTempFileURL',
      params: JSON.stringify({
        fileList,
        maxAge
      })
    };
    return this.request(
      this.setupRequest(body)
    ).then((res) => {
      if (res.success) {
        return {
          fileList: res.result.fileList.map(item => {
            return {
              fileID: item.fileID,
              tempFileURL: item.tempFileURL
            }
          })
        }
      } else {
        throw new UniCloudError({
          code: 'GET_TEMP_FILE_URL_FAILED',
          message: '获取临时文件链接失败'
        })
      }
    })
  }
}

var Client$1 = Client;

const uniCloud$3 = {
  init (config) {
    const uniClient = new Client$1(config);
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

var uniCloudPrivate = uniCloud$3;

var encHex = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = factory(require$$0);
	}
}(commonjsGlobal, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));
});

var EncHex = encHex;

function sign (options) {
  const algorithm = 'HMAC-SHA256';
  const headerKeyStr = options.signedHeaders.join(';');
  const headerStr = options.signedHeaders.map((key) => `${key.toLowerCase()}:${options.headers[key]}\n`).join('');
  const bodyHash = sha256$1(options.body).toString(EncHex);
  const paramStr = `${options.method.toUpperCase()}\n${options.path}\n${options.query}\n${headerStr}\n${headerKeyStr}\n${bodyHash}\n`;
  const paramHash = sha256$1(paramStr).toString(EncHex);
  const signStr = `${algorithm}\n${options.timestamp}\n${paramHash}\n`;
  const sign = hmacSha256$1(signStr, options.secretKey).toString(EncHex);

  return `${algorithm} Credential=${options.secretId}, SignedHeaders=${headerKeyStr}, Signature=${sign}`
}
function generateUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
    var e = 16 * Math.random() | 0;
    return (t === 'x' ? e : 3 & e | 8).toString(16)
  })
}
function buildRequestOptions (path = '', options = {}) {
  const { data, functionName, method, headers: _headers, signHeaderKeys = [], config } = options;
  const timestamp = Date.now();
  const uuid = generateUUID();
  const headers = Object.assign({}, _headers, {
    'x-from-app-id': config.appId,
    'x-from-env-id': config.envId,
    'x-to-env-id': config.envId,
    'x-from-instance-id': timestamp,
    'x-from-function-name': functionName,
    'x-client-timestamp': timestamp,
    'x-alipay-source': 'client',
    'x-request-id': uuid,
    'x-alipay-callid': uuid
  });

  const signFields = [
    'x-from-app-id',
    'x-from-env-id',
    'x-to-env-id',
    'x-from-instance-id',
    'x-from-function-name',
    'x-client-timestamp'
  ].concat(signHeaderKeys);

  const [pathname = '', query = ''] = path.split('?') || [];
  const authSign = sign({
    path: pathname,
    query,
    method,
    headers,
    timestamp,
    body: JSON.stringify(data),
    secretId: config.secretId,
    secretKey: config.secretKey,
    signedHeaders: signFields.sort()
  });

  return {
    url: `${config.endpoint}${path.replace(/^\//, '')}`,
    headers: Object.assign({}, headers, {
      Authorization: authSign
    })
  }
}

function request$1 ({ url, data, method = 'POST', headers = {} }) {
  return new Promise((resolve, reject) => {
    uniAdapter.request({
      url,
      method,
      data,
      header: headers,
      dataType: 'json',
      complete: (res = {}) => {
        if (!res.statusCode || res.statusCode >= 400) {
          const { errMsg } = res.data || {};
          return reject(new UniCloudError({
            code: 'SYS_ERR',
            message: errMsg || res.errMsg || 'request:fail',
            requestId: res.requestID
          }))
        }

        resolve({
          status: res.statusCode,
          data: res.data,
          headers: res.header,
          requestId: res.requestID
        });
      }
    });
  })
}

function callFunctionRequest (params, config) {
  const { name: functionName, data } = params;
  const method = 'POST';
  const { url, headers } = buildRequestOptions('/functions/invokeFunction', {
    functionName,
    data,
    method,
    headers: {
      'x-to-function-name': functionName
    },
    signHeaderKeys: ['x-to-function-name'],
    config
  });

  return request$1({
    url,
    data,
    method,
    headers
  }).then(res => {
    return {
      errCode: 0,
      success: true,
      requestId: res.requestId,
      result: res.data
    }
  }).catch(e => {
    throw new UniCloudError({
      code: e.errCode,
      message: e.errMsg,
      requestId: e.requestId
    })
  })
}

function storageRequest (params, config) {
  const {
    path,
    data,
    method = 'GET'
  } = params;
  const {
    url,
    headers
  } = buildRequestOptions(path, {
    functionName: '',
    data,
    method,
    headers: {
      'x-alipay-cloud-mode': 'oss',
      'x-data-api-type': 'oss',
      'x-expire-timestamp': Date.now() + 60000
    },
    signHeaderKeys: ['x-data-api-type', 'x-expire-timestamp'],
    config
  });

  return request$1({
    url,
    data,
    method,
    headers
  }).then(res => {
    const data = res.data || {};

    if (!data.success) {
      throw new UniCloudError({
        code: res.code,
        message: res.message,
        requestId: res.trace_id
      })
    }

    return data.data || {}
  }).catch(e => {
    throw new UniCloudError({
      code: e.errCode,
      message: e.errMsg,
      requestId: e.requestId
    })
  })
}

function getCloudPathFormFileId (fileId = '') {
  const filePath = fileId.trim().replace(/^cloud:\/\//, '');
  const n = filePath.indexOf('/');
  if (n <= 0) {
    throw new UniCloudError({
      code: 'INVALID_PARAM',
      message: 'fileID不合法'
    })
  }
  const envId = filePath.substring(0, n);
  const cloudPath = filePath.substring(n + 1);
  if (envId !== this.config.envId) {
    console.warn('file '.concat(fileId, ' does not belong to env ').concat(this.config.envId));
  }
  return cloudPath
}

class AlipayCloud {
  constructor (props) {
    const argsRequired = ['spaceId', 'spaceAppId', 'accessKey', 'secretKey'];
    argsRequired.forEach((item) => {
      if (!Object.prototype.hasOwnProperty.call(props, item)) {
        throw new Error(`${item} required`)
      }
    });

    const { spaceAppId, accessKey, ...rest } = props;

    this.config = Object.assign({}, {
      endpoint: props.endpoint || `https://${props.envId}.api-hz.cloudbasefunction.cn/`,
      envId: props.spaceId,
      appId: spaceAppId,
      secretId: accessKey
    }, rest);
  }

  callFunction (params) {
    return callFunctionRequest(params, this.config)
  }

  uploadFileToOSS ({
    url,
    filePath,
    fileType,
    formData,
    onUploadProgress
  }) {
    return new Promise((resolve, reject) => {
      const uploadTask = uniAdapter.uploadFile({
        url,
        filePath,
        fileType,
        formData,
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

  async uploadFile ({
    filePath,
    cloudPath = '',
    fileType = 'image',
    onUploadProgress
  }) {
    if (getType(cloudPath) !== 'string') {
      throw new UniCloudError({
        code: 'INVALID_PARAM',
        message: 'cloudPath必须为字符串类型'
      })
    }
    cloudPath = cloudPath.trim();
    if (!cloudPath) {
      throw new UniCloudError({
        code: 'INVALID_PARAM',
        message: 'cloudPath不可为空'
      })
    }
    if (/:\/\//.test(cloudPath)) {
      throw new UniCloudError({
        code: 'INVALID_PARAM',
        message: 'cloudPath不合法'
      })
    }

    const uploadRes = await storageRequest({
      path: '/'.concat(cloudPath.replace(/^\//, ''), '?post_url')
    }, this.config);

    const {
      file_id: fileId,
      upload_url: uploadUrl,
      form_data: formData
    } = uploadRes;

    const parseFormData = formData && formData.reduce((data, item) => {
      data[item.key] = item.value;
      return data
    }, {});

    return this.uploadFileToOSS({
      url: uploadUrl,
      filePath,
      fileType,
      formData: parseFormData,
      onUploadProgress
    }).then(() => {
      return {
        fileID: fileId
      }
    })
  }

  async getTempFileURL ({ fileList }) {
    return new Promise((resolve, reject) => {
      if (!fileList || fileList.length < 0) {
        reject(
          new UniCloudError({
            errCode: 'INVALID_PARAM',
            errMsg: 'fileList不能为空数组'
          })
        );
      }

      if (fileList.length > 50) {
        reject(
          new UniCloudError({
            errCode: 'INVALID_PARAM',
            errMsg: 'fileList数组长度不能超过50'
          })
        );
      }

      const list = [];

      for (const fileId of fileList) {
        if (getType(fileId) !== 'string') {
          reject(
            new UniCloudError({
              errCode: 'INVALID_PARAM',
              errMsg: 'fileList的元素必须是非空的字符串'
            })
          );
        }
        const cloudPath = getCloudPathFormFileId.call(this, fileId);

        list.push({
          file_id: cloudPath,
          expire: 600
        });
      }

      storageRequest({
        path: '/?download_url',
        data: {
          file_list: list
        },
        method: 'POST'
      }, this.config).then((res) => {
        const { file_list: fileList = [] } = res;
        resolve({
          fileList: fileList.map((item) => {
            return {
              fileID: item.file_id,
              tempFileURL: item.download_url
            }
          })
        });
      }).catch((err) => reject(err));
    })
  }
}

var Adapter = AlipayCloud;

const uniCloud$2 = {
  init: (config) => {
    config.envId = config.spaceId;
    config.provider = 'alipay';

    const uniClient = new Adapter(config);

    // 支付宝小程序云暂无 auth 相关操作，这里模拟一个 auth 对象
    uniClient.auth = function () {
      return {
        signInAnonymously: function () {
          return Promise.resolve()
        },
        getLoginState: function () {
          return Promise.resolve(true)
        }
      }
    };

    return uniClient
  }
};

var uniCloudAlipay = uniCloud$2;

function getRealFunctionData ({
  data
}) {
  let clientInfo;
  {
    clientInfo = getClientInfo();
  }
  const optionsDataCopy = JSON.parse(JSON.stringify(data || {}));
  {
    Object.assign(optionsDataCopy, {
      clientInfo
    });
  }
  if (!optionsDataCopy.uniIdToken) {
    const {
      token: uniIdToken
    } = getUniIdToken();
    if (uniIdToken) {
      optionsDataCopy.uniIdToken = uniIdToken;
    }
  }
  return optionsDataCopy
}

async function callFunction ({
  name,
  data
} = {}) {
  await this.__dev__.initLocalNetwork();
  const {
    localAddress: address,
    localPort: port
  } = this.__dev__;
  const pvdList = {
    aliyun: 'aliyun',
    tencent: 'tcb',
    alipay: 'alipay'
  };
  const provider = pvdList[this.config.provider];
  const spaceId = this.config.spaceId;
  const checkUrl = `http://${address}:${port}/system/check-function`;
  const requestUrl = `http://${address}:${port}/cloudfunctions/${name}`;
  return new Promise((resolve, reject) => {
    uniAdapter.request({
      method: 'POST',
      url: checkUrl,
      data: {
        name,
        platform: UNI_PLATFORM_FIXED,
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
      return this._callCloudFunction({ name, data })
    }
    return new Promise((resolve, reject) => {
      const param = getRealFunctionData.call(this, {
        data
      });
      uniAdapter.request({
        method: 'POST',
        url: requestUrl,
        data: {
          provider,
          platform: UNI_PLATFORM_FIXED,
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

const SECRET_TYPE = {
  NONE: 'none',
  REQUEST: 'request',
  RESPONSE: 'response',
  BOTH: 'both'
};

const UNI_CLOUD_STATUS = '_globalUniCloudStatus';
const GLOBAL_SECURE_NETWORK_CACHE_KEY = '_globalUniCloudSecureNetworkCache__{spaceId}';

function getScopedSecureNetworkCache$1 (uniClient) {
  return getGlobalObj(
    GLOBAL_SECURE_NETWORK_CACHE_KEY.replace(
      '{spaceId}',
      uniClient.config.spaceId
    )
  )
}

class Base {
  constructor ({
    secretType,
    uniCloudIns
  } = {}) {
    this.clientType = '';
    this.secretType = secretType || SECRET_TYPE.NONE;
    this.uniCloudIns = uniCloudIns;
    const {
      provider,
      spaceId
    } = this.uniCloudIns.config;
    this.provider = provider;
    this.spaceId = spaceId;
    this.scopedGlobalCache = getScopedSecureNetworkCache$1(this.uniCloudIns);
  }

  getSystemInfo () {
    if (this._systemInfo) {
      return this._systemInfo
    }
    this._systemInfo = getSystemInfo();
    return this._systemInfo
  }

  get appId () {
    return this.getSystemInfo().appId
  }

  get deviceId () {
    return this.getSystemInfo().deviceId
  }

  // 加密流程开始之前的准备工作
  // abstract prepare()
  // 加密原始data，返回新data
  // abstract platformEncryptData(data)
  // 解密原始result，返回result
  // abstract platformDecryptResult(result)

  async encryptData (data) {
    if (this.secretType === SECRET_TYPE.NONE) {
      return data
    }
    // response类型也走platformEncryptData方法
    return this.platformEncryptData(data)
  }

  async decryptResult (result) {
    if (this.secretType === SECRET_TYPE.NONE) {
      return result
    }
    const {
      errCode,
      content
    } = result || {};
    if (errCode || !content) {
      // 安全网络抛出错误或未返回content
      return result
    }
    if (this.secretType === SECRET_TYPE.REQUEST) {
      return content
    }
    return this.platformDecryptResult(result)
  }

  wrapVerifyClientCallFunction (fn) {
    const _this = this;
    return async function ({
      name,
      data = {}
    } = {}) {
      await _this.prepare();
      data = JSON.parse(JSON.stringify(data));
      data._uniCloudOptions = await _this.platformGetSignOption();
      let response = await fn({
        name,
        data
      });
      if (_this.isClientKeyNotFound(response)) {
        // 服务端返回clientKeyNotFound时重试一次
        await _this.prepare({
          forceUpdate: true
        });
        data._uniCloudOptions = await _this.platformGetSignOption();
        response = await fn({
          name,
          data
        });
      }
      return response
    }
  }

  wrapEncryptDataCallFunction (fn) {
    const _this = this;
    return async function ({
      name,
      data = {}
    } = {}) {
      await _this.prepare();
      const realData = await _this.encryptData(data);
      let response = await fn({
        name,
        data: realData
      });
      if (_this.isClientKeyNotFound(response)) {
        // 服务端返回clientKeyNotFound时重试一次
        await _this.prepare({
          forceUpdate: true
        });
        const realData = await _this.encryptData(data);
        data._uniCloudOptions = await _this.platformGetSignOption();
        response = await fn({
          name,
          data: realData
        });
      }
      response.result = await _this.decryptResult(response.result);
      return response
    }
  }
}

/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */

function checkInt(value) {
  return (parseInt(value) === value)
}

function checkInts(arrayish) {
  if (!checkInt(arrayish.length)) { return false }

  for (var i = 0; i < arrayish.length; i++) {
    if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
      return false
    }
  }

  return true
}

function coerceArray(arg, copy) {
  // ArrayBuffer view
  if (arg.buffer && arg.name === 'Uint8Array') {
    if (copy) {
      if (arg.slice) {
        arg = arg.slice();
      } else {
        arg = Array.prototype.slice.call(arg);
      }
    }

    return arg
  }

  // It's an array; check it is a valid representation of a byte
  if (Array.isArray(arg)) {
    if (!checkInts(arg)) {
      throw new Error('Array contains invalid value: ' + arg)
    }

    return new Uint8Array(arg)
  }

  // Something else, but behaves like an array (maybe a Buffer? Arguments?)
  if (checkInt(arg.length) && checkInts(arg)) {
    return new Uint8Array(arg)
  }

  throw new Error('unsupported array-like object')
}

function createArray(length) {
  return new Uint8Array(length)
}

function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
  if (sourceStart != null || sourceEnd != null) {
    if (sourceArray.slice) {
      sourceArray = sourceArray.slice(sourceStart, sourceEnd);
    } else {
      sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
    }
  }
  targetArray.set(sourceArray, targetStart);
}

var convertUtf8 = (function () {
  function toBytes(text) {
    var result = []; var i = 0;
    text = encodeURI(text);
    while (i < text.length) {
      var c = text.charCodeAt(i++);

      // if it is a % sign, encode the following 2 bytes as a hex value
      if (c === 37) {
        result.push(parseInt(text.substr(i, 2), 16));
        i += 2;

        // otherwise, just the actual byte
      } else {
        result.push(c);
      }
    }

    return coerceArray(result)
  }

  function fromBytes(bytes) {
    var result = []; var i = 0;

    while (i < bytes.length) {
      var c = bytes[i];

      if (c < 128) {
        result.push(String.fromCharCode(c));
        i++;
      } else if (c > 191 && c < 224) {
        result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
        i += 2;
      } else {
        result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
        i += 3;
      }
    }

    return result.join('')
  }

  return {
    toBytes: toBytes,
    fromBytes: fromBytes
  }
})();

var convertHex = (function () {
  function toBytes(text) {
    var result = [];
    for (var i = 0; i < text.length; i += 2) {
      result.push(parseInt(text.substr(i, 2), 16));
    }

    return result
  }

  // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
  var Hex = '0123456789abcdef';

  function fromBytes(bytes) {
    var result = [];
    for (var i = 0; i < bytes.length; i++) {
      var v = bytes[i];
      result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
    }
    return result.join('')
  }

  return {
    toBytes: toBytes,
    fromBytes: fromBytes
  }
})();

// Number of rounds by keysize
var numberOfRounds = { 16: 10, 24: 12, 32: 14 };

// Round constant words
var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

// S-box and Inverse S-box (S is for Substitution)
var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
var Si = [0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

// Transformations for encryption
var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

// Transformations for decryption
var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

// Transformations for decryption key expansion
var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

function convertToInt32(bytes) {
  var result = [];
  for (var i = 0; i < bytes.length; i += 4) {
    result.push(
      (bytes[i] << 24) |
      (bytes[i + 1] << 16) |
      (bytes[i + 2] << 8) |
      bytes[i + 3]
    );
  }
  return result
}

class AES {
  constructor(key) {
    if (!(this instanceof AES)) {
      throw Error('AES must be instanitated with `new`')
    }

    Object.defineProperty(this, 'key', {
      value: coerceArray(key, true)
    });

    this._prepare();
  }
  _prepare() {
    var rounds = numberOfRounds[this.key.length];
    if (rounds == null) {
      throw new Error('invalid key size (must be 16, 24 or 32 bytes)')
    }

    // encryption round keys
    this._Ke = [];

    // decryption round keys
    this._Kd = [];

    for (var i = 0; i <= rounds; i++) {
      this._Ke.push([0, 0, 0, 0]);
      this._Kd.push([0, 0, 0, 0]);
    }

    var roundKeyCount = (rounds + 1) * 4;
    var KC = this.key.length / 4;

    // convert the key into ints
    var tk = convertToInt32(this.key);

    // copy values into round key arrays
    var index;
    for (var i = 0; i < KC; i++) {
      index = i >> 2;
      this._Ke[index][i % 4] = tk[i];
      this._Kd[rounds - index][i % 4] = tk[i];
    }

    // key expansion (fips-197 section 5.2)
    var rconpointer = 0;
    var t = KC; var tt;
    while (t < roundKeyCount) {
      tt = tk[KC - 1];
      tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
        (S[(tt >> 8) & 0xFF] << 16) ^
        (S[tt & 0xFF] << 8) ^
        S[(tt >> 24) & 0xFF] ^
        (rcon[rconpointer] << 24));
      rconpointer += 1;

      // key expansion (for non-256 bit)
      if (KC != 8) {
        for (var i = 1; i < KC; i++) {
          tk[i] ^= tk[i - 1];
        }

        // key expansion for 256-bit keys is "slightly different" (fips-197)
      } else {
        for (var i = 1; i < (KC / 2); i++) {
          tk[i] ^= tk[i - 1];
        }
        tt = tk[(KC / 2) - 1];

        tk[KC / 2] ^= (S[tt & 0xFF] ^
          (S[(tt >> 8) & 0xFF] << 8) ^
          (S[(tt >> 16) & 0xFF] << 16) ^
          (S[(tt >> 24) & 0xFF] << 24));

        for (var i = (KC / 2) + 1; i < KC; i++) {
          tk[i] ^= tk[i - 1];
        }
      }

      // copy values into round key arrays
      var i = 0; var r; var c;
      while (i < KC && t < roundKeyCount) {
        r = t >> 2;
        c = t % 4;
        this._Ke[r][c] = tk[i];
        this._Kd[rounds - r][c] = tk[i++];
        t++;
      }
    }

    // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
    for (var r = 1; r < rounds; r++) {
      for (var c = 0; c < 4; c++) {
        tt = this._Kd[r][c];
        this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
          U2[(tt >> 16) & 0xFF] ^
          U3[(tt >> 8) & 0xFF] ^
          U4[tt & 0xFF]);
      }
    }
  }

  encrypt(plaintext) {
    if (plaintext.length != 16) {
      throw new Error('invalid plaintext size (must be 16 bytes)')
    }

    var rounds = this._Ke.length - 1;
    var a = [0, 0, 0, 0];

    // convert plaintext to (ints ^ key)
    var t = convertToInt32(plaintext);
    for (var i = 0; i < 4; i++) {
      t[i] ^= this._Ke[0][i];
    }

    // apply round transforms
    for (var r = 1; r < rounds; r++) {
      for (var i = 0; i < 4; i++) {
        a[i] = (T1[(t[i] >> 24) & 0xff] ^
          T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
          T3[(t[(i + 2) % 4] >> 8) & 0xff] ^
          T4[t[(i + 3) % 4] & 0xff] ^
          this._Ke[r][i]);
      }
      t = a.slice();
    }

    // the last round is special
    var result = createArray(16); var tt;
    for (var i = 0; i < 4; i++) {
      tt = this._Ke[rounds][i];
      result[4 * i] = (S[(t[i] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
      result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
      result[4 * i + 2] = (S[(t[(i + 2) % 4] >> 8) & 0xff] ^ (tt >> 8)) & 0xff;
      result[4 * i + 3] = (S[t[(i + 3) % 4] & 0xff] ^ tt) & 0xff;
    }

    return result
  }

  decrypt(ciphertext) {
    if (ciphertext.length != 16) {
      throw new Error('invalid ciphertext size (must be 16 bytes)')
    }

    var rounds = this._Kd.length - 1;
    var a = [0, 0, 0, 0];

    // convert plaintext to (ints ^ key)
    var t = convertToInt32(ciphertext);
    for (var i = 0; i < 4; i++) {
      t[i] ^= this._Kd[0][i];
    }

    // apply round transforms
    for (var r = 1; r < rounds; r++) {
      for (var i = 0; i < 4; i++) {
        a[i] = (T5[(t[i] >> 24) & 0xff] ^
          T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
          T7[(t[(i + 2) % 4] >> 8) & 0xff] ^
          T8[t[(i + 1) % 4] & 0xff] ^
          this._Kd[r][i]);
      }
      t = a.slice();
    }

    // the last round is special
    var result = createArray(16); var tt;
    for (var i = 0; i < 4; i++) {
      tt = this._Kd[rounds][i];
      result[4 * i] = (Si[(t[i] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
      result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
      result[4 * i + 2] = (Si[(t[(i + 2) % 4] >> 8) & 0xff] ^ (tt >> 8)) & 0xff;
      result[4 * i + 3] = (Si[t[(i + 1) % 4] & 0xff] ^ tt) & 0xff;
    }

    return result
  }
}



/**
 *  Mode Of Operation - Electonic Codebook (ECB)
 */
class ModeOfOperationECB {
  constructor(key) {
    if (!(this instanceof ModeOfOperationECB)) {
      throw Error('AES must be instanitated with `new`')
    }

    this.description = 'Electronic Code Block';
    this.name = 'ecb';

    this._aes = new AES(key);
  }
  encrypt(plaintext) {
    plaintext = coerceArray(plaintext);

    if ((plaintext.length % 16) !== 0) {
      throw new Error('invalid plaintext size (must be multiple of 16 bytes)')
    }

    var ciphertext = createArray(plaintext.length);
    var block = createArray(16);

    for (var i = 0; i < plaintext.length; i += 16) {
      copyArray(plaintext, block, 0, i, i + 16);
      block = this._aes.encrypt(block);
      copyArray(block, ciphertext, i);
    }

    return ciphertext
  }
  decrypt(ciphertext) {
    ciphertext = coerceArray(ciphertext);

    if ((ciphertext.length % 16) !== 0) {
      throw new Error('invalid ciphertext size (must be multiple of 16 bytes)')
    }

    var plaintext = createArray(ciphertext.length);
    var block = createArray(16);

    for (var i = 0; i < ciphertext.length; i += 16) {
      copyArray(ciphertext, block, 0, i, i + 16);
      block = this._aes.decrypt(block);
      copyArray(block, plaintext, i);
    }

    return plaintext
  }
}



/**
 *  Mode Of Operation - Cipher Block Chaining (CBC)
 */
class ModeOfOperationCBC {
  constructor(key, iv) {
    if (!(this instanceof ModeOfOperationCBC)) {
      throw Error('AES must be instanitated with `new`')
    }

    this.description = 'Cipher Block Chaining';
    this.name = 'cbc';

    if (!iv) {
      iv = createArray(16);
    } else if (iv.length != 16) {
      throw new Error('invalid initialation vector size (must be 16 bytes)')
    }

    this._lastCipherblock = coerceArray(iv, true);

    this._aes = new AES(key);
  }
  encrypt(plaintext) {
    plaintext = coerceArray(plaintext);

    if ((plaintext.length % 16) !== 0) {
      throw new Error('invalid plaintext size (must be multiple of 16 bytes)')
    }

    var ciphertext = createArray(plaintext.length);
    var block = createArray(16);

    for (var i = 0; i < plaintext.length; i += 16) {
      copyArray(plaintext, block, 0, i, i + 16);

      for (var j = 0; j < 16; j++) {
        block[j] ^= this._lastCipherblock[j];
      }

      this._lastCipherblock = this._aes.encrypt(block);
      copyArray(this._lastCipherblock, ciphertext, i);
    }

    return ciphertext
  }
  decrypt(ciphertext) {
    ciphertext = coerceArray(ciphertext);

    if ((ciphertext.length % 16) !== 0) {
      throw new Error('invalid ciphertext size (must be multiple of 16 bytes)')
    }

    var plaintext = createArray(ciphertext.length);
    var block = createArray(16);

    for (var i = 0; i < ciphertext.length; i += 16) {
      copyArray(ciphertext, block, 0, i, i + 16);
      block = this._aes.decrypt(block);

      for (var j = 0; j < 16; j++) {
        plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
      }

      copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
    }

    return plaintext
  }
}

/**
 *  Mode Of Operation - Cipher Feedback (CFB)
 */
class ModeOfOperationCFB {
  constructor(key, iv, segmentSize) {
    if (!(this instanceof ModeOfOperationCFB)) {
      throw Error('AES must be instanitated with `new`')
    }

    this.description = 'Cipher Feedback';
    this.name = 'cfb';

    if (!iv) {
      iv = createArray(16);
    } else if (iv.length != 16) {
      throw new Error('invalid initialation vector size (must be 16 size)')
    }

    if (!segmentSize) { segmentSize = 1; }

    this.segmentSize = segmentSize;

    this._shiftRegister = coerceArray(iv, true);

    this._aes = new AES(key);
  }
  encrypt(plaintext) {
    if ((plaintext.length % this.segmentSize) != 0) {
      throw new Error('invalid plaintext size (must be segmentSize bytes)')
    }

    var encrypted = coerceArray(plaintext, true);

    var xorSegment;
    for (var i = 0; i < encrypted.length; i += this.segmentSize) {
      xorSegment = this._aes.encrypt(this._shiftRegister);
      for (var j = 0; j < this.segmentSize; j++) {
        encrypted[i + j] ^= xorSegment[j];
      }

      // Shift the register
      copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
      copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
    }

    return encrypted
  }
  decrypt(ciphertext) {
    if ((ciphertext.length % this.segmentSize) != 0) {
      throw new Error('invalid ciphertext size (must be segmentSize bytes)')
    }

    var plaintext = coerceArray(ciphertext, true);

    var xorSegment;
    for (var i = 0; i < plaintext.length; i += this.segmentSize) {
      xorSegment = this._aes.encrypt(this._shiftRegister);

      for (var j = 0; j < this.segmentSize; j++) {
        plaintext[i + j] ^= xorSegment[j];
      }

      // Shift the register
      copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
      copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
    }

    return plaintext
  }
}

/**
 *  Mode Of Operation - Output Feedback (OFB)
 */
class ModeOfOperationOFB {
  constructor(key, iv) {
    if (!(this instanceof ModeOfOperationOFB)) {
      throw Error('AES must be instanitated with `new`')
    }

    this.description = 'Output Feedback';
    this.name = 'ofb';

    if (!iv) {
      iv = createArray(16);
    } else if (iv.length != 16) {
      throw new Error('invalid initialation vector size (must be 16 bytes)')
    }

    this._lastPrecipher = coerceArray(iv, true);
    this._lastPrecipherIndex = 16;

    this._aes = new AES(key);
  }
  encrypt(plaintext) {
    var encrypted = coerceArray(plaintext, true);

    for (var i = 0; i < encrypted.length; i++) {
      if (this._lastPrecipherIndex === 16) {
        this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
        this._lastPrecipherIndex = 0;
      }
      encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
    }

    return encrypted
  }
  // Decryption is symetric
  decrypt(plaintext) {
    return this.encrypt(plaintext)
  }
}


/**
 *  Counter object for CTR common mode of operation
 */
class Counter {
  constructor(initialValue) {
    if (!(this instanceof Counter)) {
      throw Error('Counter must be instanitated with `new`')
    }

    // We allow 0, but anything false-ish uses the default 1
    if (initialValue !== 0 && !initialValue) { initialValue = 1; }

    if (typeof (initialValue) === 'number') {
      this._counter = createArray(16);
      this.setValue(initialValue);
    } else {
      this.setBytes(initialValue);
    }
  }
  setValue(value) {
    if (typeof (value) !== 'number' || parseInt(value) != value) {
      throw new Error('invalid counter value (must be an integer)')
    }

    // We cannot safely handle numbers beyond the safe range for integers
    if (value > Number.MAX_SAFE_INTEGER) {
      throw new Error('integer value out of safe range')
    }

    for (var index = 15; index >= 0; --index) {
      this._counter[index] = value % 256;
      value = parseInt(value / 256);
    }
  }
  setBytes(bytes) {
    bytes = coerceArray(bytes, true);

    if (bytes.length != 16) {
      throw new Error('invalid counter bytes size (must be 16 bytes)')
    }

    this._counter = bytes;
  }
  increment() {
    for (var i = 15; i >= 0; i--) {
      if (this._counter[i] === 255) {
        this._counter[i] = 0;
      } else {
        this._counter[i]++;
        break
      }
    }
  }
}

/**
 *  Mode Of Operation - Counter (CTR)
 */
class ModeOfOperationCTR {
  constructor(key, counter) {
    if (!(this instanceof ModeOfOperationCTR)) {
      throw Error('AES must be instanitated with `new`')
    }

    this.description = 'Counter';
    this.name = 'ctr';

    if (!(counter instanceof Counter)) {
      counter = new Counter(counter);
    }

    this._counter = counter;

    this._remainingCounter = null;
    this._remainingCounterIndex = 16;

    this._aes = new AES(key);
  }
  encrypt(plaintext) {
    var encrypted = coerceArray(plaintext, true);
    for (var i = 0; i < encrypted.length; i++) {
      if (this._remainingCounterIndex === 16) {
        this._remainingCounter = this._aes.encrypt(this._counter._counter);
        this._remainingCounterIndex = 0;
        this._counter.increment();
      }
      encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
    }

    return encrypted
  }
  // Decryption is symetric
  decrypt(plaintext) {
    return this.encrypt(plaintext)
  }
}

/// ////////////////////
// Padding

// See:https://tools.ietf.org/html/rfc2315
function pkcs7pad(data) {
  data = coerceArray(data, true);
  var padder = 16 - (data.length % 16);
  var result = createArray(data.length + padder);
  copyArray(data, result);
  for (var i = data.length; i < result.length; i++) {
    result[i] = padder;
  }
  return result
}

function pkcs7strip(data) {
  data = coerceArray(data, true);
  if (data.length < 16) { throw new Error('PKCS#7 invalid length') }

  var padder = data[data.length - 1];
  if (padder > 16) { throw new Error('PKCS#7 padding byte out of range') }

  var length = data.length - padder;
  for (var i = 0; i < padder; i++) {
    if (data[length + i] !== padder) {
      throw new Error('PKCS#7 invalid padding byte')
    }
  }

  var result = createArray(length);
  copyArray(data, result, 0, 0, length);
  return result
}

/// ////////////////////
// Exporting

// The block cipher
var aesjs = {
  AES: AES,
  Counter: Counter,

  ModeOfOperation: {
    ecb: ModeOfOperationECB,
    cbc: ModeOfOperationCBC,
    cfb: ModeOfOperationCFB,
    ofb: ModeOfOperationOFB,
    ctr: ModeOfOperationCTR
  },

  utils: {
    hex: convertHex,
    utf8: convertUtf8
  },

  padding: {
    pkcs7: {
      pad: pkcs7pad,
      strip: pkcs7strip
    }
  },

  _arrayTest: {
    coerceArray: coerceArray,
    createArray: createArray,
    copyArray: copyArray
  }
};

var aesjs$1 = aesjs;

// 先按照微信的实现 key为base64 iv为字符串，这个设计有点莫名其妙
function encrypt (text, encryptKey, iv) {
  const keyBuffer = new Uint8Array(uni.base64ToArrayBuffer(encryptKey));
  const ivBuffer = aesjs$1.utils.utf8.toBytes(iv);
  const textBytes = aesjs$1.utils.utf8.toBytes(text);
  // eslint-disable-next-line new-cap
  const aesCbc = new aesjs$1.ModeOfOperation.cbc(keyBuffer, ivBuffer);
  const textBytesPadding = aesjs$1.padding.pkcs7.pad(textBytes);
  const encryptedBytes = aesCbc.encrypt(textBytesPadding);
  const encryptedBase64 = uni.arrayBufferToBase64(encryptedBytes);
  return encryptedBase64
}

function decrypt (base64, encryptKey, iv) {
  const encryptedBytes = new Uint8Array(
    uni.base64ToArrayBuffer(base64)
  );
  const keyBuffer = new Uint8Array(uni.base64ToArrayBuffer(encryptKey));
  const ivBuffer = aesjs$1.utils.utf8.toBytes(iv);
  // eslint-disable-next-line new-cap
  const aesCbc = new aesjs$1.ModeOfOperation.cbc(keyBuffer, ivBuffer);
  const decryptedBytes = aesjs$1.padding.pkcs7.strip(
    aesCbc.decrypt(encryptedBytes)
  );
  const decryptedText = aesjs$1.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText
}

const moduleName = 'uni-secure-network';

const ERROR = {
  SYSTEM_ERROR: {
    code: 20000,
    message: 'System error'
  },
  APP_INFO_INVALID: {
    code: 20101,
    message: 'Invalid client'
  },
  GET_ENCRYPT_KEY_FAILED: {
    code: 20102,
    message: 'Get encrypt key failed'
  }
};

const plusErrorMap = {
  10001: 'Secure network is not supported on current playground or unimpsdk',
  10003: 'Config missing in current app. If the problem pesist, please contact DCloud.',
  10009: 'Encrypt payload failed',
  10010: 'Decrypt response failed'
};

function createCloudError (result) {
  return new UniCloudError({
    subject: result.errSubject || moduleName,
    code: result.errCode || result.code || ERROR.SYSTEM_ERROR.code,
    message: result.errMsg || result.message
  })
}

function createClientError (options) {
  const {
    errSubject,
    subject,
    errCode,
    errMsg,
    code,
    message,
    cause
  } = options || {};
  return new UniCloudError({
    subject: errSubject || subject || moduleName,
    code: errCode || code || ERROR.SYSTEM_ERROR.code,
    message: errMsg || message,
    cause
  })
}

let cacheUserEncryptKey = null;
class MpWeixinCryptoManager extends Base {
  constructor (options) {
    super(options);
    this.clientType = 'mp-weixin';
    this.userEncryptKey = null;
  }

  isLogin () {
    return !!this.scopedGlobalCache.mpWeixinCode || !!this.scopedGlobalCache.mpWeixinOpenid
  }

  async prepare () {
    if (this.isLogin()) {
      return
    }
    if (!this.scopedGlobalCache.initPromise) {
      throw new Error('`uniCloud.initSecureNetworkByWeixin` has not yet been called')
    }
    await this.scopedGlobalCache.initPromise;
    if (!this.isLogin()) {
      throw new Error('uniCloud.initSecureNetworkByWeixin` has not yet been called or successfully excuted')
    }
  }

  async getUserEncryptKey () {
    // 内部缓存生效，云端会使用同样的key加密结果，必须有一份内部缓存防止请求时key有效，相应时key失效的情况
    if (this.userEncryptKey) {
      return this.userEncryptKey
    }

    // 全局缓存生效
    if (cacheUserEncryptKey && cacheUserEncryptKey.expireTime) {
      const currentTime = Date.now();
      if (cacheUserEncryptKey.expireTime - currentTime > 0) {
        this.userEncryptKey = cacheUserEncryptKey;
        return this.userEncryptKey
      }
    }

    // 从微信获取
    return new Promise((resolve, reject) => {
      const userCryptoManager = uni.getUserCryptoManager();
      userCryptoManager.getLatestUserKey({
        success: (res) => { // { encryptKey, iv, version, expireTime }
          cacheUserEncryptKey = res;
          this.userEncryptKey = res;
          resolve(this.userEncryptKey);
        },
        fail: (err) => {
          reject(
            createClientError({
              ...ERROR.GET_ENCRYPT_KEY_FAILED,
              cause: err
            })
          );
        }
      });
    })
  }

  getWxAppId () {
    const accountInfo = wx.getAccountInfoSync();
    return accountInfo.miniProgram.appId
  }

  async platformGetSignOption () {
    const {
      encryptKey,
      iv,
      version
    } = await this.getUserEncryptKey();
    return {
      verifyClientSign: encrypt(
        JSON.stringify({
          data: JSON.stringify({}),
          appId: this.appId,
          deviceId: this.deviceId,
          wxAppId: this.getWxAppId(),
          simulator: getSystemInfo().platform === 'devtools',
          timestamp: Date.now()
        }),
        encryptKey,
        iv
      ),
      encryptKeyId: version,
      mpWeixinCode: this.scopedGlobalCache.mpWeixinCode,
      mpWeixinOpenid: this.scopedGlobalCache.mpWeixinOpenid
    }
  }

  async platformEncryptData (data) {
    const {
      encryptKey,
      iv,
      version
    } = await this.getUserEncryptKey();
    const uniCloudOptions = {
      secretType: this.secretType,
      encryptKeyId: version,
      mpWeixinCode: this.scopedGlobalCache.mpWeixinCode,
      mpWeixinOpenid: this.scopedGlobalCache.mpWeixinOpenid
    };
    if (this.secretType === SECRET_TYPE.RESPONSE) {
      return {
        content: data,
        _uniCloudOptions: uniCloudOptions
      }
    }
    return {
      content: encrypt(
        JSON.stringify({
          data: JSON.stringify(data),
          appId: this.appId,
          deviceId: this.deviceId,
          wxAppId: this.getWxAppId(),
          simulator: getSystemInfo().platform === 'devtools',
          timestamp: Date.now()
        }),
        encryptKey,
        iv
      ),
      _uniCloudOptions: uniCloudOptions
    }
  }

  async platformDecryptResult (result) {
    const {
      content
    } = result;
    const {
      encryptKey,
      iv
    } = await this.getUserEncryptKey();
    return JSON.parse(
      decrypt(content, encryptKey, iv)
    )
  }

  isClientKeyNotFound () {
    return false
  }
}

function promisifyPlusModule (plusModule) {
  const functionList = ['hasClientKey', 'encryptGetClientKeyPayload', 'setClientKey', 'encrypt', 'decrypt'];
  const result = {};
  for (let i = 0; i < functionList.length; i++) {
    const functionName = functionList[i];
    result[functionName] = function (...args) {
      // console.log('-=-=-=-=-=-=-=-=-app-utils-start')
      // console.log('functionName: ' + functionName)
      // console.log('arguments: ' + JSON.stringify(args))
      // console.log('-=-=-=-=-=-=-=-=-app-utils-end')
      return new Promise((resolve, reject) => {
        if (typeof plusModule[functionName] !== 'function') {
          reject(
            createClientError({
              message: '请检查manifest.json内是否开启安全网络模块，另外注意标准基座不支持安全网络模块'
            })
          );
          return
        }
        plusModule[functionName](...args, function ({
          type,
          data,
          errCode,
          errMsg,
          errSubject,
          message
        } = {}) {
          if (type === 'success') {
            resolve(data);
          } else {
            reject(
              createClientError({
                errCode,
                errMsg: plusErrorMap[errCode] || errMsg || message,
                errSubject
              })
            );
          }
        });
      })
    };
  }
  return result
}

function getAppUtils () {
  const plusModule = uni.requireNativePlugin('plus');
  return {
    ...promisifyPlusModule(plusModule)
  }
}

// interface PublicEncryptData {
//   appId: string,  // DCloud AppId
//   deviceId: string,  // 设备id
//   bundleId?: string, // iOS bundle id
//   packageName?: string,  // 安卓包名
//   fingerprintSHA1?: string, // 安卓证书SHA1指纹
//   rootDevice: boolean, // 是否为root设备
//   simulator: boolean, // 是否为模拟器
//   timestamp: number   // 单位为毫秒的时间戳
// }

// /**
//  * 加密网络请求时加密数据结构
//  */
// interface CallFunctionData extends PublicEncryptData {
//   data: string // 原始数据
// }

// /**
//  * 获取clientKey时加密的数据
//  */
// interface GetClientKeyData extends PublicEncryptData {
//   data: string // 原始数据
// }

let systemInfo;
class AppCryptoManager extends Base {
  constructor (options) {
    super(options);
    this.clientType = 'app';
    this.appUtils = getAppUtils();
    if (systemInfo) {
      this.systemInfo = systemInfo;
    } else {
      this.systemInfo = systemInfo = getSystemInfo();
    }
  }

  async hasClientKey () {
    this._hasClientKey = await this.appUtils.hasClientKey({
      provider: this.provider,
      spaceId: this.spaceId
    });
    return this._hasClientKey
  }

  async getAppClientKey () {
    const {
      data: encryptedData, // 解密后的格式为 interface GetClientKeyData
      key: requestKey
    } = await this.appUtils.encryptGetClientKeyPayload({
      data: JSON.stringify({})
    });
    const res = await this.uniCloudIns.callFunction({
      name: 'DCloud-clientDB',
      data: {
        redirectTo: 'encryption',
        action: 'getAppClientKey',
        data: encryptedData,
        key: requestKey
      }
    });
    const result = res.result || {};
    if (result.errCode !== 0) {
      throw createCloudError(result)
    }
    const {
      clientKey,
      key: responseKey
    } = result;
    await this.appUtils.setClientKey({
      provider: this.provider,
      spaceId: this.spaceId,
      clientKey,
      key: responseKey
    });
  }

  async ensureClientKey ({
    forceUpdate = false
  } = {}) {
    const hasClientKey = await this.hasClientKey();
    if (hasClientKey === true && !forceUpdate) {
      return
    }
    if (
      forceUpdate &&
      this.scopedGlobalCache.initPromise &&
      this.scopedGlobalCache.initStatus === PROMISE_STATUS.PENDING
    ) {
      return this.scopedGlobalCache.initPromise
    } else if (
      !forceUpdate &&
      this.scopedGlobalCache.initPromise &&
      this.scopedGlobalCache.initStatus !== PROMISE_STATUS.REJECTED
    ) {
      return this.scopedGlobalCache.initPromise
    }
    this.scopedGlobalCache.initPromise = this.getAppClientKey();
    this.scopedGlobalCache.initPromise.then((res) => {
      this.scopedGlobalCache.initStatus = PROMISE_STATUS.FULFILLED;
    }).catch((e) => {
      this.scopedGlobalCache.initStatus = PROMISE_STATUS.REJECTED;
      throw e
    });
    this.scopedGlobalCache.initStatus = PROMISE_STATUS.PENDING;
    return this.scopedGlobalCache.initPromise
  }

  async prepare ({
    forceUpdate = false
  } = {}) {
    await this.ensureClientKey({
      forceUpdate
    });
  }

  async platformGetSignOption () {
    const {
      data: encryptedData,
      key
    } = await this.appUtils.encrypt({
      provider: this.provider,
      spaceId: this.spaceId,
      data: JSON.stringify({})
    });
    return {
      verifyClientSign: encryptedData,
      encryptKeyId: key
    }
  }

  async platformEncryptData (data) {
    const {
      data: encryptedData,
      key
    } = await this.appUtils.encrypt({
      provider: this.provider,
      spaceId: this.spaceId,
      data: JSON.stringify(data)
    });
    const uniCloudOptions = {
      secretType: this.secretType,
      encryptKeyId: key
    };
    if (this.secretType === SECRET_TYPE.RESPONSE) {
      // 暂时这样处理，和其他操作保持逻辑一致，可以优化为secretType response时由云端生成key
      return {
        content: data,
        _uniCloudOptions: uniCloudOptions
      }
    }
    return {
      content: encryptedData, // 解密后格式为 interface CallFunctionData
      _uniCloudOptions: uniCloudOptions
    }
  }

  async platformDecryptResult (result) {
    const {
      content,
      _uniCloudOptions: uniCloudOptions = {}
    } = result;
    const key = uniCloudOptions.encryptKeyId;
    const decryptRes = await this.appUtils.decrypt({
      provider: this.provider,
      spaceId: this.spaceId,
      data: content,
      key
    });
    return JSON.parse(
      decryptRes.data
    )
  }

  isClientKeyNotFound (response = {}) {
    const result = response.result || {};
    return result.errCode === 70009 && result.errSubject === moduleName
  }
}

let CryptoManager;

if (UNI_PLATFORM_FIXED !== 'mp-weixin' && UNI_PLATFORM_FIXED !== 'app') {
  CryptoManager = class {
    constructor () {
      throw createClientError({
        message: `Platform ${UNI_PLATFORM_FIXED} is not supported by secure network`
      })
    }
  };
} else if (!UNI_SECURE_NETWORK_ENABLE) {
  CryptoManager = class {
    constructor () {
      throw createClientError({
        message: `Platform ${UNI_PLATFORM_FIXED} is not enabled, please check whether secure network module is enabled in your manifest.json`
      })
    }
  };
} else if (UNI_PLATFORM_FIXED === 'mp-weixin') {
  CryptoManager = MpWeixinCryptoManager;
} else {
  CryptoManager = AppCryptoManager;
}

// 不支持的平台直接报错，让用户手写条件编译。防止后续支持新平台时用户代码无法正常运行
// const supportedPlatform = []

function isEncryptionEnable ({
  secretType
} = {}) {
  return (secretType === SECRET_TYPE.REQUEST ||
    secretType === SECRET_TYPE.RESPONSE ||
    secretType === SECRET_TYPE.BOTH)
}

function isGetAppClientKeyRequest ({
  name,
  data = {}
} = {}) {
  return UNI_PLATFORM_FIXED === 'app' && name === 'DCloud-clientDB' && data.redirectTo === 'encryption' && data.action === 'getAppClientKey'
}

function isMpWeixinHandShake ({
  name,
  data = {}
}) {
  return UNI_PLATFORM_FIXED === 'mp-weixin' && name === 'uni-id-co' && data.method === 'secureNetworkHandshakeByWeixin'
}

function getSecureNetworkConfig ({
  provider,
  spaceId
} = {}) {
  const config = UNI_SECURE_NETWORK_CONFIG;
  if (!config) {
    return {}
  }
  provider = getInternalProvider(provider);
  const configItem = config.find(item => {
    return item.provider === provider && item.spaceId === spaceId
  });
  return configItem && configItem.config
}

function findMatchedConfigKey (configKeys, functionName) {
  let exactMatchedKey, multiFunctionKey, wildcardKey;
  for (let i = 0; i < configKeys.length; i++) {
    const configKeyItem = configKeys[i];
    if (configKeyItem === functionName) {
      exactMatchedKey = configKeyItem;
      continue
    }
    if (configKeyItem === '*') {
      wildcardKey = configKeyItem;
      continue
    }
    const functionsInKey = configKeyItem.split(',').map(item => item.trim());
    if (functionsInKey.indexOf(functionName) > -1) {
      multiFunctionKey = configKeyItem;
    }
  }
  return exactMatchedKey || multiFunctionKey || wildcardKey
}

function isNeedVerifyClient ({
  provider,
  spaceId,
  functionName
} = {}) {
  const {
    appId,
    uniPlatform,
    osName
  } = getSystemInfo();
  let platform = uniPlatform;
  if (uniPlatform === 'app') {
    platform = osName;
  }
  const secureNetworkConfig = getSecureNetworkConfig({
    provider,
    spaceId
  });
  if (!secureNetworkConfig || !secureNetworkConfig.accessControl || !secureNetworkConfig.accessControl.enable) {
    return false
  }
  const functionConfig = secureNetworkConfig.accessControl.function || {};
  const configKeys = Object.keys(functionConfig);
  if (configKeys.length === 0) {
    return true
  }
  const matchedConfigKey = findMatchedConfigKey(configKeys, functionName);
  if (!matchedConfigKey) {
    return false
  }
  const appList = functionConfig[matchedConfigKey] || [];
  const matchedApp = appList.find((item = {}) => {
    return item.appId === appId && (item.platform || '').toLowerCase() === platform.toLowerCase()
  });

  /**
   * 不在应用列表内直接禁止访问
   */
  if (matchedApp) {
    return true
  }
  console.error(`此应用[appId: ${appId}, platform: ${platform}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`);
  throw createClientError(ERROR.APP_INFO_INVALID)
}

function logForHBuilderX ({
  functionName,
  result,
  logPvd
}) {
  if (IS_DEV && this.__dev__.debugLog && result && result.requestId) {
    const log = JSON.stringify({
      spaceId: this.config.spaceId,
      functionName,
      requestId: result.requestId
    });
    console.log(`[${logPvd}-request]${log}[/${logPvd}-request]`);
  }
}

function initCallFunction (uniClient) {
  const oldCallFunction = uniClient.callFunction;

  const callCloudFunction = function (options) {
    const functionName = options.name;
    options.data = getRealFunctionData.call(uniClient, {
      data: options.data
    });
    const pvdList = {
      aliyun: 'aliyun',
      tencent: 'tcb',
      tcb: 'tcb',
      alipay: 'alipay'
    };
    const logPvd = pvdList[this.config.provider];

    const isEncryption = isEncryptionEnable(options);
    const isGetAppClientKey = isGetAppClientKeyRequest(options);
    const ignoreCloudLog = isEncryption || isGetAppClientKey;

    return oldCallFunction.call(this, options).then((res) => {
      res.errCode = 0;
      !ignoreCloudLog && logForHBuilderX.call(this, {
        functionName,
        result: res,
        logPvd
      });
      return Promise.resolve(res)
    }, (err) => {
      !ignoreCloudLog && logForHBuilderX.call(this, {
        functionName,
        result: err,
        logPvd
      });
      if (err && err.message) {
        err.message = formatMessage({
          message: `[${options.name}]: ${err.message}`,
          formatter: ErrorFormatter,
          extraInfo: {
            functionName
          }
        });
      }
      return Promise.reject(err)
    })
  };

  uniClient.callFunction = function (options) {
    const {
      provider,
      spaceId
    } = uniClient.config;
    const functionName = options.name;
    options.data = options.data || {};
    let realCallFunction;
    if (IS_DEV && uniClient.__dev__.debugInfo && !uniClient.__dev__.debugInfo.forceRemote && UNI_CLOUD_PROVIDER) {
      if (!uniClient._callCloudFunction) {
        uniClient._callCloudFunction = callCloudFunction;
        uniClient._callLocalFunction = callFunction;
      }
      realCallFunction = callFunction;
    } else {
      realCallFunction = callCloudFunction;
    }
    realCallFunction = realCallFunction.bind(uniClient);
    let callFunctionPromise;
    if (isGetAppClientKeyRequest(options)) {
      // 客户端获取clientKey请求
      callFunctionPromise = callCloudFunction.call(uniClient, options);
    } else if (isMpWeixinHandShake(options)) {
      // 微信安全网络握手
      callFunctionPromise = realCallFunction.call(uniClient, options);
    } else if (isEncryptionEnable(options)) {
      // 加密请求
      const cryptoManager = new CryptoManager({
        secretType: options.secretType,
        uniCloudIns: uniClient
      });
      callFunctionPromise = cryptoManager.wrapEncryptDataCallFunction(
        callCloudFunction.bind(uniClient)
      )(options);
    } else if (
      isNeedVerifyClient({
        provider,
        spaceId,
        functionName
      })
    ) {
      // 客户端验真请求
      const cryptoManager = new CryptoManager({
        secretType: options.secretType,
        uniCloudIns: uniClient
      });
      callFunctionPromise = cryptoManager.wrapVerifyClientCallFunction(
        callCloudFunction.bind(uniClient)
      )(options);
    } else {
      // 普通请求
      callFunctionPromise = realCallFunction(options);
    }
    Object.defineProperty(callFunctionPromise, 'result', {
      get () {
        console.warn('当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise');
        return {}
      }
    });
    return callFunctionPromise
  };
}

function initUploadFile (uniClient) {
  const oldUploadFile = uniClient.uploadFile;

  uniClient.uploadFile = function (options) {
    return oldUploadFile.call(this, options)
  };
}

const SYMBOL_CLIENT_DB_INTERNAL = Symbol('CLIENT_DB_INTERNAL');

// handler内先只实现get
function getSafeProxy (target, handler) {
  target.then = 'DoNotReturnProxyWithAFunctionNamedThen';
  target._internalType = SYMBOL_CLIENT_DB_INTERNAL;
  target.inspect = null; // maximum call stack exceed caused by util.inspect in nodejs8 runtime
  {
    target.__v_raw = undefined; // for vue3
  }
  return new Proxy(target, {
    get (target, key, rec) {
      if (key === '_uniClient') {
        // database 和 uniClient 存在循环依赖，在小程序端不能正确处理，暂时写死在处
        return null
      }
      if (typeof key === 'symbol') {
        return target[key]
      }
      if (key in target || typeof key !== 'string') {
        const value = target[key];
        if (typeof value === 'function') {
          return value.bind(target)
        }
        return value
      }
      return handler.get(target, key, rec)
    }
  })
}

function initCallBackEvent (callbackObj) {
  return {
    on: (event, callback) => {
      callbackObj[event] = callbackObj[event] || [];
      if (callbackObj[event].indexOf(callback) > -1) {
        return
      }
      callbackObj[event].push(callback);
    },
    off: (event, callback) => {
      callbackObj[event] = callbackObj[event] || [];
      const index = callbackObj[event].indexOf(callback);
      if (index === -1) {
        return
      }
      callbackObj[event].splice(index, 1);
    }
  }
}

const propList = ['db.Geo', 'db.command', 'command.aggregate'];
function isProp (prev, key) {
  return propList.indexOf(`${prev}.${key}`) > -1
}

function parse (param) {
  {
    param = toRaw(param);
  }
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

function getMethodName (stage) {
  return stage && stage.content && stage.content.$method
}
class Stage {
  constructor (content, prevStage, database) {
    this.content = content;
    this.prevStage = prevStage || null;
    this.udb = null;
    this._database = database;
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
          $param: parse(item.$param)
        }
      })
    }
  }

  toString () {
    return JSON.stringify(this.toJSON())
  }

  getAction () {
    const actionMethod = this.toJSON().$db.find(item => item.$method === 'action');
    return actionMethod && actionMethod.$param && actionMethod.$param[0]
  }

  getCommand () {
    return {
      $db: this.toJSON().$db.filter(item => item.$method !== 'action')
    }
  }

  get isAggregate () {
    let tempStage = this;
    while (tempStage) {
      const methodName = getMethodName(tempStage);
      const prevMethodName = getMethodName(tempStage.prevStage);
      if (
        (methodName === 'aggregate' && prevMethodName === 'collection') ||
        methodName === 'pipeline'
      ) {
        return true
      }
      tempStage = tempStage.prevStage;
    }
    return false
  }

  get isCommand () {
    let tempStage = this;
    while (tempStage) {
      const methodName = getMethodName(tempStage);
      if (methodName === 'command') {
        return true
      }
      tempStage = tempStage.prevStage;
    }
    return false
  }

  get isAggregateCommand () {
    let tempStage = this;
    while (tempStage) {
      const methodName = getMethodName(tempStage);
      const prevMethodName = getMethodName(tempStage.prevStage);
      if (methodName === 'aggregate' && prevMethodName === 'command') {
        return true
      }
      tempStage = tempStage.prevStage;
    }
    return false
  }

  getNextStageFn (currentMethod) {
    const that = this;
    return function () {
      // 此方法会在
      return getDBStage(
        {
          $method: currentMethod,
          $param: parse(Array.from(arguments))
        },
        that,
        that._database
      )
    }
  }

  // 聚合count特殊处理
  get count () {
    if (!this.isAggregate) {
      return function () {
        return this._send('count', Array.from(arguments))
      }
    }
    return this.getNextStageFn('count')
  }

  get remove () {
    if (!this.isCommand) {
      return function () {
        return this._send('remove', Array.from(arguments))
      }
    }
    return this.getNextStageFn('remove')
  }

  get () {
    return this._send('get', Array.from(arguments))
  }

  get add () {
    if (!this.isCommand) {
      return function () {
        return this._send('add', Array.from(arguments))
      }
    }
    return this.getNextStageFn('add')
  }

  update () {
    return this._send('update', Array.from(arguments))
  }

  end () {
    return this._send('end', Array.from(arguments))
  }

  get set () {
    if (!this.isCommand) {
      return function () {
        throw new Error('JQL禁止使用set方法')
      }
    }
    return this.getNextStageFn('set')
  }

  _send (method, param) {
    const action = this.getAction();
    const command = this.getCommand();
    command.$db.push({
      $method: method,
      $param: parse(param)
    });
    if (IS_DEV) {
      const collectionStage = command.$db.find(item => item.$method === 'collection');
      const collectionParam = collectionStage && collectionStage.$param;
      if (collectionParam && collectionParam.length === 1 && typeof collectionStage.$param[0] === 'string' && collectionStage.$param[0].indexOf(',') > -1) {
        console.warn('检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。');
      }
    }
    return this._database._callCloudFunction({
      action,
      command
    })
  }
}

function getDBStage (content, prevStage, database) {
  const stage = new Stage(content, prevStage, database);
  return getSafeProxy(stage, {
    get (stage, key) {
      let prevMethod = 'db';
      if (stage && stage.content) {
        prevMethod = stage.content.$method;
      }
      if (isProp(prevMethod, key)) {
        return getDBStage({
          $method: key
        }, stage, database)
      }
      return function () {
        return getDBStage({
          $method: key,
          $param: parse(Array.from(arguments))
        }, stage, database)
      }
    }
  })
}

function getDBClass ({
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
          }
        ]
      }
    }

    toString () {
      return JSON.stringify(this.toJSON())
    }
  }
}

class Database {
  constructor ({
    uniClient = {},
    isJQL = false
  } = {}) {
    this._uniClient = uniClient;
    this._authCallBacks = {};
    this._dbCallBacks = {};
    if (uniClient._isDefault) {
      this._dbCallBacks = getGlobalObj(GLOBAL_DB_CALLBACK_KEY);
    }
    if (!isJQL) {
      this.auth = initCallBackEvent(this._authCallBacks);
    }
    this._isJQL = isJQL;
    Object.assign(this, initCallBackEvent(this._dbCallBacks));

    this.env = getSafeProxy({}, {
      get (env, prop) {
        return {
          $env: prop
        }
      }
    });

    this.Geo = getSafeProxy({}, {
      get (Geo, key) {
        return getDBClass({
          path: ['Geo'],
          method: key
        })
      }
    });

    this.serverDate = getDBClass({
      path: [],
      method: 'serverDate'
    });

    this.RegExp = getDBClass({
      path: [],
      method: 'RegExp'
    });
  }

  getCloudEnv (envStr) {
    if (typeof envStr !== 'string' || !envStr.trim()) {
      throw new Error('getCloudEnv参数错误')
    }
    return {
      $env: envStr.replace('$cloudEnv_', '')
    }
  }

  _callback (event, args) {
    const dbCallBacks = this._dbCallBacks;
    dbCallBacks[event] && dbCallBacks[event].forEach(func => {
      func(...args);
    });
  }

  _callbackAuth (event, args) {
    const authCallBacks = this._authCallBacks;
    authCallBacks[event] && authCallBacks[event].forEach(func => {
      func(...args);
    });
  }

  multiSend () {
    const queryList = Array.from(arguments);
    const multiCommand = queryList.map(item => {
      const action = item.getAction();
      const command = item.getCommand();
      if (command.$db[command.$db.length - 1].$method !== 'getTemp') {
        throw new Error('multiSend只支持子命令内使用getTemp')
      }
      return {
        action,
        command
      }
    });
    return this._callCloudFunction({
      multiCommand,
      queryList
    })
  }
}

function getDBInstance (DBClass, args = {}) {
  return getSafeProxy(new DBClass(args), {
    get (db, key) {
      if (isProp('db', key)) {
        return getDBStage({
          $method: key
        }, null, db)
      }
      return function () {
        return getDBStage({
          $method: key,
          $param: parse(Array.from(arguments))
        }, null, db)
      }
    }
  })
}

class ClientDatabase extends Database {
  _parseResult (res) {
    if (this._isJQL) {
      return res.result
    }
    return res
  }

  _callCloudFunction ({
    action,
    command,
    multiCommand,
    queryList
  }) {
    function setResult (res, error) {
      if (multiCommand && queryList) {
        for (let i = 0; i < queryList.length; i++) {
          const query = queryList[i];
          if (query.udb && typeof query.udb.setResult === 'function') {
            error ? query.udb.setResult(error) : query.udb.setResult(res.result.dataList[i]);
          }
        }
      }
    }

    const _this = this;
    const interceptorName = this._isJQL ? 'databaseForJQL' : 'database';
    function success (res) {
      return queueHooks(getInterceptor(interceptorName, 'success'), res).then(() => {
        return queueHooks(getInterceptor(interceptorName, 'complete'), res)
      }).then(() => {
        setResult(res, null);
        const result = _this._parseResult(res);
        triggerEvent(EVENT_NAME.RESPONSE, {
          type: EVENT_TYPE.CLIENT_DB,
          content: result
        });
        return Promise.resolve(result)
      })
    }

    function fail (error) {
      _this._callback('error', [error]);
      return queueHooks(getInterceptor(interceptorName, 'fail'), error).then(() => {
        return queueHooks(getInterceptor(interceptorName, 'complete'), error)
      }).then(() => {
        setResult(null, error);
        triggerEvent(EVENT_NAME.RESPONSE, {
          type: EVENT_TYPE.CLIENT_DB,
          content: error
        });
        return Promise.reject(error)
      })
    }

    const invokePromise = queueHooks(getInterceptor(interceptorName, 'invoke'));
    const uniClient = this._uniClient;
    return invokePromise.then(() => {
      return uniClient.callFunction({
        name: CLIENT_DB_FUNCTION_NAME,
        type: CALLFUNCTION_TYPE.CLIENT_DB,
        data: {
          action,
          command,
          multiCommand
        }
      })
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
          const realLevel = UNI_PLATFORM_FIXED === 'app' && level === 'warn' ? 'error' : level;
          const log = console[realLevel] || console.log;
          let logMsg = '[System Info]' + message;
          if (detail) {
            logMsg = `${logMsg}\n详细信息：${detail}`;
          }
          log(logMsg);
        }
      }
      if (code) {
        const error = new UniCloudError({
          code,
          message,
          requestId: res.requestId
        });
        return fail(error)
      }
      res.result.errCode = res.result.errCode || res.result.code;
      res.result.errMsg = res.result.errMsg || res.result.message;
      // 新版支持dbCallBacks，保持旧版兼容authCallBacks
      if (token && tokenExpired) {
        setUniIdToken({
          token,
          tokenExpired
        });
        this._callbackAuth('refreshToken', [
          {
            token,
            tokenExpired
          }
        ]);
        this._callback('refreshToken', [
          {
            token,
            tokenExpired
          }
        ]);
        triggerEvent(EVENT_NAME.REFRESH_TOKEN, {
          token,
          tokenExpired
        });
      }
      const deprecatedProp = [{
        prop: 'affectedDocs',
        tips: 'affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代'
      }, {
        prop: 'code',
        tips: 'code不再推荐使用，请使用errCode替代'
      }, {
        prop: 'message',
        tips: 'message不再推荐使用，请使用errMsg替代'
      }];
      for (let i = 0; i < deprecatedProp.length; i++) {
        const {
          prop,
          tips
        } = deprecatedProp[i];
        if (prop in res.result) {
          const value = res.result[prop];
          Object.defineProperty(res.result, prop, {
            get () {
              console.warn(tips);
              return value
            }
          });
        }
      }
      return success(res)
    }, err => {
      if (/fc_function_not_found|FUNCTION_NOT_FOUND/g.test(err.message)) {
        console.warn('clientDB未初始化，请在web控制台保存一次schema以开启clientDB');
      }
      const error = new UniCloudError({
        code: err.code || 'SYSTEM_ERROR',
        message: err.message,
        requestId: err.requestId
      });
      return fail(error)
    })
  }
}

function initDatabase (uniClient) {
  uniClient.database = function (spaceInfo) {
    if (spaceInfo && Object.keys(spaceInfo).length > 0) {
      return uniClient.init(spaceInfo).database()
    }
    if (this._database) {
      return this._database
    }
    const database = getDBInstance(ClientDatabase, { uniClient });
    this._database = database;
    return database
  };
  uniClient.databaseForJQL = function (spaceInfo) {
    if (spaceInfo && Object.keys(spaceInfo).length > 0) {
      return uniClient.init(spaceInfo).databaseForJQL()
    }
    if (this._databaseForJQL) {
      return this._databaseForJQL
    }
    const databaseForJQL = getDBInstance(ClientDatabase, {
      uniClient,
      isJQL: true
    });
    this._databaseForJQL = databaseForJQL;
    return databaseForJQL
  };
}

function initResponse$1 (uniClient) {
  uniClient.onResponse = function (listener) {
    addListener(EVENT_NAME.RESPONSE, listener);
  };
  uniClient.offResponse = function (listener) {
    removeListener(EVENT_NAME.RESPONSE, listener);
  };
}

var pagesJson = {
	
};

const ERR_MSG = {
  TOKEN_INVALID: 'token无效，跳转登录页面',
  TOKEN_EXPIRED: 'token过期，跳转登录页面'
};

const CLIENT_DB_ERR = {
  TOKEN_INVALID_TOKEN_EXPIRED: ERR_MSG.TOKEN_EXPIRED,
  TOKEN_INVALID_INVALID_CLIENTID: ERR_MSG.TOKEN_INVALID,
  TOKEN_INVALID: ERR_MSG.TOKEN_INVALID,
  TOKEN_INVALID_WRONG_TOKEN: ERR_MSG.TOKEN_INVALID,
  TOKEN_INVALID_ANONYMOUS_USER: ERR_MSG.TOKEN_INVALID
};

const CLOUD_OBJECT_ERR = {
  'uni-id-token-expired': ERR_MSG.TOKEN_EXPIRED,
  'uni-id-check-token-failed': ERR_MSG.TOKEN_INVALID,
  'uni-id-token-not-exist': ERR_MSG.TOKEN_INVALID,
  'uni-id-check-device-feature-failed': ERR_MSG.TOKEN_INVALID
};

// const FULL_ERR = {
//   ...CLIENT_DB_ERR,
//   ...CLOUD_OBJECT_ERR,
//   default: '用户未登录或登录状态过期，自动跳转登录页面'
// }

function joinPagePath (root, path) {
  let realPath = '';
  if (!root) {
    realPath = path;
  } else {
    realPath = `${root}/${path}`;
  }
  return realPath.replace(/^\//, '')
}

function parsePages (pages = [], root = '') {
  const needLoginPage = [];
  const notNeedLoginPage = [];
  pages.forEach(item => {
    if (item.needLogin === true) {
      needLoginPage.push(joinPagePath(root, item.path));
    } else if (item.needLogin === false) {
      notNeedLoginPage.push(joinPagePath(root, item.path));
    }
  });
  return {
    needLoginPage,
    notNeedLoginPage
  }
}

function parseSubPackages (subPackages = []) {
  const needLoginPage = [];
  const notNeedLoginPage = [];
  subPackages.forEach(item => {
    const {
      root,
      pages = []
    } = item;
    const {
      needLoginPage: subNeedLoginPage,
      notNeedLoginPage: subNotNeedLoginPage
    } = parsePages(pages, root);
    needLoginPage.push(...subNeedLoginPage);
    notNeedLoginPage.push(...subNotNeedLoginPage);
  });
  return {
    needLoginPage,
    notNeedLoginPage
  }
}

/**
 * 获取带query和开头斜线的fullPath绝对路径
 */
function getFullPagePath (page) {
  let fullPath = (page && page.$page && page.$page.fullPath) || '';
  if (!fullPath) {
    return fullPath
  }
  if (fullPath.charAt(0) !== '/') {
    fullPath = '/' + fullPath;
  }
  return fullPath
}

/**
 * 移除url后面的query部分，并替换开头的"/"
 * @param {string} url
 * @returns
 */
function getRawPagePath (url) {
  return url.split('?')[0].replace(/^\//, '')
}

function getCurrentPage () {
  const currentPages = getCurrentPages();
  return currentPages[currentPages.length - 1]
}

function getCurrentPageFullPath () {
  return getFullPagePath(
    getCurrentPage()
  )
}

function getCurrentPageRawPath () {
  return getRawPagePath(
    getCurrentPageFullPath()
  )
}

function isLoginPageInTabBar (loginPage = '', tabBar = {}) {
  if (!loginPage) {
    return false
  }
  if (!(tabBar && tabBar.list && tabBar.list.length)) {
    return false
  }
  const tabBarList = tabBar.list;
  const rawLoginPage = getRawPagePath(loginPage);
  return tabBarList.some(item => item.pagePath === rawLoginPage)
}

const hasUniIDRouter = !!pagesJson.uniIdRouter;

function parsePagesJson ({
  pages = [],
  subPackages = [],
  uniIdRouter = {},
  tabBar = {}
} = pagesJson) {
  const {
    loginPage,
    needLogin: routerNeedLogin = [],
    resToLogin = true
  } = uniIdRouter;

  const {
    needLoginPage: pagesNeedLoginPage,
    notNeedLoginPage: pagesNotNeedLoginPage
  } = parsePages(pages);
  const {
    needLoginPage: subNeedLoginPage,
    notNeedLoginPage: subNotNeedLoginPage
  } = parseSubPackages(subPackages);
  return {
    loginPage,
    routerNeedLogin,
    resToLogin,
    needLoginPage: [...pagesNeedLoginPage, ...subNeedLoginPage],
    notNeedLoginPage: [...pagesNotNeedLoginPage, ...subNotNeedLoginPage],
    loginPageInTabBar: isLoginPageInTabBar(loginPage, tabBar)
  }
}

const {
  loginPage,
  routerNeedLogin,
  resToLogin,
  needLoginPage,
  notNeedLoginPage,
  loginPageInTabBar
} = parsePagesJson();

if (needLoginPage.indexOf(loginPage) > -1) {
  throw new Error(`Login page [${loginPage}] should not be "needLogin", please check your pages.json`)
}

/**
 * 获取指定url的绝对路径，不含开头的/
 * @param {string} url
 * @returns
 */
function resolve (url) {
  const currentPagePath = getCurrentPageRawPath();
  const firstChar = url.charAt(0);
  if (firstChar === '/') {
    return url
  }
  const [urlPath, urlParam] = url.split('?');
  const segments = urlPath.replace(/^\//, '').split('/');
  const stack = currentPagePath.split('/');
  stack.pop();
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }
  if (stack[0] === '') {
    stack.shift();
  }
  return '/' + stack.join('/') + (urlParam ? '?' + urlParam : '')
}

// export {
//   hasUniIDRouter,
//   loginPage,
//   routerNeedLogin,
//   resToLogin,
//   needLoginPage,
//   notNeedLoginPage
// }

function isMatchPattern (pagePath, pattern) {
  return new RegExp(pattern).test(pagePath)
}

function isPageNeedLogin (url) {
  const realPathPath = getRawPagePath(
    resolve(url)
  );
  if (notNeedLoginPage.indexOf(realPathPath) > -1) {
    return false
  }
  if (needLoginPage.indexOf(realPathPath) > -1) {
    return true
  }
  return routerNeedLogin.some(pattern => isMatchPattern(url, pattern))
}

function getFinalLoginPage (loginPage, redirect) {
  if (loginPage.charAt(0) !== '/') {
    loginPage = '/' + loginPage;
  }
  if (!redirect) {
    return loginPage
  }
  return loginPage.indexOf('?') > -1
    ? loginPage + `&uniIdRedirectUrl=${encodeURIComponent(redirect)}`
    : loginPage + `?uniIdRedirectUrl=${encodeURIComponent(redirect)}`
}

function needLoginPreflight ({
  redirect
}) {
  const redirectRawPath = getRawPagePath(redirect);
  const loginPageRawPath = getRawPagePath(loginPage);
  const currentPageRawPath = getCurrentPageRawPath();
  // 当前页面是登录页面或者redirect页面是登录页时不跳转
  if (currentPageRawPath === loginPageRawPath || redirectRawPath === loginPageRawPath) {
    return false
  }
  return true
}

/**
 * 仅response走此逻辑
 * @param {object} evt
 * @returns
 */
function triggerNeedLogin (evt = {}) {
  const listenerList = getListenerList(EVENT_NAME.NEED_LOGIN);
  waitFirstPage().then(() => {
    const redirect = getCurrentPageFullPath();
    if (!redirect) {
      return
    }
    if (!needLoginPreflight({ redirect })) {
      return
    }
    if (listenerList.length > 0) {
      return triggerEvent(EVENT_NAME.NEED_LOGIN, Object.assign({
        uniIdRedirectUrl: redirect
      }, evt))
    }
    if (!loginPage) {
      return
    }
    toLoginPage({
      api: 'navigateTo',
      redirect
    });
  });
}

function mockUniIdError () {
  const {
    token,
    tokenExpired
  } = getUniIdToken();
  let err;
  if (!token) {
    const errCode = 'uni-id-check-token-failed';
    err = {
      errCode,
      errMsg: CLOUD_OBJECT_ERR[errCode]
    };
  } else if (tokenExpired < Date.now()) {
    const errCode = 'uni-id-token-expired';
    err = {
      errCode,
      errMsg: CLOUD_OBJECT_ERR[errCode]
    };
  }
  return err
}

function toLoginPage ({
  api,
  redirect
} = {}) {
  if (!redirect || !needLoginPreflight({ redirect })) {
    return
  }
  const finalLoginPage = getFinalLoginPage(loginPage, redirect);
  /*
   * 前提：
   * - switchTab无法跳转到非tab页面
   * - navigateTo、redirectTo无法跳转到tab页面
   * 处理方式：
   * - 拦截switchTab时如果loginPage不是tab页面则转为执行navigateTo
   * - 拦截navigateTo、redirectTo时如果loginPage是tab页面则转为执行switchTab
   */
  if (loginPageInTabBar) {
    if (api === 'navigateTo' || api === 'redirectTo') {
      api = 'switchTab';
    }
  } else {
    if (api === 'switchTab') {
      api = 'navigateTo';
    }
  }

  const routerApi = {
    navigateTo: uni.navigateTo,
    redirectTo: uni.redirectTo,
    switchTab: uni.switchTab,
    reLaunch: uni.reLaunch
  };
  setTimeout(() => {
    routerApi[api]({
      url: finalLoginPage
    });
  });
}

function preprocessPageJump ({
  url
} = {}) {
  const result = {
    abortLoginPageJump: false,
    autoToLoginPage: false
  };
  const err = mockUniIdError();
  if (isPageNeedLogin(url) && err) {
    err.uniIdRedirectUrl = url;
    const listenerList = getListenerList(EVENT_NAME.NEED_LOGIN);
    if (listenerList.length > 0) {
      setTimeout(() => {
        triggerEvent(EVENT_NAME.NEED_LOGIN, err);
      }, 0);
      result.abortLoginPageJump = true;
      return result
    }
    result.autoToLoginPage = true;
  }
  return result
}

function initHomePage () {
  const homePageUrl = getCurrentPageFullPath();
  const {
    abortLoginPageJump,
    autoToLoginPage
  } = preprocessPageJump({
    url: homePageUrl
  });
  if (abortLoginPageJump) {
    return
  }
  if (autoToLoginPage) {
    toLoginPage({
      api: 'redirectTo',
      redirect: homePageUrl
    });
  }
}

function initRouter () {
  initHomePage();
  const routeApiList = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];
  for (let i = 0; i < routeApiList.length; i++) {
    const api = routeApiList[i];
    uni.addInterceptor(api, {
      invoke (e) {
        const {
          abortLoginPageJump,
          autoToLoginPage
        } = preprocessPageJump({
          url: e.url
        });
        if (abortLoginPageJump) {
          return e
        }
        if (autoToLoginPage) {
          toLoginPage({
            api,
            redirect: resolve(e.url)
          });
          return false
        }
        return e
      }
    });
  }
}

function isCloudObjectNeedLogin (err) {
  if (typeof err !== 'object') {
    return false
  }
  const {
    errCode
  } = err || {};
  return errCode in CLOUD_OBJECT_ERR
}

function isClientDBNeedLogin (err) {
  if (typeof err !== 'object') {
    return false
  }
  const {
    errCode
  } = err || {};
  return errCode in CLIENT_DB_ERR
}

function initResponse () {
  this.onResponse((e) => {
    const {
      type,
      content
    } = e;
    let isNeedLogin = false;
    switch (type) {
      case 'cloudobject':
        isNeedLogin = isCloudObjectNeedLogin(content);
        break
      case 'clientdb':
        isNeedLogin = isClientDBNeedLogin(content);
        break
    }
    if (isNeedLogin) {
      triggerNeedLogin(content);
    }
  });
}

function initNeedLogin (uniClient) {
  uniClient.onNeedLogin = function (listener) {
    addListener(EVENT_NAME.NEED_LOGIN, listener);
  };
  uniClient.offNeedLogin = function (listener) {
    removeListener(EVENT_NAME.NEED_LOGIN, listener);
  };
  if (!hasUniIDRouter) {
    return
  }
  if (getGlobalObj(UNI_CLOUD_STATUS).needLoginInit) {
    return
  }
  getGlobalObj(UNI_CLOUD_STATUS).needLoginInit = true;
  waitFirstPage().then(() => {
    initRouter.call(uniClient);
  });
  // 这个只会在用户请求之后触发，暂不等待getCurrentPages
  if (resToLogin) {
    initResponse.call(uniClient);
  }
}

function initRefreshToken (uniClient) {
  uniClient.onRefreshToken = function (listener) {
    addListener(EVENT_NAME.REFRESH_TOKEN, listener);
  };
  uniClient.offRefreshToken = function (listener) {
    removeListener(EVENT_NAME.REFRESH_TOKEN, listener);
  };
}

function initEvent (uniClient) {
  initResponse$1(uniClient);
  initNeedLogin(uniClient);
  initRefreshToken(uniClient);
}

let realAtob;

const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function (str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) { throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.") }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap; var result = ''; var r1; var r2; var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
        (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255)
        : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
          : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode (str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

function getCurrentUserInfo () {
  const token = getUniIdToken().token || '';
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
  const { camera, compressed, maxDuration, sourceType = ['album', 'camera'], extension } = opts;
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
          cloudPathAsRealPath: fileItem.cloudPathAsRealPath,
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
      spaceInfo: {
        type: Object,
        default () {
          return {}
        }
      },
      collection: {
        type: [String, Array],
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
        let db = uniClient.database(this.spaceInfo);

        const action = options.action || this.action;
        if (action) {
          db = db.action(action);
        }

        const collection = options.collection || this.collection;
        if (Array.isArray(collection)) {
          db = db.collection(...collection);
        } else {
          db = db.collection(collection);
        }

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

// uniCloud.importObject('test-obj', {
//   customUI: false,
//   loadingOptions: {
//     text: '',
//     mask: ''
//   },
//   errorOptions: {
//     type: 'toast', // 'toast' | 'modal'
//     retry: true
//   }
// })

function mergeObjectOptions (defaultOptions, options = {}) {
  defaultOptions.customUI = options.customUI || defaultOptions.customUI;
  defaultOptions.parseSystemError = options.parseSystemError || defaultOptions.parseSystemError;
  Object.assign(defaultOptions.loadingOptions, options.loadingOptions);
  Object.assign(defaultOptions.errorOptions, options.errorOptions);
  if (typeof options.secretMethods === 'object') {
    defaultOptions.secretMethods = options.secretMethods;
  }
  return defaultOptions
}

async function showModal ({
  title,
  content,
  showCancel,
  cancelText,
  confirmText
} = {}) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title,
      content,
      showCancel,
      cancelText,
      confirmText,
      success (res) {
        resolve(res);
      },
      fail () {
        resolve({
          confirm: false,
          cancel: true
        });
      }
    });
  })
}

function secret (options, callFunctionOptions) {
  const methodName = callFunctionOptions.data.method;
  const secretMethods = options.secretMethods || {};
  const secretType = secretMethods[methodName] || secretMethods['*'];
  if (secretType) {
    callFunctionOptions.secretType = secretType;
  }
}

function initImportObject (uniClient) {
  function importObject (objectName, options = {}) {
    const defaultOptions = {
      customUI: false,
      loadingOptions: {
        title: '加载中...',
        mask: true
      },
      errorOptions: {
        type: 'modal', // 'toast' | 'modal'
        retry: false
      }
      // parseSystemError ({
      //   objectName,
      //   methodName,
      //   params = [],
      //   errCode,
      //   errMsg
      // } = {}) {
      //   return errMsg
      // }
    };
    options = mergeObjectOptions(defaultOptions, options);
    const {
      customUI,
      loadingOptions,
      errorOptions,
      parseSystemError
    } = options;
    const autoUI = !customUI;
    return new Proxy({}, {
      get (target, method) {
        async function callMethod (...params) {
          if (autoUI) {
            uni.showLoading({
              title: loadingOptions.title,
              mask: loadingOptions.mask
            });
          }
          let res;
          const callFunctionOptions = {
            name: objectName,
            type: CALLFUNCTION_TYPE.OBJECT,
            data: {
              method,
              params
            }
          };
          if (typeof options.secretMethods === 'object') {
            secret(options, callFunctionOptions);
          }
          let isSystemError = false;
          try {
            res = await uniClient.callFunction(callFunctionOptions);
          } catch (error) {
            isSystemError = true;
            res = {
              result: new UniCloudError(error)
            };
          }
          const {
            errSubject,
            errCode,
            errMsg,
            newToken
          } = res.result || {};
          if (autoUI) {
            uni.hideLoading();
          }
          if (newToken && newToken.token && newToken.tokenExpired) {
            setUniIdToken(newToken);
            triggerEvent(EVENT_NAME.REFRESH_TOKEN, {
              ...newToken
            });
          }
          if (errCode) {
            let parsedErrMsg = errMsg;
            if (isSystemError && parseSystemError) {
              const result = await parseSystemError({
                objectName,
                methodName: method,
                params,
                errSubject,
                errCode,
                errMsg
              });
              parsedErrMsg = result.errMsg || errMsg;
            }
            if (autoUI) {
              if (errorOptions.type === 'toast') {
                uni.showToast({
                  title: parsedErrMsg,
                  icon: 'none'
                });
              } else if (errorOptions.type === 'modal') {
                const {
                  confirm
                } = await showModal({
                  title: '提示',
                  content: parsedErrMsg,
                  showCancel: errorOptions.retry,
                  cancelText: '取消',
                  confirmText: errorOptions.retry ? '重试' : '确定'
                });
                if (errorOptions.retry && confirm) {
                  return callMethod(...params)
                }
              } else {
                throw new Error(`Invalid errorOptions.type: ${errorOptions.type}`)
              }
            }
            const error = new UniCloudError({
              subject: errSubject,
              code: errCode,
              message: errMsg,
              requestId: res.requestId
            });
            error.detail = res.result;
            triggerEvent(EVENT_NAME.RESPONSE, {
              type: EVENT_TYPE.CLOUD_OBJECT,
              content: error
            });
            throw error
          }
          triggerEvent(EVENT_NAME.RESPONSE, {
            type: EVENT_TYPE.CLOUD_OBJECT,
            content: res.result
          });
          return res.result
        }
        return wrapWithInterceptor({
          fn: callMethod,
          interceptorName: 'callObject',
          getCallbackArgs: function ({
            params
          } = {}) {
            return {
              objectName: objectName,
              methodName: method,
              params
            }
          }
        })
      }
    })
  }
  return importObject
}

function uniLogin () {
  return new Promise((resolve, reject) => {
    uni.login({
      success (res) {
        resolve(res.code);
      },
      fail (err) {
        reject(new Error(err.errMsg));
      }
    });
  })
}

function getScopedSecureNetworkCache (uniClient) {
  return getGlobalObj(
    GLOBAL_SECURE_NETWORK_CACHE_KEY.replace(
      '{spaceId}',
      uniClient.config.spaceId
    )
  )
}

// initSecureNetworkByWeixin
async function prepareSecureNetwork ({
  openid,
  callLoginByWeixin = false
} = {}) {
  // this => uniClient
  const globalCache = getScopedSecureNetworkCache(this);
  if (UNI_PLATFORM_FIXED !== 'mp-weixin') {
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${UNI_PLATFORM_FIXED}\``)
  }

  if (openid && callLoginByWeixin) {
    throw new Error('[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time')
  }
  if (openid) {
    globalCache.mpWeixinOpenid = openid;
    return {}
  }
  const code = await uniLogin();
  const uniIdCo = this.importObject('uni-id-co', {
    customUI: true
  });
  await uniIdCo.secureNetworkHandshakeByWeixin({
    code,
    callLoginByWeixin
  });
  globalCache.mpWeixinCode = code;
  return {
    code
  }
}

async function realPrepareSecureNetwork (params) {
  // this => uniClient
  const globalCache = getScopedSecureNetworkCache(this);
  if (globalCache.initPromise) {
    return globalCache.initPromise
  }
  globalCache.initPromise = prepareSecureNetwork.call(this, params);
  return globalCache.initPromise
}

function initSecureNetworkByWeixin (uniClient) {
  return function ({
    openid,
    callLoginByWeixin = false
  } = {}) {
    return realPrepareSecureNetwork.call(uniClient, {
      openid,
      callLoginByWeixin
    })
  }
}

function wrapUniMethod (methodName) {
  /**
   * 暂时做此处理，不要将uni.的用法放到全局（for jql），不可使用uni[methodName]的用法（for vue3）
   */
  const methodMap = {
    getSystemInfo: uni.getSystemInfo,
    getPushClientId: uni.getPushClientId
  };
  return function (options) {
    return new Promise((resolve, reject) => {
      methodMap[methodName]({
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
}

class SSEChannel extends EventEmitter {
  constructor () {
    super();
    this._uniPushMessageCallback = this._receivePushMessage.bind(this);
    this._currentMessageId = -1;
    this._payloadQueue = [];
  }

  init () {
    return Promise.all([
      wrapUniMethod('getSystemInfo')(),
      wrapUniMethod('getPushClientId')()
    ]).then(([{
      appId
    } = {}, {
      cid
    } = {}] = []) => {
      if (!appId) {
        throw new Error('Invalid appId, please check the manifest.json file')
      }
      if (!cid) {
        throw new Error('Invalid push client id')
      }
      this._appId = appId;
      this._pushClientId = cid;
      this._seqId = Date.now() + '-' + Math.floor(Math.random() * 900000 + 100000);
      this.emit('open');
      this._initMessageListener();
    }, (err) => {
      this.emit('error', err);
      this.close();
      throw err
    })
  }

  async open () {
    return this.init()
  }

  _isUniCloudSSE (pushMessage) {
    if (pushMessage.type !== 'receive') {
      return false
    }
    const payload = pushMessage && pushMessage.data && pushMessage.data.payload;
    return !!(payload && payload.channel === 'UNI_CLOUD_SSE' && payload.seqId === this._seqId)
  }

  _receivePushMessage (pushMessage) {
    if (!this._isUniCloudSSE(pushMessage)) {
      return
    }
    const payload = pushMessage && pushMessage.data && pushMessage.data.payload;
    const {
      action,
      messageId,
      message
    } = payload;
    this._payloadQueue.push({
      action,
      messageId,
      message
    });
    this._consumMessage();
  }

  _consumMessage () {
    while (true) {
      const payload = this._payloadQueue.find(item => item.messageId === this._currentMessageId + 1);
      if (!payload) {
        break
      }
      this._currentMessageId++;
      this._parseMessagePayload(payload);
    }
  }

  _parseMessagePayload (payload) {
    const {
      action,
      messageId,
      message
    } = payload;
    if (action === 'end') {
      this._end({
        messageId,
        message
      });
    } else if (action === 'message') {
      this._appendMessage({
        messageId,
        message
      });
    }
  }

  _appendMessage ({
    messageId,
    message
  } = {}) {
    this.emit('message', message);
  }

  _end ({
    messageId,
    message
  } = {}) {
    this.emit('end', message);
    this.close();
  }

  _initMessageListener () {
    uni.onPushMessage(this._uniPushMessageCallback);
  }

  _destroy () {
    uni.offPushMessage(this._uniPushMessageCallback);
  }

  toJSON () {
    return {
      appId: this._appId,
      pushClientId: this._pushClientId,
      seqId: this._seqId
    }
  }

  close () {
    this._destroy();
    this.emit('close');
  }
}

function initCommonMethod (uniClient) {
  {
    uniClient.getCurrentUserInfo = getCurrentUserInfo;
    uniClient.chooseAndUploadFile = chooseAndUploadFile$1.initChooseAndUploadFile(uniClient);
    Object.assign(uniClient, {
      get mixinDatacom () {
        return getMixinDatacom(uniClient)
      }
    });
    uniClient.SSEChannel = SSEChannel;
    uniClient.initSecureNetworkByWeixin = initSecureNetworkByWeixin(uniClient);
  }
  uniClient.importObject = initImportObject(uniClient);
}

function request (options) {
  return new Promise((resolve, reject) => {
    uniAdapter.request({
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

function getMajorVersion (version) {
  if (!version || typeof version !== 'string') {
    return 0
  }
  const matches = version.match(/^(\d+)./);
  if (matches && matches[1]) {
    return parseInt(matches[1])
  }
  return 0
}

async function initLocalServerInfo (uniClient) {
  if (!IS_DEV) {
    return Promise.resolve()
  }
  if (UNI_PLATFORM_FIXED === 'app') {
    const {
      osName,
      osVersion
    } = getSystemInfo();
    if (osName === 'ios' && getMajorVersion(osVersion) >= 14) {
      console.warn('iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）');
    }
  }
  const uniCloudDev = uniClient.__dev__;
  // 测试云函数本地运行地址
  if (!uniCloudDev.debugInfo) {
    return
  }
  const {
    address: addressList,
    servePort: port
  } = uniCloudDev.debugInfo;
  const {
    address
  } = await getServerAddr(addressList, port);

  if (address) {
    // 设置服务地址
    uniCloudDev.localAddress = address;
    uniCloudDev.localPort = port;
    return
  }
  const warnMethod = UNI_PLATFORM_FIXED === 'app' ? 'error' : 'warn';
  const warn = console[warnMethod];
  // 启动时不在同一局域网且初始值为访问remote云函数，则直接切换云端。否则提示连接不到本地调试服务。
  let message = '';
  if (uniCloudDev.debugInfo.initialLaunchType === 'remote') {
    uniCloudDev.debugInfo.forceRemote = true;
    message = '当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。';
  } else {
    message = '无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。';
  }
  message += '\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数';
  if (UNI_PLATFORM_FIXED === 'web') {
    message += '\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式';
  }
  if (UNI_PLATFORM_FIXED.indexOf('mp-') === 0) {
    message += '\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp';
  }
  if (uniCloudDev.debugInfo.forceRemote) {
    warn(message);
  } else {
    throw new Error(message)
  }
}

function initDev (uniClient) {
  if (!IS_DEV) {
    return
  }
  const uniCloudDev = {};
  uniClient.__dev__ = uniCloudDev;
  uniCloudDev.debugLog = IS_DEV &&
    !IS_UNI_APP_SSR &&
    (
      (UNI_PLATFORM_FIXED === 'web' && navigator.userAgent.indexOf('HBuilderX') > 0) ||
      UNI_PLATFORM_FIXED === 'app'
    );
  // 附加调试信息
  const debugInfo = UNICLOUD_DEBUG;
  if (debugInfo && !debugInfo.code) {
    uniCloudDev.debugInfo = debugInfo;
  }
  const promiseHub = new PromiseHub({
    createPromise: function () {
      return initLocalServerInfo(uniClient)
    }
  });
  uniCloudDev.initLocalNetwork = function () {
    return promiseHub.exec()
  };
}

function initClient (uniClient) {
  if (uniClient._initPromiseHub) {
    return
  }
  uniClient._initPromiseHub = new PromiseHub({
    createPromise: function () {
      let preInit = Promise.resolve();
      // 判断登录状态无效,自动使用匿名登录
      const authObj = uniClient.auth();
      return preInit.then(() => {
        return authObj.getLoginState()
      }).then((loginState) => {
        if (!loginState) {
          return authObj.signInAnonymously()
        } else {
          return Promise.resolve()
        }
      })
    }
  });
}

const OriginUniCloudMap = {
  tcb: uniCloudTcb,
  tencent: uniCloudTcb,
  aliyun: uniCloudAli,
  private: uniCloudPrivate,
  alipay: uniCloudAlipay
};

class UniCloud {
  init (config) {
    let uniClient = {};
    const originUniCloud = OriginUniCloudMap[config.provider];
    if (!originUniCloud) {
      throw new Error('未提供正确的provider参数')
    }
    uniClient = originUniCloud.init(config);
    IS_DEV && initDev(uniClient);
    initClient(uniClient);
    initCallFunction(uniClient);
    initUploadFile(uniClient);
    initDatabase(uniClient);
    initCommonMethod(uniClient);

    const methodShouldCallbackify = ['callFunction', 'uploadFile', 'deleteFile', 'getTempFileURL', 'downloadFile', 'chooseAndUploadFile'];

    methodShouldCallbackify.forEach(methodName => {
      if (!uniClient[methodName]) {
        return
      }
      const oldMethod = uniClient[methodName];
      uniClient[methodName] = function () {
        return oldMethod.apply(uniClient, Array.from(arguments))
      };
      uniClient[methodName] = callbackifyWithInterceptor(uniClient[methodName], methodName).bind(uniClient);
    });

    uniClient.init = this.init;

    return uniClient
  }
}

let uniCloud = new UniCloud();

// uni-app内{let e = {}}处理有点问题，暂时包裹一层
(() => {
  if (!IS_UNI_APP) {
    return
  }
  const uniCloudProvider = UNI_CLOUD_PROVIDER;
  let defaultSpace = {};
  if (uniCloudProvider && uniCloudProvider.length === 1) {
    defaultSpace = uniCloudProvider[0];
    uniCloud = uniCloud.init(defaultSpace);
    uniCloud._isDefault = true;
  } else {
    const defaultMethodList = [
      'auth',
      'callFunction',
      'uploadFile',
      'deleteFile',
      'getTempFileURL',
      'downloadFile',
      'database',
      'getCurrentUSerInfo',
      'importObject'
    ];

    let spaceErrMessage;

    if (uniCloudProvider && uniCloudProvider.length > 0) {
      spaceErrMessage = '应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间';
    } else if (RUN_BY_HBUILDERX) {
      spaceErrMessage = '应用未关联服务空间，请在uniCloud目录右键关联服务空间';
    } else {
      spaceErrMessage = 'uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间';
    }
    defaultMethodList.forEach((item) => {
      uniCloud[item] = function () {
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

  // 用户可能不关联服务空间使用此属性
  Object.assign(uniCloud, {
    get mixinDatacom () {
      return getMixinDatacom(uniCloud)
    }
  });

  initEvent(uniCloud);
  uniCloud.addInterceptor = addInterceptor;
  uniCloud.removeInterceptor = removeInterceptor;
  uniCloud.interceptObject = interceptObject;

  if (!IS_UNI_APP_SSR && IS_DEV && UNI_PLATFORM_FIXED === 'web') {
    window.uniCloud = uniCloud;
  }
})();

var uniCloud$1 = uniCloud;

module.exports = uniCloud$1;
=======
"use strict";"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function t(e,t,n){return e(n={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&n.path)}},n.exports),n.exports}var n=t((function(e,t){var n;e.exports=(n=n||function(e,t){var n=Object.create||function(){function e(){}return function(t){var n;return e.prototype=t,n=new e,e.prototype=null,n}}(),s={},r=s.lib={},i=r.Base={extend:function(e){var t=n(this);return e&&t.mixIn(e),t.hasOwnProperty("init")&&this.init!==t.init||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},o=r.WordArray=i.extend({init:function(e,n){e=this.words=e||[],this.sigBytes=n!=t?n:4*e.length},toString:function(e){return(e||c).stringify(this)},concat:function(e){var t=this.words,n=e.words,s=this.sigBytes,r=e.sigBytes;if(this.clamp(),s%4)for(var i=0;i<r;i++){var o=n[i>>>2]>>>24-i%4*8&255;t[s+i>>>2]|=o<<24-(s+i)%4*8}else for(i=0;i<r;i+=4)t[s+i>>>2]=n[i>>>2];return this.sigBytes+=r,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-n%4*8,t.length=e.ceil(n/4)},clone:function(){var e=i.clone.call(this);return e.words=this.words.slice(0),e},random:function(t){for(var n,s=[],r=function(t){t=t;var n=987654321,s=4294967295;return function(){var r=((n=36969*(65535&n)+(n>>16)&s)<<16)+(t=18e3*(65535&t)+(t>>16)&s)&s;return r/=4294967296,(r+=.5)*(e.random()>.5?1:-1)}},i=0;i<t;i+=4){var a=r(4294967296*(n||e.random()));n=987654071*a(),s.push(4294967296*a()|0)}return new o.init(s,t)}}),a=s.enc={},c=a.Hex={stringify:function(e){for(var t=e.words,n=e.sigBytes,s=[],r=0;r<n;r++){var i=t[r>>>2]>>>24-r%4*8&255;s.push((i>>>4).toString(16)),s.push((15&i).toString(16))}return s.join("")},parse:function(e){for(var t=e.length,n=[],s=0;s<t;s+=2)n[s>>>3]|=parseInt(e.substr(s,2),16)<<24-s%8*4;return new o.init(n,t/2)}},u=a.Latin1={stringify:function(e){for(var t=e.words,n=e.sigBytes,s=[],r=0;r<n;r++){var i=t[r>>>2]>>>24-r%4*8&255;s.push(String.fromCharCode(i))}return s.join("")},parse:function(e){for(var t=e.length,n=[],s=0;s<t;s++)n[s>>>2]|=(255&e.charCodeAt(s))<<24-s%4*8;return new o.init(n,t)}},h=a.Utf8={stringify:function(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(e){return u.parse(unescape(encodeURIComponent(e)))}},l=r.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=h.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var n=this._data,s=n.words,r=n.sigBytes,i=this.blockSize,a=r/(4*i),c=(a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0))*i,u=e.min(4*c,r);if(c){for(var h=0;h<c;h+=i)this._doProcessBlock(s,h);var l=s.splice(0,c);n.sigBytes-=u}return new o.init(l,u)},clone:function(){var e=i.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});r.Hasher=l.extend({cfg:i.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){l.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,n){return new e.init(n).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return new d.HMAC.init(e,n).finalize(t)}}});var d=s.algo={};return s}(Math),n)})),s=n,r=(t((function(e,t){var n;e.exports=(n=s,function(e){var t=n,s=t.lib,r=s.WordArray,i=s.Hasher,o=t.algo,a=[];!function(){for(var t=0;t<64;t++)a[t]=4294967296*e.abs(e.sin(t+1))|0}();var c=o.MD5=i.extend({_doReset:function(){this._hash=new r.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var n=0;n<16;n++){var s=t+n,r=e[s];e[s]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8)}var i=this._hash.words,o=e[t+0],c=e[t+1],p=e[t+2],f=e[t+3],g=e[t+4],m=e[t+5],y=e[t+6],_=e[t+7],w=e[t+8],v=e[t+9],I=e[t+10],S=e[t+11],k=e[t+12],b=e[t+13],A=e[t+14],P=e[t+15],T=i[0],C=i[1],x=i[2],O=i[3];T=u(T,C,x,O,o,7,a[0]),O=u(O,T,C,x,c,12,a[1]),x=u(x,O,T,C,p,17,a[2]),C=u(C,x,O,T,f,22,a[3]),T=u(T,C,x,O,g,7,a[4]),O=u(O,T,C,x,m,12,a[5]),x=u(x,O,T,C,y,17,a[6]),C=u(C,x,O,T,_,22,a[7]),T=u(T,C,x,O,w,7,a[8]),O=u(O,T,C,x,v,12,a[9]),x=u(x,O,T,C,I,17,a[10]),C=u(C,x,O,T,S,22,a[11]),T=u(T,C,x,O,k,7,a[12]),O=u(O,T,C,x,b,12,a[13]),x=u(x,O,T,C,A,17,a[14]),T=h(T,C=u(C,x,O,T,P,22,a[15]),x,O,c,5,a[16]),O=h(O,T,C,x,y,9,a[17]),x=h(x,O,T,C,S,14,a[18]),C=h(C,x,O,T,o,20,a[19]),T=h(T,C,x,O,m,5,a[20]),O=h(O,T,C,x,I,9,a[21]),x=h(x,O,T,C,P,14,a[22]),C=h(C,x,O,T,g,20,a[23]),T=h(T,C,x,O,v,5,a[24]),O=h(O,T,C,x,A,9,a[25]),x=h(x,O,T,C,f,14,a[26]),C=h(C,x,O,T,w,20,a[27]),T=h(T,C,x,O,b,5,a[28]),O=h(O,T,C,x,p,9,a[29]),x=h(x,O,T,C,_,14,a[30]),T=l(T,C=h(C,x,O,T,k,20,a[31]),x,O,m,4,a[32]),O=l(O,T,C,x,w,11,a[33]),x=l(x,O,T,C,S,16,a[34]),C=l(C,x,O,T,A,23,a[35]),T=l(T,C,x,O,c,4,a[36]),O=l(O,T,C,x,g,11,a[37]),x=l(x,O,T,C,_,16,a[38]),C=l(C,x,O,T,I,23,a[39]),T=l(T,C,x,O,b,4,a[40]),O=l(O,T,C,x,o,11,a[41]),x=l(x,O,T,C,f,16,a[42]),C=l(C,x,O,T,y,23,a[43]),T=l(T,C,x,O,v,4,a[44]),O=l(O,T,C,x,k,11,a[45]),x=l(x,O,T,C,P,16,a[46]),T=d(T,C=l(C,x,O,T,p,23,a[47]),x,O,o,6,a[48]),O=d(O,T,C,x,_,10,a[49]),x=d(x,O,T,C,A,15,a[50]),C=d(C,x,O,T,m,21,a[51]),T=d(T,C,x,O,k,6,a[52]),O=d(O,T,C,x,f,10,a[53]),x=d(x,O,T,C,I,15,a[54]),C=d(C,x,O,T,c,21,a[55]),T=d(T,C,x,O,w,6,a[56]),O=d(O,T,C,x,P,10,a[57]),x=d(x,O,T,C,y,15,a[58]),C=d(C,x,O,T,b,21,a[59]),T=d(T,C,x,O,g,6,a[60]),O=d(O,T,C,x,S,10,a[61]),x=d(x,O,T,C,p,15,a[62]),C=d(C,x,O,T,v,21,a[63]),i[0]=i[0]+T|0,i[1]=i[1]+C|0,i[2]=i[2]+x|0,i[3]=i[3]+O|0},_doFinalize:function(){var t=this._data,n=t.words,s=8*this._nDataBytes,r=8*t.sigBytes;n[r>>>5]|=128<<24-r%32;var i=e.floor(s/4294967296),o=s;n[15+(r+64>>>9<<4)]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8),n[14+(r+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),t.sigBytes=4*(n.length+1),this._process();for(var a=this._hash,c=a.words,u=0;u<4;u++){var h=c[u];c[u]=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8)}return a},clone:function(){var e=i.clone.call(this);return e._hash=this._hash.clone(),e}});function u(e,t,n,s,r,i,o){var a=e+(t&n|~t&s)+r+o;return(a<<i|a>>>32-i)+t}function h(e,t,n,s,r,i,o){var a=e+(t&s|n&~s)+r+o;return(a<<i|a>>>32-i)+t}function l(e,t,n,s,r,i,o){var a=e+(t^n^s)+r+o;return(a<<i|a>>>32-i)+t}function d(e,t,n,s,r,i,o){var a=e+(n^(t|~s))+r+o;return(a<<i|a>>>32-i)+t}t.MD5=i._createHelper(c),t.HmacMD5=i._createHmacHelper(c)}(Math),n.MD5)})),t((function(e,t){var n;e.exports=(n=s,void function(){var e=n,t=e.lib.Base,s=e.enc.Utf8;e.algo.HMAC=t.extend({init:function(e,t){e=this._hasher=new e.init,"string"==typeof t&&(t=s.parse(t));var n=e.blockSize,r=4*n;t.sigBytes>r&&(t=e.finalize(t)),t.clamp();for(var i=this._oKey=t.clone(),o=this._iKey=t.clone(),a=i.words,c=o.words,u=0;u<n;u++)a[u]^=1549556828,c[u]^=909522486;i.sigBytes=o.sigBytes=r,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher,n=t.finalize(e);return t.reset(),t.finalize(this._oKey.clone().concat(n))}})}())})),t((function(e,t){e.exports=s.HmacMD5}))),i=t((function(e,t){e.exports=s.enc.Utf8})),o=t((function(e,t){var n;e.exports=(n=s,function(){var e=n,t=e.lib.WordArray;function s(e,n,s){for(var r=[],i=0,o=0;o<n;o++)if(o%4){var a=s[e.charCodeAt(o-1)]<<o%4*2,c=s[e.charCodeAt(o)]>>>6-o%4*2;r[i>>>2]|=(a|c)<<24-i%4*8,i++}return t.create(r,i)}e.enc.Base64={stringify:function(e){var t=e.words,n=e.sigBytes,s=this._map;e.clamp();for(var r=[],i=0;i<n;i+=3)for(var o=(t[i>>>2]>>>24-i%4*8&255)<<16|(t[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|t[i+2>>>2]>>>24-(i+2)%4*8&255,a=0;a<4&&i+.75*a<n;a++)r.push(s.charAt(o>>>6*(3-a)&63));var c=s.charAt(64);if(c)for(;r.length%4;)r.push(c);return r.join("")},parse:function(e){var t=e.length,n=this._map,r=this._reverseMap;if(!r){r=this._reverseMap=[];for(var i=0;i<n.length;i++)r[n.charCodeAt(i)]=i}var o=n.charAt(64);if(o){var a=e.indexOf(o);-1!==a&&(t=a)}return s(e,t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),n.enc.Base64)}));const a="FUNCTION",c="OBJECT",u="CLIENT_DB",h="pending",l="fulfilled",d="rejected";function p(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function f(e){return"object"===p(e)}function g(e){return"function"==typeof e}function m(e){return function(){try{return e.apply(e,arguments)}catch(e){console.error(e)}}}const y="REJECTED",_="NOT_PENDING";class w{constructor({createPromise:e,retryRule:t=y}={}){this.createPromise=e,this.status=null,this.promise=null,this.retryRule=t}get needRetry(){if(!this.status)return!0;switch(this.retryRule){case y:return this.status===d;case _:return this.status!==h}}exec(){return this.needRetry?(this.status=h,this.promise=this.createPromise().then((e=>(this.status=l,Promise.resolve(e))),(e=>(this.status=d,Promise.reject(e)))),this.promise):this.promise}}function v(e){return e&&"string"==typeof e?JSON.parse(e):e}const I="development"===process.env.NODE_ENV,S=process.env.UNI_PLATFORM,k="true"===process.env.UNI_SECURE_NETWORK_ENABLE||!0===process.env.UNI_SECURE_NETWORK_ENABLE,b=v(process.env.UNI_SECURE_NETWORK_CONFIG),A="h5"===S?"web":"app-plus"===S?"app":S,P=v(process.env.UNICLOUD_DEBUG),T=v(process.env.UNI_CLOUD_PROVIDER)||[],C=process.env.RUN_BY_HBUILDERX;let x="";try{x=process.env.UNI_APP_ID||""}catch(e){}let O={};function E(e,t={}){var n,s;return n=O,s=e,Object.prototype.hasOwnProperty.call(n,s)||(O[e]=t),O[e]}const L=["invoke","success","fail","complete"],R=E("_globalUniCloudInterceptor");function U(e,t){R[e]||(R[e]={}),f(t)&&Object.keys(t).forEach((n=>{L.indexOf(n)>-1&&function(e,t,n){let s=R[e][t];s||(s=R[e][t]=[]),-1===s.indexOf(n)&&g(n)&&s.push(n)}(e,n,t[n])}))}function N(e,t){R[e]||(R[e]={}),f(t)?Object.keys(t).forEach((n=>{L.indexOf(n)>-1&&function(e,t,n){const s=R[e][t];if(!s)return;const r=s.indexOf(n);r>-1&&s.splice(r,1)}(e,n,t[n])})):delete R[e]}function D(e,t){return e&&0!==e.length?e.reduce(((e,n)=>e.then((()=>n(t)))),Promise.resolve()):Promise.resolve()}function M(e,t){return R[e]&&R[e][t]||[]}function q(e){U("callObject",e)}const F=E("_globalUniCloudListener"),K="response",j="needLogin",$="refreshToken",B="clientdb",W="cloudfunction",H="cloudobject";function z(e){return F[e]||(F[e]=[]),F[e]}function J(e,t){const n=z(e);n.includes(t)||n.push(t)}function G(e,t){const n=z(e),s=n.indexOf(t);-1!==s&&n.splice(s,1)}function V(e,t){const n=z(e);for(let e=0;e<n.length;e++){(0,n[e])(t)}}let Y,Q=!1;function X(){return Y||(Y=new Promise((e=>{Q&&e(),function t(){if("function"==typeof getCurrentPages){const t=getCurrentPages();t&&t[0]&&(Q=!0,e())}Q||setTimeout((()=>{t()}),30)}()})),Y)}function Z(e){const t={};for(const n in e){const s=e[n];g(s)&&(t[n]=m(s))}return t}class ee extends Error{constructor(e){super(e.message),this.errMsg=e.message||e.errMsg||"unknown system error",this.code=this.errCode=e.code||e.errCode||"SYSTEM_ERROR",this.errSubject=this.subject=e.subject||e.errSubject,this.cause=e.cause,this.requestId=e.requestId}toJson(e=0){if(!(e>=10))return e++,{errCode:this.errCode,errMsg:this.errMsg,errSubject:this.errSubject,cause:this.cause&&this.cause.toJson?this.cause.toJson(e):this.cause}}}var te={request:e=>uni.request(e),uploadFile:e=>uni.uploadFile(e),setStorageSync:(e,t)=>uni.setStorageSync(e,t),getStorageSync:e=>uni.getStorageSync(e),removeStorageSync:e=>uni.removeStorageSync(e),clearStorageSync:()=>uni.clearStorageSync()};function ne(e){return e&&ne(e.__v_raw)||e}function se(){return{token:te.getStorageSync("uni_id_token")||te.getStorageSync("uniIdToken"),tokenExpired:te.getStorageSync("uni_id_token_expired")}}function re({token:e,tokenExpired:t}={}){e&&te.setStorageSync("uni_id_token",e),t&&te.setStorageSync("uni_id_token_expired",t)}let ie,oe;function ae(){return ie||(ie=uni.getSystemInfoSync()),ie}function ce(){let e,t;try{if(uni.getLaunchOptionsSync){if(uni.getLaunchOptionsSync.toString().indexOf("not yet implemented")>-1)return;const{scene:n,channel:s}=uni.getLaunchOptionsSync();e=s,t=n}}catch(e){}return{channel:e,scene:t}}function ue(){const e=uni.getLocale&&uni.getLocale()||"en";if(oe)return{...oe,locale:e,LOCALE:e};const t=ae(),{deviceId:n,osName:s,uniPlatform:r,appId:i}=t,o=["pixelRatio","brand","model","system","language","version","platform","host","SDKVersion","swanNativeVersion","app","AppPlatform","fontSizeSetting"];for(let e=0;e<o.length;e++){delete t[o[e]]}return oe={PLATFORM:r,OS:s,APPID:i,DEVICEID:n,...ce(),...t},{...oe,locale:e,LOCALE:e}}var he={sign:function(e,t){let n="";return Object.keys(e).sort().forEach((function(t){e[t]&&(n=n+"&"+t+"="+e[t])})),n=n.slice(1),r(n,t).toString()},wrappedRequest:function(e,t){return new Promise(((n,s)=>{t(Object.assign(e,{complete(e){e||(e={}),I&&"web"===A&&e.errMsg&&0===e.errMsg.indexOf("request:fail")&&console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");const t=e.data&&e.data.header&&e.data.header["x-serverless-request-id"]||e.header&&e.header["request-id"];if(!e.statusCode||e.statusCode>=400)return s(new ee({code:"SYS_ERR",message:e.errMsg||"request:fail",requestId:t}));const r=e.data;if(r.error)return s(new ee({code:r.error.code,message:r.error.message,requestId:t}));r.result=r.data,r.requestId=t,delete r.data,n(r)}}))}))},toBase64:function(e){return o.stringify(i.parse(e))}};var le=class{constructor(e){["spaceId","clientSecret"].forEach((t=>{if(!Object.prototype.hasOwnProperty.call(e,t))throw new Error(`${t} required`)})),this.config=Object.assign({},{endpoint:0===e.spaceId.indexOf("mp-")?"https://api.next.bspapp.com":"https://api.bspapp.com"},e),this.config.provider="aliyun",this.config.requestUrl=this.config.endpoint+"/client",this.config.envType=this.config.envType||"public",this.config.accessTokenKey="access_token_"+this.config.spaceId,this.adapter=te,this._getAccessTokenPromiseHub=new w({createPromise:()=>this.requestAuth(this.setupRequest({method:"serverless.auth.user.anonymousAuthorize",params:"{}"},"auth")).then((e=>{if(!e.result||!e.result.accessToken)throw new ee({code:"AUTH_FAILED",message:"获取accessToken失败"});this.setAccessToken(e.result.accessToken)})),retryRule:_})}get hasAccessToken(){return!!this.accessToken}setAccessToken(e){this.accessToken=e}requestWrapped(e){return he.wrappedRequest(e,this.adapter.request)}requestAuth(e){return this.requestWrapped(e)}request(e,t){return Promise.resolve().then((()=>this.hasAccessToken?t?this.requestWrapped(e):this.requestWrapped(e).catch((t=>new Promise(((e,n)=>{!t||"GATEWAY_INVALID_TOKEN"!==t.code&&"InvalidParameter.InvalidToken"!==t.code?n(t):e()})).then((()=>this.getAccessToken())).then((()=>{const t=this.rebuildRequest(e);return this.request(t,!0)})))):this.getAccessToken().then((()=>{const t=this.rebuildRequest(e);return this.request(t,!0)}))))}rebuildRequest(e){const t=Object.assign({},e);return t.data.token=this.accessToken,t.header["x-basement-token"]=this.accessToken,t.header["x-serverless-sign"]=he.sign(t.data,this.config.clientSecret),t}setupRequest(e,t){const n=Object.assign({},e,{spaceId:this.config.spaceId,timestamp:Date.now()}),s={"Content-Type":"application/json"};return"auth"!==t&&(n.token=this.accessToken,s["x-basement-token"]=this.accessToken),s["x-serverless-sign"]=he.sign(n,this.config.clientSecret),{url:this.config.requestUrl,method:"POST",data:n,dataType:"json",header:s}}getAccessToken(){return this._getAccessTokenPromiseHub.exec()}async authorize(){await this.getAccessToken()}callFunction(e){const t={method:"serverless.function.runtime.invoke",params:JSON.stringify({functionTarget:e.name,functionArgs:e.data||{}})};return this.request(this.setupRequest(t))}getOSSUploadOptionsFromPath(e){const t={method:"serverless.file.resource.generateProximalSign",params:JSON.stringify(e)};return this.request(this.setupRequest(t))}uploadFileToOSS({url:e,formData:t,name:n,filePath:s,fileType:r,onUploadProgress:i}){return new Promise(((o,a)=>{const c=this.adapter.uploadFile({url:e,formData:t,name:n,filePath:s,fileType:r,header:{"X-OSS-server-side-encrpytion":"AES256"},success(e){e&&e.statusCode<400?o(e):a(new ee({code:"UPLOAD_FAILED",message:"文件上传失败"}))},fail(e){a(new ee({code:e.code||"UPLOAD_FAILED",message:e.message||e.errMsg||"文件上传失败"}))}});"function"==typeof i&&c&&"function"==typeof c.onProgressUpdate&&c.onProgressUpdate((e=>{i({loaded:e.totalBytesSent,total:e.totalBytesExpectedToSend})}))}))}reportOSSUpload(e){const t={method:"serverless.file.resource.report",params:JSON.stringify(e)};return this.request(this.setupRequest(t))}async uploadFile({filePath:e,cloudPath:t,fileType:n="image",cloudPathAsRealPath:s=!1,onUploadProgress:r,config:i}){if("string"!==p(t))throw new ee({code:"INVALID_PARAM",message:"cloudPath必须为字符串类型"});if(!(t=t.trim()))throw new ee({code:"INVALID_PARAM",message:"cloudPath不可为空"});if(/:\/\//.test(t))throw new ee({code:"INVALID_PARAM",message:"cloudPath不合法"});const o=i&&i.envType||this.config.envType;if(s&&("/"!==t[0]&&(t="/"+t),t.indexOf("\\")>-1))throw new ee({code:"INVALID_PARAM",message:"使用cloudPath作为路径时，cloudPath不可包含“\\”"});const a=(await this.getOSSUploadOptionsFromPath({env:o,filename:s?t.split("/").pop():t,fileId:s?t:void 0})).result,c="https://"+a.cdnDomain+"/"+a.ossPath,{securityToken:u,accessKeyId:h,signature:l,host:d,ossPath:f,id:g,policy:m,ossCallbackUrl:y}=a,_={"Cache-Control":"max-age=2592000","Content-Disposition":"attachment",OSSAccessKeyId:h,Signature:l,host:d,id:g,key:f,policy:m,success_action_status:200};if(u&&(_["x-oss-security-token"]=u),y){const e=JSON.stringify({callbackUrl:y,callbackBody:JSON.stringify({fileId:g,spaceId:this.config.spaceId}),callbackBodyType:"application/json"});_.callback=he.toBase64(e)}const w={url:"https://"+a.host,formData:_,fileName:"file",name:"file",filePath:e,fileType:n};if(await this.uploadFileToOSS(Object.assign({},w,{onUploadProgress:r})),y)return{success:!0,filePath:e,fileID:c};if((await this.reportOSSUpload({id:g})).success)return{success:!0,filePath:e,fileID:c};throw new ee({code:"UPLOAD_FAILED",message:"文件上传失败"})}getTempFileURL({fileList:e}={}){return new Promise(((t,n)=>{Array.isArray(e)&&0!==e.length||n(new ee({code:"INVALID_PARAM",message:"fileList的元素必须是非空的字符串"})),t({fileList:e.map((e=>({fileID:e,tempFileURL:e})))})}))}async getFileInfo({fileList:e}={}){if(!Array.isArray(e)||0===e.length)throw new ee({code:"INVALID_PARAM",message:"fileList的元素必须是非空的字符串"});const t={method:"serverless.file.resource.info",params:JSON.stringify({id:e.map((e=>e.split("?")[0])).join(",")})};return{fileList:(await this.request(this.setupRequest(t))).result}}};var de={init(e){const t=new le(e),n={signInAnonymously:function(){return t.authorize()},getLoginState:function(){return Promise.resolve(!1)}};return t.auth=function(){return n},t.customAuth=t.auth,t}};const pe="undefined"!=typeof location&&"http:"===location.protocol?"http:":"https:";var fe;!function(e){e.local="local",e.none="none",e.session="session"}(fe||(fe={}));var ge=function(){},me=t((function(e,t){var n;e.exports=(n=s,function(e){var t=n,s=t.lib,r=s.WordArray,i=s.Hasher,o=t.algo,a=[],c=[];!function(){function t(t){for(var n=e.sqrt(t),s=2;s<=n;s++)if(!(t%s))return!1;return!0}function n(e){return 4294967296*(e-(0|e))|0}for(var s=2,r=0;r<64;)t(s)&&(r<8&&(a[r]=n(e.pow(s,.5))),c[r]=n(e.pow(s,1/3)),r++),s++}();var u=[],h=o.SHA256=i.extend({_doReset:function(){this._hash=new r.init(a.slice(0))},_doProcessBlock:function(e,t){for(var n=this._hash.words,s=n[0],r=n[1],i=n[2],o=n[3],a=n[4],h=n[5],l=n[6],d=n[7],p=0;p<64;p++){if(p<16)u[p]=0|e[t+p];else{var f=u[p-15],g=(f<<25|f>>>7)^(f<<14|f>>>18)^f>>>3,m=u[p-2],y=(m<<15|m>>>17)^(m<<13|m>>>19)^m>>>10;u[p]=g+u[p-7]+y+u[p-16]}var _=s&r^s&i^r&i,w=(s<<30|s>>>2)^(s<<19|s>>>13)^(s<<10|s>>>22),v=d+((a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25))+(a&h^~a&l)+c[p]+u[p];d=l,l=h,h=a,a=o+v|0,o=i,i=r,r=s,s=v+(w+_)|0}n[0]=n[0]+s|0,n[1]=n[1]+r|0,n[2]=n[2]+i|0,n[3]=n[3]+o|0,n[4]=n[4]+a|0,n[5]=n[5]+h|0,n[6]=n[6]+l|0,n[7]=n[7]+d|0},_doFinalize:function(){var t=this._data,n=t.words,s=8*this._nDataBytes,r=8*t.sigBytes;return n[r>>>5]|=128<<24-r%32,n[14+(r+64>>>9<<4)]=e.floor(s/4294967296),n[15+(r+64>>>9<<4)]=s,t.sigBytes=4*n.length,this._process(),this._hash},clone:function(){var e=i.clone.call(this);return e._hash=this._hash.clone(),e}});t.SHA256=i._createHelper(h),t.HmacSHA256=i._createHmacHelper(h)}(Math),n.SHA256)})),ye=me,_e=t((function(e,t){e.exports=s.HmacSHA256}));const we=()=>{let e;if(!Promise){e=()=>{},e.promise={};const t=()=>{throw new ee({message:'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.'})};return Object.defineProperty(e.promise,"then",{get:t}),Object.defineProperty(e.promise,"catch",{get:t}),e}const t=new Promise(((t,n)=>{e=(e,s)=>e?n(e):t(s)}));return e.promise=t,e};function ve(e){return void 0===e}function Ie(e){return"[object Null]"===Object.prototype.toString.call(e)}var Se;function ke(e){const t=(n=e,"[object Array]"===Object.prototype.toString.call(n)?e:[e]);var n;for(const e of t){const{isMatch:t,genAdapter:n,runtime:s}=e;if(t())return{adapter:n(),runtime:s}}}!function(e){e.WEB="web",e.WX_MP="wx_mp"}(Se||(Se={}));const be={adapter:null,runtime:void 0},Ae=["anonymousUuidKey"];class Pe extends ge{constructor(){super(),be.adapter.root.tcbObject||(be.adapter.root.tcbObject={})}setItem(e,t){be.adapter.root.tcbObject[e]=t}getItem(e){return be.adapter.root.tcbObject[e]}removeItem(e){delete be.adapter.root.tcbObject[e]}clear(){delete be.adapter.root.tcbObject}}function Te(e,t){switch(e){case"local":return t.localStorage||new Pe;case"none":return new Pe;default:return t.sessionStorage||new Pe}}class Ce{constructor(e){if(!this._storage){this._persistence=be.adapter.primaryStorage||e.persistence,this._storage=Te(this._persistence,be.adapter);const t=`access_token_${e.env}`,n=`access_token_expire_${e.env}`,s=`refresh_token_${e.env}`,r=`anonymous_uuid_${e.env}`,i=`login_type_${e.env}`,o=`user_info_${e.env}`;this.keys={accessTokenKey:t,accessTokenExpireKey:n,refreshTokenKey:s,anonymousUuidKey:r,loginTypeKey:i,userInfoKey:o}}}updatePersistence(e){if(e===this._persistence)return;const t="local"===this._persistence;this._persistence=e;const n=Te(e,be.adapter);for(const e in this.keys){const s=this.keys[e];if(t&&Ae.includes(e))continue;const r=this._storage.getItem(s);ve(r)||Ie(r)||(n.setItem(s,r),this._storage.removeItem(s))}this._storage=n}setStore(e,t,n){if(!this._storage)return;const s={version:n||"localCachev1",content:t},r=JSON.stringify(s);try{this._storage.setItem(e,r)}catch(e){throw e}}getStore(e,t){try{if(!this._storage)return}catch(e){return""}t=t||"localCachev1";const n=this._storage.getItem(e);if(!n)return"";if(n.indexOf(t)>=0){return JSON.parse(n).content}return""}removeStore(e){this._storage.removeItem(e)}}const xe={},Oe={};function Ee(e){return xe[e]}class Le{constructor(e,t){this.data=t||null,this.name=e}}class Re extends Le{constructor(e,t){super("error",{error:e,data:t}),this.error=e}}const Ue=new class{constructor(){this._listeners={}}on(e,t){return function(e,t,n){n[e]=n[e]||[],n[e].push(t)}(e,t,this._listeners),this}off(e,t){return function(e,t,n){if(n&&n[e]){const s=n[e].indexOf(t);-1!==s&&n[e].splice(s,1)}}(e,t,this._listeners),this}fire(e,t){if(e instanceof Re)return console.error(e.error),this;const n="string"==typeof e?new Le(e,t||{}):e;const s=n.name;if(this._listens(s)){n.target=this;const e=this._listeners[s]?[...this._listeners[s]]:[];for(const t of e)t.call(this,n)}return this}_listens(e){return this._listeners[e]&&this._listeners[e].length>0}};function Ne(e,t){Ue.on(e,t)}function De(e,t={}){Ue.fire(e,t)}function Me(e,t){Ue.off(e,t)}const qe="loginStateChanged",Fe="loginStateExpire",Ke="loginTypeChanged",je="anonymousConverted",$e="refreshAccessToken";var Be;!function(e){e.ANONYMOUS="ANONYMOUS",e.WECHAT="WECHAT",e.WECHAT_PUBLIC="WECHAT-PUBLIC",e.WECHAT_OPEN="WECHAT-OPEN",e.CUSTOM="CUSTOM",e.EMAIL="EMAIL",e.USERNAME="USERNAME",e.NULL="NULL"}(Be||(Be={}));const We=["auth.getJwt","auth.logout","auth.signInWithTicket","auth.signInAnonymously","auth.signIn","auth.fetchAccessTokenWithRefreshToken","auth.signUpWithEmailAndPassword","auth.activateEndUserMail","auth.sendPasswordResetEmail","auth.resetPasswordWithToken","auth.isUsernameRegistered"],He={"X-SDK-Version":"1.3.5"};function ze(e,t,n){const s=e[t];e[t]=function(t){const r={},i={};n.forEach((n=>{const{data:s,headers:o}=n.call(e,t);Object.assign(r,s),Object.assign(i,o)}));const o=t.data;return o&&(()=>{var e;if(e=o,"[object FormData]"!==Object.prototype.toString.call(e))t.data={...o,...r};else for(const e in r)o.append(e,r[e])})(),t.headers={...t.headers||{},...i},s.call(e,t)}}function Je(){const e=Math.random().toString(16).slice(2);return{data:{seqId:e},headers:{...He,"x-seqid":e}}}class Ge{constructor(e={}){var t;this.config=e,this._reqClass=new be.adapter.reqClass({timeout:this.config.timeout,timeoutMsg:`请求在${this.config.timeout/1e3}s内未完成，已中断`,restrictedMethods:["post"]}),this._cache=Ee(this.config.env),this._localCache=(t=this.config.env,Oe[t]),ze(this._reqClass,"post",[Je]),ze(this._reqClass,"upload",[Je]),ze(this._reqClass,"download",[Je])}async post(e){return await this._reqClass.post(e)}async upload(e){return await this._reqClass.upload(e)}async download(e){return await this._reqClass.download(e)}async refreshAccessToken(){let e,t;this._refreshAccessTokenPromise||(this._refreshAccessTokenPromise=this._refreshAccessToken());try{e=await this._refreshAccessTokenPromise}catch(e){t=e}if(this._refreshAccessTokenPromise=null,this._shouldRefreshAccessTokenHook=null,t)throw t;return e}async _refreshAccessToken(){const{accessTokenKey:e,accessTokenExpireKey:t,refreshTokenKey:n,loginTypeKey:s,anonymousUuidKey:r}=this._cache.keys;this._cache.removeStore(e),this._cache.removeStore(t);let i=this._cache.getStore(n);if(!i)throw new ee({message:"未登录CloudBase"});const o={refresh_token:i},a=await this.request("auth.fetchAccessTokenWithRefreshToken",o);if(a.data.code){const{code:e}=a.data;if("SIGN_PARAM_INVALID"===e||"REFRESH_TOKEN_EXPIRED"===e||"INVALID_REFRESH_TOKEN"===e){if(this._cache.getStore(s)===Be.ANONYMOUS&&"INVALID_REFRESH_TOKEN"===e){const e=this._cache.getStore(r),t=this._cache.getStore(n),s=await this.send("auth.signInAnonymously",{anonymous_uuid:e,refresh_token:t});return this.setRefreshToken(s.refresh_token),this._refreshAccessToken()}De(Fe),this._cache.removeStore(n)}throw new ee({code:a.data.code,message:`刷新access token失败：${a.data.code}`})}if(a.data.access_token)return De($e),this._cache.setStore(e,a.data.access_token),this._cache.setStore(t,a.data.access_token_expire+Date.now()),{accessToken:a.data.access_token,accessTokenExpire:a.data.access_token_expire};a.data.refresh_token&&(this._cache.removeStore(n),this._cache.setStore(n,a.data.refresh_token),this._refreshAccessToken())}async getAccessToken(){const{accessTokenKey:e,accessTokenExpireKey:t,refreshTokenKey:n}=this._cache.keys;if(!this._cache.getStore(n))throw new ee({message:"refresh token不存在，登录状态异常"});let s=this._cache.getStore(e),r=this._cache.getStore(t),i=!0;return this._shouldRefreshAccessTokenHook&&!await this._shouldRefreshAccessTokenHook(s,r)&&(i=!1),(!s||!r||r<Date.now())&&i?this.refreshAccessToken():{accessToken:s,accessTokenExpire:r}}async request(e,t,n){const s=`x-tcb-trace_${this.config.env}`;let r="application/x-www-form-urlencoded";const i={action:e,env:this.config.env,dataVersion:"2019-08-16",...t};if(-1===We.indexOf(e)){const{refreshTokenKey:e}=this._cache.keys;this._cache.getStore(e)&&(i.access_token=(await this.getAccessToken()).accessToken)}let o;if("storage.uploadFile"===e){o=new FormData;for(let e in o)o.hasOwnProperty(e)&&void 0!==o[e]&&o.append(e,i[e]);r="multipart/form-data"}else{r="application/json",o={};for(let e in i)void 0!==i[e]&&(o[e]=i[e])}let a={headers:{"content-type":r}};n&&n.onUploadProgress&&(a.onUploadProgress=n.onUploadProgress);const c=this._localCache.getStore(s);c&&(a.headers["X-TCB-Trace"]=c);const{parse:u,inQuery:h,search:l}=t;let d={env:this.config.env};u&&(d.parse=!0),h&&(d={...h,...d});let p=function(e,t,n={}){const s=/\?/.test(t);let r="";for(let e in n)""===r?!s&&(t+="?"):r+="&",r+=`${e}=${encodeURIComponent(n[e])}`;return/^http(s)?\:\/\//.test(t+=r)?t:`${e}${t}`}(pe,"//tcb-api.tencentcloudapi.com/web",d);l&&(p+=l);const f=await this.post({url:p,data:o,...a}),g=f.header&&f.header["x-tcb-trace"];if(g&&this._localCache.setStore(s,g),200!==Number(f.status)&&200!==Number(f.statusCode)||!f.data)throw new ee({code:"NETWORK_ERROR",message:"network request error"});return f}async send(e,t={}){const n=await this.request(e,t,{onUploadProgress:t.onUploadProgress});if("ACCESS_TOKEN_EXPIRED"===n.data.code&&-1===We.indexOf(e)){await this.refreshAccessToken();const n=await this.request(e,t,{onUploadProgress:t.onUploadProgress});if(n.data.code)throw new ee({code:n.data.code,message:n.data.message});return n.data}if(n.data.code)throw new ee({code:n.data.code,message:n.data.message});return n.data}setRefreshToken(e){const{accessTokenKey:t,accessTokenExpireKey:n,refreshTokenKey:s}=this._cache.keys;this._cache.removeStore(t),this._cache.removeStore(n),this._cache.setStore(s,e)}}const Ve={};function Ye(e){return Ve[e]}class Qe{constructor(e){this.config=e,this._cache=Ee(e.env),this._request=Ye(e.env)}setRefreshToken(e){const{accessTokenKey:t,accessTokenExpireKey:n,refreshTokenKey:s}=this._cache.keys;this._cache.removeStore(t),this._cache.removeStore(n),this._cache.setStore(s,e)}setAccessToken(e,t){const{accessTokenKey:n,accessTokenExpireKey:s}=this._cache.keys;this._cache.setStore(n,e),this._cache.setStore(s,t)}async refreshUserInfo(){const{data:e}=await this._request.send("auth.getUserInfo",{});return this.setLocalUserInfo(e),e}setLocalUserInfo(e){const{userInfoKey:t}=this._cache.keys;this._cache.setStore(t,e)}}class Xe{constructor(e){if(!e)throw new ee({code:"PARAM_ERROR",message:"envId is not defined"});this._envId=e,this._cache=Ee(this._envId),this._request=Ye(this._envId),this.setUserInfo()}linkWithTicket(e){if("string"!=typeof e)throw new ee({code:"PARAM_ERROR",message:"ticket must be string"});return this._request.send("auth.linkWithTicket",{ticket:e})}linkWithRedirect(e){e.signInWithRedirect()}updatePassword(e,t){return this._request.send("auth.updatePassword",{oldPassword:t,newPassword:e})}updateEmail(e){return this._request.send("auth.updateEmail",{newEmail:e})}updateUsername(e){if("string"!=typeof e)throw new ee({code:"PARAM_ERROR",message:"username must be a string"});return this._request.send("auth.updateUsername",{username:e})}async getLinkedUidList(){const{data:e}=await this._request.send("auth.getLinkedUidList",{});let t=!1;const{users:n}=e;return n.forEach((e=>{e.wxOpenId&&e.wxPublicId&&(t=!0)})),{users:n,hasPrimaryUid:t}}setPrimaryUid(e){return this._request.send("auth.setPrimaryUid",{uid:e})}unlink(e){return this._request.send("auth.unlink",{platform:e})}async update(e){const{nickName:t,gender:n,avatarUrl:s,province:r,country:i,city:o}=e,{data:a}=await this._request.send("auth.updateUserInfo",{nickName:t,gender:n,avatarUrl:s,province:r,country:i,city:o});this.setLocalUserInfo(a)}async refresh(){const{data:e}=await this._request.send("auth.getUserInfo",{});return this.setLocalUserInfo(e),e}setUserInfo(){const{userInfoKey:e}=this._cache.keys,t=this._cache.getStore(e);["uid","loginType","openid","wxOpenId","wxPublicId","unionId","qqMiniOpenId","email","hasPassword","customUserId","nickName","gender","avatarUrl"].forEach((e=>{this[e]=t[e]})),this.location={country:t.country,province:t.province,city:t.city}}setLocalUserInfo(e){const{userInfoKey:t}=this._cache.keys;this._cache.setStore(t,e),this.setUserInfo()}}class Ze{constructor(e){if(!e)throw new ee({code:"PARAM_ERROR",message:"envId is not defined"});this._cache=Ee(e);const{refreshTokenKey:t,accessTokenKey:n,accessTokenExpireKey:s}=this._cache.keys,r=this._cache.getStore(t),i=this._cache.getStore(n),o=this._cache.getStore(s);this.credential={refreshToken:r,accessToken:i,accessTokenExpire:o},this.user=new Xe(e)}get isAnonymousAuth(){return this.loginType===Be.ANONYMOUS}get isCustomAuth(){return this.loginType===Be.CUSTOM}get isWeixinAuth(){return this.loginType===Be.WECHAT||this.loginType===Be.WECHAT_OPEN||this.loginType===Be.WECHAT_PUBLIC}get loginType(){return this._cache.getStore(this._cache.keys.loginTypeKey)}}class et extends Qe{async signIn(){this._cache.updatePersistence("local");const{anonymousUuidKey:e,refreshTokenKey:t}=this._cache.keys,n=this._cache.getStore(e)||void 0,s=this._cache.getStore(t)||void 0,r=await this._request.send("auth.signInAnonymously",{anonymous_uuid:n,refresh_token:s});if(r.uuid&&r.refresh_token){this._setAnonymousUUID(r.uuid),this.setRefreshToken(r.refresh_token),await this._request.refreshAccessToken(),De(qe),De(Ke,{env:this.config.env,loginType:Be.ANONYMOUS,persistence:"local"});const e=new Ze(this.config.env);return await e.user.refresh(),e}throw new ee({message:"匿名登录失败"})}async linkAndRetrieveDataWithTicket(e){const{anonymousUuidKey:t,refreshTokenKey:n}=this._cache.keys,s=this._cache.getStore(t),r=this._cache.getStore(n),i=await this._request.send("auth.linkAndRetrieveDataWithTicket",{anonymous_uuid:s,refresh_token:r,ticket:e});if(i.refresh_token)return this._clearAnonymousUUID(),this.setRefreshToken(i.refresh_token),await this._request.refreshAccessToken(),De(je,{env:this.config.env}),De(Ke,{loginType:Be.CUSTOM,persistence:"local"}),{credential:{refreshToken:i.refresh_token}};throw new ee({message:"匿名转化失败"})}_setAnonymousUUID(e){const{anonymousUuidKey:t,loginTypeKey:n}=this._cache.keys;this._cache.removeStore(t),this._cache.setStore(t,e),this._cache.setStore(n,Be.ANONYMOUS)}_clearAnonymousUUID(){this._cache.removeStore(this._cache.keys.anonymousUuidKey)}}class tt extends Qe{async signIn(e){if("string"!=typeof e)throw new ee({code:"PARAM_ERROR",message:"ticket must be a string"});const{refreshTokenKey:t}=this._cache.keys,n=await this._request.send("auth.signInWithTicket",{ticket:e,refresh_token:this._cache.getStore(t)||""});if(n.refresh_token)return this.setRefreshToken(n.refresh_token),await this._request.refreshAccessToken(),De(qe),De(Ke,{env:this.config.env,loginType:Be.CUSTOM,persistence:this.config.persistence}),await this.refreshUserInfo(),new Ze(this.config.env);throw new ee({message:"自定义登录失败"})}}class nt extends Qe{async signIn(e,t){if("string"!=typeof e)throw new ee({code:"PARAM_ERROR",message:"email must be a string"});const{refreshTokenKey:n}=this._cache.keys,s=await this._request.send("auth.signIn",{loginType:"EMAIL",email:e,password:t,refresh_token:this._cache.getStore(n)||""}),{refresh_token:r,access_token:i,access_token_expire:o}=s;if(r)return this.setRefreshToken(r),i&&o?this.setAccessToken(i,o):await this._request.refreshAccessToken(),await this.refreshUserInfo(),De(qe),De(Ke,{env:this.config.env,loginType:Be.EMAIL,persistence:this.config.persistence}),new Ze(this.config.env);throw s.code?new ee({code:s.code,message:`邮箱登录失败: ${s.message}`}):new ee({message:"邮箱登录失败"})}async activate(e){return this._request.send("auth.activateEndUserMail",{token:e})}async resetPasswordWithToken(e,t){return this._request.send("auth.resetPasswordWithToken",{token:e,newPassword:t})}}class st extends Qe{async signIn(e,t){if("string"!=typeof e)throw new ee({code:"PARAM_ERROR",message:"username must be a string"});"string"!=typeof t&&(t="",console.warn("password is empty"));const{refreshTokenKey:n}=this._cache.keys,s=await this._request.send("auth.signIn",{loginType:Be.USERNAME,username:e,password:t,refresh_token:this._cache.getStore(n)||""}),{refresh_token:r,access_token_expire:i,access_token:o}=s;if(r)return this.setRefreshToken(r),o&&i?this.setAccessToken(o,i):await this._request.refreshAccessToken(),await this.refreshUserInfo(),De(qe),De(Ke,{env:this.config.env,loginType:Be.USERNAME,persistence:this.config.persistence}),new Ze(this.config.env);throw s.code?new ee({code:s.code,message:`用户名密码登录失败: ${s.message}`}):new ee({message:"用户名密码登录失败"})}}class rt{constructor(e){this.config=e,this._cache=Ee(e.env),this._request=Ye(e.env),this._onAnonymousConverted=this._onAnonymousConverted.bind(this),this._onLoginTypeChanged=this._onLoginTypeChanged.bind(this),Ne(Ke,this._onLoginTypeChanged)}get currentUser(){const e=this.hasLoginState();return e&&e.user||null}get loginType(){return this._cache.getStore(this._cache.keys.loginTypeKey)}anonymousAuthProvider(){return new et(this.config)}customAuthProvider(){return new tt(this.config)}emailAuthProvider(){return new nt(this.config)}usernameAuthProvider(){return new st(this.config)}async signInAnonymously(){return new et(this.config).signIn()}async signInWithEmailAndPassword(e,t){return new nt(this.config).signIn(e,t)}signInWithUsernameAndPassword(e,t){return new st(this.config).signIn(e,t)}async linkAndRetrieveDataWithTicket(e){this._anonymousAuthProvider||(this._anonymousAuthProvider=new et(this.config)),Ne(je,this._onAnonymousConverted);return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e)}async signOut(){if(this.loginType===Be.ANONYMOUS)throw new ee({message:"匿名用户不支持登出操作"});const{refreshTokenKey:e,accessTokenKey:t,accessTokenExpireKey:n}=this._cache.keys,s=this._cache.getStore(e);if(!s)return;const r=await this._request.send("auth.logout",{refresh_token:s});return this._cache.removeStore(e),this._cache.removeStore(t),this._cache.removeStore(n),De(qe),De(Ke,{env:this.config.env,loginType:Be.NULL,persistence:this.config.persistence}),r}async signUpWithEmailAndPassword(e,t){return this._request.send("auth.signUpWithEmailAndPassword",{email:e,password:t})}async sendPasswordResetEmail(e){return this._request.send("auth.sendPasswordResetEmail",{email:e})}onLoginStateChanged(e){Ne(qe,(()=>{const t=this.hasLoginState();e.call(this,t)}));const t=this.hasLoginState();e.call(this,t)}onLoginStateExpired(e){Ne(Fe,e.bind(this))}onAccessTokenRefreshed(e){Ne($e,e.bind(this))}onAnonymousConverted(e){Ne(je,e.bind(this))}onLoginTypeChanged(e){Ne(Ke,(()=>{const t=this.hasLoginState();e.call(this,t)}))}async getAccessToken(){return{accessToken:(await this._request.getAccessToken()).accessToken,env:this.config.env}}hasLoginState(){const{refreshTokenKey:e}=this._cache.keys;return this._cache.getStore(e)?new Ze(this.config.env):null}async isUsernameRegistered(e){if("string"!=typeof e)throw new ee({code:"PARAM_ERROR",message:"username must be a string"});const{data:t}=await this._request.send("auth.isUsernameRegistered",{username:e});return t&&t.isRegistered}getLoginState(){return Promise.resolve(this.hasLoginState())}async signInWithTicket(e){return new tt(this.config).signIn(e)}shouldRefreshAccessToken(e){this._request._shouldRefreshAccessTokenHook=e.bind(this)}getUserInfo(){return this._request.send("auth.getUserInfo",{}).then((e=>e.code?e:{...e.data,requestId:e.seqId}))}getAuthHeader(){const{refreshTokenKey:e,accessTokenKey:t}=this._cache.keys,n=this._cache.getStore(e);return{"x-cloudbase-credentials":this._cache.getStore(t)+"/@@/"+n}}_onAnonymousConverted(e){const{env:t}=e.data;t===this.config.env&&this._cache.updatePersistence(this.config.persistence)}_onLoginTypeChanged(e){const{loginType:t,persistence:n,env:s}=e.data;s===this.config.env&&(this._cache.updatePersistence(n),this._cache.setStore(this._cache.keys.loginTypeKey,t))}}const it=function(e,t){t=t||we();const n=Ye(this.config.env),{cloudPath:s,filePath:r,onUploadProgress:i,fileType:o="image"}=e;return n.send("storage.getUploadMetadata",{path:s}).then((e=>{const{data:{url:a,authorization:c,token:u,fileId:h,cosFileId:l},requestId:d}=e,p={key:s,signature:c,"x-cos-meta-fileid":l,success_action_status:"201","x-cos-security-token":u};n.upload({url:a,data:p,file:r,name:s,fileType:o,onUploadProgress:i}).then((e=>{201===e.statusCode?t(null,{fileID:h,requestId:d}):t(new ee({code:"STORAGE_REQUEST_FAIL",message:`STORAGE_REQUEST_FAIL: ${e.data}`}))})).catch((e=>{t(e)}))})).catch((e=>{t(e)})),t.promise},ot=function(e,t){t=t||we();const n=Ye(this.config.env),{cloudPath:s}=e;return n.send("storage.getUploadMetadata",{path:s}).then((e=>{t(null,e)})).catch((e=>{t(e)})),t.promise},at=function({fileList:e},t){if(t=t||we(),!e||!Array.isArray(e))return{code:"INVALID_PARAM",message:"fileList必须是非空的数组"};for(let t of e)if(!t||"string"!=typeof t)return{code:"INVALID_PARAM",message:"fileList的元素必须是非空的字符串"};const n={fileid_list:e};return Ye(this.config.env).send("storage.batchDeleteFile",n).then((e=>{e.code?t(null,e):t(null,{fileList:e.data.delete_list,requestId:e.requestId})})).catch((e=>{t(e)})),t.promise},ct=function({fileList:e},t){t=t||we(),e&&Array.isArray(e)||t(null,{code:"INVALID_PARAM",message:"fileList必须是非空的数组"});let n=[];for(let s of e)"object"==typeof s?(s.hasOwnProperty("fileID")&&s.hasOwnProperty("maxAge")||t(null,{code:"INVALID_PARAM",message:"fileList的元素必须是包含fileID和maxAge的对象"}),n.push({fileid:s.fileID,max_age:s.maxAge})):"string"==typeof s?n.push({fileid:s}):t(null,{code:"INVALID_PARAM",message:"fileList的元素必须是字符串"});const s={file_list:n};return Ye(this.config.env).send("storage.batchGetDownloadUrl",s).then((e=>{e.code?t(null,e):t(null,{fileList:e.data.download_list,requestId:e.requestId})})).catch((e=>{t(e)})),t.promise},ut=async function({fileID:e},t){const n=(await ct.call(this,{fileList:[{fileID:e,maxAge:600}]})).fileList[0];if("SUCCESS"!==n.code)return t?t(n):new Promise((e=>{e(n)}));const s=Ye(this.config.env);let r=n.download_url;if(r=encodeURI(r),!t)return s.download({url:r});t(await s.download({url:r}))},ht=function({name:e,data:t,query:n,parse:s,search:r},i){const o=i||we();let a;try{a=t?JSON.stringify(t):""}catch(e){return Promise.reject(e)}if(!e)return Promise.reject(new ee({code:"PARAM_ERROR",message:"函数名不能为空"}));const c={inQuery:n,parse:s,search:r,function_name:e,request_data:a};return Ye(this.config.env).send("functions.invokeFunction",c).then((e=>{if(e.code)o(null,e);else{let t=e.data.response_data;if(s)o(null,{result:t,requestId:e.requestId});else try{t=JSON.parse(e.data.response_data),o(null,{result:t,requestId:e.requestId})}catch(e){o(new ee({message:"response data must be json"}))}}return o.promise})).catch((e=>{o(e)})),o.promise},lt={timeout:15e3,persistence:"session"},dt={};class pt{constructor(e){this.config=e||this.config,this.authObj=void 0}init(e){switch(be.adapter||(this.requestClient=new be.adapter.reqClass({timeout:e.timeout||5e3,timeoutMsg:`请求在${(e.timeout||5e3)/1e3}s内未完成，已中断`})),this.config={...lt,...e},!0){case this.config.timeout>6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"),this.config.timeout=6e5;break;case this.config.timeout<100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"),this.config.timeout=100}return new pt(this.config)}auth({persistence:e}={}){if(this.authObj)return this.authObj;const t=e||be.adapter.primaryStorage||lt.persistence;var n;return t!==this.config.persistence&&(this.config.persistence=t),function(e){const{env:t}=e;xe[t]=new Ce(e),Oe[t]=new Ce({...e,persistence:"local"})}(this.config),n=this.config,Ve[n.env]=new Ge(n),this.authObj=new rt(this.config),this.authObj}on(e,t){return Ne.apply(this,[e,t])}off(e,t){return Me.apply(this,[e,t])}callFunction(e,t){return ht.apply(this,[e,t])}deleteFile(e,t){return at.apply(this,[e,t])}getTempFileURL(e,t){return ct.apply(this,[e,t])}downloadFile(e,t){return ut.apply(this,[e,t])}uploadFile(e,t){return it.apply(this,[e,t])}getUploadMetadata(e,t){return ot.apply(this,[e,t])}registerExtension(e){dt[e.name]=e}async invokeExtension(e,t){const n=dt[e];if(!n)throw new ee({message:`扩展${e} 必须先注册`});return await n.invoke(t,this)}useAdapters(e){const{adapter:t,runtime:n}=ke(e)||{};t&&(be.adapter=t),n&&(be.runtime=n)}}var ft=new pt;function gt(e,t,n){void 0===n&&(n={});var s=/\?/.test(t),r="";for(var i in n)""===r?!s&&(t+="?"):r+="&",r+=i+"="+encodeURIComponent(n[i]);return/^http(s)?:\/\//.test(t+=r)?t:""+e+t}class mt{post(e){const{url:t,data:n,headers:s}=e;return new Promise(((e,r)=>{te.request({url:gt("https:",t),data:n,method:"POST",header:s,success(t){e(t)},fail(e){r(e)}})}))}upload(e){return new Promise(((t,n)=>{const{url:s,file:r,data:i,headers:o,fileType:a}=e,c=te.uploadFile({url:gt("https:",s),name:"file",formData:Object.assign({},i),filePath:r,fileType:a,header:o,success(e){const n={statusCode:e.statusCode,data:e.data||{}};200===e.statusCode&&i.success_action_status&&(n.statusCode=parseInt(i.success_action_status,10)),t(n)},fail(e){n(new Error(e.errMsg||"uploadFile:fail"))}});"function"==typeof e.onUploadProgress&&c&&"function"==typeof c.onProgressUpdate&&c.onProgressUpdate((t=>{e.onUploadProgress({loaded:t.totalBytesSent,total:t.totalBytesExpectedToSend})}))}))}}const yt={setItem(e,t){te.setStorageSync(e,t)},getItem:e=>te.getStorageSync(e),removeItem(e){te.removeStorageSync(e)},clear(){te.clearStorageSync()}};var _t={genAdapter:function(){return{root:{},reqClass:mt,localStorage:yt,primaryStorage:"local"}},isMatch:function(){return!0},runtime:"uni_app"};ft.useAdapters(_t);const wt=ft,vt=wt.init;wt.init=function(e){e.env=e.spaceId;const t=vt.call(this,e);t.config.provider="tencent",t.config.spaceId=e.spaceId;const n=t.auth;return t.auth=function(e){const t=n.call(this,e);return["linkAndRetrieveDataWithTicket","signInAnonymously","signOut","getAccessToken","getLoginState","signInWithTicket","getUserInfo"].forEach((e=>{var n;t[e]=(n=t[e],function(e){e=e||{};const{success:t,fail:s,complete:r}=Z(e);if(!(t||s||r))return n.call(this,e);n.call(this,e).then((e=>{t&&t(e),r&&r(e)}),(e=>{s&&s(e),r&&r(e)}))}).bind(t)})),t},t.customAuth=t.auth,t};var It=wt;var St=class extends le{getAccessToken(){return new Promise(((e,t)=>{const n="Anonymous_Access_token";this.setAccessToken(n),e(n)}))}setupRequest(e,t){const n=Object.assign({},e,{spaceId:this.config.spaceId,timestamp:Date.now()}),s={"Content-Type":"application/json"};"auth"!==t&&(n.token=this.accessToken,s["x-basement-token"]=this.accessToken),s["x-serverless-sign"]=he.sign(n,this.config.clientSecret);const r=ue();s["x-client-info"]=encodeURIComponent(JSON.stringify(r));const{token:i}=se();return s["x-client-token"]=i,{url:this.config.requestUrl,method:"POST",data:n,dataType:"json",header:JSON.parse(JSON.stringify(s))}}uploadFileToOSS({url:e,formData:t,name:n,filePath:s,fileType:r,onUploadProgress:i}){return new Promise(((o,a)=>{const c=this.adapter.uploadFile({url:e,formData:t,name:n,filePath:s,fileType:r,success(e){e&&e.statusCode<400?o(e):a(new ee({code:"UPLOAD_FAILED",message:"文件上传失败"}))},fail(e){a(new ee({code:e.code||"UPLOAD_FAILED",message:e.message||e.errMsg||"文件上传失败"}))}});"function"==typeof i&&c&&"function"==typeof c.onProgressUpdate&&c.onProgressUpdate((e=>{i({loaded:e.totalBytesSent,total:e.totalBytesExpectedToSend})}))}))}uploadFile({filePath:e,cloudPath:t,fileType:n="image",onUploadProgress:s}){if(!t)throw new ee({code:"CLOUDPATH_REQUIRED",message:"cloudPath不可为空"});let r;return this.getOSSUploadOptionsFromPath({cloudPath:t}).then((t=>{const{url:i,formData:o,name:a}=t.result;r=t.result.fileUrl;const c={url:i,formData:o,name:a,filePath:e,fileType:n};return this.uploadFileToOSS(Object.assign({},c,{onUploadProgress:s}))})).then((()=>this.reportOSSUpload({cloudPath:t}))).then((t=>new Promise(((n,s)=>{t.success?n({success:!0,filePath:e,fileID:r}):s(new ee({code:"UPLOAD_FAILED",message:"文件上传失败"}))}))))}deleteFile({fileList:e}){const t={method:"serverless.file.resource.delete",params:JSON.stringify({fileList:e})};return this.request(this.setupRequest(t)).then((e=>{if(e.success)return e.result;throw new ee({code:"DELETE_FILE_FAILED",message:"删除文件失败"})}))}getTempFileURL({fileList:e,maxAge:t}={}){if(!Array.isArray(e)||0===e.length)throw new ee({code:"INVALID_PARAM",message:"fileList的元素必须是非空的字符串"});const n={method:"serverless.file.resource.getTempFileURL",params:JSON.stringify({fileList:e,maxAge:t})};return this.request(this.setupRequest(n)).then((e=>{if(e.success)return{fileList:e.result.fileList.map((e=>({fileID:e.fileID,tempFileURL:e.tempFileURL})))};throw new ee({code:"GET_TEMP_FILE_URL_FAILED",message:"获取临时文件链接失败"})}))}};var kt={init(e){const t=new St(e),n={signInAnonymously:function(){return t.authorize()},getLoginState:function(){return Promise.resolve(!1)}};return t.auth=function(){return n},t.customAuth=t.auth,t}},bt=t((function(e,t){e.exports=s.enc.Hex}));function At(e="",t={}){const{data:n,functionName:s,method:r,headers:i,signHeaderKeys:o=[],config:a}=t,c=Date.now(),u="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})),h=Object.assign({},i,{"x-from-app-id":a.appId,"x-from-env-id":a.envId,"x-to-env-id":a.envId,"x-from-instance-id":c,"x-from-function-name":s,"x-client-timestamp":c,"x-alipay-source":"client","x-request-id":u,"x-alipay-callid":u}),l=["x-from-app-id","x-from-env-id","x-to-env-id","x-from-instance-id","x-from-function-name","x-client-timestamp"].concat(o),[d="",p=""]=e.split("?")||[],f=function(e){const t=e.signedHeaders.join(";"),n=e.signedHeaders.map((t=>`${t.toLowerCase()}:${e.headers[t]}\n`)).join(""),s=ye(e.body).toString(bt),r=`${e.method.toUpperCase()}\n${e.path}\n${e.query}\n${n}\n${t}\n${s}\n`,i=ye(r).toString(bt),o=`HMAC-SHA256\n${e.timestamp}\n${i}\n`,a=_e(o,e.secretKey).toString(bt);return`HMAC-SHA256 Credential=${e.secretId}, SignedHeaders=${t}, Signature=${a}`}({path:d,query:p,method:r,headers:h,timestamp:c,body:JSON.stringify(n),secretId:a.secretId,secretKey:a.secretKey,signedHeaders:l.sort()});return{url:`${a.endpoint}${e.replace(/^\//,"")}`,headers:Object.assign({},h,{Authorization:f})}}function Pt({url:e,data:t,method:n="POST",headers:s={}}){return new Promise(((r,i)=>{te.request({url:e,method:n,data:t,header:s,dataType:"json",complete:(e={})=>{if(!e.statusCode||e.statusCode>=400){const{errMsg:t}=e.data||{};return i(new ee({code:"SYS_ERR",message:t||e.errMsg||"request:fail",requestId:e.requestID}))}r({status:e.statusCode,data:e.data,headers:e.header,requestId:e.requestID})}})}))}function Tt(e,t){const{path:n,data:s,method:r="GET"}=e,{url:i,headers:o}=At(n,{functionName:"",data:s,method:r,headers:{"x-alipay-cloud-mode":"oss","x-data-api-type":"oss","x-expire-timestamp":Date.now()+6e4},signHeaderKeys:["x-data-api-type","x-expire-timestamp"],config:t});return Pt({url:i,data:s,method:r,headers:o}).then((e=>{const t=e.data||{};if(!t.success)throw new ee({code:e.code,message:e.message,requestId:e.trace_id});return t.data||{}})).catch((e=>{throw new ee({code:e.errCode,message:e.errMsg,requestId:e.requestId})}))}function Ct(e=""){const t=e.trim().replace(/^cloud:\/\//,""),n=t.indexOf("/");if(n<=0)throw new ee({code:"INVALID_PARAM",message:"fileID不合法"});const s=t.substring(0,n),r=t.substring(n+1);return s!==this.config.envId&&console.warn("file ".concat(e," does not belong to env ").concat(this.config.envId)),r}var xt=class{constructor(e){["spaceId","spaceAppId","accessKey","secretKey"].forEach((t=>{if(!Object.prototype.hasOwnProperty.call(e,t))throw new Error(`${t} required`)}));const{spaceAppId:t,accessKey:n,...s}=e;this.config=Object.assign({},{endpoint:e.endpoint||`https://${e.envId}.api-hz.cloudbasefunction.cn/`,envId:e.spaceId,appId:t,secretId:n},s)}callFunction(e){return function(e,t){const{name:n,data:s}=e,r="POST",{url:i,headers:o}=At("/functions/invokeFunction",{functionName:n,data:s,method:r,headers:{"x-to-function-name":n},signHeaderKeys:["x-to-function-name"],config:t});return Pt({url:i,data:s,method:r,headers:o}).then((e=>({errCode:0,success:!0,requestId:e.requestId,result:e.data}))).catch((e=>{throw new ee({code:e.errCode,message:e.errMsg,requestId:e.requestId})}))}(e,this.config)}uploadFileToOSS({url:e,filePath:t,fileType:n,formData:s,onUploadProgress:r}){return new Promise(((i,o)=>{const a=te.uploadFile({url:e,filePath:t,fileType:n,formData:s,success(e){e&&e.statusCode<400?i(e):o(new ee({code:"UPLOAD_FAILED",message:"文件上传失败"}))},fail(e){o(new ee({code:e.code||"UPLOAD_FAILED",message:e.message||e.errMsg||"文件上传失败"}))}});"function"==typeof r&&a&&"function"==typeof a.onProgressUpdate&&a.onProgressUpdate((e=>{r({loaded:e.totalBytesSent,total:e.totalBytesExpectedToSend})}))}))}async uploadFile({filePath:e,cloudPath:t="",fileType:n="image",onUploadProgress:s}){if("string"!==p(t))throw new ee({code:"INVALID_PARAM",message:"cloudPath必须为字符串类型"});if(!(t=t.trim()))throw new ee({code:"INVALID_PARAM",message:"cloudPath不可为空"});if(/:\/\//.test(t))throw new ee({code:"INVALID_PARAM",message:"cloudPath不合法"});const r=await Tt({path:"/".concat(t.replace(/^\//,""),"?post_url")},this.config),{file_id:i,upload_url:o,form_data:a}=r,c=a&&a.reduce(((e,t)=>(e[t.key]=t.value,e)),{});return this.uploadFileToOSS({url:o,filePath:e,fileType:n,formData:c,onUploadProgress:s}).then((()=>({fileID:i})))}async getTempFileURL({fileList:e}){return new Promise(((t,n)=>{(!e||e.length<0)&&n(new ee({errCode:"INVALID_PARAM",errMsg:"fileList不能为空数组"})),e.length>50&&n(new ee({errCode:"INVALID_PARAM",errMsg:"fileList数组长度不能超过50"}));const s=[];for(const t of e){"string"!==p(t)&&n(new ee({errCode:"INVALID_PARAM",errMsg:"fileList的元素必须是非空的字符串"}));const e=Ct.call(this,t);s.push({file_id:e,expire:600})}Tt({path:"/?download_url",data:{file_list:s},method:"POST"},this.config).then((e=>{const{file_list:n=[]}=e;t({fileList:n.map((e=>({fileID:e.file_id,tempFileURL:e.download_url})))})})).catch((e=>n(e)))}))}};var Ot={init:e=>{e.envId=e.spaceId,e.provider="alipay";const t=new xt(e);return t.auth=function(){return{signInAnonymously:function(){return Promise.resolve()},getLoginState:function(){return Promise.resolve(!0)}}},t}};function Et({data:e}){let t;t=ue();const n=JSON.parse(JSON.stringify(e||{}));if(Object.assign(n,{clientInfo:t}),!n.uniIdToken){const{token:e}=se();e&&(n.uniIdToken=e)}return n}async function Lt({name:e,data:t}={}){await this.__dev__.initLocalNetwork();const{localAddress:n,localPort:s}=this.__dev__,r={aliyun:"aliyun",tencent:"tcb",alipay:"alipay"}[this.config.provider],i=this.config.spaceId,o=`http://${n}:${s}/system/check-function`,a=`http://${n}:${s}/cloudfunctions/${e}`;return new Promise(((t,n)=>{te.request({method:"POST",url:o,data:{name:e,platform:A,provider:r,spaceId:i},timeout:3e3,success(e){t(e)},fail(){t({data:{code:"NETWORK_ERROR",message:"连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。"}})}})})).then((({data:e}={})=>{const{code:t,message:n}=e||{};return{code:0===t?0:t||"SYS_ERR",message:n||"SYS_ERR"}})).then((({code:n,message:s})=>{if(0!==n){switch(n){case"MODULE_ENCRYPTED":console.error(`此云函数（${e}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);break;case"FUNCTION_ENCRYPTED":console.error(`此云函数（${e}）已加密不可本地调试，自动切换为云端已部署的云函数`);break;case"ACTION_ENCRYPTED":console.error(s||"需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case"NETWORK_ERROR":{const e="连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(e),new Error(e)}case"SWITCH_TO_CLOUD":break;default:{const e=`检测本地调试服务出现错误：${s}，请检查网络环境或重启客户端再试`;throw console.error(e),new Error(e)}}return this._callCloudFunction({name:e,data:t})}return new Promise(((e,n)=>{const s=Et.call(this,{data:t});te.request({method:"POST",url:a,data:{provider:r,platform:A,param:s},success:({statusCode:t,data:s}={})=>!t||t>=400?n(new ee({code:s.code||"SYS_ERR",message:s.message||"request:fail"})):e({result:s}),fail(e){n(new ee({code:e.code||e.errCode||"SYS_ERR",message:e.message||e.errMsg||"request:fail"}))}})}))}))}const Rt=[{rule:/fc_function_not_found|FUNCTION_NOT_FOUND/,content:"，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间",mode:"append"}];var Ut=/[\\^$.*+?()[\]{}|]/g,Nt=RegExp(Ut.source);function Dt(e,t,n){return e.replace(new RegExp((s=t)&&Nt.test(s)?s.replace(Ut,"\\$&"):s,"g"),n);var s}const Mt="none",qt="request",Ft="response",Kt="both";class jt{constructor({secretType:e,uniCloudIns:t}={}){this.clientType="",this.secretType=e||Mt,this.uniCloudIns=t;const{provider:n,spaceId:s}=this.uniCloudIns.config;var r;this.provider=n,this.spaceId=s,this.scopedGlobalCache=(r=this.uniCloudIns,E("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}",r.config.spaceId)))}getSystemInfo(){return this._systemInfo||(this._systemInfo=ae()),this._systemInfo}get appId(){return this.getSystemInfo().appId}get deviceId(){return this.getSystemInfo().deviceId}async encryptData(e){return this.secretType===Mt?e:this.platformEncryptData(e)}async decryptResult(e){if(this.secretType===Mt)return e;const{errCode:t,content:n}=e||{};return t||!n?e:this.secretType===qt?n:this.platformDecryptResult(e)}wrapVerifyClientCallFunction(e){const t=this;return async function({name:n,data:s={}}={}){await t.prepare(),(s=JSON.parse(JSON.stringify(s)))._uniCloudOptions=await t.platformGetSignOption();let r=await e({name:n,data:s});return t.isClientKeyNotFound(r)&&(await t.prepare({forceUpdate:!0}),s._uniCloudOptions=await t.platformGetSignOption(),r=await e({name:n,data:s})),r}}wrapEncryptDataCallFunction(e){const t=this;return async function({name:n,data:s={}}={}){await t.prepare();const r=await t.encryptData(s);let i=await e({name:n,data:r});if(t.isClientKeyNotFound(i)){await t.prepare({forceUpdate:!0});const r=await t.encryptData(s);s._uniCloudOptions=await t.platformGetSignOption(),i=await e({name:n,data:r})}return i.result=await t.decryptResult(i.result),i}}}
/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */function $t(e){return parseInt(e)===e}function Bt(e){if(!$t(e.length))return!1;for(var t=0;t<e.length;t++)if(!$t(e[t])||e[t]<0||e[t]>255)return!1;return!0}function Wt(e,t){if(e.buffer&&"Uint8Array"===e.name)return t&&(e=e.slice?e.slice():Array.prototype.slice.call(e)),e;if(Array.isArray(e)){if(!Bt(e))throw new Error("Array contains invalid value: "+e);return new Uint8Array(e)}if($t(e.length)&&Bt(e))return new Uint8Array(e);throw new Error("unsupported array-like object")}function Ht(e){return new Uint8Array(e)}function zt(e,t,n,s,r){null==s&&null==r||(e=e.slice?e.slice(s,r):Array.prototype.slice.call(e,s,r)),t.set(e,n)}var Jt,Gt={toBytes:function(e){var t=[],n=0;for(e=encodeURI(e);n<e.length;){var s=e.charCodeAt(n++);37===s?(t.push(parseInt(e.substr(n,2),16)),n+=2):t.push(s)}return Wt(t)},fromBytes:function(e){for(var t=[],n=0;n<e.length;){var s=e[n];s<128?(t.push(String.fromCharCode(s)),n++):s>191&&s<224?(t.push(String.fromCharCode((31&s)<<6|63&e[n+1])),n+=2):(t.push(String.fromCharCode((15&s)<<12|(63&e[n+1])<<6|63&e[n+2])),n+=3)}return t.join("")}},Vt=(Jt="0123456789abcdef",{toBytes:function(e){for(var t=[],n=0;n<e.length;n+=2)t.push(parseInt(e.substr(n,2),16));return t},fromBytes:function(e){for(var t=[],n=0;n<e.length;n++){var s=e[n];t.push(Jt[(240&s)>>4]+Jt[15&s])}return t.join("")}}),Yt={16:10,24:12,32:14},Qt=[1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145],Xt=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],Zt=[82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125],en=[3328402341,4168907908,4000806809,4135287693,4294111757,3597364157,3731845041,2445657428,1613770832,33620227,3462883241,1445669757,3892248089,3050821474,1303096294,3967186586,2412431941,528646813,2311702848,4202528135,4026202645,2992200171,2387036105,4226871307,1101901292,3017069671,1604494077,1169141738,597466303,1403299063,3832705686,2613100635,1974974402,3791519004,1033081774,1277568618,1815492186,2118074177,4126668546,2211236943,1748251740,1369810420,3521504564,4193382664,3799085459,2883115123,1647391059,706024767,134480908,2512897874,1176707941,2646852446,806885416,932615841,168101135,798661301,235341577,605164086,461406363,3756188221,3454790438,1311188841,2142417613,3933566367,302582043,495158174,1479289972,874125870,907746093,3698224818,3025820398,1537253627,2756858614,1983593293,3084310113,2108928974,1378429307,3722699582,1580150641,327451799,2790478837,3117535592,0,3253595436,1075847264,3825007647,2041688520,3059440621,3563743934,2378943302,1740553945,1916352843,2487896798,2555137236,2958579944,2244988746,3151024235,3320835882,1336584933,3992714006,2252555205,2588757463,1714631509,293963156,2319795663,3925473552,67240454,4269768577,2689618160,2017213508,631218106,1269344483,2723238387,1571005438,2151694528,93294474,1066570413,563977660,1882732616,4059428100,1673313503,2008463041,2950355573,1109467491,537923632,3858759450,4260623118,3218264685,2177748300,403442708,638784309,3287084079,3193921505,899127202,2286175436,773265209,2479146071,1437050866,4236148354,2050833735,3362022572,3126681063,840505643,3866325909,3227541664,427917720,2655997905,2749160575,1143087718,1412049534,999329963,193497219,2353415882,3354324521,1807268051,672404540,2816401017,3160301282,369822493,2916866934,3688947771,1681011286,1949973070,336202270,2454276571,201721354,1210328172,3093060836,2680341085,3184776046,1135389935,3294782118,965841320,831886756,3554993207,4068047243,3588745010,2345191491,1849112409,3664604599,26054028,2983581028,2622377682,1235855840,3630984372,2891339514,4092916743,3488279077,3395642799,4101667470,1202630377,268961816,1874508501,4034427016,1243948399,1546530418,941366308,1470539505,1941222599,2546386513,3421038627,2715671932,3899946140,1042226977,2521517021,1639824860,227249030,260737669,3765465232,2084453954,1907733956,3429263018,2420656344,100860677,4160157185,470683154,3261161891,1781871967,2924959737,1773779408,394692241,2579611992,974986535,664706745,3655459128,3958962195,731420851,571543859,3530123707,2849626480,126783113,865375399,765172662,1008606754,361203602,3387549984,2278477385,2857719295,1344809080,2782912378,59542671,1503764984,160008576,437062935,1707065306,3622233649,2218934982,3496503480,2185314755,697932208,1512910199,504303377,2075177163,2824099068,1841019862,739644986],tn=[2781242211,2230877308,2582542199,2381740923,234877682,3184946027,2984144751,1418839493,1348481072,50462977,2848876391,2102799147,434634494,1656084439,3863849899,2599188086,1167051466,2636087938,1082771913,2281340285,368048890,3954334041,3381544775,201060592,3963727277,1739838676,4250903202,3930435503,3206782108,4149453988,2531553906,1536934080,3262494647,484572669,2923271059,1783375398,1517041206,1098792767,49674231,1334037708,1550332980,4098991525,886171109,150598129,2481090929,1940642008,1398944049,1059722517,201851908,1385547719,1699095331,1587397571,674240536,2704774806,252314885,3039795866,151914247,908333586,2602270848,1038082786,651029483,1766729511,3447698098,2682942837,454166793,2652734339,1951935532,775166490,758520603,3000790638,4004797018,4217086112,4137964114,1299594043,1639438038,3464344499,2068982057,1054729187,1901997871,2534638724,4121318227,1757008337,0,750906861,1614815264,535035132,3363418545,3988151131,3201591914,1183697867,3647454910,1265776953,3734260298,3566750796,3903871064,1250283471,1807470800,717615087,3847203498,384695291,3313910595,3617213773,1432761139,2484176261,3481945413,283769337,100925954,2180939647,4037038160,1148730428,3123027871,3813386408,4087501137,4267549603,3229630528,2315620239,2906624658,3156319645,1215313976,82966005,3747855548,3245848246,1974459098,1665278241,807407632,451280895,251524083,1841287890,1283575245,337120268,891687699,801369324,3787349855,2721421207,3431482436,959321879,1469301956,4065699751,2197585534,1199193405,2898814052,3887750493,724703513,2514908019,2696962144,2551808385,3516813135,2141445340,1715741218,2119445034,2872807568,2198571144,3398190662,700968686,3547052216,1009259540,2041044702,3803995742,487983883,1991105499,1004265696,1449407026,1316239930,504629770,3683797321,168560134,1816667172,3837287516,1570751170,1857934291,4014189740,2797888098,2822345105,2754712981,936633572,2347923833,852879335,1133234376,1500395319,3084545389,2348912013,1689376213,3533459022,3762923945,3034082412,4205598294,133428468,634383082,2949277029,2398386810,3913789102,403703816,3580869306,2297460856,1867130149,1918643758,607656988,4049053350,3346248884,1368901318,600565992,2090982877,2632479860,557719327,3717614411,3697393085,2249034635,2232388234,2430627952,1115438654,3295786421,2865522278,3633334344,84280067,33027830,303828494,2747425121,1600795957,4188952407,3496589753,2434238086,1486471617,658119965,3106381470,953803233,334231800,3005978776,857870609,3151128937,1890179545,2298973838,2805175444,3056442267,574365214,2450884487,550103529,1233637070,4289353045,2018519080,2057691103,2399374476,4166623649,2148108681,387583245,3664101311,836232934,3330556482,3100665960,3280093505,2955516313,2002398509,287182607,3413881008,4238890068,3597515707,975967766],nn=[1671808611,2089089148,2006576759,2072901243,4061003762,1807603307,1873927791,3310653893,810573872,16974337,1739181671,729634347,4263110654,3613570519,2883997099,1989864566,3393556426,2191335298,3376449993,2106063485,4195741690,1508618841,1204391495,4027317232,2917941677,3563566036,2734514082,2951366063,2629772188,2767672228,1922491506,3227229120,3082974647,4246528509,2477669779,644500518,911895606,1061256767,4144166391,3427763148,878471220,2784252325,3845444069,4043897329,1905517169,3631459288,827548209,356461077,67897348,3344078279,593839651,3277757891,405286936,2527147926,84871685,2595565466,118033927,305538066,2157648768,3795705826,3945188843,661212711,2999812018,1973414517,152769033,2208177539,745822252,439235610,455947803,1857215598,1525593178,2700827552,1391895634,994932283,3596728278,3016654259,695947817,3812548067,795958831,2224493444,1408607827,3513301457,0,3979133421,543178784,4229948412,2982705585,1542305371,1790891114,3410398667,3201918910,961245753,1256100938,1289001036,1491644504,3477767631,3496721360,4012557807,2867154858,4212583931,1137018435,1305975373,861234739,2241073541,1171229253,4178635257,33948674,2139225727,1357946960,1011120188,2679776671,2833468328,1374921297,2751356323,1086357568,2408187279,2460827538,2646352285,944271416,4110742005,3168756668,3066132406,3665145818,560153121,271589392,4279952895,4077846003,3530407890,3444343245,202643468,322250259,3962553324,1608629855,2543990167,1154254916,389623319,3294073796,2817676711,2122513534,1028094525,1689045092,1575467613,422261273,1939203699,1621147744,2174228865,1339137615,3699352540,577127458,712922154,2427141008,2290289544,1187679302,3995715566,3100863416,339486740,3732514782,1591917662,186455563,3681988059,3762019296,844522546,978220090,169743370,1239126601,101321734,611076132,1558493276,3260915650,3547250131,2901361580,1655096418,2443721105,2510565781,3828863972,2039214713,3878868455,3359869896,928607799,1840765549,2374762893,3580146133,1322425422,2850048425,1823791212,1459268694,4094161908,3928346602,1706019429,2056189050,2934523822,135794696,3134549946,2022240376,628050469,779246638,472135708,2800834470,3032970164,3327236038,3894660072,3715932637,1956440180,522272287,1272813131,3185336765,2340818315,2323976074,1888542832,1044544574,3049550261,1722469478,1222152264,50660867,4127324150,236067854,1638122081,895445557,1475980887,3117443513,2257655686,3243809217,489110045,2662934430,3778599393,4162055160,2561878936,288563729,1773916777,3648039385,2391345038,2493985684,2612407707,505560094,2274497927,3911240169,3460925390,1442818645,678973480,3749357023,2358182796,2717407649,2306869641,219617805,3218761151,3862026214,1120306242,1756942440,1103331905,2578459033,762796589,252780047,2966125488,1425844308,3151392187,372911126],sn=[1667474886,2088535288,2004326894,2071694838,4075949567,1802223062,1869591006,3318043793,808472672,16843522,1734846926,724270422,4278065639,3621216949,2880169549,1987484396,3402253711,2189597983,3385409673,2105378810,4210693615,1499065266,1195886990,4042263547,2913856577,3570689971,2728590687,2947541573,2627518243,2762274643,1920112356,3233831835,3082273397,4261223649,2475929149,640051788,909531756,1061110142,4160160501,3435941763,875846760,2779116625,3857003729,4059105529,1903268834,3638064043,825316194,353713962,67374088,3351728789,589522246,3284360861,404236336,2526454071,84217610,2593830191,117901582,303183396,2155911963,3806477791,3958056653,656894286,2998062463,1970642922,151591698,2206440989,741110872,437923380,454765878,1852748508,1515908788,2694904667,1381168804,993742198,3604373943,3014905469,690584402,3823320797,791638366,2223281939,1398011302,3520161977,0,3991743681,538992704,4244381667,2981218425,1532751286,1785380564,3419096717,3200178535,960056178,1246420628,1280103576,1482221744,3486468741,3503319995,4025428677,2863326543,4227536621,1128514950,1296947098,859002214,2240123921,1162203018,4193849577,33687044,2139062782,1347481760,1010582648,2678045221,2829640523,1364325282,2745433693,1077985408,2408548869,2459086143,2644360225,943212656,4126475505,3166494563,3065430391,3671750063,555836226,269496352,4294908645,4092792573,3537006015,3452783745,202118168,320025894,3974901699,1600119230,2543297077,1145359496,387397934,3301201811,2812801621,2122220284,1027426170,1684319432,1566435258,421079858,1936954854,1616945344,2172753945,1330631070,3705438115,572679748,707427924,2425400123,2290647819,1179044492,4008585671,3099120491,336870440,3739122087,1583276732,185277718,3688593069,3772791771,842159716,976899700,168435220,1229577106,101059084,606366792,1549591736,3267517855,3553849021,2897014595,1650632388,2442242105,2509612081,3840161747,2038008818,3890688725,3368567691,926374254,1835907034,2374863873,3587531953,1313788572,2846482505,1819063512,1448540844,4109633523,3941213647,1701162954,2054852340,2930698567,134748176,3132806511,2021165296,623210314,774795868,471606328,2795958615,3031746419,3334885783,3907527627,3722280097,1953799400,522133822,1263263126,3183336545,2341176845,2324333839,1886425312,1044267644,3048588401,1718004428,1212733584,50529542,4143317495,235803164,1633788866,892690282,1465383342,3115962473,2256965911,3250673817,488449850,2661202215,3789633753,4177007595,2560144171,286339874,1768537042,3654906025,2391705863,2492770099,2610673197,505291324,2273808917,3924369609,3469625735,1431699370,673740880,3755965093,2358021891,2711746649,2307489801,218961690,3217021541,3873845719,1111672452,1751693520,1094828930,2576986153,757954394,252645662,2964376443,1414855848,3149649517,370555436],rn=[1374988112,2118214995,437757123,975658646,1001089995,530400753,2902087851,1273168787,540080725,2910219766,2295101073,4110568485,1340463100,3307916247,641025152,3043140495,3736164937,632953703,1172967064,1576976609,3274667266,2169303058,2370213795,1809054150,59727847,361929877,3211623147,2505202138,3569255213,1484005843,1239443753,2395588676,1975683434,4102977912,2572697195,666464733,3202437046,4035489047,3374361702,2110667444,1675577880,3843699074,2538681184,1649639237,2976151520,3144396420,4269907996,4178062228,1883793496,2403728665,2497604743,1383856311,2876494627,1917518562,3810496343,1716890410,3001755655,800440835,2261089178,3543599269,807962610,599762354,33778362,3977675356,2328828971,2809771154,4077384432,1315562145,1708848333,101039829,3509871135,3299278474,875451293,2733856160,92987698,2767645557,193195065,1080094634,1584504582,3178106961,1042385657,2531067453,3711829422,1306967366,2438237621,1908694277,67556463,1615861247,429456164,3602770327,2302690252,1742315127,2968011453,126454664,3877198648,2043211483,2709260871,2084704233,4169408201,0,159417987,841739592,504459436,1817866830,4245618683,260388950,1034867998,908933415,168810852,1750902305,2606453969,607530554,202008497,2472011535,3035535058,463180190,2160117071,1641816226,1517767529,470948374,3801332234,3231722213,1008918595,303765277,235474187,4069246893,766945465,337553864,1475418501,2943682380,4003061179,2743034109,4144047775,1551037884,1147550661,1543208500,2336434550,3408119516,3069049960,3102011747,3610369226,1113818384,328671808,2227573024,2236228733,3535486456,2935566865,3341394285,496906059,3702665459,226906860,2009195472,733156972,2842737049,294930682,1206477858,2835123396,2700099354,1451044056,573804783,2269728455,3644379585,2362090238,2564033334,2801107407,2776292904,3669462566,1068351396,742039012,1350078989,1784663195,1417561698,4136440770,2430122216,775550814,2193862645,2673705150,1775276924,1876241833,3475313331,3366754619,270040487,3902563182,3678124923,3441850377,1851332852,3969562369,2203032232,3868552805,2868897406,566021896,4011190502,3135740889,1248802510,3936291284,699432150,832877231,708780849,3332740144,899835584,1951317047,4236429990,3767586992,866637845,4043610186,1106041591,2144161806,395441711,1984812685,1139781709,3433712980,3835036895,2664543715,1282050075,3240894392,1181045119,2640243204,25965917,4203181171,4211818798,3009879386,2463879762,3910161971,1842759443,2597806476,933301370,1509430414,3943906441,3467192302,3076639029,3776767469,2051518780,2631065433,1441952575,404016761,1942435775,1408749034,1610459739,3745345300,2017778566,3400528769,3110650942,941896748,3265478751,371049330,3168937228,675039627,4279080257,967311729,135050206,3635733660,1683407248,2076935265,3576870512,1215061108,3501741890],on=[1347548327,1400783205,3273267108,2520393566,3409685355,4045380933,2880240216,2471224067,1428173050,4138563181,2441661558,636813900,4233094615,3620022987,2149987652,2411029155,1239331162,1730525723,2554718734,3781033664,46346101,310463728,2743944855,3328955385,3875770207,2501218972,3955191162,3667219033,768917123,3545789473,692707433,1150208456,1786102409,2029293177,1805211710,3710368113,3065962831,401639597,1724457132,3028143674,409198410,2196052529,1620529459,1164071807,3769721975,2226875310,486441376,2499348523,1483753576,428819965,2274680428,3075636216,598438867,3799141122,1474502543,711349675,129166120,53458370,2592523643,2782082824,4063242375,2988687269,3120694122,1559041666,730517276,2460449204,4042459122,2706270690,3446004468,3573941694,533804130,2328143614,2637442643,2695033685,839224033,1973745387,957055980,2856345839,106852767,1371368976,4181598602,1033297158,2933734917,1179510461,3046200461,91341917,1862534868,4284502037,605657339,2547432937,3431546947,2003294622,3182487618,2282195339,954669403,3682191598,1201765386,3917234703,3388507166,0,2198438022,1211247597,2887651696,1315723890,4227665663,1443857720,507358933,657861945,1678381017,560487590,3516619604,975451694,2970356327,261314535,3535072918,2652609425,1333838021,2724322336,1767536459,370938394,182621114,3854606378,1128014560,487725847,185469197,2918353863,3106780840,3356761769,2237133081,1286567175,3152976349,4255350624,2683765030,3160175349,3309594171,878443390,1988838185,3704300486,1756818940,1673061617,3403100636,272786309,1075025698,545572369,2105887268,4174560061,296679730,1841768865,1260232239,4091327024,3960309330,3497509347,1814803222,2578018489,4195456072,575138148,3299409036,446754879,3629546796,4011996048,3347532110,3252238545,4270639778,915985419,3483825537,681933534,651868046,2755636671,3828103837,223377554,2607439820,1649704518,3270937875,3901806776,1580087799,4118987695,3198115200,2087309459,2842678573,3016697106,1003007129,2802849917,1860738147,2077965243,164439672,4100872472,32283319,2827177882,1709610350,2125135846,136428751,3874428392,3652904859,3460984630,3572145929,3593056380,2939266226,824852259,818324884,3224740454,930369212,2801566410,2967507152,355706840,1257309336,4148292826,243256656,790073846,2373340630,1296297904,1422699085,3756299780,3818836405,457992840,3099667487,2135319889,77422314,1560382517,1945798516,788204353,1521706781,1385356242,870912086,325965383,2358957921,2050466060,2388260884,2313884476,4006521127,901210569,3990953189,1014646705,1503449823,1062597235,2031621326,3212035895,3931371469,1533017514,350174575,2256028891,2177544179,1052338372,741876788,1606591296,1914052035,213705253,2334669897,1107234197,1899603969,3725069491,2631447780,2422494913,1635502980,1893020342,1950903388,1120974935],an=[2807058932,1699970625,2764249623,1586903591,1808481195,1173430173,1487645946,59984867,4199882800,1844882806,1989249228,1277555970,3623636965,3419915562,1149249077,2744104290,1514790577,459744698,244860394,3235995134,1963115311,4027744588,2544078150,4190530515,1608975247,2627016082,2062270317,1507497298,2200818878,567498868,1764313568,3359936201,2305455554,2037970062,1047239e3,1910319033,1337376481,2904027272,2892417312,984907214,1243112415,830661914,861968209,2135253587,2011214180,2927934315,2686254721,731183368,1750626376,4246310725,1820824798,4172763771,3542330227,48394827,2404901663,2871682645,671593195,3254988725,2073724613,145085239,2280796200,2779915199,1790575107,2187128086,472615631,3029510009,4075877127,3802222185,4107101658,3201631749,1646252340,4270507174,1402811438,1436590835,3778151818,3950355702,3963161475,4020912224,2667994737,273792366,2331590177,104699613,95345982,3175501286,2377486676,1560637892,3564045318,369057872,4213447064,3919042237,1137477952,2658625497,1119727848,2340947849,1530455833,4007360968,172466556,266959938,516552836,0,2256734592,3980931627,1890328081,1917742170,4294704398,945164165,3575528878,958871085,3647212047,2787207260,1423022939,775562294,1739656202,3876557655,2530391278,2443058075,3310321856,547512796,1265195639,437656594,3121275539,719700128,3762502690,387781147,218828297,3350065803,2830708150,2848461854,428169201,122466165,3720081049,1627235199,648017665,4122762354,1002783846,2117360635,695634755,3336358691,4234721005,4049844452,3704280881,2232435299,574624663,287343814,612205898,1039717051,840019705,2708326185,793451934,821288114,1391201670,3822090177,376187827,3113855344,1224348052,1679968233,2361698556,1058709744,752375421,2431590963,1321699145,3519142200,2734591178,188127444,2177869557,3727205754,2384911031,3215212461,2648976442,2450346104,3432737375,1180849278,331544205,3102249176,4150144569,2952102595,2159976285,2474404304,766078933,313773861,2570832044,2108100632,1668212892,3145456443,2013908262,418672217,3070356634,2594734927,1852171925,3867060991,3473416636,3907448597,2614737639,919489135,164948639,2094410160,2997825956,590424639,2486224549,1723872674,3157750862,3399941250,3501252752,3625268135,2555048196,3673637356,1343127501,4130281361,3599595085,2957853679,1297403050,81781910,3051593425,2283490410,532201772,1367295589,3926170974,895287692,1953757831,1093597963,492483431,3528626907,1446242576,1192455638,1636604631,209336225,344873464,1015671571,669961897,3375740769,3857572124,2973530695,3747192018,1933530610,3464042516,935293895,3454686199,2858115069,1863638845,3683022916,4085369519,3292445032,875313188,1080017571,3279033885,621591778,1233856572,2504130317,24197544,3017672716,3835484340,3247465558,2220981195,3060847922,1551124588,1463996600],cn=[4104605777,1097159550,396673818,660510266,2875968315,2638606623,4200115116,3808662347,821712160,1986918061,3430322568,38544885,3856137295,718002117,893681702,1654886325,2975484382,3122358053,3926825029,4274053469,796197571,1290801793,1184342925,3556361835,2405426947,2459735317,1836772287,1381620373,3196267988,1948373848,3764988233,3385345166,3263785589,2390325492,1480485785,3111247143,3780097726,2293045232,548169417,3459953789,3746175075,439452389,1362321559,1400849762,1685577905,1806599355,2174754046,137073913,1214797936,1174215055,3731654548,2079897426,1943217067,1258480242,529487843,1437280870,3945269170,3049390895,3313212038,923313619,679998e3,3215307299,57326082,377642221,3474729866,2041877159,133361907,1776460110,3673476453,96392454,878845905,2801699524,777231668,4082475170,2330014213,4142626212,2213296395,1626319424,1906247262,1846563261,562755902,3708173718,1040559837,3871163981,1418573201,3294430577,114585348,1343618912,2566595609,3186202582,1078185097,3651041127,3896688048,2307622919,425408743,3371096953,2081048481,1108339068,2216610296,0,2156299017,736970802,292596766,1517440620,251657213,2235061775,2933202493,758720310,265905162,1554391400,1532285339,908999204,174567692,1474760595,4002861748,2610011675,3234156416,3693126241,2001430874,303699484,2478443234,2687165888,585122620,454499602,151849742,2345119218,3064510765,514443284,4044981591,1963412655,2581445614,2137062819,19308535,1928707164,1715193156,4219352155,1126790795,600235211,3992742070,3841024952,836553431,1669664834,2535604243,3323011204,1243905413,3141400786,4180808110,698445255,2653899549,2989552604,2253581325,3252932727,3004591147,1891211689,2487810577,3915653703,4237083816,4030667424,2100090966,865136418,1229899655,953270745,3399679628,3557504664,4118925222,2061379749,3079546586,2915017791,983426092,2022837584,1607244650,2118541908,2366882550,3635996816,972512814,3283088770,1568718495,3499326569,3576539503,621982671,2895723464,410887952,2623762152,1002142683,645401037,1494807662,2595684844,1335535747,2507040230,4293295786,3167684641,367585007,3885750714,1865862730,2668221674,2960971305,2763173681,1059270954,2777952454,2724642869,1320957812,2194319100,2429595872,2815956275,77089521,3973773121,3444575871,2448830231,1305906550,4021308739,2857194700,2516901860,3518358430,1787304780,740276417,1699839814,1592394909,2352307457,2272556026,188821243,1729977011,3687994002,274084841,3594982253,3613494426,2701949495,4162096729,322734571,2837966542,1640576439,484830689,1202797690,3537852828,4067639125,349075736,3342319475,4157467219,4255800159,1030690015,1155237496,2951971274,1757691577,607398968,2738905026,499347990,3794078908,1011452712,227885567,2818666809,213114376,3034881240,1455525988,3414450555,850817237,1817998408,3092726480],un=[0,235474187,470948374,303765277,941896748,908933415,607530554,708780849,1883793496,2118214995,1817866830,1649639237,1215061108,1181045119,1417561698,1517767529,3767586992,4003061179,4236429990,4069246893,3635733660,3602770327,3299278474,3400528769,2430122216,2664543715,2362090238,2193862645,2835123396,2801107407,3035535058,3135740889,3678124923,3576870512,3341394285,3374361702,3810496343,3977675356,4279080257,4043610186,2876494627,2776292904,3076639029,3110650942,2472011535,2640243204,2403728665,2169303058,1001089995,899835584,666464733,699432150,59727847,226906860,530400753,294930682,1273168787,1172967064,1475418501,1509430414,1942435775,2110667444,1876241833,1641816226,2910219766,2743034109,2976151520,3211623147,2505202138,2606453969,2302690252,2269728455,3711829422,3543599269,3240894392,3475313331,3843699074,3943906441,4178062228,4144047775,1306967366,1139781709,1374988112,1610459739,1975683434,2076935265,1775276924,1742315127,1034867998,866637845,566021896,800440835,92987698,193195065,429456164,395441711,1984812685,2017778566,1784663195,1683407248,1315562145,1080094634,1383856311,1551037884,101039829,135050206,437757123,337553864,1042385657,807962610,573804783,742039012,2531067453,2564033334,2328828971,2227573024,2935566865,2700099354,3001755655,3168937228,3868552805,3902563182,4203181171,4102977912,3736164937,3501741890,3265478751,3433712980,1106041591,1340463100,1576976609,1408749034,2043211483,2009195472,1708848333,1809054150,832877231,1068351396,766945465,599762354,159417987,126454664,361929877,463180190,2709260871,2943682380,3178106961,3009879386,2572697195,2538681184,2236228733,2336434550,3509871135,3745345300,3441850377,3274667266,3910161971,3877198648,4110568485,4211818798,2597806476,2497604743,2261089178,2295101073,2733856160,2902087851,3202437046,2968011453,3936291284,3835036895,4136440770,4169408201,3535486456,3702665459,3467192302,3231722213,2051518780,1951317047,1716890410,1750902305,1113818384,1282050075,1584504582,1350078989,168810852,67556463,371049330,404016761,841739592,1008918595,775550814,540080725,3969562369,3801332234,4035489047,4269907996,3569255213,3669462566,3366754619,3332740144,2631065433,2463879762,2160117071,2395588676,2767645557,2868897406,3102011747,3069049960,202008497,33778362,270040487,504459436,875451293,975658646,675039627,641025152,2084704233,1917518562,1615861247,1851332852,1147550661,1248802510,1484005843,1451044056,933301370,967311729,733156972,632953703,260388950,25965917,328671808,496906059,1206477858,1239443753,1543208500,1441952575,2144161806,1908694277,1675577880,1842759443,3610369226,3644379585,3408119516,3307916247,4011190502,3776767469,4077384432,4245618683,2809771154,2842737049,3144396420,3043140495,2673705150,2438237621,2203032232,2370213795],hn=[0,185469197,370938394,487725847,741876788,657861945,975451694,824852259,1483753576,1400783205,1315723890,1164071807,1950903388,2135319889,1649704518,1767536459,2967507152,3152976349,2801566410,2918353863,2631447780,2547432937,2328143614,2177544179,3901806776,3818836405,4270639778,4118987695,3299409036,3483825537,3535072918,3652904859,2077965243,1893020342,1841768865,1724457132,1474502543,1559041666,1107234197,1257309336,598438867,681933534,901210569,1052338372,261314535,77422314,428819965,310463728,3409685355,3224740454,3710368113,3593056380,3875770207,3960309330,4045380933,4195456072,2471224067,2554718734,2237133081,2388260884,3212035895,3028143674,2842678573,2724322336,4138563181,4255350624,3769721975,3955191162,3667219033,3516619604,3431546947,3347532110,2933734917,2782082824,3099667487,3016697106,2196052529,2313884476,2499348523,2683765030,1179510461,1296297904,1347548327,1533017514,1786102409,1635502980,2087309459,2003294622,507358933,355706840,136428751,53458370,839224033,957055980,605657339,790073846,2373340630,2256028891,2607439820,2422494913,2706270690,2856345839,3075636216,3160175349,3573941694,3725069491,3273267108,3356761769,4181598602,4063242375,4011996048,3828103837,1033297158,915985419,730517276,545572369,296679730,446754879,129166120,213705253,1709610350,1860738147,1945798516,2029293177,1239331162,1120974935,1606591296,1422699085,4148292826,4233094615,3781033664,3931371469,3682191598,3497509347,3446004468,3328955385,2939266226,2755636671,3106780840,2988687269,2198438022,2282195339,2501218972,2652609425,1201765386,1286567175,1371368976,1521706781,1805211710,1620529459,2105887268,1988838185,533804130,350174575,164439672,46346101,870912086,954669403,636813900,788204353,2358957921,2274680428,2592523643,2441661558,2695033685,2880240216,3065962831,3182487618,3572145929,3756299780,3270937875,3388507166,4174560061,4091327024,4006521127,3854606378,1014646705,930369212,711349675,560487590,272786309,457992840,106852767,223377554,1678381017,1862534868,1914052035,2031621326,1211247597,1128014560,1580087799,1428173050,32283319,182621114,401639597,486441376,768917123,651868046,1003007129,818324884,1503449823,1385356242,1333838021,1150208456,1973745387,2125135846,1673061617,1756818940,2970356327,3120694122,2802849917,2887651696,2637442643,2520393566,2334669897,2149987652,3917234703,3799141122,4284502037,4100872472,3309594171,3460984630,3545789473,3629546796,2050466060,1899603969,1814803222,1730525723,1443857720,1560382517,1075025698,1260232239,575138148,692707433,878443390,1062597235,243256656,91341917,409198410,325965383,3403100636,3252238545,3704300486,3620022987,3874428392,3990953189,4042459122,4227665663,2460449204,2578018489,2226875310,2411029155,3198115200,3046200461,2827177882,2743944855],ln=[0,218828297,437656594,387781147,875313188,958871085,775562294,590424639,1750626376,1699970625,1917742170,2135253587,1551124588,1367295589,1180849278,1265195639,3501252752,3720081049,3399941250,3350065803,3835484340,3919042237,4270507174,4085369519,3102249176,3051593425,2734591178,2952102595,2361698556,2177869557,2530391278,2614737639,3145456443,3060847922,2708326185,2892417312,2404901663,2187128086,2504130317,2555048196,3542330227,3727205754,3375740769,3292445032,3876557655,3926170974,4246310725,4027744588,1808481195,1723872674,1910319033,2094410160,1608975247,1391201670,1173430173,1224348052,59984867,244860394,428169201,344873464,935293895,984907214,766078933,547512796,1844882806,1627235199,2011214180,2062270317,1507497298,1423022939,1137477952,1321699145,95345982,145085239,532201772,313773861,830661914,1015671571,731183368,648017665,3175501286,2957853679,2807058932,2858115069,2305455554,2220981195,2474404304,2658625497,3575528878,3625268135,3473416636,3254988725,3778151818,3963161475,4213447064,4130281361,3599595085,3683022916,3432737375,3247465558,3802222185,4020912224,4172763771,4122762354,3201631749,3017672716,2764249623,2848461854,2331590177,2280796200,2431590963,2648976442,104699613,188127444,472615631,287343814,840019705,1058709744,671593195,621591778,1852171925,1668212892,1953757831,2037970062,1514790577,1463996600,1080017571,1297403050,3673637356,3623636965,3235995134,3454686199,4007360968,3822090177,4107101658,4190530515,2997825956,3215212461,2830708150,2779915199,2256734592,2340947849,2627016082,2443058075,172466556,122466165,273792366,492483431,1047239e3,861968209,612205898,695634755,1646252340,1863638845,2013908262,1963115311,1446242576,1530455833,1277555970,1093597963,1636604631,1820824798,2073724613,1989249228,1436590835,1487645946,1337376481,1119727848,164948639,81781910,331544205,516552836,1039717051,821288114,669961897,719700128,2973530695,3157750862,2871682645,2787207260,2232435299,2283490410,2667994737,2450346104,3647212047,3564045318,3279033885,3464042516,3980931627,3762502690,4150144569,4199882800,3070356634,3121275539,2904027272,2686254721,2200818878,2384911031,2570832044,2486224549,3747192018,3528626907,3310321856,3359936201,3950355702,3867060991,4049844452,4234721005,1739656202,1790575107,2108100632,1890328081,1402811438,1586903591,1233856572,1149249077,266959938,48394827,369057872,418672217,1002783846,919489135,567498868,752375421,209336225,24197544,376187827,459744698,945164165,895287692,574624663,793451934,1679968233,1764313568,2117360635,1933530610,1343127501,1560637892,1243112415,1192455638,3704280881,3519142200,3336358691,3419915562,3907448597,3857572124,4075877127,4294704398,3029510009,3113855344,2927934315,2744104290,2159976285,2377486676,2594734927,2544078150],dn=[0,151849742,303699484,454499602,607398968,758720310,908999204,1059270954,1214797936,1097159550,1517440620,1400849762,1817998408,1699839814,2118541908,2001430874,2429595872,2581445614,2194319100,2345119218,3034881240,3186202582,2801699524,2951971274,3635996816,3518358430,3399679628,3283088770,4237083816,4118925222,4002861748,3885750714,1002142683,850817237,698445255,548169417,529487843,377642221,227885567,77089521,1943217067,2061379749,1640576439,1757691577,1474760595,1592394909,1174215055,1290801793,2875968315,2724642869,3111247143,2960971305,2405426947,2253581325,2638606623,2487810577,3808662347,3926825029,4044981591,4162096729,3342319475,3459953789,3576539503,3693126241,1986918061,2137062819,1685577905,1836772287,1381620373,1532285339,1078185097,1229899655,1040559837,923313619,740276417,621982671,439452389,322734571,137073913,19308535,3871163981,4021308739,4104605777,4255800159,3263785589,3414450555,3499326569,3651041127,2933202493,2815956275,3167684641,3049390895,2330014213,2213296395,2566595609,2448830231,1305906550,1155237496,1607244650,1455525988,1776460110,1626319424,2079897426,1928707164,96392454,213114376,396673818,514443284,562755902,679998e3,865136418,983426092,3708173718,3557504664,3474729866,3323011204,4180808110,4030667424,3945269170,3794078908,2507040230,2623762152,2272556026,2390325492,2975484382,3092726480,2738905026,2857194700,3973773121,3856137295,4274053469,4157467219,3371096953,3252932727,3673476453,3556361835,2763173681,2915017791,3064510765,3215307299,2156299017,2307622919,2459735317,2610011675,2081048481,1963412655,1846563261,1729977011,1480485785,1362321559,1243905413,1126790795,878845905,1030690015,645401037,796197571,274084841,425408743,38544885,188821243,3613494426,3731654548,3313212038,3430322568,4082475170,4200115116,3780097726,3896688048,2668221674,2516901860,2366882550,2216610296,3141400786,2989552604,2837966542,2687165888,1202797690,1320957812,1437280870,1554391400,1669664834,1787304780,1906247262,2022837584,265905162,114585348,499347990,349075736,736970802,585122620,972512814,821712160,2595684844,2478443234,2293045232,2174754046,3196267988,3079546586,2895723464,2777952454,3537852828,3687994002,3234156416,3385345166,4142626212,4293295786,3841024952,3992742070,174567692,57326082,410887952,292596766,777231668,660510266,1011452712,893681702,1108339068,1258480242,1343618912,1494807662,1715193156,1865862730,1948373848,2100090966,2701949495,2818666809,3004591147,3122358053,2235061775,2352307457,2535604243,2653899549,3915653703,3764988233,4219352155,4067639125,3444575871,3294430577,3746175075,3594982253,836553431,953270745,600235211,718002117,367585007,484830689,133361907,251657213,2041877159,1891211689,1806599355,1654886325,1568718495,1418573201,1335535747,1184342925];function pn(e){for(var t=[],n=0;n<e.length;n+=4)t.push(e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3]);return t}class fn{constructor(e){if(!(this instanceof fn))throw Error("AES must be instanitated with `new`");Object.defineProperty(this,"key",{value:Wt(e,!0)}),this._prepare()}_prepare(){var e=Yt[this.key.length];if(null==e)throw new Error("invalid key size (must be 16, 24 or 32 bytes)");this._Ke=[],this._Kd=[];for(var t=0;t<=e;t++)this._Ke.push([0,0,0,0]),this._Kd.push([0,0,0,0]);var n,s=4*(e+1),r=this.key.length/4,i=pn(this.key);for(t=0;t<r;t++)n=t>>2,this._Ke[n][t%4]=i[t],this._Kd[e-n][t%4]=i[t];for(var o,a=0,c=r;c<s;){if(o=i[r-1],i[0]^=Xt[o>>16&255]<<24^Xt[o>>8&255]<<16^Xt[255&o]<<8^Xt[o>>24&255]^Qt[a]<<24,a+=1,8!=r)for(t=1;t<r;t++)i[t]^=i[t-1];else{for(t=1;t<r/2;t++)i[t]^=i[t-1];o=i[r/2-1],i[r/2]^=Xt[255&o]^Xt[o>>8&255]<<8^Xt[o>>16&255]<<16^Xt[o>>24&255]<<24;for(t=r/2+1;t<r;t++)i[t]^=i[t-1]}for(t=0;t<r&&c<s;)u=c>>2,h=c%4,this._Ke[u][h]=i[t],this._Kd[e-u][h]=i[t++],c++}for(var u=1;u<e;u++)for(var h=0;h<4;h++)o=this._Kd[u][h],this._Kd[u][h]=un[o>>24&255]^hn[o>>16&255]^ln[o>>8&255]^dn[255&o]}encrypt(e){if(16!=e.length)throw new Error("invalid plaintext size (must be 16 bytes)");for(var t=this._Ke.length-1,n=[0,0,0,0],s=pn(e),r=0;r<4;r++)s[r]^=this._Ke[0][r];for(var i=1;i<t;i++){for(r=0;r<4;r++)n[r]=en[s[r]>>24&255]^tn[s[(r+1)%4]>>16&255]^nn[s[(r+2)%4]>>8&255]^sn[255&s[(r+3)%4]]^this._Ke[i][r];s=n.slice()}var o,a=Ht(16);for(r=0;r<4;r++)o=this._Ke[t][r],a[4*r]=255&(Xt[s[r]>>24&255]^o>>24),a[4*r+1]=255&(Xt[s[(r+1)%4]>>16&255]^o>>16),a[4*r+2]=255&(Xt[s[(r+2)%4]>>8&255]^o>>8),a[4*r+3]=255&(Xt[255&s[(r+3)%4]]^o);return a}decrypt(e){if(16!=e.length)throw new Error("invalid ciphertext size (must be 16 bytes)");for(var t=this._Kd.length-1,n=[0,0,0,0],s=pn(e),r=0;r<4;r++)s[r]^=this._Kd[0][r];for(var i=1;i<t;i++){for(r=0;r<4;r++)n[r]=rn[s[r]>>24&255]^on[s[(r+3)%4]>>16&255]^an[s[(r+2)%4]>>8&255]^cn[255&s[(r+1)%4]]^this._Kd[i][r];s=n.slice()}var o,a=Ht(16);for(r=0;r<4;r++)o=this._Kd[t][r],a[4*r]=255&(Zt[s[r]>>24&255]^o>>24),a[4*r+1]=255&(Zt[s[(r+3)%4]>>16&255]^o>>16),a[4*r+2]=255&(Zt[s[(r+2)%4]>>8&255]^o>>8),a[4*r+3]=255&(Zt[255&s[(r+1)%4]]^o);return a}}class gn{constructor(e){if(!(this instanceof gn))throw Error("AES must be instanitated with `new`");this.description="Electronic Code Block",this.name="ecb",this._aes=new fn(e)}encrypt(e){if((e=Wt(e)).length%16!=0)throw new Error("invalid plaintext size (must be multiple of 16 bytes)");for(var t=Ht(e.length),n=Ht(16),s=0;s<e.length;s+=16)zt(e,n,0,s,s+16),zt(n=this._aes.encrypt(n),t,s);return t}decrypt(e){if((e=Wt(e)).length%16!=0)throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");for(var t=Ht(e.length),n=Ht(16),s=0;s<e.length;s+=16)zt(e,n,0,s,s+16),zt(n=this._aes.decrypt(n),t,s);return t}}class mn{constructor(e,t){if(!(this instanceof mn))throw Error("AES must be instanitated with `new`");if(this.description="Cipher Block Chaining",this.name="cbc",t){if(16!=t.length)throw new Error("invalid initialation vector size (must be 16 bytes)")}else t=Ht(16);this._lastCipherblock=Wt(t,!0),this._aes=new fn(e)}encrypt(e){if((e=Wt(e)).length%16!=0)throw new Error("invalid plaintext size (must be multiple of 16 bytes)");for(var t=Ht(e.length),n=Ht(16),s=0;s<e.length;s+=16){zt(e,n,0,s,s+16);for(var r=0;r<16;r++)n[r]^=this._lastCipherblock[r];this._lastCipherblock=this._aes.encrypt(n),zt(this._lastCipherblock,t,s)}return t}decrypt(e){if((e=Wt(e)).length%16!=0)throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");for(var t=Ht(e.length),n=Ht(16),s=0;s<e.length;s+=16){zt(e,n,0,s,s+16),n=this._aes.decrypt(n);for(var r=0;r<16;r++)t[s+r]=n[r]^this._lastCipherblock[r];zt(e,this._lastCipherblock,0,s,s+16)}return t}}class yn{constructor(e,t,n){if(!(this instanceof yn))throw Error("AES must be instanitated with `new`");if(this.description="Cipher Feedback",this.name="cfb",t){if(16!=t.length)throw new Error("invalid initialation vector size (must be 16 size)")}else t=Ht(16);n||(n=1),this.segmentSize=n,this._shiftRegister=Wt(t,!0),this._aes=new fn(e)}encrypt(e){if(e.length%this.segmentSize!=0)throw new Error("invalid plaintext size (must be segmentSize bytes)");for(var t,n=Wt(e,!0),s=0;s<n.length;s+=this.segmentSize){t=this._aes.encrypt(this._shiftRegister);for(var r=0;r<this.segmentSize;r++)n[s+r]^=t[r];zt(this._shiftRegister,this._shiftRegister,0,this.segmentSize),zt(n,this._shiftRegister,16-this.segmentSize,s,s+this.segmentSize)}return n}decrypt(e){if(e.length%this.segmentSize!=0)throw new Error("invalid ciphertext size (must be segmentSize bytes)");for(var t,n=Wt(e,!0),s=0;s<n.length;s+=this.segmentSize){t=this._aes.encrypt(this._shiftRegister);for(var r=0;r<this.segmentSize;r++)n[s+r]^=t[r];zt(this._shiftRegister,this._shiftRegister,0,this.segmentSize),zt(e,this._shiftRegister,16-this.segmentSize,s,s+this.segmentSize)}return n}}class _n{constructor(e,t){if(!(this instanceof _n))throw Error("AES must be instanitated with `new`");if(this.description="Output Feedback",this.name="ofb",t){if(16!=t.length)throw new Error("invalid initialation vector size (must be 16 bytes)")}else t=Ht(16);this._lastPrecipher=Wt(t,!0),this._lastPrecipherIndex=16,this._aes=new fn(e)}encrypt(e){for(var t=Wt(e,!0),n=0;n<t.length;n++)16===this._lastPrecipherIndex&&(this._lastPrecipher=this._aes.encrypt(this._lastPrecipher),this._lastPrecipherIndex=0),t[n]^=this._lastPrecipher[this._lastPrecipherIndex++];return t}decrypt(e){return this.encrypt(e)}}class wn{constructor(e){if(!(this instanceof wn))throw Error("Counter must be instanitated with `new`");0===e||e||(e=1),"number"==typeof e?(this._counter=Ht(16),this.setValue(e)):this.setBytes(e)}setValue(e){if("number"!=typeof e||parseInt(e)!=e)throw new Error("invalid counter value (must be an integer)");if(e>Number.MAX_SAFE_INTEGER)throw new Error("integer value out of safe range");for(var t=15;t>=0;--t)this._counter[t]=e%256,e=parseInt(e/256)}setBytes(e){if(16!=(e=Wt(e,!0)).length)throw new Error("invalid counter bytes size (must be 16 bytes)");this._counter=e}increment(){for(var e=15;e>=0;e--){if(255!==this._counter[e]){this._counter[e]++;break}this._counter[e]=0}}}class vn{constructor(e,t){if(!(this instanceof vn))throw Error("AES must be instanitated with `new`");this.description="Counter",this.name="ctr",t instanceof wn||(t=new wn(t)),this._counter=t,this._remainingCounter=null,this._remainingCounterIndex=16,this._aes=new fn(e)}encrypt(e){for(var t=Wt(e,!0),n=0;n<t.length;n++)16===this._remainingCounterIndex&&(this._remainingCounter=this._aes.encrypt(this._counter._counter),this._remainingCounterIndex=0,this._counter.increment()),t[n]^=this._remainingCounter[this._remainingCounterIndex++];return t}decrypt(e){return this.encrypt(e)}}var In={AES:fn,Counter:wn,ModeOfOperation:{ecb:gn,cbc:mn,cfb:yn,ofb:_n,ctr:vn},utils:{hex:Vt,utf8:Gt},padding:{pkcs7:{pad:function(e){var t=16-(e=Wt(e,!0)).length%16,n=Ht(e.length+t);zt(e,n);for(var s=e.length;s<n.length;s++)n[s]=t;return n},strip:function(e){if((e=Wt(e,!0)).length<16)throw new Error("PKCS#7 invalid length");var t=e[e.length-1];if(t>16)throw new Error("PKCS#7 padding byte out of range");for(var n=e.length-t,s=0;s<t;s++)if(e[n+s]!==t)throw new Error("PKCS#7 invalid padding byte");var r=Ht(n);return zt(e,r,0,0,n),r}}},_arrayTest:{coerceArray:Wt,createArray:Ht,copyArray:zt}};function Sn(e,t,n){const s=new Uint8Array(uni.base64ToArrayBuffer(t)),r=In.utils.utf8.toBytes(n),i=In.utils.utf8.toBytes(e),o=new In.ModeOfOperation.cbc(s,r),a=In.padding.pkcs7.pad(i),c=o.encrypt(a);return uni.arrayBufferToBase64(c)}const kn={code:2e4,message:"System error"},bn={code:20101,message:"Invalid client"},An={code:20102,message:"Get encrypt key failed"},Pn={10001:"Secure network is not supported on current playground or unimpsdk",10003:"Config missing in current app. If the problem pesist, please contact DCloud.",10009:"Encrypt payload failed",10010:"Decrypt response failed"};function Tn(e){const{errSubject:t,subject:n,errCode:s,errMsg:r,code:i,message:o,cause:a}=e||{};return new ee({subject:t||n||"uni-secure-network",code:s||i||kn.code,message:r||o,cause:a})}let Cn,xn,On=null;class En extends jt{constructor(e){super(e),this.clientType="mp-weixin",this.userEncryptKey=null}isLogin(){return!!this.scopedGlobalCache.mpWeixinCode||!!this.scopedGlobalCache.mpWeixinOpenid}async prepare(){if(!this.isLogin()){if(!this.scopedGlobalCache.initPromise)throw new Error("`uniCloud.initSecureNetworkByWeixin` has not yet been called");if(await this.scopedGlobalCache.initPromise,!this.isLogin())throw new Error("uniCloud.initSecureNetworkByWeixin` has not yet been called or successfully excuted")}}async getUserEncryptKey(){if(this.userEncryptKey)return this.userEncryptKey;if(On&&On.expireTime){const e=Date.now();if(On.expireTime-e>0)return this.userEncryptKey=On,this.userEncryptKey}return new Promise(((e,t)=>{uni.getUserCryptoManager().getLatestUserKey({success:t=>{On=t,this.userEncryptKey=t,e(this.userEncryptKey)},fail:e=>{t(Tn({...An,cause:e}))}})}))}getWxAppId(){return wx.getAccountInfoSync().miniProgram.appId}async platformGetSignOption(){const{encryptKey:e,iv:t,version:n}=await this.getUserEncryptKey();return{verifyClientSign:Sn(JSON.stringify({data:JSON.stringify({}),appId:this.appId,deviceId:this.deviceId,wxAppId:this.getWxAppId(),simulator:"devtools"===ae().platform,timestamp:Date.now()}),e,t),encryptKeyId:n,mpWeixinCode:this.scopedGlobalCache.mpWeixinCode,mpWeixinOpenid:this.scopedGlobalCache.mpWeixinOpenid}}async platformEncryptData(e){const{encryptKey:t,iv:n,version:s}=await this.getUserEncryptKey(),r={secretType:this.secretType,encryptKeyId:s,mpWeixinCode:this.scopedGlobalCache.mpWeixinCode,mpWeixinOpenid:this.scopedGlobalCache.mpWeixinOpenid};return this.secretType===Ft?{content:e,_uniCloudOptions:r}:{content:Sn(JSON.stringify({data:JSON.stringify(e),appId:this.appId,deviceId:this.deviceId,wxAppId:this.getWxAppId(),simulator:"devtools"===ae().platform,timestamp:Date.now()}),t,n),_uniCloudOptions:r}}async platformDecryptResult(e){const{content:t}=e,{encryptKey:n,iv:s}=await this.getUserEncryptKey();return JSON.parse(function(e,t,n){const s=new Uint8Array(uni.base64ToArrayBuffer(e)),r=new Uint8Array(uni.base64ToArrayBuffer(t)),i=In.utils.utf8.toBytes(n),o=new In.ModeOfOperation.cbc(r,i),a=In.padding.pkcs7.strip(o.decrypt(s));return In.utils.utf8.fromBytes(a)}(t,n,s))}isClientKeyNotFound(){return!1}}function Ln(e){const t=["hasClientKey","encryptGetClientKeyPayload","setClientKey","encrypt","decrypt"],n={};for(let s=0;s<t.length;s++){const r=t[s];n[r]=function(...t){return new Promise(((n,s)=>{"function"==typeof e[r]?e[r](...t,(function({type:e,data:t,errCode:r,errMsg:i,errSubject:o,message:a}={}){"success"===e?n(t):s(Tn({errCode:r,errMsg:Pn[r]||i||a,errSubject:o}))})):s(Tn({message:"请检查manifest.json内是否开启安全网络模块，另外注意标准基座不支持安全网络模块"}))}))}}return n}class Rn extends jt{constructor(e){super(e),this.clientType="app",this.appUtils={...Ln(uni.requireNativePlugin("plus"))},this.systemInfo=Cn||(Cn=ae())}async hasClientKey(){return this._hasClientKey=await this.appUtils.hasClientKey({provider:this.provider,spaceId:this.spaceId}),this._hasClientKey}async getAppClientKey(){const{data:e,key:t}=await this.appUtils.encryptGetClientKeyPayload({data:JSON.stringify({})}),n=(await this.uniCloudIns.callFunction({name:"DCloud-clientDB",data:{redirectTo:"encryption",action:"getAppClientKey",data:e,key:t}})).result||{};if(0!==n.errCode)throw function(e){return new ee({subject:e.errSubject||"uni-secure-network",code:e.errCode||e.code||kn.code,message:e.errMsg||e.message})}(n);const{clientKey:s,key:r}=n;await this.appUtils.setClientKey({provider:this.provider,spaceId:this.spaceId,clientKey:s,key:r})}async ensureClientKey({forceUpdate:e=!1}={}){if(!0!==await this.hasClientKey()||e)return e&&this.scopedGlobalCache.initPromise&&this.scopedGlobalCache.initStatus===h||!e&&this.scopedGlobalCache.initPromise&&this.scopedGlobalCache.initStatus!==d||(this.scopedGlobalCache.initPromise=this.getAppClientKey(),this.scopedGlobalCache.initPromise.then((e=>{this.scopedGlobalCache.initStatus=l})).catch((e=>{throw this.scopedGlobalCache.initStatus=d,e})),this.scopedGlobalCache.initStatus=h),this.scopedGlobalCache.initPromise}async prepare({forceUpdate:e=!1}={}){await this.ensureClientKey({forceUpdate:e})}async platformGetSignOption(){const{data:e,key:t}=await this.appUtils.encrypt({provider:this.provider,spaceId:this.spaceId,data:JSON.stringify({})});return{verifyClientSign:e,encryptKeyId:t}}async platformEncryptData(e){const{data:t,key:n}=await this.appUtils.encrypt({provider:this.provider,spaceId:this.spaceId,data:JSON.stringify(e)}),s={secretType:this.secretType,encryptKeyId:n};return this.secretType===Ft?{content:e,_uniCloudOptions:s}:{content:t,_uniCloudOptions:s}}async platformDecryptResult(e){const{content:t,_uniCloudOptions:n={}}=e,s=n.encryptKeyId,r=await this.appUtils.decrypt({provider:this.provider,spaceId:this.spaceId,data:t,key:s});return JSON.parse(r.data)}isClientKeyNotFound(e={}){const t=e.result||{};return 70009===t.errCode&&"uni-secure-network"===t.errSubject}}function Un({secretType:e}={}){return e===qt||e===Ft||e===Kt}function Nn({name:e,data:t={}}={}){return"app"===A&&"DCloud-clientDB"===e&&"encryption"===t.redirectTo&&"getAppClientKey"===t.action}function Dn({provider:e,spaceId:t,functionName:n}={}){const{appId:s,uniPlatform:r,osName:i}=ae();let o=r;"app"===r&&(o=i);const a=function({provider:e,spaceId:t}={}){const n=b;if(!n)return{};e=function(e){return"tencent"===e?"tcb":e}(e);const s=n.find((n=>n.provider===e&&n.spaceId===t));return s&&s.config}({provider:e,spaceId:t});if(!a||!a.accessControl||!a.accessControl.enable)return!1;const c=a.accessControl.function||{},u=Object.keys(c);if(0===u.length)return!0;const h=function(e,t){let n,s,r;for(let i=0;i<e.length;i++){const o=e[i];o!==t?"*"!==o?o.split(",").map((e=>e.trim())).indexOf(t)>-1&&(s=o):r=o:n=o}return n||s||r}(u,n);if(!h)return!1;if((c[h]||[]).find(((e={})=>e.appId===s&&(e.platform||"").toLowerCase()===o.toLowerCase())))return!0;throw console.error(`此应用[appId: ${s}, platform: ${o}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`),Tn(bn)}function Mn({functionName:e,result:t,logPvd:n}){if(I&&this.__dev__.debugLog&&t&&t.requestId){const s=JSON.stringify({spaceId:this.config.spaceId,functionName:e,requestId:t.requestId});console.log(`[${n}-request]${s}[/${n}-request]`)}}function qn(e){const t=e.callFunction,n=function(n){const s=n.name;n.data=Et.call(e,{data:n.data});const r={aliyun:"aliyun",tencent:"tcb",tcb:"tcb",alipay:"alipay"}[this.config.provider],i=Un(n),o=Nn(n),a=i||o;return t.call(this,n).then((e=>(e.errCode=0,!a&&Mn.call(this,{functionName:s,result:e,logPvd:r}),Promise.resolve(e))),(e=>(!a&&Mn.call(this,{functionName:s,result:e,logPvd:r}),e&&e.message&&(e.message=function({message:e="",extraInfo:t={},formatter:n=[]}={}){for(let s=0;s<n.length;s++){const{rule:r,content:i,mode:o}=n[s],a=e.match(r);if(!a)continue;let c=i;for(let e=1;e<a.length;e++)c=Dt(c,`{$${e}}`,a[e]);for(const e in t)c=Dt(c,`{${e}}`,t[e]);return"replace"===o?c:e+c}return e}({message:`[${n.name}]: ${e.message}`,formatter:Rt,extraInfo:{functionName:s}})),Promise.reject(e))))};e.callFunction=function(t){const{provider:s,spaceId:r}=e.config,i=t.name;let o,a;if(t.data=t.data||{},I&&e.__dev__.debugInfo&&!e.__dev__.debugInfo.forceRemote&&T?(e._callCloudFunction||(e._callCloudFunction=n,e._callLocalFunction=Lt),o=Lt):o=n,o=o.bind(e),Nn(t))a=n.call(e,t);else if(function({name:e,data:t={}}){return"mp-weixin"===A&&"uni-id-co"===e&&"secureNetworkHandshakeByWeixin"===t.method}(t))a=o.call(e,t);else if(Un(t)){a=new xn({secretType:t.secretType,uniCloudIns:e}).wrapEncryptDataCallFunction(n.bind(e))(t)}else if(Dn({provider:s,spaceId:r,functionName:i})){a=new xn({secretType:t.secretType,uniCloudIns:e}).wrapVerifyClientCallFunction(n.bind(e))(t)}else a=o(t);return Object.defineProperty(a,"result",{get:()=>(console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"),{})}),a}}xn="mp-weixin"!==A&&"app"!==A?class{constructor(){throw Tn({message:`Platform ${A} is not supported by secure network`})}}:k?"mp-weixin"===A?En:Rn:class{constructor(){throw Tn({message:`Platform ${A} is not enabled, please check whether secure network module is enabled in your manifest.json`})}};const Fn=Symbol("CLIENT_DB_INTERNAL");function Kn(e,t){return e.then="DoNotReturnProxyWithAFunctionNamedThen",e._internalType=Fn,e.inspect=null,e.__v_raw=void 0,new Proxy(e,{get(e,n,s){if("_uniClient"===n)return null;if("symbol"==typeof n)return e[n];if(n in e||"string"!=typeof n){const t=e[n];return"function"==typeof t?t.bind(e):t}return t.get(e,n,s)}})}function jn(e){return{on:(t,n)=>{e[t]=e[t]||[],e[t].indexOf(n)>-1||e[t].push(n)},off:(t,n)=>{e[t]=e[t]||[];const s=e[t].indexOf(n);-1!==s&&e[t].splice(s,1)}}}const $n=["db.Geo","db.command","command.aggregate"];function Bn(e,t){return $n.indexOf(`${e}.${t}`)>-1}function Wn(e){switch(p(e=ne(e))){case"array":return e.map((e=>Wn(e)));case"object":return e._internalType===Fn||Object.keys(e).forEach((t=>{e[t]=Wn(e[t])})),e;case"regexp":return{$regexp:{source:e.source,flags:e.flags}};case"date":return{$date:e.toISOString()};default:return e}}function Hn(e){return e&&e.content&&e.content.$method}class zn{constructor(e,t,n){this.content=e,this.prevStage=t||null,this.udb=null,this._database=n}toJSON(){let e=this;const t=[e.content];for(;e.prevStage;)e=e.prevStage,t.push(e.content);return{$db:t.reverse().map((e=>({$method:e.$method,$param:Wn(e.$param)})))}}toString(){return JSON.stringify(this.toJSON())}getAction(){const e=this.toJSON().$db.find((e=>"action"===e.$method));return e&&e.$param&&e.$param[0]}getCommand(){return{$db:this.toJSON().$db.filter((e=>"action"!==e.$method))}}get isAggregate(){let e=this;for(;e;){const t=Hn(e),n=Hn(e.prevStage);if("aggregate"===t&&"collection"===n||"pipeline"===t)return!0;e=e.prevStage}return!1}get isCommand(){let e=this;for(;e;){if("command"===Hn(e))return!0;e=e.prevStage}return!1}get isAggregateCommand(){let e=this;for(;e;){const t=Hn(e),n=Hn(e.prevStage);if("aggregate"===t&&"command"===n)return!0;e=e.prevStage}return!1}getNextStageFn(e){const t=this;return function(){return Jn({$method:e,$param:Wn(Array.from(arguments))},t,t._database)}}get count(){return this.isAggregate?this.getNextStageFn("count"):function(){return this._send("count",Array.from(arguments))}}get remove(){return this.isCommand?this.getNextStageFn("remove"):function(){return this._send("remove",Array.from(arguments))}}get(){return this._send("get",Array.from(arguments))}get add(){return this.isCommand?this.getNextStageFn("add"):function(){return this._send("add",Array.from(arguments))}}update(){return this._send("update",Array.from(arguments))}end(){return this._send("end",Array.from(arguments))}get set(){return this.isCommand?this.getNextStageFn("set"):function(){throw new Error("JQL禁止使用set方法")}}_send(e,t){const n=this.getAction(),s=this.getCommand();if(s.$db.push({$method:e,$param:Wn(t)}),I){const e=s.$db.find((e=>"collection"===e.$method)),t=e&&e.$param;t&&1===t.length&&"string"==typeof e.$param[0]&&e.$param[0].indexOf(",")>-1&&console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。")}return this._database._callCloudFunction({action:n,command:s})}}function Jn(e,t,n){return Kn(new zn(e,t,n),{get(e,t){let s="db";return e&&e.content&&(s=e.content.$method),Bn(s,t)?Jn({$method:t},e,n):function(){return Jn({$method:t,$param:Wn(Array.from(arguments))},e,n)}}})}function Gn({path:e,method:t}){return class{constructor(){this.param=Array.from(arguments)}toJSON(){return{$newDb:[...e.map((e=>({$method:e}))),{$method:t,$param:this.param}]}}toString(){return JSON.stringify(this.toJSON())}}}function Vn(e,t={}){return Kn(new e(t),{get:(e,t)=>Bn("db",t)?Jn({$method:t},null,e):function(){return Jn({$method:t,$param:Wn(Array.from(arguments))},null,e)}})}class Yn extends class{constructor({uniClient:e={},isJQL:t=!1}={}){this._uniClient=e,this._authCallBacks={},this._dbCallBacks={},e._isDefault&&(this._dbCallBacks=E("_globalUniCloudDatabaseCallback")),t||(this.auth=jn(this._authCallBacks)),this._isJQL=t,Object.assign(this,jn(this._dbCallBacks)),this.env=Kn({},{get:(e,t)=>({$env:t})}),this.Geo=Kn({},{get:(e,t)=>Gn({path:["Geo"],method:t})}),this.serverDate=Gn({path:[],method:"serverDate"}),this.RegExp=Gn({path:[],method:"RegExp"})}getCloudEnv(e){if("string"!=typeof e||!e.trim())throw new Error("getCloudEnv参数错误");return{$env:e.replace("$cloudEnv_","")}}_callback(e,t){const n=this._dbCallBacks;n[e]&&n[e].forEach((e=>{e(...t)}))}_callbackAuth(e,t){const n=this._authCallBacks;n[e]&&n[e].forEach((e=>{e(...t)}))}multiSend(){const e=Array.from(arguments),t=e.map((e=>{const t=e.getAction(),n=e.getCommand();if("getTemp"!==n.$db[n.$db.length-1].$method)throw new Error("multiSend只支持子命令内使用getTemp");return{action:t,command:n}}));return this._callCloudFunction({multiCommand:t,queryList:e})}}{_parseResult(e){return this._isJQL?e.result:e}_callCloudFunction({action:e,command:t,multiCommand:n,queryList:s}){function r(e,t){if(n&&s)for(let n=0;n<s.length;n++){const r=s[n];r.udb&&"function"==typeof r.udb.setResult&&(t?r.udb.setResult(t):r.udb.setResult(e.result.dataList[n]))}}const i=this,o=this._isJQL?"databaseForJQL":"database";function a(e){return i._callback("error",[e]),D(M(o,"fail"),e).then((()=>D(M(o,"complete"),e))).then((()=>(r(null,e),V(K,{type:B,content:e}),Promise.reject(e))))}const c=D(M(o,"invoke")),h=this._uniClient;return c.then((()=>h.callFunction({name:"DCloud-clientDB",type:u,data:{action:e,command:t,multiCommand:n}}))).then((e=>{const{code:t,message:n,token:s,tokenExpired:c,systemInfo:u=[]}=e.result;if(u)for(let e=0;e<u.length;e++){const{level:t,message:n,detail:s}=u[e],r=console["app"===A&&"warn"===t?"error":t]||console.log;let i="[System Info]"+n;s&&(i=`${i}\n详细信息：${s}`),r(i)}if(t){return a(new ee({code:t,message:n,requestId:e.requestId}))}e.result.errCode=e.result.errCode||e.result.code,e.result.errMsg=e.result.errMsg||e.result.message,s&&c&&(re({token:s,tokenExpired:c}),this._callbackAuth("refreshToken",[{token:s,tokenExpired:c}]),this._callback("refreshToken",[{token:s,tokenExpired:c}]),V($,{token:s,tokenExpired:c}));const h=[{prop:"affectedDocs",tips:"affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"},{prop:"code",tips:"code不再推荐使用，请使用errCode替代"},{prop:"message",tips:"message不再推荐使用，请使用errMsg替代"}];for(let t=0;t<h.length;t++){const{prop:n,tips:s}=h[t];if(n in e.result){const t=e.result[n];Object.defineProperty(e.result,n,{get:()=>(console.warn(s),t)})}}return function(e){return D(M(o,"success"),e).then((()=>D(M(o,"complete"),e))).then((()=>{r(e,null);const t=i._parseResult(e);return V(K,{type:B,content:t}),Promise.resolve(t)}))}(e)}),(e=>{/fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message)&&console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");return a(new ee({code:e.code||"SYSTEM_ERROR",message:e.message,requestId:e.requestId}))}))}}var Qn={};const Xn="token无效，跳转登录页面",Zn="token过期，跳转登录页面",es={TOKEN_INVALID_TOKEN_EXPIRED:Zn,TOKEN_INVALID_INVALID_CLIENTID:Xn,TOKEN_INVALID:Xn,TOKEN_INVALID_WRONG_TOKEN:Xn,TOKEN_INVALID_ANONYMOUS_USER:Xn},ts={"uni-id-token-expired":Zn,"uni-id-check-token-failed":Xn,"uni-id-token-not-exist":Xn,"uni-id-check-device-feature-failed":Xn};function ns(e,t){let n="";return n=e?`${e}/${t}`:t,n.replace(/^\//,"")}function ss(e=[],t=""){const n=[],s=[];return e.forEach((e=>{!0===e.needLogin?n.push(ns(t,e.path)):!1===e.needLogin&&s.push(ns(t,e.path))})),{needLoginPage:n,notNeedLoginPage:s}}function rs(e){return e.split("?")[0].replace(/^\//,"")}function is(){return function(e){let t=e&&e.$page&&e.$page.fullPath||"";return t?("/"!==t.charAt(0)&&(t="/"+t),t):t}(function(){const e=getCurrentPages();return e[e.length-1]}())}function os(){return rs(is())}function as(e="",t={}){if(!e)return!1;if(!(t&&t.list&&t.list.length))return!1;const n=t.list,s=rs(e);return n.some((e=>e.pagePath===s))}const cs=!!Qn.uniIdRouter;const{loginPage:us,routerNeedLogin:hs,resToLogin:ls,needLoginPage:ds,notNeedLoginPage:ps,loginPageInTabBar:fs}=function({pages:e=[],subPackages:t=[],uniIdRouter:n={},tabBar:s={}}=Qn){const{loginPage:r,needLogin:i=[],resToLogin:o=!0}=n,{needLoginPage:a,notNeedLoginPage:c}=ss(e),{needLoginPage:u,notNeedLoginPage:h}=function(e=[]){const t=[],n=[];return e.forEach((e=>{const{root:s,pages:r=[]}=e,{needLoginPage:i,notNeedLoginPage:o}=ss(r,s);t.push(...i),n.push(...o)})),{needLoginPage:t,notNeedLoginPage:n}}(t);return{loginPage:r,routerNeedLogin:i,resToLogin:o,needLoginPage:[...a,...u],notNeedLoginPage:[...c,...h],loginPageInTabBar:as(r,s)}}();if(ds.indexOf(us)>-1)throw new Error(`Login page [${us}] should not be "needLogin", please check your pages.json`);function gs(e){const t=os();if("/"===e.charAt(0))return e;const[n,s]=e.split("?"),r=n.replace(/^\//,"").split("/"),i=t.split("/");i.pop();for(let e=0;e<r.length;e++){const t=r[e];".."===t?i.pop():"."!==t&&i.push(t)}return""===i[0]&&i.shift(),"/"+i.join("/")+(s?"?"+s:"")}function ms(e){const t=rs(gs(e));return!(ps.indexOf(t)>-1)&&(ds.indexOf(t)>-1||hs.some((t=>function(e,t){return new RegExp(t).test(e)}(e,t))))}function ys({redirect:e}){const t=rs(e),n=rs(us);return os()!==n&&t!==n}function _s({api:e,redirect:t}={}){if(!t||!ys({redirect:t}))return;const n=function(e,t){return"/"!==e.charAt(0)&&(e="/"+e),t?e.indexOf("?")>-1?e+`&uniIdRedirectUrl=${encodeURIComponent(t)}`:e+`?uniIdRedirectUrl=${encodeURIComponent(t)}`:e}(us,t);fs?"navigateTo"!==e&&"redirectTo"!==e||(e="switchTab"):"switchTab"===e&&(e="navigateTo");const s={navigateTo:uni.navigateTo,redirectTo:uni.redirectTo,switchTab:uni.switchTab,reLaunch:uni.reLaunch};setTimeout((()=>{s[e]({url:n})}))}function ws({url:e}={}){const t={abortLoginPageJump:!1,autoToLoginPage:!1},n=function(){const{token:e,tokenExpired:t}=se();let n;if(e){if(t<Date.now()){const e="uni-id-token-expired";n={errCode:e,errMsg:ts[e]}}}else{const e="uni-id-check-token-failed";n={errCode:e,errMsg:ts[e]}}return n}();if(ms(e)&&n){n.uniIdRedirectUrl=e;if(z(j).length>0)return setTimeout((()=>{V(j,n)}),0),t.abortLoginPageJump=!0,t;t.autoToLoginPage=!0}return t}function vs(){!function(){const e=is(),{abortLoginPageJump:t,autoToLoginPage:n}=ws({url:e});t||n&&_s({api:"redirectTo",redirect:e})}();const e=["navigateTo","redirectTo","reLaunch","switchTab"];for(let t=0;t<e.length;t++){const n=e[t];uni.addInterceptor(n,{invoke(e){const{abortLoginPageJump:t,autoToLoginPage:s}=ws({url:e.url});return t?e:s?(_s({api:n,redirect:gs(e.url)}),!1):e}})}}function Is(){this.onResponse((e=>{const{type:t,content:n}=e;let s=!1;switch(t){case"cloudobject":s=function(e){if("object"!=typeof e)return!1;const{errCode:t}=e||{};return t in ts}(n);break;case"clientdb":s=function(e){if("object"!=typeof e)return!1;const{errCode:t}=e||{};return t in es}(n)}s&&function(e={}){const t=z(j);X().then((()=>{const n=is();if(n&&ys({redirect:n}))return t.length>0?V(j,Object.assign({uniIdRedirectUrl:n},e)):void(us&&_s({api:"navigateTo",redirect:n}))}))}(n)}))}function Ss(e){!function(e){e.onResponse=function(e){J(K,e)},e.offResponse=function(e){G(K,e)}}(e),function(e){e.onNeedLogin=function(e){J(j,e)},e.offNeedLogin=function(e){G(j,e)},cs&&(E("_globalUniCloudStatus").needLoginInit||(E("_globalUniCloudStatus").needLoginInit=!0,X().then((()=>{vs.call(e)})),ls&&Is.call(e)))}(e),function(e){e.onRefreshToken=function(e){J($,e)},e.offRefreshToken=function(e){G($,e)}}(e)}let ks;const bs="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",As=/^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;function Ps(){const e=se().token||"",t=e.split(".");if(!e||3!==t.length)return{uid:null,role:[],permission:[],tokenExpired:0};let n;try{n=JSON.parse((s=t[1],decodeURIComponent(ks(s).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""))))}catch(e){throw new Error("获取当前用户信息出错，详细错误信息为："+e.message)}var s;return n.tokenExpired=1e3*n.exp,delete n.exp,delete n.iat,n}ks="function"!=typeof atob?function(e){if(e=String(e).replace(/[\t\n\f\r ]+/g,""),!As.test(e))throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");var t;e+="==".slice(2-(3&e.length));for(var n,s,r="",i=0;i<e.length;)t=bs.indexOf(e.charAt(i++))<<18|bs.indexOf(e.charAt(i++))<<12|(n=bs.indexOf(e.charAt(i++)))<<6|(s=bs.indexOf(e.charAt(i++))),r+=64===n?String.fromCharCode(t>>16&255):64===s?String.fromCharCode(t>>16&255,t>>8&255):String.fromCharCode(t>>16&255,t>>8&255,255&t);return r}:atob;var Ts=t((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});const n="chooseAndUploadFile:ok",s="chooseAndUploadFile:fail";function r(e,t){return e.tempFiles.forEach(((e,n)=>{e.name||(e.name=e.path.substring(e.path.lastIndexOf("/")+1)),t&&(e.fileType=t),e.cloudPath=Date.now()+"_"+n+e.name.substring(e.name.lastIndexOf("."))})),e.tempFilePaths||(e.tempFilePaths=e.tempFiles.map((e=>e.path))),e}function i(e,t,{onChooseFile:s,onUploadProgress:r}){return t.then((e=>{if(s){const t=s(e);if(void 0!==t)return Promise.resolve(t).then((t=>void 0===t?e:t))}return e})).then((t=>!1===t?{errMsg:n,tempFilePaths:[],tempFiles:[]}:function(e,t,s=5,r){(t=Object.assign({},t)).errMsg=n;const i=t.tempFiles,o=i.length;let a=0;return new Promise((n=>{for(;a<s;)c();function c(){const s=a++;if(s>=o)return void(!i.find((e=>!e.url&&!e.errMsg))&&n(t));const u=i[s];e.uploadFile({filePath:u.path,cloudPath:u.cloudPath,fileType:u.fileType,cloudPathAsRealPath:u.cloudPathAsRealPath,onUploadProgress(e){e.index=s,e.tempFile=u,e.tempFilePath=u.path,r&&r(e)}}).then((e=>{u.url=e.fileID,s<o&&c()})).catch((e=>{u.errMsg=e.errMsg||e.message,s<o&&c()}))}}))}(e,t,5,r)))}t.initChooseAndUploadFile=function(e){return function(t={type:"all"}){return"image"===t.type?i(e,function(e){const{count:t,sizeType:n,sourceType:i=["album","camera"],extension:o}=e;return new Promise(((e,a)=>{uni.chooseImage({count:t,sizeType:n,sourceType:i,extension:o,success(t){e(r(t,"image"))},fail(e){a({errMsg:e.errMsg.replace("chooseImage:fail",s)})}})}))}(t),t):"video"===t.type?i(e,function(e){const{camera:t,compressed:n,maxDuration:i,sourceType:o=["album","camera"],extension:a}=e;return new Promise(((e,c)=>{uni.chooseVideo({camera:t,compressed:n,maxDuration:i,sourceType:o,extension:a,success(t){const{tempFilePath:n,duration:s,size:i,height:o,width:a}=t;e(r({errMsg:"chooseVideo:ok",tempFilePaths:[n],tempFiles:[{name:t.tempFile&&t.tempFile.name||"",path:n,size:i,type:t.tempFile&&t.tempFile.type||"",width:a,height:o,duration:s,fileType:"video",cloudPath:""}]},"video"))},fail(e){c({errMsg:e.errMsg.replace("chooseVideo:fail",s)})}})}))}(t),t):i(e,function(e){const{count:t,extension:n}=e;return new Promise(((e,i)=>{let o=uni.chooseFile;if("undefined"!=typeof wx&&"function"==typeof wx.chooseMessageFile&&(o=wx.chooseMessageFile),"function"!=typeof o)return i({errMsg:s+" 请指定 type 类型，该平台仅支持选择 image 或 video。"});o({type:"all",count:t,extension:n,success(t){e(r(t))},fail(e){i({errMsg:e.errMsg.replace("chooseFile:fail",s)})}})}))}(t),t)}}})),Cs=e(Ts);const xs="manual";function Os(e){return{props:{localdata:{type:Array,default:()=>[]},options:{type:[Object,Array],default:()=>({})},spaceInfo:{type:Object,default:()=>({})},collection:{type:[String,Array],default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},foreignKey:{type:String,default:""},loadtime:{type:String,default:"auto"},manual:{type:Boolean,default:!1}},data:()=>({mixinDatacomLoading:!1,mixinDatacomHasMore:!1,mixinDatacomResData:[],mixinDatacomErrorMessage:"",mixinDatacomPage:{}}),created(){this.mixinDatacomPage={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch((()=>{var e=[];return["pageCurrent","pageSize","localdata","collection","action","field","orderby","where","getont","getcount","gettree","groupby","groupField","distinct"].forEach((t=>{e.push(this[t])})),e}),((e,t)=>{if(this.loadtime===xs)return;let n=!1;const s=[];for(let r=2;r<e.length;r++)e[r]!==t[r]&&(s.push(e[r]),n=!0);e[0]!==t[0]&&(this.mixinDatacomPage.current=this.pageCurrent),this.mixinDatacomPage.size=this.pageSize,this.onMixinDatacomPropsChange(n,s)}))},methods:{onMixinDatacomPropsChange(e,t){},mixinDatacomEasyGet({getone:e=!1,success:t,fail:n}={}){this.mixinDatacomLoading||(this.mixinDatacomLoading=!0,this.mixinDatacomErrorMessage="",this.mixinDatacomGet().then((n=>{this.mixinDatacomLoading=!1;const{data:s,count:r}=n.result;this.getcount&&(this.mixinDatacomPage.count=r),this.mixinDatacomHasMore=s.length<this.pageSize;const i=e?s.length?s[0]:void 0:s;this.mixinDatacomResData=i,t&&t(i)})).catch((e=>{this.mixinDatacomLoading=!1,this.mixinDatacomErrorMessage=e,n&&n(e)})))},mixinDatacomGet(t={}){let n=e.database(this.spaceInfo);const s=t.action||this.action;s&&(n=n.action(s));const r=t.collection||this.collection;n=Array.isArray(r)?n.collection(...r):n.collection(r);const i=t.where||this.where;i&&Object.keys(i).length&&(n=n.where(i));const o=t.field||this.field;o&&(n=n.field(o));const a=t.foreignKey||this.foreignKey;a&&(n=n.foreignKey(a));const c=t.groupby||this.groupby;c&&(n=n.groupBy(c));const u=t.groupField||this.groupField;u&&(n=n.groupField(u));!0===(void 0!==t.distinct?t.distinct:this.distinct)&&(n=n.distinct());const h=t.orderby||this.orderby;h&&(n=n.orderBy(h));const l=void 0!==t.pageCurrent?t.pageCurrent:this.mixinDatacomPage.current,d=void 0!==t.pageSize?t.pageSize:this.mixinDatacomPage.size,p=void 0!==t.getcount?t.getcount:this.getcount,f=void 0!==t.gettree?t.gettree:this.gettree,g=void 0!==t.gettreepath?t.gettreepath:this.gettreepath,m={getCount:p},y={limitLevel:void 0!==t.limitlevel?t.limitlevel:this.limitlevel,startWith:void 0!==t.startwith?t.startwith:this.startwith};return f&&(m.getTree=y),g&&(m.getTreePath=y),n=n.skip(d*(l-1)).limit(d).get(m),n}}}}function Es(e){return function(t,n={}){n=function(e,t={}){return e.customUI=t.customUI||e.customUI,e.parseSystemError=t.parseSystemError||e.parseSystemError,Object.assign(e.loadingOptions,t.loadingOptions),Object.assign(e.errorOptions,t.errorOptions),"object"==typeof t.secretMethods&&(e.secretMethods=t.secretMethods),e}({customUI:!1,loadingOptions:{title:"加载中...",mask:!0},errorOptions:{type:"modal",retry:!1}},n);const{customUI:s,loadingOptions:r,errorOptions:i,parseSystemError:o}=n,a=!s;return new Proxy({},{get:(s,u)=>function({fn:e,interceptorName:t,getCallbackArgs:n}={}){return async function(...s){const r=n?n({params:s}):{};let i,o;try{return await D(M(t,"invoke"),{...r}),i=await e(...s),await D(M(t,"success"),{...r,result:i}),i}catch(e){throw o=e,await D(M(t,"fail"),{...r,error:o}),o}finally{await D(M(t,"complete"),o?{...r,error:o}:{...r,result:i})}}}({fn:async function s(...h){let l;a&&uni.showLoading({title:r.title,mask:r.mask});const d={name:t,type:c,data:{method:u,params:h}};"object"==typeof n.secretMethods&&function(e,t){const n=t.data.method,s=e.secretMethods||{},r=s[n]||s["*"];r&&(t.secretType=r)}(n,d);let p=!1;try{l=await e.callFunction(d)}catch(e){p=!0,l={result:new ee(e)}}const{errSubject:f,errCode:g,errMsg:m,newToken:y}=l.result||{};if(a&&uni.hideLoading(),y&&y.token&&y.tokenExpired&&(re(y),V($,{...y})),g){let e=m;if(p&&o){e=(await o({objectName:t,methodName:u,params:h,errSubject:f,errCode:g,errMsg:m})).errMsg||m}if(a)if("toast"===i.type)uni.showToast({title:e,icon:"none"});else{if("modal"!==i.type)throw new Error(`Invalid errorOptions.type: ${i.type}`);{const{confirm:t}=await async function({title:e,content:t,showCancel:n,cancelText:s,confirmText:r}={}){return new Promise(((i,o)=>{uni.showModal({title:e,content:t,showCancel:n,cancelText:s,confirmText:r,success(e){i(e)},fail(){i({confirm:!1,cancel:!0})}})}))}({title:"提示",content:e,showCancel:i.retry,cancelText:"取消",confirmText:i.retry?"重试":"确定"});if(i.retry&&t)return s(...h)}}const n=new ee({subject:f,code:g,message:m,requestId:l.requestId});throw n.detail=l.result,V(K,{type:H,content:n}),n}return V(K,{type:H,content:l.result}),l.result},interceptorName:"callObject",getCallbackArgs:function({params:e}={}){return{objectName:t,methodName:u,params:e}}})})}}function Ls(e){return E("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}",e.config.spaceId))}async function Rs({openid:e,callLoginByWeixin:t=!1}={}){const n=Ls(this);if("mp-weixin"!==A)throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${A}\``);if(e&&t)throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");if(e)return n.mpWeixinOpenid=e,{};const s=await new Promise(((e,t)=>{uni.login({success(t){e(t.code)},fail(e){t(new Error(e.errMsg))}})})),r=this.importObject("uni-id-co",{customUI:!0});return await r.secureNetworkHandshakeByWeixin({code:s,callLoginByWeixin:t}),n.mpWeixinCode=s,{code:s}}async function Us(e){const t=Ls(this);return t.initPromise||(t.initPromise=Rs.call(this,e)),t.initPromise}function Ns(e){return function({openid:t,callLoginByWeixin:n=!1}={}){return Us.call(e,{openid:t,callLoginByWeixin:n})}}function Ds(e){const t={getSystemInfo:uni.getSystemInfo,getPushClientId:uni.getPushClientId};return function(n){return new Promise(((s,r)=>{t[e]({...n,success(e){s(e)},fail(e){r(e)}})}))}}class Ms extends class{constructor(){this._callback={}}addListener(e,t){this._callback[e]||(this._callback[e]=[]),this._callback[e].push(t)}on(e,t){return this.addListener(e,t)}removeListener(e,t){if(!t)throw new Error('The "listener" argument must be of type function. Received undefined');const n=this._callback[e];if(!n)return;const s=function(e,t){for(let n=e.length-1;n>=0;n--)if(e[n]===t)return n;return-1}(n,t);n.splice(s,1)}off(e,t){return this.removeListener(e,t)}removeAllListener(e){delete this._callback[e]}emit(e,...t){const n=this._callback[e];if(n)for(let e=0;e<n.length;e++)n[e](...t)}}{constructor(){super(),this._uniPushMessageCallback=this._receivePushMessage.bind(this),this._currentMessageId=-1,this._payloadQueue=[]}init(){return Promise.all([Ds("getSystemInfo")(),Ds("getPushClientId")()]).then((([{appId:e}={},{cid:t}={}]=[])=>{if(!e)throw new Error("Invalid appId, please check the manifest.json file");if(!t)throw new Error("Invalid push client id");this._appId=e,this._pushClientId=t,this._seqId=Date.now()+"-"+Math.floor(9e5*Math.random()+1e5),this.emit("open"),this._initMessageListener()}),(e=>{throw this.emit("error",e),this.close(),e}))}async open(){return this.init()}_isUniCloudSSE(e){if("receive"!==e.type)return!1;const t=e&&e.data&&e.data.payload;return!(!t||"UNI_CLOUD_SSE"!==t.channel||t.seqId!==this._seqId)}_receivePushMessage(e){if(!this._isUniCloudSSE(e))return;const t=e&&e.data&&e.data.payload,{action:n,messageId:s,message:r}=t;this._payloadQueue.push({action:n,messageId:s,message:r}),this._consumMessage()}_consumMessage(){for(;;){const e=this._payloadQueue.find((e=>e.messageId===this._currentMessageId+1));if(!e)break;this._currentMessageId++,this._parseMessagePayload(e)}}_parseMessagePayload(e){const{action:t,messageId:n,message:s}=e;"end"===t?this._end({messageId:n,message:s}):"message"===t&&this._appendMessage({messageId:n,message:s})}_appendMessage({messageId:e,message:t}={}){this.emit("message",t)}_end({messageId:e,message:t}={}){this.emit("end",t),this.close()}_initMessageListener(){uni.onPushMessage(this._uniPushMessageCallback)}_destroy(){uni.offPushMessage(this._uniPushMessageCallback)}toJSON(){return{appId:this._appId,pushClientId:this._pushClientId,seqId:this._seqId}}close(){this._destroy(),this.emit("close")}}async function qs(e,t){const n=`http://${e}:${t}/system/ping`;try{const e=await(s={url:n,timeout:500},new Promise(((e,t)=>{te.request({...s,success(t){e(t)},fail(e){t(e)}})})));return!(!e.data||0!==e.data.code)}catch(e){return!1}var s}async function Fs(e){if(!I)return Promise.resolve();if("app"===A){const{osName:e,osVersion:t}=ae();"ios"===e&&function(e){if(!e||"string"!=typeof e)return 0;const t=e.match(/^(\d+)./);return t&&t[1]?parseInt(t[1]):0}(t)>=14&&console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）")}const t=e.__dev__;if(!t.debugInfo)return;const{address:n,servePort:s}=t.debugInfo,{address:r}=await async function(e,t){let n;for(let s=0;s<e.length;s++){const r=e[s];if(await qs(r,t)){n=r;break}}return{address:n,port:t}}(n,s);if(r)return t.localAddress=r,void(t.localPort=s);const i=console["app"===A?"error":"warn"];let o="";if("remote"===t.debugInfo.initialLaunchType?(t.debugInfo.forceRemote=!0,o="当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。"):o="无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。",o+="\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数","web"===A&&(o+="\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式"),0===A.indexOf("mp-")&&(o+="\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"),!t.debugInfo.forceRemote)throw new Error(o);i(o)}const Ks={tcb:It,tencent:It,aliyun:de,private:kt,alipay:Ot};let js=new class{init(e){let t={};const n=Ks[e.provider];if(!n)throw new Error("未提供正确的provider参数");t=n.init(e),I&&function(e){if(!I)return;const t={};e.__dev__=t,t.debugLog=I&&!1;const n=P;n&&!n.code&&(t.debugInfo=n);const s=new w({createPromise:function(){return Fs(e)}});t.initLocalNetwork=function(){return s.exec()}}(t),function(e){e._initPromiseHub||(e._initPromiseHub=new w({createPromise:function(){let t=Promise.resolve();const n=e.auth();return t.then((()=>n.getLoginState())).then((e=>e?Promise.resolve():n.signInAnonymously()))}}))}(t),qn(t),function(e){const t=e.uploadFile;e.uploadFile=function(e){return t.call(this,e)}}(t),function(e){e.database=function(t){if(t&&Object.keys(t).length>0)return e.init(t).database();if(this._database)return this._database;const n=Vn(Yn,{uniClient:e});return this._database=n,n},e.databaseForJQL=function(t){if(t&&Object.keys(t).length>0)return e.init(t).databaseForJQL();if(this._databaseForJQL)return this._databaseForJQL;const n=Vn(Yn,{uniClient:e,isJQL:!0});return this._databaseForJQL=n,n}}(t),function(e){e.getCurrentUserInfo=Ps,e.chooseAndUploadFile=Cs.initChooseAndUploadFile(e),Object.assign(e,{get mixinDatacom(){return Os(e)}}),e.SSEChannel=Ms,e.initSecureNetworkByWeixin=Ns(e),e.importObject=Es(e)}(t);return["callFunction","uploadFile","deleteFile","getTempFileURL","downloadFile","chooseAndUploadFile"].forEach((e=>{if(!t[e])return;const n=t[e];t[e]=function(){return n.apply(t,Array.from(arguments))},t[e]=function(e,t){return function(n){let s=!1;if("callFunction"===t){const e=n&&n.type||a;s=e!==a}const r="callFunction"===t&&!s,i=this._initPromiseHub.exec();n=n||{};const{success:o,fail:c,complete:u}=Z(n),h=i.then((()=>s?Promise.resolve():D(M(t,"invoke"),n))).then((()=>e.call(this,n))).then((e=>s?Promise.resolve(e):D(M(t,"success"),e).then((()=>D(M(t,"complete"),e))).then((()=>(r&&V(K,{type:W,content:e}),Promise.resolve(e))))),(e=>s?Promise.reject(e):D(M(t,"fail"),e).then((()=>D(M(t,"complete"),e))).then((()=>(V(K,{type:W,content:e}),Promise.reject(e))))));if(!(o||c||u))return h;h.then((e=>{o&&o(e),u&&u(e),r&&V(K,{type:W,content:e})}),(e=>{c&&c(e),u&&u(e),r&&V(K,{type:W,content:e})}))}}(t[e],e).bind(t)})),t.init=this.init,t}};(()=>{const e=T;let t={};if(e&&1===e.length)t=e[0],js=js.init(t),js._isDefault=!0;else{const t=["auth","callFunction","uploadFile","deleteFile","getTempFileURL","downloadFile","database","getCurrentUSerInfo","importObject"];let n;n=e&&e.length>0?"应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间":C?"应用未关联服务空间，请在uniCloud目录右键关联服务空间":"uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间",t.forEach((e=>{js[e]=function(){return console.error(n),Promise.reject(new ee({code:"SYS_ERR",message:n}))}}))}Object.assign(js,{get mixinDatacom(){return Os(js)}}),Ss(js),js.addInterceptor=U,js.removeInterceptor=N,js.interceptObject=q})();var $s=js;module.exports=$s;
>>>>>>> 66224184943a16e206ec36fe205dcfd8dbf7d100
