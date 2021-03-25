"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSlot = void 0;
const vue_1 = require("vue");
const isFunction = (val) => typeof val === 'function';
const isObject = (val) => Object.prototype.toString.call(val) === '[object Object]';
const isSlot = (s) => isFunction(s) || (isObject(s) && !vue_1.isVNode(s));
exports.isSlot = isSlot;
