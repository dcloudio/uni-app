module.exports = {
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
