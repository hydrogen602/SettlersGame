define(["require", "exports", "../graphics/Point", "../util", "../graphics/Hex", "./GameManager", "../map/Settlement"], function (require, exports, Point_1, util_1, Hex_1, GameManager_1, Settlement_1) {
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
        static mouseHandler(e) {
            // console.log("event", e);
            if (GameManager_1.GameManager.instance.mayPlaceSettlement) {
                var p = new Point_1.RelPoint(e.clientX, e.clientY);
                var r = HexCorner.distanceFromNearestHexCorner(p);
                if (r < Hex_1.Hex.getSideLength() / 4) {
                    // clicked on a corner
                    var h = p.toHexPoint();
                    console.log("new settlement");
                    var m = GameManager_1.GameManager.instance.getMap();
                    if (m.isAllowedSettlement(h)) {
                        m.addSettlement(new Settlement_1.Settlement(h, GameManager_1.GameManager.instance.getCurrentPlayer()));
                        m.draw();
                        console.log("success");
                        GameManager_1.GameManager.instance.mayPlaceSettlement = false;
                    }
                    else {
                        console.log("not allowed position");
                    }
                }
            }
            else {
                console.log("not allowed rn");
            }
        }
    }
    exports.HexCorner = HexCorner;
});
//# sourceMappingURL=HexCorner.js.map