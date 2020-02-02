define(["require", "exports", "../util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HexCorner {
        constructor() { }
        static distanceFromNearestHexCorner(p) {
            var hexP = p.toHexPoint();
            var abs = p.toAbsPoint(); // if already absolute, it returns a copy of itself
            var backConvertedHex = hexP.toAbsPoint();
            return Math.sqrt(util_1.square(abs.x - backConvertedHex.x) + util_1.square(abs.y - backConvertedHex.y));
        }
    }
    exports.HexCorner = HexCorner;
});
//# sourceMappingURL=HexCorner.js.map