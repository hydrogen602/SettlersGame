define(["require", "exports", "./Hex", "../Config"], function (require, exports, Hex_1, Config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    // offset x = 1.5x-0.5
    // offset of map on screen in order to move around the map
    exports.currLocation = new Point(window.innerWidth / 2 - Hex_1.Hex.getSideLength() * (1.5 * Config_1.Config.getN() - 0.5), window.innerHeight / 2 - Hex_1.Hex.getApothem() * Config_1.Config.getN()); // in px
    exports.centerOfScreen = new Point(window.innerWidth / 2 - Hex_1.Hex.getSideLength() * (1.5 * Config_1.Config.getN() - 0.5), window.innerHeight / 2 - Hex_1.Hex.getApothem() * Config_1.Config.getN()); // in px
    exports.maxDistance = Hex_1.Hex.getSideLength() * (1.5 * Config_1.Config.getN() - 0.5) * 1.5;
    class HexPoint extends Point {
        constructor(x, y) {
            super(x, y);
        }
        toAbsPoint() {
            var p = Hex_1.Hex.hexGridToPxUnshifted(this.y, this.x);
            return new AbsPoint(p.x, p.y);
        }
        toRelPoint() {
            var p = Hex_1.Hex.hexGridToPx(this.y, this.x);
            return new RelPoint(p.x, p.y);
        }
    }
    exports.HexPoint = HexPoint;
    class AbsPoint extends Point {
        constructor(x, y) {
            super(x, y);
        }
        toRelPoint() {
            return new RelPoint(this.x + exports.currLocation.x, this.y + exports.currLocation.y);
        }
    }
    exports.AbsPoint = AbsPoint;
    class RelPoint extends Point {
        constructor(x, y) {
            super(x, y);
        }
        toAbsPoint() {
            return new AbsPoint(this.x - exports.currLocation.x, this.y - exports.currLocation.y);
        }
    }
    exports.RelPoint = RelPoint;
});
//# sourceMappingURL=Point.js.map