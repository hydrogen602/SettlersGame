import { AbsPoint, RelPoint } from "../graphics/Point";
import { square } from "../util";
import { Hex } from "../graphics/Hex";
import { GameManager } from "./GameManager";
import { Settlement } from "../map/Settlement";

export class HexCorner {

    private constructor() {}

    static distanceFromNearestHexCorner(p: AbsPoint|RelPoint) {
        var hexP = p.toHexPoint();
        var abs = p.toAbsPoint(); // if already absolute, it returns a copy of itself
        var backConvertedHex = hexP.toAbsPoint();

        return Math.sqrt(square(abs.x - backConvertedHex.x) + square(abs.y - backConvertedHex.y));
    }

    static mouseHandler(e: MouseEvent) {
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
                    console.log("not allowed position");
                    GameManager.instance.printErr("Illegal Position");
                }
            }
        }  
        else {
            //console.log("not allowed rn");
        }
    }
}