import { AbsPoint, RelPoint } from "../graphics/Point";
import { square } from "../util";

export class HexCorner {

    private constructor() {}

    static distanceFromNearestHexCorner(p: AbsPoint|RelPoint) {
        var hexP = p.toHexPoint();
        var abs = p.toAbsPoint(); // if already absolute, it returns a copy of itself
        var backConvertedHex = hexP.toAbsPoint();

        return Math.sqrt(square(abs.x - backConvertedHex.x) + square(abs.y - backConvertedHex.y));
    }
}