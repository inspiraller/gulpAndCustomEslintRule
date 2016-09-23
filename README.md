# README #

How to set up gulp and eslint with two of your own custom eslint rules

## Pre-requisites:
- node
- npm
## Create a project for yourself:
	$ cd c:\yourlocationetc\
## create package.json file:
	$ npm init

## Install npm dependencies:
	$ npm install gulp eslint gulp-eslint --save-dev
## Create .eslint.src:
$ node_modules\.bin\eslint --init
settings:
- browser
- es6 no
- common js - yes
- jsx - no
- quotes - single
- tabs
- windows
- config in javascript
- 
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

## 1 Create Folder: 
eslintCustomRules/
## 2 Create File: 
eslintCustomRules/index.js
```javascript
module.exports.rules = {
    "var-length": context => ({
        VariableDeclarator: (node) => {
            if(node.id.name.length < 2){
                context.report(node, 'Variable names should be longer than 1 character');
            }
        }
    }),
	"if-curly-formatting": context => ({
        IfStatement: (node) => {
            var source = context.getSource(node.test, 0, 3);
            if (!source.match(/ {$/)) {
                context.report(node, "Found improperly formatted if-statement");
            }
        }
    })      
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
    "extends": "eslint:recommended",
    "plugins": [ /* include your plugin here: */
        "eslintCustomRules"
    ] , 
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        /* your new rules here ---- */
        "eslintCustomRules/if-curly-formatting": "warn",
        "eslintCustomRules/var-length":"warn"
    }
};
```
# 5 install your new custom plugin into node_modules folder
npm install -S ./eslintCustomRules

# 6 now test your new rules
gulp eslint


