/*
 * App-wide config goes here
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Config {
        constructor() {
        }
        static getN() {
            return this.n;
        }
    }
    exports.Config = Config;
    Config.n = 15;
});
//# sourceMappingURL=Config.js.map