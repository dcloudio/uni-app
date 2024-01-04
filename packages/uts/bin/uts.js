#!/usr/bin/env node

const os = require('os')
const path = require('path')
const { toKotlin, toSwift } = require('../dist')
const isWindows = os.platform() === 'win32'

const args = process.argv

const fileName = args[2]
if (!fileName) {
    console.log('Please specify a file name')
    process.exit(1)
}

const filename = normalizePath(path.resolve(fileName))
const inputDir = normalizePath(path.dirname(filename))

const index = args.findIndex((arg) => arg === '--out' || arg === '-o')

const out = normalizePath(path.resolve((index > -1 ? args[index + 1] : '') || inputDir))
const outSwiftFile = out.endsWith('.swift')
const outKotlinFile = out.endsWith('.kt')
const isOutFile = outSwiftFile || outKotlinFile
const isSwift = args.some((arg) => arg === '--swift') || outSwiftFile
const outDir = isOutFile ? path.dirname(out) : out
const outFilename = path.basename(isOutFile ? out : filename)

function normalizePath(id) {
    return isWindows ? id.replace(/\\/g, '/') : id
}

async function run() {

    const options = {
        input: {
            root: inputDir,
            filename
        },
        output: {
            outDir,
            outFilename,
            extname: isSwift ? 'swift' : 'kt',
            removeImports: true,
        }
    }
    console.log(options)
    let result = {}
    if (isSwift) {
        result = await toSwift(options)
    } else {
        result = await toKotlin(options)
    }
    console.log(result)
}

run()