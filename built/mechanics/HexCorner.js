define(["require", "exports", "../graphics/Point", "../util", "../graphics/Hex", "./GameManager", "../map/Settlement", "../graphics/Screen", "../map/Road"], function (require, exports, Point_1, util_1, Hex_1, GameManager_1, Settlement_1, Screen_1, Road_1) {
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
        static mouseHoverHandler(e) {
            if (GameManager_1.GameManager.instance.mayPlaceSettlement) {
                var p = new Point_1.RelPoint(e.clientX, e.clientY);
                var r = HexCorner.distanceFromNearestHexCorner(p);
                if (r < Hex_1.Hex.getSideLength() / 4) {
                    // hovering over a corner
                    var h = p.toHexPoint();
                    var m = GameManager_1.GameManager.instance.getMap();
                    if (m.isAllowedSettlement(h)) {
                        var back = h.toRelPoint();
                        Settlement_1.Settlement.stroke(back, Screen_1.ctx);
                    }
                }
                else {
                    GameManager_1.GameManager.instance.draw();
                }
            }
            else if (GameManager_1.GameManager.instance.mayPlaceRoad) {
                // if (this.roadTmpFirstEnd == undefined) {
                var p = new Point_1.RelPoint(e.clientX, e.clientY);
                var r = HexCorner.distanceFromNearestHexCorner(p);
                var hArr = p.toDualHexPoint();
                var m = GameManager_1.GameManager.instance.getMap();
                if (hArr.length == 2 && m.isAllowedRoad(hArr[0], hArr[1])) { // hArr is empty if not over a line
                    GameManager_1.GameManager.instance.draw();
                    // hovering over a line
                    var h = p.toHexPoint();
                    Road_1.Road.stroke(hArr[0].toRelPoint(), hArr[1].toRelPoint(), Screen_1.ctx);
                }
                else {
                    GameManager_1.GameManager.instance.draw();
                }
            }
        }
        static mouseHandler(e) {
            var p = new Point_1.RelPoint(e.clientX, e.clientY);
            var r = HexCorner.distanceFromNearestHexCorner(p);
            var hArr = p.toDualHexPoint();
            // console.log(hArr);
            // console.log("event", e);
            if (GameManager_1.GameManager.instance.mayPlaceSettlement) {
                var p = new Point_1.RelPoint(e.clientX, e.clientY);
                var r = HexCorner.distanceFromNearestHexCorner(p);
                if (r < Hex_1.Hex.getSideLength() / 4) {
                    // clicked on a corner
                    var h = p.toHexPoint();
                    //console.log("new settlement");
                    var m = GameManager_1.GameManager.instance.getMap();
                    if (m.isAllowedSettlement(h)) {
                        m.addSettlement(new Settlement_1.Settlement(h, GameManager_1.GameManager.instance.getCurrentPlayer()));
                        m.draw();
                        //console.log("success");
                        GameManager_1.GameManager.instance.print("New Settlement created");
                        GameManager_1.GameManager.instance.mayPlaceSettlement = false;
                    }
                    else {
                        // console.log("not allowed position");
                        GameManager_1.GameManager.instance.printErr("Illegal Position");
                    }
                }
            }
            else if (GameManager_1.GameManager.instance.mayPlaceRoad) {
                var p = new Point_1.RelPoint(e.clientX, e.clientY);
                var r = HexCorner.distanceFromNearestHexCorner(p);
                var hArr = p.toDualHexPoint();
                if (hArr.length == 2) { // hArr is empty if not over a line 
                    var m = GameManager_1.GameManager.instance.getMap();
                    if (m.isAllowedRoad(hArr[0], hArr[1])) { // check if road already there
                        m.addRoad(new Road_1.Road(hArr[0], hArr[1], GameManager_1.GameManager.instance.getCurrentPlayer()));
                        m.draw();
                        GameManager_1.GameManager.instance.print("New Road created");
                        GameManager_1.GameManager.instance.mayPlaceRoad = false;
                    }
                    else {
                        GameManager_1.GameManager.instance.printErr("Illegal Position");
                    }
                }
            }
        }
    }
    exports.HexCorner = HexCorner;
});
//# sourceMappingURL=HexCorner.js.map