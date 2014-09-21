var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
    configure: function(statementTypes) {
        assert(
            Array.isArray(statementTypes) || statementTypes === true,
            'requireNewlineBeforeBlockStatements option requires array or true value or should be removed'
        );
    },

    getOptionName: function() {
        return 'requireNewlineBeforeBlockStatements';
    },

    check: function(file, errors) {

        function checkBody(checkedTokenRangeStart, blockTokenRangeStart, typeString) {
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

        var nameByType = {
            CatchClause: 'Catch',
            DoWhileStatement: 'Do while',
            ForInStatement: 'For in',
            ForStatement: 'For',
            FunctionDeclaration: 'Function',
            WithStatement: 'With',
            WhileStatement: 'While'
        };
        var nodeTypes = Object.keys(nameByType);

        file.iterateNodesByType(nodeTypes, function(node) {
            var name = nameByType[node.type];
            checkBody(node.range[0], node.body.range[0], name);
        });

        file.iterateNodesByType('IfStatement', function(node) {
            checkBody(node.range[0], node.consequent.range[0], 'If');

            if (node.alternate && node.alternate.type !== 'IfStatement')
            {
                checkBody(node.range[0], node.alternate.range[0], 'Else');
            }
        });

        file.iterateNodesByType('SwitchStatement', function(node) {
            var checkedToken = file.getTokenByRangeStart(node.range[0]);
            var nextPunctuatorToken = file.findNextToken(checkedToken, 'Punctuator', '{');

            checkBody(node.range[0], nextPunctuatorToken.range[0], 'Switch');
        });

        file.iterateNodesByType('TryStatement', function(node) {
            checkBody(node.range[0], node.block.range[0], 'Try');

            if (node.finalizer)
            {
                var blockToken = file.getTokenByRangeStart(node.finalizer.range[0]);
                var checkedToken = file.findPrevToken(blockToken, 'Keyword', 'finally');

                checkBody(checkedToken.range[0], node.finalizer.range[0], 'Finally');
            }
        });

    }
};
