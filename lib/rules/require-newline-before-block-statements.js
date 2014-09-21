var assert = require('assert');
var defaultKeywords = require('../utils').curlyBracedKeywords;

module.exports = function() {};

function debug1() {
    var tokens = file.getTokens();
    var _index = file._index;

    var histogram = {};
    tokens.forEach(function(token) {
        histogram[token.type] = (histogram[token.type] || 0) + 1;
    });

    for (type in histogram) {
        if (histogram.hasOwnProperty(type)) {
            console.log(type, histogram[type]);
        }
    }

    console.log('--------');

    var histogram = {};
    for (var type in _index)
    {
        histogram[type] = (histogram[type] || 0) + 1;
    }

    for (type in histogram) {
        if (histogram.hasOwnProperty(type)) {
            console.log(type, histogram[type]);
        }
    }
}

module.exports.prototype = {
    configure: function(statementTypes) {
        assert(
            Array.isArray(statementTypes) || statementTypes === true,
            'requireNewlineBeforeBlockStatements option requires array or true value'
        );

        if (statementTypes === true) {
            this._typeIndex = true;
        }
        else {
            this._typeIndex = {};
            for (var i = 0, l = statementTypes.length; i < l; i++) {
                this._typeIndex[statementTypes[i]] = true;
            }
        }
    },

    getOptionName: function() {
        return 'requireNewlineBeforeBlockStatements';
    },

    check: function(file, errors) {
        console.log('');
        console.log('');
        console.log('');
        console.log('________________');

        /**
         * All keywords where spaces are a stylistic choice
         * @type {Array}
         */
        var ___spacedKeywords = [
            // 'case',
            // 'catch',
            'do',
            'else',
            'for',
            'function',
            'if',
            'return',
            'switch',
            'try',
            'typeof',
            'void',
            'while',
            'with',
        ];
        /**
         * All keywords where curly braces are a stylistic choice
         * @type {Array}
         */
        var ___curlyBracedKeywords = [
            // 'case', ??
            // 'default', ??
            'catch',
            'do',
            'else',
            'for',
            'if',
            'try',
            'while',
        ];


        // function addError(typeString, node) {
        //     errors.add(
        //         'Missing newline before curly brace for ' + typeString + 'block statement',
        //         node.loc.start.line,
        //         node.loc.start.column
        //     );
        // }

        // function checkBody(type, typeString) {
        //     file.iterateNodesByType(type, function(node) {
        //         if (node.body && node.body.type !== 'BlockStatement') {
        //             addError(typeString, node);
        //         }
        //     });
        // }


        // var typeIndex = this._typeIndex;
        // if (typeIndex['if'] || typeIndex['else']) {
        //     file.iterateNodesByType('IfStatement', function(node) {
        //         if (typeIndex.if && node.consequent && node.consequent.type !== 'BlockStatement') {
        //             addError('If', node);
        //         }
        //         if (typeIndex['else'] && node.alternate &&
        //             node.alternate.type !== 'BlockStatement' &&
        //             node.alternate.type !== 'IfStatement'
        //         ) {
        //             addError('Else', node);
        //         }
        //     });
        // }

        // var blockStatements = file.getNodesByType('BlockStatement');


        // Token
        // Boolean, Identifier, Keyword, Null, Numeric, Punctuator, String, RegularExpression and "<end>"

        // Nodes
        // ArrayExpression, AssignmentExpression, BinaryExpression, BlockStatement, BreakStatement, CallExpression, CatchClause, ConditionalExpression, ContinueStatement, DebuggerStatement, DoWhileStatement, EmptyStatement, ExpressionStatement, ForInStatement, ForStatement, FunctionDeclaration, FunctionExpression, Identifier, IfStatement, LabeledStatement, Literal, LogicalExpression, MemberExpression, NewExpression, ObjectExpression, Program, Property, ReturnStatement, SequenceExpression, SwitchCase, SwitchStatement, ThisExpression, ThrowStatement, TryStatement, UnaryExpression, UpdateExpression, VariableDeclaration, VariableDeclarator, WhileStatement, WithStatement

        // file.iterateNodesByType('FunctionDeclaration', function(node) {
        // });

        function checkBody(checkedTokenRangeStart, blockTokenRangeStart, typeString) {
            var checkedToken = file.getTokenByRangeStart(checkedTokenRangeStart);
            var blockToken = file.getTokenByRangeStart(blockTokenRangeStart);

            // only do the check if the next token is a curly braces
            if (blockToken.type !== 'Punctuator' || blockToken.value !== '{')
            {
                return;
            }

            if (blockToken.loc.start.line === checkedToken.loc.start.line) {
                errors.add(
                    typeString + ' should have a new line before the opening curly brace',
                    blockToken.loc.start
                );
            }
        }



        var nameByType = {
            CatchClause: 'Catch',
            DoWhileStatement: 'Do while',
            ForInStatement: 'For in',
            ForStatement: 'For',
            FunctionDeclaration: 'function',
            // TryStatement: 'Try',
            // SwitchStatement: 'Switch',
            WhileStatement: 'While',
                // catch            => CODE             TEST_OK
                // do               => CODE             TEST_OK
                // else             => CODE             TEST_OK
                // finally          => ____     ____
                // for              => CODE             TEST_OK
                // for in           => CODE             TEST_OK
                // function         => CODE             TEST_OK
                // if               => CODE             TEST_OK
                // return           => ____     ____
                // switch           => ____     ____
                // try              => CODE             TEST_OK
                // while            => CODE             TEST_OK
                // with             => ____     ____
        };
        var nodeTypes = Object.keys(nameByType);


return;
        var tokens = file.getTokens();
        file.iterateNodesByType('SwitchStatement', function(node) {

            var switchToken = file.getTokenByRangeStart(node.range[0]);

            var nextPunctuatorToken = file.findNextToken(switchToken, 'Punctuator', '{');

        });

/*
        file.iterateNodesByType('SwitchStatement', function(node) {
            console.log('');
            console.log('');
            // console.log('===========================');
            // console.log('____ node', node);
            // console.log('____ node.type', node.type);
            // console.log('____ node.body', node.body);

            var checkedToken = file.getTokenByRangeStart(node.range[0]);

            var nextPunctuatorToken = file.findNextToken(checkedToken, 'Punctuator', '{');
            console.log('nextPunctuatorToken.type', nextPunctuatorToken.type);
            console.log('nextPunctuatorToken.value', nextPunctuatorToken.value);



            console.log('end');

            return;

            // console.log('');
            // console.log('');
            // console.log('===========================');
            // console.log('____ checkedToken', checkedToken);
            // console.log('____ checkedToken.type', checkedToken.type);
            // console.log('____ checkedToken.value', checkedToken.value);

            var checkedTokenPos = file.getTokenPosByRangeStart(node.range[0]);
            // console.log('');
            // console.log('');
            // console.log('===========================');
            // console.log('____ checkedTokenPos', checkedTokenPos);
            // console.log('____ checkedTokenPos.type', checkedTokenPos.type);
            // console.log('____ checkedTokenPos.value', checkedTokenPos.value);

            var switchStatementToken = tokens[checkedTokenPos];
            // console.log('');
            // console.log('');
            // console.log('===========================');
            // console.log('____ switchStatementToken', switchStatementToken);
            // console.log('____ switchStatementToken.type', switchStatementToken.type);
            // console.log('____ switchStatementToken.value', switchStatementToken.value);

            var nextToken = tokens[checkedTokenPos + 1];
            // console.log('');
            // console.log('');
            // console.log('===========================');
            // console.log('____ nextToken', nextToken);
            // console.log('____ nextToken.type', nextToken.type);
            // console.log('____ nextToken.value', nextToken.value);

            var nextPunctuatorToken = file.findNextToken(switchStatementToken, 'Punctuator', '{');
            // console.log('');
            // console.log('');
            // console.log('===========================');
            // console.log('____ nextPunctuatorToken', nextPunctuatorToken);
            // console.log('____ nextPunctuatorToken.type', nextPunctuatorToken.type);
            // console.log('____ nextPunctuatorToken.value', nextPunctuatorToken.value);

            // var second = file.getNextToken(switchStatementToken);
            // console.log('');
            // console.log('');
            // console.log('===========================');
            // console.log('____ second', second);
            // console.log('____ second.type', second.type);
            // console.log('____ second.value', second.value);

            // var third = file.getNextToken(second);
            // console.log('');
            // console.log('');
            // console.log('===========================');
            // console.log('____ third', third);
            // console.log('____ third.type', third.type);
            // console.log('____ third.value', third.value);

            // var fourth = file.getNextToken(third);
            // console.log('');
            // console.log('');
            // console.log('===========================');
            // console.log('____ fourth', fourth);
            // console.log('____ fourth.type', fourth.type);
            // console.log('____ fourth.value', fourth.value);

            // console.log('oooooooooooooooooooooooooooooooooooooo');

        });

*/

        // file.iterateNodesByType('TryStatement', function(node) {
        //     checkBody(node.range[0], node.block.range[0], 'Try');
        // });

        // file.iterateNodesByType('IfStatement', function(node) {
        //     checkBody(node.range[0], node.consequent.range[0], 'If');

        //     if (node.alternate && node.alternate.type !== 'IfStatement')
        //     {
        //         checkBody(node.range[0], node.alternate.range[0], 'Else');
        //     }
        // });

        // file.iterateNodesByType(nodeTypes, function(node) {
        //     var name = nameByType[node.type];
        //     checkBody(node.range[0], node.body.range[0], name);
        // });

        // if (typeIndex['while']) {
        //     checkBody('WhileStatement', 'While');
        // }
        // if (typeIndex['for']) {
        //     checkBody('ForStatement', 'For');
        //     checkBody('ForInStatement', 'For in');
        // }
        // if (typeIndex['do']) {
        //     checkBody('DoWhileStatement', 'Do while');
        // }


        // IfStatement.consequent => BlockStatement
        // VariableDeclaration.declarations[x].init.type === ObjectExpression // voir tokens
        // SwitchStatement // voir tokens



        return;

        file.iterateNodesByType('BlockStatement', function(node) {

            /*
            // ===================================
            var tokens = file.getTokens();
            var openingBracePos = file.getTokenPosByRangeStart(node.range[0]);
            var openingBrace = tokens[openingBracePos];
            var prevToken = tokens[openingBracePos - 1];

            if (openingBrace.loc.start.line === prevToken.loc.start.line) {
                errors.add(
                    'Missing newline before curly brace for block statement',
                    node.loc.start
                );
            }
            // ===================================
            */


            console.log('');
            console.log('__________________');
            console.log('openingBracePos', openingBracePos);
            console.log('openingBrace.loc.start.line', openingBrace.loc.start.line);
            // console.log('openingBrace.type', openingBrace.type);
            // console.log('openingBrace.value', openingBrace.value);


            var types = [
                'BlockStatement',
                'Case',
                'Default',
                'DoWhileStatement',
                'ForInStatement',
                'ForStatement',
                'IfStatement',
                'SwitchCase',
                'WhileStatement',
                'Keyword',
                'Identifier',
            ];

            for (var i = types.length - 1; i >= 0; i--)
            {
                var type = types[i];
                var prevToken = file.findPrevToken(openingBrace, type);
                console.log(type + ' value', prevToken && prevToken.value);
                console.log(type + ' range.join(",")', prevToken && prevToken.range.join(","));
            }

            console.log('============');
            console.log('');




            // var tokens = file.getTokens();

            // node.parentNode.type !== 'CatchClause'
            // var openingBracePos = file.getTokenPosByRangeStart(node.range[0]);
            // var openingBrace = tokens[openingBracePos];
            // var prevToken = tokens[openingBracePos - 1];

            // for (var k in node.loc)
            // {
            //     errors.add(k, node.loc[k], 0);
            // }

            // errors.add([
            //     [''],
            //     ['node.body', node.body].join('\t'),
            //     ['node.loc', node.loc].join('\t'),
            //     ['node.parentCollection', node.parentCollection].join('\t'),
            //     ['node.parentNode', node.parentNode].join('\t'),
            //     ['node.range', node.range].join('\t'),
            //     ['node.type', node.type].join('\t'),
            //     ['prevToken._tokenIndex', prevToken._tokenIndex].join('\t'),
            //     ['prevToken.loc', prevToken.loc].join('\t'),
            //     ['prevToken.range', prevToken.range].join('\t'),
            //     ['prevToken.type', prevToken.type].join('\t'),
            //     ['prevToken.value', prevToken.value].join('\t'),
            //     [''],
            // ].join('\n'));

            var typeIndex = this._typeIndex;
            if (typeIndex['if'] || typeIndex['else']) {
                file.iterateNodesByType('IfStatement', function(node) {
                    if (typeIndex.if && node.consequent && node.consequent.type !== 'BlockStatement') {
                        addError('If', node);
                    }
                    if (typeIndex['else'] && node.alternate &&
                        node.alternate.type !== 'BlockStatement' &&
                        node.alternate.type !== 'IfStatement'
                    ) {
                        addError('Else', node);
                    }
                });
            }

            // if (openingBrace.loc.start.line === prevToken.loc.start.line) {
                // errors.add(
                //     ['debug',
                //         'node.type', node.type,
                //         'prevToken.type', prevToken.type,
                //     ].join(' '),
                //     node.loc.start
                // );
            // }


        });


    }
};
