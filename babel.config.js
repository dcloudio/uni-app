/**
 * @type {import('@babel/core').TransformOptions}
 */
const config = {
  // ignore: [
  //   "./packages",
  // ],
  presets: [
    ["@vue/cli-plugin-babel/preset", {
      useBuiltIns: "entry"
    }]
  ],
  plugins: [require('./lib/babel-plugin-uni-api/index.js')],
  env: {
    test: {
      presets: [["@babel/preset-env", { targets: { node: "current" } }]],
    },
  },
}

if (process.env.NODE_ENV === 'test') {
  delete config.ignore
}

module.exports = config
