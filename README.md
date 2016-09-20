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
	return 'hello mate';
}
```

## run eslint
gulp eslint

## How to set up customisation
https://insideops.wordpress.com/2015/12/08/creating-custom-rules-for-eslint/

