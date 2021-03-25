"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("@babel/template"));
const helpers = Object.create(null);
const helper = (tpl) => ({
    ast: () => template_1.default.program.ast(tpl),
});
helpers.isSlot = helper `
  import { isVNode } from 'vue';
  export default function _isSlot(s) {
    return typeof s === 'function' || (Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s));
  }
`;
exports.default = helpers;
