/**
 * html2Json 改造来自: https://github.com/Jxck/html2json
 *
 *
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 *
 * github地址: https://github.com/icindy/wxParse
 *
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

import wxDiscode from './wxDiscode';
import HTMLParser from './htmlparser';

const placeImgeUrlHttps = 'https';

function makeMap(str) {
  const obj = {};
  const items = str.split(',');
  for (let i = 0; i < items.length; i += 1) obj[items[i]] = true;
  return obj;
}

// Block Elements - HTML 5
const block = makeMap('br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');

// Inline Elements - HTML 5
const inline = makeMap('abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');

// Elements that you can, intentionally, leave open
// (and which close themselves)
const closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

function removeDOCTYPE(html) {
  return html
    .replace(/<\?xml.*\\?>\n/, '')
    .replace(/<.*!doctype.*\\>\n/, '')
    .replace(/<.*!DOCTYPE.*\\>\n/, '');
}

function trimHtml(html) {
  return html
    .replace(/<!--.*?-->/gi, '')
    .replace(/\/\*.*?\*\//gi, '')
    .replace(/[ ]+</gi, '<');
}

function html2json(html, image, debug) {
  // 处理字符串
  html = removeDOCTYPE(html);
  html = trimHtml(html);
  html = wxDiscode.strDiscode(html);
  // 生成node节点
  const bufArray = [];
  const results = {
    nodes: [],
    images: [],
    imageUrls: [],
  };
  let index = 0;

  image.urls = results.imageUrls;

  HTMLParser(html, {
    start(tag, attrs, unary) {
      // node for this element
      const node = {
        node: 'element',
        tag,
      };

      if (bufArray.length === 0) {
        node.index = index.toString();
        index += 1;
      } else {
        const parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        node.index = `${parent.index}.${parent.nodes.length}`;
      }

      if (block[tag]) {
        node.tagType = 'block';
      } else if (inline[tag]) {
        node.tagType = 'inline';
      } else if (closeSelf[tag]) {
        node.tagType = 'closeSelf';
      }

      node.attr = attrs.reduce((pre, attr) => {
        const { name } = attr;
        let { value } = attr;
        if (name === 'class') {
          if (debug) console.dir(value);
          //  value = value.join("")
          node.classStr = value;
        }
        // has multi attibutes
        // make it array of attribute
        if (name === 'style') {
          if (debug) console.dir(value);
          //  value = value.join("")
          node.styleStr = value;
        }
        if (value.match(/ /)) {
          value = value.split(' ');
        }

        // if attr already exists
        // merge it
        if (pre[name]) {
          if (Array.isArray(pre[name])) {
            // already array, push to last
            pre[name].push(value);
          } else {
            // single value, make it array
            pre[name] = [pre[name], value];
          }
        } else {
          // not exist, put it
          pre[name] = value;
        }

        return pre;
      }, {});

      // 对img添加额外数据
      if (node.tag === 'img') {
        node.imgIndex = results.images.length;
        let imgUrl = node.attr.src;
        imgUrl = wxDiscode.urlToHttpUrl(imgUrl, placeImgeUrlHttps);
        node.attr.src = imgUrl || '';
        node.image = image;
        if (imgUrl) {
          results.images.push(node);
          results.imageUrls.push(imgUrl);
        }
      }

      // 处理a标签属性
      if (node.tag === 'a') {
        node.attr.href = node.attr.href || '';
      }

      // 处理font标签样式属性
      if (node.tag === 'font') {
        const fontSize = [
          'x-small',
          'small',
          'medium',
          'large',
          'x-large',
          'xx-large',
          '-webkit-xxx-large',
        ];
        const styleAttrs = {
          color: 'color',
          face: 'font-family',
          size: 'font-size',
        };
        if (!node.attr.style) node.attr.style = [];
        if (!node.styleStr) node.styleStr = '';
        Object.keys(styleAttrs).forEach((key) => {
          if (node.attr[key]) {
            const value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
            node.attr.style.push(styleAttrs[key]);
            node.attr.style.push(value);
            node.styleStr += `${styleAttrs[key]}: ${value};`;
          }
        });
      }

      // 临时记录source资源
      if (node.tag === 'source') {
        results.source = node.attr.src;
      }

      if (unary) {
        // if this tag doesn't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        const parent = bufArray[0] || results;
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end(tag) {
      // merge into parent tag
      const node = bufArray.shift();
      if (node.tag !== tag && debug) {
        console.error('invalid state: mismatch end tag');
      }

      // 当有缓存source资源时于于video补上src资源
      if (node.tag === 'video' && results.source) {
        node.attr.src = results.source;
        delete results.source;
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        const parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    },
    chars(text) {
      const node = {
        node: 'text',
        text: text.trim(),
      };

      if (bufArray.length === 0) {
        node.index = index.toString();
        index += 1;
        results.nodes.push(node);
      } else {
        const parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        node.index = `${parent.index}.${parent.nodes.length}`;
        parent.nodes.push(node);
      }
    },
    comment(text) {
      const node = {
        node: 'comment',
        text,
      };
      const parent = bufArray[0];
      if (parent.nodes === undefined) {
        parent.nodes = [];
      }
      parent.nodes.push(node);
    },
  });
  return results;
}

export default html2json;
