
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

