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
});
//# sourceMappingURL=util.js.map