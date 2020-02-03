import { AbsPoint, RelPoint, HexPoint } from "../graphics/Point";
import { square, assert } from "../util";
import { Hex } from "../graphics/Hex";
import { GameManager } from "./GameManager";
import { Settlement } from "../map/Settlement";
import { ctx } from "../graphics/Screen";
import { Road } from "../map/Road";

export class EventManager {

    private constructor() {}

    static distanceFromNearestHexCorner(p: AbsPoint|RelPoint) {
        const hexP = p.toHexPoint();
        const abs = p.toAbsPoint(); // if already absolute, it returns a copy of itself
        const backConvertedHex = hexP.toAbsPoint();

        return Math.sqrt(square(abs.x - backConvertedHex.x) + square(abs.y - backConvertedHex.y));
    }

    static mouseHoverHandler(e: MouseEvent) {
        if (GameManager.instance.mayPlaceSettlement) {            
            const p = new RelPoint(e.clientX, e.clientY);
            const r = EventManager.distanceFromNearestHexCorner(p);
            
            if (r < Hex.getSideLength() / 4) {
                // hovering over a corner
                const h = p.toHexPoint();

                const m = GameManager.instance.getMap();

                if (m.isAllowedSettlement(h)) {
                    const back = h.toRelPoint();
                    Settlement.stroke(back, ctx);
                }
            }
            else {
                GameManager.instance.draw();
            }
        }
        else if (GameManager.instance.mayPlaceRoad) {
            // if (this.roadTmpFirstEnd == undefined) {
            const p = new RelPoint(e.clientX, e.clientY);
            const hArr = p.toDualHexPoint();

            const m = GameManager.instance.getMap();
            
            if (hArr.length == 2 && m.isAllowedRoad(hArr[0], hArr[1])) { // hArr is empty if not over a line
                GameManager.instance.draw();

                // hovering over a line
                Road.stroke(hArr[0].toRelPoint(), hArr[1].toRelPoint(), ctx);
            }
            else {
                GameManager.instance.draw();
            }
        }
    }

    static mouseHandler(e: MouseEvent) {
        const p = new RelPoint(e.clientX, e.clientY);
        const r = EventManager.distanceFromNearestHexCorner(p);
        
        // console.log(hArr);

        // console.log("event", e);
        if (GameManager.instance.mayPlaceSettlement) {            
            
            if (r < Hex.getSideLength() / 4) {
                // clicked on a corner
                const h = p.toHexPoint();
                //console.log("new settlement");

                const m = GameManager.instance.getMap();

                if (m.isAllowedSettlement(h)) {
                    m.addSettlement(new Settlement(h, GameManager.instance.getCurrentPlayer()))
                    GameManager.instance.draw();
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
            const hArr = p.toDualHexPoint();            
            if (hArr.length == 2) { // hArr is empty if not over a line 
                const m = GameManager.instance.getMap();

                if (m.isAllowedRoad(hArr[0], hArr[1])) { // check if road already there
                    m.addRoad(new Road(hArr[0], hArr[1], GameManager.instance.getCurrentPlayer()));
                    GameManager.instance.draw();
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