# README #

##### Pre-requisites:
- node
- npm

##### Recent updates:
This is a basic example which detects whether jquery has been referenced twice.


##### How to provide an eslint rule to test the whole source code of a file:
- git clone [this repo]
- open package.json and remove -   "dependencies": {"eslint-plugin-eslintCustomRules": "file:eslintCustomRules"}
- npm update
- npm install -S ./eslintCustomRules
- to test files in location www/js/*:
  gulp eslint

# Instructions for building below:

##### Install npm dependencies:
$ npm install gulp eslint gulp-eslint --save-dev
##### Create .eslint.src:
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

##### Create gulpfile.js:


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

##### Create your webroot folder with some js files:
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
##### run eslint
gulp eslint

##### How to write your own eslint rules
*** Here is a reference guide to what you can write rules for: ***
https://github.com/estree/estree/blob/master/es5.md 

##### 1 Create Folder: 
eslintCustomRules/
##### 2 Create index.js: 
eslintCustomRules/index.js

```javascript

var getLineAndCol = function(str, lastIndex){
    var strExtract = str.substring(0, lastIndex);
    var strLines = strExtract.replace(/[^\n]/g,'');
    var strColumn = strExtract.replace(/[\w\W]*\n[^\n]*$/);
    return {
        line:strLines.length + 1,
        column:strColumn.length
    }
}

var getJqueryRefRepeated = function(str){
    // do what ever regex you need to do determine your lint rules and just return the object - myNode with line number of problem.
    var marker = '\u00a1';
    str = str.replace(/\)/g, marker);
    var reg = RegExp('\\$(\\([^\\$\\' + marker + ']*)\\' + marker,'g');

    var arrRegCatch;
    var arrJqueryRefs = [-1];
    var objError = null;
    while(arrRegCatch = reg.exec(str)){
       var strQueryMatch = arrRegCatch[1];
//console.log('strQueryMatch = ', strQueryMatch); 
       
        if(arrJqueryRefs.join(',').indexOf(',' + strQueryMatch + ',')!==-1){
            objError = getLineAndCol(str, reg.lastIndex);
//console.log('reg.lastIndex = ',reg.lastIndex);        
            break;
        }
        arrJqueryRefs.push(strQueryMatch);
        
    }
    return objError;
}

module.exports.rules = {
    'testSameJqueryReference': function(context){
        return {
            Program: function(node){
                var str = context.getSource();
                var objError = getJqueryRefRepeated(str);

                if(objError){
                    var myNode = {
                        type:'Jquery reference repeated',
                        loc:{
                            start:{
                                line:objError.line,
                                column:objError.column,
                                offset:function(n){
                                    return new Position(this.line, this.column + n)
                                }
                            }
                        }                   
                    };

                    context.report(myNode, 'Jquery has been referenced with the same selector more than once');   
                }             
            }
        };
    },
    'testSomethingElse': function(context){
        return {
            Program: function(node){
                var str = context.getSource();
                var objError = {
                    line:20,
                    column:15
                };

                if(objError){
                    var myNode = {
                        type:'Jquery reference repeated',
                        loc:{
                            start:{
                                line:objError.line,
                                column:objError.column,
                                offset:function(n){
                                    return new Position(this.line, this.column + n)
                                }
                            }
                        }                   
                    };

                    context.report(myNode, 'Whatever you want!');   
                }             
            }
        };
    }     
};

```
##### 3 Create package.json file 
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
##### 4 update .eslintrc.js file to include your new rules
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
##### 5 install your new custom plugin into node_modules folder
npm install -S ./eslintCustomRules

##### 6 now test your new rules
gulp eslint


#  How to display your new eslint.src rules in sublime?

##### Set up this eslint as the a system path variable
Go to Control Panel > System & Security > System > Advanced System Settings > Environment Variables > navigate to the System > Path > add this to the end:
;C:\[your project]\node_modules\eslint\bin

##### RESTART COMPUTER FOR THIS TO TAKE EFFECT!
RESTART COMPUTER FOR THIS TO TAKE EFFECT!

##### Install SublimeText3
download and install from sublimetext. Don't use a portable version.

##### Install SublimeLinter
Open Sublime - CTRL SHIFT P - Package Install - First install SublimeLinter

##### Install SublimeLinter-contrib-eslint
Open Sublime - CTRL SHIFT P - Package Install - type: eslint - pick - SublimeLinter-contrib-eslint

##### Set SublimeLinter to pull eslint.src from preferred location:
inside Preferences > Package Settings > SublimeLinter > Settings Default
update: paths to location of your node location...
```javascript
{
    "default": {
        "paths": {
  
            "windows": ["C:\\baps\\jsstack\\globalEslint"]
        },
```
##### To test a .js file
Close a .js file and re-open it.
You should now notice errors, or warnings determined by your eslint rules.


