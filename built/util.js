define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function assert(condition, message) {
        if (!condition) {
            throw message || "Assertion failed";
        }
    }
    exports.assert = assert;
    function defined(condition) {
        if (condition == undefined) {
            throw "Variable undefined";
        }
    }
    exports.defined = defined;
    function square(n) {
        return n * n;
    }
    exports.square = square;
    function assertInt(n) {
        if (!Number.isInteger(n)) {
            throw "TypeError: expected int";
        }
    }
    exports.assertInt = assertInt;
    function randomInt(high, low) {
        if (low == undefined) {
            low = 0;
        }
        assertInt(high);
        assertInt(low);
        return Math.floor(Math.random() * (high - low) + low);
    }
    exports.randomInt = randomInt;
    function rollTwoDice() {
        return randomInt(7, 1) + randomInt(7, 1); // high limit (7) is excluded
    }
    exports.rollTwoDice = rollTwoDice;
    /**
     * Randomly shuffle an array
     * https://stackoverflow.com/a/2450976/1293256
     */
    function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    exports.shuffle = shuffle;
    ;
});
//# sourceMappingURL=util.js.map