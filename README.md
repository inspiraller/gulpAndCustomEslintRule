# README #

# Pre-requisites:
- node
- npm

# How to provide an eslint rule to test the whole source code of a file:
- git clone [this repo]
- open package.json and remove -   "dependencies": {"eslint-plugin-eslintCustomRules": "file:eslintCustomRules"}
- npm update
- npm install -S ./eslintCustomRules
- to test files in location www/js/*:
  gulp eslint

# Instructions for building below:

## Install npm dependencies:
    $ npm install gulp eslint gulp-eslint --save-dev
## Create .eslint.src:
$ node_modules\.bin\eslint --init

Just press Enter for everything. It doesn't matter what you choose because you are going to remove all the eslint rules anyway.They are just going to get in the way of creative development.
Supply only a few very basic rules, to reduce overal technical debt.

eslint.src should be cleaned up to look like this:
```javascript
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    }
};
```

## Create gulpfile.js:
```javascript
var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
    return gulp.src([ './www/js/**/*.js', '!**/.eslintrc.js' ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
```

## Create your webroot folder with some js files:
***example:***
www/js/lib/hello.js
```javascript
function hello(){
    if(true){

    }
    var s = 'john';
    return 'hello mate';
}
```
## run eslint
gulp eslint

## How to write your own eslint rules
*** Here is a reference guide to what you can write rules for: ***
https://github.com/estree/estree/blob/master/es5.md 

## 1 Create Folder: 
eslintCustomRules/
## 2 Create File: 
eslintCustomRules/index.js

```javascript
module.exports.rules = {
    'testAll': function(context){
        return {
            Program: function(node){

                // 1) Get the entire source of this file.
                var str = context.getSource(); 

                // 2) do what ever regex you need to do determine your lint rules 
                // 3) and just return the object - myNode with line number of problem.                

                var myNode = {
                    type:'My test!',
                    loc:{
                        start:{
                            line:6,
                            column:14,
                            offset:function(n){
                                return new Position(this.line, this.column + n)
                            }
                        }
                    }                   
                };

                context.report(myNode, 'Something didn\'t work');                
            }
        };
    } 
};


```
# 3 Create package.json file 
estlintCustomRules/package.json

 ***Note:*** Include a prefix: eslint-plugin-[yourCustomLinRulesFolder] 
```javascript
{
  "name": "eslint-plugin-eslintCustomRules", 
  "version": "0.0.1",
  "main": "index.js",
  "devDependencies": {
    "eslint": "~2.6.0"
  },
  "engines": {
    "node": ">=0.10.0"
  }
}
```
# 4 update .eslintrc.js file to include your new rules
 - Don't forget to add it into plugins, as below
 - Don't forget to include each rule as below:
 
```javascript
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "plugins": [ /* include your plugin here: */
        "eslintCustomRules"
    ] , 
    "rules": {
        /* remove all other rules. Linting code just limits creative development. */
        /* your new rules here ---- */
        "eslintCustomRules/testAll":"warn"
    }
};
```
# 5 install your new custom plugin into node_modules folder
npm install -S ./eslintCustomRules

# 6 now test your new rules
gulp eslint


