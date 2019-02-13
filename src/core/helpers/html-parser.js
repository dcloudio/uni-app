/*
 * HTML5 Parser By Sam Blowes
 *
 * Designed for HTML5 documents
 *
 * Original code by John Resig (ejohn.org)
 * http://ejohn.org/blog/pure-javascript-html-parser/
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * ----------------------------------------------------------------------------
 * License
 * ----------------------------------------------------------------------------
 *
 * This code is triple licensed using Apache Software License 2.0,
 * Mozilla Public License or GNU Public License
 *
 * ////////////////////////////////////////////////////////////////////////////
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.  You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * ////////////////////////////////////////////////////////////////////////////
 *
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * The Original Code is Simple HTML Parser.
 *
 * The Initial Developer of the Original Code is Erik Arvidsson.
 * Portions created by Erik Arvidssson are Copyright (C) 2004. All Rights
 * Reserved.
 *
 * ////////////////////////////////////////////////////////////////////////////
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * ----------------------------------------------------------------------------
 * Usage
 * ----------------------------------------------------------------------------
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */

// Regular Expressions for parsing tags and attributes
var startTag =
	/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/

var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/

var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g

// Empty Elements - HTML 5
var empty = makeMap(
  'area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr')

// Block Elements - HTML 5
// fixed by xxx 将 ins 标签从块级名单中移除
var block = makeMap(
  'a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'
)

// Inline Elements - HTML 5
var inline = makeMap(
  'abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'
)

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr')

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap(
  'checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected')

// Special Elements (can contain anything)
var special = makeMap('script,style')

export default function HTMLParser (html, handler) {
  var index; var chars; var match; var stack = []

  var last = html
  stack.last = function () {
    return this[this.length - 1]
  }

  while (html) {
    chars = true

    // Make sure we're not in a script or style element
    if (!stack.last() || !special[stack.last()]) {
      // Comment
      if (html.indexOf('<!--') == 0) {
        index = html.indexOf('-->')

        if (index >= 0) {
          if (handler.comment) { handler.comment(html.substring(4, index)) }
          html = html.substring(index + 3)
          chars = false
        }

        // end tag
      } else if (html.indexOf('</') == 0) {
        match = html.match(endTag)

        if (match) {
          html = html.substring(match[0].length)
          match[0].replace(endTag, parseEndTag)
          chars = false
        }

        // start tag
      } else if (html.indexOf('<') == 0) {
        match = html.match(startTag)

        if (match) {
          html = html.substring(match[0].length)
          match[0].replace(startTag, parseStartTag)
          chars = false
        }
      }

      if (chars) {
        index = html.indexOf('<')

        var text = index < 0 ? html : html.substring(0, index)
        html = index < 0 ? '' : html.substring(index)

        if (handler.chars) { handler.chars(text) }
      }
    } else {
      html = html.replace(new RegExp('([\\s\\S]*?)<\/' + stack.last() + '[^>]*>'), function (all, text) {
        text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, '$1$2')
        if (handler.chars) { handler.chars(text) }

        return ''
      })

      parseEndTag('', stack.last())
    }

    if (html == last) { throw 'Parse Error: ' + html }
    last = html
  }

  // Clean up any remaining tags
  parseEndTag()

  function parseStartTag (tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase()

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last())
      }
    }

    if (closeSelf[tagName] && stack.last() == tagName) {
      parseEndTag('', tagName)
    }

    unary = empty[tagName] || !!unary

    if (!unary) { stack.push(tagName) }

    if (handler.start) {
      var attrs = []

      rest.replace(attr, function (match, name) {
        var value = arguments[2] ? arguments[2]
          : arguments[3] ? arguments[3]
            : arguments[4] ? arguments[4]
              : fillAttrs[name] ? name : ''

        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') // "
        })
      })

      if (handler.start) { handler.start(tagName, attrs, unary) }
    }
  }

  function parseEndTag (tag, tagName) {
    // If no tag name is provided, clean shop
    if (!tagName) { var pos = 0 }

    // Find the closest opened tag of the same type
    else {
      for (var pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos] == tagName) { break }
      }
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (handler.end) { handler.end(stack[i]) }
      }

      // Remove the open elements from the stack
      stack.length = pos
    }
  }
};

function makeMap (str) {
  var obj = {}

  var items = str.split(',')
  for (var i = 0; i < items.length; i++) { obj[items[i]] = true }
  return obj
}
