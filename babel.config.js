const config = {
  ignore: [
    "./packages",
  ],
  presets: [
    ["@vue/app", {
      useBuiltIns: "entry"
    }]
  ],
  plugins: [require('./lib/babel-plugin-uni-api/index.js')]
}

if (process.env.NODE_ENV === 'test') {
  delete config.ignore
}

module.exports = config
