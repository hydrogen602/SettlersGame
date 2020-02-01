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
        if (!condition) {
            throw "Variable undefined";
        }
    }
    exports.defined = defined;
});
//# sourceMappingURL=util.js.map