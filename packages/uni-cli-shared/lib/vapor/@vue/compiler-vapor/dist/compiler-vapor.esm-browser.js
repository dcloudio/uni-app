/**
* @vue/compiler-vapor v3.5.14
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}

const EMPTY_OBJ = Object.freeze({}) ;
const NOOP = () => {
};
const NO = () => false;
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const isArray = Array.isArray;
const isString = (val) => typeof val === "string";
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelizeReplacer = (_, c) => c ? c.toUpperCase() : "";
const camelize = cacheStringFunction(
  (str) => str.replace(camelizeRE, camelizeReplacer)
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function genPropsAccessExp(name) {
  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}
function canSetValueDirectly(tagName) {
  return tagName !== "PROGRESS" && // custom elements may use _value internally
  !tagName.includes("-");
}

const GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol";
const isGloballyAllowed = /* @__PURE__ */ makeMap(GLOBALS_ALLOWED);

const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);

function shouldSetAsAttr(tagName, key) {
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return true;
  }
  if (key === "form") {
    return true;
  }
  if (key === "list" && tagName === "INPUT") {
    return true;
  }
  if (key === "type" && tagName === "TEXTAREA") {
    return true;
  }
  if ((key === "width" || key === "height") && (tagName === "IMG" || tagName === "VIDEO" || tagName === "CANVAS" || tagName === "SOURCE")) {
    return true;
  }
  return false;
}

const TELEPORT = Symbol(`Teleport` );
const SUSPENSE = Symbol(`Suspense` );
const KEEP_ALIVE = Symbol(`KeepAlive` );
const BASE_TRANSITION = Symbol(
  `BaseTransition` 
);
function registerRuntimeHelpers(helpers) {
  Object.getOwnPropertySymbols(helpers).forEach((s) => {
  });
}

const locStub = {
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 },
  source: ""
};
function createRoot(children, source = "") {
  return {
    type: 0,
    source,
    children,
    helpers: /* @__PURE__ */ new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: [],
    temps: 0,
    codegenNode: void 0,
    loc: locStub
  };
}
function createSimpleExpression(content, isStatic = false, loc = locStub, constType = 0) {
  return {
    type: 4,
    loc,
    content,
    isStatic,
    constType: isStatic ? 3 : constType
  };
}

// Generated using scripts/write-decode-map.ts
var htmlDecodeTree = new Uint16Array(
// prettier-ignore
"\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c"
    .split("")
    .map((c) => c.charCodeAt(0)));

// Generated using scripts/write-decode-map.ts
var xmlDecodeTree = new Uint16Array(
// prettier-ignore
"\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022"
    .split("")
    .map((c) => c.charCodeAt(0)));

// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
var _a;
const decodeMap = new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
]);
/**
 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
 */
const fromCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
    let output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
};
/**
 * Replace the given code point with a replacement character if it is a
 * surrogate or is outside the valid range. Otherwise return the code
 * point unchanged.
 */
function replaceCodePoint(codePoint) {
    var _a;
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return 0xfffd;
    }
    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
}

var CharCodes;
(function (CharCodes) {
    CharCodes[CharCodes["NUM"] = 35] = "NUM";
    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
    CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
    CharCodes[CharCodes["NINE"] = 57] = "NINE";
    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
    CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
    CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
    CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
const TO_LOWER_BIT = 0b100000;
var BinTrieFlags;
(function (BinTrieFlags) {
    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F));
}
function isAsciiAlphaNumeric(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z) ||
        isNumber(code));
}
/**
 * Checks if the given character is a valid end character for an entity in an attribute.
 *
 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
 */
function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function (EntityDecoderState) {
    EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function (DecodingMode) {
    /** Entities in text nodes that can end with any character. */
    DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
    /** Only allow entities terminated with a semicolon. */
    DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
    /** Entities in attributes have limitations on ending characters. */
    DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
/**
 * Token decoder with support of writing partial entities.
 */
class EntityDecoder {
    constructor(
    /** The tree used to decode entities. */
    decodeTree, 
    /**
     * The function that is called when a codepoint is decoded.
     *
     * For multi-byte named entities, this will be called multiple times,
     * with the second codepoint, and the same `consumed` value.
     *
     * @param codepoint The decoded codepoint.
     * @param consumed The number of bytes consumed by the decoder.
     */
    emitCodePoint, 
    /** An object that is used to produce errors. */
    errors) {
        this.decodeTree = decodeTree;
        this.emitCodePoint = emitCodePoint;
        this.errors = errors;
        /** The current state of the decoder. */
        this.state = EntityDecoderState.EntityStart;
        /** Characters that were consumed while parsing an entity. */
        this.consumed = 1;
        /**
         * The result of the entity.
         *
         * Either the result index of a numeric entity, or the codepoint of a
         * numeric entity.
         */
        this.result = 0;
        /** The current index in the decode tree. */
        this.treeIndex = 0;
        /** The number of characters that were consumed in excess. */
        this.excess = 1;
        /** The mode in which the decoder is operating. */
        this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    startEntity(decodeMode) {
        this.decodeMode = decodeMode;
        this.state = EntityDecoderState.EntityStart;
        this.result = 0;
        this.treeIndex = 0;
        this.excess = 1;
        this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    write(str, offset) {
        switch (this.state) {
            case EntityDecoderState.EntityStart: {
                if (str.charCodeAt(offset) === CharCodes.NUM) {
                    this.state = EntityDecoderState.NumericStart;
                    this.consumed += 1;
                    return this.stateNumericStart(str, offset + 1);
                }
                this.state = EntityDecoderState.NamedEntity;
                return this.stateNamedEntity(str, offset);
            }
            case EntityDecoderState.NumericStart: {
                return this.stateNumericStart(str, offset);
            }
            case EntityDecoderState.NumericDecimal: {
                return this.stateNumericDecimal(str, offset);
            }
            case EntityDecoderState.NumericHex: {
                return this.stateNumericHex(str, offset);
            }
            case EntityDecoderState.NamedEntity: {
                return this.stateNamedEntity(str, offset);
            }
        }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericStart(str, offset) {
        if (offset >= str.length) {
            return -1;
        }
        if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(str, offset + 1);
        }
        this.state = EntityDecoderState.NumericDecimal;
        return this.stateNumericDecimal(str, offset);
    }
    addToNumericResult(str, start, end, base) {
        if (start !== end) {
            const digitCount = end - start;
            this.result =
                this.result * Math.pow(base, digitCount) +
                    parseInt(str.substr(start, digitCount), base);
            this.consumed += digitCount;
        }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericHex(str, offset) {
        const startIdx = offset;
        while (offset < str.length) {
            const char = str.charCodeAt(offset);
            if (isNumber(char) || isHexadecimalCharacter(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 16);
                return this.emitNumericEntity(char, 3);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 16);
        return -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericDecimal(str, offset) {
        const startIdx = offset;
        while (offset < str.length) {
            const char = str.charCodeAt(offset);
            if (isNumber(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 10);
                return this.emitNumericEntity(char, 2);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 10);
        return -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    emitNumericEntity(lastCp, expectedLength) {
        var _a;
        // Ensure we consumed at least one digit.
        if (this.consumed <= expectedLength) {
            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
        }
        // Figure out if this is a legit end of the entity
        if (lastCp === CharCodes.SEMI) {
            this.consumed += 1;
        }
        else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
        }
        this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
        if (this.errors) {
            if (lastCp !== CharCodes.SEMI) {
                this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
        }
        return this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNamedEntity(str, offset) {
        const { decodeTree } = this;
        let current = decodeTree[this.treeIndex];
        // The mask is the number of bytes of the value, including the current byte.
        let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        for (; offset < str.length; offset++, this.excess++) {
            const char = str.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
            if (this.treeIndex < 0) {
                return this.result === 0 ||
                    // If we are parsing an attribute
                    (this.decodeMode === DecodingMode.Attribute &&
                        // We shouldn't have consumed any characters after the entity,
                        (valueLength === 0 ||
                            // And there should be no invalid characters.
                            isEntityInAttributeInvalidEnd(char)))
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            // If the branch is a value, store it and continue
            if (valueLength !== 0) {
                // If the entity is terminated by a semicolon, we are done.
                if (char === CharCodes.SEMI) {
                    return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
                }
                // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
                if (this.decodeMode !== DecodingMode.Strict) {
                    this.result = this.treeIndex;
                    this.consumed += this.excess;
                    this.excess = 0;
                }
            }
        }
        return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    emitNotTerminatedNamedEntity() {
        var _a;
        const { result, decodeTree } = this;
        const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
        this.emitNamedEntityData(result, valueLength, this.consumed);
        (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
        return this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    emitNamedEntityData(result, valueLength, consumed) {
        const { decodeTree } = this;
        this.emitCodePoint(valueLength === 1
            ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH
            : decodeTree[result + 1], consumed);
        if (valueLength === 3) {
            // For multi-byte values, we need to emit the second byte.
            this.emitCodePoint(decodeTree[result + 2], consumed);
        }
        return consumed;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    end() {
        var _a;
        switch (this.state) {
            case EntityDecoderState.NamedEntity: {
                // Emit a named entity if we have one.
                return this.result !== 0 &&
                    (this.decodeMode !== DecodingMode.Attribute ||
                        this.result === this.treeIndex)
                    ? this.emitNotTerminatedNamedEntity()
                    : 0;
            }
            // Otherwise, emit a numeric entity if we have one.
            case EntityDecoderState.NumericDecimal: {
                return this.emitNumericEntity(0, 2);
            }
            case EntityDecoderState.NumericHex: {
                return this.emitNumericEntity(0, 3);
            }
            case EntityDecoderState.NumericStart: {
                (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
                return 0;
            }
            case EntityDecoderState.EntityStart: {
                // Return 0 if we have no entity.
                return 0;
            }
        }
    }
}
/**
 * Creates a function that decodes entities in a string.
 *
 * @param decodeTree The decode tree.
 * @returns A function that decodes entities in a string.
 */
function getDecoder(decodeTree) {
    let ret = "";
    const decoder = new EntityDecoder(decodeTree, (str) => (ret += fromCodePoint(str)));
    return function decodeWithTrie(str, decodeMode) {
        let lastIndex = 0;
        let offset = 0;
        while ((offset = str.indexOf("&", offset)) >= 0) {
            ret += str.slice(lastIndex, offset);
            decoder.startEntity(decodeMode);
            const len = decoder.write(str, 
            // Skip the "&"
            offset + 1);
            if (len < 0) {
                lastIndex = offset + decoder.end();
                break;
            }
            lastIndex = offset + len;
            // If `len` is 0, skip the current `&` and continue.
            offset = len === 0 ? lastIndex + 1 : lastIndex;
        }
        const result = ret + str.slice(lastIndex);
        // Make sure we don't keep a reference to the final string.
        ret = "";
        return result;
    };
}
/**
 * Determines the branch of the current node that is taken given the current
 * character. This function is used to traverse the trie.
 *
 * @param decodeTree The trie.
 * @param current The current node.
 * @param nodeIdx The index right after the current node and its value.
 * @param char The current character.
 * @returns The index of the next node, or -1 if no branch is taken.
 */
function determineBranch(decodeTree, current, nodeIdx, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    // Case 1: Single branch encoded in jump offset
    if (branchCount === 0) {
        return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    // Case 2: Multiple branches encoded in jump table
    if (jumpOffset) {
        const value = char - jumpOffset;
        return value < 0 || value >= branchCount
            ? -1
            : decodeTree[nodeIdx + value] - 1;
    }
    // Case 3: Multiple branches encoded in dictionary
    // Binary search for the character.
    let lo = nodeIdx;
    let hi = lo + branchCount - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        const midVal = decodeTree[mid];
        if (midVal < char) {
            lo = mid + 1;
        }
        else if (midVal > char) {
            hi = mid - 1;
        }
        else {
            return decodeTree[mid + branchCount];
        }
    }
    return -1;
}
const htmlDecoder = getDecoder(htmlDecodeTree);
getDecoder(xmlDecodeTree);
/**
 * Decodes an HTML string.
 *
 * @param str The string to decode.
 * @param mode The decoding mode.
 * @returns The decoded string.
 */
function decodeHTML(str, mode = DecodingMode.Legacy) {
    return htmlDecoder(str, mode);
}

const defaultDelimitersOpen = new Uint8Array([123, 123]);
const defaultDelimitersClose = new Uint8Array([125, 125]);
function isTagStartChar(c) {
  return c >= 97 && c <= 122 || c >= 65 && c <= 90;
}
function isWhitespace(c) {
  return c === 32 || c === 10 || c === 9 || c === 12 || c === 13;
}
function isEndOfTagSection(c) {
  return c === 47 || c === 62 || isWhitespace(c);
}
function toCharCodes(str) {
  const ret = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i);
  }
  return ret;
}
const Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ])
  // `</textarea
};
class Tokenizer {
  constructor(stack, cbs) {
    this.stack = stack;
    this.cbs = cbs;
    /** The current state the tokenizer is in. */
    this.state = 1;
    /** The read buffer. */
    this.buffer = "";
    /** The beginning of the section that is currently being read. */
    this.sectionStart = 0;
    /** The index within the buffer that we are currently looking at. */
    this.index = 0;
    /** The start of the last entity. */
    this.entityStart = 0;
    /** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */
    this.baseState = 1;
    /** For special parsing behavior inside of script and style tags. */
    this.inRCDATA = false;
    /** For disabling RCDATA tags handling */
    this.inXML = false;
    /** For disabling interpolation parsing in v-pre */
    this.inVPre = false;
    /** Record newline positions for fast line / column calculation */
    this.newlines = [];
    this.mode = 0;
    this.delimiterOpen = defaultDelimitersOpen;
    this.delimiterClose = defaultDelimitersClose;
    this.delimiterIndex = -1;
    this.currentSequence = void 0;
    this.sequenceIndex = 0;
    {
      this.entityDecoder = new EntityDecoder(
        htmlDecodeTree,
        (cp, consumed) => this.emitCodePoint(cp, consumed)
      );
    }
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1;
    this.mode = 0;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = 1;
    this.inRCDATA = false;
    this.currentSequence = void 0;
    this.newlines.length = 0;
    this.delimiterOpen = defaultDelimitersOpen;
    this.delimiterClose = defaultDelimitersClose;
  }
  /**
   * Generate Position object with line / column information using recorded
   * newline positions. We know the index is always going to be an already
   * processed index, so all the newlines up to this index should have been
   * recorded.
   */
  getPos(index) {
    let line = 1;
    let column = index + 1;
    for (let i = this.newlines.length - 1; i >= 0; i--) {
      const newlineIndex = this.newlines[i];
      if (index > newlineIndex) {
        line = i + 2;
        column = index - newlineIndex;
        break;
      }
    }
    return {
      column,
      line,
      offset: index
    };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(c) {
    if (c === 60) {
      if (this.index > this.sectionStart) {
        this.cbs.ontext(this.sectionStart, this.index);
      }
      this.state = 5;
      this.sectionStart = this.index;
    } else if (c === 38) {
      this.startEntity();
    } else if (!this.inVPre && c === this.delimiterOpen[0]) {
      this.state = 2;
      this.delimiterIndex = 0;
      this.stateInterpolationOpen(c);
    }
  }
  stateInterpolationOpen(c) {
    if (c === this.delimiterOpen[this.delimiterIndex]) {
      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
        const start = this.index + 1 - this.delimiterOpen.length;
        if (start > this.sectionStart) {
          this.cbs.ontext(this.sectionStart, start);
        }
        this.state = 3;
        this.sectionStart = start;
      } else {
        this.delimiterIndex++;
      }
    } else if (this.inRCDATA) {
      this.state = 32;
      this.stateInRCDATA(c);
    } else {
      this.state = 1;
      this.stateText(c);
    }
  }
  stateInterpolation(c) {
    if (c === this.delimiterClose[0]) {
      this.state = 4;
      this.delimiterIndex = 0;
      this.stateInterpolationClose(c);
    }
  }
  stateInterpolationClose(c) {
    if (c === this.delimiterClose[this.delimiterIndex]) {
      if (this.delimiterIndex === this.delimiterClose.length - 1) {
        this.cbs.oninterpolation(this.sectionStart, this.index + 1);
        if (this.inRCDATA) {
          this.state = 32;
        } else {
          this.state = 1;
        }
        this.sectionStart = this.index + 1;
      } else {
        this.delimiterIndex++;
      }
    } else {
      this.state = 3;
      this.stateInterpolation(c);
    }
  }
  stateSpecialStartSequence(c) {
    const isEnd = this.sequenceIndex === this.currentSequence.length;
    const isMatch = isEnd ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      isEndOfTagSection(c)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (c | 32) === this.currentSequence[this.sequenceIndex]
    );
    if (!isMatch) {
      this.inRCDATA = false;
    } else if (!isEnd) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0;
    this.state = 6;
    this.stateInTagName(c);
  }
  /** Look for an end tag. For <title> and <textarea>, also decode entities. */
  stateInRCDATA(c) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (c === 62 || isWhitespace(c)) {
        const endOfText = this.index - this.currentSequence.length;
        if (this.sectionStart < endOfText) {
          const actualIndex = this.index;
          this.index = endOfText;
          this.cbs.ontext(this.sectionStart, endOfText);
          this.index = actualIndex;
        }
        this.sectionStart = endOfText + 2;
        this.stateInClosingTagName(c);
        this.inRCDATA = false;
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (this.sequenceIndex === 0) {
      if (this.currentSequence === Sequences.TitleEnd || this.currentSequence === Sequences.TextareaEnd && !this.inSFCRoot) {
        if (c === 38) {
          this.startEntity();
        } else if (!this.inVPre && c === this.delimiterOpen[0]) {
          this.state = 2;
          this.delimiterIndex = 0;
          this.stateInterpolationOpen(c);
        }
      } else if (this.fastForwardTo(60)) {
        this.sequenceIndex = 1;
      }
    } else {
      this.sequenceIndex = Number(c === 60);
    }
  }
  stateCDATASequence(c) {
    if (c === Sequences.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === Sequences.Cdata.length) {
        this.state = 28;
        this.currentSequence = Sequences.CdataEnd;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      }
    } else {
      this.sequenceIndex = 0;
      this.state = 23;
      this.stateInDeclaration(c);
    }
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(c) {
    while (++this.index < this.buffer.length) {
      const cc = this.buffer.charCodeAt(this.index);
      if (cc === 10) {
        this.newlines.push(this.index);
      }
      if (cc === c) {
        return true;
      }
    }
    this.index = this.buffer.length - 1;
    return false;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(c) {
    if (c === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, this.index - 2);
        } else {
          this.cbs.oncomment(this.sectionStart, this.index - 2);
        }
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
        this.state = 1;
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) {
        this.sequenceIndex = 1;
      }
    } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
      this.sequenceIndex = 0;
    }
  }
  startSpecial(sequence, offset) {
    this.enterRCDATA(sequence, offset);
    this.state = 31;
  }
  enterRCDATA(sequence, offset) {
    this.inRCDATA = true;
    this.currentSequence = sequence;
    this.sequenceIndex = offset;
  }
  stateBeforeTagName(c) {
    if (c === 33) {
      this.state = 22;
      this.sectionStart = this.index + 1;
    } else if (c === 63) {
      this.state = 24;
      this.sectionStart = this.index + 1;
    } else if (isTagStartChar(c)) {
      this.sectionStart = this.index;
      if (this.mode === 0) {
        this.state = 6;
      } else if (this.inSFCRoot) {
        this.state = 34;
      } else if (!this.inXML) {
        if (c === 116) {
          this.state = 30;
        } else {
          this.state = c === 115 ? 29 : 6;
        }
      } else {
        this.state = 6;
      }
    } else if (c === 47) {
      this.state = 8;
    } else {
      this.state = 1;
      this.stateText(c);
    }
  }
  stateInTagName(c) {
    if (isEndOfTagSection(c)) {
      this.handleTagName(c);
    }
  }
  stateInSFCRootTagName(c) {
    if (isEndOfTagSection(c)) {
      const tag = this.buffer.slice(this.sectionStart, this.index);
      if (tag !== "template") {
        this.enterRCDATA(toCharCodes(`</` + tag), 0);
      }
      this.handleTagName(c);
    }
  }
  handleTagName(c) {
    this.cbs.onopentagname(this.sectionStart, this.index);
    this.sectionStart = -1;
    this.state = 11;
    this.stateBeforeAttrName(c);
  }
  stateBeforeClosingTagName(c) {
    if (isWhitespace(c)) ; else if (c === 62) {
      {
        this.cbs.onerr(14, this.index);
      }
      this.state = 1;
      this.sectionStart = this.index + 1;
    } else {
      this.state = isTagStartChar(c) ? 9 : 27;
      this.sectionStart = this.index;
    }
  }
  stateInClosingTagName(c) {
    if (c === 62 || isWhitespace(c)) {
      this.cbs.onclosetag(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = 10;
      this.stateAfterClosingTagName(c);
    }
  }
  stateAfterClosingTagName(c) {
    if (c === 62) {
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeAttrName(c) {
    if (c === 62) {
      this.cbs.onopentagend(this.index);
      if (this.inRCDATA) {
        this.state = 32;
      } else {
        this.state = 1;
      }
      this.sectionStart = this.index + 1;
    } else if (c === 47) {
      this.state = 7;
      if (this.peek() !== 62) {
        this.cbs.onerr(22, this.index);
      }
    } else if (c === 60 && this.peek() === 47) {
      this.cbs.onopentagend(this.index);
      this.state = 5;
      this.sectionStart = this.index;
    } else if (!isWhitespace(c)) {
      if (c === 61) {
        this.cbs.onerr(
          19,
          this.index
        );
      }
      this.handleAttrStart(c);
    }
  }
  handleAttrStart(c) {
    if (c === 118 && this.peek() === 45) {
      this.state = 13;
      this.sectionStart = this.index;
    } else if (c === 46 || c === 58 || c === 64 || c === 35) {
      this.cbs.ondirname(this.index, this.index + 1);
      this.state = 14;
      this.sectionStart = this.index + 1;
    } else {
      this.state = 12;
      this.sectionStart = this.index;
    }
  }
  stateInSelfClosingTag(c) {
    if (c === 62) {
      this.cbs.onselfclosingtag(this.index);
      this.state = 1;
      this.sectionStart = this.index + 1;
      this.inRCDATA = false;
    } else if (!isWhitespace(c)) {
      this.state = 11;
      this.stateBeforeAttrName(c);
    }
  }
  stateInAttrName(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.onattribname(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 34 || c === 39 || c === 60) {
      this.cbs.onerr(
        17,
        this.index
      );
    }
  }
  stateInDirName(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirname(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 58) {
      this.cbs.ondirname(this.sectionStart, this.index);
      this.state = 14;
      this.sectionStart = this.index + 1;
    } else if (c === 46) {
      this.cbs.ondirname(this.sectionStart, this.index);
      this.state = 16;
      this.sectionStart = this.index + 1;
    }
  }
  stateInDirArg(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirarg(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 91) {
      this.state = 15;
    } else if (c === 46) {
      this.cbs.ondirarg(this.sectionStart, this.index);
      this.state = 16;
      this.sectionStart = this.index + 1;
    }
  }
  stateInDynamicDirArg(c) {
    if (c === 93) {
      this.state = 14;
    } else if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirarg(this.sectionStart, this.index + 1);
      this.handleAttrNameEnd(c);
      {
        this.cbs.onerr(
          27,
          this.index
        );
      }
    }
  }
  stateInDirModifier(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirmodifier(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 46) {
      this.cbs.ondirmodifier(this.sectionStart, this.index);
      this.sectionStart = this.index + 1;
    }
  }
  handleAttrNameEnd(c) {
    this.sectionStart = this.index;
    this.state = 17;
    this.cbs.onattribnameend(this.index);
    this.stateAfterAttrName(c);
  }
  stateAfterAttrName(c) {
    if (c === 61) {
      this.state = 18;
    } else if (c === 47 || c === 62) {
      this.cbs.onattribend(0, this.sectionStart);
      this.sectionStart = -1;
      this.state = 11;
      this.stateBeforeAttrName(c);
    } else if (!isWhitespace(c)) {
      this.cbs.onattribend(0, this.sectionStart);
      this.handleAttrStart(c);
    }
  }
  stateBeforeAttrValue(c) {
    if (c === 34) {
      this.state = 19;
      this.sectionStart = this.index + 1;
    } else if (c === 39) {
      this.state = 20;
      this.sectionStart = this.index + 1;
    } else if (!isWhitespace(c)) {
      this.sectionStart = this.index;
      this.state = 21;
      this.stateInAttrValueNoQuotes(c);
    }
  }
  handleInAttrValue(c, quote) {
    if (c === quote || false) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(
        quote === 34 ? 3 : 2,
        this.index + 1
      );
      this.state = 11;
    } else if (c === 38) {
      this.startEntity();
    }
  }
  stateInAttrValueDoubleQuotes(c) {
    this.handleInAttrValue(c, 34);
  }
  stateInAttrValueSingleQuotes(c) {
    this.handleInAttrValue(c, 39);
  }
  stateInAttrValueNoQuotes(c) {
    if (isWhitespace(c) || c === 62) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(1, this.index);
      this.state = 11;
      this.stateBeforeAttrName(c);
    } else if (c === 34 || c === 39 || c === 60 || c === 61 || c === 96) {
      this.cbs.onerr(
        18,
        this.index
      );
    } else if (c === 38) {
      this.startEntity();
    }
  }
  stateBeforeDeclaration(c) {
    if (c === 91) {
      this.state = 26;
      this.sequenceIndex = 0;
    } else {
      this.state = c === 45 ? 25 : 23;
    }
  }
  stateInDeclaration(c) {
    if (c === 62 || this.fastForwardTo(62)) {
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateInProcessingInstruction(c) {
    if (c === 62 || this.fastForwardTo(62)) {
      this.cbs.onprocessinginstruction(this.sectionStart, this.index);
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeComment(c) {
    if (c === 45) {
      this.state = 28;
      this.currentSequence = Sequences.CommentEnd;
      this.sequenceIndex = 2;
      this.sectionStart = this.index + 1;
    } else {
      this.state = 23;
    }
  }
  stateInSpecialComment(c) {
    if (c === 62 || this.fastForwardTo(62)) {
      this.cbs.oncomment(this.sectionStart, this.index);
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeSpecialS(c) {
    if (c === Sequences.ScriptEnd[3]) {
      this.startSpecial(Sequences.ScriptEnd, 4);
    } else if (c === Sequences.StyleEnd[3]) {
      this.startSpecial(Sequences.StyleEnd, 4);
    } else {
      this.state = 6;
      this.stateInTagName(c);
    }
  }
  stateBeforeSpecialT(c) {
    if (c === Sequences.TitleEnd[3]) {
      this.startSpecial(Sequences.TitleEnd, 4);
    } else if (c === Sequences.TextareaEnd[3]) {
      this.startSpecial(Sequences.TextareaEnd, 4);
    } else {
      this.state = 6;
      this.stateInTagName(c);
    }
  }
  startEntity() {
    {
      this.baseState = this.state;
      this.state = 33;
      this.entityStart = this.index;
      this.entityDecoder.startEntity(
        this.baseState === 1 || this.baseState === 32 ? DecodingMode.Legacy : DecodingMode.Attribute
      );
    }
  }
  stateInEntity() {
    {
      const length = this.entityDecoder.write(this.buffer, this.index);
      if (length >= 0) {
        this.state = this.baseState;
        if (length === 0) {
          this.index = this.entityStart;
        }
      } else {
        this.index = this.buffer.length - 1;
      }
    }
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse(input) {
    this.buffer = input;
    while (this.index < this.buffer.length) {
      const c = this.buffer.charCodeAt(this.index);
      if (c === 10) {
        this.newlines.push(this.index);
      }
      switch (this.state) {
        case 1: {
          this.stateText(c);
          break;
        }
        case 2: {
          this.stateInterpolationOpen(c);
          break;
        }
        case 3: {
          this.stateInterpolation(c);
          break;
        }
        case 4: {
          this.stateInterpolationClose(c);
          break;
        }
        case 31: {
          this.stateSpecialStartSequence(c);
          break;
        }
        case 32: {
          this.stateInRCDATA(c);
          break;
        }
        case 26: {
          this.stateCDATASequence(c);
          break;
        }
        case 19: {
          this.stateInAttrValueDoubleQuotes(c);
          break;
        }
        case 12: {
          this.stateInAttrName(c);
          break;
        }
        case 13: {
          this.stateInDirName(c);
          break;
        }
        case 14: {
          this.stateInDirArg(c);
          break;
        }
        case 15: {
          this.stateInDynamicDirArg(c);
          break;
        }
        case 16: {
          this.stateInDirModifier(c);
          break;
        }
        case 28: {
          this.stateInCommentLike(c);
          break;
        }
        case 27: {
          this.stateInSpecialComment(c);
          break;
        }
        case 11: {
          this.stateBeforeAttrName(c);
          break;
        }
        case 6: {
          this.stateInTagName(c);
          break;
        }
        case 34: {
          this.stateInSFCRootTagName(c);
          break;
        }
        case 9: {
          this.stateInClosingTagName(c);
          break;
        }
        case 5: {
          this.stateBeforeTagName(c);
          break;
        }
        case 17: {
          this.stateAfterAttrName(c);
          break;
        }
        case 20: {
          this.stateInAttrValueSingleQuotes(c);
          break;
        }
        case 18: {
          this.stateBeforeAttrValue(c);
          break;
        }
        case 8: {
          this.stateBeforeClosingTagName(c);
          break;
        }
        case 10: {
          this.stateAfterClosingTagName(c);
          break;
        }
        case 29: {
          this.stateBeforeSpecialS(c);
          break;
        }
        case 30: {
          this.stateBeforeSpecialT(c);
          break;
        }
        case 21: {
          this.stateInAttrValueNoQuotes(c);
          break;
        }
        case 7: {
          this.stateInSelfClosingTag(c);
          break;
        }
        case 23: {
          this.stateInDeclaration(c);
          break;
        }
        case 22: {
          this.stateBeforeDeclaration(c);
          break;
        }
        case 25: {
          this.stateBeforeComment(c);
          break;
        }
        case 24: {
          this.stateInProcessingInstruction(c);
          break;
        }
        case 33: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
    this.finish();
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    if (this.sectionStart !== this.index) {
      if (this.state === 1 || this.state === 32 && this.sequenceIndex === 0) {
        this.cbs.ontext(this.sectionStart, this.index);
        this.sectionStart = this.index;
      } else if (this.state === 19 || this.state === 20 || this.state === 21) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = this.index;
      }
    }
  }
  finish() {
    if (this.state === 33) {
      this.entityDecoder.end();
      this.state = this.baseState;
    }
    this.handleTrailingData();
    this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const endIndex = this.buffer.length;
    if (this.sectionStart >= endIndex) {
      return;
    }
    if (this.state === 28) {
      if (this.currentSequence === Sequences.CdataEnd) {
        this.cbs.oncdata(this.sectionStart, endIndex);
      } else {
        this.cbs.oncomment(this.sectionStart, endIndex);
      }
    } else if (this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9) ; else {
      this.cbs.ontext(this.sectionStart, endIndex);
    }
  }
  emitCodePoint(cp, consumed) {
    {
      if (this.baseState !== 1 && this.baseState !== 32) {
        if (this.sectionStart < this.entityStart) {
          this.cbs.onattribdata(this.sectionStart, this.entityStart);
        }
        this.sectionStart = this.entityStart + consumed;
        this.index = this.sectionStart - 1;
        this.cbs.onattribentity(
          fromCodePoint(cp),
          this.entityStart,
          this.sectionStart
        );
      } else {
        if (this.sectionStart < this.entityStart) {
          this.cbs.ontext(this.sectionStart, this.entityStart);
        }
        this.sectionStart = this.entityStart + consumed;
        this.index = this.sectionStart - 1;
        this.cbs.ontextentity(
          fromCodePoint(cp),
          this.entityStart,
          this.sectionStart
        );
      }
    }
  }
}

function defaultOnError(error) {
  throw error;
}
function defaultOnWarn(msg) {
  console.warn(`[Vue warn] ${msg.message}`);
}
function createCompilerError(code, loc, messages, additionalMessage) {
  const msg = (messages || errorMessages)[code] + (additionalMessage || ``) ;
  const error = new SyntaxError(String(msg));
  error.code = code;
  error.loc = loc;
  return error;
}
const errorMessages = {
  // parse errors
  [0]: "Illegal comment.",
  [1]: "CDATA section is allowed only in XML context.",
  [2]: "Duplicate attribute.",
  [3]: "End tag cannot have attributes.",
  [4]: "Illegal '/' in tags.",
  [5]: "Unexpected EOF in tag.",
  [6]: "Unexpected EOF in CDATA section.",
  [7]: "Unexpected EOF in comment.",
  [8]: "Unexpected EOF in script.",
  [9]: "Unexpected EOF in tag.",
  [10]: "Incorrectly closed comment.",
  [11]: "Incorrectly opened comment.",
  [12]: "Illegal tag name. Use '&lt;' to print '<'.",
  [13]: "Attribute value was expected.",
  [14]: "End tag name was expected.",
  [15]: "Whitespace was expected.",
  [16]: "Unexpected '<!--' in comment.",
  [17]: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`,
  [18]: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).",
  [19]: "Attribute name cannot start with '='.",
  [21]: "'<?' is allowed only in XML context.",
  [20]: `Unexpected null character.`,
  [22]: "Illegal '/' in tags.",
  // Vue-specific parse errors
  [23]: "Invalid end tag.",
  [24]: "Element is missing end tag.",
  [25]: "Interpolation end sign was not found.",
  [27]: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.",
  [26]: "Legal directive name was expected.",
  // transform errors
  [28]: `v-if/v-else-if is missing expression.`,
  [29]: `v-if/else branches must use unique keys.`,
  [30]: `v-else/v-else-if has no adjacent v-if or v-else-if.`,
  [31]: `v-for is missing expression.`,
  [32]: `v-for has invalid expression.`,
  [33]: `<template v-for> key should be placed on the <template> tag.`,
  [34]: `v-bind is missing expression.`,
  [52]: `v-bind with same-name shorthand only allows static argument.`,
  [35]: `v-on is missing expression.`,
  [36]: `Unexpected custom directive on <slot> outlet.`,
  [37]: `Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.`,
  [38]: `Duplicate slot names found. `,
  [39]: `Extraneous children found when component already has explicitly named default slot. These children will be ignored.`,
  [40]: `v-slot can only be used on components or <template> tags.`,
  [41]: `v-model is missing expression.`,
  [42]: `v-model value must be a valid JavaScript member expression.`,
  [43]: `v-model cannot be used on v-for or v-slot scope variables because they are not writable.`,
  [44]: `v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.`,
  [45]: `Error parsing JavaScript expression: `,
  [46]: `<KeepAlive> expects exactly one child component.`,
  [51]: `@vnode-* hooks in templates are no longer supported. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support has been removed in 3.4.`,
  // generic errors
  [47]: `"prefixIdentifiers" option is not supported in this build of compiler.`,
  [48]: `ES module mode is not supported in this build of compiler.`,
  [49]: `"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.`,
  [50]: `"scopeId" option is only supported in module mode.`,
  // just to fulfill types
  [53]: ``
};

var lib = {};

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;

	Object.defineProperty(lib, '__esModule', {
	  value: true
	});
	function _objectWithoutPropertiesLoose(r, e) {
	  if (null == r) return {};
	  var t = {};
	  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
	    if (-1 !== e.indexOf(n)) continue;
	    t[n] = r[n];
	  }
	  return t;
	}
	class Position {
	  constructor(line, col, index) {
	    this.line = void 0;
	    this.column = void 0;
	    this.index = void 0;
	    this.line = line;
	    this.column = col;
	    this.index = index;
	  }
	}
	class SourceLocation {
	  constructor(start, end) {
	    this.start = void 0;
	    this.end = void 0;
	    this.filename = void 0;
	    this.identifierName = void 0;
	    this.start = start;
	    this.end = end;
	  }
	}
	function createPositionWithColumnOffset(position, columnOffset) {
	  const {
	    line,
	    column,
	    index
	  } = position;
	  return new Position(line, column + columnOffset, index + columnOffset);
	}
	const code = "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED";
	var ModuleErrors = {
	  ImportMetaOutsideModule: {
	    message: `import.meta may appear only with 'sourceType: "module"'`,
	    code
	  },
	  ImportOutsideModule: {
	    message: `'import' and 'export' may appear only with 'sourceType: "module"'`,
	    code
	  }
	};
	const NodeDescriptions = {
	  ArrayPattern: "array destructuring pattern",
	  AssignmentExpression: "assignment expression",
	  AssignmentPattern: "assignment expression",
	  ArrowFunctionExpression: "arrow function expression",
	  ConditionalExpression: "conditional expression",
	  CatchClause: "catch clause",
	  ForOfStatement: "for-of statement",
	  ForInStatement: "for-in statement",
	  ForStatement: "for-loop",
	  FormalParameters: "function parameter list",
	  Identifier: "identifier",
	  ImportSpecifier: "import specifier",
	  ImportDefaultSpecifier: "import default specifier",
	  ImportNamespaceSpecifier: "import namespace specifier",
	  ObjectPattern: "object destructuring pattern",
	  ParenthesizedExpression: "parenthesized expression",
	  RestElement: "rest element",
	  UpdateExpression: {
	    true: "prefix operation",
	    false: "postfix operation"
	  },
	  VariableDeclarator: "variable declaration",
	  YieldExpression: "yield expression"
	};
	const toNodeDescription = node => node.type === "UpdateExpression" ? NodeDescriptions.UpdateExpression[`${node.prefix}`] : NodeDescriptions[node.type];
	var StandardErrors = {
	  AccessorIsGenerator: ({
	    kind
	  }) => `A ${kind}ter cannot be a generator.`,
	  ArgumentsInClass: "'arguments' is only allowed in functions and class methods.",
	  AsyncFunctionInSingleStatementContext: "Async functions can only be declared at the top level or inside a block.",
	  AwaitBindingIdentifier: "Can not use 'await' as identifier inside an async function.",
	  AwaitBindingIdentifierInStaticBlock: "Can not use 'await' as identifier inside a static block.",
	  AwaitExpressionFormalParameter: "'await' is not allowed in async function parameters.",
	  AwaitUsingNotInAsyncContext: "'await using' is only allowed within async functions and at the top levels of modules.",
	  AwaitNotInAsyncContext: "'await' is only allowed within async functions and at the top levels of modules.",
	  BadGetterArity: "A 'get' accessor must not have any formal parameters.",
	  BadSetterArity: "A 'set' accessor must have exactly one formal parameter.",
	  BadSetterRestParameter: "A 'set' accessor function argument must not be a rest parameter.",
	  ConstructorClassField: "Classes may not have a field named 'constructor'.",
	  ConstructorClassPrivateField: "Classes may not have a private field named '#constructor'.",
	  ConstructorIsAccessor: "Class constructor may not be an accessor.",
	  ConstructorIsAsync: "Constructor can't be an async function.",
	  ConstructorIsGenerator: "Constructor can't be a generator.",
	  DeclarationMissingInitializer: ({
	    kind
	  }) => `Missing initializer in ${kind} declaration.`,
	  DecoratorArgumentsOutsideParentheses: "Decorator arguments must be moved inside parentheses: use '@(decorator(args))' instead of '@(decorator)(args)'.",
	  DecoratorBeforeExport: "Decorators must be placed *before* the 'export' keyword. Remove the 'decoratorsBeforeExport: true' option to use the 'export @decorator class {}' syntax.",
	  DecoratorsBeforeAfterExport: "Decorators can be placed *either* before or after the 'export' keyword, but not in both locations at the same time.",
	  DecoratorConstructor: "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
	  DecoratorExportClass: "Decorators must be placed *after* the 'export' keyword. Remove the 'decoratorsBeforeExport: false' option to use the '@decorator export class {}' syntax.",
	  DecoratorSemicolon: "Decorators must not be followed by a semicolon.",
	  DecoratorStaticBlock: "Decorators can't be used with a static block.",
	  DeferImportRequiresNamespace: 'Only `import defer * as x from "./module"` is valid.',
	  DeletePrivateField: "Deleting a private field is not allowed.",
	  DestructureNamedImport: "ES2015 named imports do not destructure. Use another statement for destructuring after the import.",
	  DuplicateConstructor: "Duplicate constructor in the same class.",
	  DuplicateDefaultExport: "Only one default export allowed per module.",
	  DuplicateExport: ({
	    exportName
	  }) => `\`${exportName}\` has already been exported. Exported identifiers must be unique.`,
	  DuplicateProto: "Redefinition of __proto__ property.",
	  DuplicateRegExpFlags: "Duplicate regular expression flag.",
	  ElementAfterRest: "Rest element must be last element.",
	  EscapedCharNotAnIdentifier: "Invalid Unicode escape.",
	  ExportBindingIsString: ({
	    localName,
	    exportName
	  }) => `A string literal cannot be used as an exported binding without \`from\`.\n- Did you mean \`export { '${localName}' as '${exportName}' } from 'some-module'\`?`,
	  ExportDefaultFromAsIdentifier: "'from' is not allowed as an identifier after 'export default'.",
	  ForInOfLoopInitializer: ({
	    type
	  }) => `'${type === "ForInStatement" ? "for-in" : "for-of"}' loop variable declaration may not have an initializer.`,
	  ForInUsing: "For-in loop may not start with 'using' declaration.",
	  ForOfAsync: "The left-hand side of a for-of loop may not be 'async'.",
	  ForOfLet: "The left-hand side of a for-of loop may not start with 'let'.",
	  GeneratorInSingleStatementContext: "Generators can only be declared at the top level or inside a block.",
	  IllegalBreakContinue: ({
	    type
	  }) => `Unsyntactic ${type === "BreakStatement" ? "break" : "continue"}.`,
	  IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list.",
	  IllegalReturn: "'return' outside of function.",
	  ImportAttributesUseAssert: "The `assert` keyword in import attributes is deprecated and it has been replaced by the `with` keyword. You can enable the `deprecatedImportAssert` parser plugin to suppress this error.",
	  ImportBindingIsString: ({
	    importName
	  }) => `A string literal cannot be used as an imported binding.\n- Did you mean \`import { "${importName}" as foo }\`?`,
	  ImportCallArity: `\`import()\` requires exactly one or two arguments.`,
	  ImportCallNotNewExpression: "Cannot use new with import(...).",
	  ImportCallSpreadArgument: "`...` is not allowed in `import()`.",
	  ImportJSONBindingNotDefault: "A JSON module can only be imported with `default`.",
	  ImportReflectionHasAssertion: "`import module x` cannot have assertions.",
	  ImportReflectionNotBinding: 'Only `import module x from "./module"` is valid.',
	  IncompatibleRegExpUVFlags: "The 'u' and 'v' regular expression flags cannot be enabled at the same time.",
	  InvalidBigIntLiteral: "Invalid BigIntLiteral.",
	  InvalidCodePoint: "Code point out of bounds.",
	  InvalidCoverInitializedName: "Invalid shorthand property initializer.",
	  InvalidDecimal: "Invalid decimal.",
	  InvalidDigit: ({
	    radix
	  }) => `Expected number in radix ${radix}.`,
	  InvalidEscapeSequence: "Bad character escape sequence.",
	  InvalidEscapeSequenceTemplate: "Invalid escape sequence in template.",
	  InvalidEscapedReservedWord: ({
	    reservedWord
	  }) => `Escape sequence in keyword ${reservedWord}.`,
	  InvalidIdentifier: ({
	    identifierName
	  }) => `Invalid identifier ${identifierName}.`,
	  InvalidLhs: ({
	    ancestor
	  }) => `Invalid left-hand side in ${toNodeDescription(ancestor)}.`,
	  InvalidLhsBinding: ({
	    ancestor
	  }) => `Binding invalid left-hand side in ${toNodeDescription(ancestor)}.`,
	  InvalidLhsOptionalChaining: ({
	    ancestor
	  }) => `Invalid optional chaining in the left-hand side of ${toNodeDescription(ancestor)}.`,
	  InvalidNumber: "Invalid number.",
	  InvalidOrMissingExponent: "Floating-point numbers require a valid exponent after the 'e'.",
	  InvalidOrUnexpectedToken: ({
	    unexpected
	  }) => `Unexpected character '${unexpected}'.`,
	  InvalidParenthesizedAssignment: "Invalid parenthesized assignment pattern.",
	  InvalidPrivateFieldResolution: ({
	    identifierName
	  }) => `Private name #${identifierName} is not defined.`,
	  InvalidPropertyBindingPattern: "Binding member expression.",
	  InvalidRecordProperty: "Only properties and spread elements are allowed in record definitions.",
	  InvalidRestAssignmentPattern: "Invalid rest operator's argument.",
	  LabelRedeclaration: ({
	    labelName
	  }) => `Label '${labelName}' is already declared.`,
	  LetInLexicalBinding: "'let' is disallowed as a lexically bound name.",
	  LineTerminatorBeforeArrow: "No line break is allowed before '=>'.",
	  MalformedRegExpFlags: "Invalid regular expression flag.",
	  MissingClassName: "A class name is required.",
	  MissingEqInAssignment: "Only '=' operator can be used for specifying default value.",
	  MissingSemicolon: "Missing semicolon.",
	  MissingPlugin: ({
	    missingPlugin
	  }) => `This experimental syntax requires enabling the parser plugin: ${missingPlugin.map(name => JSON.stringify(name)).join(", ")}.`,
	  MissingOneOfPlugins: ({
	    missingPlugin
	  }) => `This experimental syntax requires enabling one of the following parser plugin(s): ${missingPlugin.map(name => JSON.stringify(name)).join(", ")}.`,
	  MissingUnicodeEscape: "Expecting Unicode escape sequence \\uXXXX.",
	  MixingCoalesceWithLogical: "Nullish coalescing operator(??) requires parens when mixing with logical operators.",
	  ModuleAttributeDifferentFromType: "The only accepted module attribute is `type`.",
	  ModuleAttributeInvalidValue: "Only string literals are allowed as module attribute values.",
	  ModuleAttributesWithDuplicateKeys: ({
	    key
	  }) => `Duplicate key "${key}" is not allowed in module attributes.`,
	  ModuleExportNameHasLoneSurrogate: ({
	    surrogateCharCode
	  }) => `An export name cannot include a lone surrogate, found '\\u${surrogateCharCode.toString(16)}'.`,
	  ModuleExportUndefined: ({
	    localName
	  }) => `Export '${localName}' is not defined.`,
	  MultipleDefaultsInSwitch: "Multiple default clauses.",
	  NewlineAfterThrow: "Illegal newline after throw.",
	  NoCatchOrFinally: "Missing catch or finally clause.",
	  NumberIdentifier: "Identifier directly after number.",
	  NumericSeparatorInEscapeSequence: "Numeric separators are not allowed inside unicode escape sequences or hex escape sequences.",
	  ObsoleteAwaitStar: "'await*' has been removed from the async functions proposal. Use Promise.all() instead.",
	  OptionalChainingNoNew: "Constructors in/after an Optional Chain are not allowed.",
	  OptionalChainingNoTemplate: "Tagged Template Literals are not allowed in optionalChain.",
	  OverrideOnConstructor: "'override' modifier cannot appear on a constructor declaration.",
	  ParamDupe: "Argument name clash.",
	  PatternHasAccessor: "Object pattern can't contain getter or setter.",
	  PatternHasMethod: "Object pattern can't contain methods.",
	  PrivateInExpectedIn: ({
	    identifierName
	  }) => `Private names are only allowed in property accesses (\`obj.#${identifierName}\`) or in \`in\` expressions (\`#${identifierName} in obj\`).`,
	  PrivateNameRedeclaration: ({
	    identifierName
	  }) => `Duplicate private name #${identifierName}.`,
	  RecordExpressionBarIncorrectEndSyntaxType: "Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
	  RecordExpressionBarIncorrectStartSyntaxType: "Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
	  RecordExpressionHashIncorrectStartSyntaxType: "Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
	  RecordNoProto: "'__proto__' is not allowed in Record expressions.",
	  RestTrailingComma: "Unexpected trailing comma after rest element.",
	  SloppyFunction: "In non-strict mode code, functions can only be declared at top level or inside a block.",
	  SloppyFunctionAnnexB: "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement.",
	  SourcePhaseImportRequiresDefault: 'Only `import source x from "./module"` is valid.',
	  StaticPrototype: "Classes may not have static property named prototype.",
	  SuperNotAllowed: "`super()` is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?",
	  SuperPrivateField: "Private fields can't be accessed on super.",
	  TrailingDecorator: "Decorators must be attached to a class element.",
	  TupleExpressionBarIncorrectEndSyntaxType: "Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
	  TupleExpressionBarIncorrectStartSyntaxType: "Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
	  TupleExpressionHashIncorrectStartSyntaxType: "Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
	  UnexpectedArgumentPlaceholder: "Unexpected argument placeholder.",
	  UnexpectedAwaitAfterPipelineBody: 'Unexpected "await" after pipeline body; await must have parentheses in minimal proposal.',
	  UnexpectedDigitAfterHash: "Unexpected digit after hash token.",
	  UnexpectedImportExport: "'import' and 'export' may only appear at the top level.",
	  UnexpectedKeyword: ({
	    keyword
	  }) => `Unexpected keyword '${keyword}'.`,
	  UnexpectedLeadingDecorator: "Leading decorators must be attached to a class declaration.",
	  UnexpectedLexicalDeclaration: "Lexical declaration cannot appear in a single-statement context.",
	  UnexpectedNewTarget: "`new.target` can only be used in functions or class properties.",
	  UnexpectedNumericSeparator: "A numeric separator is only allowed between two digits.",
	  UnexpectedPrivateField: "Unexpected private name.",
	  UnexpectedReservedWord: ({
	    reservedWord
	  }) => `Unexpected reserved word '${reservedWord}'.`,
	  UnexpectedSuper: "'super' is only allowed in object methods and classes.",
	  UnexpectedToken: ({
	    expected,
	    unexpected
	  }) => `Unexpected token${unexpected ? ` '${unexpected}'.` : ""}${expected ? `, expected "${expected}"` : ""}`,
	  UnexpectedTokenUnaryExponentiation: "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.",
	  UnexpectedUsingDeclaration: "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement.",
	  UnsupportedBind: "Binding should be performed on object property.",
	  UnsupportedDecoratorExport: "A decorated export must export a class declaration.",
	  UnsupportedDefaultExport: "Only expressions, functions or classes are allowed as the `default` export.",
	  UnsupportedImport: "`import` can only be used in `import()` or `import.meta`.",
	  UnsupportedMetaProperty: ({
	    target,
	    onlyValidPropertyName
	  }) => `The only valid meta property for ${target} is ${target}.${onlyValidPropertyName}.`,
	  UnsupportedParameterDecorator: "Decorators cannot be used to decorate parameters.",
	  UnsupportedPropertyDecorator: "Decorators cannot be used to decorate object literal properties.",
	  UnsupportedSuper: "'super' can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop]).",
	  UnterminatedComment: "Unterminated comment.",
	  UnterminatedRegExp: "Unterminated regular expression.",
	  UnterminatedString: "Unterminated string constant.",
	  UnterminatedTemplate: "Unterminated template.",
	  UsingDeclarationExport: "Using declaration cannot be exported.",
	  UsingDeclarationHasBindingPattern: "Using declaration cannot have destructuring patterns.",
	  VarRedeclaration: ({
	    identifierName
	  }) => `Identifier '${identifierName}' has already been declared.`,
	  YieldBindingIdentifier: "Can not use 'yield' as identifier inside a generator.",
	  YieldInParameter: "Yield expression is not allowed in formal parameters.",
	  YieldNotInGeneratorFunction: "'yield' is only allowed within generator functions.",
	  ZeroDigitNumericSeparator: "Numeric separator can not be used after leading 0."
	};
	var StrictModeErrors = {
	  StrictDelete: "Deleting local variable in strict mode.",
	  StrictEvalArguments: ({
	    referenceName
	  }) => `Assigning to '${referenceName}' in strict mode.`,
	  StrictEvalArgumentsBinding: ({
	    bindingName
	  }) => `Binding '${bindingName}' in strict mode.`,
	  StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block.",
	  StrictNumericEscape: "The only valid numeric escape in strict mode is '\\0'.",
	  StrictOctalLiteral: "Legacy octal literals are not allowed in strict mode.",
	  StrictWith: "'with' in strict mode."
	};
	var ParseExpressionErrors = {
	  ParseExpressionEmptyInput: "Unexpected parseExpression() input: The input is empty or contains only comments.",
	  ParseExpressionExpectsEOF: ({
	    unexpected
	  }) => `Unexpected parseExpression() input: The input should contain exactly one expression, but the first expression is followed by the unexpected character \`${String.fromCodePoint(unexpected)}\`.`
	};
	const UnparenthesizedPipeBodyDescriptions = new Set(["ArrowFunctionExpression", "AssignmentExpression", "ConditionalExpression", "YieldExpression"]);
	var PipelineOperatorErrors = Object.assign({
	  PipeBodyIsTighter: "Unexpected yield after pipeline body; any yield expression acting as Hack-style pipe body must be parenthesized due to its loose operator precedence.",
	  PipeTopicRequiresHackPipes: 'Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.',
	  PipeTopicUnbound: "Topic reference is unbound; it must be inside a pipe body.",
	  PipeTopicUnconfiguredToken: ({
	    token
	  }) => `Invalid topic token ${token}. In order to use ${token} as a topic reference, the pipelineOperator plugin must be configured with { "proposal": "hack", "topicToken": "${token}" }.`,
	  PipeTopicUnused: "Hack-style pipe body does not contain a topic reference; Hack-style pipes must use topic at least once.",
	  PipeUnparenthesizedBody: ({
	    type
	  }) => `Hack-style pipe body cannot be an unparenthesized ${toNodeDescription({
	    type
	  })}; please wrap it in parentheses.`
	}, {
	  PipelineBodyNoArrow: 'Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized.',
	  PipelineBodySequenceExpression: "Pipeline body may not be a comma-separated sequence expression.",
	  PipelineHeadSequenceExpression: "Pipeline head should not be a comma-separated sequence expression.",
	  PipelineTopicUnused: "Pipeline is in topic style but does not use topic reference.",
	  PrimaryTopicNotAllowed: "Topic reference was used in a lexical context without topic binding.",
	  PrimaryTopicRequiresSmartPipeline: 'Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.'
	});
	const _excluded = ["message"];
	function defineHidden(obj, key, value) {
	  Object.defineProperty(obj, key, {
	    enumerable: false,
	    configurable: true,
	    value
	  });
	}
	function toParseErrorConstructor({
	  toMessage,
	  code,
	  reasonCode,
	  syntaxPlugin
	}) {
	  const hasMissingPlugin = reasonCode === "MissingPlugin" || reasonCode === "MissingOneOfPlugins";
	  {
	    const oldReasonCodes = {
	      AccessorCannotDeclareThisParameter: "AccesorCannotDeclareThisParameter",
	      AccessorCannotHaveTypeParameters: "AccesorCannotHaveTypeParameters",
	      ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference: "ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference",
	      SetAccessorCannotHaveOptionalParameter: "SetAccesorCannotHaveOptionalParameter",
	      SetAccessorCannotHaveRestParameter: "SetAccesorCannotHaveRestParameter",
	      SetAccessorCannotHaveReturnType: "SetAccesorCannotHaveReturnType"
	    };
	    if (oldReasonCodes[reasonCode]) {
	      reasonCode = oldReasonCodes[reasonCode];
	    }
	  }
	  return function constructor(loc, details) {
	    const error = new SyntaxError();
	    error.code = code;
	    error.reasonCode = reasonCode;
	    error.loc = loc;
	    error.pos = loc.index;
	    error.syntaxPlugin = syntaxPlugin;
	    if (hasMissingPlugin) {
	      error.missingPlugin = details.missingPlugin;
	    }
	    defineHidden(error, "clone", function clone(overrides = {}) {
	      var _overrides$loc;
	      const {
	        line,
	        column,
	        index
	      } = (_overrides$loc = overrides.loc) != null ? _overrides$loc : loc;
	      return constructor(new Position(line, column, index), Object.assign({}, details, overrides.details));
	    });
	    defineHidden(error, "details", details);
	    Object.defineProperty(error, "message", {
	      configurable: true,
	      get() {
	        const message = `${toMessage(details)} (${loc.line}:${loc.column})`;
	        this.message = message;
	        return message;
	      },
	      set(value) {
	        Object.defineProperty(this, "message", {
	          value,
	          writable: true
	        });
	      }
	    });
	    return error;
	  };
	}
	function ParseErrorEnum(argument, syntaxPlugin) {
	  if (Array.isArray(argument)) {
	    return parseErrorTemplates => ParseErrorEnum(parseErrorTemplates, argument[0]);
	  }
	  const ParseErrorConstructors = {};
	  for (const reasonCode of Object.keys(argument)) {
	    const template = argument[reasonCode];
	    const _ref = typeof template === "string" ? {
	        message: () => template
	      } : typeof template === "function" ? {
	        message: template
	      } : template,
	      {
	        message
	      } = _ref,
	      rest = _objectWithoutPropertiesLoose(_ref, _excluded);
	    const toMessage = typeof message === "string" ? () => message : message;
	    ParseErrorConstructors[reasonCode] = toParseErrorConstructor(Object.assign({
	      code: "BABEL_PARSER_SYNTAX_ERROR",
	      reasonCode,
	      toMessage
	    }, syntaxPlugin ? {
	      syntaxPlugin
	    } : {}, rest));
	  }
	  return ParseErrorConstructors;
	}
	const Errors = Object.assign({}, ParseErrorEnum(ModuleErrors), ParseErrorEnum(StandardErrors), ParseErrorEnum(StrictModeErrors), ParseErrorEnum(ParseExpressionErrors), ParseErrorEnum`pipelineOperator`(PipelineOperatorErrors));
	function createDefaultOptions() {
	  return {
	    sourceType: "script",
	    sourceFilename: undefined,
	    startIndex: 0,
	    startColumn: 0,
	    startLine: 1,
	    allowAwaitOutsideFunction: false,
	    allowReturnOutsideFunction: false,
	    allowNewTargetOutsideFunction: false,
	    allowImportExportEverywhere: false,
	    allowSuperOutsideMethod: false,
	    allowUndeclaredExports: false,
	    allowYieldOutsideFunction: false,
	    plugins: [],
	    strictMode: null,
	    ranges: false,
	    tokens: false,
	    createImportExpressions: false,
	    createParenthesizedExpressions: false,
	    errorRecovery: false,
	    attachComment: true,
	    annexB: true
	  };
	}
	function getOptions(opts) {
	  const options = createDefaultOptions();
	  if (opts == null) {
	    return options;
	  }
	  if (opts.annexB != null && opts.annexB !== false) {
	    throw new Error("The `annexB` option can only be set to `false`.");
	  }
	  for (const key of Object.keys(options)) {
	    if (opts[key] != null) options[key] = opts[key];
	  }
	  if (options.startLine === 1) {
	    if (opts.startIndex == null && options.startColumn > 0) {
	      options.startIndex = options.startColumn;
	    } else if (opts.startColumn == null && options.startIndex > 0) {
	      options.startColumn = options.startIndex;
	    }
	  } else if (opts.startColumn == null || opts.startIndex == null) {
	    if (opts.startIndex != null) {
	      throw new Error("With a `startLine > 1` you must also specify `startIndex` and `startColumn`.");
	    }
	  }
	  return options;
	}
	const {
	  defineProperty
	} = Object;
	const toUnenumerable = (object, key) => {
	  if (object) {
	    defineProperty(object, key, {
	      enumerable: false,
	      value: object[key]
	    });
	  }
	};
	function toESTreeLocation(node) {
	  toUnenumerable(node.loc.start, "index");
	  toUnenumerable(node.loc.end, "index");
	  return node;
	}
	var estree = superClass => class ESTreeParserMixin extends superClass {
	  parse() {
	    const file = toESTreeLocation(super.parse());
	    if (this.optionFlags & 256) {
	      file.tokens = file.tokens.map(toESTreeLocation);
	    }
	    return file;
	  }
	  parseRegExpLiteral({
	    pattern,
	    flags
	  }) {
	    let regex = null;
	    try {
	      regex = new RegExp(pattern, flags);
	    } catch (_) {}
	    const node = this.estreeParseLiteral(regex);
	    node.regex = {
	      pattern,
	      flags
	    };
	    return node;
	  }
	  parseBigIntLiteral(value) {
	    let bigInt;
	    try {
	      bigInt = BigInt(value);
	    } catch (_unused) {
	      bigInt = null;
	    }
	    const node = this.estreeParseLiteral(bigInt);
	    node.bigint = String(node.value || value);
	    return node;
	  }
	  parseDecimalLiteral(value) {
	    const decimal = null;
	    const node = this.estreeParseLiteral(decimal);
	    node.decimal = String(node.value || value);
	    return node;
	  }
	  estreeParseLiteral(value) {
	    return this.parseLiteral(value, "Literal");
	  }
	  parseStringLiteral(value) {
	    return this.estreeParseLiteral(value);
	  }
	  parseNumericLiteral(value) {
	    return this.estreeParseLiteral(value);
	  }
	  parseNullLiteral() {
	    return this.estreeParseLiteral(null);
	  }
	  parseBooleanLiteral(value) {
	    return this.estreeParseLiteral(value);
	  }
	  estreeParseChainExpression(node, endLoc) {
	    const chain = this.startNodeAtNode(node);
	    chain.expression = node;
	    return this.finishNodeAt(chain, "ChainExpression", endLoc);
	  }
	  directiveToStmt(directive) {
	    const expression = directive.value;
	    delete directive.value;
	    this.castNodeTo(expression, "Literal");
	    expression.raw = expression.extra.raw;
	    expression.value = expression.extra.expressionValue;
	    const stmt = this.castNodeTo(directive, "ExpressionStatement");
	    stmt.expression = expression;
	    stmt.directive = expression.extra.rawValue;
	    delete expression.extra;
	    return stmt;
	  }
	  fillOptionalPropertiesForTSESLint(node) {}
	  cloneEstreeStringLiteral(node) {
	    const {
	      start,
	      end,
	      loc,
	      range,
	      raw,
	      value
	    } = node;
	    const cloned = Object.create(node.constructor.prototype);
	    cloned.type = "Literal";
	    cloned.start = start;
	    cloned.end = end;
	    cloned.loc = loc;
	    cloned.range = range;
	    cloned.raw = raw;
	    cloned.value = value;
	    return cloned;
	  }
	  initFunction(node, isAsync) {
	    super.initFunction(node, isAsync);
	    node.expression = false;
	  }
	  checkDeclaration(node) {
	    if (node != null && this.isObjectProperty(node)) {
	      this.checkDeclaration(node.value);
	    } else {
	      super.checkDeclaration(node);
	    }
	  }
	  getObjectOrClassMethodParams(method) {
	    return method.value.params;
	  }
	  isValidDirective(stmt) {
	    var _stmt$expression$extr;
	    return stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && typeof stmt.expression.value === "string" && !((_stmt$expression$extr = stmt.expression.extra) != null && _stmt$expression$extr.parenthesized);
	  }
	  parseBlockBody(node, allowDirectives, topLevel, end, afterBlockParse) {
	    super.parseBlockBody(node, allowDirectives, topLevel, end, afterBlockParse);
	    const directiveStatements = node.directives.map(d => this.directiveToStmt(d));
	    node.body = directiveStatements.concat(node.body);
	    delete node.directives;
	  }
	  parsePrivateName() {
	    const node = super.parsePrivateName();
	    {
	      if (!this.getPluginOption("estree", "classFeatures")) {
	        return node;
	      }
	    }
	    return this.convertPrivateNameToPrivateIdentifier(node);
	  }
	  convertPrivateNameToPrivateIdentifier(node) {
	    const name = super.getPrivateNameSV(node);
	    node = node;
	    delete node.id;
	    node.name = name;
	    return this.castNodeTo(node, "PrivateIdentifier");
	  }
	  isPrivateName(node) {
	    {
	      if (!this.getPluginOption("estree", "classFeatures")) {
	        return super.isPrivateName(node);
	      }
	    }
	    return node.type === "PrivateIdentifier";
	  }
	  getPrivateNameSV(node) {
	    {
	      if (!this.getPluginOption("estree", "classFeatures")) {
	        return super.getPrivateNameSV(node);
	      }
	    }
	    return node.name;
	  }
	  parseLiteral(value, type) {
	    const node = super.parseLiteral(value, type);
	    node.raw = node.extra.raw;
	    delete node.extra;
	    return node;
	  }
	  parseFunctionBody(node, allowExpression, isMethod = false) {
	    super.parseFunctionBody(node, allowExpression, isMethod);
	    node.expression = node.body.type !== "BlockStatement";
	  }
	  parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope = false) {
	    let funcNode = this.startNode();
	    funcNode.kind = node.kind;
	    funcNode = super.parseMethod(funcNode, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope);
	    delete funcNode.kind;
	    const {
	      typeParameters
	    } = node;
	    if (typeParameters) {
	      delete node.typeParameters;
	      funcNode.typeParameters = typeParameters;
	      this.resetStartLocationFromNode(funcNode, typeParameters);
	    }
	    const valueNode = this.castNodeTo(funcNode, "FunctionExpression");
	    node.value = valueNode;
	    if (type === "ClassPrivateMethod") {
	      node.computed = false;
	    }
	    if (type === "ObjectMethod") {
	      if (node.kind === "method") {
	        node.kind = "init";
	      }
	      node.shorthand = false;
	      return this.finishNode(node, "Property");
	    } else {
	      return this.finishNode(node, "MethodDefinition");
	    }
	  }
	  nameIsConstructor(key) {
	    if (key.type === "Literal") return key.value === "constructor";
	    return super.nameIsConstructor(key);
	  }
	  parseClassProperty(...args) {
	    const propertyNode = super.parseClassProperty(...args);
	    {
	      if (!this.getPluginOption("estree", "classFeatures")) {
	        return propertyNode;
	      }
	    }
	    {
	      this.castNodeTo(propertyNode, "PropertyDefinition");
	    }
	    return propertyNode;
	  }
	  parseClassPrivateProperty(...args) {
	    const propertyNode = super.parseClassPrivateProperty(...args);
	    {
	      if (!this.getPluginOption("estree", "classFeatures")) {
	        return propertyNode;
	      }
	    }
	    {
	      this.castNodeTo(propertyNode, "PropertyDefinition");
	    }
	    propertyNode.computed = false;
	    return propertyNode;
	  }
	  parseClassAccessorProperty(node) {
	    const accessorPropertyNode = super.parseClassAccessorProperty(node);
	    {
	      if (!this.getPluginOption("estree", "classFeatures")) {
	        return accessorPropertyNode;
	      }
	    }
	    if (accessorPropertyNode.abstract && this.hasPlugin("typescript")) {
	      delete accessorPropertyNode.abstract;
	      this.castNodeTo(accessorPropertyNode, "TSAbstractAccessorProperty");
	    } else {
	      this.castNodeTo(accessorPropertyNode, "AccessorProperty");
	    }
	    return accessorPropertyNode;
	  }
	  parseObjectProperty(prop, startLoc, isPattern, refExpressionErrors) {
	    const node = super.parseObjectProperty(prop, startLoc, isPattern, refExpressionErrors);
	    if (node) {
	      node.kind = "init";
	      this.castNodeTo(node, "Property");
	    }
	    return node;
	  }
	  finishObjectProperty(node) {
	    node.kind = "init";
	    return this.finishNode(node, "Property");
	  }
	  isValidLVal(type, isUnparenthesizedInAssign, binding) {
	    return type === "Property" ? "value" : super.isValidLVal(type, isUnparenthesizedInAssign, binding);
	  }
	  isAssignable(node, isBinding) {
	    if (node != null && this.isObjectProperty(node)) {
	      return this.isAssignable(node.value, isBinding);
	    }
	    return super.isAssignable(node, isBinding);
	  }
	  toAssignable(node, isLHS = false) {
	    if (node != null && this.isObjectProperty(node)) {
	      const {
	        key,
	        value
	      } = node;
	      if (this.isPrivateName(key)) {
	        this.classScope.usePrivateName(this.getPrivateNameSV(key), key.loc.start);
	      }
	      this.toAssignable(value, isLHS);
	    } else {
	      super.toAssignable(node, isLHS);
	    }
	  }
	  toAssignableObjectExpressionProp(prop, isLast, isLHS) {
	    if (prop.type === "Property" && (prop.kind === "get" || prop.kind === "set")) {
	      this.raise(Errors.PatternHasAccessor, prop.key);
	    } else if (prop.type === "Property" && prop.method) {
	      this.raise(Errors.PatternHasMethod, prop.key);
	    } else {
	      super.toAssignableObjectExpressionProp(prop, isLast, isLHS);
	    }
	  }
	  finishCallExpression(unfinished, optional) {
	    const node = super.finishCallExpression(unfinished, optional);
	    if (node.callee.type === "Import") {
	      var _ref, _ref2;
	      this.castNodeTo(node, "ImportExpression");
	      node.source = node.arguments[0];
	      node.options = (_ref = node.arguments[1]) != null ? _ref : null;
	      node.attributes = (_ref2 = node.arguments[1]) != null ? _ref2 : null;
	      delete node.arguments;
	      delete node.callee;
	    } else if (node.type === "OptionalCallExpression") {
	      this.castNodeTo(node, "CallExpression");
	    } else {
	      node.optional = false;
	    }
	    return node;
	  }
	  toReferencedArguments(node) {
	    if (node.type === "ImportExpression") {
	      return;
	    }
	    super.toReferencedArguments(node);
	  }
	  parseExport(unfinished, decorators) {
	    const exportStartLoc = this.state.lastTokStartLoc;
	    const node = super.parseExport(unfinished, decorators);
	    switch (node.type) {
	      case "ExportAllDeclaration":
	        node.exported = null;
	        break;
	      case "ExportNamedDeclaration":
	        if (node.specifiers.length === 1 && node.specifiers[0].type === "ExportNamespaceSpecifier") {
	          this.castNodeTo(node, "ExportAllDeclaration");
	          node.exported = node.specifiers[0].exported;
	          delete node.specifiers;
	        }
	      case "ExportDefaultDeclaration":
	        {
	          var _declaration$decorato;
	          const {
	            declaration
	          } = node;
	          if ((declaration == null ? void 0 : declaration.type) === "ClassDeclaration" && ((_declaration$decorato = declaration.decorators) == null ? void 0 : _declaration$decorato.length) > 0 && declaration.start === node.start) {
	            this.resetStartLocation(node, exportStartLoc);
	          }
	        }
	        break;
	    }
	    return node;
	  }
	  stopParseSubscript(base, state) {
	    const node = super.stopParseSubscript(base, state);
	    if (state.optionalChainMember) {
	      return this.estreeParseChainExpression(node, base.loc.end);
	    }
	    return node;
	  }
	  parseMember(base, startLoc, state, computed, optional) {
	    const node = super.parseMember(base, startLoc, state, computed, optional);
	    if (node.type === "OptionalMemberExpression") {
	      this.castNodeTo(node, "MemberExpression");
	    } else {
	      node.optional = false;
	    }
	    return node;
	  }
	  isOptionalMemberExpression(node) {
	    if (node.type === "ChainExpression") {
	      return node.expression.type === "MemberExpression";
	    }
	    return super.isOptionalMemberExpression(node);
	  }
	  hasPropertyAsPrivateName(node) {
	    if (node.type === "ChainExpression") {
	      node = node.expression;
	    }
	    return super.hasPropertyAsPrivateName(node);
	  }
	  isObjectProperty(node) {
	    return node.type === "Property" && node.kind === "init" && !node.method;
	  }
	  isObjectMethod(node) {
	    return node.type === "Property" && (node.method || node.kind === "get" || node.kind === "set");
	  }
	  castNodeTo(node, type) {
	    const result = super.castNodeTo(node, type);
	    this.fillOptionalPropertiesForTSESLint(result);
	    return result;
	  }
	  cloneIdentifier(node) {
	    const cloned = super.cloneIdentifier(node);
	    this.fillOptionalPropertiesForTSESLint(cloned);
	    return cloned;
	  }
	  cloneStringLiteral(node) {
	    if (node.type === "Literal") {
	      return this.cloneEstreeStringLiteral(node);
	    }
	    return super.cloneStringLiteral(node);
	  }
	  finishNodeAt(node, type, endLoc) {
	    return toESTreeLocation(super.finishNodeAt(node, type, endLoc));
	  }
	  finishNode(node, type) {
	    const result = super.finishNode(node, type);
	    this.fillOptionalPropertiesForTSESLint(result);
	    return result;
	  }
	  resetStartLocation(node, startLoc) {
	    super.resetStartLocation(node, startLoc);
	    toESTreeLocation(node);
	  }
	  resetEndLocation(node, endLoc = this.state.lastTokEndLoc) {
	    super.resetEndLocation(node, endLoc);
	    toESTreeLocation(node);
	  }
	};
	class TokContext {
	  constructor(token, preserveSpace) {
	    this.token = void 0;
	    this.preserveSpace = void 0;
	    this.token = token;
	    this.preserveSpace = !!preserveSpace;
	  }
	}
	const types = {
	  brace: new TokContext("{"),
	  j_oTag: new TokContext("<tag"),
	  j_cTag: new TokContext("</tag"),
	  j_expr: new TokContext("<tag>...</tag>", true)
	};
	{
	  types.template = new TokContext("`", true);
	}
	const beforeExpr = true;
	const startsExpr = true;
	const isLoop = true;
	const isAssign = true;
	const prefix = true;
	const postfix = true;
	class ExportedTokenType {
	  constructor(label, conf = {}) {
	    this.label = void 0;
	    this.keyword = void 0;
	    this.beforeExpr = void 0;
	    this.startsExpr = void 0;
	    this.rightAssociative = void 0;
	    this.isLoop = void 0;
	    this.isAssign = void 0;
	    this.prefix = void 0;
	    this.postfix = void 0;
	    this.binop = void 0;
	    this.label = label;
	    this.keyword = conf.keyword;
	    this.beforeExpr = !!conf.beforeExpr;
	    this.startsExpr = !!conf.startsExpr;
	    this.rightAssociative = !!conf.rightAssociative;
	    this.isLoop = !!conf.isLoop;
	    this.isAssign = !!conf.isAssign;
	    this.prefix = !!conf.prefix;
	    this.postfix = !!conf.postfix;
	    this.binop = conf.binop != null ? conf.binop : null;
	    {
	      this.updateContext = null;
	    }
	  }
	}
	const keywords$1 = new Map();
	function createKeyword(name, options = {}) {
	  options.keyword = name;
	  const token = createToken(name, options);
	  keywords$1.set(name, token);
	  return token;
	}
	function createBinop(name, binop) {
	  return createToken(name, {
	    beforeExpr,
	    binop
	  });
	}
	let tokenTypeCounter = -1;
	const tokenTypes = [];
	const tokenLabels = [];
	const tokenBinops = [];
	const tokenBeforeExprs = [];
	const tokenStartsExprs = [];
	const tokenPrefixes = [];
	function createToken(name, options = {}) {
	  var _options$binop, _options$beforeExpr, _options$startsExpr, _options$prefix;
	  ++tokenTypeCounter;
	  tokenLabels.push(name);
	  tokenBinops.push((_options$binop = options.binop) != null ? _options$binop : -1);
	  tokenBeforeExprs.push((_options$beforeExpr = options.beforeExpr) != null ? _options$beforeExpr : false);
	  tokenStartsExprs.push((_options$startsExpr = options.startsExpr) != null ? _options$startsExpr : false);
	  tokenPrefixes.push((_options$prefix = options.prefix) != null ? _options$prefix : false);
	  tokenTypes.push(new ExportedTokenType(name, options));
	  return tokenTypeCounter;
	}
	function createKeywordLike(name, options = {}) {
	  var _options$binop2, _options$beforeExpr2, _options$startsExpr2, _options$prefix2;
	  ++tokenTypeCounter;
	  keywords$1.set(name, tokenTypeCounter);
	  tokenLabels.push(name);
	  tokenBinops.push((_options$binop2 = options.binop) != null ? _options$binop2 : -1);
	  tokenBeforeExprs.push((_options$beforeExpr2 = options.beforeExpr) != null ? _options$beforeExpr2 : false);
	  tokenStartsExprs.push((_options$startsExpr2 = options.startsExpr) != null ? _options$startsExpr2 : false);
	  tokenPrefixes.push((_options$prefix2 = options.prefix) != null ? _options$prefix2 : false);
	  tokenTypes.push(new ExportedTokenType("name", options));
	  return tokenTypeCounter;
	}
	const tt = {
	  bracketL: createToken("[", {
	    beforeExpr,
	    startsExpr
	  }),
	  bracketHashL: createToken("#[", {
	    beforeExpr,
	    startsExpr
	  }),
	  bracketBarL: createToken("[|", {
	    beforeExpr,
	    startsExpr
	  }),
	  bracketR: createToken("]"),
	  bracketBarR: createToken("|]"),
	  braceL: createToken("{", {
	    beforeExpr,
	    startsExpr
	  }),
	  braceBarL: createToken("{|", {
	    beforeExpr,
	    startsExpr
	  }),
	  braceHashL: createToken("#{", {
	    beforeExpr,
	    startsExpr
	  }),
	  braceR: createToken("}"),
	  braceBarR: createToken("|}"),
	  parenL: createToken("(", {
	    beforeExpr,
	    startsExpr
	  }),
	  parenR: createToken(")"),
	  comma: createToken(",", {
	    beforeExpr
	  }),
	  semi: createToken(";", {
	    beforeExpr
	  }),
	  colon: createToken(":", {
	    beforeExpr
	  }),
	  doubleColon: createToken("::", {
	    beforeExpr
	  }),
	  dot: createToken("."),
	  question: createToken("?", {
	    beforeExpr
	  }),
	  questionDot: createToken("?."),
	  arrow: createToken("=>", {
	    beforeExpr
	  }),
	  template: createToken("template"),
	  ellipsis: createToken("...", {
	    beforeExpr
	  }),
	  backQuote: createToken("`", {
	    startsExpr
	  }),
	  dollarBraceL: createToken("${", {
	    beforeExpr,
	    startsExpr
	  }),
	  templateTail: createToken("...`", {
	    startsExpr
	  }),
	  templateNonTail: createToken("...${", {
	    beforeExpr,
	    startsExpr
	  }),
	  at: createToken("@"),
	  hash: createToken("#", {
	    startsExpr
	  }),
	  interpreterDirective: createToken("#!..."),
	  eq: createToken("=", {
	    beforeExpr,
	    isAssign
	  }),
	  assign: createToken("_=", {
	    beforeExpr,
	    isAssign
	  }),
	  slashAssign: createToken("_=", {
	    beforeExpr,
	    isAssign
	  }),
	  xorAssign: createToken("_=", {
	    beforeExpr,
	    isAssign
	  }),
	  moduloAssign: createToken("_=", {
	    beforeExpr,
	    isAssign
	  }),
	  incDec: createToken("++/--", {
	    prefix,
	    postfix,
	    startsExpr
	  }),
	  bang: createToken("!", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  tilde: createToken("~", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  doubleCaret: createToken("^^", {
	    startsExpr
	  }),
	  doubleAt: createToken("@@", {
	    startsExpr
	  }),
	  pipeline: createBinop("|>", 0),
	  nullishCoalescing: createBinop("??", 1),
	  logicalOR: createBinop("||", 1),
	  logicalAND: createBinop("&&", 2),
	  bitwiseOR: createBinop("|", 3),
	  bitwiseXOR: createBinop("^", 4),
	  bitwiseAND: createBinop("&", 5),
	  equality: createBinop("==/!=/===/!==", 6),
	  lt: createBinop("</>/<=/>=", 7),
	  gt: createBinop("</>/<=/>=", 7),
	  relational: createBinop("</>/<=/>=", 7),
	  bitShift: createBinop("<</>>/>>>", 8),
	  bitShiftL: createBinop("<</>>/>>>", 8),
	  bitShiftR: createBinop("<</>>/>>>", 8),
	  plusMin: createToken("+/-", {
	    beforeExpr,
	    binop: 9,
	    prefix,
	    startsExpr
	  }),
	  modulo: createToken("%", {
	    binop: 10,
	    startsExpr
	  }),
	  star: createToken("*", {
	    binop: 10
	  }),
	  slash: createBinop("/", 10),
	  exponent: createToken("**", {
	    beforeExpr,
	    binop: 11,
	    rightAssociative: true
	  }),
	  _in: createKeyword("in", {
	    beforeExpr,
	    binop: 7
	  }),
	  _instanceof: createKeyword("instanceof", {
	    beforeExpr,
	    binop: 7
	  }),
	  _break: createKeyword("break"),
	  _case: createKeyword("case", {
	    beforeExpr
	  }),
	  _catch: createKeyword("catch"),
	  _continue: createKeyword("continue"),
	  _debugger: createKeyword("debugger"),
	  _default: createKeyword("default", {
	    beforeExpr
	  }),
	  _else: createKeyword("else", {
	    beforeExpr
	  }),
	  _finally: createKeyword("finally"),
	  _function: createKeyword("function", {
	    startsExpr
	  }),
	  _if: createKeyword("if"),
	  _return: createKeyword("return", {
	    beforeExpr
	  }),
	  _switch: createKeyword("switch"),
	  _throw: createKeyword("throw", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  _try: createKeyword("try"),
	  _var: createKeyword("var"),
	  _const: createKeyword("const"),
	  _with: createKeyword("with"),
	  _new: createKeyword("new", {
	    beforeExpr,
	    startsExpr
	  }),
	  _this: createKeyword("this", {
	    startsExpr
	  }),
	  _super: createKeyword("super", {
	    startsExpr
	  }),
	  _class: createKeyword("class", {
	    startsExpr
	  }),
	  _extends: createKeyword("extends", {
	    beforeExpr
	  }),
	  _export: createKeyword("export"),
	  _import: createKeyword("import", {
	    startsExpr
	  }),
	  _null: createKeyword("null", {
	    startsExpr
	  }),
	  _true: createKeyword("true", {
	    startsExpr
	  }),
	  _false: createKeyword("false", {
	    startsExpr
	  }),
	  _typeof: createKeyword("typeof", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  _void: createKeyword("void", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  _delete: createKeyword("delete", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  _do: createKeyword("do", {
	    isLoop,
	    beforeExpr
	  }),
	  _for: createKeyword("for", {
	    isLoop
	  }),
	  _while: createKeyword("while", {
	    isLoop
	  }),
	  _as: createKeywordLike("as", {
	    startsExpr
	  }),
	  _assert: createKeywordLike("assert", {
	    startsExpr
	  }),
	  _async: createKeywordLike("async", {
	    startsExpr
	  }),
	  _await: createKeywordLike("await", {
	    startsExpr
	  }),
	  _defer: createKeywordLike("defer", {
	    startsExpr
	  }),
	  _from: createKeywordLike("from", {
	    startsExpr
	  }),
	  _get: createKeywordLike("get", {
	    startsExpr
	  }),
	  _let: createKeywordLike("let", {
	    startsExpr
	  }),
	  _meta: createKeywordLike("meta", {
	    startsExpr
	  }),
	  _of: createKeywordLike("of", {
	    startsExpr
	  }),
	  _sent: createKeywordLike("sent", {
	    startsExpr
	  }),
	  _set: createKeywordLike("set", {
	    startsExpr
	  }),
	  _source: createKeywordLike("source", {
	    startsExpr
	  }),
	  _static: createKeywordLike("static", {
	    startsExpr
	  }),
	  _using: createKeywordLike("using", {
	    startsExpr
	  }),
	  _yield: createKeywordLike("yield", {
	    startsExpr
	  }),
	  _asserts: createKeywordLike("asserts", {
	    startsExpr
	  }),
	  _checks: createKeywordLike("checks", {
	    startsExpr
	  }),
	  _exports: createKeywordLike("exports", {
	    startsExpr
	  }),
	  _global: createKeywordLike("global", {
	    startsExpr
	  }),
	  _implements: createKeywordLike("implements", {
	    startsExpr
	  }),
	  _intrinsic: createKeywordLike("intrinsic", {
	    startsExpr
	  }),
	  _infer: createKeywordLike("infer", {
	    startsExpr
	  }),
	  _is: createKeywordLike("is", {
	    startsExpr
	  }),
	  _mixins: createKeywordLike("mixins", {
	    startsExpr
	  }),
	  _proto: createKeywordLike("proto", {
	    startsExpr
	  }),
	  _require: createKeywordLike("require", {
	    startsExpr
	  }),
	  _satisfies: createKeywordLike("satisfies", {
	    startsExpr
	  }),
	  _keyof: createKeywordLike("keyof", {
	    startsExpr
	  }),
	  _readonly: createKeywordLike("readonly", {
	    startsExpr
	  }),
	  _unique: createKeywordLike("unique", {
	    startsExpr
	  }),
	  _abstract: createKeywordLike("abstract", {
	    startsExpr
	  }),
	  _declare: createKeywordLike("declare", {
	    startsExpr
	  }),
	  _enum: createKeywordLike("enum", {
	    startsExpr
	  }),
	  _module: createKeywordLike("module", {
	    startsExpr
	  }),
	  _namespace: createKeywordLike("namespace", {
	    startsExpr
	  }),
	  _interface: createKeywordLike("interface", {
	    startsExpr
	  }),
	  _type: createKeywordLike("type", {
	    startsExpr
	  }),
	  _opaque: createKeywordLike("opaque", {
	    startsExpr
	  }),
	  name: createToken("name", {
	    startsExpr
	  }),
	  placeholder: createToken("%%", {
	    startsExpr: true
	  }),
	  string: createToken("string", {
	    startsExpr
	  }),
	  num: createToken("num", {
	    startsExpr
	  }),
	  bigint: createToken("bigint", {
	    startsExpr
	  }),
	  decimal: createToken("decimal", {
	    startsExpr
	  }),
	  regexp: createToken("regexp", {
	    startsExpr
	  }),
	  privateName: createToken("#name", {
	    startsExpr
	  }),
	  eof: createToken("eof"),
	  jsxName: createToken("jsxName"),
	  jsxText: createToken("jsxText", {
	    beforeExpr: true
	  }),
	  jsxTagStart: createToken("jsxTagStart", {
	    startsExpr: true
	  }),
	  jsxTagEnd: createToken("jsxTagEnd")
	};
	function tokenIsIdentifier(token) {
	  return token >= 93 && token <= 133;
	}
	function tokenKeywordOrIdentifierIsKeyword(token) {
	  return token <= 92;
	}
	function tokenIsKeywordOrIdentifier(token) {
	  return token >= 58 && token <= 133;
	}
	function tokenIsLiteralPropertyName(token) {
	  return token >= 58 && token <= 137;
	}
	function tokenComesBeforeExpression(token) {
	  return tokenBeforeExprs[token];
	}
	function tokenCanStartExpression(token) {
	  return tokenStartsExprs[token];
	}
	function tokenIsAssignment(token) {
	  return token >= 29 && token <= 33;
	}
	function tokenIsFlowInterfaceOrTypeOrOpaque(token) {
	  return token >= 129 && token <= 131;
	}
	function tokenIsLoop(token) {
	  return token >= 90 && token <= 92;
	}
	function tokenIsKeyword(token) {
	  return token >= 58 && token <= 92;
	}
	function tokenIsOperator(token) {
	  return token >= 39 && token <= 59;
	}
	function tokenIsPostfix(token) {
	  return token === 34;
	}
	function tokenIsPrefix(token) {
	  return tokenPrefixes[token];
	}
	function tokenIsTSTypeOperator(token) {
	  return token >= 121 && token <= 123;
	}
	function tokenIsTSDeclarationStart(token) {
	  return token >= 124 && token <= 130;
	}
	function tokenLabelName(token) {
	  return tokenLabels[token];
	}
	function tokenOperatorPrecedence(token) {
	  return tokenBinops[token];
	}
	function tokenIsRightAssociative(token) {
	  return token === 57;
	}
	function tokenIsTemplate(token) {
	  return token >= 24 && token <= 25;
	}
	function getExportedToken(token) {
	  return tokenTypes[token];
	}
	{
	  tokenTypes[8].updateContext = context => {
	    context.pop();
	  };
	  tokenTypes[5].updateContext = tokenTypes[7].updateContext = tokenTypes[23].updateContext = context => {
	    context.push(types.brace);
	  };
	  tokenTypes[22].updateContext = context => {
	    if (context[context.length - 1] === types.template) {
	      context.pop();
	    } else {
	      context.push(types.template);
	    }
	  };
	  tokenTypes[143].updateContext = context => {
	    context.push(types.j_expr, types.j_oTag);
	  };
	}
	let nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c8a\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7cd\ua7d0\ua7d1\ua7d3\ua7d5-\ua7dc\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
	let nonASCIIidentifierChars = "\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0897-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0cf3\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ece\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\u30fb\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f\uff65";
	const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
	const nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
	nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
	const astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];
	const astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
	function isInAstralSet(code, set) {
	  let pos = 0x10000;
	  for (let i = 0, length = set.length; i < length; i += 2) {
	    pos += set[i];
	    if (pos > code) return false;
	    pos += set[i + 1];
	    if (pos >= code) return true;
	  }
	  return false;
	}
	function isIdentifierStart(code) {
	  if (code < 65) return code === 36;
	  if (code <= 90) return true;
	  if (code < 97) return code === 95;
	  if (code <= 122) return true;
	  if (code <= 0xffff) {
	    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
	  }
	  return isInAstralSet(code, astralIdentifierStartCodes);
	}
	function isIdentifierChar(code) {
	  if (code < 48) return code === 36;
	  if (code < 58) return true;
	  if (code < 65) return false;
	  if (code <= 90) return true;
	  if (code < 97) return code === 95;
	  if (code <= 122) return true;
	  if (code <= 0xffff) {
	    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
	  }
	  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
	}
	const reservedWords = {
	  keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
	  strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
	  strictBind: ["eval", "arguments"]
	};
	const keywords = new Set(reservedWords.keyword);
	const reservedWordsStrictSet = new Set(reservedWords.strict);
	const reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
	function isReservedWord(word, inModule) {
	  return inModule && word === "await" || word === "enum";
	}
	function isStrictReservedWord(word, inModule) {
	  return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
	}
	function isStrictBindOnlyReservedWord(word) {
	  return reservedWordsStrictBindSet.has(word);
	}
	function isStrictBindReservedWord(word, inModule) {
	  return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
	}
	function isKeyword(word) {
	  return keywords.has(word);
	}
	function isIteratorStart(current, next, next2) {
	  return current === 64 && next === 64 && isIdentifierStart(next2);
	}
	const reservedWordLikeSet = new Set(["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "eval", "arguments", "enum", "await"]);
	function canBeReservedWord(word) {
	  return reservedWordLikeSet.has(word);
	}
	class Scope {
	  constructor(flags) {
	    this.flags = 0;
	    this.names = new Map();
	    this.firstLexicalName = "";
	    this.flags = flags;
	  }
	}
	class ScopeHandler {
	  constructor(parser, inModule) {
	    this.parser = void 0;
	    this.scopeStack = [];
	    this.inModule = void 0;
	    this.undefinedExports = new Map();
	    this.parser = parser;
	    this.inModule = inModule;
	  }
	  get inTopLevel() {
	    return (this.currentScope().flags & 1) > 0;
	  }
	  get inFunction() {
	    return (this.currentVarScopeFlags() & 2) > 0;
	  }
	  get allowSuper() {
	    return (this.currentThisScopeFlags() & 16) > 0;
	  }
	  get allowDirectSuper() {
	    return (this.currentThisScopeFlags() & 32) > 0;
	  }
	  get inClass() {
	    return (this.currentThisScopeFlags() & 64) > 0;
	  }
	  get inClassAndNotInNonArrowFunction() {
	    const flags = this.currentThisScopeFlags();
	    return (flags & 64) > 0 && (flags & 2) === 0;
	  }
	  get inStaticBlock() {
	    for (let i = this.scopeStack.length - 1;; i--) {
	      const {
	        flags
	      } = this.scopeStack[i];
	      if (flags & 128) {
	        return true;
	      }
	      if (flags & (643 | 64)) {
	        return false;
	      }
	    }
	  }
	  get inNonArrowFunction() {
	    return (this.currentThisScopeFlags() & 2) > 0;
	  }
	  get inBareCaseStatement() {
	    return (this.currentScope().flags & 256) > 0;
	  }
	  get treatFunctionsAsVar() {
	    return this.treatFunctionsAsVarInScope(this.currentScope());
	  }
	  createScope(flags) {
	    return new Scope(flags);
	  }
	  enter(flags) {
	    this.scopeStack.push(this.createScope(flags));
	  }
	  exit() {
	    const scope = this.scopeStack.pop();
	    return scope.flags;
	  }
	  treatFunctionsAsVarInScope(scope) {
	    return !!(scope.flags & (2 | 128) || !this.parser.inModule && scope.flags & 1);
	  }
	  declareName(name, bindingType, loc) {
	    let scope = this.currentScope();
	    if (bindingType & 8 || bindingType & 16) {
	      this.checkRedeclarationInScope(scope, name, bindingType, loc);
	      let type = scope.names.get(name) || 0;
	      if (bindingType & 16) {
	        type = type | 4;
	      } else {
	        if (!scope.firstLexicalName) {
	          scope.firstLexicalName = name;
	        }
	        type = type | 2;
	      }
	      scope.names.set(name, type);
	      if (bindingType & 8) {
	        this.maybeExportDefined(scope, name);
	      }
	    } else if (bindingType & 4) {
	      for (let i = this.scopeStack.length - 1; i >= 0; --i) {
	        scope = this.scopeStack[i];
	        this.checkRedeclarationInScope(scope, name, bindingType, loc);
	        scope.names.set(name, (scope.names.get(name) || 0) | 1);
	        this.maybeExportDefined(scope, name);
	        if (scope.flags & 643) break;
	      }
	    }
	    if (this.parser.inModule && scope.flags & 1) {
	      this.undefinedExports.delete(name);
	    }
	  }
	  maybeExportDefined(scope, name) {
	    if (this.parser.inModule && scope.flags & 1) {
	      this.undefinedExports.delete(name);
	    }
	  }
	  checkRedeclarationInScope(scope, name, bindingType, loc) {
	    if (this.isRedeclaredInScope(scope, name, bindingType)) {
	      this.parser.raise(Errors.VarRedeclaration, loc, {
	        identifierName: name
	      });
	    }
	  }
	  isRedeclaredInScope(scope, name, bindingType) {
	    if (!(bindingType & 1)) return false;
	    if (bindingType & 8) {
	      return scope.names.has(name);
	    }
	    const type = scope.names.get(name);
	    if (bindingType & 16) {
	      return (type & 2) > 0 || !this.treatFunctionsAsVarInScope(scope) && (type & 1) > 0;
	    }
	    return (type & 2) > 0 && !(scope.flags & 8 && scope.firstLexicalName === name) || !this.treatFunctionsAsVarInScope(scope) && (type & 4) > 0;
	  }
	  checkLocalExport(id) {
	    const {
	      name
	    } = id;
	    const topLevelScope = this.scopeStack[0];
	    if (!topLevelScope.names.has(name)) {
	      this.undefinedExports.set(name, id.loc.start);
	    }
	  }
	  currentScope() {
	    return this.scopeStack[this.scopeStack.length - 1];
	  }
	  currentVarScopeFlags() {
	    for (let i = this.scopeStack.length - 1;; i--) {
	      const {
	        flags
	      } = this.scopeStack[i];
	      if (flags & 643) {
	        return flags;
	      }
	    }
	  }
	  currentThisScopeFlags() {
	    for (let i = this.scopeStack.length - 1;; i--) {
	      const {
	        flags
	      } = this.scopeStack[i];
	      if (flags & (643 | 64) && !(flags & 4)) {
	        return flags;
	      }
	    }
	  }
	}
	class FlowScope extends Scope {
	  constructor(...args) {
	    super(...args);
	    this.declareFunctions = new Set();
	  }
	}
	class FlowScopeHandler extends ScopeHandler {
	  createScope(flags) {
	    return new FlowScope(flags);
	  }
	  declareName(name, bindingType, loc) {
	    const scope = this.currentScope();
	    if (bindingType & 2048) {
	      this.checkRedeclarationInScope(scope, name, bindingType, loc);
	      this.maybeExportDefined(scope, name);
	      scope.declareFunctions.add(name);
	      return;
	    }
	    super.declareName(name, bindingType, loc);
	  }
	  isRedeclaredInScope(scope, name, bindingType) {
	    if (super.isRedeclaredInScope(scope, name, bindingType)) return true;
	    if (bindingType & 2048 && !scope.declareFunctions.has(name)) {
	      const type = scope.names.get(name);
	      return (type & 4) > 0 || (type & 2) > 0;
	    }
	    return false;
	  }
	  checkLocalExport(id) {
	    if (!this.scopeStack[0].declareFunctions.has(id.name)) {
	      super.checkLocalExport(id);
	    }
	  }
	}
	const reservedTypes = new Set(["_", "any", "bool", "boolean", "empty", "extends", "false", "interface", "mixed", "null", "number", "static", "string", "true", "typeof", "void"]);
	const FlowErrors = ParseErrorEnum`flow`({
	  AmbiguousConditionalArrow: "Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.",
	  AmbiguousDeclareModuleKind: "Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module.",
	  AssignReservedType: ({
	    reservedType
	  }) => `Cannot overwrite reserved type ${reservedType}.`,
	  DeclareClassElement: "The `declare` modifier can only appear on class fields.",
	  DeclareClassFieldInitializer: "Initializers are not allowed in fields with the `declare` modifier.",
	  DuplicateDeclareModuleExports: "Duplicate `declare module.exports` statement.",
	  EnumBooleanMemberNotInitialized: ({
	    memberName,
	    enumName
	  }) => `Boolean enum members need to be initialized. Use either \`${memberName} = true,\` or \`${memberName} = false,\` in enum \`${enumName}\`.`,
	  EnumDuplicateMemberName: ({
	    memberName,
	    enumName
	  }) => `Enum member names need to be unique, but the name \`${memberName}\` has already been used before in enum \`${enumName}\`.`,
	  EnumInconsistentMemberValues: ({
	    enumName
	  }) => `Enum \`${enumName}\` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.`,
	  EnumInvalidExplicitType: ({
	    invalidEnumType,
	    enumName
	  }) => `Enum type \`${invalidEnumType}\` is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${enumName}\`.`,
	  EnumInvalidExplicitTypeUnknownSupplied: ({
	    enumName
	  }) => `Supplied enum type is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${enumName}\`.`,
	  EnumInvalidMemberInitializerPrimaryType: ({
	    enumName,
	    memberName,
	    explicitType
	  }) => `Enum \`${enumName}\` has type \`${explicitType}\`, so the initializer of \`${memberName}\` needs to be a ${explicitType} literal.`,
	  EnumInvalidMemberInitializerSymbolType: ({
	    enumName,
	    memberName
	  }) => `Symbol enum members cannot be initialized. Use \`${memberName},\` in enum \`${enumName}\`.`,
	  EnumInvalidMemberInitializerUnknownType: ({
	    enumName,
	    memberName
	  }) => `The enum member initializer for \`${memberName}\` needs to be a literal (either a boolean, number, or string) in enum \`${enumName}\`.`,
	  EnumInvalidMemberName: ({
	    enumName,
	    memberName,
	    suggestion
	  }) => `Enum member names cannot start with lowercase 'a' through 'z'. Instead of using \`${memberName}\`, consider using \`${suggestion}\`, in enum \`${enumName}\`.`,
	  EnumNumberMemberNotInitialized: ({
	    enumName,
	    memberName
	  }) => `Number enum members need to be initialized, e.g. \`${memberName} = 1\` in enum \`${enumName}\`.`,
	  EnumStringMemberInconsistentlyInitialized: ({
	    enumName
	  }) => `String enum members need to consistently either all use initializers, or use no initializers, in enum \`${enumName}\`.`,
	  GetterMayNotHaveThisParam: "A getter cannot have a `this` parameter.",
	  ImportReflectionHasImportType: "An `import module` declaration can not use `type` or `typeof` keyword.",
	  ImportTypeShorthandOnlyInPureImport: "The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements.",
	  InexactInsideExact: "Explicit inexact syntax cannot appear inside an explicit exact object type.",
	  InexactInsideNonObject: "Explicit inexact syntax cannot appear in class or interface definitions.",
	  InexactVariance: "Explicit inexact syntax cannot have variance.",
	  InvalidNonTypeImportInDeclareModule: "Imports within a `declare module` body must always be `import type` or `import typeof`.",
	  MissingTypeParamDefault: "Type parameter declaration needs a default, since a preceding type parameter declaration has a default.",
	  NestedDeclareModule: "`declare module` cannot be used inside another `declare module`.",
	  NestedFlowComment: "Cannot have a flow comment inside another flow comment.",
	  PatternIsOptional: Object.assign({
	    message: "A binding pattern parameter cannot be optional in an implementation signature."
	  }, {
	    reasonCode: "OptionalBindingPattern"
	  }),
	  SetterMayNotHaveThisParam: "A setter cannot have a `this` parameter.",
	  SpreadVariance: "Spread properties cannot have variance.",
	  ThisParamAnnotationRequired: "A type annotation is required for the `this` parameter.",
	  ThisParamBannedInConstructor: "Constructors cannot have a `this` parameter; constructors don't bind `this` like other functions.",
	  ThisParamMayNotBeOptional: "The `this` parameter cannot be optional.",
	  ThisParamMustBeFirst: "The `this` parameter must be the first function parameter.",
	  ThisParamNoDefault: "The `this` parameter may not have a default value.",
	  TypeBeforeInitializer: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
	  TypeCastInPattern: "The type cast expression is expected to be wrapped with parenthesis.",
	  UnexpectedExplicitInexactInObject: "Explicit inexact syntax must appear at the end of an inexact object.",
	  UnexpectedReservedType: ({
	    reservedType
	  }) => `Unexpected reserved type ${reservedType}.`,
	  UnexpectedReservedUnderscore: "`_` is only allowed as a type argument to call or new.",
	  UnexpectedSpaceBetweenModuloChecks: "Spaces between `%` and `checks` are not allowed here.",
	  UnexpectedSpreadType: "Spread operator cannot appear in class or interface definitions.",
	  UnexpectedSubtractionOperand: 'Unexpected token, expected "number" or "bigint".',
	  UnexpectedTokenAfterTypeParameter: "Expected an arrow function after this type parameter declaration.",
	  UnexpectedTypeParameterBeforeAsyncArrowFunction: "Type parameters must come after the async keyword, e.g. instead of `<T> async () => {}`, use `async <T>() => {}`.",
	  UnsupportedDeclareExportKind: ({
	    unsupportedExportKind,
	    suggestion
	  }) => `\`declare export ${unsupportedExportKind}\` is not supported. Use \`${suggestion}\` instead.`,
	  UnsupportedStatementInDeclareModule: "Only declares and type imports are allowed inside declare module.",
	  UnterminatedFlowComment: "Unterminated flow-comment."
	});
	function isEsModuleType(bodyElement) {
	  return bodyElement.type === "DeclareExportAllDeclaration" || bodyElement.type === "DeclareExportDeclaration" && (!bodyElement.declaration || bodyElement.declaration.type !== "TypeAlias" && bodyElement.declaration.type !== "InterfaceDeclaration");
	}
	function hasTypeImportKind(node) {
	  return node.importKind === "type" || node.importKind === "typeof";
	}
	const exportSuggestions = {
	  const: "declare export var",
	  let: "declare export var",
	  type: "export type",
	  interface: "export interface"
	};
	function partition(list, test) {
	  const list1 = [];
	  const list2 = [];
	  for (let i = 0; i < list.length; i++) {
	    (test(list[i], i, list) ? list1 : list2).push(list[i]);
	  }
	  return [list1, list2];
	}
	const FLOW_PRAGMA_REGEX = /\*?\s*@((?:no)?flow)\b/;
	var flow = superClass => class FlowParserMixin extends superClass {
	  constructor(...args) {
	    super(...args);
	    this.flowPragma = undefined;
	  }
	  getScopeHandler() {
	    return FlowScopeHandler;
	  }
	  shouldParseTypes() {
	    return this.getPluginOption("flow", "all") || this.flowPragma === "flow";
	  }
	  finishToken(type, val) {
	    if (type !== 134 && type !== 13 && type !== 28) {
	      if (this.flowPragma === undefined) {
	        this.flowPragma = null;
	      }
	    }
	    super.finishToken(type, val);
	  }
	  addComment(comment) {
	    if (this.flowPragma === undefined) {
	      const matches = FLOW_PRAGMA_REGEX.exec(comment.value);
	      if (!matches) ;else if (matches[1] === "flow") {
	        this.flowPragma = "flow";
	      } else if (matches[1] === "noflow") {
	        this.flowPragma = "noflow";
	      } else {
	        throw new Error("Unexpected flow pragma");
	      }
	    }
	    super.addComment(comment);
	  }
	  flowParseTypeInitialiser(tok) {
	    const oldInType = this.state.inType;
	    this.state.inType = true;
	    this.expect(tok || 14);
	    const type = this.flowParseType();
	    this.state.inType = oldInType;
	    return type;
	  }
	  flowParsePredicate() {
	    const node = this.startNode();
	    const moduloLoc = this.state.startLoc;
	    this.next();
	    this.expectContextual(110);
	    if (this.state.lastTokStartLoc.index > moduloLoc.index + 1) {
	      this.raise(FlowErrors.UnexpectedSpaceBetweenModuloChecks, moduloLoc);
	    }
	    if (this.eat(10)) {
	      node.value = super.parseExpression();
	      this.expect(11);
	      return this.finishNode(node, "DeclaredPredicate");
	    } else {
	      return this.finishNode(node, "InferredPredicate");
	    }
	  }
	  flowParseTypeAndPredicateInitialiser() {
	    const oldInType = this.state.inType;
	    this.state.inType = true;
	    this.expect(14);
	    let type = null;
	    let predicate = null;
	    if (this.match(54)) {
	      this.state.inType = oldInType;
	      predicate = this.flowParsePredicate();
	    } else {
	      type = this.flowParseType();
	      this.state.inType = oldInType;
	      if (this.match(54)) {
	        predicate = this.flowParsePredicate();
	      }
	    }
	    return [type, predicate];
	  }
	  flowParseDeclareClass(node) {
	    this.next();
	    this.flowParseInterfaceish(node, true);
	    return this.finishNode(node, "DeclareClass");
	  }
	  flowParseDeclareFunction(node) {
	    this.next();
	    const id = node.id = this.parseIdentifier();
	    const typeNode = this.startNode();
	    const typeContainer = this.startNode();
	    if (this.match(47)) {
	      typeNode.typeParameters = this.flowParseTypeParameterDeclaration();
	    } else {
	      typeNode.typeParameters = null;
	    }
	    this.expect(10);
	    const tmp = this.flowParseFunctionTypeParams();
	    typeNode.params = tmp.params;
	    typeNode.rest = tmp.rest;
	    typeNode.this = tmp._this;
	    this.expect(11);
	    [typeNode.returnType, node.predicate] = this.flowParseTypeAndPredicateInitialiser();
	    typeContainer.typeAnnotation = this.finishNode(typeNode, "FunctionTypeAnnotation");
	    id.typeAnnotation = this.finishNode(typeContainer, "TypeAnnotation");
	    this.resetEndLocation(id);
	    this.semicolon();
	    this.scope.declareName(node.id.name, 2048, node.id.loc.start);
	    return this.finishNode(node, "DeclareFunction");
	  }
	  flowParseDeclare(node, insideModule) {
	    if (this.match(80)) {
	      return this.flowParseDeclareClass(node);
	    } else if (this.match(68)) {
	      return this.flowParseDeclareFunction(node);
	    } else if (this.match(74)) {
	      return this.flowParseDeclareVariable(node);
	    } else if (this.eatContextual(127)) {
	      if (this.match(16)) {
	        return this.flowParseDeclareModuleExports(node);
	      } else {
	        if (insideModule) {
	          this.raise(FlowErrors.NestedDeclareModule, this.state.lastTokStartLoc);
	        }
	        return this.flowParseDeclareModule(node);
	      }
	    } else if (this.isContextual(130)) {
	      return this.flowParseDeclareTypeAlias(node);
	    } else if (this.isContextual(131)) {
	      return this.flowParseDeclareOpaqueType(node);
	    } else if (this.isContextual(129)) {
	      return this.flowParseDeclareInterface(node);
	    } else if (this.match(82)) {
	      return this.flowParseDeclareExportDeclaration(node, insideModule);
	    } else {
	      this.unexpected();
	    }
	  }
	  flowParseDeclareVariable(node) {
	    this.next();
	    node.id = this.flowParseTypeAnnotatableIdentifier(true);
	    this.scope.declareName(node.id.name, 5, node.id.loc.start);
	    this.semicolon();
	    return this.finishNode(node, "DeclareVariable");
	  }
	  flowParseDeclareModule(node) {
	    this.scope.enter(0);
	    if (this.match(134)) {
	      node.id = super.parseExprAtom();
	    } else {
	      node.id = this.parseIdentifier();
	    }
	    const bodyNode = node.body = this.startNode();
	    const body = bodyNode.body = [];
	    this.expect(5);
	    while (!this.match(8)) {
	      let bodyNode = this.startNode();
	      if (this.match(83)) {
	        this.next();
	        if (!this.isContextual(130) && !this.match(87)) {
	          this.raise(FlowErrors.InvalidNonTypeImportInDeclareModule, this.state.lastTokStartLoc);
	        }
	        super.parseImport(bodyNode);
	      } else {
	        this.expectContextual(125, FlowErrors.UnsupportedStatementInDeclareModule);
	        bodyNode = this.flowParseDeclare(bodyNode, true);
	      }
	      body.push(bodyNode);
	    }
	    this.scope.exit();
	    this.expect(8);
	    this.finishNode(bodyNode, "BlockStatement");
	    let kind = null;
	    let hasModuleExport = false;
	    body.forEach(bodyElement => {
	      if (isEsModuleType(bodyElement)) {
	        if (kind === "CommonJS") {
	          this.raise(FlowErrors.AmbiguousDeclareModuleKind, bodyElement);
	        }
	        kind = "ES";
	      } else if (bodyElement.type === "DeclareModuleExports") {
	        if (hasModuleExport) {
	          this.raise(FlowErrors.DuplicateDeclareModuleExports, bodyElement);
	        }
	        if (kind === "ES") {
	          this.raise(FlowErrors.AmbiguousDeclareModuleKind, bodyElement);
	        }
	        kind = "CommonJS";
	        hasModuleExport = true;
	      }
	    });
	    node.kind = kind || "CommonJS";
	    return this.finishNode(node, "DeclareModule");
	  }
	  flowParseDeclareExportDeclaration(node, insideModule) {
	    this.expect(82);
	    if (this.eat(65)) {
	      if (this.match(68) || this.match(80)) {
	        node.declaration = this.flowParseDeclare(this.startNode());
	      } else {
	        node.declaration = this.flowParseType();
	        this.semicolon();
	      }
	      node.default = true;
	      return this.finishNode(node, "DeclareExportDeclaration");
	    } else {
	      if (this.match(75) || this.isLet() || (this.isContextual(130) || this.isContextual(129)) && !insideModule) {
	        const label = this.state.value;
	        throw this.raise(FlowErrors.UnsupportedDeclareExportKind, this.state.startLoc, {
	          unsupportedExportKind: label,
	          suggestion: exportSuggestions[label]
	        });
	      }
	      if (this.match(74) || this.match(68) || this.match(80) || this.isContextual(131)) {
	        node.declaration = this.flowParseDeclare(this.startNode());
	        node.default = false;
	        return this.finishNode(node, "DeclareExportDeclaration");
	      } else if (this.match(55) || this.match(5) || this.isContextual(129) || this.isContextual(130) || this.isContextual(131)) {
	        node = this.parseExport(node, null);
	        if (node.type === "ExportNamedDeclaration") {
	          node.default = false;
	          delete node.exportKind;
	          return this.castNodeTo(node, "DeclareExportDeclaration");
	        } else {
	          return this.castNodeTo(node, "DeclareExportAllDeclaration");
	        }
	      }
	    }
	    this.unexpected();
	  }
	  flowParseDeclareModuleExports(node) {
	    this.next();
	    this.expectContextual(111);
	    node.typeAnnotation = this.flowParseTypeAnnotation();
	    this.semicolon();
	    return this.finishNode(node, "DeclareModuleExports");
	  }
	  flowParseDeclareTypeAlias(node) {
	    this.next();
	    const finished = this.flowParseTypeAlias(node);
	    this.castNodeTo(finished, "DeclareTypeAlias");
	    return finished;
	  }
	  flowParseDeclareOpaqueType(node) {
	    this.next();
	    const finished = this.flowParseOpaqueType(node, true);
	    this.castNodeTo(finished, "DeclareOpaqueType");
	    return finished;
	  }
	  flowParseDeclareInterface(node) {
	    this.next();
	    this.flowParseInterfaceish(node, false);
	    return this.finishNode(node, "DeclareInterface");
	  }
	  flowParseInterfaceish(node, isClass) {
	    node.id = this.flowParseRestrictedIdentifier(!isClass, true);
	    this.scope.declareName(node.id.name, isClass ? 17 : 8201, node.id.loc.start);
	    if (this.match(47)) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    } else {
	      node.typeParameters = null;
	    }
	    node.extends = [];
	    if (this.eat(81)) {
	      do {
	        node.extends.push(this.flowParseInterfaceExtends());
	      } while (!isClass && this.eat(12));
	    }
	    if (isClass) {
	      node.implements = [];
	      node.mixins = [];
	      if (this.eatContextual(117)) {
	        do {
	          node.mixins.push(this.flowParseInterfaceExtends());
	        } while (this.eat(12));
	      }
	      if (this.eatContextual(113)) {
	        do {
	          node.implements.push(this.flowParseInterfaceExtends());
	        } while (this.eat(12));
	      }
	    }
	    node.body = this.flowParseObjectType({
	      allowStatic: isClass,
	      allowExact: false,
	      allowSpread: false,
	      allowProto: isClass,
	      allowInexact: false
	    });
	  }
	  flowParseInterfaceExtends() {
	    const node = this.startNode();
	    node.id = this.flowParseQualifiedTypeIdentifier();
	    if (this.match(47)) {
	      node.typeParameters = this.flowParseTypeParameterInstantiation();
	    } else {
	      node.typeParameters = null;
	    }
	    return this.finishNode(node, "InterfaceExtends");
	  }
	  flowParseInterface(node) {
	    this.flowParseInterfaceish(node, false);
	    return this.finishNode(node, "InterfaceDeclaration");
	  }
	  checkNotUnderscore(word) {
	    if (word === "_") {
	      this.raise(FlowErrors.UnexpectedReservedUnderscore, this.state.startLoc);
	    }
	  }
	  checkReservedType(word, startLoc, declaration) {
	    if (!reservedTypes.has(word)) return;
	    this.raise(declaration ? FlowErrors.AssignReservedType : FlowErrors.UnexpectedReservedType, startLoc, {
	      reservedType: word
	    });
	  }
	  flowParseRestrictedIdentifier(liberal, declaration) {
	    this.checkReservedType(this.state.value, this.state.startLoc, declaration);
	    return this.parseIdentifier(liberal);
	  }
	  flowParseTypeAlias(node) {
	    node.id = this.flowParseRestrictedIdentifier(false, true);
	    this.scope.declareName(node.id.name, 8201, node.id.loc.start);
	    if (this.match(47)) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    } else {
	      node.typeParameters = null;
	    }
	    node.right = this.flowParseTypeInitialiser(29);
	    this.semicolon();
	    return this.finishNode(node, "TypeAlias");
	  }
	  flowParseOpaqueType(node, declare) {
	    this.expectContextual(130);
	    node.id = this.flowParseRestrictedIdentifier(true, true);
	    this.scope.declareName(node.id.name, 8201, node.id.loc.start);
	    if (this.match(47)) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    } else {
	      node.typeParameters = null;
	    }
	    node.supertype = null;
	    if (this.match(14)) {
	      node.supertype = this.flowParseTypeInitialiser(14);
	    }
	    node.impltype = null;
	    if (!declare) {
	      node.impltype = this.flowParseTypeInitialiser(29);
	    }
	    this.semicolon();
	    return this.finishNode(node, "OpaqueType");
	  }
	  flowParseTypeParameter(requireDefault = false) {
	    const nodeStartLoc = this.state.startLoc;
	    const node = this.startNode();
	    const variance = this.flowParseVariance();
	    const ident = this.flowParseTypeAnnotatableIdentifier();
	    node.name = ident.name;
	    node.variance = variance;
	    node.bound = ident.typeAnnotation;
	    if (this.match(29)) {
	      this.eat(29);
	      node.default = this.flowParseType();
	    } else {
	      if (requireDefault) {
	        this.raise(FlowErrors.MissingTypeParamDefault, nodeStartLoc);
	      }
	    }
	    return this.finishNode(node, "TypeParameter");
	  }
	  flowParseTypeParameterDeclaration() {
	    const oldInType = this.state.inType;
	    const node = this.startNode();
	    node.params = [];
	    this.state.inType = true;
	    if (this.match(47) || this.match(143)) {
	      this.next();
	    } else {
	      this.unexpected();
	    }
	    let defaultRequired = false;
	    do {
	      const typeParameter = this.flowParseTypeParameter(defaultRequired);
	      node.params.push(typeParameter);
	      if (typeParameter.default) {
	        defaultRequired = true;
	      }
	      if (!this.match(48)) {
	        this.expect(12);
	      }
	    } while (!this.match(48));
	    this.expect(48);
	    this.state.inType = oldInType;
	    return this.finishNode(node, "TypeParameterDeclaration");
	  }
	  flowInTopLevelContext(cb) {
	    if (this.curContext() !== types.brace) {
	      const oldContext = this.state.context;
	      this.state.context = [oldContext[0]];
	      try {
	        return cb();
	      } finally {
	        this.state.context = oldContext;
	      }
	    } else {
	      return cb();
	    }
	  }
	  flowParseTypeParameterInstantiationInExpression() {
	    if (this.reScan_lt() !== 47) return;
	    return this.flowParseTypeParameterInstantiation();
	  }
	  flowParseTypeParameterInstantiation() {
	    const node = this.startNode();
	    const oldInType = this.state.inType;
	    this.state.inType = true;
	    node.params = [];
	    this.flowInTopLevelContext(() => {
	      this.expect(47);
	      const oldNoAnonFunctionType = this.state.noAnonFunctionType;
	      this.state.noAnonFunctionType = false;
	      while (!this.match(48)) {
	        node.params.push(this.flowParseType());
	        if (!this.match(48)) {
	          this.expect(12);
	        }
	      }
	      this.state.noAnonFunctionType = oldNoAnonFunctionType;
	    });
	    this.state.inType = oldInType;
	    if (!this.state.inType && this.curContext() === types.brace) {
	      this.reScan_lt_gt();
	    }
	    this.expect(48);
	    return this.finishNode(node, "TypeParameterInstantiation");
	  }
	  flowParseTypeParameterInstantiationCallOrNew() {
	    if (this.reScan_lt() !== 47) return;
	    const node = this.startNode();
	    const oldInType = this.state.inType;
	    node.params = [];
	    this.state.inType = true;
	    this.expect(47);
	    while (!this.match(48)) {
	      node.params.push(this.flowParseTypeOrImplicitInstantiation());
	      if (!this.match(48)) {
	        this.expect(12);
	      }
	    }
	    this.expect(48);
	    this.state.inType = oldInType;
	    return this.finishNode(node, "TypeParameterInstantiation");
	  }
	  flowParseInterfaceType() {
	    const node = this.startNode();
	    this.expectContextual(129);
	    node.extends = [];
	    if (this.eat(81)) {
	      do {
	        node.extends.push(this.flowParseInterfaceExtends());
	      } while (this.eat(12));
	    }
	    node.body = this.flowParseObjectType({
	      allowStatic: false,
	      allowExact: false,
	      allowSpread: false,
	      allowProto: false,
	      allowInexact: false
	    });
	    return this.finishNode(node, "InterfaceTypeAnnotation");
	  }
	  flowParseObjectPropertyKey() {
	    return this.match(135) || this.match(134) ? super.parseExprAtom() : this.parseIdentifier(true);
	  }
	  flowParseObjectTypeIndexer(node, isStatic, variance) {
	    node.static = isStatic;
	    if (this.lookahead().type === 14) {
	      node.id = this.flowParseObjectPropertyKey();
	      node.key = this.flowParseTypeInitialiser();
	    } else {
	      node.id = null;
	      node.key = this.flowParseType();
	    }
	    this.expect(3);
	    node.value = this.flowParseTypeInitialiser();
	    node.variance = variance;
	    return this.finishNode(node, "ObjectTypeIndexer");
	  }
	  flowParseObjectTypeInternalSlot(node, isStatic) {
	    node.static = isStatic;
	    node.id = this.flowParseObjectPropertyKey();
	    this.expect(3);
	    this.expect(3);
	    if (this.match(47) || this.match(10)) {
	      node.method = true;
	      node.optional = false;
	      node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(node.loc.start));
	    } else {
	      node.method = false;
	      if (this.eat(17)) {
	        node.optional = true;
	      }
	      node.value = this.flowParseTypeInitialiser();
	    }
	    return this.finishNode(node, "ObjectTypeInternalSlot");
	  }
	  flowParseObjectTypeMethodish(node) {
	    node.params = [];
	    node.rest = null;
	    node.typeParameters = null;
	    node.this = null;
	    if (this.match(47)) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    }
	    this.expect(10);
	    if (this.match(78)) {
	      node.this = this.flowParseFunctionTypeParam(true);
	      node.this.name = null;
	      if (!this.match(11)) {
	        this.expect(12);
	      }
	    }
	    while (!this.match(11) && !this.match(21)) {
	      node.params.push(this.flowParseFunctionTypeParam(false));
	      if (!this.match(11)) {
	        this.expect(12);
	      }
	    }
	    if (this.eat(21)) {
	      node.rest = this.flowParseFunctionTypeParam(false);
	    }
	    this.expect(11);
	    node.returnType = this.flowParseTypeInitialiser();
	    return this.finishNode(node, "FunctionTypeAnnotation");
	  }
	  flowParseObjectTypeCallProperty(node, isStatic) {
	    const valueNode = this.startNode();
	    node.static = isStatic;
	    node.value = this.flowParseObjectTypeMethodish(valueNode);
	    return this.finishNode(node, "ObjectTypeCallProperty");
	  }
	  flowParseObjectType({
	    allowStatic,
	    allowExact,
	    allowSpread,
	    allowProto,
	    allowInexact
	  }) {
	    const oldInType = this.state.inType;
	    this.state.inType = true;
	    const nodeStart = this.startNode();
	    nodeStart.callProperties = [];
	    nodeStart.properties = [];
	    nodeStart.indexers = [];
	    nodeStart.internalSlots = [];
	    let endDelim;
	    let exact;
	    let inexact = false;
	    if (allowExact && this.match(6)) {
	      this.expect(6);
	      endDelim = 9;
	      exact = true;
	    } else {
	      this.expect(5);
	      endDelim = 8;
	      exact = false;
	    }
	    nodeStart.exact = exact;
	    while (!this.match(endDelim)) {
	      let isStatic = false;
	      let protoStartLoc = null;
	      let inexactStartLoc = null;
	      const node = this.startNode();
	      if (allowProto && this.isContextual(118)) {
	        const lookahead = this.lookahead();
	        if (lookahead.type !== 14 && lookahead.type !== 17) {
	          this.next();
	          protoStartLoc = this.state.startLoc;
	          allowStatic = false;
	        }
	      }
	      if (allowStatic && this.isContextual(106)) {
	        const lookahead = this.lookahead();
	        if (lookahead.type !== 14 && lookahead.type !== 17) {
	          this.next();
	          isStatic = true;
	        }
	      }
	      const variance = this.flowParseVariance();
	      if (this.eat(0)) {
	        if (protoStartLoc != null) {
	          this.unexpected(protoStartLoc);
	        }
	        if (this.eat(0)) {
	          if (variance) {
	            this.unexpected(variance.loc.start);
	          }
	          nodeStart.internalSlots.push(this.flowParseObjectTypeInternalSlot(node, isStatic));
	        } else {
	          nodeStart.indexers.push(this.flowParseObjectTypeIndexer(node, isStatic, variance));
	        }
	      } else if (this.match(10) || this.match(47)) {
	        if (protoStartLoc != null) {
	          this.unexpected(protoStartLoc);
	        }
	        if (variance) {
	          this.unexpected(variance.loc.start);
	        }
	        nodeStart.callProperties.push(this.flowParseObjectTypeCallProperty(node, isStatic));
	      } else {
	        let kind = "init";
	        if (this.isContextual(99) || this.isContextual(104)) {
	          const lookahead = this.lookahead();
	          if (tokenIsLiteralPropertyName(lookahead.type)) {
	            kind = this.state.value;
	            this.next();
	          }
	        }
	        const propOrInexact = this.flowParseObjectTypeProperty(node, isStatic, protoStartLoc, variance, kind, allowSpread, allowInexact != null ? allowInexact : !exact);
	        if (propOrInexact === null) {
	          inexact = true;
	          inexactStartLoc = this.state.lastTokStartLoc;
	        } else {
	          nodeStart.properties.push(propOrInexact);
	        }
	      }
	      this.flowObjectTypeSemicolon();
	      if (inexactStartLoc && !this.match(8) && !this.match(9)) {
	        this.raise(FlowErrors.UnexpectedExplicitInexactInObject, inexactStartLoc);
	      }
	    }
	    this.expect(endDelim);
	    if (allowSpread) {
	      nodeStart.inexact = inexact;
	    }
	    const out = this.finishNode(nodeStart, "ObjectTypeAnnotation");
	    this.state.inType = oldInType;
	    return out;
	  }
	  flowParseObjectTypeProperty(node, isStatic, protoStartLoc, variance, kind, allowSpread, allowInexact) {
	    if (this.eat(21)) {
	      const isInexactToken = this.match(12) || this.match(13) || this.match(8) || this.match(9);
	      if (isInexactToken) {
	        if (!allowSpread) {
	          this.raise(FlowErrors.InexactInsideNonObject, this.state.lastTokStartLoc);
	        } else if (!allowInexact) {
	          this.raise(FlowErrors.InexactInsideExact, this.state.lastTokStartLoc);
	        }
	        if (variance) {
	          this.raise(FlowErrors.InexactVariance, variance);
	        }
	        return null;
	      }
	      if (!allowSpread) {
	        this.raise(FlowErrors.UnexpectedSpreadType, this.state.lastTokStartLoc);
	      }
	      if (protoStartLoc != null) {
	        this.unexpected(protoStartLoc);
	      }
	      if (variance) {
	        this.raise(FlowErrors.SpreadVariance, variance);
	      }
	      node.argument = this.flowParseType();
	      return this.finishNode(node, "ObjectTypeSpreadProperty");
	    } else {
	      node.key = this.flowParseObjectPropertyKey();
	      node.static = isStatic;
	      node.proto = protoStartLoc != null;
	      node.kind = kind;
	      let optional = false;
	      if (this.match(47) || this.match(10)) {
	        node.method = true;
	        if (protoStartLoc != null) {
	          this.unexpected(protoStartLoc);
	        }
	        if (variance) {
	          this.unexpected(variance.loc.start);
	        }
	        node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(node.loc.start));
	        if (kind === "get" || kind === "set") {
	          this.flowCheckGetterSetterParams(node);
	        }
	        if (!allowSpread && node.key.name === "constructor" && node.value.this) {
	          this.raise(FlowErrors.ThisParamBannedInConstructor, node.value.this);
	        }
	      } else {
	        if (kind !== "init") this.unexpected();
	        node.method = false;
	        if (this.eat(17)) {
	          optional = true;
	        }
	        node.value = this.flowParseTypeInitialiser();
	        node.variance = variance;
	      }
	      node.optional = optional;
	      return this.finishNode(node, "ObjectTypeProperty");
	    }
	  }
	  flowCheckGetterSetterParams(property) {
	    const paramCount = property.kind === "get" ? 0 : 1;
	    const length = property.value.params.length + (property.value.rest ? 1 : 0);
	    if (property.value.this) {
	      this.raise(property.kind === "get" ? FlowErrors.GetterMayNotHaveThisParam : FlowErrors.SetterMayNotHaveThisParam, property.value.this);
	    }
	    if (length !== paramCount) {
	      this.raise(property.kind === "get" ? Errors.BadGetterArity : Errors.BadSetterArity, property);
	    }
	    if (property.kind === "set" && property.value.rest) {
	      this.raise(Errors.BadSetterRestParameter, property);
	    }
	  }
	  flowObjectTypeSemicolon() {
	    if (!this.eat(13) && !this.eat(12) && !this.match(8) && !this.match(9)) {
	      this.unexpected();
	    }
	  }
	  flowParseQualifiedTypeIdentifier(startLoc, id) {
	    startLoc != null ? startLoc : startLoc = this.state.startLoc;
	    let node = id || this.flowParseRestrictedIdentifier(true);
	    while (this.eat(16)) {
	      const node2 = this.startNodeAt(startLoc);
	      node2.qualification = node;
	      node2.id = this.flowParseRestrictedIdentifier(true);
	      node = this.finishNode(node2, "QualifiedTypeIdentifier");
	    }
	    return node;
	  }
	  flowParseGenericType(startLoc, id) {
	    const node = this.startNodeAt(startLoc);
	    node.typeParameters = null;
	    node.id = this.flowParseQualifiedTypeIdentifier(startLoc, id);
	    if (this.match(47)) {
	      node.typeParameters = this.flowParseTypeParameterInstantiation();
	    }
	    return this.finishNode(node, "GenericTypeAnnotation");
	  }
	  flowParseTypeofType() {
	    const node = this.startNode();
	    this.expect(87);
	    node.argument = this.flowParsePrimaryType();
	    return this.finishNode(node, "TypeofTypeAnnotation");
	  }
	  flowParseTupleType() {
	    const node = this.startNode();
	    node.types = [];
	    this.expect(0);
	    while (this.state.pos < this.length && !this.match(3)) {
	      node.types.push(this.flowParseType());
	      if (this.match(3)) break;
	      this.expect(12);
	    }
	    this.expect(3);
	    return this.finishNode(node, "TupleTypeAnnotation");
	  }
	  flowParseFunctionTypeParam(first) {
	    let name = null;
	    let optional = false;
	    let typeAnnotation = null;
	    const node = this.startNode();
	    const lh = this.lookahead();
	    const isThis = this.state.type === 78;
	    if (lh.type === 14 || lh.type === 17) {
	      if (isThis && !first) {
	        this.raise(FlowErrors.ThisParamMustBeFirst, node);
	      }
	      name = this.parseIdentifier(isThis);
	      if (this.eat(17)) {
	        optional = true;
	        if (isThis) {
	          this.raise(FlowErrors.ThisParamMayNotBeOptional, node);
	        }
	      }
	      typeAnnotation = this.flowParseTypeInitialiser();
	    } else {
	      typeAnnotation = this.flowParseType();
	    }
	    node.name = name;
	    node.optional = optional;
	    node.typeAnnotation = typeAnnotation;
	    return this.finishNode(node, "FunctionTypeParam");
	  }
	  reinterpretTypeAsFunctionTypeParam(type) {
	    const node = this.startNodeAt(type.loc.start);
	    node.name = null;
	    node.optional = false;
	    node.typeAnnotation = type;
	    return this.finishNode(node, "FunctionTypeParam");
	  }
	  flowParseFunctionTypeParams(params = []) {
	    let rest = null;
	    let _this = null;
	    if (this.match(78)) {
	      _this = this.flowParseFunctionTypeParam(true);
	      _this.name = null;
	      if (!this.match(11)) {
	        this.expect(12);
	      }
	    }
	    while (!this.match(11) && !this.match(21)) {
	      params.push(this.flowParseFunctionTypeParam(false));
	      if (!this.match(11)) {
	        this.expect(12);
	      }
	    }
	    if (this.eat(21)) {
	      rest = this.flowParseFunctionTypeParam(false);
	    }
	    return {
	      params,
	      rest,
	      _this
	    };
	  }
	  flowIdentToTypeAnnotation(startLoc, node, id) {
	    switch (id.name) {
	      case "any":
	        return this.finishNode(node, "AnyTypeAnnotation");
	      case "bool":
	      case "boolean":
	        return this.finishNode(node, "BooleanTypeAnnotation");
	      case "mixed":
	        return this.finishNode(node, "MixedTypeAnnotation");
	      case "empty":
	        return this.finishNode(node, "EmptyTypeAnnotation");
	      case "number":
	        return this.finishNode(node, "NumberTypeAnnotation");
	      case "string":
	        return this.finishNode(node, "StringTypeAnnotation");
	      case "symbol":
	        return this.finishNode(node, "SymbolTypeAnnotation");
	      default:
	        this.checkNotUnderscore(id.name);
	        return this.flowParseGenericType(startLoc, id);
	    }
	  }
	  flowParsePrimaryType() {
	    const startLoc = this.state.startLoc;
	    const node = this.startNode();
	    let tmp;
	    let type;
	    let isGroupedType = false;
	    const oldNoAnonFunctionType = this.state.noAnonFunctionType;
	    switch (this.state.type) {
	      case 5:
	        return this.flowParseObjectType({
	          allowStatic: false,
	          allowExact: false,
	          allowSpread: true,
	          allowProto: false,
	          allowInexact: true
	        });
	      case 6:
	        return this.flowParseObjectType({
	          allowStatic: false,
	          allowExact: true,
	          allowSpread: true,
	          allowProto: false,
	          allowInexact: false
	        });
	      case 0:
	        this.state.noAnonFunctionType = false;
	        type = this.flowParseTupleType();
	        this.state.noAnonFunctionType = oldNoAnonFunctionType;
	        return type;
	      case 47:
	        {
	          const node = this.startNode();
	          node.typeParameters = this.flowParseTypeParameterDeclaration();
	          this.expect(10);
	          tmp = this.flowParseFunctionTypeParams();
	          node.params = tmp.params;
	          node.rest = tmp.rest;
	          node.this = tmp._this;
	          this.expect(11);
	          this.expect(19);
	          node.returnType = this.flowParseType();
	          return this.finishNode(node, "FunctionTypeAnnotation");
	        }
	      case 10:
	        {
	          const node = this.startNode();
	          this.next();
	          if (!this.match(11) && !this.match(21)) {
	            if (tokenIsIdentifier(this.state.type) || this.match(78)) {
	              const token = this.lookahead().type;
	              isGroupedType = token !== 17 && token !== 14;
	            } else {
	              isGroupedType = true;
	            }
	          }
	          if (isGroupedType) {
	            this.state.noAnonFunctionType = false;
	            type = this.flowParseType();
	            this.state.noAnonFunctionType = oldNoAnonFunctionType;
	            if (this.state.noAnonFunctionType || !(this.match(12) || this.match(11) && this.lookahead().type === 19)) {
	              this.expect(11);
	              return type;
	            } else {
	              this.eat(12);
	            }
	          }
	          if (type) {
	            tmp = this.flowParseFunctionTypeParams([this.reinterpretTypeAsFunctionTypeParam(type)]);
	          } else {
	            tmp = this.flowParseFunctionTypeParams();
	          }
	          node.params = tmp.params;
	          node.rest = tmp.rest;
	          node.this = tmp._this;
	          this.expect(11);
	          this.expect(19);
	          node.returnType = this.flowParseType();
	          node.typeParameters = null;
	          return this.finishNode(node, "FunctionTypeAnnotation");
	        }
	      case 134:
	        return this.parseLiteral(this.state.value, "StringLiteralTypeAnnotation");
	      case 85:
	      case 86:
	        node.value = this.match(85);
	        this.next();
	        return this.finishNode(node, "BooleanLiteralTypeAnnotation");
	      case 53:
	        if (this.state.value === "-") {
	          this.next();
	          if (this.match(135)) {
	            return this.parseLiteralAtNode(-this.state.value, "NumberLiteralTypeAnnotation", node);
	          }
	          if (this.match(136)) {
	            return this.parseLiteralAtNode(-this.state.value, "BigIntLiteralTypeAnnotation", node);
	          }
	          throw this.raise(FlowErrors.UnexpectedSubtractionOperand, this.state.startLoc);
	        }
	        this.unexpected();
	        return;
	      case 135:
	        return this.parseLiteral(this.state.value, "NumberLiteralTypeAnnotation");
	      case 136:
	        return this.parseLiteral(this.state.value, "BigIntLiteralTypeAnnotation");
	      case 88:
	        this.next();
	        return this.finishNode(node, "VoidTypeAnnotation");
	      case 84:
	        this.next();
	        return this.finishNode(node, "NullLiteralTypeAnnotation");
	      case 78:
	        this.next();
	        return this.finishNode(node, "ThisTypeAnnotation");
	      case 55:
	        this.next();
	        return this.finishNode(node, "ExistsTypeAnnotation");
	      case 87:
	        return this.flowParseTypeofType();
	      default:
	        if (tokenIsKeyword(this.state.type)) {
	          const label = tokenLabelName(this.state.type);
	          this.next();
	          return super.createIdentifier(node, label);
	        } else if (tokenIsIdentifier(this.state.type)) {
	          if (this.isContextual(129)) {
	            return this.flowParseInterfaceType();
	          }
	          return this.flowIdentToTypeAnnotation(startLoc, node, this.parseIdentifier());
	        }
	    }
	    this.unexpected();
	  }
	  flowParsePostfixType() {
	    const startLoc = this.state.startLoc;
	    let type = this.flowParsePrimaryType();
	    let seenOptionalIndexedAccess = false;
	    while ((this.match(0) || this.match(18)) && !this.canInsertSemicolon()) {
	      const node = this.startNodeAt(startLoc);
	      const optional = this.eat(18);
	      seenOptionalIndexedAccess = seenOptionalIndexedAccess || optional;
	      this.expect(0);
	      if (!optional && this.match(3)) {
	        node.elementType = type;
	        this.next();
	        type = this.finishNode(node, "ArrayTypeAnnotation");
	      } else {
	        node.objectType = type;
	        node.indexType = this.flowParseType();
	        this.expect(3);
	        if (seenOptionalIndexedAccess) {
	          node.optional = optional;
	          type = this.finishNode(node, "OptionalIndexedAccessType");
	        } else {
	          type = this.finishNode(node, "IndexedAccessType");
	        }
	      }
	    }
	    return type;
	  }
	  flowParsePrefixType() {
	    const node = this.startNode();
	    if (this.eat(17)) {
	      node.typeAnnotation = this.flowParsePrefixType();
	      return this.finishNode(node, "NullableTypeAnnotation");
	    } else {
	      return this.flowParsePostfixType();
	    }
	  }
	  flowParseAnonFunctionWithoutParens() {
	    const param = this.flowParsePrefixType();
	    if (!this.state.noAnonFunctionType && this.eat(19)) {
	      const node = this.startNodeAt(param.loc.start);
	      node.params = [this.reinterpretTypeAsFunctionTypeParam(param)];
	      node.rest = null;
	      node.this = null;
	      node.returnType = this.flowParseType();
	      node.typeParameters = null;
	      return this.finishNode(node, "FunctionTypeAnnotation");
	    }
	    return param;
	  }
	  flowParseIntersectionType() {
	    const node = this.startNode();
	    this.eat(45);
	    const type = this.flowParseAnonFunctionWithoutParens();
	    node.types = [type];
	    while (this.eat(45)) {
	      node.types.push(this.flowParseAnonFunctionWithoutParens());
	    }
	    return node.types.length === 1 ? type : this.finishNode(node, "IntersectionTypeAnnotation");
	  }
	  flowParseUnionType() {
	    const node = this.startNode();
	    this.eat(43);
	    const type = this.flowParseIntersectionType();
	    node.types = [type];
	    while (this.eat(43)) {
	      node.types.push(this.flowParseIntersectionType());
	    }
	    return node.types.length === 1 ? type : this.finishNode(node, "UnionTypeAnnotation");
	  }
	  flowParseType() {
	    const oldInType = this.state.inType;
	    this.state.inType = true;
	    const type = this.flowParseUnionType();
	    this.state.inType = oldInType;
	    return type;
	  }
	  flowParseTypeOrImplicitInstantiation() {
	    if (this.state.type === 132 && this.state.value === "_") {
	      const startLoc = this.state.startLoc;
	      const node = this.parseIdentifier();
	      return this.flowParseGenericType(startLoc, node);
	    } else {
	      return this.flowParseType();
	    }
	  }
	  flowParseTypeAnnotation() {
	    const node = this.startNode();
	    node.typeAnnotation = this.flowParseTypeInitialiser();
	    return this.finishNode(node, "TypeAnnotation");
	  }
	  flowParseTypeAnnotatableIdentifier(allowPrimitiveOverride) {
	    const ident = allowPrimitiveOverride ? this.parseIdentifier() : this.flowParseRestrictedIdentifier();
	    if (this.match(14)) {
	      ident.typeAnnotation = this.flowParseTypeAnnotation();
	      this.resetEndLocation(ident);
	    }
	    return ident;
	  }
	  typeCastToParameter(node) {
	    node.expression.typeAnnotation = node.typeAnnotation;
	    this.resetEndLocation(node.expression, node.typeAnnotation.loc.end);
	    return node.expression;
	  }
	  flowParseVariance() {
	    let variance = null;
	    if (this.match(53)) {
	      variance = this.startNode();
	      if (this.state.value === "+") {
	        variance.kind = "plus";
	      } else {
	        variance.kind = "minus";
	      }
	      this.next();
	      return this.finishNode(variance, "Variance");
	    }
	    return variance;
	  }
	  parseFunctionBody(node, allowExpressionBody, isMethod = false) {
	    if (allowExpressionBody) {
	      this.forwardNoArrowParamsConversionAt(node, () => super.parseFunctionBody(node, true, isMethod));
	      return;
	    }
	    super.parseFunctionBody(node, false, isMethod);
	  }
	  parseFunctionBodyAndFinish(node, type, isMethod = false) {
	    if (this.match(14)) {
	      const typeNode = this.startNode();
	      [typeNode.typeAnnotation, node.predicate] = this.flowParseTypeAndPredicateInitialiser();
	      node.returnType = typeNode.typeAnnotation ? this.finishNode(typeNode, "TypeAnnotation") : null;
	    }
	    return super.parseFunctionBodyAndFinish(node, type, isMethod);
	  }
	  parseStatementLike(flags) {
	    if (this.state.strict && this.isContextual(129)) {
	      const lookahead = this.lookahead();
	      if (tokenIsKeywordOrIdentifier(lookahead.type)) {
	        const node = this.startNode();
	        this.next();
	        return this.flowParseInterface(node);
	      }
	    } else if (this.isContextual(126)) {
	      const node = this.startNode();
	      this.next();
	      return this.flowParseEnumDeclaration(node);
	    }
	    const stmt = super.parseStatementLike(flags);
	    if (this.flowPragma === undefined && !this.isValidDirective(stmt)) {
	      this.flowPragma = null;
	    }
	    return stmt;
	  }
	  parseExpressionStatement(node, expr, decorators) {
	    if (expr.type === "Identifier") {
	      if (expr.name === "declare") {
	        if (this.match(80) || tokenIsIdentifier(this.state.type) || this.match(68) || this.match(74) || this.match(82)) {
	          return this.flowParseDeclare(node);
	        }
	      } else if (tokenIsIdentifier(this.state.type)) {
	        if (expr.name === "interface") {
	          return this.flowParseInterface(node);
	        } else if (expr.name === "type") {
	          return this.flowParseTypeAlias(node);
	        } else if (expr.name === "opaque") {
	          return this.flowParseOpaqueType(node, false);
	        }
	      }
	    }
	    return super.parseExpressionStatement(node, expr, decorators);
	  }
	  shouldParseExportDeclaration() {
	    const {
	      type
	    } = this.state;
	    if (type === 126 || tokenIsFlowInterfaceOrTypeOrOpaque(type)) {
	      return !this.state.containsEsc;
	    }
	    return super.shouldParseExportDeclaration();
	  }
	  isExportDefaultSpecifier() {
	    const {
	      type
	    } = this.state;
	    if (type === 126 || tokenIsFlowInterfaceOrTypeOrOpaque(type)) {
	      return this.state.containsEsc;
	    }
	    return super.isExportDefaultSpecifier();
	  }
	  parseExportDefaultExpression() {
	    if (this.isContextual(126)) {
	      const node = this.startNode();
	      this.next();
	      return this.flowParseEnumDeclaration(node);
	    }
	    return super.parseExportDefaultExpression();
	  }
	  parseConditional(expr, startLoc, refExpressionErrors) {
	    if (!this.match(17)) return expr;
	    if (this.state.maybeInArrowParameters) {
	      const nextCh = this.lookaheadCharCode();
	      if (nextCh === 44 || nextCh === 61 || nextCh === 58 || nextCh === 41) {
	        this.setOptionalParametersError(refExpressionErrors);
	        return expr;
	      }
	    }
	    this.expect(17);
	    const state = this.state.clone();
	    const originalNoArrowAt = this.state.noArrowAt;
	    const node = this.startNodeAt(startLoc);
	    let {
	      consequent,
	      failed
	    } = this.tryParseConditionalConsequent();
	    let [valid, invalid] = this.getArrowLikeExpressions(consequent);
	    if (failed || invalid.length > 0) {
	      const noArrowAt = [...originalNoArrowAt];
	      if (invalid.length > 0) {
	        this.state = state;
	        this.state.noArrowAt = noArrowAt;
	        for (let i = 0; i < invalid.length; i++) {
	          noArrowAt.push(invalid[i].start);
	        }
	        ({
	          consequent,
	          failed
	        } = this.tryParseConditionalConsequent());
	        [valid, invalid] = this.getArrowLikeExpressions(consequent);
	      }
	      if (failed && valid.length > 1) {
	        this.raise(FlowErrors.AmbiguousConditionalArrow, state.startLoc);
	      }
	      if (failed && valid.length === 1) {
	        this.state = state;
	        noArrowAt.push(valid[0].start);
	        this.state.noArrowAt = noArrowAt;
	        ({
	          consequent,
	          failed
	        } = this.tryParseConditionalConsequent());
	      }
	    }
	    this.getArrowLikeExpressions(consequent, true);
	    this.state.noArrowAt = originalNoArrowAt;
	    this.expect(14);
	    node.test = expr;
	    node.consequent = consequent;
	    node.alternate = this.forwardNoArrowParamsConversionAt(node, () => this.parseMaybeAssign(undefined, undefined));
	    return this.finishNode(node, "ConditionalExpression");
	  }
	  tryParseConditionalConsequent() {
	    this.state.noArrowParamsConversionAt.push(this.state.start);
	    const consequent = this.parseMaybeAssignAllowIn();
	    const failed = !this.match(14);
	    this.state.noArrowParamsConversionAt.pop();
	    return {
	      consequent,
	      failed
	    };
	  }
	  getArrowLikeExpressions(node, disallowInvalid) {
	    const stack = [node];
	    const arrows = [];
	    while (stack.length !== 0) {
	      const node = stack.pop();
	      if (node.type === "ArrowFunctionExpression" && node.body.type !== "BlockStatement") {
	        if (node.typeParameters || !node.returnType) {
	          this.finishArrowValidation(node);
	        } else {
	          arrows.push(node);
	        }
	        stack.push(node.body);
	      } else if (node.type === "ConditionalExpression") {
	        stack.push(node.consequent);
	        stack.push(node.alternate);
	      }
	    }
	    if (disallowInvalid) {
	      arrows.forEach(node => this.finishArrowValidation(node));
	      return [arrows, []];
	    }
	    return partition(arrows, node => node.params.every(param => this.isAssignable(param, true)));
	  }
	  finishArrowValidation(node) {
	    var _node$extra;
	    this.toAssignableList(node.params, (_node$extra = node.extra) == null ? void 0 : _node$extra.trailingCommaLoc, false);
	    this.scope.enter(2 | 4);
	    super.checkParams(node, false, true);
	    this.scope.exit();
	  }
	  forwardNoArrowParamsConversionAt(node, parse) {
	    let result;
	    if (this.state.noArrowParamsConversionAt.includes(this.offsetToSourcePos(node.start))) {
	      this.state.noArrowParamsConversionAt.push(this.state.start);
	      result = parse();
	      this.state.noArrowParamsConversionAt.pop();
	    } else {
	      result = parse();
	    }
	    return result;
	  }
	  parseParenItem(node, startLoc) {
	    const newNode = super.parseParenItem(node, startLoc);
	    if (this.eat(17)) {
	      newNode.optional = true;
	      this.resetEndLocation(node);
	    }
	    if (this.match(14)) {
	      const typeCastNode = this.startNodeAt(startLoc);
	      typeCastNode.expression = newNode;
	      typeCastNode.typeAnnotation = this.flowParseTypeAnnotation();
	      return this.finishNode(typeCastNode, "TypeCastExpression");
	    }
	    return newNode;
	  }
	  assertModuleNodeAllowed(node) {
	    if (node.type === "ImportDeclaration" && (node.importKind === "type" || node.importKind === "typeof") || node.type === "ExportNamedDeclaration" && node.exportKind === "type" || node.type === "ExportAllDeclaration" && node.exportKind === "type") {
	      return;
	    }
	    super.assertModuleNodeAllowed(node);
	  }
	  parseExportDeclaration(node) {
	    if (this.isContextual(130)) {
	      node.exportKind = "type";
	      const declarationNode = this.startNode();
	      this.next();
	      if (this.match(5)) {
	        node.specifiers = this.parseExportSpecifiers(true);
	        super.parseExportFrom(node);
	        return null;
	      } else {
	        return this.flowParseTypeAlias(declarationNode);
	      }
	    } else if (this.isContextual(131)) {
	      node.exportKind = "type";
	      const declarationNode = this.startNode();
	      this.next();
	      return this.flowParseOpaqueType(declarationNode, false);
	    } else if (this.isContextual(129)) {
	      node.exportKind = "type";
	      const declarationNode = this.startNode();
	      this.next();
	      return this.flowParseInterface(declarationNode);
	    } else if (this.isContextual(126)) {
	      node.exportKind = "value";
	      const declarationNode = this.startNode();
	      this.next();
	      return this.flowParseEnumDeclaration(declarationNode);
	    } else {
	      return super.parseExportDeclaration(node);
	    }
	  }
	  eatExportStar(node) {
	    if (super.eatExportStar(node)) return true;
	    if (this.isContextual(130) && this.lookahead().type === 55) {
	      node.exportKind = "type";
	      this.next();
	      this.next();
	      return true;
	    }
	    return false;
	  }
	  maybeParseExportNamespaceSpecifier(node) {
	    const {
	      startLoc
	    } = this.state;
	    const hasNamespace = super.maybeParseExportNamespaceSpecifier(node);
	    if (hasNamespace && node.exportKind === "type") {
	      this.unexpected(startLoc);
	    }
	    return hasNamespace;
	  }
	  parseClassId(node, isStatement, optionalId) {
	    super.parseClassId(node, isStatement, optionalId);
	    if (this.match(47)) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    }
	  }
	  parseClassMember(classBody, member, state) {
	    const {
	      startLoc
	    } = this.state;
	    if (this.isContextual(125)) {
	      if (super.parseClassMemberFromModifier(classBody, member)) {
	        return;
	      }
	      member.declare = true;
	    }
	    super.parseClassMember(classBody, member, state);
	    if (member.declare) {
	      if (member.type !== "ClassProperty" && member.type !== "ClassPrivateProperty" && member.type !== "PropertyDefinition") {
	        this.raise(FlowErrors.DeclareClassElement, startLoc);
	      } else if (member.value) {
	        this.raise(FlowErrors.DeclareClassFieldInitializer, member.value);
	      }
	    }
	  }
	  isIterator(word) {
	    return word === "iterator" || word === "asyncIterator";
	  }
	  readIterator() {
	    const word = super.readWord1();
	    const fullWord = "@@" + word;
	    if (!this.isIterator(word) || !this.state.inType) {
	      this.raise(Errors.InvalidIdentifier, this.state.curPosition(), {
	        identifierName: fullWord
	      });
	    }
	    this.finishToken(132, fullWord);
	  }
	  getTokenFromCode(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    if (code === 123 && next === 124) {
	      this.finishOp(6, 2);
	    } else if (this.state.inType && (code === 62 || code === 60)) {
	      this.finishOp(code === 62 ? 48 : 47, 1);
	    } else if (this.state.inType && code === 63) {
	      if (next === 46) {
	        this.finishOp(18, 2);
	      } else {
	        this.finishOp(17, 1);
	      }
	    } else if (isIteratorStart(code, next, this.input.charCodeAt(this.state.pos + 2))) {
	      this.state.pos += 2;
	      this.readIterator();
	    } else {
	      super.getTokenFromCode(code);
	    }
	  }
	  isAssignable(node, isBinding) {
	    if (node.type === "TypeCastExpression") {
	      return this.isAssignable(node.expression, isBinding);
	    } else {
	      return super.isAssignable(node, isBinding);
	    }
	  }
	  toAssignable(node, isLHS = false) {
	    if (!isLHS && node.type === "AssignmentExpression" && node.left.type === "TypeCastExpression") {
	      node.left = this.typeCastToParameter(node.left);
	    }
	    super.toAssignable(node, isLHS);
	  }
	  toAssignableList(exprList, trailingCommaLoc, isLHS) {
	    for (let i = 0; i < exprList.length; i++) {
	      const expr = exprList[i];
	      if ((expr == null ? void 0 : expr.type) === "TypeCastExpression") {
	        exprList[i] = this.typeCastToParameter(expr);
	      }
	    }
	    super.toAssignableList(exprList, trailingCommaLoc, isLHS);
	  }
	  toReferencedList(exprList, isParenthesizedExpr) {
	    for (let i = 0; i < exprList.length; i++) {
	      var _expr$extra;
	      const expr = exprList[i];
	      if (expr && expr.type === "TypeCastExpression" && !((_expr$extra = expr.extra) != null && _expr$extra.parenthesized) && (exprList.length > 1 || !isParenthesizedExpr)) {
	        this.raise(FlowErrors.TypeCastInPattern, expr.typeAnnotation);
	      }
	    }
	    return exprList;
	  }
	  parseArrayLike(close, canBePattern, isTuple, refExpressionErrors) {
	    const node = super.parseArrayLike(close, canBePattern, isTuple, refExpressionErrors);
	    if (canBePattern && !this.state.maybeInArrowParameters) {
	      this.toReferencedList(node.elements);
	    }
	    return node;
	  }
	  isValidLVal(type, isParenthesized, binding) {
	    return type === "TypeCastExpression" || super.isValidLVal(type, isParenthesized, binding);
	  }
	  parseClassProperty(node) {
	    if (this.match(14)) {
	      node.typeAnnotation = this.flowParseTypeAnnotation();
	    }
	    return super.parseClassProperty(node);
	  }
	  parseClassPrivateProperty(node) {
	    if (this.match(14)) {
	      node.typeAnnotation = this.flowParseTypeAnnotation();
	    }
	    return super.parseClassPrivateProperty(node);
	  }
	  isClassMethod() {
	    return this.match(47) || super.isClassMethod();
	  }
	  isClassProperty() {
	    return this.match(14) || super.isClassProperty();
	  }
	  isNonstaticConstructor(method) {
	    return !this.match(14) && super.isNonstaticConstructor(method);
	  }
	  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
	    if (method.variance) {
	      this.unexpected(method.variance.loc.start);
	    }
	    delete method.variance;
	    if (this.match(47)) {
	      method.typeParameters = this.flowParseTypeParameterDeclaration();
	    }
	    super.pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper);
	    if (method.params && isConstructor) {
	      const params = method.params;
	      if (params.length > 0 && this.isThisParam(params[0])) {
	        this.raise(FlowErrors.ThisParamBannedInConstructor, method);
	      }
	    } else if (method.type === "MethodDefinition" && isConstructor && method.value.params) {
	      const params = method.value.params;
	      if (params.length > 0 && this.isThisParam(params[0])) {
	        this.raise(FlowErrors.ThisParamBannedInConstructor, method);
	      }
	    }
	  }
	  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
	    if (method.variance) {
	      this.unexpected(method.variance.loc.start);
	    }
	    delete method.variance;
	    if (this.match(47)) {
	      method.typeParameters = this.flowParseTypeParameterDeclaration();
	    }
	    super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
	  }
	  parseClassSuper(node) {
	    super.parseClassSuper(node);
	    if (node.superClass && (this.match(47) || this.match(51))) {
	      {
	        node.superTypeParameters = this.flowParseTypeParameterInstantiationInExpression();
	      }
	    }
	    if (this.isContextual(113)) {
	      this.next();
	      const implemented = node.implements = [];
	      do {
	        const node = this.startNode();
	        node.id = this.flowParseRestrictedIdentifier(true);
	        if (this.match(47)) {
	          node.typeParameters = this.flowParseTypeParameterInstantiation();
	        } else {
	          node.typeParameters = null;
	        }
	        implemented.push(this.finishNode(node, "ClassImplements"));
	      } while (this.eat(12));
	    }
	  }
	  checkGetterSetterParams(method) {
	    super.checkGetterSetterParams(method);
	    const params = this.getObjectOrClassMethodParams(method);
	    if (params.length > 0) {
	      const param = params[0];
	      if (this.isThisParam(param) && method.kind === "get") {
	        this.raise(FlowErrors.GetterMayNotHaveThisParam, param);
	      } else if (this.isThisParam(param)) {
	        this.raise(FlowErrors.SetterMayNotHaveThisParam, param);
	      }
	    }
	  }
	  parsePropertyNamePrefixOperator(node) {
	    node.variance = this.flowParseVariance();
	  }
	  parseObjPropValue(prop, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors) {
	    if (prop.variance) {
	      this.unexpected(prop.variance.loc.start);
	    }
	    delete prop.variance;
	    let typeParameters;
	    if (this.match(47) && !isAccessor) {
	      typeParameters = this.flowParseTypeParameterDeclaration();
	      if (!this.match(10)) this.unexpected();
	    }
	    const result = super.parseObjPropValue(prop, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors);
	    if (typeParameters) {
	      (result.value || result).typeParameters = typeParameters;
	    }
	    return result;
	  }
	  parseFunctionParamType(param) {
	    if (this.eat(17)) {
	      if (param.type !== "Identifier") {
	        this.raise(FlowErrors.PatternIsOptional, param);
	      }
	      if (this.isThisParam(param)) {
	        this.raise(FlowErrors.ThisParamMayNotBeOptional, param);
	      }
	      param.optional = true;
	    }
	    if (this.match(14)) {
	      param.typeAnnotation = this.flowParseTypeAnnotation();
	    } else if (this.isThisParam(param)) {
	      this.raise(FlowErrors.ThisParamAnnotationRequired, param);
	    }
	    if (this.match(29) && this.isThisParam(param)) {
	      this.raise(FlowErrors.ThisParamNoDefault, param);
	    }
	    this.resetEndLocation(param);
	    return param;
	  }
	  parseMaybeDefault(startLoc, left) {
	    const node = super.parseMaybeDefault(startLoc, left);
	    if (node.type === "AssignmentPattern" && node.typeAnnotation && node.right.start < node.typeAnnotation.start) {
	      this.raise(FlowErrors.TypeBeforeInitializer, node.typeAnnotation);
	    }
	    return node;
	  }
	  checkImportReflection(node) {
	    super.checkImportReflection(node);
	    if (node.module && node.importKind !== "value") {
	      this.raise(FlowErrors.ImportReflectionHasImportType, node.specifiers[0].loc.start);
	    }
	  }
	  parseImportSpecifierLocal(node, specifier, type) {
	    specifier.local = hasTypeImportKind(node) ? this.flowParseRestrictedIdentifier(true, true) : this.parseIdentifier();
	    node.specifiers.push(this.finishImportSpecifier(specifier, type));
	  }
	  isPotentialImportPhase(isExport) {
	    if (super.isPotentialImportPhase(isExport)) return true;
	    if (this.isContextual(130)) {
	      if (!isExport) return true;
	      const ch = this.lookaheadCharCode();
	      return ch === 123 || ch === 42;
	    }
	    return !isExport && this.isContextual(87);
	  }
	  applyImportPhase(node, isExport, phase, loc) {
	    super.applyImportPhase(node, isExport, phase, loc);
	    if (isExport) {
	      if (!phase && this.match(65)) {
	        return;
	      }
	      node.exportKind = phase === "type" ? phase : "value";
	    } else {
	      if (phase === "type" && this.match(55)) this.unexpected();
	      node.importKind = phase === "type" || phase === "typeof" ? phase : "value";
	    }
	  }
	  parseImportSpecifier(specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly, bindingType) {
	    const firstIdent = specifier.imported;
	    let specifierTypeKind = null;
	    if (firstIdent.type === "Identifier") {
	      if (firstIdent.name === "type") {
	        specifierTypeKind = "type";
	      } else if (firstIdent.name === "typeof") {
	        specifierTypeKind = "typeof";
	      }
	    }
	    let isBinding = false;
	    if (this.isContextual(93) && !this.isLookaheadContextual("as")) {
	      const as_ident = this.parseIdentifier(true);
	      if (specifierTypeKind !== null && !tokenIsKeywordOrIdentifier(this.state.type)) {
	        specifier.imported = as_ident;
	        specifier.importKind = specifierTypeKind;
	        specifier.local = this.cloneIdentifier(as_ident);
	      } else {
	        specifier.imported = firstIdent;
	        specifier.importKind = null;
	        specifier.local = this.parseIdentifier();
	      }
	    } else {
	      if (specifierTypeKind !== null && tokenIsKeywordOrIdentifier(this.state.type)) {
	        specifier.imported = this.parseIdentifier(true);
	        specifier.importKind = specifierTypeKind;
	      } else {
	        if (importedIsString) {
	          throw this.raise(Errors.ImportBindingIsString, specifier, {
	            importName: firstIdent.value
	          });
	        }
	        specifier.imported = firstIdent;
	        specifier.importKind = null;
	      }
	      if (this.eatContextual(93)) {
	        specifier.local = this.parseIdentifier();
	      } else {
	        isBinding = true;
	        specifier.local = this.cloneIdentifier(specifier.imported);
	      }
	    }
	    const specifierIsTypeImport = hasTypeImportKind(specifier);
	    if (isInTypeOnlyImport && specifierIsTypeImport) {
	      this.raise(FlowErrors.ImportTypeShorthandOnlyInPureImport, specifier);
	    }
	    if (isInTypeOnlyImport || specifierIsTypeImport) {
	      this.checkReservedType(specifier.local.name, specifier.local.loc.start, true);
	    }
	    if (isBinding && !isInTypeOnlyImport && !specifierIsTypeImport) {
	      this.checkReservedWord(specifier.local.name, specifier.loc.start, true, true);
	    }
	    return this.finishImportSpecifier(specifier, "ImportSpecifier");
	  }
	  parseBindingAtom() {
	    switch (this.state.type) {
	      case 78:
	        return this.parseIdentifier(true);
	      default:
	        return super.parseBindingAtom();
	    }
	  }
	  parseFunctionParams(node, isConstructor) {
	    const kind = node.kind;
	    if (kind !== "get" && kind !== "set" && this.match(47)) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    }
	    super.parseFunctionParams(node, isConstructor);
	  }
	  parseVarId(decl, kind) {
	    super.parseVarId(decl, kind);
	    if (this.match(14)) {
	      decl.id.typeAnnotation = this.flowParseTypeAnnotation();
	      this.resetEndLocation(decl.id);
	    }
	  }
	  parseAsyncArrowFromCallExpression(node, call) {
	    if (this.match(14)) {
	      const oldNoAnonFunctionType = this.state.noAnonFunctionType;
	      this.state.noAnonFunctionType = true;
	      node.returnType = this.flowParseTypeAnnotation();
	      this.state.noAnonFunctionType = oldNoAnonFunctionType;
	    }
	    return super.parseAsyncArrowFromCallExpression(node, call);
	  }
	  shouldParseAsyncArrow() {
	    return this.match(14) || super.shouldParseAsyncArrow();
	  }
	  parseMaybeAssign(refExpressionErrors, afterLeftParse) {
	    var _jsx;
	    let state = null;
	    let jsx;
	    if (this.hasPlugin("jsx") && (this.match(143) || this.match(47))) {
	      state = this.state.clone();
	      jsx = this.tryParse(() => super.parseMaybeAssign(refExpressionErrors, afterLeftParse), state);
	      if (!jsx.error) return jsx.node;
	      const {
	        context
	      } = this.state;
	      const currentContext = context[context.length - 1];
	      if (currentContext === types.j_oTag || currentContext === types.j_expr) {
	        context.pop();
	      }
	    }
	    if ((_jsx = jsx) != null && _jsx.error || this.match(47)) {
	      var _jsx2, _jsx3;
	      state = state || this.state.clone();
	      let typeParameters;
	      const arrow = this.tryParse(abort => {
	        var _arrowExpression$extr;
	        typeParameters = this.flowParseTypeParameterDeclaration();
	        const arrowExpression = this.forwardNoArrowParamsConversionAt(typeParameters, () => {
	          const result = super.parseMaybeAssign(refExpressionErrors, afterLeftParse);
	          this.resetStartLocationFromNode(result, typeParameters);
	          return result;
	        });
	        if ((_arrowExpression$extr = arrowExpression.extra) != null && _arrowExpression$extr.parenthesized) abort();
	        const expr = this.maybeUnwrapTypeCastExpression(arrowExpression);
	        if (expr.type !== "ArrowFunctionExpression") abort();
	        expr.typeParameters = typeParameters;
	        this.resetStartLocationFromNode(expr, typeParameters);
	        return arrowExpression;
	      }, state);
	      let arrowExpression = null;
	      if (arrow.node && this.maybeUnwrapTypeCastExpression(arrow.node).type === "ArrowFunctionExpression") {
	        if (!arrow.error && !arrow.aborted) {
	          if (arrow.node.async) {
	            this.raise(FlowErrors.UnexpectedTypeParameterBeforeAsyncArrowFunction, typeParameters);
	          }
	          return arrow.node;
	        }
	        arrowExpression = arrow.node;
	      }
	      if ((_jsx2 = jsx) != null && _jsx2.node) {
	        this.state = jsx.failState;
	        return jsx.node;
	      }
	      if (arrowExpression) {
	        this.state = arrow.failState;
	        return arrowExpression;
	      }
	      if ((_jsx3 = jsx) != null && _jsx3.thrown) throw jsx.error;
	      if (arrow.thrown) throw arrow.error;
	      throw this.raise(FlowErrors.UnexpectedTokenAfterTypeParameter, typeParameters);
	    }
	    return super.parseMaybeAssign(refExpressionErrors, afterLeftParse);
	  }
	  parseArrow(node) {
	    if (this.match(14)) {
	      const result = this.tryParse(() => {
	        const oldNoAnonFunctionType = this.state.noAnonFunctionType;
	        this.state.noAnonFunctionType = true;
	        const typeNode = this.startNode();
	        [typeNode.typeAnnotation, node.predicate] = this.flowParseTypeAndPredicateInitialiser();
	        this.state.noAnonFunctionType = oldNoAnonFunctionType;
	        if (this.canInsertSemicolon()) this.unexpected();
	        if (!this.match(19)) this.unexpected();
	        return typeNode;
	      });
	      if (result.thrown) return null;
	      if (result.error) this.state = result.failState;
	      node.returnType = result.node.typeAnnotation ? this.finishNode(result.node, "TypeAnnotation") : null;
	    }
	    return super.parseArrow(node);
	  }
	  shouldParseArrow(params) {
	    return this.match(14) || super.shouldParseArrow(params);
	  }
	  setArrowFunctionParameters(node, params) {
	    if (this.state.noArrowParamsConversionAt.includes(this.offsetToSourcePos(node.start))) {
	      node.params = params;
	    } else {
	      super.setArrowFunctionParameters(node, params);
	    }
	  }
	  checkParams(node, allowDuplicates, isArrowFunction, strictModeChanged = true) {
	    if (isArrowFunction && this.state.noArrowParamsConversionAt.includes(this.offsetToSourcePos(node.start))) {
	      return;
	    }
	    for (let i = 0; i < node.params.length; i++) {
	      if (this.isThisParam(node.params[i]) && i > 0) {
	        this.raise(FlowErrors.ThisParamMustBeFirst, node.params[i]);
	      }
	    }
	    super.checkParams(node, allowDuplicates, isArrowFunction, strictModeChanged);
	  }
	  parseParenAndDistinguishExpression(canBeArrow) {
	    return super.parseParenAndDistinguishExpression(canBeArrow && !this.state.noArrowAt.includes(this.sourceToOffsetPos(this.state.start)));
	  }
	  parseSubscripts(base, startLoc, noCalls) {
	    if (base.type === "Identifier" && base.name === "async" && this.state.noArrowAt.includes(startLoc.index)) {
	      this.next();
	      const node = this.startNodeAt(startLoc);
	      node.callee = base;
	      node.arguments = super.parseCallExpressionArguments(11);
	      base = this.finishNode(node, "CallExpression");
	    } else if (base.type === "Identifier" && base.name === "async" && this.match(47)) {
	      const state = this.state.clone();
	      const arrow = this.tryParse(abort => this.parseAsyncArrowWithTypeParameters(startLoc) || abort(), state);
	      if (!arrow.error && !arrow.aborted) return arrow.node;
	      const result = this.tryParse(() => super.parseSubscripts(base, startLoc, noCalls), state);
	      if (result.node && !result.error) return result.node;
	      if (arrow.node) {
	        this.state = arrow.failState;
	        return arrow.node;
	      }
	      if (result.node) {
	        this.state = result.failState;
	        return result.node;
	      }
	      throw arrow.error || result.error;
	    }
	    return super.parseSubscripts(base, startLoc, noCalls);
	  }
	  parseSubscript(base, startLoc, noCalls, subscriptState) {
	    if (this.match(18) && this.isLookaheadToken_lt()) {
	      subscriptState.optionalChainMember = true;
	      if (noCalls) {
	        subscriptState.stop = true;
	        return base;
	      }
	      this.next();
	      const node = this.startNodeAt(startLoc);
	      node.callee = base;
	      node.typeArguments = this.flowParseTypeParameterInstantiationInExpression();
	      this.expect(10);
	      node.arguments = this.parseCallExpressionArguments(11);
	      node.optional = true;
	      return this.finishCallExpression(node, true);
	    } else if (!noCalls && this.shouldParseTypes() && (this.match(47) || this.match(51))) {
	      const node = this.startNodeAt(startLoc);
	      node.callee = base;
	      const result = this.tryParse(() => {
	        node.typeArguments = this.flowParseTypeParameterInstantiationCallOrNew();
	        this.expect(10);
	        node.arguments = super.parseCallExpressionArguments(11);
	        if (subscriptState.optionalChainMember) {
	          node.optional = false;
	        }
	        return this.finishCallExpression(node, subscriptState.optionalChainMember);
	      });
	      if (result.node) {
	        if (result.error) this.state = result.failState;
	        return result.node;
	      }
	    }
	    return super.parseSubscript(base, startLoc, noCalls, subscriptState);
	  }
	  parseNewCallee(node) {
	    super.parseNewCallee(node);
	    let targs = null;
	    if (this.shouldParseTypes() && this.match(47)) {
	      targs = this.tryParse(() => this.flowParseTypeParameterInstantiationCallOrNew()).node;
	    }
	    node.typeArguments = targs;
	  }
	  parseAsyncArrowWithTypeParameters(startLoc) {
	    const node = this.startNodeAt(startLoc);
	    this.parseFunctionParams(node, false);
	    if (!this.parseArrow(node)) return;
	    return super.parseArrowExpression(node, undefined, true);
	  }
	  readToken_mult_modulo(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    if (code === 42 && next === 47 && this.state.hasFlowComment) {
	      this.state.hasFlowComment = false;
	      this.state.pos += 2;
	      this.nextToken();
	      return;
	    }
	    super.readToken_mult_modulo(code);
	  }
	  readToken_pipe_amp(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    if (code === 124 && next === 125) {
	      this.finishOp(9, 2);
	      return;
	    }
	    super.readToken_pipe_amp(code);
	  }
	  parseTopLevel(file, program) {
	    const fileNode = super.parseTopLevel(file, program);
	    if (this.state.hasFlowComment) {
	      this.raise(FlowErrors.UnterminatedFlowComment, this.state.curPosition());
	    }
	    return fileNode;
	  }
	  skipBlockComment() {
	    if (this.hasPlugin("flowComments") && this.skipFlowComment()) {
	      if (this.state.hasFlowComment) {
	        throw this.raise(FlowErrors.NestedFlowComment, this.state.startLoc);
	      }
	      this.hasFlowCommentCompletion();
	      const commentSkip = this.skipFlowComment();
	      if (commentSkip) {
	        this.state.pos += commentSkip;
	        this.state.hasFlowComment = true;
	      }
	      return;
	    }
	    return super.skipBlockComment(this.state.hasFlowComment ? "*-/" : "*/");
	  }
	  skipFlowComment() {
	    const {
	      pos
	    } = this.state;
	    let shiftToFirstNonWhiteSpace = 2;
	    while ([32, 9].includes(this.input.charCodeAt(pos + shiftToFirstNonWhiteSpace))) {
	      shiftToFirstNonWhiteSpace++;
	    }
	    const ch2 = this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos);
	    const ch3 = this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos + 1);
	    if (ch2 === 58 && ch3 === 58) {
	      return shiftToFirstNonWhiteSpace + 2;
	    }
	    if (this.input.slice(shiftToFirstNonWhiteSpace + pos, shiftToFirstNonWhiteSpace + pos + 12) === "flow-include") {
	      return shiftToFirstNonWhiteSpace + 12;
	    }
	    if (ch2 === 58 && ch3 !== 58) {
	      return shiftToFirstNonWhiteSpace;
	    }
	    return false;
	  }
	  hasFlowCommentCompletion() {
	    const end = this.input.indexOf("*/", this.state.pos);
	    if (end === -1) {
	      throw this.raise(Errors.UnterminatedComment, this.state.curPosition());
	    }
	  }
	  flowEnumErrorBooleanMemberNotInitialized(loc, {
	    enumName,
	    memberName
	  }) {
	    this.raise(FlowErrors.EnumBooleanMemberNotInitialized, loc, {
	      memberName,
	      enumName
	    });
	  }
	  flowEnumErrorInvalidMemberInitializer(loc, enumContext) {
	    return this.raise(!enumContext.explicitType ? FlowErrors.EnumInvalidMemberInitializerUnknownType : enumContext.explicitType === "symbol" ? FlowErrors.EnumInvalidMemberInitializerSymbolType : FlowErrors.EnumInvalidMemberInitializerPrimaryType, loc, enumContext);
	  }
	  flowEnumErrorNumberMemberNotInitialized(loc, details) {
	    this.raise(FlowErrors.EnumNumberMemberNotInitialized, loc, details);
	  }
	  flowEnumErrorStringMemberInconsistentlyInitialized(node, details) {
	    this.raise(FlowErrors.EnumStringMemberInconsistentlyInitialized, node, details);
	  }
	  flowEnumMemberInit() {
	    const startLoc = this.state.startLoc;
	    const endOfInit = () => this.match(12) || this.match(8);
	    switch (this.state.type) {
	      case 135:
	        {
	          const literal = this.parseNumericLiteral(this.state.value);
	          if (endOfInit()) {
	            return {
	              type: "number",
	              loc: literal.loc.start,
	              value: literal
	            };
	          }
	          return {
	            type: "invalid",
	            loc: startLoc
	          };
	        }
	      case 134:
	        {
	          const literal = this.parseStringLiteral(this.state.value);
	          if (endOfInit()) {
	            return {
	              type: "string",
	              loc: literal.loc.start,
	              value: literal
	            };
	          }
	          return {
	            type: "invalid",
	            loc: startLoc
	          };
	        }
	      case 85:
	      case 86:
	        {
	          const literal = this.parseBooleanLiteral(this.match(85));
	          if (endOfInit()) {
	            return {
	              type: "boolean",
	              loc: literal.loc.start,
	              value: literal
	            };
	          }
	          return {
	            type: "invalid",
	            loc: startLoc
	          };
	        }
	      default:
	        return {
	          type: "invalid",
	          loc: startLoc
	        };
	    }
	  }
	  flowEnumMemberRaw() {
	    const loc = this.state.startLoc;
	    const id = this.parseIdentifier(true);
	    const init = this.eat(29) ? this.flowEnumMemberInit() : {
	      type: "none",
	      loc
	    };
	    return {
	      id,
	      init
	    };
	  }
	  flowEnumCheckExplicitTypeMismatch(loc, context, expectedType) {
	    const {
	      explicitType
	    } = context;
	    if (explicitType === null) {
	      return;
	    }
	    if (explicitType !== expectedType) {
	      this.flowEnumErrorInvalidMemberInitializer(loc, context);
	    }
	  }
	  flowEnumMembers({
	    enumName,
	    explicitType
	  }) {
	    const seenNames = new Set();
	    const members = {
	      booleanMembers: [],
	      numberMembers: [],
	      stringMembers: [],
	      defaultedMembers: []
	    };
	    let hasUnknownMembers = false;
	    while (!this.match(8)) {
	      if (this.eat(21)) {
	        hasUnknownMembers = true;
	        break;
	      }
	      const memberNode = this.startNode();
	      const {
	        id,
	        init
	      } = this.flowEnumMemberRaw();
	      const memberName = id.name;
	      if (memberName === "") {
	        continue;
	      }
	      if (/^[a-z]/.test(memberName)) {
	        this.raise(FlowErrors.EnumInvalidMemberName, id, {
	          memberName,
	          suggestion: memberName[0].toUpperCase() + memberName.slice(1),
	          enumName
	        });
	      }
	      if (seenNames.has(memberName)) {
	        this.raise(FlowErrors.EnumDuplicateMemberName, id, {
	          memberName,
	          enumName
	        });
	      }
	      seenNames.add(memberName);
	      const context = {
	        enumName,
	        explicitType,
	        memberName
	      };
	      memberNode.id = id;
	      switch (init.type) {
	        case "boolean":
	          {
	            this.flowEnumCheckExplicitTypeMismatch(init.loc, context, "boolean");
	            memberNode.init = init.value;
	            members.booleanMembers.push(this.finishNode(memberNode, "EnumBooleanMember"));
	            break;
	          }
	        case "number":
	          {
	            this.flowEnumCheckExplicitTypeMismatch(init.loc, context, "number");
	            memberNode.init = init.value;
	            members.numberMembers.push(this.finishNode(memberNode, "EnumNumberMember"));
	            break;
	          }
	        case "string":
	          {
	            this.flowEnumCheckExplicitTypeMismatch(init.loc, context, "string");
	            memberNode.init = init.value;
	            members.stringMembers.push(this.finishNode(memberNode, "EnumStringMember"));
	            break;
	          }
	        case "invalid":
	          {
	            throw this.flowEnumErrorInvalidMemberInitializer(init.loc, context);
	          }
	        case "none":
	          {
	            switch (explicitType) {
	              case "boolean":
	                this.flowEnumErrorBooleanMemberNotInitialized(init.loc, context);
	                break;
	              case "number":
	                this.flowEnumErrorNumberMemberNotInitialized(init.loc, context);
	                break;
	              default:
	                members.defaultedMembers.push(this.finishNode(memberNode, "EnumDefaultedMember"));
	            }
	          }
	      }
	      if (!this.match(8)) {
	        this.expect(12);
	      }
	    }
	    return {
	      members,
	      hasUnknownMembers
	    };
	  }
	  flowEnumStringMembers(initializedMembers, defaultedMembers, {
	    enumName
	  }) {
	    if (initializedMembers.length === 0) {
	      return defaultedMembers;
	    } else if (defaultedMembers.length === 0) {
	      return initializedMembers;
	    } else if (defaultedMembers.length > initializedMembers.length) {
	      for (const member of initializedMembers) {
	        this.flowEnumErrorStringMemberInconsistentlyInitialized(member, {
	          enumName
	        });
	      }
	      return defaultedMembers;
	    } else {
	      for (const member of defaultedMembers) {
	        this.flowEnumErrorStringMemberInconsistentlyInitialized(member, {
	          enumName
	        });
	      }
	      return initializedMembers;
	    }
	  }
	  flowEnumParseExplicitType({
	    enumName
	  }) {
	    if (!this.eatContextual(102)) return null;
	    if (!tokenIsIdentifier(this.state.type)) {
	      throw this.raise(FlowErrors.EnumInvalidExplicitTypeUnknownSupplied, this.state.startLoc, {
	        enumName
	      });
	    }
	    const {
	      value
	    } = this.state;
	    this.next();
	    if (value !== "boolean" && value !== "number" && value !== "string" && value !== "symbol") {
	      this.raise(FlowErrors.EnumInvalidExplicitType, this.state.startLoc, {
	        enumName,
	        invalidEnumType: value
	      });
	    }
	    return value;
	  }
	  flowEnumBody(node, id) {
	    const enumName = id.name;
	    const nameLoc = id.loc.start;
	    const explicitType = this.flowEnumParseExplicitType({
	      enumName
	    });
	    this.expect(5);
	    const {
	      members,
	      hasUnknownMembers
	    } = this.flowEnumMembers({
	      enumName,
	      explicitType
	    });
	    node.hasUnknownMembers = hasUnknownMembers;
	    switch (explicitType) {
	      case "boolean":
	        node.explicitType = true;
	        node.members = members.booleanMembers;
	        this.expect(8);
	        return this.finishNode(node, "EnumBooleanBody");
	      case "number":
	        node.explicitType = true;
	        node.members = members.numberMembers;
	        this.expect(8);
	        return this.finishNode(node, "EnumNumberBody");
	      case "string":
	        node.explicitType = true;
	        node.members = this.flowEnumStringMembers(members.stringMembers, members.defaultedMembers, {
	          enumName
	        });
	        this.expect(8);
	        return this.finishNode(node, "EnumStringBody");
	      case "symbol":
	        node.members = members.defaultedMembers;
	        this.expect(8);
	        return this.finishNode(node, "EnumSymbolBody");
	      default:
	        {
	          const empty = () => {
	            node.members = [];
	            this.expect(8);
	            return this.finishNode(node, "EnumStringBody");
	          };
	          node.explicitType = false;
	          const boolsLen = members.booleanMembers.length;
	          const numsLen = members.numberMembers.length;
	          const strsLen = members.stringMembers.length;
	          const defaultedLen = members.defaultedMembers.length;
	          if (!boolsLen && !numsLen && !strsLen && !defaultedLen) {
	            return empty();
	          } else if (!boolsLen && !numsLen) {
	            node.members = this.flowEnumStringMembers(members.stringMembers, members.defaultedMembers, {
	              enumName
	            });
	            this.expect(8);
	            return this.finishNode(node, "EnumStringBody");
	          } else if (!numsLen && !strsLen && boolsLen >= defaultedLen) {
	            for (const member of members.defaultedMembers) {
	              this.flowEnumErrorBooleanMemberNotInitialized(member.loc.start, {
	                enumName,
	                memberName: member.id.name
	              });
	            }
	            node.members = members.booleanMembers;
	            this.expect(8);
	            return this.finishNode(node, "EnumBooleanBody");
	          } else if (!boolsLen && !strsLen && numsLen >= defaultedLen) {
	            for (const member of members.defaultedMembers) {
	              this.flowEnumErrorNumberMemberNotInitialized(member.loc.start, {
	                enumName,
	                memberName: member.id.name
	              });
	            }
	            node.members = members.numberMembers;
	            this.expect(8);
	            return this.finishNode(node, "EnumNumberBody");
	          } else {
	            this.raise(FlowErrors.EnumInconsistentMemberValues, nameLoc, {
	              enumName
	            });
	            return empty();
	          }
	        }
	    }
	  }
	  flowParseEnumDeclaration(node) {
	    const id = this.parseIdentifier();
	    node.id = id;
	    node.body = this.flowEnumBody(this.startNode(), id);
	    return this.finishNode(node, "EnumDeclaration");
	  }
	  jsxParseOpeningElementAfterName(node) {
	    if (this.shouldParseTypes()) {
	      if (this.match(47) || this.match(51)) {
	        node.typeArguments = this.flowParseTypeParameterInstantiationInExpression();
	      }
	    }
	    return super.jsxParseOpeningElementAfterName(node);
	  }
	  isLookaheadToken_lt() {
	    const next = this.nextTokenStart();
	    if (this.input.charCodeAt(next) === 60) {
	      const afterNext = this.input.charCodeAt(next + 1);
	      return afterNext !== 60 && afterNext !== 61;
	    }
	    return false;
	  }
	  reScan_lt_gt() {
	    const {
	      type
	    } = this.state;
	    if (type === 47) {
	      this.state.pos -= 1;
	      this.readToken_lt();
	    } else if (type === 48) {
	      this.state.pos -= 1;
	      this.readToken_gt();
	    }
	  }
	  reScan_lt() {
	    const {
	      type
	    } = this.state;
	    if (type === 51) {
	      this.state.pos -= 2;
	      this.finishOp(47, 1);
	      return 47;
	    }
	    return type;
	  }
	  maybeUnwrapTypeCastExpression(node) {
	    return node.type === "TypeCastExpression" ? node.expression : node;
	  }
	};
	const entities = {
	  __proto__: null,
	  quot: "\u0022",
	  amp: "&",
	  apos: "\u0027",
	  lt: "<",
	  gt: ">",
	  nbsp: "\u00A0",
	  iexcl: "\u00A1",
	  cent: "\u00A2",
	  pound: "\u00A3",
	  curren: "\u00A4",
	  yen: "\u00A5",
	  brvbar: "\u00A6",
	  sect: "\u00A7",
	  uml: "\u00A8",
	  copy: "\u00A9",
	  ordf: "\u00AA",
	  laquo: "\u00AB",
	  not: "\u00AC",
	  shy: "\u00AD",
	  reg: "\u00AE",
	  macr: "\u00AF",
	  deg: "\u00B0",
	  plusmn: "\u00B1",
	  sup2: "\u00B2",
	  sup3: "\u00B3",
	  acute: "\u00B4",
	  micro: "\u00B5",
	  para: "\u00B6",
	  middot: "\u00B7",
	  cedil: "\u00B8",
	  sup1: "\u00B9",
	  ordm: "\u00BA",
	  raquo: "\u00BB",
	  frac14: "\u00BC",
	  frac12: "\u00BD",
	  frac34: "\u00BE",
	  iquest: "\u00BF",
	  Agrave: "\u00C0",
	  Aacute: "\u00C1",
	  Acirc: "\u00C2",
	  Atilde: "\u00C3",
	  Auml: "\u00C4",
	  Aring: "\u00C5",
	  AElig: "\u00C6",
	  Ccedil: "\u00C7",
	  Egrave: "\u00C8",
	  Eacute: "\u00C9",
	  Ecirc: "\u00CA",
	  Euml: "\u00CB",
	  Igrave: "\u00CC",
	  Iacute: "\u00CD",
	  Icirc: "\u00CE",
	  Iuml: "\u00CF",
	  ETH: "\u00D0",
	  Ntilde: "\u00D1",
	  Ograve: "\u00D2",
	  Oacute: "\u00D3",
	  Ocirc: "\u00D4",
	  Otilde: "\u00D5",
	  Ouml: "\u00D6",
	  times: "\u00D7",
	  Oslash: "\u00D8",
	  Ugrave: "\u00D9",
	  Uacute: "\u00DA",
	  Ucirc: "\u00DB",
	  Uuml: "\u00DC",
	  Yacute: "\u00DD",
	  THORN: "\u00DE",
	  szlig: "\u00DF",
	  agrave: "\u00E0",
	  aacute: "\u00E1",
	  acirc: "\u00E2",
	  atilde: "\u00E3",
	  auml: "\u00E4",
	  aring: "\u00E5",
	  aelig: "\u00E6",
	  ccedil: "\u00E7",
	  egrave: "\u00E8",
	  eacute: "\u00E9",
	  ecirc: "\u00EA",
	  euml: "\u00EB",
	  igrave: "\u00EC",
	  iacute: "\u00ED",
	  icirc: "\u00EE",
	  iuml: "\u00EF",
	  eth: "\u00F0",
	  ntilde: "\u00F1",
	  ograve: "\u00F2",
	  oacute: "\u00F3",
	  ocirc: "\u00F4",
	  otilde: "\u00F5",
	  ouml: "\u00F6",
	  divide: "\u00F7",
	  oslash: "\u00F8",
	  ugrave: "\u00F9",
	  uacute: "\u00FA",
	  ucirc: "\u00FB",
	  uuml: "\u00FC",
	  yacute: "\u00FD",
	  thorn: "\u00FE",
	  yuml: "\u00FF",
	  OElig: "\u0152",
	  oelig: "\u0153",
	  Scaron: "\u0160",
	  scaron: "\u0161",
	  Yuml: "\u0178",
	  fnof: "\u0192",
	  circ: "\u02C6",
	  tilde: "\u02DC",
	  Alpha: "\u0391",
	  Beta: "\u0392",
	  Gamma: "\u0393",
	  Delta: "\u0394",
	  Epsilon: "\u0395",
	  Zeta: "\u0396",
	  Eta: "\u0397",
	  Theta: "\u0398",
	  Iota: "\u0399",
	  Kappa: "\u039A",
	  Lambda: "\u039B",
	  Mu: "\u039C",
	  Nu: "\u039D",
	  Xi: "\u039E",
	  Omicron: "\u039F",
	  Pi: "\u03A0",
	  Rho: "\u03A1",
	  Sigma: "\u03A3",
	  Tau: "\u03A4",
	  Upsilon: "\u03A5",
	  Phi: "\u03A6",
	  Chi: "\u03A7",
	  Psi: "\u03A8",
	  Omega: "\u03A9",
	  alpha: "\u03B1",
	  beta: "\u03B2",
	  gamma: "\u03B3",
	  delta: "\u03B4",
	  epsilon: "\u03B5",
	  zeta: "\u03B6",
	  eta: "\u03B7",
	  theta: "\u03B8",
	  iota: "\u03B9",
	  kappa: "\u03BA",
	  lambda: "\u03BB",
	  mu: "\u03BC",
	  nu: "\u03BD",
	  xi: "\u03BE",
	  omicron: "\u03BF",
	  pi: "\u03C0",
	  rho: "\u03C1",
	  sigmaf: "\u03C2",
	  sigma: "\u03C3",
	  tau: "\u03C4",
	  upsilon: "\u03C5",
	  phi: "\u03C6",
	  chi: "\u03C7",
	  psi: "\u03C8",
	  omega: "\u03C9",
	  thetasym: "\u03D1",
	  upsih: "\u03D2",
	  piv: "\u03D6",
	  ensp: "\u2002",
	  emsp: "\u2003",
	  thinsp: "\u2009",
	  zwnj: "\u200C",
	  zwj: "\u200D",
	  lrm: "\u200E",
	  rlm: "\u200F",
	  ndash: "\u2013",
	  mdash: "\u2014",
	  lsquo: "\u2018",
	  rsquo: "\u2019",
	  sbquo: "\u201A",
	  ldquo: "\u201C",
	  rdquo: "\u201D",
	  bdquo: "\u201E",
	  dagger: "\u2020",
	  Dagger: "\u2021",
	  bull: "\u2022",
	  hellip: "\u2026",
	  permil: "\u2030",
	  prime: "\u2032",
	  Prime: "\u2033",
	  lsaquo: "\u2039",
	  rsaquo: "\u203A",
	  oline: "\u203E",
	  frasl: "\u2044",
	  euro: "\u20AC",
	  image: "\u2111",
	  weierp: "\u2118",
	  real: "\u211C",
	  trade: "\u2122",
	  alefsym: "\u2135",
	  larr: "\u2190",
	  uarr: "\u2191",
	  rarr: "\u2192",
	  darr: "\u2193",
	  harr: "\u2194",
	  crarr: "\u21B5",
	  lArr: "\u21D0",
	  uArr: "\u21D1",
	  rArr: "\u21D2",
	  dArr: "\u21D3",
	  hArr: "\u21D4",
	  forall: "\u2200",
	  part: "\u2202",
	  exist: "\u2203",
	  empty: "\u2205",
	  nabla: "\u2207",
	  isin: "\u2208",
	  notin: "\u2209",
	  ni: "\u220B",
	  prod: "\u220F",
	  sum: "\u2211",
	  minus: "\u2212",
	  lowast: "\u2217",
	  radic: "\u221A",
	  prop: "\u221D",
	  infin: "\u221E",
	  ang: "\u2220",
	  and: "\u2227",
	  or: "\u2228",
	  cap: "\u2229",
	  cup: "\u222A",
	  int: "\u222B",
	  there4: "\u2234",
	  sim: "\u223C",
	  cong: "\u2245",
	  asymp: "\u2248",
	  ne: "\u2260",
	  equiv: "\u2261",
	  le: "\u2264",
	  ge: "\u2265",
	  sub: "\u2282",
	  sup: "\u2283",
	  nsub: "\u2284",
	  sube: "\u2286",
	  supe: "\u2287",
	  oplus: "\u2295",
	  otimes: "\u2297",
	  perp: "\u22A5",
	  sdot: "\u22C5",
	  lceil: "\u2308",
	  rceil: "\u2309",
	  lfloor: "\u230A",
	  rfloor: "\u230B",
	  lang: "\u2329",
	  rang: "\u232A",
	  loz: "\u25CA",
	  spades: "\u2660",
	  clubs: "\u2663",
	  hearts: "\u2665",
	  diams: "\u2666"
	};
	const lineBreak = /\r\n|[\r\n\u2028\u2029]/;
	const lineBreakG = new RegExp(lineBreak.source, "g");
	function isNewLine(code) {
	  switch (code) {
	    case 10:
	    case 13:
	    case 8232:
	    case 8233:
	      return true;
	    default:
	      return false;
	  }
	}
	function hasNewLine(input, start, end) {
	  for (let i = start; i < end; i++) {
	    if (isNewLine(input.charCodeAt(i))) {
	      return true;
	    }
	  }
	  return false;
	}
	const skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
	const skipWhiteSpaceInLine = /(?:[^\S\n\r\u2028\u2029]|\/\/.*|\/\*.*?\*\/)*/g;
	function isWhitespace(code) {
	  switch (code) {
	    case 0x0009:
	    case 0x000b:
	    case 0x000c:
	    case 32:
	    case 160:
	    case 5760:
	    case 0x2000:
	    case 0x2001:
	    case 0x2002:
	    case 0x2003:
	    case 0x2004:
	    case 0x2005:
	    case 0x2006:
	    case 0x2007:
	    case 0x2008:
	    case 0x2009:
	    case 0x200a:
	    case 0x202f:
	    case 0x205f:
	    case 0x3000:
	    case 0xfeff:
	      return true;
	    default:
	      return false;
	  }
	}
	const JsxErrors = ParseErrorEnum`jsx`({
	  AttributeIsEmpty: "JSX attributes must only be assigned a non-empty expression.",
	  MissingClosingTagElement: ({
	    openingTagName
	  }) => `Expected corresponding JSX closing tag for <${openingTagName}>.`,
	  MissingClosingTagFragment: "Expected corresponding JSX closing tag for <>.",
	  UnexpectedSequenceExpression: "Sequence expressions cannot be directly nested inside JSX. Did you mean to wrap it in parentheses (...)?",
	  UnexpectedToken: ({
	    unexpected,
	    HTMLEntity
	  }) => `Unexpected token \`${unexpected}\`. Did you mean \`${HTMLEntity}\` or \`{'${unexpected}'}\`?`,
	  UnsupportedJsxValue: "JSX value should be either an expression or a quoted JSX text.",
	  UnterminatedJsxContent: "Unterminated JSX contents.",
	  UnwrappedAdjacentJSXElements: "Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?"
	});
	function isFragment(object) {
	  return object ? object.type === "JSXOpeningFragment" || object.type === "JSXClosingFragment" : false;
	}
	function getQualifiedJSXName(object) {
	  if (object.type === "JSXIdentifier") {
	    return object.name;
	  }
	  if (object.type === "JSXNamespacedName") {
	    return object.namespace.name + ":" + object.name.name;
	  }
	  if (object.type === "JSXMemberExpression") {
	    return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
	  }
	  throw new Error("Node had unexpected type: " + object.type);
	}
	var jsx = superClass => class JSXParserMixin extends superClass {
	  jsxReadToken() {
	    let out = "";
	    let chunkStart = this.state.pos;
	    for (;;) {
	      if (this.state.pos >= this.length) {
	        throw this.raise(JsxErrors.UnterminatedJsxContent, this.state.startLoc);
	      }
	      const ch = this.input.charCodeAt(this.state.pos);
	      switch (ch) {
	        case 60:
	        case 123:
	          if (this.state.pos === this.state.start) {
	            if (ch === 60 && this.state.canStartJSXElement) {
	              ++this.state.pos;
	              this.finishToken(143);
	            } else {
	              super.getTokenFromCode(ch);
	            }
	            return;
	          }
	          out += this.input.slice(chunkStart, this.state.pos);
	          this.finishToken(142, out);
	          return;
	        case 38:
	          out += this.input.slice(chunkStart, this.state.pos);
	          out += this.jsxReadEntity();
	          chunkStart = this.state.pos;
	          break;
	        case 62:
	        case 125:
	        default:
	          if (isNewLine(ch)) {
	            out += this.input.slice(chunkStart, this.state.pos);
	            out += this.jsxReadNewLine(true);
	            chunkStart = this.state.pos;
	          } else {
	            ++this.state.pos;
	          }
	      }
	    }
	  }
	  jsxReadNewLine(normalizeCRLF) {
	    const ch = this.input.charCodeAt(this.state.pos);
	    let out;
	    ++this.state.pos;
	    if (ch === 13 && this.input.charCodeAt(this.state.pos) === 10) {
	      ++this.state.pos;
	      out = normalizeCRLF ? "\n" : "\r\n";
	    } else {
	      out = String.fromCharCode(ch);
	    }
	    ++this.state.curLine;
	    this.state.lineStart = this.state.pos;
	    return out;
	  }
	  jsxReadString(quote) {
	    let out = "";
	    let chunkStart = ++this.state.pos;
	    for (;;) {
	      if (this.state.pos >= this.length) {
	        throw this.raise(Errors.UnterminatedString, this.state.startLoc);
	      }
	      const ch = this.input.charCodeAt(this.state.pos);
	      if (ch === quote) break;
	      if (ch === 38) {
	        out += this.input.slice(chunkStart, this.state.pos);
	        out += this.jsxReadEntity();
	        chunkStart = this.state.pos;
	      } else if (isNewLine(ch)) {
	        out += this.input.slice(chunkStart, this.state.pos);
	        out += this.jsxReadNewLine(false);
	        chunkStart = this.state.pos;
	      } else {
	        ++this.state.pos;
	      }
	    }
	    out += this.input.slice(chunkStart, this.state.pos++);
	    this.finishToken(134, out);
	  }
	  jsxReadEntity() {
	    const startPos = ++this.state.pos;
	    if (this.codePointAtPos(this.state.pos) === 35) {
	      ++this.state.pos;
	      let radix = 10;
	      if (this.codePointAtPos(this.state.pos) === 120) {
	        radix = 16;
	        ++this.state.pos;
	      }
	      const codePoint = this.readInt(radix, undefined, false, "bail");
	      if (codePoint !== null && this.codePointAtPos(this.state.pos) === 59) {
	        ++this.state.pos;
	        return String.fromCodePoint(codePoint);
	      }
	    } else {
	      let count = 0;
	      let semi = false;
	      while (count++ < 10 && this.state.pos < this.length && !(semi = this.codePointAtPos(this.state.pos) === 59)) {
	        ++this.state.pos;
	      }
	      if (semi) {
	        const desc = this.input.slice(startPos, this.state.pos);
	        const entity = entities[desc];
	        ++this.state.pos;
	        if (entity) {
	          return entity;
	        }
	      }
	    }
	    this.state.pos = startPos;
	    return "&";
	  }
	  jsxReadWord() {
	    let ch;
	    const start = this.state.pos;
	    do {
	      ch = this.input.charCodeAt(++this.state.pos);
	    } while (isIdentifierChar(ch) || ch === 45);
	    this.finishToken(141, this.input.slice(start, this.state.pos));
	  }
	  jsxParseIdentifier() {
	    const node = this.startNode();
	    if (this.match(141)) {
	      node.name = this.state.value;
	    } else if (tokenIsKeyword(this.state.type)) {
	      node.name = tokenLabelName(this.state.type);
	    } else {
	      this.unexpected();
	    }
	    this.next();
	    return this.finishNode(node, "JSXIdentifier");
	  }
	  jsxParseNamespacedName() {
	    const startLoc = this.state.startLoc;
	    const name = this.jsxParseIdentifier();
	    if (!this.eat(14)) return name;
	    const node = this.startNodeAt(startLoc);
	    node.namespace = name;
	    node.name = this.jsxParseIdentifier();
	    return this.finishNode(node, "JSXNamespacedName");
	  }
	  jsxParseElementName() {
	    const startLoc = this.state.startLoc;
	    let node = this.jsxParseNamespacedName();
	    if (node.type === "JSXNamespacedName") {
	      return node;
	    }
	    while (this.eat(16)) {
	      const newNode = this.startNodeAt(startLoc);
	      newNode.object = node;
	      newNode.property = this.jsxParseIdentifier();
	      node = this.finishNode(newNode, "JSXMemberExpression");
	    }
	    return node;
	  }
	  jsxParseAttributeValue() {
	    let node;
	    switch (this.state.type) {
	      case 5:
	        node = this.startNode();
	        this.setContext(types.brace);
	        this.next();
	        node = this.jsxParseExpressionContainer(node, types.j_oTag);
	        if (node.expression.type === "JSXEmptyExpression") {
	          this.raise(JsxErrors.AttributeIsEmpty, node);
	        }
	        return node;
	      case 143:
	      case 134:
	        return this.parseExprAtom();
	      default:
	        throw this.raise(JsxErrors.UnsupportedJsxValue, this.state.startLoc);
	    }
	  }
	  jsxParseEmptyExpression() {
	    const node = this.startNodeAt(this.state.lastTokEndLoc);
	    return this.finishNodeAt(node, "JSXEmptyExpression", this.state.startLoc);
	  }
	  jsxParseSpreadChild(node) {
	    this.next();
	    node.expression = this.parseExpression();
	    this.setContext(types.j_expr);
	    this.state.canStartJSXElement = true;
	    this.expect(8);
	    return this.finishNode(node, "JSXSpreadChild");
	  }
	  jsxParseExpressionContainer(node, previousContext) {
	    if (this.match(8)) {
	      node.expression = this.jsxParseEmptyExpression();
	    } else {
	      const expression = this.parseExpression();
	      node.expression = expression;
	    }
	    this.setContext(previousContext);
	    this.state.canStartJSXElement = true;
	    this.expect(8);
	    return this.finishNode(node, "JSXExpressionContainer");
	  }
	  jsxParseAttribute() {
	    const node = this.startNode();
	    if (this.match(5)) {
	      this.setContext(types.brace);
	      this.next();
	      this.expect(21);
	      node.argument = this.parseMaybeAssignAllowIn();
	      this.setContext(types.j_oTag);
	      this.state.canStartJSXElement = true;
	      this.expect(8);
	      return this.finishNode(node, "JSXSpreadAttribute");
	    }
	    node.name = this.jsxParseNamespacedName();
	    node.value = this.eat(29) ? this.jsxParseAttributeValue() : null;
	    return this.finishNode(node, "JSXAttribute");
	  }
	  jsxParseOpeningElementAt(startLoc) {
	    const node = this.startNodeAt(startLoc);
	    if (this.eat(144)) {
	      return this.finishNode(node, "JSXOpeningFragment");
	    }
	    node.name = this.jsxParseElementName();
	    return this.jsxParseOpeningElementAfterName(node);
	  }
	  jsxParseOpeningElementAfterName(node) {
	    const attributes = [];
	    while (!this.match(56) && !this.match(144)) {
	      attributes.push(this.jsxParseAttribute());
	    }
	    node.attributes = attributes;
	    node.selfClosing = this.eat(56);
	    this.expect(144);
	    return this.finishNode(node, "JSXOpeningElement");
	  }
	  jsxParseClosingElementAt(startLoc) {
	    const node = this.startNodeAt(startLoc);
	    if (this.eat(144)) {
	      return this.finishNode(node, "JSXClosingFragment");
	    }
	    node.name = this.jsxParseElementName();
	    this.expect(144);
	    return this.finishNode(node, "JSXClosingElement");
	  }
	  jsxParseElementAt(startLoc) {
	    const node = this.startNodeAt(startLoc);
	    const children = [];
	    const openingElement = this.jsxParseOpeningElementAt(startLoc);
	    let closingElement = null;
	    if (!openingElement.selfClosing) {
	      contents: for (;;) {
	        switch (this.state.type) {
	          case 143:
	            startLoc = this.state.startLoc;
	            this.next();
	            if (this.eat(56)) {
	              closingElement = this.jsxParseClosingElementAt(startLoc);
	              break contents;
	            }
	            children.push(this.jsxParseElementAt(startLoc));
	            break;
	          case 142:
	            children.push(this.parseLiteral(this.state.value, "JSXText"));
	            break;
	          case 5:
	            {
	              const node = this.startNode();
	              this.setContext(types.brace);
	              this.next();
	              if (this.match(21)) {
	                children.push(this.jsxParseSpreadChild(node));
	              } else {
	                children.push(this.jsxParseExpressionContainer(node, types.j_expr));
	              }
	              break;
	            }
	          default:
	            this.unexpected();
	        }
	      }
	      if (isFragment(openingElement) && !isFragment(closingElement) && closingElement !== null) {
	        this.raise(JsxErrors.MissingClosingTagFragment, closingElement);
	      } else if (!isFragment(openingElement) && isFragment(closingElement)) {
	        this.raise(JsxErrors.MissingClosingTagElement, closingElement, {
	          openingTagName: getQualifiedJSXName(openingElement.name)
	        });
	      } else if (!isFragment(openingElement) && !isFragment(closingElement)) {
	        if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
	          this.raise(JsxErrors.MissingClosingTagElement, closingElement, {
	            openingTagName: getQualifiedJSXName(openingElement.name)
	          });
	        }
	      }
	    }
	    if (isFragment(openingElement)) {
	      node.openingFragment = openingElement;
	      node.closingFragment = closingElement;
	    } else {
	      node.openingElement = openingElement;
	      node.closingElement = closingElement;
	    }
	    node.children = children;
	    if (this.match(47)) {
	      throw this.raise(JsxErrors.UnwrappedAdjacentJSXElements, this.state.startLoc);
	    }
	    return isFragment(openingElement) ? this.finishNode(node, "JSXFragment") : this.finishNode(node, "JSXElement");
	  }
	  jsxParseElement() {
	    const startLoc = this.state.startLoc;
	    this.next();
	    return this.jsxParseElementAt(startLoc);
	  }
	  setContext(newContext) {
	    const {
	      context
	    } = this.state;
	    context[context.length - 1] = newContext;
	  }
	  parseExprAtom(refExpressionErrors) {
	    if (this.match(143)) {
	      return this.jsxParseElement();
	    } else if (this.match(47) && this.input.charCodeAt(this.state.pos) !== 33) {
	      this.replaceToken(143);
	      return this.jsxParseElement();
	    } else {
	      return super.parseExprAtom(refExpressionErrors);
	    }
	  }
	  skipSpace() {
	    const curContext = this.curContext();
	    if (!curContext.preserveSpace) super.skipSpace();
	  }
	  getTokenFromCode(code) {
	    const context = this.curContext();
	    if (context === types.j_expr) {
	      this.jsxReadToken();
	      return;
	    }
	    if (context === types.j_oTag || context === types.j_cTag) {
	      if (isIdentifierStart(code)) {
	        this.jsxReadWord();
	        return;
	      }
	      if (code === 62) {
	        ++this.state.pos;
	        this.finishToken(144);
	        return;
	      }
	      if ((code === 34 || code === 39) && context === types.j_oTag) {
	        this.jsxReadString(code);
	        return;
	      }
	    }
	    if (code === 60 && this.state.canStartJSXElement && this.input.charCodeAt(this.state.pos + 1) !== 33) {
	      ++this.state.pos;
	      this.finishToken(143);
	      return;
	    }
	    super.getTokenFromCode(code);
	  }
	  updateContext(prevType) {
	    const {
	      context,
	      type
	    } = this.state;
	    if (type === 56 && prevType === 143) {
	      context.splice(-2, 2, types.j_cTag);
	      this.state.canStartJSXElement = false;
	    } else if (type === 143) {
	      context.push(types.j_oTag);
	    } else if (type === 144) {
	      const out = context[context.length - 1];
	      if (out === types.j_oTag && prevType === 56 || out === types.j_cTag) {
	        context.pop();
	        this.state.canStartJSXElement = context[context.length - 1] === types.j_expr;
	      } else {
	        this.setContext(types.j_expr);
	        this.state.canStartJSXElement = true;
	      }
	    } else {
	      this.state.canStartJSXElement = tokenComesBeforeExpression(type);
	    }
	  }
	};
	class TypeScriptScope extends Scope {
	  constructor(...args) {
	    super(...args);
	    this.tsNames = new Map();
	  }
	}
	class TypeScriptScopeHandler extends ScopeHandler {
	  constructor(...args) {
	    super(...args);
	    this.importsStack = [];
	  }
	  createScope(flags) {
	    this.importsStack.push(new Set());
	    return new TypeScriptScope(flags);
	  }
	  enter(flags) {
	    if (flags === 512) {
	      this.importsStack.push(new Set());
	    }
	    super.enter(flags);
	  }
	  exit() {
	    const flags = super.exit();
	    if (flags === 512) {
	      this.importsStack.pop();
	    }
	    return flags;
	  }
	  hasImport(name, allowShadow) {
	    const len = this.importsStack.length;
	    if (this.importsStack[len - 1].has(name)) {
	      return true;
	    }
	    if (!allowShadow && len > 1) {
	      for (let i = 0; i < len - 1; i++) {
	        if (this.importsStack[i].has(name)) return true;
	      }
	    }
	    return false;
	  }
	  declareName(name, bindingType, loc) {
	    if (bindingType & 4096) {
	      if (this.hasImport(name, true)) {
	        this.parser.raise(Errors.VarRedeclaration, loc, {
	          identifierName: name
	        });
	      }
	      this.importsStack[this.importsStack.length - 1].add(name);
	      return;
	    }
	    const scope = this.currentScope();
	    let type = scope.tsNames.get(name) || 0;
	    if (bindingType & 1024) {
	      this.maybeExportDefined(scope, name);
	      scope.tsNames.set(name, type | 16);
	      return;
	    }
	    super.declareName(name, bindingType, loc);
	    if (bindingType & 2) {
	      if (!(bindingType & 1)) {
	        this.checkRedeclarationInScope(scope, name, bindingType, loc);
	        this.maybeExportDefined(scope, name);
	      }
	      type = type | 1;
	    }
	    if (bindingType & 256) {
	      type = type | 2;
	    }
	    if (bindingType & 512) {
	      type = type | 4;
	    }
	    if (bindingType & 128) {
	      type = type | 8;
	    }
	    if (type) scope.tsNames.set(name, type);
	  }
	  isRedeclaredInScope(scope, name, bindingType) {
	    const type = scope.tsNames.get(name);
	    if ((type & 2) > 0) {
	      if (bindingType & 256) {
	        const isConst = !!(bindingType & 512);
	        const wasConst = (type & 4) > 0;
	        return isConst !== wasConst;
	      }
	      return true;
	    }
	    if (bindingType & 128 && (type & 8) > 0) {
	      if (scope.names.get(name) & 2) {
	        return !!(bindingType & 1);
	      } else {
	        return false;
	      }
	    }
	    if (bindingType & 2 && (type & 1) > 0) {
	      return true;
	    }
	    return super.isRedeclaredInScope(scope, name, bindingType);
	  }
	  checkLocalExport(id) {
	    const {
	      name
	    } = id;
	    if (this.hasImport(name)) return;
	    const len = this.scopeStack.length;
	    for (let i = len - 1; i >= 0; i--) {
	      const scope = this.scopeStack[i];
	      const type = scope.tsNames.get(name);
	      if ((type & 1) > 0 || (type & 16) > 0) {
	        return;
	      }
	    }
	    super.checkLocalExport(id);
	  }
	}
	class ProductionParameterHandler {
	  constructor() {
	    this.stacks = [];
	  }
	  enter(flags) {
	    this.stacks.push(flags);
	  }
	  exit() {
	    this.stacks.pop();
	  }
	  currentFlags() {
	    return this.stacks[this.stacks.length - 1];
	  }
	  get hasAwait() {
	    return (this.currentFlags() & 2) > 0;
	  }
	  get hasYield() {
	    return (this.currentFlags() & 1) > 0;
	  }
	  get hasReturn() {
	    return (this.currentFlags() & 4) > 0;
	  }
	  get hasIn() {
	    return (this.currentFlags() & 8) > 0;
	  }
	}
	function functionFlags(isAsync, isGenerator) {
	  return (isAsync ? 2 : 0) | (isGenerator ? 1 : 0);
	}
	class BaseParser {
	  constructor() {
	    this.sawUnambiguousESM = false;
	    this.ambiguousScriptDifferentAst = false;
	  }
	  sourceToOffsetPos(sourcePos) {
	    return sourcePos + this.startIndex;
	  }
	  offsetToSourcePos(offsetPos) {
	    return offsetPos - this.startIndex;
	  }
	  hasPlugin(pluginConfig) {
	    if (typeof pluginConfig === "string") {
	      return this.plugins.has(pluginConfig);
	    } else {
	      const [pluginName, pluginOptions] = pluginConfig;
	      if (!this.hasPlugin(pluginName)) {
	        return false;
	      }
	      const actualOptions = this.plugins.get(pluginName);
	      for (const key of Object.keys(pluginOptions)) {
	        if ((actualOptions == null ? void 0 : actualOptions[key]) !== pluginOptions[key]) {
	          return false;
	        }
	      }
	      return true;
	    }
	  }
	  getPluginOption(plugin, name) {
	    var _this$plugins$get;
	    return (_this$plugins$get = this.plugins.get(plugin)) == null ? void 0 : _this$plugins$get[name];
	  }
	}
	function setTrailingComments(node, comments) {
	  if (node.trailingComments === undefined) {
	    node.trailingComments = comments;
	  } else {
	    node.trailingComments.unshift(...comments);
	  }
	}
	function setLeadingComments(node, comments) {
	  if (node.leadingComments === undefined) {
	    node.leadingComments = comments;
	  } else {
	    node.leadingComments.unshift(...comments);
	  }
	}
	function setInnerComments(node, comments) {
	  if (node.innerComments === undefined) {
	    node.innerComments = comments;
	  } else {
	    node.innerComments.unshift(...comments);
	  }
	}
	function adjustInnerComments(node, elements, commentWS) {
	  let lastElement = null;
	  let i = elements.length;
	  while (lastElement === null && i > 0) {
	    lastElement = elements[--i];
	  }
	  if (lastElement === null || lastElement.start > commentWS.start) {
	    setInnerComments(node, commentWS.comments);
	  } else {
	    setTrailingComments(lastElement, commentWS.comments);
	  }
	}
	class CommentsParser extends BaseParser {
	  addComment(comment) {
	    if (this.filename) comment.loc.filename = this.filename;
	    const {
	      commentsLen
	    } = this.state;
	    if (this.comments.length !== commentsLen) {
	      this.comments.length = commentsLen;
	    }
	    this.comments.push(comment);
	    this.state.commentsLen++;
	  }
	  processComment(node) {
	    const {
	      commentStack
	    } = this.state;
	    const commentStackLength = commentStack.length;
	    if (commentStackLength === 0) return;
	    let i = commentStackLength - 1;
	    const lastCommentWS = commentStack[i];
	    if (lastCommentWS.start === node.end) {
	      lastCommentWS.leadingNode = node;
	      i--;
	    }
	    const {
	      start: nodeStart
	    } = node;
	    for (; i >= 0; i--) {
	      const commentWS = commentStack[i];
	      const commentEnd = commentWS.end;
	      if (commentEnd > nodeStart) {
	        commentWS.containingNode = node;
	        this.finalizeComment(commentWS);
	        commentStack.splice(i, 1);
	      } else {
	        if (commentEnd === nodeStart) {
	          commentWS.trailingNode = node;
	        }
	        break;
	      }
	    }
	  }
	  finalizeComment(commentWS) {
	    var _node$options;
	    const {
	      comments
	    } = commentWS;
	    if (commentWS.leadingNode !== null || commentWS.trailingNode !== null) {
	      if (commentWS.leadingNode !== null) {
	        setTrailingComments(commentWS.leadingNode, comments);
	      }
	      if (commentWS.trailingNode !== null) {
	        setLeadingComments(commentWS.trailingNode, comments);
	      }
	    } else {
	      const {
	        containingNode: node,
	        start: commentStart
	      } = commentWS;
	      if (this.input.charCodeAt(this.offsetToSourcePos(commentStart) - 1) === 44) {
	        switch (node.type) {
	          case "ObjectExpression":
	          case "ObjectPattern":
	          case "RecordExpression":
	            adjustInnerComments(node, node.properties, commentWS);
	            break;
	          case "CallExpression":
	          case "OptionalCallExpression":
	            adjustInnerComments(node, node.arguments, commentWS);
	            break;
	          case "ImportExpression":
	            adjustInnerComments(node, [node.source, (_node$options = node.options) != null ? _node$options : null], commentWS);
	            break;
	          case "FunctionDeclaration":
	          case "FunctionExpression":
	          case "ArrowFunctionExpression":
	          case "ObjectMethod":
	          case "ClassMethod":
	          case "ClassPrivateMethod":
	            adjustInnerComments(node, node.params, commentWS);
	            break;
	          case "ArrayExpression":
	          case "ArrayPattern":
	          case "TupleExpression":
	            adjustInnerComments(node, node.elements, commentWS);
	            break;
	          case "ExportNamedDeclaration":
	          case "ImportDeclaration":
	            adjustInnerComments(node, node.specifiers, commentWS);
	            break;
	          case "TSEnumDeclaration":
	            {
	              adjustInnerComments(node, node.members, commentWS);
	            }
	            break;
	          case "TSEnumBody":
	            adjustInnerComments(node, node.members, commentWS);
	            break;
	          default:
	            {
	              setInnerComments(node, comments);
	            }
	        }
	      } else {
	        setInnerComments(node, comments);
	      }
	    }
	  }
	  finalizeRemainingComments() {
	    const {
	      commentStack
	    } = this.state;
	    for (let i = commentStack.length - 1; i >= 0; i--) {
	      this.finalizeComment(commentStack[i]);
	    }
	    this.state.commentStack = [];
	  }
	  resetPreviousNodeTrailingComments(node) {
	    const {
	      commentStack
	    } = this.state;
	    const {
	      length
	    } = commentStack;
	    if (length === 0) return;
	    const commentWS = commentStack[length - 1];
	    if (commentWS.leadingNode === node) {
	      commentWS.leadingNode = null;
	    }
	  }
	  takeSurroundingComments(node, start, end) {
	    const {
	      commentStack
	    } = this.state;
	    const commentStackLength = commentStack.length;
	    if (commentStackLength === 0) return;
	    let i = commentStackLength - 1;
	    for (; i >= 0; i--) {
	      const commentWS = commentStack[i];
	      const commentEnd = commentWS.end;
	      const commentStart = commentWS.start;
	      if (commentStart === end) {
	        commentWS.leadingNode = node;
	      } else if (commentEnd === start) {
	        commentWS.trailingNode = node;
	      } else if (commentEnd < start) {
	        break;
	      }
	    }
	  }
	}
	class State {
	  constructor() {
	    this.flags = 1024;
	    this.startIndex = void 0;
	    this.curLine = void 0;
	    this.lineStart = void 0;
	    this.startLoc = void 0;
	    this.endLoc = void 0;
	    this.errors = [];
	    this.potentialArrowAt = -1;
	    this.noArrowAt = [];
	    this.noArrowParamsConversionAt = [];
	    this.topicContext = {
	      maxNumOfResolvableTopics: 0,
	      maxTopicIndex: null
	    };
	    this.labels = [];
	    this.commentsLen = 0;
	    this.commentStack = [];
	    this.pos = 0;
	    this.type = 140;
	    this.value = null;
	    this.start = 0;
	    this.end = 0;
	    this.lastTokEndLoc = null;
	    this.lastTokStartLoc = null;
	    this.context = [types.brace];
	    this.firstInvalidTemplateEscapePos = null;
	    this.strictErrors = new Map();
	    this.tokensLength = 0;
	  }
	  get strict() {
	    return (this.flags & 1) > 0;
	  }
	  set strict(v) {
	    if (v) this.flags |= 1;else this.flags &= -2;
	  }
	  init({
	    strictMode,
	    sourceType,
	    startIndex,
	    startLine,
	    startColumn
	  }) {
	    this.strict = strictMode === false ? false : strictMode === true ? true : sourceType === "module";
	    this.startIndex = startIndex;
	    this.curLine = startLine;
	    this.lineStart = -startColumn;
	    this.startLoc = this.endLoc = new Position(startLine, startColumn, startIndex);
	  }
	  get maybeInArrowParameters() {
	    return (this.flags & 2) > 0;
	  }
	  set maybeInArrowParameters(v) {
	    if (v) this.flags |= 2;else this.flags &= -3;
	  }
	  get inType() {
	    return (this.flags & 4) > 0;
	  }
	  set inType(v) {
	    if (v) this.flags |= 4;else this.flags &= -5;
	  }
	  get noAnonFunctionType() {
	    return (this.flags & 8) > 0;
	  }
	  set noAnonFunctionType(v) {
	    if (v) this.flags |= 8;else this.flags &= -9;
	  }
	  get hasFlowComment() {
	    return (this.flags & 16) > 0;
	  }
	  set hasFlowComment(v) {
	    if (v) this.flags |= 16;else this.flags &= -17;
	  }
	  get isAmbientContext() {
	    return (this.flags & 32) > 0;
	  }
	  set isAmbientContext(v) {
	    if (v) this.flags |= 32;else this.flags &= -33;
	  }
	  get inAbstractClass() {
	    return (this.flags & 64) > 0;
	  }
	  set inAbstractClass(v) {
	    if (v) this.flags |= 64;else this.flags &= -65;
	  }
	  get inDisallowConditionalTypesContext() {
	    return (this.flags & 128) > 0;
	  }
	  set inDisallowConditionalTypesContext(v) {
	    if (v) this.flags |= 128;else this.flags &= -129;
	  }
	  get soloAwait() {
	    return (this.flags & 256) > 0;
	  }
	  set soloAwait(v) {
	    if (v) this.flags |= 256;else this.flags &= -257;
	  }
	  get inFSharpPipelineDirectBody() {
	    return (this.flags & 512) > 0;
	  }
	  set inFSharpPipelineDirectBody(v) {
	    if (v) this.flags |= 512;else this.flags &= -513;
	  }
	  get canStartJSXElement() {
	    return (this.flags & 1024) > 0;
	  }
	  set canStartJSXElement(v) {
	    if (v) this.flags |= 1024;else this.flags &= -1025;
	  }
	  get containsEsc() {
	    return (this.flags & 2048) > 0;
	  }
	  set containsEsc(v) {
	    if (v) this.flags |= 2048;else this.flags &= -2049;
	  }
	  get hasTopLevelAwait() {
	    return (this.flags & 4096) > 0;
	  }
	  set hasTopLevelAwait(v) {
	    if (v) this.flags |= 4096;else this.flags &= -4097;
	  }
	  curPosition() {
	    return new Position(this.curLine, this.pos - this.lineStart, this.pos + this.startIndex);
	  }
	  clone() {
	    const state = new State();
	    state.flags = this.flags;
	    state.startIndex = this.startIndex;
	    state.curLine = this.curLine;
	    state.lineStart = this.lineStart;
	    state.startLoc = this.startLoc;
	    state.endLoc = this.endLoc;
	    state.errors = this.errors.slice();
	    state.potentialArrowAt = this.potentialArrowAt;
	    state.noArrowAt = this.noArrowAt.slice();
	    state.noArrowParamsConversionAt = this.noArrowParamsConversionAt.slice();
	    state.topicContext = this.topicContext;
	    state.labels = this.labels.slice();
	    state.commentsLen = this.commentsLen;
	    state.commentStack = this.commentStack.slice();
	    state.pos = this.pos;
	    state.type = this.type;
	    state.value = this.value;
	    state.start = this.start;
	    state.end = this.end;
	    state.lastTokEndLoc = this.lastTokEndLoc;
	    state.lastTokStartLoc = this.lastTokStartLoc;
	    state.context = this.context.slice();
	    state.firstInvalidTemplateEscapePos = this.firstInvalidTemplateEscapePos;
	    state.strictErrors = this.strictErrors;
	    state.tokensLength = this.tokensLength;
	    return state;
	  }
	}
	var _isDigit = function isDigit(code) {
	  return code >= 48 && code <= 57;
	};
	const forbiddenNumericSeparatorSiblings = {
	  decBinOct: new Set([46, 66, 69, 79, 95, 98, 101, 111]),
	  hex: new Set([46, 88, 95, 120])
	};
	const isAllowedNumericSeparatorSibling = {
	  bin: ch => ch === 48 || ch === 49,
	  oct: ch => ch >= 48 && ch <= 55,
	  dec: ch => ch >= 48 && ch <= 57,
	  hex: ch => ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102
	};
	function readStringContents(type, input, pos, lineStart, curLine, errors) {
	  const initialPos = pos;
	  const initialLineStart = lineStart;
	  const initialCurLine = curLine;
	  let out = "";
	  let firstInvalidLoc = null;
	  let chunkStart = pos;
	  const {
	    length
	  } = input;
	  for (;;) {
	    if (pos >= length) {
	      errors.unterminated(initialPos, initialLineStart, initialCurLine);
	      out += input.slice(chunkStart, pos);
	      break;
	    }
	    const ch = input.charCodeAt(pos);
	    if (isStringEnd(type, ch, input, pos)) {
	      out += input.slice(chunkStart, pos);
	      break;
	    }
	    if (ch === 92) {
	      out += input.slice(chunkStart, pos);
	      const res = readEscapedChar(input, pos, lineStart, curLine, type === "template", errors);
	      if (res.ch === null && !firstInvalidLoc) {
	        firstInvalidLoc = {
	          pos,
	          lineStart,
	          curLine
	        };
	      } else {
	        out += res.ch;
	      }
	      ({
	        pos,
	        lineStart,
	        curLine
	      } = res);
	      chunkStart = pos;
	    } else if (ch === 8232 || ch === 8233) {
	      ++pos;
	      ++curLine;
	      lineStart = pos;
	    } else if (ch === 10 || ch === 13) {
	      if (type === "template") {
	        out += input.slice(chunkStart, pos) + "\n";
	        ++pos;
	        if (ch === 13 && input.charCodeAt(pos) === 10) {
	          ++pos;
	        }
	        ++curLine;
	        chunkStart = lineStart = pos;
	      } else {
	        errors.unterminated(initialPos, initialLineStart, initialCurLine);
	      }
	    } else {
	      ++pos;
	    }
	  }
	  return {
	    pos,
	    str: out,
	    firstInvalidLoc,
	    lineStart,
	    curLine,
	    containsInvalid: !!firstInvalidLoc
	  };
	}
	function isStringEnd(type, ch, input, pos) {
	  if (type === "template") {
	    return ch === 96 || ch === 36 && input.charCodeAt(pos + 1) === 123;
	  }
	  return ch === (type === "double" ? 34 : 39);
	}
	function readEscapedChar(input, pos, lineStart, curLine, inTemplate, errors) {
	  const throwOnInvalid = !inTemplate;
	  pos++;
	  const res = ch => ({
	    pos,
	    ch,
	    lineStart,
	    curLine
	  });
	  const ch = input.charCodeAt(pos++);
	  switch (ch) {
	    case 110:
	      return res("\n");
	    case 114:
	      return res("\r");
	    case 120:
	      {
	        let code;
	        ({
	          code,
	          pos
	        } = readHexChar(input, pos, lineStart, curLine, 2, false, throwOnInvalid, errors));
	        return res(code === null ? null : String.fromCharCode(code));
	      }
	    case 117:
	      {
	        let code;
	        ({
	          code,
	          pos
	        } = readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors));
	        return res(code === null ? null : String.fromCodePoint(code));
	      }
	    case 116:
	      return res("\t");
	    case 98:
	      return res("\b");
	    case 118:
	      return res("\u000b");
	    case 102:
	      return res("\f");
	    case 13:
	      if (input.charCodeAt(pos) === 10) {
	        ++pos;
	      }
	    case 10:
	      lineStart = pos;
	      ++curLine;
	    case 8232:
	    case 8233:
	      return res("");
	    case 56:
	    case 57:
	      if (inTemplate) {
	        return res(null);
	      } else {
	        errors.strictNumericEscape(pos - 1, lineStart, curLine);
	      }
	    default:
	      if (ch >= 48 && ch <= 55) {
	        const startPos = pos - 1;
	        const match = /^[0-7]+/.exec(input.slice(startPos, pos + 2));
	        let octalStr = match[0];
	        let octal = parseInt(octalStr, 8);
	        if (octal > 255) {
	          octalStr = octalStr.slice(0, -1);
	          octal = parseInt(octalStr, 8);
	        }
	        pos += octalStr.length - 1;
	        const next = input.charCodeAt(pos);
	        if (octalStr !== "0" || next === 56 || next === 57) {
	          if (inTemplate) {
	            return res(null);
	          } else {
	            errors.strictNumericEscape(startPos, lineStart, curLine);
	          }
	        }
	        return res(String.fromCharCode(octal));
	      }
	      return res(String.fromCharCode(ch));
	  }
	}
	function readHexChar(input, pos, lineStart, curLine, len, forceLen, throwOnInvalid, errors) {
	  const initialPos = pos;
	  let n;
	  ({
	    n,
	    pos
	  } = readInt(input, pos, lineStart, curLine, 16, len, forceLen, false, errors, !throwOnInvalid));
	  if (n === null) {
	    if (throwOnInvalid) {
	      errors.invalidEscapeSequence(initialPos, lineStart, curLine);
	    } else {
	      pos = initialPos - 1;
	    }
	  }
	  return {
	    code: n,
	    pos
	  };
	}
	function readInt(input, pos, lineStart, curLine, radix, len, forceLen, allowNumSeparator, errors, bailOnError) {
	  const start = pos;
	  const forbiddenSiblings = radix === 16 ? forbiddenNumericSeparatorSiblings.hex : forbiddenNumericSeparatorSiblings.decBinOct;
	  const isAllowedSibling = radix === 16 ? isAllowedNumericSeparatorSibling.hex : radix === 10 ? isAllowedNumericSeparatorSibling.dec : radix === 8 ? isAllowedNumericSeparatorSibling.oct : isAllowedNumericSeparatorSibling.bin;
	  let invalid = false;
	  let total = 0;
	  for (let i = 0, e = len == null ? Infinity : len; i < e; ++i) {
	    const code = input.charCodeAt(pos);
	    let val;
	    if (code === 95 && allowNumSeparator !== "bail") {
	      const prev = input.charCodeAt(pos - 1);
	      const next = input.charCodeAt(pos + 1);
	      if (!allowNumSeparator) {
	        if (bailOnError) return {
	          n: null,
	          pos
	        };
	        errors.numericSeparatorInEscapeSequence(pos, lineStart, curLine);
	      } else if (Number.isNaN(next) || !isAllowedSibling(next) || forbiddenSiblings.has(prev) || forbiddenSiblings.has(next)) {
	        if (bailOnError) return {
	          n: null,
	          pos
	        };
	        errors.unexpectedNumericSeparator(pos, lineStart, curLine);
	      }
	      ++pos;
	      continue;
	    }
	    if (code >= 97) {
	      val = code - 97 + 10;
	    } else if (code >= 65) {
	      val = code - 65 + 10;
	    } else if (_isDigit(code)) {
	      val = code - 48;
	    } else {
	      val = Infinity;
	    }
	    if (val >= radix) {
	      if (val <= 9 && bailOnError) {
	        return {
	          n: null,
	          pos
	        };
	      } else if (val <= 9 && errors.invalidDigit(pos, lineStart, curLine, radix)) {
	        val = 0;
	      } else if (forceLen) {
	        val = 0;
	        invalid = true;
	      } else {
	        break;
	      }
	    }
	    ++pos;
	    total = total * radix + val;
	  }
	  if (pos === start || len != null && pos - start !== len || invalid) {
	    return {
	      n: null,
	      pos
	    };
	  }
	  return {
	    n: total,
	    pos
	  };
	}
	function readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors) {
	  const ch = input.charCodeAt(pos);
	  let code;
	  if (ch === 123) {
	    ++pos;
	    ({
	      code,
	      pos
	    } = readHexChar(input, pos, lineStart, curLine, input.indexOf("}", pos) - pos, true, throwOnInvalid, errors));
	    ++pos;
	    if (code !== null && code > 0x10ffff) {
	      if (throwOnInvalid) {
	        errors.invalidCodePoint(pos, lineStart, curLine);
	      } else {
	        return {
	          code: null,
	          pos
	        };
	      }
	    }
	  } else {
	    ({
	      code,
	      pos
	    } = readHexChar(input, pos, lineStart, curLine, 4, false, throwOnInvalid, errors));
	  }
	  return {
	    code,
	    pos
	  };
	}
	function buildPosition(pos, lineStart, curLine) {
	  return new Position(curLine, pos - lineStart, pos);
	}
	const VALID_REGEX_FLAGS = new Set([103, 109, 115, 105, 121, 117, 100, 118]);
	class Token {
	  constructor(state) {
	    const startIndex = state.startIndex || 0;
	    this.type = state.type;
	    this.value = state.value;
	    this.start = startIndex + state.start;
	    this.end = startIndex + state.end;
	    this.loc = new SourceLocation(state.startLoc, state.endLoc);
	  }
	}
	class Tokenizer extends CommentsParser {
	  constructor(options, input) {
	    super();
	    this.isLookahead = void 0;
	    this.tokens = [];
	    this.errorHandlers_readInt = {
	      invalidDigit: (pos, lineStart, curLine, radix) => {
	        if (!(this.optionFlags & 2048)) return false;
	        this.raise(Errors.InvalidDigit, buildPosition(pos, lineStart, curLine), {
	          radix
	        });
	        return true;
	      },
	      numericSeparatorInEscapeSequence: this.errorBuilder(Errors.NumericSeparatorInEscapeSequence),
	      unexpectedNumericSeparator: this.errorBuilder(Errors.UnexpectedNumericSeparator)
	    };
	    this.errorHandlers_readCodePoint = Object.assign({}, this.errorHandlers_readInt, {
	      invalidEscapeSequence: this.errorBuilder(Errors.InvalidEscapeSequence),
	      invalidCodePoint: this.errorBuilder(Errors.InvalidCodePoint)
	    });
	    this.errorHandlers_readStringContents_string = Object.assign({}, this.errorHandlers_readCodePoint, {
	      strictNumericEscape: (pos, lineStart, curLine) => {
	        this.recordStrictModeErrors(Errors.StrictNumericEscape, buildPosition(pos, lineStart, curLine));
	      },
	      unterminated: (pos, lineStart, curLine) => {
	        throw this.raise(Errors.UnterminatedString, buildPosition(pos - 1, lineStart, curLine));
	      }
	    });
	    this.errorHandlers_readStringContents_template = Object.assign({}, this.errorHandlers_readCodePoint, {
	      strictNumericEscape: this.errorBuilder(Errors.StrictNumericEscape),
	      unterminated: (pos, lineStart, curLine) => {
	        throw this.raise(Errors.UnterminatedTemplate, buildPosition(pos, lineStart, curLine));
	      }
	    });
	    this.state = new State();
	    this.state.init(options);
	    this.input = input;
	    this.length = input.length;
	    this.comments = [];
	    this.isLookahead = false;
	  }
	  pushToken(token) {
	    this.tokens.length = this.state.tokensLength;
	    this.tokens.push(token);
	    ++this.state.tokensLength;
	  }
	  next() {
	    this.checkKeywordEscapes();
	    if (this.optionFlags & 256) {
	      this.pushToken(new Token(this.state));
	    }
	    this.state.lastTokEndLoc = this.state.endLoc;
	    this.state.lastTokStartLoc = this.state.startLoc;
	    this.nextToken();
	  }
	  eat(type) {
	    if (this.match(type)) {
	      this.next();
	      return true;
	    } else {
	      return false;
	    }
	  }
	  match(type) {
	    return this.state.type === type;
	  }
	  createLookaheadState(state) {
	    return {
	      pos: state.pos,
	      value: null,
	      type: state.type,
	      start: state.start,
	      end: state.end,
	      context: [this.curContext()],
	      inType: state.inType,
	      startLoc: state.startLoc,
	      lastTokEndLoc: state.lastTokEndLoc,
	      curLine: state.curLine,
	      lineStart: state.lineStart,
	      curPosition: state.curPosition
	    };
	  }
	  lookahead() {
	    const old = this.state;
	    this.state = this.createLookaheadState(old);
	    this.isLookahead = true;
	    this.nextToken();
	    this.isLookahead = false;
	    const curr = this.state;
	    this.state = old;
	    return curr;
	  }
	  nextTokenStart() {
	    return this.nextTokenStartSince(this.state.pos);
	  }
	  nextTokenStartSince(pos) {
	    skipWhiteSpace.lastIndex = pos;
	    return skipWhiteSpace.test(this.input) ? skipWhiteSpace.lastIndex : pos;
	  }
	  lookaheadCharCode() {
	    return this.lookaheadCharCodeSince(this.state.pos);
	  }
	  lookaheadCharCodeSince(pos) {
	    return this.input.charCodeAt(this.nextTokenStartSince(pos));
	  }
	  nextTokenInLineStart() {
	    return this.nextTokenInLineStartSince(this.state.pos);
	  }
	  nextTokenInLineStartSince(pos) {
	    skipWhiteSpaceInLine.lastIndex = pos;
	    return skipWhiteSpaceInLine.test(this.input) ? skipWhiteSpaceInLine.lastIndex : pos;
	  }
	  lookaheadInLineCharCode() {
	    return this.input.charCodeAt(this.nextTokenInLineStart());
	  }
	  codePointAtPos(pos) {
	    let cp = this.input.charCodeAt(pos);
	    if ((cp & 0xfc00) === 0xd800 && ++pos < this.input.length) {
	      const trail = this.input.charCodeAt(pos);
	      if ((trail & 0xfc00) === 0xdc00) {
	        cp = 0x10000 + ((cp & 0x3ff) << 10) + (trail & 0x3ff);
	      }
	    }
	    return cp;
	  }
	  setStrict(strict) {
	    this.state.strict = strict;
	    if (strict) {
	      this.state.strictErrors.forEach(([toParseError, at]) => this.raise(toParseError, at));
	      this.state.strictErrors.clear();
	    }
	  }
	  curContext() {
	    return this.state.context[this.state.context.length - 1];
	  }
	  nextToken() {
	    this.skipSpace();
	    this.state.start = this.state.pos;
	    if (!this.isLookahead) this.state.startLoc = this.state.curPosition();
	    if (this.state.pos >= this.length) {
	      this.finishToken(140);
	      return;
	    }
	    this.getTokenFromCode(this.codePointAtPos(this.state.pos));
	  }
	  skipBlockComment(commentEnd) {
	    let startLoc;
	    if (!this.isLookahead) startLoc = this.state.curPosition();
	    const start = this.state.pos;
	    const end = this.input.indexOf(commentEnd, start + 2);
	    if (end === -1) {
	      throw this.raise(Errors.UnterminatedComment, this.state.curPosition());
	    }
	    this.state.pos = end + commentEnd.length;
	    lineBreakG.lastIndex = start + 2;
	    while (lineBreakG.test(this.input) && lineBreakG.lastIndex <= end) {
	      ++this.state.curLine;
	      this.state.lineStart = lineBreakG.lastIndex;
	    }
	    if (this.isLookahead) return;
	    const comment = {
	      type: "CommentBlock",
	      value: this.input.slice(start + 2, end),
	      start: this.sourceToOffsetPos(start),
	      end: this.sourceToOffsetPos(end + commentEnd.length),
	      loc: new SourceLocation(startLoc, this.state.curPosition())
	    };
	    if (this.optionFlags & 256) this.pushToken(comment);
	    return comment;
	  }
	  skipLineComment(startSkip) {
	    const start = this.state.pos;
	    let startLoc;
	    if (!this.isLookahead) startLoc = this.state.curPosition();
	    let ch = this.input.charCodeAt(this.state.pos += startSkip);
	    if (this.state.pos < this.length) {
	      while (!isNewLine(ch) && ++this.state.pos < this.length) {
	        ch = this.input.charCodeAt(this.state.pos);
	      }
	    }
	    if (this.isLookahead) return;
	    const end = this.state.pos;
	    const value = this.input.slice(start + startSkip, end);
	    const comment = {
	      type: "CommentLine",
	      value,
	      start: this.sourceToOffsetPos(start),
	      end: this.sourceToOffsetPos(end),
	      loc: new SourceLocation(startLoc, this.state.curPosition())
	    };
	    if (this.optionFlags & 256) this.pushToken(comment);
	    return comment;
	  }
	  skipSpace() {
	    const spaceStart = this.state.pos;
	    const comments = this.optionFlags & 4096 ? [] : null;
	    loop: while (this.state.pos < this.length) {
	      const ch = this.input.charCodeAt(this.state.pos);
	      switch (ch) {
	        case 32:
	        case 160:
	        case 9:
	          ++this.state.pos;
	          break;
	        case 13:
	          if (this.input.charCodeAt(this.state.pos + 1) === 10) {
	            ++this.state.pos;
	          }
	        case 10:
	        case 8232:
	        case 8233:
	          ++this.state.pos;
	          ++this.state.curLine;
	          this.state.lineStart = this.state.pos;
	          break;
	        case 47:
	          switch (this.input.charCodeAt(this.state.pos + 1)) {
	            case 42:
	              {
	                const comment = this.skipBlockComment("*/");
	                if (comment !== undefined) {
	                  this.addComment(comment);
	                  comments == null || comments.push(comment);
	                }
	                break;
	              }
	            case 47:
	              {
	                const comment = this.skipLineComment(2);
	                if (comment !== undefined) {
	                  this.addComment(comment);
	                  comments == null || comments.push(comment);
	                }
	                break;
	              }
	            default:
	              break loop;
	          }
	          break;
	        default:
	          if (isWhitespace(ch)) {
	            ++this.state.pos;
	          } else if (ch === 45 && !this.inModule && this.optionFlags & 8192) {
	            const pos = this.state.pos;
	            if (this.input.charCodeAt(pos + 1) === 45 && this.input.charCodeAt(pos + 2) === 62 && (spaceStart === 0 || this.state.lineStart > spaceStart)) {
	              const comment = this.skipLineComment(3);
	              if (comment !== undefined) {
	                this.addComment(comment);
	                comments == null || comments.push(comment);
	              }
	            } else {
	              break loop;
	            }
	          } else if (ch === 60 && !this.inModule && this.optionFlags & 8192) {
	            const pos = this.state.pos;
	            if (this.input.charCodeAt(pos + 1) === 33 && this.input.charCodeAt(pos + 2) === 45 && this.input.charCodeAt(pos + 3) === 45) {
	              const comment = this.skipLineComment(4);
	              if (comment !== undefined) {
	                this.addComment(comment);
	                comments == null || comments.push(comment);
	              }
	            } else {
	              break loop;
	            }
	          } else {
	            break loop;
	          }
	      }
	    }
	    if ((comments == null ? void 0 : comments.length) > 0) {
	      const end = this.state.pos;
	      const commentWhitespace = {
	        start: this.sourceToOffsetPos(spaceStart),
	        end: this.sourceToOffsetPos(end),
	        comments,
	        leadingNode: null,
	        trailingNode: null,
	        containingNode: null
	      };
	      this.state.commentStack.push(commentWhitespace);
	    }
	  }
	  finishToken(type, val) {
	    this.state.end = this.state.pos;
	    this.state.endLoc = this.state.curPosition();
	    const prevType = this.state.type;
	    this.state.type = type;
	    this.state.value = val;
	    if (!this.isLookahead) {
	      this.updateContext(prevType);
	    }
	  }
	  replaceToken(type) {
	    this.state.type = type;
	    this.updateContext();
	  }
	  readToken_numberSign() {
	    if (this.state.pos === 0 && this.readToken_interpreter()) {
	      return;
	    }
	    const nextPos = this.state.pos + 1;
	    const next = this.codePointAtPos(nextPos);
	    if (next >= 48 && next <= 57) {
	      throw this.raise(Errors.UnexpectedDigitAfterHash, this.state.curPosition());
	    }
	    if (next === 123 || next === 91 && this.hasPlugin("recordAndTuple")) {
	      this.expectPlugin("recordAndTuple");
	      if (this.getPluginOption("recordAndTuple", "syntaxType") === "bar") {
	        throw this.raise(next === 123 ? Errors.RecordExpressionHashIncorrectStartSyntaxType : Errors.TupleExpressionHashIncorrectStartSyntaxType, this.state.curPosition());
	      }
	      this.state.pos += 2;
	      if (next === 123) {
	        this.finishToken(7);
	      } else {
	        this.finishToken(1);
	      }
	    } else if (isIdentifierStart(next)) {
	      ++this.state.pos;
	      this.finishToken(139, this.readWord1(next));
	    } else if (next === 92) {
	      ++this.state.pos;
	      this.finishToken(139, this.readWord1());
	    } else {
	      this.finishOp(27, 1);
	    }
	  }
	  readToken_dot() {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    if (next >= 48 && next <= 57) {
	      this.readNumber(true);
	      return;
	    }
	    if (next === 46 && this.input.charCodeAt(this.state.pos + 2) === 46) {
	      this.state.pos += 3;
	      this.finishToken(21);
	    } else {
	      ++this.state.pos;
	      this.finishToken(16);
	    }
	  }
	  readToken_slash() {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    if (next === 61) {
	      this.finishOp(31, 2);
	    } else {
	      this.finishOp(56, 1);
	    }
	  }
	  readToken_interpreter() {
	    if (this.state.pos !== 0 || this.length < 2) return false;
	    let ch = this.input.charCodeAt(this.state.pos + 1);
	    if (ch !== 33) return false;
	    const start = this.state.pos;
	    this.state.pos += 1;
	    while (!isNewLine(ch) && ++this.state.pos < this.length) {
	      ch = this.input.charCodeAt(this.state.pos);
	    }
	    const value = this.input.slice(start + 2, this.state.pos);
	    this.finishToken(28, value);
	    return true;
	  }
	  readToken_mult_modulo(code) {
	    let type = code === 42 ? 55 : 54;
	    let width = 1;
	    let next = this.input.charCodeAt(this.state.pos + 1);
	    if (code === 42 && next === 42) {
	      width++;
	      next = this.input.charCodeAt(this.state.pos + 2);
	      type = 57;
	    }
	    if (next === 61 && !this.state.inType) {
	      width++;
	      type = code === 37 ? 33 : 30;
	    }
	    this.finishOp(type, width);
	  }
	  readToken_pipe_amp(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    if (next === code) {
	      if (this.input.charCodeAt(this.state.pos + 2) === 61) {
	        this.finishOp(30, 3);
	      } else {
	        this.finishOp(code === 124 ? 41 : 42, 2);
	      }
	      return;
	    }
	    if (code === 124) {
	      if (next === 62) {
	        this.finishOp(39, 2);
	        return;
	      }
	      if (this.hasPlugin("recordAndTuple") && next === 125) {
	        if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
	          throw this.raise(Errors.RecordExpressionBarIncorrectEndSyntaxType, this.state.curPosition());
	        }
	        this.state.pos += 2;
	        this.finishToken(9);
	        return;
	      }
	      if (this.hasPlugin("recordAndTuple") && next === 93) {
	        if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
	          throw this.raise(Errors.TupleExpressionBarIncorrectEndSyntaxType, this.state.curPosition());
	        }
	        this.state.pos += 2;
	        this.finishToken(4);
	        return;
	      }
	    }
	    if (next === 61) {
	      this.finishOp(30, 2);
	      return;
	    }
	    this.finishOp(code === 124 ? 43 : 45, 1);
	  }
	  readToken_caret() {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    if (next === 61 && !this.state.inType) {
	      this.finishOp(32, 2);
	    } else if (next === 94 && this.hasPlugin(["pipelineOperator", {
	      proposal: "hack",
	      topicToken: "^^"
	    }])) {
	      this.finishOp(37, 2);
	      const lookaheadCh = this.input.codePointAt(this.state.pos);
	      if (lookaheadCh === 94) {
	        this.unexpected();
	      }
	    } else {
	      this.finishOp(44, 1);
	    }
	  }
	  readToken_atSign() {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    if (next === 64 && this.hasPlugin(["pipelineOperator", {
	      proposal: "hack",
	      topicToken: "@@"
	    }])) {
	      this.finishOp(38, 2);
	    } else {
	      this.finishOp(26, 1);
	    }
	  }
	  readToken_plus_min(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    if (next === code) {
	      this.finishOp(34, 2);
	      return;
	    }
	    if (next === 61) {
	      this.finishOp(30, 2);
	    } else {
	      this.finishOp(53, 1);
	    }
	  }
	  readToken_lt() {
	    const {
	      pos
	    } = this.state;
	    const next = this.input.charCodeAt(pos + 1);
	    if (next === 60) {
	      if (this.input.charCodeAt(pos + 2) === 61) {
	        this.finishOp(30, 3);
	        return;
	      }
	      this.finishOp(51, 2);
	      return;
	    }
	    if (next === 61) {
	      this.finishOp(49, 2);
	      return;
	    }
	    this.finishOp(47, 1);
	  }
	  readToken_gt() {
	    const {
	      pos
	    } = this.state;
	    const next = this.input.charCodeAt(pos + 1);
	    if (next === 62) {
	      const size = this.input.charCodeAt(pos + 2) === 62 ? 3 : 2;
	      if (this.input.charCodeAt(pos + size) === 61) {
	        this.finishOp(30, size + 1);
	        return;
	      }
	      this.finishOp(52, size);
	      return;
	    }
	    if (next === 61) {
	      this.finishOp(49, 2);
	      return;
	    }
	    this.finishOp(48, 1);
	  }
	  readToken_eq_excl(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    if (next === 61) {
	      this.finishOp(46, this.input.charCodeAt(this.state.pos + 2) === 61 ? 3 : 2);
	      return;
	    }
	    if (code === 61 && next === 62) {
	      this.state.pos += 2;
	      this.finishToken(19);
	      return;
	    }
	    this.finishOp(code === 61 ? 29 : 35, 1);
	  }
	  readToken_question() {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    const next2 = this.input.charCodeAt(this.state.pos + 2);
	    if (next === 63) {
	      if (next2 === 61) {
	        this.finishOp(30, 3);
	      } else {
	        this.finishOp(40, 2);
	      }
	    } else if (next === 46 && !(next2 >= 48 && next2 <= 57)) {
	      this.state.pos += 2;
	      this.finishToken(18);
	    } else {
	      ++this.state.pos;
	      this.finishToken(17);
	    }
	  }
	  getTokenFromCode(code) {
	    switch (code) {
	      case 46:
	        this.readToken_dot();
	        return;
	      case 40:
	        ++this.state.pos;
	        this.finishToken(10);
	        return;
	      case 41:
	        ++this.state.pos;
	        this.finishToken(11);
	        return;
	      case 59:
	        ++this.state.pos;
	        this.finishToken(13);
	        return;
	      case 44:
	        ++this.state.pos;
	        this.finishToken(12);
	        return;
	      case 91:
	        if (this.hasPlugin("recordAndTuple") && this.input.charCodeAt(this.state.pos + 1) === 124) {
	          if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
	            throw this.raise(Errors.TupleExpressionBarIncorrectStartSyntaxType, this.state.curPosition());
	          }
	          this.state.pos += 2;
	          this.finishToken(2);
	        } else {
	          ++this.state.pos;
	          this.finishToken(0);
	        }
	        return;
	      case 93:
	        ++this.state.pos;
	        this.finishToken(3);
	        return;
	      case 123:
	        if (this.hasPlugin("recordAndTuple") && this.input.charCodeAt(this.state.pos + 1) === 124) {
	          if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
	            throw this.raise(Errors.RecordExpressionBarIncorrectStartSyntaxType, this.state.curPosition());
	          }
	          this.state.pos += 2;
	          this.finishToken(6);
	        } else {
	          ++this.state.pos;
	          this.finishToken(5);
	        }
	        return;
	      case 125:
	        ++this.state.pos;
	        this.finishToken(8);
	        return;
	      case 58:
	        if (this.hasPlugin("functionBind") && this.input.charCodeAt(this.state.pos + 1) === 58) {
	          this.finishOp(15, 2);
	        } else {
	          ++this.state.pos;
	          this.finishToken(14);
	        }
	        return;
	      case 63:
	        this.readToken_question();
	        return;
	      case 96:
	        this.readTemplateToken();
	        return;
	      case 48:
	        {
	          const next = this.input.charCodeAt(this.state.pos + 1);
	          if (next === 120 || next === 88) {
	            this.readRadixNumber(16);
	            return;
	          }
	          if (next === 111 || next === 79) {
	            this.readRadixNumber(8);
	            return;
	          }
	          if (next === 98 || next === 66) {
	            this.readRadixNumber(2);
	            return;
	          }
	        }
	      case 49:
	      case 50:
	      case 51:
	      case 52:
	      case 53:
	      case 54:
	      case 55:
	      case 56:
	      case 57:
	        this.readNumber(false);
	        return;
	      case 34:
	      case 39:
	        this.readString(code);
	        return;
	      case 47:
	        this.readToken_slash();
	        return;
	      case 37:
	      case 42:
	        this.readToken_mult_modulo(code);
	        return;
	      case 124:
	      case 38:
	        this.readToken_pipe_amp(code);
	        return;
	      case 94:
	        this.readToken_caret();
	        return;
	      case 43:
	      case 45:
	        this.readToken_plus_min(code);
	        return;
	      case 60:
	        this.readToken_lt();
	        return;
	      case 62:
	        this.readToken_gt();
	        return;
	      case 61:
	      case 33:
	        this.readToken_eq_excl(code);
	        return;
	      case 126:
	        this.finishOp(36, 1);
	        return;
	      case 64:
	        this.readToken_atSign();
	        return;
	      case 35:
	        this.readToken_numberSign();
	        return;
	      case 92:
	        this.readWord();
	        return;
	      default:
	        if (isIdentifierStart(code)) {
	          this.readWord(code);
	          return;
	        }
	    }
	    throw this.raise(Errors.InvalidOrUnexpectedToken, this.state.curPosition(), {
	      unexpected: String.fromCodePoint(code)
	    });
	  }
	  finishOp(type, size) {
	    const str = this.input.slice(this.state.pos, this.state.pos + size);
	    this.state.pos += size;
	    this.finishToken(type, str);
	  }
	  readRegexp() {
	    const startLoc = this.state.startLoc;
	    const start = this.state.start + 1;
	    let escaped, inClass;
	    let {
	      pos
	    } = this.state;
	    for (;; ++pos) {
	      if (pos >= this.length) {
	        throw this.raise(Errors.UnterminatedRegExp, createPositionWithColumnOffset(startLoc, 1));
	      }
	      const ch = this.input.charCodeAt(pos);
	      if (isNewLine(ch)) {
	        throw this.raise(Errors.UnterminatedRegExp, createPositionWithColumnOffset(startLoc, 1));
	      }
	      if (escaped) {
	        escaped = false;
	      } else {
	        if (ch === 91) {
	          inClass = true;
	        } else if (ch === 93 && inClass) {
	          inClass = false;
	        } else if (ch === 47 && !inClass) {
	          break;
	        }
	        escaped = ch === 92;
	      }
	    }
	    const content = this.input.slice(start, pos);
	    ++pos;
	    let mods = "";
	    const nextPos = () => createPositionWithColumnOffset(startLoc, pos + 2 - start);
	    while (pos < this.length) {
	      const cp = this.codePointAtPos(pos);
	      const char = String.fromCharCode(cp);
	      if (VALID_REGEX_FLAGS.has(cp)) {
	        if (cp === 118) {
	          if (mods.includes("u")) {
	            this.raise(Errors.IncompatibleRegExpUVFlags, nextPos());
	          }
	        } else if (cp === 117) {
	          if (mods.includes("v")) {
	            this.raise(Errors.IncompatibleRegExpUVFlags, nextPos());
	          }
	        }
	        if (mods.includes(char)) {
	          this.raise(Errors.DuplicateRegExpFlags, nextPos());
	        }
	      } else if (isIdentifierChar(cp) || cp === 92) {
	        this.raise(Errors.MalformedRegExpFlags, nextPos());
	      } else {
	        break;
	      }
	      ++pos;
	      mods += char;
	    }
	    this.state.pos = pos;
	    this.finishToken(138, {
	      pattern: content,
	      flags: mods
	    });
	  }
	  readInt(radix, len, forceLen = false, allowNumSeparator = true) {
	    const {
	      n,
	      pos
	    } = readInt(this.input, this.state.pos, this.state.lineStart, this.state.curLine, radix, len, forceLen, allowNumSeparator, this.errorHandlers_readInt, false);
	    this.state.pos = pos;
	    return n;
	  }
	  readRadixNumber(radix) {
	    const start = this.state.pos;
	    const startLoc = this.state.curPosition();
	    let isBigInt = false;
	    this.state.pos += 2;
	    const val = this.readInt(radix);
	    if (val == null) {
	      this.raise(Errors.InvalidDigit, createPositionWithColumnOffset(startLoc, 2), {
	        radix
	      });
	    }
	    const next = this.input.charCodeAt(this.state.pos);
	    if (next === 110) {
	      ++this.state.pos;
	      isBigInt = true;
	    } else if (next === 109) {
	      throw this.raise(Errors.InvalidDecimal, startLoc);
	    }
	    if (isIdentifierStart(this.codePointAtPos(this.state.pos))) {
	      throw this.raise(Errors.NumberIdentifier, this.state.curPosition());
	    }
	    if (isBigInt) {
	      const str = this.input.slice(start, this.state.pos).replace(/[_n]/g, "");
	      this.finishToken(136, str);
	      return;
	    }
	    this.finishToken(135, val);
	  }
	  readNumber(startsWithDot) {
	    const start = this.state.pos;
	    const startLoc = this.state.curPosition();
	    let isFloat = false;
	    let isBigInt = false;
	    let hasExponent = false;
	    let isOctal = false;
	    if (!startsWithDot && this.readInt(10) === null) {
	      this.raise(Errors.InvalidNumber, this.state.curPosition());
	    }
	    const hasLeadingZero = this.state.pos - start >= 2 && this.input.charCodeAt(start) === 48;
	    if (hasLeadingZero) {
	      const integer = this.input.slice(start, this.state.pos);
	      this.recordStrictModeErrors(Errors.StrictOctalLiteral, startLoc);
	      if (!this.state.strict) {
	        const underscorePos = integer.indexOf("_");
	        if (underscorePos > 0) {
	          this.raise(Errors.ZeroDigitNumericSeparator, createPositionWithColumnOffset(startLoc, underscorePos));
	        }
	      }
	      isOctal = hasLeadingZero && !/[89]/.test(integer);
	    }
	    let next = this.input.charCodeAt(this.state.pos);
	    if (next === 46 && !isOctal) {
	      ++this.state.pos;
	      this.readInt(10);
	      isFloat = true;
	      next = this.input.charCodeAt(this.state.pos);
	    }
	    if ((next === 69 || next === 101) && !isOctal) {
	      next = this.input.charCodeAt(++this.state.pos);
	      if (next === 43 || next === 45) {
	        ++this.state.pos;
	      }
	      if (this.readInt(10) === null) {
	        this.raise(Errors.InvalidOrMissingExponent, startLoc);
	      }
	      isFloat = true;
	      hasExponent = true;
	      next = this.input.charCodeAt(this.state.pos);
	    }
	    if (next === 110) {
	      if (isFloat || hasLeadingZero) {
	        this.raise(Errors.InvalidBigIntLiteral, startLoc);
	      }
	      ++this.state.pos;
	      isBigInt = true;
	    }
	    if (next === 109) {
	      this.expectPlugin("decimal", this.state.curPosition());
	      if (hasExponent || hasLeadingZero) {
	        this.raise(Errors.InvalidDecimal, startLoc);
	      }
	      ++this.state.pos;
	      var isDecimal = true;
	    }
	    if (isIdentifierStart(this.codePointAtPos(this.state.pos))) {
	      throw this.raise(Errors.NumberIdentifier, this.state.curPosition());
	    }
	    const str = this.input.slice(start, this.state.pos).replace(/[_mn]/g, "");
	    if (isBigInt) {
	      this.finishToken(136, str);
	      return;
	    }
	    if (isDecimal) {
	      this.finishToken(137, str);
	      return;
	    }
	    const val = isOctal ? parseInt(str, 8) : parseFloat(str);
	    this.finishToken(135, val);
	  }
	  readCodePoint(throwOnInvalid) {
	    const {
	      code,
	      pos
	    } = readCodePoint(this.input, this.state.pos, this.state.lineStart, this.state.curLine, throwOnInvalid, this.errorHandlers_readCodePoint);
	    this.state.pos = pos;
	    return code;
	  }
	  readString(quote) {
	    const {
	      str,
	      pos,
	      curLine,
	      lineStart
	    } = readStringContents(quote === 34 ? "double" : "single", this.input, this.state.pos + 1, this.state.lineStart, this.state.curLine, this.errorHandlers_readStringContents_string);
	    this.state.pos = pos + 1;
	    this.state.lineStart = lineStart;
	    this.state.curLine = curLine;
	    this.finishToken(134, str);
	  }
	  readTemplateContinuation() {
	    if (!this.match(8)) {
	      this.unexpected(null, 8);
	    }
	    this.state.pos--;
	    this.readTemplateToken();
	  }
	  readTemplateToken() {
	    const opening = this.input[this.state.pos];
	    const {
	      str,
	      firstInvalidLoc,
	      pos,
	      curLine,
	      lineStart
	    } = readStringContents("template", this.input, this.state.pos + 1, this.state.lineStart, this.state.curLine, this.errorHandlers_readStringContents_template);
	    this.state.pos = pos + 1;
	    this.state.lineStart = lineStart;
	    this.state.curLine = curLine;
	    if (firstInvalidLoc) {
	      this.state.firstInvalidTemplateEscapePos = new Position(firstInvalidLoc.curLine, firstInvalidLoc.pos - firstInvalidLoc.lineStart, this.sourceToOffsetPos(firstInvalidLoc.pos));
	    }
	    if (this.input.codePointAt(pos) === 96) {
	      this.finishToken(24, firstInvalidLoc ? null : opening + str + "`");
	    } else {
	      this.state.pos++;
	      this.finishToken(25, firstInvalidLoc ? null : opening + str + "${");
	    }
	  }
	  recordStrictModeErrors(toParseError, at) {
	    const index = at.index;
	    if (this.state.strict && !this.state.strictErrors.has(index)) {
	      this.raise(toParseError, at);
	    } else {
	      this.state.strictErrors.set(index, [toParseError, at]);
	    }
	  }
	  readWord1(firstCode) {
	    this.state.containsEsc = false;
	    let word = "";
	    const start = this.state.pos;
	    let chunkStart = this.state.pos;
	    if (firstCode !== undefined) {
	      this.state.pos += firstCode <= 0xffff ? 1 : 2;
	    }
	    while (this.state.pos < this.length) {
	      const ch = this.codePointAtPos(this.state.pos);
	      if (isIdentifierChar(ch)) {
	        this.state.pos += ch <= 0xffff ? 1 : 2;
	      } else if (ch === 92) {
	        this.state.containsEsc = true;
	        word += this.input.slice(chunkStart, this.state.pos);
	        const escStart = this.state.curPosition();
	        const identifierCheck = this.state.pos === start ? isIdentifierStart : isIdentifierChar;
	        if (this.input.charCodeAt(++this.state.pos) !== 117) {
	          this.raise(Errors.MissingUnicodeEscape, this.state.curPosition());
	          chunkStart = this.state.pos - 1;
	          continue;
	        }
	        ++this.state.pos;
	        const esc = this.readCodePoint(true);
	        if (esc !== null) {
	          if (!identifierCheck(esc)) {
	            this.raise(Errors.EscapedCharNotAnIdentifier, escStart);
	          }
	          word += String.fromCodePoint(esc);
	        }
	        chunkStart = this.state.pos;
	      } else {
	        break;
	      }
	    }
	    return word + this.input.slice(chunkStart, this.state.pos);
	  }
	  readWord(firstCode) {
	    const word = this.readWord1(firstCode);
	    const type = keywords$1.get(word);
	    if (type !== undefined) {
	      this.finishToken(type, tokenLabelName(type));
	    } else {
	      this.finishToken(132, word);
	    }
	  }
	  checkKeywordEscapes() {
	    const {
	      type
	    } = this.state;
	    if (tokenIsKeyword(type) && this.state.containsEsc) {
	      this.raise(Errors.InvalidEscapedReservedWord, this.state.startLoc, {
	        reservedWord: tokenLabelName(type)
	      });
	    }
	  }
	  raise(toParseError, at, details = {}) {
	    const loc = at instanceof Position ? at : at.loc.start;
	    const error = toParseError(loc, details);
	    if (!(this.optionFlags & 2048)) throw error;
	    if (!this.isLookahead) this.state.errors.push(error);
	    return error;
	  }
	  raiseOverwrite(toParseError, at, details = {}) {
	    const loc = at instanceof Position ? at : at.loc.start;
	    const pos = loc.index;
	    const errors = this.state.errors;
	    for (let i = errors.length - 1; i >= 0; i--) {
	      const error = errors[i];
	      if (error.loc.index === pos) {
	        return errors[i] = toParseError(loc, details);
	      }
	      if (error.loc.index < pos) break;
	    }
	    return this.raise(toParseError, at, details);
	  }
	  updateContext(prevType) {}
	  unexpected(loc, type) {
	    throw this.raise(Errors.UnexpectedToken, loc != null ? loc : this.state.startLoc, {
	      expected: type ? tokenLabelName(type) : null
	    });
	  }
	  expectPlugin(pluginName, loc) {
	    if (this.hasPlugin(pluginName)) {
	      return true;
	    }
	    throw this.raise(Errors.MissingPlugin, loc != null ? loc : this.state.startLoc, {
	      missingPlugin: [pluginName]
	    });
	  }
	  expectOnePlugin(pluginNames) {
	    if (!pluginNames.some(name => this.hasPlugin(name))) {
	      throw this.raise(Errors.MissingOneOfPlugins, this.state.startLoc, {
	        missingPlugin: pluginNames
	      });
	    }
	  }
	  errorBuilder(error) {
	    return (pos, lineStart, curLine) => {
	      this.raise(error, buildPosition(pos, lineStart, curLine));
	    };
	  }
	}
	class ClassScope {
	  constructor() {
	    this.privateNames = new Set();
	    this.loneAccessors = new Map();
	    this.undefinedPrivateNames = new Map();
	  }
	}
	class ClassScopeHandler {
	  constructor(parser) {
	    this.parser = void 0;
	    this.stack = [];
	    this.undefinedPrivateNames = new Map();
	    this.parser = parser;
	  }
	  current() {
	    return this.stack[this.stack.length - 1];
	  }
	  enter() {
	    this.stack.push(new ClassScope());
	  }
	  exit() {
	    const oldClassScope = this.stack.pop();
	    const current = this.current();
	    for (const [name, loc] of Array.from(oldClassScope.undefinedPrivateNames)) {
	      if (current) {
	        if (!current.undefinedPrivateNames.has(name)) {
	          current.undefinedPrivateNames.set(name, loc);
	        }
	      } else {
	        this.parser.raise(Errors.InvalidPrivateFieldResolution, loc, {
	          identifierName: name
	        });
	      }
	    }
	  }
	  declarePrivateName(name, elementType, loc) {
	    const {
	      privateNames,
	      loneAccessors,
	      undefinedPrivateNames
	    } = this.current();
	    let redefined = privateNames.has(name);
	    if (elementType & 3) {
	      const accessor = redefined && loneAccessors.get(name);
	      if (accessor) {
	        const oldStatic = accessor & 4;
	        const newStatic = elementType & 4;
	        const oldKind = accessor & 3;
	        const newKind = elementType & 3;
	        redefined = oldKind === newKind || oldStatic !== newStatic;
	        if (!redefined) loneAccessors.delete(name);
	      } else if (!redefined) {
	        loneAccessors.set(name, elementType);
	      }
	    }
	    if (redefined) {
	      this.parser.raise(Errors.PrivateNameRedeclaration, loc, {
	        identifierName: name
	      });
	    }
	    privateNames.add(name);
	    undefinedPrivateNames.delete(name);
	  }
	  usePrivateName(name, loc) {
	    let classScope;
	    for (classScope of this.stack) {
	      if (classScope.privateNames.has(name)) return;
	    }
	    if (classScope) {
	      classScope.undefinedPrivateNames.set(name, loc);
	    } else {
	      this.parser.raise(Errors.InvalidPrivateFieldResolution, loc, {
	        identifierName: name
	      });
	    }
	  }
	}
	class ExpressionScope {
	  constructor(type = 0) {
	    this.type = type;
	  }
	  canBeArrowParameterDeclaration() {
	    return this.type === 2 || this.type === 1;
	  }
	  isCertainlyParameterDeclaration() {
	    return this.type === 3;
	  }
	}
	class ArrowHeadParsingScope extends ExpressionScope {
	  constructor(type) {
	    super(type);
	    this.declarationErrors = new Map();
	  }
	  recordDeclarationError(ParsingErrorClass, at) {
	    const index = at.index;
	    this.declarationErrors.set(index, [ParsingErrorClass, at]);
	  }
	  clearDeclarationError(index) {
	    this.declarationErrors.delete(index);
	  }
	  iterateErrors(iterator) {
	    this.declarationErrors.forEach(iterator);
	  }
	}
	class ExpressionScopeHandler {
	  constructor(parser) {
	    this.parser = void 0;
	    this.stack = [new ExpressionScope()];
	    this.parser = parser;
	  }
	  enter(scope) {
	    this.stack.push(scope);
	  }
	  exit() {
	    this.stack.pop();
	  }
	  recordParameterInitializerError(toParseError, node) {
	    const origin = node.loc.start;
	    const {
	      stack
	    } = this;
	    let i = stack.length - 1;
	    let scope = stack[i];
	    while (!scope.isCertainlyParameterDeclaration()) {
	      if (scope.canBeArrowParameterDeclaration()) {
	        scope.recordDeclarationError(toParseError, origin);
	      } else {
	        return;
	      }
	      scope = stack[--i];
	    }
	    this.parser.raise(toParseError, origin);
	  }
	  recordArrowParameterBindingError(error, node) {
	    const {
	      stack
	    } = this;
	    const scope = stack[stack.length - 1];
	    const origin = node.loc.start;
	    if (scope.isCertainlyParameterDeclaration()) {
	      this.parser.raise(error, origin);
	    } else if (scope.canBeArrowParameterDeclaration()) {
	      scope.recordDeclarationError(error, origin);
	    } else {
	      return;
	    }
	  }
	  recordAsyncArrowParametersError(at) {
	    const {
	      stack
	    } = this;
	    let i = stack.length - 1;
	    let scope = stack[i];
	    while (scope.canBeArrowParameterDeclaration()) {
	      if (scope.type === 2) {
	        scope.recordDeclarationError(Errors.AwaitBindingIdentifier, at);
	      }
	      scope = stack[--i];
	    }
	  }
	  validateAsPattern() {
	    const {
	      stack
	    } = this;
	    const currentScope = stack[stack.length - 1];
	    if (!currentScope.canBeArrowParameterDeclaration()) return;
	    currentScope.iterateErrors(([toParseError, loc]) => {
	      this.parser.raise(toParseError, loc);
	      let i = stack.length - 2;
	      let scope = stack[i];
	      while (scope.canBeArrowParameterDeclaration()) {
	        scope.clearDeclarationError(loc.index);
	        scope = stack[--i];
	      }
	    });
	  }
	}
	function newParameterDeclarationScope() {
	  return new ExpressionScope(3);
	}
	function newArrowHeadScope() {
	  return new ArrowHeadParsingScope(1);
	}
	function newAsyncArrowScope() {
	  return new ArrowHeadParsingScope(2);
	}
	function newExpressionScope() {
	  return new ExpressionScope();
	}
	class UtilParser extends Tokenizer {
	  addExtra(node, key, value, enumerable = true) {
	    if (!node) return;
	    let {
	      extra
	    } = node;
	    if (extra == null) {
	      extra = {};
	      node.extra = extra;
	    }
	    if (enumerable) {
	      extra[key] = value;
	    } else {
	      Object.defineProperty(extra, key, {
	        enumerable,
	        value
	      });
	    }
	  }
	  isContextual(token) {
	    return this.state.type === token && !this.state.containsEsc;
	  }
	  isUnparsedContextual(nameStart, name) {
	    const nameEnd = nameStart + name.length;
	    if (this.input.slice(nameStart, nameEnd) === name) {
	      const nextCh = this.input.charCodeAt(nameEnd);
	      return !(isIdentifierChar(nextCh) || (nextCh & 0xfc00) === 0xd800);
	    }
	    return false;
	  }
	  isLookaheadContextual(name) {
	    const next = this.nextTokenStart();
	    return this.isUnparsedContextual(next, name);
	  }
	  eatContextual(token) {
	    if (this.isContextual(token)) {
	      this.next();
	      return true;
	    }
	    return false;
	  }
	  expectContextual(token, toParseError) {
	    if (!this.eatContextual(token)) {
	      if (toParseError != null) {
	        throw this.raise(toParseError, this.state.startLoc);
	      }
	      this.unexpected(null, token);
	    }
	  }
	  canInsertSemicolon() {
	    return this.match(140) || this.match(8) || this.hasPrecedingLineBreak();
	  }
	  hasPrecedingLineBreak() {
	    return hasNewLine(this.input, this.offsetToSourcePos(this.state.lastTokEndLoc.index), this.state.start);
	  }
	  hasFollowingLineBreak() {
	    return hasNewLine(this.input, this.state.end, this.nextTokenStart());
	  }
	  isLineTerminator() {
	    return this.eat(13) || this.canInsertSemicolon();
	  }
	  semicolon(allowAsi = true) {
	    if (allowAsi ? this.isLineTerminator() : this.eat(13)) return;
	    this.raise(Errors.MissingSemicolon, this.state.lastTokEndLoc);
	  }
	  expect(type, loc) {
	    if (!this.eat(type)) {
	      this.unexpected(loc, type);
	    }
	  }
	  tryParse(fn, oldState = this.state.clone()) {
	    const abortSignal = {
	      node: null
	    };
	    try {
	      const node = fn((node = null) => {
	        abortSignal.node = node;
	        throw abortSignal;
	      });
	      if (this.state.errors.length > oldState.errors.length) {
	        const failState = this.state;
	        this.state = oldState;
	        this.state.tokensLength = failState.tokensLength;
	        return {
	          node,
	          error: failState.errors[oldState.errors.length],
	          thrown: false,
	          aborted: false,
	          failState
	        };
	      }
	      return {
	        node,
	        error: null,
	        thrown: false,
	        aborted: false,
	        failState: null
	      };
	    } catch (error) {
	      const failState = this.state;
	      this.state = oldState;
	      if (error instanceof SyntaxError) {
	        return {
	          node: null,
	          error,
	          thrown: true,
	          aborted: false,
	          failState
	        };
	      }
	      if (error === abortSignal) {
	        return {
	          node: abortSignal.node,
	          error: null,
	          thrown: false,
	          aborted: true,
	          failState
	        };
	      }
	      throw error;
	    }
	  }
	  checkExpressionErrors(refExpressionErrors, andThrow) {
	    if (!refExpressionErrors) return false;
	    const {
	      shorthandAssignLoc,
	      doubleProtoLoc,
	      privateKeyLoc,
	      optionalParametersLoc
	    } = refExpressionErrors;
	    const hasErrors = !!shorthandAssignLoc || !!doubleProtoLoc || !!optionalParametersLoc || !!privateKeyLoc;
	    if (!andThrow) {
	      return hasErrors;
	    }
	    if (shorthandAssignLoc != null) {
	      this.raise(Errors.InvalidCoverInitializedName, shorthandAssignLoc);
	    }
	    if (doubleProtoLoc != null) {
	      this.raise(Errors.DuplicateProto, doubleProtoLoc);
	    }
	    if (privateKeyLoc != null) {
	      this.raise(Errors.UnexpectedPrivateField, privateKeyLoc);
	    }
	    if (optionalParametersLoc != null) {
	      this.unexpected(optionalParametersLoc);
	    }
	  }
	  isLiteralPropertyName() {
	    return tokenIsLiteralPropertyName(this.state.type);
	  }
	  isPrivateName(node) {
	    return node.type === "PrivateName";
	  }
	  getPrivateNameSV(node) {
	    return node.id.name;
	  }
	  hasPropertyAsPrivateName(node) {
	    return (node.type === "MemberExpression" || node.type === "OptionalMemberExpression") && this.isPrivateName(node.property);
	  }
	  isObjectProperty(node) {
	    return node.type === "ObjectProperty";
	  }
	  isObjectMethod(node) {
	    return node.type === "ObjectMethod";
	  }
	  initializeScopes(inModule = this.options.sourceType === "module") {
	    const oldLabels = this.state.labels;
	    this.state.labels = [];
	    const oldExportedIdentifiers = this.exportedIdentifiers;
	    this.exportedIdentifiers = new Set();
	    const oldInModule = this.inModule;
	    this.inModule = inModule;
	    const oldScope = this.scope;
	    const ScopeHandler = this.getScopeHandler();
	    this.scope = new ScopeHandler(this, inModule);
	    const oldProdParam = this.prodParam;
	    this.prodParam = new ProductionParameterHandler();
	    const oldClassScope = this.classScope;
	    this.classScope = new ClassScopeHandler(this);
	    const oldExpressionScope = this.expressionScope;
	    this.expressionScope = new ExpressionScopeHandler(this);
	    return () => {
	      this.state.labels = oldLabels;
	      this.exportedIdentifiers = oldExportedIdentifiers;
	      this.inModule = oldInModule;
	      this.scope = oldScope;
	      this.prodParam = oldProdParam;
	      this.classScope = oldClassScope;
	      this.expressionScope = oldExpressionScope;
	    };
	  }
	  enterInitialScopes() {
	    let paramFlags = 0;
	    if (this.inModule) {
	      paramFlags |= 2;
	    }
	    if (this.optionFlags & 32) {
	      paramFlags |= 1;
	    }
	    this.scope.enter(1);
	    this.prodParam.enter(paramFlags);
	  }
	  checkDestructuringPrivate(refExpressionErrors) {
	    const {
	      privateKeyLoc
	    } = refExpressionErrors;
	    if (privateKeyLoc !== null) {
	      this.expectPlugin("destructuringPrivate", privateKeyLoc);
	    }
	  }
	}
	class ExpressionErrors {
	  constructor() {
	    this.shorthandAssignLoc = null;
	    this.doubleProtoLoc = null;
	    this.privateKeyLoc = null;
	    this.optionalParametersLoc = null;
	  }
	}
	class Node {
	  constructor(parser, pos, loc) {
	    this.type = "";
	    this.start = pos;
	    this.end = 0;
	    this.loc = new SourceLocation(loc);
	    if ((parser == null ? void 0 : parser.optionFlags) & 128) this.range = [pos, 0];
	    if (parser != null && parser.filename) this.loc.filename = parser.filename;
	  }
	}
	const NodePrototype = Node.prototype;
	{
	  NodePrototype.__clone = function () {
	    const newNode = new Node(undefined, this.start, this.loc.start);
	    const keys = Object.keys(this);
	    for (let i = 0, length = keys.length; i < length; i++) {
	      const key = keys[i];
	      if (key !== "leadingComments" && key !== "trailingComments" && key !== "innerComments") {
	        newNode[key] = this[key];
	      }
	    }
	    return newNode;
	  };
	}
	class NodeUtils extends UtilParser {
	  startNode() {
	    const loc = this.state.startLoc;
	    return new Node(this, loc.index, loc);
	  }
	  startNodeAt(loc) {
	    return new Node(this, loc.index, loc);
	  }
	  startNodeAtNode(type) {
	    return this.startNodeAt(type.loc.start);
	  }
	  finishNode(node, type) {
	    return this.finishNodeAt(node, type, this.state.lastTokEndLoc);
	  }
	  finishNodeAt(node, type, endLoc) {
	    node.type = type;
	    node.end = endLoc.index;
	    node.loc.end = endLoc;
	    if (this.optionFlags & 128) node.range[1] = endLoc.index;
	    if (this.optionFlags & 4096) {
	      this.processComment(node);
	    }
	    return node;
	  }
	  resetStartLocation(node, startLoc) {
	    node.start = startLoc.index;
	    node.loc.start = startLoc;
	    if (this.optionFlags & 128) node.range[0] = startLoc.index;
	  }
	  resetEndLocation(node, endLoc = this.state.lastTokEndLoc) {
	    node.end = endLoc.index;
	    node.loc.end = endLoc;
	    if (this.optionFlags & 128) node.range[1] = endLoc.index;
	  }
	  resetStartLocationFromNode(node, locationNode) {
	    this.resetStartLocation(node, locationNode.loc.start);
	  }
	  castNodeTo(node, type) {
	    node.type = type;
	    return node;
	  }
	  cloneIdentifier(node) {
	    const {
	      type,
	      start,
	      end,
	      loc,
	      range,
	      name
	    } = node;
	    const cloned = Object.create(NodePrototype);
	    cloned.type = type;
	    cloned.start = start;
	    cloned.end = end;
	    cloned.loc = loc;
	    cloned.range = range;
	    cloned.name = name;
	    if (node.extra) cloned.extra = node.extra;
	    return cloned;
	  }
	  cloneStringLiteral(node) {
	    const {
	      type,
	      start,
	      end,
	      loc,
	      range,
	      extra
	    } = node;
	    const cloned = Object.create(NodePrototype);
	    cloned.type = type;
	    cloned.start = start;
	    cloned.end = end;
	    cloned.loc = loc;
	    cloned.range = range;
	    cloned.extra = extra;
	    cloned.value = node.value;
	    return cloned;
	  }
	}
	const unwrapParenthesizedExpression = node => {
	  return node.type === "ParenthesizedExpression" ? unwrapParenthesizedExpression(node.expression) : node;
	};
	class LValParser extends NodeUtils {
	  toAssignable(node, isLHS = false) {
	    var _node$extra, _node$extra3;
	    let parenthesized = undefined;
	    if (node.type === "ParenthesizedExpression" || (_node$extra = node.extra) != null && _node$extra.parenthesized) {
	      parenthesized = unwrapParenthesizedExpression(node);
	      if (isLHS) {
	        if (parenthesized.type === "Identifier") {
	          this.expressionScope.recordArrowParameterBindingError(Errors.InvalidParenthesizedAssignment, node);
	        } else if (parenthesized.type !== "MemberExpression" && !this.isOptionalMemberExpression(parenthesized)) {
	          this.raise(Errors.InvalidParenthesizedAssignment, node);
	        }
	      } else {
	        this.raise(Errors.InvalidParenthesizedAssignment, node);
	      }
	    }
	    switch (node.type) {
	      case "Identifier":
	      case "ObjectPattern":
	      case "ArrayPattern":
	      case "AssignmentPattern":
	      case "RestElement":
	        break;
	      case "ObjectExpression":
	        this.castNodeTo(node, "ObjectPattern");
	        for (let i = 0, length = node.properties.length, last = length - 1; i < length; i++) {
	          var _node$extra2;
	          const prop = node.properties[i];
	          const isLast = i === last;
	          this.toAssignableObjectExpressionProp(prop, isLast, isLHS);
	          if (isLast && prop.type === "RestElement" && (_node$extra2 = node.extra) != null && _node$extra2.trailingCommaLoc) {
	            this.raise(Errors.RestTrailingComma, node.extra.trailingCommaLoc);
	          }
	        }
	        break;
	      case "ObjectProperty":
	        {
	          const {
	            key,
	            value
	          } = node;
	          if (this.isPrivateName(key)) {
	            this.classScope.usePrivateName(this.getPrivateNameSV(key), key.loc.start);
	          }
	          this.toAssignable(value, isLHS);
	          break;
	        }
	      case "SpreadElement":
	        {
	          throw new Error("Internal @babel/parser error (this is a bug, please report it)." + " SpreadElement should be converted by .toAssignable's caller.");
	        }
	      case "ArrayExpression":
	        this.castNodeTo(node, "ArrayPattern");
	        this.toAssignableList(node.elements, (_node$extra3 = node.extra) == null ? void 0 : _node$extra3.trailingCommaLoc, isLHS);
	        break;
	      case "AssignmentExpression":
	        if (node.operator !== "=") {
	          this.raise(Errors.MissingEqInAssignment, node.left.loc.end);
	        }
	        this.castNodeTo(node, "AssignmentPattern");
	        delete node.operator;
	        this.toAssignable(node.left, isLHS);
	        break;
	      case "ParenthesizedExpression":
	        this.toAssignable(parenthesized, isLHS);
	        break;
	    }
	  }
	  toAssignableObjectExpressionProp(prop, isLast, isLHS) {
	    if (prop.type === "ObjectMethod") {
	      this.raise(prop.kind === "get" || prop.kind === "set" ? Errors.PatternHasAccessor : Errors.PatternHasMethod, prop.key);
	    } else if (prop.type === "SpreadElement") {
	      this.castNodeTo(prop, "RestElement");
	      const arg = prop.argument;
	      this.checkToRestConversion(arg, false);
	      this.toAssignable(arg, isLHS);
	      if (!isLast) {
	        this.raise(Errors.RestTrailingComma, prop);
	      }
	    } else {
	      this.toAssignable(prop, isLHS);
	    }
	  }
	  toAssignableList(exprList, trailingCommaLoc, isLHS) {
	    const end = exprList.length - 1;
	    for (let i = 0; i <= end; i++) {
	      const elt = exprList[i];
	      if (!elt) continue;
	      this.toAssignableListItem(exprList, i, isLHS);
	      if (elt.type === "RestElement") {
	        if (i < end) {
	          this.raise(Errors.RestTrailingComma, elt);
	        } else if (trailingCommaLoc) {
	          this.raise(Errors.RestTrailingComma, trailingCommaLoc);
	        }
	      }
	    }
	  }
	  toAssignableListItem(exprList, index, isLHS) {
	    const node = exprList[index];
	    if (node.type === "SpreadElement") {
	      this.castNodeTo(node, "RestElement");
	      const arg = node.argument;
	      this.checkToRestConversion(arg, true);
	      this.toAssignable(arg, isLHS);
	    } else {
	      this.toAssignable(node, isLHS);
	    }
	  }
	  isAssignable(node, isBinding) {
	    switch (node.type) {
	      case "Identifier":
	      case "ObjectPattern":
	      case "ArrayPattern":
	      case "AssignmentPattern":
	      case "RestElement":
	        return true;
	      case "ObjectExpression":
	        {
	          const last = node.properties.length - 1;
	          return node.properties.every((prop, i) => {
	            return prop.type !== "ObjectMethod" && (i === last || prop.type !== "SpreadElement") && this.isAssignable(prop);
	          });
	        }
	      case "ObjectProperty":
	        return this.isAssignable(node.value);
	      case "SpreadElement":
	        return this.isAssignable(node.argument);
	      case "ArrayExpression":
	        return node.elements.every(element => element === null || this.isAssignable(element));
	      case "AssignmentExpression":
	        return node.operator === "=";
	      case "ParenthesizedExpression":
	        return this.isAssignable(node.expression);
	      case "MemberExpression":
	      case "OptionalMemberExpression":
	        return !isBinding;
	      default:
	        return false;
	    }
	  }
	  toReferencedList(exprList, isParenthesizedExpr) {
	    return exprList;
	  }
	  toReferencedListDeep(exprList, isParenthesizedExpr) {
	    this.toReferencedList(exprList, isParenthesizedExpr);
	    for (const expr of exprList) {
	      if ((expr == null ? void 0 : expr.type) === "ArrayExpression") {
	        this.toReferencedListDeep(expr.elements);
	      }
	    }
	  }
	  parseSpread(refExpressionErrors) {
	    const node = this.startNode();
	    this.next();
	    node.argument = this.parseMaybeAssignAllowIn(refExpressionErrors, undefined);
	    return this.finishNode(node, "SpreadElement");
	  }
	  parseRestBinding() {
	    const node = this.startNode();
	    this.next();
	    node.argument = this.parseBindingAtom();
	    return this.finishNode(node, "RestElement");
	  }
	  parseBindingAtom() {
	    switch (this.state.type) {
	      case 0:
	        {
	          const node = this.startNode();
	          this.next();
	          node.elements = this.parseBindingList(3, 93, 1);
	          return this.finishNode(node, "ArrayPattern");
	        }
	      case 5:
	        return this.parseObjectLike(8, true);
	    }
	    return this.parseIdentifier();
	  }
	  parseBindingList(close, closeCharCode, flags) {
	    const allowEmpty = flags & 1;
	    const elts = [];
	    let first = true;
	    while (!this.eat(close)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(12);
	      }
	      if (allowEmpty && this.match(12)) {
	        elts.push(null);
	      } else if (this.eat(close)) {
	        break;
	      } else if (this.match(21)) {
	        let rest = this.parseRestBinding();
	        if (this.hasPlugin("flow") || flags & 2) {
	          rest = this.parseFunctionParamType(rest);
	        }
	        elts.push(rest);
	        if (!this.checkCommaAfterRest(closeCharCode)) {
	          this.expect(close);
	          break;
	        }
	      } else {
	        const decorators = [];
	        if (flags & 2) {
	          if (this.match(26) && this.hasPlugin("decorators")) {
	            this.raise(Errors.UnsupportedParameterDecorator, this.state.startLoc);
	          }
	          while (this.match(26)) {
	            decorators.push(this.parseDecorator());
	          }
	        }
	        elts.push(this.parseBindingElement(flags, decorators));
	      }
	    }
	    return elts;
	  }
	  parseBindingRestProperty(prop) {
	    this.next();
	    prop.argument = this.parseIdentifier();
	    this.checkCommaAfterRest(125);
	    return this.finishNode(prop, "RestElement");
	  }
	  parseBindingProperty() {
	    const {
	      type,
	      startLoc
	    } = this.state;
	    if (type === 21) {
	      return this.parseBindingRestProperty(this.startNode());
	    }
	    const prop = this.startNode();
	    if (type === 139) {
	      this.expectPlugin("destructuringPrivate", startLoc);
	      this.classScope.usePrivateName(this.state.value, startLoc);
	      prop.key = this.parsePrivateName();
	    } else {
	      this.parsePropertyName(prop);
	    }
	    prop.method = false;
	    return this.parseObjPropValue(prop, startLoc, false, false, true, false);
	  }
	  parseBindingElement(flags, decorators) {
	    const left = this.parseMaybeDefault();
	    if (this.hasPlugin("flow") || flags & 2) {
	      this.parseFunctionParamType(left);
	    }
	    if (decorators.length) {
	      left.decorators = decorators;
	      this.resetStartLocationFromNode(left, decorators[0]);
	    }
	    const elt = this.parseMaybeDefault(left.loc.start, left);
	    return elt;
	  }
	  parseFunctionParamType(param) {
	    return param;
	  }
	  parseMaybeDefault(startLoc, left) {
	    startLoc != null ? startLoc : startLoc = this.state.startLoc;
	    left = left != null ? left : this.parseBindingAtom();
	    if (!this.eat(29)) return left;
	    const node = this.startNodeAt(startLoc);
	    node.left = left;
	    node.right = this.parseMaybeAssignAllowIn();
	    return this.finishNode(node, "AssignmentPattern");
	  }
	  isValidLVal(type, isUnparenthesizedInAssign, binding) {
	    switch (type) {
	      case "AssignmentPattern":
	        return "left";
	      case "RestElement":
	        return "argument";
	      case "ObjectProperty":
	        return "value";
	      case "ParenthesizedExpression":
	        return "expression";
	      case "ArrayPattern":
	        return "elements";
	      case "ObjectPattern":
	        return "properties";
	    }
	    return false;
	  }
	  isOptionalMemberExpression(expression) {
	    return expression.type === "OptionalMemberExpression";
	  }
	  checkLVal(expression, ancestor, binding = 64, checkClashes = false, strictModeChanged = false, hasParenthesizedAncestor = false) {
	    var _expression$extra;
	    const type = expression.type;
	    if (this.isObjectMethod(expression)) return;
	    const isOptionalMemberExpression = this.isOptionalMemberExpression(expression);
	    if (isOptionalMemberExpression || type === "MemberExpression") {
	      if (isOptionalMemberExpression) {
	        this.expectPlugin("optionalChainingAssign", expression.loc.start);
	        if (ancestor.type !== "AssignmentExpression") {
	          this.raise(Errors.InvalidLhsOptionalChaining, expression, {
	            ancestor
	          });
	        }
	      }
	      if (binding !== 64) {
	        this.raise(Errors.InvalidPropertyBindingPattern, expression);
	      }
	      return;
	    }
	    if (type === "Identifier") {
	      this.checkIdentifier(expression, binding, strictModeChanged);
	      const {
	        name
	      } = expression;
	      if (checkClashes) {
	        if (checkClashes.has(name)) {
	          this.raise(Errors.ParamDupe, expression);
	        } else {
	          checkClashes.add(name);
	        }
	      }
	      return;
	    }
	    const validity = this.isValidLVal(type, !(hasParenthesizedAncestor || (_expression$extra = expression.extra) != null && _expression$extra.parenthesized) && ancestor.type === "AssignmentExpression", binding);
	    if (validity === true) return;
	    if (validity === false) {
	      const ParseErrorClass = binding === 64 ? Errors.InvalidLhs : Errors.InvalidLhsBinding;
	      this.raise(ParseErrorClass, expression, {
	        ancestor
	      });
	      return;
	    }
	    let key, isParenthesizedExpression;
	    if (typeof validity === "string") {
	      key = validity;
	      isParenthesizedExpression = type === "ParenthesizedExpression";
	    } else {
	      [key, isParenthesizedExpression] = validity;
	    }
	    const nextAncestor = type === "ArrayPattern" || type === "ObjectPattern" ? {
	      type
	    } : ancestor;
	    const val = expression[key];
	    if (Array.isArray(val)) {
	      for (const child of val) {
	        if (child) {
	          this.checkLVal(child, nextAncestor, binding, checkClashes, strictModeChanged, isParenthesizedExpression);
	        }
	      }
	    } else if (val) {
	      this.checkLVal(val, nextAncestor, binding, checkClashes, strictModeChanged, isParenthesizedExpression);
	    }
	  }
	  checkIdentifier(at, bindingType, strictModeChanged = false) {
	    if (this.state.strict && (strictModeChanged ? isStrictBindReservedWord(at.name, this.inModule) : isStrictBindOnlyReservedWord(at.name))) {
	      if (bindingType === 64) {
	        this.raise(Errors.StrictEvalArguments, at, {
	          referenceName: at.name
	        });
	      } else {
	        this.raise(Errors.StrictEvalArgumentsBinding, at, {
	          bindingName: at.name
	        });
	      }
	    }
	    if (bindingType & 8192 && at.name === "let") {
	      this.raise(Errors.LetInLexicalBinding, at);
	    }
	    if (!(bindingType & 64)) {
	      this.declareNameFromIdentifier(at, bindingType);
	    }
	  }
	  declareNameFromIdentifier(identifier, binding) {
	    this.scope.declareName(identifier.name, binding, identifier.loc.start);
	  }
	  checkToRestConversion(node, allowPattern) {
	    switch (node.type) {
	      case "ParenthesizedExpression":
	        this.checkToRestConversion(node.expression, allowPattern);
	        break;
	      case "Identifier":
	      case "MemberExpression":
	        break;
	      case "ArrayExpression":
	      case "ObjectExpression":
	        if (allowPattern) break;
	      default:
	        this.raise(Errors.InvalidRestAssignmentPattern, node);
	    }
	  }
	  checkCommaAfterRest(close) {
	    if (!this.match(12)) {
	      return false;
	    }
	    this.raise(this.lookaheadCharCode() === close ? Errors.RestTrailingComma : Errors.ElementAfterRest, this.state.startLoc);
	    return true;
	  }
	}
	function nonNull(x) {
	  if (x == null) {
	    throw new Error(`Unexpected ${x} value.`);
	  }
	  return x;
	}
	function assert(x) {
	  if (!x) {
	    throw new Error("Assert fail");
	  }
	}
	const TSErrors = ParseErrorEnum`typescript`({
	  AbstractMethodHasImplementation: ({
	    methodName
	  }) => `Method '${methodName}' cannot have an implementation because it is marked abstract.`,
	  AbstractPropertyHasInitializer: ({
	    propertyName
	  }) => `Property '${propertyName}' cannot have an initializer because it is marked abstract.`,
	  AccessorCannotBeOptional: "An 'accessor' property cannot be declared optional.",
	  AccessorCannotDeclareThisParameter: "'get' and 'set' accessors cannot declare 'this' parameters.",
	  AccessorCannotHaveTypeParameters: "An accessor cannot have type parameters.",
	  ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier.",
	  ClassMethodHasReadonly: "Class methods cannot have the 'readonly' modifier.",
	  ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference: "A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.",
	  ConstructorHasTypeParameters: "Type parameters cannot appear on a constructor declaration.",
	  DeclareAccessor: ({
	    kind
	  }) => `'declare' is not allowed in ${kind}ters.`,
	  DeclareClassFieldHasInitializer: "Initializers are not allowed in ambient contexts.",
	  DeclareFunctionHasImplementation: "An implementation cannot be declared in ambient contexts.",
	  DuplicateAccessibilityModifier: ({
	    modifier
	  }) => `Accessibility modifier already seen: '${modifier}'.`,
	  DuplicateModifier: ({
	    modifier
	  }) => `Duplicate modifier: '${modifier}'.`,
	  EmptyHeritageClauseType: ({
	    token
	  }) => `'${token}' list cannot be empty.`,
	  EmptyTypeArguments: "Type argument list cannot be empty.",
	  EmptyTypeParameters: "Type parameter list cannot be empty.",
	  ExpectedAmbientAfterExportDeclare: "'export declare' must be followed by an ambient declaration.",
	  ImportAliasHasImportType: "An import alias can not use 'import type'.",
	  ImportReflectionHasImportType: "An `import module` declaration can not use `type` modifier",
	  IncompatibleModifiers: ({
	    modifiers
	  }) => `'${modifiers[0]}' modifier cannot be used with '${modifiers[1]}' modifier.`,
	  IndexSignatureHasAbstract: "Index signatures cannot have the 'abstract' modifier.",
	  IndexSignatureHasAccessibility: ({
	    modifier
	  }) => `Index signatures cannot have an accessibility modifier ('${modifier}').`,
	  IndexSignatureHasDeclare: "Index signatures cannot have the 'declare' modifier.",
	  IndexSignatureHasOverride: "'override' modifier cannot appear on an index signature.",
	  IndexSignatureHasStatic: "Index signatures cannot have the 'static' modifier.",
	  InitializerNotAllowedInAmbientContext: "Initializers are not allowed in ambient contexts.",
	  InvalidHeritageClauseType: ({
	    token
	  }) => `'${token}' list can only include identifiers or qualified-names with optional type arguments.`,
	  InvalidModifierOnAwaitUsingDeclaration: modifier => `'${modifier}' modifier cannot appear on an await using declaration.`,
	  InvalidModifierOnTypeMember: ({
	    modifier
	  }) => `'${modifier}' modifier cannot appear on a type member.`,
	  InvalidModifierOnTypeParameter: ({
	    modifier
	  }) => `'${modifier}' modifier cannot appear on a type parameter.`,
	  InvalidModifierOnTypeParameterPositions: ({
	    modifier
	  }) => `'${modifier}' modifier can only appear on a type parameter of a class, interface or type alias.`,
	  InvalidModifierOnUsingDeclaration: modifier => `'${modifier}' modifier cannot appear on a using declaration.`,
	  InvalidModifiersOrder: ({
	    orderedModifiers
	  }) => `'${orderedModifiers[0]}' modifier must precede '${orderedModifiers[1]}' modifier.`,
	  InvalidPropertyAccessAfterInstantiationExpression: "Invalid property access after an instantiation expression. " + "You can either wrap the instantiation expression in parentheses, or delete the type arguments.",
	  InvalidTupleMemberLabel: "Tuple members must be labeled with a simple identifier.",
	  MissingInterfaceName: "'interface' declarations must be followed by an identifier.",
	  NonAbstractClassHasAbstractMethod: "Abstract methods can only appear within an abstract class.",
	  NonClassMethodPropertyHasAbstractModifier: "'abstract' modifier can only appear on a class, method, or property declaration.",
	  OptionalTypeBeforeRequired: "A required element cannot follow an optional element.",
	  OverrideNotInSubClass: "This member cannot have an 'override' modifier because its containing class does not extend another class.",
	  PatternIsOptional: "A binding pattern parameter cannot be optional in an implementation signature.",
	  PrivateElementHasAbstract: "Private elements cannot have the 'abstract' modifier.",
	  PrivateElementHasAccessibility: ({
	    modifier
	  }) => `Private elements cannot have an accessibility modifier ('${modifier}').`,
	  ReadonlyForMethodSignature: "'readonly' modifier can only appear on a property declaration or index signature.",
	  ReservedArrowTypeParam: "This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`.",
	  ReservedTypeAssertion: "This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead.",
	  SetAccessorCannotHaveOptionalParameter: "A 'set' accessor cannot have an optional parameter.",
	  SetAccessorCannotHaveRestParameter: "A 'set' accessor cannot have rest parameter.",
	  SetAccessorCannotHaveReturnType: "A 'set' accessor cannot have a return type annotation.",
	  SingleTypeParameterWithoutTrailingComma: ({
	    typeParameterName
	  }) => `Single type parameter ${typeParameterName} should have a trailing comma. Example usage: <${typeParameterName},>.`,
	  StaticBlockCannotHaveModifier: "Static class blocks cannot have any modifier.",
	  TupleOptionalAfterType: "A labeled tuple optional element must be declared using a question mark after the name and before the colon (`name?: type`), rather than after the type (`name: type?`).",
	  TypeAnnotationAfterAssign: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
	  TypeImportCannotSpecifyDefaultAndNamed: "A type-only import can specify a default import or named bindings, but not both.",
	  TypeModifierIsUsedInTypeExports: "The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement.",
	  TypeModifierIsUsedInTypeImports: "The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement.",
	  UnexpectedParameterModifier: "A parameter property is only allowed in a constructor implementation.",
	  UnexpectedReadonly: "'readonly' type modifier is only permitted on array and tuple literal types.",
	  UnexpectedTypeAnnotation: "Did not expect a type annotation here.",
	  UnexpectedTypeCastInParameter: "Unexpected type cast in parameter position.",
	  UnsupportedImportTypeArgument: "Argument in a type import must be a string literal.",
	  UnsupportedParameterPropertyKind: "A parameter property may not be declared using a binding pattern.",
	  UnsupportedSignatureParameterKind: ({
	    type
	  }) => `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${type}.`
	});
	function keywordTypeFromName(value) {
	  switch (value) {
	    case "any":
	      return "TSAnyKeyword";
	    case "boolean":
	      return "TSBooleanKeyword";
	    case "bigint":
	      return "TSBigIntKeyword";
	    case "never":
	      return "TSNeverKeyword";
	    case "number":
	      return "TSNumberKeyword";
	    case "object":
	      return "TSObjectKeyword";
	    case "string":
	      return "TSStringKeyword";
	    case "symbol":
	      return "TSSymbolKeyword";
	    case "undefined":
	      return "TSUndefinedKeyword";
	    case "unknown":
	      return "TSUnknownKeyword";
	    default:
	      return undefined;
	  }
	}
	function tsIsAccessModifier(modifier) {
	  return modifier === "private" || modifier === "public" || modifier === "protected";
	}
	function tsIsVarianceAnnotations(modifier) {
	  return modifier === "in" || modifier === "out";
	}
	var typescript = superClass => class TypeScriptParserMixin extends superClass {
	  constructor(...args) {
	    super(...args);
	    this.tsParseInOutModifiers = this.tsParseModifiers.bind(this, {
	      allowedModifiers: ["in", "out"],
	      disallowedModifiers: ["const", "public", "private", "protected", "readonly", "declare", "abstract", "override"],
	      errorTemplate: TSErrors.InvalidModifierOnTypeParameter
	    });
	    this.tsParseConstModifier = this.tsParseModifiers.bind(this, {
	      allowedModifiers: ["const"],
	      disallowedModifiers: ["in", "out"],
	      errorTemplate: TSErrors.InvalidModifierOnTypeParameterPositions
	    });
	    this.tsParseInOutConstModifiers = this.tsParseModifiers.bind(this, {
	      allowedModifiers: ["in", "out", "const"],
	      disallowedModifiers: ["public", "private", "protected", "readonly", "declare", "abstract", "override"],
	      errorTemplate: TSErrors.InvalidModifierOnTypeParameter
	    });
	  }
	  getScopeHandler() {
	    return TypeScriptScopeHandler;
	  }
	  tsIsIdentifier() {
	    return tokenIsIdentifier(this.state.type);
	  }
	  tsTokenCanFollowModifier() {
	    return this.match(0) || this.match(5) || this.match(55) || this.match(21) || this.match(139) || this.isLiteralPropertyName();
	  }
	  tsNextTokenOnSameLineAndCanFollowModifier() {
	    this.next();
	    if (this.hasPrecedingLineBreak()) {
	      return false;
	    }
	    return this.tsTokenCanFollowModifier();
	  }
	  tsNextTokenCanFollowModifier() {
	    if (this.match(106)) {
	      this.next();
	      return this.tsTokenCanFollowModifier();
	    }
	    return this.tsNextTokenOnSameLineAndCanFollowModifier();
	  }
	  tsParseModifier(allowedModifiers, stopOnStartOfClassStaticBlock, hasSeenStaticModifier) {
	    if (!tokenIsIdentifier(this.state.type) && this.state.type !== 58 && this.state.type !== 75) {
	      return undefined;
	    }
	    const modifier = this.state.value;
	    if (allowedModifiers.includes(modifier)) {
	      if (hasSeenStaticModifier && this.match(106)) {
	        return undefined;
	      }
	      if (stopOnStartOfClassStaticBlock && this.tsIsStartOfStaticBlocks()) {
	        return undefined;
	      }
	      if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this))) {
	        return modifier;
	      }
	    }
	    return undefined;
	  }
	  tsParseModifiers({
	    allowedModifiers,
	    disallowedModifiers,
	    stopOnStartOfClassStaticBlock,
	    errorTemplate = TSErrors.InvalidModifierOnTypeMember
	  }, modified) {
	    const enforceOrder = (loc, modifier, before, after) => {
	      if (modifier === before && modified[after]) {
	        this.raise(TSErrors.InvalidModifiersOrder, loc, {
	          orderedModifiers: [before, after]
	        });
	      }
	    };
	    const incompatible = (loc, modifier, mod1, mod2) => {
	      if (modified[mod1] && modifier === mod2 || modified[mod2] && modifier === mod1) {
	        this.raise(TSErrors.IncompatibleModifiers, loc, {
	          modifiers: [mod1, mod2]
	        });
	      }
	    };
	    for (;;) {
	      const {
	        startLoc
	      } = this.state;
	      const modifier = this.tsParseModifier(allowedModifiers.concat(disallowedModifiers != null ? disallowedModifiers : []), stopOnStartOfClassStaticBlock, modified.static);
	      if (!modifier) break;
	      if (tsIsAccessModifier(modifier)) {
	        if (modified.accessibility) {
	          this.raise(TSErrors.DuplicateAccessibilityModifier, startLoc, {
	            modifier
	          });
	        } else {
	          enforceOrder(startLoc, modifier, modifier, "override");
	          enforceOrder(startLoc, modifier, modifier, "static");
	          enforceOrder(startLoc, modifier, modifier, "readonly");
	          modified.accessibility = modifier;
	        }
	      } else if (tsIsVarianceAnnotations(modifier)) {
	        if (modified[modifier]) {
	          this.raise(TSErrors.DuplicateModifier, startLoc, {
	            modifier
	          });
	        }
	        modified[modifier] = true;
	        enforceOrder(startLoc, modifier, "in", "out");
	      } else {
	        if (hasOwnProperty.call(modified, modifier)) {
	          this.raise(TSErrors.DuplicateModifier, startLoc, {
	            modifier
	          });
	        } else {
	          enforceOrder(startLoc, modifier, "static", "readonly");
	          enforceOrder(startLoc, modifier, "static", "override");
	          enforceOrder(startLoc, modifier, "override", "readonly");
	          enforceOrder(startLoc, modifier, "abstract", "override");
	          incompatible(startLoc, modifier, "declare", "override");
	          incompatible(startLoc, modifier, "static", "abstract");
	        }
	        modified[modifier] = true;
	      }
	      if (disallowedModifiers != null && disallowedModifiers.includes(modifier)) {
	        this.raise(errorTemplate, startLoc, {
	          modifier
	        });
	      }
	    }
	  }
	  tsIsListTerminator(kind) {
	    switch (kind) {
	      case "EnumMembers":
	      case "TypeMembers":
	        return this.match(8);
	      case "HeritageClauseElement":
	        return this.match(5);
	      case "TupleElementTypes":
	        return this.match(3);
	      case "TypeParametersOrArguments":
	        return this.match(48);
	    }
	  }
	  tsParseList(kind, parseElement) {
	    const result = [];
	    while (!this.tsIsListTerminator(kind)) {
	      result.push(parseElement());
	    }
	    return result;
	  }
	  tsParseDelimitedList(kind, parseElement, refTrailingCommaPos) {
	    return nonNull(this.tsParseDelimitedListWorker(kind, parseElement, true, refTrailingCommaPos));
	  }
	  tsParseDelimitedListWorker(kind, parseElement, expectSuccess, refTrailingCommaPos) {
	    const result = [];
	    let trailingCommaPos = -1;
	    for (;;) {
	      if (this.tsIsListTerminator(kind)) {
	        break;
	      }
	      trailingCommaPos = -1;
	      const element = parseElement();
	      if (element == null) {
	        return undefined;
	      }
	      result.push(element);
	      if (this.eat(12)) {
	        trailingCommaPos = this.state.lastTokStartLoc.index;
	        continue;
	      }
	      if (this.tsIsListTerminator(kind)) {
	        break;
	      }
	      if (expectSuccess) {
	        this.expect(12);
	      }
	      return undefined;
	    }
	    if (refTrailingCommaPos) {
	      refTrailingCommaPos.value = trailingCommaPos;
	    }
	    return result;
	  }
	  tsParseBracketedList(kind, parseElement, bracket, skipFirstToken, refTrailingCommaPos) {
	    if (!skipFirstToken) {
	      if (bracket) {
	        this.expect(0);
	      } else {
	        this.expect(47);
	      }
	    }
	    const result = this.tsParseDelimitedList(kind, parseElement, refTrailingCommaPos);
	    if (bracket) {
	      this.expect(3);
	    } else {
	      this.expect(48);
	    }
	    return result;
	  }
	  tsParseImportType() {
	    const node = this.startNode();
	    this.expect(83);
	    this.expect(10);
	    if (!this.match(134)) {
	      this.raise(TSErrors.UnsupportedImportTypeArgument, this.state.startLoc);
	      {
	        node.argument = super.parseExprAtom();
	      }
	    } else {
	      {
	        node.argument = this.parseStringLiteral(this.state.value);
	      }
	    }
	    if (this.eat(12)) {
	      node.options = this.tsParseImportTypeOptions();
	    } else {
	      node.options = null;
	    }
	    this.expect(11);
	    if (this.eat(16)) {
	      node.qualifier = this.tsParseEntityName(1 | 2);
	    }
	    if (this.match(47)) {
	      {
	        node.typeParameters = this.tsParseTypeArguments();
	      }
	    }
	    return this.finishNode(node, "TSImportType");
	  }
	  tsParseImportTypeOptions() {
	    const node = this.startNode();
	    this.expect(5);
	    const withProperty = this.startNode();
	    if (this.isContextual(76)) {
	      withProperty.method = false;
	      withProperty.key = this.parseIdentifier(true);
	      withProperty.computed = false;
	      withProperty.shorthand = false;
	    } else {
	      this.unexpected(null, 76);
	    }
	    this.expect(14);
	    withProperty.value = this.tsParseImportTypeWithPropertyValue();
	    node.properties = [this.finishObjectProperty(withProperty)];
	    this.expect(8);
	    return this.finishNode(node, "ObjectExpression");
	  }
	  tsParseImportTypeWithPropertyValue() {
	    const node = this.startNode();
	    const properties = [];
	    this.expect(5);
	    while (!this.match(8)) {
	      const type = this.state.type;
	      if (tokenIsIdentifier(type) || type === 134) {
	        properties.push(super.parsePropertyDefinition(null));
	      } else {
	        this.unexpected();
	      }
	      this.eat(12);
	    }
	    node.properties = properties;
	    this.next();
	    return this.finishNode(node, "ObjectExpression");
	  }
	  tsParseEntityName(flags) {
	    let entity;
	    if (flags & 1 && this.match(78)) {
	      if (flags & 2) {
	        entity = this.parseIdentifier(true);
	      } else {
	        const node = this.startNode();
	        this.next();
	        entity = this.finishNode(node, "ThisExpression");
	      }
	    } else {
	      entity = this.parseIdentifier(!!(flags & 1));
	    }
	    while (this.eat(16)) {
	      const node = this.startNodeAtNode(entity);
	      node.left = entity;
	      node.right = this.parseIdentifier(!!(flags & 1));
	      entity = this.finishNode(node, "TSQualifiedName");
	    }
	    return entity;
	  }
	  tsParseTypeReference() {
	    const node = this.startNode();
	    node.typeName = this.tsParseEntityName(1);
	    if (!this.hasPrecedingLineBreak() && this.match(47)) {
	      {
	        node.typeParameters = this.tsParseTypeArguments();
	      }
	    }
	    return this.finishNode(node, "TSTypeReference");
	  }
	  tsParseThisTypePredicate(lhs) {
	    this.next();
	    const node = this.startNodeAtNode(lhs);
	    node.parameterName = lhs;
	    node.typeAnnotation = this.tsParseTypeAnnotation(false);
	    node.asserts = false;
	    return this.finishNode(node, "TSTypePredicate");
	  }
	  tsParseThisTypeNode() {
	    const node = this.startNode();
	    this.next();
	    return this.finishNode(node, "TSThisType");
	  }
	  tsParseTypeQuery() {
	    const node = this.startNode();
	    this.expect(87);
	    if (this.match(83)) {
	      node.exprName = this.tsParseImportType();
	    } else {
	      {
	        node.exprName = this.tsParseEntityName(1 | 2);
	      }
	    }
	    if (!this.hasPrecedingLineBreak() && this.match(47)) {
	      {
	        node.typeParameters = this.tsParseTypeArguments();
	      }
	    }
	    return this.finishNode(node, "TSTypeQuery");
	  }
	  tsParseTypeParameter(parseModifiers) {
	    const node = this.startNode();
	    parseModifiers(node);
	    node.name = this.tsParseTypeParameterName();
	    node.constraint = this.tsEatThenParseType(81);
	    node.default = this.tsEatThenParseType(29);
	    return this.finishNode(node, "TSTypeParameter");
	  }
	  tsTryParseTypeParameters(parseModifiers) {
	    if (this.match(47)) {
	      return this.tsParseTypeParameters(parseModifiers);
	    }
	  }
	  tsParseTypeParameters(parseModifiers) {
	    const node = this.startNode();
	    if (this.match(47) || this.match(143)) {
	      this.next();
	    } else {
	      this.unexpected();
	    }
	    const refTrailingCommaPos = {
	      value: -1
	    };
	    node.params = this.tsParseBracketedList("TypeParametersOrArguments", this.tsParseTypeParameter.bind(this, parseModifiers), false, true, refTrailingCommaPos);
	    if (node.params.length === 0) {
	      this.raise(TSErrors.EmptyTypeParameters, node);
	    }
	    if (refTrailingCommaPos.value !== -1) {
	      this.addExtra(node, "trailingComma", refTrailingCommaPos.value);
	    }
	    return this.finishNode(node, "TSTypeParameterDeclaration");
	  }
	  tsFillSignature(returnToken, signature) {
	    const returnTokenRequired = returnToken === 19;
	    const paramsKey = "parameters";
	    const returnTypeKey = "typeAnnotation";
	    signature.typeParameters = this.tsTryParseTypeParameters(this.tsParseConstModifier);
	    this.expect(10);
	    signature[paramsKey] = this.tsParseBindingListForSignature();
	    if (returnTokenRequired) {
	      signature[returnTypeKey] = this.tsParseTypeOrTypePredicateAnnotation(returnToken);
	    } else if (this.match(returnToken)) {
	      signature[returnTypeKey] = this.tsParseTypeOrTypePredicateAnnotation(returnToken);
	    }
	  }
	  tsParseBindingListForSignature() {
	    const list = super.parseBindingList(11, 41, 2);
	    for (const pattern of list) {
	      const {
	        type
	      } = pattern;
	      if (type === "AssignmentPattern" || type === "TSParameterProperty") {
	        this.raise(TSErrors.UnsupportedSignatureParameterKind, pattern, {
	          type
	        });
	      }
	    }
	    return list;
	  }
	  tsParseTypeMemberSemicolon() {
	    if (!this.eat(12) && !this.isLineTerminator()) {
	      this.expect(13);
	    }
	  }
	  tsParseSignatureMember(kind, node) {
	    this.tsFillSignature(14, node);
	    this.tsParseTypeMemberSemicolon();
	    return this.finishNode(node, kind);
	  }
	  tsIsUnambiguouslyIndexSignature() {
	    this.next();
	    if (tokenIsIdentifier(this.state.type)) {
	      this.next();
	      return this.match(14);
	    }
	    return false;
	  }
	  tsTryParseIndexSignature(node) {
	    if (!(this.match(0) && this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this)))) {
	      return;
	    }
	    this.expect(0);
	    const id = this.parseIdentifier();
	    id.typeAnnotation = this.tsParseTypeAnnotation();
	    this.resetEndLocation(id);
	    this.expect(3);
	    node.parameters = [id];
	    const type = this.tsTryParseTypeAnnotation();
	    if (type) node.typeAnnotation = type;
	    this.tsParseTypeMemberSemicolon();
	    return this.finishNode(node, "TSIndexSignature");
	  }
	  tsParsePropertyOrMethodSignature(node, readonly) {
	    if (this.eat(17)) node.optional = true;
	    if (this.match(10) || this.match(47)) {
	      if (readonly) {
	        this.raise(TSErrors.ReadonlyForMethodSignature, node);
	      }
	      const method = node;
	      if (method.kind && this.match(47)) {
	        this.raise(TSErrors.AccessorCannotHaveTypeParameters, this.state.curPosition());
	      }
	      this.tsFillSignature(14, method);
	      this.tsParseTypeMemberSemicolon();
	      const paramsKey = "parameters";
	      const returnTypeKey = "typeAnnotation";
	      if (method.kind === "get") {
	        if (method[paramsKey].length > 0) {
	          this.raise(Errors.BadGetterArity, this.state.curPosition());
	          if (this.isThisParam(method[paramsKey][0])) {
	            this.raise(TSErrors.AccessorCannotDeclareThisParameter, this.state.curPosition());
	          }
	        }
	      } else if (method.kind === "set") {
	        if (method[paramsKey].length !== 1) {
	          this.raise(Errors.BadSetterArity, this.state.curPosition());
	        } else {
	          const firstParameter = method[paramsKey][0];
	          if (this.isThisParam(firstParameter)) {
	            this.raise(TSErrors.AccessorCannotDeclareThisParameter, this.state.curPosition());
	          }
	          if (firstParameter.type === "Identifier" && firstParameter.optional) {
	            this.raise(TSErrors.SetAccessorCannotHaveOptionalParameter, this.state.curPosition());
	          }
	          if (firstParameter.type === "RestElement") {
	            this.raise(TSErrors.SetAccessorCannotHaveRestParameter, this.state.curPosition());
	          }
	        }
	        if (method[returnTypeKey]) {
	          this.raise(TSErrors.SetAccessorCannotHaveReturnType, method[returnTypeKey]);
	        }
	      } else {
	        method.kind = "method";
	      }
	      return this.finishNode(method, "TSMethodSignature");
	    } else {
	      const property = node;
	      if (readonly) property.readonly = true;
	      const type = this.tsTryParseTypeAnnotation();
	      if (type) property.typeAnnotation = type;
	      this.tsParseTypeMemberSemicolon();
	      return this.finishNode(property, "TSPropertySignature");
	    }
	  }
	  tsParseTypeMember() {
	    const node = this.startNode();
	    if (this.match(10) || this.match(47)) {
	      return this.tsParseSignatureMember("TSCallSignatureDeclaration", node);
	    }
	    if (this.match(77)) {
	      const id = this.startNode();
	      this.next();
	      if (this.match(10) || this.match(47)) {
	        return this.tsParseSignatureMember("TSConstructSignatureDeclaration", node);
	      } else {
	        node.key = this.createIdentifier(id, "new");
	        return this.tsParsePropertyOrMethodSignature(node, false);
	      }
	    }
	    this.tsParseModifiers({
	      allowedModifiers: ["readonly"],
	      disallowedModifiers: ["declare", "abstract", "private", "protected", "public", "static", "override"]
	    }, node);
	    const idx = this.tsTryParseIndexSignature(node);
	    if (idx) {
	      return idx;
	    }
	    super.parsePropertyName(node);
	    if (!node.computed && node.key.type === "Identifier" && (node.key.name === "get" || node.key.name === "set") && this.tsTokenCanFollowModifier()) {
	      node.kind = node.key.name;
	      super.parsePropertyName(node);
	      if (!this.match(10) && !this.match(47)) {
	        this.unexpected(null, 10);
	      }
	    }
	    return this.tsParsePropertyOrMethodSignature(node, !!node.readonly);
	  }
	  tsParseTypeLiteral() {
	    const node = this.startNode();
	    node.members = this.tsParseObjectTypeMembers();
	    return this.finishNode(node, "TSTypeLiteral");
	  }
	  tsParseObjectTypeMembers() {
	    this.expect(5);
	    const members = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
	    this.expect(8);
	    return members;
	  }
	  tsIsStartOfMappedType() {
	    this.next();
	    if (this.eat(53)) {
	      return this.isContextual(122);
	    }
	    if (this.isContextual(122)) {
	      this.next();
	    }
	    if (!this.match(0)) {
	      return false;
	    }
	    this.next();
	    if (!this.tsIsIdentifier()) {
	      return false;
	    }
	    this.next();
	    return this.match(58);
	  }
	  tsParseMappedType() {
	    const node = this.startNode();
	    this.expect(5);
	    if (this.match(53)) {
	      node.readonly = this.state.value;
	      this.next();
	      this.expectContextual(122);
	    } else if (this.eatContextual(122)) {
	      node.readonly = true;
	    }
	    this.expect(0);
	    {
	      const typeParameter = this.startNode();
	      typeParameter.name = this.tsParseTypeParameterName();
	      typeParameter.constraint = this.tsExpectThenParseType(58);
	      node.typeParameter = this.finishNode(typeParameter, "TSTypeParameter");
	    }
	    node.nameType = this.eatContextual(93) ? this.tsParseType() : null;
	    this.expect(3);
	    if (this.match(53)) {
	      node.optional = this.state.value;
	      this.next();
	      this.expect(17);
	    } else if (this.eat(17)) {
	      node.optional = true;
	    }
	    node.typeAnnotation = this.tsTryParseType();
	    this.semicolon();
	    this.expect(8);
	    return this.finishNode(node, "TSMappedType");
	  }
	  tsParseTupleType() {
	    const node = this.startNode();
	    node.elementTypes = this.tsParseBracketedList("TupleElementTypes", this.tsParseTupleElementType.bind(this), true, false);
	    let seenOptionalElement = false;
	    node.elementTypes.forEach(elementNode => {
	      const {
	        type
	      } = elementNode;
	      if (seenOptionalElement && type !== "TSRestType" && type !== "TSOptionalType" && !(type === "TSNamedTupleMember" && elementNode.optional)) {
	        this.raise(TSErrors.OptionalTypeBeforeRequired, elementNode);
	      }
	      seenOptionalElement || (seenOptionalElement = type === "TSNamedTupleMember" && elementNode.optional || type === "TSOptionalType");
	    });
	    return this.finishNode(node, "TSTupleType");
	  }
	  tsParseTupleElementType() {
	    const restStartLoc = this.state.startLoc;
	    const rest = this.eat(21);
	    const {
	      startLoc
	    } = this.state;
	    let labeled;
	    let label;
	    let optional;
	    let type;
	    const isWord = tokenIsKeywordOrIdentifier(this.state.type);
	    const chAfterWord = isWord ? this.lookaheadCharCode() : null;
	    if (chAfterWord === 58) {
	      labeled = true;
	      optional = false;
	      label = this.parseIdentifier(true);
	      this.expect(14);
	      type = this.tsParseType();
	    } else if (chAfterWord === 63) {
	      optional = true;
	      const wordName = this.state.value;
	      const typeOrLabel = this.tsParseNonArrayType();
	      if (this.lookaheadCharCode() === 58) {
	        labeled = true;
	        label = this.createIdentifier(this.startNodeAt(startLoc), wordName);
	        this.expect(17);
	        this.expect(14);
	        type = this.tsParseType();
	      } else {
	        labeled = false;
	        type = typeOrLabel;
	        this.expect(17);
	      }
	    } else {
	      type = this.tsParseType();
	      optional = this.eat(17);
	      labeled = this.eat(14);
	    }
	    if (labeled) {
	      let labeledNode;
	      if (label) {
	        labeledNode = this.startNodeAt(startLoc);
	        labeledNode.optional = optional;
	        labeledNode.label = label;
	        labeledNode.elementType = type;
	        if (this.eat(17)) {
	          labeledNode.optional = true;
	          this.raise(TSErrors.TupleOptionalAfterType, this.state.lastTokStartLoc);
	        }
	      } else {
	        labeledNode = this.startNodeAt(startLoc);
	        labeledNode.optional = optional;
	        this.raise(TSErrors.InvalidTupleMemberLabel, type);
	        labeledNode.label = type;
	        labeledNode.elementType = this.tsParseType();
	      }
	      type = this.finishNode(labeledNode, "TSNamedTupleMember");
	    } else if (optional) {
	      const optionalTypeNode = this.startNodeAt(startLoc);
	      optionalTypeNode.typeAnnotation = type;
	      type = this.finishNode(optionalTypeNode, "TSOptionalType");
	    }
	    if (rest) {
	      const restNode = this.startNodeAt(restStartLoc);
	      restNode.typeAnnotation = type;
	      type = this.finishNode(restNode, "TSRestType");
	    }
	    return type;
	  }
	  tsParseParenthesizedType() {
	    const node = this.startNode();
	    this.expect(10);
	    node.typeAnnotation = this.tsParseType();
	    this.expect(11);
	    return this.finishNode(node, "TSParenthesizedType");
	  }
	  tsParseFunctionOrConstructorType(type, abstract) {
	    const node = this.startNode();
	    if (type === "TSConstructorType") {
	      node.abstract = !!abstract;
	      if (abstract) this.next();
	      this.next();
	    }
	    this.tsInAllowConditionalTypesContext(() => this.tsFillSignature(19, node));
	    return this.finishNode(node, type);
	  }
	  tsParseLiteralTypeNode() {
	    const node = this.startNode();
	    switch (this.state.type) {
	      case 135:
	      case 136:
	      case 134:
	      case 85:
	      case 86:
	        node.literal = super.parseExprAtom();
	        break;
	      default:
	        this.unexpected();
	    }
	    return this.finishNode(node, "TSLiteralType");
	  }
	  tsParseTemplateLiteralType() {
	    {
	      const node = this.startNode();
	      node.literal = super.parseTemplate(false);
	      return this.finishNode(node, "TSLiteralType");
	    }
	  }
	  parseTemplateSubstitution() {
	    if (this.state.inType) return this.tsParseType();
	    return super.parseTemplateSubstitution();
	  }
	  tsParseThisTypeOrThisTypePredicate() {
	    const thisKeyword = this.tsParseThisTypeNode();
	    if (this.isContextual(116) && !this.hasPrecedingLineBreak()) {
	      return this.tsParseThisTypePredicate(thisKeyword);
	    } else {
	      return thisKeyword;
	    }
	  }
	  tsParseNonArrayType() {
	    switch (this.state.type) {
	      case 134:
	      case 135:
	      case 136:
	      case 85:
	      case 86:
	        return this.tsParseLiteralTypeNode();
	      case 53:
	        if (this.state.value === "-") {
	          const node = this.startNode();
	          const nextToken = this.lookahead();
	          if (nextToken.type !== 135 && nextToken.type !== 136) {
	            this.unexpected();
	          }
	          node.literal = this.parseMaybeUnary();
	          return this.finishNode(node, "TSLiteralType");
	        }
	        break;
	      case 78:
	        return this.tsParseThisTypeOrThisTypePredicate();
	      case 87:
	        return this.tsParseTypeQuery();
	      case 83:
	        return this.tsParseImportType();
	      case 5:
	        return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();
	      case 0:
	        return this.tsParseTupleType();
	      case 10:
	        return this.tsParseParenthesizedType();
	      case 25:
	      case 24:
	        return this.tsParseTemplateLiteralType();
	      default:
	        {
	          const {
	            type
	          } = this.state;
	          if (tokenIsIdentifier(type) || type === 88 || type === 84) {
	            const nodeType = type === 88 ? "TSVoidKeyword" : type === 84 ? "TSNullKeyword" : keywordTypeFromName(this.state.value);
	            if (nodeType !== undefined && this.lookaheadCharCode() !== 46) {
	              const node = this.startNode();
	              this.next();
	              return this.finishNode(node, nodeType);
	            }
	            return this.tsParseTypeReference();
	          }
	        }
	    }
	    this.unexpected();
	  }
	  tsParseArrayTypeOrHigher() {
	    const {
	      startLoc
	    } = this.state;
	    let type = this.tsParseNonArrayType();
	    while (!this.hasPrecedingLineBreak() && this.eat(0)) {
	      if (this.match(3)) {
	        const node = this.startNodeAt(startLoc);
	        node.elementType = type;
	        this.expect(3);
	        type = this.finishNode(node, "TSArrayType");
	      } else {
	        const node = this.startNodeAt(startLoc);
	        node.objectType = type;
	        node.indexType = this.tsParseType();
	        this.expect(3);
	        type = this.finishNode(node, "TSIndexedAccessType");
	      }
	    }
	    return type;
	  }
	  tsParseTypeOperator() {
	    const node = this.startNode();
	    const operator = this.state.value;
	    this.next();
	    node.operator = operator;
	    node.typeAnnotation = this.tsParseTypeOperatorOrHigher();
	    if (operator === "readonly") {
	      this.tsCheckTypeAnnotationForReadOnly(node);
	    }
	    return this.finishNode(node, "TSTypeOperator");
	  }
	  tsCheckTypeAnnotationForReadOnly(node) {
	    switch (node.typeAnnotation.type) {
	      case "TSTupleType":
	      case "TSArrayType":
	        return;
	      default:
	        this.raise(TSErrors.UnexpectedReadonly, node);
	    }
	  }
	  tsParseInferType() {
	    const node = this.startNode();
	    this.expectContextual(115);
	    const typeParameter = this.startNode();
	    typeParameter.name = this.tsParseTypeParameterName();
	    typeParameter.constraint = this.tsTryParse(() => this.tsParseConstraintForInferType());
	    node.typeParameter = this.finishNode(typeParameter, "TSTypeParameter");
	    return this.finishNode(node, "TSInferType");
	  }
	  tsParseConstraintForInferType() {
	    if (this.eat(81)) {
	      const constraint = this.tsInDisallowConditionalTypesContext(() => this.tsParseType());
	      if (this.state.inDisallowConditionalTypesContext || !this.match(17)) {
	        return constraint;
	      }
	    }
	  }
	  tsParseTypeOperatorOrHigher() {
	    const isTypeOperator = tokenIsTSTypeOperator(this.state.type) && !this.state.containsEsc;
	    return isTypeOperator ? this.tsParseTypeOperator() : this.isContextual(115) ? this.tsParseInferType() : this.tsInAllowConditionalTypesContext(() => this.tsParseArrayTypeOrHigher());
	  }
	  tsParseUnionOrIntersectionType(kind, parseConstituentType, operator) {
	    const node = this.startNode();
	    const hasLeadingOperator = this.eat(operator);
	    const types = [];
	    do {
	      types.push(parseConstituentType());
	    } while (this.eat(operator));
	    if (types.length === 1 && !hasLeadingOperator) {
	      return types[0];
	    }
	    node.types = types;
	    return this.finishNode(node, kind);
	  }
	  tsParseIntersectionTypeOrHigher() {
	    return this.tsParseUnionOrIntersectionType("TSIntersectionType", this.tsParseTypeOperatorOrHigher.bind(this), 45);
	  }
	  tsParseUnionTypeOrHigher() {
	    return this.tsParseUnionOrIntersectionType("TSUnionType", this.tsParseIntersectionTypeOrHigher.bind(this), 43);
	  }
	  tsIsStartOfFunctionType() {
	    if (this.match(47)) {
	      return true;
	    }
	    return this.match(10) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this));
	  }
	  tsSkipParameterStart() {
	    if (tokenIsIdentifier(this.state.type) || this.match(78)) {
	      this.next();
	      return true;
	    }
	    if (this.match(5)) {
	      const {
	        errors
	      } = this.state;
	      const previousErrorCount = errors.length;
	      try {
	        this.parseObjectLike(8, true);
	        return errors.length === previousErrorCount;
	      } catch (_unused) {
	        return false;
	      }
	    }
	    if (this.match(0)) {
	      this.next();
	      const {
	        errors
	      } = this.state;
	      const previousErrorCount = errors.length;
	      try {
	        super.parseBindingList(3, 93, 1);
	        return errors.length === previousErrorCount;
	      } catch (_unused2) {
	        return false;
	      }
	    }
	    return false;
	  }
	  tsIsUnambiguouslyStartOfFunctionType() {
	    this.next();
	    if (this.match(11) || this.match(21)) {
	      return true;
	    }
	    if (this.tsSkipParameterStart()) {
	      if (this.match(14) || this.match(12) || this.match(17) || this.match(29)) {
	        return true;
	      }
	      if (this.match(11)) {
	        this.next();
	        if (this.match(19)) {
	          return true;
	        }
	      }
	    }
	    return false;
	  }
	  tsParseTypeOrTypePredicateAnnotation(returnToken) {
	    return this.tsInType(() => {
	      const t = this.startNode();
	      this.expect(returnToken);
	      const node = this.startNode();
	      const asserts = !!this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
	      if (asserts && this.match(78)) {
	        let thisTypePredicate = this.tsParseThisTypeOrThisTypePredicate();
	        if (thisTypePredicate.type === "TSThisType") {
	          node.parameterName = thisTypePredicate;
	          node.asserts = true;
	          node.typeAnnotation = null;
	          thisTypePredicate = this.finishNode(node, "TSTypePredicate");
	        } else {
	          this.resetStartLocationFromNode(thisTypePredicate, node);
	          thisTypePredicate.asserts = true;
	        }
	        t.typeAnnotation = thisTypePredicate;
	        return this.finishNode(t, "TSTypeAnnotation");
	      }
	      const typePredicateVariable = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
	      if (!typePredicateVariable) {
	        if (!asserts) {
	          return this.tsParseTypeAnnotation(false, t);
	        }
	        node.parameterName = this.parseIdentifier();
	        node.asserts = asserts;
	        node.typeAnnotation = null;
	        t.typeAnnotation = this.finishNode(node, "TSTypePredicate");
	        return this.finishNode(t, "TSTypeAnnotation");
	      }
	      const type = this.tsParseTypeAnnotation(false);
	      node.parameterName = typePredicateVariable;
	      node.typeAnnotation = type;
	      node.asserts = asserts;
	      t.typeAnnotation = this.finishNode(node, "TSTypePredicate");
	      return this.finishNode(t, "TSTypeAnnotation");
	    });
	  }
	  tsTryParseTypeOrTypePredicateAnnotation() {
	    if (this.match(14)) {
	      return this.tsParseTypeOrTypePredicateAnnotation(14);
	    }
	  }
	  tsTryParseTypeAnnotation() {
	    if (this.match(14)) {
	      return this.tsParseTypeAnnotation();
	    }
	  }
	  tsTryParseType() {
	    return this.tsEatThenParseType(14);
	  }
	  tsParseTypePredicatePrefix() {
	    const id = this.parseIdentifier();
	    if (this.isContextual(116) && !this.hasPrecedingLineBreak()) {
	      this.next();
	      return id;
	    }
	  }
	  tsParseTypePredicateAsserts() {
	    if (this.state.type !== 109) {
	      return false;
	    }
	    const containsEsc = this.state.containsEsc;
	    this.next();
	    if (!tokenIsIdentifier(this.state.type) && !this.match(78)) {
	      return false;
	    }
	    if (containsEsc) {
	      this.raise(Errors.InvalidEscapedReservedWord, this.state.lastTokStartLoc, {
	        reservedWord: "asserts"
	      });
	    }
	    return true;
	  }
	  tsParseTypeAnnotation(eatColon = true, t = this.startNode()) {
	    this.tsInType(() => {
	      if (eatColon) this.expect(14);
	      t.typeAnnotation = this.tsParseType();
	    });
	    return this.finishNode(t, "TSTypeAnnotation");
	  }
	  tsParseType() {
	    assert(this.state.inType);
	    const type = this.tsParseNonConditionalType();
	    if (this.state.inDisallowConditionalTypesContext || this.hasPrecedingLineBreak() || !this.eat(81)) {
	      return type;
	    }
	    const node = this.startNodeAtNode(type);
	    node.checkType = type;
	    node.extendsType = this.tsInDisallowConditionalTypesContext(() => this.tsParseNonConditionalType());
	    this.expect(17);
	    node.trueType = this.tsInAllowConditionalTypesContext(() => this.tsParseType());
	    this.expect(14);
	    node.falseType = this.tsInAllowConditionalTypesContext(() => this.tsParseType());
	    return this.finishNode(node, "TSConditionalType");
	  }
	  isAbstractConstructorSignature() {
	    return this.isContextual(124) && this.lookahead().type === 77;
	  }
	  tsParseNonConditionalType() {
	    if (this.tsIsStartOfFunctionType()) {
	      return this.tsParseFunctionOrConstructorType("TSFunctionType");
	    }
	    if (this.match(77)) {
	      return this.tsParseFunctionOrConstructorType("TSConstructorType");
	    } else if (this.isAbstractConstructorSignature()) {
	      return this.tsParseFunctionOrConstructorType("TSConstructorType", true);
	    }
	    return this.tsParseUnionTypeOrHigher();
	  }
	  tsParseTypeAssertion() {
	    if (this.getPluginOption("typescript", "disallowAmbiguousJSXLike")) {
	      this.raise(TSErrors.ReservedTypeAssertion, this.state.startLoc);
	    }
	    const node = this.startNode();
	    node.typeAnnotation = this.tsInType(() => {
	      this.next();
	      return this.match(75) ? this.tsParseTypeReference() : this.tsParseType();
	    });
	    this.expect(48);
	    node.expression = this.parseMaybeUnary();
	    return this.finishNode(node, "TSTypeAssertion");
	  }
	  tsParseHeritageClause(token) {
	    const originalStartLoc = this.state.startLoc;
	    const delimitedList = this.tsParseDelimitedList("HeritageClauseElement", () => {
	      {
	        const node = this.startNode();
	        node.expression = this.tsParseEntityName(1 | 2);
	        if (this.match(47)) {
	          node.typeParameters = this.tsParseTypeArguments();
	        }
	        return this.finishNode(node, "TSExpressionWithTypeArguments");
	      }
	    });
	    if (!delimitedList.length) {
	      this.raise(TSErrors.EmptyHeritageClauseType, originalStartLoc, {
	        token
	      });
	    }
	    return delimitedList;
	  }
	  tsParseInterfaceDeclaration(node, properties = {}) {
	    if (this.hasFollowingLineBreak()) return null;
	    this.expectContextual(129);
	    if (properties.declare) node.declare = true;
	    if (tokenIsIdentifier(this.state.type)) {
	      node.id = this.parseIdentifier();
	      this.checkIdentifier(node.id, 130);
	    } else {
	      node.id = null;
	      this.raise(TSErrors.MissingInterfaceName, this.state.startLoc);
	    }
	    node.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutConstModifiers);
	    if (this.eat(81)) {
	      node.extends = this.tsParseHeritageClause("extends");
	    }
	    const body = this.startNode();
	    body.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this));
	    node.body = this.finishNode(body, "TSInterfaceBody");
	    return this.finishNode(node, "TSInterfaceDeclaration");
	  }
	  tsParseTypeAliasDeclaration(node) {
	    node.id = this.parseIdentifier();
	    this.checkIdentifier(node.id, 2);
	    node.typeAnnotation = this.tsInType(() => {
	      node.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers);
	      this.expect(29);
	      if (this.isContextual(114) && this.lookahead().type !== 16) {
	        const node = this.startNode();
	        this.next();
	        return this.finishNode(node, "TSIntrinsicKeyword");
	      }
	      return this.tsParseType();
	    });
	    this.semicolon();
	    return this.finishNode(node, "TSTypeAliasDeclaration");
	  }
	  tsInTopLevelContext(cb) {
	    if (this.curContext() !== types.brace) {
	      const oldContext = this.state.context;
	      this.state.context = [oldContext[0]];
	      try {
	        return cb();
	      } finally {
	        this.state.context = oldContext;
	      }
	    } else {
	      return cb();
	    }
	  }
	  tsInType(cb) {
	    const oldInType = this.state.inType;
	    this.state.inType = true;
	    try {
	      return cb();
	    } finally {
	      this.state.inType = oldInType;
	    }
	  }
	  tsInDisallowConditionalTypesContext(cb) {
	    const oldInDisallowConditionalTypesContext = this.state.inDisallowConditionalTypesContext;
	    this.state.inDisallowConditionalTypesContext = true;
	    try {
	      return cb();
	    } finally {
	      this.state.inDisallowConditionalTypesContext = oldInDisallowConditionalTypesContext;
	    }
	  }
	  tsInAllowConditionalTypesContext(cb) {
	    const oldInDisallowConditionalTypesContext = this.state.inDisallowConditionalTypesContext;
	    this.state.inDisallowConditionalTypesContext = false;
	    try {
	      return cb();
	    } finally {
	      this.state.inDisallowConditionalTypesContext = oldInDisallowConditionalTypesContext;
	    }
	  }
	  tsEatThenParseType(token) {
	    if (this.match(token)) {
	      return this.tsNextThenParseType();
	    }
	  }
	  tsExpectThenParseType(token) {
	    return this.tsInType(() => {
	      this.expect(token);
	      return this.tsParseType();
	    });
	  }
	  tsNextThenParseType() {
	    return this.tsInType(() => {
	      this.next();
	      return this.tsParseType();
	    });
	  }
	  tsParseEnumMember() {
	    const node = this.startNode();
	    node.id = this.match(134) ? super.parseStringLiteral(this.state.value) : this.parseIdentifier(true);
	    if (this.eat(29)) {
	      node.initializer = super.parseMaybeAssignAllowIn();
	    }
	    return this.finishNode(node, "TSEnumMember");
	  }
	  tsParseEnumDeclaration(node, properties = {}) {
	    if (properties.const) node.const = true;
	    if (properties.declare) node.declare = true;
	    this.expectContextual(126);
	    node.id = this.parseIdentifier();
	    this.checkIdentifier(node.id, node.const ? 8971 : 8459);
	    {
	      this.expect(5);
	      node.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this));
	      this.expect(8);
	    }
	    return this.finishNode(node, "TSEnumDeclaration");
	  }
	  tsParseEnumBody() {
	    const node = this.startNode();
	    this.expect(5);
	    node.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this));
	    this.expect(8);
	    return this.finishNode(node, "TSEnumBody");
	  }
	  tsParseModuleBlock() {
	    const node = this.startNode();
	    this.scope.enter(0);
	    this.expect(5);
	    super.parseBlockOrModuleBlockBody(node.body = [], undefined, true, 8);
	    this.scope.exit();
	    return this.finishNode(node, "TSModuleBlock");
	  }
	  tsParseModuleOrNamespaceDeclaration(node, nested = false) {
	    node.id = this.parseIdentifier();
	    if (!nested) {
	      this.checkIdentifier(node.id, 1024);
	    }
	    if (this.eat(16)) {
	      const inner = this.startNode();
	      this.tsParseModuleOrNamespaceDeclaration(inner, true);
	      node.body = inner;
	    } else {
	      this.scope.enter(512);
	      this.prodParam.enter(0);
	      node.body = this.tsParseModuleBlock();
	      this.prodParam.exit();
	      this.scope.exit();
	    }
	    return this.finishNode(node, "TSModuleDeclaration");
	  }
	  tsParseAmbientExternalModuleDeclaration(node) {
	    if (this.isContextual(112)) {
	      node.kind = "global";
	      {
	        node.global = true;
	      }
	      node.id = this.parseIdentifier();
	    } else if (this.match(134)) {
	      node.kind = "module";
	      node.id = super.parseStringLiteral(this.state.value);
	    } else {
	      this.unexpected();
	    }
	    if (this.match(5)) {
	      this.scope.enter(512);
	      this.prodParam.enter(0);
	      node.body = this.tsParseModuleBlock();
	      this.prodParam.exit();
	      this.scope.exit();
	    } else {
	      this.semicolon();
	    }
	    return this.finishNode(node, "TSModuleDeclaration");
	  }
	  tsParseImportEqualsDeclaration(node, maybeDefaultIdentifier, isExport) {
	    {
	      node.isExport = isExport || false;
	    }
	    node.id = maybeDefaultIdentifier || this.parseIdentifier();
	    this.checkIdentifier(node.id, 4096);
	    this.expect(29);
	    const moduleReference = this.tsParseModuleReference();
	    if (node.importKind === "type" && moduleReference.type !== "TSExternalModuleReference") {
	      this.raise(TSErrors.ImportAliasHasImportType, moduleReference);
	    }
	    node.moduleReference = moduleReference;
	    this.semicolon();
	    return this.finishNode(node, "TSImportEqualsDeclaration");
	  }
	  tsIsExternalModuleReference() {
	    return this.isContextual(119) && this.lookaheadCharCode() === 40;
	  }
	  tsParseModuleReference() {
	    return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(0);
	  }
	  tsParseExternalModuleReference() {
	    const node = this.startNode();
	    this.expectContextual(119);
	    this.expect(10);
	    if (!this.match(134)) {
	      this.unexpected();
	    }
	    node.expression = super.parseExprAtom();
	    this.expect(11);
	    this.sawUnambiguousESM = true;
	    return this.finishNode(node, "TSExternalModuleReference");
	  }
	  tsLookAhead(f) {
	    const state = this.state.clone();
	    const res = f();
	    this.state = state;
	    return res;
	  }
	  tsTryParseAndCatch(f) {
	    const result = this.tryParse(abort => f() || abort());
	    if (result.aborted || !result.node) return;
	    if (result.error) this.state = result.failState;
	    return result.node;
	  }
	  tsTryParse(f) {
	    const state = this.state.clone();
	    const result = f();
	    if (result !== undefined && result !== false) {
	      return result;
	    }
	    this.state = state;
	  }
	  tsTryParseDeclare(node) {
	    if (this.isLineTerminator()) {
	      return;
	    }
	    const startType = this.state.type;
	    return this.tsInAmbientContext(() => {
	      switch (startType) {
	        case 68:
	          node.declare = true;
	          return super.parseFunctionStatement(node, false, false);
	        case 80:
	          node.declare = true;
	          return this.parseClass(node, true, false);
	        case 126:
	          return this.tsParseEnumDeclaration(node, {
	            declare: true
	          });
	        case 112:
	          return this.tsParseAmbientExternalModuleDeclaration(node);
	        case 100:
	          if (this.state.containsEsc) {
	            return;
	          }
	        case 75:
	        case 74:
	          if (!this.match(75) || !this.isLookaheadContextual("enum")) {
	            node.declare = true;
	            return this.parseVarStatement(node, this.state.value, true);
	          }
	          this.expect(75);
	          return this.tsParseEnumDeclaration(node, {
	            const: true,
	            declare: true
	          });
	        case 107:
	          if (this.hasPlugin("explicitResourceManagement") && this.isUsing()) {
	            this.raise(TSErrors.InvalidModifierOnUsingDeclaration, this.state.startLoc, "declare");
	            node.declare = true;
	            return this.parseVarStatement(node, "using", true);
	          }
	          break;
	        case 96:
	          if (this.hasPlugin("explicitResourceManagement") && this.isAwaitUsing()) {
	            this.raise(TSErrors.InvalidModifierOnAwaitUsingDeclaration, this.state.startLoc, "declare");
	            node.declare = true;
	            this.next();
	            return this.parseVarStatement(node, "await using", true);
	          }
	          break;
	        case 129:
	          {
	            const result = this.tsParseInterfaceDeclaration(node, {
	              declare: true
	            });
	            if (result) return result;
	          }
	        default:
	          if (tokenIsIdentifier(startType)) {
	            return this.tsParseDeclaration(node, this.state.value, true, null);
	          }
	      }
	    });
	  }
	  tsTryParseExportDeclaration() {
	    return this.tsParseDeclaration(this.startNode(), this.state.value, true, null);
	  }
	  tsParseExpressionStatement(node, expr, decorators) {
	    switch (expr.name) {
	      case "declare":
	        {
	          const declaration = this.tsTryParseDeclare(node);
	          if (declaration) {
	            declaration.declare = true;
	          }
	          return declaration;
	        }
	      case "global":
	        if (this.match(5)) {
	          this.scope.enter(512);
	          this.prodParam.enter(0);
	          const mod = node;
	          mod.kind = "global";
	          {
	            node.global = true;
	          }
	          mod.id = expr;
	          mod.body = this.tsParseModuleBlock();
	          this.scope.exit();
	          this.prodParam.exit();
	          return this.finishNode(mod, "TSModuleDeclaration");
	        }
	        break;
	      default:
	        return this.tsParseDeclaration(node, expr.name, false, decorators);
	    }
	  }
	  tsParseDeclaration(node, value, next, decorators) {
	    switch (value) {
	      case "abstract":
	        if (this.tsCheckLineTerminator(next) && (this.match(80) || tokenIsIdentifier(this.state.type))) {
	          return this.tsParseAbstractDeclaration(node, decorators);
	        }
	        break;
	      case "module":
	        if (this.tsCheckLineTerminator(next)) {
	          if (this.match(134)) {
	            return this.tsParseAmbientExternalModuleDeclaration(node);
	          } else if (tokenIsIdentifier(this.state.type)) {
	            node.kind = "module";
	            return this.tsParseModuleOrNamespaceDeclaration(node);
	          }
	        }
	        break;
	      case "namespace":
	        if (this.tsCheckLineTerminator(next) && tokenIsIdentifier(this.state.type)) {
	          node.kind = "namespace";
	          return this.tsParseModuleOrNamespaceDeclaration(node);
	        }
	        break;
	      case "type":
	        if (this.tsCheckLineTerminator(next) && tokenIsIdentifier(this.state.type)) {
	          return this.tsParseTypeAliasDeclaration(node);
	        }
	        break;
	    }
	  }
	  tsCheckLineTerminator(next) {
	    if (next) {
	      if (this.hasFollowingLineBreak()) return false;
	      this.next();
	      return true;
	    }
	    return !this.isLineTerminator();
	  }
	  tsTryParseGenericAsyncArrowFunction(startLoc) {
	    if (!this.match(47)) return;
	    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
	    this.state.maybeInArrowParameters = true;
	    const res = this.tsTryParseAndCatch(() => {
	      const node = this.startNodeAt(startLoc);
	      node.typeParameters = this.tsParseTypeParameters(this.tsParseConstModifier);
	      super.parseFunctionParams(node);
	      node.returnType = this.tsTryParseTypeOrTypePredicateAnnotation();
	      this.expect(19);
	      return node;
	    });
	    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
	    if (!res) return;
	    return super.parseArrowExpression(res, null, true);
	  }
	  tsParseTypeArgumentsInExpression() {
	    if (this.reScan_lt() !== 47) return;
	    return this.tsParseTypeArguments();
	  }
	  tsParseTypeArguments() {
	    const node = this.startNode();
	    node.params = this.tsInType(() => this.tsInTopLevelContext(() => {
	      this.expect(47);
	      return this.tsParseDelimitedList("TypeParametersOrArguments", this.tsParseType.bind(this));
	    }));
	    if (node.params.length === 0) {
	      this.raise(TSErrors.EmptyTypeArguments, node);
	    } else if (!this.state.inType && this.curContext() === types.brace) {
	      this.reScan_lt_gt();
	    }
	    this.expect(48);
	    return this.finishNode(node, "TSTypeParameterInstantiation");
	  }
	  tsIsDeclarationStart() {
	    return tokenIsTSDeclarationStart(this.state.type);
	  }
	  isExportDefaultSpecifier() {
	    if (this.tsIsDeclarationStart()) return false;
	    return super.isExportDefaultSpecifier();
	  }
	  parseBindingElement(flags, decorators) {
	    const startLoc = decorators.length ? decorators[0].loc.start : this.state.startLoc;
	    const modified = {};
	    this.tsParseModifiers({
	      allowedModifiers: ["public", "private", "protected", "override", "readonly"]
	    }, modified);
	    const accessibility = modified.accessibility;
	    const override = modified.override;
	    const readonly = modified.readonly;
	    if (!(flags & 4) && (accessibility || readonly || override)) {
	      this.raise(TSErrors.UnexpectedParameterModifier, startLoc);
	    }
	    const left = this.parseMaybeDefault();
	    if (flags & 2) {
	      this.parseFunctionParamType(left);
	    }
	    const elt = this.parseMaybeDefault(left.loc.start, left);
	    if (accessibility || readonly || override) {
	      const pp = this.startNodeAt(startLoc);
	      if (decorators.length) {
	        pp.decorators = decorators;
	      }
	      if (accessibility) pp.accessibility = accessibility;
	      if (readonly) pp.readonly = readonly;
	      if (override) pp.override = override;
	      if (elt.type !== "Identifier" && elt.type !== "AssignmentPattern") {
	        this.raise(TSErrors.UnsupportedParameterPropertyKind, pp);
	      }
	      pp.parameter = elt;
	      return this.finishNode(pp, "TSParameterProperty");
	    }
	    if (decorators.length) {
	      left.decorators = decorators;
	    }
	    return elt;
	  }
	  isSimpleParameter(node) {
	    return node.type === "TSParameterProperty" && super.isSimpleParameter(node.parameter) || super.isSimpleParameter(node);
	  }
	  tsDisallowOptionalPattern(node) {
	    for (const param of node.params) {
	      if (param.type !== "Identifier" && param.optional && !this.state.isAmbientContext) {
	        this.raise(TSErrors.PatternIsOptional, param);
	      }
	    }
	  }
	  setArrowFunctionParameters(node, params, trailingCommaLoc) {
	    super.setArrowFunctionParameters(node, params, trailingCommaLoc);
	    this.tsDisallowOptionalPattern(node);
	  }
	  parseFunctionBodyAndFinish(node, type, isMethod = false) {
	    if (this.match(14)) {
	      node.returnType = this.tsParseTypeOrTypePredicateAnnotation(14);
	    }
	    const bodilessType = type === "FunctionDeclaration" ? "TSDeclareFunction" : type === "ClassMethod" || type === "ClassPrivateMethod" ? "TSDeclareMethod" : undefined;
	    if (bodilessType && !this.match(5) && this.isLineTerminator()) {
	      return this.finishNode(node, bodilessType);
	    }
	    if (bodilessType === "TSDeclareFunction" && this.state.isAmbientContext) {
	      this.raise(TSErrors.DeclareFunctionHasImplementation, node);
	      if (node.declare) {
	        return super.parseFunctionBodyAndFinish(node, bodilessType, isMethod);
	      }
	    }
	    this.tsDisallowOptionalPattern(node);
	    return super.parseFunctionBodyAndFinish(node, type, isMethod);
	  }
	  registerFunctionStatementId(node) {
	    if (!node.body && node.id) {
	      this.checkIdentifier(node.id, 1024);
	    } else {
	      super.registerFunctionStatementId(node);
	    }
	  }
	  tsCheckForInvalidTypeCasts(items) {
	    items.forEach(node => {
	      if ((node == null ? void 0 : node.type) === "TSTypeCastExpression") {
	        this.raise(TSErrors.UnexpectedTypeAnnotation, node.typeAnnotation);
	      }
	    });
	  }
	  toReferencedList(exprList, isInParens) {
	    this.tsCheckForInvalidTypeCasts(exprList);
	    return exprList;
	  }
	  parseArrayLike(close, canBePattern, isTuple, refExpressionErrors) {
	    const node = super.parseArrayLike(close, canBePattern, isTuple, refExpressionErrors);
	    if (node.type === "ArrayExpression") {
	      this.tsCheckForInvalidTypeCasts(node.elements);
	    }
	    return node;
	  }
	  parseSubscript(base, startLoc, noCalls, state) {
	    if (!this.hasPrecedingLineBreak() && this.match(35)) {
	      this.state.canStartJSXElement = false;
	      this.next();
	      const nonNullExpression = this.startNodeAt(startLoc);
	      nonNullExpression.expression = base;
	      return this.finishNode(nonNullExpression, "TSNonNullExpression");
	    }
	    let isOptionalCall = false;
	    if (this.match(18) && this.lookaheadCharCode() === 60) {
	      if (noCalls) {
	        state.stop = true;
	        return base;
	      }
	      state.optionalChainMember = isOptionalCall = true;
	      this.next();
	    }
	    if (this.match(47) || this.match(51)) {
	      let missingParenErrorLoc;
	      const result = this.tsTryParseAndCatch(() => {
	        if (!noCalls && this.atPossibleAsyncArrow(base)) {
	          const asyncArrowFn = this.tsTryParseGenericAsyncArrowFunction(startLoc);
	          if (asyncArrowFn) {
	            return asyncArrowFn;
	          }
	        }
	        const typeArguments = this.tsParseTypeArgumentsInExpression();
	        if (!typeArguments) return;
	        if (isOptionalCall && !this.match(10)) {
	          missingParenErrorLoc = this.state.curPosition();
	          return;
	        }
	        if (tokenIsTemplate(this.state.type)) {
	          const result = super.parseTaggedTemplateExpression(base, startLoc, state);
	          {
	            result.typeParameters = typeArguments;
	          }
	          return result;
	        }
	        if (!noCalls && this.eat(10)) {
	          const node = this.startNodeAt(startLoc);
	          node.callee = base;
	          node.arguments = this.parseCallExpressionArguments(11);
	          this.tsCheckForInvalidTypeCasts(node.arguments);
	          {
	            node.typeParameters = typeArguments;
	          }
	          if (state.optionalChainMember) {
	            node.optional = isOptionalCall;
	          }
	          return this.finishCallExpression(node, state.optionalChainMember);
	        }
	        const tokenType = this.state.type;
	        if (tokenType === 48 || tokenType === 52 || tokenType !== 10 && tokenCanStartExpression(tokenType) && !this.hasPrecedingLineBreak()) {
	          return;
	        }
	        const node = this.startNodeAt(startLoc);
	        node.expression = base;
	        {
	          node.typeParameters = typeArguments;
	        }
	        return this.finishNode(node, "TSInstantiationExpression");
	      });
	      if (missingParenErrorLoc) {
	        this.unexpected(missingParenErrorLoc, 10);
	      }
	      if (result) {
	        if (result.type === "TSInstantiationExpression") {
	          if (this.match(16) || this.match(18) && this.lookaheadCharCode() !== 40) {
	            this.raise(TSErrors.InvalidPropertyAccessAfterInstantiationExpression, this.state.startLoc);
	          }
	          if (!this.match(16) && !this.match(18)) {
	            result.expression = super.stopParseSubscript(base, state);
	          }
	        }
	        return result;
	      }
	    }
	    return super.parseSubscript(base, startLoc, noCalls, state);
	  }
	  parseNewCallee(node) {
	    var _callee$extra;
	    super.parseNewCallee(node);
	    const {
	      callee
	    } = node;
	    if (callee.type === "TSInstantiationExpression" && !((_callee$extra = callee.extra) != null && _callee$extra.parenthesized)) {
	      {
	        node.typeParameters = callee.typeParameters;
	      }
	      node.callee = callee.expression;
	    }
	  }
	  parseExprOp(left, leftStartLoc, minPrec) {
	    let isSatisfies;
	    if (tokenOperatorPrecedence(58) > minPrec && !this.hasPrecedingLineBreak() && (this.isContextual(93) || (isSatisfies = this.isContextual(120)))) {
	      const node = this.startNodeAt(leftStartLoc);
	      node.expression = left;
	      node.typeAnnotation = this.tsInType(() => {
	        this.next();
	        if (this.match(75)) {
	          if (isSatisfies) {
	            this.raise(Errors.UnexpectedKeyword, this.state.startLoc, {
	              keyword: "const"
	            });
	          }
	          return this.tsParseTypeReference();
	        }
	        return this.tsParseType();
	      });
	      this.finishNode(node, isSatisfies ? "TSSatisfiesExpression" : "TSAsExpression");
	      this.reScan_lt_gt();
	      return this.parseExprOp(node, leftStartLoc, minPrec);
	    }
	    return super.parseExprOp(left, leftStartLoc, minPrec);
	  }
	  checkReservedWord(word, startLoc, checkKeywords, isBinding) {
	    if (!this.state.isAmbientContext) {
	      super.checkReservedWord(word, startLoc, checkKeywords, isBinding);
	    }
	  }
	  checkImportReflection(node) {
	    super.checkImportReflection(node);
	    if (node.module && node.importKind !== "value") {
	      this.raise(TSErrors.ImportReflectionHasImportType, node.specifiers[0].loc.start);
	    }
	  }
	  checkDuplicateExports() {}
	  isPotentialImportPhase(isExport) {
	    if (super.isPotentialImportPhase(isExport)) return true;
	    if (this.isContextual(130)) {
	      const ch = this.lookaheadCharCode();
	      return isExport ? ch === 123 || ch === 42 : ch !== 61;
	    }
	    return !isExport && this.isContextual(87);
	  }
	  applyImportPhase(node, isExport, phase, loc) {
	    super.applyImportPhase(node, isExport, phase, loc);
	    if (isExport) {
	      node.exportKind = phase === "type" ? "type" : "value";
	    } else {
	      node.importKind = phase === "type" || phase === "typeof" ? phase : "value";
	    }
	  }
	  parseImport(node) {
	    if (this.match(134)) {
	      node.importKind = "value";
	      return super.parseImport(node);
	    }
	    let importNode;
	    if (tokenIsIdentifier(this.state.type) && this.lookaheadCharCode() === 61) {
	      node.importKind = "value";
	      return this.tsParseImportEqualsDeclaration(node);
	    } else if (this.isContextual(130)) {
	      const maybeDefaultIdentifier = this.parseMaybeImportPhase(node, false);
	      if (this.lookaheadCharCode() === 61) {
	        return this.tsParseImportEqualsDeclaration(node, maybeDefaultIdentifier);
	      } else {
	        importNode = super.parseImportSpecifiersAndAfter(node, maybeDefaultIdentifier);
	      }
	    } else {
	      importNode = super.parseImport(node);
	    }
	    if (importNode.importKind === "type" && importNode.specifiers.length > 1 && importNode.specifiers[0].type === "ImportDefaultSpecifier") {
	      this.raise(TSErrors.TypeImportCannotSpecifyDefaultAndNamed, importNode);
	    }
	    return importNode;
	  }
	  parseExport(node, decorators) {
	    if (this.match(83)) {
	      const nodeImportEquals = node;
	      this.next();
	      let maybeDefaultIdentifier = null;
	      if (this.isContextual(130) && this.isPotentialImportPhase(false)) {
	        maybeDefaultIdentifier = this.parseMaybeImportPhase(nodeImportEquals, false);
	      } else {
	        nodeImportEquals.importKind = "value";
	      }
	      const declaration = this.tsParseImportEqualsDeclaration(nodeImportEquals, maybeDefaultIdentifier, true);
	      {
	        return declaration;
	      }
	    } else if (this.eat(29)) {
	      const assign = node;
	      assign.expression = super.parseExpression();
	      this.semicolon();
	      this.sawUnambiguousESM = true;
	      return this.finishNode(assign, "TSExportAssignment");
	    } else if (this.eatContextual(93)) {
	      const decl = node;
	      this.expectContextual(128);
	      decl.id = this.parseIdentifier();
	      this.semicolon();
	      return this.finishNode(decl, "TSNamespaceExportDeclaration");
	    } else {
	      return super.parseExport(node, decorators);
	    }
	  }
	  isAbstractClass() {
	    return this.isContextual(124) && this.lookahead().type === 80;
	  }
	  parseExportDefaultExpression() {
	    if (this.isAbstractClass()) {
	      const cls = this.startNode();
	      this.next();
	      cls.abstract = true;
	      return this.parseClass(cls, true, true);
	    }
	    if (this.match(129)) {
	      const result = this.tsParseInterfaceDeclaration(this.startNode());
	      if (result) return result;
	    }
	    return super.parseExportDefaultExpression();
	  }
	  parseVarStatement(node, kind, allowMissingInitializer = false) {
	    const {
	      isAmbientContext
	    } = this.state;
	    const declaration = super.parseVarStatement(node, kind, allowMissingInitializer || isAmbientContext);
	    if (!isAmbientContext) return declaration;
	    for (const {
	      id,
	      init
	    } of declaration.declarations) {
	      if (!init) continue;
	      if (kind === "var" || kind === "let" || !!id.typeAnnotation) {
	        this.raise(TSErrors.InitializerNotAllowedInAmbientContext, init);
	      } else if (!isValidAmbientConstInitializer(init, this.hasPlugin("estree"))) {
	        this.raise(TSErrors.ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference, init);
	      }
	    }
	    return declaration;
	  }
	  parseStatementContent(flags, decorators) {
	    if (this.match(75) && this.isLookaheadContextual("enum")) {
	      const node = this.startNode();
	      this.expect(75);
	      return this.tsParseEnumDeclaration(node, {
	        const: true
	      });
	    }
	    if (this.isContextual(126)) {
	      return this.tsParseEnumDeclaration(this.startNode());
	    }
	    if (this.isContextual(129)) {
	      const result = this.tsParseInterfaceDeclaration(this.startNode());
	      if (result) return result;
	    }
	    return super.parseStatementContent(flags, decorators);
	  }
	  parseAccessModifier() {
	    return this.tsParseModifier(["public", "protected", "private"]);
	  }
	  tsHasSomeModifiers(member, modifiers) {
	    return modifiers.some(modifier => {
	      if (tsIsAccessModifier(modifier)) {
	        return member.accessibility === modifier;
	      }
	      return !!member[modifier];
	    });
	  }
	  tsIsStartOfStaticBlocks() {
	    return this.isContextual(106) && this.lookaheadCharCode() === 123;
	  }
	  parseClassMember(classBody, member, state) {
	    const modifiers = ["declare", "private", "public", "protected", "override", "abstract", "readonly", "static"];
	    this.tsParseModifiers({
	      allowedModifiers: modifiers,
	      disallowedModifiers: ["in", "out"],
	      stopOnStartOfClassStaticBlock: true,
	      errorTemplate: TSErrors.InvalidModifierOnTypeParameterPositions
	    }, member);
	    const callParseClassMemberWithIsStatic = () => {
	      if (this.tsIsStartOfStaticBlocks()) {
	        this.next();
	        this.next();
	        if (this.tsHasSomeModifiers(member, modifiers)) {
	          this.raise(TSErrors.StaticBlockCannotHaveModifier, this.state.curPosition());
	        }
	        super.parseClassStaticBlock(classBody, member);
	      } else {
	        this.parseClassMemberWithIsStatic(classBody, member, state, !!member.static);
	      }
	    };
	    if (member.declare) {
	      this.tsInAmbientContext(callParseClassMemberWithIsStatic);
	    } else {
	      callParseClassMemberWithIsStatic();
	    }
	  }
	  parseClassMemberWithIsStatic(classBody, member, state, isStatic) {
	    const idx = this.tsTryParseIndexSignature(member);
	    if (idx) {
	      classBody.body.push(idx);
	      if (member.abstract) {
	        this.raise(TSErrors.IndexSignatureHasAbstract, member);
	      }
	      if (member.accessibility) {
	        this.raise(TSErrors.IndexSignatureHasAccessibility, member, {
	          modifier: member.accessibility
	        });
	      }
	      if (member.declare) {
	        this.raise(TSErrors.IndexSignatureHasDeclare, member);
	      }
	      if (member.override) {
	        this.raise(TSErrors.IndexSignatureHasOverride, member);
	      }
	      return;
	    }
	    if (!this.state.inAbstractClass && member.abstract) {
	      this.raise(TSErrors.NonAbstractClassHasAbstractMethod, member);
	    }
	    if (member.override) {
	      if (!state.hadSuperClass) {
	        this.raise(TSErrors.OverrideNotInSubClass, member);
	      }
	    }
	    super.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
	  }
	  parsePostMemberNameModifiers(methodOrProp) {
	    const optional = this.eat(17);
	    if (optional) methodOrProp.optional = true;
	    if (methodOrProp.readonly && this.match(10)) {
	      this.raise(TSErrors.ClassMethodHasReadonly, methodOrProp);
	    }
	    if (methodOrProp.declare && this.match(10)) {
	      this.raise(TSErrors.ClassMethodHasDeclare, methodOrProp);
	    }
	  }
	  parseExpressionStatement(node, expr, decorators) {
	    const decl = expr.type === "Identifier" ? this.tsParseExpressionStatement(node, expr, decorators) : undefined;
	    return decl || super.parseExpressionStatement(node, expr, decorators);
	  }
	  shouldParseExportDeclaration() {
	    if (this.tsIsDeclarationStart()) return true;
	    return super.shouldParseExportDeclaration();
	  }
	  parseConditional(expr, startLoc, refExpressionErrors) {
	    if (!this.match(17)) return expr;
	    if (this.state.maybeInArrowParameters) {
	      const nextCh = this.lookaheadCharCode();
	      if (nextCh === 44 || nextCh === 61 || nextCh === 58 || nextCh === 41) {
	        this.setOptionalParametersError(refExpressionErrors);
	        return expr;
	      }
	    }
	    return super.parseConditional(expr, startLoc, refExpressionErrors);
	  }
	  parseParenItem(node, startLoc) {
	    const newNode = super.parseParenItem(node, startLoc);
	    if (this.eat(17)) {
	      newNode.optional = true;
	      this.resetEndLocation(node);
	    }
	    if (this.match(14)) {
	      const typeCastNode = this.startNodeAt(startLoc);
	      typeCastNode.expression = node;
	      typeCastNode.typeAnnotation = this.tsParseTypeAnnotation();
	      return this.finishNode(typeCastNode, "TSTypeCastExpression");
	    }
	    return node;
	  }
	  parseExportDeclaration(node) {
	    if (!this.state.isAmbientContext && this.isContextual(125)) {
	      return this.tsInAmbientContext(() => this.parseExportDeclaration(node));
	    }
	    const startLoc = this.state.startLoc;
	    const isDeclare = this.eatContextual(125);
	    if (isDeclare && (this.isContextual(125) || !this.shouldParseExportDeclaration())) {
	      throw this.raise(TSErrors.ExpectedAmbientAfterExportDeclare, this.state.startLoc);
	    }
	    const isIdentifier = tokenIsIdentifier(this.state.type);
	    const declaration = isIdentifier && this.tsTryParseExportDeclaration() || super.parseExportDeclaration(node);
	    if (!declaration) return null;
	    if (declaration.type === "TSInterfaceDeclaration" || declaration.type === "TSTypeAliasDeclaration" || isDeclare) {
	      node.exportKind = "type";
	    }
	    if (isDeclare && declaration.type !== "TSImportEqualsDeclaration") {
	      this.resetStartLocation(declaration, startLoc);
	      declaration.declare = true;
	    }
	    return declaration;
	  }
	  parseClassId(node, isStatement, optionalId, bindingType) {
	    if ((!isStatement || optionalId) && this.isContextual(113)) {
	      return;
	    }
	    super.parseClassId(node, isStatement, optionalId, node.declare ? 1024 : 8331);
	    const typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutConstModifiers);
	    if (typeParameters) node.typeParameters = typeParameters;
	  }
	  parseClassPropertyAnnotation(node) {
	    if (!node.optional) {
	      if (this.eat(35)) {
	        node.definite = true;
	      } else if (this.eat(17)) {
	        node.optional = true;
	      }
	    }
	    const type = this.tsTryParseTypeAnnotation();
	    if (type) node.typeAnnotation = type;
	  }
	  parseClassProperty(node) {
	    this.parseClassPropertyAnnotation(node);
	    if (this.state.isAmbientContext && !(node.readonly && !node.typeAnnotation) && this.match(29)) {
	      this.raise(TSErrors.DeclareClassFieldHasInitializer, this.state.startLoc);
	    }
	    if (node.abstract && this.match(29)) {
	      const {
	        key
	      } = node;
	      this.raise(TSErrors.AbstractPropertyHasInitializer, this.state.startLoc, {
	        propertyName: key.type === "Identifier" && !node.computed ? key.name : `[${this.input.slice(this.offsetToSourcePos(key.start), this.offsetToSourcePos(key.end))}]`
	      });
	    }
	    return super.parseClassProperty(node);
	  }
	  parseClassPrivateProperty(node) {
	    if (node.abstract) {
	      this.raise(TSErrors.PrivateElementHasAbstract, node);
	    }
	    if (node.accessibility) {
	      this.raise(TSErrors.PrivateElementHasAccessibility, node, {
	        modifier: node.accessibility
	      });
	    }
	    this.parseClassPropertyAnnotation(node);
	    return super.parseClassPrivateProperty(node);
	  }
	  parseClassAccessorProperty(node) {
	    this.parseClassPropertyAnnotation(node);
	    if (node.optional) {
	      this.raise(TSErrors.AccessorCannotBeOptional, node);
	    }
	    return super.parseClassAccessorProperty(node);
	  }
	  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
	    const typeParameters = this.tsTryParseTypeParameters(this.tsParseConstModifier);
	    if (typeParameters && isConstructor) {
	      this.raise(TSErrors.ConstructorHasTypeParameters, typeParameters);
	    }
	    const {
	      declare = false,
	      kind
	    } = method;
	    if (declare && (kind === "get" || kind === "set")) {
	      this.raise(TSErrors.DeclareAccessor, method, {
	        kind
	      });
	    }
	    if (typeParameters) method.typeParameters = typeParameters;
	    super.pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper);
	  }
	  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
	    const typeParameters = this.tsTryParseTypeParameters(this.tsParseConstModifier);
	    if (typeParameters) method.typeParameters = typeParameters;
	    super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
	  }
	  declareClassPrivateMethodInScope(node, kind) {
	    if (node.type === "TSDeclareMethod") return;
	    if (node.type === "MethodDefinition" && node.value.body == null) {
	      return;
	    }
	    super.declareClassPrivateMethodInScope(node, kind);
	  }
	  parseClassSuper(node) {
	    super.parseClassSuper(node);
	    if (node.superClass && (this.match(47) || this.match(51))) {
	      {
	        node.superTypeParameters = this.tsParseTypeArgumentsInExpression();
	      }
	    }
	    if (this.eatContextual(113)) {
	      node.implements = this.tsParseHeritageClause("implements");
	    }
	  }
	  parseObjPropValue(prop, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors) {
	    const typeParameters = this.tsTryParseTypeParameters(this.tsParseConstModifier);
	    if (typeParameters) prop.typeParameters = typeParameters;
	    return super.parseObjPropValue(prop, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors);
	  }
	  parseFunctionParams(node, isConstructor) {
	    const typeParameters = this.tsTryParseTypeParameters(this.tsParseConstModifier);
	    if (typeParameters) node.typeParameters = typeParameters;
	    super.parseFunctionParams(node, isConstructor);
	  }
	  parseVarId(decl, kind) {
	    super.parseVarId(decl, kind);
	    if (decl.id.type === "Identifier" && !this.hasPrecedingLineBreak() && this.eat(35)) {
	      decl.definite = true;
	    }
	    const type = this.tsTryParseTypeAnnotation();
	    if (type) {
	      decl.id.typeAnnotation = type;
	      this.resetEndLocation(decl.id);
	    }
	  }
	  parseAsyncArrowFromCallExpression(node, call) {
	    if (this.match(14)) {
	      node.returnType = this.tsParseTypeAnnotation();
	    }
	    return super.parseAsyncArrowFromCallExpression(node, call);
	  }
	  parseMaybeAssign(refExpressionErrors, afterLeftParse) {
	    var _jsx, _jsx2, _typeCast, _jsx3, _typeCast2;
	    let state;
	    let jsx;
	    let typeCast;
	    if (this.hasPlugin("jsx") && (this.match(143) || this.match(47))) {
	      state = this.state.clone();
	      jsx = this.tryParse(() => super.parseMaybeAssign(refExpressionErrors, afterLeftParse), state);
	      if (!jsx.error) return jsx.node;
	      const {
	        context
	      } = this.state;
	      const currentContext = context[context.length - 1];
	      if (currentContext === types.j_oTag || currentContext === types.j_expr) {
	        context.pop();
	      }
	    }
	    if (!((_jsx = jsx) != null && _jsx.error) && !this.match(47)) {
	      return super.parseMaybeAssign(refExpressionErrors, afterLeftParse);
	    }
	    if (!state || state === this.state) state = this.state.clone();
	    let typeParameters;
	    const arrow = this.tryParse(abort => {
	      var _expr$extra, _typeParameters;
	      typeParameters = this.tsParseTypeParameters(this.tsParseConstModifier);
	      const expr = super.parseMaybeAssign(refExpressionErrors, afterLeftParse);
	      if (expr.type !== "ArrowFunctionExpression" || (_expr$extra = expr.extra) != null && _expr$extra.parenthesized) {
	        abort();
	      }
	      if (((_typeParameters = typeParameters) == null ? void 0 : _typeParameters.params.length) !== 0) {
	        this.resetStartLocationFromNode(expr, typeParameters);
	      }
	      expr.typeParameters = typeParameters;
	      return expr;
	    }, state);
	    if (!arrow.error && !arrow.aborted) {
	      if (typeParameters) this.reportReservedArrowTypeParam(typeParameters);
	      return arrow.node;
	    }
	    if (!jsx) {
	      assert(!this.hasPlugin("jsx"));
	      typeCast = this.tryParse(() => super.parseMaybeAssign(refExpressionErrors, afterLeftParse), state);
	      if (!typeCast.error) return typeCast.node;
	    }
	    if ((_jsx2 = jsx) != null && _jsx2.node) {
	      this.state = jsx.failState;
	      return jsx.node;
	    }
	    if (arrow.node) {
	      this.state = arrow.failState;
	      if (typeParameters) this.reportReservedArrowTypeParam(typeParameters);
	      return arrow.node;
	    }
	    if ((_typeCast = typeCast) != null && _typeCast.node) {
	      this.state = typeCast.failState;
	      return typeCast.node;
	    }
	    throw ((_jsx3 = jsx) == null ? void 0 : _jsx3.error) || arrow.error || ((_typeCast2 = typeCast) == null ? void 0 : _typeCast2.error);
	  }
	  reportReservedArrowTypeParam(node) {
	    var _node$extra2;
	    if (node.params.length === 1 && !node.params[0].constraint && !((_node$extra2 = node.extra) != null && _node$extra2.trailingComma) && this.getPluginOption("typescript", "disallowAmbiguousJSXLike")) {
	      this.raise(TSErrors.ReservedArrowTypeParam, node);
	    }
	  }
	  parseMaybeUnary(refExpressionErrors, sawUnary) {
	    if (!this.hasPlugin("jsx") && this.match(47)) {
	      return this.tsParseTypeAssertion();
	    }
	    return super.parseMaybeUnary(refExpressionErrors, sawUnary);
	  }
	  parseArrow(node) {
	    if (this.match(14)) {
	      const result = this.tryParse(abort => {
	        const returnType = this.tsParseTypeOrTypePredicateAnnotation(14);
	        if (this.canInsertSemicolon() || !this.match(19)) abort();
	        return returnType;
	      });
	      if (result.aborted) return;
	      if (!result.thrown) {
	        if (result.error) this.state = result.failState;
	        node.returnType = result.node;
	      }
	    }
	    return super.parseArrow(node);
	  }
	  parseFunctionParamType(param) {
	    if (this.eat(17)) {
	      param.optional = true;
	    }
	    const type = this.tsTryParseTypeAnnotation();
	    if (type) param.typeAnnotation = type;
	    this.resetEndLocation(param);
	    return param;
	  }
	  isAssignable(node, isBinding) {
	    switch (node.type) {
	      case "TSTypeCastExpression":
	        return this.isAssignable(node.expression, isBinding);
	      case "TSParameterProperty":
	        return true;
	      default:
	        return super.isAssignable(node, isBinding);
	    }
	  }
	  toAssignable(node, isLHS = false) {
	    switch (node.type) {
	      case "ParenthesizedExpression":
	        this.toAssignableParenthesizedExpression(node, isLHS);
	        break;
	      case "TSAsExpression":
	      case "TSSatisfiesExpression":
	      case "TSNonNullExpression":
	      case "TSTypeAssertion":
	        if (isLHS) {
	          this.expressionScope.recordArrowParameterBindingError(TSErrors.UnexpectedTypeCastInParameter, node);
	        } else {
	          this.raise(TSErrors.UnexpectedTypeCastInParameter, node);
	        }
	        this.toAssignable(node.expression, isLHS);
	        break;
	      case "AssignmentExpression":
	        if (!isLHS && node.left.type === "TSTypeCastExpression") {
	          node.left = this.typeCastToParameter(node.left);
	        }
	      default:
	        super.toAssignable(node, isLHS);
	    }
	  }
	  toAssignableParenthesizedExpression(node, isLHS) {
	    switch (node.expression.type) {
	      case "TSAsExpression":
	      case "TSSatisfiesExpression":
	      case "TSNonNullExpression":
	      case "TSTypeAssertion":
	      case "ParenthesizedExpression":
	        this.toAssignable(node.expression, isLHS);
	        break;
	      default:
	        super.toAssignable(node, isLHS);
	    }
	  }
	  checkToRestConversion(node, allowPattern) {
	    switch (node.type) {
	      case "TSAsExpression":
	      case "TSSatisfiesExpression":
	      case "TSTypeAssertion":
	      case "TSNonNullExpression":
	        this.checkToRestConversion(node.expression, false);
	        break;
	      default:
	        super.checkToRestConversion(node, allowPattern);
	    }
	  }
	  isValidLVal(type, isUnparenthesizedInAssign, binding) {
	    switch (type) {
	      case "TSTypeCastExpression":
	        return true;
	      case "TSParameterProperty":
	        return "parameter";
	      case "TSNonNullExpression":
	        return "expression";
	      case "TSAsExpression":
	      case "TSSatisfiesExpression":
	      case "TSTypeAssertion":
	        return (binding !== 64 || !isUnparenthesizedInAssign) && ["expression", true];
	      default:
	        return super.isValidLVal(type, isUnparenthesizedInAssign, binding);
	    }
	  }
	  parseBindingAtom() {
	    if (this.state.type === 78) {
	      return this.parseIdentifier(true);
	    }
	    return super.parseBindingAtom();
	  }
	  parseMaybeDecoratorArguments(expr, startLoc) {
	    if (this.match(47) || this.match(51)) {
	      const typeArguments = this.tsParseTypeArgumentsInExpression();
	      if (this.match(10)) {
	        const call = super.parseMaybeDecoratorArguments(expr, startLoc);
	        {
	          call.typeParameters = typeArguments;
	        }
	        return call;
	      }
	      this.unexpected(null, 10);
	    }
	    return super.parseMaybeDecoratorArguments(expr, startLoc);
	  }
	  checkCommaAfterRest(close) {
	    if (this.state.isAmbientContext && this.match(12) && this.lookaheadCharCode() === close) {
	      this.next();
	      return false;
	    }
	    return super.checkCommaAfterRest(close);
	  }
	  isClassMethod() {
	    return this.match(47) || super.isClassMethod();
	  }
	  isClassProperty() {
	    return this.match(35) || this.match(14) || super.isClassProperty();
	  }
	  parseMaybeDefault(startLoc, left) {
	    const node = super.parseMaybeDefault(startLoc, left);
	    if (node.type === "AssignmentPattern" && node.typeAnnotation && node.right.start < node.typeAnnotation.start) {
	      this.raise(TSErrors.TypeAnnotationAfterAssign, node.typeAnnotation);
	    }
	    return node;
	  }
	  getTokenFromCode(code) {
	    if (this.state.inType) {
	      if (code === 62) {
	        this.finishOp(48, 1);
	        return;
	      }
	      if (code === 60) {
	        this.finishOp(47, 1);
	        return;
	      }
	    }
	    super.getTokenFromCode(code);
	  }
	  reScan_lt_gt() {
	    const {
	      type
	    } = this.state;
	    if (type === 47) {
	      this.state.pos -= 1;
	      this.readToken_lt();
	    } else if (type === 48) {
	      this.state.pos -= 1;
	      this.readToken_gt();
	    }
	  }
	  reScan_lt() {
	    const {
	      type
	    } = this.state;
	    if (type === 51) {
	      this.state.pos -= 2;
	      this.finishOp(47, 1);
	      return 47;
	    }
	    return type;
	  }
	  toAssignableListItem(exprList, index, isLHS) {
	    const node = exprList[index];
	    if (node.type === "TSTypeCastExpression") {
	      exprList[index] = this.typeCastToParameter(node);
	    }
	    super.toAssignableListItem(exprList, index, isLHS);
	  }
	  typeCastToParameter(node) {
	    node.expression.typeAnnotation = node.typeAnnotation;
	    this.resetEndLocation(node.expression, node.typeAnnotation.loc.end);
	    return node.expression;
	  }
	  shouldParseArrow(params) {
	    if (this.match(14)) {
	      return params.every(expr => this.isAssignable(expr, true));
	    }
	    return super.shouldParseArrow(params);
	  }
	  shouldParseAsyncArrow() {
	    return this.match(14) || super.shouldParseAsyncArrow();
	  }
	  canHaveLeadingDecorator() {
	    return super.canHaveLeadingDecorator() || this.isAbstractClass();
	  }
	  jsxParseOpeningElementAfterName(node) {
	    if (this.match(47) || this.match(51)) {
	      const typeArguments = this.tsTryParseAndCatch(() => this.tsParseTypeArgumentsInExpression());
	      if (typeArguments) {
	        {
	          node.typeParameters = typeArguments;
	        }
	      }
	    }
	    return super.jsxParseOpeningElementAfterName(node);
	  }
	  getGetterSetterExpectedParamCount(method) {
	    const baseCount = super.getGetterSetterExpectedParamCount(method);
	    const params = this.getObjectOrClassMethodParams(method);
	    const firstParam = params[0];
	    const hasContextParam = firstParam && this.isThisParam(firstParam);
	    return hasContextParam ? baseCount + 1 : baseCount;
	  }
	  parseCatchClauseParam() {
	    const param = super.parseCatchClauseParam();
	    const type = this.tsTryParseTypeAnnotation();
	    if (type) {
	      param.typeAnnotation = type;
	      this.resetEndLocation(param);
	    }
	    return param;
	  }
	  tsInAmbientContext(cb) {
	    const {
	      isAmbientContext: oldIsAmbientContext,
	      strict: oldStrict
	    } = this.state;
	    this.state.isAmbientContext = true;
	    this.state.strict = false;
	    try {
	      return cb();
	    } finally {
	      this.state.isAmbientContext = oldIsAmbientContext;
	      this.state.strict = oldStrict;
	    }
	  }
	  parseClass(node, isStatement, optionalId) {
	    const oldInAbstractClass = this.state.inAbstractClass;
	    this.state.inAbstractClass = !!node.abstract;
	    try {
	      return super.parseClass(node, isStatement, optionalId);
	    } finally {
	      this.state.inAbstractClass = oldInAbstractClass;
	    }
	  }
	  tsParseAbstractDeclaration(node, decorators) {
	    if (this.match(80)) {
	      node.abstract = true;
	      return this.maybeTakeDecorators(decorators, this.parseClass(node, true, false));
	    } else if (this.isContextual(129)) {
	      if (!this.hasFollowingLineBreak()) {
	        node.abstract = true;
	        this.raise(TSErrors.NonClassMethodPropertyHasAbstractModifier, node);
	        return this.tsParseInterfaceDeclaration(node);
	      }
	    } else {
	      this.unexpected(null, 80);
	    }
	  }
	  parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope) {
	    const method = super.parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope);
	    if (method.abstract || method.type === "TSAbstractMethodDefinition") {
	      const hasEstreePlugin = this.hasPlugin("estree");
	      const methodFn = hasEstreePlugin ? method.value : method;
	      if (methodFn.body) {
	        const {
	          key
	        } = method;
	        this.raise(TSErrors.AbstractMethodHasImplementation, method, {
	          methodName: key.type === "Identifier" && !method.computed ? key.name : `[${this.input.slice(this.offsetToSourcePos(key.start), this.offsetToSourcePos(key.end))}]`
	        });
	      }
	    }
	    return method;
	  }
	  tsParseTypeParameterName() {
	    const typeName = this.parseIdentifier();
	    return typeName.name;
	  }
	  shouldParseAsAmbientContext() {
	    return !!this.getPluginOption("typescript", "dts");
	  }
	  parse() {
	    if (this.shouldParseAsAmbientContext()) {
	      this.state.isAmbientContext = true;
	    }
	    return super.parse();
	  }
	  getExpression() {
	    if (this.shouldParseAsAmbientContext()) {
	      this.state.isAmbientContext = true;
	    }
	    return super.getExpression();
	  }
	  parseExportSpecifier(node, isString, isInTypeExport, isMaybeTypeOnly) {
	    if (!isString && isMaybeTypeOnly) {
	      this.parseTypeOnlyImportExportSpecifier(node, false, isInTypeExport);
	      return this.finishNode(node, "ExportSpecifier");
	    }
	    node.exportKind = "value";
	    return super.parseExportSpecifier(node, isString, isInTypeExport, isMaybeTypeOnly);
	  }
	  parseImportSpecifier(specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly, bindingType) {
	    if (!importedIsString && isMaybeTypeOnly) {
	      this.parseTypeOnlyImportExportSpecifier(specifier, true, isInTypeOnlyImport);
	      return this.finishNode(specifier, "ImportSpecifier");
	    }
	    specifier.importKind = "value";
	    return super.parseImportSpecifier(specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly, isInTypeOnlyImport ? 4098 : 4096);
	  }
	  parseTypeOnlyImportExportSpecifier(node, isImport, isInTypeOnlyImportExport) {
	    const leftOfAsKey = isImport ? "imported" : "local";
	    const rightOfAsKey = isImport ? "local" : "exported";
	    let leftOfAs = node[leftOfAsKey];
	    let rightOfAs;
	    let hasTypeSpecifier = false;
	    let canParseAsKeyword = true;
	    const loc = leftOfAs.loc.start;
	    if (this.isContextual(93)) {
	      const firstAs = this.parseIdentifier();
	      if (this.isContextual(93)) {
	        const secondAs = this.parseIdentifier();
	        if (tokenIsKeywordOrIdentifier(this.state.type)) {
	          hasTypeSpecifier = true;
	          leftOfAs = firstAs;
	          rightOfAs = isImport ? this.parseIdentifier() : this.parseModuleExportName();
	          canParseAsKeyword = false;
	        } else {
	          rightOfAs = secondAs;
	          canParseAsKeyword = false;
	        }
	      } else if (tokenIsKeywordOrIdentifier(this.state.type)) {
	        canParseAsKeyword = false;
	        rightOfAs = isImport ? this.parseIdentifier() : this.parseModuleExportName();
	      } else {
	        hasTypeSpecifier = true;
	        leftOfAs = firstAs;
	      }
	    } else if (tokenIsKeywordOrIdentifier(this.state.type)) {
	      hasTypeSpecifier = true;
	      if (isImport) {
	        leftOfAs = this.parseIdentifier(true);
	        if (!this.isContextual(93)) {
	          this.checkReservedWord(leftOfAs.name, leftOfAs.loc.start, true, true);
	        }
	      } else {
	        leftOfAs = this.parseModuleExportName();
	      }
	    }
	    if (hasTypeSpecifier && isInTypeOnlyImportExport) {
	      this.raise(isImport ? TSErrors.TypeModifierIsUsedInTypeImports : TSErrors.TypeModifierIsUsedInTypeExports, loc);
	    }
	    node[leftOfAsKey] = leftOfAs;
	    node[rightOfAsKey] = rightOfAs;
	    const kindKey = isImport ? "importKind" : "exportKind";
	    node[kindKey] = hasTypeSpecifier ? "type" : "value";
	    if (canParseAsKeyword && this.eatContextual(93)) {
	      node[rightOfAsKey] = isImport ? this.parseIdentifier() : this.parseModuleExportName();
	    }
	    if (!node[rightOfAsKey]) {
	      node[rightOfAsKey] = this.cloneIdentifier(node[leftOfAsKey]);
	    }
	    if (isImport) {
	      this.checkIdentifier(node[rightOfAsKey], hasTypeSpecifier ? 4098 : 4096);
	    }
	  }
	  fillOptionalPropertiesForTSESLint(node) {
	    var _node$directive, _node$decorators, _node$optional, _node$typeAnnotation, _node$accessibility, _node$decorators2, _node$override, _node$readonly, _node$static, _node$declare, _node$returnType, _node$typeParameters, _node$optional2, _node$optional3, _node$accessibility2, _node$readonly2, _node$static2, _node$declare2, _node$definite, _node$readonly3, _node$typeAnnotation2, _node$accessibility3, _node$decorators3, _node$override2, _node$optional4, _node$id, _node$abstract, _node$declare3, _node$decorators4, _node$implements, _node$superTypeArgume, _node$typeParameters2, _node$declare4, _node$definite2, _node$const, _node$declare5, _node$computed, _node$qualifier, _node$options, _node$declare6, _node$extends, _node$declare7, _node$global, _node$const2, _node$in, _node$out;
	    switch (node.type) {
	      case "ExpressionStatement":
	        (_node$directive = node.directive) != null ? _node$directive : node.directive = undefined;
	        return;
	      case "RestElement":
	        node.value = undefined;
	      case "Identifier":
	      case "ArrayPattern":
	      case "AssignmentPattern":
	      case "ObjectPattern":
	        (_node$decorators = node.decorators) != null ? _node$decorators : node.decorators = [];
	        (_node$optional = node.optional) != null ? _node$optional : node.optional = false;
	        (_node$typeAnnotation = node.typeAnnotation) != null ? _node$typeAnnotation : node.typeAnnotation = undefined;
	        return;
	      case "TSParameterProperty":
	        (_node$accessibility = node.accessibility) != null ? _node$accessibility : node.accessibility = undefined;
	        (_node$decorators2 = node.decorators) != null ? _node$decorators2 : node.decorators = [];
	        (_node$override = node.override) != null ? _node$override : node.override = false;
	        (_node$readonly = node.readonly) != null ? _node$readonly : node.readonly = false;
	        (_node$static = node.static) != null ? _node$static : node.static = false;
	        return;
	      case "TSEmptyBodyFunctionExpression":
	        node.body = null;
	      case "TSDeclareFunction":
	      case "FunctionDeclaration":
	      case "FunctionExpression":
	      case "ClassMethod":
	      case "ClassPrivateMethod":
	        (_node$declare = node.declare) != null ? _node$declare : node.declare = false;
	        (_node$returnType = node.returnType) != null ? _node$returnType : node.returnType = undefined;
	        (_node$typeParameters = node.typeParameters) != null ? _node$typeParameters : node.typeParameters = undefined;
	        return;
	      case "Property":
	        (_node$optional2 = node.optional) != null ? _node$optional2 : node.optional = false;
	        return;
	      case "TSMethodSignature":
	      case "TSPropertySignature":
	        (_node$optional3 = node.optional) != null ? _node$optional3 : node.optional = false;
	      case "TSIndexSignature":
	        (_node$accessibility2 = node.accessibility) != null ? _node$accessibility2 : node.accessibility = undefined;
	        (_node$readonly2 = node.readonly) != null ? _node$readonly2 : node.readonly = false;
	        (_node$static2 = node.static) != null ? _node$static2 : node.static = false;
	        return;
	      case "TSAbstractPropertyDefinition":
	      case "PropertyDefinition":
	      case "TSAbstractAccessorProperty":
	      case "AccessorProperty":
	        (_node$declare2 = node.declare) != null ? _node$declare2 : node.declare = false;
	        (_node$definite = node.definite) != null ? _node$definite : node.definite = false;
	        (_node$readonly3 = node.readonly) != null ? _node$readonly3 : node.readonly = false;
	        (_node$typeAnnotation2 = node.typeAnnotation) != null ? _node$typeAnnotation2 : node.typeAnnotation = undefined;
	      case "TSAbstractMethodDefinition":
	      case "MethodDefinition":
	        (_node$accessibility3 = node.accessibility) != null ? _node$accessibility3 : node.accessibility = undefined;
	        (_node$decorators3 = node.decorators) != null ? _node$decorators3 : node.decorators = [];
	        (_node$override2 = node.override) != null ? _node$override2 : node.override = false;
	        (_node$optional4 = node.optional) != null ? _node$optional4 : node.optional = false;
	        return;
	      case "ClassExpression":
	        (_node$id = node.id) != null ? _node$id : node.id = null;
	      case "ClassDeclaration":
	        (_node$abstract = node.abstract) != null ? _node$abstract : node.abstract = false;
	        (_node$declare3 = node.declare) != null ? _node$declare3 : node.declare = false;
	        (_node$decorators4 = node.decorators) != null ? _node$decorators4 : node.decorators = [];
	        (_node$implements = node.implements) != null ? _node$implements : node.implements = [];
	        (_node$superTypeArgume = node.superTypeArguments) != null ? _node$superTypeArgume : node.superTypeArguments = undefined;
	        (_node$typeParameters2 = node.typeParameters) != null ? _node$typeParameters2 : node.typeParameters = undefined;
	        return;
	      case "TSTypeAliasDeclaration":
	      case "VariableDeclaration":
	        (_node$declare4 = node.declare) != null ? _node$declare4 : node.declare = false;
	        return;
	      case "VariableDeclarator":
	        (_node$definite2 = node.definite) != null ? _node$definite2 : node.definite = false;
	        return;
	      case "TSEnumDeclaration":
	        (_node$const = node.const) != null ? _node$const : node.const = false;
	        (_node$declare5 = node.declare) != null ? _node$declare5 : node.declare = false;
	        return;
	      case "TSEnumMember":
	        (_node$computed = node.computed) != null ? _node$computed : node.computed = false;
	        return;
	      case "TSImportType":
	        (_node$qualifier = node.qualifier) != null ? _node$qualifier : node.qualifier = null;
	        (_node$options = node.options) != null ? _node$options : node.options = null;
	        return;
	      case "TSInterfaceDeclaration":
	        (_node$declare6 = node.declare) != null ? _node$declare6 : node.declare = false;
	        (_node$extends = node.extends) != null ? _node$extends : node.extends = [];
	        return;
	      case "TSModuleDeclaration":
	        (_node$declare7 = node.declare) != null ? _node$declare7 : node.declare = false;
	        (_node$global = node.global) != null ? _node$global : node.global = node.kind === "global";
	        return;
	      case "TSTypeParameter":
	        (_node$const2 = node.const) != null ? _node$const2 : node.const = false;
	        (_node$in = node.in) != null ? _node$in : node.in = false;
	        (_node$out = node.out) != null ? _node$out : node.out = false;
	        return;
	    }
	  }
	};
	function isPossiblyLiteralEnum(expression) {
	  if (expression.type !== "MemberExpression") return false;
	  const {
	    computed,
	    property
	  } = expression;
	  if (computed && property.type !== "StringLiteral" && (property.type !== "TemplateLiteral" || property.expressions.length > 0)) {
	    return false;
	  }
	  return isUncomputedMemberExpressionChain(expression.object);
	}
	function isValidAmbientConstInitializer(expression, estree) {
	  var _expression$extra;
	  const {
	    type
	  } = expression;
	  if ((_expression$extra = expression.extra) != null && _expression$extra.parenthesized) {
	    return false;
	  }
	  if (estree) {
	    if (type === "Literal") {
	      const {
	        value
	      } = expression;
	      if (typeof value === "string" || typeof value === "boolean") {
	        return true;
	      }
	    }
	  } else {
	    if (type === "StringLiteral" || type === "BooleanLiteral") {
	      return true;
	    }
	  }
	  if (isNumber(expression, estree) || isNegativeNumber(expression, estree)) {
	    return true;
	  }
	  if (type === "TemplateLiteral" && expression.expressions.length === 0) {
	    return true;
	  }
	  if (isPossiblyLiteralEnum(expression)) {
	    return true;
	  }
	  return false;
	}
	function isNumber(expression, estree) {
	  if (estree) {
	    return expression.type === "Literal" && (typeof expression.value === "number" || "bigint" in expression);
	  }
	  return expression.type === "NumericLiteral" || expression.type === "BigIntLiteral";
	}
	function isNegativeNumber(expression, estree) {
	  if (expression.type === "UnaryExpression") {
	    const {
	      operator,
	      argument
	    } = expression;
	    if (operator === "-" && isNumber(argument, estree)) {
	      return true;
	    }
	  }
	  return false;
	}
	function isUncomputedMemberExpressionChain(expression) {
	  if (expression.type === "Identifier") return true;
	  if (expression.type !== "MemberExpression" || expression.computed) {
	    return false;
	  }
	  return isUncomputedMemberExpressionChain(expression.object);
	}
	const PlaceholderErrors = ParseErrorEnum`placeholders`({
	  ClassNameIsRequired: "A class name is required.",
	  UnexpectedSpace: "Unexpected space in placeholder."
	});
	var placeholders = superClass => class PlaceholdersParserMixin extends superClass {
	  parsePlaceholder(expectedNode) {
	    if (this.match(133)) {
	      const node = this.startNode();
	      this.next();
	      this.assertNoSpace();
	      node.name = super.parseIdentifier(true);
	      this.assertNoSpace();
	      this.expect(133);
	      return this.finishPlaceholder(node, expectedNode);
	    }
	  }
	  finishPlaceholder(node, expectedNode) {
	    let placeholder = node;
	    if (!placeholder.expectedNode || !placeholder.type) {
	      placeholder = this.finishNode(placeholder, "Placeholder");
	    }
	    placeholder.expectedNode = expectedNode;
	    return placeholder;
	  }
	  getTokenFromCode(code) {
	    if (code === 37 && this.input.charCodeAt(this.state.pos + 1) === 37) {
	      this.finishOp(133, 2);
	    } else {
	      super.getTokenFromCode(code);
	    }
	  }
	  parseExprAtom(refExpressionErrors) {
	    return this.parsePlaceholder("Expression") || super.parseExprAtom(refExpressionErrors);
	  }
	  parseIdentifier(liberal) {
	    return this.parsePlaceholder("Identifier") || super.parseIdentifier(liberal);
	  }
	  checkReservedWord(word, startLoc, checkKeywords, isBinding) {
	    if (word !== undefined) {
	      super.checkReservedWord(word, startLoc, checkKeywords, isBinding);
	    }
	  }
	  cloneIdentifier(node) {
	    const cloned = super.cloneIdentifier(node);
	    if (cloned.type === "Placeholder") {
	      cloned.expectedNode = node.expectedNode;
	    }
	    return cloned;
	  }
	  cloneStringLiteral(node) {
	    if (node.type === "Placeholder") {
	      return this.cloneIdentifier(node);
	    }
	    return super.cloneStringLiteral(node);
	  }
	  parseBindingAtom() {
	    return this.parsePlaceholder("Pattern") || super.parseBindingAtom();
	  }
	  isValidLVal(type, isParenthesized, binding) {
	    return type === "Placeholder" || super.isValidLVal(type, isParenthesized, binding);
	  }
	  toAssignable(node, isLHS) {
	    if (node && node.type === "Placeholder" && node.expectedNode === "Expression") {
	      node.expectedNode = "Pattern";
	    } else {
	      super.toAssignable(node, isLHS);
	    }
	  }
	  chStartsBindingIdentifier(ch, pos) {
	    if (super.chStartsBindingIdentifier(ch, pos)) {
	      return true;
	    }
	    const nextToken = this.lookahead();
	    if (nextToken.type === 133) {
	      return true;
	    }
	    return false;
	  }
	  verifyBreakContinue(node, isBreak) {
	    if (node.label && node.label.type === "Placeholder") return;
	    super.verifyBreakContinue(node, isBreak);
	  }
	  parseExpressionStatement(node, expr) {
	    var _expr$extra;
	    if (expr.type !== "Placeholder" || (_expr$extra = expr.extra) != null && _expr$extra.parenthesized) {
	      return super.parseExpressionStatement(node, expr);
	    }
	    if (this.match(14)) {
	      const stmt = node;
	      stmt.label = this.finishPlaceholder(expr, "Identifier");
	      this.next();
	      stmt.body = super.parseStatementOrSloppyAnnexBFunctionDeclaration();
	      return this.finishNode(stmt, "LabeledStatement");
	    }
	    this.semicolon();
	    const stmtPlaceholder = node;
	    stmtPlaceholder.name = expr.name;
	    return this.finishPlaceholder(stmtPlaceholder, "Statement");
	  }
	  parseBlock(allowDirectives, createNewLexicalScope, afterBlockParse) {
	    return this.parsePlaceholder("BlockStatement") || super.parseBlock(allowDirectives, createNewLexicalScope, afterBlockParse);
	  }
	  parseFunctionId(requireId) {
	    return this.parsePlaceholder("Identifier") || super.parseFunctionId(requireId);
	  }
	  parseClass(node, isStatement, optionalId) {
	    const type = isStatement ? "ClassDeclaration" : "ClassExpression";
	    this.next();
	    const oldStrict = this.state.strict;
	    const placeholder = this.parsePlaceholder("Identifier");
	    if (placeholder) {
	      if (this.match(81) || this.match(133) || this.match(5)) {
	        node.id = placeholder;
	      } else if (optionalId || !isStatement) {
	        node.id = null;
	        node.body = this.finishPlaceholder(placeholder, "ClassBody");
	        return this.finishNode(node, type);
	      } else {
	        throw this.raise(PlaceholderErrors.ClassNameIsRequired, this.state.startLoc);
	      }
	    } else {
	      this.parseClassId(node, isStatement, optionalId);
	    }
	    super.parseClassSuper(node);
	    node.body = this.parsePlaceholder("ClassBody") || super.parseClassBody(!!node.superClass, oldStrict);
	    return this.finishNode(node, type);
	  }
	  parseExport(node, decorators) {
	    const placeholder = this.parsePlaceholder("Identifier");
	    if (!placeholder) return super.parseExport(node, decorators);
	    const node2 = node;
	    if (!this.isContextual(98) && !this.match(12)) {
	      node2.specifiers = [];
	      node2.source = null;
	      node2.declaration = this.finishPlaceholder(placeholder, "Declaration");
	      return this.finishNode(node2, "ExportNamedDeclaration");
	    }
	    this.expectPlugin("exportDefaultFrom");
	    const specifier = this.startNode();
	    specifier.exported = placeholder;
	    node2.specifiers = [this.finishNode(specifier, "ExportDefaultSpecifier")];
	    return super.parseExport(node2, decorators);
	  }
	  isExportDefaultSpecifier() {
	    if (this.match(65)) {
	      const next = this.nextTokenStart();
	      if (this.isUnparsedContextual(next, "from")) {
	        if (this.input.startsWith(tokenLabelName(133), this.nextTokenStartSince(next + 4))) {
	          return true;
	        }
	      }
	    }
	    return super.isExportDefaultSpecifier();
	  }
	  maybeParseExportDefaultSpecifier(node, maybeDefaultIdentifier) {
	    var _specifiers;
	    if ((_specifiers = node.specifiers) != null && _specifiers.length) {
	      return true;
	    }
	    return super.maybeParseExportDefaultSpecifier(node, maybeDefaultIdentifier);
	  }
	  checkExport(node) {
	    const {
	      specifiers
	    } = node;
	    if (specifiers != null && specifiers.length) {
	      node.specifiers = specifiers.filter(node => node.exported.type === "Placeholder");
	    }
	    super.checkExport(node);
	    node.specifiers = specifiers;
	  }
	  parseImport(node) {
	    const placeholder = this.parsePlaceholder("Identifier");
	    if (!placeholder) return super.parseImport(node);
	    node.specifiers = [];
	    if (!this.isContextual(98) && !this.match(12)) {
	      node.source = this.finishPlaceholder(placeholder, "StringLiteral");
	      this.semicolon();
	      return this.finishNode(node, "ImportDeclaration");
	    }
	    const specifier = this.startNodeAtNode(placeholder);
	    specifier.local = placeholder;
	    node.specifiers.push(this.finishNode(specifier, "ImportDefaultSpecifier"));
	    if (this.eat(12)) {
	      const hasStarImport = this.maybeParseStarImportSpecifier(node);
	      if (!hasStarImport) this.parseNamedImportSpecifiers(node);
	    }
	    this.expectContextual(98);
	    node.source = this.parseImportSource();
	    this.semicolon();
	    return this.finishNode(node, "ImportDeclaration");
	  }
	  parseImportSource() {
	    return this.parsePlaceholder("StringLiteral") || super.parseImportSource();
	  }
	  assertNoSpace() {
	    if (this.state.start > this.offsetToSourcePos(this.state.lastTokEndLoc.index)) {
	      this.raise(PlaceholderErrors.UnexpectedSpace, this.state.lastTokEndLoc);
	    }
	  }
	};
	var v8intrinsic = superClass => class V8IntrinsicMixin extends superClass {
	  parseV8Intrinsic() {
	    if (this.match(54)) {
	      const v8IntrinsicStartLoc = this.state.startLoc;
	      const node = this.startNode();
	      this.next();
	      if (tokenIsIdentifier(this.state.type)) {
	        const name = this.parseIdentifierName();
	        const identifier = this.createIdentifier(node, name);
	        this.castNodeTo(identifier, "V8IntrinsicIdentifier");
	        if (this.match(10)) {
	          return identifier;
	        }
	      }
	      this.unexpected(v8IntrinsicStartLoc);
	    }
	  }
	  parseExprAtom(refExpressionErrors) {
	    return this.parseV8Intrinsic() || super.parseExprAtom(refExpressionErrors);
	  }
	};
	const PIPELINE_PROPOSALS = ["minimal", "fsharp", "hack", "smart"];
	const TOPIC_TOKENS = ["^^", "@@", "^", "%", "#"];
	function validatePlugins(pluginsMap) {
	  if (pluginsMap.has("decorators")) {
	    if (pluginsMap.has("decorators-legacy")) {
	      throw new Error("Cannot use the decorators and decorators-legacy plugin together");
	    }
	    const decoratorsBeforeExport = pluginsMap.get("decorators").decoratorsBeforeExport;
	    if (decoratorsBeforeExport != null && typeof decoratorsBeforeExport !== "boolean") {
	      throw new Error("'decoratorsBeforeExport' must be a boolean, if specified.");
	    }
	    const allowCallParenthesized = pluginsMap.get("decorators").allowCallParenthesized;
	    if (allowCallParenthesized != null && typeof allowCallParenthesized !== "boolean") {
	      throw new Error("'allowCallParenthesized' must be a boolean.");
	    }
	  }
	  if (pluginsMap.has("flow") && pluginsMap.has("typescript")) {
	    throw new Error("Cannot combine flow and typescript plugins.");
	  }
	  if (pluginsMap.has("placeholders") && pluginsMap.has("v8intrinsic")) {
	    throw new Error("Cannot combine placeholders and v8intrinsic plugins.");
	  }
	  if (pluginsMap.has("pipelineOperator")) {
	    var _pluginsMap$get2;
	    const proposal = pluginsMap.get("pipelineOperator").proposal;
	    if (!PIPELINE_PROPOSALS.includes(proposal)) {
	      const proposalList = PIPELINE_PROPOSALS.map(p => `"${p}"`).join(", ");
	      throw new Error(`"pipelineOperator" requires "proposal" option whose value must be one of: ${proposalList}.`);
	    }
	    if (proposal === "hack") {
	      if (pluginsMap.has("placeholders")) {
	        throw new Error("Cannot combine placeholders plugin and Hack-style pipes.");
	      }
	      if (pluginsMap.has("v8intrinsic")) {
	        throw new Error("Cannot combine v8intrinsic plugin and Hack-style pipes.");
	      }
	      const topicToken = pluginsMap.get("pipelineOperator").topicToken;
	      if (!TOPIC_TOKENS.includes(topicToken)) {
	        const tokenList = TOPIC_TOKENS.map(t => `"${t}"`).join(", ");
	        throw new Error(`"pipelineOperator" in "proposal": "hack" mode also requires a "topicToken" option whose value must be one of: ${tokenList}.`);
	      }
	      {
	        var _pluginsMap$get;
	        if (topicToken === "#" && ((_pluginsMap$get = pluginsMap.get("recordAndTuple")) == null ? void 0 : _pluginsMap$get.syntaxType) === "hash") {
	          throw new Error(`Plugin conflict between \`["pipelineOperator", { proposal: "hack", topicToken: "#" }]\` and \`${JSON.stringify(["recordAndTuple", pluginsMap.get("recordAndTuple")])}\`.`);
	        }
	      }
	    } else if (proposal === "smart" && ((_pluginsMap$get2 = pluginsMap.get("recordAndTuple")) == null ? void 0 : _pluginsMap$get2.syntaxType) === "hash") {
	      throw new Error(`Plugin conflict between \`["pipelineOperator", { proposal: "smart" }]\` and \`${JSON.stringify(["recordAndTuple", pluginsMap.get("recordAndTuple")])}\`.`);
	    }
	  }
	  if (pluginsMap.has("moduleAttributes")) {
	    {
	      if (pluginsMap.has("deprecatedImportAssert") || pluginsMap.has("importAssertions")) {
	        throw new Error("Cannot combine importAssertions, deprecatedImportAssert and moduleAttributes plugins.");
	      }
	      const moduleAttributesVersionPluginOption = pluginsMap.get("moduleAttributes").version;
	      if (moduleAttributesVersionPluginOption !== "may-2020") {
	        throw new Error("The 'moduleAttributes' plugin requires a 'version' option," + " representing the last proposal update. Currently, the" + " only supported value is 'may-2020'.");
	      }
	    }
	  }
	  if (pluginsMap.has("importAssertions")) {
	    if (pluginsMap.has("deprecatedImportAssert")) {
	      throw new Error("Cannot combine importAssertions and deprecatedImportAssert plugins.");
	    }
	  }
	  if (!pluginsMap.has("deprecatedImportAssert") && pluginsMap.has("importAttributes") && pluginsMap.get("importAttributes").deprecatedAssertSyntax) {
	    {
	      pluginsMap.set("deprecatedImportAssert", {});
	    }
	  }
	  if (pluginsMap.has("recordAndTuple")) {
	    {
	      const syntaxType = pluginsMap.get("recordAndTuple").syntaxType;
	      if (syntaxType != null) {
	        const RECORD_AND_TUPLE_SYNTAX_TYPES = ["hash", "bar"];
	        if (!RECORD_AND_TUPLE_SYNTAX_TYPES.includes(syntaxType)) {
	          throw new Error("The 'syntaxType' option of the 'recordAndTuple' plugin must be one of: " + RECORD_AND_TUPLE_SYNTAX_TYPES.map(p => `'${p}'`).join(", "));
	        }
	      }
	    }
	  }
	  if (pluginsMap.has("asyncDoExpressions") && !pluginsMap.has("doExpressions")) {
	    const error = new Error("'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins.");
	    error.missingPlugins = "doExpressions";
	    throw error;
	  }
	  if (pluginsMap.has("optionalChainingAssign") && pluginsMap.get("optionalChainingAssign").version !== "2023-07") {
	    throw new Error("The 'optionalChainingAssign' plugin requires a 'version' option," + " representing the last proposal update. Currently, the" + " only supported value is '2023-07'.");
	  }
	}
	const mixinPlugins = {
	  estree,
	  jsx,
	  flow,
	  typescript,
	  v8intrinsic,
	  placeholders
	};
	const mixinPluginNames = Object.keys(mixinPlugins);
	class ExpressionParser extends LValParser {
	  checkProto(prop, isRecord, sawProto, refExpressionErrors) {
	    if (prop.type === "SpreadElement" || this.isObjectMethod(prop) || prop.computed || prop.shorthand) {
	      return sawProto;
	    }
	    const key = prop.key;
	    const name = key.type === "Identifier" ? key.name : key.value;
	    if (name === "__proto__") {
	      if (isRecord) {
	        this.raise(Errors.RecordNoProto, key);
	        return true;
	      }
	      if (sawProto) {
	        if (refExpressionErrors) {
	          if (refExpressionErrors.doubleProtoLoc === null) {
	            refExpressionErrors.doubleProtoLoc = key.loc.start;
	          }
	        } else {
	          this.raise(Errors.DuplicateProto, key);
	        }
	      }
	      return true;
	    }
	    return sawProto;
	  }
	  shouldExitDescending(expr, potentialArrowAt) {
	    return expr.type === "ArrowFunctionExpression" && this.offsetToSourcePos(expr.start) === potentialArrowAt;
	  }
	  getExpression() {
	    this.enterInitialScopes();
	    this.nextToken();
	    if (this.match(140)) {
	      throw this.raise(Errors.ParseExpressionEmptyInput, this.state.startLoc);
	    }
	    const expr = this.parseExpression();
	    if (!this.match(140)) {
	      throw this.raise(Errors.ParseExpressionExpectsEOF, this.state.startLoc, {
	        unexpected: this.input.codePointAt(this.state.start)
	      });
	    }
	    this.finalizeRemainingComments();
	    expr.comments = this.comments;
	    expr.errors = this.state.errors;
	    if (this.optionFlags & 256) {
	      expr.tokens = this.tokens;
	    }
	    return expr;
	  }
	  parseExpression(disallowIn, refExpressionErrors) {
	    if (disallowIn) {
	      return this.disallowInAnd(() => this.parseExpressionBase(refExpressionErrors));
	    }
	    return this.allowInAnd(() => this.parseExpressionBase(refExpressionErrors));
	  }
	  parseExpressionBase(refExpressionErrors) {
	    const startLoc = this.state.startLoc;
	    const expr = this.parseMaybeAssign(refExpressionErrors);
	    if (this.match(12)) {
	      const node = this.startNodeAt(startLoc);
	      node.expressions = [expr];
	      while (this.eat(12)) {
	        node.expressions.push(this.parseMaybeAssign(refExpressionErrors));
	      }
	      this.toReferencedList(node.expressions);
	      return this.finishNode(node, "SequenceExpression");
	    }
	    return expr;
	  }
	  parseMaybeAssignDisallowIn(refExpressionErrors, afterLeftParse) {
	    return this.disallowInAnd(() => this.parseMaybeAssign(refExpressionErrors, afterLeftParse));
	  }
	  parseMaybeAssignAllowIn(refExpressionErrors, afterLeftParse) {
	    return this.allowInAnd(() => this.parseMaybeAssign(refExpressionErrors, afterLeftParse));
	  }
	  setOptionalParametersError(refExpressionErrors) {
	    refExpressionErrors.optionalParametersLoc = this.state.startLoc;
	  }
	  parseMaybeAssign(refExpressionErrors, afterLeftParse) {
	    const startLoc = this.state.startLoc;
	    const isYield = this.isContextual(108);
	    if (isYield) {
	      if (this.prodParam.hasYield) {
	        this.next();
	        let left = this.parseYield(startLoc);
	        if (afterLeftParse) {
	          left = afterLeftParse.call(this, left, startLoc);
	        }
	        return left;
	      }
	    }
	    let ownExpressionErrors;
	    if (refExpressionErrors) {
	      ownExpressionErrors = false;
	    } else {
	      refExpressionErrors = new ExpressionErrors();
	      ownExpressionErrors = true;
	    }
	    const {
	      type
	    } = this.state;
	    if (type === 10 || tokenIsIdentifier(type)) {
	      this.state.potentialArrowAt = this.state.start;
	    }
	    let left = this.parseMaybeConditional(refExpressionErrors);
	    if (afterLeftParse) {
	      left = afterLeftParse.call(this, left, startLoc);
	    }
	    if (tokenIsAssignment(this.state.type)) {
	      const node = this.startNodeAt(startLoc);
	      const operator = this.state.value;
	      node.operator = operator;
	      if (this.match(29)) {
	        this.toAssignable(left, true);
	        node.left = left;
	        const startIndex = startLoc.index;
	        if (refExpressionErrors.doubleProtoLoc != null && refExpressionErrors.doubleProtoLoc.index >= startIndex) {
	          refExpressionErrors.doubleProtoLoc = null;
	        }
	        if (refExpressionErrors.shorthandAssignLoc != null && refExpressionErrors.shorthandAssignLoc.index >= startIndex) {
	          refExpressionErrors.shorthandAssignLoc = null;
	        }
	        if (refExpressionErrors.privateKeyLoc != null && refExpressionErrors.privateKeyLoc.index >= startIndex) {
	          this.checkDestructuringPrivate(refExpressionErrors);
	          refExpressionErrors.privateKeyLoc = null;
	        }
	      } else {
	        node.left = left;
	      }
	      this.next();
	      node.right = this.parseMaybeAssign();
	      this.checkLVal(left, this.finishNode(node, "AssignmentExpression"));
	      return node;
	    } else if (ownExpressionErrors) {
	      this.checkExpressionErrors(refExpressionErrors, true);
	    }
	    if (isYield) {
	      const {
	        type
	      } = this.state;
	      const startsExpr = this.hasPlugin("v8intrinsic") ? tokenCanStartExpression(type) : tokenCanStartExpression(type) && !this.match(54);
	      if (startsExpr && !this.isAmbiguousPrefixOrIdentifier()) {
	        this.raiseOverwrite(Errors.YieldNotInGeneratorFunction, startLoc);
	        return this.parseYield(startLoc);
	      }
	    }
	    return left;
	  }
	  parseMaybeConditional(refExpressionErrors) {
	    const startLoc = this.state.startLoc;
	    const potentialArrowAt = this.state.potentialArrowAt;
	    const expr = this.parseExprOps(refExpressionErrors);
	    if (this.shouldExitDescending(expr, potentialArrowAt)) {
	      return expr;
	    }
	    return this.parseConditional(expr, startLoc, refExpressionErrors);
	  }
	  parseConditional(expr, startLoc, refExpressionErrors) {
	    if (this.eat(17)) {
	      const node = this.startNodeAt(startLoc);
	      node.test = expr;
	      node.consequent = this.parseMaybeAssignAllowIn();
	      this.expect(14);
	      node.alternate = this.parseMaybeAssign();
	      return this.finishNode(node, "ConditionalExpression");
	    }
	    return expr;
	  }
	  parseMaybeUnaryOrPrivate(refExpressionErrors) {
	    return this.match(139) ? this.parsePrivateName() : this.parseMaybeUnary(refExpressionErrors);
	  }
	  parseExprOps(refExpressionErrors) {
	    const startLoc = this.state.startLoc;
	    const potentialArrowAt = this.state.potentialArrowAt;
	    const expr = this.parseMaybeUnaryOrPrivate(refExpressionErrors);
	    if (this.shouldExitDescending(expr, potentialArrowAt)) {
	      return expr;
	    }
	    return this.parseExprOp(expr, startLoc, -1);
	  }
	  parseExprOp(left, leftStartLoc, minPrec) {
	    if (this.isPrivateName(left)) {
	      const value = this.getPrivateNameSV(left);
	      if (minPrec >= tokenOperatorPrecedence(58) || !this.prodParam.hasIn || !this.match(58)) {
	        this.raise(Errors.PrivateInExpectedIn, left, {
	          identifierName: value
	        });
	      }
	      this.classScope.usePrivateName(value, left.loc.start);
	    }
	    const op = this.state.type;
	    if (tokenIsOperator(op) && (this.prodParam.hasIn || !this.match(58))) {
	      let prec = tokenOperatorPrecedence(op);
	      if (prec > minPrec) {
	        if (op === 39) {
	          this.expectPlugin("pipelineOperator");
	          if (this.state.inFSharpPipelineDirectBody) {
	            return left;
	          }
	          this.checkPipelineAtInfixOperator(left, leftStartLoc);
	        }
	        const node = this.startNodeAt(leftStartLoc);
	        node.left = left;
	        node.operator = this.state.value;
	        const logical = op === 41 || op === 42;
	        const coalesce = op === 40;
	        if (coalesce) {
	          prec = tokenOperatorPrecedence(42);
	        }
	        this.next();
	        if (op === 39 && this.hasPlugin(["pipelineOperator", {
	          proposal: "minimal"
	        }])) {
	          if (this.state.type === 96 && this.prodParam.hasAwait) {
	            throw this.raise(Errors.UnexpectedAwaitAfterPipelineBody, this.state.startLoc);
	          }
	        }
	        node.right = this.parseExprOpRightExpr(op, prec);
	        const finishedNode = this.finishNode(node, logical || coalesce ? "LogicalExpression" : "BinaryExpression");
	        const nextOp = this.state.type;
	        if (coalesce && (nextOp === 41 || nextOp === 42) || logical && nextOp === 40) {
	          throw this.raise(Errors.MixingCoalesceWithLogical, this.state.startLoc);
	        }
	        return this.parseExprOp(finishedNode, leftStartLoc, minPrec);
	      }
	    }
	    return left;
	  }
	  parseExprOpRightExpr(op, prec) {
	    const startLoc = this.state.startLoc;
	    switch (op) {
	      case 39:
	        switch (this.getPluginOption("pipelineOperator", "proposal")) {
	          case "hack":
	            return this.withTopicBindingContext(() => {
	              return this.parseHackPipeBody();
	            });
	          case "fsharp":
	            return this.withSoloAwaitPermittingContext(() => {
	              return this.parseFSharpPipelineBody(prec);
	            });
	        }
	        if (this.getPluginOption("pipelineOperator", "proposal") === "smart") {
	          return this.withTopicBindingContext(() => {
	            if (this.prodParam.hasYield && this.isContextual(108)) {
	              throw this.raise(Errors.PipeBodyIsTighter, this.state.startLoc);
	            }
	            return this.parseSmartPipelineBodyInStyle(this.parseExprOpBaseRightExpr(op, prec), startLoc);
	          });
	        }
	      default:
	        return this.parseExprOpBaseRightExpr(op, prec);
	    }
	  }
	  parseExprOpBaseRightExpr(op, prec) {
	    const startLoc = this.state.startLoc;
	    return this.parseExprOp(this.parseMaybeUnaryOrPrivate(), startLoc, tokenIsRightAssociative(op) ? prec - 1 : prec);
	  }
	  parseHackPipeBody() {
	    var _body$extra;
	    const {
	      startLoc
	    } = this.state;
	    const body = this.parseMaybeAssign();
	    const requiredParentheses = UnparenthesizedPipeBodyDescriptions.has(body.type);
	    if (requiredParentheses && !((_body$extra = body.extra) != null && _body$extra.parenthesized)) {
	      this.raise(Errors.PipeUnparenthesizedBody, startLoc, {
	        type: body.type
	      });
	    }
	    if (!this.topicReferenceWasUsedInCurrentContext()) {
	      this.raise(Errors.PipeTopicUnused, startLoc);
	    }
	    return body;
	  }
	  checkExponentialAfterUnary(node) {
	    if (this.match(57)) {
	      this.raise(Errors.UnexpectedTokenUnaryExponentiation, node.argument);
	    }
	  }
	  parseMaybeUnary(refExpressionErrors, sawUnary) {
	    const startLoc = this.state.startLoc;
	    const isAwait = this.isContextual(96);
	    if (isAwait && this.recordAwaitIfAllowed()) {
	      this.next();
	      const expr = this.parseAwait(startLoc);
	      if (!sawUnary) this.checkExponentialAfterUnary(expr);
	      return expr;
	    }
	    const update = this.match(34);
	    const node = this.startNode();
	    if (tokenIsPrefix(this.state.type)) {
	      node.operator = this.state.value;
	      node.prefix = true;
	      if (this.match(72)) {
	        this.expectPlugin("throwExpressions");
	      }
	      const isDelete = this.match(89);
	      this.next();
	      node.argument = this.parseMaybeUnary(null, true);
	      this.checkExpressionErrors(refExpressionErrors, true);
	      if (this.state.strict && isDelete) {
	        const arg = node.argument;
	        if (arg.type === "Identifier") {
	          this.raise(Errors.StrictDelete, node);
	        } else if (this.hasPropertyAsPrivateName(arg)) {
	          this.raise(Errors.DeletePrivateField, node);
	        }
	      }
	      if (!update) {
	        if (!sawUnary) {
	          this.checkExponentialAfterUnary(node);
	        }
	        return this.finishNode(node, "UnaryExpression");
	      }
	    }
	    const expr = this.parseUpdate(node, update, refExpressionErrors);
	    if (isAwait) {
	      const {
	        type
	      } = this.state;
	      const startsExpr = this.hasPlugin("v8intrinsic") ? tokenCanStartExpression(type) : tokenCanStartExpression(type) && !this.match(54);
	      if (startsExpr && !this.isAmbiguousPrefixOrIdentifier()) {
	        this.raiseOverwrite(Errors.AwaitNotInAsyncContext, startLoc);
	        return this.parseAwait(startLoc);
	      }
	    }
	    return expr;
	  }
	  parseUpdate(node, update, refExpressionErrors) {
	    if (update) {
	      const updateExpressionNode = node;
	      this.checkLVal(updateExpressionNode.argument, this.finishNode(updateExpressionNode, "UpdateExpression"));
	      return node;
	    }
	    const startLoc = this.state.startLoc;
	    let expr = this.parseExprSubscripts(refExpressionErrors);
	    if (this.checkExpressionErrors(refExpressionErrors, false)) return expr;
	    while (tokenIsPostfix(this.state.type) && !this.canInsertSemicolon()) {
	      const node = this.startNodeAt(startLoc);
	      node.operator = this.state.value;
	      node.prefix = false;
	      node.argument = expr;
	      this.next();
	      this.checkLVal(expr, expr = this.finishNode(node, "UpdateExpression"));
	    }
	    return expr;
	  }
	  parseExprSubscripts(refExpressionErrors) {
	    const startLoc = this.state.startLoc;
	    const potentialArrowAt = this.state.potentialArrowAt;
	    const expr = this.parseExprAtom(refExpressionErrors);
	    if (this.shouldExitDescending(expr, potentialArrowAt)) {
	      return expr;
	    }
	    return this.parseSubscripts(expr, startLoc);
	  }
	  parseSubscripts(base, startLoc, noCalls) {
	    const state = {
	      optionalChainMember: false,
	      maybeAsyncArrow: this.atPossibleAsyncArrow(base),
	      stop: false
	    };
	    do {
	      base = this.parseSubscript(base, startLoc, noCalls, state);
	      state.maybeAsyncArrow = false;
	    } while (!state.stop);
	    return base;
	  }
	  parseSubscript(base, startLoc, noCalls, state) {
	    const {
	      type
	    } = this.state;
	    if (!noCalls && type === 15) {
	      return this.parseBind(base, startLoc, noCalls, state);
	    } else if (tokenIsTemplate(type)) {
	      return this.parseTaggedTemplateExpression(base, startLoc, state);
	    }
	    let optional = false;
	    if (type === 18) {
	      if (noCalls) {
	        this.raise(Errors.OptionalChainingNoNew, this.state.startLoc);
	        if (this.lookaheadCharCode() === 40) {
	          return this.stopParseSubscript(base, state);
	        }
	      }
	      state.optionalChainMember = optional = true;
	      this.next();
	    }
	    if (!noCalls && this.match(10)) {
	      return this.parseCoverCallAndAsyncArrowHead(base, startLoc, state, optional);
	    } else {
	      const computed = this.eat(0);
	      if (computed || optional || this.eat(16)) {
	        return this.parseMember(base, startLoc, state, computed, optional);
	      } else {
	        return this.stopParseSubscript(base, state);
	      }
	    }
	  }
	  stopParseSubscript(base, state) {
	    state.stop = true;
	    return base;
	  }
	  parseMember(base, startLoc, state, computed, optional) {
	    const node = this.startNodeAt(startLoc);
	    node.object = base;
	    node.computed = computed;
	    if (computed) {
	      node.property = this.parseExpression();
	      this.expect(3);
	    } else if (this.match(139)) {
	      if (base.type === "Super") {
	        this.raise(Errors.SuperPrivateField, startLoc);
	      }
	      this.classScope.usePrivateName(this.state.value, this.state.startLoc);
	      node.property = this.parsePrivateName();
	    } else {
	      node.property = this.parseIdentifier(true);
	    }
	    if (state.optionalChainMember) {
	      node.optional = optional;
	      return this.finishNode(node, "OptionalMemberExpression");
	    } else {
	      return this.finishNode(node, "MemberExpression");
	    }
	  }
	  parseBind(base, startLoc, noCalls, state) {
	    const node = this.startNodeAt(startLoc);
	    node.object = base;
	    this.next();
	    node.callee = this.parseNoCallExpr();
	    state.stop = true;
	    return this.parseSubscripts(this.finishNode(node, "BindExpression"), startLoc, noCalls);
	  }
	  parseCoverCallAndAsyncArrowHead(base, startLoc, state, optional) {
	    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
	    let refExpressionErrors = null;
	    this.state.maybeInArrowParameters = true;
	    this.next();
	    const node = this.startNodeAt(startLoc);
	    node.callee = base;
	    const {
	      maybeAsyncArrow,
	      optionalChainMember
	    } = state;
	    if (maybeAsyncArrow) {
	      this.expressionScope.enter(newAsyncArrowScope());
	      refExpressionErrors = new ExpressionErrors();
	    }
	    if (optionalChainMember) {
	      node.optional = optional;
	    }
	    if (optional) {
	      node.arguments = this.parseCallExpressionArguments(11);
	    } else {
	      node.arguments = this.parseCallExpressionArguments(11, base.type !== "Super", node, refExpressionErrors);
	    }
	    let finishedNode = this.finishCallExpression(node, optionalChainMember);
	    if (maybeAsyncArrow && this.shouldParseAsyncArrow() && !optional) {
	      state.stop = true;
	      this.checkDestructuringPrivate(refExpressionErrors);
	      this.expressionScope.validateAsPattern();
	      this.expressionScope.exit();
	      finishedNode = this.parseAsyncArrowFromCallExpression(this.startNodeAt(startLoc), finishedNode);
	    } else {
	      if (maybeAsyncArrow) {
	        this.checkExpressionErrors(refExpressionErrors, true);
	        this.expressionScope.exit();
	      }
	      this.toReferencedArguments(finishedNode);
	    }
	    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
	    return finishedNode;
	  }
	  toReferencedArguments(node, isParenthesizedExpr) {
	    this.toReferencedListDeep(node.arguments, isParenthesizedExpr);
	  }
	  parseTaggedTemplateExpression(base, startLoc, state) {
	    const node = this.startNodeAt(startLoc);
	    node.tag = base;
	    node.quasi = this.parseTemplate(true);
	    if (state.optionalChainMember) {
	      this.raise(Errors.OptionalChainingNoTemplate, startLoc);
	    }
	    return this.finishNode(node, "TaggedTemplateExpression");
	  }
	  atPossibleAsyncArrow(base) {
	    return base.type === "Identifier" && base.name === "async" && this.state.lastTokEndLoc.index === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.offsetToSourcePos(base.start) === this.state.potentialArrowAt;
	  }
	  finishCallExpression(node, optional) {
	    if (node.callee.type === "Import") {
	      if (node.arguments.length === 0 || node.arguments.length > 2) {
	        this.raise(Errors.ImportCallArity, node);
	      } else {
	        for (const arg of node.arguments) {
	          if (arg.type === "SpreadElement") {
	            this.raise(Errors.ImportCallSpreadArgument, arg);
	          }
	        }
	      }
	    }
	    return this.finishNode(node, optional ? "OptionalCallExpression" : "CallExpression");
	  }
	  parseCallExpressionArguments(close, allowPlaceholder, nodeForExtra, refExpressionErrors) {
	    const elts = [];
	    let first = true;
	    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
	    this.state.inFSharpPipelineDirectBody = false;
	    while (!this.eat(close)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(12);
	        if (this.match(close)) {
	          if (nodeForExtra) {
	            this.addTrailingCommaExtraToNode(nodeForExtra);
	          }
	          this.next();
	          break;
	        }
	      }
	      elts.push(this.parseExprListItem(false, refExpressionErrors, allowPlaceholder));
	    }
	    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
	    return elts;
	  }
	  shouldParseAsyncArrow() {
	    return this.match(19) && !this.canInsertSemicolon();
	  }
	  parseAsyncArrowFromCallExpression(node, call) {
	    var _call$extra;
	    this.resetPreviousNodeTrailingComments(call);
	    this.expect(19);
	    this.parseArrowExpression(node, call.arguments, true, (_call$extra = call.extra) == null ? void 0 : _call$extra.trailingCommaLoc);
	    if (call.innerComments) {
	      setInnerComments(node, call.innerComments);
	    }
	    if (call.callee.trailingComments) {
	      setInnerComments(node, call.callee.trailingComments);
	    }
	    return node;
	  }
	  parseNoCallExpr() {
	    const startLoc = this.state.startLoc;
	    return this.parseSubscripts(this.parseExprAtom(), startLoc, true);
	  }
	  parseExprAtom(refExpressionErrors) {
	    let node;
	    let decorators = null;
	    const {
	      type
	    } = this.state;
	    switch (type) {
	      case 79:
	        return this.parseSuper();
	      case 83:
	        node = this.startNode();
	        this.next();
	        if (this.match(16)) {
	          return this.parseImportMetaPropertyOrPhaseCall(node);
	        }
	        if (this.match(10)) {
	          if (this.optionFlags & 512) {
	            return this.parseImportCall(node);
	          } else {
	            return this.finishNode(node, "Import");
	          }
	        } else {
	          this.raise(Errors.UnsupportedImport, this.state.lastTokStartLoc);
	          return this.finishNode(node, "Import");
	        }
	      case 78:
	        node = this.startNode();
	        this.next();
	        return this.finishNode(node, "ThisExpression");
	      case 90:
	        {
	          return this.parseDo(this.startNode(), false);
	        }
	      case 56:
	      case 31:
	        {
	          this.readRegexp();
	          return this.parseRegExpLiteral(this.state.value);
	        }
	      case 135:
	        return this.parseNumericLiteral(this.state.value);
	      case 136:
	        return this.parseBigIntLiteral(this.state.value);
	      case 134:
	        return this.parseStringLiteral(this.state.value);
	      case 84:
	        return this.parseNullLiteral();
	      case 85:
	        return this.parseBooleanLiteral(true);
	      case 86:
	        return this.parseBooleanLiteral(false);
	      case 10:
	        {
	          const canBeArrow = this.state.potentialArrowAt === this.state.start;
	          return this.parseParenAndDistinguishExpression(canBeArrow);
	        }
	      case 0:
	        {
	          return this.parseArrayLike(3, true, false, refExpressionErrors);
	        }
	      case 5:
	        {
	          return this.parseObjectLike(8, false, false, refExpressionErrors);
	        }
	      case 68:
	        return this.parseFunctionOrFunctionSent();
	      case 26:
	        decorators = this.parseDecorators();
	      case 80:
	        return this.parseClass(this.maybeTakeDecorators(decorators, this.startNode()), false);
	      case 77:
	        return this.parseNewOrNewTarget();
	      case 25:
	      case 24:
	        return this.parseTemplate(false);
	      case 15:
	        {
	          node = this.startNode();
	          this.next();
	          node.object = null;
	          const callee = node.callee = this.parseNoCallExpr();
	          if (callee.type === "MemberExpression") {
	            return this.finishNode(node, "BindExpression");
	          } else {
	            throw this.raise(Errors.UnsupportedBind, callee);
	          }
	        }
	      case 139:
	        {
	          this.raise(Errors.PrivateInExpectedIn, this.state.startLoc, {
	            identifierName: this.state.value
	          });
	          return this.parsePrivateName();
	        }
	      case 33:
	        {
	          return this.parseTopicReferenceThenEqualsSign(54, "%");
	        }
	      case 32:
	        {
	          return this.parseTopicReferenceThenEqualsSign(44, "^");
	        }
	      case 37:
	      case 38:
	        {
	          return this.parseTopicReference("hack");
	        }
	      case 44:
	      case 54:
	      case 27:
	        {
	          const pipeProposal = this.getPluginOption("pipelineOperator", "proposal");
	          if (pipeProposal) {
	            return this.parseTopicReference(pipeProposal);
	          }
	          this.unexpected();
	          break;
	        }
	      case 47:
	        {
	          const lookaheadCh = this.input.codePointAt(this.nextTokenStart());
	          if (isIdentifierStart(lookaheadCh) || lookaheadCh === 62) {
	            this.expectOnePlugin(["jsx", "flow", "typescript"]);
	          } else {
	            this.unexpected();
	          }
	          break;
	        }
	      default:
	        {
	          if (type === 137) {
	            return this.parseDecimalLiteral(this.state.value);
	          } else if (type === 2 || type === 1) {
	            return this.parseArrayLike(this.state.type === 2 ? 4 : 3, false, true);
	          } else if (type === 6 || type === 7) {
	            return this.parseObjectLike(this.state.type === 6 ? 9 : 8, false, true);
	          }
	        }
	        if (tokenIsIdentifier(type)) {
	          if (this.isContextual(127) && this.lookaheadInLineCharCode() === 123) {
	            return this.parseModuleExpression();
	          }
	          const canBeArrow = this.state.potentialArrowAt === this.state.start;
	          const containsEsc = this.state.containsEsc;
	          const id = this.parseIdentifier();
	          if (!containsEsc && id.name === "async" && !this.canInsertSemicolon()) {
	            const {
	              type
	            } = this.state;
	            if (type === 68) {
	              this.resetPreviousNodeTrailingComments(id);
	              this.next();
	              return this.parseAsyncFunctionExpression(this.startNodeAtNode(id));
	            } else if (tokenIsIdentifier(type)) {
	              if (this.lookaheadCharCode() === 61) {
	                return this.parseAsyncArrowUnaryFunction(this.startNodeAtNode(id));
	              } else {
	                return id;
	              }
	            } else if (type === 90) {
	              this.resetPreviousNodeTrailingComments(id);
	              return this.parseDo(this.startNodeAtNode(id), true);
	            }
	          }
	          if (canBeArrow && this.match(19) && !this.canInsertSemicolon()) {
	            this.next();
	            return this.parseArrowExpression(this.startNodeAtNode(id), [id], false);
	          }
	          return id;
	        } else {
	          this.unexpected();
	        }
	    }
	  }
	  parseTopicReferenceThenEqualsSign(topicTokenType, topicTokenValue) {
	    const pipeProposal = this.getPluginOption("pipelineOperator", "proposal");
	    if (pipeProposal) {
	      this.state.type = topicTokenType;
	      this.state.value = topicTokenValue;
	      this.state.pos--;
	      this.state.end--;
	      this.state.endLoc = createPositionWithColumnOffset(this.state.endLoc, -1);
	      return this.parseTopicReference(pipeProposal);
	    } else {
	      this.unexpected();
	    }
	  }
	  parseTopicReference(pipeProposal) {
	    const node = this.startNode();
	    const startLoc = this.state.startLoc;
	    const tokenType = this.state.type;
	    this.next();
	    return this.finishTopicReference(node, startLoc, pipeProposal, tokenType);
	  }
	  finishTopicReference(node, startLoc, pipeProposal, tokenType) {
	    if (this.testTopicReferenceConfiguration(pipeProposal, startLoc, tokenType)) {
	      if (pipeProposal === "hack") {
	        if (!this.topicReferenceIsAllowedInCurrentContext()) {
	          this.raise(Errors.PipeTopicUnbound, startLoc);
	        }
	        this.registerTopicReference();
	        return this.finishNode(node, "TopicReference");
	      } else {
	        if (!this.topicReferenceIsAllowedInCurrentContext()) {
	          this.raise(Errors.PrimaryTopicNotAllowed, startLoc);
	        }
	        this.registerTopicReference();
	        return this.finishNode(node, "PipelinePrimaryTopicReference");
	      }
	    } else {
	      throw this.raise(Errors.PipeTopicUnconfiguredToken, startLoc, {
	        token: tokenLabelName(tokenType)
	      });
	    }
	  }
	  testTopicReferenceConfiguration(pipeProposal, startLoc, tokenType) {
	    switch (pipeProposal) {
	      case "hack":
	        {
	          return this.hasPlugin(["pipelineOperator", {
	            topicToken: tokenLabelName(tokenType)
	          }]);
	        }
	      case "smart":
	        return tokenType === 27;
	      default:
	        throw this.raise(Errors.PipeTopicRequiresHackPipes, startLoc);
	    }
	  }
	  parseAsyncArrowUnaryFunction(node) {
	    this.prodParam.enter(functionFlags(true, this.prodParam.hasYield));
	    const params = [this.parseIdentifier()];
	    this.prodParam.exit();
	    if (this.hasPrecedingLineBreak()) {
	      this.raise(Errors.LineTerminatorBeforeArrow, this.state.curPosition());
	    }
	    this.expect(19);
	    return this.parseArrowExpression(node, params, true);
	  }
	  parseDo(node, isAsync) {
	    this.expectPlugin("doExpressions");
	    if (isAsync) {
	      this.expectPlugin("asyncDoExpressions");
	    }
	    node.async = isAsync;
	    this.next();
	    const oldLabels = this.state.labels;
	    this.state.labels = [];
	    if (isAsync) {
	      this.prodParam.enter(2);
	      node.body = this.parseBlock();
	      this.prodParam.exit();
	    } else {
	      node.body = this.parseBlock();
	    }
	    this.state.labels = oldLabels;
	    return this.finishNode(node, "DoExpression");
	  }
	  parseSuper() {
	    const node = this.startNode();
	    this.next();
	    if (this.match(10) && !this.scope.allowDirectSuper && !(this.optionFlags & 16)) {
	      this.raise(Errors.SuperNotAllowed, node);
	    } else if (!this.scope.allowSuper && !(this.optionFlags & 16)) {
	      this.raise(Errors.UnexpectedSuper, node);
	    }
	    if (!this.match(10) && !this.match(0) && !this.match(16)) {
	      this.raise(Errors.UnsupportedSuper, node);
	    }
	    return this.finishNode(node, "Super");
	  }
	  parsePrivateName() {
	    const node = this.startNode();
	    const id = this.startNodeAt(createPositionWithColumnOffset(this.state.startLoc, 1));
	    const name = this.state.value;
	    this.next();
	    node.id = this.createIdentifier(id, name);
	    return this.finishNode(node, "PrivateName");
	  }
	  parseFunctionOrFunctionSent() {
	    const node = this.startNode();
	    this.next();
	    if (this.prodParam.hasYield && this.match(16)) {
	      const meta = this.createIdentifier(this.startNodeAtNode(node), "function");
	      this.next();
	      if (this.match(103)) {
	        this.expectPlugin("functionSent");
	      } else if (!this.hasPlugin("functionSent")) {
	        this.unexpected();
	      }
	      return this.parseMetaProperty(node, meta, "sent");
	    }
	    return this.parseFunction(node);
	  }
	  parseMetaProperty(node, meta, propertyName) {
	    node.meta = meta;
	    const containsEsc = this.state.containsEsc;
	    node.property = this.parseIdentifier(true);
	    if (node.property.name !== propertyName || containsEsc) {
	      this.raise(Errors.UnsupportedMetaProperty, node.property, {
	        target: meta.name,
	        onlyValidPropertyName: propertyName
	      });
	    }
	    return this.finishNode(node, "MetaProperty");
	  }
	  parseImportMetaPropertyOrPhaseCall(node) {
	    this.next();
	    if (this.isContextual(105) || this.isContextual(97)) {
	      const isSource = this.isContextual(105);
	      this.expectPlugin(isSource ? "sourcePhaseImports" : "deferredImportEvaluation");
	      this.next();
	      node.phase = isSource ? "source" : "defer";
	      return this.parseImportCall(node);
	    } else {
	      const id = this.createIdentifierAt(this.startNodeAtNode(node), "import", this.state.lastTokStartLoc);
	      if (this.isContextual(101)) {
	        if (!this.inModule) {
	          this.raise(Errors.ImportMetaOutsideModule, id);
	        }
	        this.sawUnambiguousESM = true;
	      }
	      return this.parseMetaProperty(node, id, "meta");
	    }
	  }
	  parseLiteralAtNode(value, type, node) {
	    this.addExtra(node, "rawValue", value);
	    this.addExtra(node, "raw", this.input.slice(this.offsetToSourcePos(node.start), this.state.end));
	    node.value = value;
	    this.next();
	    return this.finishNode(node, type);
	  }
	  parseLiteral(value, type) {
	    const node = this.startNode();
	    return this.parseLiteralAtNode(value, type, node);
	  }
	  parseStringLiteral(value) {
	    return this.parseLiteral(value, "StringLiteral");
	  }
	  parseNumericLiteral(value) {
	    return this.parseLiteral(value, "NumericLiteral");
	  }
	  parseBigIntLiteral(value) {
	    return this.parseLiteral(value, "BigIntLiteral");
	  }
	  parseDecimalLiteral(value) {
	    return this.parseLiteral(value, "DecimalLiteral");
	  }
	  parseRegExpLiteral(value) {
	    const node = this.startNode();
	    this.addExtra(node, "raw", this.input.slice(this.offsetToSourcePos(node.start), this.state.end));
	    node.pattern = value.pattern;
	    node.flags = value.flags;
	    this.next();
	    return this.finishNode(node, "RegExpLiteral");
	  }
	  parseBooleanLiteral(value) {
	    const node = this.startNode();
	    node.value = value;
	    this.next();
	    return this.finishNode(node, "BooleanLiteral");
	  }
	  parseNullLiteral() {
	    const node = this.startNode();
	    this.next();
	    return this.finishNode(node, "NullLiteral");
	  }
	  parseParenAndDistinguishExpression(canBeArrow) {
	    const startLoc = this.state.startLoc;
	    let val;
	    this.next();
	    this.expressionScope.enter(newArrowHeadScope());
	    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
	    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
	    this.state.maybeInArrowParameters = true;
	    this.state.inFSharpPipelineDirectBody = false;
	    const innerStartLoc = this.state.startLoc;
	    const exprList = [];
	    const refExpressionErrors = new ExpressionErrors();
	    let first = true;
	    let spreadStartLoc;
	    let optionalCommaStartLoc;
	    while (!this.match(11)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(12, refExpressionErrors.optionalParametersLoc === null ? null : refExpressionErrors.optionalParametersLoc);
	        if (this.match(11)) {
	          optionalCommaStartLoc = this.state.startLoc;
	          break;
	        }
	      }
	      if (this.match(21)) {
	        const spreadNodeStartLoc = this.state.startLoc;
	        spreadStartLoc = this.state.startLoc;
	        exprList.push(this.parseParenItem(this.parseRestBinding(), spreadNodeStartLoc));
	        if (!this.checkCommaAfterRest(41)) {
	          break;
	        }
	      } else {
	        exprList.push(this.parseMaybeAssignAllowIn(refExpressionErrors, this.parseParenItem));
	      }
	    }
	    const innerEndLoc = this.state.lastTokEndLoc;
	    this.expect(11);
	    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
	    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
	    let arrowNode = this.startNodeAt(startLoc);
	    if (canBeArrow && this.shouldParseArrow(exprList) && (arrowNode = this.parseArrow(arrowNode))) {
	      this.checkDestructuringPrivate(refExpressionErrors);
	      this.expressionScope.validateAsPattern();
	      this.expressionScope.exit();
	      this.parseArrowExpression(arrowNode, exprList, false);
	      return arrowNode;
	    }
	    this.expressionScope.exit();
	    if (!exprList.length) {
	      this.unexpected(this.state.lastTokStartLoc);
	    }
	    if (optionalCommaStartLoc) this.unexpected(optionalCommaStartLoc);
	    if (spreadStartLoc) this.unexpected(spreadStartLoc);
	    this.checkExpressionErrors(refExpressionErrors, true);
	    this.toReferencedListDeep(exprList, true);
	    if (exprList.length > 1) {
	      val = this.startNodeAt(innerStartLoc);
	      val.expressions = exprList;
	      this.finishNode(val, "SequenceExpression");
	      this.resetEndLocation(val, innerEndLoc);
	    } else {
	      val = exprList[0];
	    }
	    return this.wrapParenthesis(startLoc, val);
	  }
	  wrapParenthesis(startLoc, expression) {
	    if (!(this.optionFlags & 1024)) {
	      this.addExtra(expression, "parenthesized", true);
	      this.addExtra(expression, "parenStart", startLoc.index);
	      this.takeSurroundingComments(expression, startLoc.index, this.state.lastTokEndLoc.index);
	      return expression;
	    }
	    const parenExpression = this.startNodeAt(startLoc);
	    parenExpression.expression = expression;
	    return this.finishNode(parenExpression, "ParenthesizedExpression");
	  }
	  shouldParseArrow(params) {
	    return !this.canInsertSemicolon();
	  }
	  parseArrow(node) {
	    if (this.eat(19)) {
	      return node;
	    }
	  }
	  parseParenItem(node, startLoc) {
	    return node;
	  }
	  parseNewOrNewTarget() {
	    const node = this.startNode();
	    this.next();
	    if (this.match(16)) {
	      const meta = this.createIdentifier(this.startNodeAtNode(node), "new");
	      this.next();
	      const metaProp = this.parseMetaProperty(node, meta, "target");
	      if (!this.scope.inNonArrowFunction && !this.scope.inClass && !(this.optionFlags & 4)) {
	        this.raise(Errors.UnexpectedNewTarget, metaProp);
	      }
	      return metaProp;
	    }
	    return this.parseNew(node);
	  }
	  parseNew(node) {
	    this.parseNewCallee(node);
	    if (this.eat(10)) {
	      const args = this.parseExprList(11);
	      this.toReferencedList(args);
	      node.arguments = args;
	    } else {
	      node.arguments = [];
	    }
	    return this.finishNode(node, "NewExpression");
	  }
	  parseNewCallee(node) {
	    const isImport = this.match(83);
	    const callee = this.parseNoCallExpr();
	    node.callee = callee;
	    if (isImport && (callee.type === "Import" || callee.type === "ImportExpression")) {
	      this.raise(Errors.ImportCallNotNewExpression, callee);
	    }
	  }
	  parseTemplateElement(isTagged) {
	    const {
	      start,
	      startLoc,
	      end,
	      value
	    } = this.state;
	    const elemStart = start + 1;
	    const elem = this.startNodeAt(createPositionWithColumnOffset(startLoc, 1));
	    if (value === null) {
	      if (!isTagged) {
	        this.raise(Errors.InvalidEscapeSequenceTemplate, createPositionWithColumnOffset(this.state.firstInvalidTemplateEscapePos, 1));
	      }
	    }
	    const isTail = this.match(24);
	    const endOffset = isTail ? -1 : -2;
	    const elemEnd = end + endOffset;
	    elem.value = {
	      raw: this.input.slice(elemStart, elemEnd).replace(/\r\n?/g, "\n"),
	      cooked: value === null ? null : value.slice(1, endOffset)
	    };
	    elem.tail = isTail;
	    this.next();
	    const finishedNode = this.finishNode(elem, "TemplateElement");
	    this.resetEndLocation(finishedNode, createPositionWithColumnOffset(this.state.lastTokEndLoc, endOffset));
	    return finishedNode;
	  }
	  parseTemplate(isTagged) {
	    const node = this.startNode();
	    let curElt = this.parseTemplateElement(isTagged);
	    const quasis = [curElt];
	    const substitutions = [];
	    while (!curElt.tail) {
	      substitutions.push(this.parseTemplateSubstitution());
	      this.readTemplateContinuation();
	      quasis.push(curElt = this.parseTemplateElement(isTagged));
	    }
	    node.expressions = substitutions;
	    node.quasis = quasis;
	    return this.finishNode(node, "TemplateLiteral");
	  }
	  parseTemplateSubstitution() {
	    return this.parseExpression();
	  }
	  parseObjectLike(close, isPattern, isRecord, refExpressionErrors) {
	    if (isRecord) {
	      this.expectPlugin("recordAndTuple");
	    }
	    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
	    this.state.inFSharpPipelineDirectBody = false;
	    let sawProto = false;
	    let first = true;
	    const node = this.startNode();
	    node.properties = [];
	    this.next();
	    while (!this.match(close)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(12);
	        if (this.match(close)) {
	          this.addTrailingCommaExtraToNode(node);
	          break;
	        }
	      }
	      let prop;
	      if (isPattern) {
	        prop = this.parseBindingProperty();
	      } else {
	        prop = this.parsePropertyDefinition(refExpressionErrors);
	        sawProto = this.checkProto(prop, isRecord, sawProto, refExpressionErrors);
	      }
	      if (isRecord && !this.isObjectProperty(prop) && prop.type !== "SpreadElement") {
	        this.raise(Errors.InvalidRecordProperty, prop);
	      }
	      {
	        if (prop.shorthand) {
	          this.addExtra(prop, "shorthand", true);
	        }
	      }
	      node.properties.push(prop);
	    }
	    this.next();
	    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
	    let type = "ObjectExpression";
	    if (isPattern) {
	      type = "ObjectPattern";
	    } else if (isRecord) {
	      type = "RecordExpression";
	    }
	    return this.finishNode(node, type);
	  }
	  addTrailingCommaExtraToNode(node) {
	    this.addExtra(node, "trailingComma", this.state.lastTokStartLoc.index);
	    this.addExtra(node, "trailingCommaLoc", this.state.lastTokStartLoc, false);
	  }
	  maybeAsyncOrAccessorProp(prop) {
	    return !prop.computed && prop.key.type === "Identifier" && (this.isLiteralPropertyName() || this.match(0) || this.match(55));
	  }
	  parsePropertyDefinition(refExpressionErrors) {
	    let decorators = [];
	    if (this.match(26)) {
	      if (this.hasPlugin("decorators")) {
	        this.raise(Errors.UnsupportedPropertyDecorator, this.state.startLoc);
	      }
	      while (this.match(26)) {
	        decorators.push(this.parseDecorator());
	      }
	    }
	    const prop = this.startNode();
	    let isAsync = false;
	    let isAccessor = false;
	    let startLoc;
	    if (this.match(21)) {
	      if (decorators.length) this.unexpected();
	      return this.parseSpread();
	    }
	    if (decorators.length) {
	      prop.decorators = decorators;
	      decorators = [];
	    }
	    prop.method = false;
	    if (refExpressionErrors) {
	      startLoc = this.state.startLoc;
	    }
	    let isGenerator = this.eat(55);
	    this.parsePropertyNamePrefixOperator(prop);
	    const containsEsc = this.state.containsEsc;
	    this.parsePropertyName(prop, refExpressionErrors);
	    if (!isGenerator && !containsEsc && this.maybeAsyncOrAccessorProp(prop)) {
	      const {
	        key
	      } = prop;
	      const keyName = key.name;
	      if (keyName === "async" && !this.hasPrecedingLineBreak()) {
	        isAsync = true;
	        this.resetPreviousNodeTrailingComments(key);
	        isGenerator = this.eat(55);
	        this.parsePropertyName(prop);
	      }
	      if (keyName === "get" || keyName === "set") {
	        isAccessor = true;
	        this.resetPreviousNodeTrailingComments(key);
	        prop.kind = keyName;
	        if (this.match(55)) {
	          isGenerator = true;
	          this.raise(Errors.AccessorIsGenerator, this.state.curPosition(), {
	            kind: keyName
	          });
	          this.next();
	        }
	        this.parsePropertyName(prop);
	      }
	    }
	    return this.parseObjPropValue(prop, startLoc, isGenerator, isAsync, false, isAccessor, refExpressionErrors);
	  }
	  getGetterSetterExpectedParamCount(method) {
	    return method.kind === "get" ? 0 : 1;
	  }
	  getObjectOrClassMethodParams(method) {
	    return method.params;
	  }
	  checkGetterSetterParams(method) {
	    var _params;
	    const paramCount = this.getGetterSetterExpectedParamCount(method);
	    const params = this.getObjectOrClassMethodParams(method);
	    if (params.length !== paramCount) {
	      this.raise(method.kind === "get" ? Errors.BadGetterArity : Errors.BadSetterArity, method);
	    }
	    if (method.kind === "set" && ((_params = params[params.length - 1]) == null ? void 0 : _params.type) === "RestElement") {
	      this.raise(Errors.BadSetterRestParameter, method);
	    }
	  }
	  parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor) {
	    if (isAccessor) {
	      const finishedProp = this.parseMethod(prop, isGenerator, false, false, false, "ObjectMethod");
	      this.checkGetterSetterParams(finishedProp);
	      return finishedProp;
	    }
	    if (isAsync || isGenerator || this.match(10)) {
	      if (isPattern) this.unexpected();
	      prop.kind = "method";
	      prop.method = true;
	      return this.parseMethod(prop, isGenerator, isAsync, false, false, "ObjectMethod");
	    }
	  }
	  parseObjectProperty(prop, startLoc, isPattern, refExpressionErrors) {
	    prop.shorthand = false;
	    if (this.eat(14)) {
	      prop.value = isPattern ? this.parseMaybeDefault(this.state.startLoc) : this.parseMaybeAssignAllowIn(refExpressionErrors);
	      return this.finishObjectProperty(prop);
	    }
	    if (!prop.computed && prop.key.type === "Identifier") {
	      this.checkReservedWord(prop.key.name, prop.key.loc.start, true, false);
	      if (isPattern) {
	        prop.value = this.parseMaybeDefault(startLoc, this.cloneIdentifier(prop.key));
	      } else if (this.match(29)) {
	        const shorthandAssignLoc = this.state.startLoc;
	        if (refExpressionErrors != null) {
	          if (refExpressionErrors.shorthandAssignLoc === null) {
	            refExpressionErrors.shorthandAssignLoc = shorthandAssignLoc;
	          }
	        } else {
	          this.raise(Errors.InvalidCoverInitializedName, shorthandAssignLoc);
	        }
	        prop.value = this.parseMaybeDefault(startLoc, this.cloneIdentifier(prop.key));
	      } else {
	        prop.value = this.cloneIdentifier(prop.key);
	      }
	      prop.shorthand = true;
	      return this.finishObjectProperty(prop);
	    }
	  }
	  finishObjectProperty(node) {
	    return this.finishNode(node, "ObjectProperty");
	  }
	  parseObjPropValue(prop, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors) {
	    const node = this.parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor) || this.parseObjectProperty(prop, startLoc, isPattern, refExpressionErrors);
	    if (!node) this.unexpected();
	    return node;
	  }
	  parsePropertyName(prop, refExpressionErrors) {
	    if (this.eat(0)) {
	      prop.computed = true;
	      prop.key = this.parseMaybeAssignAllowIn();
	      this.expect(3);
	    } else {
	      const {
	        type,
	        value
	      } = this.state;
	      let key;
	      if (tokenIsKeywordOrIdentifier(type)) {
	        key = this.parseIdentifier(true);
	      } else {
	        switch (type) {
	          case 135:
	            key = this.parseNumericLiteral(value);
	            break;
	          case 134:
	            key = this.parseStringLiteral(value);
	            break;
	          case 136:
	            key = this.parseBigIntLiteral(value);
	            break;
	          case 139:
	            {
	              const privateKeyLoc = this.state.startLoc;
	              if (refExpressionErrors != null) {
	                if (refExpressionErrors.privateKeyLoc === null) {
	                  refExpressionErrors.privateKeyLoc = privateKeyLoc;
	                }
	              } else {
	                this.raise(Errors.UnexpectedPrivateField, privateKeyLoc);
	              }
	              key = this.parsePrivateName();
	              break;
	            }
	          default:
	            if (type === 137) {
	              key = this.parseDecimalLiteral(value);
	              break;
	            }
	            this.unexpected();
	        }
	      }
	      prop.key = key;
	      if (type !== 139) {
	        prop.computed = false;
	      }
	    }
	  }
	  initFunction(node, isAsync) {
	    node.id = null;
	    node.generator = false;
	    node.async = isAsync;
	  }
	  parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope = false) {
	    this.initFunction(node, isAsync);
	    node.generator = isGenerator;
	    this.scope.enter(2 | 16 | (inClassScope ? 64 : 0) | (allowDirectSuper ? 32 : 0));
	    this.prodParam.enter(functionFlags(isAsync, node.generator));
	    this.parseFunctionParams(node, isConstructor);
	    const finishedNode = this.parseFunctionBodyAndFinish(node, type, true);
	    this.prodParam.exit();
	    this.scope.exit();
	    return finishedNode;
	  }
	  parseArrayLike(close, canBePattern, isTuple, refExpressionErrors) {
	    if (isTuple) {
	      this.expectPlugin("recordAndTuple");
	    }
	    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
	    this.state.inFSharpPipelineDirectBody = false;
	    const node = this.startNode();
	    this.next();
	    node.elements = this.parseExprList(close, !isTuple, refExpressionErrors, node);
	    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
	    return this.finishNode(node, isTuple ? "TupleExpression" : "ArrayExpression");
	  }
	  parseArrowExpression(node, params, isAsync, trailingCommaLoc) {
	    this.scope.enter(2 | 4);
	    let flags = functionFlags(isAsync, false);
	    if (!this.match(5) && this.prodParam.hasIn) {
	      flags |= 8;
	    }
	    this.prodParam.enter(flags);
	    this.initFunction(node, isAsync);
	    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
	    if (params) {
	      this.state.maybeInArrowParameters = true;
	      this.setArrowFunctionParameters(node, params, trailingCommaLoc);
	    }
	    this.state.maybeInArrowParameters = false;
	    this.parseFunctionBody(node, true);
	    this.prodParam.exit();
	    this.scope.exit();
	    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
	    return this.finishNode(node, "ArrowFunctionExpression");
	  }
	  setArrowFunctionParameters(node, params, trailingCommaLoc) {
	    this.toAssignableList(params, trailingCommaLoc, false);
	    node.params = params;
	  }
	  parseFunctionBodyAndFinish(node, type, isMethod = false) {
	    this.parseFunctionBody(node, false, isMethod);
	    return this.finishNode(node, type);
	  }
	  parseFunctionBody(node, allowExpression, isMethod = false) {
	    const isExpression = allowExpression && !this.match(5);
	    this.expressionScope.enter(newExpressionScope());
	    if (isExpression) {
	      node.body = this.parseMaybeAssign();
	      this.checkParams(node, false, allowExpression, false);
	    } else {
	      const oldStrict = this.state.strict;
	      const oldLabels = this.state.labels;
	      this.state.labels = [];
	      this.prodParam.enter(this.prodParam.currentFlags() | 4);
	      node.body = this.parseBlock(true, false, hasStrictModeDirective => {
	        const nonSimple = !this.isSimpleParamList(node.params);
	        if (hasStrictModeDirective && nonSimple) {
	          this.raise(Errors.IllegalLanguageModeDirective, (node.kind === "method" || node.kind === "constructor") && !!node.key ? node.key.loc.end : node);
	        }
	        const strictModeChanged = !oldStrict && this.state.strict;
	        this.checkParams(node, !this.state.strict && !allowExpression && !isMethod && !nonSimple, allowExpression, strictModeChanged);
	        if (this.state.strict && node.id) {
	          this.checkIdentifier(node.id, 65, strictModeChanged);
	        }
	      });
	      this.prodParam.exit();
	      this.state.labels = oldLabels;
	    }
	    this.expressionScope.exit();
	  }
	  isSimpleParameter(node) {
	    return node.type === "Identifier";
	  }
	  isSimpleParamList(params) {
	    for (let i = 0, len = params.length; i < len; i++) {
	      if (!this.isSimpleParameter(params[i])) return false;
	    }
	    return true;
	  }
	  checkParams(node, allowDuplicates, isArrowFunction, strictModeChanged = true) {
	    const checkClashes = !allowDuplicates && new Set();
	    const formalParameters = {
	      type: "FormalParameters"
	    };
	    for (const param of node.params) {
	      this.checkLVal(param, formalParameters, 5, checkClashes, strictModeChanged);
	    }
	  }
	  parseExprList(close, allowEmpty, refExpressionErrors, nodeForExtra) {
	    const elts = [];
	    let first = true;
	    while (!this.eat(close)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(12);
	        if (this.match(close)) {
	          if (nodeForExtra) {
	            this.addTrailingCommaExtraToNode(nodeForExtra);
	          }
	          this.next();
	          break;
	        }
	      }
	      elts.push(this.parseExprListItem(allowEmpty, refExpressionErrors));
	    }
	    return elts;
	  }
	  parseExprListItem(allowEmpty, refExpressionErrors, allowPlaceholder) {
	    let elt;
	    if (this.match(12)) {
	      if (!allowEmpty) {
	        this.raise(Errors.UnexpectedToken, this.state.curPosition(), {
	          unexpected: ","
	        });
	      }
	      elt = null;
	    } else if (this.match(21)) {
	      const spreadNodeStartLoc = this.state.startLoc;
	      elt = this.parseParenItem(this.parseSpread(refExpressionErrors), spreadNodeStartLoc);
	    } else if (this.match(17)) {
	      this.expectPlugin("partialApplication");
	      if (!allowPlaceholder) {
	        this.raise(Errors.UnexpectedArgumentPlaceholder, this.state.startLoc);
	      }
	      const node = this.startNode();
	      this.next();
	      elt = this.finishNode(node, "ArgumentPlaceholder");
	    } else {
	      elt = this.parseMaybeAssignAllowIn(refExpressionErrors, this.parseParenItem);
	    }
	    return elt;
	  }
	  parseIdentifier(liberal) {
	    const node = this.startNode();
	    const name = this.parseIdentifierName(liberal);
	    return this.createIdentifier(node, name);
	  }
	  createIdentifier(node, name) {
	    node.name = name;
	    node.loc.identifierName = name;
	    return this.finishNode(node, "Identifier");
	  }
	  createIdentifierAt(node, name, endLoc) {
	    node.name = name;
	    node.loc.identifierName = name;
	    return this.finishNodeAt(node, "Identifier", endLoc);
	  }
	  parseIdentifierName(liberal) {
	    let name;
	    const {
	      startLoc,
	      type
	    } = this.state;
	    if (tokenIsKeywordOrIdentifier(type)) {
	      name = this.state.value;
	    } else {
	      this.unexpected();
	    }
	    const tokenIsKeyword = tokenKeywordOrIdentifierIsKeyword(type);
	    if (liberal) {
	      if (tokenIsKeyword) {
	        this.replaceToken(132);
	      }
	    } else {
	      this.checkReservedWord(name, startLoc, tokenIsKeyword, false);
	    }
	    this.next();
	    return name;
	  }
	  checkReservedWord(word, startLoc, checkKeywords, isBinding) {
	    if (word.length > 10) {
	      return;
	    }
	    if (!canBeReservedWord(word)) {
	      return;
	    }
	    if (checkKeywords && isKeyword(word)) {
	      this.raise(Errors.UnexpectedKeyword, startLoc, {
	        keyword: word
	      });
	      return;
	    }
	    const reservedTest = !this.state.strict ? isReservedWord : isBinding ? isStrictBindReservedWord : isStrictReservedWord;
	    if (reservedTest(word, this.inModule)) {
	      this.raise(Errors.UnexpectedReservedWord, startLoc, {
	        reservedWord: word
	      });
	      return;
	    } else if (word === "yield") {
	      if (this.prodParam.hasYield) {
	        this.raise(Errors.YieldBindingIdentifier, startLoc);
	        return;
	      }
	    } else if (word === "await") {
	      if (this.prodParam.hasAwait) {
	        this.raise(Errors.AwaitBindingIdentifier, startLoc);
	        return;
	      }
	      if (this.scope.inStaticBlock) {
	        this.raise(Errors.AwaitBindingIdentifierInStaticBlock, startLoc);
	        return;
	      }
	      this.expressionScope.recordAsyncArrowParametersError(startLoc);
	    } else if (word === "arguments") {
	      if (this.scope.inClassAndNotInNonArrowFunction) {
	        this.raise(Errors.ArgumentsInClass, startLoc);
	        return;
	      }
	    }
	  }
	  recordAwaitIfAllowed() {
	    const isAwaitAllowed = this.prodParam.hasAwait || this.optionFlags & 1 && !this.scope.inFunction;
	    if (isAwaitAllowed && !this.scope.inFunction) {
	      this.state.hasTopLevelAwait = true;
	    }
	    return isAwaitAllowed;
	  }
	  parseAwait(startLoc) {
	    const node = this.startNodeAt(startLoc);
	    this.expressionScope.recordParameterInitializerError(Errors.AwaitExpressionFormalParameter, node);
	    if (this.eat(55)) {
	      this.raise(Errors.ObsoleteAwaitStar, node);
	    }
	    if (!this.scope.inFunction && !(this.optionFlags & 1)) {
	      if (this.isAmbiguousPrefixOrIdentifier()) {
	        this.ambiguousScriptDifferentAst = true;
	      } else {
	        this.sawUnambiguousESM = true;
	      }
	    }
	    if (!this.state.soloAwait) {
	      node.argument = this.parseMaybeUnary(null, true);
	    }
	    return this.finishNode(node, "AwaitExpression");
	  }
	  isAmbiguousPrefixOrIdentifier() {
	    if (this.hasPrecedingLineBreak()) return true;
	    const {
	      type
	    } = this.state;
	    return type === 53 || type === 10 || type === 0 || tokenIsTemplate(type) || type === 102 && !this.state.containsEsc || type === 138 || type === 56 || this.hasPlugin("v8intrinsic") && type === 54;
	  }
	  parseYield(startLoc) {
	    const node = this.startNodeAt(startLoc);
	    this.expressionScope.recordParameterInitializerError(Errors.YieldInParameter, node);
	    let delegating = false;
	    let argument = null;
	    if (!this.hasPrecedingLineBreak()) {
	      delegating = this.eat(55);
	      switch (this.state.type) {
	        case 13:
	        case 140:
	        case 8:
	        case 11:
	        case 3:
	        case 9:
	        case 14:
	        case 12:
	          if (!delegating) break;
	        default:
	          argument = this.parseMaybeAssign();
	      }
	    }
	    node.delegate = delegating;
	    node.argument = argument;
	    return this.finishNode(node, "YieldExpression");
	  }
	  parseImportCall(node) {
	    this.next();
	    node.source = this.parseMaybeAssignAllowIn();
	    node.options = null;
	    if (this.eat(12)) {
	      if (!this.match(11)) {
	        node.options = this.parseMaybeAssignAllowIn();
	        if (this.eat(12)) {
	          this.addTrailingCommaExtraToNode(node.options);
	          if (!this.match(11)) {
	            do {
	              this.parseMaybeAssignAllowIn();
	            } while (this.eat(12) && !this.match(11));
	            this.raise(Errors.ImportCallArity, node);
	          }
	        }
	      } else {
	        this.addTrailingCommaExtraToNode(node.source);
	      }
	    }
	    this.expect(11);
	    return this.finishNode(node, "ImportExpression");
	  }
	  checkPipelineAtInfixOperator(left, leftStartLoc) {
	    if (this.hasPlugin(["pipelineOperator", {
	      proposal: "smart"
	    }])) {
	      if (left.type === "SequenceExpression") {
	        this.raise(Errors.PipelineHeadSequenceExpression, leftStartLoc);
	      }
	    }
	  }
	  parseSmartPipelineBodyInStyle(childExpr, startLoc) {
	    if (this.isSimpleReference(childExpr)) {
	      const bodyNode = this.startNodeAt(startLoc);
	      bodyNode.callee = childExpr;
	      return this.finishNode(bodyNode, "PipelineBareFunction");
	    } else {
	      const bodyNode = this.startNodeAt(startLoc);
	      this.checkSmartPipeTopicBodyEarlyErrors(startLoc);
	      bodyNode.expression = childExpr;
	      return this.finishNode(bodyNode, "PipelineTopicExpression");
	    }
	  }
	  isSimpleReference(expression) {
	    switch (expression.type) {
	      case "MemberExpression":
	        return !expression.computed && this.isSimpleReference(expression.object);
	      case "Identifier":
	        return true;
	      default:
	        return false;
	    }
	  }
	  checkSmartPipeTopicBodyEarlyErrors(startLoc) {
	    if (this.match(19)) {
	      throw this.raise(Errors.PipelineBodyNoArrow, this.state.startLoc);
	    }
	    if (!this.topicReferenceWasUsedInCurrentContext()) {
	      this.raise(Errors.PipelineTopicUnused, startLoc);
	    }
	  }
	  withTopicBindingContext(callback) {
	    const outerContextTopicState = this.state.topicContext;
	    this.state.topicContext = {
	      maxNumOfResolvableTopics: 1,
	      maxTopicIndex: null
	    };
	    try {
	      return callback();
	    } finally {
	      this.state.topicContext = outerContextTopicState;
	    }
	  }
	  withSmartMixTopicForbiddingContext(callback) {
	    if (this.hasPlugin(["pipelineOperator", {
	      proposal: "smart"
	    }])) {
	      const outerContextTopicState = this.state.topicContext;
	      this.state.topicContext = {
	        maxNumOfResolvableTopics: 0,
	        maxTopicIndex: null
	      };
	      try {
	        return callback();
	      } finally {
	        this.state.topicContext = outerContextTopicState;
	      }
	    } else {
	      return callback();
	    }
	  }
	  withSoloAwaitPermittingContext(callback) {
	    const outerContextSoloAwaitState = this.state.soloAwait;
	    this.state.soloAwait = true;
	    try {
	      return callback();
	    } finally {
	      this.state.soloAwait = outerContextSoloAwaitState;
	    }
	  }
	  allowInAnd(callback) {
	    const flags = this.prodParam.currentFlags();
	    const prodParamToSet = 8 & ~flags;
	    if (prodParamToSet) {
	      this.prodParam.enter(flags | 8);
	      try {
	        return callback();
	      } finally {
	        this.prodParam.exit();
	      }
	    }
	    return callback();
	  }
	  disallowInAnd(callback) {
	    const flags = this.prodParam.currentFlags();
	    const prodParamToClear = 8 & flags;
	    if (prodParamToClear) {
	      this.prodParam.enter(flags & -9);
	      try {
	        return callback();
	      } finally {
	        this.prodParam.exit();
	      }
	    }
	    return callback();
	  }
	  registerTopicReference() {
	    this.state.topicContext.maxTopicIndex = 0;
	  }
	  topicReferenceIsAllowedInCurrentContext() {
	    return this.state.topicContext.maxNumOfResolvableTopics >= 1;
	  }
	  topicReferenceWasUsedInCurrentContext() {
	    return this.state.topicContext.maxTopicIndex != null && this.state.topicContext.maxTopicIndex >= 0;
	  }
	  parseFSharpPipelineBody(prec) {
	    const startLoc = this.state.startLoc;
	    this.state.potentialArrowAt = this.state.start;
	    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
	    this.state.inFSharpPipelineDirectBody = true;
	    const ret = this.parseExprOp(this.parseMaybeUnaryOrPrivate(), startLoc, prec);
	    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
	    return ret;
	  }
	  parseModuleExpression() {
	    this.expectPlugin("moduleBlocks");
	    const node = this.startNode();
	    this.next();
	    if (!this.match(5)) {
	      this.unexpected(null, 5);
	    }
	    const program = this.startNodeAt(this.state.endLoc);
	    this.next();
	    const revertScopes = this.initializeScopes(true);
	    this.enterInitialScopes();
	    try {
	      node.body = this.parseProgram(program, 8, "module");
	    } finally {
	      revertScopes();
	    }
	    return this.finishNode(node, "ModuleExpression");
	  }
	  parsePropertyNamePrefixOperator(prop) {}
	}
	const loopLabel = {
	    kind: 1
	  },
	  switchLabel = {
	    kind: 2
	  };
	const loneSurrogate = /[\uD800-\uDFFF]/u;
	const keywordRelationalOperator = /in(?:stanceof)?/y;
	function babel7CompatTokens(tokens, input, startIndex) {
	  for (let i = 0; i < tokens.length; i++) {
	    const token = tokens[i];
	    const {
	      type
	    } = token;
	    if (typeof type === "number") {
	      {
	        if (type === 139) {
	          const {
	            loc,
	            start,
	            value,
	            end
	          } = token;
	          const hashEndPos = start + 1;
	          const hashEndLoc = createPositionWithColumnOffset(loc.start, 1);
	          tokens.splice(i, 1, new Token({
	            type: getExportedToken(27),
	            value: "#",
	            start: start,
	            end: hashEndPos,
	            startLoc: loc.start,
	            endLoc: hashEndLoc
	          }), new Token({
	            type: getExportedToken(132),
	            value: value,
	            start: hashEndPos,
	            end: end,
	            startLoc: hashEndLoc,
	            endLoc: loc.end
	          }));
	          i++;
	          continue;
	        }
	        if (tokenIsTemplate(type)) {
	          const {
	            loc,
	            start,
	            value,
	            end
	          } = token;
	          const backquoteEnd = start + 1;
	          const backquoteEndLoc = createPositionWithColumnOffset(loc.start, 1);
	          let startToken;
	          if (input.charCodeAt(start - startIndex) === 96) {
	            startToken = new Token({
	              type: getExportedToken(22),
	              value: "`",
	              start: start,
	              end: backquoteEnd,
	              startLoc: loc.start,
	              endLoc: backquoteEndLoc
	            });
	          } else {
	            startToken = new Token({
	              type: getExportedToken(8),
	              value: "}",
	              start: start,
	              end: backquoteEnd,
	              startLoc: loc.start,
	              endLoc: backquoteEndLoc
	            });
	          }
	          let templateValue, templateElementEnd, templateElementEndLoc, endToken;
	          if (type === 24) {
	            templateElementEnd = end - 1;
	            templateElementEndLoc = createPositionWithColumnOffset(loc.end, -1);
	            templateValue = value === null ? null : value.slice(1, -1);
	            endToken = new Token({
	              type: getExportedToken(22),
	              value: "`",
	              start: templateElementEnd,
	              end: end,
	              startLoc: templateElementEndLoc,
	              endLoc: loc.end
	            });
	          } else {
	            templateElementEnd = end - 2;
	            templateElementEndLoc = createPositionWithColumnOffset(loc.end, -2);
	            templateValue = value === null ? null : value.slice(1, -2);
	            endToken = new Token({
	              type: getExportedToken(23),
	              value: "${",
	              start: templateElementEnd,
	              end: end,
	              startLoc: templateElementEndLoc,
	              endLoc: loc.end
	            });
	          }
	          tokens.splice(i, 1, startToken, new Token({
	            type: getExportedToken(20),
	            value: templateValue,
	            start: backquoteEnd,
	            end: templateElementEnd,
	            startLoc: backquoteEndLoc,
	            endLoc: templateElementEndLoc
	          }), endToken);
	          i += 2;
	          continue;
	        }
	      }
	      token.type = getExportedToken(type);
	    }
	  }
	  return tokens;
	}
	class StatementParser extends ExpressionParser {
	  parseTopLevel(file, program) {
	    file.program = this.parseProgram(program);
	    file.comments = this.comments;
	    if (this.optionFlags & 256) {
	      file.tokens = babel7CompatTokens(this.tokens, this.input, this.startIndex);
	    }
	    return this.finishNode(file, "File");
	  }
	  parseProgram(program, end = 140, sourceType = this.options.sourceType) {
	    program.sourceType = sourceType;
	    program.interpreter = this.parseInterpreterDirective();
	    this.parseBlockBody(program, true, true, end);
	    if (this.inModule) {
	      if (!(this.optionFlags & 64) && this.scope.undefinedExports.size > 0) {
	        for (const [localName, at] of Array.from(this.scope.undefinedExports)) {
	          this.raise(Errors.ModuleExportUndefined, at, {
	            localName
	          });
	        }
	      }
	      this.addExtra(program, "topLevelAwait", this.state.hasTopLevelAwait);
	    }
	    let finishedProgram;
	    if (end === 140) {
	      finishedProgram = this.finishNode(program, "Program");
	    } else {
	      finishedProgram = this.finishNodeAt(program, "Program", createPositionWithColumnOffset(this.state.startLoc, -1));
	    }
	    return finishedProgram;
	  }
	  stmtToDirective(stmt) {
	    const directive = this.castNodeTo(stmt, "Directive");
	    const directiveLiteral = this.castNodeTo(stmt.expression, "DirectiveLiteral");
	    const expressionValue = directiveLiteral.value;
	    const raw = this.input.slice(this.offsetToSourcePos(directiveLiteral.start), this.offsetToSourcePos(directiveLiteral.end));
	    const val = directiveLiteral.value = raw.slice(1, -1);
	    this.addExtra(directiveLiteral, "raw", raw);
	    this.addExtra(directiveLiteral, "rawValue", val);
	    this.addExtra(directiveLiteral, "expressionValue", expressionValue);
	    directive.value = directiveLiteral;
	    delete stmt.expression;
	    return directive;
	  }
	  parseInterpreterDirective() {
	    if (!this.match(28)) {
	      return null;
	    }
	    const node = this.startNode();
	    node.value = this.state.value;
	    this.next();
	    return this.finishNode(node, "InterpreterDirective");
	  }
	  isLet() {
	    if (!this.isContextual(100)) {
	      return false;
	    }
	    return this.hasFollowingBindingAtom();
	  }
	  isUsing() {
	    if (!this.isContextual(107)) {
	      return false;
	    }
	    const next = this.nextTokenInLineStart();
	    const nextCh = this.codePointAtPos(next);
	    return this.chStartsBindingIdentifier(nextCh, next);
	  }
	  isAwaitUsing() {
	    if (!this.isContextual(96)) {
	      return false;
	    }
	    let next = this.nextTokenInLineStart();
	    if (this.isUnparsedContextual(next, "using")) {
	      next = this.nextTokenInLineStartSince(next + 5);
	      const nextCh = this.codePointAtPos(next);
	      if (this.chStartsBindingIdentifier(nextCh, next)) {
	        this.expectPlugin("explicitResourceManagement");
	        return true;
	      }
	    }
	    return false;
	  }
	  chStartsBindingIdentifier(ch, pos) {
	    if (isIdentifierStart(ch)) {
	      keywordRelationalOperator.lastIndex = pos;
	      if (keywordRelationalOperator.test(this.input)) {
	        const endCh = this.codePointAtPos(keywordRelationalOperator.lastIndex);
	        if (!isIdentifierChar(endCh) && endCh !== 92) {
	          return false;
	        }
	      }
	      return true;
	    } else if (ch === 92) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	  chStartsBindingPattern(ch) {
	    return ch === 91 || ch === 123;
	  }
	  hasFollowingBindingAtom() {
	    const next = this.nextTokenStart();
	    const nextCh = this.codePointAtPos(next);
	    return this.chStartsBindingPattern(nextCh) || this.chStartsBindingIdentifier(nextCh, next);
	  }
	  hasInLineFollowingBindingIdentifierOrBrace() {
	    const next = this.nextTokenInLineStart();
	    const nextCh = this.codePointAtPos(next);
	    return nextCh === 123 || this.chStartsBindingIdentifier(nextCh, next);
	  }
	  allowsForUsing() {
	    const {
	      type,
	      containsEsc,
	      end
	    } = this.lookahead();
	    if (type === 102 && !containsEsc) {
	      const nextCharAfterOf = this.lookaheadCharCodeSince(end);
	      if (nextCharAfterOf !== 61 && nextCharAfterOf !== 58 && nextCharAfterOf !== 59) {
	        return false;
	      }
	    }
	    if (tokenIsIdentifier(type) && !this.hasFollowingLineBreak()) {
	      this.expectPlugin("explicitResourceManagement");
	      return true;
	    }
	    return false;
	  }
	  allowsUsing() {
	    return (this.scope.inModule || !this.scope.inTopLevel) && !this.scope.inBareCaseStatement;
	  }
	  parseModuleItem() {
	    return this.parseStatementLike(1 | 2 | 4 | 8);
	  }
	  parseStatementListItem() {
	    return this.parseStatementLike(2 | 4 | (!this.options.annexB || this.state.strict ? 0 : 8));
	  }
	  parseStatementOrSloppyAnnexBFunctionDeclaration(allowLabeledFunction = false) {
	    let flags = 0;
	    if (this.options.annexB && !this.state.strict) {
	      flags |= 4;
	      if (allowLabeledFunction) {
	        flags |= 8;
	      }
	    }
	    return this.parseStatementLike(flags);
	  }
	  parseStatement() {
	    return this.parseStatementLike(0);
	  }
	  parseStatementLike(flags) {
	    let decorators = null;
	    if (this.match(26)) {
	      decorators = this.parseDecorators(true);
	    }
	    return this.parseStatementContent(flags, decorators);
	  }
	  parseStatementContent(flags, decorators) {
	    const startType = this.state.type;
	    const node = this.startNode();
	    const allowDeclaration = !!(flags & 2);
	    const allowFunctionDeclaration = !!(flags & 4);
	    const topLevel = flags & 1;
	    switch (startType) {
	      case 60:
	        return this.parseBreakContinueStatement(node, true);
	      case 63:
	        return this.parseBreakContinueStatement(node, false);
	      case 64:
	        return this.parseDebuggerStatement(node);
	      case 90:
	        return this.parseDoWhileStatement(node);
	      case 91:
	        return this.parseForStatement(node);
	      case 68:
	        if (this.lookaheadCharCode() === 46) break;
	        if (!allowFunctionDeclaration) {
	          this.raise(this.state.strict ? Errors.StrictFunction : this.options.annexB ? Errors.SloppyFunctionAnnexB : Errors.SloppyFunction, this.state.startLoc);
	        }
	        return this.parseFunctionStatement(node, false, !allowDeclaration && allowFunctionDeclaration);
	      case 80:
	        if (!allowDeclaration) this.unexpected();
	        return this.parseClass(this.maybeTakeDecorators(decorators, node), true);
	      case 69:
	        return this.parseIfStatement(node);
	      case 70:
	        return this.parseReturnStatement(node);
	      case 71:
	        return this.parseSwitchStatement(node);
	      case 72:
	        return this.parseThrowStatement(node);
	      case 73:
	        return this.parseTryStatement(node);
	      case 96:
	        if (this.isAwaitUsing()) {
	          if (!this.allowsUsing()) {
	            this.raise(Errors.UnexpectedUsingDeclaration, node);
	          } else if (!allowDeclaration) {
	            this.raise(Errors.UnexpectedLexicalDeclaration, node);
	          } else if (!this.recordAwaitIfAllowed()) {
	            this.raise(Errors.AwaitUsingNotInAsyncContext, node);
	          }
	          this.next();
	          return this.parseVarStatement(node, "await using");
	        }
	        break;
	      case 107:
	        if (this.state.containsEsc || !this.hasInLineFollowingBindingIdentifierOrBrace()) {
	          break;
	        }
	        this.expectPlugin("explicitResourceManagement");
	        if (!this.allowsUsing()) {
	          this.raise(Errors.UnexpectedUsingDeclaration, this.state.startLoc);
	        } else if (!allowDeclaration) {
	          this.raise(Errors.UnexpectedLexicalDeclaration, this.state.startLoc);
	        }
	        return this.parseVarStatement(node, "using");
	      case 100:
	        {
	          if (this.state.containsEsc) {
	            break;
	          }
	          const next = this.nextTokenStart();
	          const nextCh = this.codePointAtPos(next);
	          if (nextCh !== 91) {
	            if (!allowDeclaration && this.hasFollowingLineBreak()) break;
	            if (!this.chStartsBindingIdentifier(nextCh, next) && nextCh !== 123) {
	              break;
	            }
	          }
	        }
	      case 75:
	        {
	          if (!allowDeclaration) {
	            this.raise(Errors.UnexpectedLexicalDeclaration, this.state.startLoc);
	          }
	        }
	      case 74:
	        {
	          const kind = this.state.value;
	          return this.parseVarStatement(node, kind);
	        }
	      case 92:
	        return this.parseWhileStatement(node);
	      case 76:
	        return this.parseWithStatement(node);
	      case 5:
	        return this.parseBlock();
	      case 13:
	        return this.parseEmptyStatement(node);
	      case 83:
	        {
	          const nextTokenCharCode = this.lookaheadCharCode();
	          if (nextTokenCharCode === 40 || nextTokenCharCode === 46) {
	            break;
	          }
	        }
	      case 82:
	        {
	          if (!(this.optionFlags & 8) && !topLevel) {
	            this.raise(Errors.UnexpectedImportExport, this.state.startLoc);
	          }
	          this.next();
	          let result;
	          if (startType === 83) {
	            result = this.parseImport(node);
	          } else {
	            result = this.parseExport(node, decorators);
	          }
	          this.assertModuleNodeAllowed(result);
	          return result;
	        }
	      default:
	        {
	          if (this.isAsyncFunction()) {
	            if (!allowDeclaration) {
	              this.raise(Errors.AsyncFunctionInSingleStatementContext, this.state.startLoc);
	            }
	            this.next();
	            return this.parseFunctionStatement(node, true, !allowDeclaration && allowFunctionDeclaration);
	          }
	        }
	    }
	    const maybeName = this.state.value;
	    const expr = this.parseExpression();
	    if (tokenIsIdentifier(startType) && expr.type === "Identifier" && this.eat(14)) {
	      return this.parseLabeledStatement(node, maybeName, expr, flags);
	    } else {
	      return this.parseExpressionStatement(node, expr, decorators);
	    }
	  }
	  assertModuleNodeAllowed(node) {
	    if (!(this.optionFlags & 8) && !this.inModule) {
	      this.raise(Errors.ImportOutsideModule, node);
	    }
	  }
	  decoratorsEnabledBeforeExport() {
	    if (this.hasPlugin("decorators-legacy")) return true;
	    return this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport") !== false;
	  }
	  maybeTakeDecorators(maybeDecorators, classNode, exportNode) {
	    if (maybeDecorators) {
	      var _classNode$decorators;
	      if ((_classNode$decorators = classNode.decorators) != null && _classNode$decorators.length) {
	        if (typeof this.getPluginOption("decorators", "decoratorsBeforeExport") !== "boolean") {
	          this.raise(Errors.DecoratorsBeforeAfterExport, classNode.decorators[0]);
	        }
	        classNode.decorators.unshift(...maybeDecorators);
	      } else {
	        classNode.decorators = maybeDecorators;
	      }
	      this.resetStartLocationFromNode(classNode, maybeDecorators[0]);
	      if (exportNode) this.resetStartLocationFromNode(exportNode, classNode);
	    }
	    return classNode;
	  }
	  canHaveLeadingDecorator() {
	    return this.match(80);
	  }
	  parseDecorators(allowExport) {
	    const decorators = [];
	    do {
	      decorators.push(this.parseDecorator());
	    } while (this.match(26));
	    if (this.match(82)) {
	      if (!allowExport) {
	        this.unexpected();
	      }
	      if (!this.decoratorsEnabledBeforeExport()) {
	        this.raise(Errors.DecoratorExportClass, this.state.startLoc);
	      }
	    } else if (!this.canHaveLeadingDecorator()) {
	      throw this.raise(Errors.UnexpectedLeadingDecorator, this.state.startLoc);
	    }
	    return decorators;
	  }
	  parseDecorator() {
	    this.expectOnePlugin(["decorators", "decorators-legacy"]);
	    const node = this.startNode();
	    this.next();
	    if (this.hasPlugin("decorators")) {
	      const startLoc = this.state.startLoc;
	      let expr;
	      if (this.match(10)) {
	        const startLoc = this.state.startLoc;
	        this.next();
	        expr = this.parseExpression();
	        this.expect(11);
	        expr = this.wrapParenthesis(startLoc, expr);
	        const paramsStartLoc = this.state.startLoc;
	        node.expression = this.parseMaybeDecoratorArguments(expr, startLoc);
	        if (this.getPluginOption("decorators", "allowCallParenthesized") === false && node.expression !== expr) {
	          this.raise(Errors.DecoratorArgumentsOutsideParentheses, paramsStartLoc);
	        }
	      } else {
	        expr = this.parseIdentifier(false);
	        while (this.eat(16)) {
	          const node = this.startNodeAt(startLoc);
	          node.object = expr;
	          if (this.match(139)) {
	            this.classScope.usePrivateName(this.state.value, this.state.startLoc);
	            node.property = this.parsePrivateName();
	          } else {
	            node.property = this.parseIdentifier(true);
	          }
	          node.computed = false;
	          expr = this.finishNode(node, "MemberExpression");
	        }
	        node.expression = this.parseMaybeDecoratorArguments(expr, startLoc);
	      }
	    } else {
	      node.expression = this.parseExprSubscripts();
	    }
	    return this.finishNode(node, "Decorator");
	  }
	  parseMaybeDecoratorArguments(expr, startLoc) {
	    if (this.eat(10)) {
	      const node = this.startNodeAt(startLoc);
	      node.callee = expr;
	      node.arguments = this.parseCallExpressionArguments(11);
	      this.toReferencedList(node.arguments);
	      return this.finishNode(node, "CallExpression");
	    }
	    return expr;
	  }
	  parseBreakContinueStatement(node, isBreak) {
	    this.next();
	    if (this.isLineTerminator()) {
	      node.label = null;
	    } else {
	      node.label = this.parseIdentifier();
	      this.semicolon();
	    }
	    this.verifyBreakContinue(node, isBreak);
	    return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
	  }
	  verifyBreakContinue(node, isBreak) {
	    let i;
	    for (i = 0; i < this.state.labels.length; ++i) {
	      const lab = this.state.labels[i];
	      if (node.label == null || lab.name === node.label.name) {
	        if (lab.kind != null && (isBreak || lab.kind === 1)) {
	          break;
	        }
	        if (node.label && isBreak) break;
	      }
	    }
	    if (i === this.state.labels.length) {
	      const type = isBreak ? "BreakStatement" : "ContinueStatement";
	      this.raise(Errors.IllegalBreakContinue, node, {
	        type
	      });
	    }
	  }
	  parseDebuggerStatement(node) {
	    this.next();
	    this.semicolon();
	    return this.finishNode(node, "DebuggerStatement");
	  }
	  parseHeaderExpression() {
	    this.expect(10);
	    const val = this.parseExpression();
	    this.expect(11);
	    return val;
	  }
	  parseDoWhileStatement(node) {
	    this.next();
	    this.state.labels.push(loopLabel);
	    node.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement());
	    this.state.labels.pop();
	    this.expect(92);
	    node.test = this.parseHeaderExpression();
	    this.eat(13);
	    return this.finishNode(node, "DoWhileStatement");
	  }
	  parseForStatement(node) {
	    this.next();
	    this.state.labels.push(loopLabel);
	    let awaitAt = null;
	    if (this.isContextual(96) && this.recordAwaitIfAllowed()) {
	      awaitAt = this.state.startLoc;
	      this.next();
	    }
	    this.scope.enter(0);
	    this.expect(10);
	    if (this.match(13)) {
	      if (awaitAt !== null) {
	        this.unexpected(awaitAt);
	      }
	      return this.parseFor(node, null);
	    }
	    const startsWithLet = this.isContextual(100);
	    {
	      const startsWithAwaitUsing = this.isAwaitUsing();
	      const starsWithUsingDeclaration = startsWithAwaitUsing || this.isContextual(107) && this.allowsForUsing();
	      const isLetOrUsing = startsWithLet && this.hasFollowingBindingAtom() || starsWithUsingDeclaration;
	      if (this.match(74) || this.match(75) || isLetOrUsing) {
	        const initNode = this.startNode();
	        let kind;
	        if (startsWithAwaitUsing) {
	          kind = "await using";
	          if (!this.recordAwaitIfAllowed()) {
	            this.raise(Errors.AwaitUsingNotInAsyncContext, this.state.startLoc);
	          }
	          this.next();
	        } else {
	          kind = this.state.value;
	        }
	        this.next();
	        this.parseVar(initNode, true, kind);
	        const init = this.finishNode(initNode, "VariableDeclaration");
	        const isForIn = this.match(58);
	        if (isForIn && starsWithUsingDeclaration) {
	          this.raise(Errors.ForInUsing, init);
	        }
	        if ((isForIn || this.isContextual(102)) && init.declarations.length === 1) {
	          return this.parseForIn(node, init, awaitAt);
	        }
	        if (awaitAt !== null) {
	          this.unexpected(awaitAt);
	        }
	        return this.parseFor(node, init);
	      }
	    }
	    const startsWithAsync = this.isContextual(95);
	    const refExpressionErrors = new ExpressionErrors();
	    const init = this.parseExpression(true, refExpressionErrors);
	    const isForOf = this.isContextual(102);
	    if (isForOf) {
	      if (startsWithLet) {
	        this.raise(Errors.ForOfLet, init);
	      }
	      if (awaitAt === null && startsWithAsync && init.type === "Identifier") {
	        this.raise(Errors.ForOfAsync, init);
	      }
	    }
	    if (isForOf || this.match(58)) {
	      this.checkDestructuringPrivate(refExpressionErrors);
	      this.toAssignable(init, true);
	      const type = isForOf ? "ForOfStatement" : "ForInStatement";
	      this.checkLVal(init, {
	        type
	      });
	      return this.parseForIn(node, init, awaitAt);
	    } else {
	      this.checkExpressionErrors(refExpressionErrors, true);
	    }
	    if (awaitAt !== null) {
	      this.unexpected(awaitAt);
	    }
	    return this.parseFor(node, init);
	  }
	  parseFunctionStatement(node, isAsync, isHangingDeclaration) {
	    this.next();
	    return this.parseFunction(node, 1 | (isHangingDeclaration ? 2 : 0) | (isAsync ? 8 : 0));
	  }
	  parseIfStatement(node) {
	    this.next();
	    node.test = this.parseHeaderExpression();
	    node.consequent = this.parseStatementOrSloppyAnnexBFunctionDeclaration();
	    node.alternate = this.eat(66) ? this.parseStatementOrSloppyAnnexBFunctionDeclaration() : null;
	    return this.finishNode(node, "IfStatement");
	  }
	  parseReturnStatement(node) {
	    if (!this.prodParam.hasReturn && !(this.optionFlags & 2)) {
	      this.raise(Errors.IllegalReturn, this.state.startLoc);
	    }
	    this.next();
	    if (this.isLineTerminator()) {
	      node.argument = null;
	    } else {
	      node.argument = this.parseExpression();
	      this.semicolon();
	    }
	    return this.finishNode(node, "ReturnStatement");
	  }
	  parseSwitchStatement(node) {
	    this.next();
	    node.discriminant = this.parseHeaderExpression();
	    const cases = node.cases = [];
	    this.expect(5);
	    this.state.labels.push(switchLabel);
	    this.scope.enter(256);
	    let cur;
	    for (let sawDefault; !this.match(8);) {
	      if (this.match(61) || this.match(65)) {
	        const isCase = this.match(61);
	        if (cur) this.finishNode(cur, "SwitchCase");
	        cases.push(cur = this.startNode());
	        cur.consequent = [];
	        this.next();
	        if (isCase) {
	          cur.test = this.parseExpression();
	        } else {
	          if (sawDefault) {
	            this.raise(Errors.MultipleDefaultsInSwitch, this.state.lastTokStartLoc);
	          }
	          sawDefault = true;
	          cur.test = null;
	        }
	        this.expect(14);
	      } else {
	        if (cur) {
	          cur.consequent.push(this.parseStatementListItem());
	        } else {
	          this.unexpected();
	        }
	      }
	    }
	    this.scope.exit();
	    if (cur) this.finishNode(cur, "SwitchCase");
	    this.next();
	    this.state.labels.pop();
	    return this.finishNode(node, "SwitchStatement");
	  }
	  parseThrowStatement(node) {
	    this.next();
	    if (this.hasPrecedingLineBreak()) {
	      this.raise(Errors.NewlineAfterThrow, this.state.lastTokEndLoc);
	    }
	    node.argument = this.parseExpression();
	    this.semicolon();
	    return this.finishNode(node, "ThrowStatement");
	  }
	  parseCatchClauseParam() {
	    const param = this.parseBindingAtom();
	    this.scope.enter(this.options.annexB && param.type === "Identifier" ? 8 : 0);
	    this.checkLVal(param, {
	      type: "CatchClause"
	    }, 9);
	    return param;
	  }
	  parseTryStatement(node) {
	    this.next();
	    node.block = this.parseBlock();
	    node.handler = null;
	    if (this.match(62)) {
	      const clause = this.startNode();
	      this.next();
	      if (this.match(10)) {
	        this.expect(10);
	        clause.param = this.parseCatchClauseParam();
	        this.expect(11);
	      } else {
	        clause.param = null;
	        this.scope.enter(0);
	      }
	      clause.body = this.withSmartMixTopicForbiddingContext(() => this.parseBlock(false, false));
	      this.scope.exit();
	      node.handler = this.finishNode(clause, "CatchClause");
	    }
	    node.finalizer = this.eat(67) ? this.parseBlock() : null;
	    if (!node.handler && !node.finalizer) {
	      this.raise(Errors.NoCatchOrFinally, node);
	    }
	    return this.finishNode(node, "TryStatement");
	  }
	  parseVarStatement(node, kind, allowMissingInitializer = false) {
	    this.next();
	    this.parseVar(node, false, kind, allowMissingInitializer);
	    this.semicolon();
	    return this.finishNode(node, "VariableDeclaration");
	  }
	  parseWhileStatement(node) {
	    this.next();
	    node.test = this.parseHeaderExpression();
	    this.state.labels.push(loopLabel);
	    node.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement());
	    this.state.labels.pop();
	    return this.finishNode(node, "WhileStatement");
	  }
	  parseWithStatement(node) {
	    if (this.state.strict) {
	      this.raise(Errors.StrictWith, this.state.startLoc);
	    }
	    this.next();
	    node.object = this.parseHeaderExpression();
	    node.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement());
	    return this.finishNode(node, "WithStatement");
	  }
	  parseEmptyStatement(node) {
	    this.next();
	    return this.finishNode(node, "EmptyStatement");
	  }
	  parseLabeledStatement(node, maybeName, expr, flags) {
	    for (const label of this.state.labels) {
	      if (label.name === maybeName) {
	        this.raise(Errors.LabelRedeclaration, expr, {
	          labelName: maybeName
	        });
	      }
	    }
	    const kind = tokenIsLoop(this.state.type) ? 1 : this.match(71) ? 2 : null;
	    for (let i = this.state.labels.length - 1; i >= 0; i--) {
	      const label = this.state.labels[i];
	      if (label.statementStart === node.start) {
	        label.statementStart = this.sourceToOffsetPos(this.state.start);
	        label.kind = kind;
	      } else {
	        break;
	      }
	    }
	    this.state.labels.push({
	      name: maybeName,
	      kind: kind,
	      statementStart: this.sourceToOffsetPos(this.state.start)
	    });
	    node.body = flags & 8 ? this.parseStatementOrSloppyAnnexBFunctionDeclaration(true) : this.parseStatement();
	    this.state.labels.pop();
	    node.label = expr;
	    return this.finishNode(node, "LabeledStatement");
	  }
	  parseExpressionStatement(node, expr, decorators) {
	    node.expression = expr;
	    this.semicolon();
	    return this.finishNode(node, "ExpressionStatement");
	  }
	  parseBlock(allowDirectives = false, createNewLexicalScope = true, afterBlockParse) {
	    const node = this.startNode();
	    if (allowDirectives) {
	      this.state.strictErrors.clear();
	    }
	    this.expect(5);
	    if (createNewLexicalScope) {
	      this.scope.enter(0);
	    }
	    this.parseBlockBody(node, allowDirectives, false, 8, afterBlockParse);
	    if (createNewLexicalScope) {
	      this.scope.exit();
	    }
	    return this.finishNode(node, "BlockStatement");
	  }
	  isValidDirective(stmt) {
	    return stmt.type === "ExpressionStatement" && stmt.expression.type === "StringLiteral" && !stmt.expression.extra.parenthesized;
	  }
	  parseBlockBody(node, allowDirectives, topLevel, end, afterBlockParse) {
	    const body = node.body = [];
	    const directives = node.directives = [];
	    this.parseBlockOrModuleBlockBody(body, allowDirectives ? directives : undefined, topLevel, end, afterBlockParse);
	  }
	  parseBlockOrModuleBlockBody(body, directives, topLevel, end, afterBlockParse) {
	    const oldStrict = this.state.strict;
	    let hasStrictModeDirective = false;
	    let parsedNonDirective = false;
	    while (!this.match(end)) {
	      const stmt = topLevel ? this.parseModuleItem() : this.parseStatementListItem();
	      if (directives && !parsedNonDirective) {
	        if (this.isValidDirective(stmt)) {
	          const directive = this.stmtToDirective(stmt);
	          directives.push(directive);
	          if (!hasStrictModeDirective && directive.value.value === "use strict") {
	            hasStrictModeDirective = true;
	            this.setStrict(true);
	          }
	          continue;
	        }
	        parsedNonDirective = true;
	        this.state.strictErrors.clear();
	      }
	      body.push(stmt);
	    }
	    afterBlockParse == null || afterBlockParse.call(this, hasStrictModeDirective);
	    if (!oldStrict) {
	      this.setStrict(false);
	    }
	    this.next();
	  }
	  parseFor(node, init) {
	    node.init = init;
	    this.semicolon(false);
	    node.test = this.match(13) ? null : this.parseExpression();
	    this.semicolon(false);
	    node.update = this.match(11) ? null : this.parseExpression();
	    this.expect(11);
	    node.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement());
	    this.scope.exit();
	    this.state.labels.pop();
	    return this.finishNode(node, "ForStatement");
	  }
	  parseForIn(node, init, awaitAt) {
	    const isForIn = this.match(58);
	    this.next();
	    if (isForIn) {
	      if (awaitAt !== null) this.unexpected(awaitAt);
	    } else {
	      node.await = awaitAt !== null;
	    }
	    if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || !this.options.annexB || this.state.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
	      this.raise(Errors.ForInOfLoopInitializer, init, {
	        type: isForIn ? "ForInStatement" : "ForOfStatement"
	      });
	    }
	    if (init.type === "AssignmentPattern") {
	      this.raise(Errors.InvalidLhs, init, {
	        ancestor: {
	          type: "ForStatement"
	        }
	      });
	    }
	    node.left = init;
	    node.right = isForIn ? this.parseExpression() : this.parseMaybeAssignAllowIn();
	    this.expect(11);
	    node.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement());
	    this.scope.exit();
	    this.state.labels.pop();
	    return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
	  }
	  parseVar(node, isFor, kind, allowMissingInitializer = false) {
	    const declarations = node.declarations = [];
	    node.kind = kind;
	    for (;;) {
	      const decl = this.startNode();
	      this.parseVarId(decl, kind);
	      decl.init = !this.eat(29) ? null : isFor ? this.parseMaybeAssignDisallowIn() : this.parseMaybeAssignAllowIn();
	      if (decl.init === null && !allowMissingInitializer) {
	        if (decl.id.type !== "Identifier" && !(isFor && (this.match(58) || this.isContextual(102)))) {
	          this.raise(Errors.DeclarationMissingInitializer, this.state.lastTokEndLoc, {
	            kind: "destructuring"
	          });
	        } else if ((kind === "const" || kind === "using" || kind === "await using") && !(this.match(58) || this.isContextual(102))) {
	          this.raise(Errors.DeclarationMissingInitializer, this.state.lastTokEndLoc, {
	            kind
	          });
	        }
	      }
	      declarations.push(this.finishNode(decl, "VariableDeclarator"));
	      if (!this.eat(12)) break;
	    }
	    return node;
	  }
	  parseVarId(decl, kind) {
	    const id = this.parseBindingAtom();
	    if (kind === "using" || kind === "await using") {
	      if (id.type === "ArrayPattern" || id.type === "ObjectPattern") {
	        this.raise(Errors.UsingDeclarationHasBindingPattern, id.loc.start);
	      }
	    }
	    this.checkLVal(id, {
	      type: "VariableDeclarator"
	    }, kind === "var" ? 5 : 8201);
	    decl.id = id;
	  }
	  parseAsyncFunctionExpression(node) {
	    return this.parseFunction(node, 8);
	  }
	  parseFunction(node, flags = 0) {
	    const hangingDeclaration = flags & 2;
	    const isDeclaration = !!(flags & 1);
	    const requireId = isDeclaration && !(flags & 4);
	    const isAsync = !!(flags & 8);
	    this.initFunction(node, isAsync);
	    if (this.match(55)) {
	      if (hangingDeclaration) {
	        this.raise(Errors.GeneratorInSingleStatementContext, this.state.startLoc);
	      }
	      this.next();
	      node.generator = true;
	    }
	    if (isDeclaration) {
	      node.id = this.parseFunctionId(requireId);
	    }
	    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
	    this.state.maybeInArrowParameters = false;
	    this.scope.enter(2);
	    this.prodParam.enter(functionFlags(isAsync, node.generator));
	    if (!isDeclaration) {
	      node.id = this.parseFunctionId();
	    }
	    this.parseFunctionParams(node, false);
	    this.withSmartMixTopicForbiddingContext(() => {
	      this.parseFunctionBodyAndFinish(node, isDeclaration ? "FunctionDeclaration" : "FunctionExpression");
	    });
	    this.prodParam.exit();
	    this.scope.exit();
	    if (isDeclaration && !hangingDeclaration) {
	      this.registerFunctionStatementId(node);
	    }
	    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
	    return node;
	  }
	  parseFunctionId(requireId) {
	    return requireId || tokenIsIdentifier(this.state.type) ? this.parseIdentifier() : null;
	  }
	  parseFunctionParams(node, isConstructor) {
	    this.expect(10);
	    this.expressionScope.enter(newParameterDeclarationScope());
	    node.params = this.parseBindingList(11, 41, 2 | (isConstructor ? 4 : 0));
	    this.expressionScope.exit();
	  }
	  registerFunctionStatementId(node) {
	    if (!node.id) return;
	    this.scope.declareName(node.id.name, !this.options.annexB || this.state.strict || node.generator || node.async ? this.scope.treatFunctionsAsVar ? 5 : 8201 : 17, node.id.loc.start);
	  }
	  parseClass(node, isStatement, optionalId) {
	    this.next();
	    const oldStrict = this.state.strict;
	    this.state.strict = true;
	    this.parseClassId(node, isStatement, optionalId);
	    this.parseClassSuper(node);
	    node.body = this.parseClassBody(!!node.superClass, oldStrict);
	    return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
	  }
	  isClassProperty() {
	    return this.match(29) || this.match(13) || this.match(8);
	  }
	  isClassMethod() {
	    return this.match(10);
	  }
	  nameIsConstructor(key) {
	    return key.type === "Identifier" && key.name === "constructor" || key.type === "StringLiteral" && key.value === "constructor";
	  }
	  isNonstaticConstructor(method) {
	    return !method.computed && !method.static && this.nameIsConstructor(method.key);
	  }
	  parseClassBody(hadSuperClass, oldStrict) {
	    this.classScope.enter();
	    const state = {
	      hadConstructor: false,
	      hadSuperClass
	    };
	    let decorators = [];
	    const classBody = this.startNode();
	    classBody.body = [];
	    this.expect(5);
	    this.withSmartMixTopicForbiddingContext(() => {
	      while (!this.match(8)) {
	        if (this.eat(13)) {
	          if (decorators.length > 0) {
	            throw this.raise(Errors.DecoratorSemicolon, this.state.lastTokEndLoc);
	          }
	          continue;
	        }
	        if (this.match(26)) {
	          decorators.push(this.parseDecorator());
	          continue;
	        }
	        const member = this.startNode();
	        if (decorators.length) {
	          member.decorators = decorators;
	          this.resetStartLocationFromNode(member, decorators[0]);
	          decorators = [];
	        }
	        this.parseClassMember(classBody, member, state);
	        if (member.kind === "constructor" && member.decorators && member.decorators.length > 0) {
	          this.raise(Errors.DecoratorConstructor, member);
	        }
	      }
	    });
	    this.state.strict = oldStrict;
	    this.next();
	    if (decorators.length) {
	      throw this.raise(Errors.TrailingDecorator, this.state.startLoc);
	    }
	    this.classScope.exit();
	    return this.finishNode(classBody, "ClassBody");
	  }
	  parseClassMemberFromModifier(classBody, member) {
	    const key = this.parseIdentifier(true);
	    if (this.isClassMethod()) {
	      const method = member;
	      method.kind = "method";
	      method.computed = false;
	      method.key = key;
	      method.static = false;
	      this.pushClassMethod(classBody, method, false, false, false, false);
	      return true;
	    } else if (this.isClassProperty()) {
	      const prop = member;
	      prop.computed = false;
	      prop.key = key;
	      prop.static = false;
	      classBody.body.push(this.parseClassProperty(prop));
	      return true;
	    }
	    this.resetPreviousNodeTrailingComments(key);
	    return false;
	  }
	  parseClassMember(classBody, member, state) {
	    const isStatic = this.isContextual(106);
	    if (isStatic) {
	      if (this.parseClassMemberFromModifier(classBody, member)) {
	        return;
	      }
	      if (this.eat(5)) {
	        this.parseClassStaticBlock(classBody, member);
	        return;
	      }
	    }
	    this.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
	  }
	  parseClassMemberWithIsStatic(classBody, member, state, isStatic) {
	    const publicMethod = member;
	    const privateMethod = member;
	    const publicProp = member;
	    const privateProp = member;
	    const accessorProp = member;
	    const method = publicMethod;
	    const publicMember = publicMethod;
	    member.static = isStatic;
	    this.parsePropertyNamePrefixOperator(member);
	    if (this.eat(55)) {
	      method.kind = "method";
	      const isPrivateName = this.match(139);
	      this.parseClassElementName(method);
	      this.parsePostMemberNameModifiers(method);
	      if (isPrivateName) {
	        this.pushClassPrivateMethod(classBody, privateMethod, true, false);
	        return;
	      }
	      if (this.isNonstaticConstructor(publicMethod)) {
	        this.raise(Errors.ConstructorIsGenerator, publicMethod.key);
	      }
	      this.pushClassMethod(classBody, publicMethod, true, false, false, false);
	      return;
	    }
	    const isContextual = !this.state.containsEsc && tokenIsIdentifier(this.state.type);
	    const key = this.parseClassElementName(member);
	    const maybeContextualKw = isContextual ? key.name : null;
	    const isPrivate = this.isPrivateName(key);
	    const maybeQuestionTokenStartLoc = this.state.startLoc;
	    this.parsePostMemberNameModifiers(publicMember);
	    if (this.isClassMethod()) {
	      method.kind = "method";
	      if (isPrivate) {
	        this.pushClassPrivateMethod(classBody, privateMethod, false, false);
	        return;
	      }
	      const isConstructor = this.isNonstaticConstructor(publicMethod);
	      let allowsDirectSuper = false;
	      if (isConstructor) {
	        publicMethod.kind = "constructor";
	        if (state.hadConstructor && !this.hasPlugin("typescript")) {
	          this.raise(Errors.DuplicateConstructor, key);
	        }
	        if (isConstructor && this.hasPlugin("typescript") && member.override) {
	          this.raise(Errors.OverrideOnConstructor, key);
	        }
	        state.hadConstructor = true;
	        allowsDirectSuper = state.hadSuperClass;
	      }
	      this.pushClassMethod(classBody, publicMethod, false, false, isConstructor, allowsDirectSuper);
	    } else if (this.isClassProperty()) {
	      if (isPrivate) {
	        this.pushClassPrivateProperty(classBody, privateProp);
	      } else {
	        this.pushClassProperty(classBody, publicProp);
	      }
	    } else if (maybeContextualKw === "async" && !this.isLineTerminator()) {
	      this.resetPreviousNodeTrailingComments(key);
	      const isGenerator = this.eat(55);
	      if (publicMember.optional) {
	        this.unexpected(maybeQuestionTokenStartLoc);
	      }
	      method.kind = "method";
	      const isPrivate = this.match(139);
	      this.parseClassElementName(method);
	      this.parsePostMemberNameModifiers(publicMember);
	      if (isPrivate) {
	        this.pushClassPrivateMethod(classBody, privateMethod, isGenerator, true);
	      } else {
	        if (this.isNonstaticConstructor(publicMethod)) {
	          this.raise(Errors.ConstructorIsAsync, publicMethod.key);
	        }
	        this.pushClassMethod(classBody, publicMethod, isGenerator, true, false, false);
	      }
	    } else if ((maybeContextualKw === "get" || maybeContextualKw === "set") && !(this.match(55) && this.isLineTerminator())) {
	      this.resetPreviousNodeTrailingComments(key);
	      method.kind = maybeContextualKw;
	      const isPrivate = this.match(139);
	      this.parseClassElementName(publicMethod);
	      if (isPrivate) {
	        this.pushClassPrivateMethod(classBody, privateMethod, false, false);
	      } else {
	        if (this.isNonstaticConstructor(publicMethod)) {
	          this.raise(Errors.ConstructorIsAccessor, publicMethod.key);
	        }
	        this.pushClassMethod(classBody, publicMethod, false, false, false, false);
	      }
	      this.checkGetterSetterParams(publicMethod);
	    } else if (maybeContextualKw === "accessor" && !this.isLineTerminator()) {
	      this.expectPlugin("decoratorAutoAccessors");
	      this.resetPreviousNodeTrailingComments(key);
	      const isPrivate = this.match(139);
	      this.parseClassElementName(publicProp);
	      this.pushClassAccessorProperty(classBody, accessorProp, isPrivate);
	    } else if (this.isLineTerminator()) {
	      if (isPrivate) {
	        this.pushClassPrivateProperty(classBody, privateProp);
	      } else {
	        this.pushClassProperty(classBody, publicProp);
	      }
	    } else {
	      this.unexpected();
	    }
	  }
	  parseClassElementName(member) {
	    const {
	      type,
	      value
	    } = this.state;
	    if ((type === 132 || type === 134) && member.static && value === "prototype") {
	      this.raise(Errors.StaticPrototype, this.state.startLoc);
	    }
	    if (type === 139) {
	      if (value === "constructor") {
	        this.raise(Errors.ConstructorClassPrivateField, this.state.startLoc);
	      }
	      const key = this.parsePrivateName();
	      member.key = key;
	      return key;
	    }
	    this.parsePropertyName(member);
	    return member.key;
	  }
	  parseClassStaticBlock(classBody, member) {
	    var _member$decorators;
	    this.scope.enter(64 | 128 | 16);
	    const oldLabels = this.state.labels;
	    this.state.labels = [];
	    this.prodParam.enter(0);
	    const body = member.body = [];
	    this.parseBlockOrModuleBlockBody(body, undefined, false, 8);
	    this.prodParam.exit();
	    this.scope.exit();
	    this.state.labels = oldLabels;
	    classBody.body.push(this.finishNode(member, "StaticBlock"));
	    if ((_member$decorators = member.decorators) != null && _member$decorators.length) {
	      this.raise(Errors.DecoratorStaticBlock, member);
	    }
	  }
	  pushClassProperty(classBody, prop) {
	    if (!prop.computed && this.nameIsConstructor(prop.key)) {
	      this.raise(Errors.ConstructorClassField, prop.key);
	    }
	    classBody.body.push(this.parseClassProperty(prop));
	  }
	  pushClassPrivateProperty(classBody, prop) {
	    const node = this.parseClassPrivateProperty(prop);
	    classBody.body.push(node);
	    this.classScope.declarePrivateName(this.getPrivateNameSV(node.key), 0, node.key.loc.start);
	  }
	  pushClassAccessorProperty(classBody, prop, isPrivate) {
	    if (!isPrivate && !prop.computed && this.nameIsConstructor(prop.key)) {
	      this.raise(Errors.ConstructorClassField, prop.key);
	    }
	    const node = this.parseClassAccessorProperty(prop);
	    classBody.body.push(node);
	    if (isPrivate) {
	      this.classScope.declarePrivateName(this.getPrivateNameSV(node.key), 0, node.key.loc.start);
	    }
	  }
	  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
	    classBody.body.push(this.parseMethod(method, isGenerator, isAsync, isConstructor, allowsDirectSuper, "ClassMethod", true));
	  }
	  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
	    const node = this.parseMethod(method, isGenerator, isAsync, false, false, "ClassPrivateMethod", true);
	    classBody.body.push(node);
	    const kind = node.kind === "get" ? node.static ? 6 : 2 : node.kind === "set" ? node.static ? 5 : 1 : 0;
	    this.declareClassPrivateMethodInScope(node, kind);
	  }
	  declareClassPrivateMethodInScope(node, kind) {
	    this.classScope.declarePrivateName(this.getPrivateNameSV(node.key), kind, node.key.loc.start);
	  }
	  parsePostMemberNameModifiers(methodOrProp) {}
	  parseClassPrivateProperty(node) {
	    this.parseInitializer(node);
	    this.semicolon();
	    return this.finishNode(node, "ClassPrivateProperty");
	  }
	  parseClassProperty(node) {
	    this.parseInitializer(node);
	    this.semicolon();
	    return this.finishNode(node, "ClassProperty");
	  }
	  parseClassAccessorProperty(node) {
	    this.parseInitializer(node);
	    this.semicolon();
	    return this.finishNode(node, "ClassAccessorProperty");
	  }
	  parseInitializer(node) {
	    this.scope.enter(64 | 16);
	    this.expressionScope.enter(newExpressionScope());
	    this.prodParam.enter(0);
	    node.value = this.eat(29) ? this.parseMaybeAssignAllowIn() : null;
	    this.expressionScope.exit();
	    this.prodParam.exit();
	    this.scope.exit();
	  }
	  parseClassId(node, isStatement, optionalId, bindingType = 8331) {
	    if (tokenIsIdentifier(this.state.type)) {
	      node.id = this.parseIdentifier();
	      if (isStatement) {
	        this.declareNameFromIdentifier(node.id, bindingType);
	      }
	    } else {
	      if (optionalId || !isStatement) {
	        node.id = null;
	      } else {
	        throw this.raise(Errors.MissingClassName, this.state.startLoc);
	      }
	    }
	  }
	  parseClassSuper(node) {
	    node.superClass = this.eat(81) ? this.parseExprSubscripts() : null;
	  }
	  parseExport(node, decorators) {
	    const maybeDefaultIdentifier = this.parseMaybeImportPhase(node, true);
	    const hasDefault = this.maybeParseExportDefaultSpecifier(node, maybeDefaultIdentifier);
	    const parseAfterDefault = !hasDefault || this.eat(12);
	    const hasStar = parseAfterDefault && this.eatExportStar(node);
	    const hasNamespace = hasStar && this.maybeParseExportNamespaceSpecifier(node);
	    const parseAfterNamespace = parseAfterDefault && (!hasNamespace || this.eat(12));
	    const isFromRequired = hasDefault || hasStar;
	    if (hasStar && !hasNamespace) {
	      if (hasDefault) this.unexpected();
	      if (decorators) {
	        throw this.raise(Errors.UnsupportedDecoratorExport, node);
	      }
	      this.parseExportFrom(node, true);
	      this.sawUnambiguousESM = true;
	      return this.finishNode(node, "ExportAllDeclaration");
	    }
	    const hasSpecifiers = this.maybeParseExportNamedSpecifiers(node);
	    if (hasDefault && parseAfterDefault && !hasStar && !hasSpecifiers) {
	      this.unexpected(null, 5);
	    }
	    if (hasNamespace && parseAfterNamespace) {
	      this.unexpected(null, 98);
	    }
	    let hasDeclaration;
	    if (isFromRequired || hasSpecifiers) {
	      hasDeclaration = false;
	      if (decorators) {
	        throw this.raise(Errors.UnsupportedDecoratorExport, node);
	      }
	      this.parseExportFrom(node, isFromRequired);
	    } else {
	      hasDeclaration = this.maybeParseExportDeclaration(node);
	    }
	    if (isFromRequired || hasSpecifiers || hasDeclaration) {
	      var _node2$declaration;
	      const node2 = node;
	      this.checkExport(node2, true, false, !!node2.source);
	      if (((_node2$declaration = node2.declaration) == null ? void 0 : _node2$declaration.type) === "ClassDeclaration") {
	        this.maybeTakeDecorators(decorators, node2.declaration, node2);
	      } else if (decorators) {
	        throw this.raise(Errors.UnsupportedDecoratorExport, node);
	      }
	      this.sawUnambiguousESM = true;
	      return this.finishNode(node2, "ExportNamedDeclaration");
	    }
	    if (this.eat(65)) {
	      const node2 = node;
	      const decl = this.parseExportDefaultExpression();
	      node2.declaration = decl;
	      if (decl.type === "ClassDeclaration") {
	        this.maybeTakeDecorators(decorators, decl, node2);
	      } else if (decorators) {
	        throw this.raise(Errors.UnsupportedDecoratorExport, node);
	      }
	      this.checkExport(node2, true, true);
	      this.sawUnambiguousESM = true;
	      return this.finishNode(node2, "ExportDefaultDeclaration");
	    }
	    this.unexpected(null, 5);
	  }
	  eatExportStar(node) {
	    return this.eat(55);
	  }
	  maybeParseExportDefaultSpecifier(node, maybeDefaultIdentifier) {
	    if (maybeDefaultIdentifier || this.isExportDefaultSpecifier()) {
	      this.expectPlugin("exportDefaultFrom", maybeDefaultIdentifier == null ? void 0 : maybeDefaultIdentifier.loc.start);
	      const id = maybeDefaultIdentifier || this.parseIdentifier(true);
	      const specifier = this.startNodeAtNode(id);
	      specifier.exported = id;
	      node.specifiers = [this.finishNode(specifier, "ExportDefaultSpecifier")];
	      return true;
	    }
	    return false;
	  }
	  maybeParseExportNamespaceSpecifier(node) {
	    if (this.isContextual(93)) {
	      var _ref, _ref$specifiers;
	      (_ref$specifiers = (_ref = node).specifiers) != null ? _ref$specifiers : _ref.specifiers = [];
	      const specifier = this.startNodeAt(this.state.lastTokStartLoc);
	      this.next();
	      specifier.exported = this.parseModuleExportName();
	      node.specifiers.push(this.finishNode(specifier, "ExportNamespaceSpecifier"));
	      return true;
	    }
	    return false;
	  }
	  maybeParseExportNamedSpecifiers(node) {
	    if (this.match(5)) {
	      const node2 = node;
	      if (!node2.specifiers) node2.specifiers = [];
	      const isTypeExport = node2.exportKind === "type";
	      node2.specifiers.push(...this.parseExportSpecifiers(isTypeExport));
	      node2.source = null;
	      if (this.hasPlugin("importAssertions")) {
	        node2.assertions = [];
	      } else {
	        node2.attributes = [];
	      }
	      node2.declaration = null;
	      return true;
	    }
	    return false;
	  }
	  maybeParseExportDeclaration(node) {
	    if (this.shouldParseExportDeclaration()) {
	      node.specifiers = [];
	      node.source = null;
	      if (this.hasPlugin("importAssertions")) {
	        node.assertions = [];
	      } else {
	        node.attributes = [];
	      }
	      node.declaration = this.parseExportDeclaration(node);
	      return true;
	    }
	    return false;
	  }
	  isAsyncFunction() {
	    if (!this.isContextual(95)) return false;
	    const next = this.nextTokenInLineStart();
	    return this.isUnparsedContextual(next, "function");
	  }
	  parseExportDefaultExpression() {
	    const expr = this.startNode();
	    if (this.match(68)) {
	      this.next();
	      return this.parseFunction(expr, 1 | 4);
	    } else if (this.isAsyncFunction()) {
	      this.next();
	      this.next();
	      return this.parseFunction(expr, 1 | 4 | 8);
	    }
	    if (this.match(80)) {
	      return this.parseClass(expr, true, true);
	    }
	    if (this.match(26)) {
	      if (this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport") === true) {
	        this.raise(Errors.DecoratorBeforeExport, this.state.startLoc);
	      }
	      return this.parseClass(this.maybeTakeDecorators(this.parseDecorators(false), this.startNode()), true, true);
	    }
	    if (this.match(75) || this.match(74) || this.isLet() || this.hasPlugin("explicitResourceManagement") && (this.isUsing() || this.isAwaitUsing())) {
	      throw this.raise(Errors.UnsupportedDefaultExport, this.state.startLoc);
	    }
	    const res = this.parseMaybeAssignAllowIn();
	    this.semicolon();
	    return res;
	  }
	  parseExportDeclaration(node) {
	    if (this.match(80)) {
	      const node = this.parseClass(this.startNode(), true, false);
	      return node;
	    }
	    return this.parseStatementListItem();
	  }
	  isExportDefaultSpecifier() {
	    const {
	      type
	    } = this.state;
	    if (tokenIsIdentifier(type)) {
	      if (type === 95 && !this.state.containsEsc || type === 100) {
	        return false;
	      }
	      if ((type === 130 || type === 129) && !this.state.containsEsc) {
	        const {
	          type: nextType
	        } = this.lookahead();
	        if (tokenIsIdentifier(nextType) && nextType !== 98 || nextType === 5) {
	          this.expectOnePlugin(["flow", "typescript"]);
	          return false;
	        }
	      }
	    } else if (!this.match(65)) {
	      return false;
	    }
	    const next = this.nextTokenStart();
	    const hasFrom = this.isUnparsedContextual(next, "from");
	    if (this.input.charCodeAt(next) === 44 || tokenIsIdentifier(this.state.type) && hasFrom) {
	      return true;
	    }
	    if (this.match(65) && hasFrom) {
	      const nextAfterFrom = this.input.charCodeAt(this.nextTokenStartSince(next + 4));
	      return nextAfterFrom === 34 || nextAfterFrom === 39;
	    }
	    return false;
	  }
	  parseExportFrom(node, expect) {
	    if (this.eatContextual(98)) {
	      node.source = this.parseImportSource();
	      this.checkExport(node);
	      this.maybeParseImportAttributes(node);
	      this.checkJSONModuleImport(node);
	    } else if (expect) {
	      this.unexpected();
	    }
	    this.semicolon();
	  }
	  shouldParseExportDeclaration() {
	    const {
	      type
	    } = this.state;
	    if (type === 26) {
	      this.expectOnePlugin(["decorators", "decorators-legacy"]);
	      if (this.hasPlugin("decorators")) {
	        if (this.getPluginOption("decorators", "decoratorsBeforeExport") === true) {
	          this.raise(Errors.DecoratorBeforeExport, this.state.startLoc);
	        }
	        return true;
	      }
	    }
	    if (this.hasPlugin("explicitResourceManagement")) {
	      if (this.isUsing()) {
	        this.raise(Errors.UsingDeclarationExport, this.state.startLoc);
	        return true;
	      }
	      if (this.isAwaitUsing()) {
	        this.raise(Errors.UsingDeclarationExport, this.state.startLoc);
	        return true;
	      }
	    }
	    return type === 74 || type === 75 || type === 68 || type === 80 || this.isLet() || this.isAsyncFunction();
	  }
	  checkExport(node, checkNames, isDefault, isFrom) {
	    if (checkNames) {
	      var _node$specifiers;
	      if (isDefault) {
	        this.checkDuplicateExports(node, "default");
	        if (this.hasPlugin("exportDefaultFrom")) {
	          var _declaration$extra;
	          const declaration = node.declaration;
	          if (declaration.type === "Identifier" && declaration.name === "from" && declaration.end - declaration.start === 4 && !((_declaration$extra = declaration.extra) != null && _declaration$extra.parenthesized)) {
	            this.raise(Errors.ExportDefaultFromAsIdentifier, declaration);
	          }
	        }
	      } else if ((_node$specifiers = node.specifiers) != null && _node$specifiers.length) {
	        for (const specifier of node.specifiers) {
	          const {
	            exported
	          } = specifier;
	          const exportName = exported.type === "Identifier" ? exported.name : exported.value;
	          this.checkDuplicateExports(specifier, exportName);
	          if (!isFrom && specifier.local) {
	            const {
	              local
	            } = specifier;
	            if (local.type !== "Identifier") {
	              this.raise(Errors.ExportBindingIsString, specifier, {
	                localName: local.value,
	                exportName
	              });
	            } else {
	              this.checkReservedWord(local.name, local.loc.start, true, false);
	              this.scope.checkLocalExport(local);
	            }
	          }
	        }
	      } else if (node.declaration) {
	        const decl = node.declaration;
	        if (decl.type === "FunctionDeclaration" || decl.type === "ClassDeclaration") {
	          const {
	            id
	          } = decl;
	          if (!id) throw new Error("Assertion failure");
	          this.checkDuplicateExports(node, id.name);
	        } else if (decl.type === "VariableDeclaration") {
	          for (const declaration of decl.declarations) {
	            this.checkDeclaration(declaration.id);
	          }
	        }
	      }
	    }
	  }
	  checkDeclaration(node) {
	    if (node.type === "Identifier") {
	      this.checkDuplicateExports(node, node.name);
	    } else if (node.type === "ObjectPattern") {
	      for (const prop of node.properties) {
	        this.checkDeclaration(prop);
	      }
	    } else if (node.type === "ArrayPattern") {
	      for (const elem of node.elements) {
	        if (elem) {
	          this.checkDeclaration(elem);
	        }
	      }
	    } else if (node.type === "ObjectProperty") {
	      this.checkDeclaration(node.value);
	    } else if (node.type === "RestElement") {
	      this.checkDeclaration(node.argument);
	    } else if (node.type === "AssignmentPattern") {
	      this.checkDeclaration(node.left);
	    }
	  }
	  checkDuplicateExports(node, exportName) {
	    if (this.exportedIdentifiers.has(exportName)) {
	      if (exportName === "default") {
	        this.raise(Errors.DuplicateDefaultExport, node);
	      } else {
	        this.raise(Errors.DuplicateExport, node, {
	          exportName
	        });
	      }
	    }
	    this.exportedIdentifiers.add(exportName);
	  }
	  parseExportSpecifiers(isInTypeExport) {
	    const nodes = [];
	    let first = true;
	    this.expect(5);
	    while (!this.eat(8)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(12);
	        if (this.eat(8)) break;
	      }
	      const isMaybeTypeOnly = this.isContextual(130);
	      const isString = this.match(134);
	      const node = this.startNode();
	      node.local = this.parseModuleExportName();
	      nodes.push(this.parseExportSpecifier(node, isString, isInTypeExport, isMaybeTypeOnly));
	    }
	    return nodes;
	  }
	  parseExportSpecifier(node, isString, isInTypeExport, isMaybeTypeOnly) {
	    if (this.eatContextual(93)) {
	      node.exported = this.parseModuleExportName();
	    } else if (isString) {
	      node.exported = this.cloneStringLiteral(node.local);
	    } else if (!node.exported) {
	      node.exported = this.cloneIdentifier(node.local);
	    }
	    return this.finishNode(node, "ExportSpecifier");
	  }
	  parseModuleExportName() {
	    if (this.match(134)) {
	      const result = this.parseStringLiteral(this.state.value);
	      const surrogate = loneSurrogate.exec(result.value);
	      if (surrogate) {
	        this.raise(Errors.ModuleExportNameHasLoneSurrogate, result, {
	          surrogateCharCode: surrogate[0].charCodeAt(0)
	        });
	      }
	      return result;
	    }
	    return this.parseIdentifier(true);
	  }
	  isJSONModuleImport(node) {
	    if (node.assertions != null) {
	      return node.assertions.some(({
	        key,
	        value
	      }) => {
	        return value.value === "json" && (key.type === "Identifier" ? key.name === "type" : key.value === "type");
	      });
	    }
	    return false;
	  }
	  checkImportReflection(node) {
	    const {
	      specifiers
	    } = node;
	    const singleBindingType = specifiers.length === 1 ? specifiers[0].type : null;
	    if (node.phase === "source") {
	      if (singleBindingType !== "ImportDefaultSpecifier") {
	        this.raise(Errors.SourcePhaseImportRequiresDefault, specifiers[0].loc.start);
	      }
	    } else if (node.phase === "defer") {
	      if (singleBindingType !== "ImportNamespaceSpecifier") {
	        this.raise(Errors.DeferImportRequiresNamespace, specifiers[0].loc.start);
	      }
	    } else if (node.module) {
	      var _node$assertions;
	      if (singleBindingType !== "ImportDefaultSpecifier") {
	        this.raise(Errors.ImportReflectionNotBinding, specifiers[0].loc.start);
	      }
	      if (((_node$assertions = node.assertions) == null ? void 0 : _node$assertions.length) > 0) {
	        this.raise(Errors.ImportReflectionHasAssertion, specifiers[0].loc.start);
	      }
	    }
	  }
	  checkJSONModuleImport(node) {
	    if (this.isJSONModuleImport(node) && node.type !== "ExportAllDeclaration") {
	      const {
	        specifiers
	      } = node;
	      if (specifiers != null) {
	        const nonDefaultNamedSpecifier = specifiers.find(specifier => {
	          let imported;
	          if (specifier.type === "ExportSpecifier") {
	            imported = specifier.local;
	          } else if (specifier.type === "ImportSpecifier") {
	            imported = specifier.imported;
	          }
	          if (imported !== undefined) {
	            return imported.type === "Identifier" ? imported.name !== "default" : imported.value !== "default";
	          }
	        });
	        if (nonDefaultNamedSpecifier !== undefined) {
	          this.raise(Errors.ImportJSONBindingNotDefault, nonDefaultNamedSpecifier.loc.start);
	        }
	      }
	    }
	  }
	  isPotentialImportPhase(isExport) {
	    if (isExport) return false;
	    return this.isContextual(105) || this.isContextual(97) || this.isContextual(127);
	  }
	  applyImportPhase(node, isExport, phase, loc) {
	    if (isExport) {
	      return;
	    }
	    if (phase === "module") {
	      this.expectPlugin("importReflection", loc);
	      node.module = true;
	    } else if (this.hasPlugin("importReflection")) {
	      node.module = false;
	    }
	    if (phase === "source") {
	      this.expectPlugin("sourcePhaseImports", loc);
	      node.phase = "source";
	    } else if (phase === "defer") {
	      this.expectPlugin("deferredImportEvaluation", loc);
	      node.phase = "defer";
	    } else if (this.hasPlugin("sourcePhaseImports")) {
	      node.phase = null;
	    }
	  }
	  parseMaybeImportPhase(node, isExport) {
	    if (!this.isPotentialImportPhase(isExport)) {
	      this.applyImportPhase(node, isExport, null);
	      return null;
	    }
	    const phaseIdentifier = this.startNode();
	    const phaseIdentifierName = this.parseIdentifierName(true);
	    const {
	      type
	    } = this.state;
	    const isImportPhase = tokenIsKeywordOrIdentifier(type) ? type !== 98 || this.lookaheadCharCode() === 102 : type !== 12;
	    if (isImportPhase) {
	      this.applyImportPhase(node, isExport, phaseIdentifierName, phaseIdentifier.loc.start);
	      return null;
	    } else {
	      this.applyImportPhase(node, isExport, null);
	      return this.createIdentifier(phaseIdentifier, phaseIdentifierName);
	    }
	  }
	  isPrecedingIdImportPhase(phase) {
	    const {
	      type
	    } = this.state;
	    return tokenIsIdentifier(type) ? type !== 98 || this.lookaheadCharCode() === 102 : type !== 12;
	  }
	  parseImport(node) {
	    if (this.match(134)) {
	      return this.parseImportSourceAndAttributes(node);
	    }
	    return this.parseImportSpecifiersAndAfter(node, this.parseMaybeImportPhase(node, false));
	  }
	  parseImportSpecifiersAndAfter(node, maybeDefaultIdentifier) {
	    node.specifiers = [];
	    const hasDefault = this.maybeParseDefaultImportSpecifier(node, maybeDefaultIdentifier);
	    const parseNext = !hasDefault || this.eat(12);
	    const hasStar = parseNext && this.maybeParseStarImportSpecifier(node);
	    if (parseNext && !hasStar) this.parseNamedImportSpecifiers(node);
	    this.expectContextual(98);
	    return this.parseImportSourceAndAttributes(node);
	  }
	  parseImportSourceAndAttributes(node) {
	    var _node$specifiers2;
	    (_node$specifiers2 = node.specifiers) != null ? _node$specifiers2 : node.specifiers = [];
	    node.source = this.parseImportSource();
	    this.maybeParseImportAttributes(node);
	    this.checkImportReflection(node);
	    this.checkJSONModuleImport(node);
	    this.semicolon();
	    this.sawUnambiguousESM = true;
	    return this.finishNode(node, "ImportDeclaration");
	  }
	  parseImportSource() {
	    if (!this.match(134)) this.unexpected();
	    return this.parseExprAtom();
	  }
	  parseImportSpecifierLocal(node, specifier, type) {
	    specifier.local = this.parseIdentifier();
	    node.specifiers.push(this.finishImportSpecifier(specifier, type));
	  }
	  finishImportSpecifier(specifier, type, bindingType = 8201) {
	    this.checkLVal(specifier.local, {
	      type
	    }, bindingType);
	    return this.finishNode(specifier, type);
	  }
	  parseImportAttributes() {
	    this.expect(5);
	    const attrs = [];
	    const attrNames = new Set();
	    do {
	      if (this.match(8)) {
	        break;
	      }
	      const node = this.startNode();
	      const keyName = this.state.value;
	      if (attrNames.has(keyName)) {
	        this.raise(Errors.ModuleAttributesWithDuplicateKeys, this.state.startLoc, {
	          key: keyName
	        });
	      }
	      attrNames.add(keyName);
	      if (this.match(134)) {
	        node.key = this.parseStringLiteral(keyName);
	      } else {
	        node.key = this.parseIdentifier(true);
	      }
	      this.expect(14);
	      if (!this.match(134)) {
	        throw this.raise(Errors.ModuleAttributeInvalidValue, this.state.startLoc);
	      }
	      node.value = this.parseStringLiteral(this.state.value);
	      attrs.push(this.finishNode(node, "ImportAttribute"));
	    } while (this.eat(12));
	    this.expect(8);
	    return attrs;
	  }
	  parseModuleAttributes() {
	    const attrs = [];
	    const attributes = new Set();
	    do {
	      const node = this.startNode();
	      node.key = this.parseIdentifier(true);
	      if (node.key.name !== "type") {
	        this.raise(Errors.ModuleAttributeDifferentFromType, node.key);
	      }
	      if (attributes.has(node.key.name)) {
	        this.raise(Errors.ModuleAttributesWithDuplicateKeys, node.key, {
	          key: node.key.name
	        });
	      }
	      attributes.add(node.key.name);
	      this.expect(14);
	      if (!this.match(134)) {
	        throw this.raise(Errors.ModuleAttributeInvalidValue, this.state.startLoc);
	      }
	      node.value = this.parseStringLiteral(this.state.value);
	      attrs.push(this.finishNode(node, "ImportAttribute"));
	    } while (this.eat(12));
	    return attrs;
	  }
	  maybeParseImportAttributes(node) {
	    let attributes;
	    {
	      var useWith = false;
	    }
	    if (this.match(76)) {
	      if (this.hasPrecedingLineBreak() && this.lookaheadCharCode() === 40) {
	        return;
	      }
	      this.next();
	      if (this.hasPlugin("moduleAttributes")) {
	        attributes = this.parseModuleAttributes();
	        this.addExtra(node, "deprecatedWithLegacySyntax", true);
	      } else {
	        attributes = this.parseImportAttributes();
	      }
	      {
	        useWith = true;
	      }
	    } else if (this.isContextual(94) && !this.hasPrecedingLineBreak()) {
	      if (!this.hasPlugin("deprecatedImportAssert") && !this.hasPlugin("importAssertions")) {
	        this.raise(Errors.ImportAttributesUseAssert, this.state.startLoc);
	      }
	      if (!this.hasPlugin("importAssertions")) {
	        this.addExtra(node, "deprecatedAssertSyntax", true);
	      }
	      this.next();
	      attributes = this.parseImportAttributes();
	    } else {
	      attributes = [];
	    }
	    if (!useWith && this.hasPlugin("importAssertions")) {
	      node.assertions = attributes;
	    } else {
	      node.attributes = attributes;
	    }
	  }
	  maybeParseDefaultImportSpecifier(node, maybeDefaultIdentifier) {
	    if (maybeDefaultIdentifier) {
	      const specifier = this.startNodeAtNode(maybeDefaultIdentifier);
	      specifier.local = maybeDefaultIdentifier;
	      node.specifiers.push(this.finishImportSpecifier(specifier, "ImportDefaultSpecifier"));
	      return true;
	    } else if (tokenIsKeywordOrIdentifier(this.state.type)) {
	      this.parseImportSpecifierLocal(node, this.startNode(), "ImportDefaultSpecifier");
	      return true;
	    }
	    return false;
	  }
	  maybeParseStarImportSpecifier(node) {
	    if (this.match(55)) {
	      const specifier = this.startNode();
	      this.next();
	      this.expectContextual(93);
	      this.parseImportSpecifierLocal(node, specifier, "ImportNamespaceSpecifier");
	      return true;
	    }
	    return false;
	  }
	  parseNamedImportSpecifiers(node) {
	    let first = true;
	    this.expect(5);
	    while (!this.eat(8)) {
	      if (first) {
	        first = false;
	      } else {
	        if (this.eat(14)) {
	          throw this.raise(Errors.DestructureNamedImport, this.state.startLoc);
	        }
	        this.expect(12);
	        if (this.eat(8)) break;
	      }
	      const specifier = this.startNode();
	      const importedIsString = this.match(134);
	      const isMaybeTypeOnly = this.isContextual(130);
	      specifier.imported = this.parseModuleExportName();
	      const importSpecifier = this.parseImportSpecifier(specifier, importedIsString, node.importKind === "type" || node.importKind === "typeof", isMaybeTypeOnly, undefined);
	      node.specifiers.push(importSpecifier);
	    }
	  }
	  parseImportSpecifier(specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly, bindingType) {
	    if (this.eatContextual(93)) {
	      specifier.local = this.parseIdentifier();
	    } else {
	      const {
	        imported
	      } = specifier;
	      if (importedIsString) {
	        throw this.raise(Errors.ImportBindingIsString, specifier, {
	          importName: imported.value
	        });
	      }
	      this.checkReservedWord(imported.name, specifier.loc.start, true, true);
	      if (!specifier.local) {
	        specifier.local = this.cloneIdentifier(imported);
	      }
	    }
	    return this.finishImportSpecifier(specifier, "ImportSpecifier", bindingType);
	  }
	  isThisParam(param) {
	    return param.type === "Identifier" && param.name === "this";
	  }
	}
	class Parser extends StatementParser {
	  constructor(options, input, pluginsMap) {
	    options = getOptions(options);
	    super(options, input);
	    this.options = options;
	    this.initializeScopes();
	    this.plugins = pluginsMap;
	    this.filename = options.sourceFilename;
	    this.startIndex = options.startIndex;
	    let optionFlags = 0;
	    if (options.allowAwaitOutsideFunction) {
	      optionFlags |= 1;
	    }
	    if (options.allowReturnOutsideFunction) {
	      optionFlags |= 2;
	    }
	    if (options.allowImportExportEverywhere) {
	      optionFlags |= 8;
	    }
	    if (options.allowSuperOutsideMethod) {
	      optionFlags |= 16;
	    }
	    if (options.allowUndeclaredExports) {
	      optionFlags |= 64;
	    }
	    if (options.allowNewTargetOutsideFunction) {
	      optionFlags |= 4;
	    }
	    if (options.allowYieldOutsideFunction) {
	      optionFlags |= 32;
	    }
	    if (options.ranges) {
	      optionFlags |= 128;
	    }
	    if (options.tokens) {
	      optionFlags |= 256;
	    }
	    if (options.createImportExpressions) {
	      optionFlags |= 512;
	    }
	    if (options.createParenthesizedExpressions) {
	      optionFlags |= 1024;
	    }
	    if (options.errorRecovery) {
	      optionFlags |= 2048;
	    }
	    if (options.attachComment) {
	      optionFlags |= 4096;
	    }
	    if (options.annexB) {
	      optionFlags |= 8192;
	    }
	    this.optionFlags = optionFlags;
	  }
	  getScopeHandler() {
	    return ScopeHandler;
	  }
	  parse() {
	    this.enterInitialScopes();
	    const file = this.startNode();
	    const program = this.startNode();
	    this.nextToken();
	    file.errors = null;
	    this.parseTopLevel(file, program);
	    file.errors = this.state.errors;
	    file.comments.length = this.state.commentsLen;
	    return file;
	  }
	}
	function parse(input, options) {
	  var _options;
	  if (((_options = options) == null ? void 0 : _options.sourceType) === "unambiguous") {
	    options = Object.assign({}, options);
	    try {
	      options.sourceType = "module";
	      const parser = getParser(options, input);
	      const ast = parser.parse();
	      if (parser.sawUnambiguousESM) {
	        return ast;
	      }
	      if (parser.ambiguousScriptDifferentAst) {
	        try {
	          options.sourceType = "script";
	          return getParser(options, input).parse();
	        } catch (_unused) {}
	      } else {
	        ast.program.sourceType = "script";
	      }
	      return ast;
	    } catch (moduleError) {
	      try {
	        options.sourceType = "script";
	        return getParser(options, input).parse();
	      } catch (_unused2) {}
	      throw moduleError;
	    }
	  } else {
	    return getParser(options, input).parse();
	  }
	}
	function parseExpression(input, options) {
	  const parser = getParser(options, input);
	  if (parser.options.strictMode) {
	    parser.state.strict = true;
	  }
	  return parser.getExpression();
	}
	function generateExportedTokenTypes(internalTokenTypes) {
	  const tokenTypes = {};
	  for (const typeName of Object.keys(internalTokenTypes)) {
	    tokenTypes[typeName] = getExportedToken(internalTokenTypes[typeName]);
	  }
	  return tokenTypes;
	}
	const tokTypes = generateExportedTokenTypes(tt);
	function getParser(options, input) {
	  let cls = Parser;
	  const pluginsMap = new Map();
	  if (options != null && options.plugins) {
	    for (const plugin of options.plugins) {
	      let name, opts;
	      if (typeof plugin === "string") {
	        name = plugin;
	      } else {
	        [name, opts] = plugin;
	      }
	      if (!pluginsMap.has(name)) {
	        pluginsMap.set(name, opts || {});
	      }
	    }
	    validatePlugins(pluginsMap);
	    cls = getParserClass(pluginsMap);
	  }
	  return new cls(options, input, pluginsMap);
	}
	const parserClassCache = new Map();
	function getParserClass(pluginsMap) {
	  const pluginList = [];
	  for (const name of mixinPluginNames) {
	    if (pluginsMap.has(name)) {
	      pluginList.push(name);
	    }
	  }
	  const key = pluginList.join("|");
	  let cls = parserClassCache.get(key);
	  if (!cls) {
	    cls = Parser;
	    for (const plugin of pluginList) {
	      cls = mixinPlugins[plugin](cls);
	    }
	    parserClassCache.set(key, cls);
	  }
	  return cls;
	}
	lib.parse = parse;
	lib.parseExpression = parseExpression;
	lib.tokTypes = tokTypes;
	
	return lib;
}

var libExports = /*@__PURE__*/ requireLib();

// @ts-check
/** @typedef { import('estree').BaseNode} BaseNode */

/** @typedef {{
	skip: () => void;
	remove: () => void;
	replace: (node: BaseNode) => void;
}} WalkerContext */

class WalkerBase {
	constructor() {
		/** @type {boolean} */
		this.should_skip = false;

		/** @type {boolean} */
		this.should_remove = false;

		/** @type {BaseNode | null} */
		this.replacement = null;

		/** @type {WalkerContext} */
		this.context = {
			skip: () => (this.should_skip = true),
			remove: () => (this.should_remove = true),
			replace: (node) => (this.replacement = node)
		};
	}

	/**
	 *
	 * @param {any} parent
	 * @param {string} prop
	 * @param {number} index
	 * @param {BaseNode} node
	 */
	replace(parent, prop, index, node) {
		if (parent) {
			if (index !== null) {
				parent[prop][index] = node;
			} else {
				parent[prop] = node;
			}
		}
	}

	/**
	 *
	 * @param {any} parent
	 * @param {string} prop
	 * @param {number} index
	 */
	remove(parent, prop, index) {
		if (parent) {
			if (index !== null) {
				parent[prop].splice(index, 1);
			} else {
				delete parent[prop];
			}
		}
	}
}

// @ts-check

/** @typedef { import('estree').BaseNode} BaseNode */
/** @typedef { import('./walker.js').WalkerContext} WalkerContext */

/** @typedef {(
 *    this: WalkerContext,
 *    node: BaseNode,
 *    parent: BaseNode,
 *    key: string,
 *    index: number
 * ) => void} SyncHandler */

class SyncWalker extends WalkerBase {
	/**
	 *
	 * @param {SyncHandler} enter
	 * @param {SyncHandler} leave
	 */
	constructor(enter, leave) {
		super();

		/** @type {SyncHandler} */
		this.enter = enter;

		/** @type {SyncHandler} */
		this.leave = leave;
	}

	/**
	 *
	 * @param {BaseNode} node
	 * @param {BaseNode} parent
	 * @param {string} [prop]
	 * @param {number} [index]
	 * @returns {BaseNode}
	 */
	visit(node, parent, prop, index) {
		if (node) {
			if (this.enter) {
				const _should_skip = this.should_skip;
				const _should_remove = this.should_remove;
				const _replacement = this.replacement;
				this.should_skip = false;
				this.should_remove = false;
				this.replacement = null;

				this.enter.call(this.context, node, parent, prop, index);

				if (this.replacement) {
					node = this.replacement;
					this.replace(parent, prop, index, node);
				}

				if (this.should_remove) {
					this.remove(parent, prop, index);
				}

				const skipped = this.should_skip;
				const removed = this.should_remove;

				this.should_skip = _should_skip;
				this.should_remove = _should_remove;
				this.replacement = _replacement;

				if (skipped) return node;
				if (removed) return null;
			}

			for (const key in node) {
				const value = node[key];

				if (typeof value !== "object") {
					continue;
				} else if (Array.isArray(value)) {
					for (let i = 0; i < value.length; i += 1) {
						if (value[i] !== null && typeof value[i].type === 'string') {
							if (!this.visit(value[i], node, key, i)) {
								// removed
								i--;
							}
						}
					}
				} else if (value !== null && typeof value.type === "string") {
					this.visit(value, node, key, null);
				}
			}

			if (this.leave) {
				const _replacement = this.replacement;
				const _should_remove = this.should_remove;
				this.replacement = null;
				this.should_remove = false;

				this.leave.call(this.context, node, parent, prop, index);

				if (this.replacement) {
					node = this.replacement;
					this.replace(parent, prop, index, node);
				}

				if (this.should_remove) {
					this.remove(parent, prop, index);
				}

				const removed = this.should_remove;

				this.replacement = _replacement;
				this.should_remove = _should_remove;

				if (removed) return null;
			}
		}

		return node;
	}
}

// @ts-check

/** @typedef { import('estree').BaseNode} BaseNode */
/** @typedef { import('./sync.js').SyncHandler} SyncHandler */
/** @typedef { import('./async.js').AsyncHandler} AsyncHandler */

/**
 *
 * @param {BaseNode} ast
 * @param {{
 *   enter?: SyncHandler
 *   leave?: SyncHandler
 * }} walker
 * @returns {BaseNode}
 */
function walk(ast, { enter, leave }) {
	const instance = new SyncWalker(enter, leave);
	return instance.visit(ast, null);
}

function walkIdentifiers(root, onIdentifier, includeAll = false, parentStack = [], knownIds = /* @__PURE__ */ Object.create(null)) {
  const rootExp = root.type === "Program" ? root.body[0].type === "ExpressionStatement" && root.body[0].expression : root;
  walk(root, {
    enter(node, parent) {
      parent && parentStack.push(parent);
      if (parent && parent.type.startsWith("TS") && !TS_NODE_TYPES.includes(parent.type)) {
        return this.skip();
      }
      if (node.type === "Identifier") {
        const isLocal = !!knownIds[node.name];
        const isRefed = isReferencedIdentifier(node, parent, parentStack);
        if (includeAll || isRefed && !isLocal) {
          onIdentifier(node, parent, parentStack, isRefed, isLocal);
        }
      } else if (node.type === "ObjectProperty" && // eslint-disable-next-line no-restricted-syntax
      (parent == null ? void 0 : parent.type) === "ObjectPattern") {
        node.inPattern = true;
      } else if (isFunctionType(node)) {
        if (node.scopeIds) {
          node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
        } else {
          walkFunctionParams(
            node,
            (id) => markScopeIdentifier(node, id, knownIds)
          );
        }
      } else if (node.type === "BlockStatement") {
        if (node.scopeIds) {
          node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
        } else {
          walkBlockDeclarations(
            node,
            (id) => markScopeIdentifier(node, id, knownIds)
          );
        }
      } else if (node.type === "CatchClause" && node.param) {
        for (const id of extractIdentifiers(node.param)) {
          markScopeIdentifier(node, id, knownIds);
        }
      } else if (isForStatement(node)) {
        walkForStatement(
          node,
          false,
          (id) => markScopeIdentifier(node, id, knownIds)
        );
      }
    },
    leave(node, parent) {
      parent && parentStack.pop();
      if (node !== rootExp && node.scopeIds) {
        for (const id of node.scopeIds) {
          knownIds[id]--;
          if (knownIds[id] === 0) {
            delete knownIds[id];
          }
        }
      }
    }
  });
}
function isReferencedIdentifier(id, parent, parentStack) {
  if (!parent) {
    return true;
  }
  if (id.name === "arguments") {
    return false;
  }
  if (isReferenced(id, parent)) {
    return true;
  }
  switch (parent.type) {
    case "AssignmentExpression":
    case "AssignmentPattern":
      return true;
    case "ObjectPattern":
    case "ArrayPattern":
      return isInDestructureAssignment(parent, parentStack);
  }
  return false;
}
function isInDestructureAssignment(parent, parentStack) {
  if (parent && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
    let i = parentStack.length;
    while (i--) {
      const p = parentStack[i];
      if (p.type === "AssignmentExpression") {
        return true;
      } else if (p.type !== "ObjectProperty" && !p.type.endsWith("Pattern")) {
        break;
      }
    }
  }
  return false;
}
function walkFunctionParams(node, onIdent) {
  for (const p of node.params) {
    for (const id of extractIdentifiers(p)) {
      onIdent(id);
    }
  }
}
function walkBlockDeclarations(block, onIdent) {
  for (const stmt of block.body) {
    if (stmt.type === "VariableDeclaration") {
      if (stmt.declare) continue;
      for (const decl of stmt.declarations) {
        for (const id of extractIdentifiers(decl.id)) {
          onIdent(id);
        }
      }
    } else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
      if (stmt.declare || !stmt.id) continue;
      onIdent(stmt.id);
    } else if (isForStatement(stmt)) {
      walkForStatement(stmt, true, onIdent);
    }
  }
}
function isForStatement(stmt) {
  return stmt.type === "ForOfStatement" || stmt.type === "ForInStatement" || stmt.type === "ForStatement";
}
function walkForStatement(stmt, isVar, onIdent) {
  const variable = stmt.type === "ForStatement" ? stmt.init : stmt.left;
  if (variable && variable.type === "VariableDeclaration" && (variable.kind === "var" ? isVar : !isVar)) {
    for (const decl of variable.declarations) {
      for (const id of extractIdentifiers(decl.id)) {
        onIdent(id);
      }
    }
  }
}
function extractIdentifiers(param, nodes = []) {
  switch (param.type) {
    case "Identifier":
      nodes.push(param);
      break;
    case "MemberExpression":
      let object = param;
      while (object.type === "MemberExpression") {
        object = object.object;
      }
      nodes.push(object);
      break;
    case "ObjectPattern":
      for (const prop of param.properties) {
        if (prop.type === "RestElement") {
          extractIdentifiers(prop.argument, nodes);
        } else {
          extractIdentifiers(prop.value, nodes);
        }
      }
      break;
    case "ArrayPattern":
      param.elements.forEach((element) => {
        if (element) extractIdentifiers(element, nodes);
      });
      break;
    case "RestElement":
      extractIdentifiers(param.argument, nodes);
      break;
    case "AssignmentPattern":
      extractIdentifiers(param.left, nodes);
      break;
  }
  return nodes;
}
function markKnownIds(name, knownIds) {
  if (name in knownIds) {
    knownIds[name]++;
  } else {
    knownIds[name] = 1;
  }
}
function markScopeIdentifier(node, child, knownIds) {
  const { name } = child;
  if (node.scopeIds && node.scopeIds.has(name)) {
    return;
  }
  markKnownIds(name, knownIds);
  (node.scopeIds || (node.scopeIds = /* @__PURE__ */ new Set())).add(name);
}
const isFunctionType = (node) => {
  return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
};
const isStaticProperty = (node) => !!node && (node.type === "ObjectProperty" || node.type === "ObjectMethod") && !node.computed;
function isReferenced(node, parent, grandparent) {
  switch (parent.type) {
    // yes: PARENT[NODE]
    // yes: NODE.child
    // no: parent.NODE
    case "MemberExpression":
    case "OptionalMemberExpression":
      if (parent.property === node) {
        return !!parent.computed;
      }
      return parent.object === node;
    case "JSXMemberExpression":
      return parent.object === node;
    // no: let NODE = init;
    // yes: let id = NODE;
    case "VariableDeclarator":
      return parent.init === node;
    // yes: () => NODE
    // no: (NODE) => {}
    case "ArrowFunctionExpression":
      return parent.body === node;
    // no: class { #NODE; }
    // no: class { get #NODE() {} }
    // no: class { #NODE() {} }
    // no: class { fn() { return this.#NODE; } }
    case "PrivateName":
      return false;
    // no: class { NODE() {} }
    // yes: class { [NODE]() {} }
    // no: class { foo(NODE) {} }
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "ObjectMethod":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return false;
    // yes: { [NODE]: "" }
    // no: { NODE: "" }
    // depends: { NODE }
    // depends: { key: NODE }
    case "ObjectProperty":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return true;
    // no: class { NODE = value; }
    // yes: class { [NODE] = value; }
    // yes: class { key = NODE; }
    case "ClassProperty":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return true;
    case "ClassPrivateProperty":
      return parent.key !== node;
    // no: class NODE {}
    // yes: class Foo extends NODE {}
    case "ClassDeclaration":
    case "ClassExpression":
      return parent.superClass === node;
    // yes: left = NODE;
    // no: NODE = right;
    case "AssignmentExpression":
      return parent.right === node;
    // no: [NODE = foo] = [];
    // yes: [foo = NODE] = [];
    case "AssignmentPattern":
      return parent.right === node;
    // no: NODE: for (;;) {}
    case "LabeledStatement":
      return false;
    // no: try {} catch (NODE) {}
    case "CatchClause":
      return false;
    // no: function foo(...NODE) {}
    case "RestElement":
      return false;
    case "BreakStatement":
    case "ContinueStatement":
      return false;
    // no: function NODE() {}
    // no: function foo(NODE) {}
    case "FunctionDeclaration":
    case "FunctionExpression":
      return false;
    // no: export NODE from "foo";
    // no: export * as NODE from "foo";
    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      return false;
    // no: export { foo as NODE };
    // yes: export { NODE as foo };
    // no: export { NODE as foo } from "foo";
    case "ExportSpecifier":
      return parent.local === node;
    // no: import NODE from "foo";
    // no: import * as NODE from "foo";
    // no: import { NODE as foo } from "foo";
    // no: import { foo as NODE } from "foo";
    // no: import NODE from "bar";
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
      return false;
    // no: import "foo" assert { NODE: "json" }
    case "ImportAttribute":
      return false;
    // no: <div NODE="foo" />
    case "JSXAttribute":
      return false;
    // no: [NODE] = [];
    // no: ({ NODE }) = [];
    case "ObjectPattern":
    case "ArrayPattern":
      return false;
    // no: new.NODE
    // no: NODE.target
    case "MetaProperty":
      return false;
    // yes: type X = { someProperty: NODE }
    // no: type X = { NODE: OtherType }
    case "ObjectTypeProperty":
      return parent.key !== node;
    // yes: enum X { Foo = NODE }
    // no: enum X { NODE }
    case "TSEnumMember":
      return parent.id !== node;
    // yes: { [NODE]: value }
    // no: { NODE: value }
    case "TSPropertySignature":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return true;
  }
  return true;
}
const TS_NODE_TYPES = [
  "TSAsExpression",
  // foo as number
  "TSTypeAssertion",
  // (<number>foo)
  "TSNonNullExpression",
  // foo!
  "TSInstantiationExpression",
  // foo<string>
  "TSSatisfiesExpression"
  // foo satisfies T
];
function unwrapTSNode(node) {
  if (TS_NODE_TYPES.includes(node.type)) {
    return unwrapTSNode(node.expression);
  } else {
    return node;
  }
}
function isStaticNode(node) {
  node = unwrapTSNode(node);
  switch (node.type) {
    case "UnaryExpression":
      return isStaticNode(node.argument);
    case "LogicalExpression":
    // 1 > 2
    case "BinaryExpression":
      return isStaticNode(node.left) && isStaticNode(node.right);
    case "ConditionalExpression": {
      return isStaticNode(node.test) && isStaticNode(node.consequent) && isStaticNode(node.alternate);
    }
    case "SequenceExpression":
    // (1, 2)
    case "TemplateLiteral":
      return node.expressions.every((expr) => isStaticNode(expr));
    case "ParenthesizedExpression":
      return isStaticNode(node.expression);
    case "StringLiteral":
    case "NumericLiteral":
    case "BooleanLiteral":
    case "NullLiteral":
    case "BigIntLiteral":
      return true;
  }
  return false;
}
function isConstantNode(node, bindings) {
  if (isStaticNode(node)) return true;
  node = unwrapTSNode(node);
  switch (node.type) {
    case "Identifier":
      const type = bindings[node.name];
      return type === "literal-const";
    case "RegExpLiteral":
      return true;
    case "ObjectExpression":
      return node.properties.every((prop) => {
        if (prop.type === "ObjectMethod") return false;
        if (prop.type === "SpreadElement")
          return isConstantNode(prop.argument, bindings);
        return (!prop.computed || isConstantNode(prop.key, bindings)) && isConstantNode(prop.value, bindings);
      });
    case "ArrayExpression":
      return node.elements.every((element) => {
        if (element === null) return true;
        if (element.type === "SpreadElement")
          return isConstantNode(element.argument, bindings);
        return isConstantNode(element, bindings);
      });
  }
  return false;
}

const isStaticExp = (p) => p.type === 4 && p.isStatic;
function isCoreComponent(tag) {
  switch (tag) {
    case "Teleport":
    case "teleport":
      return TELEPORT;
    case "Suspense":
    case "suspense":
      return SUSPENSE;
    case "KeepAlive":
    case "keep-alive":
      return KEEP_ALIVE;
    case "BaseTransition":
    case "base-transition":
      return BASE_TRANSITION;
  }
}
const nonIdentifierRE = /^\d|[^\$\w\xA0-\uFFFF]/;
const isSimpleIdentifier = (name) => !nonIdentifierRE.test(name);
const getExpSource = (exp) => exp.type === 4 ? exp.content : exp.loc.source;
const isMemberExpressionNode = (exp, context) => {
  try {
    let ret = exp.ast || libExports.parseExpression(getExpSource(exp), {
      plugins: context.expressionPlugins ? [...context.expressionPlugins, "typescript"] : ["typescript"]
    });
    ret = unwrapTSNode(ret);
    return ret.type === "MemberExpression" || ret.type === "OptionalMemberExpression" || ret.type === "Identifier" && ret.name !== "undefined";
  } catch (e) {
    return false;
  }
};
const isMemberExpression$1 = isMemberExpressionNode;
const isFnExpressionNode = (exp, context) => {
  try {
    let ret = exp.ast || libExports.parseExpression(getExpSource(exp), {
      plugins: context.expressionPlugins ? [...context.expressionPlugins, "typescript"] : ["typescript"]
    });
    if (ret.type === "Program") {
      ret = ret.body[0];
      if (ret.type === "ExpressionStatement") {
        ret = ret.expression;
      }
    }
    ret = unwrapTSNode(ret);
    return ret.type === "FunctionExpression" || ret.type === "ArrowFunctionExpression";
  } catch (e) {
    return false;
  }
};
const isFnExpression = isFnExpressionNode;
function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
  return advancePositionWithMutation(
    {
      offset: pos.offset,
      line: pos.line,
      column: pos.column
    },
    source,
    numberOfCharacters
  );
}
function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
  let linesCount = 0;
  let lastNewLinePos = -1;
  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10) {
      linesCount++;
      lastNewLinePos = i;
    }
  }
  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
  return pos;
}
function findDir$1(node, name, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 7 && (allowEmpty || p.exp) && (isString(name) ? p.name === name : name.test(p.name))) {
      return p;
    }
  }
}
function findProp$1(node, name, dynamicOnly = false, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 6) {
      if (dynamicOnly) continue;
      if (p.name === name && (p.value || allowEmpty)) {
        return p;
      }
    } else if (p.name === "bind" && (p.exp || allowEmpty) && isStaticArgOf(p.arg, name)) {
      return p;
    }
  }
}
function isStaticArgOf(arg, name) {
  return !!(arg && isStaticExp(arg) && arg.content === name);
}
function hasDynamicKeyVBind(node) {
  return node.props.some(
    (p) => p.type === 7 && p.name === "bind" && (!p.arg || // v-bind="obj"
    p.arg.type !== 4 || // v-bind:[_ctx.foo]
    !p.arg.isStatic)
    // v-bind:[foo]
  );
}
function isVSlot(p) {
  return p.type === 7 && p.name === "slot";
}
function isTemplateNode(node) {
  return node.type === 1 && node.tagType === 3;
}
function toValidAssetId(name, type) {
  return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue) => {
    return searchValue === "-" ? "_" : name.charCodeAt(replaceValue).toString();
  })}`;
}
const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;

const defaultParserOptions = {
  parseMode: "base",
  ns: 0,
  delimiters: [`{{`, `}}`],
  getNamespace: () => 0,
  isVoidTag: NO,
  isPreTag: NO,
  isIgnoreNewlineTag: NO,
  isCustomElement: NO,
  onError: defaultOnError,
  onWarn: defaultOnWarn,
  comments: true,
  prefixIdentifiers: false
};
let currentOptions = defaultParserOptions;
let currentRoot = null;
let currentInput = "";
let currentOpenTag = null;
let currentProp = null;
let currentAttrValue = "";
let currentAttrStartIndex = -1;
let currentAttrEndIndex = -1;
let inPre = 0;
let inVPre = false;
let currentVPreBoundary = null;
const stack = [];
const tokenizer = new Tokenizer(stack, {
  onerr: emitError,
  ontext(start, end) {
    onText(getSlice(start, end), start, end);
  },
  ontextentity(char, start, end) {
    onText(char, start, end);
  },
  oninterpolation(start, end) {
    if (inVPre) {
      return onText(getSlice(start, end), start, end);
    }
    let innerStart = start + tokenizer.delimiterOpen.length;
    let innerEnd = end - tokenizer.delimiterClose.length;
    while (isWhitespace(currentInput.charCodeAt(innerStart))) {
      innerStart++;
    }
    while (isWhitespace(currentInput.charCodeAt(innerEnd - 1))) {
      innerEnd--;
    }
    let exp = getSlice(innerStart, innerEnd);
    if (exp.includes("&")) {
      {
        exp = decodeHTML(exp);
      }
    }
    addNode({
      type: 5,
      content: createExp(exp, false, getLoc(innerStart, innerEnd)),
      loc: getLoc(start, end)
    });
  },
  onopentagname(start, end) {
    const name = getSlice(start, end);
    currentOpenTag = {
      type: 1,
      tag: name,
      ns: currentOptions.getNamespace(name, stack[0], currentOptions.ns),
      tagType: 0,
      // will be refined on tag close
      props: [],
      children: [],
      loc: getLoc(start - 1, end),
      codegenNode: void 0
    };
  },
  onopentagend(end) {
    endOpenTag(end);
  },
  onclosetag(start, end) {
    const name = getSlice(start, end);
    if (!currentOptions.isVoidTag(name)) {
      let found = false;
      for (let i = 0; i < stack.length; i++) {
        const e = stack[i];
        if (e.tag.toLowerCase() === name.toLowerCase()) {
          found = true;
          if (i > 0) {
            emitError(24, stack[0].loc.start.offset);
          }
          for (let j = 0; j <= i; j++) {
            const el = stack.shift();
            onCloseTag(el, end, j < i);
          }
          break;
        }
      }
      if (!found) {
        emitError(23, backTrack(start, 60));
      }
    }
  },
  onselfclosingtag(end) {
    const name = currentOpenTag.tag;
    currentOpenTag.isSelfClosing = true;
    endOpenTag(end);
    if (stack[0] && stack[0].tag === name) {
      onCloseTag(stack.shift(), end);
    }
  },
  onattribname(start, end) {
    currentProp = {
      type: 6,
      name: getSlice(start, end),
      nameLoc: getLoc(start, end),
      value: void 0,
      loc: getLoc(start)
    };
  },
  ondirname(start, end) {
    const raw = getSlice(start, end);
    const name = raw === "." || raw === ":" ? "bind" : raw === "@" ? "on" : raw === "#" ? "slot" : raw.slice(2);
    if (!inVPre && name === "") {
      emitError(26, start);
    }
    if (inVPre || name === "") {
      currentProp = {
        type: 6,
        name: raw,
        nameLoc: getLoc(start, end),
        value: void 0,
        loc: getLoc(start)
      };
    } else {
      currentProp = {
        type: 7,
        name,
        rawName: raw,
        exp: void 0,
        arg: void 0,
        modifiers: raw === "." ? [createSimpleExpression("prop")] : [],
        loc: getLoc(start)
      };
      if (name === "pre") {
        inVPre = tokenizer.inVPre = true;
        currentVPreBoundary = currentOpenTag;
        const props = currentOpenTag.props;
        for (let i = 0; i < props.length; i++) {
          if (props[i].type === 7) {
            props[i] = dirToAttr(props[i]);
          }
        }
      }
    }
  },
  ondirarg(start, end) {
    if (start === end) return;
    const arg = getSlice(start, end);
    if (inVPre) {
      currentProp.name += arg;
      setLocEnd(currentProp.nameLoc, end);
    } else {
      const isStatic = arg[0] !== `[`;
      currentProp.arg = createExp(
        isStatic ? arg : arg.slice(1, -1),
        isStatic,
        getLoc(start, end),
        isStatic ? 3 : 0
      );
    }
  },
  ondirmodifier(start, end) {
    const mod = getSlice(start, end);
    if (inVPre) {
      currentProp.name += "." + mod;
      setLocEnd(currentProp.nameLoc, end);
    } else if (currentProp.name === "slot") {
      const arg = currentProp.arg;
      if (arg) {
        arg.content += "." + mod;
        setLocEnd(arg.loc, end);
      }
    } else {
      const exp = createSimpleExpression(mod, true, getLoc(start, end));
      currentProp.modifiers.push(exp);
    }
  },
  onattribdata(start, end) {
    currentAttrValue += getSlice(start, end);
    if (currentAttrStartIndex < 0) currentAttrStartIndex = start;
    currentAttrEndIndex = end;
  },
  onattribentity(char, start, end) {
    currentAttrValue += char;
    if (currentAttrStartIndex < 0) currentAttrStartIndex = start;
    currentAttrEndIndex = end;
  },
  onattribnameend(end) {
    const start = currentProp.loc.start.offset;
    const name = getSlice(start, end);
    if (currentProp.type === 7) {
      currentProp.rawName = name;
    }
    if (currentOpenTag.props.some(
      (p) => (p.type === 7 ? p.rawName : p.name) === name
    )) {
      emitError(2, start);
    }
  },
  onattribend(quote, end) {
    if (currentOpenTag && currentProp) {
      setLocEnd(currentProp.loc, end);
      if (quote !== 0) {
        if (currentProp.type === 6) {
          if (currentProp.name === "class") {
            currentAttrValue = condense(currentAttrValue).trim();
          }
          if (quote === 1 && !currentAttrValue) {
            emitError(13, end);
          }
          currentProp.value = {
            type: 2,
            content: currentAttrValue,
            loc: quote === 1 ? getLoc(currentAttrStartIndex, currentAttrEndIndex) : getLoc(currentAttrStartIndex - 1, currentAttrEndIndex + 1)
          };
          if (tokenizer.inSFCRoot && currentOpenTag.tag === "template" && currentProp.name === "lang" && currentAttrValue && currentAttrValue !== "html") {
            tokenizer.enterRCDATA(toCharCodes(`</template`), 0);
          }
        } else {
          let expParseMode = 0 /* Normal */;
          {
            if (currentProp.name === "for") {
              expParseMode = 3 /* Skip */;
            } else if (currentProp.name === "slot") {
              expParseMode = 1 /* Params */;
            } else if (currentProp.name === "on" && currentAttrValue.includes(";")) {
              expParseMode = 2 /* Statements */;
            }
          }
          currentProp.exp = createExp(
            currentAttrValue,
            false,
            getLoc(currentAttrStartIndex, currentAttrEndIndex),
            0,
            expParseMode
          );
          if (currentProp.name === "for") {
            currentProp.forParseResult = parseForExpression(currentProp.exp);
          }
        }
      }
      if (currentProp.type !== 7 || currentProp.name !== "pre") {
        currentOpenTag.props.push(currentProp);
      }
    }
    currentAttrValue = "";
    currentAttrStartIndex = currentAttrEndIndex = -1;
  },
  oncomment(start, end) {
    if (currentOptions.comments) {
      addNode({
        type: 3,
        content: getSlice(start, end),
        loc: getLoc(start - 4, end + 3)
      });
    }
  },
  onend() {
    const end = currentInput.length;
    if (tokenizer.state !== 1) {
      switch (tokenizer.state) {
        case 5:
        case 8:
          emitError(5, end);
          break;
        case 3:
        case 4:
          emitError(
            25,
            tokenizer.sectionStart
          );
          break;
        case 28:
          if (tokenizer.currentSequence === Sequences.CdataEnd) {
            emitError(6, end);
          } else {
            emitError(7, end);
          }
          break;
        case 6:
        case 7:
        case 9:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        // "
        case 20:
        // '
        case 21:
          emitError(9, end);
          break;
      }
    }
    for (let index = 0; index < stack.length; index++) {
      onCloseTag(stack[index], end - 1);
      emitError(24, stack[index].loc.start.offset);
    }
  },
  oncdata(start, end) {
    if (stack[0].ns !== 0) {
      onText(getSlice(start, end), start, end);
    } else {
      emitError(1, start - 9);
    }
  },
  onprocessinginstruction(start) {
    if ((stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
      emitError(
        21,
        start - 1
      );
    }
  }
});
const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
const stripParensRE = /^\(|\)$/g;
function parseForExpression(input) {
  const loc = input.loc;
  const exp = input.content;
  const inMatch = exp.match(forAliasRE);
  if (!inMatch) return;
  const [, LHS, RHS] = inMatch;
  const createAliasExpression = (content, offset, asParam = false) => {
    const start = loc.start.offset + offset;
    const end = start + content.length;
    return createExp(
      content,
      false,
      getLoc(start, end),
      0,
      asParam ? 1 /* Params */ : 0 /* Normal */
    );
  };
  const result = {
    source: createAliasExpression(RHS.trim(), exp.indexOf(RHS, LHS.length)),
    value: void 0,
    key: void 0,
    index: void 0,
    finalized: false
  };
  let valueContent = LHS.trim().replace(stripParensRE, "").trim();
  const trimmedOffset = LHS.indexOf(valueContent);
  const iteratorMatch = valueContent.match(forIteratorRE);
  if (iteratorMatch) {
    valueContent = valueContent.replace(forIteratorRE, "").trim();
    const keyContent = iteratorMatch[1].trim();
    let keyOffset;
    if (keyContent) {
      keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
      result.key = createAliasExpression(keyContent, keyOffset, true);
    }
    if (iteratorMatch[2]) {
      const indexContent = iteratorMatch[2].trim();
      if (indexContent) {
        result.index = createAliasExpression(
          indexContent,
          exp.indexOf(
            indexContent,
            result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length
          ),
          true
        );
      }
    }
  }
  if (valueContent) {
    result.value = createAliasExpression(valueContent, trimmedOffset, true);
  }
  return result;
}
function getSlice(start, end) {
  return currentInput.slice(start, end);
}
function endOpenTag(end) {
  if (tokenizer.inSFCRoot) {
    currentOpenTag.innerLoc = getLoc(end + 1, end + 1);
  }
  addNode(currentOpenTag);
  const { tag, ns } = currentOpenTag;
  if (ns === 0 && currentOptions.isPreTag(tag)) {
    inPre++;
  }
  if (currentOptions.isVoidTag(tag)) {
    onCloseTag(currentOpenTag, end);
  } else {
    stack.unshift(currentOpenTag);
    if (ns === 1 || ns === 2) {
      tokenizer.inXML = true;
    }
  }
  currentOpenTag = null;
}
function onText(content, start, end) {
  const parent = stack[0] || currentRoot;
  const lastNode = parent.children[parent.children.length - 1];
  if (lastNode && lastNode.type === 2) {
    lastNode.content += content;
    setLocEnd(lastNode.loc, end);
  } else {
    parent.children.push({
      type: 2,
      content,
      loc: getLoc(start, end)
    });
  }
}
function onCloseTag(el, end, isImplied = false) {
  if (isImplied) {
    setLocEnd(el.loc, backTrack(end, 60));
  } else {
    setLocEnd(el.loc, lookAhead(end, 62) + 1);
  }
  if (tokenizer.inSFCRoot) {
    if (el.children.length) {
      el.innerLoc.end = extend({}, el.children[el.children.length - 1].loc.end);
    } else {
      el.innerLoc.end = extend({}, el.innerLoc.start);
    }
    el.innerLoc.source = getSlice(
      el.innerLoc.start.offset,
      el.innerLoc.end.offset
    );
  }
  const { tag, ns, children } = el;
  if (!inVPre) {
    if (tag === "slot") {
      el.tagType = 2;
    } else if (isFragmentTemplate(el)) {
      el.tagType = 3;
    } else if (isComponent(el)) {
      el.tagType = 1;
    }
  }
  if (!tokenizer.inRCDATA) {
    el.children = condenseWhitespace(children);
  }
  if (ns === 0 && currentOptions.isIgnoreNewlineTag(tag)) {
    const first = children[0];
    if (first && first.type === 2) {
      first.content = first.content.replace(/^\r?\n/, "");
    }
  }
  if (ns === 0 && currentOptions.isPreTag(tag)) {
    inPre--;
  }
  if (currentVPreBoundary === el) {
    inVPre = tokenizer.inVPre = false;
    currentVPreBoundary = null;
  }
  if (tokenizer.inXML && (stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
    tokenizer.inXML = false;
  }
}
function lookAhead(index, c) {
  let i = index;
  while (currentInput.charCodeAt(i) !== c && i < currentInput.length - 1) i++;
  return i;
}
function backTrack(index, c) {
  let i = index;
  while (currentInput.charCodeAt(i) !== c && i >= 0) i--;
  return i;
}
const specialTemplateDir = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
function isFragmentTemplate({ tag, props }) {
  if (tag === "template") {
    for (let i = 0; i < props.length; i++) {
      if (props[i].type === 7 && specialTemplateDir.has(props[i].name)) {
        return true;
      }
    }
  }
  return false;
}
function isComponent({ tag, props }) {
  if (currentOptions.isCustomElement(tag)) {
    return false;
  }
  if (tag === "component" || isUpperCase(tag.charCodeAt(0)) || isCoreComponent(tag) || currentOptions.isBuiltInComponent && currentOptions.isBuiltInComponent(tag) || currentOptions.isNativeTag && !currentOptions.isNativeTag(tag)) {
    return true;
  }
  for (let i = 0; i < props.length; i++) {
    const p = props[i];
    if (p.type === 6) {
      if (p.name === "is" && p.value) {
        if (p.value.content.startsWith("vue:")) {
          return true;
        }
      }
    }
  }
  return false;
}
function isUpperCase(c) {
  return c > 64 && c < 91;
}
const windowsNewlineRE = /\r\n/g;
function condenseWhitespace(nodes, tag) {
  const shouldCondense = currentOptions.whitespace !== "preserve";
  let removedWhitespace = false;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === 2) {
      if (!inPre) {
        if (isAllWhitespace(node.content)) {
          const prev = nodes[i - 1] && nodes[i - 1].type;
          const next = nodes[i + 1] && nodes[i + 1].type;
          if (!prev || !next || shouldCondense && (prev === 3 && (next === 3 || next === 1) || prev === 1 && (next === 3 || next === 1 && hasNewlineChar(node.content)))) {
            removedWhitespace = true;
            nodes[i] = null;
          } else {
            node.content = " ";
          }
        } else if (shouldCondense) {
          node.content = condense(node.content);
        }
      } else {
        node.content = node.content.replace(windowsNewlineRE, "\n");
      }
    }
  }
  return removedWhitespace ? nodes.filter(Boolean) : nodes;
}
function isAllWhitespace(str) {
  for (let i = 0; i < str.length; i++) {
    if (!isWhitespace(str.charCodeAt(i))) {
      return false;
    }
  }
  return true;
}
function hasNewlineChar(str) {
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c === 10 || c === 13) {
      return true;
    }
  }
  return false;
}
function condense(str) {
  let ret = "";
  let prevCharIsWhitespace = false;
  for (let i = 0; i < str.length; i++) {
    if (isWhitespace(str.charCodeAt(i))) {
      if (!prevCharIsWhitespace) {
        ret += " ";
        prevCharIsWhitespace = true;
      }
    } else {
      ret += str[i];
      prevCharIsWhitespace = false;
    }
  }
  return ret;
}
function addNode(node) {
  (stack[0] || currentRoot).children.push(node);
}
function getLoc(start, end) {
  return {
    start: tokenizer.getPos(start),
    // @ts-expect-error allow late attachment
    end: end == null ? end : tokenizer.getPos(end),
    // @ts-expect-error allow late attachment
    source: end == null ? end : getSlice(start, end)
  };
}
function setLocEnd(loc, end) {
  loc.end = tokenizer.getPos(end);
  loc.source = getSlice(loc.start.offset, end);
}
function dirToAttr(dir) {
  const attr = {
    type: 6,
    name: dir.rawName,
    nameLoc: getLoc(
      dir.loc.start.offset,
      dir.loc.start.offset + dir.rawName.length
    ),
    value: void 0,
    loc: dir.loc
  };
  if (dir.exp) {
    const loc = dir.exp.loc;
    if (loc.end.offset < dir.loc.end.offset) {
      loc.start.offset--;
      loc.start.column--;
      loc.end.offset++;
      loc.end.column++;
    }
    attr.value = {
      type: 2,
      content: dir.exp.content,
      loc
    };
  }
  return attr;
}
function createExp(content, isStatic = false, loc, constType = 0, parseMode = 0 /* Normal */) {
  const exp = createSimpleExpression(content, isStatic, loc, constType);
  if (!isStatic && currentOptions.prefixIdentifiers && parseMode !== 3 /* Skip */ && content.trim()) {
    if (isSimpleIdentifier(content)) {
      exp.ast = null;
      return exp;
    }
    try {
      const plugins = currentOptions.expressionPlugins;
      const options = {
        plugins: plugins ? [...plugins, "typescript"] : ["typescript"]
      };
      if (parseMode === 2 /* Statements */) {
        exp.ast = libExports.parse(` ${content} `, options).program;
      } else if (parseMode === 1 /* Params */) {
        exp.ast = libExports.parseExpression(`(${content})=>{}`, options);
      } else {
        exp.ast = libExports.parseExpression(`(${content})`, options);
      }
    } catch (e) {
      exp.ast = false;
      emitError(45, loc.start.offset, e.message);
    }
  }
  return exp;
}
function emitError(code, index, message) {
  currentOptions.onError(
    createCompilerError(code, getLoc(index, index), void 0, message)
  );
}
function reset() {
  tokenizer.reset();
  currentOpenTag = null;
  currentProp = null;
  currentAttrValue = "";
  currentAttrStartIndex = -1;
  currentAttrEndIndex = -1;
  stack.length = 0;
}
function baseParse(input, options) {
  reset();
  currentInput = input;
  currentOptions = extend({}, defaultParserOptions);
  if (options) {
    let key;
    for (key in options) {
      if (options[key] != null) {
        currentOptions[key] = options[key];
      }
    }
  }
  {
    if (currentOptions.decodeEntities) {
      console.warn(
        `[@vue/compiler-core] decodeEntities option is passed but will be ignored in non-browser builds.`
      );
    }
  }
  tokenizer.mode = currentOptions.parseMode === "html" ? 1 : currentOptions.parseMode === "sfc" ? 2 : 0;
  tokenizer.inXML = currentOptions.ns === 1 || currentOptions.ns === 2;
  const delimiters = options && options.delimiters;
  if (delimiters) {
    tokenizer.delimiterOpen = toCharCodes(delimiters[0]);
    tokenizer.delimiterClose = toCharCodes(delimiters[1]);
  }
  const root = currentRoot = createRoot([], input);
  tokenizer.parse(currentInput);
  root.loc = getLoc(0, input.length);
  root.children = condenseWhitespace(root.children);
  currentRoot = null;
  return root;
}

function getSelfName(filename) {
  const nameMatch = filename.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/);
  return nameMatch ? capitalize(camelize(nameMatch[1])) : null;
}

var sourceMap = {};

var sourceMapGenerator = {};

var base64Vlq = {};

var base64 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBase64;

function requireBase64 () {
	if (hasRequiredBase64) return base64;
	hasRequiredBase64 = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	/**
	 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	 */
	base64.encode = function (number) {
	  if (0 <= number && number < intToCharMap.length) {
	    return intToCharMap[number];
	  }
	  throw new TypeError("Must be between 0 and 63: " + number);
	};

	/**
	 * Decode a single base 64 character code digit to an integer. Returns -1 on
	 * failure.
	 */
	base64.decode = function (charCode) {
	  var bigA = 65;     // 'A'
	  var bigZ = 90;     // 'Z'

	  var littleA = 97;  // 'a'
	  var littleZ = 122; // 'z'

	  var zero = 48;     // '0'
	  var nine = 57;     // '9'

	  var plus = 43;     // '+'
	  var slash = 47;    // '/'

	  var littleOffset = 26;
	  var numberOffset = 52;

	  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
	  if (bigA <= charCode && charCode <= bigZ) {
	    return (charCode - bigA);
	  }

	  // 26 - 51: abcdefghijklmnopqrstuvwxyz
	  if (littleA <= charCode && charCode <= littleZ) {
	    return (charCode - littleA + littleOffset);
	  }

	  // 52 - 61: 0123456789
	  if (zero <= charCode && charCode <= nine) {
	    return (charCode - zero + numberOffset);
	  }

	  // 62: +
	  if (charCode == plus) {
	    return 62;
	  }

	  // 63: /
	  if (charCode == slash) {
	    return 63;
	  }

	  // Invalid base64 digit.
	  return -1;
	};
	return base64;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBase64Vlq;

function requireBase64Vlq () {
	if (hasRequiredBase64Vlq) return base64Vlq;
	hasRequiredBase64Vlq = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	var base64 = /*@__PURE__*/ requireBase64();

	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	var VLQ_BASE_SHIFT = 5;

	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	 * Converts from a two-complement value to a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	 */
	function toVLQSigned(aValue) {
	  return aValue < 0
	    ? ((-aValue) << 1) + 1
	    : (aValue << 1) + 0;
	}

	/**
	 * Converts to a two-complement value from a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	 */
	function fromVLQSigned(aValue) {
	  var isNegative = (aValue & 1) === 1;
	  var shifted = aValue >> 1;
	  return isNegative
	    ? -shifted
	    : shifted;
	}

	/**
	 * Returns the base 64 VLQ encoded value.
	 */
	base64Vlq.encode = function base64VLQ_encode(aValue) {
	  var encoded = "";
	  var digit;

	  var vlq = toVLQSigned(aValue);

	  do {
	    digit = vlq & VLQ_BASE_MASK;
	    vlq >>>= VLQ_BASE_SHIFT;
	    if (vlq > 0) {
	      // There are still more digits in this value, so we must make sure the
	      // continuation bit is marked.
	      digit |= VLQ_CONTINUATION_BIT;
	    }
	    encoded += base64.encode(digit);
	  } while (vlq > 0);

	  return encoded;
	};

	/**
	 * Decodes the next base 64 VLQ value from the given string and returns the
	 * value and the rest of the string via the out parameter.
	 */
	base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
	  var strLen = aStr.length;
	  var result = 0;
	  var shift = 0;
	  var continuation, digit;

	  do {
	    if (aIndex >= strLen) {
	      throw new Error("Expected more digits in base 64 VLQ value.");
	    }

	    digit = base64.decode(aStr.charCodeAt(aIndex++));
	    if (digit === -1) {
	      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
	    }

	    continuation = !!(digit & VLQ_CONTINUATION_BIT);
	    digit &= VLQ_BASE_MASK;
	    result = result + (digit << shift);
	    shift += VLQ_BASE_SHIFT;
	  } while (continuation);

	  aOutParam.value = fromVLQSigned(result);
	  aOutParam.rest = aIndex;
	};
	return base64Vlq;
}

var util = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	(function (exports) {
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		/**
		 * This is a helper function for getting values from parameter/options
		 * objects.
		 *
		 * @param args The object we are extracting values from
		 * @param name The name of the property we are getting.
		 * @param defaultValue An optional value to return if the property is missing
		 * from the object. If this is not specified and the property is missing, an
		 * error will be thrown.
		 */
		function getArg(aArgs, aName, aDefaultValue) {
		  if (aName in aArgs) {
		    return aArgs[aName];
		  } else if (arguments.length === 3) {
		    return aDefaultValue;
		  } else {
		    throw new Error('"' + aName + '" is a required argument.');
		  }
		}
		exports.getArg = getArg;

		var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
		var dataUrlRegexp = /^data:.+\,.+$/;

		function urlParse(aUrl) {
		  var match = aUrl.match(urlRegexp);
		  if (!match) {
		    return null;
		  }
		  return {
		    scheme: match[1],
		    auth: match[2],
		    host: match[3],
		    port: match[4],
		    path: match[5]
		  };
		}
		exports.urlParse = urlParse;

		function urlGenerate(aParsedUrl) {
		  var url = '';
		  if (aParsedUrl.scheme) {
		    url += aParsedUrl.scheme + ':';
		  }
		  url += '//';
		  if (aParsedUrl.auth) {
		    url += aParsedUrl.auth + '@';
		  }
		  if (aParsedUrl.host) {
		    url += aParsedUrl.host;
		  }
		  if (aParsedUrl.port) {
		    url += ":" + aParsedUrl.port;
		  }
		  if (aParsedUrl.path) {
		    url += aParsedUrl.path;
		  }
		  return url;
		}
		exports.urlGenerate = urlGenerate;

		var MAX_CACHED_INPUTS = 32;

		/**
		 * Takes some function `f(input) -> result` and returns a memoized version of
		 * `f`.
		 *
		 * We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
		 * memoization is a dumb-simple, linear least-recently-used cache.
		 */
		function lruMemoize(f) {
		  var cache = [];

		  return function(input) {
		    for (var i = 0; i < cache.length; i++) {
		      if (cache[i].input === input) {
		        var temp = cache[0];
		        cache[0] = cache[i];
		        cache[i] = temp;
		        return cache[0].result;
		      }
		    }

		    var result = f(input);

		    cache.unshift({
		      input,
		      result,
		    });

		    if (cache.length > MAX_CACHED_INPUTS) {
		      cache.pop();
		    }

		    return result;
		  };
		}

		/**
		 * Normalizes a path, or the path portion of a URL:
		 *
		 * - Replaces consecutive slashes with one slash.
		 * - Removes unnecessary '.' parts.
		 * - Removes unnecessary '<dir>/..' parts.
		 *
		 * Based on code in the Node.js 'path' core module.
		 *
		 * @param aPath The path or url to normalize.
		 */
		var normalize = lruMemoize(function normalize(aPath) {
		  var path = aPath;
		  var url = urlParse(aPath);
		  if (url) {
		    if (!url.path) {
		      return aPath;
		    }
		    path = url.path;
		  }
		  var isAbsolute = exports.isAbsolute(path);
		  // Split the path into parts between `/` characters. This is much faster than
		  // using `.split(/\/+/g)`.
		  var parts = [];
		  var start = 0;
		  var i = 0;
		  while (true) {
		    start = i;
		    i = path.indexOf("/", start);
		    if (i === -1) {
		      parts.push(path.slice(start));
		      break;
		    } else {
		      parts.push(path.slice(start, i));
		      while (i < path.length && path[i] === "/") {
		        i++;
		      }
		    }
		  }

		  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
		    part = parts[i];
		    if (part === '.') {
		      parts.splice(i, 1);
		    } else if (part === '..') {
		      up++;
		    } else if (up > 0) {
		      if (part === '') {
		        // The first part is blank if the path is absolute. Trying to go
		        // above the root is a no-op. Therefore we can remove all '..' parts
		        // directly after the root.
		        parts.splice(i + 1, up);
		        up = 0;
		      } else {
		        parts.splice(i, 2);
		        up--;
		      }
		    }
		  }
		  path = parts.join('/');

		  if (path === '') {
		    path = isAbsolute ? '/' : '.';
		  }

		  if (url) {
		    url.path = path;
		    return urlGenerate(url);
		  }
		  return path;
		});
		exports.normalize = normalize;

		/**
		 * Joins two paths/URLs.
		 *
		 * @param aRoot The root path or URL.
		 * @param aPath The path or URL to be joined with the root.
		 *
		 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
		 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
		 *   first.
		 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
		 *   is updated with the result and aRoot is returned. Otherwise the result
		 *   is returned.
		 *   - If aPath is absolute, the result is aPath.
		 *   - Otherwise the two paths are joined with a slash.
		 * - Joining for example 'http://' and 'www.example.com' is also supported.
		 */
		function join(aRoot, aPath) {
		  if (aRoot === "") {
		    aRoot = ".";
		  }
		  if (aPath === "") {
		    aPath = ".";
		  }
		  var aPathUrl = urlParse(aPath);
		  var aRootUrl = urlParse(aRoot);
		  if (aRootUrl) {
		    aRoot = aRootUrl.path || '/';
		  }

		  // `join(foo, '//www.example.org')`
		  if (aPathUrl && !aPathUrl.scheme) {
		    if (aRootUrl) {
		      aPathUrl.scheme = aRootUrl.scheme;
		    }
		    return urlGenerate(aPathUrl);
		  }

		  if (aPathUrl || aPath.match(dataUrlRegexp)) {
		    return aPath;
		  }

		  // `join('http://', 'www.example.com')`
		  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
		    aRootUrl.host = aPath;
		    return urlGenerate(aRootUrl);
		  }

		  var joined = aPath.charAt(0) === '/'
		    ? aPath
		    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

		  if (aRootUrl) {
		    aRootUrl.path = joined;
		    return urlGenerate(aRootUrl);
		  }
		  return joined;
		}
		exports.join = join;

		exports.isAbsolute = function (aPath) {
		  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
		};

		/**
		 * Make a path relative to a URL or another path.
		 *
		 * @param aRoot The root path or URL.
		 * @param aPath The path or URL to be made relative to aRoot.
		 */
		function relative(aRoot, aPath) {
		  if (aRoot === "") {
		    aRoot = ".";
		  }

		  aRoot = aRoot.replace(/\/$/, '');

		  // It is possible for the path to be above the root. In this case, simply
		  // checking whether the root is a prefix of the path won't work. Instead, we
		  // need to remove components from the root one by one, until either we find
		  // a prefix that fits, or we run out of components to remove.
		  var level = 0;
		  while (aPath.indexOf(aRoot + '/') !== 0) {
		    var index = aRoot.lastIndexOf("/");
		    if (index < 0) {
		      return aPath;
		    }

		    // If the only part of the root that is left is the scheme (i.e. http://,
		    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
		    // have exhausted all components, so the path is not relative to the root.
		    aRoot = aRoot.slice(0, index);
		    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
		      return aPath;
		    }

		    ++level;
		  }

		  // Make sure we add a "../" for each component we removed from the root.
		  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
		}
		exports.relative = relative;

		var supportsNullProto = (function () {
		  var obj = Object.create(null);
		  return !('__proto__' in obj);
		}());

		function identity (s) {
		  return s;
		}

		/**
		 * Because behavior goes wacky when you set `__proto__` on objects, we
		 * have to prefix all the strings in our set with an arbitrary character.
		 *
		 * See https://github.com/mozilla/source-map/pull/31 and
		 * https://github.com/mozilla/source-map/issues/30
		 *
		 * @param String aStr
		 */
		function toSetString(aStr) {
		  if (isProtoString(aStr)) {
		    return '$' + aStr;
		  }

		  return aStr;
		}
		exports.toSetString = supportsNullProto ? identity : toSetString;

		function fromSetString(aStr) {
		  if (isProtoString(aStr)) {
		    return aStr.slice(1);
		  }

		  return aStr;
		}
		exports.fromSetString = supportsNullProto ? identity : fromSetString;

		function isProtoString(s) {
		  if (!s) {
		    return false;
		  }

		  var length = s.length;

		  if (length < 9 /* "__proto__".length */) {
		    return false;
		  }

		  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
		      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
		      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
		      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
		      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
		      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
		      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
		      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
		      s.charCodeAt(length - 9) !== 95  /* '_' */) {
		    return false;
		  }

		  for (var i = length - 10; i >= 0; i--) {
		    if (s.charCodeAt(i) !== 36 /* '$' */) {
		      return false;
		    }
		  }

		  return true;
		}

		/**
		 * Comparator between two mappings where the original positions are compared.
		 *
		 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
		 * mappings with the same original source/line/column, but different generated
		 * line and column the same. Useful when searching for a mapping with a
		 * stubbed out mapping.
		 */
		function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		  var cmp = strcmp(mappingA.source, mappingB.source);
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0 || onlyCompareOriginal) {
		    return cmp;
		  }

		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.generatedLine - mappingB.generatedLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports.compareByOriginalPositions = compareByOriginalPositions;

		function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
		  var cmp;

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0 || onlyCompareOriginal) {
		    return cmp;
		  }

		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.generatedLine - mappingB.generatedLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;

		/**
		 * Comparator between two mappings with deflated source and name indices where
		 * the generated positions are compared.
		 *
		 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
		 * mappings with the same generated line and column, but different
		 * source/name/original line and column the same. Useful when searching for a
		 * mapping with a stubbed out mapping.
		 */
		function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		  var cmp = mappingA.generatedLine - mappingB.generatedLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0 || onlyCompareGenerated) {
		    return cmp;
		  }

		  cmp = strcmp(mappingA.source, mappingB.source);
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

		function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
		  var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0 || onlyCompareGenerated) {
		    return cmp;
		  }

		  cmp = strcmp(mappingA.source, mappingB.source);
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;

		function strcmp(aStr1, aStr2) {
		  if (aStr1 === aStr2) {
		    return 0;
		  }

		  if (aStr1 === null) {
		    return 1; // aStr2 !== null
		  }

		  if (aStr2 === null) {
		    return -1; // aStr1 !== null
		  }

		  if (aStr1 > aStr2) {
		    return 1;
		  }

		  return -1;
		}

		/**
		 * Comparator between two mappings with inflated source and name strings where
		 * the generated positions are compared.
		 */
		function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		  var cmp = mappingA.generatedLine - mappingB.generatedLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = strcmp(mappingA.source, mappingB.source);
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalLine - mappingB.originalLine;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  cmp = mappingA.originalColumn - mappingB.originalColumn;
		  if (cmp !== 0) {
		    return cmp;
		  }

		  return strcmp(mappingA.name, mappingB.name);
		}
		exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

		/**
		 * Strip any JSON XSSI avoidance prefix from the string (as documented
		 * in the source maps specification), and then parse the string as
		 * JSON.
		 */
		function parseSourceMapInput(str) {
		  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
		}
		exports.parseSourceMapInput = parseSourceMapInput;

		/**
		 * Compute the URL of a source given the the source root, the source's
		 * URL, and the source map's URL.
		 */
		function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		  sourceURL = sourceURL || '';

		  if (sourceRoot) {
		    // This follows what Chrome does.
		    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
		      sourceRoot += '/';
		    }
		    // The spec says:
		    //   Line 4: An optional source root, useful for relocating source
		    //   files on a server or removing repeated values in the
		    //   “sources” entry.  This value is prepended to the individual
		    //   entries in the “source” field.
		    sourceURL = sourceRoot + sourceURL;
		  }

		  // Historically, SourceMapConsumer did not take the sourceMapURL as
		  // a parameter.  This mode is still somewhat supported, which is why
		  // this code block is conditional.  However, it's preferable to pass
		  // the source map URL to SourceMapConsumer, so that this function
		  // can implement the source URL resolution algorithm as outlined in
		  // the spec.  This block is basically the equivalent of:
		  //    new URL(sourceURL, sourceMapURL).toString()
		  // ... except it avoids using URL, which wasn't available in the
		  // older releases of node still supported by this library.
		  //
		  // The spec says:
		  //   If the sources are not absolute URLs after prepending of the
		  //   “sourceRoot”, the sources are resolved relative to the
		  //   SourceMap (like resolving script src in a html document).
		  if (sourceMapURL) {
		    var parsed = urlParse(sourceMapURL);
		    if (!parsed) {
		      throw new Error("sourceMapURL could not be parsed");
		    }
		    if (parsed.path) {
		      // Strip the last path component, but keep the "/".
		      var index = parsed.path.lastIndexOf('/');
		      if (index >= 0) {
		        parsed.path = parsed.path.substring(0, index + 1);
		      }
		    }
		    sourceURL = join(urlGenerate(parsed), sourceURL);
		  }

		  return normalize(sourceURL);
		}
		exports.computeSourceURL = computeSourceURL; 
	} (util));
	return util;
}

var arraySet = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredArraySet;

function requireArraySet () {
	if (hasRequiredArraySet) return arraySet;
	hasRequiredArraySet = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = /*@__PURE__*/ requireUtil();
	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";

	/**
	 * A data structure which is a combination of an array and a set. Adding a new
	 * member is O(1), testing for membership is O(1), and finding the index of an
	 * element is O(1). Removing elements from the set is not supported. Only
	 * strings are supported for membership.
	 */
	function ArraySet() {
	  this._array = [];
	  this._set = hasNativeMap ? new Map() : Object.create(null);
	}

	/**
	 * Static method for creating ArraySet instances from an existing array.
	 */
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
	  var set = new ArraySet();
	  for (var i = 0, len = aArray.length; i < len; i++) {
	    set.add(aArray[i], aAllowDuplicates);
	  }
	  return set;
	};

	/**
	 * Return how many unique items are in this ArraySet. If duplicates have been
	 * added, than those do not count towards the size.
	 *
	 * @returns Number
	 */
	ArraySet.prototype.size = function ArraySet_size() {
	  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};

	/**
	 * Add the given string to this set.
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
	  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
	  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
	  var idx = this._array.length;
	  if (!isDuplicate || aAllowDuplicates) {
	    this._array.push(aStr);
	  }
	  if (!isDuplicate) {
	    if (hasNativeMap) {
	      this._set.set(aStr, idx);
	    } else {
	      this._set[sStr] = idx;
	    }
	  }
	};

	/**
	 * Is the given string a member of this set?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.has = function ArraySet_has(aStr) {
	  if (hasNativeMap) {
	    return this._set.has(aStr);
	  } else {
	    var sStr = util.toSetString(aStr);
	    return has.call(this._set, sStr);
	  }
	};

	/**
	 * What is the index of the given string in the array?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
	  if (hasNativeMap) {
	    var idx = this._set.get(aStr);
	    if (idx >= 0) {
	        return idx;
	    }
	  } else {
	    var sStr = util.toSetString(aStr);
	    if (has.call(this._set, sStr)) {
	      return this._set[sStr];
	    }
	  }

	  throw new Error('"' + aStr + '" is not in the set.');
	};

	/**
	 * What is the element at the given index?
	 *
	 * @param Number aIdx
	 */
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
	  if (aIdx >= 0 && aIdx < this._array.length) {
	    return this._array[aIdx];
	  }
	  throw new Error('No element indexed by ' + aIdx);
	};

	/**
	 * Returns the array representation of this set (which has the proper indices
	 * indicated by indexOf). Note that this is a copy of the internal array used
	 * for storing the members so that no one can mess with internal state.
	 */
	ArraySet.prototype.toArray = function ArraySet_toArray() {
	  return this._array.slice();
	};

	arraySet.ArraySet = ArraySet;
	return arraySet;
}

var mappingList = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredMappingList;

function requireMappingList () {
	if (hasRequiredMappingList) return mappingList;
	hasRequiredMappingList = 1;
	/*
	 * Copyright 2014 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = /*@__PURE__*/ requireUtil();

	/**
	 * Determine whether mappingB is after mappingA with respect to generated
	 * position.
	 */
	function generatedPositionAfter(mappingA, mappingB) {
	  // Optimized for most common case
	  var lineA = mappingA.generatedLine;
	  var lineB = mappingB.generatedLine;
	  var columnA = mappingA.generatedColumn;
	  var columnB = mappingB.generatedColumn;
	  return lineB > lineA || lineB == lineA && columnB >= columnA ||
	         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}

	/**
	 * A data structure to provide a sorted view of accumulated mappings in a
	 * performance conscious manner. It trades a neglibable overhead in general
	 * case for a large speedup in case of mappings being added in order.
	 */
	function MappingList() {
	  this._array = [];
	  this._sorted = true;
	  // Serves as infimum
	  this._last = {generatedLine: -1, generatedColumn: 0};
	}

	/**
	 * Iterate through internal items. This method takes the same arguments that
	 * `Array.prototype.forEach` takes.
	 *
	 * NOTE: The order of the mappings is NOT guaranteed.
	 */
	MappingList.prototype.unsortedForEach =
	  function MappingList_forEach(aCallback, aThisArg) {
	    this._array.forEach(aCallback, aThisArg);
	  };

	/**
	 * Add the given source mapping.
	 *
	 * @param Object aMapping
	 */
	MappingList.prototype.add = function MappingList_add(aMapping) {
	  if (generatedPositionAfter(this._last, aMapping)) {
	    this._last = aMapping;
	    this._array.push(aMapping);
	  } else {
	    this._sorted = false;
	    this._array.push(aMapping);
	  }
	};

	/**
	 * Returns the flat, sorted array of mappings. The mappings are sorted by
	 * generated position.
	 *
	 * WARNING: This method returns internal data without copying, for
	 * performance. The return value must NOT be mutated, and should be treated as
	 * an immutable borrow. If you want to take ownership, you must make your own
	 * copy.
	 */
	MappingList.prototype.toArray = function MappingList_toArray() {
	  if (!this._sorted) {
	    this._array.sort(util.compareByGeneratedPositionsInflated);
	    this._sorted = true;
	  }
	  return this._array;
	};

	mappingList.MappingList = MappingList;
	return mappingList;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceMapGenerator;

function requireSourceMapGenerator () {
	if (hasRequiredSourceMapGenerator) return sourceMapGenerator;
	hasRequiredSourceMapGenerator = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var base64VLQ = /*@__PURE__*/ requireBase64Vlq();
	var util = /*@__PURE__*/ requireUtil();
	var ArraySet = /*@__PURE__*/ requireArraySet().ArraySet;
	var MappingList = /*@__PURE__*/ requireMappingList().MappingList;

	/**
	 * An instance of the SourceMapGenerator represents a source map which is
	 * being built incrementally. You may pass an object with the following
	 * properties:
	 *
	 *   - file: The filename of the generated source.
	 *   - sourceRoot: A root for all relative URLs in this source map.
	 */
	function SourceMapGenerator(aArgs) {
	  if (!aArgs) {
	    aArgs = {};
	  }
	  this._file = util.getArg(aArgs, 'file', null);
	  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
	  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
	  this._ignoreInvalidMapping = util.getArg(aArgs, 'ignoreInvalidMapping', false);
	  this._sources = new ArraySet();
	  this._names = new ArraySet();
	  this._mappings = new MappingList();
	  this._sourcesContents = null;
	}

	SourceMapGenerator.prototype._version = 3;

	/**
	 * Creates a new SourceMapGenerator based on a SourceMapConsumer
	 *
	 * @param aSourceMapConsumer The SourceMap.
	 */
	SourceMapGenerator.fromSourceMap =
	  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
	    var sourceRoot = aSourceMapConsumer.sourceRoot;
	    var generator = new SourceMapGenerator(Object.assign(generatorOps || {}, {
	      file: aSourceMapConsumer.file,
	      sourceRoot: sourceRoot
	    }));
	    aSourceMapConsumer.eachMapping(function (mapping) {
	      var newMapping = {
	        generated: {
	          line: mapping.generatedLine,
	          column: mapping.generatedColumn
	        }
	      };

	      if (mapping.source != null) {
	        newMapping.source = mapping.source;
	        if (sourceRoot != null) {
	          newMapping.source = util.relative(sourceRoot, newMapping.source);
	        }

	        newMapping.original = {
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        };

	        if (mapping.name != null) {
	          newMapping.name = mapping.name;
	        }
	      }

	      generator.addMapping(newMapping);
	    });
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var sourceRelative = sourceFile;
	      if (sourceRoot !== null) {
	        sourceRelative = util.relative(sourceRoot, sourceFile);
	      }

	      if (!generator._sources.has(sourceRelative)) {
	        generator._sources.add(sourceRelative);
	      }

	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        generator.setSourceContent(sourceFile, content);
	      }
	    });
	    return generator;
	  };

	/**
	 * Add a single mapping from original source line and column to the generated
	 * source's line and column for this source map being created. The mapping
	 * object should have the following properties:
	 *
	 *   - generated: An object with the generated line and column positions.
	 *   - original: An object with the original line and column positions.
	 *   - source: The original source file (relative to the sourceRoot).
	 *   - name: An optional original token name for this mapping.
	 */
	SourceMapGenerator.prototype.addMapping =
	  function SourceMapGenerator_addMapping(aArgs) {
	    var generated = util.getArg(aArgs, 'generated');
	    var original = util.getArg(aArgs, 'original', null);
	    var source = util.getArg(aArgs, 'source', null);
	    var name = util.getArg(aArgs, 'name', null);

	    if (!this._skipValidation) {
	      if (this._validateMapping(generated, original, source, name) === false) {
	        return;
	      }
	    }

	    if (source != null) {
	      source = String(source);
	      if (!this._sources.has(source)) {
	        this._sources.add(source);
	      }
	    }

	    if (name != null) {
	      name = String(name);
	      if (!this._names.has(name)) {
	        this._names.add(name);
	      }
	    }

	    this._mappings.add({
	      generatedLine: generated.line,
	      generatedColumn: generated.column,
	      originalLine: original != null && original.line,
	      originalColumn: original != null && original.column,
	      source: source,
	      name: name
	    });
	  };

	/**
	 * Set the source content for a source file.
	 */
	SourceMapGenerator.prototype.setSourceContent =
	  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
	    var source = aSourceFile;
	    if (this._sourceRoot != null) {
	      source = util.relative(this._sourceRoot, source);
	    }

	    if (aSourceContent != null) {
	      // Add the source content to the _sourcesContents map.
	      // Create a new _sourcesContents map if the property is null.
	      if (!this._sourcesContents) {
	        this._sourcesContents = Object.create(null);
	      }
	      this._sourcesContents[util.toSetString(source)] = aSourceContent;
	    } else if (this._sourcesContents) {
	      // Remove the source file from the _sourcesContents map.
	      // If the _sourcesContents map is empty, set the property to null.
	      delete this._sourcesContents[util.toSetString(source)];
	      if (Object.keys(this._sourcesContents).length === 0) {
	        this._sourcesContents = null;
	      }
	    }
	  };

	/**
	 * Applies the mappings of a sub-source-map for a specific source file to the
	 * source map being generated. Each mapping to the supplied source file is
	 * rewritten using the supplied source map. Note: The resolution for the
	 * resulting mappings is the minimium of this map and the supplied map.
	 *
	 * @param aSourceMapConsumer The source map to be applied.
	 * @param aSourceFile Optional. The filename of the source file.
	 *        If omitted, SourceMapConsumer's file property will be used.
	 * @param aSourceMapPath Optional. The dirname of the path to the source map
	 *        to be applied. If relative, it is relative to the SourceMapConsumer.
	 *        This parameter is needed when the two source maps aren't in the same
	 *        directory, and the source map to be applied contains relative source
	 *        paths. If so, those relative source paths need to be rewritten
	 *        relative to the SourceMapGenerator.
	 */
	SourceMapGenerator.prototype.applySourceMap =
	  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
	    var sourceFile = aSourceFile;
	    // If aSourceFile is omitted, we will use the file property of the SourceMap
	    if (aSourceFile == null) {
	      if (aSourceMapConsumer.file == null) {
	        throw new Error(
	          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
	          'or the source map\'s "file" property. Both were omitted.'
	        );
	      }
	      sourceFile = aSourceMapConsumer.file;
	    }
	    var sourceRoot = this._sourceRoot;
	    // Make "sourceFile" relative if an absolute Url is passed.
	    if (sourceRoot != null) {
	      sourceFile = util.relative(sourceRoot, sourceFile);
	    }
	    // Applying the SourceMap can add and remove items from the sources and
	    // the names array.
	    var newSources = new ArraySet();
	    var newNames = new ArraySet();

	    // Find mappings for the "sourceFile"
	    this._mappings.unsortedForEach(function (mapping) {
	      if (mapping.source === sourceFile && mapping.originalLine != null) {
	        // Check if it can be mapped by the source map, then update the mapping.
	        var original = aSourceMapConsumer.originalPositionFor({
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        });
	        if (original.source != null) {
	          // Copy mapping
	          mapping.source = original.source;
	          if (aSourceMapPath != null) {
	            mapping.source = util.join(aSourceMapPath, mapping.source);
	          }
	          if (sourceRoot != null) {
	            mapping.source = util.relative(sourceRoot, mapping.source);
	          }
	          mapping.originalLine = original.line;
	          mapping.originalColumn = original.column;
	          if (original.name != null) {
	            mapping.name = original.name;
	          }
	        }
	      }

	      var source = mapping.source;
	      if (source != null && !newSources.has(source)) {
	        newSources.add(source);
	      }

	      var name = mapping.name;
	      if (name != null && !newNames.has(name)) {
	        newNames.add(name);
	      }

	    }, this);
	    this._sources = newSources;
	    this._names = newNames;

	    // Copy sourcesContents of applied map.
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aSourceMapPath != null) {
	          sourceFile = util.join(aSourceMapPath, sourceFile);
	        }
	        if (sourceRoot != null) {
	          sourceFile = util.relative(sourceRoot, sourceFile);
	        }
	        this.setSourceContent(sourceFile, content);
	      }
	    }, this);
	  };

	/**
	 * A mapping can have one of the three levels of data:
	 *
	 *   1. Just the generated position.
	 *   2. The Generated position, original position, and original source.
	 *   3. Generated and original position, original source, as well as a name
	 *      token.
	 *
	 * To maintain consistency, we validate that any new mapping being added falls
	 * in to one of these categories.
	 */
	SourceMapGenerator.prototype._validateMapping =
	  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
	                                              aName) {
	    // When aOriginal is truthy but has empty values for .line and .column,
	    // it is most likely a programmer error. In this case we throw a very
	    // specific error message to try to guide them the right way.
	    // For example: https://github.com/Polymer/polymer-bundler/pull/519
	    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
	      var message = 'original.line and original.column are not numbers -- you probably meant to omit ' +
	      'the original mapping entirely and only map the generated position. If so, pass ' +
	      'null for the original mapping instead of an object with empty or null values.';

	      if (this._ignoreInvalidMapping) {
	        if (typeof console !== 'undefined' && console.warn) {
	          console.warn(message);
	        }
	        return false;
	      } else {
	        throw new Error(message);
	      }
	    }

	    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	        && aGenerated.line > 0 && aGenerated.column >= 0
	        && !aOriginal && !aSource && !aName) {
	      // Case 1.
	      return;
	    }
	    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
	             && aGenerated.line > 0 && aGenerated.column >= 0
	             && aOriginal.line > 0 && aOriginal.column >= 0
	             && aSource) {
	      // Cases 2 and 3.
	      return;
	    }
	    else {
	      var message = 'Invalid mapping: ' + JSON.stringify({
	        generated: aGenerated,
	        source: aSource,
	        original: aOriginal,
	        name: aName
	      });

	      if (this._ignoreInvalidMapping) {
	        if (typeof console !== 'undefined' && console.warn) {
	          console.warn(message);
	        }
	        return false;
	      } else {
	        throw new Error(message)
	      }
	    }
	  };

	/**
	 * Serialize the accumulated mappings in to the stream of base 64 VLQs
	 * specified by the source map format.
	 */
	SourceMapGenerator.prototype._serializeMappings =
	  function SourceMapGenerator_serializeMappings() {
	    var previousGeneratedColumn = 0;
	    var previousGeneratedLine = 1;
	    var previousOriginalColumn = 0;
	    var previousOriginalLine = 0;
	    var previousName = 0;
	    var previousSource = 0;
	    var result = '';
	    var next;
	    var mapping;
	    var nameIdx;
	    var sourceIdx;

	    var mappings = this._mappings.toArray();
	    for (var i = 0, len = mappings.length; i < len; i++) {
	      mapping = mappings[i];
	      next = '';

	      if (mapping.generatedLine !== previousGeneratedLine) {
	        previousGeneratedColumn = 0;
	        while (mapping.generatedLine !== previousGeneratedLine) {
	          next += ';';
	          previousGeneratedLine++;
	        }
	      }
	      else {
	        if (i > 0) {
	          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
	            continue;
	          }
	          next += ',';
	        }
	      }

	      next += base64VLQ.encode(mapping.generatedColumn
	                                 - previousGeneratedColumn);
	      previousGeneratedColumn = mapping.generatedColumn;

	      if (mapping.source != null) {
	        sourceIdx = this._sources.indexOf(mapping.source);
	        next += base64VLQ.encode(sourceIdx - previousSource);
	        previousSource = sourceIdx;

	        // lines are stored 0-based in SourceMap spec version 3
	        next += base64VLQ.encode(mapping.originalLine - 1
	                                   - previousOriginalLine);
	        previousOriginalLine = mapping.originalLine - 1;

	        next += base64VLQ.encode(mapping.originalColumn
	                                   - previousOriginalColumn);
	        previousOriginalColumn = mapping.originalColumn;

	        if (mapping.name != null) {
	          nameIdx = this._names.indexOf(mapping.name);
	          next += base64VLQ.encode(nameIdx - previousName);
	          previousName = nameIdx;
	        }
	      }

	      result += next;
	    }

	    return result;
	  };

	SourceMapGenerator.prototype._generateSourcesContent =
	  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
	    return aSources.map(function (source) {
	      if (!this._sourcesContents) {
	        return null;
	      }
	      if (aSourceRoot != null) {
	        source = util.relative(aSourceRoot, source);
	      }
	      var key = util.toSetString(source);
	      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
	        ? this._sourcesContents[key]
	        : null;
	    }, this);
	  };

	/**
	 * Externalize the source map.
	 */
	SourceMapGenerator.prototype.toJSON =
	  function SourceMapGenerator_toJSON() {
	    var map = {
	      version: this._version,
	      sources: this._sources.toArray(),
	      names: this._names.toArray(),
	      mappings: this._serializeMappings()
	    };
	    if (this._file != null) {
	      map.file = this._file;
	    }
	    if (this._sourceRoot != null) {
	      map.sourceRoot = this._sourceRoot;
	    }
	    if (this._sourcesContents) {
	      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
	    }

	    return map;
	  };

	/**
	 * Render the source map being generated to a string.
	 */
	SourceMapGenerator.prototype.toString =
	  function SourceMapGenerator_toString() {
	    return JSON.stringify(this.toJSON());
	  };

	sourceMapGenerator.SourceMapGenerator = SourceMapGenerator;
	return sourceMapGenerator;
}

var sourceMapConsumer = {};

var binarySearch = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredBinarySearch;

function requireBinarySearch () {
	if (hasRequiredBinarySearch) return binarySearch;
	hasRequiredBinarySearch = 1;
	(function (exports) {
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		exports.GREATEST_LOWER_BOUND = 1;
		exports.LEAST_UPPER_BOUND = 2;

		/**
		 * Recursive implementation of binary search.
		 *
		 * @param aLow Indices here and lower do not contain the needle.
		 * @param aHigh Indices here and higher do not contain the needle.
		 * @param aNeedle The element being searched for.
		 * @param aHaystack The non-empty array being searched.
		 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
		 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
		 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
		 *     closest element that is smaller than or greater than the one we are
		 *     searching for, respectively, if the exact element cannot be found.
		 */
		function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		  // This function terminates when one of the following is true:
		  //
		  //   1. We find the exact element we are looking for.
		  //
		  //   2. We did not find the exact element, but we can return the index of
		  //      the next-closest element.
		  //
		  //   3. We did not find the exact element, and there is no next-closest
		  //      element than the one we are searching for, so we return -1.
		  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		  var cmp = aCompare(aNeedle, aHaystack[mid], true);
		  if (cmp === 0) {
		    // Found the element we are looking for.
		    return mid;
		  }
		  else if (cmp > 0) {
		    // Our needle is greater than aHaystack[mid].
		    if (aHigh - mid > 1) {
		      // The element is in the upper half.
		      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
		    }

		    // The exact needle element was not found in this haystack. Determine if
		    // we are in termination case (3) or (2) and return the appropriate thing.
		    if (aBias == exports.LEAST_UPPER_BOUND) {
		      return aHigh < aHaystack.length ? aHigh : -1;
		    } else {
		      return mid;
		    }
		  }
		  else {
		    // Our needle is less than aHaystack[mid].
		    if (mid - aLow > 1) {
		      // The element is in the lower half.
		      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
		    }

		    // we are in termination case (3) or (2) and return the appropriate thing.
		    if (aBias == exports.LEAST_UPPER_BOUND) {
		      return mid;
		    } else {
		      return aLow < 0 ? -1 : aLow;
		    }
		  }
		}

		/**
		 * This is an implementation of binary search which will always try and return
		 * the index of the closest element if there is no exact hit. This is because
		 * mappings between original and generated line/col pairs are single points,
		 * and there is an implicit region between each of them, so a miss just means
		 * that you aren't on the very start of a region.
		 *
		 * @param aNeedle The element you are looking for.
		 * @param aHaystack The array that is being searched.
		 * @param aCompare A function which takes the needle and an element in the
		 *     array and returns -1, 0, or 1 depending on whether the needle is less
		 *     than, equal to, or greater than the element, respectively.
		 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
		 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
		 *     closest element that is smaller than or greater than the one we are
		 *     searching for, respectively, if the exact element cannot be found.
		 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
		 */
		exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		  if (aHaystack.length === 0) {
		    return -1;
		  }

		  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
		                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		  if (index < 0) {
		    return -1;
		  }

		  // We have found either the exact element, or the next-closest element than
		  // the one we are searching for. However, there may be more than one such
		  // element. Make sure we always return the smallest of these.
		  while (index - 1 >= 0) {
		    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
		      break;
		    }
		    --index;
		  }

		  return index;
		}; 
	} (binarySearch));
	return binarySearch;
}

var quickSort = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredQuickSort;

function requireQuickSort () {
	if (hasRequiredQuickSort) return quickSort;
	hasRequiredQuickSort = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	// It turns out that some (most?) JavaScript engines don't self-host
	// `Array.prototype.sort`. This makes sense because C++ will likely remain
	// faster than JS when doing raw CPU-intensive sorting. However, when using a
	// custom comparator function, calling back and forth between the VM's C++ and
	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
	// worse generated code for the comparator function than would be optimal. In
	// fact, when sorting with a comparator, these costs outweigh the benefits of
	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	// a ~3500ms mean speed-up in `bench/bench.html`.

	function SortTemplate(comparator) {

	/**
	 * Swap the elements indexed by `x` and `y` in the array `ary`.
	 *
	 * @param {Array} ary
	 *        The array.
	 * @param {Number} x
	 *        The index of the first item.
	 * @param {Number} y
	 *        The index of the second item.
	 */
	function swap(ary, x, y) {
	  var temp = ary[x];
	  ary[x] = ary[y];
	  ary[y] = temp;
	}

	/**
	 * Returns a random integer within the range `low .. high` inclusive.
	 *
	 * @param {Number} low
	 *        The lower bound on the range.
	 * @param {Number} high
	 *        The upper bound on the range.
	 */
	function randomIntInRange(low, high) {
	  return Math.round(low + (Math.random() * (high - low)));
	}

	/**
	 * The Quick Sort algorithm.
	 *
	 * @param {Array} ary
	 *        An array to sort.
	 * @param {function} comparator
	 *        Function to use to compare two items.
	 * @param {Number} p
	 *        Start index of the array
	 * @param {Number} r
	 *        End index of the array
	 */
	function doQuickSort(ary, comparator, p, r) {
	  // If our lower bound is less than our upper bound, we (1) partition the
	  // array into two pieces and (2) recurse on each half. If it is not, this is
	  // the empty array and our base case.

	  if (p < r) {
	    // (1) Partitioning.
	    //
	    // The partitioning chooses a pivot between `p` and `r` and moves all
	    // elements that are less than or equal to the pivot to the before it, and
	    // all the elements that are greater than it after it. The effect is that
	    // once partition is done, the pivot is in the exact place it will be when
	    // the array is put in sorted order, and it will not need to be moved
	    // again. This runs in O(n) time.

	    // Always choose a random pivot so that an input array which is reverse
	    // sorted does not cause O(n^2) running time.
	    var pivotIndex = randomIntInRange(p, r);
	    var i = p - 1;

	    swap(ary, pivotIndex, r);
	    var pivot = ary[r];

	    // Immediately after `j` is incremented in this loop, the following hold
	    // true:
	    //
	    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
	    //
	    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
	    for (var j = p; j < r; j++) {
	      if (comparator(ary[j], pivot, false) <= 0) {
	        i += 1;
	        swap(ary, i, j);
	      }
	    }

	    swap(ary, i + 1, j);
	    var q = i + 1;

	    // (2) Recurse on each half.

	    doQuickSort(ary, comparator, p, q - 1);
	    doQuickSort(ary, comparator, q + 1, r);
	  }
	}

	  return doQuickSort;
	}

	function cloneSort(comparator) {
	  let template = SortTemplate.toString();
	  let templateFn = new Function(`return ${template}`)();
	  return templateFn(comparator);
	}

	/**
	 * Sort the given array in-place with the given comparator function.
	 *
	 * @param {Array} ary
	 *        An array to sort.
	 * @param {function} comparator
	 *        Function to use to compare two items.
	 */

	let sortCache = new WeakMap();
	quickSort.quickSort = function (ary, comparator, start = 0) {
	  let doQuickSort = sortCache.get(comparator);
	  if (doQuickSort === void 0) {
	    doQuickSort = cloneSort(comparator);
	    sortCache.set(comparator, doQuickSort);
	  }
	  doQuickSort(ary, comparator, start, ary.length - 1);
	};
	return quickSort;
}

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceMapConsumer;

function requireSourceMapConsumer () {
	if (hasRequiredSourceMapConsumer) return sourceMapConsumer;
	hasRequiredSourceMapConsumer = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = /*@__PURE__*/ requireUtil();
	var binarySearch = /*@__PURE__*/ requireBinarySearch();
	var ArraySet = /*@__PURE__*/ requireArraySet().ArraySet;
	var base64VLQ = /*@__PURE__*/ requireBase64Vlq();
	var quickSort = /*@__PURE__*/ requireQuickSort().quickSort;

	function SourceMapConsumer(aSourceMap, aSourceMapURL) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = util.parseSourceMapInput(aSourceMap);
	  }

	  return sourceMap.sections != null
	    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
	    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
	}

	SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
	  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
	};

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	SourceMapConsumer.prototype._version = 3;

	// `__generatedMappings` and `__originalMappings` are arrays that hold the
	// parsed mapping coordinates from the source map's "mappings" attribute. They
	// are lazily instantiated, accessed via the `_generatedMappings` and
	// `_originalMappings` getters respectively, and we only parse the mappings
	// and create these arrays once queried for a source location. We jump through
	// these hoops because there can be many thousands of mappings, and parsing
	// them is expensive, so we only want to do it if we must.
	//
	// Each object in the arrays is of the form:
	//
	//     {
	//       generatedLine: The line number in the generated code,
	//       generatedColumn: The column number in the generated code,
	//       source: The path to the original source file that generated this
	//               chunk of code,
	//       originalLine: The line number in the original source that
	//                     corresponds to this chunk of generated code,
	//       originalColumn: The column number in the original source that
	//                       corresponds to this chunk of generated code,
	//       name: The name of the original symbol which generated this chunk of
	//             code.
	//     }
	//
	// All properties except for `generatedLine` and `generatedColumn` can be
	// `null`.
	//
	// `_generatedMappings` is ordered by the generated positions.
	//
	// `_originalMappings` is ordered by the original positions.

	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
	  configurable: true,
	  enumerable: true,
	  get: function () {
	    if (!this.__generatedMappings) {
	      this._parseMappings(this._mappings, this.sourceRoot);
	    }

	    return this.__generatedMappings;
	  }
	});

	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
	  configurable: true,
	  enumerable: true,
	  get: function () {
	    if (!this.__originalMappings) {
	      this._parseMappings(this._mappings, this.sourceRoot);
	    }

	    return this.__originalMappings;
	  }
	});

	SourceMapConsumer.prototype._charIsMappingSeparator =
	  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
	    var c = aStr.charAt(index);
	    return c === ";" || c === ",";
	  };

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	SourceMapConsumer.prototype._parseMappings =
	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    throw new Error("Subclasses must implement _parseMappings");
	  };

	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;

	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

	/**
	 * Iterate over each mapping between an original source/line/column and a
	 * generated line/column in this source map.
	 *
	 * @param Function aCallback
	 *        The function that is called with each mapping.
	 * @param Object aContext
	 *        Optional. If specified, this object will be the value of `this` every
	 *        time that `aCallback` is called.
	 * @param aOrder
	 *        Either `SourceMapConsumer.GENERATED_ORDER` or
	 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	 *        iterate over the mappings sorted by the generated file's line/column
	 *        order or the original's source/line/column order, respectively. Defaults to
	 *        `SourceMapConsumer.GENERATED_ORDER`.
	 */
	SourceMapConsumer.prototype.eachMapping =
	  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
	    var context = aContext || null;
	    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

	    var mappings;
	    switch (order) {
	    case SourceMapConsumer.GENERATED_ORDER:
	      mappings = this._generatedMappings;
	      break;
	    case SourceMapConsumer.ORIGINAL_ORDER:
	      mappings = this._originalMappings;
	      break;
	    default:
	      throw new Error("Unknown order of iteration.");
	    }

	    var sourceRoot = this.sourceRoot;
	    var boundCallback = aCallback.bind(context);
	    var names = this._names;
	    var sources = this._sources;
	    var sourceMapURL = this._sourceMapURL;

	    for (var i = 0, n = mappings.length; i < n; i++) {
	      var mapping = mappings[i];
	      var source = mapping.source === null ? null : sources.at(mapping.source);
	      if(source !== null) {
	        source = util.computeSourceURL(sourceRoot, source, sourceMapURL);
	      }
	      boundCallback({
	        source: source,
	        generatedLine: mapping.generatedLine,
	        generatedColumn: mapping.generatedColumn,
	        originalLine: mapping.originalLine,
	        originalColumn: mapping.originalColumn,
	        name: mapping.name === null ? null : names.at(mapping.name)
	      });
	    }
	  };

	/**
	 * Returns all generated line and column information for the original source,
	 * line, and column provided. If no column is provided, returns all mappings
	 * corresponding to a either the line we are searching for or the next
	 * closest line that has any mappings. Otherwise, returns all mappings
	 * corresponding to the given line and either the column we are searching for
	 * or the next closest column that has any offsets.
	 *
	 * The only argument is an object with the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.  The line number is 1-based.
	 *   - column: Optional. the column number in the original source.
	 *    The column number is 0-based.
	 *
	 * and an array of objects is returned, each with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.  The
	 *    line number is 1-based.
	 *   - column: The column number in the generated source, or null.
	 *    The column number is 0-based.
	 */
	SourceMapConsumer.prototype.allGeneratedPositionsFor =
	  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
	    var line = util.getArg(aArgs, 'line');

	    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
	    // returns the index of the closest mapping less than the needle. By
	    // setting needle.originalColumn to 0, we thus find the last mapping for
	    // the given line, provided such a mapping exists.
	    var needle = {
	      source: util.getArg(aArgs, 'source'),
	      originalLine: line,
	      originalColumn: util.getArg(aArgs, 'column', 0)
	    };

	    needle.source = this._findSourceIndex(needle.source);
	    if (needle.source < 0) {
	      return [];
	    }

	    var mappings = [];

	    var index = this._findMapping(needle,
	                                  this._originalMappings,
	                                  "originalLine",
	                                  "originalColumn",
	                                  util.compareByOriginalPositions,
	                                  binarySearch.LEAST_UPPER_BOUND);
	    if (index >= 0) {
	      var mapping = this._originalMappings[index];

	      if (aArgs.column === undefined) {
	        var originalLine = mapping.originalLine;

	        // Iterate until either we run out of mappings, or we run into
	        // a mapping for a different line than the one we found. Since
	        // mappings are sorted, this is guaranteed to find all mappings for
	        // the line we found.
	        while (mapping && mapping.originalLine === originalLine) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });

	          mapping = this._originalMappings[++index];
	        }
	      } else {
	        var originalColumn = mapping.originalColumn;

	        // Iterate until either we run out of mappings, or we run into
	        // a mapping for a different line than the one we were searching for.
	        // Since mappings are sorted, this is guaranteed to find all mappings for
	        // the line we are searching for.
	        while (mapping &&
	               mapping.originalLine === line &&
	               mapping.originalColumn == originalColumn) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });

	          mapping = this._originalMappings[++index];
	        }
	      }
	    }

	    return mappings;
	  };

	sourceMapConsumer.SourceMapConsumer = SourceMapConsumer;

	/**
	 * A BasicSourceMapConsumer instance represents a parsed source map which we can
	 * query for information about the original file positions by giving it a file
	 * position in the generated source.
	 *
	 * The first parameter is the raw source map (either as a JSON string, or
	 * already parsed to an object). According to the spec, source maps have the
	 * following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - sources: An array of URLs to the original source files.
	 *   - names: An array of identifiers which can be referrenced by individual mappings.
	 *   - sourceRoot: Optional. The URL root from which all sources are relative.
	 *   - sourcesContent: Optional. An array of contents of the original source files.
	 *   - mappings: A string of base64 VLQs which contain the actual mappings.
	 *   - file: Optional. The generated file this source map is associated with.
	 *
	 * Here is an example source map, taken from the source map spec[0]:
	 *
	 *     {
	 *       version : 3,
	 *       file: "out.js",
	 *       sourceRoot : "",
	 *       sources: ["foo.js", "bar.js"],
	 *       names: ["src", "maps", "are", "fun"],
	 *       mappings: "AA,AB;;ABCDE;"
	 *     }
	 *
	 * The second parameter, if given, is a string whose value is the URL
	 * at which the source map was found.  This URL is used to compute the
	 * sources array.
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	 */
	function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = util.parseSourceMapInput(aSourceMap);
	  }

	  var version = util.getArg(sourceMap, 'version');
	  var sources = util.getArg(sourceMap, 'sources');
	  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
	  // requires the array) to play nice here.
	  var names = util.getArg(sourceMap, 'names', []);
	  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
	  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
	  var mappings = util.getArg(sourceMap, 'mappings');
	  var file = util.getArg(sourceMap, 'file', null);

	  // Once again, Sass deviates from the spec and supplies the version as a
	  // string rather than a number, so we use loose equality checking here.
	  if (version != this._version) {
	    throw new Error('Unsupported version: ' + version);
	  }

	  if (sourceRoot) {
	    sourceRoot = util.normalize(sourceRoot);
	  }

	  sources = sources
	    .map(String)
	    // Some source maps produce relative source paths like "./foo.js" instead of
	    // "foo.js".  Normalize these first so that future comparisons will succeed.
	    // See bugzil.la/1090768.
	    .map(util.normalize)
	    // Always ensure that absolute sources are internally stored relative to
	    // the source root, if the source root is absolute. Not doing this would
	    // be particularly problematic when the source root is a prefix of the
	    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
	    .map(function (source) {
	      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
	        ? util.relative(sourceRoot, source)
	        : source;
	    });

	  // Pass `true` below to allow duplicate names and sources. While source maps
	  // are intended to be compressed and deduplicated, the TypeScript compiler
	  // sometimes generates source maps with duplicates in them. See Github issue
	  // #72 and bugzil.la/889492.
	  this._names = ArraySet.fromArray(names.map(String), true);
	  this._sources = ArraySet.fromArray(sources, true);

	  this._absoluteSources = this._sources.toArray().map(function (s) {
	    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
	  });

	  this.sourceRoot = sourceRoot;
	  this.sourcesContent = sourcesContent;
	  this._mappings = mappings;
	  this._sourceMapURL = aSourceMapURL;
	  this.file = file;
	}

	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

	/**
	 * Utility function to find the index of a source.  Returns -1 if not
	 * found.
	 */
	BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
	  var relativeSource = aSource;
	  if (this.sourceRoot != null) {
	    relativeSource = util.relative(this.sourceRoot, relativeSource);
	  }

	  if (this._sources.has(relativeSource)) {
	    return this._sources.indexOf(relativeSource);
	  }

	  // Maybe aSource is an absolute URL as returned by |sources|.  In
	  // this case we can't simply undo the transform.
	  var i;
	  for (i = 0; i < this._absoluteSources.length; ++i) {
	    if (this._absoluteSources[i] == aSource) {
	      return i;
	    }
	  }

	  return -1;
	};

	/**
	 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
	 *
	 * @param SourceMapGenerator aSourceMap
	 *        The source map that will be consumed.
	 * @param String aSourceMapURL
	 *        The URL at which the source map can be found (optional)
	 * @returns BasicSourceMapConsumer
	 */
	BasicSourceMapConsumer.fromSourceMap =
	  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
	    var smc = Object.create(BasicSourceMapConsumer.prototype);

	    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
	    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
	    smc.sourceRoot = aSourceMap._sourceRoot;
	    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
	                                                            smc.sourceRoot);
	    smc.file = aSourceMap._file;
	    smc._sourceMapURL = aSourceMapURL;
	    smc._absoluteSources = smc._sources.toArray().map(function (s) {
	      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
	    });

	    // Because we are modifying the entries (by converting string sources and
	    // names to indices into the sources and names ArraySets), we have to make
	    // a copy of the entry or else bad things happen. Shared mutable state
	    // strikes again! See github issue #191.

	    var generatedMappings = aSourceMap._mappings.toArray().slice();
	    var destGeneratedMappings = smc.__generatedMappings = [];
	    var destOriginalMappings = smc.__originalMappings = [];

	    for (var i = 0, length = generatedMappings.length; i < length; i++) {
	      var srcMapping = generatedMappings[i];
	      var destMapping = new Mapping;
	      destMapping.generatedLine = srcMapping.generatedLine;
	      destMapping.generatedColumn = srcMapping.generatedColumn;

	      if (srcMapping.source) {
	        destMapping.source = sources.indexOf(srcMapping.source);
	        destMapping.originalLine = srcMapping.originalLine;
	        destMapping.originalColumn = srcMapping.originalColumn;

	        if (srcMapping.name) {
	          destMapping.name = names.indexOf(srcMapping.name);
	        }

	        destOriginalMappings.push(destMapping);
	      }

	      destGeneratedMappings.push(destMapping);
	    }

	    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

	    return smc;
	  };

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	BasicSourceMapConsumer.prototype._version = 3;

	/**
	 * The list of original sources.
	 */
	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
	  get: function () {
	    return this._absoluteSources.slice();
	  }
	});

	/**
	 * Provide the JIT with a nice shape / hidden class.
	 */
	function Mapping() {
	  this.generatedLine = 0;
	  this.generatedColumn = 0;
	  this.source = null;
	  this.originalLine = null;
	  this.originalColumn = null;
	  this.name = null;
	}

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */

	const compareGenerated = util.compareByGeneratedPositionsDeflatedNoLine;
	function sortGenerated(array, start) {
	  let l = array.length;
	  let n = array.length - start;
	  if (n <= 1) {
	    return;
	  } else if (n == 2) {
	    let a = array[start];
	    let b = array[start + 1];
	    if (compareGenerated(a, b) > 0) {
	      array[start] = b;
	      array[start + 1] = a;
	    }
	  } else if (n < 20) {
	    for (let i = start; i < l; i++) {
	      for (let j = i; j > start; j--) {
	        let a = array[j - 1];
	        let b = array[j];
	        if (compareGenerated(a, b) <= 0) {
	          break;
	        }
	        array[j - 1] = b;
	        array[j] = a;
	      }
	    }
	  } else {
	    quickSort(array, compareGenerated, start);
	  }
	}
	BasicSourceMapConsumer.prototype._parseMappings =
	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    var generatedLine = 1;
	    var previousGeneratedColumn = 0;
	    var previousOriginalLine = 0;
	    var previousOriginalColumn = 0;
	    var previousSource = 0;
	    var previousName = 0;
	    var length = aStr.length;
	    var index = 0;
	    var temp = {};
	    var originalMappings = [];
	    var generatedMappings = [];
	    var mapping, segment, end, value;

	    let subarrayStart = 0;
	    while (index < length) {
	      if (aStr.charAt(index) === ';') {
	        generatedLine++;
	        index++;
	        previousGeneratedColumn = 0;

	        sortGenerated(generatedMappings, subarrayStart);
	        subarrayStart = generatedMappings.length;
	      }
	      else if (aStr.charAt(index) === ',') {
	        index++;
	      }
	      else {
	        mapping = new Mapping();
	        mapping.generatedLine = generatedLine;

	        for (end = index; end < length; end++) {
	          if (this._charIsMappingSeparator(aStr, end)) {
	            break;
	          }
	        }
	        aStr.slice(index, end);

	        segment = [];
	        while (index < end) {
	          base64VLQ.decode(aStr, index, temp);
	          value = temp.value;
	          index = temp.rest;
	          segment.push(value);
	        }

	        if (segment.length === 2) {
	          throw new Error('Found a source, but no line and column');
	        }

	        if (segment.length === 3) {
	          throw new Error('Found a source and line, but no column');
	        }

	        // Generated column.
	        mapping.generatedColumn = previousGeneratedColumn + segment[0];
	        previousGeneratedColumn = mapping.generatedColumn;

	        if (segment.length > 1) {
	          // Original source.
	          mapping.source = previousSource + segment[1];
	          previousSource += segment[1];

	          // Original line.
	          mapping.originalLine = previousOriginalLine + segment[2];
	          previousOriginalLine = mapping.originalLine;
	          // Lines are stored 0-based
	          mapping.originalLine += 1;

	          // Original column.
	          mapping.originalColumn = previousOriginalColumn + segment[3];
	          previousOriginalColumn = mapping.originalColumn;

	          if (segment.length > 4) {
	            // Original name.
	            mapping.name = previousName + segment[4];
	            previousName += segment[4];
	          }
	        }

	        generatedMappings.push(mapping);
	        if (typeof mapping.originalLine === 'number') {
	          let currentSource = mapping.source;
	          while (originalMappings.length <= currentSource) {
	            originalMappings.push(null);
	          }
	          if (originalMappings[currentSource] === null) {
	            originalMappings[currentSource] = [];
	          }
	          originalMappings[currentSource].push(mapping);
	        }
	      }
	    }

	    sortGenerated(generatedMappings, subarrayStart);
	    this.__generatedMappings = generatedMappings;

	    for (var i = 0; i < originalMappings.length; i++) {
	      if (originalMappings[i] != null) {
	        quickSort(originalMappings[i], util.compareByOriginalPositionsNoSource);
	      }
	    }
	    this.__originalMappings = [].concat(...originalMappings);
	  };

	/**
	 * Find the mapping that best matches the hypothetical "needle" mapping that
	 * we are searching for in the given "haystack" of mappings.
	 */
	BasicSourceMapConsumer.prototype._findMapping =
	  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
	                                         aColumnName, aComparator, aBias) {
	    // To return the position we are searching for, we must first find the
	    // mapping for the given position and then return the opposite position it
	    // points to. Because the mappings are sorted, we can use binary search to
	    // find the best mapping.

	    if (aNeedle[aLineName] <= 0) {
	      throw new TypeError('Line must be greater than or equal to 1, got '
	                          + aNeedle[aLineName]);
	    }
	    if (aNeedle[aColumnName] < 0) {
	      throw new TypeError('Column must be greater than or equal to 0, got '
	                          + aNeedle[aColumnName]);
	    }

	    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	  };

	/**
	 * Compute the last column for each generated mapping. The last column is
	 * inclusive.
	 */
	BasicSourceMapConsumer.prototype.computeColumnSpans =
	  function SourceMapConsumer_computeColumnSpans() {
	    for (var index = 0; index < this._generatedMappings.length; ++index) {
	      var mapping = this._generatedMappings[index];

	      // Mappings do not contain a field for the last generated columnt. We
	      // can come up with an optimistic estimate, however, by assuming that
	      // mappings are contiguous (i.e. given two consecutive mappings, the
	      // first mapping ends where the second one starts).
	      if (index + 1 < this._generatedMappings.length) {
	        var nextMapping = this._generatedMappings[index + 1];

	        if (mapping.generatedLine === nextMapping.generatedLine) {
	          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
	          continue;
	        }
	      }

	      // The last mapping for each line spans the entire line.
	      mapping.lastGeneratedColumn = Infinity;
	    }
	  };

	/**
	 * Returns the original source, line, and column information for the generated
	 * source's line and column positions provided. The only argument is an object
	 * with the following properties:
	 *
	 *   - line: The line number in the generated source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the generated source.  The column
	 *     number is 0-based.
	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - source: The original source file, or null.
	 *   - line: The line number in the original source, or null.  The
	 *     line number is 1-based.
	 *   - column: The column number in the original source, or null.  The
	 *     column number is 0-based.
	 *   - name: The original identifier, or null.
	 */
	BasicSourceMapConsumer.prototype.originalPositionFor =
	  function SourceMapConsumer_originalPositionFor(aArgs) {
	    var needle = {
	      generatedLine: util.getArg(aArgs, 'line'),
	      generatedColumn: util.getArg(aArgs, 'column')
	    };

	    var index = this._findMapping(
	      needle,
	      this._generatedMappings,
	      "generatedLine",
	      "generatedColumn",
	      util.compareByGeneratedPositionsDeflated,
	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	    );

	    if (index >= 0) {
	      var mapping = this._generatedMappings[index];

	      if (mapping.generatedLine === needle.generatedLine) {
	        var source = util.getArg(mapping, 'source', null);
	        if (source !== null) {
	          source = this._sources.at(source);
	          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
	        }
	        var name = util.getArg(mapping, 'name', null);
	        if (name !== null) {
	          name = this._names.at(name);
	        }
	        return {
	          source: source,
	          line: util.getArg(mapping, 'originalLine', null),
	          column: util.getArg(mapping, 'originalColumn', null),
	          name: name
	        };
	      }
	    }

	    return {
	      source: null,
	      line: null,
	      column: null,
	      name: null
	    };
	  };

	/**
	 * Return true if we have the source content for every source in the source
	 * map, false otherwise.
	 */
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
	  function BasicSourceMapConsumer_hasContentsOfAllSources() {
	    if (!this.sourcesContent) {
	      return false;
	    }
	    return this.sourcesContent.length >= this._sources.size() &&
	      !this.sourcesContent.some(function (sc) { return sc == null; });
	  };

	/**
	 * Returns the original source content. The only argument is the url of the
	 * original source file. Returns null if no original source content is
	 * available.
	 */
	BasicSourceMapConsumer.prototype.sourceContentFor =
	  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	    if (!this.sourcesContent) {
	      return null;
	    }

	    var index = this._findSourceIndex(aSource);
	    if (index >= 0) {
	      return this.sourcesContent[index];
	    }

	    var relativeSource = aSource;
	    if (this.sourceRoot != null) {
	      relativeSource = util.relative(this.sourceRoot, relativeSource);
	    }

	    var url;
	    if (this.sourceRoot != null
	        && (url = util.urlParse(this.sourceRoot))) {
	      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
	      // many users. We can help them out when they expect file:// URIs to
	      // behave like it would if they were running a local HTTP server. See
	      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
	      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
	      if (url.scheme == "file"
	          && this._sources.has(fileUriAbsPath)) {
	        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
	      }

	      if ((!url.path || url.path == "/")
	          && this._sources.has("/" + relativeSource)) {
	        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
	      }
	    }

	    // This function is used recursively from
	    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
	    // don't want to throw if we can't find the source - we just want to
	    // return null, so we provide a flag to exit gracefully.
	    if (nullOnMissing) {
	      return null;
	    }
	    else {
	      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
	    }
	  };

	/**
	 * Returns the generated line and column information for the original source,
	 * line, and column positions provided. The only argument is an object with
	 * the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the original source.  The column
	 *     number is 0-based.
	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.  The
	 *     line number is 1-based.
	 *   - column: The column number in the generated source, or null.
	 *     The column number is 0-based.
	 */
	BasicSourceMapConsumer.prototype.generatedPositionFor =
	  function SourceMapConsumer_generatedPositionFor(aArgs) {
	    var source = util.getArg(aArgs, 'source');
	    source = this._findSourceIndex(source);
	    if (source < 0) {
	      return {
	        line: null,
	        column: null,
	        lastColumn: null
	      };
	    }

	    var needle = {
	      source: source,
	      originalLine: util.getArg(aArgs, 'line'),
	      originalColumn: util.getArg(aArgs, 'column')
	    };

	    var index = this._findMapping(
	      needle,
	      this._originalMappings,
	      "originalLine",
	      "originalColumn",
	      util.compareByOriginalPositions,
	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	    );

	    if (index >= 0) {
	      var mapping = this._originalMappings[index];

	      if (mapping.source === needle.source) {
	        return {
	          line: util.getArg(mapping, 'generatedLine', null),
	          column: util.getArg(mapping, 'generatedColumn', null),
	          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	        };
	      }
	    }

	    return {
	      line: null,
	      column: null,
	      lastColumn: null
	    };
	  };

	sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

	/**
	 * An IndexedSourceMapConsumer instance represents a parsed source map which
	 * we can query for information. It differs from BasicSourceMapConsumer in
	 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	 * input.
	 *
	 * The first parameter is a raw source map (either as a JSON string, or already
	 * parsed to an object). According to the spec for indexed source maps, they
	 * have the following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - file: Optional. The generated file this source map is associated with.
	 *   - sections: A list of section definitions.
	 *
	 * Each value under the "sections" field has two fields:
	 *   - offset: The offset into the original specified at which this section
	 *       begins to apply, defined as an object with a "line" and "column"
	 *       field.
	 *   - map: A source map definition. This source map could also be indexed,
	 *       but doesn't have to be.
	 *
	 * Instead of the "map" field, it's also possible to have a "url" field
	 * specifying a URL to retrieve a source map from, but that's currently
	 * unsupported.
	 *
	 * Here's an example source map, taken from the source map spec[0], but
	 * modified to omit a section which uses the "url" field.
	 *
	 *  {
	 *    version : 3,
	 *    file: "app.js",
	 *    sections: [{
	 *      offset: {line:100, column:10},
	 *      map: {
	 *        version : 3,
	 *        file: "section.js",
	 *        sources: ["foo.js", "bar.js"],
	 *        names: ["src", "maps", "are", "fun"],
	 *        mappings: "AAAA,E;;ABCDE;"
	 *      }
	 *    }],
	 *  }
	 *
	 * The second parameter, if given, is a string whose value is the URL
	 * at which the source map was found.  This URL is used to compute the
	 * sources array.
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	 */
	function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = util.parseSourceMapInput(aSourceMap);
	  }

	  var version = util.getArg(sourceMap, 'version');
	  var sections = util.getArg(sourceMap, 'sections');

	  if (version != this._version) {
	    throw new Error('Unsupported version: ' + version);
	  }

	  this._sources = new ArraySet();
	  this._names = new ArraySet();

	  var lastOffset = {
	    line: -1,
	    column: 0
	  };
	  this._sections = sections.map(function (s) {
	    if (s.url) {
	      // The url field will require support for asynchronicity.
	      // See https://github.com/mozilla/source-map/issues/16
	      throw new Error('Support for url field in sections not implemented.');
	    }
	    var offset = util.getArg(s, 'offset');
	    var offsetLine = util.getArg(offset, 'line');
	    var offsetColumn = util.getArg(offset, 'column');

	    if (offsetLine < lastOffset.line ||
	        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
	      throw new Error('Section offsets must be ordered and non-overlapping.');
	    }
	    lastOffset = offset;

	    return {
	      generatedOffset: {
	        // The offset fields are 0-based, but we use 1-based indices when
	        // encoding/decoding from VLQ.
	        generatedLine: offsetLine + 1,
	        generatedColumn: offsetColumn + 1
	      },
	      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
	    }
	  });
	}

	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	IndexedSourceMapConsumer.prototype._version = 3;

	/**
	 * The list of original sources.
	 */
	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
	  get: function () {
	    var sources = [];
	    for (var i = 0; i < this._sections.length; i++) {
	      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
	        sources.push(this._sections[i].consumer.sources[j]);
	      }
	    }
	    return sources;
	  }
	});

	/**
	 * Returns the original source, line, and column information for the generated
	 * source's line and column positions provided. The only argument is an object
	 * with the following properties:
	 *
	 *   - line: The line number in the generated source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the generated source.  The column
	 *     number is 0-based.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - source: The original source file, or null.
	 *   - line: The line number in the original source, or null.  The
	 *     line number is 1-based.
	 *   - column: The column number in the original source, or null.  The
	 *     column number is 0-based.
	 *   - name: The original identifier, or null.
	 */
	IndexedSourceMapConsumer.prototype.originalPositionFor =
	  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
	    var needle = {
	      generatedLine: util.getArg(aArgs, 'line'),
	      generatedColumn: util.getArg(aArgs, 'column')
	    };

	    // Find the section containing the generated position we're trying to map
	    // to an original position.
	    var sectionIndex = binarySearch.search(needle, this._sections,
	      function(needle, section) {
	        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
	        if (cmp) {
	          return cmp;
	        }

	        return (needle.generatedColumn -
	                section.generatedOffset.generatedColumn);
	      });
	    var section = this._sections[sectionIndex];

	    if (!section) {
	      return {
	        source: null,
	        line: null,
	        column: null,
	        name: null
	      };
	    }

	    return section.consumer.originalPositionFor({
	      line: needle.generatedLine -
	        (section.generatedOffset.generatedLine - 1),
	      column: needle.generatedColumn -
	        (section.generatedOffset.generatedLine === needle.generatedLine
	         ? section.generatedOffset.generatedColumn - 1
	         : 0),
	      bias: aArgs.bias
	    });
	  };

	/**
	 * Return true if we have the source content for every source in the source
	 * map, false otherwise.
	 */
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
	  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
	    return this._sections.every(function (s) {
	      return s.consumer.hasContentsOfAllSources();
	    });
	  };

	/**
	 * Returns the original source content. The only argument is the url of the
	 * original source file. Returns null if no original source content is
	 * available.
	 */
	IndexedSourceMapConsumer.prototype.sourceContentFor =
	  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];

	      var content = section.consumer.sourceContentFor(aSource, true);
	      if (content || content === '') {
	        return content;
	      }
	    }
	    if (nullOnMissing) {
	      return null;
	    }
	    else {
	      throw new Error('"' + aSource + '" is not in the SourceMap.');
	    }
	  };

	/**
	 * Returns the generated line and column information for the original source,
	 * line, and column positions provided. The only argument is an object with
	 * the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.  The line number
	 *     is 1-based.
	 *   - column: The column number in the original source.  The column
	 *     number is 0-based.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.  The
	 *     line number is 1-based. 
	 *   - column: The column number in the generated source, or null.
	 *     The column number is 0-based.
	 */
	IndexedSourceMapConsumer.prototype.generatedPositionFor =
	  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];

	      // Only consider this section if the requested source is in the list of
	      // sources of the consumer.
	      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
	        continue;
	      }
	      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
	      if (generatedPosition) {
	        var ret = {
	          line: generatedPosition.line +
	            (section.generatedOffset.generatedLine - 1),
	          column: generatedPosition.column +
	            (section.generatedOffset.generatedLine === generatedPosition.line
	             ? section.generatedOffset.generatedColumn - 1
	             : 0)
	        };
	        return ret;
	      }
	    }

	    return {
	      line: null,
	      column: null
	    };
	  };

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	IndexedSourceMapConsumer.prototype._parseMappings =
	  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    this.__generatedMappings = [];
	    this.__originalMappings = [];
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];
	      var sectionMappings = section.consumer._generatedMappings;
	      for (var j = 0; j < sectionMappings.length; j++) {
	        var mapping = sectionMappings[j];

	        var source = section.consumer._sources.at(mapping.source);
	        if(source !== null) {
	          source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
	        }
	        this._sources.add(source);
	        source = this._sources.indexOf(source);

	        var name = null;
	        if (mapping.name) {
	          name = section.consumer._names.at(mapping.name);
	          this._names.add(name);
	          name = this._names.indexOf(name);
	        }

	        // The mappings coming from the consumer for the section have
	        // generated positions relative to the start of the section, so we
	        // need to offset them to be relative to the start of the concatenated
	        // generated file.
	        var adjustedMapping = {
	          source: source,
	          generatedLine: mapping.generatedLine +
	            (section.generatedOffset.generatedLine - 1),
	          generatedColumn: mapping.generatedColumn +
	            (section.generatedOffset.generatedLine === mapping.generatedLine
	            ? section.generatedOffset.generatedColumn - 1
	            : 0),
	          originalLine: mapping.originalLine,
	          originalColumn: mapping.originalColumn,
	          name: name
	        };

	        this.__generatedMappings.push(adjustedMapping);
	        if (typeof adjustedMapping.originalLine === 'number') {
	          this.__originalMappings.push(adjustedMapping);
	        }
	      }
	    }

	    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
	    quickSort(this.__originalMappings, util.compareByOriginalPositions);
	  };

	sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
	return sourceMapConsumer;
}

var sourceNode = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

var hasRequiredSourceNode;

function requireSourceNode () {
	if (hasRequiredSourceNode) return sourceNode;
	hasRequiredSourceNode = 1;
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var SourceMapGenerator = /*@__PURE__*/ requireSourceMapGenerator().SourceMapGenerator;
	var util = /*@__PURE__*/ requireUtil();

	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	var REGEX_NEWLINE = /(\r?\n)/;

	// Newline character code for charCodeAt() comparisons
	var NEWLINE_CODE = 10;

	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	var isSourceNode = "$$$isSourceNode$$$";

	/**
	 * SourceNodes provide a way to abstract over interpolating/concatenating
	 * snippets of generated JavaScript source code while maintaining the line and
	 * column information associated with the original source code.
	 *
	 * @param aLine The original line number.
	 * @param aColumn The original column number.
	 * @param aSource The original source's filename.
	 * @param aChunks Optional. An array of strings which are snippets of
	 *        generated JS, or other SourceNodes.
	 * @param aName The original identifier.
	 */
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
	  this.children = [];
	  this.sourceContents = {};
	  this.line = aLine == null ? null : aLine;
	  this.column = aColumn == null ? null : aColumn;
	  this.source = aSource == null ? null : aSource;
	  this.name = aName == null ? null : aName;
	  this[isSourceNode] = true;
	  if (aChunks != null) this.add(aChunks);
	}

	/**
	 * Creates a SourceNode from generated code and a SourceMapConsumer.
	 *
	 * @param aGeneratedCode The generated code
	 * @param aSourceMapConsumer The SourceMap for the generated code
	 * @param aRelativePath Optional. The path that relative sources in the
	 *        SourceMapConsumer should be relative to.
	 */
	SourceNode.fromStringWithSourceMap =
	  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
	    // The SourceNode we want to fill with the generated code
	    // and the SourceMap
	    var node = new SourceNode();

	    // All even indices of this array are one line of the generated code,
	    // while all odd indices are the newlines between two adjacent lines
	    // (since `REGEX_NEWLINE` captures its match).
	    // Processed fragments are accessed by calling `shiftNextLine`.
	    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
	    var remainingLinesIndex = 0;
	    var shiftNextLine = function() {
	      var lineContents = getNextLine();
	      // The last line of a file might not have a newline.
	      var newLine = getNextLine() || "";
	      return lineContents + newLine;

	      function getNextLine() {
	        return remainingLinesIndex < remainingLines.length ?
	            remainingLines[remainingLinesIndex++] : undefined;
	      }
	    };

	    // We need to remember the position of "remainingLines"
	    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

	    // The generate SourceNodes we need a code range.
	    // To extract it current and last mapping is used.
	    // Here we store the last mapping.
	    var lastMapping = null;

	    aSourceMapConsumer.eachMapping(function (mapping) {
	      if (lastMapping !== null) {
	        // We add the code from "lastMapping" to "mapping":
	        // First check if there is a new line in between.
	        if (lastGeneratedLine < mapping.generatedLine) {
	          // Associate first line with "lastMapping"
	          addMappingWithCode(lastMapping, shiftNextLine());
	          lastGeneratedLine++;
	          lastGeneratedColumn = 0;
	          // The remaining code is added without mapping
	        } else {
	          // There is no new line in between.
	          // Associate the code between "lastGeneratedColumn" and
	          // "mapping.generatedColumn" with "lastMapping"
	          var nextLine = remainingLines[remainingLinesIndex] || '';
	          var code = nextLine.substr(0, mapping.generatedColumn -
	                                        lastGeneratedColumn);
	          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
	                                              lastGeneratedColumn);
	          lastGeneratedColumn = mapping.generatedColumn;
	          addMappingWithCode(lastMapping, code);
	          // No more remaining code, continue
	          lastMapping = mapping;
	          return;
	        }
	      }
	      // We add the generated code until the first mapping
	      // to the SourceNode without any mapping.
	      // Each line is added as separate string.
	      while (lastGeneratedLine < mapping.generatedLine) {
	        node.add(shiftNextLine());
	        lastGeneratedLine++;
	      }
	      if (lastGeneratedColumn < mapping.generatedColumn) {
	        var nextLine = remainingLines[remainingLinesIndex] || '';
	        node.add(nextLine.substr(0, mapping.generatedColumn));
	        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
	        lastGeneratedColumn = mapping.generatedColumn;
	      }
	      lastMapping = mapping;
	    }, this);
	    // We have processed all mappings.
	    if (remainingLinesIndex < remainingLines.length) {
	      if (lastMapping) {
	        // Associate the remaining code in the current line with "lastMapping"
	        addMappingWithCode(lastMapping, shiftNextLine());
	      }
	      // and add the remaining lines without any mapping
	      node.add(remainingLines.splice(remainingLinesIndex).join(""));
	    }

	    // Copy sourcesContent into SourceNode
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aRelativePath != null) {
	          sourceFile = util.join(aRelativePath, sourceFile);
	        }
	        node.setSourceContent(sourceFile, content);
	      }
	    });

	    return node;

	    function addMappingWithCode(mapping, code) {
	      if (mapping === null || mapping.source === undefined) {
	        node.add(code);
	      } else {
	        var source = aRelativePath
	          ? util.join(aRelativePath, mapping.source)
	          : mapping.source;
	        node.add(new SourceNode(mapping.originalLine,
	                                mapping.originalColumn,
	                                source,
	                                code,
	                                mapping.name));
	      }
	    }
	  };

	/**
	 * Add a chunk of generated JS to this source node.
	 *
	 * @param aChunk A string snippet of generated JS code, another instance of
	 *        SourceNode, or an array where each member is one of those things.
	 */
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
	  if (Array.isArray(aChunk)) {
	    aChunk.forEach(function (chunk) {
	      this.add(chunk);
	    }, this);
	  }
	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	    if (aChunk) {
	      this.children.push(aChunk);
	    }
	  }
	  else {
	    throw new TypeError(
	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	    );
	  }
	  return this;
	};

	/**
	 * Add a chunk of generated JS to the beginning of this source node.
	 *
	 * @param aChunk A string snippet of generated JS code, another instance of
	 *        SourceNode, or an array where each member is one of those things.
	 */
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
	  if (Array.isArray(aChunk)) {
	    for (var i = aChunk.length-1; i >= 0; i--) {
	      this.prepend(aChunk[i]);
	    }
	  }
	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	    this.children.unshift(aChunk);
	  }
	  else {
	    throw new TypeError(
	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	    );
	  }
	  return this;
	};

	/**
	 * Walk over the tree of JS snippets in this node and its children. The
	 * walking function is called once for each snippet of JS and is passed that
	 * snippet and the its original associated source's line/column location.
	 *
	 * @param aFn The traversal function.
	 */
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
	  var chunk;
	  for (var i = 0, len = this.children.length; i < len; i++) {
	    chunk = this.children[i];
	    if (chunk[isSourceNode]) {
	      chunk.walk(aFn);
	    }
	    else {
	      if (chunk !== '') {
	        aFn(chunk, { source: this.source,
	                     line: this.line,
	                     column: this.column,
	                     name: this.name });
	      }
	    }
	  }
	};

	/**
	 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	 * each of `this.children`.
	 *
	 * @param aSep The separator.
	 */
	SourceNode.prototype.join = function SourceNode_join(aSep) {
	  var newChildren;
	  var i;
	  var len = this.children.length;
	  if (len > 0) {
	    newChildren = [];
	    for (i = 0; i < len-1; i++) {
	      newChildren.push(this.children[i]);
	      newChildren.push(aSep);
	    }
	    newChildren.push(this.children[i]);
	    this.children = newChildren;
	  }
	  return this;
	};

	/**
	 * Call String.prototype.replace on the very right-most source snippet. Useful
	 * for trimming whitespace from the end of a source node, etc.
	 *
	 * @param aPattern The pattern to replace.
	 * @param aReplacement The thing to replace the pattern with.
	 */
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
	  var lastChild = this.children[this.children.length - 1];
	  if (lastChild[isSourceNode]) {
	    lastChild.replaceRight(aPattern, aReplacement);
	  }
	  else if (typeof lastChild === 'string') {
	    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
	  }
	  else {
	    this.children.push(''.replace(aPattern, aReplacement));
	  }
	  return this;
	};

	/**
	 * Set the source content for a source file. This will be added to the SourceMapGenerator
	 * in the sourcesContent field.
	 *
	 * @param aSourceFile The filename of the source file
	 * @param aSourceContent The content of the source file
	 */
	SourceNode.prototype.setSourceContent =
	  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
	    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	  };

	/**
	 * Walk over the tree of SourceNodes. The walking function is called for each
	 * source file content and is passed the filename and source content.
	 *
	 * @param aFn The traversal function.
	 */
	SourceNode.prototype.walkSourceContents =
	  function SourceNode_walkSourceContents(aFn) {
	    for (var i = 0, len = this.children.length; i < len; i++) {
	      if (this.children[i][isSourceNode]) {
	        this.children[i].walkSourceContents(aFn);
	      }
	    }

	    var sources = Object.keys(this.sourceContents);
	    for (var i = 0, len = sources.length; i < len; i++) {
	      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	    }
	  };

	/**
	 * Return the string representation of this source node. Walks over the tree
	 * and concatenates all the various snippets together to one string.
	 */
	SourceNode.prototype.toString = function SourceNode_toString() {
	  var str = "";
	  this.walk(function (chunk) {
	    str += chunk;
	  });
	  return str;
	};

	/**
	 * Returns the string representation of this source node along with a source
	 * map.
	 */
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
	  var generated = {
	    code: "",
	    line: 1,
	    column: 0
	  };
	  var map = new SourceMapGenerator(aArgs);
	  var sourceMappingActive = false;
	  var lastOriginalSource = null;
	  var lastOriginalLine = null;
	  var lastOriginalColumn = null;
	  var lastOriginalName = null;
	  this.walk(function (chunk, original) {
	    generated.code += chunk;
	    if (original.source !== null
	        && original.line !== null
	        && original.column !== null) {
	      if(lastOriginalSource !== original.source
	         || lastOriginalLine !== original.line
	         || lastOriginalColumn !== original.column
	         || lastOriginalName !== original.name) {
	        map.addMapping({
	          source: original.source,
	          original: {
	            line: original.line,
	            column: original.column
	          },
	          generated: {
	            line: generated.line,
	            column: generated.column
	          },
	          name: original.name
	        });
	      }
	      lastOriginalSource = original.source;
	      lastOriginalLine = original.line;
	      lastOriginalColumn = original.column;
	      lastOriginalName = original.name;
	      sourceMappingActive = true;
	    } else if (sourceMappingActive) {
	      map.addMapping({
	        generated: {
	          line: generated.line,
	          column: generated.column
	        }
	      });
	      lastOriginalSource = null;
	      sourceMappingActive = false;
	    }
	    for (var idx = 0, length = chunk.length; idx < length; idx++) {
	      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
	        generated.line++;
	        generated.column = 0;
	        // Mappings end at eol
	        if (idx + 1 === length) {
	          lastOriginalSource = null;
	          sourceMappingActive = false;
	        } else if (sourceMappingActive) {
	          map.addMapping({
	            source: original.source,
	            original: {
	              line: original.line,
	              column: original.column
	            },
	            generated: {
	              line: generated.line,
	              column: generated.column
	            },
	            name: original.name
	          });
	        }
	      } else {
	        generated.column++;
	      }
	    }
	  });
	  this.walkSourceContents(function (sourceFile, sourceContent) {
	    map.setSourceContent(sourceFile, sourceContent);
	  });

	  return { code: generated.code, map: map };
	};

	sourceNode.SourceNode = SourceNode;
	return sourceNode;
}

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var hasRequiredSourceMap;

function requireSourceMap () {
	if (hasRequiredSourceMap) return sourceMap;
	hasRequiredSourceMap = 1;
	sourceMap.SourceMapGenerator = /*@__PURE__*/ requireSourceMapGenerator().SourceMapGenerator;
	sourceMap.SourceMapConsumer = /*@__PURE__*/ requireSourceMapConsumer().SourceMapConsumer;
	sourceMap.SourceNode = /*@__PURE__*/ requireSourceNode().SourceNode;
	return sourceMap;
}

var sourceMapExports = /*@__PURE__*/ requireSourceMap();

const isLiteralWhitelisted = /* @__PURE__ */ makeMap("true,false,null,this");

const V_MODEL_RADIO = Symbol(`vModelRadio` );
const V_MODEL_CHECKBOX = Symbol(
  `vModelCheckbox` 
);
const V_MODEL_TEXT = Symbol(`vModelText` );
const V_MODEL_SELECT = Symbol(
  `vModelSelect` 
);
const V_MODEL_DYNAMIC = Symbol(
  `vModelDynamic` 
);
const V_ON_WITH_MODIFIERS = Symbol(
  `vOnModifiersGuard` 
);
const V_ON_WITH_KEYS = Symbol(
  `vOnKeysGuard` 
);
const V_SHOW = Symbol(`vShow` );
const TRANSITION = Symbol(`Transition` );
const TRANSITION_GROUP = Symbol(
  `TransitionGroup` 
);
registerRuntimeHelpers({
  [V_MODEL_RADIO]: `vModelRadio`,
  [V_MODEL_CHECKBOX]: `vModelCheckbox`,
  [V_MODEL_TEXT]: `vModelText`,
  [V_MODEL_SELECT]: `vModelSelect`,
  [V_MODEL_DYNAMIC]: `vModelDynamic`,
  [V_ON_WITH_MODIFIERS]: `withModifiers`,
  [V_ON_WITH_KEYS]: `withKeys`,
  [V_SHOW]: `vShow`,
  [TRANSITION]: `Transition`,
  [TRANSITION_GROUP]: `TransitionGroup`
});

const parserOptions = {
  parseMode: "html",
  isVoidTag,
  isNativeTag: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
  isPreTag: (tag) => tag === "pre",
  isIgnoreNewlineTag: (tag) => tag === "pre" || tag === "textarea",
  decodeEntities: void 0,
  isBuiltInComponent: (tag) => {
    if (tag === "Transition" || tag === "transition") {
      return TRANSITION;
    } else if (tag === "TransitionGroup" || tag === "transition-group") {
      return TRANSITION_GROUP;
    }
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(tag, parent, rootNamespace) {
    let ns = parent ? parent.ns : rootNamespace;
    if (parent && ns === 2) {
      if (parent.tag === "annotation-xml") {
        if (tag === "svg") {
          return 1;
        }
        if (parent.props.some(
          (a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml")
        )) {
          ns = 0;
        }
      } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") {
        ns = 0;
      }
    } else if (parent && ns === 1) {
      if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") {
        ns = 0;
      }
    }
    if (ns === 0) {
      if (tag === "svg") {
        return 1;
      }
      if (tag === "math") {
        return 2;
      }
    }
    return ns;
  }
};

function createDOMCompilerError(code, loc) {
  return createCompilerError(
    code,
    loc,
    DOMErrorMessages 
  );
}
const DOMErrorMessages = {
  [53]: `v-html is missing expression.`,
  [54]: `v-html will override element children.`,
  [55]: `v-text is missing expression.`,
  [56]: `v-text will override element children.`,
  [57]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
  [58]: `v-model argument is not supported on plain elements.`,
  [59]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
  [60]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
  [61]: `v-show is missing expression.`,
  [62]: `<Transition> expects exactly one child element or component.`,
  [63]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`,
  // just to fulfill types
  [64]: ``
};

const isEventOptionModifier = /* @__PURE__ */ makeMap(`passive,once,capture`);
const isNonKeyModifier = /* @__PURE__ */ makeMap(
  // event propagation management
  `stop,prevent,self,ctrl,shift,alt,meta,exact,middle`
);
const maybeKeyModifier = /* @__PURE__ */ makeMap("left,right");
const isKeyboardEvent = /* @__PURE__ */ makeMap(`onkeyup,onkeydown,onkeypress`);
const resolveModifiers = (key, modifiers, context, loc) => {
  const keyModifiers = [];
  const nonKeyModifiers = [];
  const eventOptionModifiers = [];
  for (let i = 0; i < modifiers.length; i++) {
    const modifier = modifiers[i].content;
    if (isEventOptionModifier(modifier)) {
      eventOptionModifiers.push(modifier);
    } else {
      const keyString = isString(key) ? key : isStaticExp(key) ? key.content : null;
      if (maybeKeyModifier(modifier)) {
        if (keyString) {
          if (isKeyboardEvent(keyString.toLowerCase())) {
            keyModifiers.push(modifier);
          } else {
            nonKeyModifiers.push(modifier);
          }
        } else {
          keyModifiers.push(modifier);
          nonKeyModifiers.push(modifier);
        }
      } else {
        if (isNonKeyModifier(modifier)) {
          nonKeyModifiers.push(modifier);
        } else {
          keyModifiers.push(modifier);
        }
      }
    }
  }
  return {
    keyModifiers,
    nonKeyModifiers,
    eventOptionModifiers
  };
};

function isValidHTMLNesting(parent, child) {
  if (parent in onlyValidChildren) {
    return onlyValidChildren[parent].has(child);
  }
  if (child in onlyValidParents) {
    return onlyValidParents[child].has(parent);
  }
  if (parent in knownInvalidChildren) {
    if (knownInvalidChildren[parent].has(child)) return false;
  }
  if (child in knownInvalidParents) {
    if (knownInvalidParents[child].has(parent)) return false;
  }
  return true;
}
const headings = /* @__PURE__ */ new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
const emptySet = /* @__PURE__ */ new Set([]);
const onlyValidChildren = {
  head: /* @__PURE__ */ new Set([
    "base",
    "basefront",
    "bgsound",
    "link",
    "meta",
    "title",
    "noscript",
    "noframes",
    "style",
    "script",
    "template"
  ]),
  optgroup: /* @__PURE__ */ new Set(["option"]),
  select: /* @__PURE__ */ new Set(["optgroup", "option", "hr"]),
  // table
  table: /* @__PURE__ */ new Set(["caption", "colgroup", "tbody", "tfoot", "thead"]),
  tr: /* @__PURE__ */ new Set(["td", "th"]),
  colgroup: /* @__PURE__ */ new Set(["col"]),
  tbody: /* @__PURE__ */ new Set(["tr"]),
  thead: /* @__PURE__ */ new Set(["tr"]),
  tfoot: /* @__PURE__ */ new Set(["tr"]),
  // these elements can not have any children elements
  script: emptySet,
  iframe: emptySet,
  option: emptySet,
  textarea: emptySet,
  style: emptySet,
  title: emptySet
};
const onlyValidParents = {
  // sections
  html: emptySet,
  body: /* @__PURE__ */ new Set(["html"]),
  head: /* @__PURE__ */ new Set(["html"]),
  // table
  td: /* @__PURE__ */ new Set(["tr"]),
  colgroup: /* @__PURE__ */ new Set(["table"]),
  caption: /* @__PURE__ */ new Set(["table"]),
  tbody: /* @__PURE__ */ new Set(["table"]),
  tfoot: /* @__PURE__ */ new Set(["table"]),
  col: /* @__PURE__ */ new Set(["colgroup"]),
  th: /* @__PURE__ */ new Set(["tr"]),
  thead: /* @__PURE__ */ new Set(["table"]),
  tr: /* @__PURE__ */ new Set(["tbody", "thead", "tfoot"]),
  // data list
  dd: /* @__PURE__ */ new Set(["dl", "div"]),
  dt: /* @__PURE__ */ new Set(["dl", "div"]),
  // other
  figcaption: /* @__PURE__ */ new Set(["figure"]),
  // li: new Set(["ul", "ol"]),
  summary: /* @__PURE__ */ new Set(["details"]),
  area: /* @__PURE__ */ new Set(["map"])
};
const knownInvalidChildren = {
  p: /* @__PURE__ */ new Set([
    "address",
    "article",
    "aside",
    "blockquote",
    "center",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "fieldset",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "menu",
    "ol",
    "p",
    "pre",
    "section",
    "table",
    "ul"
  ]),
  svg: /* @__PURE__ */ new Set([
    "b",
    "blockquote",
    "br",
    "code",
    "dd",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "li",
    "menu",
    "meta",
    "ol",
    "p",
    "pre",
    "ruby",
    "s",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "table",
    "u",
    "ul",
    "var"
  ])
};
const knownInvalidParents = {
  a: /* @__PURE__ */ new Set(["a"]),
  button: /* @__PURE__ */ new Set(["button"]),
  dd: /* @__PURE__ */ new Set(["dd", "dt"]),
  dt: /* @__PURE__ */ new Set(["dd", "dt"]),
  form: /* @__PURE__ */ new Set(["form"]),
  li: /* @__PURE__ */ new Set(["li"]),
  h1: headings,
  h2: headings,
  h3: headings,
  h4: headings,
  h5: headings,
  h6: headings
};

function parse(template, options = {}) {
  return baseParse(template, extend({}, parserOptions, options));
}

const newDynamic = () => ({
  flags: 1,
  children: []
});
const newBlock = (node) => ({
  type: 1,
  node,
  dynamic: newDynamic(),
  effect: [],
  operation: [],
  returns: [],
  tempId: 0
});
function wrapTemplate(node, dirs) {
  if (node.tagType === 3) {
    return node;
  }
  const reserved = [];
  const pass = [];
  node.props.forEach((prop) => {
    if (prop.type === 7 && dirs.includes(prop.name)) {
      reserved.push(prop);
    } else {
      pass.push(prop);
    }
  });
  return extend({}, node, {
    type: 1,
    tag: "template",
    props: reserved,
    tagType: 3,
    children: [extend({}, node, { props: pass })]
  });
}
const EMPTY_EXPRESSION = createSimpleExpression(
  "",
  true
);

const findProp = findProp$1;
const findDir = findDir$1;
function propToExpression(prop) {
  return prop.type === 6 ? prop.value ? createSimpleExpression(prop.value.content, true, prop.value.loc) : EMPTY_EXPRESSION : prop.exp;
}
function isConstantExpression(exp) {
  return isLiteralWhitelisted(exp.content) || isGloballyAllowed(exp.content) || getLiteralExpressionValue(exp) !== null;
}
function isStaticExpression(node, bindings) {
  if (node.ast) {
    return isConstantNode(node.ast, bindings);
  } else if (node.ast === null) {
    const type = bindings[node.content];
    return type === "literal-const";
  }
  return false;
}
function resolveExpression(exp) {
  if (!exp.isStatic) {
    const value = getLiteralExpressionValue(exp);
    if (value !== null) {
      return createSimpleExpression("" + value, true, exp.loc);
    }
  }
  return exp;
}
function getLiteralExpressionValue(exp) {
  if (exp.ast) {
    if (exp.ast.type === "StringLiteral") {
      return exp.ast.value;
    } else if (exp.ast.type === "TemplateLiteral" && exp.ast.expressions.length === 0) {
      return exp.ast.quasis[0].value.cooked;
    }
  }
  return exp.isStatic ? exp.content : null;
}

class TransformContext {
  constructor(ir, node, options = {}) {
    this.ir = ir;
    this.node = node;
    this.selfName = null;
    this.parent = null;
    this.index = 0;
    this.block = this.ir.block;
    this.template = "";
    this.childrenTemplate = [];
    this.dynamic = this.ir.block.dynamic;
    this.inVOnce = false;
    this.inVFor = 0;
    this.comment = [];
    this.component = this.ir.component;
    this.directive = this.ir.directive;
    this.slots = [];
    this.globalId = 0;
    this.increaseId = () => this.globalId++;
    this.options = extend({}, defaultOptions, options);
    this.root = this;
    if (options.filename) this.selfName = getSelfName(options.filename);
  }
  enterBlock(ir, isVFor = false) {
    const { block, template, dynamic, childrenTemplate, slots } = this;
    this.block = ir;
    this.dynamic = ir.dynamic;
    this.template = "";
    this.childrenTemplate = [];
    this.slots = [];
    isVFor && this.inVFor++;
    return () => {
      this.registerTemplate();
      this.block = block;
      this.template = template;
      this.dynamic = dynamic;
      this.childrenTemplate = childrenTemplate;
      this.slots = slots;
      isVFor && this.inVFor--;
    };
  }
  reference() {
    if (this.dynamic.id !== void 0) return this.dynamic.id;
    this.dynamic.flags |= 1;
    return this.dynamic.id = this.increaseId();
  }
  pushTemplate(content) {
    const existing = this.ir.template.findIndex(
      (template) => template === content
    );
    if (existing !== -1) return existing;
    this.ir.template.push(content);
    return this.ir.template.length - 1;
  }
  registerTemplate() {
    if (!this.template) return -1;
    const id = this.pushTemplate(this.template);
    return this.dynamic.template = id;
  }
  registerEffect(expressions, operation, getIndex = () => this.block.effect.length) {
    const operations = [operation].flat();
    expressions = expressions.filter((exp) => !isConstantExpression(exp));
    if (this.inVOnce || expressions.length === 0 || expressions.every(
      (e) => isStaticExpression(e, this.root.options.bindingMetadata)
    )) {
      return this.registerOperation(...operations);
    }
    this.block.effect.splice(getIndex(), 0, {
      expressions,
      operations
    });
  }
  registerOperation(...node) {
    this.block.operation.push(...node);
  }
  create(node, index) {
    return Object.assign(Object.create(TransformContext.prototype), this, {
      node,
      parent: this,
      index,
      template: "",
      childrenTemplate: [],
      dynamic: newDynamic()
    });
  }
}
const defaultOptions = {
  filename: "",
  prefixIdentifiers: true,
  hoistStatic: false,
  hmr: false,
  cacheHandlers: false,
  nodeTransforms: [],
  directiveTransforms: {},
  transformHoist: null,
  isBuiltInComponent: NOOP,
  isCustomElement: NOOP,
  expressionPlugins: [],
  scopeId: null,
  slotted: true,
  ssr: false,
  inSSR: false,
  ssrCssVars: ``,
  templateMode: "string",
  bindingMetadata: EMPTY_OBJ,
  inline: false,
  isTS: false,
  // fixed by uts
  disableEventDelegation: false,
  onError: defaultOnError,
  onWarn: defaultOnWarn
};
function transform(node, options = {}) {
  const ir = {
    type: 0,
    node,
    source: node.source,
    template: [],
    component: /* @__PURE__ */ new Set(),
    directive: /* @__PURE__ */ new Set(),
    block: newBlock(node),
    hasTemplateRef: false
  };
  const context = new TransformContext(ir, node, options);
  transformNode(context);
  return ir;
}
function transformNode(context) {
  let { node } = context;
  const { nodeTransforms } = context.options;
  const exitFns = [];
  for (const nodeTransform of nodeTransforms) {
    const onExit = nodeTransform(node, context);
    if (onExit) {
      if (isArray(onExit)) {
        exitFns.push(...onExit);
      } else {
        exitFns.push(onExit);
      }
    }
    if (!context.node) {
      return;
    } else {
      node = context.node;
    }
  }
  context.node = node;
  let i = exitFns.length;
  while (i--) {
    exitFns[i]();
  }
  if (context.node.type === 0) {
    context.registerTemplate();
  }
}
function createStructuralDirectiveTransform(name, fn) {
  const matches = (n) => isString(name) ? n === name : name.includes(n);
  return (node, context) => {
    if (node.type === 1) {
      const { props } = node;
      if (node.tagType === 3 && props.some(isVSlot)) {
        return;
      }
      const exitFns = [];
      for (const prop of props) {
        if (prop.type === 7 && matches(prop.name)) {
          const onExit = fn(
            node,
            prop,
            context
          );
          if (onExit) exitFns.push(onExit);
        }
      }
      return exitFns;
    }
  };
}

const NEWLINE = Symbol(`newline` );
const LF = Symbol(`line feed` );
const INDENT_START = Symbol(`indent start` );
const INDENT_END = Symbol(`indent end` );
function buildCodeFragment(...frag) {
  const push = frag.push.bind(frag);
  const unshift = frag.unshift.bind(frag);
  return [frag, push, unshift];
}
function genMulti([left, right, seg, placeholder], ...frags) {
  if (placeholder) {
    while (frags.length > 0 && !frags[frags.length - 1]) {
      frags.pop();
    }
    frags = frags.map((frag2) => frag2 || placeholder);
  } else {
    frags = frags.filter(Boolean);
  }
  const frag = [];
  push(left);
  for (let [i, fn] of frags.entries()) {
    push(fn);
    if (i < frags.length - 1) push(seg);
  }
  push(right);
  return frag;
  function push(fn) {
    if (!isArray(fn)) fn = [fn];
    frag.push(...fn);
  }
}
const DELIMITERS_ARRAY = ["[", "]", ", "];
const DELIMITERS_ARRAY_NEWLINE = [
  ["[", INDENT_START, NEWLINE],
  [INDENT_END, NEWLINE, "]"],
  [", ", NEWLINE]
];
const DELIMITERS_OBJECT = ["{ ", " }", ", "];
const DELIMITERS_OBJECT_NEWLINE = [
  ["{", INDENT_START, NEWLINE],
  [INDENT_END, NEWLINE, "}"],
  [", ", NEWLINE]
];
function genCall(name, ...frags) {
  const hasPlaceholder = isArray(name);
  const fnName = hasPlaceholder ? name[0] : name;
  const placeholder = hasPlaceholder ? name[1] : "null";
  return [fnName, ...genMulti(["(", ")", ", ", placeholder], ...frags)];
}
function codeFragmentToString(code, context) {
  const {
    options: { filename, sourceMap }
  } = context;
  let map;
  if (sourceMap) {
    map = new sourceMapExports.SourceMapGenerator();
    map.setSourceContent(filename, context.ir.source);
    map._sources.add(filename);
  }
  let codegen = "";
  const pos = { line: 1, column: 1, offset: 0 };
  let indentLevel = 0;
  for (let frag of code) {
    if (!frag) continue;
    if (frag === NEWLINE) {
      frag = [`
${`  `.repeat(indentLevel)}`, 0];
    } else if (frag === INDENT_START) {
      indentLevel++;
      continue;
    } else if (frag === INDENT_END) {
      indentLevel--;
      continue;
    } else if (frag === LF) {
      pos.line++;
      pos.column = 0;
      pos.offset++;
      continue;
    }
    if (isString(frag)) frag = [frag];
    let [code2, newlineIndex = -2, loc, name] = frag;
    codegen += code2;
    if (map) {
      if (loc) addMapping(loc.start, name);
      if (newlineIndex === -3) {
        advancePositionWithMutation(pos, code2);
      } else {
        pos.offset += code2.length;
        if (newlineIndex === -2) {
          pos.column += code2.length;
        } else {
          if (newlineIndex === -1) {
            newlineIndex = code2.length - 1;
          }
          pos.line++;
          pos.column = code2.length - newlineIndex;
        }
      }
      if (loc && loc !== locStub) {
        addMapping(loc.end);
      }
    }
  }
  return [codegen, map];
  function addMapping(loc, name = null) {
    const { _names, _mappings } = map;
    if (name !== null && !_names.has(name)) _names.add(name);
    _mappings.add({
      originalLine: loc.line,
      originalColumn: loc.column - 1,
      // source-map column is 0 based
      generatedLine: pos.line,
      generatedColumn: pos.column - 1,
      source: filename,
      name
    });
  }
}

const IRDynamicPropsKind = {
  "EXPRESSION": 0,
  "0": "EXPRESSION",
  "ATTRIBUTE": 1,
  "1": "ATTRIBUTE"
};
const IRSlotType = {
  "STATIC": 0,
  "0": "STATIC",
  "DYNAMIC": 1,
  "1": "DYNAMIC",
  "LOOP": 2,
  "2": "LOOP",
  "CONDITIONAL": 3,
  "3": "CONDITIONAL",
  "EXPRESSION": 4,
  "4": "EXPRESSION"
};

const IRNodeTypes = {
  "ROOT": 0,
  "0": "ROOT",
  "BLOCK": 1,
  "1": "BLOCK",
  "SET_PROP": 2,
  "2": "SET_PROP",
  "SET_DYNAMIC_PROPS": 3,
  "3": "SET_DYNAMIC_PROPS",
  "SET_TEXT": 4,
  "4": "SET_TEXT",
  "SET_EVENT": 5,
  "5": "SET_EVENT",
  "SET_DYNAMIC_EVENTS": 6,
  "6": "SET_DYNAMIC_EVENTS",
  "SET_HTML": 7,
  "7": "SET_HTML",
  "SET_TEMPLATE_REF": 8,
  "8": "SET_TEMPLATE_REF",
  "INSERT_NODE": 9,
  "9": "INSERT_NODE",
  "PREPEND_NODE": 10,
  "10": "PREPEND_NODE",
  "CREATE_COMPONENT_NODE": 11,
  "11": "CREATE_COMPONENT_NODE",
  "SLOT_OUTLET_NODE": 12,
  "12": "SLOT_OUTLET_NODE",
  "DIRECTIVE": 13,
  "13": "DIRECTIVE",
  "DECLARE_OLD_REF": 14,
  "14": "DECLARE_OLD_REF",
  "IF": 15,
  "15": "IF",
  "FOR": 16,
  "16": "FOR",
  "GET_TEXT_CHILD": 17,
  "17": "GET_TEXT_CHILD"
};
const DynamicFlag = {
  "NONE": 0,
  "0": "NONE",
  "REFERENCED": 1,
  "1": "REFERENCED",
  "NON_TEMPLATE": 2,
  "2": "NON_TEMPLATE",
  "INSERT": 4,
  "4": "INSERT"
};
function isBlockOperation(op) {
  const type = op.type;
  return type === 11 || type === 12 || type === 15 || type === 16;
}

function genInsertNode({ parent, elements, anchor }, { helper }) {
  let element = elements.map((el) => `n${el}`).join(", ");
  if (elements.length > 1) element = `[${element}]`;
  return [
    NEWLINE,
    ...genCall(
      helper("insert"),
      element,
      `n${parent}`,
      anchor === void 0 ? void 0 : `n${anchor}`
    )
  ];
}
function genPrependNode(oper, { helper }) {
  return [
    NEWLINE,
    ...genCall(
      helper("prepend"),
      `n${oper.parent}`,
      ...oper.elements.map((el) => `n${el}`)
    )
  ];
}

function genExpression(node, context, assignment) {
  const { content, ast, isStatic, loc } = node;
  if (isStatic) {
    return [[JSON.stringify(content), -2, loc]];
  }
  if (!node.content.trim() || // there was a parsing error
  ast === false || isConstantExpression(node)) {
    return [[content, -2, loc], assignment && ` = ${assignment}`];
  }
  if (ast === null) {
    return genIdentifier(content, context, loc, assignment);
  }
  const ids = [];
  const parentStackMap = /* @__PURE__ */ new Map();
  const parentStack = [];
  walkIdentifiers(
    ast,
    (id) => {
      ids.push(id);
      parentStackMap.set(id, parentStack.slice());
    },
    false,
    parentStack
  );
  let hasMemberExpression = false;
  if (ids.length) {
    const [frag, push] = buildCodeFragment();
    const isTSNode = ast && TS_NODE_TYPES.includes(ast.type);
    ids.sort((a, b) => a.start - b.start).forEach((id, i) => {
      const start = id.start - 1;
      const end = id.end - 1;
      const last = ids[i - 1];
      if (!(isTSNode && i === 0)) {
        const leadingText = content.slice(last ? last.end - 1 : 0, start);
        if (leadingText.length) push([leadingText, -3]);
      }
      const source = content.slice(start, end);
      const parentStack2 = parentStackMap.get(id);
      const parent = parentStack2[parentStack2.length - 1];
      hasMemberExpression || (hasMemberExpression = parent && (parent.type === "MemberExpression" || parent.type === "OptionalMemberExpression"));
      push(
        ...genIdentifier(
          source,
          context,
          {
            start: advancePositionWithClone(node.loc.start, source, start),
            end: advancePositionWithClone(node.loc.start, source, end),
            source
          },
          hasMemberExpression ? void 0 : assignment,
          id,
          parent,
          parentStack2
        )
      );
      if (i === ids.length - 1 && end < content.length && !isTSNode) {
        push([content.slice(end), -3]);
      }
    });
    if (assignment && hasMemberExpression) {
      push(` = ${assignment}`);
    }
    return frag;
  } else {
    return [[content, -3, loc]];
  }
}
function genIdentifier(raw, context, loc, assignment, id, parent, parentStack) {
  const { options, helper, identifiers } = context;
  const { inline, bindingMetadata } = options;
  let name = raw;
  const idMap = identifiers[raw];
  if (idMap && idMap.length) {
    const replacement = idMap[0];
    if (isString(replacement)) {
      if (parent && parent.type === "ObjectProperty" && parent.shorthand) {
        return [[`${name}: ${replacement}`, -2, loc]];
      } else {
        return [[replacement, -2, loc]];
      }
    } else {
      return genExpression(replacement, context, assignment);
    }
  }
  let prefix;
  if (isStaticProperty(parent) && parent.shorthand) {
    prefix = `${raw}: `;
  }
  const type = bindingMetadata && bindingMetadata[raw];
  if (inline) {
    switch (type) {
      case "setup-let":
        name = raw = assignment ? `_isRef(${raw}) ? (${raw}.value = ${assignment}) : (${raw} = ${assignment})` : unref();
        break;
      case "setup-ref":
        name = raw = withAssignment(`${raw}.value`);
        break;
      case "setup-maybe-ref":
        const isDestructureAssignment = parent && isInDestructureAssignment(parent, parentStack || []);
        const isAssignmentLVal = parent && parent.type === "AssignmentExpression" && parent.left === id;
        const isUpdateArg = parent && parent.type === "UpdateExpression" && parent.argument === id;
        raw = isAssignmentLVal || isUpdateArg || isDestructureAssignment ? name = `${raw}.value` : assignment ? `${helper("isRef")}(${raw}) ? (${raw}.value = ${assignment}) : null` : unref();
        break;
      case "props":
        raw = genPropsAccessExp(raw);
        break;
      case "props-aliased":
        raw = genPropsAccessExp(bindingMetadata.__propsAliases[raw]);
        break;
      default:
        raw = withAssignment(raw);
    }
  } else {
    if (canPrefix(raw)) {
      if (type === "props-aliased") {
        raw = `$props['${bindingMetadata.__propsAliases[raw]}']`;
      } else {
        raw = `${type === "props" ? "$props" : "_ctx"}.${raw}`;
      }
    }
    raw = withAssignment(raw);
  }
  return [prefix, [raw, -2, loc, name]];
  function withAssignment(s) {
    return assignment ? `${s} = ${assignment}` : s;
  }
  function unref() {
    return `${helper("unref")}(${raw})`;
  }
}
function canPrefix(name) {
  if (isGloballyAllowed(name)) {
    return false;
  }
  if (
    // special case for webpack compilation
    name === "require" || name === "$props" || name === "$emit" || name === "$attrs" || name === "$slots"
  )
    return false;
  return true;
}
function processExpressions(context, expressions) {
  const {
    seenVariable,
    variableToExpMap,
    expToVariableMap,
    seenIdentifier,
    updatedVariable
  } = analyzeExpressions(expressions);
  const varDeclarations = processRepeatedVariables(
    context,
    seenVariable,
    variableToExpMap,
    expToVariableMap,
    seenIdentifier,
    updatedVariable
  );
  const expDeclarations = processRepeatedExpressions(
    context,
    expressions,
    varDeclarations,
    updatedVariable,
    expToVariableMap
  );
  return genDeclarations([...varDeclarations, ...expDeclarations], context);
}
function analyzeExpressions(expressions) {
  const seenVariable = /* @__PURE__ */ Object.create(null);
  const variableToExpMap = /* @__PURE__ */ new Map();
  const expToVariableMap = /* @__PURE__ */ new Map();
  const seenIdentifier = /* @__PURE__ */ new Set();
  const updatedVariable = /* @__PURE__ */ new Set();
  const registerVariable = (name, exp, isIdentifier, loc, parentStack = []) => {
    if (isIdentifier) seenIdentifier.add(name);
    seenVariable[name] = (seenVariable[name] || 0) + 1;
    variableToExpMap.set(
      name,
      (variableToExpMap.get(name) || /* @__PURE__ */ new Set()).add(exp)
    );
    const variables = expToVariableMap.get(exp) || [];
    variables.push({ name, loc });
    expToVariableMap.set(exp, variables);
    if (parentStack.some(
      (p) => p.type === "UpdateExpression" || p.type === "AssignmentExpression"
    )) {
      updatedVariable.add(name);
    }
  };
  for (const exp of expressions) {
    if (!exp.ast) {
      exp.ast === null && registerVariable(exp.content, exp, true);
      continue;
    }
    walkIdentifiers(exp.ast, (currentNode, parent, parentStack) => {
      if (parent && isMemberExpression(parent)) {
        const memberExp = extractMemberExpression(parent, (id) => {
          registerVariable(id.name, exp, true, {
            start: id.start,
            end: id.end
          });
        });
        registerVariable(
          memberExp,
          exp,
          false,
          { start: parent.start, end: parent.end },
          parentStack
        );
      } else if (!parentStack.some(isMemberExpression)) {
        registerVariable(
          currentNode.name,
          exp,
          true,
          { start: currentNode.start, end: currentNode.end },
          parentStack
        );
      }
    });
  }
  return {
    seenVariable,
    seenIdentifier,
    variableToExpMap,
    expToVariableMap,
    updatedVariable
  };
}
function processRepeatedVariables(context, seenVariable, variableToExpMap, expToVariableMap, seenIdentifier, updatedVariable) {
  const declarations = [];
  const expToReplacementMap = /* @__PURE__ */ new Map();
  for (const [name, exps] of variableToExpMap) {
    if (updatedVariable.has(name)) continue;
    if (seenVariable[name] > 1 && exps.size > 0) {
      const isIdentifier = seenIdentifier.has(name);
      const varName = isIdentifier ? name : genVarName(name);
      exps.forEach((node) => {
        if (node.ast && varName !== name) {
          const replacements = expToReplacementMap.get(node) || [];
          replacements.push({
            name: varName,
            locs: expToVariableMap.get(node).reduce(
              (locs, v) => {
                if (v.name === name && v.loc) locs.push(v.loc);
                return locs;
              },
              []
            )
          });
          expToReplacementMap.set(node, replacements);
        }
      });
      if (!declarations.some((d) => d.name === varName) && (!isIdentifier || shouldDeclareVariable(name, expToVariableMap, exps))) {
        declarations.push({
          name: varName,
          isIdentifier,
          value: extend(
            { ast: isIdentifier ? null : parseExp(context, name) },
            createSimpleExpression(name)
          ),
          rawName: name,
          exps,
          seenCount: seenVariable[name]
        });
      }
    }
  }
  for (const [exp, replacements] of expToReplacementMap) {
    replacements.flatMap(
      ({ name, locs }) => locs.map(({ start, end }) => ({ start, end, name }))
    ).sort((a, b) => b.end - a.end).forEach(({ start, end, name }) => {
      exp.content = exp.content.slice(0, start - 1) + name + exp.content.slice(end - 1);
    });
    exp.ast = parseExp(context, exp.content);
  }
  return declarations;
}
function shouldDeclareVariable(name, expToVariableMap, exps) {
  const vars = Array.from(
    exps,
    (exp) => expToVariableMap.get(exp).map((v) => v.name)
  );
  if (vars.every((v) => v.length === 1)) {
    return true;
  }
  if (vars.some((v) => v.filter((e) => e === name).length > 1)) {
    return true;
  }
  const first = vars[0];
  if (vars.some((v) => v.length !== first.length)) {
    if (vars.some(
      (v) => v.length > first.length && v.every((e) => first.includes(e))
    ) || vars.some((v) => first.length > v.length && first.every((e) => v.includes(e)))) {
      return false;
    }
    return true;
  }
  if (vars.some((v) => v.some((e) => first.includes(e)))) {
    return false;
  }
  return true;
}
function processRepeatedExpressions(context, expressions, varDeclarations, updatedVariable, expToVariableMap) {
  const declarations = [];
  const seenExp = expressions.reduce(
    (acc, exp) => {
      const variables = expToVariableMap.get(exp).map((v) => v.name);
      if (exp.ast && exp.ast.type !== "Identifier" && !(variables && variables.some((v) => updatedVariable.has(v)))) {
        acc[exp.content] = (acc[exp.content] || 0) + 1;
      }
      return acc;
    },
    /* @__PURE__ */ Object.create(null)
  );
  Object.entries(seenExp).forEach(([content, count]) => {
    if (count > 1) {
      const varName = genVarName(content);
      if (!declarations.some((d) => d.name === varName)) {
        const delVars = {};
        for (let i = varDeclarations.length - 1; i >= 0; i--) {
          const item = varDeclarations[i];
          if (!item.exps || !item.seenCount) continue;
          const shouldRemove = [...item.exps].every(
            (node) => node.content === content && item.seenCount === count
          );
          if (shouldRemove) {
            delVars[item.name] = item.rawName;
            varDeclarations.splice(i, 1);
          }
        }
        const value = extend(
          {},
          expressions.find((exp) => exp.content === content)
        );
        Object.keys(delVars).forEach((name) => {
          value.content = value.content.replace(name, delVars[name]);
          if (value.ast) value.ast = parseExp(context, value.content);
        });
        declarations.push({
          name: varName,
          value
        });
      }
      expressions.forEach((exp) => {
        if (exp.content === content) {
          exp.content = varName;
          exp.ast = null;
        } else if (exp.content.includes(content)) {
          exp.content = exp.content.replace(
            new RegExp(escapeRegExp(content), "g"),
            varName
          );
          exp.ast = parseExp(context, exp.content);
        }
      });
    }
  });
  return declarations;
}
function genDeclarations(declarations, context) {
  const [frag, push] = buildCodeFragment();
  const ids = /* @__PURE__ */ Object.create(null);
  declarations.forEach(({ name, isIdentifier, value }) => {
    if (isIdentifier) {
      const varName = ids[name] = `_${name}`;
      push(`const ${varName} = `, ...genExpression(value, context), NEWLINE);
    }
  });
  declarations.forEach(({ name, isIdentifier, value }) => {
    if (!isIdentifier) {
      const varName = ids[name] = `_${name}`;
      push(
        `const ${varName} = `,
        ...context.withId(() => genExpression(value, context), ids),
        NEWLINE
      );
    }
  });
  return { ids, frag };
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function parseExp(context, content) {
  const plugins = context.options.expressionPlugins;
  const options = {
    plugins: plugins ? [...plugins, "typescript"] : ["typescript"]
  };
  return libExports.parseExpression(`(${content})`, options);
}
function genVarName(exp) {
  return `${exp.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_").replace(/_+$/, "")}`;
}
function extractMemberExpression(exp, onIdentifier) {
  if (!exp) return "";
  switch (exp.type) {
    case "Identifier":
      onIdentifier(exp);
      return exp.name;
    case "StringLiteral":
      return exp.extra ? exp.extra.raw : exp.value;
    case "NumericLiteral":
      return exp.value.toString();
    case "BinaryExpression":
      return `${extractMemberExpression(exp.left, onIdentifier)} ${exp.operator} ${extractMemberExpression(exp.right, onIdentifier)}`;
    case "CallExpression":
      return `${extractMemberExpression(exp.callee, onIdentifier)}(${exp.arguments.map((arg) => extractMemberExpression(arg, onIdentifier)).join(", ")})`;
    case "MemberExpression":
    // foo[bar.baz]
    case "OptionalMemberExpression":
      const object = extractMemberExpression(exp.object, onIdentifier);
      const prop = exp.computed ? `[${extractMemberExpression(exp.property, onIdentifier)}]` : `.${extractMemberExpression(exp.property, NOOP)}`;
      return `${object}${prop}`;
    default:
      return "";
  }
}
const isMemberExpression = (node) => {
  return node.type === "MemberExpression" || node.type === "OptionalMemberExpression";
};

function genSetEvent(oper, context) {
  const { helper } = context;
  const { element, key, keyOverride, value, modifiers, delegate, effect } = oper;
  const name = genName();
  const handler = genEventHandler(context, value, modifiers);
  const eventOptions = genEventOptions();
  if (delegate) {
    context.delegates.add(key.content);
    if (!context.block.operation.some(isSameDelegateEvent)) {
      return [NEWLINE, `n${element}.$evt${key.content} = `, ...handler];
    }
  }
  return [
    NEWLINE,
    ...genCall(
      helper(delegate ? "delegate" : "on"),
      `n${element}`,
      name,
      handler,
      eventOptions
    )
  ];
  function genName() {
    const expr = genExpression(key, context);
    if (keyOverride) {
      const find = JSON.stringify(keyOverride[0]);
      const replacement = JSON.stringify(keyOverride[1]);
      const wrapped = ["(", ...expr, ")"];
      return [...wrapped, ` === ${find} ? ${replacement} : `, ...wrapped];
    } else {
      return genExpression(key, context);
    }
  }
  function genEventOptions() {
    let { options } = modifiers;
    if (!options.length && !effect) return;
    return genMulti(
      DELIMITERS_OBJECT_NEWLINE,
      effect && ["effect: true"],
      ...options.map((option) => [`${option}: true`])
    );
  }
  function isSameDelegateEvent(op) {
    if (op.type === 5 && op !== oper && op.delegate && op.element === oper.element && op.key.content === key.content) {
      return true;
    }
  }
}
function genSetDynamicEvents(oper, context) {
  const { helper } = context;
  return [
    NEWLINE,
    ...genCall(
      helper("setDynamicEvents"),
      `n${oper.element}`,
      genExpression(oper.event, context)
    )
  ];
}
function genEventHandler(context, value, modifiers = { nonKeys: [], keys: [] }, extraWrap = false) {
  let handlerExp = [`() => {}`];
  if (value && value.content.trim()) {
    if (isMemberExpression$1(value, context.options)) {
      handlerExp = genExpression(value, context);
      if (!isConstantBinding(value, context) && !extraWrap) {
        handlerExp = [`e => `, ...handlerExp, `(e)`];
      }
    } else if (isFnExpression(value, context.options)) {
      handlerExp = genExpression(value, context);
    } else {
      const referencesEvent = value.content.includes("$event");
      const hasMultipleStatements = value.content.includes(`;`);
      const expr = referencesEvent ? context.withId(() => genExpression(value, context), {
        $event: null
      }) : genExpression(value, context);
      handlerExp = [
        referencesEvent ? "$event => " : "() => ",
        hasMultipleStatements ? "{" : "(",
        ...expr,
        hasMultipleStatements ? "}" : ")"
      ];
    }
  }
  const { keys, nonKeys } = modifiers;
  if (nonKeys.length)
    handlerExp = genWithModifiers(context, handlerExp, nonKeys);
  if (keys.length) handlerExp = genWithKeys(context, handlerExp, keys);
  if (extraWrap) handlerExp.unshift(`() => `);
  return handlerExp;
}
function genWithModifiers(context, handler, nonKeys) {
  return genCall(
    context.helper("withModifiers"),
    handler,
    JSON.stringify(nonKeys)
  );
}
function genWithKeys(context, handler, keys) {
  return genCall(context.helper("withKeys"), handler, JSON.stringify(keys));
}
function isConstantBinding(value, context) {
  if (value.ast === null) {
    const bindingType = context.options.bindingMetadata[value.content];
    if (bindingType === "setup-const") {
      return true;
    }
  }
}

function genFor(oper, context) {
  const { helper } = context;
  const {
    source,
    value,
    key,
    index,
    render,
    keyProp,
    once,
    id,
    component,
    onlyChild
  } = oper;
  let rawValue = null;
  const rawKey = key && key.content;
  const rawIndex = index && index.content;
  const sourceExpr = ["() => (", ...genExpression(source, context), ")"];
  const idToPathMap = parseValueDestructure();
  const [depth, exitScope] = context.enterScope();
  const idMap = {};
  const itemVar = `_for_item${depth}`;
  idMap[itemVar] = null;
  idToPathMap.forEach((pathInfo, id2) => {
    let path = `${itemVar}.value${pathInfo ? pathInfo.path : ""}`;
    if (pathInfo) {
      if (pathInfo.helper) {
        idMap[pathInfo.helper] = null;
        path = `${pathInfo.helper}(${path}, ${pathInfo.helperArgs})`;
      }
      if (pathInfo.dynamic) {
        const node = idMap[id2] = createSimpleExpression(path);
        const plugins = context.options.expressionPlugins;
        node.ast = libExports.parseExpression(`(${path})`, {
          plugins: plugins ? [...plugins, "typescript"] : ["typescript"]
        });
      } else {
        idMap[id2] = path;
      }
    } else {
      idMap[id2] = path;
    }
  });
  const args = [itemVar];
  if (rawKey) {
    const keyVar = `_for_key${depth}`;
    args.push(`, ${keyVar}`);
    idMap[rawKey] = `${keyVar}.value`;
    idMap[keyVar] = null;
  }
  if (rawIndex) {
    const indexVar = `_for_index${depth}`;
    args.push(`, ${indexVar}`);
    idMap[rawIndex] = `${indexVar}.value`;
    idMap[indexVar] = null;
  }
  const blockFn = context.withId(() => genBlock(render, context, args), idMap);
  exitScope();
  let flags = 0;
  if (onlyChild) {
    flags |= 1;
  }
  if (component) {
    flags |= 2;
  }
  if (once) {
    flags |= 4;
  }
  return [
    NEWLINE,
    `const n${id} = `,
    ...genCall(
      helper("createFor"),
      sourceExpr,
      blockFn,
      genCallback(keyProp),
      flags ? String(flags) : void 0
      // todo: hydrationNode
    )
  ];
  function parseValueDestructure() {
    const map = /* @__PURE__ */ new Map();
    if (value) {
      rawValue = value && value.content;
      if (value.ast) {
        walkIdentifiers(
          value.ast,
          (id2, _, parentStack, ___, isLocal) => {
            if (isLocal) {
              let path = "";
              let isDynamic = false;
              let helper2;
              let helperArgs;
              for (let i = 0; i < parentStack.length; i++) {
                const parent = parentStack[i];
                const child = parentStack[i + 1] || id2;
                if (parent.type === "ObjectProperty" && parent.value === child) {
                  if (parent.key.type === "StringLiteral") {
                    path += `[${JSON.stringify(parent.key.value)}]`;
                  } else if (parent.computed) {
                    isDynamic = true;
                    path += `[${value.content.slice(
                      parent.key.start - 1,
                      parent.key.end - 1
                    )}]`;
                  } else {
                    path += `.${parent.key.name}`;
                  }
                } else if (parent.type === "ArrayPattern") {
                  const index2 = parent.elements.indexOf(child);
                  if (child.type === "RestElement") {
                    path += `.slice(${index2})`;
                  } else {
                    path += `[${index2}]`;
                  }
                } else if (parent.type === "ObjectPattern" && child.type === "RestElement") {
                  helper2 = context.helper("getRestElement");
                  helperArgs = "[" + parent.properties.filter((p) => p.type === "ObjectProperty").map((p) => {
                    if (p.key.type === "StringLiteral") {
                      return JSON.stringify(p.key.value);
                    } else if (p.computed) {
                      isDynamic = true;
                      return value.content.slice(
                        p.key.start - 1,
                        p.key.end - 1
                      );
                    } else {
                      return JSON.stringify(p.key.name);
                    }
                  }).join(", ") + "]";
                }
                if (child.type === "AssignmentPattern" && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
                  isDynamic = true;
                  helper2 = context.helper("getDefaultValue");
                  helperArgs = value.content.slice(
                    child.right.start - 1,
                    child.right.end - 1
                  );
                }
              }
              map.set(id2.name, { path, dynamic: isDynamic, helper: helper2, helperArgs });
            }
          },
          true
        );
      } else {
        map.set(rawValue, null);
      }
    }
    return map;
  }
  function genCallback(expr) {
    if (!expr) return false;
    const res = context.withId(
      () => genExpression(expr, context),
      genSimpleIdMap()
    );
    return [
      ...genMulti(
        ["(", ")", ", "],
        rawValue ? rawValue : rawKey || rawIndex ? "_" : void 0,
        rawKey ? rawKey : rawIndex ? "__" : void 0,
        rawIndex
      ),
      " => (",
      ...res,
      ")"
    ];
  }
  function genSimpleIdMap() {
    const idMap2 = {};
    if (rawKey) idMap2[rawKey] = null;
    if (rawIndex) idMap2[rawIndex] = null;
    idToPathMap.forEach((_, id2) => idMap2[id2] = null);
    return idMap2;
  }
}

function genSetHtml(oper, context) {
  const { helper } = context;
  const { value, element } = oper;
  return [
    NEWLINE,
    ...genCall(helper("setHtml"), `n${element}`, genExpression(value, context))
  ];
}

function genIf(oper, context, isNested = false) {
  const { helper } = context;
  const { condition, positive, negative, once } = oper;
  const [frag, push] = buildCodeFragment();
  const conditionExpr = [
    "() => (",
    ...genExpression(condition, context),
    ")"
  ];
  let positiveArg = genBlock(positive, context);
  let negativeArg = false;
  if (negative) {
    if (negative.type === 1) {
      negativeArg = genBlock(negative, context);
    } else {
      negativeArg = ["() => ", ...genIf(negative, context, true)];
    }
  }
  if (!isNested) push(NEWLINE, `const n${oper.id} = `);
  push(
    ...genCall(
      helper("createIf"),
      conditionExpr,
      positiveArg,
      negativeArg,
      once && "true"
    )
  );
  return frag;
}

const helpers = {
  setText: { name: "setText" },
  setHtml: { name: "setHtml" },
  setClass: { name: "setClass" },
  setStyle: { name: "setStyle" },
  setValue: { name: "setValue" },
  setAttr: { name: "setAttr", needKey: true },
  setProp: { name: "setProp", needKey: true },
  setDOMProp: { name: "setDOMProp", needKey: true }};
function genSetProp(oper, context) {
  const { helper } = context;
  const {
    prop: { key, values, modifier },
    tag
  } = oper;
  const resolvedHelper = getRuntimeHelper(tag, key.content, modifier);
  const propValue = genPropValue(values, context);
  return [
    NEWLINE,
    ...genCall(
      [helper(resolvedHelper.name), null],
      `n${oper.element}`,
      resolvedHelper.needKey ? genExpression(key, context) : false,
      propValue
    )
  ];
}
function genDynamicProps$1(oper, context) {
  const { helper } = context;
  const values = oper.props.map(
    (props) => Array.isArray(props) ? genLiteralObjectProps(props, context) : props.kind === 1 ? genLiteralObjectProps([props], context) : genExpression(props.value, context)
  );
  return [
    NEWLINE,
    ...genCall(
      helper("setDynamicProps"),
      `n${oper.element}`,
      genMulti(DELIMITERS_ARRAY, ...values),
      oper.root && "true"
    )
  ];
}
function genLiteralObjectProps(props, context) {
  return genMulti(
    DELIMITERS_OBJECT,
    ...props.map((prop) => [
      ...genPropKey(prop, context),
      `: `,
      ...genPropValue(prop.values, context)
    ])
  );
}
function genPropKey({ key: node, modifier, runtimeCamelize, handler, handlerModifiers }, context) {
  const { helper } = context;
  const handlerModifierPostfix = handlerModifiers ? handlerModifiers.map(capitalize).join("") : "";
  if (node.isStatic) {
    const keyName = (handler ? toHandlerKey(node.content) : node.content) + handlerModifierPostfix;
    return [
      [
        isSimpleIdentifier(keyName) ? keyName : JSON.stringify(keyName),
        -2,
        node.loc
      ]
    ];
  }
  let key = genExpression(node, context);
  if (runtimeCamelize) {
    key = genCall(helper("camelize"), key);
  }
  if (handler) {
    key = genCall(helper("toHandlerKey"), key);
  }
  return [
    "[",
    modifier && `${JSON.stringify(modifier)} + `,
    ...key,
    handlerModifierPostfix ? ` + ${JSON.stringify(handlerModifierPostfix)}` : void 0,
    "]"
  ];
}
function genPropValue(values, context) {
  if (values.length === 1) {
    return genExpression(values[0], context);
  }
  return genMulti(
    DELIMITERS_ARRAY,
    ...values.map((expr) => genExpression(expr, context))
  );
}
function getRuntimeHelper(tag, key, modifier) {
  const tagName = tag.toUpperCase();
  if (modifier) {
    if (modifier === ".") {
      return getSpecialHelper(key, tagName) || helpers.setDOMProp;
    } else {
      return helpers.setAttr;
    }
  }
  const helper = getSpecialHelper(key, tagName);
  if (helper) {
    return helper;
  }
  if (/aria[A-Z]/.test(key)) {
    return helpers.setDOMProp;
  }
  if (isSVGTag(tag)) {
    return helpers.setAttr;
  }
  if (shouldSetAsAttr(tagName, key) || key.includes("-")) {
    return helpers.setAttr;
  }
  return helpers.setProp;
}
function getSpecialHelper(keyName, tagName) {
  if (keyName === "value" && canSetValueDirectly(tagName)) {
    return helpers.setValue;
  } else if (keyName === "class") {
    return helpers.setClass;
  } else if (keyName === "style") {
    return helpers.setStyle;
  } else if (keyName === "innerHTML") {
    return helpers.setHtml;
  } else if (keyName === "textContent") {
    return helpers.setText;
  }
}

const setTemplateRefIdent = `_setTemplateRef`;
function genSetTemplateRef(oper, context) {
  return [
    NEWLINE,
    oper.effect && `r${oper.element} = `,
    ...genCall(
      setTemplateRefIdent,
      // will be generated in root scope
      `n${oper.element}`,
      genRefValue(oper.value, context),
      oper.effect ? `r${oper.element}` : oper.refFor ? "void 0" : void 0,
      oper.refFor && "true"
    )
  ];
}
function genDeclareOldRef(oper) {
  return [NEWLINE, `let r${oper.id}`];
}
function genRefValue(value, context) {
  if (value && context.options.inline) {
    const binding = context.options.bindingMetadata[value.content];
    if (binding === "setup-let" || binding === "setup-ref" || binding === "setup-maybe-ref") {
      return [value.content];
    }
  }
  return genExpression(value, context);
}

function genSetText(oper, context) {
  const { helper } = context;
  const { element, values, generated, jsx } = oper;
  const texts = combineValues(values, context, jsx);
  return [
    NEWLINE,
    ...genCall(helper("setText"), `${generated ? "x" : "n"}${element}`, texts)
  ];
}
function combineValues(values, context, jsx) {
  return values.flatMap((value, i) => {
    let exp = genExpression(value, context);
    if (!jsx && getLiteralExpressionValue(value) == null) {
      exp = genCall(context.helper("toDisplayString"), exp);
    }
    if (i > 0) {
      exp.unshift(jsx ? ", " : " + ");
    }
    return exp;
  });
}
function genGetTextChild(oper, context) {
  return [
    NEWLINE,
    `const x${oper.parent} = ${context.helper("child")}(n${oper.parent})`
  ];
}

function genVShow(oper, context) {
  return [
    NEWLINE,
    ...genCall(context.helper("applyVShow"), `n${oper.element}`, [
      `() => (`,
      ...genExpression(oper.dir.exp, context),
      `)`
    ])
  ];
}

const helperMap = {
  text: "applyTextModel",
  radio: "applyRadioModel",
  checkbox: "applyCheckboxModel",
  select: "applySelectModel",
  dynamic: "applyDynamicModel"
};
function genVModel(oper, context) {
  const {
    modelType,
    element,
    dir: { exp, modifiers }
  } = oper;
  return [
    NEWLINE,
    ...genCall(
      context.helper(helperMap[modelType]),
      `n${element}`,
      // getter
      [`() => (`, ...genExpression(exp, context), `)`],
      // setter
      genModelHandler(exp, context),
      // modifiers
      modifiers.length ? `{ ${modifiers.map((e) => e.content + ": true").join(",")} }` : void 0
    )
  ];
}
function genModelHandler(exp, context) {
  return [
    `${context.options.isTS ? `(_value: any)` : `_value`} => (`,
    ...genExpression(exp, context, "_value"),
    ")"
  ];
}

function genBuiltinDirective(oper, context) {
  switch (oper.name) {
    case "show":
      return genVShow(oper, context);
    case "model":
      return genVModel(oper, context);
    default:
      return [];
  }
}
function genDirectivesForElement(id, context) {
  const dirs = filterCustomDirectives(id, context.block.operation);
  return dirs.length ? genCustomDirectives(dirs, context) : [];
}
function genCustomDirectives(opers, context) {
  const { helper } = context;
  const element = `n${opers[0].element}`;
  const directiveItems = opers.map(genDirectiveItem);
  const directives = genMulti(DELIMITERS_ARRAY, ...directiveItems);
  return [
    NEWLINE,
    ...genCall(helper("withVaporDirectives"), element, directives)
  ];
  function genDirectiveItem({
    dir,
    name,
    asset
  }) {
    const directiveVar = asset ? toValidAssetId(name, "directive") : genExpression(
      extend(createSimpleExpression(name, false), { ast: null }),
      context
    );
    const value = dir.exp && ["() => ", ...genExpression(dir.exp, context)];
    const argument = dir.arg && genExpression(dir.arg, context);
    const modifiers = !!dir.modifiers.length && [
      "{ ",
      genDirectiveModifiers(dir.modifiers.map((m) => m.content)),
      " }"
    ];
    return genMulti(
      DELIMITERS_ARRAY.concat("void 0"),
      directiveVar,
      value,
      argument,
      modifiers
    );
  }
}
function genDirectiveModifiers(modifiers) {
  return modifiers.map(
    (value) => `${isSimpleIdentifier(value) ? value : JSON.stringify(value)}: true`
  ).join(", ");
}
function filterCustomDirectives(id, operations) {
  return operations.filter(
    (oper) => oper.type === 13 && oper.element === id && !oper.builtin
  );
}

function genCreateComponent(operation, context) {
  const { helper } = context;
  const tag = genTag();
  const { root, props, slots, once } = operation;
  const rawSlots = genRawSlots(slots, context);
  const [ids, handlers] = processInlineHandlers(props, context);
  const rawProps = context.withId(() => genRawProps(props, context), ids);
  const inlineHandlers = handlers.reduce(
    (acc, { name, value }) => {
      const handler = genEventHandler(context, value, void 0, false);
      return [...acc, `const ${name} = `, ...handler, NEWLINE];
    },
    []
  );
  return [
    NEWLINE,
    ...inlineHandlers,
    `const n${operation.id} = `,
    ...genCall(
      operation.dynamic && !operation.dynamic.isStatic ? helper("createDynamicComponent") : operation.asset ? helper("createComponentWithFallback") : helper("createComponent"),
      tag,
      rawProps,
      rawSlots,
      root ? "true" : false,
      once && "true"
    ),
    ...genDirectivesForElement(operation.id, context)
  ];
  function genTag() {
    if (operation.dynamic) {
      if (operation.dynamic.isStatic) {
        return genCall(
          helper("resolveDynamicComponent"),
          genExpression(operation.dynamic, context)
        );
      } else {
        return ["() => (", ...genExpression(operation.dynamic, context), ")"];
      }
    } else if (operation.asset) {
      return toValidAssetId(operation.tag, "component");
    } else {
      return genExpression(
        extend(createSimpleExpression(operation.tag, false), { ast: null }),
        context
      );
    }
  }
}
function getUniqueHandlerName(context, name) {
  const { seenInlineHandlerNames } = context;
  const count = seenInlineHandlerNames[name] || 0;
  seenInlineHandlerNames[name] = count + 1;
  return count === 0 ? name : `${name}${count}`;
}
function processInlineHandlers(props, context) {
  const ids = /* @__PURE__ */ Object.create(null);
  const handlers = [];
  const staticProps = props[0];
  if (isArray(staticProps)) {
    for (let i = 0; i < staticProps.length; i++) {
      const prop = staticProps[i];
      if (!prop.handler) continue;
      prop.values.forEach((value, i2) => {
        const isMemberExp = isMemberExpression$1(value, context.options);
        if (!isMemberExp) {
          const name = getUniqueHandlerName(context, `_on_${prop.key.content}`);
          handlers.push({ name, value });
          ids[name] = null;
          prop.values[i2] = extend({ ast: null }, createSimpleExpression(name));
        }
      });
    }
  }
  return [ids, handlers];
}
function genRawProps(props, context) {
  const staticProps = props[0];
  if (isArray(staticProps)) {
    if (!staticProps.length && props.length === 1) {
      return;
    }
    return genStaticProps(
      staticProps,
      context,
      genDynamicProps(props.slice(1), context)
    );
  } else if (props.length) {
    return genStaticProps([], context, genDynamicProps(props, context));
  }
}
function genStaticProps(props, context, dynamicProps) {
  const args = props.map((prop) => genProp(prop, context, true));
  if (dynamicProps) {
    args.push([`$: `, ...dynamicProps]);
  }
  return genMulti(
    args.length > 1 ? DELIMITERS_OBJECT_NEWLINE : DELIMITERS_OBJECT,
    ...args
  );
}
function genDynamicProps(props, context) {
  const { helper } = context;
  const frags = [];
  for (const p of props) {
    let expr;
    if (isArray(p)) {
      if (p.length) {
        frags.push(genStaticProps(p, context));
      }
      continue;
    } else {
      if (p.kind === 1)
        expr = genMulti(DELIMITERS_OBJECT, genProp(p, context));
      else {
        expr = genExpression(p.value, context);
        if (p.handler) expr = genCall(helper("toHandlers"), expr);
      }
    }
    frags.push(["() => (", ...expr, ")"]);
  }
  if (frags.length) {
    return genMulti(DELIMITERS_ARRAY_NEWLINE, ...frags);
  }
}
function genProp(prop, context, isStatic) {
  const values = genPropValue(prop.values, context);
  return [
    ...genPropKey(prop, context),
    ": ",
    ...prop.handler ? genEventHandler(
      context,
      prop.values[0],
      void 0,
      true
    ) : isStatic ? ["() => (", ...values, ")"] : values,
    ...prop.model ? [...genModelEvent(prop, context), ...genModelModifiers(prop, context)] : []
  ];
}
function genModelEvent(prop, context) {
  const name = prop.key.isStatic ? [JSON.stringify(`onUpdate:${camelize(prop.key.content)}`)] : ['["onUpdate:" + ', ...genExpression(prop.key, context), "]"];
  const handler = genModelHandler(prop.values[0], context);
  return [",", NEWLINE, ...name, ": () => ", ...handler];
}
function genModelModifiers(prop, context) {
  const { key, modelModifiers } = prop;
  if (!modelModifiers || !modelModifiers.length) return [];
  const modifiersKey = key.isStatic ? key.content === "modelValue" ? [`modelModifiers`] : [`${key.content}Modifiers`] : ["[", ...genExpression(key, context), ' + "Modifiers"]'];
  const modifiersVal = genDirectiveModifiers(modelModifiers);
  return [",", NEWLINE, ...modifiersKey, `: () => ({ ${modifiersVal} })`];
}
function genRawSlots(slots, context) {
  if (!slots.length) return;
  const staticSlots = slots[0];
  if (staticSlots.slotType === 0) {
    return genStaticSlots(
      staticSlots,
      context,
      slots.length > 1 ? slots.slice(1) : void 0
    );
  } else {
    return genStaticSlots(
      { slots: {} },
      context,
      slots
    );
  }
}
function genStaticSlots({ slots }, context, dynamicSlots) {
  const args = Object.keys(slots).map((name) => [
    `${JSON.stringify(name)}: `,
    ...genSlotBlockWithProps(slots[name], context)
  ]);
  if (dynamicSlots) {
    args.push([`$: `, ...genDynamicSlots(dynamicSlots, context)]);
  }
  return genMulti(DELIMITERS_OBJECT_NEWLINE, ...args);
}
function genDynamicSlots(slots, context) {
  return genMulti(
    DELIMITERS_ARRAY_NEWLINE,
    ...slots.map(
      (slot) => slot.slotType === 0 ? genStaticSlots(slot, context) : slot.slotType === 4 ? slot.slots.content : genDynamicSlot(slot, context, true)
    )
  );
}
function genDynamicSlot(slot, context, withFunction = false) {
  let frag;
  switch (slot.slotType) {
    case 1:
      frag = genBasicDynamicSlot(slot, context);
      break;
    case 2:
      frag = genLoopSlot(slot, context);
      break;
    case 3:
      frag = genConditionalSlot(slot, context);
      break;
  }
  return withFunction ? ["() => (", ...frag, ")"] : frag;
}
function genBasicDynamicSlot(slot, context) {
  const { name, fn } = slot;
  return genMulti(
    DELIMITERS_OBJECT_NEWLINE,
    ["name: ", ...genExpression(name, context)],
    ["fn: ", ...genSlotBlockWithProps(fn, context)]
  );
}
function genLoopSlot(slot, context) {
  const { name, fn, loop } = slot;
  const { value, key, index, source } = loop;
  const rawValue = value && value.content;
  const rawKey = key && key.content;
  const rawIndex = index && index.content;
  const idMap = {};
  if (rawValue) idMap[rawValue] = rawValue;
  if (rawKey) idMap[rawKey] = rawKey;
  if (rawIndex) idMap[rawIndex] = rawIndex;
  const slotExpr = genMulti(
    DELIMITERS_OBJECT_NEWLINE,
    ["name: ", ...context.withId(() => genExpression(name, context), idMap)],
    [
      "fn: ",
      ...context.withId(() => genSlotBlockWithProps(fn, context), idMap)
    ]
  );
  return [
    ...genCall(
      context.helper("createForSlots"),
      genExpression(source, context),
      [
        ...genMulti(
          ["(", ")", ", "],
          rawValue ? rawValue : rawKey || rawIndex ? "_" : void 0,
          rawKey ? rawKey : rawIndex ? "__" : void 0,
          rawIndex
        ),
        " => (",
        ...slotExpr,
        ")"
      ]
    )
  ];
}
function genConditionalSlot(slot, context) {
  const { condition, positive, negative } = slot;
  return [
    ...genExpression(condition, context),
    INDENT_START,
    NEWLINE,
    "? ",
    ...genDynamicSlot(positive, context),
    NEWLINE,
    ": ",
    ...negative ? [...genDynamicSlot(negative, context)] : ["void 0"],
    INDENT_END
  ];
}
function genSlotBlockWithProps(oper, context) {
  let isDestructureAssignment = false;
  let rawProps;
  let propsName;
  let exitScope;
  let depth;
  const { props } = oper;
  const idsOfProps = /* @__PURE__ */ new Set();
  if (props) {
    rawProps = props.content;
    if (isDestructureAssignment = !!props.ast) {
      [depth, exitScope] = context.enterScope();
      propsName = `_slotProps${depth}`;
      walkIdentifiers(
        props.ast,
        (id, _, __, ___, isLocal) => {
          if (isLocal) idsOfProps.add(id.name);
        },
        true
      );
    } else {
      idsOfProps.add(propsName = rawProps);
    }
  }
  const idMap = {};
  idsOfProps.forEach(
    (id) => idMap[id] = isDestructureAssignment ? `${propsName}[${JSON.stringify(id)}]` : null
  );
  const blockFn = context.withId(
    () => genBlock(oper, context, [propsName]),
    idMap
  );
  exitScope && exitScope();
  return blockFn;
}

function genSlotOutlet(oper, context) {
  const { helper } = context;
  const { id, name, fallback } = oper;
  const [frag, push] = buildCodeFragment();
  const nameExpr = name.isStatic ? genExpression(name, context) : ["() => (", ...genExpression(name, context), ")"];
  let fallbackArg;
  if (fallback) {
    fallbackArg = genBlock(fallback, context);
  }
  push(
    NEWLINE,
    `const n${id} = `,
    ...genCall(
      helper("createSlot"),
      nameExpr,
      genRawProps(oper.props, context) || "null",
      fallbackArg
    )
  );
  return frag;
}

function genOperations(opers, context) {
  const [frag, push] = buildCodeFragment();
  for (const operation of opers) {
    push(...genOperationWithInsertionState(operation, context));
  }
  return frag;
}
function genOperationWithInsertionState(oper, context) {
  const [frag, push] = buildCodeFragment();
  if (isBlockOperation(oper) && oper.parent) {
    push(...genInsertionState(oper, context));
  }
  push(...genOperation(oper, context));
  return frag;
}
function genOperation(oper, context) {
  switch (oper.type) {
    case 2:
      return genSetProp(oper, context);
    case 3:
      return genDynamicProps$1(oper, context);
    case 4:
      return genSetText(oper, context);
    case 5:
      return genSetEvent(oper, context);
    case 6:
      return genSetDynamicEvents(oper, context);
    case 7:
      return genSetHtml(oper, context);
    case 8:
      return genSetTemplateRef(oper, context);
    case 9:
      return genInsertNode(oper, context);
    case 10:
      return genPrependNode(oper, context);
    case 15:
      return genIf(oper, context);
    case 16:
      return genFor(oper, context);
    case 11:
      return genCreateComponent(oper, context);
    case 14:
      return genDeclareOldRef(oper);
    case 12:
      return genSlotOutlet(oper, context);
    case 13:
      return genBuiltinDirective(oper, context);
    case 17:
      return genGetTextChild(oper, context);
    default:
      const exhaustiveCheck = oper;
      throw new Error(
        `Unhandled operation type in genOperation: ${exhaustiveCheck}`
      );
  }
}
function genEffects(effects, context) {
  const { helper } = context;
  const expressions = effects.flatMap((effect) => effect.expressions);
  const [frag, push, unshift] = buildCodeFragment();
  let operationsCount = 0;
  const { ids, frag: declarationFrags } = processExpressions(
    context,
    expressions
  );
  push(...declarationFrags);
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    operationsCount += effect.operations.length;
    const frags = context.withId(() => genEffect(effect, context), ids);
    i > 0 && push(NEWLINE);
    if (frag[frag.length - 1] === ")" && frags[0] === "(") {
      push(";");
    }
    push(...frags);
  }
  const newLineCount = frag.filter((frag2) => frag2 === NEWLINE).length;
  if (newLineCount > 1 || operationsCount > 1 || declarationFrags.length > 0) {
    unshift(`{`, INDENT_START, NEWLINE);
    push(INDENT_END, NEWLINE, "}");
  }
  if (effects.length) {
    unshift(NEWLINE, `${helper("renderEffect")}(() => `);
    push(`)`);
  }
  return frag;
}
function genEffect({ operations }, context) {
  const [frag, push] = buildCodeFragment();
  const operationsExps = genOperations(operations, context);
  const newlineCount = operationsExps.filter((frag2) => frag2 === NEWLINE).length;
  if (newlineCount > 1) {
    push(...operationsExps);
  } else {
    push(...operationsExps.filter((frag2) => frag2 !== NEWLINE));
  }
  return frag;
}
function genInsertionState(operation, context) {
  return [
    NEWLINE,
    ...genCall(
      context.helper("setInsertionState"),
      `n${operation.parent}`,
      operation.anchor == null ? void 0 : operation.anchor === -1 ? `0` : `n${operation.anchor}`
    )
  ];
}

const COMMENT_START = "<!--";
const COMMENT_END = "-->";
const DOCTYPE_START = "<!";
const WHITESPACE_REGEX = /\s/;
const ATTRIBUTE_NAME_REGEX = /[\s=]/;
const SELF_CLOSING_REGEX = /\s*\/$/;
class HtmlParser {
  constructor(html) {
    this.html = html;
    this.length = html.length;
    this.index = 0;
  }
  /**
   * Parse HTML string into an array of HTML nodes
   */
  parse() {
    const nodes = [];
    this.index = 0;
    while (this.index < this.length) {
      if (this.html[this.index] === "<") {
        const result = this.parseTag();
        if (result) {
          nodes.push(result.node);
          this.index = result.endIndex;
        } else {
          this.index++;
        }
      } else {
        const textNode = this.parseText();
        if (textNode) {
          nodes.push(textNode);
        }
      }
    }
    return nodes;
  }
  // =============================================================================
  // Private Methods - Main Parsing Logic
  // =============================================================================
  /**
   * Parse text content until next tag
   */
  parseText() {
    const start = this.index;
    const nextTag = this.html.indexOf("<", start);
    const end = nextTag === -1 ? this.length : nextTag;
    if (start === end) return null;
    const content = this.html.substring(start, end);
    this.index = end;
    return { type: "text", content };
  }
  /**
   * Parse a tag (element, comment, or doctype)
   */
  parseTag() {
    if (this.html.startsWith(COMMENT_START, this.index)) {
      return this.parseComment();
    }
    if (this.html.startsWith(DOCTYPE_START, this.index)) {
      return this.parseDoctype();
    }
    return this.parseElement();
  }
  /**
   * Parse HTML comment
   */
  parseComment() {
    const start = this.index + COMMENT_START.length;
    const end = this.html.indexOf(COMMENT_END, start);
    if (end === -1) return null;
    const content = this.html.substring(start, end);
    return {
      node: { type: "comment", content },
      endIndex: end + COMMENT_END.length
    };
  }
  /**
   * Parse DOCTYPE and other declarations
   */
  parseDoctype() {
    const end = this.html.indexOf(">", this.index + DOCTYPE_START.length);
    if (end === -1) return null;
    return {
      node: { type: "comment", content: "" },
      endIndex: end + 1
    };
  }
  /**
   * Parse HTML element
   */
  parseElement() {
    const tagEnd = this.html.indexOf(">", this.index);
    if (tagEnd === -1) return null;
    const tagContent = this.html.substring(this.index + 1, tagEnd);
    const { tag, attrs, selfClosing } = this.parseTagContent(tagContent);
    if (selfClosing) {
      return {
        node: { type: "element", tag, attrs, children: [] },
        endIndex: tagEnd + 1
      };
    }
    const endTagIndex = this.findMatchingEndTag(tag, tagEnd + 1);
    if (endTagIndex === -1) {
      return {
        node: { type: "element", tag, attrs, children: [] },
        endIndex: tagEnd + 1
      };
    }
    const innerHtml = this.html.substring(tagEnd + 1, endTagIndex);
    const children = innerHtml ? new HtmlParser(innerHtml).parse() : [];
    return {
      node: { type: "element", tag, attrs, children },
      endIndex: endTagIndex + `</${tag}>`.length
    };
  }
  // =============================================================================
  // Private Methods - Tag Content Parsing
  // =============================================================================
  /**
   * Parse tag content to extract tag name, attributes, and self-closing flag
   */
  parseTagContent(content) {
    const selfClosing = SELF_CLOSING_REGEX.test(content);
    const cleanContent = content.replace(SELF_CLOSING_REGEX, "").trim();
    if (!cleanContent) {
      return { tag: "", attrs: {}, selfClosing };
    }
    const spaceIndex = cleanContent.search(WHITESPACE_REGEX);
    const tag = spaceIndex === -1 ? cleanContent : cleanContent.substring(0, spaceIndex);
    if (spaceIndex === -1) {
      return { tag, attrs: {}, selfClosing };
    }
    const attrContent = cleanContent.substring(spaceIndex + 1);
    const attrs = this.parseAttributes(attrContent);
    return { tag, attrs, selfClosing };
  }
  /**
   * Parse attributes from attribute content string
   */
  parseAttributes(content) {
    const attrs = {};
    let i = 0;
    const length = content.length;
    while (i < length) {
      i = this.skipWhitespace(content, i);
      if (i >= length) break;
      const nameStart = i;
      while (i < length && !ATTRIBUTE_NAME_REGEX.test(content[i])) {
        i++;
      }
      if (i === nameStart) break;
      const name = content.substring(nameStart, i);
      i = this.skipWhitespace(content, i);
      if (i >= length || content[i] !== "=") {
        attrs[name] = name;
        continue;
      }
      i++;
      i = this.skipWhitespace(content, i);
      if (i >= length) {
        attrs[name] = "";
        continue;
      }
      const value = this.parseAttributeValue(content, i);
      attrs[name] = value.value;
      i = value.endIndex;
    }
    return attrs;
  }
  /**
   * Parse attribute value (quoted or unquoted)
   */
  parseAttributeValue(content, startIndex) {
    const quote = content[startIndex];
    if (quote === '"' || quote === "'") {
      const valueStart = startIndex + 1;
      let i = valueStart;
      while (i < content.length && content[i] !== quote) {
        i++;
      }
      const value = content.substring(valueStart, i);
      return {
        value,
        endIndex: i < content.length ? i + 1 : i
        // Skip closing quote if found
      };
    } else {
      const valueStart = startIndex;
      let i = valueStart;
      while (i < content.length && !WHITESPACE_REGEX.test(content[i])) {
        i++;
      }
      const value = content.substring(valueStart, i);
      return { value, endIndex: i };
    }
  }
  // =============================================================================
  // Private Methods - Utilities
  // =============================================================================
  /**
   * Skip whitespace characters starting from index
   */
  skipWhitespace(content, index) {
    while (index < content.length && WHITESPACE_REGEX.test(content[index])) {
      index++;
    }
    return index;
  }
  /**
   * Find matching end tag for given tag name
   */
  findMatchingEndTag(tag, startIndex) {
    const startTag = `<${tag}`;
    const endTag = `</${tag}>`;
    let depth = 1;
    let searchIndex = startIndex;
    while (depth > 0 && searchIndex < this.length) {
      const nextStart = this.html.indexOf(startTag, searchIndex);
      const nextEnd = this.html.indexOf(endTag, searchIndex);
      if (nextEnd === -1) break;
      if (nextStart !== -1 && nextStart < nextEnd) {
        const nextTagEnd = this.html.indexOf(">", nextStart);
        if (nextTagEnd !== -1 && nextTagEnd < nextEnd) {
          const nextTagContent = this.html.substring(nextStart + 1, nextTagEnd);
          if (!SELF_CLOSING_REGEX.test(nextTagContent)) {
            depth++;
          }
        }
        searchIndex = nextTagEnd + 1;
      } else {
        depth--;
        if (depth === 0) {
          return nextEnd;
        }
        searchIndex = nextEnd + endTag.length;
      }
    }
    return -1;
  }
}

class DomCodeGenerator {
  /**
   * 生成节点构造代码
   */
  generateNodeCode(node) {
    switch (node.type) {
      case "text":
        return `doc.createTextNode(${JSON.stringify(node.content || "")})`;
      case "comment":
        return `doc.createComment(${JSON.stringify(node.content || "")})`;
      case "element":
        return this.generateElementCode(node);
      default:
        return `doc.createComment('unknown')`;
    }
  }
  /**
   * 生成元素构造代码
   */
  generateElementCode(node) {
    const { tag, attrs, children } = node;
    const attrsParam = this.generateAttrsParam(attrs);
    const childrenParam = this.generateChildrenParam(children);
    const params = [`'${tag}'`];
    if (attrsParam) {
      params.push(attrsParam);
    } else if (childrenParam) {
      params.push("null");
    }
    if (childrenParam) {
      params.push(childrenParam);
    }
    return `doc.createElement(${params.join(", ")})`;
  }
  /**
   * 生成属性参数
   */
  generateAttrsParam(attrs) {
    if (!attrs || Object.keys(attrs).length === 0) {
      return null;
    }
    const entries = Object.entries(attrs).map(
      ([name, value]) => `['${name}', ${JSON.stringify(value)}]`
    );
    return `new Map([${entries.join(", ")}])`;
  }
  /**
   * 生成子节点参数
   */
  generateChildrenParam(children) {
    if (!children || children.length === 0) {
      return null;
    }
    const childrenCode = children.map((child) => this.generateNodeCode(child));
    return `[${childrenCode.join(", ")}]`;
  }
}
class TemplateFactoryGenerator {
  constructor() {
    this.codeGenerator = new DomCodeGenerator();
  }
  /**
   * 生成工厂函数
   * 统一使用 createElement(tag, attrs, children) 形式
   */
  generateFactoryFunction(template, index) {
    try {
      const parser = new HtmlParser(template);
      const nodes = parser.parse();
      if (nodes.length === 0) {
        return this.generateEmptyFunction(index);
      }
      if (nodes.length === 1) {
        return this.generateSingleNodeFunction(nodes[0], index);
      }
      return this.generateMultiNodeFunction(nodes, index);
    } catch (error) {
      return this.generateEmptyFunction(index);
    }
  }
  /**
   * 生成空函数
   */
  generateEmptyFunction(index) {
    return `function f${index}(doc: IDocument): UniElement {
  return doc.createTextNode('')
}`;
  }
  /**
   * 生成单节点函数
   */
  generateSingleNodeFunction(node, index) {
    const nodeCode = this.codeGenerator.generateNodeCode(node);
    return `function f${index}(doc: IDocument): UniElement {
  return ${nodeCode}
}`;
  }
  /**
   * 生成多节点函数
   * 创建包装元素来容纳多个顶级节点，统一使用 createElement 形式
   */
  generateMultiNodeFunction(nodes, index) {
    const childrenCode = nodes.map((node) => this.codeGenerator.generateNodeCode(node)).join(", ");
    return `function f${index}(doc: IDocument): UniElement {
  return doc.createElement('div', null, [${childrenCode}])
}`;
  }
}
function generateFactoryFunctions(templates, context) {
  const generator = new TemplateFactoryGenerator();
  const functions = templates.map(
    (template, index) => generator.generateFactoryFunction(template, index)
  );
  return functions.join("\n");
}
function generateFactoryCallsInRender(templates, rootIndex, context) {
  const { helper } = context;
  const calls = templates.map((_, index) => {
    const rootParam = index === rootIndex ? ", true" : "";
    return `const t${index} = ${helper("factory")}($doc, f${index}${rootParam})`;
  });
  return calls.join("\n  ");
}

function genTemplates(templates, rootIndex, context) {
  const { helper, options } = context;
  if (options.templateMode === "factory") {
    const factoryFunctions = generateFactoryFunctions(templates);
    return factoryFunctions ? factoryFunctions + "\n" : "";
  } else {
    return templates.map(
      (template, i) => `const t${i} = ${helper("template")}(${JSON.stringify(
        template
      )}${i === rootIndex ? ", true" : ""})
`
    ).join("");
  }
}
function genSelf(dynamic, context) {
  const [frag, push] = buildCodeFragment();
  const { id, template, operation } = dynamic;
  if (id !== void 0 && template !== void 0) {
    push(NEWLINE, `const n${id} = t${template}()`);
    push(...genDirectivesForElement(id, context));
  }
  if (operation) {
    push(...genOperationWithInsertionState(operation, context));
  }
  return frag;
}
function genChildren(dynamic, context, pushBlock, from = `n${dynamic.id}`) {
  const { helper } = context;
  const [frag, push] = buildCodeFragment();
  const { children } = dynamic;
  let offset = 0;
  let prev;
  const childrenToGen = [];
  for (const [index, child] of children.entries()) {
    if (child.flags & 2) {
      offset--;
    }
    const id = child.flags & 1 ? child.flags & 4 ? child.anchor : child.id : void 0;
    if (id === void 0 && !child.hasDynamicChild) {
      push(...genSelf(child, context));
      continue;
    }
    const elementIndex = Number(index) + offset;
    const variable = id === void 0 ? `p${context.block.tempId++}` : `n${id}`;
    pushBlock(NEWLINE, `const ${variable} = `);
    if (prev) {
      if (elementIndex - prev[1] === 1) {
        pushBlock(...genCall(helper("next"), prev[0]));
      } else {
        pushBlock(...genCall(helper("nthChild"), from, String(elementIndex)));
      }
    } else {
      if (elementIndex === 0) {
        pushBlock(...genCall(helper("child"), from));
      } else {
        let init = genCall(helper("child"), from);
        if (elementIndex === 1) {
          init = genCall(helper("next"), init);
        } else if (elementIndex > 1) {
          init = genCall(helper("nthChild"), from, String(elementIndex));
        }
        pushBlock(...init);
      }
    }
    if (id === child.anchor) {
      push(...genSelf(child, context));
    }
    if (id !== void 0) {
      push(...genDirectivesForElement(id, context));
    }
    prev = [variable, elementIndex];
    childrenToGen.push([child, variable]);
  }
  if (childrenToGen.length) {
    for (const [child, from2] of childrenToGen) {
      push(...genChildren(child, context, pushBlock, from2));
    }
  }
  return frag;
}

function genBlock(oper, context, args = [], root, customReturns) {
  return [
    "(",
    ...args,
    ") => {",
    INDENT_START,
    ...genBlockContent(oper, context, root),
    INDENT_END,
    NEWLINE,
    "}"
  ];
}
function genBlockContent(block, context, root, customReturns) {
  const [frag, push] = buildCodeFragment();
  const { dynamic, effect, operation, returns } = block;
  const resetBlock = context.enterBlock(block);
  if (root) {
    for (let name of context.ir.component) {
      const id = toValidAssetId(name, "component");
      const maybeSelfReference = name.endsWith("__self");
      if (maybeSelfReference) name = name.slice(0, -6);
      push(
        NEWLINE,
        `const ${id} = `,
        ...genCall(
          context.helper("resolveComponent"),
          JSON.stringify(name),
          // pass additional `maybeSelfReference` flag
          maybeSelfReference ? "true" : void 0
        )
      );
    }
    genResolveAssets("directive", "resolveDirective");
  }
  for (const child of dynamic.children) {
    push(...genSelf(child, context));
  }
  for (const child of dynamic.children) {
    push(...genChildren(child, context, push, `n${child.id}`));
  }
  push(...genOperations(operation, context));
  push(...genEffects(effect, context));
  push(NEWLINE, `return `);
  const returnNodes = returns.map((n) => `n${n}`);
  const returnsCode = returnNodes.length > 1 ? genMulti(DELIMITERS_ARRAY, ...returnNodes) : [returnNodes[0] || "null"];
  push(...returnsCode);
  resetBlock();
  return frag;
  function genResolveAssets(kind, helper) {
    for (const name of context.ir[kind]) {
      push(
        NEWLINE,
        `const ${toValidAssetId(name, kind)} = `,
        ...genCall(context.helper(helper), JSON.stringify(name))
      );
    }
  }
}

class CodegenContext {
  constructor(ir, options) {
    this.ir = ir;
    this.helpers = /* @__PURE__ */ new Set([]);
    this.helper = (name) => {
      this.helpers.add(name);
      return `_${name}`;
    };
    this.delegates = /* @__PURE__ */ new Set();
    this.identifiers = /* @__PURE__ */ Object.create(null);
    this.seenInlineHandlerNames = /* @__PURE__ */ Object.create(null);
    this.scopeLevel = 0;
    const defaultOptions = {
      mode: "module",
      prefixIdentifiers: true,
      sourceMap: false,
      filename: `template.vue.html`,
      scopeId: null,
      runtimeGlobalName: `Vue`,
      runtimeModuleName: `vue`,
      ssrRuntimeModuleName: "vue/server-renderer",
      ssr: false,
      isTS: false,
      inSSR: false,
      inline: false,
      bindingMetadata: {},
      expressionPlugins: [],
      templateMode: "string",
      // fixed by uts
      disableEventDelegation: false
    };
    this.options = extend(defaultOptions, options);
    this.block = ir.block;
  }
  withId(fn, map) {
    const { identifiers } = this;
    const ids = Object.keys(map);
    for (const id of ids) {
      identifiers[id] || (identifiers[id] = []);
      identifiers[id].unshift(map[id] || id);
    }
    const ret = fn();
    ids.forEach((id) => remove(identifiers[id], map[id] || id));
    return ret;
  }
  enterBlock(block) {
    const parent = this.block;
    this.block = block;
    return () => this.block = parent;
  }
  enterScope() {
    return [this.scopeLevel++, () => this.scopeLevel--];
  }
}
function generate(ir, options = {}) {
  const [frag, push] = buildCodeFragment();
  const context = new CodegenContext(ir, options);
  const { helpers } = context;
  const { inline, bindingMetadata } = options;
  const functionName = "render";
  const args = ["_ctx"];
  if (bindingMetadata && !inline) {
    args.push("$props", "$emit", "$attrs", "$slots");
  }
  const signature = (options.isTS ? args.map((arg) => `${arg}: any`) : args).join(
    ", "
  );
  if (!inline) {
    push(NEWLINE, `export function ${functionName}(${signature}) {`);
  }
  push(INDENT_START);
  if (ir.hasTemplateRef) {
    push(
      NEWLINE,
      `const ${setTemplateRefIdent} = ${context.helper("createTemplateRefSetter")}()`
    );
  }
  const codeFragments = genBlockContent(ir.block, context, true);
  if (options.templateMode === "factory") {
    if (ir.template.length > 0 || context.delegates.size > 0) {
      push(NEWLINE, `const $doc = _ctx.$nativePage.document`);
    }
    if (context.delegates.size) {
      const delegatesCall = genCall(
        context.helper("delegateEvents"),
        ...[`$doc`, ...Array.from(context.delegates).map((v) => `"${v}"`)]
      ).join("");
      push(NEWLINE, delegatesCall);
    }
    if (ir.template.length > 0) {
      const templateCalls = generateFactoryCallsInRender(
        ir.template,
        ir.rootTemplateIndex,
        context
      );
      push(NEWLINE, templateCalls);
    }
  }
  push(...codeFragments);
  push(INDENT_END, NEWLINE);
  if (!inline) {
    push("}");
  }
  const delegates = genDelegates(context);
  const templates = genTemplates(ir.template, ir.rootTemplateIndex, context);
  const imports = genHelperImports(context);
  const preamble = imports + templates + delegates;
  const newlineCount = [...preamble].filter((c) => c === "\n").length;
  if (newlineCount && !inline) {
    frag.unshift(...new Array(newlineCount).fill(LF));
  }
  let [code, map] = codeFragmentToString(frag, context);
  if (!inline) {
    code = preamble + code;
  }
  return {
    code,
    ast: ir,
    preamble,
    map: map && map.toJSON(),
    helpers
  };
}
function genDelegates({ delegates, helper, options }) {
  if (options.templateMode === "factory") {
    return "";
  }
  return delegates.size ? genCall(
    helper("delegateEvents"),
    ...Array.from(delegates).map((v) => `"${v}"`)
  ).join("") + "\n" : "";
}
function genHelperImports({ helpers, helper, options }) {
  let imports = "";
  if (helpers.size) {
    imports += `import { ${[...helpers].map((h) => `${h} as _${h}`).join(", ")} } from '${options.runtimeModuleName}';
`;
  }
  return imports;
}

const transformChildren = (node, context) => {
  const isFragment = node.type === 0 || node.type === 1 && (node.tagType === 3 || node.tagType === 1);
  if (!isFragment && node.type !== 1) return;
  for (const [i, child] of node.children.entries()) {
    const childContext = context.create(child, i);
    transformNode(childContext);
    const childDynamic = childContext.dynamic;
    if (isFragment) {
      childContext.reference();
      childContext.registerTemplate();
      if (!(childDynamic.flags & 2) || childDynamic.flags & 4) {
        context.block.returns.push(childContext.dynamic.id);
      }
    } else {
      context.childrenTemplate.push(childContext.template);
    }
    if (childDynamic.hasDynamicChild || childDynamic.id !== void 0 || childDynamic.flags & 2 || childDynamic.flags & 4) {
      context.dynamic.hasDynamicChild = true;
    }
    context.dynamic.children[i] = childDynamic;
  }
  if (!isFragment) {
    processDynamicChildren(context);
  }
};
function processDynamicChildren(context) {
  let prevDynamics = [];
  let hasStaticTemplate = false;
  const children = context.dynamic.children;
  for (const [index, child] of children.entries()) {
    if (child.flags & 4) {
      prevDynamics.push(child);
    }
    if (!(child.flags & 2)) {
      if (prevDynamics.length) {
        if (hasStaticTemplate) {
          context.childrenTemplate[index - prevDynamics.length] = `<!>`;
          prevDynamics[0].flags -= 2;
          const anchor = prevDynamics[0].anchor = context.increaseId();
          registerInsertion(prevDynamics, context, anchor);
        } else {
          registerInsertion(
            prevDynamics,
            context,
            -1
            /* prepend */
          );
        }
        prevDynamics = [];
      }
      hasStaticTemplate = true;
    }
  }
  if (prevDynamics.length) {
    registerInsertion(prevDynamics, context);
  }
}
function registerInsertion(dynamics, context, anchor) {
  for (const child of dynamics) {
    if (child.template != null) {
      context.registerOperation({
        type: 9,
        elements: dynamics.map((child2) => child2.id),
        parent: context.reference(),
        anchor
      });
    } else if (child.operation && isBlockOperation(child.operation)) {
      child.operation.parent = context.reference();
      child.operation.anchor = anchor;
    }
  }
}

const transformVOnce = (node, context) => {
  if (
    // !context.inSSR &&
    node.type === 1 && findDir$1(node, "once", true)
  ) {
    context.inVOnce = true;
  }
};

const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,"
);
const transformElement = (node, context) => {
  let effectIndex = context.block.effect.length;
  const getEffectIndex = () => effectIndex++;
  return function postTransformElement() {
    ({ node } = context);
    if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1)))
      return;
    const isComponent = node.tagType === 1;
    const isDynamicComponent = isComponentTag(node.tag);
    const propsResult = buildProps(
      node,
      context,
      isComponent,
      isDynamicComponent,
      getEffectIndex
    );
    let { parent } = context;
    while (parent && parent.parent && parent.node.type === 1 && parent.node.tagType === 3) {
      parent = parent.parent;
    }
    const singleRoot = context.root === parent && parent.node.children.filter((child) => child.type !== 3).length === 1;
    if (isComponent) {
      transformComponentElement(
        node,
        propsResult,
        singleRoot,
        context,
        isDynamicComponent
      );
    } else {
      transformNativeElement(
        node,
        propsResult,
        singleRoot,
        context,
        getEffectIndex
      );
    }
  };
};
function transformComponentElement(node, propsResult, singleRoot, context, isDynamicComponent) {
  const dynamicComponent = isDynamicComponent ? resolveDynamicComponent(node) : void 0;
  let { tag } = node;
  let asset = true;
  if (!dynamicComponent) {
    const fromSetup = resolveSetupReference(tag, context);
    if (fromSetup) {
      tag = fromSetup;
      asset = false;
    }
    const dotIndex = tag.indexOf(".");
    if (dotIndex > 0) {
      const ns = resolveSetupReference(tag.slice(0, dotIndex), context);
      if (ns) {
        tag = ns + tag.slice(dotIndex);
        asset = false;
      }
    }
    if (asset) {
      if (context.selfName && capitalize(camelize(tag)) === context.selfName) {
        tag += `__self`;
      }
      context.component.add(tag);
    }
  }
  context.dynamic.flags |= 2 | 4;
  context.dynamic.operation = {
    type: 11,
    id: context.reference(),
    tag,
    props: propsResult[0] ? propsResult[1] : [propsResult[1]],
    asset,
    root: singleRoot && !context.inVFor,
    slots: [...context.slots],
    once: context.inVOnce,
    dynamic: dynamicComponent
  };
  context.slots = [];
}
function resolveDynamicComponent(node) {
  const isProp = findProp(
    node,
    "is",
    false,
    true
    /* allow empty */
  );
  if (!isProp) return;
  if (isProp.type === 6) {
    return isProp.value && createSimpleExpression(isProp.value.content, true);
  } else {
    return isProp.exp || // #10469 handle :is shorthand
    extend(createSimpleExpression(`is`, false, isProp.arg.loc), {
      ast: null
    });
  }
}
function resolveSetupReference(name, context) {
  const bindings = context.options.bindingMetadata;
  if (!bindings || bindings.__isScriptSetup === false) {
    return;
  }
  const camelName = camelize(name);
  const PascalName = capitalize(camelName);
  return bindings[name] ? name : bindings[camelName] ? camelName : bindings[PascalName] ? PascalName : void 0;
}
function transformNativeElement(node, propsResult, singleRoot, context, getEffectIndex) {
  const { tag } = node;
  const { scopeId } = context.options;
  let template = "";
  template += `<${tag}`;
  if (scopeId) template += ` ${scopeId}`;
  const dynamicProps = [];
  if (propsResult[0]) {
    const [, dynamicArgs, expressions] = propsResult;
    context.registerEffect(
      expressions,
      {
        type: 3,
        element: context.reference(),
        props: dynamicArgs,
        root: singleRoot
      },
      getEffectIndex
    );
  } else {
    for (const prop of propsResult[1]) {
      const { key, values } = prop;
      if (key.isStatic && values.length === 1 && values[0].isStatic) {
        template += ` ${key.content}`;
        if (values[0].content) template += `="${values[0].content}"`;
      } else {
        dynamicProps.push(key.content);
        context.registerEffect(
          values,
          {
            type: 2,
            element: context.reference(),
            prop,
            root: singleRoot,
            tag
          },
          getEffectIndex
        );
      }
    }
  }
  template += `>` + context.childrenTemplate.join("");
  if (!isVoidTag(tag)) {
    template += `</${tag}>`;
  }
  if (singleRoot) {
    context.ir.rootTemplateIndex = context.ir.template.length;
  }
  if (context.parent && context.parent.node.type === 1 && !isValidHTMLNesting(context.parent.node.tag, tag)) {
    context.reference();
    context.dynamic.template = context.pushTemplate(template);
    context.dynamic.flags |= 4 | 2;
  } else {
    context.template += template;
  }
}
function buildProps(node, context, isComponent, isDynamicComponent, getEffectIndex) {
  const props = node.props;
  if (props.length === 0) return [false, []];
  const dynamicArgs = [];
  const dynamicExpr = [];
  let results = [];
  function pushMergeArg() {
    if (results.length) {
      dynamicArgs.push(dedupeProperties(results));
      results = [];
    }
  }
  for (const prop of props) {
    if (prop.type === 7 && !prop.arg) {
      if (prop.name === "bind") {
        if (prop.exp) {
          dynamicExpr.push(prop.exp);
          pushMergeArg();
          dynamicArgs.push({
            kind: 0,
            value: prop.exp
          });
        } else {
          context.options.onError(
            createCompilerError(34, prop.loc)
          );
        }
        continue;
      } else if (prop.name === "on") {
        if (prop.exp) {
          if (isComponent) {
            dynamicExpr.push(prop.exp);
            pushMergeArg();
            dynamicArgs.push({
              kind: 0,
              value: prop.exp,
              handler: true
            });
          } else {
            context.registerEffect(
              [prop.exp],
              {
                type: 6,
                element: context.reference(),
                event: prop.exp
              },
              getEffectIndex
            );
          }
        } else {
          context.options.onError(
            createCompilerError(35, prop.loc)
          );
        }
        continue;
      }
    }
    if (isDynamicComponent && prop.type === 6 && prop.name === "is" || prop.type === 7 && prop.name === "bind" && isStaticArgOf(prop.arg, "is")) {
      continue;
    }
    const result = transformProp(prop, node, context);
    if (result) {
      dynamicExpr.push(result.key, result.value);
      if (isComponent && !result.key.isStatic) {
        pushMergeArg();
        dynamicArgs.push(
          extend(resolveDirectiveResult(result), {
            kind: 1
          })
        );
      } else {
        results.push(result);
      }
    }
  }
  if (dynamicArgs.length || results.some(({ key }) => !key.isStatic)) {
    pushMergeArg();
    return [true, dynamicArgs, dynamicExpr];
  }
  const irProps = dedupeProperties(results);
  return [false, irProps];
}
function transformProp(prop, node, context) {
  let { name } = prop;
  if (prop.type === 6) {
    if (isReservedProp(name)) return;
    return {
      key: createSimpleExpression(prop.name, true, prop.nameLoc),
      value: prop.value ? createSimpleExpression(prop.value.content, true, prop.value.loc) : EMPTY_EXPRESSION
    };
  }
  const directiveTransform = context.options.directiveTransforms[name];
  if (directiveTransform) {
    return directiveTransform(prop, node, context);
  }
  if (!isBuiltInDirective(name)) {
    const fromSetup = resolveSetupReference(`v-${name}`, context);
    if (fromSetup) {
      name = fromSetup;
    } else {
      context.directive.add(name);
    }
    context.registerOperation({
      type: 13,
      element: context.reference(),
      dir: prop,
      name,
      asset: !fromSetup
    });
  }
}
function dedupeProperties(results) {
  const knownProps = /* @__PURE__ */ new Map();
  const deduped = [];
  for (const result of results) {
    const prop = resolveDirectiveResult(result);
    if (!prop.key.isStatic) {
      deduped.push(prop);
      continue;
    }
    const name = prop.key.content;
    const existing = knownProps.get(name);
    if (existing) {
      if (name === "style" || name === "class") {
        mergePropValues(existing, prop);
      }
    } else {
      knownProps.set(name, prop);
      deduped.push(prop);
    }
  }
  return deduped;
}
function resolveDirectiveResult(prop) {
  return extend({}, prop, {
    value: void 0,
    values: [prop.value]
  });
}
function mergePropValues(existing, incoming) {
  const newValues = incoming.values;
  existing.values.push(...newValues);
}
function isComponentTag(tag) {
  return tag === "component" || tag === "Component";
}

const transformVHtml = (dir, node, context) => {
  let { exp, loc } = dir;
  if (!exp) {
    context.options.onError(
      createDOMCompilerError(53, loc)
    );
    exp = EMPTY_EXPRESSION;
  }
  if (node.children.length) {
    context.options.onError(
      createDOMCompilerError(54, loc)
    );
    context.childrenTemplate.length = 0;
  }
  context.registerEffect([exp], {
    type: 7,
    element: context.reference(),
    value: exp
  });
};

const transformVText = (dir, node, context) => {
  let { exp, loc } = dir;
  if (!exp) {
    context.options.onError(
      createDOMCompilerError(55, loc)
    );
    exp = EMPTY_EXPRESSION;
  }
  if (node.children.length) {
    context.options.onError(
      createDOMCompilerError(56, loc)
    );
    context.childrenTemplate.length = 0;
  }
  if (isVoidTag(context.node.tag)) {
    return;
  }
  const literal = getLiteralExpressionValue(exp);
  if (literal != null) {
    context.childrenTemplate = [String(literal)];
  } else {
    context.childrenTemplate = [" "];
    context.registerOperation({
      type: 17,
      parent: context.reference()
    });
    context.registerEffect([exp], {
      type: 4,
      element: context.reference(),
      values: [exp],
      generated: true
    });
  }
};

function normalizeBindShorthand(arg, context) {
  if (arg.type !== 4 || !arg.isStatic) {
    context.options.onError(
      createCompilerError(
        52,
        arg.loc
      )
    );
    return createSimpleExpression("", true, arg.loc);
  }
  const propName = camelize(arg.content);
  const exp = createSimpleExpression(propName, false, arg.loc);
  exp.ast = null;
  return exp;
}
const transformVBind = (dir, node, context) => {
  const { loc, modifiers } = dir;
  let { exp } = dir;
  let arg = dir.arg;
  const modifiersString = modifiers.map((s) => s.content);
  if (!exp) exp = normalizeBindShorthand(arg, context);
  if (!exp.content.trim()) {
    context.options.onError(
      createCompilerError(34, loc)
    );
    exp = createSimpleExpression("", true, loc);
  }
  exp = resolveExpression(exp);
  arg = resolveExpression(arg);
  if (arg.isStatic && isReservedProp(arg.content)) return;
  let camel = false;
  if (modifiersString.includes("camel")) {
    if (arg.isStatic) {
      arg = extend({}, arg, { content: camelize(arg.content) });
    } else {
      camel = true;
    }
  }
  return {
    key: arg,
    value: exp,
    loc,
    runtimeCamelize: camel,
    modifier: modifiersString.includes("prop") ? "." : modifiersString.includes("attr") ? "^" : void 0
  };
};

const delegatedEvents = /* @__PURE__ */ makeMap(
  "beforeinput,click,dblclick,contextmenu,focusin,focusout,input,keydown,keyup,mousedown,mousemove,mouseout,mouseover,mouseup,pointerdown,pointermove,pointerout,pointerover,pointerup,touchend,touchmove,touchstart"
);
const transformVOn = (dir, node, context) => {
  let { arg, exp, loc, modifiers } = dir;
  const isComponent = node.tagType === 1;
  const isSlotOutlet = node.tag === "slot";
  if (!exp && !modifiers.length) {
    context.options.onError(
      createCompilerError(35, loc)
    );
  }
  arg = resolveExpression(arg);
  const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(
    arg.isStatic ? `on${arg.content}` : arg,
    modifiers);
  let keyOverride;
  const isStaticClick = arg.isStatic && arg.content.toLowerCase() === "click";
  if (nonKeyModifiers.includes("middle")) {
    if (isStaticClick) {
      arg = extend({}, arg, { content: "mouseup" });
    } else if (!arg.isStatic) {
      keyOverride = ["click", "mouseup"];
    }
  }
  if (nonKeyModifiers.includes("right")) {
    if (isStaticClick) {
      arg = extend({}, arg, { content: "contextmenu" });
    } else if (!arg.isStatic) {
      keyOverride = ["click", "contextmenu"];
    }
  }
  if (isComponent || isSlotOutlet) {
    const handler = exp || EMPTY_EXPRESSION;
    return {
      key: arg,
      value: handler,
      handler: true,
      handlerModifiers: eventOptionModifiers
    };
  }
  const delegate = !context.options.disableEventDelegation && arg.isStatic && !eventOptionModifiers.length && delegatedEvents(arg.content);
  const operation = {
    type: 5,
    element: context.reference(),
    key: arg,
    value: exp,
    modifiers: {
      keys: keyModifiers,
      nonKeys: nonKeyModifiers,
      options: eventOptionModifiers
    },
    keyOverride,
    delegate,
    effect: !arg.isStatic
  };
  context.registerEffect([arg], operation);
};

const transformVShow = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.options.onError(
      createDOMCompilerError(61, loc)
    );
    return;
  }
  if (node.tagType === 2) {
    context.options.onError(
      createCompilerError(
        36,
        loc
      )
    );
    return;
  }
  context.registerOperation({
    type: 13,
    element: context.reference(),
    dir,
    name: "show",
    builtin: true
  });
};

const transformTemplateRef = (node, context) => {
  if (node.type !== 1) return;
  const dir = findProp(node, "ref", false, true);
  if (!dir) return;
  context.ir.hasTemplateRef = true;
  let value;
  if (dir.type === 7) {
    value = dir.exp || normalizeBindShorthand(dir.arg, context);
  } else {
    value = dir.value ? createSimpleExpression(dir.value.content, true, dir.value.loc) : EMPTY_EXPRESSION;
  }
  return () => {
    const id = context.reference();
    const effect = !isConstantExpression(value);
    effect && context.registerOperation({
      type: 14,
      id
    });
    context.registerEffect([value], {
      type: 8,
      element: id,
      value,
      refFor: !!context.inVFor,
      effect
    });
  };
};

const seen = /* @__PURE__ */ new WeakMap();
function markNonTemplate(node, context) {
  seen.get(context.root).add(node);
}
const transformText = (node, context) => {
  if (!seen.has(context.root)) seen.set(context.root, /* @__PURE__ */ new WeakSet());
  if (seen.get(context.root).has(node)) {
    context.dynamic.flags |= 2;
    return;
  }
  const isFragment = node.type === 0 || node.type === 1 && (node.tagType === 3 || node.tagType === 1);
  if ((isFragment || node.type === 1 && node.tagType === 0) && node.children.length) {
    let hasInterp = false;
    let isAllTextLike = true;
    for (const c of node.children) {
      if (c.type === 5) {
        hasInterp = true;
      } else if (c.type !== 2) {
        isAllTextLike = false;
      }
    }
    if (!isFragment && isAllTextLike && hasInterp) {
      processTextContainer(
        node.children,
        context
      );
    } else if (hasInterp) {
      for (let i = 0; i < node.children.length; i++) {
        const c = node.children[i];
        const prev = node.children[i - 1];
        if (c.type === 5 && prev && prev.type === 2) {
          markNonTemplate(prev, context);
        }
      }
    }
  } else if (node.type === 5) {
    processInterpolation(context);
  } else if (node.type === 2) {
    context.template += node.content;
  }
};
function processInterpolation(context) {
  const children = context.parent.node.children;
  const nexts = children.slice(context.index);
  const idx = nexts.findIndex((n) => !isTextLike(n));
  const nodes = idx > -1 ? nexts.slice(0, idx) : nexts;
  const prev = children[context.index - 1];
  if (prev && prev.type === 2) {
    nodes.unshift(prev);
  }
  context.template += " ";
  const id = context.reference();
  const values = nodes.map((node) => createTextLikeExpression(node, context));
  const nonConstantExps = values.filter((v) => !isConstantExpression(v));
  const isStatic = !nonConstantExps.length || nonConstantExps.every(
    (e) => isStaticExpression(e, context.options.bindingMetadata)
  ) || context.inVOnce;
  if (isStatic) {
    context.registerOperation({
      type: 4,
      element: id,
      values
    });
  } else {
    context.registerEffect(values, {
      type: 4,
      element: id,
      values
    });
  }
}
function processTextContainer(children, context) {
  const values = children.map((child) => createTextLikeExpression(child, context));
  const literals = values.map(getLiteralExpressionValue);
  if (literals.every((l) => l != null)) {
    context.childrenTemplate = literals.map((l) => String(l));
  } else {
    context.childrenTemplate = [" "];
    context.registerOperation({
      type: 17,
      parent: context.reference()
    });
    context.registerEffect(values, {
      type: 4,
      element: context.reference(),
      values,
      // indicates this node is generated, so prefix should be "x" instead of "n"
      generated: true
    });
  }
}
function createTextLikeExpression(node, context) {
  markNonTemplate(node, context);
  if (node.type === 2) {
    return createSimpleExpression(node.content, true, node.loc);
  } else {
    return node.content;
  }
}
function isTextLike(node) {
  return node.type === 5 || node.type === 2;
}

const transformVModel = (dir, node, context) => {
  const { exp, arg } = dir;
  if (!exp) {
    context.options.onError(
      createCompilerError(41, dir.loc)
    );
    return;
  }
  const rawExp = exp.loc.source;
  const bindingType = context.options.bindingMetadata[rawExp];
  if (bindingType === "props" || bindingType === "props-aliased") {
    context.options.onError(
      createCompilerError(44, exp.loc)
    );
    return;
  }
  const expString = exp.content;
  const maybeRef = context.options.inline && (bindingType === "setup-let" || bindingType === "setup-ref" || bindingType === "setup-maybe-ref");
  if (!expString.trim() || !isMemberExpression$1(exp, context.options) && !maybeRef) {
    context.options.onError(
      createCompilerError(42, exp.loc)
    );
    return;
  }
  const isComponent = node.tagType === 1;
  if (isComponent) {
    return {
      key: arg ? arg : createSimpleExpression("modelValue", true),
      value: exp,
      model: true,
      modelModifiers: dir.modifiers.map((m) => m.content)
    };
  }
  if (dir.arg)
    context.options.onError(
      createDOMCompilerError(
        58,
        dir.arg.loc
      )
    );
  const { tag } = node;
  const isCustomElement = context.options.isCustomElement(tag);
  let modelType = "text";
  if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
    if (tag === "input" || isCustomElement) {
      const type = findProp$1(node, "type");
      if (type) {
        if (type.type === 7) {
          modelType = "dynamic";
        } else if (type.value) {
          switch (type.value.content) {
            case "radio":
              modelType = "radio";
              break;
            case "checkbox":
              modelType = "checkbox";
              break;
            case "file":
              modelType = void 0;
              context.options.onError(
                createDOMCompilerError(
                  59,
                  dir.loc
                )
              );
              break;
            default:
              checkDuplicatedValue();
              break;
          }
        }
      } else if (hasDynamicKeyVBind(node)) {
        modelType = "dynamic";
      } else {
        checkDuplicatedValue();
      }
    } else if (tag === "select") {
      modelType = "select";
    } else {
      checkDuplicatedValue();
    }
  } else {
    context.options.onError(
      createDOMCompilerError(
        57,
        dir.loc
      )
    );
  }
  if (modelType)
    context.registerOperation({
      type: 13,
      element: context.reference(),
      dir,
      name: "model",
      modelType,
      builtin: true
    });
  function checkDuplicatedValue() {
    const value = findDir$1(node, "bind");
    if (value && isStaticArgOf(value.arg, "value")) {
      context.options.onError(
        createDOMCompilerError(
          60,
          value.loc
        )
      );
    }
  }
};

const transformComment = (node, context) => {
  if (node.type !== 3) return;
  if (getSiblingIf(context)) {
    context.comment.push(node);
    context.dynamic.flags |= 2;
  } else {
    context.template += `<!--${node.content}-->`;
  }
};
function getSiblingIf(context, reverse) {
  const parent = context.parent;
  if (!parent) return;
  const siblings = parent.node.children;
  let sibling;
  let i = siblings.indexOf(context.node);
  while (reverse ? --i >= 0 : ++i < siblings.length) {
    sibling = siblings[i];
    if (!isCommentLike(sibling)) {
      break;
    }
  }
  if (sibling && sibling.type === 1 && sibling.props.some(
    ({ type, name }) => type === 7 && ["else-if", reverse ? "if" : "else"].includes(name)
  )) {
    return sibling;
  }
}
function isCommentLike(node) {
  return node.type === 3 || node.type === 2 && !node.content.trim().length;
}

const transformVIf = createStructuralDirectiveTransform(
  ["if", "else", "else-if"],
  processIf
);
function processIf(node, dir, context) {
  if (dir.name !== "else" && (!dir.exp || !dir.exp.content.trim())) {
    const loc = dir.exp ? dir.exp.loc : node.loc;
    context.options.onError(
      createCompilerError(28, dir.loc)
    );
    dir.exp = createSimpleExpression(`true`, false, loc);
  }
  context.dynamic.flags |= 2;
  if (dir.name === "if") {
    const id = context.reference();
    context.dynamic.flags |= 4;
    const [branch, onExit] = createIfBranch(node, context);
    return () => {
      onExit();
      context.dynamic.operation = {
        type: 15,
        id,
        condition: dir.exp,
        positive: branch,
        once: context.inVOnce || isStaticExpression(dir.exp, context.options.bindingMetadata)
      };
    };
  } else {
    const siblingIf = getSiblingIf(context, true);
    const siblings = context.parent && context.parent.dynamic.children;
    let lastIfNode;
    if (siblings) {
      let i = siblings.length;
      while (i--) {
        if (siblings[i].operation && siblings[i].operation.type === 15) {
          lastIfNode = siblings[i].operation;
          break;
        }
      }
    }
    if (
      // check if v-if is the sibling node
      !siblingIf || // check if IfNode is the last operation and get the root IfNode
      !lastIfNode || lastIfNode.type !== 15
    ) {
      context.options.onError(
        createCompilerError(30, node.loc)
      );
      return;
    }
    while (lastIfNode.negative && lastIfNode.negative.type === 15) {
      lastIfNode = lastIfNode.negative;
    }
    if (dir.name === "else-if" && lastIfNode.negative) {
      context.options.onError(
        createCompilerError(30, node.loc)
      );
    }
    if (context.root.comment.length) {
      node = wrapTemplate(node, ["else-if", "else"]);
      context.node = node = extend({}, node, {
        children: [...context.comment, ...node.children]
      });
    }
    context.root.comment = [];
    const [branch, onExit] = createIfBranch(node, context);
    if (dir.name === "else") {
      lastIfNode.negative = branch;
    } else {
      lastIfNode.negative = {
        type: 15,
        id: -1,
        condition: dir.exp,
        positive: branch,
        once: context.inVOnce
      };
    }
    return () => onExit();
  }
}
function createIfBranch(node, context) {
  context.node = node = wrapTemplate(node, ["if", "else-if", "else"]);
  const branch = newBlock(node);
  const exitBlock = context.enterBlock(branch);
  context.reference();
  return [branch, exitBlock];
}

const transformVFor = createStructuralDirectiveTransform(
  "for",
  processFor
);
function processFor(node, dir, context) {
  if (!dir.exp) {
    context.options.onError(
      createCompilerError(31, dir.loc)
    );
    return;
  }
  const parseResult = dir.forParseResult;
  if (!parseResult) {
    context.options.onError(
      createCompilerError(32, dir.loc)
    );
    return;
  }
  const { source, value, key, index } = parseResult;
  const keyProp = findProp(node, "key");
  const keyProperty = keyProp && propToExpression(keyProp);
  const isComponent = node.tagType === 1;
  context.node = node = wrapTemplate(node, ["for"]);
  context.dynamic.flags |= 2 | 4;
  const id = context.reference();
  const render = newBlock(node);
  const exitBlock = context.enterBlock(render, true);
  context.reference();
  return () => {
    exitBlock();
    const { parent } = context;
    const isOnlyChild = parent && parent.block.node !== parent.node && parent.node.children.length === 1;
    context.dynamic.operation = {
      type: 16,
      id,
      source,
      value,
      key,
      index,
      keyProp: keyProperty,
      render,
      once: context.inVOnce || isStaticExpression(
        source,
        context.options.bindingMetadata
      ),
      component: isComponent,
      onlyChild: !!isOnlyChild
    };
  };
}

const transformSlotOutlet = (node, context) => {
  if (node.type !== 1 || node.tag !== "slot") {
    return;
  }
  const id = context.reference();
  context.dynamic.flags |= 4 | 2;
  const [fallback, exitBlock] = createFallback(
    node,
    context
  );
  let slotName;
  const slotProps = [];
  for (const prop of node.props) {
    if (prop.type === 6) {
      if (prop.value) {
        if (prop.name === "name") {
          slotName = createSimpleExpression(prop.value.content, true, prop.loc);
        } else {
          slotProps.push(extend({}, prop, { name: camelize(prop.name) }));
        }
      }
    } else if (prop.name === "bind" && isStaticArgOf(prop.arg, "name")) {
      if (prop.exp) {
        slotName = prop.exp;
      } else {
        slotName = createSimpleExpression(
          camelize(prop.arg.content),
          false,
          prop.arg.loc
        );
        slotName.ast = null;
      }
    } else {
      let slotProp = prop;
      if (slotProp.name === "bind" && slotProp.arg && isStaticExp(slotProp.arg)) {
        slotProp = extend({}, prop, {
          arg: extend({}, slotProp.arg, {
            content: camelize(slotProp.arg.content)
          })
        });
      }
      slotProps.push(slotProp);
    }
  }
  slotName || (slotName = createSimpleExpression("default", true));
  let irProps = [];
  if (slotProps.length) {
    const [isDynamic, props] = buildProps(
      extend({}, node, { props: slotProps }),
      context,
      true
    );
    irProps = isDynamic ? props : [props];
    const runtimeDirective = context.block.operation.find(
      (oper) => oper.type === 13 && oper.element === id
    );
    if (runtimeDirective) {
      context.options.onError(
        createCompilerError(
          36,
          runtimeDirective.dir.loc
        )
      );
    }
  }
  return () => {
    exitBlock && exitBlock();
    context.dynamic.operation = {
      type: 12,
      id,
      name: slotName,
      props: irProps,
      fallback
    };
  };
};
function createFallback(node, context) {
  if (!node.children.length) {
    return [];
  }
  context.node = node = extend({}, node, {
    type: 1,
    tag: "template",
    props: [],
    tagType: 3,
    children: node.children
  });
  const fallback = newBlock(node);
  const exitBlock = context.enterBlock(fallback);
  context.reference();
  return [fallback, exitBlock];
}

const transformVSlot = (node, context) => {
  if (node.type !== 1) return;
  const dir = findDir(node, "slot", true);
  const { tagType, children } = node;
  const { parent } = context;
  const isComponent = tagType === 1;
  const isSlotTemplate = isTemplateNode(node) && parent && parent.node.type === 1 && parent.node.tagType === 1;
  if (isComponent && children.length) {
    return transformComponentSlot(
      node,
      dir,
      context
    );
  } else if (isSlotTemplate && dir) {
    return transformTemplateSlot(
      node,
      dir,
      context
    );
  } else if (!isComponent && dir) {
    context.options.onError(
      createCompilerError(40, dir.loc)
    );
  }
};
function transformComponentSlot(node, dir, context) {
  const { children } = node;
  const arg = dir && dir.arg;
  const emptyTextNodes = [];
  const nonSlotTemplateChildren = children.filter((n) => {
    if (isNonWhitespaceContent(n)) {
      return !(n.type === 1 && n.props.some(isVSlot));
    } else {
      emptyTextNodes.push(n);
    }
  });
  if (!nonSlotTemplateChildren.length) {
    emptyTextNodes.forEach((n) => {
      markNonTemplate(n, context);
    });
  }
  const [block, onExit] = createSlotBlock(node, dir, context);
  const { slots } = context;
  return () => {
    onExit();
    const hasOtherSlots = !!slots.length;
    if (dir && hasOtherSlots) {
      context.options.onError(
        createCompilerError(37, dir.loc)
      );
      return;
    }
    if (nonSlotTemplateChildren.length) {
      if (hasStaticSlot(slots, "default")) {
        context.options.onError(
          createCompilerError(
            39,
            nonSlotTemplateChildren[0].loc
          )
        );
      } else {
        registerSlot(slots, arg, block);
        context.slots = slots;
      }
    } else if (hasOtherSlots) {
      context.slots = slots;
    }
  };
}
function transformTemplateSlot(node, dir, context) {
  context.dynamic.flags |= 2;
  const arg = dir.arg && resolveExpression(dir.arg);
  const vFor = findDir(node, "for");
  const vIf = findDir(node, "if");
  const vElse = findDir(
    node,
    /^else(-if)?$/,
    true
    /* allowEmpty */
  );
  const { slots } = context;
  const [block, onExit] = createSlotBlock(node, dir, context);
  if (!vFor && !vIf && !vElse) {
    const slotName = arg ? arg.isStatic && arg.content : "default";
    if (slotName && hasStaticSlot(slots, slotName)) {
      context.options.onError(
        createCompilerError(38, dir.loc)
      );
    } else {
      registerSlot(slots, arg, block);
    }
  } else if (vIf) {
    registerDynamicSlot(slots, {
      slotType: 3,
      condition: vIf.exp,
      positive: {
        slotType: 1,
        name: arg,
        fn: block
      }
    });
  } else if (vElse) {
    const vIfSlot = slots[slots.length - 1];
    if (vIfSlot.slotType === 3) {
      let ifNode = vIfSlot;
      while (ifNode.negative && ifNode.negative.slotType === 3)
        ifNode = ifNode.negative;
      const negative = vElse.exp ? {
        slotType: 3,
        condition: vElse.exp,
        positive: {
          slotType: 1,
          name: arg,
          fn: block
        }
      } : {
        slotType: 1,
        name: arg,
        fn: block
      };
      ifNode.negative = negative;
    } else {
      context.options.onError(
        createCompilerError(30, vElse.loc)
      );
    }
  } else if (vFor) {
    if (vFor.forParseResult) {
      registerDynamicSlot(slots, {
        slotType: 2,
        name: arg,
        fn: block,
        loop: vFor.forParseResult
      });
    } else {
      context.options.onError(
        createCompilerError(32, vFor.loc)
      );
    }
  }
  return onExit;
}
function ensureStaticSlots(slots) {
  let lastSlots = slots[slots.length - 1];
  if (!slots.length || lastSlots.slotType !== 0) {
    slots.push(
      lastSlots = {
        slotType: 0,
        slots: {}
      }
    );
  }
  return lastSlots.slots;
}
function registerSlot(slots, name, block) {
  const isStatic = !name || name.isStatic;
  if (isStatic) {
    const staticSlots = ensureStaticSlots(slots);
    staticSlots[name ? name.content : "default"] = block;
  } else {
    slots.push({
      slotType: 1,
      name,
      fn: block
    });
  }
}
function registerDynamicSlot(allSlots, dynamic) {
  allSlots.push(dynamic);
}
function hasStaticSlot(slots, name) {
  return slots.some((slot) => {
    if (slot.slotType === 0) return !!slot.slots[name];
  });
}
function createSlotBlock(slotNode, dir, context) {
  const block = newBlock(slotNode);
  block.props = dir && dir.exp;
  const exitBlock = context.enterBlock(block);
  return [block, exitBlock];
}
function isNonWhitespaceContent(node) {
  if (node.type !== 2) return true;
  return !!node.content.trim();
}

function compile(source, options = {}) {
  const resolvedOptions = extend({}, options);
  const ast = isString(source) ? parse(source, resolvedOptions) : source;
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
  if (options.isTS) {
    const { expressionPlugins } = options;
    if (!expressionPlugins || !expressionPlugins.includes("typescript")) {
      resolvedOptions.expressionPlugins = [
        ...expressionPlugins || [],
        "typescript"
      ];
    }
  }
  const ir = transform(
    ast,
    extend({}, resolvedOptions, {
      nodeTransforms: [
        ...nodeTransforms,
        ...options.nodeTransforms || []
        // user transforms
      ],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {}
        // user transforms
      )
    })
  );
  return generate(ir, resolvedOptions);
}
function getBaseTransformPreset() {
  return [
    [
      transformVOnce,
      transformVIf,
      transformVFor,
      transformSlotOutlet,
      transformTemplateRef,
      transformElement,
      transformText,
      transformVSlot,
      transformComment,
      transformChildren
    ],
    {
      bind: transformVBind,
      on: transformVOn,
      html: transformVHtml,
      text: transformVText,
      show: transformVShow,
      model: transformVModel
    }
  ];
}

function createVaporCompilerError(code, loc) {
  return createCompilerError(
    code,
    loc,
    VaporErrorMessages
  );
}
const VaporErrorCodes = {
  "X_V_PLACEHOLDER": 100,
  "100": "X_V_PLACEHOLDER",
  "__EXTEND_POINT__": 101,
  "101": "__EXTEND_POINT__"
};
const VaporErrorMessages = {
  [100]: `[placeholder]`,
  // just to fulfill types
  [101]: ``
};

export { CodegenContext, DynamicFlag, IRDynamicPropsKind, IRNodeTypes, IRSlotType, VaporErrorCodes, VaporErrorMessages, buildCodeFragment, codeFragmentToString, compile, createStructuralDirectiveTransform, createVaporCompilerError, genCall, genMulti, generate, isBlockOperation, parse, transform, transformChildren, transformComment, transformElement, transformSlotOutlet, transformTemplateRef, transformText, transformVBind, transformVFor, transformVHtml, transformVIf, transformVModel, transformVOn, transformVOnce, transformVShow, transformVSlot, transformVText, wrapTemplate };
