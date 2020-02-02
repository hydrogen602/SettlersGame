import { AbsPoint, RelPoint, HexPoint } from "../graphics/Point";
import { square, assert } from "../util";
import { Hex } from "../graphics/Hex";
import { GameManager } from "./GameManager";
import { Settlement } from "../map/Settlement";
import { ctx } from "../graphics/Screen";
import { Road } from "../map/Road";

export class HexCorner {

    private static roadTmpFirstEnd: HexPoint;

    private constructor() {}

    static distanceFromNearestHexCorner(p: AbsPoint|RelPoint) {
        var hexP = p.toHexPoint();
        var abs = p.toAbsPoint(); // if already absolute, it returns a copy of itself
        var backConvertedHex = hexP.toAbsPoint();

        return Math.sqrt(square(abs.x - backConvertedHex.x) + square(abs.y - backConvertedHex.y));
    }

    static mouseHoverHandler(e: MouseEvent) {
        if (GameManager.instance.mayPlaceSettlement) {            
            var p = new RelPoint(e.clientX, e.clientY);
            var r = HexCorner.distanceFromNearestHexCorner(p);
            
            if (r < Hex.getSideLength() / 4) {
                // hovering over a corner
                var h = p.toHexPoint();

                var m = GameManager.instance.getMap();

                if (m.isAllowedSettlement(h)) {
                    var back = h.toRelPoint();
                    Settlement.stroke(back, ctx);
                }
            }
            else {
                GameManager.instance.draw();
            }
        }
        else if (GameManager.instance.mayPlaceRoad) {
            // if (this.roadTmpFirstEnd == undefined) {
            var p = new RelPoint(e.clientX, e.clientY);
            var r = HexCorner.distanceFromNearestHexCorner(p);
            var hArr = p.toDualHexPoint();

            var m = GameManager.instance.getMap();
            
            if (hArr.length == 2 && m.isAllowedRoad(hArr[0], hArr[1])) { // hArr is empty if not over a line
                GameManager.instance.draw();

                // hovering over a line
                var h = p.toHexPoint();

                Road.stroke(hArr[0].toRelPoint(), hArr[1].toRelPoint(), ctx);
            }
            else {
                GameManager.instance.draw();
            }
        }
    }

    static mouseHandler(e: MouseEvent) {
        var p = new RelPoint(e.clientX, e.clientY);
        var r = HexCorner.distanceFromNearestHexCorner(p);
        var hArr = p.toDualHexPoint();
        // console.log(hArr);

        // console.log("event", e);
        if (GameManager.instance.mayPlaceSettlement) {            
            var p = new RelPoint(e.clientX, e.clientY);
            var r = HexCorner.distanceFromNearestHexCorner(p);
            
            if (r < Hex.getSideLength() / 4) {
                // clicked on a corner
                var h = p.toHexPoint();
                //console.log("new settlement");

                var m = GameManager.instance.getMap();

                if (m.isAllowedSettlement(h)) {
                    m.addSettlement(new Settlement(h, GameManager.instance.getCurrentPlayer()))
                    m.draw();
                    //console.log("success");
                    GameManager.instance.print("New Settlement created");
                    GameManager.instance.mayPlaceSettlement = false;
                }
                else {
                    // console.log("not allowed position");
                    GameManager.instance.printErr("Illegal Position");
                }
            }
        }  
        else if (GameManager.instance.mayPlaceRoad) {
            var p = new RelPoint(e.clientX, e.clientY);
            var r = HexCorner.distanceFromNearestHexCorner(p);
            var hArr = p.toDualHexPoint();
            
            if (hArr.length == 2) { // hArr is empty if not over a line 
                var m = GameManager.instance.getMap();

                if (m.isAllowedRoad(hArr[0], hArr[1])) { // check if road already there
                    m.addRoad(new Road(hArr[0], hArr[1], GameManager.instance.getCurrentPlayer()));
                    m.draw();
                    GameManager.instance.print("New Road created");
                    GameManager.instance.mayPlaceRoad = false;
                }
                else {
                    GameManager.instance.printErr("Illegal Position");
                }
            }
        }
    }
}