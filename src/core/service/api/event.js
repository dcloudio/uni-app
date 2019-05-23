import Vue from 'vue'

const Emitter = new Vue()

export const $on = Emitter.$on.bind(Emitter)
export const $off = Emitter.$off.bind(Emitter)
export const $once = Emitter.$once.bind(Emitter)
export const $emit = Emitter.$emit.bind(Emitter)
