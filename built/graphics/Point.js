define(["require", "exports", "./Hex", "../Config", "../util"], function (require, exports, Hex_1, Config_1, util_1) {
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
        constructor(col, row) {
            util_1.assert(parseInt(col + '') == col && parseInt(row + '') == row, "Must be integers");
            super(col, row);
        }
        toAbsPoint() {
            var p = Hex_1.Hex.hexGridToPxUnshifted(this.y, this.x);
            return new AbsPoint(p.x, p.y);
        }
        toRelPoint() {
            var p = Hex_1.Hex.hexGridToPx(this.y, this.x);
            return new RelPoint(p.x, p.y);
        }
        isNeighbor(other) {
            if (other.x == this.x && other.y == this.y + 1) {
                return true;
            }
            if (other.x == this.x && other.y == this.y - 1) {
                return true;
            }
            if (Math.abs(this.x % 2) == Math.abs(this.y % 2)) {
                // check right
                if (other.x == this.x + 1 && other.y == this.y) {
                    return true;
                }
            }
            else {
                // check left
                if (other.x == this.x - 1 && other.y == this.y) {
                    return true;
                }
            }
            return false;
        }
        isEqual(other) {
            return (other.x == this.x && other.y == this.y);
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
        toAbsPoint() {
            return new AbsPoint(this.x, this.y);
        }
        toHexPoint() {
            return Hex_1.Hex.pxUnshiftedToHexGrid(this.x, this.y);
        }
    }
    exports.AbsPoint = AbsPoint;
    class RelPoint extends Point {
        constructor(x, y) {
            super(x, y);
        }
        toRelPoint() {
            return new RelPoint(this.x, this.y);
        }
        toAbsPoint() {
            return new AbsPoint(this.x - exports.currLocation.x, this.y - exports.currLocation.y);
        }
        toHexPoint() {
            var p = this.toAbsPoint();
            return Hex_1.Hex.pxUnshiftedToHexGrid(p.x, p.y);
        }
        toDualHexPoint() {
            var p = this.toAbsPoint();
            var h = Hex_1.Hex.pxUnshiftedToDualHexGrid(p.x, p.y);
            return h;
        }
    }
    exports.RelPoint = RelPoint;
});
//# sourceMappingURL=Point.js.map