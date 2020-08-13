---
[![npm version](https://badge.fury.io/js/malta-umd.svg)](http://badge.fury.io/js/malta-umd)
[![npm downloads](https://img.shields.io/npm/dt/malta-umd.svg)](https://npmjs.org/package/malta-umd)
[![npm downloads](https://img.shields.io/npm/dm/malta-umd.svg)](https://npmjs.org/package/malta-umd)  
---  

This plugin can be used on: **.js** files and even on **.coffee**, **.ts** and **.jsx** files after using the right plugin.  

Options :   
    - **name/s** : the name/s of the module to be published, use a string for `name` either an array of strings for `names`
    - __wrap__ : either the code must be wrapped or not in a `function(){}`, default false  

The code passed to the plugin should be a function that returns the object literal:

```
function () {
    function foo(){...}
    function foofoo(){...}
    return {foo:foo, foofoo:foofoo}
}
```

but if `wrap:true` is passed then it is expectd to be just the content of the function:  
```
function foo(){...}
function foofoo(){...}
return {foo:foo, foofoo:foofoo}
```

Sample usage:  
```
malta app/source/mod.js public -plugins=malta-umd[name:\"myMod\"]
```
or in the .json file :  
```
"app/source/mod.js" : "public -plugins=malta-umd[name:\"myMod\"]"
```
or in a script :  
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/mod.ts',
    'public',
    '-plugins=malta-babel...malta-umd[name:\"myMod\"]',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```