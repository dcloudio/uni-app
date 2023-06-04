
module.exports = {
  simple : {
    echo : "^#echo[ \t]+(.*?)[ \t]*$",
    exec : "^#exec[ \t]+(\\S+)[ \t]*\\((.*)\\)[ \t]*$",
    include          : "^(.*)#include(?!-)[ \t]+(.*?)[ \t]*$", // allow prefix characters to specify the indent level of included file
    'include-static' : "^(.*)#include-static[ \t]+(.*?)[ \t]*$"
  },
  html : {
    echo : "<!--[ \t]*#echo[ \t]+(.*?)[ \t]*(?:-->|!>)",
    exec : "<!--[ \t]*#exec[ \t]+(\\S+)[ \t]*\\((.*)\\)[ \t]*(?:-->|!>)",
    include          : "(.*)<!--[ \t]*#include(?!-)[ \t]+(.*?)[ \t]*(?:-->|!>)",
    'include-static' : "(.*)<!--[ \t]*#include-static[ \t]+(.*?)[ \t]*(?:-->|!>)",
    exclude : {
      start : "[ \t]*<!--[ \t]*#exclude(?:[ \t]+(.*?))?[ \t]*(?:-->|!>)(?:[ \t]*\n+)?",
      end   : "[ \t]*<!--[ \t]*#endexclude[ \t]*(?:-->|!>)(?:[ \t]*\n)?"
    },
    extend : {
      start : "[ \t]*<!--[ \t]*#extend(?!able)[ \t]+(.*?)[ \t]*(?:-->|!>)(?:[ \t]*\n+)?",
      end   : "[ \t]*<!--[ \t]*#endextend[ \t]*(?:-->|!>)(?:[ \t]*\n)?"
    },
    extendable : "<!--[ \t]*#extendable[ \t]*(?:-->|!>)",
    if : {
      start : "[ \t]*<!--[ \t]*#(ifndef|ifdef|if)[ \t]+(.*?)[ \t]*(?:-->|!>)(?:[ \t]*\n+)?",
      end   : "[ \t]*<!(?:--)?[ \t]*#endif[ \t]*(?:-->|!>)(?:[ \t]*\n)?"
    },
    else : "[ \t]*<!(?:--)?[ \t]*#else[ \t]*(?:-->|!>)(?:[ \t]*\n)?",
    foreach : {
      start : "[ \t]*<!--[ \t]*#foreach[ \t]+(.*?)[ \t]*(?:-->|!>)(?:[ \t]*\n+)?",
      end   : "[ \t]*<!(?:--)?[ \t]*#endfor[ \t]*(?:-->|!>)(?:[ \t]*\n)?"
    }
  },
  js : {
    echo : [
      "/\\*[ \t]*#echo[ \t]+(.*?)[ \t]*\\*(?:\\*|/)",
      "//[ \t]*#echo[ \t]+(.*?)[ \t]*$"
    ],
    exec : "(?://|/\\*)[ \t]*#exec[ \t]+(\\S+?)[ \t]*\\((.*)\\)[ \t]*(?:\\*(?:\\*|/))?",
    include : [
      "^(.*)/\\*[ \t]*#include(?!-)[ \t]+(.*?)[ \t]*\\*(?:\\*|/)",
      "^(.*)//[ \t]*#include(?!-)[ \t]+(.*?)[ \t]*$"
    ],
    'include-static': [
      "^(.*)/\\*[ \t]*#include-static[ \t]+(.*?)[ \t]*\\*(?:\\*|/)",
      "^(.*)//[ \t]*#include-static[ \t]+(.*?)[ \t]*$"
    ],
    exclude : {
      start : "[ \t]*(?://|/\\*)[ \t]*#exclude(?:[ \t]+([^\n*]*))?[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n+)?",
      end   : "[ \t]*(?://|/\\*)[ \t]*#endexclude[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?"
    },
    extend : {
      start : "[ \t]*(?://|/\\*)[ \t]*#extend(?!able)[ \t]+([^\n*]*)(?:\\*(?:\\*|/))?(?:[ \t]*\n+)?",
      end   : "[ \t]*(?://|/\\*)[ \t]*#endextend[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?"
    },
    extendable : "[ \t]*(?://|/\\*)[ \t]*#extendable[ \t]*(?:\\*/)?",
    if : {
      start : "[ \t]*(?://|/\\*)[ \t]*#(ifndef|ifdef|if)[ \t]+([^\n*]*)(?:\\*(?:\\*|/))?(?:[ \t]*\n+)?",
      end   : "[ \t]*(?://|/\\*)[ \t]*#endif[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?"
    },
    else : "[ \t]*(?://|/\\*)[ \t]*#else[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?",
    foreach : {
      start : "[ \t]*(?://|/\\*)[ \t]*#foreach[ \t]+([^\n*]*)(?:\\*(?:\\*|/))?(?:[ \t]*\n+)?",
      end   : "[ \t]*(?://|/\\*)[ \t]*#endfor[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?"
    }
  },
  coffee : {
    echo : [
      "###+[ \t]*#echo[ \t]+(.*?)[ \t]###",
      "#+[ \t]*#echo[ \t]+(.*?)[ \t]*$"
    ],
    exec : "#+[ \t]*#exec[ \t]+(\\S+)[ \t]*\\((.*)\\)[ \t]*$",
    include          : "^(.*?)#+[ \t]*#include(?!-)[ \t]+(.*?)[ \t]*$",
    'include-static' : "^(.*?)#+[ \t]*#include-static[ \t]+(.*?)[ \t]*$",
    exclude : {
      start : "^[ \t]*#+[ \t]*#exclude(?:[ \t]+(.*?))?[ \t]*\n+",
      end   : "^[ \t]*#+[ \t]*#endexclude[ \t]*\n?"
    },
    extend : {
      start : "^[ \t]*#+[ \t]*#extend(?!able)[ \t]+(.*?)\n+",
      end   : "^[ \t]*#+[ \t]*#endextend[ \t]*\n?"
    },
    extendable : "^[ \t]*#+[ \t]*#extendable[ \t]*$",
    if : {
      start : "^[ \t]*#+[ \t]*#(ifndef|ifdef|if)[ \t]+(.*?)[ \t]*\n+",
      end   : "^[ \t]*#+[ \t]*#endif[ \t]*\n?"
    },
    else : "^[ \t]*#+[ \t]*#else[ \t]*\n?",
    foreach : {
      start : "^[ \t]*#+[ \t]*#foreach[ \t]+(.*?)[ \t]*\n+",
      end   : "^[ \t]*#+[ \t]*#endfor[ \t]*\n?"
    }
  }
};

module.exports.xml        = module.exports.html;

module.exports.javascript = module.exports.js;
module.exports.jsx        = module.exports.js;
module.exports.json       = module.exports.js;
module.exports.c          = module.exports.js;
module.exports.cc         = module.exports.js;
module.exports.cpp        = module.exports.js;
module.exports.cs         = module.exports.js;
module.exports.csharp     = module.exports.js;
module.exports.java       = module.exports.js;
module.exports.less       = module.exports.js;
module.exports.sass       = module.exports.js;
module.exports.scss       = module.exports.js;
module.exports.css        = module.exports.js;
module.exports.php        = module.exports.js;
module.exports.ts         = module.exports.js;
module.exports.tsx        = module.exports.js;
module.exports.peg        = module.exports.js;
module.exports.pegjs      = module.exports.js;
module.exports.jade       = module.exports.js;
module.exports.styl       = module.exports.js;
module.exports.go         = module.exports.js;

module.exports.bash       = module.exports.coffee;
module.exports.shell      = module.exports.coffee;
module.exports.sh         = module.exports.coffee;
