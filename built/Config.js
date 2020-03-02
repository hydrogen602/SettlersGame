/*
 * App-wide config goes here
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Config {
        constructor() { }
        static getN() {
            return this.n;
        }
        static getIP() {
            return this.ip;
        }
        static getPort() {
            return this.port;
        }
    }
    exports.Config = Config;
    Config.n = 3;
    Config.ip = "127.0.0.1";
    Config.port = 5050;
});
// time spent check
// Coding: 86 min + 225 min + 230 min + 146 min + 86 min = 773 min
// Stackoverflow: 36 min
// GitHub: 31 min + 15 min
//
// Total: 855 min = 14h 15min
// As of the commit that added this
//# sourceMappingURL=Config.js.map