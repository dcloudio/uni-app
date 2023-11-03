import pagesJson from '@/pages.json';

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

const IS_UNI_APP = "uni-vue3-es" === 'uni-vue3-es' ;
const IS_UNI_APP_SSR = "uni-vue3-es" === 'uni-vue3-cjs';
const IS_VUE3 = "uni-vue3-es" === 'uni-vue3-es';
const IS_VUE2 = "uni-vue3-es" === 'uni';

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

if (UNI_PLATFORM_FIXED === 'app') {
  if (uni._globalUniCloudObj) {
    globalUniCloudObj = uni._globalUniCloudObj;
  } else {
    globalUniCloudObj = uni._globalUniCloudObj = {};
  }
}

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

function delay (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}

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
      {
        preInit = delay(1);
      }
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

export { uniCloud$1 as default };
