var Checker = require('../../lib/checker');
var assert = require('assert');

describe('rules/require-newline-before-block-statements', function() {
    var checker;

    beforeEach(function() {
        checker = new Checker();
        checker.registerDefaultRules();
    });

    describe('option value true', function() {
        beforeEach(function() {
            checker.configure({ requireNewlineBeforeBlockStatements: true });
        });

        // it('should report missing newline before opening brace', function() {
        //     assert(checker.checkString('function test() {abc();}').getErrorCount() === 1);
        // });

        // it('should report missing newline before opening brace when there are white-spaces between', function() {
        //     assert(checker.checkString('function test()      /* COOOMMMENTTT*/ {abc();}').getErrorCount() === 1);
        // });

        // it('should not report missing newline if there is one', function() {
        //     assert(checker.checkString('function test()\n{abc();}').isEmpty());
        // });

        // it('should not report missing newline if there are more of them combined with white-spaces', function() {
        //     assert(checker.checkString('function test()       \n    \n/*BLOCK*/   {abc();}').isEmpty());
        // });

        // it('should not report missing newline for object definitions', function() {
        //     assert(checker.checkString('function test()\n{var obj = {a:1,\nb:2,\nc:3\n};\n\n return {\nval:1\n};\n}')
        //         .isEmpty());
        // });

        // it('should report missing newline only for function definition block statement', function() {
        //     assert(checker.checkString('function test(){var obj = {a:1,\nb:2,\nc:3\n};\n\n return {\nval:1\n};\n}')
        //         .getErrorCount() === 1);
        // });

        it('should report missing newline for all 3 statements', function() {
            // var errors = checker.checkString('function test(){\nif(true){\nreturn 1;\n}\nfor(var i in [1,2,3]){\n}\n}').getErrorList();

            // var functStr = 'function test(){\n    if(true){\n        return 1;\n    }\n    if(a==222){\n        return 2;\n    }\n    if(a.length == what()){\n        return 3;\n    }\n    var j;\n    for (var i=0;i<10;i++) {\n        for (j=0;j<10;j++) {\n        }\n    }\n    while (j)\n    {\n        j--;\n    }\n    while (j--)\n    {\n        eh();\n    }\n    switch(me){\n        case \'yeah\':\n            yeah();\n            break;\n        case \'ohno!\':\n        case \'wrong\':\n            no();\n            break;\n        default:\n            WAT();\n    }\n    for(var i in [1,2,3]){\n    }\n}\n';
            // assert( checker.checkString(functStr).getErrorCount() === 1 );

            // var functStr = 'function test()\n{\n    if(true){\n        return 1;\n    }\n    if(a==222){\n        return 2;\n    }\n    if(a.length == what()){\n        return 3;\n    }\n    var j;\n    for (var i=0;i<10;i++) {\n        for (j=0;j<10;j++) {\n        }\n    }\n    while (j)\n    {\n        j--;\n    }\n    while (j--)\n    {\n        eh();\n    }\n    switch(me){\n        case \'yeah\':\n            yeah();\n            break;\n        case \'ohno!\':\n        case \'wrong\':\n            no();\n            break;\n        default:\n            WAT();\n    }\n    for(var i in [1,2,3]){\n    }\n}\n';
            // assert( checker.checkString(functStr).isEmpty() );

            // errors.forEach(function(error) {
            //     assert(error.message);
            //     console.log(error.message);
            // });

            // assert(checker.checkString('function test(){\nif(true){\nreturn 1;\n}\nfor(var i in [1,2,3]){\n}\n}')
            //     .getErrorCount() === 3);
        });

        // it('should not report missing newline', function() {
        //     assert(checker.checkString('function test()\n{\nif(true)\n{\nreturn 1;\n}\nfor(var i in [1,2,3])\n{\n}\n}')
        //         .isEmpty());
        // });
    });


    describe('DEV_TEST', function() {
        beforeEach(function() {
            checker.configure({ requireNewlineBeforeBlockStatements: true });
        });



        // it('should report error when `if` is followed by a curly brace on the same line', function() {
        //     assert(checker.checkString('if(x){x++;}').getErrorCount() === 1);
        // });

        // it('should not report error when `if` is followed by a curly brace on a new line', function() {
        //     assert(checker.checkString('if(x)\n{x++;}').isEmpty());
        // });

        // it('should not report error when `if` is not followed by an curly brace', function() {
        //     assert(checker.checkString('if(x)x++;').isEmpty());
        // });



        // it('should report error when `else` is followed by a curly brace on the same line', function() {
        //     assert(checker.checkString('if(x)x++;else{x--;}').getErrorCount() === 1);
        // });

        // it('should not report error when `else` is followed by a curly brace on a new line', function() {
        //     assert(checker.checkString('if(x)x++;else\n{x--;}').isEmpty());
        // });

        // it('should not report error when `else` is not followed by an curly brace', function() {
        //     assert(checker.checkString('if(x)x++;else x--;').isEmpty());
        // });



        // it('should report error when `do` is followed by a curly brace on the same line', function() {
        //     assert(checker.checkString('do{}while(true);').getErrorCount() === 1);
        // });

        // it('should not report error when `do` is followed by a curly brace on a new line', function() {
        //     assert(checker.checkString('do\n{}while(true);').isEmpty());
        // });



        // it('should report error when `for` is followed by a curly brace on the same line', function() {
        //     assert(checker.checkString('for (;;){x++}').getErrorCount() === 1);
        // });

        // it('should not report error when `for` is followed by a curly brace on a new line', function() {
        //     assert(checker.checkString('for (;;)\n{x++}').isEmpty());
        // });

        // it('should not report error when `for` is not followed by an curly brace', function() {
        //     assert(checker.checkString('for (;;)\nx++').isEmpty());
        //     assert(checker.checkString('for (;;)x++').isEmpty());
        // });



        // it('should report error when `for in` is followed by a curly brace on the same line', function() {
        //     assert(checker.checkString('for(var i in [1,2,3]){a++;}').getErrorCount() === 1);
        // });

        // it('should not report error when `for in` is followed by a curly brace on a new line', function() {
        //     assert(checker.checkString('for(var i in [1,2,3])\n{a++;}').isEmpty());
        // });

        // it('should not report error when `for in` is not followed by an curly brace', function() {
        //     assert(checker.checkString('for(var i in [1,2,3])\na++;').isEmpty());
        //     assert(checker.checkString('for(var i in [1,2,3])a++;').isEmpty());
        // });



        // it('should report error when `function` is followed by a curly brace on the same line', function() {
        //     assert(checker.checkString('function test(){\n}').getErrorCount() === 1);
        // });

        // it('should not report error when `function` is followed by a curly brace on a new line', function() {
        //     assert(checker.checkString('function test()\n{\n}').isEmpty());
        // });



        // it('should report error when `switch` is followed by a curly brace on the same line', function() {
        //     assert(checker.checkString('switch(me){case"yeah":a++;}').getErrorCount() === 1);
        // });

        // it('should not report error when `switch` is followed by a curly brace on a new line', function() {
        //     assert(checker.checkString('switch(me)\n{case"yeah":a++;}').isEmpty());
        // });



        // it('should report error when `try` and `catch` are not followed by new lines', function() {
        //     assert(checker.checkString('try{a();}catch(e){}').getErrorCount() === 2);
        // });

        // it('should report error when `try` is not followed by a new line', function() {
        //     assert(checker.checkString('try{a();}catch(e)\n{}').getErrorCount() === 1);
        // });

        // it('should report error when `catch` is not followed by a new line', function() {
        //     assert(checker.checkString('try\n{a();}catch(e){}').getErrorCount() === 1);
        // });

        // it('should not report error when `try` and `catch` are followed by new lines', function() {
        //     assert(checker.checkString('try\n{a();}catch(e)\n{}').isEmpty());
        // });



        // it('should report error when `while` is followed by a curly brace on the same line', function() {
        //     assert(checker.checkString('while (false){j--;}').getErrorCount() === 1);
        // });

        // it('should not report error when `while` is followed by a curly brace on a new line', function() {
        //     assert(checker.checkString('while (false)\n{j--;}').isEmpty());
        // });

        // it('should not report error when `while` is not followed by an curly brace', function() {
        //     assert(checker.checkString('while (false)\nj--;').isEmpty());
        //     assert(checker.checkString('while (false)j--;').isEmpty());
        // });


    });


/*
    describe('option value "if"', function() {
        beforeEach(function() {
            checker.configure({ requireNewlineBeforeBlockStatements: ['if'] });
        });

        it('should not report error when no if is found', function() {
            assert(checker.checkString('function test() {abc();}').isEmpty());
        });

        it('should report error when new line is missing before if', function() {
            assert(checker.checkString('function test() { if(true){abc();}}').getErrorCount() === 1);
        });

        it('should not report error when new line is missing before if', function() {
            assert(checker.checkString('function test() { if(true)\n{abc();}}').isEmpty());
        });

        it('should not report', function() {
            assert(checker.checkString('function test() {\nif(true)\n{\nabc();\n}\n}').isEmpty());
        });

        it('should report', function() {
            assert(checker.checkString('function test() {\nif(true) {\nabc();\n}\n}').getErrorCount() === 1);
        });

    // it('should not report missing newline if there is one', function() {
    //     assert(checker.checkString('function test()\n{abc();}').isEmpty());
    // });

    // it('should not report missing newline if there are more of them combined with white-spaces', function() {
    //     assert(checker.checkString('function test()       \n    \n/*BLOCK* /   {abc();}').isEmpty());
    // });

    // it('should not report missing newline for object definitions', function() {
    //     assert(checker.checkString('function test()\n{var obj = {a:1,\nb:2,\nc:3\n};\n\n return {\nval:1\n};\n}')
    //         .isEmpty());
    // });

    // it('should report missing newline only for function definition block statement', function() {
    //     assert(checker.checkString('function test(){var obj = {a:1,\nb:2,\nc:3\n};\n\n return {\nval:1\n};\n}')
    //         .getErrorCount() === 1);
    // });

    // it('should report missing newline for all 3 statements', function() {
    //     assert(checker.checkString('function test(){\nif(true){\nreturn 1;\n}\nfor(var i in [1,2,3]){\n}\n}')
    //         .getErrorCount() === 3);
    // });

    // it('should not report missing newline', function() {
    //     assert(checker.checkString('function test()\n{\nif(true)\n{\nreturn 1;\n}\nfor(var i in [1,2,3])\n{\n}\n}')
    //         .isEmpty());
    // });
    });
*/

});
