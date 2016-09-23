module.exports.rules = {
    "var-length": context => ({
        VariableDeclarator: (node) => {


// In order to use console.log you need to isntall eslint globally.
// to test console.log type the following into the cammand line:
// eslint --rule my-eslint-plugin/index.js www/js/lib/hello.js
//console.log('source =' + source);
// instead just used context.report for testing....
//context.report(node, 'Debugging rule here....');


            if(node.id.name.length < 2){
                context.report(node, 'Variable names should be longer than 1 character');
            }
        }
    }),
	"if-curly-formatting": context => ({
        IfStatement: (node) => {


            var source = context.getSource(node.test, 0, 3);

// In order to use console.log you need to isntall eslint globally.
// to test console.log type the following into the cammand line:
// eslint --rule my-eslint-plugin/index.js www/js/lib/hello.js
//console.log('source =' + source);
// instead just used context.report for testing....
//context.report(node, 'Debugging rule here....');


            if (!source.match(/ {$/)) {
                context.report(node, "Found improperly formatted if-statement");
            }
        }
    })      
};

