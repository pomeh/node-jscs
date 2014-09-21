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

        it('should report missing newline before opening brace', function() {
            assert(checker.checkString('function test() {abc();}').getErrorCount() === 1);
        });

        it('should report missing newline before opening brace when there are white-spaces between', function() {
            assert(checker.checkString('function test()      /* COOOMMMENTTT*/ {abc();}').getErrorCount() === 1);
        });

        it('should not report missing newline if there is one', function() {
            assert(checker.checkString('function test()\n{abc();}').isEmpty());
        });

        it('should not report missing newline if there are more of them combined with white-spaces', function() {
            assert(checker.checkString('function test()       \n    \n/*BLOCK*/   {abc();}').isEmpty());
        });

        it('should not report missing newline for object definitions', function() {
            assert(checker.checkString('function test()\n{var obj = {a:1,\nb:2,\nc:3\n};\n\n return {\nval:1\n};\n}')
                .isEmpty());
        });

        it('should report missing newline only for function definition block statement', function() {
            assert(checker.checkString('function test(){var obj = {a:1,\nb:2,\nc:3\n};\n\n return {\nval:1\n};\n}')
                .getErrorCount() === 1);
        });

        it('should report missing newline for all 3 statements', function() {
            assert(checker.checkString('function test(){\nif(true){\nreturn 1;\n}\nfor(var i in [1,2,3]){\n}\n}')
                .getErrorCount() === 3);
        });

        it('should not report missing newline', function() {
            assert(checker.checkString('function test()\n{\nif(true)\n{\nreturn 1;\n}\nfor(var i in [1,2,3])\n{\n}\n}')
                .isEmpty());
        });
    });

    describe('check all keywods where curly braces are a stylistic choice', function() {
        beforeEach(function() {
            checker.configure({ requireNewlineBeforeBlockStatements: true });
        });

        it('should report error when `do` is followed by a curly brace on the same line', function() {
            assert(checker.checkString('do{foo++;}while(true);').getErrorCount() === 1);
        });

        it('should not report error when `do` is followed by a curly brace on a new line', function() {
            assert(checker.checkString('do\n{foo++;}while(true);').isEmpty());
        });

        it('should not report error when `do` is not followed by an curly brace', function() {
            assert(checker.checkString('do foo++;while(true);').isEmpty());
            assert(checker.checkString('do\nfoo++;while(true);').isEmpty());
        });

        it('should report error when `else` is followed by a curly brace on the same line', function() {
            assert(checker.checkString('if(foo)foo++;else{foo--;}').getErrorCount() === 1);
        });

        it('should not report error when `else` is followed by a curly brace on a new line', function() {
            assert(checker.checkString('if(foo)foo++;else\n{foo--;}').isEmpty());
        });

        it('should not report error when `else` is not followed by an curly brace', function() {
            assert(checker.checkString('if(foo)foo++;else foo--;').isEmpty());
            assert(checker.checkString('if(foo)foo++;else\nfoo--;').isEmpty());
        });

        it('should report error when `for` is followed by a curly brace on the same line', function() {
            assert(checker.checkString('for(;;){foo++}').getErrorCount() === 1);
        });

        it('should not report error when `for` is followed by a curly brace on a new line', function() {
            assert(checker.checkString('for(;;)\n{foo++}').isEmpty());
        });

        it('should not report error when `for` is not followed by an curly brace', function() {
            assert(checker.checkString('for(;;)foo++').isEmpty());
            assert(checker.checkString('for(;;)\nfoo++').isEmpty());
        });

        it('should report error when `for in` is followed by a curly brace on the same line', function() {
            assert(checker.checkString('for(var bar in [1,2,3]){foo++;}').getErrorCount() === 1);
        });

        it('should not report error when `for in` is followed by a curly brace on a new line', function() {
            assert(checker.checkString('for(var bar in [1,2,3])\n{foo++;}').isEmpty());
        });

        it('should not report error when `for in` is not followed by an curly brace', function() {
            assert(checker.checkString('for(var bar in [1,2,3])\nfoo++;').isEmpty());
            assert(checker.checkString('for(var bar in [1,2,3])foo++;').isEmpty());
        });

        it('should report error when `function` is followed by a curly brace on the same line', function() {
            assert(checker.checkString('function foo(){}').getErrorCount() === 1);
        });

        it('should not report error when `function` is followed by a curly brace on a new line', function() {
            assert(checker.checkString('function foo()\n{}').isEmpty());
        });

        it('should report error when `if` is followed by a curly brace on the same line', function() {
            assert(checker.checkString('if(foo){foo++;}').getErrorCount() === 1);
        });

        it('should not report error when `if` is followed by a curly brace on a new line', function() {
            assert(checker.checkString('if(foo)\n{foo++;}').isEmpty());
        });

        it('should not report error when `if` is not followed by an curly brace', function() {
            assert(checker.checkString('if(foo)foo++;').isEmpty());
            assert(checker.checkString('if(foo)\nfoo++;').isEmpty());
        });

        it('should report error when `switch` is followed by a curly brace on the same line', function() {
            assert(checker.checkString('switch(bar){case"baz":foo++;}').getErrorCount() === 1);
        });

        it('should not report error when `switch` is followed by a curly brace on a new line', function() {
            assert(checker.checkString('switch(bar)\n{case"baz":foo++;}').isEmpty());
        });

        it('should report error when `try`, `catch` and `finally` are not followed by new lines', function() {
            assert(checker.checkString('try{foo++;}catch(e){}finally{}').getErrorCount() === 3);
        });

        it('should report error when `try` and `catch` are not followed by new lines', function() {
            assert(checker.checkString('try{foo++;}catch(e){}').getErrorCount() === 2);
        });

        it('should report error when `try` and `finally` are not followed by new lines', function() {
            assert(checker.checkString('try{foo++;}finally{}').getErrorCount() === 2);
        });

        it('should report error when `try` is not followed by a new line', function() {
            assert(checker.checkString('try{foo++;}catch(e)\n{}').getErrorCount() === 1);
            assert(checker.checkString('try{foo++;}finally\n{}').getErrorCount() === 1);
        });

        it('should report error when `catch` is not followed by a new line', function() {
            assert(checker.checkString('try\n{foo++;}catch(e){}').getErrorCount() === 1);
        });

        it('should report error when `finally` is not followed by a new line', function() {
            assert(checker.checkString('try\n{foo++;}finally{}').getErrorCount() === 1);
        });

        it('should not report error when `try` and `catch` are followed by new lines', function() {
            assert(checker.checkString('try\n{foo++;}catch(e)\n{}').isEmpty());
        });

        it('should not report error when `try` and `finally` are followed by new lines', function() {
            assert(checker.checkString('try\n{foo++;}finally\n{}').isEmpty());
        });

        it('should not report error when `try`, `catch` and `finally` are followed by new lines', function() {
            assert(checker.checkString('try\n{foo++;}catch(e)\n{}finally\n{}').isEmpty());
        });

        it('should report error when `with` is followed by a curly brace on the same line', function() {
            assert(checker.checkString('with(foo){foo++}').getErrorCount() === 1);
        });

        it('should not report error when `with` is followed by a curly brace on a new line', function() {
            assert(checker.checkString('with(foo)\n{foo++}').isEmpty());
        });

        it('should report error when `while` is followed by a curly brace on the same line', function() {
            assert(checker.checkString('while(bar){foo++;}').getErrorCount() === 1);
        });

        it('should not report error when `while` is followed by a curly brace on a new line', function() {
            assert(checker.checkString('while(bar)\n{foo++;}').isEmpty());
        });

        it('should not report error when `while` is not followed by an curly brace', function() {
            assert(checker.checkString('while(bar)\nfoo++;').isEmpty());
            assert(checker.checkString('while(bar)foo++;').isEmpty());
        });
    });

});
