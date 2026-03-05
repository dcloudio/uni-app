const {
    readFileSync,
    readdirSync
} = require('fs')
const {
    extname,
    resolve
} = require('path')

const describeRE = /describe\(["|'](.*)["|']/
const testsRE = /test\(["|'](.*)["|']/g

function parse(content) {
    const describes = content.match(describeRE)
    if (!describes) {
        return
    }
    const describe = describes[1]
    const tests = []
    let test
    while (test = testsRE.exec(content)) {
        tests.push(test[1])
    }
    return {
        describe,
        tests
    }
}

function parseDescribes() {
    const dir = resolve(__dirname, 'uni_modules/uts-tests/utssdk')
    const describes = []
    readdirSync(dir).forEach(file => {
        if (extname(file) === '.uts') {
            describes.push(parse(readFileSync(resolve(dir, file), 'utf8')))
        }
    })
    return describes
};

module.exports = {
    testTimeout: 60000,
    reporters: [
        'default'
    ],
    setupFiles: ['./jest.global.js'],
    globals: {
        describes: parseDescribes()
    },
    watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
    moduleFileExtensions: ['js', 'json'],
    rootDir: __dirname,
    testMatch: ["<rootDir>/pages/**/*test.[jt]s?(x)"],
    testPathIgnorePatterns: ['/node_modules/']
}
