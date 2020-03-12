const path = require('path')

const {
  getPlatformExts
} = require('../shared')

const ROOT_DATA_VAR = '$root'

function generatePageWxml (name, importee) {
  if (process.env.UNI_PLATFORM === 'mp-baidu') {
    return `<import src="${importee}" />
    <template is="${name}" data="{{{ ...${ROOT_DATA_VAR}['0'], ${ROOT_DATA_VAR} }}}"/>`
  } else if (process.env.UNI_PLATFORM === 'mp-alipay') {
    return `<template is="${name}" data="{{ ...${ROOT_DATA_VAR}['0'], ${ROOT_DATA_VAR} }}"/>`
  }
  return `<import src="${importee}" />
    <template is="${name}" data="{{ ...${ROOT_DATA_VAR}['0'], ${ROOT_DATA_VAR} }}"/>`
}

module.exports = function generatePagesWxml (pages, subPages) {
  return Object.keys(pages).map(page => { // page wxml
    const ext = getPlatformExts().template
    return {
      file: page + ext,
      source: generatePageWxml(pages[page], `./${path.basename(page)}.vue${ext}`)
    }
  })
}
