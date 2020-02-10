define(["require", "exports", "../graphics/Point", "../util", "../graphics/Hex", "./GameManager", "../map/Settlement", "../graphics/Screen", "../map/Road"], function (require, exports, Point_1, util_1, Hex_1, GameManager_1, Settlement_1, Screen_1, Road_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventManager {
        constructor() { }
        static distanceFromNearestHexCorner(p) {
            const hexP = p.toHexPoint();
            const abs = p.toAbsPoint(); // if already absolute, it returns a copy of itself
            const backConvertedHex = hexP.toAbsPoint();
            return Math.sqrt(util_1.square(abs.x - backConvertedHex.x) + util_1.square(abs.y - backConvertedHex.y));
        }
        static mouseHoverHandler(e) {
            if (GameManager_1.GameManager.instance.mayPlaceRobber) {
                const p = new Point_1.RelPoint(e.clientX, e.clientY);
                const m = GameManager_1.GameManager.instance.getMap();
                const tile = m.getAllowedRobberPlace(p.toAbsPoint());
                if (tile != undefined) {
                    const tileExists = tile;
                    tileExists.strokeRobber(Screen_1.ctx);
                }
                else {
                    GameManager_1.GameManager.instance.draw();
                }
            }
            else if (GameManager_1.GameManager.instance.mayPlaceSettlement) {
                const p = new Point_1.RelPoint(e.clientX, e.clientY);
                const r = EventManager.distanceFromNearestHexCorner(p);
                if (r < Hex_1.Hex.getSideLength() / 4) {
                    // hovering over a corner
                    const h = p.toHexPoint();
                    const m = GameManager_1.GameManager.instance.getMap();
                    if (m.isAllowedSettlement(h)) {
                        const back = h.toRelPoint();
                        Settlement_1.Settlement.stroke(back, Screen_1.ctx);
                    }
                }
                else {
                    GameManager_1.GameManager.instance.draw();
                }
            }
            else if (GameManager_1.GameManager.instance.mayPlaceCity) {
                const p = new Point_1.RelPoint(e.clientX, e.clientY);
                const r = EventManager.distanceFromNearestHexCorner(p);
                // strokeCity
                if (r < Hex_1.Hex.getSideLength() / 3.5) {
                    const h = p.toHexPoint();
                    const m = GameManager_1.GameManager.instance.getMap();
                    if (m.isAllowedCity(h)) {
                        Settlement_1.Settlement.strokeCity(h.toRelPoint(), Screen_1.ctx);
                    }
                }
                else {
                    GameManager_1.GameManager.instance.draw();
                }
            }
            else if (GameManager_1.GameManager.instance.mayPlaceRoad) {
                // if (this.roadTmpFirstEnd == undefined) {
                const p = new Point_1.RelPoint(e.clientX, e.clientY);
                const hArr = p.toDualHexPoint();
                const m = GameManager_1.GameManager.instance.getMap();
                if (hArr.length == 2 && m.isAllowedRoad(hArr[0], hArr[1])) { // hArr is empty if not over a line
                    GameManager_1.GameManager.instance.draw();
                    // hovering over a line
                    Road_1.Road.stroke(hArr[0].toRelPoint(), hArr[1].toRelPoint(), Screen_1.ctx);
                }
                else {
                    GameManager_1.GameManager.instance.draw();
                }
            }
        }
        static mouseHandler(e) {
            const p = new Point_1.RelPoint(e.clientX, e.clientY);
            const r = EventManager.distanceFromNearestHexCorner(p);
            if (GameManager_1.GameManager.instance.mayPlaceRobber) {
                const m = GameManager_1.GameManager.instance.getMap();
                const tile = m.getAllowedRobberPlace(p.toAbsPoint());
                if (tile != undefined) {
                    const tileExists = tile;
                    GameManager_1.GameManager.instance.moveRobber(tileExists);
                    GameManager_1.GameManager.instance.mayPlaceRobber = false;
                }
                else {
                    GameManager_1.GameManager.instance.draw();
                }
            }
            else if (GameManager_1.GameManager.instance.mayPlaceSettlement) {
                if (r < Hex_1.Hex.getSideLength() / 4) {
                    // clicked on a corner
                    const h = p.toHexPoint();
                    //console.log("new settlement");
                    const m = GameManager_1.GameManager.instance.getMap();
                    if (m.isAllowedSettlement(h)) {
                        m.addSettlement(new Settlement_1.Settlement(h, GameManager_1.GameManager.instance.getCurrentPlayer()));
                        GameManager_1.GameManager.instance.draw();
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
            else if (GameManager_1.GameManager.instance.mayPlaceCity) {
                // strokeCity
                if (r < Hex_1.Hex.getSideLength() / 3.5) {
                    const h = p.toHexPoint();
                    const m = GameManager_1.GameManager.instance.getMap();
                    if (m.isAllowedCity(h)) {
                        m.addCity(h);
                        GameManager_1.GameManager.instance.draw();
                        GameManager_1.GameManager.instance.print("New City created");
                        GameManager_1.GameManager.instance.mayPlaceCity = false;
                    }
                    else {
                        // console.log("not allowed position");
                        GameManager_1.GameManager.instance.printErr("Illegal Position");
                    }
                }
            }
            else if (GameManager_1.GameManager.instance.mayPlaceRoad) {
                const hArr = p.toDualHexPoint();
                if (hArr.length == 2) { // hArr is empty if not over a line 
                    const m = GameManager_1.GameManager.instance.getMap();
                    if (m.isAllowedRoad(hArr[0], hArr[1])) { // check if road already there
                        m.addRoad(new Road_1.Road(hArr[0], hArr[1], GameManager_1.GameManager.instance.getCurrentPlayer()));
                        GameManager_1.GameManager.instance.draw();
                        GameManager_1.GameManager.instance.print("New Road created");
                        GameManager_1.GameManager.instance.mayPlaceRoad = false;
                    }
                    else {
                        GameManager_1.GameManager.instance.printErr("Illegal Position");
                    }
                }
            }
        }
        static purchaseRoad() {
            GameManager_1.GameManager.instance.getCurrentPlayer().purchaseRoad();
        }
        static purchaseSettlement() {
            GameManager_1.GameManager.instance.getCurrentPlayer().purchaseSettlement();
        }
        static purchaseCity() {
            GameManager_1.GameManager.instance.getCurrentPlayer().purchaseCity();
        }
    }
    exports.EventManager = EventManager;
});
//# sourceMappingURL=EventManager.js.map