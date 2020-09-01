# preprocess
[![NPM][npm-image]][npm-url]

[![Linux Build Status][linux-ci-image]][linux-ci-url] [![Windows Build Status][windows-ci-image]][windows-ci-url] [![Coverage Status][coverage-image]][coverage-url] [![dependencies][deps-image]][deps-url] [![dev-dependencies][dev-deps-image]][dev-deps-url]

Preprocess HTML, JavaScript, and other files with directives based off custom or ENV configuration

## Configuration

Install via npm:

```bash
$ npm install --save preprocess
```

## What does it look like?

```html
<head>
  <title>Your App</title>

  <!-- @if NODE_ENV='production' -->
  <script src="some/production/lib/like/analytics.js"></script>
  <!-- @endif -->

</head>
<body>
  <!-- @ifdef DEBUG -->
  <h1>Debugging mode - <!-- @echo RELEASE_TAG --> </h1>
  <!-- @endif -->
  <p>
  <!-- @include welcome_message.txt -->
  </p>
</body>
```

```js
var configValue = '/* @echo FOO */' || 'default value';

// @ifdef DEBUG
someDebuggingCall()
// @endif

```

## Directive syntax

### Basic example

The most basic usage is for files that only have two states, non-processed and processed.
In this case, your `@exclude` directives are removed after preprocessing

```html
<body>
    <!-- @exclude -->
    <header>You're on dev!</header>
    <!-- @endexclude -->
</body>
```

After build

```html
<body>
</body>
```

### All directives

 - `@if VAR='value'` / `@endif`
   This will include the enclosed block if your test passes
 - `@ifdef VAR` / `@endif`
   This will include the enclosed block if VAR is defined (typeof !== 'undefined')
 - `@ifndef VAR` / `@endif`
   This will include the enclosed block if VAR is not defined (typeof === 'undefined')
 - `@include`
   This will include the source from an external file. If the included source ends with a newline then the
   following line will be space indented to the level the @include was found.
 - `@include-static`
   Works the same way as `@include` but doesn't process the included file recursively. Is useful if a large
   file has to be included and the recursive processing is not necessary or would otherwise take too long.
 - `@extend file.html` / `@endextend`
   This will use the source from the external file indicated with the `@extend` tag to wrap the enclosed block.
 - `@extendable`
   This tag is used to indicate the location in a file referenced using `@extend` where the block enclosed by `@extend` will be populated.
 - `@exclude` / `@endexclude`
   This will remove the enclosed block upon processing
 - `@echo VAR`
   This will include the environment variable VAR into your source
 - `@foreach $VAR in ARR` / `@endfor`
   This will repeat the enclosed block for each value in the Array or Object in ARR. Each value in ARR can be interpolated into the resulting content with $VAR.
 - `@exec FUNCTION([param1, param2...])`
   This will execute the environment FUNCTION with its parameters and echo the result into your source. The parameter
   could be a string or a reference to another environment variable.

### Extended html Syntax

This is useful for more fine grained control of your files over multiple
environment configurations. You have access to simple tests of any variable within the context (or ENV, if not supplied)

```html
<body>
    <!-- @if NODE_ENV!='production' -->
    <header>You're on dev!</header>
    <!-- @endif -->

    <!-- @if NODE_ENV='production' -->
    <script src="some/production/javascript.js"></script>
    <!-- @endif -->

    <script>
    var fingerprint = '<!-- @echo COMMIT_HASH -->' || 'DEFAULT';
    </script>

    <script src="<!-- @exec static_path('another/production/javascript.js') -->"></script>
</body>
```

With a `NODE_ENV` set to `production` and `0xDEADBEEF` in
`COMMIT_HASH` this will be built to look like

```html
<body>
    <script src="some/production/javascript.js"></script>

    <script>
    var fingerprint = '0xDEADBEEF' || 'DEFAULT';
    </script>

    <script src="http://cdn2.my.domain.com/another/javascript.js"></script>
</body>
```

With NODE_ENV not set or set to dev and nothing in COMMIT_HASH,
the built file will be

```html
<body>
    <header>You're on dev!</header>

    <script>
    var fingerprint = '' || 'DEFAULT';
    </script>

    <script src="http://localhost/myapp/statics/another/javascript.js"></script>
</body>
```

You can also have conditional blocks that are hidden by default by using the
fictional `!>` end tag instead of `-->` after your condition:

