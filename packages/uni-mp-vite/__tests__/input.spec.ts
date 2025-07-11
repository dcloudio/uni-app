import { formatInputTag } from '../src/plugins/input'

describe('test input tag', () => {
  test('with end input tag', () => {
    expect(
      formatInputTag(`
      <template>
        <view class="content">
          <image class="logo" src="/static/logo.png"></image>
          <view class="text-area">
            <text class="title">{{ title }}</text>
          </view>
        </view>
      </template>`)
    ).toBe(`
      <template>
        <view class="content">
          <image class="logo" src="/static/logo.png"></image>
          <view class="text-area">
            <text class="title">{{ title }}</text>
          </view>
        </view>
      </template>`)

    expect(
      formatInputTag(
        `<template><view type="text"><input type="text" /></view></template>`
      )
    ).toBe(
      `<template><view type="text"><input type="text" /></view></template>`
    )

    expect(formatInputTag(`<template><input type="text" /></template>`)).toBe(
      `<template><input type="text" /></template>`
    )

    expect(
      formatInputTag(`
    <template>
    <input class="hidden-input" hold-keyboard  type="digit" >    
        <keyboard-accessory>    
                <cover-view class="custom__list">    
                        <cover-view class="custom__item" v-for="i in 4" :key="i" @click="change(i)">{{i * 5}}</cover-view>    
                </cover-view>    
        </keyboard-accessory>    
    </input>
    </template>`)
    ).toBe(`
    <template>
    <input class="hidden-input" hold-keyboard  type="digit" >    
        <keyboard-accessory>    
                <cover-view class="custom__list">    
                        <cover-view class="custom__item" v-for="i in 4" :key="i" @click="change(i)">{{i * 5}}</cover-view>    
                </cover-view>    
        </keyboard-accessory>    
    </input>
    </template>`)
  })

  test('no end input tag', () => {
    expect(formatInputTag(`<template><input ></template>`)).toBe(
      `<template><input  /></template>`
    )

    expect(
      formatInputTag(
        `<template><input id="input1" class="test" type="text" ></template>`
      )
    ).toBe(
      `<template><input id="input1" class="test" type="text"  /></template>`
    )

    expect(
      formatInputTag(
        `<template><input id="input1" class="test" type="text" ><input type="text" /></template>`
      )
    ).toBe(
      `<template><input id="input1" class="test" type="text"  /><input type="text" /></template>`
    )

    expect(
      formatInputTag(`
      <template>
      <input type="text">
      <input type="checkbox"></input>
      <input type="radio" />
      <input type="file">Some content</input>
      <input type="text">xxx</input>
      <input>
        <keyboard-accessory>    
                    234  
              </keyboard-accessory> 
      </input>
      <input type="text" disabled></template>`)
    ).toBe(`
      <template>
      <input type="text" />
      <input type="checkbox"></input>
      <input type="radio" />
      <input type="file">Some content</input>
      <input type="text">xxx</input>
      <input>
        <keyboard-accessory>    
                    234  
              </keyboard-accessory> 
      </input>
      <input type="text" disabled /></template>`)
  })
})
