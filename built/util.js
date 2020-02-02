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
});
//# sourceMappingURL=util.js.map