```html
<!-- @if true !>
<p>Process was run!</p>
<!-- @endif -->
```

### JavaScript, CSS, C, Java Syntax

Extended syntax below, but will work without specifying a test

```js
normalFunction();
//@exclude
superExpensiveDebugFunction()
//@endexclude

anotherFunction('/* @echo USERNAME */');
```

Built with a NODE_ENV of production :

```js
normalFunction();

anotherFunction('jsoverson');
```

Like HTML, you can have conditional blocks that are hidden by default by ending the directive with a `**` instead of `*/`

```js
angular.module('myModule', ['dep1'
    , 'dep2'
    /* @if NODE_ENV='production' **
    , 'prod_dep'
    /* @endif */
    /* @exclude **
    , 'debug_dep'
    /* @endexclude */
]);

```

_Note: Hidden by default blocks only work with block comments (`/* */`) but not with line comments (`//`)._

CSS example

```css
body {
/* @if NODE_ENV=='development' */
  background-color: red;
/* @endif */

}
// @include util.css
```

(CSS preprocessing supports single line comment style directives)



### Shell, PHP

```bash
#!/bin/bash

# @include util.sh
```

## API

### preprocess(source[, context[, options]]) -> preprocessedSource

Preprocesses a source provided as a string and returns the preprocessed source.

#### source
Type: `String` (mandatory)

The source to preprocess.

#### context
Type: `Object`
Default: `process.env`

The context that contains the variables that are used in the source. For `@extend` variants and `@include` the additional
context property `src` is available inside of files to be included that contains the current file name. This property is also
available in the context of the source file if one of the `preprocessFile*()` API variants are used.

#### options
Type: `Object`

The options object allows to pass additional options to `preprocess`. Available options are:

##### options.fileNotFoundSilentFail
Type: `Boolean`
Default: `false`

When using `@include` variants and `@extend`, `preprocess` will by default throw an exception in case an included
file can't be found. Set this option to `true` to instruct `preprocess` to fail silently and instead of throwing
to write a message inside of the preprocessed file that an included file could not be found.

##### options.srcDir
Type: `String`
Default: `process.cwd()`

The directory where to look for files included via `@include` variants and `@extend`.

##### options.srcEol
Type: `String`
Default: EOL of source string or `os.EOL` if source string contains multiple different or no EOLs.

The end of line (EOL) character to use for the preprocessed result. May be one of:
 - `\r\n` - Windows
 - `\n` - Linux/OSX/Unix
 - `\r` - legacy Mac

##### options.type
Type: `String`
Default: `html`

The syntax type of source string to preprocess. There are 3 main syntax variants:
 - `html`, aliases: `xml`
 - `js`, aliases: `javascript`, `jsx`, `c`, `cc`, `cpp`, `cs`, `csharp`, `java`, `less`, `sass`, `scss`, `css`, `php`,
   `ts`, `tsx`, `peg`, `pegjs`, `jade`, `styl`
 - `coffee`, aliases: `bash`, `shell`, `sh`

### preprocessFile(srcFile, destFile[, context[, callback[, options]]])

Preprocesses a `sourceFile` and saves the result to `destFile`. Simple wrapper around `fs.readFile()` and `fs.writeFile()`.

#### srcFile
Type: `String` (mandatory)

The path to the source file to preprocess.

#### destFile
Type: `String` (mandatory)

The path to the destination file where the preprocessed result shall be saved.

