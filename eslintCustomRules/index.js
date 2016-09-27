module.exports.rules = {
    'testAll': function(context){
        return {
            Program: function(node){
                var str = context.getSource();

                // do what ever regex you need to do determine your lint rules and just return the object - myNode with line number of problem.                

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

