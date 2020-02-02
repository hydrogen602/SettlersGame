import { AbsPoint, RelPoint } from "../graphics/Point";
import { square } from "../util";
import { Hex } from "../graphics/Hex";

export class HexCorner {

    private constructor() {}

    static distanceFromNearestHexCorner(p: AbsPoint|RelPoint) {
        var hexP = p.toHexPoint();
        var abs = p.toAbsPoint(); // if already absolute, it returns a copy of itself
        var backConvertedHex = hexP.toAbsPoint();

        return Math.sqrt(square(abs.x - backConvertedHex.x) + square(abs.y - backConvertedHex.y));
    }

    static mouseHandler(e: MouseEvent) {
        var p = new RelPoint(e.clientX, e.clientY);
        var r = HexCorner.distanceFromNearestHexCorner(p);
        
        if (r < Hex.getSideLength() / 4) {
            // clicked on a corner
            var h = p.toHexPoint();  
            console.log("new settlement")
        }
    
         
    }
}