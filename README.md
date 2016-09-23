# README #

How to set up gulp and eslint with a custom rule

## Pre-requisites:
- node
- npm

## Pre-requisites - install the following globally in your node modules folder:
- gulp
- karma-cli
- vinyl-source-stream
- phantomjs

## You can install karma-cli globally but DO NOT install karma globally. To check go to:
	C:\Users\[your name]\AppData\Roaming\npm\node_modules
	 and remove it.


## change directory to your new project:
	$ cd to new dir - c:\yourlocationetc\

## create package.json file:
	$ npm init - to generate own package.json file

## Install npm dependencies:
	$ npm install gulp eslint gulp-eslint --save-dev

## 2) Set up eslint:

## set up rules in eslintrc.js
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


## Update gulp file:

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

## Create webroot with js files
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

## How to set up customisation
### For all node types you can write rules for see:
https://github.com/estree/estree/blob/master/es5.md 

### useful notes:
Inside your rule if you want to console.log to test what your rule is picking up you would have to have installed eslint globally. Then you can use:
	eslint --rule my-eslint-plugin/index.js www/js/lib/hello.js

Better just to use context.report(node,'what is this rule picking up??? = ' + whatever);

# 1 Create Folder: eslintCustomRules/
# 2 Create File : eslintCustomRules/index.js

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

# 3 Create package.json file for your custom estlint rule: estlintCustomRules/package.json
Note that you have to include a prefix of eslint-plugin- 


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

# 4 update your .eslintrc.js file to include both the reference to plugin - custom folder and your new rules

module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "extends": "eslint:recommended",
    "plugins": [
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

# 5 install your new custom plugin into the same node_modules folder that eslint depends on
npm install -S ./eslintCustomRules

# 6 now test your new rules
gulp estlint


