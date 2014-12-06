var assert = require('assert');
var defaultKeywords = require('../utils').curlyBracedKeywords;

module.exports = function() {};

module.exports.prototype = {
    configure: function(statementTypes) {
        assert(
            Array.isArray(statementTypes) || statementTypes === true,
            'requireNewlineBeforeBlockStatements option requires array or true value or should be removed'
        );

        if (statementTypes === true) {
            statementTypes = defaultKeywords;
            statementTypes.push('finally');
            statementTypes.push('function');
            statementTypes.push('with');
            statementTypes.push('switch');
        }

        this._typeIndex = {};
        for (var i = 0, l = statementTypes.length; i < l; i++) {
            this._typeIndex[statementTypes[i]] = true;
        }
    },

    getOptionName: function() {
        return 'requireNewlineBeforeBlockStatements';
    },

    check: function(file, errors) {
//*

        function checkBody(type, typeString) {
            file.iterateNodesByType(type, function(node) {
                checkToken(node.range[0], node.body.range[0], typeString);
            });
        }

        function checkToken(checkedTokenRangeStart, blockTokenRangeStart, typeString) {
            var checkedToken = file.getTokenByRangeStart(checkedTokenRangeStart);
            var blockToken = file.getTokenByRangeStart(blockTokenRangeStart);

            // only do the check if the next token is a curly brace
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

        var typeIndex = this._typeIndex;

// MISSING IN LIST
// finally
// function
// switch
// with

// MISSING IN RULE
// 'case',
// 'default'

        if (typeIndex['catch'])
        {
            checkBody('CatchClause', 'Catch');
        }

        if (typeIndex['do'])
        {
            checkBody('DoWhileStatement', 'Do while');
        }

        if (typeIndex['for'])
        {
            checkBody('ForStatement', 'For');
            checkBody('ForInStatement', 'For in');
        }

        if (typeIndex['function'])
        {
            checkBody('FunctionDeclaration', 'Function');
        }

        if (typeIndex['with'])
        {
            checkBody('WithStatement', 'With');
        }

        if (typeIndex['while'])
        {
            checkBody('WhileStatement', 'While');
        }

        if (typeIndex['if'] || typeIndex['else'])
        {
            file.iterateNodesByType('IfStatement', function(node) {

                if (typeIndex['if'])
                {
                    checkToken(node.range[0], node.consequent.range[0], 'If');
                }

                if (typeIndex['else'] && node.alternate && node.alternate.type !== 'IfStatement')
                {
                    checkToken(node.range[0], node.alternate.range[0], 'Else');
                }
            });
        }

        if (typeIndex['switch'])
        {
            file.iterateNodesByType('SwitchStatement', function(node) {
                var checkedToken = file.getTokenByRangeStart(node.range[0]);
                var nextPunctuatorToken = file.findNextToken(checkedToken, 'Punctuator', '{');

                checkToken(node.range[0], nextPunctuatorToken.range[0], 'Switch');
            });
        }


        if (typeIndex['try'] || typeIndex['finally'])
        {
            file.iterateNodesByType('TryStatement', function(node) {
                if (typeIndex['try'])
                {
                    checkToken(node.range[0], node.block.range[0], 'Try');
                }

                if (typeIndex['finally'] && node.finalizer)
                {
                    var blockToken = file.getTokenByRangeStart(node.finalizer.range[0]);
                    var checkedToken = file.findPrevToken(blockToken, 'Keyword', 'finally');

                    checkToken(checkedToken.range[0], node.finalizer.range[0], 'Finally');
                }
            });
        }

        // Token
        // Boolean, Identifier, Keyword, Null, Numeric, Punctuator, String,
        // RegularExpression and "<end>"

        // Nodes:
        // ArrayExpression, AssignmentExpression, BinaryExpression,
        // BlockStatement, BreakStatement, CallExpression, CatchClause,
        // ConditionalExpression, ContinueStatement, DebuggerStatement,
        // DoWhileStatement, EmptyStatement, ExpressionStatement,
        // ForInStatement, ForStatement, FunctionDeclaration,
        // FunctionExpression, Identifier, IfStatement, LabeledStatement,
        // Literal, LogicalExpression, MemberExpression, NewExpression,
        // ObjectExpression, Program, Property, ReturnStatement,
        // SequenceExpression, SwitchCase, SwitchStatement, ThisExpression,
        // ThrowStatement, TryStatement, UnaryExpression, UpdateExpression,
        // VariableDeclaration, VariableDeclarator, WhileStatement,
        // WithStatement

/*/
        file.iterateNodesByType('BlockStatement', function(node) {
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

        });
//*/

    }
};