#### context
See `context` [attribute description](#context) of `preprocess()` function.

#### callback
Type: `function(err)`

The callback function that is called upon error or completion. Receives an error if something goes wrong as first parameter.

#### options
See `options` [attribute description](#options) of `preprocess()` function. Differs only in that the default `srcDir` value is set
to the path of the provided source file instead of `process.cwd()` and the default `type` is derived from source file extension.


### preprocessFileSync(srcFile, destFile[, context[, options]])

Preprocesses a `sourceFile` and saves the result to `destFile`. Simple wrapper around `fs.readFileSync()` and `fs.writeFileSync()`.

#### srcFile
Type: `String` (mandatory)

The path to the source file to preprocess.

#### destFile
Type: `String` (mandatory)

The path to the destination file where the preprocessed result shall be saved.

#### context
See `context` [attribute description](#context) of `preprocess()` function.

#### options
See `options` [attribute description](#options) of `preprocess()` function. Differs only in that the default `srcDir` value is set
to the path of the provided source file instead of `process.cwd()` and the default `type` is derived from source file extension.

## Usage Examples

```js
var pp = require('preprocess');

var text = 'Hi, I am <!-- @echo USERNAME -->';

pp.preprocess(text);
// -> Hi, I am jsoverson

pp.preprocess(text, {USERNAME : "Bob"});
// -> Hi, I am Bob

// specify the format to use for the directives as the third parameter
pp.preprocess(text, {USERNAME : "Bob"}, {type: 'html'});
// -> Hi, I am Bob

// Preprocess files asynchronously
pp.preprocessFile(src, dest, context, callback, options);

// Preprocess files synchronously
pp.preprocessFileSync(src, dest, context, options);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or
changed functionality. Lint and test your code using jshint

## Release History
 - 3.1.0
    - Added `.jsx` file extension as an alias for `js` (@BendingBender, #79)
    - Added `.tsx` file extension as an alias for `js` (@rosendi, #100)
    - Bumped XRegExp to v3

 - 3.0.1/2 Fixes for backward compatibility and regex cleanups (thanks to @anseki for suggestions, #77)
 - 3.0.0

   Breaking changes:
   - If a file requested by `@include` or `@extend` can not be found, `preprocess` will now throw by default
     with a possibility to opt in to the legacy behavior via the `fileNotFoundSilentFail` option (@BendingBender, #35).
   - Fixed multiple issues with newlines (@BendingBender, #8), this may result in output that differs from earlier
     versions.
   - The `srcDir` option was moved to the options object and now defaults to `process.cwd` instead of throwing by
     default (@BendingBender, #68)

   New functionality:
   - All block directives (ones that have a start and an end token, like `@if`/`@endif`) are now processed recursively (@Frizi, #61)
   - Added hidden by default configuration blocks for `js` (@mallowigi, #40) and `html` (@Frizi, #66)

   Fixes:
   - fixed `@exec` in files included via `@include` and `@extend` (@BendingBender, #58)
   - changed `@extend` and `@exclude` html regex so that directives may appear more than once in one line (@BendingBender, #36)
   - fixed multiple issues with coffescript syntax (@BendingBender, #39)
   - fixed `@if` and `@foreach` to not require trailing whitespace (@BendingBender, #74)

 - 2.3.1 Fixed @echo and @exec directives to allow `-` and `*` characters, fixed @exec with multiple params (@BendingBender, #21, #45, #51, #54).
 - 2.3.0 Added support for @include-static (@BendingBender)
 - 2.2.0 Added support for @foreach and @extend (@orionstein)
 - 2.1.1 Added support for .styl files via js regex (@nsonnad)
 - 2.1.0 Added automatic support for numerous formats, merged @exec, hidden by default html tags, added simple directives
 - 2.0.0 Added ability to echo strings, added conditional comments, removed lodash, merged 17, 13, 15, 16
 - 1.2.0 Added processing for hash-style comments (@marsch). Added more file aliases.
 - 1.1.0 Added deep inclusion, fixed sequential ifs
 - 1.0.1 Fixed multiple inline echo statements
 - 1.0.0 Pulled from grunt-preprocess to stand alone

## License

Copyright Jarrod Overson

Written by Jarrod Overson

Licensed under the Apache 2.0 license.

[npm-image]: https://nodei.co/npm/preprocess.png?downloads=true
[npm-url]: https://www.npmjs.com/package/preprocess
[linux-ci-image]: https://img.shields.io/travis/jsoverson/preprocess/master.svg?style=flat-square&label=Linux%20build
[linux-ci-url]: https://travis-ci.org/jsoverson/preprocess
[windows-ci-image]: https://img.shields.io/appveyor/ci/BendingBender/preprocess/master.svg?style=flat-square&label=Windows%20build
[windows-ci-url]: https://ci.appveyor.com/project/BendingBender/preprocess
[deps-image]: https://img.shields.io/david/jsoverson/preprocess.svg?style=flat-square
[deps-url]: https://david-dm.org/jsoverson/preprocess
[dev-deps-image]: https://img.shields.io/david/dev/jsoverson/preprocess.svg?style=flat-square
[dev-deps-url]: https://david-dm.org/jsoverson/preprocess#info=devDependencies
[coverage-image]: https://img.shields.io/coveralls/jsoverson/preprocess/master.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/jsoverson/preprocess?branch=master
